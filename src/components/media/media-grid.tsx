'use client';

import { useState, useOptimistic, useCallback, useTransition, useMemo } from 'react';
import { LuTrash2, LuLoader, LuImage, LuFile, LuVideo, LuMusic } from 'react-icons/lu';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileAlt, FaFileArchive } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import type { MediaAsset } from '@/app/admin/media/actions';

interface MediaGridProps {
  items: MediaAsset[];
  onSelect?: (media: MediaAsset) => void;
  onDelete?: (id: number) => Promise<void>;
  onViewDetails?: (media: MediaAsset) => void;
  isLoading?: boolean;
  selectable?: boolean;
  selectedIds?: number[];
  onSelectionChange?: (ids: number[]) => void;
  size?: 'default' | 'large';
}

interface OptimisticItem extends MediaAsset {
  isDeleting?: boolean;
}

function getMediaIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return LuImage;
  if (mimeType.startsWith('video/')) return LuVideo;
  if (mimeType.startsWith('audio/')) return LuMusic;

  if (mimeType === 'application/pdf') return FaFilePdf;
  if (mimeType.includes('word') || mimeType.includes('document')) return FaFileWord;
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return FaFileExcel;
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return FaFilePowerpoint;
  if (mimeType === 'text/plain' || mimeType === 'text/csv') return FaFileAlt;
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) return FaFileArchive;

  return LuFile;
}

function getMediaBadge(
  mimeType: string
): { label: string; badgeClass: string; bgClass: string; iconClass: string } {
  if (mimeType.startsWith('image/')) {
    const ext = mimeType.split('/')[1]?.toUpperCase() || 'IMG';
    return {
      label: ext,
      badgeClass: 'bg-purple-600',
      bgClass: 'bg-purple-500/10',
      iconClass: 'text-purple-300',
    };
  }

  if (mimeType.startsWith('video/')) {
    return {
      label: 'VÍDEO',
      badgeClass: 'bg-red-600',
      bgClass: 'bg-red-500/10',
      iconClass: 'text-red-300',
    };
  }

  if (mimeType.startsWith('audio/')) {
    return {
      label: 'ÁUDIO',
      badgeClass: 'bg-blue-600',
      bgClass: 'bg-blue-500/10',
      iconClass: 'text-blue-300',
    };
  }

  if (mimeType === 'application/pdf') {
    return {
      label: 'PDF',
      badgeClass: 'bg-red-600',
      bgClass: 'bg-red-500/15',
      iconClass: 'text-red-500',
    };
  }

  if (mimeType.includes('word') || mimeType.includes('document')) {
    return {
      label: 'DOCX',
      badgeClass: 'bg-blue-600',
      bgClass: 'bg-blue-500/15',
      iconClass: 'text-blue-600',
    };
  }

  if (mimeType.includes('sheet') || mimeType.includes('excel')) {
    return {
      label: 'XLSX',
      badgeClass: 'bg-emerald-600',
      bgClass: 'bg-emerald-500/15',
      iconClass: 'text-emerald-500',
    };
  }

  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    return {
      label: 'PPTX',
      badgeClass: 'bg-orange-500',
      bgClass: 'bg-orange-400/15',
      iconClass: 'text-orange-500',
    };
  }

  if (mimeType === 'text/plain' || mimeType === 'text/csv') {
    return {
      label: mimeType === 'text/csv' ? 'CSV' : 'TXT',
      badgeClass: 'bg-slate-600',
      bgClass: 'bg-slate-500/15',
      iconClass: 'text-slate-200',
    };
  }

  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) {
    return {
      label: 'ZIP',
      badgeClass: 'bg-yellow-500',
      bgClass: 'bg-yellow-400/15',
      iconClass: 'text-yellow-500',
    };
  }

  return {
    label: 'ARQUIVO',
    badgeClass: 'bg-slate-600',
    bgClass: 'bg-slate-600/20',
    iconClass: 'text-slate-300',
  };
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function MediaGrid({
  items,
  onSelect,
  onDelete,
  onViewDetails,
  isLoading = false,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  size = 'default',
}: MediaGridProps) {
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [isPending, startTransition] = useTransition();

  const uniqueItems = useMemo(() => {
    const seen = new Set<number>();
    const next: MediaAsset[] = [];
    for (const item of items) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      next.push(item);
    }
    return next;
  }, [items]);

  const [optimisticItems, setOptimisticItems] = useOptimistic<OptimisticItem[], number>(
    uniqueItems.map((item) => ({ ...item, isDeleting: false })),
    (state, deletingId) =>
      state.map((item) =>
        item.id === deletingId ? { ...item, isDeleting: true } : item
      )
  );

  const handleDelete = useCallback(
    (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!onDelete || deletingIds.has(id) || isPending) return;

      setDeletingIds((prev) => new Set(prev).add(id));
      
      // Usar startTransition para atualização otimista
      startTransition(async () => {
        setOptimisticItems(id);
        
        try {
          await onDelete(id);
        } finally {
          setDeletingIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }
      });
    },
    [onDelete, deletingIds, isPending, setOptimisticItems]
  );

  const handleSelect = useCallback(
    (media: MediaAsset, e: React.MouseEvent) => {
      if (selectable && onSelectionChange) {
        e.stopPropagation();
        const isSelected = selectedIds.includes(media.id);
        if (isSelected) {
          onSelectionChange(selectedIds.filter((id) => id !== media.id));
        } else {
          onSelectionChange([...selectedIds, media.id]);
        }
        return;
      }

      if (onViewDetails) {
        onViewDetails(media);
        return;
      }

      onSelect?.(media);
    },
    [selectable, selectedIds, onSelectionChange, onViewDetails, onSelect]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LuLoader className="h-8 w-8 animate-spin text-gray-400 dark:text-slate-400" />
      </div>
    );
  }

  if (optimisticItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-slate-400">
        <LuImage className="h-12 w-12 mb-4" />
        <p className="text-lg font-medium">Nenhuma mídia encontrada</p>
        <p className="text-sm">Faça upload de arquivos para começar</p>
      </div>
    );
  }

  const gridColsClass =
    size === 'large'
      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4'
      : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4';

  return (
    <div className={gridColsClass}>
      {optimisticItems.map((media) => {
        const isImage = media.mimeType.startsWith('image/');
        const showImageThumb = isImage || !!media.thumbnailUrl;
        const isSelected = selectedIds.includes(media.id);
        const Icon = getMediaIcon(media.mimeType);
        const badge = getMediaBadge(media.mimeType);

        return (
          <div
            key={media.id}
            className={cn(
              'group relative aspect-[3/2] rounded-lg overflow-hidden border-2 transition-all cursor-pointer',
              'bg-white dark:bg-slate-800 hover:border-blue-500 shadow-md dark:shadow-none',
              isSelected ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-200 dark:border-slate-700',
              media.isDeleting && 'opacity-50 pointer-events-none'
            )}
            onClick={(e) => handleSelect(media, e)}
          >
            {/* Thumbnail */}
            {showImageThumb ? (
              <div className="absolute inset-0">
                <img
                  src={media.thumbnailUrl || media.sizes?.thumbnail || media.firebaseUrl}
                  alt={media.altText || media.originalFilename}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className={cn(
                    'absolute bottom-2 right-2 rounded px-2 py-1 flex items-center gap-1 text-xs text-white font-medium',
                    badge.badgeClass
                  )}
                >
                  <span>{badge.label}</span>
                </div>
              </div>
            ) : (
              <div className={cn('absolute inset-0 flex items-center justify-center', badge.bgClass)}>
                <div className="flex items-center justify-center">
                  <div className="flex h-16 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-slate-900/40 border border-gray-200 dark:border-white/10">
                    <Icon className={cn('h-10 w-10', badge.iconClass)} />
                  </div>
                </div>
                <div
                  className={cn(
                    'absolute bottom-2 right-2 rounded px-2 py-1 flex items-center gap-1 text-xs text-white font-medium',
                    badge.badgeClass
                  )}
                >
                  <span>{badge.label}</span>
                </div>
              </div>
            )}

            {/* Overlay com ações */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
              {/* Ações no topo */}
              <div className="flex justify-end gap-1">
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => handleDelete(media.id, e)}
                    disabled={media.isDeleting}
                    className="p-1.5 rounded bg-red-600/80 hover:bg-red-500 text-white transition-colors disabled:opacity-50"
                    title="Deletar"
                  >
                    {media.isDeleting ? (
                      <LuLoader className="h-4 w-4 animate-spin" />
                    ) : (
                      <LuTrash2 className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Info no rodapé */}
              <div className="text-white text-xs truncate">
                <p className="font-medium truncate">{media.originalFilename}</p>
                <p className="text-slate-300">{formatFileSize(media.fileSize)}</p>
              </div>
            </div>

            {/* Checkbox de seleção */}
            {selectable && (
              <div className="absolute top-2 left-2">
                <div
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-white/80 dark:bg-slate-800/80 border-gray-400 dark:border-slate-500 group-hover:border-blue-400'
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            )}

            {/* Loading overlay */}
            {media.isDeleting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <LuLoader className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
