'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PLANEJAMENTO_ESTRATAGICO, QUIZ_M2_PLANEJAMENTO_ESTRATAGICO, QUIZ_M3_PLANEJAMENTO_ESTRATAGICO } from '@/data/quizzes/especificas/planejamento-estratagico';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPlanejamentoEstratagico({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-planejamento-estratagico');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-planejamento-estratagico', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Planejamento Estratagico',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de planejamento estratagico.</p>
        </div>
      ),
      quiz: QUIZ_M1_PLANEJAMENTO_ESTRATAGICO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PLANEJAMENTO_ESTRATAGICO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PLANEJAMENTO_ESTRATAGICO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Planejamento Estratagico"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
