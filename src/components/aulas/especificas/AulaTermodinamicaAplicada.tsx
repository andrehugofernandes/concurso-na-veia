'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TERMODINAMICA_APLICADA, QUIZ_M2_TERMODINAMICA_APLICADA, QUIZ_M3_TERMODINAMICA_APLICADA } from '@/data/quizzes/especificas/termodinamica-aplicada';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTermodinamicaAplicada({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-termodinamica-aplicada');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-termodinamica-aplicada', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Termodinamica Aplicada',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de termodinamica aplicada.</p>
        </div>
      ),
      quiz: QUIZ_M1_TERMODINAMICA_APLICADA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TERMODINAMICA_APLICADA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TERMODINAMICA_APLICADA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Termodinamica Aplicada"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
