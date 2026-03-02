'use client';

import { useState, useEffect, useCallback } from 'react';
import { LuImage, LuSearch, LuLoader, LuCheck } from 'react-icons/lu';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { listGalleries, type ImageGalleryData } from '@/app/admin/image-galleries/actions';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { ModalHeader } from '@/components/ui/modal-header';

interface GalleryPickerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (gallery: { id: string; title: string; imageCount: number }) => void;
}

export function GalleryPickerDialog({
    open,
    onOpenChange,
    onSelect,
}: GalleryPickerDialogProps) {
    const [galleries, setGalleries] = useState<ImageGalleryData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const loadGalleries = useCallback(async (searchTerm: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await listGalleries({
                search: searchTerm || undefined,
                status: 'active',
                page: 1,
                pageSize: 50,
            });

            if (result.status === 'success' && result.data) {
                setGalleries(result.data.galleries);
            } else {
                setError(result.error || 'Erro ao carregar galerias');
                setGalleries([]);
            }
        } catch {
            setError('Erro ao carregar galerias');
            setGalleries([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!open) {
            setSelectedId(null);
            setSearch('');
            return;
        }

        void loadGalleries('');
    }, [open, loadGalleries]);

    useEffect(() => {
        if (!open) return;

        const debounce = setTimeout(() => {
            void loadGalleries(search);
        }, 300);

        return () => clearTimeout(debounce);
    }, [search, open, loadGalleries]);

    const handleConfirm = () => {
        if (!selectedId) return;

        const gallery = galleries.find((a) => a.id === selectedId);
        if (!gallery) return;

        const count = Array.isArray(gallery.images) ? gallery.images.length : 0;

        onSelect({
            id: gallery.id,
            title: gallery.title,
            imageCount: count,
        });

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-xl h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-visible data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
                <AnimatedBorder className="rounded-xl" />

                <ModalHeader
                    icon={<LuImage size={24} />}
                    title="Inserir Galeria"
                    description="Selecione uma galeria para inserir no conteúdo"
                    onClose={() => onOpenChange(false)}
                />

                <div className="flex-1 overflow-hidden px-6 py-5 flex flex-col gap-5">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar galeria..."
                            className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all"
                            aria-label="Buscar galeria"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto min-h-0 -mx-2 px-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <LuLoader className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-full text-sm text-destructive">
                                {error}
                            </div>
                        ) : galleries.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-sm text-muted-foreground">
                                <LuImage className="h-10 w-10 mb-3 opacity-20" />
                                <span>Nenhuma galeria encontrada</span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {galleries.map((gallery) => {
                                    const count = Array.isArray(gallery.images) ? gallery.images.length : 0;
                                    return (
                                        <button
                                            key={gallery.id}
                                            type="button"
                                            onClick={() => setSelectedId(gallery.id)}
                                            className={cn(
                                                'w-full flex items-center gap-3 p-3 text-left transition-all rounded-lg border group',
                                                'hover:bg-accent hover:border-accent-foreground/50',
                                                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
                                                selectedId === gallery.id
                                                    ? 'bg-primary/5 border-primary shadow-sm'
                                                    : 'bg-card border-border'
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-all duration-200',
                                                    selectedId === gallery.id
                                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                                        : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
                                                )}
                                            >
                                                <LuCheck
                                                    className={cn(
                                                        "h-4 w-4 absolute transition-all duration-200",
                                                        selectedId === gallery.id ? "opacity-100 scale-100" : "opacity-0 scale-50"
                                                    )}
                                                />
                                                <LuImage
                                                    className={cn(
                                                        "h-4 w-4 transition-all duration-200",
                                                        selectedId === gallery.id ? "opacity-0 scale-50" : "opacity-100 scale-100"
                                                    )}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 pr-2">
                                                <div className={cn(
                                                    "font-medium text-sm truncate transition-colors",
                                                    selectedId === gallery.id ? "text-primary" : "text-foreground"
                                                )}>
                                                    {gallery.title}
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "text-xs px-2 py-1 rounded-full font-medium transition-colors whitespace-nowrap",
                                                selectedId === gallery.id
                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                                    : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                                            )}>
                                                {count} {count === 1 ? 'imagem' : 'imagens'}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end gap-3 shrink-0">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirm} disabled={!selectedId} className="min-w-[100px]">
                            Inserir
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
