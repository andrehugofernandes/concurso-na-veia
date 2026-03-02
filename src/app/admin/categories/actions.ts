'use server';

import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';
import { revalidateTag } from 'next/cache';
import { logAction } from '@/lib/services/audit-logger';
import { LogResource, LogAction } from '@/lib/types/audit-log';

// ============================================================================
// Constants
// ============================================================================

const CATEGORIES_LIST_TAG = 'categories-list';

// ============================================================================
// Types
// ============================================================================

export interface CategoryData {
  id: number;
  wpId: number;
  name: string;
  slug: string;
  description: string | null;
  parentId: number | null;
  parentName: string | null;
  color: string | null;
  sortOrder: number;
  postsCount: number;
  childrenCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryStats {
  total: number;
  rootCategories: number;
  withPosts: number;
  withChildren: number;
}

export interface CreateCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  parentId?: number;
  color?: string;
  sortOrder?: number;
}

export interface UpdateCategoryInput {
  id: number;
  name?: string;
  slug?: string;
  description?: string | null;
  parentId?: number | null;
  color?: string | null;
  sortOrder?: number;
}

export interface HierarchyUpdate {
  id: number;
  parentId: number | null;
  sortOrder: number;
}

// ============================================================================
// Schemas
// ============================================================================

const listCategoriesSchema = z.object({
  search: z.string().optional(),
  parentId: z.number().int().optional(),
  level: z.enum(['root', 'child', 'all']).default('all'),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

const createCategorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  slug: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  parentId: z.number().int().positive().optional(),
  color: z.string().max(7).optional(),
  sortOrder: z.number().int().optional(),
});

const updateCategorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Nome é obrigatório').max(255).optional(),
  slug: z.string().max(255).optional(),
  description: z.string().max(1000).nullable().optional(),
  parentId: z.number().int().positive().nullable().optional(),
  color: z.string().max(7).nullable().optional(),
  sortOrder: z.number().int().optional(),
});

const hierarchyUpdateSchema = z.object({
  updates: z.array(z.object({
    id: z.number().int().positive(),
    parentId: z.number().int().positive().nullable(),
    sortOrder: z.number().int(),
  })),
});

const deleteCategorySchema = z.object({
  id: z.number().int().positive(),
});

// ============================================================================
// Helper Functions
// ============================================================================

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function getNextId(): Promise<number> {
  const maxId = await prisma.taxonomy.aggregate({
    _max: { id: true },
  });
  return (maxId._max.id || 0) + 1;
}

async function checkSlugExists(slug: string, excludeId?: number): Promise<boolean> {
  const existing = await prisma.taxonomy.findFirst({
    where: {
      type: 'category',
      slug,
      ...(excludeId && { NOT: { id: excludeId } }),
    },
  });
  return !!existing;
}

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Lista categorias com filtros e paginação
 */
export async function listCategories(
  input: Partial<z.infer<typeof listCategoriesSchema>> = {}
): Promise<
  ActionResponse<{
    categories: CategoryData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }>
> {
  try {
    const validated = listCategoriesSchema.parse(input);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {
      type: 'category',
    };

    if (validated.search) {
      where.OR = [
        { name: { contains: validated.search, mode: 'insensitive' } },
        { slug: { contains: validated.search, mode: 'insensitive' } },
        { description: { contains: validated.search, mode: 'insensitive' } },
      ];
    }

    if (validated.level === 'root') {
      where.parentId = null;
    } else if (validated.level === 'child') {
      where.parentId = { not: null };
    }

    if (validated.parentId) {
      where.parentId = validated.parentId;
    }

    const total = await prisma.taxonomy.count({ where });
    const totalPages = Math.ceil(total / validated.pageSize);

    const categories = await prisma.taxonomy.findMany({
      where,
      include: {
        parent: {
          select: { name: true },
        },
        children: {
          select: { id: true },
        },
        contents: {
          select: { contentId: true },
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      skip: (validated.page - 1) * validated.pageSize,
      take: validated.pageSize,
    });

    const categoriesData: CategoryData[] = categories.map((cat) => ({
      id: cat.id,
      wpId: cat.wpId,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      parentId: cat.parentId,
      parentName: cat.parent?.name || null,
      color: cat.color,
      sortOrder: cat.sortOrder,
      postsCount: cat.contents.length,
      childrenCount: cat.children.length,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));

    return createSuccessResponse({
      categories: categoriesData,
      total,
      page: validated.page,
      pageSize: validated.pageSize,
      totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listCategories] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao listar categorias');
  }
}

/**
 * Retorna estatísticas das categorias
 */
export async function getCategoryStats(): Promise<ActionResponse<CategoryStats>> {
  try {
    const [total, rootCategories, withPosts, withChildren] = await Promise.all([
      prisma.taxonomy.count({ where: { type: 'category' } }),
      prisma.taxonomy.count({ where: { type: 'category', parentId: null } }),
      prisma.taxonomy.count({
        where: {
          type: 'category',
          contents: { some: {} },
        },
      }),
      prisma.taxonomy.count({
        where: {
          type: 'category',
          children: { some: {} },
        },
      }),
    ]);

    return createSuccessResponse({
      total,
      rootCategories,
      withPosts,
      withChildren,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getCategoryStats] Error:', error);
    return createErrorResponse('Erro ao obter estatísticas de categorias');
  }
}

/**
 * Cria uma nova categoria
 */
export async function createCategory(
  input: CreateCategoryInput
): Promise<ActionResponse<CategoryData>> {
  try {
    const validated = createCategorySchema.parse(input);

    // Gerar slug se não fornecido
    const slug = validated.slug || generateSlug(validated.name);

    // Verificar se slug já existe
    if (await checkSlugExists(slug)) {
      return createErrorResponse('Já existe uma categoria com este slug');
    }

    // Verificar se categoria pai existe
    if (validated.parentId) {
      const parent = await prisma.taxonomy.findFirst({
        where: { id: validated.parentId, type: 'category' },
      });
      if (!parent) {
        return createErrorResponse('Categoria pai não encontrada');
      }
    }

    const nextId = await getNextId();

    // Calcular sortOrder se não fornecido
    let sortOrder = validated.sortOrder;
    if (sortOrder === undefined) {
      const maxSortOrder = await prisma.taxonomy.aggregate({
        _max: { sortOrder: true },
        where: { type: 'category', parentId: validated.parentId || null },
      });
      sortOrder = (maxSortOrder._max.sortOrder || 0) + 1;
    }

    const category = await prisma.taxonomy.create({
      data: {
        id: nextId,
        wpId: nextId,
        type: 'category',
        name: validated.name,
        slug,
        description: validated.description || null,
        parentId: validated.parentId || null,
        color: validated.color || null,
        sortOrder,
      },
      include: {
        parent: { select: { name: true } },
        children: { select: { id: true } },
        contents: { select: { contentId: true } },
      },
    });

    revalidateTag(CATEGORIES_LIST_TAG, 'max');

    // Log the action
    await logAction(
      LogResource.CATEGORY,
      LogAction.CREATE,
      undefined,
      { categoryId: category.id, name: category.name, slug: category.slug }
    );

    return createSuccessResponse({
      id: category.id,
      wpId: category.wpId,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId,
      parentName: category.parent?.name || null,
      color: category.color,
      sortOrder: category.sortOrder,
      postsCount: category.contents.length,
      childrenCount: category.children.length,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createCategory] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao criar categoria');
  }
}

/**
 * Atualiza uma categoria existente
 */
export async function updateCategory(
  input: UpdateCategoryInput
): Promise<ActionResponse<CategoryData>> {
  try {
    const validated = updateCategorySchema.parse(input);

    // Verificar se categoria existe
    const existing = await prisma.taxonomy.findFirst({
      where: { id: validated.id, type: 'category' },
    });
    if (!existing) {
      return createErrorResponse('Categoria não encontrada');
    }

    // Verificar slug único se alterado
    if (validated.slug && validated.slug !== existing.slug) {
      if (await checkSlugExists(validated.slug, validated.id)) {
        return createErrorResponse('Já existe uma categoria com este slug');
      }
    }

    // Verificar hierarquia - não pode ser pai de si mesmo
    if (validated.parentId === validated.id) {
      return createErrorResponse('Uma categoria não pode ser pai de si mesma');
    }

    // Verificar se não está criando ciclo na hierarquia
    if (validated.parentId) {
      const parent = await prisma.taxonomy.findFirst({
        where: { id: validated.parentId, type: 'category' },
      });
      if (!parent) {
        return createErrorResponse('Categoria pai não encontrada');
      }

      // Verificar se o novo pai não é filho da categoria atual
      let currentParent = parent;
      while (currentParent.parentId) {
        if (currentParent.parentId === validated.id) {
          return createErrorResponse('Não é possível criar ciclo na hierarquia de categorias');
        }
        const nextParent = await prisma.taxonomy.findFirst({
          where: { id: currentParent.parentId },
        });
        if (!nextParent) break;
        currentParent = nextParent;
      }
    }

    const category = await prisma.taxonomy.update({
      where: { id: validated.id },
      data: {
        ...(validated.name && { name: validated.name }),
        ...(validated.slug && { slug: validated.slug }),
        ...(validated.description !== undefined && { description: validated.description }),
        ...(validated.parentId !== undefined && { parentId: validated.parentId }),
        ...(validated.color !== undefined && { color: validated.color }),
        ...(validated.sortOrder !== undefined && { sortOrder: validated.sortOrder }),
      },
      include: {
        parent: { select: { name: true } },
        children: { select: { id: true } },
        contents: { select: { contentId: true } },
      },
    });

    revalidateTag(CATEGORIES_LIST_TAG, 'max');

    // Log the action
    await logAction(
      LogResource.CATEGORY,
      LogAction.UPDATE,
      undefined,
      { categoryId: category.id, name: category.name }
    );

    return createSuccessResponse({
      id: category.id,
      wpId: category.wpId,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parentId,
      parentName: category.parent?.name || null,
      color: category.color,
      sortOrder: category.sortOrder,
      postsCount: category.contents.length,
      childrenCount: category.children.length,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateCategory] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar categoria');
  }
}

/**
 * Exclui uma categoria (com bloqueios de integridade)
 */
export async function deleteCategory(
  input: z.infer<typeof deleteCategorySchema>
): Promise<ActionResponse<{ id: number }>> {
  try {
    const validated = deleteCategorySchema.parse(input);

    // Verificar se categoria existe
    const category = await prisma.taxonomy.findFirst({
      where: { id: validated.id, type: 'category' },
      include: {
        children: { select: { id: true, name: true } },
        contents: { select: { contentId: true } },
      },
    });

    if (!category) {
      return createErrorResponse('Categoria não encontrada');
    }

    // Bloquear se tiver filhos
    if (category.children.length > 0) {
      const childNames = category.children.map((c) => c.name).join(', ');
      return createErrorResponse(
        `Não é possível excluir esta categoria pois ela possui ${category.children.length} subcategoria(s): ${childNames}. Mova ou exclua as subcategorias primeiro.`
      );
    }

    // Bloquear se tiver posts vinculados
    if (category.contents.length > 0) {
      return createErrorResponse(
        `Não é possível excluir esta categoria pois ela possui ${category.contents.length} post(s) vinculado(s). Remova os posts da categoria primeiro.`
      );
    }

    await prisma.taxonomy.delete({
      where: { id: validated.id },
    });

    revalidateTag(CATEGORIES_LIST_TAG, 'max');

    // Log the action
    await logAction(
      LogResource.CATEGORY,
      LogAction.DELETE,
      undefined,
      { categoryId: validated.id }
    );

    return createSuccessResponse({ id: validated.id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteCategory] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao excluir categoria');
  }
}

/**
 * Lista todas as categorias para select (sem paginação)
 */
export async function listCategoriesForSelect(): Promise<
  ActionResponse<{ id: number; name: string; parentId: number | null }[]>
> {
  try {
    const categories = await prisma.taxonomy.findMany({
      where: { type: 'category' },
      select: {
        id: true,
        name: true,
        parentId: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });

    return createSuccessResponse(categories);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listCategoriesForSelect] Error:', error);
    return createErrorResponse('Erro ao listar categorias');
  }
}

/**
 * Atualiza a hierarquia de categorias em lote (para drag & drop)
 */
export async function updateCategoryHierarchy(
  input: { updates: HierarchyUpdate[] }
): Promise<ActionResponse<{ updated: number }>> {
  try {
    const validated = hierarchyUpdateSchema.parse(input);

    // Executar todas as atualizações em uma transação
    await prisma.$transaction(
      validated.updates.map((update) =>
        prisma.taxonomy.update({
          where: { id: update.id },
          data: {
            parentId: update.parentId,
            sortOrder: update.sortOrder,
          },
        })
      )
    );

    revalidateTag(CATEGORIES_LIST_TAG, 'max');

    return createSuccessResponse({ updated: validated.updates.length });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateCategoryHierarchy] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar hierarquia de categorias');
  }
}

/**
 * Lista todas as categorias com hierarquia (para drag & drop)
 */
export async function listAllCategories(): Promise<
  ActionResponse<CategoryData[]>
> {
  try {
    const categories = await prisma.taxonomy.findMany({
      where: { type: 'category' },
      include: {
        parent: { select: { name: true } },
        children: { select: { id: true } },
        contents: { select: { contentId: true } },
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });

    const categoriesData: CategoryData[] = categories.map((cat) => ({
      id: cat.id,
      wpId: cat.wpId,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      parentId: cat.parentId,
      parentName: cat.parent?.name || null,
      color: cat.color,
      sortOrder: cat.sortOrder,
      postsCount: cat.contents.length,
      childrenCount: cat.children.length,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));

    return createSuccessResponse(categoriesData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listAllCategories] Error:', error);
    return createErrorResponse('Erro ao listar categorias');
  }
}
