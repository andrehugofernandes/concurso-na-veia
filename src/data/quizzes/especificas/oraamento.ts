import { QuizQuestion } from '@/lib/types';

export const QUIZ_M1_ORAAMENTO: QuizQuestion[] = [
  {
    id: 'm1-1',
    pergunta: 'Questão de introdução sobre oraamento (Módulo 1)?',
    opcoes: [
      { label: 'A', valor: 'Alternativa A' },
      { label: 'B', valor: 'Alternativa B' },
      { label: 'C', valor: 'Alternativa C' },
      { label: 'D', valor: 'Alternativa D' }
    ],
    correta: 'A',
    explicacao: 'Explicação padrão para oraamento.'
  }
];

export const QUIZ_M2_ORAAMENTO: QuizQuestion[] = [
  {
    id: 'm2-1',
    pergunta: 'Questão de aprofundamento sobre oraamento (Módulo 2)?',
    opcoes: [
      { label: 'A', valor: 'Alternativa A' },
      { label: 'B', valor: 'Alternativa B' },
      { label: 'C', valor: 'Alternativa C' },
      { label: 'D', valor: 'Alternativa D' }
    ],
    correta: 'B',
    explicacao: 'Explicação padrão para oraamento.'
  }
];

export const QUIZ_M3_ORAAMENTO: QuizQuestion[] = [
  {
    id: 'm3-1',
    pergunta: 'Questão de simulado sobre oraamento (Módulo 3)?',
    opcoes: [
      { label: 'A', valor: 'Alternativa A' },
      { label: 'B', valor: 'Alternativa B' },
      { label: 'C', valor: 'Alternativa C' },
      { label: 'D', valor: 'Alternativa D' }
    ],
    correta: 'C',
    explicacao: 'Explicação padrão para oraamento.'
  }
];
