'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FolderArchive, 
  FileText, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  FileCode,
  ListFilter,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/providers/theme-provider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  external?: boolean;
}

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userName: string;
  userEmail: string;
  userRole: string;
}

export function AdminSidebar({ 
  isCollapsed, 
  onToggle, 
  userName, 
  userEmail,
  userRole
}: AdminSidebarProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? '';
  const { } = useTheme();
  const normalizedRole = (userRole ?? '').toUpperCase();
  const isSysadmin = normalizedRole === 'SYSADMIN';
  const isAdmin = normalizedRole === 'ADMIN';
  const isCoordenador = normalizedRole === 'COORDENADOR';
  const hasAdministrativeAccess = isSysadmin || isAdmin;

  const dashboardItem: NavItem = { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard };
  const usersItem: NavItem = { name: 'Usuários', href: '/admin/usuarios', icon: Users };
  const reportsItem: NavItem = { name: 'Relatórios', href: '/admin/relatorios', icon: BarChart3 };
  const logsItem: NavItem = { name: 'Sistema de Logs', href: '/admin/logs', icon: ListFilter };
  const apiDocsItem: NavItem = { name: 'Documentação API', href: '/admin/api-docs', icon: FileCode };
  const settingsItem: NavItem = { name: 'Configurações', href: '/admin/settings', icon: Settings };

  const baseNavItems: NavItem[] = [
    { name: 'Categorias', href: '/admin/categories', icon: FolderArchive },
    { name: 'Arquivos', href: '/admin/arquivos', icon: FileText },
  ];

  const navItems: NavItem[] = [
    dashboardItem,
    ...(hasAdministrativeAccess ? [usersItem] : []),
    ...((isSysadmin || isAdmin || isCoordenador) ? [reportsItem] : []),
    ...baseNavItems,
    ...(hasAdministrativeAccess ? [logsItem] : []),
    ...(isSysadmin ? [apiDocsItem, settingsItem] : []),
  ];
  
  // Verifica se o link está ativo
  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        "h-screen fixed left-0 top-0 z-20 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
        isCollapsed ? "w-[70px]" : "w-[250px]",
        "md:translate-x-0",
        // Em dispositivos móveis, esconde o sidebar se colapsado
        "md:block",
        "shadow-lg"
      )}
    >
      {/* Cabeçalho do Sidebar */}
      <div className="p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center w-10 h-10 rounded-full text-white text-xl font-bold flex-shrink-0 bg-[var(--primary)]">
          I+
        </div>
        {!isCollapsed && (
          <div className="ml-2 overflow-hidden">
            <h1 className="text-lg font-bold truncate text-[var(--primary)]">IMUNE+ Jaboatão</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Área Administrativa</p>
          </div>
        )}
      </div>
      
      {/* Navegação */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <TooltipProvider delayDuration={300}>
          <div role="list" className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const activeItem = isActive(item.href);

              if (isCollapsed) {
                return (
                  <div key={item.name} role="listitem">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className={cn(
                            "flex items-center justify-center py-2.5 px-3 rounded-md transition-colors duration-200",
                            activeItem
                              ? "bg-opacity-10 dark:bg-opacity-20 bg-[var(--primary)] text-[var(--primary)]"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              }

              return (
                <div key={item.name} role="listitem">
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center py-2.5 px-3 rounded-md transition-colors duration-200",
                      activeItem
                        ? "bg-opacity-10 dark:bg-opacity-20 bg-[var(--primary)] text-[var(--primary)]"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="ml-3 font-medium">{item.name}</span>
                    {item.external && <ExternalLink className="ml-auto h-3 w-3" />}
                  </Link>
                </div>
              );
            })}
          </div>
        </TooltipProvider>
      </nav>
      
      {/* Rodapé com informações do usuário */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!isCollapsed ? (
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white flex-shrink-0 bg-[var(--primary)]">
              <span className="font-medium">{userName.charAt(0)}</span>
            </div>
            <div className="ml-3 overflow-hidden">
              <span className="block text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{userName}</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white bg-[var(--primary)]">
              <span className="font-medium">{userName.charAt(0)}</span>
            </div>
          </div>
        )}
        
        {/* Botão para colapsar/expandir */}
        <button 
          onClick={onToggle}
          className="w-full rounded-md py-2 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={isCollapsed ? "Expandir menu" : "Colapsar menu"}
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!isCollapsed && <span className="ml-2">Colapsar</span>}
        </button>
      </div>
    </aside>
  );
}
