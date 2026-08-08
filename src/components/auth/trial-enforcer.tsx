"use client";

import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { Lock, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export function TrialEnforcer({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useUser();
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loading || !profile) return;

    // Sysadmins and Admins are never subject to trial lock
    if (profile.role === "sysadmin" || profile.role === "admin") {
      setIsExpired(false);
      return;
    }

    if (profile.plan === "free" && profile.created_at) {
      const createdAt = new Date(profile.created_at).getTime();
      const now = Date.now();
      const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);

      if (diffDays > 3) {
        setIsExpired(true);
      } else {
        setIsExpired(false);
      }
    } else {
      setIsExpired(false);
    }
  }, [profile, loading]);

  if (isExpired) {
    return (
      <div className="relative w-full h-full min-h-screen">
        {/* Render children with pointer-events-none and blur for background effect */}
        <div className="pointer-events-none blur-md select-none opacity-50 h-full w-full overflow-hidden absolute inset-0">
          {children}
        </div>

        {/* Lock overlay */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card max-w-lg w-full rounded-2xl shadow-2xl border-2 border-primary/20 p-8 text-center animate-in zoom-in-95 fade-in duration-300">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-3xl font-black mb-4">
              Seu período de teste expirou!
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Os 3 dias de acesso gratuito ao Concurso Na Veia chegaram ao fim. Para continuar estudando e acessando nossas questões e simulados inéditos, escolha o plano ideal para a sua aprovação.
            </p>

            <div className="bg-slate-900/5 dark:bg-slate-800/50 rounded-xl p-4 mb-8 text-left border border-border">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Vantagens de ser PRO:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Acesso ilimitado ao banco de questões
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Geração de simulados específicos
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Histórico completo de desempenho
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Acesso aos mapas mentais e Flashcards
                </li>
              </ul>
            </div>

            <Button onClick={() => router.push("/seja-pro")} size="lg" className="w-full text-lg h-14 rounded-xl shadow-primary/25 shadow-lg font-bold">
              Ver Planos e Assinar Agora
            </Button>
            
            <div className="mt-4">
              <Button onClick={() => router.push("/cursos")} variant="link" className="text-muted-foreground hover:text-foreground">
                Conhecer outros concursos
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
