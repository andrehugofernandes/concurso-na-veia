'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Download, Save } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { BackupAuditHistory } from '@/components/admin/backup/backup-audit-history';

export default function BackupPage() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [backups, setBackups] = useState<Array<{name: string, timeCreated: string, size: string}>>([]);
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateBackup = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Falha ao criar backup');
      }

      setSuccess('Backup criado com sucesso!');
      setLastBackup(new Date().toLocaleString('pt-BR'));
      fetchBackups();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBackups = async () => {
    try {
      const response = await fetch('/api/admin/backup');
      const data = await response.json();
      
      if (response.ok) {
        setBackups(data.backups || []);
      }
    } catch (err) {
      console.error('Erro ao buscar backups:', err);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Backup do Sistema</h1>
          <p className="text-muted-foreground">Gerencie os backups do banco de dados</p>
        </div>
        <Button 
          onClick={handleCreateBackup}
          disabled={isLoading}
          className={cn(
            'relative overflow-hidden',
            theme === 'dark' && 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700',
            'text-white font-medium py-2 px-4 rounded-md transition-all duration-300',
            'border border-transparent',
            theme === 'dark' && 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400 before:to-blue-400 before:opacity-0 hover:before:opacity-20 before:transition-opacity before:duration-300',
            'flex items-center gap-2'
          )}
        >
          {isLoading ? (
            <Save className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Criar Backup Agora
        </Button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-green-600 dark:text-green-400">{success}</p>
        </div>
      )}

      <Card className={cn(
        'relative overflow-hidden',
        theme === 'dark' && 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700',
        'transition-all duration-300',
        theme === 'dark' && 'shadow-lg shadow-purple-500/10'
      )}>
        <CardHeader>
          <CardTitle>Backups Disponíveis</CardTitle>
          <CardDescription>
            Último backup: {lastBackup || 'Nenhum backup encontrado'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {backups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Database className="mx-auto h-12 w-12 mb-4 opacity-40" />
              <p>Nenhum backup encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {backups.map((backup, index) => (
                <div 
                  key={index}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-md',
                    'bg-white/50 dark:bg-gray-800/50',
                    'border border-gray-200 dark:border-gray-700',
                    'hover:bg-gray-50 dark:hover:bg-gray-700/50',
                    'transition-colors duration-200'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Database className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="font-medium">{backup.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(backup.timeCreated).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {backup.size}
                    </span>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/50 dark:bg-gray-900/50 border-t border-muted dark:border-gray-800">
          <p className="text-sm text-muted-foreground">
            Os backups são armazenados no Firebase Storage e podem ser restaurados quando necessário.
          </p>
        </CardFooter>
      </Card>

      <BackupAuditHistory />
    </div>
  );
}
