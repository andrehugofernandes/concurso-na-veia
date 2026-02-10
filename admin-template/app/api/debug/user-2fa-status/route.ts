import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obter todos os usuários para debug
    const users = await prisma.user.findMany({
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

    return NextResponse.json({
      message: 'Status 2FA dos usuários',
      totalUsers: users.length,
      users: users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        twoFactorEnabled: user.twoFactorEnabled,
        twoFactorSecret: user.twoFactorSecret ? '***CONFIGURADO***' : 'NÃO CONFIGURADO',
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar status 2FA:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
