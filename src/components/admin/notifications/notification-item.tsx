'use client';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, FolderTree, Database, AlertTriangle, Shield, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotificationItemProps {
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    priority: string;
    isRead: boolean;
    readAt: Date | null;
    actionUrl: string | null;
    createdAt: Date;
  };
  onMarkAsRead: (id: string) => void;
  onClose: () => void;
}

const iconMap = {
  file: FileText,
  category: FolderTree,
  backup: Database,
  system: AlertTriangle,
  security: Shield,
};

const priorityColors = {
  info: 'text-blue-600 dark:text-blue-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
};

const priorityBgColors = {
  info: 'bg-blue-50 dark:bg-blue-900/20',
  success: 'bg-green-50 dark:bg-green-900/20',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20',
  error: 'bg-red-50 dark:bg-red-900/20',
};

export function NotificationItem({ notification, onMarkAsRead, onClose }: NotificationItemProps) {
  const router = useRouter();
  const Icon = iconMap[notification.type as keyof typeof iconMap] || AlertTriangle;
  const priorityColor = priorityColors[notification.priority as keyof typeof priorityColors] || priorityColors.info;
  const priorityBg = priorityBgColors[notification.priority as keyof typeof priorityBgColors] || priorityBgColors.info;

  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }

    if (notification.actionUrl) {
      onClose();
      router.push(notification.actionUrl);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        'relative px-4 py-3 transition-colors cursor-pointer',
        !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
      )}
    >
      {/* Indicador de não lida */}
      {!notification.isRead && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
      )}

      <div className="flex items-start gap-3 ml-2">
        {/* Ícone */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${priorityBg} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${priorityColor}`} />
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`text-sm font-semibold ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              {notification.title}
            </h4>
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(notification.id);
                }}
              >
                <Check className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">
            {notification.message}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {timeAgo}
          </p>
        </div>
      </div>
    </div>
  );
}
