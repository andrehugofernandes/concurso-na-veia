"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Image from "next/image";
import confetti from "canvas-confetti";
import { verifyCheckoutSession } from "@/lib/actions/stripe";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const gateway = searchParams.get("gateway");
  const plan = searchParams.get("plan") || "free";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.push("/register");
      return;
    }

    async function handleSuccess() {
      try {
        if (sessionId) {
          // Verifica a sessão do Stripe
          await verifyCheckoutSession(sessionId);
        }
      } catch (err) {
        console.error("Erro ao verificar pagamento:", err);
      } finally {
        setLoading(false);
        
        // Dispara os confetes apenas no client após carregar
        setTimeout(() => {
          import("canvas-confetti").then((module) => {
            const confetti = module.default || module;
            const duration = 3500;
            const end = Date.now() + duration;

            const frame = () => {
              confetti({
                particleCount: 6,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#22c55e', '#eab308', '#3b82f6', '#f43f5e'],
                zIndex: 9999
              });
              confetti({
                particleCount: 6,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#22c55e', '#eab308', '#3b82f6', '#f43f5e'],
                zIndex: 9999
              });

              if (Date.now() < end) {
                requestAnimationFrame(frame);
              }
            };
            frame();
          });
        }, 100);
      }
    }

    handleSuccess();
  }, [sessionId, gateway, router]);

  return (
    <AuthLayout>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-smooth shadow-xl flex flex-col pt-4 relative">
          <div className="text-center px-6 pt-6 pb-2">
            <h1 
              className="text-3xl md:text-4xl font-black tracking-tighter leading-none bg-clip-text text-transparent transition-smooth font-display mb-2"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Pagamento Confirmado!
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Sua assinatura foi processada com sucesso.
            </p>
          </div>
          
          <div className="w-full flex justify-center items-center py-10 relative">
             {/* Efeito de brilho no fundo (Glow) */}
             <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
             
             <div className="relative w-56 h-56 md:w-72 md:h-72 animate-in fade-in zoom-in duration-700">
               <Image
                 src="/payment-success.png"
                 alt="Conquista e Aprovação"
                 fill
                 className="object-contain dark:mix-blend-screen mix-blend-multiply drop-shadow-2xl"
                 priority
               />
             </div>
          </div>

          <div className="p-6 md:p-8 bg-background/50 border-t border-border text-center z-10 relative">
            <h3 className="font-bold text-lg mb-2">Falta pouco!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Para acessar sua área de estudos, finalize criando sua senha.
            </p>
            <Link
              href={`/register/complete?session=${sessionId}&plan=${plan}`}
              className="inline-flex w-full md:w-auto items-center justify-center px-8 py-3 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/40 hover:brightness-110 active:scale-95 transition-all text-sm"
              style={{ background: "var(--primary-gradient)", color: "#ffffff" }}
            >
              Criar Senha de Acesso
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
