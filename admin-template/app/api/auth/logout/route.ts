import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';

export const runtime = 'nodejs';

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Encerra a sessão do usuário
 *     description: Remove cookies de sessão (token e refresh em desenvolvimento, __Host-token e __Host-refresh em produção) e invalida a sessão atual.
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 */
export async function POST(request: Request) {
  const auth = getAuthUserFromRequest(request);
  const res = NextResponse.json({ success: true, message: 'Logout realizado com sucesso' });
  
  // Limpar cookies de autenticação legados
  res.cookies.delete('token');
  res.cookies.delete('refreshToken');
  res.cookies.delete('auth_token');
  res.cookies.delete('session_token');
  res.cookies.delete('auth_pcd_adm'); // Cookie do sistema AD antigo
  
  // Limpar cookies HttpOnly seguros
  res.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  res.cookies.set('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  // Limpar possíveis cookies com prefixo __Host-
  res.cookies.set('__Host-accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  res.cookies.set('__Host-refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  res.cookies.set('__Host-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  if (auth) {
    await logActivity({
      action: 'auth:logout',
      resource: 'auth',
      userId: auth.id,
      request,
      details: { username: auth.username },
    });
  }
  
  return res;
}
