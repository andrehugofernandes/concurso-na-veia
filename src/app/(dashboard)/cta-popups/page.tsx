import { Suspense } from 'react';
import { LuSearch } from 'react-icons/lu';
import { CTAPopupsPageClient } from './page-client';
import { listPopups, getPopupStats } from './actions';
import { TextRoll } from '@/components/core/text-roll';

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
    pageSize?: string;
  }>;
}

export default async function CTAPopupsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search;

  return (
    <div className="space-y-6">
      {/* Header: Título + Busca (igual Posts) */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100"><TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Popups</TextRoll></h1>
        </div>
        <form action="/admin/cta-popups" method="GET" className="flex gap-2 max-w-sm">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={search || ''}
              placeholder="Buscar popups..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 
              focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white font-medium transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      <Suspense fallback={<PopupsSkeleton />}>
        <PopupsContentWrapper searchParams={params} />
      </Suspense>
    </div>
  );
}

async function PopupsContentWrapper({
  searchParams,
}: {
  searchParams: {
    status?: string;
    search?: string;
    page?: string;
  };
}) {
  const status = searchParams.status;
  const search = searchParams.search;
  const page = parseInt(searchParams.page || '1', 10);

  // eslint-disable-next-line no-console
  console.log('[PopupsContentWrapper] Listing popups...', { status, search, page });

  const result = await listPopups({
    status: (status as 'active' | 'inactive' | 'all' | undefined) || undefined,
    search: search || undefined,
    page,
    pageSize: 10,
  });

  const statsResult = await getPopupStats();

  // eslint-disable-next-line no-console
  console.log('[PopupsContentWrapper] Validating result:', {
    status: result.status,
    hasData: !!result.data,
    popupsCount: result.data?.popups?.length ?? 0,
    firstPopup: result.data?.popups?.[0]
  });

  const popupsData =
    result.status === 'success'
      ? result.data
      : { popups: [], total: 0, page: 1, pageSize: 10, totalPages: 1, pages: 0 };
  const statsData = statsResult.status === 'success' ? statsResult.data ?? null : null;

  return (
    <CTAPopupsPageClient
      searchParams={searchParams}
      popupsData={popupsData!}
      statsData={statsData}
    />
  );
}

function PopupsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Filter skeleton */}
      <div className="h-10 bg-slate-800 rounded-lg animate-pulse" />

      {/* Table skeleton */}
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
