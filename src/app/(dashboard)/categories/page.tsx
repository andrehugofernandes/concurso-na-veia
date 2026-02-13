import { Suspense } from 'react';
import { listAllCategories, getCategoryStats } from './actions';
import { TextRoll } from '@/components/core/text-roll';
import { CategoriesHierarchyClient } from './categories-hierarchy-client';
import { CategoriesSearchClient } from './categories-search-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    search?: string;
    contentFilter?: string;
    hierarchyFilter?: string;
  }>;
}

interface CategoriesContentProps {
  search?: string;
  contentFilter?: string;
  hierarchyFilter?: string;
}

async function CategoriesContent({
  search,
  contentFilter,
  hierarchyFilter,
}: CategoriesContentProps) {
  const [categoriesResult, statsResult] = await Promise.all([
    listAllCategories(),
    getCategoryStats(),
  ]);

  if (categoriesResult.status === 'error') {
    return (
      <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400">
        Erro ao carregar categorias: {categoriesResult.error}
      </div>
    );
  }

  const categories = categoriesResult.data || [];
  const stats = statsResult.status === 'success' && statsResult.data
    ? statsResult.data
    : { total: 0, rootCategories: 0, withPosts: 0, withChildren: 0 };

  return (
    <CategoriesHierarchyClient
      initialCategories={categories}
      stats={stats}
      search={search}
      contentFilter={contentFilter}
      hierarchyFilter={hierarchyFilter}
    />
  );
}

function CategoriesSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 rounded-lg animate-pulse bg-gray-200 dark:bg-slate-800"
          />
        ))}
      </div>

      {/* Card skeleton */}
      <div className="rounded-lg bg-white dark:bg-slate-800 p-6">
        {/* Filter skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 rounded-md animate-pulse bg-gray-200 dark:bg-slate-700"
            />
          ))}
        </div>

        {/* List skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-20 rounded-xl animate-pulse bg-gray-200 dark:bg-slate-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;
  const contentFilter = params.contentFilter;
  const hierarchyFilter = params.hierarchyFilter;

  return (
    <div className="space-y-6">
      {/* Header com Busca */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">
              Categorias
            </TextRoll>
          </h1>
          <p className="hidden md:block text-gray-500 dark:text-slate-400 mt-1">
            Gerencie todas as categorias do seu site
          </p>
        </div>
        <CategoriesSearchClient search={search} />
      </div>

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesContent 
          search={search} 
          contentFilter={contentFilter} 
          hierarchyFilter={hierarchyFilter} 
        />
      </Suspense>
    </div>
  );
}