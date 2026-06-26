'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_INSTALAAAO_DE_EQUIPAMENTOS, QUIZ_M2_INSTALAAAO_DE_EQUIPAMENTOS, QUIZ_M3_INSTALAAAO_DE_EQUIPAMENTOS } from '@/data/quizzes/especificas/instalaaao-de-equipamentos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaInstalaaaoDeEquipamentos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-instalaaao-de-equipamentos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-instalaaao-de-equipamentos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Instalaaao De Equipamentos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de instalaaao de equipamentos.</p>
        </div>
      ),
      quiz: QUIZ_M1_INSTALAAAO_DE_EQUIPAMENTOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_INSTALAAAO_DE_EQUIPAMENTOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_INSTALAAAO_DE_EQUIPAMENTOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Instalaaao De Equipamentos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
