'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_LAGICA_DE_PROGRAMAAAO, QUIZ_M2_LAGICA_DE_PROGRAMAAAO, QUIZ_M3_LAGICA_DE_PROGRAMAAAO } from '@/data/quizzes/especificas/lagica-de-programaaao';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaLagicaDeProgramaaao({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-lagica-de-programaaao');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-lagica-de-programaaao', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Lagica De Programaaao',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de lagica de programaaao.</p>
        </div>
      ),
      quiz: QUIZ_M1_LAGICA_DE_PROGRAMAAAO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_LAGICA_DE_PROGRAMAAAO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_LAGICA_DE_PROGRAMAAAO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Lagica De Programaaao"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
