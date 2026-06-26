'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ATICA_E_CONDUTA_CAIXA, QUIZ_M2_ATICA_E_CONDUTA_CAIXA, QUIZ_M3_ATICA_E_CONDUTA_CAIXA } from '@/data/quizzes/especificas/atica-e-conduta-caixa';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaAticaECondutaCaixa({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-atica-e-conduta-caixa');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-atica-e-conduta-caixa', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Atica E Conduta Caixa',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de atica e conduta caixa.</p>
        </div>
      ),
      quiz: QUIZ_M1_ATICA_E_CONDUTA_CAIXA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ATICA_E_CONDUTA_CAIXA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ATICA_E_CONDUTA_CAIXA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Atica E Conduta Caixa"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
