import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminDashboardLayout } from '@/components/layouts/admin-dashboard-layout';
import { UserProvider } from '@/contexts/UserContext';
import { UIProvider } from '@/contexts/UIContext';
import type { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Admin SaaS - Concurso Na Veia',
  description: 'Gerenciamento do SaaS Concurso Na Veia',
};

export default async function SaaSAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Verificar se é admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/'); // Redireciona usuários comuns para a home
  }

  return (
    <UserProvider>
      <UIProvider>
        <AdminDashboardLayout>
          {children}
        </AdminDashboardLayout>
      </UIProvider>
    </UserProvider>
  );
}
