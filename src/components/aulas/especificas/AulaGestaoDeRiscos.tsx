'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GESTAO_DE_RISCOS, QUIZ_M2_GESTAO_DE_RISCOS, QUIZ_M3_GESTAO_DE_RISCOS } from '@/data/quizzes/especificas/gestao-de-riscos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGestaoDeRiscos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-gestao-de-riscos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-gestao-de-riscos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Gestao De Riscos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de gestao de riscos.</p>
        </div>
      ),
      quiz: QUIZ_M1_GESTAO_DE_RISCOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GESTAO_DE_RISCOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GESTAO_DE_RISCOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Gestao De Riscos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
