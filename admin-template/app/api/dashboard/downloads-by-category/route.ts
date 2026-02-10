import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

/**
 * GET /api/dashboard/downloads-by-category
 * Retorna estatísticas de downloads por categoria
 */
export async function GET(req: Request) {
  try {
    // Verificar autenticação
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    // Buscar downloads por categoria (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    console.log('[Downloads by Category] Buscando downloads desde:', thirtyDaysAgo);

    const downloadsByCategory = await prisma.$queryRaw<Array<{ categoryName: string; downloadCount: bigint }>>`
      SELECT 
        c.name as categoryName,
        COUNT(d.id) as downloadCount
      FROM Download d
      INNER JOIN File f ON d.fileId = f.id
      INNER JOIN Category c ON f.categoryId = c.id
      WHERE d.createdAt >= ${thirtyDaysAgo}
      GROUP BY c.id, c.name
      ORDER BY downloadCount DESC
      LIMIT 6
    `;

    console.log('[Downloads by Category] Resultados:', downloadsByCategory.length, 'categorias');

    // Calcular total de downloads
    const totalDownloads = downloadsByCategory.reduce(
      (sum, item) => sum + Number(item.downloadCount),
      0
    );

    console.log('[Downloads by Category] Total de downloads:', totalDownloads);

    // Calcular percentuais
    const categoriesWithPercentage = downloadsByCategory.map(item => ({
      label: item.categoryName,
      downloads: Number(item.downloadCount),
      percentage: totalDownloads > 0 
        ? Math.round((Number(item.downloadCount) / totalDownloads) * 100)
        : 0
    }));

    console.log('[Downloads by Category] Categorias com percentual:', categoriesWithPercentage);

    return NextResponse.json({
      categories: categoriesWithPercentage,
      totalDownloads,
      period: 'last30Days'
    });
  } catch (error) {
    console.error('[API Downloads by Category] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}
