'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AulaProps } from '../shared';

// Function to convert slug to PascalCase (e.g., mecanica-fluidos -> MecanicaFluidos)
function slugToPascal(slug: string) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

interface LoaderProps extends AulaProps {
  topicoId: string;
}

export default function DynamicEspecificaLoader({ topicoId, ...props }: LoaderProps) {
  const componentName = slugToPascal(topicoId);

  // Webpack will bundle all .tsx files in the especificas directory
  const DynamicAula = dynamic<AulaProps>(
    () => import(`@/components/aulas/especificas/Aula${componentName}.tsx`).catch(() => {
      return () => (
        <div className="p-8 text-center text-red-400">
          Erro ao carregar a aula {componentName}. Arquivo não encontrado.
        </div>
      );
    }),
    {
      ssr: false,
      loading: () => <div className="animate-pulse h-96 bg-muted rounded-xl" />,
    }
  );

  return <DynamicAula {...props} />;
}
