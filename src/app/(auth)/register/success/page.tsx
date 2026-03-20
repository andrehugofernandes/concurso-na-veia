"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useTheme } from "@/lib/contexts/theme-context";

// Inicializar o Stripe promise
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

import { verifyCheckoutSession } from "@/lib/actions/stripe";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const plan = searchParams.get("plan") || "free";
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      router.push("/register");
      return;
    }

    async function fetchSession() {
      try {
        const result = await verifyCheckoutSession(sessionId!);
        if (result.success && result.clientSecret) {
          setClientSecret(result.clientSecret);
        } else {
          // Se não conseguir o secret, mas o pagamento fluiu, 
          // ainda mantemos na página mas sem o componente detalhado
          console.warn("Não foi possível carregar o client secret para o resumo detalhado");
        }
      } catch (err) {
        console.error("Erro ao buscar sessão do Stripe:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [sessionId, router]);

  const options = {
    clientSecret: clientSecret || "",
  };

  return (
    <AuthLayout>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-smooth shadow-xl flex flex-col pt-4">
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
          
          <div className="w-full min-h-[400px]">
             {/* O Embedded Checkout renderiza automaticamente a tela de sucesso do Stripe Baseado no ID/Secret em return_url */}
             {clientSecret && (
               <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                 <EmbeddedCheckout className="w-full h-full" />
               </EmbeddedCheckoutProvider>
             )}
          </div>

          <div className="p-6 md:p-8 bg-background/50 border-t border-border mt-4 text-center">
            <h3 className="font-bold text-lg mb-2">Falta pouco!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Para acessar sua área de estudos, finalize criando sua senha.
            </p>
            <Link
              href={`/register/complete?session=${sessionId}&plan=${plan}`}
              className="inline-flex w-full md:w-auto items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all text-sm"
              style={{ background: "var(--primary-gradient)" }}
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
