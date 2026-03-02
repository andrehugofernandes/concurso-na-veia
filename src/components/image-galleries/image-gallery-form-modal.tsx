'use client';

// Modal wrapper para o formulário

import { LuImage } from 'react-icons/lu';
import { ImageGalleryForm } from '@/components/image-galleries/image-gallery-form';
import type { ImageGalleryData } from '@/app/admin/image-galleries/actions';
import { useConfetti } from '@/lib/hooks/useConfetti';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ModalHeader } from '@/components/ui/modal-header';
import { AnimatedBorder } from '../ui/animated-border';

interface ImageGalleryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: ImageGalleryData;
}

export function ImageGalleryFormModal({
    isOpen,
    onClose,
    onSuccess,
    initialData,
}: ImageGalleryFormModalProps) {
    const isEditing = !!initialData;
    const title = isEditing ? 'Editar Galeria' : 'Nova Galeria';
    const description = isEditing
        ? 'Atualize as imagens e informações da galeria'
        : 'Crie uma nova galeria de imagens para seus posts e páginas';

    const triggerConfetti = useConfetti();

    const handleSuccess = () => {
        triggerConfetti();
        onSuccess();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-4xl h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
                <AnimatedBorder className="rounded-xl" />
                <ModalHeader
                    icon={<LuImage size={24} />}
                    title={title}
                    description={description}
                    onClose={onClose}
                />

                <div className="flex-1 overflow-hidden px-6 py-6 flex flex-col">
                    <ImageGalleryForm
                        gallery={initialData}
                        onSuccess={handleSuccess}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
