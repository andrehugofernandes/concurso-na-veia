import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';

// Aceita uma lista de atualizações para hierarquia
// Cada item deve conter: id (categoria), parentId (opcional) e sortOrder (number)
const HierarchyUpdateSchema = z.object({
  id: z.string().min(1),
  parentId: z.string().min(1).optional().nullable(),
  sortOrder: z.number().int().nonnegative(),
});

const PayloadSchema = z.object({
  updates: z.array(HierarchyUpdateSchema).min(1),
});

/**
 * POST /api/categories/hierarchy
 * Atualiza a hierarquia (parentId) e ordenação (sortOrder) de categorias em lote.
 *
 * Body:
 * {
 *   updates: Array<{ id: string; parentId?: string | null; sortOrder: number }>
 * }
 */
export async function POST(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir SYSADMIN, ADMIN e COORDENADOR
  if (auth.role !== 'SYSADMIN' && auth.role !== 'ADMIN' && auth.role !== 'COORDENADOR') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  try {
    const json = await req.json();
    const { updates } = PayloadSchema.parse(json);

    // Executa as atualizações em transação para garantir consistência
    await prisma.$transaction(
      updates.map((u) =>
        prisma.category.update({
          where: { id: u.id },
          data: {
            parentId: u.parentId ?? null,
            sortOrder: u.sortOrder,
          },
        })
      )
    );

    await logActivity({
      action: 'category:reorder',
      resource: 'category',
      userId: auth.id,
      request: req,
      details: { updates },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    }
    console.error('[categories/hierarchy] error:', err);
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
