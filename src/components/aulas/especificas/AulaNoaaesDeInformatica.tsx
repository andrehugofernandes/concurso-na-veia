'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_NOAAES_DE_INFORMATICA, QUIZ_M2_NOAAES_DE_INFORMATICA, QUIZ_M3_NOAAES_DE_INFORMATICA } from '@/data/quizzes/especificas/noaaes-de-informatica';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaNoaaesDeInformatica({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-noaaes-de-informatica');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-noaaes-de-informatica', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Noaaes De Informatica',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de noaaes de informatica.</p>
        </div>
      ),
      quiz: QUIZ_M1_NOAAES_DE_INFORMATICA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_NOAAES_DE_INFORMATICA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_NOAAES_DE_INFORMATICA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Noaaes De Informatica"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
