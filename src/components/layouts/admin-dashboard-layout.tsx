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

  // Detectar se está dentro de uma aula (rota /aulas/[materia]/[topico])
  const isInsideLesson = (() => {
    const segments = (pathname || "").split("/").filter(Boolean);
    return segments[0] === "aulas" && segments.length >= 3;
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

  // Sidebar esconde completamente apenas dentro de aulas com nav sticky no mobile
  const shouldHideSidebar =
    isMobile && isInsideLesson && isStickyNavPinned && !isMobileSidebarOpen;

  return (
    <div
      className="min-h-screen bg-white dark:bg-background"
      suppressHydrationWarning
      style={
        {
          "--sidebar-width": shouldHideSidebar
            ? "0px"
            : isSidebarCollapsed
              ? isMobile
                ? "56px"
                : "80px"
              : "256px",
        } as React.CSSProperties
      }
    >
      {/* Sidebar - always visible collapsed on mobile, overlay when open */}
      <AdminSidebar
        isCollapsed={isMobile ? !isMobileSidebarOpen : isSidebarCollapsed}
        isHidden={shouldHideSidebar}
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

      {/* Main Content - margin fixa no mobile (colapsada), ajusta no desktop */}
      <div
        className={cn(
          "transition-all duration-300",
          shouldHideSidebar
            ? "ml-0"
            : isMobile
              ? "ml-14" // Mobile: sempre margem fixa da sidebar colapsada (w-14)
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
