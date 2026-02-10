import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { prisma } from '@/lib/prisma';
import { verifyTemp2FAToken, getAuthUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tempToken } = body;

    if (!tempToken) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 400 });
    }

    let userId: string | null = null;

    if (tempToken === 'ad-authenticated') {
      // Para usuários AD autenticados, obter ID do token de acesso atual
      const authUser = await getAuthUserFromRequest(request);
      if (!authUser) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
      }
      userId = authUser.id;
    } else {
      // Verificar o token temporário tradicional
      try {
        const decoded = verifyTemp2FAToken(tempToken) as unknown;
        const sub = typeof decoded === 'object' && decoded !== null && 'sub' in decoded ? (decoded as { sub?: unknown }).sub : undefined;
        userId = String(sub ?? '');
      } catch {
        return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 });
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Usuário não identificado' }, { status: 401 });
    }

    // Buscar o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, twoFactorEnabled: true, twoFactorSecret: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Verificar se 2FA já está habilitado
    if (user.twoFactorEnabled) {
      return NextResponse.json({
        error: 'Autenticação de dois fatores já está habilitada para este usuário'
      }, { status: 400 });
    }

    // Secret idempotente: reutiliza se já existir, gera se estiver ausente
    const secret = user.twoFactorSecret || authenticator.generateSecret();

    // Persistir apenas se ainda não houver secret salvo (não habilita o 2FA aqui)
    if (!user.twoFactorSecret) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          twoFactorSecret: secret,
        },
      });
    }

    // Criar URL otpauth para configuração automática (sempre a partir do secret atual)
    const otpauthUrl = authenticator.keyuri(
      user.email || user.username,
      'IMUNE+ Jaboatão',
      secret
    );

    // Gerar QR code como imagem base64
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    // Retornar informações para configuração
    return NextResponse.json({
      secret: secret,
      qrCodeUrl: qrCodeDataUrl,
      otpauthUrl: otpauthUrl,
      message: 'Secret gerado com sucesso. Use este secret no seu app autenticador.'
    });

  } catch (error) {
    console.error('Erro no setup de 2FA:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
