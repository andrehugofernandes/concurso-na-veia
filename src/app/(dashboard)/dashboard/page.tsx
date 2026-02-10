'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CONTEUDO_MATERIAS } from '@/data/conteudo';
import { PROFISSOES } from '@/lib/profissoes-edital';

interface UserData {
    nome: string;
    email: string;
    nivel: string;
    cargo: string;
    plan: string;
    xp: number;
    nivel_jogador: string;
    questoes_certas: number;
    questoes_erradas: number;
    sequencia_atual: number;
    maior_sequencia: number;
    conquistas: string[];
    questoes_geradas: number;
    nivelConcurso?: string;
    diasRestantesTrial?: number;
    simuladosHoje?: number;
}

// Mapeamento de cargo do usuário para ID da profissão no edital
const CARGO_ID_MAP: Record<string, string> = {
    'administracao': 'suprimento-adm',
    'seguranca': 'seguranca-trabalho',
    'logistica': 'logistica-transportes',
    'quimica': 'quimica-petroleo',
    'manutencao-mecanica': 'manutencao-mecanica',
    'manutencao-eletrica': 'manutencao-eletrica',
    'manutencao-instrumentacao': 'manutencao-instrumentacao',
    'operacao': 'operacao',
    'enfermagem-trabalho': 'enfermagem-trabalho',
    'seguranca-trabalho': 'seguranca-trabalho',
    'manutencao-caldeiraria': 'manutencao-caldeiraria',
    'operacao-lastro': 'operacao-lastro',
    'inspecao-equipamentos': 'inspecao-equipamentos',
    'edificacoes': 'edificacoes',
    'eletrica-projetos': 'eletrica-projetos',
    'mecanica-projetos': 'mecanica-projetos',
    'instrumentacao-projetos': 'instrumentacao-projetos',
    'logistica-transportes': 'logistica-transportes',
    'quimica-petroleo': 'quimica-petroleo',
    'suprimento-adm': 'suprimento-adm',
};

const CARGOS_NOMES: Record<string, string> = {
    // Nível Técnico - Saúde e Segurança
    'enfermagem-trabalho': 'Enfermagem do Trabalho',
    'seguranca-trabalho': 'Segurança do Trabalho',
    // Nível Técnico - Manutenção e Operação
    'manutencao-caldeiraria': 'Manutenção - Caldeiraria',
    'manutencao-eletrica': 'Manutenção - Elétrica',
    'manutencao-mecanica': 'Manutenção - Mecânica',
    'operacao': 'Técnico de Operação',
    'manutencao-instrumentacao': 'Manutenção - Instrumentação',
    // Nível Técnico - Projetos, Construção e Montagem
    'edificacoes': 'Técnico em Edificações',
    'eletrica-projetos': 'Técnico Elétrica (Projetos)',
    'mecanica-projetos': 'Técnico Mecânica (Projetos)',
    // Nível Técnico - Logística, Suprimento e Química
    'logistica-transportes': 'Logística de Transportes',
    'quimica-petroleo': 'Química de Petróleo',
    'suprimento-adm': 'Suprimento (Administração)',
    // Nível Superior - Engenharias
    'eng-petroleo': 'Engenheiro de Petróleo',
    'eng-mecanico': 'Engenheiro Mecânico',
    'eng-eletrico': 'Engenheiro Elétrico',
    'eng-civil': 'Engenheiro Civil',
    // Nível Superior - Outros
    'analista-sistemas': 'Analista de Sistemas',
    'analista-admin': 'Analista de Administração',
    'geologo': 'Geólogo',
    'economista': 'Economista',
};

export default function DashboardPage() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Config Modal State
    const [configModal, setConfigModal] = useState<{ open: boolean, tipo?: string, nome?: string, cor?: string, qtd?: number }>({ open: false });
    const [selection, setSelection] = useState({ dificuldade: 'Médio', assunto: '' });
    const [activeTab, setActiveTab] = useState<'overview' | 'ranking'>('overview');

    useEffect(() => {
        // Load user data from cookie/session
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

    const taxaAcerto = user
        ? user.questoes_certas + user.questoes_erradas > 0
            ? Math.round((user.questoes_certas / (user.questoes_certas + user.questoes_erradas)) * 100)
            : 0
        : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    // Safe user data handling
    const userData: UserData = user ? {
        ...user,
        conquistas: user.conquistas || [],
        questoes_certas: user.questoes_certas || 0,
        questoes_erradas: user.questoes_erradas || 0,
        xp: user.xp || 0,
        sequencia_atual: user.sequencia_atual || 0,
        questoes_geradas: user.questoes_geradas || 0,
        nivel: user.nivel || 'medio',
        cargo: user.cargo || 'operacao',
        plan: user.plan || 'free',
        nome: user.nome || (user as any).user_metadata?.full_name || (user as any).user_metadata?.username || 'Usuário',
        nivelConcurso: (user as any).nivelConcurso || 'medio',
        diasRestantesTrial: (user as any).diasRestantesTrial !== undefined ? (user as any).diasRestantesTrial : 7,
        simuladosHoje: (user as any).simuladosHoje || 0
    } : {
        nome: 'Usuário Demo',
        email: 'demo@example.com',
        nivel: 'medio',
        cargo: 'operacao',
        plan: 'free',
        xp: 150,
        nivel_jogador: 'Estagiário',
        questoes_certas: 8,
        questoes_erradas: 2,
        sequencia_atual: 3,
        maior_sequencia: 5,
        conquistas: [],
        questoes_geradas: 10,
        nivelConcurso: 'medio',
        diasRestantesTrial: 7,
        simuladosHoje: 0
    };

    const handleSimuladoClick = (tipo: string, nome: string, cor: string) => {
        if (userData.plan === 'free') {
            if (userData.diasRestantesTrial !== undefined && userData.diasRestantesTrial <= 0) {
                alert("Seu período de teste acabou! 🚫\n\nAssine o PRO para continuar treinando sem limites.");
                return;
            }
            if (userData.simuladosHoje !== undefined && userData.simuladosHoje >= 1) {
                alert("Você já usou seu simulado diário gratuito! ⏳\n\nVolte amanhã ou assine o PRO para acesso ilimitado.");
                return;
            }
        }
        setConfigModal({ open: true, tipo, nome, cor });
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Olá, {userData.nome.split(' ')[0]}! 👋</h1>
                    <p className="text-gray-400">Pronto para superar seus limites hoje?</p>
                </div>
                {userData.plan === 'free' && (
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Teste Grátis</span>
                            <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-700">
                                <span className={`text-lg font-black ${userData.diasRestantesTrial && userData.diasRestantesTrial <= 3 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
                                    {userData.diasRestantesTrial}
                                </span>
                                <span className="text-xs text-gray-300 font-bold">dias restantes</span>
                            </div>
                        </div>
                        <Link href="/pricing" className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all text-sm animate-bounce">
                            Seja PRO 👑
                        </Link>
                    </div>
                )}
            </header>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-slate-800">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'overview' ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Visão Geral
                    {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('ranking')}
                    className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'ranking' ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Ranking
                    {activeTab === 'ranking' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-t-full"></div>}
                </button>
            </div>

            <main>
                {activeTab === 'overview' ? (
                    <>
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 text-2xl">⚡</div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase font-bold">Sequência</p>
                                    <p className="text-2xl font-bold text-white">{userData.sequencia_atual} dias</p>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 text-2xl">🎯</div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase font-bold">Precisão</p>
                                    <p className="text-2xl font-bold text-white">{taxaAcerto}%</p>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                                <div className="p-3 bg-green-500/20 rounded-lg text-green-400 text-2xl">📝</div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase font-bold">Questões</p>
                                    <p className="text-2xl font-bold text-white">{userData.questoes_geradas}</p>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center gap-4">
                                <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400 text-2xl">🏆</div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase font-bold">Nível</p>
                                    <p className="text-2xl font-bold text-white">{userData.nivel_jogador}</p>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 1: Aulas (Moved to Top) */}
                        <section className="mb-8 p-6 bg-blue-900/5 rounded-3xl border border-blue-500/10">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400 text-xl">📚</span>
                                Conteúdo Teórico e Aulas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Link
                                    href="/aulas"
                                    className="group bg-slate-900/60 backdrop-blur-lg rounded-xl p-6 border border-slate-700/60 hover:border-blue-500/50 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-5xl">📖</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Conteúdo Teórico</h3>
                                            <p className="text-gray-400 text-sm mt-1">Aulas completas organizadas por edital, com acompanhamento de progresso.</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition text-sm uppercase tracking-wide">
                                        Acessar Aulas
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>

                                <div className="bg-slate-900/30 backdrop-blur-lg rounded-xl p-6 border border-slate-800/50 opacity-70">
                                    <div className="flex items-center gap-4">
                                        <div className="text-5xl opacity-50">🎯</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-500">Plano de Estudos</h3>
                                            <p className="text-gray-600 text-sm mt-1">Cronograma personalizado baseado no seu tempo disponível.</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-gray-500 uppercase tracking-wide">Em desenvolvimento</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 2: Simulados Rápidos */}
                        <section className="mb-8 p-6 bg-slate-900/30 rounded-3xl border border-slate-800">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="p-2 bg-green-500/20 rounded-lg text-green-400 text-xl">⚡</span>
                                Simulados Rápidos
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Português Card */}
                                <button
                                    onClick={() => handleSimuladoClick('portugues', 'Língua Portuguesa', 'blue')}
                                    className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all group text-left flex flex-col h-full"
                                >
                                    <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 shrink-0"></div>
                                    <div className="p-6 flex flex-col h-full justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 text-3xl group-hover:scale-110 transition-transform shrink-0">📝</div>
                                            <h3 className="text-2xl font-black uppercase leading-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">LÍNGUA PORTUGUESA</h3>
                                        </div>
                                        <div className="flex justify-between items-end gap-4 mt-auto">
                                            <p className="text-gray-400 text-sm leading-snug">Gramática, interpretação de texto e redação oficial.</p>
                                            <span className="text-xs bg-slate-700 text-gray-300 px-3 py-1 rounded shrink-0 font-medium">5 min</span>
                                        </div>
                                    </div>
                                </button>

                                {/* Matemática Card */}
                                <button
                                    onClick={() => handleSimuladoClick('matematica', 'Matemática', 'purple')}
                                    className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all group text-left flex flex-col h-full"
                                >
                                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 shrink-0"></div>
                                    <div className="p-6 flex flex-col h-full justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 text-3xl group-hover:scale-110 transition-transform shrink-0">🔢</div>
                                            <h3 className="text-2xl font-black uppercase leading-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">MATEMÁTICA</h3>
                                        </div>
                                        <div className="flex justify-between items-end gap-4 mt-auto">
                                            <p className="text-gray-400 text-sm leading-snug">Raciocínio lógico, álgebra e geometria aplicada.</p>
                                            <span className="text-xs bg-slate-700 text-gray-300 px-3 py-1 rounded shrink-0 font-medium">5 min</span>
                                        </div>
                                    </div>
                                </button>

                                {/* Específicos Card */}
                                <button
                                    onClick={() => handleSimuladoClick('especificas', 'Conhecimentos Específicos', 'green')}
                                    className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 hover:border-green-500/50 transition-all group text-left flex flex-col h-full"
                                >
                                    <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 shrink-0"></div>
                                    <div className="p-6 flex flex-col h-full justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-green-500/20 rounded-lg text-green-400 text-3xl group-hover:scale-110 transition-transform shrink-0">🏭</div>
                                            <h3 className="text-2xl font-black uppercase leading-tight bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">ESPECÍFICOS</h3>
                                        </div>
                                        <div className="flex justify-between items-end gap-4 mt-auto">
                                            <p className="text-gray-400 text-sm leading-snug">Questões focadas no seu cargo: {CARGOS_NOMES[userData.cargo] || 'Selecione no perfil'}</p>
                                            <span className="text-xs bg-slate-700 text-gray-300 px-3 py-1 rounded shrink-0 font-medium">5 min</span>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </section>

                        {/* SECTION 3: Intensive Simulados */}
                        <section className="mb-8 p-6 bg-purple-900/10 rounded-3xl border border-purple-500/10">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400 text-xl">🔥</span>
                                Treino Intensivo de Aceleração
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {userData.plan === 'free' ? (
                                    <>
                                        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 relative group">
                                            <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity">
                                                <div className="text-5xl mb-3">🔒</div>
                                                <h3 className="text-xl font-bold text-white mb-1">Simulado Específico</h3>
                                                <p className="text-gray-300 text-sm mb-4">Exclusivo para assinantes PRO</p>
                                                <Link
                                                    href="/pricing"
                                                    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all transform hover:scale-105"
                                                >
                                                    Desbloquear 🚀
                                                </Link>
                                            </div>
                                            <div className="p-6 opacity-30 pointer-events-none grayscale">
                                                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white rounded-lg mb-4">
                                                    <div className="text-4xl mb-2">📝</div>
                                                    <h3 className="text-xl font-bold">Prova Completa</h3>
                                                </div>
                                                <div className="p-2 flex justify-between">
                                                    <span>Bloqueado</span>
                                                    <span>4h</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 relative group">
                                            <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity">
                                                <div className="text-5xl mb-3">👑</div>
                                                <h3 className="text-xl font-bold text-white mb-1">Maratona 100</h3>
                                                <p className="text-gray-300 text-sm mb-4">Teste seus limites como no dia da prova!</p>
                                                <Link
                                                    href="/pricing"
                                                    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all transform hover:scale-105"
                                                >
                                                    Virar PRO 👑
                                                </Link>
                                            </div>
                                            <div className="p-6 opacity-30 pointer-events-none grayscale">
                                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-slate-900 rounded-lg mb-4">
                                                    <div className="text-4xl mb-2">🔥</div>
                                                    <h3 className="text-xl font-bold">Maratona 100 Questões</h3>
                                                </div>
                                                <div className="p-2 flex justify-between">
                                                    <span>Bloqueado</span>
                                                    <span>4h</span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setConfigModal({ open: true, tipo: 'intensivo', nome: 'Treino Intensivo focalizado', cor: 'purple', qtd: 20 })}
                                            className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border-2 border-purple-500/50 hover:border-purple-400 transition-all group text-left w-full shadow-lg shadow-purple-900/10"
                                        >
                                            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white group-hover:from-purple-500 group-hover:to-purple-700 transition-all relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-10 -translate-y-10">🎯</div>
                                                <div className="relative z-10">
                                                    <div className="text-4xl mb-3">🎯</div>
                                                    <h3 className="text-xl font-bold">Treino Intensivo</h3>
                                                    <p className="text-purple-100 text-sm mt-1">20 questões de uma matéria ou tópico específico</p>
                                                    <div className="flex gap-2 mt-4">
                                                        <span className="px-2 py-1 bg-white/20 rounded text-xs font-bold">Foco Total</span>
                                                        <span className="px-2 py-1 bg-white/20 rounded text-xs font-bold">30 min</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 flex items-center justify-between">
                                                <span className="text-purple-400 font-bold group-hover:text-purple-300 transition-colors flex items-center gap-2">
                                                    Configurar Treino
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setConfigModal({ open: true, tipo: 'maratona', nome: 'Maratona Petrobras', cor: 'yellow', qtd: 100 })}
                                            className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border-2 border-yellow-500/50 hover:border-yellow-400 transition-all group text-left w-full shadow-lg shadow-yellow-900/10"
                                        >
                                            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 text-white group-hover:from-yellow-500 group-hover:to-orange-500 transition-all relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl transform translate-x-10 -translate-y-10">🔥</div>
                                                <div className="relative z-10">
                                                    <div className="text-4xl mb-3">🔥</div>
                                                    <h3 className="text-xl font-bold">Maratona Oficial</h3>
                                                    <p className="text-orange-50 text-sm mt-1">Simulação real da prova (Médio ou Superior)</p>
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">Port</span>
                                                        <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">Mat</span>
                                                        <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">Esp</span>
                                                        {userData.nivelConcurso === 'superior' && <span className="px-2 py-1 bg-black/20 rounded text-xs font-bold">Ing</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 flex items-center justify-between">
                                                <span className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors flex items-center gap-2">
                                                    Aceitar Desafio
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                </span>
                                                <span className="text-gray-400 text-sm">~4 horas</span>
                                            </div>
                                        </button>
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Config Modal */}
                        {configModal.open && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) setConfigModal({ open: false });
                                }}
                            >
                                <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
                                    <div className={`p-6 bg-gradient-to-r ${configModal.cor === 'blue' ? 'from-blue-900/50 to-cyan-900/50' :
                                        configModal.cor === 'purple' ? 'from-purple-900/50 to-pink-900/50' :
                                            configModal.cor === 'green' ? 'from-green-900/50 to-emerald-900/50' :
                                                configModal.cor === 'yellow' ? 'from-yellow-900/50 to-orange-900/50' :
                                                    'from-slate-800 to-slate-900'
                                        } rounded-t-2xl border-b border-slate-700 flex justify-between items-center`}>
                                        <h3 className="text-xl font-bold text-white">{configModal.nome}</h3>
                                        <button
                                            onClick={() => setConfigModal({ open: false })}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* Difficulty Selection */}
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Nível de Dificuldade</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Fácil', 'Médio', 'Difícil', 'Casca de Banana'].map((dif) => (
                                                    <button
                                                        key={dif}
                                                        onClick={() => setSelection({ ...selection, dificuldade: dif })}
                                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selection.dificuldade === dif
                                                            ? 'bg-yellow-500 text-slate-900 shadow-lg shadow-yellow-500/20'
                                                            : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
                                                            }`}
                                                    >
                                                        {dif}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Assunto Específico (Opcional)</label>
                                            <select
                                                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 appearance-none"
                                                value={selection.assunto}
                                                onChange={(e) => setSelection({ ...selection, assunto: e.target.value })}
                                            >
                                                <option value="">Todos os tópicos (Misturado)</option>
                                                {(() => {
                                                    // Determine topics based on selected type
                                                    let topics: string[] = [];

                                                    // Handle general subjects (Portuguese, Math) from CONTEUDO_MATERIAS
                                                    if (configModal.tipo === 'portugues' || configModal.tipo === 'matematica') {
                                                        const materia = CONTEUDO_MATERIAS.find(m => m.id === configModal.tipo);
                                                        if (materia) {
                                                            topics = materia.topicos.map(t => t.titulo);
                                                        }
                                                    }
                                                    // Handle specific knowledge from PROFISSOES based on user role
                                                    else if (configModal.tipo === 'especificas') {
                                                        // Find the profession matching the user's cargo
                                                        const mappedCargoId = CARGO_ID_MAP[userData.cargo] || userData.cargo;
                                                        const profession = PROFISSOES.find(p => p.id === mappedCargoId);
                                                        if (profession) {
                                                            // Flatten all topics from all blocks
                                                            topics = profession.blocos.flatMap(b => b.topicos);
                                                        }
                                                    }
                                                    // Handle 'intensivo' (20 questions focused)
                                                    else if (configModal.tipo === 'intensivo') {
                                                        // Option to choose full subjects
                                                        topics.push('Língua Portuguesa');
                                                        topics.push('Matemática');

                                                        // Add profession-specific topics
                                                        const mappedCargoId = CARGO_ID_MAP[userData.cargo] || userData.cargo;
                                                        const profession = PROFISSOES.find(p => p.id === mappedCargoId);
                                                        if (profession) {
                                                            topics.push(...profession.blocos.flatMap(b => b.topicos));
                                                        }
                                                    }
                                                    // Handle 'maratona' - Fixed structure, no topic selection needed
                                                    else if (configModal.tipo === 'maratona') {
                                                        return <option value="">Estrutura fixa do Edital (Port + Mat + Esp)</option>;
                                                    }

                                                    return topics.map((topic, index) => (
                                                        <option key={index} value={topic}>
                                                            {topic}
                                                        </option>
                                                    ));
                                                })()}
                                            </select>
                                            {configModal.tipo === 'intensivo' && (
                                                <p className="text-xs text-gray-500 mt-1">Escolha uma matéria completa ou um tópico específico para treinar.</p>
                                            )}
                                            {configModal.tipo === 'maratona' && (
                                                <p className="text-xs text-gray-500 mt-1">O simulado seguirá a distribuição exata do edital para seu nível.</p>
                                            )}
                                        </div>

                                        {/* Start Button */}
                                        <button
                                            onClick={() => {
                                                const query = new URLSearchParams({
                                                    tipo: configModal.tipo || '',
                                                    dificuldade: selection.dificuldade,
                                                    assunto: selection.assunto,
                                                    qtd: String(configModal.qtd || 5)
                                                }).toString();
                                                window.location.href = `/simulado?${query}`;
                                            }}
                                            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all text-lg"
                                        >
                                            Começar Desafio 🚀
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Upgrade Banner for Free Users */}
                        {userData.plan === 'free' && (
                            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/20 text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">🚀 Desbloqueie todo o potencial!</h3>
                                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                    Assinantes PRO têm acesso ilimitado a Simulados Intensivos, Maratonas Oficiais, Ranking geral e análises detalhadas de desempenho.
                                </p>
                                <Link
                                    href="/pricing"
                                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all inline-block transform hover:scale-105"
                                >
                                    Ver Planos e Preços
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <RankingTable userCargo={userData.cargo || ''} />
                )}
            </main>
        </div>
    );
}

function RankingTable({ userCargo }: { userCargo: string }) {
    const [ranking, setRanking] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'geral' | 'cargo'>('geral');

    useEffect(() => {
        const fetchRanking = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/ranking?type=${filter}&cargo=${userCargo || ''}`);
                if (!res.ok) {
                    console.error('Failed to fetch ranking:', await res.text());
                    setRanking([]);
                    return;
                }
                const data = await res.json();
                if (Array.isArray(data)) {
                    setRanking(data);
                } else {
                    console.error('Ranking data is not an array:', data);
                    setRanking([]);
                }
            } catch (error) {
                console.error('Error fetching ranking:', error);
                setRanking([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRanking();
    }, [filter, userCargo]);

    return (
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">🏆 Melhores Jogadores</h2>
                <div className="flex bg-slate-700 rounded-lg p-1">
                    <button
                        onClick={() => setFilter('geral')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition ${filter === 'geral' ? 'bg-slate-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                    >
                        Geral
                    </button>
                    <button
                        onClick={() => setFilter('cargo')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition ${filter === 'cargo' ? 'bg-slate-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                    >
                        Meu Cargo
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="p-12 text-center text-gray-400">Carregando ranking...</div>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-gray-400 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">Pos</th>
                            <th className="px-6 py-4">Usuário</th>
                            <th className="px-6 py-4 text-center">Nível</th>
                            <th className="px-6 py-4 text-right">XP</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {ranking.map((player) => (
                            <tr key={player.posicao} className="hover:bg-slate-700/30 transition">
                                <td className="px-6 py-4">
                                    <span className={`font-bold ${player.posicao === 1 ? 'text-yellow-400 text-xl' :
                                        player.posicao === 2 ? 'text-gray-300 text-lg' :
                                            player.posicao === 3 ? 'text-orange-400 text-lg' :
                                                'text-gray-500'
                                        }`}>
                                        #{player.posicao}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                                        {player.avatar_url ? (
                                            <img src={player.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-white font-bold">{player.nome.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">{player.nome}</p>
                                        <p className="text-xs text-gray-500">{CARGOS_NOMES[player.cargo] || player.cargo}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="px-3 py-1 rounded-full text-xs bg-slate-700 text-gray-300 border border-slate-600">
                                        {player.nivel || 'Novato'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-purple-400">
                                    {player.xp.toLocaleString()} XP
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
