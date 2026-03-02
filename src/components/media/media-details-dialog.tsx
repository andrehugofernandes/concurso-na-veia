'use client';

import { useState, useActionState, useCallback, useEffect } from 'react';
import { LuSave, LuLoader, LuCopy, LuCheck, LuExternalLink, LuImage, LuFile, LuVideo, LuMusic, LuStar } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { updateMediaMeta, getMediaDetails } from '@/app/admin/media/actions';
import type { MediaAsset } from '@/app/admin/media/actions';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { ModalHeader } from '@/components/ui/modal-header';
import { AnimatedInput, AnimatedTextarea } from '@/components/ui/animated-input';

function getMediaBadge(mimeType: string): { label: string; color: string } {
  if (mimeType.startsWith('image/')) {
    const ext = mimeType.split('/')[1].toUpperCase();
    return { label: ext, color: 'bg-purple-600' };
  }
  if (mimeType.startsWith('video/')) {
    return { label: 'VÍDEO', color: 'bg-red-600' };
  }
  if (mimeType.startsWith('audio/')) {
    return { label: 'ÁUDIO', color: 'bg-blue-600' };
  }
  if (mimeType === 'application/pdf') {
    return { label: 'PDF', color: 'bg-red-700' };
  }
  if (mimeType.includes('word') || mimeType.includes('document')) {
    return { label: 'DOCX', color: 'bg-blue-700' };
  }
  if (mimeType.includes('sheet') || mimeType.includes('excel')) {
    return { label: 'XLSX', color: 'bg-green-700' };
  }
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    return { label: 'PPTX', color: 'bg-orange-700' };
  }
  if (mimeType === 'text/plain' || mimeType === 'text/csv') {
    return { label: 'TXT', color: 'bg-gray-600' };
  }
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z')) {
    return { label: 'ZIP', color: 'bg-yellow-700' };
  }
  return { label: 'ARQUIVO', color: 'bg-slate-600' };
}

interface MediaDetailsDialogProps {
  media: MediaAsset;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

type UpdateState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
};

const initialState: UpdateState = { status: 'idle' };

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

function getMediaIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return LuImage;
  if (mimeType.startsWith('video/')) return LuVideo;
  if (mimeType.startsWith('audio/')) return LuMusic;
  return LuFile;
}

export function MediaDetailsDialog({
  media,
  isOpen,
  onClose,
  onUpdate,
}: MediaDetailsDialogProps) {
  const [altText, setAltText] = useState(media.altText || '');
  const [filename, setFilename] = useState(media.originalFilename);
  const [copied, setCopied] = useState(false);
  const [copiedPostUrl, setCopiedPostUrl] = useState(false);
  const [relatedContent, setRelatedContent] = useState<{
    id: number;
    title: string;
    slug: string;
    type: string;
    usage: 'featured' | 'embedded';
  } | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Buscar detalhes da mídia (incluindo conteúdo associado)
  useEffect(() => {
    async function fetchDetails() {
      // Se já temos relatedContent do media prop, usar direto
      if (media.relatedContent) {
        setRelatedContent(media.relatedContent);
        return;
      }

      // Caso contrário, buscar do servidor
      setLoadingDetails(true);
      try {
        const result = await getMediaDetails(media.id);
        if (result.status === 'success' && result.data?.media.relatedContent) {
          setRelatedContent(result.data.media.relatedContent);
        } else {
          setRelatedContent(null);
        }
      } catch {
        setRelatedContent(null);
      } finally {
        setLoadingDetails(false);
      }
    }
    if (isOpen) {
      fetchDetails();
    }
  }, [media.id, media.relatedContent, isOpen]);

  const updateAction = useCallback(
    async (_prevState: UpdateState, formData: FormData): Promise<UpdateState> => {
      const newAltText = formData.get('altText') as string;
      const newFilename = formData.get('filename') as string;

      const result = await updateMediaMeta({
        id: media.id,
        altText: newAltText,
        originalFilename: newFilename,
      });

      if (result.status === 'error') {
        return { status: 'error', message: result.error as string };
      }

      onUpdate?.();
      
      // Mostrar mensagem com quantidade de posts atualizados
      const updatedPosts = result.data?.updatedPosts ?? 0;
      const message = updatedPosts > 0
        ? `Metadados atualizados com sucesso! ${updatedPosts} postagem(ns) atualizada(s).`
        : 'Metadados atualizados com sucesso';
      
      return { status: 'success', message };
    },
    [media.id, onUpdate]
  );

  const [state, formAction, isPending] = useActionState(updateAction, initialState);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(media.firebaseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Erro ao copiar URL');
    }
  }, [media.firebaseUrl]);

  const copyPostUrlToClipboard = useCallback(async () => {
    if (!relatedContent) return;
    const postUrl = `/${relatedContent.type === 'page' ? '' : 'posts/'}${relatedContent.slug}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopiedPostUrl(true);
      setTimeout(() => setCopiedPostUrl(false), 2000);
    } catch {
      // eslint-disable-next-line no-console
      console.error('Erro ao copiar URL da postagem');
    }
  }, [relatedContent]);

  const getPostUrl = useCallback(() => {
    if (!relatedContent) return '';
    return `/${relatedContent.type === 'page' ? '' : 'posts/'}${relatedContent.slug}`;
  }, [relatedContent]);

  const isImage = media.mimeType.startsWith('image/');
  const isVideo = media.mimeType.startsWith('video/');
  const Icon = getMediaIcon(media.mimeType);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!fixed !right-4 !top-4 !bottom-4 !left-auto !translate-x-0 !translate-y-0 !m-0 w-full max-w-md h-[calc(100vh-2rem)] max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right">
        <AnimatedBorder className="rounded-xl" />
        <ModalHeader
          icon={<Icon className="h-6 w-6" />}
          title="Detalhes da Mídia"
          description="Visualize e edite os metadados da mídia selecionada"
          onClose={onClose}
        />

        <div className="flex-1 overflow-hidden px-6 py-6 flex flex-col">
          <div className="grid grid-cols-1 gap-6 h-full overflow-y-auto pr-1">
          {/* Preview */}
          <div className="space-y-4">
            <div className="relative aspect-[3/2] max-w-[75%] mx-auto rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center">
              {isImage || (isVideo && media.thumbnailUrl) ? (
                <>
                  <img
                    src={media.thumbnailUrl || media.firebaseUrl}
                    alt={media.altText || media.originalFilename}
                    loading="lazy"
                    decoding="async"
                    className="object-contain w-full h-full"
                  />
                  {(() => {
                    const badge = getMediaBadge(media.mimeType);
                    return (
                      <div className={cn('absolute bottom-2 right-2 rounded px-3 py-1.5 flex items-center gap-1 text-xs text-white font-medium', badge.color)}>
                        <span>{badge.label}</span>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <Icon className="h-16 w-16 mb-2" />
                  <span className="text-sm">{media.mimeType}</span>
                  {(() => {
                    const badge = getMediaBadge(media.mimeType);
                    return (
                      <div className={cn('absolute bottom-2 right-2 rounded px-3 py-1.5 flex items-center gap-1 text-xs text-white font-medium', badge.color)}>
                        <span>{badge.label}</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* URL do arquivo */}
            <div className="space-y-2">
              <label htmlFor="media-url" className="text-sm font-medium text-gray-700 dark:text-slate-300">URL do arquivo</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="media-url"
                  value={media.firebaseUrl}
                  readOnly
                  aria-label="URL do arquivo"
                  className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300
                   dark:border-slate-700 text-gray-900 dark:text-slate-100 text-sm truncate"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 transition-colors"
                  title="Copiar URL"
                >
                  {copied ? (
                    <LuCheck className="h-4 w-4 text-green-400" />
                  ) : (
                    <LuCopy className="h-4 w-4" />
                  )}
                </button>
                <a
                  href={media.firebaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 transition-colors"
                  title="Abrir em nova aba"
                >
                  <LuExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* URL da postagem (quando mídia está vinculada a conteúdo) */}
            {relatedContent && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="post-url" className="text-sm font-medium text-gray-700 dark:text-slate-300">URL da postagem</label>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                    <LuStar className="h-3 w-3" />
                    {relatedContent.usage === 'featured' ? 'Imagem de Destaque' : 'Mídia no Conteúdo'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="post-url"
                    value={getPostUrl()}
                    readOnly
                    aria-label="URL da postagem"
                    className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 text-sm truncate"
                  />
                  <button
                    type="button"
                    onClick={copyPostUrlToClipboard}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 transition-colors"
                    title="Copiar URL da postagem"
                  >
                    {copiedPostUrl ? (
                      <LuCheck className="h-4 w-4 text-green-400" />
                    ) : (
                      <LuCopy className="h-4 w-4" />
                    )}
                  </button>
                  <a
                    href={getPostUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 transition-colors"
                    title="Abrir postagem em nova aba"
                  >
                    <LuExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-xs text-gray-600 dark:text-slate-500">
                  {relatedContent.usage === 'featured' ? 'Esta mídia é a imagem de destaque de: ' : 'Esta mídia aparece no conteúdo de: '}
                  <span className="text-gray-800 dark:text-slate-400">{relatedContent.title}</span>
                </p>
              </div>
            )}

            {loadingDetails && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                <LuLoader className="h-4 w-4 animate-spin" />
                Carregando detalhes...
              </div>
            )}
          </div>

          {/* Info & Form */}
          <div className="space-y-4">
            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Tipo</span>
                <p className="text-sm text-gray-900 dark:text-slate-200">{media.mimeType}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Tamanho</span>
                <p className="text-sm text-gray-900 dark:text-slate-200">{formatBytes(media.fileSize)}</p>
              </div>
              {media.width && media.height && (
                <div>
                  <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Dimensões</span>
                  <p className="text-sm text-gray-900 dark:text-slate-200">{media.width} x {media.height}px</p>
                </div>
              )}
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-slate-400">Upload em</span>
                <p className="text-sm text-gray-900 dark:text-slate-200">{formatDate(media.uploadedAt)}</p>
              </div>
            </div>

            {/* Edit Form */}
            <form action={formAction} className="space-y-4">
              <div className="space-y-2 px-2 pt-4">
                <AnimatedInput
                  type="text"
                  id="filename"
                  name="filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  label="Nome do arquivo"
                  inputClassName="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
                  surfaceClassName="bg-white dark:bg-slate-800"
                />
              </div>

              <div className="space-y-2 px-2">
                <AnimatedTextarea
                  id="altText"
                  name="altText"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  rows={3}
                  label="Texto alternativo (alt)"
                  placeholder="Descreva a imagem para acessibilidade..."
                  textareaClassName="w-full px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300 resize-none"
                  surfaceClassName="bg-white dark:bg-slate-800"
                />
              </div>

              {/* Status Message */}
              {state.status !== 'idle' && (
                <div
                  className={cn(
                    'p-3 rounded-md text-sm',
                    state.status === 'success' && 'bg-green-50 border border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-600/40 dark:text-green-300',
                    state.status === 'error' && 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-600/40 dark:text-red-300'
                  )}
                >
                  {state.message}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isPending}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <LuLoader className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <LuSave className="h-4 w-4" />
                      Salvar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  );
}
