'use client';

// Componente de formulário para galerias

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LuLoader } from 'react-icons/lu';
import { createGallery, updateGallery } from '@/app/admin/image-galleries/actions';
import type { ImageGalleryData } from '@/app/admin/image-galleries/actions';
import { AnimatedInput } from '@/components/ui/animated-input';
import { GalleryImageManager } from './gallery-image-manager';
import type { GalleryImage } from './sortable-image-item';

const gallerySchema = z.object({
    title: z.string().min(1, 'Título é obrigatório').max(255),
    isActive: z.boolean().default(true),
    // Validamos array de qualquer coisa por enquanto, a lógica principal fica no state
    images: z.array(z.any()).default([]),
});

type GalleryFormValues = z.input<typeof gallerySchema>;

interface ImageGalleryFormProps {
    gallery?: ImageGalleryData;
    onSuccess?: () => void;
}

export function ImageGalleryForm({ gallery, onSuccess }: ImageGalleryFormProps) {
    const isEditing = !!gallery;
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // State separado para as imagens para facilitar o DND
    const [images, setImages] = useState<GalleryImage[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        reset,
    } = useForm<GalleryFormValues>({
        resolver: zodResolver(gallerySchema),
        defaultValues: gallery
            ? {
                title: gallery.title,
                isActive: gallery.isActive,
                images: [], // Carregado via useEffect
            }
            : {
                title: '',
                isActive: true,
                images: [],
            },
    });

    // Load initial data
    useEffect(() => {
        if (gallery) {
            setValue('title', gallery.title);
            setValue('isActive', gallery.isActive);

            // Parse images from JSON if needed
            let parsedImages: GalleryImage[] = [];
            if (Array.isArray(gallery.images)) {
                parsedImages = gallery.images;
            }
            setImages(parsedImages);
        } else {
            // Reset if modal opens for create
            reset({ title: '', isActive: true });
            setImages([]);
        }
    }, [gallery, setValue, reset]);

    const onFormSubmit = async (data: GalleryFormValues) => {
        // Prevent submit if any image is still uploading
        if (images.some(img => img.isUploading)) {
            alert('Aguarde o upload de todas as imagens.');
            return;
        }

        setIsLoading(true);
        setServerError(null);

        try {
            // Prepare images for submission
            // We assume images are already uploaded and have URLs
            const processedImages = images.map((img) => ({
                id: img.id,
                url: img.url,
                caption: img.caption || ''
            }));

            if (isEditing && gallery) {
                const result = await updateGallery({
                    id: gallery.id,
                    title: data.title,
                    isActive: !!data.isActive,
                    images: processedImages,
                });

                if (result.status === 'error') {
                    setServerError(result.error ? result.error : 'Erro ao atualizar galeria');
                    return;
                }
            } else {
                const result = await createGallery({
                    title: data.title,
                    isActive: !!data.isActive,
                    images: processedImages,
                });

                if (result.status === 'error') {
                    setServerError(result.error ? result.error : 'Erro ao criar galeria');
                    return;
                }
            }

            onSuccess?.();
        } catch (err) {
            console.error(err);
            setServerError('Erro inesperado ao salvar');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setServerError(null);
        if (gallery) {
            reset();
            let parsedImages: GalleryImage[] = [];
            if (Array.isArray(gallery.images)) {
                parsedImages = gallery.images;
            }
            setImages(parsedImages);
        } else {
            reset({ title: '', isActive: true });
            setImages([]);
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col h-full">
            {serverError && (
                <div
                    role="alert"
                    className="rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 px-3 py-2 text-sm text-red-700 dark:text-red-400 mb-4"
                >
                    {serverError}
                </div>
            )}

            <div className="flex-1 overflow-y-auto px-1 pr-3 space-y-6">
                {/* Title */}
                <div className="pt-2">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <AnimatedInput
                                {...field}
                                id="title"
                                type="text"
                                label="Título da Galeria *"
                                placeholder="Ex: Fotos do Evento X"
                                maxLength={255}
                                inputClassName="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
                                surfaceClassName="bg-white dark:bg-slate-800"
                                contentLeftClassName="left-[14px]"
                                aria-label="Título da galeria"
                            />
                        )}
                    />
                    {errors.title && <span className="text-red-400 text-sm mt-1 block">{errors.title.message}</span>}
                </div>

                {/* Image Manager */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Imagens
                    </label>
                    <GalleryImageManager
                        images={images}
                        onChange={setImages}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-slate-700 mt-4">
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 font-medium hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50"
                >
                    Limpar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 disabled:opacity-50"
                >
                    {isLoading && <LuLoader className="h-4 w-4 animate-spin" />}
                    {isLoading ? 'Salvando...' : isEditing ? 'Atualizar Galeria' : 'Criar Galeria'}
                </button>
            </div>
        </form>
    )
}
