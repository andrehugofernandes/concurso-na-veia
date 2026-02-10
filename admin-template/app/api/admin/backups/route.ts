import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/admin/backups:
 *   get:
 *     summary: Lista todos os backups do sistema
 *     description: Retorna histórico completo de backups executados. Acesso restrito a SYSADMIN e ADMIN.
 *     tags:
 *       - Backups
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de backups retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 backups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "clx1234567890"
 *                       type:
 *                         type: string
 *                         enum: [full, incremental]
 *                         example: "full"
 *                       status:
 *                         type: string
 *                         enum: [PENDING, RUNNING, SUCCESS, FAILED]
 *                         example: "SUCCESS"
 *                       startedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-15T03:00:00Z"
 *                       finishedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2025-10-15T03:05:30Z"
 *                       size:
 *                         type: string
 *                         nullable: true
 *                         example: "52428800"
 *                       filePath:
 *                         type: string
 *                         nullable: true
 *                         example: "backups/2025-10-15/backup-clx1234567890.sql.gz"
 *                       errorMsg:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       triggeredBy:
 *                         type: string
 *                         nullable: true
 *                         example: "admin@example.com"
 *       403:
 *         description: Acesso negado - Apenas SYSADMIN/ADMIN
 *       500:
 *         description: Erro interno do servidor
 */
export async function GET(req: NextRequest) {
  const auth = await getAuthUserFromRequest(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: 'Não autenticado' },
      { status: 401 }
    );
  }

  // Apenas SYSADMIN e ADMIN podem acessar backups
  if (auth.role !== 'SYSADMIN' && auth.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Acesso negado. Apenas SYSADMIN/ADMIN podem acessar.' },
      { status: 403 }
    );
  }

  try {
    const backups = await prisma.backupJob.findMany({
      orderBy: { startedAt: 'desc' },
      take: 50,
    });

    // Converter BigInt para string para serialização JSON
    const serializedBackups = backups.map(backup => ({
      ...backup,
      size: backup.size ? backup.size.toString() : null,
    }));

    return NextResponse.json({
      success: true,
      backups: serializedBackups,
    });
  } catch (error) {
    console.error('[GET /api/admin/backups] Erro ao buscar backups:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar backups' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/admin/backups:
 *   post:
 *     summary: Cria um novo backup do sistema
 *     description: Inicia um novo backup completo ou incremental. Acesso restrito a SYSADMIN e ADMIN.
 *     tags:
 *       - Backups
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Parâmetros do backup
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [full, incremental]
 *                 default: "incremental"
 *                 description: Tipo de backup a ser realizado
 *     responses:
 *       202:
 *         description: Backup iniciado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Backup iniciado com sucesso"
 *                 jobId:
 *                   type: string
 *                   example: "clx1234567890"
 *       400:
 *         description: Parâmetros inválidos
 *       403:
 *         description: Acesso negado - Apenas SYSADMIN/ADMIN
 *       429:
 *         description: Muitas solicitações - Já existe um backup em andamento
 *       500:
 *         description: Erro ao iniciar o backup
 */
export async function POST(req: NextRequest) {
  const auth = await getAuthUserFromRequest(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: 'Não autenticado' },
      { status: 401 }
    );
  }

  // Apenas SYSADMIN e ADMIN podem criar backups
  if (auth.role !== 'SYSADMIN' && auth.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Acesso negado. Apenas SYSADMIN/ADMIN podem criar backups.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const backupType = body?.type || 'incremental';

    // Verificar se já existe um backup em andamento
    const runningBackup = await prisma.backupJob.findFirst({
      where: {
        status: {
          in: ['PENDING', 'RUNNING']
        }
      }
    });

    if (runningBackup) {
      return NextResponse.json(
        { error: 'Já existe um backup em andamento. Aguarde a conclusão antes de iniciar um novo.' },
        { status: 429 }
      );
    }

    // Criar registro do backup no banco de dados
    const backupJob = await prisma.backupJob.create({
      data: {
        type: backupType,
        status: 'PENDING',
        startedAt: new Date(),
        triggeredBy: auth.email || 'sistema',
      }
    });

    // Iniciar o backup em segundo plano
    // Aqui você pode usar um sistema de filas (ex: Bull, Agenda) ou um worker separado
    // Por enquanto, vamos apenas simular o início do processo
    console.log(`[BACKUP] Iniciando backup ${backupType} (ID: ${backupJob.id})`);
    
    // TODO: Implementar lógica real de backup aqui
    // Isso deve ser movido para um worker em produção
    setTimeout(async () => {
      try {
        // Simular processo de backup
        console.log(`[BACKUP] Backup ${backupJob.id} em andamento...`);
        
        // Atualizar status para RUNNING
        await prisma.backupJob.update({
          where: { id: backupJob.id },
          data: { status: 'RUNNING' }
        });

        // TODO: Implementar lógica real de backup
        // 1. Fazer backup do banco de dados
        // 2. Fazer backup dos arquivos de mídia
        // 3. Compactar e armazenar no Firebase Storage
        // 4. Atualizar o registro do backup com o caminho do arquivo e tamanho
        
        // Simular conclusão do backup
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Atualizar status para SUCCESS
        await prisma.backupJob.update({
          where: { id: backupJob.id },
          data: { 
            status: 'SUCCESS',
            finishedAt: new Date(),
            filePath: `backups/${new Date().toISOString().split('T')[0]}/backup-${backupJob.id}.tar.gz`,
            size: 1024 * 1024 * 50, // 50MB
            errorMsg: null
          }
        });
        
        console.log(`[BACKUP] Backup ${backupJob.id} concluído com sucesso`);
      } catch (error) {
        console.error(`[BACKUP] Erro ao executar backup ${backupJob.id}:`, error);
        
        // Atualizar status para FAILED em caso de erro
        await prisma.backupJob.update({
          where: { id: backupJob.id },
          data: { 
            status: 'FAILED',
            finishedAt: new Date(),
            errorMsg: error instanceof Error ? error.message : 'Erro desconhecido'
          }
        });
      }
    }, 100);

    return NextResponse.json({
      success: true,
      message: 'Backup iniciado com sucesso',
      jobId: backupJob.id
    }, { status: 202 });

  } catch (error) {
    console.error('[POST /api/admin/backups] Erro ao iniciar backup:', error);
    return NextResponse.json(
      { error: 'Erro ao iniciar backup' },
      { status: 500 }
    );
  }
}
