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

    // Período: últimos 30 dias
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // Buscar logs agrupados por ação
    const logs = await prisma.accessLog.groupBy({
      by: ['action'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    });

    const totalEvents = logs.reduce((sum: number, item) => sum + (item._count?.id ?? 0), 0);

    // Montar items com percentual
    const items = logs.map((item) => ({
      action: item.action,
      eventCount: item._count?.id ?? 0,
      percentage: totalEvents > 0 ? ((item._count?.id ?? 0) / totalEvents) * 100 : 0,
    }));

    // Ordenar por quantidade de eventos (decrescente)
    items.sort((a, b) => b.eventCount - a.eventCount);

    return NextResponse.json({
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      generatedAt: new Date().toISOString(),
      totalEvents,
      totalActions: items.length,
      items,
    });
  } catch (error) {
    console.error('[API] /api/reports/logs-activity error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de atividade do sistema' },
      { status: 500 },
    );
  }
}
