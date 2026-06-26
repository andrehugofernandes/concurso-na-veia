'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_MECANICA_DOS_FLUIDOS, QUIZ_M2_MECANICA_DOS_FLUIDOS, QUIZ_M3_MECANICA_DOS_FLUIDOS } from '@/data/quizzes/especificas/mecanica-dos-fluidos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMecanicaDosFluidos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-mecanica-dos-fluidos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-mecanica-dos-fluidos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Mecanica Dos Fluidos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de mecanica dos fluidos.</p>
        </div>
      ),
      quiz: QUIZ_M1_MECANICA_DOS_FLUIDOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_MECANICA_DOS_FLUIDOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_MECANICA_DOS_FLUIDOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Mecanica Dos Fluidos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
