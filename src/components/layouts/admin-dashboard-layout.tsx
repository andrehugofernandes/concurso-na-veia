"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  AdminHeader,
  NotificationCountProvider,
} from "@/components/admin/admin-header";
import { MobileBottomNav } from "@/components/admin/mobile-bottom-nav";
import { cn } from "@/lib/utils";
import {
  HeaderStateProvider,
  useHeaderState,
} from "@/contexts/HeaderStateContext";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detectar se está dentro de uma aula ou do PetroLingo
  const isInsideLesson = (() => {
    const segments = (pathname || "").split("/").filter(Boolean);
    const isPetroLingo = segments[0] === "PetroLingo";
    const isLesson = segments[0] === "aulas" && segments.length >= 3;
    return isPetroLingo || isLesson;
  })();

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
          setIsMobileSidebarOpen(false);
        } else {
          setIsSidebarCollapsed(false);
          setIsMobileSidebarOpen(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // Auto-close sidebar overlay quando a rota muda (mobile)
  useEffect(() => {
    if (isMobile && isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      // No mobile: toggle abre/fecha overlay (sidebar sempre colapsada por baixo)
      setIsMobileSidebarOpen((prev) => !prev);
    } else {
      // No desktop: toggle colapsa/expande
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  }, [isMobile, isSidebarCollapsed]);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  return (
    <HeaderStateProvider>
      <NotificationCountProvider>
        <DashboardShell
          isMobile={isMobile}
          isInsideLesson={isInsideLesson}
          isSidebarCollapsed={isSidebarCollapsed}
          isMobileSidebarOpen={isMobileSidebarOpen}
          toggleSidebar={toggleSidebar}
          closeMobileSidebar={closeMobileSidebar}
        >
          {children}
        </DashboardShell>
      </NotificationCountProvider>
    </HeaderStateProvider>
  );
}

/**
 * Componente interno que consome o HeaderStateContext.
 * Necessário porque AdminDashboardLayout provê o HeaderStateProvider,
 * então não pode consumir isStickyNavPinned diretamente.
 */
function DashboardShell({
  children,
  isMobile,
  isInsideLesson,
  isSidebarCollapsed,
  isMobileSidebarOpen,
  toggleSidebar,
  closeMobileSidebar,
}: {
  children: ReactNode;
  isMobile: boolean;
  isInsideLesson: boolean;
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
}) {
  const { isStickyNavPinned } = useHeaderState();

  // Sidebar colapsa automaticamente ao entrar no PetroLingo ou numa aula
  // Mobile: some completamente. Desktop: colapsa para ícone.
  const shouldHideSidebar =
    (isMobile && isInsideLesson && !isMobileSidebarOpen) ||
    (!isMobile && isInsideLesson && isStickyNavPinned && !isSidebarCollapsed);

  return (
    <div
      className="min-h-screen bg-white dark:bg-background"
      suppressHydrationWarning
      style={
        {
          "--sidebar-width": isMobile
            ? shouldHideSidebar ? "0px" : "56px"
            : isInsideLesson && !isMobileSidebarOpen
              ? isSidebarCollapsed ? "80px" : "80px"
              : isSidebarCollapsed
                ? "80px"
                : "256px",
        } as React.CSSProperties
      }
    >
      {/* Sidebar - no PetroLingo/aulas, colapsa automaticamente no desktop */}
      <AdminSidebar
        isCollapsed={isMobile ? !isMobileSidebarOpen : (isInsideLesson ? true : isSidebarCollapsed)}
        isHidden={isMobile && isInsideLesson && !isMobileSidebarOpen}
        isOverlayOpen={isMobileSidebarOpen && isMobile}
        onNavigate={closeMobileSidebar}
      />

      {/* Backdrop escuro para overlay da sidebar no mobile */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Content - sem margem no PetroLingo/aulas mobile; colapsa no desktop */}
      <div
        className={cn(
          "transition-all duration-300",
          isMobile
            ? isInsideLesson
              ? "ml-0" // Mobile + PetroLingo/aulas: sidebar some, full width
              : "ml-14" // Mobile normal: margem da sidebar colapsada
            : isInsideLesson
              ? "md:ml-20" // Desktop + PetroLingo/aulas: sidebar colapsa para ícone
              : isSidebarCollapsed
                ? "md:ml-20"
                : "ml-64",
        )}
      >
        {/* Header */}
        <AdminHeader
          onMenuToggle={toggleSidebar}
          isSidebarCollapsed={isMobile ? true : isSidebarCollapsed}
          isMobileSidebarOpen={isMobileSidebarOpen && isMobile}
        />

        {/* ⚠️ IMUTÁVEL: md:p-0 é obrigatório — qualquer padding aqui quebra o StickyModuleNav */}
        <main className="py-4 px-2 sm:py-6 sm:px-4 md:p-0 pb-20 sm:pb-6 relative w-full">
          {children}
        </main>
        <ScrollToTop />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
