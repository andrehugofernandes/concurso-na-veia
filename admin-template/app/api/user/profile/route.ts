import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/user/profile
 * Obter perfil do usuário autenticado
 */
export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        full_name: true,
        role: true,
        phone: true,
        job_title: true,
        sei_unit: true,
        avatar_url: true,
        avatar_updated_at: true,
        twoFactorEnabled: true,
        ad_last_sync: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return NextResponse.json(
      { message: 'Erro interno ao buscar perfil' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile
 * Atualizar perfil do usuário autenticado
 */
export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    const body = await req.json();
    const { full_name, phone, job_title, sei_unit } = body;

    // Validações
    if (phone && !/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(phone)) {
      return NextResponse.json(
        { message: 'Formato de telefone inválido. Use: (XX) XXXXX-XXXX' },
        { status: 400 }
      );
    }

    // Atualizar apenas campos permitidos
    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        full_name: full_name !== undefined ? full_name : undefined,
        phone: phone !== undefined ? phone : undefined,
        job_title: job_title !== undefined ? job_title : undefined,
        sei_unit: sei_unit !== undefined ? sei_unit : undefined,
        updatedAt: new Date()
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        full_name: true,
        role: true,
        phone: true,
        job_title: true,
        sei_unit: true,
        avatar_url: true,
        avatar_updated_at: true,
        twoFactorEnabled: true,
        ad_last_sync: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      message: 'Perfil atualizado com sucesso',
      user: updatedUser
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json(
      { message: 'Erro interno ao atualizar perfil' },
      { status: 500 }
    );
  }
}
