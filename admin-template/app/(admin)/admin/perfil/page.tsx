'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Building2, ShieldCheck, ShieldAlert, Timer, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { AvatarUploadModal } from '@/components/profile/AvatarUploadModal';
// removido import não utilizado que causava lint: @typescript-eslint/no-unused-vars
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';

export default function PerfilPage() {
  const { profile, loading, updateProfile, uploadAvatar } = useUserProfile();
  const { toast } = useToast();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    job_title: '',
    sei_unit: ''
  });
  const [saving, setSaving] = useState(false);
  const [twoFactorRemainingDays, setTwoFactorRemainingDays] = useState<number | null>(null);

  // Atualizar formData quando profile carregar
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        job_title: profile.job_title || '',
        sei_unit: profile.sei_unit || ''
      });
    }
  }, [profile]);

  // Buscar status 2FA
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/auth/2fa/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
          signal: controller.signal,
        });
        if (!res.ok) {
          setTwoFactorRemainingDays(90);
          return;
        }
        const data: { remainingDays?: number; expiresAt?: string } = await res.json();
        if (typeof data?.remainingDays === 'number') {
          setTwoFactorRemainingDays(Math.floor(data.remainingDays));
        } else if (data?.expiresAt) {
          const expiresAt = new Date(data.expiresAt);
          const today = new Date();
          expiresAt.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          const diffMs = expiresAt.getTime() - today.getTime();
          setTwoFactorRemainingDays(Math.floor(diffMs / (24 * 60 * 60 * 1000)));
        } else {
          setTwoFactorRemainingDays(90);
        }
      } catch {
        setTwoFactorRemainingDays(90);
      }
    })();
    return () => controller.abort();
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length <= 11) {
      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }
    }
    
    setFormData({ ...formData, phone: value });
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateProfile(formData);
    setSaving(false);
    
    if (result.success) {
      toast({
        title: 'Sucesso',
        description: 'Perfil atualizado com sucesso!',
      });
    } else {
      toast({
        title: 'Erro',
        description: result.error || 'Erro ao atualizar perfil',
        variant: 'destructive',
      });
    }
  };

  const handleAvatarUpload = async (file: File) => {
    const result = await uploadAvatar(file);
    if (result.success) {
      toast({
        title: 'Sucesso',
        description: 'Avatar atualizado com sucesso!',
      });
    }
    return result;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Perfil não encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Meu Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie suas informações pessoais
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Avatar */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full border-[6px] border-[var(--primary)]">
                <UserAvatar
                  name={profile.full_name || profile.name}
                  avatarUrl={profile.avatar_url}
                  size="xl"
                  showBadge
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {profile.full_name || profile.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  @{profile.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.email}
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary)] text-white">
                    {profile.role}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setShowAvatarModal(true)}
                className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
              >
                Alterar Foto
              </Button>

              {profile.ad_last_sync && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Última sinc. AD: {new Date(profile.ad_last_sync).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card de Informações */}
        <Card className="lg:col-span-2 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Informações Pessoais</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome Completo
              </label>
              <input
                id="full_name"
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail size={16} className="inline mr-1" />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={profile.email}
                disabled
                aria-label="Email (somente leitura)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Phone size={16} className="inline mr-1" />
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="(81) 99999-9999"
                maxLength={15}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User size={16} className="inline mr-1" />
                Username
              </label>
              <input
                id="username"
                type="text"
                value={profile.username}
                disabled
                aria-label="Username (somente leitura)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
              />
            </div>
            
            <div>
              <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Cargo
              </label>
              <input
                id="job_title"
                type="text"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                placeholder="Ex: Desenvolvedor, Analista..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="sei_unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Building2 size={16} className="inline mr-1" />
                Unidade no SEI
              </label>
              <input
                id="sei_unit"
                type="text"
                value={formData.sei_unit}
                onChange={(e) => setFormData({ ...formData, sei_unit: e.target.value })}
                placeholder="Ex: SESAU/DVPNI/GVAC"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
          </CardContent>
        </Card>
      </div>

      {/* Card de Segurança - Status 2FA */}
      <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Segurança
          </h3>
          
          <div className={cn(
            'relative overflow-hidden rounded-xl border p-5 transition-colors duration-200',
            twoFactorRemainingDays === null 
              ? 'border-blue-300 bg-blue-50/80 dark:border-blue-900 dark:bg-blue-950/10'
              : twoFactorRemainingDays < 0
              ? 'border-rose-400 bg-rose-50/80 dark:border-rose-700 dark:bg-rose-950/20'
              : twoFactorRemainingDays === 0
              ? 'border-amber-400 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-900/20'
              : twoFactorRemainingDays <= 15
              ? 'border-amber-300 bg-amber-50/60 dark:border-amber-600 dark:bg-amber-900/15'
              : 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-900/20'
          )}>
            <div className="flex items-start gap-4">
              <div className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full shadow-sm',
                twoFactorRemainingDays === null
                  ? 'bg-blue-100/80 dark:bg-blue-900/30'
                  : twoFactorRemainingDays < 0 || twoFactorRemainingDays === 0
                  ? 'bg-rose-100/80 dark:bg-rose-900/30'
                  : twoFactorRemainingDays <= 15
                  ? 'bg-amber-100/70 dark:bg-amber-800/30'
                  : 'bg-emerald-100/80 dark:bg-emerald-900/30'
              )}>
                {twoFactorRemainingDays === null ? (
                  <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                ) : twoFactorRemainingDays < 0 || twoFactorRemainingDays === 0 ? (
                  <ShieldAlert className="h-5 w-5 text-rose-600" />
                ) : twoFactorRemainingDays <= 15 ? (
                  <Timer className="h-5 w-5 text-amber-500" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    Autenticação de Dois Fatores (2FA)
                  </p>
                  <Badge className={cn(
                    'text-xs font-semibold uppercase tracking-wide',
                    twoFactorRemainingDays === null
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : twoFactorRemainingDays < 0
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                      : twoFactorRemainingDays === 0
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                      : twoFactorRemainingDays <= 15
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  )}>
                    {twoFactorRemainingDays === null
                      ? 'Carregando'
                      : twoFactorRemainingDays < 0
                      ? 'Expirado'
                      : twoFactorRemainingDays === 0
                      ? 'Expira Hoje'
                      : twoFactorRemainingDays <= 15
                      ? 'Atenção'
                      : 'Em Dia'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {twoFactorRemainingDays === null
                    ? 'Carregando informações de expiração...'
                    : twoFactorRemainingDays < 0
                    ? 'Expirado • você precisa reconfigurar o 2FA agora.'
                    : twoFactorRemainingDays === 0
                    ? 'Expira hoje • reconfigure o 2FA imediatamente.'
                    : twoFactorRemainingDays <= 15
                    ? `Renove em ${twoFactorRemainingDays} dias para manter a segurança.`
                    : `Ciclo válido • ${twoFactorRemainingDays} dias restantes (janela de 90 dias).`}
                </p>
                {twoFactorRemainingDays !== null && (
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{90 - twoFactorRemainingDays} dias corridos</span>
                      <span>{twoFactorRemainingDays} dias restantes</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500 ease-out',
                          twoFactorRemainingDays < 0 || twoFactorRemainingDays === 0
                            ? 'bg-rose-500'
                            : twoFactorRemainingDays <= 15
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        )}
                        style={{ width: `${Math.min(100, Math.max(0, ((90 - twoFactorRemainingDays) / 90) * 100))}%` }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Upload */}
      <AvatarUploadModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onUpload={handleAvatarUpload}
        currentAvatarUrl={profile.avatar_url}
      />
    </div>
  );
}
