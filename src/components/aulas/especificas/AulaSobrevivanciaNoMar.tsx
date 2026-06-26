'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SOBREVIVANCIA_NO_MAR, QUIZ_M2_SOBREVIVANCIA_NO_MAR, QUIZ_M3_SOBREVIVANCIA_NO_MAR } from '@/data/quizzes/especificas/sobrevivancia-no-mar';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSobrevivanciaNoMar({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-sobrevivancia-no-mar');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-sobrevivancia-no-mar', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Sobrevivancia No Mar',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de sobrevivancia no mar.</p>
        </div>
      ),
      quiz: QUIZ_M1_SOBREVIVANCIA_NO_MAR
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SOBREVIVANCIA_NO_MAR
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SOBREVIVANCIA_NO_MAR
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Sobrevivancia No Mar"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
