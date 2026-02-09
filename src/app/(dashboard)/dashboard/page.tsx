'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
}

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
    const [configModal, setConfigModal] = useState<{ open: boolean, tipo?: string, nome?: string, cor?: string }>({ open: false });
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

    const calcularNivel = (xp: number): string => {
        if (xp < 1000) return 'Estagiário';
        if (xp < 3000) return 'Técnico Júnior';
        if (xp < 6000) return 'Técnico Pleno';
        if (xp < 10000) return 'Técnico Sênior';
        return 'APROVADO! 🎉';
    };

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
    const userData = user ? {
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
    };

    return (
        <div className="min-h-screen">
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b border-slate-700 pb-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`text-lg font-semibold px-4 py-2 transition-colors ${activeTab === 'overview'
                            ? 'text-yellow-400 border-b-2 border-yellow-400'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Visão Geral
                    </button>
                    <button
                        onClick={() => setActiveTab('ranking')}
                        className={`text-lg font-semibold px-4 py-2 transition-colors ${activeTab === 'ranking'
                            ? 'text-purple-400 border-b-2 border-purple-400'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        🏆 Ranking
                    </button>
                </div>

                {activeTab === 'overview' ? (
                    <>
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-purple-500/30">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-1">
                                        Olá, {userData.nome.split(' ')[0]}! 👋
                                    </h1>
                                    <p className="text-gray-300">
                                        Estudando para: <span className="text-yellow-400 font-semibold">{CARGOS_NOMES[userData.cargo] || userData.cargo}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${userData.plan === 'pro' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                        userData.plan === 'enterprise' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                            'bg-slate-500/20 text-gray-400 border border-slate-500/30'
                                        }`}>
                                        {userData.plan === 'pro' ? '🚀 Pro' : userData.plan === 'enterprise' ? '💎 Enterprise' : '🆓 Gratuito'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <RankingTable userCargo={userData.cargo} />
                )}

                {/* Stats Grid (Only on Overview) */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
                            <p className="text-gray-400 text-sm mb-1">XP Total</p>
                            <p className="text-3xl font-bold text-purple-400">{userData.xp}</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
                            <p className="text-gray-400 text-sm mb-1">Taxa de Acerto</p>
                            <p className="text-3xl font-bold text-green-400">{taxaAcerto}%</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
                            <p className="text-gray-400 text-sm mb-1">Sequência</p>
                            <p className="text-3xl font-bold text-orange-400">{userData.sequencia_atual}</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50">
                            <p className="text-gray-400 text-sm mb-1">Conquistas</p>
                            <p className="text-3xl font-bold text-yellow-400">{userData.conquistas.length}</p>
                        </div>
                        <Link href="/historico" className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 hover:border-purple-400 transition cursor-pointer">
                            <p className="text-purple-200 text-sm mb-1">IA Geradas</p>
                            <p className="text-3xl font-bold text-white">{userData.questoes_geradas}</p>
                            <p className="text-xs text-purple-300 mt-1">Ver Histórico →</p>
                        </Link>
                    </div>
                )}
                {/* Quick Actions - NOW WITH WIZARD */}
                <h2 className="text-2xl font-bold text-white mb-4">⚡ Simulados Rápidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { tipo: 'portugues', nome: 'Português', icon: '📚', cor: 'blue' },
                        { tipo: 'matematica', nome: 'Matemática', icon: '🔢', cor: 'red' },
                        { tipo: 'especificas', nome: 'Conhecimentos Específicos', icon: '🎯', cor: 'green' },
                    ].map(({ tipo, nome, icon, cor }) => (
                        <button
                            key={tipo}
                            onClick={() => setConfigModal({ open: true, tipo, nome, cor })}
                            className="group bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all hover:transform hover:-translate-y-1 text-left w-full"
                        >
                            <div className={`bg-gradient-to-r from-${cor}-600 to-${cor}-700 p-6 text-white`}>
                                <div className="text-4xl mb-2">{icon}</div>
                                <h3 className="text-xl font-bold">{nome}</h3>
                                <p className="text-white/70 text-sm">Configurar desafio...</p>
                            </div>
                            <div className="p-4">
                                <span className="text-yellow-400 font-semibold group-hover:text-yellow-300 transition flex items-center gap-2">
                                    Iniciar Configuração
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Configuration Modal */}
                {configModal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                        <div className="bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl p-6 relative">
                            <button
                                onClick={() => setConfigModal({ ...configModal, open: false })}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                ⚙️ Configurar Simulado: <span className={`text-${configModal.cor}-400`}>{configModal.nome}</span>
                            </h2>

                            <div className="space-y-6">
                                {/* Dificuldade */}
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Nível de Dificuldade</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Fácil', 'Médio', 'Difícil', 'Casca de Banana'].map(level => (
                                            <button
                                                key={level}
                                                onClick={() => setSelection({ ...selection, dificuldade: level })}
                                                className={`p-3 rounded-lg border text-sm font-semibold transition ${selection.dificuldade === level
                                                    ? 'bg-yellow-500 text-slate-900 border-yellow-500'
                                                    : 'bg-slate-700/50 text-gray-300 border-slate-600 hover:bg-slate-700'
                                                    }`}
                                            >
                                                {level}
                                                {level === 'Casca de Banana' && ' 🍌'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Assunto (Optional) */}
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Assunto Específico (Opcional)</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Crase, Regra de Três..."
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                                        value={selection.assunto}
                                        onChange={(e) => setSelection({ ...selection, assunto: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Deixe em branco para assuntos mistos do edital.</p>
                                </div>

                                {/* Start Button */}
                                <button
                                    onClick={() => {
                                        const query = new URLSearchParams({
                                            tipo: configModal.tipo || '',
                                            dificuldade: selection.dificuldade,
                                            assunto: selection.assunto,
                                            qtd: '5'
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

                {/* Aulas Section */}
                <h2 className="text-2xl font-bold text-white mb-4">📚 Aulas por Matéria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Link
                        href="/aulas"
                        className="group bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30 hover:border-blue-400 transition-all hover:transform hover:-translate-y-1"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">📖</div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Conteúdo Teórico</h3>
                                <p className="text-gray-400">Aulas sumarizadas com progresso de leitura</p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-blue-400 font-semibold group-hover:text-blue-300 transition">
                            Acessar Aulas
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>

                    <div className="bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/30">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl opacity-50">🎯</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-500">Plano de Estudos</h3>
                                <p className="text-gray-600">Em breve: cronograma personalizado</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="px-3 py-1 rounded-full text-sm bg-slate-700 text-gray-400">Em desenvolvimento</span>
                        </div>
                    </div>
                </div>

                {/* Intensive Simulados */}
                <h2 className="text-2xl font-bold text-white mb-4">🔥 Simulados Intensivos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {userData.plan === 'free' ? (
                        <>
                            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 relative group">
                                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity">
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
                                <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center transition-opacity">
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
                            <Link
                                href="/simulado?tipo=completo&qtd=60"
                                className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border-2 border-purple-500/50 hover:border-purple-400 transition-all group"
                            >
                                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white group-hover:from-purple-500 group-hover:to-purple-600 transition-all">
                                    <div className="text-4xl mb-2">📝</div>
                                    <h3 className="text-xl font-bold">Prova Completa - 60 Questões</h3>
                                    <p className="text-white/70">Formato oficial CESGRANRIO • 4 horas</p>
                                    <div className="flex gap-2 mt-3">
                                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs">10 Port</span>
                                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs">10 Mat</span>
                                        <span className="px-2 py-1 bg-white/20 rounded-full text-xs">40 Esp</span>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <span className="text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">Iniciar Prova →</span>
                                    <span className="text-gray-500 text-sm">⏱️ 4h</span>
                                </div>
                            </Link>

                            <Link
                                href="/simulado?tipo=completo&qtd=100"
                                className="bg-slate-800/50 backdrop-blur-lg rounded-xl overflow-hidden border-2 border-yellow-500/50 hover:border-yellow-400 transition-all group"
                            >
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-slate-900 group-hover:from-yellow-400 group-hover:to-orange-400 transition-all">
                                    <div className="text-4xl mb-2">🔥</div>
                                    <h3 className="text-xl font-bold">Maratona 100 Questões</h3>
                                    <p className="text-slate-800">Simulado intensivo completo • 4 horas</p>
                                    <div className="flex gap-2 mt-3">
                                        <span className="px-2 py-1 bg-black/20 rounded-full text-xs">15 Port</span>
                                        <span className="px-2 py-1 bg-black/20 rounded-full text-xs">15 Mat</span>
                                        <span className="px-2 py-1 bg-black/20 rounded-full text-xs">70 Esp</span>
                                    </div>
                                </div>
                                <div className="p-4 flex items-center justify-between">
                                    <span className="text-yellow-400 font-semibold group-hover:text-yellow-300 transition-colors">Aceitar Desafio →</span>
                                    <span className="text-gray-500 text-sm">⏱️ 4h</span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>

                {/* Upgrade Banner (for free users) */}
                {userData.plan === 'free' && (
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">🚀 Desbloqueie questões ilimitadas!</h3>
                                <p className="text-gray-300">Upgrade para o plano Pro e tenha acesso a todos os recursos.</p>
                            </div>
                            <Link
                                href="/pricing"
                                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                            >
                                Ver Planos
                            </Link>
                        </div>
                    </div>
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
