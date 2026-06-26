'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ESTRUTURA_DO_SFN, QUIZ_M2_ESTRUTURA_DO_SFN, QUIZ_M3_ESTRUTURA_DO_SFN } from '@/data/quizzes/especificas/estrutura-do-sfn';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEstruturaDoSfn({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-estrutura-do-sfn');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-estrutura-do-sfn', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Estrutura Do Sfn',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de estrutura do sfn.</p>
        </div>
      ),
      quiz: QUIZ_M1_ESTRUTURA_DO_SFN
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ESTRUTURA_DO_SFN
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ESTRUTURA_DO_SFN
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Estrutura Do Sfn"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
