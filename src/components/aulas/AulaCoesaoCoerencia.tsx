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
    StickyModuleNav,
    Activity
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

const CONCEPT_EXAMPLES = [
    { frente: "Coesão", verso: "É a ligação física e gramatical entre as palavras e frases (o 'tecido' do texto)." },
    { frente: "Coerência", verso: "É a harmonia lógica de ideias (o 'sentido' do texto)." },
    { frente: "Anáfora", verso: "Elemento que retoma algo já dito. Ex: 'Vi João. Ele estava bem.'" },
    { frente: "Catáfora", verso: "Elemento que antecipa o que será dito. Ex: 'Só quero ISTO: sua felicidade.'" },
];

const CONECTIVOS_CARDS = [
    {
        titulo: "Adversativos",
        descricao: "Mas, porém, contudo, todavia, entretanto, no entanto.",
        exemplo: "Estudou muito para a prova, mas não conseguiu a aprovação.",
        corFundo: "bg-red-500/10",
        icone: "⚔️"
    },
    {
        titulo: "Conclusivos",
        descricao: "Portanto, logo, então, por isso, assim, por conseguinte.",
        exemplo: "O projeto foi aprovado, portanto daremos início às obras amanhã.",
        corFundo: "bg-indigo-500/10",
        icone: "🏁"
    },
    {
        titulo: "Concessivos",
        descricao: "Embora, ainda que, mesmo que, conquanto, apesar de.",
        exemplo: "Embora o petróleo seja finito, ele ainda é a base da nossa matriz.",
        corFundo: "bg-amber-500/10",
        icone: "⚖️"
    },
    {
        titulo: "Explicativos",
        descricao: "Pois, porque, que, porquanto.",
        exemplo: "A operação foi interrompida, pois houve um alerta de segurança.",
        corFundo: "bg-emerald-500/10",
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
        <div className="pb-20 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto space-y-12 pt-12 px-6">
                <ProgressIndicator />
                {showCompletionBadge && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex items-center justify-between animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30">
                                <LuCheck />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400">Aula Concluída!</h3>
                                <p className="text-emerald-600/80 dark:text-emerald-500/80">Você dominou a Coesão e Coerência.</p>
                            </div>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20" onClick={onComplete}>
                            Finalizar Aula
                        </Button>
                    </div>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
                <StickyModuleNav
                    activeTab={activeTab}
                    modules={MODULE_DEFS}
                    completedModules={completedModules}
                    isModuleUnlocked={isModuleUnlocked}
                />

                <main className="max-w-7xl mx-auto px-6 mt-12">
                    <Activity mode={activeTab === 'modulo-1' ? 'visible' : 'hidden'}>
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <ModuleBanner
                                numero={1}
                                titulo="Coesão Textual"
                                descricao="Aprenda a conectar ideias e frases para criar um tecido textual fluido e lógico."
                                gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"
                            />

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-black text-primary border border-primary/20 shadow-inner">1</span>
                                    Coesão Referencial
                                </h2>

                                {/* Definição Pedagógica de Coesão Referencial */}
                                <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 space-y-4">
                                    <div className="flex items-center gap-3 text-primary">
                                        <LuBookOpen className="w-6 h-6" />
                                        <h4 className="font-bold text-lg uppercase tracking-wider"> O Tecido do Texto</h4>
                                    </div>
                                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                        A <strong className="text-foreground">Coesão Referencial</strong> funciona como fios que amarram o texto. É o processo pelo qual um termo substitui ou se refere a outro, evitando repetições cansativas e mantendo a fluidez da leitura.
                                    </p>
                                </div>

                                {/* Subseção A */}
                                <div className="space-y-8">
                                    <h3 className="text-2xl md:text-3xl font-black text-foreground flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg font-black text-indigo-600 border border-indigo-500/10 shrink-0">A</span>
                                        Tipos de Referência
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="p-8 bg-background rounded-3xl border border-border/50 shadow-md group hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                                            <div className="flex items-start gap-5 mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner shrink-0">
                                                    <LuAnchor size={32} className="text-indigo-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-2xl md:text-3xl tracking-tight">Anáfora</h4>
                                                    <p className="text-base text-muted-foreground font-semibold mt-1">Retoma o passado</p>
                                                </div>
                                            </div>
                                            <p className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed">Refere-se a um termo que já foi mencionado anteriormente no discurso.</p>
                                            <div className="bg-muted/50 p-6 rounded-2xl border border-primary/10 italic font-bold text-lg text-foreground relative overflow-hidden">
                                                <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500/50" />
                                                "O <span className="text-indigo-600 dark:text-indigo-400">relatório</span> ficou pronto. <span className="text-indigo-600 dark:text-indigo-400">Ele</span> será enviado amanhã."
                                            </div>
                                        </div>
                                        <div className="p-8 bg-background rounded-3xl border border-border/50 shadow-md group hover:border-primary/40 hover:shadow-xl transition-all duration-500">
                                            <div className="flex items-start gap-5 mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner shrink-0">
                                                    <LuCompass size={32} className="text-purple-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-2xl md:text-3xl tracking-tight">Catáfora</h4>
                                                    <p className="text-base text-muted-foreground font-semibold mt-1">Antecipa o futuro</p>
                                                </div>
                                            </div>
                                            <p className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed">Aponta para um termo que ainda será explicitado no texto.</p>
                                            <div className="bg-muted/50 p-6 rounded-2xl border border-primary/10 italic font-bold text-lg text-foreground relative overflow-hidden">
                                                <div className="absolute left-0 top-0 w-1 h-full bg-purple-500/50" />
                                                "Eu só quero <span className="text-purple-600 dark:text-purple-400">isto</span>: sua total <span className="text-purple-600 dark:text-purple-400">atenção</span>."
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Subseção B */}
                                <div className="space-y-8">
                                    <h3 className="text-2xl md:text-3xl font-black text-foreground flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg font-black text-indigo-600 border border-indigo-500/10 shrink-0">B</span>
                                        Mecanismos de Substituição
                                    </h3>
                                    <ContentAccordion
                                        titulo="Técnicas de Coesão Lexical"
                                        icone="🔄"
                                        corIndicador="bg-indigo-500"
                                        slides={[
                                            {
                                                titulo: "Sinonímia e Hiperonímia",
                                                icone: "🎓",
                                                conteudo: (
                                                    <div className="space-y-4">
                                                        <p>Substituir uma palavra por outra de sentido equivalente (sinônimo) ou mais genérico (hiperônimo).</p>
                                                        <ul className="grid md:grid-cols-2 gap-4 mt-4">
                                                            <li className="bg-muted/50 p-4 rounded-xl border border-border/50">
                                                                <strong className="text-primary block mb-1">Sinônimo:</strong>
                                                                "Comprei um <strong>veículo</strong>. O <strong>carro</strong> é novo."
                                                            </li>
                                                            <li className="bg-muted/50 p-4 rounded-xl border border-border/50">
                                                                <strong className="text-primary block mb-1">Hiperônimo:</strong>
                                                                "Ele ama <strong>rosas</strong>. Essas <strong>flores</strong> são lindas."
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ),
                                                exemplo: "O funcionário solicitou o documento. O colaborador precisava da folha para anexar ao processo."
                                            },
                                            {
                                                titulo: "Nominalização",
                                                icone: "📝",
                                                conteudo: (
                                                    <div className="space-y-4">
                                                        <p>Recurso mestre de Bechara para evitar a repetição de verbos. Transformamos um verbo em um substantivo cognato para retomar a ação.</p>
                                                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                                                            <p className="text-sm">"O governo decidiu <strong>investir</strong> em tecnologia. Esse <strong>investimento</strong> trará retornos imediatos."</p>
                                                        </div>
                                                    </div>
                                                ),
                                                exemplo: "As sondas perfuraram o pré-sal. A perfuração foi concluída com sucesso."
                                            },
                                            {
                                                titulo: "Palavras-Sumário",
                                                icone: "📦",
                                                conteudo: (
                                                    <div className="space-y-4">
                                                        <p>Uso de nomes genéricos (fato, cenário, processo, ideia) para "empacotar" e retomar declarações inteiras ditas anteriormente.</p>
                                                        <div className="bg-muted/50 p-4 rounded-xl border border-border/50">
                                                            <span className="text-xs uppercase font-bold text-muted-foreground">O que Bechara ensina:</span>
                                                            <p className="italic mt-1">Nomes de sentido vago que servem para resumir enunciados longos e organizar o pensamento.</p>
                                                        </div>
                                                    </div>
                                                ),
                                                exemplo: "Houve cortes de custos e reestruturação interna. Esse cenário preocupava os acionistas."
                                            },
                                            {
                                                titulo: "Elipse (Omissão)",
                                                icone: "👻",
                                                conteudo: (
                                                    <p className="text-base text-muted-foreground font-medium italic">"A omissão estratégica de um termo que pode ser recuperado facilmente pelo contexto gramatical ou situacional, evitando a redundância."</p>
                                                ),
                                                exemplo: "Eles chegaram tarde à refinaria; (eles) estavam exaustos da longa viagem."
                                            }
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* 1.2 Coesão Sequencial */}
                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-black text-primary border border-primary/20 shadow-inner">2</span>
                                    Coesão Sequencial
                                </h2>
                                <p className="text-xl md:text-2xl text-muted-foreground font-medium italic border-l-4 border-primary/30 pl-8 py-3 max-w-4xl">
                                    Refere-se à organização lógica e temporal do texto através do uso preciso de conectivos.
                                </p>

                                <div className="space-y-8">
                                    <h3 className="text-2xl md:text-3xl font-black text-foreground flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-lg font-black text-emerald-600 border border-emerald-500/10 shrink-0">A</span>
                                        Conectivos de Alto Impacto
                                    </h3>

                                    {/* Definição Pedagógica */}
                                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 space-y-4">
                                        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                                            <LuBookOpen className="w-6 h-6" />
                                            <h4 className="font-bold text-lg uppercase tracking-wider">O que são?</h4>
                                        </div>
                                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                            Os <strong className="text-foreground">Operadores Argumentativos</strong> são as "placas de sinalização" do seu texto. Eles não apenas ligam orações, mas indicam a força e a direção da sua argumentação, preparando o leitor para o que virá em seguida (uma oposição, uma conclusão ou um reforço).
                                        </p>
                                    </div>

                                    <CardCarousel
                                        titulo="Operadores Argumentativos"
                                        subtitulo="As ferramentas fundamentais para construir a lógica do seu texto."
                                        cards={CONECTIVOS_CARDS}
                                    />
                                </div>
                            </section>

                            {/* QUIZ Módulo 1 */}
                            <section id="quiz-modulo-1" className="pt-8">
                                <QuizInterativo
                                    questoes={quizCoesaoQuestions}
                                    titulo="Desafio: Coesão Textual"
                                    icone="💬"
                                    numero={1}
                                    onComplete={handleModule1Complete}
                                />
                            </section>
                        </div >
                    </Activity >

                    {/* --- MÓDULO 2: COERÊNCIA --- */}
                    < Activity mode={activeTab === 'modulo-2' ? 'visible' : 'hidden'
                    }>
                        <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 ${activeTab !== 'modulo-2' ? 'hidden' : ''}`}>
                            <ModuleBanner
                                numero={2}
                                titulo="Coerência Lógica"
                                descricao="A coerência garante que a mensagem do texto faça sentido como um todo, respeitando a lógica e o contexto."
                                gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
                            />

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-3xl font-black text-emerald-600 border border-emerald-500/20 shadow-inner">1</span>
                                    Os Pilares do Sentido
                                </h2>

                                {/* Definição Pedagógica de Coerência */}
                                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 space-y-4">
                                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                                        <LuBookOpen className="w-6 h-6" />
                                        <h4 className="font-bold text-lg uppercase tracking-wider">A essência da Coerência</h4>
                                    </div>
                                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                        A <strong className="text-foreground">Coerência</strong> é a harmonia lógica entre as ideias. Se a coesão é o "tecido" do texto, a coerência é o "sentido" que ele faz na cabeça do leitor. Para que um texto seja coerente, ele deve evitar contradições e manter o foco no objetivo central.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-10 bg-muted/30 border border-border/50 rounded-3xl space-y-6 group hover:border-emerald-500/40 hover:shadow-xl transition-all duration-500">
                                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner shrink-0">🚫</div>
                                        <h3 className="font-black text-2xl tracking-tight">Não-Contradição</h3>
                                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">As ideias apresentadas devem coexistir harmonicamente sem se anularem.</p>
                                    </div>
                                    <div className="p-10 bg-muted/30 border border-border/50 rounded-3xl space-y-6 group hover:border-teal-500/40 hover:shadow-xl transition-all duration-500">
                                        <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner shrink-0">📈</div>
                                        <h3 className="font-black text-2xl tracking-tight">Progressão</h3>
                                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">Cada novo parágrafo deve acrescentar informações relevantes ao tema.</p>
                                    </div>
                                    <div className="p-10 bg-muted/30 border border-border/50 rounded-3xl space-y-6 group hover:border-cyan-500/40 hover:shadow-xl transition-all duration-500">
                                        <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner shrink-0">🎯</div>
                                        <h3 className="font-black text-2xl tracking-tight">Relevância</h3>
                                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">O texto deve manter o foco no objetivo central da comunicação.</p>
                                    </div>
                                </div>

                                <AlertBox tipo="info" titulo="Importante: Forma vs Sentido">
                                    <div className="font-bold text-lg leading-relaxed">
                                        Lembre-se: Coesão é a moldura; Coerência é a pintura. Um texto pode ser gramaticalmente perfeito e logicamente vazio.
                                        <div className="mt-4 p-5 bg-background/50 rounded-2xl border border-border/50 italic text-base">
                                            "O dia amanheceu azul porque as formigas cantavam ópera na lua." (Coesivo, mas incoerente).
                                        </div>
                                    </div>
                                </AlertBox>
                            </section>

                            <section id="quiz-modulo-2" className="pt-8">
                                <QuizInterativo
                                    questoes={quizCoerenciaQuestions}
                                    titulo="Desafio: Coerência Lógica"
                                    icone="🧠"
                                    numero={2}
                                    onComplete={handleModule2Complete}
                                />
                            </section>
                        </div>
                    </Activity >

                    {/* --- MÓDULO 3: PRÁTICA --- */}
                    < Activity mode={activeTab === 'modulo-3' ? 'visible' : 'hidden'}>
                        <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 ${activeTab !== 'modulo-3' ? 'hidden' : ''}`}>
                            <ModuleBanner
                                numero={3}
                                titulo="Laboratório de Texto"
                                descricao="Aplicação prática dos conceitos em questões reais de concurso Cesgranrio."
                                gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
                            />

                            {/* Desafio Prático */}
                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl font-black text-primary border border-primary/20 shadow-inner">1</span>
                                    Diagnóstico Lógico
                                </h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <h4 className="font-black text-2xl text-red-500 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shadow-sm shrink-0">❌</div>
                                            Cenário Incoerente
                                        </h4>
                                        <div className="p-10 bg-red-500/5 border border-red-500/20 rounded-3xl relative overflow-hidden group min-h-[160px] flex items-center">
                                            <div className="absolute left-0 top-0 w-2 h-full bg-red-500/40" />
                                            <p className="text-2xl font-black italic text-foreground tracking-tight leading-snug group-hover:scale-[1.02] transition-transform">"{shuffledChallenges[challengeIndex].wrong}"</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="font-black text-2xl text-emerald-500 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shadow-sm shrink-0">✅</div>
                                            Solução Técnica
                                        </h4>
                                        <div className="p-10 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl relative overflow-hidden group">
                                            <div className="absolute left-0 top-0 w-2 h-full bg-emerald-500/40" />
                                            <p className="text-2xl font-black text-foreground tracking-tight mb-8 leading-snug group-hover:scale-[1.02] transition-transform">"{shuffledChallenges[challengeIndex].correct}"</p>
                                            <div className="p-4 bg-background/80 dark:bg-black/60 rounded-2xl text-lg font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/10 shadow-xl">
                                                <span className="text-emerald-500 block mb-2 uppercase text-xs tracking-widest font-black">Por que está correto?</span>
                                                {shuffledChallenges[challengeIndex].explanation}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center pt-8">
                                    <button
                                        onClick={() => setChallengeIndex((prev) => (prev + 1) % shuffledChallenges.length)}
                                        className="px-10 py-5 bg-primary text-primary-foreground rounded-3xl font-black hover:scale-105 transition-all flex items-center gap-4 shadow-2xl shadow-primary/30 text-xl group"
                                    >
                                        <LuZap className="w-6 h-6 fill-current group-hover:animate-pulse" />
                                        Próximo Caso Clínico
                                    </button>
                                </div>
                            </section>

                            {/* QUIZ FINAL */}
                            <section id="quiz-final" className="pt-8">
                                <QuizInterativo
                                    questoes={quizPraticoQuestions}
                                    titulo="Simulado Técnico Petrobras"
                                    icone="🏆"
                                    numero={3}
                                    onComplete={(score) => {
                                        if (score >= 70) {
                                            localStorage.setItem('coesao-completed', 'true');
                                            onComplete?.();
                                        }
                                    }}
                                />
                            </section>
                        </div>
                    </Activity >
                </main>
            </Tabs>
        </div>
    );
}
