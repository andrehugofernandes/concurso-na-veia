import { QuizQuestion } from "@/components/aulas/shared";

export const QUIZ_GESTAO_PESSOAS: Record<string, QuizQuestion[]> = {
  "modulo-1": [
    {
      id: 101,
      pergunta:
        "A gestão de pessoas moderna pode ser definida como um conjunto de práticas que busca atrair, integrar, desenvolver e reter talentos alinhados aos objetivos estratégicos. Qual das alternativas melhor descreve a transição histórica de AP (Administração de Pessoal) para Gestão de Pessoas estratégica?",
      opcoes: [
        {
          label: "A",
          valor:
            "Transição de foco exclusivamente em folha de pagamento para uma visão integrada de desenvolvimento humano e valor estratégico.",
        },
        {
          label: "B",
          valor:
            "Aumento no número de profissionais de RH e redução de custos operacionais.",
        },
        {
          label: "C",
          valor:
            "Implementação obrigatória de sistemas digitais e eliminação de papéis.",
        },
        {
          label: "D",
          valor:
            "Transferência de responsabilidades de GP para áreas de negócio apenas.",
        },
        {
          label: "E",
          valor: "Aumento de conflitos laborais e negociação constante com sindicatos.",
        },
      ],
      correta: "A",
      explicacao:
        "A evolução de AP para GP estratégica marca a transição de uma abordagem puramente administrativa (folha, documentação) para uma visão estratégica que integra desenvolvimento, retenção e alinhamento com negócio. Petrobras, por exemplo, passou de controles administrativos para programas de desenvolvimento de liderança e pipeline de talentos estratégicos.",
    },
    {
      id: 102,
      pergunta:
        "Os pilares estratégicos da gestão de pessoas incluem atração, desenvolvimento, retenção e engajamento. Qual destes pilares é MAIS crítico para uma empresa como Petrobras em período de transição energética (óleo & gás → renováveis)?",
      opcoes: [
        {
          label: "A",
          valor: "Atração: recrutamento de talentos em novas áreas (energia solar, eólica).",
        },
        { label: "B", valor: "Retenção: manter colaboradores nas operações existentes." },
        {
          label: "C",
          valor: "Engajamento: aumentar clima organizacional em refinarias.",
        },
        { label: "D", valor: "Desenvolvimento: programas genéricos de treinamento." },
        {
          label: "E",
          valor: "Rotação: transferências entre áreas sem planejamento.",
        },
      ],
      correta: "A",
      explicacao:
        "Em contexto de transição energética, Petrobras precisa atrair talentos com competências em renováveis (engenheiros em solar, eólica, baterias) enquanto retém conhecimento em óleo & gás. Atração estratégica de novos perfis é crítica para transformação digital e de negócio.",
    },
    {
      id: 103,
      pergunta:
        "Qual conceito melhor descreve o papel moderno de Gestão de Pessoas como parceira estratégica do negócio?",
      opcoes: [
        {
          label: "A",
          valor:
            "Executor de políticas: implementar decisões já tomadas pela diretoria.",
        },
        {
          label: "B",
          valor:
            "Parceiro estratégico: participar de decisões de negócio, estrutura organizacional e transformação.",
        },
        {
          label: "C",
          valor: "Departamento de serviços: processar folha, admissões e demissões.",
        },
        {
          label: "D",
          valor: "Mediador passivo: resolver conflitos sem propor soluções.",
        },
        {
          label: "E",
          valor:
            "Gestor de custos: reduzir despesas com pessoal a todo custo.",
        },
      ],
      correta: "B",
      explicacao:
        "GP estratégica participa de decisões sobre estrutura organizacional, transformação digital, sucessão de liderança e alocação de talentos. Na Petrobras, por exemplo, GP é consultada em decisões de expansão de negócios em renováveis e planejamento de reskilling.",
    },
    {
      id: 104,
      pergunta:
        "A dimensão GRUPAL da gestão de pessoas foca em qual aspecto organizacional?",
      opcoes: [
        {
          label: "A",
          valor: "Desenvolvimento individual de competências técnicas.",
        },
        { label: "B", valor: "Engajamento de times e dinâmica de grupos." },
        { label: "C", valor: "Alinhamento estratégico com objetivos corporativos." },
        { label: "D", valor: "Remuneração e benefícios individuais." },
        { label: "E", valor: "Carreira e progressão salarial pessoal." },
      ],
      correta: "B",
      explicacao:
        "Dimensão grupal envolve engajamento, trabalho em equipe, cultura colaborativa e dinâmica de grupos. É fundamental em ambientes como plataformas de Petrobras onde interdependência é alta e segurança depende de coesão.",
    },
    {
      id: 105,
      pergunta:
        "No contexto de Petrobras, qual competência é MAIS crítica para profissionais de gestão de pessoas em ambientes operacionais críticos (plataformas, refinarias)?",
      opcoes: [
        { label: "A", valor: "Domínio de tecnologia RH (sistemas, BI)." },
        {
          label: "B",
          valor:
            "Compreensão de dinâmica de segurança, cultura operacional e desafios de ambientes críticos.",
        },
        { label: "C", valor: "Habilidade de negociação com sindicatos." },
        { label: "D", valor: "Expertise em folha de pagamento e legislação." },
        {
          label: "E",
          valor: "Experiência prévia em empresas multinacionais.",
        },
      ],
      correta: "B",
      explicacao:
        "Ambientes críticos (plataformas offshore, refinarias) têm dinâmica própria: isolamento, riscos de segurança, cultura operacional forte. GP precisa compreender estes contextos para desenhar políticas relevantes (retenção em plataformas, bem-estar psicossocial, desenvolvimento de lideranças operacionais).",
    },
    {
      id: 106,
      pergunta:
        "Qual vantagem competitiva uma organização ganha ao implementar gestão de pessoas estratégica?",
      opcoes: [
        {
          label: "A",
          valor: "Redução imediata de custos operacionais em curto prazo.",
        },
        {
          label: "B",
          valor:
            "Capital humano diferenciado, retenção de talentos críticos e capacidade de inovação sustentável.",
        },
        { label: "C", valor: "Eliminação total de conflitos laborais." },
        { label: "D", valor: "Aumento automático de vendas e market share." },
        {
          label: "E",
          valor:
            "Conformidade automática com legislação trabalhista sem esforço.",
        },
      ],
      correta: "B",
      explicacao:
        "Vantagem competitiva vem de talento qualificado, engajado e retido. Petrobras investe em desenvolvimento para garantir pipeline de líderes, inovação contínua e resiliência estratégica em mudanças de mercado (transição energética).",
    },
  ],

  "modulo-2": [
    {
      id: 201,
      pergunta:
        "No planejamento de recrutamento, qual informação é ESSENCIAL para definir perfil de candidatos?",
      opcoes: [
        { label: "A", valor: "Análise detalhada de concorrentes de mercado." },
        {
          label: "B",
          valor:
            "Descrição de cargo, competências necessárias, nível hierárquico e objetivos da área.",
        },
        { label: "C", valor: "Histórico salarial de cargos similares." },
        { label: "D", valor: "Tendências de moda em recrutamento global." },
        {
          label: "E",
          valor: "Preferências pessoais do gestor direto.",
        },
      ],
      correta: "B",
      explicacao:
        "Planejamento de recrutamento começa com análise clara: quem é necessário, para quê, que competências, qual nível. Sem isso, todo processo é ineficiente. Na Petrobras, recrutadores trabalham com job descriptions detalhadas baseadas em análise de demanda.",
    },
    {
      id: 202,
      pergunta:
        "Qual é a principal diferença entre Recrutamento Interno e Recrutamento Externo?",
      opcoes: [
        {
          label: "A",
          valor: "Recrutamento interno é mais caro e demorado.",
        },
        {
          label: "B",
          valor:
            "Interno aproveita talentos existentes e desenvolve carreiras; Externo traz conhecimentos novos mas maior custo.",
        },
        {
          label: "C",
          valor: "Externo é obrigatório por lei em empresas públicas.",
        },
        {
          label: "D",
          valor: "Interno só funciona em grandes corporações.",
        },
        { label: "E", valor: "Externo garante sempre melhor qualificação." },
      ],
      correta: "B",
      explicacao:
        "Recrutamento interno reduz custos, mantém conhecimento institucional e motiva carreiras internas. Externo traz inovação e expande mercado de talentos. Estratégia mista é eficaz: em Petrobras, programas de recrutamento interno garantem oportunidades a colaboradores, enquanto recrutamento externo traz expertise em novas áreas.",
    },
    {
      id: 203,
      pergunta:
        "Employer Branding é a construção da imagem da empresa como empregadora. Qual ação MELHOR contribui para employer branding positivo?",
      opcoes: [
        { label: "A", valor: "Publicar anúncios de emprego frequentemente." },
        {
          label: "B",
          valor:
            "Demonstrar cultura, valores, oportunidades de carreira e bem-estar através de cases, redes sociais e relacionamento com universidades.",
        },
        { label: "C", valor: "Oferecer salários máximos sem benefícios." },
        { label: "D", valor: "Contratar rapidamente sem rigor de seleção." },
        {
          label: "E",
          valor:
            "Manter informações sobre empresa e oportunidades em sigilo.",
        },
      ],
      correta: "B",
      explicacao:
        "Employer branding é construído com transparência, demonstração de cultura e valores, storytelling sobre oportunidades. Petrobras investe em cases de trainees bem-sucedidos, presença em universidades, LinkedIn com conteúdo estratégico. Marca de empregadora atrativa atrai talentos melhor qualificados.",
    },
    {
      id: 204,
      pergunta:
        "A entrevista comportamental busca prever comportamento futuro através de situações passadas. Qual formato de pergunta é CARACTERÍSTICO de entrevista comportamental?",
      opcoes: [
        {
          label: "A",
          valor:
            "Qual seria sua primeira ação se promovido amanhã a este cargo?",
        },
        {
          label: "B",
          valor:
            "Descreva uma situação em que você enfrentou um conflito na equipe, como agiu e qual foi o resultado.",
        },
        { label: "C", valor: "Qual seu maior ponto fraco?" },
        {
          label: "D",
          valor: "Você consegue trabalhar sob pressão?",
        },
        {
          label: "E",
          valor: "Qual é sua meta de salário esperado?",
        },
      ],
      correta: "B",
      explicacao:
        "Entrevista comportamental utiliza formato STAR (Situation, Task, Action, Result): 'Descreva uma situação...'. Identifica competências reais através de exemplos concretos. Petrobras usa este formato extensivamente em seus processos seletivos para avaliar liderança, resiliência e integridade.",
    },
    {
      id: 205,
      pergunta:
        "No processo seletivo de Petrobras, a dinâmica de grupo é utilizada para avaliar qual dimensão comportamental?",
      opcoes: [
        {
          label: "A",
          valor: "Habilidades técnicas específicas do cargo.",
        },
        {
          label: "B",
          valor:
            "Competências comportamentais: trabalho em equipe, liderança, comunicação, resolução de conflitos.",
        },
        { label: "C", valor: "Apenas habilidades de escrita e redação." },
        { label: "D", valor: "Conhecimento de legislação trabalhista." },
        { label: "E", valor: "Experiência anterior em empresas similares." },
      ],
      correta: "B",
      explicacao:
        "Dinâmica de grupo observa como candidato interage em equipe, lidera, comunica-se, negocia. Essencial em Petrobras onde colaboração em times multidisciplinares é crítica. Comportamentos em dinâmica tendem a ser previsores de desempenho futuro.",
    },
    {
      id: 206,
      pergunta:
        "Qual é a principal função de uma matriz de avaliação ao final de um processo seletivo?",
      opcoes: [
        {
          label: "A",
          valor: "Aumentar o número de entrevistas realizadas.",
        },
        {
          label: "B",
          valor:
            "Padronizar e objetivar a comparação de candidatos em critérios pré-definidos, reduzindo vieses.",
        },
        { label: "C", valor: "Garantir que o mais experiente seja sempre selecionado." },
        { label: "D", valor: "Apenas documentar para arquivo da empresa." },
        { label: "E", valor: "Aumentar remuneração de entrada." },
      ],
      correta: "B",
      explicacao:
        "Matriz de avaliação padroniza critérios (competências técnicas, comportamentais, fit cultural) com escalas. Reduz vieses inconscientes e facilita comparação entre candidatos. Melhora qualidade da decisão de contratação. Petrobras usa matrizes estruturadas para garantir seleção consistente e justa.",
    },
  ],

  "modulo-3": [
    {
      id: 301,
      pergunta:
        "O checklist de admissão é fundamental para integração legal e administrativa. Qual documento NÃO é obrigatório no processo admissional brasileiro?",
      opcoes: [
        {
          label: "A",
          valor:
            "Registro de funcionário em CAGED (Cadastro Geral de Empregados e Desempregados).",
        },
        {
          label: "B",
          valor: "Inscrição na previdência social (INSS).",
        },
        {
          label: "C",
          valor: "Cópia de RG e CPF para arquivo pessoal.",
        },
        {
          label: "D",
          valor:
            "Comprovação de expertise em lidetura adquirida antes da admissão.",
        },
        {
          label: "E",
          valor: "Assinatura de contrato de trabalho (CLT ou PJ).",
        },
      ],
      correta: "D",
      explicacao:
        "Expertise em liderança não é obrigatória na admissão; é desenvolvida pós-contratação. Registros legais (CAGED, INSS, CPF), contrato e documentação são obrigatórios. Petrobras realiza checklist estruturado para garantir conformidade com legislação.",
    },
    {
      id: 302,
      pergunta:
        "Um programa de onboarding estruturado deve cobrir dimensões como informações gerais, sistemas e integração social. Qual é o objetivo PRIMÁRIO do onboarding?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas preencher formulários administrativos.",
        },
        {
          label: "B",
          valor:
            "Integrar rapidamente o novo colaborador à cultura, processos e equipe, reduzindo curva de aprendizagem e aumentando engajamento inicial.",
        },
        { label: "C", valor: "Testar competências do candidato selecionado." },
        {
          label: "D",
          valor: "Apenas apresentar benefícios de forma superficial.",
        },
        {
          label: "E",
          valor: "Aumentar pressão para demonstrar valor rápido.",
        },
      ],
      correta: "B",
      explicacao:
        "Onboarding bem executado reduz turnover nos primeiros 90 dias, acelera produtividade e cria engajamento inicial. Petrobras investe em programas estruturados de 6 meses para engenheiros trainees: rotações, mentoria, treinamentos, integração social. Resultado: retenção superior a 80%.",
    },
    {
      id: 303,
      pergunta:
        "Na Petrobras, qual dimensão de integração é CRÍTICA para novo colaborador em posição operacional em plataforma offshore?",
      opcoes: [
        {
          label: "A",
          valor: "Conhecimento detalhado da história corporativa da empresa.",
        },
        {
          label: "B",
          valor:
            "Treinamento intensivo de segurança operacional, código de conduta em ambientes críticos e protocolos de emergência.",
        },
        { label: "C", valor: "Memorização do organograma completo." },
        { label: "D", valor: "Participação em eventos sociais corporativos." },
        {
          label: "E",
          valor: "Leitura de políticas gerais sem aplicação prática.",
        },
      ],
      correta: "B",
      explicacao:
        "Ambientes críticos (plataformas, refinarias) exigem integração focada em segurança: protocolos de emergência, uso de EPI, procedimentos operacionais. Vida e saúde dependem disso. Petrobras investe horas intensas nesta dimensão durante onboarding operacional.",
    },
    {
      id: 304,
      pergunta:
        "O período probatório (90 dias) serve para avaliar aptidão do novo colaborador. Durante este período, qual responsabilidade é do GESTOR DIRETO?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas observar passivamente o desempenho sem feedback.",
        },
        {
          label: "B",
          valor:
            "Fornecer feedback contínuo aos 30, 60 e 90 dias, orientar em desafios, avaliar fit com equipe e cultura.",
        },
        { label: "C", valor: "Deixar que o colaborador aprenda sozinho." },
        {
          label: "D",
          valor: "Apenas documentar erros para eventual desligamento.",
        },
        {
          label: "E",
          valor:
            "Delegar completamente a integração a um colega sem acompanhamento.",
        },
      ],
      correta: "B",
      explicacao:
        "Gestor é responsável pela integração bem-sucedida: feedback contínuo, suporte, mentoria e avaliação periódica. Permite decisão informada ao final dos 90 dias. Petrobras exige que gestores façam avaliações estruturadas de probatório com base em critérios claros.",
    },
    {
      id: 305,
      pergunta:
        "Qual evento ou estratégia NÃO é recomendado como parte de integração social em programas modernos de onboarding?",
      opcoes: [
        { label: "A", valor: "Almoço de boas-vindas com a equipe." },
        { label: "B", valor: "Designação de um mentor/buddy para os primeiros dias." },
        {
          label: "C",
          valor:
            "Sobrecarga imediata com tarefas complexas para 'testar' capacidade sob pressão.",
        },
        {
          label: "D",
          valor: "Tour pelas instalações principais e apresentação de líderes.",
        },
        {
          label: "E",
          valor: "Atividades de team building ou happy hour com colegas.",
        },
      ],
      correta: "C",
      explicacao:
        "Sobrecarga imediata é contraproducente: aumenta ansiedade, reduz aprendizado e pode gerar desligamento precoce. Onboarding eficaz é gradual: simples → complexo. Petrobras estrutura primeiras semanas com tarefas de baixa complexidade para consolidação básica.",
    },
    {
      id: 306,
      pergunta:
        "Após completar período probatório com aprovação, qual documento é formalizado com o colaborador?",
      opcoes: [
        {
          label: "A",
          valor: "Contrato de demissão automática ao final de 1 ano.",
        },
        {
          label: "B",
          valor:
            "Confirmação de matrícula na empresa e formalização como colaborador permanente (ou por tempo determinado).",
        },
        { label: "C", valor: "Demissão imediata sem aviso prévio." },
        { label: "D", valor: "Reajuste salarial automático de 50%." },
        {
          label: "E",
          valor:
            "Transferência obrigatória para outra área sem escolha do colaborador.",
        },
      ],
      correta: "B",
      explicacao:
        "Ao fim de probatório aprovado, empresa confirma colaborador como permanente (CLT) ou renova contrato (PJ/Terceiro). Petrobras formaliza confirmação com documento, podendo incluir comunicação de expectativas de carreira e benefícios confirmados.",
    },
  ],

  "modulo-4": [
    {
      id: 401,
      pergunta:
        "Mapeamento de competências identifica gap entre o que colaborador sabe e o que é necessário. Qual ferramenta é MAIS comum para este mapeamento?",
      opcoes: [
        {
          label: "A",
          valor: "Observação informal de desempenho no dia a dia.",
        },
        {
          label: "B",
          valor:
            "Formulário estruturado ou entrevista com gestor e colaborador, avaliando competências técnicas e comportamentais.",
        },
        { label: "C", valor: "Teste de QI genérico." },
        { label: "D", valor: "Análise de histórico de férias." },
        { label: "E", valor: "Pesquisa de satisfação anônima." },
      ],
      correta: "B",
      explicacao:
        "Mapeamento estruturado (formulário ou entrevista) identifica competências atuais vs necessárias, criando visão clara de gaps. Petrobras utiliza ferramentas como Assessment Centers e formulários estruturados para mapeamento de competências de lideranças e trainees.",
    },
    {
      id: 402,
      pergunta:
        "Plano de Desenvolvimento Individual (PDI) é um documento que define ações de desenvolvimento. Qual informação NÃO deve estar em um PDI bem elaborado?",
      opcoes: [
        { label: "A", valor: "Objetivos de desenvolvimento claros e mensuráveis." },
        {
          label: "B",
          valor: "Ações específicas (cursos, projetos, mentorias) com cronograma.",
        },
        {
          label: "C",
          valor:
            "Garantia absoluta de promoção ao fim do período, independente de resultados.",
        },
        {
          label: "D",
          valor: "Indicadores de sucesso e responsáveis pelo acompanhamento.",
        },
        { label: "E", valor: "Revisão periódica (trimestral ou semestral)." },
      ],
      correta: "C",
      explicacao:
        "PDI estabelece ações de desenvolvimento, não garante promoção automática. Promoção depende de resultados, performance e oportunidades organizacionais. PDI é compromisso de desenvolvimento, não entitlement de carreira. Petrobras usa PDI como ferramenta de engajamento e desenvolvimento, mas promoção é meritocrática.",
    },
    {
      id: 403,
      pergunta:
        "A metodologia 70-20-10 de aprendizagem distribui desenvolvimento em: 70% aprendizagem no trabalho, 20% relacionamento e 10% educação formal. Qual dimensão é MAIS importante?",
      opcoes: [
        { label: "A", valor: "Educação formal (cursos, MBAs, certificações)." },
        {
          label: "B",
          valor:
            "Todas são igualmente importantes; combinação (blended learning) é mais eficaz que isoladas.",
        },
        {
          label: "C",
          valor: "Relacionamento e mentoria (networking).",
        },
        { label: "D", valor: "Aprendizagem no trabalho através de projetos e desafios." },
        { label: "E", valor: "Leitura de livros técnicos." },
      ],
      correta: "B",
      explicacao:
        "Nenhuma dimensão sozinha é suficiente. 70-20-10 reflete que aprendizagem acontece principalmente NO TRABALHO (70%), complementada por mentoria (20%) e formação (10%). Petrobras investe em blended learning: projetos desafiadores (70%), programa de mentoring (20%), universidade corporativa (10%).",
    },
    {
      id: 404,
      pergunta:
        "Qual é a diferença entre carreira ESPECIALISTA e carreira GERENCIAL?",
      opcoes: [
        {
          label: "A",
          valor:
            "Especialista aprofunda conhecimento técnico; Gerencial desenvolve competências de liderança de pessoas.",
        },
        { label: "B", valor: "Especialista recebe menos salário." },
        { label: "C", valor: "Gerencial é única opção de progressão." },
        {
          label: "D",
          valor: "Especialista é apenas para técnicos, não para graduados.",
        },
        {
          label: "E",
          valor: "Carreira gerencial garante mais segurança de emprego.",
        },
      ],
      correta: "A",
      explicacao:
        "Duas trajetórias: Especialista (aprofundamento técnico, reconhecimento de expertise) e Gerencial (liderança de pessoas, gestão). Ambas são válidas e bem recompensadas. Petrobras oferece dois caminhos para reter talentos técnicos excelentes que não desejam ser gestores.",
    },
    {
      id: 405,
      pergunta:
        "Pipeline de talentos para posições críticas é uma prática de sucessão estratégica. Qual é seu objetivo PRIMÁRIO?",
      opcoes: [
        {
          label: "A",
          valor: "Reduzir salários de executivos em posições críticas.",
        },
        {
          label: "B",
          valor:
            "Garantir continuidade estratégica identificando e desenvolvendo potenciais sucessores para cargos-chave.",
        },
        { label: "C", valor: "Evitar contratar no mercado externo." },
        {
          label: "D",
          valor: "Apenas documentar organograma futuro.",
        },
        {
          label: "E",
          valor: "Reduzir diversidade de perfis na liderança.",
        },
      ],
      correta: "B",
      explicacao:
        "Pipeline antecipa demandas de sucessão (aposentadorias, promoções), desenvolve potenciais sucessores através de projetos desafiadores, e garante transição suave. Petrobras investe em programas de sucessão de VP e diretores, garantindo estabilidade e visão de longo prazo.",
    },
    {
      id: 406,
      pergunta:
        "Rotação de cargos é uma estratégia de desenvolvimento em grandes corporações. Qual é a principal vantagem desta estratégia?",
      opcoes: [
        {
          label: "A",
          valor: "Reduzir custos de folha de pagamento.",
        },
        {
          label: "B",
          valor:
            "Desenvolver visão sistêmica, ampliar rede de relacionamentos e preparar para posições estratégicas.",
        },
        { label: "C", valor: "Eliminar especialistas de áreas." },
        { label: "D", valor: "Apenas cumprir período mínimo de permanência." },
        { label: "E", valor: "Diminuir engajamento através de instabilidade." },
      ],
      correta: "B",
      explicacao:
        "Rotação (particularmente em Petrobras com múltiplos negócios: E&P, Refino, Distribuição, Renováveis) desenvolve líderes com visão ampla, criam rede de contatos e preparam para posições executivas de alto nível. Trainees Petrobras, por exemplo, rodam por 3 áreas antes de colocação definitiva.",
    },
  ],

  "modulo-5": [
    {
      id: 501,
      pergunta:
        "A avaliação de desempenho serve a três objetivos simultâneos. Qual objetivo é ADMINISTRATIVO?",
      opcoes: [
        {
          label: "A",
          valor:
            "Identificar e comunicar gaps de competências para desenvolvimento.",
        },
        {
          label: "B",
          valor:
            "Definir base para decisões de aumento salarial, bônus, promoção ou desligamento.",
        },
        { label: "C", valor: "Estruturar feedback informal." },
        { label: "D", valor: "Apenas documentar conversas gerenciais." },
        { label: "E", valor: "Aumentar horas trabalhadas." },
      ],
      correta: "B",
      explicacao:
        "Objetivo administrativo: subsidiar decisões sobre remuneração, promoção, desligamento. Petrobras utiliza avaliação de desempenho como base para 13° adicional, PLR diferenciada e progressão salarial dentro de faixas.",
    },
    {
      id: 502,
      pergunta:
        "Avaliação 360° coleta feedback de múltiplas fontes: gerente, pares, subordinados e autoavaliação. Qual é sua PRINCIPAL vantagem?",
      opcoes: [
        {
          label: "A",
          valor: "Reduzir trabalho de coleta de dados administrativos.",
        },
        {
          label: "B",
          valor:
            "Visão multidimensional e redução de vieses ao avaliar comportamentos e liderança de múltiplas perspectivas.",
        },
        { label: "C", valor: "Garantir que resultado é sempre positivo." },
        { label: "D", valor: "Apenas aumentar número de formulários." },
        { label: "E", valor: "Facilitar demissões sem contestação." },
      ],
      correta: "B",
      explicacao:
        "360° é mais justo e completo que avaliação unilateral (apenas gestor). Identifica pontos cegos: liderança vista como excelente pelo gerente mas pobre pelos subordinados. Petrobras utiliza 360° para avaliar lideranças em programas de desenvolvimento e sucessão.",
    },
    {
      id: 503,
      pergunta:
        "Gestão de desempenho contínua (one-on-ones mensais, feedback informal) é diferente de avaliação formal anual. Qual é o benefício PRIMÁRIO?",
      opcoes: [
        {
          label: "A",
          valor:
            "Eliminar a necessidade de avaliação formal ao fim do ano.",
        },
        {
          label: "B",
          valor:
            "Identificar problemas rapidamente, orientar em tempo real, aumentar engajamento e reduzir surpresas em avaliação formal.",
        },
        { label: "C", valor: "Apenas aumentar burocracia administrativa." },
        {
          label: "D",
          valor: "Reduzir contato entre gerente e subordinado.",
        },
        { label: "E", valor: "Garantir que ninguém será promovido." },
      ],
      correta: "B",
      explicacao:
        "Feedback contínuo permite ajustes durante o período, não apenas ao final. Petrobras implementa cadeia de one-on-ones nas áreas modernas: feedback mensal sobre desempenho, desenvolvimento e bem-estar, reduzindo surpresas na avaliação formal.",
    },
    {
      id: 504,
      pergunta:
        "Curva de distribuição normal forçada (10% excelente, 80% bom, 10% insuficiente) é controversa. Qual é a PRINCIPAL crítica?",
      opcoes: [
        {
          label: "A",
          valor: "Aumenta custos de processamento administrativo.",
        },
        {
          label: "B",
          valor:
            "Pode desmotivar talentos ao forçar distribuição em curva independente de desempenho real, criando injustiça.",
        },
        { label: "C", valor: "Reduz número de funcionários." },
        {
          label: "D",
          valor:
            "Apenas afeta empresas pequenas, não corporações grandes.",
        },
        { label: "E", valor: "Aumenta segurança de emprego." },
      ],
      correta: "B",
      explicacao:
        "Forçar curva normal pode resultar em avaliar equipe excelente como se tivesse 10% de insuficientes (quando na realidade não há). Desmotiva e é injusto. Modelos modernos (como Petrobras está adotando) preferem avaliação sem forçar distribuição, alinhada com resultados reais.",
    },
    {
      id: 505,
      pergunta:
        "High Performers são colaboradores de desempenho excepcional. Como organização deve tratá-los diferentemente?",
      opcoes: [
        {
          label: "A",
          valor: "Tratá-los igual aos demais para evitar inveja.",
        },
        {
          label: "B",
          valor:
            "Programas especiais de desenvolvimento, projetos desafiadores, remuneração diferenciada e plano claro de carreira.",
        },
        { label: "C", valor: "Apenas elogiá-los publicamente." },
        { label: "D", valor: "Sobrecarregá-los sem benefício adicional." },
        { label: "E", valor: "Evitar promovê-los para mantê-los na posição." },
      ],
      correta: "B",
      explicacao:
        "Reter high performers exige investimento específico: coaching, mentoria sênior, projetos estratégicos, remuneração acima de mercado. Petrobras identificava 20% de high performers anualmente e aplicava programas especiais para reter talento crítico.",
    },
    {
      id: 506,
      pergunta:
        "Qual é o papel do feedback negativo (áreas de melhoria) em uma avaliação equilibrada?",
      opcoes: [
        {
          label: "A",
          valor: "Deve ser evitado para não desmotivar o colaborador.",
        },
        {
          label: "B",
          valor:
            "Essencial para orientar desenvolvimento real; deve ser específico, comportamental e construtivo com plano de ação.",
        },
        { label: "C", valor: "Apenas para justificar demissão." },
        {
          label: "D",
          valor:
            "Deve ser mantido em sigilo, não comunicado ao colaborador.",
        },
        { label: "E", valor: "É sinônimo de comunicação de demissão." },
      ],
      correta: "B",
      explicacao:
        "Feedback construtivo sobre áreas de melhoria é fundamental para desenvolvimento. Deve ser específico (não genérico), comportamental (ações, não características) e com plano de ação. Petrobras treina gestores em feedback eficaz: crítica balanceada com ação e apoio.",
    },
  ],

  "modulo-6": [
    {
      id: 601,
      pergunta:
        "Uma política remuneratória market-plus significa que empresa paga ACIMA do mercado. Qual é a estratégia associada?",
      opcoes: [
        {
          label: "A",
          valor: "Reduzir custos ao máximo possível.",
        },
        {
          label: "B",
          valor:
            "Atrair e reter talentos premium através de remuneração competitiva superior; estratégia comum em inovação ou contextos de escassez de talentos.",
        },
        { label: "C", valor: "Eliminar benefícios complementares." },
        { label: "D", valor: "Apenas parecer generosa publicamente." },
        {
          label: "E",
          valor:
            "Pagar mais sem base de desempenho ou estratégia clara.",
        },
      ],
      correta: "B",
      explicacao:
        "Market-plus é estratégia deliberada para atração de talentos críticos. Petrobras usa esta estratégia para recrutamento de engenheiros especializados em tecnologias novas (energia renovável, digital), onde mercado é competitivo.",
    },
    {
      id: 602,
      pergunta:
        "Pesquisa salarial coleta dados sobre salários de mercado. Qual é seu USO PRIMÁRIO em gestão salarial?",
      opcoes: [
        {
          label: "A",
          valor:
            "Apenas satisfazer curiosidade sobre concorrentes.",
        },
        {
          label: "B",
          valor:
            "Definir posicionamento competitivo: market-plus, market-match ou market-lag conforme estratégia de atração.",
        },
        { label: "C", valor: "Garantir que salários aumentarão automaticamente." },
        { label: "D", valor: "Justificar redução de salários." },
        { label: "E", valor: "Apenas criar relatório anual sem ação." },
      ],
      correta: "B",
      explicacao:
        "Pesquisa salarial informa decisão estratégica sobre posicionamento competitivo. Petrobras realiza pesquisa anual (fontes: Mercer, FIA, mercado) para posicionar salários de forma estratégica: market-plus em cargos críticos, market-match em cargos padrão.",
    },
    {
      id: 603,
      pergunta:
        "Participação em Lucros e Resultados (PLR) é remuneração variável. Qual é sua característica PRINCIPAL?",
      opcoes: [
        {
          label: "A",
          valor:
            "É obrigatória e igualitária para todos os colaboradores.",
        },
        {
          label: "B",
          valor:
            "Conecta remuneração a resultados da empresa ou área; proporciona a participação nos lucros gerados, podendo variar 2-5+ meses.",
        },
        { label: "C", valor: "Substitui completamente o 13º salário." },
        {
          label: "D",
          valor:
            "Apenas aplica-se a cargos de vendas.",
        },
        { label: "E", valor: "É garantida independentemente de resultados." },
      ],
      correta: "B",
      explicacao:
        "PLR é variável: vinculada a metas (EBITDA, produção, segurança). Petrobras paga PLR ao fim do ano/período se metas são atingidas; pode variar de 2 a 5 meses. Cria alinhamento de objetivos entre colaboradores e empresa.",
    },
    {
      id: 604,
      pergunta:
        "Qual benefício é MAIS importante para retenção em empresas com ambientes críticos (plataformas offshore, refinarias)?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas vale-refeição e vale-transporte padrão.",
        },
        {
          label: "B",
          valor:
            "Saúde (médico/odontológico premium), seguros especiais, auxílio psicológico e programas de bem-estar mental para lidar com isolamento e stress.",
        },
        { label: "C", valor: "Apenas desconto em produtos da empresa." },
        {
          label: "D",
          valor: "Academia de ginástica genérica.",
        },
        { label: "E", valor: "Apenas cartão de crédito corporativo." },
      ],
      correta: "B",
      explicacao:
        "Ambientes críticos com isolamento (plataformas 14/14) requerem benefícios focados em bem-estar mental: suporte psicológico, seguros especiais, plano de saúde premium. Petrobras investe em psicólogos em plataformas e programa de prevenção a suicídio entre petroleiros.",
    },
    {
      id: 605,
      pergunta:
        "Estrutura salarial com bandas salariais por nível permite progressão dentro da banda. Qual é a vantagem desta abordagem?",
      opcoes: [
        {
          label: "A",
          valor: "Elimina necessidade de avaliação de desempenho.",
        },
        {
          label: "B",
          valor:
            "Transparência sobre trajetória salarial possível, reconhecimento de performance dentro da banda, reduz desigualdades arbitrárias.",
        },
        { label: "C", valor: "Garante que todos recebem igual salário." },
        { label: "D", valor: "Apenas reduz custos de forma indiscriminada." },
        { label: "E", valor: "Elimina a necessidade de pesquisa de mercado." },
      ],
      correta: "B",
      explicacao:
        "Bandas salariais (ex: Junior R$ 5-8k, Pleno R$ 8-12k, Senior R$ 12-18k) permitem progressão meritocrática dentro de cada nível enquanto mantêm estrutura de equidade. Petrobras usa bandas com critérios de progressão clara: desempenho, antigüidade, competências.",
    },
    {
      id: 606,
      pergunta:
        "A revisão periódica de salários pode ser anual ou vinculada a inflação. Qual abordagem é MAIS recomendada em contexto de inflação alta?",
      opcoes: [
        {
          label: "A",
          valor:
            "Não revisar salários para economizar custos.",
        },
        {
          label: "B",
          valor:
            "Revisar anualmente de forma estratégica, considerando inflação, mercado e performance, para manter poder de compra e competitividade.",
        },
        { label: "C", valor: "Apenas revisar para cargos de liderança." },
        {
          label: "D",
          valor: "Revisar apenas a cada 3 anos.",
        },
        { label: "E", valor: "Revisar retroativamente apenas ao pedir demissão." },
      ],
      correta: "B",
      explicacao:
        "Em contextos de inflação, falta de revisão reduz poder de compra e motiva demissões. Petrobras realiza revisão anual com indexação parcial a inflação e reajuste por méritos, balanceando capacidade de pagamento com competitividade de mercado.",
    },
  ],

  "modulo-7": [
    {
      id: 701,
      pergunta:
        "A CLT (Consolidação das Leis do Trabalho) é o marco legal trabalhista no Brasil. Em que ano foi criada e qual é seu escopo?",
      opcoes: [
        {
          label: "A",
          valor: "1988; regulamenta todos os direitos constitucionais.",
        },
        {
          label: "B",
          valor:
            "1943; estabelece base do direito trabalhista: contrato de trabalho, jornada, férias, segurança, rescisão.",
        },
        { label: "C", valor: "2020; reforma apenas trabalho digital." },
        { label: "D", valor: "2000; reduz direitos de trabalhadores." },
        { label: "E", valor: "1891; cria apenas direito de greve." },
      ],
      correta: "B",
      explicacao:
        "CLT criada em 1943 por Getúlio Vargas; é fundação do direito trabalhista brasileiro. Define contrato, jornada de 8h, férias remuneradas, 13º, FGTS, direitos de segurança. Petrobras opera sob CLT para praticamente todos os seus colaboradores.",
    },
    {
      id: 702,
      pergunta:
        "Qual direito fundamental NÃO é garantido pela CLT a um trabalhador celetista brasileiro?",
      opcoes: [
        { label: "A", valor: "Salário mínimo e jornada máxima de 8 horas." },
        {
          label: "B",
          valor: "Décimo terceiro (13º salário) e férias remuneradas.",
        },
        {
          label: "C",
          valor:
            "Garantia de emprego vitalício sem possibilidade de demissão a qualquer tempo.",
        },
        {
          label: "D",
          valor:
            "FGTS (Fundo de Garantia do Tempo de Serviço) e seguro-desemprego.",
        },
        { label: "E", valor: "Filiação a sindicato (direito, não obrigação)." },
      ],
      correta: "C",
      explicacao:
        "CLT não garante emprego vitalício. Demissão sem justa causa é permitida com aviso prévio e indenização do FGTS. Demissão com justa causa (roubo, agressão) não gera indenização. Petrobras, como empresa privada, pode demitir respeitando procedimentos legais.",
    },
    {
      id: 703,
      pergunta:
        "Convenção Coletiva é negociação entre sindicato de patrões e sindicato de trabalhadores. Qual é sua diferença com Acordo Coletivo?",
      opcoes: [
        {
          label: "A",
          valor: "Não há diferença; são sinônimos.",
        },
        {
          label: "B",
          valor:
            "Convenção: entre sindicatos. Acordo: entre empresa e comissão de representantes. Ambas têm vigência até 2 anos.",
        },
        { label: "C", valor: "Convenção é vinculante; Acordo é opcional." },
        { label: "D", valor: "Apenas Convenção aplicam-se a Petrobras." },
        {
          label: "E",
          valor:
            "Acordo Coletivo não é reconhecido legalmente.",
        },
      ],
      correta: "B",
      explicacao:
        "Convenção: negociação entre sindicatos (ex: Sindicato de Petroliferos vs Sindicato de Patrões do Petróleo). Acordo: negociação entre empresa e comissão de trabalhadores. Ambas estabelecem pisos salariais, benefícios, jornada. Petrobras negocia anualmente reajuste salarial via convenção com Sindepetro.",
    },
    {
      id: 704,
      pergunta:
        "Qual é o procedimento CORRETO para desligamento de um colaborador sem justa causa em regime CLT?",
      opcoes: [
        {
          label: "A",
          valor:
            "Demissão imediata sem aviso nem documentação.",
        },
        {
          label: "B",
          valor:
            "Aviso prévio (30 dias ou indenização), comunicação formal, assinatura de TRCT (Termo de Rescisão de Contrato de Trabalho), liberação de FGTS.",
        },
        { label: "C", valor: "Apenas notificação verbal ao colaborador." },
        { label: "D", valor: "Demissão via e-mail sem documentação." },
        { label: "E", valor: "Reter FGTS como penalidade." },
      ],
      correta: "B",
      explicacao:
        "Procedimento legal: notificação de demissão (aviso prévio 30 dias OU indenição), assinatura de TRCT listando valores (férias, 13º proporcional, FGTS, multa FGTS 40%), comunicação ao sindicato se aplicável. Petrobras segue rigorosamente procedimento legal.",
    },
    {
      id: 705,
      pergunta:
        "Normas de Segurança do Trabalho (NRs) são obrigatórias no Brasil. Em contexto de plataforma offshore, qual NR é crítica?",
      opcoes: [
        { label: "A", valor: "NR 10 (Segurança em Eletricidade)." },
        {
          label: "B",
          valor:
            "NR 30 (Segurança em Trabalho Aquaviário) para operações em plataformas; NR 1-37 aplicam-se de forma geral.",
        },
        { label: "C", valor: "NR 17 (Ergonomia em escritórios)." },
        { label: "D", valor: "NR 6 (EPI - apenas para fabricantes)." },
        { label: "E", valor: "NRs não aplicam-se a operações offshore." },
      ],
      correta: "B",
      explicacao:
        "NR 30 é específica para ambientes aquaviários (plataformas, navios). Petrobras implementa NR 30 rigorosamente: EPI obrigatório, treinamento intensivo de segurança, SESMT em plataformas, CIPA, investigação de acidentes, programa de prevenção.",
    },
    {
      id: 706,
      pergunta:
        "Qual é o papel do SESMT (Serviço Especializado em Engenharia de Segurança e Saúde Ocupacional) em uma empresa?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas cumprir formalidades legais de documentação.",
        },
        {
          label: "B",
          valor:
            "Atuar preventivamente: identificar riscos, treinar colaboradores, investigar acidentes, aconselhar gestores em saúde ocupacional.",
        },
        { label: "C", valor: "Apenas informar sobre acidentes após ocorrência." },
        {
          label: "D",
          valor:
            "Apenas lidar com custos de trabalhadores acidentados.",
        },
        { label: "E", valor: "Reduzir custos com segurança." },
      ],
      correta: "B",
      explicacao:
        "SESMT é equipe multidisciplinar (médico trabalho, enfermeiro, engenheiro segurança, técnico segurança) que atua na PREVENÇÃO: análise de riscos, treinamentos, avaliações periódicas, investigação de acidentes. Petrobras investe em SESMT robustos em plataformas: vida e saúde dependem disso.",
    },
  ],

  "modulo-8": [
    {
      id: 801,
      pergunta:
        "Conflitos organizacionais podem originar-se de múltiplas causas. Qual das alternativas NÃO é causa comum de conflito?",
      opcoes: [
        {
          label: "A",
          valor: "Falta de clareza de papéis e responsabilidades.",
        },
        { label: "B", valor: "Competição por recursos limitados." },
        {
          label: "C",
          valor:
            "Quando todos os colaboradores têm exatamente os mesmos valores e objetivos.",
        },
        {
          label: "D",
          valor: "Falta de comunicação eficaz entre áreas.",
        },
        { label: "E", valor: "Mudanças organizacionais mal conduzidas." },
      ],
      correta: "C",
      explicacao:
        "Se todos tivessem valores/objetivos idênticos, não haveria conflito. Conflitos emergem justamente da diversidade: diferenças de valores, objetivos, prioridades. Petrobras, com múltiplas áreas (E&P, Refino, Distribuição, Renováveis), frequentemente enfrenta conflitos de priorização de recursos.",
    },
    {
      id: 802,
      pergunta:
        "Conflito de relacionamento é diferente de conflito de tarefa. Qual é a principal diferença?",
      opcoes: [
        {
          label: "A",
          valor:
            "Conflito de tarefa é mais grave e requer ação imediata de desligamento.",
        },
        {
          label: "B",
          valor:
            "Tarefa: sobre Como fazer o trabalho. Relacionamento: pessoal/emocional. Ambos requerem mediação, mas abordagens diferem.",
        },
        { label: "C", valor: "Relacionamento nunca acontece em corporações." },
        {
          label: "D",
          valor: "Apenas conflito de relacionamento é prejudicial.",
        },
        {
          label: "E",
          valor:
            "Conflito de tarefa desaparece com mais treinamento técnico.",
        },
      ],
      correta: "B",
      explicacao:
        "Conflito de tarefa (como estruturar projeto) é mais fácil de resolver com dados/decisão. Relacionamento (antipatia pessoal, desrespeito) é mais delicado e exige mediação focada em restaurar confiança. Petrobras treina gestores em diferenciar e mediar ambos.",
    },
    {
      id: 803,
      pergunta:
        "De acordo com Thomas-Kilmann, qual estilo de resolução de conflito é recomendado quando há URGÊNCIA e gerente tem autoridade clara?",
      opcoes: [
        { label: "A", valor: "Evitar: adiar qualquer decisão." },
        {
          label: "B",
          valor:
            "Competir: decisão rápida pelo gerente; eficiente em crise, mas pode prejudicar relacionamento se abusado.",
        },
        {
          label: "C",
          valor: "Colaborar: sempre melhor em qualquer situação.",
        },
        { label: "D", valor: "Acomodar: ceder sempre ao conflitante." },
        { label: "E", valor: "Comprometer: dividir diferença sempre." },
      ],
      correta: "B",
      explicacao:
        "Estilo competir é apropriado em situações de CRISE/URGÊNCIA onde decisão rápida é crítica (ex: acidente em plataforma, Petrobras precisa de ação imediata sem debate prolongado). Em contextos normais, colaborar é preferível. Conhecer contexto ajuda escolher estilo adequado.",
    },
    {
      id: 804,
      pergunta:
        "O estilo COLABORAR na resolução de conflitos busca solução de qual tipo?",
      opcoes: [
        {
          label: "A",
          valor:
            "Vitória de um lado (vencedor/perdedor).",
        },
        {
          label: "B",
          valor:
            "Ganha-ganha integrado: ambas as partes saem satisfeitas com solução criativa que integra interesses comuns.",
        },
        { label: "C", valor: "Divisão 50/50 de recursos." },
        {
          label: "D",
          valor: "Adiamento indefinido do conflito.",
        },
        { label: "E", valor: "Uma parte cedendo completamente à outra." },
      ],
      correta: "B",
      explicacao:
        "Colaboração busca solução integrada onde ambas as partes ganham: ex: Operações quer máquina para expansão, Manutenção precisa dela para revisão. Solução colaborativa: sequenciar (uso 3 meses Op, depois 2 meses Man) atende ambas as necessidades. Petrobras encoraja colaboração em times multidisciplinares.",
    },
    {
      id: 805,
      pergunta:
        "Qual técnica de mediação é MAIS importante para resolver conflito de relacionamento?",
      opcoes: [
        {
          label: "A",
          valor:
            "Usar autoridade para impor solução sem ouvir as partes.",
        },
        {
          label: "B",
          valor:
            "Escuta ativa: ouvir genuinamente cada parte, validar sentimentos, buscar interesses comuns, gerar alternativas consenso.",
        },
        { label: "C", valor: "Apenas comunicar a decisão final." },
        { label: "D", valor: "Punir imediatamente quem começou conflito." },
        {
          label: "E",
          valor:
            "Evitar conversa direta; resolver via terceiros.",
        },
      ],
      correta: "B",
      explicacao:
        "Escuta ativa e validação emocional são fundamentais em conflitos de relacionamento. Permite que partes se sintam ouvidas e facilitam busca de solução conjunta. Petrobras treina mediadores (often HR professionals) em técnicas de escuta e geração de consenso.",
    },
    {
      id: 806,
      pergunta:
        "Qual é a consequência de NÃO resolver conflitos organizacionais adequadamente?",
      opcoes: [
        {
          label: "A",
          valor: "Conflitos desaparecem naturalmente com o tempo.",
        },
        {
          label: "B",
          valor:
            "Reduz engajamento, produtividade, aumenta absenteísmo, turnover e pode levar a processos judiciais trabalhistas.",
        },
        { label: "C", valor: "Aumenta inovação ao estimular debate." },
        { label: "D", valor: "Melhora clima organizacional." },
        {
          label: "E",
          valor:
            "Apenas afeta relacionamentos pessoais, não negócio.",
        },
      ],
      correta: "B",
      explicacao:
        "Conflitos não resolvidos: absenteísmo aumenta, colaboradores buscam outras empresas, produtividade cai, podem virar processos judiciais. Custos podem ser significativos. Petrobras monitora clima via pesquisas periódicas e media conflitos rapidamente para evitar escalação.",
    },
  ],

  "modulo-9": [
    {
      id: 901,
      pergunta:
        "A Petrobras opera em ambientes críticos como plataformas offshore e refinarias. Qual característica MAIS impacta gestão de pessoas neste contexto?",
      opcoes: [
        {
          label: "A",
          valor: "Facilidade de comunicação com todos os colaboradores.",
        },
        {
          label: "B",
          valor:
            "Isolamento geográfico (14/14 em plataformas), alto risco de segurança, cultura operacional forte, necessidade de coesão de equipe.",
        },
        { label: "C", valor: "Facilidade de rotação de pessoal." },
        {
          label: "D",
          valor:
            "Não há diferenças significativas com escritórios corporativos.",
        },
        { label: "E", valor: "Menor necessidade de treinamento de segurança." },
      ],
      correta: "B",
      explicacao:
        "Ambientes críticos exigem GP especializada: retenção através de benefícios diferenciados (saúde, bem-estar mental), onboarding rigoroso em segurança, liderança forte, comunicação clara. Petrobras reconhece especificidades e investe diferentemente em plataformas vs escritórios.",
    },
    {
      id: 902,
      pergunta:
        "A transição energética (óleo & gás → renováveis) criou desafio crítico para RH. Qual é o principal?",
      opcoes: [
        {
          label: "A",
          valor: "Aumento automático de salários.",
        },
        {
          label: "B",
          valor:
            "Atração de talentos em novas tecnologias (solar, eólica, baterias) e reskilling de colaboradores em óleo & gás para novas áreas.",
        },
        { label: "C", valor: "Redução de todos os cargos técnicos." },
        { label: "D", valor: "Apenas documentar mudança estratégica." },
        { label: "E", valor: "Evitar contratações em renováveis." },
      ],
      correta: "B",
      explicacao:
        "Transição exige: recrutamento de especialistas em renováveis (mercado competitivo), reskilling de engenheiros atuais em óleo & gás (programas de desenvolvimento), reposicionamento de carreiras. Petrobras lançou programa de reskilling com garantia de colocação interna para colaboradores interessados.",
    },
    {
      id: 903,
      pergunta:
        "O desafio de retenção em plataformas offshore (rodízio 14/14) é crítico. Qual medida NÃO contribui para retenção?",
      opcoes: [
        {
          label: "A",
          valor: "Benefício de saúde premium e acesso a psicólogo.",
        },
        {
          label: "B",
          valor:
            "Comunicação pobre com equipe e falta de reconhecimento de performance.",
        },
        { label: "C", valor: "Plano claro de carreira com oportunidades internas." },
        { label: "D", valor: "Programas de bem-estar mental e prevenção de suicídio." },
        { label: "E", valor: "Compensação salarial acima de mercado." },
      ],
      correta: "B",
      explicacao:
        "Comunicação pobre e falta de reconhecimento aumentam turnover. Retenção exige comunicação clara, reconhecimento de contribuições e perspectivas de carreira. Petrobras investe em engagement programs, newsletters, reconhecimento formal e canais de comunicação abertos em plataformas.",
    },
    {
      id: 904,
      pergunta:
        "Diversidade e Inclusão é meta estratégica de Petrobras. Qual iniciativa é MAIS impactante?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas publicar relatório anual de diversidade.",
        },
        {
          label: "B",
          valor:
            "Programas estruturados: recrutamento direcionado (Mulheres em Engenharia, Programa de Inclusão PCDs), mentoria, grupos de afinidade, metas mensuráveis e transparência de progressão.",
        },
        { label: "C", valor: "Contratar sem preocupação com diversidade." },
        { label: "D", valor: "Apenas falar sobre D&I em comunicados." },
        {
          label: "E",
          valor:
            "Diversidade só importa em empresas de tecnologia.",
        },
      ],
      correta: "B",
      explicacao:
        "D&I estruturada inclui: programas de recrutamento específicos, mentoria de mulheres em posições técnicas, grupos LGBTQIA+, inclusão de PCDs, metas mensuráveis (ex: 30% mulheres em engenharia até 2030), transparência. Apenas falar sem ação é ineficaz. Petrobras implementa estruturadamente.",
    },
    {
      id: 905,
      pergunta:
        "Um colaborador com 15 anos em óleo & gás deseja transicionar para energia renovável via programa de reskilling. Qual abordagem é MAIS estratégica?",
      opcoes: [
        {
          label: "A",
          valor:
            "Demitir para contratar especialista externo em renovável.",
        },
        {
          label: "B",
          valor:
            "Programa de reskilling: cursos em solar/eólica, rotação em projeto piloto, mentoria, garantia de colocação interna com salário preservado.",
        },
        { label: "C", valor: "Manter indefinidamente em óleo & gás." },
        {
          label: "D",
          valor: "Transferência sem treinamento adicional.",
        },
        { label: "E", valor: "Reduzir salário na transição." },
      ],
      correta: "B",
      explicacao:
        "Reskilling estratégico retém conhecimento institucional, experiência de liderança, reduz custos de recrutamento externo, aumenta retenção. Petrobras oferece programas estruturados: cursos (100+ horas), mentoria, projetos piloto, garantia de colocação com salário mantido. Beneficia empresa e colaborador.",
    },
    {
      id: 906,
      pergunta:
        "Qual competência é crítica para líderes na Petrobras em contexto de mudança de negócio (transição energética)?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas expertise técnica em óleo & gás.",
        },
        {
          label: "B",
          valor:
            "Agilidade de mudança: capacidade de comunicar visão futura, engajar equipe em transformação, lidar com ambiguidade e incerteza.",
        },
        { label: "C", valor: "Apenas controlar custos operacionais." },
        {
          label: "D",
          valor:
            "Manter status quo sem questionar estratégia.",
        },
        {
          label: "E",
          valor: "Evitar comunicação aberta sobre mudanças.",
        },
      ],
      correta: "B",
      explicacao:
        "Transformação exige líderes com agilidade: comunicam visão clara, engajam equipes em mudanças, lidam com resistência, oferecem suporte. Petrobras investe em programas de desenvolvimento de liderança em transformação para gestores que lidarão com transição energética.",
    },
  ],

  "modulo-10": [
    {
      id: 1001,
      pergunta:
        "Uma organização implementa gestão estratégica de pessoas. Qual combinação de práticas MELHOR integra os pilares (atração, desenvolvimento, retenção, engajamento)?",
      opcoes: [
        {
          label: "A",
          valor:
            "Atração só, sem desenvolvimento ou retenção.",
        },
        {
          label: "B",
          valor:
            "Recrutamento seletivo (atração) → Onboarding estruturado → PDI personalizado (desenvolvimento) → Remuneração competitiva + benefícios (retenção) → Pesquisa clima (engajamento) → Feedback contínuo.",
        },
        {
          label: "C",
          valor: "Apenas treinamentos genéricos.",
        },
        {
          label: "D",
          valor: "Retenção forçada sem desenvolvimento.",
        },
        { label: "E", valor: "Engajamento apenas via comunicados." },
      ],
      correta: "B",
      explicacao:
        "Gestão estratégica integra 4 pilares em ciclo contínuo. Petrobras exemplifica: recruta seletivamente (atração), onboards 6 meses (trainees), oferece PDI personalizado, remuneração market-plus em posições críticas, pesquisa clima anual, feedback contínuo. Resultado: retenção 85%, engagement elevado.",
    },
    {
      id: 1002,
      pergunta:
        "Qual situação MELHOR ilustra alinhamento entre estratégia de negócio e estratégia de GP?",
      opcoes: [
        {
          label: "A",
          valor:
            "GP implementa políticas sem conhecer estratégia de negócio.",
        },
        {
          label: "B",
          valor:
            "Negócio planeja expansão em renováveis; GP imediatamente recruta engenheiros especializados, oferece programas de reskilling, investe em programa de liderança em transformação.",
        },
        { label: "C", valor: "Negócio muda; GP mantém políticas antigas." },
        {
          label: "D",
          valor: "GP e Negócio trabalham em silos.",
        },
        { label: "E", valor: "Alinhamento é responsabilidade só de GP." },
      ],
      correta: "B",
      explicacao:
        "Alinhamento significa GP é ATIVA em entender e apoiar estratégia: se negócio vai para renováveis, GP recruta, treina, retém talentos necessários ANTECIPADAMENTE. Petrobras demonstra isto: transição energética foi antecedida por programas de recrutamento e reskilling. GP como parceira estratégica.",
    },
    {
      id: 1003,
      pergunta:
        "Um gestor enfrenta desempenho abaixo da expectativa de um colaborador. Qual abordagem INTEGRA conceitos de avaliação, feedback e desenvolvimento?",
      opcoes: [
        {
          label: "A",
          valor: "Demitir imediatamente sem chance de melhora.",
        },
        {
          label: "B",
          valor:
            "Feedback específico sobre desempenho → Diagnóstico de gap (treinamento? recursos? fit?) → PDI com ações → Acompanhamento mensal → Reavaliação ao final de 90 dias.",
        },
        { label: "C", valor: "Ignorar problema e esperar melhorar sozinho." },
        {
          label: "D",
          valor: "Comunicar crítica genérica sem plano de ação.",
        },
        { label: "E", valor: "Reduzir salário como punição." },
      ],
      correta: "B",
      explicacao:
        "Abordagem integrada: feedback construtivo → diagnóstico → desenvolvimento com suporte → acompanhamento. Petrobras utiliza ciclo estruturado: feedback 30/60/90 dias, PDI conjuntamente, coaching se necessário. Resulta em desenvolvimento real ou decisão informada de desligamento se necessário.",
    },
    {
      id: 1004,
      pergunta:
        "Em contexto de Petrobras, qual situação melhor exemplifica a importância de gestão de conflitos eficaz?",
      opcoes: [
        {
          label: "A",
          valor:
            "Conflito entre Segurança e Operações sobre ritmo de produção vs. adesão a normas.",
        },
        {
          label: "B",
          valor: "Preferência pessoal de uniforme entre colaboradores.",
        },
        { label: "C", valor: "Atraso de 5 minutos em reunião." },
        {
          label: "D",
          valor:
            "Desacordo sobre tipo de café na copa.",
        },
        { label: "E", valor: "Opinião diferente sobre tecnologia de software." },
      ],
      correta: "A",
      explicacao:
        "Conflito Segurança vs Operações é crítico: vidas em risco. Solução colaborativa deve integrar: segurança NUNCA é negociável (vida), Operações entende restrições, juntas definem processos que respeitam ambas. Escalação pobre deste conflito pode resultar em acidentes. Petrobras medeia estruturadamente.",
    },
    {
      id: 1005,
      pergunta:
        "Qual mérica MELHOR avalia efetividade geral de gestão de pessoas estratégica em uma organização?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas número de treinamentos oferecidos.",
        },
        {
          label: "B",
          valor:
            "Combinação: turnover reduzido, engagement score elevado, retenção de high performers, produtividade aumentada, pipeline de lideranças preparado.",
        },
        { label: "C", valor: "Custo de folha de pagamento apenas." },
        {
          label: "D",
          valor: "Número de demissões realizadas.",
        },
        { label: "E", valor: "Redução de benefícios oferecidos." },
      ],
      correta: "B",
      explicacao:
        "Efetividade de GP estratégica é multidimensional: turnover abaixo de 15%, engagement score > 70, retenção de 80%+ de high performers, produtividade crescente, pipeline de sucessores pronto. Petrobras monitora indicadores integrados, não isolados.",
    },
    {
      id: 1006,
      pergunta:
        "Qual é o desafio MAIS crítico que RH enfrentará em Petrobras nos próximos 5 anos?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas manter nível atual de pessoas.",
        },
        {
          label: "B",
          valor:
            "Gestionar transição de carreira em massa: reskilling de colaboradores em óleo & gás para renováveis, atração de talentos em novas tecnologias, retenção durante mudança, liderança que inspire transformação.",
        },
        { label: "C", valor: "Reduzir custos de forma agressiva." },
        { label: "D", valor: "Eliminar programas de desenvolvimento." },
        {
          label: "E",
          valor: "Manter estrutura organizacional idêntica.",
        },
      ],
      correta: "B",
      explicacao:
        "Transição energética é desafio massivo de RH: não apenas técnico, mas cultural e estratégico. Petrobras precisará reskill decenas de milhares, atrair novos talentos em velocidade, manter engajamento durante incerteza. GP estratégica será diferencial competitivo para sucesso da transformação.",
    },
  ],
};
