'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_HIDRAULICA_APLICADA, QUIZ_M2_HIDRAULICA_APLICADA, QUIZ_M3_HIDRAULICA_APLICADA } from '@/data/quizzes/especificas/hidraulica-aplicada';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaHidraulicaAplicada({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-hidraulica-aplicada');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-hidraulica-aplicada', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Hidraulica Aplicada',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de hidraulica aplicada.</p>
        </div>
      ),
      quiz: QUIZ_M1_HIDRAULICA_APLICADA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_HIDRAULICA_APLICADA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_HIDRAULICA_APLICADA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Hidraulica Aplicada"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
