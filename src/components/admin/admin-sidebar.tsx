"use client";

import Link from "next/link";
// import Image from "next/image"; // Removed as per instruction
import { usePathname } from "next/navigation";
import {
  LuLayoutDashboard,
  LuFileText,
  LuFile,
  LuImage,
  LuFolderTree,
  LuList,
  LuLayers,
  LuMessageSquare,
  LuUsers,
  LuBell,
  LuDatabase,
  LuShieldCheck,
  LuSettings,
  LuBookOpen,
  LuFileQuestion,
  LuHistory,
  LuTrophy,
  LuLifeBuoy,
  LuZap,
  LuFlame,
  LuTarget,
  LuCrown,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

import { useUser } from "@/contexts/UserContext";

interface AdminSidebarProps {
  isCollapsed: boolean;
  isHidden?: boolean;
  isOverlayOpen?: boolean;
  onNavigate?: () => void;
  userRole?: string;
  onToggle?: () => void;
  userName?: string;
  userEmail?: string;
  userPlan?: string;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number | string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Menu items organizados por seções temáticas (Merged: Project + Reference)
const ALL_MENU_SECTIONS: MenuSection[] = [
  {
    title: "Estudo",
    items: [
      { id: "aulas", label: "Aulas", href: "/aulas", icon: LuBookOpen },
      { id: "petrolingo", label: "PetroLingo", href: "/aulas/ingles/petrolingo", icon: LuCrown, badge: "ELITE TOTAL" },
      {
        id: "simulados",
        label: "Simulados Rápidos",
        href: "/simulado-rapido",
        icon: LuFileQuestion,
      },
      {
        id: "simulado-especifico",
        label: "Simulados Específicos",
        href: "/simulado-especifico",
        icon: LuTarget,
      },
      {
        id: "maratona-100",
        label: "Maratona 100",
        href: "/maratona-100",
        icon: LuFlame,
      },
      {
        id: "historico",
        label: "Histórico",
        href: "/historico",
        icon: LuHistory,
      },
      { id: "rankings", label: "Rankings", href: "/rankings", icon: LuTrophy },
    ],
  },
  {
    title: "Conteúdo",
    items: [
      {
        id: "posts",
        label: "Posts",
        href: "/dashboard/posts",
        icon: LuFileText,
      },
      { id: "pages", label: "Páginas", href: "/dashboard/pages", icon: LuFile },
      {
        id: "categories",
        label: "Categorias",
        href: "/dashboard/categories",
        icon: LuFolderTree,
      },
      { id: "media", label: "Mídia", href: "/dashboard/media", icon: LuImage },
    ],
  },
  {
    title: "Gerenciar",
    items: [
      { id: "menus", label: "Menus", href: "/dashboard/menus", icon: LuList },
      {
        id: "comments",
        label: "Comentários",
        href: "/dashboard/comments",
        icon: LuMessageSquare,
        badge: 5,
      },
      {
        id: "users",
        label: "Usuários",
        href: "/dashboard/users",
        icon: LuUsers,
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        id: "cta-popups",
        label: "CTA Popups",
        href: "/dashboard/cta-popups",
        icon: LuBell,
      },
      {
        id: "accordions",
        label: "Acordeons",
        href: "/dashboard/accordions",
        icon: LuLayers,
      },
      {
        id: "image-galleries",
        label: "Galeria de Imagens",
        href: "/dashboard/image-galleries",
        icon: LuImage,
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        id: "backups",
        label: "Backups",
        href: "/dashboard/backups",
        icon: LuDatabase,
      },
      {
        id: "audit-logs",
        label: "Auditoria",
        href: "/dashboard/audit-logs",
        icon: LuShieldCheck,
      },
      {
        id: "settings",
        label: "Configurações",
        href: "/dashboard/settings",
        icon: LuSettings,
      },
    ],
  },
];

export function AdminSidebar({
  isCollapsed,
  isHidden,
  isOverlayOpen,
  onNavigate,
  userRole,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { profile } = useUser();
  const isAdmin = profile?.role === "ADMIN" || profile?.role === "SYSADMIN" || userRole === "ADMIN";
  const userPlan = profile?.plan?.toLowerCase() || "";

  // Filtra as seções e itens com base no cargo (role) e plano
  // O PetroLingo é exclusivo para Admin ou Plano Ouro/Elite
  const menuSections = ALL_MENU_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      if (item.id === "petrolingo") {
        const hasAccess = isAdmin || userPlan === "elite-total" || userPlan === "ouro";
        return hasAccess;
      }
      return true;
    }),
  })).filter((section) => {
    if (isAdmin) return true;
    return section.title === "Estudo" && section.items.length > 0;
  });

  // Adiciona a seção de Suporte para o usuário comum se não for admin
  if (!isAdmin) {
    menuSections.push({
      title: "Suporte",
      items: [
        { id: "seja-pro", label: "Seja Pro", href: "/seja-pro", icon: LuZap },
        {
          id: "tickets",
          label: "Abertura de Ticket",
          href: "/tickets",
          icon: LuLifeBuoy,
        },
      ],
    });
  }

  return (
    // Largura da Sidebar
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden",
        "scrollbar-hide scrollbar-none",
        // Overlay mode: z-50 (acima do backdrop z-40), expandida com sombra
        isOverlayOpen
          ? "w-72 z-[60] shadow-2xl"
          : cn("z-40", isCollapsed ? "w-14 md:w-20" : "w-64"),
        isHidden && "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full overflow-hidden scrollbar-hide scrollbar-none">
        {/* Logo/header */}
        <div
          className={cn(
            "flex items-center border-b border-gray-200 dark:border-gray-700 h-16 md:h-20 flex-shrink-0",
            isCollapsed && !isOverlayOpen
              ? "justify-center px-2"
              : "justify-start px-4",
          )}
        >
          <div
            className={cn(
              "flex items-center",
              isCollapsed && !isOverlayOpen ? "justify-center" : "gap-3",
            )}
          >
            {/* Ícone/Logo */}
            <div
              className={cn(
                "rounded-lg shadow-lg flex items-center justify-center flex-shrink-0 shadow-black/5",
                isCollapsed && !isOverlayOpen
                  ? "w-10 h-10 md:w-12 md:h-12 bg-primary"
                  : "w-10 h-10 md:w-12 md:h-12",
              )}
              style={
                !isCollapsed || isOverlayOpen
                  ? { backgroundColor: "hsl(var(--primary))" }
                  : undefined
              }
            >
              <span
                className={cn(
                  "font-bebas font-bold text-white drop-shadow-md",
                  isCollapsed && !isOverlayOpen
                    ? "text-lg md:text-xl"
                    : "text-2xl md:text-3xl",
                )}
              >
                AV
              </span>
            </div>

            {/* Título — width/opacity animation garante expansão/contração limpa */}
            <div
              className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                !isCollapsed || isOverlayOpen
                  ? "w-auto opacity-100 max-w-[260px]"
                  : "w-0 opacity-0 pointer-events-none",
              )}
            >
              <div className="flex flex-col justify-center leading-none">
                <h1 className="font-bebas font-bold text-[36px] md:text-[28px] tracking-tight leading-[1.1] flex items-baseline gap-1">
                  <span style={{ color: "hsl(var(--primary))" }}>
                    A VAGA
                  </span>
                  <span className="text-foreground">É MINHA</span>
                </h1>
                <span className="font-sans text-[10.8px] md:text-[8.3px] font-bold uppercase tracking-[0.2em] text-foreground/40 md:mt-1 -mt-0.5">
                  Simulador de Concursos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-hidden">
          {/* Dashboard - item solo no topo */}
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group mb-4",
              pathname === "/dashboard"
                ? "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
              isCollapsed && !isOverlayOpen && "justify-center px-2",
            )}
            title={isCollapsed && !isOverlayOpen ? "Dashboard" : undefined}
          >
            <div
              className={cn(
                "flex items-center justify-center",
                isCollapsed && !isOverlayOpen ? "w-7 h-7" : "w-4 h-4",
              )}
            >
              <LuLayoutDashboard size={18} className="flex-shrink-0" />
            </div>
            {(!isCollapsed || isOverlayOpen) && (
              <span className="ml-3 whitespace-nowrap">Dashboard</span>
            )}
            {isCollapsed && !isOverlayOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Dashboard
              </div>
            )}
          </Link>

          {/* Seções do menu */}
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className={cn(sectionIndex > 0 && "mt-4")}>
              {/* Título da seção - visível quando expandido ou overlay */}
              {(!isCollapsed || isOverlayOpen) && (
                <h3 className="px-3 mb-1 text-[10px] font-bold text-gray-500/80 dark:text-gray-400/80 uppercase tracking-widest">
                  {section.title}
                </h3>
              )}
              {/* Separador quando colapsado (e não em overlay) */}
              {isCollapsed && !isOverlayOpen && sectionIndex > 0 && (
                <div className="mx-2 mb-1 border-t border-gray-200 dark:border-gray-700" />
              )}

              {/* Items da seção */}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = (() => {
                    // Check if strictly equal
                    if (pathname === item.href) return true;
                    
                    // Specific priority for PetroLingo
                    if (item.id === "aulas" && pathname.startsWith("/aulas/ingles/petrolingo")) {
                      return false;
                    }
                    
                    // Default startsWith match
                    return pathname.startsWith(item.href + "/");
                  })();

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                        isActive
                          ? "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                        isCollapsed && !isOverlayOpen && "justify-center px-2",
                      )}
                      title={
                        isCollapsed && !isOverlayOpen ? item.label : undefined
                      }
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center",
                          isCollapsed && !isOverlayOpen ? "w-7 h-7" : "w-4 h-4",
                        )}
                      >
                        <Icon size={18} className="flex-shrink-0" />
                      </div>
                      {(!isCollapsed || isOverlayOpen) && (
                        <>
                          <span className="ml-3 whitespace-nowrap">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {/* Badge quando colapsado (e não em overlay) */}
                      {isCollapsed && !isOverlayOpen && item.badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      {/* Tooltip quando colapsado (e não em overlay) */}
                      {isCollapsed && !isOverlayOpen && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                          {item.label}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
