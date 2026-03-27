'use client';

import { useState } from 'react';
import {
  LuPencil,
  LuShield,
  LuCheck,
  LuEye,
  LuArrowUp,
  LuArrowDown,
  LuCircle,
  LuCheckCircle,
} from 'react-icons/lu';
import { cn } from '@/lib/utils';
import type { UserData } from '@/app/(dashboard)/users/actions';
import { toggleUserActive } from '@/app/(dashboard)/users/actions';
import { useRouter } from 'next/navigation';

interface UserTableProps {
  users: UserData[];
  currentUserId?: string;
  onEditUser: (user: UserData) => void;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

const roleConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  admin: { label: 'Admin', icon: LuShield, color: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30' },
  editor: { label: 'Editor', icon: LuCheck, color: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30' },
  viewer: { label: 'Viewer', icon: LuEye, color: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30' },
};

function SortIcon({ column, sortColumn, sortDirection }: { column: string; sortColumn?: string; sortDirection?: 'asc' | 'desc' }) {
  if (sortColumn !== column) return null;
  return sortDirection === 'asc' ? (
    <LuArrowUp className="h-3 w-3 inline ml-1" />
  ) : (
    <LuArrowDown className="h-3 w-3 inline ml-1" />
  );
}

export function UserTable({
  users,
  currentUserId,
  onEditUser,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  sortColumn,
  sortDirection,
  onSort,
}: UserTableProps) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggleActive = async (userId: string) => {
    setTogglingId(userId);
    try {
      await toggleUserActive({ id: userId });
      router.refresh();
    } finally {
      setTogglingId(null);
    }
  };

  const handleCheckboxChange = (userId: string) => {
    if (!onSelectionChange) return;
    const isSelected = selectedIds.includes(userId);
    if (isSelected) {
      onSelectionChange(selectedIds.filter((id) => id !== userId));
    } else {
      onSelectionChange([...selectedIds, userId]);
    }
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    const allSelected = users.every((u) => selectedIds.includes(u.id));
    if (allSelected) {
      onSelectionChange(selectedIds.filter((id) => !users.find((u) => u.id === id)));
    } else {
      const newIds = new Set([...selectedIds, ...users.map((u) => u.id)]);
      onSelectionChange(Array.from(newIds));
    }
  };

  if (!users.length) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-slate-400">
        <LuEye className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p className="text-lg font-medium">Nenhum usuário encontrado</p>
        <p className="text-sm">Tente ajustar os filtros de busca.</p>
      </div>
    );
  }

  const allPageSelected = users.every((u) => selectedIds.includes(u.id));

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-700">
            {selectable && (
              <th className="w-10 px-3 py-3">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="flex items-center justify-center"
                  aria-label="Selecionar todos"
                >
                  {allPageSelected ? (
                    <LuCheckCircle className="h-5 w-5 text-[var(--primary)]" />
                  ) : (
                    <LuCircle className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                  )}
                </button>
              </th>
            )}
            <th
              className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-slate-100 select-none"
              onClick={() => onSort?.('username')}
            >
              Usuário
              <SortIcon column="username" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th
              className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-slate-100 select-none hidden md:table-cell"
              onClick={() => onSort?.('role')}
            >
              Role
              <SortIcon column="role" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th
              className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-slate-100 select-none hidden lg:table-cell"
              onClick={() => onSort?.('isActive')}
            >
              Status
              <SortIcon column="isActive" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th
              className="text-left px-4 py-3 font-semibold text-gray-700 dark:text-slate-300 cursor-pointer hover:text-gray-900 dark:hover:text-slate-100 select-none hidden xl:table-cell"
              onClick={() => onSort?.('createdAt')}
            >
              Criado em
              <SortIcon column="createdAt" sortColumn={sortColumn} sortDirection={sortDirection} />
            </th>
            <th className="text-right px-4 py-3 font-semibold text-gray-700 dark:text-slate-300">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
          {users.map((user) => {
            const role = roleConfig[user.role] || roleConfig.viewer;
            const RoleIcon = role.icon;
            const isCurrentUser = user.id === currentUserId;
            const isSelected = selectedIds.includes(user.id);

            return (
              <tr
                key={user.id}
                className={cn(
                  'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors',
                  isSelected && 'bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10',
                  isCurrentUser && 'ring-1 ring-inset ring-[var(--primary)]/20'
                )}
              >
                {selectable && (
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => handleCheckboxChange(user.id)}
                      className="flex items-center justify-center"
                      aria-label={`Selecionar ${user.username}`}
                    >
                      {isSelected ? (
                        <LuCheckCircle className="h-5 w-5 text-[var(--primary)]" />
                      ) : (
                        <LuCircle className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                      )}
                    </button>
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold text-sm shrink-0">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-slate-100 truncate">
                        {user.username}
                        {isCurrentUser && (
                          <span className="ml-1.5 text-xs text-[var(--primary)]">(você)</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={cn('inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium', role.color)}>
                    <RoleIcon className="h-3 w-3" />
                    {role.label}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium',
                      user.isActive
                        ? 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30'
                        : 'text-gray-500 bg-gray-100 dark:text-slate-400 dark:bg-slate-700'
                    )}
                  >
                    <span className={cn('w-1.5 h-1.5 rounded-full', user.isActive ? 'bg-emerald-500' : 'bg-gray-400')} />
                    {user.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-slate-400 text-xs hidden xl:table-cell">
                  {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(user.id)}
                      disabled={togglingId === user.id || isCurrentUser}
                      className={cn(
                        'px-2.5 py-1 rounded-md text-xs font-medium transition-colors border',
                        user.isActive
                          ? 'border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20'
                          : 'border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20',
                        (togglingId === user.id || isCurrentUser) && 'opacity-50 cursor-not-allowed'
                      )}
                      title={user.isActive ? 'Desativar' : 'Ativar'}
                    >
                      {togglingId === user.id ? '...' : user.isActive ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onEditUser(user)}
                      className="p-1.5 rounded-md text-gray-500 hover:text-[var(--primary)] hover:bg-gray-100 dark:text-slate-400 dark:hover:text-[var(--primary)] dark:hover:bg-slate-700 transition-colors"
                      title="Editar usuário"
                    >
                      <LuPencil className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
