import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase-client';

// Prefixo do app para isolamento de dados no Storage compartilhado
// Cada app dentro de pmjg-apps-dev tem seu próprio prefixo
const APP_STORAGE_PREFIX = 'wp2next';

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number; // 0-100
  status: 'preparing' | 'uploading' | 'processing' | 'complete' | 'error';
}

export interface UploadResult {
  downloadURL: string;
  fullPath: string;
  size: number;
}

/**
 * Faz upload de um arquivo para o Firebase Storage com progresso
 * @param file - Arquivo a ser enviado
 * @param folder - Pasta no Storage (padrão: 'media')
 * @param onProgress - Callback para acompanhar progresso
 * @returns Promise com URL de download e informações do arquivo
 */
export async function uploadToFirebaseWithProgress(
  file: File,
  folder: string = 'media',
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  // Notificar início
  onProgress?.({
    bytesTransferred: 0,
    totalBytes: file.size,
    progress: 0,
    status: 'preparing',
  });

  // Gerar nome único com timestamp
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^\w\-. ]+/g, '_');
  const fileName = `${timestamp}_${safeName}`;
  
  // Criar referência no Firebase Storage com prefixo do app
  const storagePath = `${APP_STORAGE_PREFIX}/${folder}/${fileName}`;
  const storageRef = ref(storage, storagePath);
  
  // Criar task de upload com metadata
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
    customMetadata: {
      originalName: file.name,
      uploadedAt: new Date().toISOString(),
    },
  });
  
  return new Promise<UploadResult>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calcular progresso
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        // Chamar callback de progresso
        onProgress?.({
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
          progress,
          status: 'uploading',
        });
      },
      (error) => {
        // Tratar erros específicos do Firebase
        // eslint-disable-next-line no-console
        console.error('[uploadToFirebase] Error:', error);
        
        let errorMessage = 'Erro ao fazer upload';
        
        switch (error.code) {
          case 'storage/unauthorized':
            errorMessage = 'Sem permissão para fazer upload';
            break;
          case 'storage/canceled':
            errorMessage = 'Upload cancelado';
            break;
          case 'storage/quota-exceeded':
            errorMessage = 'Cota de armazenamento excedida';
            break;
          case 'storage/unknown':
            errorMessage = 'Erro desconhecido no upload';
            break;
        }
        
        onProgress?.({
          bytesTransferred: 0,
          totalBytes: file.size,
          progress: 0,
          status: 'error',
        });
        
        reject(new Error(errorMessage));
      },
      async () => {
        // Upload completo - obter URL de download
        try {
          onProgress?.({
            bytesTransferred: file.size,
            totalBytes: file.size,
            progress: 100,
            status: 'processing',
          });

          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          onProgress?.({
            bytesTransferred: file.size,
            totalBytes: file.size,
            progress: 100,
            status: 'complete',
          });

          resolve({
            downloadURL,
            fullPath: uploadTask.snapshot.ref.fullPath,
            size: uploadTask.snapshot.totalBytes,
          });
        } catch {
          reject(new Error('Erro ao obter URL de download'));
        }
      }
    );
  });
}

/**
 * Verifica se um arquivo é um vídeo
 */
export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video/');
}

/**
 * Verifica se um arquivo é uma imagem
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Verifica se um arquivo é um áudio
 */
export function isAudioFile(file: File): boolean {
  return file.type.startsWith('audio/');
}

/**
 * Verifica se um arquivo é um documento
 */
export function isDocumentFile(file: File): boolean {
  const documentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'application/xml',
    'text/xml',
    'application/json',
  ];
  return documentTypes.includes(file.type);
}

/**
 * Formata bytes para exibição legível
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}
