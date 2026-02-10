import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/server/logging';
import { notifyNewFileUploaded } from '@/lib/helpers/notification-helpers-v2';
import path from 'path';
import fs from 'fs/promises';

// Usar pasta storage/ para manter compatibilidade com arquivos existentes
const STORAGE_ROOT = path.resolve(process.cwd(), 'storage', 'imunemais-storage', 'imunemais');
const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE || 100 * 1024 * 1024); // 100MB
const ALLOWED_MIME_TYPES = (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,video/mp4').split(',');

export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId');

  const where = {
    ...(search ? {
      OR: [
        { originalName: { contains: search, mode: 'insensitive' as const } },
        { filename: { contains: search, mode: 'insensitive' as const } }
      ]
    } : {}),
    ...(categoryId ? { categoryId } : {})
  };

  const [files, total] = await Promise.all([
    prisma.file.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        filename: true,
        originalName: true,
        // description: false (coluna não existe no DB atual)
        path: true,
        size: true,
        mimeType: true,
        createdAt: true,
        categoryId: true,
        storageType: true,
        firebaseUrl: true,
        thumbnailPath: true,
        category: true,
        uploadedBy: { select: { id: true, username: true } },
        downloads: { select: { id: true } },
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.file.count({ where })
  ]);

  // Buscar contagem de visualizações para vídeos
  const fileIds = files.map(f => f.id);
  const viewCounts = await prisma.accessLog.groupBy({
    by: ['resource'],
    where: {
      action: 'video:view',
      resource: {
        in: fileIds
      }
    },
    _count: {
      id: true
    }
  });

  const viewCountMap = new Map(
    viewCounts.map(v => [v.resource, v._count.id])
  );

  // Mapear para o formato esperado pelo frontend
  const items = files.map(file => ({
    id: file.id,
    name: file.originalName,
    filename: file.filename,
    description: null as unknown as string | null,
    size: file.size.toString(),
    type: file.mimeType,
    createdAt: file.createdAt.toISOString(),
    categoryId: file.categoryId,
    category: file.category,
    uploadedBy: file.uploadedBy,
    downloadCount: file.downloads.length,
    viewCount: viewCountMap.get(file.id) || 0,
    storageType: file.storageType || 'local', // Indicar origem do arquivo
    firebaseUrl: file.firebaseUrl, // URL do Firebase (se existir)
    thumbnailPath: file.thumbnailPath // Caminho/URL do thumbnail
  }));

  return NextResponse.json({ items, total, page, limit });
}

export async function POST(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // USER pode fazer upload

  try {
    const form = await req.formData().catch((err) => {
      // Capturar erro de payload muito grande
      if (err.message?.includes('body') || err.message?.includes('size')) {
        throw new Error('PAYLOAD_TOO_LARGE');
      }
      throw err;
    });
    const file = form.get('file');
    const categoryId = form.get('categoryId') as string | null;
    const title = form.get('title') as string | null;

    if (!(file instanceof Blob)) {
      return NextResponse.json({ message: 'Arquivo não enviado (chave "file")' }, { status: 400 });
    }

    const mimeType = (file as File).type as string | undefined;
    const size = file.size;
    const originalName = ('name' in (file as unknown as Record<string, unknown>))
      ? String((file as unknown as { name?: unknown }).name ?? '')
      : undefined;

    if (!mimeType || !ALLOWED_MIME_TYPES.includes(mimeType)) {
      return NextResponse.json({ message: 'Tipo de arquivo não permitido' }, { status: 415 });
    }
    if (size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: 'Arquivo excede o tamanho máximo permitido' }, { status: 413 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Criar subdiretório por categoria (igual ao local-storage)
    const subdir = categoryId ? `categories/${categoryId}` : 'uncategorized';
    const uploadDir = path.join(STORAGE_ROOT, subdir);
    await fs.mkdir(uploadDir, { recursive: true });

    // Usar nome original limpo (sem caracteres especiais perigosos)
    const safeName = (title || originalName || 'arquivo').replace(/[^\w\-. ]+/g, '_');
    const filePath = path.join(uploadDir, safeName);
    
    // Path relativo para salvar no banco (compatível com arquivos migrados)
    const relativePath = path.relative(STORAGE_ROOT, filePath);

    await fs.writeFile(filePath, buffer);

    // Criar registro no banco primeiro
    const created = await prisma.file.create({
      data: {
        filename: safeName,
        originalName: title || originalName || safeName,
        // description removido pois a coluna não existe no DB atual
        path: relativePath, // Salvar path relativo
        size: size,
        mimeType: mimeType,
        uploadedById: auth.id,
        categoryId: categoryId || undefined,
      },
    });

    // Se o cliente enviou um thumbnail manual (capa), salvar como thumbnail associado
    const thumbnail = form.get('thumbnail');
    if (thumbnail instanceof Blob) {
      try {
        const thumbBuffer = Buffer.from(await thumbnail.arrayBuffer());
        const thumbDir = path.join(STORAGE_ROOT, 'thumbnails');
        await fs.mkdir(thumbDir, { recursive: true });
        const thumbName = `${created.id}.webp`;
        const thumbAbsPath = path.join(thumbDir, thumbName);
        await fs.writeFile(thumbAbsPath, thumbBuffer);

        // thumbnailPath deve ser relativo à pasta 'storage' (ver delete em files/[id]/route.ts)
        const storageRoot = path.resolve(process.cwd(), 'storage');
        const thumbnailRelPath = path.relative(storageRoot, thumbAbsPath).replace(/\\/g, '/');

        await prisma.file.update({
          where: { id: created.id },
          data: { thumbnailPath: thumbnailRelPath },
        });
        console.log('[Upload] Thumbnail recebido e salvo:', thumbnailRelPath);
      } catch (err) {
        console.warn('[Upload] Falha ao salvar thumbnail enviado:', err);
      }
    }
    await logActivity({
      action: 'file:upload',
      resource: 'file',
      userId: auth.id,
      request: req,
      details: { 
        fileId: created.id, 
        mimeType, 
        size,
        actor: { id: auth.id, username: auth.username }
      },
    });

    // Buscar categoria para incluir no nome da notificação
    let categoryName: string | undefined;
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { name: true },
      });
      categoryName = category?.name;
    }

    // Criar notificação inteligente
    await notifyNewFileUploaded({
      fileName: created.originalName,
      uploaderName: auth.name || auth.username,
      uploaderId: auth.id,
      categoryName,
      categoryId: created.categoryId || undefined,
      fileId: created.id,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    
    // Log de erro de upload
    await logActivity({
      action: 'file:upload:error',
      resource: 'file',
      userId: auth.id,
      request: req,
      details: { 
        error: errorMessage,
        actor: { id: auth.id, username: auth.username }
      },
    });
    
    // Tratar erro de payload muito grande
    if (errorMessage === 'PAYLOAD_TOO_LARGE') {
      return NextResponse.json({ 
        message: 'Arquivo muito grande. O tamanho máximo permitido é 20MB.' 
      }, { status: 413 });
    }
    
    return NextResponse.json({ message: 'Erro ao fazer upload' }, { status: 500 });
  }
}
