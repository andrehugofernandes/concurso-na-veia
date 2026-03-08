import { QuizQuestion } from "../../shared";

// Padrão 2026 Cesgranrio - Classes de Palavras
// 10 Pools de Questões (Simulando uma para cada um dos 10 módulos)

export const QUIZ_M1_SUBSTANTIVO: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Em 'A Petrobras atingiu um novo **patamar**', a palavra destacada é:",
    opcoes: [
      { label: "A", valor: "Substantivo concreto" },
      { label: "B", valor: "Substantivo abstrato" },
      { label: "C", valor: "Adjetivo" },
      { label: "D", valor: "Verbo" },
      { label: "E", valor: "Advérbio" },
    ],
    correta: "B",
    explicacao: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato (depende de um contexto ou ação para existir).",
  },
  {
    id: 102,
    pergunta: "Assinale a alternativa em que o substantivo é COLETIVO:",
    opcoes: [
      { label: "A", valor: "A frota de petroleiros parou." },
      { label: "B", valor: "O trabalhador chegou cedo." },
      { label: "C", valor: "A plataforma é gigante." },
      { label: "D", valor: "O petróleo é valioso." },
      { label: "E", valor: "A empresa investiu." },
    ],
    correta: "A",
    explicacao: "Frota é o coletivo de navios ou veículos.",
  }
];

export const QUIZ_M2_ADJETIVO_ARTIGO: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Em 'Contrataram um **bom** engenheiro', o adjetivo indica:",
    opcoes: [
      { label: "A", valor: "Qualidade objetiva" },
      { label: "B", valor: "Opinião subjetiva" },
      { label: "C", valor: "Estado físico" },
      { label: "D", valor: "Origem geográfica" },
      { label: "E", valor: "Quantidade" },
    ],
    correta: "B",
    explicacao: "Adjetivos valorativos/subjetivos (bom, mau, excelente) antes do substantivo geralmente indicam a opinião do emissor.",
  },
  {
    id: 202,
    pergunta: "O artigo 'O' em 'O saber não ocupa lugar' tem a função de:",
    opcoes: [
      { label: "A", valor: "Definir um objeto" },
      { label: "B", valor: "Substantivar o verbo 'saber'" },
      { label: "C", valor: "Indicar o gênero masculino de saber" },
      { label: "D", valor: "Enfatizar a frase" },
      { label: "E", valor: "Substituir um pronome" },
    ],
    correta: "B",
    explicacao: "O artigo tem o poder de transformar qualquer classe gramatical em substantivo (derivação imprópria).",
  }
];

export const QUIZ_M3_VERBO_I: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "O radical do verbo 'PRODUZIR' é:",
    opcoes: [
      { label: "A", valor: "Produz" },
      { label: "B", valor: "Produiz" },
      { label: "C", valor: "Prod" },
      { label: "D", valor: "Produzi" },
      { label: "E", valor: "ir" },
    ],
    correta: "A",
    explicacao: "O radical é a parte que contém o sentido básico: produ-z-ir.",
  },
  {
    id: 302,
    pergunta: "Na conjugação de 'EU PONHO', o verbo PÔR apresenta irregularidade no:",
    opcoes: [
      { label: "A", valor: "Radical" },
      { label: "B", valor: "Desinência" },
      { label: "C", valor: "Vogal Temática" },
      { label: "D", valor: "Sufixo" },
      { label: "E", valor: "Afixo" },
    ],
    correta: "A",
    explicacao: "O radical muda de 'pon-' para 'ponh-'. É um verbo irregular.",
  }
];

export const QUIZ_M4_VERBO_II: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "O tempo que indica uma ação acabada antes de outra também passada é o:",
    opcoes: [
      { label: "A", valor: "Pretérito Perfeito" },
      { label: "B", valor: "Pretérito Imperfeito" },
      { label: "C", valor: "Pretérito Mais-que-perfeito" },
      { label: "D", valor: "Futuro do Pretérito" },
      { label: "E", valor: "Presente do Indicativo" },
    ],
    correta: "C",
    explicacao: "O Mais-que-perfeito (fizera) indica o 'passado do passado'.",
  },
  {
    id: 402,
    pergunta: "Qual modo verbal exprime ordem, pedido ou conselho?",
    opcoes: [
      { label: "A", valor: "Indicativo" },
      { label: "B", valor: "Subjuntivo" },
      { label: "C", valor: "Imperativo" },
      { label: "D", valor: "Infinitivo" },
      { label: "E", valor: "Gerúndio" },
    ],
    correta: "C",
    explicacao: "O imperativo é o modo da ordem ou exortação.",
  }
];

export const QUIZ_M5_PRONOME_I: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Qual pronome deve ser usado para autoridades como o Presidente da República?",
    opcoes: [
      { label: "A", valor: "Vossa Excelência" },
      { label: "B", valor: "Vossa Senhoria" },
      { label: "C", valor: "Vossa Magnificência" },
      { label: "D", valor: "Vossa Santidade" },
      { label: "E", valor: "Você" },
    ],
    correta: "A",
    explicacao: "Vossa Excelência é o tratamento para as altas autoridades dos três poderes.",
  }
];

export const QUIZ_M6_PRONOME_II: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Em 'O projeto **cujo** autor fomos nós', o pronome 'cujo' estabelece relação de:",
    opcoes: [
      { label: "A", valor: "Lugar" },
      { label: "B", valor: "Posse" },
      { label: "C", valor: "Causa" },
      { label: "D", valor: "Finalidade" },
      { label: "E", valor: "Modo" },
    ],
    correta: "B",
    explicacao: "Cujo liga o possuidor (projeto) à coisa possuída (autor).",
  },
  {
    id: 602,
    pergunta: "O pronome demonstrativo usado para retomar o que acabou de ser dito no texto é:",
    opcoes: [
      { label: "A", valor: "Este" },
      { label: "B", valor: "Esse" },
      { label: "C", valor: "Aquele" },
      { label: "D", valor: "Isto" },
      { label: "E", valor: "Aquilo" },
    ],
    correta: "B",
    explicacao: "Esse/Essa/Isso têm função anafórica (retomam o que já foi citado).",
  }
];

export const QUIZ_M7_ADVERBIO: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Na frase 'Ele agiu **muito** cautelosamente', o termo destacado modifica:",
    opcoes: [
      { label: "A", valor: "Um verbo" },
      { label: "B", valor: "Um adjetivo" },
      { label: "C", valor: "Outro advérbio" },
      { label: "D", valor: "Um substantivo" },
      { label: "E", valor: "Uma preposição" },
    ],
    correta: "C",
    explicacao: "Muito intensifica o advérbio 'cautelosamente'. Advérbio modifica Verbo, Adjetivo ou outro Advérbio.",
  }
];

export const QUIZ_M8_PREPOSICAO_NUMERAL: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "A contração 'pelo' é a soma de:",
    opcoes: [
      { label: "A", valor: "Para + o" },
      { label: "B", valor: "Per + o (por + o)" },
      { label: "C", valor: "Pode + o" },
      { label: "D", valor: "A + o" },
      { label: "E", valor: "De + o" },
    ],
    correta: "B",
    explicacao: "Pelo = per (forma arcaica de por) + o.",
  },
  {
    id: 802,
    pergunta: "O numeral 'SÉTIMO' é do tipo:",
    opcoes: [
      { label: "A", valor: "Cardinal" },
      { label: "B", valor: "Ordinal" },
      { label: "C", valor: "Fracionário" },
      { label: "D", valor: "Multiplicativo" },
      { label: "E", valor: "Coletivo" },
    ],
    correta: "B",
    explicacao: "Ordinais indicam ordem ou posição.",
  }
];

export const QUIZ_M9_CONJUNCAO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "A conjunção 'TODAVIA' tem valor semântico de:",
    opcoes: [
      { label: "A", valor: "Adição" },
      { label: "B", valor: "Oposição (Adversativa)" },
      { label: "C", valor: "Conclusão" },
      { label: "D", valor: "Explicação" },
      { label: "E", valor: "Causa" },
    ],
    correta: "B",
    explicacao: "Todavia, mas, porém, contudo são adversativas.",
  },
  {
    id: 902,
    pergunta: "Qual conjunção introduz uma FINALIDADE?",
    opcoes: [
      { label: "A", valor: "A fim de que" },
      { label: "B", valor: "Já que" },
      { label: "C", valor: "Caso" },
      { label: "D", valor: "Conforme" },
      { label: "E", valor: "Embora" },
    ],
    correta: "A",
    explicacao: "A fim de que indica o objetivo da ação.",
  }
];

export const QUIZ_M10_FINAL_CLASSES: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Qual classe gramatical é invariável e liga orações?",
    opcoes: [
      { label: "A", valor: "Advérbio" },
      { label: "B", valor: "Preposição" },
      { label: "C", valor: "Conjunção" },
      { label: "D", valor: "Interjeição" },
      { label: "E", valor: "Pronome" },
    ],
    correta: "C",
    explicacao: "A conjunção liga orações ou termos semelhantes, sendo invariável.",
  },
  {
    id: 1002,
    pergunta: "Em 'Fique onde está!', a palavra 'onde' é:",
    opcoes: [
      { label: "A", valor: "Advérbio de lugar" },
      { label: "B", valor: "Preposição" },
      { label: "C", valor: "Conjunção" },
      { label: "D", valor: "Pronome demonstrativo" },
      { label: "E", valor: "Substantivo" },
    ],
    correta: "A",
    explicacao: "Onde indica o lugar fixo onde se está.",
  }
];
