'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createErrorResponse,
  createSuccessResponse,
} from '@/lib/actions/safe-action';

// ============================================================================
// Cache Tags
// ============================================================================

const ACCORDION_BLOCKS_TAG = 'accordion-blocks';

// ============================================================================
// Schemas
// ============================================================================

const accordionBlockItemAssetSchema = z.object({
  mediaId: z.number().int().positive('Mídia inválida'),
  order: z.number().int().min(0).default(0),
  caption: z.string().optional().nullable(),
  displayLabel: z.string().optional().nullable(),
});

const VALID_COLOR_KEYS = ['orange', 'blue', 'green', 'lightGreen', 'yellow', 'lightBlue'] as const;

const accordionBlockItemSchema = z
  .object({
    title: z.string().min(1, 'Título do item é obrigatório'),
    type: z.enum(['text', 'files', 'images']),
    order: z.number().int().min(0).default(0),
    colorKey: z.enum(VALID_COLOR_KEYS).optional().nullable(),
    textContent: z.string().optional().nullable(),
    assets: z.array(accordionBlockItemAssetSchema).optional().default([]),
  })
  .superRefine((value, ctx) => {
    if (value.type === 'text') {
      const text = (value.textContent ?? '').trim();
      if (!text) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['textContent'],
          message: 'Conteúdo de texto é obrigatório para itens do tipo texto',
        });
      }
      if (value.assets.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['assets'],
          message: 'Itens do tipo texto não podem conter mídias',
        });
      }
      return;
    }

    // files/images
    if (value.assets.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['assets'],
        message: 'Selecione ao menos 1 mídia para este item',
      });
    }

    if (value.textContent && value.textContent.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['textContent'],
        message: 'Itens do tipo arquivos/imagens não devem ter texto',
      });
    }
  });

const createAccordionBlockSchema = z.object({
  title: z.string().min(1, 'Título do acordeon é obrigatório'),
  slug: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  items: z.array(accordionBlockItemSchema).min(1, 'Adicione ao menos 1 item'),
});

const updateAccordionBlockSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  title: z.string().min(1, 'Título do acordeon é obrigatório').optional(),
  slug: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  items: z.array(accordionBlockItemSchema).min(1, 'Adicione ao menos 1 item').optional(),
});

const listAccordionBlocksSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(200).default(10),
});

const selectAllAccordionIdsSchema = z.object({
  status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  search: z.string().optional(),
});

const toggleAccordionStatusSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  isActive: z.boolean(),
});

const deleteAccordionsBulkSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, 'Selecione ao menos 1 acordeon'),
});

// ============================================================================
// Types
// ============================================================================

export type AccordionBlockListItem = {
  id: string;
  title: string;
  slug: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  itemsCount: number;
};

export type AccordionBlockListResult = {
  items: AccordionBlockListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  pages: number;
};

export type AccordionStats = {
  total: number;
  active: number;
  inactive: number;
};

export type AccordionBlockDetails = {
  id: string;
  title: string;
  slug: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    title: string;
    type: 'text' | 'files' | 'images';
    order: number;
    colorKey: string | null;
    textContent: string | null;
    assets: Array<{
      id: string;
      order: number;
      caption: string | null;
      displayLabel: string | null;
      media: {
        id: number;
        originalFilename: string;
        firebaseUrl: string;
        thumbnailUrl: string | null;
        mimeType: string;
        sizes: Record<string, string>;
      };
    }>;
  }>;
};

// ============================================================================
// Server Actions
// ============================================================================

export async function listAccordionBlocks(
  input: z.infer<typeof listAccordionBlocksSchema> = { page: 1, pageSize: 10, status: 'all' }
): Promise<ActionResponse<AccordionBlockListResult>> {
  try {
    const validated = listAccordionBlocksSchema.parse(input);

    const where: Record<string, unknown> = {};

    if (validated.status !== 'all') {
      where.isActive = validated.status === 'active';
    }

    if (validated.search) {
      where.OR = [
        { title: { contains: validated.search, mode: 'insensitive' } },
        { slug: { contains: validated.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.accordionBlock.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (validated.page - 1) * validated.pageSize,
        take: validated.pageSize,
        include: {
          _count: { select: { items: true } },
        },
      }),
      prisma.accordionBlock.count({ where }),
    ]);

    const totalPages = Math.ceil(total / validated.pageSize);

    return createSuccessResponse({
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        isActive: item.isActive,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
        itemsCount: item._count.items,
      })),
      total,
      page: validated.page,
      pageSize: validated.pageSize,
      totalPages,
      pages: totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listAccordionBlocks] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Parâmetros inválidos');
    }
    return createErrorResponse('Erro ao listar acordeons');
  }
}

export async function getAccordionBlock(
  input: { id: string }
): Promise<ActionResponse<{ accordion: AccordionBlockDetails }>> {
  try {
    const validated = z.object({ id: z.string().min(1, 'ID é obrigatório') }).parse(input);

    const accordion = await prisma.accordionBlock.findUnique({
      where: { id: validated.id },
      include: {
        items: {
          orderBy: { order: 'asc' },
          include: {
            assets: {
              orderBy: { order: 'asc' },
              include: {
                media: {
                  select: {
                    id: true,
                    originalFilename: true,
                    firebaseUrl: true,
                    thumbnailUrl: true,
                    mimeType: true,
                    sizes: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!accordion) {
      return createErrorResponse('Acordeon não encontrado');
    }

    return createSuccessResponse({
      accordion: {
        id: accordion.id,
        title: accordion.title,
        slug: accordion.slug,
        isActive: accordion.isActive,
        createdAt: accordion.createdAt.toISOString(),
        updatedAt: accordion.updatedAt.toISOString(),
        items: accordion.items.map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type as 'text' | 'files' | 'images',
          order: item.order,
          colorKey: item.colorKey,
          textContent: item.textContent,
          assets: item.assets.map((asset) => ({
            id: asset.id,
            order: asset.order,
            caption: asset.caption,
            displayLabel: asset.displayLabel,
            media: {
              id: asset.media.id,
              originalFilename: asset.media.originalFilename,
              firebaseUrl: asset.media.firebaseUrl,
              thumbnailUrl: asset.media.thumbnailUrl,
              mimeType: asset.media.mimeType,
              sizes: asset.media.sizes as Record<string, string>,
            },
          })),
        })),
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getAccordionBlock] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Parâmetros inválidos');
    }
    return createErrorResponse('Erro ao buscar acordeon');
  }
}

export async function createAccordionBlock(
  input: z.infer<typeof createAccordionBlockSchema>
): Promise<ActionResponse<{ accordionId: string }>> {
  try {
    const validated = createAccordionBlockSchema.parse(input);

    const created = await prisma.$transaction(async (tx) => {
      const accordion = await tx.accordionBlock.create({
        data: {
          title: validated.title,
          slug: validated.slug ?? null,
          isActive: validated.isActive,
        },
        select: { id: true },
      });

      for (const item of validated.items) {
        const createdItem = await tx.accordionBlockItem.create({
          data: {
            accordionBlockId: accordion.id,
            title: item.title,
            type: item.type,
            order: item.order,
            colorKey: item.colorKey ?? null,
            textContent: item.type === 'text' ? (item.textContent ?? null) : null,
          },
          select: { id: true },
        });

        if (item.type !== 'text') {
          for (const asset of item.assets) {
            await tx.accordionBlockItemAsset.create({
              data: {
                itemId: createdItem.id,
                mediaId: asset.mediaId,
                order: asset.order,
                caption: asset.caption ?? null,
                displayLabel: asset.displayLabel ?? null,
              },
            });
          }
        }
      }

      return accordion;
    });

    revalidateTag(ACCORDION_BLOCKS_TAG, 'max');

    return createSuccessResponse({ accordionId: created.id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createAccordionBlock] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Dados inválidos');
    }
    return createErrorResponse('Erro ao criar acordeon');
  }
}

export async function updateAccordionBlock(
  input: z.infer<typeof updateAccordionBlockSchema>
): Promise<ActionResponse<{ updated: boolean }>> {
  try {
    const validated = updateAccordionBlockSchema.parse(input);

    const existing = await prisma.accordionBlock.findUnique({
      where: { id: validated.id },
      select: { id: true },
    });

    if (!existing) {
      return createErrorResponse('Acordeon não encontrado');
    }

    await prisma.$transaction(async (tx) => {
      await tx.accordionBlock.update({
        where: { id: validated.id },
        data: {
          ...(validated.title !== undefined ? { title: validated.title } : {}),
          ...(validated.slug !== undefined ? { slug: validated.slug ?? null } : {}),
          ...(validated.isActive !== undefined ? { isActive: validated.isActive } : {}),
        },
      });

      if (validated.items) {
        // Estratégia simples (MVP): recriar itens e assets
        // Mantém consistência e reduz complexidade de diff.
        await tx.accordionBlockItemAsset.deleteMany({
          where: { item: { accordionBlockId: validated.id } },
        });
        await tx.accordionBlockItem.deleteMany({
          where: { accordionBlockId: validated.id },
        });

        for (const item of validated.items) {
          const createdItem = await tx.accordionBlockItem.create({
            data: {
              accordionBlockId: validated.id,
              title: item.title,
              type: item.type,
              order: item.order,
              colorKey: item.colorKey ?? null,
              textContent: item.type === 'text' ? (item.textContent ?? null) : null,
            },
            select: { id: true },
          });

          if (item.type !== 'text') {
            for (const asset of item.assets) {
              await tx.accordionBlockItemAsset.create({
                data: {
                  itemId: createdItem.id,
                  mediaId: asset.mediaId,
                  order: asset.order,
                  caption: asset.caption ?? null,
                  displayLabel: asset.displayLabel ?? null,
                },
              });
            }
          }
        }
      }
    });

    revalidateTag(ACCORDION_BLOCKS_TAG, 'max');

    return createSuccessResponse({ updated: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateAccordionBlock] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Dados inválidos');
    }
    return createErrorResponse('Erro ao atualizar acordeon');
  }
}

export async function deleteAccordionBlock(
  input: { id: string }
): Promise<ActionResponse<{ deleted: boolean }>> {
  try {
    const validated = z.object({ id: z.string().min(1, 'ID é obrigatório') }).parse(input);

    const existing = await prisma.accordionBlock.findUnique({
      where: { id: validated.id },
      select: { id: true },
    });

    if (!existing) {
      return createErrorResponse('Acordeon não encontrado');
    }

    await prisma.accordionBlock.delete({
      where: { id: validated.id },
    });

    revalidateTag(ACCORDION_BLOCKS_TAG, 'max');

    return createSuccessResponse({ deleted: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteAccordionBlock] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Parâmetros inválidos');
    }
    return createErrorResponse('Erro ao deletar acordeon');
  }
}

export async function selectAllAccordionIds(
  input: z.infer<typeof selectAllAccordionIdsSchema> = { status: 'all' }
): Promise<ActionResponse<{ ids: string[]; total: number }>> {
  try {
    const validated = selectAllAccordionIdsSchema.parse(input);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};
    if (validated.status !== 'all') {
      where.isActive = validated.status === 'active';
    }

    if (validated.search) {
      where.OR = [
        { title: { contains: validated.search, mode: 'insensitive' } },
        { slug: { contains: validated.search, mode: 'insensitive' } },
      ];
    }

    const accordions = await prisma.accordionBlock.findMany({
      where,
      select: { id: true },
    });

    return createSuccessResponse({
      ids: accordions.map((a) => a.id),
      total: accordions.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[selectAllAccordionIds] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Parâmetros inválidos');
    }
    return createErrorResponse('Erro ao selecionar acordeons');
  }
}

export async function getAccordionStats(): Promise<ActionResponse<AccordionStats>> {
  try {
    const [total, active, inactive] = await Promise.all([
      prisma.accordionBlock.count(),
      prisma.accordionBlock.count({ where: { isActive: true } }),
      prisma.accordionBlock.count({ where: { isActive: false } }),
    ]);

    return createSuccessResponse({
      total,
      active,
      inactive,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getAccordionStats] Error:', error);
    return createErrorResponse('Erro ao buscar estatísticas de acordeons');
  }
}

export async function toggleAccordionStatus(
  input: z.infer<typeof toggleAccordionStatusSchema>
): Promise<ActionResponse<{ updated: boolean }>> {
  try {
    const validated = toggleAccordionStatusSchema.parse(input);

    const existing = await prisma.accordionBlock.findUnique({
      where: { id: validated.id },
      select: { id: true },
    });

    if (!existing) {
      return createErrorResponse('Acordeon não encontrado');
    }

    await prisma.accordionBlock.update({
      where: { id: validated.id },
      data: { isActive: validated.isActive },
    });

    revalidateTag(ACCORDION_BLOCKS_TAG, 'max');

    return createSuccessResponse({ updated: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[toggleAccordionStatus] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Dados inválidos');
    }
    return createErrorResponse('Erro ao atualizar status do acordeon');
  }
}

export async function deleteAccordionsBulk(
  input: z.infer<typeof deleteAccordionsBulkSchema>
): Promise<ActionResponse<{ deleted: number }>> {
  try {
    const validated = deleteAccordionsBulkSchema.parse(input);

    const result = await prisma.accordionBlock.deleteMany({
      where: { id: { in: validated.ids } },
    });

    revalidateTag(ACCORDION_BLOCKS_TAG, 'max');

    return createSuccessResponse({ deleted: result.count });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteAccordionsBulk] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0]?.message ?? 'Dados inválidos');
    }
    return createErrorResponse('Erro ao deletar acordeons selecionados');
  }
}
