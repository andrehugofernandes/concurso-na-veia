"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/lib/contexts/theme-context";
import { useTheme as useNextTheme } from "next-themes";
import { availableThemes } from "@/lib/themes";

export function AuthThemeToggle() {
  const { currentTheme, setThemeColor } = useTheme();
  const { resolvedTheme, setTheme } = useNextTheme();
  const [showPalette, setShowPalette] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      {/* Dark/Light Toggle */}
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-white/20 dark:hover:bg-slate-700 transition-all duration-200 group"
        title={isDark ? "Modo Claro" : "Modo Escuro"}
      >
        {isDark ? (
          <svg
            className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-slate-600 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>

      {/* Color Palette Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowPalette(!showPalette)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-white/20 dark:hover:bg-slate-700 transition-all duration-200 group"
          title="Mudar Cor do Tema"
        >
          <svg
            className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </button>

        {/* Palette Dropdown */}
        {showPalette && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowPalette(false)}
            />
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-3 min-w-[160px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-1">
                Tema
              </p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(availableThemes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setThemeColor(key);
                      setShowPalette(false);
                    }}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                      currentTheme === key
                        ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-gray-400 scale-105"
                        : ""
                    }`}
                    style={{ backgroundColor: theme.primary }}
                    title={theme.name}
                  >
                    {currentTheme === key && (
                      <svg
                        className="w-4 h-4 text-white drop-shadow"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
