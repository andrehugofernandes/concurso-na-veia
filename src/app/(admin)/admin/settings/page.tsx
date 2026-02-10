'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  CloudCog,
  Database,
  Info,
  ServerCog,
  Settings,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Loader2,
  Copy,
  Save,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { BackupPolicyCard } from "@/components/admin/settings/backup-policy-card";

const cardStyle = "shadow-lg rounded-lg border-none overflow-hidden bg-white dark:bg-gray-800";
const TWO_FACTOR_WINDOW_DAYS = 90;

type TwoFaVariant = 'loading' | 'expired' | 'today' | 'warning' | 'ok';

interface TwoFaSubtitleInfo {
  label: string;
  variant: TwoFaVariant;
}

interface TwoFaCycleInfo {
  remaining: number;
  consumed: number;
  percent: number;
}

interface TwoFaStylesConfig {
  container: string;
  icon: LucideIcon;
  iconClass: string;
  iconBg: string;
  badgeLabel: string;
  badgeClass: string;
  barClass: string;
  baseBarClass: string;
}

const TWO_FA_PROGRESS_WIDTH_CLASSES: Record<number, string> = {
  0: 'w-0',
  5: 'w-[5%]',
  10: 'w-[10%]',
  15: 'w-[15%]',
  20: 'w-[20%]',
  25: 'w-[25%]',
  30: 'w-[30%]',
  35: 'w-[35%]',
  40: 'w-[40%]',
  45: 'w-[45%]',
  50: 'w-[50%]',
  55: 'w-[55%]',
  60: 'w-[60%]',
  65: 'w-[65%]',
  70: 'w-[70%]',
  75: 'w-[75%]',
  80: 'w-[80%]',
  85: 'w-[85%]',
  90: 'w-[90%]',
  95: 'w-[95%]',
  100: 'w-[100%]',
};

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
  const [twoFactorRemainingDays, setTwoFactorRemainingDays] = useState<number | null>(null);
  
  // Estados para políticas de segurança
  const [forceTwoFactor, setForceTwoFactor] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState<'basic' | 'strong' | 'ad'>('ad');
  const [sessionTimeoutMin, setSessionTimeoutMin] = useState(30);
  const [securityLoading, setSecurityLoading] = useState(true);
  const [securitySaving, setSecuritySaving] = useState(false);

  const role = useMemo(() => (user?.role ?? "").toUpperCase(), [user?.role]);
  const isSysadmin = role === "SYSADMIN";
  
  // Permissões por seção
  const canAccessSettings = isSysadmin;
  const canEditSecurity = isSysadmin;

  // environmentLabel e environmentClass removidos (não utilizados após comentar badges no header)

  const summaryCards = [
    {
      title: "Active Directory",
      headline: "Operacional",
      description: "Última sincronização há 2 horas",
      icon: ServerCog,
      accent: "text-blue-600",
    },
    {
      title: "Backups",
      headline: "12h atrás",
      description: "Próxima execução hoje às 23h",
      icon: Database,
      accent: "text-emerald-600",
    },
    {
      title: "Alertas críticos",
      headline: "1 incidente",
      description: "Fila de e-mails requer atenção",
      icon: ShieldAlert,
      accent: "text-amber-600",
    },
  ] as const;

  useEffect(() => {
    // Buscar status 2FA para obter dias restantes de expiração
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
          console.error('[Settings] Erro ao buscar status 2FA:', res.status);
          // Definir valor padrão para não ficar com spinner eternamente
          setTwoFactorRemainingDays(90); // Valor padrão: 90 dias
          return;
        }
        const data: { remainingDays?: number; expiresAt?: string; user?: { twoFactorExpiresAt?: string } } = await res.json();
        // Tentar várias formas de acessar a informação
        if (typeof data?.remainingDays === 'number') {
          setTwoFactorRemainingDays(Math.floor(data.remainingDays));
          return;
        }
        const expiresAtStr: string | undefined = data?.expiresAt || data?.user?.twoFactorExpiresAt;
        if (expiresAtStr) {
          const expiresAt = new Date(expiresAtStr);
          const today = new Date();
          // Normalizar para meia-noite
          expiresAt.setHours(0,0,0,0);
          today.setHours(0,0,0,0);
          const diffMs = expiresAt.getTime() - today.getTime();
          const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
          setTwoFactorRemainingDays(diffDays);
        } else {
          // Se não houver data de expiração, definir valor padrão
          setTwoFactorRemainingDays(90);
        }
      } catch (error) {
        console.error('[Settings] Erro ao buscar status 2FA:', error);
        // Definir valor padrão para não ficar com spinner eternamente
        setTwoFactorRemainingDays(90);
      }
    })();
    return () => controller.abort();
  }, []);

  // Carregar políticas de segurança
  useEffect(() => {
    const controller = new AbortController();
    if (!canAccessSettings) {
      setSecurityLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/security/settings', {
          method: 'GET',
          signal: controller.signal,
          credentials: 'include',
        });
        if (!res.ok) {
          console.error('[Settings] Erro ao carregar políticas de segurança:', res.status);
          return;
        }
        const data = await res.json();
        setForceTwoFactor(data.forceTwoFactor ?? true);
        setPasswordPolicy(data.passwordPolicy ?? 'ad');
        setSessionTimeoutMin(data.sessionTimeoutMin ?? 30);
      } catch (error) {
        console.error('[Settings] Erro ao carregar políticas:', error);
      } finally {
        setSecurityLoading(false);
      }
    })();
    return () => controller.abort();
  }, [canAccessSettings]);

  const twoFaSubtitle = useMemo<TwoFaSubtitleInfo>(() => {
    if (twoFactorRemainingDays === null) {
      return { label: 'Carregando janela de expiração...', variant: 'loading' as const };
    }

    if (twoFactorRemainingDays < 0) {
      return { label: 'Expirado • usuários precisarão reconfigurar agora.', variant: 'expired' as const };
    }

    if (twoFactorRemainingDays === 0) {
      return { label: 'Expira hoje • orientar reconfiguração imediata.', variant: 'today' as const };
    }

    if (twoFactorRemainingDays <= 15) {
      return {
        label: `Renovar em ${twoFactorRemainingDays} dias para manter a segurança.`,
        variant: 'warning' as const,
      };
    }

    return {
      label: `Ciclo válido • ${twoFactorRemainingDays} dias restantes (janela de ${TWO_FACTOR_WINDOW_DAYS} dias).`,
      variant: 'ok' as const,
    };
  }, [twoFactorRemainingDays]);

  const twoFaCycle = useMemo<TwoFaCycleInfo | null>(() => {
    if (twoFactorRemainingDays === null) {
      return null;
    }
    const clampedRemaining = Math.max(0, Math.min(TWO_FACTOR_WINDOW_DAYS, twoFactorRemainingDays));
    const consumed = TWO_FACTOR_WINDOW_DAYS - clampedRemaining;
    const percent = Math.min(100, Math.max(0, Math.round((consumed / TWO_FACTOR_WINDOW_DAYS) * 100)));
    return {
      remaining: clampedRemaining,
      consumed,
      percent,
    };
  }, [twoFactorRemainingDays]);

  const twoFaStyles = useMemo<TwoFaStylesConfig>(() => {
    switch (twoFaSubtitle.variant) {
      case 'loading':
        return {
          container: 'border-blue-300 bg-blue-50/80 dark:border-blue-900 dark:bg-blue-950/10',
          icon: Loader2,
          iconClass: 'h-5 w-5 text-blue-600 animate-spin',
          iconBg: 'bg-blue-100/80 dark:bg-blue-900/30',
          badgeLabel: 'Sincronizando',
          badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
          barClass: 'bg-blue-500',
          baseBarClass: 'transition-all duration-500 ease-out',
        };
      case 'expired':
        return {
          container: 'border-rose-400 bg-rose-50/80 dark:border-rose-700 dark:bg-rose-950/20',
          icon: ShieldOff,
          iconClass: 'h-5 w-5 text-rose-600',
          iconBg: 'bg-rose-100/80 dark:bg-rose-900/30',
          badgeLabel: 'Expirado',
          badgeClass: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
          barClass: 'bg-rose-500',
          baseBarClass: 'transition-all duration-500 ease-out',
        };
      case 'today':
        return {
          container: 'border-amber-400 bg-amber-50/80 dark:border-amber-700 dark:bg-amber-900/20',
          icon: Timer,
          iconClass: 'h-5 w-5 text-amber-600',
          iconBg: 'bg-amber-100/80 dark:bg-amber-900/30',
          badgeLabel: 'Último dia',
          badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
          barClass: 'bg-amber-500',
          baseBarClass: 'transition-all duration-500 ease-out',
        };
      case 'warning':
        return {
          container: 'border-amber-300 bg-amber-50/60 dark:border-amber-600 dark:bg-amber-900/15',
          icon: Timer,
          iconClass: 'h-5 w-5 text-amber-500',
          iconBg: 'bg-amber-100/70 dark:bg-amber-800/30',
          badgeLabel: 'Atenção',
          badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
          barClass: 'bg-amber-500',
          baseBarClass: 'transition-all duration-500 ease-out',
        };
      case 'ok':
      default:
        return {
          container: 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-900/20',
          icon: ShieldCheck,
          iconClass: 'h-5 w-5 text-emerald-600',
          iconBg: 'bg-emerald-100/80 dark:bg-emerald-900/30',
          badgeLabel: 'Em dia',
          badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
          barClass: 'bg-emerald-500',
          baseBarClass: 'transition-all duration-500 ease-out',
        };
    }
  }, [twoFaSubtitle.variant]);

  const twoFaProgressWidthClass = useMemo(() => {
    if (!twoFaCycle) {
      return TWO_FA_PROGRESS_WIDTH_CLASSES[0];
    }
    const rounded = Math.min(100, Math.max(0, Math.round(twoFaCycle.percent / 5) * 5));
    return TWO_FA_PROGRESS_WIDTH_CLASSES[rounded] ?? TWO_FA_PROGRESS_WIDTH_CLASSES[100];
  }, [twoFaCycle]);

  const TwoFaIcon: LucideIcon = twoFaStyles.icon;

  const handleSaveSecuritySettings = async () => {
    setSecuritySaving(true);
    try {
      const res = await fetch('/api/security/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          forceTwoFactor,
          passwordPolicy,
          sessionTimeoutMin,
        }),
        credentials: 'include',
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
        toast({
          title: 'Erro ao salvar',
          description: error.error || 'Não foi possível atualizar as políticas de segurança.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Políticas atualizadas',
        description: 'As configurações de segurança foram salvas com sucesso.',
      });
    } catch (error) {
      console.error('[Settings] Erro ao salvar políticas:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar as configurações.',
        variant: 'destructive',
      });
    } finally {
      setSecuritySaving(false);
    }
  };


  const integrationRows = [
    {
      name: "API AD Python",
      status: "Online",
      endpoint: process.env.NEXT_PUBLIC_PYTHON_AUTH_API ?? "http://10.224.0.65:80/auth/basic",
    },
    {
      name: "Firebase Notifications",
      status: "Online",
      endpoint: process.env.NEXT_PUBLIC_FIREBASE_PROJECT ?? "imunemais-jg",
    }
  ] as const;


  useEffect(() => {
    if (!isLoading && !user) {
      if (!hasRedirected) {
        setHasRedirected(true);
        router.push('/login');
      }
    }
  }, [isLoading, user, router, hasRedirected]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  if (!user || !canAccessSettings) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <ShieldAlert className="mx-auto h-16 w-16 text-amber-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acesso Restrito</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Apenas usuários SYSADMIN podem acessar as configurações do sistema.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Entre em contato com o time de administração caso precise de ajuda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações do Sistema</h1>
          <p className="max-w-6xl text-gray-600 dark:text-gray-400">Gerencie integrações, segurança e parâmetros gerais do IMUNE+. Recursos avançados serão exclusivos para SYSADMIN.</p>
        </div>
        <div className="flex items-center gap-3 self-start">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="shadow" size="sm" className="gap-2">
                  <Info className="h-4 w-4" /> Guia rápido
                </Button>
              </TooltipTrigger>
              <TooltipContent>Utilize as seções abaixo para configurar o sistema.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button aria-label="Salvar configurações" className="gap-2">
            <Save className="h-4 w-4" />
            Salvar configurações
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid gap-6 md:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title} className={cn(cardStyle, "border border-gray-100 dark:border-gray-800")}> 
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-base">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </div>
              <card.icon className={cn("h-5 w-5", card.accent)} />
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{card.headline}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
          {/* Parâmetros gerais */}
          <Card className={cardStyle}>
            <CardHeader className="flex flex-col gap-2 border-b border-gray-100 p-6 dark:border-gray-800">
              <div className="flex items-center gap-2"><Settings className="h-5 w-5 text-[var(--primary)]" /><CardTitle>Parâmetros gerais</CardTitle></div>
              <CardDescription>Identidade e comunicação básica.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="appName">Nome da aplicação</Label>
                    <Input id="appName" defaultValue="IMUNE+ Jaboatão" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">E-mail de suporte</Label>
                    <Input id="supportEmail" type="email" defaultValue="suporte@jaboatao.pe.gov.br" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="portalDescription">Descrição do portal</Label>
                    <Textarea id="portalDescription" rows={5} defaultValue="Sistema integrado de imunização do município de Jaboatão dos Guararapes." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceMode">Modo de manutenção</Label>
                    <div className="flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-700">
                      <div>
                        <p className="font-medium">Estado</p>
                        <p className="text-sm text-muted-foreground">
                          {maintenanceEnabled ? 'Acesso do público: Desativado' : 'Acesso do público: Ativado'}
                        </p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={maintenanceEnabled}
                        onCheckedChange={(checked) => {
                          setMaintenanceEnabled(checked);
                          toast({
                            title: checked ? 'Modo de manutenção ativado' : 'Modo de manutenção desativado',
                            description: checked
                              ? 'O acesso público ao site foi desativado.'
                              : 'O acesso público ao site foi reativado.',
                          });
                        }}
                        aria-label={maintenanceEnabled ? 'Desativar acesso do público' : 'Ativar acesso do público'}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Política de Backups */}
          <BackupPolicyCard isSysadmin={isSysadmin} />

          {/* Segurança */}
          <Card className={cardStyle}>
            <CardHeader className="flex flex-col gap-2 border-b border-gray-100 p-6 dark:border-gray-800">
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-600" /><CardTitle>Segurança</CardTitle></div>
              <CardDescription>Políticas de autenticação e sessão.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Coluna 1: 2FA obrigatório */}
                <div
                  className={cn(
                    'relative overflow-hidden rounded-xl border p-5 transition-colors duration-200',
                    twoFaStyles.container,
                  )}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={cn('flex h-12 w-12 items-center justify-center rounded-full shadow-sm', twoFaStyles.iconBg)}>
                        <TwoFaIcon className={twoFaStyles.iconClass} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-base font-semibold text-gray-900 dark:text-white">2FA obrigatório</p>
                          <Badge className={cn('text-xs font-semibold uppercase tracking-wide', twoFaStyles.badgeClass)}>
                            {twoFaStyles.badgeLabel}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{twoFaSubtitle.label}</p>
                        {twoFaCycle ? (
                          <div className="space-y-1 pt-2">
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>{twoFaCycle.consumed} dias corridos</span>
                              <span>{twoFaCycle.remaining} dias restantes</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className={cn(twoFaStyles.baseBarClass, 'h-full rounded-full', twoFaStyles.barClass, twoFaProgressWidthClass)}
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <Switch
                      id="require2fa"
                      checked={forceTwoFactor}
                      onCheckedChange={setForceTwoFactor}
                      disabled={securityLoading || !canEditSecurity}
                      aria-label="2FA obrigatório"
                    />
                  </div>
                </div>

                {/* Coluna 2: Política de senha */}
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Política de senha</Label>
                  <Select 
                    value={passwordPolicy} 
                    onValueChange={(v) => setPasswordPolicy(v as 'basic' | 'strong' | 'ad')}
                    disabled={securityLoading || !canEditSecurity}
                  >
                    <SelectTrigger id="passwordPolicy" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                      <SelectItem value="basic">Básica (8+)</SelectItem>
                      <SelectItem value="strong">Robusta (12+ símbolos)</SelectItem>
                      <SelectItem value="ad">Política do Active Directory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Coluna 3: Tempo de sessão */}
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Tempo de sessão (min)</Label>
                  <Select 
                    value={String(sessionTimeoutMin)} 
                    onValueChange={(v) => setSessionTimeoutMin(parseInt(v))}
                    disabled={securityLoading || !canEditSecurity}
                  >
                    <SelectTrigger id="sessionTimeout" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                      <SelectItem value="120">120</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleSaveSecuritySettings}
                  disabled={securityLoading || securitySaving || !canEditSecurity}
                  className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Save className="h-4 w-4" />
                  {securitySaving ? 'Salvando...' : 'Salvar políticas'}
                </Button>
                {!canEditSecurity && (
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    ⚠️ Apenas SYSADMIN pode editar políticas de segurança
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Integrações */}
          <Card className={cardStyle}>
            <CardHeader className="flex flex-col gap-2 border-b border-gray-100 p-6 dark:border-gray-800">
              <div className="flex items-center gap-2"><ServerCog className="h-5 w-5 text-blue-600" /><CardTitle>Integrações</CardTitle></div>
              <CardDescription>Serviços conectados ao IMUNE+.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100 dark:border-gray-800">
                    <TableHead>Serviço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrationRows.map((row) => (
                    <TableRow key={row.name} className="border-gray-100 dark:border-gray-800">
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>
                        <Badge className={row.status === "Online" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}>{row.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{row.endpoint}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="space-y-6 p-6 pt-0">
                {/* Separador 1: Integrações → API Python */}
                <Separator className="my-8 bg-blue-200 dark:bg-blue-800" />
                
                {/* API Python (AD) - server-only - Campos em 2 colunas */}
                <div className="space-y-4">
                  {/* Cabeçalho com ícone */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <ServerCog className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">API Python (Active Directory)</h3>
                      <p className="text-xs text-muted-foreground">Variáveis de ambiente do servidor</p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pyAuthBasic">PYTHON_AUTH_API (BASIC)</Label>
                      <Input id="pyAuthBasic" value="Definido no servidor (.env.local)" readOnly disabled aria-describedby="pyAuthBasic-hint" />
                      <p id="pyAuthBasic-hint" className="text-xs text-muted-foreground">Variável de ambiente do servidor. Não é exposta ao cliente.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pyAuthGroups">PYTHON_AUTH_API_GROUPS</Label>
                      <Input id="pyAuthGroups" value="Definido no servidor (.env.local)" readOnly disabled aria-describedby="pyAuthGroups-hint" />
                      <p id="pyAuthGroups-hint" className="text-xs text-muted-foreground">Variável de ambiente do servidor. Não é exposta ao cliente.</p>
                    </div>
                  </div>
                </div>

                {/* Separador 2: API Python → Firebase */}
                <Separator className="my-8 bg-sky-200 dark:bg-sky-800" />

                {/* Firebase - client-side NEXT_PUBLIC_* - Campos em 2 colunas */}
                <div className="space-y-4">
                  {/* Cabeçalho com ícone */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                      <CloudCog className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">Firebase</h3>
                      <p className="text-xs text-muted-foreground">Configurações públicas do cliente</p>
                    </div>
                  </div>
                  {(() => {
                    const fb = {
                      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
                      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
                      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
                      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
                      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
                      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
                      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
                    };
                    const handleCopy = async (text: string, label: string) => {
                      try {
                        await navigator.clipboard.writeText(text);
                        toast({ title: "Copiado", description: `${label} copiado para a área de transferência.` });
                      } catch {
                        toast({ title: "Falha ao copiar", description: "Verifique permissões do navegador.", variant: "destructive" });
                      }
                    };
                    return (
                      <div className="grid gap-4 md:grid-cols-2">
                        {[{k:'API Key',v:fb.apiKey,id:'fbApiKey'},{k:'Auth Domain',v:fb.authDomain,id:'fbAuthDomain'},{k:'Project ID',v:fb.projectId,id:'fbProjectId'},{k:'Storage Bucket',v:fb.storageBucket,id:'fbStorageBucket'},{k:'Messaging Sender ID',v:fb.messagingSenderId,id:'fbSenderId'},{k:'App ID',v:fb.appId,id:'fbAppId'},{k:'Measurement ID',v:fb.measurementId,id:'fbMeasureId'}].map((item) => (
                          <div key={item.id} className="space-y-2">
                            <Label htmlFor={item.id}>{item.k}</Label>
                            <div className="flex gap-2">
                              <Input id={item.id} value={item.v} readOnly disabled className="bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300" />
                              <Button
                                type="button"
                                variant="shadow"
                                size="sm"
                                className="gap-2 h-10 shrink-0"
                                onClick={() => handleCopy(item.v, item.k)}
                                aria-label={`Copiar ${item.k}`}
                              >
                                <Copy className="h-4 w-4" /> Copiar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
