import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Endpoint público para listar arquivos
 * Não requer autenticação
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const categoryId = searchParams.get('categoryId');

    const where = categoryId ? { categoryId } : {};

    console.log('[API Public Files] Buscando arquivos com where:', where);
    console.log('[API Public Files] Limit:', limit);

    const items = await prisma.file.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        filename: true,
        originalName: true,
        path: true,
        categoryId: true,
        mimeType: true,
        size: true,
        createdAt: true,
      }
    });

    console.log('[API Public Files] Arquivos encontrados:', items.length);

    // Mapear filename para name para compatibilidade com o frontend
    const mappedItems = items.map(item => ({
      id: item.id,
      name: item.originalName || item.filename,
      path: item.path,
      categoryId: item.categoryId,
      mimeType: item.mimeType,
      size: item.size,
      description: `${(item.size / 1024).toFixed(2)} KB - ${item.mimeType}`,
      createdAt: item.createdAt,
    }));

    return NextResponse.json({ items: mappedItems, total: mappedItems.length });
  } catch (error) {
    console.error('Erro ao buscar arquivos públicos:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar arquivos' },
      { status: 500 }
    );
  }
}
