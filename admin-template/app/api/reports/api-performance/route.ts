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

    // Período: últimas 24 horas
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    // Buscar logs de acesso agrupados por resource (endpoint)
    const endpointStats = await prisma.accessLog.groupBy({
      by: ['resource'],
      where: {
        createdAt: { gte: oneDayAgo },
        resource: { not: '' },
      },
      _count: {
        id: true,
      },
    });

    // Buscar endpoints com mais erros (ações que contêm 'error')
    const endpointErrors = await prisma.accessLog.groupBy({
      by: ['resource'],
      where: {
        createdAt: { gte: oneDayAgo },
        resource: { not: '' },
        action: { contains: 'error' },
      },
      _count: {
        id: true,
      },
    });

    // Calcular taxa de requisições por minuto
    const totalRequests = endpointStats.reduce((acc, stat) => acc + (stat._count?.id || 0), 0);
    const minutesInDay = 24 * 60;
    const requestsPerMinute = totalRequests / minutesInDay;

    // Endpoints mais acessados
    const topEndpoints = endpointStats
      .sort((a, b) => (b._count?.id || 0) - (a._count?.id || 0))
      .slice(0, 10)
      .map((stat, index) => {
        const statCount = stat._count?.id || 0;
        const errors = endpointErrors.find(e => e.resource === stat.resource)?._count?.id || 0;
        const errorRate = statCount > 0 ? (errors / statCount) * 100 : 0;
        
        return {
          position: index + 1,
          endpoint: stat.resource || 'unknown',
          requests: statCount,
          requestsPerMinute: Math.round((statCount / minutesInDay) * 100) / 100,
          errors,
          errorRate: Math.round(errorRate * 100) / 100,
          successRate: Math.round((100 - errorRate) * 100) / 100,
        };
      });

    // Endpoints com mais erros
    const errorEndpoints = endpointErrors
      .sort((a, b) => (b._count?.id || 0) - (a._count?.id || 0))
      .slice(0, 5)
      .map((stat, index) => ({
        position: index + 1,
        endpoint: stat.resource || 'unknown',
        errors: stat._count?.id || 0,
      }));

    // Distribuição de requisições por hora
    const hourlyDistribution = await prisma.accessLog.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: oneDayAgo },
      },
      _count: {
        id: true,
      },
    });

    // Agrupar por hora
    const hourlyStats = Array.from({ length: 24 }, (_, i) => {
      const hour = i;
      const count = hourlyDistribution.filter(stat => {
        const statHour = new Date(stat.createdAt).getHours();
        return statHour === hour;
      }).reduce((acc, stat) => acc + (stat._count?.id || 0), 0);
      
      return {
        hour,
        requests: count,
      };
    });

    return NextResponse.json({
      period: {
        start: oneDayAgo.toISOString(),
        end: new Date().toISOString(),
      },
      generatedAt: new Date().toISOString(),
      summary: {
        totalRequests,
        requestsPerMinute: Math.round(requestsPerMinute * 100) / 100,
        totalEndpoints: endpointStats.length,
        totalErrors: endpointErrors.reduce((acc, stat) => acc + stat._count.id, 0),
      },
      topEndpoints,
      errorEndpoints,
      hourlyDistribution: hourlyStats,
    });
  } catch (error) {
    console.error('[GET /api/reports/api-performance] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de performance' },
      { status: 500 }
    );
  }
}
