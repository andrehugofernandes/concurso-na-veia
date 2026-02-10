import { NextRequest, NextResponse } from 'next/server';
import { backupAuditService } from '@/lib/services/backup-audit.service';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação e autorização
    const auth = await getAuthUserFromRequest(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    if (auth.role !== 'SYSADMIN' && auth.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acesso negado. Apenas SYSADMIN/ADMIN podem acessar.' },
        { status: 403 }
      );
    }

    // Obter parâmetro de período (dias)
    const searchParams = request.nextUrl.searchParams;
    const days = Math.min(parseInt(searchParams.get('days') || '30'), 365);

    // Buscar estatísticas
    const stats = await backupAuditService.getAuditStats(days);

    // Processar estatísticas para formato mais legível
    const processedStats = {
      period: {
        days,
        startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
      },
      summary: {
        totalActions: stats.reduce((sum, s) => sum + s._count, 0),
        byAction: {} as Record<string, { total: number; byStatus: Record<string, number> }>,
        byStatus: {} as Record<string, number>,
      },
    };

    // Agrupar por ação e status
    for (const stat of stats) {
      const action = stat.action as 'CREATE' | 'RESTORE' | 'DELETE' | 'DOWNLOAD' | 'FAILED';
      const status = stat.status as 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

      if (!processedStats.summary.byAction[action]) {
        processedStats.summary.byAction[action] = {
          total: 0,
          byStatus: {},
        };
      }

      if (!processedStats.summary.byStatus[status]) {
        processedStats.summary.byStatus[status] = 0;
      }

      processedStats.summary.byAction[action].total += stat._count;
      processedStats.summary.byAction[action].byStatus[status] = stat._count;
      processedStats.summary.byStatus[status] += stat._count;
    }

    return NextResponse.json({
      success: true,
      data: processedStats,
    });
  } catch (error) {
    console.error('[API] Erro ao buscar estatísticas de auditoria:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas de auditoria' },
      { status: 500 }
    );
  }
}
