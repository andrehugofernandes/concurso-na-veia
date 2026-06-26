'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_NORMAS_TACNICAS, QUIZ_M2_NORMAS_TACNICAS, QUIZ_M3_NORMAS_TACNICAS } from '@/data/quizzes/especificas/normas-tacnicas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaNormasTacnicas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-normas-tacnicas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-normas-tacnicas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Normas Tacnicas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de normas tacnicas.</p>
        </div>
      ),
      quiz: QUIZ_M1_NORMAS_TACNICAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_NORMAS_TACNICAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_NORMAS_TACNICAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Normas Tacnicas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
