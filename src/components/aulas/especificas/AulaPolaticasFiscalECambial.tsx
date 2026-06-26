'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_POLATICAS_FISCAL_E_CAMBIAL, QUIZ_M2_POLATICAS_FISCAL_E_CAMBIAL, QUIZ_M3_POLATICAS_FISCAL_E_CAMBIAL } from '@/data/quizzes/especificas/polaticas-fiscal-e-cambial';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPolaticasFiscalECambial({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-polaticas-fiscal-e-cambial');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-polaticas-fiscal-e-cambial', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Polaticas Fiscal E Cambial',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de polaticas fiscal e cambial.</p>
        </div>
      ),
      quiz: QUIZ_M1_POLATICAS_FISCAL_E_CAMBIAL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_POLATICAS_FISCAL_E_CAMBIAL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_POLATICAS_FISCAL_E_CAMBIAL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Polaticas Fiscal E Cambial"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
