import { createSafeActionClient } from 'next-safe-action';

export type ActionStatus = 'success' | 'error';

export interface ActionResponse<TData = unknown, TError = string> {
  status: ActionStatus;
  data?: TData;
  error?: TError;
}

export const action = createSafeActionClient();

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
