'use server';

import { cookies } from 'next/headers';
import { db as prisma } from '@/lib/db';

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  fullName: string | null;
  role: string;
  isActive: boolean;
}

/**
 * Obtém o usuário atual a partir do cookie de sessão
 * @returns O usuário atual ou null se não estiver autenticado
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie?.value) {
      return null;
    }

    // O formato do token é: session_<userId>_<timestamp>
    const parts = sessionCookie.value.split('_');
    if (parts.length < 2 || parts[0] !== 'session') {
      return null;
    }

    const userId = parts[1];

    const user = await prisma.dashboardUser.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getCurrentUser] Error:', error);
    return null;
  }
}

/**
 * Verifica se o usuário atual tem uma das roles permitidas
 * @param allowedRoles - Lista de roles permitidas
 * @returns true se o usuário tem permissão, false caso contrário
 */
export async function checkUserRole(allowedRoles: string[]): Promise<boolean> {
  const user = await getCurrentUser();
  
  if (!user) {
    return false;
  }

  return allowedRoles.includes(user.role);
}

/**
 * Verifica se o usuário atual é administrador
 */
export async function isAdmin(): Promise<boolean> {
  return checkUserRole(['admin']);
}

/**
 * Verifica se o usuário atual pode gerenciar usuários (apenas admin)
 */
export async function canManageUsers(): Promise<boolean> {
  return isAdmin();
}

/**
 * Verifica se o usuário atual pode editar conteúdo (admin ou editor)
 */
export async function canEditContent(): Promise<boolean> {
  return checkUserRole(['admin', 'editor']);
}
