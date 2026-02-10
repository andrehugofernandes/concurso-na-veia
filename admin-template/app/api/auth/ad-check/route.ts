import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';

export const runtime = 'nodejs';

/**
 * @swagger
 * /api/auth/ad-check:
 *   post:
 *     summary: Verifica usuário autenticado via AD
 *     description: Extrai informações do usuário a partir do token JWT
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       400:
 *         description: Token ausente
 *       401:
 *         description: Token inválido
 */
export async function POST(request: NextRequest) {
  try {
    // Obter usuário autenticado do token
    const authUser = await getAuthUserFromRequest(request);
    
    if (!authUser) {
      return NextResponse.json(
        { message: 'Token ausente ou inválido' },
        { status: 401 }
      );
    }

    // Extrair primeiro nome do username para compatibilidade
    const firstName = authUser.username.split('.')[0];
    
    const fullName = typeof (authUser as Record<string, unknown>)?.name === 'string'
      ? (authUser as Record<string, unknown>).name as string
      : firstName;

    return NextResponse.json({
      id: authUser.id,
      username: authUser.username,
      name: firstName,
      fullName,
      email: authUser.email,
      role: authUser.role
    });

  } catch (error: unknown) {
    console.error('[AD-CHECK] Erro ao verificar usuário:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Erro interno do servidor' },
      { status: 400 }
    );
  }
}
