'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { PostForm, type PostFormSubmitData } from '@/components/posts/post-form';
import { updatePost, getPost, type PostListData, type PostActionError } from '@/app/admin/posts/actions';
import { LuLoader } from 'react-icons/lu';
import { FeaturedImagePicker } from '@/components/posts/featured-image-picker';
import type { MediaAsset } from '@/app/admin/media/actions';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [postData, setPostData] = useState<PostListData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Image picker state
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [featuredMediaId, setFeaturedMediaId] = useState<number | undefined>(undefined);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      void getPost(id).then((result) => {
        if (result.status === 'success' && result.data) {
          setPostData(result.data);
          setFeaturedMediaId(result.data.featuredImageId ? Number(result.data.featuredImageId) : undefined);
          setExistingImageUrl(result.data.featuredImageUrl || null);
        } else {
          // getPost error is a string
          setError(typeof result.error === 'string' ? result.error : 'Erro ao carregar post');
        }
        setIsLoading(false);
      });
    }
  }, [id]);

  const handleImagePickerConfirm = (media: MediaAsset) => {
    setFeaturedMediaId(media.id);
    setExistingImageUrl(media.firebaseUrl);
    setIsImagePickerOpen(false);
  };

  const handleSubmit = async (data: PostFormSubmitData) => {
    setIsSaving(true);
    try {
      const result = await updatePost(id, {
        ...data,
        featuredMediaId: featuredMediaId,
      });
      if (result.status === 'success') {
        router.push('/admin/posts');
      } else {
        // updatePost error is an object with message or a string
        const errorMessage = typeof result.error === 'string' 
          ? result.error 
          : result.error?.message || 'Erro ao salvar post';
        setError(errorMessage);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500 dark:text-slate-400">
        <LuLoader className="h-6 w-6 animate-spin mr-2" />
        <span>Carregando post...</span>
      </div>
    );
  }

  // Preparar dados para o formulário
  const formInitialData = postData ? {
    title: postData.title,
    slug: postData.slug,
    content: postData.content,
    categoryId: postData.categoryId ? String(postData.categoryId) : '',
    status: postData.status as 'draft' | 'published' | 'archived',
    authorId: postData.authorId || undefined,
    tags: postData.tags,
    id: String(postData.id),
    featuredImageUrl: postData.featuredImageUrl,
    featuredMediaId: postData.featuredImageId ? Number(postData.featuredImageId) : undefined,
  } : undefined;

  if (error && !postData) {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 text-red-400">
        {error}
        <div className="mt-4">
          <Link href="/admin/posts" className="text-primary hover:underline">
            Voltar para lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/admin/posts" className="text-[var(--primary)] hover:underline text-sm mb-4 inline-block">
          ← Voltar para Posts
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Editar Post</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Atualize as informações do post</p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-6 shadow-md dark:shadow-none">
        <PostForm 
          onSubmit={handleSubmit} 
          initialData={formInitialData} 
          isLoading={isSaving}
          serverError={error || undefined}
          onOpenImagePicker={() => setIsImagePickerOpen(true)}
          featuredMediaId={featuredMediaId}
          onFeaturedMediaIdChange={setFeaturedMediaId}
          existingImageUrl={existingImageUrl}
          onExistingImageUrlChange={setExistingImageUrl}
        />
      </div>

      {/* Image Picker */}
      {isImagePickerOpen && (
        <FeaturedImagePicker
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          onConfirm={handleImagePickerConfirm}
          initialMediaId={featuredMediaId}
        />
      )}
    </div>
  );
}
