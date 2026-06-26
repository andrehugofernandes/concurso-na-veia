'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_RECUPERAAAO_SECUNDARIA, QUIZ_M2_RECUPERAAAO_SECUNDARIA, QUIZ_M3_RECUPERAAAO_SECUNDARIA } from '@/data/quizzes/especificas/recuperaaao-secundaria';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaRecuperaaaoSecundaria({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-recuperaaao-secundaria');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-recuperaaao-secundaria', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Recuperaaao Secundaria',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de recuperaaao secundaria.</p>
        </div>
      ),
      quiz: QUIZ_M1_RECUPERAAAO_SECUNDARIA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_RECUPERAAAO_SECUNDARIA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_RECUPERAAAO_SECUNDARIA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Recuperaaao Secundaria"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
