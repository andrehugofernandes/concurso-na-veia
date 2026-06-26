'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ESTRUTURAS_DE_DADOS, QUIZ_M2_ESTRUTURAS_DE_DADOS, QUIZ_M3_ESTRUTURAS_DE_DADOS } from '@/data/quizzes/especificas/estruturas-de-dados';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEstruturasDeDados({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-estruturas-de-dados');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-estruturas-de-dados', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Estruturas De Dados',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de estruturas de dados.</p>
        </div>
      ),
      quiz: QUIZ_M1_ESTRUTURAS_DE_DADOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ESTRUTURAS_DE_DADOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ESTRUTURAS_DE_DADOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Estruturas De Dados"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
