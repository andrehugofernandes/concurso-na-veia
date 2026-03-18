import { QuizQuestion } from "@/components/aulas/shared";

export const QUIZ_PLANEJAMENTO: Record<string, QuizQuestion[]> = {
  "modulo-1": [
    {
      id: 101,
      pergunta: "A Petrobras, ao definir sua 'Razão de Ser' no Plano Estratégico 2024-2028, está estabelecendo qual componente fundamental do planejamento?",
      opcoes: [
        { label: "A", valor: "Visão de Futuro" },
        { label: "B", valor: "Valores Corporativos" },
        { label: "C", valor: "Missão Organizacional" },
        { label: "D", valor: "Objetivos Estratégicos" },
        { label: "E", valor: "Metas Operacionais" }
      ],
      correta: "C",
      explicacao: "A Missão representa a razão de existir da organização, sua identidade e o que ela faz no presente. No caso da Petrobras, sua missão foca em atuar na indústria de energia de forma segura e sustentável."
    },
    {
      id: 102,
      pergunta: "O planejamento estratégico diferencia-se do tático e do operacional principalmente por:",
      opcoes: [
        { label: "A", valor: "Focar em tarefas de curto prazo e rotina" },
        { label: "B", valor: "Ser elaborado pela gerência de nível médio" },
        { label: "C", valor: "Ter abrangência global e foco no longo prazo" },
        { label: "D", valor: "Tratar apenas de questões financeiras e contábeis" },
        { label: "E", valor: "Ser imutável após sua primeira publicação" }
      ],
      correta: "C",
      explicacao: "O planejamento estratégico é de responsabilidade da alta administração, possui visão holística (toda a empresa) e orienta a organização para o longo prazo."
    },
    {
      id: 103,
      pergunta: "Segundo a doutrina clássica de Administração, a 'Visão' de uma empresa como a Petrobras deve ser entendida como:",
      opcoes: [
        { label: "A", valor: "Um código de ética para os funcionários" },
        { label: "B", valor: "O estado futuro desejado pela organização" },
        { label: "C", valor: "A descrição das atividades operacionais diárias" },
        { label: "D", valor: "Uma análise exclusiva do ambiente externo" },
        { label: "E", valor: "O histórico de lucros passados" }
      ],
      correta: "B",
      explicacao: "A Visão descreve onde a organização pretende chegar em um horizonte de tempo determinado. É a imagem do futuro que a empresa busca construir."
    },
    {
      id: 104,
      pergunta: "Os princípios éticos e comportamentais que guiam as decisões dos colaboradores da Petrobras são classificados como:",
      opcoes: [
        { label: "A", valor: "Estratégias de Negócio" },
        { label: "B", valor: "Vantagens Competitivas" },
        { label: "C", valor: "Valores Corporativos" },
        { label: "D", valor: "Análise PESTEL" },
        { label: "E", valor: "KPIs de Desempenho" }
      ],
      correta: "C",
      explicacao: "Valores são os princípios fundamentais, crenças e normas que orientam o comportamento e a tomada de decisão dentro de uma organização."
    },
    {
      id: 105,
      pergunta: "O nível de planejamento que desdobra as diretrizes estratégicas em planos para unidades de negócio ou departamentos é o:",
      opcoes: [
        { label: "A", valor: "Planejamento Estratégico" },
        { label: "B", valor: "Planejamento Administrativo" },
        { label: "C", valor: "Planejamento Tático" },
        { label: "D", valor: "Planejamento Operacional" },
        { label: "E", valor: "Planejamento Contingencial" }
      ],
      correta: "C",
      explicacao: "O planejamento tático é o elo entre o estratégico (global) e o operacional (tarefas), focando em unidades específicas da organização."
    },
    {
      id: 106,
      pergunta: "No contexto da gestão pública e de estatais, o planejamento estratégico serve para:",
      opcoes: [
        { label: "A", valor: "Ignorar as leis de licitação" },
        { label: "B", valor: "Garantir a eficiência e transparência no uso de recursos" },
        { label: "C", valor: "Priorizar interesses políticos em detrimento da técnica" },
        { label: "D", valor: "Eliminar a necessidade de controle externo" },
        { label: "E", valor: "Substituir o orçamento público (LOA)" }
      ],
      correta: "B",
      explicacao: "Em empresas públicas, o planejamento estratégico é vital para garantir que a missão social e os resultados econômicos sejam alcançados com transparência e eficiência."
    }
  ],
  "modulo-2": [
    {
      id: 201,
      pergunta: "Na análise SWOT da Petrobras, a descoberta de novas jazidas no Pré-Sal é classificada como uma:",
      opcoes: [
        { label: "A", valor: "Força (Strength)" },
        { label: "B", valor: "Oportunidade (Opportunity)" },
        { label: "C", valor: "Fraqueza (Weakness)" },
        { label: "D", valor: "Ameaça (Threat)" },
        { label: "E", valor: "Incerteza Crítica" }
      ],
      correta: "B",
      explicacao: "Ambiente externo (geológico/mercado) + Positivo = Oportunidade. Se a questão falasse da *capacidade tecnológica* de extrair, seria uma Força (interno)."
    },
    {
      id: 202,
      pergunta: "Um fator do ambiente INTERNO que prejudica o desempenho da organização na matriz SWOT é denominado:",
      opcoes: [
        { label: "A", valor: "Ameaça" },
        { label: "B", valor: "Oportunidade" },
        { label: "C", valor: "Fraqueza" },
        { label: "D", valor: "Risco de Mercado" },
        { label: "E", valor: "Ponto de Controle" }
      ],
      correta: "C",
      explicacao: "Fatores internos negativos são Fraquezas (Weaknesses). Exemplos: burocracia excessiva, falta de mão de obra qualificada, tecnologia obsoleta."
    },
    {
      id: 203,
      pergunta: "A variação abrupta no preço internacional do barril de petróleo (Brent) para uma empresa como a Petrobras representa:",
      opcoes: [
        { label: "A", valor: "Uma Fraqueza interna" },
        { label: "B", valor: "Uma Força estratégica" },
        { label: "C", valor: "Uma variável controlável" },
        { label: "D", valor: "Um fator do ambiente externo" },
        { label: "E", valor: "Um objetivo operacional" }
      ],
      correta: "D",
      explicacao: "Fatores macroeconômicos e preços de commodities são externos (fora do controle da empresa), podendo ser ameaças ou oportunidades dependendo da direção da variação."
    },
    {
      id: 204,
      pergunta: "Ao cruzar uma Força com uma Oportunidade no modelo SWOT (estratégia de desenvolvimento), a organização deve:",
      opcoes: [
        { label: "A", valor: "Adotar postura defensiva" },
        { label: "B", valor: "Buscar a liquidação de ativos" },
        { label: "C", valor: "Utilizar suas competências para maximizar ganhos externos" },
        { label: "D", valor: "Ignorar o ambiente externo" },
        { label: "E", valor: "Focar exclusivamente na redução de custos" }
      ],
      correta: "C",
      explicacao: "O cruzamento Força + Oportunidade gera a estratégia de 'Ofensiva' ou 'Desenvolvimento', alavancando o que a empresa faz bem para aproveitar janelas de mercado."
    },
    {
      id: 205,
      pergunta: "A principal diferença entre Forças/Fraquezas e Oportunidades/Ameaças é:",
      opcoes: [
        { label: "A", valor: "O custo de análise" },
        { label: "B", valor: "A controlabilidade dos fatores" },
        { label: "C", valor: "O nível de escolaridade dos gestores" },
        { label: "D", valor: "A cor da matriz" },
        { label: "E", valor: "A obrigatoriedade legal" }
      ],
      correta: "B",
      explicacao: "Fatores internos (S/W) são controláveis pela empresa. Fatores externos (O/T) não são controláveis, exigindo adaptação ou monitoramento."
    }
  ],
  "modulo-3": [
    {
      id: 301,
      pergunta: "O Balanced Scorecard (BSC) busca equilibrar indicadores financeiros tradicionais com indicadores não financeiros. Quais são as quatro perspectivas clássicas?",
      opcoes: [
        { label: "A", valor: "Financeira, Clientes, Logística e RH" },
        { label: "B", valor: "Comercial, Industrial, Financeira e Jurídica" },
        { label: "C", valor: "Financeira, Clientes, Processos Internos e Aprendizado/Crescimento" },
        { label: "D", valor: "Mercado, Produto, Preço e Praça" },
        { label: "E", valor: "Social, Ambiental, Econômica e Política" }
      ],
      correta: "C",
      explicacao: "As 4 perspectivas clássicas propostas por Kaplan e Norton são: Financeira, Clientes, Processos Internos e Aprendizado e Crescimento."
    },
    {
      id: 302,
      pergunta: "No BSC, a perspectiva que foca na infraestrutura necessária para atingir os objetivos das outras perspectivas (pessoas, sistemas e cultura) é a de:",
      opcoes: [
        { label: "A", valor: "Clientes" },
        { label: "B", valor: "Financeira" },
        { label: "C", valor: "Aprendizado e Crescimento" },
        { label: "D", valor: "Processos Operacionais" },
        { label: "E", valor: "Inovação Incremental" }
      ],
      correta: "C",
      explicacao: "Aprendizado e Crescimento é a base do BSC, tratando do capital humano, capital da informação e capital organizacional."
    },
    {
      id: 303,
      pergunta: "A principal ferramenta do BSC para visualizar as relações de causa e efeito entre os objetivos estratégicos é o:",
      opcoes: [
        { label: "A", valor: "Diagrama de Ishikawa" },
        { label: "B", valor: "Quadro de Avisos" },
        { label: "C", valor: "Mapa Estratégico" },
        { label: "D", valor: "Gráfico de Gantt" },
        { label: "E", valor: "Fluxograma de Processos" }
      ],
      correta: "C",
      explicacao: "O Mapa Estratégico é a representação visual da estratégia, conectando os objetivos das 4 perspectivas em uma teia de causa e efeito."
    },
    {
      id: 304,
      pergunta: "Em uma empresa de economia mista como a Petrobras, qual perspectiva do BSC costuma aparecer no TOPO do mapa estratégico para refletir o interesse público?",
      opcoes: [
        { label: "A", valor: "Financeira" },
        { label: "B", valor: "Clientes e Sociedade" },
        { label: "C", valor: "Processos Internos" },
        { label: "D", valor: "Segurança do Trabalho" },
        { label: "E", valor: "Marketing" }
      ],
      correta: "B",
      explicacao: "No setor público e organizações sem fins lucrativos, o foco final é o atendimento ao cidadão/sociedade, invertendo a lógica do setor privado onde o financeiro é o topo."
    }
  ],
  "modulo-4": [
    {
      id: 401,
      pergunta: "As três estratégias genéricas propostas por Michael Porter para obter vantagem competitiva são:",
      opcoes: [
        { label: "A", valor: "Marketing, Vendas e Finanças" },
        { label: "B", valor: "Liderança em Custo, Diferenciação e Foco (Nicho)" },
        { label: "C", valor: "Qualidade, Preço e Prazo" },
        { label: "D", valor: "Missão, Visão e Valores" },
        { label: "E", valor: "SWOT, BSC e PESTEL" }
      ],
      correta: "B",
      explicacao: "Porter define que para competir, a empresa deve escolher entre ser a mais barata (Custo), ser única/melhor (Diferenciação) ou focar em um público específico (Foco)."
    },
    {
      id: 402,
      pergunta: "A Matriz de Ansoff é utilizada para analisar:",
      opcoes: [
        { label: "A", valor: "A eficiência dos processos internos" },
        { label: "B", valor: "Estratégias de crescimento (Produto vs. Mercado)" },
        { label: "C", valor: "O nível de motivação dos funcionários" },
        { label: "D", valor: "A saúde financeira da empresa" },
        { label: "E", valor: "A estrutura organizacional" }
      ],
      correta: "B",
      explicacao: "Ansoff cruza Produtos (Existentes/Novos) com Mercados (Existentes/Novos), gerando: Penetração, Desenvolvimento de Produto, Desenvolvimento de Mercado e Diversificação."
    }
  ],
  "modulo-5": [
    {
      id: 501,
      pergunta: "Um dos maiores desafios da implementação estratégica é o 'alinhamento organizacional'. Isso significa:",
      opcoes: [
        { label: "A", valor: "Deixar todos os móveis em linha reta" },
        { label: "B", valor: "Garantir que os objetivos individuais e departamentais contribuam para a estratégia global" },
        { label: "C", valor: "Contratar apenas pessoas com o mesmo perfil" },
        { label: "D", valor: "Centralizar todas as decisões no CEO" },
        { label: "E", valor: "Manter o mesmo orçamento do ano anterior" }
      ],
      correta: "B",
      explicacao: "O alinhamento (vertical e horizontal) garante que toda a força de trabalho esteja remando na mesma direção estratégica."
    }
  ],
  "modulo-6": [
    {
      id: 601,
      pergunta: "Os indicadores de desempenho (KPIs) no controle estratégico devem ser:",
      opcoes: [
        { label: "A", valor: "O mais numerosos possível" },
        { label: "B", valor: "Complexos e de difícil leitura" },
        { label: "C", valor: "Mensuráveis, relevantes e alinhados aos objetivos" },
        { label: "D", valor: "Definidos apenas após o fim do ano" },
        { label: "E", valor: "Mantidos em segredo da equipe" }
      ],
      correta: "C",
      explicacao: "KPIs eficazes devem seguir a lógica SMART (Específicos, Mensuráveis, Atingíveis, Relevantes e com Prazo definido)."
    }
  ],
  "modulo-7": [
    {
      id: 701,
      pergunta: "O planejamento governamental no Brasil é estruturado por uma tríade orçamentária. Qual desses documentos é estratégico e de longo prazo (4 anos)?",
      opcoes: [
        { label: "A", valor: "LOA (Lei Orçamentária Anual)" },
        { label: "B", valor: "LDO (Lei de Diretrizes Orçamentárias)" },
        { label: "C", valor: "PPA (Plano Plurianual)" },
        { label: "D", valor: "Estatuto da Empresa" },
        { label: "E", valor: "Constituição Federal" }
      ],
      correta: "C",
      explicacao: "O PPA estabelece as diretrizes, objetivos e metas da administração pública para um período de 4 anos, sendo o instrumento de planejamento de médio/longo prazo."
    },
    {
      id: 702,
      pergunta: "A Lei 13.303/2016 (Lei das Estatais) trouxe exigências rigorosas para o planejamento. Segundo a lei, o Plano de Negócios deve ser atualizado:",
      opcoes: [
        { label: "A", valor: "A cada 4 anos" },
        { label: "B", valor: "Mensalmente" },
        { label: "C", valor: "Anualmente" },
        { label: "D", valor: "Somente quando houver troca de diretoria" },
        { label: "E", valor: "A cada 10 anos" }
      ],
      correta: "C",
      explicacao: "A Lei das Estatais exige a atualização anual do Plano de Negócios e da Estratégia de Longo Prazo."
    },
    {
      id: 703,
      pergunta: "O princípio da governança pública que preza pelo dever de prestar contas e assumir a responsabilidade pelas decisões tomadas é:",
      opcoes: [
        { label: "A", valor: "Transparência" },
        { label: "B", valor: "Equidade" },
        { label: "C", valor: "Accountability (Prestação de Contas)" },
        { label: "D", valor: "Conformidade" },
        { label: "E", valor: "Eficiência" }
      ],
      correta: "C",
      explicacao: "Accountability envolve a prestação de contas, a responsabilidade e o zelo pelos recursos públicos."
    }
  ],
  "modulo-8": [
    {
      id: 801,
      pergunta: "A técnica de construção de cenários visa:",
      opcoes: [
        { label: "A", valor: "Prever exatamente o que vai acontecer no futuro" },
        { label: "B", valor: "Eliminar todas as incertezas do mercado" },
        { label: "C", valor: "Explorar múltiplos futuros plausíveis para preparar a organização" },
        { label: "D", valor: "Escolher apenas um caminho e ignorar os outros" },
        { label: "E", valor: "Substituir a análise SWOT" }
      ],
      correta: "C",
      explicacao: "Planejamento por cenários não é previsão, mas sim preparação para diferentes contextos possíveis (otimista, pessimista, moderado)."
    },
    {
      id: 802,
      pergunta: "No contexto da prospecção de cenários, o termo 'Cisne Negro' (Black Swan) refere-se a um evento:",
      opcoes: [
        { label: "A", valor: "Altamente provável e de baixo impacto" },
        { label: "B", valor: "Altamente improvável, mas de impacto catastrófico" },
        { label: "C", valor: "Que ocorre todos os anos de forma cíclica" },
        { label: "D", valor: "Planejado com antecedência pela organização" },
        { label: "E", valor: "Exclusivo do ambiente interno da empresa" }
      ],
      correta: "B",
      explicacao: "Cisnes Negros são eventos raros, imprevisíveis e de grande magnitude que mudam o curso da história ou dos negócios."
    },
    {
      id: 803,
      pergunta: "As 'Incertezas Críticas' na construção de cenários são aquelas variáveis que possuem:",
      opcoes: [
        { label: "A", valor: "Baixa importância e alta previsibilidade" },
        { label: "B", valor: "Alta importância e alta previsibilidade" },
        { label: "C", valor: "Alta importância e baixa previsibilidade" },
        { label: "D", valor: "Nenhum impacto no negócio" },
        { label: "E", valor: "Certeza absoluta de ocorrência" }
      ],
      correta: "C",
      explicacao: "As incertezas críticas são o foco da construção de cenários, pois são os fatores que realmente podem mudar o futuro e que não conseguimos prever com facilidade."
    }
  ],
  "modulo-9": [
    {
      id: 901,
      pergunta: "O Plano Estratégico 2024-2028 da Petrobras destaca a 'Transição Energética Justa'. Isso reflete uma adaptação estratégica a qual tendência global?",
      opcoes: [
        { label: "A", valor: "Aumento do uso de carvão mineral" },
        { label: "B", valor: "Descarbonização e necessidade de fontes renováveis" },
        { label: "C", valor: "Fim definitivo de qualquer exploração de óleo" },
        { label: "D", valor: "Globalização de custos fixos" },
        { label: "E", valor: "Aumento da jornada de trabalho" }
      ],
      correta: "B",
      explicacao: "A transição energética é um pilar central dos novos PEs da Petrobras, visando equilibrar a exploração de fósseis com investimentos em energia limpa."
    },
    {
      id: 902,
      pergunta: "Qual é o valor total de investimento (CAPEX) previsto no Plano Estratégico 2024-2028 da Petrobras?",
      opcoes: [
        { label: "A", valor: "US$ 50 Bilhões" },
        { label: "B", valor: "US$ 102 Bilhões" },
        { label: "C", valor: "US$ 200 Bilhões" },
        { label: "D", valor: "R$ 102 Bilhões" },
        { label: "E", valor: "US$ 10 Bilhões" }
      ],
      correta: "B",
      explicacao: "O Plano 2024-2028 prevê US$ 102 bilhões em investimentos, com foco em E&P e crescimento em baixo carbono."
    },
    {
      id: 903,
      pergunta: "A missão atualizada da Petrobras é 'Prover energia que assegura prosperidade de forma ética, justa e...':",
      opcoes: [
        { label: "A", valor: "Lucrativa" },
        { label: "B", valor: "Rápida" },
        { label: "C", valor: "Segura" },
        { label: "D", valor: "Global" },
        { label: "E", valor: "Privada" }
      ],
      correta: "C",
      explicacao: "A tríade da missão é: Ética, Justa e Segura (EJS)."
    }
  ],
  "modulo-10": [
    {
      id: 1001,
      pergunta: "O conceito de 'Oceano Azul' no planejamento estratégico refere-se a:",
      opcoes: [
        { label: "A", valor: "Mercados saturados com alta concorrência" },
        { label: "B", valor: "Criação de novos mercados incontestáveis onde a competição é irrelevante" },
        { label: "C", valor: "Exploração de petróleo em águas ultra-profundas" },
        { label: "D", valor: "Estratégias de corte de gastos em logística marítima" },
        { label: "E", valor: "Aumento de impostos sobre importação" }
      ],
      correta: "B",
      explicacao: "O Oceano Azul é a estratégia de criar valor e inovação para abrir novos espaços de mercado e tornar a concorrência irrelevante."
    },
    {
      id: 1002,
      pergunta: "Segundo Henry Mintzberg, os '5 Ps' da Estratégia são: Plano, Pretexto, Posição, Perspectiva e...",
      opcoes: [
        { label: "A", valor: "Pessoas" },
        { label: "B", valor: "Processos" },
        { label: "C", valor: "Padrão (Pattern)" },
        { label: "D", valor: "Preço" },
        { label: "E", valor: "Produto" }
      ],
      correta: "C",
      explicacao: "Os 5 Ps de Mintzberg são: Plan, Ploy, Pattern, Position, Perspective."
    }
  ]
};
