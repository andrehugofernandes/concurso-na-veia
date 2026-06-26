'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ELETRICIDADE_BASICA, QUIZ_M2_ELETRICIDADE_BASICA, QUIZ_M3_ELETRICIDADE_BASICA } from '@/data/quizzes/especificas/eletricidade-basica';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEletricidadeBasica({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-eletricidade-basica');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-eletricidade-basica', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Eletricidade Basica',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de eletricidade basica.</p>
        </div>
      ),
      quiz: QUIZ_M1_ELETRICIDADE_BASICA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ELETRICIDADE_BASICA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ELETRICIDADE_BASICA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Eletricidade Basica"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
