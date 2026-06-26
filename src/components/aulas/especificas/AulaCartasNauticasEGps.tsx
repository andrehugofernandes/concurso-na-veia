'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_CARTAS_NAUTICAS_E_GPS, QUIZ_M2_CARTAS_NAUTICAS_E_GPS, QUIZ_M3_CARTAS_NAUTICAS_E_GPS } from '@/data/quizzes/especificas/cartas-nauticas-e-gps';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaCartasNauticasEGps({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-cartas-nauticas-e-gps');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-cartas-nauticas-e-gps', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Cartas Nauticas E Gps',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de cartas nauticas e gps.</p>
        </div>
      ),
      quiz: QUIZ_M1_CARTAS_NAUTICAS_E_GPS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_CARTAS_NAUTICAS_E_GPS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_CARTAS_NAUTICAS_E_GPS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Cartas Nauticas E Gps"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
