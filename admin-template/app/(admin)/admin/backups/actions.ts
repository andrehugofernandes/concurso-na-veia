'use server';

import { z } from 'zod';
import { createSafeActionClient } from 'next-safe-action';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { existsSync } from 'fs';
import prisma from '@/lib/prisma';
import { createBackup, getDownloadUrl } from '@/lib/services/backup.service';

// Cliente de ação segura
const actionClient = createSafeActionClient();

// Tipos de resposta
export type BackupActionResponse = {
  success: boolean;
  message?: string;
  error?: string;
  data?: unknown;
};

// Helper para verificar role SYSADMIN
async function verifySysadmin(): Promise<{ userId: string; role: string } | null> {
  try {
    const cookieStore = await cookies();
    // Seguir mesma convenção do getAuthUserFromRequest()
    const token =
      cookieStore.get('accessToken')?.value ||
      cookieStore.get('__Host-accessToken')?.value ||
      cookieStore.get('__Host-token')?.value ||
      cookieStore.get('token')?.value ||
      null;
    
    if (!token) {
      console.log('[verifySysadmin] ❌ Nenhum token encontrado nos cookies');
      return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-access-secret');
    const { payload } = await jwtVerify(token, secret);
    
    const role = (payload.role as string)?.toUpperCase();
    console.log('[verifySysadmin] 🔍 Role detectada:', role);
    
    if (role !== 'SYSADMIN' && role !== 'ADMIN') {
      console.log('[verifySysadmin] ❌ Role não autorizada:', role);
      return null;
    }

    console.log('[verifySysadmin] ✅ Autorização concedida');
    return { userId: payload.sub as string, role };
  } catch (error) {
    console.error('[verifySysadmin] ❌ Erro ao verificar token:', error);
    return null;
  }
}

// Schema para atualizar política de backup
const updatePolicySchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'manual']),
  retentionDays: z.number().int().min(1).max(365),
});

// Schema para executar backup
const runBackupSchema = z.object({
  type: z.enum(['full', 'incremental']).optional().default('full'),
});

/**
 * Atualiza a política de backups (frequência e retenção)
 * Apenas SYSADMIN pode executar
 */
export const updateBackupPolicy = actionClient.schema(updatePolicySchema).action(async ({ parsedInput: input }) => {
  const auth = await verifySysadmin();
  if (!auth || auth.role !== 'SYSADMIN') {
    return {
      success: false,
      error: 'Apenas SYSADMIN pode atualizar a política de backups.',
    } as BackupActionResponse;
  }

  try {
    // Persistir no banco (upsert para garantir que sempre existe uma política)
    const policy = await prisma.backupPolicy.upsert({
      where: { id: 1 },
      update: { 
        frequency: input.frequency, 
        retentionDays: input.retentionDays,
        updatedAt: new Date(),
      },
      create: { 
        id: 1,
        frequency: input.frequency, 
        retentionDays: input.retentionDays,
      },
    });

    console.log('[updateBackupPolicy] Política atualizada:', { userId: auth.userId, policy });

    return {
      success: true,
      message: `Política atualizada: ${input.frequency}, retenção de ${input.retentionDays} dias.`,
      data: policy,
    } as BackupActionResponse;
  } catch (error) {
    console.error('[updateBackupPolicy] Erro:', error);
    return {
      success: false,
      error: 'Erro ao atualizar política de backups.',
    } as BackupActionResponse;
  }
});

/**
 * Executa backup on-demand
 * Apenas SYSADMIN pode executar
 */
export const runBackupNow = actionClient.schema(runBackupSchema).action(async ({ parsedInput: input }) => {
  console.log('┌─────────────────────────────────────────────────────────┐');
  console.log('│ [runBackupNow] 🎬 ACTION INICIADA                       │');
  console.log('└─────────────────────────────────────────────────────────┘');
  
  const auth = await verifySysadmin();
  console.log('[runBackupNow] 🔐 Autenticação verificada:', { userId: auth?.userId, role: auth?.role });
  
  if (!auth || auth.role !== 'SYSADMIN') {
    console.log('[runBackupNow] ❌ Acesso negado: usuário não é SYSADMIN');
    return {
      success: false,
      error: 'Apenas SYSADMIN pode executar backups on-demand.',
    } as BackupActionResponse;
  }

  try {
    console.log('[runBackupNow] ✅ Permissão concedida');
    console.log('[runBackupNow] 📋 Parâmetros:', { userId: auth.userId, type: input.type });
    console.log('[runBackupNow] 🔧 Ambiente:', {
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      storageType: process.env.STORAGE_TYPE || 'undefined',
      firebaseBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'undefined',
      firebaseProject: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'undefined',
      cronSecretSet: Boolean(process.env.CRON_SECRET),
      tmpDirExists: existsSync('/tmp'),
    });
    console.log('[runBackupNow] 🚀 Chamando createBackup()...');

    // Executar backup e fazer upload para Firebase Storage
    const result = await createBackup(input.type, auth.userId);

    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│ [runBackupNow] ✅ BACKUP CONCLUÍDO COM SUCESSO!        │');
    console.log('└─────────────────────────────────────────────────────────┘');
    console.log('[runBackupNow] 📊 Resultado:', {
      jobId: result.jobId,
      size: `${(result.size / (1024 ** 2)).toFixed(2)} MB`,
      duration: `${(result.duration / 1000).toFixed(2)}s`,
      path: result.filePath,
    });

    return {
      success: true,
      message: `Backup ${input.type} concluído com sucesso! Tamanho: ${(result.size / (1024 ** 2)).toFixed(2)} MB`,
      data: { 
        jobId: result.jobId, 
        type: input.type, 
        size: result.size,
        duration: result.duration,
      },
    } as BackupActionResponse;
  } catch (error) {
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.error('│ [runBackupNow] ❌ ERRO AO EXECUTAR BACKUP!             │');
    console.log('└─────────────────────────────────────────────────────────┘');
    console.error('[runBackupNow] 💥 Detalhes:', error);
    console.error('[runBackupNow] 📋 Stack trace:', error instanceof Error ? error.stack : 'N/A');
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao executar backup.',
    } as BackupActionResponse;
  }
});

/**
 * Baixa o último backup disponível
 * ADMIN e SYSADMIN podem executar
 */
export const downloadLatestBackup = actionClient.schema(z.object({})).action(async () => {
  const auth = await verifySysadmin();
  if (!auth) {
    return {
      success: false,
      error: 'Autenticação necessária para baixar backups.',
    } as BackupActionResponse;
  }

  try {
    // Buscar último backup bem-sucedido
    const latest = await prisma.backupJob.findFirst({
      where: { status: 'SUCCESS' },
      orderBy: { finishedAt: 'desc' },
    });

    if (!latest || !latest.filePath) {
      return { 
        success: false, 
        error: 'Nenhum backup disponível para download.' 
      } as BackupActionResponse;
    }

    console.log('[downloadLatestBackup] Gerando URL assinada:', { userId: auth.userId, backupId: latest.id });

    // Gerar URL assinada do Firebase Storage (válida por 1 hora)
    const downloadUrl = await getDownloadUrl(latest.id);

    return {
      success: true,
      message: 'Backup disponível para download.',
      data: {
        id: latest.id,
        filename: latest.filePath.split('/').pop(),
        size: latest.size ? `${(Number(latest.size) / (1024 ** 3)).toFixed(2)} GB` : 'N/A',
        createdAt: latest.finishedAt?.toISOString(),
        downloadUrl, // URL assinada do Firebase
      },
    } as BackupActionResponse;
  } catch (error) {
    console.error('[downloadLatestBackup] Erro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao buscar backup.',
    } as BackupActionResponse;
  }
});
