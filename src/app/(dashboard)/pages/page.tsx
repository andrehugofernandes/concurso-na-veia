'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuLoader, LuFilter, LuSearch, LuFileText, LuCheck, LuClock, LuArchive } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { PageTable, type Page } from '@/components/pages/page-table';
import { TextRoll } from '@/components/core/text-roll';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { PageFormModal } from '@/components/pages/page-form-modal';
import { 
  deletePage, 
  deletePagesBulk,
  listPages, 
  getPageStats,
  selectAllPageIds,
  type PageActionResponse,
  type PageListItem,
} from '@/app/actions/pages';

interface DeleteState {
  isDeletingId: string | null;
  statusMessage: string | null;
}

interface PageFilters {
  status?: string;
  search?: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PageFilters>({});

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const selectionBarRef = useRef<HTMLDivElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const loadPagesRequestIdRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | undefined>(undefined);

  const [stats, setStats] = useState<{
    total: number;
    published: number;
    draft: number;
    archived: number;
  } | null>(null);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [deleteState, setDeleteState] = useState<DeleteState>({
    isDeletingId: null,
    statusMessage: null,
  });

  // Carregar estatísticas de páginas
  useEffect(() => {
    getPageStats().then((result) => {
      if (result.status === 'success' && result.data) {
        setStats(result.data);
      }
    });
  }, []);

  // Carregar páginas do banco de dados
  const loadPages = useCallback(async (targetPage: number, targetPageSize: number, activeFilters: PageFilters = {}) => {
    const requestId = (loadPagesRequestIdRef.current += 1);
    setIsLoading(true);
    setError(null);
    try {
      const result = await listPages({
        page: targetPage,
        pageSize: targetPageSize,
        status: activeFilters.status as 'all' | 'published' | 'draft' | 'archived' | undefined,
        search: activeFilters.search || undefined,
      });

      if (requestId !== loadPagesRequestIdRef.current) {
        return;
      }

      if (result.status === 'success' && result.data) {
        const mappedPages: Page[] = result.data.pages.map((p: PageListItem) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          status: p.status as 'published' | 'draft' | 'archived',
          authorName: p.authorName || undefined,
          parentTitle: p.parentTitle || undefined,
          parentId: p.parentId || undefined,
          template: p.template || 'default',
          content: p.content || undefined,
          updatedAt: p.updatedAt,
        }));
        setPages(mappedPages);
        setTotal(result.data.total);
        setPage(result.data.page);
        setPageSize(result.data.pageSize);
      } else {
        setError(result.error || 'Erro ao carregar páginas');
      }
    } catch {
      if (requestId !== loadPagesRequestIdRef.current) {
        return;
      }
      setError('Erro ao carregar páginas');
    } finally {
      if (requestId === loadPagesRequestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // Carregar páginas na inicialização
  useEffect(() => {
    void loadPages(page, pageSize, filters);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      void loadPages(newPage, pageSize, filters);
    },
    [loadPages, pageSize, filters]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      setPageSize(newSize);
      setPage(1);
      void loadPages(1, newSize, filters);
    },
    [loadPages, filters]
  );

  const handleApplyFilters = useCallback(() => {
    setPage(1);
    void loadPages(1, pageSize, filters);
  }, [loadPages, pageSize, filters]);

  const activeStatusTab = filters.status || 'all';

  const handleDeletePage = async (id: string): Promise<PageActionResponse> => {
    const previousPages = pages;

    setDeleteState({
      isDeletingId: id,
      statusMessage: null,
    });

    setPages(previousPages.filter((p) => p.id !== id));

    const response = await deletePage(id);

    if (response.status === 'error') {
      setPages(previousPages);
      setDeleteState({
        isDeletingId: null,
        statusMessage: response.error?.message ?? 'Erro ao deletar página.',
      });
      return response;
    }

    setDeleteState({
      isDeletingId: null,
      statusMessage: 'Página deletada com sucesso.',
    });

    // Recarregar lista
    loadPages(page, pageSize, filters);

    return response;
  };

  // Handlers de seleção múltipla
  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  const handleSelectPageItems = useCallback(() => {
    const pageIds = pages.map((p) => p.id);
    setSelectedIds(pageIds);
  }, [pages]);

  const handleSelectAll = useCallback(async () => {
    const result = await selectAllPageIds({
      status: filters.status as 'all' | 'published' | 'draft' | 'archived' | undefined,
      search: filters.search || undefined,
    });

    if (result.status === 'success' && result.data) {
      setSelectedIds(result.data.ids);
    }
  }, [filters.search, filters.status]);

  const handleClearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleExitSelectionMode = useCallback(() => {
    setSelectedIds([]);
    setSelectionMode(false);
  }, []);

  useEffect(() => {
    if (!selectionMode) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const isInsideSelectionBar = selectionBarRef.current?.contains(target) ?? false;
      const isInsideTable = tableContainerRef.current?.contains(target) ?? false;

      if (isInsideSelectionBar || isInsideTable) {
        return;
      }

      handleExitSelectionMode();
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [handleExitSelectionMode, selectionMode]);

  const handleDeleteSelected = useCallback(async () => {
    if (!selectedIds.length) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja deletar ${selectedIds.length} página(s)? Esta ação é irreversível.`
    );

    if (!confirmed) return;

    setIsBulkDeleting(true);

    try {
      const result = await deletePagesBulk(selectedIds);

      if (result.status === 'success' && result.data) {
        handleExitSelectionMode();
        loadPages(page, pageSize, filters);
      }
    } finally {
      setIsBulkDeleting(false);
    }
  }, [selectedIds, loadPages, page, pageSize, filters, handleExitSelectionMode]);

  const handleEditPage = useCallback((pageToEdit: Page) => {
    setEditingPage(pageToEdit);
    setIsModalOpen(true);
  }, []);

  if (isLoading && pages.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <LuLoader className="h-8 w-8 animate-spin text-gray-400 dark:text-slate-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com Busca */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100"><TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Páginas</TextRoll></h1>
        </div>
        {/* Desktop: Form normal */}
        <form onSubmit={(e) => { e.preventDefault(); handleApplyFilters(); }} className="hidden md:flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value || undefined }))}
              placeholder="Buscar páginas..."
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
        <form onSubmit={(e) => { e.preventDefault(); handleApplyFilters(); }} className="md:hidden">
          <div className="relative" data-testid="mobile-search-input">
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value || undefined }))}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={(e) => {
                if (!e.target.value) {
                  setIsSearchFocused(false);
                }
              }}
              className="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
              placeholder="Buscar páginas..."
              aria-label="Buscar páginas"
              title="Buscar páginas"
              data-testid="mobile-search-field"
            />
            <label 
              className={cn(
                'pointer-events-none absolute origin-left text-base left-3 bg-white dark:bg-slate-900 px-1 transition-all duration-200 ease-in-out',
                isSearchFocused || filters.search
                  ? 'top-0 -translate-y-1/2 scale-75' 
                  : 'top-1/2 -translate-y-1/2 scale-100'
              )}
              style={{ zIndex: 50 }}
              data-testid="mobile-search-label"
            >
              <span className={cn(
                'inline-block rounded px-1 transition-colors',
                isSearchFocused || filters.search
                  ? 'border border-[var(--primary)] text-[var(--primary)]' 
                  : 'border-transparent text-gray-500 dark:text-slate-400'
              )}>
                Buscar páginas
              </span>
            </label>
          </div>
        </form>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <LuFileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Total de páginas</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600/20">
                <LuCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.published}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Publicadas</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-600/20">
                <LuClock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.draft}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Rascunhos</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-600/20">
                <LuArchive className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.archived}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Arquivadas</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header de Filtros e Controles */}
      {/* Header de Filtros e Controles - Desktop */}
      {!selectionMode && (
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Abas - Centralizadas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {([
                { value: 'all', label: 'Todos', icon: LuFilter },
                { value: 'published', label: 'Publicadas', icon: LuCheck },
                { value: 'draft', label: 'Rascunhos', icon: LuClock },
                { value: 'archived', label: 'Arquivadas', icon: LuArchive },
              ] as const).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    const nextFilters: PageFilters = {
                      ...filters,
                      status: tab.value === 'all' ? undefined : tab.value,
                    };
                    setFilters(nextFilters);
                    setPage(1);
                    void loadPages(1, pageSize, nextFilters);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    activeStatusTab === tab.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-label={`Filtrar por ${tab.label}`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Itens por Página */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
              <span className="hidden sm:inline">Itens:</span>
              <div className="flex items-center gap-1">
                {[10, 20, 50, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? total : (option as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handlePageSizeChange(value)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option} páginas por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Nova Página</span>
              <span className="sm:hidden">Nova</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile: Layout com lados separados */}
      {!selectionMode && (
        <div className="lg:hidden flex flex-col gap-4">
          {/* Abas e Itens por Página - Um abaixo do outro */}
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Abas de filtro */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {([
                { value: 'all', label: 'Todos', icon: LuFilter },
                { value: 'published', label: 'Publicadas', icon: LuCheck },
                { value: 'draft', label: 'Rascunhos', icon: LuClock },
                { value: 'archived', label: 'Arquivadas', icon: LuArchive },
              ] as const).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    const nextFilters: PageFilters = {
                      ...filters,
                      status: tab.value === 'all' ? undefined : tab.value,
                    };
                    setFilters(nextFilters);
                    setPage(1);
                    void loadPages(1, pageSize, nextFilters);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    activeStatusTab === tab.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-label={`Filtrar por ${tab.label}`}
                >
                  <tab.icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Itens por Página */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[10, 20, 50, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? total : (option as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handlePageSizeChange(value)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option} páginas por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus className="w-5 h-5" />
              Nova Página
            </button>
          </div>
        </div>
      )}

      {/* Barra de Seleção em Massa */}
      {selectionMode && (
        <div
          ref={selectionBarRef}
          className="sticky top-0 z-40 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-gray-100 dark:from-slate-800 to-gray-50 dark:to-slate-800/80 rounded-lg border border-[var(--primary)]/30 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/50">
                  <span className="text-lg font-bold text-[var(--primary)]">{selectedIds.length}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {selectedIds.length} {selectedIds.length === 1 ? 'página selecionada' : 'páginas selecionadas'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {total > selectedIds.length && `${total - selectedIds.length} disponível para seleção`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={!selectedIds.length || isBulkDeleting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isBulkDeleting ? 'Deletando...' : `Deletar ${selectedIds.length}`}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={handleSelectPageItems}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Página ({pages.length})
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Todos ({total})
              </button>
              <button
                type="button"
                onClick={handleClearSelection}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={handleExitSelectionMode}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div
        ref={tableContainerRef}
        className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md dark:shadow-none"
      >
        <PageTable
          pages={pages}
          onDelete={handleDeletePage}
          onEdit={handleEditPage}
          isLoading={isLoading}
          isDeletingId={deleteState.isDeletingId}
          statusMessage={deleteState.statusMessage}
          selectable={selectionMode}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {/* Pagination Controls */}
      {total > 0 && (
        <div className="pt-2">
          <PaginationControls
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 20, 50, 'TODOS']}
          />
        </div>
      )}

      <PageFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPage(undefined);
        }}
        onSuccess={() => {
          setIsModalOpen(false);
          setEditingPage(undefined);
          loadPages(page, pageSize, filters);
        }}
        initialData={editingPage ? {
          id: editingPage.id,
          title: editingPage.title,
          slug: editingPage.slug,
          content: editingPage.content || '',
          status: editingPage.status,
          parentId: editingPage.parentId ?? undefined,
          template: editingPage.template,
        } : undefined}
      />
    </div>
  );
}


