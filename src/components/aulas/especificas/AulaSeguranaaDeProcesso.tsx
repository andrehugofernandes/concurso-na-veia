'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SEGURANAA_DE_PROCESSO, QUIZ_M2_SEGURANAA_DE_PROCESSO, QUIZ_M3_SEGURANAA_DE_PROCESSO } from '@/data/quizzes/especificas/seguranaa-de-processo';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSeguranaaDeProcesso({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-seguranaa-de-processo');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-seguranaa-de-processo', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Seguranaa De Processo',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de seguranaa de processo.</p>
        </div>
      ),
      quiz: QUIZ_M1_SEGURANAA_DE_PROCESSO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SEGURANAA_DE_PROCESSO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SEGURANAA_DE_PROCESSO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Seguranaa De Processo"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
