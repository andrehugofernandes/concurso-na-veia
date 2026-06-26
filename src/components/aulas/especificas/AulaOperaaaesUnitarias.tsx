'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_OPERAAAES_UNITARIAS, QUIZ_M2_OPERAAAES_UNITARIAS, QUIZ_M3_OPERAAAES_UNITARIAS } from '@/data/quizzes/especificas/operaaaes-unitarias';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaOperaaaesUnitarias({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-operaaaes-unitarias');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-operaaaes-unitarias', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Operaaaes Unitarias',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de operaaaes unitarias.</p>
        </div>
      ),
      quiz: QUIZ_M1_OPERAAAES_UNITARIAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_OPERAAAES_UNITARIAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_OPERAAAES_UNITARIAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Operaaaes Unitarias"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
