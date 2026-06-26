'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SISTEMAS_DE_CONTROLE, QUIZ_M2_SISTEMAS_DE_CONTROLE, QUIZ_M3_SISTEMAS_DE_CONTROLE } from '@/data/quizzes/especificas/sistemas-de-controle';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSistemasDeControle({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-sistemas-de-controle');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-sistemas-de-controle', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Sistemas De Controle',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de sistemas de controle.</p>
        </div>
      ),
      quiz: QUIZ_M1_SISTEMAS_DE_CONTROLE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SISTEMAS_DE_CONTROLE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SISTEMAS_DE_CONTROLE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Sistemas De Controle"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
