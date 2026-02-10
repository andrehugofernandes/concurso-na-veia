import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/public/videos
 * Retorna vídeos da categoria IMUNEPLAY (acesso público)
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category') || 'imuneplay';

    // Buscar categoria por slug
    const category = await prisma.category.findFirst({
      where: {
        slug: categorySlug
      }
    });

    if (!category) {
      return NextResponse.json({ 
        videos: [],
        message: 'Categoria não encontrada' 
      });
    }

    // Buscar vídeos da categoria
    const videos = await prisma.file.findMany({
      where: {
        categoryId: category.id,
        mimeType: {
          startsWith: 'video/'
        }
      },
      select: {
        id: true,
        originalName: true,
        filename: true,
        size: true,
        mimeType: true,
        firebaseUrl: true,
        storageType: true,
        thumbnailPath: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Formatar resposta
    const formattedVideos = videos.map(video => ({
      id: video.id,
      title: video.originalName,
      filename: video.filename,
      size: video.size.toString(),
      mimeType: video.mimeType,
      // Para vídeos públicos, usar endpoint público de streaming
      videoUrl: video.storageType === 'firebase' && video.firebaseUrl
        ? video.firebaseUrl
        : `/api/public/files/${video.id}/stream`,
      thumbnailPath: video.thumbnailPath, // Caminho do thumbnail no banco
      thumbnail: `/api/public/files/${video.id}/thumbnail`, // Endpoint público
      createdAt: video.createdAt.toISOString(),
      category: video.category
    }));

    return NextResponse.json({ 
      videos: formattedVideos,
      total: formattedVideos.length,
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug
      }
    });
  } catch (error) {
    console.error('[API] /api/public/videos error:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar vídeos', videos: [] },
      { status: 500 }
    );
  }
}
