'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_DIVERSIDADE_E_INCLUSAO, QUIZ_M2_DIVERSIDADE_E_INCLUSAO, QUIZ_M3_DIVERSIDADE_E_INCLUSAO } from '@/data/quizzes/especificas/diversidade-e-inclusao';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaDiversidadeEInclusao({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-diversidade-e-inclusao');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-diversidade-e-inclusao', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Diversidade E Inclusao',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de diversidade e inclusao.</p>
        </div>
      ),
      quiz: QUIZ_M1_DIVERSIDADE_E_INCLUSAO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_DIVERSIDADE_E_INCLUSAO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_DIVERSIDADE_E_INCLUSAO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Diversidade E Inclusao"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
