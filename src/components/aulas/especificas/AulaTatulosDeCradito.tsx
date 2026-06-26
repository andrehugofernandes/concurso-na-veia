'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TATULOS_DE_CRADITO, QUIZ_M2_TATULOS_DE_CRADITO, QUIZ_M3_TATULOS_DE_CRADITO } from '@/data/quizzes/especificas/tatulos-de-cradito';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTatulosDeCradito({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-tatulos-de-cradito');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-tatulos-de-cradito', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Tatulos De Cradito',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de tatulos de cradito.</p>
        </div>
      ),
      quiz: QUIZ_M1_TATULOS_DE_CRADITO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TATULOS_DE_CRADITO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TATULOS_DE_CRADITO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Tatulos De Cradito"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
