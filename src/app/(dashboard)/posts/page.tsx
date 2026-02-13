'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuLoader, LuFilter, LuSearch, LuX } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { PostTable, type Post } from '@/components/posts/post-table';
import { PostFormModal } from '@/components/posts/post-form-modal';
import { PaginationControls } from '@/components/ui/pagination-controls';
import type { PostActionResponse, PostListData } from './actions';
import { deletePost, deletePostsBulk, listPosts, getPostStats, selectAllPostIds } from './actions';
import { LuFileText, LuCheck, LuClock, LuArchive } from 'react-icons/lu';
import { TextRoll } from '@/components/core/text-roll';

interface DeleteState {
  isDeletingId: string | null;
  statusMessage: string | null;
}

interface PostFilters {
  status?: string;
  categoryId?: string;
  authorId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export default function PostsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PostFilters>({});

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const selectionBarRef = useRef<HTMLDivElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const loadPostsRequestIdRef = useRef(0);

  const [stats, setStats] = useState<{
    total: number;
    published: number;
    draft: number;
    archived: number;
  } | null>(null);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [deleteState, setDeleteState] = useState<DeleteState>({
    isDeletingId: null,
    statusMessage: null,
  });

  // Carregar estatísticas de posts
  useEffect(() => {
    getPostStats().then((result) => {
      if (result.status === 'success' && result.data) {
        setStats(result.data);
      }
    });
  }, []);

  // Carregar posts do banco de dados
  const loadPosts = useCallback(async (targetPage: number, targetPageSize: number, activeFilters: PostFilters = {}) => {
    const requestId = (loadPostsRequestIdRef.current += 1);
    setIsLoading(true);
    setError(null);
    try {
      const result = await listPosts({
        page: targetPage,
        pageSize: targetPageSize,
        status: activeFilters.status as 'all' | 'published' | 'draft' | 'archived' | 'pending' | 'private' | undefined,
        search: activeFilters.search || undefined,
      });

      if (requestId !== loadPostsRequestIdRef.current) {
        return;
      }

      if (result.status === 'success' && result.data) {
        // Converter PostListData para Post
        const convertedPosts: Post[] = result.data.posts.map((p: PostListData) => ({
          id: String(p.id),
          title: p.title,
          slug: p.slug,
          content: p.content,
          status: p.status as 'published' | 'draft' | 'archived',
          author: p.authorName || p.author || 'Desconhecido',
          authorId: p.authorId ?? undefined,
          categoryId: p.categoryId ? String(p.categoryId) : undefined,
          categoryName: p.categoryName || undefined,
          tags: p.tags,
          featuredImageId: p.featuredImageId ? String(p.featuredImageId) : undefined,
          featuredImageUrl: p.featuredImageUrl,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        }));
        setPosts(convertedPosts);
        setTotal(result.data.total);
        setPage(result.data.page);
        setPageSize(result.data.pageSize);
        setTotalPages(result.data.totalPages);
      } else {
        setError('Erro ao carregar posts');
      }
    } catch {
      if (requestId !== loadPostsRequestIdRef.current) {
        return;
      }
      setError('Erro ao carregar posts');
    } finally {
      if (requestId === loadPostsRequestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  // Carregar posts na inicialização
  useEffect(() => {
    void loadPosts(page, pageSize, filters);
  }, []);

  const handleOpenNewPost = () => {
    setEditingPost(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditPost = (post: Post) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[PostsPage] edit post selected', {
        id: post.id,
        title: post.title,
        authorId: post.authorId,
        tags: post.tags,
        featuredImageId: post.featuredImageId,
      });
    }
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    setEditingPost(undefined);
    // Recarregar posts após criar/editar
    void loadPosts(page, pageSize, filters);
  };

  const handleDeletePost = async (id: string): Promise<PostActionResponse> => {
    const previousPosts = posts;

    setDeleteState({
      isDeletingId: id,
      statusMessage: null,
    });

    // Otimismo: remove o post da lista imediatamente
    setPosts(previousPosts.filter((post) => post.id !== id));

    const response = await deletePost(id);

    if (response.status === 'error') {
      // Rollback em caso de erro
      setPosts(previousPosts);
      setDeleteState({
        isDeletingId: null,
        statusMessage: response.error?.message ?? 'Erro ao deletar post.',
      });
      return response;
    }

    setDeleteState({
      isDeletingId: null,
      statusMessage: 'Post deletado com sucesso.',
    });

    // Recarregar para atualizar contagem
    void loadPosts(page, pageSize, filters);

    return response;
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    void loadPosts(nextPage, pageSize, filters);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPage(1);
    setPageSize(nextPageSize);
    void loadPosts(1, nextPageSize, filters);
  };

  const handleApplyFilters = useCallback(() => {
    setPage(1);
    setPageSize(10);
    void loadPosts(1, 10, filters);
  }, [loadPosts, filters]);

  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleSelectPageItems = () => {
    if (!posts.length) return;
    setSelectedIds(posts.map((post) => post.id));
  };

  const handleSelectAll = useCallback(async () => {
    const result = await selectAllPostIds({
      status: filters.status as 'all' | 'published' | 'draft' | 'archived' | 'pending' | 'private' | undefined,
      search: filters.search || undefined,
    });

    if (result.status === 'success' && result.data) {
      setSelectedIds(result.data.ids);
    }
  }, [filters.search, filters.status]);

  const handleClearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleExitSelectionMode = useCallback(() => {
    setSelectedIds([]);
    setSelectionMode(false);
  }, []);

  useEffect(() => {
    if (!selectionMode) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const isInsideSelectionBar = selectionBarRef.current?.contains(target) ?? false;
      const isInsideTable = tableContainerRef.current?.contains(target) ?? false;

      if (isInsideSelectionBar || isInsideTable) {
        return;
      }

      handleExitSelectionMode();
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [handleExitSelectionMode, selectionMode]);

  const handleDeleteSelected = async () => {
    if (!selectedIds.length || isBulkDeleting) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja deletar ${selectedIds.length} ${
        selectedIds.length === 1 ? 'post selecionado' : 'posts selecionados'
      }?`,
    );

    if (!confirmed) return;

    setIsBulkDeleting(true);

    try {
      const numericIds = selectedIds
        .map((id) => Number(id))
        .filter((value) => Number.isInteger(value) && value > 0);

      if (!numericIds.length) {
        setIsBulkDeleting(false);
        return;
      }

      const result = await deletePostsBulk(numericIds);

      if (result.status === 'success' && result.data) {
        const deletedSet = new Set(numericIds.map((id) => String(id)));
        setPosts((current) => current.filter((post) => !deletedSet.has(post.id)));
        handleExitSelectionMode();
        void loadPosts(page, pageSize, filters);
      }
    } finally {
      setIsBulkDeleting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500 dark:text-slate-400">
        <LuLoader className="h-6 w-6 animate-spin mr-2" />
        <span>Carregando posts...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com Busca */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Posts</TextRoll>
          </h1>
          <p className="hidden md:block text-gray-500 dark:text-slate-400 mt-1">
            Gerencie todos os posts do seu site ({total} posts)
          </p>
        </div>

        {/* Desktop: Form normal */}
        <form onSubmit={(e) => { e.preventDefault(); handleApplyFilters(); }} className="hidden md:flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value || undefined }))}
              placeholder="Buscar posts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 
               focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, search: undefined }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-300"
                title="Limpar busca"
                aria-label="Limpar busca"
              >
                <LuX className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-colors shadow-md"
          >
            Buscar
          </button>
        </form>

        {/* Mobile: AnimatedInput com Enter */}
        <form onSubmit={(e) => { e.preventDefault(); handleApplyFilters(); }} className="md:hidden">
          <div className="relative" data-testid="mobile-search-input">
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value || undefined }))}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={(e) => {
                if (!e.target.value) {
                  setIsSearchFocused(false);
                }
              }}
              className="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
              placeholder="Buscar posts..."
              aria-label="Buscar posts"
              title="Buscar posts"
              data-testid="mobile-search-field"
            />
            <label 
              className={cn(
                'pointer-events-none absolute origin-left text-base left-3 bg-white dark:bg-slate-900 px-1 transition-all duration-200 ease-in-out',
                isSearchFocused || filters.search
                  ? 'top-0 -translate-y-1/2 scale-75' 
                  : 'top-1/2 -translate-y-1/2 scale-100'
              )}
              style={{ zIndex: 50 }}
              data-testid="mobile-search-label"
            >
              <span className={cn(
                'inline-block rounded px-1 transition-colors',
                isSearchFocused || filters.search
                  ? 'border border-[var(--primary)] text-[var(--primary)]' 
                  : 'border-transparent text-gray-500 dark:text-slate-400'
              )}>
                Buscar posts
              </span>
            </label>
          </div>
        </form>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <LuFileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Total de posts</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600/20">
                <LuCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.published}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Publicados</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-600/20">
                <LuClock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.draft}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Rascunhos</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-600/20">
                <LuArchive className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.archived}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Arquivados</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header de Filtros e Controles - Desktop */}
      {!selectionMode && (
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Abas - Centralizadas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {([
                { value: 'all', label: 'Todos', icon: LuFilter },
                { value: 'published', label: 'Publicados', icon: LuCheck },
                { value: 'draft', label: 'Rascunhos', icon: LuClock },
                { value: 'archived', label: 'Arquivados', icon: LuArchive },
              ] as const).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    const nextFilters = {
                      ...filters,
                      status: tab.value === 'all' ? undefined : tab.value,
                    };
                    setFilters(nextFilters);
                    setPage(1);
                    void loadPosts(1, pageSize, nextFilters);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    (filters.status || 'all') === tab.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-label={`Filtrar por ${tab.label}`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Itens por Página */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
              <span className="hidden sm:inline">Itens:</span>
              <div className="flex items-center gap-1">
                {[
                  { value: 10, showOnMobile: true },
                  { value: 50, showOnMobile: true },
                  { value: 'TODOS', showOnMobile: true },
                ].map((option) => {
                  const value = option.value === 'TODOS' ? total : (option.value as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handlePageSizeChange(value)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        option.showOnMobile ? '' : 'hidden sm:inline-flex',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option.value} posts por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({total})</span>
              </button>
            )}
            <button
              onClick={handleOpenNewPost}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Novo Post</span>
              <span className="sm:hidden">Novo</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile: Layout com lados separados */}
      {!selectionMode && (
        <div className="lg:hidden flex flex-col gap-4">
          {/* Abas e Itens por Página - Um abaixo do outro */}
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Abas de filtro */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {([
                { value: 'all', label: 'Todos', icon: LuFilter },
                { value: 'published', label: 'Publicados', icon: LuCheck },
                { value: 'draft', label: 'Rascunhos', icon: LuClock },
                { value: 'archived', label: 'Arquivados', icon: LuArchive },
              ] as const).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    const nextFilters = {
                      ...filters,
                      status: tab.value === 'all' ? undefined : tab.value,
                    };
                    setFilters(nextFilters);
                    setPage(1);
                    void loadPosts(1, pageSize, nextFilters);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    (filters.status || 'all') === tab.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-label={`Filtrar por ${tab.label}`}
                >
                  <tab.icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Itens por Página */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[
                  { value: 10, showOnMobile: true },
                  { value: 50, showOnMobile: true },
                  { value: 'TODOS', showOnMobile: true },
                ].map((option) => {
                  const value = option.value === 'TODOS' ? total : (option.value as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handlePageSizeChange(value)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        option.showOnMobile ? '' : 'hidden sm:inline-flex',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option.value} posts por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Botões de ação - Mobile */}
          <div className="flex justify-center gap-3">
            {total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({total})</span>
              </button>
            )}
            <button
              onClick={handleOpenNewPost}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus className="w-5 h-5" />
              <span className="hidden sm:inline">Novo Post</span>
              <span className="sm:hidden">Novo</span>
            </button>
          </div>
        </div>
      )}

      {/* Barra de Seleção em Massa - UI Profissional */}
      {selectionMode && (
        <div
          ref={selectionBarRef}
          className="sticky top-0 z-40 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-gray-100 dark:from-slate-800 to-gray-50 dark:to-slate-800/80 rounded-lg border border-[var(--primary)]/30 shadow-lg backdrop-blur-sm">
            {/* Linha 1: Contador e Ações de Seleção */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/50">
                  <span className="text-lg font-bold text-[var(--primary)]">{selectedIds.length}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {selectedIds.length} {selectedIds.length === 1 ? 'post selecionado' : 'posts selecionados'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {total > selectedIds.length && `${total - selectedIds.length} disponível para seleção`}
                  </p>
                </div>
              </div>

              {/* Botão Deletar Principal */}
              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={!selectedIds.length || isBulkDeleting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isBulkDeleting ? (
                  <>
                    <span>Deletando...</span>
                  </>
                ) : (
                  <>
                    <span>Deletar {selectedIds.length}</span>
                  </>
                )}
              </button>
            </div>

            {/* Linha 2: Ações de Seleção */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-slate-700/50">
              <button
                type="button"
                onClick={handleSelectPageItems}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Página ({posts.length})
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Todos ({total})
              </button>
              <button
                type="button"
                onClick={handleClearSelection}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={handleExitSelectionMode}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div
        ref={tableContainerRef}
        className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-md dark:shadow-none"
      >
        <PostTable
          posts={posts}
          onDelete={handleDeletePost}
          onEdit={handleOpenEditPost}
          isDeletingId={deleteState.isDeletingId}
          statusMessage={deleteState.statusMessage}
          selectable={selectionMode}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {/* Pagination Controls */}
      {total > 0 && (
        <div className="pt-2">
          <PaginationControls
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 20, 50, 'TODOS']}
          />
        </div>
      )}

      {/* Modal de Criação/Edição */}
      {isModalOpen && (
        <PostFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleModalSuccess}
          initialData={editingPost ? { 
            ...editingPost, 
            content: editingPost.content || '', 
            categoryId: editingPost.categoryId || '',
            authorId: editingPost.authorId || '',
            tags: editingPost.tags || '',
            featuredImageUrl: editingPost.featuredImageUrl,
            featuredImageId: editingPost.featuredImageId,
          } : undefined}
        />
      )}
    </div>
  );
}