'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ESTRUTURAS_METALICAS, QUIZ_M2_ESTRUTURAS_METALICAS, QUIZ_M3_ESTRUTURAS_METALICAS } from '@/data/quizzes/especificas/estruturas-metalicas';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEstruturasMetalicas({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-estruturas-metalicas');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-estruturas-metalicas', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Estruturas Metalicas',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de estruturas metalicas.</p>
        </div>
      ),
      quiz: QUIZ_M1_ESTRUTURAS_METALICAS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ESTRUTURAS_METALICAS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ESTRUTURAS_METALICAS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Estruturas Metalicas"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
