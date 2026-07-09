"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LuMenu,
  LuSun,
  LuMoon,
  LuBell,
  LuUser,
  LuSettings,
  LuLogOut,
  LuSearch,
  LuCheck,
  LuPalette,
  LuZap,
} from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { logoutAction } from '@/app/actions/auth'; // Removed
// import { getDashboardTitleForHeader } from '@/app/admin/settings/actions'; // Removed
import { availableThemes, isLightColor } from "@/lib/themes";
import { createClient } from "@/lib/supabase/client";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useUI } from "@/contexts/UIContext";
import { useHeaderState } from "@/contexts/HeaderStateContext";
import { CONTEUDO_MATERIAS } from "@/data/conteudo";
import { Activity } from "@/components/aulas/shared";
import { cn } from "@/lib/utils";

function hexToRgbTriplet(hex: string): string {
  const clean = hex.trim().replace("#", "");
  if (clean.length !== 6) return "59 130 246"; // Default blue
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b))
    return "59 130 246";
  return `${r} ${g} ${b}`;
}

function hexToHsl(hex: string): string {
  const clean = hex.trim().replace("#", "");
  if (clean.length !== 6) return "0 0% 0%";

  const r = Number.parseInt(clean.slice(0, 2), 16) / 255;
  const g = Number.parseInt(clean.slice(2, 4), 16) / 255;
  const b = Number.parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Convert to degrees and percentage
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

interface AdminHeaderProps {
  onMenuToggle: () => void;
  isSidebarCollapsed?: boolean;
  isMobileSidebarOpen?: boolean;
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export function AdminHeader({
  onMenuToggle,
  isSidebarCollapsed,
  isMobileSidebarOpen,
  userName,
  userEmail,
  userRole,
}: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [themeColor, setThemeColor] = useState("blue");
  const supabase = createClient();

  const {
    isStickyNavPinned,
    isTemporaryHeaderVisible,
    setIsTemporaryHeaderVisible,
  } = useHeaderState();

  // Evitar hydration mismatch - só renderiza elementos dinâmicos após montar
  useEffect(() => {
    setMounted(true);
    // Detectar tema atual
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    // Carregar cor do tema
    const savedColor = localStorage.getItem("app-theme-color");
    if (savedColor && availableThemes[savedColor]) {
      setThemeColor(savedColor);
    }
  }, []);

  // Aplicar CSS variables quando a cor do tema mudar
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      const root = document.documentElement;
      const colors = availableThemes[themeColor] || availableThemes["blue"];

      const primaryHsl = hexToHsl(colors.primary);
      const primaryHoverHsl = hexToHsl(colors.primaryHover);

      // Update HSL variables
      root.style.setProperty("--primary", primaryHsl);
      root.style.setProperty("--primary-hover", primaryHoverHsl);
      root.style.setProperty("--ring", primaryHsl); // Sync ring with primary

      // Update Hex variables
      root.style.setProperty("--primary-hex", colors.primary);
      root.style.setProperty("--primary-hover-hex", colors.primaryHover);

      // Update RGB variables
      root.style.setProperty("--primary-rgb", hexToRgbTriplet(colors.primary));
      root.style.setProperty(
        "--primary-hover-rgb",
        hexToRgbTriplet(colors.primaryHover),
      );

      // Update Primary Foreground for contrast
      const isLight = isLightColor(colors.primary);
      const foregroundHsl = isLight ? "222.2 84.7% 4.9%" : "210 40% 98%";
      root.style.setProperty("--primary-foreground", foregroundHsl);

      localStorage.setItem("app-theme-color", themeColor);
    }
  }, [themeColor, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("app-theme-mode", newTheme);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Função para extrair iniciais do nome
  const getUserInitials = (name: string) => {
    const names = name.trim().split(" ").filter(Boolean);
    if (names.length === 0) return "U";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    const firstName = names[0];
    const lastName = names[names.length - 1];
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  // Mapeamento de slugs para títulos (Rotas estáticas ou globais)
  const TITLE_MAP: Record<string, string> = {
    dashboard: "Dashboard",
    aulas: "Aulas",
    simulados: "Simulados",
    "simulado-rapido": "Simulados Rápidos",
    "simulado-especifico": "Simulados Específicos",
    "maratona-100": "Maratona 100",
    historico: "Histórico",
    rankings: "Rankings",
    perfil: "Perfil",
    configuracoes: "Configurações",
    profile: "Perfil",
    settings: "Configurações",
    admin: "Administração",
    users: "Usuários",
    posts: "Postagens",
    media: "Mídia",
    comments: "Comentários",
    "seja-pro": "Seja Pro",
    tickets: "Suporte",
  };

  // Função para extrair o nome da página atual de forma dinâmica
  const getCurrentPageName = () => {
    const segments = (pathname || "").split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";

    // 1. Verificar se estamos em uma rota de AULAS para busca dinâmica no conteudo.ts
    if (segments[0] === "aulas" && segments.length > 1) {
      const materiaSlug = segments[1];
      const topicoSlug = segments[2];

      const materia = CONTEUDO_MATERIAS.find((m) => m.id === materiaSlug);
      if (materia) {
        if (topicoSlug) {
          const topico = materia.topicos.find((t) => t.id === topicoSlug);
          if (topico) return topico.titulo;
        }
        return materia.nome;
      }
    }

    const lastSegment = segments[segments.length - 1].toLowerCase();
    if (TITLE_MAP[lastSegment]) {
      return TITLE_MAP[lastSegment];
    }

    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const { profile } = useUserProfile();
  const { pageTitle } = useUI();
  const { notificationCount } = useNotificationCount();

  // Use profile data from context
  const displayName = profile?.full_name || "Usuário";
  const username = profile?.username || "";
  const avatarUrl = profile?.avatar_url || null;
  const avatarInitials = getUserInitials(displayName);

  // Função para processar o título do dashboard
  const getDisplayTitle = () => {
    if (pageTitle) return pageTitle;
    const title = getCurrentPageName();
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return title.replace(/^Dashboard\s*\|\s*/i, "");
    }
    return title;
  };

  // Reset visibilidade temporária silencioso - Removido para evitar que o header suma ao scrolar
  // enquanto o usuário tenta interagir com ele após clicar no toggle do nav sticky.
  /*
  useEffect(() => {
    if (isTemporaryHeaderVisible) {
      const handleScroll = () => {
        setIsTemporaryHeaderVisible(false);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isTemporaryHeaderVisible, setIsTemporaryHeaderVisible]);
  */

  return (
    <header
      className={cn(
        "h-16 md:h-20 border-b border-gray-200 dark:border-gray-700 bg-white/15 dark:bg-gray-800/15 backdrop-blur-md flex items-center sticky top-0 z-50 transition-all duration-300",
        isStickyNavPinned &&
          !isTemporaryHeaderVisible &&
          "-translate-y-full opacity-0 pointer-events-none",
      )}
    >
      <div
        className={cn(
          "h-full w-full px-4 md:px-8 flex items-center justify-between gap-2 transition-opacity duration-300",
          isStickyNavPinned && !isTemporaryHeaderVisible
            ? "opacity-0 pointer-events-none"
            : "opacity-100",
        )}
      >
        {/* Left: Menu Toggle + Title */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300 flex-shrink-0"
            aria-label={isSidebarCollapsed ? "Expandir menu" : "Colapsar menu"}
          >
            <LuMenu className="h-5 w-5" />
          </button>
          <h1 className="text-sm md:text-xl font-semibold text-gray-900 dark:text-white truncate">
            {mounted ? getDisplayTitle() : getCurrentPageName()}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          {/* Seja Pro CTA - esconde quando sidebar overlay aberta */}
          {!isMobileSidebarOpen &&
            userRole !== "ADMIN" &&
            userRole !== "SYSADMIN" &&
            (!profile?.plan || profile.plan === "free") && (
              <Link
                href="/seja-pro"
                className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black text-[11px] font-black rounded-full transition-all shadow-sm hover:shadow-yellow-500/20 active:scale-95 border border-yellow-200/50"
              >
                <LuZap className="h-3.5 w-3.5 fill-black" />
                <span className="tracking-tight">SEJA PRO</span>
              </Link>
            )}

          {/* Notifications - esconde quando sidebar overlay aberta */}
          {mounted && !isMobileSidebarOpen && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300"
                  aria-label="Notificações"
                >
                  <LuBell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
              >
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Nenhuma notificação
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Theme Toggle - esconde quando sidebar overlay aberta */}
          {mounted && !isMobileSidebarOpen && (
            <button
              onClick={toggleTheme}
              className="flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300"
              aria-label={theme === "dark" ? "Tema Claro" : "Tema Escuro"}
            >
              {theme === "dark" ? (
                <LuSun className="h-5 w-5" />
              ) : (
                <LuMoon className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Color Picker - esconde quando sidebar overlay aberta */}
          {mounted && !isMobileSidebarOpen && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-primary" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Cores do Tema</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(availableThemes).map(([key, t]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setThemeColor(key)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: t.primary }}
                      />
                      <span>{t.name}</span>
                    </div>
                    {themeColor === key && (
                      <LuCheck className="h-4 w-4 text-green-600" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Avatar */}
          {mounted && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="relative h-10 w-10 rounded-full border-2 border-primary">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {avatarInitials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">{displayName}</span>
                    <span className="text-xs text-muted-foreground">
                      @{username}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile" className="flex items-center w-full">
                    <LuUser className="mr-2 h-4 w-4" /> Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
                >
                  <LuLogOut className="mr-2 h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

const NotificationCountContext = createContext<{
  notificationCount: number;
  setNotificationCount: (count: number) => void;
}>({
  notificationCount: 0,
  setNotificationCount: () => {},
});

export function NotificationCountProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notificationCount, setNotificationCount] = useState(0);
  return (
    <NotificationCountContext.Provider
      value={{ notificationCount, setNotificationCount }}
    >
      {children}
    </NotificationCountContext.Provider>
  );
}

export function useNotificationCount() {
  return useContext(NotificationCountContext);
}
