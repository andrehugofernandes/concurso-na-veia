'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';
import { logAction, logError } from '@/lib/services/audit-logger';
import { LogResource, LogAction } from '@/lib/types/audit-log';

const CTA_POPUPS_LIST_TAG = 'cta-popups-list';

// Stub de upload de mídia (a implementação original não está disponível neste projeto)
async function uploadMedia(_input?: unknown) {
  return;
}

// ============================================================================
// Types
// ============================================================================

export interface CTAPopupData {
  id: string;
  title: string;
  imageUrl: string | null;
  linkUrl: string;
  displayRule: string;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  displayPages: string | null;
  excludePages: string | null;
  createdAt: Date;
  updatedAt: Date;
}

function extractMediaInfoFromDataUrl(imageUrl: string, title: string): {
  originalFilename: string;
  firebaseUrl: string;
  mimeType: string;
  fileSize: number;
  sizes: Record<string, string>;
  altText?: string;
} | null {
  if (!imageUrl.startsWith('data:')) {
    return null;
  }

  const match = imageUrl.match(/^data:(.+);base64,(.*)$/);
  if (!match) {
    return null;
  }

  const mimeType = match[1];
  const base64 = match[2];

  if (!base64) {
    return null;
  }

  const estimatedSize = Math.floor((base64.length * 3) / 4);
  const extension = mimeType.split('/')[1] || 'png';
  const originalFilename = `cta-popup-${Date.now()}.${extension}`;

  return {
    originalFilename,
    firebaseUrl: imageUrl,
    mimeType,
    fileSize: estimatedSize,
    sizes: {
      thumbnail: imageUrl,
    },
    altText: title,
  };
}

// ============================================================================
// Schemas
// ============================================================================

const createPopupSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255),
  imageUrl: z.string().url('URL de imagem inválida').optional(),
  linkUrl: z.string().url('URL de link inválida'),
  displayRule: z.enum(['first-visit', 'always', 'scheduled']).default('always'),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  displayPages: z.string().optional(),
  excludePages: z.string().optional(),
});

const updatePopupSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Título é obrigatório').max(255).optional(),
  imageUrl: z.string().url('URL de imagem inválida').optional(),
  linkUrl: z.string().url('URL de link inválida').optional(),
  displayRule: z.enum(['first-visit', 'always', 'scheduled']).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  displayPages: z.string().optional(),
  excludePages: z.string().optional(),
});

const deletePopupSchema = z.object({
  id: z.string(),
});

const togglePopupStatusSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
});

const listPopupsSchema = z.object({
  status: z.enum(['active', 'inactive', 'all']).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Lista popups com filtros e paginação
 */
export async function listPopups(
  input: z.infer<typeof listPopupsSchema>
): Promise<
  ActionResponse<{
    popups: CTAPopupData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    pages: number;
  }>
> {
  try {
    const validated = listPopupsSchema.parse(input);

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

    const total = await prisma.cTAPopup.count({ where });
    const totalPages = Math.ceil(total / validated.pageSize);

    const popups = await prisma.cTAPopup.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (validated.page - 1) * validated.pageSize,
      take: validated.pageSize,
    });

    return createSuccessResponse({
      popups,
      total,
      page: validated.page,
      pageSize: validated.pageSize,
      totalPages,
      pages: totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listPopups] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao listar popups');
  }
}

 const selectAllPopupIdsSchema = z.object({
   status: z.enum(['active', 'inactive', 'all']).optional(),
   search: z.string().optional(),
 });

 export async function selectAllPopupIds(
   input: z.infer<typeof selectAllPopupIdsSchema> = {}
 ): Promise<ActionResponse<{ ids: string[]; total: number }>> {
   try {
     const validated = selectAllPopupIdsSchema.parse(input);

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const where: Record<string, any> = {};
     if (validated.status === 'active') {
       where.isActive = true;
     } else if (validated.status === 'inactive') {
       where.isActive = false;
     }
     if (validated.search) {
       where.OR = [{ title: { contains: validated.search, mode: 'insensitive' } }];
     }

     const popups = await prisma.cTAPopup.findMany({
       where,
       select: { id: true },
     });

     return createSuccessResponse({
       ids: popups.map((p) => p.id),
       total: popups.length,
     });
   } catch (error) {
     // eslint-disable-next-line no-console
     console.error('[selectAllPopupIds] Error:', error);
     if (error instanceof z.ZodError) {
       return createErrorResponse(error.errors[0].message);
     }
     return createErrorResponse('Erro ao selecionar popups');
   }
 }

 const deletePopupsBulkSchema = z.object({
   ids: z.array(z.string()).min(1),
 });

 export async function deletePopupsBulk(
   input: z.infer<typeof deletePopupsBulkSchema>
 ): Promise<ActionResponse<{ deleted: number; failed: number; errors: string[] }>> {
   try {
     const validated = deletePopupsBulkSchema.parse(input);

     let deleted = 0;
     let failed = 0;
     const errors: string[] = [];

     const batchSize = 25;
     for (let i = 0; i < validated.ids.length; i += batchSize) {
       const batch = validated.ids.slice(i, i + batchSize);

       for (const id of batch) {
         try {
           await prisma.cTAPopup.delete({ where: { id } });
           deleted++;
         } catch {
           failed++;
           errors.push(`Falha ao deletar popup ${id}`);
         }
       }
     }

     revalidateTag(CTA_POPUPS_LIST_TAG, 'max');

     await logAction(LogResource.CONTENT, LogAction.DELETE, undefined, {
       deleted,
       failed,
       action: 'delete_popups_bulk',
     }).catch(() => {});

     return createSuccessResponse({ deleted, failed, errors: errors.slice(0, 20) });
   } catch (error) {
     // eslint-disable-next-line no-console
     console.error('[deletePopupsBulk] Error:', error);
     if (error instanceof z.ZodError) {
       return createErrorResponse(error.errors[0].message);
     }
     await logError(
       LogResource.CONTENT,
       LogAction.EXCEPTION,
       error instanceof Error ? error : new Error(String(error)),
       undefined,
       { action: 'delete_popups_bulk' }
     ).catch(() => {});
     return createErrorResponse('Erro ao deletar popups em massa');
   }
 }

/**
 * Cria um novo popup
 */
export async function createPopup(
  input: z.infer<typeof createPopupSchema>
): Promise<ActionResponse<{ popup: CTAPopupData }>> {
  try {
    // eslint-disable-next-line no-console
    console.log('[createPopup] Starting with input:', {
      ...input,
      imageUrl: input.imageUrl ? `[BASE64 IMAGE - ${input.imageUrl.length} chars]` : null,
    });

    const validated = createPopupSchema.parse(input);
    // eslint-disable-next-line no-console
    console.log('[createPopup] Validation passed. Data ready for insert.');

    // eslint-disable-next-line no-console
    console.log('[createPopup] Creating popup in database...');
    const popup = await prisma.cTAPopup.create({
      data: {
        title: validated.title,
        imageUrl: validated.imageUrl || null,
        linkUrl: validated.linkUrl,
        displayRule: validated.displayRule,
        startDate: validated.startDate || null,
        endDate: validated.endDate || null,
        displayPages: validated.displayPages || null,
        excludePages: validated.excludePages || null,
      },
    });

    if (validated.imageUrl) {
      const mediaInput = extractMediaInfoFromDataUrl(validated.imageUrl, validated.title);
      if (mediaInput) {
        // eslint-disable-next-line no-console
        console.log('[createPopup] Registering popup image in MediaAsset');
        void uploadMedia(mediaInput);
      }
    }

    // eslint-disable-next-line no-console
    console.log('[createPopup] Popup created successfully. ID:', popup.id, 'Title:', popup.title);

    // eslint-disable-next-line no-console
    console.log('[createPopup] Revalidating cache tags with profile "max"...');
    revalidateTag(CTA_POPUPS_LIST_TAG, 'max');

    await logAction(LogResource.CONTENT, LogAction.CREATE, undefined, {
      popupId: popup.id,
      title: popup.title,
      displayRule: popup.displayRule,
      startDate: popup.startDate,
      endDate: popup.endDate,
      displayPages: popup.displayPages,
      excludePages: popup.excludePages,
      linkUrl: popup.linkUrl,
      isActive: popup.isActive,
      action: 'create_popup',
    });

    // eslint-disable-next-line no-console
    console.log('[createPopup] Success! Returning popup data');
    return createSuccessResponse({ popup });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createPopup] ❌ Error occurred:', error);
    // eslint-disable-next-line no-console
    console.error('[createPopup] Error type:', error instanceof Error ? error.constructor.name : typeof error);
    // eslint-disable-next-line no-console
    console.error('[createPopup] Error message:', error instanceof Error ? error.message : String(error));
    // eslint-disable-next-line no-console
    console.error('[createPopup] Full error object:', JSON.stringify(error, null, 2));

    if (error instanceof z.ZodError) {
      // eslint-disable-next-line no-console
      console.error('[createPopup] Zod validation error:', error.errors);
      return createErrorResponse(error.errors[0].message);
    }
    await logError(
      LogResource.CONTENT,
      LogAction.EXCEPTION,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      { action: 'create_popup' }
    ).catch(() => {});
    return createErrorResponse('Erro ao criar popup');
  }
}

/**
 * Atualiza um popup
 */
export async function updatePopup(
  input: z.infer<typeof updatePopupSchema>
): Promise<ActionResponse<{ popup: CTAPopupData }>> {
  try {
    // eslint-disable-next-line no-console
    console.log('[updatePopup] Starting with input:', {
      ...input,
      imageUrl: input.imageUrl ? `[BASE64 IMAGE - ${input.imageUrl.length} chars]` : null,
    });

    const validated = updatePopupSchema.parse(input);
    // eslint-disable-next-line no-console
    console.log('[updatePopup] Validation passed. ID:', validated.id);

    // eslint-disable-next-line no-console
    console.log('[updatePopup] Finding popup with ID:', validated.id);
    const popup = await prisma.cTAPopup.findUnique({
      where: { id: validated.id },
    });

    if (!popup) {
      // eslint-disable-next-line no-console
      console.error('[updatePopup] Popup not found with ID:', validated.id);
      return createErrorResponse('Popup não encontrado');
    }

    // eslint-disable-next-line no-console
    console.log('[updatePopup] Popup found. Updating...');
    const updated = await prisma.cTAPopup.update({
      where: { id: validated.id },
      data: {
        ...(validated.title && { title: validated.title }),
        ...(validated.imageUrl && { imageUrl: validated.imageUrl }),
        ...(validated.linkUrl && { linkUrl: validated.linkUrl }),
        ...(validated.displayRule && { displayRule: validated.displayRule }),
        ...(validated.startDate && { startDate: validated.startDate }),
        ...(validated.endDate && { endDate: validated.endDate }),
        ...(validated.displayPages !== undefined && { displayPages: validated.displayPages || null }),
        ...(validated.excludePages !== undefined && { excludePages: validated.excludePages || null }),
      },
    });

    if (validated.imageUrl && validated.imageUrl !== popup.imageUrl) {
      const mediaInput = extractMediaInfoFromDataUrl(validated.imageUrl, validated.title ?? popup.title);
      if (mediaInput) {
        // eslint-disable-next-line no-console
        console.log('[updatePopup] Registering updated popup image in MediaAsset');
        void uploadMedia(mediaInput);
      }
    }

    // eslint-disable-next-line no-console
    console.log('[updatePopup] Popup updated successfully. ID:', updated.id, 'Title:', updated.title);
    revalidateTag(CTA_POPUPS_LIST_TAG, 'max');

    await logAction(LogResource.CONTENT, LogAction.UPDATE, undefined, {
      popupId: updated.id,
      title: updated.title,
      displayRule: updated.displayRule,
      startDate: updated.startDate,
      endDate: updated.endDate,
      displayPages: updated.displayPages,
      excludePages: updated.excludePages,
      linkUrl: updated.linkUrl,
      isActive: updated.isActive,
      action: 'update_popup',
    });

    return createSuccessResponse({ popup: updated });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updatePopup] ❌ Error occurred:', error);
    // eslint-disable-next-line no-console
    console.error('[updatePopup] Error type:', error instanceof Error ? error.constructor.name : typeof error);
    // eslint-disable-next-line no-console
    console.error('[updatePopup] Error message:', error instanceof Error ? error.message : String(error));
    // eslint-disable-next-line no-console
    console.error('[updatePopup] Full error object:', JSON.stringify(error, null, 2));

    if (error instanceof z.ZodError) {
      // eslint-disable-next-line no-console
      console.error('[updatePopup] Zod validation error:', error.errors);
      return createErrorResponse(error.errors[0].message);
    }
    await logError(
      LogResource.CONTENT,
      LogAction.EXCEPTION,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      { action: 'update_popup', popupId: input.id }
    ).catch(() => {});
    return createErrorResponse('Erro ao atualizar popup');
  }
}

/**
 * Deleta um popup
 */
export async function deletePopup(
  input: z.infer<typeof deletePopupSchema>
): Promise<ActionResponse<{ deleted: boolean }>> {
  try {
    const validated = deletePopupSchema.parse(input);

    const popup = await prisma.cTAPopup.findUnique({
      where: { id: validated.id },
    });

    if (!popup) {
      return createErrorResponse('Popup não encontrado');
    }

    await prisma.cTAPopup.delete({
      where: { id: validated.id },
    });

    revalidateTag(CTA_POPUPS_LIST_TAG, 'max');

    await logAction(LogResource.CONTENT, LogAction.DELETE, undefined, {
      popupId: validated.id,
      action: 'delete_popup',
    });

    return createSuccessResponse({ deleted: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deletePopup] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    await logError(
      LogResource.CONTENT,
      LogAction.EXCEPTION,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      { action: 'delete_popup', popupId: input.id }
    ).catch(() => {});
    return createErrorResponse('Erro ao deletar popup');
  }
}

/**
 * Toggle status de um popup
 */
export async function togglePopupStatus(
  input: z.infer<typeof togglePopupStatusSchema>
): Promise<ActionResponse<{ popup: CTAPopupData }>> {
  try {
    const validated = togglePopupStatusSchema.parse(input);

    const popup = await prisma.cTAPopup.findUnique({
      where: { id: validated.id },
    });

    if (!popup) {
      return createErrorResponse('Popup não encontrado');
    }

    const updated = await prisma.cTAPopup.update({
      where: { id: validated.id },
      data: { isActive: validated.isActive },
    });

    revalidateTag(CTA_POPUPS_LIST_TAG, 'max');

    await logAction(LogResource.CONTENT, LogAction.UPDATE, undefined, {
      popupId: updated.id,
      isActive: updated.isActive,
      action: 'toggle_popup_status',
    });

    return createSuccessResponse({ popup: updated });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[togglePopupStatus] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    await logError(
      LogResource.CONTENT,
      LogAction.EXCEPTION,
      error instanceof Error ? error : new Error(String(error)),
      undefined,
      { action: 'toggle_popup_status', popupId: input.id }
    ).catch(() => {});
    return createErrorResponse('Erro ao atualizar status do popup');
  }
}

/**
 * Obtém um popup específico
 */
export async function getPopup(id: string): Promise<ActionResponse<{ popup: CTAPopupData }>> {
  try {
    const popup = await prisma.cTAPopup.findUnique({
      where: { id },
    });

    if (!popup) {
      return createErrorResponse('Popup não encontrado');
    }

    return createSuccessResponse({ popup });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getPopup] Error:', error);
    return createErrorResponse('Erro ao buscar popup');
  }
}

/**
 * Obtém estatísticas de popups
 */
export async function getPopupStats(): Promise<
  ActionResponse<{
    total: number;
    active: number;
    inactive: number;
    scheduled: number;
  }>
> {
  try {
    const [total, active, inactive, scheduled] = await Promise.all([
      prisma.cTAPopup.count(),
      prisma.cTAPopup.count({ where: { isActive: true } }),
      prisma.cTAPopup.count({ where: { isActive: false } }),
      prisma.cTAPopup.count({ where: { displayRule: 'scheduled' } }),
    ]);

    return createSuccessResponse({
      total,
      active,
      inactive,
      scheduled,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getPopupStats] Error:', error);
    return createErrorResponse('Erro ao buscar estatísticas de popups');
  }
}
