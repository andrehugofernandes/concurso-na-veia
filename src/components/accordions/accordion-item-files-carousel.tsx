'use client';

import { LuFileText, LuDownload } from 'react-icons/lu';
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

interface FileAsset {
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

interface AccordionItemFilesCarouselProps {
  assets: FileAsset[];
  className?: string;
}

export function AccordionItemFilesCarousel({ assets, className }: AccordionItemFilesCarouselProps) {
  if (!assets.length) {
    return (
      <div className={cn('text-sm text-muted-foreground italic', className)}>
        Nenhum arquivo anexado.
      </div>
    );
  }

  const sortedAssets = [...assets].sort((a, b) => a.order - b.order);

  return (
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
            const displayName = asset.displayLabel || fullName;

            return (
              <CarouselItem
                key={asset.id}
                className="pl-2 md:pl-3 basis-auto"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={asset.media.firebaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'group inline-flex items-center gap-2',
                        'px-4 py-2.5 rounded-full',
                        'hover:shadow-md hover:scale-[1.02]',
                        'transition-all duration-200',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                      )}
                      style={{
                        backgroundColor: 'var(--primary, #3b82f6)',
                        color: '#ffffff',
                      }}
                      aria-label={`Baixar arquivo: ${fullName}`}
                    >
                      <LuFileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium truncate max-w-[140px]">
                        {displayName}
                      </span>
                      <LuDownload
                        className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </a>
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
  );
}
