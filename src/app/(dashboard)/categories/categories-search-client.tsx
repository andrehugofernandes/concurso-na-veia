'use client';

import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { cn } from '@/lib/utils';

interface CategoriesSearchClientProps {
  search?: string;
}

export function CategoriesSearchClient({ search }: CategoriesSearchClientProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <>
      {/* Desktop: Form normal */}
      <form
        action="/admin/categories"
        method="get"
        className="hidden md:flex gap-2 flex-1 max-w-md"
      >
        <div className="relative flex-1">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            name="search"
            defaultValue={search || ''}
            placeholder="Buscar categorias..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 
            focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors shadow-md"
        >
          Buscar
        </button>
      </form>
      {/* Mobile: AnimatedInput com Enter */}
      <form
        action="/admin/categories"
        method="get"
        className="md:hidden"
      >
        <div className="relative" data-testid="mobile-search-input">
          <input
            type="text"
            name="search"
            defaultValue={search || ''}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={(e) => {
              if (!e.target.value) {
                setIsSearchFocused(false);
              }
            }}
            className="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
            placeholder="Buscar categorias..."
            aria-label="Buscar categorias"
            title="Buscar categorias"
            data-testid="mobile-search-field"
          />
          <label 
            className={cn(
              'pointer-events-none absolute origin-left text-base left-3 bg-white dark:bg-slate-900 px-1 transition-all duration-200 ease-in-out z-50',
              isSearchFocused || search
                ? 'top-0 -translate-y-1/2 scale-75' 
                : 'top-1/2 -translate-y-1/2 scale-100'
            )}
            data-testid="mobile-search-label"
          >
            <span className={cn(
              'inline-block rounded px-1 transition-colors',
              isSearchFocused || search
                ? 'border border-[var(--primary)] text-[var(--primary)]' 
                : 'border-transparent text-gray-500 dark:text-slate-400'
            )}>
              Buscar categorias
            </span>
          </label>
        </div>
      </form>
    </>
  );
}
