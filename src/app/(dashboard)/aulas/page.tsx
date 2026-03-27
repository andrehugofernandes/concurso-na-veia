'use client';

import Link from 'next/link';
import { MateriaConteudo } from '@/data/conteudo';
import { getProgramaDeEstudos } from '@/data/programa-estudos';
import { Badge } from '@/components/ui/badge';
import { useUserProfile } from '@/hooks/useUserProfile';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { useSetPageTitle } from '@/contexts/UIContext';
import { useAllAulasProgress } from '@/hooks/useAulaProgress';

import { PROFISSOES, Profissao } from '@/lib/profissoes-edital';

export default function AulasPage() {
    const { profile: user, loading: userLoading } = useUserProfile();
    const { getProgress, loading: progressLoading } = useAllAulasProgress();

    // Define o título da página
    useSetPageTitle('Aulas');

    const isElite = user?.plan === 'elite-total';
    
    // Programa base para o cargo do usuário (inclui básicas + específicas dele)
    const programaBase = getProgramaDeEstudos(user?.cargo, false);
    
    // Unificação da Grade Principal (Básicas + Específicas do Usuário)
    const minhaGrade = programaBase;
    
    // Separação Elite por Nível
    const eliteSuperior: { nome: string, materias: MateriaConteudo[] }[] = [];
    const eliteTecnico: { nome: string, materias: MateriaConteudo[] }[] = [];

    if (isElite) {
        PROFISSOES.forEach((prof: Profissao) => {
            // Ignorar a profissão que o usuário já está cursando (já aparece na seção principal)
            if (user?.cargo === prof.id || user?.cargo === prof.nome) return;

            const materiasDessaProf = getProgramaDeEstudos(prof.id, false)
                .filter(m => !['portugues', 'matematica'].includes(m.id));

            if (materiasDessaProf.length > 0) {
                const item = {
                    nome: prof.nome,
                    materias: materiasDessaProf
                };
                if (prof.nivel === 'superior') {
                    eliteSuperior.push(item);
                } else {
                    eliteTecnico.push(item);
                }
            }
        });
        
        // Se o usuário for Nível Técnico, Inglês não aparece na minhaGrade.
        // Vamos garantir que ele apareça em uma seção "Bases Superior / Premium" se for Elite.
        const profUsuario = PROFISSOES.find(p => p.id === user?.cargo || p.id === CARGO_ID_MAP[user?.cargo || '']);
        const isTecnico = profUsuario?.nivel === 'tecnico';
        
        if (isTecnico) {
            const ingles = getProgramaDeEstudos(undefined, true).find(m => m.id === 'ingles');
            if (ingles) {
                // Adicionar Inglês como uma "Seção Premium" ou no topo do nível superior
                eliteSuperior.unshift({
                    nome: 'Língua Inglesa (Bases Nível Superior)',
                    materias: [ingles]
                });
            }
        }
    }

    const cargoNome = user?.cargo ? minhaGrade.filter(m => !['portugues', 'matematica', 'ingles'].includes(m.id))[0]?.descricao.split('para ')[1] || user.cargo : '';

    const loading = userLoading || progressLoading;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
            </div>
        );
    }

    const renderMateriaCard = (materia: MateriaConteudo, size: 'normal' | 'small' = 'normal') => (
        <Link
            href={`/aulas/${materia.id}`}
            key={materia.id}
            className={`group relative flex flex-col bg-slate-50/50 dark:bg-card/40 backdrop-blur-xl rounded-3xl border border-border/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-primary/20 overflow-hidden ${size === 'small' ? 'h-full' : ''}`}
        >
            <AnimatedBorder borderRadius="rounded-3xl" />

            {/* Header Section */}
            <div className={`${size === 'small' ? 'p-6 pb-2' : 'p-8 pb-4'}`}>
                <div className="flex items-start justify-between mb-6">
                    <div className={`flex items-center justify-center ${size === 'small' ? 'w-12 h-12 text-2xl' : 'w-16 h-16 text-3xl'} rounded-2xl bg-gradient-to-br ${materia.cor} shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500`}>
                        {materia.icone}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-800/50 text-primary text-xs font-bold border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
                        {materia.topicos.length} Tópicos
                    </span>
                </div>

                <h2 className={`${size === 'small' ? 'text-xl' : 'text-3xl'} font-black text-foreground tracking-tight group-hover:text-primary transition-colors uppercase leading-tight`}>
                    {materia.nome}
                </h2>
                <p className="text-muted-foreground text-sm mt-3 line-clamp-2 font-medium opacity-80">
                    {materia.descricao}
                </p>
            </div>

            {/* List of Topics (Preview) - Only for normal size */}
            {size === 'normal' && (
                <div className="flex-1 px-8 py-4 space-y-3">
                    {materia.topicos.slice(0, 5).map((topico) => {
                        const prog = getProgress(materia.id, topico.id);
                        const isCompleted = prog?.completed;
                        return (
                            <div key={topico.id} className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isCompleted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-blue-500/30 group-hover/item:bg-blue-500'}`} />
                                <span className={`truncate transition-colors flex-1 ${isCompleted ? 'text-green-600 dark:text-green-400 font-semibold' : 'group-hover/item:text-foreground'}`}>
                                    {topico.titulo}
                                </span>
                                {isCompleted && (
                                    <span className="text-green-500 text-[10px] font-black px-1.5 py-0.5 bg-green-500/10 rounded-full border border-green-500/20">
                                        ✓
                                    </span>
                                )}
                            </div>
                        );
                    })}
                    {materia.topicos.length > 5 && (
                        <div className="text-xs text-primary/60 font-bold pl-4.5 pt-2 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                            + {materia.topicos.length - 5} outros tópicos <span className="text-[10px]">→</span>
                        </div>
                    )}
                </div>
            )}

            {/* Decoration */}
            <div className={`absolute -right-12 -bottom-12 w-48 h-48 bg-gradient-to-br ${materia.cor} opacity-[0.05] group-hover:opacity-[0.12] rounded-full transition-all duration-700 pointer-events-none blur-3xl`} />
        </Link>
    );

    return (
        <div className="p-4 md:p-[80px] min-h-screen bg-slate-50/30 dark:bg-transparent">
            {/* Back Link */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8 group font-semibold">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar ao Dashboard
            </Link>

            {/* Page Header */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-start gap-5">
                    <div className="text-5xl md:text-7xl flex-shrink-0 animate-bounce-slow">
                        📚
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
                                Jornada de Aulas
                            </h1>
                            {isElite && (
                                <Badge className="bg-gradient-to-r from-amber-400 to-orange-600 text-white border-0 font-black px-3 py-1 shadow-lg shadow-orange-500/20">
                                    💎 ELITE TOTAL
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl">
                            {cargoNome
                                ? <span>Grade Completa para: <b className="text-foreground">{cargoNome}</b></span>
                                : 'Explore as matérias e domine cada tópico do edital.'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-20">
                {/* 1. SUA GRADE PRINCIPAL (Unificada) */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Sua Grade de Estudos
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {minhaGrade.map((m: MateriaConteudo) => renderMateriaCard(m))}
                    </div>
                </section>

                {/* 2. CONTEÚDO ELITE - NÍVEL SUPERIOR */}
                {isElite && eliteSuperior.length > 0 && (
                    <section className="bg-slate-100/50 dark:bg-zinc-950/20 -mx-4 md:-mx-20 p-4 md:p-20 rounded-[4rem] border border-zinc-200/50 dark:border-white/5 space-y-16">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                            <h2 className="text-sm font-black text-amber-600 dark:text-amber-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500" /> Catálogo Elite - Nível Superior
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                        </div>

                        {eliteSuperior.map((prof, pIdx) => (
                            <div key={`superior-${pIdx}`} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight opacity-70">
                                        {prof.nome}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {prof.materias.map((m: MateriaConteudo) => renderMateriaCard(m, 'small'))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* 3. CONTEÚDO ELITE - NÍVEL TÉCNICO */}
                {isElite && eliteTecnico.length > 0 && (
                    <section className="bg-zinc-50/50 dark:bg-zinc-900/10 -mx-4 md:-mx-20 p-4 md:p-20 rounded-[4rem] border border-zinc-200/50 dark:border-white/5 space-y-16">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                            <h2 className="text-sm font-black text-amber-700 dark:text-amber-600 uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-600" /> Catálogo Elite - Nível Técnico
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                        </div>

                        {eliteTecnico.map((prof, pIdx) => (
                            <div key={`tecnico-${pIdx}`} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight opacity-70">
                                        {prof.nome}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {prof.materias.map((m: MateriaConteudo) => renderMateriaCard(m, 'small'))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}

import { CARGO_ID_MAP } from '@/lib/cargos-map';
