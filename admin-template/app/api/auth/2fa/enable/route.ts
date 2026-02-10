import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';
import { prisma } from '@/lib/prisma';
import { verifyTemp2FAToken, signAccessToken, signRefreshToken, getAuthUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

// Aumentar tolerância de tempo para permitir mais variação
authenticator.options = {
  ...authenticator.options,
  step: 30,
  window: 5, // Aumentado para 5 janelas de tempo (±2.5 minutos)
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tempToken, code } = body;

    if (!tempToken || !code) {
      return NextResponse.json({
        error: 'Token e código são obrigatórios'
      }, { status: 400 });
    }

    // Validar formato do código (deve ter 6 dígitos)
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({
        error: 'Código deve ter exatamente 6 dígitos'
      }, { status: 400 });
    }

    // Verificar o token temporário
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
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    // Buscar o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        twoFactorEnabled: true,
        twoFactorSecret: true,
        role: true
      }
    });

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json({ error: 'Usuário não encontrado ou 2FA não configurado' }, { status: 404 });
    }

    // Verificar se o código TOTP é válido com tolerância de tempo
    const isValid = authenticator.check(code, user.twoFactorSecret);

    if (!isValid) {
      return NextResponse.json({
        error: 'Código inválido. Verifique o código no seu app autenticador.'
      }, { status: 400 });
    }

    // Atualizar o status do 2FA para habilitado (se for primeira vez)
    // Definir expiração de 90 dias a partir de agora
    const twoFactorExpiresAt = new Date();
    twoFactorExpiresAt.setDate(twoFactorExpiresAt.getDate() + 90);
    
    if (!user.twoFactorEnabled) {
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          twoFactorEnabled: true,
          twoFactorExpiresAt: twoFactorExpiresAt,
          twoFactorEnabledAt: new Date()
        }
      });
    } else {
      // Se já estava habilitado, apenas renovar a expiração
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          twoFactorExpiresAt: twoFactorExpiresAt
        }
      });
    }

    // Gerar tokens JWT definitivos
    const accessToken = signAccessToken({
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    });

    const refreshToken = signRefreshToken({
      sub: user.id
    });

    // Configurar cookies HttpOnly seguros
    const isProduction = process.env.NODE_ENV === 'production';
    
    const response = NextResponse.json({
      success: true,
      message: 'Autenticação de dois fatores verificada com sucesso!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        twoFactorEnabled: true,
        role: user.role
      }
    });

    // Definir cookies seguros
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutos
      path: '/',
      ...(isProduction && { domain: '.jaboatao.pe.gov.br' })
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
      ...(isProduction && { domain: '.jaboatao.pe.gov.br' })
    });

    return response;

  } catch (error) {
    console.error('Erro ao ativar 2FA:', error);
    return NextResponse.json({
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
