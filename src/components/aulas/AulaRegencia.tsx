'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    LuCheck,
    LuTrophy,
    LuTarget,
    LuLayers,
    LuTriangleAlert,
    LuBookOpen,
    LuLock,
    LuArrowRight,
    LuPlay,
    LuImage,
    LuVolume2,
    LuZap,
    LuAnchor,
    LuShieldCheck,
    LuFactory,
    LuBrain,
    LuChevronRight,
    LuMusic
} from 'react-icons/lu';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import {
    AlertBox,
    CardCarousel,
    ContentAccordion,
    ModuleBanner,
    QuizInterativo,
    FlipCard,
    LessonTabs,
    ModuleSummaryCarouselNew,
    MusicPlayerCard,
    VideoModal,
    QuizQuestion,
    getRandomQuestions,
    ProgressIndicator,
    AulaProps,
    StickyModuleNav
} from './shared';

import { progressService } from '@/lib/services/progress';

// ── Tipos e Configurações ──────────────────────────────────────────────────

const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Regência Nominal' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Regência Verbal' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Casos Particulares' }
];

const PROGRESS_PER_MODULE = Math.floor(100 / MODULE_DEFS.length);

const Activity = ({ mode, children }: { mode: 'visible' | 'hidden'; children: React.ReactNode }) => {
    return (
        <div style={{ display: mode === 'hidden' ? 'none' : 'contents' }}>
            {children}
        </div>
    );
};

// ── Questões do Módulo 1 (Nominal) ────────────────────────────────────────

const QUIZ_M1_POOL: QuizQuestion[] = [
    {
        id: 101,
        pergunta: "Na frase 'O técnico é favorável ___ novas normas de segurança', qual preposição completa a regência nominal?",
        opcoes: [
            { label: 'A', valor: "com" },
            { label: 'B', valor: "às" },
            { label: 'C', valor: "nas" },
            { label: 'D', valor: "por" }
        ],
        correta: 'B',
        explicacao: "O nome 'favorável' exige a preposição 'a'. Como 'novas normas' é feminino plural, ocorre a crase."
    },
    {
        id: 102,
        pergunta: "Qual dos nomes abaixo exige a preposição 'de' em sua regência?",
        opcoes: [
            { label: 'A', valor: "Acessível" },
            { label: 'B', valor: "Atento" },
            { label: 'C', valor: "Passível" },
            { label: 'D', valor: "Útil" }
        ],
        correta: 'C',
        explicacao: "'Passível' rege a preposição 'de' (ex: Passível de punição). Acessível a, Atento a/em, Útil a/para."
    }
];

// ── Questões do Módulo 2 (Verbal Geral) ───────────────────────────────────

const QUIZ_M2_POOL: QuizQuestion[] = [
    {
        id: 201,
        pergunta: "O verbo 'Preferir' possui uma regência específica muito cobrada. Identifique a alternativa correta:",
        opcoes: [
            { label: 'A', valor: "Prefiro mais o turno da manhã do que o da noite." },
            { label: 'B', valor: "Prefiro o turno da manhã antes que o da noite." },
            { label: 'C', valor: "Prefiro o turno da manhã ao da noite." },
            { label: 'D', valor: "Prefiro mil vezes o turno da manhã do que o da noite." }
        ],
        correta: 'C',
        explicacao: "O verbo 'Preferir' rege a estrutura 'preferir algo A outra coisa'. É erro usar 'do que', 'mais' ou 'mil vezes'."
    }
];

// ── Questões do Módulo 3 (Cesgranrio) ─────────────────────────────────────

const QUIZ_FINAL_POOL: QuizQuestion[] = [
    {
        id: 301,
        pergunta: "Segundo a norma culta e a banca Cesgranrio, em qual frase o verbo 'ASSISTIR' está corretamente empregado com sentido de 'ver'?",
        opcoes: [
            { label: 'A', valor: "Todos assistiram o treinamento de combate a incêndio." },
            { label: 'B', valor: "Todos assistiram ao treinamento de combate a incêndio." },
            { label: 'C', valor: "O médico assistiu ao paciente com dedicação." },
            { label: 'D', valor: "Essa lei assiste o direito de todos." }
        ],
        correta: 'B',
        explicacao: "Com sentido de 'presenciar/ver', o verbo ASSISTIR é Transitivo Indireto e exige a preposição 'A'."
    }
];

// ── Componente Principal ──────────────────────────────────────────────────

export default function AulaRegencia({ onUpdateProgress, onComplete, isCompleted, currentProgress }: AulaProps) {
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    // Pools de questões sorteados
    const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
    const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
    const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 2));
        setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 1));
        setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 1));

        // Carregar progresso inicial
        const loadInitial = async () => {
            const allProgress = await progressService.getProgress('regencia');
            const done = allProgress.filter(p => p.completed).map(p => p.moduleId);
            setCompletedModules(new Set(done));

            if (done.length > 0) {
                const lastIdx = MODULE_DEFS.findIndex(m => m.id === done[done.length - 1]);
                if (lastIdx < MODULE_DEFS.length - 1) setActiveTab(MODULE_DEFS[lastIdx + 1].id);
            }
        };
        loadInitial();
    }, []);

    useEffect(() => {
        if (currentProgress >= 100 || isCompleted) setShowCompletionBadge(true);
    }, [currentProgress, isCompleted]);

    const handleModuleProgress = (moduleId: string, index: number, score: number) => {
        const newCompleted = new Set(completedModules);
        newCompleted.add(moduleId);
        setCompletedModules(newCompleted);

        const progressPercent = Math.min((index + 1) * PROGRESS_PER_MODULE, 100);

        progressService.saveProgress({
            lessonId: 'regencia',
            moduleId: moduleId,
            score: score,
            completed: true,
            readPercentage: progressPercent
        });

        if (onUpdateProgress) onUpdateProgress(progressPercent);

        if (index < MODULE_DEFS.length - 1) {
            setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
        } else {
            setShowCompletionBadge(true);
            if (onComplete) onComplete();
        }
    };

    const isModuleUnlocked = (index: number) => {
        if (index === 0) return true;
        return completedModules.has(MODULE_DEFS[index - 1].id);
    };

    return (
        <Tabs value={activeTab} onValueChange={(val) => {
            const idx = MODULE_DEFS.findIndex(m => m.id === val);
            if (isModuleUnlocked(idx)) setActiveTab(val);
        }} className="w-full space-y-12">

            <StickyModuleNav
                modules={Array.from(MODULE_DEFS)}
                activeTab={activeTab}
                completedModules={completedModules}
                isModuleUnlocked={isModuleUnlocked}
            />

            {/* MÓDULO 1: NOMINAL */}
            <Activity mode={activeTab === 'modulo-1' ? 'visible' : 'hidden'}>
                <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ModuleBanner
                        numero={1}
                        titulo="Sintaxe da Regência Nominal"
                        descricao="Estudo sistemático das relações de subordinação entre nomes (substantivos, adjetivos e advérbios) e seus respectivos complementos, fundamentado na gramática de Bechara."
                        gradiente="bg-gradient-to-br from-violet-900 via-indigo-950 to-black"
                    />

                    {/* FUNDAMENTAÇÃO TEÓRICA - CIÊNCIA ANTES DO FLOREIO */}
                    <section className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800">
                                <LuBookOpen size={32} />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Fundamentos da Sintaxe de Regência</h2>
                        </div>

                        <div className="space-y-10">
                            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-4xl">
                                A regência estuda as relações em que certas palavras exigem a presença de outras para completar sua significação. Esse elo de subordinação é o que garante a coesão gramatical da frase.
                            </p>

                            <div className="space-y-6">
                                <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xl">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-black mr-2">1</span>
                                    Anatomia da Regência: O Elo de Ligação
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Veja como o Termo Regente se conecta ao Termo Regido através da preposição, formando uma unidade de sentido indissociável.
                                </p>

                                <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
                                    {/* Exemplo 1: Adjetivo */}
                                    <div className="flex flex-col md:flex-row items-center gap-4 group">
                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">Adjetivo (Regente)</span>
                                            <span className="text-xl font-bold tracking-tight">O técnico está <span className="text-indigo-600 underline decoration-2 underline-offset-4">apto</span></span>
                                        </div>

                                        <div className="flex flex-col items-center gap-1 z-10">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                                                <LuArrowRight className="rotate-90 md:rotate-0" size={20} />
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">ao</span>
                                        </div>

                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">Termo Regido</span>
                                            <span className="text-xl font-bold tracking-tight text-emerald-600">serviço</span>
                                        </div>
                                    </div>

                                    {/* Exemplo 2: Substantivo (Novo) */}
                                    <div className="flex flex-col md:flex-row items-center gap-4 group">
                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">Substantivo (Regente)</span>
                                            <span className="text-xl font-bold tracking-tight">Devemos ter <span className="text-indigo-600 underline decoration-2 underline-offset-4">obediência</span></span>
                                        </div>

                                        <div className="flex flex-col items-center gap-1 z-10">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                                                <LuArrowRight className="rotate-90 md:rotate-0" size={20} />
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">às</span>
                                        </div>

                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">Termo Regido</span>
                                            <span className="text-xl font-bold tracking-tight text-emerald-600">normas</span>
                                        </div>
                                    </div>

                                    {/* Exemplo 3: Substantivo */}
                                    <div className="flex flex-col md:flex-row items-center gap-4 group">
                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">Substantivo (Regente)</span>
                                            <span className="text-xl font-bold tracking-tight">O projeto tem <span className="text-indigo-600 underline decoration-2 underline-offset-4">vínculo</span></span>
                                        </div>

                                        <div className="flex flex-col items-center gap-1 z-10">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                                                <LuArrowRight className="rotate-90 md:rotate-0" size={20} />
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">com</span>
                                        </div>

                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">Termo Regido</span>
                                            <span className="text-xl font-bold tracking-tight text-emerald-600">a meta</span>
                                        </div>
                                    </div>

                                    {/* Exemplo 4: Advérbio */}
                                    <div className="flex flex-col md:flex-row items-center gap-4 group">
                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">Advérbio (Regente)</span>
                                            <span className="text-xl font-bold tracking-tight">A sonda opera <span className="text-indigo-600 underline decoration-2 underline-offset-4">longe</span></span>
                                        </div>

                                        <div className="flex flex-col items-center gap-1 z-10">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                                                <LuArrowRight className="rotate-90 md:rotate-0" size={20} />
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">da</span>
                                        </div>

                                        <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                                            <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">Termo Regido</span>
                                            <span className="text-xl font-bold tracking-tight text-emerald-600">plataforma</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STORYTELLING CONTEXTUALIZADO */}
                    <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 font-black text-9xl text-slate-900">
                            RE
                        </div>
                        <div className="max-w-3xl space-y-6 relative z-10">
                            <div className="inline-block px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
                                Engenharia da Linguagem
                            </div>
                            <h2 className="text-3xl font-bold">A Precisão Semântica na Operação</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 italic leading-relaxed">
                                "A teoria gramatical traduz-se em segurança operacional. Considere o verbo **Assistir**. Na norma culta, 'assistir ao técnico' (indireto) significa observar, enquanto 'assistir o técnico' (direto) significa prestar auxílio. Uma ambiguidade nesta regência pode comprometer protocolos de emergência."
                            </p>
                        </div>
                    </section>

                    <ContentAccordion
                        titulo="A Força de Atração Nominal"
                        icone={<span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-black mr-2">2</span>}
                        corIndicador="bg-indigo-500"
                        defaultOpen={true}
                        slides={[
                            {
                                titulo: "Conceito do Ímã",
                                icone: "1️⃣",
                                conteudo: (
                                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                            <h3 className="font-bold text-lg mb-4">Morfossintaxe da Regência Nominal</h3>
                                            <p className="leading-relaxed">
                                                A regência nominal estuda o comportamento dos substantivos, adjetivos e advérbios que exigem um complemento (Complemento Nominal). Essa relação é **sempre mediada por uma preposição**.
                                            </p>
                                            <ul className="mt-4 space-y-2 text-sm">
                                                <li>• **Exigência Normativa:** Diferente de alguns verbos, os nomes nunca se ligam diretamente ao seu regido.</li>
                                                <li>• **Preposições Frequentes:** *A, de, em, para, com, por*.</li>
                                            </ul>
                                        </div>
                                        <div className="bg-indigo-500/5 rounded-xl border border-indigo-500/20 p-4">
                                            <p className="font-bold text-sm mb-2                       text-indigo-600 dark:text-indigo-400">Exemplo da Norma Culta:</p>
                                            <p className="italic">"A sua atitude foi **passível** (Regente) **de** (Preposição) **crítica** (Regido)."</p>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                titulo: "Nomes de Alta Frequência",
                                icone: "2️⃣",
                                conteudo: (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Favorável a</h4>
                                            <p className="text-sm">"Sou <strong>favorável às</strong> mudanças."</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Passível de</h4>
                                            <p className="text-sm">"O erro é <strong>passível de</strong> multa."</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Aliado a</h4>
                                            <p className="text-sm">"O esforço está <strong>aliado à</strong> técnica."</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Referente a</h4>
                                            <p className="text-sm">"Dados <strong>referentes ao</strong> lucro."</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Apto a/para</h4>
                                            <p className="text-sm">"Ele está <strong>apto ao</strong> serviço."</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Atento a/em</h4>
                                            <p className="text-sm">"Fique <strong>atento aos</strong> sinais."</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Útil a/para</h4>
                                            <p className="text-sm">"O curso será <strong>útil para</strong> você."</p>
                                        </div>
                                        <div className="p-4 bg-card rounded-xl border border-border">
                                            <h4 className="font-bold text-indigo-500 mb-2">Ansioso por/para</h4>
                                            <p className="text-sm">"Estou <strong>ansioso pelo</strong> resultado."</p>
                                        </div>
                                    </div>
                                )
                            }
                        ]}
                    />

                    <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-black">3</div>
                            <h2 className="text-3xl font-bold">Resumo Estratégico</h2>
                        </div>
                        <LessonTabs
                            tabs={[
                                {
                                    id: 'video',
                                    label: 'Vídeo Aula',
                                    icon: LuPlay,
                                    content: (
                                        <VideoModal
                                            videoId="dQw4w9WgXcQ"
                                            title="Regência Nominal Descomplicada"
                                            duration="05:30"
                                            thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
                                        />
                                    )
                                },
                                {
                                    id: 'resumo',
                                    label: 'Resumo Visual',
                                    icon: LuBookOpen,
                                    content: (
                                        <ModuleSummaryCarouselNew
                                            tituloAula="Regência"
                                            materia="Português"
                                            profissao="Concurso Petrobras"
                                            moduloNome="Regência Nominal"
                                            images={[
                                                { title: 'O Ímã Nominal', type: 'Infográfico', placeholderColor: 'bg-indigo-900/10' },
                                                { title: 'Lista de Preposições', type: 'Tabela', placeholderColor: 'bg-slate-900/10' },
                                                { title: 'Mapa Mental: Nominal', type: 'Mapa Mental', placeholderColor: 'bg-emerald-900/10' }
                                            ]}
                                        />
                                    )
                                },
                                {
                                    id: 'visual',
                                    label: 'Macete Visual',
                                    icon: LuBrain,
                                    content: (
                                        <div className="p-8 text-center space-y-6">
                                            <div className="text-7xl">🏗️ 🔗</div>
                                            <h3 className="text-2xl font-bold">Os Vergalhões da Frase</h3>
                                            <p className="text-muted-foreground text-lg italic">
                                                "Pense na preposição como o vergalhão que une dois blocos de cimento. Sem a preposição 'a' em 'favorável', os blocos se soltam e a frase desmorona."
                                            </p>
                                        </div>
                                    )
                                },
                                {
                                    id: 'audio',
                                    label: 'Áudio Resumo',
                                    icon: LuMusic,
                                    content: (
                                        <MusicPlayerCard
                                            audioUrl="#"
                                            titulo="Regência Nominal: Rap dos Nomes"
                                            artista="MC Gramática"
                                            capaUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop"
                                            lyrics={`Favorável a, passível de...\nSe o nome exige, você tem que saber...\nA preposição é o elo do poder!`}
                                        />
                                    )
                                }
                            ]}
                        />
                    </section>

                    <QuizInterativo
                        numero={4}
                        titulo="Quiz de Fixação - Regência Nominal"
                        icone="🎯"
                        questoes={quizM1}
                        onComplete={(score) => handleModuleProgress('modulo-1', 0, score)}
                    />
                </div>
            </Activity>

            {/* MÓDULO 2: VERBAL GERAL */}
            <Activity mode={activeTab === 'modulo-2' ? 'visible' : 'hidden'}>
                <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ModuleBanner
                        numero={2}
                        titulo="Sintaxe da Regência Verbal"
                        descricao="Análise da transitividade verbal e da seleção de argumentos preposicionados ou diretos."
                        gradiente="bg-gradient-to-br from-indigo-900 via-violet-950 to-black"
                    />

                    <ContentAccordion
                        titulo="Teoria da Transitividade e Regência"
                        icone="📖"
                        corIndicador="bg-slate-500"
                        slides={[
                            {
                                titulo: "Conceitos de Transitividade",
                                icone: "1️⃣",
                                conteudo: (
                                    <div className="space-y-4">
                                        <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                                            <p>
                                                A Regência Verbal estuda a relação que se estabelece entre os verbos (**termos regentes**) e seus complementos (**termos regidos**). A transitividade é a base para entendermos se a regência é direta ou indireta.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-6 bg-card rounded-xl border border-border border-l-4 border-l-slate-500">
                                                <h4 className="font-extrabold text-lg mb-2 text-slate-600">Conexão Direta (VTD)</h4>
                                                <p className="text-sm text-muted-foreground">O verbo exige complemento sem auxílio de preposição obrigatória. O termo regido é o **Objeto Direto**.</p>
                                                <p className="mt-2 text-xs font-mono">Ex: Encontramos (VTD) os dados (OD).</p>
                                            </div>
                                            <div className="p-6 bg-card rounded-xl border border-border border-l-4 border-l-slate-400">
                                                <h4 className="font-extrabold text-lg mb-2 text-slate-500">Conexão Indireta (VTI)</h4>
                                                <p className="text-sm text-muted-foreground">O verbo exige o uso de preposição para ligar-se ao complemento (**Objeto Indireto**).</p>
                                                <p className="mt-2 text-xs font-mono">Ex: Precisamos (VTI) de (Preposição) dados (OI).</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                titulo: "A Regência do Verbo 'Preferir'",
                                icone: "2️⃣",
                                conteudo: (
                                    <div className="space-y-4 bg-muted/30 p-6 rounded-2xl border border-border">
                                        <h3 className="font-bold text-lg">Padrão Normativo</h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            Do ponto de vista normativo, o verbo **Preferir** é transitivo direto e indireto. Exige dois complementos: um sem preposição e outro regido pela preposição **A**.
                                        </p>
                                        <div className="bg-red-500/10 p-4 rounded-xl text-red-700 dark:text-red-400 font-mono text-sm">
                                            ❌ Prefiro café do que chá.
                                        </div>
                                        <div className="bg-emerald-500/10 p-4 rounded-xl text-emerald-700 dark:text-emerald-400 font-mono text-sm">
                                            ✅ Preferir algo **A** outra coisa.
                                        </div>
                                    </div>
                                )
                            }
                        ]}
                    />

                    <AlertBox tipo="warning" titulo="Observação Técnica: Analogia da Válvula">
                        <div className="flex items-center gap-3">
                            <LuZap className="text-yellow-500" size={24} />
                            <p className="font-bold">Nota Explicativa:</p>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Para fins didáticos, pode-se comparar o fluxo gramatical a um sistema hidráulico: Se o fluxo é contínuo, a regência é direta. Se requer um conector (preposição), a regência é indireta.
                        </p>
                    </AlertBox>

                    <QuizInterativo
                        numero={3}
                        titulo="Quiz de Fixação - Regência Verbal"
                        icone="📝"
                        questoes={quizM2}
                        onComplete={(score) => handleModuleProgress('modulo-2', 1, score)}
                    />
                </div>
            </Activity>

            {/* MÓDULO 3: CESGRANRIO (CAMPO MINADO) */}
            <Activity mode={activeTab === 'modulo-3' ? 'visible' : 'hidden'}>
                <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ModuleBanner
                        numero={3}
                        titulo="Análise de Casos Específicos"
                        descricao="Estudo aprofundado de verbos com múltiplos padrões de regência e suas respectivas implicações semânticas."
                        gradiente="bg-gradient-to-br from-violet-900 via-indigo-950 to-black"
                    />

                    <div className="space-y-8">
                        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                            <h3 className="font-bold text-2xl mb-4 text-slate-900 dark:text-slate-100">Polissemia de Regência</h3>
                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed">
                                    Certos verbos apresentam alteração de sentido conforme o padrão de regência aplicado. A escolha da transitividade (direta ou indireta) altera o campo semântico do enunciado, exigindo precisão na seleção prepositiva.
                                </p>
                            </div>
                        </div>

                        <CardCarousel
                            titulo="Padrões de Verbos Polissêmicos"
                            subtitulo="Análise técnica dos sentidos normativos e distinções sintáticas."
                            cards={[
                                {
                                    icone: <LuTarget className="text-slate-500" />,
                                    titulo: "Assistir",
                                    descricao: (
                                        <div className="text-xs space-y-3 font-mono">
                                            <p>• **VTI (prep. A):** Presenciar, ver. <br /><span className="text-slate-400">Ex: "Assistir ao treinamento."</span></p>
                                            <p>• **VTD (sem prep.):** Socorrer, ajudar. <br /><span className="text-slate-400">Ex: "Assistir o acidentado."</span></p>
                                            <p>• **VI (prep. EM):** Residir. <br /><span className="text-slate-400">Ex: "Assistir em unidade remota."</span></p>
                                        </div>
                                    )
                                },
                                {
                                    icone: <LuTarget className="text-slate-500" />,
                                    titulo: "Aspirar",
                                    descricao: (
                                        <div className="text-xs space-y-3 font-mono">
                                            <p>• **VTD (sem prep.):** Sorver, cheirar. <br /><span className="text-slate-400">Ex: "Aspirar o ar condicionado."</span></p>
                                            <p>• **VTI (prep. A):** Desejar, pretender. <br /><span className="text-slate-400">Ex: "Aspirar ao cargo de gestão."</span></p>
                                        </div>
                                    )
                                },
                                {
                                    icone: <LuTarget className="text-slate-500" />,
                                    titulo: "Visar",
                                    descricao: (
                                        <div className="text-xs space-y-3 font-mono">
                                            <p>• **VTD (sem prep.):** Rubricar ou mirar. <br /><span className="text-slate-400">Ex: "Visar o atestado técnico."</span></p>
                                            <p>• **VTI (prep. A):** Objetivar. <br /><span className="text-slate-400">Ex: "Visar à máxima eficiência."</span></p>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </div>

                    <section className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-slate-800 text-white">
                                <LuCheck size={24} />
                            </div>
                            <h2 className="text-3xl font-black">Consolidação Normativa</h2>
                        </div>
                        <LessonTabs
                            tabs={[
                                {
                                    id: 'resumo',
                                    label: 'Quadro Sinótico',
                                    icon: LuBookOpen,
                                    content: (
                                        <div className="space-y-6">
                                            <p className="text-sm italic text-slate-500">Representação visual das principais regências abordadas.</p>
                                            <ModuleSummaryCarouselNew
                                                tituloAula="Sintaxe de Regência"
                                                materia="Gramática Normativa"
                                                profissao="Nível Superior/Técnico"
                                                moduloNome="Casos Específicos"
                                                images={[
                                                    { title: 'Quadro: Verbos Polissêmicos', type: 'Tabela', placeholderColor: 'bg-slate-900/10' },
                                                    { title: 'Hierarquia Sintática', type: 'Infográfico', placeholderColor: 'bg-slate-900/10' },
                                                    { title: 'Guia de Regência Nominal', type: 'Mapa Mental', placeholderColor: 'bg-slate-900/10' }
                                                ]}
                                            />
                                        </div>
                                    )
                                },
                                {
                                    id: 'visual',
                                    label: 'Nota de Atenção',
                                    icon: LuZap,
                                    content: (
                                        <div className="p-8 text-center space-y-6">
                                            <div className="text-7xl opacity-20">📖</div>
                                            <h3 className="text-2xl font-bold">Observação Gramatical</h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                                                "A regência não é um conjunto isolado de decoreba, mas a alma da clareza textual. Errar a regência é alterar o que se diz, não apenas como se diz."
                                            </p>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </section>

                    <QuizInterativo
                        numero={3}
                        titulo="Quiz de Fixação - Regência Verbal"
                        icone="🏆"
                        questoes={quizFinal}
                        onComplete={(score) => handleModuleProgress('modulo-3', 2, score)}
                    />

                    {/* CARD DE CONCLUSÃO MANUAL */}
                    <section className="mt-12 mb-8">
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-orange-900/5 border border-orange-100 dark:border-orange-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                                    <LuBookOpen className="text-orange-500 text-3xl" /> Missão Cumprida
                                </h3>
                                <p className="text-muted-foreground text-lg">
                                    Você domina as regências que derrubam 90% dos candidatos. Role para finalizar a lição.
                                </p>
                            </div>

                            <Button
                                size="lg"
                                onClick={() => {
                                    setShowCompletionBadge(true);
                                    if (onComplete) onComplete();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all outline-none"
                            >
                                Finalizar e Ganhar XP
                            </Button>
                        </div>
                    </section>
                </div>
            </Activity>

        </Tabs>
    );
}
