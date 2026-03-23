import { QuizQuestion } from "../../shared";

// Módulo 1: Introdução e Governança vs Gestão
export const QUIZ_GOVERNANCA_M1: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A Petrobras, como uma grande estatal, aplica princípios de governança para garantir o alinhamento estratégico. Qual a principal diferença entre Governança de TI e Gestão de TI?",
    opcoes: [
      { label: "A", valor: "A Governança foca no 'como fazer' (execução), enquanto a Gestão foca no 'o que fazer' (direcionamento)." },
      { label: "B", valor: "A Governança é responsabilidade do CIO, enquanto a Gestão é responsabilidade do Conselho de Administração." },
      { label: "C", valor: "A Governança estabelece as diretrizes e avalia o desempenho, enquanto a Gestão planeja, constrói e executa as atividades." },
      { label: "D", valor: "Não há diferença prática; os termos são sinônimos no COBIT 2019." },
      { label: "E", valor: "A Governança trata exclusivamente de segurança, enquanto a Gestão trata de infraestrutura." }
    ],
    correta: "C",
    explicacao: "Segundo o COBIT 2019, a Governança (EDM - Avaliar, Direcionar e Monitorar) foca no valor e conformidade, enquanto a Gestão (PBRM - Planejar, Construir, Executar e Monitorar) foca na operação técnica."
  },
  {
    id: 2,
    pergunta: "No contexto da Governança Corporativa de TI, o princípio da 'Accountability' refere-se a:",
    opcoes: [
      { label: "A", valor: "A capacidade de processar grandes volumes de dados contábeis em tempo real." },
      { label: "B", valor: "A prestação de contas e a assunção de responsabilidade pelos resultados das decisões de TI." },
      { label: "C", valor: "O bloqueio de contas de usuários que violam políticas de segurança." },
      { label: "D", valor: "A redução de custos operacionais através da automação de processos." },
      { label: "E", valor: "A migração de sistemas legados para infraestruturas de nuvem pública." }
    ],
    correta: "B",
    explicacao: "Accountability (Prestação de Contas) é o pilar da governança que exige que os tomadores de decisão sejam claros sobre suas ações e responsáveis pelos impactos gerados no negócio."
  },
  {
    id: 3,
    pergunta: "A implementação de um modelo de governança de TI visa fundamentalmente eliminar o 'Silo de Informação'. O que isso significa no ambiente industrial da Petrobras?",
    opcoes: [
      { label: "A", valor: "Aumentar a proteção física dos servidores de dados contra ataques externos." },
      { label: "B", valor: "Garantir que cada departamento tenha seu próprio centro de processamento independente." },
      { label: "C", valor: "Promover a integração de dados e processos entre diferentes unidades de negócio, evitando dados isolados." },
      { label: "D", valor: "Substituir todos os sistemas de armazenamento físico por soluções magnéticas." },
      { label: "E", valor: "Limitar o acesso a informações sensíveis apenas ao alto escalão da diretoria." }
    ],
    correta: "C",
    explicacao: "Silos de informação ocorrem quando departamentos não compartilham dados. A Governança busca a visão holística e integrada para maximizar o valor da TI para toda a organização."
  },
  {
    id: 4,
    pergunta: "Qual é o objetivo principal do alinhamento estratégico em Governança de TI?",
    opcoes: [
      { label: "A", valor: "Garantir que a TI utilize sempre as tecnologias mais caras do mercado." },
      { label: "B", valor: "Fazer com que os objetivos da TI suportem e impulsionem os objetivos de negócio da empresa." },
      { label: "C", valor: "Padronizar o hardware utilizado por todos os funcionários da empresa." },
      { label: "D", valor: "Assegurar que o departamento de TI não sofra cortes orçamentários." },
      { label: "E", valor: "Eliminar a necessidade de interação entre gestores técnicos e diretores de negócio." }
    ],
    correta: "B",
    explicacao: "O alinhamento estratégico garante que cada investimento ou projeto de TI esteja diretamente contribuindo para as metas globais da Petrobras, como eficiência operacional ou transição energética."
  },
  {
    id: 5,
    pergunta: "Na norma ISO/IEC 38500, a atividade de 'Avaliar' (Evaluate) pela Governança consiste em:",
    opcoes: [
      { label: "A", valor: "Instalar softwares de monitoramento de performance nos desktops." },
      { label: "B", valor: "Examinar o uso atual e futuro da TI, considerando pressões externas e tendências de mercado." },
      { label: "C", valor: "Digitar códigos de programação para corrigir bugs em sistemas de faturamento." },
      { label: "D", valor: "Realizar o backup diário dos bancos de dados de contratos." },
      { label: "E", valor: "Organizar o treinamento de brigadistas de incêndio no Data Center." }
    ],
    correta: "B",
    explicacao: "Avaliar é o primeiro passo do modelo EDM (Avaliar, Direcionar, Monitorar). Envolve analisar propostas, estratégias e o contexto para decidir o melhor caminho para a TI."
  },
  {
    id: 6,
    pergunta: "Considerando a Governança de TI, o concept de 'Valor de TI' está mais associado a:",
    opcoes: [
      { label: "A", valor: "O preço de revenda dos servidores usados em leilão." },
      { label: "B", valor: "A soma dos salários de todos os desenvolvedores seniores." },
      { label: "C", valor: "A entrega de benefícios reais ao negócio, otimizando riscos e recursos." },
      { label: "D", valor: "A quantidade de gigabytes processados por segundo pelo core da rede." },
      { label: "E", valor: "O número de patentes registradas pela equipe de inovação em um ano." }
    ],
    correta: "C",
    explicacao: "Valor não é apenas dinheiro; na governança, é o equilíbrio entre obter benefícios, gerenciar riscos associados e utilizar os recursos da Petrobras de forma eficiente."
  }
];

// Módulo 2: COBIT 2019 (Princípios e Objetivos)
export const QUIZ_GOVERNANCA_M2: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "O COBIT 2019 introduziu 'Fatores de Design' (Design Factors). Para que eles servem no contexto de uma multinacional como a Petrobras?",
    opcoes: [
      { label: "A", valor: "Para escolher a cor do logotipo da plataforma de eLearning." },
      { label: "B", valor: "Para adaptar o sistema de governança às necessidades específicas da organização (ex: tamanho, risco, estratégia)." },
      { label: "C", valor: "Para desenhar as interfaces gráficas (UI) de todos os softwares internos." },
      { label: "D", valor: "Para determinar o número de tomadas elétricas necessárias em cada escritório." },
      { label: "E", valor: "Para selecionar apenas fornecedores que tenham o selo de design sustentável." }
    ],
    correta: "B",
    explicacao: "Os Design Factors permitem que o COBIT não seja 'tamanho único'. Eles consideram a estratégia da empresa, o perfil de risco e o cenário de ameaças para moldar a governança."
  },
  {
    id: 2,
    pergunta: "Dentre os princípios do Sistema de Governança do COBIT 2019, o sistema deve ser 'Dinâmico'. Isso significa que:",
    opcoes: [
      { label: "A", valor: "A TI deve usar apenas linguagens de programação que compilam rapidamente." },
      { label: "B", valor: "As regras de governança devem ser alteradas todos os dias sem aviso prévio." },
      { label: "C", valor: "O sistema de governança deve evoluir e responder a mudanças nos fatores de design durante a operação." },
      { label: "D", valor: "Os funcionários de TI devem praticar ginástica laboral para manter o dinamismo." },
      { label: "E", valor: "Todos os servidores devem ser reiniciados a cada 24 horas para manter a performance." }
    ],
    correta: "C",
    explicacao: "Ser dinâmico significa que o sistema de governança não é estático; se a estratégia da Petrobras muda (ex: foco total em ESG), a governança de TI deve se ajustar a essa nova realidade."
  },
  {
    id: 3,
    pergunta: "No framework COBIT 2019, o domínio 'APO' refere-se a quais tipos de objetivos de gestão?",
    opcoes: [
      { label: "A", valor: "Apenas Processos Operacionais." },
      { label: "B", valor: "Alinhar, Planejar e Organizar." },
      { label: "C", valor: "Adquirir, Programar e Otimizar." },
      { label: "D", valor: "Administrar Pessoas e Objetivos." },
      { label: "E", valor: "Avaliar, Priorizar e Operar." }
    ],
    correta: "B",
    explicacao: "APO (Align, Plan and Organize) é um dos domínios da gestão no COBIT, tratando de estratégia, arquitetura, inovação, riscos e custos."
  },
  {
    id: 4,
    pergunta: "O COBIT 2019 faz uma distinção clara entre 'Sistema de Governança' e 'Estrutura de Governança' (Framework). O COBIT em si é classificado como:",
    opcoes: [
      { label: "A", valor: "Um Sistema de Governança pronto para uso." },
      { label: "B", valor: "Uma Estrutura de Governança (Framework) que ajuda a construir um Sistema." },
      { label: "C", valor: "Um código de ética para analistas de sistemas iniciantes." },
      { label: "D", valor: "Uma ferramenta de monitoramento de tráfego de rede." },
      { label: "E", valor: "Um banco de dados NoSQL para arquivamento de logs." }
    ],
    correta: "B",
    explicacao: "O COBIT é o framework. Ele fornece os blocos de construção e diretrizes para que a Petrobras construa seu próprio Sistema de Governança sob medida."
  },
  {
    id: 5,
    pergunta: "Qual fator de design do COBIT 2019 analisa o 'Scenario of Threats' (cenário de ameaças)?",
    opcoes: [
      { label: "A", valor: "Role of IT (Papel da TI)." },
      { label: "B", valor: "Threat Landscape (Cenário de Ameaças)." },
      { label: "C", valor: "Enterprise Size (Tamanho da Empresa)." },
      { label: "D", valor: "Sourcing Model (Modelo de Terceirização)." },
      { label: "E", valor: "IT Methods (Métodos de TI)." }
    ],
    correta: "B",
    explicacao: "O Threat Landscape avalia o nível de ameaças cibernéticas e geopolíticas, algo crucial para uma empresa estratégica como a Petrobras, impactando diretamente os controles de segurança."
  },
  {
    id: 6,
    pergunta: "No COBIT 2019, o domínio 'EDM' é responsável pela:",
    opcoes: [
      { label: "A", valor: "Gestão técnica de infraestrutura e suporte." },
      { label: "B", valor: "Engenharia de Dados e Mineração." },
      { label: "C", valor: "Governança (Avaliar, Direcionar e Monitorar)." },
      { label: "D", valor: "Entrega, Serviço e Suporte." },
      { label: "E", valor: "Manutenção de Equipamentos Eletrônicos." }
    ],
    correta: "C",
    explicacao: "EDM (Evaluate, Direct and Monitor) é o único domínio de Governança no COBIT, onde o Conselho de Administração atua para garantir o direcionamento estratégico."
  }
];

// Módulo 3: ITIL 4 (Práticas e Fluxo de Valor)
export const QUIZ_GOVERNANCA_M3: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "O ITIL 4 mudou o foco de 'Processos' para 'Práticas'. Quantas práticas de gestão existem no ITIL 4 e como elas são divididas?",
    opcoes: [
      { label: "A", valor: "10 práticas, todas focadas em suporte técnico." },
      { label: "B", valor: "34 práticas, divididas em Gestão Geral, Gestão de Serviços e Gestão Técnica." },
      { label: "C", valor: "5 práticas, seguindo o ciclo de vida do serviço (Estratégia, Desenho, Transição, etc)." },
      { label: "D", valor: "100 práticas, sem divisões categoriais." },
      { label: "E", valor: "34 práticas, todas exclusivas para desenvolvimento de software ágil." }
    ],
    correta: "B",
    explicacao: "O ITIL 4 possui 34 práticas estruturadas em três categorias: Gestão Geral (14), Gestão de Serviços (17) e Gestão Técnica (3)."
  },
  {
    id: 2,
    pergunta: "Qual é o principal componente do SVS (Service Value System) do ITIL 4 que representa as atividades necessárias para responder à demanda?",
    opcoes: [
      { label: "A", valor: "Service Value Chain (Cadeia de Valor de Serviço)." },
      { label: "B", valor: "Information Security Management (Gestão de Segurança)." },
      { label: "C", valor: "Cloud Computing Model (Modelo de Nuvem)." },
      { label: "D", valor: "DevOps Pipeline (Esteira DevOps)." },
      { label: "E", valor: "User Experience Strategy (Estratégia UX)." }
    ],
    correta: "A",
    explicacao: "A Service Value Chain (Cadeia de Valor) é o modelo operacional central do ITIL 4, contendo atividades como Planejar, Melhorar, Engajar, Desenhar/Transicionar, Obter/Construir e Entregar/Suportar."
  },
  {
    id: 3,
    pergunta: "Segundo o ITIL 4, o que é 'Co-criação de Valor'?",
    opcoes: [
      { label: "A", valor: "O fornecedor cria o valor e o cliente apenas consome." },
      { label: "B", valor: "A TI constrói o sistema sozinha sem falar com os usuários." },
      { label: "C", valor: "O valor é criado conjuntamente através da colaboração ativa entre fornecedor e consumidor." },
      { label: "D", valor: "A criação de riqueza apenas para os acionistas da Petrobras." },
      { label: "E", valor: "O uso de inteligência artificial para automatizar a criação de logos." }
    ],
    correta: "C",
    explicacao: "No ITIL 4, o valor não é um 'produto físico' entregue, mas algo gerado pela colaboração entre quem presta o serviço e quem o utiliza, garantindo utilidade e garantia."
  },
  {
    id: 4,
    pergunta: "Qual princípio orientador (Guiding Principle) do ITIL 4 recomenda 'Begin where you are' (Começar onde você está)?",
    opcoes: [
      { label: "A", valor: "Pular todas as etapas de análise e ir direto para o código." },
      { label: "B", valor: "Substituir todos os servidores antigos por novos imediatamente." },
      { label: "C", valor: "Avaliar o estado atual da TI antes de propor mudanças, aproveitando o que já funciona." },
      { label: "D", valor: "Ignorar o histórico da empresa e contratar uma nova equipe." },
      { label: "E", valor: "Copiar exatamente o modelo de outra empresa sem adaptações." }
    ],
    correta: "C",
    explicacao: "Start where you are evita o desperdício de descartar processos ou tecnologias que ainda são úteis para a organização, promovendo a melhoria contínua incremental."
  },
  {
    id: 5,
    pergunta: "No ITIL 4, a 'Gestão de Incidentes' tem como objetivo principal:",
    opcoes: [
      { label: "A", valor: "Descobrir a causa raiz da falha para que ela nunca mais ocorra." },
      { label: "B", valor: "Restaurar a operação normal do serviço o mais rápido possível." },
      { label: "C", valor: "Punir o funcionário que cometeu o erro técnico." },
      { label: "D", valor: "Escrever a documentação completa antes de tentar qualquer correção." },
      { label: "E", valor: "Aumentar o tempo de resposta (SLA) para reduzir o stress da equipe." }
    ],
    correta: "B",
    explicacao: "Diferente da Gestão de Problemas (que busca a causa), a Gestão de Incidentes foca na disponibilidade: o serviço precisa voltar a funcionar para o usuário final."
  },
  {
    id: 6,
    pergunta: "O conceito de 'Service Relationship Management' (Gestão de Relacionamento de Serviço) engloba:",
    opcoes: [
      { label: "A", valor: "Service Provisioning (Provisão) + Service Consumption (Consumo)." },
      { label: "B", valor: "Hardware Upgrade + Software Update." },
      { label: "C", valor: "Cloud Hybrid + Multi-Cloud." },
      { label: "D", valor: "Java + Python + C#." },
      { label: "E", valor: "SQL + NoSQL + Big Data." }
    ],
    correta: "A",
    explicacao: "A SRM foca na interação completa: o ato de fornecer o serviço e o ato de usá-lo, garantindo que ambos os lados alcancem seus objetivos."
  }
];

// Módulo 4: ISO/IEC 38500 (Modelo de 6 Princípios)
export const QUIZ_GOVERNANCA_M4: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A norma ISO/IEC 38500 define a Governança Corporativa de TI como um sistema pelo qual o uso da TI é:",
    opcoes: [
      { label: "A", valor: "Eliminado gradualmente para reduzir custos." },
      { label: "B", valor: "Dirigido e Controlado." },
      { label: "C", valor: "Apenas Monitorado em termos de banda larga." },
      { label: "D", valor: "Terceirizado para empresas estrangeiras." },
      { label: "E", valor: "Decidido exclusivamente pelos estagiários." }
    ],
    correta: "B",
    explicacao: "A definição clássica da ISO 38500 (e também do relatório Cadbury para governança corporativa) é o sistema pelo qual as organizações são dirigidas e controladas."
  },
  {
    id: 2,
    pergunta: "Qual dos 6 princípios da ISO 38500 garante que a TI tenha competência técnica e de negócio para atuar?",
    opcoes: [
      { label: "A", valor: "Estratégia." },
      { label: "B", valor: "Aquisição." },
      { label: "C", valor: "Comportamento Humano." },
      { label: "D", valor: "Responsabilidade (Responsibility)." },
      { label: "E", valor: "Desempenho." }
    ],
    correta: "D",
    explicacao: "O princípio da Responsabilidade estabelece que indivíduos e grupos na Petrobras devem ter a autoridade e a competência necessária para assumir seus papéis na TI."
  },
  {
    id: 3,
    pergunta: "O princípio da 'Conformidade' (Compliance) na ISO 38500 refere-se a:",
    opcoes: [
      { label: "A", valor: "Ter a conformação física correta dos cabos de rede." },
      { label: "B", valor: "Garantir que a TI respeite leis, regulamentações, contratos e políticas internas." },
      { label: "C", valor: "Fazer com que todos os softwares tenham a mesma interface gráfica." },
      { label: "D", valor: "Seguir apenas as opiniões do gerente de TI, ignorando leis." },
      { label: "E", valor: "Certificar que os computadores são da marca Petrobras." }
    ],
    correta: "B",
    explicacao: "Compliance na governança significa assegurar que a organização opera dentro dos limites legais e éticos, evitando multas e danos à reputação."
  },
  {
    id: 4,
    pergunta: "A ISO 38500 aplica-se a quais tipos de organizações?",
    opcoes: [
      { label: "A", valor: "Apenas startups de tecnologia com menos de 10 pessoas." },
      { label: "B", valor: "Apenas empresas públicas como a Petrobras." },
      { label: "C", valor: "Todas as organizações, públicas ou privadas, de qualquer tamanho." },
      { label: "D", valor: "Apenas instituições financeiras no Brasil." },
      { label: "E", valor: "Apenas empresas que usam servidores mainframe." }
    ],
    correta: "C",
    explicacao: "É uma norma internacional aplicável universalmente. Qualquer entidade que use TI para o negócio pode se beneficiar do modelo da ISO 38500."
  },
  {
    id: 5,
    pergunta: "Complete o modelo EDM da ISO 38500: Governança deve Avaliar, ______ e Monitorar.",
    opcoes: [
      { label: "A", valor: "Desenvolver." },
      { label: "B", valor: "Delegar." },
      { label: "C", valor: "Direcionar (Direct)." },
      { label: "D", valor: "Documentar." },
      { label: "E", valor: "Deletar." }
    ],
    correta: "C",
    explicacao: "O tripé é: Avaliar (entender), Direcionar (dar o rumo) e Monitorar (verificar se o rumo está sendo seguido)."
  },
  {
    id: 6,
    pergunta: "O princípio do 'Comportamento Humano' na ISO 38500 foca em:",
    opcoes: [
      { label: "A", valor: "Substituir humanos por robôs sem sentimentos." },
      { label: "B", valor: "Reconhecer que a TI deve atender às necessidades das pessoas e que o fator humano afeta o sucesso da governança." },
      { label: "C", valor: "Monitorar a vida privada dos funcionários via webcam." },
      { label: "D", valor: "Garantir que todos os funcionários usem terno e gravata." },
      { label: "E", valor: "Obrigar os usuários a memorizar senhas de 50 caracteres." }
    ],
    correta: "B",
    explicacao: "TI não são apenas máquinas; processos de mudança, treinamento e cultura organizacional são vitais para que a governança de fato funcione."
  }
];

// Módulo 5: Planejamento Estratégico (PETI/PDTI)
export const QUIZ_GOVERNANCA_M5: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Qual a diferença fundamental entre PETI (Plano Estratégico de TI) e PDTI (Plano Diretor de TI)?",
    opcoes: [
      { label: "A", valor: "Não há diferença; PDTI é apenas o nome antigo do PETI." },
      { label: "B", valor: "O PETI é tático/operacional, enquanto o PDTI é estratégico de longo prazo." },
      { label: "C", valor: "O PETI define a visão e objetivos de longo prazo, enquanto o PDTI detalha as ações, projetos e recursos para um período menor (ex: 1-2 anos)." },
      { label: "D", valor: "O PETI foca em hardware, o PDTI foca em software." },
      { label: "E", valor: "O PETI é exclusivo para empresas privadas, e o PDTI para empresas públicas." }
    ],
    correta: "C",
    explicacao: "PETI olha para o horizonte estratégico (ex: 5 anos). PDTI é o braço executivo, traduzindo essa estratégia em alocação real de recursos e cronogramas de projetos."
  },
  {
    id: 2,
    pergunta: "A análise SWOT (FOFA) é muito usada no planejamento inicial. O que representa o quadrante de 'Oportunidades'?",
    opcoes: [
      { label: "A", valor: "Fatores internos positivos (ex: equipe altamente qualificada)." },
      { label: "B", valor: "Fatores externos positivos (ex: novas tecnologias cloud que reduzem custos)." },
      { label: "C", valor: "Fatores internos negativos (ex: servidores muito antigos)." },
      { label: "D", valor: "Fatores externos negativos (ex: nova lei de proteção de dados que aumenta o rigor)." },
      { label: "E", valor: "A possibilidade de o diretor de TI ser promovido." }
    ],
    correta: "B",
    explicacao: "Forças/Fraquezas são internas. Oportunidades/Ameaças são externas. Oportunidades são janelas no mercado que a Petrobras pode aproveitar usando TI."
  },
  {
    id: 3,
    pergunta: "O conceito de 'Arquitetura Corporativa' (ex: TOGAF) no planejamento ajuda a:",
    opcoes: [
      { label: "A", valor: "Desenhar as plantas baixas dos escritórios físicos." },
      { label: "B", valor: "Integrar os diferentes domínios de negócio, dados, aplicações e tecnologia de forma coerente." },
      { label: "C", valor: "Escolher a melhor arquitetura de processador (Intel vs AMD)." },
      { label: "D", valor: "Criar logos para os sistemas internos." },
      { label: "E", valor: "Determinar a hierarquia de cargos dentro do RH." }
    ],
    correta: "B",
    explicacao: "A Arquitetura Corporativa evita que a TI seja uma 'colcha de retalhos', garantindo que todos os sistemas 'conversem' entre si e suportem o modelo de negócio."
  },
  {
    id: 4,
    pergunta: "Dentre os benefícios do PDTI em órgãos públicos e estatais, destaca-se:",
    opcoes: [
      { label: "A", valor: "Permitir compras emergenciais sem licitação de qualquer valor." },
      { label: "B", valor: "Garantir a continuidade da TI independentemente de mudanças na gestão política imediata." },
      { label: "C", valor: "Eliminar a necessidade de prestação de contas aos órgãos de controle (ex: TCU)." },
      { label: "D", valor: "Reduzir o quadro de funcionários técnicos concursados." },
      { label: "E", valor: "Centralizar todas as decisões nas mãos de um único técnico." }
    ],
    correta: "B",
    explicacao: "O PDTI traz previsibilidade e blindagem técnica, garantindo que projetos estruturantes (como a digitalização de refinarias) continuem mesmo com trocas de diretores."
  },
  {
    id: 5,
    pergunta: "Na elaboração de um planejamento de TI, a técnica de 'Benchmarking' serve para:",
    opcoes: [
      { label: "A", valor: "Consertar bancos de madeira nos datacenters." },
      { label: "B", valor: "Comparar os processos e desempenho da TI da Petrobras com as melhores práticas de outras grandes empresas do setor." },
      { label: "C", valor: "Realizar o backup completo em fitas magnéticas de baixa densidade." },
      { label: "D", valor: "Medir a velocidade exata de cada tecla digitada pelos analistas." },
      { label: "E", valor: "Limitar o acesso à internet apenas para sites do governo." }
    ],
    correta: "B",
    explicacao: "Benchmarking é olhar para fora para melhorar dentro: o que a Shell ou a BP estão fazendo em Governança de TI que a Petrobras pode adaptar e melhorar?"
  },
  {
    id: 6,
    pergunta: "O 'Missão' da TI descreve:",
    opcoes: [
      { label: "A", valor: "Onde a TI quer estar daqui a 50 anos." },
      { label: "B", valor: "A razão de ser e a finalidade atual da TI para a organização." },
      { label: "C", valor: "A lista de compras de hardware para a próxima semana." },
      { label: "D", valor: "O código-fonte principal do sistema ERP." },
      { label: "E", valor: "O endereço físico do prédio principal da TI." }
    ],
    correta: "B",
    explicacao: "Enquanto a Visão foca no futuro (sonho), a Missão foca no presente (propósito): 'Fornecer soluções de TI seguras e inovadoras para a energia do Brasil'."
  }
];

// Módulo 6: Gestão de Riscos (ISO 31000 / BIA)
export const QUIZ_GOVERNANCA_M6: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Na Gestão de Riscos (ISO 31000), o 'Risco Residual' é definido como:",
    opcoes: [
      { label: "A", valor: "O risco total antes de qualquer controle ser aplicado." },
      { label: "B", valor: "A sobra de dinheiro no orçamento após investir em segurança." },
      { label: "C", valor: "O risco que permanece após o tratamento do risco (aplicação de controles)." },
      { label: "D", valor: "O risco de lixo eletrônico acumulado nos depósitos." },
      { label: "E", valor: "A probabilidade de um funcionário pedir demissão após um erro." }
    ],
    correta: "C",
    explicacao: "Nenhum controle elimina 100% o risco. O Risco Frequente - Mitigação = Risco Residual. A governança deve decidir se esse resíduo é aceitável (Apetite ao Risco)."
  },
  {
    id: 2,
    pergunta: "O BIA (Business Impact Analysis) é fundamental para a Continuidade de Negócio. O que ele avalia?",
    opcoes: [
      { label: "A", valor: "A conta de luz do prédio administrativo." },
      { label: "B", valor: "O impacto financeiro, operacional e reputacional da interrupção de cada processo crítico de negócio." },
      { label: "C", valor: "A velocidade média da digitação dos operadores de caixa." },
      { label: "D", valor: "A quantidade de café consumida pela equipe de TI." },
      { label: "E", valor: "O número de seguidores da empresa nas redes sociais." }
    ],
    correta: "B",
    explicacao: "O BIA ajuda a priorizar: se o sistema de controle da refinaria parar, o impacto é gigante (imediato). Se o sistema de reservas de salas parar, o impacto é menor. O BIA define o que salvar primeiro."
  },
  {
    id: 3,
    pergunta: "Em relação ao tratamento de riscos, a estratégia de 'Transferir' envolve:",
    opcoes: [
      { label: "A", valor: "Ignorar o risco e torcer para nada acontecer." },
      { label: "B", valor: "Instalar antivírus em todas as máquinas." },
      { label: "C", valor: "Contratar um seguro cibernético ou terceirizar a atividade para um especialista que assuma o risco sob contrato." },
      { label: "D", valor: "Demitir o gestor de riscos atual." },
      { label: "E", valor: "Mudar o datacenter de lugar fisicamente." }
    ],
    correta: "C",
    explicacao: "Transferir (ou Compartilhar) é passar o impacto financeiro para outrem. Muito comum em seguros contra desastres naturais ou ataques ransomware."
  },
  {
    id: 4,
    pergunta: "Qual é o principal objetivo de se definir o 'Apetite ao Risco' em uma organização como a Petrobras?",
    opcoes: [
      { label: "A", valor: "Incentivar os funcionários a serem imprudentes e gastarem sem limites." },
      { label: "B", valor: "Estabelecer o nível de risco que a empresa está disposta a aceitar na busca de seus objetivos estratégicos." },
      { label: "C", valor: "Garantir que todos os riscos sejam zerados imediatamente, custe o que custar." },
      { label: "D", valor: "Comprar a maior quantidade possível de equipamentos de rede WiFi." },
      { label: "E", valor: "Delegar a gestão de riscos apenas para a equipe de limpeza." }
    ],
    correta: "B",
    explicacao: "Apetite ao Risco dá o tom da Governança: Se a Petrobras quer inovar em exploração no pré-sal Profundo, ela aceita riscos tecnológicos maiores do que em processos administrativos burocráticos."
  },
  {
    id: 5,
    pergunta: "O conceito de 'Probabilidade' e 'Impacto' é usado para:",
    opcoes: [
      { label: "A", valor: "Calcular o bônus de natal dos funcionários." },
      { label: "B", valor: "Priorizar riscos em uma matriz, focando naqueles com alta chance de ocorrer e grandes danos potenciais." },
      { label: "C", valor: "Medir a distância entre os roteadores da empresa." },
      { label: "D", valor: "Contar a quantidade de e-mails enviados por hora." },
      { label: "E", valor: "Avaliar o tempo de vida útil das lâmpadas de LED." }
    ],
    correta: "B",
    explicacao: "Um risco com baixa probabilidade e baixo impacto é apenas monitorado. Um com alta probabilidade e alto impacto exige ação imediata e robusta."
  },
  {
    id: 6,
    pergunta: "A ISO 31000 foca na criação e proteção de:",
    opcoes: [
      { label: "A", valor: "Dados criptografados apenas." },
      { label: "B", valor: "Software Open Source." },
      { label: "C", valor: "Valor (Value)." },
      { label: "D", valor: "Hardwares de última geração." },
      { label: "E", valor: "Papéis e documentos físicos." }
    ],
    correta: "C",
    explicacao: "O objetivo final da gestão de riscos não é apenas 'não ter problemas', mas garantir que a criação de valor da organização continue protegida contra incertezas."
  }
];

// Módulo 7: Auditoria e Conformidade (SOX/LGPD)
export const QUIZ_GOVERNANCA_M7: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A Lei Sarbanes-Oxley (SOX), relevante para a Petrobras devido à listagem na bolsa de Nova York, foca principalmente em:",
    opcoes: [
      { label: "A", valor: "Privacidade de dados pessoais de funcionários." },
      { label: "B", valor: "Confiabilidade dos relatórios financeiros e controles internos contra fraudes." },
      { label: "C", valor: "Aumentar a velocidade dos processadores em 20% ao ano." },
      { label: "D", valor: "Padronizar o uso de sistemas operacionais open source." },
      { label: "E", valor: "Garantir que todos os diretores tenham curso superior em economia." }
    ],
    correta: "B",
    explicacao: "A SOX surgiu após escândalos financeiros (Enron/WorldCom). Para a TI, ela exige controles rígidos de acesso e integridade de dados que alimentam o balanço financeiro."
  },
  {
    id: 2,
    pergunta: "Na LGPD (Lei Geral de Proteção de Dados), o 'DPO' (Data Protection Officer) tem a função de:",
    opcoes: [
      { label: "A", valor: "Desenvolver o código de criptografia do banco de dados." },
      { label: "B", valor: "Atuar como canal de comunicação entre o controlador, os titulares dos dados e a autoridade nacional (ANPD)." },
      { label: "C", valor: "Pagar as multas caso a empresa sofra um vazamento." },
      { label: "D", valor: "Reiniciar o servidor sempre que houver um erro de login." },
      { label: "E", valor: "Vender dados de clientes para empresas de marketing parceiras." }
    ],
    correta: "B",
    explicacao: "O Encarregado (DPO) é a ponte entre a Petrobras e os órgãos reguladores, além de garantir que a empresa siga as normas de privacidade."
  },
  {
    id: 3,
    pergunta: "Qual a diferença entre Auditoria Interna e Auditoria Externa?",
    opcoes: [
      { label: "A", valor: "Interna audita funcionários; Externa audita computadores." },
      { label: "B", valor: "Interna pertence à própria empresa; Externa é realizada por entidade independente." },
      { label: "C", valor: "Não há diferença; o público alvo é sempre o mesmo." },
      { label: "D", valor: "Interna foca em software; Externa foca apenas em hardware." },
      { label: "E", valor: "A Auditoria Interna é proibida por lei em estatais." }
    ],
    correta: "B",
    explicacao: "A Auditoria Interna ajuda a gestão a melhorar processos. A Externa dá confiança ao mercado e acionistas de que o que está sendo reportado é verídico e imparcial."
  },
  {
    id: 4,
    pergunta: "Um controle preventivo de TI, importante para conformidade, seria:",
    opcoes: [
      { label: "A", valor: "Análise de logs de invasão após o ataque ter ocorrido." },
      { label: "B", valor: "Restauração de backup de um banco de dados corrompido." },
      { label: "C", valor: "Treinamento de conscientização de segurança e controle de acesso biométrico." },
      { label: "D", valor: "Notificação à imprensa sobre um vazamento de dados." },
      { label: "E", valor: "Substituição de um HD queimado." }
    ],
    correta: "C",
    explicacao: "Controles preventivos agem ANTES do erro/ataque. Treinamento e barreiras de acesso evitam que o problema ocorra."
  },
  {
    id: 5,
    pergunta: "O conceito de 'Privacy by Design' na LGPD significa:",
    opcoes: [
      { label: "A", valor: "Deixar o design do site mais bonito e colorido." },
      { label: "B", valor: "Pensar na privacidade e proteção de dados desde a concepção de um novo sistema ou projeto." },
      { label: "C", valor: "Bloquear todos os acessos ao banco de dados, tornando o sistema inútil." },
      { label: "D", valor: "Pedir desculpas aos usuários apenas após os dados terem vazado." },
      { label: "E", valor: "Contratar uma agência de publicidade para proteger a imagem da empresa." }
    ],
    correta: "B",
    explicacao: "Privacidade não deve ser um adesivo colocado no final do projeto, mas algo embutido na arquitetura do sistema desde o dia 1."
  },
  {
    id: 6,
    pergunta: "A 'Segregação de Funções' na auditoria de TI serve para:",
    opcoes: [
      { label: "A", valor: "Fazer com que uma única pessoa tenha acesso total a todos os sistemas." },
      { label: "B", valor: "Garantir que quem desenvolve o sistema não seja o mesmo que o aprova para produção, reduzindo riscos de fraudes ou erros não detectados." },
      { label: "C", valor: "Aumentar a carga horária de trabalho para todos os funcionários." },
      { label: "D", valor: "Dividir o departamento de TI em prédios diferentes em cidades opostas." },
      { label: "E", valor: "Eliminar a necessidade de senhas para todos os diretores." }
    ],
    correta: "B",
    explicacao: "Se eu desenvolvo e aprovo meu próprio código, posso inserir uma 'backdoor' maliciosa. A segregação de funções cria um sistema de 'check and balance' (freios e contrapesos)."
  }
];

// Módulo 8: Gestão de Terceirizados e SLA
export const QUIZ_GOVERNANCA_M8: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "O que é um SLA (Service Level Agreement) no contexto de suporte de TI terceirizado para a Petrobras?",
    opcoes: [
      { label: "A", valor: "Um software de acesso remoto para consertar mouses." },
      { label: "B", valor: "Um acordo formal que define níveis de serviço mensuráveis, como tempo de resposta e disponibilidade." },
      { label: "C", valor: "Un sistema de login automático para funcionários terceiros." },
      { label: "D", valor: "A sigla para 'Solid State Drive' em português." },
      { label: "E", valor: "Um imposto sobre a venda de serviços tecnológicos." }
    ],
    correta: "B",
    explicacao: "O SLA é o contrato que garante que o fornecedor entregue o que prometeu. Se o contrato diz disponível 99.9% do tempo, e cair mais, há multas ou penalidades."
  },
  {
    id: 2,
    pergunta: "Diferença entre SLA (Service Level Agreement) e OLA (Operational Level Agreement):",
    opcoes: [
      { label: "A", valor: "O SLA é entre TI e Cliente; o OLA é entre equipes internas da TI para suportar o SLA." },
      { label: "B", valor: "O OLA é muito mais importante que o SLA em termos legais." },
      { label: "C", valor: "O SLA foca em hardware; o OLA foca exclusivamente em software." },
      { label: "D", valor: "Não há diferença; são nomes diferentes para o mesmo documento técnico." },
      { label: "E", valor: "O OLA é o manual de instruções dos servidores." }
    ],
    correta: "A",
    explicacao: "Se a TI promete 2 horas para consertar um PC (SLA), a equipe de redes e a equipe de logística precisam ter um acordo interno (OLA) de 30 minutos cada para que o prazo final seja cumprido."
  },
  {
    id: 3,
    pergunta: "Qual o risco principal do 'Lock-in' em fornecedores de nuvem (Cloud)?",
    opcoes: [
      { label: "A", valor: "A conta de luz ficar muito alta por usar muitos servidores." },
      { label: "B", valor: "A dependência excessiva de um único fornecedor, dificultando a migração para outro devido a tecnologias proprietárias ou altos custos de saída." },
      { label: "C", valor: "O risco de o servidor físico cair no chão por falta de travas." },
      { label: "D", valor: "A necessidade de usar senhas complexas para acessar o dashboard." },
      { label: "E", valor: "A impossibilidade de usar mouses sem fio na nuvem." }
    ],
    correta: "B",
    explicacao: "Vendor Lock-in é uma preocupação de Governança. Estratégias de Multi-cloud ou uso de tecnologias abertas (como Kubernetes) visam mitigar esse risco para a Petrobras."
  },
  {
    id: 4,
    pergunta: "Na gestão de fornecedores, a técnica de 'Souring Strategy' serve para:",
    opcoes: [
      { label: "A", valor: "Decidir se a TI deve desenvolver internamente (Insourcing) ou contratar fora (Outsourcing)." },
      { label: "B", valor: "Criar códigos de programação para sites de faturamento." },
      { label: "C", valor: "Organizar as festas de final de ano da empresa." },
      { label: "D", valor: "Limitar o acesso dos funcionários terceiros ao cafezinho." },
      { label: "E", valor: "Substituir todos os fornecedores por inteligência artificial." }
    ],
    correta: "A",
    explicacao: "Souring define o 'Make vs Buy'. Atividades core (estratégicas) costumam ser mantidas em casa (concursados), enquanto atividades commoditizadas podem ser terceirizadas."
  },
  {
    id: 5,
    pergunta: "Um KPI (Indicador Chave de Desempenho) importante para gerenciar contratos de Service Desk (Suporte) seria:",
    opcoes: [
      { label: "A", valor: "A marca do café servido na recepção do fornecedor." },
      { label: "B", valor: "A porcentagem de incidentes resolvidos no primeiro contato (First Call Resolution - FCR)." },
      { label: "C", valor: "O número total de janelas no escritório do fornecedor." },
      { label: "D", valor: "A cor das camisetas dos técnicos de campo." },
      { label: "E", valor: "O número de vezes que a palavra 'computador' foi dita em um dia." }
    ],
    correta: "B",
    explicacao: "FCR alto indica eficiência do fornecedor e satisfação do usuário Petrobras, pois o problema é resolvido de imediato sem idas e vindas de chamados."
  },
  {
    id: 6,
    pergunta: "Os 'Underpinning Contracts' (Contratos de Apoio) são firmados entre:",
    opcoes: [
      { label: "A", valor: "A Petrobras e seus clientes externos." },
      { label: "B", valor: "O provedor de serviços de TI e seus fornecedores externos de suporte." },
      { label: "C", valor: "O RH e os novos funcionários concursados." },
      { label: "D", valor: "A diretoria e o conselho de administração." },
      { label: "E", valor: "A empresa de energia e o datacenter local." }
    ],
    correta: "B",
    explicacao: "Se a TI da Petrobras contrata a Empresa X para o Service Desk, e a Empresa X contrata a Empresa Y para as peças de reposição, o contrato entre X e Y é o 'Underpinning Contract'."
  }
];

// Módulo 9: Metas e Indicadores (KPIs/BSC)
export const QUIZ_GOVERNANCA_M9: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "O Balanced Scorecard (BSC) expande a visão do negócio para além do financeiro. Quais são as quatro perspectivas originais do BSC?",
    opcoes: [
      { label: "A", valor: "Hardware, Software, Redes e Pessoas." },
      { label: "B", valor: "Financeira, Clientes, Processos Internos e Aprendizado/Crescimento." },
      { label: "C", valor: "Segurança, Rapidez, Disponibilidade e Custo." },
      { label: "D", valor: "Brasil, Exterior, Offshore e Onshore." },
      { label: "E", valor: "Passado, Presente, Futuro e Eternidade." }
    ],
    correta: "B",
    explicacao: "O BSC permite que a governança de TI monitore não só o orçamento (Financeira), mas também se os usuários estão satisfeitos (Clientes) e se a equipe está se capacitando (Aprendizado)."
  },
  {
    id: 2,
    pergunta: "Um Indicador de TI (KPI) de 'Aprendizado e Crescimento' na Petrobras seria:",
    opcoes: [
      { label: "A", valor: "A receita líquida trimestral da venda de diesel." },
      { label: "B", valor: "O número de certificações técnicas obtidas pela equipe de analistas no ano." },
      { label: "C", valor: "O tempo de atividade (uptime) do site oficial da empresa." },
      { label: "D", valor: "O custo unitário de cada notebook comprado." },
      { label: "E", valor: "A marca das impressoras utilizadas na administração." }
    ],
    correta: "B",
    explicacao: "Certificações indicam que o capital intelectual está crescendo, o que é base para melhorar processos e satisfazer clientes no longo prazo."
  },
  {
    id: 3,
    pergunta: "A característica 'M' no critério S.M.A.R.T. para metas significa que a meta deve ser:",
    opcoes: [
      { label: "A", valor: "Magnífica e Impressionante." },
      { label: "B", valor: "Mensurável (capaz de ser medida quantitativamente)." },
      { label: "C", valor: "Manual (feita sem ajuda de computadores)." },
      { label: "D", valor: "Misturada com outras metas do departamento." },
      { label: "E", valor: "Misteriosa para a concorrência." }
    ],
    correta: "B",
    explicacao: "Se você não pode medir, você não pode gerenciar. 'Melhorar a TI' não é SMART. 'Reduzir o tempo de chamado em 20%' é Mensurável."
  },
  {
    id: 4,
    pergunta: "Qual a principal diferença entre um KPI (Key Performance Indicator) e uma Métrica comum?",
    opcoes: [
      { label: "A", valor: "Métricas são números brutos; KPIs são as métricas essenciais para o sucesso estratégico." },
      { label: "B", valor: "KPIs são apenas para executivos, métricas são apenas para técnicos." },
      { label: "C", valor: "KPIs são sempre em dólares, métricas são sempre em porcentagens." },
      { label: "D", valor: "Não há diferença real; os nomes são usados aleatoriamente nas empresas." },
      { label: "E", valor: "KPIs são proibidos em relatórios de governança." }
    ],
    correta: "A",
    explicacao: "Temos milhares de métricas (número de e-mails, acessos, etc), mas apenas algumas 'Chaves' (KPIs) realmente dizem se a Petrobras está vencendo no negócio."
  },
  {
    id: 5,
    pergunta: "Um Dashbord de Governança de TI deve priorizar:",
    opcoes: [
      { label: "A", valor: "Toda e qualquer informação técnica disponível para encher a tela." },
      { label: "B", valor: "Visualização clara e rápida dos indicadores críticos que permitem tomada de decisão." },
      { label: "C", valor: "Gráficos em 3D complexos que ninguém consegue ler." },
      { label: "D", valor: "Apenas fotos da diretoria em eventos sociais." },
      { label: "E", valor: "O link para o sistema de previsão do tempo local." }
    ],
    correta: "B",
    explicacao: "Dashboard (Painel) serve para ação. Se o KPI de segurança 'tá no vermelho' (muitos ataques), o gestor deve ver isso de imediato para direcionar recursos."
  },
  {
    id: 6,
    pergunta: "No BSC aplicado à TI, a perspectiva de 'Processos Internos' foca em:",
    opcoes: [
      { label: "A", valor: "Publicidade da empresa no horário nobre da TV." },
      { label: "B", valor: "Eficiência e eficácia operacional da TI (ex: fluxos de desenvolvimento e suporte)." },
      { label: "C", valor: "Número de cafezinhos vendidos na lanchonete." },
      { label: "D", valor: "O valor da ação da Petrobras na bolsa." },
      { label: "E", valor: "O treinamento físico dos marinheiros da frota." }
    ],
    correta: "B",
    explicacao: "Processos internos são o 'motor' da TI. Se o motor é eficiente (ex: Deploy ágil), os resultados finais para o cliente tendem a ser melhores."
  }
];

// Módulo 10: Governança Ágil e Transição Digital
export const QUIZ_GOVERNANCA_M10: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A Transição Energética da Petrobras exige uma 'Transição Digital'. O que caracteriza a Governança Ágil nesse cenário?",
    opcoes: [
      { label: "A", valor: "Eliminar todos os controles de segurança para ganhar velocidade." },
      { label: "B", valor: "Substituir burocracia pesada por ciclos rápidos de feedback, colaboração e governança adaptativa." },
      { label: "C", valor: "Fazer tudo por e-mail e planilhas, sem usar ferramentas modernas." },
      { label: "D", valor: "Obrigar todos os analistas a correrem nos corredores para mostrar agilidade." },
      { label: "E", valor: "Ignorar as leis de licitação para comprar software em 5 minutos." }
    ],
    correta: "B",
    explicacao: "Governança ágil não é 'bagunça agilizada'. É manter o controle e o direcionamento estratégico, mas de forma mais fluida, removendo gargalos desnecessários."
  },
  {
    id: 2,
    pergunta: "Qual o papel do 'Cloud Governance' (Governança em Nuvem) na economia moderna?",
    opcoes: [
      { label: "A", valor: "Proibir o uso da nuvem para evitar riscos." },
      { label: "B", valor: "Garantir o controle de custos (FinOps), conformidade e segurança em ambientes de nuvem elásticos." },
      { label: "C", valor: "Mudar o nome de todos os servidores para 'Nuvem 01, 02...'." },
      { label: "D", valor: "Comprar mais HDs externos para guardar a nuvem em casa." },
      { label: "E", valor: "Contratar o Google apenas para usar o motor de busca." }
    ],
    correta: "B",
    explicacao: "Como a nuvem é fácil de contratar e escalar, se não houver governança (FinOps), os gastos da Petrobras podem explodir sem controle."
  },
  {
    id: 3,
    pergunta: "A 'Inovação Aberta' na Petrobras, mediada por Governança de TI, envolve:",
    opcoes: [
      { label: "A", valor: "Deixar as portas do Data Center abertas para qualquer pessoa entrar." },
      { label: "B", valor: "Colaborar com startups, universidades e outras empresas para acelerar soluções tecnológicas." },
      { label: "C", valor: "Publicar todas as senhas dos diretores no jornal oficial." },
      { label: "D", valor: "Democratizar o acesso ao código-fonte secreto de exploração para qualquer competidor." },
      { label: "E", valor: "Substituir a TI interna por estagiários de design gráfico." }
    ],
    correta: "B",
    explicacao: "A Governança de Inovação Aberta estabelece regras para parcerias, garantindo que a PI (Propriedade Intelectual) seja protegida enquanto a empresa absorve agilidade externa."
  },
  {
    id: 4,
    pergunta: "O conceito de 'Shadow IT' refere-se a:",
    opcoes: [
      { label: "A", valor: "Um sistema de inteligência artificial que trabalha nas sombras." },
      { label: "B", valor: "O uso de softwares e serviços de TI por departamentos sem o conhecimento ou aprovação da Governança Central." },
      { label: "C", valor: "Modo escuro (Dark Mode) em todos os editores de texto." },
      { label: "D", valor: "Servidores que ficam localizados no porão dos prédios." },
      { label: "E", valor: "O departamento de espionagem tecnológica da empresa." }
    ],
    correta: "B",
    explicacao: "Shadow IT é um pesadelo de governança: traz riscos de segurança e desperdício de dinheiro (compras duplicadas). A governança moderna busca entender por que os usuários usam Shadow IT e integrar essas necessidades."
  },
  {
    id: 5,
    pergunta: "Qual a importância da ética na Inteligência Artificial (Governança de IA) para a Petrobras?",
    opcoes: [
      { label: "A", valor: "Nenhuma, a IA deve apenas calcular lucros e ignorar princípios." },
      { label: "B", valor: "Garantir transparência, evitar vieses discriminatórios e assegurar a responsabilidade humana nas decisões automáticas." },
      { label: "C", valor: "Fazer com que a IA aprenda a contar piadas éticas nos intervalos." },
      { label: "D", valor: "Monitorar se os robôs estão sendo educados uns com os outros." },
      { label: "E", valor: "Eliminar a necessidade de advogados na empresa." }
    ],
    correta: "B",
    explicacao: "A IA toma decisões críticas (ex: onde perfurar poços ou quem contratar). Governança de IA assegura que esses algoritmos sejam auditáveis e justos."
  },
  {
    id: 6,
    pergunta: "No contexto da Transformação Digital, o 'Mindset Ágil' na governança prioriza:",
    opcoes: [
      { label: "A", valor: "Documentação exaustiva de mil páginas antes de cada clique." },
      { label: "B", valor: "Pessoas e interações acima de processos e ferramentas (conforme Manifesto Ágil)." },
      { label: "C", valor: "Hierarquias rígidas com 15 níveis de aprovação para um teclado novo." },
      { label: "D", valor: "O uso obrigatório de máquinas de escrever para documentos oficiais." },
      { label: "E", valor: "Centralizar todas as decisões de comando no presidente da empresa apenas." }
    ],
    correta: "B",
    explicacao: "Mesmo em ambiente corporativo pesado, a agilidade na governança foca em habilitar o negócio a andar rápido com segurança, e não em ser um impedimento burocrático."
  }
];
