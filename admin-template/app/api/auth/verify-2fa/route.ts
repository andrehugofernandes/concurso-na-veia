import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { issueTokenPair, verifyTemp2FAToken, getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';
import { authenticator } from 'otplib';

// Aumentar tolerância de tempo para permitir mais variação
authenticator.options = {
  ...authenticator.options,
  step: 30,
  window: 5, // Aumentado para 5 janelas de tempo (±2.5 minutos)
};

const Verify2FASchema = z.object({
  tempToken: z.string().min(1),
  code: z.string().min(6).max(6),
});

/**
 * @swagger
 * /api/auth/verify-2fa:
 *   post:
 *     summary: Verifica código 2FA e emite tokens JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tempToken, code]
 *             properties:
 *               tempToken:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verificação bem-sucedida
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token temporário inválido ou 2FA incorreto
 */
export async function POST(req: Request) {
  try {
    const json = await req.json();
    console.log('Dados recebidos verify-2fa:', { ...json, tempToken: json.tempToken ? '[PRESENTE]' : '[AUSENTE]' });
    
    const { tempToken, code } = Verify2FASchema.parse(json);

    let userId: string | null = null;

    if (tempToken === 'ad-authenticated') {
      // Para usuários AD autenticados, obter ID do token de acesso atual
      const authUser = await getAuthUserFromRequest(req);
      if (!authUser) {
        return NextResponse.json({ message: 'Usuário não autenticado' }, { status: 401 });
      }
      userId = authUser.id;
    } else {
      // Verificar o token temporário tradicional
      try {
        const decoded = verifyTemp2FAToken(tempToken) as unknown;
        const sub = typeof decoded === 'object' && decoded !== null && 'sub' in decoded ? (decoded as { sub?: unknown }).sub : undefined;
        userId = String(sub ?? '');
      } catch {
        return NextResponse.json({ message: 'Token temporário inválido' }, { status: 401 });
      }
    }

    if (!userId) {
      return NextResponse.json({ message: 'Token temporário inválido' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return NextResponse.json({ message: '2FA não habilitado' }, { status: 401 });
    }

    // Verificar TOTP com otplib (base32 por padrão)
    console.log('Verificando TOTP:', { 
      userId: user.id,
      username: user.username,
      codeLength: code?.length || 0,
      secretPresente: !!user.twoFactorSecret,
      secretLength: user.twoFactorSecret?.length || 0
    });
    
    // Garantir que o código seja uma string
    const codeStr = String(code).replace(/\s/g, '');
    
    const verified = authenticator.check(codeStr, user.twoFactorSecret);
    
    if (!verified) {
      await logActivity({
        action: 'auth:2fa-failed',
        resource: 'auth',
        userId: user.id,
        request: req,
        details: { username: user.username },
      });
      console.log('Código 2FA inválido:', { 
        codeStr,
        codeLength: codeStr.length,
        window: authenticator.options.window
      });
      return NextResponse.json({ error: 'Código 2FA inválido' }, { status: 401 });
    }

    const tokens = issueTokenPair({ 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role,
      name: user.name || user.full_name || '',
      full_name: user.full_name || user.name || ''
    });
    await logActivity({
      action: 'auth:2fa-success',
      resource: 'auth',
      userId: user.id,
      request: req,
      details: { username: user.username },
    });
    const res = NextResponse.json(tokens);

    // Definir cookies HttpOnly seguros para sessão
    // Usar nomes consistentes para os cookies em todo o sistema
    res.cookies.set('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15, // 15 minutos
    });
    res.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: (process.env.NODE_ENV === 'production' ? 'strict' : 'lax') as 'strict' | 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });
    
    // Definir também os cookies com prefixo __Host- para maior segurança em produção
    if (process.env.NODE_ENV === 'production') {
      res.cookies.set('__Host-accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15, // 15 minutos
      });
      res.cookies.set('__Host-refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });
    }

    // Remover cookies antigos se existirem
    res.cookies.delete('token');
    res.cookies.delete('refresh');
    res.cookies.delete('__Host-token');
    res.cookies.delete('__Host-refresh');

    return res;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
