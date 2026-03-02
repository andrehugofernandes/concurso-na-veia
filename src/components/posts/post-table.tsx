'use client';

import { LuPencil, LuTrash2, LuLoader } from 'react-icons/lu';
import type { PostActionResponse } from '@/app/admin/posts/actions';

export interface Post {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
  content?: string;
  categoryId?: string;
  categoryName?: string;
  tags?: string;
  featuredImage?: File;
  featuredImageId?: string;
  featuredImageUrl?: string | null;
}

interface PostTableProps {
  posts: Post[];
  onDelete: (id: string) => Promise<PostActionResponse>;
  onEdit: (post: Post) => void;
  isLoading?: boolean;
  isDeletingId?: string | null;
  statusMessage?: string | null;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

export function PostTable({
  posts,
  onDelete,
  onEdit,
  isLoading,
  isDeletingId,
  statusMessage,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
}: PostTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja deletar este post?')) {
      await onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted">
            {selectable && (
              <th className="px-3 py-3 text-left text-sm font-semibold w-10">
                <input
                  type="checkbox"
                  aria-label="Selecionar todos os posts desta página"
                  checked={posts.length > 0 && selectedIds.length === posts.length}
                  onChange={(event) => {
                    if (!onSelectionChange) return;
                    if (event.target.checked) {
                      onSelectionChange(posts.map((post) => post.id));
                    } else {
                      onSelectionChange([]);
                    }
                  }}
                />
              </th>
            )}
            <th className="px-4 py-3 text-left text-sm font-semibold">Título</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Categoria</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Autor</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Tags</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Criado</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const isSelected = selectedIds.includes(post.id);
            return (
              <tr
                key={post.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                {selectable && (
                  <td className="px-3 py-3 align-middle">
                    <input
                      type="checkbox"
                      aria-label={`Selecionar post ${post.title}`}
                      checked={isSelected}
                      onChange={(event) => {
                        if (!onSelectionChange) return;
                        if (event.target.checked) {
                          onSelectionChange([...selectedIds, post.id]);
                        } else {
                          onSelectionChange(selectedIds.filter((id) => id !== post.id));
                        }
                      }}
                    />
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="text-sm font-medium">{post.title}</div>
                  <div className="text-xs text-muted-foreground">{post.slug}</div>
                </td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {post.categoryName ? (
                    <span className="px-2 py-1 rounded bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200 text-xs">
                      {post.categoryName}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs inline-block">Sem categoria</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status === 'published' ? 'Publicado' : post.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{post.author}</td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {post.tags ? (
                    <div className="flex flex-wrap gap-1">
                      {post.tags
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                        .slice(0, 6)
                        .map((tag) => (
                          <span
                            key={`${post.id}-tag-${tag}`}
                            className="px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs inline-block">Sem tags</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(post)}
                      disabled={isLoading || isDeletingId === post.id}
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors disabled:opacity-50"
                      title="Editar"
                      aria-label="Editar post"
                    >
                      <LuPencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      disabled={isLoading || isDeletingId === post.id}
                      className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Deletar"
                      aria-label="Deletar post"
                    >
                      {isDeletingId === post.id ? (
                        <LuLoader className="h-4 w-4 animate-spin" />
                      ) : (
                        <LuTrash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {statusMessage && (
        <div
          role="status"
          className="px-4 py-2 text-sm text-muted-foreground"
        >
          {statusMessage}
        </div>
      )}
      {posts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum post encontrado
        </div>
      )}
    </div>
  );
}
