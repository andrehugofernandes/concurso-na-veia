import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSun, LuMoon } from "react-icons/lu";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme } from "@/lib/contexts/theme-context";
import { cn } from "@/lib/utils";
import { availableThemes, defaultTheme } from "@/lib/themes";

// Converter availableThemes para array de cores
const SKIN_COLORS = Object.entries(availableThemes).map(([key, theme]) => ({
  name: key,
  value: theme.primary,
  label: theme.name,
}));

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
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { theme, setTheme, currentTheme, setThemeColor } = useTheme();
  const { setTheme: setNextTheme } = useNextTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle dark mode via context
  const toggleDarkMode = () => {
    const newMode = isDark ? "light" : "dark";
    setTheme(newMode);
    setNextTheme(newMode);
  };

  // Selecionar skin via context
  const handleSkinSelect = (themeKey: string) => {
    setThemeColor(themeKey);
    setIsExpanded(false);
  };

  // Cor atual selecionada (hex para exibição visual)
  const selectedColor =
    availableThemes[currentTheme]?.primary ||
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
          borderRadius: isExpanded ? 24 : 50,
          width: isExpanded
            ? typeof window !== "undefined" && window.innerWidth < 768
              ? 56
              : "auto"
            : "auto",
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
                className="flex flex-col md:flex-row gap-2 justify-center items-center py-1"
              >
                {SKIN_COLORS.map((skin) => (
                  <button
                    key={skin.name}
                    onClick={() => handleSkinSelect(skin.name)}
                    className={cn(
                      "w-9 h-9 rounded-full transition-all hover:scale-110",
                      "shadow-md dark:shadow-none dark:border dark:border-slate-600",
                      currentTheme === skin.name &&
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
