import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logActivity } from '@/lib/server/logging';

export const dynamic = 'force-dynamic';

/**
 * POST /api/files/[id]/view
 * Registra uma visualização de vídeo (sem autenticação obrigatória para permitir acesso público)
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log('[API /view] Recebida requisição para registrar visualização do arquivo:', id);
    
    const file = await prisma.file.findUnique({ 
      where: { id },
      include: { category: true }
    });
    
    if (!file) {
      console.log('[API /view] ✗ Arquivo não encontrado:', id);
      return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });
    }

    console.log('[API /view] Arquivo encontrado:', {
      id: file.id,
      name: file.originalName,
      mimeType: file.mimeType,
      category: file.category?.name
    });

    // Verificar se é um vídeo
    if (!file.mimeType || !file.mimeType.startsWith('video/')) {
      console.log('[API /view] ✗ Arquivo não é um vídeo:', file.mimeType);
      return NextResponse.json({ message: 'Arquivo não é um vídeo' }, { status: 400 });
    }

    console.log('[API /view] Registrando visualização no log de atividades...');
    
    // Registrar visualização no log de atividades
    // Nota: userId pode ser null para visualizações públicas
    await logActivity({
      action: 'video:view',
      resource: file.id, // Usar ID do arquivo como resource
      userId: undefined, // Visualização pública (anônima)
      allowAnonymous: true, // Permitir log sem usuário autenticado
      request: req,
      details: { 
        fileId: file.id, 
        filename: file.filename,
        originalName: file.originalName,
        categoryId: file.categoryId,
        categoryName: file.category?.name || 'Sem categoria',
        mimeType: file.mimeType,
      },
    });

    console.log('[API /view] ✓ Visualização registrada com sucesso para:', file.originalName);

    return NextResponse.json({ 
      success: true, 
      message: 'Visualização registrada',
      file: {
        id: file.id,
        name: file.originalName,
        category: file.category?.name
      }
    });
  } catch (error) {
    console.error('[API] /api/files/[id]/view error:', error);
    return NextResponse.json(
      { message: 'Erro ao registrar visualização' },
      { status: 500 }
    );
  }
}
