import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import type { Prisma } from '@prisma/client';

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Lista logs do sistema (apenas ADMIN)
 *     security:
 *       - BearerAuth: []
 */
export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  
  // Apenas ADMIN e SYSADMIN podem ver logs
  if (auth.role !== 'ADMIN' && auth.role !== 'SYSADMIN') {
    return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
  }

  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20')));
  const level = url.searchParams.get('level');
  const search = url.searchParams.get('search');

  const skip = (page - 1) * limit;

  // Construir filtros
  const where: Prisma.AccessLogWhereInput = {};
  
  // Filtro por nível (level)
  if (level && ['info', 'warn', 'error', 'debug'].includes(level)) {
    const actionPatterns = getActionPatternsForLevel(level as 'info' | 'warn' | 'error' | 'debug');
    
    where.OR = actionPatterns.map(pattern => ({
      action: { contains: pattern }
    }));
  }
  
  // Filtro por busca (search)
  if (search) {
    // Se já existe OR do filtro de level, precisamos combinar com AND
    if (where.OR) {
      where.AND = [
        { OR: where.OR }, // Mantém filtro de level
        {
          OR: [
            { resource: { contains: search } },
            { action: { contains: search } },
            { details: { contains: search } },
          ]
        }
      ];
      delete where.OR; // Remove OR original
    } else {
      where.OR = [
        { resource: { contains: search } },
        { action: { contains: search } },
        { details: { contains: search } },
      ];
    }
  }

  try {
    const [logs, total] = await Promise.all([
      prisma.accessLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.accessLog.count({ where }),
    ]);

    // Transformar AccessLog para formato de Log esperado pelo frontend
    const transformedLogs = logs.map(log => ({
      id: log.id,
      level: mapActionToLevel(log.action),
      message: generateLogMessage(log),
      resource: log.resource,
      action: log.action,
      userId: log.userId,
      user: log.user,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      createdAt: log.createdAt.toISOString(),
      details: log.details,
    }));

    return NextResponse.json({
      logs: transformedLogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('[api/logs] Erro ao buscar logs:', error);
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}

// Tipos auxiliares
type AccessLogWithUser = Prisma.AccessLogGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
        name: true;
        email: true;
      };
    };
  };
}>;

// Funções auxiliares

/**
 * Retorna os padrões de action que correspondem a cada level
 * Busca por palavras-chave que indicam o tipo de log
 */
function getActionPatternsForLevel(level: 'info' | 'warn' | 'error' | 'debug'): string[] {
  switch (level) {
    case 'error':
      // Busca por ações que indicam erro
      return ['error', 'fail', 'failed', 'exception'];
    case 'warn':
      // Busca por ações que indicam aviso/tentativa
      return ['warn', 'warning', 'unauthorized', 'attempt', 'denied', 'invalid'];
    case 'debug':
      // Busca por ações de debug
      return ['debug', 'cache', 'test'];
    case 'info':
      // Info é o padrão - busca por ações normais do sistema
      return ['login', 'logout', 'upload', 'download', 'view', 'create', 'update', 'delete', 'access', 'success'];
    default:
      return [];
  }
}

function mapActionToLevel(action: string): 'info' | 'warn' | 'error' | 'debug' {
  const lowerAction = action.toLowerCase();
  
  // Verifica se é erro
  if (['error', 'fail', 'failed', 'exception'].some(keyword => lowerAction.includes(keyword))) {
    return 'error';
  }
  
  // Verifica se é aviso
  if (['warn', 'warning', 'unauthorized', 'attempt', 'denied', 'invalid'].some(keyword => lowerAction.includes(keyword))) {
    return 'warn';
  }
  
  // Verifica se é debug
  if (['debug', 'cache', 'test'].some(keyword => lowerAction.includes(keyword))) {
    return 'debug';
  }
  
  // Padrão é info
  return 'info';
}

function generateLogMessage(log: AccessLogWithUser): string {
  const action = log.action;
  const resource = log.resource;
  const username = log.user?.username || 'Sistema';
  
  // Gerar mensagens baseadas na ação
  switch (action) {
    case 'login':
      return `Usuário ${username} realizou login com sucesso`;
    case 'logout':
      return `Usuário ${username} fez logout`;
    case 'upload':
      return `Usuário ${username} fez upload de arquivo`;
    case 'download':
      return `Usuário ${username} baixou um arquivo`;
    case 'login_attempt':
      return `Tentativa de login detectada para ${username}`;
    case 'unauthorized_access':
      return `Tentativa de acesso não autorizado`;
    default:
      return log.details || `Ação ${action} executada no recurso ${resource}`;
  }
}
