'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_LEITURA_DE_MAPAS_E_CROQUIS, QUIZ_M2_LEITURA_DE_MAPAS_E_CROQUIS, QUIZ_M3_LEITURA_DE_MAPAS_E_CROQUIS } from '@/data/quizzes/especificas/leitura-de-mapas-e-croquis';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaLeituraDeMapasECroquis({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-leitura-de-mapas-e-croquis');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-leitura-de-mapas-e-croquis', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Leitura De Mapas E Croquis',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de leitura de mapas e croquis.</p>
        </div>
      ),
      quiz: QUIZ_M1_LEITURA_DE_MAPAS_E_CROQUIS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_LEITURA_DE_MAPAS_E_CROQUIS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_LEITURA_DE_MAPAS_E_CROQUIS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Leitura De Mapas E Croquis"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
