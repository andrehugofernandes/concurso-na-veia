'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';
import { generateCompressedBackup, decompressBackup, restoreBackupData } from '@/lib/services/backup-service';
import { uploadBackupToFirebase, downloadBackupFromFirebase, deleteBackupFromFirebase } from '@/lib/services/backup-storage';
import { logAction, logError } from '@/lib/services/audit-logger';
import { LogResource, LogAction } from '@/lib/types/audit-log';

// ============================================================================
// Schemas
// ============================================================================

const createBackupSchema = z.object({
  type: z.enum(['full', 'incremental']),
});

const restoreBackupSchema = z.object({
  backupJobId: z.string(),
});

const deleteBackupSchema = z.object({
  backupJobId: z.string(),
});

const updateBackupPolicySchema = z.object({
  policyId: z.number(),
  frequency: z.enum(['hourly', 'daily', 'weekly', 'monthly']),
  retentionDays: z.number().min(1).max(365),
  isActive: z.boolean(),
});

const createBackupPolicySchema = z.object({
  frequency: z.enum(['hourly', 'daily', 'weekly', 'monthly']).default('daily'),
  retentionDays: z.number().min(1).max(365).default(30),
  target: z.enum(['local', 's3', 'firebase']).default('firebase'),
  isActive: z.boolean().default(true),
});

const listBackupJobsSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  status: z.enum(['pending', 'running', 'completed', 'failed']).optional(),
});

const selectAllBackupJobIdsSchema = z.object({
  status: z.enum(['all', 'pending', 'running', 'completed', 'failed']).optional(),
});

const deleteBackupsBulkSchema = z.object({
  ids: z.array(z.string()).min(1).max(500),
});

// ============================================================================
// Types
// ============================================================================

export interface BackupJobData {
  id: string;
  type: string;
  status: string;
  fileSize: number | null;
  filePath: string | null;
  logUrl: string | null;
  errorMsg: string | null;
  startedAt: string;
  finishedAt: string | null;
  createdAt: string;
}

export interface BackupPolicyData {
  id: number;
  isActive: boolean;
  frequency: string;
  retentionDays: number;
  lastRunAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BackupListResult {
  jobs: BackupJobData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function selectAllBackupJobIds(
  params: z.infer<typeof selectAllBackupJobIdsSchema> = {}
): Promise<ActionResponse<{ ids: string[]; total: number }>> {
  try {
    const validated = selectAllBackupJobIdsSchema.parse(params);
    const { status } = validated;

    const where: Record<string, string> = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    const jobs = await prisma.backupJob.findMany({
      where,
      select: { id: true },
      orderBy: { createdAt: 'desc' },
    });

    return createSuccessResponse({
      ids: jobs.map((job) => job.id),
      total: jobs.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[selectAllBackupJobIds] Error:', error);
    return createErrorResponse('Erro ao selecionar backups');
  }
}

export async function deleteBackupsBulk(
  data: z.infer<typeof deleteBackupsBulkSchema>
): Promise<ActionResponse<{ deleted: number; failed: number; errors: string[] }>> {
  try {
    const validated = deleteBackupsBulkSchema.parse(data);

    const uniqueIds = Array.from(new Set(validated.ids.filter((id) => Boolean(id))));

    if (uniqueIds.length === 0) {
      return createErrorResponse('Nenhum backup selecionado');
    }

    let deleted = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const backupJobId of uniqueIds) {
      const result = await deleteBackup({ backupJobId });
      if (result.status === 'success') {
        deleted += 1;
        continue;
      }

      failed += 1;
      errors.push(`${backupJobId}: ${result.error || 'erro desconhecido'}`);
    }

    return createSuccessResponse({ deleted, failed, errors: errors.slice(0, 20) });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteBackupsBulk] Error:', error);
    return createErrorResponse('Erro ao deletar backups selecionados');
  }
}

// ============================================================================
// Helpers
// ============================================================================

function mapBackupJob(job: {
  id: string;
  type: string;
  status: string;
  size: bigint | null;
  filePath: string | null;
  logUrl: string | null;
  errorMsg: string | null;
  startedAt: Date;
  finishedAt: Date | null;
  createdAt: Date;
}): BackupJobData {
  return {
    id: job.id,
    type: job.type,
    status: job.status,
    fileSize: job.size ? Number(job.size) : null,
    filePath: job.filePath,
    logUrl: job.logUrl,
    errorMsg: job.errorMsg,
    startedAt: job.startedAt?.toISOString() || new Date().toISOString(),
    finishedAt: job.finishedAt?.toISOString() || null,
    createdAt: job.createdAt?.toISOString() || new Date().toISOString(),
  };
}

function mapBackupPolicy(policy: {
  id: number;
  isActive: boolean;
  frequency: string;
  retentionDays: number;
  lastRunAt: Date | null;
  nextRunAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): BackupPolicyData {
  return {
    id: policy.id,
    isActive: policy.isActive,
    frequency: policy.frequency,
    retentionDays: policy.retentionDays,
    lastRunAt: policy.lastRunAt?.toISOString() || null,
    nextRunAt: policy.nextRunAt?.toISOString() || null,
    createdAt: policy.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: policy.updatedAt?.toISOString() || new Date().toISOString(),
  };
}

// ============================================================================
// Actions
// ============================================================================

/**
 * Lista jobs de backup com paginação e filtros
 */
export async function listBackupJobs(
  params: z.infer<typeof listBackupJobsSchema> = { page: 1, pageSize: 10 }
): Promise<ActionResponse<BackupListResult>> {
  try {
    const validated = listBackupJobsSchema.parse(params);
    const { page, pageSize, status } = validated;

    const where: Record<string, string> = {};
    if (status) {
      where.status = status;
    }

    const [jobs, total] = await Promise.all([
      prisma.backupJob.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.backupJob.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return createSuccessResponse<BackupListResult>({
      jobs: jobs.map(mapBackupJob),
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listBackupJobs] Error:', error);
    return createErrorResponse('Erro ao listar jobs de backup');
  }
}

/**
 * Cria um novo job de backup completo:
 * 1. Cria registro com status 'pending'
 * 2. Gera dump JSON compactado
 * 3. Faz upload para Firebase Storage
 * 4. Atualiza registro com filePath, size e status 'completed'
 * 5. Registra em BackupAuditLog
 */
export async function createBackup(
  data: z.infer<typeof createBackupSchema>
): Promise<ActionResponse<{ job: BackupJobData }>> {
  let jobId: string | null = null;

  try {
    const validated = createBackupSchema.parse(data);

    // 1. Criar registro com status 'pending'
    const job = await prisma.backupJob.create({
      data: {
        type: validated.type,
        status: 'pending',
        startedAt: new Date(),
      },
    });
    jobId = job.id;

    // eslint-disable-next-line no-console
    console.log(`[createBackup] Job created: ${job.id}`);

    // 2. Atualizar para 'running'
    await prisma.backupJob.update({
      where: { id: job.id },
      data: { status: 'running' },
    });

    // 3. Gerar dump JSON compactado
    // eslint-disable-next-line no-console
    console.log('[createBackup] Generating compressed backup...');
    const backupResult = await generateCompressedBackup();

    if (!backupResult.success || !backupResult.data) {
      throw new Error(backupResult.error || 'Falha ao gerar backup');
    }

    // eslint-disable-next-line no-console
    console.log(
      '[createBackup] Backup generated',
      JSON.stringify(
        { jobId: job.id, size: backupResult.size ?? backupResult.data.length, type: validated.type },
        null,
        2
      )
    );

    // 4. Upload para Firebase Storage
    // eslint-disable-next-line no-console
    console.log('[createBackup] Uploading to Firebase Storage...');
    const uploadResult = await uploadBackupToFirebase(job.id, backupResult.data);

    if (!uploadResult.success || !uploadResult.filePath) {
      throw new Error(uploadResult.error || 'Falha no upload do backup');
    }

    // eslint-disable-next-line no-console
    console.log(
      '[createBackup] Upload OK',
      JSON.stringify(
        {
          jobId: job.id,
          filePath: uploadResult.filePath,
          size: uploadResult.size ?? backupResult.size ?? backupResult.data.length,
        },
        null,
        2
      )
    );

    // 5. Atualizar registro com sucesso
    const updatedJob = await prisma.backupJob.update({
      where: { id: job.id },
      data: {
        status: 'completed',
        filePath: uploadResult.filePath,
        size: BigInt(uploadResult.size || 0),
        finishedAt: new Date(),
      },
    });

    // 6. Registrar em BackupAuditLog
    await prisma.backupAuditLog.create({
      data: {
        action: 'CREATE',
        status: 'success',
        backupId: job.id,
        details: JSON.stringify({
          type: validated.type,
          size: uploadResult.size,
          filePath: uploadResult.filePath,
        }),
      },
    });

    // 7. Registrar em audit logs
    await logAction(LogResource.BACKUP, LogAction.CREATE_BACKUP, undefined, {
      backupId: job.id,
      type: validated.type,
      size: uploadResult.size ?? backupResult.size ?? backupResult.data.length,
      filePath: uploadResult.filePath,
      status: 'completed',
    });

    // eslint-disable-next-line no-console
    console.log(`[createBackup] Backup completed: ${uploadResult.filePath} (${uploadResult.size} bytes)`);

    revalidateTag('backups-list', 'max');

    return createSuccessResponse<{ job: BackupJobData }>({
      job: mapBackupJob(updatedJob),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createBackup] Error:', error);

    // Atualizar job com erro se foi criado
    if (jobId) {
      await prisma.backupJob.update({
        where: { id: jobId },
        data: {
          status: 'failed',
          errorMsg: error instanceof Error ? error.message : 'Erro desconhecido',
          finishedAt: new Date(),
        },
      }).catch(() => {});

      // Registrar falha em BackupAuditLog
      await prisma.backupAuditLog.create({
        data: {
          action: 'CREATE',
          status: 'failed',
          backupId: jobId,
          details: JSON.stringify({
            error: error instanceof Error ? error.message : 'Erro desconhecido',
          }),
        },
      }).catch(() => {});

      await logError(
        LogResource.BACKUP,
        LogAction.CREATE_BACKUP,
        error instanceof Error ? error : new Error(String(error)),
        undefined,
        {
          backupId: jobId,
        }
      ).catch(() => {});
    }

    return createErrorResponse(error instanceof Error ? error.message : 'Erro ao criar backup');
  }
}

/**
 * Restaura um backup completo:
 * 1. Cria job de restore com status 'pending'
 * 2. Baixa arquivo do Firebase Storage
 * 3. Descompacta .json.gz
 * 4. Restaura dados no banco (transação Prisma)
 * 5. Atualiza status do job
 * 6. Registra em BackupAuditLog
 */
export async function restoreBackup(
  data: z.infer<typeof restoreBackupSchema>
): Promise<ActionResponse<{ job: BackupJobData }>> {
  let restoreJobId: string | null = null;
  let sourceBackupId: string | null = null;

  try {
    const validated = restoreBackupSchema.parse(data);

    const backupJob = await prisma.backupJob.findUnique({
      where: { id: validated.backupJobId },
    });
    sourceBackupId = backupJob?.id ?? null;

    if (!backupJob) {
      return createErrorResponse('Backup não encontrado');
    }

    if (backupJob.status !== 'completed') {
      return createErrorResponse('Apenas backups completados podem ser restaurados');
    }

    if (!backupJob.filePath) {
      return createErrorResponse('Arquivo de backup não disponível');
    }

    // 1. Criar job de restauração
    const restoreJob = await prisma.backupJob.create({
      data: {
        type: 'restore',
        status: 'pending',
        startedAt: new Date(),
        filePath: backupJob.filePath,
      },
    });
    restoreJobId = restoreJob.id;

    // eslint-disable-next-line no-console
    console.log(`[restoreBackup] Restore job created: ${restoreJob.id}`);

    // 2. Atualizar para 'running'
    await prisma.backupJob.update({
      where: { id: restoreJob.id },
      data: { status: 'running' },
    });

    // 3. Baixar arquivo do Firebase Storage
    // eslint-disable-next-line no-console
    console.log(`[restoreBackup] Downloading backup from: ${backupJob.filePath}`);
    const downloadResult = await downloadBackupFromFirebase(backupJob.filePath);

    if (!downloadResult.success || !downloadResult.data) {
      throw new Error(downloadResult.error || 'Falha ao baixar backup');
    }

    // 4. Descompactar .json.gz
    // eslint-disable-next-line no-console
    console.log('[restoreBackup] Decompressing backup...');
    const backupData = decompressBackup(downloadResult.data);

    // 5. Restaurar dados no banco
    // eslint-disable-next-line no-console
    console.log('[restoreBackup] Restoring data to database...');
    const restoreResult = await restoreBackupData(backupData);

    if (!restoreResult.success) {
      throw new Error(restoreResult.error || 'Falha ao restaurar dados');
    }

    // 6. Atualizar job com sucesso
    const updatedJob = await prisma.backupJob.update({
      where: { id: restoreJob.id },
      data: {
        status: 'completed',
        finishedAt: new Date(),
      },
    });

    // 7. Registrar em BackupAuditLog
    await prisma.backupAuditLog.create({
      data: {
        action: 'RESTORE',
        status: 'success',
        backupId: restoreJob.id,
        details: JSON.stringify({
          sourceBackupId: backupJob.id,
          restoredRecords: restoreResult.restoredRecords,
        }),
      },
    });

    // 8. Registrar em audit logs
    await logAction(LogResource.BACKUP, LogAction.RESTORE_BACKUP, undefined, {
      restoreJobId: restoreJob.id,
      sourceBackupId: backupJob.id,
      restoredRecords: restoreResult.restoredRecords,
      status: 'completed',
    });

    // eslint-disable-next-line no-console
    console.log(`[restoreBackup] Restore completed: ${restoreResult.restoredRecords} records restored`);

    revalidateTag('backups-list', 'max');

    return createSuccessResponse<{ job: BackupJobData }>({
      job: mapBackupJob(updatedJob),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[restoreBackup] Error:', error);

    // Atualizar job com erro se foi criado
    if (restoreJobId) {
      await prisma.backupJob.update({
        where: { id: restoreJobId },
        data: {
          status: 'failed',
          errorMsg: error instanceof Error ? error.message : 'Erro desconhecido',
          finishedAt: new Date(),
        },
      }).catch(() => {});

      // Registrar falha em BackupAuditLog
      await prisma.backupAuditLog.create({
        data: {
          action: 'RESTORE',
          status: 'failed',
          backupId: restoreJobId,
          details: JSON.stringify({
            error: error instanceof Error ? error.message : 'Erro desconhecido',
          }),
        },
      }).catch(() => {});

      await logError(
        LogResource.BACKUP,
        LogAction.RESTORE_BACKUP,
        error instanceof Error ? error : new Error(String(error)),
        undefined,
        {
          restoreJobId,
          sourceBackupId,
        }
      ).catch(() => {});
    }

    return createErrorResponse(error instanceof Error ? error.message : 'Erro ao restaurar backup');
  }
}

/**
 * Deleta um job de backup e o arquivo do Firebase Storage
 */
export async function deleteBackup(
  data: z.infer<typeof deleteBackupSchema>
): Promise<ActionResponse<void>> {
  try {
    const validated = deleteBackupSchema.parse(data);

    const backupJob = await prisma.backupJob.findUnique({
      where: { id: validated.backupJobId },
    });

    if (!backupJob) {
      return createErrorResponse('Backup não encontrado');
    }

    // Deletar arquivo do Firebase Storage se existir
    if (backupJob.filePath) {
      // eslint-disable-next-line no-console
      console.log(`[deleteBackup] Deleting file from Firebase: ${backupJob.filePath}`);
      const deleteResult = await deleteBackupFromFirebase(backupJob.filePath);
      if (!deleteResult.success) {
        // eslint-disable-next-line no-console
        console.warn(`[deleteBackup] Failed to delete file: ${deleteResult.error}`);
        // Continua mesmo se falhar a exclusão do arquivo
      }
    }

    // Registrar em BackupAuditLog ANTES de deletar (para evitar violação de FK)
    await prisma.backupAuditLog.create({
      data: {
        action: 'DELETE',
        status: 'success',
        // Não referenciar backupId pois será deletado
        backupId: null,
        details: JSON.stringify({
          deletedBackupId: validated.backupJobId,
          filePath: backupJob.filePath,
          type: backupJob.type,
        }),
      },
    });

    // Deletar registro do banco
    await prisma.backupJob.delete({
      where: { id: validated.backupJobId },
    });

    await logAction(LogResource.BACKUP, LogAction.DELETE_BACKUP, undefined, {
      deletedBackupId: validated.backupJobId,
      filePath: backupJob.filePath,
      type: backupJob.type,
    });

    revalidateTag('backups-list', 'max');

    return createSuccessResponse<void>(undefined);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteBackup] Error:', error);
    await logError(
      LogResource.BACKUP,
      LogAction.DELETE_BACKUP,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      {
        backupJobId: data.backupJobId,
      }
    ).catch(() => {});
    return createErrorResponse(error instanceof Error ? error.message : 'Erro ao deletar backup');
  }
}

/**
 * Retorna a URL de download de um backup
 */
export async function getBackupDownloadUrlAction(
  backupJobId: string
): Promise<ActionResponse<{ url: string }>> {
  try {
    const backupJob = await prisma.backupJob.findUnique({
      where: { id: backupJobId },
    });

    if (!backupJob) {
      return createErrorResponse('Backup não encontrado');
    }

    if (!backupJob.filePath) {
      return createErrorResponse('Arquivo de backup não disponível');
    }

    if (backupJob.status !== 'completed') {
      return createErrorResponse('Backup ainda não foi concluído');
    }

    // Importar função de URL
    const { getBackupDownloadUrl } = await import('@/lib/services/backup-storage');
    const url = getBackupDownloadUrl(backupJob.filePath);

    return createSuccessResponse<{ url: string }>({ url });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getBackupDownloadUrl] Error:', error);
    return createErrorResponse(error instanceof Error ? error.message : 'Erro ao obter URL de download');
  }
}

/**
 * Lista políticas de backup
 */
export async function listBackupPolicies(): Promise<
  ActionResponse<{ policies: BackupPolicyData[] }>
> {
  try {
    const policies = await prisma.backupPolicy.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return createSuccessResponse<{ policies: BackupPolicyData[] }>({
      policies: policies.map(mapBackupPolicy),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listBackupPolicies] Error:', error);
    return createErrorResponse('Erro ao listar políticas de backup');
  }
}

/**
 * Atualiza uma política de backup
 */
export async function updateBackupPolicy(
  data: z.infer<typeof updateBackupPolicySchema>
): Promise<ActionResponse<{ policy: BackupPolicyData }>> {
  try {
    const validated = updateBackupPolicySchema.parse(data);

    const policy = await prisma.backupPolicy.update({
      where: { id: validated.policyId },
      data: {
        frequency: validated.frequency,
        retentionDays: validated.retentionDays,
        isActive: validated.isActive,
      },
    });

    revalidateTag('backups-list', 'max');

    await logAction(LogResource.BACKUP, LogAction.UPDATE, undefined, {
      policyId: policy.id,
      frequency: policy.frequency,
      retentionDays: policy.retentionDays,
      isActive: policy.isActive,
      target: policy.target,
      action: 'update_policy',
    });

    return createSuccessResponse<{ policy: BackupPolicyData }>({
      policy: mapBackupPolicy(policy),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateBackupPolicy] Error:', error);
    await logError(
      LogResource.BACKUP,
      LogAction.UPDATE,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      {
        policyId: data.policyId,
        action: 'update_policy',
      }
    ).catch(() => {});
    return createErrorResponse(error instanceof Error ? error.message : 'Erro ao atualizar política');
  }
}

/**
 * Cria uma nova política de backup
 */
export async function createBackupPolicy(
  data: z.infer<typeof createBackupPolicySchema>
): Promise<ActionResponse<{ policy: BackupPolicyData }>> {
  try {
    const validated = createBackupPolicySchema.parse(data);

    const policy = await prisma.backupPolicy.create({
      data: {
        frequency: validated.frequency,
        retentionDays: validated.retentionDays,
        target: validated.target,
        isActive: validated.isActive,
        hour: 2, // Default: 2:00 AM
        minute: 0,
        maxBackups: 30,
        notifyOnFailure: true,
      },
    });

    // Registrar em BackupAuditLog
    await prisma.backupAuditLog.create({
      data: {
        action: 'CREATE_POLICY',
        status: 'success',
        details: JSON.stringify({
          policyId: policy.id,
          frequency: policy.frequency,
          retentionDays: policy.retentionDays,
          target: policy.target,
        }),
      },
    });

    revalidateTag('backups-policies', 'max');

    await logAction(LogResource.BACKUP, LogAction.CREATE, undefined, {
      policyId: policy.id,
      frequency: policy.frequency,
      retentionDays: policy.retentionDays,
      target: policy.target,
      isActive: policy.isActive,
      action: 'create_policy',
    });

    return createSuccessResponse<{ policy: BackupPolicyData }>({
      policy: mapBackupPolicy(policy),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createBackupPolicy] Error:', error);
    await logError(
      LogResource.BACKUP,
      LogAction.CREATE,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      {
        action: 'create_policy',
      }
    ).catch(() => {});
    return createErrorResponse(error instanceof Error ? error.message : 'Erro ao criar política');
  }
}

/**
 * Deleta uma política de backup
 */
export async function deleteBackupPolicy(
  policyId: number
): Promise<ActionResponse<void>> {
  try {
    // Registrar em BackupAuditLog
    await prisma.backupAuditLog.create({
      data: {
        action: 'DELETE_POLICY',
        status: 'success',
        details: JSON.stringify({ policyId }),
      },
    });

    await prisma.backupPolicy.delete({
      where: { id: policyId },
    });

    await logAction(LogResource.BACKUP, LogAction.DELETE, undefined, {
      policyId,
      action: 'delete_policy',
    });

    revalidateTag('backups-policies', 'max');

    return createSuccessResponse<void>(undefined);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteBackupPolicy] Error:', error);
    await logError(
      LogResource.BACKUP,
      LogAction.DELETE,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      {
        policyId,
        action: 'delete_policy',
      }
    ).catch(() => {});
    return createErrorResponse(error instanceof Error ? error.message : 'Erro ao deletar política');
  }
}

/**
 * Obtém o status de um job de backup
 */
export async function getBackupJobStatus(
  jobId: string
): Promise<ActionResponse<{ job: BackupJobData }>> {
  try {
    const job = await prisma.backupJob.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return createErrorResponse('Job não encontrado');
    }

    return createSuccessResponse<{ job: BackupJobData }>({
      job: mapBackupJob(job),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getBackupJobStatus] Error:', error);
    return createErrorResponse('Erro ao obter status do job');
  }
}
