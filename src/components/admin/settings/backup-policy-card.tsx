'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database, Download, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
// import { runBackupNow, downloadLatestBackup, updateBackupPolicy } from '@/app/(admin)/admin/backups/actions';

const cardStyle = "shadow-lg rounded-lg border-none overflow-hidden bg-white dark:bg-gray-800";

interface BackupPolicyCardProps {
    isSysadmin: boolean;
}

export function BackupPolicyCard({ isSysadmin }: BackupPolicyCardProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'manual'>('daily');
    const [retentionDays, setRetentionDays] = useState(30);
    const [isExecuting, setIsExecuting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Mock functions for now
    const runBackupNow = async (params: any) => ({ data: { success: true, message: 'Simulação: Backup executado com sucesso!' } });
    const downloadLatestBackup = async (params: any) => ({ data: { success: false, error: 'Simulação: Nenhum backup disponível.' } });
    const updateBackupPolicy = async (params: any) => ({ data: { success: true, message: 'Simulação: Política atualizada.' } });


    const handleExecuteBackup = async () => {
        // if (!isSysadmin) {
        //   toast({
        //     title: 'Ação restrita',
        //     description: 'Apenas SYSADMIN pode executar backups on-demand.',
        //     variant: 'destructive',
        //     className: 'z-[9999]',
        //   });
        //   return;
        // }

        setIsExecuting(true);
        try {
            const result = await runBackupNow({ type: 'full' });

            if (result?.data?.success) {
                toast({
                    title: 'Backup disparado',
                    description: result.data.message || 'Rotina executada com sucesso.',
                    className: 'z-[9999]',
                });
            } else {
                toast({
                    title: 'Erro ao executar backup',
                    description: result?.data?.error || 'Ocorreu um erro inesperado.',
                    variant: 'destructive',
                    className: 'z-[9999]',
                });
            }
        } catch {
            toast({
                title: 'Erro',
                description: 'Não foi possível executar o backup.',
                variant: 'destructive',
                className: 'z-[9999]',
            });
        } finally {
            setIsExecuting(false);
        }
    };

    const handleDownloadLatest = async () => {
        setIsDownloading(true);
        try {
            const result = await downloadLatestBackup({});

            // @ts-ignore
            if (result?.data?.success && result.data.data) {
                // @ts-ignore
                const backupData = result.data.data as { downloadUrl?: string };

                if (backupData.downloadUrl) {
                    toast({
                        title: 'Download iniciado',
                        description: result.data.message || 'Backup disponível para download.',
                        className: 'z-[9999]',
                    });

                    // Abrir URL assinada do Firebase em nova aba
                    window.open(backupData.downloadUrl, '_blank');
                } else {
                    toast({
                        title: 'Erro',
                        description: 'URL de download não disponível.',
                        variant: 'destructive',
                        className: 'z-[9999]',
                    });
                }
            } else {
                toast({
                    title: 'Erro ao baixar backup',
                    description: result?.data?.error || 'Ocorreu um erro inesperado.',
                    variant: 'destructive',
                    className: 'z-[9999]',
                });
            }
        } catch {
            toast({
                title: 'Erro',
                description: 'Não foi possível baixar o backup.',
                variant: 'destructive',
                className: 'z-[9999]',
            });
        } finally {
            setIsDownloading(false);
        }
    };

    const handleUpdatePolicy = async () => {
        // if (!isSysadmin) {
        //   toast({
        //     title: 'Ação restrita',
        //     description: 'Apenas SYSADMIN pode atualizar a política de backups.',
        //     variant: 'destructive',
        //     className: 'z-[9999]',
        //   });
        //   return;
        // }

        try {
            const result = await updateBackupPolicy({ frequency, retentionDays });

            if (result?.data?.success) {
                toast({
                    title: 'Política atualizada',
                    description: result.data.message || 'Configurações salvas com sucesso.',
                    className: 'z-[9999]',
                });
            } else {
                toast({
                    title: 'Erro ao atualizar política',
                    description: result?.data?.error || 'Ocorreu um erro inesperado.',
                    variant: 'destructive',
                    className: 'z-[9999]',
                });
            }
        } catch {
            toast({
                title: 'Erro',
                description: 'Não foi possível atualizar a política.',
                variant: 'destructive',
                className: 'z-[9999]',
            });
        }
    };

    return (
        <Card className={cardStyle}>
            <CardHeader className="flex flex-col gap-2 border-b border-gray-100 p-6 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-600" />
                    <CardTitle>Política de Backups</CardTitle>
                </div>
                <CardDescription>Rotinas automáticas e histórico de snapshots (resumo).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
                {/* Status resumido */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Último backup</p>
                        <p className="text-lg font-semibold">Hoje às 03:00</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Próximo agendado</p>
                        <p className="text-lg font-semibold">Amanhã às 03:00</p>
                    </div>
                </div>

                <Separator />

                {/* Controles básicos - 3 colunas */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="backupFrequency">Frequência</Label>
                        <Select
                            value={frequency}
                            onValueChange={(value) => setFrequency(value as 'daily' | 'weekly' | 'manual')}
                        // disabled={!isSysadmin}
                        >
                            <SelectTrigger
                                id="backupFrequency"
                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            >
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                                <SelectItem value="daily">Diário (03:00)</SelectItem>
                                <SelectItem value="weekly">Semanal (Domingo 03:00)</SelectItem>
                                <SelectItem value="manual">Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="backupRetention">Retenção (dias)</Label>
                        <Input
                            id="backupRetention"
                            type="number"
                            value={retentionDays}
                            onChange={(e) => setRetentionDays(parseInt(e.target.value) || 30)}
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                        // disabled={!isSysadmin}
                        />
                    </div>
                    {/* Botão salvar política - 3ª coluna */}
                    {/* {isSysadmin && ( */}
                    <div className="flex items-end">
                        <Button
                            variant="outline"
                            size="default"
                            className="w-full gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={handleUpdatePolicy}
                            aria-label="Salvar política de backups"
                        >
                            Salvar política
                        </Button>
                    </div>
                    {/* )} */}
                </div>

                <Separator />

                {/* Ações rápidas - Grid responsivo */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Button
                        variant="outline"
                        size="default"
                        className="gap-2 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium"
                        aria-label="Baixar último backup"
                        onClick={handleDownloadLatest}
                        disabled={isDownloading}
                    >
                        <Download className="h-4 w-4" />
                        {isDownloading ? 'Baixando...' : 'Baixar último'}
                    </Button>
                    <Button
                        variant="default"
                        size="default"
                        className="gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white dark:bg-[var(--primary)] dark:hover:bg-[var(--primary)]/90 font-medium shadow-md"
                        // disabled={!isSysadmin || isExecuting}
                        disabled={isExecuting}
                        aria-label="Executar backup agora"
                        onClick={handleExecuteBackup}
                    >
                        <RefreshCcw className={`h-4 w-4 ${isExecuting ? 'animate-spin' : ''}`} />
                        {isExecuting ? 'Executando...' : 'Executar agora'}
                    </Button>
                    <Button
                        variant="outline"
                        size="default"
                        className="gap-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-medium sm:col-span-2 lg:col-span-1"
                        onClick={() => router.push('/admin/backups')}
                        aria-label="Ver histórico completo"
                    >
                        Ver histórico completo →
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
