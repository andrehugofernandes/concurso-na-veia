'use client';

import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { LuLayoutList, LuPencil } from 'react-icons/lu';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function AccordionNodeView({ node }: NodeViewProps) {
  const { id, title, itemCount } = node.attrs as {
    id: string;
    title?: string;
    itemCount?: number;
  };

  const displayTitle = title || 'Acordeon sem título';
  const displayCount = itemCount ?? 0;

  return (
    <NodeViewWrapper className="wp2next-accordion-node my-4">
      <div
        className={cn(
          "flex items-center gap-3 p-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-colors",
          "border-primary/20 bg-primary/5 dark:bg-primary/10"
        )}
        contentEditable={false}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary shrink-0">
          <LuLayoutList className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Acordeon
          </div>
          <div className="font-semibold text-foreground truncate">{displayTitle}</div>
          <div className="text-xs text-muted-foreground">
            {displayCount} {displayCount === 1 ? 'item' : 'itens'}
          </div>
        </div>

        <Link
          href={`/admin/accordions?edit=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
            "bg-background border border-input hover:bg-accent hover:text-accent-foreground shadow-sm"
          )}
          contentEditable={false}
        >
          <span>Editar</span>
          <LuPencil className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </NodeViewWrapper>
  );
}
