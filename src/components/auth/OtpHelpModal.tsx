"use client";

import { useState } from "react";
import { OtpTutorialContent } from "./OtpTutorialContent";

interface OtpHelpModalProps {
  mode: "setup" | "verify";
  isOpen: boolean;
  onClose: () => void;
}

export function OtpHelpModal({ mode, isOpen, onClose }: OtpHelpModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[10%] bottom-[10%] z-50 animate-in slide-in-from-bottom-4 fade-in-0 duration-300">
        <div className="relative h-full flex flex-col rounded-2xl overflow-hidden">
          {/* Animated border - dark mode only */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 dark:opacity-100 pointer-events-none z-0">
            <div
              className="absolute inset-0 animate-border-spin rounded-2xl"
              style={{
                background: `conic-gradient(
                  from var(--angle),
                  transparent 0%,
                  transparent 70%,
                  #f59e0b 85%,
                  #f97316 90%,
                  #f59e0b 95%,
                  transparent 100%
                )`,
                padding: "2px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 dark:opacity-40 pointer-events-none blur-sm z-0">
            <div
              className="absolute inset-0 animate-border-spin rounded-2xl"
              style={{
                background: `conic-gradient(
                  from var(--angle),
                  transparent 0%,
                  transparent 75%,
                  #f59e0b 85%,
                  #f97316 90%,
                  #f59e0b 95%,
                  transparent 100%
                )`,
                padding: "2px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />
          </div>

          {/* Background */}
          <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 z-[1]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-slate-700/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔐</span>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  {mode === "setup"
                    ? "Como Configurar o Autenticador"
                    : "Como Usar o Autenticador"}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Tutorial Content */}
            <div className="flex-1 overflow-y-auto bg-slate-950/50 dark:bg-transparent">
              <OtpTutorialContent mode={mode} />
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-200 dark:border-slate-700/50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all text-sm"
              >
                Entendi, vou digitar o código
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
