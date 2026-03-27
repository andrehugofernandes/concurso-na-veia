'use client';

import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import type { UserData } from '@/app/(dashboard)/users/actions';
import { createUser, updateUser } from '@/app/(dashboard)/users/actions';

interface UserFormModalProps {
  user?: UserData;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UserFormModal({ user, isOpen, onClose, onSuccess }: UserFormModalProps) {
  const isEditing = !!user;

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: '',
    role: 'viewer' as 'admin' | 'editor' | 'viewer',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        username: user.username,
        fullName: user.fullName || '',
        password: '',
        role: user.role as 'admin' | 'editor' | 'viewer',
      });
    } else {
      setFormData({ email: '', username: '', fullName: '', password: '', role: 'viewer' });
    }
    setError(null);
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing) {
        const result = await updateUser({
          id: user!.id,
          email: formData.email !== user!.email ? formData.email : undefined,
          username: formData.username !== user!.username ? formData.username : undefined,
          fullName: formData.fullName || undefined,
          password: formData.password || undefined,
          role: formData.role !== user!.role ? formData.role : undefined,
        });
        if (result.status === 'error') {
          setError(result.error || 'Erro ao atualizar usuário');
          return;
        }
      } else {
        if (!formData.password) {
          setError('Senha é obrigatória para novos usuários');
          return;
        }
        const result = await createUser({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          fullName: formData.fullName || undefined,
          role: formData.role,
        });
        if (result.status === 'error') {
          setError(result.error || 'Erro ao criar usuário');
          return;
        }
      }
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100">
            {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="usuario@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              required
              minLength={3}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="nome_de_usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Nome Completo</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Nome Completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Senha {isEditing && <span className="text-xs text-gray-400">(deixe vazio para manter)</span>}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              required={!isEditing}
              minLength={8}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as 'admin' | 'editor' | 'viewer' }))}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            >
              <option value="viewer">Visualizador</option>
              <option value="editor">Editor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                'text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-colors',
                'bg-[var(--primary)] hover:opacity-90 text-white shadow-md',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isSubmitting ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
