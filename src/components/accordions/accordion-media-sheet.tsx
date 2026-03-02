'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LuFile, LuImage, LuLoader, LuPencil, LuSearch, LuUpload, LuX } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ModalHeader } from '@/components/ui/modal-header';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaUploader } from '@/components/media/media-uploader';
import { MediaDetailsDialog } from '@/components/media/media-details-dialog';
import { listMedia, type MediaAsset } from '@/app/admin/media/actions';

const PAGE_SIZE = 24;

export type AccordionMediaMode = 'files' | 'images';

export type AccordionMediaAssetDraft = {
  mediaId: number;
  order: number;
  displayLabel: string | null;
  caption: string | null;
};

interface AccordionMediaSheetProps {
  isOpen: boolean;
  onClose: () => void;
  mode: AccordionMediaMode;
  initialAssets?: Array<{
    mediaId: number;
    displayLabel?: string | null;
    caption?: string | null;
  }>;
  onConfirm: (assets: AccordionMediaAssetDraft[]) => void;
}

type TabId = 'library' | 'upload';

type SelectedMeta = {
  displayLabel: string;
  caption: string;
};

const IMAGE_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
  'image/heic',
  'image/heif',
];

const FILE_ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'application/zip',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
];

export function AccordionMediaSheet({
  isOpen,
  onClose,
  mode,
  initialAssets = [],
  onConfirm,
}: AccordionMediaSheetProps) {
  const [activeTab, setActiveTab] = useState<TabId>('library');

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  const [mediaItems, setMediaItems] = useState<MediaAsset[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasMore = mediaItems.length < total;

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedMetaById, setSelectedMetaById] = useState<Record<number, SelectedMeta>>({});

  const [editingMedia, setEditingMedia] = useState<MediaAsset | null>(null);

  const icon = mode === 'images' ? <LuImage className="h-6 w-6" /> : <LuFile className="h-6 w-6" />;
  const title = mode === 'images' ? 'Mídias do item (Imagens)' : 'Mídias do item (Arquivos)';

  const mimeTypeFilter = mode === 'images' ? 'image' : 'application';

  const acceptedTypes = mode === 'images' ? IMAGE_ACCEPTED_TYPES : FILE_ACCEPTED_TYPES;

  const selectedCountLabel = useMemo(() => {
    if (selectedIds.length === 0) return 'Nenhuma mídia selecionada';
    if (selectedIds.length === 1) return '1 mídia selecionada';
    return `${selectedIds.length} mídias selecionadas`;
  }, [selectedIds.length]);

  const loadInitial = useCallback(
    async (searchTerm: string) => {
      setIsLoading(true);
      setError(null);
      setPage(1);

      try {
        const result = await listMedia({
          page: 1,
          pageSize: PAGE_SIZE,
          sortBy: 'uploadedAt',
          sortOrder: 'desc',
          search: searchTerm || undefined,
          mimeType: mimeTypeFilter,
        });

        if (result.status === 'success' && result.data) {
          setMediaItems(result.data.items ?? []);
          setTotal(result.data.total ?? 0);
          return;
        }

        setMediaItems([]);
        setTotal(0);
        setError(result.error || 'Erro ao carregar mídias');
      } finally {
        setIsLoading(false);
      }
    },
    [mimeTypeFilter]
  );

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const nextPage = page + 1;
      const result = await listMedia({
        page: nextPage,
        pageSize: PAGE_SIZE,
        sortBy: 'uploadedAt',
        sortOrder: 'desc',
        search: debouncedSearch || undefined,
        mimeType: mimeTypeFilter,
      });

      if (result.status === 'success' && result.data) {
        setMediaItems((prev) => [...prev, ...(result.data?.items ?? [])]);
        setTotal(result.data.total ?? 0);
        setPage(nextPage);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }, [debouncedSearch, hasMore, isLoadingMore, mimeTypeFilter, page]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Initial load when opening
  useEffect(() => {
    if (!isOpen) return;

    setActiveTab('library');
    setPage(1);
    setSearch('');
    setDebouncedSearch('');

    const nextSelectedIds = initialAssets.map((asset) => asset.mediaId);
    setSelectedIds(nextSelectedIds);

    const nextMeta: Record<number, SelectedMeta> = {};
    for (const asset of initialAssets) {
      nextMeta[asset.mediaId] = {
        displayLabel: asset.displayLabel ?? '',
        caption: asset.caption ?? '',
      };
    }
    setSelectedMetaById(nextMeta);

    void loadInitial('');
  }, [initialAssets, isOpen, loadInitial]);

  // Reload when search changes (debounced)
  useEffect(() => {
    if (!isOpen) return;
    if (activeTab !== 'library') return;

    void loadInitial(debouncedSearch);
  }, [activeTab, debouncedSearch, isOpen, loadInitial]);

  // Infinite scroll handler
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;

      if (scrollBottom < 200 && hasMore && !isLoadingMore) {
        void loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore]
  );

  const handleSelectionChange = useCallback(
    (ids: number[]) => {
      setSelectedIds(ids);

      setSelectedMetaById((prev) => {
        const next = { ...prev };

        for (const id of ids) {
          if (!next[id]) {
            const media = mediaItems.find((m) => m.id === id);
            next[id] = {
              displayLabel: media?.originalFilename ?? '',
              caption: '',
            };
          }
        }

        return next;
      });
    },
    [mediaItems]
  );

  const handleOpenMediaDetails = useCallback(
    (mediaId: number) => {
      const media = mediaItems.find((m) => m.id === mediaId);
      if (!media) {
        return;
      }
      setEditingMedia(media);
    },
    [mediaItems]
  );

  const handleConfirm = useCallback(() => {
    const assets: AccordionMediaAssetDraft[] = selectedIds.map((mediaId, index) => {
      const meta = selectedMetaById[mediaId];
      const fallback = mediaItems.find((m) => m.id === mediaId)?.originalFilename ?? '';

      const displayLabel = (meta?.displayLabel ?? fallback).trim();
      const caption = (meta?.caption ?? '').trim();

      return {
        mediaId,
        order: index,
        displayLabel: displayLabel ? displayLabel : null,
        caption: caption ? caption : null,
      };
    });

    onConfirm(assets);
    onClose();
  }, [mediaItems, onClose, onConfirm, selectedIds, selectedMetaById]);

  const tabs = [
    { id: 'library' as const, label: 'Selecionar da biblioteca' },
    { id: 'upload' as const, label: 'Fazer upload' },
  ];

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-6xl h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
          <AnimatedBorder className="rounded-xl" />
          <ModalHeader icon={icon} title={title} description="Selecione, envie e edite mídias sem sair do fluxo" onClose={onClose} />

          <div className="px-6 pt-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-1 flex items-center gap-1">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-hidden px-6 py-6 flex flex-col gap-4">
            {activeTab === 'library' ? (
              <>
                {/* Input de busca centralizado */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-full max-w-md">
                    <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={mode === 'images' ? 'Buscar imagens...' : 'Buscar arquivos...'}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
                      aria-label="Buscar mídias"
                    />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-300">{selectedCountLabel}</div>
                </div>

                {error && (
                  <div role="alert" className="rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-3 min-h-0 overflow-hidden">
                    <div
                      ref={scrollContainerRef}
                      onScroll={handleScroll}
                      className="h-full overflow-y-auto pr-1"
                    >
                      <MediaGrid
                        items={mediaItems}
                        isLoading={isLoading}
                        selectable
                        selectedIds={selectedIds}
                        onSelectionChange={handleSelectionChange}
                        size="large"
                      />
                      {isLoadingMore && (
                        <div className="flex items-center justify-center py-4">
                          <LuLoader className="h-5 w-5 animate-spin text-gray-500 dark:text-slate-400" />
                          <span className="ml-2 text-sm text-gray-600 dark:text-slate-300">Carregando mais...</span>
                        </div>
                      )}
                      {!isLoading && !isLoadingMore && hasMore && (
                        <div className="text-center py-2 text-xs text-gray-400 dark:text-slate-500">
                          Role para carregar mais
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-2 min-h-0 overflow-y-auto pr-1">
                    <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">Configurar seleção</div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedIds([]);
                          }}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-700 text-sm hover:bg-gray-50 dark:hover:bg-slate-800"
                        >
                          <LuX className="h-4 w-4" aria-hidden="true" />
                          Limpar
                        </button>
                      </div>

                      {selectedIds.length === 0 ? (
                        <p className="text-sm text-gray-600 dark:text-slate-400">Selecione mídias na biblioteca para configurar.</p>
                      ) : (
                        <div className="space-y-3">
                          {selectedIds.map((mediaId) => {
                            const media = mediaItems.find((m) => m.id === mediaId);
                            const meta = selectedMetaById[mediaId];

                            return (
                              <div key={mediaId} className="rounded-md border border-gray-200 dark:border-slate-700 p-3 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="text-xs text-gray-500 dark:text-slate-400">Arquivo</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">
                                      {media?.originalFilename ?? `Mídia #${mediaId}`}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenMediaDetails(mediaId)}
                                    disabled={!media}
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-700 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50"
                                  >
                                    <LuPencil className="h-4 w-4" aria-hidden="true" />
                                    Editar mídia
                                  </button>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs text-gray-500 dark:text-slate-400">Label (botão)</label>
                                  <input
                                    type="text"
                                    value={meta?.displayLabel ?? media?.originalFilename ?? ''}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setSelectedMetaById((prev) => ({
                                        ...prev,
                                        [mediaId]: {
                                          displayLabel: value,
                                          caption: prev[mediaId]?.caption ?? '',
                                        },
                                      }));
                                    }}
                                    placeholder="Ex.: Baixar arquivo"
                                    aria-label={`Label do botão (mídia ${mediaId})`}
                                    className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs text-gray-500 dark:text-slate-400">Caption (opcional)</label>
                                  <input
                                    type="text"
                                    value={meta?.caption ?? ''}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setSelectedMetaById((prev) => ({
                                        ...prev,
                                        [mediaId]: {
                                          displayLabel: prev[mediaId]?.displayLabel ?? media?.originalFilename ?? '',
                                          caption: value,
                                        },
                                      }));
                                    }}
                                    placeholder="Legenda (opcional)"
                                    aria-label={`Caption (mídia ${mediaId})`}
                                    className="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={selectedIds.length === 0}
                    className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--primary)]/90"
                  >
                    Confirmar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-slate-100">
                    <LuUpload className="h-4 w-4" aria-hidden="true" />
                    Fazer upload
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                    Após o upload, volte para a aba “Selecionar da biblioteca” para escolher e configurar as mídias.
                  </p>
                </div>

                <MediaUploader
                  acceptedTypes={acceptedTypes}
                  onUploadComplete={() => {
                    setActiveTab('library');
                    void loadInitial(debouncedSearch);
                  }}
                />

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-sm"
                  >
                    Fechar
                  </button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {editingMedia && (
        <MediaDetailsDialog
          media={editingMedia}
          isOpen={!!editingMedia}
          onClose={() => setEditingMedia(null)}
          onUpdate={() => {
            void loadInitial(debouncedSearch);
          }}
        />
      )}
    </>
  );
}
