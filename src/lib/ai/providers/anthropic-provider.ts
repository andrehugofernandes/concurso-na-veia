import { Anthropic } from "@anthropic-ai/sdk";
import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

export class AnthropicProvider implements AIProvider {
  private client: Anthropic;
  private model: string = "claude-3-5-sonnet-20241022";

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY não configurada");
    }
    this.client = new Anthropic({
      apiKey: apiKey,
    });
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

TAREFA: Criar UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
Dificuldade: ${dificuldade || 'Média'}

REGRAS CRÍTICAS:
1. Estilo CESGRANRIO: enunciado direto, objetivo.
2. 5 alternativas (A, B, C, D, E).
3. PROIBIDO: Não crie alternativas idênticas ou repetidas. Todas devem ser únicas.
4. COERÊNCIA: O enunciado e as alternativas devem tratar do mesmo conceito.
5. RANDOMIZAÇÃO: Não coloque a resposta certa sempre na mesma letra.

Retorne APENAS um JSON válido seguindo este formato:
{
  "enunciado": "...",
  "alternativas": ["...", "...", "...", "...", "..."],
  "correta": 0,
  "explicacao": "...",
  "assunto": "${assunto || 'Geral'}",
  "dificuldade": "${dificuldade || 'Média'}"
}`;

    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 1500,
      system: "Você é um gerador de questões de concurso infalível que retorna apenas JSON.",
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : "";
    return this.parseResponse(text, options);
  }

  async generateQuestionsBatch(options: AIProviderOptions, quantity: number): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;
    
    // Claude aguenta lotes maiores sem perder qualidade
    const batchSize = Math.min(quantity, 10);

    const prompt = `Crie EXATAMENTE ${batchSize} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} no estilo CESGRANRIO para Petrobras.
    
    REGRAS:
    1. Dificuldade: ${dificuldade || 'Média'}, Cargo: ${contexto?.cargo || 'Geral'}.
    2. 5 alternativas por questão.
    3. PROIBIDO: Alternativas repetidas na mesma questão.
    4. COERÊNCIA: Rigor conceitual absoluto.
    
    Retorne APENAS um JSON que seja um ARRAY de objetos no formato:
    [
      {
        "enunciado": "...",
        "alternativas": ["...", "...", "...", "...", "..."],
        "correta": 0,
        "explicacao": "...",
        "assunto": "${assunto || 'Geral'}",
        "dificuldade": "${dificuldade || 'Média'}"
      }
    ]`;

    try {
      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: 4000,
        system: "Você é um gerador de questões infalível. Retorne apenas o array JSON.",
        messages: [{ role: "user", content: prompt }],
      });

      const text = message.content[0].type === 'text' ? message.content[0].text : "";
      
      let jsonTexto = text.trim();
      if (jsonTexto.includes('```json')) {
        jsonTexto = jsonTexto.split('```json')[1].split('```')[0].trim();
      } else if (jsonTexto.includes('```')) {
        jsonTexto = jsonTexto.split('```')[1].split('```')[0].trim();
      }

      const data = JSON.parse(jsonTexto);
      if (!Array.isArray(data)) throw new Error("Não é um array");

      return data.map(q => {
        // Randomização Fisher-Yates
        const textCorreta = q.alternativas[q.correta];
        const shuffled = [...q.alternativas];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const newCorreta = shuffled.indexOf(textCorreta);

        return {
          ...q,
          alternativas: shuffled,
          correta: newCorreta,
          id: Date.now() + Math.random(),
          materia: options.materia,
          banca: 'CESGRANRIO',
          geradaPorIA: true,
          provider: 'anthropic'
        };
      });
    } catch (error) {
      console.error("[Anthropic-Batch] Erro:", error);
      throw new Error("Falha no lote Anthropic");
    }
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      let jsonTexto = text.trim();
      if (text.includes('```json')) {
        jsonTexto = text.split('```json')[1].split('```')[0].trim();
      } else if (text.includes('```')) {
        jsonTexto = text.split('```')[1].split('```')[0].trim();
      }
      
      const data = JSON.parse(jsonTexto);
      
      // Randomização programática
      const textCorreta = data.alternativas[data.correta];
      const shuffled = [...data.alternativas];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const newCorreta = shuffled.indexOf(textCorreta);

      return {
        ...data,
        alternativas: shuffled,
        correta: newCorreta,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: 'CESGRANRIO',
        geradaPorIA: true,
        provider: 'anthropic'
      };
    } catch (error) {
      console.error("[Anthropic] Erro parse:", text);
      throw new Error("Erro no processamento Anthropic");
    }
  }
}
