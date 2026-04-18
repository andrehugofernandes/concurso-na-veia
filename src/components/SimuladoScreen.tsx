'use client';

import { Simulado, Usuario, Questao } from '@/lib/types';
import { formatarTempo, cn } from '@/lib/utils';
import { AnimatedBorder } from '@/components/ui/animated-border';

interface Props {
    simulado: Simulado;
    questaoAtual: number;
    respostaSelecionada: number | null;
    mostrarResultado: boolean;
    cronometro: number;
    tempoLimite?: number | null; // Para timer regressivo
    usuario: Usuario;
    responderQuestao: (indice: number) => void;
    confirmarResposta: () => void;
    proximaQuestao: () => void;
    voltarHome: () => void;
}

export default function SimuladoScreen({
    simulado,
    questaoAtual,
    respostaSelecionada,
    mostrarResultado,
    cronometro,
    tempoLimite,
    usuario,
    responderQuestao,
    confirmarResposta,
    proximaQuestao,
    voltarHome,
}: Props) {
    const questao = simulado.questoes[questaoAtual];
    const progresso = ((questaoAtual + 1) / simulado.questoes.length) * 100;

    // Timer crítico: menos de 15 minutos
    const tempoCritico = tempoLimite && cronometro < 15 * 60;

    const getAlternativaLetra = (index: number): string => {
        return String.fromCharCode(65 + index);
    };

    const getAlternativaClasse = (index: number): string => {
        const baseClasse = 'w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-start gap-4';

        if (mostrarResultado) {
            if (index === questao.correta) {
                return cn(
                    baseClasse,
                    "border-green-500 bg-green-500/10 dark:bg-green-500/20 text-green-700 dark:text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                );
            }
            if (respostaSelecionada === index && index !== questao.correta) {
                return cn(
                    baseClasse,
                    "border-red-500 bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                );
            }
            return cn(
                baseClasse,
                "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-400 dark:text-zinc-500 opacity-60"
            );
        }

        if (respostaSelecionada === index) {
            return cn(
                baseClasse,
                "border-primary bg-primary/5 dark:bg-primary/20 text-primary dark:text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] scale-[1.01]"
            );
        }

        return cn(
            baseClasse,
            "border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300",
            "hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer shadow-sm hover:shadow-md"
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 max-w-5xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={voltarHome}
                                className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95 text-zinc-500"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-xl font-black uppercase tracking-tight text-foreground">
                                    Simulado: {simulado.tipo}
                                </h1>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Questão <span className="text-primary">{questaoAtual + 1}</span> de {simulado.questoes.length}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className={cn(
                                    "text-2xl font-black tracking-tighter",
                                    tempoCritico ? 'text-red-500 animate-pulse' : 'text-primary'
                                )}>
                                    {formatarTempo(cronometro)}
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">
                                    {tempoLimite ? 'Tempo Restante' : 'Tempo de Prova'}
                                </p>
                            </div>
                            <div className="h-10 w-px bg-border hidden sm:block" />
                            <div className="text-right hidden sm:block">
                                <p className="text-2xl font-black tracking-tighter text-yellow-500">{usuario.xp}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">XP Total</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-5 h-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-700 ease-out"
                            style={{ width: `${progresso}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* Question Content */}
            <main className="container mx-auto px-4 py-10 max-w-4xl">
                {/* Question Card */}
                <div className="relative group">
                    <div className="bg-white dark:bg-card backdrop-blur-lg rounded-3xl p-8 border border-zinc-200 dark:border-white/5 mb-8 shadow-2xl shadow-zinc-200/50 dark:shadow-none overflow-hidden">
                        <AnimatedBorder borderRadius="rounded-3xl" />

                        {/* Question Header */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                                {questao.materia}
                            </span>
                            {questao.assunto && (
                                <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-wider">
                                    {questao.assunto}
                                </span>
                            )}
                            <span className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider",
                                questao.dificuldade === 'Fácil' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                                    questao.dificuldade === 'Média' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                                        'bg-red-500/10 text-red-600 dark:text-red-400'
                            )}>
                                {questao.dificuldade}
                            </span>
                            {questao.geradaPorIA && (
                                <span className="px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="text-[10px]">🤖</span> AI Powered
                                </span>
                            )}
                        </div>

                        {/* Question Text */}
                        <div
                            className="text-xl md:text-2xl font-bold text-foreground mb-10 leading-relaxed tracking-tight"
                            dangerouslySetInnerHTML={{ __html: questao.enunciado }}
                        />

                        {/* Alternatives */}
                        <div className="space-y-4">
                            {questao.alternativas.map((alternativa, index) => (
                                <button
                                    key={index}
                                    onClick={() => !mostrarResultado && responderQuestao(index)}
                                    disabled={mostrarResultado}
                                    className={getAlternativaClasse(index)}
                                >
                                    <span className={cn(
                                        "w-10 h-10 rounded-2xl flex items-center justify-center text-base font-black shrink-0 transition-all",
                                        mostrarResultado && index === questao.correta ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' :
                                            mostrarResultado && respostaSelecionada === index ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' :
                                                respostaSelecionada === index ? 'bg-primary text-white shadow-xl shadow-primary/30' :
                                                    'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                    )}>
                                        {getAlternativaLetra(index)}
                                    </span>
                                    <span
                                        className="flex-1 pt-1.5 text-base md:text-lg font-medium leading-normal"
                                        dangerouslySetInnerHTML={{ __html: alternativa }}
                                    />
                                    {mostrarResultado && index === questao.correta && (
                                        <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center text-white shrink-0 animate-in zoom-in duration-300">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                    {mostrarResultado && respostaSelecionada === index && index !== questao.correta && (
                                        <div className="w-8 h-8 rounded-full bg-red-500 shadow-lg shadow-red-500/30 flex items-center justify-center text-white shrink-0 animate-in zoom-in duration-300">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Explanation (when answered) */}
                {mostrarResultado && (
                    <div className="bg-primary/5 dark:bg-primary/10 backdrop-blur-xl rounded-[32px] p-8 border-2 border-primary/20 mb-8 animate-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-black text-primary mb-5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Explicação
                        </h3>
                        <div
                            className="text-muted-foreground leading-relaxed text-lg"
                            dangerouslySetInnerHTML={{ __html: questao.explicacao }}
                        />
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                    {!mostrarResultado ? (
                        <button
                            onClick={confirmarResposta}
                            disabled={respostaSelecionada === null}
                            className={cn(
                                "flex-1 py-5 text-lg font-black uppercase tracking-widest rounded-[24px] shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                                "bg-primary text-white dark:text-zinc-900 shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1"
                            )}
                        >
                            Confirmar Resposta
                        </button>
                    ) : (
                        <button
                            onClick={proximaQuestao}
                            className="flex-1 py-5 bg-primary text-primary-foreground text-lg font-black uppercase tracking-widest rounded-[24px] shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95"
                        >
                            {questaoAtual < simulado.questoes.length - 1 ? 'Próxima Questão →' : 'Ver Resultado 🎉'}
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}
