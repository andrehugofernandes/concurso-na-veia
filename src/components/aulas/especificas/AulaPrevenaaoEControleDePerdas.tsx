'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PREVENAAO_E_CONTROLE_DE_PERDAS, QUIZ_M2_PREVENAAO_E_CONTROLE_DE_PERDAS, QUIZ_M3_PREVENAAO_E_CONTROLE_DE_PERDAS } from '@/data/quizzes/especificas/prevenaao-e-controle-de-perdas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPrevenaaoEControleDePerdas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-prevenaao-e-controle-de-perdas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-prevenaao-e-controle-de-perdas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Prevenaao E Controle De Perdas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de prevenaao e controle de perdas.</p>
        </div>
      ),
      quiz: QUIZ_M1_PREVENAAO_E_CONTROLE_DE_PERDAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PREVENAAO_E_CONTROLE_DE_PERDAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PREVENAAO_E_CONTROLE_DE_PERDAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Prevenaao E Controle De Perdas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
