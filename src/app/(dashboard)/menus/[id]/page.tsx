import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LuArrowLeft } from 'react-icons/lu';
import { getMenu } from '../actions';
import { MenuEditorClient } from '@/components/menus/menu-editor-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

async function MenuEditorContent({ id }: { id: number }) {
  const result = await getMenu(id);

  if (result.status === 'error' || !result.data?.menu) {
    notFound();
  }

  return <MenuEditorClient menu={result.data.menu} />;
}

function MenuEditorSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-slate-700 rounded animate-pulse" />
        <div className="h-8 w-48 bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Tree skeleton */}
      <div className="bg-slate-800 rounded-lg p-4 space-y-3">
        {[1, 2, 3, 4, 5].map(i => {
          const offsetClass = i % 3 === 0 ? 'ml-12' : i % 3 === 1 ? 'ml-0' : 'ml-6';
          return (
            <div
              key={i}
              className={`h-14 bg-slate-700 rounded animate-pulse ${offsetClass}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default async function MenuEditorPage({ params }: PageProps) {
  const { id } = await params;
  const menuId = parseInt(id, 10);

  if (isNaN(menuId)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/menus"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
      >
        <LuArrowLeft className="h-4 w-4" />
        Voltar para Menus
      </Link>

      <Suspense fallback={<MenuEditorSkeleton />}>
        <MenuEditorContent id={menuId} />
      </Suspense>
    </div>
  );
}
