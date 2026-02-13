'use client';

import { useCallback } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
}

export function useAuth() {
  // TODO: Implementar com sessão real via getAuthUser()
  // Por enquanto retorna mock para desenvolvimento
  const user: AuthUser | null = null;

  const logout = useCallback(async () => {
    // TODO: Implementar logout
  }, []);

  return { user, logout };
}
