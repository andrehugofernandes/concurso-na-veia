"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"
import { ThemeProvider as CustomThemeProvider, useTheme as useCustomTheme } from "@/contexts/ThemeContext"
import { ThemeColors } from "@/lib/themes"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
    >
      <CustomThemeProvider>
        {children}
      </CustomThemeProvider>
    </NextThemesProvider>
  )
}

// Definir a interface do tema combinado
interface CombinedTheme {
  // Next Themes
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: string | undefined;
  
  // Custom Theme Colors
  currentTheme: string;
  themeColors: ThemeColors;
  isLightColor: (color: string) => boolean;
  setThemeColor: (theme: string) => void;
}

export const useTheme = (): CombinedTheme => {
  const context = useNextTheme()
  const customTheme = useCustomTheme();
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  // Valores padrão caso o contexto personalizado não esteja disponível
  const defaultCustomTheme = {
    currentTheme: '',
    themeColors: { primary: '', primaryHover: '', name: '' },
    isLightColor: () => true,
    setTheme: () => {}
  }
  
  return {
    // Next Themes
    theme: context.theme,
    setTheme: context.setTheme,
    resolvedTheme: context.resolvedTheme,
    
    // Custom Theme Colors
    currentTheme: customTheme?.currentTheme || defaultCustomTheme.currentTheme,
    themeColors: customTheme?.themeColors || defaultCustomTheme.themeColors,
    isLightColor: customTheme?.isLightColor || defaultCustomTheme.isLightColor,
    setThemeColor: customTheme?.setTheme || defaultCustomTheme.setTheme
  }
}