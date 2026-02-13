import { PrismaClient } from '@/generated/client';

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const MAX_FAILED_ATTEMPTS = 5;
const RATE_LIMIT_STORAGE = new Map<string, { attempts: number; resetAt: number }>();

/**
 * Verifica se um usuário está bloqueado por rate limiting
 */
export async function isRateLimited(username: string): Promise<boolean> {
  const key = `login:${username}`;
  const record = RATE_LIMIT_STORAGE.get(key);

  if (!record) {
    return false;
  }

  const now = Date.now();

  // Se a janela de tempo expirou, limpar registro
  if (now > record.resetAt) {
    RATE_LIMIT_STORAGE.delete(key);
    return false;
  }

  // Se atingiu o limite de tentativas
  return record.attempts >= MAX_FAILED_ATTEMPTS;
}

/**
 * Registra uma tentativa de login falhada
 */
export async function recordFailedLoginAttempt(username: string): Promise<void> {
  const key = `login:${username}`;
  const record = RATE_LIMIT_STORAGE.get(key);
  const now = Date.now();

  if (!record) {
    RATE_LIMIT_STORAGE.set(key, {
      attempts: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
  } else {
    // Se a janela de tempo expirou, resetar
    if (now > record.resetAt) {
      RATE_LIMIT_STORAGE.set(key, {
        attempts: 1,
        resetAt: now + RATE_LIMIT_WINDOW,
      });
    } else {
      record.attempts += 1;
    }
  }
}

/**
 * Limpa tentativas de login falhadas para um usuário
 */
export async function clearFailedLoginAttempts(username: string): Promise<void> {
  const key = `login:${username}`;
  RATE_LIMIT_STORAGE.delete(key);
}

/**
 * Registra auditoria de login
 */
export async function logLoginAudit(
  prisma: PrismaClient,
  userId: string | null,
  username: string,
  action: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGIN_RATE_LIMITED',
  ipAddress: string = '0.0.0.0',
  userAgent: string = '',
  details?: string
): Promise<void> {
  try {
    // Determinar nível e mensagem baseado na ação
    const levelMap: Record<string, string> = {
      LOGIN_SUCCESS: 'info',
      LOGIN_FAILED: 'warn',
      LOGIN_RATE_LIMITED: 'error',
    };
    const messageMap: Record<string, string> = {
      LOGIN_SUCCESS: `Login bem-sucedido para ${username}`,
      LOGIN_FAILED: `Falha no login para ${username}`,
      LOGIN_RATE_LIMITED: `Rate limit excedido para ${username}`,
    };

    await prisma.accessLog.create({
      data: {
        level: levelMap[action] || 'info',
        message: messageMap[action] || action,
        action,
        resource: 'auth',
        userId: userId || undefined,
        ipAddress,
        userAgent,
        details,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to log audit:', error);
  }
}

/**
 * Atualiza lastLoginAt do usuário
 */
export async function updateLastLoginAt(
  prisma: PrismaClient,
  userId: string
): Promise<void> {
  try {
    await prisma.dashboardUser.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update lastLoginAt:', error);
  }
}

/**
 * Obtém informações de tentativas de login falhadas
 */
export async function getFailedLoginAttempts(username: string): Promise<number> {
  const key = `login:${username}`;
  const record = RATE_LIMIT_STORAGE.get(key);

  if (!record) {
    return 0;
  }

  const now = Date.now();

  // Se a janela de tempo expirou, retornar 0
  if (now > record.resetAt) {
    RATE_LIMIT_STORAGE.delete(key);
    return 0;
  }

  return record.attempts;
}
