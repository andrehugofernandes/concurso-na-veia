'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MediaSearchClientProps {
  search?: string;
}

export function MediaSearchClient({ search }: MediaSearchClientProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <form action={`/admin/media`} method="GET" className="md:hidden">
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
          placeholder="Buscar arquivos..."
          aria-label="Buscar arquivos"
          title="Buscar arquivos"
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
            Buscar arquivos
          </span>
        </label>
      </div>
    </form>
  );
}
