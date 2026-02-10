import { NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

/**
 * @swagger
 * /api/auth/2fa/disable:
 *   post:
 *     summary: Desativa autenticação de dois fatores
 *     description: Desabilita o 2FA para o usuário autenticado, removendo o secret TOTP
 *     responses:
 *       200:
 *         description: 2FA desativado com sucesso
 *       400:
 *         description: 2FA não está habilitado
 *       401:
 *         description: Usuário não autenticado
 *       500:
 *         description: Erro interno do servidor
 */
export async function POST(req: Request) {
  try {
    // Verificar se o usuário está autenticado
    const authUser = await getAuthUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    // Buscar o usuário atual
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        username: true,
        email: true,
        twoFactorEnabled: true,
        twoFactorSecret: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
    }

    // Verificar se 2FA está habilitado
    if (!user.twoFactorEnabled) {
      return NextResponse.json({
        message: 'Autenticação de dois fatores não está habilitada para este usuário'
      }, { status: 400 });
    }

    // Desabilitar 2FA
    const updatedUser = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null
      },
      select: {
        id: true,
        username: true,
        email: true,
        twoFactorEnabled: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Autenticação de dois fatores desativada com sucesso!',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        twoFactorEnabled: updatedUser.twoFactorEnabled
      }
    });

  } catch (error) {
    console.error('Erro ao desativar 2FA:', error);
    return NextResponse.json({
      message: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
