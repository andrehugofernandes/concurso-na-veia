import { QuizQuestion } from "@/components/aulas/shared";

export const QUIZ_GESTAO_PROCESSOS: Record<string, QuizQuestion[]> = {
  "modulo-1": [
    {
      id: 101,
      pergunta: "Na gestão de processos, como se define um 'processo de negócio'?",
      opcoes: [
        { label: "A", valor: "Conjunto de tarefas isoladas sem relação entre si" },
        { label: "B", valor: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor" },
        { label: "C", valor: "Apenas atividades operacionais de baixo nível" },
        { label: "D", valor: "Um documento técnico obrigatório" },
        { label: "E", valor: "Sinônimo de procedimento administrativo" }
      ],
      correta: "B",
      explicacao: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico. Cada atividade adiciona valor ao processo."
    },
    {
      id: 102,
      pergunta: "Qual a diferença fundamental entre 'processo' e 'procedimento'?",
      opcoes: [
        { label: "A", valor: "São sinônimos e intercambiáveis" },
        { label: "B", valor: "Processo é macro e orientado a resultado; procedimento é o passo-a-passo de execução" },
        { label: "C", valor: "Procedimento é mais importante que processo" },
        { label: "D", valor: "Processo só existe em empresas grandes" },
        { label: "E", valor: "Não há diferença significativa" }
      ],
      correta: "B",
      explicacao: "Processo é a visão macro da sequência de atividades que geram valor (começo, meio, fim). Procedimento é a descrição detalhada (passo-a-passo) de como executar uma atividade específica dentro do processo. Um processo contém múltiplos procedimentos."
    },
    {
      id: 103,
      pergunta: "Quais são os três elementos fundamentais de um processo?",
      opcoes: [
        { label: "A", valor: "Entrada, Recurso, Saída" },
        { label: "B", valor: "Entrada, Atividade, Saída" },
        { label: "C", valor: "Criação, Execução, Avaliação" },
        { label: "D", valor: "Início, Meio, Fim" },
        { label: "E", valor: "Planejamento, Implementação, Controle" }
      ],
      correta: "B",
      explicacao: "Os três elementos fundamentais de um processo são: (1) ENTRADA (inputs) - insumos ou informações iniciais; (2) ATIVIDADE (processo propriamente dito) - sequência de ações que transformam a entrada; (3) SAÍDA (outputs) - resultado esperado de valor."
    },
    {
      id: 104,
      pergunta: "Na Petrobras, o processo de exploração de petróleo inclui atividades como prospecção, perfuração, extração e escoamento. Este é um exemplo de:",
      opcoes: [
        { label: "A", valor: "Processo de apoio" },
        { label: "B", valor: "Processo de suporte" },
        { label: "C", valor: "Processo core (essencial) ou processo primário" },
        { label: "D", valor: "Procedimento operacional" },
        { label: "E", valor: "Rotina administrativa" }
      ],
      correta: "C",
      explicacao: "Processos core ou primários são aqueles que geram valor direto para o cliente externo e realizam a razão de ser da empresa. Na Petrobras, exploração, produção e comercialização de petróleo/gás são processos core. Contabilidade e RH são processos de suporte."
    },
    {
      id: 105,
      pergunta: "A fim de otimizar a 'satisfação do cliente', qual seria o principal foco ao documentar um novo processo?",
      opcoes: [
        { label: "A", valor: "Maximizar a quantidade de etapas para garantir qualidade" },
        { label: "B", valor: "Reduzir tempo, custo e erros enquanto mantém a qualidade esperada" },
        { label: "C", valor: "Criar procedimentos complexos que demonstrem sofisticação" },
        { label: "D", valor: "Padronizar tudo igualmente, sem considerar contexto" },
        { label: "E", valor: "Manter a maior quantidade de controles manuais" }
      ],
      correta: "B",
      explicacao: "O objetivo de documentar e otimizar um processo deve ser: eliminar desperdícios, reduzir tempo de ciclo, diminuir custos, minimizar erros e garantir qualidade consistente. Tudo isso contribui para aumentar a satisfação do cliente final."
    },
    {
      id: 106,
      pergunta: "Na perspectiva de gestão de processos, qual é o papel do 'proprietário do processo'?",
      opcoes: [
        { label: "A", valor: "Apenas documentar o processo" },
        { label: "B", valor: "Ser responsável pela execução diária de todas as atividades" },
        { label: "C", valor: "Responsável pelo design, melhoria contínua, conformidade e resultados do processo como um todo" },
        { label: "D", valor: "Apenas revisar erros no final do processo" },
        { label: "E", valor: "Ter autoridade apenas sobre recursos financeiros" }
      ],
      correta: "C",
      explicacao: "O proprietário do processo (process owner) é responsável pelas decisões estratégicas sobre o processo: seu design, conformidade com regulações, indicadores de desempenho, melhoria contínua e alcance dos objetivos. Ele garante que o processo agregue valor ao negócio."
    }
  ],

  "modulo-2": [
    {
      id: 201,
      pergunta: "O que significa a sigla 'BPM' em gestão?",
      opcoes: [
        { label: "A", valor: "Business Process Method" },
        { label: "B", valor: "Business Product Management" },
        { label: "C", valor: "Business Process Management" },
        { label: "D", valor: "Best Practice Methodology" },
        { label: "E", valor: "Basic Performance Model" }
      ],
      correta: "C",
      explicacao: "BPM = Business Process Management. É uma disciplina gerencial que combina métodos, técnicas, ferramentas e tecnologia para projetar, modelar, executar, monitorar e otimizar processos de negócio de forma contínua."
    },
    {
      id: 202,
      pergunta: "Qual o objetivo principal da abordagem BPM?",
      opcoes: [
        { label: "A", valor: "Apenas documentar como as coisas são feitas" },
        { label: "B", valor: "Melhorar continuamente o desempenho dos processos de negócio para alcançar objetivos estratégicos" },
        { label: "C", valor: "Manter a complexidade dos processos" },
        { label: "D", valor: "Aumentar a quantidade de etapas" },
        { label: "E", valor: "Garantir que nada mude na organização" }
      ],
      correta: "B",
      explicacao: "BPM é uma abordagem contínua de melhoria. Seu objetivo é identificar gargalos, eliminar desperdícios, automatizar atividades repetitivas, melhorar a experiência do cliente e alinhar os processos com a estratégia corporativa."
    },
    {
      id: 203,
      pergunta: "Na metodologia BPM, qual é a ordem correta das fases do ciclo de vida?",
      opcoes: [
        { label: "A", valor: "Análise → Design → Implementação → Monitoramento → Otimização" },
        { label: "B", valor: "Design → Análise → Monitoramento → Implementação → Otimização" },
        { label: "C", valor: "Monitoramento → Análise → Design → Implementação → Otimização" },
        { label: "D", valor: "Otimização → Implementação → Design → Análise → Monitoramento" },
        { label: "E", valor: "Análise → Otimização → Design → Monitoramento → Implementação" }
      ],
      correta: "A",
      explicacao: "O ciclo BPM segue: 1) DESCOBERTA/ANÁLISE (entender o processo atual); 2) DESIGN (desenhar o processo otimizado); 3) IMPLEMENTAÇÃO (implantar as mudanças); 4) MONITORAMENTO (acompanhar KPIs); 5) OTIMIZAÇÃO (melhorar continuamente). É cíclico."
    },
    {
      id: 204,
      pergunta: "Qual ferramenta/tecnologia é frequentemente utilizada para suportar BPM em empresas?",
      opcoes: [
        { label: "A", valor: "Apenas planilhas Excel" },
        { label: "B", valor: "BPMS (Business Process Management Suite) - softwares especializados em modelagem e automação" },
        { label: "C", valor: "Apenas metodologia Waterfall" },
        { label: "D", valor: "Documentos em papel" },
        { label: "E", valor: "Nenhuma tecnologia específica" }
      ],
      correta: "B",
      explicacao: "Um BPMS (Business Process Management Suite) é um software que facilita a modelagem, automação, monitoramento e melhoria de processos. Exemplos: Bizagi, Pega, Appian, SAP Process Mining. Permite gestão integrada de BPM."
    },
    {
      id: 205,
      pergunta: "Na Petrobras, um exemplo de iniciativa BPM seria:",
      opcoes: [
        { label: "A", valor: "Apenas aumentar o número de supervisores" },
        { label: "B", valor: "Analisar o processo de exploração, automatizar validações, monitorar KPIs e melhorar continuamente" },
        { label: "C", valor: "Realizar uma única auditoria por ano" },
        { label: "D", valor: "Manter todos os processos tal como estão" },
        { label: "E", valor: "Contratar mais pessoal sem otimizar fluxos" }
      ],
      correta: "B",
      explicacao: "Uma iniciativa BPM na Petrobras envolveria: mapear o processo de exploração/produção, identificar gargalos, automatizar atividades repetitivas (validações, geração de relatórios), monitorar indicadores (tempo, custo, qualidade) e implementar melhorias contínuas."
    }
  ],

  "modulo-3": [
    {
      id: 301,
      pergunta: "BPMN é a notação padrão para modelagem de processos. O que significa essa sigla?",
      opcoes: [
        { label: "A", valor: "Business Process Model and Notation" },
        { label: "B", valor: "Business Process Method Network" },
        { label: "C", valor: "Basic Process Modeling Notation" },
        { label: "D", valor: "Business Planning and Management Notes" },
        { label: "E", valor: "Best Practices for Managing Networks" }
      ],
      correta: "A",
      explicacao: "BPMN = Business Process Model and Notation. É um padrão internacional (ISO 19510) mantido pela OMG (Object Management Group) para representar processos de negócio de forma gráfica e compreensível, tanto para técnicos quanto para usuários de negócio."
    },
    {
      id: 302,
      pergunta: "Na notação BPMN, qual símbolo representa um evento de início de um processo?",
      opcoes: [
        { label: "A", valor: "Retângulo" },
        { label: "B", valor: "Losango" },
        { label: "C", valor: "Círculo com borda fina" },
        { label: "D", valor: "Círculo com borda grossa" },
        { label: "E", valor: "Seta" }
      ],
      correta: "C",
      explicacao: "Na BPMN: Evento de Início = Círculo com borda fina; Evento Intermediário = Círculo com borda dupla; Evento de Fim = Círculo com borda grossa. Atividades = Retângulos arredondados. Gateways (decisões) = Losangos."
    },
    {
      id: 303,
      pergunta: "Um 'gateway' (portão) em BPMN é representado por um losango e serve para:",
      opcoes: [
        { label: "A", valor: "Indicar fim do processo" },
        { label: "B", valor: "Representar decisões (bifurcações) e fusões no fluxo do processo" },
        { label: "C", valor: "Documentar atividades de suporte" },
        { label: "D", valor: "Agrupar atividades funcionais" },
        { label: "E", valor: "Indicar quem executa cada tarefa" }
      ],
      correta: "B",
      explicacao: "Um Gateway (losango) representa pontos de decisão ou bifurcação do processo. Exemplo: 'Se volume de petróleo > X, segue para exportação; caso contrário, para estoque'. Gateways mais comuns: AND (paralelo), OR (ou), XOR (escolha exclusiva)."
    },
    {
      id: 304,
      pergunta: "Qual é a principal vantagem de usar BPMN para modelar processos na Petrobras?",
      opcoes: [
        { label: "A", valor: "Apenas documentação visual sem utilidade prática" },
        { label: "B", valor: "Permitir alinhamento entre negócio, TI e operações; facilitar comunicação; servir como base para automação" },
        { label: "C", valor: "Substituir a necessidade de treinamento de funcionários" },
        { label: "D", valor: "Garantir que os processos nunca precisem ser alterados" },
        { label: "E", valor: "Aumentar a burocracia e complexidade" }
      ],
      correta: "B",
      explicacao: "BPMN é uma linguagem visual clara que permite que analistas de negócio, TI e executores entendam o processo da mesma forma. Facilita a comunicação, reduz ambiguidades, e serve como base para implementação em BPMS ou sistemas integrados."
    },
    {
      id: 305,
      pergunta: "Na modelagem BPMN de um processo de licitação na Petrobras, as raias ('swimlanes') seriam usadas para:",
      opcoes: [
        { label: "A", valor: "Indicar tempo total do processo" },
        { label: "B", valor: "Separar responsabilidades por departamento ou cargo envolvido (Compras, Jurídico, Diretoria)" },
        { label: "C", valor: "Mostrar o custo de cada atividade" },
        { label: "D", valor: "Apenas enfeitar o diagrama" },
        { label: "E", valor: "Listar todos os documentos necessários" }
      ],
      correta: "B",
      explicacao: "Raias (swimlanes) em BPMN organizam as atividades por responsável. Cada raia representa um departamento, cargo ou sistema envolvido no processo. Facilita identificar quem faz o quê e onde podem estar gargalos de comunicação entre áreas."
    }
  ],

  "modulo-4": [
    {
      id: 401,
      pergunta: "O que é o mapeamento 'AS-IS' de um processo?",
      opcoes: [
        { label: "A", valor: "O processo desejado no futuro" },
        { label: "B", valor: "O processo tal como ele é executado atualmente" },
        { label: "C", valor: "A versão teórica ideal do processo" },
        { label: "D", valor: "O benchmark do concorrente" },
        { label: "E", valor: "Uma proposta de automação" }
      ],
      correta: "B",
      explicacao: "AS-IS (Como É) mapeia o processo atual, com todas as suas características, gargalos, retrabalhos e ineficiências. É a 'fotografia' do processo no presente. Essencial para diagnosticar problemas."
    },
    {
      id: 402,
      pergunta: "E qual é o significado de 'TO-BE'?",
      opcoes: [
        { label: "A", valor: "O processo atual" },
        { label: "B", valor: "O processo futuro desejado após implementação de melhorias" },
        { label: "C", valor: "Um processo alternativo" },
        { label: "D", valor: "O processo de concorrentes" },
        { label: "E", valor: "Uma análise de custos" }
      ],
      correta: "B",
      explicacao: "TO-BE (Como Será) é o desenho do processo otimizado, depois de analisar o AS-IS e implementar melhorias (eliminar desperdícios, automatizar, alterar sequências, simplificar). Representa o estado futuro desejado."
    },
    {
      id: 403,
      pergunta: "O 'gap analysis' (análise de lacunas) entre AS-IS e TO-BE serve para:",
      opcoes: [
        { label: "A", valor: "Aumentar a complexidade do processo" },
        { label: "B", valor: "Identificar a diferença entre estado atual e desejado; determinar mudanças, esforço e impacto necessário" },
        { label: "C", valor: "Justificar por que nada pode mudar" },
        { label: "D", valor: "Evitar melhorias" },
        { label: "E", valor: "Apenas criar documentação" }
      ],
      correta: "B",
      explicacao: "Gap analysis compara AS-IS vs TO-BE para identificar: quais atividades são eliminadas, quais são automatizadas, quais mudam de sequência, qual esforço é necessário (tempo, custo, recursos), qual é o risco da mudança."
    },
    {
      id: 404,
      pergunta: "Na Petrobras, ao mapear o processo de aprovação de investimentos, o AS-IS mostra 45 dias de ciclo com retrabalhos. O TO-BE reduz para 20 dias. Qual seria a próxima etapa?",
      opcoes: [
        { label: "A", valor: "Manter o status quo e não fazer nada" },
        { label: "B", valor: "Implementar imediatamente sem planejamento" },
        { label: "C", valor: "Realizar gap analysis detalhado, planejar transição, treinar equipes, implementar e monitorar resultados" },
        { label: "D", valor: "Responsabilizar os executores pelos atrasos" },
        { label: "E", valor: "Ignorar o TO-BE e manter antigos procedimentos" }
      ],
      correta: "C",
      explicacao: "Após desenhar AS-IS e TO-BE, é essencial: analisar o gap (diferenças), criar plano de transição (mudanças incrementais), comunicar à equipe, treinar, implementar fases, monitorar KPIs e fazer ajustes conforme necessário."
    },
    {
      id: 405,
      pergunta: "Qual é uma armadilha comum ao fazer mapeamento AS-IS/TO-BE?",
      opcoes: [
        { label: "A", valor: "Documentar meticulosamente o processo atual" },
        { label: "B", valor: "Desenhar um TO-BE idealista demais, incompatível com realidade, capacidade ou cultura da empresa" },
        { label: "C", valor: "Envolver executores do processo" },
        { label: "D", valor: "Usar ferramentas padrão de modelagem" },
        { label: "E", valor: "Medir tempos e custos" }
      ],
      correta: "B",
      explicacao: "Comum criar um TO-BE teórico perfeito que é irrealista ou requer investimento desproporcional. O ideal é desenhar um TO-BE viável, alcançável com recursos da organização, alinhado com capacidade e cultura corporativa."
    }
  ],

  "modulo-5": [
    {
      id: 501,
      pergunta: "O conceito de 'melhoria contínua' em gestão de processos significa:",
      opcoes: [
        { label: "A", valor: "Mudar o processo completamente a cada trimestre" },
        { label: "B", valor: "Fazer grandes reformas uma única vez e depois manter congelado" },
        { label: "C", valor: "Buscar incrementos pequenos e contínuos; cultivar cultura de otimização; eliminar pequenos desperdícios regularmente" },
        { label: "D", valor: "Apenas corrigir erros graves" },
        { label: "E", valor: "Não fazer nada para evitar riscos" }
      ],
      correta: "C",
      explicacao: "Melhoria contínua (kaizen em japonês) é uma abordagem filosófica onde pequenas melhorias regularmente compõem transformações significativas. Envolve envolvimento de todos, eliminação de desperdício, e cultura de aprendizado."
    },
    {
      id: 502,
      pergunta: "Qual metodologia é amplamente utilizada para estruturar a melhoria contínua de processos?",
      opcoes: [
        { label: "A", valor: "Apenas reuniões informais" },
        { label: "B", valor: "Ciclo PDCA (Plan → Do → Check → Act)" },
        { label: "C", valor: "Simulação estocástica" },
        { label: "D", valor: "Apenas análise de custos financeiros" },
        { label: "E", valor: "Nenhuma estrutura formal" }
      ],
      correta: "B",
      explicacao: "O ciclo PDCA (Plan-Do-Check-Act) é um método iterativo: Plan (planejamento), Do (executar), Check (verificar resultados), Act (agir sobre aprendizados). Usado em Lean, Six Sigma e BPM para estruturar melhoria contínua."
    },
    {
      id: 503,
      pergunta: "Na Petrobras, ao implementar melhoria contínua em um processo de manutenção, qual ferramenta ajuda a visualizar as causas-raiz de problemas?",
      opcoes: [
        { label: "A", valor: "Apenas gráficos de despesa" },
        { label: "B", valor: "Diagrama de Ishikawa (ou Causa e Efeito)" },
        { label: "C", valor: "Apenas listas de checklist" },
        { label: "D", valor: "Apenas cronograma linear" },
        { label: "E", valor: "Nenhuma análise estruturada" }
      ],
      correta: "B",
      explicacao: "O Diagrama de Ishikawa (Causa e Efeito ou Espinha de Peixe) ajuda a visualizar todas as possíveis causas que levam a um problema específico, organizadas em categorias (Método, Máquina, Material, Mão de Obra, Meio). Essencial para análise de raiz."
    },
    {
      id: 504,
      pergunta: "Qual é o impacto esperado ao implementar melhoria contínua estruturada?",
      opcoes: [
        { label: "A", valor: "Aumento de burocracia" },
        { label: "B", valor: "Redução de tempo de ciclo, custos, erros; aumento de satisfação do cliente e colaborador" },
        { label: "C", valor: "Paralisação da operação" },
        { label: "D", valor: "Apenas documentação adicional" },
        { label: "E", valor: "Nenhuma mudança real" }
      ],
      correta: "B",
      explicacao: "Melhoria contínua quando bem implementada gera: redução de tempo (ciclo mais rápido), redução de custo (menos desperdício), redução de erros (qualidade), maior satisfação de cliente (melhor serviço) e engajamento de colaboradores (sentirem-se ouvidos)."
    }
  ],

  "modulo-6": [
    {
      id: 601,
      pergunta: "Um 'indicador de desempenho' (KPI - Key Performance Indicator) em gestão de processos é:",
      opcoes: [
        { label: "A", valor: "Apenas um gráfico visual" },
        { label: "B", valor: "Uma métrica quantificável que mede o desempenho do processo em relação a objetivos estratégicos" },
        { label: "C", valor: "Uma opinião subjetiva sobre qualidade" },
        { label: "D", valor: "Um documento estático" },
        { label: "E", valor: "Uma penalidade aplicada à equipe" }
      ],
      correta: "B",
      explicacao: "Um KPI é uma medida objetiva que quantifica se o processo está cumprindo seus objetivos. Exemplos: tempo de ciclo (dias), taxa de erro (%), custo por transação, satisfação do cliente (score). Deve ser monitorado regularmente."
    },
    {
      id: 602,
      pergunta: "Qual das opções abaixo NÃO é uma característica de um bom KPI?",
      opcoes: [
        { label: "A", valor: "Mensurável e quantificável" },
        { label: "B", valor: "Alinhado aos objetivos estratégicos da organização" },
        { label: "C", valor: "Ambíguo e subjetivo para permitir interpretações variadas" },
        { label: "D", valor: "Com metas claras e revisáveis" },
        { label: "E", valor: "Monitorado regularmente (diário, semanal ou mensal)" }
      ],
      correta: "C",
      explicacao: "Um bom KPI deve ser: claro e mensurável, alinhado à estratégia, ter metas específicas, ser monitorado regularmente, e ser compreendido por todos. Jamais deve ser ambíguo; ao contrário, deve estar bem definido e documentado."
    },
    {
      id: 603,
      pergunta: "Na Petrobras, exemplos de KPIs para o processo de exploração de petróleo poderiam incluir:",
      opcoes: [
        { label: "A", valor: "Apenas gastos mensais em combustível" },
        { label: "B", valor: "Produção diária (barris/dia), custo de extração ($/barril), segurança (TRIFR), conformidade ambiental" },
        { label: "C", valor: "Apenas quantidade de funcionários" },
        { label: "D", valor: "Nenhuma métrica" },
        { label: "E", valor: "Apenas relatórios anuais" }
      ],
      correta: "B",
      explicacao: "KPIs de um processo de exploração devem medir: eficiência produtiva (barris/dia), eficiência econômica (custo/barril), segurança (TRIFR - taxa de acidentes), conformidade (regulações ambientais), sustentabilidade. Sempre vinculados a objetivos de negócio."
    },
    {
      id: 604,
      pergunta: "Como os KPIs ajudam na melhoria contínua?",
      opcoes: [
        { label: "A", valor: "Apenas para justificar aumentos salariais" },
        { label: "B", valor: "Fornecer visibilidade do desempenho; detectar problemas; orientar melhorias; medir impacto de mudanças" },
        { label: "C", valor: "Para punir equipes" },
        { label: "D", valor: "Para complicar a gestão" },
        { label: "E", valor: "Sem função relevante" }
      ],
      correta: "B",
      explicacao: "KPIs são a bússola da melhoria contínua: mostram se o processo está saudável (verde) ou com problemas (vermelho), facilitam identificação de gargalos, permitem comparação antes/depois de mudanças, e criam accountability."
    }
  ],

  "modulo-7": [
    {
      id: 701,
      pergunta: "A 'automação' de um processo significa:",
      opcoes: [
        { label: "A", valor: "Simplesmente usar mais computadores" },
        { label: "B", valor: "Eliminar totalmente todas as atividades humanas" },
        { label: "C", valor: "Utilizar tecnologia/software para executar atividades repetitivas com mínima intervenção humana" },
        { label: "D", valor: "Apenas um modismo corporativo" },
        { label: "E", valor: "Impossível de implementar" }
      ],
      correta: "C",
      explicacao: "Automação é o uso de tecnologia para executar atividades que eram manuais. Não elimina o humano, mas libera as pessoas de tarefas repetitivas para focar em atividades de maior valor: tomada de decisão, inovação, relacionamento com cliente."
    },
    {
      id: 702,
      pergunta: "Qual benefício é esperado ao automatizar um processo na Petrobras?",
      opcoes: [
        { label: "A", valor: "Apenas redução de custos de mão de obra" },
        { label: "B", valor: "Velocidade, precisão, consistência, liberação de tempo para atividades estratégicas, redução de erros" },
        { label: "C", valor: "Maior necessidade de supervisão manual" },
        { label: "D", valor: "Aumento de complexidade" },
        { label: "E", valor: "Nenhum benefício real" }
      ],
      correta: "B",
      explicacao: "Benefícios da automação: processos 24/7 (velocidade), zero erros humanos (precisão), execução idêntica sempre (consistência), colaboradores em atividades mais nobres (estratégia), redução de custo operacional total (não apenas mão de obra)."
    },
    {
      id: 703,
      pergunta: "Qual é um erro comum ao iniciar uma iniciativa de automação?",
      opcoes: [
        { label: "A", valor: "Mapear o processo AS-IS antes de automatizar" },
        { label: "B", valor: "Automatizar um processo ineficiente, replicando seus gargalos no sistema" },
        { label: "C", valor: "Treinar os usuários na nova solução" },
        { label: "D", valor: "Monitorar resultados" },
        { label: "E", valor: "Documentar a automação" }
      ],
      correta: "B",
      explicacao: "Erro crítico: automatizar um processo com problemas estruturais. Resultado: 'automatizar a ineficiência'. Correto: primeiramente melhorar o processo (eliminar gargalos, simplificar, otimizar), depois automatizar o processo otimizado."
    },
    {
      id: 704,
      pergunta: "Na transformação digital, qual é o relacionamento entre BPM e automação?",
      opcoes: [
        { label: "A", valor: "São conceitos completamente independentes" },
        { label: "B", valor: "BPM define 'como' melhorar o processo; automação é a ferramenta para 'implementar' essa melhoria" },
        { label: "C", valor: "Automação é mais importante que BPM" },
        { label: "D", valor: "BPM é obsoleto na era digital" },
        { label: "E", valor: "Não há relação" }
      ],
      correta: "B",
      explicacao: "BPM e automação são complementares: BPM diagnostica e desenha a melhoria (mapeamento, análise, otimização); Automação implementa essa melhoria via tecnologia (RPA, BPMS, sistemas integrados). Juntas, realizam transformação efetiva."
    }
  ],

  "modulo-8": [
    {
      id: 801,
      pergunta: "Como a 'gestão da qualidade' se relaciona com gestão de processos?",
      opcoes: [
        { label: "A", valor: "São conceitos totalmente separados" },
        { label: "B", valor: "Qualidade é resultado de processos bem desenhados, otimizados e monitorados; variedade é minimizada via padronização" },
        { label: "C", valor: "Qualidade é responsabilidade apenas do departamento de QA" },
        { label: "D", valor: "Não há relação entre elas" },
        { label: "E", valor: "Qualidade reduz a eficiência" }
      ],
      correta: "B",
      explicacao: "Processos bem documentados e otimizados geram qualidade consistente. Via padronização (todos executam igual), reduz-se variação e erros. Monitoramento via KPIs detecta desvios antes de afetar cliente. Qualidade é uma consequência de processos sadios."
    },
    {
      id: 802,
      pergunta: "Qual ferramenta é clássica em gestão da qualidade e também usada em BPM?",
      opcoes: [
        { label: "A", valor: "Apenas conversas informais" },
        { label: "B", valor: "Ciclo PDCA (Plan-Do-Check-Act) para melhoria contínua e resolução de problemas" },
        { label: "C", valor: "Apenas auditoria externa anual" },
        { label: "D", valor: "Opinião de supervisores" },
        { label: "E", valor: "Nenhuma ferramenta estructurada" }
      ],
      correta: "B",
      explicacao: "O ciclo PDCA é fundamental tanto em Qualidade (controle de qualidade, zero defeitos) quanto em BPM (melhoria contínua de processos). Ambas as disciplinas o usam para estruturar ação e aprendizado sistemático."
    },
    {
      id: 803,
      pergunta: "Na Petrobras, a certificação ISO 9001 (gestão da qualidade) exige:",
      opcoes: [
        { label: "A", valor: "Apenas documentos bonitos" },
        { label: "B", valor: "Processos documentados, monitorados, auditados e continuamente melhorados para garantir produtos/serviços de qualidade" },
        { label: "C", valor: "Eliminar toda variabilidade humana" },
        { label: "D", valor: "Apenas atender clientes privilegiados" },
        { label: "E", valor: "Nenhuma estrutura formal" }
      ],
      correta: "B",
      explicacao: "ISO 9001 exige: processos mapeados, responsáveis designados, metas claras, monitoramento regular, tratamento de não-conformidades, melhoria contínua. É a integração de gestão de processos + qualidade em uma certificação."
    },
    {
      id: 804,
      pergunta: "Um problema de qualidade em um processo foi detectado. Qual seria a abordagem correta?",
      opcoes: [
        { label: "A", valor: "Ignorar e esperar passar" },
        { label: "B", valor: "Culpar o funcionário e puni-lo" },
        { label: "C", valor: "Analisar a raiz do problema (AS-IS), redesenhar o processo (TO-BE), implementar e monitorar melhoria" },
        { label: "D", valor: "Apenas ajustar manualmente cada caso" },
        { label: "E", valor: "Aumentar inspeção e controles" }
      ],
      correta: "C",
      explicacao: "Abordagem de melhoria contínua: identificar problema no processo (não culpar pessoas), analisar causa-raiz, redesenhar para eliminar a causa, implementar mudança estrutural, monitorar KPI para garantir que não retorne. Sistêmico, não punitivo."
    }
  ],

  "modulo-9": [
    {
      id: 901,
      pergunta: "A Petrobras, como empresa de energia global, enfrenta qual desafio predominante em gestão de processos?",
      opcoes: [
        { label: "A", valor: "Apenas atender clientes locais" },
        { label: "B", valor: "Integrar processos complexos (exploração, refino, distribuição, comercialização) em múltiplas geografias; garantir conformidade regulatória e segurança" },
        { label: "C", valor: "Manter processos manuais por tradição" },
        { label: "D", valor: "Não precisar de otimização" },
        { label: "E", valor: "Apenas focar em lucro imediato" }
      ],
      correta: "B",
      explicacao: "A Petrobras executa processos globalmente complexos: exploração (Brasil, África, Ásia), refino (múltiplas refinarias), transporte (oleodutos, navios), comercialização. Sincronizar essas operações, atender regulações locais/internacionais e garantir segurança é o grande desafio."
    },
    {
      id: 902,
      pergunta: "No contexto de sustentabilidade e ESG, qual aspecto de gestão de processos é crítico para a Petrobras?",
      opcoes: [
        { label: "A", valor: "Apenas maximizar produção" },
        { label: "B", valor: "Processos que minimizam impacto ambiental, garantem segurança ocupacional, promovem responsabilidade social" },
        { label: "C", valor: "Ignorar regulações ambientais" },
        { label: "D", valor: "Apenas reportar números" },
        { label: "E", valor: "Nenhuma responsabilidade com sustentabilidade" }
      ],
      correta: "B",
      explicacao: "A Petrobras, sob pressão ESG, deve redesenhar processos para: reduzir emissões de carbono, proteger biodiversidade, garantir segurança de trabalhadores (zero acidentes), envolver comunidades locais, tratar resíduos adequadamente. BPM é ferramenta estratégica para isso."
    },
    {
      id: 903,
      pergunta: "Exemplo prático: A Petrobras deseja reduzir tempo de aprovação de contrato de fornecimento (currently 60 dias). Qual seria a abordagem BPM?",
      opcoes: [
        { label: "A", valor: "Apenas demitir pessoas da área" },
        { label: "B", valor: "1) Mapear AS-IS (gargalos, retrabalhos); 2) Desenhar TO-BE com parallelização/automação; 3) Implementar com novo fluxo; 4) Monitorar KPI (tempo, custo, qualidade)" },
        { label: "C", valor: "Pedir para todos trabalharem mais rápido" },
        { label: "D", valor: "Não fazer nada" },
        { label: "E", valor: "Duplicar os aprovadores" }
      ],
      correta: "B",
      explicacao: "Abordagem BPM estruturada: diagnóstico (AS-IS), desenho da solução (TO-BE com parallelização de aprovações, automação de validações, integração de sistemas), implementação com mudança de processos/people/technology, monitoramento contínuo."
    },
    {
      id: 904,
      pergunta: "Na pandemia COVID-19, qual foi um aprendizado crítico sobre gestão de processos para a Petrobras?",
      opcoes: [
        { label: "A", valor: "Processos muito rigidamente documentados são inflexíveis" },
        { label: "B", valor: "Processos bem mapeados e digitais permitem adaptação rápida a crises; falta de BPM paralisa organizações" },
        { label: "C", valor: "Tecnologia não é importante" },
        { label: "D", valor: "Trabalho remoto é impossível" },
        { label: "E", valor: "Sem aprendizado relevante" }
      ],
      correta: "B",
      explicacao: "COVID ensinou: empresas com processos bem documentados e digitalizados adaptaram-se rapidamente ao trabalho remoto. Empresas com processos manuais/indefinidos paralisaram. BPM + automação = resiliência organizacional."
    },
    {
      id: 905,
      pergunta: "Qual iniciativa de transformação digital a Petrobras poderia liderar usando BPM?",
      opcoes: [
        { label: "A", valor: "Apenas manter o status quo" },
        { label: "B", valor: "Integração end-to-end de operações (exploração→refino→distribuição); automação inteligente; real-time analytics; otimização de cadeias de suprimento" },
        { label: "C", valor: "Volta total ao papel" },
        { label: "D", valor: "Apenas tecnologia sem estratégia" },
        { label: "E", valor: "Não fazer investimentos" }
      ],
      correta: "B",
      explicacao: "Oportunidade estratégica: usar BPM para integrar toda cadeia de valor (exploração, refino, logística, venda), implementar analytics em tempo real, automatizar decisões rotineiras, permitir que executivos focarem em estratégia. Isso gera competitividade global."
    }
  ],

  "modulo-10": [
    {
      id: 1001,
      pergunta: "Qual das seguintes afirmações MELHOR resume a importância de 'gestão de processos' para uma empresa moderna?",
      opcoes: [
        { label: "A", valor: "É apenas uma atividade de departamento de TI" },
        { label: "B", valor: "É fundamental para alinhar operações com estratégia, aumentar eficiência, reduzir custos e melhorar experiência do cliente" },
        { label: "C", valor: "É um modismo corporativo sem impacto real" },
        { label: "D", valor: "É responsabilidade apenas de consultores externos" },
        { label: "E", valor: "Não tem relevância em empresas grandes" }
      ],
      correta: "B",
      explicacao: "Gestão de processos é a espinha dorsal da excelência operacional. Ela conecta estratégia corporate com execução do dia-a-dia, garante consistência, permite melhoria contínua e cria base para transformação digital."
    },
    {
      id: 1002,
      pergunta: "Um desafio comum ao implementar programa de BPM é:",
      opcoes: [
        { label: "A", valor: "Falta de resistência à mudança" },
        { label: "B", valor: "Resistência de colaboradores ao novo processo; falta de patrocínio executivo; foco apenas em tecnologia sem mudança cultural" },
        { label: "C", valor: "Excesso de recursos financeiros" },
        { label: "D", valor: "Muito apoio de TI" },
        { label: "E", valor: "Nenhum desafio" }
      ],
      correta: "B",
      explicacao: "Maiores desafios de BPM: 1) Pessoas (resistência, cultura), 2) Liderança (falta de patrocínio do C-suite), 3) Tecnologia (focar em software e esquecer mudança organizacional). Sucesso requer: People + Process + Technology em equilíbrio."
    },
    {
      id: 1003,
      pergunta: "Na Petrobras, qual seria o principal indicador de sucesso de uma iniciativa de gestão de processos?",
      opcoes: [
        { label: "A", valor: "Apenas quantidade de documentos criados" },
        { label: "B", valor: "Melhoria comprovada em KPIs (redução de tempo de ciclo, custo, erro); satisfação de cliente e colaborador; alinhamento com objetivos estratégicos" },
        { label: "C", valor: "Implementação de muito software" },
        { label: "D", valor: "Apenas aparência de atividade" },
        { label: "E", valor: "Nenhum resultado tangível" }
      ],
      correta: "B",
      explicacao: "Sucesso real de BPM é mensurável: KPIs melhoram (tempo -40%, custo -20%, erros -80%), satisfação aumenta, estratégia é alcançada. Não é sobre documentação bonita, é sobre resultado concreto no negócio."
    },
    {
      id: 1004,
      pergunta: "Diante da transformação digital acelerada, qual é o papel futuro de gestão de processos?",
      opcoes: [
        { label: "A", valor: "Será completamente substituída por IA" },
        { label: "B", valor: "Tornar-se-á ainda mais crítica: desenhar processos para IA/RPA, garantir segurança de dados, integrar sistemas legados com novos, manter foco humano em decisões estratégicas" },
        { label: "C", valor: "Desaparecerá sem necessidade" },
        { label: "D", valor: "Permanecerá exatamente igual" },
        { label: "E", valor: "Ninguém sabe o futuro" }
      ],
      correta: "B",
      explicacao: "Futuro: BPM evoluirá para desenhar processos que combinam humanos com máquinas (AI/RPA), garantir governança e conformidade em ambiente complexo digital, permitir agilidade (processos ágeis, não apenas Waterfall). Ainda mais relevante que hoje."
    },
    {
      id: 1005,
      pergunta: "Uma organização que negligencia gestão de processos tende a sofrer qual consequência?",
      opcoes: [
        { label: "A", valor: "Nenhuma consequência relevante" },
        { label: "B", valor: "Retrabalho, ineficiência, inconsistência na qualidade, dificuldade em escalabilidade, maior custo operacional, insatisfação de cliente e colaborador" },
        { label: "C", valor: "Apenas vantagens" },
        { label: "D", valor: "Mais oportunidades" },
        { label: "E", valor: "Melhor competitividade" }
      ],
      correta: "B",
      explicacao: "Sem gestão de processos, empresas sofrem: desperdício de tempo e recursos, qualidade inconsistente, dificuldade de escalar operação, impossibilidade de transformação digital, colaboradores frustrados, cliente insatisfeito. O custo da desordem é alto."
    },
    {
      id: 1006,
      pergunta: "Como conclusão do módulo, qual seria a recomendação estratégica para a Petrobras?",
      opcoes: [
        { label: "A", valor: "Ignorar BPM e focar apenas em produção de petróleo" },
        { label: "B", valor: "Estabelecer programa corporativo de BPM; designar processo owners; integrar BPM com transformação digital; medir e reportar progresso; cultivar cultura de melhoria contínua" },
        { label: "C", valor: "Confiar apenas em consultores externos" },
        { label: "D", valor: "Fazer tudo manualmente como antes" },
        { label: "E", valor: "Nenhuma recomendação necessária" }
      ],
      correta: "B",
      explicacao: "Recomendação: estruturar gestão de processos como disciplina estratégica, não tático. Designar proprietários de processos, integrar com transformação digital, treinar lideranças, monitorar KPIs, comunicar ganhos, reconhecer melhoria. BPM deve ser DNA corporativo."
    }
  ]
};
