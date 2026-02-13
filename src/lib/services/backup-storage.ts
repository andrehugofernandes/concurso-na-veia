/**
 * Serviço de armazenamento de backups no Firebase Storage
 * Estrutura: backups/{backupId}/backup-{timestamp}.json.gz
 */

// Configuração do Firebase Storage
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'pmjg-apps-dev.firebasestorage.app';

// Prefixo do app no bucket compartilhado (mesmo padrão usado em uploads de mídia)
const APP_STORAGE_PREFIX = 'wp2next';

// ============================================================================
// Types
// ============================================================================

export interface BackupUploadResult {
  success: boolean;
  filePath?: string;
  url?: string;
  size?: number;
  error?: string;
}

export interface BackupDownloadResult {
  success: boolean;
  data?: Buffer;
  error?: string;
}

export interface BackupDeleteResult {
  success: boolean;
  error?: string;
}

// ============================================================================
// Upload
// ============================================================================

/**
 * Faz upload de um backup para o Firebase Storage
 * @param backupId ID do backup (usado para criar a pasta)
 * @param fileBuffer Buffer com dados compactados (.json.gz)
 * @returns Resultado do upload com filePath e URL
 */
export async function uploadBackupToFirebase(
  backupId: string,
  fileBuffer: Buffer
): Promise<BackupUploadResult> {
  try {
    const timestamp = Date.now();
    const fileName = `backup-${timestamp}.json.gz`;
    const storagePath = `${APP_STORAGE_PREFIX}/backups/${backupId}/${fileName}`;

    // eslint-disable-next-line no-console
    console.log(`[backup-storage] Uploading backup to: ${storagePath} (bucket: ${FIREBASE_STORAGE_BUCKET})`);

    // URL da API REST do Firebase Storage para upload
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o?uploadType=media&name=${encodeURIComponent(storagePath)}`;

    // Upload via API REST
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/gzip',
      },
      body: new Uint8Array(fileBuffer),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // eslint-disable-next-line no-console
      console.error(
        '[backup-storage] Upload failed',
        JSON.stringify({ status: response.status, storagePath, bucket: FIREBASE_STORAGE_BUCKET, errorText }, null, 2)
      );
      return {
        success: false,
        error: `Erro no upload: ${response.status} - ${errorText}`,
      };
    }

    // Gera URL pública do arquivo
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;

    // eslint-disable-next-line no-console
    console.log(`[backup-storage] Upload successful: ${storagePath} (${fileBuffer.length} bytes)`);

    return {
      success: true,
      filePath: storagePath,
      url: publicUrl,
      size: fileBuffer.length,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[backup-storage] Error uploading backup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido no upload',
    };
  }
}

// ============================================================================
// Download
// ============================================================================

/**
 * Baixa um backup do Firebase Storage
 * @param filePath Caminho do arquivo no storage (ex: backups/abc123/backup-123456.json.gz)
 * @returns Buffer com dados do backup
 */
export async function downloadBackupFromFirebase(
  filePath: string
): Promise<BackupDownloadResult> {
  try {
    // eslint-disable-next-line no-console
    console.log(`[backup-storage] Downloading backup from: ${filePath}`);

    // URL para download
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(filePath)}?alt=media`;

    const response = await fetch(downloadUrl);

    if (!response.ok) {
      const errorText = await response.text();
      // eslint-disable-next-line no-console
      console.error('[backup-storage] Download failed:', response.status, errorText);
      return {
        success: false,
        error: `Erro no download: ${response.status} - ${errorText}`,
      };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // eslint-disable-next-line no-console
    console.log(`[backup-storage] Download successful: ${buffer.length} bytes`);

    return {
      success: true,
      data: buffer,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[backup-storage] Error downloading backup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido no download',
    };
  }
}

/**
 * Gera URL pública para download de um backup
 * @param filePath Caminho do arquivo no storage
 * @returns URL pública para download
 */
export function getBackupDownloadUrl(filePath: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(filePath)}?alt=media`;
}

// ============================================================================
// Delete
// ============================================================================

/**
 * Deleta um backup do Firebase Storage
 * @param filePath Caminho do arquivo no storage
 * @returns Resultado da exclusão
 */
export async function deleteBackupFromFirebase(
  filePath: string
): Promise<BackupDeleteResult> {
  try {
    // eslint-disable-next-line no-console
    console.log(`[backup-storage] Deleting backup: ${filePath}`);

    const deleteUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(filePath)}`;

    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    });

    // 404 é OK (arquivo já foi deletado)
    if (!response.ok && response.status !== 404) {
      const errorText = await response.text();
      // eslint-disable-next-line no-console
      console.error('[backup-storage] Delete failed:', response.status, errorText);
      return {
        success: false,
        error: `Erro ao deletar: ${response.status} - ${errorText}`,
      };
    }

    // eslint-disable-next-line no-console
    console.log(`[backup-storage] Delete successful: ${filePath}`);

    return { success: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[backup-storage] Error deleting backup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao deletar',
    };
  }
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Lista todos os backups de um job específico
 * @param backupId ID do backup
 * @returns Lista de arquivos no diretório do backup
 */
export async function listBackupFiles(backupId: string): Promise<string[]> {
  try {
    const prefix = `${APP_STORAGE_PREFIX}/backups/${backupId}/`;
    const listUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o?prefix=${encodeURIComponent(prefix)}`;

    const response = await fetch(listUrl);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('[backup-storage] List failed:', response.status);
      return [];
    }

    const data = await response.json();
    const items = data.items || [];

    return items.map((item: { name: string }) => item.name);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[backup-storage] Error listing backups:', error);
    return [];
  }
}
