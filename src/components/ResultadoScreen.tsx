import { Simulado, Usuario, TipoSimulado } from '@/lib/types';
import { formatarTempo, cn } from '@/lib/utils';
import { AnimatedBorder } from '@/components/ui/animated-border';

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
        if (percentual >= 90) return { emoji: '🏆', texto: 'EXCELENTE! Você está pronto!', cor: 'text-yellow-500' };
        if (percentual >= 70) return { emoji: '🎯', texto: 'Muito bom! Continue assim!', cor: 'text-green-500' };
        if (percentual >= 50) return { emoji: '💪', texto: 'Bom trabalho! Pratique mais!', cor: 'text-blue-500' };
        return { emoji: '📚', texto: 'Continue estudando!', cor: 'text-purple-500' };
    };

    const mensagem = getMensagem();

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Result Card */}
            <div className="relative group">
                <div className="bg-white dark:bg-card backdrop-blur-lg rounded-[40px] p-6 md:p-10 border border-zinc-200 dark:border-white/5 text-center shadow-[0_40px_100px_-15px_rgba(0,0,0,0.12)] dark:shadow-none overflow-hidden text-zinc-900 dark:text-zinc-50">
                    <AnimatedBorder borderRadius="rounded-[40px]" />

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-2 flex items-center justify-center gap-3">
                            <span className="text-4xl animate-bounce">{mensagem.emoji}</span>
                            Simulado Concluído!
                        </h1>
                        <p className={cn("text-lg md:text-xl font-bold tracking-tight", mensagem.cor)}>
                            {mensagem.texto}
                        </p>
                    </div>

                    {/* Main Content: Horizontal on Desktop */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-8 px-4">
                        {/* Score Circle */}
                        <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="42%"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-zinc-100 dark:text-zinc-800"
                                />
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="42%"
                                    stroke="url(#gradient-score)"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray="264"
                                    strokeDashoffset={264 - (percentual / 100) * 264}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 ease-out"
                                />
                                <defs>
                                    <linearGradient id="gradient-score" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#facc15" />
                                        <stop offset="100%" stopColor="#f97316" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl md:text-5xl font-black tracking-tighter">{percentual}%</span>
                                <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest opacity-60">de acerto</span>
                            </div>
                        </div>

                        {/* Stats & XP */}
                        <div className="flex-1 space-y-6 w-full max-w-md">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-green-500/10 dark:bg-green-500/20 rounded-2xl p-4 border border-green-500/10">
                                    <p className="text-2xl font-black text-green-600 dark:text-green-400 tracking-tighter">{totalAcertos}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-green-600/70 dark:text-green-400/70">Acertos</p>
                                </div>
                                <div className="bg-red-500/10 dark:bg-red-500/20 rounded-2xl p-4 border border-red-500/10">
                                    <p className="text-2xl font-black text-red-600 dark:text-red-400 tracking-tighter">{totalErros}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-600/70 dark:text-red-400/70">Erros</p>
                                </div>
                                <div className="bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl p-4 border border-blue-500/10">
                                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">{formatarTempo(cronometro)}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600/70 dark:text-blue-400/70">Tempo</p>
                                </div>
                            </div>

                            {/* XP Earned Box */}
                            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[24px] p-5 border border-zinc-200 dark:border-white/5 flex items-center justify-between gap-4 shadow-inner">
                                <div className="flex items-center gap-4 text-left">
                                    <div className="w-14 h-14 rounded-xl bg-yellow-400/20 flex items-center justify-center text-2xl animate-pulse">
                                        ⭐
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black tracking-tighter leading-tight">
                                            +{200 + (percentual >= 90 ? 100 : percentual >= 80 ? 50 : 0)} XP
                                        </p>
                                        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                                            XP Total: <span className="text-primary font-black ml-1">{usuario.xp}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right border-l border-zinc-200 dark:border-white/10 pl-5">
                                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Nível</p>
                                    <p className="text-lg font-black text-primary uppercase leading-tight">{usuario.nivel}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto px-4">
                        <button
                            onClick={voltarHome}
                            className="w-full py-5 border-2 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-black uppercase tracking-widest rounded-[24px] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-3 bg-white dark:bg-transparent shadow-sm"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Início
                        </button>
                        <button
                            onClick={() => iniciarSimulado(simulado.tipo as TipoSimulado, 5)}
                            className="w-full py-5 bg-[var(--primary,#0037C1)] text-white font-black uppercase tracking-widest rounded-[24px] shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 border-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Novo Simulado
                        </button>
                    </div>
                </div>
            </div>

            {/* Question Review Summary */}
            <div className="bg-white dark:bg-card/50 backdrop-blur-lg rounded-[32px] p-6 border border-zinc-200 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground mb-4 flex items-center justify-between relative z-10 font-bebas text-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl shadow-inner">
                            📊
                        </div>
                        Resumo
                    </div>
                    <span className="text-muted-foreground text-sm font-bold uppercase tracking-[0.2em] font-sans">{totalAcertos}/{totalQuestoes} <span className="text-primary opacity-60 ml-1">Acertos</span></span>
                </h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 relative z-10">
                    {simulado.respostas.map((resposta, index) => (
                        <div
                            key={index}
                            className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 transition-all shadow-sm",
                                resposta?.correta
                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                                    : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                            )}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
