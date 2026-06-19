type RateLimitInfo = {
  count: number;
  resetAt: number;
};

// Map simples em memória para guardar limites de requisição por IP/Token.
// Atenção: em produção com múltiplas instâncias Serverless (ex: Vercel), o ideal é substituir 
// por um armazenamento distribuído como Upstash Redis para consistência.
const rateLimitMap = new Map<string, RateLimitInfo>();

/**
 * Aplica um limite de requisições baseado em uma janela de tempo.
 * @param identifier Um identificador único (ex: IP, User ID).
 * @param limit Número máximo de requisições permitidas.
 * @param windowMs Janela de tempo em milissegundos.
 */
export async function rateLimit(identifier: string, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const info = rateLimitMap.get(identifier);

  // Limpa entradas que já expiraram
  if (info && info.resetAt < now) {
    rateLimitMap.delete(identifier);
  }

  const current = rateLimitMap.get(identifier) || { count: 0, resetAt: now + windowMs };
  current.count += 1;

  rateLimitMap.set(identifier, current);

  if (current.count > limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: current.resetAt,
    };
  }

  return {
    success: true,
    limit,
    remaining: limit - current.count,
    reset: current.resetAt,
  };
}
