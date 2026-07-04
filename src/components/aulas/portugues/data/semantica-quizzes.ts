import { QuizQuestion } from "@/components/aulas/shared";

const generateMocks = (mId: number, name: string): QuizQuestion[] => {
  return [
    {
      id: `sem-${mId}-1`,
      pergunta: `O uso da palavra "${name}" no trecho pode ser substituído, sem alteração de sentido, por:`,
      opcoes: [
        { label: "A", valor: "Opção A (correta)" },
        { label: "B", valor: "Opção B" },
        { label: "C", valor: "Opção C" },
        { label: "D", valor: "Opção D" },
        { label: "E", valor: "Opção E" },
      ],
      correta: "A",
      explicacao: "A opção A mantém a coesão semântica exigida pelo contexto.",
    },
    {
      id: `sem-${mId}-2`,
      pergunta: "Em qual das frases abaixo o sentido original foi mantido?",
      opcoes: [
        { label: "A", valor: "Frase A" },
        { label: "B", valor: "Frase B" },
        { label: "C", valor: "Frase C (correta)" },
        { label: "D", valor: "Frase D" },
        { label: "E", valor: "Frase E" },
      ],
      correta: "C",
      explicacao: "A alternativa correta é a C pois respeita a polissemia do termo.",
    }
  ];
}

export const QUIZ_M1_CONCEITOS: QuizQuestion[] = generateMocks(1, "sinônimos");
export const QUIZ_M2_FREQUENCIA: QuizQuestion[] = generateMocks(2, "homônimos");
export const QUIZ_M3_GRAFICOS: QuizQuestion[] = generateMocks(3, "ambiguidade");
export const QUIZ_M4_MEDIA_SIMPLES: QuizQuestion[] = generateMocks(4, "polissemia");
export const QUIZ_M5_MEDIA_PONDERADA: QuizQuestion[] = generateMocks(5, "denotação");
export const QUIZ_M6_MODA: QuizQuestion[] = generateMocks(6, "figurado");
export const QUIZ_M7_MEDIANA: QuizQuestion[] = generateMocks(7, "coesão");
export const QUIZ_M8_VARIANCIA: QuizQuestion[] = generateMocks(8, "variação");
export const QUIZ_M9_DESVIO_PADRAO: QuizQuestion[] = generateMocks(9, "pragmática");
export const QUIZ_M10_SIMULADO: QuizQuestion[] = generateMocks(10, "simulado");
