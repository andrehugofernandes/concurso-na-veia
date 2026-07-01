import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

export class FreeLLMProvider implements AIProvider {
  private apiKey: string;
  private endpoint: string;
  private model: string = "apifreellm";

  constructor() {
    this.apiKey = process.env.FREE_LLM_API_KEY || "";
    this.endpoint = process.env.FREE_LLM_URL || "https://apifreellm.com/api/v1/chat";
    
    // Garantir que o endpoint termine corretamente para o fetch se for configurado via env
    if (!this.endpoint.endsWith('/chat')) {
        this.endpoint = this.endpoint.replace(/\/$/, '') + '/chat';
    }

    console.log(`[FreeLLM] Inicializado com endpoint: ${this.endpoint}`);

    if (!this.apiKey || this.apiKey === "YOUR_FREE_LLM_API_KEY_HERE") {
      throw new Error("FREE_LLM_API_KEY não configurada. Pegue sua chave em https://apifreellm.com");
    }
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = options;

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.

TAREFA: Crie UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ''} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ''}
Dificuldade: ${dificuldade || 'Média'}

ESTRUTURA OBRIGATÓRIA DO ENUNCIADO (PADRÃO CESGRANRIO REAL):

O campo "enunciado" deve ter DUAS PARTES obrigatórias, separadas por \\n\\n:

PARTE 1 — CONTEXTUALIZAÇÃO / SITUAÇÃO-PROBLEMA (obrigatório):
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `Para LÍNGUA PORTUGUESA: Parágrafo de 4-8 linhas simulando trecho de reportagem, artigo técnico ou relatório corporativo. Linguagem formal, culta, com estrutura sintática variada.` : ''}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `Para MATEMÁTICA: Situação-problema realista contextualizada na Petrobras (produção de barris, custos, logística, juros, estatísticas). Forneça TODOS os dados numéricos. Exija raciocínio em 2-3 etapas.` : ''}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `Para LÍNGUA INGLESA: Parágrafo de 4-8 linhas EM INGLÊS, artigo técnico ou relatório do setor de energia/petróleo. Vocabulário técnico e formal. Comando da questão em PORTUGUÊS.` : ''}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `Para CONHECIMENTOS ESPECÍFICOS: Cenário técnico/normativo realista de 4-8 linhas com situação operacional, problema técnico ou aplicação de norma do cargo "${contexto?.cargo || 'técnico'}". Terminologia técnica precisa.` : ''}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `Parágrafo de 4-8 linhas contextualizando com cenário realista da indústria do petróleo, energia ou economia brasileira.` : ''}

PARTE 2 — COMANDO DA QUESTÃO (obrigatório):
Pergunta PRECISA e ESPECÍFICA referenciando elemento concreto da contextualização.

❌ ANTI-PADRÕES (PROIBIDO):
- Frase solta sem pergunta. Lacuna simplória. Enunciado genérico. Questão de uma operação só.

✅ EXEMPLO (siga este padrão):
${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `{
  "enunciado": "Uma plataforma produz 15.000 barris/dia. A produção foi reduzida em 20% durante 10 dias e operou normalmente nos 20 restantes. A US$ 75,00/barril e custo fixo de US$ 8.500.000,00/mês, o lucro obtido naquele mês, em dólares, foi de",
  "alternativas": ["US$ 18.500.000,00", "US$ 19.250.000,00", "US$ 23.000.000,00", "US$ 24.250.000,00", "US$ 31.500.000,00"],
  "correta": 2
}` : ''}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `{
  "enunciado": "Petrobras has developed cutting-edge technologies that have <u>driven down</u> production costs, making deep-water operations commercially viable even during periods of low oil prices.\\n\\nNo texto, a expressão destacada pode ser substituída, sem alteração de sentido, por",
  "alternativas": ["reduced, indicando diminuição dos custos.", "increased, indicando crescimento dos custos.", "maintained, indicando estabilidade.", "estimated, indicando projeção.", "overlooked, indicando que foram ignorados."],
  "correta": 0
}` : ''}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `{
  "enunciado": "Em uma refinaria, a equipe identificou corrosão sob isolamento (CUI) em tubulação de aço carbono a 180°C. O laudo indicou perda de 30% da espessura nominal.\\n\\nDe acordo com a NR-13, o procedimento correto é",
  "alternativas": ["interditar e substituir antes do retorno operacional.", "aplicar revestimento e monitorar trimestralmente.", "reduzir pressão em 50% até a próxima parada.", "reclassificar para serviço em temperatura ambiente.", "aumentar inspeção visual para quinzenal."],
  "correta": 0
}` : ''}${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `{
  "enunciado": "A Petrobras tem direcionado investimentos para fontes renováveis, <u>embora</u> seu portfólio principal ainda dependa da exploração no pré-sal.\\n\\nA palavra destacada introduz oração que expressa ideia de",
  "alternativas": ["concessão, pois apresenta fato contrário à expectativa.", "causa, pois justifica o investimento.", "consequência, pois indica resultado.", "finalidade, pois exprime objetivo.", "condição, pois estabelece hipótese."],
  "correta": 0
}` : ''}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `{
  "enunciado": "A Petrobras previu investimentos de US$ 102 bilhões para 2025-2029, com 83% para exploração e produção.\\n\\nCom base no texto, a estratégia da Petrobras",
  "alternativas": ["prioriza diversificação para renováveis.", "concentra recursos na exploração e produção.", "busca reduzir produção total.", "destina volumes iguais a todas as áreas.", "visa manter produção sem expansão."],
  "correta": 1
}` : ''}

REGRAS TÉCNICAS:
1. ALTERNATIVAS: 5 opções plausíveis e distintas. PROIBIDO alternativas de uma só palavra quando o contexto pede análise.
2. PROIBIDO letras (A-E) ou prefixos no início. Texto puro.
3. GABARITO: Índice "correta" (0-4) correto. DISTRIBUA aleatoriamente.
4. EXPLICAÇÃO: Detalhada. Para Matemática, passo a passo completo.
5. HTML: Use <b>, <u>, <i>. NÃO use Markdown. DESTAQUES DO ENUNCIADO obrigatórios com a tag <u> (ex: <u>palavra</u>). Aplique a tag <u> APENAS UMA VEZ no texto-base. Se o comando repetir o trecho, não destaque novamente. NÃO use <b> para a palavra destacada. PROIBIDO usar <u> nas alternativas.
6. COERÊNCIA LINGUÍSTICA: Se pede "a PALAVRA destacada", destaque UMA ÚNICA PALAVRA com <u>. Para LOCUÇÃO, use "a EXPRESSÃO destacada".

Retorne APENAS um JSON válido:
{
  "enunciado": "CONTEXTUALIZAÇÃO...\\n\\nCOMANDO DA QUESTÃO",
  "alternativas": ["opção 1", "opção 2", "opção 3", "opção 4", "opção 5"],
  "correta": 0,
  "explicacao": "Explicação detalhada",
  "assunto": "${assunto || 'Geral'}",
  "dificuldade": "${dificuldade || 'Média'}"
}`;

    const start = Date.now();
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          message: prompt,
          model: this.model,
        }),
      });

      const duration = Date.now() - start;
      console.log(`[FreeLLM] Resposta recebida em ${duration}ms`);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Limite de taxa da ApiFreeLLM atingido (1 req a cada 25s). Por favor, aguarde alguns instantes.");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erro na API ApiFreeLLM: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(`ApiFreeLLM retornou erro: ${JSON.stringify(data)}`);
      }

      return this.parseResponse(data.response, options);
    } catch (error: any) {
      console.error("[FreeLLM] Erro na requisição:", error);
      throw error;
    }
  }

  async generateQuestionsBatch(options: AIProviderOptions, quantity: number): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;
    
    // Limitar o lote para não estourar contexto ou tempo de resposta da API Free
    const batchSize = Math.min(quantity, 5);

    // Mapeamento de matérias específicas por cargo para orientar a IA
    const materiasPorCargo: Record<string, string> = {
      'Suprimentos/Administração': 'Logística, Gestão de Estoques, Licitações e Contratos, Noções de Administração',
      'Técnico de Operação': 'Física, Química, Termodinâmica, Instrumentação Industrial',
      'Manutenção Mecânica': 'Metrologia, Elementos de Máquinas, Resistência dos Materiais, Hidráulica e Pneumática',
      'Manutenção Elétrica': 'Circuitos Elétricos, Máquinas Elétricas, Instalações Elétricas, NR-10',
      'Segurança do Trabalho': 'Normas Regulamentadoras, EPIs e EPCs, Análise de Riscos, Higiene Ocupacional',
      'Engenheiro de Petróleo': 'Geologia do Petróleo, Engenharia de Reservatórios, Perfuração, Elevação e Escoamento',
      'Engenheiro Mecânico': 'Resistência dos Materiais, Termodinâmica, Mecânica dos Fluidos, Transferência de Calor',
      'Analista de Sistemas': 'Desenvolvimento de Software, Banco de Dados, Engenharia de Software, Infraestrutura e Redes',
    };

    const isEspecificas = materia.toLowerCase().includes('espec');
    const materiasDoCargoStr = contexto?.cargo ? materiasPorCargo[contexto.cargo] : null;
    const getOrientacaoMateria = () => {
      if (!isEspecificas || !contexto?.cargo) return "";
      
      if (contexto.cargo === 'Suprimentos/Administração') {
        if (materia.includes('Bloco I')) return '\n    FOCO: Bloco I - Noções de Administração, Teoria Geral da Administração, Organização e Planejamento.';
        if (materia.includes('Bloco II')) return '\n    FOCO: Bloco II - Logística, Gestão de Materiais, Gestão de Estoques e Recebimento.';
        if (materia.includes('Bloco III')) return '\n    FOCO: Bloco III - Licitações (Lei 14.133), Contratos Administrativos e Ética.';
        return `\n    IMPORTANTE: Para "${materia}", as matérias são: ${materiasPorCargo[contexto.cargo]}.`;
      }
      
      const materiasDoCargoStr = materiasPorCargo[contexto.cargo];
      return materiasDoCargoStr ? `\n    IMPORTANTE: Para Conhecimentos Específicos do cargo "${contexto?.cargo}", as matérias são: ${materiasDoCargoStr}. Distribua as questões entre esses tópicos.` : '';
    };

    const orientacaoEspecificas = getOrientacaoMateria();

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.
    
    TAREFA: Crie EXATAMENTE ${batchSize} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ''} para candidato a ${contexto?.cargo || 'Geral'} nível ${contexto?.nivel || 'médio'}.${orientacaoEspecificas}
    Dificuldade: ${dificuldade || 'Média'}

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
    4. GABARITO correto. 5. HTML: <b>, <u>, <i>. NÃO Markdown. DESTAQUES DO ENUNCIADO obrigatórios com a tag <u> (ex: <u>palavra</u>). Aplique a tag <u> APENAS UMA VEZ no texto-base. Se o comando repetir o trecho, não destaque novamente. NÃO use <b> para a palavra destacada. PROIBIDO usar <u> nas alternativas.
    6. COERÊNCIA LINGUÍSTICA: Se pede "a PALAVRA", destaque UMA. Para LOCUÇÃO, use "a EXPRESSÃO".
    7. Retorne APENAS JSON. NÃO adicione texto fora do JSON.

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

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          message: prompt,
          model: this.model,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Limite de taxa da ApiFreeLLM atingido. Aguarde 25 segundos.");
        }
        throw new Error(`Erro API: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) throw new Error("Erro na resposta da API");

      return this.parseBatchResponse(data.response, options);
    } catch (error: any) {
      console.error("[FreeLLM-Batch] Erro:", error);
      throw error;
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

      return data.map(q => {
        // Sanitizar Markdown → HTML
        q.enunciado = this.sanitizeMarkdown(q.enunciado);
        q.explicacao = this.sanitizeMarkdown(q.explicacao);

        const alternativasLimpas = q.alternativas.map((alt: string) => 
          this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim())
        );

        const originalCorretaText = q.alternativas[q.correta];
        const shuffled = [...alternativasLimpas];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const newCorreta = shuffled.indexOf(this.sanitizeMarkdown(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim()));

        return {
          ...q,
          alternativas: shuffled,
          correta: newCorreta,
          id: Date.now() + Math.random(),
          materia: options.materia,
          banca: 'CESGRANRIO',
          geradaPorIA: true,
          provider: 'freellm'
        };
      });
    } catch (error) {
      console.error("[FreeLLM-Batch] Erro no parse:", text);
      throw new Error("Falha ao processar lote de questões");
    }
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      console.log("[FreeLLM] Raw Response:", text);
      
      // Limpeza profunda de Markdown (removendo ```json e ```)
      let cleanText = text.trim();
      if (cleanText.includes("```")) {
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
      }
      
      // Tentar encontrar um bloco JSON {...} se houver texto extra
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      const jsonContent = jsonMatch ? jsonMatch[0] : cleanText;
      
      const data = JSON.parse(jsonContent);
      
      // Validação básica dos campos
      if (!data.enunciado || !data.alternativas || data.correta === undefined) {
        throw new Error("JSON retornado pela IA está incompleto ou em formato incorreto");
      }

      // Sanitizar Markdown → HTML
      data.enunciado = this.sanitizeMarkdown(data.enunciado);
      data.explicacao = this.sanitizeMarkdown(data.explicacao);

      // Sanitização robusta das alternativas
      const alternativasLimpas = data.alternativas.map((alt: string) => 
        this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim())
      );

      // Randomização programática final
      const originalCorretaText = data.alternativas[data.correta];
      const shuffled = [...alternativasLimpas];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const newCorreta = shuffled.indexOf(this.sanitizeMarkdown(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim()));

      return {
        ...data,
        alternativas: shuffled,
        correta: newCorreta,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: 'CESGRANRIO',
        geradaPorIA: true,
        provider: 'freellm'
      };
    } catch (error) {
      console.error("[FreeLLM] Erro ao parsear JSON interno da IA:", text);
      throw new Error(`Falha ao processar conteúdo da questão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

}
