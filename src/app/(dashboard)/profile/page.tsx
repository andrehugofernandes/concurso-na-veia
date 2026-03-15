'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Building2, ShieldCheck, ShieldAlert, Timer, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarUploadModal } from '@/components/profile/avatar-upload-modal';
import { PasswordChangeCard } from '@/components/profile/password-change-card';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';
import { uploadAvatarAction, updatePasswordAction } from './actions';

export default function ProfilePage() {
  const { profile, loading, updateProfile, refetch } = useUserProfile();
  const { toast } = useToast();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    job_title: '',
    nivel: ''
  });
  const [saving, setSaving] = useState(false);

  // Initialize form data
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
    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadAvatarAction(formData);

    if (result.success) {
      refetch(); // Refresh profile to get new avatar
    }
    return result;
  };

  const handlePasswordChange = async (current: string, newPass: string) => {
    return await updatePasswordAction(current, newPass);
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <p>Perfil não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 md:p-[80px] pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Meu Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie suas informações pessoais e segurança.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <Card className="shadow-lg bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative h-32 w-32">
                <Avatar className="h-32 w-32 border-4 border-primary ring-4 ring-transparent group-hover:ring-primary/20 transition-all">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-primary/10 text-primary">{profile.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 p-1 bg-background rounded-full border border-border">
                  <div className="h-4 w-4 rounded-full bg-primary border-2 border-background"></div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {profile.full_name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  @{profile.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profile.email}
                </p>
                <div className="mt-2 flex gap-2 justify-center flex-wrap">
                  <Badge variant="secondary">{profile.role}</Badge>
                  {profile.plan && <Badge variant="outline" className="uppercase">{profile.plan}</Badge>}
                </div>
              </div>

              <Button
                onClick={() => setShowAvatarModal(true)}
                className="w-full"
              >
                Alterar Foto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Form Card */}
        <Card className="lg:col-span-2 shadow-lg bg-card border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <User className="h-5 w-5" /> Informações Pessoais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome Completo</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1"><Mail className="h-3 w-3" /> Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm opacity-50 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1"><Phone className="h-3 w-3" /> Telefone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1"><User className="h-3 w-3" /> Username</label>
                <input
                  type="text"
                  value={profile.username}
                  disabled
                  className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm opacity-50 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1"><Calendar className="h-3 w-3" /> Cargo Pretendido</label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  placeholder="Ex: Técnico de Operação"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1"><Building2 className="h-3 w-3" /> Nível</label>
                <input
                  type="text"
                  value={formData.nivel}
                  onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                  placeholder="Ex: Médio / Técnico"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Card */}
        <PasswordChangeCard onChangePassword={handlePasswordChange} />

        {/* Security / 2FA Card (Placeholder/Mock) */}
        <Card className="shadow-sm border-border bg-card opacity-80">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" /> Segurança da Conta
            </h3>
            <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/20">
              <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium">Autenticação de Dois Fatores (2FA)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sua conta está protegida. O 2FA adiciona uma camada extra de segurança.
                </p>
                <Badge variant="outline" className="mt-2 border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20">Ativo</Badge>
              </div>
            </div>
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
