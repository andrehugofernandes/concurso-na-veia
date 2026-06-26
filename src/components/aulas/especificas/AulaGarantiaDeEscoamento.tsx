'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GARANTIA_DE_ESCOAMENTO, QUIZ_M2_GARANTIA_DE_ESCOAMENTO, QUIZ_M3_GARANTIA_DE_ESCOAMENTO } from '@/data/quizzes/especificas/garantia-de-escoamento';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGarantiaDeEscoamento({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-garantia-de-escoamento');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-garantia-de-escoamento', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Garantia De Escoamento',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de garantia de escoamento.</p>
        </div>
      ),
      quiz: QUIZ_M1_GARANTIA_DE_ESCOAMENTO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GARANTIA_DE_ESCOAMENTO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GARANTIA_DE_ESCOAMENTO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Garantia De Escoamento"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
