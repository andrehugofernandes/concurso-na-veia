'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PROPRIEDADES_DO_PETRALEO, QUIZ_M2_PROPRIEDADES_DO_PETRALEO, QUIZ_M3_PROPRIEDADES_DO_PETRALEO } from '@/data/quizzes/especificas/propriedades-do-petraleo';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPropriedadesDoPetraleo({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-propriedades-do-petraleo');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-propriedades-do-petraleo', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Propriedades Do Petraleo',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de propriedades do petraleo.</p>
        </div>
      ),
      quiz: QUIZ_M1_PROPRIEDADES_DO_PETRALEO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PROPRIEDADES_DO_PETRALEO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PROPRIEDADES_DO_PETRALEO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Propriedades Do Petraleo"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
