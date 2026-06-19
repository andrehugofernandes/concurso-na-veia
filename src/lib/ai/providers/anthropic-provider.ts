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
3. NUNCA inclua letras (A, B, C, D, E), números ou prefixos no início das alternativas. O JSON deve conter apenas o texto puro da opção.
4. REGRA DE CÁLCULO: Demonstre o passo a passo na explicação. A alternativa correta deve ser o resultado exato.
5. REGRAS DE FORMATAÇÃO E COERÊNCIA:
   - Use tags HTML para destaque visual: <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>. NÃO use Markdown.
   - ⚠️ SUBLINHADO/DESTAQUE DE PALAVRAS: Sempre que o enunciado fizer referência a termos, expressões, palavras ou trechos "destacados", "sublinhados" ou "em negrito", você DEVE, OBRIGATORIAMENTE, aplicar a tag HTML correspondente ao redor desse termo no texto da frase citada. Exemplo: Se o enunciado diz "apresenta duas palavras destacadas", envolva as duas palavras alvo com a tag <u> (ex: "apresenta duas palavras destacadas: a primeira é <u>rapidamente</u> e a segunda..."). Nunca use underscores (_texto_) para sublinhar. Use EXCLUSIVAMENTE a tag HTML <u>texto</u>.
   - ⚠️ COERÊNCIA LINGUÍSTICA: Se o enunciado pede "a PALAVRA sublinhada/destacada", sublinhe/destaque UMA ÚNICA PALAVRA. Se o destaque for uma LOCUÇÃO (2+ palavras), use "a EXPRESSÃO sublinhada/destacada" ou "o TRECHO sublinhado/destacado".

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

  async generateQuestionsBatch(options: AIProviderOptions, quantity: number): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;

    const prompt = `Você é um especialista em criar questões de concurso no estilo CESGRANRIO para a Petrobras.
    
    TAREFA: Crie EXATAMENTE ${quantity} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} 
    Estilo CESGRANRIO: enunciado direto, 5 alternativas.
    Dificuldade média geral: ${dificuldade || 'Média'}
    Cargo: ${contexto?.cargo || 'Geral'}, Nível: ${contexto?.nivel || 'médio'}

    REGRAS:
    1. NUNCA inclua letras (A, B, C, D, E), números ou prefixos no início das alternativas.
    2. REGRAS DE FORMATAÇÃO E COERÊNCIA:
       - Use tags HTML para destaque visual: <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>. NÃO use Markdown.
       - ⚠️ SUBLINHADO/DESTAQUE DE PALAVRAS: Sempre que o enunciado fizer referência a termos, expressões, palavras ou trechos "destacados", "sublinhados" ou "em negrito", você DEVE, OBRIGATORIAMENTE, aplicar a tag HTML correspondente (ex: <u>texto</u>) ao redor desse termo no texto da frase citada.
       - ⚠️ COERÊNCIA LINGUÍSTICA: Se o enunciado pede "a PALAVRA sublinhada/destacada", sublinhe/destaque UMA ÚNICA PALAVRA. Se o destaque for uma LOCUÇÃO (2+ palavras), use "a EXPRESSÃO sublinhada/destacada" ou "o TRECHO sublinhado/destacado".
    3. Retorne APENAS um JSON que seja um ARRAY de objetos.

    Formato esperado:
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

    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 4000,
      system: "Você é um gerador de questões de concurso infalível que responde apenas com JSON.",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : "";
    
    try {
      let jsonTexto = text.trim();
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonTexto = jsonMatch[0];
      }
      
      const data = JSON.parse(jsonTexto);
      
      if (!Array.isArray(data)) {
        return [this.parseResponse(text, options)];
      }

      return data.map(q => {
        // Sanitizar Markdown → HTML no enunciado e explicação
        q.enunciado = this.sanitizeMarkdown(q.enunciado);
        q.explicacao = this.sanitizeMarkdown(q.explicacao);

        const alternativasLimpas = q.alternativas.map((alt: string) => 
          this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim())
        );

        return {
          ...q,
          alternativas: alternativasLimpas,
          id: Date.now() + Math.random(),
          materia: options.materia,
          banca: 'CESGRANRIO',
          geradaPorIA: true,
          provider: 'anthropic'
        };
      });
    } catch (error) {
      console.error("[Anthropic-Batch] Erro:", error);
      throw new Error("Falha ao gerar lote de questões com Anthropic");
    }
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      let jsonTexto = text;
      if (text.includes('```json')) {
        jsonTexto = text.split('```json')[1].split('```')[0].trim();
      } else {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) jsonTexto = jsonMatch[0];
      }
      
      const data = JSON.parse(jsonTexto);

      // Sanitizar Markdown → HTML no enunciado e explicação
      data.enunciado = this.sanitizeMarkdown(data.enunciado);
      data.explicacao = this.sanitizeMarkdown(data.explicacao);

      // Sanitização robusta das alternativas
      const alternativasLimpas = data.alternativas.map((alt: string) => 
        this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim())
      );

      return {
        ...data,
        alternativas: alternativasLimpas,
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

  /**
   * Sanitiza texto gerado pela IA: converte Markdown residual para HTML.
   */
  private sanitizeMarkdown(text: string): string {
    if (!text) return text;
    let result = text.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<i>$1</i>');
    result = result.replace(/(?<![\w])_([^_]+)_(?![\w])/g, '<u>$1</u>');
    return result;
  }
}
