'use client';

import Link from 'next/link';
import {
  Bell,
  Search,
  User,
  ChevronDown,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// Adapting to existing theme provider if available, or using a simple mock for now
// import { useTheme } from '@/components/providers/theme-provider'; 
// import { useAuth } from '@/hooks/useAuth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React, { useState, useEffect, createContext, useContext } from 'react';

interface HeaderProps {
  userName?: string;
  userEmail?: string;
  onMenuToggle?: () => void;
  isSidebarCollapsed?: boolean;
}

export function AdminHeader({ userName = 'Admin', userEmail = 'admin@petrobras.com', onMenuToggle }: HeaderProps) {
  // Mocking auth and theme for initial integration
  const [theme, setTheme] = useState('dark');
  const notificationCount = 3;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-200 dark:border-gray-700 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>

          {/* Área de pesquisa */}
          <div className="hidden md:block max-w-md w-64 lg:w-96">
            <div className="relative">
              <label htmlFor="dashboard-search" className="sr-only">Buscar no sistema</label>
              <Input
                id="dashboard-search"
                type="search"
                placeholder="Buscar..."
                className="pl-10 pr-4 rounded-full bg-gray-50 dark:bg-gray-700 border-none focus-visible:ring-[#0037C1]"
                aria-label="Buscar no sistema"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Área direita com notificações e avatar */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Botão de tema */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>

          {/* Notificações */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative focus:ring-2 focus:ring-[#0037C1] focus:outline-none"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              {notificationCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                  aria-label={`${notificationCount} notificações não lidas`}
                >
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* Menu do usuário */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full py-2 px-2 sm:px-4 focus:ring-2 focus:ring-[#0037C1] focus:outline-none"
                aria-label="Menu do usuário"
              >
                <div className="h-8 w-8 rounded-full bg-[#0037C1] flex items-center justify-center text-white" aria-hidden="true">
                  <span className="font-medium">{userName.charAt(0)}</span>
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-gray-500 max-w-[120px] truncate">{userEmail}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500 hidden lg:inline" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{userName}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/perfil" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

const NotificationContext = createContext<{ count: number; setCount: React.Dispatch<React.SetStateAction<number>> }>({ count: 0, setCount: () => { } });

export function NotificationCountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(3);
  return <NotificationContext.Provider value={{ count, setCount }}>{children}</NotificationContext.Provider>;
}

export const useNotificationCount = () => useContext(NotificationContext);
