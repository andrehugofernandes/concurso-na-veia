'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PROPRIEDADES_DA_ROCHA_E_FLUIDOS, QUIZ_M2_PROPRIEDADES_DA_ROCHA_E_FLUIDOS, QUIZ_M3_PROPRIEDADES_DA_ROCHA_E_FLUIDOS } from '@/data/quizzes/especificas/propriedades-da-rocha-e-fluidos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPropriedadesDaRochaEFluidos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-propriedades-da-rocha-e-fluidos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-propriedades-da-rocha-e-fluidos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Propriedades Da Rocha E Fluidos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de propriedades da rocha e fluidos.</p>
        </div>
      ),
      quiz: QUIZ_M1_PROPRIEDADES_DA_ROCHA_E_FLUIDOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PROPRIEDADES_DA_ROCHA_E_FLUIDOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PROPRIEDADES_DA_ROCHA_E_FLUIDOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Propriedades Da Rocha E Fluidos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
