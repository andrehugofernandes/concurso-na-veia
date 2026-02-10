import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserFromRequest } from '@/lib/auth';
import { backupService } from '@/lib/services/backup.service';

/**
 * @swagger
 * /api/admin/backups/{id}:
 *   delete:
 *     summary: Exclui um backup específico
 *     description: Remove o backup do Firebase Storage e do banco de dados. Acesso restrito a SYSADMIN.
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
 *         description: Backup excluído com sucesso
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
 *                   example: "Backup excluído com sucesso"
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado - Apenas SYSADMIN
 *       404:
 *         description: Backup não encontrado
 *       500:
 *         description: Erro ao excluir backup
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Autenticação
    const auth = await getAuthUserFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Apenas SYSADMIN pode excluir backups
    if (auth.role !== 'SYSADMIN') {
      return NextResponse.json({ error: 'Acesso negado. Apenas SYSADMIN pode excluir backups.' }, { status: 403 });
    }

    const backupId = params.id;

    // Excluir backup usando o serviço
    await backupService.deleteBackup(backupId);

    return NextResponse.json({
      success: true,
      message: 'Backup excluído com sucesso',
    });
  } catch (error) {
    console.error('[DELETE /api/admin/backups/[id]] Erro:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir backup', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
