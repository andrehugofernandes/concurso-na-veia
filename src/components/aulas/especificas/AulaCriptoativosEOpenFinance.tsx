'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_CRIPTOATIVOS_E_OPEN_FINANCE, QUIZ_M2_CRIPTOATIVOS_E_OPEN_FINANCE, QUIZ_M3_CRIPTOATIVOS_E_OPEN_FINANCE } from '@/data/quizzes/especificas/criptoativos-e-open-finance';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaCriptoativosEOpenFinance({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-criptoativos-e-open-finance');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-criptoativos-e-open-finance', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Criptoativos E Open Finance',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de criptoativos e open finance.</p>
        </div>
      ),
      quiz: QUIZ_M1_CRIPTOATIVOS_E_OPEN_FINANCE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_CRIPTOATIVOS_E_OPEN_FINANCE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_CRIPTOATIVOS_E_OPEN_FINANCE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Criptoativos E Open Finance"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
