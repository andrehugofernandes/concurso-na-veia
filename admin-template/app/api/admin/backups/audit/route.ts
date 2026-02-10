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

    // Obter parâmetros de query
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const actionParam = searchParams.get('action');
    const statusParam = searchParams.get('status');
    const userId = searchParams.get('userId');
    const backupId = searchParams.get('backupId');

    // Buscar histórico com filtros
    const result = await backupAuditService.getAuditHistory(limit, offset, {
      ...(actionParam && { action: actionParam as 'CREATE' | 'RESTORE' | 'DELETE' | 'DOWNLOAD' | 'FAILED' }),
      ...(statusParam && { status: statusParam as 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' }),
      ...(userId && { userId }),
      ...(backupId && { backupId }),
    });

    return NextResponse.json({
      success: true,
      data: result.logs,
      pagination: {
        limit: result.limit,
        offset: result.offset,
        total: result.total,
        hasMore: result.offset + result.limit < result.total,
      },
    });
  } catch (error) {
    console.error('[API] Erro ao buscar histórico de auditoria:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar histórico de auditoria' },
      { status: 500 }
    );
  }
}
