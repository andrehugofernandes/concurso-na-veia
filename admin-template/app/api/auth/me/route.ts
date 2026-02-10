import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Não autenticado
 */
export async function GET(req: Request) {
  const isDev = process.env.NODE_ENV !== 'production';
  const DEBUG_AUTH = process.env.DEBUG_AUTH === 'true';
  
  // Logs de diagnóstico seguros (apenas com DEBUG_AUTH=true)
  if (isDev && DEBUG_AUTH) {
    const cookieHeader = req.headers.get('cookie') || '';
    // Não logar o cookie completo (pode expor tokens)
    const cookieNames = cookieHeader.split(';').map(c => c.trim().split('=')[0]);
    console.log('[api/auth/me] Cookies presentes:', cookieNames);
    
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
    console.log('[api/auth/me] Authorization header:', authHeader ? 'presente' : 'ausente');
  }

  const authUser = await getAuthUserFromRequest(req, true); // Atualiza lastSeenAt
  
  if (!authUser) {
    if (isDev && DEBUG_AUTH) {
      console.log('[api/auth/me] ❌ Usuário não autenticado');
    }
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      full_name: true,
      role: true,
      twoFactorEnabled: true,
      avatar_url: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
  }

  // Log apenas com DEBUG_AUTH ativo
  if (isDev && DEBUG_AUTH) {
    console.log('[api/auth/me] ✅ Usuário autenticado:', { 
      username: user.username, 
      role: user.role 
    });
  }

  return NextResponse.json(user);
}
