'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TwoFactorVerifyFormProps {
  tempToken?: string;
}

export default function TwoFactorVerifyForm({ tempToken }: TwoFactorVerifyFormProps) {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Referências dos inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focar o primeiro input ao montar a tela (foco programático)
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Obter token da URL se não vier por props
  const urlToken = searchParams?.get('tempToken') ?? tempToken ?? '';

  const handleInputChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    if (value.length > 1) value = value[0];

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text/plain');
    const numbers = pasted.replace(/\D/g, '').slice(0, 6);
    if (!numbers) return;

    const newCode = [...code];
    for (let i = 0; i < Math.min(numbers.length, 6); i++) newCode[i] = numbers[i];
    setCode(newCode);
    const nextIndex = Math.min(numbers.length, 5);
    inputRefs.current[nextIndex]?.focus();
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
      // Garantir que o código seja uma string de 6 dígitos
      const codeValue = Array.isArray(code) ? code.join('') : code;

      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempToken: urlToken, code: codeValue }),
      });
      const data = await response.json();

      if (response.ok) {
        toast({ title: 'Login realizado com sucesso', description: 'Bem-vindo ao painel administrativo!' });
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Código inválido. Tente novamente.');
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error('Erro ao verificar 2FA:', err);
      setError('Erro ao verificar código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white dark:bg-gray-900 backdrop-blur-sm">
      <CardHeader className="text-center pb-6 bg-gradient-to-br from-[#008C32] to-[#00DD4F] text-white rounded-t-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Shield className="h-7 w-7 text-white" />
        </div>
        <CardTitle className="text-lg font-bold mb-2">Digite o código do seu autenticador</CardTitle>
      </CardHeader>

      <CardContent className="px-8 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor={`otp-verify-0`} id="otp-verify-label" className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center block">Código de 6 dígitos</label>
            <div className="flex justify-center gap-2">
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
                  id={`otp-verify-${index}`}
                  aria-label={`Dígito ${index + 1} do código 2FA`}
                  aria-labelledby="otp-verify-label"
                  className="w-14 h-14 text-xl font-bold text-center border-2 border-gray-200 rounded-lg 
                           hover:border-[#00DD4F] hover:shadow-md transition-all duration-300 
                           focus:border-[#008C32] focus:ring-2 focus:ring-[#008C32]/20 focus:shadow-xl focus:outline-none
                           bg-gray-50 text-gray-800
                           dark:border-gray-600 dark:hover:border-[#00DD4F] dark:focus:border-[#008C32] 
                           dark:bg-gray-800 dark:text-white"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center justify-center space-x-2 text-red-700 bg-red-50 border border-red-200 p-3 rounded-xl">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#008C32] to-[#00DD4F] 
                     hover:from-[#006B27] hover:to-[#00BB42] text-white shadow-lg hover:shadow-xl 
                     transition-all duration-300 rounded-xl border-0"
            disabled={isLoading || code.join('').length !== 6}
          >
            {isLoading ? 'Verificando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            Abra seu <span className="font-semibold">aplicativo autenticador</span> e digite o código de 6 dígitos
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
