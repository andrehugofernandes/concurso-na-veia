import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuBookOpen,
  LuZap,
  LuLayoutDashboard,
  LuFileQuestion,
  LuFlame,
  LuMenu,
  LuChevronDown,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

interface BottomNavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isCenter?: boolean;
}

const bottomNavItems: BottomNavItem[] = [
  { id: "aulas", label: "Aulas", href: "/aulas", icon: LuBookOpen },
  {
    id: "simulado-rapido",
    label: "Simulados",
    href: "/simulado-rapido",
    icon: LuZap,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LuLayoutDashboard,
    isCenter: true,
  },
  {
    id: "simulado-especifico",
    label: "Provas",
    href: "/simulado-especifico",
    icon: LuFileQuestion,
  },
  { id: "maratona", label: "Maratona", href: "/maratona-100", icon: LuFlame },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  
  // Detectar se estamos no ambiente PetroLingo/Aulas
  const isInsideLesson = (() => {
    const segments = (pathname || "").split("/").filter(Boolean);
    return segments[0] === "aulas" && segments.length >= 3;
  })();

  const [isOpen, setIsOpen] = useState(!isInsideLesson);

  useEffect(() => {
    setIsOpen(!isInsideLesson);
  }, [isInsideLesson]);

  return (
    <>
      {isInsideLesson && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "fixed md:hidden z-[60] right-4 w-12 h-12 rounded-full bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/10",
            isOpen ? "bottom-20" : "bottom-6"
          )}
          aria-label="Alternar Menu"
        >
          {isOpen ? <LuChevronDown className="w-6 h-6" /> : <LuMenu className="w-5 h-5" />}
        </button>
      )}

      <nav 
        className={cn(
          "fixed bottom-0 left-0 right-0 md:hidden h-16 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-around px-2 z-[50] transition-transform duration-300 ease-in-out",
          (!isOpen && isInsideLesson) ? "translate-y-full shadow-none" : "translate-y-0 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
        )}
      >
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          if (item.isCenter) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center gap-0.5 -mt-[52px]"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800",
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    isActive
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
