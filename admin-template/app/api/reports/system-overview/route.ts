import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    const normalizedRole = (user.role ?? '').toUpperCase();
    // Permitir SYSADMIN e ADMIN
    if (normalizedRole !== 'SYSADMIN' && normalizedRole !== 'ADMIN') {
      return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });
    }

    // Buscar totais do sistema
    const [totalUsers, totalFiles, totalCategories, totalDownloads, totalLogs] = await Promise.all([
      prisma.user.count(),
      prisma.file.count(),
      prisma.category.count(),
      prisma.download.count(),
      prisma.accessLog.count(),
    ]);

    // Contar visualizações de vídeos (arquivos com tipo video)
    const totalVideoViews = await prisma.file.count({
      where: {
        mimeType: {
          startsWith: 'video/',
        },
      },
    });

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      totalUsers,
      totalFiles,
      totalCategories,
      totalDownloads,
      totalVideoViews,
      totalLogs,
    });
  } catch (error) {
    console.error('[API] /api/reports/system-overview error:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar resumo geral do sistema' },
      { status: 500 },
    );
  }
}
