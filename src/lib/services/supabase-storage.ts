import { createClient } from '@/lib/supabase/client';

/**
 * Serviço de armazenamento do Supabase
 */
export async function uploadToSupabaseStorage(
  file: File,
  bucket: string = 'avatars',
  folder: string = 'media'
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const supabase = createClient();
    
    // Gerar nome único
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('[SupabaseStorage] Upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrl
    };
  } catch (error: any) {
    console.error('[SupabaseStorage] Unexpected error:', error);
    return { success: false, error: error.message || 'Erro inesperado no upload' };
  }
}

/**
 * Remove um arquivo do Supabase Storage baseado na URL
 */
export async function deleteFromSupabaseStorage(url: string, bucket: string = 'avatars') {
  try {
    const supabase = createClient();
    
    // Extrair o path da URL do Supabase
    // URL típica: https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[folder]/[file]
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/storage/v1/object/public/${bucket}/`);
    
    if (pathParts.length < 2) return { success: false, error: 'URL inválida para remoção' };
    
    const filePath = pathParts[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error('[SupabaseStorage] Delete error:', error);
    return { success: false, error: error.message };
  }
}
