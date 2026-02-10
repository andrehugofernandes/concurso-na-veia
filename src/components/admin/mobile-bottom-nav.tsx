"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Bell, Search, Sun, Moon, User, LogOut, Settings } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationCount } from "@/components/admin/admin-header";
import { cn } from "@/lib/utils";

type Activity = { id: string; title: string; description?: string; createdAt: string };

export function MobileBottomNav() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { count: notificationCount, setCount: setNotificationCount } = useNotificationCount();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSearchOpen = () => {
    window.dispatchEvent(new CustomEvent("open-admin-search"));
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Marcar todas as notificações como lidas ao abrir o Sheet
  const markAsRead = async () => {
    try {
      await fetch('/api/admin/notifications/read', { method: 'POST' });
      setNotificationCount(0);
    } catch {
      // Silencioso, não bloqueia UX
    }
  };

  const handleOpenNotifications = () => {
    setOpenNotifications(true);
    markAsRead();
  };

  // Paginação infinita no scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
      const nextPage = page + 1;
      setPage((prev: number) => prev + 1);
      loadActivities(nextPage, true);
    }
  };

  const loadActivities = useCallback(async (pageNum = 1, append = false) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/dashboard/activity?page=${pageNum}&limit=10`, { cache: "no-store" });
      const data = await res.json();
      const rawList = (data?.items ?? data ?? []) as unknown;
      const list: Activity[] = Array.isArray(rawList)
        ? rawList.map((x, i: number) => {
            const o = (typeof x === 'object' && x !== null) ? (x as Record<string, unknown>) : {};
            return {
              id: String(o.id ?? String(i)),
              title: String((o.title ?? o.action ?? 'Atividade') as unknown as string),
              description: o.description ? String(o.description) : (o.detail ? String(o.detail) : ''),
              createdAt: String(o.createdAt ?? new Date().toISOString()),
            };
          })
        : [];
      setActivities((prev: Activity[]) => append ? [...prev, ...list] : list);
      // setNotificationCount espera um número (não é setter do React). Usar valor direto.
      setNotificationCount(append ? notificationCount : list.length);
      setHasMore(list.length >= 10);
    } catch {
      if (!append) {
        setActivities([]);
        setNotificationCount(0);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, notificationCount, setNotificationCount]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // Usa contagem do contexto para sincronizar com header
  const notifCount = notificationCount;

  const role = (user?.role ?? '').toUpperCase();
  const isSysadmin = role === 'SYSADMIN';
  const profileLinks = [
    {
      href: "/admin/perfil",
      label: "Meu Perfil",
      icon: User
    },
    ...(isSysadmin
      ? [{ href: "/admin/settings", label: "Configurações", icon: Settings }]
      : [])
  ];
  const profileGridClass = profileLinks.length > 1 ? "grid-cols-2" : "grid-cols-1";

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-5 items-center justify-between px-2 py-2">
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" aria-label="Buscar" onClick={handleSearchOpen}>
            <Search className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" aria-label="Alternar tema" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Perfil"
            onClick={() => setOpenProfile(true)}
            className="rounded-full h-12 w-12 bg-[var(--primary)] text-white shadow-md border border-[var(--primary)] -mt-6 transition-transform active:scale-95"
            title="Perfil"
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" aria-label="Notificações" onClick={handleOpenNotifications} className="relative">
            <Bell className="h-6 w-6" />
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full" aria-label={`${notifCount} notificações`}>
                {Math.min(9, notifCount)}
              </span>
            )}
          </Button>
        </div>
        <div className="flex justify-center" />
      </div>

      {/* Sheet Notificações */}
      <Sheet open={openNotifications} onOpenChange={setOpenNotifications}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Notificações</SheetTitle>
          </SheetHeader>
          <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto" onScroll={handleScroll}>
            {activities.length === 0 ? (
              <div className="text-sm text-gray-600 dark:text-gray-300">Sem notificações no momento.</div>
            ) : (
              <>
                {activities.map((a) => (
                  <div key={a.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{a.title}</div>
                    {a.description && <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{a.description}</div>}
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{new Date(a.createdAt).toLocaleString()}</div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-center py-2">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </>
            )}
            <Link href="/admin/notifications" className="block text-center text-[var(--primary)] text-sm pt-1">Ver todas</Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sheet Perfil */}
      <Sheet open={openProfile} onOpenChange={setOpenProfile}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Perfil</SheetTitle>
          </SheetHeader>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold">{(user?.name ?? user?.username ?? 'U').slice(0,1).toUpperCase()}</div>
              <div>
                <div className="text-sm font-medium">{user?.name ?? user?.username}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</div>
              </div>
            </div>
            <div className={cn("grid gap-2", profileGridClass)}>
              {profileLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md border border-gray-200 dark:border-gray-700 p-3 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Icon className="h-4 w-4" /> {link.label}
                  </Link>
                );
              })}
            </div>
            <Button onClick={logout} className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-2" aria-label="Sair">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
