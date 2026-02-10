'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Code, Book, Download, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import 'swagger-ui-react/swagger-ui.css';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const SwaggerUI = dynamic<Record<string, unknown>>(
  () => import('swagger-ui-react').then((mod) => mod.default),
  { ssr: false }
);

interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  paths: Record<string, unknown>;
  tags?: Array<{ name: string; description?: string }>;
}

export default function ApiDocsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const role = useMemo(() => (user?.role ?? '').toUpperCase(), [user?.role]);
  const isSysadmin = role === 'SYSADMIN';
  const [spec, setSpec] = useState<OpenAPISpec | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSysadmin) {
      return;
    }
    fetch('/api/docs/swagger.json')
      .then((res) => res.json())
      .then((data) => {
        setSpec(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar spec:', err);
        setLoading(false);
      });
  }, [isSysadmin]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isSysadmin) {
      router.replace('/admin/dashboard');
    }
  }, [isLoading, isSysadmin, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isSysadmin) {
    return null;
  }

  const downloadOpenAPI = () => {
    window.open('/api/docs/swagger.json', '_blank');
  };

  const downloadManual = () => {
    const link = document.createElement('a');
    link.href = '/docs/API-MANUAL.md';
    link.download = 'IMUNE-API-Manual-v1.0.0.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalEndpoints = spec ? Object.keys(spec.paths || {}).length : 0;
  const apiVersion = spec?.info?.version || 'v1.0';

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando documentação da API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Documentação da API
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {spec?.info?.description || 'Documentação completa dos endpoints da API IMUNE+'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={downloadManual}
            variant="outline"
            className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
          >
            <FileText className="mr-2 h-4 w-4" />
            Manual de Uso
          </Button>
          <Button 
            onClick={downloadOpenAPI}
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar OpenAPI
          </Button>
        </div>
      </div>

      {/* API Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Endpoints</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEndpoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Versão da API</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{apiVersion}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{spec?.tags?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Swagger UI Embutido */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardContent className="p-0">
          {spec && (
            <div className="swagger-container">
              <SwaggerUI 
                spec={spec as unknown as Record<string, unknown>}
                docExpansion="list"
                defaultModelsExpandDepth={1}
                defaultModelExpandDepth={1}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}