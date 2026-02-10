import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserFromRequest } from '@/lib/auth';
import os from 'os';

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

    // Métricas do sistema
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = (usedMemory / totalMemory) * 100;

    const cpus = os.cpus();
    const cpuCount = cpus.length;
    
    // Uptime em segundos
    const uptimeSeconds = os.uptime();
    const uptimeDays = Math.floor(uptimeSeconds / 86400);
    const uptimeHours = Math.floor((uptimeSeconds % 86400) / 3600);

    // Buscar erros 500 nos últimos 7 dias
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Buscar logs com ações que indicam erro
    const errors500Count = await prisma.accessLog.count({
      where: {
        createdAt: { gte: sevenDaysAgo },
        action: { contains: 'error' },
      },
    });

    // Contar requisições totais nos últimos 7 dias
    const totalRequests = await prisma.accessLog.count({
      where: {
        createdAt: { gte: sevenDaysAgo },
      },
    });

    // Taxa de erro
    const errorRate = totalRequests > 0 ? (errors500Count / totalRequests) * 100 : 0;

    // Status de serviços
    let dbStatus = 'HEALTHY';
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = 'UNHEALTHY';
    }

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      system: {
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
        nodeVersion: process.version,
        uptime: {
          seconds: uptimeSeconds,
          formatted: `${uptimeDays}d ${uptimeHours}h`,
        },
      },
      resources: {
        memory: {
          total: totalMemory,
          totalFormatted: formatBytes(totalMemory),
          used: usedMemory,
          usedFormatted: formatBytes(usedMemory),
          free: freeMemory,
          freeFormatted: formatBytes(freeMemory),
          usagePercent: Math.round(memoryUsagePercent * 100) / 100,
        },
        cpu: {
          count: cpuCount,
          model: cpus[0]?.model || 'Unknown',
        },
      },
      services: {
        database: {
          status: dbStatus,
          type: 'MySQL',
        },
        api: {
          status: 'HEALTHY',
          version: '1.0.0',
        },
      },
      metrics: {
        last7Days: {
          totalRequests,
          errors500: errors500Count,
          errorRate: Math.round(errorRate * 100) / 100,
        },
      },
    });
  } catch (error) {
    console.error('[GET /api/reports/infrastructure-health] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de infraestrutura' },
      { status: 500 }
    );
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
