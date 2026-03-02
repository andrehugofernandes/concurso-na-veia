import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { AccordionNodeView } from './accordion-node-view';

export interface AccordionAttributes {
  id: string;
  title?: string;
  itemCount?: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    wp2nextAccordion: {
      setAccordion: (attributes: AccordionAttributes) => ReturnType;
    };
  }
}

export const Wp2NextAccordion = Node.create({
  name: 'wp2nextAccordion',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const shortcode = element.textContent || '';
          const match = shortcode.match(/\[wp2next-accordion\s+id="([^"]+)"\]/);
          return match ? match[1] : element.getAttribute('data-accordion-id');
        },
        renderHTML: (attributes: Record<string, unknown>) => {
          return { 'data-accordion-id': attributes.id as string };
        },
      },
      title: {
        default: '',
        parseHTML: (element: HTMLElement) => element.getAttribute('data-accordion-title'),
        renderHTML: (attributes: Record<string, unknown>) => {
          return { 'data-accordion-title': attributes.title as string };
        },
      },
      itemCount: {
        default: 0,
        parseHTML: (element: HTMLElement) => {
          const count = element.getAttribute('data-accordion-item-count');
          return count ? parseInt(count, 10) : 0;
        },
        renderHTML: (attributes: Record<string, unknown>) => {
          return { 'data-accordion-item-count': attributes.itemCount as number };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="wp2next-accordion"]',
      },
      {
        tag: 'p',
        getAttrs: (node: HTMLElement | string) => {
          if (typeof node === 'string') return false;
          const text = node.textContent || '';
          if (text.match(/\[wp2next-accordion\s+id="[^"]+"\]/)) {
            return {};
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    const id = HTMLAttributes['data-accordion-id'] as string;
    return [
      'div',
      mergeAttributes(HTMLAttributes as Record<string, string>, {
        'data-type': 'wp2next-accordion',
        class: 'wp2next-accordion-wrapper',
      }),
      `[wp2next-accordion id="${id}"]`,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AccordionNodeView);
  },

  addCommands() {
    return {
      setAccordion:
        (attributes: AccordionAttributes) =>
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
