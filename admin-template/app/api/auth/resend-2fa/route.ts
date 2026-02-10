import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({
        error: 'Token não fornecido'
      }, { status: 400 });
    }

    // Verificar o token temporário
    let decoded: unknown;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as unknown;
    } catch {
      return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
    }

    // Buscar o usuário no banco de dados
    const userId = (typeof decoded === 'object' && decoded !== null && 'userId' in decoded)
      ? String((decoded as { userId?: unknown }).userId ?? '')
      : '';

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        twoFactorEnabled: true,
        twoFactorSecret: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        error: 'Usuário não encontrado'
      }, { status: 404 });
    }

    if (!user.twoFactorSecret || !user.twoFactorEnabled) {
      return NextResponse.json({
        error: '2FA não está configurado para este usuário'
      }, { status: 400 });
    }

    // Gerar novo token temporário com tempo de expiração curto
    const newTempToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '5m' } // 5 minutos para reenvio
    );

    return NextResponse.json({
      success: true,
      token: newTempToken,
      message: 'Novo token gerado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao reenviar código 2FA:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
