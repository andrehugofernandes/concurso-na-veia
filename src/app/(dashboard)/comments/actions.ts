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

export interface CommentData {
  id: number;
  wpId: number;
  contentId: number;
  authorName: string;
  authorEmail: string;
  authorUrl: string | null;
  content_text: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  contentTitle?: string;
}

// ============================================================================
// Cache Tags
// ============================================================================

const COMMENTS_LIST_TAG = 'comments-list';

// ============================================================================
// Schemas
// ============================================================================

const approveCommentSchema = z.object({
  id: z.number(),
});

const rejectCommentSchema = z.object({
  id: z.number(),
  reason: z.string().optional(),
});

const deleteCommentSchema = z.object({
  id: z.number(),
});

const bulkModerateSchema = z.object({
  ids: z.array(z.number()),
  action: z.enum(['approve', 'reject', 'spam', 'trash']),
});

const listCommentsSchema = z.object({
  status: z.enum(['pending', 'approved', 'spam', 'trash']).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

// ============================================================================
// Helper Functions
// ============================================================================

async function getCommentWithContent(id: number) {
  return prisma.comment.findUnique({
    where: { id },
    include: {
      content: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
}

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Lista comentários com filtros e paginação
 */
export async function listComments(
  input: z.infer<typeof listCommentsSchema>
): Promise<
  ActionResponse<{
    comments: CommentData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    pages: number;
  }>
> {
  try {
    const validated = listCommentsSchema.parse(input);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};
    if (validated.status) {
      where.status = validated.status;
    }
    if (validated.search) {
      where.OR = [
        { authorName: { contains: validated.search, mode: 'insensitive' } },
        { authorEmail: { contains: validated.search, mode: 'insensitive' } },
        { content_text: { contains: validated.search, mode: 'insensitive' } },
      ];
    }

    const total = await prisma.comment.count({ where });
    const totalPages = Math.ceil(total / validated.pageSize);

    const comments = await prisma.comment.findMany({
      where,
      include: {
        content: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (validated.page - 1) * validated.pageSize,
      take: validated.pageSize,
    });

    const commentsWithTitle = comments.map((c) => ({
      ...c,
      contentTitle: c.content.title,
    }));

    return createSuccessResponse({
      comments: commentsWithTitle,
      total,
      page: validated.page,
      pageSize: validated.pageSize,
      totalPages,
      pages: totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listComments] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao listar comentários');
  }
}

/**
 * Aprova um comentário
 */
export async function approveComment(
  input: z.infer<typeof approveCommentSchema>
): Promise<ActionResponse<{ comment: CommentData }>> {
  try {
    const validated = approveCommentSchema.parse(input);

    const comment = await getCommentWithContent(validated.id);
    if (!comment) {
      return createErrorResponse('Comentário não encontrado');
    }

    const updated = await prisma.comment.update({
      where: { id: validated.id },
      data: { status: 'approved' },
      include: {
        content: {
          select: { title: true },
        },
      },
    });

    revalidateTag(COMMENTS_LIST_TAG, 'max');

    return createSuccessResponse({
      comment: {
        ...updated,
        contentTitle: updated.content.title,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[approveComment] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao aprovar comentário');
  }
}

/**
 * Rejeita um comentário (move para spam)
 */
export async function rejectComment(
  input: z.infer<typeof rejectCommentSchema>
): Promise<ActionResponse<{ comment: CommentData }>> {
  try {
    const validated = rejectCommentSchema.parse(input);

    const comment = await getCommentWithContent(validated.id);
    if (!comment) {
      return createErrorResponse('Comentário não encontrado');
    }

    const updated = await prisma.comment.update({
      where: { id: validated.id },
      data: { status: 'spam' },
      include: {
        content: {
          select: { title: true },
        },
      },
    });

    revalidateTag(COMMENTS_LIST_TAG, 'max');

    return createSuccessResponse({
      comment: {
        ...updated,
        contentTitle: updated.content.title,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[rejectComment] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao rejeitar comentário');
  }
}

/**
 * Deleta um comentário
 */
export async function deleteComment(
  input: z.infer<typeof deleteCommentSchema>
): Promise<ActionResponse<{ deleted: boolean }>> {
  try {
    const validated = deleteCommentSchema.parse(input);

    const comment = await getCommentWithContent(validated.id);
    if (!comment) {
      return createErrorResponse('Comentário não encontrado');
    }

    await prisma.comment.delete({
      where: { id: validated.id },
    });

    revalidateTag(COMMENTS_LIST_TAG, 'max');

    return createSuccessResponse({ deleted: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteComment] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao deletar comentário');
  }
}

/**
 * Moderação em lote
 */
export async function bulkModerate(
  input: z.infer<typeof bulkModerateSchema>
): Promise<ActionResponse<{ updated: number }>> {
  try {
    const validated = bulkModerateSchema.parse(input);

    const result = await prisma.comment.updateMany({
      where: { id: { in: validated.ids } },
      data: { status: validated.action === 'reject' ? 'spam' : validated.action },
    });

    revalidateTag(COMMENTS_LIST_TAG, 'max');

    return createSuccessResponse({ updated: result.count });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[bulkModerate] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao moderar comentários em lote');
  }
}

/**
 * Obtém um comentário específico
 */
export async function getComment(
  id: number
): Promise<ActionResponse<{ comment: CommentData }>> {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        content: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!comment) {
      return createErrorResponse('Comentário não encontrado');
    }

    return createSuccessResponse({
      comment: {
        ...comment,
        contentTitle: comment.content.title,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getComment] Error:', error);
    return createErrorResponse('Erro ao buscar comentário');
  }
}

/**
 * Obtém estatísticas de comentários
 */
export async function getCommentStats(): Promise<
  ActionResponse<{
    total: number;
    pending: number;
    approved: number;
    spam: number;
    trash: number;
  }>
> {
  try {
    const [total, pending, approved, spam, trash] = await Promise.all([
      prisma.comment.count(),
      prisma.comment.count({ where: { status: 'pending' } }),
      prisma.comment.count({ where: { status: 'approved' } }),
      prisma.comment.count({ where: { status: 'spam' } }),
      prisma.comment.count({ where: { status: 'trash' } }),
    ]);

    return createSuccessResponse({
      total,
      pending,
      approved,
      spam,
      trash,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getCommentStats] Error:', error);
    return createErrorResponse('Erro ao buscar estatísticas de comentários');
  }
}
