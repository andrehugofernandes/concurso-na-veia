'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MATODOS_DE_ELEVAAAO_ARTIFICIAL, QUIZ_M2_MATODOS_DE_ELEVAAAO_ARTIFICIAL, QUIZ_M3_MATODOS_DE_ELEVAAAO_ARTIFICIAL } from '@/data/quizzes/especificas/matodos-de-elevaaao-artificial';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMatodosDeElevaaaoArtificial({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-matodos-de-elevaaao-artificial');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-matodos-de-elevaaao-artificial', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Matodos De Elevaaao Artificial',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de matodos de elevaaao artificial.</p>
        </div>
      ),
      quiz: QUIZ_M1_MATODOS_DE_ELEVAAAO_ARTIFICIAL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MATODOS_DE_ELEVAAAO_ARTIFICIAL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MATODOS_DE_ELEVAAAO_ARTIFICIAL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Matodos De Elevaaao Artificial"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
