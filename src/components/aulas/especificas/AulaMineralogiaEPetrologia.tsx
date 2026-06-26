'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MINERALOGIA_E_PETROLOGIA, QUIZ_M2_MINERALOGIA_E_PETROLOGIA, QUIZ_M3_MINERALOGIA_E_PETROLOGIA } from '@/data/quizzes/especificas/mineralogia-e-petrologia';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMineralogiaEPetrologia({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-mineralogia-e-petrologia');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-mineralogia-e-petrologia', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Mineralogia E Petrologia',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de mineralogia e petrologia.</p>
        </div>
      ),
      quiz: QUIZ_M1_MINERALOGIA_E_PETROLOGIA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MINERALOGIA_E_PETROLOGIA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MINERALOGIA_E_PETROLOGIA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Mineralogia E Petrologia"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
