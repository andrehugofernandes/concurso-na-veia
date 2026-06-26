'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_ATENDIMENTO_AO_CLIENTE, QUIZ_M2_ATENDIMENTO_AO_CLIENTE, QUIZ_M3_ATENDIMENTO_AO_CLIENTE } from '@/data/quizzes/especificas/atendimento-ao-cliente';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaAtendimentoAoCliente({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-atendimento-ao-cliente');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-atendimento-ao-cliente', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Atendimento Ao Cliente',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de atendimento ao cliente.</p>
        </div>
      ),
      quiz: QUIZ_M1_ATENDIMENTO_AO_CLIENTE
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_ATENDIMENTO_AO_CLIENTE
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_ATENDIMENTO_AO_CLIENTE
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Atendimento Ao Cliente"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
