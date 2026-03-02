'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LuX } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipBadge,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ImageAsset {
  id: string;
  order: number;
  caption: string | null;
  displayLabel: string | null;
  media: {
    id: number;
    originalFilename: string;
    firebaseUrl: string;
    thumbnailUrl: string | null;
    mimeType: string;
    sizes: Record<string, string>;
  };
}

interface AccordionItemImagesCarouselProps {
  assets: ImageAsset[];
  className?: string;
}

export function AccordionItemImagesCarousel({ assets, className }: AccordionItemImagesCarouselProps) {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string; caption?: string } | null>(null);

  if (!assets.length) {
    return (
      <div className={cn('text-sm text-muted-foreground italic', className)}>
        Nenhuma imagem anexada.
      </div>
    );
  }

  const sortedAssets = [...assets].sort((a, b) => a.order - b.order);

  const handleImageClick = (e: React.MouseEvent, asset: ImageAsset) => {
    e.preventDefault();
    setLightboxImage({
      url: asset.media.firebaseUrl,
      alt: asset.displayLabel || asset.media.originalFilename,
      caption: asset.caption || undefined,
    });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <>
      <TooltipProvider delayDuration={200}>
        <div className="relative mx-4">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
              dragFree: true,
            }}
            className={cn('w-full', className)}
          >
            <CarouselContent className="-ml-2 md:-ml-3">
            {sortedAssets.map((asset) => {
              const fullName = asset.media.originalFilename;
              const imageUrl = asset.media.thumbnailUrl || asset.media.firebaseUrl;
              const displayName = asset.displayLabel || fullName;

              return (
                <CarouselItem
                  key={asset.id}
                  className="pl-2 md:pl-3 basis-[140px] md:basis-[180px] lg:basis-[220px]"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={(e) => handleImageClick(e, asset)}
                        className={cn(
                          'group block overflow-hidden rounded-lg w-full text-left',
                          'border border-border bg-card',
                          'transition-all duration-200 hover:shadow-md hover:border-primary/50',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                        )}
                        aria-label={`Ver imagem: ${fullName}`}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                          <Image
                            src={imageUrl}
                            alt={displayName}
                            fill
                            sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        {asset.caption && (
                          <div className="px-2 py-1.5 text-xs text-muted-foreground truncate border-t border-border">
                            {asset.caption}
                          </div>
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipBadge side="bottom" className="max-w-xs">
                      <p>{fullName}</p>
                      {asset.caption && (
                        <p className="text-xs opacity-80 mt-1">{asset.caption}</p>
                      )}
                    </TooltipBadge>
                  </Tooltip>
                </CarouselItem>
              );
            })}
            </CarouselContent>
            <CarouselPrevious className="-left-12 z-10 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-slate-700" />
            <CarouselNext className="-right-12 z-10 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-slate-700" />
          </Carousel>
        </div>
      </TooltipProvider>

      {/* Lightbox Popup */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizar imagem"
        >
          <div
            className="relative w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10 p-1.5 sm:p-2 rounded-full bg-white text-slate-700 hover:bg-slate-100 shadow-lg transition-colors"
              aria-label="Fechar imagem"
            >
              <LuX className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <Image
              src={lightboxImage.url}
              alt={lightboxImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] lg:max-h-[85vh] object-contain rounded-lg shadow-2xl"
              priority
            />
            {lightboxImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                <p className="text-white text-xs sm:text-sm text-center">{lightboxImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
