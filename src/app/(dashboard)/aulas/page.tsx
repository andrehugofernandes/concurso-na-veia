'use client';

import Link from 'next/link';
import { MateriaConteudo, Topico } from '@/data/conteudo';
import { getProgramaDeEstudos } from '@/data/programa-estudos';
import { Badge } from '@/components/ui/badge';
import { useUserProfile } from '@/hooks/useUserProfile';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { useSetPageTitle } from '@/contexts/UIContext';
import { useAllAulasProgress } from '@/hooks/useAulaProgress';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { CARGO_ID_MAP } from '@/lib/cargos-map';

import { PROFISSOES, Profissao } from '@/lib/profissoes-edital';

export default function AulasPage() {
    const { profile: user, loading: userLoading } = useUserProfile();
    const { getProgress, loading: progressLoading } = useAllAulasProgress();

    // Define o título da página
    useSetPageTitle('Aulas');

    const isAdmin = user?.role?.toUpperCase() === 'ADMIN' || user?.role?.toUpperCase() === 'SYSADMIN';
    const isElite = user?.plan === 'elite-total' || isAdmin;
    
    // Programa base para o cargo do usuário (inclui básicas + específicas dele)
    const programaBase = getProgramaDeEstudos(user?.cargo, false);
    
    // Separação em Blocos (Básicos vs Específicos) conforme o brainstorm
    const gradeBase = programaBase.filter(m => ['portugues', 'matematica', 'ingles'].includes(m.id));
    const gradeEspecifica = programaBase.filter(m => !['portugues', 'matematica', 'ingles'].includes(m.id));
    
    // Separação Elite por Nível
    const eliteSuperior: { nome: string, materias: MateriaConteudo[] }[] = [];
    const eliteTecnico: { nome: string, materias: MateriaConteudo[] }[] = [];

    if (isElite) {
        const userCargoId = user?.cargo || 'operacao';
        const userConcursoSlug = PROFISSOES.find(p => p.id === userCargoId)?.concurso || (user as any)?.user_metadata?.concurso || 'petrobras';

        PROFISSOES.filter(prof => (prof.concurso || 'petrobras') === userConcursoSlug).forEach((prof: Profissao) => {
            // Ignorar a profissão que o usuário já está cursando (já aparece na seção principal)
            if (user?.cargo === prof.id || user?.cargo === prof.nome) return;

            const materiasDessaProf = getProgramaDeEstudos(prof.id, false)
                .filter(m => !['portugues', 'matematica', 'ingles'].includes(m.id));

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
        
        // Seção Base (Matérias transversais para o Catálogo Elite)
        const allMaterias = getProgramaDeEstudos(undefined, true);
        const ingles = allMaterias.find(m => m.id === 'ingles');
        const fisica = allMaterias.find(m => m.id === 'fisica');
        const quimica = allMaterias.find(m => m.id === 'quimica');
        const portugues = allMaterias.find(m => m.id === 'portugues');
        const matematica = allMaterias.find(m => m.id === 'matematica');

        const profUsuario = PROFISSOES.find(p => p.id === user?.cargo || p.id === CARGO_ID_MAP[user?.cargo || '']);
        const isTecnico = profUsuario?.nivel === 'tecnico' || profUsuario?.nivel === 'medio';
        
        if (isTecnico) {
            // Técnico vê as Bases do Superior
            const materiasPremiumSuperior = [];
            if (portugues) materiasPremiumSuperior.push(portugues);
            if (matematica) materiasPremiumSuperior.push(matematica);
            if (ingles) materiasPremiumSuperior.push(ingles);
            if (fisica) materiasPremiumSuperior.push(fisica);
            if (quimica) materiasPremiumSuperior.push(quimica);

            if (materiasPremiumSuperior.length > 0) {
                eliteSuperior.unshift({
                    nome: 'Bases Nível Superior (Catálogo Elite)',
                    materias: materiasPremiumSuperior
                });
            }
        } else {
            // Superior vê as Bases do Técnico
            const materiasPremiumTecnico = [];
            if (portugues) materiasPremiumTecnico.push(portugues);
            if (matematica) materiasPremiumTecnico.push(matematica);
            if (fisica) materiasPremiumTecnico.push(fisica);
            if (quimica) materiasPremiumTecnico.push(quimica);

            if (materiasPremiumTecnico.length > 0) {
                eliteTecnico.unshift({
                    nome: 'Bases Nível Técnico (Catálogo Elite)',
                    materias: materiasPremiumTecnico
                });
            }
        }
    }

    const cargoNome = user?.cargo ? programaBase.filter(m => !['portugues', 'matematica', 'ingles'].includes(m.id))[0]?.descricao.split('para ')[1] || user.cargo : '';

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
            className={`group relative flex flex-col h-full bg-slate-50/50 dark:bg-card/40 backdrop-blur-xl rounded-3xl border border-border/50 dark:border-white/5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-primary/20 overflow-hidden`}
        >
            <AnimatedBorder borderRadius="rounded-3xl" />

            {/* Header Section */}
            <div className={`${size === 'small' ? 'p-4 pb-2 md:p-6 md:pb-2' : 'p-4 pb-4 md:p-8 md:pb-6'}`}>
                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-12 h-12 text-xl flex-shrink-0 rounded-xl bg-gradient-to-br ${materia.cor} shadow-lg shadow-primary/20 transition-transform duration-500`}>
                            {materia.icone}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <h2 className="text-xl font-black text-orange-600 dark:text-orange-400 tracking-tight leading-tight uppercase hyphens-auto">
                                {materia.nome}
                            </h2>
                            <span className="mt-1.5 w-fit px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-black border border-orange-200 dark:border-orange-800/50 whitespace-nowrap">
                                {materia.topicos.length} TÓPICOS
                            </span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                        {materia.descricao}
                    </p>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-[auto_1fr] gap-x-6 gap-y-0 mb-4">
                    <div className="col-start-1 row-start-1 row-span-2 flex flex-col items-center gap-3 flex-shrink-0">
                        <div className={`flex items-center justify-center ${size === 'small' ? 'w-10 h-10 text-xl' : 'w-16 h-16 text-3xl'} rounded-2xl bg-gradient-to-br ${materia.cor} shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500`}>
                            {materia.icone}
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[9px] font-black border border-orange-200 dark:border-orange-800/50 whitespace-nowrap">
                            {materia.topicos.length} TÓPICOS
                        </span>
                    </div>

                    <div className="col-start-2 row-start-1 self-start pt-1 min-w-0">
                        <h2 className={`${size === 'small' ? 'text-2xl' : 'text-3xl'} font-black text-orange-600 dark:text-orange-400 tracking-tight group-hover:text-orange-500 transition-colors uppercase leading-none mb-3 hyphens-auto`}>
                            {materia.nome}
                        </h2>
                    </div>

                    <div className="col-start-2 row-start-2 min-w-0">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold leading-tight line-clamp-3">
                            {materia.descricao}
                        </p>
                    </div>
                </div>
            </div>

            {/* List of Topics (Preview) - Only for normal size */}
            {size === 'normal' && (
                <div className="flex-1 px-8 py-4 space-y-2">
                    {materia.topicos.slice(0, 5).map((topico) => {
                        const prog = getProgress(materia.id, topico.id);
                        const isCompleted = prog?.completed;
                        return (
                            <div key={topico.id} className="flex items-start gap-3 text-sm group/item">
                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 ${isCompleted ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-blue-400 dark:bg-blue-500 group-hover/item:bg-blue-600'}`} />
                                <span className={`transition-colors flex-1 ${isCompleted ? 'text-green-600 dark:text-green-400 font-semibold' : 'text-slate-600 dark:text-slate-400 group-hover/item:text-foreground'}`}>
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
                        <div className="text-xs text-orange-600 dark:text-orange-400 font-bold pl-5 pt-1 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
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
        <div className="p-4 md:p-10 lg:p-[80px] min-h-screen bg-slate-50/30 dark:bg-transparent">
            {/* Back Link */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8 group font-semibold">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar ao Dashboard
            </Link>

            {/* Page Header (Hero) */}
            <header className="relative mb-12 md:mb-20 p-6 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/5 border border-blue-500/10 backdrop-blur-sm overflow-hidden animate-in fade-in slide-in-from-top duration-700">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    {/* Icon Container */}
                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-[1.5rem] blur-xl group-hover:bg-blue-500/30 transition-all duration-500" />
                        <div className="relative text-4xl md:text-6xl leading-none w-fit animate-bounce-slow drop-shadow-2xl">
                            📚
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0 w-full">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-3 md:gap-5 mb-4 w-full">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
                                Jornada de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">Aulas</span>
                            </h1>
                            {isElite && (
                                <Badge className="w-fit bg-gradient-to-r from-amber-400 to-orange-600 text-white border-0 font-black px-4 py-1.5 shadow-lg shadow-orange-500/30 text-[10px] md:text-xs animate-pulse mb-1 md:mb-2">
                                    💎 ELITE TOTAL
                                </Badge>
                            )}
                        </div>
                        
                        <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl font-medium w-full leading-relaxed md:leading-snug opacity-90">
                            {cargoNome
                                ? <span>Sua Grade Completa para: <b className="text-foreground font-black underline decoration-blue-500/30 decoration-4 underline-offset-4">{cargoNome}</b></span>
                                : 'Explore as matérias, domine cada tópico do edital e alcance sua aprovação.'}
                        </p>

                        <div className="mt-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60 dark:text-blue-400/60">
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Teoria Completa</span>
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Prática Intensiva</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-20">
                {/* 1. SEÇÃO DE BASES DO USUÁRIO */}
                {gradeBase.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
                            <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Conhecimentos Básicos
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${gradeBase.length <= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
                            {gradeBase.map((m: MateriaConteudo) => renderMateriaCard(m))}
                        </div>
                    </section>
                )}

                {/* 2. SEÇÃO DE ESPECÍFICAS DO USUÁRIO */}
                {gradeEspecifica.length > 0 && (
                    <section>
                         <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                            <h2 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Conhecimentos Específicos
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${gradeEspecifica.length <= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8`}>
                            {gradeEspecifica.map((m: MateriaConteudo) => renderMateriaCard(m))}
                        </div>
                    </section>
                )}

                {/* 2. CONTEÚDO ELITE - NÍVEL SUPERIOR */}
                {isElite && eliteSuperior.length > 0 && (
                    <section className="bg-slate-100/50 dark:bg-zinc-950/20 -mx-4 md:-mx-20 p-6 md:p-20 rounded-3xl md:rounded-[4rem] border border-zinc-200/50 dark:border-white/5 space-y-12 md:space-y-16">
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

                                {prof.materias.length <= 3 ? (
                                    // Se 3 ou menos, mostra grid simples
                                    <div className={`grid grid-cols-1 md:grid-cols-2 ${prof.materias.length <= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8 auto-rows-max`}>
                                        {prof.materias.map((m: MateriaConteudo) => (
                                            <div key={m.id} className="h-full">
                                                {renderMateriaCard(m, 'normal')}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Se mais de 3, mostra em carrossel
                                    <Carousel opts={{ align: 'start', loop: true, dragFree: true }} className="w-full relative">
                                        <CarouselContent className="-ml-4">
                                            {prof.materias.map((m: MateriaConteudo) => (
                                                <CarouselItem key={m.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-[calc(100%/3-16px)] flex">
                                                    <div className="h-full w-full">
                                                        {renderMateriaCard(m, 'normal')}
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="absolute hidden lg:flex -left-12 top-1/2 -translate-y-1/2" />
                                        <CarouselNext className="absolute hidden lg:flex -right-12 top-1/2 -translate-y-1/2" />
                                    </Carousel>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* 3. CONTEÚDO ELITE - NÍVEL TÉCNICO */}
                {isElite && eliteTecnico.length > 0 && (
                    <section className="bg-zinc-50/50 dark:bg-zinc-900/10 -mx-4 md:-mx-20 p-6 md:p-20 rounded-3xl md:rounded-[4rem] border border-zinc-200/50 dark:border-white/5 space-y-12 md:space-y-16">
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

                                {prof.materias.length <= 3 ? (
                                    // Se 3 ou menos, mostra grid simples
                                    <div className={`grid grid-cols-1 md:grid-cols-2 ${prof.materias.length <= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8 auto-rows-max`}>
                                        {prof.materias.map((m: MateriaConteudo) => (
                                            <div key={m.id} className="h-full">
                                                {renderMateriaCard(m, 'normal')}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Se mais de 3, mostra em carrossel
                                    <Carousel opts={{ align: 'start', loop: true, dragFree: true }} className="w-full relative">
                                        <CarouselContent className="-ml-4">
                                            {prof.materias.map((m: MateriaConteudo) => (
                                                <CarouselItem key={m.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-[calc(100%/3-16px)] flex">
                                                    <div className="h-full w-full">
                                                        {renderMateriaCard(m, 'normal')}
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="absolute hidden lg:flex -left-12 top-1/2 -translate-y-1/2" />
                                        <CarouselNext className="absolute hidden lg:flex -right-12 top-1/2 -translate-y-1/2" />
                                    </Carousel>
                                )}
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}
