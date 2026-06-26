'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SISTEMAS_INSTRUMENTADOS_DE_SEGURANAA, QUIZ_M2_SISTEMAS_INSTRUMENTADOS_DE_SEGURANAA, QUIZ_M3_SISTEMAS_INSTRUMENTADOS_DE_SEGURANAA } from '@/data/quizzes/especificas/sistemas-instrumentados-de-seguranaa';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSistemasInstrumentadosDeSeguranaa({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-sistemas-instrumentados-de-seguranaa');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-sistemas-instrumentados-de-seguranaa', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Sistemas Instrumentados De Seguranaa',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de sistemas instrumentados de seguranaa.</p>
        </div>
      ),
      quiz: QUIZ_M1_SISTEMAS_INSTRUMENTADOS_DE_SEGURANAA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SISTEMAS_INSTRUMENTADOS_DE_SEGURANAA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SISTEMAS_INSTRUMENTADOS_DE_SEGURANAA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Sistemas Instrumentados De Seguranaa"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
