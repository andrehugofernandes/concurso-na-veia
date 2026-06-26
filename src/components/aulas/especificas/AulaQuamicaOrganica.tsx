'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_QUAMICA_ORGANICA, QUIZ_M2_QUAMICA_ORGANICA, QUIZ_M3_QUAMICA_ORGANICA } from '@/data/quizzes/especificas/quamica-organica';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaQuamicaOrganica({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-quamica-organica');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-quamica-organica', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Quamica Organica',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de quamica organica.</p>
        </div>
      ),
      quiz: QUIZ_M1_QUAMICA_ORGANICA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_QUAMICA_ORGANICA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_QUAMICA_ORGANICA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Quamica Organica"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
