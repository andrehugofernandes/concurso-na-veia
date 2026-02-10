import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuthUserFromRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { BackupPolicyForm } from './components/backup-policy-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Configurações de Backup | Painel de Controle',
  description: 'Gerencie as configurações de backup automático do sistema',
};

// Esta página usa cookies e acesso ao banco em tempo de requisição;
// marcamos explicitamente como dinâmica para evitar erros de build.
export const dynamic = 'force-dynamic';

export default async function BackupSettingsPage() {
  try {
    // Autenticação customizada via cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('__Host-accessToken')?.value
      || cookieStore.get('accessToken')?.value
      || cookieStore.get('__Host-token')?.value
      || cookieStore.get('token')?.value;

    if (!token) {
      console.warn('[BackupSettings] Token não encontrado, redirecionando para login');
      redirect('/auth/signin?callbackUrl=/admin/backups/settings');
    }

    // Usar URL dinâmica baseada no ambiente
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const mockReq = new Request(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await getAuthUserFromRequest(mockReq);
    
    if (!user) {
      console.warn('[BackupSettings] Usuário não autenticado após validação de token');
      redirect('/auth/signin?callbackUrl=/admin/backups/settings');
    }

    console.log('[BackupSettings] Usuário autenticado:', { id: user.id, role: user.role });

    // Verificar permissões (apenas admin/sysadmin)
    const isAdmin = user.role === 'ADMIN' || user.role === 'SYSADMIN';
    if (!isAdmin) {
      redirect('/admin/unauthorized');
    }

    // Carregar política atual (ou criar uma padrão se não existir)
    console.log('[BackupSettings] Buscando política de backup no banco...');
    let policy = await prisma.backupPolicy.findFirst();
    console.log('[BackupSettings] Política encontrada:', policy ? 'SIM' : 'NÃO');
  
    // Se não existir política, criar uma padrão
    if (!policy) {
      console.log('[BackupSettings] Criando política padrão...');
      policy = await prisma.backupPolicy.create({
        data: {
          isActive: true,
          frequency: 'daily',
          hour: 2,
          minute: 0,
          retentionDays: 30,
          maxBackups: 30,
          target: 'local',
          notifyOnFailure: true,
        },
      });
      console.log('[BackupSettings] Política padrão criada com sucesso');
    }

  // Adaptar para o shape de UI esperado pelo formulário
  type Frequency = 'hourly' | 'daily' | 'weekly' | 'monthly';
  type Target = 'local' | 'firebase';

  const toFrequency = (f: string): Frequency => {
    switch (f) {
      case 'hourly':
      case 'daily':
      case 'weekly':
      case 'monthly':
        return f;
      default:
        return 'daily';
    }
  };

  const toTarget = (t: string): Target => (t === 'firebase' ? 'firebase' : 'local');

  const uiPolicy: {
    isActive: boolean;
    frequency: Frequency;
    hour: number;
    minute: number;
    dayOfWeek?: number;
    dayOfMonth?: number;
    retentionDays: number;
    maxBackups: number;
    target: Target;
    notifyOnFailure: boolean;
  } | null = policy
    ? {
        isActive: policy.isActive,
        frequency: toFrequency(policy.frequency),
        hour: policy.hour,
        minute: policy.minute,
        dayOfWeek: policy.dayOfWeek ?? undefined,
        dayOfMonth: policy.dayOfMonth ?? undefined,
        retentionDays: policy.retentionDays,
        maxBackups: policy.maxBackups,
        target: toTarget(policy.target),
        notifyOnFailure: policy.notifyOnFailure,
      }
    : null;

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <Link href="/admin/backups" aria-label="Voltar para lista de backups">
            <Button variant="outline" className="gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Configurações de Backup</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações de backup automático do sistema
          </p>
        </div>

        <div className="grid gap-6">
          <BackupPolicyForm initialData={uiPolicy} />
        </div>
      </div>
    );
  } catch (error) {
    // Log detalhado do erro para rastreamento
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      digest: error && typeof error === 'object' && 'digest' in error ? (error as { digest?: string }).digest : undefined,
      timestamp: new Date().toISOString(),
    };
    
    console.error('[BackupSettings] ❌ Erro crítico ao carregar página:', errorDetails);
    
    // Tentar identificar tipo de erro
    if (error instanceof Error) {
      if (error.message.includes('BackupPolicy')) {
        console.error('[BackupSettings] ⚠️ Erro relacionado à tabela BackupPolicy - verifique migrations');
      } else if (error.message.includes('prisma') || error.message.includes('database')) {
        console.error('[BackupSettings] ⚠️ Erro de conexão com banco de dados');
      } else if (error.message.includes('jwt') || error.message.includes('token')) {
        console.error('[BackupSettings] ⚠️ Erro de autenticação/token');
      }
    }
    
    // Em caso de erro, redirecionar para página de erro ou login
    redirect('/auth/signin?callbackUrl=/admin/backups/settings&error=server');
  }
}
