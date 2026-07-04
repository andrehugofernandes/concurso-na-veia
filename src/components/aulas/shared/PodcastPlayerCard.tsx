"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  LuMic, 
  LuLoader, 
  LuPlay, 
  LuPause, 
  LuDownload, 
  LuFileText, 
  LuChevronDown, 
  LuChevronUp,
  LuSparkles,
  LuInfo
} from "react-icons/lu";

export interface PodcastPlayerCardProps {
  aulaId: string;
  aulaTitulo: string;
  materia: string;
  materiaId: string;
  moduloNumero: number;
  moduloTitulo: string;
  conteudoResumo?: string;
}

/**
 * Converte PCM cru (16-bit, mono, 24kHz) retornado do Gemini TTS em um Blob com cabeçalho RIFF/WAV válido.
 */
function createWavBlobFromPcm(pcmBytes: Uint8Array, sampleRate = 24000): Blob {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBytes.length;
  const chunkSize = 36 + dataSize;

  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF chunk descriptor
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, chunkSize, true);
  view.setUint32(8, 0x57415645, false); // "WAVE"

  // fmt sub-chunk
  view.setUint32(12, 0x666d7420, false); // "fmt "
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // 1 = PCM linear
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data sub-chunk
  view.setUint32(36, 0x64617461, false); // "data"
  view.setUint32(40, dataSize, true);

  const wavBytes = new Uint8Array(44 + pcmBytes.length);
  wavBytes.set(new Uint8Array(header), 0);
  wavBytes.set(pcmBytes, 44);

  return new Blob([wavBytes], { type: "audio/wav" });
}

export function PodcastPlayerCard({
  aulaId,
  aulaTitulo,
  materia,
  materiaId,
  moduloNumero,
  moduloTitulo,
  conteudoResumo,
}: PodcastPlayerCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [script, setScript] = useState<any | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Estados para a barra de progresso
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Limpa Blob URLs ao desmontar o componente para evitar vazamento de memória
  useEffect(() => {
    return () => {
      playlist.forEach(url => {
        if (url && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [playlist]);

  // Força o recarregamento do áudio quando audioUrl mudar
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      console.log("[PodcastClient] Novo audioUrl definido. Executando audio.load(). URL:", audioUrl.substring(0, 50) + "...");
      audioRef.current.load();
      if (isPlayingRef.current) {
        audioRef.current.play().catch(e => console.error("[PodcastClient] Erro no autoplay:", e));
      }
    }
  }, [audioUrl]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setGenerationProgress(5);
    setGenerationStep("Analisando o conteúdo da aula...");
    console.log(`[PodcastClient] 🎙️ Iniciando geração do podcast: ${aulaTitulo} - ${moduloTitulo} (${materia})`);

    // Simulador de progresso enquanto aguarda a API
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 95) return 95; // Trava no 95% até a API responder
        
        // Atualiza a mensagem baseado no progresso
        if (prev === 25) setGenerationStep("Criando roteiro da entrevista...");
        if (prev === 50) setGenerationStep("Sintetizando vozes com IA...");
        if (prev === 75) setGenerationStep("Empacotando áudio final...");
        
        return prev + 2;
      });
    }, 500);

    try {
      const defaultResumo = `Resumo didático e tático do ${moduloTitulo} da aula ${aulaTitulo} na matéria de ${materia}, focado nas pegadinhas da banca CESGRANRIO para o concurso Petrobras.`;

      const payload = {
        aulaId: aulaId || "aula",
        aulaTitulo: aulaTitulo || "Aula",
        materia: materia || "Conhecimentos Gerais",
        materiaId: materiaId || "geral",
        moduloNumero: moduloNumero || 1,
        moduloTitulo: moduloTitulo || "Módulo 1",
        conteudoResumo: conteudoResumo && conteudoResumo.length >= 50 ? conteudoResumo : defaultResumo,
      };

      console.log("[PodcastClient] 📡 Enviando requisição para /api/podcast/generate:", payload);

      const response = await fetch("/api/podcast/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log(`[PodcastClient] 📩 Resposta da API recebida (Status ${response.status})`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Erro HTTP ${response.status} na API de Podcast`);
      }

      console.log("[PodcastClient] ✅ Payload retornado pela API:", {
        success: data.success,
        temScript: !!data.script,
        temAudioBase64: !!data.audioBase64,
        audioMimeType: data.audioMimeType,
        tamanhoBase64: data.audioBase64 ? data.audioBase64.length : 0,
        error: data.error
      });

      if (data.script) {
        setScript(data.script);
      }

      if (data.audioBase64) {
        try {
          console.log("[PodcastClient] 🔄 Decodificando áudio base64...");
          const cleanedBase64 = data.audioBase64.replace(/\s/g, "");
          const binaryString = atob(cleanedBase64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const mimeType = data.audioMimeType || "audio/mp3";
          let blob: Blob;

          // Se for PCM/L16 cru, envolvemos no cabeçalho RIFF/WAV para o navegador aceitar
          if (mimeType.includes("pcm") || mimeType.includes("L16")) {
            console.log("[PodcastClient] 🎧 Áudio PCM/L16 detectado. Empacotando em RIFF/WAV 24kHz...");
            blob = createWavBlobFromPcm(bytes, 24000);
          } else {
            blob = new Blob([bytes], { type: mimeType });
          }

          const blobUrl = URL.createObjectURL(blob);
          console.log(`[PodcastClient] 🎉 Blob URL criado com sucesso (${blob.size} bytes, mime: ${blob.type}):`, blobUrl);
          
          const tracks = ["/podcasts/jingles/intro.mp3", blobUrl, "/podcasts/jingles/outro.mp3"];
          setPlaylist(tracks);
          setCurrentTrackIndex(0);
          setAudioUrl(tracks[0]);
        } catch (blobError: any) {
          console.error("[PodcastClient] ❌ Erro ao converter base64 para Blob:", blobError);
          console.warn("[PodcastClient] ⚠️ Utilizando jingle de fallback intro.mp3");
          const fallback = ["/podcasts/jingles/intro.mp3"];
          setPlaylist(fallback);
          setCurrentTrackIndex(0);
          setAudioUrl(fallback[0]);
        }
      } else {
        console.warn("[PodcastClient] ⚠️ Nenhum áudio base64 retornado. Utilizando jingle de fallback intro.mp3");
        const fallback = ["/podcasts/jingles/intro.mp3"];
        setPlaylist(fallback);
        setCurrentTrackIndex(0);
        setAudioUrl(fallback[0]);
      }
    } catch (e: any) {
      console.error("[PodcastClient] ❌ Erro na geração do podcast:", e);
      setErrorMsg(e.message || "Falha na comunicação com a IA");
      setAudioUrl("/podcasts/jingles/intro.mp3");
      setScript({
        titulo: `Entrevista Especial - ${moduloTitulo}`,
        descricao: `Resumo em entrevista sobre os pontos chave de ${aulaTitulo}`,
        transcricaoCompleta: `[Ana Carolina]: Olá! Seja muito bem-vindo ao podcast do Módulo ${moduloNumero}. Hoje estamos recebendo o nosso professor virtual especialista em ${materia}.\n\n[Professor]: Olá Ana Carolina! É um prazer estar aqui. Para a prova da CESGRANRIO, a grande chave deste módulo é focar na aplicação prática dos conceitos centrais!`
      });
    } finally {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setGenerationStep("Concluído!");
      
      // Delay pequeno antes de esconder a barra para dar o efeito visual de "completado"
      setTimeout(() => {
        setIsGenerating(false);
        console.log("[PodcastClient] 🏁 Finalizada tentativa de criação do podcast.");
      }, 500);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      console.warn("[PodcastClient] ⚠️ Elemento de áudio não encontrado no DOM");
      return;
    }

    if (isPlaying) {
      console.log("[PodcastClient] ⏸️ Pausando áudio...");
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      console.log("[PodcastClient] ▶️ Iniciando reprodução do áudio...");
      audioRef.current
        .play()
        .then(() => {
          console.log("[PodcastClient] 🎶 Reprodução iniciada com sucesso.");
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("[PodcastClient] ❌ Erro ao chamar audio.play():", err);
          setIsPlaying(false);
          if (audioUrl !== "/podcasts/jingles/intro.mp3") {
            console.warn("[PodcastClient] 🔄 Tentando reproduzir jingle de fallback intro.mp3...");
            setAudioUrl("/podcasts/jingles/intro.mp3");
          }
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/90 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-slate-900/80 border border-indigo-200/80 dark:border-indigo-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Ícone de Destaque */}
        <div className="h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-500/40 shadow-inner">
          <LuMic className="w-9 h-9 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        
        {/* Informações */}
        <div className="flex-1 text-center md:text-left w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
            Podcast Gerado por IA
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            {aulaTitulo} - {moduloTitulo}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">
            Um resumo em áudio exclusivo no formato de entrevista virtual, cobrindo os conceitos essenciais de <strong>{materia}</strong> focados na banca CESGRANRIO.
          </p>
          
          {/* Botão de Geração ou Player Customizado */}
          {!audioUrl ? (
            <div className="flex flex-col items-center md:items-start gap-4">
              {!isGenerating ? (
                <>
                  <Button 
                    onClick={handleGenerate} 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <LuSparkles className="w-5 h-5 mr-2 text-amber-300 animate-pulse" />
                    Gerar Podcast do Módulo
                  </Button>
                  {errorMsg && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                      <LuInfo className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full max-w-md bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-emerald-500/20 shadow-sm space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-100 dark:bg-emerald-900/30">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      <LuLoader className="w-4 h-4 animate-spin" />
                      {generationStep}
                    </div>
                    <span className="text-xs font-bold text-emerald-600/70 dark:text-emerald-500/70">
                      {generationProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out relative"
                      style={{ width: `${generationProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 w-full">
              {/* Elemento de Áudio Oculto com Handlers de Erro */}
              <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  console.log("[PodcastClient] 🏁 Faixa finalizada.");
                  if (playlist.length > 0 && currentTrackIndex < playlist.length - 1) {
                    const nextIndex = currentTrackIndex + 1;
                    console.log(`[PodcastClient] ⏭️ Passando para a próxima faixa: ${nextIndex}`);
                    setCurrentTrackIndex(nextIndex);
                    setAudioUrl(playlist[nextIndex]);
                  } else {
                    console.log("[PodcastClient] 🏁 Playlist finalizada.");
                    setIsPlaying(false);
                    if (playlist.length > 0) {
                      setCurrentTrackIndex(0);
                      setAudioUrl(playlist[0]);
                    }
                  }
                }}
                onCanPlayThrough={() => {
                  console.log("[PodcastClient] 🟢 Áudio pronto para ser tocado (onCanPlayThrough)");
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  const err = target.error;
                  console.error("[PodcastClient] ❌ Erro no elemento <audio>:", err ? { code: err.code, message: err.message } : e);
                  if (audioUrl !== "/podcasts/jingles/intro.mp3") {
                    console.warn("[PodcastClient] 🔄 Ativando fallback para /podcasts/jingles/intro.mp3 devido a erro no elemento de áudio");
                    setAudioUrl("/podcasts/jingles/intro.mp3");
                  }
                }}
              />

              {/* Player Customizado de Alto Nível */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm w-full">
                {/* Botão Play/Pause Principal */}
                <Button
                  onClick={togglePlay}
                  size="icon"
                  className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shrink-0 transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <LuPause className="w-6 h-6" />
                  ) : (
                    <LuPlay className="w-6 h-6 ml-0.5" />
                  )}
                </Button>

                {/* Barra de Progresso e Tempos */}
                <div className="flex-1 w-full space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                {/* Ações adicionais */}
                <div className="flex items-center gap-2 shrink-0">
                  {script?.transcricaoCompleta && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs gap-1.5"
                    >
                      <LuFileText className="w-3.5 h-3.5 text-indigo-500" />
                      {showTranscript ? "Ocultar Texto" : "Ler Roteiro"}
                      {showTranscript ? <LuChevronUp className="w-3 h-3" /> : <LuChevronDown className="w-3 h-3" />}
                    </Button>
                  )}

                  <a href={(playlist.length > 1 ? playlist[1] : audioUrl) || "#"} download={`podcast-${aulaId}-modulo-${moduloNumero}.wav`}>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                      title="Baixar Áudio WAV"
                    >
                      <LuDownload className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Roteiro / Transcrição da Entrevista */}
              {showTranscript && script?.transcricaoCompleta && (
                <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-sm space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <LuFileText className="w-4 h-4" />
                    Transcrição da Entrevista Virtual
                  </div>
                  <div className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-h-60 overflow-y-auto pr-2">
                    {script.transcricaoCompleta}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
