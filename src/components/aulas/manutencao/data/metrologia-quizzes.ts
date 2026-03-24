import { QuizQuestion } from "../shared";

export const QUIZ_M1_FUNDAMENTOS: QuizQuestion[] = [
  {
    id: "m1-q1",
    pergunta: "Qual é a unidade base de comprimento no Sistema Internacional (SI) e como ela é subdividida na metrologia mecânica?",
    alternativas: [
      { id: "a", texto: "O centímetro, subdividido em milímetros.", correta: false },
      { id: "b", texto: "O metro, sendo o milímetro a unidade prática mais usada na mecânica.", correta: true },
      { id: "c", texto: "A polegada, subdividida em frações de 1/128.", correta: false },
      { id: "d", texto: "O quilômetro, para grandes tubulações de petróleo.", correta: false },
    ],
    explicacao: "Na mecânica industrial, o metro é a unidade base, mas o milímetro (mm) e suas frações (centésimos e milésimos) são as unidades práticas de trabalho.",
  },
  {
    id: "m1-q2",
    pergunta: "Converta 25,4 mm para o sistema inglês fracionário.",
    alternativas: [
      { id: "a", texto: "1/2\"", correta: false },
      { id: "b", texto: "3/4\"", correta: false },
      { id: "c", texto: "1\"", correta: true },
      { id: "d", texto: "2\"", correta: false },
    ],
    explicacao: "1 polegada (1\") equivale exatamente a 25,4 milímetros.",
  }
];

export const QUIZ_M2_PAQUIMETRO: QuizQuestion[] = [
  {
    id: "m2-q1",
    pergunta: "Em um paquímetro com nônio de 20 divisões, qual é a sua resolução (sensibilidade)?",
    alternativas: [
      { id: "a", texto: "0,1 mm", correta: false },
      { id: "b", texto: "0,05 mm", correta: true },
      { id: "c", texto: "0,02 mm", correta: false },
      { id: "d", texto: "0,01 mm", correta: false },
    ],
    explicacao: "A resolução é calculada dividindo 1mm pelo número de divisões do nônio (1/20 = 0,05 mm).",
  }
];

export const QUIZ_M3_MICROMETRO: QuizQuestion[] = [
  {
    id: "m3-q1",
    pergunta: "Qual componente do micrômetro garante que a pressão de medição seja constante e repetível?",
    alternativas: [
      { id: "a", texto: "Bainha graduada", correta: false },
      { id: "b", texto: "Tambor recartilhado", correta: false },
      { id: "c", texto: "Catraca (ou fricção)", correta: true },
      { id: "d", texto: "Trava do fuso", correta: false },
    ],
    explicacao: "A catraca limita o torque aplicado, evitando deformações na peça ou no instrumento durante a medição.",
  }
];

export const QUIZ_M4_TOLERANCIAS: QuizQuestion[] = [
  {
    id: "m4-q1",
    pergunta: "No sistema de ajuste ISO 286, o que representa a letra maiúscula e o número em um ajuste '40 H7'?",
    alternativas: [
      { id: "a", texto: "H representa o campo de tolerância do eixo; 7 a qualidade do trabalho.", correta: false },
      { id: "b", texto: "H representa o campo de tolerância do furo; 7 o índice de rugosidade.", correta: false },
      { id: "c", texto: "H representa a posição do campo de tolerância do furo (furo base); 7 a qualidade (IT).", correta: true },
      { id: "d", texto: "H representa o material (Hardened); 7 a dureza HRC.", correta: false },
    ],
    explicacao: "Letras maiúsculas referem-se a furos. 'H' indica que o afastamento inferior é zero (furo base). O número indica o grau de precisão (IT7).",
  }
];

export const QUIZ_M5_RUGOSIDADE: QuizQuestion[] = [
  {
    id: "m5-q1",
    pergunta: "O parâmetro Ra de rugosidade representa:",
    alternativas: [
      { id: "a", texto: "A profundidade máxima de um pico.", correta: false },
      { id: "b", texto: "A média aritmética dos desvios de rugosidade em relação à linha média.", correta: true },
      { id: "c", texto: "A distância entre o maior pico e o vale mais profundo.", correta: false },
      { id: "d", texto: "O raio de curvatura da ponta do apalpador.", correta: false },
    ],
    explicacao: "Ra é o parâmetro de rugosidade mais utilizado universalmente, representando a média aritmética.",
  }
];
