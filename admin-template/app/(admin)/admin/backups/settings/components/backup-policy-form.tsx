"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Loader2,
  Save,
  CalendarDays,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomSwitch } from "@/components/ui/custom-switch";
import { updateBackupPolicy } from "../actions";

// Schema de validação
const formSchema = z.object({
  isActive: z.boolean().default(true),
  frequency: z.enum(["hourly", "daily", "weekly", "monthly"]),
  hour: z.coerce.number().min(0).max(23),
  minute: z.coerce.number().min(0).max(59),
  dayOfWeek: z.coerce.number().min(0).max(6).optional(),
  dayOfMonth: z.coerce.number().min(1).max(31).optional(),
  retentionDays: z.coerce.number().min(1).max(365),
  maxBackups: z.coerce.number().min(1).max(1000),
  target: z.enum(["local", "firebase"]),
  notifyOnFailure: z.boolean().default(true),
});

type BackupPolicyFormValues = z.infer<typeof formSchema>;

type BackupPolicyUI = {
  isActive: boolean;
  frequency: "hourly" | "daily" | "weekly" | "monthly";
  hour: number;
  minute: number;
  dayOfWeek?: number | null;
  dayOfMonth?: number | null;
  retentionDays: number;
  maxBackups: number;
  target: "local" | "firebase";
  notifyOnFailure: boolean;
};

interface BackupPolicyFormProps {
  initialData: BackupPolicyUI | null;
}

export function BackupPolicyForm({ initialData }: BackupPolicyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<BackupPolicyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: initialData?.isActive ?? true,
      frequency: initialData?.frequency ?? "daily",
      hour: initialData?.hour ?? 2,
      minute: initialData?.minute ?? 0,
      dayOfWeek: (initialData?.dayOfWeek ?? undefined) as number | undefined,
      dayOfMonth: (initialData?.dayOfMonth ?? undefined) as number | undefined,
      retentionDays: initialData?.retentionDays ?? 30,
      maxBackups: initialData?.maxBackups ?? 30,
      target: initialData?.target ?? "local",
      notifyOnFailure: initialData?.notifyOnFailure ?? true,
    },
  });

  const frequency = form.watch("frequency");
  const isActive = form.watch("isActive");

  const onSubmit = async (data: BackupPolicyFormValues) => {
    try {
      setLoading(true);

      // Se for semanal, garantir que tem dia da semana
      if (data.frequency === "weekly" && data.dayOfWeek === undefined) {
        data.dayOfWeek = 0; // Domingo
      }

      // Se for mensal, garantir que tem dia do mês
      if (data.frequency === "monthly" && data.dayOfMonth === undefined) {
        data.dayOfMonth = 1; // Primeiro dia do mês
      }

      const result = await updateBackupPolicy({
        ...data,
        // Garantir que os valores opcionais sejam nulos quando não aplicáveis
        dayOfWeek: data.frequency === "weekly" ? data.dayOfWeek ?? null : null,
        dayOfMonth:
          data.frequency === "monthly" ? data.dayOfMonth ?? null : null,
      });

      if (result?.data?.success) {
        toast({
          title: "Configurações salvas com sucesso!",
          description: "As mudanças foram aplicadas.",
        });
        router.refresh();
      } else {
        const message =
          result?.error?.message || "Erro ao salvar configurações";
        toast({
          title: "Erro",
          description: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar as configurações",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  // Função para obter o próximo agendamento
  const getNextSchedule = () => {
    const now = new Date();
    const hour = form.getValues("hour");
    const minute = form.getValues("minute");

    const nextDate = new Date(now);
    nextDate.setHours(hour, minute, 0, 0);

    if (now > nextDate) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return nextDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <Card className="overflow-hidden shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-primary/5 to-background p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Configurações de Backup
                </h1>
                <p className="text-muted-foreground">
                  Gerencie as configurações de backup automático do sistema
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Seção de Ativação */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900/50">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {isActive ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <h3 className="text-lg font-medium">Backup Automático</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isActive
                      ? "Os backups estão programados para execução automática."
                      : "Ative para habilitar os backups automáticos do sistema."}
                  </p>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center space-x-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>Próximo backup: {getNextSchedule()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-foreground">
                            {field.value ? "Ativado" : "Desativado"}
                          </span>
                          <CustomSwitch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-label={
                              field.value
                                ? "Desativar backup automático"
                                : "Ativar backup automático"
                            }
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {isActive && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequência</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                          <SelectItem value="hourly">A cada hora</SelectItem>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Com que frequência o backup deve ser executado
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {frequency === "weekly" && (
                  <FormField
                    control={form.control}
                    name="dayOfWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dia da Semana</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                              <SelectValue placeholder="Selecione o dia" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                            <SelectItem value="0">Domingo</SelectItem>
                            <SelectItem value="1">Segunda-feira</SelectItem>
                            <SelectItem value="2">Terça-feira</SelectItem>
                            <SelectItem value="3">Quarta-feira</SelectItem>
                            <SelectItem value="4">Quinta-feira</SelectItem>
                            <SelectItem value="5">Sexta-feira</SelectItem>
                            <SelectItem value="6">Sábado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {frequency === "monthly" && (
                  <FormField
                    control={form.control}
                    name="dayOfMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dia do Mês</FormLabel>
                        <Input type="number" min="1" max="31" {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora</FormLabel>
                      <Input type="number" min="0" max="23" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minuto</FormLabel>
                      <Input type="number" min="0" max="59" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna 1: Política de Retenção */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Política de Retenção</CardTitle>
                <CardDescription>
                  Configure por quanto tempo os backups devem ser mantidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="retentionDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dias de Retenção</FormLabel>
                        <Input type="number" min="1" max="365" {...field} />
                        <FormDescription>
                          Número de dias para manter cada backup
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxBackups"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Máximo de Backups</FormLabel>
                        <Input type="number" min="1" max="1000" {...field} />
                        <FormDescription>
                          Número máximo de backups a manter (os mais antigos
                          serão removidos)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Coluna 2: Configurações Avançadas */}
            <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>
                  Configurações adicionais do sistema de backup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destino do Backup</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                            <SelectValue placeholder="Selecione o destino" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                          <SelectItem value="local">
                            Armazenamento Local
                          </SelectItem>
                          <SelectItem value="firebase">
                            Firebase Storage
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notifyOnFailure"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Notificar Falhas
                        </FormLabel>
                        <FormDescription>
                          Receber notificações quando um backup falhar
                        </FormDescription>
                      </div>
                      <FormControl>
                        <CustomSwitch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="gap-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white dark:bg-[var(--primary)] dark:hover:bg-[var(--primary)]/90 dark:text-white font-medium shadow-md"
              aria-label="Salvar configurações de backup"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
