'use client';

import { cn } from '@/lib/utils';

interface AccordionItemTextProps {
  content: string | null;
  className?: string;
}

export function AccordionItemText({ content, className }: AccordionItemTextProps) {
  if (!content) {
    return (
      <div className={cn('text-sm text-muted-foreground italic', className)}>
        Nenhum conteúdo de texto.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'prose prose-sm dark:prose-invert max-w-none text-foreground',
        'whitespace-pre-wrap break-words',
        className
      )}
    >
      {content}
    </div>
  );
}
