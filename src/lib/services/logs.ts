import { LogFilters, LogsResponse, LogStats, LogLevel, LogResource, LogAction, type LogEntry } from '@/lib/types/audit-log';

type ExportFormat = 'csv' | 'json';

function buildQuery(params: Partial<LogFilters> & { format?: ExportFormat }) {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.level) query.set('level', String(params.level));
  if (params.resource) query.set('resource', String(params.resource));
  if (params.action) query.set('action', String(params.action));
  if (params.search) query.set('search', params.search);
  if (params.userId) query.set('userId', params.userId);
  if (params.startDate) query.set('startDate', params.startDate);
  if (params.endDate) query.set('endDate', params.endDate);
  if (params.format) query.set('format', params.format);
  return query.toString();
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message || 'Erro na requisição de logs');
  }
  return res.json() as Promise<T>;
}

export const logsService = {
  async list(filters: LogFilters = {}): Promise<LogsResponse> {
    const query = buildQuery(filters);
    const res = await fetch(`/api/logs${query ? `?${query}` : ''}`, {
      cache: 'no-store',
      credentials: 'include',
    });
    return handleJson<LogsResponse>(res);
  },

  async getStats(): Promise<LogStats> {
    const res = await fetch('/api/logs/stats', {
      cache: 'no-store',
      credentials: 'include',
    });
    return handleJson<LogStats>(res);
  },

  async export(format: ExportFormat = 'json', filters: Partial<LogFilters> = {}): Promise<string> {
    const query = buildQuery({ ...filters, format });
    const res = await fetch(`/api/logs/export${query ? `?${query}` : ''}`, {
      cache: 'no-store',
      credentials: 'include',
    });
    if (!res.ok) {
      let message = res.statusText;
      try {
        const body = await res.json();
        if (body?.error) message = body.error;
      } catch {
        /* ignore */
      }
      throw new Error(message || 'Erro ao exportar logs');
    }
    if (format === 'csv') {
      return res.text();
    }
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  },
};

export type { LogEntry, LogFilters, LogsResponse, LogStats, LogLevel, LogResource, LogAction };
