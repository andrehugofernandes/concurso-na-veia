'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_NORMAS_REGULAMENTADORAS_NRS, QUIZ_M2_NORMAS_REGULAMENTADORAS_NRS, QUIZ_M3_NORMAS_REGULAMENTADORAS_NRS } from '@/data/quizzes/especificas/normas-regulamentadoras-nrs';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaNormasRegulamentadorasNrs({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-normas-regulamentadoras-nrs');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-normas-regulamentadoras-nrs', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Normas Regulamentadoras Nrs',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de normas regulamentadoras nrs.</p>
        </div>
      ),
      quiz: QUIZ_M1_NORMAS_REGULAMENTADORAS_NRS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_NORMAS_REGULAMENTADORAS_NRS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_NORMAS_REGULAMENTADORAS_NRS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Normas Regulamentadoras Nrs"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
