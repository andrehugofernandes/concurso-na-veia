import { redirect } from 'next/navigation';
import { LuShieldAlert } from 'react-icons/lu';
import { isAdmin, getCurrentUser } from '@/lib/auth/get-current-user';
import { getSettings } from './actions';
import { SettingsForm } from '@/components/settings/settings-form';
import { TextRoll } from '@/components/core/text-roll';

// Desabilitar cache para dados sensíveis de configuração
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  // Verificar autenticação
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  // Verificar permissão - apenas admin pode acessar configurações
  const hasPermission = await isAdmin();
  if (!hasPermission) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <LuShieldAlert className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-red-400 mb-2">Acesso Negado</h1>
          <p className="text-slate-400">
            Você não tem permissão para acessar as configurações do sistema.
            <br />
            Apenas administradores podem acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  // Buscar configurações
  const settingsResult = await getSettings();

  if (settingsResult.status === 'error') {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <LuShieldAlert className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-red-400 mb-2">Erro ao Carregar</h1>
          <p className="text-slate-400">{settingsResult.error}</p>
        </div>
      </div>
    );
  }

  const settings = settingsResult.data!.settings;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Configurações</TextRoll>
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Gerencie as configurações do site, tema e integrações
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg p-4 border bg-[color:rgb(var(--primary-rgb)/0.18)] border-[color:rgb(var(--primary-rgb)/0.40)] dark:bg-[color:rgb(var(--primary-rgb)/0.26)] dark:border-[color:rgb(var(--primary-rgb)/0.55)]">
        <div className="flex items-start gap-3">
          <LuShieldAlert className="h-5 w-5 text-[color:var(--primary)] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-900 dark:text-slate-100">
            <p className="font-medium mb-1">Área Restrita</p>
            <p className="text-gray-700 dark:text-slate-300">
              As configurações aqui afetam todo o sistema. Alterações em integrações
              podem impactar funcionalidades como upload de arquivos e envio de emails.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
