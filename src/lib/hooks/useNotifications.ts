'use client';

import { useState } from 'react';

export function useNotifications() {
  const [count, setCount] = useState(0);

  return {
    count,
    increment: () => setCount(prev => prev + 1),
    decrement: () => setCount(prev => Math.max(0, prev - 1)),
    reset: () => setCount(0),
    hasNotifications: count > 0,
  };
}
