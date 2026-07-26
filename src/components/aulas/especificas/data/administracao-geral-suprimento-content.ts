import { LuBookOpen, LuCheck, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers } from 'react-icons/lu';

export interface FlipCardData {
  categoria: string;
  tituloFrente: string;
  iconeFrente: string;
  subtituloFrente: string;
  tituloVerso: string;
  conteudoVerso: string;
}

export interface AccordionSlide {
  titulo: string;
  conteudo: string;
}

export interface ModuleData {
  introducaoCEDEA: string[];
  accordions?: AccordionSlide[];
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
    introducaoCEDEA: [
      "O planejamento estratégico representa a espinha dorsal de qualquer organização moderna, configurando-se como o nível mais elevado e abrangente do processo administrativo. Ele transcende a mera alocação de recursos, estabelecendo as diretrizes fundamentais, a visão de futuro e a missão institucional, elementos que servem como norteadores absolutos para todas as decisões subsequentes de médio e curto prazo em um ambiente corporativo volátil.",
      "No contexto específico de operações de alta complexidade como as da Petrobras, o planejamento de longo prazo exige uma robustez ímpar para enfrentar as brutais oscilações do mercado global de commodities, os imperativos da transição energética e as severas demandas de conformidade legal. É nesta etapa de formulação macro que a estatal define com precisão onde deseja se posicionar estrategicamente nas próximas décadas, mitigando riscos sistêmicos e garantindo a soberania energética e o retorno aos acionistas.",
      "Para operacionalizar essas diretrizes globais, a arquitetura organizacional desenvolve o planejamento tático, um desdobramento que traduz a estratégia macro em planos de ação específicos para as diferentes unidades de negócios e departamentos isolados. É nesse nível gerencial intermediário que se decidem as alocações de recursos específicos, orçamentos setoriais e as metas departamentais, funcionando como um elo de tradução indispensável entre a alta cúpula e a base produtiva da empresa.",
      "O planejamento operacional, por sua vez, caracteriza-se pela sua extrema minúcia e foco no curto prazo, dedicando-se exclusivamente à execução rotineira e padronizada das atividades laborais. Ele define cronogramas diários, escalas de trabalho precisas e fluxos de tarefas imediatas, garantindo que as grandes diretrizes estratégicas sejam efetivamente materializadas no chão de fábrica e nas operações de linha de frente, sem margem para improvisações.",
      "Em uma aplicação prática, enquanto a diretoria executiva (nível estratégico) decide investir bilhões na exploração de energia eólica offshore nos próximos 15 anos, a gerência de engenharia (nível tático) elabora um plano de três anos para capacitar a equipe técnica e adquirir equipamentos específicos. Simultaneamente, o supervisor da plataforma (nível operacional) define a escala de turno da equipe que fará a manutenção dos sensores na semana atual, demonstrando o perfeito alinhamento vertical das decisões.",
      "A ausência de um desdobramento tático adequado é um erro crasso e letal para grandes corporações, pois deixa as equipes operacionais completamente à deriva, executando tarefas de forma isolada e sem qualquer clareza sobre como suas rotinas exaustivas contribuem, de fato, para a visão de futuro estabelecida pela diretoria. Sem esse alinhamento, a organização desperdiça recursos preciosos em atividades que não geram valor estratégico real.",
      "Em cenários de crise aguda ou mudanças abruptas e imprevisíveis de mercado — como choques nos preços do petróleo ou crises sanitárias globais —, a flexibilidade embutida nos planejamentos táticos e operacionais torna-se a principal ferramenta de resiliência corporativa. Essa capacidade de adaptação rápida na base permite que a empresa absorva os impactos externos sem que a sua missão e os seus objetivos estratégicos de longo prazo sejam irreversivelmente desconfigurados ou abandonados.",
      "Além disso, a mensuração contínua do progresso por meio de indicadores-chave de desempenho (KPIs) não é um evento isolado, mas uma prática intrínseca e indissociável de qualquer nível de planejamento. A retroalimentação constante garante que os desvios operacionais sejam identificados e corrigidos cirurgicamente em tempo real, evitando que pequenas ineficiências departamentais se transformem em rombos financeiros que comprometam a sustentabilidade do negócio.",
      "Para as provas elaboradas pela banca CESGRANRIO, é rigorosamente obrigatório que o candidato saiba diferenciar os horizontes temporais (longo, médio e curto prazo), os níveis de decisão hierárquica (institucional, intermediário e operacional) e a abrangência (global, departamental e específica) inerentes a cada tipologia de planejamento, pois essas são as chaves-mestras para a resolução de questões diretas e estudos de caso complexos.",
      "As questões da CESGRANRIO frequentemente cobram a habilidade de analisar um estudo de caso narrativo envolvendo uma sociedade de economia mista e identificar de forma inequívoca qual nível de planejamento está sendo descrito nas atitudes dos gestores. O candidato de alto desempenho não pode confundir ações departamentais de médio prazo com diretrizes globais da alta direção corporativa."
    ],
    accordions: [
      {
        titulo: "Habilidades Administrativas de Robert Katz",
        conteudo: "<p>Katz dividiu as habilidades gerenciais em 3 categorias essenciais:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Habilidades Técnicas:</strong> Conhecimento especializado e execução de tarefas. Predominam no <em>nível operacional</em>.</li><li><strong>Habilidades Humanas:</strong> Capacidade de lidar com pessoas, liderar e comunicar. Fundamentais em <em>todos os níveis</em>.</li><li><strong>Habilidades Conceituais:</strong> Visão sistêmica da organização e do ambiente. Prioridade máxima no <em>nível estratégico</em>.</li></ul>"
      },
      {
        titulo: "Os 10 Papéis Gerenciais de Mintzberg",
        conteudo: "<p>Dividendos em 3 famílias de papéis:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Interpessoais:</strong> Símbolo, Líder, Ligação.</li><li><strong>Informacionais:</strong> Monitor, Disseminador, Porta-voz.</li><li><strong>Decisórios:</strong> Empreendedor, Solucionador de Distúrbios, Alocador de Recursos, Negociador.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Nível Estratégico",
        tituloFrente: "Planejamento Macro",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco a Longo Prazo",
        conteudoVerso: "Define a <strong>missão, visão e valores</strong> da Petrobras. Abrange toda a organização com foco no longo prazo e na adaptação ao ambiente externo. 🏢"
      },
      {
        categoria: "Nível Tático",
        tituloFrente: "Planejamento Setorial",
        iconeFrente: "LuLayers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco a Médio Prazo",
        conteudoVerso: "Traduz o plano macro em <strong>metas para departamentos</strong> ou unidades de negócios. Horizonte de médio prazo. 📊"
      },
      {
        categoria: "Nível Operacional",
        tituloFrente: "Execução Diária",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco a Curto Prazo",
        conteudoVerso: "Detalha as <strong>atividades e tarefas rotineiras</strong>. Curto prazo, alta especificidade e procedimentos claros. ⚙️"
      },
      {
        categoria: "Alinhamento",
        tituloFrente: "Integração de Níveis",
        iconeFrente: "LuTriangle",
        subtituloFrente: "Memorização",
        tituloVerso: "Cascateamento",
        conteudoVerso: "Os planos devem ser <strong>alinhados verticalmente</strong>: o operacional viabiliza o tático, que por sua vez viabiliza o estratégico. 🔗"
      },
      {
        categoria: "Indicadores",
        tituloFrente: "Métricas de Sucesso",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Mensuração",
        conteudoVerso: "Cada nível exige <strong>indicadores de desempenho (KPIs)</strong> adequados para monitoramento e correção de desvios. 📈"
      },
      {
        categoria: "Pegadinha de Prova",
        tituloFrente: "Foco CESGRANRIO",
        iconeFrente: "LuMessageSquare",
        subtituloFrente: "Memorização",
        tituloVerso: "Cuidado!",
        conteudoVerso: "A banca adora confundir a <strong>abrangência departamental (tático)</strong> com a <strong>execução específica de tarefas (operacional)</strong>. Atenção aos termos! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Níveis de Planejamento",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Para a prova, lembre-se do triângulo da gestão:</p><ul class='list-disc pl-5 mt-2'><li><strong>Estratégico:</strong> Direção, Futuro, Longo Prazo, Alta Cúpula.</li><li><strong>Tático:</strong> Departamentos, Integração, Médio Prazo, Gerentes.</li><li><strong>Operacional:</strong> Tarefas, Rotina, Curto Prazo, Supervisores/Executores.</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 1 - Planejamento Organizacional", artista: "Concurso Na Veia" }
  },
  2: {
    introducaoCEDEA: [
      "A função administrativa de organização transcende a simples alocação física de pessoas e mesas, configurando-se como o complexo processo de estruturar a empresa de maneira lógica para facilitar o alcance milimétrico dos objetivos estratégicos planejados. Ela consiste em dividir o trabalho humano de forma inteligente, definir as esferas de responsabilidade, estabelecer a hierarquia formal e coordenar as atividades em um ecossistema produtivo sinérgico.",
      "Na vasta e complexa estrutura organizacional de uma gigante como a Petrobras, a divisão do trabalho deve ser desenhada com precisão absoluta e cirúrgica, separando com clareza as intrincadas funções técnicas de exploração offshore, refino de altíssima complexidade, transporte logístico e distribuição comercial. Cada uma dessas frentes exige diretorias e gerências altamente especializadas, capazes de operar com autonomia, mas sem perder o alinhamento central.",
      "A autoridade legal e a responsabilidade corporativa são distribuídas metodicamente ao longo de uma cadeia de comando cristalina, garantindo que todas as decisões críticas, especialmente aquelas referentes à segurança operacional e investimentos multibilionários, possuam fluxos formais, auditáveis e rigorosos de aprovação e governança. Isso impede ações unilaterais que poderiam colocar em risco a integridade da companhia.",
      "A alocação criteriosa de recursos, tanto o capital humano especializado quanto os recursos materiais e tecnológicos de ponta, é realizada de maneira puramente estratégica para maximizar a eficiência global. Esse rigor estrutural visa eliminar impiedosamente as redundâncias operacionais, garantindo que cada equipe departamental tenha exatamente o suporte e a verba necessários para executar suas operações sem desperdícios ou ociosidade.",
      "A coordenação funciona como a argamassa institucional que unifica os esforços naturalmente dispersos das diversas áreas em prol do objetivo comum estabelecido pela alta direção. Ao integrar um projeto monumental, geólogos, engenheiros de poço, analistas financeiros e especialistas ambientais precisam atuar de forma interdependente, onde a saída do processo de um profissional torna-se o insumo imediato para o início do trabalho do outro.",
      "A escolha do modelo de departamentalização é vital: enquanto a estrutura funcional agrupa especialistas (como todos os engenheiros juntos) promovendo alta excelência técnica mas pouca comunicação intersetorial, a estrutura matricial cruza gerentes de função com gerentes de projetos, forçando a integração, mas gerando o desafio prático da dupla subordinação para os funcionários, o que pode causar graves conflitos de autoridade se não houver maturidade corporativa.",
      "O eterno debate entre a centralização e a descentralização define com precisão onde o poder real de decisão reside na teia organizacional, fator que influencia diretamente o grau de autonomia e o tempo de resposta dos gerentes locais nas plataformas marítimas e refinarias terrestres. Decisões estratégicas tendem a ser retidas no topo, enquanto decisões puramente operacionais devem ser pulverizadas na base para dar agilidade à firma.",
      "Uma estrutura organizacional mal desenhada, engessada ou antiquada gera inevitavelmente funestos gargalos na comunicação interna, intensifica os conflitos territoriais de autoridade e provoca atrasos crônicos em projetos de grande complexidade técnica. Em última análise, essa ineficiência estrutural eleva drasticamente o custo de transação interno da empresa, corroendo suas margens de lucro e sua competitividade global.",
      "No rigoroso escopo de cobrança da banca CESGRANRIO, as questões de múltipla escolha costumam focar de maneira implacável na identificação prática de elementos estruturais primordiais, exigindo que o candidato relacione conceitos como cadeia de comando, amplitude administrativa de controle e modelos específicos de departamentalização com situações corporativas hipotéticas de elevada tensão.",
      "É de vital importância dominar as minúcias e as características distintivas da departamentalização por projetos (temporária e focada em resultados), da estrutura matricial (que quebra a unidade de comando clássica) e da departamentalização funcional (que foca na especialização profunda), relacionando-as perfeitamente com os trade-offs de eficiência, comunicação e flexibilidade exigidos em grandes corporações do setor público."
    ],
    accordions: [
      {
        titulo: "Tipos Principais de Departamentalização",
        conteudo: "<p>Classificação clássica exigida em concursos:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Funcional:</strong> Agrupa por especialidades afins (Financeiro, Suprimentos, RH). Promove alta especialização.</li><li><strong>Por Produtos/Serviços:</strong> Agrupa por linhas de saída (Gasolina, Diesel, Lubrificantes). Foco na flexibilidade.</li><li><strong>Matricial:</strong> Combina estrutura funcional e por projetos. Dupla subordinação (exige maturidade cultural).</li><li><strong>Geográfica/Territorial:</strong> Agrupa por regiões atendidas (Bacia de Santos, Nordeste, Internacional).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Função Organizar",
        tituloFrente: "Papel da Organização",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Estruturação",
        conteudoVerso: "Consiste em <strong>distribuir tarefas, recursos e autoridade</strong> para que os planos estratégicos sejam executados de forma coordenada. 🏗️"
      },
      {
        categoria: "Divisão do Trabalho",
        tituloFrente: "Especialização",
        iconeFrente: "LuLayers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco na Eficiência",
        conteudoVerso: "Divide as tarefas complexas em <strong>atividades menores e especializadas</strong>, aumentando a produtividade e a destreza dos colaboradores. ⚙️"
      },
      {
        categoria: "Departamentalização",
        tituloFrente: "Agrupamento",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Tipos de Estruturas",
        conteudoVerso: "Agrupa atividades afins em unidades específicas (departamentos), que podem ser por <strong>função, produto, cliente, região ou projeto</strong>. 📂"
      },
      {
        categoria: "Hierarquia",
        tituloFrente: "Cadeia de Comando",
        iconeFrente: "LuTriangle",
        subtituloFrente: "Memorização",
        tituloVerso: "Fluxo de Autoridade",
        conteudoVerso: "Linha contínua de autoridade que liga o topo executivo ao chão de fábrica, definindo quem se reporta a quem. 📐"
      },
      {
        categoria: "Amplitude",
        tituloFrente: "Amplitude de Controle",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Subordinados por Gestor",
        conteudoVerso: "Número de pessoas sob o comando direto de um único gerente. Define se a estrutura é <strong>aguda (alta)</strong> ou <strong>achatada (plana)</strong>. 👥"
      },
      {
        categoria: "Pegadinha de Prova",
        tituloFrente: "Estrutura Matricial",
        iconeFrente: "LuMessageSquare",
        subtituloFrente: "Memorização",
        tituloVerso: "Dupla Subordinação",
        conteudoVerso: "A estrutura matricial rompe o princípio clássico da <strong>unidade de comando</strong> (o funcionário tem dois chefes). Cuidado na prova! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Tipos de Estrutura",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Dica de prova para Departamentalização:</p><ul class='list-disc pl-5 mt-2'><li><strong>Funcional:</strong> Foco no CONHECIMENTO (Economia de escala)</li><li><strong>Projetos:</strong> Foco no RESULTADO (Flexibilidade)</li><li><strong>Matricial:</strong> Foco AMBOS (Dupla subordinação)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 2 - Estrutura e Organização", artista: "Concurso Na Veia" }
  },
  3: {
    introducaoCEDEA: [
      "A função administrativa de direção é indiscutivelmente o núcleo humano da gestão corporativa, envolvendo a arte e a técnica de guiar, motivar intensamente e liderar os recursos humanos em direção ao alcance implacável dos objetivos definidos no plano de negócios. Distribuída capilarmente em todos os níveis hierárquicos, a direção é a única função que lida diretamente com a complexidade, a imprevisibilidade e a dinâmica singular do comportamento humano no ambiente laboral.",
      "Na realidade operacional de empresas de energia como a Petrobras, o exercício da liderança em ambientes offshore ou industriais de altíssimo risco e confinamento exige dos gestores uma inteligência emocional extraordinária, uma comunicação assertiva e transparente, e a rara capacidade de manter equipes multidisciplinares altamente engajadas, mesmo sob a pressão esmagadora de prazos críticos e normas rígidas de segurança (SMS).",
      "O substrato teórico da direção apoia-se nas teorias motivacionais, que se ramificam em teorias de conteúdo (que mapeiam o que, de fato, motiva o ser humano) e teorias de processo (que descrevem como ocorre a mecânica da motivação). A consagrada Hierarquia das Necessidades de Abraham Maslow estrutura esse desejo em uma pirâmide rígida de cinco patamares fundamentais: necessidades fisiológicas, de segurança, sociais, de estima e, no topo, a autorrealização profunda.",
      "Por outro lado, a Teoria Bifatorial de Frederick Herzberg propõe uma ruptura paradigmática ao afirmar que a satisfação e a insatisfação não são extremos do mesmo contínuo. Ele diferencia categoricamente os Fatores Higiênicos (elementos extrínsecos do ambiente, como salário base e iluminação, que apenas evitam a insatisfação) dos Fatores Motivacionais (elementos intrínsecos ao cargo, como reconhecimento, autonomia e crescimento, que de fato geram a verdadeira motivação e o orgulho profissional).",
      "As polarizadas Teorias X e Y de Douglas McGregor contrastam de forma visceral duas visões gerenciais sobre a natureza do trabalhador: a obsoleta Teoria X assume que o funcionário é inato e irremediavelmente indolente, evita o esforço e, portanto, exige coerção e controle militar; já a moderna Teoria Y pressupõe que o trabalho é tão natural quanto o lazer e que as pessoas, quando devidamente estimuladas, buscam proativamente assumir grandes responsabilidades criativas.",
      "A manifestação prática da direção revela-se nos estilos de liderança clássicos: enquanto o líder Autocrático centraliza o poder absoluto de forma impositiva e não consulta a equipe, o líder Democrático encoraja a tomada de decisão compartilhada e constrói consensos. Já o líder Liberal (Laissez-faire) adota uma postura de máxima delegação, abdicando do controle direto e exigindo que a própria equipe possua uma altíssima maturidade e autogestão técnica para entregar os resultados esperados.",
      "Avançando nas abordagens contemporâneas, a Teoria da Liderança Situacional defende com veemência que não existe, em hipótese alguma, um único estilo de gestão universalmente perfeito. O gestor de excelência deve possuir a flexibilidade de adaptar o seu comportamento — oscilando entre ser altamente diretivo ou profundamente apoiador — calibrando sua atuação de acordo com o nível específico de maturidade técnica e psicológica de cada liderado diante da tarefa designada.",
      "No topo da influência interpessoal encontra-se a Liderança Transformacional, um estilo carismático que inspira e provoca os liderados a transcenderem seus próprios interesses individuais, abraçando apaixonadamente a visão de futuro da organização. Em contraste absoluto, a Liderança Transacional atua como uma via de mão dupla mecânica, baseando-se estritamente em trocas utilitárias, recompensas imediatas condicionais e punições disciplinares para garantir o cumprimento estrito das metas de curto prazo.",
      "Nas implacáveis provas de administração organizadas pela banca CESGRANRIO, as pegadinhas mais recorrentes e perigosas envolvem a clássica afirmação ardilosa de que o 'aumento de salário' atua como um fator puramente motivacional e gerador de engajamento duradouro, quando, na verdade absoluta da Teoria de Herzberg, a remuneração é tipificada estritamente como um fator higiênico extrínseco.",
      "O domínio profundo, crítico e minucioso deste amplo arco temático da função de direção habilita o candidato de alto nível a dissecar e resolver com fluidez as questões densas de liderança situacional, gestão estratégica de equipes de alta performance e engenharia do clima organizacional, competências centrais exigidas nos editais das principais carreiras do funcionalismo público federal."
    ],
    accordions: [
      {
        titulo: "Teoria dos Dois Fatores de Herzberg",
        conteudo: "<p>Diferenciação indispensável para concursos:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Fatores Higiênicos (Extrínsecos/Ambiente):</strong> Salário, benefícios, políticas da empresa, instalações físicas. Se ausentes, geram <em>insatisfação</em>. Se presentes, geram apenas <em>não-insatisfação</em> (neutro).</li><li><strong>Fatores Motivacionais (Intrínsecos/Conteúdo):</strong> Reconhecimento, autonomia, desafio do trabalho, crescimento. Se presentes, geram <em>satisfação real e motivação</em>.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Motivação",
        tituloFrente: "Pirâmide de Maslow",
        iconeFrente: "LuTriangle",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Hierarquia de Necessidades",
        conteudoVerso: "Fisiológicas $\\rightarrow$ Segurança $\\rightarrow$ Sociais $\\rightarrow$ Estima $\\rightarrow$ Autorrealização. As necessidades mais baixas devem ser satisfeitas primeiro. 🔺"
      },
      {
        categoria: "Motivação",
        tituloFrente: "Herzberg - Higiênicos",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Evitam Insatisfação",
        conteudoVerso: "Salário, benefícios e ambiente físico <strong>NÃO motivam</strong>; apenas evitam a insatisfação do trabalhador. 💵"
      },
      {
        categoria: "Liderança",
        tituloFrente: "Liderança Situacional",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Flexibilidade do Líder",
        conteudoVerso: "O estilo de liderança deve variar de acordo com a <strong>maturidade técnica e emocional</strong> do liderado na tarefa. 🎯"
      },
      {
        categoria: "Estilos",
        tituloFrente: "Liderança Democrática",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "Participação da Equipe",
        conteudoVerso: "O líder orienta e estimula a participação do grupo nas decisões. As diretrizes são debatidas coletivamente. 👥"
      },
      {
        categoria: "Estilos",
        tituloFrente: "Liderança Transformacional",
        iconeFrente: "LuAward",
        subtituloFrente: "Memorização",
        tituloVerso: "Inspiração e Visão",
        conteudoVerso: "Transforma a cultura e inspira os liderados a alcançarem resultados extraordinários por meio de uma visão compartilhada. 🌟"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Salário Motiva?",
        conteudoVerso: "Para Herzberg, o <strong>salário é um fator higiênico</strong> (não motiva). A CESGRANRIO adora tentar enganar o candidato com essa assertiva! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Estilos de Liderança",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Resumo dos Estilos Clássicos:</p><ul class='list-disc pl-5 mt-2'><li><strong>Autocrático:</strong> Centraliza (Eu mando)</li><li><strong>Democrático:</strong> Participa (Nós decidimos)</li><li><strong>Liberal:</strong> Delega totalmente (Vocês fazem)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 3 - Direção e Liderança", artista: "Concurso Na Veia" }
  },
  4: {
    introducaoCEDEA: [
      "A função administrativa de controle é o elo que fecha e consolida o ciclo do processo administrativo, atuando como o mecanismo garantidor de que as atividades executadas no mundo real estejam milimetricamente alinhadas com as diretrizes e metas traçadas no planejamento estratégico. Esse processo envolve a definição rigorosa de padrões de desempenho, a medição constante dos resultados atuais, a comparação analítica minuciosa e, sobretudo, a imediata tomada de ações corretivas em caso de desvios.",
      "Em um cenário de extrema complexidade industrial como o da Petrobras, a ausência de um sistema de controle implacável sobre a estrutura de custos, estoques de peças sobressalentes e prazos de manutenção preditiva pode resultar em falhas catastróficas. É o controle que atua como o principal fiador da lucratividade estatal, da governança corporativa transparente e, acima de tudo, da manutenção inegociável da segurança ambiental nas plataformas e refinarias.",
      "Teoricamente, os controles organizacionais são classificados de acordo com o momento cronológico em que atuam no processo produtivo. O Controle Prévio (ou ex-ante) age de forma estritamente profilática sobre os insumos e a qualificação da mão de obra antes que o trabalho inicie. O Controle Simultâneo (concorrente) ocorre no 'chão de fábrica' durante a execução, corrigindo rotas em tempo real. Já o Controle Posterior (ex-post ou de feedback) analisa os resultados finais entregues aos clientes e fornece subsídios vitais para o próximo ciclo de planejamento.",
      "No topo da arquitetura de controle estratégico global encontra-se o aclamado Balanced Scorecard (BSC), desenvolvido por Kaplan e Norton. Mais do que um simples painel de métricas, o BSC é um sistema de tradução estratégica que repudia a velha visão focada exclusivamente no lucro de curto prazo (contábil). Ele materializa a missão e a visão intangíveis da empresa em um mapa estratégico tangível, equilibrado de forma holística em quatro perspectivas interdependentes e perfeitamente encadeadas.",
      "As quatro perspectivas sagradas do BSC ilustram a lógica de causa e efeito da corporação: a perspectiva de Aprendizado e Crescimento (capacitação humana e TI) impulsiona a eficiência na perspectiva dos Processos Internos (inovação e operação); processos de excelência geram alto valor na perspectiva de Clientes (atração e retenção); e clientes extremamente satisfeitos garantem os resultados financeiros desejados na perspectiva Financeira (lucratividade e retorno sobre o investimento).",
      "Para que qualquer sistema de controle funcione e não recaia no perigoso terreno do achismo gerencial, a estipulação prévia de indicadores-chave de desempenho (KPIs) é um pilar não negociável. Somente com métricas claras, objetivas e quantificáveis é possível isolar avaliações puramente subjetivas e avaliar se a gerência está, de fato, entregando a performance estabelecida no nível tático e operacional.",
      "O conceito sistêmico de 'Amplitude de Controle' está umbilicalmente ligado ao desenho estrutural e define matematicamente o número ideal de subordinados diretamente supervisionados por cada gestor. Uma amplitude muito estreita gera um microgerenciamento sufocante e estruturas organizacionais verticalizadas e caras, enquanto uma amplitude exageradamente larga provoca a perda de controle sobre a execução técnica, exigindo maior autonomia e maturidade da equipe.",
      "Outro desafio crônico do processo de controle é a resistência comportamental inerente ao ser humano. Quando as métricas e os padrões de supervisão são comunicados pela liderança de maneira exclusivamente punitiva, policialesca e controladora, as equipes reagem com boicotes sistêmicos. O controle eficaz deve ser sempre posicionado organizacionalmente como uma bússola pedagógica orientadora de melhorias e de alavancagem de desempenho.",
      "Nas sofisticadas e concorridas provas aplicadas pela banca CESGRANRIO, o candidato enfrentará impiedosas questões que exigem a exata diferenciação das quatro perspectivas do mapa estratégico do BSC, e também a habilidade cirúrgica para classificar o momento do controle (preventivo, concorrente ou posterior) com base em descrições práticas de auditoria e inspeção fornecidas nos enunciados hipotéticos.",
      "Compreender a profundidade e a lógica inerente do processo de controle capacita integralmente o candidato de alta performance a resolver não só as questões diretas de administração, mas também temas transversais densos que abordam auditoria interna rigorosa, compliance de ponta e sistemas complexos de governança corporativa no rigoroso ambiente estatal brasileiro."
    ],
    accordions: [
      {
        titulo: "As 4 Perspectivas do Balanced Scorecard (BSC)",
        conteudo: "<p>Estrutura clássica do mapa estratégico BSC:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Financeira:</strong> Como parecemos aos acionistas? (Lucratividade, ROI, custos).</li><li><strong>Clientes:</strong> Como os clientes nos veem? (Satisfação, retenção, imagem).</li><li><strong>Processos Internos:</strong> Em que processos devemos se sobressair? (Qualidade, inovação, tempo de ciclo).</li><li><strong>Aprendizado e Crescimento:</strong> Como podemos continuar a melhorar? (Capacitação, clima, tecnologia).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Controle",
        tituloFrente: "Controle Preventivo",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Atuação Ex-Ante",
        conteudoVerso: "Ocorre <strong>antes da execução</strong>. Foco nos insumos e na prevenção de desvios (ex: inspeção de matéria-prima). 🛡️"
      },
      {
        categoria: "Controle",
        tituloFrente: "Controle Simultâneo",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Atuação Concorrente",
        conteudoVerso: "Ocorre <strong>durante o processo</strong>. Foco na supervisão direta e correção em tempo real. ⚡"
      },
      {
        categoria: "Controle",
        tituloFrente: "Controle Posterior",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Atuação Ex-Post",
        conteudoVerso: "Ocorre <strong>após a conclusão</strong>. Foco na medição dos resultados finais e auditoria de balanço. 📊"
      },
      {
        categoria: "BSC",
        tituloFrente: "Equilíbrio no BSC",
        iconeFrente: "LuLayers",
        subtituloFrente: "Memorização",
        tituloVerso: "Não Apenas Financeiro",
        conteudoVerso: "O BSC evita o foco exclusivo em indicadores financeiros, incluindo métricas de clientes, processos e aprendizado. ⚖️"
      },
      {
        categoria: "KPIs",
        tituloFrente: "Padrão de Desempenho",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Memorização",
        tituloVerso: "Métrica de Comparação",
        conteudoVerso: "Sem um padrão preestabelecido, a medição torna-se inútil pois não há parâmetro para julgar se o resultado foi bom ou ruim. 📏"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Orçamento é Controle?",
        conteudoVerso: "O <strong>Orçamento</strong> é simultaneamente uma ferramenta de <strong>planejamento</strong> (ao definir limites) e de <strong>controle</strong> (ao medir o gasto real). ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico das 4 Perspectivas do BSC",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Lembre-se da sigla <strong>F-C-P-A</strong>:</p><ul class='list-disc pl-5 mt-2'><li><strong>F</strong>inanceira</li><li><strong>C</strong>lientes</li><li><strong>P</strong>rocessos Internos</li><li><strong>A</strong>prendizado e Crescimento</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 4 - Controle e KPIs", artista: "Concurso Na Veia" }
  },
  5: {
    introducaoCEDEA: [
      "A disciplina da Administração da Qualidade evoluiu historicamente de um controle técnico reativo e isolado, restrito apenas a inspetores de linha de montagem, para um modelo de gestão estratégica sistêmico e absolutamente indispensável. Ela integra toda a cadeia de valor da corporação e posiciona a melhoria contínua e a plena satisfação das necessidades e expectativas dos clientes no epicentro do modelo de negócios moderno.",
      "Na gigantesca malha logística e de produção da Petrobras, a garantia irrestrita de padrões de qualidade supremos em insumos de engenharia, maquinário pesado e prestação de serviços é o alicerce fundamental. Uma única peça fora da especificação técnica rigorosa não gera apenas desperdício, mas pode comprometer o desempenho dos ativos de bilhões de dólares, ameaçar vidas humanas e macular irremediavelmente a imagem corporativa da estatal no mercado global.",
      "A grande revolução promovida pela qualidade total é a mudança de paradigma da 'inspeção ex-post' (descobrir o defeito depois que o produto está pronto) para a 'prevenção ex-ante' (projetar o sistema para que seja impossível produzir um erro). O enfoque preventivo assegura um envolvimento sistêmico de todas as esferas organizacionais, rompendo os antiquados silos departamentais e unificando os objetivos técnicos da base operacional com as diretrizes financeiras da alta direção.",
      "Essa abordagem introduz conceitos de extrema robustez corporativa, como o 'Custo da Qualidade', que explicita matematicamente a massiva vantagem econômica de investir preventivamente em treinamentos avançados e padronização. Isso pulveriza os vultosos prejuízos ocultos provenientes de refugo (descarte), retrabalho exaustivo, devoluções de clientes insatisfeitos e pesados passivos judiciais que assombram empresas de baixa maturidade processual.",
      "Um dos pilares conceituais mais importantes exigidos em editais de excelência é a perspectiva de que o ciclo da qualidade permeia as relações internas da firma. Cada colaborador não atende apenas o mercado externo, mas serve ao seu 'cliente interno' — o colega do departamento seguinte na linha de produção. Seccionar o fluxo e garantir a máxima qualidade na transferência de informações ou peças internamente é a única forma de garantir a pureza do produto final.",
      "Os princípios globais de gestão da qualidade, fortemente ancorados em famílias de normas consagradas como a ISO 9001, funcionam como um arcabouço normativo que se integra diretamente à governança corporativa. Essa aderência rigorosa a processos auditáveis, indicadores calibrados e ações corretivas sistemáticas fornece a base jurídica e técnica exigida para obtenção e manutenção de certificações internacionais mandatórias no setor de óleo e gás.",
      "No entanto, o sucesso desse modelo não se sustenta apenas por manuais operacionais; ele exige irrevogavelmente a consolidação de uma vigorosa Cultura da Qualidade. Isso impõe à liderança o papel de patrocinadora implacável dessa transformação cultural (top-down), além da necessidade crônica de capacitação continuada e empoderamento real (empowerment) de todos os colaboradores do chão de fábrica para que possam interromper linhas de produção diante de inconformidades críticas.",
      "Quando o foco sai do mero controle de variabilidade e passa a mirar o processo de maneira horizontal, a gestão sistêmica ganha agilidade para identificar os reais elos frágeis e gargalos paralisantes na cadeia global de suprimentos. Isso possibilita à organização alocar investimentos de melhoria nos exatos pontos onde o retorno operacional e a proteção contra riscos serão potencializados ao máximo.",
      "Nas afiadas e exigentes avaliações aplicadas pela Fundação CESGRANRIO, a recorrência em cobrar a diferenciação abissal entre as fases históricas da qualidade é uma tradição. O candidato deve dominar os conceitos e as limitações da Era da Inspeção (foco no produto e separação de lotes ruins), do Controle Estatístico (amostragem), da Garantia da Qualidade (normas e processos preventivos) e da Gestão da Qualidade Total - TQM (estratégia de negócios liderada pela alta cúpula).",
      "O domínio soberano desses pilares conceituais e filosóficos capacita estrategicamente o estudante de alto rendimento a responder com celeridade e extrema precisão técnica a todo um amplo espectro de questões conceituais cruciais, estudos de caso situacionais e armadilhas terminológicas implícitas nas provas para carreiras de analistas e engenheiros do sistema estatal federal."
    ],
    accordions: [
      {
        titulo: "Visão Geral da Gestão da Qualidade",
        conteudo: "<p>Pontos de atenção para concursos:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li>A qualidade é um processo dinâmico e contínuo.</li><li>Exige integração entre projeto, compras, produção e atendimento.</li><li>Foco na eliminação das causas das não conformidades.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Qualidade",
        tituloFrente: "Foco Preventivo",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Evitar o Erro",
        conteudoVerso: "Investir na fase de planejamento e projeto para que a falha não ocorra na operação. 🛡️"
      },
      {
        categoria: "Qualidade",
        tituloFrente: "Garantia da Qualidade",
        iconeFrente: "LuAward",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Confiança Sistêmica",
        conteudoVerso: "Conjunto de ações planejadas para fornecer a confiança de que o produto atenderá aos requisitos. 🏆"
      },
      {
        categoria: "Qualidade",
        tituloFrente: "Melhoria Contínua",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Kaizen",
        conteudoVerso: "Esforço permanente para aprimorar os processos, reduzindo variabilidades. 📈"
      },
      {
        categoria: "Qualidade",
        tituloFrente: "Cliente Interno",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "Próxima Etapa",
        conteudoVerso: "Cada setor deve tratar a etapa seguinte do processo como seu cliente. 👥"
      },
      {
        categoria: "Qualidade",
        tituloFrente: "Padronização",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Memorização",
        tituloVerso: "Estabilidade do Processo",
        conteudoVerso: "Fixar a melhor forma executada para garantir reprodutibilidade nos resultados. 📄"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Inspeção vs Qualidade",
        conteudoVerso: "Inspeção apenas encontra erros já cometidos; a gestão da qualidade impede que eles aconteçam. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico da Gestão da Qualidade",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Essência da Qualidade:</p><p class='mt-2 font-mono text-indigo-400'>PREVENIR > INSPECIONAR</p></div>"
    },
    audio: { titulo: "Podcast Módulo 5 - Administração da Qualidade", artista: "Concurso Na Veia" }
  },
  6: {
    introducaoCEDEA: [
      "As ferramentas de gestão da qualidade, frequentemente referidas como as 'Sete Ferramentas Básicas', constituem a principal e mais robusta caixa de instrumentos analíticos à disposição do gestor contemporâneo. Elas fornecem metodologias gráficas e lógicas rigorosas para a identificação precoce de desvios operacionais, o diagnóstico incontestável das causas-raiz e a implementação assertiva de planos de solução técnica de alto impacto nas corporações.",
      "No intrincado e dinâmico ecossistema de contratações e logística da Petrobras, a utilização pragmática e correta desse arsenal estatístico e esquemático reduz drasticamente os funestos tempos de parada programada e mitiga as bilionárias perdas ocasionadas por falhas sequenciais no recebimento e inspeção rigorosa dos cruciais materiais e equipamentos de campo em ambientes inóspitos.",
      "A premissa mestre da moderna gestão exige a aniquilação completa de práticas arcaicas baseadas em palpites e pressupostos subjetivos. Com a utilização de ferramentas analíticas objetivas, as organizações consolidam a irrevogável cultura da decisão orientada exclusivamente por fatos e dados coletados e rastreáveis na linha de frente (gemba). É a substituição do 'eu acho que' pela inquestionável precisão matemática da 'estatística demonstra que'.",
      "O célebre Diagrama de Pareto (também conhecido estritamente como a regra 80/20) é o instrumento supremo para a priorização de esforços e capital. Ele permite ao gestor de recursos escassos identificar cirurgicamente que cerca de 20% das causas vitais são as geradoras diretas e implacáveis de 80% das falhas operacionais e prejuízos financeiros da cadeia de valor, ordenando as ações da causa mais grave para a mais leve.",
      "Já o clássico Diagrama de Ishikawa (espinha de peixe ou diagrama de causa e efeito) brilha intensamente na fase de diagnóstico estruturado. Ele obriga a equipe a dissecar exaustivamente um problema (efeito não desejado) em múltiplas ramificações minuciosas baseadas na matriz dos 6Ms: Mão de obra, Máquina, Material, Método, Medida e Meio ambiente, esgotando todas as possíveis hipóteses geradoras da não conformidade na produção.",
      "Para garantir que as soluções propostas pelas ferramentas de diagnóstico ganhem vida executável e não fiquem restritas a reuniões inócuas, emprega-se o metodológico plano de ação 5W2H. Ele funciona como uma matriz impecável composta por sete perguntas pragmáticas, que detalham com precisão microscópica quem fará, o que fará, onde, quando, por que, de que forma e quanto custará a implementação integral do remédio gerencial ao processo produtivo.",
      "No campo da variação e estabilidade estatística do sistema, as Cartas de Controle de Shewhart e os Histogramas desempenham papel ímpar. O histograma revela graficamente o comportamento da distribuição da frequência dos dados amostrais coletados, enquanto as cartas de controle monitoram os processos dinamicamente em tempo real, disparando severos alarmes quando os resultados ultrapassam as rigorosas linhas de controle superior e inferior.",
      "Todo esse ferramental tático orbita o magnânimo e onipresente Ciclo PDCA (Plan-Do-Check-Act/Adjust), que é, por si só, o método mental consagrado para transformar qualquer simples insight de melhoria corporativa em uma rotina operacional solidamente padronizada e imune a retrocessos na eficiência produtiva da organização, materializando assim a filosofia japonesa do Kaizen no mundo ocidental.",
      "A prestigiosa banca CESGRANRIO tem um vasto histórico de cobrar, de forma situacional e aplicada, a associação mental imediata de cada uma das sete ferramentas básicas (e outras complementares como Brainstorming e Fluxogramas) com a sua finalidade técnica exata. Trocar o objetivo do Diagrama de Pareto com as funcionalidades do Diagrama de Ishikawa é um erro inaceitável para candidatos e resulta em reprovação quase certa.",
      "O domínio pleno e articulado deste denso módulo prepara estrategicamente e blindadamente o aluno para resolver, com margem zero de hesitação, os mais complexos estudos de caso e enunciados longos presentes em provas de certame. Com esse arsenal em mente, a leitura e a dissecação situacional de casos práticos durante a prova transformam-se em processos lógicos, puramente mecanicistas e de acerto garantido."
    ],
    accordions: [
      {
        titulo: "Aplicação Prática das Ferramentas",
        conteudo: "<p>Principais usabilidades operacionais:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li>Pareto: Priorização dos 20% que geram 80% do impacto.</li><li>Ishikawa: Descoberta da causa-raiz dividida nos 6Ms.</li><li>5W2H: Construção de planos de ação claros sem lacunas.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Ferramentas",
        tituloFrente: "Pareto",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Priorização",
        conteudoVerso: "Gráfico de barras que separa os 'poucos vitais' dos 'muitos triviais'. 📊"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "Ishikawa",
        iconeFrente: "LuTriangle",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Causa e Efeito",
        conteudoVerso: "Mapeamento gráfico das possíveis causas-raiz de um problema específico. 🐟"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "5W2H",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Plano de Ação",
        conteudoVerso: "Matriz com 7 perguntas que definem completamente a execução de uma tarefa. 📝"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "Histograma",
        iconeFrente: "LuActivity",
        subtituloFrente: "Memorização",
        tituloVerso: "Frequência de Dados",
        conteudoVerso: "Mostra a distribuição e variação de dados numéricos contínuos. 📈"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "Carta de Controle",
        iconeFrente: "LuShield",
        subtituloFrente: "Memorização",
        tituloVerso: "Limites Estatísticos",
        conteudoVerso: "Gráfico com limites de controle para verificar a estabilidade do processo. 📉"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Escolha da Ferramenta",
        conteudoVerso: "Para priorizar use Pareto; para encontrar causas use Ishikawa; para executar use 5W2H! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico da Escolha de Ferramentas",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Associação Rápida:</p><ul class='list-disc pl-5 mt-2'><li><strong>Pareto:</strong> Priorizar</li><li><strong>Ishikawa:</strong> Investigar Causa</li><li><strong>5W2H:</strong> Planejar Ação</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 6 - Ferramentas da Qualidade", artista: "Concurso Na Veia" }
  },
  7: {
    introducaoCEDEA: [
      "A moderna Gestão por Processos de Negócio, consagrada globalmente pelo acrônimo BPM (Business Process Management), atua como a revolução copernicana dentro da teoria organizacional, reorganizando todo o trabalho corporativo, o foco estratégico e os fluxos sistêmicos a partir de uma ótica estritamente transversal, horizontal, e desenhada ponta a ponta para agregar o máximo de valor diretamente ao consumidor e ao cliente final.",
      "Em um conglomerado estatal vasto, compartimentado e multidisciplinar como a Petrobras, a implantação madura da visão voltada para os processos supera e implosiona os perigosos e antiquados isolamentos (silos) departamentais clássicos, integrando, com precisão técnica irretocável, as pesadas operações diárias das diretorias de logística naval, engenharia petroleira de alto mar, finanças corporativas e o exigente departamento de compliance.",
      "O exaustivo mapeamento formal dos processos existentes é a base cirúrgica que permite desmascarar ineficiências cruciais. Ao documentar a realidade operacional com exatidão implacável, a gestão é capaz de identificar severas duplicidades estruturais de atividades laborais e, principalmente, gargalos logísticos de execução crônicos que encarecem silenciosa e absurdamente as rotinas logísticas da megaoperação nacional sem gerar o equivalente retorno ou eficácia estratégica.",
      "Neste escopo de engenharia organizacional, as metodologias do AS-IS e do TO-BE assumem enorme protagonismo conceitual e prático. O mapeamento denominado de AS-IS (como está) atua como um retrato fiel, implacável e muitas vezes doloroso dos vícios, falhas e burocracias inúteis da situação presente da empresa, enquanto o desenho TO-BE (como será) é concebido cientificamente para ser o projeto seguro, inovador e otimizado do estado futuro das rotinas livres de gargalos e imperfeições sistêmicas.",
      "Para que esse novo desenho estrutural tenha validade e seja compreensível uniformemente, emprega-se rigorosamente a notação internacional BPMN (Business Process Model and Notation). Ela padroniza todos os símbolos gráficos de desenho técnico — piscinas, raias, eventos e gateways —, criando uma linguagem corporativa franca, fluida e universal que facilita incrivelmente a comunicação crítica entre equipes executivas, áreas técnicas de Tecnologia da Informação (TI) e gestores setoriais.",
      "A rigorosa gestão baseada puramente em processos apoia também a necessária revolução digital das rotinas de negócio mediante a intensa adoção da automação de fluxos de trabalho gerenciais. Softwares complexos conhecidos como plataformas BPMS assumem o controle, garantindo governança impecável, conformidade e o monitoramento estatístico em tempo real da eficiência do fluxo, tudo rigorosamente integrado aos grandes sistemas ERPs (Enterprise Resource Planning) da corporação estatal.",
      "É imperativo que haja o total alinhamento vertical dos novos processos mapeados em relação à estratégia corporativa de cúpula global, de maneira que cada singela atividade pontual no nível operacional seja diretamente responsabilizada e quantificada em sua modesta, mas imprescindível contribuição sistemática rumo ao atingimento pleno e robusto das grandes e complexas metas da mega organização energética brasileira.",
      "Um elemento disruptivo e vital nesse cenário é a governança moderna de processos que, ao quebrar as amarras verticais, institui, empodera e legitima a inovadora e polêmica figura executiva dos Donos de Processos (Process Owners). Esses líderes especializados passam a ser os únicos e indiscutíveis responsáveis legais pelo desempenho implacável, resultados palpáveis e conformidade do fluxo do processo de ponta a ponta, mesmo que esse fluxo cruze diversas e ciumentas chefias departamentais.",
      "A CESGRANRIO exige com mão de ferro nos certames o domínio maduro e cirúrgico da terminologia BPM, requerendo não apenas a definição, mas a capacidade aguçada do candidato de reconhecer, categorizar e classificar instintivamente em narrativas as diferenças axiais e funcionais entre o processo primário (fim), o indispensável processo de suporte técnico (meio ou apoio vital), e o complexo processo de gerenciamento corporativo institucional de controle e estratégia (gestão).",
      "Compreender sistemicamente com profundidade o denso modelo BPM prepara e qualifica de forma ímpar e diferenciada o aluno-candidato para não só entender a teoria pura dos livros de administração, mas a responder tempestiva, exata e assertivamente aos enunciados e às questões extensas sobre fluxos organizacionais, modernização administrativa setorial e análise crítica de cenários governamentais sob as exigentes diretrizes de processos do serviço público federal brasileiro."
    ],
    accordions: [
      {
        titulo: "Categorias de Processos no BPM",
        conteudo: "<p>Divisão clássica de processos:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Processos Primários (Core):</strong> Atividades fim que entregam valor diretamente ao cliente externo.</li><li><strong>Processos de Suporte (Apoio):</strong> Viabilizam a execução dos processos primários (ex: TI, RH).</li><li><strong>Processos Gerenciais:</strong> Garantem a medição, controle e alinhamento estratégico da empresa.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "BPM",
        tituloFrente: "Processos Primários",
        iconeFrente: "LuLayers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Atividades-Fim",
        conteudoVerso: "Ligados diretamente à entrega do produto ou serviço ao cliente externo. 🚀"
      },
      {
        categoria: "BPM",
        tituloFrente: "Processos de Suporte",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Atividades de Apoio",
        conteudoVerso: "Garantem a infraestrutura e recursos para que os processos primários funcionem. 🛠️"
      },
      {
        categoria: "BPM",
        tituloFrente: "Mapeamento AS-IS",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Diagnóstico Atual",
        conteudoVerso: "Mapeamento fidedigno da situação presente, incluindo falhas e gargalos existentes. 📸"
      },
      {
        categoria: "BPM",
        tituloFrente: "Desenho TO-BE",
        iconeFrente: "LuAward",
        subtituloFrente: "Memorização",
        tituloVerso: "Situação Futura",
        conteudoVerso: "Proposta do novo fluxo otimizado, sem os gargalos identificados no AS-IS. ✨"
      },
      {
        categoria: "BPM",
        tituloFrente: "Process Owner",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "Dono do Processo",
        conteudoVerso: "Gestor responsável pelo desempenho ponta a ponta do fluxo, além das fronteiras funcionais. 👤"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Fluxo vs Departamento",
        conteudoVerso: "O processo é **horizontal** e cruza departamentos; o departamento é **vertical** e isolado. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Tipos de Processo",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Classificação BPM:</p><ul class='list-disc pl-5 mt-2'><li><strong>Primário:</strong> Valor ao Cliente</li><li><strong>Suporte:</strong> Apoio Interno</li><li><strong>Gerencial:</strong> Controle e Estratégia</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 7 - Gestão por Processos", artista: "Concurso Na Veia" }
  },
  8: {
    introducaoCEDEA: [
      "O Ciclo de Vida de Processos de Negócio é o framework teórico e metodológico que descreve de forma estruturada as etapas evolutivas pelas quais um processo corporativo obrigatoriamente passa, desde sua concepção embrionária e planejamento estratégico até a sua eventual otimização revolucionária ou descontinuação definitiva.",
      "No contexto de suprimentos de gigantes como a Petrobras, gerenciar com maestria o ciclo de vida de gigantescos contratos de infraestrutura e da cadeia de fornecedores garante não apenas o abastecimento, mas assegura que as operações monumentais offshore acompanhem pari passu as inovações tecnológicas globais e não fiquem presas a fluxos arcaicos e ineficientes.",
      "Segundo as diretrizes internacionais, como o BPM CBOK (Corpo de Conhecimento em Gestão de Processos), o ciclo é tipicamente desmembrado em fases sequenciais claras: Planejamento (alinhamento estratégico inicial), Modelagem (desenho do processo), Simulação (teste virtual), Execução (implantação real no chão de fábrica), Monitoramento (coleta métrica) e Otimização (melhoria ou inovação radical).",
      "A fase de Modelagem é crítica. Nela, as equipes de analistas não apenas desenham um fluxograma superficial, mas documentam pormenorizadamente como o trabalho deve ser feito (incluindo papéis, sistemas, regras de negócio e SLAs) para alcançar a máxima eficiência produtiva, preparando o terreno para a crucial fase de Simulação, que testa o modelo matematicamente em ambiente seguro (sandbox) antes da implantação real em larga escala que poderia ser catastrófica se falhastesse.",
      "Após o 'Go-Live' (Execução), geralmente orquestrado por potentes sistemas de gestão (BPMS), entra a etapa vital de Monitoramento. Nesse estágio, painéis em tempo real alimentados por tecnologias como o BAM (Business Activity Monitoring) disparam alertas automáticos de anomalias processuais, atrasos ou quebras de conformidade (compliance) muito antes do processo colapsar e afetar o cliente.",
      "A etapa final de Otimização fecha o ciclo sistêmico realimentando a fase inicial. Ela pode resultar em dois caminhos distintos: a melhoria contínua (incremental, degrau a degrau, como o Kaizen japonês) ou a radical reengenharia de processos (abandono do fluxo atual e desenho de uma folha em branco, com quebra total de paradigmas em busca de saltos exorbitantes de produtividade).",
      "É vital para o profissional moderno entender academicamente que a Reengenharia implica invariavelmente em começar do absoluto zero (conceito de blank sheet of paper), renegando as velhas práticas e estruturas corporativas vigentes, enquanto a Melhoria Contínua atua no ajuste fino e cirúrgico do que já existe, sem rupturas traumáticas drásticas na organização vigente.",
      "Sem o estrito e zeloso acompanhamento disciplinado desse ciclo vitalício, grandes corporações rapidamente transformam processos outrora de ponta em amontoados burocráticos engessados, lentos e caros que drenam a capacidade competitiva e abrem flancos mortais para concorrentes mais ágeis no implacável mercado petrolífero internacional.",
      "A banca organizadora CESGRANRIO costuma focar suas baterias de questões exatamente na diferença fundamental, conceitual e prática entre os pressupostos da melhoria contínua suave e os da reengenharia de processos corporativos drástica, além de exigir que o candidato conheça a exata sequência teórica das fases dispostas no aclamado framework do CBOK.",
      "O domínio soberano das fases orgânicas do ciclo de vida capacita amplamente o candidato a gabaritar questões complexas, cruzar conhecimentos com a gestão de projetos tradicionais e entender plenamente as sofisticadas metodologias de análise de fluxos administrativos em qualquer nível hierárquico governamental federal."
    ],
    accordions: [
      {
        titulo: "Reengenharia vs Kaizen (Melhoria Contínua)",
        conteudo: "<p>Diferenças fundamentais para provas:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Kaizen:</strong> Incremental, contínuo, baixo investimento, participação de todos os colaboradores.</li><li><strong>Reengenharia:</strong> Radical, reinício do zero (folha em branco), alto investimento, top-down.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Ciclo de Vida",
        tituloFrente: "Análise de Processos",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Diagnóstico de Problemas",
        conteudoVerso: "Investigação detalhada das causas dos atrasos e gargalos no fluxo de trabalho. 🔎"
      },
      {
        categoria: "Ciclo de Vida",
        tituloFrente: "Redesenho",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Solução Proposta",
        conteudoVerso: "Criação de novas regras e rotinas para solucionar as ineficiências encontradas. 📐"
      },
      {
        categoria: "Abordagens",
        tituloFrente: "Reengenharia",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Mudança Radical",
        conteudoVerso: "Reconceituação do zero do processo para obter melhorias gigantescas em custo e velocidade. 💥"
      },
      {
        categoria: "Abordagens",
        tituloFrente: "Kaizen",
        iconeFrente: "LuAward",
        subtituloFrente: "Memorização",
        tituloVerso: "Melhoria Incremental",
        conteudoVerso: "Aprimoramento gradual e diário aproveitando as sugestões das próprias equipes operacionais. 🌱"
      },
      {
        categoria: "Controle",
        tituloFrente: "Monitoramento",
        iconeFrente: "LuShield",
        subtituloFrente: "Memorização",
        tituloVerso: "Acompanhamento de KPIs",
        conteudoVerso: "Medição em tempo real do desempenho do processo redesenhado. 📈"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Reengenharia é Kaizen?",
        conteudoVerso: "Reengenharia é **radical e do zero**; Kaizen é **gradual e cumulativo**. Não confunda na prova! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico de Redesenho",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Gatilho Mental de Redesenho:</p><ul class='list-disc pl-5 mt-2'><li><strong>Kaizen:</strong> Passo a Passo (Gradual)</li><li><strong>Reengenharia:</strong> Folha em Branco (Radical)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 8 - Ciclo de Vida dos Processos", artista: "Concurso Na Veia" }
  },
  9: {
    introducaoCEDEA: [
      "O atendimento ao cliente deixou irreversivelmente de ser considerado uma mera área reativa, focada exclusivamente em apagar incêndios e receber reclamações, para se consagrar como o diferencial competitivo mais central, agressivo e rentável de uma corporação. Hoje, o foco total reside na gestão integral e emocional da 'Experiência do Consumidor' (Customer Experience - CX) em todas as pontas.",
      "Na imensa complexidade da cadeia de logística e suprimentos da Petrobras, o excelente atendimento prestado aos exigentes clientes internos (como engenheiros de manutenção em plataformas isoladas e refinarias de alta criticidade) deve ser absurdamente ágil, resolutivo e livre de qualquer burocracia que possa paralisar a produção de riquezas minerais no país.",
      "Para atuar na excelência, é preciso dominar a teoria de que Serviços possuem quatro características acadêmicas únicas que os diferenciam visceralmente de produtos físicos convencionais: a Intangibilidade (não podem ser tocados), a Inseparabilidade (são produzidos e consumidos simultaneamente), a Perecibilidade (não podem ser estocados) e a Variabilidade (cada prestação é única e depende do prestador humano no momento).",
      "No âmago dessa interação, surge o famoso conceito de 'Momento da Verdade' (popularizado por Jan Carlzon). Ele descreve dramaticamente o instante único e exato em que o cliente entra em contato com qualquer aspecto da empresa e, em questão de frações de segundos, forma sua duradoura impressão mental sobre a qualidade geral da marca e do serviço ofertado.",
      "A tecnologia atual apoia ferozmente esse processo mediante os mega Sistemas de CRM (Customer Relationship Management). Ao centralizar e mastigar analiticamente todo o gigantesco Big Data do histórico de compras e comportamento dos clientes, a empresa passa a personalizar o atendimento de forma intimista e, principalmente, a antecipar cirurgicamente as futuras necessidades e dores do consumidor antes mesmo que ele as externe.",
      "Contudo, falhas operacionais sempre ocorrerão em cenários do mundo real. A mágica reside na tática de 'Recuperação de Serviços' (Service Recovery), que é a rara habilidade estruturada e treinada da empresa em reverter uma drástica insatisfação pós-falha grave em encantamento, muitas vezes tornando o cliente atingido mais fiel à marca do que se o serviço tivesse ocorrido normalmente (Paradoxo da Recuperação).",
      "Isso só ganha força por meio de uma genuína cultura de Customer Centricity (centralidade estrutural no cliente). Sob esse prisma inovador, todas as decisões estratégicas pesadas da diretoria, orçamentos, produtos e desenhos operacionais de processos são definidos colocando o ponto de vista do consumidor final estritamente no centro das atenções, abolindo visões engessadas internas.",
      "Na linha de frente humana, a empatia genuína e a sofisticada capacidade de escuta ativa (ouvir para compreender e não para rebater) despontam historicamente como as competências comportamentais inegociáveis e mais valorizadas em equipes de atendimento ao público corporativo premium e suporte a contratos logísticos de grande porte.",
      "O radar da CESGRANRIO sistematicamente avalia com bastante rigor o conhecimento do candidato acerca das quatro características essenciais dos serviços (especialmente intangibilidade e inseparabilidade) e cobra as cinco dimensões mundiais da qualidade percebida no atendimento: Confiabilidade, Receptividade, Segurança, Empatia e Tangibilidade (apresentação física das instalações e do pessoal).",
      "Saber diferenciar filosoficamente e na prática os desafios do produto tangível versus o serviço invisível, compreendendo toda a complexa e emocional jornada do cliente (customer journey), garante ao candidato o pleno acerto em difíceis questões de gestão comercial, posicionamento de mercado estratégico e comportamento organizacional em grandes empresas públicas."
    ],
    accordions: [
      {
        titulo: "As 5 Dimensões da Qualidade em Serviços (SERVQUAL)",
        conteudo: "<p>Dimensões de avaliação pelo cliente:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Tangibilidade:</strong> Aparência das instalações físicas, equipamentos e pessoal.</li><li><strong>Confiabilidade:</strong> Capacidade de prestar o serviço prometido de forma precisa e confiável.</li><li><strong>Capacidade de Resposta:</strong> Disposição para ajudar os clientes e prestar serviço presteza.</li><li><strong>Segurança:</strong> Conhecimento, cortesia e capacidade dos funcionários de transmitir confiança.</li><li><strong>Empatia:</strong> Atenção individualizada e cuidadosa proporcionada aos clientes.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Serviços",
        tituloFrente: "Intangibilidade",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Não se Pode Tocar",
        conteudoVerso: "O serviço não pode ser visto ou experimentado antes de ser adquirido e executado. 🌫️"
      },
      {
        categoria: "Serviços",
        tituloFrente: "Inseparabilidade",
        iconeFrente: "LuLayers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Produção e Consumo",
        conteudoVerso: "O serviço é produzido e consumido simultaneamente com a presença do cliente. 🤝"
      },
      {
        categoria: "SERVQUAL",
        tituloFrente: "Confiabilidade",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Promessa Cumprida",
        conteudoVerso: "Entregar o serviço exatamente como acordado, sem erros e dentro do prazo estipulado. 🎯"
      },
      {
        categoria: "SERVQUAL",
        tituloFrente: "Empatia",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "Atenção Personalizada",
        conteudoVerso: "Colocar-se no lugar do cliente e oferecer atendimento atencioso às suas necessidades individuais. 👁️"
      },
      {
        categoria: "SLA",
        tituloFrente: "Acordo de Nível de Serviço",
        iconeFrente: "LuTarget",
        subtituloFrente: "Memorização",
        tituloVerso: "SLA",
        conteudoVerso: "Contrato formal que define as métricas de tempo e qualidade esperadas entre fornecedor e cliente. 📜"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Perecibilidade do Serviço",
        conteudoVerso: "Serviços **não podem ser estocados**. Um assento vazio de voo ou hora ociosa é perda irreversível! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico das 5 Dimensões SERVQUAL",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Sigla para as 5 Dimensões:</p><ul class='list-disc pl-5 mt-2'><li><strong>T</strong>angibilidade</li><li><strong>R</strong>esposta (Capacidade)</li><li><strong>A</strong>ssurance (Segurança)</li><li><strong>C</strong>onfiabilidade</li><li><strong>E</strong>mpatia</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 9 - Atendimento ao Cliente e Serviços", artista: "Concurso Na Veia" }
  },
  10: {
    introducaoCEDEA: [
      "A Ouvidoria Institucional e a arquitetura de Feedback contínuo despontam como instrumentos de altíssima criticidade para a escuta corporativa madura. Eles são, indiscutivelmente, ferramentas essenciais para assegurar a blindagem da transparência governamental, promover a melhoria contínua dos pesados processos internos e garantir um fortalecimento intransigente dos robustos programas de compliance nas estatais modernas.",
      "No ambiente restrito e altamente escrutinado da Petrobras, o Canal de Denúncia Independente e a Ouvidoria-Geral atuam como as instâncias máximas e sagradas de governança corporativa. Eles recebem e apuram rigorosamente não apenas insatisfações sistêmicas com fornecedores, mas atuam como escudo para relatar assédios, ilícitos penais, corrupção e desvios éticos de conduta entre os prestadores de serviços de suprimentos e contratos gigantescos.",
      "É basilar e exigido legalmente entender que a Ouvidoria se diferencia abissalmente do popular Serviço de Atendimento ao Consumidor (SAC). O SAC atua na base operacional e na primeira linha de frente (First-line) para solucionar reclamações diárias sobre faturamento e rotinas normais, enquanto a ouvidoria é a 'instância de apelação e de segunda instância' na corporação, sendo acionada apenas quando todas as outras áreas administrativas normais de triagem e de atendimento fracassaram na solução da dor do cidadão.",
      "Por sua natureza delicadíssima e missão fiscalizatória, a ouvidoria opera de forma autônoma e independente dos demais departamentos operacionais e reporta-se diretamente e exclusivamente ao conselho de administração ou à mais alta direção executiva da companhia (CEO), garantindo autonomia plena e possuindo fortíssimo poder de recomendação estratégica e disciplinar interna que não pode ser facilmente engavetada por gestores médios ofendidos com os relatórios gerados.",
      "Já no âmbito da gestão de pessoas, o Feedback é a arte de devolução estruturada, periódica e científica de informações sobre o desempenho quantitativo ou comportamento qualitativo interpessoal, sempre com o fito precípuo de propiciar o desenvolvimento profissional sadio e contínuo do colaborador no ambiente laboral que não pode ficar alheio às expectativas da sua liderança direta.",
      "Neste espectro psicológico, a clássica matriz da 'Janela de Johari' ilustra magistralmente como o compartilhamento de feedback construtivo expande incrivelmente a chamada área 'aberta' de relacionamento confiável e reduz violentamente a perigosa 'área cega' dos pontos fracos interpessoais, os quais os próprios colaboradores ignoram que os possuem, mas que são visíveis para todo o restante da equipe que não têm coragem de reportá-los sem um canal adequado e seguro para fazê-lo livremente sem sanções retaliatórias institucionais invisíveis pela chefia avaliada negativamente por eles.",
      "Para chancelar a efetividade no atendimento das expectativas do usuário corporativo de grandes contratações da empresa e dos grandes projetos logísticos internos, a técnica Net Promoter Score (NPS) consagrou-se como a métrica universal moderna e definitiva que mensura com um único dígito percentual simplificado a lealdade do cliente pautada na célebre pergunta existencial para os negócios: 'Em uma escala de 0 a 10, você, como usuário, recomendaria efusivamente os serviços prestados pela nossa área de compras para os outros colegas de departamento da sua plataforma isolada?'.",
      "A proteção absoluta ao informante em sistemas sensíveis (whistleblower) impõe que um programa eficaz de ouvidoria deve garantir absoluto, irrestrito e perpétuo anonimato protetor, preservando a vida do informante e blindando-o contra eventuais perseguições profissionais desleais ou violentas retaliações organizacionais que são naturais em ambientes de denúncias corporativas bilionárias e com altos interesses comerciais escusos e ilegais em jogo.",
      "A meticulosa banca CESGRANRIO foca reiteradamente as suas tradicionais 'cascas de banana' justamente na distinção estratégica entre a função do SAC (puramente operacional, para queixas básicas) e da Ouvidoria (institucional, última instância, apuração sigilosa), além de testar o candidato nas premissas que separam, em teoria organizacional de Liderança moderna e em manuais de coaching empresarial consolidados as perigosas e desmotivadoras críticas vagas dos efetivos e maduros feedbacks avaliativos comportamentais pontuais e focados puramente em uma efetiva melhoria progressiva na execução dos processos administrativos de trabalho.",
      "A sólida compreensão desta infraestrutura corporativa dual (Ouvidoria e Feedback) concede ao candidato de alta competitividade os poderosos alicerces teóricos para aniquilar as mais duras e exaustivas questões sobre moderna gestão de governança e controles estatais severos do TCU, ética profissional de agentes públicos submetidos à lei de responsabilidades do Estado brasileiro, proteção estratégica a dados confidenciais cruciais em licitações abertas (LGPD no Serviço Público moderno) e avançada gestão psicológica e humanizada das mais valiosas peças da corporação federal brasileira que são as valorosas e únicas Pessoas do quadro fixo da companhia de capital misto nacional."
    ],
    accordions: [
      {
        titulo: "Tipos de Manifestação na Ouvidoria (Lei 13.460/2017)",
        conteudo: "<p>Classificação legal das manifestações:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Denúncia:</strong> Comunicação de ato ilícito, irregularidade ou violação de norma.</li><li><strong>Reclamação:</strong> Demonstração de insatisfação sobre serviço público ou atendimento prestado.</li><li><strong>Solicitação:</strong> Pedido de adoção de providência ou prestação de serviço.</li><li><strong>Sugestão:</strong> Proposta de ideia para melhoria dos serviços.</li><li><strong>Elogio:</strong> Demonstração de satisfação ou reconhecimento pelo atendimento recebido.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Ouvidoria",
        tituloFrente: "Segunda Instância",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Atuação Recursal",
        conteudoVerso: "A ouvidoria atua quando os canais regulares de atendimento (1ª instância) não resolveram o problema. 🏢"
      },
      {
        categoria: "Manifestação",
        tituloFrente: "Denúncia",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Comunicação de Ilícito",
        conteudoVerso: "Relato de fraude, corrupção ou irregularidade grave. Exige investigação e apuração. 🚨"
      },
      {
        categoria: "Manifestação",
        tituloFrente: "Reclamação",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Insatisfação com Serviço",
        conteudoVerso: "Queixa sobre a má qualidade do atendimento ou descumprimento de prazos. 📉"
      },
      {
        categoria: "Governança",
        tituloFrente: "Whistleblower",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "Proteção ao Denunciante",
        conteudoVerso: "Garantia legal de anonimato e proteção contra qualquer tipo de retaliação profissional. 🛡️"
      },
      {
        categoria: "Legislação",
        tituloFrente: "Lei 13.460/2017",
        iconeFrente: "LuTarget",
        subtituloFrente: "Memorização",
        tituloVerso: "Direitos do Usuário",
        conteudoVerso: "Regulamenta os direitos e a atuação das ouvidorias públicas e sociedades de economia mista. 📜"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "SAC vs Ouvidoria",
        conteudoVerso: "O **SAC** realiza o atendimento operacional primário; a **Ouvidoria** é canal estratégico independente de 2ª instância. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Tipos de Manifestação",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Tipos de Manifestação:</p><ul class='list-disc pl-5 mt-2'><li><strong>Denúncia:</strong> Algo Errado/Ilícito</li><li><strong>Reclamação:</strong> Algo Ruim/Demorado</li><li><strong>Sugestão:</strong> Ideia de Melhoria</li><li><strong>Elogio:</strong> Reconhecimento</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 10 - Ouvidoria e Feedback na Governança", artista: "Concurso Na Veia" }
  }
};
