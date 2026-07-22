import { LuBookOpen, LuCheck, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers } from 'react-icons/lu';

export interface FlipCardData {
  categoria: string;
  tituloFrente: string;
  iconeFrente: string;
  subtituloFrente: string;
  tituloVerso: string;
  conteudoVerso: string;
}

export interface ModuleData {
  introducaoCEDEA: string[];
  flipcards: FlipCardData[];
  sinteseEstrategica: {
    title: string;
    content: string;
  };
  audio: {
    titulo: string;
    artista: string;
  };
}

export const MODULE_DEFS = [
  { id: 'modulo-1', title: 'Planejamento Organizacional', label: 'Planejamento', icon: LuBookOpen },
  { id: 'modulo-2', title: 'Estrutura e Organização', label: 'Estrutura', icon: LuLayers },
  { id: 'modulo-3', title: 'Direção e Liderança', label: 'Direção', icon: LuUsers },
  { id: 'modulo-4', title: 'Controle e KPIs', label: 'Controle', icon: LuTarget },
  { id: 'modulo-5', title: 'Administração da Qualidade', label: 'Qualidade', icon: LuAward },
  { id: 'modulo-6', title: 'Ferramentas da Qualidade', label: 'Ferramentas', icon: LuTriangle },
  { id: 'modulo-7', title: 'Gestão por Processos', label: 'BPM', icon: LuLayers },
  { id: 'modulo-8', title: 'Ciclo de Vida de Processos', label: 'Mapeamento', icon: LuBookOpen },
  { id: 'modulo-9', title: 'Atendimento ao Cliente', label: 'Atendimento', icon: LuMessageSquare },
  { id: 'modulo-10', title: 'Ouvidoria e Feedback', label: 'Feedback', icon: LuCheck }
];

export const MODULE_CONTENTS: Record<number, ModuleData> = {
  1: {
    "introducaoCEDEA": [
      "O planejamento estratégico representa o nível mais elevado e abrangente do processo de planejamento de uma organização. Ele estabelece as diretrizes fundamentais, a visão de futuro e a missão da instituição, servindo como norteador para todas as decisões subsequentes de médio e curto prazo.",
      "No contexto da Petrobras, o planejamento estratégico de longo prazo deve ser robusto o suficiente para enfrentar as oscilações do mercado global de petróleo, a transição energética e as demandas de conformidade legal, definindo onde a estatal deseja se posicionar nos próximos dez a vinte anos.",
      "Para operacionalizar essas diretrizes, a empresa desenvolve o planejamento tático, que traduz a estratégia macro em planos de ação específicos para as diferentes unidades de negócios e departamentos. É nesse nível intermediário que se decidem as alocações de recursos específicos e as metas departamentais, como as metas de exploração de uma determinada bacia de refino.",
      "O planejamento operacional, por sua vez, é detalhado e de curto prazo, focando na execução rotineira das atividades. Ele define cronogramas, escalas de trabalho e fluxos de tarefas imediatas, como as atividades diárias de manutenção em uma plataforma de petróleo específica, garantindo que o plano estratégico global seja efetivado no chão de fábrica.",
      "A perfeita integração e o alinhamento vertical entre os níveis estratégico, tático e operacional são as chaves para que a Petrobras atinja seus objetivos organizacionais de forma eficiente e sustentável.",
      "A ausência de um desdobramento tático adequado deixa as equipes operacionais sem rumo e sem clareza sobre como suas tarefas diárias contribuem para a visão de futuro estabelecida pela diretoria executiva da empresa.",
      "Em cenários de crise ou mudanças bruscas de mercado, a flexibilidade nos planejamentos operacionais e táticos é essencial para absorver os impactos sem que a missão estratégica de longo prazo seja desconfigurada.",
      "A mensuração contínua do progresso por meio de indicadores de desempenho é uma prática intrinseca ao planejamento, garantindo que os desvios sejam identificados e corrigidos rapidamente em todos os níveis.",
      "Para a banca CESGRANRIO, é fundamental diferenciar claramente os horizontes temporais (longo, médio e curto prazo), os níveis de decisão (institucional, intermediário e operacional) e a abrangência (global, departamental e específica) de cada tipo de planejamento.",
      "As questões frequentemente cobram a capacidade do candidato de identificar qual nível de planejamento está sendo descrito em um estudo de caso prático envolvendo uma empresa pública ou sociedade de economia mista."
    ],
    "flipcards": [
      {
        "categoria": "Nível Estratégico",
        "tituloFrente": "Planejamento Macro",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Foco a Longo Prazo",
        "conteudoVerso": "Define a <strong>missão, visão e valores</strong> da Petrobras. Abrange toda a organização com foco no longo prazo e na adaptação ao ambiente externo. 🏢"
      },
      {
        "categoria": "Nível Tático",
        "tituloFrente": "Planejamento Setorial",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Foco a Médio Prazo",
        "conteudoVerso": "Traduz o plano macro em <strong>metas para departamentos</strong> ou unidades de negócios. Horizonte de médio prazo. 📊"
      },
      {
        "categoria": "Nível Operacional",
        "tituloFrente": "Execução Diária",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Foco a Curto Prazo",
        "conteudoVerso": "Detalha as <strong>atividades e tarefas rotineiras</strong>. Curto prazo, alta especificidade e procedimentos claros. ⚙️"
      },
      {
        "categoria": "Alinhamento",
        "tituloFrente": "Integração de Níveis",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Cascateamento",
        "conteudoVerso": "Os planos devem ser <strong>alinhados verticalmente</strong>: o operacional viabiliza o tático, que por sua vez viabiliza o estratégico. 🔗"
      },
      {
        "categoria": "Indicadores",
        "tituloFrente": "Métricas de Sucesso",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Mensuração",
        "conteudoVerso": "Cada nível exige <strong>indicadores de desempenho (KPIs)</strong> adequados para monitoramento e correção de desvios. 📈"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Cuidado!",
        "conteudoVerso": "A banca adora confundir a <strong>abrangência departamental (tático)</strong> com a <strong>execução específica de tarefas (operacional)</strong>. Atenção aos termos! ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "Mnemônico dos Níveis de Planejamento",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Para a prova, lembre-se do triângulo da gestão:</p><ul class='list-disc pl-5 mt-2'><li><strong>Estratégico:</strong> Direção, Futuro, Longo Prazo, Alta Cúpula.</li><li><strong>Tático:</strong> Departamentos, Integração, Médio Prazo, Gerentes.</li><li><strong>Operacional:</strong> Tarefas, Rotina, Curto Prazo, Supervisores/Executores.</li></ul></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 1 - Planejamento Organizacional",
      "artista": "Concurso Na Veia"
    }
  },
  2: {
    "introducaoCEDEA": [
      "A função administrativa de organização é o processo de estruturar a empresa de forma a facilitar o alcance dos objetivos planejados. Ela consiste em dividir o trabalho, definir as responsabilidades, estabelecer a hierarquia e coordenar as atividades.",
      "Na estrutura organizacional da Petrobras, a divisão do trabalho deve ser desenhada com precisão cirúrgica, separando funções técnicas de exploração, refino, transporte e distribuição em diretorias e gerências especializadas.",
      "A autoridade e a responsabilidade são distribuídas ao longo de uma cadeia de comando clara, garantindo que as decisões críticas sobre segurança operacional e investimentos tenham fluxos formais de aprovação e governança.",
      "A alocação de recursos, tanto humanos quanto materiais, é realizada de maneira estratégica para maximizar a eficiência, evitando redundâncias e garantindo que cada equipe tenha o suporte necessário para suas operações.",
      "A coordenação é o elo que unifica os esforços dispersos in prol do objetivo comum, integrando diferentes áreas e projetos que funcionam de forma interdependente na cadeia produtiva do petróleo.",
      "Modelos de estruturas como a funcional, linear ou matricial oferecem diferentes vantagens e desvantagens que impactam diretamente a velocidade de resposta da organização e a especialização das equipes.",
      "A centralização versus descentralização define onde o poder de decisão reside, influenciando o grau de autonomia dos gerentes locais nas plataformas e refinarias da estatal.",
      "Uma estrutura inadequada gera gargalos na comunicação, conflitos de autoridade e atrasos em projetos de grande complexidade, elevando o custo de transação da firma.",
      "Para a banca CESGRANRIO, as questões costumam focar na identificação de elementos da estrutura organizacional (cadeia de comando, amplitude administrativa, departamentalização) in situações hipotéticas corporativas.",
      "É essencial dominar as características da departamentalização por projetos, matricial e funcional, relacionando-as com a eficiência e a flexibilidade exigidas em grandes corporações públicas."
    ],
    "flipcards": [
      {
        "categoria": "Função Organizar",
        "tituloFrente": "Papel da Organização",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Estruturação",
        "conteudoVerso": "Consiste em <strong>distribuir tarefas, recursos e autoridade</strong> para que os planos estratégicos sejam executados de forma coordenada. 🏗️"
      },
      {
        "categoria": "Divisão do Trabalho",
        "tituloFrente": "Especialização",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Foco na Eficiência",
        "conteudoVerso": "Divide as tarefas complexas em <strong>atividades menores e especializadas</strong>, aumentando a produtividade e a destreza dos colaboradores. ⚙️"
      },
      {
        "categoria": "Departamentalização",
        "tituloFrente": "Agrupamento",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Tipos de Estruturas",
        "conteudoVerso": "Agrupa atividades afins em unidades específicas (departamentos), que podem ser por <strong>função, produto, cliente, região ou projeto</strong>. 📂"
      },
      {
        "categoria": "Hierarquia",
        "tituloFrente": "Cadeia de Comando",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Autoridade e Poder",
        "conteudoVerso": "Define a <strong>linha formal de autoridade</strong> que liga todos os cargos da organização, determinando quem se reporta a quem. 👑"
      },
      {
        "categoria": "Amplitude",
        "tituloFrente": "Limite de Controle",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Subordinados",
        "conteudoVerso": "Representa o <strong>número de pessoas sob a supervisão direta</strong> de um único gestor, afetando o número de níveis hierárquicos. 👥"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Estrutura Matricial",
        "conteudoVerso": "A banca cobra muito a <strong>estrutura matricial</strong>, que mescla a funcional com a de projetos, gerando a dupla subordinação. Cuidado! ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "Tabela Rápida de Departamentalização",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><ul class='list-disc pl-5'><li><strong>Funcional:</strong> Agrupa por especialidade (ex: Financeiro, RH). Alta especialização.</li><li><strong>Por Projetos:</strong> Foco em resultados temporários. Alta flexibilidade.</li><li><strong>Matricial:</strong> Dupla subordinação (Funcional + Projetos). Requer alta coordenação.</li></ul></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 2 - Estrutura e Organização",
      "artista": "Concurso Na Veia"
    }
  },
  3: {
    "introducaoCEDEA": [
      "A função de direção é a responsável por guiar, orientar, motivar e liderar os recursos humanos da organização para a realização dos objetivos planejados e organizados. Ela atua diretamente no comportamento das pessoas no ambiente de trabalho.",
      "Na Petrobras, a direção de equipes de alta performance em ambientes complexos e perigosos, como plataformas em alto mar, exige lideranças adaptáveis, com forte foco em segurança e comunicação assertiva.",
      "Liderança não se confunde com chefia; o líder influencia e inspira sua equipe voluntariamente, enquanto o chefe apoia-se em sua autoridade formal e posição na hierarquia.",
      "As teorias sobre liderança (traços, comportamentais e situacionais) buscam compreender quais estilos são mais eficazes em diferentes contextos e como desenvolver essas competências nos gestores.",
      "A motivação é um fator intrínseco, mas que pode ser influenciado pelo ambiente de trabalho, pelas políticas de reconhecimento e pelo design das tarefas, conforme explicam teorias como a de Maslow e a de Herzberg.",
      "A comunicação eficaz é a ferramenta essencial da direção, garantindo que as informações circulem de forma clara e que não ocorram ruídos que prejudiquem a execução das tarefas.",
      "A gestão do clima organizacional e a resolução de conflitos são atribuições críticas do líder, visando manter um ambiente de cooperação e produtividade sustentável.",
      "Líderes autocráticos, democráticos e liberais geram impactos distintos no engajamento da equipe, na velocidade de decisão e na criatividade organizacional.",
      "Para a banca CESGRANRIO, as teorias motivacionais de Herzberg (fatores higiênicos x motivacionais) e a Hierarquia das Necessidades de Maslow são cobradas recorrentemente.",
      "O candidato deve ser capaz de associar o estilo de liderança correto (autocrático, democrático, liberal ou situacional) a diferentes cenários e problemas gerenciais apresentados na prova."
    ],
    "flipcards": [
      {
        "categoria": "Função Direção",
        "tituloFrente": "Papel da Direção",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Guia de Pessoas",
        "conteudoVerso": "Foco em <strong>liderar, motivar e coordenar</strong> o comportamento humano na organização para atingir as metas. 🧭"
      },
      {
        "categoria": "Liderança",
        "tituloFrente": "Líder vs Chefe",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Influência",
        "conteudoVerso": "O líder usa a <strong>influência e autoridade informal</strong>. O chefe usa o poder formal e a coerção da hierarquia. 🤝"
      },
      {
        "categoria": "Motivação",
        "tituloFrente": "Fatores Herzberg",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Higiene vs Motivação",
        "conteudoVerso": "Fatores <strong>higiênicos</strong> (salário, condições) evitam a insatisfação. Fatores <strong>motivacionais</strong> (reconhecimento, crescimento) geram satisfação. 💡"
      },
      {
        "categoria": "Estilos de Liderança",
        "tituloFrente": "Os 3 Estilos",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Autocrático, Democrático, Liberal",
        "conteudoVerso": "<strong>Autocrático:</strong> Decisão centralizada no líder. <strong>Democrático:</strong> Participação do grupo. <strong>Liberal:</strong> Autonomia total ao grupo. 📊"
      },
      {
        "categoria": "Comunicação",
        "tituloFrente": "Canais e Ruídos",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Feedback",
        "conteudoVerso": "Garantir a <strong>retroalimentação (feedback)</strong> e mitigar barreiras na comunicação (físicas, semânticas, psicológicas). 🗣️"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Herzberg e Salário",
        "conteudoVerso": "A banca adora dizer que o salário é fator motivacional. Falso! Para Herzberg, o salário é um fator <strong>higiênico</strong> (evita insatisfação apenas). ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "Pirâmide de Maslow para Concursos",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Memorize a ordem das necessidades de Maslow (da base ao topo):</p><ol class='list-decimal pl-5 mt-2'><li>Fisiológicas</li><li>Segurança</li><li>Sociais (Amor/Pertencimento)</li><li>Estima</li><li>Auto-realização</li></ol></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 3 - Direção e Liderança",
      "artista": "Concurso Na Veia"
    }
  },
  4: {
    "introducaoCEDEA": [
      "A função de controle fecha o ciclo administrativo clássico, atuando como o mecanismo de monitoramento, avaliação e correção que garante o alinhamento das atividades com os planos traçados.",
      "Na governança da Petrobras, os processos de controle são rigorosos, envolvendo auditorias internas, conformidade com a Lei das Estatais, e o acompanhamento meticuloso de indicadores financeiros e operacionais.",
      "O processo de controle divide-se em quatro etapas fundamentais: o estabelecimento de padrões de desempenho, a medição do desempenho atual, a comparação do desempenho com o padrão, e a tomada de ação corretiva.",
      "O estabelecimento de padrões define o 'norte' ou a meta a ser alcançada, servindo como a base de comparação do sistema.",
      "A medição é a coleta de dados e fatos sobre as atividades em execução, exigindo confiabilidade e tempestividade nas informações.",
      "A comparação avalia os desvios entre a realidade e o planejado, permitindo classificar se as variações estão dentro de limites toleráveis.",
      "A ação corretiva é a resposta gerencial para eliminar a causa raiz das variações indesejadas, recolocando a organização no rumo correto.",
      "Os tipos de controle podem ser classificados pelo seu momento de ocorrência: prévio (preventivo), concomitante (simultâneo) ou posterior (feedback).",
      "Para a banca CESGRANRIO, as etapas do processo de controle e a sua classificação quanto ao momento de execução são temas frequentes e diretos.",
      "O candidato deve saber diferenciar os controles preventivos (ex: manutenção preventiva de equipamentos) dos controles baseados em feedback posterior (ex: análise de relatórios financeiros)."
    ],
    "flipcards": [
      {
        "categoria": "Função Controle",
        "tituloFrente": "Papel do Controle",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Realinhamento",
        "conteudoVerso": "Assegura que os <strong>resultados reais estejam de acordo com os planejados</strong>, monitorando o progresso e corrigindo rumos. 🎯"
      },
      {
        "categoria": "Processo",
        "tituloFrente": "As 4 Etapas",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Fluxo do Controle",
        "conteudoVerso": "1. Padrões. 2. Medição. 3. Comparação. 4. Ação Corretiva. Um ciclo contínuo de melhoria. 🔄"
      },
      {
        "categoria": "Tipos de Controle",
        "tituloFrente": "Controle Prévio",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Prevenção",
        "conteudoVerso": "Focado nas <strong>entradas (inputs)</strong> de recursos. Exemplo: seleção de matéria-prima qualificada na Petrobras. 🛡️"
      },
      {
        "categoria": "Tipos de Controle",
        "tituloFrente": "Controle Simultâneo",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Tempo Real",
        "conteudoVerso": "Ocorre durante a <strong>execução do processo</strong>. Exemplo: monitoramento em tempo real da pressão de um poço. ⚙️"
      },
      {
        "categoria": "Tipos de Controle",
        "tituloFrente": "Controle Posterior",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Feedback",
        "conteudoVerso": "Ocorre após a <strong>finalização do processo (outputs)</strong>. Exemplo: relatórios contábeis e de metas anuais. 📊"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Ação Corretiva",
        "conteudoVerso": "A ação corretiva não é apenas 'castigar', mas sim <strong>ajustar o processo ou a meta</strong> para evitar novos desvios. 🧠"
      }
    ],
    "sinteseEstrategica": {
      "title": "Mapeamento dos 3 Tipos de Controle",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><ul class='list-disc pl-5'><li><strong>Prévio (Preventivo):</strong> Antes da atividade. Previne desvios.</li><li><strong>Simultâneo (Concomitante):</strong> Durante a atividade. Corrige na hora.</li><li><strong>Posterior (Feedback):</strong> Depois da atividade. Serve para aprendizado.</li></ul></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 4 - Controle e KPIs",
      "artista": "Concurso Na Veia"
    }
  },
  5: {
    "introducaoCEDEA": [
      "A Gestão da Qualidade evoluiu de um foco puramente operacional e inspetivo para uma abordagem estratégica e sistêmica conhecida como Gestão da Qualidade Total (TQM).",
      "Na cadeia logística e de suprimentos da Petrobras, os critérios de qualidade são inegociáveis para garantir a segurança operacional das refinarias e a confiabilidade dos fornecedores de insumos.",
      "O foco no cliente é o ponto de partida e a razão de ser da qualidade, visando atender ou superar as suas expectativas de forma contínua.",
      "A melhoria contínua (Kaizen) postula que todos os processos podem e devem ser aprimorados constantemente de maneira incremental, envolvendo todos os membros da empresa.",
      "Os mestres da qualidade (como Deming, Juran e Ishikawa) estabeleceram princípios e filosofias que estruturam as melhores práticas de gestão modernas.",
      "O envolvimento das pessoas e o trabalho em equipe são fundamentais para que a cultura da qualidade penetre na rotina operacional da organização.",
      "A gestão baseada em fatos e dados substitui o 'achismo' e a intuição na tomada de decisão gerencial.",
      "A abordagem por processos garante que as atividades sejam compreendidas e geridas como partes integradas de uma cadeia de valor.",
      "Para a banca CESGRANRIO, os princípios da Qualidade Total e os 14 pontos de Deming são de suma importância.",
      "O candidato deve compreender a transição da era da inspeção (corretiva) para o controle estatístico de processos e a garantia de qualidade proativa."
    ],
    "flipcards": [
      {
        "categoria": "Qualidade",
        "tituloFrente": "Conceito de Qualidade",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Total e Sistêmica",
        "conteudoVerso": "A qualidade total envolve a <strong>satisfação do cliente, melhoria contínua, envolvimento da equipe</strong> e abordagem por processos. 🏆"
      },
      {
        "categoria": "Deming",
        "tituloFrente": "14 Pontos de Deming",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Constância de Propósito",
        "conteudoVerso": "Filosofia focada na <strong>eliminação de metas numéricas arbitrárias, medo nas organizações</strong> e barreiras entre departamentos. 💡"
      },
      {
        "categoria": "Melhoria Contínua",
        "tituloFrente": "Kaizen",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Pequenas Mudanças",
        "conteudoVerso": "Filosofia de melhoria incremental constante, onde <strong>pequenos avanços diários</strong> geram grandes resultados a longo prazo. 🏔️"
      },
      {
        "categoria": "Foco no Cliente",
        "tituloFrente": "Foco do TQM",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Satisfação Total",
        "conteudoVerso": "A qualidade é <strong>definida pelo cliente</strong>. Todos os esforços internos devem convergir para atender suas necessidades. 🤝"
      },
      {
        "categoria": "Parcerias",
        "tituloFrente": "Relação Fornecedores",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Ganho Mútuo",
        "conteudoVerso": "Abandonar a prática de fechar negócios apenas pelo menor preço. Focar em <strong>parcerias de longo prazo</strong>. 🤝"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Inspeção em Massa",
        "conteudoVerso": "Deming defende a <strong>eliminação da inspeção em massa</strong>, substituindo-a pela prevenção por meio de estatística de processo. ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "A Trilogia de Juran",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Juran divide a gestão da qualidade em 3 pilares vitais:</p><ul class='list-disc pl-5 mt-2'><li><strong>Planejamento da Qualidade:</strong> Identificar clientes e necessidades.</li><li><strong>Controle da Qualidade:</strong> Comparar resultados reais e metas.</li><li><strong>Melhoria da Qualidade:</strong> Reduzir desperdícios e otimizar processos.</li></ul></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 5 - Administração da Qualidade",
      "artista": "Concurso Na Veia"
    }
  },
  6: {
    "introducaoCEDEA": [
      "As ferramentas estatísticas da qualidade são instrumentos consagrados para coletar, estruturar, analisar e solucionar problemas de variabilidade em processos produtivos e administrativos.",
      "Na rotina de manutenção e segurança da Petrobras, a utilização dessas ferramentas estatísticas auxilia a prever falhas operacionais e estruturar o refino de forma estável.",
      "O Diagrama de Ishikawa, também conhecido como espinha de peixe ou causa e efeito, organiza as possíveis causas de um problema sob seis categorias conhecidas como os 6Ms: Método, Mão de Obra, Material, Máquina, Medida e Meio Ambiente.",
      "O Gráfico de Pareto baseia-se no princípio 80/20, apontando que cerca de 80% das consequências (problemas) derivam de 20% das causas principais.",
      "O Histograma é um gráfico de barras que demonstra a distribuição de frequência de um conjunto de dados contínuos, facilitando a visualização de padrões de variabilidade.",
      "O Diagrama de Dispersão é utilizado para identificar possíveis relações de causa e efeito ou correlação entre duas variáveis.",
      "As Cartas de Controle monitoram a estabilidade do processo ao longo do tempo, indicando se as variações encontradas decorrem de causas comuns ou especiais.",
      "As Folhas de Verificação e o Fluxograma são ferramentas auxiliares cruciais na etapa inicial de coleta de dados e mapeamento das atividades.",
      "Para a banca CESGRANRIO, a identificação visual e a utilidade de cada uma das 7 ferramentas clássicas da qualidade são exigidas com frequência.",
      "O candidato deve associar prontamente o Diagrama de Ishikawa ao mapeamento de causas raiz e o Diagrama de Pareto à priorização de problemas."
    ],
    "flipcards": [
      {
        "categoria": "Causa e Efeito",
        "tituloFrente": "Diagrama de Ishikawa",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Os 6Ms",
        "conteudoVerso": "Estrutura as causas raiz de um problema em 6 categorias: <strong>Máquina, Método, Mão de Obra, Material, Medida e Meio Ambiente</strong>. 🐟"
      },
      {
        "categoria": "Priorização",
        "tituloFrente": "Gráfico de Pareto",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Princípio 80/20",
        "conteudoVerso": "Gráfico de colunas ordenado de forma decrescente para <strong>priorizar os problemas mais vitais</strong> (poucos vitais vs. muitos triviais). 📊"
      },
      {
        "categoria": "Distribuição",
        "tituloFrente": "Histograma",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Frequência de Dados",
        "conteudoVerso": "Visualiza a <strong>distribuição de frequências</strong> de uma variável para avaliar a simetria e a variabilidade do processo. 📊"
      },
      {
        "categoria": "Correlação",
        "tituloFrente": "Diagrama Dispersão",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Relação de Variáveis",
        "conteudoVerso": "Mostra a relação entre duas variáveis contínuas, identificando se há <strong>correlação positiva, negativa ou nula</strong>. 📈"
      },
      {
        "categoria": "Estabilidade",
        "tituloFrente": "Cartas de Controle",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Limites Estatísticos",
        "conteudoVerso": "Monitora variações no tempo usando <strong>Limites de Controle (LSC e LIC)</strong> para saber se a variação é sob controle ou fora de controle. 📉"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Pareto de Acidentes",
        "conteudoVerso": "Se a questão falar em <strong>'focar nos problemas que causam a maior parte das perdas'</strong>, a ferramenta correta é Pareto. Gravou? 💡"
      }
    ],
    "sinteseEstrategica": {
      "title": "Mnemônico dos 6Ms de Ishikawa",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Pense nos recursos da empresa para lembrar dos 6Ms:</p><ul class='list-disc pl-5 mt-2'><li><strong>M</strong>áquina (Equipamentos)</li><li><strong>M</strong>étodo (Processo de trabalho)</li><li><strong>M</strong>ão de Obra (Trabalhador)</li><li><strong>M</strong>aterial (Matéria-prima)</li><li><strong>M</strong>edida (Métricas/Calibração)</li><li><strong>M</strong>eio Ambiente (Local de trabalho)</li></ul></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 6 - Ferramentas da Qualidade",
      "artista": "Concurso Na Veia"
    }
  },
  7: {
    "introducaoCEDEA": [
      "A Gestão por Processos (BPM - Business Process Management) é uma disciplina gerencial que integra estratégias e objetivos da organização com as expectativas e necessidades dos clientes.",
      "Na Petrobras, o mapeamento de processos fim a fim, ligando a extração do petróleo ao refino e à entrega ao cliente, reduz gargalos operacionais e melhora a governança corporativa.",
      "Diferente da visão funcional tradicional em silos, a gestão por processos tem foco nas interações horizontais que atravessam os limites departamentais.",
      "Um processo de negócio é um conjunto de atividades inter-relacionadas que recebem entradas, agregam valor e produzem uma saída útil para o cliente final.",
      "A agregação de valor é a medida pela qual o cliente está disposto a remunerar as atividades que compõem o processo.",
      "A cadeia de valor de Porter é um modelo que organiza os processos de uma empresa em processos primários (fim) e de suporte (meio).",
      "Os papéis clássicos no BPM incluem o Dono do Processo (Process Owner), Analistas e Engenheiros de Processo.",
      "O alinhamento estratégico garante que a melhoria de processos locais contribua diretamente para os objetivos estratégicos globais da instituição.",
      "Para a banca CESGRANRIO, as definições básicas de processo e a distinção entre visão funcional tradicional e visão por processos são de alto valor.",
      "O candidato deve entender que na visão por processos o foco está no cliente final e no fluxo de trabalho horizontal (transfuncional)."
    ],
    "flipcards": [
      {
        "categoria": "Gestão Processos",
        "tituloFrente": "Abordagem BPM",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Foco Horizontal",
        "conteudoVerso": "BPM é uma <strong>abordagem transfuncional (horizontal)</strong> que foca em otimizar o fluxo de valor que cruza os departamentos. 🔀"
      },
      {
        "categoria": "Processo",
        "tituloFrente": "Conceito Processo",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Entrada e Saída",
        "conteudoVerso": "Conjunto de tarefas lógicas que recebe <strong>inputs (entradas)</strong>, agrega valor e gera um <strong>output (saída/produto)</strong> para o cliente. ⚙️"
      },
      {
        "categoria": "Cadeia de Valor",
        "tituloFrente": "Cadeia de Porter",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Primários vs Suporte",
        "conteudoVerso": "<strong>Primários:</strong> Logística, Operações, Vendas (fim). <strong>Suporte:</strong> RH, TI, Infraestrutura (meio). 🏢"
      },
      {
        "categoria": "Agregação Valor",
        "tituloFrente": "Agregar Valor",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Útil ao Cliente",
        "conteudoVerso": "Atividades que transformam o input em algo que o cliente <strong>valoriza e necessita</strong>. O restante deve ser minimizado. 💡"
      },
      {
        "categoria": "Dono do Processo",
        "tituloFrente": "Process Owner",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Responsável",
        "conteudoVerso": "Papel central no BPM. Indivíduo responsável pelo <strong>desempenho ponta a ponta</strong> de um processo específico. 👑"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Silos Organizacionais",
        "conteudoVerso": "A banca adora opor a <strong>Gestão de Processos (horizontal e integrada)</strong> à <strong>Estrutura Funcional (vertical em silos isolados)</strong>. Lembre-se disso! ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "Os 3 Tipos de Processos no BPM",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><ul class='list-disc pl-5'><li><strong>Processos Primários (Finalísticos):</strong> Geram valor direto ao cliente externo.</li><li><strong>Processos de Suporte (Apoio):</strong> Viabilizam os processos primários.</li><li><strong>Processos de Gerenciamento:</strong> Coordenação e governança corporativa.</li></ul></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 7 - Gestão por Processos",
      "artista": "Concurso Na Veia"
    }
  },
  8: {
    "introducaoCEDEA": [
      "O ciclo de vida de processos no BPM descreve as fases sequenciais necessárias para planejar, desenhar, implementar, monitorar e otimizar as atividades organizacionais.",
      "Na governança de processos da Petrobras, a obediência às fases do ciclo de vida assegura que novos fluxos de trabalho sejam modelados de forma controlada e auditável.",
      "A modelagem 'AS-IS' retrata a situação atual do processo, documentando a realidade com seus problemas, gargalos e ineficiências reais.",
      "A modelagem 'TO-BE' projeta o estado futuro desejado para o processo, desenhando as melhorias que eliminarão as ineficiências identificadas.",
      "A fase de mapeamento de processos envolve documentar fluxos de trabalho através de notações padrão como a BPMN (Business Process Model and Notation).",
      "A análise de processos foca em entender as causas raiz das ineficiências e desperdícios identificados no AS-IS.",
      "A execução e implementação do processo redesenhado (TO-BE) pode envolver a automação de etapas através de sistemas BPMS.",
      "O monitoramento contínuo coleta dados de execução, avaliando o desempenho do processo em relação aos indicadores estratégicos definidos.",
      "Para a banca CESGRANRIO, os termos AS-IS (situação atual) e TO-BE (situação futura) são extremamente cobrados e relevantes.",
      "O candidato deve compreender que a modelagem AS-IS deve preceder qualquer tentativa de melhoria ou automação de processos organizacionais."
    ],
    "flipcards": [
      {
        "categoria": "Ciclo de Vida",
        "tituloFrente": "Ciclo do BPM",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Fases de Evolução",
        "conteudoVerso": "Compreende: <strong>Planejamento, Análise, Desenho (Modelagem), Implementação, Monitoramento e Refinamento</strong> dos processos. 🔄"
      },
      {
        "categoria": "AS-IS",
        "tituloFrente": "Mapeamento Atual",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Situação Real",
        "conteudoVerso": "Documenta o <strong>processo como ele é executado hoje</strong>. Essencial para identificar gargalos e falhas de fluxo. 🕵️"
      },
      {
        "categoria": "TO-BE",
        "tituloFrente": "Desenho do Futuro",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Estado Desejado",
        "conteudoVerso": "Modelagem do <strong>processo redesenhado com as melhorias implementadas</strong>. Meta de eficiência e automação. 🚀"
      },
      {
        "categoria": "Notação BPMN",
        "tituloFrente": "Padrão BPMN",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Simbolologia",
        "conteudoVerso": "Linguagem padrão para modelar fluxos, contendo <strong>Piscinas (Pools), Raias (Lanes), Eventos, Atividades e Gateways</strong>. 📊"
      },
      {
        "categoria": "Monitoramento",
        "tituloFrente": "Gestão de Gargalos",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Gargalo Operacional",
        "conteudoVerso": "Identificar e mitigar o <strong>gargalo (recurso de menor capacidade)</strong>, que limita o fluxo produtivo total. ⏳"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Automação Precoce",
        "conteudoVerso": "Automatizar um processo ruim no estado AS-IS só acelera o erro. Primeiro <strong>analisa-se e redesenha-se (TO-BE)</strong>, depois automatiza-se. ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "Elementos Básicos do BPMN",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><ul class='list-disc pl-5'><li><strong>Piscina (Pool):</strong> Representa o processo ou a organização inteira.</li><li><strong>Raia (Lane):</strong> Representa quem executa (departamento ou cargo).</li><li><strong>Gateway (Losango):</strong> Pontos de decisão no fluxo de trabalho.</li></ul></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 8 - Ciclo de Vida de Processos",
      "artista": "Concurso Na Veia"
    }
  },
  9: {
    "introducaoCEDEA": [
      "O atendimento ao cliente é um diferencial estratégico e a linha de frente da imagem da organização, exigindo técnicas de escuta ativa, empatia e clareza na comunicação.",
      "Na Petrobras, o atendimento abrange desde o relacionamento comercial com grandes distribuidoras e indústrias até o atendimento ao cidadão através de canais da Ouvidoria Pública.",
      "A empatia é a capacidade de compreender os sentimentos e a perspectiva do cliente, servindo como base para desarmar conflitos e frustrações.",
      "A escuta ativa consiste em ouvir com atenção plena, decodificar a mensagem do cliente sem preconceitos e demonstrar compreensão real do seu problema.",
      "A comunicação não-violenta (CNV) é uma ferramenta poderosa para o atendimento, baseada na observação sem julgamento e no alinhamento de necessidades.",
      "Os canais digitais de atendimento exigem agilidade, linguagem adequada e integração para garantir uma experiência omnicanal consistente.",
      "A jornada do cliente mapeia todos os pontos de contato e interações dele com a organização, buscando otimizar cada etapa do relacionamento.",
      "O tratamento adequado de reclamações transforma clientes insatisfeitos em defensores da marca quando resolvidos de forma ágil e justa.",
      "Para a banca CESGRANRIO, as qualidades do atendimento ao cliente (cortesia, presteza, eficácia) e a gestão de conflitos são temas recorrentes em provas de nível médio.",
      "O candidato deve identificar posturas corretas de atendimento público e privado, focando em empatia, resolução de problemas e assertividade."
    ],
    "flipcards": [
      {
        "categoria": "Atendimento",
        "tituloFrente": "Qualidade Atendimento",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Pilares Centrais",
        "conteudoVerso": "Envolve <strong>presteza, cortesia, empatia, clareza e eficácia</strong> na resolução de problemas do cidadão ou cliente. 🌟"
      },
      {
        "categoria": "Escuta Ativa",
        "tituloFrente": "Técnica da Escuta",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Atenção Plena",
        "conteudoVerso": "Ouvir o cliente com <strong>atenção plena</strong>, confirmando o entendimento através de paráfrases e demonstrando empatia. 🗣️"
      },
      {
        "categoria": "Empatia",
        "tituloFrente": "Postura Empática",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Calçar Sapatos",
        "conteudoVerso": "Esforço de se colocar no lugar do cliente para <strong>compreender suas frustrações</strong> e buscar soluções viáveis de forma justa. 🤝"
      },
      {
        "categoria": "CNV",
        "tituloFrente": "Comunicação CNV",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Sem Julgamentos",
        "conteudoVerso": "Método focado em <strong>observar fatos, expressar sentimentos e necessidades</strong> de forma clara e não agressiva. 💡"
      },
      {
        "categoria": "Omnicanal",
        "tituloFrente": "Atendimento Omnicanal",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Integração",
        "conteudoVerso": "Oferecer uma <strong>experiência integrada de canais</strong> (telefone, chat, e-mail), onde a transição não cause atritos para o cliente. 📱"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Atrito Público",
        "conteudoVerso": "As questões adoram colocar o atendente sendo defensivo perante a crítica do cidadão. A postura correta deve ser sempre de <strong>acolhimento e presteza</strong>. ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "Os 4 Componentes da CNV",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>A Comunicação Não-Violenta baseia-se em:</p><ol class='list-decimal pl-5 mt-2'><li><strong>Observação:</strong> Descrever os fatos sem julgamentos.</li><li><strong>Sentimento:</strong> Expressar como nos sentimos diante disso.</li><li><strong>Necessidade:</strong> Revelar nossas necessidades não atendidas.</li><li><strong>Pedido:</strong> Fazer solicitações concretas e factíveis.</li></ol></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 9 - Atendimento ao Cliente",
      "artista": "Concurso Na Veia"
    }
  },
  10: {
    "introducaoCEDEA": [
      "A Ouvidoria é o canal de segunda instância e o termômetro ético das organizações públicas, atuando na mediação de conflitos, tratamento de denúncias e garantia de transparência.",
      "Na estrutura de governança da Petrobras, a Ouvidoria Geral desempenha papel central de compliance, recebendo manifestações sobre a aplicação prática do Código de Conduta Ética.",
      "O NPS (Net Promoter Score) é uma métrica consolidada para avaliar a satisfação e lealdade do cliente através da pergunta definitiva: 'De 0 a 10, quanto você recomendaria nossos serviços?'.",
      "A classificação do NPS divide os respondentes em três perfis: Promotores (9 ou 10), Neutros (7 ou 8) e Detratores (0 a 6).",
      "A Ouvidoria atua de forma independente e autônoma, buscando solucionar os problemas do cidadão de maneira justa e promovendo melhorias na gestão pública.",
      "O tratamento de reclamações deve ser ágil e resolutivo, convertendo gargalos e falhas identificadas em propostas de melhoria contínua de processos.",
      "A governança corporativa em estatais exige a estruturação de canais seguros para reporte de irregularidades e denúncias, garantindo a proteção aos denunciantes.",
      "O fechamento do loop com o cliente após o tratamento da sua manifestação ou reclamação é fundamental para recuperar a confiança e fidelidade.",
      "Para a banca CESGRANRIO, as atribuições da Ouvidoria em empresas de economia mista e o cálculo do NPS são temas quentes de prova.",
      "O candidato deve dominar o cálculo da nota do NPS: subtrair a porcentagem de detratores da porcentagem de promotores, ignorando os clientes neutros."
    ],
    "flipcards": [
      {
        "categoria": "Ouvidoria",
        "tituloFrente": "Papel Ouvidoria",
        "iconeFrente": "LuBookOpen",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Segunda Instância",
        "conteudoVerso": "Atua como <strong>canal de segunda instância</strong> e mediação de conflitos. Garante transparência e conformidade com a ética. ⚖️"
      },
      {
        "categoria": "NPS",
        "tituloFrente": "Net Promoter Score",
        "iconeFrente": "LuLayers",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "Métrica de Lealdade",
        "conteudoVerso": "NPS avalia lealdade. <strong>Promotores (9-10):</strong> Defensores. <strong>Neutros (7-8):</strong> Indiferentes. <strong>Detratores (0-6):</strong> Insatisfeitos. 📊"
      },
      {
        "categoria": "Cálculo NPS",
        "tituloFrente": "Cálculo NPS",
        "iconeFrente": "LuTarget",
        "subtituloFrente": "Detalhamento Técnico",
        "tituloVerso": "A Fórmula",
        "conteudoVerso": "Fórmula: <strong>NPS = % Promotores - % Detratores</strong>. Neutros são totalmente ignorados no cálculo. 📝"
      },
      {
        "categoria": "Governança",
        "tituloFrente": "Ética e Denúncias",
        "iconeFrente": "LuTriangle",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Compliance",
        "conteudoVerso": "Canais seguros de denúncia garantem a <strong>integridade corporativa e compliance</strong> de acordo com a Lei das Estatais. 🛡️"
      },
      {
        "categoria": "Fechamento Loop",
        "tituloFrente": "Fechar o Loop",
        "iconeFrente": "LuCheck",
        "subtituloFrente": "Memorização",
        "tituloVerso": "Resposta Final",
        "conteudoVerso": "Garantir o <strong>retorno e feedback final</strong> ao cliente insatisfeito sobre quais ações corretivas foram adotadas. 🔄"
      },
      {
        "categoria": "Pegadinha de Prova",
        "tituloFrente": "Foco CESGRANRIO",
        "iconeFrente": "LuMessageSquare",
        "subtituloFrente": "Memorização",
        "tituloVerso": "NPS Negativo",
        "conteudoVerso": "Lembre-se que o NPS varia de <strong>-100 a +100</strong>. Valores abaixo de zero indicam crise crítica de satisfação de clientes. ⚠️"
      }
    ],
    "sinteseEstrategica": {
      "title": "Cálculo do NPS em Concursos",
      "content": "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Exemplo rápido:</p><p class='mt-2'>Numa pesquisa com 100 clientes:</p><ul class='list-disc pl-5'><li>50 são Promotores (50%)</li><li>30 são Neutros (ignora)</li><li>20 são Detratores (20%)</li></ul><p class='mt-2'><strong>NPS: 50% - 20% = +30</strong></p></div>"
    },
    "audio": {
      "titulo": "Podcast Módulo 10 - Ouvidoria e Feedback",
      "artista": "Concurso Na Veia"
    }
  }
};
