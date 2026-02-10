'use client';

import { useState, useRef, DragEvent } from 'react';
import { Upload, Image as ImageIcon, User } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<{ success: boolean; error?: string }>;
  currentAvatarUrl?: string | null;
}

export function AvatarUploadModal({
  isOpen,
  onClose,
  onUpload,
  currentAvatarUrl
}: AvatarUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setError(null);

    // Validar tipo
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Tipo de arquivo não suportado. Use JPG, PNG ou WebP');
      return;
    }

    // Validar tamanho (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Arquivo muito grande. Tamanho máximo: 2MB');
      return;
    }

    setSelectedFile(file);

    // Criar preview (apenas no browser)
    if (typeof window !== 'undefined' && typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    const result = await onUpload(selectedFile);

    if (result.success) {
      onClose();
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      setError(result.error || 'Erro ao fazer upload');
    }

    setUploading(false);
  };

  const handleClose = () => {
    if (!uploading) {
      onClose();
      setSelectedFile(null);
      setPreviewUrl(null);
      setError(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent hideClose side="right" className="w-full sm:max-w-md overflow-y-auto p-0 bg-white dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:via-[#151515] dark:to-[#101010] text-foreground">
        {/* Header */}
        <div className="flex items-center justify-between w-full p-6 relative bg-[var(--primary)] text-white">
          <div className="flex items-center space-x-3">
            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-white/20">
              <User className="h-4 w-4 text-white" />
            </Badge>
            <SheetTitle className="text-lg font-semibold text-white">
              Alterar Foto de Perfil
            </SheetTitle>
          </div>
          <button
            onClick={handleClose}
            disabled={uploading}
            className="absolute right-6 top-6 text-white hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[var(--primary)] rounded"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Preview */}
          {(previewUrl || currentAvatarUrl) && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700">
                <Image
                  src={previewUrl || currentAvatarUrl || ''}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Área para selecionar ou arrastar arquivo"
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
              aria-label="Selecionar arquivo de imagem"
              className="hidden"
              disabled={uploading}
            />

            <div className="flex flex-col items-center gap-2">
              {selectedFile ? (
                <>
                  <ImageIcon size={48} className="text-green-500" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </>
              ) : (
                <>
                  <Upload size={48} className="text-gray-400" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Arraste uma imagem ou clique para selecionar
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    JPG, PNG ou WebP (máx. 2MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
            >
              {uploading ? 'Enviando...' : 'Salvar Foto'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
