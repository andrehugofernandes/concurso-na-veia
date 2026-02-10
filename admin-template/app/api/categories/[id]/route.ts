import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';

const UpdateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  parentId: z.string().min(1).optional().nullable(),
  color: z.string().optional(),
  sortOrder: z.number().int().nonnegative().optional(),
});

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtém categoria por ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       200: { description: Categoria }
 *       401: { description: Não autenticado }
 *       404: { description: Não encontrada }
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(_req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const item = await prisma.category.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ message: 'Categoria não encontrada' }, { status: 404 });
  await logActivity({
    action: 'category:view',
    resource: 'category',
    userId: auth.id,
    request: _req,
    details: { categoryId: item.id, actor: { id: auth.id, username: auth.username } },
  });
  return NextResponse.json(item);
}

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza categoria (ADMIN)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: Atualizado }
 *       401: { description: Não autenticado }
 *       403: { description: Sem permissão }
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir SYSADMIN, ADMIN e COORDENADOR
  if (auth.role !== 'SYSADMIN' && auth.role !== 'ADMIN' && auth.role !== 'COORDENADOR') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  try {
    const json = await req.json();
    const data = UpdateCategorySchema.parse(json);

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
        // limitar descrição como no create
        description: typeof data.description === 'string'
          ? data.description.substring(0, 500)
          : data.description ?? undefined,
        // normalizar parentId vazio para null
        parentId: typeof data.parentId === 'string'
          ? (data.parentId.trim() === '' ? null : data.parentId)
          : data.parentId ?? undefined,
        color: data.color ?? undefined,
        sortOrder: data.sortOrder ?? undefined,
      },
    });
    await logActivity({
      action: 'category:update',
      resource: 'category',
      userId: auth.id,
      request: req,
      details: { categoryId: id, payload: data, actor: { id: auth.id, username: auth.username } },
    });
    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Remove categoria (ADMIN)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *     responses:
 *       204: { description: Removido }
 *       401: { description: Não autenticado }
 *       403: { description: Sem permissão }
 */
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await getAuthUserFromRequest(req);
  
  console.log('[DELETE /api/categories/:id] Iniciando deleção:', { id, userRole: auth?.role, userId: auth?.id });
  
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir SYSADMIN, ADMIN e COORDENADOR
  if (auth.role !== 'SYSADMIN' && auth.role !== 'ADMIN' && auth.role !== 'COORDENADOR') {
    console.log('[DELETE /api/categories/:id] ❌ Sem permissão:', auth.role);
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  try {
    // Verificar se categoria existe
    const category = await prisma.category.findUnique({ 
      where: { id },
      include: { _count: { select: { children: true } } }
    });
    
    if (!category) {
      console.log('[DELETE /api/categories/:id] ❌ Categoria não encontrada:', id);
      return NextResponse.json({ message: 'Categoria não encontrada' }, { status: 404 });
    }

    // Verificar se tem filhos
    if (category._count.children > 0) {
      console.log('[DELETE /api/categories/:id] ❌ Categoria tem filhos:', { id, childrenCount: category._count.children });
      return NextResponse.json({ 
        message: `Não é possível excluir. Esta categoria possui ${category._count.children} subcategoria(s).` 
      }, { status: 400 });
    }

    console.log('[DELETE /api/categories/:id] ✅ Deletando categoria:', { id, name: category.name });
    await prisma.category.delete({ where: { id } });
    
    await logActivity({
      action: 'category:delete',
      resource: 'category',
      userId: auth.id,
      request: req,
      details: { categoryId: id, categoryName: category.name, actor: { id: auth.id, username: auth.username } },
    });
    
    console.log('[DELETE /api/categories/:id] ✅ Categoria deletada com sucesso');
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[DELETE /api/categories/:id] ❌ Erro ao deletar:', error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : 'Erro ao excluir categoria' 
    }, { status: 500 });
  }
}
