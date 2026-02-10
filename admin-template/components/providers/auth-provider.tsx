'use client';

import { ReactNode } from 'react';
import { AuthProvider as AuthContextProvider } from '@/hooks/useAuth';

export function AuthProvider({ children, skipInitialCheck = false }: { children: ReactNode; skipInitialCheck?: boolean }) {
  return <AuthContextProvider skipInitialCheck={skipInitialCheck}>{children}</AuthContextProvider>;
}
