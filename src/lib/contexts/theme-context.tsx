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

  // Helper para converter hex para HSL (valores separados por espaço para o Tailwind)
  const hexToHsl = (hex: string): string => {
    // Remover o # se existir
    hex = hex.replace(/^#/, '');

    // Converter para RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Converter para HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    // Retornar no formato que o Tailwind espera (ex: "222.2 47.4% 11.2%")
    return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
  };

  // Aplicar CSS variables quando o tema de cor mudar
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const colors = availableThemes[currentTheme] || availableThemes[defaultTheme];

      // Converter hex para HSL para funcionar com a opacidade do Tailwind (bg-primary/10)
      const primaryHsl = hexToHsl(colors.primary);
      const primaryHoverHsl = hexToHsl(colors.primaryHover);

      root.style.setProperty('--primary', primaryHsl);
      root.style.setProperty('--primary-hover', primaryHoverHsl);
      root.style.setProperty('--primary-rgb', colors.primary); // Mantendo compatibilidade se necessário

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
