import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação para o corpo da requisição
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

// Nota: Tipos derivados do schema são inferidos diretamente no uso

// Função auxiliar para calcular o próximo horário de execução
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

// GET: Obter a política de backup atual
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(request);
    
    // Verificar autenticação
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Verificar permissões (apenas admin/sysadmin)
    if (user.role !== 'ADMIN' && user.role !== 'SYSADMIN') {
      return NextResponse.json(
        { error: 'Acesso negado. Permissões insuficientes.' },
        { status: 403 }
      );
    }

    // Buscar a política atual ou retornar valores padrão
    const policy = await prisma.backupPolicy.findFirst();
    
    if (!policy) {
      // Retornar valores padrão se não existir política
      return NextResponse.json({
        id: null,
        isActive: true,
        frequency: 'daily',
        hour: 2,
        minute: 0,
        dayOfWeek: 0,
        dayOfMonth: 1,
        retentionDays: 30,
        maxBackups: 30,
        target: 'local',
        notifyOnFailure: true,
        lastRunAt: null,
        nextRunAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json(policy);
  } catch (error) {
    console.error('Erro ao buscar política de backup:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST: Criar ou atualizar a política de backup
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(request);
    
    // Verificar autenticação
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Verificar permissões (apenas admin/sysadmin)
    if (user.role !== 'ADMIN' && user.role !== 'SYSADMIN') {
      return NextResponse.json(
        { error: 'Acesso negado. Permissões insuficientes.' },
        { status: 403 }
      );
    }

    // Validar e parsear o corpo da requisição
    const body = await request.json();
    
    try {
      // Validar os dados de entrada
      const validatedData = backupPolicySchema.parse(body);
      
      // Calcular o próximo horário de execução
      const nextRunAt = calculateNextRun({
        frequency: validatedData.frequency,
        hour: validatedData.hour,
        minute: validatedData.minute,
        dayOfWeek: validatedData.dayOfWeek,
        dayOfMonth: validatedData.dayOfMonth,
      });

      // Verificar se já existe uma política
      const existingPolicy = await prisma.backupPolicy.findFirst();
      
      let result;
      
      if (existingPolicy) {
        // Atualizar política existente
        result = await prisma.backupPolicy.update({
          where: { id: existingPolicy.id },
          data: {
            ...validatedData,
            nextRunAt,
            updatedAt: new Date(),
          },
        });
      } else {
        // Criar nova política
        result = await prisma.backupPolicy.create({
          data: {
            ...validatedData,
            nextRunAt,
          },
        });
      }
      
      return NextResponse.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: 'Dados inválidos',
            details: error.errors 
          },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Erro ao salvar política de backup:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
