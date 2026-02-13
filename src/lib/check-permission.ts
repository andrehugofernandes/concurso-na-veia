import { db } from './db';
import { checkPermission, getUserRole } from './permissions';

/**
 * Helper para verificar permissões em Server Actions
 * Retorna true se o usuário tem permissão, false caso contrário
 */
export async function verifyPermission(
  userId: string,
  operation: string,
  resource?: { authorId?: string; status?: string; userId?: string }
): Promise<boolean> {
  try {
    const role = await getUserRole(userId);
    return await checkPermission(role, operation, resource);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Permission verification failed:', error);
    return false;
  }
}

/**
 * Helper para verificar se usuário pode acessar um recurso específico
 */
export async function canAccessResource(
  userId: string,
  resourceId: number,
  _resourceType: 'post' | 'page' | 'comment' | 'media'
): Promise<boolean> {
  try {
    const role = await getUserRole(userId);

    // Admin pode acessar tudo
    if (role === 'admin') {
      return true;
    }

    // Verificar acesso específico por tipo de recurso
    switch (_resourceType) {
      case 'post':
      case 'page': {
        const content = await db.content.findUnique({
          where: { id: resourceId },
          select: { authorId: true, status: true },
        });

        if (!content) return false;

        // Editor pode acessar seu próprio conteúdo
        if (role === 'editor' && content.authorId === userId) {
          return true;
        }

        // Viewer pode acessar apenas conteúdo publicado
        if (role === 'viewer' && content.status === 'published') {
          return true;
        }

        return false;
      }

      case 'comment': {
        const comment = await db.comment.findUnique({
          where: { id: resourceId },
          select: { content: { select: { authorId: true } } },
        });

        if (!comment) return false;

        // Editor pode moderar comentários em seu próprio conteúdo
        if (role === 'editor' && comment.content.authorId === userId) {
          return true;
        }

        return false;
      }

      case 'media': {
        // Todos os usuários autenticados podem acessar mídias
        return true;
      }

      default:
        return false;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Resource access check failed:', error);
    return false;
  }
}

/**
 * Helper para verificar se usuário pode deletar um recurso
 */
export async function canDeleteResource(
  userId: string,
  resourceId: number,
  _resourceType: 'post' | 'page' | 'comment'
): Promise<boolean> {
  try {
    const role = await getUserRole(userId);

    // Admin pode deletar tudo
    if (role === 'admin') {
      return true;
    }

    // Editor só pode deletar seu próprio conteúdo
    if (role === 'editor') {
      const resource = await db.content.findUnique({
        where: { id: resourceId },
        select: { authorId: true },
      });

      return resource?.authorId === userId;
    }

    // Viewer não pode deletar nada
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Delete permission check failed:', error);
    return false;
  }
}

/**
 * Helper para verificar se usuário pode editar um recurso
 */
export async function canEditResource(
  userId: string,
  resourceId: number,
  _resourceType: 'post' | 'page' | 'comment'
): Promise<boolean> {
  try {
    const role = await getUserRole(userId);

    // Admin pode editar tudo
    if (role === 'admin') {
      return true;
    }

    // Editor só pode editar seu próprio conteúdo
    if (role === 'editor') {
      const resource = await db.content.findUnique({
        where: { id: resourceId },
        select: { authorId: true },
      });

      return resource?.authorId === userId;
    }

    // Viewer não pode editar nada
    return false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Edit permission check failed:', error);
    return false;
  }
}

/**
 * Helper para verificar se usuário é Administrador
 * Administrador (role: 'admin') tem acesso a: Backups, Audit Logs, Settings
 * Nota: No banco de dados, o role é 'admin', mas no UI é exibido como 'Administrador'
 */
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const role = await getUserRole(userId);
    return role === 'admin';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Admin check failed:', error);
    return false;
  }
}

/**
 * @deprecated Use isAdmin() instead
 */
export async function isSysAdmin(userId: string): Promise<boolean> {
  return isAdmin(userId);
}
