'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TwoFactorSetupFormProps {
  tempToken?: string;
}

export default function TwoFactorSetupForm({ tempToken }: TwoFactorSetupFormProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  // Referencias para os inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focar o primeiro input ao montar a tela (foco programático em vez de autoFocus)
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Obter token e userId da URL se não forem passados como props
  const urlToken = searchParams?.get('tempToken') ?? tempToken ?? '';

  // Buscar QR code e secret quando o componente montar
  useEffect(() => {
    const fetchSetupData = async () => {
      try {
        const response = await fetch('/api/auth/2fa/setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tempToken: urlToken,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setQrCodeUrl(data.qrCodeUrl);
        } else {
          setError(data.error || 'Erro ao gerar QR code');
        }
      } catch (err) {
        console.error('Erro ao buscar dados de setup 2FA:', err);
        setError('Erro ao gerar QR code. Tente novamente.');
      }
    };

    if (urlToken) {
      fetchSetupData();
    }
  }, [urlToken]);

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (index: number, value: string) => {
    // Só aceita números
    if (!/^[0-9]*$/.test(value)) return;
    
    // Limita a um caractere por input
    if (value.length > 1) {
      value = value[0];
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Move para o próximo input automaticamente
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Função para lidar com teclas especiais
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Se está vazio e pressiona backspace, vai para o anterior
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Função para lidar com paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const numbers = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (numbers.length > 0) {
      const newCode = [...code];
      for (let i = 0; i < Math.min(numbers.length, 6); i++) {
        newCode[i] = numbers[i];
      }
      setCode(newCode);
      
      // Foca no próximo input vazio ou no último
      const nextIndex = Math.min(numbers.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const codeString = code.join('');
    if (codeString.length !== 6) {
      setError('Por favor, digite o código de 6 dígitos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/enable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tempToken: urlToken,
          code: codeString,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "2FA ativado com sucesso",
          description: "Autenticação em dois fatores foi configurada em sua conta.",
        });
        
        // Redirecionar para o dashboard
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Código inválido. Tente novamente.');
        // Limpa o código e foca no primeiro input
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error('Erro ao ativar 2FA:', err);
      setError('Erro ao ativar 2FA. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!qrCodeUrl) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white dark:bg-gray-900 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#00BDFF] mx-auto mb-4"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00BDFF]/20 to-[#0037C1]/20 blur-sm"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Gerando QR code...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="text-center pb-6">        
        <CardTitle className="text-md font-bold text-gray-800 dark:text-white mb-2">
        Escaneie o QR code com seu aplicativo autenticador
        </CardTitle>
        
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="one-time-code">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100">
              {qrCodeUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code para 2FA" 
                  className="w-48 h-48"
                />
              )}
            </div>
          </div>

          {/* Inputs do código */}
          <div className="space-y-3">
            <label htmlFor={`otp-setup-0`} id="otp-setup-label" className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center block">
              Digite o código de 6 dígitos
            </label>
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  id={`otp-setup-${index}`}
                  aria-label={`Dígito ${index + 1} do código 2FA`}
                  aria-labelledby="otp-setup-label"
                  className="w-14 h-14 text-xl font-bold text-center border-[3px] border-gray-300 rounded-xl 
                           hover:border-blue-400 hover:shadow-md transition-all duração-200 
                           focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:shadow-lg focus:outline-none
                           dark:border-gray-600 dark:hover:border-blue-400 dark:focus:border-blue-400 
                           dark:bg-gray-800 dark:text-white"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-200" 
            disabled={isLoading || code.join('').length !== 6}
          >
            {isLoading ? 'Ativando 2FA...' : 'Ativar 2FA'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
