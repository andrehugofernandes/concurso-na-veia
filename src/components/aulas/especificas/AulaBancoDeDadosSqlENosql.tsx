'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_BANCO_DE_DADOS_SQL_E_NOSQL, QUIZ_M2_BANCO_DE_DADOS_SQL_E_NOSQL, QUIZ_M3_BANCO_DE_DADOS_SQL_E_NOSQL } from '@/data/quizzes/especificas/banco-de-dados-sql-e-nosql';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaBancoDeDadosSqlENosql({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-banco-de-dados-sql-e-nosql');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-banco-de-dados-sql-e-nosql', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Banco De Dados Sql E Nosql',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de banco de dados sql e nosql.</p>
        </div>
      ),
      quiz: QUIZ_M1_BANCO_DE_DADOS_SQL_E_NOSQL
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_BANCO_DE_DADOS_SQL_E_NOSQL
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_BANCO_DE_DADOS_SQL_E_NOSQL
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Banco De Dados Sql E Nosql"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
