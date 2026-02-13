'use client';

import { useEffectEvent } from 'react';

export function useEffectEventHandler<TArgs extends unknown[]>(
  handler: (...args: TArgs) => void | Promise<void>,
): (...args: TArgs) => void {
  const effectHandler = useEffectEvent(handler);

  return (...args: TArgs) => {
    void effectHandler(...args);
  };
}
