'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_CONTROLE_DE_QUALIDADE, QUIZ_M2_CONTROLE_DE_QUALIDADE, QUIZ_M3_CONTROLE_DE_QUALIDADE } from '@/data/quizzes/especificas/controle-de-qualidade';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaControleDeQualidade({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-controle-de-qualidade');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-controle-de-qualidade', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Controle De Qualidade',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de controle de qualidade.</p>
        </div>
      ),
      quiz: QUIZ_M1_CONTROLE_DE_QUALIDADE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_CONTROLE_DE_QUALIDADE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_CONTROLE_DE_QUALIDADE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Controle De Qualidade"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
