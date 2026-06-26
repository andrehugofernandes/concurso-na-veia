'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_REGIME_GERAL_DE_PREVIDANCIA_SOCIAL, QUIZ_M2_REGIME_GERAL_DE_PREVIDANCIA_SOCIAL, QUIZ_M3_REGIME_GERAL_DE_PREVIDANCIA_SOCIAL } from '@/data/quizzes/especificas/regime-geral-de-previdancia-social';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaRegimeGeralDePrevidanciaSocial({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-regime-geral-de-previdancia-social');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-regime-geral-de-previdancia-social', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Regime Geral De Previdancia Social',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de regime geral de previdancia social.</p>
        </div>
      ),
      quiz: QUIZ_M1_REGIME_GERAL_DE_PREVIDANCIA_SOCIAL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_REGIME_GERAL_DE_PREVIDANCIA_SOCIAL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_REGIME_GERAL_DE_PREVIDANCIA_SOCIAL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Regime Geral De Previdancia Social"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
