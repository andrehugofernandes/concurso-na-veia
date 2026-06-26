'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_REGULAMENTO_DE_LICITAAAES_PETROBRAS_RLCP, QUIZ_M2_REGULAMENTO_DE_LICITAAAES_PETROBRAS_RLCP, QUIZ_M3_REGULAMENTO_DE_LICITAAAES_PETROBRAS_RLCP } from '@/data/quizzes/especificas/regulamento-de-licitaaaes-petrobras-rlcp';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaRegulamentoDeLicitaaaesPetrobrasRlcp({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-regulamento-de-licitaaaes-petrobras-rlcp');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-regulamento-de-licitaaaes-petrobras-rlcp', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Regulamento De Licitaaaes Petrobras Rlcp',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de regulamento de licitaaaes petrobras rlcp.</p>
        </div>
      ),
      quiz: QUIZ_M1_REGULAMENTO_DE_LICITAAAES_PETROBRAS_RLCP
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_REGULAMENTO_DE_LICITAAAES_PETROBRAS_RLCP
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_REGULAMENTO_DE_LICITAAAES_PETROBRAS_RLCP
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Regulamento De Licitaaaes Petrobras Rlcp"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
