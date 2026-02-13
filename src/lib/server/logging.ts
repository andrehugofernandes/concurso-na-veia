import { db } from '@/lib/db';

interface LogActivityParams {
  action: string;
  resource: string;
  userId?: string;
  details?: unknown;
  request?: Request;
  ipAddress?: string | null;
  userAgent?: string | null;
  allowAnonymous?: boolean;
}

const FALLBACK_IP = '0.0.0.0';

const toJson = (details?: unknown): string | undefined => {
  if (!details) return undefined;
  try {
    return typeof details === 'string' ? details : JSON.stringify(details);
  } catch {
    return undefined;
  }
};

const extractIp = (params: LogActivityParams): string => {
  if (params.ipAddress) return params.ipAddress;
  const forwarded = params.request?.headers.get('x-forwarded-for');
  if (forwarded) {
    const [first] = forwarded.split(',');
    if (first) return first.trim();
  }
  const remote = params.request?.headers.get('x-real-ip');
  if (remote) return remote;
  return FALLBACK_IP;
};

const extractUserAgent = (params: LogActivityParams): string | null => {
  if (params.userAgent) return params.userAgent;
  return params.request?.headers.get('user-agent') ?? null;
};

/**
 * Registra logs de auditoria no modelo `AccessLog`.
 * Falhas na escrita são registradas no console, mas não interrompem o fluxo da API.
 */
export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    const hasUserId = Boolean(params.userId);
    
    if (!hasUserId && !params.allowAnonymous) {
      return;
    }

    const message = params.details
      ? toJson(params.details) ?? params.action ?? 'log'
      : params.action ?? 'log';

    const logData = {
      action: params.action,
      resource: params.resource,
      userId: params.userId || null,
      ipAddress: extractIp(params),
      userAgent: extractUserAgent(params),
      details: toJson(params.details),
      message,
    };

    await db.accessLog.create({
      data: logData,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[logActivity] Falha ao registrar log', params, error);
  }
}
