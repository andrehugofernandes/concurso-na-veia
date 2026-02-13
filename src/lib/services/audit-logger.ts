/**
 * Serviço de auditoria e logging (Phase 20)
 * Responsável por registrar todas as ações de usuários no dashboard
 */

import { db as prisma } from '@/lib/db';
import {
  LogLevel,
  LogResource,
  LogAction,
  LogEntry,
  getLogLevelForAction,
} from '@/lib/types/audit-log';

/**
 * Registra uma ação no sistema de auditoria
 */
export async function logAction(
  resource: LogResource | string,
  action: LogAction | string,
  userId?: string,
  details?: Record<string, unknown>,
  ipAddress?: string,
  userAgent?: string,
): Promise<LogEntry> {
  try {
    // Determinar o nível de severidade baseado na ação
    const level = getLogLevelForAction(action);

    // Gerar mensagem legível
    const message = generateLogMessage({
      resource,
      action,
      userId,
      details,
    });

    // Criar entrada de log no banco de dados
    const log = await prisma.accessLog.create({
      data: {
        level,
        message,
        resource: String(resource),
        action: String(action),
        userId: userId || null,
        ipAddress: ipAddress || 'unknown',
        userAgent: userAgent || null,
        details: details ? JSON.stringify(details) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    // Transformar para LogEntry
    return transformAccessLogToLogEntry(log);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[audit-logger] Erro ao registrar ação:', {
      resource,
      action,
      userId,
      error: error instanceof Error ? error.message : String(error),
    });

    // Retornar um log de erro em memória se o banco falhar
    return {
      id: `error-${Date.now()}`,
      level: LogLevel.ERROR,
      message: `Erro ao registrar ação: ${String(error)}`,
      resource: String(resource),
      action: String(action),
      userId,
      ipAddress,
      userAgent,
      createdAt: new Date().toISOString(),
      details: JSON.stringify({
        originalError: error instanceof Error ? error.message : String(error),
      }),
    };
  }
}

/**
 * Registra uma ação de erro
 */
export async function logError(
  resource: LogResource | string,
  action: LogAction | string,
  error: Error | string,
  userId?: string,
  details?: Record<string, unknown>,
  ipAddress?: string,
  userAgent?: string,
): Promise<LogEntry> {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return logAction(
    resource,
    action,
    userId,
    {
      ...details,
      error: errorMessage,
      errorStack: error instanceof Error ? error.stack : undefined,
    },
    ipAddress,
    userAgent,
  );
}

/**
 * Registra um aviso
 */
export async function logWarning(
  resource: LogResource | string,
  action: LogAction | string,
  message: string,
  userId?: string,
  details?: Record<string, unknown>,
  ipAddress?: string,
  userAgent?: string,
): Promise<LogEntry> {
  try {
    const log = await prisma.accessLog.create({
      data: {
        level: LogLevel.WARN,
        message,
        resource: String(resource),
        action: String(action),
        userId: userId || null,
        ipAddress: ipAddress || 'unknown',
        userAgent: userAgent || null,
        details: details ? JSON.stringify(details) : null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    return transformAccessLogToLogEntry(log);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[audit-logger] Erro ao registrar aviso:', error);
    throw error;
  }
}

/**
 * Gera uma mensagem legível para o log
 */
function generateLogMessage(input: {
  resource: LogResource | string;
  action: LogAction | string;
  userId?: string;
  details?: Record<string, unknown>;
}): string {
  const { resource, action, details } = input;

  // Mapeamento de mensagens por ação
  const messageMap: Record<string, string> = {
    // Autenticação
    [LogAction.LOGIN]: `Usuário realizou login com sucesso`,
    [LogAction.LOGOUT]: `Usuário fez logout`,
    [LogAction.SETUP_2FA]: `Autenticação de dois fatores configurada`,
    [LogAction.VERIFY_2FA]: `Código 2FA verificado com sucesso`,
    [LogAction.RESET_PASSWORD]: `Senha redefinida`,
    [LogAction.LOGIN_ATTEMPT_FAILED]: `Tentativa de login falhou`,
    [LogAction.LOGIN_ATTEMPT_2FA_FAILED]: `Tentativa de verificação 2FA falhou`,
    [LogAction.UNAUTHORIZED_ACCESS]: `Tentativa de acesso não autorizado`,

    // CRUD básico
    [LogAction.CREATE]: `${resource} criado(a)`,
    [LogAction.READ]: `${resource} visualizado(a)`,
    [LogAction.UPDATE]: `${resource} atualizado(a)`,
    [LogAction.DELETE]: `${resource} deletado(a)`,

    // Conteúdo
    [LogAction.PUBLISH]: `${resource} publicado(a)`,
    [LogAction.UNPUBLISH]: `${resource} despublicado(a)`,
    [LogAction.RESTORE]: `${resource} restaurado(a)`,

    // Comentários
    [LogAction.APPROVE]: `${resource} aprovado(a)`,
    [LogAction.REJECT]: `${resource} rejeitado(a)`,
    [LogAction.MARK_AS_SPAM]: `${resource} marcado(a) como spam`,

    // Permissões
    [LogAction.GRANT_PERMISSION]: `Permissão concedida`,
    [LogAction.REVOKE_PERMISSION]: `Permissão revogada`,
    [LogAction.UPDATE_ROLE]: `Função do usuário atualizada`,

    // Backup
    [LogAction.CREATE_BACKUP]: `Backup criado`,
    [LogAction.RESTORE_BACKUP]: `Backup restaurado`,
    [LogAction.DELETE_BACKUP]: `Backup deletado`,

    // Auditoria
    [LogAction.VIEW_LOGS]: `Logs visualizados`,
    [LogAction.FILTER_LOGS]: `Logs filtrados`,
    [LogAction.EXPORT_LOGS]: `Logs exportados`,

    // Ações em massa
    [LogAction.BULK_DELETE]: `${details?.count || 'múltiplos'} ${resource}s deletados`,
    [LogAction.BULK_PUBLISH]: `${details?.count || 'múltiplos'} ${resource}s publicados`,
    [LogAction.BULK_UNPUBLISH]: `${details?.count || 'múltiplos'} ${resource}s despublicados`,
    [LogAction.BULK_APPROVE]: `${details?.count || 'múltiplos'} ${resource}s aprovados`,

    // Upload
    [LogAction.UPLOAD]: `Arquivo enviado`,
    [LogAction.UPLOAD_FAILED]: `Falha ao enviar arquivo`,

    // Erro genérico
    [LogAction.EXCEPTION]: `Erro ao processar ${resource}`,
  };

  return messageMap[String(action)] || `Ação ${action} executada no recurso ${resource}`;
}

/**
 * Transforma um AccessLog do Prisma em LogEntry
 */
function transformAccessLogToLogEntry(log: {
  id: string;
  level: string;
  message: string;
  resource: string;
  action: string;
  userId: string | null;
  user: { id: string; username: string; fullName: string | null; email: string } | null;
  ipAddress: string;
  userAgent: string | null;
  createdAt: Date;
  details: string | null;
}): LogEntry {
  return {
    id: log.id,
    level: log.level as LogLevel,
    message: log.message,
    resource: log.resource,
    action: log.action,
    userId: log.userId || undefined,
    user: log.user
      ? {
          id: log.user.id,
          username: log.user.username,
          fullName: log.user.fullName || undefined,
          email: log.user.email,
        }
      : undefined,
    ipAddress: log.ipAddress,
    userAgent: log.userAgent || undefined,
    createdAt: log.createdAt.toISOString(),
    details: log.details || undefined,
  };
}

/**
 * Extrai IP real da requisição (considerando proxies)
 */
export function extractIpAddress(request: Request): string {
  // Verificar headers de proxy
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // x-forwarded-for pode conter múltiplos IPs, pegar o primeiro
    return xForwardedFor.split(',')[0].trim();
  }

  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp;
  }

  // Fallback para IP da conexão
  return 'unknown';
}

/**
 * Extrai User-Agent da requisição
 */
export function extractUserAgent(request: Request): string | undefined {
  return request.headers.get('user-agent') || undefined;
}

/**
 * Contexto de auditoria para usar em Server Actions
 */
export interface AuditContext {
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Cria um contexto de auditoria a partir de uma requisição
 */
export function createAuditContext(request: Request, userId?: string): AuditContext {
  return {
    userId,
    ipAddress: extractIpAddress(request),
    userAgent: extractUserAgent(request),
  };
}

/**
 * Middleware para extrair informações de auditoria de uma requisição
 * Pode ser usado em API routes
 */
export function extractAuditInfo(request: Request) {
  return {
    ipAddress: extractIpAddress(request),
    userAgent: extractUserAgent(request),
  };
}
