import { QuizQuestion } from "../../shared";

// Padrão 2026 Cesgranrio - Classes de Palavras
// 10 Pools de Questões para os 10 módulos

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
    explicacao: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato.",
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
  },
  {
    id: 103,
    pergunta: "Na frase 'O **vazamento** foi contido', o substantivo destacado deriva de qual verbo?",
    opcoes: [
      { label: "A", valor: "Vazar" },
      { label: "B", valor: "Vazamento" },
      { label: "C", valor: "Vazio" },
      { label: "D", valor: "Esvaziar" },
      { label: "E", valor: "Vazante" },
    ],
    correta: "A",
    explicacao: "Vazamento é um substantivo deverbal (derivado do verbo vazar).",
  }
];

export const QUIZ_M2_ADJETIVO: QuizQuestion[] = [
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
    explicacao: "Adjetivos valorativos antes do substantivo geralmente indicam a opinião do emissor.",
  },
  {
    id: 202,
    pergunta: "Assinale a opção em que a palavra 'VIVO' é um adjetivo:",
    opcoes: [
      { label: "A", valor: "Eu VIVO bem aqui." },
      { label: "B", valor: "O cabo está VIVO." },
      { label: "C", valor: "VIVO reclamando da vida." },
      { label: "D", valor: "VIVO para trabalhar." },
      { label: "E", valor: "Sempre VIVO o hoje." },
    ],
    correta: "B",
    explicacao: "Na opção B, 'VIVO' caracteriza o substantivo 'cabo'. Nas demais, é forma do verbo viver.",
  }
];

export const QUIZ_M3_ARTIGO: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "O artigo 'O' em 'O saber não ocupa lugar' tem a função de:",
    opcoes: [
      { label: "A", valor: "Definir um objeto" },
      { label: "B", valor: "Substantivar o verbo 'saber'" },
      { label: "C", valor: "Indicar o masculino" },
      { label: "D", valor: "Enfatizar a frase" },
      { label: "E", valor: "Substituir um pronome" },
    ],
    correta: "B",
    explicacao: "O artigo tem o poder de transformar outras classes em substantivo (derivação imprópria).",
  },
  {
    id: 302,
    pergunta: "Em 'Vendi a casa **a** um estranho', o termo destacado é:",
    opcoes: [
      { label: "A", valor: "Artigo definido" },
      { label: "B", valor: "Artigo indefinido" },
      { label: "C", valor: "Preposição" },
      { label: "D", valor: "Pronome pessoal" },
      { label: "E", valor: "Conjunção" },
    ],
    correta: "C",
    explicacao: "Antes de artigo indefinido (um), o 'a' é preposição exigida pelo verbo vender.",
  }
];

export const QUIZ_M4_PRONOME: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Em 'O projeto **cujo** autor fomos nós', o pronome 'cujo' estabelece relação de:",
    opcoes: [
      { label: "A", valor: "Lugar" },
      { label: "B", valor: "Posse" },
      { label: "C", valor: "Causa" },
      { label: "D", valor: "Finalidade" },
      { label: "E", valor: "Modo" },
    ],
    correta: "B",
    explicacao: "O pronome relativo 'cujo' é essencialmente possessivo.",
  },
  {
    id: 402,
    pergunta: "Assinale a frase com erro de colocação pronominal (padrão formal):",
    opcoes: [
      { label: "A", valor: "Não se esqueça de mim." },
      { label: "B", valor: "Esqueceram-me no pátio." },
      { label: "C", valor: "Me avisaram do perigo." },
      { label: "D", valor: "Sempre me disseram a verdade." },
      { label: "E", valor: "Sei que se trata de erro." },
    ],
    correta: "C",
    explicacao: "No padrão formal, não se inicia frase com pronome oblíquo átono.",
  }
];

export const QUIZ_M5_VERBO: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Qual frase apresenta um verbo na VOZ PASSIVA?",
    opcoes: [
      { label: "A", valor: "O técnico consertou a bomba." },
      { label: "B", valor: "A bomba foi consertada pelo técnico." },
      { label: "C", valor: "O técnico se feriu." },
      { label: "D", valor: "O técnico chegou à plataforma." },
      { label: "E", valor: "O técnico trabalha muito." },
    ],
    correta: "B",
    explicacao: "A voz passiva analítica é formada por Verbo Auxiliar + Particípio.",
  },
  {
    id: 502,
    pergunta: "Em 'Se ele **fizer** o teste, passará', o verbo está no:",
    opcoes: [
      { label: "A", valor: "Futuro do Presente" },
      { label: "B", valor: "Futuro do Subjuntivo" },
      { label: "C", valor: "Presente do Subjuntivo" },
      { label: "D", valor: "Infinitivo Pessoal" },
      { label: "E", valor: "Pretérito Imperfeito" },
    ],
    correta: "B",
    explicacao: "O futuro do subjuntivo indica uma possibilidade futura vinculada a uma condição.",
  }
];

export const QUIZ_M6_ADVERBIO: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Na frase 'Ele agiu **muito** cautelosamente', o termo destacado modifica:",
    opcoes: [
      { label: "A", valor: "Um verbo" },
      { label: "B", valor: "Um adjetivo" },
      { label: "C", valor: "Outro advérbio" },
      { label: "D", valor: "Um substantivo" },
      { label: "E", valor: "Uma preposição" },
    ],
    correta: "C",
    explicacao: "Muito intensifica o advérbio 'cautelosamente'.",
  },
  {
    id: 602,
    pergunta: "Assinale a frase em que o termo destacado é ADVÉRBIO:",
    opcoes: [
      { label: "A", valor: "Ela está **meia** cansada." },
      { label: "B", valor: "Comi **meia** maçã." },
      { label: "C", valor: "Ele fala **alto**." },
      { label: "D", valor: "O muro é **alto**." },
      { label: "E", valor: "Os caminhos são **altos**." },
    ],
    correta: "C",
    explicacao: "Em C, 'alto' modifica o verbo falar (modo), sendo advérbio. Em D e E é adjetivo. Em A há erro de concordância.",
  }
];

export const QUIZ_M7_PREPOSICAO: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "A regência do verbo ASSISTIR (sentido de ver) exige a preposição:",
    opcoes: [
      { label: "A", valor: "De" },
      { label: "B", valor: "A" },
      { label: "C", valor: "Em" },
      { label: "D", valor: "Para" },
      { label: "E", valor: "Com" },
    ],
    correta: "B",
    explicacao: "Assistir (ver) é VTI e exige preposição A: 'Assisti ao filme'.",
  },
  {
    id: 702,
    pergunta: "Em 'Fugiu **ante** o perigo', a preposição destacada indica:",
    opcoes: [
      { label: "A", valor: "Lugar" },
      { label: "B", valor: "Tempo" },
      { label: "C", valor: "Causa" },
      { label: "D", valor: "Oposição" },
      { label: "E", valor: "Modo" },
    ],
    correta: "A",
    explicacao: "Ante indica posição diante de algo (lugar/situação).",
  }
];

export const QUIZ_M8_CONJUNCAO: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "A conjunção 'CONQUANTO' possui valor semântico de:",
    opcoes: [
      { label: "A", valor: "Causa" },
      { label: "B", valor: "Concessão" },
      { label: "C", valor: "Consequência" },
      { label: "D", valor: "Condição" },
      { label: "E", valor: "Conformidade" },
    ],
    correta: "B",
    explicacao: "Conquanto é sinônimo de 'embora' (concessiva). Favorita da Cesgranrio.",
  },
  {
    id: 802,
    pergunta: "Qual conectivo indica uma relação de CONCLUSÃO?",
    opcoes: [
      { label: "A", valor: "Entretanto" },
      { label: "B", valor: "Portanto" },
      { label: "C", valor: "Contudo" },
      { label: "D", valor: "Todavia" },
      { label: "E", valor: "Porquanto" },
    ],
    correta: "B",
    explicacao: "Portanto, logo, por isso são conclusivas.",
  }
];

export const QUIZ_M9_INTERJEICAO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "As interjeições são classes gramaticais:",
    opcoes: [
      { label: "A", valor: "Variáveis em número" },
      { label: "B", valor: "Variáveis em gênero" },
      { label: "C", valor: "Invariáveis" },
      { label: "D", valor: "Derivadas de verbos" },
      { label: "E", valor: "Sintaticamente dependentes" },
    ],
    correta: "C",
    explicacao: "Interjeições são invariáveis e formam frases completas sozinhas.",
  },
  {
    id: 902,
    pergunta: "Qual das expressões abaixo é uma LOCUÇÃO INTERJETIVA?",
    opcoes: [
      { label: "A", valor: "Ai!" },
      { label: "B", valor: "Cuidado!" },
      { label: "C", valor: "Puxa vida!" },
      { label: "D", valor: "Psiu!" },
      { label: "E", valor: "Bravo!" },
    ],
    correta: "C",
    explicacao: "Locuções interjetivas são duas ou mais palavras com valor de interjeição.",
  }
];

export const QUIZ_M10_NUMERAL: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Assinale a opção em que a concordância do numeral está INCORRETA:",
    opcoes: [
      { label: "A", valor: "Os dois milhões de reais." },
      { label: "B", valor: "As duas milhões de pessoas." },
      { label: "C", valor: "Milhares de mulheres chegaram." },
      { label: "D", valor: "Ambos os técnicos saíram." },
      { label: "E", valor: "Eram dois sargentos." },
    ],
    correta: "B",
    explicacao: "Milhão e bilhão são masculinos. O correto é 'Os dois milhões de pessoas'.",
  },
  {
    id: 1002,
    pergunta: "O numeral que indica uma ordem de posição é o:",
    opcoes: [
      { label: "A", valor: "Cardinal" },
      { label: "B", valor: "Ordinal" },
      { label: "C", valor: "Fracionário" },
      { label: "D", valor: "Multiplicativo" },
      { label: "E", valor: "Coletivo" },
    ],
    correta: "B",
    explicacao: "Ordinais (primeiro, segundo) indicam ordem/posição.",
  }
];

export const QUIZ_M_FINAL_REVISAO: QuizQuestion[] = [
  {
    id: 1101,
    pergunta: "Qual grupo contém apenas classes INVARIÁVEIS?",
    opcoes: [
      { label: "A", valor: "Advérbio, Preposição, Conjunção, Interjeição" },
      { label: "B", valor: "Substantivo, Verbo, Adjetivo, Pronome" },
      { label: "C", valor: "Artigo, Numeral, Advérbio, Verbo" },
      { label: "D", valor: "Preposição, Pronome, Conjunção, Adjetivo" },
      { label: "E", valor: "Numeral, Artigo, Interjeição, Substantivo" },
    ],
    correta: "A",
    explicacao: "Mnemônico CIA P (Conjunção, Interjeição, Advérbio, Preposição).",
  }
];
