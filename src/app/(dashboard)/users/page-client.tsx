'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { LuUsers, LuSearch, LuX, LuCheck, LuShield, LuEye } from 'react-icons/lu';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserTable } from '@/components/users/user-table';
import { UserFormModal } from '@/components/users/user-form-modal';
import { TextRoll } from '@/components/core/text-roll';
import { PaginationControls } from '@/components/ui/pagination-controls';
import type { UserData } from './actions';
import { deleteUsersBulk, selectAllUserIds } from './actions';

interface UsersPageClientProps {
  users: UserData[];
  total: number;
  page: number;
  pageSize: number;
  _totalPages: number;
  stats: {
    total: number;
    admins: number;
    editors: number;
    viewers: number;
  };
  currentRole?: string;
  currentSearch?: string;
  currentUserId?: string;
  orderBy?: string;
  orderDir?: string;
}

export function UsersPageClient({
  users,
  total,
  page,
  pageSize,
  _totalPages,
  stats,
  currentRole,
  currentSearch,
  currentUserId,
  orderBy,
  orderDir,
}: UsersPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | undefined>(undefined);
  const [searchValue, setSearchValue] = useState(currentSearch || '');

  // Modo de Seleção
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const selectionBarRef = useRef<HTMLDivElement | null>(null);
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const handleOpenNewUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
    setEditingUser(undefined);
    router.refresh();
  };

  const handleRoleFilter = (role: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (role) {
      params.set('role', role);
    } else {
      params.delete('role');
    }
    params.delete('page');
    router.push(`/admin/users?${params.toString()}`);
  };

  const handleSort = (column: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOrder = params.get('orderBy');
    const currentDir = params.get('orderDir');

    if (currentOrder === column) {
      // Toggle direction
      if (currentDir === 'asc') {
        params.set('orderDir', 'desc');
      } else {
        params.set('orderDir', 'asc');
      }
    } else {
      // New column, default to asc
      params.set('orderBy', column);
      params.set('orderDir', 'asc');
    }

    router.push(`/admin/users?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue.trim()) {
      params.set('search', searchValue.trim());
    } else {
      params.delete('search');
    }
    params.delete('page');
    router.push(`/admin/users?${params.toString()}`);
  };

  const handlePageSizeChange = (size: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', String(size));
    params.delete('page');
    router.push(`/admin/users?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/admin/users?${params.toString()}`);
  };

  // Handlers de Seleção
  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
  };

  const handleSelectPageItems = () => {
    if (!users.length) return;
    setSelectedIds(users.map((user) => user.id));
  };

  const handleSelectAll = async () => {
    if (isBulkDeleting) return;

    const role = searchParams.get('role') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await selectAllUserIds({
      role: role as 'admin' | 'editor' | 'viewer' | undefined,
      search,
    });

    if (result.status === 'success' && result.data) {
      setSelectedIds(result.data.ids);
    }
  };

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
      `Tem certeza que deseja deletar ${selectedIds.length} ${selectedIds.length === 1 ? 'usuário selecionado' : 'usuários selecionados'
      }?`,
    );

    if (!confirmed) return;

    setIsBulkDeleting(true);

    try {
      const result = await deleteUsersBulk(selectedIds);

      if (result.status === 'success' && result.data) {
        handleExitSelectionMode();
        router.refresh();
      } else {
        alert(result.error || 'Erro ao deletar usuários');
      }
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const roleTabs = [
    { key: '', label: 'Todos', icon: LuUsers },
    { key: 'admin', label: 'Administradores', icon: LuShield },
    { key: 'editor', label: 'Editores', icon: LuCheck },
    { key: 'viewer', label: 'Visualizadores', icon: LuEye },
  ];

  return (
    <div className="space-y-6">
      {/* Header: Título + Busca (igual Posts) */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100"><TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Usuários</TextRoll></h1>
          <p className="hidden md:block text-gray-600 dark:text-slate-400 mt-1">Gerencie usuários do dashboard ({total} usuários)</p>
        </div>
        {/* Desktop: Form normal */}
        <form onSubmit={handleSearch} className="hidden md:flex gap-2 flex-1 max-w-md">
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 
              focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
                title="Limpar busca"
              >
                <LuX className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white font-medium transition-colors"
          >
            Buscar
          </button>
        </form>
        {/* Mobile: AnimatedInput com Enter */}
        <form onSubmit={handleSearch} className="md:hidden">
          <div className="relative" data-testid="mobile-search-input">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={(e) => {
                if (!e.target.value) {
                  setIsSearchFocused(false);
                }
              }}
              className="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
              placeholder="Buscar usuários..."
              aria-label="Buscar usuários"
              title="Buscar usuários"
              data-testid="mobile-search-field"
            />
            <label
              className={cn(
                'pointer-events-none absolute origin-left text-base left-3 bg-white dark:bg-slate-900 px-1 transition-all duration-200 ease-in-out z-50',
                isSearchFocused || searchValue
                  ? 'top-0 -translate-y-1/2 scale-75'
                  : 'top-1/2 -translate-y-1/2 scale-100'
              )}
              data-testid="mobile-search-label"
            >
              <span className={cn(
                'inline-block rounded px-1 transition-colors',
                isSearchFocused || searchValue
                  ? 'border border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-gray-500 dark:text-slate-400'
              )}>
                Buscar usuários
              </span>
            </label>
          </div>
        </form>
      </div>

      {/* Stats Cards (igual Posts) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-600/20">
              <LuUsers className="h-5 w-5 text-blue-700 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.total}</p>
              <p className="hidden md:block text-xs text-gray-600 dark:text-slate-400">Total de usuários</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-600/20">
              <LuShield className="h-5 w-5 text-red-700 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700 dark:text-slate-100">{stats.admins}</p>
              <p className="hidden md:block text-xs text-gray-600 dark:text-slate-400">Administradores</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-600/20">
              <LuCheck className="h-5 w-5 text-green-700 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700 dark:text-slate-100">{stats.editors}</p>
              <p className="hidden md:block text-xs text-gray-600 dark:text-slate-400">Editores</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-lg dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-600/20">
              <LuEye className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.viewers}</p>
              <p className="hidden md:block text-xs text-gray-600 dark:text-slate-400">Visualizadores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Controles: Filtros | Itens + Modo Seleção + Botão Novo Usuário (Desktop) */}
      {!selectionMode && (
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Abas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {roleTabs.map((tab) => {
                const isActive = currentRole === tab.key || (currentRole === undefined && tab.key === '');
                return (
                  <button
                    key={tab.key || 'all'}
                    type="button"
                    onClick={() => handleRoleFilter(tab.key || undefined)}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                      isActive
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                    )}
                    aria-label={`Filtrar por ${tab.label.toLowerCase()}${isActive ? ' (ativo)' : ''}`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Itens por página */}
            <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-slate-300">
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[10, 20, 50, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? total : (option as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handlePageSizeChange(value)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option} usuários por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
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
                <span>Modo de Seleção</span>
                <span className="text-xs opacity-75"> ({total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleOpenNewUser}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              + Novo Usuário
            </button>
          </div>
        </div>
      )}

      {/* Barra de Controles: Filtros | Itens + Modo Seleção + Botão Novo Usuário (Mobile) */}
      {!selectionMode && (
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            {/* Abas */}
            <div className="flex flex-wrap justify-center gap-0 p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {roleTabs.map((tab) => {
                const isActive = currentRole === tab.key || (currentRole === undefined && tab.key === '');
                return (
                  <button
                    key={tab.key || 'all'}
                    type="button"
                    onClick={() => handleRoleFilter(tab.key || undefined)}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
                      isActive
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
                    )}
                    aria-label={`Filtrar por ${tab.label.toLowerCase()}${isActive ? ' (ativo)' : ''}`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Itens por página */}
            <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-slate-300">
              <span>Itens:</span>
              <div className="flex items-center gap-1">
                {[10, 20, 50, 'TODOS'].map((option) => {
                  const value = option === 'TODOS' ? total : (option as number);
                  const isActive = value === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handlePageSizeChange(value)}
                      className={cn(
                        'inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      )}
                      aria-label={`${option} usuários por página${isActive ? ' (selecionado)' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {total > 0 && (
              <button
                type="button"
                onClick={() => setSelectionMode(true)}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <span>Modo de Seleção</span>
                <span className="text-xs opacity-75"> ({total})</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleOpenNewUser}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              + Novo Usuário
            </button>
          </div>
        </div>
      )}

      {/* Barra de Seleção em Massa */}
      {selectionMode && (
        <div
          ref={selectionBarRef}
          className="sticky top-0 z-40 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-gray-100 dark:from-slate-800 to-gray-50 dark:to-slate-800/80 rounded-lg border border-[var(--primary)]/30 shadow-lg backdrop-blur-sm">
            {/* Linha 1: Contador e Ações de Seleção */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--primary)]/20">
                  <span className="text-lg font-bold text-[var(--primary)]">{selectedIds.length}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                    {selectedIds.length} {selectedIds.length === 1 ? 'usuário selecionado' : 'usuários selecionados'}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-slate-400">
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
                  <span>Deletando...</span>
                ) : (
                  <span>Deletar {selectedIds.length}</span>
                )}
              </button>
            </div>

            {/* Linha 2: Ações de Seleção */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={handleSelectPageItems}
                disabled={isBulkDeleting}
                className="px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                Página ({users.length})
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
      <div ref={tableContainerRef}>
        <UserTable
          users={users}
          currentUserId={currentUserId}
          onEditUser={handleEditUser}
          selectable={selectionMode}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          sortColumn={orderBy}
          sortDirection={orderDir as 'asc' | 'desc' | undefined}
          onSort={handleSort}
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

      {/* Modal de Criação/Edição - Preserva estado com Activity */}
      <UserFormModal
        user={editingUser}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}


