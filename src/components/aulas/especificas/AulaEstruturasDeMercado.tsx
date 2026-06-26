'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ESTRUTURAS_DE_MERCADO, QUIZ_M2_ESTRUTURAS_DE_MERCADO, QUIZ_M3_ESTRUTURAS_DE_MERCADO } from '@/data/quizzes/especificas/estruturas-de-mercado';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEstruturasDeMercado({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-estruturas-de-mercado');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-estruturas-de-mercado', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Estruturas De Mercado',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de estruturas de mercado.</p>
        </div>
      ),
      quiz: QUIZ_M1_ESTRUTURAS_DE_MERCADO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ESTRUTURAS_DE_MERCADO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ESTRUTURAS_DE_MERCADO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Estruturas De Mercado"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
