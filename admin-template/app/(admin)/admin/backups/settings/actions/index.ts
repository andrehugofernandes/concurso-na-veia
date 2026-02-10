'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getAuthUserFromRequest } from '@/lib/auth';
import { ActionResponse } from '@/types/actions';
import { logActivity } from '@/lib/server/logging';
import { notificationsService } from '@/lib/services/notifications.service';

// Schema de validação
const backupPolicySchema = z.object({
  isActive: z.boolean(),
  frequency: z.enum(['hourly', 'daily', 'weekly', 'monthly']),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  dayOfWeek: z.number().min(0).max(6).nullable(),
  dayOfMonth: z.number().min(1).max(31).nullable(),
  retentionDays: z.number().min(1).max(365),
  maxBackups: z.number().min(1).max(1000),
  target: z.enum(['local', 'firebase']),
  notifyOnFailure: z.boolean(),
});

type BackupPolicyInput = z.infer<typeof backupPolicySchema>;

/**
 * Atualiza a política de backup do sistema
 */
export async function updateBackupPolicy(
  data: BackupPolicyInput
): Promise<ActionResponse<{ success: boolean }>> {
  try {
    // Validar dados de entrada
    const validatedData = backupPolicySchema.parse(data);
    
    // Verificar autenticação e permissões
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || cookieStore.get('token')?.value;
    
    if (!token) {
      return {
        error: {
          message: 'Não autorizado',
          code: 'UNAUTHORIZED',
        },
      };
    }

    // Criar um objeto Request mock para usar getAuthUserFromRequest
    const mockRequest = new Request('http://localhost', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const user = await getAuthUserFromRequest(mockRequest);
    
    if (!user) {
      return {
        error: {
          message: 'Não autorizado',
          code: 'UNAUTHORIZED',
        },
      };
    }

    // Verificar se o usuário tem permissão de administrador
    if (user.role !== 'ADMIN' && user.role !== 'SYSADMIN') {
      return {
        error: {
          message: 'Acesso negado. Permissões insuficientes.',
          code: 'FORBIDDEN',
        },
      };
    }

    // Calcular próximo horário de execução
    const nextRunAt = calculateNextRun({
      frequency: validatedData.frequency,
      hour: validatedData.hour,
      minute: validatedData.minute,
      dayOfWeek: validatedData.dayOfWeek,
      dayOfMonth: validatedData.dayOfMonth,
    });

    // Atualizar ou criar a política
    await prisma.$transaction(async (tx) => {
      // Verificar se já existe uma política
      const existingPolicy = await tx.backupPolicy.findFirst();
      
      if (existingPolicy) {
        // Atualizar política existente
        await tx.backupPolicy.update({
          where: { id: existingPolicy.id },
          data: {
            ...validatedData,
            nextRunAt,
            updatedAt: new Date(),
          },
        });
      } else {
        // Criar nova política
        await tx.backupPolicy.create({
          data: {
            ...validatedData,
            nextRunAt,
          },
        });
      }
    });

    // Invalidar cache da página de configurações
    revalidatePath('/admin/backups/settings');

    // Registrar log de auditoria
    await logActivity({
      action: 'backup:settings:update',
      resource: 'backup',
      userId: user.id,
      details: {
        frequency: validatedData.frequency,
        hour: validatedData.hour,
        minute: validatedData.minute,
        dayOfWeek: validatedData.dayOfWeek,
        dayOfMonth: validatedData.dayOfMonth,
        retentionDays: validatedData.retentionDays,
        maxBackups: validatedData.maxBackups,
        target: validatedData.target,
        isActive: validatedData.isActive,
      },
    });

    // Notificar apenas administradores
    try {
      const adminIds = await notificationsService.getAdminUserIds();
      if (adminIds.length > 0) {
        await notificationsService.createNotificationForUsers(adminIds, {
          type: 'backup',
          title: 'Configurações de backup atualizadas',
          message: `${user.username} atualizou as configurações de backup`,
          priority: 'info',
          actionUrl: '/admin/backups/settings',
          metadata: {
            actorId: user.id,
            frequency: validatedData.frequency,
            target: validatedData.target,
          },
        });
      }
    } catch (notifyErr) {
      console.warn('[Notifications] Falha ao enviar notificação de settings de backup:', notifyErr);
    }

    return {
      data: { success: true },
    };
  } catch (error) {
    console.error('Erro ao atualizar política de backup:', error);
    
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: 'Dados inválidos',
          code: 'VALIDATION_ERROR',
        },
      };
    }

    return {
      error: {
        message: 'Erro ao atualizar política de backup',
        code: 'INTERNAL_ERROR',
      },
    };
  }
}

/**
 * Obtém a política de backup atual
 */
export async function getBackupPolicy() {
  try {
    const policy = await prisma.backupPolicy.findFirst();
    
    if (!policy) {
      // Retornar valores padrão se não existir política
      return {
        isActive: true,
        frequency: 'daily' as const,
        hour: 2,
        minute: 0,
        dayOfWeek: 0,
        dayOfMonth: 1,
        retentionDays: 30,
        maxBackups: 30,
        target: 'local' as const,
        notifyOnFailure: true,
      };
    }
    
    return policy;
  } catch (error) {
    console.error('Erro ao obter política de backup:', error);
    throw new Error('Erro ao carregar configurações de backup');
  }
}

/**
 * Calcula o próximo horário de execução com base na frequência
 */
function calculateNextRun({
  frequency,
  hour,
  minute,
  dayOfWeek,
  dayOfMonth,
}: {
  frequency: string;
  hour: number;
  minute: number;
  dayOfWeek: number | null;
  dayOfMonth: number | null;
}): Date {
  const now = new Date();
  const nextRun = new Date(now);
  
  // Resetar segundos e milissegundos
  nextRun.setSeconds(0, 0);
  
  // Definir hora e minuto
  nextRun.setHours(hour, minute);
  
  switch (frequency) {
    case 'hourly':
      // Próxima hora
      nextRun.setHours(now.getHours() + 1);
      break;
      
    case 'daily':
      // Se já passou do horário de hoje, agendar para amanhã
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
      break;
      
    case 'weekly': {
      // Dia da semana (0 = domingo, 1 = segunda, etc.)
      const targetDay = dayOfWeek !== null ? dayOfWeek : 0; // Default para domingo
      const currentDay = now.getDay();
      let daysToAdd = (targetDay - currentDay + 7) % 7;
      
      // Se for hoje mas já passou do horário, agendar para a próxima semana
      if (daysToAdd === 0 && nextRun <= now) {
        daysToAdd = 7;
      }
      
      nextRun.setDate(now.getDate() + daysToAdd);
      break;
    }
      
    case 'monthly': {
      // Dia do mês (1-31)
      const targetDay = dayOfMonth !== null ? Math.min(dayOfMonth, 28) : 1; // Evitar problemas com meses com menos dias
      const currentDate = now.getDate();
      
      // Se já passou do dia ou é hoje mas já passou do horário, agendar para o próximo mês
      if (currentDate > targetDay || (currentDate === targetDay && nextRun <= now)) {
        // Ir para o primeiro dia do próximo mês
        nextRun.setMonth(now.getMonth() + 1, 1);
        // Ajustar para o dia do mês, garantindo que não ultrapasse o último dia do mês
        const lastDayOfMonth = new Date(nextRun.getFullYear(), nextRun.getMonth() + 1, 0).getDate();
        nextRun.setDate(Math.min(targetDay, lastDayOfMonth));
      } else {
        // Ainda não passou do dia, agendar para o dia deste mês
        nextRun.setDate(targetDay);
      }
      break;
    }
      
    default:
      // Default para diário
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
  }
  
  return nextRun;
}
