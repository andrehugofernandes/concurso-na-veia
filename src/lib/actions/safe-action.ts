import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action';
import { getAuthUser } from '../auth';
import { isAdmin } from '../check-permission';

export type ActionStatus = 'success' | 'error';

export interface ActionResponse<TData = unknown, TError = string> {
  status: ActionStatus;
  data?: TData;
  error?: TError;
}

export const action = createSafeActionClient({
  handleServerError(e) {
    // eslint-disable-next-line no-console
    console.error('Server Action Error:', e);
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authAction = action.use(async ({ next }) => {
  const user = await getAuthUser();
  if (!user || !user.uid) {
    throw new Error('Não autorizado. Por favor, faça login.');
  }
  return next({ ctx: { user } });
});

export const adminAction = authAction.use(async ({ ctx, next }) => {
  const isUserAdmin = await isAdmin(ctx.user.uid);
  if (!isUserAdmin) {
    throw new Error('Acesso negado. Ação exclusiva para administradores.');
  }
  return next({ ctx: { user: ctx.user, isAdmin: true } });
});

export const createSuccessResponse = <TData, TError = string>(
  data: TData,
): ActionResponse<TData, TError> => ({
  status: 'success',
  data,
});

export const createErrorResponse = <TError, TData = never>(
  error: TError,
): ActionResponse<TData, TError> => ({
  status: 'error',
  error,
});
