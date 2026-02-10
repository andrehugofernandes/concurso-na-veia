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

    // Período: últimos 7 dias
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Buscar tentativas de login falhadas
    const failedLogins = await prisma.accessLog.count({
      where: {
        action: 'auth:login:failed',
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Buscar logins bem-sucedidos
    const successfulLogins = await prisma.accessLog.count({
      where: {
        action: 'auth:login',
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Buscar mudanças de permissões
    const permissionChanges = await prisma.accessLog.count({
      where: {
        action: { in: ['user:update', 'user:create'] },
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Buscar usuários criados
    const usersCreated = await prisma.user.count({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Buscar usuários desativados
    const usersDeactivated = await prisma.user.count({
      where: {
        active: false,
        deactivatedAt: { gte: sevenDaysAgo },
      },
    });

    // Buscar ativações/desativações de 2FA
    const twoFactorChanges = await prisma.accessLog.count({
      where: {
        action: { in: ['2fa:enable', '2fa:disable'] },
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Buscar acessos fora do horário (18h-8h)
    const afterHoursAccess = await prisma.accessLog.count({
      where: {
        createdAt: { gte: sevenDaysAgo },
        OR: [
          { createdAt: { gte: new Date(new Date().setHours(18, 0, 0, 0)) } },
          { createdAt: { lte: new Date(new Date().setHours(8, 0, 0, 0)) } },
        ],
      },
    });

    // Buscar últimos eventos de segurança
    const recentSecurityEvents = await prisma.accessLog.findMany({
      where: {
        action: {
          in: [
            'auth:login:failed',
            'user:create',
            'user:deactivate',
            '2fa:enable',
            '2fa:disable',
            'user:update',
          ],
        },
        createdAt: { gte: sevenDaysAgo },
      },
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        action: true,
        createdAt: true,
        userId: true,
        details: true,
      },
    });

    // Calcular alertas
    const alerts = [];
    if (failedLogins > 10) {
      alerts.push({
        level: 'HIGH',
        message: `${failedLogins} tentativas de login falhadas nos últimos 7 dias`,
      });
    }
    if (afterHoursAccess > 50) {
      alerts.push({
        level: 'MEDIUM',
        message: `${afterHoursAccess} acessos fora do horário comercial`,
      });
    }
    if (usersCreated > 5) {
      alerts.push({
        level: 'INFO',
        message: `${usersCreated} novos usuários criados`,
      });
    }

    return NextResponse.json({
      period: {
        start: sevenDaysAgo.toISOString(),
        end: new Date().toISOString(),
      },
      generatedAt: new Date().toISOString(),
      summary: {
        failedLogins,
        successfulLogins,
        loginSuccessRate: successfulLogins + failedLogins > 0 
          ? Math.round((successfulLogins / (successfulLogins + failedLogins)) * 10000) / 100 
          : 100,
        permissionChanges,
        usersCreated,
        usersDeactivated,
        twoFactorChanges,
        afterHoursAccess,
      },
      alerts,
      recentEvents: recentSecurityEvents.map((event, index) => ({
        position: index + 1,
        id: event.id,
        action: event.action,
        timestamp: event.createdAt.toISOString(),
        userId: event.userId,
        details: event.details,
      })),
    });
  } catch (error) {
    console.error('[GET /api/reports/security-audit] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de segurança' },
      { status: 500 }
    );
  }
}
