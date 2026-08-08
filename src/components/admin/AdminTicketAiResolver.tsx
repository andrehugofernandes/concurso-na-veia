"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminTicketAiResolverProps {
  ticketId: string;
  userName: string;
}

export function AdminTicketAiResolver({ ticketId, userName }: AdminTicketAiResolverProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResolveWithAi = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const res = await fetch(`/api/admin/tickets/${ticketId}/resolve-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erro ao processar ticket com IA Davi");
      }

      setSuccessMessage("🤖 A IA Davi avaliou os prints, consultou a aula e respondeu ao aluno com sucesso!");
      
      // Recarrega a página para exibir a nova mensagem do Davi no histórico
      setTimeout(() => {
        router.refresh();
      }, 1500);

    } catch (err: any) {
      console.error("[AdminTicketAiResolver] Erro:", err);
      setError(err.message || "Falha ao gerar resposta com a IA Davi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2 w-full">
      <Button
        onClick={handleResolveWithAi}
        disabled={loading}
        className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 text-white font-extrabold shadow-md gap-2.5 rounded-2xl py-6 px-6 transition-all"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-emerald-200" />
            <span>🤖 Davi está avaliando mensagens, prints e JSON das aulas...</span>
          </>
        ) : (
          <>
            <Bot className="h-5 w-5 text-emerald-200 animate-pulse" />
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Resolver com IA Davi</span>
          </>
        )}
      </Button>

      {successMessage && (
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 animate-fade-in">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="text-xs font-bold text-red-500 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
