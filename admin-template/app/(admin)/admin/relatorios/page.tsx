'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, CalendarDays, Database, Download, Eye, FileText, FolderTree, GripVertical, HardDrive, Loader2, Server, Shield, ShieldAlert, Upload, Users, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DetailsModal } from '@/components/ui/details-modal';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { authFetch } from '@/lib/api-fetch';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import {
  addReportTable,
  buildFileName,
  formatDate,
  formatDateTime,
  formatDateRange,
  generateSimpleReportBlob,
  showErrorToast,
  showGeneratingToast,
  showNoDataToast,
  showSuccessToast,
} from '@/lib/pdf';

interface ReportDefinition {
  key: string;
  title: string;
  description: string;
  icon: React.ElementType;
  roles: Array<'SYSADMIN' | 'ADMIN' | 'COORDENADOR'>;
  disabled?: boolean;
  comingSoon?: boolean;
  endpoint?: string;
}

type ActiveReportKey = 
  | 'downloads-by-category' 
  | 'video-views' 
  | 'top-downloads' 
  | 'uploads-summary' 
  | 'categories-health' 
  | 'user-activity' 
  | 'logs-activity' 
  | 'system-overview'
  | 'storage-usage'
  | 'infrastructure-health'
  | 'system-maintenance'
  | 'security-audit'
  | 'api-performance'
  | 'compliance-lgpd';

const ACTIVE_REPORT_KEYS: Record<ActiveReportKey, true> = {
  'downloads-by-category': true,
  'video-views': true,
  'top-downloads': true,
  'uploads-summary': true,
  'categories-health': true,
  'user-activity': true,
  'logs-activity': true,
  'system-overview': true,
  'storage-usage': true,
  'infrastructure-health': true,
  'system-maintenance': true,
  'security-audit': true,
  'api-performance': true,
  'compliance-lgpd': true,
};

const REPORTS: ReportDefinition[] = [
  {
    key: 'downloads-by-category',
    title: 'Downloads por Categoria',
    description: 'Distribuição de downloads por categoria com destaques semanais e média móvel de 30 dias.',
    icon: BarChart3,
    roles: ['SYSADMIN', 'ADMIN', 'COORDENADOR'],
    endpoint: '/api/reports/downloads-by-category',
  },
  {
    key: 'video-views',
    title: 'Visualizações de Vídeos',
    description: 'Engajamento completo dos vídeos do IMUNEPLAY, conteúdos destaque e evolução recente.',
    icon: Eye,
    roles: ['SYSADMIN', 'ADMIN', 'COORDENADOR'],
    endpoint: '/api/reports/video-views',
  },
  {
    key: 'top-downloads',
    title: 'Arquivos Mais Baixados',
    description: 'Top arquivos mais baixados com categorias, métricas comparativas e relevância semanal consolidada.',
    icon: Download,
    roles: ['SYSADMIN', 'ADMIN', 'COORDENADOR'],
    endpoint: '/api/reports/top-downloads',
  },
  {
    key: 'uploads-summary',
    title: 'Uploads por Período',
    description: 'Comparativo de uploads por categoria, tipo de arquivo e crescimento percentual no período atual.',
    icon: Upload,
    roles: ['SYSADMIN', 'ADMIN', 'COORDENADOR'],
    endpoint: '/api/reports/uploads-summary',
  },
  {
    key: 'user-activity',
    title: 'Atividade de Usuários',
    description: 'Distribuição detalhada de usuários por papel, status, participação percentual e tendências.',
    icon: Users,
    roles: ['SYSADMIN', 'ADMIN'],
    endpoint: '/api/reports/user-activity',
  },
  {
    key: 'system-overview',
    title: 'Resumo Geral do Sistema',
    description: 'Painel executivo com indicadores do mês, insights críticos e variações relevantes atuais.',
    icon: FileText,
    roles: ['SYSADMIN', 'ADMIN'],
    endpoint: '/api/reports/system-overview',
  },
  {
    key: 'logs-activity',
    title: 'Atividade do Sistema',
    description: 'Eventos registrados, tendência diária de uso e análise dos picos recorrentes reportados.',
    icon: CalendarDays,
    roles: ['SYSADMIN', 'ADMIN'],
    endpoint: '/api/reports/logs-activity',
  },
  {
    key: 'categories-health',
    title: 'Saúde das Categorias',
    description: 'Categorias ativas, vazias e mais acessadas com métricas de atualização e frequência.',
    icon: FolderTree,
    roles: ['SYSADMIN', 'ADMIN', 'COORDENADOR'],
    endpoint: '/api/reports/categories-health',
  },
  // Relatórios Exclusivos SYSADMIN
  {
    key: 'backup-history',
    title: 'Histórico de Backups',
    description: 'Análise completa de backups: sucesso, falhas, tamanho, tendências e alertas automáticos.',
    icon: Database,
    roles: ['SYSADMIN'],
    endpoint: '/api/reports/backup-history',
  },
  {
    key: 'storage-usage',
    title: 'Uso de Storage',
    description: 'Espaço utilizado por tipo de arquivo, top arquivos maiores e recomendações práticas.',
    icon: HardDrive,
    roles: ['SYSADMIN'],
    endpoint: '/api/reports/storage-usage',
  },
  {
    key: 'infrastructure-health',
    title: 'Saúde da Infraestrutura',
    description: 'Métricas de CPU, RAM e uptime com status de serviços críticos e alertas antecipados.',
    icon: Server,
    roles: ['SYSADMIN'],
    endpoint: '/api/reports/infrastructure-health',
  },
  {
    key: 'system-maintenance',
    title: 'Manutenção do Sistema',
    description: 'Checklist de manutenção, recomendações de otimização e ações preventivas permanentes.',
    icon: Wrench,
    roles: ['SYSADMIN'],
    endpoint: '/api/reports/system-maintenance',
  },
  // Relatórios SYSADMIN + ADMIN
  {
    key: 'security-audit',
    title: 'Auditoria de Segurança',
    description: 'Tentativas de login, mudanças de permissões, alertas de segurança e indicadores atuais.',
    icon: ShieldAlert,
    roles: ['SYSADMIN', 'ADMIN'],
    endpoint: '/api/reports/security-audit',
  },
  {
    key: 'api-performance',
    title: 'Performance de API',
    description: 'Endpoints mais lentos, taxa de erro, requisições por minuto e tempos médios comparativos.',
    icon: BarChart3,
    roles: ['SYSADMIN', 'ADMIN'],
    endpoint: '/api/reports/api-performance',
  },
  {
    key: 'compliance-lgpd',
    title: 'Compliance LGPD',
    description: 'Conformidade com LGPD, score de compliance, pendências principais e próximos ajustes.',
    icon: Shield,
    roles: ['SYSADMIN', 'ADMIN'],
    endpoint: '/api/reports/compliance-lgpd',
  },
];

// Componente para card ordenável
interface SortableReportCardProps {
  report: ReportDefinition;
  isActive: boolean;
  isGenerating: boolean;
  colors: ReturnType<typeof getReportColorClasses>;
  roleBadgeText: string;
  onAction: (report: ReportDefinition) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, report: ReportDefinition) => void;
}

function SortableReportCard({
  report,
  isActive,
  isGenerating,
  colors,
  roleBadgeText,
  onAction,
  onKeyDown,
}: SortableReportCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: report.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const Icon = report.icon;
  const isDisabled = !isActive || isGenerating;

  return (
    <div ref={setNodeRef} style={style} className="relative z-0">
      <Card
        role={isActive ? 'button' : undefined}
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        className={cn(
          'group relative h-full cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          isDisabled && 'cursor-not-allowed opacity-50',
          isActive && 'ring-2 ring-white/50',
        )}
        style={{
          background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
        }}
        onClick={() => {
          if (!isDisabled) {
            onAction(report);
          }
        }}
        onKeyDown={(event) => {
          if (!isDisabled) {
            onKeyDown(event, report);
          }
        }}
      >
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-30" />
        <div className="relative z-10 flex h-full flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-white/70 hover:text-white dark:text-white/60 dark:hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <CardTitle className="text-base font-semibold text-white dark:text-white">
                {report.title}
              </CardTitle>
            </div>
            <Badge className="h-10 w-10 rounded-full p-0 flex items-center justify-center bg-[var(--primary)] pointer-events-none">
              {isGenerating ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Icon className="h-5 w-5 text-white" />}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-white/80 dark:text-white/80">{report.description}</p>
            <div className="flex items-center justify-between text-xs text-white/70 dark:text-white/70">
              <span>
                {report.comingSoon
                  ? 'Em breve'
                  : isGenerating
                    ? 'Processando...'
                    : isActive
                      ? 'Clique para carregar dados'
                      : 'Clique para gerar PDF'}
              </span>
              <Badge className={cn('uppercase tracking-wide text-[10px] font-semibold', colors.roleBadge)}>
                {roleBadgeText}
              </Badge>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default function ReportsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [generating, setGenerating] = useState<Partial<Record<ActiveReportKey, boolean>>>({});
  const [reportOrder, setReportOrder] = useState<string[]>([]);
  const [downloadsReport, setDownloadsReport] = useState<DownloadsByCategoryResponse | null>(null);
  const [videoViewsReport, setVideoViewsReport] = useState<VideoViewsResponse | null>(null);
  const [topDownloadsReport, setTopDownloadsReport] = useState<TopDownloadsResponse | null>(null);
  const [uploadsReport, setUploadsReport] = useState<UploadsSummaryResponse | null>(null);
  const [categoriesHealthReport, setCategoriesHealthReport] = useState<CategoriesHealthResponse | null>(null);
  const [userActivityReport, setUserActivityReport] = useState<UserActivityResponse | null>(null);
  const [logsActivityReport, setLogsActivityReport] = useState<LogsActivityResponse | null>(null);
  const [systemOverviewReport, setSystemOverviewReport] = useState<SystemOverviewResponse | null>(null);
  const [storageUsageReport, setStorageUsageReport] = useState<StorageUsageResponse | null>(null);
  const [infrastructureHealthReport, setInfrastructureHealthReport] = useState<InfrastructureHealthResponse | null>(null);
  const [systemMaintenanceReport, setSystemMaintenanceReport] = useState<SystemMaintenanceResponse | null>(null);
  const [securityAuditReport, setSecurityAuditReport] = useState<SecurityAuditResponse | null>(null);
  const [apiPerformanceReport, setApiPerformanceReport] = useState<ApiPerformanceResponse | null>(null);
  const [complianceLgpdReport, setComplianceLgpdReport] = useState<ComplianceLgpdResponse | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingVideoPdf, setDownloadingVideoPdf] = useState(false);
  const [downloadingTopPdf, setDownloadingTopPdf] = useState(false);
  const [downloadingUploadsPdf, setDownloadingUploadsPdf] = useState(false);
  const [downloadingCategoriesPdf, setDownloadingCategoriesPdf] = useState(false);
  const [downloadingUserActivityPdf, setDownloadingUserActivityPdf] = useState(false);
  const [downloadingLogsPdf, setDownloadingLogsPdf] = useState(false);
  const [downloadingOverviewPdf, setDownloadingOverviewPdf] = useState(false);
  const [downloadingStoragePdf, setDownloadingStoragePdf] = useState(false);
  const [downloadingInfrastructurePdf, setDownloadingInfrastructurePdf] = useState(false);
  const [downloadingMaintenancePdf, setDownloadingMaintenancePdf] = useState(false);
  const [downloadingSecurityPdf, setDownloadingSecurityPdf] = useState(false);
  const [downloadingApiPdf, setDownloadingApiPdf] = useState(false);
  const [downloadingCompliancePdf, setDownloadingCompliancePdf] = useState(false);
  const [downloadingBackupHistoryPdf, setDownloadingBackupHistoryPdf] = useState(false);
  const [backupHistoryReport, setBackupHistoryReport] = useState<BackupHistoryResponse | null>(null);
  const [activeReportKey, setActiveReportKey] = useState<ActiveReportKey | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReportForModal, setSelectedReportForModal] = useState<ActiveReportKey | null>(null);

  const normalizedRole = useMemo(() => (user?.role ?? '').toUpperCase(), [user?.role]);
  const isSysadmin = normalizedRole === 'SYSADMIN';
  const isAdmin = normalizedRole === 'ADMIN';
  const canAccess = isSysadmin || isAdmin || normalizedRole === 'COORDENADOR';
  const generatedBy = useMemo(() => {
    const extendedUser = user as { full_name?: string; name?: string; username?: string } | undefined;
    return extendedUser?.full_name ?? extendedUser?.name ?? extendedUser?.username ?? 'IMUNE+ Relatórios';
  }, [user]);

  useEffect(() => {
    if (isLoading || hasRedirected) {
      return;
    }

    if (!canAccess) {
      toast({
        title: 'Acesso restrito',
        description: 'Apenas SYSADMIN, ADMIN e COORDENADOR podem gerar relatórios. Você foi redirecionado para o dashboard.',
        className:
          'bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-900 dark:text-white dark:border-gray-700',
      });
      router.replace('/admin/dashboard');
      setHasRedirected(true);
    }
  }, [canAccess, hasRedirected, isLoading, router, toast]);

  const availableReports = useMemo(
    () => REPORTS.filter((report) => report.roles.includes(normalizedRole as 'SYSADMIN' | 'ADMIN' | 'COORDENADOR')),
    [normalizedRole],
  );

  // Inicializar ordem dos relatórios
  useEffect(() => {
    if (availableReports.length > 0 && reportOrder.length === 0) {
      const savedOrder = localStorage.getItem('reports-order');
      if (savedOrder) {
        try {
          const parsed = JSON.parse(savedOrder);
          // Filtrar apenas relatórios disponíveis
          const validOrder = parsed.filter((key: string) => 
            availableReports.some(r => r.key === key)
          );
          setReportOrder(validOrder);
        } catch {
          setReportOrder(availableReports.map(r => r.key));
        }
      } else {
        setReportOrder(availableReports.map(r => r.key));
      }
    }
  }, [availableReports, reportOrder.length]);

  // Ordenar relatórios conforme ordem salva
  const orderedReports = useMemo(() => {
    if (reportOrder.length === 0) return availableReports;
    
    const ordered = reportOrder
      .map(key => availableReports.find(r => r.key === key))
      .filter((r): r is ReportDefinition => r !== undefined);
    
    // Adicionar relatórios novos que não estão na ordem salva
    const newReports = availableReports.filter(r => !reportOrder.includes(r.key));
    
    return [...ordered, ...newReports];
  }, [availableReports, reportOrder]);

  const gridClassName = useMemo(
    () =>
      (isSysadmin || isAdmin)
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6',
    [isSysadmin, isAdmin],
  );

  // Configurar sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handler para quando o drag termina
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setReportOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Salvar no localStorage
        localStorage.setItem('reports-order', JSON.stringify(newOrder));
        
        return newOrder;
      });
    }
  }, []);

  const handleReportAction = useCallback(
    async (report: ReportDefinition) => {
      if (!isActiveReport(report)) {
        showNoDataToast(toast, 'Este relatório ainda está em desenvolvimento.');
        return;
      }

      const key = report.key as ActiveReportKey;
      if (generating[key]) {
        return;
      }

      // Limpar todos os relatórios anteriores para mostrar apenas o novo
      setDownloadsReport(null);
      setVideoViewsReport(null);
      setTopDownloadsReport(null);
      setUploadsReport(null);
      setCategoriesHealthReport(null);
      setUserActivityReport(null);
      setLogsActivityReport(null);
      setSystemOverviewReport(null);
      setStorageUsageReport(null);
      setInfrastructureHealthReport(null);
      setSystemMaintenanceReport(null);
      setSecurityAuditReport(null);
      setApiPerformanceReport(null);
      setComplianceLgpdReport(null);
      setBackupHistoryReport(null);
      setActiveReportKey(key);

      setGenerating((prev) => ({ ...prev, [key]: true }));
      showGeneratingToast(toast, 'Estamos preparando o PDF com os dados mais recentes.');

      try {
        if (key === 'downloads-by-category') {
          const data = await authFetch<DownloadsByCategoryResponse>(report.endpoint);
          if (!data.items.length || data.totalDownloads === 0) {
            showNoDataToast(toast, 'Nenhum download foi registrado no período analisado.');
            setDownloadsReport(null);
          } else {
            setDownloadsReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'video-views') {
          const data = await authFetch<VideoViewsResponse>(report.endpoint);
          if (!data.items.length || data.totalViews === 0) {
            showNoDataToast(toast, 'Nenhuma visualização de vídeo foi registrada no período analisado.');
            setVideoViewsReport(null);
          } else {
            setVideoViewsReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'top-downloads') {
          const data = await authFetch<TopDownloadsResponse>(report.endpoint);
          if (!data.items.length || data.totalDownloads === 0) {
            showNoDataToast(toast, 'Não há arquivos com downloads registrados no período.');
            setTopDownloadsReport(null);
          } else {
            setTopDownloadsReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'uploads-summary') {
          const data = await authFetch<UploadsSummaryResponse>(report.endpoint);
          if (!data.items.length || data.totalUploads === 0) {
            showNoDataToast(toast, 'Nenhum upload foi registrado no período analisado.');
            setUploadsReport(null);
          } else {
            setUploadsReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'categories-health') {
          const data = await authFetch<CategoriesHealthResponse>(report.endpoint);
          if (!data.items.length) {
            showNoDataToast(toast, 'Nenhuma categoria encontrada.');
            setCategoriesHealthReport(null);
          } else {
            setCategoriesHealthReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'user-activity') {
          const data = await authFetch<UserActivityResponse>(report.endpoint);
          if (!data.items.length) {
            showNoDataToast(toast, 'Nenhum usuário encontrado.');
            setUserActivityReport(null);
          } else {
            setUserActivityReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'logs-activity') {
          const data = await authFetch<LogsActivityResponse>(report.endpoint);
          if (!data.items.length) {
            showNoDataToast(toast, 'Nenhum log encontrado no período.');
            setLogsActivityReport(null);
          } else {
            setLogsActivityReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'system-overview') {
          const data = await authFetch<SystemOverviewResponse>(report.endpoint);
          setSystemOverviewReport(data);
          showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          return;
        }

        if (key === 'storage-usage') {
          const data = await authFetch<StorageUsageResponse>(report.endpoint);
          if (!data.summary || data.summary.totalFiles === 0) {
            showNoDataToast(toast, 'Nenhum arquivo foi encontrado para o relatório de storage.');
            setStorageUsageReport(null);
          } else {
            setStorageUsageReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'infrastructure-health') {
          const data = await authFetch<InfrastructureHealthResponse>(report.endpoint);
          if (!data.system || !data.resources) {
            showNoDataToast(toast, 'Não foi possível obter a saúde da infraestrutura.');
            setInfrastructureHealthReport(null);
          } else {
            setInfrastructureHealthReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'system-maintenance') {
          const data = await authFetch<SystemMaintenanceResponse>(report.endpoint);
          if (!data.checklist.length) {
            showNoDataToast(toast, 'Nenhuma tarefa de manutenção encontrada.');
            setSystemMaintenanceReport(null);
          } else {
            setSystemMaintenanceReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'security-audit') {
          const data = await authFetch<SecurityAuditResponse>(report.endpoint);
          if (data.summary.failedLogins === 0 && data.summary.successfulLogins === 0) {
            showNoDataToast(toast, 'Nenhum evento de segurança registrado no período.');
            setSecurityAuditReport(null);
          } else {
            setSecurityAuditReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'api-performance') {
          const data = await authFetch<ApiPerformanceResponse>(report.endpoint);
          if (!data.topEndpoints.length) {
            showNoDataToast(toast, 'Nenhum dado de performance de API disponível.');
            setApiPerformanceReport(null);
          } else {
            setApiPerformanceReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'compliance-lgpd') {
          const data = await authFetch<ComplianceLgpdResponse>(report.endpoint);
          if (!data.summary || data.summary.totalUsers === 0) {
            showNoDataToast(toast, 'Nenhum dado de compliance LGPD foi encontrado.');
            setComplianceLgpdReport(null);
          } else {
            setComplianceLgpdReport(data);
            showSuccessToast(toast, 'Dados carregados. Clique em "Baixar PDF" para exportar.');
          }
          return;
        }

        if (key === 'backup-history') {
          const data = await authFetch<BackupHistoryResponse>(report.endpoint);
          if (!data.items.length) {
            showNoDataToast(toast, 'Nenhum backup encontrado no período.');
            setBackupHistoryReport(null);
          } else {
            setBackupHistoryReport(data);
            setSelectedReportForModal(key);
            setShowDetailsModal(true);
            showSuccessToast(toast, 'Relatório gerado com sucesso!');
          }
          return;
        }
      } catch (error) {
        const description = error instanceof Error ? error.message : undefined;
        showErrorToast(toast, description);
      } finally {
        setGenerating((prev) => ({ ...prev, [key]: false }));
      }
    },
    [generating, toast],
  );

  const onCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, report: ReportDefinition) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        void handleReportAction(report);
      }
    },
    [handleReportAction],
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-gray-600 dark:text-gray-300">
        Carregando...
      </div>
    );
  }

  if (!canAccess) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Relatórios</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gere relatórios detalhados com indicadores atualizados do IMUNE+.
        </p>
      </div>

      {/* Legenda de Cores por Role */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded border border-[#3F51B5] bg-gradient-to-br from-[#3F51B5] to-[#5C6BC0]"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">COORDENADOR (Azul)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded border border-[#9C27B0] bg-gradient-to-br from-[#9C27B0] to-[#AB47BC]"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">ADMIN (Roxo/Magenta)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded border border-[#E91E63] bg-gradient-to-br from-[#E91E63] to-[#EC407A]"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">SYSADMIN (Vermelho/Rosa)</span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={reportOrder}
          strategy={verticalListSortingStrategy}
        >
          <div className={gridClassName}>
            {orderedReports.map((report) => {
              const isActive = isActiveReport(report);
              const key = report.key as ActiveReportKey;
              const isGenerating = generating[key] ?? false;
              const colors = getReportColorClasses(report.roles);
              const roleBadgeText = getRoleBadgeText(report.roles);

              return (
                <SortableReportCard
                  key={report.key}
                  report={report}
                  isActive={isActive}
                  isGenerating={isGenerating}
                  colors={colors}
                  roleBadgeText={roleBadgeText}
                  onAction={handleReportAction}
                  onKeyDown={onCardKeyDown}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {/* Modais de Detalhes dos Relatórios */}

      {/* Modal: Histórico de Backups */}
      {selectedReportForModal === 'backup-history' && backupHistoryReport && (
        <DetailsModal
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
          title="Histórico de Backups"
          description="Análise completa de backups realizados no período"
          icon={<Database className="h-5 w-5 text-[var(--primary)]" />}
          sections={[
            {
              title: 'Resumo Geral',
              fields: [
                { label: 'Total de Backups', value: formatNumber(backupHistoryReport.summary.totalBackups) },
                { label: 'Backups Bem-Sucedidos', value: formatNumber(backupHistoryReport.summary.successfulBackups) },
                { label: 'Backups Falhados', value: formatNumber(backupHistoryReport.summary.failedBackups) },
                { label: 'Taxa de Sucesso', value: `${backupHistoryReport.summary.successRate.toFixed(2)}%` },
                { label: 'Tamanho Médio', value: `${(backupHistoryReport.summary.avgSize / 1024 / 1024 / 1024).toFixed(2)} GB` },
                { label: 'Duração Média', value: `${Math.floor(backupHistoryReport.summary.avgDuration / 60)}min` },
                { label: 'Período', value: formatDateRange(backupHistoryReport.period), fullWidth: true },
                { label: 'Gerado em', value: formatDateTime(backupHistoryReport.generatedAt), fullWidth: true },
              ],
            },
            {
              title: 'Últimos Backups',
              fields: backupHistoryReport.items.slice(0, 10).map((item) => ({
                label: `${item.type} - ${formatDateTime(item.date)}`,
                value: `${item.status} • ${item.sizeFormatted} • ${item.durationFormatted}`,
                fullWidth: true,
              })),
            },
          ]}
          onDownload={async () => {
            try {
              setDownloadingBackupHistoryPdf(true);
              showGeneratingToast(toast, 'Gerando PDF...');
              const blob = await buildBackupHistoryReportBlob(backupHistoryReport, generatedBy);
              const fileName = `${buildFileName('relatorio-historico-backups', backupHistoryReport.generatedAt)}.pdf`;
              triggerBlobDownload(blob, fileName);
              showSuccessToast(toast);
            } catch (e) {
              const description = e instanceof Error ? e.message : undefined;
              showErrorToast(toast, description);
            } finally {
              setDownloadingBackupHistoryPdf(false);
            }
          }}
          downloadLabel="Baixar PDF"
          showDownloadButton={!downloadingBackupHistoryPdf}
        />
      )}

      <AnimatePresence mode="wait">
        {activeReportKey === 'downloads-by-category' && (
          <motion.div
            key="downloads-by-category"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Downloads por Categoria</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visualize os dados mais recentes antes de exportar o PDF.
            </p>
          </div>
          {downloadsReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Período: {formatDateRange(downloadsReport.period)}</span>
                <span className="block sm:text-right">Gerado em: {formatDateTime(downloadsReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingPdf}
                onClick={async () => {
                  if (!downloadsReport) return;
                  try {
                    setDownloadingPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildDownloadsByCategoryReport(downloadsReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-downloads-categoria', downloadsReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingPdf(false);
                  }
                }}
              >
                {downloadingPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!downloadsReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o relatório de downloads por categoria para visualizar o resumo detalhado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Categoria
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Downloads
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">
                    Participação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {downloadsReport.items.map((item) => (
                  <tr key={item.categoryId ?? item.categoryName}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.categoryName}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">
                      {formatNumber(item.downloadCount)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">
                      {item.percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
              <span>Total de downloads: <strong>{formatNumber(downloadsReport.totalDownloads)}</strong></span>
              <span>Total de categorias: <strong>{downloadsReport.totalCategories}</strong></span>
            </div>
          </div>
        )}
          </motion.div>
        )}

        {activeReportKey === 'storage-usage' && (
          <motion.div
            key="storage-usage"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Uso de Storage</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visão consolidada do espaço utilizado e arquivos maiores.</p>
              </div>
              {storageUsageReport && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="block sm:text-right">Arquivos totais: {formatNumber(storageUsageReport.summary.totalFiles)}</span>
                    <span className="block sm:text-right">Espaço total: {storageUsageReport.summary.totalSizeFormatted}</span>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                    disabled={downloadingStoragePdf}
                    onClick={async () => {
                      if (!storageUsageReport) return;
                      try {
                        setDownloadingStoragePdf(true);
                        showGeneratingToast(toast, 'Gerando PDF...');
                        const blob = await buildStorageUsageReportBlob(storageUsageReport, generatedBy);
                        const fileName = `${buildFileName('relatorio-uso-storage', storageUsageReport.generatedAt)}.pdf`;
                        triggerBlobDownload(blob, fileName);
                        showSuccessToast(toast, 'PDF gerado com sucesso.');
                      } catch (e) {
                        const description = e instanceof Error ? e.message : undefined;
                        showErrorToast(toast, description);
                      } finally {
                        setDownloadingStoragePdf(false);
                      }
                    }}
                  >
                    {downloadingStoragePdf ? 'Gerando...' : 'Baixar PDF'}
                  </Button>
                </div>
              )}
            </div>

            {!storageUsageReport ? (
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Gere o relatório de uso de storage para visualizar o resumo detalhado.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Arquivos Órfãos</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(storageUsageReport.summary.orphanFiles)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Tamanho Médio</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(Math.round(storageUsageReport.summary.avgFileSize / 1024))} KB</p>
                    </CardHeader>
                  </Card>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/60">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Tipo</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Quantidade</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Tamanho</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Participação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {storageUsageReport.distribution.map((item) => (
                        <tr key={item.type}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.type.toUpperCase()}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.count)}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{item.sizeFormatted}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{item.percentage.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/60">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Arquivo</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Categoria</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Tipo</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Tamanho</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Criado em</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {storageUsageReport.largestFiles.map((file) => (
                        <tr key={file.id}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{file.originalName}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{file.category}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{file.mimeType}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{file.sizeFormatted}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{file.createdAt ? formatDate(file.createdAt) : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeReportKey === 'infrastructure-health' && (
          <motion.div
            key="infrastructure-health"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Saúde da Infraestrutura</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monitoramento do ambiente, uptime e recursos.</p>
              </div>
              {infrastructureHealthReport && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="block sm:text-right">Servidor: {infrastructureHealthReport.system.hostname}</span>
                    <span className="block sm:text-right">Uptime: {infrastructureHealthReport.system.uptime.formatted}</span>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                    disabled={downloadingInfrastructurePdf}
                    onClick={async () => {
                      if (!infrastructureHealthReport) return;
                      try {
                        setDownloadingInfrastructurePdf(true);
                        showGeneratingToast(toast, 'Gerando PDF...');
                        const blob = await buildInfrastructureHealthReportBlob(infrastructureHealthReport, generatedBy);
                        const fileName = `${buildFileName('relatorio-saude-infraestrutura', infrastructureHealthReport.generatedAt)}.pdf`;
                        triggerBlobDownload(blob, fileName);
                        showSuccessToast(toast, 'PDF gerado com sucesso.');
                      } catch (e) {
                        const description = e instanceof Error ? e.message : undefined;
                        showErrorToast(toast, description);
                      } finally {
                        setDownloadingInfrastructurePdf(false);
                      }
                    }}
                  >
                    {downloadingInfrastructurePdf ? 'Gerando...' : 'Baixar PDF'}
                  </Button>
                </div>
              )}
            </div>

            {!infrastructureHealthReport ? (
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Gere o relatório de saúde da infraestrutura para visualizar o resumo detalhado.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Plataforma</CardTitle>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">{`${infrastructureHealthReport.system.platform} (${infrastructureHealthReport.system.arch})`}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">CPU</CardTitle>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">{`${infrastructureHealthReport.resources.cpu.count} cores`}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Memória Total</CardTitle>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">{infrastructureHealthReport.resources.memory.totalFormatted}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Memória Usada</CardTitle>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">
                        {`${infrastructureHealthReport.resources.memory.usedFormatted} (${infrastructureHealthReport.resources.memory.usagePercent.toFixed(1)}%)`}
                      </p>
                    </CardHeader>
                  </Card>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Serviços Principais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>Banco de Dados</span>
                        <Badge className={cn('px-2 py-1 text-[10px] font-semibold', infrastructureHealthReport.services.database.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500')}>
                          {infrastructureHealthReport.services.database.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>API</span>
                        <Badge className={cn('px-2 py-1 text-[10px] font-semibold', infrastructureHealthReport.services.api.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500')}>
                          {infrastructureHealthReport.services.api.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Métricas Semanais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center justify-between">
                        <span>Requisições</span>
                        <strong>{formatNumber(infrastructureHealthReport.metrics.last7Days.totalRequests)}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Erros 500</span>
                        <strong>{formatNumber(infrastructureHealthReport.metrics.last7Days.errors500)}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Taxa de Erro</span>
                        <strong>{infrastructureHealthReport.metrics.last7Days.errorRate.toFixed(2)}%</strong>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeReportKey === 'system-maintenance' && (
          <motion.div
            key="system-maintenance"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Manutenção do Sistema</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Checklist de tarefas preventivas e recomendações prioritárias.</p>
              </div>
              {systemMaintenanceReport && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="block sm:text-right">Health score: {systemMaintenanceReport.healthScore}%</span>
                    <span className="block sm:text-right">Logs antigos: {formatNumber(systemMaintenanceReport.summary.oldLogs)}</span>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                    disabled={downloadingMaintenancePdf}
                    onClick={async () => {
                      if (!systemMaintenanceReport) return;
                      try {
                        setDownloadingMaintenancePdf(true);
                        showGeneratingToast(toast, 'Gerando PDF...');
                        const blob = await buildSystemMaintenanceReportBlob(systemMaintenanceReport, generatedBy);
                        const fileName = `${buildFileName('relatorio-manutencao-sistema', systemMaintenanceReport.generatedAt)}.pdf`;
                        triggerBlobDownload(blob, fileName);
                        showSuccessToast(toast, 'PDF gerado com sucesso.');
                      } catch (e) {
                        const description = e instanceof Error ? e.message : undefined;
                        showErrorToast(toast, description);
                      } finally {
                        setDownloadingMaintenancePdf(false);
                      }
                    }}
                  >
                    {downloadingMaintenancePdf ? 'Gerando...' : 'Baixar PDF'}
                  </Button>
                </div>
              )}
            </div>

            {!systemMaintenanceReport ? (
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Gere o relatório de manutenção para visualizar tarefas e recomendações.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Logs totais</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(systemMaintenanceReport.summary.totalLogs)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Usuários inativos</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(systemMaintenanceReport.summary.inactiveUsers)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Arquivos órfãos</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(systemMaintenanceReport.summary.orphanFiles)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Dias desde o log mais antigo</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{systemMaintenanceReport.summary.daysSinceOldestLog}</p>
                    </CardHeader>
                  </Card>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/60">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Tarefa</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Última execução</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Recomendação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {systemMaintenanceReport.checklist.map((item) => (
                        <tr key={item.task}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.task}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge className={cn('px-2 py-1 text-[10px] font-semibold', item.status === 'ok' ? 'bg-emerald-500' : item.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500')}>
                              {item.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.lastExecution ? formatDate(item.lastExecution) : 'Nunca'}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.recommendation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Ações sugeridas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    {systemMaintenanceReport.recommendations.map((item) => (
                      <div key={item.title} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                          <Badge className={cn('px-2 py-1 text-[10px] font-semibold', item.priority === 'high' ? 'bg-rose-500' : item.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500')}>
                            {item.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">{item.description}</p>
                        <code className="mt-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">{item.command}</code>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        )}

        {activeReportKey === 'security-audit' && (
          <motion.div
            key="security-audit"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Auditoria de Segurança</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Eventos críticos, tentativas de login e alterações de permissões.</p>
              </div>
              {securityAuditReport && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="block sm:text-right">Logins bem-sucedidos: {formatNumber(securityAuditReport.summary.successfulLogins)}</span>
                    <span className="block sm:text-right">Taxa de sucesso: {securityAuditReport.summary.loginSuccessRate.toFixed(1)}%</span>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                    disabled={downloadingSecurityPdf}
                    onClick={async () => {
                      if (!securityAuditReport) return;
                      try {
                        setDownloadingSecurityPdf(true);
                        showGeneratingToast(toast, 'Gerando PDF...');
                        const blob = await buildSecurityAuditReportBlob(securityAuditReport, generatedBy);
                        const fileName = `${buildFileName('relatorio-auditoria-seguranca', securityAuditReport.generatedAt)}.pdf`;
                        triggerBlobDownload(blob, fileName);
                        showSuccessToast(toast, 'PDF gerado com sucesso.');
                      } catch (e) {
                        const description = e instanceof Error ? e.message : undefined;
                        showErrorToast(toast, description);
                      } finally {
                        setDownloadingSecurityPdf(false);
                      }
                    }}
                  >
                    {downloadingSecurityPdf ? 'Gerando...' : 'Baixar PDF'}
                  </Button>
                </div>
              )}
            </div>

            {!securityAuditReport ? (
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Gere o relatório de auditoria de segurança para visualizar os eventos registrados.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Logins falhados</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(securityAuditReport.summary.failedLogins)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Mudanças de permissões</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(securityAuditReport.summary.permissionChanges)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Usuários criados</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(securityAuditReport.summary.usersCreated)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Acessos fora do horário</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(securityAuditReport.summary.afterHoursAccess)}</p>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Alertas gerados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {securityAuditReport.alerts.length === 0 ? (
                      <p className="text-sm text-gray-700 dark:text-gray-300">Nenhum alerta crítico registrado no período.</p>
                    ) : (
                      securityAuditReport.alerts.map((alert) => (
                        <div key={alert.message} className="flex items-start justify-between gap-4 rounded border border-gray-200 dark:border-gray-800 p-3">
                          <Badge className={cn('px-2 py-1 text-[10px] font-semibold uppercase', alert.level === 'high' ? 'bg-rose-500' : alert.level === 'medium' ? 'bg-amber-500' : 'bg-sky-500')}>
                            {alert.level}
                          </Badge>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{alert.message}</p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/60">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Evento</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Usuário</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Horário</th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Detalhes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {securityAuditReport.recentEvents.map((event) => (
                        <tr key={event.id}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{event.action}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{event.userId ?? 'Sistema'}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{formatDateTime(event.timestamp)}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{event.details ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeReportKey === 'api-performance' && (
          <motion.div
            key="api-performance"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Performance de API</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Endpoints mais carregados, erros e volume por hora.</p>
              </div>
              {apiPerformanceReport && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="block sm:text-right">Requisições: {formatNumber(apiPerformanceReport.summary.totalRequests)}</span>
                    <span className="block sm:text-right">Endpoints monitorados: {formatNumber(apiPerformanceReport.summary.totalEndpoints)}</span>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                    disabled={downloadingApiPdf}
                    onClick={async () => {
                      if (!apiPerformanceReport) return;
                      try {
                        setDownloadingApiPdf(true);
                        showGeneratingToast(toast, 'Gerando PDF...');
                        const blob = await buildApiPerformanceReportBlob(apiPerformanceReport, generatedBy);
                        const fileName = `${buildFileName('relatorio-performance-api', apiPerformanceReport.generatedAt)}.pdf`;
                        triggerBlobDownload(blob, fileName);
                        showSuccessToast(toast, 'PDF gerado com sucesso.');
                      } catch (e) {
                        const description = e instanceof Error ? e.message : undefined;
                        showErrorToast(toast, description);
                      } finally {
                        setDownloadingApiPdf(false);
                      }
                    }}
                  >
                    {downloadingApiPdf ? 'Gerando...' : 'Baixar PDF'}
                  </Button>
                </div>
              )}
            </div>

            {!apiPerformanceReport ? (
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Gere o relatório de performance da API para visualizar os indicadores detalhados.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Requisições por minuto</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{apiPerformanceReport.summary.requestsPerMinute.toFixed(2)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Total de erros</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(apiPerformanceReport.summary.totalErrors)}</p>
                    </CardHeader>
                  </Card>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/60">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Endpoint</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Requisições</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Erros</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Taxa de erro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {apiPerformanceReport.topEndpoints.map((endpoint) => (
                        <tr key={endpoint.endpoint}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{endpoint.endpoint}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(endpoint.requests)}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(endpoint.errors)}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{endpoint.errorRate.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/60">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Hora</th>
                        <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Requisições</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {apiPerformanceReport.hourlyDistribution.map((item) => (
                        <tr key={item.hour}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{`${item.hour.toString().padStart(2, '0')}:00`}</td>
                          <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.requests)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeReportKey === 'compliance-lgpd' && (
          <motion.div
            key="compliance-lgpd"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Compliance LGPD</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Status de conformidade, dados sensíveis e recomendações priorizadas.</p>
              </div>
              {complianceLgpdReport && (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span className="block sm:text-right">Score de compliance: {complianceLgpdReport.complianceScore}%</span>
                    <span className="block sm:text-right">Usuários com dados pessoais: {formatNumber(complianceLgpdReport.summary.usersWithPersonalData)}</span>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                    disabled={downloadingCompliancePdf}
                    onClick={async () => {
                      if (!complianceLgpdReport) return;
                      try {
                        setDownloadingCompliancePdf(true);
                        showGeneratingToast(toast, 'Gerando PDF...');
                        const blob = await buildComplianceLgpdReportBlob(complianceLgpdReport, generatedBy);
                        const fileName = `${buildFileName('relatorio-compliance-lgpd', complianceLgpdReport.generatedAt)}.pdf`;
                        triggerBlobDownload(blob, fileName);
                        showSuccessToast(toast, 'PDF gerado com sucesso.');
                      } catch (e) {
                        const description = e instanceof Error ? e.message : undefined;
                        showErrorToast(toast, description);
                      } finally {
                        setDownloadingCompliancePdf(false);
                      }
                    }}
                  >
                    {downloadingCompliancePdf ? 'Gerando...' : 'Baixar PDF'}
                  </Button>
                </div>
              )}
            </div>

            {!complianceLgpdReport ? (
              <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Gere o relatório de compliance LGPD para visualizar o panorama completo.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Usuários totais</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(complianceLgpdReport.summary.totalUsers)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Usuários privilegiados</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(complianceLgpdReport.summary.privilegedUsers)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Dados acessados (30 dias)</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(complianceLgpdReport.summary.personalDataAccessLast30Days)}</p>
                    </CardHeader>
                  </Card>
                  <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Usuários desativados</CardTitle>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">{formatNumber(complianceLgpdReport.summary.deactivatedUsers)}</p>
                    </CardHeader>
                  </Card>
                </div>

                <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Aspectos avaliados</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(complianceLgpdReport.compliance).map(([key, value]) => (
                      <div key={key} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-white">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <Badge className={cn('px-2 py-1 text-[10px] font-semibold uppercase', value.status === 'ok' ? 'bg-emerald-500' : value.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500')}>
                            {value.status}
                          </Badge>
                        </div>
                        {'message' in value && value.message ? (
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{value.message}</p>
                        ) : null}
                        {'oldLogsCount' in value ? (
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Logs antigos: {formatNumber(value.oldLogsCount ?? 0)}</p>
                        ) : null}
                        {'privilegedUsersCount' in value ? (
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Usuários privilegiados: {formatNumber(value.privilegedUsersCount ?? 0)}</p>
                        ) : null}
                        {'usersWithConsent' in value ? (
                          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Usuários com consentimento: {formatNumber(value.usersWithConsent ?? 0)}</p>
                        ) : null}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Recomendações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    {complianceLgpdReport.recommendations.map((item) => (
                      <div key={item.title} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                          <Badge className={cn('px-2 py-1 text-[10px] font-semibold', item.priority === 'high' ? 'bg-rose-500' : item.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500')}>
                            {item.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        )}

        {activeReportKey === 'video-views' && (
          <motion.div
            key="video-views"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Visualizações de Vídeos</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Engajamento dos vídeos do IMUNEPLAY nos últimos 30 dias.</p>
          </div>
          {videoViewsReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Período: {formatDateRange(videoViewsReport.period)}</span>
                <span className="block sm:text-right">Gerado em: {formatDateTime(videoViewsReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingVideoPdf}
                onClick={async () => {
                  if (!videoViewsReport) return;
                  try {
                    setDownloadingVideoPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildVideoViewsReportBlob(videoViewsReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-visualizacoes-videos', videoViewsReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingVideoPdf(false);
                  }
                }}
              >
                {downloadingVideoPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!videoViewsReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o relatório de visualizações de vídeos para visualizar o resumo detalhado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Vídeo</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Categoria</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Visualizações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {videoViewsReport.items.map((item) => (
                  <tr key={item.fileId}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.category}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.viewCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
              <span>Total de visualizações: <strong>{formatNumber(videoViewsReport.totalViews)}</strong></span>
              <span>Total de vídeos: <strong>{videoViewsReport.totalVideos}</strong></span>
            </div>
          </div>
        )}
          </motion.div>
        )}

        {activeReportKey === 'top-downloads' && (
          <motion.div
            key="top-downloads"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Arquivos Mais Baixados</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Top arquivos mais baixados nos últimos 30 dias.</p>
          </div>
          {topDownloadsReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Período: {formatDateRange(topDownloadsReport.period)}</span>
                <span className="block sm:text-right">Gerado em: {formatDateTime(topDownloadsReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingTopPdf}
                onClick={async () => {
                  if (!topDownloadsReport) return;
                  try {
                    setDownloadingTopPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildTopDownloadsReportBlob(topDownloadsReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-top-downloads', topDownloadsReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingTopPdf(false);
                  }
                }}
              >
                {downloadingTopPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!topDownloadsReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o relatório de arquivos mais baixados para visualizar o resumo detalhado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Posição</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Arquivo</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Categoria</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Downloads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {topDownloadsReport.items.map((item) => (
                  <tr key={item.fileId}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.category}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.downloadCount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
              <span>Total de downloads: <strong>{formatNumber(topDownloadsReport.totalDownloads)}</strong></span>
              <span>Total de arquivos: <strong>{topDownloadsReport.totalFiles}</strong></span>
            </div>
          </div>
        )}
          </motion.div>
        )}

        {activeReportKey === 'uploads-summary' && (
          <motion.div
            key="uploads-summary"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Uploads por Período</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Comparativo de uploads por categoria nos últimos 30 dias.</p>
          </div>
          {uploadsReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Período: {formatDateRange(uploadsReport.period)}</span>
                <span className="block sm:text-right">Gerado em: {formatDateTime(uploadsReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingUploadsPdf}
                onClick={async () => {
                  if (!uploadsReport) return;
                  try {
                    setDownloadingUploadsPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildUploadsSummaryReportBlob(uploadsReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-uploads-periodo', uploadsReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingUploadsPdf(false);
                  }
                }}
              >
                {downloadingUploadsPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!uploadsReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o relatório de uploads por período para visualizar o resumo detalhado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Categoria</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Uploads</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Participação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {uploadsReport.items.map((item) => (
                  <tr key={item.categoryId ?? item.categoryName}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.categoryName}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.uploadCount)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{item.percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
              <span>Total de uploads: <strong>{formatNumber(uploadsReport.totalUploads)}</strong></span>
              <span>Total de categorias: <strong>{uploadsReport.totalCategories}</strong></span>
            </div>
          </div>
        )}
          </motion.div>
        )}

        {activeReportKey === 'categories-health' && (
          <motion.div
            key="categories-health"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Saúde das Categorias</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Status atual das categorias do sistema.</p>
          </div>
          {categoriesHealthReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Gerado em: {formatDateTime(categoriesHealthReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingCategoriesPdf}
                onClick={async () => {
                  if (!categoriesHealthReport) return;
                  try {
                    setDownloadingCategoriesPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildCategoriesHealthReportBlob(categoriesHealthReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-saude-categorias', categoriesHealthReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingCategoriesPdf(false);
                  }
                }}
              >
                {downloadingCategoriesPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!categoriesHealthReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o relatório de saúde das categorias para visualizar o resumo detalhado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Categoria</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Arquivos</th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Status</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Último Upload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {categoriesHealthReport.items.map((item) => (
                  <tr key={item.categoryId}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.categoryName}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.fileCount)}</td>
                    <td className="px-4 py-3 text-center text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${item.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {item.status === 'active' ? 'Ativa' : 'Vazia'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{item.lastUpload ? formatDate(item.lastUpload) : 'Nunca'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
              <span>Total de categorias: <strong>{categoriesHealthReport.totalCategories}</strong></span>
              <span>Ativas: <strong className="text-green-600 dark:text-green-400">{categoriesHealthReport.activeCategories}</strong></span>
              <span>Vazias: <strong className="text-gray-600 dark:text-gray-400">{categoriesHealthReport.emptyCategories}</strong></span>
            </div>
          </div>
        )}
          </motion.div>
        )}

        {activeReportKey === 'user-activity' && (
          <motion.div
            key="user-activity"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Atividade de Usuários</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Distribuição de usuários por papel e status.</p>
          </div>
          {userActivityReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Gerado em: {formatDateTime(userActivityReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingUserActivityPdf}
                onClick={async () => {
                  if (!userActivityReport) return;
                  try {
                    setDownloadingUserActivityPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildUserActivityReportBlob(userActivityReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-atividade-usuarios', userActivityReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingUserActivityPdf(false);
                  }
                }}
              >
                {downloadingUserActivityPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!userActivityReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o relatório de atividade de usuários para visualizar o resumo detalhado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Papel</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Usuários</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Participação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {userActivityReport.items.map((item) => (
                  <tr key={item.role}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.role}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.userCount)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{item.percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
              <span>Total de usuários: <strong>{formatNumber(userActivityReport.totalUsers)}</strong></span>
              <span>Ativos: <strong className="text-green-600 dark:text-green-400">{formatNumber(userActivityReport.activeUsers)}</strong></span>
              <span>Inativos: <strong className="text-gray-600 dark:text-gray-400">{formatNumber(userActivityReport.inactiveUsers)}</strong></span>
            </div>
          </div>
        )}
          </motion.div>
        )}

        {activeReportKey === 'logs-activity' && (
          <motion.div
            key="logs-activity"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Atividade do Sistema</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Eventos registrados nos últimos 30 dias.</p>
          </div>
          {logsActivityReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Período: {formatDateRange(logsActivityReport.period)}</span>
                <span className="block sm:text-right">Gerado em: {formatDateTime(logsActivityReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingLogsPdf}
                onClick={async () => {
                  if (!logsActivityReport) return;
                  try {
                    setDownloadingLogsPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildLogsActivityReportBlob(logsActivityReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-atividade-sistema', logsActivityReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingLogsPdf(false);
                  }
                }}
              >
                {downloadingLogsPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!logsActivityReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o relatório de atividade do sistema para visualizar o resumo detalhado.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Ação</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Eventos</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Participação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {logsActivityReport.items.map((item) => (
                  <tr key={item.action}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.action}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(item.eventCount)}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{item.percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 sm:flex-row sm:items-center sm:justify-between">
              <span>Total de eventos: <strong>{formatNumber(logsActivityReport.totalEvents)}</strong></span>
              <span>Ações distintas: <strong>{logsActivityReport.totalActions}</strong></span>
            </div>
          </div>
        )}
          </motion.div>
        )}

        {activeReportKey === 'system-overview' && (
          <motion.div
            key="system-overview"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 18,
              mass: 0.8
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumo • Resumo Geral do Sistema</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Principais indicadores do IMUNE+.</p>
          </div>
          {systemOverviewReport && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:text-right">Gerado em: {formatDateTime(systemOverviewReport.generatedAt)}</span>
              </div>
              <Button
                type="button"
                variant="default"
                className="bg-[var(--primary)] text-white hover:bg-black/80 transition-colors"
                disabled={downloadingOverviewPdf}
                onClick={async () => {
                  if (!systemOverviewReport) return;
                  try {
                    setDownloadingOverviewPdf(true);
                    showGeneratingToast(toast, 'Gerando PDF...');
                    const blob = await buildSystemOverviewReportBlob(systemOverviewReport, generatedBy);
                    const fileName = `${buildFileName('relatorio-resumo-sistema', systemOverviewReport.generatedAt)}.pdf`;
                    triggerBlobDownload(blob, fileName);
                    showSuccessToast(toast, 'PDF gerado com sucesso.');
                  } catch (e) {
                    const description = e instanceof Error ? e.message : undefined;
                    showErrorToast(toast, description);
                  } finally {
                    setDownloadingOverviewPdf(false);
                  }
                }}
              >
                {downloadingOverviewPdf ? 'Gerando...' : 'Baixar PDF'}
              </Button>
            </div>
          )}
        </div>

        {!systemOverviewReport ? (
          <div className="rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Gere o resumo geral do sistema para visualizar os indicadores.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/60">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Indicador</th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-300">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Usuários</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(systemOverviewReport.totalUsers)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Arquivos</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(systemOverviewReport.totalFiles)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Categorias</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(systemOverviewReport.totalCategories)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Downloads</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(systemOverviewReport.totalDownloads)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Vídeos</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(systemOverviewReport.totalVideoViews)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">Logs de Acesso</td>
                  <td className="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">{formatNumber(systemOverviewReport.totalLogs)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface ApiPeriod {
  start: string;
  end: string;
}

interface DownloadsByCategoryItem {
  categoryId: string | null;
  categoryName: string;
  downloadCount: number;
  percentage: number;
}

interface DownloadsByCategoryResponse {
  period: ApiPeriod;
  generatedAt: string;
  totalDownloads: number;
  totalCategories: number;
  items: DownloadsByCategoryItem[];
}

interface VideoViewsItem {
  fileId: string;
  title: string;
  viewCount: number;
  category: string;
  categoryId: string | null;
  categorySlug: string | null;
  createdAt: string | null;
}

interface VideoViewsResponse {
  period: ApiPeriod;
  generatedAt: string;
  totalViews: number;
  totalVideos: number;
  items: VideoViewsItem[];
}

interface TopDownloadsItem {
  position: number;
  fileId: string;
  title: string;
  description: string | null;
  category: string;
  categoryId: string | null;
  downloadCount: number;
  createdAt: string | null;
}

interface TopDownloadsResponse {
  period: ApiPeriod;
  generatedAt: string;
  totalDownloads: number;
  totalFiles: number;
  items: TopDownloadsItem[];
}

interface UploadsSummaryItem {
  categoryId: string | null;
  categoryName: string;
  uploadCount: number;
  percentage: number;
}

interface UploadsSummaryResponse {
  period: ApiPeriod;
  generatedAt: string;
  totalUploads: number;
  totalCategories: number;
  items: UploadsSummaryItem[];
}

interface CategoriesHealthItem {
  categoryId: string;
  categoryName: string;
  fileCount: number;
  status: 'active' | 'empty';
  lastUpload: string | null;
}

interface CategoriesHealthResponse {
  generatedAt: string;
  totalCategories: number;
  activeCategories: number;
  emptyCategories: number;
  items: CategoriesHealthItem[];
}

interface UserActivityItem {
  role: string;
  userCount: number;
  percentage: number;
}

interface UserActivityResponse {
  generatedAt: string;
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  items: UserActivityItem[];
}

interface LogsActivityItem {
  action: string;
  eventCount: number;
  percentage: number;
}

interface LogsActivityResponse {
  period: ApiPeriod;
  generatedAt: string;
  totalEvents: number;
  totalActions: number;
  items: LogsActivityItem[];
}

interface SystemOverviewResponse {
  generatedAt: string;
  totalUsers: number;
  totalFiles: number;
  totalCategories: number;
  totalDownloads: number;
  totalVideoViews: number;
  totalLogs: number;
}

// Storage Usage Report
interface StorageUsageResponse {
  generatedAt: string;
  summary: {
    totalFiles: number;
    totalSize: number;
    totalSizeFormatted: string;
    orphanFiles: number;
    avgFileSize: number;
  };
  distribution: Array<{
    type: string;
    count: number;
    size: number;
    sizeFormatted: string;
    percentage: number;
  }>;
  largestFiles: Array<{
    position: number;
    id: string;
    filename: string;
    originalName: string;
    size: number;
    sizeFormatted: string;
    mimeType: string;
    category: string;
    createdAt: string;
  }>;
}

// Infrastructure Health Report
interface InfrastructureHealthResponse {
  generatedAt: string;
  system: {
    platform: string;
    arch: string;
    hostname: string;
    nodeVersion: string;
    uptime: {
      seconds: number;
      formatted: string;
    };
  };
  resources: {
    memory: {
      total: number;
      totalFormatted: string;
      used: number;
      usedFormatted: string;
      free: number;
      freeFormatted: string;
      usagePercent: number;
    };
    cpu: {
      count: number;
      model: string;
    };
  };
  services: {
    database: {
      status: string;
      type: string;
    };
    api: {
      status: string;
      version: string;
    };
  };
  metrics: {
    last7Days: {
      totalRequests: number;
      errors500: number;
      errorRate: number;
    };
  };
}

// System Maintenance Report
interface SystemMaintenanceResponse {
  generatedAt: string;
  healthScore: number;
  summary: {
    totalLogs: number;
    oldLogs: number;
    orphanFiles: number;
    inactiveUsers: number;
    daysSinceOldestLog: number;
  };
  checklist: Array<{
    task: string;
    status: string;
    lastExecution: string;
    recommendation: string;
  }>;
  recommendations: Array<{
    priority: string;
    title: string;
    description: string;
    command: string;
  }>;
}

// Security Audit Report
interface SecurityAuditResponse {
  period: ApiPeriod;
  generatedAt: string;
  summary: {
    failedLogins: number;
    successfulLogins: number;
    loginSuccessRate: number;
    permissionChanges: number;
    usersCreated: number;
    usersDeactivated: number;
    twoFactorChanges: number;
    afterHoursAccess: number;
  };
  alerts: Array<{
    level: string;
    message: string;
  }>;
  recentEvents: Array<{
    position: number;
    id: string;
    action: string;
    timestamp: string;
    userId: string | null;
    details: string | null;
  }>;
}

// API Performance Report
interface ApiPerformanceResponse {
  period: ApiPeriod;
  generatedAt: string;
  summary: {
    totalRequests: number;
    requestsPerMinute: number;
    totalEndpoints: number;
    totalErrors: number;
  };
  topEndpoints: Array<{
    position: number;
    endpoint: string;
    requests: number;
    requestsPerMinute: number;
    errors: number;
    errorRate: number;
    successRate: number;
  }>;
  errorEndpoints: Array<{
    position: number;
    endpoint: string;
    errors: number;
  }>;
  hourlyDistribution: Array<{
    hour: number;
    requests: number;
  }>;
}

// Compliance LGPD Report
interface ComplianceLgpdResponse {
  generatedAt: string;
  complianceScore: number;
  summary: {
    totalUsers: number;
    usersWithPersonalData: number;
    privilegedUsers: number;
    deactivatedUsers: number;
    personalDataAccessLast30Days: number;
  };
  compliance: {
    dataRetention: {
      status: string;
      message: string;
      oldLogsCount: number;
      totalLogsCount: number;
    };
    userConsent: {
      status: string;
      message: string;
      usersWithConsent: number;
    };
    dataAccess: {
      status: string;
      message: string;
      privilegedUsersCount: number;
    };
    dataMinimization: {
      status: string;
      message: string;
    };
  };
  recommendations: Array<{
    priority: string;
    title: string;
    description: string;
  }>;
}

function isActiveReport(report: ReportDefinition): report is ReportDefinition & { key: ActiveReportKey; endpoint: string } {
  return Boolean(report.endpoint && ACTIVE_REPORT_KEYS[report.key as ActiveReportKey]);
}

/**
 * Retorna o texto do badge baseado nas roles
 * - Se COORDENADOR está incluído: mostra apenas COORDENADOR
 * - Se apenas ADMIN e SYSADMIN: mostra apenas ADMIN
 * - Se apenas SYSADMIN: mostra SYSADMIN
 */
function getRoleBadgeText(roles: Array<'SYSADMIN' | 'ADMIN' | 'COORDENADOR'>): string {
  // Se COORDENADOR pode acessar, mostrar apenas COORDENADOR
  if (roles.includes('COORDENADOR')) {
    return 'COORDENADOR';
  }
  
  // Se ADMIN e SYSADMIN, mostrar apenas ADMIN (simplificado)
  if (roles.includes('SYSADMIN') && roles.includes('ADMIN')) {
    return 'ADMIN';
  }
  
  // Se apenas SYSADMIN
  if (roles.includes('SYSADMIN')) {
    return 'SYSADMIN';
  }
  
  // Se apenas ADMIN
  if (roles.includes('ADMIN')) {
    return 'ADMIN';
  }
  
  return 'COORDENADOR';
}

/**
 * Retorna as classes de cores baseadas nas roles do relatório
 * Background: Cores distintas do sistema de skin (Azul, Roxo/Magenta, Vermelho)
 * Badge: Usa cor primária do sistema (skin)
 */
function getReportColorClasses(roles: Array<'SYSADMIN' | 'ADMIN' | 'COORDENADOR'>) {
  // COORDENADOR (todos os níveis) - Azul (#3F51B5 / #5C6BC0)
  if (roles.includes('COORDENADOR')) {
    return {
      from: '#3F51B5',
      to: '#5C6BC0',
      cardBg: 'bg-gradient-to-br from-[#3F51B5] to-[#5C6BC0] dark:from-[#3F51B5] dark:to-[#5C6BC0]',
      border: 'border-[#3F51B5]/70 dark:border-[#3F51B5]/70',
      ring: 'focus-visible:ring-[#3F51B5]',
      roleBadge: 'bg-[var(--primary)] text-white pointer-events-none',
    };
  }

  // ADMIN (sem COORDENADOR) - Roxo/Magenta (#9C27B0 / #AB47BC)
  if (roles.includes('ADMIN')) {
    return {
      from: '#9C27B0',
      to: '#AB47BC',
      cardBg: 'bg-gradient-to-br from-[#9C27B0] to-[#AB47BC] dark:from-[#9C27B0] dark:to-[#AB47BC]',
      border: 'border-[#9C27B0]/70 dark:border-[#9C27B0]/70',
      ring: 'focus-visible:ring-[#9C27B0]',
      roleBadge: 'bg-[var(--primary)] text-white pointer-events-none',
    };
  }

  // SYSADMIN (exclusivo) - Vermelho/Rosa (#E91E63 / #EC407A)
  if (roles.includes('SYSADMIN')) {
    return {
      from: '#E91E63',
      to: '#EC407A',
      cardBg: 'bg-gradient-to-br from-[#E91E63] to-[#EC407A] dark:from-[#E91E63] dark:to-[#EC407A]',
      border: 'border-[#E91E63]/70 dark:border-[#E91E63]/70',
      ring: 'focus-visible:ring-[#E91E63]',
      roleBadge: 'bg-[var(--primary)] text-white pointer-events-none',
    };
  }

  // Fallback
  return {
    from: '#ffffff',
    to: '#f3f4f6',
    cardBg: 'bg-white dark:bg-gray-800',
    border: 'border-gray-200 dark:border-gray-700',
    ring: 'focus-visible:ring-gray-500',
    roleBadge: 'bg-[var(--primary)] text-white pointer-events-none',
  };
}

function triggerBlobDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function buildDownloadsByCategoryReport(
  data: DownloadsByCategoryResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Downloads por categoria',
      subtitle: `${formatNumber(data.totalDownloads)} downloads em ${data.totalCategories} categorias`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Categoria', 'Downloads', 'Participação'],
        data.items.map((item) => [
          item.categoryName,
          formatNumber(item.downloadCount),
          `${item.percentage.toFixed(2)}%`,
        ]),
      );
    },
  );
}

async function buildVideoViewsReportBlob(
  data: VideoViewsResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Visualizações de Vídeos',
      subtitle: `${formatNumber(data.totalViews)} visualizações analisadas`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Vídeo', 'Categoria', 'Visualizações'],
        data.items.map((item) => [
          item.title,
          item.category,
          formatNumber(item.viewCount),
        ]),
      );
    },
  );
}

async function buildTopDownloadsReportBlob(
  data: TopDownloadsResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Arquivos Mais Baixados',
      subtitle: `${formatNumber(data.totalDownloads)} downloads acumulados`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Posição', 'Arquivo', 'Categoria', 'Downloads'],
        data.items.map((item) => [
          String(item.position),
          item.title,
          item.category,
          formatNumber(item.downloadCount),
        ]),
      );
    },
  );
}

async function buildUploadsSummaryReportBlob(
  data: UploadsSummaryResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Uploads por Período',
      subtitle: `${formatNumber(data.totalUploads)} uploads em ${data.totalCategories} categorias`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Categoria', 'Uploads', 'Participação'],
        data.items.map((item) => [
          item.categoryName,
          formatNumber(item.uploadCount),
          `${item.percentage.toFixed(2)}%`,
        ]),
      );
    },
  );
}

async function buildCategoriesHealthReportBlob(
  data: CategoriesHealthResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Saúde das Categorias',
      subtitle: `${data.activeCategories} ativas, ${data.emptyCategories} vazias`,
      generatedBy,
      period: { start: new Date(), end: new Date() },
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Categoria', 'Arquivos', 'Status', 'Último Upload'],
        data.items.map((item) => [
          item.categoryName,
          formatNumber(item.fileCount),
          item.status === 'active' ? 'Ativa' : 'Vazia',
          item.lastUpload ? formatDate(item.lastUpload) : 'Nunca',
        ]),
      );
    },
  );
}

async function buildUserActivityReportBlob(
  data: UserActivityResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Atividade de Usuários',
      subtitle: `${data.totalUsers} usuários (${data.activeUsers} ativos)`,
      generatedBy,
      period: { start: new Date(), end: new Date() },
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Papel', 'Usuários', 'Participação'],
        data.items.map((item) => [
          item.role,
          formatNumber(item.userCount),
          `${item.percentage.toFixed(2)}%`,
        ]),
      );
    },
  );
}

async function buildLogsActivityReportBlob(
  data: LogsActivityResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Atividade do Sistema',
      subtitle: `${formatNumber(data.totalEvents)} eventos registrados`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Ação', 'Eventos', 'Participação'],
        data.items.map((item) => [
          item.action,
          formatNumber(item.eventCount),
          `${item.percentage.toFixed(2)}%`,
        ]),
      );
    },
  );
}

async function buildSystemOverviewReportBlob(
  data: SystemOverviewResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Resumo Geral do Sistema',
      subtitle: 'Principais indicadores do IMUNE+',
      generatedBy,
      period: { start: new Date(), end: new Date() },
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Indicador', 'Total'],
        [
          ['Usuários', formatNumber(data.totalUsers)],
          ['Arquivos', formatNumber(data.totalFiles)],
          ['Categorias', formatNumber(data.totalCategories)],
          ['Downloads', formatNumber(data.totalDownloads)],
          ['Visualizações de Vídeos', formatNumber(data.totalVideoViews)],
          ['Logs de Acesso', formatNumber(data.totalLogs)],
        ],
      );
    },
  );
}

// TODO: Implementar visualizações HTML para os 6 novos relatórios
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildStorageUsageReportBlob(
  data: StorageUsageResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Uso de Storage',
      subtitle: `${data.summary.totalSizeFormatted} em ${data.summary.totalFiles} arquivos`,
      generatedBy,
      period: { start: new Date(), end: new Date() },
    },
    (doc: jsPDF) => {
      // Distribuição por tipo
      addReportTable(
        doc,
        ['Tipo', 'Arquivos', 'Tamanho', 'Participação'],
        data.distribution.map((item) => [
          item.type.toUpperCase(),
          formatNumber(item.count),
          item.sizeFormatted,
          `${item.percentage.toFixed(2)}%`,
        ]),
      );
    },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildInfrastructureHealthReportBlob(
  data: InfrastructureHealthResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Saúde da Infraestrutura',
      subtitle: `Uptime: ${data.system.uptime.formatted} • Memória: ${data.resources.memory.usagePercent.toFixed(1)}%`,
      generatedBy,
      period: { start: new Date(), end: new Date() },
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Recurso', 'Valor'],
        [
          ['Plataforma', `${data.system.platform} (${data.system.arch})`],
          ['Node.js', data.system.nodeVersion],
          ['Uptime', data.system.uptime.formatted],
          ['CPU', `${data.resources.cpu.count} cores`],
          ['Memória Total', data.resources.memory.totalFormatted],
          ['Memória Usada', `${data.resources.memory.usedFormatted} (${data.resources.memory.usagePercent.toFixed(1)}%)`],
          ['Banco de Dados', data.services.database.status],
          ['API', data.services.api.status],
        ],
      );
    },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildSystemMaintenanceReportBlob(
  data: SystemMaintenanceResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Manutenção do Sistema',
      subtitle: `Score de Saúde: ${data.healthScore}%`,
      generatedBy,
      period: { start: new Date(), end: new Date() },
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Tarefa', 'Status', 'Recomendação'],
        data.checklist.map((item) => [
          item.task,
          item.status,
          item.recommendation,
        ]),
      );
    },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildSecurityAuditReportBlob(
  data: SecurityAuditResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Auditoria de Segurança',
      subtitle: `${data.summary.successfulLogins} logins bem-sucedidos • Taxa de sucesso: ${data.summary.loginSuccessRate.toFixed(1)}%`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Métrica', 'Valor'],
        [
          ['Logins Bem-Sucedidos', formatNumber(data.summary.successfulLogins)],
          ['Logins Falhados', formatNumber(data.summary.failedLogins)],
          ['Taxa de Sucesso', `${data.summary.loginSuccessRate.toFixed(2)}%`],
          ['Mudanças de Permissões', formatNumber(data.summary.permissionChanges)],
          ['Usuários Criados', formatNumber(data.summary.usersCreated)],
          ['Usuários Desativados', formatNumber(data.summary.usersDeactivated)],
          ['Mudanças 2FA', formatNumber(data.summary.twoFactorChanges)],
          ['Acessos Fora do Horário', formatNumber(data.summary.afterHoursAccess)],
        ],
      );
    },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildApiPerformanceReportBlob(
  data: ApiPerformanceResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Performance de API',
      subtitle: `${formatNumber(data.summary.totalRequests)} requisições • ${data.summary.requestsPerMinute.toFixed(2)} req/min`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Endpoint', 'Requisições', 'Erros', 'Taxa de Erro'],
        data.topEndpoints.slice(0, 10).map((item) => [
          item.endpoint,
          formatNumber(item.requests),
          formatNumber(item.errors),
          `${item.errorRate.toFixed(2)}%`,
        ]),
      );
    },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function buildComplianceLgpdReportBlob(
  data: ComplianceLgpdResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Compliance LGPD',
      subtitle: `Score de Conformidade: ${data.complianceScore}%`,
      generatedBy,
      period: { start: new Date(), end: new Date() },
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['Aspecto', 'Status', 'Mensagem'],
        [
          ['Retenção de Dados', data.compliance.dataRetention.status, data.compliance.dataRetention.message],
          ['Consentimento', data.compliance.userConsent.status, data.compliance.userConsent.message],
          ['Acesso a Dados', data.compliance.dataAccess.status, data.compliance.dataAccess.message],
          ['Minimização', data.compliance.dataMinimization.status, data.compliance.dataMinimization.message],
        ],
      );
    },
  );
}

// Backup History Report
interface BackupHistoryResponse {
  period: ApiPeriod;
  generatedAt: string;
  summary: {
    totalBackups: number;
    successfulBackups: number;
    failedBackups: number;
    successRate: number;
    avgSize: number;
    avgDuration: number;
  };
  items: Array<{
    position: number;
    id: string;
    date: string;
    type: string;
    status: string;
    size: number;
    sizeFormatted: string;
    duration: number;
    durationFormatted: string;
    location: string;
    triggeredBy: string;
    errorMsg: string | null;
  }>;
}

async function buildBackupHistoryReportBlob(
  data: BackupHistoryResponse,
  generatedBy: string,
): Promise<Blob> {
  return generateSimpleReportBlob(
    {
      title: 'Relatório • Histórico de Backups',
      subtitle: `${data.summary.totalBackups} backups • Taxa de sucesso: ${data.summary.successRate.toFixed(1)}%`,
      generatedBy,
      period: parsePeriod(data.period),
    },
    (doc: jsPDF) => {
      addReportTable(
        doc,
        ['#', 'Data', 'Tipo', 'Status', 'Tamanho', 'Duração'],
        data.items.slice(0, 20).map((item) => [
          item.position.toString(),
          formatDateTime(item.date),
          item.type,
          item.status,
          item.sizeFormatted,
          item.durationFormatted,
        ]),
      );
    },
  );
}

function parsePeriod(period: ApiPeriod) {
  return {
    start: new Date(period.start),
    end: new Date(period.end),
  };
}

function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR');
}
