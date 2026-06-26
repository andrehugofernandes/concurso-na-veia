'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_FISCALIZAAAO_DE_OBRAS, QUIZ_M2_FISCALIZAAAO_DE_OBRAS, QUIZ_M3_FISCALIZAAAO_DE_OBRAS } from '@/data/quizzes/especificas/fiscalizaaao-de-obras';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaFiscalizaaaoDeObras({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-fiscalizaaao-de-obras');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-fiscalizaaao-de-obras', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Fiscalizaaao De Obras',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de fiscalizaaao de obras.</p>
        </div>
      ),
      quiz: QUIZ_M1_FISCALIZAAAO_DE_OBRAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_FISCALIZAAAO_DE_OBRAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_FISCALIZAAAO_DE_OBRAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Fiscalizaaao De Obras"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
