'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MARKETING_DE_RELACIONAMENTO, QUIZ_M2_MARKETING_DE_RELACIONAMENTO, QUIZ_M3_MARKETING_DE_RELACIONAMENTO } from '@/data/quizzes/especificas/marketing-de-relacionamento';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMarketingDeRelacionamento({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-marketing-de-relacionamento');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-marketing-de-relacionamento', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Marketing De Relacionamento',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de marketing de relacionamento.</p>
        </div>
      ),
      quiz: QUIZ_M1_MARKETING_DE_RELACIONAMENTO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MARKETING_DE_RELACIONAMENTO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MARKETING_DE_RELACIONAMENTO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Marketing De Relacionamento"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
