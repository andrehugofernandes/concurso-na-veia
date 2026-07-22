import React from 'react';
import type { Metadata } from 'next';
import { AdminDashboardLayout } from '@/components/layouts/admin-dashboard-layout';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Dashboard - Concurso Na Veia',
  description: 'Gerenciamento do Concurso Na Veia',
};

import { UserProvider } from '@/contexts/UserContext';
import { UIProvider } from '@/contexts/UIContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <UIProvider>
        <AdminDashboardLayout>{children}</AdminDashboardLayout>
      </UIProvider>
    </UserProvider>
  );
}
