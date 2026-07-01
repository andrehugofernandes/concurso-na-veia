'use client';

import React, { useState, useEffect } from 'react';
import { AulaEspecificaTemplate } from '@/components/aulas/shared';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEticaECondutaCaixa({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-etica-e-conduta-caixa');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-etica-e-conduta-caixa', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Ética e Conduta Caixa',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de ética e conduta caixa.</p>
        </div>
      ),
      quiz: []
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova da Transpetro e Petrobras.</p>
        </div>
      ),
      quiz: []
    }
  ];

  return (
    <AulaEspecificaTemplate
      title="Ética e Conduta Caixa"
      modules={modules}
      onComplete={handleComplete}
    />
  );
}
