'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_TACNICAS_DE_VENDAS_NO_SETOR_BANCARIO, QUIZ_M2_TACNICAS_DE_VENDAS_NO_SETOR_BANCARIO, QUIZ_M3_TACNICAS_DE_VENDAS_NO_SETOR_BANCARIO } from '@/data/quizzes/especificas/tacnicas-de-vendas-no-setor-bancario';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaTacnicasDeVendasNoSetorBancario({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-tacnicas-de-vendas-no-setor-bancario');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-tacnicas-de-vendas-no-setor-bancario', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Tacnicas De Vendas No Setor Bancario',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de tacnicas de vendas no setor bancario.</p>
        </div>
      ),
      quiz: QUIZ_M1_TACNICAS_DE_VENDAS_NO_SETOR_BANCARIO
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_TACNICAS_DE_VENDAS_NO_SETOR_BANCARIO
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_TACNICAS_DE_VENDAS_NO_SETOR_BANCARIO
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Tacnicas De Vendas No Setor Bancario"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
