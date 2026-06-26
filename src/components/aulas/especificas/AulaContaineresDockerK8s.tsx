'use client';

import React, { useState, useEffect } from 'react';
import { AulaTemplate } from '@/components/aulas/shared/AulaTemplate';
import { QuizQuestion } from '@/lib/types';
import { QUIZ_M1_CONTAINERES_DOCKER_K8S, QUIZ_M2_CONTAINERES_DOCKER_K8S, QUIZ_M3_CONTAINERES_DOCKER_K8S } from '@/data/quizzes/especificas/containeres-docker-k8s';

interface AulaProps {
  onComplete?: () => void;
}

export default function AulaContaineresDockerK8s({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-containeres-docker-k8s');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-containeres-docker-k8s', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a Containeres Docker K8S',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de containeres docker k8s.</p>
        </div>
      ),
      quiz: QUIZ_M1_CONTAINERES_DOCKER_K8S
    },
    {
      title: 'Módulo 2: Aprofundamento Prático',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Neste módulo, mergulhamos nas aplicações industriais e cenários reais de prova.</p>
        </div>
      ),
      quiz: QUIZ_M2_CONTAINERES_DOCKER_K8S
    },
    {
      title: 'Módulo 3: Simulado Cesgranrio',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Questões no padrão da banca Cesgranrio para consolidação final.</p>
        </div>
      ),
      quiz: QUIZ_M3_CONTAINERES_DOCKER_K8S
    }
  ];

  return (
    <AulaTemplate
      title="Aula: Containeres Docker K8S"
      modules={modules}
      onComplete={isCompleted ? undefined : handleComplete}
    />
  );
}
