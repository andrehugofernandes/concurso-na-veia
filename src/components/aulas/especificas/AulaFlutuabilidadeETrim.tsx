'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_FLUTUABILIDADE_E_TRIM, QUIZ_M2_FLUTUABILIDADE_E_TRIM, QUIZ_M3_FLUTUABILIDADE_E_TRIM } from '@/data/quizzes/especificas/flutuabilidade-e-trim';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaFlutuabilidadeETrim({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-flutuabilidade-e-trim');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-flutuabilidade-e-trim', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Flutuabilidade E Trim',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de flutuabilidade e trim.</p>
        </div>
      ),
      quiz: QUIZ_M1_FLUTUABILIDADE_E_TRIM
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_FLUTUABILIDADE_E_TRIM
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_FLUTUABILIDADE_E_TRIM
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Flutuabilidade E Trim"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
