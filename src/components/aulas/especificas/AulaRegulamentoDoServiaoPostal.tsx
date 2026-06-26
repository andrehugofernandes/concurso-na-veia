'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_REGULAMENTO_DO_SERVIAO_POSTAL, QUIZ_M2_REGULAMENTO_DO_SERVIAO_POSTAL, QUIZ_M3_REGULAMENTO_DO_SERVIAO_POSTAL } from '@/data/quizzes/especificas/regulamento-do-serviao-postal';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaRegulamentoDoServiaoPostal({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-regulamento-do-serviao-postal');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-regulamento-do-serviao-postal', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Regulamento Do Serviao Postal',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de regulamento do serviao postal.</p>
        </div>
      ),
      quiz: QUIZ_M1_REGULAMENTO_DO_SERVIAO_POSTAL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_REGULAMENTO_DO_SERVIAO_POSTAL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_REGULAMENTO_DO_SERVIAO_POSTAL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Regulamento Do Serviao Postal"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
