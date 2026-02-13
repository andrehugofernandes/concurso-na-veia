'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { logAction, logError } from '@/lib/services/audit-logger';
import { LogAction, LogResource } from '@/lib/types/audit-log';
import { uploadToFirebaseStorage } from '@/lib/services/firebase-storage';
import {
    ActionResponse,
    createSuccessResponse,
    createErrorResponse,
} from '@/lib/actions/safe-action';

const GALLERIES_LIST_TAG = 'image-galleries-list';

// ============================================================================
// Types
// ============================================================================

export interface ImageGalleryData {
    id: string;
    title: string;
    images: any; // Json type
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================================================
// Schemas
// ============================================================================

const createGallerySchema = z.object({
    title: z.string().min(1, 'Título é obrigatório').max(255),
    images: z.array(z.any()).default([]),
    isActive: z.boolean().default(true),
});

const updateGallerySchema = z.object({
    id: z.string(),
    title: z.string().min(1, 'Título é obrigatório').max(255).optional(),
    images: z.array(z.any()).optional(),
    isActive: z.boolean().optional(),
});

const deleteGallerySchema = z.object({
    id: z.string(),
});

const toggleGalleryStatusSchema = z.object({
    id: z.string(),
    isActive: z.boolean(),
});

const listGalleriesSchema = z.object({
    status: z.enum(['active', 'inactive', 'all']).optional(),
    search: z.string().optional(),
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().max(100).default(20),
});

const selectAllGalleriesSchema = z.object({
    status: z.enum(['active', 'inactive', 'all']).optional(),
    search: z.string().optional(),
});

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Upload de imagem para a galeria via FormData
 */
export async function uploadGalleryImage(formData: FormData): Promise<ActionResponse<{ url: string }>> {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            return createErrorResponse('Arquivo não encontrado');
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadToFirebaseStorage(
            buffer,
            file.name,
            file.type
        );

        if (!result.success || !result.url) {
            return createErrorResponse(result.error || 'Erro ao fazer upload da imagem');
        }

        return createSuccessResponse({ url: result.url });
    } catch (error) {
        console.error('[uploadGalleryImage] Error:', error);
        return createErrorResponse('Erro interno ao fazer upload');
    }
}

/**
 * Seleciona todos os IDs de galerias com base nos filtros
 */
export async function selectAllGalleryIds(
    input: z.infer<typeof selectAllGalleriesSchema>
): Promise<ActionResponse<{ ids: string[] }>> {
    try {
        const validated = selectAllGalleriesSchema.parse(input);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: Record<string, any> = {};
        if (validated.status === 'active') {
            where.isActive = true;
        } else if (validated.status === 'inactive') {
            where.isActive = false;
        }
        if (validated.search) {
            where.OR = [
                { title: { contains: validated.search, mode: 'insensitive' } },
            ];
        }

        const galleries = await prisma.imageGallery.findMany({
            where,
            select: { id: true },
        });

        return createSuccessResponse({ ids: galleries.map((g) => g.id) });
    } catch (error) {
        console.error('[selectAllGalleryIds] Error:', error);
        return createErrorResponse('Erro ao selecionar galerias');
    }
}

/**
 * Lista galerias com filtros e paginação
 */
export async function listGalleries(
    input: z.infer<typeof listGalleriesSchema>
): Promise<
    ActionResponse<{
        galleries: ImageGalleryData[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        pages: number;
    }>
> {
    try {
        const validated = listGalleriesSchema.parse(input);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: Record<string, any> = {};
        if (validated.status === 'active') {
            where.isActive = true;
        } else if (validated.status === 'inactive') {
            where.isActive = false;
        }
        if (validated.search) {
            where.OR = [
                { title: { contains: validated.search, mode: 'insensitive' } },
            ];
        }

        const total = await prisma.imageGallery.count({ where });
        const totalPages = Math.ceil(total / validated.pageSize);

        const galleries = await prisma.imageGallery.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (validated.page - 1) * validated.pageSize,
            take: validated.pageSize,
        });

        return createSuccessResponse({
            galleries,
            total,
            page: validated.page,
            pageSize: validated.pageSize,
            totalPages,
            pages: totalPages,
        });
    } catch (error) {
        console.error('[listGalleries] Error:', error);
        if (error instanceof z.ZodError) {
            return createErrorResponse(error.errors[0].message);
        }
        return createErrorResponse('Erro ao listar galerias');
    }
}

/**
 * Cria uma nova galeria
 */
export async function createGallery(
    input: z.infer<typeof createGallerySchema>
): Promise<ActionResponse<{ gallery: ImageGalleryData }>> {
    try {
        const validated = createGallerySchema.parse(input);

        const gallery = await prisma.imageGallery.create({
            data: {
                title: validated.title,
                images: validated.images,
                isActive: validated.isActive,
            },
        });

        revalidateTag(GALLERIES_LIST_TAG, 'max');

        await logAction(LogResource.CONTENT, LogAction.CREATE, undefined, {
            galleryId: gallery.id,
            title: gallery.title,
            action: 'create_gallery',
        }).catch(() => { });

        return createSuccessResponse({ gallery });
    } catch (error) {
        console.error('[createGallery] Error:', error);
        if (error instanceof z.ZodError) {
            return createErrorResponse(error.errors[0].message);
        }
        await logError(
            LogResource.CONTENT,
            LogAction.EXCEPTION,
            error instanceof Error ? error : new Error(String(error)),
            undefined,
            { action: 'create_gallery' }
        ).catch(() => { });
        return createErrorResponse('Erro ao criar galeria');
    }
}

/**
 * Atualiza uma galeria
 */
export async function updateGallery(
    input: z.infer<typeof updateGallerySchema>
): Promise<ActionResponse<{ gallery: ImageGalleryData }>> {
    try {
        const validated = updateGallerySchema.parse(input);

        const gallery = await prisma.imageGallery.findUnique({
            where: { id: validated.id },
        });

        if (!gallery) {
            return createErrorResponse('Galeria não encontrada');
        }

        const updated = await prisma.imageGallery.update({
            where: { id: validated.id },
            data: {
                ...(validated.title && { title: validated.title }),
                ...(validated.images && { images: validated.images }),
                ...(validated.isActive !== undefined && { isActive: validated.isActive }),
            },
        });

        revalidateTag(GALLERIES_LIST_TAG, 'max');

        await logAction(LogResource.CONTENT, LogAction.UPDATE, undefined, {
            galleryId: updated.id,
            title: updated.title,
            action: 'update_gallery',
        }).catch(() => { });

        return createSuccessResponse({ gallery: updated });
    } catch (error) {
        console.error('[updateGallery] Error:', error);
        if (error instanceof z.ZodError) {
            return createErrorResponse(error.errors[0].message);
        }
        await logError(
            LogResource.CONTENT,
            LogAction.EXCEPTION,
            error instanceof Error ? error : new Error(String(error)),
            undefined,
            { action: 'update_gallery', galleryId: input.id }
        ).catch(() => { });
        return createErrorResponse('Erro ao atualizar galeria');
    }
}

/**
 * Deleta uma galeria
 */
export async function deleteGallery(
    input: z.infer<typeof deleteGallerySchema>
): Promise<ActionResponse<{ deleted: boolean }>> {
    try {
        const validated = deleteGallerySchema.parse(input);

        await prisma.imageGallery.delete({
            where: { id: validated.id },
        });

        revalidateTag(GALLERIES_LIST_TAG, 'max');

        await logAction(LogResource.CONTENT, LogAction.DELETE, undefined, {
            galleryId: validated.id,
            action: 'delete_gallery',
        }).catch(() => { });

        return createSuccessResponse({ deleted: true });
    } catch (error) {
        console.error('[deleteGallery] Error:', error);
        return createErrorResponse('Erro ao deletar galeria');
    }
}

/**
 * Deleta galerias em massa
 */
export async function deleteGalleriesBulk(
    input: { ids: string[] }
): Promise<ActionResponse<{ deleted: number; failed: number; errors: string[] }>> {
    try {
        let deleted = 0;
        let failed = 0;
        const errors: string[] = [];

        const batchSize = 25;
        for (let i = 0; i < input.ids.length; i += batchSize) {
            const batch = input.ids.slice(i, i + batchSize);
            for (const id of batch) {
                try {
                    await prisma.imageGallery.delete({ where: { id } });
                    deleted++;
                } catch {
                    failed++;
                    errors.push(`Falha ao deletar galeria ${id}`);
                }
            }
        }

        revalidateTag(GALLERIES_LIST_TAG, 'max');
        return createSuccessResponse({ deleted, failed, errors: errors.slice(0, 20) });
    } catch (error) {
        console.error('[deleteGalleriesBulk] Error:', error);
        return createErrorResponse('Erro ao deletar galerias em massa');
    }
}

/**
 * Toggle status de uma galeria
 */
export async function toggleGalleryStatus(
    input: z.infer<typeof toggleGalleryStatusSchema>
): Promise<ActionResponse<{ gallery: ImageGalleryData }>> {
    try {
        const validated = toggleGalleryStatusSchema.parse(input);

        const updated = await prisma.imageGallery.update({
            where: { id: validated.id },
            data: { isActive: validated.isActive },
        });

        revalidateTag(GALLERIES_LIST_TAG, 'max');

        return createSuccessResponse({ gallery: updated });
    } catch (error) {
        console.error('[toggleGalleryStatus] Error:', error);
        return createErrorResponse('Erro ao atualizar status da galeria');
    }
}

/**
 * Obtém estatísticas de galerias
 */
export async function getGalleryStats(): Promise<
    ActionResponse<{
        total: number;
        active: number;
        inactive: number;
    }>
> {
    try {
        const [total, active, inactive] = await Promise.all([
            prisma.imageGallery.count(),
            prisma.imageGallery.count({ where: { isActive: true } }),
            prisma.imageGallery.count({ where: { isActive: false } }),
        ]);

        return createSuccessResponse({
            total,
            active,
            inactive,
        });
    } catch (error) {
        console.error('[getGalleryStats] Error:', error);
        return createErrorResponse('Erro ao buscar estatísticas de galerias');
    }
}

/**
 * Obtém uma galeria pelo ID
 */
export async function getGallery(
    input: { id: string }
): Promise<ActionResponse<{ gallery: ImageGalleryData }>> {
    try {
        const gallery = await prisma.imageGallery.findUnique({
            where: { id: input.id },
        });

        if (!gallery) {
            return createErrorResponse('Galeria não encontrada');
        }

        return createSuccessResponse({ gallery });
    } catch (error) {
        console.error('[getGallery] Error:', error);
        return createErrorResponse('Erro ao buscar galeria');
    }
}
