import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * PATCH /api/user/avatar
 * Atualizar URL do avatar (upload é feito no cliente)
 */
export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const { avatar_url, avatar_storage_path } = body;

    if (!avatar_url) {
      return NextResponse.json({ message: 'URL do avatar não fornecida' }, { status: 400 });
    }

    // Atualizar banco de dados
    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        avatar_url,
        avatar_storage_path: avatar_storage_path || null,
        avatar_updated_at: new Date(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        full_name: true,
        role: true,
        avatar_url: true,
        avatar_updated_at: true
      }
    });

    return NextResponse.json({
      message: 'Avatar atualizado com sucesso',
      user: updatedUser
    });
  } catch (error) {
    console.error('Erro ao atualizar avatar:', error);
    return NextResponse.json(
      { message: 'Erro interno ao atualizar avatar' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user/avatar
 * Remove avatar do usuário (deleção do Storage é feita no cliente)
 */
export async function DELETE(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    // Atualizar banco de dados
    await prisma.user.update({
      where: { id: authUser.id },
      data: {
        avatar_url: null,
        avatar_storage_path: null,
        avatar_updated_at: null,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ message: 'Avatar removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover avatar:', error);
    return NextResponse.json(
      { message: 'Erro interno ao remover avatar' },
      { status: 500 }
    );
  }
}
