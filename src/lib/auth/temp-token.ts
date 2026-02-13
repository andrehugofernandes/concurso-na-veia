import jwt from 'jsonwebtoken';

const TEMP_TOKEN_SECRET = process.env.TEMP_TOKEN_SECRET || 'temp-secret-key-change-in-production';
const TEMP_TOKEN_EXPIRY = '10m'; // 10 minutos

export interface TempTokenData {
  userId: string;
  iat?: number;
  exp?: number;
}

/**
 * Gera um token temporário para fluxo de 2FA
 * @param userId ID do usuário
 * @returns Token JWT com expiração de 5 minutos
 */
export function generateTempToken(userId: string): string {
  return jwt.sign(
    { userId },
    TEMP_TOKEN_SECRET,
    { expiresIn: TEMP_TOKEN_EXPIRY }
  );
}

/**
 * Verifica e decodifica um token temporário
 * @param token Token JWT a verificar
 * @returns Dados do token se válido, null se inválido ou expirado
 */
export function verifyTempToken(token: string): TempTokenData | null {
  try {
    const decoded = jwt.verify(token, TEMP_TOKEN_SECRET) as TempTokenData;
    return decoded;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('[TempToken] Verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}
