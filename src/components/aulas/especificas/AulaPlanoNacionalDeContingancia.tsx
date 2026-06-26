'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PLANO_NACIONAL_DE_CONTINGANCIA, QUIZ_M2_PLANO_NACIONAL_DE_CONTINGANCIA, QUIZ_M3_PLANO_NACIONAL_DE_CONTINGANCIA } from '@/data/quizzes/especificas/plano-nacional-de-contingancia';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPlanoNacionalDeContingancia({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-plano-nacional-de-contingancia');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-plano-nacional-de-contingancia', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Plano Nacional De Contingancia',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de plano nacional de contingancia.</p>
        </div>
      ),
      quiz: QUIZ_M1_PLANO_NACIONAL_DE_CONTINGANCIA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PLANO_NACIONAL_DE_CONTINGANCIA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PLANO_NACIONAL_DE_CONTINGANCIA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Plano Nacional De Contingancia"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
