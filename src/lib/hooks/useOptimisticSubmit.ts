'use client';

import { useCallback, useOptimistic } from 'react';

export interface UseOptimisticSubmitOptions<TValue> {
  initialValue: TValue;
}

export interface UseOptimisticSubmitResult<TValue> {
  optimisticValue: TValue;
  setOptimisticValue: (value: TValue) => void;
  runWithOptimism: (operation: () => Promise<TValue>) => Promise<void>;
}

export function useOptimisticSubmit<TValue>(
  options: UseOptimisticSubmitOptions<TValue>,
): UseOptimisticSubmitResult<TValue> {
  const [optimisticValue, setOptimisticInternal] = useOptimistic<TValue, TValue>(
    options.initialValue,
    (_, newValue) => newValue,
  );

  const setOptimisticValue = useCallback(
    (value: TValue) => {
      setOptimisticInternal(value);
    },
    [setOptimisticInternal],
  );

  const runWithOptimism = useCallback(
    async (operation: () => Promise<TValue>) => {
      const result = await operation();
      setOptimisticInternal(result);
    },
    [setOptimisticInternal],
  );

  return {
    optimisticValue,
    setOptimisticValue,
    runWithOptimism,
  };
}
