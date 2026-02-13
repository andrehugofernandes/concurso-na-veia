'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'react-icons/lu';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isCollapsed: boolean;
  userRole?: string;
  onToggle?: () => void;
  userName?: string;
  userEmail?: string;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Menu items organizados por seções temáticas (Merged: Project + Reference)
const ALL_MENU_SECTIONS: MenuSection[] = [
  {
    title: 'Estudo',
    items: [
      { id: 'aulas', label: 'Aulas', href: '/aulas', icon: LuBookOpen },
      { id: 'simulados', label: 'Simulados Rápidos', href: '/simulado-rapido', icon: LuFileQuestion },
      { id: 'simulado-especifico', label: 'Simulados Específicos', href: '/simulado-especifico', icon: LuTarget },
      { id: 'maratona-100', label: 'Maratona 100', href: '/maratona-100', icon: LuFlame },
      { id: 'historico', label: 'Histórico', href: '/historico', icon: LuHistory },
      { id: 'rankings', label: 'Rankings', href: '/rankings', icon: LuTrophy },
    ],
  },
  {
    title: 'Conteúdo',
    items: [
      { id: 'posts', label: 'Posts', href: '/dashboard/posts', icon: LuFileText },
      { id: 'pages', label: 'Páginas', href: '/dashboard/pages', icon: LuFile },
      { id: 'categories', label: 'Categorias', href: '/dashboard/categories', icon: LuFolderTree },
      { id: 'media', label: 'Mídia', href: '/dashboard/media', icon: LuImage },
    ],
  },
  {
    title: 'Gerenciar',
    items: [
      { id: 'menus', label: 'Menus', href: '/dashboard/menus', icon: LuList },
      { id: 'comments', label: 'Comentários', href: '/dashboard/comments', icon: LuMessageSquare, badge: 5 },
      { id: 'users', label: 'Usuários', href: '/dashboard/users', icon: LuUsers },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { id: 'cta-popups', label: 'CTA Popups', href: '/dashboard/cta-popups', icon: LuBell },
      { id: 'accordions', label: 'Acordeons', href: '/dashboard/accordions', icon: LuLayers },
      { id: 'image-galleries', label: 'Galeria de Imagens', href: '/dashboard/image-galleries', icon: LuImage },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { id: 'backups', label: 'Backups', href: '/dashboard/backups', icon: LuDatabase },
      { id: 'audit-logs', label: 'Auditoria', href: '/dashboard/audit-logs', icon: LuShieldCheck },
      { id: 'settings', label: 'Configurações', href: '/dashboard/settings', icon: LuSettings },
    ],
  },
];

export function AdminSidebar({ isCollapsed, userRole }: AdminSidebarProps) {
  const pathname = usePathname();

  const isAdmin = userRole === 'ADMIN' || userRole === 'SYSADMIN';

  // Filtra as seções com base no cargo (role)
  const menuSections = ALL_MENU_SECTIONS.filter(section => {
    if (isAdmin) return true; // Mostra tudo para admin

    // Para o usuário comum, mostramos apenas a seção "Estudo"
    return section.title === 'Estudo';
  });

  // Adiciona a seção de Suporte para o usuário comum se não for admin
  if (!isAdmin) {
    menuSections.push({
      title: 'Suporte',
      items: [
        { id: 'seja-pro', label: 'Seja Pro', href: '/seja-pro', icon: LuZap },
        { id: 'tickets', label: 'Abertura de Ticket', href: '/tickets', icon: LuLifeBuoy },
      ]
    });
  }

  return (
    // Largura da Sidebar 
    <aside
      className={cn(
        'fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden',
        'scrollbar-hide scrollbar-none',
        isCollapsed ? 'w-16 md:w-20' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full overflow-hidden scrollbar-hide scrollbar-none">
        {/* Logo/header */}
        <div
          className={cn(
            'flex items-center border-b border-gray-200 dark:border-gray-700 h-16 md:h-20 flex-shrink-0',
            isCollapsed ? 'justify-center px-2' : 'justify-start px-4'
          )}
        >
          <div
            className={cn(
              'flex items-center',
              isCollapsed ? 'justify-center' : 'space-x-3'
            )}
          >
            {/* Ícone/Logo */}
            <div
              className={cn(
                'rounded-md flex items-center justify-center bg-[var(--primary,#0037C1)]',
                'w-10 h-10 md:w-10 md:h-10 shadow-sm flex-shrink-0'
              )}
            >
              <span className={cn('text-white font-bold', isCollapsed ? 'text-base md:text-lg' : 'text-xl')}>
                AV
              </span>
            </div>
            {/* Título - só quando expandido */}
            {!isCollapsed && (
              <div className="flex flex-col pt-1 min-w-0">
                <div className="flex items-baseline whitespace-nowrap">
                  <span
                    className={cn(
                      'font-bebas text-[32px] uppercase  text-[var(--primary,#0037C1)]'
                    )}
                  >
                    A VAGA
                  </span>
                  <span className="font-bebas text-[32px] uppercase text-foreground tracking-[0.05em] ml-[0.30em]">
                    É MINHA
                  </span>
                </div>
                {/* Subtítulo Justificado - 3 Words */}
                <span className="text-[9px]  font-bold tracking-[0.34em] uppercase text-gray-500 dark:text-gray-400 leading-none -mt-2 whitespace-nowrap">
                  SIMULANDO CONCURSOS
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-hidden">
          {/* Dashboard - item solo no topo */}
          <Link
            href="/dashboard"
            className={cn(
              'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group mb-4',
              pathname === '/dashboard'
                ? 'bg-[var(--primary,#0037C1)] text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
              isCollapsed && 'justify-center px-2'
            )}
            title={isCollapsed ? 'Dashboard' : undefined}
          >
            <div className={cn('flex items-center justify-center', isCollapsed ? 'w-8 h-8' : 'w-5 h-5')}>
              <LuLayoutDashboard size={22} className="flex-shrink-0" />
            </div>
            {!isCollapsed && <span className="ml-3 whitespace-nowrap">Dashboard</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Dashboard
              </div>
            )}
          </Link>

          {/* Seções do menu */}
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className={cn(sectionIndex > 0 && 'mt-4')}>
              {/* Título da seção - só quando expandido */}
              {!isCollapsed && (
                <h3 className="px-3 mb-1 text-[10px] font-bold text-gray-500/80 dark:text-gray-400/80 uppercase tracking-widest">
                  {section.title}
                </h3>
              )}
              {/* Separador quando colapsado */}
              {isCollapsed && sectionIndex > 0 && (
                <div className="mx-2 mb-1 border-t border-gray-200 dark:border-gray-700" />
              )}

              {/* Items da seção */}
              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group',
                        isActive
                          ? 'bg-[var(--primary,#0037C1)] text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                        isCollapsed && 'justify-center px-2'
                      )}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className={cn('flex items-center justify-center', isCollapsed ? 'w-8 h-8' : 'w-5 h-5')}>
                        <Icon size={22} className="flex-shrink-0" />
                      </div>
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 whitespace-nowrap">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {/* Badge quando colapsado */}
                      {isCollapsed && item.badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      {/* Tooltip quando colapsado */}
                      {isCollapsed && (
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
