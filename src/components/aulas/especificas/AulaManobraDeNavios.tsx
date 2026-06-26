'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MANOBRA_DE_NAVIOS, QUIZ_M2_MANOBRA_DE_NAVIOS, QUIZ_M3_MANOBRA_DE_NAVIOS } from '@/data/quizzes/especificas/manobra-de-navios';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaManobraDeNavios({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-manobra-de-navios');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-manobra-de-navios', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Manobra De Navios',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de manobra de navios.</p>
        </div>
      ),
      quiz: QUIZ_M1_MANOBRA_DE_NAVIOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MANOBRA_DE_NAVIOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MANOBRA_DE_NAVIOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Manobra De Navios"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
