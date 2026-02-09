'use client';

import { Simulado, Usuario, TipoSimulado } from '@/lib/types';
import { formatarTempo } from '@/lib/utils';

interface Props {
    simulado: Simulado;
    cronometro: number;
    usuario: Usuario;
    voltarHome: () => void;
    iniciarSimulado: (tipo: string, quantidade: number) => void;
}

export default function ResultadoScreen({
    simulado,
    cronometro,
    usuario,
    voltarHome,
    iniciarSimulado,
}: Props) {
    const totalAcertos = simulado.respostas.filter(r => r && r.correta).length;
    const totalErros = simulado.respostas.filter(r => r && !r.correta).length;
    const totalQuestoes = simulado.questoes.length;
    const percentual = Math.round((totalAcertos / totalQuestoes) * 100);

    const getMensagem = () => {
        if (percentual >= 90) return { emoji: '🏆', texto: 'EXCELENTE! Você está pronto!', cor: 'text-yellow-400' };
        if (percentual >= 70) return { emoji: '🎯', texto: 'Muito bom! Continue assim!', cor: 'text-green-400' };
        if (percentual >= 50) return { emoji: '💪', texto: 'Bom trabalho! Pratique mais!', cor: 'text-blue-400' };
        return { emoji: '📚', texto: 'Continue estudando!', cor: 'text-purple-400' };
    };

    const mensagem = getMensagem();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Result Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50 text-center">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="text-6xl mb-4">{mensagem.emoji}</div>
                        <h1 className="text-3xl font-bold text-white mb-2">Simulado Concluído!</h1>
                        <p className={`text-xl font-semibold ${mensagem.cor}`}>{mensagem.texto}</p>
                    </div>

                    {/* Score Circle */}
                    <div className="relative w-48 h-48 mx-auto mb-8">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-slate-700"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={`${(percentual / 100) * 553} 553`}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#facc15" />
                                    <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-white">{percentual}%</span>
                            <span className="text-gray-400 text-sm">de acerto</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-green-500/20 rounded-xl p-4">
                            <p className="text-3xl font-bold text-green-400">{totalAcertos}</p>
                            <p className="text-sm text-green-300">Acertos</p>
                        </div>
                        <div className="bg-red-500/20 rounded-xl p-4">
                            <p className="text-3xl font-bold text-red-400">{totalErros}</p>
                            <p className="text-sm text-red-300">Erros</p>
                        </div>
                        <div className="bg-blue-500/20 rounded-xl p-4">
                            <p className="text-3xl font-bold text-blue-400">{formatarTempo(cronometro)}</p>
                            <p className="text-sm text-blue-300">Tempo</p>
                        </div>
                    </div>

                    {/* XP Earned */}
                    <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-6 mb-8 border border-purple-500/30">
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-4xl">⭐</span>
                            <div className="text-left">
                                <p className="text-2xl font-bold text-white">+{200 + (percentual >= 90 ? 100 : percentual >= 80 ? 50 : 0)} XP</p>
                                <p className="text-purple-300 text-sm">XP Total: {usuario.xp}</p>
                            </div>
                        </div>
                    </div>

                    {/* User Level */}
                    <div className="bg-slate-700/50 rounded-xl p-4 mb-8">
                        <p className="text-gray-400 text-sm">Seu nível atual</p>
                        <p className="text-xl font-bold text-yellow-400">{usuario.nivel}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={voltarHome}
                            className="flex-1 py-4 border-2 border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-700/50 transition flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Voltar ao Início
                        </button>
                        <button
                            onClick={() => iniciarSimulado(simulado.tipo as TipoSimulado, 5)}
                            className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Novo Simulado
                        </button>
                    </div>
                </div>

                {/* Question Review Summary */}
                <div className="mt-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white mb-4">Resumo das Questões</h3>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {simulado.respostas.map((resposta, index) => (
                            <div
                                key={index}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${resposta?.correta
                                    ? 'bg-green-500/30 text-green-400 border border-green-500/50'
                                    : 'bg-red-500/30 text-red-400 border border-red-500/50'
                                    }`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
