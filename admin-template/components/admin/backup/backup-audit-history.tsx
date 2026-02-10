'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditLog {
  id: string;
  action: string;
  status: string;
  userId: string | null;
  backupId: string | null;
  details: string | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
  backup?: {
    id: string;
    type: string;
    size: bigint | null;
  } | null;
}

const ACTION_LABELS: Record<string, string> = {
  CREATE: '➕ Criar',
  RESTORE: '↩️ Restaurar',
  DELETE: '🗑️ Deletar',
  DOWNLOAD: '📥 Download',
  FAILED: '❌ Falha',
};

const STATUS_COLORS: Record<string, string> = {
  SUCCESS: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  FAILED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export function BackupAuditHistory() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterAction, setFilterAction] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchAuditHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        limit: '20',
        offset: '0',
      });

      if (filterAction) {
        params.append('action', filterAction);
      }

      const response = await fetch(`/api/admin/backups/audit?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao buscar histórico');
      }

      setLogs(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar auditoria:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filterAction]);

  useEffect(() => {
    fetchAuditHistory();
  }, [fetchAuditHistory]);

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Histórico de Ações</CardTitle>
            <CardDescription>Últimas ações de backup do sistema</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
            <ChevronDown className={cn('h-4 w-4 transition-transform', showFilters && 'rotate-180')} />
          </Button>
        </div>
      </CardHeader>

      {showFilters && (
        <div className="px-6 py-4 border-b bg-muted/50">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterAction === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterAction('')}
            >
              Todas
            </Button>
            {uniqueActions.map(action => (
              <Button
                key={action}
                variant={filterAction === action ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterAction(action)}
              >
                {ACTION_LABELS[action] || action}
              </Button>
            ))}
          </div>
        </div>
      )}

      <CardContent className="pt-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Carregando histórico...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma ação registrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map(log => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-sm">
                      {ACTION_LABELS[log.action] || log.action}
                    </span>
                    <Badge variant="outline" className={cn(STATUS_COLORS[log.status])}>
                      {log.status}
                    </Badge>
                    {log.user && (
                      <span className="text-xs text-muted-foreground">
                        por {log.user.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(log.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
