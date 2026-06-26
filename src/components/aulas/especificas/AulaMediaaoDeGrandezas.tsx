'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MEDIAAO_DE_GRANDEZAS, QUIZ_M2_MEDIAAO_DE_GRANDEZAS, QUIZ_M3_MEDIAAO_DE_GRANDEZAS } from '@/data/quizzes/especificas/mediaao-de-grandezas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMediaaoDeGrandezas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-mediaao-de-grandezas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-mediaao-de-grandezas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Mediaao De Grandezas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de mediaao de grandezas.</p>
        </div>
      ),
      quiz: QUIZ_M1_MEDIAAO_DE_GRANDEZAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MEDIAAO_DE_GRANDEZAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MEDIAAO_DE_GRANDEZAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Mediaao De Grandezas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
