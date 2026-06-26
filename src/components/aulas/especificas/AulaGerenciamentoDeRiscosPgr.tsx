'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GERENCIAMENTO_DE_RISCOS_PGR, QUIZ_M2_GERENCIAMENTO_DE_RISCOS_PGR, QUIZ_M3_GERENCIAMENTO_DE_RISCOS_PGR } from '@/data/quizzes/especificas/gerenciamento-de-riscos-pgr';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGerenciamentoDeRiscosPgr({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-gerenciamento-de-riscos-pgr');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-gerenciamento-de-riscos-pgr', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Gerenciamento De Riscos Pgr',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de gerenciamento de riscos pgr.</p>
        </div>
      ),
      quiz: QUIZ_M1_GERENCIAMENTO_DE_RISCOS_PGR
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GERENCIAMENTO_DE_RISCOS_PGR
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GERENCIAMENTO_DE_RISCOS_PGR
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Gerenciamento De Riscos Pgr"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
