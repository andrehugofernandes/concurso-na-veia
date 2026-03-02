'use client';

import type React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ModalHeader } from '@/components/ui/modal-header';
import { MediaGrid } from '@/components/media/media-grid';
import type { MediaAsset } from '@/app/admin/media/actions';

interface MediaPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: MediaAsset[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
  onCancel: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  confirmLabel?: string;
  emptyText?: string;
}

export function MediaPickerDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  items,
  isLoading,
  isLoadingMore,
  error,
  selectedIds,
  onSelectionChange,
  onScroll,
  onCancel,
  onConfirm,
  confirmDisabled = false,
  confirmLabel = 'Confirmar',
  emptyText = 'Nenhuma mídia encontrada. Faça upload na biblioteca de mídia.',
}: MediaPickerDialogProps) {
  const isInitialLoading = isLoading && items.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 p-0 flex flex-col">
        <ModalHeader icon={icon} title={title} description={description} onClose={onCancel} />

        <div className="flex-1 flex flex-col px-6 py-4 space-y-4">
          {error && (
            <div className="rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex-1 min-h-0 max-h-[60vh] overflow-y-auto pr-1" onScroll={onScroll}>
            <MediaGrid
              items={items}
              isLoading={isInitialLoading}
              selectable
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange}
              size="large"
            />

            {isLoadingMore && items.length > 0 && (
              <div className="flex justify-center py-3 text-gray-500 dark:text-slate-400 text-sm">
                Carregando mais mídias...
              </div>
            )}

            {!isLoading && !isLoadingMore && items.length === 0 && !error && (
              <p className="text-sm text-gray-500 dark:text-slate-400 py-2">{emptyText}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 text-sm"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={confirmDisabled}
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--primary)]/90"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
