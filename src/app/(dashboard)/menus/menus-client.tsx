'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuMenu,
  LuLoader,
  LuMapPin,
  LuLayoutGrid,
} from 'react-icons/lu';
import { MenuForm } from '@/components/menus/menu-item-form';
import { MenuItemFormModal } from '@/components/menus/menu-item-form-modal';
import { MenuTree } from '@/components/menus/menu-tree';
import { cn } from '@/lib/utils';
import { createMenu, updateMenu, deleteMenu } from './actions';
import type { Menu, MenuItem } from './actions';

interface MenusClientProps {
  initialMenus: Menu[];
  stats: {
    totalMenus: number;
    totalItems: number;
    byLocation: Record<string, number>;
  } | null;
}

const locationLabels: Record<string, string> = {
  primary: 'Menu Principal',
  footer: 'Rodapé',
  sidebar: 'Barra Lateral',
  mobile: 'Menu Mobile',
};

function getLocationLabel(location: string): string {
  return locationLabels[location] || location;
}

export function MenusClient({ initialMenus, stats }: MenusClientProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [addItemParentId, setAddItemParentId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isMenuSelectorFocused, setIsMenuSelectorFocused] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(() => {
    if (initialMenus.length === 0) return null;
    const primaryMenus = initialMenus.filter(
      (m) => m.location === 'primary' || m.name.toLowerCase() === 'menu principal'
    );
    const bestPrimary =
      primaryMenus.length > 0
        ? primaryMenus.reduce((best, current) =>
            (current.items?.length ?? 0) > (best.items?.length ?? 0) ? current : best
          )
        : null;
    return bestPrimary?.id ?? initialMenus[0].id;
  });

  const selectedMenu = useMemo(
    () => initialMenus.find((m) => m.id === selectedMenuId) || null,
    [initialMenus, selectedMenuId]
  );

  const handleCreateMenu = useCallback(
    async (data: { name: string; location: string }) => {
      const result = await createMenu(data);
      return { status: result.status, error: result.error as string | undefined };
    },
    []
  );

  const handleUpdateMenu = useCallback(
    async (data: { name: string; location: string }) => {
      if (!editingMenu) return { status: 'error', error: 'Menu não selecionado' };
      const result = await updateMenu({ id: editingMenu.id, ...data });
      return { status: result.status, error: result.error as string | undefined };
    },
    [editingMenu]
  );

  const handleDeleteMenu = useCallback(
    async (id: number) => {
      if (!confirm('Tem certeza que deseja excluir este menu? Todos os itens serão removidos.')) {
        return;
      }

      setDeletingId(id);
      const result = await deleteMenu(id);
      setDeletingId(null);

      if (result.status === 'error') {
        alert(result.error);
        return;
      }

      router.refresh();
    },
    [router]
  );

  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleAddItem = useCallback((parentId: number | null) => {
    setAddItemParentId(parentId);
    setIsAddItemOpen(true);
  }, []);

  const handleEditItem = useCallback((item: MenuItem) => {
    setEditingItem(item);
  }, []);

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600/15">
                <LuMenu className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.totalMenus}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400">Menus</p>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600/15">
                <LuLayoutGrid className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stats.totalItems}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400">Itens de Menu</p>
              </div>
            </div>
          </div>

          <div className="p-3 md:p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg dark:shadow-none">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600/15">
                <LuMapPin className="h-5 w-5 text-green-500 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                  {Object.keys(stats.byLocation).length}
                </p>
                <p className="text-sm text-gray-500 dark:text-slate-400">Localizações</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions with Menu Selector */}
      <div className="flex items-center justify-between gap-2">
        {/* Menu Selector (if menus exist) - Left side */}
        {initialMenus.length > 0 && (
          <div className="flex items-center gap-3 px-[16px]">
            {/* Desktop: label + select normal */}
            <div className="hidden md:flex items-center gap-3">
              <label htmlFor="menu-select" className="text-sm font-medium text-gray-700 dark:text-slate-300 whitespace-nowrap">
                Selecionar menu:
              </label>
              <select
                id="menu-select"
                value={selectedMenuId ?? ''}
                onChange={(e) => setSelectedMenuId(e.target.value ? Number(e.target.value) : null)}
                className="w-64 px-3 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
              >
                {initialMenus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name} ({getLocationLabel(menu.location)}) - {menu.items.length} itens
                  </option>
                ))}
              </select>
            </div>
            
            {/* Mobile: AnimatedInput como select */}
            <div className="md:hidden w-full">
              <div className="relative" data-testid="mobile-menu-selector">
                <select
                  id="mobile-menu-select"
                  value={selectedMenuId ?? ''}
                  onChange={(e) => {
                    setSelectedMenuId(e.target.value ? Number(e.target.value) : null);
                    setIsMenuSelectorFocused(false);
                  }}
                  onFocus={() => {
                    setIsMenuSelectorFocused(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => setIsMenuSelectorFocused(false), 200);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-label="Selecionar menu"
                  data-testid="mobile-menu-select"
                >
                  {initialMenus.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name} ({getLocationLabel(menu.location)}) - {menu.items.length} itens
                    </option>
                  ))}
                </select>
                
                <div className="relative pointer-events-none">
                  <input
                    type="text"
                    value={isMenuSelectorFocused && selectedMenu ? `${selectedMenu.name} (${getLocationLabel(selectedMenu.location)}) - ${selectedMenu.items.length} itens` : ''}
                    readOnly
                    tabIndex={-1}
                    className="w-full px-[14px] py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:border-gray-300"
                    placeholder="Selecionar menu"
                    data-testid="mobile-menu-input"
                  />
                  <label 
                    className={cn(
                      'pointer-events-none absolute origin-left text-base left-3 bg-white dark:bg-slate-900 px-1 transition-all duration-200 ease-in-out',
                      isMenuSelectorFocused 
                        ? 'top-0 -translate-y-1/2 scale-75' 
                        : 'top-1/2 -translate-y-1/2 scale-100'
                    )}
                    style={{ zIndex: 50 }}
                    data-testid="mobile-menu-label"
                  >
                    <span className={cn(
                      'inline-block rounded px-1 transition-colors',
                      isMenuSelectorFocused 
                        ? 'border border-[var(--primary)] text-[var(--primary)]' 
                        : 'border-transparent text-gray-500 dark:text-slate-400'
                    )}>
                      Selecionar menu
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons - Right side */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-colors"
          >
            <LuPlus className="h-4 w-4" />
            Novo Menu
          </button>
        </div>
      </div>

      {/* Menu Management */}
      {initialMenus.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg dark:shadow-none">
          <LuMenu className="h-12 w-12 mx-auto text-gray-400 dark:text-slate-500 mb-4" />
          <p className="text-gray-600 dark:text-slate-400 mb-4">Nenhum menu criado ainda</p>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <LuPlus className="h-4 w-4" />
            Criar primeiro menu
          </button>
        </div>
      ) : selectedMenu ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-lg dark:shadow-none transition-colors">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                {selectedMenu.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                {getLocationLabel(selectedMenu.location)} • {selectedMenu.items.length} itens
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingMenu(selectedMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white disabled:opacity-50"
              >
                <LuPencil className="h-4 w-4" />
                Editar Menu
              </button>
              <button
                type="button"
                onClick={() => handleAddItem(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-colors"
              >
                <LuPlus className="h-4 w-4" />
                Novo Item de Menu
              </button>
              <button
                type="button"
                onClick={() => handleDeleteMenu(selectedMenu.id)}
                disabled={deletingId === selectedMenu.id}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                title="Excluir menu"
                aria-label="Excluir menu"
              >
                {deletingId === selectedMenu.id ? (
                  <LuLoader className="h-5 w-5 animate-spin" />
                ) : (
                  <LuTrash2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
            <MenuTree
              items={selectedMenu.items}
              menuId={selectedMenu.id}
              onEditItem={handleEditItem}
              onAddItem={handleAddItem}
              onRefresh={handleRefresh}
            />
          </div>
        </div>
      ) : null}

      {/* Create Menu Dialog */}
      <MenuForm
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateMenu}
        onSuccess={handleSuccess}
      />

      {/* Edit Menu Dialog */}
      {editingMenu && (
        <MenuForm
          menu={editingMenu}
          isOpen={!!editingMenu}
          onClose={() => setEditingMenu(null)}
          onSubmit={handleUpdateMenu}
          onSuccess={handleSuccess}
        />
      )}

      {/* Add Item Dialog */}
      {selectedMenu && (
        <MenuItemFormModal
          menuId={selectedMenu.id}
          parentId={addItemParentId}
          isOpen={isAddItemOpen}
          onClose={() => {
            setIsAddItemOpen(false);
            setAddItemParentId(null);
          }}
          onSuccess={handleRefresh}
          menus={initialMenus}
        />
      )}

      {/* Edit Item Dialog */}
      {selectedMenu && editingItem && (
        <MenuItemFormModal
          menuId={selectedMenu.id}
          editingItem={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={handleRefresh}
          menus={initialMenus}
        />
      )}
    </div>
  );
}
