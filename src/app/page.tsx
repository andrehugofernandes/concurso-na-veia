"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserAction } from "@/lib/actions/auth";

import HomeHero from "@/components/home/HomeHero";
import TrustedBySection from "@/components/home/TrustedBySection";
import DemoSection from "@/components/home/DemoSection";
import ProfessorParticularSection from "@/components/home/ProfessorParticularSection";
import ResultsSection from "@/components/home/ResultsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCTASection from "@/components/home/FinalCTASection";
import PricingSection from "@/components/PricingSection";
import HomeFooter from "@/components/home/HomeFooter";
import CourseShowcase from "@/components/CourseShowcase";
import StickyHeader from "@/components/home/StickyHeader";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function HomeLandingPage() {
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Sticky header — aparece ao rolar, com glassmorphism e animação spring */}
      <StickyHeader />

      {/* Hero - Contém o HomeHeader embutido para criar o efeito visual de recortes */}
      <HomeHero />

      {/* Logos de Confiança (Senta na curva inferior que foi iniciada no Hero) */}
      <TrustedBySection />

      {/* Vitrine de Concursos */}
      <CourseShowcase />

      {/* Demo Interativo com Tabs */}
      <DemoSection />

      {/* Professor Particular 24h (Avatar IA) */}
      <ProfessorParticularSection />

      {/* Bento Box de Resultados */}
      <ResultsSection />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* Planos de Preço */}
      <div id="pricing" className="bg-white dark:bg-slate-900">
        <PricingSection />
      </div>

      {/* CTA Final - Fundo Escuro */}
      <FinalCTASection />

      {/* Footer */}
      <HomeFooter />

      {/* Botão voltar ao topo */}
      <ScrollToTop />
    </div>
  );
}
