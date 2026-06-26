'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_PRINCAPIOS_DA_ADMINISTRAAAO_PABLICA, QUIZ_M2_PRINCAPIOS_DA_ADMINISTRAAAO_PABLICA, QUIZ_M3_PRINCAPIOS_DA_ADMINISTRAAAO_PABLICA } from '@/data/quizzes/especificas/princapios-da-administraaao-pablica';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaPrincapiosDaAdministraaaoPablica({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-princapios-da-administraaao-pablica');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-princapios-da-administraaao-pablica', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Princapios Da Administraaao Pablica',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de princapios da administraaao pablica.</p>
        </div>
      ),
      quiz: QUIZ_M1_PRINCAPIOS_DA_ADMINISTRAAAO_PABLICA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_PRINCAPIOS_DA_ADMINISTRAAAO_PABLICA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_PRINCAPIOS_DA_ADMINISTRAAAO_PABLICA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Princapios Da Administraaao Pablica"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
