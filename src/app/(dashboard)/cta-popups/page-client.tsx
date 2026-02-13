'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { LuBell, LuCheck, LuX, LuClock, LuFilter } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { CTAPopupTable } from '@/components/cta-popups/cta-popup-table';
import { CTAPopupFormModal } from '@/components/cta-popups/cta-popup-form-modal';
import { CTAPopupPreview } from '@/components/cta-popups/cta-popup-preview';
import type { CTAPopupData } from './actions';
import { deletePopupsBulk, selectAllPopupIds } from './actions';
import { PaginationControls } from '@/components/ui/pagination-controls';

interface PopupsData {
  popups: CTAPopupData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  pages: number;
}

interface StatsData {
  total: number;
  active: number;
  inactive: number;
  scheduled: number;
}

interface CTAPopupsPageClientProps {
  searchParams: {
    status?: string;
    search?: string;
    page?: string;
    pageSize?: string;
  };
  popupsData: PopupsData;
  statsData: StatsData | null;
}

export function CTAPopupsPageClient({ searchParams, popupsData, statsData }: CTAPopupsPageClientProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  // eslint-disable-next-line no-console
  console.log('[CTAPopupsPageClient] Rendering with data:', {
    popupsCount: popupsData?.popups?.length,
    total: popupsData?.total,
    stats: statsData,
    popups: popupsData?.popups
  });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[CTAPopupsPageClient] Mounted', {
      hasRef: !!tableContainerRef.current
    });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPopup, setSelectedPopup] = useState<CTAPopupData | undefined>();
  const [previewPopup, setPreviewPopup] = useState<CTAPopupData | null>(null);

  const { popups, total, page: currentPage, pageSize } = popupsData;
  const status = searchParams.status;
  const page = parseInt(searchParams.page || String(currentPage || 1), 10);
  const currentPageSize = pageSize || parseInt(searchParams.pageSize || '10', 10);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const selectionBarRef = useRef<HTMLDivElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const handleStatusFilter = (newStatus: string) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    if (newStatus === 'all') {
      params.delete('status');
    } else {
      params.set('status', newStatus);
    }
    params.delete('page'); // Reset to page 1
    router.push(`/admin/cta-popups?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/admin/cta-popups?${params.toString()}`);
  };

  const handlePageSizeChange = (size: number) => {
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set('pageSize', size.toString());
    params.delete('page');
    router.push(`/admin/cta-popups?${params.toString()}`);
  };

  const handleOpenModal = () => {
    setSelectedPopup(undefined);
    setIsModalOpen(true);
  };

  const handleEditPopup = (popup: CTAPopupData) => {
    setSelectedPopup(popup);
    setIsModalOpen(true);
  };

  const handlePreviewPopup = (popup: CTAPopupData) => {
    setPreviewPopup(popup);
  };

  const handleClosePreview = () => {
    setPreviewPopup(null);
  };

  const handleModalSuccess = () => {
    router.refresh();
  };

  const handleRefresh = () => {
    router.refresh();
  };

  const handleClearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleExitSelectionMode = useCallback(() => {
    setSelectedIds([]);
    setSelectionMode(false);
  }, []);

  const handleSelectPageItems = useCallback(() => {
    if (!popups.length) return;
    setSelectedIds(popups.map((p) => p.id));
  }, [popups]);

  const handleSelectAll = useCallback(async () => {
    const statusParam = currentSearchParams.get('status') || 'all';
    const search = currentSearchParams.get('search') || undefined;

    const result = await selectAllPopupIds({
      status: statusParam as 'active' | 'inactive' | 'all',
      search,
    });

    if (result.status === 'success' && result.data) {
      setSelectedIds(result.data.ids);
    }
  }, [currentSearchParams]);

  const handleDeleteSelected = useCallback(async () => {
    if (!selectedIds.length || isBulkDeleting) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja deletar ${selectedIds.length} ${selectedIds.length === 1 ? 'popup selecionado' : 'popups selecionados'}?`
    );

    if (!confirmed) return;

    setIsBulkDeleting(true);
    try {
      const result = await deletePopupsBulk({ ids: selectedIds });
      if (result.status === 'success') {
        handleExitSelectionMode();
        router.refresh();
        return;
      }
      alert(result.error || 'Erro ao deletar popups selecionados');
    } finally {
      setIsBulkDeleting(false);
    }
  }, [handleExitSelectionMode, isBulkDeleting, router, selectedIds]);

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

  return (
    <>
      {/* Stats Cards (igual Posts) */}
      {statsData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-600/20">
                <LuBell className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{statsData.total}</p>
                <p className="text-xs text-gray-600 dark:text-slate-400">Total de popups</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-600/20">
                <LuCheck className="h-5 w-5 text-green-700 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{statsData.active}</p>
                <p className="text-xs text-gray-600 dark:text-slate-400">Ativos</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-600/20">
                <LuX className="h-5 w-5 text-red-700 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{statsData.inactive}</p>
                <p className="text-xs text-gray-600 dark:text-slate-400">Inativos</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-600/20">
                <LuClock className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{statsData.scheduled}</p>
                <p className="text-xs text-gray-600 dark:text-slate-400">Agendados</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Controles: Filtros | Itens + Botão Novo Popup (Desktop) */}
      {!selectionMode && (
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Abas de filtro */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {([
                { key: 'all', label: 'Todos', icon: <LuFilter className="h-4 w-4" /> },
                { key: 'active', label: 'Ativos', icon: <LuCheck className="h-4 w-4" /> },
                { key: 'inactive', label: 'Inativos', icon: <LuX className="h-4 w-4" /> },
              ] as const).map((tab) => {
                const isActive = (tab.key === 'all' && !status) || status === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => handleStatusFilter(tab.key)}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                      isActive
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                    )}
                    aria-label={`Filtrar por ${tab.label.toLowerCase()}${isActive ? ' (ativo)' : ''}`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Itens por página */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-800 dark:text-slate-300">
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[10, 50, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? total : (option as number);
                  const isActive = value === currentPageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handlePageSizeChange(value)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option} popups por página${isActive ? ' (selecionado)' : ''}`}
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
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <span>Modo de Seleção</span>
                <span className="text-xs opacity-75"> ({total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleOpenModal}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              + Novo Popup
            </button>
          </div>
        </div>
      )}

      {/* Barra de Controles: Filtros | Itens + Botão Novo Popup (Mobile) */}
      {!selectionMode && (
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            {/* Abas e Itens por Página - Mesma Div Centralizada */}
            <div className="flex flex-wrap items-center justify-center gap-4 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {/* Abas de filtro */}
              <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                {([
                  { key: 'all', label: 'Todos', icon: <LuFilter className="h-4 w-4" /> },
                  { key: 'active', label: 'Ativos', icon: <LuCheck className="h-4 w-4" /> },
                  { key: 'inactive', label: 'Inativos', icon: <LuX className="h-4 w-4" /> },
                ] as const).map((tab) => {
                  const isActive = (tab.key === 'all' && !status) || status === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => handleStatusFilter(tab.key)}
                      className={cn(
                        'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                        isActive
                          ? 'bg-[var(--primary)] text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                      )}
                      aria-label={`Filtrar por ${tab.label.toLowerCase()}${isActive ? ' (ativo)' : ''}`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Itens por página */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-800 dark:text-slate-300">
                <span>Itens:</span>
                <div className="flex items-center gap-1">
                  {[10, 50, 'TODOS'].map((option) => {
                    const value = option === 'TODOS' ? total : (option as number);
                    const isActive = value === currentPageSize;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handlePageSizeChange(value)}
                        className={cn(
                          'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                          isActive
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                            : 'border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                        )}
                        aria-label={`${option} popups por página${isActive ? ' (selecionado)' : ''}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
              >
                <span>Modo de Seleção</span>
                <span className="text-xs opacity-75"> ({total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleOpenModal}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              + Novo Popup
            </button>
          </div>
        </div>
      )}

      {selectionMode && (
        <div ref={selectionBarRef} className="sticky top-0 z-40 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-gray-100 dark:from-slate-800 to-gray-50 dark:to-slate-800/80 rounded-lg border border-[var(--primary)]/30 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/50">
                  <span className="text-lg font-bold text-[var(--primary)]">{selectedIds.length}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {selectedIds.length} {selectedIds.length === 1 ? 'popup selecionado' : 'popups selecionados'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-slate-400">
                    {total > selectedIds.length && `${total - selectedIds.length} disponível para seleção`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={selectedIds.length === 0 || isBulkDeleting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isBulkDeleting ? 'Deletando...' : `Deletar ${selectedIds.length}`}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-slate-700/50">
              <button
                type="button"
                onClick={handleSelectPageItems}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Página ({popups.length})
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
      <div ref={tableContainerRef}>
        <CTAPopupTable
          popups={popups}
          onEditPopup={handleEditPopup}
          onPreviewPopup={handlePreviewPopup}
          onRefresh={handleRefresh}
          selectable={selectionMode}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>

      {/* Pagination */}
      {total > 0 && (
        <div className="pt-2">
          <PaginationControls
            page={currentPage || page}
            pageSize={currentPageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 20, 50, 'TODOS']}
          />
        </div>
      )}

      {/* Modal de Criação/Edição - Preserva estado com Activity */}
      <CTAPopupFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        initialData={selectedPopup}
      />

      {/* Preview do Popup */}
      {previewPopup && (
        <CTAPopupPreview popup={previewPopup} onClose={handleClosePreview} />
      )}
    </>
  );
}
