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
      "O planejamento estratégico representa a espinha dorsal de qualquer organização moderna, configurando-se como o nível mais elevado e abrangente do processo administrativo. Ele transcende a mera alocação de recursos, estabelecendo as diretrizes fundamentais, a visão de futuro e a missão institucional, elementos que servem como norteadores absolutos para todas as decisões subsequentes de médio e curto prazo em um ambiente corporativo volátil. Sem essa fundação, a empresa opera às cegas, desperdiçando capital em iniciativas desconexas que não geram vantagem competitiva de longo prazo.",
      "No contexto específico de operações de alta complexidade como as da Petrobras, o planejamento de longo prazo exige uma robustez ímpar para enfrentar as brutais oscilações do mercado global de commodities, os imperativos da transição energética e as severas demandas de conformidade legal. É nesta etapa de formulação macro que a estatal define com precisão onde deseja se posicionar estrategicamente nas próximas décadas, mitigando riscos sistêmicos e garantindo a soberania energética e o retorno aos acionistas, sempre alinhada com as rígidas normativas de governança do setor público.",
      "Para operacionalizar essas diretrizes globais, a arquitetura organizacional desenvolve o planejamento tático, um desdobramento que traduz a estratégia macro em planos de ação específicos para as diferentes unidades de negócios e departamentos isolados. É nesse nível gerencial intermediário que se decidem as alocações de recursos departamentais, orçamentos setoriais e as metas, funcionando como um elo de tradução indispensável entre a alta cúpula e a base produtiva da empresa. O gestor tático atua como um tradutor, convertendo a visão abstrata em projetos tangíveis.",
      "O planejamento operacional, por sua vez, caracteriza-se pela sua extrema minúcia e foco no curto prazo, dedicando-se exclusivamente à execução rotineira e padronizada das atividades laborais. Ele define cronogramas diários, escalas de trabalho precisas e fluxos de tarefas imediatas, garantindo que as grandes diretrizes estratégicas sejam efetivamente materializadas no chão de fábrica e nas operações de linha de frente, sem margem para improvisações amadoras. A padronização aqui é a chave para a previsibilidade da entrega e a redução absoluta do desperdício.",
      "Em uma aplicação prática, enquanto a diretoria executiva (nível estratégico) decide investir bilhões na exploração de energia eólica offshore nos próximos 15 anos, a gerência de suprimentos (nível tático) elabora um plano de três anos para capacitar a equipe técnica e mapear novos fornecedores especializados. Simultaneamente, o supervisor de almoxarifado (nível operacional) define a escala de turno da equipe que fará o recebimento e a conferência de sensores na semana atual, demonstrando o perfeito alinhamento vertical das decisões corporativas.",
      "A ausência de um desdobramento tático adequado é um erro crasso e letal para grandes corporações, pois deixa as equipes operacionais completamente à deriva, executando tarefas de forma isolada e sem qualquer clareza sobre como suas rotinas exaustivas contribuem, de fato, para a visão de futuro estabelecida pela diretoria. Sem esse alinhamento metodológico, a organização sofre da 'síndrome da miopia operacional', desperdiçando recursos preciosos em atividades que não geram valor estratégico e culminando na estagnação frente à concorrência.",
      "Em cenários de crise aguda ou mudanças abruptas e imprevisíveis de mercado — como choques nos preços do petróleo ou rupturas na cadeia de suprimentos global —, a flexibilidade embutida nos planejamentos táticos e operacionais torna-se a principal ferramenta de resiliência corporativa. Essa capacidade de adaptação rápida na base permite que a empresa absorva os impactos externos através do chamado 'planejamento contingencial', sem que a sua missão e os seus objetivos estratégicos de longo prazo sejam irreversivelmente desconfigurados ou abandonados no pânico.",
      "Além disso, a mensuração contínua do progresso por meio de indicadores-chave de desempenho (KPIs) não é um evento isolado, mas uma prática intrínseca e indissociável de qualquer nível de planejamento, desde o estratégico até o operacional. A retroalimentação (feedback) constante garante que os desvios operacionais sejam identificados e corrigidos cirurgicamente em tempo real, evitando que pequenas ineficiências departamentais se agravem, transformando-se em rombos financeiros incalculáveis que comprometam a sustentabilidade do negócio e a confiança dos stakeholders.",
      "Para as provas elaboradas pela implacável banca CESGRANRIO, é rigorosamente obrigatório que o candidato saiba diferenciar os horizontes temporais (longo, médio e curto prazo), os níveis de decisão hierárquica (institucional, intermediário e operacional) e a abrangência (global, departamental e específica) inerentes a cada tipologia de planejamento, pois essas são as chaves-mestras para a resolução de questões diretas, análises de sentenças e estudos de caso complexos frequentemente cobrados em concursos de nível superior.",
      "As questões da CESGRANRIO cobram vorazmente a habilidade de analisar um estudo de caso narrativo envolvendo uma empresa estatal e identificar de forma inequívoca qual nível de planejamento está sendo descrito nas atitudes dos gestores. O candidato de elite não pode confundir de forma alguma ações departamentais de médio prazo, que são eminentemente táticas, com diretrizes globais de longo prazo emitidas pela alta direção corporativa. A banca costuma inverter esses conceitos (ex: dizendo que o estratégico cuida de tarefas diárias) para eliminar os candidatos desatentos."
    ],
    accordions: [
      {
        titulo: "As 3 Habilidades Gerenciais de Robert Katz",
        conteudo: "<p>Katz revolucionou a administração ao dividir as competências do administrador em 3 categorias essenciais que variam de acordo com a posição na hierarquia:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Habilidades Técnicas:</strong> Conhecimento altamente especializado, domínio de ferramentas e execução prática de tarefas. Predominam fortemente no <em>nível operacional</em>.</li><li><strong>Habilidades Humanas:</strong> Capacidade empática de lidar com pessoas, liderar equipes, resolver conflitos e comunicar-se assertivamente. São consideradas fundamentais e equitativas em <em>todos os níveis organizacionais</em>.</li><li><strong>Habilidades Conceituais:</strong> Visão sistêmica, capacidade de abstração, entendimento da organização como um todo e leitura do macroambiente externo. São a prioridade máxima e inegociável no <em>nível estratégico (alta direção)</em>.</li></ul>"
      },
      {
        titulo: "Os 10 Papéis Gerenciais de Henry Mintzberg",
        conteudo: "<p>Mintzberg provou que os gestores não apenas 'planejam, organizam, dirigem e controlam', mas atuam em papéis diários práticos. Ele os dividiu em 3 grandes famílias:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Interpessoais (Relações Humanas):</strong> Símbolo (representação formal), Líder (direção e motivação), Ligação (networking entre setores).</li><li><strong>Informacionais (Fluxo de Dados):</strong> Monitor (coleta de informações), Disseminador (transmissão interna), Porta-voz (transmissão para o ambiente externo).</li><li><strong>Decisórios (Uso da Informação):</strong> Empreendedor (iniciador de mudanças), Solucionador de Distúrbios (apagador de incêndios), Alocador de Recursos (distribuição de orçamentos), Negociador (acordos sindicais e de contratos).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Estratégico",
        tituloFrente: "Planejamento Institucional",
        iconeFrente: "LuTarget",
        subtituloFrente: "Alta Direção",
        tituloVerso: "Foco no Todo",
        conteudoVerso: "Envolve a organização como um todo. Possui horizonte de <strong>longo prazo</strong> e é fortemente voltado para o ambiente externo (oportunidades e ameaças). 🏢"
      },
      {
        categoria: "Tático",
        tituloFrente: "Planejamento Setorial",
        iconeFrente: "LuLayers",
        subtituloFrente: "Gerentes",
        tituloVerso: "Foco na Parte",
        conteudoVerso: "Traduz o plano macro em <strong>metas departamentais</strong> (Marketing, Finanças, Suprimentos). Horizonte de médio prazo. É o elo de ligação. 📊"
      },
      {
        categoria: "Operacional",
        tituloFrente: "Planejamento de Tarefas",
        iconeFrente: "LuActivity",
        subtituloFrente: "Supervisores",
        tituloVerso: "Foco na Execução",
        conteudoVerso: "Detalha estritamente as <strong>atividades, rotinas e métodos</strong>. Possui horizonte de curto prazo e altíssimo nível de detalhamento. ⚙️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônicos de Planejamento (CESGRANRIO)",
      content: "<div class='p-5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg'><h4 class='font-bold text-indigo-400 mb-3 flex items-center gap-2'>🧠 Triângulo do Poder</h4><ul class='space-y-3'><li class='flex items-start gap-3'><span class='text-2xl'>🦅</span><div><strong>Estratégico (A Águia):</strong> Vê de longe (Longo Prazo). Vê tudo (Global). Fica no topo (Alta Administração).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>⚖️</span><div><strong>Tático (A Balança):</strong> Equilibra a visão e a execução. Foca no seu próprio peso (Departamental). Médio Prazo.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🐜</span><div><strong>Operacional (A Formiga):</strong> Foca no chão, no detalhe (Específico). Trabalho diário (Curto Prazo).</div></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 1 - Planejamento Organizacional", artista: "Petrobras Quest" }
  },
  2: {
    introducaoCEDEA: [
      "A função administrativa de organização transcende a simples alocação física de pessoas e móveis; ela se configura como o complexo processo de estruturar a empresa de maneira sistêmica para facilitar o alcance milimétrico dos objetivos estratégicos traçados no planejamento. Ela consiste fundamentalmente em dividir o trabalho humano de forma inteligente, definir com precisão as esferas de responsabilidade, estabelecer a hierarquia formal imperativa e coordenar os recursos em um ecossistema produtivo sinérgico e livre de gargalos estruturais.",
      "Na vasta e complexa estrutura organizacional de uma gigante do setor de suprimentos, a divisão do trabalho deve ser desenhada com precisão absoluta e cirúrgica, separando com clareza as intrincadas funções de licitação, gestão de armazéns, logística de distribuição e compliance contratual. Cada uma dessas frentes exige gerências altamente especializadas, capazes de operar com autonomia na resolução de problemas, mas sem perder em nenhum momento o rígido alinhamento central com as metas de economicidade da estatal.",
      "A autoridade legal e a responsabilidade corporativa são distribuídas metodicamente ao longo de uma cadeia de comando cristalina (princípio escalar), garantindo que todas as decisões críticas, especialmente aquelas referentes à aprovação de grandes contratos e editais multibilionários, possuam fluxos formais, auditáveis e rigorosos de aprovação. Isso impede ações unilaterais que poderiam colocar em risco a integridade da companhia frente aos órgãos de controle (TCU, CGU).",
      "A alocação criteriosa de recursos — compreendendo tanto o capital humano altamente especializado quanto os recursos financeiros e tecnológicos de ponta (como sistemas ERP) — é realizada de maneira puramente estratégica para maximizar a eficiência global. Esse rigor estrutural no desenho organizacional visa eliminar impiedosamente as redundâncias de processos, garantindo que cada equipe departamental tenha exatamente o suporte e a verba necessários para executar suas operações logísticas sem desperdícios ou ociosidade oculta.",
      "A coordenação funciona como a argamassa institucional que unifica os esforços naturalmente dispersos das diversas áreas em prol do objetivo comum corporativo. Ao integrar um grande processo de compras, pregoeiros, engenheiros de especificação técnica, analistas jurídicos e especialistas financeiros precisam atuar de forma brutalmente interdependente, onde a saída documental de um profissional torna-se o insumo imediato e indispensável para o início do trabalho do outro, sem quebra de fluxo.",
      "A escolha do modelo de departamentalização é um divisor de águas: enquanto a estrutura funcional agrupa especialistas afins (promovendo altíssima excelência técnica e economia de escala, mas sofrendo de lentidão e silos de comunicação), a sofisticada estrutura matricial cruza gerentes funcionais com gerentes de projetos, forçando a integração extrema. Contudo, a matriz gera o temido desafio da dupla subordinação, o que pode causar graves conflitos de autoridade se não houver maturidade cultural entre os líderes.",
      "O eterno debate gerencial entre a centralização e a descentralização define com precisão onde o poder real de decisão reside na teia organizacional, fator que influencia diretamente a agilidade de resposta das gerências. Decisões estratégicas vitais e políticas corporativas tendem a ser retidas no topo (centralizadas) para garantir homogeneidade, enquanto decisões puramente operacionais de rotina devem ser pulverizadas na base (descentralizadas) para dar velocidade à empresa e aliviar a alta administração da sobrecarga decisória miúda.",
      "Uma estrutura organizacional mal desenhada, excessivamente verticalizada (com dezenas de níveis hierárquicos) gera inevitavelmente funestos gargalos na comunicação interna, intensifica os conflitos territoriais de poder e provoca atrasos crônicos na aprovação de processos. Em última análise, essa ineficiência estrutural (burocracia disfuncional) eleva drasticamente o custo de transação interno da empresa, corroendo suas margens de lucro e limitando severamente a sua agilidade competitiva perante o mercado.",
      "No rigoroso escopo de cobrança da banca CESGRANRIO, as questões de múltipla escolha costumam focar de maneira implacável na identificação prática dos elementos estruturais, exigindo que o candidato relacione conceitos como amplitude administrativa de controle (quantos subordinados um chefe supervisiona diretamente) e os modelos teóricos de departamentalização (geográfica, por clientes, por produtos) com situações corporativas hipotéticas narradas com minúcias.",
      "É de vital importância dominar as minúcias e as características distintivas da departamentalização por projetos (focada em resultados únicos e com fim determinado), da estrutura matricial (a única que quebra abertamente o sagrado princípio clássico da unidade de comando de Fayol) e da departamentalização funcional (ideal para estabilidade), relacionando-as perfeitamente com os trade-offs de eficiência (custo) e eficácia (entrega) exigidos em grandes corporações públicas."
    ],
    accordions: [
      {
        titulo: "Tipos Principais de Departamentalização (A Anatomia da Empresa)",
        conteudo: "<p>A departamentalização é o critério de agrupamento de atividades. A CESGRANRIO exige o domínio absoluto das vantagens e desvantagens de cada modelo:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Funcional (Por Funções):</strong> Agrupa por especialidades afins (ex: Departamento de Marketing, RH, Produção). Vantagem: Máxima economia de escala e especialização técnica. Desvantagem: Cria 'silos' isolados (pouca cooperação entre os departamentos).</li><li><strong>Por Produtos/Serviços:</strong> Agrupa pelas linhas de saída da empresa (ex: Divisão de Motores, Divisão de Pneus). Vantagem: Facilita a inovação e o foco no produto. Desvantagem: Duplicação de recursos (cada divisão precisa do seu próprio RH).</li><li><strong>Matricial:</strong> Sobrepõe duas estruturas (geralmente Funcional + Projetos). O funcionário responde ao chefe do departamento e ao chefe do projeto simultaneamente. Vantagem: Altíssima integração e adaptação a ambientes complexos. Desvantagem: Conflito crônico de poder (violação da Unidade de Comando).</li><li><strong>Geográfica (Territorial):</strong> Agrupa por regiões de atuação (Regional Nordeste, Regional Sul). Ideal para empresas com ampla dispersão física, permitindo respostas adaptadas aos costumes locais.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Estrutura",
        tituloFrente: "Amplitude de Controle",
        iconeFrente: "LuUsers",
        subtituloFrente: "Conceito Chave",
        tituloVerso: "Efeito na Hierarquia",
        conteudoVerso: "Número de subordinados que um chefe supervisiona. Amplitude <strong>Larga</strong> cria estruturas <em>Achatadas</em> (rápidas). Amplitude <strong>Estreita</strong> cria estruturas <em>Agudas</em> (muitos chefes, lentas). 📊"
      },
      {
        categoria: "Autoridade",
        tituloFrente: "Unidade de Comando",
        iconeFrente: "LuShield",
        subtituloFrente: "Princípio Clássico",
        tituloVerso: "Um Chefe Apenas",
        conteudoVerso: "Princípio de Fayol que dita que cada funcionário deve receber ordens de apenas um superior, evitando ordens conflitantes. <strong>A Matriz quebra isso!</strong> ⚡"
      },
      {
        categoria: "Processo",
        tituloFrente: "Centralização",
        iconeFrente: "LuTarget",
        subtituloFrente: "Poder de Decisão",
        tituloVerso: "Topo da Pirâmide",
        conteudoVerso: "Retenção da autoridade no topo. Traz <strong>consistência e padronização</strong>, mas afasta o tomador de decisão de onde o problema realmente ocorre. 🎯"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônicos de Estrutura (CESGRANRIO)",
      content: "<div class='p-5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg'><h4 class='font-bold text-teal-400 mb-3 flex items-center gap-2'>🧩 A Essência da Estrutura</h4><ul class='space-y-3'><li class='flex items-start gap-3'><span class='text-2xl'>🏗️</span><div><strong>Funcional = FOCO NA TÉCNICA:</strong> Todo mundo que faz a mesma coisa fica junto (Economia de escala).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>⚔️</span><div><strong>Matricial = A GUERRA DOS CHEFES:</strong> O funcionário tem 2 chefes. Ousadia pura contra Fayol (Quebra a Unidade de Comando).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🚀</span><div><strong>Descentralização = VELOCIDADE:</strong> A decisão desce para a base. Quem sofre o problema, resolve na hora.</div></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 2 - Estrutura e Organização", artista: "Petrobras Quest" }
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
        categoria: "Liderança",
        tituloFrente: "Teoria X e Y",
        iconeFrente: "LuUsers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "McGregor",
        conteudoVerso: "Teoria X: trabalhador preguiçoso e avesso à responsabilidade. Teoria Y: trabalhador criativo e proativo. ⚖️"
      },
      {
        categoria: "Liderança",
        tituloFrente: "Autocrático vs Democrático",
        iconeFrente: "LuSwords",
        subtituloFrente: "Memorização",
        tituloVerso: "Estilos Clássicos",
        conteudoVerso: "Autocrático: focado no líder. Democrático: focado no grupo. Liberal (Laissez-faire): focado no indivíduo. 👑"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Foco da Banca",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Liderança Situacional",
        conteudoVerso: "A banca adora cobrar que **não existe um estilo universal**. O líder deve adaptar-se à maturidade do liderado. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Fatores de Herzberg",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Para não confundir na prova:</p><ul class='list-disc pl-5 mt-2'><li><strong>Higiênicos (Ambiente):</strong> Salário, Chefe, Condições de Trabalho. (Evitam choro)</li><li><strong>Motivacionais (Trabalho):</strong> Desafio, Crescimento, Reconhecimento. (Trazem sorriso)</li></ul></div>"
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
      "A disciplina da Administração da Qualidade evoluiu historicamente de um controle técnico reativo e isolado, restrito apenas a inspetores de linha de montagem ao final do dia, para um modelo de gestão estratégica sistêmico, preventivo e absolutamente indispensável à sobrevivência corporativa. Ela integra hoje toda a complexa cadeia de valor da organização e posiciona a melhoria contínua e a plena satisfação inegociável das expectativas dos clientes no epicentro do modelo de negócios moderno.",
      "Na gigantesca malha logística e de produção da Petrobras, a garantia irrestrita de padrões de qualidade supremos em insumos de engenharia, maquinário pesado de prospecção e prestação de serviços não é um mero diferencial, mas o alicerce fundamental de segurança. Uma única peça fora da especificação técnica rigorosa não gera apenas desperdício monetário, mas pode comprometer o desempenho dos ativos de bilhões de dólares, ameaçar dezenas de vidas humanas e macular irremediavelmente a imagem da estatal.",
      "A grande revolução prática promovida pela Qualidade Total é a brusca mudança de paradigma da 'inspeção ex-post' (descobrir o defeito na triagem depois que o produto está pronto, gerando sucata) para a 'prevenção ex-ante' (projetar engenhosamente o sistema para que seja humanamente impossível produzir um erro). O enfoque preventivo assegura o envolvimento sistêmico de todas as esferas, rompendo os antiquados silos e unificando a base operacional com as diretrizes da alta direção.",
      "Essa abordagem avançada introduz conceitos de extrema robustez corporativa, como a metrificação do 'Custo da Qualidade', que explicita matematicamente a massiva vantagem econômica de investir preventivamente em treinamentos de alto nível e padronização absoluta. Isso pulveriza os vultosos prejuízos ocultos provenientes de refugo contínuo (descarte material), retrabalho exaustivo de equipes e passivos judiciais que assombram empresas de baixa maturidade processual.",
      "Um dos pilares conceituais mais importantes exigidos na teoria moderna é a perspectiva de que o ciclo da qualidade permeia intrinsecamente as relações internas da firma. Cada colaborador não atende apenas o mercado externo, mas serve obrigatoriamente ao seu 'cliente interno' — o colega do departamento seguinte na linha de produção. Seccionar o fluxo e garantir a máxima qualidade na transferência interna é a única forma de garantir a pureza do produto na ponta final.",
      "Os princípios globais de gestão, fortemente ancorados em famílias de normas internacionais consagradas como a renomada ISO 9001, funcionam como um arcabouço normativo que se integra diretamente à governança. Essa aderência rigorosa a processos auditáveis documentalmente, indicadores calibrados matematicamente e ações corretivas fornecem a base técnica e jurídica exigida para a manutenção de contratos bilionários no disputado setor de óleo e gás global.",
      "No entanto, o sucesso crônico desse modelo não se sustenta apenas por manuais operacionais preenchidos; ele exige irrevogavelmente a consolidação de uma vigorosa Cultura da Qualidade. Isso impõe à liderança o papel de patrocinadora implacável dessa transformação cultural, além do empoderamento real (empowerment) de todos os colaboradores do chão de fábrica para que ganhem a autoridade de interromper linhas de produção inteiras diante de qualquer inconformidade grave identificada.",
      "Quando o foco gerencial sai do mero controle de variabilidade e passa a mirar o processo de maneira horizontalizada, a gestão ganha a agilidade necessária para identificar rapidamente os elos mais frágeis e os gargalos paralisantes em sua cadeia. Isso possibilita à organização alocar grandes investimentos de melhoria nos exatos pontos (restrições) onde o retorno operacional e a proteção contra riscos trabalhistas serão potencializados ao grau máximo.",
      "Nas afiadas e exigentes avaliações aplicadas pela implacável Fundação CESGRANRIO, a recorrência em cobrar a diferenciação abissal entre as fases históricas da qualidade é uma tradição de ouro. O candidato deve dominar e não confundir as limitações da Era da Inspeção (separação de lotes ruins), do Controle Estatístico (uso de amostragem matemática), da Garantia da Qualidade (normas ISO) e da Gestão da Qualidade Total (TQM - estratégia liderada pela cúpula).",
      "O domínio soberano desses pilares conceituais capacita o estudante a responder com celeridade a um amplo espectro de questões, fugindo das clássicas armadilhas. A banca adora inserir alternativas onde a 'inspeção no final do processo' é tida como a forma mais moderna de qualidade, o que deve ser prontamente rechaçado pelo candidato bem treinado, que sabe que o modelo atual exige a antecipação preventiva na própria raiz do projeto do produto."
    ],
    accordions: [
      {
        titulo: "As 4 Eras da Qualidade (Evolução Histórica)",
        conteudo: "<p>A CESGRANRIO cobra constantemente a evolução das eras. Elas não desapareceram, apenas se acumularam:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>1. Inspeção (1920):</strong> Foco apenas no produto final. O inspetor olhava e separava o que estava bom do que era sucata. Não melhorava o processo. Altíssimo custo de desperdício.</li><li><strong>2. Controle Estatístico (1930):</strong> Foco no controle dos processos e não só no final. Início do uso de amostragens estatísticas para baratear o custo da inspeção. (Deming, Shewhart).</li><li><strong>3. Garantia da Qualidade (1950):</strong> Foco na prevenção de defeitos antes que ocorram. Envolve normas técnicas rigorosas e manuais padronizados para garantir confiabilidade (Nasce a base da ISO).</li><li><strong>4. Gestão da Qualidade Total - TQM (1980 em diante):</strong> Foco no Cliente e na Estratégia de Negócios global. A qualidade sai do chão de fábrica e vira cultura gerencial da alta diretoria até o operador, englobando todos os setores da empresa.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Conceito Chave",
        tituloFrente: "Cliente Interno",
        iconeFrente: "LuUsers",
        subtituloFrente: "Visão Sistêmica",
        tituloVerso: "A Próxima Etapa",
        conteudoVerso: "Qualquer pessoa ou departamento que recebe o trabalho finalizado pela etapa anterior. Garantir a qualidade no cliente interno é evitar que o defeito chegue ao consumidor final. 👥"
      },
      {
        categoria: "Evolução Histórica",
        tituloFrente: "Era da Inspeção",
        iconeFrente: "LuTarget",
        subtituloFrente: "A Origem (1920)",
        tituloVerso: "Separação Reativa",
        conteudoVerso: "Mero exame visual do produto acabado. Totalmente <strong>reativa</strong>. Não melhorava a forma de fabricar o produto, apenas descobria o defeito depois do dinheiro gasto. 🗑️"
      },
      {
        categoria: "Evolução Histórica",
        tituloFrente: "Qualidade Total (TQM)",
        iconeFrente: "LuLayers",
        subtituloFrente: "Estágio Avançado",
        tituloVerso: "Comprometimento Total",
        conteudoVerso: "A qualidade deixa de ser assunto de chão de fábrica e passa a ser <strong>estratégica corporativa</strong>, envolvendo liderança, RH, finanças e foco absoluto no cliente. 🌟"
      },
      {
        categoria: "Padronização",
        tituloFrente: "Normas ISO 9000",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Garantia da Qualidade",
        tituloVerso: "Certificação",
        conteudoVerso: "Conjunto de normas internacionais que fornecem uma estrutura auditável para garantir a repetibilidade, segurança e rastreabilidade nos processos globais. 📜"
      },
      {
        categoria: "Filosofia",
        tituloFrente: "Kaizen",
        iconeFrente: "LuTrendingUp",
        subtituloFrente: "Prática Japonesa",
        tituloVerso: "Melhoria Contínua",
        conteudoVerso: "Conceito de melhoria diária, incremental e constante, envolvendo 100% dos trabalhadores. 'Hoje melhor que ontem, amanhã melhor que hoje'. 📈"
      },
      {
        categoria: "Pegadinha de Prova",
        tituloFrente: "Foco CESGRANRIO",
        iconeFrente: "LuMessageSquare",
        subtituloFrente: "Memorização",
        tituloVerso: "Foco do TQM",
        conteudoVerso: "Na Gestão da Qualidade Total, a definição do que é 'qualidade' não é feita pelo engenheiro, mas sim ditada puramente pelas <strong>necessidades do cliente</strong>! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônicos da Qualidade (CESGRANRIO)",
      content: "<div class='p-5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg'><h4 class='font-bold text-blue-400 mb-3 flex items-center gap-2'>💎 Os 4 Pilares da Evolução</h4><ul class='space-y-3'><li class='flex items-start gap-3'><span class='text-2xl'>🔍</span><div><strong>Inspeção:</strong> O Fiscal chato no final da esteira. Só joga fora o que não presta. (Reativo).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🧮</span><div><strong>Estatístico:</strong> Ferramentas matemáticas para medir amostragem no meio do processo.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🛡️</span><div><strong>Garantia:</strong> Evitar o erro antes de começar. Uso de manuais, Normas e ISO. (Preventivo).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>👑</span><div><strong>Total (TQM):</strong> Qualidade vira religião da empresa. Foco 100% no cliente externo.</div></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 5 - Administração da Qualidade", artista: "Petrobras Quest" }
  },
  6: {
    introducaoCEDEA: [
      "As ferramentas de gestão da qualidade, consagradas tecnicamente como as 'Sete Ferramentas Básicas de Ishikawa', constituem a principal e mais contundente caixa de instrumentos analíticos à disposição do gestor contemporâneo. Elas fornecem metodologias gráficas e rigorosas para a identificação precoce de desvios, o diagnóstico exato das causas-raiz e a estruturação lógica de planos de solução de altíssimo impacto, essenciais para o Controle de Qualidade Total.",
      "No intrincado ecossistema de contratações, logística e engenharia da Petrobras, a aplicação correta desse arsenal visual e estatístico evita paralisações críticas e estanca bilionárias perdas causadas por falhas de projeto. Seja no recebimento de materiais ou na auditoria de conformidade, substituir o 'eu acho' pelo uso rigoroso de ferramentas analíticas garante decisões alicerçadas puramente em fatos coletados com precisão matemática na linha de frente (gemba).",
      "O Diagrama de Pareto, mundialmente conhecido pela regra empírica 80/20, é o instrumento supremo para a priorização de investimentos e tempo do gestor. Ele demonstra graficamente e de forma irrefutável que cerca de 20% dos defeitos mapeados (as causas vitais) são os responsáveis pela monstruosa parcela de 80% de todas as falhas ou refugos. Dessa forma, a gestão é direcionada implacavelmente a atacar primeiro o que gera maior prejuízo global à empresa.",
      "O majestoso Diagrama de Ishikawa, também apelidado de diagrama espinha de peixe ou causa e efeito, assume a liderança na fase de diagnóstico exaustivo. Ele disciplina a equipe técnica a dissecar um defeito específico separando suas possíveis causas nas célebres ramificações da matriz dos 6Ms: Mão de obra, Máquina, Material, Método, Medida e Meio ambiente. Nenhuma hipótese geradora da não conformidade escapa dessa investigação profunda.",
      "Para que o rigor técnico do diagnóstico se converta em ação prática e incontestável, aciona-se o formidável Plano de Ação 5W2H. Este checklist gerencial funciona como uma matriz composta por sete indagações capitais em inglês, eliminando qualquer sombra de dúvida executiva ao determinar: What (o que fará), Why (por que), Where (onde), When (quando), Who (quem fará), How (como fará) e How much (quanto custará ao erário) a implementação do remédio.",
      "Na frente de estabilidade sistêmica e acompanhamento dinâmico da variabilidade matemática da produção, as Cartas de Controle atuam como o monitoramento em tempo real. Elas vigiam amostras contínuas através de gráficos que alertam sonora e visualmente os operadores sempre que uma medida foge perigosamente aos limites superior e inferior (LSC e LIC), identificando quando a anomalia deixa de ser uma causa aleatória para tornar-se uma causa especial e alarmante.",
      "Toda essa gama de ferramentas robustas atua perfeitamente subordinada à lógica soberana do lendário Ciclo PDCA (Plan, Do, Check, Act). Este não é apenas um método sequencial, mas uma verdadeira religião administrativa no Japão, formatada para assegurar que cada erro identificado não se perca no vazio corporativo, sendo obrigatoriamente analisado, mitigado e, crucialmente, convertido em um novo padrão de operação imune a retrocessos futuros.",
      "Ao ignorar sistematicamente o emprego dessas ferramentas, gerentes inábeis tendem a apagar incêndios diariamente sem nunca extinguir a brasa na origem, gastando milhões de reais de orçamentos setoriais para remediar sintomas superficiais e permitindo que as anomalias sistêmicas ressurjam nas esteiras produtivas, arruinando qualquer meta prévia de excelência operacional.",
      "As bancas examinadoras mais rigorosas do país, capitaneadas pela CESGRANRIO em concursos para o núcleo petroleiro, testam sem pudores a capacidade do candidato em distinguir a utilidade situacional de cada ferramenta técnica. Afirmar nas provas que o Histograma é usado para priorizar ações em vez de analisar a frequência contínua de dados, ou que o Pareto investiga causas em vez de priorizar problemas, é um atestado imediato de eliminação do certame.",
      "O domínio soberano e reflexivo das Sete Ferramentas é o trunfo definitivo para resolver os extensos enunciados discursivos e questões em cadeia. O candidato blindado entende o encadeamento das ações: a tempestade de ideias (Brainstorming) levanta suspeitas; o Ishikawa as classifica de modo estruturado; o Pareto elege a mais letal; e o 5W2H planeja cirurgicamente a ação fatal contra o problema detectado, fechando a prova com maestria."
    ],
    accordions: [
      {
        titulo: "As 7 Ferramentas Básicas da Qualidade",
        conteudo: "<p>Para concursos públicos, conhecer a <strong>função exata</strong> de cada uma é o principal segredo:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Diagrama de Pareto (Gráfico 80/20):</strong> Separar os poucos vitais dos muitos triviais. Serve estritamente para PRIORIZAR os problemas mais graves.</li><li><strong>Diagrama de Ishikawa (Espinha de Peixe / Causa e Efeito):</strong> Analisar e categorizar as CAUSAS de um problema conhecido (Efeito). Organiza o brainstorming na matriz 6M.</li><li><strong>Cartas de Controle (Gráficos de Controle):</strong> Monitorar a variação e a estabilidade de um processo ao longo do tempo (Possui limites LSC e LIC).</li><li><strong>Histograma (Gráfico de Frequência):</strong> Gráfico de barras que mostra a frequência e a distribuição da variação de um grupo de dados contínuos.</li><li><strong>Fluxograma:</strong> Representação visual esquemática de todas as etapas de um processo ou rotina.</li><li><strong>Folha de Verificação (Check-list):</strong> Formulário padronizado usado no chão de fábrica para facilitar a COLETA estruturada de dados numéricos.</li><li><strong>Diagrama de Dispersão:</strong> Gráfico cartesiano usado para verificar se existe uma CORRELAÇÃO entre duas variáveis (Ex: Relação entre temperatura da caldeira e defeito na peça).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Ferramenta",
        tituloFrente: "Diagrama de Pareto",
        iconeFrente: "LuBarChart3",
        subtituloFrente: "Ferramenta Básica",
        tituloVerso: "Foco na Prioridade",
        conteudoVerso: "Identifica a frequência das ocorrências para que a empresa possa priorizar atacar os 20% dos problemas que causam 80% do estrago financeiro. 📊"
      },
      {
        categoria: "Ferramenta",
        tituloFrente: "Diagrama de Ishikawa",
        iconeFrente: "LuActivity",
        subtituloFrente: "Espinha de Peixe",
        tituloVerso: "Mapeamento de Causas",
        conteudoVerso: "Categoriza as raízes de um defeito utilizando os <strong>6Ms</strong>: Mão de Obra, Método, Máquina, Material, Meio Ambiente e Medida. Não prioriza, apenas investiga! 🐟"
      },
      {
        categoria: "Execução",
        tituloFrente: "Ferramenta 5W2H",
        iconeFrente: "LuCheckSquare",
        subtituloFrente: "Plano de Ação",
        tituloVerso: "Diretrizes Claras",
        conteudoVerso: "Matriz executiva que evita incertezas: What (O que), Who (Quem), Where (Onde), When (Quando), Why (Por que), How (Como) e How much (Quanto custa). 📝"
      },
      {
        categoria: "Estatística",
        tituloFrente: "Gráfico de Dispersão",
        iconeFrente: "LuTarget",
        subtituloFrente: "Ferramenta Básica",
        tituloVerso: "Correlação de Variáveis",
        conteudoVerso: "Exibe se há relação entre duas coisas. Ex: 'Se aumentar a velocidade da máquina, o número de refugos aumenta junto?' 🎯"
      },
      {
        categoria: "Controle",
        tituloFrente: "Cartas de Controle",
        iconeFrente: "LuTrendingUp",
        subtituloFrente: "Monitoramento",
        tituloVerso: "Variação Aceitável",
        conteudoVerso: "Mede o processo de forma contínua no tempo. Se um ponto foge do LSC (Limite Superior de Controle), a máquina desregulou (causa especial). 📉"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuAlertTriangle",
        subtituloFrente: "Memorização",
        tituloVerso: "Cuidado com Pareto",
        conteudoVerso: "Na CESGRANRIO, lembre-se: O diagrama de <strong>Pareto NÃO resolve</strong> problemas; ele apenas aponta <strong>qual problema deve ser resolvido primeiro</strong>. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico Mestre das Ferramentas",
      content: "<div class='p-5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg'><h4 class='font-bold text-green-400 mb-3 flex items-center gap-2'>🛠️ A Caixa de Ferramentas</h4><ul class='space-y-3'><li class='flex items-start gap-3'><span class='text-2xl'>👑</span><div><strong>Pareto = A COROA:</strong> Define quem manda, qual problema é o 'Rei' dos prejuízos (Priorização).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🕵️</span><div><strong>Ishikawa = O DETETIVE:</strong> Investiga os suspeitos usando os 6Ms. (Causas).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>⛓️</span><div><strong>Dispersão = A ALGEMA:</strong> Mostra se duas variáveis estão presas/ligadas uma à outra (Correlação).</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🚦</span><div><strong>Carta de Controle = O SEMÁFORO:</strong> Avisa em tempo real quando passar do limite (Monitoramento de anomalias).</div></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 6 - Ferramentas da Qualidade", artista: "Petrobras Quest" }
  },
  7: {
    introducaoCEDEA: [
      "A moderna Gestão por Processos de Negócio, globalmente consagrada pelo acrônimo BPM (Business Process Management), atua como a revolução definitiva dentro da teoria organizacional, reorganizando todo o trabalho corporativo, o foco do corpo gerencial e os fluxos de valor a partir de uma ótica estritamente transversal e horizontal, desenhada ponta a ponta para agregar valor máximo ao usuário externo.",
      "Em um conglomerado estatal compartimentado, engessado e multidisciplinar como a Petrobras, a implantação vigorosa da visão por processos dinamita os perigosos e antiquados silos (feudos) departamentais clássicos. Ela integra, com precisão matemática, as engrenagens das diretorias de logística naval, engenharia petroleira off-shore, finanças públicas e o onipresente setor de compliance, forçando-os a trabalhar em um único fluxo contínuo e colaborativo.",
      "O exaustivo mapeamento formal dos processos AS-IS (como está) atua como um exame de raio-x implacável da realidade operacional. Ao documentar a verdade crua do chão de fábrica e dos escritórios corporativos, a gestão desmascara as burocracias inúteis, os carimbos redundantes e os gargalos logísticos crônicos que encarecem absurdamente a operação da estatal federal, expondo os desperdícios que drenam os cofres públicos e prejudicam prazos licitatórios vitais.",
      "Para contra-atacar a ineficiência flagrante encontrada, entra em cena o sofisticado desenho TO-BE (como será), o projeto meticuloso do estado futuro da corporação. Baseado nas melhores práticas de mercado (benchmarking) e na tecnologia emergente, esse novo desenho virtual elimina sumariamente as aprovações desnecessárias (red tape) e cria atalhos digitais altamente seguros, culminando em uma arquitetura de rotinas fluida, livre de gargalos e orientada puramente à eficácia contratual.",
      "Toda essa reengenharia organizacional só pode se comunicar de forma efetiva se falar um mesmo idioma gráfico. Para isso, adota-se soberanamente a notação internacional BPMN (Business Process Model and Notation). Utilizando seus rigorosos símbolos padronizados de eventos, atividades (tarefas), gateways (pontos de decisão) e piscinas/raias (responsabilidades), as áreas técnicas do negócio (business) conseguem transferir suas complexas demandas para a área de Tecnologia (TI) sem o risco de erros de interpretação sistêmica.",
      "A classificação canônica dos processos corporativos é tripartida e essencial: os Processos Primários (ou Finalísticos) são os que tocam diretamente o cliente e geram receita e valor na ponta; os Processos de Suporte (Apoio) agem nos bastidores para viabilizar os primários (ex: contratação de RH, suporte de TI, aquisição de suprimentos rotineiros); e os Processos Gerenciais, focados inexoravelmente na estratégia, métricas, auditoria e diretrizes de cúpula.",
      "Uma das disrupções mais radicais da filosofia BPM no setor público é a imposição da revolucionária e empoderada figura do Dono de Processo (Process Owner). Subvertendo a hierarquia rígida, este líder é responsabilizado legalmente pelo sucesso da entrega do fluxo de valor de ponta a ponta, recebendo autoridade para cobrar e coordenar gerentes funcionais (chefes de departamento) que atuem nas etapas intermediárias do seu processo, garantindo o resultado final sem desculpas isoladas.",
      "Além da governança, a integração mandatória do BPM com potentes ferramentas digitais (BPMS - Sistemas de Gestão de Suítes de Processos) transforma desenhos de papel em painéis virtuais automáticos (workflows), bloqueando falhas humanas, roteirizando documentos eletrônicos complexos e alertando em tempo real (tecnologia BAM) caso prazos normativos legais estejam perto do colapso.",
      "As questões formuladas pela implacável banca CESGRANRIO em provas para cargos técnicos superiores exigem domínio visceral dessa categorização. A confusão comum entre processos primários (ex: venda de combustíveis no atacado) e processos de suporte crítico (ex: manutenção de plataformas) custa a eliminação do candidato desavisado que não percebe que apenas o primário gera receita externa direta.",
      "O domínio transversal e estratégico dos alicerces vitais da gestão por processos posiciona o aluno da elite num degrau superior de raciocínio. Nas avaliações estatais, saber interpretar que a estrutura funcional (vertical, focada na especialidade do chefe) é a grande vilã histórica da estrutura orientada a processos (horizontal, focada na necessidade do cliente) é a chave dourada para desvendar qualquer caso prático cobrado pela banca."
    ],
    accordions: [
      {
        titulo: "Tipologias Fundamentais de Processos (Hierarquia e Valor)",
        conteudo: "<p>A CESGRANRIO exige a exata identificação do papel de um processo dentro da cadeia de valor organizacional:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Processos Primários (Essenciais/Core):</strong> Atividades-fim. Interagem diretamente com o mercado. Entregam o valor tangível pelo qual o cliente (ou cidadão) paga. Ex: Refino de petróleo, Venda de passagens, Atendimento médico de urgência.</li><li><strong>Processos de Suporte (Apoio):</strong> Atividades-meio. Não geram valor perceptível direto ao cliente final, mas são absolutamente vitais para que os processos primários existam. Ex: Folha de pagamento, Suporte de TI, Licitações, Limpeza, Contabilidade.</li><li><strong>Processos Gerenciais (Controle):</strong> Atividades estratégicas. Medem, monitoram e direcionam a empresa. Não tocam no produto físico, lidam com informações e metas. Ex: Planejamento estratégico orçamentário, Auditoria de compliance, Gestão de riscos corporativos.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Conceitos",
        tituloFrente: "Mapeamento AS-IS",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Análise Real",
        tituloVerso: "Retrato Atual",
        conteudoVerso: "Fotografia honesta e detalhada de 'Como o Processo Está Hoje', destacando os gargalos, ineficiências, retrabalhos e papeladas desnecessárias que ocorrem na realidade. 📸"
      },
      {
        categoria: "Conceitos",
        tituloFrente: "Mapeamento TO-BE",
        iconeFrente: "LuTarget",
        subtituloFrente: "Desenho Futuro",
        tituloVerso: "Estado Desejado",
        conteudoVerso: "O projeto idealizado de 'Como o Processo Será', livre dos defeitos do AS-IS. É o foco da reestruturação tecnológica para trazer agilidade máxima. ✨"
      },
      {
        categoria: "Notação",
        tituloFrente: "Padrão BPMN",
        iconeFrente: "LuActivity",
        subtituloFrente: "Linguagem Gráfica",
        tituloVerso: "Comunicação Universal",
        conteudoVerso: "Business Process Model and Notation. Usa símbolos padronizados mundialmente (círculos para eventos, retângulos para tarefas, losangos para decisões) garantindo que a TI e os Gestores falem a mesma língua. 🌐"
      },
      {
        categoria: "Estrutura",
        tituloFrente: "Process Owner",
        iconeFrente: "LuUsers",
        subtituloFrente: "Dono do Processo",
        tituloVerso: "Responsável Ponta a Ponta",
        conteudoVerso: "Líder que acompanha o fluxo de ponta a ponta, com autoridade para cobrar e otimizar os resultados globais que cruzam vários departamentos blindados. 👤"
      },
      {
        categoria: "Tipologia",
        tituloFrente: "Processo Finalístico",
        iconeFrente: "LuLayers",
        subtituloFrente: "Processo Primário",
        tituloVerso: "Foco no Cliente",
        conteudoVerso: "São as atividades que constituem a razão de ser da empresa. Sem elas, a organização não tem produto para entregar ao mercado consumidor ou ao cidadão. 🚀"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuMessageSquare",
        subtituloFrente: "Memorização",
        tituloVerso: "Suporte não é Lixo",
        conteudoVerso: "Os <strong>processos de suporte não agregam valor direto</strong> ao cliente final, mas cuidado: <strong>Eles são essenciais e não podem ser totalmente eliminados</strong> da organização! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônicos de Gestão de Processos",
      content: "<div class='p-5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg'><h4 class='font-bold text-fuchsia-400 mb-3 flex items-center gap-2'>🌊 O Fluxo Horizontal</h4><ul class='space-y-3'><li class='flex items-start gap-3'><span class='text-2xl'>🏗️</span><div><strong>AS-IS = A Ferida Aberta:</strong> Como a empresa trabalha hoje, cheia de falhas e problemas.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🚀</span><div><strong>TO-BE = A Promessa:</strong> O processo perfeito e automatizado do futuro.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🎯</span><div><strong>Primário x Apoio:</strong> Fazer pão é o processo primário da padaria; consertar o forno quebrado (manutenção) é o processo de apoio. Sem o segundo, o primeiro para!</div></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 7 - Gestão por Processos", artista: "Petrobras Quest" }
  },
  8: {
    introducaoCEDEA: [
      "O Ciclo de Vida de Processos de Negócio é o framework teórico e metodológico definitivo que descreve de forma estruturada as etapas evolutivas contínuas pelas quais um processo corporativo obrigatoriamente passa, desde sua concepção embrionária e planejamento estratégico até a sua eventual otimização revolucionária, garantindo a adaptação orgânica da empresa às flutuações e exigências dinâmicas do mercado competitivo global.",
      "No contexto de suprimentos e logística de gigantescas corporações como a Petrobras, gerenciar com maestria e precisão matemática o ciclo de vida de imensos contratos de infraestrutura e da robusta cadeia de fornecedores assegura que as operações monumentais offshore acompanhem pari passu as inovações tecnológicas globais. Isso blinda a companhia de ficar refém e estagnada em fluxos operacionais arcaicos, burocráticos e altamente ineficientes.",
      "Segundo as diretrizes internacionais incontestáveis, consolidadas no aclamado BPM CBOK (Corpo de Conhecimento em Gestão de Processos), o ciclo é tipicamente desmembrado em seis fases sequenciais, retroalimentadas e indissociáveis: Planejamento (alinhamento estratégico inicial), Modelagem (desenho do processo), Simulação (teste virtual estressante), Execução (implantação sistêmica real), Monitoramento (coleta de métricas vivas) e Otimização (melhoria ou inovação radical).",
      "A fase de Modelagem (design) é de criticidade extrema e não permite amadorismo. Nela, as equipes de analistas especialistas não apenas esboçam um fluxograma superficial de tarefas, mas documentam pormenorizadamente como o trabalho deve ser executado, definindo papéis claros, sistemas de apoio, regras de negócio engessadas e rígidos Acordos de Nível de Serviço (SLAs) para pavimentar a execução sem aberturas para desvios interpretativos.",
      "Preparando o terreno para o mundo real, a crucial fase de Simulação testa o modelo matematicamente e logicamente em um ambiente de homologação seguro (sandbox). Essa profilaxia metodológica estressa o modelo virtualmente antes da implantação real em larga escala, evitando que erros estruturais primários sejam propagados pela cadeia produtiva e gerem prejuízos em massa e irreparáveis danos à imagem pública do processo modernizado.",
      "Após o 'Go-Live' (fase de Execução), quase sempre orquestrado de forma automatizada por potentes sistemas de gestão denominados BPMS, entra no palco a etapa vital de Monitoramento. Nesse estágio, complexos painéis de bordo (dashboards) em tempo real, alimentados por tecnologias como o BAM (Business Activity Monitoring), disparam sonoros alertas automáticos de anomalias e quebras de conformidade muito antes de o colapso afetar o cliente final.",
      "A etapa final de Otimização fecha graciosamente o ciclo sistêmico, realimentando a fase inicial de planejamento. Essa etapa analítica pode resultar de forma pragmática em dois caminhos metodológicos distintos: a melhoria contínua (incremental, suave, cautelosa, baseada no Kaizen japonês) ou a radical reengenharia de processos (rompimento e destruição criativa do fluxo atual, redesenhando uma folha em branco em busca de saltos exponenciais de eficiência).",
      "É vital e eliminatório para o profissional moderno e para o candidato de ponta compreender academicamente e pragmaticamente que a Reengenharia implica invariavelmente em começar do absoluto zero (blank sheet of paper). Esse método impiedoso renega e descarta as velhas práticas e infraestruturas corporativas vigentes, exigindo robusto patrocínio da presidência e tolerância zero a desculpas para a ineficiência instalada historicamente na companhia.",
      "A banca organizadora CESGRANRIO tem o hábito irrefreável de focar suas baterias de questões avançadas exatamente na diferença abissal, conceitual e prática, entre os pressupostos suaves, orgânicos e participativos da melhoria contínua e os pressupostos dolorosos, impositivos (top-down) e revolucionários da reengenharia, além de exigir o pleno encadeamento lógico de todas as fases teóricas do framework CBOK.",
      "O domínio vertical e soberano das seis fases orgânicas do ciclo de vida, aliado à correta diferenciação dos métodos de intervenção final (kaizen x reengenharia), capacita amplamente o candidato a gabaritar assertivamente questões complexas de engenharia organizacional, assegurando uma vantajosa posição analítica capaz de desconstruir enunciados gigantescos com facilidade desconcertante durante o extenuante certame público."
    ],
    accordions: [
      {
        titulo: "Reengenharia vs Melhoria Contínua (Kaizen)",
        conteudo: "<p>Diferenças fundamentais e exatas cobradas nas provas da CESGRANRIO:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Kaizen (Melhoria Contínua):</strong> Mudança incremental, suave e contínua. Foco no processo existente (arrumar a casa). Requer baixo investimento financeiro e alta participação de todos os colaboradores do chão de fábrica (bottom-up).</li><li><strong>Reengenharia de Processos:</strong> Mudança radical, dramática e disruptiva. Começa do absoluto zero (folha em branco - blank sheet of paper). Rompe totalmente com as práticas atuais. Requer altíssimo investimento em tecnologia, muda estruturas organizacionais inteiras e é sempre imposta pela alta cúpula da diretoria (top-down).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Ciclo de Vida",
        tituloFrente: "Planejamento BPM",
        iconeFrente: "LuTarget",
        subtituloFrente: "Fase Estratégica",
        tituloVerso: "Alinhamento com Estratégia",
        conteudoVerso: "Primeira fase do ciclo. Consiste em entender os objetivos estratégicos da organização e definir quais processos de negócio serão foco das iniciativas de gestão. 🎯"
      },
      {
        categoria: "Ciclo de Vida",
        tituloFrente: "Modelagem e Desenho",
        iconeFrente: "LuPenTool",
        subtituloFrente: "Fase Analítica",
        tituloVerso: "Construção do TO-BE",
        conteudoVerso: "Ato de desenhar o novo processo documentando o fluxo de tarefas, as regras de negócio engessadas e a atribuição exata de cada responsável na cadeia. 📐"
      },
      {
        categoria: "Execução",
        tituloFrente: "Simulação",
        iconeFrente: "LuActivity",
        subtituloFrente: "Fase de Teste",
        tituloVerso: "Estresse do Modelo",
        conteudoVerso: "Teste virtual do desenho criado antes do go-live para detectar gargalos teóricos e falhas lógicas que custariam fortunas se implementados no mundo real. 🔍"
      },
      {
        categoria: "Governança",
        tituloFrente: "Monitoramento (BAM)",
        iconeFrente: "LuBarChart3",
        subtituloFrente: "Fase de Controle",
        tituloVerso: "Métricas em Tempo Real",
        conteudoVerso: "Acompanhamento implacável dos indicadores de desempenho do processo rodando no dia a dia. Identifica desvios de rota rapidamente. 📊"
      },
      {
        categoria: "Melhoria",
        tituloFrente: "Otimização de Processos",
        iconeFrente: "LuTrendingUp",
        subtituloFrente: "Fase Final",
        tituloVerso: "Evolução Contínua",
        conteudoVerso: "Última etapa onde o ciclo se retroalimenta. A partir dos dados do monitoramento, aplicam-se melhorias ou reengenharias sistêmicas. 🔄"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha Clássica",
        iconeFrente: "LuAlertTriangle",
        subtituloFrente: "Memorização",
        tituloVerso: "A Falsa Reengenharia",
        conteudoVerso: "Melhorar um fluxo que já existe em 30% <strong>NÃO É</strong> reengenharia! A verdadeira reengenharia destrói o que existe e cria um salto drástico de mais de 70%! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônicos do Redesenho Organizacional",
      content: "<div class='p-5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg'><h4 class='font-bold text-cyan-400 mb-3 flex items-center gap-2'>⚙️ Gatilhos Mentais das Duas Forças</h4><ul class='space-y-3'><li class='flex items-start gap-3'><span class='text-2xl'>🌱</span><div><strong>Kaizen (Melhoria):</strong> Passo Formiga, Constante. Do operário pro chefe. Mexe no que já tá pronto para ficar um pouquinho melhor hoje.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>💣</span><div><strong>Reengenharia:</strong> Bomba Atômica, Folha em Branco. Do Presidente pro operário. Joga o passado no lixo e reinventa tudo do zero absoluto com tecnologia cara!</div></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 8 - Ciclo de Vida dos Processos", artista: "Petrobras Quest" }
  },
  9: {
    introducaoCEDEA: [
      "O atendimento corporativo ao cliente deixou irreversivelmente de ser considerado uma mera e passiva área de retaguarda (back-office) focada em apagar incêndios para se consagrar estrategicamente como o diferencial competitivo mais visceral, agressivo e rentável dentro de uma organização de elite. Hoje, a sobrevivência e a reputação dependem do foco absoluto na gestão preditiva da 'Experiência do Consumidor' (Customer Experience - CX) ao longo de toda a sua jornada.",
      "Na imensa e complexa cadeia de logística e suprimentos da engrenagem da Petrobras, a excelência no serviço prestado internamente é pilar inegociável. O atendimento fornecido aos exigentes clientes internos (como engenheiros de manutenção operando em plataformas off-shore isoladas e sob extremo risco) deve ser absurdamente ágil, resolutivo, seguro e totalmente livre de burocracias cegas que possam gerar interrupções na exploração de óleo e gás do país.",
      "Para projetar soluções com a excelência exigida pela moderna administração, é obrigatório dominar teoricamente que Serviços possuem quatro características acadêmicas e operacionais únicas que os diferenciam substancialmente de produtos físicos: a Intangibilidade (não podem ser estocados ou tocados), a Inseparabilidade (produção simultânea ao consumo), a Perecibilidade (o tempo ocioso é perda irreparável) e a Variabilidade (cada entrega humana é singular).",
      "No âmago dessa tensa interação prestador-cliente, consolida-se o lendário conceito dos 'Momentos da Verdade', tese acadêmica popularizada mundialmente pelo executivo Jan Carlzon. Esse conceito descreve o instante exato e dramático em que o cliente entra em contato visual, físico ou telefônico com qualquer aspecto da empresa e, em milissegundos, solidifica sua percepção definitiva sobre o valor da marca que está lhe servindo naquele exato momento.",
      "A tecnologia de ponta apoia ferozmente essa relação mediante os mega Sistemas de CRM (Customer Relationship Management). Ao centralizar, mastigar e modelar analiticamente o gigantesco volume de dados (Big Data) do comportamento e das dores dos clientes, a empresa abandona as planilhas cegas e passa a antecipar cirurgicamente, via algoritmos, as futuras demandas do consumidor com uma intimidade corporativa até então considerada utópica na gestão pública.",
      "Contudo, mesmo no cenário perfeito e orquestrado, falhas operacionais e lapsos humanos inevitavelmente ocorrerão. A grande mágica técnica reside na tática metódica da 'Recuperação de Serviços' (Service Recovery). Trata-se da habilidade organizacional estruturada e rigorosamente treinada de reverter um cliente enfurecido pós-falha grave em um fã incondicional (Paradoxo da Recuperação), exigindo pedido de desculpas sincero, velocidade extrema de compensação e zero burocracia para solucionar a dor causada.",
      "Toda essa robustez só ganha sustentação por meio de uma cultura cravada na centralidade do cliente (Customer Centricity). Sob esse prisma inovador e maduro, as decisões de diretoria, cortes de custos e novos editais logísticos são desenhados assumindo implacavelmente a perspectiva do consumidor final, forçando os gerentes tradicionais a desapegarem de visões internas confortáveis e a sentirem as mesmas dores enfrentadas na ponta da cadeia pelos clientes.",
      "Para a linha de frente humana, a empatia genuína (saber se colocar nos sapatos do usuário desesperado) e a sofisticada capacidade de escuta ativa (ouvir para compreender e solucionar, e não apenas para rebater defensivamente) despontam como as soft skills inegociáveis. São as competências mais raras, valorizadas e complexas de serem treinadas em equipes de suporte a grandes contratos de engenharia governamentais.",
      "O escrutínio e o radar das avaliações pesadas da CESGRANRIO testam sistematicamente o candidato acerca das quatro características essenciais dos serviços (sempre cobrando a Intangibilidade e a Inseparabilidade com ênfase máxima). Em paralelo, exigem o domínio absoluto da escala SERVQUAL, que mede as cinco dimensões da qualidade percebida mundialmente: Tangibilidade, Confiabilidade, Receptividade (Resposta), Segurança (Assurance) e Empatia plena.",
      "Saber diferenciar, tanto filosófica quanto operacionalmente, as grandes dificuldades de padronização de um serviço invisível comparado à fabricação de um produto físico de linha de montagem, garante ao candidato blindado a total capacidade de destrinchar narrativas e casos complexos nas provas que cobram posicionamento estratégico e comportamento gerencial em situações de atendimento de crise em estatais federais."
    ],
    accordions: [
      {
        titulo: "As 5 Dimensões da Qualidade em Serviços (Modelo SERVQUAL)",
        conteudo: "<p>Dimensões exatas avaliadas mentalmente pelo cliente durante a prestação do serviço:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Tangibilidade (Tangibles):</strong> A aparência física das instalações da empresa, limpeza, uniformes dos funcionários e estética dos equipamentos usados na prestação.</li><li><strong>Confiabilidade (Reliability):</strong> A capacidade técnica de prestar o serviço prometido e contratado de forma precisa, sem erros e no prazo certo. (É a dimensão mais importante para o cliente).</li><li><strong>Capacidade de Resposta/Receptividade (Responsiveness):</strong> A boa vontade real, velocidade e presteza dos funcionários em querer ajudar o cliente e tirar dúvidas rápido.</li><li><strong>Segurança (Assurance):</strong> O conhecimento sólido demonstrado pelos funcionários que inspira total credibilidade, respeito e confiança durante o atendimento.</li><li><strong>Empatia (Empathy):</strong> O grau de atenção individualizada, cuidadosa, acolhedora e humana que a empresa e os funcionários conseguem transferir para os clientes, tratando cada caso como único.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Teoria de Serviços",
        tituloFrente: "Intangibilidade",
        iconeFrente: "LuWind",
        subtituloFrente: "Características",
        tituloVerso: "O Vazio Material",
        conteudoVerso: "A impossibilidade de tocar, sentir, provar, ouvir ou cheirar um serviço antes que ele seja efetivamente comprado e experienciado pelo consumidor. 🌬️"
      },
      {
        categoria: "Teoria de Serviços",
        tituloFrente: "Inseparabilidade",
        iconeFrente: "LuGitMerge",
        subtituloFrente: "Características",
        tituloVerso: "Produção = Consumo",
        conteudoVerso: "A característica que define que um serviço é gerado (produzido) no exato e mesmo instante de tempo em que está sendo consumido (Ex: um corte de cabelo). ✂️"
      },
      {
        categoria: "Teoria de Serviços",
        tituloFrente: "Perecibilidade",
        iconeFrente: "LuHourglass",
        subtituloFrente: "Características",
        tituloVerso: "Impossível Estocar",
        conteudoVerso: "A condição irrefutável de que serviços <strong>NÃO podem ser armazenados</strong>, devolvidos ou revendidos no futuro. Um assento vazio num voo ou na sala de cinema é receita perdida para sempre! ⏳"
      },
      {
        categoria: "Gestão",
        tituloFrente: "Momento da Verdade",
        iconeFrente: "LuEye",
        subtituloFrente: "Jan Carlzon",
        tituloVerso: "Fração de Segundo",
        conteudoVerso: "Qualquer instante em que o cliente faz contato com a organização, por mais efêmero que seja, e obtém uma impressão mental cristalizada (boa ou ruim) sobre a qualidade do serviço. 👁️"
      },
      {
        categoria: "Fidelização",
        tituloFrente: "CRM",
        iconeFrente: "LuHeartHandshake",
        subtituloFrente: "Sistemas Inteligentes",
        tituloVerso: "Gestão de Relacionamento",
        conteudoVerso: "Customer Relationship Management. Uma estratégia corporativa suportada por software para gerir, analisar e prever, com uso de dados, todas as interações e retenção dos clientes. 🤝"
      },
      {
        categoria: "Pegadinha de Prova",
        tituloFrente: "Foco CESGRANRIO",
        iconeFrente: "LuMessageSquare",
        subtituloFrente: "Dimensões da Qualidade",
        tituloVerso: "Confiabilidade é o Rei",
        conteudoVerso: "Das 5 dimensões do SERVQUAL, lembre-se: a <strong>CONFIABILIDADE</strong> é, historicamente e academicamente, apontada pelas provas como a mais importante e exigida na visão do cliente. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico das Características dos Serviços (I.I.P.V)",
      content: "<div class='p-5 bg-slate-900 border border-slate-700 text-white rounded-xl shadow-lg'><h4 class='font-bold text-yellow-400 mb-3 flex items-center gap-2'>🎩 O Truque de Mágica dos Serviços (IIPV)</h4><ul class='space-y-3'><li class='flex items-start gap-3'><span class='text-2xl'>👻</span><div><strong>I - Intangibilidade:</strong> É um fantasma. Não posso colocar o serviço do advogado numa sacola e levar para casa antes de comprar.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>👯</span><div><strong>I - Inseparabilidade:</strong> Gêmeos siameses. Quem presta e quem recebe têm que estar conectados no mesmo momento do tempo.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🍅</span><div><strong>P - Perecibilidade:</strong> É igual tomate fora da geladeira. Estraga. O tempo ocioso do dentista não volta amanhã. Não dá pra colocar no armazém.</div></li><li class='flex items-start gap-3'><span class='text-2xl'>🎭</span><div><strong>V - Variabilidade:</strong> Cada dia é um show diferente. Se o garçom brigou com a esposa, o mesmo serviço prestado ontem será péssimo hoje!</div></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 9 - Atendimento ao Cliente e Serviços", artista: "Petrobras Quest" }
  },
  10: {
    introducaoCEDEA: [
      "A Ouvidoria Institucional e a arquitetura de Feedback contínuo despontam como instrumentos de altíssima criticidade para a escuta corporativa madura. Eles são, indiscutivelmente, ferramentas essenciais para assegurar a blindagem da transparência governamental, promover a melhoria contínua dos pesados processos internos e garantir um fortalecimento intransigente dos robustos programas de compliance nas estatais modernas.",
      "No contexto de organizações de altíssima complexidade e capital intensivo, como a Petrobras, a implementação e manutenção de uma Ouvidoria não é mera obrigação protocolar, mas sim um canal estratégico e independente que resguarda a ética institucional, antecipando potenciais crises de reputação ou desvios sistêmicos de conduta antes que impactem a imagem pública e as operações de mercado.",
      "A comunicação de feedback, seja ela em formato de denúncia, reclamação, sugestão ou elogio, atua como o termômetro vital do clima organizacional e da percepção do cidadão-cliente. Sem um canal formalmente estruturado, protegido por rígidos protocolos de sigilo e não retaliação, a alta gestão corre o sério risco de tomar decisões míopes, desconectadas das reais falhas que ocorrem na linha de frente e na operação logística.",
      "Do ponto de vista normativo, as ouvidorias do setor público e das sociedades de economia mista estão ancoradas na Constituição Federal e densamente regulamentadas por dispositivos como a Lei 13.460/2017 (Lei de Defesa do Usuário de Serviços Públicos). Esta lei estabelece diretrizes claras e vinculantes sobre os direitos dos usuários, bem como prazos rigorosos e metodologias obrigatórias para a tratativa e resposta das manifestações encaminhadas.",
      "Para que o feedback não se torne um buraco negro de informações estáticas, é imperativo o desenvolvimento de uma cultura interna voltada para a aprendizagem organizacional. Quando o gestor transforma uma reclamação recorrente sobre falhas de suprimentos em uma política preventiva de melhoria de processos, o feedback atinge o seu ápice estratégico, retroalimentando o planejamento tático e operacional.",
      "A figura do 'Whistleblower' (denunciante de boa-fé) ganha centralidade absoluta na governança corporativa contemporânea. Mecanismos internacionais e nacionais de compliance exigem que as companhias ofereçam canais independentes que assegurem não apenas o anonimato estrito, mas também um amparo jurídico robusto contra retaliações, viabilizando o combate endógeno às fraudes complexas e aos conluios licitatórios.",
      "É vital distinguir, técnica e conceitualmente, a Ouvidoria dos canais tradicionais de atendimento, como o SAC (Serviço de Atendimento ao Consumidor). Enquanto o SAC atua na primeira instância, lidando com demandas operacionais massificadas e imediatas, a Ouvidoria posiciona-se como instância de recurso estratégico e de apelação, atuando de forma mediadora, analítica e com profundo poder de recomendação junto à diretoria executiva.",
      "As bancas examinadoras de altíssimo rigor, como a CESGRANRIO, cobram com extrema minúcia essa diferenciação conceitual em suas provas. O candidato deve dominar não apenas as definições clássicas, mas também a aplicação prática dos normativos legais que fundamentam as ouvidorias, compreendendo os fluxos processuais obrigatórios e as tipologias exatas de cada manifestação (denúncia versus reclamação).",
      "Além da conformidade legal, a escuta corporativa de excelência exige um tratamento empático, transparente e tecnicamente embasado das informações. Um relatório gerencial consolidado pela Ouvidoria funciona como um mapa de calor das vulnerabilidades operacionais e comportamentais da organização, permitindo que a alta gestão aloque recursos e treinamentos com cirúrgica precisão e racionalidade econômica.",
      "Compreender a Ouvidoria e o sistema de feedback de maneira integral capacita o futuro profissional de administração a atuar como um agente catalisador de mudanças éticas e de aprimoramento contínuo. É o domínio profundo desses instrumentos que diferencia um mero executor de tarefas de um estrategista corporativo capaz de fomentar uma cultura organizacional baseada na verdade, na melhoria de processos e no respeito incondicional às normas de governança."
    ],
    accordions: [
      {
        titulo: "Tipologias de Manifestações",
        conteudo: "<p>Compreenda a diferença técnica entre os tipos de registros na Ouvidoria:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Denúncia:</strong> Relato de fraude, assédio, corrupção ou violação ética. Requer investigação profunda.</li><li><strong>Reclamação:</strong> Queixa formal sobre a má qualidade do serviço prestado ou morosidade no atendimento.</li><li><strong>Sugestão:</strong> Proposta do usuário para aprimorar processos, produtos ou fluxos internos.</li><li><strong>Elogio:</strong> Reconhecimento formal de um bom atendimento, estimulando as equipes e a manutenção da qualidade.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Conceito",
        tituloFrente: "Ouvidoria",
        iconeFrente: "LuEar",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Instância Recursal",
        conteudoVerso: "Canal estratégico e independente de 2ª instância, que atua na mediação, resolução de conflitos e melhoria contínua. 🎧"
      },
      {
        categoria: "Manifestação",
        tituloFrente: "Denúncia",
        iconeFrente: "LuAlertTriangle",
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
