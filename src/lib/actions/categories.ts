'use server';

import { db } from '@/lib/db';
import { getCurrentUserAction } from '@/lib/actions/auth';
import { ActionResponse, createSuccessResponse, createErrorResponse } from '@/lib/actions/safe-action';
import { revalidatePath } from 'next/cache';

/**
 * Lista todas as categorias.
 */
export async function listCategoriesAction(): Promise<ActionResponse<any[]>> {
  try {
    const categories = await db.category.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    return createSuccessResponse(categories);
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao carregar categorias');
  }
}

/**
 * Cria ou atualiza uma categoria.
 */
export async function upsertCategoryAction(data: any): Promise<ActionResponse<any>> {
  try {
    const userRes = await getCurrentUserAction();
    if (userRes.status === 'error') return createErrorResponse('Não autorizado');

    const { id, ...rest } = data;

    if (id) {
        const updated = await db.category.update({
            where: { id },
            data: rest
        });
        revalidatePath('/admin/categories');
        return createSuccessResponse(updated);
    } else {
        const created = await db.category.create({
            data: rest
        });
        revalidatePath('/admin/categories');
        return createSuccessResponse(created);
    }
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao salvar categoria');
  }
}

/**
 * Remove uma categoria.
 */
export async function deleteCategoryAction(id: string): Promise<ActionResponse<any>> {
  try {
    const userRes = await getCurrentUserAction();
    if (userRes.status === 'error') return createErrorResponse('Não autorizado');

    await db.category.delete({
      where: { id }
    });

    revalidatePath('/admin/categories');
    return createSuccessResponse({ success: true });
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao excluir categoria');
  }
}

/**
 * Atualiza a hierarquia/ordem de múltiplas categorias.
 */
export async function updateCategoriesHierarchyAction(updates: any[]): Promise<ActionResponse<any>> {
  try {
    const userRes = await getCurrentUserAction();
    if (userRes.status === 'error') return createErrorResponse('Não autorizado');

    await db.$transaction(
      updates.map(update => 
        db.category.update({
          where: { id: update.id },
          data: { 
            parentId: update.parentId, 
            sortOrder: update.sortOrder 
          }
        })
      )
    );

    revalidatePath('/admin/categories');
    return createSuccessResponse({ success: true });
  } catch (error: any) {
    return createErrorResponse(error.message || 'Erro ao atualizar hierarquia');
  }
}

/**
 * Recupera contagem de arquivos por categoria.
 */
export async function getCategoryFileCountsAction(): Promise<ActionResponse<any>> {
    try {
        const categories = await db.category.findMany({
            include: {
                _count: {
                    select: { files: true }
                }
            }
        });

        const counts: Record<string, number> = {};
        let totalFiles = 0;
        let totalVideos = 0;

        categories.forEach((cat: any) => {
            counts[cat.id] = (cat as any)._count.files || 0;
            totalFiles += counts[cat.id];
            // Mock de vídeos por enquanto se não houver campo específico
        });

        return createSuccessResponse({ counts, totalFiles, totalVideos });
    } catch (error: any) {
        return createErrorResponse(error.message || 'Erro ao carregar contagens');
    }
}
