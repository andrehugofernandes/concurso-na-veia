'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MODAIS_DE_TRANSPORTE, QUIZ_M2_MODAIS_DE_TRANSPORTE, QUIZ_M3_MODAIS_DE_TRANSPORTE } from '@/data/quizzes/especificas/modais-de-transporte';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaModaisDeTransporte({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-modais-de-transporte');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-modais-de-transporte', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Modais De Transporte',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de modais de transporte.</p>
        </div>
      ),
      quiz: QUIZ_M1_MODAIS_DE_TRANSPORTE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MODAIS_DE_TRANSPORTE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MODAIS_DE_TRANSPORTE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Modais De Transporte"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
