import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

/**
 * GET /api/public/files/[id]/stream
 * Streaming público de vídeos (sem autenticação)
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const file = await prisma.file.findUnique({ 
      where: { id },
      include: { category: true }
    });
    
    if (!file) {
      return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });
    }

    // Verificar se é um vídeo
    if (!file.mimeType || !file.mimeType.startsWith('video/')) {
      return NextResponse.json({ message: 'Arquivo não é um vídeo' }, { status: 400 });
    }

    // Se arquivo está no Firebase, redirecionar para URL do Firebase
    if (file.storageType === 'firebase' && file.firebaseUrl) {
      return NextResponse.redirect(file.firebaseUrl);
    }

    // Arquivo local - servir do sistema de arquivos
    const STORAGE_ROOT = path.resolve(process.cwd(), 'storage', 'imunemais-storage', 'imunemais');
    const filePath = path.join(STORAGE_ROOT, file.path);

    try {
      const stats = await stat(filePath);
      if (!stats.isFile()) throw new Error('not-a-file');
    } catch {
      return NextResponse.json({ message: 'Arquivo físico não encontrado' }, { status: 404 });
    }

    // Suporte a range requests para streaming de vídeo
    const range = req.headers.get('range');
    const fileSize = (await stat(filePath)).size;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const stream = createReadStream(filePath, { start, end });

      const headers = new Headers();
      headers.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
      headers.set('Accept-Ranges', 'bytes');
      headers.set('Content-Length', String(chunksize));
      headers.set('Content-Type', file.mimeType || 'video/mp4');

      return new Response(stream as unknown as BodyInit, { 
        status: 206, // Partial Content
        headers 
      });
    } else {
      const stream = createReadStream(filePath);

      const headers = new Headers();
      headers.set('Content-Type', file.mimeType || 'video/mp4');
      headers.set('Content-Length', String(fileSize));
      headers.set('Accept-Ranges', 'bytes');

      return new Response(stream as unknown as BodyInit, { 
        status: 200, 
        headers 
      });
    }
  } catch (error) {
    console.error('[API] /api/public/files/[id]/stream error:', error);
    return NextResponse.json(
      { message: 'Erro ao fazer streaming do vídeo' },
      { status: 500 }
    );
  }
}
