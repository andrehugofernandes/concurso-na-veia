'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Usuario, HistoricoSimulado } from '@/lib/types';
import { format, differenceInDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function HistoricoPage() {
    const [user, setUser] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (error) {
                console.error('Error loading user:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <p>Erro ao carregar usuário.</p>
            </div>
        );
    }

    const isFree = user.plan === 'free';
    const agora = new Date();

    // Sort history by date (newest first)
    const historicoOrdenado = [...(user.historico || [])].sort((a, b) =>
        new Date(b.data).getTime() - new Date(a.data).getTime()
    );

    return (
        <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">📜 Histórico de Simulados</h1>
                        <p className="text-gray-400">Acompanhe sua evolução e revise seus resultados.</p>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                    >
                        Voltar
                    </Link>
                </header>

                {isFree && (
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-start gap-4">
                        <div className="text-2xl">⚠️</div>
                        <div>
                            <h3 className="font-bold text-yellow-500">Atenção: Plano Gratuito</h3>
                            <p className="text-sm text-gray-300">
                                No plano gratuito, o histórico detalhado fica disponível apenas por <span className="text-white font-bold">3 dias</span>.
                                Faça upgrade para manter seu registro vitalício.
                            </p>
                            <Link href="/pricing" className="text-yellow-400 text-sm font-semibold hover:underline mt-1 inline-block">
                                Fazer Upgrade Agora →
                            </Link>
                        </div>
                    </div>
                )}

                {historicoOrdenado.length === 0 ? (
                    <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-gray-300 mb-2">Sem histórico ainda</h3>
                        <p className="text-gray-500 mb-6">Realize seu primeiro simulado para começar a rastrear seu progresso.</p>
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition"
                        >
                            Ir para o Dashboard
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {historicoOrdenado.map((item, index) => {
                            const dataSimulado = parseISO(item.data);
                            const diasPassados = differenceInDays(agora, dataSimulado);
                            const expirado = isFree && diasPassados > 3;

                            return (
                                <div
                                    key={index}
                                    className={`relative bg-slate-800/50 backdrop-blur border ${expirado ? 'border-red-500/30 opacity-75' : 'border-slate-700/50'} rounded-xl p-6 transition-all hover:border-slate-600`}
                                >
                                    <div className="flex justify-between items-center flex-wrap gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold
                                                ${item.percentual >= 80 ? 'bg-green-500/20 text-green-400' :
                                                    item.percentual >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'}`
                                            }>
                                                {item.percentual}%
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg capitalize">{item.tipo}</h3>
                                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                                    📅 {format(dataSimulado, "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                                                    {expirado && <span className="text-red-400 font-bold text-xs bg-red-500/10 px-2 py-0.5 rounded-full">EXPIRADO</span>}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Acertos</p>
                                                <p className="font-mono font-bold">{item.acertos}/{item.total}</p>
                                            </div>

                                            {expirado ? (
                                                <div className="flex flex-col items-center">
                                                    <span className="text-2xl mb-1">🔒</span>
                                                    <span className="text-xs text-gray-500">Detalhes Bloqueados</span>
                                                </div>
                                            ) : (
                                                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-semibold transition">
                                                    Ver Detalhes
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Blur Overlay for Expired Items (Optional visual effect) */}
                                    {expirado && (
                                        <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] rounded-xl pointer-events-none" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
