'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SENSORIAMENTO_REMOTO, QUIZ_M2_SENSORIAMENTO_REMOTO, QUIZ_M3_SENSORIAMENTO_REMOTO } from '@/data/quizzes/especificas/sensoriamento-remoto';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSensoriamentoRemoto({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-sensoriamento-remoto');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-sensoriamento-remoto', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Sensoriamento Remoto',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de sensoriamento remoto.</p>
        </div>
      ),
      quiz: QUIZ_M1_SENSORIAMENTO_REMOTO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SENSORIAMENTO_REMOTO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SENSORIAMENTO_REMOTO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Sensoriamento Remoto"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
