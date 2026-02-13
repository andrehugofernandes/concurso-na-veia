"use client";

import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: (number | string)[];
}

const baseButtonClasses =
  "inline-flex items-center justify-center px-3 h-9 rounded-md border text-xs transition-colors select-none";

export function PaginationControls({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
}: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (targetPage: number) => {
    const clamped = Math.min(totalPages, Math.max(1, targetPage));
    if (clamped !== page) {
      onPageChange(clamped);
    }
  };

  const getWindowPages = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let p = start; p <= end; p += 1) {
      pages.push(p);
    }

    if (!pages.includes(1)) {
      pages.unshift(1);
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return Array.from(new Set(pages)).sort((a, b) => a - b);
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2" role="navigation" aria-label="Paginação">
        <button
          type="button"
          onClick={() => goToPage(page - 1)}
          disabled={!hasPrev}
          className={cn(
            baseButtonClasses,
            "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200",
            hasPrev ? "hover:bg-gray-100 dark:hover:bg-slate-800" : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Página anterior"
        >
          Anterior
        </button>

        <div className="flex items-center gap-1">
          {getWindowPages().map((p, index, arr) => {
            const isActive = p === page;
            const previous = arr[index - 1];
            const showDots = previous && p - previous > 1;

            const isLastPage = p === totalPages;

            // Lógica para mostrar exatamente 3 botões no mobile
            let isMobileVisible = false;
            if (page < 3) {
              // Início: mostra 1, 2, 3
              isMobileVisible = p <= 3;
            } else if (page > totalPages - 2) {
              // Fim: mostra total-2, total-1, total
              isMobileVisible = p >= totalPages - 2;
            } else {
              // Meio: mostra anterior, atual, próximo
              isMobileVisible = p >= page - 1 && p <= page + 1;
            }

            return (
              <div key={p} className={cn("flex items-center", !isMobileVisible && "hidden sm:flex")}>
                {showDots && <span className="px-2 text-gray-400 dark:text-slate-500 hidden sm:inline">…</span>}
                <button
                  type="button"
                  onClick={() => goToPage(p)}
                  className={cn(
                    baseButtonClasses,
                    isActive
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Ir para a página ${p}`}
                >
                  {p}
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goToPage(page + 1)}
          disabled={!hasNext}
          className={cn(
            baseButtonClasses,
            "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200",
            hasNext ? "hover:bg-gray-100 dark:hover:bg-slate-800" : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Próxima página"
        >
          Próxima
        </button>
      </div>

      {onPageSizeChange && (
        <div className="flex items-center gap-2" aria-label="Itens por página">
          <span className="text-xs text-gray-500 dark:text-slate-400">Itens<span className="hidden sm:inline"> por página</span>:</span>
          <div className="flex items-center gap-1">
            {pageSizeOptions.map((option) => {
              const value = option === 'TODOS' ? total : (option as number);
              const isActive = value === pageSize;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onPageSizeChange(value)}
                  className={cn(
                    baseButtonClasses,
                    isActive
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                  )}
                  aria-label={`${option} por página${isActive ? " (selecionado)" : ""}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
