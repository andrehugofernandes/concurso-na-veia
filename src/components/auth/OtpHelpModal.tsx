"use client";

import { useState, useEffect } from "react";
import { OtpTutorialContent } from "./OtpTutorialContent";
import { X } from "lucide-react";

interface OtpHelpModalProps {
  mode: "setup" | "verify";
  isOpen: boolean;
  onClose: () => void;
}

export function OtpHelpModal({ mode, isOpen, onClose }: OtpHelpModalProps) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setAngle((a) => (a + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="fixed top-4 right-4 bottom-4 w-3/4 md:inset-x-0 md:mx-auto md:w-full md:max-w-lg md:top-[8%] md:bottom-[8%] z-50 animate-in slide-in-from-right-8 md:slide-in-from-bottom-8 fade-in-0 duration-500 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full flex flex-col rounded-md overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-950">
          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/10 dark:border-white/10">
                  <span className="text-lg">🔐</span>
                </div>
                <h2 className="font-bebas text-lg text-foreground tracking-wide">
                  Ajuda do Autenticador
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/5 dark:bg-white/5 text-foreground/40 hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/5 dark:border-white/5"
                aria-label="Fechar modal"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Scrollable Tutorial Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <OtpTutorialContent mode={mode} />
            </div>

            {/* Footer Action */}
            <div className="px-8 pb-8 pt-4">
              <button
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bebas text-xl uppercase tracking-wider rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_20px_-5px_rgba(245,158,11,0.3)]"
              >
                Entendi, prosseguir
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
