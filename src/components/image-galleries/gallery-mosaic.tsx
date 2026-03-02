'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogClose,
} from '@/components/ui/dialog';
import { LuX } from 'react-icons/lu';

interface GalleryImage {
    id: string;
    url: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
}

interface GalleryMosaicProps {
    images: GalleryImage[];
    className?: string;
}

function chunkArray<T>(array: T[], size: number): T[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

export function GalleryMosaic({ images, className }: GalleryMosaicProps) {
    const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

    // Divide images into chunks of 4 for the mosaic pages
    const imageChunks = chunkArray(images, 4);

    const handleImageClick = (image: GalleryImage) => {
        setLightboxImage(image);
    };

    if (images.length === 0) {
        return <div className="text-center p-4 text-muted-foreground">Nenhuma imagem na galeria.</div>;
    }

    return (
        <div className={cn("relative group", className)}>
            <Carousel
                opts={{
                    align: 'start',
                    loop: false,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {imageChunks.map((chunk, slideIndex) => (
                        <CarouselItem key={slideIndex} className="basis-full">
                            <div className="grid grid-cols-2 gap-2 aspect-[16/9] w-full">
                                {chunk.map((image, index) => {
                                    // Layout logic for 4 images (Mosaic)
                                    // Based on the user image:
                                    // 1 | 2
                                    // 3 | 4
                                    // This assumes a simple 2x2 grid for now as it's the robust interpretation of "Mosaic" with 4 items.
                                    // If we want the specific layout from the screenshot (one tall, two small stacked, one wide), 
                                    // we need complex conditional col-spans.
                                    // Let's try to infer the specific layout from user audio: "Mosaic model is this one in the image".
                                    // Image shows:
                                    // Top Left: Large (Tall?)
                                    // Top Right: Small
                                    // Bottom Left: Large (Tall?)
                                    // Bottom Right: Wide?
                                    // Actually the screenshot shows:
                                    // Row 1: Left (Squareish/Wide), Right (Squareish/Wide)
                                    // Row 2: Left (Squareish/Tall), Right (Wide)
                                    // Let's stick to a robust grid or a masonry-like grid if possible.
                                    // A simple grid-cols-2 is safest unless we hardcode specific distinct sizes.
                                    // Let's go with a standard grid-cols-2 for stability but make them cover the area.

                                    // Wait, the user image shows:
                                    // [ Image 1 ] [ Image 2 ]
                                    // [ Image 3 ] [ Image 4 ]
                                    // But Image 4 looks wider? No, it looks like:
                                    // [ 1 (large) ] [ 2 (small) ]
                                    // [ 3 (small) ] [ 4 (wide)  ]
                                    // Let's use a standard grid-cols-2 grid-rows-2 pattern which naturally forms a 4-item mosaic.
                                    // Tailwind: grid-cols-2 grid-rows-2.

                                    return (
                                        <div
                                            key={image.id}
                                            className={cn(
                                                "relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:opacity-95 active:scale-[0.98]",
                                                // Specific spans could go here if we want asymmetric mosaic
                                            )}
                                            onClick={() => handleImageClick(image)}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.alt || `Imagem ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {imageChunks.length > 1 && (
                    <>
                        <CarouselPrevious className="-left-4 lg:-left-12 z-10 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-slate-700 h-10 w-10" />
                        <CarouselNext className="-right-4 lg:-right-12 z-10 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-slate-700 h-10 w-10" />
                    </>
                )}
            </Carousel>

            {/* Lightbox */}
            <Dialog open={!!lightboxImage} onOpenChange={(open) => !open && setLightboxImage(null)}>
                <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none z-[110]">
                    <div className="relative w-full h-[80vh] flex items-center justify-center">
                        {lightboxImage && (
                            <div className="relative w-full h-full">
                                <Image
                                    src={lightboxImage.url}
                                    alt={lightboxImage.alt || 'Full size'}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                                {lightboxImage.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center rounded-b-lg">
                                        {lightboxImage.caption}
                                    </div>
                                )}
                            </div>
                        )}
                        <DialogClose className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-black hover:bg-gray-200 transition-colors">
                            <LuX size={20} />
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
