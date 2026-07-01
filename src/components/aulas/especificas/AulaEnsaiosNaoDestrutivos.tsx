'use client';

import React, { useState, useEffect } from 'react';
import { AulaEspecificaTemplate } from '@/components/aulas/shared';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaEnsaiosNaoDestrutivos({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-ensaios-nao-destrutivos');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-ensaios-nao-destrutivos', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Ensaios não destrutivos',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de ensaios não destrutivos.</p>
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
      title="Ensaios não destrutivos"
      modules={modules}
      onComplete={handleComplete}
    />
  );
}
