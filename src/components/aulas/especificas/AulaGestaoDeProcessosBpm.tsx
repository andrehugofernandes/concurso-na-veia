'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_GESTAO_DE_PROCESSOS_BPM, QUIZ_M2_GESTAO_DE_PROCESSOS_BPM, QUIZ_M3_GESTAO_DE_PROCESSOS_BPM } from '@/data/quizzes/especificas/gestao-de-processos-bpm';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaGestaoDeProcessosBpm({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-gestao-de-processos-bpm');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-gestao-de-processos-bpm', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Gestao De Processos Bpm',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de gestao de processos bpm.</p>
        </div>
      ),
      quiz: QUIZ_M1_GESTAO_DE_PROCESSOS_BPM
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_GESTAO_DE_PROCESSOS_BPM
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_GESTAO_DE_PROCESSOS_BPM
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Gestao De Processos Bpm"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
