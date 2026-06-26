'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_RESOLUAAO_CMN_4860, QUIZ_M2_RESOLUAAO_CMN_4860, QUIZ_M3_RESOLUAAO_CMN_4860 } from '@/data/quizzes/especificas/resoluaao-cmn-4860';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaResoluaaoCmn4860({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-resoluaao-cmn-4860');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-resoluaao-cmn-4860', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Resoluaao Cmn 4860',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de resoluaao cmn 4860.</p>
        </div>
      ),
      quiz: QUIZ_M1_RESOLUAAO_CMN_4860
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_RESOLUAAO_CMN_4860
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_RESOLUAAO_CMN_4860
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Resoluaao Cmn 4860"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
