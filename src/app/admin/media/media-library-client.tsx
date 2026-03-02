'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  LuUpload,
  LuFilter,
  LuImage,
  LuVideo,
  LuMusic,
  LuFile,
  LuFileText,
  LuHardDrive,
  LuTrash2,
  LuCheck,
  LuLoader,
  LuTriangle,
  LuX,
} from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaUploader } from '@/components/media/media-uploader';
import { MediaDetailsDialog } from '@/components/media/media-details-dialog';
import { deleteMedia, deleteMediaBulk, deleteAllMedia, selectAllMediaIds } from './actions';
import type { MediaAsset } from './actions';
import { PaginationControls } from '@/components/ui/pagination-controls';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

interface TabData {
  key: string;
  items: MediaAsset[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  sortBy: 'uploadedAt' | 'originalFilename' | 'fileSize';
  sortOrder: 'asc' | 'desc';
  search: string;
}

interface MediaLibraryClientProps {
  tabsData: TabData[];
  stats: {
    total: number;
    totalSize: number;
    byType: Record<string, number>;
  } | null;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function MediaLibraryClient({
  tabsData,
  stats,
}: MediaLibraryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Estado de aba ativa - preservado com Activity para pre-rendering
  const [activeTab, setActiveTab] = useState<string>('all');

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);

  // Seleção em massa
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'processing' | 'completed'>('idle');

  const selectionBarRef = useRef<HTMLDivElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  // Dados da aba ativa
  const activeTabData = tabsData.find((tab) => tab.key === activeTab) || tabsData[0];

  const updateSearchParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset para página 1 quando filtros mudam
      if (!updates.page) {
        params.delete('page');
      }

      startTransition(() => {
        router.push(`/admin/media?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  const handleTypeFilter = useCallback(
    (type: string) => {
      setActiveTab(type === '' ? 'all' : type);
    },
    []
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateSearchParams({ page: page.toString() });
    },
    [updateSearchParams]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      updateSearchParams({ page: '1', pageSize: size.toString() });
    },
    [updateSearchParams]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      const shouldDelete = window.confirm(
        'Tem certeza que deseja deletar esta mídia? Esta ação é irreversível e pode remover o arquivo do Firebase Storage.'
      );

      if (!shouldDelete) {
        return;
      }

      startTransition(() => {
        deleteMedia(id).then((result) => {
          if (result.status === 'error') {
            // eslint-disable-next-line no-console
            console.error('Erro ao deletar:', result.error);
            return;
          }

          router.refresh();
        });
      });
    },
    [router, startTransition]
  );

  const handleUploadComplete = useCallback(() => {
    setIsUploadOpen(false);
    router.refresh();
  }, [router]);

  // Handlers de seleção em massa
  const handleSelectAll = useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log('[MediaLibrary] Selecionando todos os arquivos...');
    const currentSearch = searchParams.get('search') || undefined;
    const result = await selectAllMediaIds({ mimeType: activeTabData.key === 'all' ? undefined : activeTabData.key, search: currentSearch });
    if (result.status === 'success' && result.data) {
      setSelectedIds(result.data.ids);
      // eslint-disable-next-line no-console
      console.log(`[MediaLibrary] ${result.data.ids.length} arquivos selecionados`);
    }
  }, [activeTabData.key, searchParams]);

  const handleSelectPageItems = useCallback(() => {
    // Seleciona apenas os itens da página atual
    const pageIds = activeTabData.items.map((item: MediaAsset) => item.id);
    setSelectedIds(pageIds);
    // eslint-disable-next-line no-console
    console.log(`[MediaLibrary] ${pageIds.length} arquivos da página selecionados`);
  }, [activeTabData.items]);

  const handleClearSelection = useCallback(() => {
    setSelectedIds([]);
    // eslint-disable-next-line no-console
    console.log('[MediaLibrary] Seleção limpa');
  }, []);

  const handleExitSelectionMode = useCallback(() => {
    setSelectedIds([]);
    setSelectionMode(false);
    // eslint-disable-next-line no-console
    console.log('[MediaLibrary] Saindo do modo de seleção');
  }, []);

  useEffect(() => {
    if (!selectionMode) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const isInsideSelectionBar = selectionBarRef.current?.contains(target) ?? false;
      const isInsideGrid = gridContainerRef.current?.contains(target) ?? false;

      if (isInsideSelectionBar || isInsideGrid) {
        return;
      }

      handleExitSelectionMode();
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [handleExitSelectionMode, selectionMode]);

  const handleDeleteSelected = useCallback(async () => {
    if (selectedIds.length === 0) return;

    // eslint-disable-next-line no-console
    console.log(`[MediaLibrary] Iniciando deleção de ${selectedIds.length} arquivos...`);

    setIsDeleting(true);
    setDeleteStatus('processing');
    setDeleteProgress(0);
    const startTime = Date.now();

    try {
      // Processar em lotes de 500
      const BATCH_SIZE = 500;
      let totalDeleted = 0;
      let totalFailed = 0;
      const allErrors: string[] = [];

      for (let i = 0; i < selectedIds.length; i += BATCH_SIZE) {
        const batch = selectedIds.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(selectedIds.length / BATCH_SIZE);

        // eslint-disable-next-line no-console
        console.log(`[MediaLibrary] Processando lote ${batchNum}/${totalBatches} (${batch.length} itens)...`);

        const result = await deleteMediaBulk(batch);

        if (result.status === 'success' && result.data) {
          totalDeleted += result.data.deleted;
          totalFailed += result.data.failed;
          allErrors.push(...result.data.errors);
          // eslint-disable-next-line no-console
          console.log(`[MediaLibrary] Lote ${batchNum}: ${result.data.deleted} deletados, ${result.data.failed} falhas`);
        } else {
          // eslint-disable-next-line no-console
          console.error(`[MediaLibrary] ❌ Erro no lote ${batchNum}:`, result.error);
        }

        // Atualizar progresso
        const progress = Math.round(((i + batch.length) / selectedIds.length) * 100);
        setDeleteProgress(Math.min(progress, 100));
      }

      const elapsed = Date.now() - startTime;
      // eslint-disable-next-line no-console
      console.log(`[MediaLibrary] ✅ Deleção concluída em ${elapsed}ms - ${totalDeleted} deletados, ${totalFailed} falhas`);

      setDeleteProgress(100);
      setDeleteStatus('completed');

      // Aguardar um pouco antes de fechar o dialog
      await new Promise(resolve => setTimeout(resolve, 800));

      handleExitSelectionMode();
      setDeleteConfirmOpen(false);
      setDeleteStatus('idle');
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[MediaLibrary] ❌ Exceção na deleção:', error);
      setDeleteStatus('idle');
    } finally {
      setIsDeleting(false);
    }
  }, [handleExitSelectionMode, selectedIds, router]);

  const handleDeleteAll = useCallback(async () => {
    // eslint-disable-next-line no-console
    console.log(`[MediaLibrary] Iniciando deleção de TODOS os ${activeTabData.total} arquivos...`);

    setIsDeleting(true);
    const startTime = Date.now();

    try {
      const result = await deleteAllMedia();
      const elapsed = Date.now() - startTime;

      if (result.status === 'success' && result.data) {
        // eslint-disable-next-line no-console
        console.log(`[MediaLibrary] ✅ Deleção total concluída em ${elapsed}ms - ${result.data.deleted} deletados`);
      } else {
        // eslint-disable-next-line no-console
        console.error('[MediaLibrary] ❌ Erro na deleção total:', result.error);
      }
      handleExitSelectionMode();
      setDeleteConfirmOpen(false);
      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[MediaLibrary] ❌ Exceção na deleção total:', error);
    } finally {
      setIsDeleting(false);
    }
  }, [handleExitSelectionMode, router, activeTabData.total]);

  const handleSelectionChange = useCallback((ids: number[]) => {
    setSelectedIds(ids);
    // eslint-disable-next-line no-console
    console.log(`[MediaLibrary] Seleção alterada: ${ids.length} itens`);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <LuImage className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Total de arquivos</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <LuHardDrive className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  {formatBytes(stats.totalSize)}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Espaço utilizado</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600/20">
                <LuImage className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.byType.image || 0}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Imagens</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-600/20">
                <LuFile className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  {(stats.byType.video || 0) + (stats.byType.audio || 0) + (stats.byType.application || 0)}
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Outros arquivos</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar - Reorganizado com padrão de Posts (Desktop) */}
      {!selectionMode && (
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Abas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {[
                { value: 'all', label: 'Todos', icon: LuFilter },
                { value: 'image', label: 'Imagens', icon: LuImage },
                { value: 'video', label: 'Vídeos', icon: LuVideo },
                { value: 'audio', label: 'Áudio', icon: LuMusic },
                { value: 'application', label: 'Documentos', icon: LuFileText },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => handleTypeFilter(filter.value)}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    activeTab === filter.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-label={`Filtrar por ${filter.label.toLowerCase()}${activeTab === filter.value ? ' (ativo)' : ''}`}
                >
                  <filter.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{filter.label}</span>
                </button>
              ))}
            </div>

            {/* Itens por página */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[50, 100, 250, 500, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? activeTabData.total : (option as number);
                  const isActive = value === activeTabData.pageSize;
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
                      aria-label={`${option} mídias por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTabData.total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({activeTabData.total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white font-medium flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <LuUpload className="h-4 w-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      )}

      {/* Toolbar - Reorganizado com padrão de Posts (Mobile) */}
      {!selectionMode && (
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            {/* Abas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {[
                { value: 'all', label: 'Todos', icon: LuFilter },
                { value: 'image', label: 'Imagens', icon: LuImage },
                { value: 'video', label: 'Vídeos', icon: LuVideo },
                { value: 'audio', label: 'Áudio', icon: LuMusic },
                { value: 'application', label: 'Documentos', icon: LuFileText },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => handleTypeFilter(filter.value)}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    activeTab === filter.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-label={`Filtrar por ${filter.label.toLowerCase()}${activeTab === filter.value ? ' (ativo)' : ''}`}
                >
                  <filter.icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Itens por página */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[50, 100, 250, 500, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? activeTabData.total : (option as number);
                  const isActive = value === activeTabData.pageSize;
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
                      aria-label={`${option} mídias por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {activeTabData.total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({activeTabData.total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white font-medium flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <LuUpload className="h-4 w-4" />
              <span>Upload</span>
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
          <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-800/80 rounded-lg border border-[var(--primary)]/30 shadow-lg backdrop-blur-sm">
            {/* Linha 1: Contador e Ações de Seleção */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/50">
                  <span className="text-lg font-bold text-[var(--primary)]">{selectedIds.length}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {selectedIds.length} {selectedIds.length === 1 ? 'arquivo selecionado' : 'arquivos selecionados'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-slate-400">
                    {activeTabData.total > selectedIds.length && `${activeTabData.total - selectedIds.length} disponível para seleção`}
                  </p>
                </div>
              </div>

              {/* Botão Deletar Principal */}
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(true)}
                disabled={selectedIds.length === 0 || isDeleting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isDeleting ? (
                  <>
                    <LuLoader className="h-4 w-4 animate-spin" />
                    <span>Deletando...</span>
                  </>
                ) : (
                  <>
                    <LuTrash2 className="h-4 w-4" />
                    <span>Deletar {selectedIds.length}</span>
                  </>
                )}
              </button>
            </div>

            {/* Linha 2: Ações de Seleção */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={handleSelectPageItems}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Página ({activeTabData.items.length})
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Todos ({activeTabData.total})
              </button>
              <button
                type="button"
                onClick={handleClearSelection}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={handleExitSelectionMode}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Grid com Activity para pre-rendering */}
      <div ref={gridContainerRef}>
        <MediaGrid
          items={activeTabData.items}
          onViewDetails={selectionMode ? undefined : setSelectedMedia}
          onDelete={selectionMode ? undefined : handleDelete}
          isLoading={isPending}
          selectable={selectionMode}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {/* Pagination */}
      {activeTabData.total > 0 && (
        <div className="pt-2">
          <PaginationControls
            page={activeTabData.page}
            pageSize={activeTabData.pageSize}
            total={activeTabData.total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[50, 100, 250, 500, 'TODOS']}
          />
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-md h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-slate-700/50 bg-[var(--primary)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20">
                  <LuUpload className="h-5 w-5 text-white" />
                </div>
                <DialogTitle className="text-white text-lg font-semibold">
                  Upload de Arquivos
                </DialogTitle>
              </div>
              <DialogClose
                className="flex items-center justify-center w-10 h-10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar modal de upload"
              >
                <LuX className="h-5 w-5" />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-6 py-6 flex flex-col">
            <div className="flex-1 overflow-y-auto pr-1">
              <MediaUploader onUploadComplete={handleUploadComplete} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      {selectedMedia && (
        <MediaDetailsDialog
          media={selectedMedia}
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          onUpdate={() => router.refresh()}
        />
      )}

      {/* Dialog de Confirmação de Deleção em Massa - UI Profissional */}
      <Dialog open={deleteConfirmOpen} onOpenChange={(open) => !isDeleting && setDeleteConfirmOpen(open)}>
        <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-0 overflow-hidden">
          {/* Header com ícone de aviso */}
          <DialogHeader className="px-6 py-4 border-b border-gray-200 dark:border-slate-700/50 bg-gray-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/50">
                <LuTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <DialogTitle className="text-slate-100 text-lg">Confirmar Deleção em Massa</DialogTitle>
                <p className="text-xs text-slate-400 mt-0.5">Esta ação é irreversível</p>
              </div>
            </div>
          </DialogHeader>

          {/* Conteúdo */}
          <div className="px-6 py-6 space-y-6">
            {/* Mensagem de aviso */}
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-red-600/10 border border-red-600/30">
                <p className="text-sm text-gray-900 dark:text-slate-200">
                  Você está prestes a deletar <span className="font-bold text-red-400">{selectedIds.length}</span> {selectedIds.length === 1 ? 'arquivo' : 'arquivos'}.
                </p>
                <p className="text-xs text-gray-600 dark:text-slate-400 mt-2">
                  • Os arquivos serão removidos do Firebase Storage
                  <br />
                  • Esta ação não pode ser desfeita
                  <br />
                  • Não há backup automático
                </p>
              </div>
            </div>

            {/* Barra de Progresso (mostrada durante deleção) */}
            {isDeleting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-slate-300">Progresso da deleção</p>
                  <span className="text-sm font-semibold text-[var(--primary)]">{deleteProgress}%</span>
                </div>
                <progress
                  value={deleteProgress}
                  max={100}
                  className="w-full h-2 overflow-hidden rounded-full bg-slate-700 [&::-webkit-progress-bar]:bg-slate-700 [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-red-600 [&::-webkit-progress-value]:to-red-500 [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-gradient-to-r [&::-moz-progress-bar]:from-red-600 [&::-moz-progress-bar]:to-red-500"
                />
              </div>
            )}

            {/* Status de conclusão */}
            {deleteStatus === 'completed' && (
              <div className="p-4 rounded-lg bg-green-600/10 border border-green-600/30 flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600/30">
                  <LuCheck className="h-4 w-4 text-green-400" />
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">Deleção concluída com sucesso!</p>
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 active:bg-gray-300 dark:active:bg-slate-800 text-gray-800 dark:text-slate-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleteStatus === 'completed' ? 'Fechar' : 'Cancelar'}
              </button>
              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={isDeleting || deleteStatus === 'completed'}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isDeleting ? (
                  <>
                    <LuLoader className="h-4 w-4 animate-spin" />
                    <span>Deletando...</span>
                  </>
                ) : deleteStatus === 'completed' ? (
                  <>
                    <LuCheck className="h-4 w-4" />
                    <span>Concluído</span>
                  </>
                ) : (
                  <>
                    <LuTrash2 className="h-4 w-4" />
                    <span>Deletar {selectedIds.length}</span>
                  </>
                )}
              </button>
            </div>

            {/* Opção de deletar tudo */}
            {!isDeleting && selectedIds.length > 0 && selectedIds.length < activeTabData.total && (
              <div className="pt-4 border-t border-gray-200 dark:border-slate-700/50">
                <button
                  type="button"
                  onClick={handleDeleteAll}
                  className="w-full px-4 py-2.5 rounded-lg border border-red-600/50 text-red-600 dark:text-red-400 hover:bg-red-600/10 active:bg-red-600/20 transition-colors font-medium text-sm"
                >
                  Deletar TODOS os {activeTabData.total} arquivos da biblioteca
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

