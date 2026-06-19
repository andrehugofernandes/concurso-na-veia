"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Usuario } from "@/lib/types";
import { salvarUsuario, carregarUsuario } from "@/lib/utils";
import { getProgramaDeEstudos } from "@/data/programa-estudos";
import { MateriaConteudo } from "@/data/conteudo";
import { progressService, LessonProgress } from "@/lib/services/progress";
import { useUser } from "@/contexts/UserContext";
import {
  LuArrowRight,
  LuSettings,
  LuTrendingDown,
  LuTriangleAlert,
  LuTrophy,
  LuSparkles,
  LuClock,
  LuCalendarDays,
  LuRefreshCw,
  LuTarget,
  LuBookOpen,
  LuZap,
} from "react-icons/lu";
import Link from "next/link";

interface DiaEstudo {
  dia: string;
  abrev: string;
  materias: {
    materiaId: string;
    materiaNome: string;
    topicoId: string;
    topicoNome: string;
    duracaoMinutos: number;
    cor: string;
    icone: string;
  }[];
}

const getDiasDinamicos = () => {
  const basico = [
    { nome: "Domingo", abrev: "DOM" },
    { nome: "Segunda-feira", abrev: "SEG" },
    { nome: "Terça-feira", abrev: "TER" },
    { nome: "Quarta-feira", abrev: "QUA" },
    { nome: "Quinta-feira", abrev: "QUI" },
    { nome: "Sexta-feira", abrev: "SEX" },
    { nome: "Sábado", abrev: "SÁB" },
  ];
  const hoje = new Date().getDay();
  const result = [];
  for (let i = 0; i < 7; i++) {
    const idx = (hoje + i) % 7;
    result.push({
      nome: basico[idx].nome,
      abrev: i === 0 ? "HOJE" : i === 1 ? "AMANHÃ" : basico[idx].abrev,
    });
  }
  return result;
};

export default function PlanoEstudosPage() {
  const router = useRouter();
  const { profile, loading: loadingUser } = useUser();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [horasSemanais, setHorasSemanais] = useState<number>(15);
  const [configurando, setConfigurando] = useState<boolean>(true);
  const [cronograma, setCronograma] = useState<DiaEstudo[]>([]);
  const [programa, setPrograma] = useState<MateriaConteudo[]>([]);
  const [progressoModulos, setProgressoModulos] = useState<LessonProgress[]>([]);
  const [topicosDificuldade, setTopicosDificuldade] = useState<
    {
      materiaId: string;
      topicoId: string;
      topicoNome: string;
      score: number;
      materiaNome: string;
    }[]
  >([]);

  useEffect(() => {
    if (loadingUser) return;

    let dadosSalvos = carregarUsuario();

    if (!dadosSalvos && profile) {
      dadosSalvos = {
        nome: profile.full_name || "Usuário",
        xp: profile.xp || 0,
        nivel: profile.nivel || "Estagiário",
        cargo: profile.job_title || "operacao",
        questoesCertas: 0,
        questoesErradas: 0,
        sequenciaAtual: 0,
        maiorSequencia: 0,
        conquistas: [],
        historico: [],
        questoesGeradas: 0,
        plan: (profile.plan as any) || "free",
      };
      salvarUsuario(dadosSalvos);
    }

    if (dadosSalvos) {
      setUsuario(dadosSalvos);
      const prog = getProgramaDeEstudos(dadosSalvos.cargo || "");
      setPrograma(prog);

      const fetchTelemetry = async () => {
        try {
          const progressData = await progressService.getProgress();
          setProgressoModulos(progressData);

          const fracos: typeof topicosDificuldade = [];
          progressData.forEach((p) => {
            if (p.completed && p.score !== undefined && p.score < 70) {
              const parts = p.lessonId.split("/");
              if (parts.length === 2) {
                const [matId, topId] = parts;
                const materiaMatch = prog.find((m) => m.id === matId);
                const topicoMatch = materiaMatch?.topicos.find((t) => t.id === topId);
                if (topicoMatch) {
                  fracos.push({
                    materiaId: matId,
                    topicoId: topId,
                    topicoNome: topicoMatch.titulo,
                    score: p.score,
                    materiaNome: materiaMatch?.nome || matId,
                  });
                }
              }
            }
          });
          setTopicosDificuldade(fracos);
        } catch (e) {
          console.error("Erro ao carregar telemetria de progresso:", e);
        }
      };

      fetchTelemetry();

      const planoSalvo = localStorage.getItem("planoEstudos");
      if (planoSalvo) {
        try {
          const parsed = JSON.parse(planoSalvo);
          setHorasSemanais(parsed.horasSemanais);
          setCronograma(parsed.cronograma);
          setConfigurando(false);
        } catch (e) {}
      }
    } else {
      router.push("/login");
    }
  }, [router, profile, loadingUser]);

  const gerarCronograma = () => {
    if (!usuario || programa.length === 0) return;

    const minutosPorDia = Math.round((horasSemanais * 60) / 7);
    const novoCronograma: DiaEstudo[] = [];

    const todosTopicos: {
      materiaId: string;
      materiaNome: string;
      topicoId: string;
      topicoNome: string;
      cor: string;
      icone: string;
    }[] = [];

    programa.forEach((m) => {
      m.topicos.forEach((t) => {
        todosTopicos.push({
          materiaId: m.id,
          materiaNome: m.nome,
          topicoId: t.id,
          topicoNome: t.titulo,
          cor: m.cor || "from-slate-600 to-slate-800",
          icone: m.icone || "📚",
        });
      });
    });

    let topicoIndex = 0;

    const dias = getDiasDinamicos();

    for (let i = 0; i < 7; i++) {
      let tempoRestante = minutosPorDia;
      const materiasDoDia = [];

      while (tempoRestante >= 30 && topicoIndex < todosTopicos.length) {
        const topicoAtual = todosTopicos[topicoIndex];
        const duracao = tempoRestante >= 60 ? 60 : tempoRestante;
        materiasDoDia.push({ ...topicoAtual, duracaoMinutos: duracao });
        tempoRestante -= duracao;
        topicoIndex = (topicoIndex + 1) % todosTopicos.length;
      }

      novoCronograma.push({
        dia: dias[i].nome,
        abrev: dias[i].abrev,
        materias: materiasDoDia,
      });
    }

    setCronograma(novoCronograma);
    setConfigurando(false);
    localStorage.setItem(
      "planoEstudos",
      JSON.stringify({ horasSemanais, cronograma: novoCronograma })
    );
  };

  const totalMinutosSemana = horasSemanais * 60;
  const minutosFormato = `${horasSemanais}h`;

  if (loadingUser || !usuario) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── HEADER ────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Plano de Estudos
              </h1>
              <p className="text-sm text-muted-foreground">
                Cronograma adaptado para{" "}
                <span className="text-foreground font-semibold">
                  {usuario.cargo || "seu cargo"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {!configurando && (
          <button
            onClick={() => setConfigurando(true)}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground rounded-xl hover:bg-muted/50 transition-colors text-sm font-semibold"
          >
            <LuRefreshCw className="w-4 h-4" />
            Reconfigurar Plano
          </button>
        )}
      </header>

      {/* ── CARDS DE ESTATÍSTICAS ─────────────────────────────── */}
      {!configurando && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Horas semanais",
              value: minutosFormato,
              icon: LuClock,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10 border-emerald-500/20",
            },
            {
              label: "Dias de estudo",
              value: cronograma.filter((d) => d.materias.length > 0).length.toString(),
              icon: LuCalendarDays,
              color: "text-blue-500",
              bg: "bg-blue-500/10 border-blue-500/20",
            },
            {
              label: "Tópicos cobertos",
              value: cronograma.reduce((a, d) => a + d.materias.length, 0).toString(),
              icon: LuBookOpen,
              color: "text-amber-500",
              bg: "bg-amber-500/10 border-amber-500/20",
            },
            {
              label: "Alertas CESGRANRIO",
              value: topicosDificuldade.length.toString(),
              icon: topicosDificuldade.length > 0 ? LuTriangleAlert : LuTrophy,
              color:
                topicosDificuldade.length > 0 ? "text-rose-500" : "text-emerald-500",
              bg:
                topicosDificuldade.length > 0
                  ? "bg-rose-500/10 border-rose-500/20"
                  : "bg-emerald-500/10 border-emerald-500/20",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
            >
              <div className={`p-2.5 rounded-xl border ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* ── CONFIGURAÇÃO / CRONOGRAMA ─────────────────────────── */}
      {configurando ? (
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LuTarget className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-bold text-foreground">
                Configure seu Plano
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Quantas horas por semana você pode se dedicar aos estudos?
            </p>
          </div>

          {/* Slider de horas */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">
                Disponibilidade semanal
              </span>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                <LuZap className="w-4 h-4 text-emerald-500" />
                <span className="text-lg font-black text-emerald-500">
                  {horasSemanais}h
                </span>
                <span className="text-xs text-muted-foreground">/ semana</span>
              </div>
            </div>

            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={horasSemanais}
              onChange={(e) => setHorasSemanais(parseInt(e.target.value))}
              className="w-full h-2 accent-emerald-500 cursor-pointer"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5h mínimo</span>
              <span>40h máximo</span>
            </div>

            {/* Preview de distribuição diária */}
            <div className="grid grid-cols-7 gap-2">
              {getDiasDinamicos().map((dia, i) => {
                const minPorDia = Math.round((horasSemanais * 60) / 7);
                const horas = Math.floor(minPorDia / 60);
                const min = minPorDia % 60;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 p-2 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      {dia.abrev}
                    </span>
                    <span className="text-xs font-black text-foreground">
                      {horas > 0 ? `${horas}h` : ""}
                      {min > 0 ? `${min}m` : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={gerarCronograma}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
          >
            <LuCalendarDays className="w-5 h-5" />
            Gerar Cronograma Personalizado
          </button>
        </section>
      ) : (
        /* ── CRONOGRAMA SEMANAL (grid 7 colunas) ────────────── */
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <LuCalendarDays className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-bold text-foreground">
              Cronograma Semanal
            </h2>
          </div>

          {/* Grid 7 colunas — scroll horizontal em telas pequenas */}
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-cols-7 gap-3 min-w-[700px]">
              {cronograma.map((dia, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
                >
                  {/* Cabeçalho do dia */}
                  <div className="px-3 py-2.5 border-b border-border/60 text-center">
                    <span className="block text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                      {dia.abrev}
                    </span>
                    {dia.materias.length > 0 && (
                      <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                        <LuClock className="w-2.5 h-2.5" />
                        {dia.materias.reduce((a, m) => a + m.duracaoMinutos, 0)}min
                      </span>
                    )}
                  </div>

                  {/* Cards de matérias empilhados */}
                  <div className="p-2 flex flex-col gap-2 flex-1">
                    {dia.materias.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center py-6">
                        <span className="text-xs text-muted-foreground text-center">☕ Descanso</span>
                      </div>
                    ) : (
                      dia.materias.map((mat, i) => (
                        <Link
                          key={i}
                          href={`/aulas/${mat.materiaId}/${mat.topicoId}`}
                          className="group block bg-background hover:bg-muted/40 border border-border hover:border-emerald-500/40 rounded-xl p-3 transition-all hover:shadow-sm"
                        >
                          {/* Barra colorida no topo */}
                          <div
                            className={`h-0.5 w-full rounded-full bg-gradient-to-r ${mat.cor} mb-2`}
                          />
                          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1 mb-1">
                            <span>{mat.icone}</span>
                            <span className="truncate">{mat.materiaNome}</span>
                          </div>
                          <p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
                            {mat.topicoNome}
                          </p>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1.5">
                            <LuClock className="w-2.5 h-2.5" />
                            {mat.duracaoMinutos}min
                          </span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DOSSIÊ ADAPTATIVO CESGRANRIO ─────────────────────── */}
      {!configurando && (
        <section className="bg-card border border-border rounded-2xl overflow-hidden mt-4">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LuSparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Dossiê Adaptativo CESGRANRIO
              </h2>
            </div>
            {topicosDificuldade.length > 0 && (
              <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-md">
                {topicosDificuldade.length} Alertas
              </span>
            )}
          </div>

          {topicosDificuldade.length > 0 ? (
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <LuTriangleAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-700 dark:text-rose-400 text-sm">
                    Zonas de Vulnerabilidade Detectadas
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Tópicos com menos de 70% de acerto. Priorize a revisão destes pontos.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {topicosDificuldade.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-background border border-border rounded-xl flex items-center justify-between gap-3 group hover:border-rose-500/40 transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {item.materiaNome}
                      </span>
                      <p className="font-bold text-xs text-foreground truncate">
                        {item.topicoNome}
                      </p>
                      <p className="text-[10px] text-rose-500 flex items-center gap-1 font-semibold">
                        <LuTrendingDown className="w-3 h-3" />
                        Rendimento: {item.score}%
                      </p>
                    </div>
                    <Link
                      href={`/aulas/${item.materiaId}/${item.topicoId}`}
                      className="shrink-0 p-1.5 bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-lg transition-all group-hover:scale-110"
                      title="Reforçar"
                    >
                      <LuArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <LuTrophy className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Proficiência Ideal Mantida</p>
                <p className="text-xs text-muted-foreground">
                  Nenhuma vulnerabilidade detectada. Continue fazendo os desafios para manter seu plano calibrado!
                </p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
