'use client';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  LuUpload, 
  LuX, 
  LuLoader, 
  LuCheck, 
  LuCircleAlert, 
  LuFile, 
  LuImage, 
  LuVideo, 
  LuMusic 
} from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { 
  uploadToFirebaseWithProgress, 
  isVideoFile, 
  isImageFile, 
  formatBytes,
  type UploadProgress 
} from '@/lib/firebase-upload';
import { saveMediaMetadata } from '@/app/admin/media/actions';
import { useConfetti } from '@/lib/hooks/useConfetti';

// Classes de largura para barra de progresso (Tailwind não suporta valores dinâmicos)
const PROGRESS_WIDTH_CLASSES = [
  'w-[0%]', 'w-[5%]', 'w-[10%]', 'w-[15%]', 'w-[20%]',
  'w-[25%]', 'w-[30%]', 'w-[35%]', 'w-[40%]', 'w-[45%]',
  'w-[50%]', 'w-[55%]', 'w-[60%]', 'w-[65%]', 'w-[70%]',
  'w-[75%]', 'w-[80%]', 'w-[85%]', 'w-[90%]', 'w-[95%]', 'w-[100%]',
];

function getProgressClass(value: number): string {
  if (value <= 0) return 'w-[0%]';
  if (value >= 100) return 'w-[100%]';
  const index = Math.min(PROGRESS_WIDTH_CLASSES.length - 1, Math.round(value / 5));
  return PROGRESS_WIDTH_CLASSES[index];
}

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'processing' | 'success' | 'error';
  progress: number;
  error?: string;
  thumbnailFile?: File;
  thumbnailPreview?: string;
}

interface MediaUploaderProps {
  onUploadComplete?: () => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
}

const DEFAULT_MAX_SIZE = 100 * 1024 * 1024; // 100MB

// Tipos de arquivo aceitos pelo WordPress
const DEFAULT_ACCEPTED_TYPES = [
  // Imagens
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'image/bmp', 'image/tiff', 'image/x-icon', 'image/heic', 'image/heif', 'image/avif',
  // Vídeos
  'video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/x-msvideo',
  'video/x-ms-wmv', 'video/x-flv', 'video/ogg', 'video/3gpp', 'video/3gpp2', 'video/x-matroska',
  // Áudio
  'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/x-wav',
  'audio/webm', 'audio/flac', 'audio/aac', 'audio/x-m4a', 'audio/mp4',
  // Documentos
  'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.oasis.opendocument.text', 'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation', 'application/rtf',
  'text/plain', 'text/csv', 'text/xml', 'application/xml', 'application/json',
  // Compactados
  'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed',
  'application/gzip', 'application/x-tar',
];

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return LuImage;
  if (mimeType.startsWith('video/')) return LuVideo;
  if (mimeType.startsWith('audio/')) return LuMusic;
  return LuFile;
}

export function MediaUploader({
  onUploadComplete,
  maxFiles = 10,
  maxSize = DEFAULT_MAX_SIZE,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
}: MediaUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUploadStatus, setCurrentUploadStatus] = useState<string>('');
  const triggerConfetti = useConfetti();

  // Limpar previews ao desmontar
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
        if (f.thumbnailPreview) URL.revokeObjectURL(f.thumbnailPreview);
      });
    };
  }, [files]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadFile[] = acceptedFiles.slice(0, maxFiles - files.length).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        preview: isImageFile(file) ? URL.createObjectURL(file) : '',
        status: 'pending' as const,
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files.length, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles || isUploading,
  });

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      if (file?.thumbnailPreview) URL.revokeObjectURL(file.thumbnailPreview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  // Handler para selecionar thumbnail de vídeo
  const handleThumbnailSelect = useCallback((fileId: string, thumbnailFile: File | undefined) => {
    if (!thumbnailFile) {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === fileId) {
            if (f.thumbnailPreview) URL.revokeObjectURL(f.thumbnailPreview);
            return { ...f, thumbnailFile: undefined, thumbnailPreview: undefined };
          }
          return f;
        })
      );
      return;
    }

    if (!thumbnailFile.type.startsWith('image/')) {
      return;
    }

    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === fileId) {
          if (f.thumbnailPreview) URL.revokeObjectURL(f.thumbnailPreview);
          return {
            ...f,
            thumbnailFile,
            thumbnailPreview: URL.createObjectURL(thumbnailFile),
          };
        }
        return f;
      })
    );
  }, []);

  const uploadAllFiles = useCallback(async () => {
    const pendingFiles = files.filter((f) => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    setIsUploading(true);
    let hasSuccess = false;

    for (const uploadFile of pendingFiles) {
      try {
        // Atualizar status para uploading
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: 'uploading' as const, progress: 0 } : f
          )
        );
        setCurrentUploadStatus('Enviando arquivo...');

        // Upload do arquivo principal com progresso
        const result = await uploadToFirebaseWithProgress(
          uploadFile.file,
          'media',
          (progress: UploadProgress) => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadFile.id
                  ? { ...f, progress: progress.progress, status: progress.status === 'complete' ? 'processing' : 'uploading' }
                  : f
              )
            );
            
            if (progress.status === 'processing') {
              setCurrentUploadStatus('Processando...');
            }
          }
        );

        // Upload da thumbnail se existir
        let thumbnailUrl: string | undefined;
        if (uploadFile.thumbnailFile) {
          setCurrentUploadStatus('Enviando thumbnail...');
          const thumbnailResult = await uploadToFirebaseWithProgress(
            uploadFile.thumbnailFile,
            'thumbnails'
          );
          thumbnailUrl = thumbnailResult.downloadURL;

          // Salvar thumbnail como MediaAsset separado
          setCurrentUploadStatus('Salvando thumbnail...');
          await saveMediaMetadata({
            originalFilename: `thumb-${uploadFile.file.name}`,
            firebaseUrl: thumbnailUrl,
            mimeType: uploadFile.thumbnailFile.type,
            fileSize: uploadFile.thumbnailFile.size,
          });
        }

        // Salvar metadata do vídeo/arquivo principal no banco
        setCurrentUploadStatus('Salvando informações...');
        const saveResult = await saveMediaMetadata({
          originalFilename: uploadFile.file.name,
          firebaseUrl: result.downloadURL,
          mimeType: uploadFile.file.type,
          fileSize: uploadFile.file.size,
          thumbnailUrl,
        });

        if (saveResult.status === 'success') {
          hasSuccess = true;
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id ? { ...f, status: 'success' as const, progress: 100 } : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, status: 'error' as const, error: saveResult.error as string }
                : f
            )
          );
        }
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: 'error' as const, error: error instanceof Error ? error.message : 'Erro no upload' }
              : f
          )
        );
      }
    }

    setIsUploading(false);
    setCurrentUploadStatus('');

    if (hasSuccess) {
      triggerConfetti();
    }

    onUploadComplete?.();
  }, [files, onUploadComplete, triggerConfetti]);

  const clearCompleted = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.status === 'success') {
          if (f.preview) URL.revokeObjectURL(f.preview);
          if (f.thumbnailPreview) URL.revokeObjectURL(f.thumbnailPreview);
        }
      });
      return prev.filter((f) => f.status !== 'success');
    });
  }, []);

  const pendingCount = files.filter((f) => f.status === 'pending').length;
  const uploadingFile = files.find((f) => f.status === 'uploading' || f.status === 'processing');
  const successCount = files.filter((f) => f.status === 'success').length;
  const errorCount = files.filter((f) => f.status === 'error').length;
  const resetAllFiles = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
        if (f.thumbnailPreview) URL.revokeObjectURL(f.thumbnailPreview);
      });
      return [];
    });
  }, []);

  return (
    <div className="flex h-full flex-col space-y-5">
      <AnimatedBorder className="rounded-xl" />
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200',
          // Light mode
          'bg-gradient-to-b from-white to-slate-50 border-gray-200 text-gray-900',
          'hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 hover:shadow-lg hover:shadow-[var(--primary)]/10',
          // Dark mode
          'dark:from-slate-800/80 dark:to-slate-800/40 dark:border-slate-600 dark:text-slate-100',
          'dark:hover:border-[var(--primary)] dark:hover:bg-[var(--primary)]/10 dark:hover:shadow-[var(--primary)]/10',
          isDragActive && 'border-[var(--primary)] bg-[var(--primary)]/10 scale-[1.02]',
          isDragReject && 'border-red-500 bg-red-500/10 dark:border-red-500 dark:bg-red-500/10',
          (files.length >= maxFiles || isUploading) && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} aria-label="Upload de arquivos" />
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            'p-4 rounded-full transition-colors',
            isDragActive ? 'bg-[var(--primary)]/15' : 'bg-slate-200 dark:bg-slate-700/50'
          )}>
            <LuUpload className={cn(
              'h-8 w-8 transition-colors',
              isDragActive ? 'text-[var(--primary)]' : 'text-slate-500 dark:text-slate-400'
            )} />
          </div>
          {isDragActive ? (
            <p className="text-[var(--primary)] font-medium text-lg">Solte os arquivos aqui...</p>
          ) : isDragReject ? (
            <p className="text-red-400 font-medium text-lg">Tipo de arquivo não aceito</p>
          ) : (
            <>
              <p className="text-gray-700 dark:text-slate-200 font-medium text-base">
                Arraste arquivos aqui ou clique para selecionar
              </p>
              <p className="text-gray-500 dark:text-slate-500 text-sm">
                Imagens, vídeos, áudios, documentos até {formatBytes(maxSize)}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Lista de arquivos / conteúdo scrollável */}
      {files.length > 0 && (
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Arquivos ({files.length})
            </h4>
            <div className="flex gap-2">
              {successCount > 0 && (
                <button
                  type="button"
                  onClick={clearCompleted}
                  className="text-xs text-gray-600 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  Limpar concluídos
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {files.map((uploadFile) => {
              const Icon = getFileIcon(uploadFile.file.type);
              const isVideo = isVideoFile(uploadFile.file);
              const isCurrentlyUploading = uploadFile.status === 'uploading' || uploadFile.status === 'processing';

              return (
                <div
                  key={uploadFile.id}
                  className={cn(
                    'p-4 rounded-lg transition-colors',
                    'bg-white border border-gray-200 text-gray-900',
                    'dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50',
                    uploadFile.status === 'error' && 'border-red-300 bg-red-50/70 dark:border-red-500/50 dark:bg-red-950/20',
                    uploadFile.status === 'success' && 'border-green-300 bg-green-50/70 dark:border-green-500/50 dark:bg-green-950/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Preview */}
                    <div className="w-14 h-14 rounded bg-gray-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {uploadFile.preview ? (
                        <img
                          src={uploadFile.preview}
                          alt={uploadFile.file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="h-7 w-7 text-gray-500 dark:text-slate-400" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">
                        {uploadFile.file.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-slate-400">
                        {formatBytes(uploadFile.file.size)}
                      </p>
                      {uploadFile.error && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">{uploadFile.error}</p>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex-shrink-0">
                      {uploadFile.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => removeFile(uploadFile.id)}
                          className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                          title="Remover arquivo"
                          aria-label="Remover arquivo"
                        >
                          <LuX className="h-5 w-5" />
                        </button>
                      )}
                      {isCurrentlyUploading && (
                        <LuLoader className="h-5 w-5 animate-spin text-blue-400" />
                      )}
                      {uploadFile.status === 'success' && (
                        <LuCheck className="h-5 w-5 text-green-400" />
                      )}
                      {uploadFile.status === 'error' && (
                        <LuCircleAlert className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>

                  {/* Barra de progresso */}
                  {isCurrentlyUploading && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{currentUploadStatus || 'Enviando...'}</span>
                        <span>{Math.round(uploadFile.progress)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={cn(
                            'bg-blue-500 h-2 rounded-full transition-all duration-300',
                            getProgressClass(uploadFile.progress)
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Upload de Thumbnail para vídeos */}
                  {isVideo && uploadFile.status === 'pending' && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-2 mb-2">
                        <LuImage className="h-4 w-4" />
                        Thumbnail do Vídeo (Opcional)
                      </label>
                      <p className="text-xs text-slate-500 mb-3">
                        Faça upload de uma imagem para ser usada como capa do vídeo
                      </p>

                      <input
                        id={`thumbnail-${uploadFile.id}`}
                        type="file"
                        className="hidden"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleThumbnailSelect(uploadFile.id, e.target.files?.[0])}
                        aria-label="Selecionar thumbnail do vídeo"
                        title="Selecionar thumbnail do vídeo"
                      />

                      <div
                        onClick={() => document.getElementById(`thumbnail-${uploadFile.id}`)?.click()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            document.getElementById(`thumbnail-${uploadFile.id}`)?.click();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors border-slate-600 hover:border-blue-500 bg-slate-900/50"
                      >
                        {uploadFile.thumbnailPreview ? (
                          <div className="space-y-2">
                            <div className="relative w-full aspect-video bg-slate-900 rounded-lg overflow-hidden max-w-xs mx-auto">
                              <img
                                src={uploadFile.thumbnailPreview}
                                alt="Preview do thumbnail"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <div className="bg-green-500 text-white rounded-full p-1">
                                  <LuImage className="h-3 w-3" />
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-green-400 font-medium">
                              ✓ Thumbnail selecionado
                            </p>
                          </div>
                        ) : (
                          <>
                            <LuImage className="h-6 w-6 mx-auto mb-2 text-slate-500" />
                            <p className="text-xs text-slate-400">
                              Clique para selecionar uma imagem
                            </p>
                            <p className="text-xs text-slate-500">PNG, JPG ou WEBP</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Barra de progresso global durante upload */}
          {uploadingFile && (
            <div className="p-4 bg-slate-800/80 rounded-lg border border-blue-500/30">
              <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                <LuLoader className="h-4 w-4 animate-spin text-blue-400" />
                <span>{currentUploadStatus || 'Enviando...'}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Progresso</span>
                <span>{Math.round(uploadingFile.progress)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className={cn(
                    'bg-blue-500 h-2.5 rounded-full transition-all duration-300',
                    getProgressClass(uploadingFile.progress)
                  )}
                />
              </div>
            </div>
          )}

          {/* Resumo */}
          {(successCount > 0 || errorCount > 0) && (
            <div className="flex gap-4 text-xs text-slate-400">
              {successCount > 0 && (
                <span className="text-green-400">{successCount} concluído(s)</span>
              )}
              {errorCount > 0 && (
                <span className="text-red-400">{errorCount} com erro</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* CTA Upload alinhado ao padrão dos modais, fixo no rodapé do modal */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-3">
        <button
          type="button"
          onClick={resetAllFiles}
          disabled={files.length === 0 || isUploading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Limpar
        </button>
        <button
          type="button"
          onClick={uploadAllFiles}
          disabled={pendingCount === 0 || isUploading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary,#2563eb)] hover:bg-[var(--primary-hover,#1d4ed8)] text-white font-semibold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Fazer upload ({pendingCount} arquivo{pendingCount !== 1 ? 's' : ''})
        </button>
      </div>
    </div>
  );
}
