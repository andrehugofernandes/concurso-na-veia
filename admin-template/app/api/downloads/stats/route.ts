import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/downloads/stats
 * Retorna estatísticas de downloads por categoria
 */
export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  try {
    // Total de downloads
    const totalDownloads = await prisma.download.count();

    // Downloads por categoria pai
    const downloadsByCategory = await prisma.$queryRaw<Array<{
      categoryId: string | null;
      categoryName: string | null;
      downloadCount: bigint;
    }>>`
      SELECT 
        c.id as categoryId,
        c.name as categoryName,
        COUNT(d.id) as downloadCount
      FROM Download d
      INNER JOIN File f ON d.fileId = f.id
      LEFT JOIN Category c ON f.categoryId = c.id
      WHERE c.parentId IS NULL OR c.parentId IS NOT NULL
      GROUP BY c.id, c.name
      ORDER BY downloadCount DESC
    `;

    // Converter bigint para number
    const formattedDownloadsByCategory = downloadsByCategory.map(item => ({
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      downloadCount: Number(item.downloadCount)
    }));

    // Top 10 arquivos mais baixados
    const topFiles = await prisma.download.groupBy({
      by: ['fileId'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    });

    // Buscar detalhes dos arquivos
    const topFilesWithDetails = await Promise.all(
      topFiles.map(async (item) => {
        const file = await prisma.file.findUnique({
          where: { id: item.fileId },
          select: {
            id: true,
            originalName: true,
            filename: true,
            categoryId: true,
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        });

        return {
          fileId: item.fileId,
          fileName: file?.originalName || file?.filename || 'Desconhecido',
          categoryName: file?.category?.name || 'Sem categoria',
          downloadCount: item._count.id
        };
      })
    );

    // Downloads nos últimos 30 dias
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const downloadsLast30Days = await prisma.download.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Total de visualizações de vídeos
    const totalViews = await prisma.accessLog.count({
      where: {
        action: 'video:view'
      }
    });

    // Visualizações nos últimos 30 dias
    const viewsLast30Days = await prisma.accessLog.count({
      where: {
        action: 'video:view',
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    return NextResponse.json({
      totalDownloads,
      downloadsByCategory: formattedDownloadsByCategory,
      topFiles: topFilesWithDetails,
      downloadsLast30Days,
      totalViews,
      viewsLast30Days
    });
  } catch (error) {
    console.error('[API] /api/downloads/stats error:', error);
    return NextResponse.json(
      { message: 'Erro ao obter estatísticas de downloads' },
      { status: 500 }
    );
  }
}
