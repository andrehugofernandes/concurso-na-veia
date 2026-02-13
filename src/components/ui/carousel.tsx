'use client';

import * as React from 'react';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type CarouselApi = EmblaCarouselType;

type CarouselContextValue = {
  carouselRef: (node: HTMLElement | null) => void;
  api: CarouselApi | null;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: 'horizontal' | 'vertical';
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel(): CarouselContextValue {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) {
    throw new Error('useCarousel must be used within <Carousel />');
  }
  return ctx;
}

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: EmblaOptionsType;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

function Carousel({ className, orientation = 'horizontal', opts, setApi, children, ...props }: CarouselProps) {
  const [emblaRef, api] = useEmblaCarousel(
    {
      axis: orientation === 'horizontal' ? 'x' : 'y',
      ...opts,
    },
    []
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const handleSelect = React.useCallback((emblaApi: CarouselApi) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api) return;

    setApi?.(api);
    handleSelect(api);
    api.on('reInit', handleSelect);
    api.on('select', handleSelect);

    return () => {
      api.off('reInit', handleSelect);
      api.off('select', handleSelect);
    };
  }, [api, handleSelect, setApi]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (orientation === 'horizontal') {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      }

      if (orientation === 'vertical') {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          scrollPrev();
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          scrollNext();
        }
      }
    },
    [orientation, scrollNext, scrollPrev]
  );

  const value = React.useMemo<CarouselContextValue>(
    () => ({
      carouselRef: emblaRef,
      api: api ?? null,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      orientation,
    }),
    [api, canScrollNext, canScrollPrev, emblaRef, orientation, scrollNext, scrollPrev]
  );

  return (
    <CarouselContext.Provider value={value}>
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn('relative', className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div data-slot="carousel-viewport" ref={carouselRef} className="overflow-hidden">
      <div
        data-slot="carousel-container"
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { orientation } = useCarousel();

  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
}

type CarouselButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function CarouselPrevious({ className, ...props }: CarouselButtonProps) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      data-slot="carousel-previous"
      type="button"
      aria-label="Anterior"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        'absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function CarouselNext({ className, ...props }: CarouselButtonProps) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      data-slot="carousel-next"
      type="button"
      aria-label="Próximo"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        'absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi };
