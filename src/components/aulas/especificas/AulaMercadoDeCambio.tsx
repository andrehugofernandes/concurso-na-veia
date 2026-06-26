'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MERCADO_DE_CAMBIO, QUIZ_M2_MERCADO_DE_CAMBIO, QUIZ_M3_MERCADO_DE_CAMBIO } from '@/data/quizzes/especificas/mercado-de-cambio';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMercadoDeCambio({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-mercado-de-cambio');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-mercado-de-cambio', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Mercado De Cambio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de mercado de cambio.</p>
        </div>
      ),
      quiz: QUIZ_M1_MERCADO_DE_CAMBIO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MERCADO_DE_CAMBIO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MERCADO_DE_CAMBIO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Mercado De Cambio"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
