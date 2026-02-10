import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

/**
 * @swagger
 * /api/admin/dashboard/stats:
 *   get:
 *     summary: Estatísticas do dashboard (ADMIN e COORDENADOR)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas do sistema
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
export async function GET(req: Request) {
  const authUser = await getAuthUserFromRequest(req);
  if (!authUser) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir ADMIN, COORDENADOR e SYSADMIN
  if (authUser.role !== 'ADMIN' && authUser.role !== 'COORDENADOR' && authUser.role !== 'SYSADMIN') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  // Contagens básicas
  const [usersCount, filesCount, downloadsCount] = await Promise.all([
    prisma.user.count(),
    prisma.file.count(),
    prisma.download.count(),
  ]);

  // Usuários ativos nos últimos 7 dias (Access)
  let activeUsers = 0;
  try {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const result = await prisma.access.findMany({
      where: { createdAt: { gte: since } },
      distinct: ['userId'],
      select: { userId: true },
    });
    activeUsers = result.length;
  } catch {
    activeUsers = 0;
  }

  return NextResponse.json({ usersCount, filesCount, downloadsCount, activeUsers });
}
