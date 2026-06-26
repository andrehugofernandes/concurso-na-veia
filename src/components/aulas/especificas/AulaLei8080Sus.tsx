'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_LEI_8080_SUS, QUIZ_M2_LEI_8080_SUS, QUIZ_M3_LEI_8080_SUS } from '@/data/quizzes/especificas/lei-8080-sus';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaLei8080Sus({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-lei-8080-sus');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-lei-8080-sus', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Lei 8080 Sus',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de lei 8080 sus.</p>
        </div>
      ),
      quiz: QUIZ_M1_LEI_8080_SUS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_LEI_8080_SUS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_LEI_8080_SUS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Lei 8080 Sus"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
