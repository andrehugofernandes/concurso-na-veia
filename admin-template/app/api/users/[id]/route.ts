import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';

// Schema para atualização parcial de usuário
const UpdateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  role: z.enum(['ADMIN', 'COORDENADOR', 'USER']).optional(),
});



/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtém um usuário por ID (ADMIN)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       401:
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Usuário não encontrado
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authUser = await getAuthUserFromRequest(req);
  if (!authUser) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir SYSADMIN, ADMIN e COORDENADOR
  if (authUser.role !== 'SYSADMIN' && authUser.role !== 'ADMIN' && authUser.role !== 'COORDENADOR') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true,
      twoFactorEnabled: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  
  if (!user) return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 });
  
  await logActivity({
    action: 'user:view',
    resource: 'user',
    userId: authUser.id,
    request: req,
    details: { targetUserId: id, actor: { id: authUser.id, username: authUser.username } },
  });
  
  return NextResponse.json(user);
}

// PATCH: atualizar usuário (SYSADMIN, ADMIN ou COORDENADOR)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const authUser = await getAuthUserFromRequest(req);
  if (!authUser) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir SYSADMIN, ADMIN e COORDENADOR
  if (authUser.role !== 'SYSADMIN' && authUser.role !== 'ADMIN' && authUser.role !== 'COORDENADOR') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  try {
    const json = await req.json();
    const data = UpdateUserSchema.parse(json);

    const updated = await prisma.user.update({
      where: { id },
      data: {
        username: data.username ?? undefined,
        email: data.email ?? undefined,
        name: data.name ?? undefined,
        role: data.role ?? undefined,
      },
    });

    await logActivity({
      action: 'user:update',
      resource: 'user',
      userId: authUser.id,
      request: req,
      details: { targetUserId: id, payload: data, actor: { id: authUser.id, username: authUser.username } },
    });

    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
