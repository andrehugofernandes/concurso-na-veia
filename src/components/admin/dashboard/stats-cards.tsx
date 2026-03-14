'use client';

import { useState, useEffect, useTransition, useMemo } from 'react';
import { Users, FileText, Download as DownloadIcon, CalendarDays, Eye, BarChart3, FolderTree, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedBorderCard } from '@/components/ui/animated-border-card';
import { getDashboardStatsAction, getLogsStatsAction, getCategoriesAction } from '@/lib/actions/dashboard';

interface DashboardStats {
  totalUsers: number;
  totalFiles: number;
  totalDownloads: number;
  downloadsLast30Days: number;
  totalViews: number;
  viewsLast30Days: number;
  logsToday: number;
  totalReports: number;
  activeCategories: number;
  filesGrowthRate: number;
}

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * easeOutQuart));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  // Formatar com 2 dígitos mínimos
  const formattedValue = displayValue.toString().padStart(2, '0');
  return <span>{formattedValue}</span>;
}

export function StatsCards() {
  const [isPending, startTransition] = useTransition();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalFiles: 0,
    totalDownloads: 0,
    downloadsLast30Days: 0,
    totalViews: 0,
    viewsLast30Days: 0,
    logsToday: 0,
    totalReports: 0,
    activeCategories: 0,
    filesGrowthRate: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [statsRes, logsRes, categoriesRes] = await Promise.all([
          getDashboardStatsAction(),
          getLogsStatsAction(),
          getCategoriesAction()
        ]);

        startTransition(() => {
          const dashboardData = statsRes.status === 'success' ? statsRes.data : {};
          const logsData = (logsRes.status === 'success' && logsRes.data) ? logsRes.data : { logsToday: 0 };
          const categoriesData = categoriesRes.status === 'success' ? categoriesRes.data : [];

          setStats({
            totalUsers: dashboardData.totalUsers || 0,
            totalFiles: dashboardData.totalFiles || 0,
            totalDownloads: dashboardData.totalDownloads || 0,
            downloadsLast30Days: dashboardData.downloadsLast30Days || 0,
            totalViews: dashboardData.totalViews || 0,
            viewsLast30Days: dashboardData.viewsLast30Days || 0,
            logsToday: logsData.logsToday || 0,
            totalReports: 8,
            activeCategories: Array.isArray(categoriesData) ? categoriesData.length : 0,
            filesGrowthRate: dashboardData.filesGrowthRate || 0,
          });
        });
      } catch (error) {
        console.error('[StatsCards] Erro ao carregar estatísticas', error);
      }
    };

    loadStats();
  }, []);

  // Usar useMemo para evitar recálculo desnecessário dos cards (React 19 otimização)
  const cards = useMemo(() => [
    {
      title: 'Total de Usuários',
      metric: stats.totalUsers,
      description: 'usuários cadastrados',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Arquivos Cadastrados',
      metric: stats.totalFiles,
      description: 'arquivos no sistema',
      icon: FileText,
      color: 'text-purple-600',
    },
    {
      title: 'Total de Downloads',
      metric: stats.totalDownloads,
      description: `${stats.downloadsLast30Days} nos últimos 30 dias`,
      icon: DownloadIcon,
      color: 'text-green-600',
    },
    {
      title: 'Visualizações de Vídeos',
      metric: stats.totalViews,
      description: `${stats.viewsLast30Days} nos últimos 30 dias`,
      icon: Eye,
      color: 'text-blue-600',
    },
    {
      title: 'Atividade Hoje',
      metric: stats.logsToday,
      description: 'eventos registrados',
      icon: CalendarDays,
      color: 'text-orange-600',
    },
    {
      title: 'Relatórios Gerados',
      metric: stats.totalReports,
      description: 'relatórios disponíveis',
      icon: BarChart3,
      color: 'text-indigo-600',
    },
    {
      title: 'Total de Categorias',
      metric: stats.activeCategories,
      description: 'categorias cadastradas',
      icon: FolderTree,
      color: 'text-teal-600',
    },
    {
      title: 'Arquivos Recentes',
      metric: stats.filesGrowthRate,
      description: 'últimos 30 dias',
      icon: TrendingUp,
      color: 'text-emerald-600',
    },
  ], [stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <AnimatedBorderCard key={card.title}>
            <Card className="shadow-lg animate-fade-in-up border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className="relative">
                  <Badge
                    className="h-12 w-12 rounded-full p-0 flex items-center justify-center bg-[var(--primary)] hover:bg-[var(--primary)] focus-visible:bg-[var(--primary)] pointer-events-none"
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl md:text-5xl font-bold">
                  {isPending && stats.totalUsers === 0 ? (
                    <span className="text-gray-400">...</span>
                  ) : (
                    <AnimatedNumber value={card.metric} />
                  )}
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {card.description && (
                    <span>{card.description}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedBorderCard>
        );
      })}
    </div>
  );
}
