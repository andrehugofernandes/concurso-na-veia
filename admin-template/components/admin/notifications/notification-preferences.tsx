'use client';

import { useState, useEffect } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface NotificationPreferences {
  newFileUploaded: boolean;
  fileUpdated: boolean;
  fileDeleted: boolean;
  categoryCreated: boolean;
  categoryDeleted: boolean;
  backupCompleted: boolean;
  systemError: boolean;
  securityAlert: boolean;
  systemAnnouncement: boolean;
  relevantFileInCategory: boolean;
}

const PREFERENCE_LABELS: Record<keyof NotificationPreferences, { label: string; description: string }> = {
  newFileUploaded: {
    label: 'Novos arquivos',
    description: 'Notificar quando novos arquivos forem enviados',
  },
  fileUpdated: {
    label: 'Arquivos atualizados',
    description: 'Notificar quando arquivos que você acessou forem atualizados',
  },
  fileDeleted: {
    label: 'Arquivos deletados',
    description: 'Notificar quando arquivos forem deletados (apenas admins)',
  },
  categoryCreated: {
    label: 'Novas categorias',
    description: 'Notificar quando novas categorias forem criadas (apenas admins)',
  },
  categoryDeleted: {
    label: 'Categorias deletadas',
    description: 'Notificar quando categorias forem deletadas (apenas admins)',
  },
  backupCompleted: {
    label: 'Backups',
    description: 'Notificar sobre status de backups (apenas admins)',
  },
  systemError: {
    label: 'Erros do sistema',
    description: 'Notificar sobre erros críticos (apenas admins)',
  },
  securityAlert: {
    label: 'Alertas de segurança',
    description: 'Notificar sobre atividades suspeitas (apenas admins)',
  },
  systemAnnouncement: {
    label: 'Anúncios do sistema',
    description: 'Notificar sobre avisos importantes e novidades',
  },
  relevantFileInCategory: {
    label: 'Arquivos em categorias inscritas',
    description: 'Notificar sobre novos arquivos em categorias que você segue',
  },
};

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notifications/preferences', {
        credentials: 'include',
      });
      
      if (res.ok) {
        const data = await res.json();
        setPreferences(data);
      }
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar preferências',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key: keyof NotificationPreferences) => {
    if (!preferences) return;

    const newValue = !preferences[key];
    
    // Atualizar localmente
    setPreferences(prev => prev ? { ...prev, [key]: newValue } : null);

    try {
      setSaving(true);
      const res = await fetch('/api/notifications/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ [key]: newValue }),
      });

      if (!res.ok) {
        throw new Error('Erro ao salvar');
      }

      toast({
        title: 'Sucesso',
        description: 'Preferência atualizada',
      });
    } catch (error) {
      console.error('Erro ao salvar preferência:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar preferência',
        variant: 'destructive',
      });
      // Reverter mudança
      setPreferences(prev => prev ? { ...prev, [key]: !newValue } : null);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Preferências de Notificação
          </CardTitle>
          <CardDescription>
            Gerencie quais notificações você deseja receber
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Preferências de Notificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Erro ao carregar preferências</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Preferências de Notificação
        </CardTitle>
        <CardDescription>
          Escolha quais tipos de notificações você deseja receber
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(PREFERENCE_LABELS).map(([key, { label, description }]) => (
            <div
              key={key}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              <div className="flex-1 pr-4">
                <div className="font-medium text-sm text-gray-900 dark:text-white">
                  {label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {description}
                </div>
              </div>
              <Switch
                checked={preferences[key as keyof NotificationPreferences]}
                onCheckedChange={() => handleToggle(key as keyof NotificationPreferences)}
                disabled={saving}
              />
            </div>
          ))}
        </div>

        {saving && (
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Salvando...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
