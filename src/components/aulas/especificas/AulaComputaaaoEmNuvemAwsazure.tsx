'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_COMPUTAAAO_EM_NUVEM_AWSAZURE, QUIZ_M2_COMPUTAAAO_EM_NUVEM_AWSAZURE, QUIZ_M3_COMPUTAAAO_EM_NUVEM_AWSAZURE } from '@/data/quizzes/especificas/computaaao-em-nuvem-awsazure';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaComputaaaoEmNuvemAwsazure({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-computaaao-em-nuvem-awsazure');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-computaaao-em-nuvem-awsazure', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Computaaao Em Nuvem Awsazure',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de computaaao em nuvem awsazure.</p>
        </div>
      ),
      quiz: QUIZ_M1_COMPUTAAAO_EM_NUVEM_AWSAZURE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_COMPUTAAAO_EM_NUVEM_AWSAZURE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_COMPUTAAAO_EM_NUVEM_AWSAZURE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Computaaao Em Nuvem Awsazure"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
