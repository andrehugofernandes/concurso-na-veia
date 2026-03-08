import { QuizQuestion } from "../../shared";

// Pool de Questões - Aula: Pontuação (Padrão 2026 Cesgranrio Petrobras)

// ----------------------------------------------------------------------------
// MÓDULO 1: VISÃO GERAL E FUNÇÕES
// ----------------------------------------------------------------------------
export const QUIZ_M1_PONTUACAO: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Qual a função primordial do sistema de pontuação na escrita?",
    opcoes: [
      { label: "A", valor: "Marcar as pausas para a respiração do leitor." },
      { label: "B", valor: "Indicar o nível de coesão entre as estruturas e manifestar propriedades da fala." },
      { label: "C", valor: "Diferenciar substantivos próprios de comuns." },
      { label: "D", valor: "Obrigar o leitor a ler mais devagar." },
    ],
    correta: "B",
    explicacao: "A pontuação organiza a sintaxe e a clareza, indo muito além de simples pausas respiratórias.",
  },
  {
    id: 102,
    pergunta: "Na frase 'O almoço está pronto e será servido.', o ponto final indica:",
    opcoes: [
      { label: "A", valor: "Uma dúvida do autor." },
      { label: "B", valor: "O final de uma frase declarativa." },
      { label: "C", valor: "Uma abreviação necessária." },
      { label: "D", valor: "Uma ênfase exagerada." },
    ],
    correta: "B",
    explicacao: "O ponto simples encerra períodos declarativos ou imperativos.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 2: VÍRGULA - PROIBIÇÕES FATAIS
// ----------------------------------------------------------------------------
export const QUIZ_M2_PONTUACAO: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Assinale a alternativa que apresenta um erro de pontuação (vírgula proibida):",
    opcoes: [
      { label: "A", valor: "Os diretores da Petrobras, decidiram o novo plano." },
      { label: "B", valor: "Ontem, decidiram o plano." },
      { label: "C", valor: "Decidiram, conforme o previsto, o plano." },
      { label: "D", valor: "O plano, enfim, foi decidido." },
    ],
    correta: "A",
    explicacao: "Nunca se separa o sujeito (Os diretores...) do verbo (decidiram) por vírgula simples.",
  },
  {
    id: 202,
    pergunta: "Não se deve usar vírgula entre:",
    opcoes: [
      { label: "A", valor: "O nome e o seu complemento nominal." },
      { label: "B", valor: "O verbo e o seu objeto direto." },
      { label: "C", valor: "O sujeito e o predicado." },
      { label: "D", valor: "Todas as alternativas acima estão corretas." },
    ],
    correta: "D",
    explicacao: "A vírgula é proibida entre os termos que possuem ligação sintática direta.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 3: VÍRGULA - TERMOS ESSENCIAIS
// ----------------------------------------------------------------------------
export const QUIZ_M3_PONTUACAO: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Em 'Comprei tubos, válvulas, conexões e flanges', as vírgulas separam:",
    opcoes: [
      { label: "A", valor: "Apostos explicativos." },
      { label: "B", valor: "Elementos de uma enumeração." },
      { label: "C", valor: "Vocativos." },
      { label: "D", valor: "Adjuntos adverbiais longos." },
    ],
    correta: "B",
    explicacao: "A vírgula é usada para separar itens listados (enumeração).",
  },
  {
    id: 302,
    pergunta: "Na repetição 'O mar estava muito, muito revolto', a vírgula serve para:",
    opcoes: [
      { label: "A", valor: "Indicar ênfase pela repetição de palavra." },
      { label: "B", valor: "Corrigir um erro de digitação." },
      { label: "C", valor: "Separar um adjunto adverbial." },
      { label: "D", valor: "Isolar o aposto." },
    ],
    correta: "A",
    explicacao: "Repetições enfáticas devem ser separadas por vírgula.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 4: VÍRGULA - APOSTO E VOCATIVO
// ----------------------------------------------------------------------------
export const QUIZ_M4_PONTUACAO: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Qual a pontuação correta para o vocativo na frase abaixo?",
    opcoes: [
      { label: "A", valor: "Mário entregue o relatório." },
      { label: "B", valor: "Mário, entregue o relatório." },
      { label: "C", valor: "Mário entregue, o relatório." },
      { label: "D", valor: "Entregue o relatório Mário." },
    ],
    correta: "B",
    explicacao: "O vocativo (chamamento) deve ser sempre isolado por vírgula.",
  },
  {
    id: 402,
    pergunta: "Em 'A Petrobras, gigante do petróleo, bateu recordes', o termo entre vírgulas é:",
    opcoes: [
      { label: "A", valor: "Um vocativo." },
      { label: "B", valor: "Um aposto explicativo." },
      { label: "C", valor: "Uma oração adjetiva restritiva." },
      { label: "D", valor: "Um adjunto adverbial de lugar." },
    ],
    correta: "B",
    explicacao: "Aposto explicativo caracteriza ou resume um termo anterior e deve vir entre vírgulas.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 5: VÍRGULA - ADJUNTOS DESLOCADOS
// ----------------------------------------------------------------------------
export const QUIZ_M5_PONTUACAO: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Sobre o adjunto adverbial deslocado para o início da frase, a vírgula é OBRIGATÓRIA quando:",
    opcoes: [
      { label: "A", valor: "O adjunto for curto (uma ou duas palavras)." },
      { label: "B", valor: "O adjunto for longo (geralmente 3 ou mais palavras)." },
      { label: "C", valor: "Nunca é obrigatória, apenas facultativa." },
      { label: "D", valor: "Sempre que houver um verbo na frase." },
    ],
    correta: "B",
    explicacao: "Adjuntos adverbiais longos deslocados exigem vírgula para manter a clareza.",
  },
  {
    id: 502,
    pergunta: "Assinale a frase com pontuação FACULTATIVA (estilo curto):",
    opcoes: [
      { label: "A", valor: "Ontem choveu muito." },
      { label: "B", valor: "No dia de ontem choveu muito." },
      { label: "C", valor: "Devido às fortes chuvas de ontem, o evento foi cancelado." },
      { label: "D", valor: "A e B aceitam vírgula facultativa, mas B começa a exigir mais." },
    ],
    correta: "A",
    explicacao: "Advérbios curtos (Ontem) admitem vírgula facultativa.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 6: VÍRGULA - ORAÇÕES COORDENADAS
// ----------------------------------------------------------------------------
export const QUIZ_M6_PONTUACAO: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Usa-se vírgula antes da conjunção 'E' quando:",
    opcoes: [
      { label: "A", valor: "As orações apresentam sujeitos diferentes." },
      { label: "B", valor: "A conjunção é repetida (polissíndeto)." },
      { label: "C", valor: "O 'E' tem valor adversativo (significa 'mas')." },
      { label: "D", valor: "Todas as alternativas anteriores." },
    ],
    correta: "D",
    explicacao: "São os três casos clássicos de vírgula antes do 'E'.",
  },
  {
    id: 602,
    pergunta: "Na frase 'Estudei muito, mas não passei', a vírgula separa:",
    opcoes: [
      { label: "A", valor: "Uma oração coordenada sindética adversativa." },
      { label: "B", valor: "Um aposto." },
      { label: "C", valor: "Uma oração subordinada." },
      { label: "D", valor: "Um vocativo." },
    ],
    correta: "A",
    explicacao: "Orações coordenadas adversativas (mas, porém, contudo...) devem ser precedidas de vírgula.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 7: VÍRGULA - ORAÇÕES SUBORDINADAS
// ----------------------------------------------------------------------------
export const QUIZ_M7_PONTUACAO: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "A oração adjetiva explicativa diferencia-se da restritiva pelo uso de:",
    opcoes: [
      { label: "A", valor: "Ponto final." },
      { label: "B", valor: "Vírgulas." },
      { label: "C", valor: "Aspas." },
      { label: "D", valor: "Travessão simples apenas no final." },
    ],
    correta: "B",
    explicacao: "Explicativas vêm entre vírgulas; restritivas aparecem sem vírgulas.",
  },
  {
    id: 702,
    pergunta: "Em 'Os alunos que estudam passam', qual o sentido?",
    opcoes: [
      { label: "A", valor: "Todos os alunos do mundo passam." },
      { label: "B", valor: "Apenas o grupo de alunos que estuda é que passa (Restrição)." },
      { label: "C", valor: "Nenhum aluno passa." },
      { label: "D", valor: "Os alunos passam porque são alunos." },
    ],
    correta: "B",
    explicacao: "Sem vírgulas, a oração é restritiva: limita o sentido do substantivo 'alunos'.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 8: PONTO E PONTO E VÍRGULA
// ----------------------------------------------------------------------------
export const QUIZ_M8_PONTUACAO: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Para que serve o ponto e vírgula em enumerações complexas?",
    opcoes: [
      { label: "A", valor: "Para confundir o leitor." },
      { label: "B", valor: "Para separar itens de uma lista que já possuem vírgulas internas." },
      { label: "C", valor: "Para substituir o ponto final permanentemente." },
      { label: "D", valor: "Para indicar uma pergunta sem ponto de interrogação." },
    ],
    correta: "B",
    explicacao: "O ponto e vírgula organiza a hierarquia de pausas em frases longas ou listas segmentadas.",
  },
  {
    id: 802,
    pergunta: "Assinale o uso correto do ponto e vírgula:",
    opcoes: [
      { label: "A", valor: "Fui ao mercado; comprei pão; leite; e café." },
      { label: "B", valor: "A empresa visa ao lucro; porém, respeita o meio ambiente." },
      { label: "C", valor: "Muitos queriam a vaga; poucos, no entanto, estavam aptos." },
      { label: "D", valor: "B e C estão corretos visando separar orações coordenadas com conectivos móveis." },
    ],
    correta: "D",
    explicacao: "O ponto e vírgula é excelente para separar orações coordenadas com certa independência ou com conectivos deslocados.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 9: SINAIS COMPLEMENTares
// ----------------------------------------------------------------------------
export const QUIZ_M9_PONTUACAO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Os dois-pontos podem ser usados para:",
    opcoes: [
      { label: "A", valor: "Introduzir uma citação direta." },
      { label: "B", valor: "Anunciar uma enumeração." },
      { label: "C", valor: "Apresentar um esclarecimento ou síntese." },
      { label: "D", valor: "Todas as alternativas anteriores." },
    ],
    correta: "D",
    explicacao: "Dois-pontos possuem função explicativa, enumerativa ou citativa.",
  },
  {
    id: 902,
    pergunta: "Os parênteses e o travessão duplo podem substituir:",
    opcoes: [
      { label: "A", valor: "As vírgulas que isolam orações intercaladas ou apostos." },
      { label: "B", valor: "O ponto de exclamação." },
      { label: "C", valor: "A crase obrigatória." },
      { label: "D", valor: "Somente nomes próprios." },
    ],
    correta: "A",
    explicacao: "Travessões e parênteses são alternativas estilísticas às vírgulas de intercalação.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 10: SIMULADO FINAL
// ----------------------------------------------------------------------------
export const QUIZ_FINAL_PONTUACAO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Assinale a alternativa em que a pontuação está RIGOROSAMENTE CORRETA:",
    opcoes: [
      { label: "A", valor: "A Petrobras, embora seja uma estatal, compete no mercado global." },
      { label: "B", valor: "Petrobras embora seja uma estatal compete no mercado global." },
      { label: "C", valor: "A Petrobras embora seja uma estatal, compete no mercado global." },
      { label: "D", valor: "A Petrobras, embora seja uma estatal compete, no mercado global." },
    ],
    correta: "A",
    explicacao: "A oração concessiva intercalada 'embora seja uma estatal' deve estar entre vírgulas.",
  },
  {
    id: 1002,
    pergunta: "Qual das frases abaixo altera o sentido se as vírgulas forem removidas?",
    opcoes: [
      { label: "A", valor: "Ontem, o dia foi longo." },
      { label: "B", valor: "O Brasil, que é o maior país da América Latina, exporta minério." },
      { label: "C", valor: "Os funcionários, que bateram a meta, receberão prêmios." },
      { label: "D", valor: "B e C estão corretas, pois são explicativas que virariam restritivas." },
    ],
    correta: "D",
    explicacao: "Remover vírgulas de explicativas as torna restritivas, mudando a abrangência do sujeito.",
  }
];
