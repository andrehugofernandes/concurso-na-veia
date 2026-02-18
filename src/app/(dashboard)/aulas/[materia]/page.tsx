'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getMateriaById, MateriaConteudo } from '@/data/conteudo';
import { useAllAulasProgress } from '@/hooks/useAulaProgress';
import { notFound } from 'next/navigation';
import { carregarUsuario, carregarUsuarioAsync } from '@/lib/utils';
import { Usuario } from '@/lib/types';
import { getProfissaoById } from '@/lib/profissoes-edital';
import AulaPontuacao from '@/components/aulas/AulaPontuacao';

// Mapeamento de IDs do registro para IDs do profissoes-edital
const CARGO_ID_MAP: Record<string, string> = {
    'administracao': 'suprimento-adm',
    'seguranca': 'seguranca-trabalho',
    'logistica': 'logistica-transportes',
    'quimica': 'quimica-petroleo',
    'manutencao-mecanica': 'manutencao-mecanica',
    'manutencao-eletrica': 'manutencao-eletrica',
    'manutencao-instrumentacao': 'manutencao-instrumentacao',
    'operacao': 'operacao',
};

interface PageProps {
    params: Promise<{ materia: string }>;
}

export default function MateriaPage({ params }: PageProps) {
    const { materia: materiaId } = use(params);
    const [materia, setMateria] = useState<MateriaConteudo | null>(null);
    const [loading, setLoading] = useState(true);
    const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

    // Access Control Logic - Hooks must be at top level
    const [userPlan, setUserPlan] = useState<string | null>(null);
    const [accessChecked, setAccessChecked] = useState(false);

    useEffect(() => {
        carregarUsuarioAsync().then(user => {
            // @ts-ignore
            setUserPlan(user?.plan || 'Bronze');
            setAccessChecked(true);
        });
    }, []);

    useEffect(() => {
        const loadMateriaData = async () => {
            // 1. Verificar se é uma matéria padrão
            const materiaEncontrada = getMateriaById(materiaId);

            if (materiaEncontrada) {
                setMateria(materiaEncontrada);
            }

            // 2. Se for conhecimentos-especificos, criar dinamicamente
            if (materiaId === 'conhecimentos-especificos') {
                try {
                    const response = await fetch('/api/auth/me');
                    if (!response.ok) throw new Error('Falha ao carregar usuário');
                    const data = await response.json();
                    const usuario = data.user;
                    const cargoIdOriginal = usuario?.cargo;
                    const cargoId = cargoIdOriginal ? (CARGO_ID_MAP[cargoIdOriginal] || cargoIdOriginal) : null;

                    if (cargoId) {
                        const profissao = getProfissaoById(cargoId);

                        if (profissao && profissao.blocos) {
                            const especificosMateria: MateriaConteudo = {
                                id: 'conhecimentos-especificos',
                                nome: 'Conhecimentos Específicos',
                                descricao: `Conteúdo técnico para ${profissao.nome}`,
                                icone: '📋',
                                cor: 'from-orange-500 to-red-500',
                                requiredPlan: 'Prata',
                                topicos: profissao.blocos.flatMap((bloco, idx) =>
                                    bloco.topicos.map((topico, tidx) => ({
                                        id: `${bloco.nome.toLowerCase().replace(/\s+/g, '-')}-${tidx}`,
                                        titulo: topico,
                                        descricao: bloco.nome,
                                        duracao: '10 min',
                                        ordem: idx * 10 + tidx + 1
                                    }))
                                )
                            };
                            setMateria(especificosMateria);
                        }
                    }
                } catch (error) {
                    console.error('[Aulas/Materia] Erro:', error);
                }
            }

            setLoading(false);
        };

        loadMateriaData();
    }, [materiaId]);

    const { getProgress, loading: progressLoading } = useAllAulasProgress();

    if (loading || progressLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    if (!materia) {
        notFound();
    }

    const completedCount = materia.topicos.filter(t => getProgress(materia.id, t.id)?.completed).length;
    const totalCount = materia.topicos.length;
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    if (!accessChecked) return null; // Or loading spinner

    // Import checkPlanAccess dynamically or use logic here to avoid circular deps if any
    const PLAN_LEVELS: Record<string, number> = { 'Bronze': 1, 'Prata': 2, 'Ouro': 3 };
    const userLevel = PLAN_LEVELS[userPlan || 'Bronze'] || 1;
    const requiredLevel = PLAN_LEVELS[materia.requiredPlan || 'Bronze'] || 1;
    const hasAccess = userLevel >= requiredLevel;

    if (!hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/20">
                    <span className="text-5xl">🔒</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Conteúdo Exclusivo</h2>
                <p className="text-muted-foreground text-lg max-w-md mb-8">
                    Esta matéria está disponível apenas para assinantes do plano <strong className="text-yellow-600 dark:text-yellow-400">{materia.requiredPlan}</strong> ou superior.
                </p>
                <div className="flex gap-4">
                    <Link href="/aulas" className="px-6 py-2 rounded-xl border border-border hover:bg-accent transition">
                        Voltar
                    </Link>
                    <Link href="/planos" className="px-8 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition transform hover:-translate-y-1">
                        Fazer Upgrade 🚀
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-4">
            {/* Back Link */}
            <Link href="/aulas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar às Matérias
            </Link>

            {/* Page Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary text-4xl`}>
                    {materia.icone}
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        {materia.nome}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {materia.descricao}
                    </p>
                </div>
            </div>

            {/* Progress overview */}
            <div className="mb-8 bg-card rounded-xl p-6 border border-border shadow-lg">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-muted-foreground text-sm font-bold uppercase tracking-wider">Progresso geral</span>
                    <span className="text-primary font-bold">{completedCount}/{totalCount} concluídos</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
                    <div
                        className="h-full bg-primary w-0 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Tópicos List */}
            <div className="space-y-4">
                {materia.topicos.map((topico, index) => {
                    const prog = getProgress(materia.id, topico.id);
                    const isCompleted = prog?.completed;
                    return (
                        <Link
                            key={topico.id}
                            href={`/aulas/${materiaId}/${topico.id}`}
                            className={`group flex items-center gap-4 bg-card backdrop-blur-lg rounded-xl p-5 border shadow-lg hover:border-primary/50 transition-all active:scale-[0.98] ${isCompleted ? 'border-primary/30' : 'border-border'}`}
                        >
                            {/* Order number */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground'}`}>
                                {isCompleted ? '✓' : index + 1}
                            </div>

                            <div className="flex-grow min-w-0">
                                <h3 className={`text-lg font-bold transition truncate ${isCompleted ? 'text-green-600 dark:text-green-400 font-medium' : 'text-foreground group-hover:text-primary'}`}>
                                    {topico.titulo}
                                </h3>
                                <p className="text-muted-foreground text-sm truncate">
                                    {topico.descricao}
                                </p>
                            </div>

                            {/* Duration */}
                            <div className="flex-shrink-0 text-muted-foreground text-xs font-bold bg-muted px-2 py-1 rounded flex items-center gap-1">
                                ⏱️ {topico.duracao}
                            </div>

                            {/* Status indicator */}
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition bg-background shadow-inner flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-border group-hover:border-primary'}`}>
                                {isCompleted && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>

                            {/* Arrow */}
                            <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
                                →
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
