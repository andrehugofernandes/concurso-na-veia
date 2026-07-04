import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private baseURL: string;
  private model: string;
  private providerName: string;

  constructor(name: string, baseURL: string, apiKey: string, model: string) {
    this.providerName = name;
    this.baseURL = baseURL.replace(/\/$/, ""); // Remove barra final se houver
    this.apiKey = apiKey;
    this.model = model;

    console.log(`[OpenAIProvider-${this.providerName}] Inicializado com base URL: ${this.baseURL}, modelo: ${this.model}`);
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto } = options;

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.

TAREFA: Crie UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ""} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ""} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ""}
Dificuldade: ${dificuldade || "Média"}

ESTRUTURA OBRIGATÓRIA DO ENUNCIADO (PADRÃO CESGRANRIO REAL):

O campo "enunciado" deve ter DUAS PARTES obrigatórias, separadas por \\n\\n:

PARTE 1 — CONTEXTUALIZAÇÃO / SITUAÇÃO-PROBLEMA (obrigatório):
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `Para LÍNGUA PORTUGUESA: Parágrafo de 4-8 linhas simulando trecho de reportagem, artigo técnico ou relatório corporativo. Linguagem formal, culta, com estrutura sintática variada.` : ""}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `Para MATEMÁTICA: Situação-problema realista contextualizada na Petrobras (produção de barris, custos, logística, juros, estatísticas). Forneça TODOS os dados numéricos. Exija raciocínio em 2-3 etapas.` : ""}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `Para LÍNGUA INGLESA: Parágrafo de 4-8 linhas EM INGLÊS, artigo técnico ou relatório do setor de energia/petróleo. Vocabulário técnico e formal. Comando da questão em PORTUGUÊS.` : ""}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `Para CONHECIMENTOS ESPECÍFICOS: Cenário técnico/normativo realista de 4-8 linhas com situação operacional, problema técnico ou aplicação de norma do cargo "${contexto?.cargo || "técnico"}". Terminologia técnica precisa.` : ""}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `Parágrafo de 4-8 linhas contextualizando com cenário realista da indústria do petróleo, energia ou economia brasileira.` : ""}

PARTE 2 — COMANDO DA QUESTÃO (obrigatório):
Pergunta PRECISA e ESPECÍFICA referenciando elemento concreto da contextualização.

❌ ANTI-PADRÕES (PROIBIDO):
- Frase solta sem pergunta. Lacuna simplória. Enunciado genérico. Questão de uma operação só.

REGRAS TÉCNICAS:
1. ALTERNATIVAS: 5 opções plausíveis e distintas. PROIBIDO alternativas de uma só palavra.
2. PROIBIDO letras (A-E) ou prefixos no início. Texto puro.
3. GABARITO: Índice "correta" (0-4) correto. DISTRIBUA aleatoriamente.
4. EXPLICAÇÃO: Detalhada. Para Matemática, passo a passo completo.
5. HTML: Use <b>, <u>, <i>. NÃO use Markdown. DESTAQUES DO ENUNCIADO obrigatórios com a tag <u> (ex: <u>palavra</u>). Aplique a tag <u> APENAS UMA VEZ no texto-base. Se o comando repetir o trecho, não destaque novamente. NÃO use <b> para a palavra destacada. PROIBIDO usar <u> nas alternativas.
6. COERÊNCIA LINGUÍSTICA: Se pede "a PALAVRA destacada", destaque UMA ÚNICA PALAVRA com <u>. Para LOCUÇÃO, use "a EXPRESSÃO destacada".

Retorne APENAS um JSON válido no formato abaixo, sem tags de markdown, sem explicações extras:
{
  "enunciado": "CONTEXTUALIZAÇÃO...\\n\\nCOMANDO DA QUESTÃO",
  "alternativas": ["opção 1", "opção 2", "opção 3", "opção 4", "opção 5"],
  "correta": 0,
  "explicacao": "Explicação detalhada",
  "assunto": "${assunto || "Geral"}",
  "dificuldade": "${dificuldade || "Média"}"
}`;

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API ${this.providerName}: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      return this.parseResponse(content, options);
    } catch (error: any) {
      console.error(`[${this.providerName}] Erro na requisição:`, error);
      throw error;
    }
  }

  async generateQuestionsBatch(options: AIProviderOptions, quantity: number): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;
    const batchSize = Math.min(quantity, 5);

    const materiasPorCargo: Record<string, string> = {
      "Suprimentos/Administração": "Logística, Gestão de Estoques, Licitações e Contratos, Noções de Administração",
      "Técnico de Operação": "Física, Química, Termodinâmica, Instrumentação Industrial",
      "Manutenção Mecânica": "Metrologia, Elementos de Máquinas, Resistência dos Materiais, Hidráulica e Pneumática",
      "Manutenção Elétrica": "Circuitos Elétricos, Máquinas Elétricas, Instalações Elétricas, NR-10",
      "Segurança do Trabalho": "Normas Regulamentadoras, EPIs e EPCs, Análise de Riscos, Higiene Ocupacional",
      "Engenheiro de Petróleo": "Geologia do Petróleo, Engenharia de Reservatórios, Perfuração, Elevação e Escoamento",
      "Engenheiro Mecânico": "Resistência dos Materiais, Termodinâmica, Mecânica dos Fluidos, Transferência de Calor",
      "Analista de Sistemas": "Desenvolvimento de Software, Banco de Dados, Engenharia de Software, Infraestrutura e Redes",
    };

    const isEspecificas = materia.toLowerCase().includes("espec");
    const getOrientacaoMateria = () => {
      if (!isEspecificas || !contexto?.cargo) return "";
      if (contexto.cargo === "Suprimentos/Administração") {
        if (materia.includes("Bloco I")) return "\n    FOCO: Bloco I - Noções de Administração, Teoria Geral da Administração, Organização e Planejamento.";
        if (materia.includes("Bloco II")) return "\n    FOCO: Bloco II - Logística, Gestão de Materiais, Gestão de Estoques e Recebimento.";
        if (materia.includes("Bloco III")) return "\n    FOCO: Bloco III - Licitações (Lei 14.133), Contratos Administrativos e Ética.";
      }
      const materiasDoCargoStr = materiasPorCargo[contexto.cargo];
      return materiasDoCargoStr ? `\n    IMPORTANTE: Para Conhecimentos Específicos do cargo "${contexto?.cargo}", as matérias são: ${materiasDoCargoStr}.` : "";
    };

    const orientacaoEspecificas = getOrientacaoMateria();

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.
    
    TAREFA: Crie EXATAMENTE ${batchSize} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ""} para candidato a ${contexto?.cargo || "Geral"} nível ${contexto?.nivel || "médio"}.${orientacaoEspecificas}
    Dificuldade: ${dificuldade || "Média"}

    ESTRUTURA OBRIGATÓRIA DE CADA ENUNCIADO (PADRÃO CESGRANRIO REAL):
    Cada "enunciado" deve ter DUAS PARTES obrigatórias, separadas por \\n\\n:
    PARTE 1 — CONTEXTUALIZAÇÃO / SITUAÇÃO-PROBLEMA (obrigatório):
    Parágrafo de 4-8 linhas contextualizando com cenário realista.
    PARTE 2 — COMANDO DA QUESTÃO (obrigatório):
    Pergunta precisa referenciando o cenário.

    REGRAS:
    1. 5 alternativas plausíveis e distintas por questão.
    2. GABARITO correto de 0 a 4.
    3. HTML nas tags <b>, <u>, <i>. Destaques obrigatórios com <u>.
    
    Retorne APENAS um array JSON válido contendo exatamente ${batchSize} questões, sem markdown ou explicações fora do JSON:
    [
      {
        "enunciado": "CONTEXTUALIZAÇÃO...\\n\\nCOMANDO DA QUESTÃO",
        "alternativas": ["opção 1", "opção 2", "opção 3", "opção 4", "opção 5"],
        "correta": 0,
        "explicacao": "Explicação detalhada",
        "assunto": "${assunto || "Geral"}",
        "dificuldade": "${dificuldade || "Média"}"
      }
    ]`;

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro API ${this.providerName}: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      return this.parseBatchResponse(content, options);
    } catch (error: any) {
      console.error(`[${this.providerName}-Batch] Erro:`, error);
      throw error;
    }
  }

  private sanitizeMarkdown(text: string): string {
    if (!text) return text;
    let result = text.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<i>$1</i>");
    result = result.replace(/(?<![\w])_([^_]+)_(?![\w])/g, "<u>$1</u>");
    return result;
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      let cleanText = text.trim();
      if (cleanText.includes("```")) {
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
      }

      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      const jsonContent = jsonMatch ? jsonMatch[0] : cleanText;
      const data = JSON.parse(jsonContent);

      // Sanitiza Markdown
      data.enunciado = this.sanitizeMarkdown(data.enunciado);
      data.explicacao = this.sanitizeMarkdown(data.explicacao);
      const alternativasLimpas = data.alternativas.map((alt: string) =>
        this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim())
      );

      return {
        ...data,
        alternativas: alternativasLimpas,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: "CESGRANRIO",
        geradaPorIA: true,
        provider: this.providerName.toLowerCase(),
      };
    } catch (error: any) {
      console.error(`[${this.providerName}] Erro ao parsear JSON:`, text.substring(0, 300));
      throw new Error(`Falha no parsing da questão: ${error.message}`);
    }
  }

  private parseBatchResponse(text: string, options: AIProviderOptions): Questao[] {
    try {
      let cleanText = text.trim();
      if (cleanText.includes("```")) {
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
      }

      const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
      const jsonContent = jsonMatch ? jsonMatch[0] : cleanText;
      const data = JSON.parse(jsonContent);

      if (!Array.isArray(data)) {
        throw new Error("Resposta não é um array");
      }

      return data.map((q) => {
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
          banca: "CESGRANRIO",
          geradaPorIA: true,
          provider: this.providerName.toLowerCase(),
        };
      });
    } catch (error: any) {
      console.error(`[${this.providerName}-Batch] Erro ao parsear batch JSON:`, text.substring(0, 300));
      throw new Error(`Falha no parsing do lote: ${error.message}`);
    }
  }
}
