'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ARQUITETURA_DE_SISTEMAS, QUIZ_M2_ARQUITETURA_DE_SISTEMAS, QUIZ_M3_ARQUITETURA_DE_SISTEMAS } from '@/data/quizzes/especificas/arquitetura-de-sistemas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaArquiteturaDeSistemas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-arquitetura-de-sistemas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-arquitetura-de-sistemas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Arquitetura De Sistemas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de arquitetura de sistemas.</p>
        </div>
      ),
      quiz: QUIZ_M1_ARQUITETURA_DE_SISTEMAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ARQUITETURA_DE_SISTEMAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ARQUITETURA_DE_SISTEMAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Arquitetura De Sistemas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
