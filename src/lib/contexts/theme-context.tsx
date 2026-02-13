'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { availableThemes, defaultTheme, isLightColor, type ThemeColors } from '@/lib/themes';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  currentTheme: string;
  themeColors: ThemeColors;
  setThemeColor: (theme: string) => void;
  isLightColor: (color: string) => boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  useEffect(() => {
    setMounted(true);
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('app-theme-color');
    if (savedTheme && availableThemes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    // Carregar modo claro/escuro
    const savedMode = localStorage.getItem('app-theme-mode');
    if (savedMode === 'light' || savedMode === 'dark') {
      setThemeState(savedMode);
    } else {
      // Detectar preferência do sistema
      const isDark = document.documentElement.classList.contains('dark');
      setThemeState(isDark ? 'dark' : 'light');
    }
  }, []);

  // Aplicar CSS variables quando o tema de cor mudar
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const colors = availableThemes[currentTheme] || availableThemes[defaultTheme];

      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--primary-hover', colors.primaryHover);

      if (mounted) {
        localStorage.setItem('app-theme-color', currentTheme);
      }
    }
  }, [currentTheme, mounted]);

  // Aplicar modo claro/escuro
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      if (mounted) {
        localStorage.setItem('app-theme-mode', theme);
      }
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  const setThemeColor = (newTheme: string) => {
    if (availableThemes[newTheme]) {
      setCurrentTheme(newTheme);
    }
  };

  // Removido o bloqueio de montagem para evitar erro de hydration no RootLayout

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        currentTheme,
        themeColors: availableThemes[currentTheme] || availableThemes[defaultTheme],
        setThemeColor,
        isLightColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
