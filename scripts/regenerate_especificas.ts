import * as fs from 'fs';
import * as path from 'path';
import { PROFISSOES } from '../src/lib/profissoes-edital';

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

function slugToPascal(slug: string) {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

const dir = path.join(process.cwd(), 'src/components/aulas/especificas');

// Delete existing files
const existingFiles = fs.readdirSync(dir);
let deleted = 0;
for (const file of existingFiles) {
    if (file.endsWith('.tsx')) {
        fs.unlinkSync(path.join(dir, file));
        deleted++;
    }
}
console.log(`Deleted ${deleted} existing files.`);

// Generate new files
let generated = 0;
const uniqueSlugs = new Set<string>();

for (const profissao of PROFISSOES) {
    if (profissao.blocos) {
        for (let i = 0; i < profissao.blocos.length; i++) {
            const bloco = profissao.blocos[i];
            const numRoman = i === 0 ? '1' : i === 1 ? '2' : '3';
            
            for (const topicoTitulo of bloco.topicos) {
                const slug = slugify(topicoTitulo);
                if (uniqueSlugs.has(slug)) continue;
                uniqueSlugs.add(slug);

                const componentName = slugToPascal(slug);
                
                const content = `'use client';

import React, { useState, useEffect } from 'react';
import { AulaEspecificaTemplate } from '@/components/aulas/shared';

interface AulaProps {
  onComplete?: () => void;
}

export default function Aula${componentName}({ onComplete }: AulaProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aula-${slug}');
    if (saved === 'completed') {
      setIsCompleted(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aula-${slug}', 'completed');
    setIsCompleted(true);
    if (onComplete) onComplete();
  };

  const modules = [
    {
      title: 'Módulo 1: Introdução a ${topicoTitulo.replace(/'/g, "\\'")}',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Esta aula faz parte dos Conhecimentos Específicos para os cargos técnicos e superiores da Petrobras.</p>
          <p>O foco inicial deste módulo é introduzir os conceitos básicos de ${topicoTitulo.toLowerCase()}.</p>
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
      title="${topicoTitulo.replace(/'/g, "\\'")}"
      modules={modules}
      onComplete={handleComplete}
    />
  );
}
`;
                const filename = `Aula${componentName}.tsx`;
                fs.writeFileSync(path.join(dir, filename), content, 'utf-8');
                generated++;
            }
        }
    }
}

console.log(`Generated ${generated} correctly encoded files.`);
