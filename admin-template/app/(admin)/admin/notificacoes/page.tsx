'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, FileText, FolderTree, Database, Shield, Megaphone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  priority: string;
  isRead: boolean;
  readAt: Date | null;
  actionUrl: string | null;
  createdAt: string;
}

const NOTIFICATION_ICONS: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  file: { icon: FileText, color: 'text-blue-600 dark:text-blue-400' },
  category: { icon: FolderTree, color: 'text-purple-600 dark:text-purple-400' },
  backup: { icon: Database, color: 'text-green-600 dark:text-green-400' },
  system: { icon: Shield, color: 'text-orange-600 dark:text-orange-400' },
  security: { icon: Shield, color: 'text-red-600 dark:text-red-400' },
  announcement: { icon: Megaphone, color: 'text-yellow-600 dark:text-yellow-400' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const unreadOnly = filter === 'unread';
      const res = await fetch(`/api/notifications?limit=50&unreadOnly=${unreadOnly}`, {
        credentials: 'include',
      });
      
      if (res.ok) {
        const data = await res.json();
        let notifs = data.notifications || [];
        
        if (filter === 'read') {
          notifs = notifs.filter((n: Notification) => n.isRead);
        }
        
        setNotifications(notifs);
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
        credentials: 'include',
      });
      
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true, readAt: new Date() } : n)
      );
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'POST',
        credentials: 'include',
      });
      
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true, readAt: new Date() })));
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    
    if (diff < 1) return 'agora';
    if (diff < 60) return `${diff} min atrás`;
    if (diff < 1440) return `${Math.floor(diff / 60)} h atrás`;
    if (diff < 10080) return `${Math.floor(diff / 1440)} dias atrás`;
    return date.toLocaleDateString('pt-BR');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Bell className="h-8 w-8 text-[var(--primary)]" />
            Notificações
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerencie todas as suas notificações
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Marcar todas como lidas
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {notifications.length}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Não Lidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {unreadCount}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Check className="h-4 w-4" />
              Lidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {notifications.length - unreadCount}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status:
            </span>
            <Select value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread' | 'read')}>
              <SelectTrigger className="w-[200px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="unread">Não Lidas ({unreadCount})</SelectItem>
                <SelectItem value="read">Lidas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            {notifications.length} {notifications.length === 1 ? 'Notificação' : 'Notificações'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Nenhuma notificação encontrada</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => {
                const iconData = NOTIFICATION_ICONS[notification.type] || NOTIFICATION_ICONS.system;
                const Icon = iconData.icon;
                
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-4 rounded-lg border transition-all duration-200 hover:shadow-md',
                      notification.isRead
                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 shadow-sm'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'p-2 rounded-lg',
                        notification.isRead 
                          ? 'bg-gray-100 dark:bg-gray-700' 
                          : 'bg-blue-100 dark:bg-blue-900/30'
                      )}>
                        <Icon className={cn('h-5 w-5', iconData.color)} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                          
                          {!notification.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-[var(--primary)] border-[var(--primary)] bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-800/60 hover:text-[var(--primary-hover)] dark:text-blue-300 dark:border-blue-500 transition-colors"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Marcar como lida
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
