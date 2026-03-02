'use client';

import { useState, useOptimistic, useCallback, startTransition } from 'react';
import { LuPencil, LuTrash2, LuLoader, LuEye, LuToggleLeft, LuImage } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { deleteGallery, toggleGalleryStatus } from '@/app/admin/image-galleries/actions';
import type { ImageGalleryData } from '@/app/admin/image-galleries/actions';

interface ImageGalleryTableProps {
    galleries: ImageGalleryData[];
    onEditGallery?: (gallery: ImageGalleryData) => void;
    onPreviewGallery?: (gallery: ImageGalleryData) => void;
    onRefresh?: () => void;
    selectable?: boolean;
    selectedIds?: string[];
    onSelectionChange?: (ids: string[]) => void;
}

export function ImageGalleryTable({
    galleries,
    onEditGallery,
    onPreviewGallery,
    onRefresh,
    selectable = false,
    selectedIds = [],
    onSelectionChange,
    onToggleStatus,
    onDeleteGallery,
}: ImageGalleryTableProps & {
    onToggleStatus?: (id: string, currentStatus: boolean) => Promise<void> | void;
    onDeleteGallery?: (id: string) => Promise<void> | void;
}) {
    const [optimisticGalleries, updateOptimisticGalleries] = useOptimistic(
        galleries,
        (state, action: { type: 'toggle' | 'delete'; id: string; isActive?: boolean }) => {
            if (action.type === 'toggle') {
                return state.map((p) =>
                    p.id === action.id ? { ...p, isActive: action.isActive ?? !p.isActive } : p
                );
            }
            if (action.type === 'delete') {
                return state.filter((p) => p.id !== action.id);
            }
            return state;
        }
    );

    const [actionInProgress, setActionInProgress] = useState<string | null>(null);

    const handleToggleSelection = useCallback(
        (id: string) => {
            if (!onSelectionChange) return;
            if (selectedIds.includes(id)) {
                onSelectionChange(selectedIds.filter((currentId) => currentId !== id));
                return;
            }
            onSelectionChange([...selectedIds, id]);
        },
        [onSelectionChange, selectedIds]
    );

    const handleToggleStatus = useCallback(
        async (id: string, currentStatus: boolean) => {
            if (!onToggleStatus) return;
            setActionInProgress(id);
            startTransition(() => {
                updateOptimisticGalleries({ type: 'toggle', id, isActive: !currentStatus });
            });

            try {
                await onToggleStatus(id, currentStatus);
            } finally {
                setActionInProgress(null);
                onRefresh?.();
            }
        },
        [onRefresh, onToggleStatus, updateOptimisticGalleries]
    );

    const handleDelete = useCallback(
        async (id: string) => {
            if (!onDeleteGallery) return;
            setActionInProgress(id);
            startTransition(() => {
                updateOptimisticGalleries({ type: 'delete', id });
            });

            try {
                await onDeleteGallery(id);
            } finally {
                setActionInProgress(null);
                onRefresh?.();
            }
        },
        [onDeleteGallery, onRefresh, updateOptimisticGalleries]
    );

    if (optimisticGalleries.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-slate-400">
                <p>Nenhuma galeria encontrada</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                        {selectable && (
                            <th className="w-10 px-4 py-3 text-left font-medium text-gray-700 dark:text-slate-300">
                                <span className="sr-only">Selecionar</span>
                            </th>
                        )}
                        <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-slate-300">Título</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-slate-300">Itens</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-slate-300">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-slate-300">Criado em</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 dark:text-slate-300">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {optimisticGalleries.map((gallery) => (
                        <tr key={gallery.id} className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                            {selectable && (
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(gallery.id)}
                                        onChange={() => handleToggleSelection(gallery.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-[var(--primary)] accent-[var(--primary)]"
                                        aria-label={`Selecionar galeria ${gallery.title}`}
                                    />
                                </td>
                            )}
                            <td className="px-4 py-3">
                                <p className="font-medium text-gray-900 dark:text-slate-100">{gallery.title}</p>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-1.5 text-gray-600 dark:text-slate-400">
                                    <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">
                                        {Array.isArray(gallery.images) ? gallery.images.length : 0}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => handleToggleStatus(gallery.id, gallery.isActive)}
                                    disabled={actionInProgress === gallery.id || selectable}
                                    className={cn(
                                        'px-2 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50',
                                        gallery.isActive
                                            ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/20'
                                            : 'bg-gray-100 dark:bg-slate-500/10 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-500/20'
                                    )}
                                    title={gallery.isActive ? 'Desativar' : 'Ativar'}
                                >
                                    {actionInProgress === gallery.id ? (
                                        <LuLoader className="h-3 w-3 animate-spin inline" />
                                    ) : (
                                        <LuToggleLeft className="h-3 w-3 inline mr-1" />
                                    )}
                                    {gallery.isActive ? 'Ativo' : 'Inativo'}
                                </button>
                            </td>
                            <td className="px-4 py-3 text-gray-600 dark:text-slate-400 text-xs">
                                {new Date(gallery.createdAt).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-1">
                                    <button
                                        onClick={() => onPreviewGallery?.(gallery)}
                                        disabled={actionInProgress === gallery.id || selectable}
                                        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
                                        title="Preview"
                                    >
                                        <LuEye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onEditGallery?.(gallery)}
                                        disabled={actionInProgress === gallery.id || selectable}
                                        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors disabled:opacity-50"
                                        title="Editar"
                                    >
                                        {actionInProgress === gallery.id ? (
                                            <LuLoader className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <LuPencil className="h-4 w-4" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(gallery.id)}
                                        disabled={actionInProgress === gallery.id || selectable}
                                        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
                                        title="Deletar"
                                    >
                                        {actionInProgress === gallery.id ? (
                                            <LuLoader className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <LuTrash2 className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
