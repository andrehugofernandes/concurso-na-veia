'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PINTURA_INDUSTRIAL, QUIZ_M2_PINTURA_INDUSTRIAL, QUIZ_M3_PINTURA_INDUSTRIAL } from '@/data/quizzes/especificas/pintura-industrial';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPinturaIndustrial({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-pintura-industrial');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-pintura-industrial', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Pintura Industrial',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de pintura industrial.</p>
        </div>
      ),
      quiz: QUIZ_M1_PINTURA_INDUSTRIAL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PINTURA_INDUSTRIAL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PINTURA_INDUSTRIAL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Pintura Industrial"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
