"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CONTEUDO_MATERIAS } from "@/data/conteudo";
import { PROFISSOES, getProfissaoById } from "@/lib/profissoes-edital";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useAllAulasProgress } from "@/hooks/useAulaProgress";
import { useSetPageTitle } from "@/contexts/UIContext";
import { CARGO_ID_MAP } from "@/lib/cargos-map";
import { getRankingAction } from "@/lib/actions/ranking";
import { getCurrentUserAction } from "@/lib/actions/auth";
import { useTelemetry } from "@/hooks/useTelemetry";
import {
  Flame,
  Zap,
  Target,
  FileText,
  Trophy,
  Crown,
  Lock,
  Rocket,
  BookOpen,
  Play,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Award,
  Activity,
  BarChart3,
  ShieldCheck,
  Globe,
  X,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

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
  user_metadata?: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, total: 0 });
  const { fetchProfile, profile: telemetryProfile } = useTelemetry();

  const { progressData: allContentProgress, loading: loadingProgress } =
    useAllAulasProgress();
  const loading = loadingUser || loadingProgress;

  useSetPageTitle("Dashboard do Aluno");

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
    const loadUser = async () => {
      try {
        const result = await getCurrentUserAction();
        if (result.status === "success") {
          setUser(result.data);
        }
        await fetchProfile();
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
      const userCargo = user?.cargo || "operacao";
      const userConcursoSlug =
        getProfissaoById(userCargo)?.concurso ||
        user?.user_metadata?.concurso ||
        "petrobras";

      const filtered = CONTEUDO_MATERIAS.filter((m) => {
        if (!m.concursos) return true;
        return m.concursos.includes(userConcursoSlug);
      });

      let totalLessons = 0;
      filtered.forEach((m) => (totalLessons += m.topicos.length));

      const completedCount = Object.entries(allContentProgress).filter(
        ([key, p]) => {
          const [materiaId] = key.split("/");
          const belongsToContest = filtered.some((m) => m.id === materiaId);
          return belongsToContest && p.completed;
        }
      ).length;

      const inProgressCount = Object.entries(allContentProgress).filter(
        ([key, p]) => {
          const [materiaId] = key.split("/");
          const belongsToContest = filtered.some((m) => m.id === materiaId);
          return belongsToContest && !p.completed && p.progress_percent > 0;
        }
      ).length;

      setStats({
        completed: completedCount,
        inProgress: inProgressCount,
        total: totalLessons > 0 ? totalLessons : 10,
      });
    }
  }, [loadingProgress, allContentProgress, user]);

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
      <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        <p className="text-xs text-muted-foreground font-medium animate-pulse">
          Carregando portal de estudos...
        </p>
      </div>
    );
  }

  const userData: UserData = user
    ? {
        ...user,
        conquistas: user.conquistas || [],
        questoes_certas: user.questoes_certas || 0,
        questoes_erradas: user.questoes_erradas || 0,
        xp: telemetryProfile?.current_xp ?? (user.xp || 0),
        sequencia_atual: telemetryProfile?.streak_days ?? (user.sequencia_atual || 0),
        questoes_geradas: user.questoes_geradas || 0,
        nivel: user.nivel || "medio",
        cargo: user.cargo || "operacao",
        plan: user.plan || "free",
        nivel_jogador: telemetryProfile?.current_level ?? "Estagiário",
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
        xp: telemetryProfile?.current_xp ?? 0,
        nivel_jogador: telemetryProfile?.current_level ?? "Estagiário",
        questoes_certas: 0,
        questoes_erradas: 0,
        sequencia_atual: telemetryProfile?.streak_days ?? 0,
        maior_sequencia: 0,
        conquistas: [],
        questoes_geradas: 0,
        nivelConcurso: "medio",
        diasRestantesTrial: 7,
        simuladosHoje: 0,
      };

  const userCargo = userData.cargo || "operacao";
  const userConcursoSlug =
    getProfissaoById(userCargo)?.concurso ||
    userData.user_metadata?.concurso ||
    "petrobras";

  const filtered = CONTEUDO_MATERIAS.filter((m) => {
    if (!m.concursos) return true;
    return m.concursos.includes(userConcursoSlug);
  });

  let lastStudiedTopic = {
    materiaId: "portugues",
    topicoId: "interpretacao-texto",
    titulo: "Interpretação de Texto",
    materiaNome: "Língua Portuguesa",
  };

  if (filtered.length > 0) {
    const progressList = Object.entries(allContentProgress).filter(([key]) => {
      const [materiaId] = key.split("/");
      return filtered.some((m) => m.id === materiaId);
    });

    if (progressList.length > 0) {
      const inProgress = progressList.find(
        ([_, p]) => !p.completed && p.progress_percent > 0
      );
      const chosen = inProgress || progressList[0];
      if (chosen) {
        const [materiaId, topicoId] = chosen[0].split("/");
        const mat = filtered.find((m) => m.id === materiaId);
        const top = mat?.topicos.find((t) => t.id === topicoId);
        if (mat && top) {
          lastStudiedTopic = {
            materiaId,
            topicoId,
            titulo: top.titulo,
            materiaNome: mat.nome,
          };
        }
      }
    } else {
      const firstMat = filtered[0];
      const firstTop = firstMat.topicos[0];
      if (firstMat && firstTop) {
        lastStudiedTopic = {
          materiaId: firstMat.id,
          topicoId: firstTop.id,
          titulo: firstTop.titulo,
          materiaNome: firstMat.nome,
        };
      }
    }
  }

  const handleSimuladoClick = (tipo: string, nome: string, cor: string) => {
    if (userData.plan === "free") {
      if (
        userData.diasRestantesTrial !== undefined &&
        userData.diasRestantesTrial <= 0
      ) {
        alert(
          "Seu período de teste acabou!\n\nAssine o PRO para continuar treinando sem limites.",
        );
        return;
      }
      if (userData.simuladosHoje !== undefined && userData.simuladosHoje >= 1) {
        alert(
          "Você já usou seu simulado diário gratuito de hoje!\n\nVolte amanhã ou assine o PRO para acesso ilimitado.",
        );
        return;
      }
    }
    setConfigModal({ open: true, tipo, nome, cor });
  };

  const profissaoUsuario = getProfissaoById(CARGO_ID_MAP[userCargo] || userCargo);
  const showIngles =
    userData.nivelConcurso === "superior" ||
    (!userData.nivelConcurso &&
      getProfissaoById(CARGO_ID_MAP[userData.cargo] || userData.cargo)?.nivel === "superior");

  return (
    <div className="w-full p-4 md:p-8 lg:p-10 space-y-8 animate-in fade-in duration-300">
      {/* HEADER SUPERIOR DO ALUNO */}
      <header className="relative bg-card border border-border/70 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                {profissaoUsuario?.nome || "Concurseiro Petrobras"}
              </span>

              {userData.plan === "elite-total" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 uppercase tracking-wider shadow-sm">
                  <Crown className="w-3 h-3 fill-slate-950" />
                  PRO ELITE
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              Olá, {userData.nome.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
              Bem-vindo ao seu portal de preparação. Acompanhe suas métricas e fortaleça sua rotina de estudos.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Ofensiva */}
              <div className="flex items-center gap-3 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 px-5 py-3 rounded-2xl">
                <Flame className={`w-6 h-6 ${userData.sequencia_atual > 0 ? "text-amber-500 dark:text-orange-400 fill-amber-500/30 animate-pulse" : "text-muted-foreground"}`} />
                <div>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider leading-none">
                    Ofensiva
                  </p>
                  <p className="text-lg font-black text-foreground mt-1">
                    {userData.sequencia_atual} {userData.sequencia_atual === 1 ? "dia" : "dias"}
                  </p>
                </div>
              </div>

              {/* XP */}
              <div className="flex-1 min-w-[200px] max-w-xs space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-extrabold text-muted-foreground flex items-center gap-1.5">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    {userData.nivel_jogador}
                  </span>
                  <span className="font-black text-primary font-mono text-base">
                    {userData.xp} XP
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-border/50">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-primary rounded-full transition-all duration-700 relative shadow-sm"
                    style={{ width: `${Math.min(100, Math.max(6, (userData.xp % 1000) / 10))}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Card de Assinatura */}
            {userData.plan === "free" && (
              <div className="w-full max-w-xl bg-card/80 border border-amber-500/25 rounded-2xl p-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider">
                      Período de Teste Gratuito
                    </span>
                    <p className="text-sm font-black text-foreground">
                      <span className={userData.diasRestantesTrial && userData.diasRestantesTrial <= 3 ? "text-red-500 animate-pulse" : "text-amber-500"}>
                        {userData.diasRestantesTrial} dias restantes
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95 text-center shrink-0"
                >
                  <Crown className="w-4 h-4 fill-slate-950" />
                  Seja Aluno PRO
                </Link>
              </div>
            )}
          </div>

          {/* WIDGET 1: PROGRESSO NO EDITAL (GRÁFICO RECHARTS) */}
          <div className="hidden lg:block w-full lg:w-1/3 xl:w-2/5">
            <div className="bg-card border border-border/70 rounded-3xl p-6 shadow-sm space-y-4 h-full flex flex-col justify-center">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="text-base font-black text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Progresso
                </h3>
                <span className="text-xs font-mono font-black text-primary">
                  {stats.completed}/{stats.total}
                </span>
              </div>

              <div className="h-44 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Concluído", value: stats.completed },
                        {
                          name: "Restante",
                          value: Math.max(0, stats.total - stats.completed),
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell key="cell-0" fill="#10b981" />
                      <Cell key="cell-1" fill="hsl(var(--muted))" opacity={0.6} />
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                        borderRadius: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-foreground">
                    {Math.round((stats.completed / (stats.total || 1)) * 100)}%
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Concluído
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ABAS SUPERIORES DE NAVEGAÇÃO */}
      <div className="flex border-b border-border gap-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3.5 text-base font-black flex items-center gap-2 transition-all relative ${
            activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          Visão Geral (Portal)
        </button>
        <button
          onClick={() => setActiveTab("ranking")}
          className={`pb-3.5 text-base font-black flex items-center gap-2 transition-all relative ${
            activeTab === "ranking"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Trophy className="w-5 h-5" />
          Ranking Completo
        </button>
      </div>

      <main>
        {activeTab === "overview" ? (
          <>
            {/* ESTRUTURA EDITORIAL / HIERARQUIA VISUAL (GRID PRINCIPAL + SIDEBAR LATERAL) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUNA ESQUERDA PRINCIPAL (HERO BANNER + DESTAQUES + FEED DE SIMULADOS) - 8 COLUNAS */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* NÍVEL 1: HERO BANNER DE ALTO DESTAQUE (JORNADA DE AULAS) */}
              <Link href="/aulas" className="relative bg-card border border-primary/25 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md overflow-hidden group min-h-[260px] lg:min-h-[300px] flex items-center hover:border-blue-500/50 hover:shadow-lg transition-all">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform" />
                
                {/* Imagem de fundo estilizada */}
                <div className="absolute inset-y-0 right-0 w-full md:w-2/3 lg:w-3/5 z-0 pointer-events-none">
                  <Image src="/images/jornada_aulas.png" alt="" fill className="object-cover object-right md:object-center opacity-30 md:opacity-80 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 md:via-card/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent md:hidden" />
                </div>

                <div className="relative z-10 flex flex-col items-start justify-center gap-6 w-full h-full">
                  <div className="space-y-4 max-w-xl">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-500 border border-blue-500/30 shadow-sm backdrop-blur-sm">
                      <BookOpen className="w-4 h-4" />
                      Módulos Teóricos
                    </span>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight group-hover:text-blue-500 transition-colors">
                      Jornada de Aulas
                    </h2>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                      <strong className="text-foreground/80 font-bold">C</strong>ontexto, <strong className="text-foreground/80 font-bold">E</strong>xplicação, <strong className="text-foreground/80 font-bold">D</strong>emonstração, <strong className="text-foreground/80 font-bold">E</strong>xpansão e <strong className="text-foreground/80 font-bold">A</strong>plicação. Domine o edital com nosso método.
                    </p>
                  </div>

                  <div className="w-full md:w-auto mt-2">
                    <div className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-black rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 group-hover:bg-blue-500 transition group-hover:scale-105 active:scale-95 text-center">
                      Acessar Módulos
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* NÍVEL 2: BANNERS SECUNDÁRIOS DE APRENDIZADO (GRID 2 COLUNAS DE DESTAQUE) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Banner 1: Retomar de Onde Parou */}
                <Link
                  href={`/aulas/${lastStudiedTopic.materiaId}/${lastStudiedTopic.topicoId}`}
                  className="group relative bg-card border border-border/70 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between space-y-6 hover:-translate-y-1 hover:shadow-md overflow-hidden min-h-[240px]"
                >
                  {/* Fundo Decorativo Hero Style */}
                  <div className="absolute inset-y-0 right-0 w-2/3 md:w-3/4 z-0 pointer-events-none">
                    <Image src="/images/retomar_estudos.png" alt="" fill className="object-cover object-right opacity-30 md:opacity-50 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3.5 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 group-hover:bg-primary/20 transition-all shrink-0 backdrop-blur-md border border-primary/20">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <div className="space-y-2 max-w-[200px] sm:max-w-[250px]">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 backdrop-blur-md px-2 py-0.5 rounded-full inline-block border border-primary/20">
                          Continuar Estudando
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight">
                          Retomar Conteúdo
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2" title={lastStudiedTopic.titulo}>
                        Você parou em: <strong className="text-foreground/80 font-bold">{lastStudiedTopic.titulo}</strong>
                      </p>
                      {(() => {
                        const progressKey = `${lastStudiedTopic.materiaId}/${lastStudiedTopic.topicoId}`;
                        const progress = allContentProgress[progressKey];
                        const percent = progress?.progress_percent || 0;
                        return (
                          <div className="pt-2 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden p-0.5">
                              <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
                            </div>
                            <span className="text-[10px] font-black text-foreground font-mono">{percent}%</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs font-black text-primary group-hover:gap-2 transition-all pt-4 border-t border-border/50">
                    <span>Ir para aula</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>

                {/* Banner 2: Plano de Estudos */}
                <Link
                  href="/plano-estudos"
                  className="group relative bg-card border border-border/70 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-6 hover:-translate-y-1 hover:shadow-md overflow-hidden min-h-[240px]"
                >
                  {/* Fundo Decorativo Hero Style */}
                  <div className="absolute inset-y-0 right-0 w-2/3 md:w-3/4 z-0 pointer-events-none">
                    <Image src="/images/plano_estudos.png" alt="" fill className="object-cover object-right opacity-30 md:opacity-70 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
                  </div>

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3.5 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all shrink-0 backdrop-blur-md border border-emerald-500/20">
                      <CalendarCheck className="w-7 h-7" />
                    </div>
                    <div className="space-y-2 max-w-[200px] sm:max-w-[250px]">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 backdrop-blur-md px-2 py-0.5 rounded-full inline-block border border-emerald-500/20">
                          Plano Individual
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-emerald-500 transition-colors tracking-tight">
                          Plano de Estudos
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        Distribuição otimizada do seu tempo por disciplina, baseada no peso do edital.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-xs font-black text-emerald-500 group-hover:gap-2 transition-all pt-4 border-t border-border/50">
                    <span>Ver Meu Cronograma</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              </section>

            </div>

            {/* COLUNA DIREITA (SIDEBAR DE APOIO COM WIDGETS VISUAIS) - 4 COLUNAS */}
            <aside className="lg:col-span-4 space-y-6">
              


              {/* WIDGET 2: MÉTRICAS RÁPIDAS DE DESEMPENHO */}
              <div className="bg-card border border-border/70 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-black text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                  <Activity className="w-5 h-5 text-blue-500" />
                  Métricas da Semana
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-extrabold text-muted-foreground">Sequência Ativa</span>
                    </div>
                    <span className="text-sm font-black text-foreground">{userData.sequencia_atual} dias</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                        <Target className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-extrabold text-muted-foreground">Taxa de Precisão</span>
                    </div>
                    <span className="text-sm font-black text-foreground">{taxaAcerto}%</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-extrabold text-muted-foreground">Questões Resolvidas</span>
                    </div>
                    <span className="text-sm font-black text-foreground">{userData.questoes_geradas}</span>
                  </div>
                </div>
              </div>

              {/* WIDGET 3: MINI RANKING DE LÍDERES */}
              <div className="bg-card border border-border/70 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <h3 className="text-base font-black text-foreground flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Líderes do Mês
                  </h3>
                  <button
                    onClick={() => setActiveTab("ranking")}
                    className="text-xs font-black text-primary hover:underline"
                  >
                    Ver Tudo
                  </button>
                </div>

                <MiniRankingWidget userCargo={userData.cargo || ""} />
              </div>

            </aside>

          </div>

          {/* NOVAS SEÇÕES FULL WIDTH */}
          <div className="space-y-12 mt-12">
              {/* NÍVEL 3: FEED DE SIMULADOS RÁPIDOS POR DISCIPLINA (SEM ESPAÇO VAGO E COM TÍTULOS EXPANDIDOS) */}
            <section className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2.5 tracking-tight">
                    <Zap className="w-6 h-6 text-amber-500" />
                    Simulados Rápidos por Disciplina
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Fixação diária de 5 minutos com questões comentadas.
                  </p>
                </div>
              </div>

              {/* Grid Responsivo Inteligente: Se houver 3 matérias, ocupa 3 colunas perfeitamente sem buracos! */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  showIngles ? "lg:grid-cols-4" : "lg:grid-cols-3"
                } gap-5`}
              >
                {/* Português */}
                <button
                  onClick={() =>
                    handleSimuladoClick("portugues", "Língua Portuguesa", "blue")
                  }
                  className="relative overflow-hidden bg-card border border-border/70 rounded-3xl p-6 text-left shadow-sm hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-md transition-all group flex flex-col justify-between space-y-5 min-h-[240px]"
                >
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/simulado_portugues.png" alt="" fill className="object-cover object-right opacity-30 md:opacity-60 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20">
                        5 min
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-blue-500 transition-colors">
                        Língua Portuguesa
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                        5 Questões • Rápido
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      Gramática, ortografia, concordância e interpretação de texto Cesgranrio.
                    </p>
                  </div>


                  <div className="relative z-10 flex items-center justify-between text-xs font-black text-blue-500 group-hover:gap-1.5 transition-all pt-3 border-t border-border/40 w-full">
                    <span>Iniciar Treino</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Matemática */}
                <button
                  onClick={() =>
                    handleSimuladoClick("matematica", "Matemática", "indigo")
                  }
                  className="relative overflow-hidden bg-card border border-border/70 rounded-3xl p-6 text-left shadow-sm hover:border-indigo-500/50 hover:-translate-y-1 hover:shadow-md transition-all group flex flex-col justify-between space-y-5 min-h-[240px]"
                >
                  <div className="absolute inset-y-0 right-0 w-2/3 md:w-3/4 z-0 pointer-events-none">
                    <Image src="/images/simulado_matematica.png" alt="" fill className="object-cover object-right opacity-20 md:opacity-40 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:scale-110 transition-transform">
                        <Activity className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20">
                        5 min
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-indigo-500 transition-colors">
                        Matemática
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                        5 Questões • Rápido
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      Raciocínio lógico, matemática financeira, probabilidade e estatística.
                    </p>
                  </div>


                  <div className="relative z-10 flex items-center justify-between text-xs font-black text-indigo-500 group-hover:gap-1.5 transition-all pt-3 border-t border-border/40 w-full">
                    <span>Iniciar Treino</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Específicos */}
                <button
                  onClick={() =>
                    handleSimuladoClick(
                      "especificas",
                      "Conhecimentos Específicos",
                      "green",
                    )
                  }
                  className="relative overflow-hidden bg-card border border-border/70 rounded-3xl p-6 text-left shadow-sm hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-md transition-all group flex flex-col justify-between space-y-5 min-h-[240px]"
                >
                  <div className="absolute inset-y-0 right-0 w-2/3 md:w-3/4 z-0 pointer-events-none">
                    <Image src="/images/simulado_especificos.png" alt="" fill className="object-cover object-right opacity-20 md:opacity-40 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
                  </div>

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
                        Edital
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-emerald-500 transition-colors">
                        Conhecimentos Específicos
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                        Foco no Seu Cargo
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {profissaoUsuario?.nome || "Questões alinhadas ao seu edital selecionado"}.
                    </p>
                  </div>


                  <div className="relative z-10 flex items-center justify-between text-xs font-black text-emerald-500 group-hover:gap-1.5 transition-all pt-3 border-t border-border/40 w-full">
                    <span>Iniciar Treino</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                {/* Inglês (Apenas para Nível Superior) */}
                {showIngles && (
                  <button
                    onClick={() =>
                      handleSimuladoClick("ingles", "Língua Inglesa", "red")
                    }
                    className="relative overflow-hidden bg-card border border-border/70 rounded-3xl p-6 text-left shadow-sm hover:border-rose-500/50 hover:-translate-y-1 hover:shadow-md transition-all group flex flex-col justify-between space-y-5 min-h-[240px]"
                  >
                    <div className="absolute inset-y-0 right-0 w-2/3 md:w-3/4 z-0 pointer-events-none">
                      <Image src="/images/simulado_ingles.png" alt="" fill className="object-cover object-right opacity-20 md:opacity-40 group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl group-hover:scale-110 transition-transform">
                          <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20">
                          Superior
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-rose-500 transition-colors">
                          Língua Inglesa
                        </h3>
                        <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                          Interpretação Técnica
                        </p>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        Compreensão técnica de textos e vocabulário da indústria de energia.
                      </p>
                    </div>


                    <div className="relative z-10 flex items-center justify-between text-xs font-black text-rose-500 group-hover:gap-1.5 transition-all pt-3 border-t border-border/40 w-full">
                      <span>Iniciar Treino</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                )}
              </div>
            </section>


            {/* NÍVEL 4: TREINO INTENSIVO & MARATONA CESGRANRIO (LARGURA TOTAL HERO STYLE) */}
            <section className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2.5 tracking-tight">
                    <Flame className="w-6 h-6 text-orange-500" />
                    Treino Intensivo & Maratonas Oficiais
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Provas completas com cronômetro para simular o dia da prova.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userData.plan === "free" ? (
                    <>
                      {/* FREE: Treino Intensivo (Hero Style) */}
                      <div className="relative bg-card border border-border/70 rounded-3xl p-7 overflow-hidden flex flex-col justify-between shadow-sm min-h-[280px] group">
                        <Image src="/images/treino_intensivo.png" alt="" fill className="object-cover object-right opacity-30 md:opacity-60 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
                        
                        <div className="absolute inset-0 bg-background/80 dark:bg-slate-950/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center space-y-4">
                          <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
                            <Lock className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-black text-foreground">
                            Simulado Intensivo (20 Questões)
                          </h3>
                          <p className="text-sm text-muted-foreground max-w-sm">
                            Exclusivo para assinantes PRO. Treine tópicos específicos em profundidade.
                          </p>
                          <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-xl text-sm shadow-md hover:scale-105 transition-all uppercase tracking-wider mt-2">
                            <Rocket className="w-4 h-4 fill-slate-950" />
                            Acessar com PRO
                          </Link>
                        </div>
                      </div>

                      {/* FREE: Maratona (Hero Style) */}
                      <div className="relative bg-card border border-border/70 rounded-3xl p-7 overflow-hidden flex flex-col justify-between shadow-sm min-h-[280px] group">
                        <Image src="/images/maratona_cesgranrio.png" alt="" fill className="object-cover object-right opacity-30 md:opacity-60 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent" />
                        
                        <div className="absolute inset-0 bg-background/80 dark:bg-slate-950/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center space-y-4">
                          <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
                            <Crown className="w-8 h-8" />
                          </div>
                          <h3 className="text-xl font-black text-foreground">
                            Maratona CESGRANRIO (70 Questões)
                          </h3>
                          <p className="text-sm text-muted-foreground max-w-sm">
                            Simulação oficial de 4h.
                          </p>
                          <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black rounded-xl text-sm shadow-md hover:scale-105 transition-all uppercase tracking-wider mt-2">
                            <Crown className="w-4 h-4 fill-slate-950" />
                            Seja PRO
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* PRO: Treino Intensivo (Hero Style) */}
                      <button
                        onClick={() => setConfigModal({ open: true, tipo: "intensivo", nome: "Treino Intensivo Focalizado", cor: "indigo", qtd: 20 })}
                        className="group relative bg-card border border-border/70 rounded-3xl p-8 shadow-sm hover:border-indigo-500/50 hover:shadow-lg transition-all flex flex-col justify-center space-y-6 text-left overflow-hidden min-h-[280px]"
                      >
                        <div className="absolute inset-y-0 right-0 w-2/3 z-0 pointer-events-none">
                          <Image src="/images/treino_intensivo.png" alt="" fill className="object-cover object-right opacity-30 md:opacity-60 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent pointer-events-none" />
                        </div>

                        <div className="relative z-10 flex flex-col gap-4 max-w-md">
                          <div className="flex items-center gap-4">
                            <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all shrink-0 backdrop-blur-md border border-indigo-500/20">
                              <Target className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20 backdrop-blur-md">
                              20 Questões
                            </span>
                          </div>

                          <div className="space-y-2 mt-2">
                            <h3 className="text-2xl sm:text-3xl font-black text-foreground group-hover:text-indigo-500 transition-colors tracking-tight">
                              Treino Intensivo
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              20 questões focadas no tópico da sua escolha com análise imediata e correção detalhada.
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm font-black text-indigo-500 group-hover:gap-3 transition-all pt-4">
                            <span>Configurar Treino</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>

                      {/* PRO: Maratona (Hero Style) */}
                      <button
                        onClick={() => setConfigModal({ open: true, tipo: "maratona", nome: "Maratona Oficial CESGRANRIO", cor: "yellow", qtd: 70 })}
                        className="group relative bg-card border border-border/70 rounded-3xl p-8 shadow-sm hover:border-amber-500/50 hover:shadow-lg transition-all flex flex-col justify-center space-y-6 text-left overflow-hidden min-h-[280px]"
                      >
                        <div className="absolute inset-y-0 right-0 w-2/3 z-0 pointer-events-none">
                          <Image src="/images/maratona_cesgranrio.png" alt="" fill className="object-cover object-right opacity-30 md:opacity-60 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-transparent pointer-events-none" />
                        </div>

                        <div className="relative z-10 flex flex-col gap-4 max-w-md">
                          <div className="flex items-center gap-4">
                            <div className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl group-hover:scale-110 group-hover:bg-amber-500/20 transition-all shrink-0 backdrop-blur-md border border-amber-500/20">
                              <Crown className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 backdrop-blur-md">
                              70 Questões • 4h
                            </span>
                          </div>

                          <div className="space-y-2 mt-2">
                            <h3 className="text-2xl sm:text-3xl font-black text-foreground group-hover:text-amber-500 transition-colors tracking-tight">
                              Maratona CESGRANRIO
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Simulado completo com a distribuição exata do edital para o seu cargo.
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm font-black text-amber-500 group-hover:gap-3 transition-all pt-4">
                            <span>Iniciar Maratona</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </button>
                    </>
                  )}
                </div>
            </section>

          </div>
        </>
        ) : (
          /* TAB DE RANKING COMPLETO */
          <RankingTable userCargo={userData.cargo || ""} />
        )}
      </main>

      {/* MODAL CONFIGURAÇÃO DE SIMULADO */}
      {configModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 dark:bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfigModal({ open: false });
          }}
        >
          <div className="bg-card border border-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/40">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {configModal.nome}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ajuste a dificuldade antes de começar.
                </p>
              </div>
              <button
                onClick={() => setConfigModal({ open: false })}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Dificuldade */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Nível de Dificuldade
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Fácil", "Médio", "Difícil", "Casca de Banana"].map((dif) => (
                    <button
                      key={dif}
                      onClick={() => setSelection({ ...selection, dificuldade: dif })}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                        selection.dificuldade === dif
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-muted/50 border-border/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {dif}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assunto Específico */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Assunto / Tópico
                </label>
                <select
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary shadow-sm"
                  value={selection.assunto}
                  onChange={(e) => setSelection({ ...selection, assunto: e.target.value })}
                >
                  <option value="">Todos os tópicos (Geral)</option>
                  {(() => {
                    let topics: string[] = [];

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
                    } else if (configModal.tipo === "especificas") {
                      const mappedCargoId =
                        CARGO_ID_MAP[userData.cargo] || userData.cargo;
                      const profession = PROFISSOES.find(
                        (p) => p.id === mappedCargoId,
                      );
                      if (profession) {
                        topics = profession.blocos.flatMap((b) => b.topicos);
                      }
                    } else if (configModal.tipo === "intensivo") {
                      topics.push("Língua Portuguesa", "Matemática");
                      const mappedCargoId =
                        CARGO_ID_MAP[userData.cargo] || userData.cargo;
                      const profession = PROFISSOES.find(
                        (p) => p.id === mappedCargoId,
                      );
                      if (profession) {
                        topics.push(...profession.blocos.flatMap((b) => b.topicos));
                      }
                    } else if (configModal.tipo === "maratona") {
                      return (
                        <option value="">
                          Distribuição Oficial do Edital Petrobras
                        </option>
                      );
                    } else if (configModal.tipo === "ingles") {
                      const materia = CONTEUDO_MATERIAS.find((m) => m.id === "ingles");
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
              </div>

              {/* Botão de Ação */}
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
                    router.push(`/maratona-100?${queryParams.toString()}`);
                  } else if (configModal.tipo === "especificas") {
                    router.push(`/simulado-especifico?${queryParams.toString()}`);
                  } else {
                    router.push(`/simulado-rapido?${queryParams.toString()}`);
                  }
                }}
                className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition shadow-lg text-sm flex items-center justify-center gap-2"
              >
                Iniciando Simulado
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

{/* WIDGET COMPACTO DE MINI RANKING (COLUNA LATERAL) */}
function MiniRankingWidget({ userCargo }: { userCargo: string }) {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const result = await getRankingAction("geral", userCargo);
        if (result.status === "success" && result.data) {
          setRanking(result.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching mini ranking:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [userCargo]);

  if (loading) {
    return <div className="text-xs text-muted-foreground animate-pulse text-center py-4">Carregando líderes...</div>;
  }

  return (
    <div className="space-y-3">
      {ranking.map((player) => (
        <div
          key={player.posicao}
          className="flex items-center justify-between p-3 rounded-2xl bg-muted/30 border border-border/40"
        >
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-extrabold ${
                player.posicao === 1
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                  : player.posicao === 2
                    ? "bg-slate-400/10 text-slate-400 border border-slate-400/30"
                    : "bg-amber-600/10 text-amber-600 border border-amber-600/30"
              }`}
            >
              #{player.posicao}
            </span>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden text-xs font-bold shrink-0 border border-border">
              {player.avatar_url ? (
                <img src={player.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                (player.nome || "E").charAt(0)
              )}
            </div>
            <span className="text-xs font-bold text-foreground truncate max-w-[110px]">
              {player.nome || "Estudante"}
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-primary">{player.xp?.toLocaleString()} XP</span>
        </div>
      ))}
    </div>
  );
}

{/* TABELA DE RANKING COMPLETA */}
function RankingTable({ userCargo }: { userCargo: string }) {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"geral" | "cargo">("geral");

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        const result = await getRankingAction(filter, userCargo);

        if (result.status === "error") {
          console.error("Failed to fetch ranking via action:", result.error);
          setRanking([]);
          return;
        }

        setRanking(result.data || []);
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
    <div className="bg-card rounded-3xl border border-border/70 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Ranking Geral de Alunos
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Classificação atualizada com base no XP acumulado.
          </p>
        </div>

        <div className="flex bg-muted/60 p-1 rounded-xl text-xs font-bold w-full sm:w-auto">
          <button
            onClick={() => setFilter("geral")}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg transition-all ${
              filter === "geral"
                ? "bg-card text-foreground shadow-sm font-black"
                : "text-muted-foreground hover:text-foreground font-semibold"
            }`}
          >
            Geral
          </button>
          <button
            onClick={() => setFilter("cargo")}
            className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg transition-all ${
              filter === "cargo"
                ? "bg-card text-foreground shadow-sm font-black"
                : "text-muted-foreground hover:text-foreground font-semibold"
            }`}
          >
            Meu Cargo
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-muted-foreground animate-pulse">
          Atualizando tabela de líderes...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase tracking-widest font-extrabold border-b border-border">
              <tr>
                <th className="px-6 py-3.5">Posição</th>
                <th className="px-6 py-3.5">Estudante</th>
                <th className="px-6 py-3.5 text-center">Patamar</th>
                <th className="px-6 py-3.5 text-right">XP Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {ranking.map((player) => (
                <tr key={player.posicao} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-black">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs ${
                        player.posicao === 1
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                          : player.posicao === 2
                            ? "bg-slate-400/10 text-slate-400 border border-slate-400/30"
                            : player.posicao === 3
                              ? "bg-amber-600/10 text-amber-600 border border-amber-600/30"
                              : "text-muted-foreground"
                      }`}
                    >
                      #{player.posicao}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border/80 font-bold text-xs shrink-0">
                      {player.avatar_url ? (
                        <img
                          src={player.avatar_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        (player.nome || "E").charAt(0)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground truncate">
                        {player.nome || "Estudante"}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {getProfissaoById(player.cargo)?.nome || player.cargo}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-muted text-muted-foreground border border-border/60">
                      {player.nivel || "Novato"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-primary">
                    {player.xp?.toLocaleString()} XP
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
