'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_FASICA_DA_TERRA_SALIDA, QUIZ_M2_FASICA_DA_TERRA_SALIDA, QUIZ_M3_FASICA_DA_TERRA_SALIDA } from '@/data/quizzes/especificas/fasica-da-terra-salida';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaFasicaDaTerraSalida({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-fasica-da-terra-salida');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-fasica-da-terra-salida', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Fasica Da Terra Salida',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de fasica da terra salida.</p>
        </div>
      ),
      quiz: QUIZ_M1_FASICA_DA_TERRA_SALIDA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_FASICA_DA_TERRA_SALIDA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_FASICA_DA_TERRA_SALIDA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Fasica Da Terra Salida"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
