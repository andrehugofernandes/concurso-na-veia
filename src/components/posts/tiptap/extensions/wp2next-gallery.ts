import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { GalleryNodeView } from './gallery-node-view';

export interface GalleryAttributes {
    id: string;
    title?: string;
    imageCount?: number;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        wp2nextGallery: {
            setGallery: (attributes: GalleryAttributes) => ReturnType;
        };
    }
}

export const Wp2NextGallery = Node.create({
    name: 'wp2nextGallery',

    group: 'block',

    atom: true,

    draggable: true,

    addAttributes() {
        return {
            id: {
                default: null,
                parseHTML: (element: HTMLElement) => {
                    const shortcode = element.textContent || '';
                    const match = shortcode.match(/\[wp2next-gallery\s+id="([^"]+)"\]/);
                    return match ? match[1] : element.getAttribute('data-gallery-id');
                },
                renderHTML: (attributes: Record<string, unknown>) => {
                    return { 'data-gallery-id': attributes.id as string };
                },
            },
            title: {
                default: '',
                parseHTML: (element: HTMLElement) => element.getAttribute('data-gallery-title'),
                renderHTML: (attributes: Record<string, unknown>) => {
                    return { 'data-gallery-title': attributes.title as string };
                },
            },
            imageCount: {
                default: 0,
                parseHTML: (element: HTMLElement) => {
                    const count = element.getAttribute('data-gallery-image-count');
                    return count ? parseInt(count, 10) : 0;
                },
                renderHTML: (attributes: Record<string, unknown>) => {
                    return { 'data-gallery-image-count': attributes.imageCount as number };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="wp2next-gallery"]',
            },
            {
                tag: 'p',
                getAttrs: (node: HTMLElement | string) => {
                    if (typeof node === 'string') return false;
                    const text = node.textContent || '';
                    if (text.match(/\[wp2next-gallery\s+id="[^"]+"\]/)) {
                        return {};
                    }
                    return false;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
        const id = HTMLAttributes['data-gallery-id'] as string;
        return [
            'div',
            mergeAttributes(HTMLAttributes as Record<string, string>, {
                'data-type': 'wp2next-gallery',
                class: 'wp2next-gallery-wrapper',
            }),
            `[wp2next-gallery id="${id}"]`,
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(GalleryNodeView);
    },

    addCommands() {
        return {
            setGallery:
                (attributes: GalleryAttributes) =>
                    ({ chain }: { chain: () => ReturnType<typeof import('@tiptap/core').Editor.prototype.chain> }) => {
                        return chain()
                            .insertContent({
                                type: this.name,
                                attrs: attributes,
                            })
                            .run();
                    },
        };
    },
});
