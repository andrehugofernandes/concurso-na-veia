'use client';

import { StatsCards } from '@/components/admin/dashboard/stats-cards';
import { ChartsSection } from '@/components/admin/dashboard/charts-section';
import { ActionButtons } from '@/components/admin/dashboard/action-buttons';
// import "./styles.css"; // Commenting out missing css for now

export default function DashboardPage() {
  return (
    <div className="space-y-12 w-full px-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Visão geral das estatísticas e atividades do sistema
        </p>
      </div>

      <div className="w-full">
        <StatsCards />
      </div>
      <div className="w-full">
        <ChartsSection />
      </div>
      <div className="w-full">
        <ActionButtons />
      </div>
    </div>
  );
}
