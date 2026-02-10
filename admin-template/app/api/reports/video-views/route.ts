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

    const videos = await prisma.accessLog.groupBy({
      by: ['resource'],
      where: {
        action: 'video:view',
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
      take: 20,
    });

    const videoIds = videos.map((video) => video.resource);
    const videoFiles = await prisma.file.findMany({
      where: {
        id: {
          in: videoIds,
        },
      },
      select: {
        id: true,
        originalName: true,
        filename: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        mimeType: true,
        size: true,
        createdAt: true,
      },
    });

    const videoMap = new Map(videoFiles.map((file) => [file.id, file]));
    const totalViews = videos.reduce((acc, entry) => acc + entry._count.id, 0);

    const items = videos.map((entry) => {
      const file = videoMap.get(entry.resource);
      return {
        fileId: entry.resource,
        title: file?.originalName || file?.filename || 'Vídeo desconhecido',
        viewCount: entry._count.id,
        category: file?.category?.name || 'Sem categoria',
        categoryId: file?.category?.id ?? null,
        categorySlug: file?.category?.slug ?? null,
        createdAt: file?.createdAt?.toISOString() ?? null,
      };
    });

    return NextResponse.json({
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      generatedAt: new Date().toISOString(),
      totalViews,
      totalVideos: items.length,
      items,
    });
  } catch (error) {
    console.error('[API] /api/reports/video-views error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de visualizações de vídeos' },
      { status: 500 },
    );
  }
}
