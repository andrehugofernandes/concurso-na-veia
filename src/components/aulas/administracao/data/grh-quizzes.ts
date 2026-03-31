import { QuizQuestion } from "../../shared";

export const GRH_QUIZZES = {
  "modulo-1": [
    {
      id: "grh-m1-q1",
      pergunta: "Qual é o principal objetivo da Gestão de Recursos Humanos estratégica?",
      opcoes: {
        A: "Apenas processar folha de pagamento",
        B: "Alinhar práticas de gestão humana aos objetivos corporativos",
        C: "Reduzir custos com pessoal",
        D: "Implementar sistemas tecnológicos de RH",
      },
      correta: "B",
      explicacao:
        "RH estratégica vai além do administrativo. Seu foco é alinhar pessoas e práticas aos objetivos da organização, criando valor competitivo.",
    },
    {
      id: "grh-m1-q2",
      pergunta: "Na Petrobras, qual é o foco primário da estratégia de RH?",
      opcoes: {
        A: "Apenas reduzir custos operacionais",
        B: "Operações seguras, inovação e sustentabilidade",
        C: "Apenas conformidade legal",
        D: "Automatização completa de processos",
      },
      correta: "B",
      explicacao:
        "A estratégia RH da Petrobras está centrada em operações seguras e eficientes, inovação tecnológica e sustentabilidade ambiental.",
    },
    {
      id: "grh-m1-q3",
      pergunta: "Qual mnemônico resume os pilares de RH estratégica?",
      opcoes: {
        A: "RRHH: Recrutamento, Retenção, Rotação, Hora extra",
        B: "EDAR: Estratégia, Desenvolvimento, Ambiente, Resultados",
        C: "CRVS: Conformidade, Recrutamento, Venda, Segurança",
        D: "DHRH: Diretoria, Hierarquia, Remuneração, Hora extra",
      },
      correta: "B",
      explicacao:
        "EDAR é o mnemônico que resume: Estratégia (alinhamento), Desenvolvimento (crescimento), Ambiente (cultura), Resultados (medição).",
    },
    {
      id: "grh-m1-q4",
      pergunta: "O PDEP (Programa de Desenvolvimento Executivo Petrobras) tem qual característica principal?",
      opcoes: {
        A: "Foco apenas em salários",
        B: "Identificação de talentos com mentoria executiva e rota internacional",
        C: "Dispensa automática de baixo desempenho",
        D: "Reestruturação de organogramas",
      },
      correta: "B",
      explicacao:
        "PDEP identifica talentos de alto potencial, oferece mentoria com executivos sênior e rota internacional para preparação estratégica.",
    },
    {
      id: "grh-m1-q5",
      pergunta: "Qual é o custo estimado de rotatividade para uma organização?",
      opcoes: {
        A: "Apenas custo do anúncio",
        B: "25% do salário anual",
        C: "150-200% do salário anual",
        D: "Não há custo, apenas benefício de renovação",
      },
      correta: "C",
      explicacao:
        "Estudos mostram que o custo total de rotatividade (recrutamento, seleção, treinamento, perda de produtividade) é 150-200% do salário.",
    },
    {
      id: "grh-m1-q6",
      pergunta: "Na perspectiva estratégica, quem é responsável por RH na organização?",
      opcoes: {
        A: "Apenas o departamento de RH",
        B: "Apenas a liderança executiva",
        C: "Apenas os colaboradores",
        D: "Liderança, RH e colaboradores em conjunto",
      },
      correta: "D",
      explicacao:
        "RH estratégica é responsabilidade compartilhada: liderança define direção, RH estrutura processos, colaboradores executam e feedback.",
    },
    {
      id: "grh-m1-q7",
      pergunta: "Qual fator é mais crítico para retenção de talentos?",
      opcoes: {
        A: "Apenas salário competitivo",
        B: "Apenas benefícios generosos",
        C: "Oportunidades de desenvolvimento, reconhecimento e liderança engajadora",
        D: "Ambiente de escritório confortável",
      },
      correta: "C",
      explicacao:
        "Pesquisas mostram que talentos se retêm por oportunidades de desenvolvimento, reconhecimento genuíno e liderança inspiradora.",
    },
    {
      id: "grh-m1-q8",
      pergunta: "Qual é o impacto de alto engajamento em uma organização?",
      opcoes: {
        A: "Sem impacto documentado",
        B: "Apenas melhora clima corporativo",
        C: "Reduz absenteísmo em 41% e aumenta produtividade",
        D: "Aumenta custos operacionais",
      },
      correta: "C",
      explicacao:
        "Empresas com alto engajamento têm 41% menos absenteísmo, maior retenção e produtividade superior à média.",
    },
    {
      id: "grh-m1-q9",
      pergunta: "Qual é a diferença entre RH administrativo e RH estratégico?",
      opcoes: {
        A: "Não há diferença",
        B: "Administrativo: processos transacionais; Estratégico: alinhamento com objetivos corporativos",
        C: "Estratégico é mais caro",
        D: "Administrativo usa mais tecnologia",
      },
      correta: "B",
      explicacao:
        "RH administrativo (folha, férias, benefícios) é transacional. RH estratégico (retenção talentos, desenvolvimento liderança) cria valor competitivo.",
    },
    {
      id: "grh-m1-q10",
      pergunta: "Em um simulado integrado de RH, qual etapa do ciclo do colaborador é mais crítica?",
      opcoes: {
        A: "Apenas recrutamento",
        B: "Apenas onboarding",
        C: "Apenas avaliação",
        D: "Todas as etapas são críticas, desde atração até desligamento",
      },
      correta: "D",
      explicacao:
        "Cada etapa (recrutamento, onboarding, desenvolvimento, avaliação, progressão/desligamento) é crítica para sucesso geral.",
    },
  ],
  "modulo-2": [
    {
      id: "grh-m2-q1",
      pergunta: "Qual é o modelo de estrutura organizacional de RH mais moderno?",
      opcoes: {
        A: "Totalmente centralizado",
        B: "Totalmente descentralizado",
        C: "Modelo Ulrich com especialistas e business partners",
        D: "Sem estrutura formal",
      },
      correta: "C",
      explicacao:
        "Modelo Ulrich combina especialistas temáticos centralizados com business partners nas operações, balanceando alinhamento e agilidade.",
    },
    {
      id: "grh-m2-q2",
      pergunta: "Qual é o pilar do Modelo Ulrich que atua como parceiro estratégico da liderança?",
      opcoes: {
        A: "Administrative Expert",
        B: "Strategic Partner",
        C: "Change Agent",
        D: "Employee Champion",
      },
      correta: "B",
      explicacao:
        "Strategic Partner trabalha com a liderança na definição de estratégia e alinhamento de RH com objetivos corporativos.",
    },
    {
      id: "grh-m2-q3",
      pergunta: "Na estrutura Petrobras, qual é a vantagem de ter RH em Unidades de Negócio?",
      opcoes: {
        A: "Elimina necessidade de corporativo",
        B: "Decisões rápidas localmente com alinhamento corporativo via business partners",
        C: "Reduz custo em 100%",
        D: "Substitui especialistas temáticos",
      },
      correta: "B",
      explicacao:
        "RH em unidades de negócio garante agilidade operacional enquanto business partners corporativos mantêm alinhamento e padrão.",
    },
    {
      id: "grh-m2-q4",
      pergunta: "Qual estrutura minimiza duplicação de esforços entre unidades?",
      opcoes: {
        A: "Descentralização total",
        B: "Centralização total",
        C: "Rede com especialistas temáticos centralizados e operacionais descentralizados",
        D: "Sem estrutura definida",
      },
      correta: "C",
      explicacao:
        "Modelo de rede com especialistas centralizados (recrutamento, treinamento, compensação) evita duplicação e garante expertise.",
    },
    {
      id: "grh-m2-q5",
      pergunta: "O que é um Business Partner em RH?",
      opcoes: {
        A: "Fornecedor externo de serviços de RH",
        B: "Profissional que atua junto a uma diretoria operacional, traduzindo estratégia em ações locais",
        C: "Sistema de informação de RH",
        D: "Consultor estratégico da empresa",
      },
      correta: "B",
      explicacao:
        "Business Partner é o elo entre RH corporativa e operações, traduzindo estratégia em iniciativas práticas nas áreas.",
    },
    {
      id: "grh-m2-q6",
      pergunta: "Qual é o papel do Administrative Expert no Modelo Ulrich?",
      opcoes: {
        A: "Definir estratégia corporativa",
        B: "Executar processos eficientes (folha, benefícios, contratação)",
        C: "Liderar mudança organizacional",
        D: "Defender interesses dos colaboradores",
      },
      correta: "B",
      explicacao:
        "Administrative Expert executa processos transacionais de forma eficiente, liberando especialistas para trabalhos estratégicos.",
    },
    {
      id: "grh-m2-q7",
      pergunta: "Como Comunidades de Prática (CoPs) ajudam em uma estrutura descentralizada?",
      opcoes: {
        A: "Eliminam a necessidade de especialistas",
        B: "Promovem alinhamento horizontal entre especialistas sem hierarquia formal",
        C: "Aumentam custos operacionais",
        D: "Substituem a liderança direta",
      },
      correta: "B",
      explicacao:
        "CoPs são grupos de especialistas que se reúnem para compartilhar conhecimento, alinhando práticas sem estrutura formal hierárquica.",
    },
    {
      id: "grh-m2-q8",
      pergunta: "Qual indicador mostra maturidade de uma estrutura RH?",
      opcoes: {
        A: "Número de colaboradores em RH",
        B: "Balance entre agilidade operacional e alinhamento estratégico com bom atendimento",
        C: "Apenas centralização",
        D: "Apenas descentralização",
      },
      correta: "B",
      explicacao:
        "Estrutura madura alinha três elementos: agilidade (decisão rápida), alinhamento (padrão corporativo) e qualidade de atendimento.",
    },
    {
      id: "grh-m2-q9",
      pergunta: "Na estrutura Petrobras, quem define políticas corporativas de RH?",
      opcoes: {
        A: "Apenas unidades de negócio",
        B: "Gerência Geral de Gestão de Pessoas corporativa com input das operações",
        C: "Especialistas temáticos sem coordenação",
        D: "Fornecedores externos",
      },
      correta: "B",
      explicacao:
        "Gerência Geral corporativa define políticas, mas com participação ativa de unidades de negócio para contextualização operacional.",
    },
    {
      id: "grh-m2-q10",
      pergunta: "Qual é o risco de descentralização excessiva de RH?",
      opcoes: {
        A: "Custo elevado",
        B: "Falta de padrão corporativo, duplicação, inconsistência em políticas",
        C: "Lentidão nas decisões",
        D: "Excesso de capacitação",
      },
      correta: "B",
      explicacao:
        "Descentralização sem coordenação resulta em falta de padrão, duplicação de esforços e inconsistência nas políticas corporativas.",
    },
  ],
  "modulo-3": [
    {
      id: "grh-m3-q1",
      pergunta: "O que é um SIRH (Sistema de Informação em RH)?",
      opcoes: {
        A: "Apenas sistema de folha de pagamento",
        B: "Plataforma que integra dados de RH (folha, pessoal, benefícios, desenvolvimento, indicadores)",
        C: "Sistema de agendamento de reuniões",
        D: "Apenas gestão de férias",
      },
      correta: "B",
      explicacao:
        "SIRH integra múltiplas funções: folha, registro pessoal, frequência, benefícios, desenvolvimento, fornecendo inteligência para decisões.",
    },
    {
      id: "grh-m3-q2",
      pergunta: "Qual é o impacto de um SIRH bem implementado?",
      opcoes: {
        A: "Sem impacto relevante",
        B: "Redução de erros, automação de processos, melhor tomada de decisão",
        C: "Apenas custo adicional",
        D: "Aumenta burocracia",
      },
      correta: "B",
      explicacao:
        "SIRH reduz erros transacionais, automatiza processos repetitivos e fornece dados para decisões estratégicas baseadas em evidência.",
    },
    {
      id: "grh-m3-q3",
      pergunta: "Qual tecnologia de SIRH é utilizada pela Petrobras?",
      opcoes: {
        A: "Apenas SAP",
        B: "SAP SuccessFactors com integração a sistemas legados",
        C: "Apenas Workday",
        D: "Sem sistema integrado",
      },
      correta: "B",
      explicacao:
        "Petrobras utiliza SAP SuccessFactors como SIRH principal, integrado com sistemas de folha e legados para visão 360 de RH.",
    },
    {
      id: "grh-m3-q4",
      pergunta: "Qual é o maior desafio na implementação de SIRH?",
      opcoes: {
        A: "Apenas custo de licenças",
        B: "Qualidade de dados, integração entre módulos e resistência à mudança",
        C: "Falta de fornecedores",
        D: "Interface complicada",
      },
      correta: "B",
      explicacao:
        "Sucesso de SIRH depende de: dados limpos (garbage in, garbage out), integração entre módulos e engajamento dos usuários.",
    },
    {
      id: "grh-m3-q5",
      pergunta: "Qual KPI de SIRH mede rapidez do processo de contratação?",
      opcoes: {
        A: "Cost-per-Hire",
        B: "Turnover Rate",
        C: "Time-to-Hire",
        D: "Engagement Score",
      },
      correta: "C",
      explicacao:
        "Time-to-Hire mede dias entre publicação do anúncio e admissão. Ideal: < 40 dias. Indica eficiência do processo de recrutamento.",
    },
    {
      id: "grh-m3-q6",
      pergunta: "Como o SIRH suporta decisões de desenvolvimento de carreira?",
      opcoes: {
        A: "Não suporta",
        B: "Fornecendo pipeline de talentos, trilhas de aprendizado e comparação de competências",
        C: "Apenas mostrando salários",
        D: "Apenas registrando treinamentos",
      },
      correta: "B",
      explicacao:
        "SIRH identifica talentos (pipeline), mapeia competências, recomenda trilhas de desenvolvimento e rastreia progresso.",
    },
    {
      id: "grh-m3-q7",
      pergunta: "Qual é o risco de não integrar adequadamente módulos de SIRH?",
      opcoes: {
        A: "Sem risco significativo",
        B: "Dados inconsistentes, retrabalho manual, decisões baseadas em informações desalinhadas",
        C: "Apenas custo estético",
        D: "Melhor privacidade",
      },
      correta: "B",
      explicacao:
        "Módulos desintegrados causam: dados duplicados/contraditórios, necessidade de ajustes manuais e decisões em silos.",
    },
    {
      id: "grh-m3-q8",
      pergunta: "Como SIRH contribui para conformidade com LGPD?",
      opcoes: {
        A: "Não contribui",
        B: "Registrando consentimentos, auditando acessos, garantindo direito ao esquecimento",
        C: "Apenas coletando dados",
        D: "Aumentando coleta de dados",
      },
      correta: "B",
      explicacao:
        "SIRH adequado registra consentimentos explícitos, audita quem acessa dados pessoais, documenta retenção e facilita exclusão.",
    },
    {
      id: "grh-m3-q9",
      pergunta: "Qual dado é crítico para qualidade de um SIRH?",
      opcoes: {
        A: "Apenas foto do colaborador",
        B: "Dados estruturados: data de admissão, função, departamento, competências, avaliações",
        C: "Apenas contatos pessoais",
        D: "Opiniões subjetivas",
      },
      correta: "B",
      explicacao:
        "Dados críticos são estruturados (data, função, departamento) e validados. Qualidade de dados determina qualidade das análises.",
    },
    {
      id: "grh-m3-q10",
      pergunta: "Na Petrobras, qual foi o impacto do SIRH bem implementado?",
      opcoes: {
        A: "Sem impacto",
        B: "Redução de 40% no tempo administrativo, melhor rastreamento de talentos e decisões baseadas em dados",
        C: "Apenas aumento de custo",
        D: "Redução de talentos",
      },
      correta: "B",
      explicacao:
        "Implementação bem-sucedida de SIRH na Petrobras reduziu tempo administrativo em 40% e melhorou visibilidade de talentos.",
    },
  ],
  "modulo-4": [
    {
      id: "grh-m4-q1",
      pergunta: "Qual é a primeira etapa do ciclo do colaborador?",
      opcoes: {
        A: "Onboarding",
        B: "Recrutamento e Seleção",
        C: "Avaliação",
        D: "Desligamento",
      },
      correta: "B",
      explicacao:
        "Ciclo inicia com atração (job description clara) e seleção (entrevistas, testes), identificando o candidato ideal.",
    },
    {
      id: "grh-m4-q2",
      pergunta: "Qual é o objetivo do Onboarding?",
      opcoes: {
        A: "Apenas mostrar o escritório",
        B: "Integrar o colaborador na cultura, apresentar processos e criar conexões com colegas",
        C: "Apenas dar contrato para assinar",
        D: "Começar avaliação imediatamente",
      },
      correta: "B",
      explicacao:
        "Onboarding eficaz integra culturalmente, clareia expectativas, apresenta processos e constrói relacionamentos, reduzindo desistências.",
    },
    {
      id: "grh-m4-q3",
      pergunta: "Na Petrobras, qual é a duração ideal de um onboarding estruturado?",
      opcoes: {
        A: "1 dia",
        B: "1 semana com mentoria dedicada",
        C: "1 mês com suporte contínuo",
        D: "Não é necessário",
      },
      correta: "B",
      explicacao:
        "Petrobras oferece primeira semana intensiva com mentor dedicado, reduzindo em 25% as desistências nos primeiros 90 dias.",
    },
    {
      id: "grh-m4-q4",
      pergunta: "O que é uma trilha de aprendizado em RH?",
      opcoes: {
        A: "Apenas cursos obrigatórios",
        B: "Caminho estruturado de desenvolvimento com competências, treinamentos e progressão de carreira definidos",
        C: "Apenas cursos de segurança",
        D: "Não existe em RH",
      },
      correta: "B",
      explicacao:
        "Trilha de aprendizado mapeia competências requeridas, oferece treinamentos progressivos e define critérios para progressão.",
    },
    {
      id: "grh-m4-q5",
      pergunta: "Qual é a frequência ideal para avaliação de desempenho?",
      opcoes: {
        A: "Anual (apenas)",
        B: "Semestral com feedback contínuo",
        C: "Mensal para micro-management",
        D: "Nunca",
      },
      correta: "B",
      explicacao:
        "Avaliação semestral formal com feedback contínuo (feedforward) é mais eficaz que apenas feedback anual reativo.",
    },
    {
      id: "grh-m4-q6",
      pergunta: "O que significa feedback 360º em avaliação de desempenho?",
      opcoes: {
        A: "Apenas feedback do chefe",
        B: "Feedback de chefe, colegas, subordinados e autoavaliação (visão completa)",
        C: "Feedback apenas de pares",
        D: "Apenas de clientes externos",
      },
      correta: "B",
      explicacao:
        "360º coleta feedback de múltiplas fontes (chefe, colegas, subordinados, autoavaliação), fornecendo visão abrangente.",
    },
    {
      id: "grh-m4-q7",
      pergunta: "Qual é o critério para progressão de carreira em um sistema estruturado?",
      opcoes: {
        A: "Apenas tempo de casa",
        B: "Competências demonstradas, desempenho > 70%, potencial avaliado e vagas disponíveis",
        C: "Apenas relacionamento com chefe",
        D: "Afinidade pessoal",
      },
      correta: "B",
      explicacao:
        "Progressão justa baseada em: competências (sabe fazer), desempenho (faz bem) e potencial (pode crescer).",
    },
    {
      id: "grh-m4-q8",
      pergunta: "Na Petrobras, qual é o impacto de processo bem estruturado de desenvolvimento?",
      opcoes: {
        A: "Sem impacto",
        B: "95% de retenção nos primeiros 2 anos, 80% de internos em posições estratégicas",
        C: "Apenas aumento de custo",
        D: "Maior rotatividade",
      },
      correta: "B",
      explicacao:
        "Processos estruturados na Petrobras resultam em alta retenção (95%) e promoção de talentos internos (80% de lideranças).",
    },
    {
      id: "grh-m4-q9",
      pergunta: "Qual é a finalidade do desligamento estruturado em RH?",
      opcoes: {
        A: "Apenas cumprir lei",
        B: "Documentar motivo, oferecer suporte (counseling), preservar dignidade e relacionamento corporativo",
        C: "Punir rapidamente",
        D: "Criar medo nos colaboradores",
      },
      correta: "B",
      explicacao:
        "Desligamento profissional documenta razões, oferece apoio ao colaborador, preserva reputação corporativa e evita processos.",
    },
    {
      id: "grh-m4-q10",
      pergunta: "Qual processo reduz desistências precoces (primeiro ano)?",
      opcoes: {
        A: "Apenas aumento salarial",
        B: "Onboarding de qualidade, mentor dedicado, feedback contínuo e clareza de expectativas",
        C: "Apenas segurança no emprego",
        D: "Nenhum processo ajuda",
      },
      correta: "B",
      explicacao:
        "Pesquisas mostram que onboarding de qualidade + mentor dedicado reduzem desistências em 25% no primeiro ano.",
    },
  ],
  "modulo-5": [
    {
      id: "grh-m5-q1",
      pergunta: "O que é turnover (rotatividade) em RH?",
      opcoes: {
        A: "Número absoluto de contratações",
        B: "Percentual de colaboradores que deixam a empresa em um período",
        C: "Apenas aposentadorias",
        D: "Férias coletivas",
      },
      correta: "B",
      explicacao:
        "Turnover é a taxa de saída: (Desligamentos / Média de Colaboradores) × 100. Mede fluxo de pessoas.",
    },
    {
      id: "grh-m5-q2",
      pergunta: "Qual é o custo estimado de uma rotatividade alta para a empresa?",
      opcoes: {
        A: "Sem custo significativo",
        B: "150-200% do salário anual da pessoa que saiu",
        C: "Apenas perda salarial",
        D: "Apenas custo de recrutamento",
      },
      correta: "B",
      explicacao:
        "Custo total inclui: recrutamento, seleção, treinamento, perda de produtividade, knowledge loss = 150-200% do salário anual.",
    },
    {
      id: "grh-m5-q3",
      pergunta: "Qual é a fórmula para calcular Turnover Rate?",
      opcoes: {
        A: "(Contratações / Colaboradores) × 100",
        B: "(Desligamentos / Média de Colaboradores) × 100",
        C: "(Salários / Colaboradores) × 100",
        D: "(Dias trabalhados / 365) × 100",
      },
      correta: "B",
      explicacao:
        "Turnover Rate = (Número de Desligamentos em um período / Média de Colaboradores no período) × 100",
    },
    {
      id: "grh-m5-q4",
      pergunta: "Qual é a causa mais comum de rotatividade voluntária?",
      opcoes: {
        A: "Apenas ambiente desconfortável",
        B: "Falta de desenvolvimento, baixa remuneração, má liderança e falta de reconhecimento",
        C: "Apenas distância de casa",
        D: "Apenas problemas pessoais",
      },
      correta: "B",
      explicacao:
        "Principais causas de saída: oportunidades limitadas (39%), remuneração inadequada (38%), liderança fraca (35%), falta de reconhecimento (34%).",
    },
    {
      id: "grh-m5-q5",
      pergunta: "O que é Stay Interview em estratégia anti-turnover?",
      opcoes: {
        A: "Não existe",
        B: "Conversa com colaboradores retidos para entender por que ficaram e melhorar atração",
        C: "Apenas despedida",
        D: "Apenas contrato de renegociação",
      },
      correta: "B",
      explicacao:
        "Stay interviews conversam com talentos que permanecem, identificando fatores que os retêm para replicar em outros.",
    },
    {
      id: "grh-m5-q6",
      pergunta: "Na Petrobras, qual foi o resultado do Programa de Retenção de Engenheiros?",
      opcoes: {
        A: "Sem resultado",
        B: "Redução de turnover de 15% para 5%, economia de R$50M",
        C: "Aumento de custos",
        D: "Maior rotatividade",
      },
      correta: "B",
      explicacao:
        "Caso real: remuneração competitiva + reconhecimento + bolsa de pós-grad reduziu turnover de engenheiros em 10 pontos percentuais.",
    },
    {
      id: "grh-m5-q7",
      pergunta: "Qual é o turnover considerado saudável em uma indústria?",
      opcoes: {
        A: "0% (ninguém sai)",
        B: "5-10% anual (renova talentos sem esvaziar)",
        C: "30%+ (máxima rotatividade)",
        D: "Não há padrão",
      },
      correta: "B",
      explicacao:
        "Turnover saudável é 5-10% anual: renova talentos, evita estagnação, mas mantém conhecimento corporativo.",
    },
    {
      id: "grh-m5-q8",
      pergunta: "Qual é o diferencial entre turnover voluntário e involuntário?",
      opcoes: {
        A: "Não há diferença",
        B: "Voluntário: colaborador sai; Involuntário: empresa desliga por desempenho",
        C: "Apenas cálculo diferente",
        D: "Ambos são iguais",
      },
      correta: "B",
      explicacao:
        "Turnover voluntário (colaborador escolhe sair) indica problemas culturais. Involuntário (empresa desliga) indica performance issue.",
    },
    {
      id: "grh-m5-q9",
      pergunta: "Como reduzir turnover em uma área com alta rotatividade?",
      opcoes: {
        A: "Apenas aumentar salários",
        B: "Diagnóstico (stay interviews), remuneração competitiva, desenvolvimento visível, liderança engajadora",
        C: "Não há solução",
        D: "Apenas punir saídas",
      },
      correta: "B",
      explicacao:
        "Abordagem eficaz: (1) entender causas (2) remuneração justo (3) desenvolvimento claro (4) liderança inspiradora.",
    },
    {
      id: "grh-m5-q10",
      pergunta: "Qual indicador mostra se estratégia anti-turnover está funcionando?",
      opcoes: {
        A: "Apenas número de contratações",
        B: "Redução percentual de desligamentos, aumento de retenção de talentos críticos, melhora de engagement",
        C: "Apenas satisfação de chefes",
        D: "Sem indicador",
      },
      correta: "B",
      explicacao:
        "Indicadores de sucesso: turnover reduzido (especialmente talentos críticos), engagement aumentado, retenção de potenciais.",
    },
  ],
  "modulo-6": [
    {
      id: "grh-m6-q1",
      pergunta: "Qual é a finalidade de métricas e indicadores em RH?",
      opcoes: {
        A: "Apenas burocracia",
        B: "Medir efetividade, guiar decisões, demonstrar ROI e identificar melhorias",
        C: "Apenas compliance",
        D: "Não tem finalidade",
      },
      correta: "B",
      explicacao:
        "Métricas de RH transformam decisões baseadas em 'sensação' em decisões data-driven, demonstrando valor de RH.",
    },
    {
      id: "grh-m6-q2",
      pergunta: "Qual é a diferença entre Time-to-Hire e Cost-per-Hire?",
      opcoes: {
        A: "Não há diferença",
        B: "Time-to-Hire: eficiência (tempo); Cost-per-Hire: eficácia (custo de cada contratação)",
        C: "Ambos medem a mesma coisa",
        D: "Apenas um existe",
      },
      correta: "B",
      explicacao:
        "Time-to-Hire (dias para contratar) mede velocidade. Cost-per-Hire (investimento/contratação) mede eficiência econômica.",
    },
    {
      id: "grh-m6-q3",
      pergunta: "Qual é o benchmarking de Time-to-Hire considerado bom?",
      opcoes: {
        A: "< 20 dias",
        B: "< 40 dias",
        C: "> 60 dias",
        D: "Sem padrão",
      },
      correta: "B",
      explicacao:
        "Menos de 40 dias é considerado bom. Acima de 60 dias indica lentidão que pode fazer perder talentos para concorrentes.",
    },
    {
      id: "grh-m6-q4",
      pergunta: "O que é Employee Engagement Score?",
      opcoes: {
        A: "Apenas salário",
        B: "Medida de satisfação e comprometimento emocional (escala 1-10)",
        C: "Apenas presença física",
        D: "Não existe",
      },
      correta: "B",
      explicacao:
        "Engagement Score (geralmente escala 1-10) mede satisfação emocional, comprometimento e disposição para extra-esforço.",
    },
    {
      id: "grh-m6-q5",
      pergunta: "Qual é o impacto de alto Engagement Score?",
      opcoes: {
        A: "Sem impacto",
        B: "Reduz absenteísmo 41%, aumenta produtividade 17-21%, melhora retenção",
        C: "Apenas custo aumenta",
        D: "Não muda nada",
      },
      correta: "B",
      explicacao:
        "Pesquisas Gallup mostram: engajados têm 41% menos absenteísmo e 17-21% maior produtividade.",
    },
    {
      id: "grh-m6-q6",
      pergunta: "Como calcular Turnover Rate?",
      opcoes: {
        A: "(Novos Contratados / Total) × 100",
        B: "(Desligamentos / Média de Colaboradores) × 100",
        C: "(Salários Pagos / Colaboradores) × 100",
        D: "Não existe fórmula",
      },
      correta: "B",
      explicacao:
        "Turnover = (Desligamentos no período / Média de Colaboradores no período) × 100. Exemplo: 50 saídas / 1000 colaboradores = 5%",
    },
    {
      id: "grh-m6-q7",
      pergunta: "O que é ROI em Treinamento de RH?",
      opcoes: {
        A: "Apenas contabilização de custo",
        B: "(Valor gerado pela capacitação / Investimento em treinamento) - 1 × 100",
        C: "Sem medição",
        D: "Apenas certificados obtidos",
      },
      correta: "B",
      explicacao:
        "ROI Treinamento = (Valor gerado / Custo) - 1. Ex: Treinamento custa R$10k, gera R$30k em eficiência = 200% ROI.",
    },
    {
      id: "grh-m6-q8",
      pergunta: "Qual é o indicador mais crítico para medir eficiência de RH?",
      opcoes: {
        A: "Apenas número de treinamentos",
        B: "Balanced Scorecard com: Time-to-Hire, Turnover, Engagement, Retenção de talentos críticos",
        C: "Apenas salários",
        D: "Nenhum indicador é necessário",
      },
      correta: "B",
      explicacao:
        "Abordagem equilibrada: métricas operacionais (Time-to-Hire), retenção (Turnover), satisfação (Engagement), estratégicas (talentos retidos).",
    },
    {
      id: "grh-m6-q9",
      pergunta: "Como a Petrobras utiliza indicadores de RH?",
      opcoes: {
        A: "Sem uso específico",
        B: "Dashboard integrado (Petros) com 15+ métricas monitoradas mensalmente",
        C: "Apenas relatórios anuais",
        D: "Não mede",
      },
      correta: "B",
      explicacao:
        "Petrobras usa SAP Petros: dashboard de RH com turnover, time-to-hire, engagement, horas de treinamento, monitoramento em tempo real.",
    },
    {
      id: "grh-m6-q10",
      pergunta: "Qual é o principal benefício de usar métricas de RH?",
      opcoes: {
        A: "Apenas conformidade",
        B: "Demonstrar valor de RH aos executivos e guiar decisões estratégicas baseadas em evidência",
        C: "Apenas custo",
        D: "Sem benefício",
      },
      correta: "B",
      explicacao:
        "Métricas transformam RH de 'custo overhead' em 'business partner estratégico' com ROI demonstrável.",
    },
  ],
  "modulo-7": [
    {
      id: "grh-m7-q1",
      pergunta: "Qual é o principal objetivo de comunicação interna em RH?",
      opcoes: {
        A: "Apenas obedecer ordens",
        B: "Criar entendimento, alinhamento de valores e engajamento emocional",
        C: "Apenas informar regras",
        D: "Controlar colaboradores",
      },
      correta: "B",
      explicacao:
        "Comunicação eficaz em RH cria sentido de propósito, alinha comportamentos e constrói relacionamento baseado em confiança.",
    },
    {
      id: "grh-m7-q2",
      pergunta: "Qual é a diferença entre comunicação Top-Down e Bottom-Up?",
      opcoes: {
        A: "Não há diferença",
        B: "Top-Down: liderança para colaboradores; Bottom-Up: colaboradores para liderança",
        C: "Apenas uma existe",
        D: "Ambas são iguais",
      },
      correta: "B",
      explicacao:
        "Top-Down comunica metas e direção. Bottom-Up coleta feedback, sugestões e preocupações. Ambas são essenciais.",
    },
    {
      id: "grh-m7-q3",
      pergunta: "Na Petrobras, qual é o programa de comunicação principal com colaboradores?",
      opcoes: {
        A: "Apenas email corporativo",
        B: "Petrobras Ouve: pesquisa anual (50k+), focus groups, town halls, plataforma digital",
        C: "Sem programa",
        D: "Apenas reuniões de segurança",
      },
      correta: "B",
      explicacao:
        "Programa estruturado: pesquisa de clima anual (50k+ colaboradores), discussões de foco, CEO town halls, fórum digital (Yammer).",
    },
    {
      id: "grh-m7-q4",
      pergunta: "O que é um Town Hall em RH?",
      opcoes: {
        A: "Apenas reunião de segurança",
        B: "Encontro presencial/virtual onde liderança comunica estratégia e colaboradores fazem perguntas",
        C: "Apenas distribuição de documentos",
        D: "Não existe",
      },
      correta: "B",
      explicacao:
        "Town Hall é comunicação bidirecional: liderança fala (metas, direção), colaboradores questionam (direito de voz), constroem confiança.",
    },
    {
      id: "grh-m7-q5",
      pergunta: "Qual é o impacto de comunicação interna clara?",
      opcoes: {
        A: "Sem impacto",
        B: "Reduz rumores, aumenta confiança, melhora alinhamento, reduz rotatividade",
        C: "Apenas cumpre lei",
        D: "Piora clima",
      },
      correta: "B",
      explicacao:
        "Comunicação clara elimina vácuo de informação (onde rumores prosperam), constrói confiança e alinhamento com objetivos.",
    },
    {
      id: "grh-m7-q6",
      pergunta: "Qual é o elemento mais crítico para engajamento?",
      opcoes: {
        A: "Apenas salário",
        B: "Percepção de equidade, reconhecimento genuíno, oportunidade de voz e desenvolvimento visível",
        C: "Apenas benefícios",
        D: "Ambiente físico",
      },
      correta: "B",
      explicacao:
        "Engajamento vem de: 'você é tratado justo?', 'seu trabalho é reconhecido?', 'você tem voz?', 'você cresce aqui?'",
    },
    {
      id: "grh-m7-q7",
      pergunta: "O que é feedback loop em comunicação corporativa?",
      opcoes: {
        A: "Sem existência",
        B: "Ciclo: ouça → responda → aja → comunique resultado → repita",
        C: "Apenas ouvir sem agir",
        D: "Apenas falar sem escuta",
      },
      correta: "B",
      explicacao:
        "Ciclo eficaz: (1) Ouvir feedback (2) Responder (reconhecer) (3) Agir (implementar) (4) Comunicar resultado (fechar loop)",
    },
    {
      id: "grh-m7-q8",
      pergunta: "Na Petrobras, qual foi o resultado de programa de comunicação estruturado?",
      opcoes: {
        A: "Sem resultado",
        B: "Engagement Score 7.5/10, rotatividade reduzida em 15%",
        C: "Apenas custo aumentou",
        D: "Sem medição",
      },
      correta: "B",
      explicacao:
        "Caso: Programa Petrobras Ouve resultou em Engagement 7.5/10 (acima da média 7.0), rotatividade reduzida 15%.",
    },
    {
      id: "grh-m7-q9",
      pergunta: "Qual é o risco de comunicação interna fraca?",
      opcoes: {
        A: "Sem risco",
        B: "Rumores proliferam, confiança diminui, desempenho cai, turnover aumenta",
        C: "Apenas custo",
        D: "Benefício adicional",
      },
      correta: "B",
      explicacao:
        "Vácuo de comunicação = ambiente fértil para rumores negativos = erosão de confiança = desempenho reduzido = saída de talentos.",
    },
    {
      id: "grh-m7-q10",
      pergunta: "Qual canala de comunicação é mais eficaz em empresas grandes?",
      opcoes: {
        A: "Apenas email",
        B: "Combinação: formais (town halls, intranet), informais (café com líderes), digitais (redes sociais corporativas)",
        C: "Apenas telefone",
        D: "Sem canal eficaz",
      },
      correta: "B",
      explicacao:
        "Mix de canais: formais (oficial), informais (humanidade), digitais (conveniência) garante alcance e efeito máximo.",
    },
  ],
  "modulo-8": [
    {
      id: "grh-m8-q1",
      pergunta: "Qual lei é base da legislação trabalhista brasileira?",
      opcoes: {
        A: "Lei de Previdência",
        B: "CLT (Consolidação das Leis do Trabalho)",
        C: "Código Civil",
        D: "Lei de Segurança",
      },
      correta: "B",
      explicacao:
        "CLT estabelece direitos (férias, décimo terceiro, FGTS) e deveres (jornada, segurança) fundamentais da relação trabalhista.",
    },
    {
      id: "grh-m8-q2",
      pergunta: "Qual foi o maior impacto da Lei 13.467/2017 (Reforma Trabalhista)?",
      opcoes: {
        A: "Sem mudanças significativas",
        B: "Maior flexibilidade para empresas (trabalho remoto, autônomo), menos proteção tradicional de emprego",
        C: "Apenas aumento de direitos",
        D: "Sem efeito prático",
      },
      correta: "B",
      explicacao:
        "Reforma 2017: trabalho remoto legalizado, contrato por projeto, redução de proteções, maior liberdade de negociação.",
    },
    {
      id: "grh-m8-q3",
      pergunta: "O que a LGPD (Lei 13.709/2018) exige de RH?",
      opcoes: {
        A: "Sem exigência para RH",
        B: "Consentimento explícito para dados pessoais, direito ao esquecimento, documentação de processamento",
        C: "Apenas coleta de dados",
        D: "Sem regulação",
      },
      correta: "B",
      explicacao:
        "LGPD em RH: consentimento explícito para CV/foto, auditoria de quem acessa dados, direito de solicitar exclusão, documento de consentimento.",
    },
    {
      id: "grh-m8-q4",
      pergunta: "Qual é a política de RH mais crítica para conformidade?",
      opcoes: {
        A: "Apenas horários",
        B: "Assédio moral e sexual, não-discriminação, saúde ocupacional, sigilo de dados",
        C: "Apenas vestiário",
        D: "Sem política crítica",
      },
      correta: "B",
      explicacao:
        "Críticas: (1) Assédio zero (MPT pode intervir), (2) Sem discriminação (lei 9.459), (3) Saúde (NRs), (4) Dados (LGPD).",
    },
    {
      id: "grh-m8-q5",
      pergunta: "O que é NR-5 em contexto de conformidade RH?",
      opcoes: {
        A: "Norma de recrutamento",
        B: "Norma Regulatória 5: Comissão Interna de Prevenção de Acidentes (CIPA)",
        C: "Norma de remuneração",
        D: "Sem existência",
      },
      correta: "B",
      explicacao:
        "NR-5: CIPA obrigatória em empresas com > 100 colaboradores. Previne acidentes, investiga incidentes, treinamento segurança.",
    },
    {
      id: "grh-m8-q6",
      pergunta: "Qual é o procedimento correto para desligamento conforme legislação?",
      opcoes: {
        A: "Desligar sem motivo sem notificação",
        B: "Documentar motivo (desempenho/reorganização), avisar conforme lei (30 dias), entregar TRCT, liberar FGTS",
        C: "Apenas comunicar verbalmente",
        D: "Sem procedimento legal",
      },
      correta: "B",
      explicacao:
        "Desligamento legal: (1) Documentação clara (2) Aviso prévio 30 dias (3) TRCT (Termo Rescisão) (4) Liberação FGTS e saldo salário.",
    },
    {
      id: "grh-m8-q7",
      pergunta: "Como RH garante conformidade com LGPD?",
      opcoes: {
        A: "Sem medida específica",
        B: "Registro de consentimento, auditoria de acessos, criptografia de dados, direito ao esquecimento documentado",
        C: "Apenas coleta",
        D: "Sem regulação",
      },
      correta: "B",
      explicacao:
        "LGPD em RH: (1) Consentimento escrito (2) Quem acessa é auditado (3) Dados sensíveis criptografados (4) Exclusão on-demand.",
    },
    {
      id: "grh-m8-q8",
      pergunta: "Na Petrobras, qual é a abordagem de conformidade em RH?",
      opcoes: {
        A: "Sem foco",
        B: "Programa de Integridade: treinamento 100%, canal de denúncias independente, investigação confidencial, zero represálias",
        C: "Apenas compliance paperwork",
        D: "Sem programa",
      },
      correta: "B",
      explicacao:
        "Petrobras: (1) Treinamento de integridade obrigatório anual (2) Canal de denúncias anônimo (3) Investigação independente (4) Sem represálias.",
    },
    {
      id: "grh-m8-q9",
      pergunta: "Qual é o risco de não-conformidade com legislação trabalhista?",
      opcoes: {
        A: "Sem risco",
        B: "Ações trabalhistas (dano moral), multas MTE (Ministério Trabalho), processos sindicais, danos reputacionais",
        C: "Apenas custo administrativo",
        D: "Nenhum risco",
      },
      correta: "B",
      explicacao:
        "Riscos reais: (1) Ações judiciais (R$50k+) (2) Multas administrativas MTE/SRTE (3) Impacto reputacional (4) Afastamento de investidores.",
    },
    {
      id: "grh-m8-q10",
      pergunta: "Qual é a função de um Compliance Officer em RH?",
      opcoes: {
        A: "Apenas documentação",
        B: "Garantir conformidade com legislação, auditar processos, treinar RH, investigar denúncias",
        C: "Apenas reportagem",
        D: "Sem função",
      },
      correta: "B",
      explicacao:
        "Compliance Officer: (1) Conhecimento de legislação (2) Auditoria de processos (3) Treinamento preventivo (4) Investigação de denúncias confidencial.",
    },
  ],
  "modulo-9": [
    {
      id: "grh-m9-q1",
      pergunta: "Qual é o desafio único de RH na Petrobras?",
      opcoes: {
        A: "Sem desafios únicos",
        B: "Segurança (ambiente operacional de risco), isolamento (offshore), especialistas em demanda (tech), transição energética",
        C: "Apenas burocracia",
        D: "Sem setor específico",
      },
      correta: "B",
      explicacao:
        "Desafios Petrobras: (1) Offshore = ambiente explosivo (2) Isolamento = psicológico (3) Tech = competição (4) Transição = novos perfis.",
    },
    {
      id: "grh-m9-q2",
      pergunta: "O que significa Pré-sal em contexto de RH na Petrobras?",
      opcoes: {
        A: "Apenas termo geográfico",
        B: "Reservas em águas profundas = profissionais altamente qualificados, ambiente perigoso, remuneração premium",
        C: "Sem relação com RH",
        D: "Apenas refinaria",
      },
      correta: "B",
      explicacao:
        "Pré-sal: (1) Exploração em águas profundas (2) Risco elevado (3) Profissionais elite (engenheiros especialistas) (4) Remuneração 30% acima.",
    },
    {
      id: "grh-m9-q3",
      pergunta: "Qual é a estratégia Petrobras para transição energética em RH?",
      opcoes: {
        A: "Sem estratégia",
        B: "Requalificação de engenheiros de petróleo para renováveis, recrutamento tech, bolsas internacionais (MIT, Stanford)",
        C: "Apenas cortes",
        D: "Sem programa",
      },
      correta: "B",
      explicacao:
        "Petrobras 4.0: (1) 500 inscritos para requalificação (2) 200 treinados em energias limpas (3) Bolsa integral externa (4) Novos talentos tech.",
    },
    {
      id: "grh-m9-q4",
      pergunta: "Como Petrobras atrai talentos tech em competição com Google, Netflix?",
      opcoes: {
        A: "Não consegue",
        B: "Remuneração 20% acima mercado, flexibilidade (home office, 4 dias semana), trabalho em sustentabilidade",
        C: "Apenas oferece estabilidade",
        D: "Sem diferencial",
      },
      correta: "B",
      explicacao:
        "Estratégia: (1) Salário competitivo (2) Work-life balance (3) Propósito (energia sustentável) (4) Inovação visível.",
    },
    {
      id: "grh-m9-q5",
      pergunta: "Qual é o impacto da segurança em decisões de RH na Petrobras?",
      opcoes: {
        A: "Sem impacto",
        B: "Treinamento obrigatório 40 horas/ano, seleção rigorosa, saúde ocupacional preventiva, zero acidentes (aspiração)",
        C: "Apenas formalidade",
        D: "Sem foco",
      },
      correta: "B",
      explicacao:
        "Cultura de segurança Petrobras: (1) Treinamento extenso (2) Avaliação de risco (3) Equipamento pessoal obrigatório (4) Auditoria contínua.",
    },
    {
      id: "grh-m9-q6",
      pergunta: "O que é CESRT em contexto Petrobras?",
      opcoes: {
        A: "Sem significado",
        B: "Centro de Excelência em Segurança: treinamento especializado em segurança operacional offshore",
        C: "Apenas sigla administrativa",
        D: "Sem programa",
      },
      correta: "B",
      explicacao:
        "CESRT: Treinamento especializado em segurança para profissionais offshore, prepara psicologicamente e tecnicamente para ambiente de risco.",
    },
    {
      id: "grh-m9-q7",
      pergunta: "Qual é o diferencial de Petrobras em ESG (Environmental, Social, Governance)?",
      opcoes: {
        A: "Sem diferencial",
        B: "Compromisso com neutralidade de carbono 2050, diversidade de gênero 40%, comunidades indígenas (respeito)",
        C: "Apenas marketing",
        D: "Sem compromisso",
      },
      correta: "B",
      explicacao:
        "Compromissos Petrobras: (1) Carbono neutro 2050 (2) Mulheres 40% liderança até 2025 (3) Respeito a terras indígenas (4) Comunidades locais.",
    },
    {
      id: "grh-m9-q8",
      pergunta: "Na Petrobras, qual é o desafio de sindicalismo em RH?",
      opcoes: {
        A: "Sem desafio",
        B: "Sindicatos fortes = negociações complexas, pressão política, acordos salariais competitivos, greves possíveis",
        C: "Apenas formalidade",
        D: "Sem influência",
      },
      correta: "B",
      explicacao:
        "Sindicalismo forte na Petrobras: (1) Negociações anuais complexas (2) Greves (2023 exemplo) (3) Pressão política (4) Impacto na remuneração.",
    },
    {
      id: "grh-m9-q9",
      pergunta: "Qual é a estratégia Petrobras para reter engenheiros em era tech?",
      opcoes: {
        A: "Sem estratégia",
        B: "Competição de talentos, reconhecimento de inovação, projetos desafiadores (5G, IA), bolsas de especialização",
        C: "Apenas aumento salarial",
        D: "Sem programa",
      },
      correta: "B",
      explicacao:
        "Retenção: (1) Projetos desafiadores (2) Reconhecimento de inovação (3) Bolsas internacionais (4) Carreira tech clara.",
    },
    {
      id: "grh-m9-q10",
      pergunta: "Qual é o impacto de Programa Petrobras 4.0 em RH?",
      opcoes: {
        A: "Sem impacto",
        B: "30% dos projetos inovativos liderados por novos talentos, transição energética acelerada, retenção de ex-petrobraseiros",
        C: "Apenas custo",
        D: "Sem resultado",
      },
      correta: "B",
      explicacao:
        "Programa 4.0: (1) Atrai talentos tech (2) Requalifica base existente (3) Lídera inovação (4) Posiciona para futuro energético.",
    },
  ],
  "modulo-10": [
    {
      id: "grh-m10-q1",
      pergunta: "Uma startup de energia solar foi adquirida pela Petrobras. Qual deve ser a estratégia RH prioritária?",
      opcoes: {
        A: "Apenas reduzir custos",
        B: "Integração SIRH, retenção de talentos tech, alinhamento de cultura, programa de carreira unificado",
        C: "Apenas manter separado",
        D: "Sem estratégia",
      },
      correta: "B",
      explicacao:
        "Cenário integração: (1) SIRH unificado (2) Retenção com incentivos (3) Comunicação clara (4) Trilha de carreira combinada.",
    },
    {
      id: "grh-m10-q2",
      pergunta: "Qual KPI deve ser monitorado para sucesso de aquisição em RH?",
      opcoes: {
        A: "Apenas lucro financeiro",
        B: "Retenção > 90%, time-to-hire < 30 dias, engagement estável, zero atrito cultural",
        C: "Apenas salários",
        D: "Sem KPI",
      },
      correta: "B",
      explicacao:
        "Sucesso de aquisição: (1) Retenção alta (retém talentos-chave) (2) Rapidez contratação (preenche gaps) (3) Clima estável (4) Sem fricção.",
    },
    {
      id: "grh-m10-q3",
      pergunta: "Qual é o risco maior em aquisição de empresa tech?",
      opcoes: {
        A: "Sem risco",
        B: "Êxodo de talentos para concorrentes, perda de propriedade intelectual, desempenho reduzido",
        C: "Apenas custo",
        D: "Sem consequência",
      },
      correta: "B",
      explicacao:
        "Risco real: Tech é mobile (talentos saem fácil). Perda de top performers = perda de inovação. Ação: retenção agressiva (bônus, ações).",
    },
    {
      id: "grh-m10-q4",
      pergunta: "Em caso de reestruturação (fusão de 2 departamentos), qual é a prioridade RH?",
      opcoes: {
        A: "Apenas eficiência de custo",
        B: "Comunicação clara (motivos, timeline), transparência (quem sai/fica), suporte (outplacement), retenção críticos",
        C: "Apenas desligamentos",
        D: "Sem prioridade",
      },
      correta: "B",
      explicacao:
        "Gestão de reestruturação: (1) Comunicar cedo (reduz rumores) (2) Transparência (quem fica) (3) Suporte desligados (4) Retenção críticos.",
    },
    {
      id: "grh-m10-q5",
      pergunta: "Um departamento tem turnover 20% (muito acima da meta 8%). Qual é a resposta RH estruturada?",
      opcoes: {
        A: "Sem resposta",
        B: "Diagnóstico (stay interviews), análise de compensação, avaliação de liderança, implementação de programa de retenção, monitoramento",
        C: "Apenas aumentar salários",
        D: "Aceitar como normal",
      },
      correta: "B",
      explicacao:
        "Resposta estruturada: (1) Entender raízes (2) Remuneração justa (3) Liderança eficaz (4) Desenvolvimento visível (5) Medir progresso.",
    },
    {
      id: "grh-m10-q6",
      pergunta: "Como demonstrar ROI de investimento em programa de desenvolvimento?",
      opcoes: {
        A: "Impossível medir",
        B: "(Valor gerado em produtividade/inovação / Custo programa) - 1 × 100 = ROI%",
        C: "Apenas contar certificados",
        D: "Sem medição",
      },
      correta: "B",
      explicacao:
        "Cálculo ROI: Ex: Programa custa R$500k, gera R$1.5M em eficiência/inovação = 200% ROI em 1 ano.",
    },
    {
      id: "grh-m10-q7",
      pergunta: "Uma colaboradora denunciou assédio moral. Qual é o procedimento correto RH?",
      opcoes: {
        A: "Ignorar a denúncia",
        B: "Canal de denúncias anônimo, investigação independente (não local), confidencial, proteção contra represálias, ação disciplinar se comprovado",
        C: "Apenas formalidade",
        D: "Sem procedimento",
      },
      correta: "B",
      explicacao:
        "Assédio zero: (1) Recebe denúncia sério (2) Investigação independente (3) Confidencialidade (4) Zero represálias (5) Ação disciplinar se comprovado.",
    },
    {
      id: "grh-m10-q8",
      pergunta: "Qual é a melhor prática para onboarding de executivo sênior contratado externamente?",
      opcoes: {
        A: "Apenas primeiro dia",
        B: "Mentor de liderança, mapeamento de stakeholders, imersão em estratégia, coaching nos primeiros 90 dias",
        C: "Apenas apresentação",
        D: "Sem onboarding especial",
      },
      correta: "B",
      explicacao:
        "Onboarding executivo: (1) Mentor experiente (2) Introdução a stakeholders (3) Imersão em decisões (4) Coaching contínuo (primeira impressão crítica).",
    },
    {
      id: "grh-m10-q9",
      pergunta: "Em situação de corte de custos de 20%, qual deve ser a abordagem RH?",
      opcoes: {
        A: "Apenas desligamentos",
        B: "Diagnóstico estratégico, remanejamento, redução de horas (vs. desligamento), suporte psicossocial, comunicação transparente",
        C: "Mais rápido possível",
        D: "Sem planejamento",
      },
      correta: "B",
      explicacao:
        "Abordagem humanizada: (1) Remanejamento (2) Redução de jornada (3) Desligamento apenas se necessário (4) Suporte emocional (5) Comunicação clara.",
    },
    {
      id: "grh-m10-q10",
      pergunta: "Qual é a conclusão central de Gestão de Recursos Humanos na Petrobras?",
      opcoes: {
        A: "RH é apenas custo",
        B: "RH estratégica é parceria com liderança para atrair, desenvolver e reter talentos que impulsionam resultados corporativos",
        C: "RH é administrativo",
        D: "Sem importância",
      },
      correta: "B",
      explicacao:
        "Síntese final: RH não é overhead, é investimento em capital humano que gera vantagem competitiva duradoura. Petrobras reconhece isso no programa 4.0.",
    },
  ],
};
