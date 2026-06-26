'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ESTATASTICA_ECONAMICA, QUIZ_M2_ESTATASTICA_ECONAMICA, QUIZ_M3_ESTATASTICA_ECONAMICA } from '@/data/quizzes/especificas/estatastica-econamica';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEstatasticaEconamica({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-estatastica-econamica');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-estatastica-econamica', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Estatastica Econamica',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de estatastica econamica.</p>
        </div>
      ),
      quiz: QUIZ_M1_ESTATASTICA_ECONAMICA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ESTATASTICA_ECONAMICA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ESTATASTICA_ECONAMICA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Estatastica Econamica"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
