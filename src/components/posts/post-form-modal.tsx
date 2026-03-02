'use client';

import { useEffect, useState, useTransition } from 'react';
import { LuFileText } from 'react-icons/lu';
import { PostForm, type PostFormSubmitData, type PostFormData } from './post-form';
import { FeaturedImagePicker } from './featured-image-picker';
import { createPost, updatePost, type PostActionResponse } from '@/app/admin/posts/actions';
import { listCategoriesForSelect } from '@/app/admin/categories/actions';
import { listUsers } from '@/app/admin/users/actions';
import { useConfetti } from '@/lib/hooks/useConfetti';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { ModalHeader } from '@/components/ui/modal-header';
import type { MediaAsset } from '@/app/admin/media/actions';
import { getCurrentUser } from '@/lib/auth/get-current-user';

// Re-export para evitar lint errors de imports não usados diretamente
export type { MediaAsset };

import { PostPreviewModal } from './post-preview-modal';

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Partial<PostFormData> & { id?: string; featuredImageUrl?: string | null; featuredImageId?: string; authorId?: string };
  isLoading?: boolean;
}

export function PostFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  isLoading = false,
}: PostFormModalProps) {
  const isEditing = !!initialData?.id;
  const title = isEditing ? 'Editar Post' : 'Novo Post';
  const description = isEditing
    ? 'Atualize as informações do post'
    : 'Crie um novo post para seu site';

  const shouldDebugAccordion = process.env.NODE_ENV === 'development';

  const triggerConfetti = useConfetti();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [featuredMediaId, setFeaturedMediaId] = useState<number | undefined>(
    initialData?.featuredImageId ? parseInt(initialData.featuredImageId, 10) : undefined
  );
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(initialData?.featuredImageUrl || null);
  const [users, setUsers] = useState<Array<{ id: string; label: string }>>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Preview State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    content: string;
    featuredImageUrl?: string | null;
  } | null>(null);

  // Carregar categorias quando o modal abre
  useEffect(() => {
    if (isOpen) {
      listCategoriesForSelect().then((result) => {
        if (result.status === 'success' && result.data) {
          const nextCategories = result.data.map((c) => ({ id: String(c.id), name: c.name }));
          setCategories(nextCategories);
        }
      });

      getCurrentUser().then((user) => {
        setCurrentUserId(user?.id ?? null);
      });

      listUsers({ page: 1, pageSize: 100 }).then((result) => {
        if (result.status !== 'success' || !result.data?.users) {
          return;
        }

        const nextUsers = result.data.users
          .filter((u) => u.isActive)
          .map((u) => {
            const label = u.fullName?.trim() || u.username || u.email;
            return { id: u.id, label };
          });

        setUsers(nextUsers);
      });
    }
  }, [isOpen]);

  // Atualizar estado de imagem quando initialData muda
  useEffect(() => {
    if (initialData) {
      setFeaturedMediaId(initialData.featuredImageId ? parseInt(initialData.featuredImageId, 10) : undefined);
      setExistingImageUrl(initialData.featuredImageUrl || null);
    } else {
      setFeaturedMediaId(undefined);
      setExistingImageUrl(null);
    }
  }, [initialData]);

  const handleImagePickerConfirm = (media: MediaAsset) => {
    setFeaturedMediaId(media.id);
    setExistingImageUrl(media.firebaseUrl);
    setIsImagePickerOpen(false);
  };

  const handlePreview = (data: PostFormData) => {
    setPreviewData({
      title: data.title,
      content: data.content,
      featuredImageUrl: existingImageUrl,
    });
    setIsPreviewOpen(true);
  };

  const handleSubmit = async (data: PostFormSubmitData) => {
    setServerError(undefined);

    startTransition(async () => {
      const { title, slug, content, categoryId, status, authorId, tags } = data;
      const payload = {
        title,
        slug,
        content,
        categoryId,
        status,
        authorId,
        tags,
        featuredMediaId: data.featuredMediaId ?? featuredMediaId,
      };

      if (shouldDebugAccordion) {
        // eslint-disable-next-line no-console
        console.log('[PostFormModal] submit payload', {
          mode: isEditing ? 'edit' : 'create',
          postId: initialData?.id,
          hasShortcode: (payload.content ?? '').includes('[wp2next-accordion'),
          preview: (payload.content ?? '').slice(0, 300),
          authorId: payload.authorId,
          tags: payload.tags,
          featuredMediaId: payload.featuredMediaId,
        });
      }

      let result: PostActionResponse;

      if (isEditing && initialData?.id) {
        result = await updatePost(initialData.id, payload);
      } else {
        result = await createPost(payload);
      }

      if (result.status === 'success') {
        triggerConfetti();
        onSuccess();
        onClose();
      } else {
        setServerError(result.error?.message || 'Erro ao salvar post');
      }
    });
  };

  const isSaving = isLoading || isPending;

  const effectiveInitialData: Partial<PostFormData> & {
    id?: string;
    featuredImageUrl?: string | null;
    featuredImageId?: string;
    authorId?: string;
  } = initialData
      ? initialData
      : {
        authorId: currentUserId ?? undefined,
      };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-5xl h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-visible data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
          <AnimatedBorder className="rounded-xl" />
          {/* Header com padrão do ModalHeader (skin-aware) */}
          <ModalHeader
            icon={<LuFileText size={24} />}
            title={title}
            description={description}
            onClose={onClose}
          />

          {/* Corpo do Modal */}
          <div className="flex-1 overflow-hidden px-8 py-6 flex flex-col">
            <PostForm
              key={initialData?.id || 'new'}
              onSubmit={handleSubmit}
              initialData={effectiveInitialData}
              isLoading={isSaving}
              categories={categories}
              users={users}
              serverError={serverError}
              onOpenImagePicker={() => setIsImagePickerOpen(true)}
              featuredMediaId={featuredMediaId}
              onFeaturedMediaIdChange={setFeaturedMediaId}
              existingImageUrl={existingImageUrl}
              onExistingImageUrlChange={setExistingImageUrl}
              onPreview={handlePreview}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Featured Image Picker - renderizado fora do modal para aparecer acima */}
      {isImagePickerOpen && (
        <FeaturedImagePicker
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          onConfirm={handleImagePickerConfirm}
          initialMediaId={featuredMediaId}
        />
      )}

      {/* Post Preview Modal */}
      {isPreviewOpen && previewData && (
        <PostPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          data={previewData}
        />
      )}
    </>
  );
}
