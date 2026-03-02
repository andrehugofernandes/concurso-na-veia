'use client';

import { useState, useRef } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  onImageRemove?: () => void;
  preview?: string | null;
  fileName?: string;
  disabled?: boolean;
  /** URL da imagem existente (para edição) */
  existingImageUrl?: string | null;
}

export function ImageUpload({
  onImageSelect,
  onImageRemove,
  preview,
  fileName,
  disabled = false,
  existingImageUrl,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, selecione uma imagem válida (PNG, JPG, GIF ou WebP)');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('A imagem deve ter no máximo 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClearPreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemove?.();
  };

  // Determinar qual imagem mostrar: preview (nova) ou existente
  const displayImage = preview || existingImageUrl;
  const hasNewImage = !!preview;

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        name="featuredImage"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload featured image"
        disabled={disabled}
      />

      {!displayImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`w-full px-6 py-12 border-2 border-dashed rounded-lg transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-slate-800 ${
            isDragging
              ? 'border-blue-500 bg-blue-100 dark:bg-blue-950/30'
              : 'border-gray-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaUpload className="w-8 h-8 text-gray-400 dark:text-slate-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
              Arraste a imagem aqui ou clique para selecionar
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
              PNG, JPG, GIF ou WebP (máximo 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div
          className="relative group cursor-pointer"
          onClick={() => !disabled && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img
            src={displayImage}
            alt="Preview da imagem de destaque"
            className={`w-full h-auto rounded-lg border transition-all ${
              isDragging
                ? 'border-blue-500 opacity-70'
                : 'border-gray-200 dark:border-slate-700 group-hover:border-blue-500 group-hover:opacity-90'
            }`}
          />
          {/* Overlay com instrução de troca */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
            <div className="text-center text-white">
              <FaUpload className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Clique para trocar</p>
            </div>
          </div>
          {/* Botão de remover */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearPreview();
            }}
            disabled={disabled}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            aria-label="Remover imagem"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          {/* Indicador de imagem existente vs nova */}
          {!hasNewImage && existingImageUrl && (
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-gray-800/80 dark:bg-slate-800/80 text-xs text-gray-200 dark:text-slate-300 rounded">
              📷 Imagem atual
            </div>
          )}
          {fileName && (
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 truncate">
              📁 {fileName}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
