"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { LogEntry, LogFilters, LogStats } from "@/lib/types/audit-log";
import { logsService } from "@/lib/services/logs";

type UseAuditLogsState = {
  logs: LogEntry[];
  stats: LogStats | null;
  isLoading: boolean;
  error: string | null;
  total: number;
};

type UseAuditLogsReturn = UseAuditLogsState & {
  filters: LogFilters;
  setFilters: (next: Partial<LogFilters>) => void;
  refresh: () => Promise<void>;
};

const DEFAULT_FILTERS: LogFilters = {
  page: 1,
  limit: 20,
};

export function useAuditLogs(initialFilters: LogFilters = DEFAULT_FILTERS): UseAuditLogsReturn {
  const [filters, setFiltersState] = useState<LogFilters>({ ...DEFAULT_FILTERS, ...initialFilters });
  const [state, setState] = useState<UseAuditLogsState>({
    logs: [],
    stats: null,
    isLoading: true,
    error: null,
    total: 0,
  });

  const queryKey = useMemo(() => JSON.stringify(filters), [filters]);

  const load = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const [list, stats] = await Promise.all([
        logsService.list(filters),
        logsService.getStats(),
      ]);
      setState({
        logs: list.logs,
        stats,
        isLoading: false,
        error: null,
        total: list.pagination.total,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao carregar logs";
      setState((prev) => ({ ...prev, isLoading: false, error: message }));
    }
  }, [filters]);

  useEffect(() => {
    void load();
  }, [queryKey, load]);

  const setFilters = (next: Partial<LogFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...next, page: next.page ?? prev.page ?? 1 }));
  };

  return {
    ...state,
    filters,
    setFilters,
    refresh: load,
  };
}
