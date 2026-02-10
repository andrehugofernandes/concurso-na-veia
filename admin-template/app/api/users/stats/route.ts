import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const authUser = await getAuthUserFromRequest(req);
  if (!authUser) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  // Permitir ADMIN, COORDENADOR e SYSADMIN
  if (authUser.role !== 'ADMIN' && authUser.role !== 'COORDENADOR' && authUser.role !== 'SYSADMIN') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, ativos, inativos, admins, coordenadores, users, criadosNoMes] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { twoFactorEnabled: true } }),
    prisma.user.count({ where: { twoFactorEnabled: false } }),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'COORDENADOR' } }),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
  ]);

  return NextResponse.json({ 
    totalUsers: total, // Adicionar para compatibilidade com dashboard
    total, 
    ativos, 
    inativos, 
    criadosNoMes, 
    porFuncao: { ADMIN: admins, COORDENADOR: coordenadores, USER: users } 
  });
}
