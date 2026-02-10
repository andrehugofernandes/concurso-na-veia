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
  Moon
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function DashboardHeader({ userName, userEmail, onLogout }: HeaderProps) {
  const { user } = useAuth();
  const role = (user?.role ?? '').toUpperCase();
  const isSysadmin = role === 'SYSADMIN';
  const { theme, setTheme, resolvedTheme } = useTheme();
  const notificationCount = 3;
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Área de pesquisa */}
        <div className="flex-1 max-w-md">
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
        
        {/* Área direita com notificações e avatar */}
        <div className="flex items-center space-x-4">
          {/* Botão de tema */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
          >
            {resolvedTheme === 'dark' ? (
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
              aria-haspopup="true"
              aria-expanded="false"
              title="Notificações"
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
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full py-2 focus:ring-2 focus:ring-[#0037C1] focus:outline-none"
                aria-label="Menu do usuário"
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-[#0037C1] flex items-center justify-center text-white" aria-hidden="true">
                  <span className="font-medium">{userName.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium hidden lg:inline">{userName}</span>
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
              {isSysadmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="px-4 sm:px-6 lg:px-8 py-2 text-sm">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/admin" className="text-gray-500 dark:text-gray-400 hover:text-[#0037C1] dark:hover:text-[#FDC300]">
                Admin
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li>
              <span className="text-gray-900 dark:text-gray-100">Dashboard</span>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
