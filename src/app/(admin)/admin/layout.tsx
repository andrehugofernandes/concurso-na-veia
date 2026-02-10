'use client';

import { AdminDashboardLayout } from '@/components/admin/admin-dashboard-layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
