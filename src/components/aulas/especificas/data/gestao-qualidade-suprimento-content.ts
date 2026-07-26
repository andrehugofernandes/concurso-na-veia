import { LuBookOpen, LuCheck, LuTarget, LuTriangle, LuLayers, LuMessageSquare, LuAward, LuUsers, LuShield, LuActivity } from 'react-icons/lu';

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
  accordions: AccordionSlide[];
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
  { id: 'modulo-1', title: 'Conceitos e Evolução da Qualidade', label: 'Evolução Histórica', icon: LuBookOpen },
  { id: 'modulo-2', title: 'Princípios da Qualidade Total (TQM)', label: 'Qualidade Total', icon: LuAward },
  { id: 'modulo-3', title: '7 Ferramentas Estatísticas da Qualidade', label: 'Ferramentas Estatísticas', icon: LuTriangle },
  { id: 'modulo-4', title: 'Ferramentas Gerenciais (PDCA, 5W2H, 5S)', label: 'Ferramentas Gerenciais', icon: LuTarget },
  { id: 'modulo-5', title: 'Gestão da Qualidade ISO 9001:2015', label: 'Norma ISO 9001', icon: LuShield },
  { id: 'modulo-6', title: 'Auditoria da Qualidade e Conformidade', label: 'Auditoria ISO 19011', icon: LuCheck },
  { id: 'modulo-7', title: 'Gestão por Processos e Melhoria Contínua', label: 'BPM & Lean Six Sigma', icon: LuLayers },
  { id: 'modulo-8', title: 'Indicadores de Desempenho (KPIs da Qualidade)', label: 'KPIs e Métricas', icon: LuActivity },
  { id: 'modulo-9', title: 'Custos da Qualidade e Não Conformidades', label: 'Custos da Qualidade', icon: LuUsers },
  { id: 'modulo-10', title: 'Modelos de Excelência em Gestão (MEG/FNQ)', label: 'Modelos de Excelência', icon: LuMessageSquare }
];

export const MODULE_CONTENTS: Record<number, ModuleData> = {
  1: {
    introducaoCEDEA: [
      "A evolução histórica da gestão da qualidade transformou a abordagem corporativa ao longo do século XX, migrando da mera inspeção de produtos acabados para a gestão estratégica global da satisfação do cliente. Nos certames da banca CESGRANRIO para a Petrobras, o entendimento das quatro eras da qualidade (Inspeção, Controle Estatístico, Garantia da Qualidade e Gestão da Qualidade Total - TQM) é cobrado com altíssima frequência.",
      "No contexto da indústria petroquímica e do setor de suprimentos, a qualidade deixou de ser um atributo puramente técnico do produto físico para se tornar uma filosofia de governança organizacional, impactando diretamente a integridade operacional de refinarias e plataformas offshore.",
      "Na Era da Inspeção (início do século XX), o foco residia exclusivamente no produto final, com o objetivo de separar itens defeituosos antes do envio ao cliente. Essa abordagem passiva e reativa gerava elevadíssimos custos de refugo e retrabalho, pois as falhas só eram identificadas após o consumo de matéria-prima e mão de obra.",
      "Com a introdução do Controle Estatístico da Qualidade por Walter Shewhart na década de 1930, a ênfase deslocou-se para a medição do processo produtivo. A utilização de cartas de controle permitiu identificar a variabilidade das máquinas e intervir antes que peças defeituosas fossem fabricadas.",
      "A Era da Garantia da Qualidade, impulsionada por pensadores como Joseph Juran e Armand Feigenbaum nas décadas de 1950 e 1960, expandiu o conceito para toda a cadeia de valor. Introduziu-se o foco na prevenção de falhas, no envolvimento de todos os departamentos (projeto, suprimentos, manutenção) e nos custos da qualidade.",
      "A Gestão da Qualidade Total (TQM), consolidada por Edwards Deming e Kaoru Ishikawa a partir da reconstrução industrial japonesa, estabeleceu o cliente como o juiz supremo da qualidade, integrando a melhoria contínua (Kaizen) e o envolvimento total dos colaboradores.",
      "Os gurus da qualidade trouxeram visões complementares cruciais: Deming focou no método PDCA e na eliminação do medo na cultura organizacional; Juran propôs a Trilogia da Qualidade (Planejamento, Controle e Melhoria); Crosby defendeu a meta de 'Zero Defeitos' e o princípio do 'Fazer Certo da Primeira Vez'.",
      "Ishikawa popularizou o Diagrama de Causa e Efeito (Espinha de Peixe) e os Círculos de Controle de Qualidade (CCQ), enquanto Genichi Taguchi introduziu a Engenharia da Qualidade com a função perda da qualidade e projetos robustos.",
      "Nas provas da CESGRANRIO, as pegadinhas mais comuns envolvem a atribuição incorreta de conceitos aos seus respectivos autores (ex.: atribuir a Trilogia da Qualidade a Deming em vez de Juran) ou a confusão entre o foco reativo da inspeção e o foco preventivo da garantia da qualidade.",
      "Para obter nota máxima nas questões de suprimentos e qualidade da Petrobras, o candidato deve ser capaz de associar o momento histórico da indústria às técnicas estatísticas e organizacionais correspondentes, identificando como a prevenção reduz o custo total de propriedade (TCO)."
    ],
    accordions: [
      {
        titulo: "As 4 Eras da Evolução da Qualidade",
        conteudo: "<p>A evolução da qualidade ocorreu em 4 fases distintas:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Era da Inspeção:</strong> Foco no produto acabado. Reativa e corretiva. Alta taxa de refugo.</li><li><strong>Era do Controle Estatístico:</strong> Foco no processo produtivo. Uso de cartas de controle de Shewhart.</li><li><strong>Era da Garantia da Qualidade:</strong> Foco no sistema e na prevenção. Envolvimento de todos os setores e engenharia de processos.</li><li><strong>Era da Qualidade Total (TQM):</strong> Foco no cliente interno e externo. Cultura de melhoria contínua (Kaizen) e envolvimento estratégico da alta direção.</li></ul>"
      },
      {
        titulo: "Principais Gurus e suas Contribuições para a CESGRANRIO",
        conteudo: "<p>Tabela de memorização rápida para questões de prova:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>W. Edwards Deming:</strong> 14 Pontos de Gestão, ciclo PDCA e foco na variabilidade sistêmica.</li><li><strong>Joseph M. Juran:</strong> Trilogia da Qualidade (Planejamento, Controle e Melhoria da Qualidade).</li><li><strong>Philip Crosby:</strong> Conceito de 'Zero Defeitos', 'Fazer certo da primeira vez' e Custo da Não Conformidade.</li><li><strong>Kaoru Ishikawa:</strong> Diagrama de Causa e Efeito (6M) e Círculos de Controle da Qualidade (CCQ).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "História",
        tituloFrente: "Era da Inspeção",
        iconeFrente: "LuSearch",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco no Produto Final",
        conteudoVerso: "Abordagem <strong>reativa</strong>. Verificação visual ou dimensional no final da linha. Alto custo de refugo e desperdício de insumos. 🔍"
      },
      {
        categoria: "Estatística",
        tituloFrente: "Controle Estatístico",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Cartas de Controle",
        conteudoVerso: "Desenvolvido por <strong>Walter Shewhart</strong>. Monitoramento da variabilidade das causas comuns e especiais durante o processo. 📈"
      },
      {
        categoria: "Prevenção",
        tituloFrente: "Garantia da Qualidade",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco no Sistema",
        conteudoVerso: "Abordagem <strong>preventiva</strong>. Garantir que os processos estejam projetados para não gerar defeitos desde o fornecedor. 🛡️"
      },
      {
        categoria: "Gurus",
        tituloFrente: "Trilogia de Juran",
        iconeFrente: "LuTriangle",
        subtituloFrente: "Memorização",
        tituloVerso: "Planejar, Controlar, Melhorar",
        conteudoVerso: "Composta por: 1. <strong>Planejamento da Qualidade</strong>, 2. <strong>Controle da Qualidade</strong>, 3. <strong>Melhoria da Qualidade</strong>. 🎯"
      },
      {
        categoria: "Cultura",
        tituloFrente: "Deming - 14 Pontos",
        iconeFrente: "LuAward",
        subtituloFrente: "Memorização",
        tituloVerso: "Melhoria Contínua",
        conteudoVerso: "Eliminação do medo na empresa, fim da dependência da inspeção em massa e foco no aprendizado contínuo. 🏆"
      },
      {
        categoria: "Pegadinha Prova",
        tituloFrente: "Zero Defeitos (Crosby)",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Conformidade Total",
        conteudoVerso: "Para Crosby, qualidade é <strong>conformidade com as especificações</strong>. Defeito zero é o padrão absoluto de desempenho. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico das 4 Eras da Qualidade",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Lembre-se da sigla <strong>I-E-G-T</strong>:</p><ul class='list-disc pl-5 mt-2'><li><strong>I</strong>nspeção (Produto final)</li><li><strong>E</strong>statística (Processo)</li><li><strong>G</strong>arantia (Sistema/Prevenção)</li><li><strong>T</strong>otal/TQM (Cliente/Cultura)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 1 - Evolução da Qualidade", artista: "Concurso Na Veia" }
  },
  2: {
    introducaoCEDEA: [
      "A Gestão da Qualidade Total (TQM - Total Quality Management) é uma estratégia gerencial que busca engajar todos os membros da organização na melhoria contínua de produtos, serviços e processos corporativos. Na banca CESGRANRIO, o TQM é abordado sob a ótica da satisfação dos clientes internos e externos e da eficiência na cadeia de suprimentos.",
      "Para a Petrobras, a implementação dos princípios da Qualidade Total é vital para garantir a operacionalidade segura de instalações complexas, como plataformas FPSO e refinarias, onde pequenos erros de especificação ou manutenção podem acarretar acidentes de grande proporção.",
      "O primeiro princípio fundamental do TQM é o Foco no Cliente. Entende-se como cliente não apenas o consumidor final dos combustíveis e lubrificantes, mas também o 'cliente interno' — o próximo setor ou profissional que recebe o resultado de um trabalho no fluxo operacional.",
      "O segundo pilar é a Liderança Comprometida. A alta administração da Petrobras deve atuar como catalisadora da cultura da qualidade, fornecendo recursos, estabelecendo objetivos claros e criando um ambiente motivador onde a excelência seja reconhecida.",
      "O Envolvimento das Pessoas representa o terceiro pilar. A qualidade total não é responsabilidade exclusiva de um departamento de inspeção, mas de cada empregado e contratado. O empoderamento das equipes operacionais permite identificar desvios no momento exato em que ocorrem.",
      "A Abordagem por Processos constitui o quarto princípio. Qualquer atividade corporativa deve ser entendida como um processo transformador que recebe entradas (inputs), agrega valor e gera saídas (outputs). Gerenciar os processos de forma integrada reduz redundâncias e gargalos.",
      "A Abordagem Sistêmica para a Gestão entende a empresa como um ecossistema interconectado. Decisões tomadas na gestão de materiais e compras impactam diretamente a manutenção preventiva de equipamentos nas refinarias.",
      "A Melhoria Contínua (Kaizen) é a busca incessante pelo aperfeiçoamento incremental diário. Pequenas melhorias diárias consolidadas geram saltos imensos de competitividade ao longo dos anos.",
      "Na prova da CESGRANRIO, as questões costumam colocar cenários organizacionais para testar se o candidato reconhece a quebra dos princípios do TQM (por exemplo, culpar funcionários isoladamente em vez de analisar a falha no processo ou sistema).",
      "O domínio desses princípios capacita o profissional a julgar com precisão questões teóricas e estudos de caso de gestão de suprimentos e governança corporativa da Petrobras."
    ],
    accordions: [
      {
        titulo: "Princípios Fundamentais da Qualidade Total (TQM)",
        conteudo: "<p>Os pilares essenciais do TQM incluem:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Foco no Cliente (Interno e Externo):</strong> Atender e superar as expectativas de quem recebe o produto/serviço.</li><li><strong>Liderança Visionária:</strong> Engajamento da alta direção como exemplo e facilitadora de recursos.</li><li><strong>Engajamento das Pessoas:</strong> Valorização do conhecimento prático de quem opera a linha.</li><li><strong>Abordagem baseada em Fatos para Tomada de Decisão:</strong> Decisões fundamentadas em dados estatísticos e medição precisa, nunca em intuição pura.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "TQM",
        tituloFrente: "Foco no Cliente",
        iconeFrente: "LuUsers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Cliente Interno/Externo",
        conteudoVerso: "Qualidade é definida por quem consome o resultado. O próximo processo na linha de produção é o <strong>cliente interno</strong>. 👥"
      },
      {
        categoria: "Processos",
        tituloFrente: "Visão por Processos",
        iconeFrente: "LuLayers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Entrada -> Valor -> Saída",
        conteudoVerso: "Gerenciamento focado no fluxo contínuo de valor, eliminando ilhas departamentais e gargalos de comunicação. 🔄"
      },
      {
        categoria: "Decisão",
        tituloFrente: "Tomada de Decisão",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Decisão por Fatos",
        conteudoVerso: "Uso obrigatório de dados estatísticos, medições confiáveis e indicadores para fundamentar ações corretivas. 📊"
      },
      {
        categoria: "Cultura",
        tituloFrente: "Kaizen (Melhoria Contínua)",
        iconeFrente: "LuAward",
        subtituloFrente: "Memorização",
        tituloVerso: "Hoje Melhor que Ontem",
        conteudoVerso: "Melhoria incremental e permanente em todos os níveis. Não exige investimentos gigantescos, mas sim disciplina diária. 🌟"
      },
      {
        categoria: "Liderança",
        tituloFrente: "Papel da Alta Direção",
        iconeFrente: "LuShield",
        subtituloFrente: "Memorização",
        tituloVerso: "Patrocínio e Exemplo",
        conteudoVerso: "A liderança deve patrocinar os recursos e atuar como o exemplo principal da cultura de qualidade na estatal. 🛡️"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Culpa do Sistema",
        conteudoVerso: "No TQM, cerca de 85% das falhas são de responsabilidade do <strong>sistema/processo</strong>, não da negligência individual. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Pilares da Qualidade Total",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Para lembrar a essência do TQM:</p><ul class='list-disc pl-5 mt-2'><li><strong>F</strong>oco no Cliente</li><li><strong>A</strong>bordagem por Processos</li><li><strong>T</strong>omada de Decisão por Fatos</li><li><strong>O</strong>timização Contínua (Kaizen)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 2 - Princípios da Qualidade Total", artista: "Concurso Na Veia" }
  },
  3: {
    introducaoCEDEA: [
      "As 7 Ferramentas Estatísticas da Qualidade, sistematizadas por Kaoru Ishikawa, formam o conjunto fundamental de técnicas visuais e numéricas para identificação, análise e solução de problemas operacionais. Elas são amplamente cobradas nas provas da CESGRANRIO pela sua aplicabilidade direta no dia a dia da indústria.",
      "Na gestão de suprimentos e integridade de ativos da Petrobras, a aplicação correta dessas ferramentas permite diagnosticar as causas de falhas em válvulas, atrasos na entrega de materiais e desvios de especificações químicas de combustível.",
      "A primeira ferramenta é a Folha de Verificação (Checksheet), um formulário estruturado para coleta rápida e padronizada de dados no chão de fábrica, facilitando o registro de frequência de defeitos.",
      "O Diagrama de Pareto baseia-se no princípio 80/20 (criado por Vilfredo Pareto e aplicado por Juran), demonstrando graficamente que 80% dos problemas operacionais são decorrentes de apenas 20% das causas principais ('poucos vitais vs. muitos triviais').",
      "O Diagrama de Causa e Efeito (Ishikawa ou Espinha de Peixe) permite categorizar as causas-raiz de um efeito indesejado em seis eixos fundamentais (os 6M: Mão de obra, Material, Máquina, Método, Meio ambiente e Medição).",
      "O Histograma é um gráfico de barras verticais que exibe a distribuição de frequência de dados contínuos (como espessura de tubulações ou pressão de operação), permitindo visualizar a tendência central e a dispersão dos dados.",
      "O Diagrama de Dispersão analisa graficamente a relação de correlação (positiva, negativa ou nula) entre duas variáveis quantitativas (por exemplo, temperatura de refino vs. percentual de impureza).",
      "As Cartas de Controle (Gráficos de Controle de Shewhart) monitoram os processos ao longo do tempo, delimitando os Limites Superior (LSC) e Inferior (LIC) de Controle para distinguir Causas Comuns (aleatórias/inerentes) de Causas Especiais (anômalas).",
      "O Fluxograma mapeia visualmente as etapas de um processo do início ao fim, utilizando simbologia padronizada para evidenciar gargalos, loops de retrabalho e etapas desnecessárias.",
      "Na prova da CESGRANRIO, o candidato deve saber exatamente qual ferramenta utilizar para cada objetivo específico (ex.: priorizar problemas $\\rightarrow$ Pareto; encontrar causa-raiz $\\rightarrow$ Ishikawa; medir variabilidade temporal $\\rightarrow$ Carta de Controle)."
    ],
    accordions: [
      {
        titulo: "Resumo Didático das 7 Ferramentas da Qualidade",
        conteudo: "<p>Guia prático para resolução de questões da CESGRANRIO:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Folha de Verificação:</strong> Coleta estruturada de dados brutos.</li><li><strong>Pareto:</strong> Priorização (Princípio 80/20 - Poucos Vitais vs Muitos Triviais).</li><li><strong>Ishikawa (Espinha de Peixe):</strong> Identificação das causas-raiz (6M).</li><li><strong>Histograma:</strong> Distribuição de frequências de dados contínuos.</li><li><strong>Diagrama de Dispersão:</strong> Correlação entre duas variáveis.</li><li><strong>Carta de Controle:</strong> Estabilidade do processo no tempo (LSC / LIC).</li><li><strong>Fluxograma:</strong> Mapeamento gráfico das etapas do processo.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Ferramentas",
        tituloFrente: "Diagrama de Pareto",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Princípio 80/20",
        conteudoVerso: "Ordena os problemas do maior para o menor. <strong>80% dos efeitos derivam de 20% das causas</strong>. Usado para priorização! 📊"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "Espinha de Peixe",
        iconeFrente: "LuTriangle",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Causa e Efeito (6M)",
        conteudoVerso: "Estrutura as causas-raiz de um problema em 6 categorias: <strong>Mão de obra, Material, Máquina, Método, Medição, Meio Ambiente</strong>. 🐟"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "Carta de Controle",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "LSC e LIC",
        conteudoVerso: "Mede se o processo está sob <strong>controle estatístico</strong>. Diferencia causas comuns de causas especiais fora dos limites. 📈"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "Diagrama de Dispersão",
        iconeFrente: "LuTarget",
        subtituloFrente: "Memorização",
        tituloVerso: "Correlação X x Y",
        conteudoVerso: "Avalia a relação entre duas variáveis (ex: temperatura vs pressão). Pode ser positiva, negativa ou nula. 📍"
      },
      {
        categoria: "Ferramentas",
        tituloFrente: "Fluxograma",
        iconeFrente: "LuLayers",
        subtituloFrente: "Memorização",
        tituloVerso: "Mapeamento Visual",
        conteudoVerso: "Representação gráfica da sequência de etapas de um processo. Evidencia gargalos e retrabalhos. 🗺️"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Pareto vs Histograma",
        conteudoVerso: "<strong>Pareto</strong> ordena barras em ordem decrescente de frequência. O <strong>Histograma</strong> mostra a distribuição contínua da variável. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico das 7 Ferramentas da Qualidade",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Gatilho mental para lembrar as 7 Ferramentas:</p><ul class='list-disc pl-5 mt-2'><li><strong>P</strong>areto (Prioridade 80/20)</li><li><strong>I</strong>shikawa (Causa e Efeito)</li><li><strong>C</strong>arta de Controle (Estabilidade)</li><li><strong>H</strong>istograma (Frequência)</li><li><strong>D</strong>ispersão (Relação X-Y)</li><li><strong>F</strong>luxograma (Etapas)</li><li><strong>F</strong>olha de Verificação (Coleta)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 3 - Ferramentas Estatísticas da Qualidade", artista: "Concurso Na Veia" }
  },
  4: {
    introducaoCEDEA: [
      "As Ferramentas Gerenciais da Qualidade complementam as ferramentas estatísticas, focando na organização das ideias, planejamento de ações e estruturação do ambiente de trabalho. O Ciclo PDCA, o método 5W2H e o programa 5S representam o núcleo desse módulo.",
      "Para os profissionais de administração e logística da Petrobras, o domínio dessas metodologias garante que os planos de contingência, compras e manutenção sejam executados de forma padronizada e livre de ambiguidades.",
      "O Ciclo PDCA (Plan, Do, Check, Act), também conhecido como Ciclo de Deming/Shewhart, é a engrenagem fundamental da melhoria contínua. Na fase P (Plan), estabelecem-se os objetivos, metas e planos de ação. Na fase D (Do), executa-se o plano e realiza-se o treinamento das equipes.",
      "Na fase C (Check) do PDCA, medem-se os resultados alcançados e compara-se com as metas planejadas. Na fase A (Act/Adjust), tomam-se ações corretivas caso haja desvios ou padroniza-se a nova prática bem-sucedida.",
      "O método 5W2H é uma ferramenta de planejamento tático e operacional composta por um checklist de 7 perguntas fundamentais em inglês que garantem a clareza total de qualquer plano de ação.",
      "As 7 perguntas do 5W2H são: What (O que será feito?), Why (Por que será feito?), Where (Onde será feito?), When (Quando será feito?), Who (Quem fará?), How (Como será feito?) e How Much (Quanto custará?).",
      "O Programa 5S de origem japonesa visa transformar o ambiente de trabalho através de 5 sensos fundamentais: Seiri (Utilização/Descarte), Seiton (Organização/Arrumação), Seiso (Limpeza), Seiketsu (Padronização/Higiene) e Shitsuke (Disciplina/Autodisciplina).",
      "A implementação do 5S em almoxarifados e galpões da Petrobras reduz o tempo de busca por peças e ferramentas, previne acidentes operacionais e estabelece uma base de disciplina necessária para qualquer auditoria ISO.",
      "Nas provas da CESGRANRIO, as pegadinhas frequentes incluem a inversão das etapas do PDCA (ex.: agir corretivamente na fase Do em vez da fase Act) ou a confusão entre os componentes do 5W2H (ex.: trocar o How Much pelo Why).",
      "Saber aplicar essas ferramentas em questões práticas consolida a capacidade do candidato de resolver estudos de caso de eficiência operacional e governança."
    ],
    accordions: [
      {
        titulo: "Detalhamento das Etapas do Ciclo PDCA",
        conteudo: "<p>O ciclo iterativo de 4 etapas:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>P (Plan - Planejar):</strong> Diagnóstico, definição de metas e elaboração do plano de ação.</li><li><strong>D (Do - Executar):</strong> Execução do plano e capacitação das pessoas envolvidas.</li><li><strong>C (Check - Verificar):</strong> Monitoramento dos indicadores e comparação do executado com a meta.</li><li><strong>A (Act - Agir):</strong> Padronização do sucesso ou ação corretiva sobre desvios.</li></ul>"
      },
      {
        titulo: "O Checklist 5W2H para Planos de Ação",
        conteudo: "<p>Estrutura dos 7 campos obrigatórios:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>What:</strong> O que fazer? (Objeto da ação)</li><li><strong>Why:</strong> Por que fazer? (Justificativa)</li><li><strong>Where:</strong> Onde fazer? (Local)</li><li><strong>When:</strong> Quando fazer? (Cronograma)</li><li><strong>Who:</strong> Quem fará? (Responsável)</li><li><strong>How:</strong> Como fazer? (Método)</li><li><strong>How Much:</strong> Quanto custa? (Orçamento)</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "PDCA",
        tituloFrente: "Fase P (Plan)",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Planejamento e Metas",
        conteudoVerso: "Definição clara das metas e dos <strong>planos de ação</strong> para alcançar os objetivos. Fase decisiva do ciclo. 🎯"
      },
      {
        categoria: "PDCA",
        tituloFrente: "Fase A (Act)",
        iconeFrente: "LuAward",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Padronizar ou Corrigir",
        conteudoVerso: "Se o resultado foi atingido, <strong>padroniza-se</strong> a rotina. Se houve desvio, roda-se novo PDCA corretivo. 🔄"
      },
      {
        categoria: "5W2H",
        tituloFrente: "7 Perguntas Chave",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Plano de Ação Limpo",
        conteudoVerso: "Garante que nenhuma dúvida sobre <strong>quem, o que, quando, onde, como, por que e quanto</strong> fique aberta. 📝"
      },
      {
        categoria: "5S",
        tituloFrente: "Seiri (Descarte)",
        iconeFrente: "LuLayers",
        subtituloFrente: "Memorização",
        tituloVerso: "Utilização de Recursos",
        conteudoVerso: "Separar o útil do inútil. Manter no local de trabalho apenas o necessário para a operação diária. 🗑️"
      },
      {
        categoria: "5S",
        tituloFrente: "Shitsuke (Disciplina)",
        iconeFrente: "LuShield",
        subtituloFrente: "Memorização",
        tituloVerso: "Manutenção do Hábitot",
        conteudoVerso: "Transformar os sensos em um estilo de vida e valor corporativo permanente sem necessidade de vigilância. 🧘"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "PDCA vs SDCA",
        conteudoVerso: "O <strong>PDCA</strong> busca a melhoria e novos patamares; o <strong>SDCA (Standardize)</strong> mantém o patamar atual sob controle. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos 5 Sensos do 5S",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Os 5 Sensos em Português:</p><ul class='list-disc pl-5 mt-2'><li><strong>Utilização</strong> (Seiri)</li><li><strong>Ordenação</strong> (Seiton)</li><li><strong>Limpeza</strong> (Seiso)</li><li><strong>Saúde/Padronização</strong> (Seiketsu)</li><li><strong>Autodisciplina</strong> (Shitsuke)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 4 - Ferramentas Gerenciais da Qualidade", artista: "Concurso Na Veia" }
  },
  5: {
    introducaoCEDEA: [
      "A norma ABNT NBR ISO 9001:2015 especifica os requisitos para um Sistema de Gestão da Qualidade (SGQ) reconhecido mundialmente. Nas provas de concursos da Petrobras pela CESGRANRIO, a ISO 9001 é abordada sob a perspectiva da mentalidade de risco e da satisfação do cliente.",
      "Para a Petrobras, possuir processos certificados na ISO 9001 demonstra aos investidores e reguladores que a estatal adota padrões rígidos de controle operacional, rastreabilidade e gestão de fornecedores de suprimentos.",
      "A versão 2015 da ISO 9001 introduziu mudanças estruturais profundas em relação à versão anterior de 2008, adotando a Estrutura de Alto Nível (High Level Structure - HLS), comum a todas as normas de sistemas de gestão ISO.",
      "O conceito central da ISO 9001:2015 é a Mentalidade de Risco (Risk-Based Thinking), que exige que a organização identifique antecipadamente os riscos e oportunidades que podem afetar o desempenho dos processos e a conformidade dos produtos.",
      "Outro pilar é a Análise do Contexto da Organização (requisito 4), obrigando a empresa a mapear questões internas e externas relevantes e identificar as partes interessadas (stakeholders) e seus requisitos.",
      "A liderança assume protagonismo direto na norma (requisito 5), eliminando a figura obrigatória do antigo 'Representante da Direção' (RD) e exigindo que a alta gestão demonstre comprometimento ativo com o SGQ.",
      "A gestão do conhecimento organizacional (requisito 7.1.6) exige que a Petrobras retenha e compartilhe o know-how técnico das suas equipes para prevenir a perda de inteligência corporativa nas transições de pessoal.",
      "A norma adota o ciclo PDCA como estrutura de sustentação de todos os seus capítulos, integrando o planejamento de mudanças e o controle de processos terceirizados (suprimentos e contratos).",
      "Nas provas da CESGRANRIO, as pegadinhas clássicas incluem a afirmação incorreta de que a ISO 9001 prescreve como o produto deve ser feito (na verdade, ela especifica requisitos para o *sistema de gestão*, não para o produto físico em si).",
      "Dominar os requisitos da ISO 9001:2015 permite ao candidato resolver com maestria questões sobre auditoria, gestão de fornecedores e especificação técnica de insumos."
    ],
    accordions: [
      {
        titulo: "Requisitos Chave da ISO 9001:2015",
        conteudo: "<p>Estrutura dos principais capítulos da norma:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Capítulo 4 (Contexto da Organização):</strong> Mapeamento do ambiente interno/externo e partes interessadas.</li><li><strong>Capítulo 5 (Liderança):</strong> Comprometimento direto da direção com o SGQ e política da qualidade.</li><li><strong>Capítulo 6 (Planejamento):</strong> Ações para abordar riscos e oportunidades e objetivos da qualidade.</li><li><strong>Capítulo 8 (Operação):</strong> Planejamento operacional, controle de fornecedores e controle de saídas não conformes.</li><li><strong>Capítulo 9 (Avaliação de Desempenho):</strong> Auditoria interna e análise crítica pela direção.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "ISO 9001",
        tituloFrente: "Mentalidade de Risco",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Prevenção Proativa",
        conteudoVerso: "Identificar <strong>riscos e oportunidades</strong> antes que ocorram. Substitui a antiga necessidade de 'ações preventivas' isoladas. 🛡️"
      },
      {
        categoria: "ISO 9001",
        tituloFrente: "Escopo da Norma",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco no Sistema",
        conteudoVerso: "A ISO 9001 certifica o <strong>Sistema de Gestão da Qualidade</strong>, e NÃO o produto físico individualmente. 🏢"
      },
      {
        categoria: "ISO 9001",
        tituloFrente: "Estrutura HLS",
        iconeFrente: "LuLayers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Alto Nível (10 Capítulos)",
        conteudoVerso: "Estrutura padronizada que facilita a integração com a ISO 14001 (Meio Ambiente) e ISO 45001 (Saúde e Segurança). 📐"
      },
      {
        categoria: "ISO 9001",
        tituloFrente: "Partes Interessadas",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "Stakeholders",
        conteudoVerso: "Inclui clientes, acionistas, órgãos ambientais, fornecedores e a comunidade afetada pelas operações. 👥"
      },
      {
        categoria: "ISO 9001",
        tituloFrente: "Informação Documentada",
        iconeFrente: "LuTarget",
        subtituloFrente: "Memorização",
        tituloVerso: "Documentos e Registros",
        conteudoVerso: "Termo moderno que unifica os antigos conceitos de 'documentos' (procedimentos) e 'registros' (evidências). 📄"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Obrigador de RD?",
        conteudoVerso: "A versão 2015 <strong>NÃO exige</strong> mais a figura do Representante da Direção (RD). A responsabilidade é da própria Liderança. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico da Mentalidade de Risco ISO 9001",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Regra de Ouro ISO 9001:2015:</p><p class='mt-2 font-mono text-emerald-400'>CONTEXTO -> RISCOS -> AÇÕES -> AVALIAÇÃO</p></div>"
    },
    audio: { titulo: "Podcast Módulo 5 - Gestão da Qualidade ISO 9001:2015", artista: "Concurso Na Veia" }
  },
  6: {
    introducaoCEDEA: [
      "A auditoria da qualidade é um processo sistemático, independente e documentado para obter evidências e avaliá-las objetivamente, determinando o grau de cumprimento dos critérios acordados. As diretrizes para auditorias de sistemas de gestão são regidas pela norma ABNT NBR ISO 19011:2018.",
      "Para a Petrobras, as auditorias da qualidade são essenciais para homologação de novos fornecedores de grande porte, verificação de conformidade de obras de engenharia offshore e garantia de segurança em contratos licitados.",
      "As auditorias dividem-se quanto ao cliente e objetivo em três tipos fundamentais: Auditoria de Primeira Parte (Auditoria Interna, realizada pela própria organização); Auditoria de Segunda Parte (Auditoria em Fornecedores/Clientes); e Auditoria de Terceira Parte (Auditoria de Certificação por organismo independente).",
      "Os princípios da auditoria (ISO 19011) garantem a confiabilidade do processo: Integridade, Apresentação Justa, Devido Cuidado Profissional, Confidencialidade, Independência, Abordagem Baseada em Evidências e Abordagem Baseada em Riscos.",
      "Uma constatação de auditoria ocorre ao comparar a evidência auditada com os critérios estabelecidos. Essa constatação pode indicar Conformidade, Oportunidade de Melhoria (OM) ou Não Conformidade (NC).",
      "A Não Conformidade é definida rigorosamente como o não atendimento a um requisito especificado (da norma, de contrato ou interno). As não conformidades são classificadas em Maiores (falha sistêmica) e Menores (desvio pontual).",
      "Diante de uma Não Conformidade, a organização deve realizar a Análise de Causa-Raiz (ex.: usando os 5 Porquês ou Ishikawa) para implementar Ações Corretivas que eliminem a causa e evitem a reincidência.",
      "É vital distinguir Ação Corretiva (elimina a causa da NC identificada) de Correção / Disposição (elimina o sintoma ou problema imediato, como retrabalho ou descarte).",
      "Nas provas da CESGRANRIO, as questões focam no julgamento do tipo de auditoria e na diferenciação entre Correção e Ação Corretiva.",
      "O domínio dos conceitos da ISO 19011 capacita o candidato a atuar com segurança em questões de fiscalização de contratos, auditoria de processos e gestão de não conformidades."
    ],
    accordions: [
      {
        titulo: "Tipos de Auditoria da Qualidade (ISO 19011)",
        conteudo: "<p>Classificação obrigatória para provas:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>1ª Parte (Interna):</strong> Realizada pela própria empresa sobre seus processos para autoavaliação e melhoria.</li><li><strong>2ª Parte (Externa de Cliente/Fornecedor):</strong> Realizada por uma empresa em seu fornecedor ou contratado.</li><li><strong>3ª Parte (Certificação):</strong> Realizada por organismo certificador independente (ex.: DNV, Bureau Veritas) para emissão do selo ISO.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Auditoria",
        tituloFrente: "Auditoria 1ª Parte",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Auditoria Interna",
        conteudoVerso: "Conduzida pela própria organização sobre seus processos para autoavaliação e melhoria contínua. 🏢"
      },
      {
        categoria: "Auditoria",
        tituloFrente: "Auditoria 2ª Parte",
        iconeFrente: "LuUsers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Auditoria em Fornecedores",
        conteudoVerso: "Realizada pela empresa (ex: Petrobras) em seus contratados e fornecedores para avaliar capacidade. 🤝"
      },
      {
        categoria: "Auditoria",
        tituloFrente: "Auditoria 3ª Parte",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Certificação Oficial",
        conteudoVerso: "Realizada por órgão certficador credenciado e independente para concessão de certificado ISO. 📜"
      },
      {
        categoria: "Conceito",
        tituloFrente: "Não Conformidade",
        iconeFrente: "LuActivity",
        subtituloFrente: "Memorização",
        tituloVerso: "Não Atendimento a Requisito",
        conteudoVerso: "Descumprimento de norma, lei ou especificação técnica. Exige identificação de causa-raiz. 🚫"
      },
      {
        categoria: "Conceito",
        tituloFrente: "Ação Corretiva",
        iconeFrente: "LuTarget",
        subtituloFrente: "Memorização",
        tituloVerso: "Elimina a Causa-Raiz",
        conteudoVerso: "Ação destinada a eliminar a <strong>causa</strong> de uma não conformidade para evitar sua reincidência. 🎯"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Correção vs Ação Corretiva",
        conteudoVerso: "<strong>Correção</strong> ataca o sintoma imediato (retrabalho); a <strong>Ação Corretiva</strong> elimina a causa-raiz sistêmica. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Tipos de Auditoria",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Lembre-se do número da parte:</p><ul class='list-disc pl-5 mt-2'><li><strong>1ª Parte:</strong> Em mim mesmo (Interna)</li><li><strong>2ª Parte:</strong> No meu fornecedor (Comercial)</li><li><strong>3ª Parte:</strong> O certficador em mim (Oficial)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 6 - Auditoria da Qualidade", artista: "Concurso Na Veia" }
  },
  7: {
    introducaoCEDEA: [
      "A Gestão por Processos (BPM - Business Process Management) e as metodologias de melhoria contínua como Lean e Six Sigma representam abordagens avançadas para eliminação de desperdícios e maximização de valor. Nas provas da CESGRANRIO, o foco recai sobre o mapeamento de processos e o fluxo do ciclo DMAIC.",
      "Para a Petrobras, a otimização de processos de logística de transporte de petróleo e suprimento de plataformas reduz tempos de parada e custos de frete marítimo de forma drástica.",
      "A Gestão por Processos contrapõe-se à visão funcional tradicional por departamentos estanque. Ela enfatiza o fluxo horizontal ponta a ponta de atividades que cruzam várias áreas corporativas para entregar valor ao cliente.",
      "O Mapeamento de Processos utiliza notações padronizadas (como BPMN - Business Process Modeling Notation) para desenhar o estado atual (AS-IS) e projetar o estado futuro otimizado (TO-BE).",
      "A filosofia Lean de origem no Sistema Toyota de Produção busca incansavelmente a eliminação dos 8 grandes desperdícios: superprodução, tempo de espera, transporte desnecessário, excesso de processamento, estoque excessivo, movimento desnecessário, defeitos e talento subaproveitado.",
      "O Six Sigma é uma metodologia altamente estruturada que busca reduzir a variabilidade dos processos a um nível estatístico de 3,4 defeitos por milhão de oportunidades (DPMO).",
      "O motor de execução do Six Sigma é a metodologia DMAIC: Define (Definir o problema e o objetivo), Measure (Medir o desempenho atual), Analyze (Analisar os dados e causa-raiz), Improve (Melhorar e implementar soluções) e Control (Controlar e sustentar os ganhos).",
      "A integração do Lean com o Six Sigma (Lean Six Sigma) combina a velocidade e agilidade da eliminação de desperdícios Lean com o rigor estatístico do Six Sigma.",
      "Nas provas da CESGRANRIO, as pegadinhas envolvem a confusão dos papéis do DMAIC ou a identificação do modelo AS-IS versus TO-BE.",
      "Compreender a aplicação prática do Lean Six Sigma fortalece a capacidade do candidato de resolver questões de otimização operacional e modernização de processos."
    ],
    accordions: [
      {
        titulo: "As 5 Etapas da Metodologia DMAIC (Six Sigma)",
        conteudo: "<p>Estrutura do ciclo de solução do Six Sigma:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>D (Define):</strong> Definir o problema, escopo e metas do projeto.</li><li><strong>M (Measure):</strong> Medir o processo atual e coletar dados confiáveis.</li><li><strong>A (Analyze):</strong> Analisar os dados para identificar a causa-raiz dos desvios.</li><li><strong>I (Improve):</strong> Desenvolver e implementar soluções de melhoria.</li><li><strong>C (Control):</strong> Padronizar o processo e monitorar os ganhos no tempo.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "BPM",
        tituloFrente: "Modelo AS-IS",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Estado Atual do Processo",
        conteudoVerso: "Representação realista do processo <strong>como ele ocorre hoje</strong>, com todos os seus gargalos e falhas. 📸"
      },
      {
        categoria: "BPM",
        tituloFrente: "Modelo TO-BE",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Estado Futuro Desejado",
        conteudoVerso: "Projeto do processo <strong>otimizado</strong> após a eliminação de redundâncias e aplicação de melhorias. 🚀"
      },
      {
        categoria: "Six Sigma",
        tituloFrente: "Metodologia DMAIC",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Define, Measure, Analyze...",
        conteudoVerso: "Ciclo de 5 etapas para redução drástica de variabilidade e eliminação de defeitos operacionais. 🔄"
      },
      {
        categoria: "Lean",
        tituloFrente: "Eliminação de Desperdícios",
        iconeFrente: "LuTriangle",
        subtituloFrente: "Memorização",
        tituloVerso: "Foco no Valor Agregado",
        conteudoVerso: "Tudo o que consome recursos mas não agrega valor para o cliente deve ser eliminado do fluxo. ✂️"
      },
      {
        categoria: "Six Sigma",
        tituloFrente: "Nível 6 Sigma",
        iconeFrente: "LuAward",
        subtituloFrente: "Memorização",
        tituloVerso: "3,4 DPMO",
        conteudoVerso: "Taxa de excelência estatística equivalente a <strong>3,4 defeitos por milhão de oportunidades</strong>. 🏆"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "AS-IS vs TO-BE",
        conteudoVerso: "Não se deve projetar o <strong>TO-BE</strong> sem antes mapear fidedignamente o <strong>AS-IS</strong>, sob pena de mascarar gargalos reais. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico do Ciclo DMAIC",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>A sequência exata do Six Sigma:</p><p class='mt-2 font-mono text-cyan-400'>DEFINIR -> MEDIR -> ANALISAR -> MELHORAR -> CONTROLAR</p></div>"
    },
    audio: { titulo: "Podcast Módulo 7 - Gestão por Processos e Lean Six Sigma", artista: "Concurso Na Veia" }
  },
  8: {
    introducaoCEDEA: [
      "Os Indicadores de Desempenho (KPIs - Key Performance Indicators) são ferramentas quantitativas de medição que refletem o sucesso ou progresso de um processo ou organização em relação a seus objetivos estratégicos. Na banca CESGRANRIO, o domínio da distinção entre Eficiência, Eficácia e Efetividade (os 3 Es da gestão) é questão certa nas provas da Petrobras.",
      "Para a gestão de suprimentos e logística da Petrobras, os KPIs monitoram parâmetros vitais como o giro de estoque, o tempo de atendimento de pedidos (Lead Time) e o custo total de armazenagem.",
      "Eficiência refere-se ao uso otimizado dos recursos (meios), buscando a minimização do desperdício de insumos, tempo e capital para realizar uma atividade.",
      "Eficácia foca estritamente nos resultados alcançados (fins), medindo a capacidade do processo de atingir 100% das metas e objetivos planejados, independentemente do custo incorrido.",
      "Efetividade mede o impacto real e de longo prazo da ação no ambiente externo ou na vida dos clientes, combinando a eficiência na alocação de recursos com a eficácia no cumprimento da missão institucional.",
      "Além dos 3 Es clássicos, a gestão moderna inclui os indicadores de Execução (cumprimento do cronograma), Excelência (conformidade com padrões de qualidade) e Economia (capacidade de captar e gerir recursos ao menor custo).",
      "Um bom KPI deve atender aos critérios SMART: Specific (Específico), Measurable (Mensurável), Achievable (Atingível), Relevant (Relevante) e Time-bound (Temporal).",
      "Painéis de Indicadores (Dashboards) e o Balanced Scorecard (BSC) organizam visualmente os KPIs em perspectivas estratégicas (Financeira, Clientes, Processos Internos, Aprendizado e Crescimento).",
      "Nas provas da CESGRANRIO, a pegadinha recorrente é misturar Eficiência (foco nos recursos/meios) com Eficácia (foco nas metas/fins).",
      "Dominar os KPIs e suas fórmulas estatísticas permite ao candidato responder com facilidade a questões de avaliação de desempenho e gestão orçamentária."
    ],
    accordions: [
      {
        titulo: "Os 3 Es da Gestão Pública e Corporativa",
        conteudo: "<p>Diferenciação conceitual indispensável para a CESGRANRIO:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Eficiência (Foco nos Meios):</strong> Fazer o trabalho da melhor forma possível, com o menor custo e uso racional de recursos.</li><li><strong>Eficácia (Foco nos Fins/Metas):</strong> Atingir o objetivo planejado. Bater a meta estipulada.</li><li><strong>Efetividade (Foco no Impacto):</strong> Transformar a realidade de longo prazo. Gerar o benefício pretendido.</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "KPIs",
        tituloFrente: "Eficiência",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco nos Meios",
        conteudoVerso: "Fazer certo o trabalho. Reduzir custos, economizar tempo e otimizar a utilização dos insumos. ⚙️"
      },
      {
        categoria: "KPIs",
        tituloFrente: "Eficácia",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco nos Fins",
        conteudoVerso: "Alcançar os resultados pretendidos. Cumprir as metas e entregas combinadas com o cliente. 🎯"
      },
      {
        categoria: "KPIs",
        tituloFrente: "Efetividade",
        iconeFrente: "LuAward",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Foco no Impacto",
        conteudoVerso: "Gerar impacto real e sustentável no ambiente externo de longo prazo. União de eficiência + eficácia. 🌐"
      },
      {
        categoria: "Critérios",
        tituloFrente: "Metas SMART",
        iconeFrente: "LuBookOpen",
        subtituloFrente: "Memorização",
        tituloVerso: "Atributos do KPI",
        conteudoVerso: "<strong>Específica, Mensurável, Atingível, Relevante e Temporal</strong>. Padrão de validação de metas. 📏"
      },
      {
        categoria: "Balanced Scorecard",
        tituloFrente: "4 Perspectivas BSC",
        iconeFrente: "LuLayers",
        subtituloFrente: "Memorização",
        tituloVerso: "Mapa Estratégico",
        conteudoVerso: "Financeira, Clientes, Processos Internos, Aprendizado e Crescimento. Equilíbrio de indicadores. 🗺️"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Eficaz mas Ineficiente?",
        conteudoVerso: "É totalmente possível ser <strong>eficaz</strong> (bater a meta) sendo <strong>ineficiente</strong> (desperdiçando milhões de reais). ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos 3 Es da Gestão",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Resumo de Prova:</p><ul class='list-disc pl-5 mt-2'><li><strong>Eficiência:</strong> Como se faz (Meios)</li><li><strong>Eficácia:</strong> O que se faz (Metas)</li><li><strong>Efetividade:</strong> Para que se faz (Impacto)</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 8 - Indicadores de Desempenho da Qualidade", artista: "Concurso Na Veia" }
  },
  9: {
    introducaoCEDEA: [
      "A mensuração e gestão dos Custos da Qualidade e o tratamento rigoroso de Não Conformidades são pilares econômicos da gestão industrial moderna. Na banca CESGRANRIO, o foco recai sobre a classificação dos custos da qualidade e os impactos financeiros do retrabalho.",
      "Na cadeia de suprimentos da Petrobras, o custo de prevenir uma falha em terra é infinitamente menor do que o custo de corrigir um vazamento ou quebra de equipamento em águas profundas.",
      "Os Custos da Qualidade dividem-se em duas grandes categorias: Custos de Conformidade (investimentos para garantir a qualidade) e Custos da Não Conformidade (perdas decorrentes da falta de qualidade).",
      "Os Custos de Conformidade subdividem-se em Custos de Prevenção (planejamento da qualidade, treinamento, qualificação de fornecedores, manutenção preventiva) e Custos de Avaliação (inspeções, testes de laboratório, auditorias de processo).",
      "Os Custos da Não Conformidade subdividem-se em Custos de Falhas Internas (ocorridos antes do envio ao cliente: refugo, retrabalho, reteste) e Custos de Falhas Externas (ocorridos após a entrega ao cliente: garantias, devoluções, recalls, multas ambientais e perda de reputação).",
      "A Regra de 1-10-100 (Regra de Labovitz) demonstra graficamente que investir R$ 1 em Prevenção economiza R$ 10 em Avaliação/Correção Interna e R$ 100 em Falhas Externas no mercado.",
      "A Gestão de Não Conformidades exige o registro formal do Relatório de Não Conformidade (RNC), contenção imediata, investigação de causa-raiz e acompanhamento da eficácia da ação corretiva.",
      "A prevenção sistemática reduz o Custo Total de Propriedade (TCO - Total Cost of Ownership) dos insumos adquiridos pelo setor de suprimentos da estatal.",
      "Nas provas da CESGRANRIO, as pegadinhas clássicas envolvem a classificação incorreta de despesas (ex.: considerar o custo de inspeção como falha interna ou o retrabalho como prevenção).",
      "O domínio desses conceitos financeiros capacita o candidato a analisar a eficiência econômica da gestão de materiais e contratação de serviços."
    ],
    accordions: [
      {
        titulo: "Matriz de Classificação dos Custos da Qualidade",
        conteudo: "<p>Estrutura clássica de custos para concursos:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Custos de Prevenção (Conformidade):</strong> Evitam defeitos (Treinamento, calibração, projeto).</li><li><strong>Custos de Avaliação (Conformidade):</strong> Detectam defeitos (Inspeção, auditoria, ensaios).</li><li><strong>Custos de Falhas Internas (Não Conformidade):</strong> Ocorrem dentro da empresa (Refugo, retrabalho, sucata).</li><li><strong>Custos de Falhas Externas (Não Conformidade):</strong> Ocorrem no cliente (Garantia, recall, multas, processo).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "Custos",
        tituloFrente: "Custos de Prevenção",
        iconeFrente: "LuShield",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Investimento Preventivo",
        conteudoVerso: "Gastos com treinamento, manutenção preventiva e qualificação de fornecedores para evitar falhas. 🛡️"
      },
      {
        categoria: "Custos",
        tituloFrente: "Custos de Avaliação",
        iconeFrente: "LuSearch",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Inspeção e Testes",
        conteudoVerso: "Gastos com testes laboratoriais, ensaios não destrutivos e auditorias para verificar a conformidade. 🔍"
      },
      {
        categoria: "Falhas",
        tituloFrente: "Falhas Internas",
        iconeFrente: "LuActivity",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Antes do Cliente",
        conteudoVerso: "Perdas com refugo, retrabalho e sucata identificados dentro da empresa antes da entrega final. 🏭"
      },
      {
        categoria: "Falhas",
        tituloFrente: "Falhas Externas",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "No Cliente (Mais Caro)",
        conteudoVerso: "Prejuízos com recall, indenizações, processos judiciais e perda de clientes após a entrega. 💥"
      },
      {
        categoria: "Regra",
        tituloFrente: "Regra 1-10-100",
        iconeFrente: "LuAward",
        subtituloFrente: "Memorização",
        tituloVerso: "Efeito Multiplicador",
        conteudoVerso: "R$ 1 na prevenção = R$ 10 na correção interna = R$ 100 se o defeito chegar ao cliente externo! 📈"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "Retrabalho é Prevenção?",
        conteudoVerso: "<strong>JAMAIS!</strong> Retrabalho é custo de <strong>Falha Interna</strong>, pois consome recursos para consertar um erro existente. ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Custos da Qualidade",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Estrutura dos 4 Quadrantes de Custos:</p><ul class='list-disc pl-5 mt-2'><li><strong>Prevenção:</strong> Treinar e Planejar</li><li><strong>Avaliação:</strong> Medir e Testar</li><li><strong>Falha Interna:</strong> Refugar e Retrabalhar</li><li><strong>Falha Externa:</strong> Pagar Garantia e Recalls</li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 9 - Custos da Qualidade e Não Conformidades", artista: "Concurso Na Veia" }
  },
  10: {
    introducaoCEDEA: [
      "Os Modelos de Excelência em Gestão (como o Modelo de Excelência da Gestão - MEG da Fundação Nacional da Qualidade - FNQ) e os Prêmios de Qualidade fornecem um referencial sistêmico para avaliar a maturidade da governança corporativa. Na banca CESGRANRIO, o foco recai sobre a visão holística e os fundamentos do MEG.",
      "Para a Petrobras, a adoção dos fundamentos do MEG orienta a empresa para a sustentabilidade, responsabilidade socioambiental, inovação e excelência operacional de nível mundial.",
      "O MEG é fundamentado em princípios sistêmicos que expressam os conceitos da gestão moderna de alta performance, integrando a liderança transformadora, o pensamento sistêmico e o desenvolvimento sustentável.",
      "Os fundamentos do MEG incluem: Pensamento Sistêmico, Aprendizado Organizacional e Inovação, Liderança Transformadora, Compromisso com as Partes Interessadas, Adaptabilidade, Desenvolvimento Sustentável e Geração de Valor.",
      "Ao contrário de normas de requisitos como a ISO 9001 (que possui caráter prescritivo de conformidade passível de certificação), o MEG é um modelo de diagnóstico e autoavaliação sem caráter mandatório.",
      "A estrutura do MEG promove a melhoria do desempenho através do ciclo de avaliação e aprendizado, permitindo que a organização compare suas práticas com as melhores organizações do mundo (Benchmarking).",
      "O Benchmarking é o processo sistemático de comparar as métricas, processos e práticas de uma empresa com os líderes de mercado para identificar lacunas e implementar melhorias de ponta.",
      "A Governança Corporativa integrada ao MEG assegura a transparência (disclosure), equidade, prestação de contas (accountability) e responsabilidade corporativa na Petrobras.",
      "Nas provas da CESGRANRIO, a pegadinha recorrente é afirmar que o MEG é uma norma auditável para certificação (como a ISO), em vez de uma estrutura de avaliação de maturidade.",
      "Dominar os modelos de excelência consolida a formação do candidato para resolver questões de alto nível sobre governança, planejamento estratégico e gestão pública."
    ],
    accordions: [
      {
        titulo: "Fundamentos do Modelo de Excelência da Gestão (MEG/FNQ)",
        conteudo: "<p>Os princípios orientadores da alta maturidade de gestão:</p><ul class='list-disc pl-5 mt-2 space-y-2'><li><strong>Pensamento Sistêmico:</strong> Entendimento das interdependências entre os elementos internos e externos.</li><li><strong>Liderança Transformadora:</strong> Atuação ética, inspiradora e comprometida com a visão de futuro.</li><li><strong>Desenvolvimento Sustentável:</strong> Equilibra as dimensões econômica, social e ambiental (ESG).</li><li><strong>Aprendizado Organizacional e Inovação:</strong> Busca contínua por novos conhecimentos e soluções disruptivas.</li><li><strong>Geração de Valor:</strong> Resultados consistentes para todas as partes interessadas (stakeholders).</li></ul>"
      }
    ],
    flipcards: [
      {
        categoria: "MEG",
        tituloFrente: "Pensamento Sistêmico",
        iconeFrente: "LuLayers",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Visão Holística",
        conteudoVerso: "Compreensão das relações de causa e efeito e da interdependência entre todos os setores da empresa. 🌐"
      },
      {
        categoria: "MEG",
        tituloFrente: "Geração de Valor",
        iconeFrente: "LuAward",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Para os Stakeholders",
        conteudoVerso: "Alcançar resultados sustentáveis e equilibrados para clientes, acionistas, sociedade e empregados. 💎"
      },
      {
        categoria: "Benchmarking",
        tituloFrente: "Benchmarking",
        iconeFrente: "LuTarget",
        subtituloFrente: "Detalhamento Técnico",
        tituloVerso: "Aprender com os Melhores",
        conteudoVerso: "Processo contínuo de comparação de processos e KPIs com líderes mundiais para superar os padrões atuais. 📊"
      },
      {
        categoria: "Governança",
        tituloFrente: "Accountability",
        iconeFrente: "LuShield",
        subtituloFrente: "Memorização",
        tituloVerso: "Prestação de Contas",
        conteudoVerso: "Dever dos gestores de prestar contas sobre seus atos e assumir responsabilidade integral pelos resultados. 📜"
      },
      {
        categoria: "Sustentabilidade",
        tituloFrente: "Triplo Botton Line (ESG)",
        iconeFrente: "LuUsers",
        subtituloFrente: "Memorização",
        tituloVerso: "Econômico, Social, Ambiental",
        conteudoVerso: "Desenvolvimento sustentável que concilia resultados financeiros com preservação ambiental e justiça social. 🌿"
      },
      {
        categoria: "CESGRANRIO",
        tituloFrente: "Pegadinha de Prova",
        iconeFrente: "LuCheck",
        subtituloFrente: "Memorização",
        tituloVerso: "MEG Certifica?",
        conteudoVerso: "O MEG <strong>NÃO é uma norma certificável</strong>. É um modelo de autoavaliação de maturidade da gestão! ⚠️"
      }
    ],
    sinteseEstrategica: {
      title: "Mnemônico dos Princípios da Governança Corporativa",
      content: "<div class='p-4 bg-slate-800 text-white rounded-lg'><p>Os 4 Pilares da Governança (IBGC):</p><ul class='list-disc pl-5 mt-2'><li><strong>Transparência</strong> (Disclosure)</li><li><strong>Equidade</strong> (Fairness)</li><li><strong>Prestação de Contas</strong> (Accountability)</li><li><strong>Responsabilidade Corporativa</strong></li></ul></div>"
    },
    audio: { titulo: "Podcast Módulo 10 - Modelos de Excelência em Gestão", artista: "Concurso Na Veia" }
  }
};
