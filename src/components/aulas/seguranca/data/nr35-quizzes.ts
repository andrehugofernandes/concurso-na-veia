import { QuizQuestion } from "../../shared";

/**
 * QUIZ: NR-35 - MÓDULO 1: Gestão e Planejamento
 */
export const QUIZ_M1_NR35_GESTAO: QuizQuestion[] = [
  {
    id: "nr35_m1_1",
    pergunta: "De acordo com a NR-35, considera-se trabalho em altura toda atividade executada acima de quantos metros do nível inferior, onde haja risco de queda?",
    opcoes: [
      { label: "A", valor: "1,50 metros" },
      { label: "B", valor: "2,00 metros" },
      { label: "C", valor: "2,50 metros" },
      { label: "D", valor: "3,00 metros" }
    ],
    correta: "B",
    explicacao: "A NR-35 define trabalho em altura como toda atividade executada acima de 2,00 m (dois metros) do nível inferior, onde haja risco de queda."
  }
];

/**
 * QUIZ: NR-35 - MÓDULO 2: Análise de Risco e PT
 */
export const QUIZ_M2_NR35_AR_PT: QuizQuestion[] = [
  {
    id: "nr35_m2_1",
    pergunta: "As atividades de trabalho em altura não rotineiras devem ser precedidas obrigatoriamente de qual documento?",
    opcoes: [
      { label: "A", valor: "Ordem de Serviço" },
      { label: "B", valor: "Atestado de Saúde Ocupacional (ASO)" },
      { label: "C", valor: "Permissão de Trabalho (PT)" },
      { label: "D", valor: "Relatório de Incidente" }
    ],
    correta: "C",
    explicacao: "Para atividades de trabalho em altura não rotineiras, a Permissão de Trabalho (PT) é obrigatória, baseada nas recomendações da Análise de Risco (AR)."
  }
];

/**
 * QUIZ: NR-35 - MÓDULO 3: EPI, EPC e Sistemas de Proteção
 */
export const QUIZ_M3_NR35_SISTEMAS: QuizQuestion[] = [
  {
    id: "nr35_m3_1",
    pergunta: "Qual é o nome do componente do sistema de proteção contra quedas que tem a função de limitar a força de impacto transmitida ao trabalhador em caso de queda?",
    opcoes: [
      { label: "A", valor: "Talabarte simples" },
      { label: "B", valor: "Trava-quedas" },
      { label: "C", valor: "Absorvedor de energia" },
      { label: "D", valor: "Conector manual" }
    ],
    correta: "C",
    explicacao: "O absorvedor de energia é essencial em talabartes de segurança para reduzir o impacto no corpo do trabalhador durante a frenagem de uma queda."
  }
];

/**
 * QUIZ: NR-35 - MÓDULO 4: Emergência e Salvamento
 */
export const QUIZ_M4_NR35_EMERGENCIA: QuizQuestion[] = [
  {
    id: "nr35_m4_1",
    pergunta: "A suspensão inerte de um trabalhador após uma queda pode levar a graves complicações circulatórias em poucos minutos. Como este fenômeno é conhecido?",
    opcoes: [
      { label: "A", valor: "Choque anafilático" },
      { label: "B", valor: "Trauma de Suspensão" },
      { label: "C", valor: "Insolação severa" },
      { label: "D", valor: "Hipotermia súbita" }
    ],
    correta: "B",
    explicacao: "O trauma de suspensão (ou intolerância à suspensão inerte) ocorre quando o trabalhador fica pendurado e imóvel no cinto, prejudicando o retorno venoso."
  }
];

/**
 * QUIZ: NR-35 - MÓDULO 5: Acesso por Cordas e Escadas
 */
export const QUIZ_M5_NR35_ACESSOS: QuizQuestion[] = [
  {
    id: "nr35_m5_1",
    pergunta: "No sistema de acesso por cordas (Anexo I), quantas cordas são obrigatoriamente necessárias para a execução do trabalho com segurança?",
    opcoes: [
      { label: "A", valor: "Uma corda única de alta resistência." },
      { label: "B", valor: "Duas cordas: uma de trabalho e uma de segurança (back-up)." },
      { label: "C", valor: "Três cordas: trabalho, segurança e resgate." },
      { label: "D", valor: "Uma corda e uma corrente de aço." }
    ],
    correta: "B",
    explicacao: "O sistema de acesso por cordas deve ser composto por pelo menos duas cordas com pontos de ancoragem independentes: a corda de trabalho e a corda de segurança."
  }
];
