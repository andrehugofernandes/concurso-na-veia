import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Endpoint público para listar categorias
 * Não requer autenticação
 */
export async function GET() {
  try {
    const items = await prisma.category.findMany({
      orderBy: [
        { parentId: 'asc' },
        { sortOrder: 'asc' },
        { createdAt: 'asc' },
      ],
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        parentId: true,
        sortOrder: true,
        color: true,
      }
    });
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Erro ao buscar categorias públicas:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar categorias' },
      { status: 500 }
    );
  }
}
