"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  current?: number;
  total?: number;
  timeRemaining?: number; // em segundos
}

const steps = [
  { label: "Analisando seu desempenho", delay: 0 },
  { label: "Calibrando dificuldade", delay: 600 },
  { label: "Criando questões inéditas...", delay: 1200 },
];

export default function LoadingScreen({
  current,
  total,
  timeRemaining,
}: LoadingScreenProps) {
  const percentage =
    total && total > 0 
      ? Math.min(Math.round(((current || 0) / total) * 100), 100) 
      : 0;

  const [activeStep, setActiveStep] = useState(0);
  const [elapsed, setElapsed] = useState(0); // segundos decorridos

  // Avança etapas com delay
  useEffect(() => {
    const timers = steps.map((step, i) =>
      setTimeout(() => setActiveStep(i), step.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Cronômetro geral (stopwatch)
  useEffect(() => {
    const intervalo = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    if (min > 0) return `${min}m ${sec.toString().padStart(2, "0")}s`;
    return `${sec}s`;
  };

  const isWaiting = timeRemaining !== undefined && timeRemaining > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-[#0a0a0f] transition-colors duration-300">
      {/* Glow background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-white dark:bg-transparent"
        style={{
          boxShadow: "0 0 80px rgba(124, 58, 237, 0.15), 0 0 0 1px rgba(139,92,246,0.15)",
        }}
      >
        <div className="absolute inset-0 dark:bg-[linear-gradient(145deg,#12121a,#1a1a2e)] pointer-events-none" />

        {/* Top gradient bar */}
        <div className="relative h-1 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-fuchsia-500" />

        <div className="relative p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="relative flex items-center justify-center w-20 h-20 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #5b21b6, #4338ca)",
                boxShadow: "0 0 40px rgba(124, 58, 237, 0.5)",
              }}
            >
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-violet-400/30 animate-ping" />
              <span className="text-3xl">🤖</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-1">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              {isWaiting ? "Aguardando IA..." : "IA Gerando Questões"}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              {isWaiting
                ? "O provedor atingiu o limite de chamadas. Retomando em instantes."
                : "Criando questões no padrão CESGRANRIO personalizadas para você"}
            </p>

            {/* Stopwatch */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
              <svg className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-300 tabular-nums">
                {formatTime(elapsed)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />

          {/* Progress bar */}
          {total && total > 0 ? (
            <div className="mb-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                  Progresso
                </span>
                <span className="text-xs font-black text-zinc-900 dark:text-white tabular-nums">
                  {current ?? 0} / {total}
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                      background: "linear-gradient(90deg, #7c3aed, #6366f1, #a855f7)",
                      boxShadow: "0 0 12px rgba(139,92,246,0.6)",
                    }}
                  />
                </div>
              </div>
              <p className="text-center text-[10px] font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.2em]">
                {percentage}% concluído
              </p>
            </div>
          ) : null}

          {/* Rate limit countdown */}
          {isWaiting && (
            <div
              className="mb-5 p-4 rounded-xl text-center border"
              style={{
                background: "rgba(251, 146, 60, 0.05)",
                borderColor: "rgba(251, 146, 60, 0.2)",
              }}
            >
              <p className="text-[10px] text-amber-600 dark:text-amber-400/70 uppercase tracking-widest font-bold mb-1">
                Retomando em
              </p>
              <p
                className="text-4xl font-black tabular-nums"
                style={{ color: "#fb923c", textShadow: "0 0 20px rgba(251,146,60,0.4)" }}
              >
                {formatTime(timeRemaining!)}
              </p>
              <p className="text-[10px] text-amber-600/70 dark:text-amber-400/50 mt-1">
                Limite do provedor gratuito
              </p>
            </div>
          )}

          {/* Steps */}
          <div className="space-y-2.5">
            {steps.map((step, i) => {
              const isDone = i < activeStep;
              const isActive = i === activeStep;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {isDone ? (
                      <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : isActive ? (
                      <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800" />
                    )}
                  </div>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      isDone
                        ? "text-emerald-600 dark:text-emerald-400 font-medium line-through opacity-50"
                        : isActive
                          ? "text-zinc-900 dark:text-white font-semibold"
                          : "text-zinc-500 dark:text-zinc-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
