'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MOVIMENTAAAO_DE_CARGAS, QUIZ_M2_MOVIMENTAAAO_DE_CARGAS, QUIZ_M3_MOVIMENTAAAO_DE_CARGAS } from '@/data/quizzes/especificas/movimentaaao-de-cargas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMovimentaaaoDeCargas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-movimentaaao-de-cargas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-movimentaaao-de-cargas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Movimentaaao De Cargas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de movimentaaao de cargas.</p>
        </div>
      ),
      quiz: QUIZ_M1_MOVIMENTAAAO_DE_CARGAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MOVIMENTAAAO_DE_CARGAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MOVIMENTAAAO_DE_CARGAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Movimentaaao De Cargas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
