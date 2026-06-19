import { QuizQuestion } from "../../shared";

export const QUIZ_M1_FUNDAMENTOS: QuizQuestion[] = [
  {
    id: "m1-q1",
    pergunta: "Qual é a unidade base de comprimento no Sistema Internacional (SI) e como ela é subdividida na metrologia mecânica?",
    opcoes: [
      { label: "A", valor: "O centímetro, subdividido em milímetros." },
      { label: "B", valor: "O metro, sendo o milímetro a unidade prática mais usada na mecânica." },
      { label: "C", valor: "A polegada, subdividida em frações de 1/128." },
      { label: "D", valor: "O quilômetro, para grandes tubulações de petróleo." },
    ],
    correta: "B",
    explicacao: "Na mecânica industrial, o metro é a unidade base, mas o milímetro (mm) e suas frações (centésimos e milésimos) são as unidades práticas de trabalho.",
  },
  {
    id: "m1-q2",
    pergunta: "Converta 25,4 mm para o sistema inglês fracionário.",
    opcoes: [
      { label: "A", valor: "1/2\"" },
      { label: "B", valor: "3/4\"" },
      { label: "C", valor: "1\"" },
      { label: "D", valor: "2\"" },
    ],
    correta: "C",
    explicacao: "1 polegada (1\") equivale exatamente a 25,4 milímetros.",
  }
];

export const QUIZ_M2_PAQUIMETRO: QuizQuestion[] = [
  {
    id: "m2-q1",
    pergunta: "Em um paquímetro com nônio de 20 divisões, qual é a sua resolução (sensibilidade)?",
    opcoes: [
      { label: "A", valor: "0,1 mm" },
      { label: "B", valor: "0,05 mm" },
      { label: "C", valor: "0,02 mm" },
      { label: "D", valor: "0,01 mm" },
    ],
    correta: "B",
    explicacao: "A resolução é calculada dividindo 1mm pelo número de divisões do nônio (1/20 = 0,05 mm).",
  }
];

export const QUIZ_M3_MICROMETRO: QuizQuestion[] = [
  {
    id: "m3-q1",
    pergunta: "Qual componente do micrômetro garante que a pressão de medição seja constante e repetível?",
    opcoes: [
      { label: "A", valor: "Bainha graduada" },
      { label: "B", valor: "Tambor recartilhado" },
      { label: "C", valor: "Catraca (ou fricção)" },
      { label: "D", valor: "Trava do fuso" },
    ],
    correta: "C",
    explicacao: "A catraca limita o torque aplicado, evitando deformações na peça ou no instrumento durante a medição.",
  }
];

export const QUIZ_M4_TOLERANCIAS: QuizQuestion[] = [
  {
    id: "m4-q1",
    pergunta: "No sistema de ajuste ISO 286, o que representa a letra maiúscula e o número em um ajuste '40 H7'?",
    opcoes: [
      { label: "A", valor: "H representa o campo de tolerância do eixo; 7 a qualidade do trabalho." },
      { label: "B", valor: "H representa o campo de tolerância do furo; 7 o índice de rugosidade." },
      { label: "C", valor: "H representa a posição do campo de tolerância do furo (furo base); 7 a qualidade (IT)." },
      { label: "D", valor: "H representa o material (Hardened); 7 a dureza HRC." },
    ],
    correta: "C",
    explicacao: "Letras maiúsculas referem-se a furos. 'H' indica que o afastamento inferior é zero (furo base). O número indica o grau de precisão (IT7).",
  }
];

export const QUIZ_M5_RUGOSIDADE: QuizQuestion[] = [
  {
    id: "m5-q1",
    pergunta: "O parâmetro Ra de rugosidade representa:",
    opcoes: [
      { label: "A", valor: "A profundidade máxima de um pico." },
      { label: "B", valor: "A média aritmética dos desvios de rugosidade em relação à linha média." },
      { label: "C", valor: "A distância entre o maior pico e o vale mais profundo." },
      { label: "D", valor: "O raio de curvatura da ponta do apalpador." },
    ],
    correta: "B",
    explicacao: "Ra é o parâmetro de rugosidade mais utilizado universalmente, representando a média aritmética.",
  }
];
