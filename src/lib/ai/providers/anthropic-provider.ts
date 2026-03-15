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
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.

TAREFA: Criar UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
Dificuldade: ${dificuldade || 'Média'}

REGRAS:
1. Estilo CESGRANRIO: enunciado CURTO (2-3 linhas), objetivo, direto.
2. 5 alternativas plausíveis.
3. REGRA DE CÁLCULO: Demonstre o passo a passo na explicação. A alternativa correta deve ser o resultado exato.

Retorne APENAS um JSON válido.`;

    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 1500,
      system: "Você é um gerador de questões de concurso infalível.",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : "";
    return this.parseResponse(text, options);
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      // Extrair JSON se houver markdown
      let jsonTexto = text;
      if (text.includes('```json')) {
        jsonTexto = text.split('```json')[1].split('```')[0].trim();
      }
      
      const data = JSON.parse(jsonTexto);
      return {
        ...data,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: 'CESGRANRIO',
        geradaPorIA: true,
        provider: 'anthropic'
      };
    } catch (error) {
      console.error("[Anthropic] Erro ao parsear JSON:", text);
      throw new Error("Falha ao processar resposta da Anthropic");
    }
  }
}
