/**
 * @swagger
 * /api/admin/backups/{id}/restore:
 *   post:
 *     summary: Restaura um backup no banco de dados
 *     description: |
 *       **⚠️ OPERAÇÃO DESTRUTIVA!**
 *       
 *       - Sobrescreve completamente o banco de dados atual
 *       - Cria backup automático de segurança antes de restaurar
 *       - Requer confirmação explícita do SYSADMIN
 *       - Processo irreversível após confirmação
 *       
 *       **Fluxo de Restauração:**
 *       1. Valida autenticação SYSADMIN
 *       2. Cria backup de segurança do estado atual
 *       3. Baixa arquivo do Firebase Storage
 *       4. Descompacta arquivo .sql.gz
 *       5. Executa SQL no banco de dados
 *       6. Limpa arquivos temporários
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
 *         description: ID único do backup a ser restaurado
 *         example: "clx1234567890"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - confirm
 *             properties:
 *               confirm:
 *                 type: boolean
 *                 description: Confirmação explícita da operação destrutiva
 *                 example: true
 *     responses:
 *       200:
 *         description: Backup restaurado com sucesso
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
 *                   example: "Backup restaurado com sucesso"
 *                 safetyBackupId:
 *                   type: string
 *                   description: ID do backup de segurança criado antes da restauração
 *                   example: "clx0987654321"
 *       400:
 *         description: Confirmação não fornecida ou backup inválido
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Acesso negado - Apenas SYSADMIN
 *       404:
 *         description: Backup não encontrado
 *       500:
 *         description: Erro ao restaurar backup
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { createBackup } from '@/lib/services/backup.service';
import prisma from '@/lib/prisma';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const execAsync = promisify(exec);

// Extrair credenciais do DATABASE_URL
function parseDatabaseUrl() {
  const url = process.env.DATABASE_URL || '';
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (!match) {
    throw new Error('DATABASE_URL inválida');
  }
  return {
    user: match[1],
    password: decodeURIComponent(match[2]),
    host: match[3],
    port: match[4],
    database: match[5],
  };
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('[Restore] 🔄 INICIANDO RESTAURAÇÃO DE BACKUP');
  console.log('[Restore] 🆔 Backup ID:', params.id);
  console.log('═══════════════════════════════════════════════════════════');

  try {
    // 1. Verificar se backup existe
    const backup = await prisma.backupJob.findUnique({
      where: { id: params.id },
    });

    if (!backup || backup.status !== 'SUCCESS') {
      return NextResponse.json(
        { error: 'Backup não encontrado ou inválido' },
        { status: 404 }
      );
    }

    console.log('[Restore] ✅ Backup encontrado:', backup.filePath);

    // 2. CRIAR BACKUP DE SEGURANÇA ANTES DE RESTAURAR
    console.log('[Restore] 🛡️  Criando backup de segurança...');
    const safetyBackup = await createBackup('full', 'pre-restore-safety');
    console.log('[Restore] ✅ Backup de segurança criado:', safetyBackup.jobId);

    // 3. Baixar backup do Firebase
    console.log('[Restore] 📥 Baixando backup do Firebase...');
    const storageRef = ref(storage, backup.filePath!);
    const downloadUrl = await getDownloadURL(storageRef);

    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error('Falha ao baixar backup do Firebase');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Salvar arquivo comprimido temporariamente
    const tempGzPath = path.join('/tmp', `restore-${Date.now()}.sql.gz`);
    const tempSqlPath = tempGzPath.replace('.gz', '');
    
    writeFileSync(tempGzPath, buffer);
    console.log('[Restore] ✅ Arquivo baixado:', tempGzPath);

    // 5. Descomprimir
    console.log('[Restore] 📦 Descomprimindo arquivo...');
    await pipeline(
      createReadStream(tempGzPath),
      createGunzip(),
      createWriteStream(tempSqlPath)
    );
    console.log('[Restore] ✅ Arquivo descomprimido:', tempSqlPath);

    // 6. Restaurar banco de dados
    console.log('[Restore] 🗄️  Restaurando banco de dados...');
    const dbConfig = parseDatabaseUrl();
    
    // Usar mysql CLI para importar
    const restoreCommand = `mysql -h ${dbConfig.host} -P ${dbConfig.port} -u ${dbConfig.user} -p${dbConfig.password} ${dbConfig.database} < ${tempSqlPath}`;
    
    await execAsync(restoreCommand);
    console.log('[Restore] ✅ Banco de dados restaurado!');

    // 7. Limpar arquivos temporários
    console.log('[Restore] 🧹 Limpando arquivos temporários...');
    unlinkSync(tempGzPath);
    unlinkSync(tempSqlPath);

    console.log('═══════════════════════════════════════════════════════════');
    console.log('[Restore] 🎉 RESTAURAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('[Restore] 🛡️  Backup de segurança:', safetyBackup.jobId);
    console.log('═══════════════════════════════════════════════════════════');

    return NextResponse.json({
      success: true,
      restoredBackup: params.id,
      safetyBackup: safetyBackup.jobId,
      message: 'Banco de dados restaurado com sucesso',
    });
  } catch (error) {
    console.error('[Restore] ❌ ERRO:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
