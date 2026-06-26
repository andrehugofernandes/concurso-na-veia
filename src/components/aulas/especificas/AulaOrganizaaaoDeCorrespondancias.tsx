'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ORGANIZAAAO_DE_CORRESPONDANCIAS, QUIZ_M2_ORGANIZAAAO_DE_CORRESPONDANCIAS, QUIZ_M3_ORGANIZAAAO_DE_CORRESPONDANCIAS } from '@/data/quizzes/especificas/organizaaao-de-correspondancias';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaOrganizaaaoDeCorrespondancias({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-organizaaao-de-correspondancias');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-organizaaao-de-correspondancias', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Organizaaao De Correspondancias',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de organizaaao de correspondancias.</p>
        </div>
      ),
      quiz: QUIZ_M1_ORGANIZAAAO_DE_CORRESPONDANCIAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ORGANIZAAAO_DE_CORRESPONDANCIAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ORGANIZAAAO_DE_CORRESPONDANCIAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Organizaaao De Correspondancias"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
