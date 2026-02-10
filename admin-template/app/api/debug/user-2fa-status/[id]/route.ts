import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Buscar usuário específico
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        twoFactorEnabled: true,
        twoFactorSecret: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Status 2FA do usuário',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
        twoFactorSecret: user.twoFactorSecret ? {
          hasSecret: true,
          length: user.twoFactorSecret.length,
          firstChars: user.twoFactorSecret.substring(0, 4) + '...',
          lastChars: '...' + user.twoFactorSecret.substring(user.twoFactorSecret.length - 4),
        } : {
          hasSecret: false,
          message: 'NÃO CONFIGURADO'
        },
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  } catch (error) {
    console.error('Erro ao buscar status 2FA do usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
