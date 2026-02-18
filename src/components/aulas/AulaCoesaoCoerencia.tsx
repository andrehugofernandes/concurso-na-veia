'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { LuBookOpen, LuVideo, LuZap, LuChevronRight, LuVolume2, LuPlay, LuImage, LuShuffle, LuPenTool, LuMessageSquare, LuLink, LuTarget, LuFileText, LuBox, LuAnchor, LuCompass, LuActivity, LuCheck } from 'react-icons/lu';
import {
    ModuleBanner,
    ContentAccordion,
    LessonTabs,
    QuizInterativo,
    FlipCard,
    CardCarousel,
    AlertBox,
    MusicPlayerCard,
    ModuleSummaryCarouselNew,
    AulaProps,
    ProgressIndicator,
    StickyModuleNav
} from './shared';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// --- POOLS DE QUESTÕES ---

const QUIZ_COESAO_POOL = [
    {
        id: 1,
        pergunta: "Em 'O técnico examinou a plataforma. Ele percebeu uma falha.', o termo 'Ele' exerce qual função de coesão?",
        opcoes: [
            { label: 'A', valor: "Coesão sequencial por conectivo." },
            { label: 'B', valor: "Coesão referencial anafórica." },
            { label: 'C', valor: "Coesão referencial catafórica." },
            { label: 'D', valor: "Coesão por elipse." },
            { label: 'E', valor: "Coerência pragmática." },
        ],
        correta: 'B',
        explicacao: "'Ele' retoma um termo já mencionado ('O técnico'), caracterizando uma anáfora (referência para trás).",
    },
    {
        id: 2,
        pergunta: "Qual dos elementos abaixo é um exemplo de coesão lexical por substituição hiperonímica?",
        opcoes: [
            { label: 'A', valor: "Carro / Veículo" },
            { label: 'B', valor: "João / Ele" },
            { label: 'C', valor: "Vender / Comprar" },
            { label: 'D', valor: "Mas / Porém" },
            { label: 'E', valor: "Plataforma / Plataforma" },
        ],
        correta: 'A',
        explicacao: "Hiperônimo é um termo de sentido mais abrangente. 'Veículo' é o hiperônimo de 'carro'.",
    },
    {
        id: 3,
        pergunta: "Assinale a frase em que há COESÃO SEQUENCIAL estabelecida por um conectivo de oposição:",
        opcoes: [
            { label: 'A', valor: "Estudou muito, portanto passou." },
            { label: 'B', valor: "Estudou muito e passou." },
            { label: 'C', valor: "Estudou muito, contudo não passou." },
            { label: 'D', valor: "Estudou muito porque queria passar." },
            { label: 'E', valor: "Estudou muito para passar." },
        ],
        correta: 'C',
        explicacao: "'Contudo' é uma conjunção adversativa, indicando oposição/contraste entre o estudo e o resultado.",
    },
    {
        id: 4,
        pergunta: "O que caracteriza a coesão por elipse?",
        opcoes: [
            { label: 'A', valor: "A repetição de palavras-chave." },
            { label: 'B', valor: "O uso de sinônimos." },
            { label: 'C', valor: "A omissão de um termo facilmente identificável pelo contexto." },
            { label: 'D', valor: "A antecipação de uma ideia que será explicada." },
            { label: 'E', valor: "O uso excessivo de conectivos." },
        ],
        correta: 'C',
        explicacao: "Elipse é a omissão de um termo que o leitor consegue recuperar mentalmente sem prejuízo à compreensão.",
    }
];

const QUIZ_COERENCIA_POOL = [
    {
        id: 1,
        pergunta: "Uma frase como 'O dia está lindo, por isso peguei meu guarda-chuva para me proteger da chuva' apresenta problema de:",
        opcoes: [
            { label: 'A', valor: "Coesão referencial." },
            { label: 'B', valor: "Coesão sequencial." },
            { label: 'C', valor: "Coerência interna (contradição)." },
            { label: 'D', valor: "Sintaxe de regência." },
            { label: 'E', valor: "Pontuação." },
        ],
        correta: 'C',
        explicacao: "Há uma contradição lógica: se o dia está lindo (sol), não faz sentido (coerência) usar guarda-chuva para se proteger da chuva no mesmo instante.",
    },
    {
        id: 2,
        pergunta: "A coerência externa (ou pragmática) refere-se à:",
        opcoes: [
            { label: 'A', valor: "Relação entre as partes do texto." },
            { label: 'B', valor: "Relação entre o texto e o conhecimento de mundo do leitor." },
            { label: 'C', valor: "Repetição de pronomes." },
            { label: 'D', valor: "Escolha adequada de conectivos." },
            { label: 'E', valor: "Correta ortografia das palavras." },
        ],
        correta: 'B',
        explicacao: "A coerência externa avalia se o texto faz sentido em relação à realidade e ao contexto sócio-histórico.",
    },
    {
        id: 3,
        pergunta: "Qual princípio de coerência é ferido em: 'Fui ao mercado. O carro é azul. Gosto de batata.'?",
        opcoes: [
            { label: 'A', valor: "Princípio da Não Contradição." },
            { label: 'B', valor: "Princípio da Relevância (ou Relação)." },
            { label: 'C', valor: "Princípio da Continuidade." },
            { label: 'D', valor: "Princípio da Progressão." },
            { label: 'E', valor: "Princípio da Coesão." },
        ],
        correta: 'B',
        explicacao: "As frases estão soltas, sem uma relação temática que as una em um sentido global (Relevância).",
    },
    {
        id: 4,
        pergunta: "Sobre a relação entre coesão e coerência, é correto afirmar que:",
        opcoes: [
            { label: 'A', valor: "Sempre que há coesão, há coerência." },
            { label: 'B', valor: "Sempre que há coerência, há coesão." },
            { label: 'C', valor: "Um texto pode ter elementos coesivos mas ser incoerente." },
            { label: 'D', valor: "Coerência é a forma, coesão é o conteúdo." },
            { label: 'E', valor: "São sinônimos perfeitos na linguística." },
        ],
        correta: 'C',
        explicacao: "É possível usar conectivos (coesão) para ligar frases que não fazem sentido lógico entre si (incoerência).",
    }
];

const QUIZ_PRATICO_POOL = [
    {
        id: 1,
        pergunta: "Assinale a alternativa que preenche corretamente a lacuna: 'A empresa investiu em tecnologia, ______ os resultados não foram os esperados.'",
        opcoes: [
            { label: 'A', valor: "portanto" },
            { label: 'B', valor: "visto que" },
            { label: 'C', valor: "entretanto" },
            { label: 'D', valor: "conforme" },
            { label: 'E', valor: "porquanto" },
        ],
        correta: 'C',
        explicacao: "O contexto exige um conectivo de oposição (adversativo), pois há um contraste entre o investimento e o resultado ruim.",
    },
    {
        id: 2,
        pergunta: "Na frase 'Os aprovados devem se apresentar amanhã. ESTES deverão trazer os documentos.', o pronome em destaque é um recurso de:",
        opcoes: [
            { label: 'A', valor: "Catáfora" },
            { label: 'B', valor: "Anáfora" },
            { label: 'C', valor: "Elipse" },
            { label: 'D', valor: "Metáfora" },
            { label: 'E', valor: "Pleonasmo" },
        ],
        correta: 'B',
        explicacao: "O pronome 'ESTES' retoma 'Os aprovados', funcionando como um elemento anafórico.",
    }
];

// --- COMPONENTES AUXILIARES ---

const Activity = ({ mode, children }: { mode: 'visible' | 'hidden'; children: React.ReactNode }) => {
    return (
        <div style={{ display: mode === 'hidden' ? 'none' : 'contents' }}>
            {children}
        </div>
    );
};

const CONCEPT_EXAMPLES = [
    { frente: "Coesão", verso: "É a ligação física e gramatical entre as palavras e frases (o 'tecido' do texto)." },
    { frente: "Coerência", verso: "É a harmonia lógica de ideias (o 'sentido' do texto)." },
    { frente: "Anáfora", verso: "Elemento que retoma algo já dito. Ex: 'Vi João. Ele estava bem.'" },
    { frente: "Catáfora", verso: "Elemento que antecipa o que será dito. Ex: 'Só quero ISTO: sua felicidade.'" },
];

const CONECTIVOS_CARDS = [
    {
        titulo: "Adversativos",
        tipo: "Oposição",
        descricao: "Mas, porém, contudo, todavia, entretanto, no entanto.",
        cor: "bg-red-500",
        icone: "⚔️"
    },
    {
        titulo: "Conclusivos",
        tipo: "Fechamento",
        descricao: "Portanto, logo, então, por isso, assim, por conseguinte.",
        cor: "bg-indigo-500",
        icone: "🏁"
    },
    {
        titulo: "Concessivos",
        tipo: "Ressalva",
        descricao: "Embora, ainda que, mesmo que, conquanto, apesar de.",
        cor: "bg-amber-500",
        icone: "⚖️"
    },
    {
        titulo: "Explicativos",
        tipo: "Justificativa",
        descricao: "Pois, porque, que, porquanto.",
        cor: "bg-emerald-500",
        icone: "💡"
    }
];

const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Coesão Textual' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Coerência Lógica' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Prática e Análise' },
];

export default function AulaCoesaoCoerencia({
    onComplete,
    isCompleted: isLessonCompleted,
    loading,
    xpGanho,
    currentProgress,
    onUpdateProgress
}: AulaProps) {
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [challengeIndex, setChallengeIndex] = useState(0);
    const [currentExample, setCurrentExample] = useState(CONCEPT_EXAMPLES[0]);
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    // Progress logic
    useEffect(() => {
        if (currentProgress >= 100 || isLessonCompleted) setShowCompletionBadge(true);
    }, [currentProgress, isLessonCompleted]);
    const progress = useMemo(() => {
        return (completedModules.size / MODULE_DEFS.length) * 100;
    }, [completedModules]);

    const handleModule1Complete = (score: number) => {
        if (score >= 70) setCompletedModules(prev => new Set(prev).add('modulo-1'));
    };
    const handleModule2Complete = (score: number) => {
        if (score >= 70) setCompletedModules(prev => new Set(prev).add('modulo-2'));
    };

    const isModuleUnlocked = (index: number) => {
        if (index === 0) return true;
        return completedModules.has(MODULE_DEFS[index - 1].id);
    };

    // Shuffled questions/challenges
    const [quizCoesaoQuestions] = useState(() => [...QUIZ_COESAO_POOL].sort(() => Math.random() - 0.5).slice(0, 4));
    const [quizCoerenciaQuestions] = useState(() => [...QUIZ_COERENCIA_POOL].sort(() => Math.random() - 0.5).slice(0, 4));
    const [quizPraticoQuestions] = useState(() => [...QUIZ_PRATICO_POOL].sort(() => Math.random() - 0.5).slice(0, 4));

    const CHALLENGES = [
        {
            wrong: "Houve um acidente, portanto ninguém se feriu.",
            correct: "Houve um acidente, mas ninguém se feriu.",
            explanation: "Incoerência sequencial: 'Portanto' indica conclusão, o que é ilógico após um acidente. O correto é usar 'Mas' (oposição)."
        },
        {
            wrong: "João comprou pão. O João estava com fome.",
            correct: "João comprou pão. Ele estava com fome.",
            explanation: "Falta de coesão referencial: a repetição desnecessária de 'João' deixa o texto cansativo. O pronome 'Ele' resolve."
        }
    ];

    const [shuffledChallenges] = useState(() => [...CHALLENGES].sort(() => Math.random() - 0.5));

    return (
        <div className="space-y-6 pb-20">
            {/* STICKY HEADER - BREAKOUT FULL WIDTH */}
            {/* Progress Bar */}
            <ProgressIndicator />

            {showCompletionBadge && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-4 shadow-sm mb-6 animate-in slide-in-from-top-4 duration-700">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                        <LuCheck size={24} strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="text-green-800 dark:text-green-300 font-bold text-lg">Aula Concluída!</h3>
                        <p className="text-green-700 dark:text-green-400 text-sm">Parabéns! Você dominou os mecanismos de Coesão e Coerência.</p>
                    </div>
                </div>
            )}
            {/* Header Block (Title) - Removed to use Page Layout Title */}

            {/* Navigation Tabs */}
            <Tabs value={activeTab} onValueChange={(val) => {
                const idx = MODULE_DEFS.findIndex(m => m.id === val);
                if (isModuleUnlocked(idx)) setActiveTab(val);
            }} className="w-full space-y-8">
                <StickyModuleNav
                    modules={Array.from(MODULE_DEFS)}
                    activeTab={activeTab}
                    completedModules={completedModules}
                    isModuleUnlocked={isModuleUnlocked}
                />
                {/* --- MÓDULO 1: COESÃO --- */}
                <Activity mode={activeTab === 'modulo-1' ? 'visible' : 'hidden'}>
                    <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 ${activeTab !== 'modulo-1' ? 'hidden' : ''}`}>
                        <ModuleBanner
                            numero={1}
                            titulo="Coesão Textual"
                            descricao="A coesão é a conexão gramatical e lexical entre as partes de um texto. É como a argamassa que une os tijolos de uma parede."
                            gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"
                        />

                        {/* 1.1 Coesão Referencial */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-400 font-mono">1</span>
                                Coesão Referencial
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Ocorre quando um termo retoma ou antecipa outro termo dentro do texto, evitando repetições desnecessárias.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-muted/30 rounded-xl border border-border/50">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <LuAnchor className="text-indigo-500" /> Anáfora
                                    </h3>
                                    <p className="text-sm mb-4">Retoma algo que já foi dito.</p>
                                    <div className="bg-background p-3 rounded-lg border border-border text-xs italic">
                                        "O <strong>relatório</strong> ficou pronto. <strong>Ele</strong> será enviado amanhã."
                                    </div>
                                </div>
                                <div className="p-6 bg-muted/30 rounded-xl border border-border/50">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <LuCompass className="text-purple-500" /> Catáfora
                                    </h3>
                                    <p className="text-sm mb-4">Antecipa o que será dito a seguir.</p>
                                    <div className="bg-background p-3 rounded-lg border border-border text-xs italic">
                                        "Eu só quero <strong>isto</strong>: sua total <strong>atenção</strong>."
                                    </div>
                                </div>
                            </div>

                            <ContentAccordion
                                titulo="Mecanismos de Substituição"
                                icone="🔄"
                                corIndicador="bg-indigo-500"
                                slides={[
                                    {
                                        titulo: "Sinonímia e Hiperonímia",
                                        icone: "🎓",
                                        conteudo: (
                                            <div className="space-y-4">
                                                <p>Substituir uma palavra por outra de sentido igual (sinônimo) ou mais amplo (hiperônimo).</p>
                                                <ul className="list-disc list-inside text-sm space-y-2">
                                                    <li><strong>Sinônimo:</strong> "Comprei um <strong>automóvel</strong>. O <strong>carro</strong> é novo."</li>
                                                    <li><strong>Hiperônimo:</strong> "Ele gosta de <strong>rosas</strong>. Essas <strong>flores</strong> são lindas."</li>
                                                </ul>
                                            </div>
                                        )
                                    },
                                    {
                                        titulo: "Elipse (Omissão)",
                                        icone: "👻",
                                        conteudo: (
                                            <p>A omissão de um termo que fica subentendido. <br className="mb-2" /> Ex: "Eles chegaram tarde, [eles] estavam cansados."</p>
                                        )
                                    }
                                ]}
                            />
                        </section>

                        {/* 1.2 Coesão Sequencial */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-lg font-bold text-purple-700 dark:text-purple-400 font-mono">2</span>
                                Coesão Sequencial
                            </h2>
                            <p className="text-muted-foreground">
                                Trata-se do uso de <strong>conectivos</strong> (conjunções, advérbios) para criar relações lógicas entre as orações e parágrafos.
                            </p>

                            <CardCarousel
                                titulo="Conectivos Essenciais"
                                subtitulo="Os operadores argumentativos que guiam o sentido do texto."
                                numeroBadge={2}
                                cards={CONECTIVOS_CARDS}
                            />
                        </section>

                        {/* 1.3 Resumo Módulo 1 */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-400">3</span>
                                Resumo do Módulo 1
                            </h2>
                            <LessonTabs
                                tabs={[
                                    {
                                        id: 'resumo',
                                        label: 'Resumo Visual',
                                        icon: LuBookOpen,
                                        content: (
                                            <ModuleSummaryCarouselNew
                                                images={[
                                                    { title: 'Mapa Mental: Coesão Referencial', type: 'Mapa Mental', placeholderColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
                                                    { title: 'Fluxograma: Conectivos de Oposição', type: 'Diagrama', placeholderColor: 'bg-rose-100 dark:bg-rose-900/30' },
                                                    { title: 'Infográfico: Princípios da Coerência', type: 'Infográfico', placeholderColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
                                                    { title: 'Card: Anáfora vs Catáfora', type: 'Card', placeholderColor: 'bg-blue-100 dark:bg-blue-900/30' },
                                                    { title: 'Diagrama: Substituição Lexical', type: 'Diagrama', placeholderColor: 'bg-purple-100 dark:bg-purple-900/30' },
                                                ]}
                                            />
                                        ),
                                    },
                                    {
                                        id: 'video',
                                        label: 'Vídeo Aula',
                                        icon: LuPlay,
                                        content: (
                                            <div className="aspect-video rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center group cursor-pointer relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                                <div className="relative z-20 flex flex-col items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                                        <LuPlay className="text-white w-8 h-8 ml-1" />
                                                    </div>
                                                    <p className="text-white font-bold text-lg">Assistir: Engenharia da Coesão</p>
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        id: 'audio',
                                        label: 'Áudio Resumo',
                                        icon: LuVolume2,
                                        content: (
                                            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                                                <div className="w-full max-w-md">
                                                    <MusicPlayerCard
                                                        audioUrl="#"
                                                        titulo="Conectando as Ideias"
                                                        artista="Prof. Coesivo"
                                                    />
                                                </div>
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </section>

                        {/* QUIZ Módulo 1 */}
                        <section id="quiz-modulo-1" className="mt-16">
                            <QuizInterativo
                                questoes={quizCoesaoQuestions}
                                titulo="Quiz de Fixação: Coesão Textual"
                                icone="💬"
                                numero={4}
                                onComplete={handleModule1Complete}
                            />
                        </section>
                    </div>
                </Activity>

                {/* --- MÓDULO 2: COERÊNCIA --- */}
                <Activity mode={activeTab === 'modulo-2' ? 'visible' : 'hidden'}>
                    <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 ${activeTab !== 'modulo-2' ? 'hidden' : ''}`}>
                        <ModuleBanner
                            numero={2}
                            titulo="Coerência Lógica"
                            descricao="A coerência é a unidade de sentido do texto. Ela garante que a mensagem seja compreensível e não contraditória."
                            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
                        />

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg font-bold text-emerald-700 dark:text-emerald-400 shrink-0">1</span>
                                Os Três Pilares da Coerência
                            </h2>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-6 bg-muted/20 border border-border rounded-xl space-y-4">
                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-xl">🚫</div>
                                    <h3 className="font-bold">Não-Contradição</h3>
                                    <p className="text-xs text-muted-foreground">Ideias não podem se anular mutuamente no mesmo contexto.</p>
                                </div>
                                <div className="p-6 bg-muted/20 border border-border rounded-xl space-y-4">
                                    <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center text-xl">📈</div>
                                    <h3 className="font-bold">Progressão</h3>
                                    <p className="text-xs text-muted-foreground">O texto deve trazer informações novas conforme avança.</p>
                                </div>
                                <div className="p-6 bg-muted/20 border border-border rounded-xl space-y-4">
                                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-xl">🎯</div>
                                    <h3 className="font-bold">Relevância</h3>
                                    <p className="text-xs text-muted-foreground">Todas as partes devem contribuir para o tema central.</p>
                                </div>
                            </div>

                            <AlertBox tipo="info" titulo="Coesão vs Coerência">
                                Um texto pode ser <strong>coesivo</strong> (bem ligado gramaticalmente) mas <strong>incoerente</strong> (sem sentido lógico). <br />
                                Ex: "Fui à praia porque estava nevando, logo aproveitei e comprei um foguete." (Há conectivos, mas a lógica é inexistente).
                            </AlertBox>
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Conceitos Fundamentais</h2>
                            <FlipCard
                                numero={1}
                                frente={currentExample.frente}
                                verso={currentExample.verso}
                            />
                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        const random = Math.floor(Math.random() * CONCEPT_EXAMPLES.length);
                                        setCurrentExample(CONCEPT_EXAMPLES[random]);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
                                >
                                    <LuShuffle className="w-3 h-3" /> Ver outro conceito
                                </button>
                            </div>
                        </section>

                        {/* QUIZ Módulo 2 */}
                        <section id="quiz-modulo-2" className="mt-16">
                            <QuizInterativo
                                questoes={quizCoerenciaQuestions}
                                titulo="Quiz de Coerência Lógica"
                                icone="🧠"
                                numero={2}
                                onComplete={handleModule2Complete}
                            />
                        </section>
                    </div>
                </Activity>

                {/* --- MÓDULO 3: PRÁTICA --- */}
                <Activity mode={activeTab === 'modulo-3' ? 'visible' : 'hidden'}>
                    <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 ${activeTab !== 'modulo-3' ? 'hidden' : ''}`}>
                        <ModuleBanner
                            numero={3}
                            titulo="Prática e Análise"
                            descricao="Agora vamos analisar textos reais e aplicar as estratégias de prova da Cesgranrio."
                            gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
                        />

                        {/* Desafio Prático */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-lg font-bold text-red-700 dark:text-red-400">1</span>
                                Desafio: Identifique a Incoerência
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h4 className="font-bold text-red-500 flex items-center gap-2">❌ Frase com Problema</h4>
                                    <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 rounded-2xl">
                                        <p className="text-lg font-medium italic">"{shuffledChallenges[challengeIndex].wrong}"</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-bold text-emerald-500 flex items-center gap-2">✅ Versão Corrigida</h4>
                                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl">
                                        <p className="text-lg font-bold mb-3">"{shuffledChallenges[challengeIndex].correct}"</p>
                                        <div className="p-3 bg-white/60 dark:bg-black/20 rounded-lg text-sm text-emerald-800 dark:text-emerald-300">
                                            <strong>Por quê?</strong> {shuffledChallenges[challengeIndex].explanation}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={() => setChallengeIndex((prev) => (prev + 1) % shuffledChallenges.length)}
                                    className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2"
                                >
                                    <LuZap className="w-4 h-4" /> Próximo Desafio
                                </button>
                            </div>
                        </section>

                        {/* QUIZ FINAL */}
                        <section id="quiz-final" className="mt-16">
                            <QuizInterativo
                                questoes={quizPraticoQuestions}
                                titulo="Simulado Final"
                                icone="🏆"
                                numero={3}
                                onComplete={(score) => {
                                    if (score >= 70) {
                                        localStorage.setItem('coesao-completed', 'true');
                                    }
                                }}
                            />
                        </section>
                    </div>
                </Activity>
            </Tabs>


        </div>
    );
}
