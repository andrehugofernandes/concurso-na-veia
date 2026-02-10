import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const auth = await getAuthUserFromRequest(req);
  if (!auth) return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total de arquivos
    const totalFiles = await prisma.file.count();

    // Uploads este mês
    const uploadsThisMonth = await prisma.file.count({
      where: {
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    // Downloads este mês (através da tabela Download)
    const downloadsThisMonth = await prisma.download.count({
      where: {
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    // Visualizações este mês (através da tabela AccessLog)
    const viewsThisMonth = await prisma.accessLog.count({
      where: {
        action: 'video:view',
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    // Categorias ativas (que têm arquivos)
    const activeCategories = await prisma.category.count({
      where: {
        files: {
          some: {}
        }
      }
    });

    return NextResponse.json({
      totalFiles,
      uploadsThisMonth,
      downloadsThisMonth,
      viewsThisMonth,
      activeCategories
    });
  } catch (e: unknown) {
    console.error('[API] /api/files/stats error:', e);
    const message = e instanceof Error ? e.message : 'Erro ao obter estatísticas';
    return NextResponse.json({ message }, { status: 500 });
  }
}
