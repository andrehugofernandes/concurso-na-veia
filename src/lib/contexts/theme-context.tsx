"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  availableThemes,
  defaultTheme,
  isLightColor,
  hexToHsl,
  hexToRgbValues,
  type ThemeColors,
} from "@/lib/themes";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  currentTheme: string;
  themeColors: ThemeColors;
  setThemeColor: (theme: string) => void;
  isLightColor: (color: string) => boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children,
  tenantPrimary,
  tenantSecondary,
}: { 
  children: ReactNode;
  tenantPrimary?: string;
  tenantSecondary?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<"light" | "dark">("dark");
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  useEffect(() => {
    setMounted(true);
    // Carregar tema salvo se nao for tenant especifico
    if (!tenantPrimary) {
      const savedTheme = localStorage.getItem("app-theme-color");
      if (savedTheme && availableThemes[savedTheme]) {
        setCurrentTheme(savedTheme);
      }
    }
    // Carregar modo claro/escuro
    const savedMode = localStorage.getItem("app-theme-mode");
    if (savedMode === "light" || savedMode === "dark") {
      setThemeState(savedMode);
    } else {
      // Detectar preferência do sistema
      const isDark = document.documentElement.classList.contains("dark");
      setThemeState(isDark ? "dark" : "light");
    }
  }, [tenantPrimary]);

  // Aplicar CSS variables quando o tema de cor mudar
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      
      let primaryColor = tenantPrimary;
      let primaryHoverColor = tenantPrimary;

      if (!primaryColor) {
        const colors = availableThemes[currentTheme] || availableThemes[defaultTheme];
        primaryColor = colors.primary;
        primaryHoverColor = colors.primaryHover;
      }

      // Converter hex para HSL para funcionar com a opacidade do Tailwind (bg-primary/10)
      const primaryHsl = hexToHsl(primaryColor);
      const primaryHoverHsl = hexToHsl(primaryHoverColor || primaryColor);
      const primaryRgbValues = hexToRgbValues(primaryColor);

      // Limpar valores anteriores para garantir atualização
      root.style.removeProperty("--primary");
      root.style.removeProperty("--primary-hex");
      root.style.removeProperty("--primary-rgb");
      root.style.removeProperty("--primary-hover");

      root.style.setProperty("--primary", primaryHsl);
      root.style.setProperty("--primary-hover", primaryHoverHsl);
      root.style.setProperty("--primary-hex", primaryColor);
      root.style.setProperty("--primary-hover-hex", primaryHoverColor || primaryColor);
      root.style.setProperty("--primary-rgb", primaryRgbValues);

      const grad = `linear-gradient(135deg, ${primaryColor} 0%, ${primaryHoverColor || primaryColor} 100%)`;
      const gradHover = `linear-gradient(135deg, ${primaryHoverColor || primaryColor} 0%, ${primaryColor} 100%)`;
      root.style.setProperty("--primary-gradient", grad);
      root.style.setProperty("--primary-gradient-hover", gradHover);

      // Calcular contraste para o texto sobre a cor primária
      const isLight = isLightColor(primaryColor);
      const foregroundHsl = isLight ? "222.2 84.7% 4.9%" : "210 40% 98%";
      root.style.setProperty("--primary-foreground", foregroundHsl);

      if (mounted && !tenantPrimary) {
        localStorage.setItem("app-theme-color", currentTheme);
      }
    }
  }, [currentTheme, tenantPrimary, tenantSecondary, mounted]);

  // Aplicar modo claro/escuro
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      if (mounted) {
        localStorage.setItem("app-theme-mode", theme);
      }
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: "light" | "dark") => {
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
        themeColors:
          availableThemes[currentTheme] || availableThemes[defaultTheme],
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
