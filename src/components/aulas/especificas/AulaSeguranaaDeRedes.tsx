'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SEGURANAA_DE_REDES, QUIZ_M2_SEGURANAA_DE_REDES, QUIZ_M3_SEGURANAA_DE_REDES } from '@/data/quizzes/especificas/seguranaa-de-redes';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSeguranaaDeRedes({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-seguranaa-de-redes');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-seguranaa-de-redes', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Seguranaa De Redes',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de seguranaa de redes.</p>
        </div>
      ),
      quiz: QUIZ_M1_SEGURANAA_DE_REDES
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SEGURANAA_DE_REDES
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SEGURANAA_DE_REDES
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Seguranaa De Redes"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
