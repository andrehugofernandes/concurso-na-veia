'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {
  LuBold,
  LuItalic,
  LuStrikethrough,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuList,
  LuListOrdered,
  LuQuote,
  LuUndo,
  LuRedo,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuAlignJustify,
  LuImage,
  LuLayoutList,
} from 'react-icons/lu';
import { MediaPickerDialog } from '@/components/media/media-picker-dialog';
import { listMedia, type MediaAsset } from '@/app/admin/media/actions';
import { AccordionPickerDialog } from './accordion-picker-dialog';
import { Wp2NextAccordion } from './tiptap/extensions/wp2next-accordion';
import { GalleryPickerDialog } from '@/components/image-galleries/gallery-picker-dialog';
import { Wp2NextGallery } from './tiptap/extensions/wp2next-gallery';

/**
 * Converte texto com quebras de linha em HTML com parágrafos
 * Similar à função wpautop do WordPress
 */
function wpautop(text: string): string {
  if (!text || text.trim() === '') return '';

  // Se já tem tags HTML de bloco, não processar
  if (/<(p|div|h[1-6]|ul|ol|li|blockquote|pre|table|figure)[^>]*>/i.test(text)) {
    return text;
  }

  // Normalizar quebras de linha
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Dividir por parágrafos (duas ou mais quebras de linha)
  const paragraphs = normalized.split(/\n{2,}/);

  // Envolver cada parágrafo em <p> e converter quebras simples em <br>
  const htmlParagraphs = paragraphs
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      // Converter quebras de linha simples em <br>
      const withBreaks = p.replace(/\n/g, '<br>');
      return `<p>${withBreaks}</p>`;
    });

  return htmlParagraphs.join('\n');
}

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Escreva o conteúdo do post...',
  disabled = false,
}: RichTextEditorProps) {
  const shouldDebugAccordion = process.env.NODE_ENV === 'development';

  // Processar conteúdo para garantir parágrafos corretos
  const processedContent = wpautop(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Wp2NextAccordion,
      Wp2NextGallery,
    ],
    content: processedContent,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (shouldDebugAccordion) {
        const html = editor.getHTML();
        // eslint-disable-next-line no-console
        console.log('[RichTextEditor] onUpdate', {
          hasShortcode: html.includes('[wp2next-accordion'),
          length: html.length,
          preview: html.slice(0, 300),
        });
      }
      onChange(editor.getHTML());
    },
  });

  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaAsset[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [mediaPage, setMediaPage] = useState(1);
  const [hasMoreMedia, setHasMoreMedia] = useState(true);
  const [isLoadingMoreMedia, setIsLoadingMoreMedia] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);
  const [isAccordionDialogOpen, setIsAccordionDialogOpen] = useState(false);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const MEDIA_PAGE_SIZE = 40;

  useEffect(() => {
    if (!shouldDebugAccordion) return;
    // eslint-disable-next-line no-console
    console.log('[RichTextEditor] props content', {
      hasShortcode: (content ?? '').includes('[wp2next-accordion'),
      length: (content ?? '').length,
      preview: (content ?? '').slice(0, 300),
    });
    // eslint-disable-next-line no-console
    console.log('[RichTextEditor] processedContent', {
      hasShortcode: processedContent.includes('[wp2next-accordion'),
      length: processedContent.length,
      preview: processedContent.slice(0, 300),
    });
  }, [content, processedContent, shouldDebugAccordion]);

  useEffect(() => {
    const newProcessedContent = wpautop(content);
    if (editor && newProcessedContent !== editor.getHTML()) {
      if (shouldDebugAccordion) {
        // eslint-disable-next-line no-console
        console.log('[RichTextEditor] setContent (prop -> editor)', {
          incomingHasShortcode: newProcessedContent.includes('[wp2next-accordion'),
          incomingLength: newProcessedContent.length,
          currentHasShortcode: editor.getHTML().includes('[wp2next-accordion'),
          currentLength: editor.getHTML().length,
        });
      }
      editor.commands.setContent(newProcessedContent);
    }
  }, [content, editor]);

  const loadMediaPage = useCallback(
    async (pageToLoad: number, append: boolean) => {
      if (append) {
        setIsLoadingMoreMedia(true);
      } else {
        setIsLoadingMedia(true);
        setMediaItems([]);
        setSelectedMediaId(null);
      }

      setMediaError(null);

      try {
        // Logs para depuração de carregamento de mídias
        // eslint-disable-next-line no-console
        console.log('[RichTextEditor] listMedia', {
          page: pageToLoad,
          pageSize: MEDIA_PAGE_SIZE,
        });

        const result = await listMedia({
          page: pageToLoad,
          pageSize: MEDIA_PAGE_SIZE,
          sortBy: 'uploadedAt',
          sortOrder: 'desc',
          mimeType: 'image',
        });

        if (result.status === 'success' && result.data) {
          const newItems = result.data.items ?? [];
          // eslint-disable-next-line no-console
          console.log('[RichTextEditor] listMedia result', {
            page: pageToLoad,
            items: newItems.length,
          });

          setMediaItems((prev) => (append ? [...prev, ...newItems] : newItems));
          setMediaPage(pageToLoad);
          setHasMoreMedia(newItems.length === MEDIA_PAGE_SIZE);
        } else {
          setMediaError((result.error as string) || 'Erro ao carregar mídias');
          setHasMoreMedia(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[RichTextEditor] listMedia error', error);
        setMediaError('Erro ao carregar mídias');
        setHasMoreMedia(false);
      } finally {
        if (append) {
          setIsLoadingMoreMedia(false);
        } else {
          setIsLoadingMedia(false);
        }
      }
    },
    [MEDIA_PAGE_SIZE],
  );

  useEffect(() => {
    if (!isMediaDialogOpen) {
      return;
    }
    if (mediaItems.length > 0 || isLoadingMedia) {
      return;
    }

    void loadMediaPage(1, false);
  }, [isMediaDialogOpen, mediaItems.length, isLoadingMedia, loadMediaPage]);

  const handleLoadMoreMedia = useCallback(() => {
    if (!hasMoreMedia || isLoadingMoreMedia || isLoadingMedia) {
      return;
    }

    const nextPage = mediaPage + 1;
    void loadMediaPage(nextPage, true);
  }, [hasMoreMedia, isLoadingMoreMedia, isLoadingMedia, mediaPage, loadMediaPage]);

  const handleMediaScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (!target) return;

    const { scrollTop, scrollHeight, clientHeight } = target;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceFromBottom < 200) {
      handleLoadMoreMedia();
    }
  };

  if (!editor) {
    return null;
  }

  const MenuButton = ({
    onClick,
    isActive,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 ${isActive ? 'bg-gray-200 dark:bg-slate-700 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-slate-300'
        }`}
    >
      {children}
    </button>
  );

  const handleInsertSelectedMedia = () => {
    if (!editor || !selectedMediaId) {
      return;
    }

    const media = mediaItems.find((item) => item.id === selectedMediaId);
    if (!media) {
      return;
    }

    const isImage = media.mimeType.startsWith('image/');
    const src = media.firebaseUrl;
    const alt = media.altText || media.originalFilename;

    // Logs para depuração de inserção de imagem
    // eslint-disable-next-line no-console
    console.log('[RichTextEditor] handleInsertSelectedMedia', {
      mediaId: media.id,
      src,
    });

    if (isImage) {
      editor
        .chain()
        .focus()
        .setImage({
          src,
          alt,
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .insertContent(
          `<a href="${src}" target="_blank" rel="noopener noreferrer">${media.originalFilename}</a>`,
        )
        .run();
    }

    // eslint-disable-next-line no-console
    console.log('[RichTextEditor] content after insert', editor.getHTML());

    setIsMediaDialogOpen(false);
  };

  return (
    <div className="border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 flex-shrink-0">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Negrito"
        >
          <LuBold size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Itálico"
        >
          <LuItalic size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Tachado"
        >
          <LuStrikethrough size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Código"
        >
          <LuCode size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Título 1"
        >
          <LuHeading1 size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Título 2"
        >
          <LuHeading2 size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Lista"
        >
          <LuList size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Lista Numerada"
        >
          <LuListOrdered size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Citação"
        >
          <LuQuote size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1" />

        <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Desfazer">
          <LuUndo size={18} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Refazer">
          <LuRedo size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Alinhar à esquerda"
        >
          <LuAlignLeft size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Centralizar"
        >
          <LuAlignCenter size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Alinhar à direita"
        >
          <LuAlignRight size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Justificar"
        >
          <LuAlignJustify size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-1" />

        <MenuButton
          onClick={() => setIsMediaDialogOpen(true)}
          title="Inserir mídia"
        >
          <LuImage size={18} />
        </MenuButton>

        <MenuButton
          onClick={() => setIsAccordionDialogOpen(true)}
          title="Inserir acordeon"
        >
          <LuLayoutList size={18} />
        </MenuButton>

        <MenuButton
          onClick={() => setIsGalleryDialogOpen(true)}
          title="Inserir galeria"
        >
          <LuLayoutList className="rotate-90" size={18} />
        </MenuButton>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        data-placeholder={placeholder}
        className="rich-text-editor-content max-w-none p-4 flex-1 overflow-y-auto focus:outline-none"
      />

      {/* Estilos para garantir espaçamento de parágrafos WYSIWYG */}
      <style jsx global>{`
        .rich-text-editor-content .ProseMirror {
          min-height: 200px;
          outline: none;
          color: #020617;
        }

        html.dark .rich-text-editor-content .ProseMirror {
          color: #e5e7eb;
        }
        
        .rich-text-editor-content .ProseMirror p {
          margin-bottom: 1em;
          line-height: 1.6;
        }
        
        .rich-text-editor-content .ProseMirror p:last-child {
          margin-bottom: 0;
        }
        
        .rich-text-editor-content .ProseMirror p + p {
          margin-top: 1em;
        }
        
        .rich-text-editor-content .ProseMirror h1,
        .rich-text-editor-content .ProseMirror h2,
        .rich-text-editor-content .ProseMirror h3 {
          margin-top: 1.5em;
          margin-bottom: 0.75em;
        }
        
        .rich-text-editor-content .ProseMirror ul,
        .rich-text-editor-content .ProseMirror ol {
          margin-bottom: 1em;
          padding-left: 1.5em;
        }
        
        .rich-text-editor-content .ProseMirror li {
          margin-bottom: 0.25em;
        }
        
        .rich-text-editor-content .ProseMirror blockquote {
          margin: 1em 0;
          padding-left: 1em;
          border-left: 3px solid #4b5563;
          color: #9ca3af;
        }
        
        .rich-text-editor-content .ProseMirror br {
          display: block;
          content: "";
          margin-top: 0.5em;
        }
        
        /* Placeholder */
        .rich-text-editor-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #6b7280;
          pointer-events: none;
          height: 0;
        }
      `}</style>

      <MediaPickerDialog
        open={isMediaDialogOpen}
        onOpenChange={setIsMediaDialogOpen}
        icon={<LuImage size={20} />}
        title="Inserir mídia"
        description="Selecione uma mídia da biblioteca para inserir no conteúdo"
        items={mediaItems}
        isLoading={isLoadingMedia}
        isLoadingMore={isLoadingMoreMedia}
        error={mediaError}
        selectedIds={selectedMediaId ? [selectedMediaId] : []}
        onSelectionChange={(ids) => setSelectedMediaId(ids[0] ?? null)}
        onScroll={handleMediaScroll}
        onCancel={() => setIsMediaDialogOpen(false)}
        onConfirm={handleInsertSelectedMedia}
        confirmDisabled={!selectedMediaId}
        confirmLabel="Inserir"
      />

      <AccordionPickerDialog
        open={isAccordionDialogOpen}
        onOpenChange={setIsAccordionDialogOpen}
        onSelect={(accordion) => {
          if (editor) {
            editor.commands.setAccordion({
              id: accordion.id,
              title: accordion.title,
              itemCount: accordion.itemCount,
            });

            if (shouldDebugAccordion) {
              const html = editor.getHTML();
              // eslint-disable-next-line no-console
              console.log('[RichTextEditor] inserted accordion', {
                accordionId: accordion.id,
                hasShortcode: html.includes('[wp2next-accordion'),
                length: html.length,
                preview: html.slice(0, 300),
              });
            }
          }
        }}
      />

      <GalleryPickerDialog
        open={isGalleryDialogOpen}
        onOpenChange={setIsGalleryDialogOpen}
        onSelect={(gallery) => {
          if (editor) {
            editor.commands.setGallery({
              id: gallery.id,
              title: gallery.title,
              imageCount: gallery.imageCount,
            });
          }
        }}
      />
    </div>
  );
}
