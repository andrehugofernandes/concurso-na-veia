'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import QRCode from 'qrcode';
import { createClient } from '@/lib/supabase/client';

export default function Setup2FAPage() {
    const [loading, setLoading] = useState(true);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [secret, setSecret] = useState('');

    // OTP State
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [factorId, setFactorId] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const initSetup = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.push('/login');
                    return;
                }

                // Check existing factors
                const { data: factors } = await supabase.auth.mfa.listFactors();
                if (!factors) return;

                const verifiedFactor = factors.totp.find(f => f.status === 'verified');
                if (verifiedFactor) {
                    router.push('/dashboard');
                    return;
                }

                // Cleanup unverified factors to prevent "already exists" error
                const unverifiedFactors = factors.totp.filter(f => f.status === 'unverified');
                for (const factor of unverifiedFactors) {
                    await supabase.auth.mfa.unenroll({ factorId: factor.id });
                }

                // Start enrollment
                const { data, error } = await supabase.auth.mfa.enroll({
                    factorType: 'totp',
                    friendlyName: `Petrobras Quest (${new Date().toLocaleTimeString()})`,
                });

                if (error) throw error;

                setFactorId(data.id);
                setSecret(data.totp.secret);

                const qrUrl = await QRCode.toDataURL(data.totp.uri);
                setQrCodeUrl(qrUrl);
            } catch (err: any) {
                console.error('Error setup 2FA:', err);
                setError(err.message || 'Erro ao iniciar configuração do 2FA');
            } finally {
                setLoading(false);
            }
        };

        initSetup();
    }, [router, supabase]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        if (value.length > 1) {
            const pastedData = value.slice(0, 6).split('');
            for (let i = 0; i < 6; i++) {
                newOtp[i] = pastedData[i] || '';
            }
            setOtp(newOtp);
            inputRefs.current[5]?.focus();
        } else {
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '').split('');
        const newOtp = [...otp];
        pastedData.forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const verifyAndActivate = async () => {
        setError('');
        const code = otp.join('');
        try {
            const { data, error } = await supabase.auth.mfa.challengeAndVerify({
                factorId,
                code,
            });

            if (error) throw error;

            // Success! Redirect to dashboard
            router.push('/dashboard');
        } catch (err: any) {
            setError('Código inválido. Tente novamente.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 shadow-2xl w-full max-w-lg">
                <div className="text-center mb-8">
                    <span className="text-4xl block mb-2">🛡️</span>
                    <h1 className="text-2xl font-bold text-white">Configuração Obrigatória de 2FA</h1>
                    <p className="text-gray-300 mt-2">
                        Para a segurança da sua conta, é necessário ativar a Autenticação de Dois Fatores.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-center text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4 text-center">1. Escaneie o QR Code</h3>
                        <div className="flex justify-center bg-white p-4 rounded-xl w-fit mx-auto mb-4">
                            {qrCodeUrl && <Image src={qrCodeUrl} alt="QR Code 2FA" width={200} height={200} />}
                        </div>
                        <p className="text-center text-xs text-gray-500 font-mono break-all">
                            Segredo: {secret}
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-lg font-bold text-white mb-4 text-center">2. Digite o código</h3>
                        <div className="flex gap-2 justify-center">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => { inputRefs.current[index] = el }}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    maxLength={6}
                                    className="w-12 h-14 bg-slate-800 border border-slate-600 rounded-lg text-white text-center text-2xl font-bold focus:outline-none focus:border-yellow-500 transition"
                                />
                            ))}
                        </div>
                        <button
                            onClick={verifyAndActivate}
                            disabled={otp.join('').length !== 6}
                            className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Verificar e Ativar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
