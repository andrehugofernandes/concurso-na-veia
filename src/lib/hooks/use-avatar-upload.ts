'use client';

import { useState } from 'react';

interface UploadResult {
  success: boolean;
  error?: string;
  url?: string;
}

export function useAvatarUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (file: File): Promise<UploadResult> => {
    try {
      setError(null);
      setUploading(true);

      // 1. Upload para Firebase Storage via client-side
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || 'Erro ao fazer upload');
      }

      const uploadData = await uploadRes.json();
      const avatarUrl = uploadData.url;

      // 2. Atualizar URL no banco de dados
      const updateRes = await fetch('/api/auth/avatar', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl }),
      });

      if (!updateRes.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      setUploading(false);
      return { success: true, url: avatarUrl };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setUploading(false);
      return { success: false, error: errorMessage };
    }
  };

  return {
    uploadAvatar,
    uploading,
    error,
  };
}
