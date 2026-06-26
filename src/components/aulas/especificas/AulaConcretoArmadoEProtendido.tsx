'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_CONCRETO_ARMADO_E_PROTENDIDO, QUIZ_M2_CONCRETO_ARMADO_E_PROTENDIDO, QUIZ_M3_CONCRETO_ARMADO_E_PROTENDIDO } from '@/data/quizzes/especificas/concreto-armado-e-protendido';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaConcretoArmadoEProtendido({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-concreto-armado-e-protendido');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-concreto-armado-e-protendido', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Concreto Armado E Protendido',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de concreto armado e protendido.</p>
        </div>
      ),
      quiz: QUIZ_M1_CONCRETO_ARMADO_E_PROTENDIDO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_CONCRETO_ARMADO_E_PROTENDIDO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_CONCRETO_ARMADO_E_PROTENDIDO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Concreto Armado E Protendido"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
