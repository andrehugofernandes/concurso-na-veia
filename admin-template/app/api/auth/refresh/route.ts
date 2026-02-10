import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { issueTokenPair, verifyRefreshToken } from '@/lib/auth';

export const runtime = 'nodejs';

const RefreshSchema = z.object({
  refreshToken: z.string().min(1),
});

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Renova o access token usando o refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens renovados
 *       401:
 *         description: Refresh token inválido
 */
export async function POST(req: Request) {
  try {
    // Tentar obter do body; se ausente, tentar cookie
    let refreshToken: string | null = null;
    try {
      const json = await req.json();
      const parsed = RefreshSchema.safeParse(json);
      if (parsed.success) refreshToken = parsed.data.refreshToken;
    } catch {
      // Ignorar erro de body vazio
    }

    if (!refreshToken) {
      const cookieHeader = req.headers.get('cookie') || '';
      const cookies = cookieHeader.split(';').reduce((acc, c) => {
        const [name, value] = c.trim().split('=');
        if (name) acc[name] = value;
        return acc;
      }, {} as Record<string, string>);
      // Em dev, priorizar cookies sem prefixo __Host- (que não funcionam em HTTP)
      refreshToken = cookies['refreshToken'] || cookies['__Host-refreshToken'] || null;
      console.log('[refresh] Cookies disponíveis:', Object.keys(cookies));
      console.log('[refresh] Refresh token encontrado:', !!refreshToken);
    }

    if (!refreshToken) {
      console.error('[refresh] Refresh token ausente nos cookies');
      return NextResponse.json({ message: 'Refresh token ausente' }, { status: 401 });
    }

    let userId: string | null = null;
    try {
      const decoded = verifyRefreshToken(refreshToken) as unknown;
      const sub = typeof decoded === 'object' && decoded !== null && 'sub' in decoded ? (decoded as { sub?: unknown }).sub : undefined;
      userId = String(sub ?? '');
    } catch (error) {
      console.error('[refresh] Erro ao verificar refresh token:', error);
      return NextResponse.json({ message: 'Refresh token inválido' }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ message: 'Refresh token inválido' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 401 });
    }

    // Reemite par de tokens (poderíamos optar por rotacionar o refreshToken)
    const tokens = issueTokenPair({ 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role,
      name: user.name || user.full_name || '',
      full_name: user.full_name || user.name || ''
    });
    
    // Criar resposta com os tokens no corpo
    const response = NextResponse.json(tokens);
    
    // Definir cookies HttpOnly seguros
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: (process.env.NODE_ENV === 'production' ? 'strict' : 'lax') as 'strict' | 'lax',
      path: '/',
    };
    
    // Usar nomes de cookies adequados ao ambiente
    const accessCookieName = process.env.NODE_ENV === 'production' ? '__Host-accessToken' : 'accessToken';
    const refreshCookieName = process.env.NODE_ENV === 'production' ? '__Host-refreshToken' : 'refreshToken';
    
    // Cookie de acesso com duração curta (15 minutos)
    response.cookies.set(accessCookieName, tokens.accessToken, {
      ...cookieOptions,
      maxAge: 60 * 15, // 15 minutos
    });
    
    // Cookie de refresh com duração longa (7 dias)
    response.cookies.set(refreshCookieName, tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });
    
    return response;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
