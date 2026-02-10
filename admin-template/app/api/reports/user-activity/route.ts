import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    const normalizedRole = (user.role ?? '').toUpperCase();
    // Permitir SYSADMIN e ADMIN
    if (normalizedRole !== 'SYSADMIN' && normalizedRole !== 'ADMIN') {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }

    // Buscar usuários agrupados por papel
    const users = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        id: true,
      },
    });

    // Buscar total de usuários ativos (com 2FA habilitado ou que já fizeram login)
    const activeUsersCount = await prisma.user.count({
      where: {
        OR: [
          { twoFactorEnabled: true },
          { updatedAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } }, // Ativos nos últimos 90 dias
        ],
      },
    });

    const totalUsers = users.reduce((sum, item) => sum + (item._count?.id ?? 0), 0);
    const inactiveUsers = totalUsers - activeUsersCount;

    // Montar items com percentual
    const items = users.map((item) => ({
      role: item.role ?? 'SEM PAPEL',
      userCount: item._count?.id ?? 0,
      percentage: totalUsers > 0 ? ((item._count?.id ?? 0) / totalUsers) * 100 : 0,
    }));

    // Ordenar por quantidade de usuários (decrescente)
    items.sort((a, b) => b.userCount - a.userCount);

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      totalUsers,
      activeUsers: activeUsersCount,
      inactiveUsers,
      items,
    });
  } catch (error) {
    console.error('[API] /api/reports/user-activity error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de atividade de usuários' },
      { status: 500 },
    );
  }
}
