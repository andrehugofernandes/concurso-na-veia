'use server';

import { createClient } from '@/lib/supabase/server';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

const BUCKET_NAME = 'petropbras-quest';
const STORAGE_PATH_PREFIX = 'avatars';

/**
 * Faz upload de um arquivo para o Supabase Storage
 * 
 * @param fileBuffer - Buffer do arquivo
 * @param fileName - Nome do arquivo
 * @param mimeType - Tipo MIME do arquivo
 * @returns URL pública do arquivo ou erro
 */
export async function uploadToSupabaseStorage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<UploadResult> {
  try {
    const supabase = await createClient();
    
    // Gera nome único com timestamp para evitar cache e conflitos
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${STORAGE_PATH_PREFIX}/${timestamp}-${sanitizedFileName}`;
    
    // eslint-disable-next-line no-console
    console.log('[uploadToSupabaseStorage] Uploading to:', storagePath);
    
    // Upload para o Supabase
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: true
      });
    
    if (uploadError) {
      // eslint-disable-next-line no-console
      console.error('[uploadToSupabaseStorage] Upload failed:', uploadError);
      return {
        success: false,
        error: `Erro no upload: ${uploadError.message}`,
      };
    }
    
    // Gera URL pública do arquivo
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);
    
    // eslint-disable-next-line no-console
    console.log('[uploadToSupabaseStorage] Upload successful:', publicUrl);
    
    return {
      success: true,
      url: publicUrl,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[uploadToSupabaseStorage] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido no upload',
    };
  }
}

/**
 * Deleta um arquivo do Supabase Storage
 * @param fileUrl - URL pública do arquivo
 */
export async function deleteFromSupabaseStorage(fileUrl: string): Promise<UploadResult> {
  try {
    const supabase = await createClient();
    
    // Extrai o path do arquivo da URL do Supabase
    // URL format: https://[PROJECT_ID].supabase.co/storage/v1/object/public/BUCKET/PATH
    const urlParts = fileUrl.split(`/public/${BUCKET_NAME}/`);
    if (urlParts.length < 2) {
      return {
        success: false,
        error: 'URL inválida - não foi possível extrair o path do arquivo',
      };
    }
    
    const filePath = urlParts[1];
    
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);
    
    if (deleteError) {
      return {
        success: false,
        error: `Erro ao deletar: ${deleteError.message}`,
      };
    }
    
    return { success: true };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[deleteFromSupabaseStorage] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao deletar arquivo',
    };
  }
}

/**
 * Uploads a podcast audio to Supabase Storage.
 * @param fileBuffer - Buffer do arquivo de áudio (wav)
 * @param materia - Nome da matéria
 * @param aulaId - ID da aula
 * @param modulo - Número do módulo
 * @param mimeType - audio/wav
 * @returns Public URL of the uploaded podcast
 */
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function createAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nqqyetymjvgstsbsxdkq.supabase.co';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    return createSupabaseClient(supabaseUrl, serviceKey);
  }
  return null;
}

export async function uploadPodcastToSupabaseStorage(
  fileBuffer: Buffer,
  materia: string,
  aulaId: string,
  modulo: number | string,
  mimeType: string = 'audio/wav'
): Promise<UploadResult> {
  try {
    const adminSupabase = createAdminSupabaseClient();
    const supabase = adminSupabase || (await createClient());
    
    // Normaliza a string da matéria para usar como pasta
    const materiaFolder = materia
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // remove acentos
      .replace(/[^a-z0-9]/g, '-');
      
    const storagePath = `podcasts/${materiaFolder}/${aulaId}/modulo-${modulo}.wav`;
    
    console.log('[uploadPodcast] Uploading to:', storagePath);
    
    const { data, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: true
      });
    
    if (uploadError) {
      console.error('[uploadPodcast] Upload failed:', uploadError);
      return { success: false, error: uploadError.message };
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);
      
    console.log('[uploadPodcast] Upload successful:', publicUrl);
    
    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('[uploadPodcast] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}
