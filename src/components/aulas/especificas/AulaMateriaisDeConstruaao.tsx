'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MATERIAIS_DE_CONSTRUAAO, QUIZ_M2_MATERIAIS_DE_CONSTRUAAO, QUIZ_M3_MATERIAIS_DE_CONSTRUAAO } from '@/data/quizzes/especificas/materiais-de-construaao';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMateriaisDeConstruaao({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-materiais-de-construaao');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-materiais-de-construaao', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Materiais De Construaao',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de materiais de construaao.</p>
        </div>
      ),
      quiz: QUIZ_M1_MATERIAIS_DE_CONSTRUAAO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MATERIAIS_DE_CONSTRUAAO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MATERIAIS_DE_CONSTRUAAO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Materiais De Construaao"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
