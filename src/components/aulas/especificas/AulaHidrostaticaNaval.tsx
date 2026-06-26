'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_HIDROSTATICA_NAVAL, QUIZ_M2_HIDROSTATICA_NAVAL, QUIZ_M3_HIDROSTATICA_NAVAL } from '@/data/quizzes/especificas/hidrostatica-naval';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaHidrostaticaNaval({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-hidrostatica-naval');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-hidrostatica-naval', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Hidrostatica Naval',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de hidrostatica naval.</p>
        </div>
      ),
      quiz: QUIZ_M1_HIDROSTATICA_NAVAL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_HIDROSTATICA_NAVAL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_HIDROSTATICA_NAVAL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Hidrostatica Naval"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
