'use client';

import { Simulado, Usuario, Questao } from '@/lib/types';
import { formatarTempo } from '@/lib/utils';

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
        const baseClasse = 'w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-start gap-3';

        if (mostrarResultado) {
            if (index === questao.correta) {
                return `${baseClasse} border-green-500 bg-green-500/20 text-green-100`;
            }
            if (respostaSelecionada === index && index !== questao.correta) {
                return `${baseClasse} border-red-500 bg-red-500/20 text-red-100`;
            }
            return `${baseClasse} border-gray-600 bg-gray-800/50 text-gray-400`;
        }

        if (respostaSelecionada === index) {
            return `${baseClasse} border-purple-500 bg-purple-500/20 text-white`;
        }

        return `${baseClasse} border-gray-600 bg-gray-800/50 text-gray-200 hover:border-gray-500 hover:bg-gray-700/50 cursor-pointer`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="bg-slate-800/80 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={voltarHome}
                                className="p-2 rounded-lg hover:bg-slate-700 transition"
                            >
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-white">Simulado {simulado.tipo}</h1>
                                <p className="text-sm text-gray-400">Questão {questaoAtual + 1} de {simulado.questoes.length}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <p className={`text-2xl font-bold ${tempoCritico ? 'text-red-500 animate-pulse' : tempoLimite ? 'text-orange-400' : 'text-yellow-400'}`}>
                                    {formatarTempo(cronometro)}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {tempoLimite ? 'Tempo Restante' : 'Tempo'}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-purple-400">{usuario.xp}</p>
                                <p className="text-xs text-gray-400">XP</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                            style={{ width: `${progresso}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* Question Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Question Card */}
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 mb-6">
                    {/* Question Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 text-sm font-medium">
                            {questao.materia}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 text-sm font-medium">
                            {questao.assunto}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${questao.dificuldade === 'Fácil' ? 'bg-green-600/30 text-green-300' :
                            questao.dificuldade === 'Média' ? 'bg-yellow-600/30 text-yellow-300' :
                                'bg-red-600/30 text-red-300'
                            }`}>
                            {questao.dificuldade}
                        </span>
                        {questao.geradaPorIA && (
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-pink-300 text-sm font-medium flex items-center gap-1">
                                🤖 IA
                            </span>
                        )}
                    </div>

                    {/* Question Text */}
                    <div className="text-lg text-white mb-8 leading-relaxed">
                        {questao.enunciado}
                    </div>

                    {/* Alternatives */}
                    <div className="space-y-3">
                        {questao.alternativas.map((alternativa, index) => (
                            <button
                                key={index}
                                onClick={() => !mostrarResultado && responderQuestao(index)}
                                disabled={mostrarResultado}
                                className={getAlternativaClasse(index)}
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${mostrarResultado && index === questao.correta ? 'bg-green-500 text-white' :
                                    mostrarResultado && respostaSelecionada === index ? 'bg-red-500 text-white' :
                                        respostaSelecionada === index ? 'bg-purple-500 text-white' :
                                            'bg-slate-600 text-gray-300'
                                    }`}>
                                    {getAlternativaLetra(index)}
                                </span>
                                <span className="flex-1">{alternativa}</span>
                                {mostrarResultado && index === questao.correta && (
                                    <svg className="w-6 h-6 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {mostrarResultado && respostaSelecionada === index && index !== questao.correta && (
                                    <svg className="w-6 h-6 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Explanation (when answered) */}
                {mostrarResultado && (
                    <div className="bg-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 mb-6">
                        <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Explicação
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{questao.explicacao}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                    {!mostrarResultado ? (
                        <button
                            onClick={confirmarResposta}
                            disabled={respostaSelecionada === null}
                            className="flex-1 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirmar Resposta
                        </button>
                    ) : (
                        <button
                            onClick={proximaQuestao}
                            className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                            {questaoAtual < simulado.questoes.length - 1 ? 'Próxima Questão →' : 'Ver Resultado 🎉'}
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}
