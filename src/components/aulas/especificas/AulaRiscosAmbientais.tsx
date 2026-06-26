'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_RISCOS_AMBIENTAIS, QUIZ_M2_RISCOS_AMBIENTAIS, QUIZ_M3_RISCOS_AMBIENTAIS } from '@/data/quizzes/especificas/riscos-ambientais';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaRiscosAmbientais({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-riscos-ambientais');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-riscos-ambientais', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Riscos Ambientais',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de riscos ambientais.</p>
        </div>
      ),
      quiz: QUIZ_M1_RISCOS_AMBIENTAIS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_RISCOS_AMBIENTAIS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_RISCOS_AMBIENTAIS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Riscos Ambientais"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
