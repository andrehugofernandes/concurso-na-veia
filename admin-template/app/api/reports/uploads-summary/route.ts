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

    // Período: últimos 30 dias
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // Buscar uploads agrupados por categoria
    const uploads = await prisma.file.groupBy({
      by: ['categoryId'],
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

    // Buscar informações das categorias
    const categoryIds = uploads.map((u) => u.categoryId).filter((id): id is string => id !== null);
    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

    // Calcular total de uploads
    const totalUploads = uploads.reduce((sum, item) => sum + (item._count?.id ?? 0), 0);

    // Montar items com percentual
    const items = uploads.map((item) => ({
      categoryId: item.categoryId,
      categoryName: item.categoryId ? categoryMap.get(item.categoryId) ?? 'Sem categoria' : 'Sem categoria',
      uploadCount: item._count?.id ?? 0,
      percentage: totalUploads > 0 ? ((item._count?.id ?? 0) / totalUploads) * 100 : 0,
    }));

    // Ordenar por quantidade de uploads (decrescente)
    items.sort((a, b) => b.uploadCount - a.uploadCount);

    return NextResponse.json({
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      generatedAt: new Date().toISOString(),
      totalUploads,
      totalCategories: items.length,
      items,
    });
  } catch (error) {
    console.error('[API] /api/reports/uploads-summary error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de uploads por período' },
      { status: 500 },
    );
  }
}
