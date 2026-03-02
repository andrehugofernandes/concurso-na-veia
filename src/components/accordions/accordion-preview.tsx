'use client';

import { useEffect, useMemo } from 'react';
import { LuX } from 'react-icons/lu';
import type { AccordionBlockDetails } from '@/app/admin/accordions/actions';
import { AccordionBlockView, type AccordionBlockData } from './accordion-block-view';

interface AccordionPreviewProps {
  accordion: AccordionBlockDetails;
  onClose: () => void;
}

export function AccordionPreview({ accordion, onClose }: AccordionPreviewProps) {
  const accordionData = useMemo<AccordionBlockData>(() => {
    return {
      id: accordion.id,
      title: accordion.title,
      slug: accordion.slug,
      isActive: accordion.isActive,
      items: accordion.items.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        order: item.order,
        colorKey: item.colorKey,
        textContent: item.textContent,
        assets: item.assets,
      })),
    };
  }, [accordion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Preview do acordeon"
    >
      <div
        className="relative w-full max-w-4xl mx-4 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-white text-slate-700 hover:bg-slate-100 shadow-lg transition-colors"
          aria-label="Fechar preview"
        >
          <LuX className="h-5 w-5" />
        </button>

        <div className="rounded-xl shadow-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs text-gray-500 dark:text-slate-400">Acordeon</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-slate-100 truncate">{accordion.title}</div>
                {accordion.slug && (
                  <div className="text-xs text-gray-500 dark:text-slate-400 truncate">{accordion.slug}</div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={accordion.isActive ? 'px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-slate-500/10 text-gray-600 dark:text-slate-400'}>
                  {accordion.isActive ? 'Ativo' : 'Inativo'}
                </span>
                <span className="px-2 py-1 rounded text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">
                  {accordion.items.length} {accordion.items.length === 1 ? 'item' : 'itens'}
                </span>
              </div>
            </div>
          </div>

          <div className="py-12 px-14">
            <AccordionBlockView
              accordion={accordionData}
              showTitle={false}
              showItemCount
            />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="px-4 py-2 bg-yellow-500 text-yellow-900 text-sm font-medium rounded-full shadow-lg">
            Modo Preview - Clique fora para fechar
          </div>
        </div>
      </div>
    </div>
  );
}
