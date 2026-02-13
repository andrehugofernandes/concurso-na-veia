'use client';

import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Timer,
  Loader2,
  Mail,
  Phone,
  User,
  Building2,
  IdCard,
  KeyRound,
  UserCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/ui/user-avatar';
import { AvatarUploadModal } from '@/components/profile/avatar-upload-modal';
import { ChangePasswordForm } from '@/components/profile/change-password-form';
import { useAvatarUpload } from '@/lib/hooks/use-avatar-upload';

interface TwoFactorStatus {
  enabled: boolean;
  expiresAt: string | null;
  remainingDays: number | null;
}

interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: string;
  phone?: string;
  jobTitle?: string;
  seiUnit?: string;
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [twoFactorStatus, setTwoFactorStatus] = useState<TwoFactorStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const { uploadAvatar } = useAvatarUpload();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    jobTitle: '',
    seiUnit: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Buscar dados do usuário e status 2FA
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        // Buscar perfil do usuário
        const profileRes = await fetch('/api/auth/me', {
          signal: controller.signal,
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUserProfile(profileData);
          setFormData({
            fullName: profileData.fullName || '',
            phone: profileData.phone || '',
            jobTitle: profileData.jobTitle || '',
            seiUnit: profileData.seiUnit || ''
          });
        }

        // Buscar status 2FA
        const res = await fetch('/api/auth/twofa/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
          signal: controller.signal,
        });
        if (res.ok) {
          const data = await res.json();
          setTwoFactorStatus({
            enabled: data.enabled || false,
            expiresAt: data.expiresAt || null,
            remainingDays: typeof data.remainingDays === 'number' ? data.remainingDays : null,
          });
        } else {
          setTwoFactorStatus({
            enabled: false,
            expiresAt: null,
            remainingDays: 0,
          });
        }
      } catch {
        setUserProfile(null);
        setTwoFactorStatus({
          enabled: false,
          expiresAt: null,
          remainingDays: 0,
        });
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
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
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        setUserProfile(updated);
        setFormData({
          fullName: updated.fullName || '',
          phone: updated.phone || '',
          jobTitle: updated.jobTitle || '',
          seiUnit: updated.seiUnit || '',
        });
      }
    } catch {
      // erro silencioso
    } finally {
      setSaving(false);
    }
  };

  const getSecurityStatus = () => {
    if (twoFactorStatus === null || twoFactorStatus.remainingDays === null) {
      return { label: 'Carregando...', variant: 'loading', icon: Loader2 };
    }
    if (!twoFactorStatus.enabled) {
      return { label: 'Desativado', variant: 'disabled', icon: ShieldAlert };
    }
    if (twoFactorStatus.remainingDays < 0) {
      return { label: 'Expirado', variant: 'expired', icon: ShieldAlert };
    }
    if (twoFactorStatus.remainingDays === 0) {
      return { label: 'Expira Hoje', variant: 'today', icon: Timer };
    }
    if (twoFactorStatus.remainingDays <= 15) {
      return { label: 'Atenção', variant: 'warning', icon: Timer };
    }
    return { label: 'Em Dia', variant: 'ok', icon: ShieldCheck };
  };

  const status = getSecurityStatus();
  const StatusIcon = status.icon;
  const progressMax = 90;
  const progressNow =
    twoFactorStatus && twoFactorStatus.remainingDays !== null
      ? Math.max(0, Math.min(progressMax, progressMax - (twoFactorStatus.remainingDays ?? 0)))
      : 0;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Perfil não encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Meu Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie suas informações pessoais e segurança
        </p>
      </div>

      {/* Grid: Avatar (esquerda) + Informações (direita) */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card de Avatar */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-slate-200/70 dark:shadow-black/20 p-6">
            <div className="flex items-center justify-between w-full mb-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary,#0037C1)]/10 dark:bg-[var(--primary,#0037C1)]/15 text-[var(--primary,#0037C1)]">
                  <UserCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                Perfil
              </h3>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative inline-flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-[6px] border-[var(--primary,#0037C1)] aspect-square">
                <UserAvatar
                  name={userProfile.fullName || userProfile.username}
                  avatarUrl={userProfile.avatarUrl || undefined}
                  size="xl"
                />
                <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-800 shadow-[0_0_0_2px_rgba(0,0,0,0.08)] translate-x-1/4 translate-y-1/4" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {userProfile.fullName || userProfile.username}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  @{userProfile.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userProfile.email}
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary,#0037C1)] text-white">
                    {userProfile.role}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowAvatarModal(true)}
                className="w-full px-4 py-2 bg-[var(--primary,#0037C1)] hover:bg-[var(--primary-hover,#0037C1)] text-white font-medium rounded-lg transition-colors"
              >
                Alterar Foto
              </button>
            </div>
          </div>

          {/* Card de Informações Pessoais */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-slate-200/70 dark:shadow-black/20 p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary,#0037C1)]/10 dark:bg-[var(--primary,#0037C1)]/15 text-[var(--primary,#0037C1)]">
                <IdCard className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informações Pessoais</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary,#0037C1)] focus:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  value={userProfile.email}
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary,#0037C1)] focus:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  value={userProfile.username}
                  disabled
                  aria-label="Username (somente leitura)"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cargo
                </label>
                <input
                  id="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="Ex: Desenvolvedor, Analista..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary,#0037C1)] focus:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="seiUnit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Building2 size={16} className="inline mr-1" />
                  Unidade no SEI
                </label>
                <input
                  id="seiUnit"
                  type="text"
                  value={formData.seiUnit}
                  onChange={(e) => setFormData({ ...formData, seiUnit: e.target.value })}
                  placeholder="Ex: SESAU/DVPNI/GVAC"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[var(--primary,#0037C1)] focus:border-gray-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-[var(--primary,#0037C1)] hover:bg-[var(--primary-hover,#0037C1)] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards: Segurança (2FA) e Alterar Senha */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Segurança / 2FA */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-slate-200/70 dark:shadow-black/20 p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary,#0037C1)]/10 dark:bg-[var(--primary,#0037C1)]/15 text-[var(--primary,#0037C1)]">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              Segurança
            </h3>

            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">
              Autenticação de Dois Fatores
            </h4>

            {loading ? (
              <div className="flex items-center justify-center py-8" role="status" aria-live="polite">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" aria-hidden="true" />
                <span className="sr-only">Carregando status 2FA</span>
              </div>
            ) : twoFactorStatus ? (
              <div
                className={cn(
                  'relative overflow-hidden rounded-xl border p-5 transition-colors duration-200',
                  status.variant === 'loading'
                    ? 'border-[var(--primary,#0037C1)]/50 bg-[var(--primary,#0037C1)]/10 dark:border-[var(--primary,#0037C1)]/40 dark:bg-[var(--primary,#0037C1)]/15'
                    : status.variant === 'expired'
                    ? 'border-rose-400 bg-rose-50/80 dark:border-rose-700 dark:bg-rose-950/20'
                    : status.variant === 'today'
                    ? 'border-[var(--primary,#0037C1)]/60 bg-[var(--primary,#0037C1)]/12 dark:border-[var(--primary,#0037C1)]/50 dark:bg-[var(--primary,#0037C1)]/18'
                    : status.variant === 'warning'
                    ? 'border-[var(--primary,#0037C1)]/50 bg-[var(--primary,#0037C1)]/10 dark:border-[var(--primary,#0037C1)]/40 dark:bg-[var(--primary,#0037C1)]/15'
                    : 'border-[var(--primary,#0037C1)]/50 bg-[var(--primary,#0037C1)]/8 dark:border-[var(--primary,#0037C1)]/40 dark:bg-[var(--primary,#0037C1)]/12'
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full shadow-sm flex-shrink-0',
                      status.variant === 'loading'
                        ? 'bg-[var(--primary,#0037C1)]/15 dark:bg-[var(--primary,#0037C1)]/20'
                        : status.variant === 'expired' || status.variant === 'today'
                        ? 'bg-[var(--primary,#0037C1)]/15 dark:bg-[var(--primary,#0037C1)]/20'
                        : status.variant === 'warning'
                        ? 'bg-[var(--primary,#0037C1)]/15 dark:bg-[var(--primary,#0037C1)]/20'
                        : 'bg-[var(--primary,#0037C1)]/15 dark:bg-[var(--primary,#0037C1)]/20'
                    )}
                  >
                    <StatusIcon
                      className={cn(
                        'h-5 w-5',
                        status.variant === 'loading'
                          ? 'text-[var(--primary,#0037C1)] animate-spin'
                          : status.variant === 'expired' || status.variant === 'today'
                          ? 'text-[var(--primary,#0037C1)]'
                          : status.variant === 'warning'
                          ? 'text-[var(--primary,#0037C1)]'
                          : 'text-[var(--primary,#0037C1)]'
                      )}
                    />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap" aria-live="polite">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        2FA
                      </p>
                      <span
                        className={cn(
                          'text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full whitespace-nowrap',
                          status.variant === 'loading'
                            ? 'bg-[var(--primary,#0037C1)]/15 text-[var(--primary,#0037C1)] dark:bg-[var(--primary,#0037C1)]/25 dark:text-[var(--primary,#0037C1)]'
                            : status.variant === 'expired'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                            : status.variant === 'today'
                            ? 'bg-[var(--primary,#0037C1)]/15 text-[var(--primary,#0037C1)] dark:bg-[var(--primary,#0037C1)]/25 dark:text-[var(--primary,#0037C1)]'
                            : status.variant === 'warning'
                            ? 'bg-[var(--primary,#0037C1)]/15 text-[var(--primary,#0037C1)] dark:bg-[var(--primary,#0037C1)]/25 dark:text-[var(--primary,#0037C1)]'
                            : 'bg-[var(--primary,#0037C1)]/12 text-[var(--primary,#0037C1)] dark:bg-[var(--primary,#0037C1)]/20 dark:text-[var(--primary,#0037C1)]'
                        )}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {!twoFactorStatus.enabled
                        ? 'Autenticação de dois fatores não está configurada.'
                        : twoFactorStatus.remainingDays === null
                        ? 'Carregando informações de expiração...'
                        : twoFactorStatus.remainingDays < 0
                        ? 'Expirado • você precisa reconfigurar o 2FA agora.'
                        : twoFactorStatus.remainingDays === 0
                        ? 'Expira hoje • reconfigure o 2FA imediatamente.'
                        : twoFactorStatus.remainingDays <= 15
                        ? `Renove em ${twoFactorStatus.remainingDays} dias para manter a segurança.`
                        : `Ciclo válido • ${twoFactorStatus.remainingDays} dias restantes (janela de 90 dias).`}
                    </p>

                    {twoFactorStatus.enabled && twoFactorStatus.remainingDays !== null && (
                      <div className="space-y-1 pt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{90 - twoFactorStatus.remainingDays} dias corridos</span>
                          <span>{twoFactorStatus.remainingDays} dias restantes</span>
                        </div>
                        <progress
                          className={cn(
                            'h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
                            '[accent-color:var(--primary,#0037C1)]'
                          )}
                          value={progressNow}
                          max={progressMax}
                          aria-label="Progresso do ciclo de 2FA"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Não foi possível carregar o status de 2FA
              </div>
            )}
          </div>

          {/* Card Alterar Senha */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg shadow-slate-200/70 dark:shadow-black/20 p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary,#0037C1)]/10 dark:bg-[var(--primary,#0037C1)]/15 text-[var(--primary,#0037C1)]">
                <KeyRound className="h-5 w-5" aria-hidden="true" />
              </span>
              Alterar Senha
            </h3>

            <ChangePasswordForm />
          </div>
        </div>
      )}

      {/* Modal de Upload de Avatar */}
      <AvatarUploadModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onUpload={async (file) => {
          const result = await uploadAvatar(file);
          if (result.success && userProfile) {
            setUserProfile({
              ...userProfile,
              avatarUrl: result.url || null,
            });
          }
          return result;
        }}
        currentAvatarUrl={userProfile?.avatarUrl}
      />
    </div>
  );
}
