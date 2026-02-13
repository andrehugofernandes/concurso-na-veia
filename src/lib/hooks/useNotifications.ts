'use client';

import { useNotificationCount } from '@/components/providers/notification-provider';

export function useNotifications() {
  const { count, increment, decrement, reset } = useNotificationCount();

  return {
    count,
    increment,
    decrement,
    reset,
    hasNotifications: count > 0,
  };
}
