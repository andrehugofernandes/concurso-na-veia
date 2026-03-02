"use client";

import { useState, useEffect, type ReactNode } from "react";
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
        } else {
          setIsSidebarCollapsed(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <HeaderStateProvider>
      <NotificationCountProvider>
        <DashboardShell
          isMobile={isMobile}
          isInsideLesson={isInsideLesson}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
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
  toggleSidebar,
}: {
  children: ReactNode;
  isMobile: boolean;
  isInsideLesson: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}) {
  const { isStickyNavPinned } = useHeaderState();

  // Sidebar só esconde: mobile + dentro de aula + nav tabs fixou no topo
  // Desktop: NUNCA esconde (isMobile é false)
  const shouldHideSidebar = isMobile && isInsideLesson && isStickyNavPinned;

  return (
    <div
      className="min-h-screen bg-slate-50/50 dark:bg-background"
      suppressHydrationWarning
      style={
        {
          "--sidebar-width": shouldHideSidebar
            ? "0px"
            : isSidebarCollapsed
              ? isMobile
                ? "0px"
                : "80px"
              : "256px",
        } as React.CSSProperties
      }
    >
      {/* Sidebar - fixed position, slides out on mobile when nav tabs pins */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        isHidden={shouldHideSidebar}
      />

      {/* Main Content - margin adjusts with sidebar */}
      <div
        className={cn(
          "transition-all duration-300",
          shouldHideSidebar
            ? "ml-0"
            : isSidebarCollapsed
              ? "ml-16 md:ml-20"
              : "ml-64",
        )}
      >
        {/* Header */}
        <AdminHeader
          onMenuToggle={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Page Content */}
        <main className="py-6 px-4 pb-20 sm:pb-6 md:p-8 relative z-0">
          {children}
        </main>
        <ScrollToTop />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
