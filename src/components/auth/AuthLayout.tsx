"use client";

import { ReactNode, useState } from "react";
import { HeroSlideshow } from "./HeroSlideshow";
import { OtpHelpModal } from "./OtpHelpModal";
import { DynamicIsland } from "@/components/ui/dynamic-island";

interface AuthLayoutProps {
  children: ReactNode;
  rightContent?: ReactNode;
  otpMode?: "setup" | "verify";
  showHelp?: boolean;
}

export default function AuthLayout({
  children,
  rightContent,
  otpMode = "verify",
  showHelp = false,
}: AuthLayoutProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      {/* ── Header: Transparent, overlaying content ── */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 py-3 z-50 backdrop-blur-sm bg-white/80 dark:bg-slate-900/95 shadow-sm dark:shadow-none dark:border-b dark:border-white/[0.08]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div
            className="flex h-14 w-14 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg shadow-lg shadow-black/5"
            style={{ backgroundColor: "var(--primary-hex)" }}
          >
            <span className="font-bebas text-2xl md:text-4xl font-bold text-white">
              AV
            </span>
          </div>

          {/* Logo Text Group */}
          <div className="flex flex-col justify-center leading-none">
            <h1 className="font-bebas text-2xl md:text-5xl tracking-normal leading-[0.9] flex flex-wrap items-baseline gap-1 md:gap-2">
              <span style={{ color: "var(--primary-hex)" }}>A VAGA</span>
              <span className="text-foreground">É MINHA</span>
            </h1>
            <span className="font-sans text-[7px] md:text-[13px] font-bold uppercase tracking-[0.3em] text-foreground/40 md:mt-1 -mt-0.5">
              Simulador de Concursos
            </span>
          </div>
        </div>

        {/* Center: DynamicIsland (Mobile ONLY) */}
        <div className="md:hidden">
          <DynamicIsland position="static" />
        </div>

        {/* Right: Help Toggle */}
        <div className="flex items-center">
          {showHelp && (
            <button
              onClick={() => setHelpOpen(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 border"
              style={{
                backgroundColor: "rgba(var(--primary-rgb, 255, 255, 255), 0.1)",
                borderColor: "rgba(var(--primary-rgb, 255, 255, 255), 0.2)",
                color: "var(--primary-hex)",
              }}
              aria-label="Ajuda sobre autenticação"
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping opacity-75"
                style={{ backgroundColor: "var(--primary-hex)" }}
              />
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "var(--primary-hex)" }}
              />
            </button>
          )}
        </div>
      </header>

      {/* ── Left Column: Form ── */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center px-4 py-8 md:px-12 md:py-16 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md mx-auto pt-24 md:pt-0">{children}</div>
      </div>

      {/* ── DynamicIsland: Desktop ── */}
      <div className="hidden md:flex fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
        <DynamicIsland position="static" />
      </div>

      {/* ── Right Column: Image or Tutorial — Responsive to skin ── */}
      <div className="hidden md:block md:w-1/2 min-h-screen relative overflow-hidden">
        {rightContent ? (
          <div
            className="w-full h-full min-h-screen flex items-center justify-center p-8 relative"
            style={{
              background:
                "radial-gradient(circle at center, rgba(var(--primary-rgb, 15, 23, 42), 0.2) 0%, #0f172a 100%)",
              backgroundColor: "#0f172a",
            }}
          >
            <div className="relative z-10 w-full max-w-lg">{rightContent}</div>
            {/* Ambient Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[120px] opacity-20 pointer-events-none rounded-full"
              style={{ backgroundColor: "var(--primary-hex)" }}
            />
          </div>
        ) : (
          <div className="relative w-full min-h-screen">
            <HeroSlideshow
              images={[
                "/images/login-hero.png",
                "/images/hero-engenheira.png",
                "/images/hero-tecnico.png",
                "/images/hero-geologa.png",
                "/images/hero-brigadista.png",
              ]}
              interval={6000}
            />

            {/* Bottom info card with 3 breaking news blocks separated by pipes */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 z-10">
              <div className="flex items-stretch gap-0">
                {/* Block 1 */}
                <div className="flex-1 px-3">
                  <p className="text-white text-xs font-semibold mb-1.5">
                    🛢️ Seu futuro na Petrobras começa aqui
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="text-white font-bold text-xs">+2.500</span>{" "}
                    Questões
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">
                      94%
                    </span>{" "}
                    Aprovação
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">
                      120+
                    </span>{" "}
                    Aulas
                  </div>
                </div>

                {/* Pipe 1 */}
                <div className="w-px bg-white/15 mx-1 self-stretch" />

                {/* Block 2 */}
                <div className="flex-1 px-3">
                  <p className="text-white text-xs font-semibold mb-1.5">
                    📋 Próximo Concurso Petrobras
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="text-white font-bold text-xs">2026</span>{" "}
                    Previsão
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">
                      6.412
                    </span>{" "}
                    Vagas
                  </div>
                </div>

                {/* Pipe 2 */}
                <div className="w-px bg-white/15 mx-1 self-stretch" />

                {/* Block 3 */}
                <div className="flex-1 px-3">
                  <p className="text-white text-xs font-semibold mb-1.5">
                    🎓 Comunidade de Estudos
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="text-white font-bold text-xs">15k+</span>{" "}
                    Alunos
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">
                      4.8★
                    </span>{" "}
                    Avaliação
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Help Modal */}
      {showHelp && (
        <OtpHelpModal
          mode={otpMode}
          isOpen={helpOpen}
          onClose={() => setHelpOpen(false)}
        />
      )}
    </div>
  );
}
