'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TRANSMISSAO_DE_CALOR, QUIZ_M2_TRANSMISSAO_DE_CALOR, QUIZ_M3_TRANSMISSAO_DE_CALOR } from '@/data/quizzes/especificas/transmissao-de-calor';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTransmissaoDeCalor({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-transmissao-de-calor');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-transmissao-de-calor', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Transmissao De Calor',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de transmissao de calor.</p>
        </div>
      ),
      quiz: QUIZ_M1_TRANSMISSAO_DE_CALOR
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TRANSMISSAO_DE_CALOR
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TRANSMISSAO_DE_CALOR
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Transmissao De Calor"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
