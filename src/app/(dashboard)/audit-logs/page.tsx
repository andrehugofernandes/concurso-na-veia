'use client';

import { useState, useEffect, useCallback } from 'react';
import { LuActivity, LuShieldAlert } from 'react-icons/lu';
import { AuditLogTable, type FilterState } from '@/components/audit-logs/audit-log-table';
import { AuditLogDetailDialog } from '@/components/audit-logs/audit-log-detail-dialog';
import { TextRoll } from '@/components/core/text-roll';
import {
  listAuditLogs,
  getAuditLogFilters,
  exportLogsCSV,
  type AuditLogData,
  type AuditLogFilters,
} from './actions';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogData[]>([]);
  const [filters, setFilters] = useState<AuditLogFilters>({ actions: [], resources: [], users: [] });
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<AuditLogData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Carregar filtros disponíveis
  useEffect(() => {
    async function loadFilters() {
      const result = await getAuditLogFilters();
      if (result.status === 'success' && result.data) {
        setFilters(result.data);
      }
    }
    loadFilters();
  }, []);

  // Carregar logs
  const loadLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await listAuditLogs({
        page,
        pageSize,
        ...activeFilters,
      });
      if (result.status === 'success' && result.data) {
        setLogs(result.data.logs);
        setTotal(result.data.total);
      } else {
        setError(result.error as string);
      }
    } catch {
      setError('Erro ao carregar logs');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, activeFilters]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  // Handlers
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setActiveFilters(newFilters);
    setPage(1); // Reset para primeira página ao filtrar
  }, []);

  const handleViewDetails = useCallback((log: AuditLogData) => {
    setSelectedLog(log);
    setIsDetailOpen(true);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedLog(null);
  }, []);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      const result = await exportLogsCSV(activeFilters);
      if (result.status === 'success' && result.data) {
        // Criar e baixar arquivo CSV
        const blob = new Blob([result.data.csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.data.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        setError('Erro ao exportar logs');
      }
    } catch {
      setError('Erro ao exportar logs');
    } finally {
      setIsExporting(false);
    }
  }, [activeFilters]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadLogs();
    setIsRefreshing(false);
  }, [loadLogs]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Logs de Auditoria</TextRoll>
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Visualize e exporte registros de atividades do sistema
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing || isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 disabled:opacity-60 text-white text-sm font-medium transition-colors"
        >
          <LuActivity className={isRefreshing || isLoading ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
          Atualizar
        </button>
      </div>

      {/* Aviso de acesso restrito */}
      <div className="flex items-center gap-3 p-4 rounded-lg border bg-[color:rgb(var(--primary-rgb)/0.18)] border-[color:rgb(var(--primary-rgb)/0.40)] dark:bg-[color:rgb(var(--primary-rgb)/0.26)] dark:border-[color:rgb(var(--primary-rgb)/0.55)]">
        <LuShieldAlert className="h-5 w-5 text-[color:var(--primary)] flex-shrink-0" />
        <p className="text-sm text-gray-900 dark:text-slate-100">
          <strong>Acesso restrito:</strong> Esta página contém informações sensíveis e está disponível apenas para Administradores.
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Tabela de logs */}
      <div className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/30 p-4">
        <AuditLogTable
          logs={logs}
          filters={filters}
          total={total}
          page={page}
          pageSize={pageSize}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onFilterChange={handleFilterChange}
          onViewDetails={handleViewDetails}
          onExport={handleExport}
          isExporting={isExporting}
        />
      </div>

      {/* Dialog de detalhes */}
      <AuditLogDetailDialog
        log={selectedLog}
        isOpen={isDetailOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
