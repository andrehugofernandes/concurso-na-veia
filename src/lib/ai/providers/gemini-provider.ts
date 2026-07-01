import { GoogleGenerativeAI } from "@google/generative-ai";
import { Questao } from "@/lib/types";
import { AIProvider, AIProviderOptions } from "./base-provider";

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não configurada");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Gemini 2.5 Flash: estável, Free Tier generoso (250 RPD, 250K TPM)
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
  }

  async generateQuestion(options: AIProviderOptions): Promise<Questao> {
    const { materia, dificuldade, assunto, contexto, questoesAnteriores } = options;

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.

TAREFA: Crie UMA questão de ${materia} ${assunto ? `(Assunto: ${assunto})` : ""} para concurso Petrobras ${contexto?.nivel ? `nível ${contexto.nivel}` : ""} ${contexto?.cargo ? `(Cargo: ${contexto.cargo})` : ""}
Dificuldade: ${dificuldade || "Média"}

═══════════════════════════════════════════
ESTRUTURA OBRIGATÓRIA DO ENUNCIADO (PADRÃO CESGRANRIO REAL)
═══════════════════════════════════════════

O campo "enunciado" deve ter DUAS PARTES obrigatórias, separadas por \\n\\n:

PARTE 1 — CONTEXTUALIZAÇÃO / SITUAÇÃO-PROBLEMA (obrigatório):
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `Para LÍNGUA PORTUGUESA: Um parágrafo de 4 a 8 linhas simulando um trecho de reportagem, artigo técnico, relatório corporativo ou texto literário. Use linguagem formal e culta com estrutura sintática variada (orações subordinadas, apostos, inversões). Tema pertinente à realidade corporativa, energia ou economia brasileira.` : ""}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `Para MATEMÁTICA: Uma situação-problema realista e contextualizada no universo da Petrobras ou do mercado de trabalho (produção de barris, custos operacionais, logística, proporções, juros, estatísticas). Forneça TODOS os dados numéricos necessários. O problema deve exigir raciocínio em 2-3 etapas, não apenas uma operação trivial.` : ""}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `Para LÍNGUA INGLESA: Um parágrafo de 4 a 8 linhas EM INGLÊS, simulando um trecho de artigo técnico, relatório de mercado ou publicação do setor de energia/petróleo. Vocabulário técnico e formal. O comando da questão deve ser em PORTUGUÊS.` : ""}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `Para CONHECIMENTOS ESPECÍFICOS: Um cenário técnico/normativo realista de 4 a 8 linhas descrevendo uma situação operacional, problema técnico, aplicação de norma ou estudo de caso do cotidiano profissional do cargo "${contexto?.cargo || "técnico"}". Use terminologia técnica precisa e dados concretos.` : ""}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `Um parágrafo de 4 a 8 linhas contextualizando o tema com um cenário realista, pertinente à indústria do petróleo, energia, economia brasileira ou realidade corporativa. Use linguagem formal e dados concretos quando aplicável.` : ""}

PARTE 2 — COMANDO DA QUESTÃO (obrigatório):
Após a contextualização, uma pergunta ou instrução PRECISA e ESPECÍFICA que:
- Para Português: referencie uma palavra, expressão, trecho ou relação lógica do texto-base.
- Para Matemática: peça o resultado final de forma objetiva (ex: "o lucro, em reais, foi de").
- Para Específicas: pergunte sobre a aplicação de um conceito, norma ou procedimento do cenário.
- Para Inglês: pergunte (em português) sobre compreensão, vocabulário ou estrutura do texto em inglês.

═══════════════════════════════════════════
❌ ANTI-PADRÕES (PROIBIDO — questões assim serão REJEITADAS):
═══════════════════════════════════════════
- Frase solta sem pergunta: "A Petrobras investe em tecnologia."
- Lacuna simplória: "Apesar dos desafios, _______ medidas necessárias."
- Enunciado genérico: "Marque a alternativa correta sobre concordância verbal."
- Questão trivial de uma operação: "Quanto é 15% de 200?"

═══════════════════════════════════════════
✅ EXEMPLO DE QUESTÃO BEM ELABORADA (siga este padrão):
═══════════════════════════════════════════
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `
{
  "enunciado": "A transição energética representa um dos maiores desafios para o setor de petróleo e gás no cenário global. A Petrobras, reconhecendo a urgência dessa transformação, tem direcionado investimentos significativos para fontes renováveis de energia, <u>embora</u> o seu portfólio principal ainda dependa, em grande medida, da exploração de hidrocarbonetos nas camadas do pré-sal brasileiro. Segundo analistas do setor, a companhia precisará equilibrar a rentabilidade de curto prazo com as metas ambientais de longo prazo.\\n\\nNo período acima, a palavra destacada introduz, no contexto em que ocorre, uma oração que expressa ideia de",
  "alternativas": ["concessão, pois apresenta um fato contrário à expectativa gerada pela oração anterior.", "causa, pois justifica o motivo pelo qual a empresa investe em fontes renováveis.", "consequência, pois indica o resultado direto dos investimentos em energia limpa.", "finalidade, pois exprime o objetivo da exploração de hidrocarbonetos no pré-sal.", "condição, pois estabelece uma hipótese para a manutenção do portfólio da empresa."],
  "correta": 0,
  "explicacao": "A conjunção 'embora' é subordinativa concessiva. Introduz oração com fato contrário à expectativa da oração principal..."
}` : ""}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `
{
  "enunciado": "Uma plataforma de petróleo produz, em regime normal, 15.000 barris por dia. Devido a uma manutenção programada, a produção foi reduzida em 20% durante os primeiros 10 dias do mês e operou normalmente nos 20 dias restantes. Sabendo que cada barril é vendido a US$ 75,00 e que o custo operacional mensal fixo é de US$ 8.500.000,00, o lucro obtido naquele mês, em dólares, foi de",
  "alternativas": ["US$ 18.500.000,00", "US$ 19.250.000,00", "US$ 23.000.000,00", "US$ 24.250.000,00", "US$ 31.500.000,00"],
  "correta": 2,
  "explicacao": "Produção reduzida (10 dias): 15.000 × 0,80 = 12.000 barris/dia → 120.000 barris. Normal (20 dias): 15.000 × 20 = 300.000 barris. Total: 420.000 barris. Receita: 420.000 × 75 = US$ 31.500.000. Lucro: 31.500.000 − 8.500.000 = US$ 23.000.000."
}` : ""}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `
{
  "enunciado": "The pre-salt reserves discovered off the coast of Brazil have significantly transformed the country's position in the global energy market. Despite the inherent challenges of deep-water extraction, Petrobras has developed cutting-edge technologies that have <u>driven down</u> production costs, making these operations commercially viable even during periods of low oil prices.\\n\\nNo texto acima, a expressão destacada pode ser substituída, sem alteração de sentido, por",
  "alternativas": ["reduced, indicando a diminuição dos custos de produção.", "increased, indicando o crescimento dos custos operacionais.", "maintained, indicando a estabilidade dos custos ao longo do tempo.", "estimated, indicando uma projeção dos custos futuros.", "overlooked, indicando que os custos foram ignorados pela empresa."],
  "correta": 0,
  "explicacao": "A expressão 'driven down' é um phrasal verb que significa 'reduzir' ou 'diminuir'. O sinônimo mais adequado é 'reduced'."
}` : ""}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `
{
  "enunciado": "Em uma refinaria da Petrobras, durante uma parada programada de manutenção, a equipe de inspeção identificou corrosão sob isolamento (CUI) em uma tubulação de aço carbono que opera a 180°C transportando nafta. O laudo indicou perda de espessura de 30% em relação à espessura nominal.\\n\\nDe acordo com a NR-13 e as práticas de integridade estrutural, o procedimento correto a ser adotado é",
  "alternativas": ["interditar imediatamente o trecho afetado e substituir a tubulação antes do retorno operacional, registrando em prontuário.", "aplicar revestimento anticorrosivo e liberar para operação com monitoramento trimestral de espessura.", "reduzir a pressão de operação em 50% e manter o trecho em serviço até a próxima parada programada.", "solicitar reclassificação da tubulação para serviço em temperatura ambiente, dispensando a substituição.", "aumentar a frequência de inspeção visual para quinzenal, mantendo a operação em condições normais."],
  "correta": 0,
  "explicacao": "A NR-13 exige interdição quando a perda de espessura compromete a integridade. Com 30% de perda, o equipamento deve ser interditado e substituído."
}` : ""}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `
{
  "enunciado": "A Petrobras divulgou seu plano estratégico para o quinquênio 2025-2029, prevendo investimentos de US$ 102 bilhões, dos quais 83% serão destinados à exploração e produção de petróleo e gás natural. O documento destaca que a companhia pretende alcançar a produção de 3,2 milhões de barris de óleo equivalente por dia até 2029.\\n\\nCom base nas informações do texto, é correto afirmar que a estratégia da Petrobras para o período mencionado",
  "alternativas": ["prioriza a diversificação para fontes renováveis como principal vetor de investimento.", "concentra a maior parte dos recursos na atividade-fim de exploração e produção.", "busca reduzir a produção total em favor de margens de lucro mais elevadas.", "destina volumes equivalentes para todas as áreas de negócio da companhia.", "visa exclusivamente a manutenção dos níveis atuais de produção sem expansão."],
  "correta": 1,
  "explicacao": "O texto afirma que 83% dos investimentos serão destinados à exploração e produção, indicando concentração clara nessa atividade-fim."
}` : ""}

═══════════════════════════════════════════
REGRAS TÉCNICAS
═══════════════════════════════════════════
1. ALTERNATIVAS: 5 opções plausíveis, distintas e com nível de detalhe técnico. PROIBIDO alternativas de uma só palavra quando o contexto pede análise. Use distratores inteligentes (erros comuns de candidatos reais).
2. PROIBIDO: Não inclua NUNCA letras (A, B, C, D, E), números ou prefixos no início das alternativas.
3. GABARITO: O índice "correta" (0-4) DEVE corresponder EXATAMENTE à posição certa no array "alternativas". DISTRIBUA aleatoriamente entre os índices.
4. EXPLICAÇÃO: Detalhada, didática, com fundamentação teórica. Para Matemática, cálculo passo a passo completo.
5. FORMATAÇÃO HTML: Use <b>negrito</b>, <u>sublinhado</u>, <i>itálico</i>. NÃO use Markdown. DESTAQUES DO ENUNCIADO obrigatórios com a tag <u> (ex: <u>palavra</u>). Aplique a tag <u> APENAS UMA VEZ no texto-base. Se o comando repetir o trecho, não destaque novamente. NÃO use <b> para a palavra destacada. PROIBIDO usar <u> nas alternativas.
6. COERÊNCIA LINGUÍSTICA: Se pede "a PALAVRA destacada", destaque UMA ÚNICA PALAVRA com <u>. Para LOCUÇÃO (2+ palavras), use "a EXPRESSÃO destacada".
${
  questoesAnteriores && questoesAnteriores.length > 0
    ? `
DIVERSIDADE:
- Evite temas similares a: ${questoesAnteriores.join(" | ")}
`
    : ""
}
Retorne APENAS um JSON válido seguindo este formato:
{
  "enunciado": "TEXTO-BASE de 4-8 linhas...\\n\\nCOMANDO DA QUESTÃO preciso e específico",
  "alternativas": ["opção detalhada 1", "opção detalhada 2", "opção detalhada 3", "opção detalhada 4", "opção detalhada 5"],
  "correta": 0,
  "explicacao": "Explicação detalhada e didática",
  "assunto": "${assunto || "Geral"}",
  "dificuldade": "${dificuldade || "Média"}"
}`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return this.parseResponse(text, options);
  }

  async generateQuestionsBatch(
    options: AIProviderOptions,
    quantity: number,
  ): Promise<Questao[]> {
    const { materia, dificuldade, assunto, contexto } = options;

    // Mapeamento de matérias específicas por cargo para orientar a IA
    const materiasPorCargo: Record<string, string> = {
      "Suprimentos/Administração":
        "Logística, Gestão de Estoques, Licitações e Contratos, Noções de Administração",
      "Técnico de Operação":
        "Física, Química, Termodinâmica, Instrumentação Industrial",
      "Manutenção Mecânica":
        "Metrologia, Elementos de Máquinas, Resistência dos Materiais, Hidráulica e Pneumática",
      "Manutenção Elétrica":
        "Circuitos Elétricos, Máquinas Elétricas, Instalações Elétricas, NR-10",
      "Segurança do Trabalho":
        "Normas Regulamentadoras, EPIs e EPCs, Análise de Riscos, Higiene Ocupacional",
      "Engenheiro de Petróleo":
        "Geologia do Petróleo, Engenharia de Reservatórios, Perfuração, Elevação e Escoamento",
      "Engenheiro Mecânico":
        "Resistência dos Materiais, Termodinâmica, Mecânica dos Fluidos, Transferência de Calor",
      "Analista de Sistemas":
        "Desenvolvimento de Software, Banco de Dados, Engenharia de Software, Infraestrutura e Redes",
    };

    const isEspecificas = materia.toLowerCase().includes("espec");
    const materiasDoCargoStr = contexto?.cargo
      ? materiasPorCargo[contexto.cargo]
      : null;
    const getOrientacaoMateria = () => {
      if (!isEspecificas || !contexto?.cargo) return "";
      
      if (contexto.cargo === "Suprimentos/Administração") {
        if (materia.includes("Bloco I")) return "\n    FOCO: Bloco I - Noções de Administração, Teoria Geral da Administração, Organização e Planejamento.";
        if (materia.includes("Bloco II")) return "\n    FOCO: Bloco II - Logística, Gestão de Materiais, Gestão de Estoques e Recebimento.";
        if (materia.includes("Bloco III")) return "\n    FOCO: Bloco III - Licitações (Lei 14.133), Contratos Administrativos e Ética.";
        return `\n    IMPORTANTE: Para "${materia}", as matérias são: ${materiasPorCargo[contexto.cargo]}.`;
      }
      
      const materiasDoCargoStr = materiasPorCargo[contexto.cargo];
      return materiasDoCargoStr ? `\n    IMPORTANTE: Para Conhecimentos Específicos do cargo "${contexto?.cargo}", as matérias são: ${materiasDoCargoStr}. Distribua as questões entre esses tópicos.` : "";
    };

    const orientacaoEspecificas = getOrientacaoMateria();

    const prompt = `Você é um elaborador de provas com 20 anos de experiência na banca CESGRANRIO, especialista em concursos da Petrobras.
    
    TAREFA: Crie EXATAMENTE ${quantity} questões de ${materia} ${assunto ? `(Assunto: ${assunto})` : ""} para candidato a ${contexto?.cargo || "Geral"} nível ${contexto?.nivel || "médio"}.${orientacaoEspecificas}
    Dificuldade: ${dificuldade || "Média"}

    ═══════════════════════════════════════════
    ESTRUTURA OBRIGATÓRIA DE CADA ENUNCIADO (PADRÃO CESGRANRIO REAL)
    ═══════════════════════════════════════════

    Cada "enunciado" deve ter DUAS PARTES obrigatórias, separadas por \\n\\n:

    PARTE 1 — CONTEXTUALIZAÇÃO / SITUAÇÃO-PROBLEMA (obrigatório):
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `    Para LÍNGUA PORTUGUESA: Um parágrafo de 4 a 8 linhas simulando um trecho de reportagem, artigo técnico, relatório corporativo ou texto literário. Use linguagem formal e culta com estrutura sintática variada (orações subordinadas, apostos, inversões). O tema deve ser pertinente à realidade corporativa, energia ou economia brasileira.` : ""}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `    Para MATEMÁTICA: Uma situação-problema realista e contextualizada no universo da Petrobras ou do mercado de trabalho (produção de barris, custos operacionais, logística, proporções, juros, estatísticas de produção). Forneça TODOS os dados numéricos necessários para a resolução. O problema deve exigir raciocínio em 2-3 etapas, não apenas uma operação trivial.` : ""}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `    Para LÍNGUA INGLESA: Um parágrafo de 4 a 8 linhas EM INGLÊS, simulando um trecho de artigo técnico, relatório de mercado ou publicação especializada do setor de energia/petróleo. Use vocabulário técnico e formal. O comando da questão deve ser em PORTUGUÊS.` : ""}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `    Para CONHECIMENTOS ESPECÍFICOS: Um cenário técnico/normativo realista de 4 a 8 linhas descrevendo uma situação operacional, um problema técnico, uma aplicação de norma, ou um estudo de caso do cotidiano profissional do cargo "${contexto?.cargo || "técnico"}". Use terminologia técnica precisa e dados concretos.` : ""}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `    Um parágrafo de 4 a 8 linhas contextualizando o tema com um cenário realista, pertinente à indústria do petróleo, energia, economia brasileira ou realidade corporativa. Use linguagem formal e dados concretos quando aplicável.` : ""}

    PARTE 2 — COMANDO DA QUESTÃO (obrigatório):
    Após a contextualização, uma pergunta ou instrução PRECISA e ESPECÍFICA que:
    - Para Português: referencie uma palavra, expressão, trecho ou relação lógica do texto-base.
    - Para Matemática: peça o resultado final de forma objetiva (ex: "o lucro obtido, em reais, foi de").
    - Para Específicas: pergunte sobre a aplicação correta de um conceito, norma ou procedimento descrito no cenário.
    - Para Inglês: pergunte (em português) sobre compreensão, vocabulário ou estrutura do texto em inglês.

    ═══════════════════════════════════════════
    ❌ ANTI-PADRÕES (questões assim serão REJEITADAS):
    ═══════════════════════════════════════════
    - Frase solta sem pergunta: "A Petrobras investe em tecnologia."
    - Lacuna simplória: "Apesar dos desafios, _______ medidas necessárias."
    - Enunciado genérico: "Marque a alternativa correta sobre concordância verbal."
    - Questão de uma operação só: "Quanto é 15% de 200?"

    ═══════════════════════════════════════════
    ✅ EXEMPLOS DE QUESTÕES BEM ELABORADAS POR MATÉRIA:
    ═══════════════════════════════════════════
${materia.toLowerCase().includes("português") || materia.toLowerCase().includes("portug") ? `
    EXEMPLO (Língua Portuguesa):
    {
      "enunciado": "A transição energética representa um dos maiores desafios para o setor de petróleo e gás no cenário global. A Petrobras, reconhecendo a urgência dessa transformação, tem direcionado investimentos significativos para fontes renováveis de energia, <u>embora</u> o seu portfólio principal ainda dependa, em grande medida, da exploração de hidrocarbonetos nas camadas do pré-sal brasileiro. Segundo analistas, a companhia precisará equilibrar a rentabilidade de curto prazo com as metas ambientais de longo prazo.\\n\\nNo período acima, a palavra destacada introduz, no contexto em que ocorre, uma oração que expressa ideia de",
      "alternativas": ["concessão, pois apresenta um fato contrário à expectativa gerada pela oração anterior.", "causa, pois justifica o motivo pelo qual a empresa investe em fontes renováveis.", "consequência, pois indica o resultado direto dos investimentos em energia limpa.", "finalidade, pois exprime o objetivo da exploração de hidrocarbonetos no pré-sal.", "condição, pois estabelece uma hipótese para a manutenção do portfólio da empresa."],
      "correta": 0
    }` : ""}${materia.toLowerCase().includes("matemát") || materia.toLowerCase().includes("matemat") ? `
    EXEMPLO (Matemática):
    {
      "enunciado": "Uma plataforma de petróleo produz, em regime normal, 15.000 barris por dia. Devido a uma manutenção programada, a produção foi reduzida em 20% durante os primeiros 10 dias do mês e operou normalmente nos 20 dias restantes. Sabendo que cada barril é vendido a US$ 75,00 e que o custo operacional mensal fixo da plataforma é de US$ 8.500.000,00, o lucro obtido pela plataforma naquele mês, em dólares, foi de",
      "alternativas": ["US$ 18.500.000,00", "US$ 19.250.000,00", "US$ 20.750.000,00", "US$ 22.000.000,00", "US$ 24.250.000,00"],
      "correta": 2,
      "explicacao": "Produção reduzida (10 dias): 15.000 × 0,80 = 12.000 barris/dia → 12.000 × 10 = 120.000 barris. Produção normal (20 dias): 15.000 × 20 = 300.000 barris. Total: 420.000 barris. Receita: 420.000 × 75 = US$ 31.500.000. Lucro: 31.500.000 − 8.500.000 = US$ 23.000.000. Nota: recalculando com os valores do exemplo, verifique a coerência."
    }` : ""}${materia.toLowerCase().includes("inglês") || materia.toLowerCase().includes("ingles") || materia.toLowerCase().includes("inglesa") ? `
    EXEMPLO (Língua Inglesa):
    {
      "enunciado": "The pre-salt reserves discovered off the coast of Brazil have significantly transformed the country's position in the global energy market. Despite the inherent challenges of deep-water extraction, Petrobras has developed cutting-edge technologies that have <u>driven down</u> production costs, making these operations commercially viable even during periods of low oil prices.\\n\\nNo texto acima, a expressão destacada pode ser substituída, sem alteração de sentido, por",
      "alternativas": ["reduced, indicando a diminuição dos custos de produção.", "increased, indicando o crescimento dos custos operacionais.", "maintained, indicando a estabilidade dos custos ao longo do tempo.", "estimated, indicando uma projeção dos custos futuros.", "overlooked, indicando que os custos foram ignorados pela empresa."],
      "correta": 0
    }` : ""}${materia.toLowerCase().includes("específ") || materia.toLowerCase().includes("especif") || materia.toLowerCase().includes("bloco") ? `
    EXEMPLO (Conhecimentos Específicos):
    {
      "enunciado": "Em uma refinaria da Petrobras, durante uma parada programada de manutenção, a equipe de inspeção identificou corrosão sob isolamento (CUI) em uma tubulação de aço carbono que opera a 180°C transportando nafta. O laudo indicou perda de espessura de 30% em relação à espessura nominal. De acordo com a NR-13 e as práticas de integridade estrutural, o procedimento correto a ser adotado pela equipe de manutenção é",
      "alternativas": ["interditar imediatamente o trecho afetado e substituir a tubulação antes do retorno operacional, registrando em prontuário.", "aplicar revestimento anticorrosivo e liberar para operação com monitoramento trimestral de espessura.", "reduzir a pressão de operação em 50% e manter o trecho em serviço até a próxima parada programada.", "solicitar reclassificação da tubulação para serviço em temperatura ambiente, dispensando a substituição.", "aumentar a frequência de inspeção visual para quinzenal, mantendo a operação em condições normais."],
      "correta": 0
    }` : ""}${!materia.toLowerCase().includes("português") && !materia.toLowerCase().includes("portug") && !materia.toLowerCase().includes("matemát") && !materia.toLowerCase().includes("matemat") && !materia.toLowerCase().includes("inglês") && !materia.toLowerCase().includes("ingles") && !materia.toLowerCase().includes("inglesa") && !materia.toLowerCase().includes("específ") && !materia.toLowerCase().includes("especif") && !materia.toLowerCase().includes("bloco") ? `
    EXEMPLO (Geral):
    {
      "enunciado": "A Petrobras divulgou seu plano estratégico para o quinquênio 2025-2029, prevendo investimentos de US$ 102 bilhões, dos quais 83% serão destinados à exploração e produção de petróleo e gás natural. O documento destaca que a companhia pretende alcançar a produção de 3,2 milhões de barris de óleo equivalente por dia até 2029, consolidando sua posição entre as cinco maiores produtoras mundiais.\\n\\nCom base nas informações do texto, é correto afirmar que a estratégia da Petrobras para o período mencionado",
      "alternativas": ["prioriza a diversificação para fontes renováveis como principal vetor de investimento.", "concentra a maior parte dos recursos na atividade-fim de exploração e produção.", "busca reduzir a produção total em favor de margens de lucro mais elevadas.", "destina volumes equivalentes para todas as áreas de negócio da companhia.", "visa exclusivamente a manutenção dos níveis atuais de produção sem expansão."],
      "correta": 1
    }` : ""}

    ═══════════════════════════════════════════
    REGRAS TÉCNICAS
    ═══════════════════════════════════════════
    1. ALTERNATIVAS: 5 opções plausíveis e com nível de detalhe técnico. PROIBIDO alternativas de uma só palavra quando o contexto pede análise. Use distratores inteligentes (erros comuns de candidatos reais).
    2. PROIBIDO: NUNCA inclua letras (A, B, C, D, E), números ou prefixos no início das alternativas.
    3. UNICIDADE: Cada questão do lote deve ter contextualização e comando COMPLETAMENTE diferentes.
    4. GABARITO: O índice "correta" (0-4) DEVE corresponder EXATAMENTE à posição certa no array "alternativas". Verifique antes de finalizar.
    5. FORMATAÇÃO HTML: Use <b>, <u>, <i>. NÃO use Markdown. DESTAQUES DO ENUNCIADO obrigatórios com a tag <u> (ex: <u>palavra</u>). Aplique a tag <u> APENAS UMA VEZ no texto-base. Se o comando repetir o trecho, não destaque novamente. NÃO use <b> para a palavra destacada. PROIBIDO usar <u> nas alternativas.
    6. COERÊNCIA LINGUÍSTICA: Se pede "a PALAVRA destacada", destaque UMA ÚNICA PALAVRA com <u>. Para LOCUÇÃO, use "a EXPRESSÃO destacada".

    Retorne APENAS um JSON ARRAY:
    [
      {
        "enunciado": "CONTEXTUALIZAÇÃO de 4-8 linhas...\\n\\nCOMANDO DA QUESTÃO preciso",
        "alternativas": ["opção detalhada 1", "opção detalhada 2", "opção detalhada 3", "opção detalhada 4", "opção detalhada 5"],
        "correta": 0,
        "explicacao": "Explicação detalhada e didática",
        "assunto": "${assunto || "Geral"}",
        "dificuldade": "${dificuldade || "Média"}"
      }
    ]`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const data = JSON.parse(jsonStr);

      if (!Array.isArray(data)) {
        return [this.parseResponse(text, options)];
      }

      return data.map((q) => {
        // Sanitizar Markdown → HTML no enunciado e explicação
        q.enunciado = this.sanitizeMarkdown(q.enunciado);
        q.explicacao = this.sanitizeMarkdown(q.explicacao);

        const alternativasLimpas = q.alternativas.map((alt: string) =>
          this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
        );

        const originalCorretaText = q.alternativas[q.correta];
        const shuffled = [...alternativasLimpas];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const newCorreta = shuffled.indexOf(
          this.sanitizeMarkdown(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
        );

        return {
          ...q,
          alternativas: shuffled,
          correta: newCorreta,
          id: Date.now() + Math.random(),
          materia: options.materia,
          banca: "CESGRANRIO",
          geradaPorIA: true,
          provider: "gemini",
        };
      });
    } catch (error: any) {
      const errorMessage = error.message || "Erro desconhecido";
      console.error("[Gemini-Batch] Erro Crítico:", errorMessage);

      if (
        errorMessage.includes("429") ||
        errorMessage.toLowerCase().includes("rate limit")
      ) {
        throw new Error(
          `[Rate Limit] Gemini atingiu o limite de requisições. ${errorMessage}`,
        );
      }

      throw new Error(
        `Falha ao gerar lote de questões com Gemini: ${errorMessage}`,
      );
    }
  }

  /**
   * Sanitiza texto gerado pela IA: converte Markdown residual para HTML.
   * - _texto_ → <u>texto</u>
   * - *texto* → <b>texto</b>  
   * - **texto** → <b>texto</b>
   */
  private sanitizeMarkdown(text: string): string {
    if (!text) return text;
    // **bold** → <b>bold</b>
    let result = text.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    // *italic* → <i>italic</i> (only single asterisks, not already processed bold)
    result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<i>$1</i>');
    // _underline_ → <u>underline</u> (handles _text_ pattern from AI)
    result = result.replace(/(?<![\w])_([^_]+)_(?![\w])/g, '<u>$1</u>');
    return result;
  }

  private parseResponse(text: string, options: AIProviderOptions): Questao {
    try {
      let jsonStr = text.trim();
      const jsonMatch =
        text.match(/\{[\s\S]*\}/) || text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }

      const data = JSON.parse(jsonStr);

      // Sanitizar Markdown → HTML no enunciado e explicação
      data.enunciado = this.sanitizeMarkdown(data.enunciado);
      data.explicacao = this.sanitizeMarkdown(data.explicacao);

      const alternativasLimpas = data.alternativas.map((alt: string) =>
        this.sanitizeMarkdown(alt.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
      );

      const originalCorretaText = data.alternativas[data.correta];
      const shuffled = [...alternativasLimpas];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const newCorreta = shuffled.indexOf(
        this.sanitizeMarkdown(originalCorretaText.replace(/^[A-Ea-e][\s).:-]+/, "").trim()),
      );

      return {
        ...data,
        alternativas: shuffled,
        correta: newCorreta,
        id: Date.now() + Math.random(),
        materia: options.materia,
        banca: "CESGRANRIO",
        geradaPorIA: true,
        provider: "gemini",
      };
    } catch (error: any) {
      console.error(
        "[Gemini] Erro ao parsear JSON. Texto recebido:",
        text.substring(0, 200) + "...",
      );
      throw new Error(
        `Falha ao processar resposta do Gemini: ${error.message}`,
      );
    }
  }
}
