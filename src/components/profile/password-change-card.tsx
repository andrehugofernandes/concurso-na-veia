'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Lock, CheckCircle, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Schema para validação de senha forte
const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
        .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
        .regex(/[0-9]/, 'Deve conter pelo menos um número')
        .regex(/[^A-Za-z0-9]/, 'Deve conter pelo menos um caractere especial (!@#$%^&*)'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordChangeCardProps {
    onChangePassword: (current: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
}

export function PasswordChangeCard({ onChangePassword }: PasswordChangeCardProps) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: PasswordFormValues) => {
        setLoading(true);
        try {
            const result = await onChangePassword(data.currentPassword, data.newPassword);

            if (result.success) {
                toast({
                    title: "Senha atualizada!",
                    description: "Sua senha foi alterada com sucesso.",
                    variant: "default", // or success if available
                });
                form.reset();
            } else {
                toast({
                    title: "Erro ao atualizar",
                    description: result.error || "Ocorreu um erro ao tentar atualizar sua senha.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Erro inesperado",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const newPasswordValue = form.watch('newPassword');

    // Helpers para feedback visual da força da senha
    const hasMinLen = newPasswordValue?.length >= 8;
    const hasUpper = /[A-Z]/.test(newPasswordValue || '');
    const hasLower = /[a-z]/.test(newPasswordValue || '');
    const hasNumber = /[0-9]/.test(newPasswordValue || '');
    const hasSpecial = /[^A-Za-z0-9]/.test(newPasswordValue || '');

    return (
        <Card className="shadow-sm border-border bg-card">
            <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Alterar Senha</CardTitle>
                </div>
                <CardDescription>
                    Escolha uma senha forte para proteger sua conta.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha Atual</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nova Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar Nova Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Password Strength Indicator */}
                        {newPasswordValue && (
                            <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2 mt-2">
                                <p className="font-medium text-muted-foreground mb-2">Requisitos da senha:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div className={`flex items-center gap-2 ${hasMinLen ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                                        {hasMinLen ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-current" />}
                                        <span>Mínimo 8 caracteres</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${hasUpper ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                                        {hasUpper ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-current" />}
                                        <span>Letra maiúscula</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${hasLower ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                                        {hasLower ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-current" />}
                                        <span>Letra minúscula</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${hasNumber ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                                        {hasNumber ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-current" />}
                                        <span>Número</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${hasSpecial ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
                                        {hasSpecial ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-current" />}
                                        <span>Caractere especial</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-2">
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Atualizar Senha
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
