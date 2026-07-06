'use server';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// Configuração do Firebase Storage (usa variáveis de ambiente do client SDK)
const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'passei-no-concurso-b33e0.firebasestorage.app';

// Prefixo do app para isolamento de dados no Storage compartilhado
// Cada app dentro de pmjg-apps-dev tem seu próprio prefixo
const APP_STORAGE_PREFIX = 'wp2next';

/**
 * Faz upload de um arquivo para o Firebase Storage usando a API REST
 * Esta implementação usa acesso público (não autenticado) ao bucket
 * 
 * @param fileBuffer - Buffer do arquivo
 * @param fileName - Nome do arquivo (será prefixado com timestamp)
 * @param mimeType - Tipo MIME do arquivo
 * @returns URL pública do arquivo ou erro
 */
export async function uploadToFirebaseStorage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<UploadResult> {
  try {
    // Gera nome único com timestamp
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${APP_STORAGE_PREFIX}/media/${timestamp}-${sanitizedFileName}`;
    
    // URL da API REST do Firebase Storage para upload
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o?uploadType=media&name=${encodeURIComponent(storagePath)}`;
    
    // eslint-disable-next-line no-console
    console.log('[uploadToFirebaseStorage] Uploading to:', storagePath);
    
    // Upload via API REST (converte Buffer para Uint8Array para compatibilidade)
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': mimeType,
      },
      body: new Uint8Array(fileBuffer),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      // eslint-disable-next-line no-console
      console.error('[uploadToFirebaseStorage] Upload failed:', response.status, errorText);
      return {
        success: false,
        error: `Erro no upload: ${response.status} - ${errorText}`,
      };
    }
    
    // Gera URL pública do arquivo
    // Formato: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/PATH?alt=media
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;
    
    // eslint-disable-next-line no-console
    console.log('[uploadToFirebaseStorage] Upload successful:', publicUrl);
    
    return {
      success: true,
      url: publicUrl,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[uploadToFirebaseStorage] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido no upload',
    };
  }
}

/**
 * Faz upload de um arquivo a partir de um data URL (base64)
 * @param dataUrl - Data URL no formato data:mime;base64,content
 * @param fileName - Nome do arquivo
 * @returns URL pública do arquivo ou erro
 */
export async function uploadDataUrlToFirebaseStorage(
  dataUrl: string,
  fileName: string
): Promise<UploadResult> {
  try {
    // Extrai mime type e conteúdo base64
    const match = dataUrl.match(/^data:(.+);base64,(.*)$/);
    if (!match) {
      return {
        success: false,
        error: 'Data URL inválida',
      };
    }
    
    const mimeType = match[1];
    const base64Content = match[2];
    
    // Converte base64 para Buffer
    const fileBuffer = Buffer.from(base64Content, 'base64');
    
    return uploadToFirebaseStorage(fileBuffer, fileName, mimeType);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[uploadDataUrlToFirebaseStorage] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao processar data URL',
    };
  }
}

/**
 * Deleta um arquivo do Firebase Storage usando a API REST
 * @param fileUrl - URL pública do arquivo
 */
export async function deleteFromFirebaseStorage(fileUrl: string): Promise<UploadResult> {
  try {
    // Extrai o path do arquivo da URL
    // URL format: https://firebasestorage.googleapis.com/v0/b/BUCKET/o/PATH?alt=media
    const urlMatch = fileUrl.match(/\/o\/([^?]+)/);
    if (!urlMatch) {
      return {
        success: false,
        error: 'URL inválida - não foi possível extrair o path do arquivo',
      };
    }
    
    const filePath = decodeURIComponent(urlMatch[1]);
    const deleteUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(filePath)}`;
    
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    });
    
    if (!response.ok && response.status !== 404) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Erro ao deletar: ${response.status} - ${errorText}`,
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('[deleteFromFirebaseStorage] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar arquivo',
    };
  }
}

/**
 * Faz upload do áudio de um podcast para o Firebase Storage
 */
export async function uploadPodcastToFirebaseStorage(
  fileBuffer: Buffer,
  materia: string,
  aulaId: string,
  moduloNumero: number
): Promise<UploadResult> {
  try {
    const materiaFolder = materia
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-');
    
    const storagePath = `podcasts/${materiaFolder}/${aulaId}/modulo-${moduloNumero}.wav`;
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o?uploadType=media&name=${encodeURIComponent(storagePath)}`;

    console.log('[uploadPodcastToFirebaseStorage] Enviando podcast para:', storagePath);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'audio/wav',
      },
      body: new Uint8Array(fileBuffer),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[uploadPodcastToFirebaseStorage] Falha no upload:', response.status, errorText);
      return {
        success: false,
        error: `Erro no upload: ${response.status} - ${errorText}`,
      };
    }

    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;
    console.log('[uploadPodcastToFirebaseStorage] Podcast armazenado com sucesso:', publicUrl);

    return {
      success: true,
      url: publicUrl,
    };
  } catch (error) {
    console.error('[uploadPodcastToFirebaseStorage] Erro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro no upload do podcast',
    };
  }
}

/**
 * Obtém a URL pública do podcast no Firebase Storage e verifica se ele existe
 */
export async function getPodcastFirebaseUrl(
  materia: string,
  aulaId: string,
  moduloNumero: number
): Promise<string | null> {
  try {
    const materiaFolder = materia
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-');
    
    const storagePath = `podcasts/${materiaFolder}/${aulaId}/modulo-${moduloNumero}.wav`;
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(storagePath)}?alt=media`;

    const res = await fetch(publicUrl, { method: 'HEAD' });
    if (res.ok) {
      return publicUrl;
    }
  } catch (e) {
    // Não encontrado
  }
  return null;
}

