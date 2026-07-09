/**
 * Podcast Generator — Core Logic
 *
 * Gera podcasts educacionais em formato de entrevista usando Gemini API:
 * 1. Gera o script (roteiro) do podcast via Gemini Text
 * 2. Sintetiza o áudio via Gemini TTS (multi-speaker)
 * 3. Retorna o áudio + transcrição
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// ── Types ────────────────────────────────────────────────────────────────

export interface PodcastModuleInput {
  aulaId: string;
  aulaTitulo: string;
  materia: string;
  moduloNumero: number;
  moduloTitulo: string;
  conteudoResumo: string; // Texto-base do conteúdo do módulo
  professorNome: string; // Ex: "Prof. Bhaskara"
  professorInspiracao: string; // Ex: "Bhaskara II, matemático indiano"
}

export interface PodcastScript {
  titulo: string;
  descricao: string;
  professorNome: string;
  apresentadoraNome: string;
  segmentos: PodcastSegmento[];
  duracaoEstimada: string;
  transcricaoCompleta: string;
}

export interface PodcastSegmento {
  speaker: "apresentadora" | "professor";
  texto: string;
  estilo?: string; // Ex: "entusiasmado", "calmo", "explicativo"
}

export interface PodcastResult {
  script: PodcastScript;
  audioBase64?: string;
  audioMimeType?: string;
  error?: string;
}

// ── Constants ────────────────────────────────────────────────────────────

const APRESENTADORA_NOME = "Ana Carolina";

/** Vozes Gemini TTS — mitológicas/astronômicas */
const VOZES = {
  apresentadora: "Aoede", // Relaxed, natural female voice
  professor: "Puck", // Puck costuma ser mais estável no timbre que o Charon
} as const;

/** Vozes OpenAI/FreeLLM */
const VOZES_FREE = {
  apresentadora: "nova", // Voz feminina clara e estável
  professor: "onyx", // Voz masculina grave, extremamente constante
} as const;

// ── Script Generator ─────────────────────────────────────────────────────

/**
 * Gera o roteiro do podcast via Gemini Text (gemini-2.5-flash).
 * O roteiro é uma entrevista entre a apresentadora e o professor virtual.
 */
export async function generatePodcastScript(
  input: PodcastModuleInput,
): Promise<PodcastScript> {
  const prompt = `Você é um roteirista de podcast educacional premium especializado em preparação para concursos da Petrobras (banca CESGRANRIO).

CONTEXTO DO MÓDULO:
- Aula: "${input.aulaTitulo}"
- Módulo ${input.moduloNumero}: "${input.moduloTitulo}"
- Matéria: ${input.materia}
- Conteúdo-chave para resumir:
"""
${input.conteudoResumo}
"""

PERSONAGENS:
- APRESENTADORA (${APRESENTADORA_NOME}): Jornalista educacional brasileira, curiosa, empática. Faz perguntas inteligentes que um aluno de concurso faria. Tom acessível e motivacional.
- PROFESSOR (${input.professorNome}): Especialista renomado na área, nomeado em homenagem a ${input.professorInspiracao}. Explica com clareza e profundidade, usa analogias do cotidiano brasileiro e sempre dá dicas práticas para a prova CESGRANRIO. Fala com autoridade mas sem arrogância.

FORMATO DO PODCAST:
- Duração alvo: 2-3 minutos de fala (~400-600 palavras totais)
- O roteiro DEVE conter no mínimo 6 a 8 segmentos de fala para cobrir adequadamente o assunto.
- Estrutura OBRIGATÓRIA:
  1. ABERTURA (~30s): ${APRESENTADORA_NOME} dá as boas-vindas, apresenta o tema e o professor
  2. BLOCO 1 (~40s): Conceito fundamental — o que é, por que importa
  3. BLOCO 2 (~40s): Aprofundamento técnico — como funciona, detalhes relevantes
  4. BLOCO 3 (~30s): Conexão com a realidade — exemplo prático, relação com a Petrobras
  5. DICA DE PROVA (~20s): Professor dá um macete de memorização ou alerta de "pegadinha" CESGRANRIO
  6. FECHAMENTO (~15s): ${APRESENTADORA_NOME} agradece e convida para o próximo módulo

RESTRIÇÕES:
- Linguagem: Português brasileiro, acessível mas tecnicamente precisa
- O professor deve citar que o conhecimento é de domínio público e universal
- Incluir PELO MENOS 1 macete de memorização ou frase mnemônica
- Tom: Educativo, envolvente, motivacional — como um podcast real de estudo
- PROIBIDO: Gírias excessivas, humor forçado, autopromoção, referências a redes sociais
- Cada fala deve ter entre 2 a 5 frases completas e ricas.

Retorne APENAS um JSON válido com esta estrutura:
{
  "titulo": "Título curto do episódio",
  "descricao": "Uma frase descritiva do episódio",
  "professorNome": "${input.professorNome}",
  "apresentadoraNome": "${APRESENTADORA_NOME}",
  "segmentos": [
    { "speaker": "apresentadora", "texto": "Olá! Seja muito bem-vindo...", "estilo": "acolhedor" },
    { "speaker": "professor", "texto": "Olá! É um prazer estar aqui. Hoje vamos falar sobre...", "estilo": "explicativo" },
    { "speaker": "apresentadora", "texto": "Isso é muito interessante. E como funciona na prática?", "estilo": "curioso" },
    { "speaker": "professor", "texto": "Na prática, isso significa que...", "estilo": "explicativo" },
    { "speaker": "apresentadora", "texto": "Entendi! Pode dar um exemplo focando na banca CESGRANRIO?", "estilo": "curioso" },
    { "speaker": "professor", "texto": "Com certeza! A CESGRANRIO costuma cobrar...", "estilo": "explicativo" }
  ],
  "duracaoEstimada": "2:30",
  "transcricaoCompleta": "Texto corrido completo de toda a conversa, com marcações [Ana Carolina] e [Prof. Nome] antes de cada fala"
}`;

  let text = "";

  // 1. Gemini nativo (SDK) - Prioridade total já que o limite pago está ativo
  if (process.env.GEMINI_API_KEY) {
    try {
      console.log("[Podcast-Script] Gerando roteiro via Gemini nativo (API Premium)...");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });
      const result = await model.generateContent(prompt);
      text = result.response.text();
      console.log("[Podcast-Script] ✅ Sucesso via Gemini!");
    } catch (e: any) {
      console.warn(`[Podcast-Script] Erro no Gemini nativo: ${e.message}`);
    }
  }

  if (!text) {
    throw new Error("Nenhum provedor de IA conseguiu gerar o roteiro. Verifique suas API keys no .env.local.");
  }

  try {
    let cleanText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }
    const data = JSON.parse(cleanText) as PodcastScript;
    return data;
  } catch (error: any) {
    try {
      // Robust fallback for LLMs that include unescaped raw control characters or newlines
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        const fixed = match[0]
          .replace(/(?<=": "[^"]*)\n(?=[^"]*")/g, "\\n")
          .replace(/[\u0000-\u001F]+/g, (m) => (m === "\n" || m === "\r" ? " " : ""));
        return JSON.parse(fixed) as PodcastScript;
      }
    } catch (_) {}
    console.error("[Podcast] Erro ao parsear script JSON:", text.substring(0, 300));
    throw new Error(`Falha ao gerar script do podcast: ${error.message}`);
  }
}

// ── TTS Synthesizer ──────────────────────────────────────────────────────

/**
 * Sintetiza um segmento de texto em áudio via Gemini TTS.
 * Retorna o áudio em base64.
 */
export async function synthesizeSegment(
  texto: string,
  speaker: "apresentadora" | "professor",
  maxRetries = 2
): Promise<{ audioBase64: string; mimeType: string; error?: string } | null> {
  // Omitido: Free LLM TTS foi removido para focar direto no Gemini TTS, mais rápido e com cota premium

  // 2. Fallback para Gemini TTS
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY não configurada para o TTS");

  const voiceName = VOZES[speaker];
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[Podcast-TTS] Tentativa ${attempt + 1}/${maxRetries + 1} no Gemini (Aguardando 12s para evitar Rate Limit)...`);
        await new Promise((resolve) => setTimeout(resolve, 12000));
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: texto }] }],
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: voiceName },
                },
              },
            },
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`[Podcast-TTS] Erro HTTP ${response.status} no Gemini:`, errorBody);
        
        if (response.status === 429 && attempt < maxRetries) {
          continue;
        }
        return null;
      }

      const data = await response.json();
      const audioPart = data.candidates?.[0]?.content?.parts?.find(
        (p: any) => p.inlineData?.mimeType?.startsWith("audio/")
      );

      if (!audioPart) {
        console.warn("[Podcast-TTS] Nenhum áudio retornado pelo Gemini. Response:", JSON.stringify(data));
        return { audioBase64: "", mimeType: "error", error: "Nenhum áudio retornado: " + JSON.stringify(data) };
      }

      return {
        audioBase64: audioPart.inlineData.data,
        mimeType: audioPart.inlineData.mimeType,
      };
    } catch (error: any) {
      console.error(`[Podcast-TTS] Erro ao sintetizar no Gemini (Tentativa ${attempt + 1}):`, error.message);
      if (attempt >= maxRetries) return { audioBase64: "", mimeType: "error", error: error.message };
    }
  }
  
  return null;
}

// ── Full Podcast Generator ───────────────────────────────────────────────

/**
 * Gera o podcast completo: script + áudio.
 *
 * Fluxo:
 * 1. Gera o roteiro via Gemini Text
 * 2. Sintetiza cada segmento via Gemini TTS
 * 3. Concatena os segmentos de áudio (base64)
 * 4. Retorna script + áudio final
 *
 * Para a v1, retornamos os segmentos individuais de áudio.
 * A concatenação (com jingles) será feita no script batch via ffmpeg.
 */
export async function generatePodcast(
  input: PodcastModuleInput,
): Promise<PodcastResult> {
  console.log(
    `[Podcast] Gerando podcast para ${input.materia} > ${input.aulaTitulo} > Módulo ${input.moduloNumero}`,
  );

  // Step 1: Gerar script
  console.log("[Podcast] Step 1/2: Gerando roteiro...");
  const script = await generatePodcastScript(input);
  console.log(
    `[Podcast] Roteiro gerado: "${script.titulo}" (${script.segmentos.length} segmentos, ~${script.duracaoEstimada})`,
  );

  // Step 2: Sintetizar áudio por segmento para alternar as vozes
  console.log("[Podcast] Step 2/2: Sintetizando áudio...");

  let combinedPcm = Buffer.alloc(0);
  let hasAudio = false;

  for (let i = 0; i < script.segmentos.length; i++) {
    const s = script.segmentos[i];
    console.log(`[Podcast] Sintetizando segmento ${i + 1}/${script.segmentos.length} (${s.speaker})...`);
    
    // Adiciona o nome do speaker no texto para a transcrição ser mais natural, mas não precisa para o TTS se for só fala
    // Opcionalmente podemos deixar o texto puro para o TTS, já que a voz muda.
    const audioResult = await synthesizeSegment(s.texto, s.speaker);
    
    if (audioResult && audioResult.audioBase64) {
      const pcmBuffer = Buffer.from(audioResult.audioBase64, "base64");
      combinedPcm = Buffer.concat([combinedPcm, pcmBuffer]);
      hasAudio = true;
    } else if (audioResult && (audioResult as any).error) {
      console.warn(`[Podcast] Erro ao sintetizar segmento ${i + 1}:`, (audioResult as any).error);
      return {
        script,
        error: `Falha no TTS (Segmento ${i+1}): ${(audioResult as any).error}`,
      };
    } else {
      console.warn(`[Podcast] Falha ao sintetizar segmento ${i + 1}`);
    }
  }

  if (hasAudio) {
    const audioBase64 = combinedPcm.toString("base64");
    console.log(
      `[Podcast] Áudio gerado e concatenado com sucesso (PCM, ${combinedPcm.length} bytes)`
    );
    return {
      script,
      audioBase64: audioBase64,
      audioMimeType: "audio/pcm", // raw pcm
    };
  }

  console.warn("[Podcast] Áudio não gerado — retornando apenas o script");
  return {
    script,
    error: "Áudio TTS não disponível. Apenas a transcrição foi gerada.",
  };
}
