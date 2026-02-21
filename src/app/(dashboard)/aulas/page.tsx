'use client';

import Link from 'next/link';
import { MateriaConteudo } from '@/data/conteudo';
import { getProgramaDeEstudos } from '@/data/programa-estudos';
import { useUserProfile } from '@/hooks/useUserProfile';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { useSetPageTitle } from '@/contexts/UIContext';
import { useAllAulasProgress } from '@/hooks/useAulaProgress';

export default function AulasPage() {
    const { profile: user, loading: userLoading } = useUserProfile();
    const { getProgress, loading: progressLoading } = useAllAulasProgress();

    // Define o título da página
    useSetPageTitle('Aulas');

    // Gera o programa de estudos baseado no cargo do usuário
    const materias: MateriaConteudo[] = getProgramaDeEstudos(user?.cargo);
    const cargoNome = user?.cargo ? materias.find(m => m.id.startsWith('especifica'))?.descricao.split('para ')[1] : '';

    const loading = userLoading || progressLoading;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    return (
        <div className="p-2 md:p-4">
            {/* Back Link */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar ao Dashboard
            </Link>

            {/* Page Header */}
            <div className="mb-12 flex items-start gap-4">
                <div className="text-4xl md:text-5xl flex-shrink-0 mt-1">
                    📚
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                        Aulas por Matéria
                    </h1>
                    <p className="text-muted-foreground text-lg mt-2 font-medium">
                        {cargoNome ? `Conteúdo personalizado para: ${cargoNome}` : 'Escolha uma matéria para estudar'}
                    </p>
                </div>
            </div>

            {/* Matérias Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {materias.map((materia) => (
                    <Link
                        href={`/aulas/${materia.id}`}
                        key={materia.id}
                        className="group relative flex flex-col bg-slate-50/50 dark:bg-card backdrop-blur-lg rounded-3xl border border-border/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-primary/10 overflow-hidden"
                    >
                        <AnimatedBorder borderRadius="rounded-3xl" />

                        {/* Header Section */}
                        <div className="p-8 pb-4">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${materia.cor} text-3xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform`}>
                                    {materia.icone}
                                </div>
                                <span className="px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/50 text-primary text-xs font-bold border border-zinc-200 dark:border-zinc-700">
                                    {materia.topicos.length} Tópicos
                                </span>
                            </div>

                            <h2 className="text-3xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors uppercase">
                                {materia.nome}
                            </h2>
                            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                                {materia.descricao}
                            </p>
                        </div>

                        {/* List of Topics (Preview) */}
                        <div className="flex-1 px-8 py-4 space-y-3">
                            {materia.topicos.slice(0, 5).map((topico) => {
                                const prog = getProgress(materia.id, topico.id);
                                const isCompleted = prog?.completed;
                                return (
                                    <div key={topico.id} className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isCompleted ? 'bg-green-500' : 'bg-blue-500/40 group-hover/item:bg-blue-500'}`} />
                                        <span className={`truncate transition-colors flex-1 ${isCompleted ? 'text-green-600 dark:text-green-400 font-medium' : 'group-hover/item:text-foreground'}`}>
                                            {topico.titulo}
                                        </span>
                                        {isCompleted && (
                                            <span className="text-green-500 text-xs font-bold px-1.5 py-0.5 bg-green-500/10 rounded-full">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                            {materia.topicos.length > 5 && (
                                <div className="text-xs text-primary/60 font-medium pl-4.5 pt-2">
                                    + {materia.topicos.length - 5} outros tópicos...
                                </div>
                            )}
                        </div>

                        {/* Decoration */}
                        <div className={`absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br ${materia.cor} opacity-[0.03] group-hover:opacity-[0.08] rounded-full transition-opacity pointer-events-none`} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
