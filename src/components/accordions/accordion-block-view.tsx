'use client';

import { useState } from 'react';
import { LuFileText, LuImage, LuType, LuChevronDown } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { availableThemes } from '@/lib/themes';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { AccordionItemText } from './accordion-item-text';
import { AccordionItemFilesCarousel } from './accordion-item-files-carousel';
import { AccordionItemImagesCarousel } from './accordion-item-images-carousel';

interface MediaAsset {
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

interface AccordionItemData {
  id: string;
  title: string;
  type: 'text' | 'files' | 'images';
  order: number;
  colorKey: string | null;
  textContent: string | null;
  assets: MediaAsset[];
}

function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1f2937' : '#ffffff';
}

interface AccordionBlockData {
  id: string;
  title: string;
  slug: string | null;
  isActive: boolean;
  items: AccordionItemData[];
}

interface AccordionBlockViewProps {
  accordion: AccordionBlockData;
  defaultValue?: string[];
  className?: string;
  showTitle?: boolean;
  showItemCount?: boolean;
}

function getTypeIcon(type: 'text' | 'files' | 'images') {
  switch (type) {
    case 'images':
      return LuImage;
    case 'files':
      return LuFileText;
    default:
      return LuType;
  }
}

function getItemCountLabel(type: 'text' | 'files' | 'images', count: number) {
  if (type === 'text') return null;
  if (type === 'images') return `${count} ${count === 1 ? 'imagem' : 'imagens'}`;
  return `${count} ${count === 1 ? 'arquivo' : 'arquivos'}`;
}

export function AccordionBlockView({
  accordion,
  defaultValue,
  className,
  showTitle = true,
  showItemCount = true,
}: AccordionBlockViewProps) {
  const sortedItems = [...accordion.items].sort((a, b) => a.order - b.order);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (defaultValue) {
      defaultValue.forEach((id) => {
        initial[id] = true;
      });
    }
    return initial;
  });

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className={cn('w-full', className)}>
      {showTitle && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{accordion.title}</h3>
          {accordion.slug && (
            <p className="text-xs text-muted-foreground mt-0.5">{accordion.slug}</p>
          )}
        </div>
      )}

      <div className="w-full flex flex-col gap-3">
        {sortedItems.map((item) => {
          const Icon = getTypeIcon(item.type);
          const countLabel = getItemCountLabel(item.type, item.assets.length);
          const itemColor = item.colorKey && availableThemes[item.colorKey]
            ? availableThemes[item.colorKey].primary
            : null;
          const textColor = itemColor ? getContrastColor(itemColor) : undefined;
          const isOpen = openItems[item.id] || false;

          return (
            <Collapsible
              key={item.id}
              open={isOpen}
              onOpenChange={() => toggleItem(item.id)}
              className="rounded-lg border border-border bg-white dark:bg-slate-900"
            >
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 transition-colors duration-200 rounded-t-lg',
                    !itemColor && 'hover:bg-accent/50',
                    itemColor && 'hover:shadow-md',
                    isOpen && 'rounded-b-none'
                  )}
                  style={itemColor ? { backgroundColor: itemColor, color: textColor } : undefined}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          'flex items-center justify-center w-8 h-8 rounded-full shrink-0',
                          !itemColor && 'bg-primary/10 text-primary'
                        )}
                        style={itemColor ? { backgroundColor: 'rgba(255,255,255,0.2)', color: textColor } : undefined}
                        aria-hidden="true"
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium truncate text-left">
                        {item.title}
                      </span>
                    </div>
                    {showItemCount && countLabel && (
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ml-3',
                          !itemColor && 'bg-muted text-muted-foreground',
                        )}
                        style={itemColor ? { backgroundColor: 'rgba(255,255,255,0.25)', color: textColor } : undefined}
                      >
                        {countLabel}
                      </span>
                    )}
                  </div>
                  <LuChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 transition-transform duration-200 ml-2',
                      isOpen && 'rotate-180'
                    )}
                    style={itemColor ? { color: textColor } : undefined}
                    aria-hidden="true"
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 pb-4 px-4 bg-white dark:bg-slate-900 rounded-b-lg overflow-visible">
                {item.type === 'text' && <AccordionItemText content={item.textContent} />}
                {item.type === 'files' && <AccordionItemFilesCarousel assets={item.assets} />}
                {item.type === 'images' && <AccordionItemImagesCarousel assets={item.assets} />}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {sortedItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border border-dashed border-border rounded-lg">
          Este acordeon não possui itens.
        </div>
      )}
    </div>
  );
}

export type { AccordionBlockData, AccordionItemData, MediaAsset };
