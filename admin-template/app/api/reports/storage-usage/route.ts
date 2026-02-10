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
    // EXCLUSIVO SYSADMIN
    if (normalizedRole !== 'SYSADMIN') {
      return NextResponse.json({ message: 'Acesso negado: apenas SYSADMIN' }, { status: 403 });
    }

    // Buscar arquivos agrupados por tipo MIME
    const filesByType = await prisma.file.groupBy({
      by: ['mimeType'],
      _count: {
        id: true,
      },
      _sum: {
        size: true,
      },
    });

    // Buscar top 10 maiores arquivos
    const largestFiles = await prisma.file.findMany({
      take: 10,
      orderBy: {
        size: 'desc',
      },
      select: {
        id: true,
        filename: true,
        originalName: true,
        size: true,
        mimeType: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    // Buscar arquivos órfãos (sem categoria)
    const orphanFiles = await prisma.file.count({
      where: {
        categoryId: null,
      },
    });

    // Calcular totais
    const totalSize = filesByType.reduce((acc, item) => acc + (item._sum.size || 0), 0);
    const totalFiles = filesByType.reduce((acc, item) => acc + item._count.id, 0);

    // Agrupar por tipo principal (video, image, application, etc)
    const typeGroups = filesByType.reduce((acc, item) => {
      const mainType = item.mimeType?.split('/')[0] || 'other';
      if (!acc[mainType]) {
        acc[mainType] = {
          type: mainType,
          count: 0,
          size: 0,
        };
      }
      acc[mainType].count += item._count.id;
      acc[mainType].size += item._sum.size || 0;
      return acc;
    }, {} as Record<string, { type: string; count: number; size: number }>);

    const distribution = Object.values(typeGroups).map(group => ({
      type: group.type,
      count: group.count,
      size: group.size,
      sizeFormatted: formatBytes(group.size),
      percentage: totalSize > 0 ? Math.round((group.size / totalSize) * 10000) / 100 : 0,
    }));

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      summary: {
        totalFiles,
        totalSize,
        totalSizeFormatted: formatBytes(totalSize),
        orphanFiles,
        avgFileSize: totalFiles > 0 ? Math.round(totalSize / totalFiles) : 0,
      },
      distribution,
      largestFiles: largestFiles.map((file, index) => ({
        position: index + 1,
        id: file.id,
        filename: file.filename,
        originalName: file.originalName,
        size: file.size,
        sizeFormatted: formatBytes(file.size),
        mimeType: file.mimeType,
        category: file.category?.name || 'Sem categoria',
        createdAt: file.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('[GET /api/reports/storage-usage] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de storage' },
      { status: 500 }
    );
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
