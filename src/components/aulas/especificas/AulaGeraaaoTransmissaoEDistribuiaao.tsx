'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GERAAAO_TRANSMISSAO_E_DISTRIBUIAAO, QUIZ_M2_GERAAAO_TRANSMISSAO_E_DISTRIBUIAAO, QUIZ_M3_GERAAAO_TRANSMISSAO_E_DISTRIBUIAAO } from '@/data/quizzes/especificas/geraaao-transmissao-e-distribuiaao';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGeraaaoTransmissaoEDistribuiaao({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-geraaao-transmissao-e-distribuiaao');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-geraaao-transmissao-e-distribuiaao', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Geraaao Transmissao E Distribuiaao',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de geraaao transmissao e distribuiaao.</p>
        </div>
      ),
      quiz: QUIZ_M1_GERAAAO_TRANSMISSAO_E_DISTRIBUIAAO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GERAAAO_TRANSMISSAO_E_DISTRIBUIAAO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GERAAAO_TRANSMISSAO_E_DISTRIBUIAAO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Geraaao Transmissao E Distribuiaao"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
