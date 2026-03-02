'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LuImage, LuLoader, LuSearch, LuUpload } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ModalHeader } from '@/components/ui/modal-header';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { DynamicIsland } from '@/components/ui/dynamic-island';
import { MediaGrid } from '@/components/media/media-grid';
import { MediaUploader } from '@/components/media/media-uploader';
import { listMedia, type MediaAsset } from '@/app/admin/media/actions';

const PAGE_SIZE = 24;

function dedupeById(items: MediaAsset[]): MediaAsset[] {
  const map = new Map<number, MediaAsset>();
  for (const item of items) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }
  return Array.from(map.values());
}

interface FeaturedImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (media: MediaAsset) => void;
  initialMediaId?: number;
}

type TabId = 'library' | 'upload';

export function FeaturedImagePicker({
  isOpen,
  onClose,
  onConfirm,
  initialMediaId,
}: FeaturedImagePickerProps) {
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

  const [selectedId, setSelectedId] = useState<number | null>(initialMediaId ?? null);

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
          mimeType: 'image',
        });

        if (result.status === 'success' && result.data) {
          setMediaItems(dedupeById(result.data.items ?? []));
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
    []
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
        mimeType: 'image',
      });

      if (result.status === 'success' && result.data) {
        setMediaItems((prev) => {
          const map = new Map<number, MediaAsset>();
          for (const item of prev) {
            map.set(item.id, item);
          }
          for (const item of result.data?.items ?? []) {
            if (!map.has(item.id)) {
              map.set(item.id, item);
            }
          }
          return Array.from(map.values());
        });
        setTotal(result.data.total ?? 0);
        setPage(nextPage);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }, [debouncedSearch, hasMore, isLoadingMore, page]);

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
    setSelectedId(initialMediaId ?? null);

    void loadInitial('');
  }, [initialMediaId, isOpen, loadInitial]);

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

  const handleConfirm = useCallback(() => {
    if (selectedId === null) return;

    const media = mediaItems.find((m) => m.id === selectedId);
    if (!media) return;

    onConfirm(media);
    onClose();
  }, [mediaItems, onClose, onConfirm, selectedId]);

  const tabs = [
    { id: 'library' as const, label: 'Selecionar da biblioteca' },
    { id: 'upload' as const, label: 'Fazer upload' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-4xl h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
        <AnimatedBorder className="rounded-xl" />
        <ModalHeader
          icon={<LuImage className="h-6 w-6" />}
          title="Imagem de Destaque"
          description="Selecione ou envie uma imagem para destaque do post"
          onClose={onClose}
        />

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
              {/* Input de busca */}
              <DynamicIsland position="static" className="w-full">
                <div className="relative w-full">
                  <LuSearch className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar imagens..."
                    className="w-full px-3 py-4 pl-10 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
                    aria-label="Buscar imagens"
                  />
                </div>
              </DynamicIsland>

              {error && (
                <div role="alert" className="rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="flex-1 min-h-0 overflow-hidden">
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="h-full overflow-y-auto pr-1"
                >
                  <MediaGrid
                    items={mediaItems}
                    isLoading={isLoading}
                    selectable
                    selectedIds={selectedId ? [selectedId] : []}
                    onSelectionChange={(ids) => setSelectedId(ids[0] ?? null)}
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
                  disabled={selectedId === null}
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
                  Após o upload, volte para a aba "Selecionar da biblioteca" para escolher a imagem.
                </p>
              </div>

              <MediaUploader
                acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
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
  );
}
