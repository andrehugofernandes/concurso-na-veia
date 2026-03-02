'use server';

import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import { db as prisma } from '@/lib/db';
import {
  ActionResponse,
  createSuccessResponse,
  createErrorResponse,
} from '@/lib/actions/safe-action';
import { canManageUsers } from '@/lib/auth/get-current-user';
import { logAction } from '@/lib/services/audit-logger';
import { LogResource, LogAction } from '@/lib/types/audit-log';

// ============================================================================
// Types
// ============================================================================

export interface UserData {
  id: string;
  email: string;
  username: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  role: string;
  isActive: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Schemas
// ============================================================================

const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  fullName: z.string().min(3, 'Nome completo deve ter pelo menos 3 caracteres').optional(),
  role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
});

const updateUserSchema = z.object({
  id: z.string(),
  email: z.string().email('Email inválido').optional(),
  username: z.string().min(3, 'Username deve ter pelo menos 3 caracteres').optional(),
  fullName: z.string().min(3, 'Nome completo deve ter pelo menos 3 caracteres').optional(),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').optional(),
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
});

const deleteUserSchema = z.object({
  id: z.string(),
});

const updateUserRoleSchema = z.object({
  id: z.string(),
  role: z.enum(['admin', 'editor', 'viewer']),
});

const resetUserPasswordSchema = z.object({
  id: z.string(),
  newPassword: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

const listUsersSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
  orderBy: z.enum(['username', 'role', 'isActive', 'twoFactorEnabled', 'createdAt']).optional(),
  orderDir: z.enum(['asc', 'desc']).default('desc').optional(),
});

// ============================================================================
// Helper Functions
// ============================================================================

async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

async function checkUserExists(email: string, username: string, excludeId?: string): Promise<boolean> {
  const user = await prisma.dashboardUser.findFirst({
    where: {
      OR: [{ email }, { username }],
      ...(excludeId && { NOT: { id: excludeId } }),
    },
  });
  return !!user;
}

// ============================================================================
// Server Actions
// ============================================================================

/**
 * Lista usuários com filtros e paginação
 */
export async function listUsers(
  input: z.infer<typeof listUsersSchema>
): Promise<
  ActionResponse<{
    users: UserData[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    pages: number;
  }>
> {
  try {
    const validated = listUsersSchema.parse(input);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};
    if (validated.role) {
      where.role = validated.role;
    }
    if (validated.search) {
      where.OR = [
        { email: { contains: validated.search, mode: 'insensitive' } },
        { username: { contains: validated.search, mode: 'insensitive' } },
      ];
    }

    const total = await prisma.dashboardUser.count({ where });
    const totalPages = Math.ceil(total / validated.pageSize);

    // Default sorting
    const orderBy: Record<string, string> = {};
    if (validated.orderBy) {
      orderBy[validated.orderBy] = validated.orderDir || 'asc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const users = await prisma.dashboardUser.findMany({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        isActive: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy,
      skip: (validated.page - 1) * validated.pageSize,
      take: validated.pageSize,
    });

    return createSuccessResponse({
      users,
      total,
      page: validated.page,
      pageSize: validated.pageSize,
      totalPages,
      pages: totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[listUsers] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao listar usuários');
  }
}

const selectAllUserIdsSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
  search: z.string().optional(),
});

export async function selectAllUserIds(
  input: z.infer<typeof selectAllUserIdsSchema> = {}
): Promise<ActionResponse<{ ids: string[]; total: number }>> {
  try {
    const validated = selectAllUserIdsSchema.parse(input);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};
    if (validated.role) {
      where.role = validated.role;
    }
    if (validated.search) {
      where.OR = [
        { email: { contains: validated.search, mode: 'insensitive' } },
        { username: { contains: validated.search, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.dashboardUser.findMany({
      where,
      select: { id: true },
    });

    return createSuccessResponse({
      ids: users.map((u) => u.id),
      total: users.length,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[selectAllUserIds] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao selecionar usuários');
  }
}

/**
 * Ativa/Inativa um usuário (toggle de isActive)
 * Requer permissão de administrador
 */
const toggleUserActiveSchema = z.object({
  id: z.string(),
});

export async function toggleUserActive(
  input: z.infer<typeof toggleUserActiveSchema>
): Promise<ActionResponse<{ user: UserData }>> {
  try {
    // Verificar permissão - apenas admin pode ativar/inativar usuários
    if (!(await canManageUsers())) {
      return createErrorResponse('Você não tem permissão para ativar/inativar usuários');
    }

    const validated = toggleUserActiveSchema.parse(input);

    const user = await prisma.dashboardUser.findUnique({
      where: { id: validated.id },
    });

    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    if (user.role === 'admin' && user.isActive) {
      const adminCount = await prisma.dashboardUser.count({ where: { role: 'admin', isActive: true } });
      if (adminCount <= 1) {
        return createErrorResponse('Não é possível inativar o último administrador ativo');
      }
    }

    const updated = await prisma.dashboardUser.update({
      where: { id: validated.id },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        avatarUrl: true,
        role: true,
        isActive: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Log the action
    await logAction(
      LogResource.USER,
      LogAction.UPDATE,
      undefined,
      {
        userId: updated.id,
        username: updated.username,
        status: updated.isActive ? 'activated' : 'deactivated',
      }
    );

    return createSuccessResponse({ user: updated });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[toggleUserActive] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar status do usuário');
  }
}

/**
 * Cria um novo usuário
 * Requer permissão de administrador
 */
export async function createUser(
  input: z.infer<typeof createUserSchema>
): Promise<ActionResponse<{ user: UserData }>> {
  try {
    // Verificar permissão - apenas admin pode criar usuários
    if (!(await canManageUsers())) {
      return createErrorResponse('Você não tem permissão para criar usuários');
    }

    const validated = createUserSchema.parse(input);

    // Check if user already exists
    const exists = await checkUserExists(validated.email, validated.username);
    if (exists) {
      return createErrorResponse('Email ou username já cadastrado');
    }

    const passwordHash = await hashPassword(validated.password);

    const user = await prisma.dashboardUser.create({
      data: {
        email: validated.email,
        username: validated.username,
        fullName: validated.fullName ?? null,
        passwordHash,
        role: validated.role,
        firebaseUid: `local_${Date.now()}_${Math.random()}`, // Temporary UID for non-Firebase users
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        isActive: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Log the action
    await logAction(
      LogResource.USER,
      LogAction.CREATE,
      undefined,
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    );

    return createSuccessResponse({ user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[createUser] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao criar usuário');
  }
}

/**
 * Atualiza um usuário
 * Requer permissão de administrador
 */
export async function updateUser(
  input: z.infer<typeof updateUserSchema>
): Promise<ActionResponse<{ user: UserData }>> {
  try {
    // Verificar permissão - apenas admin pode atualizar usuários
    if (!(await canManageUsers())) {
      return createErrorResponse('Você não tem permissão para atualizar usuários');
    }

    const validated = updateUserSchema.parse(input);

    // Check if user exists
    const user = await prisma.dashboardUser.findUnique({
      where: { id: validated.id },
    });

    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    // Check if email/username already exists
    if (validated.email || validated.username) {
      const exists = await checkUserExists(
        validated.email || user.email,
        validated.username || user.username,
        validated.id
      );
      if (exists) {
        return createErrorResponse('Email ou username já cadastrado');
      }
    }

    // Hash password if provided
    const passwordHash = validated.password ? await hashPassword(validated.password) : undefined;

    const updated = await prisma.dashboardUser.update({
      where: { id: validated.id },
      data: {
        ...(validated.email && { email: validated.email }),
        ...(validated.username && { username: validated.username }),
        ...(validated.fullName && { fullName: validated.fullName }),
        ...(passwordHash && { passwordHash, legacyHashNeedsUpdate: false }),
        ...(validated.role && { role: validated.role }),
      },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        isActive: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Log the action
    await logAction(
      LogResource.USER,
      LogAction.UPDATE,
      undefined,
      {
        userId: updated.id,
        username: updated.username,
        changes: {
          email: validated.email,
          username: validated.username,
          fullName: validated.fullName,
          role: validated.role,
          passwordChanged: !!passwordHash,
        },
      }
    );

    return createSuccessResponse({ user: updated });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateUser] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar usuário');
  }
}

/**
 * Atualiza o role de um usuário
 * Requer permissão de administrador
 */
export async function updateUserRole(
  input: z.infer<typeof updateUserRoleSchema>
): Promise<ActionResponse<{ user: UserData }>> {
  try {
    // Verificar permissão - apenas admin pode alterar roles
    if (!(await canManageUsers())) {
      return createErrorResponse('Você não tem permissão para alterar roles de usuários');
    }

    const validated = updateUserRoleSchema.parse(input);

    const user = await prisma.dashboardUser.findUnique({
      where: { id: validated.id },
    });

    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    const updated = await prisma.dashboardUser.update({
      where: { id: validated.id },
      data: { role: validated.role },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        isActive: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Log the action
    await logAction(
      LogResource.USER,
      LogAction.UPDATE_ROLE,
      undefined,
      {
        userId: updated.id,
        username: updated.username,
        oldRole: user.role,
        newRole: updated.role,
      }
    );

    return createSuccessResponse({ user: updated });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[updateUserRole] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao atualizar role do usuário');
  }
}

/**
 * Reseta a senha de um usuário
 * Requer permissão de administrador
 */
export async function resetUserPassword(
  input: z.infer<typeof resetUserPasswordSchema>
): Promise<ActionResponse<{ success: boolean }>> {
  try {
    // Verificar permissão - apenas admin pode resetar senhas
    if (!(await canManageUsers())) {
      return createErrorResponse('Você não tem permissão para resetar senhas');
    }

    const validated = resetUserPasswordSchema.parse(input);

    const user = await prisma.dashboardUser.findUnique({
      where: { id: validated.id },
    });

    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    const passwordHash = await hashPassword(validated.newPassword);

    await prisma.dashboardUser.update({
      where: { id: validated.id },
      data: {
        passwordHash,
        legacyHashNeedsUpdate: false,
      },
    });

    return createSuccessResponse({ success: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[resetUserPassword] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao resetar senha do usuário');
  }
}

/**
 * Deleta um usuário
 * Requer permissão de administrador
 */
export async function deleteUser(
  input: z.infer<typeof deleteUserSchema>
): Promise<ActionResponse<{ deleted: boolean }>> {
  try {
    // Verificar permissão - apenas admin pode deletar usuários
    if (!(await canManageUsers())) {
      return createErrorResponse('Você não tem permissão para deletar usuários');
    }
    const validated = deleteUserSchema.parse(input);

    const user = await prisma.dashboardUser.findUnique({
      where: { id: validated.id },
    });

    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    // Prevent deleting the last admin
    if (user.role === 'admin') {
      const adminCount = await prisma.dashboardUser.count({
        where: { role: 'admin' },
      });
      if (adminCount <= 1) {
        return createErrorResponse('Não é possível deletar o último administrador');
      }
    }

    await prisma.dashboardUser.delete({
      where: { id: validated.id },
    });

    // Log the action
    await logAction(
      LogResource.USER,
      LogAction.DELETE,
      undefined,
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      }
    );

    return createSuccessResponse({ deleted: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteUser] Error:', error);
    if (error instanceof z.ZodError) {
      return createErrorResponse(error.errors[0].message);
    }
    return createErrorResponse('Erro ao deletar usuário');
  }
}

/**
 * Obtém um usuário específico
 */
export async function getUser(id: string): Promise<ActionResponse<{ user: UserData }>> {
  try {
    const user = await prisma.dashboardUser.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        fullName: true,
        role: true,
        isActive: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return createErrorResponse('Usuário não encontrado');
    }

    return createSuccessResponse({ user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getUser] Error:', error);
    return createErrorResponse('Erro ao buscar usuário');
  }
}

/**
 * Deleta múltiplos usuários
 * Requer permissão de administrador
 */
export async function deleteUsersBulk(
  ids: string[]
): Promise<ActionResponse<{ deleted: number; failed: number }>> {
  try {
    // Verificar permissão - apenas admin pode deletar usuários
    if (!(await canManageUsers())) {
      return createErrorResponse('Você não tem permissão para deletar usuários');
    }

    if (!ids.length) {
      return createErrorResponse('Nenhum usuário selecionado');
    }

    // Verificar se algum dos usuários é o último admin
    const admins = await prisma.dashboardUser.findMany({
      where: { id: { in: ids }, role: 'admin' },
    });

    if (admins.length > 0) {
      const totalAdmins = await prisma.dashboardUser.count({ where: { role: 'admin' } });
      const remainingAdmins = totalAdmins - admins.length;

      if (remainingAdmins < 1) {
        return createErrorResponse('Não é possível deletar todos os administradores. Pelo menos um deve permanecer.');
      }
    }

    const result = await prisma.dashboardUser.deleteMany({
      where: { id: { in: ids } },
    });

    // Log the action
    await logAction(
      LogResource.USER,
      LogAction.BULK_DELETE,
      undefined,
      {
        count: result.count,
        userIds: ids,
      }
    );

    return createSuccessResponse({
      deleted: result.count,
      failed: ids.length - result.count,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteUsersBulk] Error:', error);
    return createErrorResponse('Erro ao deletar usuários');
  }
}

/**
 * Obtém estatísticas de usuários
 */
export async function getUserStats(): Promise<
  ActionResponse<{
    total: number;
    admins: number;
    editors: number;
    viewers: number;
  }>
> {
  try {
    const [total, admins, editors, viewers] = await Promise.all([
      prisma.dashboardUser.count(),
      prisma.dashboardUser.count({ where: { role: 'admin' } }),
      prisma.dashboardUser.count({ where: { role: 'editor' } }),
      prisma.dashboardUser.count({ where: { role: 'viewer' } }),
    ]);

    return createSuccessResponse({
      total,
      admins,
      editors,
      viewers,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getUserStats] Error:', error);
    return createErrorResponse('Erro ao buscar estatísticas de usuários');
  }
}
