'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_LEI_13303_ART_28_91, QUIZ_M2_LEI_13303_ART_28_91, QUIZ_M3_LEI_13303_ART_28_91 } from '@/data/quizzes/especificas/lei-13303-art-28-91';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaLei13303Art2891({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-lei-13303-art-28-91');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-lei-13303-art-28-91', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Lei 13303 Art 28 91',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de lei 13303 art 28 91.</p>
        </div>
      ),
      quiz: QUIZ_M1_LEI_13303_ART_28_91
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_LEI_13303_ART_28_91
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_LEI_13303_ART_28_91
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Lei 13303 Art 28 91"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
