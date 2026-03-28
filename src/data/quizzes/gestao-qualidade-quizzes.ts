/**
 * GESTAO_QUALIDADE_QUIZZES - Gestão de Qualidade
 * 10 módulos x 6 questões = 60 questões totais
 * IDs: 101-106 (M1), 201-206 (M2), 301-306 (M3), ... 1001-1006 (M10)
 */

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Quiz {
  id?: string;
  title: string;
  moduleNumber: number;
  questions: Question[];
}

export const GESTAO_QUALIDADE_QUIZZES: Record<string, Quiz> = {
  "modulo-1": {
    title: "Fundamentos da Qualidade",
    moduleNumber: 1,
    questions: [
      {
        id: 101,
        question:
          "Segundo a ISO 8402, a definição mais completa de qualidade é:",
        options: [
          "Ausência total de defeitos no produto final",
          "Totalidade das características que satisfazem necessidades explícitas e implícitas do cliente",
          "Conformidade com as especificações técnicas internas da empresa",
          "Grau de perfeição alcançado no processo de fabricação",
        ],
        correct: 1,
        explanation:
          "A ISO 8402 define qualidade como 'a totalidade das características de uma entidade que lhe confere a capacidade de satisfazer necessidades explícitas e implícitas'. Isso vai além da simples ausência de defeitos — inclui atender às expectativas não declaradas do cliente.",
      },
      {
        id: 102,
        question:
          "A evolução histórica da qualidade segue a sequência correta:",
        options: [
          "TQM → Garantia da qualidade → CEP → Inspeção",
          "CEP → Inspeção → Garantia da qualidade → TQM",
          "Inspeção → CEP → Garantia da qualidade → TQM",
          "Garantia da qualidade → Inspeção → TQM → CEP",
        ],
        correct: 2,
        explanation:
          "A evolução cronológica da qualidade: (1) Inspeção — séc. XIX/início XX, verificação pós-produção; (2) CEP — 1920s, Shewhart, controle durante o processo; (3) Garantia da qualidade — 1950s, sistemas e procedimentos preventivos; (4) TQM — 1980s, gestão total envolvendo toda a organização.",
      },
      {
        id: 103,
        question:
          "W. Edwards Deming é reconhecido principalmente por qual contribuição à gestão da qualidade?",
        options: [
          "Conceito de 'zero defeitos' e qualidade como custo-benefício",
          "Trilogia da qualidade: planejamento, controle e melhoria",
          "Os 14 pontos de gestão e o Ciclo PDCA como ferramenta de melhoria contínua",
          "Criação dos círculos de qualidade e diagrama de causa-efeito",
        ],
        correct: 2,
        explanation:
          "Deming é famoso pelos 14 pontos de gestão (foco em liderança e sistema) e por popularizar o Ciclo PDCA (Plan-Do-Check-Act) como ferramenta central de melhoria contínua. Ele transformou a indústria japonesa no pós-guerra. A trilogia é de Juran; zero defeitos é de Crosby; círculos de qualidade são de Ishikawa.",
      },
      {
        id: 104,
        question:
          "As 8 dimensões da qualidade de David Garvin incluem desempenho, confiabilidade e conformidade. Qual outro par de dimensões faz parte deste modelo?",
        options: [
          "Inovação e custo de produção",
          "Durabilidade e qualidade percebida",
          "Velocidade de entrega e flexibilidade",
          "Padronização e rastreabilidade",
        ],
        correct: 1,
        explanation:
          "As 8 dimensões de Garvin são: desempenho, características, confiabilidade, conformidade, durabilidade, atendimento (serviço pós-venda), estética e qualidade percebida. Durabilidade (quanto tempo o produto funciona) e qualidade percebida (imagem/reputação da marca) são duas delas.",
      },
      {
        id: 105,
        question:
          "Joseph Juran desenvolveu a 'Trilogia da Qualidade'. Quais são os três componentes corretos dessa trilogia?",
        options: [
          "Inspeção, controle e auditoria",
          "Planejamento, controle e melhoria da qualidade",
          "Projeto, produção e entrega",
          "Prevenção, detecção e correção",
        ],
        correct: 1,
        explanation:
          "A Trilogia de Juran consiste em: (1) Planejamento da qualidade — definir requisitos e processos; (2) Controle da qualidade — monitorar e comparar com padrões; (3) Melhoria da qualidade — identificar e eliminar problemas cronicamente. Esta estrutura influenciou profundamente as normas ISO.",
      },
      {
        id: 106,
        question:
          "No contexto da Petrobras, a gestão da qualidade assume importância crítica especialmente porque:",
        options: [
          "Reduz os custos administrativos do setor financeiro",
          "Falhas de qualidade em operações de O&G podem causar desastres ambientais, acidentes e prejuízos bilionários",
          "É exigência apenas dos clientes internacionais da companhia",
          "Aumenta a velocidade de produção de petróleo em plataformas",
        ],
        correct: 1,
        explanation:
          "Em Óleo & Gás, a qualidade é mandatória por segurança operacional: falhas em dutos, válvulas ou equipamentos podem causar explosões, derramamentos de óleo (como o caso Deepwater Horizon nos EUA) e contaminação ambiental irreversível. O custo de uma não-conformidade em O&G vai muito além do financeiro — inclui vidas humanas e ecossistemas.",
      },
    ],
  },

  "modulo-2": {
    title: "Normas ISO 9001:2015",
    moduleNumber: 2,
    questions: [
      {
        id: 201,
        question:
          "A estrutura de Alto Nível (HLS) da ISO 9001:2015 organiza seus requisitos em quantas cláusulas?",
        options: ["7 cláusulas", "8 cláusulas", "10 cláusulas", "12 cláusulas"],
        correct: 2,
        explanation:
          "A ISO 9001:2015 usa a Estrutura de Alto Nível (High Level Structure - HLS) com 10 cláusulas: 1-Escopo, 2-Referências normativas, 3-Termos e definições, 4-Contexto, 5-Liderança, 6-Planejamento, 7-Apoio, 8-Operação, 9-Avaliação de desempenho, 10-Melhoria. Essa estrutura é comum a todas as normas ISO de sistemas de gestão.",
      },
      {
        id: 202,
        question:
          "Qual dos seguintes NÃO é um dos 7 princípios da Gestão da Qualidade estabelecidos pela ISO 9001:2015?",
        options: [
          "Foco no cliente",
          "Abordagem de processo",
          "Decisão baseada em evidências",
          "Maximização do lucro operacional",
        ],
        correct: 3,
        explanation:
          "Os 7 princípios da Gestão da Qualidade ISO são: (1) Foco no cliente; (2) Liderança; (3) Engajamento das pessoas; (4) Abordagem de processo; (5) Melhoria; (6) Decisão baseada em evidências; (7) Gestão de relacionamento. Maximização de lucro não é um princípio — a ISO foca em qualidade e satisfação do cliente.",
      },
      {
        id: 203,
        question:
          "Na ISO 9001:2015, o conceito de 'pensamento baseado em risco' significa que a organização deve:",
        options: [
          "Criar um departamento dedicado exclusivamente à gestão de riscos",
          "Identificar riscos e oportunidades que podem afetar o SGQ e tomar ações proporcionais",
          "Eliminar completamente todos os riscos antes de iniciar qualquer processo",
          "Contratar auditorias externas mensais para avaliar riscos",
        ],
        correct: 1,
        explanation:
          "Pensamento baseado em risco na ISO 9001:2015 não exige um departamento específico — é uma mentalidade que permeia o SGQ. A organização deve identificar sistematicamente riscos (que podem causar desvios) e oportunidades (para melhoria), e tomar ações preventivas proporcionais à sua magnitude.",
      },
      {
        id: 204,
        question:
          "Como o Ciclo PDCA se mapeia nas cláusulas da ISO 9001:2015?",
        options: [
          "Plan=cláusulas 4-7, Do=cláusula 8, Check=cláusula 9, Act=cláusula 10",
          "Plan=cláusula 5, Do=cláusulas 6-8, Check=cláusulas 9-10, Act=cláusula 4",
          "Plan=cláusula 6, Do=cláusulas 7-9, Check=cláusula 10, Act=cláusula 4",
          "Plan=cláusulas 8-9, Do=cláusula 10, Check=cláusulas 4-5, Act=cláusulas 6-7",
        ],
        correct: 0,
        explanation:
          "O PDCA na ISO 9001:2015: PLAN (Planejar) = cláusulas 4-7 (contexto, liderança, planejamento, apoio); DO (Fazer) = cláusula 8 (operação — execução dos processos); CHECK (Verificar) = cláusula 9 (avaliação de desempenho); ACT (Agir) = cláusula 10 (melhoria). Essa estrutura garante ciclos de melhoria contínua.",
      },
      {
        id: 205,
        question:
          "Uma auditoria de certificação ISO 9001 é considerada auditoria de:",
        options: [
          "Primeira parte — realizada pela própria organização",
          "Segunda parte — realizada por clientes ou partes interessadas",
          "Terceira parte — realizada por organismo acreditado e independente",
          "Quarta parte — realizada por órgãos governamentais",
        ],
        correct: 2,
        explanation:
          "As auditorias de certificação ISO são de TERCEIRA PARTE, realizadas por organismos de certificação acreditados (ex: Bureau Veritas, SGS, DNV). São independentes e imparciais. Auditoria interna = 1ª parte; auditoria de cliente = 2ª parte. Não existe auditoria de 4ª parte.",
      },
      {
        id: 206,
        question:
          "A cláusula 4 (Contexto da Organização) da ISO 9001:2015 exige que a organização:",
        options: [
          "Apenas defina sua política da qualidade e objetivos",
          "Compreenda questões internas/externas e partes interessadas relevantes para o SGQ",
          "Estabeleça um orçamento específico para o sistema de gestão da qualidade",
          "Nomeie um representante da qualidade com poderes exclusivos",
        ],
        correct: 1,
        explanation:
          "A cláusula 4 exige: (1) Entender o contexto — questões internas (cultura, recursos) e externas (mercado, regulações) que afetam o SGQ; (2) Identificar partes interessadas (clientes, fornecedores, reguladores) e seus requisitos. Essa análise de contexto fundamenta todo o sistema de gestão.",
      },
    ],
  },

  "modulo-3": {
    title: "Ferramentas da Qualidade",
    moduleNumber: 3,
    questions: [
      {
        id: 301,
        question:
          "O Diagrama de Ishikawa (espinha de peixe) é utilizado para:",
        options: [
          "Medir a frequência de ocorrência de defeitos ao longo do tempo",
          "Identificar e organizar as causas potenciais de um problema ou efeito",
          "Mostrar a correlação entre duas variáveis numéricas",
          "Apresentar a distribuição estatística dos dados de processo",
        ],
        correct: 1,
        explanation:
          "O Diagrama de Ishikawa (também chamado Diagrama de Causa-Efeito ou espinha de peixe) organiza visualmente as causas de um problema. As 6 categorias (6M) são: Mão de obra, Máquina, Método, Material, Meio ambiente e Medição. É usado em brainstorming para identificar raízes de problemas.",
      },
      {
        id: 302,
        question:
          "O Princípio de Pareto aplicado à qualidade afirma que:",
        options: [
          "100% dos defeitos têm causas igualmente importantes",
          "Aproximadamente 80% dos problemas são causados por 20% das causas",
          "O processo é capaz quando a variabilidade é inferior a 20%",
          "O controle estatístico elimina 80% das não-conformidades",
        ],
        correct: 1,
        explanation:
          "O Princípio de Pareto (80/20) na qualidade: aproximadamente 80% dos defeitos são causados por apenas 20% das causas. O Diagrama de Pareto é um gráfico de barras decrescentes que identifica os 'poucos vitais' (causas que mais impactam) versus os 'muitos triviais'. Foca os esforços onde há maior retorno.",
      },
      {
        id: 303,
        question:
          "Uma Folha de Verificação é uma ferramenta da qualidade que serve principalmente para:",
        options: [
          "Analisar estatisticamente a capacidade de um processo produtivo",
          "Verificar a conformidade de produtos com especificações da ISO 9001",
          "Estruturar a coleta de dados de forma sistemática e organizada",
          "Criar fluxogramas de processos para treinamento de operadores",
        ],
        correct: 2,
        explanation:
          "A Folha de Verificação é um formulário estruturado para coleta de dados de forma fácil e sistemática. Ela garante que os dados sejam coletados de maneira consistente, facilitando análises posteriores. Exemplo: registrar a frequência de tipos de defeitos em um turno de produção.",
      },
      {
        id: 304,
        question:
          "Um Histograma na gestão da qualidade é usado para:",
        options: [
          "Mostrar a sequência cronológica de falhas em um processo",
          "Identificar relações de causa e efeito entre variáveis",
          "Visualizar a distribuição de frequência de dados e identificar variabilidade",
          "Priorizar ações corretivas por ordem de impacto financeiro",
        ],
        correct: 2,
        explanation:
          "O Histograma mostra a distribuição de frequência de um conjunto de dados dividido em intervalos (classes). Permite visualizar a forma da distribuição (normal, assimétrica), identificar variabilidade e verificar se o processo está centrado nas especificações. É fundamental para CEP.",
      },
      {
        id: 305,
        question:
          "O Diagrama de Dispersão é a ferramenta adequada quando se deseja:",
        options: [
          "Mapear o fluxo de atividades em um processo de negócio",
          "Investigar se existe correlação entre duas variáveis quantitativas",
          "Separar os dados por categorias para comparação entre turnos",
          "Calcular os limites de controle de uma carta de controle",
        ],
        correct: 1,
        explanation:
          "O Diagrama de Dispersão (ou gráfico XY) plota duas variáveis quantitativas para verificar se existe correlação: positiva (ambas sobem juntas), negativa (uma sobe e outra cai) ou nenhuma. Exemplo: verificar se a temperatura do forno (X) está correlacionada com a dureza do produto (Y).",
      },
      {
        id: 306,
        question:
          "Qual das 7 ferramentas clássicas da qualidade representa visualmente as etapas sequenciais de um processo, incluindo decisões e fluxos alternativos?",
        options: [
          "Diagrama de Pareto",
          "Carta de Controle",
          "Fluxograma",
          "Diagrama de Dispersão",
        ],
        correct: 2,
        explanation:
          "O Fluxograma mapeia visualmente as etapas de um processo usando símbolos padronizados: retângulos (atividades), losangos (decisões), setas (fluxo), círculos (início/fim). Permite identificar redundâncias, gargalos e pontos de melhoria no processo.",
      },
    ],
  },

  "modulo-4": {
    title: "TQM - Gestão Total da Qualidade",
    moduleNumber: 4,
    questions: [
      {
        id: 401,
        question:
          "A Gestão Total da Qualidade (TQM) se diferencia das abordagens anteriores porque:",
        options: [
          "Foca exclusivamente no controle estatístico da linha de produção",
          "Envolve toda a organização — todos os departamentos e colaboradores — na responsabilidade pela qualidade",
          "Delega a qualidade apenas ao departamento de controle de qualidade",
          "Aplica-se somente a empresas de manufatura, não a serviços",
        ],
        correct: 1,
        explanation:
          "TQM (Total Quality Management) é uma filosofia de gestão onde qualidade não é responsabilidade de um setor específico, mas de TODOS. Cada colaborador, do CEO ao operador, tem papel na qualidade. A palavra 'Total' significa: todos os processos, todas as pessoas, toda a cadeia de valor.",
      },
      {
        id: 402,
        question:
          "O Kaizen, conceito central do TQM originado no Japão (Toyota), significa:",
        options: [
          "Redesenho radical e completo de processos para obter ganhos máximos",
          "Melhoria contínua incremental, com pequenas melhorias diárias realizadas por todos",
          "Sistema de produção enxuta (Lean) focado em eliminação de estoques",
          "Ferramenta de benchmarking para comparação com concorrentes globais",
        ],
        correct: 1,
        explanation:
          "Kaizen (改善) significa 'mudança para melhor' em japonês. É a filosofia de melhoria contínua com pequenas melhorias incrementais e diárias, realizadas por todos os colaboradores. Diferente da reengenharia (mudança radical), o Kaizen busca evolução gradual e sustentável. É a base do Sistema Toyota de Produção.",
      },
      {
        id: 403,
        question:
          "O programa 5S é uma ferramenta TQM originada no Japão. Qual sequência correta dos 5 sensos?",
        options: [
          "Seiri, Seiton, Seiso, Seiketsu, Shitsuke",
          "Seiton, Seiri, Shitsuke, Seiso, Seiketsu",
          "Seiso, Seiton, Seiri, Shitsuke, Seiketsu",
          "Shitsuke, Seiso, Seiton, Seiketsu, Seiri",
        ],
        correct: 0,
        explanation:
          "Os 5S em ordem são: (1) Seiri = Classificar/Utilização — separar o necessário do desnecessário; (2) Seiton = Ordenar/Organização — um lugar para cada coisa; (3) Seiso = Limpar/Limpeza — manter limpo; (4) Seiketsu = Padronizar/Saúde — criar padrões dos 3S anteriores; (5) Shitsuke = Disciplinar/Autodisciplina — manter os padrões.",
      },
      {
        id: 404,
        question:
          "O conceito de Poka-Yoke no TQM refere-se a:",
        options: [
          "Treinamento intensivo para operadores eliminarem erros humanos",
          "Dispositivo ou mecanismo que torna fisicamente impossível cometer certos erros",
          "Sistema de incentivos financeiros para operadores com zero defeito",
          "Método de inspeção 100% ao final da linha de produção",
        ],
        correct: 1,
        explanation:
          "Poka-Yoke (ポカヨケ) significa 'à prova de erros' em japonês, criado por Shigeo Shingo. São dispositivos ou procedimentos que tornam fisicamente impossível cometer erros: o conector USB só encaixa de um jeito, a embalagem assimétrica impede montagem invertida. Elimina erros na fonte, não apenas os detecta.",
      },
      {
        id: 405,
        question:
          "Benchmarking no TQM é uma prática que consiste em:",
        options: [
          "Analisar os custos da qualidade internamente para reduzir desperdícios",
          "Comparar sistematicamente processos e práticas da empresa com os melhores do setor",
          "Estabelecer metas internas de qualidade baseadas no desempenho histórico",
          "Criar padrões de qualidade mínimos para todos os fornecedores",
        ],
        correct: 1,
        explanation:
          "Benchmarking é o processo de comparar as práticas, processos e desempenho da organização com os melhores da classe (best-in-class), seja dentro do setor ou em outros setores. Permite identificar gaps e 'emprestar' as melhores práticas. Tipos: competitivo (vs concorrentes), funcional (vs outras indústrias), interno (vs outras unidades).",
      },
      {
        id: 406,
        question:
          "Qual é a diferença fundamental entre TQC (Total Quality Control) e TQM (Total Quality Management)?",
        options: [
          "TQC é mais moderno e completo, enquanto TQM é uma abordagem ultrapassada",
          "TQC foca no controle técnico dos processos; TQM é uma filosofia de gestão estratégica que envolve toda a organização",
          "TQM aplica-se apenas a serviços, enquanto TQC é exclusivo da manufatura",
          "Não há diferença significativa — são termos intercambiáveis",
        ],
        correct: 1,
        explanation:
          "TQC (Total Quality Control) foi desenvolvido nos EUA por Feigenbaum nos anos 1950s — foca no controle técnico e sistemático da qualidade em todos os departamentos. TQM vai além: é uma filosofia de gestão estratégica que envolve liderança, cultura organizacional, estratégia e todas as partes interessadas. TQM = TQC + dimensão estratégica/cultural.",
      },
    ],
  },

  "modulo-5": {
    title: "Controle Estatístico de Processos (CEP / 6σ)",
    moduleNumber: 5,
    questions: [
      {
        id: 501,
        question:
          "No CEP, qual é a diferença entre 'causas comuns' e 'causas especiais' de variação?",
        options: [
          "Causas comuns são graves e exigem ação imediata; causas especiais são normais do processo",
          "Causas comuns são variações aleatórias inerentes ao processo; causas especiais são variações identificáveis e controláveis",
          "Causas comuns vêm dos operadores; causas especiais vêm das máquinas",
          "Causas comuns são externas à empresa; causas especiais são internas",
        ],
        correct: 1,
        explanation:
          "Variação por causas comuns (ou aleatórias) é inerente ao processo — resultado de muitos fatores pequenos e inevitáveis. O processo está 'sob controle estatístico'. Variação por causas especiais (ou atribuíveis) tem origem identificável e específica (quebra de máquina, lote de matéria-prima defeituoso). Exige investigação e ação corretiva.",
      },
      {
        id: 502,
        question:
          "As Cartas de Controle de Shewhart estabelecem limites de controle baseados em:",
        options: [
          "Especificações técnicas do produto definidas pelo cliente",
          "Três desvios-padrão (±3σ) da média do processo",
          "Os valores mínimo e máximo historicamente observados",
          "Normas regulatórias específicas do setor industrial",
        ],
        correct: 1,
        explanation:
          "As cartas de controle de Shewhart usam ±3σ (três desvios-padrão) como limites: Limite Superior de Controle (LSC) = média + 3σ e Limite Inferior de Controle (LIC) = média - 3σ. Um ponto fora desses limites indica variação por causa especial. Esses limites são calculados a partir dos próprios dados do processo, não das especificações do cliente.",
      },
      {
        id: 503,
        question:
          "Os índices Cp e Cpk são usados para avaliar a capacidade de um processo. Um processo é considerado capaz quando:",
        options: [
          "Cp > 0,5 e Cpk > 0,5",
          "Cp ≥ 1,00 e Cpk ≥ 1,00 (idealmente ≥ 1,33 para Seis Sigma)",
          "Cp = Cpk independentemente do valor absoluto",
          "A média do processo está exatamente no centro das especificações",
        ],
        correct: 1,
        explanation:
          "Cp mede a capacidade potencial (largura da especificação / variabilidade do processo). Cpk mede a capacidade real considerando o centramento. Para Seis Sigma, exige-se Cp e Cpk ≥ 1,33 (equivalente a ≥ 4σ de margem). Valores abaixo de 1,00 indicam processo incapaz — gerando não-conformidades sistematicamente.",
      },
      {
        id: 504,
        question:
          "A metodologia DMAIC do Seis Sigma segue as etapas na ordem correta:",
        options: [
          "Design, Measure, Analyze, Implement, Control",
          "Define, Measure, Analyze, Improve, Control",
          "Detect, Monitor, Assess, Implement, Complete",
          "Define, Map, Analyze, Improve, Certify",
        ],
        correct: 1,
        explanation:
          "DMAIC do Seis Sigma: (D) Define — definir o problema e os objetivos; (M) Measure — medir o desempenho atual do processo; (A) Analyze — analisar dados para identificar causas raiz; (I) Improve — implementar soluções para eliminar causas; (C) Control — controlar o novo processo para sustentar melhorias.",
      },
      {
        id: 505,
        question:
          "No Seis Sigma, quantos defeitos por milhão de oportunidades (DPMO) correspondem ao nível 6σ?",
        options: ["66.807 DPMO", "6.210 DPMO", "3,4 DPMO", "0,001 DPMO"],
        correct: 2,
        explanation:
          "O nível Seis Sigma (6σ) corresponde a apenas 3,4 DPMO (Defeitos Por Milhão de Oportunidades) — considerando um deslocamento de 1,5σ da média. Para referência: 3σ = 66.807 DPMO; 4σ = 6.210 DPMO; 5σ = 233 DPMO; 6σ = 3,4 DPMO. Na prática, a maioria das empresas opera entre 3σ e 4σ.",
      },
      {
        id: 506,
        question:
          "O Lean Six Sigma combina duas abordagens complementares. Qual afirmação descreve corretamente essa combinação?",
        options: [
          "Lean foca em reduzir variação estatística; Six Sigma elimina desperdícios de processo",
          "Lean elimina desperdícios e atividades sem valor agregado; Six Sigma reduz variação e defeitos",
          "Lean é para serviços e Six Sigma para manufatura",
          "Lean usa DMAIC e Six Sigma usa PDCA como metodologias",
        ],
        correct: 1,
        explanation:
          "Lean Six Sigma combina: (1) Lean — filosofia de eliminação de desperdícios (Muda) e atividades sem valor agregado, tornando o processo mais ágil e eficiente; (2) Six Sigma — metodologia científica (DMAIC) para reduzir variação e defeitos usando análise estatística. Juntos, geram processos rápidos (Lean) e precisos (Six Sigma).",
      },
    ],
  },

  "modulo-6": {
    title: "Auditoria da Qualidade",
    moduleNumber: 6,
    questions: [
      {
        id: 601,
        question:
          "Na classificação das auditorias da qualidade, uma auditoria de certificação ISO 9001 realizada por organismo acreditado é auditoria de:",
        options: [
          "Primeira parte (auditoria interna)",
          "Segunda parte (auditoria de fornecedor)",
          "Terceira parte (auditoria de certificação)",
          "Quarta parte (auditoria governamental)",
        ],
        correct: 2,
        explanation:
          "As auditorias são classificadas em: 1ª parte = interna (a empresa audita a si mesma); 2ª parte = de cliente (um cliente audita seu fornecedor) ou de fornecedor; 3ª parte = independente por organismo acreditado para certificação (ex: ISO 9001). Auditorias de 3ª parte têm maior credibilidade por serem imparciais.",
      },
      {
        id: 602,
        question:
          "O processo de auditoria da qualidade segue sequência de etapas. Qual representa a ordem correta?",
        options: [
          "Execução → Planejamento → Relatório → Acompanhamento",
          "Planejamento → Execução → Relatório → Acompanhamento",
          "Relatório → Planejamento → Execução → Acompanhamento",
          "Planejamento → Relatório → Execução → Acompanhamento",
        ],
        correct: 1,
        explanation:
          "O processo de auditoria segue: (1) Planejamento — definir escopo, critérios, equipe, cronograma; (2) Execução — coleta de evidências via entrevistas, observações e análise de documentos; (3) Relatório — comunicar constatações, não-conformidades e oportunidades de melhoria; (4) Acompanhamento — verificar implementação das ações corretivas.",
      },
      {
        id: 603,
        question:
          "Em uma auditoria da qualidade, 'evidência objetiva' é definida como:",
        options: [
          "A opinião do auditor experiente sobre a conformidade do processo",
          "Dados verificáveis baseados em fatos, obtidos por observação, medição, ensaio ou outros meios",
          "Documentos aprovados pela alta direção como evidência de conformidade",
          "Qualquer informação fornecida pelos auditados durante as entrevistas",
        ],
        correct: 1,
        explanation:
          "Evidência objetiva são dados verificáveis e baseados em fatos — não opiniões. Incluem: documentos e registros (procedimentos, relatórios), observações diretas do auditor, resultados de medições e ensaios, declarações verificáveis. A auditoria deve ser baseada em evidências, não em impressões subjetivas.",
      },
      {
        id: 604,
        question:
          "Qual é a diferença entre uma 'não-conformidade' e uma 'oportunidade de melhoria' identificada em auditoria?",
        options: [
          "Não há diferença prática — ambas exigem ação corretiva obrigatória",
          "Não-conformidade é o não atendimento a um requisito específico; oportunidade de melhoria é uma sugestão sem requisito violado",
          "Oportunidade de melhoria é mais grave e exige prazo menor para resolução",
          "Não-conformidade é identificada apenas em auditorias internas; oportunidades em auditorias externas",
        ],
        correct: 1,
        explanation:
          "Não-conformidade: não atendimento a um requisito específico (norma, procedimento, especificação) — exige ação corretiva obrigatória com prazo. Observação: potencial risco ou tendência antes de virar não-conformidade. Oportunidade de melhoria: processo funciona conforme requisitos, mas pode ser aprimorado — ação é opcional/recomendada.",
      },
      {
        id: 605,
        question:
          "Um auditor líder de qualidade deve possuir qual característica fundamental para garantir a validade de suas constatações?",
        options: [
          "Experiência mínima de 20 anos no setor auditado",
          "Independência e imparcialidade em relação à área auditada",
          "Poder hierárquico superior aos auditados para garantir cooperação",
          "Conhecimento apenas das normas ISO, sem necessidade de conhecer o processo",
        ],
        correct: 1,
        explanation:
          "A independência e imparcialidade são requisitos fundamentais do auditor — ele não pode auditar sua própria área de trabalho. Isso garante objetividade e credibilidade das constatações. Outros requisitos: competência técnica, conhecimento da norma, habilidades de comunicação e entrevista. A experiência no setor é desejável mas não obrigatória.",
      },
      {
        id: 606,
        question:
          "Um Programa de Auditoria em uma organização ISO 9001 certificada deve contemplar, no mínimo:",
        options: [
          "Uma auditoria por dia em todas as áreas simultaneamente",
          "Cronograma anual cobrindo todos os processos do SGQ, com frequência baseada em importância e risco",
          "Apenas auditorias nas áreas com histórico de não-conformidades anteriores",
          "Auditorias aleatórias sem planejamento prévio para simular situações reais",
        ],
        correct: 1,
        explanation:
          "O Programa de Auditoria Interna (cláusula 9.2 da ISO 9001) deve: ter cronograma que cubra todos os processos do SGQ; definir frequência baseada na importância e risco do processo; especificar escopo, critérios e auditores para cada auditoria; documentar resultados. Processos críticos ou com histórico de problemas devem ser auditados com maior frequência.",
      },
    ],
  },

  "modulo-7": {
    title: "Qualidade em Serviços",
    moduleNumber: 7,
    questions: [
      {
        id: 701,
        question:
          "O modelo SERVQUAL, desenvolvido por Parasuraman, Zeithaml e Berry, avalia a qualidade em serviços por meio de:",
        options: [
          "7 dimensões de qualidade adaptadas do modelo de Garvin para serviços",
          "5 dimensões: Tangíveis, Confiabilidade, Responsividade, Segurança e Empatia",
          "3 gaps principais entre expectativa do cliente e desempenho da empresa",
          "10 critérios baseados nas normas ISO 9001 aplicadas ao setor de serviços",
        ],
        correct: 1,
        explanation:
          "O SERVQUAL mede a qualidade de serviço por 5 dimensões: (1) Tangíveis — instalações físicas, equipamentos, aparência do pessoal; (2) Confiabilidade — capacidade de entregar o serviço prometido com precisão; (3) Responsividade — disposição para ajudar e fornecer serviço rápido; (4) Segurança (Assurance) — conhecimento e cortesia, capacidade de inspirar confiança; (5) Empatia — atenção individualizada ao cliente.",
      },
      {
        id: 702,
        question:
          "O 'GAP Model' (Modelo de Lacunas) em qualidade de serviços identifica o Gap 5 como:",
        options: [
          "Diferença entre a percepção da gerência sobre expectativas do cliente e as especificações do serviço",
          "Diferença entre o serviço especificado e o serviço efetivamente entregue",
          "Diferença entre a expectativa do cliente e sua percepção do serviço recebido",
          "Diferença entre o serviço prometido na propaganda e o serviço entregue",
        ],
        correct: 2,
        explanation:
          "O Gap 5 (lacuna do cliente) é o mais importante: diferença entre o serviço que o cliente ESPERAVA receber e o serviço que ele PERCEBEU ter recebido. É o resultado final de todos os outros gaps internos da empresa. Qualidade percebida = expectativa vs percepção. Se percepção ≥ expectativa, o cliente ficou satisfeito.",
      },
      {
        id: 703,
        question:
          "Os serviços se diferenciam dos produtos físicos por quatro características básicas. Qual das opções abaixo as identifica corretamente?",
        options: [
          "Tangibilidade, Armazenabilidade, Homogeneidade, Separabilidade",
          "Intangibilidade, Inseparabilidade, Variabilidade e Perecibilidade",
          "Padronização, Durabilidade, Transportabilidade e Mensurabilidade",
          "Customização, Qualidade, Velocidade e Confiabilidade",
        ],
        correct: 1,
        explanation:
          "Os 4 atributos que distinguem serviços de produtos: (1) Intangibilidade — não podem ser tocados antes de comprados; (2) Inseparabilidade — produção e consumo simultâneos; (3) Variabilidade (Heterogeneidade) — qualidade varia conforme quem presta e quando; (4) Perecibilidade — não podem ser estocados. Esses atributos criam desafios únicos para a gestão da qualidade em serviços.",
      },
      {
        id: 704,
        question:
          "O NPS (Net Promoter Score) classifica os clientes em três categorias. Qual classificação correta?",
        options: [
          "Satisfeitos (9-10), Indiferentes (7-8), Insatisfeitos (0-6)",
          "Promotores (9-10), Neutros/Passivos (7-8), Detratores (0-6)",
          "Defensores (8-10), Neutros (5-7), Críticos (0-4)",
          "Fidelizados (10), Satisfeitos (7-9), Potencialmente perdidos (0-6)",
        ],
        correct: 1,
        explanation:
          "O NPS classifica clientes em uma escala de 0-10: Promotores (notas 9-10) — clientes leais que recomendam ativamente; Neutros/Passivos (notas 7-8) — satisfeitos mas vulneráveis à concorrência; Detratores (notas 0-6) — insatisfeitos que podem prejudicar a reputação. NPS = %Promotores - %Detratores. Varia de -100 a +100.",
      },
      {
        id: 705,
        question:
          "Na Petrobras, a qualidade de serviços internos (como suprimento e manutenção) pode ser medida usando SERVQUAL aplicado a clientes internos. Qual dimensão SERVQUAL seria mais crítica para o serviço de manutenção de plataformas?",
        options: [
          "Tangíveis — aparência física dos técnicos de manutenção",
          "Empatia — atenção personalizada ao operador da plataforma",
          "Confiabilidade — realizar a manutenção prometida com precisão e no prazo correto",
          "Responsividade — velocidade de resposta às solicitações de manutenção",
        ],
        correct: 2,
        explanation:
          "Para manutenção de plataformas de petróleo, a Confiabilidade é a dimensão mais crítica: a manutenção DEVE ser realizada conforme prometido, no prazo e com precisão — uma manutenção mal executada ou atrasada pode causar falhas de equipamento, parada de produção e riscos de segurança. Embora a responsividade também seja importante, a confiabilidade é fundamental.",
      },
      {
        id: 706,
        question:
          "'Momentos da verdade' em qualidade de serviços referem-se a:",
        options: [
          "Momentos em que a empresa revela ao cliente sua política de preços",
          "Cada interação ou contato entre o cliente e qualquer aspecto da empresa que forma sua percepção",
          "Reuniões periódicas para avaliação da satisfação do cliente",
          "Situações de crise ou reclamação que testam a resiliência da empresa",
        ],
        correct: 1,
        explanation:
          "Jan Carlzon (SAS Airlines) popularizou o conceito: 'momento da verdade' é cada instante em que o cliente entra em contato com qualquer aspecto da empresa (atendimento telefônico, recepção, faturamento, entrega). Cada interação forma ou reforça a percepção de qualidade. Empresas de excelência gerenciam ativamente esses momentos para garantir experiências positivas.",
      },
    ],
  },

  "modulo-8": {
    title: "Gestão de Não-Conformidades",
    moduleNumber: 8,
    questions: [
      {
        id: 801,
        question:
          "Uma 'não-conformidade' no contexto da gestão da qualidade é definida como:",
        options: [
          "Qualquer falha que cause prejuízo financeiro significativo à empresa",
          "Não atendimento a um requisito especificado (norma, especificação, procedimento ou regulamento)",
          "Defeito encontrado exclusivamente na inspeção final de produto acabado",
          "Divergência de opinião entre departamentos sobre procedimentos internos",
        ],
        correct: 1,
        explanation:
          "Não-conformidade (NC) = não atendimento a um requisito. O requisito pode ser: especificação técnica de produto, procedimento operacional padrão, cláusula de norma ISO, regulação legal, requisito do cliente. Uma NC pode ser detectada em auditoria, inspeção de processo, reclamação de cliente ou auto-inspeção.",
      },
      {
        id: 802,
        question:
          "No sistema CAPA (Corrective and Preventive Action), qual é a diferença entre ação corretiva e ação preventiva?",
        options: [
          "Ação corretiva é mais urgente; ação preventiva é opcional",
          "Ação corretiva elimina a causa de uma não-conformidade JÁ ocorrida; ação preventiva elimina a causa de uma não-conformidade POTENCIAL",
          "Ação corretiva é responsabilidade do operador; ação preventiva da gerência",
          "Não há diferença — ambas têm o mesmo propósito e metodologia",
        ],
        correct: 1,
        explanation:
          "CAPA distingue: Ação Corretiva (CA) — reativa, ocorre após uma NC ser identificada; visa eliminar a CAUSA RAIZ para que não se repita. Ação Preventiva (PA) — proativa, ocorre antes de qualquer NC; identifica potenciais causas e as elimina previamente. A ISO 9001:2015 eliminou formalmente o termo 'ação preventiva', incorporando-o ao 'pensamento baseado em risco'.",
      },
      {
        id: 803,
        question:
          "A 'ação de contenção' em gestão de não-conformidades difere da ação corretiva porque:",
        options: [
          "A ação de contenção resolve definitivamente o problema; a ação corretiva é temporária",
          "A ação de contenção é uma medida imediata para limitar danos/impacto da NC; a ação corretiva elimina a causa raiz",
          "A ação de contenção é aplicada apenas a produtos; a ação corretiva a processos",
          "Não há diferença prática entre os dois tipos de ação",
        ],
        correct: 1,
        explanation:
          "Ação de CONTENÇÃO: medida imediata e rápida para limitar o dano (ex: segregar lote com defeito, parar linha de produção, reter entrega). Não resolve o problema — apenas limita seu impacto. Ação CORRETIVA: investigação da causa raiz e implementação de solução definitiva para evitar recorrência. Ambas são necessárias e complementares.",
      },
      {
        id: 804,
        question:
          "A técnica dos '5 Porquês' para Análise de Causa Raiz consiste em:",
        options: [
          "Reunir 5 especialistas para identificar as 5 principais causas de um problema",
          "Perguntar 'por quê?' repetidamente (geralmente 5 vezes) até encontrar a causa raiz do problema",
          "Analisar as 5 categorias do Diagrama de Ishikawa mais relevantes",
          "Aplicar 5 testes estatísticos diferentes para validar a causa identificada",
        ],
        correct: 1,
        explanation:
          "Os 5 Porquês (desenvolvido pela Toyota) é uma técnica simples e eficaz: questionar repetidamente 'por quê?' cada resposta obtida, geralmente 5 vezes, até chegar à causa raiz real. Exemplo: peça quebrou → por quê? → lubrificação falhou → por quê? → filtro entupido → por quê? → manutenção preventiva não realizada → por quê? → procedimento não existia. Causa raiz: ausência de procedimento.",
      },
      {
        id: 805,
        question:
          "O FMEA (Failure Mode and Effects Analysis) calcula o RPN como indicador de prioridade. Como o RPN é calculado?",
        options: [
          "RPN = Frequência × Impacto × Custo de correção",
          "RPN = Severidade × Ocorrência × Detecção",
          "RPN = Probabilidade × Gravidade × Urgência",
          "RPN = Frequência + Severidade + Detectabilidade",
        ],
        correct: 1,
        explanation:
          "RPN (Risk Priority Number) = Severidade (S) × Ocorrência (O) × Detecção (D). Cada fator é pontuado de 1-10: Severidade = gravidade do impacto da falha; Ocorrência = frequência com que a causa ocorre; Detecção = capacidade de detectar a falha antes que chegue ao cliente. RPN varia de 1-1000. Modos de falha com maior RPN têm prioridade de ação.",
      },
      {
        id: 806,
        question:
          "Por que a rastreabilidade de registros de não-conformidades é fundamental em um SGQ?",
        options: [
          "Apenas por exigência legal, sem impacto prático para a melhoria da qualidade",
          "Permite identificar padrões, recorrências e tendências para melhoria contínua, além de ser evidência de conformidade com a ISO",
          "Serve exclusivamente para responsabilizar operadores individuais por erros",
          "É necessária somente quando há inspeções de organismos reguladores externos",
        ],
        correct: 1,
        explanation:
          "A rastreabilidade de NCs é fundamental porque: (1) Permite análise de tendências (NC recorrente indica causa sistêmica); (2) É evidência objetiva de conformidade exigida pela ISO 9001 (cláusula 10.2); (3) Demonstra que a organização responde adequadamente às NCs; (4) Fornece dados para análise crítica pela direção; (5) Protege legalmente a empresa em casos de litígio.",
      },
    ],
  },

  "modulo-9": {
    title: "Qualidade na Petrobras",
    moduleNumber: 9,
    questions: [
      {
        id: 901,
        question:
          "O Sistema de Gestão Integrado (SGI) da Petrobras integra três sistemas de gestão. Quais são eles?",
        options: [
          "Qualidade, Finanças e Recursos Humanos",
          "Qualidade (ISO 9001), Meio Ambiente (ISO 14001) e Saúde e Segurança (ISO 45001)",
          "Qualidade, Produção e Logística",
          "ISO 9001, ISO 27001 e ISO 50001",
        ],
        correct: 1,
        explanation:
          "O SGI da Petrobras integra: (1) Gestão da Qualidade — ISO 9001; (2) Gestão Ambiental — ISO 14001; (3) Gestão de Saúde e Segurança Ocupacional — ISO 45001. A integração permite uma visão sistêmica, evitando conflitos entre sistemas, reduzindo duplicidade de auditorias e criando sinergias. Essencial em O&G onde QSE (Qualidade, Segurança e Meio Ambiente) são inseparáveis.",
      },
      {
        id: 902,
        question:
          "A norma setorial ISO 29001 é específica para o setor de petróleo, petroquímica e gás natural. Ela é baseada na ISO 9001, com requisitos adicionais específicos para:",
        options: [
          "Gestão financeira e auditoria de contratos no setor de O&G",
          "Requisitos de qualidade específicos para fornecedores de produtos e serviços da indústria de O&G",
          "Certificação de profissionais técnicos em operações de refinaria",
          "Controle ambiental de emissões de carbono em plataformas offshore",
        ],
        correct: 1,
        explanation:
          "A ISO 29001 é equivalente à ISO 9001 com requisitos adicionais setoriais para a indústria de petróleo, petroquímica e gás natural. Foca em fornecedores de produtos e serviços (válvulas, tubulações, equipamentos de perfuração, serviços de inspeção). Exige maturidade maior em controle de processos, rastreabilidade de materiais e prevenção de defeitos críticos.",
      },
      {
        id: 903,
        question:
          "No processo de qualificação de fornecedores da Petrobras, o que acontece ANTES de um fornecedor ser autorizado a fornecer materiais críticos?",
        options: [
          "O fornecedor é aprovado automaticamente se possuir certificação ISO 9001",
          "O fornecedor passa por avaliação técnica de capacidade, auditorias e qualificação de produto antes de entrar no cadastro aprovado",
          "Apenas contratos de compras são assinados, sem avaliação técnica prévia",
          "O fornecedor é aprovado com base exclusivamente no menor preço ofertado",
        ],
        correct: 1,
        explanation:
          "A qualificação de fornecedores na Petrobras para materiais críticos envolve: avaliação de documentação técnica, auditorias de qualidade nas instalações do fornecedor, qualificação de produto (ensaios e testes), e inclusão no cadastro de fornecedores aprovados (AVL — Approved Vendor List). A certificação ISO 9001 é um requisito mínimo, não suficiente por si só.",
      },
      {
        id: 904,
        question:
          "A inspeção de recebimento de materiais na Petrobras tem como objetivo principal:",
        options: [
          "Verificar apenas o preço cobrado versus o preço negociado no contrato",
          "Verificar se os materiais recebidos atendem aos requisitos técnicos e de qualidade especificados antes de serem liberados para uso",
          "Confirmar que o fornecedor possui certificação ISO vigente",
          "Avaliar o desempenho do fornecedor exclusivamente para fins de pontuação futura",
        ],
        correct: 1,
        explanation:
          "A inspeção de recebimento verifica conformidade com requisitos técnicos: dimensões, materiais, certificados de conformidade, documentação de rastreabilidade, testes e ensaios específicos. Materiais não conformes são rejeitados/segregados antes de entrar no estoque. Em O&G, um material não conforme usado em equipamento crítico pode causar falha catastrófica.",
      },
      {
        id: 905,
        question:
          "A API (American Petroleum Institute) é uma organização que elabora normas técnicas amplamente usadas na Petrobras. Qual tipo de norma a API produz?",
        options: [
          "Normas de gestão da qualidade equivalentes à ISO 9001",
          "Especificações técnicas para equipamentos, materiais e serviços específicos da indústria de O&G (ex: API 5L para tubos de aço, API 6D para válvulas)",
          "Regulações ambientais para controle de emissões de carbono",
          "Padrões de segurança do trabalho para operadores de plataformas offshore",
        ],
        correct: 1,
        explanation:
          "A API (American Petroleum Institute) produz especificações técnicas detalhadas para a indústria de O&G: API 5L (tubos de aço para transporte de fluidos), API 6D (válvulas para dutos), API 6A (equipamentos de cabeça de poço), API 650 (tanques de armazenamento). São referências mundiais usadas em contratos Petrobras. Diferentes das normas ISO de sistema de gestão.",
      },
      {
        id: 906,
        question:
          "A rastreabilidade de materiais na Petrobras envolve práticas como código de barras e documentação de origem. Por que isso é especialmente crítico em O&G?",
        options: [
          "Apenas por exigências alfandegárias de importação de equipamentos",
          "Permite identificar com precisão a origem, histórico e especificações de componentes, crucial em análises de falhas e recalls de segurança",
          "É exigência exclusiva de clientes internacionais, sem aplicação nas operações nacionais",
          "Serve apenas para controle de estoque e otimização logística",
        ],
        correct: 1,
        explanation:
          "Rastreabilidade em O&G é crítica porque: (1) Em caso de falha, permite identificar exatamente o lote, fabricante e histórico do componente; (2) Facilita recalls preventivos de lotes com potencial defeito antes de falha em campo; (3) É exigência regulatória (ANP, IBAMA) para operações offshore; (4) Suporta análises forenses após acidentes. Um tubo sem rastreabilidade em plataforma offshore é inaceitável.",
      },
    ],
  },

  "modulo-10": {
    title: "Simulado Mestre",
    moduleNumber: 10,
    questions: [
      {
        id: 1001,
        question:
          "Uma empresa de serviços de manutenção industrial implementou um SGQ ISO 9001:2015. Na última auditoria interna, o auditor identificou que os operadores realizam inspeções visuais sem seguir o procedimento documentado (PRO-INS-01), embora produzam resultados aceitáveis. Esta situação é classificada como:",
        options: [
          "Oportunidade de melhoria, pois os resultados são aceitáveis",
          "Não-conformidade, pois há não atendimento a um requisito (procedimento documentado)",
          "Observação sem necessidade de ação corretiva",
          "Conformidade condicionada, válida apenas se os resultados forem aprovados",
        ],
        correct: 1,
        explanation:
          "Mesmo com resultados aceitáveis, o não seguimento do procedimento documentado é uma NÃO-CONFORMIDADE. A ISO 9001 exige que a organização siga seus próprios procedimentos e controles documentados (cláusula 8.1). O resultado satisfatório não elimina a NC — a causa raiz (não seguimento do procedimento) deve ser investigada e corrigida.",
      },
      {
        id: 1002,
        question:
          "Uma plataforma offshore da Petrobras registrou 47 defeitos de soldagem em 1.000 soldas ao mês. Usando DMAIC do Seis Sigma, qual deveria ser a primeira etapa e sua ação correspondente?",
        options: [
          "Improve — implementar imediatamente treinamento para soldadores",
          "Define — definir claramente o problema, escopo, clientes afetados e meta de melhoria",
          "Measure — coletar dados históricos de defeitos antes de qualquer análise",
          "Analyze — identificar as causas raiz dos defeitos de soldagem imediatamente",
        ],
        correct: 1,
        explanation:
          "No DMAIC, DEFINE é sempre o primeiro passo: definir o problema com precisão (taxa de defeitos = 47/1000 = 4,7%), identificar quem é afetado (inspeção estrutural, integridade da plataforma), estabelecer meta SMART (ex: reduzir para <1% em 6 meses) e definir escopo. Pular para soluções (Improve) sem definição clara é um erro comum que resulta em soluções para o problema errado.",
      },
      {
        id: 1003,
        question:
          "No modelo SERVQUAL aplicado ao departamento de suprimentos de uma refinaria Petrobras, os clientes internos avaliam o serviço recebendo 3,2 em Confiabilidade (numa escala de 1-5) contra uma expectativa de 4,8. O que este resultado indica e qual ação é prioritária?",
        options: [
          "Resultado positivo — a confiabilidade está acima de 3,0, portanto satisfatória",
          "Gap negativo crítico de -1,6 — o suprimento frequentemente não entrega o prometido no prazo/especificação; prioridade em revisão de processos de planejamento e cumprimento de prazos",
          "O problema está na dimensão Tangíveis — a aparência dos técnicos deve ser melhorada",
          "Resultado aceitável para serviços internos, que naturalmente têm padrão menor que clientes externos",
        ],
        correct: 1,
        explanation:
          "SERVQUAL mede a lacuna: qualidade percebida (3,2) - expectativa (4,8) = -1,6. Gap negativo indica insatisfação. Gap de -1,6 em Confiabilidade é crítico: clientes internos não estão recebendo o que foi prometido (entregas atrasadas, especificações erradas). A ação prioritária deve ser em Confiabilidade — o fator mais importante em SERVQUAL — revisando processos de planejamento, comunicação de prazos e cumprimento de compromissos.",
      },
      {
        id: 1004,
        question:
          "Uma empresa conduz uma análise FMEA de um sistema de válvulas de segurança. Para o modo de falha 'válvula não abre em emergência', os analistas atribuem: Severidade=10 (pode causar explosão), Ocorrência=3 (falha raramente), Detecção=8 (difícil detectar antes da emergência). Qual é o RPN e qual ação esta análise indica?",
        options: [
          "RPN=21; ação não prioritária pois a ocorrência é baixa",
          "RPN=240; ação prioritária focada em melhorar a Detecção (manutenção preventiva e testes periódicos)",
          "RPN=240; ação prioritária em reduzir a Severidade do impacto",
          "RPN=42; monitoramento adequado sem necessidade de ação imediata",
        ],
        correct: 1,
        explanation:
          "RPN = Severidade(10) × Ocorrência(3) × Detecção(8) = 240. RPN alto exige ação prioritária. Como a Severidade é 10 (máxima — explosão) e não pode ser reduzida (o risco é inerente), e a Ocorrência já está em 3 (baixa), a alavanca mais efetiva é a DETECÇÃO: implementar testes periódicos de abertura (valve proof testing) para reduzir o fator Detecção de 8 para 2-3, reduzindo RPN para 60-90.",
      },
      {
        id: 1005,
        question:
          "A ISO 9001:2015 exige que a organização mantenha 'informação documentada' como evidência de conformidade do SGQ. Em uma auditoria de terceira parte, o auditor solicita evidências do 'controle de saídas não conformes' (cláusula 8.7). Qual conjunto de documentos satisfaz adequadamente esta exigência?",
        options: [
          "Política da qualidade e objetivos da qualidade da empresa",
          "Registros de identificação de NCs, ações de contenção tomadas, análise de causa raiz e ações corretivas implementadas",
          "Certificados de treinamento de todos os operadores da linha de produção",
          "Apenas os relatórios da última auditoria interna realizada",
        ],
        correct: 1,
        explanation:
          "A cláusula 8.7 (Controle de saídas não conformes) exige informação documentada que evidencie: (1) descrição da NC; (2) ações tomadas (contenção, segregação, rejeição); (3) concessões obtidas quando aplicável; (4) autoridade que decidiu a ação. Esses registros demonstram que a organização controla efetivamente produtos/serviços não conformes.",
      },
      {
        id: 1006,
        question:
          "Uma refinaria Petrobras implementou o programa 5S na área de manutenção mecânica. Após 3 meses, as ferramentas estão organizadas (2S - Seiton atingido), mas os operadores estão voltando gradualmente a comportamentos antigos. Qual é o diagnóstico correto e a ação necessária?",
        options: [
          "O programa 5S falhou — reiniciar do zero com novos colaboradores",
          "Os 3S físicos foram implementados, mas o 5S (Shitsuke — Disciplina) não foi incorporado; necessário reforço de liderança, auditorias 5S periódicas e cultura de autodisciplina",
          "Adicionar mais quadros visuais e identificações para facilitar a organização",
          "Aumentar o salário dos operadores como incentivo para manter o 5S",
        ],
        correct: 1,
        explanation:
          "O retorno a comportamentos antigos após implementação física dos 3S (classificar, ordenar, limpar) indica que o 4S (Seiketsu — Padronização) e especialmente o 5S (Shitsuke — Disciplina/Autodisciplina) não foram consolidados. O 5S requer mudança cultural sustentável, não apenas organização física. Ações necessárias: auditorias 5S regulares, liderança pelo exemplo, indicadores visuais de desempenho e reconhecimento de equipes que mantêm o padrão.",
      },
    ],
  },
};
