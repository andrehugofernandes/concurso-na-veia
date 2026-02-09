'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

function calcularNivel(xp: number): string {
    if (xp >= 5000) return 'Diretor';
    if (xp >= 3000) return 'Gerente';
    if (xp >= 1500) return 'Supervisor';
    if (xp >= 500) return 'Operador Sênior';
    if (xp >= 100) return 'Operador';
    return 'Estagiário';
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userData, setUserData] = useState({
        nome: 'Usuário',
        xp: 0,
        avatar_url: '',
    });
    const supabase = createClient();

    useEffect(() => {
        const loadUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('nome, xp, avatar_url')
                    .eq('id', user.id)
                    .single();

                // Get name from profile, then metadata, then fallback
                const displayName = profile?.nome ||
                    user.user_metadata?.full_name ||
                    user.user_metadata?.username ||
                    user.email?.split('@')[0] ||
                    'Usuário';

                setUserData({
                    nome: displayName,
                    xp: profile?.xp || 0,
                    avatar_url: profile?.avatar_url || '',
                });

                // Check mandatory 2FA
                const { data: factors } = await supabase.auth.mfa.listFactors();
                const hasVerifiedFactor = factors?.totp.some(f => f.status === 'verified');

                if (!hasVerifiedFactor) {
                    // Redirect to setup 2FA
                    window.location.href = '/auth/setup-2fa';
                }
            }
        };
        loadUser();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header Compartilhado */}
            <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition">
                            <span className="text-2xl">🛢️</span>
                            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                Petrobras Quest AI
                            </span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-white font-semibold">{userData.nome}</p>
                                <p className="text-sm text-yellow-400">{calcularNivel(userData.xp)}</p>
                            </div>
                            <div className="relative group">
                                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-slate-900 font-bold hover:scale-105 transition-transform overflow-hidden">
                                    {userData.avatar_url ? (
                                        <img src={userData.avatar_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        userData.nome.charAt(0).toUpperCase()
                                    )}
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-2">
                                        <Link href="/dashboard/settings/profile" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Meu Perfil
                                        </Link>
                                        <Link href="/dashboard/settings/security" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-slate-700 hover:text-white transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Segurança
                                        </Link>
                                        <div className="border-t border-slate-700 my-2" />
                                        <button
                                            onClick={async () => {
                                                await fetch('/api/auth/logout', { method: 'POST' });
                                                window.location.href = '/login';
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteúdo da Página (children) */}
            <main>
                {children}
            </main>
        </div>
    );
}
