import { QuizQuestion } from '@/lib/types';

export const QUIZ_M1_ENTREVISTA_DE_CAMPO: QuizQuestion[] = [
  {
    id: 'm1-1',
    pergunta: 'Questão de introdução sobre entrevista-de-campo (Módulo 1)?',
    opcoes: [
      { label: 'A', valor: 'Alternativa A' },
      { label: 'B', valor: 'Alternativa B' },
      { label: 'C', valor: 'Alternativa C' },
      { label: 'D', valor: 'Alternativa D' }
    ],
    correta: 'A',
    explicacao: 'Explicação padrão para entrevista-de-campo.'
  }
];

export const QUIZ_M2_ENTREVISTA_DE_CAMPO: QuizQuestion[] = [
  {
    id: 'm2-1',
    pergunta: 'Questão de aprofundamento sobre entrevista-de-campo (Módulo 2)?',
    opcoes: [
      { label: 'A', valor: 'Alternativa A' },
      { label: 'B', valor: 'Alternativa B' },
      { label: 'C', valor: 'Alternativa C' },
      { label: 'D', valor: 'Alternativa D' }
    ],
    correta: 'B',
    explicacao: 'Explicação padrão para entrevista-de-campo.'
  }
];

export const QUIZ_M3_ENTREVISTA_DE_CAMPO: QuizQuestion[] = [
  {
    id: 'm3-1',
    pergunta: 'Questão de simulado sobre entrevista-de-campo (Módulo 3)?',
    opcoes: [
      { label: 'A', valor: 'Alternativa A' },
      { label: 'B', valor: 'Alternativa B' },
      { label: 'C', valor: 'Alternativa C' },
      { label: 'D', valor: 'Alternativa D' }
    ],
    correta: 'C',
    explicacao: 'Explicação padrão para entrevista-de-campo.'
  }
];
