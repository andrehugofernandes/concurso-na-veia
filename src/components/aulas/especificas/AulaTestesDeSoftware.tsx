'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TESTES_DE_SOFTWARE, QUIZ_M2_TESTES_DE_SOFTWARE, QUIZ_M3_TESTES_DE_SOFTWARE } from '@/data/quizzes/especificas/testes-de-software';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTestesDeSoftware({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-testes-de-software');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-testes-de-software', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Testes De Software',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de testes de software.</p>
        </div>
      ),
      quiz: QUIZ_M1_TESTES_DE_SOFTWARE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TESTES_DE_SOFTWARE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TESTES_DE_SOFTWARE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Testes De Software"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
