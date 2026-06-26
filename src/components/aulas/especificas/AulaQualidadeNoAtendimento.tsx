'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_QUALIDADE_NO_ATENDIMENTO, QUIZ_M2_QUALIDADE_NO_ATENDIMENTO, QUIZ_M3_QUALIDADE_NO_ATENDIMENTO } from '@/data/quizzes/especificas/qualidade-no-atendimento';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaQualidadeNoAtendimento({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-qualidade-no-atendimento');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-qualidade-no-atendimento', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Qualidade No Atendimento',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de qualidade no atendimento.</p>
        </div>
      ),
      quiz: QUIZ_M1_QUALIDADE_NO_ATENDIMENTO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_QUALIDADE_NO_ATENDIMENTO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_QUALIDADE_NO_ATENDIMENTO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Qualidade No Atendimento"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
