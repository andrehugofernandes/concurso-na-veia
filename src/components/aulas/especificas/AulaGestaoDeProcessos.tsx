'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GESTAO_DE_PROCESSOS, QUIZ_M2_GESTAO_DE_PROCESSOS, QUIZ_M3_GESTAO_DE_PROCESSOS } from '@/data/quizzes/especificas/gestao-de-processos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGestaoDeProcessos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-gestao-de-processos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-gestao-de-processos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Gestao De Processos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de gestao de processos.</p>
        </div>
      ),
      quiz: QUIZ_M1_GESTAO_DE_PROCESSOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GESTAO_DE_PROCESSOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GESTAO_DE_PROCESSOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Gestao De Processos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
