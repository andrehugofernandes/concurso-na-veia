'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_DIREITOS_E_GARANTIAS_FUNDAMENTAIS, QUIZ_M2_DIREITOS_E_GARANTIAS_FUNDAMENTAIS, QUIZ_M3_DIREITOS_E_GARANTIAS_FUNDAMENTAIS } from '@/data/quizzes/especificas/direitos-e-garantias-fundamentais';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaDireitosEGarantiasFundamentais({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-direitos-e-garantias-fundamentais');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-direitos-e-garantias-fundamentais', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Direitos E Garantias Fundamentais',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de direitos e garantias fundamentais.</p>
        </div>
      ),
      quiz: QUIZ_M1_DIREITOS_E_GARANTIAS_FUNDAMENTAIS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_DIREITOS_E_GARANTIAS_FUNDAMENTAIS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_DIREITOS_E_GARANTIAS_FUNDAMENTAIS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Direitos E Garantias Fundamentais"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
