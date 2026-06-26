'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TEORIA_DOS_JOGOS, QUIZ_M2_TEORIA_DOS_JOGOS, QUIZ_M3_TEORIA_DOS_JOGOS } from '@/data/quizzes/especificas/teoria-dos-jogos';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTeoriaDosJogos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-teoria-dos-jogos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-teoria-dos-jogos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Teoria Dos Jogos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de teoria dos jogos.</p>
        </div>
      ),
      quiz: QUIZ_M1_TEORIA_DOS_JOGOS
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TEORIA_DOS_JOGOS
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TEORIA_DOS_JOGOS
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Teoria Dos Jogos"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
