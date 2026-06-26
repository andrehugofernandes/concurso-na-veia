'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MONTAGEM_DE_CLPSDCD, QUIZ_M2_MONTAGEM_DE_CLPSDCD, QUIZ_M3_MONTAGEM_DE_CLPSDCD } from '@/data/quizzes/especificas/montagem-de-clpsdcd';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMontagemDeClpsdcd({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-montagem-de-clpsdcd');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-montagem-de-clpsdcd', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Montagem De Clpsdcd',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de montagem de clpsdcd.</p>
        </div>
      ),
      quiz: QUIZ_M1_MONTAGEM_DE_CLPSDCD
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MONTAGEM_DE_CLPSDCD
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MONTAGEM_DE_CLPSDCD
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Montagem De Clpsdcd"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
