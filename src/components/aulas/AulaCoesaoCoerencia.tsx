'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { LuBookOpen, LuVideo, LuZap, LuChevronRight, LuVolume2, LuPlay, LuImage, LuShuffle, LuPenTool, LuMessageSquare, LuLink, LuTarget, LuFileText, LuBox, LuAnchor, LuCompass, LuActivity, LuCheck, LuCirclePlay as LuPlayCircle, LuBrain, LuMusic } from 'react-icons/lu';
import {
    ModuleBanner,
    ContentAccordion,
    LessonTabs,
    QuizInterativo,
    FlipCard,
    CardCarousel,
    AlertBox,
    VideoModal,
    ModuleSummaryCarouselNew,
    AulaProps,
    ProgressIndicator,
    StickyModuleNav,
    Activity,
    SummaryTabs,
    MusicPlayerCard,
    QuizQuestion
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

const QUIZ_APROFUNDAMENTO_POOL: QuizQuestion[] = [
    {
        id: 401,
        pergunta: "Na frase 'Eles preferem o presencial; nós, o remoto.', ocorre qual tipo de mecanismo coesivo?",
        opcoes: [
            { label: 'A', valor: "Catáfora pronominal" },
            { label: 'B', valor: "Zêugma (elipse de um termo já mencionado)" },
            { label: 'C', valor: "Sinonímia perfeita" },
            { label: 'D', valor: "Hiperonímia" },
        ],
        correta: 'B',
        explicacao: "A vírgula após 'nós' indica a omissão do verbo 'preferimos', que já apareceu anteriormente na frase. Isso é um Zêugma.",
    },
    {
        id: 402,
        pergunta: "Qual o valor semântico do conectivo 'CONQUANTO'?",
        opcoes: [
            { label: 'A', valor: "Causa" },
            { label: 'B', valor: "Consequência" },
            { label: 'C', valor: "Concessão (oposição leve que não anula a principal)" },
            { label: 'D', valor: "Conclusão" },
        ],
        correta: 'C',
        explicacao: "'Conquanto' é uma conjunção subordinativa concessiva, equivalente a 'embora' ou 'ainda que'.",
    },
    {
        id: 403,
        pergunta: "O que caracteriza a coesão por 'Nominalização'?",
        opcoes: [
            { label: 'A', valor: "O uso de adjetivos explicativos." },
            { label: 'B', valor: "A transformação de um processo verbal em um nome (substantivo)." },
            { label: 'C', valor: "A repetição de nomes próprios." },
            { label: 'D', valor: "O uso de cognomes." },
        ],
        correta: 'B',
        explicacao: "Nominalização é quando usamos um substantivo para retomar uma ação verbal anterior. Ex: 'O navio atracou. A atracação foi rápida.'",
    }
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
    {
        id: 501,
        pergunta: "Questão Cesgranrio: Em um texto, a coerência pode ser prejudicada se houver contradição entre:",
        opcoes: [
            { label: 'A', valor: "O título e a imagem apenas." },
            { label: 'B', valor: "O que é dito e o conhecimento de mundo do leitor (incoerência externa)." },
            { label: 'C', valor: "O uso de próclise e ênclise." },
            { label: 'D', valor: "A fonte do texto e a data de publicação." },
        ],
        correta: 'B',
        explicacao: "A coerência externa depende da relação lógica entre as informações do texto e a realidade compartilhada.",
    },
    {
        id: 502,
        pergunta: "Na frase 'As equipes de segurança da Petrobras já iniciaram o protocolo. O procedimento é padrão.', o termo 'O procedimento' retoma a ideia anterior através de:",
        opcoes: [
            { label: 'A', valor: "Substituição por Hiperônimo" },
            { label: 'B', valor: "Nome Genérico / Palavra-Sumário" },
            { label: 'C', valor: "Anáfora pronominal" },
            { label: 'D', valor: "Catáfora textual" },
        ],
        correta: 'B',
        explicacao: "A palavra 'procedimento' funciona como uma palavra-sumário que 'resume' a ação anterior (iniciar o protocolo).",
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
    { id: 'modulo-4', label: 'Módulo 4', titulo: 'Aprofundamento' },
    { id: 'modulo-5', label: 'Módulo 5', titulo: 'Laboratório Final' },
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
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    // Load progress
    useEffect(() => {
        const saved = localStorage.getItem('aula_coesao_progress');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.completedModules) setCompletedModules(new Set(parsed.completedModules));
        }
        if (currentProgress >= 100 || isLessonCompleted) setShowCompletionBadge(true);
    }, [currentProgress, isLessonCompleted]);

    const handleModuleComplete = (moduleId: string, score: number) => {
        if (score >= 70) {
            const newSet = new Set(completedModules).add(moduleId);
            setCompletedModules(newSet);
            localStorage.setItem('aula_coesao_progress', JSON.stringify({ completedModules: Array.from(newSet) }));

            const index = MODULE_DEFS.findIndex(m => m.id === moduleId);
            if (index < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[index + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                onComplete?.();
            }
        }
    };

    const isModuleUnlocked = (index: number) => {
        if (isLessonCompleted) return true;
        if (index === 0) return true;
        return completedModules.has(MODULE_DEFS[index - 1].id);
    };

    // Shuffled questions/challenges
    const [quizCoesaoQuestions] = useState(() => [...QUIZ_COESAO_POOL].sort(() => Math.random() - 0.5).slice(0, 4));
    const [quizCoerenciaQuestions] = useState(() => [...QUIZ_COERENCIA_POOL].sort(() => Math.random() - 0.5).slice(0, 4));
    const [quizPraticoQuestions] = useState(() => [...QUIZ_PRATICO_POOL].sort(() => Math.random() - 0.5).slice(0, 4));
    const [quizAprofundamentoQuestions] = useState(() => [...QUIZ_APROFUNDAMENTO_POOL].sort(() => Math.random() - 0.5).slice(0, 4));
    const [quizFinalQuestions] = useState(() => [...QUIZ_FINAL_POOL].sort(() => Math.random() - 0.5).slice(0, 4));

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
                            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/30">
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
                                    <span className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-black text-primary border border-primary/20 shadow-inner">1</span>
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
                                    <span className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-black text-primary border border-primary/20 shadow-inner">2</span>
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

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center text-3xl font-black text-indigo-700 border border-indigo-500/20 shadow-inner">3</span>
                                    Resumo e Multimedia
                                </h2>

                                <LessonTabs
                                    tabs={[
                                        {
                                            id: 'video',
                                            label: 'Vídeo Aula',
                                            icon: LuPlayCircle,
                                            content: (
                                                <div className="w-full flex flex-col items-center py-6">
                                                    <div className="w-full max-w-3xl">
                                                        <VideoModal
                                                            videoId="placeholder"
                                                            title="Coesão Textual: O Guia Definitivo"
                                                            duration="08:45"
                                                            thumbnail="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'resumo',
                                            label: 'Resumo Visual',
                                            icon: LuBookOpen,
                                            content: (
                                                <ModuleSummaryCarouselNew
                                                    tituloAula="Coesão e Coerência"
                                                    materia="Português"
                                                    profissao="Concurso Petrobras"
                                                    moduloNome="Coesão Textual"
                                                    images={[
                                                        { title: 'Mapa Mental: Coesão Referencial', type: 'Mapa Mental', placeholderColor: 'bg-indigo-900/10' },
                                                        { title: 'Infográfico: Conectivos de Oposição', type: 'Infográfico', placeholderColor: 'bg-emerald-900/10' },
                                                        { title: 'Diagrama: Fluxo de Catáfora', type: 'Diagrama', placeholderColor: 'bg-amber-900/10' },
                                                        { title: 'Card Resumo: Dica Cesgranrio', type: 'Card', placeholderColor: 'bg-purple-900/10' },
                                                    ]}
                                                />
                                            )
                                        },
                                        {
                                            id: 'visual',
                                            label: 'Macete Visual',
                                            icon: LuBrain,
                                            content: (
                                                <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-500/10">
                                                    <h3 className="text-xl font-bold text-foreground mb-4">A Regra da Agulha</h3>
                                                    <div className="text-7xl my-8 animate-pulse">🪡 🧵 🪡</div>
                                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                                                        "A Coesão é a costura. Se o fio (conectivo) arrebenta, os pedaços (frases) se soltam e o sentido cai!"
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                                                        <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-2">Anáfora (Retrovisor)</h4>
                                                            <p className="text-xs text-muted-foreground italic">"Comprei o <u>livro</u>. <strong>Ele</strong> é bom."</p>
                                                            <p className="text-[10px] mt-2 font-medium">O pronome olha para trás, para o que já foi dito.</p>
                                                        </div>
                                                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Catáfora (Farol)</h4>
                                                            <p className="text-xs text-muted-foreground italic">"Só quero <strong>isto</strong>: <u>sucesso</u>."</p>
                                                            <p className="text-[10px] mt-2 font-medium">O pronome aponta para frente, para o que virá.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'audio',
                                            label: 'Áudio Resumo',
                                            icon: LuMusic,
                                            content: (
                                                <div className="w-full flex justify-center py-4">
                                                    <div className="w-full max-w-md">
                                                        <MusicPlayerCard
                                                            audioUrl="https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a7343b.mp3"
                                                            titulo="O Tecido do Texto"
                                                            artista="Prof. Antigravity"
                                                            capaUrl="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=1000&auto=format&fit=crop"
                                                            lyrics={`
                                                            (Refrão)
                                                            É coesão, são os fios da meada
                                                            Se o texto é tecido, a palavra é a amarrada
                                                            Retoma o que foi dito, antecipa a jornada
                                                            Sem nó no sentido, a vitória é cravada!
                                                            `}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            {/* QUIZ Módulo 1 */}
                            <section id="quiz-modulo-1" className="pt-8">
                                <QuizInterativo
                                    questoes={quizCoesaoQuestions}
                                    titulo="Quizz: Coesão Textual"
                                    icone="💬"
                                    numero={4}
                                    onComplete={(score) => handleModuleComplete('modulo-1', score)}
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
                                descricao="A coerência garante que a mensagem do texto faça sentido como um todo, respeitando a lógica e o contexto."
                                gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
                            />

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-3xl font-black text-emerald-600 border border-emerald-500/20 shadow-inner">1</span>
                                    Fundamentos Pedagógicos
                                </h2>

                                {/* Definição Pedagógica de Coerência */}
                                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 space-y-4">
                                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                                        <LuBookOpen className="w-6 h-6" />
                                        <h4 className="font-bold text-lg uppercase tracking-wider">A essência da Coerência</h4>
                                    </div>
                                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium capitalize-first">
                                        Segundo <strong className="text-foreground">Bechara</strong>, a coerência é o plano do conteúdo do texto. Ela não reside apenas nas palavras, mas na interação entre o texto e o conhecimento de mundo do leitor. É o que permite que a comunicação cumpra seu propósito informativo ou persuasivo.
                                    </p>
                                </div>

                                <ContentAccordion
                                    titulo="Os Pilares da Coerência"
                                    icone="⚖️"
                                    corIndicador="bg-emerald-500"
                                    defaultOpen={true}
                                    slides={[
                                        {
                                            titulo: "Não-Contradição",
                                            icone: "1️⃣",
                                            conteudo: (
                                                <div className="space-y-6">
                                                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                                            <span className="w-6 h-6 rounded bg-red-500/10 text-red-600 flex items-center justify-center text-xs">A</span>
                                                            Consistência Lógica
                                                        </h4>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            Um texto coerente exige que as ideias apresentadas não se anulem. A introdução de uma informação que nega o que foi dito anteriormente rompe o pacto de sentido com o leitor.
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                                                            <p className="text-xs font-black text-red-600 mb-1 uppercase tracking-tighter">Incoerente:</p>
                                                            <p className="text-sm italic">"A plataforma é totalmente automatizada, mas depende de operação manual constante."</p>
                                                        </div>
                                                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                                                            <p className="text-xs font-black text-emerald-600 mb-1 uppercase tracking-tighter">Coerente:</p>
                                                            <p className="text-sm italic">"Embora seja altamente automatizada, a plataforma exige supervisão técnica pontual."</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            titulo: "Continuidade e Progressão",
                                            icone: "2️⃣",
                                            conteudo: (
                                                <div className="space-y-6">
                                                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-primary">
                                                            <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">B</span>
                                                            O Equilíbrio do Novo
                                                        </h4>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            A **Continuidade** garante que o tema seja mantido (retomando o que já foi dito), enquanto a **Progressão** exige que o texto ande para frente, trazendo sempre informações novas (novidade temática).
                                                        </p>
                                                    </div>
                                                    <AlertBox tipo="info" titulo="Definição Técnica">
                                                        <p className="text-sm">Um texto que apenas repete o que já disse é redundante; um que só traz novidades sem conexão é confuso. A coerência mora no equilíbrio.</p>
                                                    </AlertBox>
                                                    <div className="bg-muted/50 p-4 rounded-xl italic text-sm">
                                                        "O pré-sal é uma reserva gigante. Essa área (Continuidade) possui petróleo leve (Progressão)."
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            titulo: "Relevância e Relação",
                                            icone: "3️⃣",
                                            conteudo: (
                                                <div className="space-y-6">
                                                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                                        <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-cyan-600">
                                                            <span className="w-6 h-6 rounded bg-cyan-500/10 text-cyan-600 flex items-center justify-center text-xs">C</span>
                                                            Contexto e Propósito
                                                        </h4>
                                                        <p className="text-muted-foreground leading-relaxed">
                                                            As informações de um texto devem ser relevantes para o objetivo da comunicação. Se o foco é segurança no trabalho, divagações sobre o clima de férias rompem a unidade temática.
                                                        </p>
                                                    </div>
                                                    <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                                                        <p className="font-bold text-xs text-cyan-700 mb-1">Aplicação Prática:</p>
                                                        <p className="text-sm italic">"Em relatórios técnicos da Petrobras, a precisão terminológica é o fator de maior relevância para evitar erros de interpretação operacional."</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />

                                <AlertBox tipo="warning" titulo="Dica para Redação">
                                    <div className="font-bold text-lg leading-relaxed">
                                        A falta de coerência gera o chamado "texto Frankenstein": partes que até fazem sentido isoladas, mas não formam um corpo lógico unido.
                                    </div>
                                </AlertBox>
                            </section>

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-3xl font-black text-emerald-700 border border-emerald-500/20 shadow-inner">2</span>
                                    Resumo e Multimedia
                                </h2>

                                <LessonTabs
                                    tabs={[
                                        {
                                            id: 'video',
                                            label: 'Vídeo Aula',
                                            icon: LuPlayCircle,
                                            content: (
                                                <div className="w-full flex flex-col items-center py-6">
                                                    <div className="w-full max-w-3xl">
                                                        <VideoModal
                                                            videoId="placeholder"
                                                            title="Coerência Lógica: A Arte do Sentido"
                                                            duration="07:20"
                                                            thumbnail="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'resumo',
                                            label: 'Resumo Visual',
                                            icon: LuBookOpen,
                                            content: (
                                                <ModuleSummaryCarouselNew
                                                    tituloAula="Coesão e Coerência"
                                                    materia="Português"
                                                    profissao="Concurso Petrobras"
                                                    moduloNome="Coerência Lógica"
                                                    images={[
                                                        { title: 'Mapa Mental: Pilares da Coerência', type: 'Mapa Mental', placeholderColor: 'bg-emerald-900/10' },
                                                        { title: 'Diagrama: Tese vs Antítese', type: 'Diagrama', placeholderColor: 'bg-blue-900/10' },
                                                        { title: 'Infográfico: Progressão Temática', type: 'Infográfico', placeholderColor: 'bg-indigo-900/10' },
                                                        { title: 'Card Resumo: Bechara Explica', type: 'Card', placeholderColor: 'bg-cyan-900/10' },
                                                    ]}
                                                />
                                            )
                                        },
                                        {
                                            id: 'visual',
                                            label: 'Macete Visual',
                                            icon: LuBrain,
                                            content: (
                                                <div className="text-center p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/10">
                                                    <h3 className="text-xl font-bold text-foreground mb-4">O Fio de Ariadne</h3>
                                                    <div className="text-7xl my-8 animate-bounce">🧶 🏛️ 🧶</div>
                                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                                                        "Um texto coerente é um labirinto com saída segura."
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                                                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Lógica Interna</h4>
                                                            <p className="text-xs text-muted-foreground italic">As ideias não se batem; elas se somam para criar um todo.</p>
                                                        </div>
                                                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2">Conhecimento de Mundo</h4>
                                                            <p className="text-xs text-muted-foreground italic">O texto faz sentido dentro do contexto em que foi escrito.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'audio',
                                            label: 'Áudio Resumo',
                                            icon: LuMusic,
                                            content: (
                                                <div className="w-full flex justify-center py-4">
                                                    <div className="w-full max-w-md">
                                                        <MusicPlayerCard
                                                            audioUrl="https://cdn.pixabay.com/audio/2022/02/22/audio_9e3d964f4b.mp3"
                                                            titulo="A Lógica do Sentido"
                                                            artista="Prof. Antigravity"
                                                            capaUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop"
                                                            lyrics={`
                                                            (Refrão)
                                                            Não basta ligar, tem que fazer sentido
                                                            O texto coerente nunca é perdido
                                                            Lógica pura, sem contradição
                                                            É o mestre Bechara dando a direção!
                                                            `}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            <section id="quiz-modulo-2" className="pt-8">
                                <QuizInterativo
                                    questoes={quizCoerenciaQuestions}
                                    titulo="Desafio: Coerência Lógica"
                                    icone="🧠"
                                    numero={4}
                                    onComplete={(score) => handleModuleComplete('modulo-2', score)}
                                />
                            </section>
                        </div>
                    </Activity>

                    {/* --- MÓDULO 3: PRÁTICA --- */}
                    <Activity mode={activeTab === 'modulo-3' ? 'visible' : 'hidden'}>
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

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center text-3xl font-black text-violet-700 border border-violet-500/20 shadow-inner">2</span>
                                    Resumo e Multimedia
                                </h2>

                                <LessonTabs
                                    tabs={[
                                        {
                                            id: 'video',
                                            label: 'Vídeo Aula',
                                            icon: LuPlayCircle,
                                            content: (
                                                <div className="w-full flex flex-col items-center py-6">
                                                    <div className="w-full max-w-3xl">
                                                        <VideoModal
                                                            videoId="placeholder"
                                                            title="Prática de Coesão e Coerência"
                                                            duration="10:15"
                                                            thumbnail="https://images.unsplash.com/photo-1434030216411-0bb7c3f3dfad?q=80&w=1000&auto=format&fit=crop"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'resumo',
                                            label: 'Resumo Visual',
                                            icon: LuBookOpen,
                                            content: (
                                                <ModuleSummaryCarouselNew
                                                    tituloAula="Coesão e Coerência"
                                                    materia="Português"
                                                    profissao="Concurso Petrobras"
                                                    moduloNome="Prática e Análise"
                                                    images={[
                                                        { title: 'Checklist: Revisão de Texto', type: 'Infográfico', placeholderColor: 'bg-violet-900/10' },
                                                        { title: 'Tabela: Erros Frequentes', type: 'Tabela', placeholderColor: 'bg-red-900/10' },
                                                        { title: 'Mapa: Decisão de Conectivos', type: 'Mapa Mental', placeholderColor: 'bg-indigo-900/10' },
                                                        { title: 'Card: Macetes Finais', type: 'Card', placeholderColor: 'bg-purple-900/10' },
                                                    ]}
                                                />
                                            )
                                        },
                                        {
                                            id: 'visual',
                                            label: 'Macete Visual',
                                            icon: LuBrain,
                                            content: (
                                                <div className="text-center p-8 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl border border-violet-500/10">
                                                    <h3 className="text-xl font-bold text-foreground mb-4">O Filtro do Sentido</h3>
                                                    <div className="text-7xl my-8 animate-pulse">🔍 📝 🧪</div>
                                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                                                        "Antes de marcar a opção, pergunte: as frases se unem? As ideias se somam? O texto caminha?"
                                                    </p>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'audio',
                                            label: 'Áudio Resumo',
                                            icon: LuMusic,
                                            content: (
                                                <div className="w-full flex justify-center py-4">
                                                    <div className="w-full max-w-md">
                                                        <MusicPlayerCard
                                                            audioUrl="#"
                                                            titulo="Laboratório de Texto"
                                                            artista="Prof. André"
                                                            capaUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                                                            lyrics={`
                                                            (Refrão)
                                                            Analise a frase com olho clínico
                                                            O erro de coesão é quase químico
                                                            Mistura conectivo, perde a reação
                                                            Siga o mestre e não erre a questão!
                                                            `}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            {/* QUIZ FINAL Módulo 3 */}
                            <section id="quiz-final-m3" className="pt-8">
                                <QuizInterativo
                                    questoes={quizPraticoQuestions}
                                    titulo="Simulado Técnico"
                                    icone="🏆"
                                    numero={3}
                                    onComplete={(score) => handleModuleComplete('modulo-3', score)}
                                />
                            </section>
                        </div>
                    </Activity >

                    {/* --- MÓDULO 4: APROFUNDAMENTO --- */}
                    <Activity mode={activeTab === 'modulo-4' ? 'visible' : 'hidden'}>
                        <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 ${activeTab !== 'modulo-4' ? 'hidden' : ''}`}>
                            <ModuleBanner
                                numero={4}
                                titulo="Mecanismos de Elite"
                                descricao="Diferenças sutis entre elipse e zêugma e o poder argumentativo dos conectivos concessivos."
                                gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
                            />

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl font-black text-amber-600 border border-amber-500/20 shadow-inner">1</span>
                                    O Poder da Concessão
                                </h2>

                                <ContentAccordion
                                    titulo="Concessão vs Oposição"
                                    icone="⚖️"
                                    corIndicador="bg-amber-500"
                                    defaultOpen={true}
                                    slides={[
                                        {
                                            titulo: "Embora vs Mas",
                                            icone: "1️⃣",
                                            conteudo: (
                                                <div className="space-y-4">
                                                    <p className="text-muted-foreground">A **Oposição** (Mas, Porém) derruba o argumento anterior. A **Concessão** (Embora, Conquanto) admite um obstáculo que não é forte o suficiente para impedir a ação principal.</p>
                                                    <div className="bg-muted/50 p-4 rounded-xl italic">
                                                        "<strong>Embora</strong> o duto estivesse velho, ele suportou a pressão." (A pressão foi suportada, apesar do duto).
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            titulo: "Conquanto e Posto que",
                                            icone: "2️⃣",
                                            conteudo: (
                                                <div className="space-y-4">
                                                    <p className="text-muted-foreground">Termos adorados pela Cesgranrio pela sua formalidade. Ambos pedem o verbo no modo **Subjuntivo**.</p>
                                                    <AlertBox tipo="warning" titulo="Aviso Grammático">Cuidado! Algumas pessoas usam 'posto que' como causa, mas na norma culta é concessivo.</AlertBox>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            <QuizInterativo
                                questoes={quizAprofundamentoQuestions}
                                titulo="Desafio de Elite"
                                icone="🎖️"
                                numero={2}
                                onComplete={(score) => handleModuleComplete('modulo-4', score)}
                            />
                        </div>
                    </Activity>

                    {/* --- MÓDULO 5: LABORATÓRIO FINAL --- */}
                    <Activity mode={activeTab === 'modulo-5' ? 'visible' : 'hidden'}>
                        <div className={`space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 ${activeTab !== 'modulo-5' ? 'hidden' : ''}`}>
                            <ModuleBanner
                                numero={5}
                                titulo="Laboratório Final"
                                descricao="Sintetize tudo e prepare-se para gabaritar a prova da Cesgranrio."
                                gradiente="bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800"
                            />

                            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                    <span className="w-14 h-14 rounded-2xl bg-slate-500/10 flex items-center justify-center text-3xl font-black text-slate-600 border border-slate-500/20 shadow-inner">1</span>
                                    Sua Bússola de Revisão
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="p-6 bg-background rounded-2xl border border-border shadow-sm">
                                        <LuCheck className="text-emerald-500 mb-4" size={32} />
                                        <h4 className="font-bold mb-2">Check de Coesão</h4>
                                        <p className="text-sm text-muted-foreground">Troque o 'mas' por 'porém' ou 'entretanto' para validar o sentido.</p>
                                    </div>
                                    <div className="p-6 bg-background rounded-2xl border border-border shadow-sm">
                                        <LuCheck className="text-emerald-500 mb-4" size={32} />
                                        <h4 className="font-bold mb-2">Check de Coerência</h4>
                                        <p className="text-sm text-muted-foreground">Existe contradição entre os parágrafos?</p>
                                    </div>
                                    <div className="p-6 bg-background rounded-2xl border border-border shadow-sm">
                                        <LuCheck className="text-emerald-500 mb-4" size={32} />
                                        <h4 className="font-bold mb-2">Check de Referência</h4>
                                        <p className="text-sm text-muted-foreground">Os pronomes apontam para o lugar certo?</p>
                                    </div>
                                </div>
                            </section>

                            <QuizInterativo
                                questoes={quizFinalQuestions}
                                titulo="Simulado de Gabarito"
                                icone="🏆"
                                numero={2}
                                onComplete={(score) => handleModuleComplete('modulo-5', score)}
                            />

                            {/* CARD DE CONCLUSÃO MANUAL */}
                            <section className="mt-12 mb-8">
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/5 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                                            <LuBookOpen className="text-emerald-500 text-3xl" /> Missão Cumprida
                                        </h3>
                                        <p className="text-muted-foreground text-lg">
                                            Você concluiu todos os módulos de Coesão e Coerência!
                                        </p>
                                    </div>

                                    <Button
                                        size="lg"
                                        onClick={() => {
                                            setShowCompletionBadge(true);
                                            onComplete?.();
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Marcar como Concluída
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </Activity>
                </main>
            </Tabs>
        </div>
    );
}
