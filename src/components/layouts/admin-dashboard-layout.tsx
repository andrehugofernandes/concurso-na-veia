'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { MobileBottomNav } from '@/components/admin/mobile-bottom-nav';
import { cn } from '@/lib/utils';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile e carregar estado do sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      return mobile;
    };

    const mobile = checkMobile();

    // Em mobile, sempre começa colapsado
    // Em desktop, sempre começa expandido (ignora localStorage)
    if (mobile) {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }

    // Listener para resize
    const handleResize = () => {
      const nowMobile = checkMobile();
      if (nowMobile !== isMobile) {
        if (nowMobile) {
          setIsSidebarCollapsed(true);
        } else {
          setIsSidebarCollapsed(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const toggleSidebar = () => {
    const next = !isSidebarCollapsed;
    setIsSidebarCollapsed(next);
    // Não salva mais no localStorage - estado é baseado apenas no dispositivo
    console.log('[Sidebar Debug] Toggle sidebar:', next ? 'colapsada' : 'expandida');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-background" suppressHydrationWarning>
      {/* Sidebar - fixed position */}
      <AdminSidebar isCollapsed={isSidebarCollapsed} />

      {/* Main Content - margin left to account for sidebar */}
      <div className={cn(
        'transition-all duration-300',
        isSidebarCollapsed ? 'ml-16 md:ml-20' : 'ml-64'
      )}>
        {/* Header */}
        <AdminHeader onMenuToggle={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />

        {/* Page Content - espaçamento balanceado */}
        <main className="py-6 px-4 pb-20 sm:pb-6 md:p-8 relative z-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
