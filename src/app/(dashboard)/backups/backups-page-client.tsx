'use client';

import { useState, Suspense } from 'react';
import { LuSettings, LuHistory, LuSearch, LuHardDrive } from 'react-icons/lu';
import { BackupJobsTab } from '@/components/backups/backup-jobs-tab';
import { BackupPoliciesTab } from '@/components/backups/backup-policies-tab';
import type { BackupPolicyData } from '@/app/admin/backups/actions';
import { cn } from '@/lib/utils';
import { TextRoll } from '@/components/core/text-roll';

type TabType = 'jobs' | 'policies';

interface BackupPageClientProps {
  initialPolicies?: BackupPolicyData[];
}

const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
  { key: 'jobs', label: 'Jobs de Backup', icon: <LuHistory className="h-4 w-4" /> },
  { key: 'policies', label: 'Políticas', icon: <LuSettings className="h-4 w-4" /> },
];

function TabList({ activeTab, onChange }: { activeTab: TabType; onChange: (tab: TabType) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-0">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-transparent first:rounded-l-md last:rounded-r-md',
              isActive
                ? 'bg-[var(--primary)] text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-700'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-12 text-slate-500 dark:text-slate-400">
      <LuHardDrive className="h-5 w-5 animate-spin mr-2" />
      <span>Carregando...</span>
    </div>
  );
}

export function BackupPageClient({ initialPolicies }: BackupPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');

  return (
    <div className="space-y-6">
      {/* Header e Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100 flex items-center gap-2">
            <TextRoll className="text-3xl text-gray-900 dark:text-slate-100">Backups</TextRoll>
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">
            Gerencie e monitore seus jobs de backup e políticas de retenção
          </p>
        </div>

        {/* Barra de Busca e Ações - Desktop (Oculto no Mobile) */}
        <div className="hidden lg:flex items-center gap-2 max-w-sm w-full">
          <form className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
              <input
                type="search"
                name="backup-search"
                placeholder="Buscar backups..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400 focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-[var(--primary)] focus:border-gray-300"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Tabs - Agora com estilo padrão e suporte a mobile */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Main Tabs Container com borda externa (Imagem 1) */}
        <div className="flex items-center justify-center lg:justify-start">
          <div className="p-1 rounded-lg bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <TabList activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        {/* Toolbar Mobile (Stack) */}
        <div className="lg:hidden flex flex-col gap-2">
          <form className="flex gap-2">
            <div className="relative flex-1">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-slate-400" />
              <input
                type="search"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Conteúdo com Activity para pre-rendering */}
      <div className="min-h-[320px]">
        <Suspense fallback={<LoadingFallback />}>
          {activeTab === 'jobs' ? (
            <BackupJobsTab />
          ) : (
            <BackupPoliciesTab initialPolicies={initialPolicies} />
          )}
        </Suspense>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-[var(--primary)]/10">
        <p className="text-sm text-[var(--primary)]">
          <strong>Dica:</strong> Configure políticas automáticas para manter seus backups sempre atualizados.
        </p>
      </div>
    </div>
  );
}
