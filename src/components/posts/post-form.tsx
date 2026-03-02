'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateSlug } from '@/lib/utils/slug-generator';
import { RichTextEditor } from './rich-text-editor';
import { useFormPersistence } from '@/lib/hooks/useFormPersistence';
import { AnimatedInput } from '@/components/ui/animated-input';
import { FaUpload, FaTimes } from 'react-icons/fa';

const postSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  status: z.enum(['draft', 'published', 'archived']),
  authorId: z.string().optional(),
  tags: z.string().optional(),
  featuredImage: z.instanceof(File).optional(),
});

export type PostFormData = z.infer<typeof postSchema>;
export type PostFormSubmitData = PostFormData & { featuredImagePreview?: string; featuredMediaId?: number };

interface PostFormProps {
  onSubmit: (data: PostFormSubmitData) => Promise<void>;
  initialData?: Partial<PostFormData> & {
    featuredImageUrl?: string | null;
    id?: string;
    featuredMediaId?: number;
    featuredImageId?: string;
  };
  isLoading?: boolean;
  categories?: Array<{ id: string; name: string }>;
  users?: Array<{ id: string; label: string }>;
  serverError?: string;
  onSaveSuccess?: () => void;
  onOpenImagePicker: () => void;
  featuredMediaId?: number;
  onFeaturedMediaIdChange?: (id: number | undefined) => void;
  existingImageUrl?: string | null;
  onExistingImageUrlChange?: (url: string | null) => void;
  onPreview?: (data: PostFormData) => void;
}

export function PostForm({
  onSubmit,
  initialData,
  isLoading,
  categories = [],
  users = [],
  serverError,
  onSaveSuccess,
  onOpenImagePicker,
  featuredMediaId: externalFeaturedMediaId,
  onFeaturedMediaIdChange,
  existingImageUrl: externalExistingImageUrl,
  onExistingImageUrlChange,
  onPreview,
}: PostFormProps) {
  const isEditing = !!initialData?.id;
  const [hasSlugChanged, setHasSlugChanged] = useState(false);

  // Usar valores externos se fornecidos, caso contrário usar estado local
  const [localExistingImageUrl, setLocalExistingImageUrl] = useState<string | null>(initialData?.featuredImageUrl || null);
  const [localFeaturedMediaId, setLocalFeaturedMediaId] = useState<number | undefined>(initialData?.featuredMediaId);

  const existingImageUrl = externalExistingImageUrl ?? localExistingImageUrl;
  const setExistingImageUrl = onExistingImageUrlChange ?? setLocalExistingImageUrl;
  const featuredMediaId = externalFeaturedMediaId ?? localFeaturedMediaId;
  const setFeaturedMediaId = onFeaturedMediaIdChange ?? setLocalFeaturedMediaId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      content: initialData?.content || '',
      categoryId: initialData?.categoryId || '',
      status: initialData?.status || 'draft',
      authorId: (initialData as Partial<PostFormData>)?.authorId || '',
      tags: initialData?.tags || '',
    },
  });

  const title = watch('title');
  const content = watch('content');
  const slug = watch('slug');
  const categoryId = watch('categoryId');
  const status = watch('status');
  const authorIdValue = watch('authorId');

  // Persistência de formulário (apenas para criação)
  const formValues = { title, slug, content, categoryId, status };

  const setFormValues = useCallback((values: typeof formValues) => {
    if (values.title) setValue('title', values.title);
    if (values.slug) setValue('slug', values.slug);
    if (values.content) setValue('content', values.content);
    if (values.categoryId) setValue('categoryId', values.categoryId);
    if (values.status) setValue('status', values.status);
  }, [setValue]);

  const { clearDraft } = useFormPersistence({
    key: 'post_new',
    values: formValues,
    setValues: setFormValues,
    enabled: !isEditing && !initialData?.id,
  });

  // Resetar formulário quando initialData mudar (edição de post diferente)
  useEffect(() => {
    if (initialData?.id) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[PostForm] initialData received', {
          id: initialData.id,
          title: initialData.title,
          authorId: (initialData as Partial<PostFormData>).authorId,
          tags: initialData.tags,
          featuredImageUrl: initialData.featuredImageUrl,
          featuredImageId: initialData.featuredImageId,
        });
      }
      reset({
        title: initialData.title || '',
        slug: initialData.slug || '',
        content: initialData.content || '',
        categoryId: initialData.categoryId || '',
        status: initialData.status || 'draft',
        authorId: (initialData as Partial<PostFormData>).authorId || '',
        tags: initialData.tags || '',
      });
      setHasSlugChanged(false);
    }
  }, [initialData, reset]);

  // Sincronizar imagem destacada separadamente para evitar conflitos
  useEffect(() => {
    if (initialData?.featuredImageUrl !== undefined) {
      setExistingImageUrl(initialData.featuredImageUrl);
    }
    if (initialData?.featuredMediaId !== undefined) {
      setFeaturedMediaId(initialData.featuredMediaId);
    }
  }, [initialData?.featuredImageUrl, initialData?.featuredMediaId, setExistingImageUrl, setFeaturedMediaId]);

  // Auto-gerar slug quando título muda
  useEffect(() => {
    if (title && !hasSlugChanged) {
      setValue('slug', generateSlug(title), { shouldDirty: false });
    }
  }, [title, hasSlugChanged, setValue]);

  useEffect(() => {
    if (!initialData?.authorId) return;
    if (authorIdValue) return;
    if (users.length === 0) return;
    const hasOption = users.some((u) => u.id === initialData.authorId);
    if (!hasOption) return;
    setValue('authorId', initialData.authorId, { shouldDirty: false });
  }, [authorIdValue, initialData?.authorId, setValue, users]);

  const handleImageRemove = () => {
    setExistingImageUrl(null);
    setFeaturedMediaId(undefined);
  };

  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);

  const handleFeaturedDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;
    setIsDraggingFeatured(true);
  };

  const handleFeaturedDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(false);
  };

  const handleFeaturedDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(false);
    if (isLoading) return;
    onOpenImagePicker();
  };

  const handleResetForm = () => {
    reset({
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      content: initialData?.content || '',
      categoryId: initialData?.categoryId || '',
      status: initialData?.status || 'draft',
      authorId: (initialData as Partial<PostFormData> | undefined)?.authorId || '',
      tags: initialData?.tags || '',
    });
    setExistingImageUrl(initialData?.featuredImageUrl || null);
    setFeaturedMediaId(initialData?.featuredMediaId);
    setHasSlugChanged(false);
    clearDraft();
  };

  const onFormSubmit = async (data: PostFormData) => {
    await onSubmit({
      ...data,
      featuredMediaId,
    });
    if (!isEditing) {
      clearDraft();
    }
    onSaveSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="h-full flex flex-col overflow-hidden">
      {serverError && (
        <div
          role="alert"
          className="rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-600 dark:text-red-400 mb-4"
        >
          {serverError}
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-auto pr-2">
        {/* Coluna Esquerda - Mobile: Primeiros 3 itens */}
        <div className="space-y-4 lg:col-span-2 flex flex-col">
          {/* Título */}
          <div className='px-2 pt-4'>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <AnimatedInput
                  {...field}
                  id="title"
                  type="text"
                  label="Título *"
                  placeholder="Título do post"
                  inputClassName="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
                  surfaceClassName="bg-white dark:bg-slate-800"
                  contentLeftClassName="left-[14px]"
                  aria-label="Título do post"
                />
              )}
            />
            {errors.title && <span className="text-red-400 text-sm mt-1 block">{errors.title.message}</span>}
          </div>

          {/* Slug */}
          <div className='px-2'>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <AnimatedInput
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setHasSlugChanged(true);
                  }}
                  id="slug"
                  type="text"
                  label="Slug * (auto-gerado)"
                  placeholder="slug-do-post"
                  inputClassName="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
                  surfaceClassName="bg-white dark:bg-slate-800"
                  contentLeftClassName="left-[14px]"
                  aria-label="Slug do post"
                />
              )}
            />
            {errors.slug && <span className="text-red-400 text-sm mt-1 block">{errors.slug.message}</span>}
          </div>

          {/* Conteúdo com Editor Rico */}
          <div className="px-2 flex flex-col flex-1 min-h-0 h-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 flex-shrink-0">
              Conteúdo *
            </label>
            <div className="flex-1 overflow-auto flex flex-col min-h-[240px] max-h-[50vh] rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                )}
              />
            </div>
            {errors.content && <span className="text-red-400 text-sm mt-1 block flex-shrink-0">{errors.content.message}</span>}
          </div>
        </div>

        {/* Coluna Direita - Mobile: Itens restantes */}
        <div className="space-y-4 lg:col-span-1">
          {/* Status */}
          <div className='px-2'>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Status *
            </label>
            <select
              id="status"
              {...register('status')}
              className="w-full px-[12px] py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700
               text-gray-900 dark:text-slate-100 rounded-md 
               focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
              aria-label="Selecionar status"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
            {errors.status && <span className="text-red-400 text-sm mt-1 block">{errors.status.message}</span>}
          </div>

          {/* Categoria */}
          <div className='px-2'>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Categoria *
            </label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <select
                  id="categoryId"
                  {...field}
                  value={field.value ?? ''}
                  className="w-full px-[12px] py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-md 
                  focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
                  aria-label="Selecionar categoria"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.categoryId && (
              <span className="text-red-400 text-sm mt-1 block">{errors.categoryId.message}</span>
            )}
          </div>

          {/* Imagem de Destaque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Imagem de Destaque</label>
            {!existingImageUrl ? (
              <div
                onDragOver={handleFeaturedDragOver}
                onDragLeave={handleFeaturedDragLeave}
                onDrop={handleFeaturedDrop}
                role="button"
                tabIndex={isLoading ? -1 : 0}
                onClick={() => !isLoading && onOpenImagePicker()}
                onKeyDown={(e) => {
                  if (isLoading) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenImagePicker();
                  }
                }}
                className={`w-full px-6 py-12 border-2 border-dashed rounded-lg transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-slate-800 ${isDraggingFeatured
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-950/30'
                    : 'border-gray-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Selecionar imagem de destaque"
              >
                <FaUpload className="w-8 h-8 text-gray-400 dark:text-slate-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                    Arraste a imagem aqui ou clique para abrir a biblioteca
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                    Biblioteca e Upload no modal
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="relative group cursor-pointer"
                onDragOver={handleFeaturedDragOver}
                onDragLeave={handleFeaturedDragLeave}
                onDrop={handleFeaturedDrop}
                role="button"
                tabIndex={isLoading ? -1 : 0}
                onClick={() => !isLoading && onOpenImagePicker()}
                onKeyDown={(e) => {
                  if (isLoading) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenImagePicker();
                  }
                }}
                aria-label="Alterar imagem de destaque"
              >
                <img
                  src={existingImageUrl}
                  alt="Imagem de destaque"
                  className={`w-full h-auto rounded-lg border transition-all ${isDraggingFeatured
                      ? 'border-blue-500 opacity-70'
                      : 'border-gray-200 dark:border-slate-700 group-hover:border-blue-500 group-hover:opacity-90'
                    }`}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="text-center text-white">
                    <FaUpload className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Clique para abrir a biblioteca</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageRemove();
                  }}
                  disabled={isLoading}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  aria-label="Remover imagem"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            )}
            {errors.featuredImage && (
              <span className="text-red-400 text-sm mt-1 block">{errors.featuredImage.message}</span>
            )}
          </div>

          {/* Autor */}
          <div>
            <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Autor
            </label>
            <Controller
              name="authorId"
              control={control}
              render={({ field }) => (
                <select
                  id="authorId"
                  {...field}
                  value={field.value ?? ''}
                  className="w-full px-[12px] py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
                  aria-label="Selecionar autor do post"
                >
                  <option value="">Selecione um autor</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.authorId && <span className="text-red-400 text-sm mt-1 block">{errors.authorId.message}</span>}
          </div>

          {/* Tags */}
          <div>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <AnimatedInput
                  id="tags"
                  {...field}
                  type="text"
                  label="Tags"
                  placeholder="tag1, tag2, tag3"
                  inputClassName="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
                  surfaceClassName="bg-white dark:bg-slate-800"
                  contentLeftClassName="left-[14px]"
                  aria-label="Tags do post"
                />
              )}
            />
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">Separe as tags por vírgula</p>
            {errors.tags && <span className="text-red-400 text-sm mt-1 block">{errors.tags.message}</span>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700 mt-4">
        <button
          type="button"
          onClick={handleResetForm}
          className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
        >
          Limpar
        </button>
        {onPreview && (
          <button
            type="button"
            onClick={handleSubmit((data) => {
              onPreview({ ...data, featuredImage: undefined }); // featuredImage File object cannot be serialized if needed, but here we likely rely on existingImageUrl for preview
            })}
            className="px-4 py-2 rounded-md font-medium transition-all border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
          >
            Visualizar Post
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-md text-white font-medium transition-all disabled:opacity-50 bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-lg"
        >
          {isLoading ? 'Salvando...' : 'Salvar Post'}
        </button>
      </div>
    </form>
  );
}
