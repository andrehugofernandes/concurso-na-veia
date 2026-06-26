'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_CADIGO_DE_ATICA_DO_IBGE, QUIZ_M2_CADIGO_DE_ATICA_DO_IBGE, QUIZ_M3_CADIGO_DE_ATICA_DO_IBGE } from '@/data/quizzes/especificas/cadigo-de-atica-do-ibge';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaCadigoDeAticaDoIbge({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-cadigo-de-atica-do-ibge');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-cadigo-de-atica-do-ibge', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Cadigo De Atica Do Ibge',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de cadigo de atica do ibge.</p>
        </div>
      ),
      quiz: QUIZ_M1_CADIGO_DE_ATICA_DO_IBGE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_CADIGO_DE_ATICA_DO_IBGE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_CADIGO_DE_ATICA_DO_IBGE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Cadigo De Atica Do Ibge"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
