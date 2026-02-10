import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const [categories, fileGroups, totalFiles, totalVideos] = await Promise.all([
      prisma.category.findMany({
        select: {
          id: true,
          parentId: true,
        },
      }),
      prisma.file.groupBy({
        by: ['categoryId'],
        _count: {
          _all: true,
        },
      }),
      prisma.file.count(),
      prisma.file.count({
        where: {
          mimeType: {
            startsWith: 'video/',
          },
        },
      }),
    ]);

    const categoryMap = new Map<string, { id: string; parentId: string | null }>();
    for (const category of categories) {
      categoryMap.set(category.id, category);
    }

    const counts: Record<string, number> = {};
    let uncategorizedCount = 0;

    const addToCategory = (categoryId: string, amount: number) => {
      counts[categoryId] = (counts[categoryId] ?? 0) + amount;
      let parentId = categoryMap.get(categoryId)?.parentId ?? null;
      while (parentId) {
        counts[parentId] = (counts[parentId] ?? 0) + amount;
        parentId = categoryMap.get(parentId)?.parentId ?? null;
      }
    };

    for (const group of fileGroups) {
      const amount = group._count._all;
      const categoryId = group.categoryId;

      if (!categoryId) {
        uncategorizedCount += amount;
        continue;
      }

      addToCategory(categoryId, amount);
    }

    return NextResponse.json({
      counts,
      totalFiles,
      totalVideos,
      uncategorized: uncategorizedCount,
    });
  } catch (error) {
    console.error('[API] /api/files/category-counts error:', error);
    return NextResponse.json(
      { message: 'Erro ao obter contagem de arquivos por categoria' },
      { status: 500 }
    );
  }
}
