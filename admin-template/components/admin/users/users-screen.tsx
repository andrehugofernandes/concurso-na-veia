"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersPage } from "@/components/admin/users/users-page";
import type { UsersPageHandle } from "@/components/admin/users/users-page";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export function UsersScreen() {
  const router = useRouter();
  const usersRef = useRef<UsersPageHandle>(null);
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [hasRedirected, setHasRedirected] = useState(false);

  const role = useMemo(() => (user?.role ?? '').toUpperCase(), [user?.role]);
  const isSysadmin = role === 'SYSADMIN';
  const isAdmin = role === 'ADMIN';
  const canAccess = isSysadmin || isAdmin;

  useEffect(() => {
    if (isLoading || hasRedirected) return;

    if (!canAccess) {
      toast({
        title: 'Acesso restrito',
        description: 'Apenas SYSADMIN e ADMIN podem acessar a gestão de usuários. Você foi redirecionado para o dashboard.',
        className: 'bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-900 dark:text-white dark:border-gray-700',
      });
      router.replace('/admin/dashboard');
      setHasRedirected(true);
    }
  }, [canAccess, hasRedirected, isLoading, router, toast]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-600 dark:text-gray-300">
        Carregando...
      </div>
    );
  }

  if (!canAccess) {
    return null;
  }

  const handleOpenCreate = () => {
    usersRef.current?.openCreate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Usuários</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {(isSysadmin || isAdmin) ? 'Gerencie os usuários do sistema' : 'Visualize os usuários do sistema'}
          </p>
        </div>
        {/* Botão "Novo Usuário" habilitado apenas para SYSADMIN */}
        {isSysadmin && (
          <Button
            onClick={handleOpenCreate}
            className="text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors"
            aria-label="Criar novo usuário"
          >
            <Plus className="h-4 w-4 mr-2" /> Novo Usuário
          </Button>
        )}
      </div>

      <UsersPage ref={usersRef} />
    </div>
  );
}
