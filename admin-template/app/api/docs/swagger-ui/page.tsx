'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false }) as React.ComponentType<{ spec: unknown }>;

export default function SwaggerUIPage() {
  const [spec, setSpec] = useState<unknown>(null);

  useEffect(() => {
    fetch('/api/docs/swagger.json')
      .then((res) => res.json())
      .then((data) => setSpec(data))
      .catch((err) => console.error('Erro ao carregar spec:', err));
  }, []);

  if (!spec) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando Swagger UI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SwaggerUI spec={spec} />
    </div>
  );
}
