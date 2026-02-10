import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    const normalizedRole = (user.role ?? '').toUpperCase();
    // EXCLUSIVO SYSADMIN
    if (normalizedRole !== 'SYSADMIN') {
      return NextResponse.json({ message: 'Acesso negado: apenas SYSADMIN' }, { status: 403 });
    }

    // Período: últimos 90 dias
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);

    // Buscar histórico de backups do banco de dados
    const backupJobs = await prisma.backupJob.findMany({
      where: {
        startedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: 100, // Limitar a 100 backups mais recentes
    });

    const backups = backupJobs.map((job) => {
      const duration = job.finishedAt 
        ? Math.floor((job.finishedAt.getTime() - job.startedAt.getTime()) / 1000)
        : 0;
      
      return {
        id: job.id,
        date: job.startedAt.toISOString(),
        type: job.type.toUpperCase(),
        status: job.status.toUpperCase(),
        size: job.size ? Number(job.size) : 0,
        duration,
        location: job.filePath || 'N/A',
        triggeredBy: job.triggeredBy || 'Sistema',
        errorMsg: job.errorMsg,
      };
    });

    const totalBackups = backups.length;
    const successfulBackups = backups.filter(b => b.status === 'SUCCESS').length;
    const failedBackups = backups.filter(b => b.status === 'FAILED').length;
    const successRate = totalBackups > 0 ? (successfulBackups / totalBackups) * 100 : 0;
    
    const avgSize = backups.reduce((acc, b) => acc + (b.size || 0), 0) / (totalBackups || 1);
    const avgDuration = backups.reduce((acc, b) => acc + (b.duration || 0), 0) / (totalBackups || 1);

    return NextResponse.json({
      period: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
      generatedAt: new Date().toISOString(),
      summary: {
        totalBackups,
        successfulBackups,
        failedBackups,
        successRate: Math.round(successRate * 100) / 100,
        avgSize: Math.round(avgSize),
        avgDuration: Math.round(avgDuration),
      },
      items: backups.map((backup, index) => ({
        position: index + 1,
        id: backup.id,
        date: backup.date,
        type: backup.type,
        status: backup.status,
        size: backup.size,
        sizeFormatted: backup.size > 0 
          ? `${(backup.size / 1024 / 1024 / 1024).toFixed(2)} GB`
          : 'N/A',
        duration: backup.duration,
        durationFormatted: backup.duration > 0
          ? `${Math.floor(backup.duration / 60)}min ${backup.duration % 60}s`
          : 'N/A',
        location: backup.location,
        triggeredBy: backup.triggeredBy,
        errorMsg: backup.errorMsg,
      })),
    });
  } catch (error) {
    console.error('[GET /api/reports/backup-history] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de histórico de backups' },
      { status: 500 }
    );
  }
}
