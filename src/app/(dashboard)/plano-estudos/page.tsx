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
  const [dataConclusao, setDataConclusao] = useState<Date | null>(null);
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
  const [visaoPlano, setVisaoPlano] = useState<'semanal' | 'total'>('semanal');

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
          if (parsed.dataConclusao) {
            setDataConclusao(new Date(parsed.dataConclusao));
          }
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

    // Estrutura as matérias com suas durações
    const materiasDisponiveis = programa.map((m) => ({
      ...m,
      topicos: m.topicos.map((t) => ({
        materiaId: m.id,
        materiaNome: m.nome,
        topicoId: t.id,
        topicoNome: t.titulo,
        cor: m.cor || "from-slate-600 to-slate-800",
        icone: m.icone || "📚",
        duracaoOriginal: parseInt(t.duracao) || 30,
      })),
    }));

    // Intercalação (Round-Robin) de tópicos
    const todosTopicos: typeof materiasDisponiveis[0]["topicos"] = [];
    let added = true;
    const indices = new Array(materiasDisponiveis.length).fill(0);

    while (added) {
      added = false;
      for (let i = 0; i < materiasDisponiveis.length; i++) {
        if (indices[i] < materiasDisponiveis[i].topicos.length) {
          todosTopicos.push(materiasDisponiveis[i].topicos[indices[i]]);
          indices[i]++;
          added = true;
        }
      }
    }

    let topicoIndex = 0;
    const dias = getDiasDinamicos();
    let i = 0;

    const MEDIA_MINUTOS_POR_AULA = 40;
    const metaAulasDia = Math.max(1, Math.round(minutosPorDia / MEDIA_MINUTOS_POR_AULA));

    while (topicoIndex < todosTopicos.length) {
      const materiasDoDia = [];

      for (let j = 0; j < metaAulasDia && topicoIndex < todosTopicos.length; j++) {
        const topicoAtual = todosTopicos[topicoIndex];
        const tempoGasto = topicoAtual.duracaoOriginal;

        materiasDoDia.push({ ...topicoAtual, duracaoMinutos: tempoGasto });
        topicoIndex++;
      }

      const diaIdx = i % 7;
      novoCronograma.push({
        dia: dias[diaIdx].nome,
        abrev: i < 7 ? dias[diaIdx].abrev : dias[diaIdx].nome.substring(0, 3).toUpperCase(),
        materias: materiasDoDia,
      });
      i++;
    }

    const dataEstimada = new Date();
    dataEstimada.setDate(dataEstimada.getDate() + (semanasEstimadas * 7));

    setCronograma(novoCronograma);
    setDataConclusao(dataEstimada);
    setConfigurando(false);
    
    localStorage.setItem(
      "planoEstudos",
      JSON.stringify({ horasSemanais, cronograma: novoCronograma, dataConclusao: dataEstimada })
    );
  };

  const totalMinutosSemana = horasSemanais * 60;
  const minutosFormato = `${horasSemanais}h`;

  const totalMinutosEdital = programa.reduce((total, m) => {
    return total + m.topicos.reduce((tTotal, t) => tTotal + (parseInt(t.duracao) || 30), 0);
  }, 0);
  
  const semanasEstimadas = Math.ceil(totalMinutosEdital / (horasSemanais * 60)) || 1;
  const simulacaoDataEstimada = new Date();
  simulacaoDataEstimada.setDate(simulacaoDataEstimada.getDate() + (semanasEstimadas * 7));

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
              label: "Conclusão Estimada",
              value: dataConclusao 
                ? dataConclusao.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                : "--",
              icon: LuTarget,
              color: "text-purple-500",
              bg: "bg-purple-500/10 border-purple-500/20",
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
              <div className="flex flex-col items-center">
                <span className="font-semibold text-primary">Conclusão em {semanasEstimadas} semanas</span>
                <span>({simulacaoDataEstimada.toLocaleDateString('pt-BR')})</span>
              </div>
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
        /* ── CRONOGRAMA SEMANAL E TOTAL ────────────── */
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LuCalendarDays className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-bold text-foreground">
                {visaoPlano === 'semanal' ? 'Cronograma Semanal' : 'Panorama Geral (Edital Completo)'}
              </h2>
            </div>
            
            {/* Toggle Visão */}
            <div className="flex items-center p-1 bg-muted/50 border border-border rounded-xl">
              <button
                onClick={() => setVisaoPlano('semanal')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  visaoPlano === 'semanal'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Semanal
              </button>
              <button
                onClick={() => setVisaoPlano('total')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  visaoPlano === 'total'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Total
              </button>
            </div>
          </div>

          {visaoPlano === 'semanal' ? (
            /* Grid 7 colunas — scroll horizontal em telas pequenas */
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-cols-7 gap-3 min-w-[700px]">
                {cronograma.slice(0, 7).map((dia, idx) => (
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
          ) : (
            /* Visão Total - Agrupada por Semanas */
            <div className="space-y-6 animate-in fade-in">
              {Array.from({ length: Math.ceil(cronograma.length / 7) }).map((_, weekIdx) => {
                const diasDaSemana = cronograma.slice(weekIdx * 7, (weekIdx + 1) * 7);
                // Calcula quantas matérias tem na semana e duração total
                const totalMaterias = diasDaSemana.reduce((acc, dia) => acc + dia.materias.length, 0);
                const duracaoSemana = diasDaSemana.reduce(
                  (acc, dia) => acc + dia.materias.reduce((a, m) => a + m.duracaoMinutos, 0),
                  0
                );

                return (
                  <div key={weekIdx} className="bg-card border border-border rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center">
                          {weekIdx + 1}
                        </div>
                        <h3 className="font-bold text-foreground">Semana {weekIdx + 1}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <LuBookOpen className="w-3.5 h-3.5" />
                          {totalMaterias} tópicos
                        </span>
                        <span className="flex items-center gap-1">
                          <LuClock className="w-3.5 h-3.5" />
                          {Math.floor(duracaoSemana / 60)}h {duracaoSemana % 60}m
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 overflow-x-auto">
                      <div className="grid grid-cols-7 gap-3 min-w-[700px]">
                        {diasDaSemana.map((dia, idx) => (
                          <div key={idx} className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase text-center">
                              {dia.dia.substring(0, 3)}
                            </span>
                            <div className="bg-background border border-border rounded-xl p-2 min-h-[60px]">
                              {dia.materias.length > 0 ? (
                                <div className="space-y-1.5">
                                  {dia.materias.map((mat, i) => (
                                    <Link 
                                      key={i} 
                                      href={`/aulas/${mat.materiaId}/${mat.topicoId}`}
                                      className="text-[10px] p-1.5 rounded-lg bg-muted/40 border border-border/50 truncate flex items-center gap-1.5 group relative cursor-pointer hover:bg-muted/60 transition-colors"
                                    >
                                      <span>{mat.icone}</span>
                                      <span className="truncate">{mat.materiaNome}</span>
                                      {/* Tooltip hover */}
                                      <div className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-900 text-white p-2 rounded-lg text-xs z-10 shadow-xl transition-opacity">
                                        <p className="font-bold text-emerald-400 mb-0.5">{mat.materiaNome}</p>
                                        <p className="line-clamp-3 text-slate-300">{mat.topicoNome}</p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <div className="h-full flex items-center justify-center">
                                  <span className="text-[10px] text-muted-foreground">Livre</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {/* Preenche dias vazios se a última semana não tiver 7 dias */}
                        {Array.from({ length: 7 - diasDaSemana.length }).map((_, idx) => (
                          <div key={`empty-${idx}`} className="opacity-30"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
