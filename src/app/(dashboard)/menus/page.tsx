import { Suspense } from 'react';
import { listMenus, getMenuStats } from './actions';
import { MenusClient } from './menus-client';
import { TextRoll } from '@/components/core/text-roll';
import { LuSearch } from 'react-icons/lu';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function MenusContent() {
  const [menusResult, statsResult] = await Promise.all([
    listMenus(),
    getMenuStats(),
  ]);

  const menus = menusResult.status === 'success' ? menusResult.data?.menus || [] : [];
  const stats = statsResult.status === 'success' ? statsResult.data ?? null : null;

  return (
    <MenusClient
      initialMenus={menus}
      stats={stats}
    />
  );
}

function MenusSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-slate-700 rounded animate-pulse" />
        <div className="h-10 w-32 bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-slate-800 rounded-lg p-4 space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 bg-slate-700 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function MenusPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Menus</TextRoll>
          </h1>
        </div>
        
        {/* Search Form */}
        <form action={`/admin/menus`} method="GET" className="flex gap-2 max-w-sm">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="search"
              placeholder="Buscar menus..."
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
      </div>

      <Suspense fallback={<MenusSkeleton />}>
        <MenusContent />
      </Suspense>
    </div>
  );
}
