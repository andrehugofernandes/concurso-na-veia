'use client';

import { LuFolderTree, LuCheck, LuFileText, LuLayers } from 'react-icons/lu';
import { CategoryTable } from '@/components/categories/category-table';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { CategoryFormModal } from '@/components/categories/category-form-modal';

interface CategoriesContentClientProps {
  search?: string;
  level?: string;
  page: number;
  pageSize: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  total: number;
  totalPages: number;
  stats: {
    total: number;
    rootCategories: number;
    withPosts: number;
    withChildren: number;
  };
}

export function CategoriesContentClient({
  search,
  level,
  page: currentPage,
  pageSize: currentPageSize,
  categories,
  total,
  totalPages,
  stats,
}: CategoriesContentClientProps) {
  return (
    <div className="space-y-6">
      {/* Stats Cards (igual Posts) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/10 dark:bg-blue-600/20">
              <LuFolderTree className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Total de categorias</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-600/10 dark:bg-green-600/20">
              <LuCheck className="h-5 w-5 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.rootCategories}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Categorias Raiz</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-600/10 dark:bg-purple-600/20">
              <LuFileText className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.withPosts}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Com Posts</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-600/10 dark:bg-yellow-600/20">
              <LuLayers className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.withChildren}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Com Subcategorias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Controles: Filtros | Itens + Botão Nova Categoria (igual Posts) */}
      <div className="flex items-center justify-between gap-4">
        {/* Esquerda: Level Tabs */}
        <div className="flex items-center gap-1">
          {(['all', 'root', 'child'] as const).map((l) => (
            <a
              key={l}
              href={`/admin/categories?level=${l}${search ? `&search=${search}` : ''}`}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                level === l || (!level && l === 'all')
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-slate-300'
              }`}
            >
              {l === 'all' ? 'Todas' : l === 'root' ? 'Raiz' : 'Subcategorias'}
            </a>
          ))}
        </div>

        {/* Direita: Itens por página + Botão Nova Categoria */}
        <div className="flex items-center gap-4">
          {/* Itens por página */}
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
            <span>Itens:</span>
            <div className="flex items-center gap-1">
              {[10, 20, 50, 'TODOS'].map((option) => {
                const value = option === 'TODOS' ? total : (option as number);
                const isActive = value === currentPageSize;
                return (
                  <a
                    key={option}
                    href={`/admin/categories?level=${level || 'all'}${search ? `&search=${search}` : ''}&page=1&pageSize=${value}`}
                    className={`inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {option}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Botão Nova Categoria */}
          <CategoryFormModal />
        </div>
      </div>

      {/* Table */}
      <CategoryTable
        categories={categories}
        _total={total}
        _page={currentPage}
        _pageSize={currentPageSize}
        _totalPages={totalPages}
      />

      {/* Pagination Controls */}
      {total > 0 && (
        <div className="pt-2">
          <PaginationControls
            page={currentPage}
            pageSize={currentPageSize}
            total={total}
            onPageChange={(newPage) => {
              const params = new URLSearchParams();
              params.set('page', newPage.toString());
              params.set('pageSize', currentPageSize.toString());
              if (search) params.set('search', search);
              if (level) params.set('level', level);
              window.location.href = `/admin/categories?${params.toString()}`;
            }}
            onPageSizeChange={(newSize) => {
              const params = new URLSearchParams();
              params.set('page', '1');
              params.set('pageSize', newSize.toString());
              if (search) params.set('search', search);
              if (level) params.set('level', level);
              window.location.href = `/admin/categories?${params.toString()}`;
            }}
            pageSizeOptions={[10, 20, 50, 100, 'TODOS']}
          />
        </div>
      )}
    </div>
  );
}
