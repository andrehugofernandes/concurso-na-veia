'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LuMenu, LuSun, LuMoon, LuBell, LuUser, LuSettings, LuLogOut, LuSearch, LuCheck, LuPalette, LuZap } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { logoutAction } from '@/app/actions/auth'; // Removed 
// import { getDashboardTitleForHeader } from '@/app/admin/settings/actions'; // Removed
import { availableThemes } from '@/lib/themes';
import { createClient } from '@/lib/supabase/client';

function hexToRgbTriplet(hex: string): string {
  const clean = hex.trim().replace('#', '');
  if (clean.length !== 6) return '59 130 246';
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return '59 130 246';
  return `${r} ${g} ${b}`;
}

interface AdminHeaderProps {
  onMenuToggle: () => void;
  isSidebarCollapsed?: boolean;
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export function AdminHeader({ onMenuToggle, isSidebarCollapsed, userName, userEmail, userRole }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [themeColor, setThemeColor] = useState('blue');
  const [notificationCount] = useState(0);
  const [dashboardTitle, setDashboardTitle] = useState<string | null>(null);
  const supabase = createClient();

  // Evitar hydration mismatch - só renderiza elementos dinâmicos após montar
  useEffect(() => {
    setMounted(true);
    // Detectar tema atual
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    // Carregar cor do tema
    const savedColor = localStorage.getItem('app-theme-color');
    if (savedColor && availableThemes[savedColor]) {
      setThemeColor(savedColor);
    }
  }, []);

  // Aplicar CSS variables quando a cor do tema mudar
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      const root = document.documentElement;
      const colors = availableThemes[themeColor] || availableThemes['blue'];
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--primary-hover', colors.primaryHover);
      root.style.setProperty('--primary-rgb', hexToRgbTriplet(colors.primary));
      root.style.setProperty('--primary-hover-rgb', hexToRgbTriplet(colors.primaryHover));
      localStorage.setItem('app-theme-color', themeColor);
    }
  }, [themeColor, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('app-theme-mode', newTheme);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Função para extrair iniciais do nome
  const getUserInitials = (name: string) => {
    const names = name.trim().split(' ').filter(Boolean);
    if (names.length === 0) return 'U';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    const firstName = names[0];
    const lastName = names[names.length - 1];
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  // Função para extrair o nome da página atual
  const getCurrentPageName = () => {
    const path = (pathname || '').split('/').filter(Boolean);
    if (path.length === 0 || (path[0] === 'dashboard' && path.length === 1)) {
      return '';
    }

    // Pegar o último segmento significativo
    const lastSegment = path[path.length - 1];

    // Se for 'aulas', apenas retornar 'Aulas'
    if (lastSegment.toLowerCase() === 'aulas') return 'Aulas';

    // Capitalizar primeira letra
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  const [currentUser, setCurrentUser] = useState<{
    fullName?: string | null;
    email?: string | null;
    username?: string | null;
    avatarUrl?: string | null;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Tentar obter perfil se existir tabela profiles, senão usar metadata
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nome')
            .eq('id', user.id)
            .single();

          setCurrentUser({
            fullName: profile?.nome || user.user_metadata?.full_name || 'Usuário',
            email: user.email,
            username: user.user_metadata?.username,
            avatarUrl: user.user_metadata?.avatar_url
          });
        } catch {
          // Fallback sem profiles
          setCurrentUser({
            fullName: user.user_metadata?.full_name || 'Usuário',
            email: user.email,
          });
        }
      }
    })();
  }, []);

  const displayName = currentUser?.fullName || currentUser?.username || 'Usuário';
  const displayEmail = currentUser?.email || '—';
  const avatarUrl = currentUser?.avatarUrl || null;
  const avatarInitials = getUserInitials(displayName);

  // Função para processar o título do dashboard
  const getDisplayTitle = () => {
    const title = dashboardTitle || getCurrentPageName();
    // Em mobile, remover "Dashboard | " se existir
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return title.replace(/^Dashboard\s*\|\s*/i, '');
    }
    return title;
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 md:px-6 py-3 md:py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Menu Toggle + Title */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300 flex-shrink-0"
            aria-label={isSidebarCollapsed ? 'Expandir menu' : 'Colapsar menu'}
          >
            <LuMenu className="h-5 w-5" />
          </button>
          <h1 className="text-sm md:text-xl font-semibold text-gray-900 dark:text-white truncate">
            {mounted ? getDisplayTitle() : getCurrentPageName()}
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          {/* Seja Pro CTA - Desktop only, hide for admins */}
          {userRole !== 'ADMIN' && userRole !== 'SYSADMIN' && (
            <Link
              href="/seja-pro"
              className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black text-[11px] font-black rounded-full transition-all shadow-sm hover:shadow-yellow-500/20 active:scale-95 border border-yellow-200/50"
            >
              <LuZap className="h-3.5 w-3.5 fill-black" />
              <span className="tracking-tight">SEJA PRO</span>
            </Link>
          )}

          {/* Search Button - Desktop only */}
          <button className="hidden md:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300" aria-label="Buscar">
            <LuSearch className="h-5 w-5" />
          </button>

          {/* Theme Toggle - Desktop only */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300"
              aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
            >
              {theme === 'dark' ? (
                <LuSun className="h-5 w-5" />
              ) : (
                <LuMoon className="h-5 w-5" />
              )}
            </button>
          )}

          {/* Theme Color Picker - Desktop only */}
          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors" aria-label="Escolher tema de cor">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-[var(--primary)]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <DropdownMenuLabel>Escolher Tema</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(availableThemes).map(([key, t]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setThemeColor(key)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" data-theme-color={t.primary} style={{ backgroundColor: t.primary }} />
                      <span>{t.name}</span>
                    </div>
                    {themeColor === key && <LuCheck className="h-4 w-4 text-green-600" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Notifications - Desktop only */}
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300" aria-label="Notificações">
                  <LuBell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  Nenhuma notificação
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="hidden md:flex relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-300" aria-label="Notificações">
              <LuBell className="h-5 w-5" />
            </button>
          )}

          {/* Separator - Desktop only */}
          <div className="hidden md:block h-8 w-px bg-gray-300 dark:bg-gray-600" />

          {/* Avatar Menu */}
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-10 w-10 md:h-12 md:w-12 rounded-full p-0 flex-shrink-0">
                  <div className="relative rounded-full border-2 md:border-4 border-[var(--primary)]">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarImage src={avatarUrl || undefined} alt={displayName} />
                      <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-xs md:text-sm">
                        {avatarInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 h-2.5 w-2.5 md:h-3.5 md:w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800 z-20 shadow-sm" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <DropdownMenuLabel>
                  <div className="flex flex-col items-center p-2.5 pb-3 bg-gray-100 dark:bg-gray-600 rounded-md">
                    <span className="text-sm font-medium leading-snug mb-1">{displayName}</span>
                    <span className="text-xs leading-snug text-gray-600 dark:text-gray-300 truncate">
                      {displayEmail}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                    <LuSettings className="mr-2 h-4 w-4" />
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Mobile-only items */}
                <DropdownMenuItem className="md:hidden" onClick={() => document.querySelector('[aria-label="Buscar"]')?.parentElement?.click()}>
                  <LuSearch className="mr-2 h-4 w-4" />
                  Buscar
                </DropdownMenuItem>
                {mounted && (
                  <DropdownMenuItem className="md:hidden" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                      <><LuSun className="mr-2 h-4 w-4" />Tema Claro</>
                    ) : (
                      <><LuMoon className="mr-2 h-4 w-4" />Tema Escuro</>
                    )}
                  </DropdownMenuItem>
                )}
                {mounted && (
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-full flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm">
                          <LuPalette className="mr-2 h-4 w-4" />
                          Cores do Tema
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                        <DropdownMenuLabel>Escolher Tema</DropdownMenuLabel>
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
                                data-theme-color={t.primary}
                                style={{ backgroundColor: t.primary }}
                              />
                              <span>{t.name}</span>
                            </div>
                            {themeColor === key && <LuCheck className="h-4 w-4 text-green-600" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                <DropdownMenuItem className="md:hidden">
                  <LuBell className="mr-2 h-4 w-4" />
                  Notificações
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer focus:text-red-600"
                >
                  <LuLogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full p-0 flex-shrink-0">
              <div className="rounded-full border-2 md:border-4 border-gray-300">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold text-xs md:text-sm">
                    {avatarInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
// Adding missing NotificationCountProvider
const NotificationCountContext = createContext<{ count: number }>({ count: 0 });

export function NotificationCountProvider({ children }: { children: ReactNode }) {
  const [count] = useState(0);
  return (
    <NotificationCountContext.Provider value={{ count }}>
      {children}
    </NotificationCountContext.Provider>
  );
}

export function useNotificationCount() {
  return useContext(NotificationCountContext);
}
