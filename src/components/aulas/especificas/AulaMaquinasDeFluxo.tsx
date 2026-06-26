'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MAQUINAS_DE_FLUXO, QUIZ_M2_MAQUINAS_DE_FLUXO, QUIZ_M3_MAQUINAS_DE_FLUXO } from '@/data/quizzes/especificas/maquinas-de-fluxo';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMaquinasDeFluxo({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-maquinas-de-fluxo');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-maquinas-de-fluxo', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Maquinas De Fluxo',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de maquinas de fluxo.</p>
        </div>
      ),
      quiz: QUIZ_M1_MAQUINAS_DE_FLUXO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MAQUINAS_DE_FLUXO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MAQUINAS_DE_FLUXO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Maquinas De Fluxo"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
