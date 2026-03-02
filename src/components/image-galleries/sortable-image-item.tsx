'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LuGripVertical, LuX, LuImage, LuLoader } from 'react-icons/lu';
import { cn } from '@/lib/utils'; // Assuming this exists, based on other files

export interface GalleryImage {
    id: string;
    url: string;
    file?: File;
    caption?: string;
    isUploading?: boolean;
}

interface SortableImageItemProps {
    image: GalleryImage;
    onRemove: (id: string) => void;
    onCaptionChange: (id: string, caption: string) => void;
}

export function SortableImageItem({ image, onRemove, onCaptionChange }: SortableImageItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group relative flex items-start gap-3 p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm transition-all",
                isDragging && "shadow-lg ring-2 ring-[var(--primary)]"
            )}
        >
            {/* Drag Handle */}
            <button
                type="button"
                className="mt-2 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-grab active:cursor-grabbing"
                {...attributes}
                {...listeners}
            >
                <LuGripVertical size={20} />
            </button>

            {/* Thumbnail */}
            <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-slate-900 rounded-md overflow-hidden border border-gray-200 dark:border-slate-700">
                {image.url ? (
                    <img
                        src={image.url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <LuImage size={24} />
                    </div>
                )}
                {image.isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded z-10">
                        <LuLoader className="w-5 h-5 text-white animate-spin" />
                    </div>
                )}
            </div>

            {/* Inputs */}
            <div className="flex-1 min-w-0 space-y-2">
                {/* Caption */}
                <div>
                    <label htmlFor={`caption-${image.id}`} className="sr-only">Legenda</label>
                    <input
                        id={`caption-${image.id}`}
                        type="text"
                        value={image.caption || ''}
                        onChange={(e) => onCaptionChange(image.id, e.target.value)}
                        placeholder="Legenda da imagem..."
                        className="w-full px-3 py-1.5 text-sm bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--primary)] text-gray-900 dark:text-slate-100"
                    />
                </div>
                {/* File Info */}
                <div className="text-xs text-gray-500 dark:text-slate-400 truncate">
                    {image.file ? `Arquivo: ${image.file.name}` : 'Imagem carregada'}
                </div>
            </div>

            {/* Remove Button */}
            <button
                type="button"
                onClick={() => onRemove(image.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
                title="Remover imagem"
            >
                <LuX size={18} />
            </button>
        </div>
    );
}
