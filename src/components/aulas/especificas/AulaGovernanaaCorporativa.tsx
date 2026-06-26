'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GOVERNANAA_CORPORATIVA, QUIZ_M2_GOVERNANAA_CORPORATIVA, QUIZ_M3_GOVERNANAA_CORPORATIVA } from '@/data/quizzes/especificas/governanaa-corporativa';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGovernanaaCorporativa({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-governanaa-corporativa');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-governanaa-corporativa', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Governanaa Corporativa',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de governanaa corporativa.</p>
        </div>
      ),
      quiz: QUIZ_M1_GOVERNANAA_CORPORATIVA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GOVERNANAA_CORPORATIVA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GOVERNANAA_CORPORATIVA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Governanaa Corporativa"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
