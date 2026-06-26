'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_LINGUAGENS_JAVA_PYTHON_C, QUIZ_M2_LINGUAGENS_JAVA_PYTHON_C, QUIZ_M3_LINGUAGENS_JAVA_PYTHON_C } from '@/data/quizzes/especificas/linguagens-java-python-c';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaLinguagensJavaPythonC({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-linguagens-java-python-c');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-linguagens-java-python-c', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Linguagens Java Python C',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de linguagens java python c.</p>
        </div>
      ),
      quiz: QUIZ_M1_LINGUAGENS_JAVA_PYTHON_C
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_LINGUAGENS_JAVA_PYTHON_C
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_LINGUAGENS_JAVA_PYTHON_C
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Linguagens Java Python C"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
