import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DAYS_BACK = 30;
const MAX_ITEMS = 20;

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

    const groupedDownloads = await prisma.download.groupBy({
      by: ['fileId'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: MAX_ITEMS,
    });

    const fileIds = groupedDownloads.map((entry) => entry.fileId);

    const files = await prisma.file.findMany({
      where: {
        id: {
          in: fileIds,
        },
      },
      select: {
        id: true,
        originalName: true,
        filename: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const fileMap = new Map(files.map((file) => [file.id, file]));

    const items = groupedDownloads.map((entry, index) => {
      const file = fileMap.get(entry.fileId);
      return {
        position: index + 1,
        fileId: entry.fileId,
        title: file?.originalName || file?.filename || 'Arquivo desconhecido',
        description: null,
        category: file?.category?.name || 'Sem categoria',
        categoryId: file?.category?.id ?? null,
        downloadCount: entry._count.id,
        createdAt: file?.createdAt?.toISOString() ?? null,
      };
    });

    const totalDownloads = groupedDownloads.reduce((acc, entry) => acc + entry._count.id, 0);

    return NextResponse.json({
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      generatedAt: new Date().toISOString(),
      totalDownloads,
      totalFiles: items.length,
      items,
    });
  } catch (error) {
    console.error('[API] /api/reports/top-downloads error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de arquivos mais baixados' },
      { status: 500 },
    );
  }
}
