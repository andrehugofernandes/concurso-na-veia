"use client";

import { useState, useEffect, createContext, useContext, useRef, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Menu, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { NotificationDropdown } from "@/components/admin/notifications";

declare global {
  interface WindowEventMap {
    "open-admin-search": CustomEvent<void>;
  }
}
// Menu de avatar foi movido para app/(admin)/admin/layout.tsx; nenhum DropdownMenu é usado aqui

interface AdminHeaderProps {
  userName: string;
  userEmail: string;
  onMenuToggle: () => void;
  isSidebarCollapsed: boolean;
}

// Contexto para sincronizar contagem de notificações entre header e mobile
const NotificationCountContext = createContext<{
  count: number;
  setCount: (count: number) => void;
}>({ count: 0, setCount: () => {} });

export const useNotificationCount = () => useContext(NotificationCountContext);

// Provider para envolver o layout
export const NotificationCountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(0);
  return (
    <NotificationCountContext.Provider value={{ count, setCount }}>
      {children}
    </NotificationCountContext.Provider>
  );
};

export function AdminHeader({
  userName,
  userEmail,
  onMenuToggle,
  isSidebarCollapsed,
}: AdminHeaderProps) {
  // Fallback: se props vierem vazias, tenta obter do contexto de autenticação
  const { user } = useAuth();
  const pathname = usePathname();

  // Usar EXATAMENTE a mesma lógica da users-page.tsx para consistência
  const displayName = useMemo(
    () => user?.full_name || user?.name || user?.username || userName || "Usuário",
    [user?.full_name, user?.name, user?.username, userName]
  );
  const displayEmail = useMemo(
    () => user?.email ?? userEmail ?? "",
    [user?.email, userEmail]
  );

  // Removido useEffect com checkAuth: AuthProvider já gerencia isso automaticamente
  // Chamar checkAuth manualmente causava chamadas duplicadas para /api/auth/me

  const { theme, setTheme } = useTheme();
  const { setCount: setNotificationCount } = useNotificationCount();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement | null>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Ouve evento global disparado pela bottom nav para abrir a busca no mobile
  useEffect(() => {
    const handleOpenSearch = () => setIsMobileSearchOpen(true);
    window.addEventListener("open-admin-search", handleOpenSearch);
    return () => window.removeEventListener("open-admin-search", handleOpenSearch);
  }, []);

  // Focar o input da busca mobile quando a barra abrir
  useEffect(() => {
    if (isMobileSearchOpen) {
      const t = setTimeout(() => mobileSearchRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [isMobileSearchOpen]);

  // Função para extrair o nome da página atual a partir do pathname
  const getCurrentPageName = () => {
    const path = (pathname || '').split("/");
    const pageName = path[path.length - 1];

    if (pageName === "" && path[path.length - 2] === "admin") {
      return "Dashboard";
    }

    return pageName.charAt(0).toUpperCase() + pageName.slice(1);
  };

  // Função para extrair iniciais - mesma lógica usada na users-page.tsx (primeiro nome + último nome)
  const getUserInitials = (name: string) => {
    // Log detalhado para depuração
    console.log("[INICIAIS] Iniciando cálculo de iniciais para:", name);

    // Garantir que estamos trabalhando com uma string válida
    if (!name || typeof name !== "string") {
      console.log('[INICIAIS] Nome inválido, retornando "U"');
      return "U";
    }

    // Dividir o nome em partes e remover espaços vazios
    const names = name
      .trim()
      .split(" ")
      .filter((part) => part.length > 0);
    console.log("[INICIAIS] Partes do nome após split:", names);

    // Se não houver partes válidas, retornar 'U'
    if (names.length === 0) {
      console.log('[INICIAIS] Nenhuma parte válida no nome, retornando "U"');
      return "U";
    }

    // Se houver apenas uma parte, retornar a primeira letra
    if (names.length === 1) {
      const initial = names[0].charAt(0).toUpperCase();
      console.log(
        "[INICIAIS] Nome com uma única parte, retornando inicial:",
        initial
      );
      return initial;
    }

    // Extrair a primeira letra do primeiro nome e a primeira letra do último nome
    const firstName = names[0];
    const lastName = names[names.length - 1];
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    // Log detalhado das partes do nome
    console.log("[INICIAIS] Detalhes do cálculo:", {
      nomeCompleto: name,
      partes: names,
      primeiroNome: firstName,
      ultimoNome: lastName,
      inicialPrimeiro: firstInitial,
      inicialUltimo: lastInitial,
      resultado: firstInitial + lastInitial,
    });

    // Retornar as iniciais em maiúsculas
    return firstInitial + lastInitial;
  };

  // Loga mudanças do nome de usuário para detectar flicker/hidratação
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const initials = getUserInitials(displayName);
      console.log(
        "[AdminHeader] displayName changed:",
        displayName,
        "\ninitials:",
        initials,
        "\nemail:",
        displayEmail
      );
    }
  }, [displayName, displayEmail]);

  // Buscar contagem de notificações não lidas
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/notifications/count", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();
        setNotificationCount(data.count || 0);
      } catch {
        setNotificationCount(0);
      }
    };
    load();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [setNotificationCount]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-2">
        {/* Botão do menu (visível em todos os tamanhos de tela) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="rounded-full flex-shrink-0"
          aria-label={isSidebarCollapsed ? "Expandir menu" : "Colapsar menu"}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Título da página atual (visível apenas em desktop) */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hidden md:block">
          {getCurrentPageName()}
        </h1>

        {/* Área de pesquisa */}
        <div className="flex-1 max-w-md mx-2 md:mx-4 hidden sm:block">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-10 pr-4 rounded-full bg-gray-50 dark:bg-gray-700 border-none focus-visible:ring-[#0037C1]"
              aria-label="Buscar no sistema"
            />
          </div>
        </div>

        {/* Área direita com notificações e avatar (hidden em mobile) */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Botão de tema */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Alternar para tema claro"
                : "Alternar para tema escuro"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>

          {/* Notificações */}
          <NotificationDropdown />

          {/* Avatar menu renderizado exclusivamente via app/(admin)/admin/layout.tsx */}
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-sm">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/admin"
                className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
              >
                Admin
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li>
              <span className="text-gray-900 dark:text-gray-100">
                {getCurrentPageName()}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Barra de busca mobile sobreposta (apenas quando aberta) */}
      {isMobileSearchOpen && (
        <div className="sm:hidden px-4 pb-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-10 pr-10 rounded-full bg-gray-50 dark:bg-gray-700 border-none focus-visible:ring-[#0037C1]"
              aria-label="Buscar no sistema"
              ref={mobileSearchRef}
            />
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Fechar busca"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
