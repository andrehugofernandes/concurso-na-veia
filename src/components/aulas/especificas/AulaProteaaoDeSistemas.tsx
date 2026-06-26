'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PROTEAAO_DE_SISTEMAS, QUIZ_M2_PROTEAAO_DE_SISTEMAS, QUIZ_M3_PROTEAAO_DE_SISTEMAS } from '@/data/quizzes/especificas/proteaao-de-sistemas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaProteaaoDeSistemas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-proteaao-de-sistemas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-proteaao-de-sistemas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Proteaao De Sistemas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de proteaao de sistemas.</p>
        </div>
      ),
      quiz: QUIZ_M1_PROTEAAO_DE_SISTEMAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PROTEAAO_DE_SISTEMAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PROTEAAO_DE_SISTEMAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Proteaao De Sistemas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
