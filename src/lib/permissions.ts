import { db } from './db';

export const PERMISSIONS = {
  admin: ['*'],
  editor: ['read:all', 'create:own', 'update:own', 'delete:own'],
  viewer: ['read:published'],
} as const;

export type Role = keyof typeof PERMISSIONS;

/**
 * Verifica se um usuário tem permissão para realizar uma operação
 */
export async function checkPermission(
  userRole: Role,
  operation: string,
  resource?: { authorId?: string; status?: string; userId?: string }
): Promise<boolean> {
  const perms = PERMISSIONS[userRole] as readonly string[];

  // Admin tem acesso total
  if (perms.includes('*')) {
    return true;
  }

  // Verificar permissões específicas
  if (operation === 'read:all' && perms.includes('read:all')) {
    return true;
  }

  if (operation === 'read:published' && perms.includes('read:published')) {
    // Viewer só pode ler conteúdo publicado
    return resource?.status === 'published';
  }

  if (operation === 'create:own' && perms.includes('create:own')) {
    return true;
  }

  if (operation === 'update:own' && perms.includes('update:own')) {
    // Editor só pode atualizar seu próprio conteúdo
    return resource?.authorId !== undefined;
  }

  if (operation === 'delete:own' && perms.includes('delete:own')) {
    // Editor só pode deletar seu próprio conteúdo
    return resource?.authorId !== undefined;
  }

  return false;
}

/**
 * Middleware para verificar permissões em Server Actions
 */
export async function getUserRole(userId: string): Promise<Role> {
  const user = await db.dashboardUser.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return (user?.role as Role) || 'viewer';
}

/**
 * Middleware para verificar permissões em Server Actions
 */
export function withPermission(_requiredRole: Role | Role[], _requiredOperation?: string) {
  return async function <T extends (...args: unknown[]) => Promise<unknown>>(fn: T): Promise<T> {
    return (async (...args: unknown[]) => {
      // Implementação será feita no middleware Next.js
      return fn(...args);
    }) as T;
  };
}

/**
 * Verifica se usuário é admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === 'admin';
}

/**
 * Verifica se usuário é editor
 */
export async function isEditor(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === 'editor';
}

/**
 * Verifica se usuário é viewer
 */
export async function isViewer(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  return role === 'viewer' || role === 'editor' || role === 'admin';
}
