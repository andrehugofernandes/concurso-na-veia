import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { comparePassword, signTemp2FAToken } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';

export const runtime = 'nodejs';

const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuário com 2FA obrigatório
 *     description: Autentica o usuário com username e password e sempre retorna token temporário para verificação do 2FA.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido, requer verificação 2FA
 *       401:
 *         description: Credenciais inválidas
 */
export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { username, password } = LoginSchema.parse(json);

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      await logActivity({
        action: 'auth:login-failed',
        resource: 'auth',
        userId: undefined,
        request: req,
        details: { username, reason: 'user-not-found' },
      });
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    const ok = await comparePassword(password, user.password);
    if (!ok) {
      await logActivity({
        action: 'auth:login-failed',
        resource: 'auth',
        userId: user.id,
        request: req,
        details: { username, reason: 'invalid-password' },
      });
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }

    // 2FA é agora obrigatório para todos os usuários
    const tempToken = signTemp2FAToken({ sub: user.id, username: user.username });
    await logActivity({
      action: 'auth:login-success',
      resource: 'auth',
      userId: user.id,
      request: req,
      details: { provider: 'local', username: user.username },
    });
    return NextResponse.json({ 
      requires2FA: true, 
      tempToken,
      message: 'Autenticação em dois fatores obrigatória'
    });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    }
    const message = err instanceof Error ? err.message : 'Erro interno';
    console.error('Erro em /api/auth/login:', err);
    return NextResponse.json({ message: 'Erro interno', detail: message }, { status: 500 });
  }
}
