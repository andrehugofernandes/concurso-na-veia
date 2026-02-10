import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';

/**
 * POST /api/files/metadata
 * Salva metadata de arquivo enviado para Firebase Storage
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Validar campos obrigatórios
    const { filename, originalName, firebaseUrl, size, mimeType, thumbnailUrl } = body;
    
    if (!filename || !firebaseUrl || !size || !mimeType) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Criar registro no banco
    const file = await prisma.file.create({
      data: {
        filename: filename,
        originalName: originalName || filename,
        path: firebaseUrl, // URL do Firebase como path
        firebaseUrl: firebaseUrl,
        storageType: 'firebase',
        size: parseInt(size),
        mimeType: mimeType,
        uploadedById: auth.id,
        categoryId: body.categoryId || null,
        thumbnailPath: thumbnailUrl || null, // URL do thumbnail no Firebase
      },
      include: {
        category: true,
        uploadedBy: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Log de atividade
    await logActivity({
      action: 'file:upload',
      resource: 'file',
      userId: auth.id,
      request: req,
      details: {
        fileId: file.id,
        storageType: 'firebase',
        mimeType,
        size,
        actor: { id: auth.id, username: auth.username },
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    console.error('Erro ao salvar metadata:', error);
    
    // Log de erro
    await logActivity({
      action: 'file:upload:error',
      resource: 'file',
      userId: auth.id,
      request: req,
      details: {
        error: errorMessage,
        actor: { id: auth.id, username: auth.username },
      },
    });

    return NextResponse.json(
      { message: 'Erro ao salvar metadata do arquivo' },
      { status: 500 }
    );
  }
}
