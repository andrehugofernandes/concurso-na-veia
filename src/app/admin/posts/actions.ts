'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils/slug-generator';
import {
  createErrorResponse,
  createSuccessResponse,
  type ActionResponse,
} from '@/lib/actions/safe-action';
import { cacheTags, invalidateTag } from '@/lib/cache/cache-config';
import { logAction } from '@/lib/services/audit-logger';
import { LogResource, LogAction } from '@/lib/types/audit-log';

// ============================================================================
// Types
// ============================================================================

export interface PostListData {
  id: number;
  wpId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: string;
  type: string;
  authorId: string | null;
  author: string | null;
  authorName: string | null;
  categoryId: number | null;
  categoryName: string | null;
  tags?: string;
  featuredImageId: number | null;
  featuredImageUrl: string | null;
  galleryId?: string | null;
  galleryTitle?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostListResult {
  posts: PostListData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// List Posts Action
// ============================================================================

const listPostsSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'published', 'draft', 'archived', 'pending', 'private']).optional(),
  page: z.number().default(1),
  pageSize: z.number().default(10),
});

export async function listPosts(
  params: z.infer<typeof listPostsSchema> = { page: 1, pageSize: 10 }
): Promise<ActionResponse<PostListResult>> {
  try {
    const validated = listPostsSchema.parse(params);
    const { search, status, page, pageSize } = validated;

    // Build where clause
    const where: Record<string, unknown> = {
      type: 'post', // Apenas posts, não pages
    };

    if (status && status !== 'all') {
      if (status === 'published') {
        where.status = { in: ['published', 'publish'] };
      } else {
        where.status = status;
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      db.content.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          author: {
            select: { username: true, email: true, fullName: true },
          },
          taxonomies: {
            include: {
              taxonomy: {
                select: { id: true, name: true, type: true },
              },
            },
          },
          featuredImage: {
            select: { firebaseUrl: true, thumbnailUrl: true, sizes: true },
          },
          gallery: {
            select: { id: true, title: true },
          },
        },
      }),
      db.content.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return createSuccessResponse<PostListResult>({
      posts: posts.map((post) => {
        // Buscar a primeira categoria associada ao post
        const category = post.taxonomies.find((t) => {
          const type = (t.taxonomy.type || '').toLowerCase();
          return type === 'category' || type === 'categories';
        });

        const sizes = post.featuredImage?.sizes as unknown as Record<string, string> | null | undefined;
        const featuredFromRelation =
          post.featuredImage?.firebaseUrl ||
          post.featuredImage?.thumbnailUrl ||
          sizes?.large ||
          sizes?.medium ||
          sizes?.thumbnail ||
          null;

        const featuredImageUrl = featuredFromRelation;

        // Buscar tags associadas ao post
        const tags = post.taxonomies
          .filter((t) => {
            const type = (t.taxonomy.type || '').toLowerCase();
            return type.includes('tag');
          })
          .map((t) => t.taxonomy.name)
          .join(', ');

        return {
          id: post.id,
          wpId: post.wpId,
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          status: post.status === 'publish' ? 'published' : post.status,
          type: post.type,
          authorId: post.authorId ?? null,
          author: post.author?.fullName || post.author?.username || post.author?.email || null,
          authorName: post.author?.fullName || post.author?.username || post.author?.email || null,
          categoryId: category?.taxonomy.id || null,
          categoryName: category?.taxonomy.name || null,
          tags: tags || undefined,
          featuredImageId: post.featuredImageId || null,
          featuredImageUrl,
          galleryId: post.galleryId || null,
          galleryTitle: post.gallery?.title || null,
          createdAt: post.createdAt.toISOString(),
          updatedAt: post.updatedAt.toISOString(),
        };
      }),
      total,
      page,
      pageSize,
      totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listPosts] Error:', error);
    return createErrorResponse('Erro ao listar posts');
  }
}

/**
 * Obtém um post pelo ID com todas as suas relações (autor, categorias, tags, imagem destacada)
 */
export async function getPost(id: string): Promise<ActionResponse<PostListData>> {
  try {
    const numericId = parseInt(id, 10);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return createErrorResponse('ID de post inválido');
    }

    const post = await db.content.findUnique({
      where: { id: numericId, type: 'post' } as { id: number; type: string },
      include: {
        author: {
          select: { username: true, email: true, fullName: true },
        },
        taxonomies: {
          include: {
            taxonomy: {
              select: { id: true, name: true, type: true },
            },
          },
        },
        featuredImage: {
          select: { firebaseUrl: true, thumbnailUrl: true, sizes: true },
        },
        gallery: {
          select: { id: true, title: true },
        },
      },
    });

    if (!post) {
      return createErrorResponse('Post não encontrado');
    }

    // Buscar a primeira categoria associada ao post
    const category = post.taxonomies.find((t) => {
      const type = (t.taxonomy.type || '').toLowerCase();
      return type === 'category' || type === 'categories';
    });

    const sizes = post.featuredImage?.sizes as unknown as Record<string, string> | null | undefined;
    const featuredImageUrl =
      post.featuredImage?.firebaseUrl ||
      post.featuredImage?.thumbnailUrl ||
      sizes?.large ||
      sizes?.medium ||
      sizes?.thumbnail ||
      null;

    // Buscar tags associadas ao post
    const tags = post.taxonomies
      .filter((t) => {
        const type = (t.taxonomy.type || '').toLowerCase();
        return type.includes('tag');
      })
      .map((t) => t.taxonomy.name)
      .join(', ');

    return createSuccessResponse<PostListData>({
      id: post.id,
      wpId: post.wpId,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status === 'publish' ? 'published' : post.status,
      type: post.type,
      authorId: post.authorId ?? null,
      author: post.author?.fullName || post.author?.username || post.author?.email || null,
      authorName: post.author?.fullName || post.author?.username || post.author?.email || null,
      categoryId: category?.taxonomy.id || null,
      categoryName: category?.taxonomy.name || null,
      tags: tags || undefined,
      featuredImageId: post.featuredImageId || null,
      featuredImageUrl,
      galleryId: post.galleryId || null,
      galleryTitle: post.gallery?.title || null,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getPost] Error:', error);
    return createErrorResponse('Erro ao buscar post');
  }
}

const selectAllPostIdsSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['all', 'published', 'draft', 'archived', 'pending', 'private']).optional(),
});

export async function selectAllPostIds(
  params: z.infer<typeof selectAllPostIdsSchema> = {}
): Promise<ActionResponse<{ ids: string[]; total: number }>> {
  try {
    const validated = selectAllPostIdsSchema.parse(params);
    const { search, status } = validated;

    const where: Record<string, unknown> = {
      type: 'post',
    };

    if (status && status !== 'all') {
      if (status === 'published') {
        where.status = { in: ['published', 'publish'] };
      } else {
        where.status = status;
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }

    const posts = await db.content.findMany({
      where,
      select: { id: true },
    });

    return createSuccessResponse({
      ids: posts.map((p) => String(p.id)),
      total: posts.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[selectAllPostIds] Error:', error);
    return createErrorResponse('Erro ao selecionar posts');
  }
}

// Schema de validação para criação/edição de posts
const postSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').max(255),
  slug: z.string().min(1, 'Slug é obrigatório'),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  status: z.enum(['draft', 'published', 'archived']),
  featuredImage: z.instanceof(File).optional(),
  featuredImagePreview: z.string().optional(),
  featuredMediaId: z.number().optional(),
  authorId: z.string().optional(),
  tags: z.string().optional(),
  galleryId: z.string().optional(),
});

type PostData = z.infer<typeof postSchema>;

interface PostActionSuccessData {
  id?: string;
  slug?: string;
  title?: string;
}

export interface PostActionError {
  message: string;
  fieldErrors?: Record<string, string | string[]>;
}

export type PostActionResponse = ActionResponse<PostActionSuccessData, PostActionError>;

/**
 * Gera um excerpt (resumo) a partir do conteúdo
 * Remove tags HTML, limita a 160 caracteres e adiciona reticências
 * Será usado quando implementar a criação/atualização via Prisma
 */
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remover tags HTML
  const plainText = content.replace(/<[^>]*>/g, '');

  // Remover múltiplos espaços em branco
  const cleaned = plainText.replace(/\s+/g, ' ').trim();

  // Limitar ao comprimento máximo
  if (cleaned.length > maxLength) {
    return cleaned.substring(0, maxLength).trim() + '...';
  }

  return cleaned;
}

/**
 * Valida dados do post
 */
function validatePostData(data: unknown): PostData {
  const validated = postSchema.parse(data);

  // Validar slug
  if (!validated.slug || validated.slug.trim() === '') {
    throw new Error('Slug é obrigatório');
  }

  // Auto-gerar slug se necessário
  if (!validated.slug || validated.slug === 'slug-do-post') {
    validated.slug = generateSlug(validated.title);
  }

  return validated;
}

async function ensureTagTaxonomy(tagName: string): Promise<number | null> {
  const cleanName = tagName.trim();
  if (!cleanName) return null;

  const existing = await db.taxonomy.findFirst({
    where: {
      name: cleanName,
      type: { contains: 'tag', mode: 'insensitive' },
    },
    select: { id: true },
  });

  if (existing?.id) {
    return existing.id;
  }

  const [lastIdRow, lastWpIdRow] = await Promise.all([
    db.taxonomy.findFirst({ orderBy: { id: 'desc' }, select: { id: true } }),
    db.taxonomy.findFirst({ orderBy: { wpId: 'desc' }, select: { wpId: true } }),
  ]);

  const nextId = (lastIdRow?.id ?? 0) + 1;
  const nextWpId = (lastWpIdRow?.wpId ?? 0) + 1;
  const baseSlug = generateSlug(cleanName);

  const existingSlug = await db.taxonomy.findFirst({
    where: {
      type: 'tag',
      slug: baseSlug,
    },
    select: { id: true },
  });

  const slug = existingSlug ? `${baseSlug}-${nextWpId}` : baseSlug;

  const created = await db.taxonomy.create({
    data: {
      id: nextId,
      wpId: nextWpId,
      type: 'tag',
      name: cleanName,
      slug,
      parentId: null,
      description: null,
      color: null,
      sortOrder: 0,
    },
    select: { id: true },
  });

  return created.id;
}

export async function deletePost(id: string): Promise<PostActionResponse> {
  try {
    const numericId = Number(id);

    if (!Number.isInteger(numericId) || numericId <= 0) {
      return createErrorResponse<PostActionError, PostActionSuccessData>({
        message: 'ID de post inválido',
      });
    }

    await db.content.delete({
      where: {
        id: numericId,
        // Garantia extra de que estamos removendo apenas posts
        type: 'post',
      } as { id: number; type: string },
    });

    invalidateTag(cacheTags.postsList);
    invalidateTag(cacheTags.categoriesList); // Atualiza contagem de posts por categoria

    // Log the action
    await logAction(
      LogResource.POST,
      LogAction.DELETE,
      undefined,
      { postId: id }
    );

    return createSuccessResponse<PostActionSuccessData, PostActionError>({
      id,
    });
  } catch (error) {
    return createErrorResponse<PostActionError, PostActionSuccessData>({
      message: error instanceof Error ? error.message : 'Erro ao deletar post',
    });
  }
}

export async function deletePostsBulk(
  ids: number[]
): Promise<ActionResponse<{ deleted: number; failed: number; errors: string[] }>> {
  try {
    if (!ids || ids.length === 0) {
      return createErrorResponse('Nenhum post selecionado');
    }

    const uniqueIds = Array.from(new Set(ids.filter((value) => Number.isInteger(value) && value > 0)));

    if (uniqueIds.length === 0) {
      return createErrorResponse('IDs de posts inválidos');
    }

    if (uniqueIds.length > 500) {
      return createErrorResponse('Máximo de 500 posts por vez');
    }

    const posts = await db.content.findMany({
      where: {
        id: { in: uniqueIds },
        type: 'post',
      },
      select: {
        id: true,
        title: true,
      },
    });

    let deleted = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const post of posts) {
      try {
        await db.content.delete({
          where: {
            id: post.id,
            type: 'post',
          } as { id: number; type: string },
        });
        deleted += 1;
      } catch (err) {
        failed += 1;
        errors.push(`${post.title || `Post ${post.id}`}: ${err instanceof Error ? err.message : 'erro desconhecido'
          }`);
      }
    }

    invalidateTag(cacheTags.postsList);
    invalidateTag(cacheTags.categoriesList);

    // Log the action
    await logAction(
      LogResource.POST,
      LogAction.BULK_DELETE,
      undefined,
      { count: deleted, postIds: uniqueIds }
    );

    return createSuccessResponse({ deleted, failed, errors: errors.slice(0, 20) });
  } catch {
    return createErrorResponse('Erro ao deletar posts em massa');
  }
}

export async function createPost(data: unknown): Promise<PostActionResponse> {
  try {
    const validated = validatePostData(data);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[createPost] received payload', {
        hasShortcode: (validated.content ?? '').includes('[wp2next-accordion'),
        length: (validated.content ?? '').length,
        preview: (validated.content ?? '').slice(0, 300),
      });
    }

    // Gerar ID único (próximo ID disponível)
    const lastContent = await db.content.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true },
    });

    const newId = (lastContent?.id ?? 0) + 1;
    const now = new Date();

    // Gerar excerpt automaticamente a partir do conteúdo
    const excerpt = generateExcerpt(validated.content);
    const normalizedAuthorId = validated.authorId?.trim() ? validated.authorId.trim() : null;

    const post = await db.content.create({
      data: {
        id: newId,
        wpId: newId,
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        excerpt: excerpt,
        status: validated.status,
        type: 'post',
        createdAt: now,
        updatedAt: now,
        lastModifiedAt: now,
        featuredImageId: validated.featuredMediaId ?? null,
        authorId: normalizedAuthorId,
        galleryId: validated.galleryId,
      },
    });

    // Salvar categoria (categoryId)
    if (validated.categoryId) {
      const categoryId = parseInt(validated.categoryId, 10);
      if (Number.isInteger(categoryId) && categoryId > 0) {
        await db.contentTaxonomy.create({
          data: {
            contentId: newId,
            taxonomyId: categoryId,
          },
        }).catch(() => {
          // Silenciosamente ignora erro se categoria não existir
        });
      }
    }

    // Salvar tags (criando taxonomy quando necessário)
    if (typeof validated.tags === 'string') {
      const tagNames = validated.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      for (const tagName of tagNames) {
        try {
          const taxonomyId = await ensureTagTaxonomy(tagName);
          if (!taxonomyId) continue;
          await db.contentTaxonomy
            .create({
              data: {
                contentId: newId,
                taxonomyId,
              },
            })
            .catch(() => {
              // Silenciosamente ignora erro se já existe
            });
        } catch {
          // Silenciosamente ignora erro
        }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[createPost] post created', { id: post.id, slug: post.slug });
    }

    invalidateTag(cacheTags.postsList);
    invalidateTag(cacheTags.categoriesList); // Atualiza contagem de posts por categoria

    // Log the action
    await logAction(
      LogResource.POST,
      LogAction.CREATE,
      undefined,
      { title: validated.title, slug: validated.slug }
    );

    return createSuccessResponse<PostActionSuccessData, PostActionError>({
      slug: validated.slug,
      title: validated.title,
    });
  } catch (error) {
    return createErrorResponse<PostActionError, PostActionSuccessData>({
      message: error instanceof Error ? error.message : 'Erro ao criar post',
    });
  }
}

export async function updatePost(id: string, data: unknown): Promise<PostActionResponse> {
  try {
    const validated = validatePostData(data);

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[updatePost] received payload', {
        id,
        hasShortcode: (validated.content ?? '').includes('[wp2next-accordion'),
        length: (validated.content ?? '').length,
        preview: (validated.content ?? '').slice(0, 300),
      });
    }

    const numericId = parseInt(id, 10);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      return createErrorResponse<PostActionError, PostActionSuccessData>({
        message: 'ID de post inválido',
      });
    }

    // Gerar excerpt automaticamente a partir do conteúdo
    const excerpt = generateExcerpt(validated.content);
    const normalizedAuthorId = validated.authorId?.trim() ? validated.authorId.trim() : null;

    const post = await db.content.update({
      where: { id: numericId, type: 'post' } as { id: number; type: string },
      data: {
        title: validated.title,
        slug: validated.slug,
        content: validated.content,
        excerpt: excerpt,
        status: validated.status,
        updatedAt: new Date(),
        lastModifiedAt: new Date(),
        featuredImageId: validated.featuredMediaId ?? null,
        authorId: normalizedAuthorId,
        galleryId: validated.galleryId,
      },
    });

    // Atualizar categoria (remover antigas e adicionar nova)
    if (validated.categoryId) {
      const categoryId = parseInt(validated.categoryId, 10);
      if (Number.isInteger(categoryId) && categoryId > 0) {
        // Remover taxonomias antigas do tipo 'category'
        await db.contentTaxonomy.deleteMany({
          where: {
            contentId: numericId,
            taxonomy: { type: 'category' },
          },
        }).catch(() => {
          // Silenciosamente ignora erro
        });
        // Adicionar nova categoria
        await db.contentTaxonomy.create({
          data: {
            contentId: numericId,
            taxonomyId: categoryId,
          },
        }).catch(() => {
          // Silenciosamente ignora erro se categoria não existir
        });
      }
    }

    // Atualizar tags (remover antigas e adicionar novas, mesmo quando vazio)
    if (typeof validated.tags === 'string') {
      await db.contentTaxonomy
        .deleteMany({
          where: {
            contentId: numericId,
            taxonomy: { type: { contains: 'tag', mode: 'insensitive' } },
          },
        })
        .catch(() => {
          // Silenciosamente ignora erro
        });

      const tagNames = validated.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      for (const tagName of tagNames) {
        try {
          const taxonomyId = await ensureTagTaxonomy(tagName);
          if (!taxonomyId) continue;
          await db.contentTaxonomy
            .create({
              data: {
                contentId: numericId,
                taxonomyId,
              },
            })
            .catch(() => {
              // Silenciosamente ignora erro se já existe
            });
        } catch {
          // Silenciosamente ignora erro
        }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[updatePost] post updated', { id: post.id, slug: post.slug });
    }
    invalidateTag(cacheTags.postsList);
    invalidateTag(cacheTags.categoriesList); // Atualiza contagem de posts por categoria

    // Log the action
    await logAction(
      LogResource.POST,
      LogAction.UPDATE,
      undefined,
      { postId: id, title: validated.title, slug: validated.slug }
    );

    return createSuccessResponse<PostActionSuccessData, PostActionError>({
      id,
      slug: validated.slug,
      title: validated.title,
    });
  } catch (error) {
    return createErrorResponse<PostActionError, PostActionSuccessData>({
      message: error instanceof Error ? error.message : 'Erro ao atualizar post',
    });
  }
}

/**
 * Obtém estatísticas de posts
 */
export async function getPostStats(): Promise<
  ActionResponse<{
    total: number;
    published: number;
    draft: number;
    archived: number;
  }>
> {
  try {
    // Debug: Buscar todos os status únicos para entender a discrepância
    const allPosts = await db.content.findMany({
      where: { type: 'post' },
      select: { id: true, status: true },
    });

    const statusDistribution = allPosts.reduce(
      (acc, post) => {
        acc[post.status] = (acc[post.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // eslint-disable-next-line no-console
    console.log('[getPostStats] Status Distribution:', statusDistribution);
    // eslint-disable-next-line no-console
    console.log('[getPostStats] Total Posts:', allPosts.length);

    const [total, published, draft, archived] = await Promise.all([
      db.content.count({ where: { type: 'post' } }),
      db.content.count({ where: { type: 'post', status: { in: ['published', 'publish'] } } }),
      db.content.count({ where: { type: 'post', status: 'draft' } }),
      db.content.count({ where: { type: 'post', status: 'archived' } }),
    ]);

    // eslint-disable-next-line no-console
    console.log('[getPostStats] ✅ Counts - Total:', total, 'Published:', published, 'Draft:', draft, 'Archived:', archived);

    return createSuccessResponse({
      total,
      published,
      draft,
      archived,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getPostStats] Error:', error);
    return createErrorResponse('Erro ao buscar estatísticas de posts');
  }
}
