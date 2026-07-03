"use client";

import { useState, useEffect } from "react";
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
  LuChevronDown,
  LuChevronUp,
  LuActivity
} from "react-icons/lu";
import { cn } from "@/lib/utils";

import { useUser } from "@/contexts/UserContext";
import PetrobrasLogo from "@/components/PetrobrasLogo";

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
      { id: "plano-estudos", label: "Plano de Estudos", href: "/plano-estudos", icon: LuList },
      {
        id: "petrolingo",
        label: "PetroLingo",
        href: "/aulas/ingles/petrolingo",
        icon: LuCrown,
        badge: "ELITE TOTAL",
      },
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
        href: "/admin/posts",
        icon: LuFileText,
      },
      { id: "pages", label: "Páginas", href: "/admin/pages", icon: LuFile },
      {
        id: "categories",
        label: "Categorias",
        href: "/admin/categories",
        icon: LuFolderTree,
      },
      { id: "media", label: "Mídia", href: "/admin/media", icon: LuImage },
    ],
  },
  {
    title: "Gerenciar",
    items: [
      { id: "menus", label: "Menus", href: "/admin/menus", icon: LuList },
      {
        id: "comments",
        label: "Comentários",
        href: "/admin/comments",
        icon: LuMessageSquare,
        badge: 5,
      },
      {
        id: "users",
        label: "Usuários",
        href: "/admin/users",
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
        href: "/admin/cta-popups",
        icon: LuBell,
      },
      {
        id: "accordions",
        label: "Acordeons",
        href: "/admin/accordions",
        icon: LuLayers,
      },
      {
        id: "image-galleries",
        label: "Galeria de Imagens",
        href: "/admin/image-galleries",
        icon: LuImage,
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        id: "tenants",
        label: "Tenants / White-Label",
        href: "/admin/tenants",
        icon: LuLayers,
      },
      {
        id: "backups",
        label: "Backups",
        href: "/admin/backups",
        icon: LuDatabase,
      },
      {
        id: "audit-logs",
        label: "Auditoria",
        href: "/admin/audit-logs",
        icon: LuShieldCheck,
      },
      {
        id: "settings",
        label: "Configurações",
        href: "/admin/settings",
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
  const isAdmin =
    profile?.role?.toUpperCase() === "ADMIN" ||
    profile?.role?.toUpperCase() === "SYSADMIN" ||
    userRole?.toUpperCase() === "ADMIN";
  const userPlan = profile?.plan?.toLowerCase() || "";

  // Filtra as seções e itens com base no cargo (role) e plano
  // O PetroLingo é exclusivo para Admin ou Plano Ouro/Elite
  const allSections = ALL_MENU_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      if (item.id === "petrolingo") {
        const hasAccess =
          isAdmin || userPlan === "elite-total" || userPlan === "ouro";
        return hasAccess;
      }
      return true;
    }),
  })).filter((section) => {
    if (isAdmin) return true;
    return section.title === "Estudo" && section.items.length > 0;
  });

  const estudoSection = allSections.find(s => s.title === "Estudo");
  const menuSections = isAdmin ? allSections.filter(s => s.title !== "Estudo") : allSections;

  const studyPaths = ["/aulas", "/plano-estudos", "/simulado-rapido", "/simulado-especifico", "/maratona-100", "/historico", "/rankings"];
  const isCurrentPathStudy = studyPaths.some(path => pathname?.startsWith(path));
  
  const [isEstudoOpen, setIsEstudoOpen] = useState(isCurrentPathStudy);

  useEffect(() => {
    if (isCurrentPathStudy) {
      setIsEstudoOpen(true);
    }
  }, [pathname, isCurrentPathStudy]);

  // Adiciona a seção de Suporte para o usuário comum se não for admin
  if (!isAdmin) {
    const suporteItems = [
      {
        id: "tickets",
        label: "Abertura de Ticket",
        href: "/tickets",
        icon: LuLifeBuoy,
      },
    ];

    if (userPlan !== "elite-total") {
      suporteItems.unshift({ id: "seja-pro", label: "Seja Pro", href: "/seja-pro", icon: LuZap });
    }

    menuSections.push({
      title: "Suporte",
      items: suporteItems,
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
        // Slide-out via left offset (não usa transform que quebra fixed positioning)
        isHidden && "-left-20",
      )}
    >
      <div className="flex flex-col h-full overflow-hidden scrollbar-hide scrollbar-none">
        {/* Logo/header */}
        <div
          className={cn(
            "flex items-center border-b border-gray-200 dark:border-gray-700 h-16 md:h-20 flex-shrink-0 transition-all duration-300",
            isCollapsed && !isOverlayOpen
              ? "justify-center px-1"
              : "justify-start px-4",
          )}
        >
          {isCollapsed && !isOverlayOpen ? (
            <div className="relative w-10 h-10 md:w-11 md:h-11 bg-black rounded-md shadow-lg flex-shrink-0 overflow-visible mt-2">
              <img
                src="/logo-icone.png"
                alt="Logo"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[260%] h-[260%] max-w-none object-contain drop-shadow-[0_8px_16px_rgba(34,197,94,0.4)] z-10"
              />
            </div>
          ) : (
            <PetrobrasLogo compact />
          )}
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

          {/* Estudo como Acordeon para Admin */}
          {isAdmin && estudoSection && (
            <div className="mb-4">
              <button
                onClick={() => setIsEstudoOpen(!isEstudoOpen)}
                className={cn(
                  "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group",
                  isCurrentPathStudy
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                  isCollapsed && !isOverlayOpen && "justify-center px-2",
                )}
                title={isCollapsed && !isOverlayOpen ? "Estudo" : undefined}
              >
                <div
                  className={cn(
                    "flex items-center justify-center",
                    isCollapsed && !isOverlayOpen ? "w-7 h-7" : "w-4 h-4",
                  )}
                >
                  <LuActivity size={18} className="flex-shrink-0 text-indigo-500" />
                </div>
                {(!isCollapsed || isOverlayOpen) && (
                  <>
                    <span className="ml-3 whitespace-nowrap">Estudo</span>
                    <span className="ml-auto transition-transform duration-200">
                      {isEstudoOpen ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
                    </span>
                  </>
                )}
                {isCollapsed && !isOverlayOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    Estudo
                  </div>
                )}
              </button>

              {isEstudoOpen && (
                <div className={cn(
                  "space-y-1 mt-1 transition-all duration-300", 
                  (!isCollapsed || isOverlayOpen) ? "pl-4 border-l border-gray-200 dark:border-gray-700 ml-5" : "pl-0"
                )}>
                  {estudoSection.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = (() => {
                      if (pathname === item.href) return true;
                      if (item.id === "aulas" && pathname.startsWith("/aulas/ingles/petrolingo")) {
                        return false;
                      }
                      return pathname.startsWith(item.href + "/");
                    })();

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors relative group",
                          isActive
                            ? "bg-primary text-primary-foreground hover:text-primary-foreground hover:bg-primary/90"
                            : "text-gray-650 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50",
                          isCollapsed && !isOverlayOpen && "justify-center px-2",
                        )}
                        title={isCollapsed && !isOverlayOpen ? item.label : undefined}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center",
                            isCollapsed && !isOverlayOpen ? "w-6 h-6" : "w-3.5 h-3.5",
                          )}
                        >
                          <Icon size={14} className="flex-shrink-0" />
                        </div>
                        {(!isCollapsed || isOverlayOpen) && (
                          <>
                            <span className="ml-3 whitespace-nowrap">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="ml-auto bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                        {isCollapsed && !isOverlayOpen && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                            {item.label}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

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
                    if (
                      item.id === "aulas" &&
                      pathname.startsWith("/aulas/ingles/petrolingo")
                    ) {
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
                        typeof item.badge === "number" ? (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge}
                          </span>
                        ) : null
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
