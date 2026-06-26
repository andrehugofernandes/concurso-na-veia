'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_LISTAS_DE_INSTRUMENTOS, QUIZ_M2_LISTAS_DE_INSTRUMENTOS, QUIZ_M3_LISTAS_DE_INSTRUMENTOS } from '@/data/quizzes/especificas/listas-de-instrumentos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaListasDeInstrumentos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-listas-de-instrumentos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-listas-de-instrumentos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Listas De Instrumentos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de listas de instrumentos.</p>
        </div>
      ),
      quiz: QUIZ_M1_LISTAS_DE_INSTRUMENTOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_LISTAS_DE_INSTRUMENTOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_LISTAS_DE_INSTRUMENTOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Listas De Instrumentos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
