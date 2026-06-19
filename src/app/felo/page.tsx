"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserAction } from "@/lib/actions/auth";

import FeloHero from "@/components/felo/FeloHero";
import TrustedBySection from "@/components/felo/TrustedBySection";
import DemoSection from "@/components/felo/DemoSection";
import ProfessorParticularSection from "@/components/felo/ProfessorParticularSection";
import ResultsSection from "@/components/felo/ResultsSection";
import TestimonialsSection from "@/components/felo/TestimonialsSection";
import FinalCTASection from "@/components/felo/FinalCTASection";
import PricingSection from "@/components/PricingSection";

export default function FeloLandingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await getCurrentUserAction();
        if (result.status === "success") {
          router.push("/dashboard");
        }
      } catch {
        // Not authenticated, stay here
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-primary text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Hero - Contém o FeloHeader embutido para criar o efeito visual de recortes */}
      <FeloHero />

      {/* Logos de Confiança (Senta na curva inferior que foi iniciada no Hero) */}
      <TrustedBySection />

      {/* Demo Interativo com Tabs */}
      <DemoSection />

      {/* Professor Particular 24h (Avatar IA) */}
      <ProfessorParticularSection />

      {/* Bento Box de Resultados */}
      <ResultsSection />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* Planos de Preço */}
      <div id="pricing" className="border-t border-slate-200 bg-white">
        <PricingSection />
      </div>

      {/* CTA Final - Fundo Escuro */}
      <FinalCTASection />

      {/* Footer */}
      <footer className="py-10 bg-slate-950 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>© 2026 A VAGA EH MINHA. Feito com ❤️ e Inteligência Artificial.</p>
      </footer>
    </div>
  );
}
