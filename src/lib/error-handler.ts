/**
 * Tipos de erros customizados
 */

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, true);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Não autenticado') {
    super(401, message, true);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Permissão negada') {
    super(403, message, true);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso não encontrado') {
    super(404, message, true);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflito') {
    super(409, message, true);
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Erro interno do servidor') {
    super(500, message, true);
    this.name = 'InternalServerError';
  }
}

/**
 * Handler global de erros
 */
export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    };
  }

  if (error instanceof Error) {
    // eslint-disable-next-line no-console
    console.error('Unhandled error:', error);
    return {
      statusCode: 500,
      message: 'Erro interno do servidor',
      isOperational: false,
    };
  }

  // eslint-disable-next-line no-console
  console.error('Unknown error:', error);
  return {
    statusCode: 500,
    message: 'Erro desconhecido',
    isOperational: false,
  };
}

/**
 * Wrapper para Server Actions com tratamento de erro
 */
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(fn: T): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      const handled = handleError(error);
      throw new AppError(handled.statusCode, handled.message, handled.isOperational);
    }
  }) as T;
}

/**
 * Formata erro para resposta do cliente
 */
export function formatErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
      statusCode: 500,
    };
  }

  return {
    success: false,
    error: 'Erro desconhecido',
    statusCode: 500,
  };
}
