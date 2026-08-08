'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Loader2, 
  Crown, 
  KeyRound, 
  Pencil, 
  Check, 
  X,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Lock,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarUploadModal } from '@/components/profile/avatar-upload-modal';
import { PasswordChangeCard } from '@/components/profile/password-change-card';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { uploadAvatarAction, updatePasswordAction } from './actions';

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
  'free':              { label: 'Plano Gratuito',     color: 'border-slate-400 text-slate-500 bg-slate-50 dark:bg-slate-800/50' },
  'aprovado-medio':    { label: 'Aprovado Médio',     color: 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
  'aprovado-superior': { label: 'Aprovado Superior',  color: 'border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
  'elite-medio':       { label: 'Elite Médio',        color: 'border-cyan-500 text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' },
  'elite-superior':    { label: 'Elite Superior',     color: 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
  'elite-total':       { label: '💎 Elite Total',     color: 'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-900/20 font-bold' },
};

const ROLE_CONFIG: Record<string, { label: string; badge: string; icon: typeof Crown }> = {
  'sysadmin': { label: 'Super Administrador', badge: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-md', icon: Crown },
  'admin':    { label: 'Administrador',       badge: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-md', icon: Shield },
  'aluno':    { label: 'Estudante',           badge: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30', icon: User },
};

export default function ProfilePage() {
  const { profile, loading, updateProfile, refetch } = useUserProfile();
  const { toast } = useToast();
  const supabase = createClient();

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    job_title: '',
    nivel: ''
  });
  const [saving, setSaving] = useState(false);

  // Estados de Monitoramento de 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [checking2FA, setChecking2FA] = useState(true);
  const [aalLevel, setAalLevel] = useState('aal1');
  const [disabling2FA, setDisabling2FA] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        job_title: profile.job_title || '',
        nivel: profile.nivel || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    check2FAStatus();
  }, []);

  const check2FAStatus = async () => {
    try {
      setChecking2FA(true);
      const { data: factorsData } = await supabase.auth.mfa.listFactors();
      const verifiedFactors = factorsData?.totp?.filter((f) => f.status === 'verified') || [];
      setIs2FAEnabled(verifiedFactors.length > 0);

      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aalData?.currentLevel) {
        setAalLevel(aalData.currentLevel);
      }
    } catch (err) {
      console.error('[ProfilePage] Erro ao verificar estado 2FA:', err);
    } finally {
      setChecking2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!confirm('Tem certeza que deseja desativar a Autenticação de Dois Fatores (2FA)? Isso tornará sua conta menos segura.')) {
      return;
    }

    try {
      setDisabling2FA(true);
      const res = await fetch('/api/auth/reset-2fa', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Falha ao desativar 2FA.');
      }

      toast({
        title: '✅ 2FA Desativado',
        description: 'A autenticação de dois fatores foi removida da sua conta com sucesso.',
      });

      check2FAStatus();
    } catch (err: any) {
      console.error('[handleDisable2FA] Erro:', err);
      toast({
        title: 'Erro ao desativar 2FA',
        description: err.message || 'Ocorreu um erro ao desativar o 2FA.',
        variant: 'destructive',
      });
    } finally {
      setDisabling2FA(false);
    }
  };

  const formatPhone = (value: string) => {
    const raw = value.replace(/\D/g, "");
    if (!raw) return "";
    let formatted = raw.length > 2 ? `(${raw.slice(0, 2)}) ` : `(${raw}`;
    if (raw.length > 2) {
      const remaining = raw.slice(2);
      if (remaining.length > 5) {
        formatted += `${remaining.slice(0, 5)}-${remaining.slice(5, 9)}`;
      } else {
        formatted += remaining;
      }
    }
    return formatted;
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
        toast({ title: '✅ Perfil salvo', description: 'Suas informações foram atualizadas.' });
      } else {
        toast({
          title: 'Erro ao salvar',
          description: typeof result.error === 'string' ? result.error : 'Tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      console.error('[ProfilePage] Erro:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        job_title: profile.job_title || '',
        nivel: profile.nivel || ''
      });
    }
    setIsEditing(false);
  };

  const handleAvatarUpload = async (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    const result = await uploadAvatarAction(fd);
    if (result.success) refetch();
    return result;
  };

  const handlePasswordChange = async (current: string, newPass: string) => {
    return await updatePasswordAction(current, newPass);
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Carregando perfil...</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <p className="text-muted-foreground">Perfil não encontrado.</p>
      </div>
    );
  }

  const role = profile.role?.toLowerCase() || 'aluno';
  const roleConfig = ROLE_CONFIG[role] || ROLE_CONFIG['aluno'];
  const RoleIcon = roleConfig.icon;
  const planInfo = PLAN_LABELS[profile.plan || 'free'] || PLAN_LABELS['free'];
  const isAdmin = role === 'sysadmin' || role === 'admin';
  const initials = profile.full_name
    ?.split(' ')
    .map(n => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  return (
    <div className="px-4 py-3 md:px-12 md:py-8 pb-20 md:pb-6 max-w-5xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Voltar ao Dashboard
      </Link>

      {/* Hero Profile Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 shadow-lg">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-emerald-500 blur-3xl" />
        </div>

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <button
              onClick={() => setShowAvatarModal(true)}
              className="group relative flex-shrink-0"
            >
              <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-primary/30 ring-4 ring-transparent group-hover:ring-primary/20 transition-all shadow-xl">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} className="object-cover" />
                <AvatarFallback className="text-3xl md:text-4xl bg-primary/10 text-primary font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-card rounded-full border-2 border-border shadow-sm group-hover:scale-110 transition-transform">
                <Pencil className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>

            {/* Identity Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                {profile.full_name || 'Usuário'}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-muted-foreground">
                <span className="text-sm flex items-center justify-center md:justify-start gap-1">
                  <User className="h-3.5 w-3.5" /> @{profile.username}
                </span>
                <span className="hidden md:inline text-border">·</span>
                <span className="text-sm flex items-center justify-center md:justify-start gap-1">
                  <Mail className="h-3.5 w-3.5" /> {profile.email}
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1">
                <Badge className={cn('text-xs px-3 py-1', roleConfig.badge)}>
                  <RoleIcon className="h-3 w-3 mr-1" />
                  {roleConfig.label}
                </Badge>
                {!isAdmin && (
                  <Badge variant="outline" className={cn('text-xs px-3 py-1', planInfo.color)}>
                    {planInfo.label}
                  </Badge>
                )}
                {isAdmin && (
                  <Badge variant="outline" className="text-xs px-3 py-1 border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-900/20 font-bold">
                    💎 Acesso Total
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Form Card */}
      <Card className="shadow-md bg-card border-border">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" /> Informações Pessoais
            </h3>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Pencil className="h-3.5 w-3.5 mr-1.5" /> Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={saving}>
                  <X className="h-3.5 w-3.5 mr-1" /> Cancelar
                </Button>
                <Button size="sm" onClick={handleSave} disabled={saving}>
                  {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Check className="h-3.5 w-3.5 mr-1.5" />}
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {/* Nome Completo */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome Completo</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow"
                  placeholder="Seu nome completo"
                />
              ) : (
                <p className="text-sm font-medium text-foreground h-10 flex items-center">{profile.full_name || '—'}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Mail className="h-3 w-3" /> Email
              </label>
              <p className="text-sm text-foreground/70 h-10 flex items-center">{profile.email}</p>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <User className="h-3 w-3" /> Username
              </label>
              <p className="text-sm text-foreground/70 h-10 flex items-center">@{profile.username}</p>
            </div>

            {/* Permissão */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Shield className="h-3 w-3" /> Permissão
              </label>
              <div className="h-10 flex items-center">
                <Badge className={cn('text-xs', roleConfig.badge)}>
                  <RoleIcon className="h-3 w-3 mr-1" />
                  {roleConfig.label}
                </Badge>
              </div>
            </div>

            {/* Telefone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Phone className="h-3 w-3" /> Telefone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                  placeholder="(00) 00000-0000"
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow"
                />
              ) : (
                <p className="text-sm text-foreground/70 h-10 flex items-center">{formData.phone || '—'}</p>
              )}
            </div>

            {/* Plano */}
            {!isAdmin && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plano Atual</label>
                <div className="h-10 flex items-center">
                  <Badge variant="outline" className={cn('text-xs', planInfo.color)}>
                    {planInfo.label}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Security Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Card */}
        <PasswordChangeCard onChangePassword={handlePasswordChange} />

        {/* Security Card — Monitoramento e Controle em Tempo Real de 2FA */}
        <Card className="shadow-sm border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-primary" /> Segurança da Conta
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={check2FAStatus}
                disabled={checking2FA}
                className="h-8 text-xs text-muted-foreground hover:text-foreground"
                title="Atualizar status do 2FA"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1 ${checking2FA ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
            </div>

            {checking2FA ? (
              <div className="p-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2 border rounded-xl bg-muted/20">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Verificando estado do 2FA no Supabase...
              </div>
            ) : is2FAEnabled ? (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border border-emerald-500/30 rounded-2xl bg-emerald-500/5">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-foreground">Autenticação 2FA Ativada</h4>
                      <Badge className="bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5">
                        ATIVO & PROTEGIDO
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sua conta possui verificação TOTP ativada por aplicativo autenticador.
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Nível de Garantia: {aalLevel === 'aal2' ? 'AAL2 (Sessão Verificada via 2FA)' : 'AAL1 (Proteção Configurada)'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Link href="/auth/setup-2fa">
                    <Button variant="outline" size="sm" className="text-xs font-semibold">
                      <Smartphone className="w-3.5 h-3.5 mr-1.5" />
                      Reconfigurar 2FA
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDisable2FA}
                    disabled={disabling2FA}
                    className="text-xs font-semibold"
                  >
                    {disabling2FA ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />}
                    {disabling2FA ? 'Desativando...' : 'Desativar 2FA'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border border-amber-500/30 rounded-2xl bg-amber-500/5">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-foreground">Autenticação 2FA Desativada</h4>
                      <Badge variant="outline" className="border-amber-500/50 text-amber-600 text-[10px] px-2 py-0.5">
                        NÃO CONFIGURADO
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {isAdmin ? (
                        <strong className="text-amber-700 dark:text-amber-300">
                          Recomendação SYSADMIN: Adicione a verificação de dois fatores para proteger o painel da plataforma contra acessos indevidos.
                        </strong>
                      ) : (
                        "Adicione uma camada extra de segurança à sua conta utilizando um aplicativo autenticador."
                      )}
                    </p>
                  </div>
                </div>

                <Link href="/auth/setup-2fa" className="block">
                  <Button className="w-full bg-primary text-primary-foreground font-bold text-xs py-2.5 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Ativar Autenticação 2FA Agora
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AvatarUploadModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onUpload={handleAvatarUpload}
        currentAvatarUrl={profile.avatar_url}
      />
    </div>
  );
}
