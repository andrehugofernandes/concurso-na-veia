"use client";

import { useState, useEffect, useCallback } from "react";

interface ReadingProgressProps {
  onComplete?: () => void;
  threshold?: number; // Percentage to consider "complete" (default 80)
}

export default function ReadingProgress({
  onComplete,
  threshold = 90, // Changed default threshold to 90 as per the provided code
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const updateScrollProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const totalScrollable = documentHeight - windowHeight;

    const currentProgress =
      totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
    const finalProgress = Math.min(100, Math.max(0, currentProgress));

    setProgress(finalProgress);

    if (finalProgress >= threshold && !hasCompleted) {
      setHasCompleted(true);
      onComplete?.();
    }
  }, [threshold, hasCompleted, onComplete]);

  useEffect(() => {
    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });

    // Intervalo para captar mudanças dinâmicas de altura (ex: imagens carregando)
    const interval = setInterval(updateScrollProgress, 1000);

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      clearInterval(interval);
    };
  }, [updateScrollProgress]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] h-14 bg-transparent pointer-events-none flex items-end pb-3">
      <div className="container mx-auto max-w-6xl px-6 md:px-0 relative w-full overflow-visible">
        {/* Track da Barra */}
        <div className="relative w-full h-1.5 bg-muted/20 dark:bg-slate-800/40 rounded-full overflow-hidden border border-border/10">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Indicador de Porcentagem Volante */}
        <div
          className="absolute bottom-5 transition-all duration-150 ease-out -translate-x-1/2"
          style={{
            left: `${progress}%`,
            opacity: progress > 0.1 ? 1 : 0, // Mostra quase imediatamente
            visibility: progress > 0.1 ? "visible" : "hidden",
          }}
        >
          <div className="bg-background dark:bg-slate-800 border border-border shadow-md px-2 py-0.5 rounded text-[10px] md:text-xs font-bold text-primary whitespace-nowrap flex flex-col items-center">
            {Math.round(progress)}%{/* Ponteiro discreto */}
            <div className="w-1.5 h-1.5 bg-background dark:bg-slate-800 border-r border-b border-border rotate-45 -mb-1.5 mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
