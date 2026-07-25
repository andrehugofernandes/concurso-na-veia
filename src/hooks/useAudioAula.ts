"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { ModuleContentData } from "@/lib/audio-aula/text-extractor";

// ── Types ────────────────────────────────────────────────────────────────

export type AudioAulaStatus =
  | "idle"
  | "extracting"
  | "generating"
  | "ready"
  | "playing"
  | "paused"
  | "error";

export interface AudioAulaState {
  status: AudioAulaStatus;
  progress: number; // 0-100 para geração
  currentTime: number;
  duration: number;
  playbackRate: number;
  error: string | null;
  audioUrl: string | null;
}

export interface UseAudioAulaOptions {
  materiaId: string;
  aulaId: string;
  aulaTitulo: string;
  moduloNumero: number;
  moduloTitulo: string;
}

// ── Extração de texto de módulo via DOM ──────────────────────────────────

/**
 * Extrai texto de um módulo diretamente usando dados estruturados.
 * Essa abordagem evita acesso ao DOM e funciona server-side.
 */
function buildModuleTextFromData(data: ModuleContentData): string {
  // Importação dinâmica para evitar circular dependency
  const { extractModuleText } = require("@/lib/audio-aula/text-extractor");
  return extractModuleText(data);
}

// ── Hook Principal ──────────────────────────────────────────────────────

export function useAudioAula(options: UseAudioAulaOptions) {
  const { materiaId, aulaId, aulaTitulo, moduloNumero, moduloTitulo } = options;

  const [state, setState] = useState<AudioAulaState>({
    status: "idle",
    progress: 0,
    currentTime: 0,
    duration: 0,
    playbackRate: 1,
    error: null,
    audioUrl: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      // Revoke blob URLs
      if (state.audioUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(state.audioUrl);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Verifica cache ao montar
  useEffect(() => {
    const checkCache = async () => {
      try {
        const res = await fetch("/api/audio-aula/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            materiaId,
            aulaId,
            moduloNumero,
            moduloTitulo,
            aulaTitulo,
            checkOnly: true,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.exists && data.audioUrl) {
            setState((prev) => ({
              ...prev,
              status: "ready",
              audioUrl: data.audioUrl,
            }));
          }
        }
      } catch {
        // Silently fail cache check
      }
    };

    checkCache();
  }, [materiaId, aulaId, moduloNumero, moduloTitulo, aulaTitulo]);

  // ── Gerar áudio ────────────────────────────────────────────────────────

  const generateAudio = useCallback(
    async (moduleTextContent: string) => {
      if (!moduleTextContent || moduleTextContent.length < 50) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: "Conteúdo do módulo muito curto para gerar áudio.",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        status: "generating",
        progress: 10,
        error: null,
      }));

      // Progress simulation
      const progressInterval = setInterval(() => {
        setState((prev) => {
          if (prev.progress >= 90) return prev;
          const step = prev.progress < 50 ? 5 : 3;
          return { ...prev, progress: prev.progress + step };
        });
      }, 800);

      try {
        const res = await fetch("/api/audio-aula/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            materiaId,
            aulaId,
            moduloNumero,
            moduloTitulo,
            aulaTitulo,
            conteudoTexto: moduleTextContent,
          }),
        });

        clearInterval(progressInterval);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));

          if (res.status === 403) {
            setState((prev) => ({
              ...prev,
              status: "error",
              progress: 0,
              error: "UPGRADE_REQUIRED",
            }));
            return;
          }

          throw new Error(
            errData.error || `Erro ${res.status} na geração do áudio`
          );
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Falha na geração do áudio");
        }

        let audioUrl: string;

        if (data.audioBase64) {
          // Áudio novo — converter base64 para blob URL
          const binaryString = atob(data.audioBase64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], {
            type: data.audioMimeType || "audio/mpeg",
          });
          audioUrl = URL.createObjectURL(blob);
        } else if (data.audioUrl) {
          // Áudio do cache
          audioUrl = data.audioUrl;
        } else {
          throw new Error("Nenhum áudio retornado pela API");
        }

        const finalUrl = audioUrl;
        setState((prev) => ({
          ...prev,
          status: "ready",
          progress: 100,
          audioUrl: finalUrl,
        }));

        // Tenta iniciar a reprodução automaticamente sem fechar o widget
        if (typeof window !== "undefined") {
          setTimeout(() => {
            playAudio(finalUrl);
          }, 150);
        }
      } catch (err: any) {
        clearInterval(progressInterval);
        setState((prev) => ({
          ...prev,
          status: "error",
          progress: 0,
          error: err.message,
        }));
      }
    },
    [materiaId, aulaId, moduloNumero, moduloTitulo, aulaTitulo]
  );

  // ── Controles de playback ──────────────────────────────────────────────

  const playAudio = useCallback((urlOverride?: string) => {
    const targetUrl = urlOverride || state.audioUrl;
    if (!targetUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(targetUrl);
      audioRef.current.playbackRate = state.playbackRate;

      audioRef.current.addEventListener("loadedmetadata", () => {
        setState((prev) => ({
          ...prev,
          duration: audioRef.current?.duration || 0,
        }));
      });

      audioRef.current.addEventListener("ended", () => {
        setState((prev) => ({
          ...prev,
          status: "ready",
          currentTime: 0,
        }));
        if (intervalRef.current) clearInterval(intervalRef.current);
      });

      audioRef.current.addEventListener("error", (e) => {
        console.warn("[AudioAula] Audio element error:", e);
      });
    } else {
      audioRef.current.src = targetUrl;
    }

    audioRef.current.playbackRate = state.playbackRate;

    audioRef.current.play().then(() => {
      setState((prev) => ({ ...prev, status: "playing", audioUrl: targetUrl }));

      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setState((prev) => ({
            ...prev,
            currentTime: audioRef.current?.currentTime || 0,
            duration: audioRef.current?.duration || prev.duration,
          }));
        }
      }, 250);
    }).catch((err) => {
      console.warn("[AudioAula] Autoplay notice:", err);
      // Mantém o estado como 'ready' e o widget ativado para o usuário tocar Play
      setState((prev) => ({
        ...prev,
        status: "ready",
        audioUrl: targetUrl,
      }));
    });
  }, [state.audioUrl, state.playbackRate]);

  const play = useCallback(() => {
    playAudio();
  }, [playAudio]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState((prev) => ({ ...prev, status: "paused" }));
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.status === "playing") {
      pause();
    } else if (state.status === "paused" || state.status === "ready") {
      play();
    }
  }, [state.status, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((prev) => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setState((prev) => ({ ...prev, playbackRate: rate }));
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState((prev) => ({
      ...prev,
      status: state.audioUrl ? "ready" : "idle",
      currentTime: 0,
    }));
  }, [state.audioUrl]);

  // ── Fallback: Web Speech API ───────────────────────────────────────────

  const speakWithWebSpeech = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: "Speech synthesis não suportado neste navegador",
        }));
        return;
      }

      window.speechSynthesis.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = state.playbackRate;

      // Try to find a pt-BR voice
      const voices = window.speechSynthesis.getVoices();
      const ptBRVoice = voices.find(
        (v) => v.lang === "pt-BR" || v.lang.startsWith("pt")
      );
      if (ptBRVoice) utterance.voice = ptBRVoice;

      utterance.onstart = () => {
        setState((prev) => ({ ...prev, status: "playing" }));
      };

      utterance.onend = () => {
        setState((prev) => ({ ...prev, status: "ready" }));
      };

      utterance.onerror = () => {
        setState((prev) => ({
          ...prev,
          status: "error",
          error: "Erro na síntese de voz do navegador",
        }));
      };

      window.speechSynthesis.speak(utterance);
    },
    [state.playbackRate]
  );

  const stopWebSpeech = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setState((prev) => ({ ...prev, status: "idle" }));
    }
  }, []);

  return {
    ...state,
    generateAudio,
    play,
    pause,
    togglePlayPause,
    seek,
    setPlaybackRate,
    stop,
    speakWithWebSpeech,
    stopWebSpeech,
    isReady: state.status === "ready",
    isPlaying: state.status === "playing",
    isPaused: state.status === "paused",
    isGenerating: state.status === "generating",
    isError: state.status === "error",
    needsUpgrade: state.error === "UPGRADE_REQUIRED",
  };
}
