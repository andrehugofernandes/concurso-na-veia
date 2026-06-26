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

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.

TAREFA: Criar UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
Dificuldade: ${dificuldade || 'Média'}

ESTRUTURA OBRIGATÓRIA DO ENUNCIADO (PADRÃO CESGRANRIO REAL):

O campo "enunciado" deve ter DUAS PARTES obrigatórias, separadas por \\n\\n:

PARTE 1 — CONTEXTUALIZAÇÃO / SITUAÇÃO-PROBLEMA (obrigatório):
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `Para LÍNGUA PORTUGUESA: Parágrafo de 4-8 linhas simulando trecho de reportagem, artigo técnico ou relatório. Linguagem formal, culta, com estrutura sintática variada.` : ''}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `Para MATEMÁTICA: Situação-problema realista contextualizada na Petrobras (produção, custos, logística, juros). Forneça TODOS os dados numéricos. Exija raciocínio em 2-3 etapas.` : ''}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `Para LÍNGUA INGLESA: Parágrafo de 4-8 linhas EM INGLÊS do setor de energia/petróleo. Vocabulário técnico. Comando em PORTUGUÊS.` : ''}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `Para CONHECIMENTOS ESPECÍFICOS: Cenário técnico/normativo realista de 4-8 linhas com situação operacional ou aplicação de norma do cargo "${contexto?.cargo || 'técnico'}".` : ''}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `Parágrafo de 4-8 linhas com cenário realista da indústria do petróleo, energia ou economia brasileira.` : ''}

PARTE 2 — COMANDO DA QUESTÃO (obrigatório):
Pergunta PRECISA e ESPECÍFICA referenciando elemento concreto da contextualização.

❌ ANTI-PADRÕES (PROIBIDO):
- Frase solta sem pergunta. Lacuna simplória. Enunciado genérico. Questão de uma operação só.

✅ EXEMPLO (siga este padrão):
${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `{
  "enunciado": "Uma plataforma produz 15.000 barris/dia. Produção reduzida em 20% por 10 dias, normal nos 20 restantes. A US$ 75/barril e custo fixo de US$ 8.500.000/mês, o lucro foi de",
  "alternativas": ["US$ 18.500.000", "US$ 19.250.000", "US$ 23.000.000", "US$ 24.250.000", "US$ 31.500.000"],
  "correta": 2
}` : ''}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `{
  "enunciado": "Petrobras has developed technologies that have <u>driven down</u> production costs.\\n\\nA expressão destacada pode ser substituída por",
  "alternativas": ["reduced, indicando diminuição.", "increased, indicando crescimento.", "maintained, indicando estabilidade.", "estimated, indicando projeção.", "overlooked, indicando que foram ignorados."],
  "correta": 0
}` : ''}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `{
  "enunciado": "Identificou-se corrosão sob isolamento (CUI) em tubulação a 180°C com perda de 30% da espessura nominal.\\n\\nDe acordo com a NR-13, o procedimento correto é",
  "alternativas": ["interditar e substituir antes do retorno.", "revestir e monitorar trimestralmente.", "reduzir pressão em 50%.", "reclassificar para temperatura ambiente.", "inspeção visual quinzenal."],
  "correta": 0
}` : ''}${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `{
  "enunciado": "A Petrobras investe em renováveis, <u>embora</u> dependa do pré-sal.\\n\\nA palavra destacada expressa ideia de",
  "alternativas": ["concessão.", "causa.", "consequência.", "finalidade.", "condição."],
  "correta": 0
}` : ''}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `{
  "enunciado": "Petrobras previu US$ 102 bilhões para 2025-2029, 83% para exploração e produção.\\n\\nA estratégia da Petrobras",
  "alternativas": ["prioriza renováveis.", "concentra em exploração e produção.", "reduz produção.", "distribui igualmente.", "mantém sem expansão."],
  "correta": 1
}` : ''}

REGRAS:
1. 5 alternativas plausíveis, distintas, com distratores inteligentes.
2. PROIBIDO letras (A-E) ou prefixos. 3. Índice "correta" correto. DISTRIBUA aleatoriamente.
4. Explicação detalhada. Para Matemática, passo a passo.
5. HTML: <b>, <u>, <i>. NÃO use Markdown. 6. COERÊNCIA linguística nos destaques.

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

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.
    
    TAREFA: Crie EXATAMENTE ${quantity} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} 
    Dificuldade: ${dificuldade || 'Média'}
    Cargo: ${contexto?.cargo || 'Geral'}, Nível: ${contexto?.nivel || 'médio'}

    ESTRUTURA OBRIGATÓRIA DE CADA ENUNCIADO (PADRÃO CESGRANRIO REAL):

    Cada "enunciado" deve ter DUAS PARTES obrigatórias, separadas por \\n\\n:

    PARTE 1 — CONTEXTUALIZAÇÃO / SITUAÇÃO-PROBLEMA (obrigatório):
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `    Para LÍNGUA PORTUGUESA: Parágrafo de 4-8 linhas simulando trecho de reportagem, artigo técnico ou relatório. Linguagem formal e culta.` : ''}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `    Para MATEMÁTICA: Situação-problema realista contextualizada na Petrobras. Forneça TODOS os dados numéricos. Raciocínio em 2-3 etapas.` : ''}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `    Para LÍNGUA INGLESA: Parágrafo de 4-8 linhas EM INGLÊS do setor de energia/petróleo. Comando em PORTUGUÊS.` : ''}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `    Para CONHECIMENTOS ESPECÍFICOS: Cenário técnico/normativo de 4-8 linhas com situação operacional do cargo "${contexto?.cargo || 'técnico'}".` : ''}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `    Parágrafo de 4-8 linhas com cenário realista da indústria do petróleo ou economia brasileira.` : ''}

    PARTE 2 — COMANDO DA QUESTÃO (obrigatório):
    Pergunta PRECISA e ESPECÍFICA referenciando elemento concreto da contextualização.

    ❌ ANTI-PADRÕES (PROIBIDO):
    - Frase solta sem pergunta. Lacuna simplória. Enunciado genérico. Questão trivial.

    REGRAS:
    1. 5 alternativas plausíveis, distintas, com distratores inteligentes.
    2. PROIBIDO letras (A-E) ou prefixos. 3. UNICIDADE: contextualização e comando diferentes em cada questão.
    4. GABARITO correto. 5. HTML: <b>, <u>, <i>. NÃO Markdown. 6. COERÊNCIA linguística.
    7. Retorne APENAS JSON ARRAY.

    Formato:
    [
      {
        "enunciado": "CONTEXTUALIZAÇÃO...\\n\\nCOMANDO DA QUESTÃO",
        "alternativas": ["opção 1", "opção 2", "opção 3", "opção 4", "opção 5"],
        "correta": 0,
        "explicacao": "Explicação detalhada",
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
