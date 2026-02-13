'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LuPlus, LuMenu, LuSettings } from 'react-icons/lu';
import { MenuTree } from '@/components/menus/menu-tree';
import { MenuItemForm, MenuForm } from '@/components/menus/menu-item-form';
import { updateMenu } from '../actions';
import type { Menu, MenuItem } from '../actions';

interface MenuEditorClientProps {
  menu: Menu;
}

export function MenuEditorClient({ menu }: MenuEditorClientProps) {
  const router = useRouter();
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [addItemParentId, setAddItemParentId] = useState<number | null>(null);

  const handleRefresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const handleAddItem = useCallback((parentId: number | null) => {
    setAddItemParentId(parentId);
    setIsAddItemOpen(true);
  }, []);

  const handleEditItem = useCallback((item: MenuItem) => {
    setEditingItem(item);
  }, []);

  const handleUpdateMenu = useCallback(
    async (data: { name: string; location: string }) => {
      const result = await updateMenu({ id: menu.id, ...data });
      return { status: result.status, error: result.error as string | undefined };
    },
    [menu.id]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-600/15 dark:bg-purple-500/10">
            <LuMenu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{menu.name}</h1>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              {menu.items.length} {menu.items.length === 1 ? 'item' : 'itens'} • {menu.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditMenuOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-slate-100 transition-colors"
          >
            <LuSettings className="h-4 w-4" />
            Configurações
          </button>
          <button
            type="button"
            onClick={() => handleAddItem(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition-colors"
          >
            <LuPlus className="h-4 w-4" />
            Adicionar Item
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700 text-sm text-blue-900 dark:text-slate-400">
        <p>
          <strong className="text-blue-950 dark:text-slate-300">Dica:</strong> Arraste os itens para reordená-los.
          Use o botão + para adicionar sub-itens e criar hierarquias.
        </p>
      </div>

      {/* Menu Tree */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
        <MenuTree
          items={menu.items}
          menuId={menu.id}
          onEditItem={handleEditItem}
          onAddItem={handleAddItem}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Add Item Dialog */}
      <MenuItemForm
        menuId={menu.id}
        parentId={addItemParentId}
        isOpen={isAddItemOpen}
        onClose={() => {
          setIsAddItemOpen(false);
          setAddItemParentId(null);
        }}
        onSuccess={handleRefresh}
      />

      {/* Edit Item Dialog */}
      {editingItem && (
        <MenuItemForm
          menuId={menu.id}
          item={editingItem}
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={handleRefresh}
        />
      )}

      {/* Edit Menu Dialog */}
      <MenuForm
        menu={menu}
        isOpen={isEditMenuOpen}
        onClose={() => setIsEditMenuOpen(false)}
        onSubmit={handleUpdateMenu}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
