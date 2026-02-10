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
    // Permitir SYSADMIN, ADMIN e COORDENADOR
    if (normalizedRole !== 'SYSADMIN' && normalizedRole !== 'ADMIN' && normalizedRole !== 'COORDENADOR') {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }

    // Buscar todas as categorias
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            files: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Para cada categoria, buscar o último upload
    const items = await Promise.all(
      categories.map(async (category) => {
        const lastFile = await prisma.file.findFirst({
          where: {
            categoryId: category.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            createdAt: true,
          },
        });

        return {
          categoryId: category.id,
          categoryName: category.name,
          fileCount: category._count.files,
          status: category._count.files > 0 ? ('active' as const) : ('empty' as const),
          lastUpload: lastFile?.createdAt.toISOString() ?? null,
        };
      }),
    );

    const activeCategories = items.filter((item) => item.status === 'active').length;
    const emptyCategories = items.filter((item) => item.status === 'empty').length;

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      totalCategories: items.length,
      activeCategories,
      emptyCategories,
      items,
    });
  } catch (error) {
    console.error('[API] /api/reports/categories-health error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de saúde das categorias' },
      { status: 500 },
    );
  }
}
