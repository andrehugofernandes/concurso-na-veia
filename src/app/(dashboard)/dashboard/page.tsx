"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CONTEUDO_MATERIAS } from "@/data/conteudo";
import { PROFISSOES, getProfissaoById } from "@/lib/profissoes-edital";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import { useAllAulasProgress } from "@/hooks/useAulaProgress";
import { useSetPageTitle } from "@/contexts/UIContext";
import { CARGO_ID_MAP } from "@/lib/cargos-map";

interface UserData {
  nome: string;
  email: string;
  nivel: string;
  cargo: string;
  plan: string;
  xp: number;
  nivel_jogador: string;
  questoes_certas: number;
  questoes_erradas: number;
  sequencia_atual: number;
  maior_sequencia: number;
  conquistas: string[];
  questoes_geradas: number;
  nivelConcurso?: string;
  diasRestantesTrial?: number;
  simuladosHoje?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, total: 0 });

  const { progressData: allContentProgress, loading: loadingProgress } =
    useAllAulasProgress();
  const loading = loadingUser || loadingProgress;

  // Definir título da página no cabeçalho
  useSetPageTitle("Dashboard");

  // Config Modal State
  const [configModal, setConfigModal] = useState<{
    open: boolean;
    tipo?: string;
    nome?: string;
    cor?: string;
    qtd?: number;
  }>({ open: false });
  const [selection, setSelection] = useState({
    dificuldade: "Médio",
    assunto: "",
  });
  const [activeTab, setActiveTab] = useState<"overview" | "ranking">(
    "overview",
  );

  useEffect(() => {
    // Load user data from cookie/session
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!loadingProgress) {
      // Calculate stats
      let totalLessons = 0;
      CONTEUDO_MATERIAS.forEach((m) => (totalLessons += m.topicos.length));

      // Calculate directly instead of using unstable dependency function
      const completedCount = Object.values(allContentProgress).filter(
        (p) => p.completed,
      ).length;
      const inProgressCount =
        Object.keys(allContentProgress).length - completedCount;

      setStats({
        completed: completedCount,
        inProgress: inProgressCount,
        total: totalLessons > 0 ? totalLessons : 10,
      });
    }
  }, [loadingProgress, allContentProgress]);

  const taxaAcerto = user
    ? user.questoes_certas + user.questoes_erradas > 0
      ? Math.round(
          (user.questoes_certas /
            (user.questoes_certas + user.questoes_erradas)) *
            100,
        )
      : 0
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  // Safe user data handling
  const userData: UserData = user
    ? {
        ...user,
        conquistas: user.conquistas || [],
        questoes_certas: user.questoes_certas || 0,
        questoes_erradas: user.questoes_erradas || 0,
        xp: user.xp || 0,
        sequencia_atual: user.sequencia_atual || 0,
        questoes_geradas: user.questoes_geradas || 0,
        nivel: user.nivel || "medio",
        cargo: user.cargo || "operacao",
        plan: user.plan || "free",
        nome:
          user.nome ||
          (user as any).user_metadata?.full_name ||
          (user as any).user_metadata?.username ||
          "Usuário",
        nivelConcurso: (user as any).nivelConcurso || "medio",
        diasRestantesTrial:
          (user as any).diasRestantesTrial !== undefined
            ? (user as any).diasRestantesTrial
            : 7,
        simuladosHoje: (user as any).simuladosHoje || 0,
      }
    : {
        nome: "Usuário Demo",
        email: "demo@example.com",
        nivel: "medio",
        cargo: "operacao",
        plan: "free",
        xp: 150,
        nivel_jogador: "Estagiário",
        questoes_certas: 8,
        questoes_erradas: 2,
        sequencia_atual: 3,
        maior_sequencia: 5,
        conquistas: [],
        questoes_geradas: 10,
        nivelConcurso: "medio",
        diasRestantesTrial: 7,
        simuladosHoje: 0,
      };

  const handleSimuladoClick = (tipo: string, nome: string, cor: string) => {
    if (userData.plan === "free") {
      if (
        userData.diasRestantesTrial !== undefined &&
        userData.diasRestantesTrial <= 0
      ) {
        alert(
          "Seu período de teste acabou! 🚫\n\nAssine o PRO para continuar treinando sem limites.",
        );
        return;
      }
      if (userData.simuladosHoje !== undefined && userData.simuladosHoje >= 1) {
        alert(
          "Você já usou seu simulado diário gratuito! ⏳\n\nVolte amanhã ou assine o PRO para acesso ilimitado.",
        );
        return;
      }
    }
    setConfigModal({ open: true, tipo, nome, cor });
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="animate-in fade-in slide-in-from-left duration-500">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Olá, {userData.nome.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Pronto para superar seus limites hoje?
          </p>
        </div>
        {userData.plan === "free" && (
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 w-full md:w-auto">
            <div className="flex flex-col items-start xs:items-end">
              <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mb-0.5">
                Período de Teste
              </span>
              <div className="flex items-center gap-1.5 bg-card px-2 py-1 rounded-lg border border-border shadow-sm">
                <span
                  className={`text-lg font-black ${userData.diasRestantesTrial && userData.diasRestantesTrial <= 3 ? "text-red-500 animate-pulse" : "text-yellow-500"}`}
                >
                  {userData.diasRestantesTrial}
                </span>
                <span className="text-[10px] text-muted-foreground font-bold">
                  dias restantes
                </span>
              </div>
            </div>
            <Link
              href="/pricing"
              className="w-full xs:w-auto text-center px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all text-xs uppercase tracking-wider"
            >
              Seja PRO 👑
            </Link>
          </div>
        )}
      </header>

      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b border-border overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-4 px-1 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === "overview" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          Visão Geral
          {activeTab === "overview" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full animate-in fade-in zoom-in duration-300"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("ranking")}
          className={`pb-4 px-1 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === "ranking" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          Ranking
          {activeTab === "ranking" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full animate-in fade-in zoom-in duration-300"></div>
          )}
        </button>
      </div>

      <main>
        {activeTab === "overview" ? (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              <div className="bg-card p-3 md:p-4 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 sm:p-3 bg-blue-500/10 rounded-lg text-blue-500 text-xl sm:text-2xl">
                  ⚡
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase font-bold tracking-wider leading-none mb-1">
                    Sequência
                  </p>
                  <p className="text-lg sm:text-2xl font-black text-foreground">
                    {userData.sequencia_atual} dias
                  </p>
                </div>
              </div>
              <div className="bg-card p-3 md:p-4 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg text-purple-500 text-xl sm:text-2xl">
                  🎯
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase font-bold tracking-wider leading-none mb-1">
                    Precisão
                  </p>
                  <p className="text-lg sm:text-2xl font-black text-foreground">
                    {taxaAcerto}%
                  </p>
                </div>
              </div>
              <div className="bg-card p-3 md:p-4 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 sm:p-3 bg-green-500/10 rounded-lg text-green-500 text-xl sm:text-2xl">
                  📝
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase font-bold tracking-wider leading-none mb-1">
                    Questões
                  </p>
                  <p className="text-lg sm:text-2xl font-black text-foreground">
                    {userData.questoes_geradas}
                  </p>
                </div>
              </div>
              <div className="bg-card p-3 md:p-4 rounded-xl border border-border flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-2 sm:p-3 bg-yellow-500/10 rounded-lg text-yellow-500 text-xl sm:text-2xl">
                  🏆
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-muted-foreground text-[9px] sm:text-[10px] uppercase font-bold tracking-wider leading-none mb-1">
                    Nível
                  </p>
                  <p className="text-lg sm:text-2xl font-black text-foreground">
                    {userData.nivel_jogador}
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 0: My Progress */}
            {stats.total > 0 && (
              <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Chart Card */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="text-xl">📊</span> Meu Progresso Geral
                  </h3>
                  <div className="flex-1 min-h-[200px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Concluído", value: stats.completed },
                            {
                              name: "Restante",
                              value: stats.total - stats.completed,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          <Cell key="cell-0" fill="#22c55e" />
                          <Cell key="cell-1" fill="#334155" opacity={0.3} />
                        </Pie>
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "#1e293b",
                            borderColor: "#334155",
                            color: "#f8fafc",
                          }}
                          itemStyle={{ color: "#f8fafc" }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-foreground">
                          {Math.round(
                            (stats.completed / (stats.total || 1)) * 100,
                          )}
                          %
                        </span>
                        <p className="text-xs text-muted-foreground uppercase font-bold">
                          Concluído
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity / Continue Watching */}
                <div className="md:col-span-2 bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-2xl border border-indigo-500/20 p-6 shadow-sm flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <span className="animate-pulse">▶️</span> Continue de
                        onde parou
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Você estava estudando{" "}
                        <strong className="block sm:inline mt-1 sm:mt-0">
                          Interpretação de Texto
                        </strong>
                        .
                      </p>
                    </div>
                    <Link
                      href="/aulas/portugues/interpretacao-texto"
                      className="w-full sm:w-auto text-center px-4 py-2.5 sm:py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition text-sm shadow-lg shadow-indigo-500/20"
                    >
                      Retomar Aula
                    </Link>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                    {(() => {
                      // Find interpretacao-texto progress (Now mapped to portugues/interpretacao)
                      // Note: In CONTEUDO_MATERIAS, Interpretacao ID is 'interpretacao', Materia ID is 'portugues'
                      const progress =
                        allContentProgress["portugues/interpretacao-texto"];

                      // For specific module tracking we would need granular checks, but useAllAulasProgress
                      // currently returns aggregated per topic in its map logic?
                      // Wait, useAllAulasProgress maps key = `${item.materia_id}/${item.topico_id}`
                      // and value is just { progress_percent, completed ... }.
                      // It doesn't seem to store PER MODULE data in the map, OR the query returns multiple rows?
                      // The hook code:
                      // progressMap[key] = { ...item }
                      // If multiple modules exist for same topic, they overwrite each other in the map!
                      // This is a limitation of the current hook if we want module-level detail here.
                      // However, for the dashboard summary, we just need the % or "Concluído".

                      let percent = progress?.progress_percent || 0;
                      let moduleName = "Continuar Estudando";

                      if (progress?.completed) {
                        percent = 100;
                        moduleName = "Aula Concluída";
                      } else if (percent > 0) {
                        moduleName = "Em andamento";
                      } else {
                        percent = 0;
                        moduleName = "Não iniciado";
                      }

                      return (
                        <>
                          <div className="flex justify-between text-sm mb-2 font-bold text-muted-foreground">
                            <span>{moduleName}</span>
                            <span>{percent}% Concluído</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION 1: Aulas (Moved to Top) */}
            <section className="mb-8 p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="p-2 bg-blue-500/20 rounded-lg text-blue-500 text-xl">
                  📚
                </span>
                Conteúdo Teórico e Aulas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/aulas"
                  className="group bg-card backdrop-blur-lg rounded-xl p-6 border border-border shadow-lg hover:border-blue-500/50 transition-all hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">📖</div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
                        Conteúdo Teórico
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Aulas completas organizadas por edital, com
                        acompanhamento de progresso.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition text-sm uppercase tracking-wide">
                    Acessar Aulas
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>

                <div className="bg-muted/30 backdrop-blur-lg rounded-xl p-6 border border-border opacity-70">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl opacity-50">🎯</div>
                    <div>
                      <h3 className="text-xl font-bold text-muted-foreground">
                        Plano de Estudos
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Cronograma personalizado baseado no seu tempo
                        disponível.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-gray-500 uppercase tracking-wide">
                      Em desenvolvimento
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Simulados Rápidos */}
            <section className="mb-8 p-4 sm:p-6 bg-muted/20 rounded-2xl sm:rounded-3xl border border-border">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="p-2 bg-green-500/20 rounded-lg text-green-500 text-lg sm:text-xl">
                  ⚡
                </span>
                Simulados Rápidos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Português Card */}
                <button
                  onClick={() =>
                    handleSimuladoClick(
                      "portugues",
                      "Língua Portuguesa",
                      "blue",
                    )
                  }
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:border-primary/50 transition-all group text-left flex flex-col h-full active:scale-[0.98]"
                >
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 shrink-0"></div>
                  <div className="p-5 sm:p-6 flex flex-col h-full justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 sm:p-3 bg-blue-500/10 rounded-lg text-blue-500 text-2xl sm:text-3xl group-hover:scale-110 transition-transform shrink-0">
                        📝
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black uppercase leading-[1.1] sm:leading-tight bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                        LÍNGUA PORTUGUESA
                      </h3>
                    </div>
                    <div className="flex justify-between items-end gap-3 mt-auto">
                      <p className="text-muted-foreground text-xs sm:text-sm leading-snug line-clamp-2">
                        Gramática, interpretação de texto e redação oficial.
                      </p>
                      <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded shrink-0 font-bold">
                        5 min
                      </span>
                    </div>
                  </div>
                </button>

                {/* Matemática Card */}
                <button
                  onClick={() =>
                    handleSimuladoClick("matematica", "Matemática", "purple")
                  }
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:border-primary/50 transition-all group text-left flex flex-col h-full active:scale-[0.98]"
                >
                  <div className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 shrink-0"></div>
                  <div className="p-5 sm:p-6 flex flex-col h-full justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 sm:p-3 bg-purple-500/10 rounded-lg text-purple-500 text-2xl sm:text-3xl group-hover:scale-110 transition-transform shrink-0">
                        🔢
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black uppercase leading-[1.1] sm:leading-tight bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
                        MATEMÁTICA
                      </h3>
                    </div>
                    <div className="flex justify-between items-end gap-3 mt-auto">
                      <p className="text-muted-foreground text-xs sm:text-sm leading-snug line-clamp-2">
                        Raciocínio lógico, álgebra e geometria aplicada.
                      </p>
                      <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded shrink-0 font-bold">
                        5 min
                      </span>
                    </div>
                  </div>
                </button>

                {/* Específicos Card */}
                <button
                  onClick={() =>
                    handleSimuladoClick(
                      "especificas",
                      "Conhecimentos Específicos",
                      "green",
                    )
                  }
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:border-primary/50 transition-all group text-left flex flex-col h-full active:scale-[0.98]"
                >
                  <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 shrink-0"></div>
                  <div className="p-5 sm:p-6 flex flex-col h-full justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 sm:p-3 bg-green-500/10 rounded-lg text-green-500 text-2xl sm:text-3xl group-hover:scale-110 transition-transform shrink-0">
                        🏭
                      </div>
                      <h3 className="text-lg sm:text-2xl font-black uppercase leading-[1.1] sm:leading-tight bg-gradient-to-r from-green-600 to-yellow-500 dark:from-green-400 dark:to-yellow-400 bg-clip-text text-transparent">
                        ESPECÍFICOS
                      </h3>
                    </div>
                    <div className="flex justify-between items-end gap-3 mt-auto">
                      <p className="text-muted-foreground text-xs sm:text-sm leading-snug line-clamp-2">
                        Questões focadas no seu cargo:{" "}
                        {(() => {
                          const cargoId =
                            CARGO_ID_MAP[userData.cargo] || userData.cargo;
                          const profissao = getProfissaoById(cargoId);
                          return profissao?.nome || "Selecione no perfil";
                        })()}
                      </p>
                      <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded shrink-0 font-bold">
                        5 min
                      </span>
                    </div>
                  </div>
                </button>

                {/* Inglês Card - Apenas Nível Superior Estrito */}
                {(userData.nivelConcurso === "superior" ||
                  (!userData.nivelConcurso &&
                    getProfissaoById(
                      CARGO_ID_MAP[userData.cargo] || userData.cargo,
                    )?.nivel === "superior")) && (
                  <button
                    onClick={() =>
                      handleSimuladoClick("ingles", "Língua Inglesa", "red")
                    }
                    className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:border-primary/50 transition-all group text-left flex flex-col h-full relative active:scale-[0.98]"
                  >
                    <div className="h-1.5 bg-gradient-to-r from-red-500 to-rose-500 shrink-0"></div>
                    <div className="p-5 sm:p-6 flex flex-col h-full justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 sm:p-3 bg-red-500/10 rounded-lg text-red-500 text-2xl sm:text-3xl group-hover:scale-110 transition-transform shrink-0 relative">
                          🇺🇸
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border border-red-500 flex items-center justify-center shadow-md">
                            <span className="text-[7px] font-black text-red-600">
                              US
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-black uppercase leading-[1.1] sm:leading-tight bg-gradient-to-r from-red-600 to-rose-500 dark:from-red-400 dark:to-rose-500 bg-clip-text text-transparent">
                          INGLÊS
                        </h3>
                      </div>
                      <div className="flex justify-between items-end gap-3 mt-auto">
                        <p className="text-muted-foreground text-xs sm:text-sm leading-snug">
                          Compreensão de texto e gramática aplicada.
                        </p>
                        <span className="text-[9px] bg-muted text-muted-foreground px-2 py-0.5 rounded shrink-0 font-bold uppercase tracking-tight">
                          Superior
                        </span>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </section>

            {/* SECTION 3: Intensive Simulados */}
            <section className="mb-8 p-6 bg-purple-500/5 rounded-3xl border border-purple-500/10">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="p-2 bg-purple-500/20 rounded-lg text-purple-500 text-xl">
                  🔥
                </span>
                Treino Intensivo de Aceleração
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userData.plan === "free" ? (
                  <>
                    <div className="bg-card backdrop-blur-lg rounded-xl overflow-hidden border border-border shadow-lg relative group">
                      <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity">
                        <div className="text-5xl mb-3">🔒</div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          Simulado Específico
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Exclusivo para assinantes PRO
                        </p>
                        <Link
                          href="/pricing"
                          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all transform hover:scale-105"
                        >
                          Desbloquear 🚀
                        </Link>
                      </div>
                      <div className="p-6 opacity-30 pointer-events-none grayscale">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white rounded-lg mb-4">
                          <div className="text-4xl mb-2">📝</div>
                          <h3 className="text-xl font-bold">Prova Completa</h3>
                        </div>
                        <div className="p-2 flex justify-between">
                          <span>Bloqueado</span>
                          <span>4h</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card backdrop-blur-lg rounded-xl overflow-hidden border border-border shadow-lg relative group">
                      <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity">
                        <div className="text-5xl mb-3">👑</div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          Maratona 100
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Teste seus limites como no dia da prova!
                        </p>
                        <Link
                          href="/pricing"
                          className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all transform hover:scale-105"
                        >
                          Virar PRO 👑
                        </Link>
                      </div>
                      <div className="p-6 opacity-30 pointer-events-none grayscale">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-slate-900 rounded-lg mb-4">
                          <div className="text-4xl mb-2">🔥</div>
                          <h3 className="text-xl font-bold">
                            Maratona 100 Questões
                          </h3>
                        </div>
                        <div className="p-2 flex justify-between">
                          <span>Bloqueado</span>
                          <span>4h</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setConfigModal({
                          open: true,
                          tipo: "intensivo",
                          nome: "Treino Intensivo focalizado",
                          cor: "purple",
                          qtd: 20,
                        })
                      }
                      className="bg-card backdrop-blur-lg rounded-xl overflow-hidden border border-border hover:border-purple-500/50 transition-all group text-left w-full shadow-lg"
                    >
                      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white group-hover:from-purple-500 group-hover:to-purple-700 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-10 -translate-y-10">
                          🎯
                        </div>
                        <div className="relative z-10">
                          <div className="text-4xl mb-3">🎯</div>
                          <h3 className="text-xl font-bold">
                            Treino Intensivo
                          </h3>
                          <p className="text-purple-100 text-sm mt-1">
                            20 questões de uma matéria ou tópico específico
                          </p>
                          <div className="flex gap-2 mt-4">
                            <span className="px-2 py-1 bg-white/20 rounded text-xs font-bold">
                              Foco Total
                            </span>
                            <span className="px-2 py-1 bg-white/20 rounded text-xs font-bold">
                              30 min
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <span className="text-purple-400 font-bold group-hover:text-purple-300 transition-colors flex items-center gap-2">
                          Configurar Treino
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        setConfigModal({
                          open: true,
                          tipo: "maratona",
                          nome: "Maratona Petrobras",
                          cor: "yellow",
                          qtd: 100,
                        })
                      }
                      className="bg-card backdrop-blur-lg rounded-xl overflow-hidden border border-border hover:border-yellow-500/50 transition-all group text-left w-full shadow-lg"
                    >
                      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 text-white group-hover:from-yellow-500 group-hover:to-orange-500 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-10 -translate-y-10">
                          🔥
                        </div>
                        <div className="relative z-10">
                          <div className="text-4xl mb-3">🔥</div>
                          <h3 className="text-xl font-bold">
                            Maratona Oficial
                          </h3>
                          <p className="text-orange-50 text-sm mt-1">
                            Simulação real da prova (Médio ou Superior)
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">
                              Port
                            </span>
                            <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">
                              Mat
                            </span>
                            <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">
                              Esp
                            </span>
                            {userData.nivel === "superior" && (
                              <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">
                                Ing
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <span className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors flex items-center gap-2">
                          Aceitar Desafio
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-400 text-sm">~4 horas</span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            </section>

            {/* Config Modal */}
            {configModal.open && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={(e) => {
                  if (e.target === e.currentTarget)
                    setConfigModal({ open: false });
                }}
              >
                <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                  <div
                    className={`p-6 bg-gradient-to-r ${
                      configModal.cor === "blue"
                        ? "from-blue-500/20 to-cyan-500/20"
                        : configModal.cor === "purple"
                          ? "from-purple-500/20 to-pink-500/20"
                          : configModal.cor === "green"
                            ? "from-green-500/20 to-emerald-500/20"
                            : configModal.cor === "yellow"
                              ? "from-yellow-500/20 to-orange-500/20"
                              : configModal.cor === "red"
                                ? "from-red-500/20 to-rose-500/20"
                                : "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"
                    } rounded-t-2xl border-b border-border flex justify-between items-center`}
                  >
                    <h3 className="text-xl font-bold text-foreground">
                      {configModal.nome}
                    </h3>
                    <button
                      onClick={() => setConfigModal({ open: false })}
                      className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-foreground"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Difficulty Selection */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Nível de Dificuldade
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Fácil", "Médio", "Difícil", "Casca de Banana"].map(
                          (dif) => (
                            <button
                              key={dif}
                              onClick={() =>
                                setSelection({ ...selection, dificuldade: dif })
                              }
                              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                selection.dificuldade === dif
                                  ? "bg-yellow-500 text-slate-900 shadow-md shadow-yellow-500/20"
                                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                              }`}
                            >
                              {dif}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-muted-foreground text-sm mb-2">
                        Assunto Específico (Opcional)
                      </label>
                      <select
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-yellow-500 appearance-none shadow-sm"
                        value={selection.assunto}
                        onChange={(e) =>
                          setSelection({
                            ...selection,
                            assunto: e.target.value,
                          })
                        }
                      >
                        <option value="">Todos os tópicos (Misturado)</option>
                        {(() => {
                          // Determine topics based on selected type
                          let topics: string[] = [];

                          // Handle general subjects (Portuguese, Math) from CONTEUDO_MATERIAS
                          if (
                            configModal.tipo === "portugues" ||
                            configModal.tipo === "matematica"
                          ) {
                            const materia = CONTEUDO_MATERIAS.find(
                              (m) => m.id === configModal.tipo,
                            );
                            if (materia) {
                              topics = materia.topicos.map((t) => t.titulo);
                            }
                          }
                          // Handle specific knowledge from PROFISSOES based on user role
                          else if (configModal.tipo === "especificas") {
                            // Find the profession matching the user's cargo
                            const mappedCargoId =
                              CARGO_ID_MAP[userData.cargo] || userData.cargo;
                            const profession = PROFISSOES.find(
                              (p) => p.id === mappedCargoId,
                            );
                            if (profession) {
                              // Flatten all topics from all blocks
                              topics = profession.blocos.flatMap(
                                (b) => b.topicos,
                              );
                            }
                          }
                          // Handle 'intensivo' (20 questions focused)
                          else if (configModal.tipo === "intensivo") {
                            // Option to choose full subjects
                            topics.push("Língua Portuguesa");
                            topics.push("Matemática");

                            // Add profession-specific topics
                            const mappedCargoId =
                              CARGO_ID_MAP[userData.cargo] || userData.cargo;
                            const profession = PROFISSOES.find(
                              (p) => p.id === mappedCargoId,
                            );
                            if (profession) {
                              topics.push(
                                ...profession.blocos.flatMap((b) => b.topicos),
                              );
                            }
                          }
                          // Handle 'maratona' - Fixed structure, no topic selection needed
                          else if (configModal.tipo === "maratona") {
                            return (
                              <option value="">
                                Estrutura fixa do Edital (Port + Mat + Esp)
                              </option>
                            );
                          }
                          // Handle 'ingles'
                          else if (configModal.tipo === "ingles") {
                            const materia = CONTEUDO_MATERIAS.find(
                              (m) => m.id === "ingles",
                            );
                            if (materia) {
                              topics = materia.topicos.map((t) => t.titulo);
                            }
                          }

                          return topics.map((topic, index) => (
                            <option key={index} value={topic}>
                              {topic}
                            </option>
                          ));
                        })()}
                      </select>
                      {configModal.tipo === "intensivo" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Escolha uma matéria completa ou um tópico específico
                          para treinar.
                        </p>
                      )}
                      {configModal.tipo === "maratona" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          O simulado seguirá a distribuição exata do edital para
                          seu nível.
                        </p>
                      )}
                    </div>

                    {/* Start Button */}
                    <button
                      onClick={() => {
                        if (!configModal.tipo) return;

                        const queryParams = new URLSearchParams({
                          tipo: configModal.tipo,
                          qtd: configModal.qtd?.toString() || "10",
                          dificuldade: selection.dificuldade,
                          assunto: selection.assunto,
                        });

                        if (configModal.tipo === "maratona") {
                          router.push(
                            `/maratona-100?${queryParams.toString()}`,
                          );
                        } else if (configModal.tipo === "especificas") {
                          router.push(
                            `/simulado-especifico?${queryParams.toString()}`,
                          );
                        } else {
                          // Português, Matemática e Inglês vão para o simulado rápido
                          router.push(
                            `/simulado-rapido?${queryParams.toString()}`,
                          );
                        }
                      }}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all text-lg"
                    >
                      Começar Desafio 🚀
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upgrade Banner for Free Users */}
            {userData.plan === "free" && (
              <div className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 backdrop-blur-lg rounded-2xl p-6 sm:p-10 border border-yellow-500/10 text-center shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  🚀 Desbloqueie todo o potencial!
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Assinantes PRO têm acesso ilimitado a Simulados Intensivos,
                  Maratonas Oficiais, Ranking completo e análises de desempenho
                  personalizadas.
                </p>
                <Link
                  href="/pricing"
                  className="px-8 py-3.5 bg-gradient-to-r from-yellow-500 to-orange-600 text-slate-900 font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all inline-block transform hover:scale-105 active:scale-95 text-sm uppercase tracking-widest"
                >
                  Ver Planos e Preços
                </Link>
              </div>
            )}
          </>
        ) : (
          <RankingTable userCargo={userData.cargo || ""} />
        )}
      </main>
    </div>
  );
}

function RankingTable({ userCargo }: { userCargo: string }) {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"geral" | "cargo">("geral");

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/ranking?type=${filter}&cargo=${userCargo || ""}`,
        );
        if (!res.ok) {
          console.error("Failed to fetch ranking:", await res.text());
          setRanking([]);
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setRanking(data);
        } else {
          console.error("Ranking data is not an array:", data);
          setRanking([]);
        }
      } catch (error) {
        console.error("Error fetching ranking:", error);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [filter, userCargo]);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="p-5 sm:p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          🏆 Ranking <span className="hidden sm:inline">de Jogadores</span>
        </h2>
        <div className="flex bg-muted rounded-full p-1 w-full sm:w-auto">
          <button
            onClick={() => setFilter("geral")}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === "geral" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Geral
          </button>
          <button
            onClick={() => setFilter("cargo")}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filter === "cargo" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Meu Cargo
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-muted-foreground">
          Carregando ranking...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-4 sm:px-6 py-3">Pos</th>
                <th className="px-4 sm:px-6 py-3">Usuário</th>
                <th className="hidden xs:table-cell px-4 sm:px-6 py-3 text-center">
                  Nível
                </th>
                <th className="px-4 sm:px-6 py-3 text-right">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ranking.map((player) => (
                <tr
                  key={player.posicao}
                  className="hover:bg-muted/50 transition"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`font-black ${
                        player.posicao === 1
                          ? "text-yellow-500 text-xl"
                          : player.posicao === 2
                            ? "text-slate-400 text-lg"
                            : player.posicao === 3
                              ? "text-orange-500 text-lg"
                              : "text-muted-foreground"
                      }`}
                    >
                      #{player.posicao}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                      {player.avatar_url ? (
                        <img
                          src={player.avatar_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-foreground font-bold">
                          {player.nome.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground font-bold truncate">
                        {player.nome}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight truncate">
                        {(() => {
                          const profissao = getProfissaoById(player.cargo);
                          return profissao?.nome || player.cargo;
                        })()}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-muted text-muted-foreground border border-border">
                      {player.nivel || "Novato"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-yellow-600 dark:text-yellow-400">
                    {player.xp.toLocaleString()} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
