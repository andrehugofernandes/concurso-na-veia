'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ADMINISTRAAAO_FINANCEIRA, QUIZ_M2_ADMINISTRAAAO_FINANCEIRA, QUIZ_M3_ADMINISTRAAAO_FINANCEIRA } from '@/data/quizzes/especificas/administraaao-financeira';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaAdministraaaoFinanceira({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-administraaao-financeira');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-administraaao-financeira', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Administraaao Financeira',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de administraaao financeira.</p>
        </div>
      ),
      quiz: QUIZ_M1_ADMINISTRAAAO_FINANCEIRA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ADMINISTRAAAO_FINANCEIRA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ADMINISTRAAAO_FINANCEIRA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Administraaao Financeira"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
