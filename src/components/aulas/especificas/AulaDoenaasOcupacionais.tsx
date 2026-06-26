'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_DOENAAS_OCUPACIONAIS, QUIZ_M2_DOENAAS_OCUPACIONAIS, QUIZ_M3_DOENAAS_OCUPACIONAIS } from '@/data/quizzes/especificas/doenaas-ocupacionais';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaDoenaasOcupacionais({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-doenaas-ocupacionais');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-doenaas-ocupacionais', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Doenaas Ocupacionais',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de doenaas ocupacionais.</p>
        </div>
      ),
      quiz: QUIZ_M1_DOENAAS_OCUPACIONAIS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_DOENAAS_OCUPACIONAIS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_DOENAAS_OCUPACIONAIS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Doenaas Ocupacionais"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
