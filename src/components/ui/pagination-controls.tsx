"use client";

import { cn } from "@/lib/utils";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}

const baseBtn =
  "inline-flex items-center justify-center px-3 h-9 rounded-md border text-sm transition-colors select-none";

export function PaginationControls({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [20, 40, 60],
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, pageSize)));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const go = (p: number) => {
    const target = Math.min(totalPages, Math.max(1, p));
    if (target !== page) onPageChange(target);
  };

  const windowPages = () => {
    const arr: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) arr.push(i);
    if (!arr.includes(1)) arr.unshift(1);
    if (!arr.includes(totalPages)) arr.push(totalPages);
    return Array.from(new Set(arr)).sort((a, b) => a - b);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-2" role="navigation" aria-label="Paginação">
        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={!hasPrev}
          className={cn(
            baseBtn,
            "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200",
            hasPrev ? "hover:bg-gray-50 dark:hover:bg-gray-800" : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Página anterior"
        >
          Anterior
        </button>
        <div className="flex items-center gap-1">
          {windowPages().map((p, idx, arr) => {
            const isActive = p === page;
            const prev = arr[idx - 1];
            const showDots = prev && p - prev > 1;
            return (
              <div key={p} className="flex items-center">
                {showDots && <span className="px-2 text-gray-400">…</span>}
                <button
                  type="button"
                  onClick={() => go(p)}
                  className={cn(
                    baseBtn,
                    isActive
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
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
          onClick={() => go(page + 1)}
          disabled={!hasNext}
          className={cn(
            baseBtn,
            "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200",
            hasNext ? "hover:bg-gray-50 dark:hover:bg-gray-800" : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Próxima página"
        >
          Próxima
        </button>
      </div>

      {onPageSizeChange && (
        <div className="flex items-center gap-2" aria-label="Itens por página">
          <span className="text-sm text-gray-600 dark:text-gray-300">Itens por página:</span>
          <div className="flex items-center gap-1">
            {pageSizeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onPageSizeChange(opt)}
                className={cn(
                  baseBtn,
                  opt === pageSize
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
                aria-label={`${opt} por página${opt === pageSize ? ' (selecionado)' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
