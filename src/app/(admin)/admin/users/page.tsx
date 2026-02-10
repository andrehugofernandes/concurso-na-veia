'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const cardStyle = "shadow-lg rounded-lg border-none overflow-hidden bg-white dark:bg-gray-800";

export default function UsersPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [hasRedirected, setHasRedirected] = useState(false);

  const role = useMemo(() => (user?.role ?? '').toUpperCase(), [user?.role]);
  const canAccess = role === 'ADMIN' || role === 'COORDENADOR';

  useEffect(() => {
    if (isLoading || hasRedirected) return;

    if (!canAccess) {
      toast({
        title: 'Acesso restrito',
        description: 'Seu perfil não possui permissão para acessar a gestão de usuários. Você foi redirecionado para o dashboard.',
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gestão de Usuários
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie usuários, perfis e permissões de acesso
        </p>
      </div>
      
      <Card className={cn("col-span-4", cardStyle)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <div>
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>Gerencie os usuários do sistema</CardDescription>
          </div>
          <Users className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="p-8 text-center text-gray-500">
            <p>Página de gerenciamento de usuários em desenvolvimento</p>
            <p className="text-sm mt-2">Implementação completa em breve</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
