'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuLayoutDashboard,
  LuBookOpen,
  LuFileQuestion,
  LuHistory,
  LuTrophy,
} from 'react-icons/lu';

interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const bottomNavItems: BottomNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LuLayoutDashboard },
  { id: 'aulas', label: 'Aulas', href: '/aulas', icon: LuBookOpen },
  { id: 'simulados', label: 'Provas', href: '/simulado', icon: LuFileQuestion },
  { id: 'rankings', label: 'Rank', href: '/rankings', icon: LuTrophy },
  { id: 'historico', label: 'Hist.', href: '/historico', icon: LuHistory },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // Ocultar bottom nav em telas maiores (acima de sm/md)
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden h-16 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-around px-2 z-50">
      {bottomNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded transition-colors ${isActive
              ? 'text-[var(--primary)]'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
