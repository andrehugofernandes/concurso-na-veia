import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { backupService } from '@/lib/services/backup.service';

/**
 * @swagger
 * /api/admin/backups/{id}/download:
 *   get:
 *     summary: Baixa um arquivo de backup
 *     description: Faz download do arquivo .sql.gz do Firebase Storage. Acesso restrito a SYSADMIN.
 *     tags:
 *       - Backups
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único do backup
 *         example: "clx1234567890"
 *     responses:
 *       200:
 *         description: Arquivo de backup retornado com sucesso
 *         content:
 *           application/gzip:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             description: Nome do arquivo para download
 *             schema:
 *               type: string
 *               example: 'attachment; filename="backup-clx1234567890.sql.gz"'
 *           Content-Type:
 *             description: Tipo MIME do arquivo
 *             schema:
 *               type: string
 *               example: "application/gzip"
 *           Content-Length:
 *             description: Tamanho do arquivo em bytes
 *             schema:
 *               type: integer
 *               example: 52428800
 *       400:
 *         description: Backup não está disponível para download
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado - Apenas SYSADMIN
 *       404:
 *         description: Backup ou arquivo não encontrado
 *       500:
 *         description: Erro ao baixar backup
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Autenticação
    const auth = await getAuthUserFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Apenas SYSADMIN pode baixar backups
    if (auth.role !== 'SYSADMIN') {
      return NextResponse.json({ error: 'Acesso negado. Apenas SYSADMIN pode baixar backups.' }, { status: 403 });
    }

    const backupId = params.id;

    // Buscar backup no banco
    const backup = await prisma.backupJob.findUnique({
      where: { id: backupId },
    });

    if (!backup) {
      return NextResponse.json({ error: 'Backup não encontrado' }, { status: 404 });
    }

    if (backup.status !== 'SUCCESS') {
      return NextResponse.json({ error: 'Backup não está disponível para download (status não é SUCCESS)' }, { status: 400 });
    }

    if (!backup.filePath) {
      return NextResponse.json({ error: 'Caminho do arquivo não encontrado' }, { status: 404 });
    }

    // Baixar arquivo do Firebase Storage
    const fileBuffer = await backupService.downloadBackup(backup.filePath);

    // Retornar arquivo como download
    const fileName = backup.filePath.split('/').pop() || `backup-${backupId}.sql.gz`;
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/gzip',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('[GET /api/admin/backups/[id]/download] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao baixar backup', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
