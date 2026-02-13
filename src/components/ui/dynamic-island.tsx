'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSun, LuMoon } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { availableThemes, defaultTheme } from '@/lib/themes';

// Converter availableThemes para array de cores
const SKIN_COLORS = Object.entries(availableThemes).map(([key, theme]) => ({
  name: key,
  value: theme.primary,
  label: theme.name,
}));

const DEFAULT_SKIN = availableThemes[defaultTheme].primary;

function hexToRgbTriplet(hex: string): string {
  const clean = hex.trim().replace('#', '');
  if (clean.length !== 6) return '59 130 246';
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return '59 130 246';
  return `${r} ${g} ${b}`;
}

interface DynamicIslandProps {
  className?: string;
  position?: 'bottom-center' | 'bottom-right' | 'top-center' | 'top-right' | 'center' | 'static';
  children?: React.ReactNode;
}

export function DynamicIsland({ 
  className,
  position = 'bottom-center',
  children,
}: DynamicIslandProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedThemeKey, setSelectedThemeKey] = useState(defaultTheme);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Carregar preferências do localStorage (usando mesmas chaves do theme-context)
  useEffect(() => {
    const storedMode = localStorage.getItem('app-theme-mode');
    const storedTheme = localStorage.getItem('app-theme-color');
    
    // Modo claro/escuro
    if (storedMode === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (storedMode === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Detectar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    // Tema de cor (skin)
    if (storedTheme && availableThemes[storedTheme]) {
      setSelectedThemeKey(storedTheme);
      const colors = availableThemes[storedTheme];
      document.documentElement.style.setProperty('--primary', colors.primary);
      document.documentElement.style.setProperty('--primary-hover', colors.primaryHover);
      document.documentElement.style.setProperty('--primary-rgb', hexToRgbTriplet(colors.primary));
      document.documentElement.style.setProperty('--primary-hover-rgb', hexToRgbTriplet(colors.primaryHover));
    } else {
      // Aplicar tema padrão
      const colors = availableThemes[defaultTheme];
      document.documentElement.style.setProperty('--primary', colors.primary);
      document.documentElement.style.setProperty('--primary-hover', colors.primaryHover);
      document.documentElement.style.setProperty('--primary-rgb', hexToRgbTriplet(colors.primary));
      document.documentElement.style.setProperty('--primary-hover-rgb', hexToRgbTriplet(colors.primaryHover));
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('app-theme-mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('app-theme-mode', 'light');
    }
  };

  // Selecionar skin e salvar imediatamente, fechando o componente
  const handleSkinSelect = (themeKey: string) => {
    setSelectedThemeKey(themeKey);
    const colors = availableThemes[themeKey];
    if (colors) {
      document.documentElement.style.setProperty('--primary', colors.primary);
      document.documentElement.style.setProperty('--primary-hover', colors.primaryHover);
      document.documentElement.style.setProperty('--primary-rgb', hexToRgbTriplet(colors.primary));
      document.documentElement.style.setProperty('--primary-hover-rgb', hexToRgbTriplet(colors.primaryHover));
    }
    localStorage.setItem('app-theme-color', themeKey);
    window.dispatchEvent(
      new CustomEvent('app-theme-color-change', { detail: { themeKey } })
    );
    // Fechar o componente após selecionar
    setIsExpanded(false);
  };
  
  // Cor atual selecionada
  const selectedColor = availableThemes[selectedThemeKey]?.primary || DEFAULT_SKIN;

  useEffect(() => {
    if (!isExpanded) return;

    const handleMouseDown = (event: MouseEvent) => {
      const targetNode = event.target as Node | null;
      const container = containerRef.current;
      if (!targetNode || !container) return;
      if (container.contains(targetNode)) return;
      setIsExpanded(false);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const targetNode = event.target as Node | null;
      const container = containerRef.current;
      if (!targetNode || !container) return;
      if (container.contains(targetNode)) return;
      setIsExpanded(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsExpanded(false);
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

  // Posicionamento
  const positionClasses = {
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-6 right-6',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'top-right': 'top-6 right-6',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    static: '',
  };

  if (children) {
    return (
      <div
        className={cn(
          position === 'static' ? '' : 'fixed z-50',
          positionClasses[position],
          'w-full',
          className,
        )}
      >
        <div
          className={cn(
            'rounded-lg shadow-lg backdrop-blur-sm',
            'bg-white/90 dark:bg-slate-900/90',
            'border border-gray-200 dark:border-slate-700',
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        'fixed z-50',
        positionClasses[position],
        className,
      )}
      layout
    >
      <motion.div
        className={cn(
          'rounded-full shadow-lg backdrop-blur-sm',
          'bg-white/90 dark:bg-slate-900/90',
          'border border-gray-200 dark:border-slate-700',
        )}
        layout
        initial={false}
        animate={{
          borderRadius: isExpanded ? 20 : 50,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-4"
            >
              {/* Paleta de cores */}
              <div id="dynamic-island-skins" className="flex gap-2 justify-center flex-wrap">
                {SKIN_COLORS.map((skin) => (
                  <button
                    key={skin.name}
                    onClick={() => handleSkinSelect(skin.name)}
                    className={cn(
                      'w-10 h-10 rounded-full transition-all hover:scale-110',
                      // Light mode: sombra lg | Dark mode: apenas borda
                      'shadow-lg dark:shadow-none dark:border dark:border-slate-600',
                      selectedThemeKey === skin.name && 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900',
                    )}
                    style={{ 
                      backgroundColor: skin.value,
                      // @ts-expect-error - ringColor é válido para Tailwind mas não para CSSProperties
                      '--tw-ring-color': skin.value,
                    }}
                    aria-label={`Selecionar cor ${skin.label}`}
                    title={skin.label}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-3 py-2"
            >
              {/* Ícone sol/lua */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {isDark ? (
                  <LuSun className="w-5 h-5" />
                ) : (
                  <LuMoon className="w-5 h-5" />
                )}
              </button>

              {/* Botão de cor (abre paleta) */}
              <button
                onClick={() => setIsExpanded(true)}
                className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: selectedColor }}
                aria-label="Abrir seletor de cores"
                aria-controls="dynamic-island-skins"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default DynamicIsland;
