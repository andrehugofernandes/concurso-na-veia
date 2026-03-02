'use server';

import { revalidateTag, unstable_cache } from 'next/cache';
import { headers } from 'next/headers';
import { z } from 'zod';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import { logAction, logError } from '@/lib/services/audit-logger';
import { LogAction, LogResource } from '@/lib/types/audit-log';
import { uploadToFirebaseStorage, deleteFromFirebaseStorage } from '@/lib/services/firebase-storage';

const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

function isFirebaseStorageUrl(url: string | null | undefined): boolean {
  if (!url) {
    return false;
  }

  if (FIREBASE_STORAGE_BUCKET && url.includes(FIREBASE_STORAGE_BUCKET)) {
    return true;
  }

  return url.includes('firebasestorage.googleapis.com') || url.includes('storage.googleapis.com');
}

// ============================================================================
// Types
// ============================================================================

export interface MediaAsset {
  id: number;
  wpId: number;
  originalFilename: string;
  firebaseUrl: string;
  mimeType: string;
  sizes: Record<string, string>;
  altText: string | null;
  width: number | null;
  height: number | null;
  fileSize: number;
  thumbnailUrl: string | null;
  duration: number | null;
  uploadedAt: Date;
  // Informações do conteúdo associado (imagem de destaque ou mídia embutida)
  relatedContent?: {
    id: number;
    title: string;
    slug: string;
    type: string;
    usage: 'featured' | 'embedded';
  } | null;
}

export interface MediaListResult {
  items: MediaAsset[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UploadMediaResult {
  media: MediaAsset;
}

// ============================================================================
// Schemas
// ============================================================================

const uploadMediaSchema = z.object({
  originalFilename: z.string().min(1, 'Nome do arquivo é obrigatório'),
  firebaseUrl: z.string().url('URL inválida'),
  mimeType: z.string().min(1, 'Tipo MIME é obrigatório'),
  sizes: z.record(z.string()).optional().default({}),
  altText: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  fileSize: z.number().min(0, 'Tamanho do arquivo inválido'),
});

const updateMediaMetaSchema = z.object({
  id: z.number(),
  altText: z.string().optional(),
  originalFilename: z.string().optional(),
});

const listMediaSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(500).default(50),
  search: z.string().optional(),
  mimeType: z.string().optional(),
  sortBy: z.enum(['uploadedAt', 'originalFilename', 'fileSize']).default('uploadedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================================================
// Cache Tags
// ============================================================================

const MEDIA_LIST_TAG = 'media-list';

type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
};

function getRequestMetaFromHeaders(allHeaders: Headers): RequestMeta {
  const rawIp = allHeaders.get('x-forwarded-for') || allHeaders.get('x-real-ip') || undefined;
  const ipAddress = rawIp ? rawIp.split(',')[0]?.trim() : undefined;
  const userAgent = allHeaders.get('user-agent') || undefined;

  return {
    ipAddress,
    userAgent,
  };
}

// ============================================================================
// Helper para mapear MediaAsset do Prisma para o tipo exportado
// ============================================================================

function mapMediaAsset(item: {
  id: number;
  wpId: number;
  originalFilename: string;
  firebaseUrl: string;
  mimeType: string;
  sizes: unknown;
  altText: string | null;
  width: number | null;
  height: number | null;
  fileSize: number;
  thumbnailUrl: string | null;
  duration: number | null;
  uploadedAt: Date;
}): MediaAsset {
  return {
    id: item.id,
    wpId: item.wpId,
    originalFilename: item.originalFilename,
    firebaseUrl: item.firebaseUrl,
    mimeType: item.mimeType,
    sizes: item.sizes as Record<string, string>,
    altText: item.altText,
    width: item.width,
    height: item.height,
    fileSize: item.fileSize,
    thumbnailUrl: item.thumbnailUrl,
    duration: item.duration,
    uploadedAt: item.uploadedAt,
  };
}

type PrismaMediaForUsage = {
  id: number;
  originalFilename: string;
  previousFilenames?: string[];
  firebaseUrl: string;
  thumbnailUrl: string | null;
  sizes: unknown;
};

async function resolveRelatedContentForMedia(
  media: PrismaMediaForUsage
): Promise<MediaAsset['relatedContent']> {
  let relatedContent: MediaAsset['relatedContent'] = null;

  // eslint-disable-next-line no-console
  console.log('[MediaUsage] resolveRelatedContentForMedia:start', {
    mediaId: media.id,
    originalFilename: media.originalFilename,
    firebaseUrl: media.firebaseUrl,
    thumbnailUrl: media.thumbnailUrl,
    sizesKeys:
      media.sizes && typeof media.sizes === 'object'
        ? Object.keys(media.sizes as Record<string, unknown>)
        : [],
  });

  const featuredContent = await prisma.content.findFirst({
    where: { featuredImageId: media.id },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
    },
  });

  if (featuredContent) {
    // eslint-disable-next-line no-console
    console.log('[MediaUsage] resolveRelatedContentForMedia:featured', {
      mediaId: media.id,
      contentId: featuredContent.id,
      slug: featuredContent.slug,
    });
    relatedContent = { ...featuredContent, usage: 'featured' };
    return relatedContent;
  }

  const containsFilters: Array<{ content: { contains: string; mode: 'insensitive' } }> = [];

  // ESTRATÉGIA: Priorizar busca por URLs (imutáveis) sobre nomes de arquivo (mutáveis)
  // O firebaseUrl nunca muda, mesmo quando o usuário renomeia o arquivo
  // Isso garante que a relação mídia-post seja mantida após renomeações

  // 1. Buscar pelo ID da mídia na URL do Firebase (mais confiável)
  // URLs do Firebase seguem o padrão: .../uploads/{mediaId}/filename
  const mediaIdPattern = `/uploads/${media.id}/`;
  containsFilters.push({
    content: { contains: mediaIdPattern, mode: 'insensitive' },
  });

  // 2. Buscar pela URL completa do Firebase (sem query params)
  if (media.firebaseUrl) {
    const sanitizedFirebaseUrl = media.firebaseUrl.split('?')[0];
    if (sanitizedFirebaseUrl) {
      containsFilters.push({
        content: { contains: sanitizedFirebaseUrl, mode: 'insensitive' },
      });
    }
  }

  // 3. Buscar pela URL da thumbnail
  if (media.thumbnailUrl) {
    const sanitizedThumbnailUrl = media.thumbnailUrl.split('?')[0];
    if (sanitizedThumbnailUrl) {
      containsFilters.push({
        content: { contains: sanitizedThumbnailUrl, mode: 'insensitive' },
      });
    }
  }

  // 4. Buscar pelas URLs de variantes de tamanho
  if (media.sizes && typeof media.sizes === 'object') {
    const sizeValues = Object.values(media.sizes as Record<string, unknown>);
    for (const value of sizeValues) {
      if (typeof value === 'string') {
        const sanitizedSizeUrl = value.split('?')[0];
        if (sanitizedSizeUrl) {
          containsFilters.push({
            content: { contains: sanitizedSizeUrl, mode: 'insensitive' },
          });
        }
      }
    }
  }

  // 5. Buscar por nomes de arquivo (atual e anteriores) como fallback
  // Útil para conteúdo migrado do WordPress que pode ter referências por nome
  const allFilenames = [media.originalFilename];
  if (media.previousFilenames && media.previousFilenames.length > 0) {
    allFilenames.push(...media.previousFilenames);
  }

  for (const filename of allFilenames) {
    if (filename) {
      containsFilters.push({
        content: { contains: filename, mode: 'insensitive' },
      });
    }
  }

  // eslint-disable-next-line no-console
  console.log('[MediaUsage] resolveRelatedContentForMedia:filters', {
    mediaId: media.id,
    mediaIdPattern,
    firebaseUrl: media.firebaseUrl?.split('?')[0],
    allFilenames,
    totalFilters: containsFilters.length,
  });

  if (containsFilters.length === 0) {
    return null;
  }

  const embeddedContent = await prisma.content.findFirst({
    where: {
      OR: containsFilters,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
    },
  });

  if (!embeddedContent) {
    // eslint-disable-next-line no-console
    console.log('[MediaUsage] resolveRelatedContentForMedia:not-found', {
      mediaId: media.id,
      originalFilename: media.originalFilename,
      firebaseUrl: media.firebaseUrl,
      filtersUsed: containsFilters.map(f => f.content.contains),
    });
    return null;
  }

  relatedContent = { ...embeddedContent, usage: 'embedded' };
  // eslint-disable-next-line no-console
  console.log('[MediaUsage] resolveRelatedContentForMedia:embedded', {
    mediaId: media.id,
    contentId: embeddedContent.id,
    slug: embeddedContent.slug,
  });
  return relatedContent;
}

// ============================================================================
// Actions
// ============================================================================

/**
 * Lista mídias com paginação, busca e filtros
 */
const listMediaCached = unstable_cache(
  async (validated: z.infer<typeof listMediaSchema>) => {
    const where: Record<string, unknown> = {};

    if (validated.search) {
      where.OR = [
        { originalFilename: { contains: validated.search, mode: 'insensitive' } },
        { altText: { contains: validated.search, mode: 'insensitive' } },
      ];
    }

    if (validated.mimeType) {
      if (validated.mimeType === 'image') {
        where.mimeType = { startsWith: 'image/' };
      } else if (validated.mimeType === 'video') {
        where.mimeType = { startsWith: 'video/' };
      } else if (validated.mimeType === 'audio') {
        where.mimeType = { startsWith: 'audio/' };
      } else if (validated.mimeType === 'application') {
        where.OR = [
          { mimeType: { startsWith: 'application/' } },
          { mimeType: { startsWith: 'text/' } },
        ];
      }
    }

    const [total, items] = await Promise.all([
      prisma.mediaAsset.count({ where }),
      prisma.mediaAsset.findMany({
        where,
        orderBy:
          validated.sortBy === 'originalFilename'
            ? { originalFilename: validated.sortOrder }
            : validated.sortBy === 'fileSize'
            ? { fileSize: validated.sortOrder }
            : { uploadedAt: validated.sortOrder },
        skip: (validated.page - 1) * validated.pageSize,
        take: validated.pageSize,
      }),
    ]);

    const mappedItems: MediaAsset[] = items.map(mapMediaAsset);

    return {
      items: mappedItems,
      total,
      page: validated.page,
      pageSize: validated.pageSize,
      totalPages: Math.ceil(total / validated.pageSize),
    };
  },
  ['media-list-cache'],
  {
    tags: [MEDIA_LIST_TAG],
  }
);

export async function listMedia(
  params: z.infer<typeof listMediaSchema>
): Promise<ActionResponse<MediaListResult>> {
  try {
    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());
    if (!currentUser) {
      await logAction(
        LogResource.MEDIA,
        LogAction.UNAUTHORIZED_ACCESS,
        undefined,
        {
          operation: 'listMedia',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Não autenticado');
    }

    const validated = listMediaSchema.parse(params);
    const cached = await listMediaCached(validated);

    await logAction(
      LogResource.MEDIA,
      LogAction.READ,
      currentUser.id,
      {
        operation: 'listMedia',
        page: validated.page,
        pageSize: validated.pageSize,
        search: validated.search || null,
        mimeType: validated.mimeType || null,
        sortBy: validated.sortBy,
        sortOrder: validated.sortOrder,
        returned: cached.items.length,
        total: cached.total,
      },
      meta.ipAddress,
      meta.userAgent,
    );

    return createSuccessResponse<MediaListResult>(cached as MediaListResult);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listMedia] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());

      if (error instanceof z.ZodError) {
        await logAction(
          LogResource.MEDIA,
          LogAction.INVALID_INPUT,
          currentUser?.id,
          {
            operation: 'listMedia',
            message: error.errors[0]?.message,
          },
          meta.ipAddress,
          meta.userAgent,
        );
      } else {
        await logError(
          LogResource.MEDIA,
          LogAction.EXCEPTION,
          error instanceof Error ? error : String(error),
          currentUser?.id,
          {
            operation: 'listMedia',
          },
          meta.ipAddress,
          meta.userAgent,
        );
      }
    } catch {
    }

    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao listar mídias');
  }
}

/**
 * Faz upload de uma nova mídia
 */
export async function uploadMedia(
  data: z.infer<typeof uploadMediaSchema>
): Promise<ActionResponse<UploadMediaResult>> {
  try {
    const currentUser = await getCurrentUser();
    const meta = getRequestMetaFromHeaders(await headers());
    if (!currentUser) {
      await logAction(
        LogResource.MEDIA,
        LogAction.UNAUTHORIZED_ACCESS,
        undefined,
        {
          operation: 'uploadMedia',
        },
        meta.ipAddress,
        meta.userAgent,
      );
      return createErrorResponse('Não autenticado');
    }

    const validated = uploadMediaSchema.parse(data);

    // Gerar ID único (simula wpId para novas mídias)
    const lastMedia = await prisma.mediaAsset.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });
    const newId = (lastMedia?.id ?? 0) + 1;

    const media = await prisma.mediaAsset.create({
      data: {
        id: newId,
        wpId: newId,
        originalFilename: validated.originalFilename,
        firebaseUrl: validated.firebaseUrl,
        mimeType: validated.mimeType,
        sizes: validated.sizes,
        altText: validated.altText ?? null,
        width: validated.width ?? null,
        height: validated.height ?? null,
        fileSize: validated.fileSize,
      },
    });

    revalidateTag(MEDIA_LIST_TAG, 'max');

    await logAction(
      LogResource.MEDIA,
      LogAction.UPLOAD,
      currentUser.id,
      {
        operation: 'uploadMedia',
        mediaId: media.id,
        wpId: media.wpId,
        originalFilename: media.originalFilename,
        mimeType: media.mimeType,
        fileSize: media.fileSize,
      },
      meta.ipAddress,
      meta.userAgent,
    );

    return createSuccessResponse<UploadMediaResult>({
      media: mapMediaAsset(media),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[uploadMedia] Error:', error);

    try {
      const currentUser = await getCurrentUser();
      const meta = getRequestMetaFromHeaders(await headers());

      if (error instanceof z.ZodError) {
        await logAction(
          LogResource.MEDIA,
          LogAction.INVALID_INPUT,
          currentUser?.id,
          {
            operation: 'uploadMedia',
            message: error.errors[0]?.message,
          },
          meta.ipAddress,
          meta.userAgent,
        );
      } else {
        await logError(
          LogResource.MEDIA,
          LogAction.UPLOAD_FAILED,
          error instanceof Error ? error : String(error),
          currentUser?.id,
          {
            operation: 'uploadMedia',
          },
          meta.ipAddress,
          meta.userAgent,
        );
      }
    } catch {
    }

    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao fazer upload da mídia');
  }
}

/**
 * Atualiza metadados de uma mídia e sincroniza referências nos posts
 */
export async function updateMediaMeta(
  data: z.infer<typeof updateMediaMetaSchema>
): Promise<ActionResponse<{ media: MediaAsset; updatedPosts: number }>> {
  try {
    const validated = updateMediaMetaSchema.parse(data);

    const existing = await prisma.mediaAsset.findUnique({
      where: { id: validated.id },
    });

    if (!existing) {
      return createErrorResponse('Mídia não encontrada');
    }

    const updateData: Record<string, unknown> = {};
    let updatedPosts = 0;

    // Atualizar altText
    if (validated.altText !== undefined) {
      updateData.altText = validated.altText;

      // Atualizar alt text nas referências de imagem nos posts
      // Busca posts que contêm a URL da mídia no conteúdo
      if (existing.firebaseUrl) {
        const sanitizedUrl = existing.firebaseUrl.split('?')[0];
        const postsWithMedia = await prisma.content.findMany({
          where: {
            content: { contains: sanitizedUrl, mode: 'insensitive' },
          },
          select: { id: true, content: true },
        });

        for (const post of postsWithMedia) {
          if (!post.content) continue;

          // Atualizar alt text em tags <img> que contêm a URL da mídia
          const imgRegex = new RegExp(
            `(<img[^>]*src=["'][^"']*${sanitizedUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^"']*["'][^>]*?)alt=["'][^"']*["']`,
            'gi'
          );
          const newContent = post.content.replace(imgRegex, `$1alt="${validated.altText}"`);

          if (newContent !== post.content) {
            await prisma.content.update({
              where: { id: post.id },
              data: { content: newContent },
            });
            updatedPosts++;
          }
        }
      }
    }

    // Atualizar originalFilename
    if (validated.originalFilename !== undefined && validated.originalFilename !== existing.originalFilename) {
      updateData.originalFilename = validated.originalFilename;

      // Rastrear nome antigo no histórico para permitir busca após renomeação
      const previousFilenames = existing.previousFilenames || [];
      if (!previousFilenames.includes(existing.originalFilename)) {
        previousFilenames.push(existing.originalFilename);
        updateData.previousFilenames = previousFilenames;
      }

      // eslint-disable-next-line no-console
      console.log('[updateMediaMeta] Starting filename update', {
        mediaId: validated.id,
        oldFilename: existing.originalFilename,
        newFilename: validated.originalFilename,
        previousFilenames: previousFilenames,
        oldFirebaseUrl: existing.firebaseUrl,
      });

      // Atualizar referências do nome do arquivo no conteúdo dos posts
      // Busca posts que contêm o nome antigo do arquivo
      const postsWithOldFilename = await prisma.content.findMany({
        where: {
          content: { contains: existing.originalFilename, mode: 'insensitive' },
        },
        select: { id: true, content: true, title: true, slug: true },
      });

      // eslint-disable-next-line no-console
      console.log('[updateMediaMeta] Found posts with old filename', {
        mediaId: validated.id,
        postsCount: postsWithOldFilename.length,
        posts: postsWithOldFilename.map(p => ({ id: p.id, title: p.title, slug: p.slug })),
      });

      for (const post of postsWithOldFilename) {
        if (!post.content) continue;

        // Substituir o nome antigo pelo novo em URLs e atributos
        // Isso cobre casos como: src="...old-filename.jpg" e alt="old-filename"
        const oldFilenameRegex = new RegExp(
          existing.originalFilename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'gi'
        );
        const newContent = post.content.replace(oldFilenameRegex, validated.originalFilename);

        // eslint-disable-next-line no-console
        console.log('[updateMediaMeta] Content replacement check', {
          mediaId: validated.id,
          postId: post.id,
          oldFilename: existing.originalFilename,
          newFilename: validated.originalFilename,
          contentChanged: newContent !== post.content,
          oldContentLength: post.content.length,
          newContentLength: newContent.length,
        });

        if (newContent !== post.content) {
          await prisma.content.update({
            where: { id: post.id },
            data: { content: newContent },
          });
          updatedPosts++;
          // eslint-disable-next-line no-console
          console.log('[updateMediaMeta] Updated filename reference in post', {
            mediaId: validated.id,
            postId: post.id,
            oldFilename: existing.originalFilename,
            newFilename: validated.originalFilename,
            updatedPosts,
          });
        }
      }

      // Nota: O firebaseUrl não pode ser alterado porque é uma URL do Firebase Storage
      // que não contém o nome do arquivo de forma modificável. Em vez disso,
      // a busca em resolveRelatedContentForMedia deve considerar AMBOS os nomes
      // (antigo e novo) para encontrar a mídia após renomeação.

      // eslint-disable-next-line no-console
      console.log('[updateMediaMeta] Filename update completed', {
        mediaId: validated.id,
        totalUpdatedPosts: updatedPosts,
      });
    }

    const media = await prisma.mediaAsset.update({
      where: { id: validated.id },
      data: updateData,
    });

    revalidateTag(MEDIA_LIST_TAG, 'max');

    return createSuccessResponse<{ media: MediaAsset; updatedPosts: number }>({
      media: mapMediaAsset(media),
      updatedPosts,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateMediaMeta] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar metadados da mídia');
  }
}

/**
 * Deleta uma mídia
 */
export async function deleteMedia(
  id: number
): Promise<ActionResponse<{ deleted: boolean }>> {
  try {
    const existing = await prisma.mediaAsset.findUnique({
      where: { id },
      include: { contents: { select: { id: true }, take: 1 } },
    });

    if (!existing) {
      return createErrorResponse('Mídia não encontrada');
    }

    if (existing.contents.length > 0) {
      return createErrorResponse('Mídia está sendo usada por conteúdos e não pode ser deletada');
    }

    if (isFirebaseStorageUrl(existing.firebaseUrl)) {
      const deleteResult = await deleteFromFirebaseStorage(existing.firebaseUrl);
      if (!deleteResult.success) {
        // eslint-disable-next-line no-console
        console.warn(
          '[deleteMedia] Failed to delete from Firebase:',
          existing.id,
          existing.firebaseUrl,
          deleteResult.error
        );
      }
    }

    await prisma.mediaAsset.delete({
      where: { id },
    });

    revalidateTag(MEDIA_LIST_TAG, 'max');

    return createSuccessResponse<{ deleted: boolean }>({ deleted: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteMedia] Error:', error);
    return createErrorResponse('Erro ao deletar mídia');
  }
}

/**
 * Obtém uma mídia por ID
 */
export async function getMedia(
  id: number
): Promise<ActionResponse<{ media: MediaAsset }>> {
  try {
    const media = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!media) {
      return createErrorResponse('Mídia não encontrada');
    }

    return createSuccessResponse<{ media: MediaAsset }>({
      media: mapMediaAsset(media),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getMedia] Error:', error);
    return createErrorResponse('Erro ao buscar mídia');
  }
}

/**
 * Obtém detalhes completos de uma mídia, incluindo conteúdo associado
 */
export async function getMediaDetails(
  id: number
): Promise<ActionResponse<{ media: MediaAsset }>> {
  try {
    const media = await prisma.mediaAsset.findUnique({
      where: { id },
    });

    if (!media) {
      return createErrorResponse('Mídia não encontrada');
    }

    const mediaAsset = mapMediaAsset(media);
    mediaAsset.relatedContent = await resolveRelatedContentForMedia({
      id: media.id,
      originalFilename: media.originalFilename,
      firebaseUrl: media.firebaseUrl,
      thumbnailUrl: media.thumbnailUrl,
      sizes: media.sizes,
    });

    return createSuccessResponse<{ media: MediaAsset }>({
      media: mediaAsset,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getMediaDetails] Error:', error);
    return createErrorResponse('Erro ao buscar detalhes da mídia');
  }
}

/**
 * Faz upload de arquivo para Firebase Storage e salva no banco
 */
export async function uploadFileToStorage(
  formData: FormData
): Promise<ActionResponse<UploadMediaResult>> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return createErrorResponse('Nenhum arquivo enviado');
    }

    if (file.size > 100 * 1024 * 1024) {
      return createErrorResponse('Arquivo muito grande. Máximo 100MB.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadToFirebaseStorage(buffer, file.name, file.type);

    if (!uploadResult.success || !uploadResult.url) {
      return createErrorResponse(uploadResult.error || 'Erro no upload para Firebase');
    }

    const lastMedia = await prisma.mediaAsset.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });
    const newId = (lastMedia?.id ?? 0) + 1;

    const media = await prisma.mediaAsset.create({
      data: {
        id: newId,
        wpId: newId,
        originalFilename: file.name,
        firebaseUrl: uploadResult.url,
        mimeType: file.type,
        sizes: {},
        altText: null,
        width: null,
        height: null,
        fileSize: file.size,
      },
    });

    revalidateTag(MEDIA_LIST_TAG, 'max');

    // eslint-disable-next-line no-console
    console.log('[uploadFileToStorage] Upload successful:', uploadResult.url);

    return createSuccessResponse<UploadMediaResult>({
      media: mapMediaAsset(media),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[uploadFileToStorage] Error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Erro ao fazer upload'
    );
  }
}

/**
 * Salva metadata de mídia após upload client-side
 */
export async function saveMediaMetadata(data: {
  originalFilename: string;
  firebaseUrl: string;
  mimeType: string;
  fileSize: number;
  thumbnailUrl?: string;
  duration?: number;
  altText?: string;
  width?: number;
  height?: number;
}): Promise<ActionResponse<UploadMediaResult>> {
  try {
    const lastMedia = await prisma.mediaAsset.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });
    const newId = (lastMedia?.id ?? 0) + 1;

    const media = await prisma.mediaAsset.create({
      data: {
        id: newId,
        wpId: newId,
        originalFilename: data.originalFilename,
        firebaseUrl: data.firebaseUrl,
        mimeType: data.mimeType,
        sizes: {},
        altText: data.altText ?? null,
        width: data.width ?? null,
        height: data.height ?? null,
        fileSize: data.fileSize,
        thumbnailUrl: data.thumbnailUrl ?? null,
        duration: data.duration ?? null,
      },
    });

    revalidateTag(MEDIA_LIST_TAG, 'max');

    // eslint-disable-next-line no-console
    console.log('[saveMediaMetadata] Media saved:', media.id, data.firebaseUrl);

    return createSuccessResponse<UploadMediaResult>({
      media: mapMediaAsset(media),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[saveMediaMetadata] Error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Erro ao salvar metadata'
    );
  }
}

/**
 * Obtém estatísticas de mídia
 */
export async function getMediaStats(): Promise<
  ActionResponse<{
    total: number;
    totalSize: number;
    byType: Record<string, number>;
  }>
> {
  try {
    const cachedStats = await unstable_cache(
      async () => {
        const [total, images, videos, audio, documents, totalSizeResult] = await Promise.all([
          prisma.mediaAsset.count(),
          prisma.mediaAsset.count({ where: { mimeType: { startsWith: 'image/' } } }),
          prisma.mediaAsset.count({ where: { mimeType: { startsWith: 'video/' } } }),
          prisma.mediaAsset.count({ where: { mimeType: { startsWith: 'audio/' } } }),
          prisma.mediaAsset.count({
            where: {
              OR: [
                { mimeType: { startsWith: 'application/' } },
                { mimeType: { startsWith: 'text/' } },
              ],
            },
          }),
          prisma.mediaAsset.aggregate({ _sum: { fileSize: true } }),
        ]);

        return {
          total,
          totalSize: totalSizeResult._sum.fileSize ?? 0,
          byType: {
            image: images,
            video: videos,
            audio: audio,
            application: documents,
          },
        };
      },
      ['media-stats-cache'],
      {
        tags: [MEDIA_LIST_TAG],
      }
    )();

    return createSuccessResponse(cachedStats);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getMediaStats] Error:', error);
    return createErrorResponse('Erro ao buscar estatísticas de mídia');
  }
}

/**
 * Deleta múltiplas mídias de uma vez (deleção em massa)
 */
export async function deleteMediaBulk(
  ids: number[]
): Promise<ActionResponse<{ deleted: number; failed: number; errors: string[] }>> {
  const startTime = Date.now();
  // eslint-disable-next-line no-console
  console.log(`[deleteMediaBulk] Iniciando deleção de ${ids.length} mídias...`);

  try {
    if (ids.length === 0) {
      return createErrorResponse('Nenhuma mídia selecionada');
    }

    if (ids.length > 500) {
      return createErrorResponse('Máximo de 500 mídias por vez');
    }

    const medias = await prisma.mediaAsset.findMany({
      where: { id: { in: ids } },
      include: { contents: { select: { id: true }, take: 1 } },
    });
    // eslint-disable-next-line no-console
    console.log(`[deleteMediaBulk] Encontradas ${medias.length} mídias no banco`);

    let deleted = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const media of medias) {
      try {
        // Verificar se está em uso
        if (media.contents.length > 0) {
          failed++;
          errors.push(`${media.originalFilename}: em uso por conteúdo`);
          // eslint-disable-next-line no-console
          console.log(`[deleteMediaBulk] ⚠️ Mídia ${media.id} em uso, pulando...`);
          continue;
        }

        // Deletar do Firebase Storage (se for URL do bucket Firebase)
        if (isFirebaseStorageUrl(media.firebaseUrl)) {
          const deleteResult = await deleteFromFirebaseStorage(media.firebaseUrl);
          if (!deleteResult.success) {
            // eslint-disable-next-line no-console
            console.warn(`[deleteMediaBulk] Firebase delete failed for ${media.id}:`, media.firebaseUrl, deleteResult.error);
          }
        }

        // Deletar do banco
        await prisma.mediaAsset.delete({
          where: { id: media.id },
        });

        deleted++;
        
        // Log a cada 50 deletados
        if (deleted % 50 === 0) {
          // eslint-disable-next-line no-console
          console.log(`[deleteMediaBulk] Progresso: ${deleted}/${medias.length} deletados...`);
        }
      } catch (err) {
        failed++;
        errors.push(`${media.originalFilename}: ${err instanceof Error ? err.message : 'erro desconhecido'}`);
        // eslint-disable-next-line no-console
        console.error(`[deleteMediaBulk] ❌ Erro ao deletar ${media.id}:`, err);
      }
    }

    const elapsed = Date.now() - startTime;
    // eslint-disable-next-line no-console
    console.log(`[deleteMediaBulk] ✅ Concluído em ${elapsed}ms`);

    revalidateTag(MEDIA_LIST_TAG, 'max');

    return createSuccessResponse({ deleted, failed, errors: errors.slice(0, 10) });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteMediaBulk] ❌ Erro fatal:', error);
    return createErrorResponse('Erro ao deletar mídias em massa');
  }
}

/**
 * Deleta TODAS as mídias (limpar biblioteca)
 * CUIDADO: Esta ação é irreversível!
 */
export async function deleteAllMedia(): Promise<ActionResponse<{ deleted: number }>> {
  const startTime = Date.now();
  // eslint-disable-next-line no-console
  console.log('[deleteAllMedia] Iniciando deleção de TODAS as mídias...');
  
  try {
    // Buscar todas as mídias que não estão em uso
    const medias = await prisma.mediaAsset.findMany({
      where: {
        contents: { none: {} },
      },
      select: { id: true, firebaseUrl: true, originalFilename: true },
    });

    // eslint-disable-next-line no-console
    console.log(`[deleteAllMedia] Encontradas ${medias.length} mídias para deletar`);

    // Deletar do Firebase em lotes
    for (let i = 0; i < medias.length; i++) {
      const media = medias[i];
      try {
        if (isFirebaseStorageUrl(media.firebaseUrl)) {
          await deleteFromFirebaseStorage(media.firebaseUrl);
        }
      } catch {
        // Ignora falhas individuais no Firebase, segue com deleção no banco
      }
      
      // Log a cada 100
      if ((i + 1) % 100 === 0) {
        // eslint-disable-next-line no-console
        console.log(`[deleteAllMedia] Firebase: ${i + 1}/${medias.length} processados...`);
      }
    }

    // Deletar todos do banco de uma vez
    const result = await prisma.mediaAsset.deleteMany({
      where: {
        contents: { none: {} },
      },
    });

    const elapsed = Date.now() - startTime;
    // eslint-disable-next-line no-console
    console.log(`[deleteAllMedia] ✅ Concluído em ${elapsed}ms`);

    revalidateTag(MEDIA_LIST_TAG, 'max');

    return createSuccessResponse({ deleted: result.count });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteAllMedia] ❌ Erro fatal:', error);
    return createErrorResponse('Erro ao deletar todas as mídias');
  }
}

/**
 * Seleciona todas as mídias (retorna IDs para seleção em massa)
 */
export async function selectAllMediaIds(
  filter?: { mimeType?: string; search?: string }
): Promise<ActionResponse<{ ids: number[]; total: number }>> {
  try {
    const where: Record<string, unknown> = {};

    if (filter?.mimeType) {
      where.mimeType = { startsWith: filter.mimeType };
    }

    if (filter?.search) {
      where.originalFilename = { contains: filter.search, mode: 'insensitive' };
    }

    const medias = await prisma.mediaAsset.findMany({
      where,
      select: { id: true },
    });

    return createSuccessResponse({
      ids: medias.map(m => m.id),
      total: medias.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[selectAllMediaIds] Error:', error);
    return createErrorResponse('Erro ao selecionar mídias');
  }
}

/**
 * Upload de imagem para posts (FormData)
 */
export async function uploadImageAction(
  formData: FormData
): Promise<{ success: boolean; mediaId?: number; url?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'Nenhum arquivo fornecido' };
    }

    // Validar tipo de arquivo
    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return { success: false, error: 'Tipo de arquivo inválido' };
    }

    // Validar tamanho (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return { success: false, error: 'Arquivo muito grande (máximo 10MB)' };
    }

    // Converter File para Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload para Firebase
    const uploadResult = await uploadToFirebaseStorage(buffer, file.name, file.type);

    if (!uploadResult.success || !uploadResult.url) {
      return { success: false, error: uploadResult.error || 'Erro ao fazer upload' };
    }

    // Gerar ID único para a mídia
    const lastMedia = await prisma.mediaAsset.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });
    const newId = (lastMedia?.id ?? 0) + 1;

    // Salvar metadados no banco
    const media = await prisma.mediaAsset.create({
      data: {
        id: newId,
        wpId: newId,
        originalFilename: file.name,
        firebaseUrl: uploadResult.url,
        mimeType: file.type,
        fileSize: file.size,
        sizes: {},
      },
    });

    return {
      success: true,
      mediaId: media.id,
      url: uploadResult.url,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[uploadImageAction] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao fazer upload',
    };
  }
}
