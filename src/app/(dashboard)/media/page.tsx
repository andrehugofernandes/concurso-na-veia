import { Suspense } from 'react';
import { LuSearch, LuImage } from 'react-icons/lu';
import { listMedia, getMediaStats } from './actions';
import { MediaLibraryClient } from './media-library-client';
import { TextRoll } from '@/components/core/text-roll';
import { MediaSearchClient } from './media-search-client';

interface SearchParams {
  page?: string;
  pageSize?: string;
  search?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: string;
}

async function MediaContent({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = parseInt(searchParams.pageSize || '24', 10);
  const search = searchParams.search || '';
  const sortBy = (searchParams.sortBy as 'uploadedAt' | 'originalFilename' | 'fileSize') || 'uploadedAt';
  const sortOrder = (searchParams.sortOrder as 'asc' | 'desc') || 'desc';

  const mimeTypes = ['', 'image', 'video', 'audio', 'application'];

  const [statsResult, ...mediaResults] = await Promise.all([
    getMediaStats(),
    ...mimeTypes.map((type) =>
      listMedia({
        page,
        pageSize,
        search: search || undefined,
        mimeType: type || undefined,
        sortBy,
        sortOrder,
      })
    ),
  ]);

  const hasError = mediaResults.some((result) => result.status === 'error');

  if (hasError) {
    const firstError = mediaResults.find((result) => result.status === 'error');
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-400">
        <LuImage className="h-12 w-12 mb-4" />
        <p className="text-lg font-medium">Erro ao carregar mídias</p>
        <p className="text-sm">{firstError?.error ?? 'Erro desconhecido'} </p>
      </div>
    );
  }

  const stats = statsResult.status === 'success' ? statsResult.data : null;

  const tabsData = mimeTypes.map((type, index) => {
    const result = mediaResults[index];
    const data = result.status === 'success' ? result.data : null;
    return {
      key: type === '' ? 'all' : type,
      items: data?.items ?? [],
      total: data?.total ?? 0,
      page: data?.page ?? page,
      pageSize: data?.pageSize ?? pageSize,
      totalPages: data?.totalPages ?? 1,
      sortBy,
      sortOrder,
      search,
    };
  });

  return (
    <MediaLibraryClient
      tabsData={tabsData}
      stats={stats ?? null}
    />
  );
}


function MediaSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-slate-700 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Filters skeleton */}
      <div className="flex gap-4">
        <div className="h-10 w-64 bg-slate-700 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-700 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="aspect-square bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-6">
      {/* Header com Busca */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">
              <span className="hidden md:inline">Biblioteca de Mídia</span>
              <span className="md:hidden">Mídias</span>
            </TextRoll>
          </h1>
        </div>

        {/* Desktop: Form normal */}
        <form action={`/admin/media`} method="GET" className="hidden md:flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={params.search || ''}
              placeholder="Buscar arquivos..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 
              focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-colors shadow-md"
          >
            Buscar
          </button>
        </form>
        {/* Mobile: AnimatedInput com Enter */}
        <MediaSearchClient search={params.search} />
      </div>

      {/* Content - Stats e Toolbar */}
      <Suspense fallback={<MediaSkeleton />}>
        <MediaContent searchParams={params} />
      </Suspense>
    </div>
  );
}
