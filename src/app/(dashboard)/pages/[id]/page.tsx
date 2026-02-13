'use client';

import { useActionState, useEffect, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageForm, type PageFormData } from '@/components/pages/page-form';
import { updatePage, type PageActionResponse } from '@/app/actions/pages';
import { useEffectEventHandler } from '@/lib/hooks/useEffectEventHandler';

const parentOptions = [
  {
    id: '1',
    title: 'Home',
  },
  {
    id: '2',
    title: 'Sobre',
  },
];

const templateOptions = [
  { id: 'default', label: 'Padrão' },
  { id: 'landing', label: 'Landing Page' },
  { id: 'blog', label: 'Página de Blog' },
];

const mockPage: PageFormData = {
  title: 'Página de Exemplo',
  slug: 'pagina-de-exemplo',
  content: 'Conteúdo de exemplo para a página.',
  status: 'draft',
  parentId: '1',
  template: 'default',
};

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function EditPage({ params }: EditPageProps) {
  const router = useRouter();

  const initialActionState: PageActionResponse = {
    status: 'success',
  };

  const [actionState, submitPage, isPending] = useActionState(
    async (
      _prevState: PageActionResponse,
      formData: PageFormData,
    ): Promise<PageActionResponse> => {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        status: formData.status,
        parentId: formData.parentId,
        template: formData.template,
      };

      return updatePage(params.id, payload);
    },
    initialActionState,
  );

  const [optimisticSaving, setOptimisticSaving] = useOptimistic(false);

  const handlePageResult = useEffectEventHandler((state: PageActionResponse) => {
    if (state.status === 'success' && state.data) {
      router.push('/admin/pages');
    }
  });

  useEffect(() => {
    handlePageResult(actionState);
  }, [actionState, handlePageResult]);

  const handleSubmit = async (data: PageFormData) => {
    setOptimisticSaving(true);

    try {
      await submitPage(data);
    } finally {
      setOptimisticSaving(false);
    }
  };

  const serverError = actionState.status === 'error' ? actionState.error?.message : undefined;
  const isSaving = isPending || optimisticSaving;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/pages" className="text-primary hover:underline text-sm mb-4 inline-block">
          ← Voltar para Páginas
        </Link>
        <h1 className="text-3xl font-bold">Editar Página</h1>
        <p className="text-muted-foreground mt-1">Atualize as informações da página</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <PageForm
          onSubmit={handleSubmit}
          initialData={mockPage}
          isLoading={isSaving}
          parentOptions={parentOptions}
          templateOptions={templateOptions}
          serverError={serverError}
        />
      </div>
    </div>
  );
}
