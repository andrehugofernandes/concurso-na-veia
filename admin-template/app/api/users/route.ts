import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest, hashPassword } from '@/lib/auth';
import { logActivity } from '@/lib/server/logging';
import type { Prisma } from '@prisma/client';
import { notificationsService } from '@/lib/services/notifications.service';

const CreateUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'COORDENADOR', 'USER']).optional().default('USER'),
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista usuários (ADMIN)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
export async function GET(req: Request) {
  const authUser = await getAuthUserFromRequest(req, true); // Atualiza lastSeenAt
  console.log('[GET /api/users] Auth user:', { username: authUser?.username, role: authUser?.role });
  
  if (!authUser) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir SYSADMIN, ADMIN e COORDENADOR
  if (authUser.role !== 'SYSADMIN' && authUser.role !== 'ADMIN' && authUser.role !== 'COORDENADOR') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  const url = new URL(req.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  const limit = Math.max(1, Math.min(200, parseInt(url.searchParams.get('limit') || '20', 10)));
  const search = (url.searchParams.get('search') || '').toLowerCase();
  const role = url.searchParams.get('role'); // ADMIN|COORDENADOR|USER|SYSADMIN
  const status = url.searchParams.get('status'); // ATIVO|INATIVO

  console.log('[GET /api/users] Filtros:', { page, limit, search, role, status });

  const where: Prisma.UserWhereInput = {};
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { username: { contains: search } },
    ];
  }
  // CORRIGIDO: Incluir SYSADMIN no filtro
  if (role && ['SYSADMIN','ADMIN','COORDENADOR','USER'].includes(role)) {
    where.role = role as 'SYSADMIN' | 'ADMIN' | 'COORDENADOR' | 'USER';
    console.log('[GET /api/users] Filtrando por role:', role);
  }
  if (status === 'ATIVO') where.twoFactorEnabled = { not: false };
  if (status === 'INATIVO') where.twoFactorEnabled = false;

  const total = await prisma.user.count({ where });
  const items = await prisma.user.findMany({
    where,
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      full_name: true,
      role: true,
      active: true,
      deactivatedAt: true,
      twoFactorEnabled: true,
      avatar_url: true,
      createdAt: true,
      updatedAt: true,
      lastSeenAt: true,
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
  
  // Log detalhado dos usuários retornados
  console.log('[GET /api/users] Usuários retornados:', items.map(u => ({ 
    username: u.username, 
    role: u.role,
    name: u.name 
  })));
  
  return NextResponse.json({ items, total, page, limit });
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria usuário (ADMIN)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, name, password]
 *             properties:
 *               username: { type: string }
 *               email: { type: string }
 *               name: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: ['ADMIN','COORDENADOR','USER'] }
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
export async function POST(req: Request) {
  const authUser = await getAuthUserFromRequest(req);
  if (!authUser) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  try {
    const json = await req.json();
    const data = CreateUserSchema.parse(json);

    // Regras de criação:
    // - ADMIN não pode mais criar usuários (reservado para SYSADMIN futuro)
    // - Usuários são criados automaticamente via AD
    if (authUser.role === 'ADMIN') {
      return NextResponse.json({ 
        message: 'Criação manual de usuários desabilitada. Usuários são criados automaticamente via Active Directory.' 
      }, { status: 403 });
    }
    
    // Apenas SYSADMIN poderá criar usuários manualmente (futuro)
    if (authUser.role !== 'SYSADMIN') {
      return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
    }

    const exists = await prisma.user.findFirst({ where: { OR: [{ username: data.username }, { email: data.email }] } });
    if (exists) return NextResponse.json({ message: 'Usuário já existe (username/email)' }, { status: 409 });

    const passwordHash = await hashPassword(data.password);
    const created = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        name: data.name,
        password: passwordHash,
        role: data.role,
      },
      select: { id: true, username: true, email: true, name: true, role: true, createdAt: true },
    });

    await logActivity({
      action: 'user:create',
      resource: 'user',
      userId: authUser.id,
      request: req,
      details: { 
        targetUserId: created.id, 
        username: created.username, 
        role: created.role,
        actor: { id: authUser.id, username: authUser.username }
      },
    });

    // Notificar administradores sobre novo usuário criado
    try {
      const adminIds = await notificationsService.getAdminUserIds();
      if (adminIds.length > 0) {
        await notificationsService.createNotificationForUsers(adminIds, {
          type: 'system',
          title: 'Novo usuário criado',
          message: `${authUser.username} criou o usuário "${created.username}"`,
          priority: 'info',
          actionUrl: '/admin/usuarios',
          metadata: {
            targetUserId: created.id,
            targetUsername: created.username,
            role: created.role,
            actorId: authUser.id,
          },
        });
      }
    } catch (notifyErr) {
      console.warn('[Notifications] Falha ao notificar admins sobre novo usuário:', notifyErr);
      // Segue sem bloquear a criação do usuário
    }

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ message: 'Dados inválidos', issues: err.issues }, { status: 400 });
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
  }
}
