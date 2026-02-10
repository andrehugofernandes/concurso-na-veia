import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyTemp2FAToken, getAuthUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tempToken } = body;

    let userId: string | null = null;

    if (tempToken && tempToken !== 'ad-authenticated') {
      // Verificar o token temporário tradicional
      try {
        const decoded = verifyTemp2FAToken(tempToken) as unknown;
        const sub = typeof decoded === 'object' && decoded !== null && 'sub' in decoded ? (decoded as { sub?: unknown }).sub : undefined;
        userId = String(sub ?? '');
      } catch {
        return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
      }
    } else if (tempToken === 'ad-authenticated') {
      // Para usuários AD autenticados, obter ID do token de acesso atual
      const authUser = await getAuthUserFromRequest(request);
      if (!authUser) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
      }
      userId = authUser.id;
    } else {
      // Tentar obter usuário do token de acesso atual (fallback)
      const authUser = await getAuthUserFromRequest(request);
      if (!authUser) {
        return NextResponse.json(
          { error: 'Token não fornecido e usuário não autenticado' },
          { status: 401 }
        );
      }
      userId = authUser.id;
    }

    if (!userId) {
      return NextResponse.json({ error: 'Usuário não identificado' }, { status: 401 });
    }

    // Buscar usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        twoFactorSecret: true,
        twoFactorEnabled: true,
        twoFactorExpiresAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se o 2FA já está configurado
    const requiresSetup = !user.twoFactorSecret || !user.twoFactorEnabled;

    // Calcular dias restantes até expiração
    let remainingDays: number | null = null;
    if (user.twoFactorExpiresAt) {
      const expiresAt = new Date(user.twoFactorExpiresAt);
      const today = new Date();
      // Normalizar para meia-noite
      expiresAt.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      const diffMs = expiresAt.getTime() - today.getTime();
      remainingDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    }

    return NextResponse.json({
      requiresSetup,
      userId: user.id,
      email: user.email,
      expiresAt: user.twoFactorExpiresAt?.toISOString() || null,
      remainingDays,
    });
  } catch (error) {
    console.error('Erro ao verificar status 2FA:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
