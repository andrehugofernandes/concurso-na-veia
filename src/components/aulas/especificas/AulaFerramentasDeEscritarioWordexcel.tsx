'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_FERRAMENTAS_DE_ESCRITARIO_WORDEXCEL, QUIZ_M2_FERRAMENTAS_DE_ESCRITARIO_WORDEXCEL, QUIZ_M3_FERRAMENTAS_DE_ESCRITARIO_WORDEXCEL } from '@/data/quizzes/especificas/ferramentas-de-escritario-wordexcel';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaFerramentasDeEscritarioWordexcel({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-ferramentas-de-escritario-wordexcel');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-ferramentas-de-escritario-wordexcel', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Ferramentas De Escritario Wordexcel',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de ferramentas de escritario wordexcel.</p>
        </div>
      ),
      quiz: QUIZ_M1_FERRAMENTAS_DE_ESCRITARIO_WORDEXCEL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_FERRAMENTAS_DE_ESCRITARIO_WORDEXCEL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_FERRAMENTAS_DE_ESCRITARIO_WORDEXCEL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Ferramentas De Escritario Wordexcel"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
