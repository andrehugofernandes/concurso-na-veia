/**
 * Audio Aula — Edge TTS Wrapper
 *
 * Usa o pacote msedge-tts para gerar áudio narrado em pt-BR
 * com vozes neurais gratuitas da Microsoft.
 *
 * Vozes disponíveis para pt-BR:
 * - pt-BR-FranciscaNeural (feminina, clara, didática) ← padrão
 * - pt-BR-AntonioNeural (masculino, autoritário, professoral)
 * - pt-BR-ThalitaNeural (feminina, jovem, dinâmica)
 */

import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { chunkText } from "./text-extractor";

// ── Types ────────────────────────────────────────────────────────────────

export interface EdgeTTSOptions {
  voice?: string;
  rate?: string;    // Ex: "+0%", "+10%", "-10%"
  pitch?: string;   // Ex: "+0Hz", "+5Hz"
  volume?: string;  // Ex: "+0%"
}

export interface EdgeTTSResult {
  audioBuffer: Buffer;
  mimeType: string;
  durationEstimate: number; // Duração estimada em segundos
}

// ── Constants ────────────────────────────────────────────────────────────

export const VOICES = {
  francisca: "pt-BR-FranciscaNeural",
  antonio: "pt-BR-AntonioNeural",
  thalita: "pt-BR-ThalitaNeural",
} as const;

const DEFAULT_VOICE = VOICES.francisca;
const MAX_CHARS_PER_REQUEST = 3000;
const MAX_RETRIES = 2;

// ── Helpers ──────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Main Function ────────────────────────────────────────────────────────

/**
 * Gera áudio MP3 a partir de texto usando Microsoft Edge TTS.
 * Divide textos longos em chunks e concatena os buffers.
 *
 * IMPORTANTE: O texto DEVE ser pré-processado por cleanTextForTTS()
 * que inclui escape XML (&amp; &lt; &gt;) obrigatório para evitar
 * quebrar o SSML gerado internamente pela biblioteca msedge-tts.
 */
export async function generateAudioFromText(
  text: string,
  options: EdgeTTSOptions = {}
): Promise<EdgeTTSResult> {
  const voice = options.voice || DEFAULT_VOICE;
  const rate = options.rate || "+0%";
  const pitch = options.pitch || "+0Hz";
  const volume = options.volume || "+0%";
  const streamOpts = { rate, pitch, volume };

  console.log(`[Edge-TTS] 🎙️ Iniciando geração de áudio com voz: ${voice}`);
  console.log(`[Edge-TTS] 📏 Tamanho do texto: ${text.length} caracteres`);

  // Divide em chunks se o texto for muito longo
  const chunks = chunkText(text, MAX_CHARS_PER_REQUEST);
  console.log(`[Edge-TTS] 📦 Dividido em ${chunks.length} chunk(s)`);

  const audioBuffers: Buffer[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`[Edge-TTS] 🔊 Processando chunk ${i + 1}/${chunks.length} (${chunk.length} chars)`);

    let success = false;

    for (let attempt = 1; attempt <= MAX_RETRIES && !success; attempt++) {
      try {
        // Pequeno delay entre chunks (não no primeiro)
        if (i > 0 || attempt > 1) {
          const waitMs = attempt > 1 ? 2000 * attempt : 500;
          await delay(waitMs);
        }

        const tts = new MsEdgeTTS();
        await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

        const result = tts.toStream(chunk, streamOpts);
        const stream = result.audioStream;
        const bufferChunks: Buffer[] = [];

        await new Promise<void>((resolve, reject) => {
          stream.on("data", (data: Buffer) => {
            bufferChunks.push(data);
          });
          stream.on("end", () => resolve());
          stream.on("error", (err: Error) => reject(err));
        });

        const chunkBuffer = Buffer.concat(bufferChunks);
        if (chunkBuffer.length > 0) {
          audioBuffers.push(chunkBuffer);
          console.log(`[Edge-TTS] ✅ Chunk ${i + 1} processado: ${chunkBuffer.length} bytes (Tentativa ${attempt})`);
          success = true;
        } else {
          console.warn(`[Edge-TTS] ⚠️ Chunk ${i + 1} retornou vazio (Tentativa ${attempt}/${MAX_RETRIES})`);
        }
      } catch (error: any) {
        console.warn(`[Edge-TTS] ⚠️ Erro no chunk ${i + 1} (Tentativa ${attempt}/${MAX_RETRIES}):`, error.message);
        if (attempt >= MAX_RETRIES) {
          throw new Error(`Falha ao gerar áudio no chunk ${i + 1} após ${MAX_RETRIES} tentativas: ${error.message}`);
        }
      }
    }
  }

  if (audioBuffers.length === 0) {
    throw new Error("Nenhum áudio foi gerado");
  }

  const finalBuffer = Buffer.concat(audioBuffers);
  const wordsCount = text.split(/\s+/).filter(w => w.length > 0).length;
  const durationEstimate = Math.ceil(wordsCount / 2.5);

  console.log(`[Edge-TTS] 🏁 Áudio final: ${finalBuffer.length} bytes (~${durationEstimate}s estimados)`);

  return {
    audioBuffer: finalBuffer,
    mimeType: "audio/mpeg",
    durationEstimate,
  };
}

/**
 * Lista as vozes pt-BR disponíveis.
 */
export async function listBrazilianVoices() {
  try {
    const tts = new MsEdgeTTS();
    const voices = await tts.getVoices();
    return voices.filter((v: any) => v.Locale === "pt-BR");
  } catch (error: any) {
    console.error("[Edge-TTS] Erro ao listar vozes:", error.message);
    return [];
  }
}
