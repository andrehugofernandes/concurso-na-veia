import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

export const dynamic = 'force-dynamic';

/**
 * GET /api/public/files/[id]/thumbnail
 * Gera e retorna thumbnail de vídeo (frame aos 2 segundos)
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const file = await prisma.file.findUnique({ 
      where: { id },
      select: {
        id: true,
        mimeType: true,
        path: true,
        storageType: true,
        thumbnailPath: true
      }
    });
    
    if (!file) {
      return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });
    }

    // Verificar se é um vídeo
    if (!file.mimeType || !file.mimeType.startsWith('video/')) {
      return NextResponse.json({ message: 'Arquivo não é um vídeo' }, { status: 400 });
    }

    const STORAGE_ROOT = path.resolve(process.cwd(), 'storage');
    
    // Se thumbnail está salvo no banco, usar ele
    if (file.thumbnailPath) {
      // Se for URL do Firebase (começa com http), redirecionar
      if (file.thumbnailPath.startsWith('http')) {
        return NextResponse.redirect(file.thumbnailPath);
      }
      
      // Se for caminho local
      const thumbnailPath = path.join(STORAGE_ROOT, file.thumbnailPath);
      
      if (existsSync(thumbnailPath)) {
        const imageBuffer = await fs.readFile(thumbnailPath);
        return new Response(imageBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }

    // Fallback: tentar gerar thumbnail sob demanda
    const THUMBNAILS_DIR = path.resolve(STORAGE_ROOT, 'thumbnails');
    if (!existsSync(THUMBNAILS_DIR)) {
      await fs.mkdir(THUMBNAILS_DIR, { recursive: true });
    }

    const thumbnailFilename = `${file.id}.jpg`;
    const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailFilename);

    // Se thumbnail já existe no diretório, retornar
    if (existsSync(thumbnailPath)) {
      const imageBuffer = await fs.readFile(thumbnailPath);
      return new Response(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Se arquivo está no Firebase, retornar placeholder
    if (file.storageType === 'firebase') {
      // Para Firebase, retornar um placeholder ou tentar baixar e processar
      return NextResponse.json({ 
        message: 'Thumbnail para vídeos Firebase ainda não implementado' 
      }, { status: 501 });
    }

    // Gerar thumbnail do vídeo local usando ffmpeg
    const videoPath = path.join(STORAGE_ROOT, file.path);

    if (!existsSync(videoPath)) {
      return NextResponse.json({ message: 'Vídeo não encontrado' }, { status: 404 });
    }

    try {
      // Usar ffmpeg para extrair frame aos 2 segundos
      // -ss 2: seek para 2 segundos
      // -i: input file
      // -vframes 1: extrair apenas 1 frame
      // -vf scale=320:-1: redimensionar para largura 320px mantendo proporção
      await execAsync(
        `ffmpeg -ss 2 -i "${videoPath}" -vframes 1 -vf "scale=320:-1" "${thumbnailPath}"`
      );

      const imageBuffer = await fs.readFile(thumbnailPath);
      return new Response(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (ffmpegError) {
      console.error('[Thumbnail] Erro ao gerar thumbnail com ffmpeg:', ffmpegError);
      
      // Se ffmpeg falhar, retornar erro 501 (Not Implemented)
      return NextResponse.json({ 
        message: 'FFmpeg não disponível. Instale ffmpeg para gerar thumbnails de vídeo.' 
      }, { status: 501 });
    }
  } catch (error) {
    console.error('[API] /api/public/files/[id]/thumbnail error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar thumbnail' },
      { status: 500 }
    );
  }
}
