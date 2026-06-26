'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_REDES_SEM_FIO, QUIZ_M2_REDES_SEM_FIO, QUIZ_M3_REDES_SEM_FIO } from '@/data/quizzes/especificas/redes-sem-fio';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaRedesSemFio({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-redes-sem-fio');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-redes-sem-fio', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Redes Sem Fio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de redes sem fio.</p>
        </div>
      ),
      quiz: QUIZ_M1_REDES_SEM_FIO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_REDES_SEM_FIO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_REDES_SEM_FIO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Redes Sem Fio"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
