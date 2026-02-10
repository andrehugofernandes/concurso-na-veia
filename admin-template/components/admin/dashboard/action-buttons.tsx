'use client';

import { UserPlus, FileUp, FolderPlus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedBorderCard } from '@/components/ui/animated-border-card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserForm } from '@/components/admin/forms/user-form';
import { CategoryForm as CategoriesModalForm } from '@/components/admin/categories/category-form';
import { FileUploadForm } from '@/components/admin/forms/file-upload-form';

// Definição dos botões de ação rápida com controle de acesso
const getActions = (isSysadmin: boolean, isAdmin: boolean, isCoordenador: boolean) => {
  // Ações comuns para todos os usuários
  const commonActions = [
    {
      label: 'Fazer Upload',
      icon: FileUp,
      key: 'upload'
    },
  ];

  // Ação para ADMIN e COORDENADOR
  const categoryAction = [
    {
      label: 'Criar Categoria',
      icon: FolderPlus,
      key: 'category'
    },
  ];

  // Ação exclusiva para ADMIN
  const sysadminActions = [
    {
      label: 'Criar Novo Usuário',
      icon: UserPlus,
      key: 'user'
    },
  ];

  // Ação para ADMIN e COORDENADOR
  const reportAction = [
    {
      label: 'Relatório',
      icon: FileText,
      key: 'report'
    },
  ];

  // Combinar ações com base na role
  let actions = [...commonActions, ...categoryAction];
  
  if (isSysadmin) {
    actions = [...sysadminActions, ...actions, ...reportAction];
  } else if (isAdmin) {
    actions = [...actions, ...reportAction];
  } else if (isCoordenador) {
    actions = [...actions, ...reportAction];
  }
  
  return actions;
};

const cardStyle = "shadow-lg rounded-lg border-none overflow-hidden bg-white dark:bg-gray-800";

export function ActionButtons() {
  const { user } = useAuth();
  const router = useRouter();
  const role = (user?.role ?? '').toUpperCase();
  const isSysadmin = role === 'SYSADMIN';
  const isAdmin = role === 'ADMIN';
  const isCoordenador = role === 'COORDENADOR';
  
  const actions = getActions(isSysadmin, isAdmin || isSysadmin, isCoordenador);
  const [openUser, setOpenUser] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <AnimatedBorderCard>
      <Card className={cn(cardStyle, 'animate-fade-in-up border border-gray-200 dark:border-gray-700')}>
        <CardHeader className="p-6 pb-2">
          <CardTitle>Ações Rápidas</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Acesse as principais funcionalidades do sistema
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className={`grid grid-cols-1 ${isSysadmin ? 'md:grid-cols-4' : (isAdmin ? 'md:grid-cols-3' : isCoordenador ? 'md:grid-cols-3' : 'md:grid-cols-2')} gap-4`}>
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.key}
                  className="text-white h-20 flex flex-col space-y-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:ring-[var(--primary)]"
                  variant="default"
                  aria-label={action.label}
                  onClick={() => {
                    if (action.key === 'user') setOpenUser(true);
                    if (action.key === 'upload') setOpenUpload(true);
                    if (action.key === 'category') setOpenCategory(true);
                    if (action.key === 'report') router.push('/admin/relatorios');
                  }}
                >
                  <Icon size={24} />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
        {/* Modais */}
        <UserForm open={openUser} onClose={() => setOpenUser(false)} />
        <FileUploadForm open={openUpload} onClose={() => setOpenUpload(false)} />
        <CategoriesModalForm
          open={openCategory}
          onClose={() => setOpenCategory(false)}
          onSaved={() => {}}
          editData={null}
        />
      </Card>
    </AnimatedBorderCard>
  );
}
