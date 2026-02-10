import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logActivity } from '@/lib/server/logging';

/**
 * PATCH /api/users/[id]/status
 * Toggle status ativo/inativo do usuário
 * Apenas ADMIN e COORDENADOR podem executar
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = await getAuthUserFromRequest(req);

    if (!authUser) {
      return NextResponse.json(
        { message: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Apenas SYSADMIN, ADMIN e COORDENADOR podem ativar/desativar usuários
    const isSysadmin = authUser.role === 'SYSADMIN';
    const isAdmin = authUser.role === 'ADMIN';
    const isCoord = authUser.role === 'COORDENADOR' || authUser.role === 'COORDINATOR';

    if (!(isSysadmin || isAdmin || isCoord)) {
      return NextResponse.json(
        { message: 'Sem permissão para ativar/desativar usuários' },
        { status: 403 }
      );
    }

    // Buscar usuário alvo
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        active: true
      }
    });

    if (!targetUser) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Não permitir desativar a si mesmo
    if (targetUser.id === authUser.id) {
      return NextResponse.json(
        { message: 'Você não pode desativar sua própria conta' },
        { status: 400 }
      );
    }

    // Toggle do status
    const newStatus = !targetUser.active;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        active: newStatus,
        deactivatedAt: newStatus ? null : new Date(),
        deactivatedBy: newStatus ? null : authUser.id,
        updatedAt: new Date()
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        active: true,
        deactivatedAt: true
      }
    });

    // Registrar log da ação
    await logActivity({
      action: newStatus ? 'user:activate' : 'user:deactivate',
      resource: 'user',
      userId: authUser.id,
      request: req,
      details: {
        targetUserId: targetUser.id,
        targetUsername: targetUser.username,
        previousStatus: targetUser.active,
        newStatus: newStatus,
        actor: {
          id: authUser.id,
          username: authUser.username,
          role: authUser.role
        }
      }
    });

    return NextResponse.json({
      message: newStatus ? 'Usuário ativado com sucesso' : 'Usuário desativado com sucesso',
      user: updatedUser
    });

  } catch (error) {
    console.error('[PATCH /api/users/[id]/status] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar status do usuário' },
      { status: 500 }
    );
  }
}
