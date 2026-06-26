'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PREVENAAO_DE_INCANDIO, QUIZ_M2_PREVENAAO_DE_INCANDIO, QUIZ_M3_PREVENAAO_DE_INCANDIO } from '@/data/quizzes/especificas/prevenaao-de-incandio';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPrevenaaoDeIncandio({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-prevenaao-de-incandio');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-prevenaao-de-incandio', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Prevenaao De Incandio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de prevenaao de incandio.</p>
        </div>
      ),
      quiz: QUIZ_M1_PREVENAAO_DE_INCANDIO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PREVENAAO_DE_INCANDIO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PREVENAAO_DE_INCANDIO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Prevenaao De Incandio"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
