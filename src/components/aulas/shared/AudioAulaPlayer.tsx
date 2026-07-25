"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  LuHeadphones,
  LuPlay,
  LuPause,
  LuSquare,
  LuLoader,
  LuChevronUp,
  LuChevronDown,
  LuVolume2,
  LuX,
  LuRadio,
  LuSlidersHorizontal,
} from "react-icons/lu";
import { useAudioAula } from "@/hooks/useAudioAula";
import {
  extractModuleText,
  cleanTextForTTS,
  estimateReadingTime,
  type ModuleContentData,
} from "@/lib/audio-aula/text-extractor";

// ── Types ────────────────────────────────────────────────────────────────

export interface AudioAulaPlayerProps {
  materiaId: string;
  aulaId: string;
  aulaTitulo: string;
  moduloNumero: number;
  moduloTitulo: string;
  moduleData?: ModuleContentData;
  plainText?: string;
  variant?: string;
}

// ── Speed Options ────────────────────────────────────────────────────────

const SPEED_OPTIONS = [
  { label: "0.75×", value: 0.75 },
  { label: "1×", value: 1.0 },
  { label: "1.25×", value: 1.25 },
  { label: "1.5×", value: 1.5 },
  { label: "2×", value: 2.0 },
];

// ── Helpers ──────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ── Equalizer Animation Bars ─────────────────────────────────────────────

function EqualizerBars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-3.5 px-1">
      <motion.span
        className="w-[2px] bg-emerald-400 rounded-full"
        animate={{ height: isPlaying ? ["30%", "100%", "50%", "30%"] : "30%" }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
      />
      <motion.span
        className="w-[2px] bg-emerald-400 rounded-full"
        animate={{ height: isPlaying ? ["60%", "30%", "100%", "60%"] : "60%" }}
        transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.1 }}
      />
      <motion.span
        className="w-[2px] bg-emerald-400 rounded-full"
        animate={{ height: isPlaying ? ["100%", "40%", "70%", "100%"] : "40%" }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut", delay: 0.2 }}
      />
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────

export function AudioAulaPlayer({
  materiaId,
  aulaId,
  aulaTitulo,
  moduloNumero,
  moduloTitulo,
  moduleData,
  plainText,
}: AudioAulaPlayerProps) {
  const [showControls, setShowControls] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const audioAula = useAudioAula({
    materiaId,
    aulaId,
    aulaTitulo,
    moduloNumero,
    moduloTitulo,
  });

  const getEffectiveText = useCallback(() => {
    if (plainText) return plainText;
    if (moduleData) return extractModuleText(moduleData);

    if (typeof document !== "undefined") {
      const activeTabEl =
        document.querySelector(`[data-state="active"][role="tabpanel"]`) ||
        document.querySelector(`.space-y-12`);
      if (activeTabEl) {
        const clone = activeTabEl.cloneNode(true) as HTMLElement;
        clone
          .querySelectorAll("button, svg, [role='dialog'], input, script, style")
          .forEach((el) => el.remove());
        const rawText = clone.innerText || clone.textContent || "";
        const cleaned = cleanTextForTTS(rawText);
        if (cleaned.length > 50) return cleaned;
      }
    }

    return `Módulo ${moduloNumero}: ${moduloTitulo} da aula ${aulaTitulo}. Conteúdo didático completo para o concurso Petrobras banca CESGRANRIO.`;
  }, [plainText, moduleData, moduloNumero, moduloTitulo, aulaTitulo]);

  const moduleText = useMemo(() => getEffectiveText(), [getEffectiveText]);

  const estimatedMinutes = useMemo(
    () => estimateReadingTime(moduleText),
    [moduleText]
  );

  const handleGenerate = useCallback(async () => {
    setIsDismissed(false);
    const textToUse = getEffectiveText();
    if (!textToUse) return;
    await audioAula.generateAudio(textToUse);
  }, [getEffectiveText, audioAula]);

  const handlePlayPause = useCallback(() => {
    setIsDismissed(false);
    if (audioAula.status === "idle" || audioAula.status === "error") {
      handleGenerate();
    } else if (audioAula.isReady) {
      audioAula.play();
    } else if (audioAula.isPlaying) {
      audioAula.pause();
    } else if (audioAula.isPaused) {
      audioAula.play();
    }
  }, [audioAula, handleGenerate]);

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      audioAula.seek(Number(e.target.value));
    },
    [audioAula]
  );

  const handleDismissFloating = useCallback(() => {
    audioAula.stop();
    setIsDismissed(true);
    setShowControls(false);
  }, [audioAula]);

  const isAudioActive =
    !isDismissed &&
    (audioAula.isPlaying ||
      audioAula.isPaused ||
      audioAula.isGenerating ||
      audioAula.isReady);

  return (
    <>
      {/* ── 1. CARD INLINE NO TOPO DO MÓDULO ── */}
      <div className="w-full my-4">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl overflow-hidden shadow-xl p-4 sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Botão Play Principal */}
            <button
              onClick={handlePlayPause}
              disabled={audioAula.isGenerating}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-lg group hover:scale-105 disabled:opacity-50"
              style={{
                background: audioAula.isPlaying
                  ? "linear-gradient(135deg, #f59e0b, #d97706)"
                  : "linear-gradient(135deg, #10b981, #059669)",
              }}
            >
              {audioAula.isGenerating ? (
                <LuLoader className="text-white text-xl sm:text-2xl animate-spin" />
              ) : audioAula.isPlaying ? (
                <LuPause className="text-white text-xl sm:text-2xl" />
              ) : (
                <LuPlay className="text-white text-xl sm:text-2xl ml-0.5" />
              )}
            </button>

            {/* Metadados */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <LuRadio className="w-3 h-3 animate-pulse" />
                  Áudio Aula Grátis
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">
                  • {estimatedMinutes} min de estudo
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white mt-1 truncate">
                {audioAula.isGenerating
                  ? "Sintetizando narração em áudio..."
                  : audioAula.isPlaying
                    ? `Reproduzindo: Módulo ${moduloNumero}`
                    : `Ouvir Módulo ${moduloNumero}: ${moduloTitulo}`}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-1">
                {audioAula.isGenerating
                  ? "Gerando voz neural em português..."
                  : audioAula.isPlaying || audioAula.isPaused
                    ? `Progresso: ${formatTime(audioAula.currentTime)} / ${formatTime(audioAula.duration)}`
                    : "Ouça a aula no trânsito ou se exercitando • Voz Neural pt-BR"}
              </p>
            </div>

            {/* Botão de Ação */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                onClick={handlePlayPause}
                disabled={audioAula.isGenerating}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl shadow-md"
              >
                {audioAula.isPlaying ? (
                  <>
                    <LuPause className="mr-1.5" /> Pausar
                  </>
                ) : audioAula.isPaused ? (
                  <>
                    <LuPlay className="mr-1.5" /> Continuar
                  </>
                ) : (
                  <>
                    <LuHeadphones className="mr-1.5 text-sm" /> Ouvir Agora
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progresso de geração */}
          {audioAula.isGenerating && (
            <div className="mt-3">
              <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${audioAula.progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── 2. MINI WIDGET FLUTUANTE COMPACTO (Quadradinho/Pílula no canto) ── */}
      <AnimatePresence>
        {isAudioActive && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-20 right-4 sm:right-6 z-[90] pointer-events-auto flex flex-col items-end gap-2"
          >
            {/* Popover Expandido de Controles Avançados */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="w-72 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-2xl p-4 text-white space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <LuHeadphones className="w-3.5 h-3.5" />
                      Módulo {moduloNumero}
                    </span>
                    <button
                      onClick={() => setShowControls(false)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      <LuChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Range Slider de Busca */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>{formatTime(audioAula.currentTime)}</span>
                      <span>{formatTime(audioAula.duration)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={audioAula.duration || 100}
                      value={audioAula.currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400"
                    />
                  </div>

                  {/* Seletor de Velocidade */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">
                      Velocidade
                    </span>
                    <div className="flex justify-between gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                      {SPEED_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => audioAula.setPlaybackRate(opt.value)}
                          className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            audioAula.playbackRate === opt.value
                              ? "bg-emerald-500 text-black shadow"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botão Parar Áudio */}
                  <div className="pt-1 flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleDismissFloating}
                      className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs h-7"
                    >
                      <LuSquare className="mr-1 w-3 h-3" /> Encerrar Áudio
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Widget Pílula/Quadradinho Flutuante Principal */}
            <div className="bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-2xl p-2.5 flex items-center gap-2 text-white transition-all duration-300 hover:border-emerald-400">
              {/* Botão Play/Pause */}
              <button
                onClick={handlePlayPause}
                disabled={audioAula.isGenerating}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-black flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-transform"
                title={audioAula.isPlaying ? "Pausar" : "Reproduzir"}
              >
                {audioAula.isGenerating ? (
                  <LuLoader className="text-lg animate-spin text-black" />
                ) : audioAula.isPlaying ? (
                  <LuPause className="text-lg text-black" />
                ) : (
                  <LuPlay className="text-lg text-black ml-0.5" />
                )}
              </button>

              {/* Informações Compactas + Equalizador */}
              <div
                onClick={() => setShowControls(!showControls)}
                className="cursor-pointer flex items-center gap-2 pl-1 pr-2 select-none"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">
                      Módulo {moduloNumero}
                    </span>
                    <EqualizerBars isPlaying={audioAula.isPlaying} />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {formatTime(audioAula.currentTime)}
                  </span>
                </div>
              </div>

              {/* Botão para Expandir Controles */}
              <button
                onClick={() => setShowControls(!showControls)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                  showControls
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                }`}
                title="Ajustar velocidade e progresso"
              >
                <LuSlidersHorizontal className="w-3.5 h-3.5" />
              </button>

              {/* Botão Fechar Widget */}
              <button
                onClick={handleDismissFloating}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 flex items-center justify-center text-slate-400 transition"
                title="Fechar"
              >
                <LuX className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
