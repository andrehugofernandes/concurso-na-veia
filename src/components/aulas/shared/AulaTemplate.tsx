'use client';

import React from 'react';
import { QuizQuestion } from '@/lib/types';
import { QuizInterativo } from '@/components/aulas/shared';

interface Module {
  title: string;
  content: React.ReactNode;
  quiz: QuizQuestion[];
}

interface AulaTemplateProps {
  title: string;
  modules: Module[];
  onComplete?: () => void;
}

export function AulaTemplate({ title, modules, onComplete }: AulaTemplateProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-3xl md:text-5xl font-black text-foreground mb-8">
        {title}
      </h1>

      {modules.map((mod, i) => (
        <section key={i} className="space-y-6">
          <h2 className="text-2xl font-bold text-yellow-400 border-b border-white/10 pb-2">
            {mod.title}
          </h2>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            {mod.content}
          </div>
          
          {mod.quiz && mod.quiz.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                📝 Teste seus conhecimentos
              </h3>
              <QuizInterativo questoes={mod.quiz} />
            </div>
          )}
        </section>
      ))}

      {onComplete && (
        <div className="flex justify-center pt-8 border-t border-white/10">
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-yellow-500/20"
          >
            Marcar Aula como Concluída
          </button>
        </div>
      )}
    </div>
  );
}
