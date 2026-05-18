"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/lib/contexts/theme-context";
import { useTheme as useNextTheme } from "next-themes";
import { availableThemes } from "@/lib/themes";
import { motion, AnimatePresence } from "framer-motion";
import { LuSun, LuMoon, LuPalette } from "react-icons/lu";

export function AuthThemeToggle({ isScrolled = false }: { isScrolled?: boolean }) {
  const { currentTheme, setThemeColor } = useTheme();
  const { resolvedTheme, setTheme } = useNextTheme();
  const [showPalette, setShowPalette] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const buttonClasses = `w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 group shadow-sm backdrop-blur-md border ${
    isScrolled
      ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
      : "bg-white/10 border-white/20 hover:bg-white/20"
  }`;

  return (
    <div className="flex items-center gap-3">
      {/* Dark/Light Toggle */}
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={buttonClasses}
        title={isDark ? "Modo Claro" : "Modo Escuro"}
      >
        {isDark ? (
          <LuSun className={`w-5 h-5 group-hover:scale-110 transition-transform ${isScrolled ? "text-primary" : "text-white"}`} />
        ) : (
          <LuMoon className={`w-5 h-5 group-hover:scale-110 transition-transform ${isScrolled ? "text-primary" : "text-white"}`} />
        )}
      </button>

      {/* Color Palette Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowPalette(!showPalette)}
          className={buttonClasses}
          title="Mudar Cor do Tema"
        >
          <LuPalette className={`w-5 h-5 group-hover:scale-110 transition-transform ${isScrolled ? "text-primary" : "text-white"}`} />
        </button>

        {/* Palette Dropdown */}
        <AnimatePresence>
          {showPalette && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowPalette(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-3 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 p-4 min-w-[200px]"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3 px-1">
                  Sistemas de Skin
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(availableThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setThemeColor(key);
                        setShowPalette(false);
                      }}
                      className={`w-10 h-10 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center relative ${
                        currentTheme === key
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "hover:ring-2 hover:ring-primary/30"
                      }`}
                      style={{ backgroundColor: theme.primary }}
                      title={theme.name}
                    >
                      {currentTheme === key && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                          <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
