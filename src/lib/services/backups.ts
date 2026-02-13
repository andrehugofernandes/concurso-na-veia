import { db } from '@/lib/db';
import { logActivity } from '@/lib/server/logging';

export type BackupJobStatus = 'pending' | 'running' | 'completed' | 'failed';
export type BackupType = 'full' | 'incremental';

export type BackupJobResponse = {
  id: string;
  type: BackupType;
  status: BackupJobStatus;
  startedAt: string;
  finishedAt?: string;
  size?: number;
  filePath?: string;
  errorMsg?: string;
  triggeredBy?: string;
  createdAt: string;
};

export const backupsService = {
  async list(limit: number = 20, offset: number = 0) {
    const jobs = await db.backupJob.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    const total = await db.backupJob.count();

    return {
      jobs: jobs.map((job) => ({
        id: job.id,
        type: job.type as BackupType,
        status: job.status as BackupJobStatus,
        startedAt: job.startedAt.toISOString(),
        finishedAt: job.finishedAt?.toISOString(),
        size: job.size?.toString(),
        filePath: job.filePath,
        errorMsg: job.errorMsg,
        triggeredBy: job.triggeredBy,
        createdAt: job.createdAt.toISOString(),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  },

  async getById(id: string) {
    const job = await db.backupJob.findUnique({
      where: { id },
      include: { auditLogs: true },
    });

    if (!job) return null;

    return {
      id: job.id,
      type: job.type as BackupType,
      status: job.status as BackupJobStatus,
      startedAt: job.startedAt.toISOString(),
      finishedAt: job.finishedAt?.toISOString(),
      size: job.size?.toString(),
      filePath: job.filePath,
      errorMsg: job.errorMsg,
      triggeredBy: job.triggeredBy,
      createdAt: job.createdAt.toISOString(),
      auditLogs: job.auditLogs.map((log) => ({
        id: log.id,
        action: log.action,
        status: log.status,
        details: log.details,
        createdAt: log.createdAt.toISOString(),
      })),
    };
  },

  async createJob(
    type: BackupType,
    triggeredBy: string | null,
    userId?: string
  ) {
    const job = await db.backupJob.create({
      data: {
        type,
        status: 'pending',
        startedAt: new Date(),
        triggeredBy,
      },
    });

    if (userId) {
      await logActivity({
        action: 'BACKUP_INITIATED',
        resource: 'backup_job',
        userId,
        details: { backupId: job.id, type },
      });
    }

    return job.id;
  },

  async updateJobStatus(
    id: string,
    status: BackupJobStatus,
    details?: { size?: number; filePath?: string; errorMsg?: string }
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { status };

    if (status === 'completed') {
      updateData.finishedAt = new Date();
      if (details?.size) updateData.size = BigInt(details.size);
      if (details?.filePath) updateData.filePath = details.filePath;
    } else if (status === 'failed') {
      updateData.finishedAt = new Date();
      if (details?.errorMsg) updateData.errorMsg = details.errorMsg;
    }

    return db.backupJob.update({
      where: { id },
      data: updateData,
    });
  },

  async getPolicy() {
    return db.backupPolicy.findFirst();
  },

  async updatePolicy(data: {
    frequency?: string;
    hour?: number;
    minute?: number;
    retentionDays?: number;
    isActive?: boolean;
  }) {
    const policy = await db.backupPolicy.findFirst();

    if (!policy) {
      return db.backupPolicy.create({
        data: {
          frequency: data.frequency || 'daily',
          hour: data.hour || 2,
          minute: data.minute || 0,
          retentionDays: data.retentionDays || 30,
          isActive: data.isActive !== false,
        },
      });
    }

    return db.backupPolicy.update({
      where: { id: policy.id },
      data,
    });
  },
};
