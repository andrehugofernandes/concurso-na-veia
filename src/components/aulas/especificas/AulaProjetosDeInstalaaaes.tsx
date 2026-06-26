'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PROJETOS_DE_INSTALAAAES, QUIZ_M2_PROJETOS_DE_INSTALAAAES, QUIZ_M3_PROJETOS_DE_INSTALAAAES } from '@/data/quizzes/especificas/projetos-de-instalaaaes';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaProjetosDeInstalaaaes({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-projetos-de-instalaaaes');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-projetos-de-instalaaaes', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Projetos De Instalaaaes',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de projetos de instalaaaes.</p>
        </div>
      ),
      quiz: QUIZ_M1_PROJETOS_DE_INSTALAAAES
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PROJETOS_DE_INSTALAAAES
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PROJETOS_DE_INSTALAAAES
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Projetos De Instalaaaes"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
