"use client";

import { ReactNode, useState, useEffect } from "react";
import { HeroSlideshow } from "./HeroSlideshow";
import { OtpHelpModal } from "./OtpHelpModal";
import { DynamicIsland } from "@/components/ui/dynamic-island";
import { Menu } from "lucide-react";
import PetrobrasLogo from "@/components/PetrobrasLogo";

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
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 py-3 z-50 backdrop-blur-md shadow-sm"
        style={{
          backgroundColor: "hsl(var(--background) / 0.85)",
          borderBottom: "1px solid hsl(var(--border))",
        }}
      >
        <div className="flex items-center gap-3">
          <PetrobrasLogo compact />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <DynamicIsland position="static" className="self-start mt-1" />

          {showHelp && (
            <button
              onClick={() => setHelpOpen(true)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 border box-border shadow-sm"
              style={{
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.95)",
                borderColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
              }}
              aria-label="Ajuda sobre autenticação"
            >
              <Menu
                className={isDark ? "text-white" : "text-[#525d6e]"}
                size={22}
                strokeWidth={2.5}
              />
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping opacity-75"
                style={{ backgroundColor: "var(--primary-hex, #ff8500)" }}
              />
              <span
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "var(--primary-hex, #ff8500)" }}
              />
            </button>
          )}
        </div>
      </header>

      {/* ── Left Column: Form ── */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center px-4 py-8 md:px-12 md:py-16 bg-background">
        <div className="w-full max-w-md mx-auto pt-32 md:pt-0">{children}</div>
      </div>

      {/* ── Right Column: Slideshow or High-Contrast Tutorial ── */}
      <div className="hidden md:block md:w-1/2 min-h-screen relative overflow-hidden bg-slate-950">
        {rightContent ? (
          <div className="w-full h-full min-h-screen flex items-center justify-center p-8 relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            {/* Ambient Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[140px] opacity-20 pointer-events-none rounded-full"
              style={{ backgroundColor: "var(--primary-hex, #ff8500)" }}
            />
            <div className="relative z-10 w-full max-w-lg">{rightContent}</div>
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

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 z-10">
              <div className="flex items-stretch gap-0 text-white">
                <div className="flex-1 px-3">
                  <p className="text-white text-xs font-semibold mb-1.5">
                    🛢️ Seu futuro na Petrobras começa aqui
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-300">
                    <span className="text-white font-bold text-xs">+2.500</span> Questões
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">94%</span> Aprovação
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">120+</span> Aulas
                  </div>
                </div>

                <div className="w-px bg-white/15 mx-1 self-stretch" />

                <div className="flex-1 px-3">
                  <p className="text-white text-xs font-semibold mb-1.5">
                    📋 Próximo Concurso Petrobras
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-300">
                    <span className="text-white font-bold text-xs">2026</span> Previsão
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">6.412</span> Vagas
                  </div>
                </div>

                <div className="w-px bg-white/15 mx-1 self-stretch" />

                <div className="flex-1 px-3">
                  <p className="text-white text-xs font-semibold mb-1.5">
                    🎓 Comunidade de Estudos
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-300">
                    <span className="text-white font-bold text-xs">15k+</span> Alunos
                    <span className="text-white/20">·</span>
                    <span className="text-white font-bold text-xs">4.8★</span> Avaliação
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

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
