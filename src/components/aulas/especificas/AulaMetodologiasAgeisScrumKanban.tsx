'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_METODOLOGIAS_AGEIS_SCRUM_KANBAN, QUIZ_M2_METODOLOGIAS_AGEIS_SCRUM_KANBAN, QUIZ_M3_METODOLOGIAS_AGEIS_SCRUM_KANBAN } from '@/data/quizzes/especificas/metodologias-ageis-scrum-kanban';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaMetodologiasAgeisScrumKanban({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-metodologias-ageis-scrum-kanban');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-metodologias-ageis-scrum-kanban', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Metodologias Ageis Scrum Kanban',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de metodologias ageis scrum kanban.</p>
        </div>
      ),
      quiz: QUIZ_M1_METODOLOGIAS_AGEIS_SCRUM_KANBAN
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_METODOLOGIAS_AGEIS_SCRUM_KANBAN
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_METODOLOGIAS_AGEIS_SCRUM_KANBAN
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Metodologias Ageis Scrum Kanban"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
