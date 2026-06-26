'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SUPORTE_A_VIDA, QUIZ_M2_SUPORTE_A_VIDA, QUIZ_M3_SUPORTE_A_VIDA } from '@/data/quizzes/especificas/suporte-a-vida';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSuporteAVida({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-suporte-a-vida');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-suporte-a-vida', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Suporte A Vida',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de suporte a vida.</p>
        </div>
      ),
      quiz: QUIZ_M1_SUPORTE_A_VIDA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SUPORTE_A_VIDA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SUPORTE_A_VIDA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Suporte A Vida"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
