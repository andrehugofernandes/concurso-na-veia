'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

 

// Esquema de validação
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Nome de usuário é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: (userId: string, token: string) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      // Usar o hook de autenticação para fazer login
      const result = await login(data.username, data.password);

      // Verificar se o login requer 2FA
      if (result.requires2FA) {
        // Se requer 2FA, passar o tempToken para a página de login
        const tempToken = (result as { tempToken: string }).tempToken;
        onSuccess('', tempToken); // userId não é mais retornado pelo backend
      } else if (result.success) {
        // Login sem 2FA bem-sucedido
        toast({
          title: "Login realizado",
          description: result.message || "Bem-vindo ao sistema!",
          variant: "default",
        });
        onSuccess('', '');
      } else {
        // Erro no login
        toast({
          title: "Erro no login",
          description: result.message || "Credenciais inválidas",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast({
        title: "Erro inesperado",
        description: error instanceof Error ? error.message : 'Erro ao processar login',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nome de usuário
        </label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Seu nome de usuário"
          disabled={isLoading}
        />
        {errors.username && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Senha
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="Sua senha"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                     text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </form>
  );
}
