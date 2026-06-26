'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GESTAO_DA_CADEIA_DE_SUPRIMENTOS, QUIZ_M2_GESTAO_DA_CADEIA_DE_SUPRIMENTOS, QUIZ_M3_GESTAO_DA_CADEIA_DE_SUPRIMENTOS } from '@/data/quizzes/especificas/gestao-da-cadeia-de-suprimentos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGestaoDaCadeiaDeSuprimentos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-gestao-da-cadeia-de-suprimentos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-gestao-da-cadeia-de-suprimentos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Gestao Da Cadeia De Suprimentos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de gestao da cadeia de suprimentos.</p>
        </div>
      ),
      quiz: QUIZ_M1_GESTAO_DA_CADEIA_DE_SUPRIMENTOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GESTAO_DA_CADEIA_DE_SUPRIMENTOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GESTAO_DA_CADEIA_DE_SUPRIMENTOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Gestao Da Cadeia De Suprimentos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
