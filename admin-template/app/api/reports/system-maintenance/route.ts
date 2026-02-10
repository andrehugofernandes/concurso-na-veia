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
    // EXCLUSIVO SYSADMIN
    if (normalizedRole !== 'SYSADMIN') {
      return NextResponse.json({ message: 'Acesso negado: apenas SYSADMIN' }, { status: 403 });
    }

    // Buscar último backup (quando implementado)
    const lastBackupDate = new Date(); // Placeholder
    const hoursSinceBackup = Math.floor((Date.now() - lastBackupDate.getTime()) / (1000 * 60 * 60));

    // Buscar limpeza de logs
    const oldestLog = await prisma.accessLog.findFirst({
      orderBy: { createdAt: 'asc' },
      select: { createdAt: true },
    });

    const daysSinceOldestLog = oldestLog 
      ? Math.floor((Date.now() - oldestLog.createdAt.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    // Contar logs totais
    const totalLogs = await prisma.accessLog.count();

    // Buscar logs antigos (mais de 180 dias)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const oldLogsCount = await prisma.accessLog.count({
      where: { createdAt: { lt: sixMonthsAgo } },
    });

    // Buscar arquivos órfãos
    const orphanFiles = await prisma.file.count({
      where: { categoryId: null },
    });

    // Buscar usuários inativos (mais de 90 dias sem login)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const inactiveUsers = await prisma.user.count({
      where: {
        updatedAt: { lt: ninetyDaysAgo },
        active: true,
      },
    });

    // Checklist de manutenção
    const checklist = [
      {
        task: 'Backup executado',
        status: hoursSinceBackup < 24 ? 'OK' : 'PENDING',
        lastExecution: lastBackupDate.toISOString(),
        recommendation: hoursSinceBackup < 24 
          ? 'Backup em dia' 
          : `Último backup há ${hoursSinceBackup}h - executar backup`,
      },
      {
        task: 'Limpeza de logs',
        status: oldLogsCount === 0 ? 'OK' : 'PENDING',
        lastExecution: oldestLog?.createdAt.toISOString() || 'Nunca',
        recommendation: oldLogsCount === 0 
          ? 'Logs dentro do período de retenção' 
          : `${oldLogsCount} logs antigos - executar limpeza`,
      },
      {
        task: 'Arquivos órfãos',
        status: orphanFiles === 0 ? 'OK' : 'REVIEW',
        lastExecution: 'N/A',
        recommendation: orphanFiles === 0 
          ? 'Sem arquivos órfãos' 
          : `${orphanFiles} arquivos sem categoria - revisar`,
      },
      {
        task: 'Usuários inativos',
        status: inactiveUsers < 5 ? 'OK' : 'REVIEW',
        lastExecution: 'N/A',
        recommendation: inactiveUsers < 5 
          ? 'Poucos usuários inativos' 
          : `${inactiveUsers} usuários sem login há 90+ dias - revisar`,
      },
    ];

    // Calcular score de saúde
    const healthScore = (checklist.filter(item => item.status === 'OK').length / checklist.length) * 100;

    // Tarefas recomendadas
    const recommendations = [];
    
    if (oldLogsCount > 0) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Executar limpeza de logs',
        description: `Deletar ${oldLogsCount} logs com mais de 180 dias`,
        command: 'DELETE FROM AccessLog WHERE createdAt < DATE_SUB(NOW(), INTERVAL 180 DAY)',
      });
    }

    if (orphanFiles > 0) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Revisar arquivos órfãos',
        description: `${orphanFiles} arquivos sem categoria precisam ser categorizados ou removidos`,
        command: 'SELECT * FROM File WHERE categoryId IS NULL',
      });
    }

    if (inactiveUsers > 5) {
      recommendations.push({
        priority: 'LOW',
        title: 'Revisar usuários inativos',
        description: `${inactiveUsers} usuários sem atividade há mais de 90 dias`,
        command: 'SELECT * FROM User WHERE updatedAt < DATE_SUB(NOW(), INTERVAL 90 DAY) AND active = true',
      });
    }

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      healthScore: Math.round(healthScore),
      summary: {
        totalLogs,
        oldLogs: oldLogsCount,
        orphanFiles,
        inactiveUsers,
        daysSinceOldestLog,
      },
      checklist,
      recommendations,
    });
  } catch (error) {
    console.error('[GET /api/reports/system-maintenance] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de manutenção' },
      { status: 500 }
    );
  }
}
