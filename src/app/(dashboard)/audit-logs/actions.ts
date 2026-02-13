'use server';

import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';

// ============================================================================
// Schemas
// ============================================================================

const listAuditLogsSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(20),
  userId: z.string().optional(),
  action: z.string().optional(),
  resource: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const exportLogsCSVSchema = z.object({
  userId: z.string().optional(),
  action: z.string().optional(),
  resource: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// ============================================================================
// Types
// ============================================================================

export interface AuditLogData {
  id: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string | null;
  details: string | null;
  createdAt: string;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
}

export interface AuditLogListResult {
  logs: AuditLogData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuditLogFilters {
  actions: string[];
  resources: string[];
  users: { id: string; name: string; email: string }[];
}

export interface AuditLogStats {
  totalLogs: number;
  logsToday: number;
  logsThisWeek: number;
  errorLogs: number;
}

// ============================================================================
// Helpers
// ============================================================================

function mapAuditLog(log: {
  id: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string | null;
  details: string | null;
  createdAt: Date;
  userId: string | null;
  user: { username: string; email: string } | null;
}): AuditLogData {
  return {
    id: log.id,
    action: log.action,
    resource: log.resource,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent,
    details: log.details,
    createdAt: log.createdAt.toISOString(),
    userId: log.userId,
    userName: log.user?.username || null,
    userEmail: log.user?.email || null,
  };
}

function buildWhereClause(params: {
  userId?: string;
  action?: string;
  resource?: string;
  startDate?: string;
  endDate?: string;
}) {
  const where: Record<string, unknown> = {};

  if (params.userId) {
    where.userId = params.userId;
  }

  if (params.action) {
    where.action = { contains: params.action, mode: 'insensitive' };
  }

  if (params.resource) {
    where.resource = { contains: params.resource, mode: 'insensitive' };
  }

  if (params.startDate || params.endDate) {
    where.createdAt = {};
    if (params.startDate) {
      (where.createdAt as Record<string, Date>).gte = new Date(params.startDate);
    }
    if (params.endDate) {
      const endDate = new Date(params.endDate);
      endDate.setHours(23, 59, 59, 999);
      (where.createdAt as Record<string, Date>).lte = endDate;
    }
  }

  return where;
}

// ============================================================================
// Actions
// ============================================================================

/**
 * Lista logs de auditoria com paginação e filtros
 */
export async function listAuditLogs(
  params: z.infer<typeof listAuditLogsSchema> = { page: 1, pageSize: 20 }
): Promise<ActionResponse<AuditLogListResult>> {
  try {
    const validated = listAuditLogsSchema.parse(params);
    const { page, pageSize, ...filters } = validated;

    const where = buildWhereClause(filters);

    const [logs, total] = await Promise.all([
      prisma.accessLog.findMany({
        where,
        include: {
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.accessLog.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return createSuccessResponse<AuditLogListResult>({
      logs: logs.map(mapAuditLog),
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch {
    return createErrorResponse('Erro ao listar logs de auditoria');
  }
}

/**
 * Obtém filtros disponíveis para logs de auditoria
 */
export async function getAuditLogFilters(): Promise<ActionResponse<AuditLogFilters>> {
  try {
    const [actionsResult, resourcesResult, usersResult] = await Promise.all([
      prisma.accessLog.findMany({
        select: { action: true },
        distinct: ['action'],
        orderBy: { action: 'asc' },
      }),
      prisma.accessLog.findMany({
        select: { resource: true },
        distinct: ['resource'],
        orderBy: { resource: 'asc' },
        take: 100, // Limitar recursos únicos
      }),
      prisma.dashboardUser.findMany({
        select: { id: true, username: true, email: true },
        orderBy: { username: 'asc' },
      }),
    ]);

    return createSuccessResponse<AuditLogFilters>({
      actions: actionsResult.map((a) => a.action),
      resources: resourcesResult.map((r) => r.resource),
      users: usersResult.map((u) => ({
        id: u.id,
        name: u.username || u.email,
        email: u.email,
      })),
    });
  } catch {
    return createErrorResponse('Erro ao obter filtros');
  }
}

/**
 * Exporta logs de auditoria em formato CSV
 */
export async function exportLogsCSV(
  params: z.infer<typeof exportLogsCSVSchema> = {}
): Promise<ActionResponse<{ csv: string; filename: string }>> {
  try {
    const validated = exportLogsCSVSchema.parse(params);
    const where = buildWhereClause(validated);

    const logs = await prisma.accessLog.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10000, // Limite de exportação
    });

    // Gerar CSV
    const headers = [
      'ID',
      'Data/Hora',
      'Ação',
      'Recurso',
      'Usuário',
      'Email',
      'IP',
      'User Agent',
      'Detalhes',
    ];

    const rows = logs.map((log) => [
      log.id,
      new Date(log.createdAt).toLocaleString('pt-BR'),
      log.action,
      log.resource,
      log.user?.username || '-',
      log.user?.email || '-',
      log.ipAddress,
      log.userAgent || '-',
      log.details || '-',
    ]);

    const csvContent = [
      headers.join(';'),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';')
      ),
    ].join('\n');

    const filename = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;

    return createSuccessResponse<{ csv: string; filename: string }>({
      csv: csvContent,
      filename,
    });
  } catch {
    return createErrorResponse('Erro ao exportar logs');
  }
}

/**
 * Obtém detalhes de um log específico
 */
export async function getAuditLogDetails(
  logId: string
): Promise<ActionResponse<{ log: AuditLogData }>> {
  try {
    const log = await prisma.accessLog.findUnique({
      where: { id: logId },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    if (!log) {
      return createErrorResponse('Log não encontrado');
    }

    return createSuccessResponse<{ log: AuditLogData }>({
      log: mapAuditLog(log),
    });
  } catch {
    return createErrorResponse('Erro ao obter detalhes do log');
  }
}

/**
 * Obtém estatísticas agregadas para os cards do sistema de logs
 * Usa a mesma lógica de classificação de nível (resolveLevel) do projeto de referência.
 */
export async function getAuditLogStats(): Promise<ActionResponse<AuditLogStats>> {
  try {
    const normalizeString = (value: string): string => value.toLowerCase();

    const resolveLevel = (action: string): 'error' | 'warn' | 'info' | 'debug' => {
      const normalized = normalizeString(action || '');
      if (
        normalized.includes('failed') ||
        normalized.includes('error') ||
        normalized.includes('unauthorized')
      ) {
        return 'error';
      }
      if (normalized.includes('attempt') || normalized.includes('warn')) {
        return 'warn';
      }
      return 'info';
    };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [totalLogs, logsToday, logsThisWeek, actionGroups] = await Promise.all([
      prisma.accessLog.count(),
      prisma.accessLog.count({ where: { createdAt: { gte: today } } }),
      prisma.accessLog.count({ where: { createdAt: { gte: thisWeek } } }),
      prisma.accessLog.groupBy({
        by: ['action'],
        _count: { _all: true },
      }),
    ]);

    let errorLogs = 0;
    for (const group of actionGroups) {
      const level = resolveLevel(group.action);
      if (level === 'error') {
        errorLogs += group._count._all;
      }
    }

    return createSuccessResponse<AuditLogStats>({
      totalLogs,
      logsToday,
      logsThisWeek,
      errorLogs,
    });
  } catch {
    return createErrorResponse('Erro ao obter estatísticas dos logs');
  }
}
