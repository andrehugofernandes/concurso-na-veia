import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DAYS_BACK = 30;

const FORBIDDEN_RESPONSE = NextResponse.json(
  {
    message: 'Acesso restrito: apenas administradores e coordenadores podem gerar relatórios.',
  },
  { status: 403 },
);

export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  const role = (auth.role ?? '').toUpperCase();
  // Permitir SYSADMIN, ADMIN e COORDENADOR
  if (role !== 'SYSADMIN' && role !== 'ADMIN' && role !== 'COORDENADOR') {
    return FORBIDDEN_RESPONSE;
  }

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - DAYS_BACK);

    const downloadsByCategory = await prisma.$queryRaw<Array<{
      categoryId: string | null;
      categoryName: string | null;
      downloadCount: bigint;
    }>>`
      SELECT
        c.id AS categoryId,
        c.name AS categoryName,
        COUNT(d.id) AS downloadCount
      FROM Download d
      INNER JOIN File f ON d.fileId = f.id
      LEFT JOIN Category c ON f.categoryId = c.id
      WHERE d.createdAt BETWEEN ${startDate} AND ${endDate}
      GROUP BY c.id, c.name
      ORDER BY downloadCount DESC
    `;

    const totalDownloads = downloadsByCategory.reduce((sum, item) => sum + Number(item.downloadCount), 0);

    const items = downloadsByCategory.map((item) => {
      const downloadCount = Number(item.downloadCount);
      return {
        categoryId: item.categoryId,
        categoryName: item.categoryName ?? 'Sem categoria',
        downloadCount,
        percentage: totalDownloads > 0 ? Number(((downloadCount / totalDownloads) * 100).toFixed(2)) : 0,
      };
    });

    return NextResponse.json({
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      generatedAt: new Date().toISOString(),
      totalDownloads,
      totalCategories: items.length,
      items,
    });
  } catch (error) {
    console.error('[API] /api/reports/downloads-by-category error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de downloads por categoria' },
      { status: 500 },
    );
  }
}
