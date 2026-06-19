"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added useRouter import
import { Usuario, HistoricoSimulado } from "@/lib/types";
import { format, differenceInDays, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getCurrentUserAction } from "@/lib/actions/auth"; // Added getCurrentUserAction import

export default function HistoricoPage() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await getCurrentUserAction();
        if (result.status === "error") {
          console.error("Error loading user:", result);
          router.push("/login"); // Redirect on error
        } else {
          setUser(result.data);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        // Optionally redirect or set user to null on unexpected errors
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-slate-900 flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-slate-900 flex items-center justify-center text-zinc-900 dark:text-white transition-colors duration-300">
        <p>Erro ao carregar usuário.</p>
      </div>
    );
  }

  const isFree = user.plan === "free";
  const agora = new Date();

  // Sort history by date (newest first)
  const historicoOrdenado = [...(user.historico || [])].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-slate-900 text-zinc-900 dark:text-white p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              📜 Histórico de Simulados
            </h1>
            <p className="text-zinc-500 dark:text-gray-400">
              Acompanhe sua evolução e revise seus resultados.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-zinc-200 dark:border-transparent rounded-lg hover:bg-zinc-100 dark:hover:bg-slate-700 transition"
          >
            Voltar
          </Link>
        </header>

        {isFree && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-start gap-4">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="font-bold text-yellow-600 dark:text-yellow-500">
                Atenção: Plano Gratuito
              </h3>
              <p className="text-sm text-zinc-600 dark:text-gray-300">
                No plano gratuito, o histórico detalhado fica disponível apenas
                por <span className="text-zinc-900 dark:text-white font-bold">3 dias</span>. Faça
                upgrade para manter seu registro vitalício.
              </p>
              <Link
                href="/pricing"
                className="text-yellow-600 dark:text-yellow-400 text-sm font-semibold hover:underline mt-1 inline-block"
              >
                Fazer Upgrade Agora →
              </Link>
            </div>
          </div>
        )}

        {historicoOrdenado.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800/30 rounded-2xl border border-zinc-200 dark:border-slate-700/50 shadow-sm dark:shadow-none">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-zinc-700 dark:text-gray-300 mb-2">
              Sem histórico ainda
            </h3>
            <p className="text-zinc-500 dark:text-gray-500 mb-6">
              Realize seu primeiro simulado para começar a rastrear seu
              progresso.
            </p>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white hover:text-white font-bold rounded-xl transition inline-block"
            >
              Ir para o Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {historicoOrdenado.map((item, index) => {
              const dataSimulado = parseISO(item.data);
              const diasPassados = differenceInDays(agora, dataSimulado);
              const expirado = isFree && diasPassados > 3;

              return (
                <div
                  key={index}
                  className={`relative bg-white dark:bg-slate-800/50 backdrop-blur border ${expirado ? "border-red-500/30 opacity-75" : "border-zinc-200 dark:border-slate-700/50"} rounded-xl p-6 transition-all hover:border-zinc-300 dark:hover:border-slate-600 shadow-sm dark:shadow-none`}
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold
                                                ${
                                                  item.percentual >= 80
                                                    ? "bg-green-500/20 text-green-600 dark:text-green-400"
                                                    : item.percentual >= 50
                                                      ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                                                      : "bg-red-500/20 text-red-600 dark:text-red-400"
                                                }`}
                      >
                        {item.percentual}%
                      </div>
                      <div>
                        <h3 className="font-bold text-lg capitalize text-zinc-900 dark:text-white">
                          {item.tipo}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-gray-400 flex items-center gap-2">
                          📅{" "}
                          {format(
                            dataSimulado,
                            "d 'de' MMMM 'de' yyyy 'às' HH:mm",
                            { locale: ptBR },
                          )}
                          {expirado && (
                            <span className="text-red-600 dark:text-red-400 font-bold text-xs bg-red-100 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
                              EXPIRADO
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-zinc-500 dark:text-gray-500 uppercase tracking-wider">
                          Acertos
                        </p>
                        <p className="font-mono font-bold text-zinc-900 dark:text-white">
                          {item.acertos}/{item.total}
                        </p>
                      </div>

                      {expirado ? (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">🔒</span>
                          <span className="text-xs text-zinc-500 dark:text-gray-500">
                            Detalhes Bloqueados
                          </span>
                        </div>
                      ) : (
                        <button className="px-4 py-2 bg-zinc-100 dark:bg-slate-700 hover:bg-zinc-200 dark:hover:bg-slate-600 text-zinc-800 dark:text-white rounded-lg text-sm font-semibold transition">
                          Ver Detalhes
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Blur Overlay for Expired Items (Optional visual effect) */}
                  {expirado && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/10 backdrop-blur-[1px] rounded-xl pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
