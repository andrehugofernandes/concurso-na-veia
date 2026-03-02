'use client';

import { useState, useRef } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LuUpload, LuImagePlus } from 'react-icons/lu';
import { SortableImageItem, GalleryImage } from './sortable-image-item';
import { cn } from '@/lib/utils';
import { uploadGalleryImage } from '@/app/admin/image-galleries/actions';

interface GalleryImageManagerProps {
    images: GalleryImage[];
    onChange: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
    isLoading?: boolean;
}

export function GalleryImageManager({ images, onChange, isLoading = false }: GalleryImageManagerProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = images.findIndex((img) => img.id === active.id);
            const newIndex = images.findIndex((img) => img.id === over.id);
            onChange(arrayMove(images, oldIndex, newIndex));
        }
    };

    const processFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        if (isLoading) return;

        const newImages: GalleryImage[] = [];
        const filesToUpload: { id: string; file: File }[] = [];

        Array.from(files).forEach((file) => {
            if (!file.type.startsWith('image/')) return;

            const id = crypto.randomUUID();
            const newImage: GalleryImage = {
                id,
                url: URL.createObjectURL(file), // Preview immediata
                file,
                caption: '',
                isUploading: true, // Flag para UI
            };
            newImages.push(newImage);
            filesToUpload.push({ id, file });
        });

        if (newImages.length === 0) return;

        // Adiciona ao estado imediatamente para feedback visual
        const currentImages = [...images, ...newImages];
        onChange(currentImages);

        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';

        // Processa uploads em paralelo
        // NOTA: Idealmente limitar concorrência, mas para MVP ok
        for (const { id, file } of filesToUpload) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const result = await uploadGalleryImage(formData);

                if (result.status === 'error') {
                    console.error(`Erro ao enviar ${file.name}:`, result.error);
                    // Remove a imagem que falhou ou marca erro
                    onChange(prev => prev.filter(img => img.id !== id));
                    alert(`Erro ao enviar imagem ${file.name}: ${result.error}`);
                    continue;
                }

                if (result.data?.url) {
                    // Atualiza a URL com a remota e remove flag de upload
                    onChange(prev => prev.map(img =>
                        img.id === id
                            ? { ...img, url: result.data!.url, isUploading: false, file: undefined } // Remove file object after upload
                            : img
                    ));
                }
            } catch (error) {
                console.error(`Exceção ao enviar ${file.name}:`, error);
                onChange(prev => prev.filter(img => img.id !== id));
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        processFiles(e.dataTransfer.files);
    };

    const handleRemove = (id: string) => {
        onChange(images.filter((img) => img.id !== id));
    };

    const handleCaptionChange = (id: string, caption: string) => {
        onChange(images.map((img) => (img.id === id ? { ...img, caption } : img)));
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                onClick={() => !isLoading && fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={handleDrop}
                className={cn(
                    "w-full px-6 py-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-slate-800/50",
                    isDraggingOver
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-gray-300 dark:border-slate-700 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5",
                    isLoading && "opacity-50 cursor-not-allowed"
                )}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
                <LuImagePlus className="w-8 h-8 text-gray-400 dark:text-slate-400" />
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                        Clique ou arraste imagens aqui
                    </p>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                        Suporta múltiplas imagens (JPG, PNG, WebP)
                    </p>
                </div>
            </div>

            {/* Image List */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={images.map(img => img.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.map((image) => (
                            <SortableImageItem
                                key={image.id}
                                image={image}
                                onRemove={handleRemove}
                                onCaptionChange={handleCaptionChange}
                            />
                        ))}
                    </div>
                    {images.length === 0 && (
                        <div className="text-center py-4 text-sm text-gray-400 italic col-span-2">
                            Nenhuma imagem adicionada ainda.
                        </div>
                    )}
                </SortableContext>
            </DndContext>
        </div>
    );
}
