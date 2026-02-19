'use client';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider, useTheme as useCombinedTheme } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, Menu, Moon, Sun, User, Settings, LogOut, FileText, List, FolderTree, Users, BarChart, Search, Check, Database } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { availableThemes } from '@/lib/themes';

import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const themeCtx = useCombinedTheme();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  }>>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved) setSidebarCollapsed(saved === 'true');
  }, []);

  // Buscar notificações do backend
  useEffect(() => {
    loadNotifications();
    loadNotificationCount();

    const interval = setInterval(loadNotificationCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      console.log('[Layout] Buscando notificações...');
      const res = await fetch('/api/notifications?limit=5', { credentials: 'include' });
      console.log('[Layout] Status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('[Layout] Notificações:', data);
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('[Layout] Erro ao carregar notificações:', error);
    }
  };

  const loadNotificationCount = async () => {
    try {
      console.log('[Layout] Buscando contador...');
      const res = await fetch('/api/notifications/count', { credentials: 'include' });
      console.log('[Layout] Contador status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('[Layout] Contador:', data);
        setNotificationCount(data.count || 0);
      }
    } catch (error) {
      console.error('[Layout] Erro ao carregar contador:', error);
    }
  };

  // Foco programático no campo de busca quando a busca é aberta
  useEffect(() => {
    if (searchVisible) {
      // pequeno timeout para garantir que o input esteja no DOM
      const t = setTimeout(() => searchInputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [searchVisible]);

  const handleToggleSidebar = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem('sidebarCollapsed', String(next));
  };

  const isActive = (route: string) => pathname === route;
  const displayName = user?.full_name || user?.name || user?.username || 'Usuário';

  // Função para extrair iniciais (primeira + última letra do nome)
  const getUserInitials = (name: string) => {
    const names = name.trim().split(' ').filter(Boolean);
    if (names.length === 0) return 'U';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstName = names[0];
    const lastName = names[names.length - 1];
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };
  // Abreviação de nome para exibição no dropdown do avatar
  // Regras:
  // - < 4 nomes: mantém todos
  // - 4 nomes: abrevia somente o 3º (antepenúltimo considerando o bloco final)
  // - 5+ nomes: abrevia os dois anteriores ao(s) último(s) sobrenome(s)
  // - Considera blocos de sobrenome composto: De/Da/Do/Dos/Das ficam junto ao último sobrenome
  const formatDisplayName = (name: string) => {
    if (!name) return name;
    const tokens = name.split(' ').filter(Boolean);
    if (tokens.length === 0) return name;

    const PREPS = new Set(['de', 'da', 'do', 'dos', 'das', 'De', 'Da', 'Do', 'Dos', 'Das']);
    const n = tokens.length;
    const tailCount = n >= 2 && PREPS.has(tokens[n - 2]) ? 2 : 1;

    const head = tokens.slice(0, n - tailCount);
    const tail = tokens.slice(n - tailCount); // último sobrenome (e prep, se houver)

    // headLen representa os nomes antes do bloco final (sobrenome)
    const headLen = head.length;
    if (headLen < 3) {
      // Menos de 3 nomes antes do sobrenome: mantém tudo (total < 4 nomes efetivos)
      return tokens.join(' ');
    }

    const resultHead = [...head];
    const abbreviate = (s: string) => (s ? `${s.charAt(0)}.` : s);

    if (headLen === 3) {
      // 4 nomes efetivos: abrevia apenas o último do head
      resultHead[headLen - 1] = abbreviate(resultHead[headLen - 1]);
    } else {
      // 5+ nomes efetivos: abrevia os dois últimos do head
      resultHead[headLen - 1] = abbreviate(resultHead[headLen - 1]);
      resultHead[headLen - 2] = abbreviate(resultHead[headLen - 2]);
    }

    return [...resultHead, ...tail].join(' ');
  };
  const displayEmail = user?.email ?? '';
  const avatarLetter = getUserInitials(displayName);
  const normalizedRole = (user?.role ?? '').toUpperCase();
  const isSysadmin = normalizedRole === 'SYSADMIN';
  const isAdmin = normalizedRole === 'ADMIN';
  const isCoordinator = normalizedRole === 'COORDENADOR';

  const hasAdminAccess = isAdmin || isSysadmin;
  const canAccessReports = hasAdminAccess || isCoordinator;

  const navItems: Array<{ name: string; icon: LucideIcon; route: string }> = [
    { name: 'Dashboard', icon: BarChart, route: '/admin/dashboard' },
    { name: 'Notificações', icon: Bell, route: '/admin/notificacoes' },
    ...(hasAdminAccess ? [{ name: 'Usuários', icon: Users, route: '/admin/usuarios' }] : []),
    ...(canAccessReports ? [{ name: 'Relatórios', icon: List, route: '/admin/relatorios' }] : []),
    { name: 'Categorias', icon: FolderTree, route: '/admin/categorias' },
    { name: 'Arquivos', icon: FileText, route: '/admin/arquivos' },
    ...(hasAdminAccess ? [
      { name: 'Logs', icon: List, route: '/admin/logs' },
    ] : []),
    ...(isSysadmin ? [
      { name: 'API Docs', icon: FileText, route: '/admin/api-docs' },
      { name: 'Configurações', icon: Settings, route: '/admin/settings' },
      { name: 'Backups', icon: Database, route: '/admin/backups' },
    ] : []),
  ];

  return (
    <div className="min-h-screen">
      <QueryProvider>
        <ThemeProvider>
          {/* Sidebar */}
          <aside
            className={cn(
              'fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
              sidebarCollapsed ? 'w-16' : 'w-64'
            )}
          >
            <div className="flex flex-col h-full">
              {/* Logo/header */}
              <div
                className={cn(
                  "flex items-center border-b border-gray-200 dark:border-gray-700",
                  sidebarCollapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-4"
                )}
              >
                <div
                  className={cn(
                    "flex items-center",
                    sidebarCollapsed ? "justify-center" : "space-x-3"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg flex items-center justify-center bg-[var(--primary)]",
                      sidebarCollapsed ? "w-14 h-14 py-1 px-1" : "w-14 h-14"
                    )}
                  >
                    <span className={cn("text-white font-bold", sidebarCollapsed ? "text-sm" : "text-base")}>I+</span>
                  </div>
                  {!sidebarCollapsed && (
                    <span className="font-bold text-lg text-gray-900 dark:text-white whitespace-nowrap">IMUNE+ Jaboatão</span>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.route);
                  return (
                    <Link
                      key={item.name}
                      href={item.route}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        active
                          ? 'bg-[var(--primary)] text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                        sidebarCollapsed && 'justify-center px-2'
                      )}
                    >
                      <div className={cn('flex items-center justify-center', sidebarCollapsed ? 'w-8 h-8' : 'w-5 h-5')}>
                        <Icon size={24} className="flex-shrink-0" />
                      </div>
                      {!sidebarCollapsed && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className={cn('transition-all duration-300', sidebarCollapsed ? 'ml-16' : 'ml-64')}>
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" onClick={handleToggleSidebar} className="text-gray-600 dark:text-gray-300">
                    <Menu className="h-5 w-5" />
                  </Button>
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard Administrativo</h1>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Busca */}
                  {searchVisible ? (
                    <form
                      onSubmit={(e) => { e.preventDefault(); setSearchVisible(false); setSearchTerm(''); }}
                      className="hidden sm:flex items-center"
                    >
                      <Input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                        ref={searchInputRef}
                        onBlur={() => { if (!searchTerm) setSearchVisible(false); }}
                        aria-label="Buscar no sistema"
                      />
                    </form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSearchVisible(true)}
                      className="text-gray-600 dark:text-gray-300"
                      aria-label="Abrir busca"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  )}

                  {/* Alternar tema light/dark */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => themeCtx.setTheme(themeCtx.theme === 'dark' ? 'light' : 'dark')}
                    className="text-gray-600 dark:text-gray-300"
                    aria-label={themeCtx.theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
                  >
                    {themeCtx.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>

                  {/* Seletor de skin (cores) */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Escolher tema de cor">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-[var(--primary)]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <DropdownMenuLabel>Escolher Tema</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {Object.entries(availableThemes).map(([key, t]) => (
                        <DropdownMenuItem
                          key={key}
                          onClick={() => themeCtx.setThemeColor(key)}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div className="dot-theme" data-theme-color={key} />
                            <span>{t.name}</span>
                          </div>
                          {themeCtx.currentTheme === key && <Check className="h-4 w-4 text-green-600" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Notificações com dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Notificações"
                        className="relative text-gray-600 dark:text-gray-300"
                        onClick={loadNotifications}
                      >
                        <Bell className="h-5 w-5" />
                        {notificationCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {notificationCount > 9 ? '9+' : notificationCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            Nenhuma notificação
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <DropdownMenuItem key={n.id} className="flex flex-col items-start p-4 cursor-pointer">
                              <span className="font-medium">{n.title}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{n.message}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(n.createdAt).toLocaleString('pt-BR')}
                              </span>
                            </DropdownMenuItem>
                          ))
                        )}
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/notificacoes" className="w-full text-center text-[var(--primary)]">
                          Ver todas as notificações
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Separator antes do avatar */}
                  <div className="h-8 w-px space-x-2 bg-gray-300 dark:bg-gray-600" />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0">
                        <div className="rounded-full border-4 border-[var(--primary)]">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user?.avatar_url || undefined} alt={displayName} />
                            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">{avatarLetter}</AvatarFallback>
                          </Avatar>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                      <DropdownMenuLabel>
                        <div className="flex items-center flex-col bg-slate-200 dark:bg-gray-600 p-2 rounded-sm">
                          <span className="text-sm  font-medium leading-none mb-1">{formatDisplayName(displayName)}</span>
                          <span className="text-xs  leading-none text-gray-600 dark:text-gray-300 truncate">{displayEmail}</span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/perfil" className="flex items-center cursor-pointer"><User className="mr-2 h-4 w-4" />Meu perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/settings" className="flex items-center cursor-pointer"><Settings className="mr-2 h-4 w-4" />Configurações</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer"><LogOut className="mr-2 h-4 w-4" />Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            <main className="p-6 relative z-0">
              {children}
            </main>
          </div>

          {/* Toaster para notificações */}
          <Toaster />
        </ThemeProvider>
      </QueryProvider>
    </div>
  );
}
