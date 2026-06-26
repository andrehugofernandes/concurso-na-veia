'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_CALCULO_DE_TAXAS_DE_RESPOSTA, QUIZ_M2_CALCULO_DE_TAXAS_DE_RESPOSTA, QUIZ_M3_CALCULO_DE_TAXAS_DE_RESPOSTA } from '@/data/quizzes/especificas/calculo-de-taxas-de-resposta';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaCalculoDeTaxasDeResposta({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-calculo-de-taxas-de-resposta');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-calculo-de-taxas-de-resposta', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Calculo De Taxas De Resposta',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de calculo de taxas de resposta.</p>
        </div>
      ),
      quiz: QUIZ_M1_CALCULO_DE_TAXAS_DE_RESPOSTA
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_CALCULO_DE_TAXAS_DE_RESPOSTA
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_CALCULO_DE_TAXAS_DE_RESPOSTA
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Calculo De Taxas De Resposta"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
