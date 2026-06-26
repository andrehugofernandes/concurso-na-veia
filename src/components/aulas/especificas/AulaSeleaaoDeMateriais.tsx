'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SELEAAO_DE_MATERIAIS, QUIZ_M2_SELEAAO_DE_MATERIAIS, QUIZ_M3_SELEAAO_DE_MATERIAIS } from '@/data/quizzes/especificas/seleaao-de-materiais';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSeleaaoDeMateriais({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-seleaao-de-materiais');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-seleaao-de-materiais', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Seleaao De Materiais',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de seleaao de materiais.</p>
        </div>
      ),
      quiz: QUIZ_M1_SELEAAO_DE_MATERIAIS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SELEAAO_DE_MATERIAIS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SELEAAO_DE_MATERIAIS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Seleaao De Materiais"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
