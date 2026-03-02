'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LuLayers, LuCheck, LuX, LuFilter, LuLoader, LuImage } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { PaginationControls } from '@/components/ui/pagination-controls';
import {
    deleteGalleriesBulk,
    selectAllGalleryIds,
    toggleGalleryStatus,
    deleteGallery,
    getGalleryStats,
    createGallery,
    updateGallery,
    type ImageGalleryData,
} from './actions';
import { ImageGalleryTable } from '@/components/image-galleries/image-gallery-table';
import { ImageGalleryFormModal } from '@/components/image-galleries/image-gallery-form-modal';

interface GalleriesData {
    galleries: ImageGalleryData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    pages: number;
}

interface ImageGalleriesPageClientProps {
    searchParams: {
        status?: string;
        search?: string;
        page?: string;
        pageSize?: string;
    };
    galleriesData: GalleriesData;
    statsData: {
        total: number;
        active: number;
        inactive: number;
    } | null;
}

export function ImageGalleriesPageClient({
    searchParams,
    galleriesData,
    statsData,
}: ImageGalleriesPageClientProps) {
    const router = useRouter();
    const currentSearchParams = useSearchParams();

    const { galleries, total, page: currentPage, pageSize } = galleriesData;
    const status = searchParams.status;
    const page = parseInt(searchParams.page || String(currentPage || 1), 10);
    const currentPageSize = pageSize || parseInt(searchParams.pageSize || '10', 10);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
    const [editingGalleryData, setEditingGalleryData] = useState<ImageGalleryData | undefined>(undefined);

    // Placeholder for preview functionality
    const [previewGallery, setPreviewGallery] = useState<ImageGalleryData | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    // Selection Mode State
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
        params.delete('page');
        router.push(`/admin/image-galleries?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(currentSearchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/admin/image-galleries?${params.toString()}`);
    };

    const handlePageSizeChange = (size: number) => {
        const params = new URLSearchParams(currentSearchParams.toString());
        params.set('pageSize', size.toString());
        params.delete('page');
        router.push(`/admin/image-galleries?${params.toString()}`);
    };

    const handleOpenModal = () => {
        setEditingGalleryId(null);
        setEditingGalleryData(undefined);
        setIsModalOpen(true);
    };

    const handleEditGallery = (gallery: ImageGalleryData) => {
        setEditingGalleryId(gallery.id);
        setEditingGalleryData(gallery);
        setIsModalOpen(true);
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
        if (!galleries.length) return;
        setSelectedIds(galleries.map((item) => item.id));
    }, [galleries]);

    const currentStatusParam = useMemo(() => {
        return (currentSearchParams.get('status') || 'all') as 'all' | 'active' | 'inactive';
    }, [currentSearchParams]);

    const currentSearchQuery = useMemo(() => {
        return currentSearchParams.get('search') || undefined;
    }, [currentSearchParams]);

    const handleSelectAll = useCallback(async () => {
        const result = await selectAllGalleryIds({
            status: currentStatusParam,
            search: currentSearchQuery,
        });

        if (result.status === 'success' && result.data) {
            setSelectedIds(result.data.ids);
            return;
        }

        alert(result.error || 'Erro ao selecionar todos');
    }, [currentStatusParam, currentSearchQuery]);

    const handleDeleteSelected = useCallback(async () => {
        if (!selectedIds.length || isBulkDeleting) return;

        const confirmed = window.confirm(
            `Tem certeza que deseja deletar ${selectedIds.length} ${selectedIds.length === 1 ? 'galeria selecionada' : 'galerias selecionadas'}?`
        );

        if (!confirmed) return;

        setIsBulkDeleting(true);
        try {
            const result = await deleteGalleriesBulk({ ids: selectedIds });
            if (result.status === 'success') {
                handleExitSelectionMode();
                router.refresh();
                return;
            }
            alert(result.error || 'Erro ao deletar galerias selecionadas');
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

    const tabs: Array<{ id: 'all' | 'active' | 'inactive'; label: string; count: number; icon: React.ReactNode }> = [
        { id: 'all', label: 'Todos', count: statsData?.total ?? 0, icon: <LuFilter className="h-4 w-4" /> },
        { id: 'active', label: 'Ativos', count: statsData?.active ?? 0, icon: <LuCheck className="h-4 w-4" /> },
        { id: 'inactive', label: 'Inativos', count: statsData?.inactive ?? 0, icon: <LuX className="h-4 w-4" /> },
    ];

    const handleDeleteSingle = useCallback(
        async (id: string) => {
            const confirmed = window.confirm('Tem certeza que deseja deletar esta galeria?');
            if (!confirmed) return;

            const result = await deleteGallery({ id });
            if (result.status === 'error') {
                alert(result.error || 'Erro ao deletar');
                return;
            }
            router.refresh();
        },
        [router]
    );

    const handleToggleStatus = useCallback(
        async (id: string, currentStatus: boolean) => {
            const result = await toggleGalleryStatus({ id, isActive: !currentStatus });
            if (result.status === 'error') {
                alert(result.error || 'Erro ao atualizar status');
                return;
            }
            router.refresh();
        },
        [router]
    );


    return (
        <>
            {/* Stats Cards */}
            {statsData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-600/20">
                                <LuLayers className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{statsData.total}</p>
                                <p className="text-xs text-gray-600 dark:text-slate-400">Total de galerias</p>
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
                </div>
            )}

            {/* Toolbar: Filters | Items + New Gallery Button */}
            {!selectionMode && (
                <div className="hidden lg:flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                            {tabs.map((tab) => {
                                const isActive = (tab.id === 'all' && !status) || status === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => handleStatusFilter(tab.id)}
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

                        {/* Items per page */}
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
                                            onClick={() => handlePageSizeChange(value as number)}
                                            className={cn(
                                                'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                                                isActive
                                                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                                                    : 'border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                                            )}
                                            aria-label={`${option} galerias por página${isActive ? ' (selecionado)' : ''}`}
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
                                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white shadow-sm"
                            >
                                <span>Modo de Seleção</span>
                                <span className="text-xs opacity-75"> ({total})</span>
                            </button>
                        )}
                        <button
                            onClick={handleOpenModal}
                            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            + Nova Galeria
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile / Compact Toolbar */}
            {!selectionMode && (
                <div className="lg:hidden flex flex-col gap-4">
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                                {tabs.map((tab) => {
                                    const isActive = (tab.id === 'all' && !status) || status === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => handleStatusFilter(tab.id)}
                                            className={cn(
                                                'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                                                isActive
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                                            )}
                                        >
                                            {tab.icon}
                                            <span className="hidden sm:inline">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

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
                                                onClick={() => handlePageSizeChange(value as number)}
                                                className={cn(
                                                    'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                                                    isActive
                                                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                                                        : 'border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                                                )}
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
                                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white shadow-sm"
                            >
                                <span>Modo de Seleção</span>
                                <span className="text-xs opacity-75"> ({total})</span>
                            </button>
                        )}
                        <button
                            onClick={handleOpenModal}
                            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            + Nova Galeria
                        </button>
                    </div>
                </div>
            )}

            {/* Selection Bar (Sticky) */}
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
                                        {selectedIds.length} {selectedIds.length === 1 ? 'galeria selecionada' : 'galerias selecionadas'}
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
                                Página ({galleries.length})
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

            <div ref={tableContainerRef}>
                <ImageGalleryTable
                    galleries={galleries}
                    onEditGallery={handleEditGallery}
                    onPreviewGallery={(gallery) => {
                        setPreviewGallery(gallery);
                        setIsPreviewOpen(true);
                    }}
                    onRefresh={handleRefresh}
                    onToggleStatus={handleToggleStatus}
                    onDeleteGallery={handleDeleteSingle}
                    selectable={selectionMode}
                    selectedIds={selectedIds}
                    onSelectionChange={setSelectedIds}
                />
            </div>

            {total > 0 && (
                <div className="pt-2">
                    <PaginationControls
                        page={page}
                        pageSize={currentPageSize}
                        total={total}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        pageSizeOptions={[10, 20, 50, 'TODOS']}
                    />
                </div>
            )}

            <ImageGalleryFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleModalSuccess}
                initialData={editingGalleryData}
            />

            {/* Preview Modal */}
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-4xl w-full bg-white dark:bg-slate-900 border-none shadow-2xl p-6 rounded-2xl">
                    <ModalHeader
                        title={previewGallery?.title || 'Visualizar Galeria'}
                        icon={<LuImage className="h-5 w-5" />}
                        onClose={() => setIsPreviewOpen(false)}
                    />
                    <div className="mt-4">
                        {previewGallery && previewGallery.images && (
                            <GalleryMosaic images={previewGallery.images} />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ModalHeader } from '@/components/ui/modal-header';
import { GalleryMosaic } from '@/components/image-galleries/gallery-mosaic';
