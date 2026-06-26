'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ANALISE_ESTRUTURAL, QUIZ_M2_ANALISE_ESTRUTURAL, QUIZ_M3_ANALISE_ESTRUTURAL } from '@/data/quizzes/especificas/analise-estrutural';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaAnaliseEstrutural({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-analise-estrutural');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-analise-estrutural', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Analise Estrutural',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de analise estrutural.</p>
        </div>
      ),
      quiz: QUIZ_M1_ANALISE_ESTRUTURAL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ANALISE_ESTRUTURAL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ANALISE_ESTRUTURAL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Analise Estrutural"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
