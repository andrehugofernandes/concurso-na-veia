'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PROCESSOS_DE_FABRICAAAO, QUIZ_M2_PROCESSOS_DE_FABRICAAAO, QUIZ_M3_PROCESSOS_DE_FABRICAAAO } from '@/data/quizzes/especificas/processos-de-fabricaaao';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaProcessosDeFabricaaao({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-processos-de-fabricaaao');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-processos-de-fabricaaao', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Processos De Fabricaaao',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de processos de fabricaaao.</p>
        </div>
      ),
      quiz: QUIZ_M1_PROCESSOS_DE_FABRICAAAO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PROCESSOS_DE_FABRICAAAO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PROCESSOS_DE_FABRICAAAO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Processos De Fabricaaao"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
