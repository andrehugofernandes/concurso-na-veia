/**
 * Endpoint de Cron para Backup Automático Diário
 * 
 * Executado diariamente às 03:00 via Vercel Cron Jobs
 * Protegido por token CRON_SECRET
 */

import { NextResponse } from 'next/server';
import { createBackup, cleanupOldBackups } from '@/lib/services/backup.service';
import { backupRotationService } from '@/lib/services/backup-rotation.service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function verifyBackupSecret(request: Request): boolean {
  const cronSecret = request.headers.get('x-cron-secret');
  const expectedSecret = process.env.CRON_SECRET;

  if (!expectedSecret) {
    console.error('[Cron] ❌ CRON_SECRET não configurado!');
    return false;
  }

  if (cronSecret !== expectedSecret) {
    console.error('[Cron] ❌ Token inválido!');
    console.error('[Cron] Recebido:', cronSecret);
    return false;
  }

  return true;
}

async function executeBackup() {
  try {
    console.log('═══════════════════════════════════════════════════════════');
    console.log('[Cron] 🚀 INICIANDO ROTINA DE BACKUP AUTOMÁTICO');
    console.log(`[Cron] 📅 Data/Hora: ${new Date().toISOString()}`);
    console.log('═══════════════════════════════════════════════════════════');

    // 1. Criar novo backup
    console.log('[Cron] 💾 1/3 - Iniciando backup...');
    const result = await createBackup('full', 'system-cron');
    console.log('[Cron] ✅ Backup criado com sucesso!');
    console.log(`[Cron] 🆔 Job ID: ${result.jobId}`);
    console.log(`[Cron] 💾 Tamanho: ${(result.size / (1024 ** 2)).toFixed(2)} MB`);
    console.log(`[Cron] ⏱️  Duração: ${(result.duration / 1000).toFixed(2)}s`);

    // 2. Rotacionar backups (manter apenas os X mais recentes)
    console.log('[Cron] 🔄 2/3 - Rotacionando backups...');
    const rotationResult = await backupRotationService.rotateBackups();
    console.log(`[Cron] ✅ Rotação concluída: ${rotationResult.deletedCount} de ${rotationResult.totalBackups - rotationResult.keptBackups} backups removidos`);
    
    // 3. Limpar backups antigos (baseado em data de retenção)
    console.log('[Cron] 🧹 3/3 - Limpando backups antigos...');
    const deleted = await cleanupOldBackups();
    console.log(`[Cron] ✅ ${deleted} backup(s) antigo(s) removido(s)`);

    console.log('═══════════════════════════════════════════════════════════');
    console.log('[Cron] 🎉 BACKUP AUTOMÁTICO CONCLUÍDO COM SUCESSO!');
    console.log('═══════════════════════════════════════════════════════════');

    return NextResponse.json({
      success: true,
      backup: {
        jobId: result.jobId,
        size: result.size,
        duration: result.duration,
        filePath: result.filePath,
      },
      cleanedUp: deleted,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log('═══════════════════════════════════════════════════════════');
    console.error('[Cron] ❌ ERRO AO EXECUTAR BACKUP AUTOMÁTICO!');
    console.error('[Cron] 💥 Detalhes:', error);
    console.log('═══════════════════════════════════════════════════════════');

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('[Cron] 🕐 BACKUP AUTOMÁTICO INICIADO (GET)');
  console.log('[Cron] 📅 Timestamp:', new Date().toISOString());
  console.log('═══════════════════════════════════════════════════════════');

  if (!verifyBackupSecret(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  console.log('[Cron] ✅ Autenticação validada');
  return executeBackup();
}

export async function POST(request: Request) {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('[Cron] 🕐 BACKUP AUTOMÁTICO INICIADO (POST)');
  console.log('[Cron] 📅 Timestamp:', new Date().toISOString());
  console.log('═══════════════════════════════════════════════════════════');

  if (!verifyBackupSecret(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  console.log('[Cron] ✅ Autenticação validada');
  return executeBackup();
}
