'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MATODOS_INSTRUMENTAIS_DE_ANALISE, QUIZ_M2_MATODOS_INSTRUMENTAIS_DE_ANALISE, QUIZ_M3_MATODOS_INSTRUMENTAIS_DE_ANALISE } from '@/data/quizzes/especificas/matodos-instrumentais-de-analise';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMatodosInstrumentaisDeAnalise({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-matodos-instrumentais-de-analise');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-matodos-instrumentais-de-analise', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Matodos Instrumentais De Analise',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de matodos instrumentais de analise.</p>
        </div>
      ),
      quiz: QUIZ_M1_MATODOS_INSTRUMENTAIS_DE_ANALISE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MATODOS_INSTRUMENTAIS_DE_ANALISE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MATODOS_INSTRUMENTAIS_DE_ANALISE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Matodos Instrumentais De Analise"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
