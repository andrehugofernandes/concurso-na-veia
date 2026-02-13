'use client';

import { useEffect, useMemo, useRef, useState, useCallback, useTransition } from 'react';
import { LuFolderTree, LuCheck, LuFileText, LuLayers, LuPlus, LuLoader, LuFilter } from 'react-icons/lu';
import { CategoryHierarchyList } from '@/components/categories/category-hierarchy-list';
import { CategoryFormModal } from '@/components/categories/category-form-modal';
import { PaginationControls } from '@/components/ui/pagination-controls';
import {
  CategoryData,
  HierarchyUpdate,
  updateCategoryHierarchy,
  deleteCategory,
  listAllCategories,
} from './actions';
import { cn } from '@/lib/utils';

interface CategoriesHierarchyClientProps {
  initialCategories: CategoryData[];
  stats: {
    total: number;
    rootCategories: number;
    withPosts: number;
    withChildren: number;
  };
  search?: string;
  contentFilter?: string;
  hierarchyFilter?: string;
}

export function CategoriesHierarchyClient({
  initialCategories,
  stats,
  search: initialSearch,
  contentFilter: initialContentFilter,
  hierarchyFilter: initialHierarchyFilter,
}: CategoriesHierarchyClientProps) {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<CategoryData[]>(initialCategories);
  const [contentFilter, setContentFilter] = useState(initialContentFilter || 'ALL');
  const [hierarchyFilter, setHierarchyFilter] = useState(initialHierarchyFilter || 'ALL');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [error, setError] = useState<string | null>(null);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const selectionBarRef = useRef<HTMLDivElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const search = initialSearch || '';

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | undefined>(undefined);

  // Reload categories
  const reloadCategories = useCallback(() => {
    startTransition(async () => {
      const result = await listAllCategories();
      if (result.status === 'success' && result.data) {
        setCategories(result.data);
      }
    });
  }, []);

  const computedStats = useMemo(() => {
    if (!categories.length) return stats;
    const total = categories.length;
    const rootCategories = categories.filter((c) => !c.parentId).length;
    const withPosts = categories.filter((c) => c.postsCount > 0).length;
    const withChildren = categories.filter((c) => c.childrenCount > 0).length;
    return { total, rootCategories, withPosts, withChildren };
  }, [categories, stats]);

  const totalSelectable = useMemo(
    () => categories.filter((category) => category.childrenCount === 0).length,
    [categories]
  );

  // Filter categories
  const filteredCategories = categories.filter((cat) => {
    // Search filter
    if (search) {
      const needle = search.toLowerCase();
      if (!cat.name.toLowerCase().includes(needle) &&
        !(cat.description || '').toLowerCase().includes(needle)) {
        return false;
      }
    }

    // Content filter
    if (contentFilter === 'WITH_POSTS' && cat.postsCount === 0) return false;
    if (contentFilter === 'WITHOUT_POSTS' && cat.postsCount > 0) return false;

    // Hierarchy filter
    if (hierarchyFilter === 'PARENT_ONLY' && cat.parentId) return false;
    if (hierarchyFilter === 'WITH_CHILDREN') {
      const hasChildren = categories.some(c => c.parentId === cat.id);
      if (!hasChildren && !cat.parentId) return false;
    }

    return true;
  });

  const totalSelectableFiltered = useMemo(
    () => filteredCategories.filter((category) => category.childrenCount === 0).length,
    [filteredCategories]
  );

  // Build hierarchy for pagination
  const parents = filteredCategories.filter(c => !c.parentId);
  const totalParents = parents.length;
  const pagedParents = parents.slice((page - 1) * pageSize, page * pageSize);
  const pagedParentIds = new Set(pagedParents.map(p => p.id));

  // Include children of paged parents
  const displayCategories = filteredCategories.filter(cat =>
    pagedParentIds.has(cat.id) || (cat.parentId && pagedParentIds.has(cat.parentId))
  );

  const activeFilterTab = useMemo(() => {
    if (contentFilter !== 'ALL') {
      return `content:${contentFilter}`;
    }
    if (hierarchyFilter !== 'ALL') {
      return `hierarchy:${hierarchyFilter}`;
    }
    return 'all';
  }, [contentFilter, hierarchyFilter]);

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  const handleSelectPageItems = useCallback(() => {
    if (!displayCategories.length) return;
    const selectableIds = displayCategories
      .filter((category) => category.childrenCount === 0)
      .map((category) => String(category.id));
    setSelectedIds(selectableIds);
  }, [displayCategories]);

  const handleSelectAll = useCallback(() => {
    const selectableIds = filteredCategories
      .filter((category) => category.childrenCount === 0)
      .map((category) => String(category.id));
    setSelectedIds(selectableIds);
  }, [filteredCategories]);

  const handleClearSelection = useCallback(() => {
    setSelectedIds([]);
    setSelectionMode(false);
  }, []);

  useEffect(() => {
    if (!selectionMode) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const isInsideSelectionBar = selectionBarRef.current?.contains(target) ?? false;
      const isInsideList = listContainerRef.current?.contains(target) ?? false;

      if (isInsideSelectionBar || isInsideList) {
        return;
      }

      handleClearSelection();
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [handleClearSelection, selectionMode]);

  const handleDeleteSelected = useCallback(async () => {
    if (!selectedIds.length || isBulkDeleting) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja deletar ${selectedIds.length} ${selectedIds.length === 1 ? 'categoria selecionada' : 'categorias selecionadas'
      }?`
    );

    if (!confirmed) return;

    setError(null);
    setIsBulkDeleting(true);

    try {
      const numericIds = selectedIds
        .map((id) => Number(id))
        .filter((value) => Number.isInteger(value) && value > 0);

      if (!numericIds.length) {
        return;
      }

      for (const id of numericIds) {
        const result = await deleteCategory({ id });
        if (result.status !== 'success') {
          setError(result.error || 'Erro ao excluir categorias selecionadas');
          break;
        }
      }

      setSelectedIds([]);
      setSelectionMode(false);
      reloadCategories();
    } finally {
      setIsBulkDeleting(false);
    }
  }, [isBulkDeleting, reloadCategories, selectedIds]);

  // Handlers
  const handleEdit = useCallback((category: CategoryData) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(async (category: CategoryData) => {
    if (!window.confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) {
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await deleteCategory({ id: category.id });
      if (result.status === 'success') {
        reloadCategories();
      } else {
        setError(result.error || 'Erro ao excluir categoria');
      }
    });
  }, [reloadCategories]);

  const handleAddSubcategory = useCallback((_parentId: number) => {
    // Por enquanto, abre o modal de criação sem parentId pré-definido
    // TODO: Adicionar suporte a defaultParentId no CategoryFormModal
    setEditingCategory(undefined);
    setIsModalOpen(true);
  }, []);

  const handleHierarchyChange = useCallback(async (updates: HierarchyUpdate[]) => {
    setError(null);
    const result = await updateCategoryHierarchy({ updates });
    if (result.status === 'success') {
      reloadCategories();
    } else {
      setError(result.error || 'Erro ao atualizar hierarquia');
    }
  }, [reloadCategories]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setEditingCategory(undefined);
    reloadCategories();
  }, [reloadCategories]);

  const handleCreateNew = useCallback(() => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600/20">
              <LuFolderTree className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{computedStats.total}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Total de categorias</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-600/20">
              <LuCheck className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{computedStats.rootCategories}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Categorias principais</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-600/20">
              <LuFileText className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{computedStats.withPosts}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Com posts</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 bg-white dark:bg-slate-800 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-600/20">
              <LuLayers className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{computedStats.withChildren}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Com subcategorias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header de Filtros e Controles (Desktop) */}
      {!selectionMode && (
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Abas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {([
                { id: 'all', label: 'Todas', icon: LuFilter, content: 'ALL', hierarchy: 'ALL' },
                { id: 'content:WITH_POSTS', label: 'Com posts', icon: LuFileText, content: 'WITH_POSTS', hierarchy: 'ALL' },
                { id: 'content:WITHOUT_POSTS', label: 'Sem posts', icon: LuCheck, content: 'WITHOUT_POSTS', hierarchy: 'ALL' },
                { id: 'hierarchy:PARENT_ONLY', label: 'Principais', icon: LuFolderTree, content: 'ALL', hierarchy: 'PARENT_ONLY' },
                { id: 'hierarchy:WITH_CHILDREN', label: 'Com subcategorias', icon: LuLayers, content: 'ALL', hierarchy: 'WITH_CHILDREN' },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setContentFilter(tab.content);
                    setHierarchyFilter(tab.hierarchy);
                    setPage(1);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    activeFilterTab === tab.id
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
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[10, 50, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? totalParents : (option as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setPageSize(value);
                        setPage(1);
                      }}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option} categorias por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {computedStats.total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({computedStats.total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <LuPlus className="h-4 w-4" />
              Nova Categoria
            </button>
          </div>
        </div>
      )}

      {/* Header de Filtros e Controles (Mobile) */}
      {!selectionMode && (
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            {/* Abas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {([
                { id: 'all', label: 'Todas', icon: LuFilter, content: 'ALL', hierarchy: 'ALL' },
                { id: 'content:WITH_POSTS', label: 'Com posts', icon: LuFileText, content: 'WITH_POSTS', hierarchy: 'ALL' },
                { id: 'content:WITHOUT_POSTS', label: 'Sem posts', icon: LuCheck, content: 'WITHOUT_POSTS', hierarchy: 'ALL' },
                { id: 'hierarchy:PARENT_ONLY', label: 'Principais', icon: LuFolderTree, content: 'ALL', hierarchy: 'PARENT_ONLY' },
                { id: 'hierarchy:WITH_CHILDREN', label: 'Com subcategorias', icon: LuLayers, content: 'ALL', hierarchy: 'WITH_CHILDREN' },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setContentFilter(tab.content);
                    setHierarchyFilter(tab.hierarchy);
                    setPage(1);
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                    activeFilterTab === tab.id
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
                {[10, 50, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? totalParents : (option as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setPageSize(value);
                        setPage(1);
                      }}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option} categorias por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {computedStats.total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção </span>
                <span className="text-xs opacity-75">({computedStats.total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <LuPlus className="h-4 w-4" />
              Nova Categoria
            </button>
          </div>
        </div>
      )}


      {selectionMode && (
        <div
          ref={selectionBarRef}
          className="sticky top-0 z-40 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-gray-100 dark:from-slate-800 to-gray-50 dark:to-slate-800/80 rounded-lg border border-[var(--primary)]/30 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/50">
                  <span className="text-lg font-bold text-[var(--primary)]">{selectedIds.length}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {selectedIds.length} {selectedIds.length === 1 ? 'categoria selecionada' : 'categorias selecionadas'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {totalSelectable > selectedIds.length && `${totalSelectable - selectedIds.length} disponível para seleção`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={!selectedIds.length || isBulkDeleting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {isBulkDeleting ? 'Deletando...' : `Deletar ${selectedIds.length}`}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={handleSelectPageItems}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Página ({displayCategories.filter((category) => category.childrenCount === 0).length})
              </button>
              <button
                type="button"
                onClick={handleSelectAll}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Todos ({totalSelectableFiltered})
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Limpar Seleção
              </button>
              <button
                type="button"
                onClick={handleClearSelection}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400" role="alert">
          {error}
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-2 text-red-300 hover:text-red-200"
            aria-label="Fechar alerta"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center justify-center py-4">
          <LuLoader className="h-6 w-6 animate-spin text-[var(--primary)]" />
        </div>
      )}

      <div
        ref={listContainerRef}
        className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-md dark:shadow-none p-4"
      >
        {!isPending && (
          <CategoryHierarchyList
            categories={displayCategories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddSubcategory={handleAddSubcategory}
            onHierarchyChange={handleHierarchyChange}
            allowReorder={true}
            canEdit={!selectionMode}
            canDelete={!selectionMode}
            isLoading={false}
            selectable={selectionMode}
            selectedIds={selectedIds}
            onSelectionChange={handleSelectionChange}
          />
        )}
      </div>

      {/* Pagination */}
      {totalParents > 0 && (
        <div className="pt-2">
          <PaginationControls
            page={page}
            pageSize={pageSize}
            total={totalParents}
            onPageChange={setPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(1);
            }}
            pageSizeOptions={[10, 20, 50, 100, 'TODOS']}
          />
        </div>
      )}

      {/* Category Form Modal */}
      <CategoryFormModal
        category={editingCategory}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}


