'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Database, Download, FileText, RefreshCcw, Trash2, AlertCircle, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { runBackupNow } from './actions';
import { useToast } from '@/hooks/use-toast';
import { authFetch } from '@/lib/api-fetch';

interface BackupJob {
  id: string;
  type: string;
  status: string;
  startedAt: Date;
  finishedAt: Date | null;
  size: bigint | null;
  filePath: string | null;
  errorMsg: string | null;
  triggeredBy: string | null;
}

function formatBytes(bytes: bigint | number | null) {
  if (!bytes) return 'N/A';
  const numBytes = typeof bytes === 'bigint' ? Number(bytes) : bytes;
  const gb = numBytes / (1024 ** 3);
  if (gb >= 1) return `${gb.toFixed(2)} GB`;
  const mb = numBytes / (1024 ** 2);
  return `${mb.toFixed(2)} MB`;
}

function formatDuration(start: Date | string, end: Date | string | null) {
  if (!end) return 'Em andamento...';
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;
  const diffMs = endDate.getTime() - startDate.getTime();
  const minutes = Math.floor(diffMs / 60000);
  return `${minutes} min`;
}

export default function BackupsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [backups, setBackups] = useState<BackupJob[]>([]);
  const [executing, setExecuting] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<BackupJob | null>(null);
  const [showLogsModal, setShowLogsModal] = useState(false);

  const fetchBackups = useCallback(async () => {
    try {
      const data = await authFetch<{ success: boolean; backups: BackupJob[] }>('/api/admin/backups');
      setBackups(data.backups || []);
    } catch (error) {
      console.error('[BackupsPage] Erro ao buscar backups:', error);
      toast({
        title: 'Erro ao carregar backups',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchBackups();
  }, [fetchBackups]);

  async function handleRunBackup() {
    console.log('[BackupsPage] 🎬 Botão "Executar backup agora" clicado');
    setExecuting(true);
    
    try {
      console.log('[BackupsPage] 🚀 Chamando runBackupNow()...');
      const result = await runBackupNow({ type: 'full' });
      console.log('[BackupsPage] 📊 Resultado:', result);
      
      if (result?.data?.success) {
        toast({
          title: 'Backup iniciado com sucesso!',
          description: result.data.message || 'O backup está sendo executado.',
        });
        // Recarregar lista após 2 segundos
        setTimeout(() => fetchBackups(), 2000);
      } else {
        throw new Error(result?.data?.error || 'Erro ao executar backup');
      }
    } catch (error) {
      console.error('[BackupsPage] ❌ Erro ao executar backup:', error);
      toast({
        title: 'Erro ao executar backup',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setExecuting(false);
    }
  }

  async function handleDownload(backupId: string) {
    try {
      // Usar fetch com credentials para download de arquivo
      const response = await fetch(`/api/admin/backups/${backupId}/download`, {
        credentials: 'include',
      });
      
      if (!response.ok) throw new Error('Falha ao baixar backup');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${backupId}.sql.gz`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: 'Download iniciado',
        description: 'O arquivo de backup está sendo baixado.',
      });
    } catch (error) {
      console.error('[BackupsPage] Erro ao baixar backup:', error);
      toast({
        title: 'Erro ao baixar backup',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    }
  }

  async function handleDelete(backupId: string) {
    if (!confirm('Tem certeza que deseja excluir este backup? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      await authFetch(`/api/admin/backups/${backupId}`, {
        method: 'DELETE',
      });
      
      toast({
        title: 'Backup excluído',
        description: 'O backup foi removido com sucesso.',
      });
      
      fetchBackups();
    } catch (error) {
      console.error('[BackupsPage] Erro ao excluir backup:', error);
      toast({
        title: 'Erro ao excluir backup',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    }
  }

  function handleViewLogs(backupId: string) {
    const backup = backups.find(b => b.id === backupId);
    if (backup) {
      setSelectedBackup(backup);
      setShowLogsModal(true);
    }
  }

  const stats = {
    total: backups.length,
    successRate: backups.length > 0 
      ? Math.round((backups.filter(b => b.status === 'SUCCESS').length / backups.length) * 100)
      : 0,
    lastSuccess: backups.find(b => b.status === 'SUCCESS'),
    totalSize: backups.reduce((acc, b) => acc + Number(b.size || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciamento de Backups</h1>
          </div>
          <p className="max-w-2xl text-gray-600 dark:text-gray-400">
            Histórico completo, estatísticas e ações avançadas. Acesso exclusivo para SYSADMIN.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => router.push('/admin/backups/settings')}
            className="gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-label="Configurações de backup"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button 
            onClick={handleRunBackup}
            disabled={executing}
            className="gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white dark:bg-[var(--primary)] dark:hover:bg-[var(--primary)]/90 dark:text-white" 
            aria-label="Executar backup agora"
          >
            <RefreshCcw className={`h-4 w-4 ${executing ? 'animate-spin' : ''}`} />
            {executing ? 'Executando...' : 'Executar backup agora'}
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Backups</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Registrados no sistema</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Sucesso</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Sucesso</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.lastSuccess ? new Date(stats.lastSuccess.startedAt).toLocaleDateString('pt-BR') : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.lastSuccess ? `${formatBytes(stats.lastSuccess.size)}` : 'Nenhum backup bem-sucedido'}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamanho Total</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(stats.totalSize)}</div>
            <p className="text-xs text-muted-foreground">Espaço utilizado</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Refine a busca por período, tipo ou status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="period" className="text-sm font-medium text-gray-700 dark:text-gray-300">Período</label>
              <Select defaultValue="all">
                <SelectTrigger id="period" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mês</SelectItem>
                  <SelectItem value="year">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
              <Select defaultValue="all">
                <SelectTrigger id="type" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="full">Completo</SelectItem>
                  <SelectItem value="incremental">Incremental</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <Select defaultValue="all">
                <SelectTrigger id="status" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="SUCCESS">Sucesso</SelectItem>
                  <SelectItem value="FAILED">Falha</SelectItem>
                  <SelectItem value="RUNNING">Em andamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Histórico */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Histórico de Backups</CardTitle>
          <CardDescription>Todos os backups executados no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Data/Hora</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Tipo</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Status</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Tamanho</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400 font-medium">Duração</TableHead>
                  <TableHead className="text-right text-gray-600 dark:text-gray-400 font-medium">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow 
                    key={backup.id}
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="text-gray-900 dark:text-white font-medium">
                      {new Date(backup.startedAt).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Badge className={backup.type === 'full' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'}>
                        {backup.type === 'full' ? 'Completo' : 'Incremental'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        backup.status === 'SUCCESS' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : backup.status === 'FAILED'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                      }>
                        {backup.status === 'SUCCESS' ? 'Sucesso' : backup.status === 'FAILED' ? 'Falha' : 'Em andamento'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {formatBytes(backup.size)}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {formatDuration(backup.startedAt, backup.finishedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <div className="flex items-center justify-end gap-2">
                          {backup.status === 'SUCCESS' && (
                            <>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownload(backup.id)}
                                    className="gap-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10"
                                    aria-label="Baixar backup"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Baixar backup</p>
                                </TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewLogs(backup.id)}
                                    className="gap-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10"
                                    aria-label="Ver logs"
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Ver logs do backup</p>
                                </TooltipContent>
                              </Tooltip>
                            </>
                          )}
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(backup.id)}
                                className="gap-2 border-gray-200 dark:border-gray-600 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                                aria-label="Deletar backup"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Excluir backup</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {backups.length === 0 && (
              <div className="text-center text-sm text-gray-500 py-6 border border-dashed rounded-md">
                Nenhum backup encontrado.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-400">
        <p>
          <strong>Importante:</strong> Somente usuários com perfil SYSADMIN e ADMIN possuem acesso a este painel. Todas as ações são registradas
          automaticamente para auditoria e conformidade com políticas de segurança.
        </p>
      </div>

      {/* Modal de Logs do Backup */}
      <Dialog open={showLogsModal} onOpenChange={setShowLogsModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--primary)]" />
              Detalhes do Backup
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Informações completas sobre a execução do backup
            </DialogDescription>
          </DialogHeader>

          {selectedBackup && (
            <div className="space-y-6 mt-4">
              {/* Informações Gerais */}
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-base">Informações Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ID do Backup</p>
                      <p className="text-sm text-gray-900 dark:text-white font-mono">{selectedBackup.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tipo</p>
                      <Badge className={selectedBackup.type === 'full' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'}>
                        {selectedBackup.type === 'full' ? 'Completo' : 'Incremental'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                      <Badge className={
                        selectedBackup.status === 'SUCCESS' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : selectedBackup.status === 'FAILED'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                      }>
                        {selectedBackup.status === 'SUCCESS' ? 'Sucesso' : selectedBackup.status === 'FAILED' ? 'Falha' : 'Em andamento'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tamanho</p>
                      <p className="text-sm text-gray-900 dark:text-white">{formatBytes(selectedBackup.size)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Iniciado em</p>
                      <p className="text-sm text-gray-900 dark:text-white">{new Date(selectedBackup.startedAt).toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Finalizado em</p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {selectedBackup.finishedAt ? new Date(selectedBackup.finishedAt).toLocaleString('pt-BR') : 'Em andamento...'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Duração</p>
                      <p className="text-sm text-gray-900 dark:text-white">{formatDuration(selectedBackup.startedAt, selectedBackup.finishedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Executado por</p>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedBackup.triggeredBy || 'Sistema (Cron)'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Caminho do Arquivo */}
              {selectedBackup.filePath && (
                <Card className="border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-base">Localização do Arquivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
                      <p className="text-sm font-mono text-gray-900 dark:text-white break-all">{selectedBackup.filePath}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Mensagem de Erro (se houver) */}
              {selectedBackup.errorMsg && (
                <Card className="border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
                  <CardHeader>
                    <CardTitle className="text-base text-red-800 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Mensagem de Erro
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-100 dark:bg-red-900/20 rounded-md p-3">
                      <p className="text-sm font-mono text-red-900 dark:text-red-200 whitespace-pre-wrap">{selectedBackup.errorMsg}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Botões de Ação */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {selectedBackup.status === 'SUCCESS' && (
                  <Button
                    onClick={() => {
                      handleDownload(selectedBackup.id);
                      setShowLogsModal(false);
                    }}
                    className="gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white"
                  >
                    <Download className="h-4 w-4" />
                    Baixar Backup
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowLogsModal(false)}
                  className="gap-2 border-gray-200 dark:border-gray-600"
                >
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
