'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SEGURADOS_E_DEPENDENTES, QUIZ_M2_SEGURADOS_E_DEPENDENTES, QUIZ_M3_SEGURADOS_E_DEPENDENTES } from '@/data/quizzes/especificas/segurados-e-dependentes';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSeguradosEDependentes({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-segurados-e-dependentes');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-segurados-e-dependentes', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Segurados E Dependentes',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de segurados e dependentes.</p>
        </div>
      ),
      quiz: QUIZ_M1_SEGURADOS_E_DEPENDENTES
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SEGURADOS_E_DEPENDENTES
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SEGURADOS_E_DEPENDENTES
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Segurados E Dependentes"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
