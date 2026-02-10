"use client";

import { useCallback, useEffect, useMemo, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconBadge } from "@/components/ui/icon-badge";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  Activity,
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  Filter,
  Info,
  List,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { logsService, type LogEntry, type LogLevel, type LogStats } from "@/lib/services/logs";

const logLevelColors: Record<LogLevel, string> = {
  info: "bg-[#00BDFF] text-white",
  warn: "bg-[#FDC300] text-white",
  error: "bg-red-600 text-white",
  debug: "bg-gray-500 text-white",
};

const logLevelIcons: Record<LogLevel, ReactElement> = {
  info: <Info size={16} aria-hidden />,
  warn: <AlertTriangle size={16} aria-hidden />,
  error: <XCircle size={16} aria-hidden />,
  debug: <Check size={16} aria-hidden />,
};

const LOG_PAGE_SIZE_OPTIONS = [10, 20, 50];

export function LogsPage(): ReactElement | null {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1920);

  const role = useMemo(() => (user?.role ?? '').toUpperCase(), [user?.role]);
  const isSysadmin = role === 'SYSADMIN';
  const isAdmin = role === 'ADMIN';
  const canAccess = isSysadmin || isAdmin;

  const filters = useMemo(() => {
    return {
      page,
      limit: pageSize,
      ...(selectedLevel !== "all" && { level: selectedLevel }),
      ...(searchTerm.trim() && { search: searchTerm.trim() }),
    } satisfies {
      page: number;
      limit: number;
      level?: LogLevel;
      search?: string;
    };
  }, [page, pageSize, searchTerm, selectedLevel]);

  const loadLogs = useCallback(async () => {
    if (!canAccess) {
      return;
    }
    setIsLoading(true);
    try {
      const [logsResponse, statsResponse] = await Promise.all([
        logsService.list(filters),
        logsService.getStats(),
      ]);
      setLogs(logsResponse.logs);
      setTotal(logsResponse.pagination.total);
      setStats(statsResponse);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: "Erro ao carregar logs",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [canAccess, filters, toast]);

  useEffect(() => {
    if (authLoading || hasRedirected) return;

    if (!canAccess) {
      toast({
        title: 'Acesso restrito',
        description: 'Apenas SYSADMIN e ADMIN podem acessar o sistema de logs. Você foi redirecionado para o dashboard.',
        className: 'bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-900 dark:text-white dark:border-gray-700',
      });
      router.replace('/admin/dashboard');
      setHasRedirected(true);
    }
  }, [canAccess, hasRedirected, authLoading, router, toast]);

  useEffect(() => {
    void loadLogs();
  }, [loadLogs]);

  // Detectar largura da tela para quebra de linha responsiva
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (authLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-600 dark:text-gray-300">
        Carregando...
      </div>
    );
  }

  if (!canAccess) {
    return null;
  }

  const handleFilterChange = (value: string) => {
    setSelectedLevel(value as LogLevel | "all");
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    void loadLogs();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadLogs();
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  /**
   * Formata detalhes com quebra de linha responsiva
   * - Full HD (>= 1920px): quebra a cada 220 caracteres
   * - Até 1366px: quebra a cada 140 caracteres
   */
  const formatDetails = (details: string | null | undefined): string => {
    if (!details) return "—";
    
    const maxChars = screenWidth <= 1366 ? 140 : 220;
    const lines: string[] = [];
    let currentLine = "";
    
    for (let i = 0; i < details.length; i++) {
      currentLine += details[i];
      
      if (currentLine.length >= maxChars) {
        lines.push(currentLine);
        currentLine = "";
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines.join('\n');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sistema de Logs</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Monitore eventos críticos e atividades administrativas em tempo real.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Itens por página:</span>
            <div className="flex items-center gap-1">
              {LOG_PAGE_SIZE_OPTIONS.map((option) => {
                const isActive = option === pageSize;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setPageSize(option);
                      setPage(1);
                    }}
                    className={cn(
                      "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm transition-colors",
                      isActive
                        ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                    aria-label={`${option} por página${isActive ? ' (selecionado)' : ''}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
          <Button
            type="button"
            onClick={handleRefresh}
            className="text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors"
            disabled={isRefreshing || isLoading}
            aria-label="Atualizar dados"
          >
            <RefreshCw
              size={16}
              aria-hidden
              className={`mr-2 ${isLoading || isRefreshing ? "animate-spin" : ""}`}
            />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="blue" aria-label="Total de logs">
                <List className="h-5 w-5" aria-hidden />
              </IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total de Logs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.totalLogs ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="green" aria-label="Logs de hoje">
                <Calendar className="h-5 w-5" aria-hidden />
              </IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Logs Hoje</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.logsToday ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="orange" aria-label="Logs desta semana">
                <Activity className="h-5 w-5" aria-hidden />
              </IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Esta Semana</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.logsThisWeek ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center">
              <IconBadge color="red" aria-label="Logs de erro">
                <XCircle className="h-5 w-5" aria-hidden />
              </IconBadge>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Erros</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.logsByLevel.error ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" aria-hidden />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="logs-level-filter">
                Nível
              </label>
              <Select value={selectedLevel} onValueChange={handleFilterChange}>
                <SelectTrigger
                  id="logs-level-filter"
                  className="w-44 bg-white text-gray-900 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                  aria-label="Filtrar por nível"
                >
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Todos
                  </SelectItem>
                  <SelectItem
                    value="info"
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Info
                  </SelectItem>
                  <SelectItem
                    value="warn"
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Avisos
                  </SelectItem>
                  <SelectItem
                    value="error"
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Erros
                  </SelectItem>
                  <SelectItem
                    value="debug"
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Debug
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Buscar por recurso, ação ou mensagem"
                aria-label="Buscar logs"
                className="flex-1"
              />
              <Button type="button" onClick={handleSearch} variant="outline" aria-label="Executar busca">
                <Search size={16} aria-hidden className="mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Logs do Sistema</CardTitle>
            <List className="h-5 w-5 text-[var(--primary)]" aria-hidden />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-gray-500">
              <div className="mr-2 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-[var(--primary)]" />
              Carregando logs...
            </div>
          ) : logs.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">Nenhum log encontrado com os filtros atuais.</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <article
                  key={log.id}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-[var(--primary)]/5 dark:border-gray-700 dark:bg-gray-800"
                  aria-label={`Log ${log.id}`}
                >
                  <header className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${logLevelColors[log.level]}`}
                    >
                      {logLevelIcons[log.level]}
                      <span className="ml-1 uppercase">{log.level}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Clock size={12} aria-hidden />
                      {formatDateTime(String(log.createdAt))}
                    </span>
                    {log.user?.username && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">Usuário: {log.user.username}</span>
                    )}
                    {log.ipAddress && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">IP: {log.ipAddress}</span>
                    )}
                  </header>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{log.message}</p>
                  <dl className="grid gap-2 text-xs text-gray-600 dark:text-gray-400 md:grid-cols-3">
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Recurso</dt>
                      <dd>{log.resource ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Ação</dt>
                      <dd>{log.action ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-700 dark:text-gray-300">Detalhes</dt>
                      <dd className="whitespace-pre-wrap break-all">{formatDetails(log.details)}</dd>
                    </div>
                  </dl>
                </article>
              ))}

              <div className="pt-4">
                <PaginationControls
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                  onPageSizeChange={(nextPageSize) => {
                    setPageSize(nextPageSize);
                    setPage(1);
                  }}
                  pageSizeOptions={LOG_PAGE_SIZE_OPTIONS}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-400">
        <p>
          <strong>Importante:</strong> Somente usuários com perfil SYSADMIN e ADMIN possuem acesso a este painel. Todas as ações são registradas
          automaticamente para auditoria e conformidade com políticas de segurança.
        </p>
      </div>
    </div>
  );
}
