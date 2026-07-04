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
- Cada fala deve ter entre 1 a 4 frases (natural, conversacional)

Retorne APENAS um JSON válido com esta estrutura:
{
  "titulo": "Título curto do episódio",
  "descricao": "Uma frase descritiva do episódio",
  "professorNome": "${input.professorNome}",
  "apresentadoraNome": "${APRESENTADORA_NOME}",
  "segmentos": [
    { "speaker": "apresentadora", "texto": "Fala da apresentadora...", "estilo": "acolhedor" },
    { "speaker": "professor", "texto": "Fala do professor...", "estilo": "explicativo" }
  ],
  "duracaoEstimada": "2:30",
  "transcricaoCompleta": "Texto corrido completo de toda a conversa, com marcações [Ana Carolina] e [Prof. Nome] antes de cada fala"
}`;

  let text = "";

  // ── Helper: chama endpoint compat\u00edvel com OpenAI ──
  async function tryOpenAICompatible(
    name: string,
    url: string,
    key: string,
    model: string,
  ): Promise<boolean> {
    try {
      console.log(`[Podcast-Script] Tentando gerar via ${name} (${model})...`);
      const res = await fetch(`${url}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt + "\n\nIMPORTANTE: Retorne APENAS o JSON v\u00e1lido, sem markdown, sem coment\u00e1rios." }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content || "";
        if (content.length > 50) {
          text = content;
          console.log(`[Podcast-Script] \u2705 Sucesso via ${name}!`);
          return true;
        }
      }
      console.warn(`[Podcast-Script] ${name} retornou status ${res.status} ou vazio`);
    } catch (e: any) {
      console.warn(`[Podcast-Script] Erro no ${name}: ${e.message}`);
    }
    return false;
  }

  // ── Cascata de provedores (prioridade: gratuitos primeiro) ──

  // 1. Free LLM (OpenAI compat)
  if (!text && process.env.FREE_LLM_API_KEY && process.env.FREE_LLM_URL) {
    await tryOpenAICompatible("Free LLM", process.env.FREE_LLM_URL, process.env.FREE_LLM_API_KEY, "gemini-2.5-flash");
  }

  // 2. DeepSeek (OpenAI compat) — cr\u00e9dito gratis ~$5
  if (!text && process.env.DEEPSEEK_API_KEY) {
    await tryOpenAICompatible("DeepSeek", "https://api.deepseek.com/v1", process.env.DEEPSEEK_API_KEY, "deepseek-chat");
  }

  // 3. SiliconFlow (OpenAI compat) — ~2M tokens/dia gratis
  if (!text && process.env.SILICONFLOW_API_KEY) {
    await tryOpenAICompatible("SiliconFlow", "https://api.siliconflow.cn/v1", process.env.SILICONFLOW_API_KEY, "deepseek-ai/DeepSeek-V3");
  }

  // 4. Qwen / DashScope (OpenAI compat) — 1M tokens/mês grátis
  if (!text && process.env.DASHSCOPE_API_KEY) {
    await tryOpenAICompatible("Qwen/DashScope", "https://dashscope.aliyuncs.com/compatible-mode/v1", process.env.DASHSCOPE_API_KEY, "qwen-turbo");
  }

  // 5. Zhipu GLM (OpenAI compat) — glm-4-flash 100% grátis
  if (!text && process.env.ZHIPU_API_KEY) {
    await tryOpenAICompatible("Zhipu GLM", "https://open.bigmodel.cn/api/paas/v4", process.env.ZHIPU_API_KEY, "glm-4-flash");
  }

  // 6. Groq (OpenAI compat) — grátis com limites
  if (!text && process.env.GROQ_API_KEY) {
    await tryOpenAICompatible("Groq", "https://api.groq.com/openai/v1", process.env.GROQ_API_KEY, "llama3-8b-8192");
  }

  // 7. OpenRouter (OpenAI compat) — grátis
  if (!text && process.env.OPENROUTER_API_KEY) {
    await tryOpenAICompatible("OpenRouter", "https://openrouter.ai/api/v1", process.env.OPENROUTER_API_KEY, "google/gemini-2.5-flash:free");
  }

  // 8. Gemini nativo (SDK)
  if (!text && process.env.GEMINI_API_KEY) {
    try {
      console.log("[Podcast-Script] Tentando gerar via Gemini nativo...");
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });
      const result = await model.generateContent(prompt);
      text = result.response.text();
    } catch (e: any) {
      console.warn(`[Podcast-Script] Erro no Gemini nativo: ${e.message}`);
    }
  }

  // 7. Anthropic (REST) — \u00faltimo recurso (pago)
  if (!text && process.env.ANTHROPIC_API_KEY) {
    try {
      console.log("[Podcast-Script] Tentando gerar via Anthropic...");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt + "\n\nIMPORTANTE: Retorne apenas o JSON e nada mais." }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        text = data.content?.[0]?.text || "";
      } else {
        console.warn(`[Podcast-Script] Falha na Anthropic: ${res.status}`);
      }
    } catch (e: any) {
      console.warn(`[Podcast-Script] Erro na Anthropic: ${e.message}`);
    }
  }

  if (!text) {
    throw new Error("Nenhum provedor de IA conseguiu gerar o roteiro. Verifique suas API keys no .env.local.");
  }

  try {
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(jsonStr) as PodcastScript;
    return data;
  } catch (error: any) {
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
): Promise<{ audioBase64: string; mimeType: string } | null> {
  // 1. Tentar Free LLM TTS (Compatível com OpenAI /audio/speech) para máxima estabilidade de timbre
  if (process.env.FREE_LLM_API_KEY && process.env.FREE_LLM_URL) {
    try {
      console.log(`[Podcast-TTS] Tentando TTS via Free LLM para ${speaker}...`);
      const freeRes = await fetch(`${process.env.FREE_LLM_URL}/audio/speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FREE_LLM_API_KEY}`,
        },
        body: JSON.stringify({
          model: "tts-1",
          input: texto,
          voice: VOZES_FREE[speaker],
          response_format: "mp3"
        }),
      });

      if (freeRes.ok) {
        const arrayBuffer = await freeRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        console.log(`[Podcast-TTS] Sucesso no Free LLM TTS para ${speaker}`);
        return {
          audioBase64: buffer.toString("base64"),
          mimeType: "audio/mp3",
        };
      } else {
        console.warn(`[Podcast-TTS] Free LLM TTS falhou com status ${freeRes.status}. Caindo para Gemini TTS...`);
      }
    } catch (e: any) {
      console.warn(`[Podcast-TTS] Erro no Free LLM TTS: ${e.message}. Caindo para Gemini TTS...`);
    }
  }

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
        console.warn("[Podcast-TTS] Nenhum áudio retornado pelo Gemini");
        return null;
      }

      return {
        audioBase64: audioPart.inlineData.data,
        mimeType: audioPart.inlineData.mimeType,
      };
    } catch (error: any) {
      console.error(`[Podcast-TTS] Erro ao sintetizar no Gemini (Tentativa ${attempt + 1}):`, error.message);
      if (attempt >= maxRetries) return null;
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
