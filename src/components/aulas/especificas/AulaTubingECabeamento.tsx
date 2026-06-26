'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TUBING_E_CABEAMENTO, QUIZ_M2_TUBING_E_CABEAMENTO, QUIZ_M3_TUBING_E_CABEAMENTO } from '@/data/quizzes/especificas/tubing-e-cabeamento';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTubingECabeamento({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-tubing-e-cabeamento');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-tubing-e-cabeamento', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Tubing E Cabeamento',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de tubing e cabeamento.</p>
        </div>
      ),
      quiz: QUIZ_M1_TUBING_E_CABEAMENTO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TUBING_E_CABEAMENTO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TUBING_E_CABEAMENTO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Tubing E Cabeamento"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
