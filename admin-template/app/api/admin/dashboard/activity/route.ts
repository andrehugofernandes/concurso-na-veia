import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import { startOfDay, endOfDay, subDays, format } from 'date-fns';

/**
 * @swagger
 * /api/admin/dashboard/activity:
 *   get:
 *     summary: Atividade do dashboard (ADMIN e COORDENADOR)
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dados de atividade
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
export async function GET(req: Request) {
  const authUser = await getAuthUserFromRequest(req);
  if (!authUser) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  if (authUser.role !== 'ADMIN' && authUser.role !== 'COORDENADOR') {
    return NextResponse.json({ message: 'Sem permissão' }, { status: 403 });
  }

  // Visitas (aqui usamos Access como proxy de atividade; se não houver, retornamos zeros)
  const visits: Array<{ date: string; visits: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const day = subDays(new Date(), i);
    const from = startOfDay(day);
    const to = endOfDay(day);

    let count = 0;
    try {
      count = await prisma.access.count({ where: { createdAt: { gte: from, lte: to } } });
    } catch {
      count = 0;
    }
    visits.push({ date: format(day, 'dd/MM'), visits: count });
  }

  // Downloads por categoria (usando tabela Download)
  // Estratégia: buscar últimos 100 downloads com relação de arquivo+categoria e agregar em memória
  let downloadsByCategory: Array<{ label: string; value: number }> = [];
  try {
    const recentDownloads = await prisma.download.findMany({
      take: 500,
      orderBy: { createdAt: 'desc' },
      include: { file: { include: { category: true } } },
    });
    const map = new Map<string, number>();
    for (const d of recentDownloads) {
      const label = d.file?.category?.name ?? 'Sem categoria';
      map.set(label, (map.get(label) ?? 0) + 1);
    }
    downloadsByCategory = Array.from(map.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  } catch {
    downloadsByCategory = [];
  }

  // Atividades recentes (usamos downloads como eventos recentes)
  let recentActivities: Array<{ id: string; type: string; user: string; item: string; date: Date }> = [];
  try {
    const recent = await prisma.download.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { file: true, user: true },
    });
    recentActivities = recent.map((r) => ({
      id: r.id,
      type: 'download',
      user: r.user?.username ?? 'anônimo',
      item: r.file?.originalName ?? r.file?.filename ?? '',
      date: r.createdAt,
    }));
  } catch {
    recentActivities = [];
  }

  return NextResponse.json({ visits, downloadsByCategory, recentActivities });
}
