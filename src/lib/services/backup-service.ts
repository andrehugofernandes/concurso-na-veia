import { gzipSync, gunzipSync } from 'zlib';
import { db as prisma } from '@/lib/db';

// ============================================================================
// Types
// ============================================================================

export interface BackupData {
  version: string;
  createdAt: string;
  tables: {
    content: unknown[];
    taxonomy: unknown[];
    contentTaxonomy: unknown[];
    mediaAsset: unknown[];
    menu: unknown[];
    menuItem: unknown[];
    comment: unknown[];
    dashboardUser: unknown[];
    dashboardTheme: unknown[];
    ctaPopup: unknown[];
    accessLog: unknown[];
    backupPolicy: unknown[];
  };
  metadata: {
    totalRecords: number;
    tablesCounts: Record<string, number>;
  };
}

export interface BackupResult {
  success: boolean;
  data?: Buffer;
  size?: number;
  error?: string;
}

export interface RestoreResult {
  success: boolean;
  restoredRecords?: number;
  error?: string;
}

// ============================================================================
// Backup Generation
// ============================================================================

/**
 * Gera um dump JSON completo das tabelas principais do banco de dados
 * @returns BackupData com todos os dados das tabelas
 */
export async function generateBackupData(): Promise<BackupData> {
  // eslint-disable-next-line no-console
  console.log('[backup-service] Generating backup data...');

  // Buscar dados de todas as tabelas em paralelo
  const [
    content,
    taxonomy,
    contentTaxonomy,
    mediaAsset,
    menu,
    menuItem,
    comment,
    dashboardUser,
    dashboardTheme,
    ctaPopup,
    accessLog,
    backupPolicy,
  ] = await Promise.all([
    prisma.content.findMany(),
    prisma.taxonomy.findMany(),
    prisma.contentTaxonomy.findMany(),
    prisma.mediaAsset.findMany(),
    prisma.menu.findMany(),
    prisma.menuItem.findMany(),
    prisma.comment.findMany(),
    prisma.dashboardUser.findMany({
      select: {
        id: true,
        email: true,
        firebaseUid: true,
        role: true,
        username: true,
        // Não incluir passwordHash por segurança
        hashAlgorithm: true,
        legacyHashNeedsUpdate: true,
        lastPasswordSyncAt: true,
        twoFactorEnabled: true,
        themePreference: true,
        skinPreference: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    }),
    prisma.dashboardTheme.findMany(),
    prisma.cTAPopup.findMany(),
    prisma.accessLog.findMany({
      take: 10000, // Limitar logs de auditoria para não sobrecarregar
      orderBy: { createdAt: 'desc' },
    }),
    prisma.backupPolicy.findMany(),
  ]);

  const tablesCounts: Record<string, number> = {
    content: content.length,
    taxonomy: taxonomy.length,
    contentTaxonomy: contentTaxonomy.length,
    mediaAsset: mediaAsset.length,
    menu: menu.length,
    menuItem: menuItem.length,
    comment: comment.length,
    dashboardUser: dashboardUser.length,
    dashboardTheme: dashboardTheme.length,
    ctaPopup: ctaPopup.length,
    accessLog: accessLog.length,
    backupPolicy: backupPolicy.length,
  };

  const totalRecords = Object.values(tablesCounts).reduce((a, b) => a + b, 0);

  // eslint-disable-next-line no-console
  console.log(`[backup-service] Backup data generated: ${totalRecords} records from ${Object.keys(tablesCounts).length} tables`);

  return {
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    tables: {
      content,
      taxonomy,
      contentTaxonomy,
      mediaAsset,
      menu,
      menuItem,
      comment,
      dashboardUser,
      dashboardTheme,
      ctaPopup,
      accessLog,
      backupPolicy,
    },
    metadata: {
      totalRecords,
      tablesCounts,
    },
  };
}

/**
 * Gera um backup compactado em formato .json.gz
 * @returns Buffer com dados compactados e tamanho
 */
export async function generateCompressedBackup(): Promise<BackupResult> {
  try {
    // eslint-disable-next-line no-console
    console.log('[backup-service] Starting compressed backup generation...');

    // Gerar dados do backup
    const backupData = await generateBackupData();

    // Converter para JSON
    const jsonString = JSON.stringify(backupData, null, 0); // Sem indentação para economizar espaço
    const jsonBuffer = Buffer.from(jsonString, 'utf-8');

    // eslint-disable-next-line no-console
    console.log(`[backup-service] JSON size before compression: ${jsonBuffer.length} bytes`);

    // Compactar com gzip
    const compressedBuffer = gzipSync(jsonBuffer, { level: 9 }); // Máxima compressão

    // eslint-disable-next-line no-console
    console.log(`[backup-service] Compressed size: ${compressedBuffer.length} bytes (${Math.round((1 - compressedBuffer.length / jsonBuffer.length) * 100)}% reduction)`);

    return {
      success: true,
      data: compressedBuffer,
      size: compressedBuffer.length,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[backup-service] Error generating backup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao gerar backup',
    };
  }
}

// ============================================================================
// Backup Restoration
// ============================================================================

/**
 * Descompacta um arquivo .json.gz e retorna os dados do backup
 * @param compressedData Buffer com dados compactados
 * @returns BackupData descompactado
 */
export function decompressBackup(compressedData: Buffer): BackupData {
  // eslint-disable-next-line no-console
  console.log(`[backup-service] Decompressing backup (${compressedData.length} bytes)...`);

  const decompressedBuffer = gunzipSync(compressedData);
  const jsonString = decompressedBuffer.toString('utf-8');
  const backupData = JSON.parse(jsonString) as BackupData;

  // eslint-disable-next-line no-console
  console.log(`[backup-service] Backup decompressed: version ${backupData.version}, ${backupData.metadata.totalRecords} records`);

  return backupData;
}

/**
 * Restaura dados de um backup no banco de dados
 * ATENÇÃO: Esta operação é destrutiva e substitui dados existentes
 * @param backupData Dados do backup a serem restaurados
 * @returns Resultado da restauração
 */
export async function restoreBackupData(backupData: BackupData): Promise<RestoreResult> {
  try {
    // eslint-disable-next-line no-console
    console.log(`[backup-service] Starting restore of backup version ${backupData.version}...`);

    let restoredRecords = 0;

    // Usar transação para garantir atomicidade
    await prisma.$transaction(async (tx: any) => {
      // Ordem de restauração importante por causa das foreign keys
      // 1. Primeiro tabelas sem dependências
      // 2. Depois tabelas com dependências

      // Limpar tabelas na ordem inversa de dependência
      await tx.contentTaxonomy.deleteMany();
      await tx.comment.deleteMany();
      await tx.menuItem.deleteMany();
      await tx.menu.deleteMany();
      await tx.content.deleteMany();
      await tx.taxonomy.deleteMany();
      await tx.mediaAsset.deleteMany();
      await tx.dashboardTheme.deleteMany();
      await tx.cTAPopup.deleteMany();
      await tx.backupPolicy.deleteMany();
      // Não deletar accessLog para manter histórico
      // Não deletar dashboardUser para manter usuários

      // eslint-disable-next-line no-console
      console.log('[backup-service] Tables cleared, starting data insertion...');

      // Restaurar MediaAsset primeiro (sem dependências)
      if (backupData.tables.mediaAsset.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.mediaAsset.createMany({ data: backupData.tables.mediaAsset as any, skipDuplicates: true });
        restoredRecords += backupData.tables.mediaAsset.length;
      }

      // Restaurar Taxonomy
      if (backupData.tables.taxonomy.length > 0) {
        // Restaurar sem parentId primeiro
        const taxonomiesWithoutParent = (backupData.tables.taxonomy as Array<Record<string, unknown>>).map((t) => ({
          ...t,
          parentId: null,
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.taxonomy.createMany({ data: taxonomiesWithoutParent as any, skipDuplicates: true });
        // Atualizar parentId depois
        for (const taxonomy of backupData.tables.taxonomy as Array<{ id: number; parentId?: number | null }>) {
          if (taxonomy.parentId) {
            await tx.taxonomy.update({
              where: { id: taxonomy.id },
              data: { parentId: taxonomy.parentId },
            });
          }
        }
        restoredRecords += backupData.tables.taxonomy.length;
      }

      // Restaurar Content
      if (backupData.tables.content.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.content.createMany({ data: backupData.tables.content as any, skipDuplicates: true });
        restoredRecords += backupData.tables.content.length;
      }

      // Restaurar ContentTaxonomy
      if (backupData.tables.contentTaxonomy.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.contentTaxonomy.createMany({ data: backupData.tables.contentTaxonomy as any, skipDuplicates: true });
        restoredRecords += backupData.tables.contentTaxonomy.length;
      }

      // Restaurar Menu
      if (backupData.tables.menu.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.menu.createMany({ data: backupData.tables.menu as any, skipDuplicates: true });
        restoredRecords += backupData.tables.menu.length;
      }

      // Restaurar MenuItem
      if (backupData.tables.menuItem.length > 0) {
        // Restaurar sem parentId primeiro
        const menuItemsWithoutParent = (backupData.tables.menuItem as Array<Record<string, unknown>>).map((m) => ({
          ...m,
          parentId: null,
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.menuItem.createMany({ data: menuItemsWithoutParent as any, skipDuplicates: true });
        // Atualizar parentId depois
        for (const menuItem of backupData.tables.menuItem as Array<{ id: number; parentId?: number | null }>) {
          if (menuItem.parentId) {
            await tx.menuItem.update({
              where: { id: menuItem.id },
              data: { parentId: menuItem.parentId },
            });
          }
        }
        restoredRecords += backupData.tables.menuItem.length;
      }

      // Restaurar Comment
      if (backupData.tables.comment.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.comment.createMany({ data: backupData.tables.comment as any, skipDuplicates: true });
        restoredRecords += backupData.tables.comment.length;
      }

      // Restaurar DashboardTheme
      if (backupData.tables.dashboardTheme.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.dashboardTheme.createMany({ data: backupData.tables.dashboardTheme as any, skipDuplicates: true });
        restoredRecords += backupData.tables.dashboardTheme.length;
      }

      // Restaurar CTAPopup
      if (backupData.tables.ctaPopup.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.cTAPopup.createMany({ data: backupData.tables.ctaPopup as any, skipDuplicates: true });
        restoredRecords += backupData.tables.ctaPopup.length;
      }

      // Restaurar BackupPolicy
      if (backupData.tables.backupPolicy.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await tx.backupPolicy.createMany({ data: backupData.tables.backupPolicy as any, skipDuplicates: true });
        restoredRecords += backupData.tables.backupPolicy.length;
      }
    });

    // eslint-disable-next-line no-console
    console.log(`[backup-service] Restore completed: ${restoredRecords} records restored`);

    return {
      success: true,
      restoredRecords,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[backup-service] Error restoring backup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao restaurar backup',
    };
  }
}
