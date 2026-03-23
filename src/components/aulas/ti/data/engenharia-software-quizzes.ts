import { QuizQuestion } from "../../shared";

export const QUIZ_M1_PROCESSOS_MATURIDADE: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A Petrobras utiliza modelos de maturidade para garantir a qualidade de seus processos de software. O modelo CMMI (Capability Maturity Model Integration) define cinco níveis de maturidade. Qual nível é caracterizado pela medição quantitativa dos processos e do controle estatístico?",
    opcoes: [
      { label: "A", valor: "Nível 1 - Inicial" },
      { label: "B", valor: "Nível 2 - Gerenciado" },
      { label: "C", valor: "Nível 3 - Definido" },
      { label: "D", valor: "Nível 4 - Gerenciado Quantitativamente" },
      { label: "E", valor: "Nível 5 - Em Otimização" },
    ],
    correta: "D",
    explicacao: "O Nível 4 (Gerenciado Quantitativamente) foca na estabilidade do processo através de técnicas estatísticas e quantitativas. Os níveis anteriores focam em definições qualitativas.",
  },
  {
    id: 2,
    pergunta: "No modelo MPS.BR (Melhoria de Processos do Software Brasileiro), os níveis de maturidade variam de A a G. Qual nível do MPS.BR é equivalente ao Nível 2 do CMMI?",
    opcoes: [
      { label: "A", valor: "Nível A" },
      { label: "B", valor: "Nível C" },
      { label: "C", valor: "Nível E" },
      { label: "D", valor: "Nível G" },
      { label: "E", valor: "Nível F" },
    ],
    correta: "D",
    explicacao: "O MPS.BR define o Nível G (Parcialmente Gerenciado) como a base, sendo o equivalente aproximado ao Nível 2 do CMMI (Gerenciado).",
  },
  {
    id: 3,
    pergunta: "Uma empresa de TI que presta serviços à Petrobras deseja implementar o CMMI Nível 3. Qual característica diferencia o Nível 2 do Nível 3?",
    opcoes: [
      { label: "A", valor: "O Nível 3 introduz a medição de performance individual." },
      { label: "B", valor: "No Nível 3, os processos são padronizados para toda a organização, enquanto no Nível 2 são específicos por projeto." },
      { label: "C", valor: "O Nível 3 foca exclusivamente em metodologias ágeis." },
      { label: "D", valor: "No Nível 3, não há necessidade de planejar o cronograma." },
      { label: "E", valor: "O Nível 2 é voltado para hardware, e o Nível 3 para software." },
    ],
    correta: "B",
    explicacao: "A grande diferença entre o nível 'Gerenciado' (2) e o 'Definido' (3) é a institucionalização de processos em nível organizacional no Nível 3.",
  },
  {
    id: 4,
    pergunta: "Sobre a norma ISO/IEC 12207, que trata dos processos de ciclo de vida de software, qual categoria de processo inclui a 'Aquisição' e o 'Fornecimento'?",
    opcoes: [
      { label: "A", valor: "Processos de Apoio" },
      { label: "B", valor: "Processos Organizacionais" },
      { label: "C", valor: "Processos Primários" },
      { label: "D", valor: "Processos Técnicos" },
      { label: "E", valor: "Processos de Gestão" },
    ],
    correta: "C",
    explicacao: "Segundo a ISO 12207, os processos primários são Aquisição, Fornecimento, Desenvolvimento, Operação e Manutenção.",
  },
  {
    id: 5,
    pergunta: "Em um processo de avaliação MPS.BR, o que representa a sigla GRP?",
    opcoes: [
      { label: "A", valor: "Gestão de Requisitos de Petróleo" },
      { label: "B", valor: "Guia de Revisão de Processos" },
      { label: "C", valor: "Guia de Referência de Processos" },
      { label: "D", valor: "Grupo de Resposta a Projetos" },
      { label: "E", valor: "Garantia de Resultados Padrão" },
    ],
    correta: "C",
    explicacao: "O MPS.BR é composto pelo MR-MPS (Modelo de Referência), MA-MPS (Método de Avaliação) e o GRP (Guia de Referência de Processos).",
  },
  {
    id: 6,
    pergunta: "Qual nível de maturidade do CMMI foca na melhoria contínua baseada no entendimento das variações comuns?",
    opcoes: [
      { label: "A", valor: "Nível 5 - Em Otimização" },
      { label: "B", valor: "Nível 4 - Gerenciado" },
      { label: "C", valor: "Nível 3 - Definido" },
      { label: "D", valor: "Nível 2 - Inicial" },
      { label: "E", valor: "Nível 1 - Gestão" },
    ],
    correta: "A",
    explicacao: "O Nível 5 (Em Otimização) é o patamar onde a empresa foca em melhorias preventivas e inovações baseadas em dados quantitativos.",
  },
];

export const QUIZ_M2_CICLO_VIDA: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "O modelo de ciclo de vida em 'Cascata' (Waterfall) é conhecido por sua natureza sequencial. Qual das seguintes situações mais justifica a escolha desse modelo em um projeto da Petrobras?",
    opcoes: [
      { label: "A", valor: "Requisitos altamente mutáveis e desconhecidos." },
      { label: "B", valor: "Necessidade de entrega frequente de funcionalidades parciais." },
      { label: "C", valor: "Requisitos bem definidos, estáveis e que dificilmente mudarão." },
      { label: "D", valor: "Desenvolvimento de um sistema de IA com pesquisa exploratória." },
      { label: "E", valor: "Projetos de curta duração com equipes pequenas e sem documentação." },
    ],
    correta: "C",
    explicacao: "O modelo Cascata exige que uma fase termine para a outra começar, sendo ideal quando o escopo é fechado e os requisitos são sólidos desde o início.",
  },
  {
    id: 2,
    pergunta: "Barry Boehm propôs o Modelo Espiral para lidar com um aspecto crítico do desenvolvimento de software. Qual é esse foco principal?",
    opcoes: [
      { label: "A", valor: "Redução do custo de hardware." },
      { label: "B", valor: "Análise de Riscos em cada iteração." },
      { label: "C", valor: "Documentação extensa de cada linha de código." },
      { label: "D", valor: "Layout do banco de dados." },
      { label: "E", valor: "Velocidade máxima de codificação inicial." },
    ],
    correta: "B",
    explicacao: "O Modelo Espiral é orientado a riscos. Cada 'volta' na espiral inclui uma fase explícita de análise e mitigação de riscos.",
  },
  {
    id: 3,
    pergunta: "Qual a principal diferença entre o modelo Incremental e o Iterativo?",
    opcoes: [
      { label: "A", valor: "O Incremental foca em entregar partes do sistema, enquanto o Iterativo foca em refinar o sistema como um todo a cada ciclo." },
      { label: "B", valor: "O Incremental é ágil e o Iterativo é clássico." },
      { label: "C", valor: "Não há diferença, são sinônimos." },
      { label: "D", valor: "O Incremental não permite testes, apenas o Iterativo." },
      { label: "E", valor: "O Iterativo é exclusivo para bancos de dados." },
    ],
    correta: "A",
    explicacao: "No Incremental, entregamos fatias funcionais (ex: módulo de login primeiro). No Iterativo, entregamos o rascunho de tudo e vamos detalhando.",
  },
  {
    id: 4,
    pergunta: "Sobre o RUP (Rational Unified Process), qual das fases abaixo foca na definição da arquitetura e na mitigação dos maiores riscos técnicos?",
    opcoes: [
      { label: "A", valor: "Concepção (Inception)" },
      { label: "B", valor: "Elaboração (Elaboration)" },
      { label: "C", valor: "Construção (Construction)" },
      { label: "D", valor: "Transição (Transition)" },
      { label: "E", valor: "Manutenção (Maintenance)" },
    ],
    correta: "B",
    explicacao: "A fase de Elaboração do RUP é onde a arquitetura é estabilizada e os riscos tecnológicos são atacados através de protótipos executáveis.",
  },
  {
    id: 5,
    pergunta: "O modelo de Prototipação é frequentemente utilizado em conjunto com outros modelos. Qual sua maior vantagem?",
    opcoes: [
      { label: "A", valor: "Eliminar a necessidade de programação real." },
      { label: "B", valor: "Reduzir o tempo total de testes de unidade." },
      { label: "C", valor: "Permitir que o usuário entenda e valide os requisitos antes do desenvolvimento pesado." },
      { label: "D", valor: "Aumentar a complexidade do sistema propositalmente." },
      { label: "E", valor: "Gerar código de produção automaticamente sem erros." },
    ],
    correta: "C",
    explicacao: "Prototipar ajuda a validar a interface e o fluxo de negócio com o stakeholder, evitando retrabalho por má interpretação de requisitos.",
  },
  {
    id: 6,
    pergunta: "Um analista da Petrobras deve escolher um modelo para um sistema crítico onde o custo de uma falha é imenso e o tempo não é o fator principal. Qual modelo clássico seria mais prudente?",
    opcoes: [
      { label: "A", valor: "RAD (Rapid Application Development)" },
      { label: "B", valor: "Espiral, devido à forte análise de riscos." },
      { label: "C", valor: "Codificar e Fixar (Code-and-Fix)" },
      { label: "D", valor: "Desenvolvimento Ágil Extremo." },
      { label: "E", valor: "Modelo 'Big Bang'." },
    ],
    correta: "B",
    explicacao: "O Modelo Espiral, com seu rigor na análise de riscos em cada etapa, é o mais adequado para sistemas onde a segurança e a confiabilidade são vitais.",
  },
];

export const QUIZ_M3_REQUISITOS: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Em um projeto de software para monitoramento de poços, o requisito 'O sistema deve permitir a exportação de relatórios em formato PDF' é classificado como:",
    opcoes: [
      { label: "A", valor: "Requisito Não-Funcional de Performance." },
      { label: "B", valor: "Requisito Funcional." },
      { label: "C", valor: "Requisito de Domínio." },
      { label: "D", valor: "Requisito Não-Funcional de Interface." },
      { label: "E", valor: "Constraint (Restrição)." },
    ],
    correta: "B",
    explicacao: "Requisitos funcionais descrevem o QUE o sistema faz (funcionalidades). Exportar um relatório é uma ação/função específica.",
  },
  {
    id: 2,
    pergunta: "Sobre o requisito 'O sistema deve processar 10.000 sinais por segundo com latência inferior a 50ms', podemos afirmar que se trata de um:",
    opcoes: [
      { label: "A", valor: "Requisito Funcional de dados." },
      { label: "B", valor: "Requisito Não-Funcional de Eficiência/Performance." },
      { label: "C", valor: "User Story (História de Usuário)." },
      { label: "D", valor: "Processo de Negócio." },
      { label: "E", valor: "Atributo de Qualidade Estético." },
    ],
    correta: "B",
    explicacao: "Requisitos não-funcionais descrevem COMO o sistema deve se comportar em relação a métricas de qualidade, como performance e disponibilidade.",
  },
  {
    id: 3,
    pergunta: "Qual técnica de elicitação de requisitos é mais produtiva quando se deseja obter informações de um grupo de stakeholders com opiniões divergentes em pouco tempo?",
    opcoes: [
      { label: "A", valor: "Questionários (Survey)" },
      { label: "B", valor: "Entrevistas individuais" },
      { label: "C", valor: "Workshop JAD (Joint Application Development)" },
      { label: "D", valor: "Observação Passiva (Etnografia)" },
      { label: "E", valor: "Análise de Documentos" },
    ],
    correta: "C",
    explicacao: "O JAD reúne stakeholders chave e desenvolvedores em sessões intensivas para chegar a um consenso rápido sobre o escopo do software.",
  },
  {
    id: 4,
    pergunta: "Na Engenharia de Requisitos, o que é o 'Impact Analysis'?",
    opcoes: [
      { label: "A", valor: "Análise de quanto o software pesa no disco rígido." },
      { label: "B", valor: "Estudo para avaliar as consequências de uma mudança de requisito em outras partes do sistema." },
      { label: "C", valor: "Medição do impacto ambiental do servidor." },
      { label: "D", valor: "Avaliação do impacto psicológico no usuário final." },
      { label: "E", valor: "Teste de estresse de hardware." },
    ],
    correta: "B",
    explicacao: "Mudar um requisito pode quebrar códigos ou banco de dados; a análise de impacto serve para estimar o custo e o risco dessa alteração.",
  },
  {
    id: 5,
    pergunta: "Quais são os três níveis de requisitos definidos por Karl Wiegers?",
    opcoes: [
      { label: "A", valor: "Hardware, Software e Rede." },
      { label: "B", valor: "Nível 1, 2 e 3 do CMMI." },
      { label: "C", valor: "Requisitos de Negócio, Requisitos de Usuário e Requisitos de Sistema." },
      { label: "D", valor: "Funcionais, Não-Funcionais e Legais." },
      { label: "E", valor: "Simples, Médios e Complexos." },
    ],
    correta: "C",
    explicacao: "Wiegers propõe essa pirâmide: Business Requirements (Visão), User Requirements (Casos de Uso) e System Requirements (Funcionais/Não-Funcionais).",
  },
  {
    id: 6,
    pergunta: "O que caracteriza a fase de 'Validação de Requisitos'?",
    opcoes: [
      { label: "A", valor: "Codificar as classes primárias." },
      { label: "B", valor: "Garantir que os requisitos documentados realmente refletem as necessidades dos stakeholders." },
      { label: "C", valor: "Verificar se o código-fonte está compilando." },
      { label: "D", valor: "Instalar o banco de dados de produção." },
      { label: "E", valor: "Treinar o suporte técnico." },
    ],
    correta: "B",
    explicacao: "Verificação é 'o documento segue o padrão?'. Validação é 'estamos construindo o sistema certo para o cliente?'.",
  },
];

export const QUIZ_M4_UML_PATTERNS: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Na UML 2.0, qual diagrama é focado na modelagem dinâmica, mostrando a ordem cronológica da troca de mensagens entre objetos?",
    opcoes: [
      { label: "A", valor: "Diagrama de Classes" },
      { label: "B", valor: "Diagrama de Objetos" },
      { label: "C", valor: "Diagrama de Sequência" },
      { label: "D", valor: "Diagrama de Casos de Uso" },
      { label: "E", valor: "Diagrama de Atividades" },
    ],
    correta: "C",
    explicacao: "O Diagrama de Sequência é um diagrama de interação que detalha como os objetos operam entre si e em que ordem as mensagens fluem.",
  },
  {
    id: 2,
    pergunta: "O padrão de projeto GoF 'Singleton' tem como objetivo principal:",
    opcoes: [
      { label: "A", valor: "Permitir a criação de múltiplas instâncias de uma classe aleatoriamente." },
      { label: "B", valor: "Garantir que uma classe tenha apenas uma instância e fornecer um ponto global de acesso a ela." },
      { label: "C", valor: "Ocultar a complexidade de um subsistema." },
      { label: "D", valor: "Trocar o comportamento de um objeto em tempo de execução." },
      { label: "E", valor: "Notificar múltiplos objetos sobre mudanças de estado." },
    ],
    correta: "B",
    explicacao: "Singleton é um padrão de criação usado quando precisamos de um único ponto centralizado de controle, como um gerenciador de conexão com BD.",
  },
  {
    id: 3,
    pergunta: "Qual a diferença entre uma associação de 'Agregação' e uma 'Composição' no Diagrama de Classes da UML?",
    opcoes: [
      { label: "A", valor: "A agregação usa diamante preenchido; a composição usa diamante vazio." },
      { label: "B", valor: "Na agregação, as partes podem existir independentemente do todo; na composição, o tempo de vida das partes está atrelado ao todo." },
      { label: "C", valor: "Composição é exclusiva para classes abstratas." },
      { label: "D", valor: "Agregação só ocorre em linguagens como C++." },
      { label: "E", valor: "Não há diferença técnica, apenas visual." },
    ],
    correta: "B",
    explicacao: "Agregação é um relacionamento 'Todo-Parte' fraco (ex: Carro e Motorista). Composição é forte (ex: Casa e Cômodos - se a casa sumir, os cômodos também).",
  },
  {
    id: 4,
    pergunta: "O padrão 'Observer' é classificado como um padrão do tipo:",
    opcoes: [
      { label: "A", valor: "Estrutural" },
      { label: "B", valor: "Criação (Creational)" },
      { label: "C", valor: "Comportamental (Behavioral)" },
      { label: "D", valor: "Arquitetural" },
      { label: "E", valor: "Anti-padrão" },
    ],
    correta: "C",
    explicacao: "Padrões comportamentais focam na comunicação e atribuição de responsabilidades entre objetos. O Observer lida com a sincronização de estados.",
  },
  {
    id: 5,
    pergunta: "No Diagrama de Casos de Uso, quando usamos o relacionamento <<extend>>, o que isso significa?",
    opcoes: [
      { label: "A", valor: "O caso de uso base sempre chama o caso de uso estendido." },
      { label: "B", valor: "O caso de uso estendido é obrigatório para a execução do fluxo." },
      { label: "C", valor: "O fluxo base pode ser estendido por um comportamento opcional em circunstâncias específicas." },
      { label: "D", valor: "Significa herança de classes no código." },
      { label: "E", valor: "É um erro de modelagem, deve-se usar <<include>>." },
    ],
    correta: "C",
    explicacao: "O 'extend' representa um fluxo opcional ou excepcional que só ocorre sob certas condições (ex: caso de uso 'Pagar' pode ser estendido por 'Aplicar Desconto').",
  },
  {
    id: 6,
    pergunta: "Para esconder a complexidade de um sistema complexo e fornecer uma interface simplificada para o cliente, qual padrão GoF estrutural deve ser aplicado?",
    opcoes: [
      { label: "A", valor: "Adapter" },
      { label: "B", valor: "Facade" },
      { label: "C", valor: "Decorator" },
      { label: "D", valor: "Proxy" },
      { label: "E", valor: "Bridge" },
    ],
    correta: "B",
    explicacao: "O Facade (Fachada) oferece uma interface unificada e simplificada para um conjunto de interfaces em um subsistema complexo.",
  },
];

export const QUIZ_M5_AGILE_DEVOPS: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "No framework Scrum, quem é o responsável por gerenciar e priorizar o Product Backlog?",
    opcoes: [
      { label: "A", valor: "Scrum Master" },
      { label: "B", valor: "Product Owner (PO)" },
      { label: "C", valor: "Developers (Time de Desenvolvimento)" },
      { label: "D", valor: "Gestor de Projetos Clássico" },
      { label: "E", valor: "Stakeholders Externos" },
    ],
    correta: "B",
    explicacao: "O Product Owner é o dono da visão do produto e decide o que é mais valioso para ser desenvolvido em cada Sprint.",
  },
  {
    id: 2,
    pergunta: "Qual é o objetivo principal da reunião 'Sprint Retrospective'?",
    opcoes: [
      { label: "A", valor: "Apresentar as funcionalidades prontas para o cliente." },
      { label: "B", valor: "Definir quais tarefas cada desenvolvedor fará no dia." },
      { label: "C", valor: "Refletir sobre o processo, as pessoas e as ferramentas para planejar melhorias no próximo Sprint." },
      { label: "D", valor: "Estimar o tempo de cada User Story." },
      { label: "E", valor: "Cancelar o Sprint se algo deu errado." },
    ],
    correta: "C",
    explicacao: "Diferente da Review (focada no produto), a Retrospectiva é focada no TIME e no PROCESSO (melhoria contínua/Kaizen).",
  },
  {
    id: 3,
    pergunta: "No Kanban, qual técnica é usada para identificar gargalos e evitar o excesso de trabalho em progresso?",
    opcoes: [
      { label: "A", valor: "Daily Meeting" },
      { label: "B", valor: "WIP Limit (Work In Progress Limit)" },
      { label: "C", valor: "Poker Planning" },
      { label: "D", valor: "Burndown Chart" },
      { label: "E", valor: "Code Review" },
    ],
    correta: "B",
    explicacao: "Limitar o WIP garante que o time termine o que começou antes de puxar novas tarefas, mantendo o fluxo estável.",
  },
  {
    id: 4,
    pergunta: "O conceito de DevOps integra equipes que historicamente eram separadas. Quais são os dois pilares técnicos fundamentais para o sucesso de uma cultura DevOps?",
    opcoes: [
      { label: "A", valor: "Documentação em papel e reuniões mensais." },
      { label: "B", valor: "Arquitetura Monolítica e Deploy Manual." },
      { label: "C", valor: "CI (Integração Contínua) e CD (Entrega/Implantação Contínua)." },
      { label: "D", valor: "Excel e E-mail corporativo." },
      { label: "E", valor: "Apenas Testes Unitários e nada mais." },
    ],
    correta: "C",
    explicacao: "A automação através de pipelines de CI/CD permite feedback rápido e deploys frequentes e confiáveis.",
  },
  {
    id: 5,
    pergunta: "O que significa 'Shift-Left Testing' no contexto de Engenharia de Software Moderna?",
    opcoes: [
      { label: "A", valor: "Mover os testes para a esquerda no teclado." },
      { label: "B", valor: "Realizar os testes apenas após a implantação em produção." },
      { label: "C", valor: "Executar os testes o mais cedo possível no ciclo de vida (ex: TDD, Requisitos)." },
      { label: "D", valor: "Delegar todos os testes para o cliente." },
      { label: "E", valor: "Excluir os testes da fase de desenvolvimento." },
    ],
    correta: "C",
    explicacao: "Shift-Left é a prática de testar cedo e frequentemente. Quanto mais cedo um bug é achado (na 'esquerda' do cronograma), mais barato é o seu conserto.",
  },
  {
    id: 6,
    pergunta: "Qual valor do Manifesto Ágil substitui a preocupação exaustiva com 'Documentação Abrangente'?",
    opcoes: [
      { label: "A", valor: "Interações de ferramentas." },
      { label: "B", valor: "Contratos rígidos com o cliente." },
      { label: "C", valor: "Software em funcionamento." },
      { label: "D", valor: "Seguir o plano a qualquer custo." },
      { label: "E", valor: "Uso de ferramentas CASE caras." },
    ],
    correta: "C",
    explicacao: "O Manifesto Ágil prefere 'Software em funcionamento mais que documentação abrangente', priorizando a entrega de valor real.",
  },
];

export const QUIZ_M6_DATABASE_SQL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Em um banco de dados relacional utilizado pela Petrobras para controle de produção, a 3ª Forma Normal (3FN) exige que:",
    opcoes: [
      { label: "A", valor: "Todos os campos sejam atômicos (1FN)." },
      { label: "B", valor: "Não existam dependências parciais da chave primária (2FN)." },
      { label: "C", valor: "Não existam dependências transitivas entre atributos não-chave." },
      { label: "D", valor: "O banco de dados suporte transações ACID." },
      { label: "E", valor: "Exista uma chave estrangeira em todas as tabelas." },
    ],
    correta: "C",
    explicacao: "A 3FN remove dependências transitivas, garantindo que cada atributo não-chave dependa apenas da chave primária e de nada mais.",
  },
  {
    id: 2,
    pergunta: "O que garante a propriedade de 'Isolamento' (Isolation) em uma transação ACID?",
    opcoes: [
      { label: "A", valor: "A transação é tudo ou nada." },
      { label: "B", valor: "O banco permanece consistente após a transação." },
      { label: "C", valor: "As transações simultâneas não interferem umas nas outras." },
      { label: "D", valor: "Os dados são persistidos em disco permanentemente." },
      { label: "E", valor: "O backup é feito automaticamente." },
    ],
    correta: "C",
    explicacao: "Isolamento garante que a execução concorrente de transações deixe o banco no mesmo estado que se tivessem sido executadas sequencialmente.",
  },
];

export const QUIZ_M7_NOSQL_BIGDATA: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "No Teorema CAP, sistemas como o MongoDB operam frequentemente priorizando quais dois pilares em caso de partição de rede?",
    opcoes: [
      { label: "A", valor: "Consistência e Disponibilidade." },
      { label: "B", valor: "Consistência e Tolerância a Partições (CP)." },
      { label: "C", valor: "Disponibilidade e Tolerância a Partições (AP)." },
      { label: "D", valor: "Velocidade e Segurança." },
      { label: "E", valor: "Ácido e Base." },
    ],
    correta: "B",
    explicacao: "O MongoDB prioriza a consistência forte (CP). Em uma partição, ele pode ficar indisponível para garantir que os dados não divirjam.",
  },
  {
    id: 2,
    pergunta: "Bancos de dados NoSQL do tipo 'Documento' (ex: MongoDB) armazenam dados em formatos como:",
    opcoes: [
      { label: "A", valor: "Tabelas e Colunas fixas." },
      { label: "B", valor: "Grafos e Vértices." },
      { label: "C", valor: "JSON/BSON, permitindo esquemas flexíveis." },
      { label: "D", valor: "Arquivos TXT planos." },
      { label: "E", valor: "Apenas inteiros binários." },
    ],
    correta: "C",
    explicacao: "Diferente do relacional, o modelo de documento é schema-less, usando estruturas como JSON para representar dados complexos e aninhados.",
  },
];

export const QUIZ_M8_MICROSERVICES: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Qual é a principal vantagem da arquitetura de Microserviços em relação à Monolítica para sistemas de larga escala?",
    opcoes: [
      { label: "A", valor: "Facilidade de deploy manual." },
      { label: "B", valor: "Uso de apenas uma linguagem de programação." },
      { label: "C", valor: "Escalabilidade independente de cada componente e isolamento de falhas." },
      { label: "D", valor: "Menor custo de infraestrutura inicial." },
      { label: "E", valor: "Simplicidade extrema na gestão de dados." },
    ],
    correta: "C",
    explicacao: "Microserviços permitem escalar apenas a parte do sistema que precisa de mais recursos, além de evitar que uma falha em um serviço derrube todo o ecossistema.",
  },
  {
    id: 2,
    pergunta: "Em comunicações assíncronas entre microserviços, o uso de um 'Message Broker' (ex: RabbitMQ ou Kafka) implementa qual padrão?",
    opcoes: [
      { label: "A", valor: "Request-Response síncrono." },
      { label: "B", valor: "Publish-Subscribe (Pub/Sub)." },
      { label: "C", valor: "Herança de Classes Remotas." },
      { label: "D", valor: "Acesso Direto à Memória." },
      { label: "E", valor: "Criptografia de Ponto-a-Ponto." },
    ],
    correta: "B",
    explicacao: "Mensageiros permitem o desacoplamento temporal e espacial através de filas e tópicos (Pub/Sub).",
  },
];

export const QUIZ_M9_SECURITY: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Segundo o OWASP Top 10, a falha onde um atacante insere scripts maliciosos em uma página web visualizada por outros usuários é chamada de:",
    opcoes: [
      { label: "A", valor: "Broken Access Control." },
      { label: "B", valor: "Insecure Design." },
      { label: "C", valor: "SQL Injection." },
      { label: "D", valor: "Cross-Site Scripting (XSS)." },
      { label: "E", valor: "Cryptographic Failure." },
    ],
    correta: "D",
    explicacao: "O XSS (Cross-Site Scripting) ocorre quando dados não confiáveis são incluídos na página sem validação adequada, permitindo a execução de JS malicioso no browser da vítima.",
  },
  {
    id: 2,
    pergunta: "A Lei Geral de Proteção de Dados (LGPD) exige que sistemas que tratam dados sensíveis de funcionários da Petrobras implementem, por design:",
    opcoes: [
      { label: "A", valor: "Acesso público irrestrito por transparência." },
      { label: "B", valor: "Privacidade por Padrão (Privacy by Design)." },
      { label: "C", valor: "Armazenamento vitalício sem possibilidade de exclusão." },
      { label: "D", valor: "Uso de apenas servidores internacionais." },
      { label: "E", valor: "Backup em fita magnética apenas." },
    ],
    correta: "B",
    explicacao: "Privacy by Design significa que a proteção de dados deve ser considerada desde a arquitetura inicial do software, não como um 'puxadinho' posterior.",
  },
];

export const QUIZ_M10_TESTING_QUALITY: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "No Ciclo Red-Green-Refactor do TDD (Test Driven Development), qual é o primeiro passo obrigatório?",
    opcoes: [
      { label: "A", valor: "Escrever o código da funcionalidade." },
      { label: "B", valor: "Escrever um teste que falha (Red)." },
      { label: "C", valor: "Refatorar o código existente." },
      { label: "D", valor: "Criar o banco de dados." },
      { label: "E", valor: "Pedir aprovação do PO." },
    ],
    correta: "B",
    explicacao: "O TDD exige que o teste seja escrito antes do código. O ciclo começa com a falha (Red), seguida pela implementação mínima para passar (Green) e posterior limpeza (Refactor).",
  },
  {
    id: 2,
    pergunta: "A 'Pirâmide de Testes' sugere que a maioria dos testes de um sistema deve ser composta por qual tipo?",
    opcoes: [
      { label: "A", valor: "Testes Manuais de E2E." },
      { label: "B", valor: "Testes de Interface (UI)." },
      { label: "C", valor: "Testes de Unidade (Unit Tests)." },
      { label: "D", valor: "Testes de Integração Lenta." },
      { label: "E", valor: "Testes de Carga exaustivos." },
    ],
    correta: "C",
    explicacao: "Testes de unidade são rápidos, baratos e fáceis de manter. Por isso, devem formar a base larga da pirâmide.",
  },
];
