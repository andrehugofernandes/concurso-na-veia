'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PRODUTOS_BANCARIOS, QUIZ_M2_PRODUTOS_BANCARIOS, QUIZ_M3_PRODUTOS_BANCARIOS } from '@/data/quizzes/especificas/produtos-bancarios';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaProdutosBancarios({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-produtos-bancarios');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-produtos-bancarios', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Produtos Bancarios',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de produtos bancarios.</p>
        </div>
      ),
      quiz: QUIZ_M1_PRODUTOS_BANCARIOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PRODUTOS_BANCARIOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PRODUTOS_BANCARIOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Produtos Bancarios"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
