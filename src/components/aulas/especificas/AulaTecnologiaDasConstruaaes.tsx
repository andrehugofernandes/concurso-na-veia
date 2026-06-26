'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TECNOLOGIA_DAS_CONSTRUAAES, QUIZ_M2_TECNOLOGIA_DAS_CONSTRUAAES, QUIZ_M3_TECNOLOGIA_DAS_CONSTRUAAES } from '@/data/quizzes/especificas/tecnologia-das-construaaes';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTecnologiaDasConstruaaes({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-tecnologia-das-construaaes');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-tecnologia-das-construaaes', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Tecnologia Das Construaaes',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de tecnologia das construaaes.</p>
        </div>
      ),
      quiz: QUIZ_M1_TECNOLOGIA_DAS_CONSTRUAAES
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TECNOLOGIA_DAS_CONSTRUAAES
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TECNOLOGIA_DAS_CONSTRUAAES
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Tecnologia Das Construaaes"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
