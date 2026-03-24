import { Questao } from "../../shared";

// Módulo 1: Definição e Responsabilidade
export const QUIZ_M1_NR35_INTRO: Questao[] = [
  {
    pergunta: "A NR-35 considera trabalho em altura toda atividade executada acima de quantos metros do nível inferior, onde haja risco de queda?",
    opcoes: ["1,50 metros", "1,80 metros", "2,00 metros", "3,00 metros"],
    respostaCorreta: 2,
    explicacao: "Conforme o item 35.1.2, considera-se trabalho em altura toda atividade executada acima de 2,00 m (dois metros) do nível inferior, onde haja risco de queda."
  },
  {
    pergunta: "Cabe ao empregador, em relação ao trabalho em altura:",
    opcoes: [
      "Zelar pela sua própria segurança e saúde.",
      "Garantir a implementação das medidas de proteção estabelecidas na norma.",
      "Comprar seus próprios EPIs de marca preferida.",
      "Ignorar o uso de cinturão em atividades rápidas."
    ],
    respostaCorreta: 1,
    explicacao: "O item 35.3.1 estabelece que cabe ao empregador garantir a implementação das medidas de proteção estabelecidas na Norma."
  }
];

// Módulo 2: Planejamento e Organização (AR e PT)
export const QUIZ_M2_NR35_AR_PT: Questao[] = [
  {
    pergunta: "A Análise de Risco (AR) deve considerar, entre outros fatores:",
    opcoes: [
        "Apenas os riscos de queda de nível.",
        "As condições meteorológicas adversas.",
        "O custo dos equipamentos importados.",
        "A cor da farda do trabalhador."
    ],
    respostaCorreta: 1,
    explicacao: "A AR deve considerar as condições meteorológicas adversas (Item 35.5.2) e outros riscos adicionais."
  }
];

// Módulo 9: Escadas (Anexo III - NOVO 2023)
export const QUIZ_M9_NR35_ESCADAS: Questao[] = [
  {
    pergunta: "De acordo com o Anexo III da NR-35 (2023), as escadas portáteis devem possuir:",
    opcoes: [
        "Pés antiderrapantes.",
        "Rodízios para transporte rápido com carga.",
        "Assento para descanso no último degrau.",
        "Pintura em azul petróleo obrigatória."
    ],
    respostaCorreta: 0,
    explicacao: "O Anexo III exige que escadas portáteis tenham dispositivos que impeçam o deslizamento (pés antiderrapantes)."
  }
];

// Fallback para outros módulos não implementados no detalhe de questões
export const QUIZ_M3_NR35_CAPACITACAO = QUIZ_M1_NR35_INTRO;
export const QUIZ_M4_NR35_SPQ = QUIZ_M1_NR35_INTRO;
export const QUIZ_M5_NR35_ANCORAGEM = QUIZ_M1_NR35_INTRO;
export const QUIZ_M6_NR35_EPIS = QUIZ_M1_NR35_INTRO;
export const QUIZ_M7_NR35_CORDAS = QUIZ_M1_NR35_INTRO;
export const QUIZ_M8_NR35_SISTEMAS = QUIZ_M1_NR35_INTRO;
export const QUIZ_M10_NR35_RESGATE = QUIZ_M1_NR35_INTRO;
