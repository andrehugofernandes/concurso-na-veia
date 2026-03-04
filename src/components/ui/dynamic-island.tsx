import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { availableThemes, defaultTheme } from "@/lib/themes";

// Converter availableThemes para array de cores
const SKIN_COLORS = Object.entries(availableThemes).map(([key, theme]) => ({
  name: key,
  value: theme.primary,
  label: theme.name,
}));

// Converter hex para RGB no formato "R, G, B" para uso com rgba()
function hexToRgb(hex: string): string {
  const clean = hex.trim().replace("#", "");
  if (clean.length !== 6) return "15, 23, 42";
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

// Converter hex para HSL no formato que o Tailwind espera: "H S% L%"
function hexToHsl(hex: string): string {
  const clean = hex.trim().replace("#", "");
  if (clean.length !== 6) return "222.2 47.4% 11.2%";
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

// Determina se a cor é clara (para definir foreground com contraste)
function isLightColor(hex: string): boolean {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

interface DynamicIslandProps {
  className?: string;
  position?:
    | "bottom-center"
    | "bottom-right"
    | "top-center"
    | "top-right"
    | "center"
    | "static";
  children?: React.ReactNode;
}

export function DynamicIsland({
  className,
  position = "bottom-center",
  children,
}: DynamicIslandProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedThemeKey, setSelectedThemeKey] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { setTheme } = useTheme();

  // Detectar tema atual ao montar
  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Carregar skin salva
  useEffect(() => {
    const storedTheme = localStorage.getItem("app-theme-color");
    if (storedTheme && availableThemes[storedTheme]) {
      setSelectedThemeKey(storedTheme);
      applySkin(storedTheme);
    } else {
      applySkin(defaultTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ouvir mudanças de skin disparadas por outros componentes
  useEffect(() => {
    const handleSkinChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.themeKey && availableThemes[detail.themeKey]) {
        setSelectedThemeKey(detail.themeKey);
      }
    };
    window.addEventListener("app-theme-color-change", handleSkinChange);
    return () =>
      window.removeEventListener("app-theme-color-change", handleSkinChange);
  }, []);

  function applySkin(themeKey: string) {
    const colors = availableThemes[themeKey];
    if (!colors) return;
    const hsl = hexToHsl(colors.primary);
    const hoverHsl = hexToHsl(colors.primaryHover);
    const light = isLightColor(colors.primary);
    const fgHsl = light ? "222.2 47.4% 11.2%" : "210 40% 98%";
    const rgb = hexToRgb(colors.primary);

    document.documentElement.style.setProperty("--primary", hsl);
    document.documentElement.style.setProperty("--primary-hover", hoverHsl);
    document.documentElement.style.setProperty("--primary-foreground", fgHsl);
    document.documentElement.style.setProperty("--primary-hex", colors.primary);
    document.documentElement.style.setProperty("--primary-rgb", rgb);
  }

  // Toggle dark mode: manipula DOM diretamente + sync next-themes
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("app-theme-mode", newIsDark ? "dark" : "light");
    setTheme(newIsDark ? "dark" : "light");
    setIsDark(newIsDark);
  };

  // Selecionar skin
  const handleSkinSelect = (themeKey: string) => {
    setSelectedThemeKey(themeKey);
    applySkin(themeKey);
    localStorage.setItem("app-theme-color", themeKey);
    window.dispatchEvent(
      new CustomEvent("app-theme-color-change", { detail: { themeKey } }),
    );
    setIsExpanded(false);
  };

  // Cor atual selecionada (hex para exibição visual)
  const selectedColor =
    availableThemes[selectedThemeKey]?.primary ||
    availableThemes[defaultTheme].primary;

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
      if (event.key !== "Escape") return;
      setIsExpanded(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  // Posicionamento
  const positionClasses = {
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-6 right-6",
    "top-center": "top-6 left-1/2 -translate-x-1/2",
    "top-right": "top-6 right-6",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    static: "",
  };

  if (children) {
    return (
      <div
        className={cn(
          position === "static" ? "" : "fixed z-50",
          positionClasses[position],
          "w-full",
          className,
        )}
      >
        <div
          className={cn(
            "rounded-lg shadow-lg backdrop-blur-sm",
            "bg-white/90 dark:bg-slate-900/90",
            "border border-gray-200 dark:border-slate-700",
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
        position === "static" ? "" : "fixed z-50",
        positionClasses[position],
        className,
      )}
      layout
    >
      <motion.div
        className={cn(
          "rounded-full shadow-lg backdrop-blur-sm",
          "bg-white/90 dark:bg-slate-900/90",
          "border border-gray-200 dark:border-slate-700",
        )}
        layout
        initial={false}
        animate={{
          borderRadius: isExpanded ? 20 : 50,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="p-3"
            >
              {/* Paleta de cores — horizontal */}
              <div
                id="dynamic-island-skins"
                className="flex gap-2 justify-center"
              >
                {SKIN_COLORS.map((skin) => (
                  <button
                    key={skin.name}
                    onClick={() => handleSkinSelect(skin.name)}
                    className={cn(
                      "w-9 h-9 rounded-full transition-all hover:scale-110",
                      "shadow-md dark:shadow-none dark:border dark:border-slate-600",
                      selectedThemeKey === skin.name &&
                        "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900",
                    )}
                    style={{
                      backgroundColor: skin.value,
                      // @ts-expect-error - ringColor é válido para Tailwind mas não para CSSProperties
                      "--tw-ring-color": skin.value,
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
              {/* Toggle dark/light via next-themes */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
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
