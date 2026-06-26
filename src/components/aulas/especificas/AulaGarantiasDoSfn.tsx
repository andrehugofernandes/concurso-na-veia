'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GARANTIAS_DO_SFN, QUIZ_M2_GARANTIAS_DO_SFN, QUIZ_M3_GARANTIAS_DO_SFN } from '@/data/quizzes/especificas/garantias-do-sfn';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGarantiasDoSfn({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-garantias-do-sfn');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-garantias-do-sfn', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Garantias Do Sfn',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de garantias do sfn.</p>
        </div>
      ),
      quiz: QUIZ_M1_GARANTIAS_DO_SFN
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GARANTIAS_DO_SFN
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GARANTIAS_DO_SFN
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Garantias Do Sfn"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
