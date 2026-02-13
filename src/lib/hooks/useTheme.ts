'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, systemTheme, themes } = useNextTheme();

  return {
    theme: theme as 'light' | 'dark' | 'system' | undefined,
    setTheme,
    systemTheme: systemTheme as 'light' | 'dark' | undefined,
    themes,
    isDark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
  };
}
