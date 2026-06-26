'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_APH_EM_URGANCIAS, QUIZ_M2_APH_EM_URGANCIAS, QUIZ_M3_APH_EM_URGANCIAS } from '@/data/quizzes/especificas/aph-em-urgancias';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaAphEmUrgancias({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-aph-em-urgancias');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-aph-em-urgancias', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Aph Em Urgancias',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de aph em urgancias.</p>
        </div>
      ),
      quiz: QUIZ_M1_APH_EM_URGANCIAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_APH_EM_URGANCIAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_APH_EM_URGANCIAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Aph Em Urgancias"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
