'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SEDIMENTOLOGIA, QUIZ_M2_SEDIMENTOLOGIA, QUIZ_M3_SEDIMENTOLOGIA } from '@/data/quizzes/especificas/sedimentologia';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSedimentologia({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-sedimentologia');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-sedimentologia', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Sedimentologia',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de sedimentologia.</p>
        </div>
      ),
      quiz: QUIZ_M1_SEDIMENTOLOGIA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SEDIMENTOLOGIA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SEDIMENTOLOGIA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Sedimentologia"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
