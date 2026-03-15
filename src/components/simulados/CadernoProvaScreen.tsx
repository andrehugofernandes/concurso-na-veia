'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Simulado, Usuario, Questao, RespostaQuestao } from '@/lib/types';
import { formatarTempo, cn } from '@/lib/utils';

interface CadernoProvaScreenProps {
  simulado: Simulado;
  cronometro: number;
  tempoLimite: number | null;
  usuario: Usuario;
  onResponder: (questaoIndex: number, alternativaIndex: number) => void;
  onFinalizar: () => void;
  onVoltar: () => void;
}

type StatusQuestao = 'pendente' | 'respondida' | 'revisao';

export default function CadernoProvaScreen({
  simulado,
  cronometro,
  tempoLimite,
  usuario,
  onResponder,
  onFinalizar,
  onVoltar,
}: CadernoProvaScreenProps) {
  // Group questions by materia (in order they appear — CESGRANRIO sequential blocks)
  const materias = useMemo(() => {
    const seen = new Map<string, number[]>();
    simulado.questoes.forEach((q, i) => {
      const key = q.materia;
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key)!.push(i);
    });
    return Array.from(seen.entries()).map(([nome, indices]) => ({ nome, indices }));
  }, [simulado.questoes]);

  const [abaAtiva, setAbaAtiva] = useState(0);
  const [marcadasRevisao, setMarcadasRevisao] = useState<Set<number>>(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showGridMobile, setShowGridMobile] = useState(false);
  const questaoRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const tempoCritico = tempoLimite != null && cronometro < 30 * 60;
  const tempoMuitoCritico = tempoLimite != null && cronometro < 10 * 60;

  const getStatusQuestao = useCallback((globalIndex: number): StatusQuestao => {
    if (marcadasRevisao.has(globalIndex)) return 'revisao';
    if (simulado.respostas[globalIndex] != null) return 'respondida';
    return 'pendente';
  }, [simulado.respostas, marcadasRevisao]);

  const totalRespondidas = simulado.respostas.filter(r => r != null).length;
  const totalRevisao = marcadasRevisao.size;

  const toggleRevisao = (globalIndex: number) => {
    setMarcadasRevisao(prev => {
      const next = new Set(prev);
      if (next.has(globalIndex)) next.delete(globalIndex);
      else next.add(globalIndex);
      return next;
    });
  };

  const scrollToQuestao = (globalIndex: number) => {
    const el = questaoRefs.current.get(globalIndex);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowGridMobile(false);
  };

  const getLetra = (i: number) => String.fromCharCode(65 + i);

  const handleFinalizar = () => {
    const naoRespondidas = simulado.respostas.filter(r => r == null).length;
    if (naoRespondidas > 0) {
      setShowConfirmModal(true);
    } else {
      onFinalizar();
    }
  };

  // Current tab's question indices
  const currentIndices = materias[abaAtiva]?.indices ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== STICKY HEADER ===== */}
      <header className="bg-background/95 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Top row: back, title, timer, finalizar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onVoltar}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-500"
                title="Voltar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-black uppercase tracking-tight">
                  Maratona CESGRANRIO
                </h1>
                <p className="text-xs text-muted-foreground">
                  {totalRespondidas}/{simulado.questoes.length} respondidas
                  {totalRevisao > 0 && <span className="text-yellow-500 ml-2">{totalRevisao} para revisao</span>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="text-right">
                <p className={cn(
                  "text-xl sm:text-2xl font-black tracking-tighter tabular-nums",
                  tempoMuitoCritico ? 'text-red-500 animate-pulse' :
                    tempoCritico ? 'text-orange-500' : 'text-primary'
                )}>
                  {formatarTempo(cronometro)}
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                  {tempoLimite ? 'Restante' : 'Decorrido'}
                </p>
              </div>

              {/* Mobile grid toggle */}
              <button
                onClick={() => setShowGridMobile(v => !v)}
                className="sm:hidden p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                title="Mapa de questoes"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>

              {/* Finalizar */}
              <button
                onClick={handleFinalizar}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold uppercase tracking-wide transition-all active:scale-95 shadow-lg shadow-red-500/20"
              >
                Finalizar
              </button>
            </div>
          </div>

          {/* Tabs por materia */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            {materias.map((mat, i) => {
              const respondidas = mat.indices.filter(idx => simulado.respostas[idx] != null).length;
              const isActive = abaAtiva === i;
              return (
                <button
                  key={mat.nome}
                  onClick={() => setAbaAtiva(i)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  )}
                >
                  {mat.nome}
                  <span className={cn(
                    "ml-2 text-xs font-mono",
                    isActive ? "text-white/70" : "text-zinc-400 dark:text-zinc-500"
                  )}>
                    {respondidas}/{mat.indices.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        {/* Navigation Grid — Desktop Sidebar */}
        <aside className="hidden sm:block w-48 flex-shrink-0 sticky top-[140px] self-start max-h-[calc(100vh-160px)] overflow-y-auto">
          <NavigationGrid
            indices={currentIndices}
            getStatus={getStatusQuestao}
            onClickBubble={scrollToQuestao}
            totalQuestoes={simulado.questoes.length}
          />

          {/* Quick stats */}
          <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500">Respondidas</span>
              <span className="font-bold text-green-600">{totalRespondidas}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Pendentes</span>
              <span className="font-bold text-zinc-400">{simulado.questoes.length - totalRespondidas}</span>
            </div>
            {totalRevisao > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-500">Revisao</span>
                <span className="font-bold text-yellow-500">{totalRevisao}</span>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile navigation grid overlay */}
        {showGridMobile && (
          <div className="fixed inset-0 z-40 sm:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowGridMobile(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Mapa de Questoes</h3>
                <button onClick={() => setShowGridMobile(false)} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <NavigationGrid
                indices={currentIndices}
                getStatus={getStatusQuestao}
                onClickBubble={scrollToQuestao}
                totalQuestoes={simulado.questoes.length}
              />
            </div>
          </div>
        )}

        {/* Questions list */}
        <div className="flex-1 min-w-0 space-y-8">
          {currentIndices.map((globalIdx) => {
            const questao = simulado.questoes[globalIdx];
            const resposta = simulado.respostas[globalIdx];
            const emRevisao = marcadasRevisao.has(globalIdx);
            // Sequential number within this subject block
            const posInBlock = currentIndices.indexOf(globalIdx);

            return (
              <div
                key={globalIdx}
                ref={(el) => {
                  if (el) questaoRefs.current.set(globalIdx, el);
                }}
                className={cn(
                  "rounded-2xl border p-6 transition-all",
                  emRevisao
                    ? "border-yellow-400/50 bg-yellow-50/50 dark:bg-yellow-900/10"
                    : resposta != null
                      ? "border-green-300/50 bg-green-50/30 dark:bg-green-900/10"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-card"
                )}
              >
                {/* Question header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-black text-zinc-600 dark:text-zinc-300">
                      {globalIdx + 1}
                    </span>
                    {questao.assunto && (
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold">
                        {questao.assunto}
                      </span>
                    )}
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold",
                      questao.dificuldade === 'Facil' || questao.dificuldade === 'Fácil'
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : questao.dificuldade === 'Media' || questao.dificuldade === 'Média'
                          ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400'
                    )}>
                      {questao.dificuldade}
                    </span>
                  </div>

                  {/* Marcar para revisao */}
                  <button
                    onClick={() => toggleRevisao(globalIdx)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      emRevisao
                        ? "bg-yellow-400 text-yellow-900 shadow-md shadow-yellow-400/30"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-yellow-100 hover:text-yellow-700 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400"
                    )}
                  >
                    <svg className="w-4 h-4" fill={emRevisao ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {emRevisao ? 'Em Revisao' : 'Revisar'}
                  </button>
                </div>

                {/* Enunciado */}
                <div
                  className="text-base md:text-lg font-medium text-foreground mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: questao.enunciado }}
                />

                {/* Alternativas */}
                <div className="space-y-2.5">
                  {questao.alternativas.map((alt, altIdx) => {
                    const selecionada = resposta?.selecionada === altIdx;
                    return (
                      <button
                        key={altIdx}
                        onClick={() => onResponder(globalIdx, altIdx)}
                        className={cn(
                          "w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-start gap-3",
                          selecionada
                            ? "border-primary bg-primary/5 dark:bg-primary/15 text-primary dark:text-white shadow-md"
                            : "border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
                        )}
                      >
                        <span className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 transition-all",
                          selecionada
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                        )}>
                          {getLetra(altIdx)}
                        </span>
                        <span
                          className="flex-1 pt-0.5 text-sm md:text-base font-medium leading-normal"
                          dangerouslySetInnerHTML={{ __html: alt }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* End of section */}
          <div className="text-center py-8">
            {abaAtiva < materias.length - 1 ? (
              <button
                onClick={() => setAbaAtiva(abaAtiva + 1)}
                className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
              >
                Ir para {materias[abaAtiva + 1]?.nome} &rarr;
              </button>
            ) : (
              <button
                onClick={handleFinalizar}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black uppercase tracking-wide shadow-xl shadow-green-500/25 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
              >
                Finalizar Prova
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== CONFIRM MODAL ===== */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowConfirmModal(false)} />
          <div className="relative bg-background rounded-3xl p-8 max-w-md w-full shadow-2xl border border-border animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-black mb-4">Finalizar Prova?</h2>
            <p className="text-muted-foreground mb-2">
              Voce ainda tem <span className="font-bold text-red-500">{simulado.respostas.filter(r => r == null).length} questoes</span> sem resposta.
            </p>
            {totalRevisao > 0 && (
              <p className="text-muted-foreground mb-2">
                <span className="font-bold text-yellow-500">{totalRevisao} questoes</span> marcadas para revisao.
              </p>
            )}
            <p className="text-sm text-muted-foreground mb-6">
              Questoes nao respondidas serao consideradas erradas.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
              >
                Continuar Prova
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  onFinalizar();
                }}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== NAVIGATION GRID SUBCOMPONENT ===== */
function NavigationGrid({
  indices,
  getStatus,
  onClickBubble,
  totalQuestoes,
}: {
  indices: number[];
  getStatus: (idx: number) => StatusQuestao;
  onClickBubble: (idx: number) => void;
  totalQuestoes: number;
}) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-1.5">
        {indices.map((globalIdx) => {
          const status = getStatus(globalIdx);
          return (
            <button
              key={globalIdx}
              onClick={() => onClickBubble(globalIdx)}
              title={`Questao ${globalIdx + 1}`}
              className={cn(
                "w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110",
                status === 'respondida' && "bg-green-500 text-white shadow-sm shadow-green-500/30",
                status === 'revisao' && "bg-yellow-400 text-yellow-900 shadow-sm shadow-yellow-400/30 ring-2 ring-yellow-300",
                status === 'pendente' && "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              )}
            >
              {globalIdx + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-zinc-200 dark:bg-zinc-700" /> Pendente
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-green-500" /> Respondida
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-yellow-400" /> Revisao
        </span>
      </div>
    </div>
  );
}
