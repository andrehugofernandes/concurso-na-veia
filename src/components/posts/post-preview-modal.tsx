'use client';

import { useState, useEffect } from 'react';
import { LuX, LuLoader } from 'react-icons/lu';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { ModalHeader } from '@/components/ui/modal-header';
import { getAccordionBlock, type AccordionBlockDetails } from '@/app/admin/accordions/actions';
import { AccordionBlockView } from '@/components/accordions/accordion-block-view';
import { getGallery, type ImageGalleryData } from '@/app/admin/image-galleries/actions';
import { GalleryMosaic } from '@/components/image-galleries/gallery-mosaic';

interface PostPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        title: string;
        content: string;
        featuredImageUrl?: string | null;
    };
}

export function PostPreviewModal({
    isOpen,
    onClose,
    data,
}: PostPreviewModalProps) {
    const [parsedContent, setParsedContent] = useState<React.ReactNode>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) {
            setParsedContent(null);
            return;
        }

        const parseContent = async () => {
            setIsLoading(true);
            const content = data.content || '';

            // Regex para encontrar shortcodes de acordeon e galeria
            const accordionRegex = /\[wp2next-accordion\s+id="([^"]+)"\]/g;
            const galleryRegex = /\[wp2next-gallery\s+id="([^"]+)"\]/g;

            const parts: Array<React.ReactNode> = [];
            let lastIndex = 0;
            let match;

            // Array para armazenar todos os matches com suas posições
            const allMatches: Array<{
                type: 'accordion' | 'gallery';
                id: string;
                index: number;
                length: number;
            }> = [];

            // Encontrar todos os shortcodes de acordeon
            accordionRegex.lastIndex = 0;
            while ((match = accordionRegex.exec(content)) !== null) {
                allMatches.push({
                    type: 'accordion',
                    id: match[1],
                    index: match.index,
                    length: match[0].length,
                });
            }

            // Encontrar todos os shortcodes de galeria
            galleryRegex.lastIndex = 0;
            while ((match = galleryRegex.exec(content)) !== null) {
                allMatches.push({
                    type: 'gallery',
                    id: match[1],
                    index: match.index,
                    length: match[0].length,
                });
            }

            // Ordenar todos os matches por posição
            allMatches.sort((a, b) => a.index - b.index);

            // Processar o conteúdo em ordem
            for (const shortcodeMatch of allMatches) {
                // Texto antes do shortcode
                if (shortcodeMatch.index > lastIndex) {
                    const textSegment = content.substring(lastIndex, shortcodeMatch.index);
                    if (textSegment.trim()) {
                        // Divide por quebras de linha (uma ou mais)
                        const paragraphs = textSegment.split(/\n+/).filter(p => p.trim());
                        parts.push(
                            <div key={`text-${lastIndex}`} className="block">
                                {paragraphs.map((p, idx) => (
                                    <p
                                        key={idx}
                                        className="text-justify leading-relaxed text-gray-700 dark:text-gray-300 block mb-6 last:mb-0"
                                        dangerouslySetInnerHTML={{ __html: p }}
                                    />
                                ))}
                            </div>
                        );
                    }
                }

                // Processar o shortcode baseado no tipo
                if (shortcodeMatch.type === 'accordion') {
                    const accordionId = shortcodeMatch.id;

                    try {
                        const result = await getAccordionBlock({ id: accordionId });

                        if (result.status === 'success' && result.data?.accordion) {
                            parts.push(
                                <div key={`accordion-${accordionId}`} className="my-10 not-prose">
                                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden">
                                        <div className="py-10 px-8 sm:px-12">
                                            <AccordionBlockView
                                                accordion={result.data.accordion}
                                                className="w-full"
                                                showTitle={true}
                                                showItemCount={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            parts.push(
                                <div key={`error-${accordionId}`} className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
                                    Acordeon não encontrado (ID: {accordionId})
                                </div>
                            );
                        }
                    } catch (error) {
                        parts.push(
                            <div key={`error-${accordionId}`} className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
                                Erro ao carregar acordeon (ID: {accordionId})
                            </div>
                        );
                    }
                } else if (shortcodeMatch.type === 'gallery') {
                    const galleryId = shortcodeMatch.id;

                    try {
                        const result = await getGallery({ id: galleryId });

                        if (result.status === 'success' && result.data?.gallery) {
                            const gallery = result.data.gallery;
                            const images = Array.isArray(gallery.images) ? gallery.images : [];

                            parts.push(
                                <div key={`gallery-${galleryId}`} className="my-10 not-prose">
                                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden">
                                        <div className="py-6 px-6 sm:px-8">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                                {gallery.title}
                                            </h3>
                                            {images.length > 0 ? (
                                                <GalleryMosaic images={images} />
                                            ) : (
                                                <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                                                    Nenhuma imagem nesta galeria.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            parts.push(
                                <div key={`error-${galleryId}`} className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
                                    Galeria não encontrada (ID: {galleryId})
                                </div>
                            );
                        }
                    } catch (error) {
                        parts.push(
                            <div key={`error-${galleryId}`} className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
                                Erro ao carregar galeria (ID: {galleryId})
                            </div>
                        );
                    }
                }

                lastIndex = shortcodeMatch.index + shortcodeMatch.length;
            }

            // Resto do conteúdo
            if (lastIndex < content.length) {
                const textSegment = content.substring(lastIndex);
                if (textSegment.trim()) {
                    const paragraphs = textSegment.split(/\n+/).filter(p => p.trim());
                    parts.push(
                        <div key={`text-${lastIndex}`} className="block">
                            {paragraphs.map((p, idx) => (
                                <p
                                    key={idx}
                                    className="text-justify leading-relaxed text-gray-700 dark:text-gray-300 block mb-6 last:mb-0"
                                    dangerouslySetInnerHTML={{ __html: p }}
                                />
                            ))}
                        </div>
                    );
                }
            }

            setParsedContent(<>{parts}</>);
            setIsLoading(false);
        };

        void parseContent();
    }, [isOpen, data.content]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="!fixed !inset-0 !translate-x-0 !translate-y-0 !m-0 w-screen h-screen max-w-none max-h-none flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 border-none shadow-none overflow-hidden z-[150]">

                {/* Header com botão fechar - Flutuante sobre o hero */}
                <div className="absolute top-0 left-0 right-0 z-50 flex justify-end px-6 py-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors"
                    >
                        <LuX className="h-6 w-6" />
                    </Button>
                </div>

                {/* Conteúdo Scrollável */}
                <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-950">

                    {/* Seção Hero - Bandeira e Título */}
                    <div className="relative w-full h-[400px] sm:h-[500px] bg-blue-900 overflow-hidden shadow-2xl">
                        {/* Background Image - Bandeira de Jaboatão/Pernambuco */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-[20s]"
                            style={{
                                backgroundImage: `url('/images/jaboatao-flag-bg.jpeg?v=${new Date().getTime()}')`, // Path corrigido + Cache buster
                                opacity: 0.8
                            }}
                        />

                        {/* Gradient Overlay Complexo para garantir leitura */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-blue-900/30" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />

                        {/* Conteúdo do Hero */}
                        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 sm:px-12 max-w-5xl mx-auto w-full z-10">
                            {/* Metadados (Data/Hora e Categorias) */}
                            <div className="flex flex-wrap items-center gap-4 text-blue-50 text-sm font-medium mb-6 animate-fade-in-up">
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                                    {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                                    <span className="text-xs uppercase tracking-wider text-blue-200">às</span>
                                    {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            {/* Título Principal */}
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] max-w-4xl tracking-tight drop-shadow-2xl font-sans mb-4">
                                {data.title || 'Sem título'}
                            </h1>
                        </div>
                    </div>

                    {/* Corpo da Notícia e Imagem de Destaque */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-20 pb-20 -mt-20">

                        {/* Imagem de Destaque (Card Flutuante) */}
                        {data.featuredImageUrl && (
                            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-white transform transition-transform hover:scale-[1.01] duration-500">
                                <img
                                    src={data.featuredImageUrl}
                                    alt={data.title}
                                    className="w-full h-auto object-cover max-h-[600px]"
                                />
                            </div>
                        )}

                        {/* Conteúdo do Post */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-100 dark:border-slate-800">
                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify [&>p]:mb-6">
                                {isLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                        <LuLoader className="h-10 w-10 animate-spin text-blue-600" />
                                        <p className="text-gray-500 font-medium">Carregando visualização...</p>
                                    </div>
                                ) : (
                                    parsedContent
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer (Opcional - pode ser removido se quiser 100% igual ao print, mas bom ter um fechar fixo) */}
                <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-center z-50">
                    <Button variant="outline" onClick={onClose} className="min-w-[150px]">Fechar Visualização</Button>
                </div>

            </DialogContent>
        </Dialog>
    );
}
