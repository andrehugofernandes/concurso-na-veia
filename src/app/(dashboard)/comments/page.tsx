import { Suspense } from 'react';
import {
  LuMessageSquare,
  LuSearch,
  LuFilter,
  LuCheck,
  LuClock3,
  LuOctagon,
  LuTrash2,
} from 'react-icons/lu';
import { listComments, getCommentStats } from './actions';
import { TextRoll } from '@/components/core/text-roll';
import { CommentTable } from '@/components/comments/comment-table';
import { CommentsPagination } from '@/components/comments/comments-pagination';
import { CommentsPageSizeControls } from '@/components/comments/comments-page-size-controls';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
    pageSize?: string;
  }>;
}

async function CommentsContent({
  status,
  search,
  page,
  pageSize,
}: {
  status?: string | undefined;
  search?: string | undefined;
  page: number;
  pageSize: number;
}) {
  const result = await listComments({
    status: (status as 'pending' | 'approved' | 'spam' | 'trash' | undefined) || undefined,
    search: search || undefined,
    page,
    pageSize,
  });

  if (result.status === 'error') {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 text-red-400">
        Erro ao carregar comentários: {result.error}
      </div>
    );
  }

  const { comments, total, page: currentPage, pageSize: currentPageSize } = result.data!;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsSection />

      {/* Header de Filtros e Controles (Desktop) */}
      <div className="hidden lg:flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Abas */}
          <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            {[
              { key: 'all', label: 'Todos', Icon: LuFilter },
              { key: 'approved', label: 'Aprovados', Icon: LuCheck },
              { key: 'pending', label: 'Pendentes', Icon: LuClock3 },
              { key: 'spam', label: 'Spam', Icon: LuOctagon },
              { key: 'trash', label: 'Lixo', Icon: LuTrash2 },
            ].map((tab) => {
              const isActive = (tab.key === 'all' && !status) || status === tab.key;
              const href = tab.key === 'all' ? '/admin/comments' : `/admin/comments?status=${tab.key}`;

              return (
                <a
                  key={tab.key}
                  href={href}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md ${isActive
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  aria-label={`Filtrar comentários ${tab.label.toLowerCase()}${isActive ? ' (ativo)' : ''}`}
                >
                  <tab.Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </a>
              );
            })}
          </div>

          <CommentsPageSizeControls currentPageSize={currentPageSize} />
        </div>
      </div>

      {/* Header de Filtros e Controles (Mobile) */}
      <div className="lg:hidden flex flex-col gap-4">
        <div className="flex flex-col gap-4 items-center justify-center">
          {/* Abas */}
          <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            {[
              { key: 'all', label: 'Todos', Icon: LuFilter },
              { key: 'approved', label: 'Aprovados', Icon: LuCheck },
              { key: 'pending', label: 'Pendentes', Icon: LuClock3 },
              { key: 'spam', label: 'Spam', Icon: LuOctagon },
              { key: 'trash', label: 'Lixo', Icon: LuTrash2 },
            ].map((tab) => {
              const isActive = (tab.key === 'all' && !status) || status === tab.key;
              const href = tab.key === 'all' ? '/admin/comments' : `/admin/comments?status=${tab.key}`;

              return (
                <a
                  key={tab.key}
                  href={href}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md ${isActive
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  aria-label={`Filtrar comentários ${tab.label.toLowerCase()}${isActive ? ' (ativo)' : ''}`}
                >
                  <tab.Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </a>
              );
            })}
          </div>

          <CommentsPageSizeControls currentPageSize={currentPageSize} />
        </div>
      </div>

      {/* Table */}
      <CommentTable comments={comments} />

      {/* Pagination */}
      <div className="pt-2">
        <CommentsPagination total={total} page={currentPage} pageSize={currentPageSize} />
      </div>

      {/* Info */}
      <div className="text-center text-sm text-gray-600 dark:text-slate-400">
        Mostrando {comments.length} de {total} comentários
      </div>
    </div>
  );
}

function CommentsSkeleton() {
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

async function StatsSection() {
  const result = await getCommentStats();

  if (result.status === 'error') {
    return null;
  }

  const { total, pending, approved, spam } = result.data!;

  const stats = [
    {
      label: 'Total',
      value: total,
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgIcon: 'bg-blue-600/15',
    },
    {
      label: 'Pendentes',
      value: pending,
      iconColor: 'text-yellow-500 dark:text-yellow-400',
      bgIcon: 'bg-yellow-600/15',
    },
    {
      label: 'Aprovados',
      value: approved,
      iconColor: 'text-green-500 dark:text-green-400',
      bgIcon: 'bg-green-600/15',
    },
    {
      label: 'Spam',
      value: spam,
      iconColor: 'text-red-500 dark:text-red-400',
      bgIcon: 'bg-red-600/15',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg dark:shadow-none"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgIcon}`} aria-hidden>
              <LuMessageSquare className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function CommentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status;
  const search = params.search;
  const page = parseInt(params.page || '1', 10);
  const pageSize = parseInt(params.pageSize || '20', 10);

  return (
    <div className="space-y-6">
      {/* Page Header + Busca no mesmo bloco */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Comentários</TextRoll>
          </h1>
        </div>
        <form action="/admin/comments" method="GET" className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
            <input
              type="text"
              name="search"
              defaultValue={search || ''}
              placeholder="Buscar por autor, email ou conteúdo..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 
              focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>

      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsContent status={status} search={search} page={page} pageSize={pageSize} />
      </Suspense>
    </div>
  );
}
