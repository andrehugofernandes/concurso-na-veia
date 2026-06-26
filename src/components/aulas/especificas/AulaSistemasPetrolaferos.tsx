'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_SISTEMAS_PETROLAFEROS, QUIZ_M2_SISTEMAS_PETROLAFEROS, QUIZ_M3_SISTEMAS_PETROLAFEROS } from '@/data/quizzes/especificas/sistemas-petrolaferos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaSistemasPetrolaferos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-sistemas-petrolaferos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-sistemas-petrolaferos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Sistemas Petrolaferos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de sistemas petrolaferos.</p>
        </div>
      ),
      quiz: QUIZ_M1_SISTEMAS_PETROLAFEROS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_SISTEMAS_PETROLAFEROS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_SISTEMAS_PETROLAFEROS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Sistemas Petrolaferos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
