import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';

const CreateCategorySchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(500).optional().nullable(),
  parentId: z.string().min(1).optional().nullable(),
  color: z.string().max(50).optional(),
  sortOrder: z.number().int().nonnegative().optional(),
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .trim();
}

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lista categorias
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  const items = await prisma.category.findMany({
    orderBy: [
      { parentId: 'asc' },
      { sortOrder: 'asc' },
      { createdAt: 'asc' },
    ],
  });
  return NextResponse.json(items);
}

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria categoria (USER, COORDENADOR, ADMIN)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada
 */
export async function POST(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // USER pode criar

  try {
    const json = await req.json();
    const data = CreateCategorySchema.parse(json);

    // Gerar slug único automaticamente
    const baseSlug = slugify(data.name);
    let slug = baseSlug || `cat-${Date.now()}`;
    let attempt = 1;
    // Garante unicidade do slug
    // Nota: usar findUnique por slug exige que slug tenha @@unique (já configurado no Prisma)
    // Em caso de corrida, o unique do banco garantirá consistência.
    // Este loop minimiza conflitos usuais.
    // Limite de segurança de tentativas para evitar loop infinito em cenários extremos
    // (não esperado aqui).
    // eslint-disable-next-line no-constant-condition
    while (attempt <= 50) {
      const exists = await prisma.category.findUnique({ where: { slug } });
      if (!exists) break;
      slug = `${baseSlug}-${attempt++}`;
    }

    const created = await prisma.category.create({
      data: {
        name: data.name,
        // Limitar descrição para evitar erro de campo muito longo
        description: data.description ? data.description.substring(0, 500) : undefined,
        parentId: data.parentId && data.parentId.trim() !== '' ? data.parentId : null,
        color: data.color ?? '#000000',
        sortOrder: data.sortOrder ?? 0,
        slug,
      },
    });
    await logActivity({
      action: 'category:create',
      resource: 'category',
      userId: auth.id,
      request: req,
      details: {
        categoryId: created.id,
        parentId: created.parentId,
        name: created.name,
        actor: { id: auth.id, username: auth.username },
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    }
    
    // Log detalhado para erros do Prisma (apenas em desenvolvimento)
    if (process.env.NODE_ENV !== 'production') {
      console.error('[api/categories] Erro ao criar categoria:', err);
    }
    
    // Verificar se é erro de campo muito longo
    const errorMessage = err instanceof Error ? err.message : String(err);
    if (errorMessage.includes('too long for the column')) {
      return NextResponse.json({ 
        message: 'Dados muito longos', 
        details: 'Um ou mais campos excedem o tamanho máximo permitido.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
