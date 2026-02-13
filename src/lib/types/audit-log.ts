/**
 * Tipos e enums para o sistema de auditoria e logging (Phase 20)
 */

// ============================================================================
// Enums
// ============================================================================

/**
 * Níveis de severidade dos logs
 */
export enum LogLevel {
  INFO = 'info',     // Ações normais do sistema
  WARN = 'warn',     // Tentativas/avisos
  ERROR = 'error',   // Falhas
  DEBUG = 'debug',   // Informações de debug
}

/**
 * Tipos de recursos que podem ser auditados
 */
export enum LogResource {
  AUTH = 'auth',
  USER = 'user',
  POST = 'post',
  PAGE = 'page',
  CATEGORY = 'category',
  MEDIA = 'media',
  COMMENT = 'comment',
  SETTINGS = 'settings',
  BACKUP = 'backup',
  CONTENT = 'content',
  MENU = 'menu',
  PERMISSION = 'permission',
  AUDIT = 'audit',
}

/**
 * Ações que podem ser registradas
 */
export enum LogAction {
  // CRUD básico
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  
  // Ações de conteúdo
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
  RESTORE = 'restore',
  
  // Ações de comentários
  APPROVE = 'approve',
  REJECT = 'reject',
  MARK_AS_SPAM = 'mark_as_spam',
  
  // Ações de autenticação
  LOGIN = 'login',
  LOGOUT = 'logout',
  SETUP_2FA = 'setup_2fa',
  VERIFY_2FA = 'verify_2fa',
  RESET_PASSWORD = 'reset_password',
  
  // Ações de permissões
  GRANT_PERMISSION = 'grant_permission',
  REVOKE_PERMISSION = 'revoke_permission',
  UPDATE_ROLE = 'update_role',
  
  // Ações de backup
  CREATE_BACKUP = 'create_backup',
  RESTORE_BACKUP = 'restore_backup',
  DELETE_BACKUP = 'delete_backup',
  
  // Ações de auditoria
  VIEW_LOGS = 'view_logs',
  FILTER_LOGS = 'filter_logs',
  EXPORT_LOGS = 'export_logs',
  
  // Ações em massa
  BULK_DELETE = 'bulk_delete',
  BULK_PUBLISH = 'bulk_publish',
  BULK_UNPUBLISH = 'bulk_unpublish',
  BULK_APPROVE = 'bulk_approve',
  
  // Ações de upload
  UPLOAD = 'upload',
  UPLOAD_FAILED = 'upload_failed',
  
  // Ações de falha
  LOGIN_ATTEMPT_FAILED = 'login_attempt_failed',
  LOGIN_ATTEMPT_2FA_FAILED = 'login_attempt_2fa_failed',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  INVALID_INPUT = 'invalid_input',
  EXCEPTION = 'exception',
}

// ============================================================================
// Tipos
// ============================================================================

/**
 * Entrada de log completa
 */
export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  resource?: LogResource | string;
  action?: LogAction | string;
  userId?: string;
  user?: {
    id: string;
    username: string;
    fullName?: string;
    email: string;
  };
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  details?: string; // JSON stringificado
}

/**
 * Resposta de listagem de logs
 */
export interface LogsResponse {
  logs: LogEntry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Estatísticas de logs
 */
export interface LogStats {
  totalLogs: number;
  logsToday: number;
  logsThisWeek: number;
  logsThisMonth: number;
  logsByLevel: {
    error: number;
    warn: number;
    info: number;
    debug: number;
  };
  logsByResource: Record<string, number>;
}

/**
 * Filtros para listagem de logs
 */
export interface LogFilters {
  page?: number;
  limit?: number;
  level?: LogLevel | string;
  resource?: LogResource | string;
  action?: LogAction | string;
  search?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Dados para criar um novo log
 */
export interface CreateLogInput {
  level: LogLevel;
  message: string;
  resource?: LogResource | string;
  action?: LogAction | string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
}

/**
 * Mapeamento de severidade por ação
 */
export const ACTION_SEVERITY_MAP: Record<LogAction | string, LogLevel> = {
  // Info - ações normais
  [LogAction.CREATE]: LogLevel.INFO,
  [LogAction.READ]: LogLevel.INFO,
  [LogAction.UPDATE]: LogLevel.INFO,
  [LogAction.DELETE]: LogLevel.INFO,
  [LogAction.PUBLISH]: LogLevel.INFO,
  [LogAction.UNPUBLISH]: LogLevel.INFO,
  [LogAction.RESTORE]: LogLevel.INFO,
  [LogAction.APPROVE]: LogLevel.INFO,
  [LogAction.LOGIN]: LogLevel.INFO,
  [LogAction.LOGOUT]: LogLevel.INFO,
  [LogAction.UPLOAD]: LogLevel.INFO,
  [LogAction.VIEW_LOGS]: LogLevel.INFO,
  [LogAction.FILTER_LOGS]: LogLevel.INFO,
  [LogAction.EXPORT_LOGS]: LogLevel.INFO,
  [LogAction.BULK_DELETE]: LogLevel.INFO,
  [LogAction.BULK_PUBLISH]: LogLevel.INFO,
  [LogAction.BULK_UNPUBLISH]: LogLevel.INFO,
  [LogAction.BULK_APPROVE]: LogLevel.INFO,
  
  // Warn - tentativas/avisos
  [LogAction.REJECT]: LogLevel.WARN,
  [LogAction.MARK_AS_SPAM]: LogLevel.WARN,
  [LogAction.SETUP_2FA]: LogLevel.WARN,
  [LogAction.VERIFY_2FA]: LogLevel.WARN,
  [LogAction.RESET_PASSWORD]: LogLevel.WARN,
  [LogAction.GRANT_PERMISSION]: LogLevel.WARN,
  [LogAction.REVOKE_PERMISSION]: LogLevel.WARN,
  [LogAction.UPDATE_ROLE]: LogLevel.WARN,
  [LogAction.CREATE_BACKUP]: LogLevel.WARN,
  [LogAction.RESTORE_BACKUP]: LogLevel.WARN,
  [LogAction.DELETE_BACKUP]: LogLevel.WARN,
  [LogAction.LOGIN_ATTEMPT_FAILED]: LogLevel.WARN,
  [LogAction.LOGIN_ATTEMPT_2FA_FAILED]: LogLevel.WARN,
  [LogAction.UNAUTHORIZED_ACCESS]: LogLevel.WARN,
  [LogAction.INVALID_INPUT]: LogLevel.WARN,
  
  // Error - falhas
  [LogAction.UPLOAD_FAILED]: LogLevel.ERROR,
  [LogAction.EXCEPTION]: LogLevel.ERROR,
  
  // Debug
  // (nenhuma ação padrão é debug, mas pode ser usada para casos específicos)
};

/**
 * Obtém o nível de severidade para uma ação
 */
export function getLogLevelForAction(action: LogAction | string): LogLevel {
  return ACTION_SEVERITY_MAP[action] || LogLevel.INFO;
}

/**
 * Cores para cada nível de log (para UI)
 */
export const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  [LogLevel.INFO]: 'bg-blue-600 text-white',
  [LogLevel.WARN]: 'bg-yellow-600 text-white',
  [LogLevel.ERROR]: 'bg-red-600 text-white',
  [LogLevel.DEBUG]: 'bg-gray-600 text-white',
};

/**
 * Ícones para cada nível de log (lucide-react)
 */
export const LOG_LEVEL_ICONS: Record<LogLevel, string> = {
  [LogLevel.INFO]: 'Info',
  [LogLevel.WARN]: 'AlertTriangle',
  [LogLevel.ERROR]: 'XCircle',
  [LogLevel.DEBUG]: 'Check',
};
