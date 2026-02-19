'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Importando os novos componentes administrativos
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader, NotificationCountProvider } from '@/components/admin/admin-header';
// import { ThemeProvider } from '@/components/providers/theme-provider';
// import { MobileBottomNav } from '@/components/admin/mobile-bottom-nav';

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  const [userName, setUserName] = useState('Admin User');
  const [userEmail, setUserEmail] = useState('admin@petrobras.com');
  const [userRole, setUserRole] = useState('ADMIN');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const swipeRef = useRef<HTMLDivElement | null>(null);
  const swipeStart = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    // Detecta viewport para travar sidebar colapsada no mobile
    const mq = window.matchMedia('(max-width: 639px)');
    const apply = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      } else {
        // Em desktop, restaura preferência do localStorage
        if (typeof window !== 'undefined') {
          const savedSidebarState = localStorage.getItem('sidebarCollapsed');
          if (savedSidebarState != null) {
            setIsSidebarCollapsed(savedSidebarState === 'true');
          } else {
            setIsSidebarCollapsed(false);
          }
        }
      }
    };
    apply();
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches !== mq.matches) {
        apply();
      } else {
        apply();
      }
    };
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleChange);
      return () => mq.removeEventListener('change', handleChange);
    }
    // Fallback para navegadores antigos
    mq.addListener(handleChange);
    return () => {
      mq.removeListener(handleChange);
    };
  }, []);

  // Atualiza dados do usuário quando mudar
  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
      setUserRole(user.role);
    }
  }, []);

  // Função para alternar o estado do sidebar
  const toggleSidebar = () => {
    // No mobile, sidebar deve permanecer sempre colapsada
    if (isMobile) {
      setIsSidebarCollapsed(true);
      return;
    }
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  // Gesto de swipe (desktop): arrasto horizontal curto no canto esquerdo abre/fecha
  useEffect(() => {
    if (!swipeRef.current) return;
    const el = swipeRef.current;
    const onPointerDown = (e: PointerEvent) => {
      if (isMobile) return; // gesto só em desktop
      // apenas iniciar gesto se começar perto da borda esquerda (<= 24px) ou na área do conteúdo
      if (e.clientX > 80 && !isSidebarCollapsed) return; // quando expandido, ignore se não começar próximo a borda
      swipeStart.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    };
    const onPointerUp = (e: PointerEvent) => {
      const s = swipeStart.current;
      swipeStart.current = null;
      if (!s || isMobile) return;
      const dx = e.clientX - s.x;
      const dy = Math.abs(e.clientY - s.y);
      const dt = Date.now() - s.t;
      // gesto válido: rápido (<600ms), predominantemente horizontal e deslocamento suficiente
      if (dt < 600 && Math.abs(dx) > 60 && dy < 40) {
        if (dx > 0) {
          // swipe direita -> expandir
          setIsSidebarCollapsed(false);
          localStorage.setItem('sidebarCollapsed', 'false');
        } else {
          // swipe esquerda -> colapsar
          setIsSidebarCollapsed(true);
          localStorage.setItem('sidebarCollapsed', 'true');
        }
      }
    };
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isMobile, isSidebarCollapsed]);

  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <NotificationCountProvider>
      <div ref={swipeRef} className="flex w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 transition-width duration-300 ${isSidebarCollapsed ? 'w-[80px]' : 'w-[256px]'}`}>
          <AdminSidebar
            isCollapsed={isSidebarCollapsed || isMobile}
            onToggle={toggleSidebar}
            userName={userName}
            userEmail={userEmail}
            userRole={user?.role}
          />
        </div>


        {/* Conteúdo principal */}
        <div
          className={`flex flex-col flex-1 h-full transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : (isSidebarCollapsed ? 'ml-[80px]' : 'ml-[256px]')
            }`}
        >
          {/* Header */}
          <AdminHeader
            userName={userName}
            userEmail={userEmail}
            onMenuToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
          />

          {/* Conteúdo da página */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </NotificationCountProvider>
  );
}
