'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TACNICAS_DE_VENDAS, QUIZ_M2_TACNICAS_DE_VENDAS, QUIZ_M3_TACNICAS_DE_VENDAS } from '@/data/quizzes/especificas/tacnicas-de-vendas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTacnicasDeVendas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-tacnicas-de-vendas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-tacnicas-de-vendas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Tacnicas De Vendas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de tacnicas de vendas.</p>
        </div>
      ),
      quiz: QUIZ_M1_TACNICAS_DE_VENDAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TACNICAS_DE_VENDAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TACNICAS_DE_VENDAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Tacnicas De Vendas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
