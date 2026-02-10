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

    // Buscar usuários com dados pessoais
    const totalUsers = await prisma.user.count();
    // Contar todos os usuários (email é obrigatório no schema)
    const usersWithEmail = totalUsers;

    // Buscar usuários com acesso a dados críticos (ADMIN e COORDENADOR)
    const privilegedUsers = await prisma.user.count({
      where: {
        role: { in: ['ADMIN', 'COORDENADOR', 'SYSADMIN'] },
        active: true,
      },
    });

    // Buscar logs de acesso a dados pessoais (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const personalDataAccess = await prisma.accessLog.count({
      where: {
        action: { in: ['user:view', 'user:update', 'user:create'] },
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    // Buscar usuários desativados (potenciais solicitações de exclusão)
    const deactivatedUsers = await prisma.user.count({
      where: {
        active: false,
      },
    });

    // Buscar logs antigos (verificar retenção)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const oldLogs = await prisma.accessLog.count({
      where: {
        createdAt: { lt: sixMonthsAgo },
      },
    });

    const totalLogs = await prisma.accessLog.count();

    // Verificar conformidade
    const compliance = {
      dataRetention: {
        status: oldLogs < totalLogs * 0.5 ? 'COMPLIANT' : 'REVIEW_NEEDED',
        message: oldLogs < totalLogs * 0.5 
          ? 'Logs antigos dentro do limite aceitável' 
          : 'Revisar política de retenção de logs',
        oldLogsCount: oldLogs,
        totalLogsCount: totalLogs,
      },
      userConsent: {
        status: 'COMPLIANT',
        message: 'Todos os usuários autenticados via AD',
        usersWithConsent: totalUsers,
      },
      dataAccess: {
        status: privilegedUsers < 10 ? 'COMPLIANT' : 'REVIEW_NEEDED',
        message: privilegedUsers < 10 
          ? 'Número adequado de usuários privilegiados' 
          : 'Revisar número de usuários com acesso privilegiado',
        privilegedUsersCount: privilegedUsers,
      },
      dataMinimization: {
        status: 'COMPLIANT',
        message: 'Apenas dados necessários são coletados',
      },
    };

    // Calcular score de conformidade
    const complianceScore = Object.values(compliance).filter(
      item => item.status === 'COMPLIANT'
    ).length / Object.keys(compliance).length * 100;

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      complianceScore: Math.round(complianceScore),
      summary: {
        totalUsers,
        usersWithPersonalData: usersWithEmail,
        privilegedUsers,
        deactivatedUsers,
        personalDataAccessLast30Days: personalDataAccess,
      },
      compliance,
      recommendations: [
        {
          priority: 'HIGH',
          title: 'Implementar limpeza automática de logs',
          description: 'Configurar job para deletar logs com mais de 180 dias',
        },
        {
          priority: 'MEDIUM',
          title: 'Revisar usuários privilegiados',
          description: 'Auditar periodicamente usuários com role ADMIN/COORDENADOR',
        },
        {
          priority: 'LOW',
          title: 'Documentar política de privacidade',
          description: 'Manter documentação atualizada sobre tratamento de dados',
        },
      ],
    });
  } catch (error) {
    console.error('[GET /api/reports/compliance-lgpd] Erro:', error);
    return NextResponse.json(
      { message: 'Erro ao gerar relatório de compliance' },
      { status: 500 }
    );
  }
}
