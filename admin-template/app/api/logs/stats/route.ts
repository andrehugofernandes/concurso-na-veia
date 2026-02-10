import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

type LevelKey = 'error' | 'warn' | 'info' | 'debug';

const normalizeString = (value: string) => value.toLowerCase();

const resolveLevel = (action: string): LevelKey => {
  const normalized = normalizeString(action);
  if (normalized.includes('failed') || normalized.includes('error') || normalized.includes('unauthorized')) {
    return 'error';
  }
  if (normalized.includes('attempt') || normalized.includes('warn')) {
    return 'warn';
  }
  return 'info';
};

const LEGACY_DOMAIN_MAP: Record<string, string> = {
  upload: 'file',
  download: 'file',
  logout: 'auth',
  login: 'auth',
};

const resolveDomain = (action: string): string => {
  if (!action) return 'other';
  if (action.includes(':')) return action.split(':')[0] || 'other';
  return LEGACY_DOMAIN_MAP[action] ?? 'other';
};

/**
 * @swagger
 * /api/logs/stats:
 *   get:
 *     summary: Estatísticas dos logs (apenas ADMIN)
 *     security:
 *       - BearerAuth: []
 */
export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  
  // ADMIN, COORDENADOR, USER e SYSADMIN podem ver estatísticas de logs
  if (auth.role !== 'ADMIN' && auth.role !== 'COORDENADOR' && auth.role !== 'USER' && auth.role !== 'SYSADMIN') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
  }

  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalLogs,
      logsToday,
      logsThisWeek,
      logsThisMonth,
      actionGroups,
    ] = await Promise.all([
      prisma.accessLog.count(),
      prisma.accessLog.count({ where: { createdAt: { gte: today } } }),
      prisma.accessLog.count({ where: { createdAt: { gte: thisWeek } } }),
      prisma.accessLog.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.accessLog.groupBy({
        by: ['action'],
        _count: { _all: true },
      }),
    ]);

    const logsByLevel: Record<LevelKey, number> = {
      error: 0,
      warn: 0,
      info: 0,
      debug: 0,
    };

    const logsByDomain: Record<string, number> = {};

    for (const group of actionGroups) {
      const count = group._count._all;
      const level = resolveLevel(group.action);
      logsByLevel[level] += count;

      const domain = resolveDomain(group.action);
      logsByDomain[domain] = (logsByDomain[domain] ?? 0) + count;
    }

    return NextResponse.json({
      totalLogs,
      logsToday,
      logsThisWeek,
      logsThisMonth,
      logsByLevel,
      logsByDomain,
    });
  } catch (error) {
    console.error('[api/logs/stats] Erro ao buscar estatísticas:', error);
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
