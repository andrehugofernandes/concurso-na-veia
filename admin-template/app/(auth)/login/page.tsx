'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layouts/auth-layout';
import LoginForm from '@/components/auth/LoginForm';
import TwoFactorVerifyForm from '@/components/auth/TwoFactorVerifyForm';
import TwoFactorSetupForm from '@/components/auth/TwoFactorSetupForm';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const { toast } = useToast();
  const [show2FA, setShow2FA] = useState(false);
  const [requires2FASetup, setRequires2FASetup] = useState(false);
  const [tempToken, setTempToken] = useState('');

  const handleLoginSuccess = async (_userId: string, tempToken: string) => {
    if (!tempToken) {
      toast({
        title: "Erro na autenticação",
        description: "Erro ao processar autenticação. Tente novamente.",
        variant: "destructive",
        className: "z-[9999] bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      });
      return;
    }
    
    console.log('[LoginPage] Token temporário recebido:', { tempToken: tempToken.substring(0, 10) + '...' });
    
    // 2FA é obrigatório, sempre verificar status
    try {
      const response = await fetch('/api/auth/2fa/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tempToken: tempToken,
        }),
      });

      const data = await response.json();
      console.log('[LoginPage] Resposta do status 2FA:', data);

      if (response.ok) {
        setTempToken(tempToken);
        setRequires2FASetup(data.requiresSetup);
        setShow2FA(true);
      } else {
        toast({
          title: "Erro ao verificar 2FA",
          description: data.error || 'Não foi possível verificar configuração de 2FA. Tente novamente.',
          variant: "destructive",
          className: "z-[9999] bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
        });
      }
    } catch (err) {
      console.error('Erro ao verificar status 2FA:', err);
      toast({
        title: "Erro de conexão",
        description: "Erro ao conectar com servidor. Verifique sua conexão e tente novamente.",
        variant: "destructive",
        className: "z-[9999] bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      });
    }
  };

  const handleBackToLogin = () => {
    setShow2FA(false);
    setRequires2FASetup(false);
    setTempToken('');
  };

  // Se estiver em modo 2FA, mostrar o formulário apropriado
  if (show2FA) {
    return (
      <AuthLayout 
        title={requires2FASetup ? "Configurar Autenticação em 2FA" : "Verificação em 2FA"}
        subtitle={requires2FASetup 
          ? "Proteja sua conta com autenticação em dois fatores" 
          : "Digite o código do seu aplicativo autenticador"
        }
      >
        <div className="mb-6">
          <button
            onClick={handleBackToLogin}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o login</span>
          </button>
        </div>

        {requires2FASetup ? (
          <TwoFactorSetupForm tempToken={tempToken} />
        ) : (
          <TwoFactorVerifyForm tempToken={tempToken} />
        )}
      </AuthLayout>
    );
  }

  // Mostrar formulário de login normal
  return (
    <AuthLayout 
      title="Acesso à Área Administrativa"
      subtitle="Entre com suas credenciais. Autenticação em dois fatores é obrigatória."
    >
      <LoginForm onSuccess={handleLoginSuccess} />

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
            Manter Conectado
          </Label>
        </div>
        <Link 
          href="/recuperar-senha" 
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Recuperar Senha
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </AuthLayout>
  );
}
