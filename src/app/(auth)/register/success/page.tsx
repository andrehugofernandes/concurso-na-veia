"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyCheckoutSession } from "@/lib/actions/stripe";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const plan = searchParams.get("plan") || "free";

  const [message, setMessage] = useState("Processando seu pagamento...");
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");

  useEffect(() => {
    if (!sessionId) {
      setMessage("Sessão de pagamento não encontrada");
      setStatus("error");
      return;
    }

    const verifyPayment = async () => {
      try {
        const data = await verifyCheckoutSession(sessionId);

        if (data.success) {
          setMessage("Pagamento confirmado! Redirecionando para finalizar seu cadastro...");
          setStatus("success");

          setTimeout(() => {
            router.push(`/register/complete?session=${sessionId}&plan=${plan}`);
          }, 2000);
        } else {
          setMessage(data.error || "Pagamento pendente ou cancelado");
          setStatus("error");
        }
      } catch (err: any) {
        setMessage("Erro ao verificar pagamento: " + err.message);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [sessionId, plan, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          {status === "processing" && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400" />
            </div>
          )}
          {status === "success" && <div className="text-6xl mb-4">✅</div>}
          {status === "error" && <div className="text-6xl mb-4">❌</div>}
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          {status === "processing" && "Processando"}
          {status === "success" && "Pagamento Confirmado!"}
          {status === "error" && "Algo deu errado"}
        </h1>

        <p className="text-gray-400 mb-6">{message}</p>

        {status === "error" && (
          <div className="space-y-3">
            <Link
              href="/register"
              className="w-full inline-block py-3 px-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition"
            >
              Tentar Novamente
            </Link>
            <Link
              href="/login"
              className="w-full inline-block py-3 px-4 border border-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition"
            >
              Fazer Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
