'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_LINUX_RED_HATDEBIAN, QUIZ_M2_LINUX_RED_HATDEBIAN, QUIZ_M3_LINUX_RED_HATDEBIAN } from '@/data/quizzes/especificas/linux-red-hatdebian';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaLinuxRedHatdebian({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-linux-red-hatdebian');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-linux-red-hatdebian', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Linux Red Hatdebian',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de linux red hatdebian.</p>
        </div>
      ),
      quiz: QUIZ_M1_LINUX_RED_HATDEBIAN
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_LINUX_RED_HATDEBIAN
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_LINUX_RED_HATDEBIAN
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Linux Red Hatdebian"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
