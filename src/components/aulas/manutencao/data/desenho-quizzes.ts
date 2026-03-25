import { QuizQuestion } from "../../shared";

/**
 * QUIZ: DESENHO TÉCNICO - MÓDULO 1: Fundamentos, Formatos e Escalas
 */
export const QUIZ_M1_DESENHO_FUNDAMENTOS: QuizQuestion[] = [
  {
    id: "dt_m1_1",
    pergunta: "Qual é o formato de folha de papel da série A que serve como base para todos os outros, possuindo área de aproximadamente 1m²?",
    opcoes: [
      { label: "A", valor: "A0" },
      { label: "B", valor: "A1" },
      { label: "C", valor: "A2" },
      { label: "D", valor: "A4" }
    ],
    correta: "A",
    explicacao: "O formato A0 é o formato básico da série A, com dimensões de 841 x 1189 mm e área de 1m². Os outros formatos (A1, A2, A3, A4) são obtidos pela divisão sucessiva do A0."
  },
  {
    id: "dt_m1_2",
    pergunta: "Em um desenho técnico, uma escala de 5:1 é classificada como:",
    opcoes: [
      { label: "A", valor: "Escala de Redução" },
      { label: "B", valor: "Escala Natural" },
      { label: "C", valor: "Escala de Ampliação" },
      { label: "D", valor: "Escala Gráfica" }
    ],
    correta: "C",
    explicacao: "Escalas onde o primeiro número é maior que o segundo (X:1) indicam que o desenho é maior que o objeto real, portanto, uma escala de ampliação."
  }
];

/**
 * QUIZ: DESENHO TÉCNICO - MÓDULO 2: Projeção Ortográfica (1º e 3º Diedros)
 */
export const QUIZ_M2_DESENHO_PROJECAO: QuizQuestion[] = [
  {
    id: "dt_m2_1",
    pergunta: "No Brasil, a norma NBR 10067 recomenda a utilização de qual diedro para a representação em projeção ortográfica?",
    opcoes: [
      { label: "A", valor: "1º Diedro" },
      { label: "B", valor: "2º Diedro" },
      { label: "C", valor: "3º Diedro" },
      { label: "D", valor: "4º Diedro" }
    ],
    correta: "A",
    explicacao: "A norma técnica brasileira (ABNT) estabelece a preferência pelo 1º Diedro para representações ortográficas, onde a ordem de projeção é: Observador -> Objeto -> Plano de Projeção."
  }
];

/**
 * QUIZ: DESENHO TÉCNICO - MÓDULO 3: Cortes, Seções e Hachuras
 */
export const QUIZ_M3_DESENHO_CORTES: QuizQuestion[] = [
  {
    id: "dt_m3_1",
    pergunta: "Qual é a finalidade principal da utilização de hachuras em um desenho técnico em corte?",
    opcoes: [
      { label: "A", valor: "Indicar a escala do desenho." },
      { label: "B", valor: "Representar as superfícies atingidas pelo plano de corte." },
      { label: "C", valor: "Substituir as dimensões da peça." },
      { label: "D", valor: "Mostrar contornos invisíveis sem usar tracejado." }
    ],
    correta: "B",
    explicacao: "As hachuras servem para evidenciar as partes sólidas que foram imaginariamente cortadas pelo plano de corte, facilitando a visualização do interior da peça."
  }
];

/**
 * QUIZ: DESENHO TÉCNICO - MÓDULO 4: Cotagem e Dimensionamento
 */
export const QUIZ_M4_DESENHO_COTAGEM: QuizQuestion[] = [
  {
    id: "dt_m4_1",
    pergunta: "De acordo com a NBR 10126, qual unidade de medida é o padrão no setor mecânico brasileiro e deve ser omitida no desenho?",
    opcoes: [
      { label: "A", valor: "Centímetro (cm)" },
      { label: "B", valor: "Polegada (\")" },
      { label: "C", valor: "Milímetro (mm)" },
      { label: "D", valor: "Metro (m)" }
    ],
    correta: "C",
    explicacao: "No desenho mecânico industrial, a unidade padrão é o milímetro (mm). Por isso, não se escreve 'mm' após cada cota, bastando indicar na legenda a unidade geral."
  }
];

/**
 * QUIZ: DESENHO TÉCNICO - MÓDULO 5: Tubulações e Fluxogramas (P&ID)
 */
export const QUIZ_M5_DESENHO_ISOMETRICOS: QuizQuestion[] = [
  {
    id: "dt_m5_1",
    pergunta: "Em um isométrico de tubulação, o ângulo padrão entre os eixos X, Y e Z no papel é de quantos graus entre si?",
    opcoes: [
      { label: "A", valor: "90°" },
      { label: "B", valor: "45°" },
      { label: "C", valor: "120°" },
      { label: "D", valor: "180°" }
    ],
    correta: "C",
    explicacao: "Na perspectiva isométrica, os três eixos espaciais são representados no papel com uma inclinação de 120° entre si, permitindo ver três faces do objeto simultaneamente."
  }
];
