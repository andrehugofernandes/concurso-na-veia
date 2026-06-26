'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ANALISE_DE_SISTEMAS_DE_POTANCIA, QUIZ_M2_ANALISE_DE_SISTEMAS_DE_POTANCIA, QUIZ_M3_ANALISE_DE_SISTEMAS_DE_POTANCIA } from '@/data/quizzes/especificas/analise-de-sistemas-de-potancia';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaAnaliseDeSistemasDePotancia({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-analise-de-sistemas-de-potancia');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-analise-de-sistemas-de-potancia', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Analise De Sistemas De Potancia',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de analise de sistemas de potancia.</p>
        </div>
      ),
      quiz: QUIZ_M1_ANALISE_DE_SISTEMAS_DE_POTANCIA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ANALISE_DE_SISTEMAS_DE_POTANCIA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ANALISE_DE_SISTEMAS_DE_POTANCIA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Analise De Sistemas De Potancia"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
