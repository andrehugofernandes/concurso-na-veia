'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MenuOption {
  value: string | number;
  label: string;
  subLabel?: string;
}

interface MenuSelectorDynamicIslandProps {
  label: string;
  value: string | number | null;
  options: MenuOption[];
  onChange: (value: string | number) => void;
  className?: string;
  disabled?: boolean;
}

export function MenuSelectorDynamicIsland({
  label,
  value,
  options,
  onChange,
  className,
  disabled = false
}: MenuSelectorDynamicIslandProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    if (!isExpanded) return;

    const handleMouseDown = (event: MouseEvent) => {
      const targetNode = event.target as Node | null;
      const container = containerRef.current;
      if (!targetNode || !container) return;
      if (container.contains(targetNode)) return;
      setIsExpanded(false);
      setIsFloating(false);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const targetNode = event.target as Node | null;
      const container = containerRef.current;
      if (!targetNode || !container) return;
      if (container.contains(targetNode)) return;
      setIsExpanded(false);
      setIsFloating(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsExpanded(false);
      setIsFloating(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded]);

  const handleLabelClick = () => {
    if (disabled) return;
    
    setIsFloating(true);
    setTimeout(() => setIsExpanded(true), 100);
  };

  const handleOptionSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsExpanded(false);
    setIsFloating(false);
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Label inicial (quando não está flutuando) */}
      {!isFloating && (
        <label
          onClick={handleLabelClick}
          className={cn(
            'text-sm font-medium text-gray-700 dark:text-slate-300 cursor-pointer',
            'hover:text-[var(--primary)] transition-colors',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {label}
        </label>
      )}

      {/* Badge flutuante e select expandido */}
      <motion.div
        className={cn(
          'fixed z-50 transition-all duration-300 ease-out',
          isFloating 
            ? 'top-0 left-0 transform -translate-y-full' 
            : 'top-8 left-0 opacity-0 pointer-events-none'
        )}
        layout
      >
        <AnimatePresence mode="wait">
          {isFloating && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="space-y-0"
            >
              {/* Badge flutuante */}
              <motion.div
                className={cn(
                  'bg-[var(--primary)] text-white px-4 py-2 rounded-t-lg',
                  'shadow-lg border border-[var(--primary)]',
                  'flex items-center gap-2 text-sm font-medium'
                )}
                layout
              >
                <span>{label}</span>
                {selectedOption && (
                  <span className="text-white/80 text-xs">
                    {selectedOption.label}
                  </span>
                )}
              </motion.div>
              
              {/* Menu expandido */}
              <motion.div
                className={cn(
                  'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700',
                  'rounded-b-lg shadow-xl overflow-hidden',
                  'transition-all duration-200'
                )}
                layout
              >
                <div className="max-h-64 overflow-y-auto">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleOptionSelect(option.value)}
                      className={cn(
                        'w-full text-left px-4 py-3 text-sm',
                        'hover:bg-gray-50 dark:hover:bg-slate-700',
                        'focus:bg-gray-50 dark:focus:bg-slate-700',
                        'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-inset',
                        'transition-colors',
                        option.value === value && 'bg-gray-50 dark:bg-slate-700 text-[var(--primary)] font-medium',
                        'border-b border-gray-100 dark:border-slate-700 last:border-b-0'
                      )}
                    >
                      <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-slate-100">
                          {option.label}
                        </span>
                        {option.subLabel && (
                          <span className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                            {option.subLabel}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Select oculto para acessibilidade */}
      <select
        value={value ?? ''}
        onChange={(e) => handleOptionSelect(e.target.value ? Number(e.target.value) : '')}
        disabled={disabled}
        className="sr-only"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
