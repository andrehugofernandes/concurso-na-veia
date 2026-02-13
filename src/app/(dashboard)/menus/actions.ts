'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';

// ============================================================================
// Types
// ============================================================================

export interface MenuItem {
  id: number;
  wpId: number;
  menuId: number;
  parentId: number | null;
  label: string;
  url: string;
  order: number;
  target: string | null;
  cssClasses: string[];
  children?: MenuItem[];
}

export interface Menu {
  id: number;
  wpId: number;
  name: string;
  location: string;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PageForMenu {
  id: number;
  title: string;
  slug: string;
  url: string;
  type: 'page' | 'post';
}

// ============================================================================
// Cache Tags
// ============================================================================

const MENUS_LIST_TAG = 'menus-list';

// ============================================================================
// Schemas
// ============================================================================

const createMenuSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  location: z.string().min(1, 'Localização é obrigatória'),
});

const updateMenuSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Nome é obrigatório').optional(),
  location: z.string().min(1, 'Localização é obrigatória').optional(),
});

const createMenuItemSchema = z.object({
  menuId: z.number(),
  parentId: z.number().nullable().optional(),
  label: z.string().min(1, 'Label é obrigatório'),
  url: z.string().min(1, 'URL é obrigatória'),
  target: z.string().nullable().optional(),
  cssClasses: z.array(z.string()).optional(),
});

const updateMenuItemSchema = z.object({
  id: z.number(),
  label: z.string().min(1, 'Label é obrigatório').optional(),
  url: z.string().min(1, 'URL é obrigatória').optional(),
  target: z.string().nullable().optional(),
  cssClasses: z.array(z.string()).optional(),
});

const reorderMenuItemsSchema = z.object({
  menuId: z.number(),
  items: z.array(z.object({
    id: z.number(),
    parentId: z.number().nullable(),
    order: z.number(),
  })),
});

// ============================================================================
// Helper Functions
// ============================================================================

function buildMenuTree(items: MenuItem[]): MenuItem[] {
  const itemMap = new Map<number, MenuItem>();
  const rootItems: MenuItem[] = [];

  // Create a map of all items
  for (const item of items) {
    itemMap.set(item.id, { ...item, children: [] });
  }

  // Build the tree structure
  for (const item of items) {
    const mappedItem = itemMap.get(item.id)!;
    if (item.parentId === null) {
      rootItems.push(mappedItem);
    } else {
      const parent = itemMap.get(item.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(mappedItem);
      } else {
        // Orphan item, add to root
        rootItems.push(mappedItem);
      }
    }
  }

  // Sort by order
  const sortByOrder = (a: MenuItem, b: MenuItem) => a.order - b.order;
  rootItems.sort(sortByOrder);
  
  const sortChildren = (items: MenuItem[]) => {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        item.children.sort(sortByOrder);
        sortChildren(item.children);
      }
    }
  };
  sortChildren(rootItems);

  return rootItems;
}

async function getNextMenuId(): Promise<number> {
  const lastMenu = await prisma.menu.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true },
  });
  return (lastMenu?.id ?? 0) + 1;
}

async function getNextMenuItemId(): Promise<number> {
  const lastItem = await prisma.menuItem.findFirst({
    orderBy: { id: 'desc' },
    select: { id: true },
  });
  return (lastItem?.id ?? 0) + 1;
}

async function getNextOrder(menuId: number, parentId: number | null): Promise<number> {
  const lastItem = await prisma.menuItem.findFirst({
    where: { menuId, parentId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });
  return (lastItem?.order ?? -1) + 1;
}

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Lista todos os menus
 */
export async function listMenus(): Promise<ActionResponse<{ menus: Menu[] }>> {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    const menusWithTree = menus.map(menu => ({
      ...menu,
      items: buildMenuTree(menu.items),
    }));

    return createSuccessResponse({ menus: menusWithTree });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listMenus] Error:', error);
    return createErrorResponse('Erro ao listar menus');
  }
}

/**
 * Obtém um menu por ID
 */
export async function getMenu(id: number): Promise<ActionResponse<{ menu: Menu }>> {
  try {
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!menu) {
      return createErrorResponse('Menu não encontrado');
    }

    return createSuccessResponse({
      menu: {
        ...menu,
        items: buildMenuTree(menu.items),
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getMenu] Error:', error);
    return createErrorResponse('Erro ao buscar menu');
  }
}

/**
 * Cria um novo menu
 */
export async function createMenu(
  data: z.infer<typeof createMenuSchema>
): Promise<ActionResponse<{ menu: Menu }>> {
  try {
    const validated = createMenuSchema.parse(data);

    const nextId = await getNextMenuId();

    const menu = await prisma.menu.create({
      data: {
        id: nextId,
        wpId: nextId,
        name: validated.name,
        location: validated.location,
      },
      include: {
        items: true,
      },
    });

    revalidateTag(MENUS_LIST_TAG, 'max');

    return createSuccessResponse({
      menu: {
        ...menu,
        items: [],
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createMenu] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao criar menu');
  }
}

/**
 * Atualiza um menu existente
 */
export async function updateMenu(
  data: z.infer<typeof updateMenuSchema>
): Promise<ActionResponse<{ menu: Menu }>> {
  try {
    const validated = updateMenuSchema.parse(data);

    const existing = await prisma.menu.findUnique({
      where: { id: validated.id },
    });

    if (!existing) {
      return createErrorResponse('Menu não encontrado');
    }

    const updateData: { name?: string; location?: string } = {};
    if (validated.name !== undefined) updateData.name = validated.name;
    if (validated.location !== undefined) updateData.location = validated.location;

    const menu = await prisma.menu.update({
      where: { id: validated.id },
      data: updateData,
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
    });

    revalidateTag(MENUS_LIST_TAG, 'max');

    return createSuccessResponse({
      menu: {
        ...menu,
        items: buildMenuTree(menu.items),
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateMenu] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar menu');
  }
}

/**
 * Deleta um menu
 */
export async function deleteMenu(id: number): Promise<ActionResponse<{ deleted: boolean }>> {
  try {
    const existing = await prisma.menu.findUnique({
      where: { id },
    });

    if (!existing) {
      return createErrorResponse('Menu não encontrado');
    }

    await prisma.menu.delete({
      where: { id },
    });

    revalidateTag(MENUS_LIST_TAG, 'max');

    return createSuccessResponse({ deleted: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteMenu] Error:', error);
    return createErrorResponse('Erro ao deletar menu');
  }
}

/**
 * Cria um novo item de menu
 */
export async function createMenuItem(
  data: z.infer<typeof createMenuItemSchema>
): Promise<ActionResponse<{ item: MenuItem }>> {
  try {
    const validated = createMenuItemSchema.parse(data);

    const menu = await prisma.menu.findUnique({
      where: { id: validated.menuId },
    });

    if (!menu) {
      return createErrorResponse('Menu não encontrado');
    }

    const nextId = await getNextMenuItemId();
    const nextOrder = await getNextOrder(validated.menuId, validated.parentId ?? null);

    const item = await prisma.menuItem.create({
      data: {
        id: nextId,
        wpId: nextId,
        menuId: validated.menuId,
        parentId: validated.parentId ?? null,
        label: validated.label,
        url: validated.url,
        order: nextOrder,
        target: validated.target ?? null,
        cssClasses: validated.cssClasses ?? [],
      },
    });

    revalidateTag(MENUS_LIST_TAG, 'max');

    return createSuccessResponse({ item });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createMenuItem] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao criar item de menu');
  }
}

/**
 * Atualiza um item de menu
 */
export async function updateMenuItem(
  data: z.infer<typeof updateMenuItemSchema>
): Promise<ActionResponse<{ item: MenuItem }>> {
  try {
    const validated = updateMenuItemSchema.parse(data);

    const existing = await prisma.menuItem.findUnique({
      where: { id: validated.id },
    });

    if (!existing) {
      return createErrorResponse('Item de menu não encontrado');
    }

    const updateData: {
      label?: string;
      url?: string;
      target?: string | null;
      cssClasses?: string[];
    } = {};
    
    if (validated.label !== undefined) updateData.label = validated.label;
    if (validated.url !== undefined) updateData.url = validated.url;
    if (validated.target !== undefined) updateData.target = validated.target;
    if (validated.cssClasses !== undefined) updateData.cssClasses = validated.cssClasses;

    const item = await prisma.menuItem.update({
      where: { id: validated.id },
      data: updateData,
    });

    revalidateTag(MENUS_LIST_TAG, 'max');

    return createSuccessResponse({ item });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateMenuItem] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar item de menu');
  }
}

/**
 * Deleta um item de menu
 */
export async function deleteMenuItem(id: number): Promise<ActionResponse<{ deleted: boolean }>> {
  try {
    const existing = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!existing) {
      return createErrorResponse('Item de menu não encontrado');
    }

    // Move children to parent or root
    await prisma.menuItem.updateMany({
      where: { parentId: id },
      data: { parentId: existing.parentId },
    });

    await prisma.menuItem.delete({
      where: { id },
    });

    revalidateTag(MENUS_LIST_TAG, 'max');

    return createSuccessResponse({ deleted: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteMenuItem] Error:', error);
    return createErrorResponse('Erro ao deletar item de menu');
  }
}

/**
 * Reordena itens de menu (drag-and-drop)
 */
export async function reorderMenuItems(
  data: z.infer<typeof reorderMenuItemsSchema>
): Promise<ActionResponse<{ success: boolean }>> {
  try {
    const validated = reorderMenuItemsSchema.parse(data);

    // eslint-disable-next-line no-console
    console.log('[reorderMenuItems] Input:', JSON.stringify(validated, null, 2));

    const menu = await prisma.menu.findUnique({
      where: { id: validated.menuId },
    });

    if (!menu) {
      // eslint-disable-next-line no-console
      console.log('[reorderMenuItems] Menu not found:', validated.menuId);
      return createErrorResponse('Menu não encontrado');
    }

    // Verify all items exist before updating
    const existingItems = await prisma.menuItem.findMany({
      where: { menuId: validated.menuId },
      select: { id: true },
    });
    const existingIds = new Set(existingItems.map((i) => i.id));

    // eslint-disable-next-line no-console
    console.log('[reorderMenuItems] Existing IDs:', Array.from(existingIds));

    // Filter to only update items that exist
    const validItems = validated.items.filter((item) => existingIds.has(item.id));

    // eslint-disable-next-line no-console
    console.log('[reorderMenuItems] Valid items count:', validItems.length);

    if (validItems.length === 0) {
      return createSuccessResponse({ success: true });
    }

    // Update all items in a transaction
    await prisma.$transaction(
      validItems.map(item =>
        prisma.menuItem.update({
          where: { id: item.id },
          data: {
            parentId: item.parentId,
            order: item.order,
          },
        })
      )
    );

    revalidateTag(MENUS_LIST_TAG, 'max');

    // eslint-disable-next-line no-console
    console.log('[reorderMenuItems] Success');

    return createSuccessResponse({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[reorderMenuItems] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao reordenar itens de menu');
  }
}

/**
 * Obtém estatísticas de menus
 */
export async function getMenuStats(): Promise<
  ActionResponse<{
    totalMenus: number;
    totalItems: number;
    byLocation: Record<string, number>;
  }>
> {
  try {
    const totalMenus = await prisma.menu.count();
    const totalItems = await prisma.menuItem.count();

    const locationCounts = await prisma.menu.groupBy({
      by: ['location'],
      _count: { id: true },
    });

    const byLocation: Record<string, number> = {};
    for (const item of locationCounts) {
      byLocation[item.location] = item._count.id;
    }

    return createSuccessResponse({
      totalMenus,
      totalItems,
      byLocation,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getMenuStats] Error:', error);
    return createErrorResponse('Erro ao buscar estatísticas de menus');
  }
}

/**
 * Lista páginas e posts disponíveis para adicionar ao menu
 */
export async function listPagesForMenu(
  options?: { type?: 'page' | 'post' | 'all'; search?: string }
): Promise<ActionResponse<{ pages: PageForMenu[] }>> {
  try {
    const where: Record<string, unknown> = {
      status: 'published',
    };

    if (options?.type && options.type !== 'all') {
      where.type = options.type;
    } else {
      where.type = { in: ['page', 'post'] };
    }

    if (options?.search) {
      where.title = { contains: options.search, mode: 'insensitive' };
    }

    const content = await prisma.content.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        type: true,
      },
      orderBy: { title: 'asc' },
      take: 100,
    });

    const pages: PageForMenu[] = content.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      url: item.type === 'page' ? `/${item.slug}` : `/posts/${item.slug}`,
      type: item.type as 'page' | 'post',
    }));

    return createSuccessResponse({ pages });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listPagesForMenu] Error:', error);
    return createErrorResponse('Erro ao listar páginas para menu');
  }
}

/**
 * Lista itens de menu flat (sem hierarquia) para seleção de pai
 */
export async function listMenuItemsFlat(
  menuId: number
): Promise<ActionResponse<{ items: MenuItem[] }>> {
  try {
    const items = await prisma.menuItem.findMany({
      where: { menuId },
      orderBy: { order: 'asc' },
    });

    return createSuccessResponse({ items });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listMenuItemsFlat] Error:', error);
    return createErrorResponse('Erro ao listar itens de menu');
  }
}
