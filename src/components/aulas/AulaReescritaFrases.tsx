'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
const Activity = ({ mode, children }: { mode: 'visible' | 'hidden'; children: React.ReactNode }) => {
    return (
        <div style={{ display: mode === 'hidden' ? 'none' : 'contents' }}>
            {children}
        </div>
    );
};

import {
    Tabs,
} from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import {
    LuCheck,
    LuTrophy,
    LuTarget,
    LuLayers,
    LuTriangleAlert,
    LuBookOpen,
    LuLock,
    LuArrowRight,
    LuShuffle,
    LuPlay,
    LuImage,
    LuVolume2
} from 'react-icons/lu';

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

import { LuLightbulb } from 'react-icons/lu';
import { progressService } from '@/lib/services/progress';

// ── Tipos e Configurações ──────────────────────────────────────────────────

interface Challenge {
    id: number;
    original: string;
    reescrita: string;
    status: 'correto' | 'errado';
    explicacao: string;
}

const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Fundamentos' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Técnicas' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Prática Elite' }
];

const PROGRESS_PER_MODULE = Math.floor(100 / MODULE_DEFS.length);

// ── Questões do Quiz ───────────────────────────────────────────────────────

const QUIZ_M1_POOL: QuizQuestion[] = [
    {
        id: 101,
        pergunta: "Segundo a Cesgranrio, o que é essencial para que uma reescritura seja considerada correta?",
        opcoes: [
            { label: 'A', valor: "Apenas a manutenção do sentido original, mesmo com erros gramaticais." },
            { label: 'B', valor: "Apenas a correção gramatical, mesmo que o sentido seja alterado." },
            { label: 'C', valor: "A manutenção do sentido original E a correção gramatical (norma culta)." },
            { label: 'D', valor: "O uso de palavras difíceis e rebuscadas." }
        ],
        correta: 'C',
        explicacao: "A reescritura exige o binômio Semântica + Gramática. Não adianta estar gramaticalmente correto se mudou o que o autor disse."
    },
    {
        id: 102,
        pergunta: "A substituição de 'embora' por 'apesar de' exige qual ajuste na oração?",
        opcoes: [
            { label: 'A', valor: "Nenhum ajuste, são sinônimos perfeitos." },
            { label: 'B', valor: "O verbo deve passar do subjuntivo para o infinitivo (ou substantivação)." },
            { label: 'C', valor: "O verbo deve passar para o futuro do pretérito." },
            { label: 'D', valor: "A frase deve ser colocada entre aspas." }
        ],
        correta: 'B',
        explicacao: "'Embora' é conjunção (pede verbo conjugado), 'apesar de' é locução prepositiva (pede infinitivo). Ex: Embora chovesse -> Apesar de chover."
    },
    {
        id: 103,
        pergunta: "Identifique a alteração de sentido na reescrita: 'Talvez ele venha' por 'Certamente ele virá'.",
        opcoes: [
            { label: 'A', valor: "Nenhuma, ambas expressam futuro." },
            { label: 'B', valor: "Mudança de hipótese/dúvida para certeza/afirmação." },
            { label: 'C', valor: "Apenas mudança de tempo verbal." },
            { label: 'D', valor: "Mudança de voz passiva para ativa." }
        ],
        correta: 'B',
        explicacao: "Advérbios de dúvida ('talvez') e de afirmação ('certamente') alteram a modalização da frase, mudando o sentido original."
    },
    {
        id: 104,
        pergunta: "Na reescritura, a omissão de uma vírgula explicativa pode causar:",
        opcoes: [
            { label: 'A', valor: "Apenas um erro ortográfico leve." },
            { label: 'B', valor: "A transformação de uma explicação em restrição (mudança de sentido)." },
            { label: 'C', valor: "Melhora na fluidez do texto." },
            { label: 'D', valor: "Nenhuma alteração, a vírgula é sempre facultativa." }
        ],
        correta: 'B',
        explicacao: "Vírgulas em orações adjetivas definem se o termo é explicativo (com vírgula) ou restritivo (sem vírgula). Retirá-las muda o sentido."
    }
];

const QUIZ_M2_POOL: QuizQuestion[] = [
    {
        id: 201,
        pergunta: "Ao passar 'O técnico avaliou os riscos' para a voz passiva, temos:",
        opcoes: [
            { label: 'A', valor: "Os riscos foram avaliados pelo técnico." },
            { label: 'B', valor: "Avaliaram-se os riscos pelo técnico." },
            { label: 'C', valor: "O técnico fora avaliar os riscos." },
            { label: 'D', valor: "Riscos são avaliados pelo técnico." }
        ],
        correta: 'A',
        explicacao: "Voz ativa (passado) -> Voz passiva analítica (ser no passado + particípio). O objeto direto vira sujeito paciente."
    },
    {
        id: 202,
        pergunta: "Qual conectivo substitui 'Contanto que' mantendo o sentido condicional?",
        opcoes: [
            { label: 'A', valor: "Embora" },
            { label: 'B', valor: "Desde que" },
            { label: 'C', valor: "Visto que" },
            { label: 'D', valor: "Todavia" }
        ],
        correta: 'B',
        explicacao: "'Contanto que' e 'Desde que' são conjunções condicionais. 'Embora' é concessiva, 'Visto que' é causal e 'Todavia' é adversativa."
    },
    {
        id: 203,
        pergunta: "A reescrita 'É necessário que trabalhemos' para 'É necessária a nossa jornada' é um exemplo de:",
        opcoes: [
            { label: 'A', valor: "Voz passiva" },
            { label: 'B', valor: "Nominalização (oração vira substantivo)" },
            { label: 'C', valor: "Discurso indireto" },
            { label: 'D', valor: "Pleonasmo" }
        ],
        correta: 'B',
        explicacao: "Transformar o verbo 'trabalhar' no substantivo 'jornada' (ou trabalho) é o processo de nominalização, comum em reescritas formais."
    },
    {
        id: 204,
        pergunta: "No discurso indireto, a frase 'Eu irei amanhã', disse ele, torna-se:",
        opcoes: [
            { label: 'A', valor: "Ele disse que iria no dia seguinte." },
            { label: 'B', valor: "Ele disse que eu irei amanhã." },
            { label: 'C', valor: "Ele dirá que foi amanhã." },
            { label: 'D', valor: "Amanhã ele disse que iria." }
        ],
        correta: 'A',
        explicacao: "No discurso indireto, a 1ª pessoa vira 3ª, o futuro do presente vira futuro do pretérito e referências temporais ('amanhã') são ajustadas."
    }
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
    {
        id: 301,
        pergunta: "A frase 'Não obstante o esforço, falharam' mantém o sentido se reescrita como:",
        opcoes: [
            { label: 'A', valor: "Por causa do esforço, falharam." },
            { label: 'B', valor: "Apesar do esforço, falharam." },
            { label: 'C', valor: "Visto que houve esforço, falharam." },
            { label: 'D', valor: "Caso houvesse esforço, falhariam." }
        ],
        correta: 'B',
        explicacao: "'Não obstante' e 'Apesar de' são marcadores de concessão/oposição. A frase expressa que o esforço não impediu a falha."
    },
    {
        id: 302,
        pergunta: "Qual das reescritas abaixo altera o sentido original de 'Os funcionários, que são dedicados, receberão bônus'?",
        opcoes: [
            { label: 'A', valor: "Os dedicados funcionários receberão bônus." },
            { label: 'B', valor: "Os funcionários que são dedicados receberão bônus. (sem vírgulas)" },
            { label: 'C', valor: "Visto que são dedicados, os funcionários receberão bônus." },
            { label: 'D', valor: "Bônus serão recebidos pelos funcionários, os quais são dedicados." }
        ],
        correta: 'B',
        explicacao: "A versão original diz que TODOS os funcionários são dedicados (explicativa). A versão B diz que APENAS os dedicados recebem (restritiva)."
    },
    {
        id: 303,
        pergunta: "Na frase 'Faz dez anos que trabalho aqui', a reescrita gramaticalmente correta é:",
        opcoes: [
            { label: 'A', valor: "Fazem dez anos que trabalho aqui." },
            { label: 'B', valor: "Há dez anos que trabalho aqui." },
            { label: 'C', valor: "A dez anos que trabalho aqui." },
            { label: 'D', valor: "Tem dez anos que trabalho aqui." }
        ],
        correta: 'B',
        explicacao: "Verbo 'fazer' indicando tempo é impessoal (singular). Verbo 'haver' também. 'A' é distância ou tempo futuro. 'Tem' é coloquial."
    },
    {
        id: 304,
        pergunta: "A Cesgranrio costuma trocar 'se' por 'caso'. Qual a regra de ouro para essa reescrita?",
        opcoes: [
            { label: 'A', valor: "Nenhuma, basta trocar a palavra." },
            { label: 'B', valor: "O 'se' pede futuro do subjuntivo; o 'caso' pede presente do subjuntivo." },
            { label: 'C', valor: "O 'caso' exige vírgula obrigatória." },
            { label: 'D', valor: "O 'se' só pode ser usado no início da frase." }
        ],
        correta: 'B',
        explicacao: "Ajuste de modo: Se você VIER (futuro subj.). Caso você VENHA (pres. subj.). A troca direta sem mudar o verbo gera erro gramatical."
    }
];

const CHALLENGE_POOL: Challenge[] = [
    {
        id: 1,
        original: "Embora fizesse calor, ele usava casaco.",
        reescrita: "Mesmo fazendo calor, ele usava casaco.",
        status: 'correto',
        explicacao: "Ambas mantêm o sentido concessivo e o ajuste de verbo conjugado para gerúndio (forma nominal) está correto."
    },
    {
        id: 2,
        original: "Alugam-se casas de veraneio.",
        reescrita: "Aluga-se casas de veraneio.",
        status: 'errado',
        explicacao: "Erro de Concordância. Em 'Alugam-se casas', 'casas' é o sujeito (Voz Passiva Sintética), logo o verbo deve estar no plural."
    },
    {
        id: 3,
        original: "A medida que o tempo passa, aprendemos mais.",
        reescrita: "À medida que o tempo passa, aprendemos mais.",
        status: 'correto',
        explicacao: "A locução conjuntiva proporcional 'À medida que' exige crase obrigatória. A reescrita corrigiu a gramática mantendo o sentido."
    },
    {
        id: 4,
        original: "Se ele ter sorte, ganhará o prêmio.",
        reescrita: "Se ele tiver sorte, ganhará o prêmio.",
        status: 'correto',
        explicacao: "A reescrita corrigiu a flexão do verbo 'ter' no futuro do subjuntivo, que é 'tiver' e não 'ter'."
    }
];

// ── Componente Principal ──────────────────────────────────────────────────

export default function AulaReescritaFrases({ onUpdateProgress, onComplete, isCompleted, loading, xpGanho, currentProgress }: AulaProps) {
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
    const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
    const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);
    const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([]);
    const [challengeIndex, setChallengeIndex] = useState(0);
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    // Inicialização
    useEffect(() => {
        setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 4));
        setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 4));
        setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 4));
        setShuffledChallenges([...CHALLENGE_POOL].sort(() => 0.5 - Math.random()));

        // Carregar progresso salvo do DB
        const loadSavedProgress = async () => {
            const allProgress = await progressService.getProgress('reescritura');
            const completed = allProgress.filter(p => p.completed).map(p => p.moduleId);
            if (completed.length > 0) {
                setCompletedModules(new Set(completed));
                // Auto skip to last unlocked
                const unlockedIndices = completed.map(id => MODULE_DEFS.findIndex(m => m.id === id));
                const maxIdx = Math.max(...unlockedIndices, -1);
                if (maxIdx < MODULE_DEFS.length - 1) {
                    setActiveTab(MODULE_DEFS[maxIdx + 1].id);
                } else {
                    setActiveTab(MODULE_DEFS[maxIdx].id);
                }
            }
        };
        loadSavedProgress();
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
            lessonId: 'reescritura',
            moduleId: moduleId,
            score: score,
            completed: true,
            readPercentage: progressPercent
        });

        if (onUpdateProgress) onUpdateProgress(progressPercent);

        // Auto navegação para o próximo módulo
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

    const currentChallenge = shuffledChallenges[challengeIndex];

    return (
        <div className="space-y-6 pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-8">
                {/* Progress Bar */}
                <ProgressIndicator />

                {showCompletionBadge && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-4 shadow-sm mb-6 animate-in slide-in-from-top-4 duration-700">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                            <LuCheck size={24} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-green-800 dark:text-green-300 font-bold text-lg">Aula Concluída!</h3>
                            <p className="text-green-700 dark:text-green-400 text-sm">Parabéns! Você dominou as técnicas de Reescrita de Frases.</p>
                        </div>
                    </div>
                )}

                {/* Navigation Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={(val) => {
                        const idx = MODULE_DEFS.findIndex(m => m.id === val);
                        if (isModuleUnlocked(idx)) setActiveTab(val);
                    }}
                    className="w-full space-y-8"
                >
                    <StickyModuleNav
                        modules={Array.from(MODULE_DEFS)}
                        activeTab={activeTab}
                        completedModules={completedModules}
                        isModuleUnlocked={isModuleUnlocked}
                    />

                    {/* Módulo 1: Fundamentos */}
                    <Activity mode={activeTab === 'modulo-1' ? 'visible' : 'hidden'}>
                        <div className={`space-y-16 animate-in fade-in duration-500 ${activeTab !== 'modulo-1' ? 'hidden' : ''}`}>
                            <ModuleBanner
                                numero={1}
                                titulo="Fundamentos da Reescritura"
                                descricao="Entenda como manter o sentido original e a correção gramatical — a base das questões Cesgranrio."
                                gradiente="bg-gradient-to-br from-blue-600 to-indigo-700"
                            />

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-700 dark:text-blue-400">1</span>
                                    O Binômio de Ouro: Semântica + Gramática
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Para a Cesgranrio, uma reescrita só é considerada válida se ela for <strong>fiel ao que o autor disse</strong> e respeitar estritamente a <strong>norma culta</strong>. Mudar uma única palavra por um sinônimo "quase" igual pode invalidar o item.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <AlertBox tipo="info" titulo="Semântica (Sentido)">
                                        <p className="text-sm mb-2">O exame deve focar na <strong>modalização</strong>: palavras que indicam certeza (deve, certamente) vs hípótese (pode, possivelmente). Trocar uma pela outra é erro comum.</p>
                                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/10 text-xs">
                                            <span className="font-bold text-blue-700 dark:text-blue-400">Ex:</span> "Ele <u>talvez</u> chegue" &rarr; "Ele <u>com certeza</u> chegará" <span className="text-red-500 font-bold">(ERRO: Mudou hipótese por certeza)</span>.
                                        </div>
                                    </AlertBox>
                                    <AlertBox tipo="success" titulo="Gramática (Correção)">
                                        <p className="text-sm mb-2">Muitas vezes o sentido é mantido, mas a nova frase ignora uma regra de <strong>concordância</strong> ou <strong>regência</strong>. O erro é gramatical, não semântico.</p>
                                        <div className="p-2 bg-green-500/5 rounded border border-green-500/10 text-xs">
                                            <span className="font-bold text-green-700 dark:text-green-400">Ex:</span> "Fazem anos que não o vejo" <span className="text-red-500 font-bold">(ERRO de Concordância)</span>. O correto é "<u>Faz</u> anos".
                                        </div>
                                    </AlertBox>
                                </div>

                                <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 space-y-4">
                                    <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                                        <LuLightbulb className="w-5 h-5" /> Denotação vs. Conotação
                                    </h4>
                                    <p className="text-sm leading-relaxed">
                                        Fique atento a reescritas que tentam transformar uma linguagem figurada (conotativa) em literal (denotativa). Se o sentido for preservado, a reescrita é válida.
                                    </p>
                                    <div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg text-xs space-y-2">
                                        <p><strong>Figurado:</strong> "Sua voz é um bálsamo."</p>
                                        <p><strong>Literal:</strong> "Sua voz é suave e traz conforto." <span className="text-emerald-500 font-bold">(VÁLIDO: Sentido mantido)</span></p>
                                    </div>
                                </div>
                            </section>

                            <CardCarousel
                                titulo="Tipos de Substituição de Palavras"
                                subtitulo="Cuidado com sinônimos que dependem do contexto."
                                numeroBadge={2}
                                cards={[
                                    {
                                        icone: "🔄",
                                        titulo: "Sinônimos Perfeitos",
                                        descricao: "Substituição direta: 'Felicidade' por 'Alegria' (na maioria dos contextos).",
                                        corFundo: "bg-green-500/10"
                                    },
                                    {
                                        icone: "⚠️",
                                        titulo: "Falsos Sinônimos",
                                        descricao: "Palavras parecidas mas com carga diferente: 'Gostar' vs. 'Amar'.",
                                        corFundo: "bg-yellow-500/10"
                                    },
                                    {
                                        icone: "📌",
                                        titulo: "Sentido do Contexto",
                                        descricao: "O sentido de uma palavra é determinado pelo que vem antes e depois.",
                                        corFundo: "bg-blue-500/10"
                                    }
                                ]}
                            />

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-700 dark:text-blue-400">3</span>
                                    Resumo do Módulo 1
                                </h2>

                                <LessonTabs
                                    tabs={[
                                        {
                                            id: 'video',
                                            label: 'Vídeo Aula',
                                            icon: LuPlay,
                                            content: (
                                                <div className="w-full flex flex-col items-center py-6">
                                                    <div className="w-full max-w-3xl">
                                                        <VideoModal
                                                            videoId="dQw4w9WgXcQ"
                                                            title="Reescrita de Frases: Fundamentos e Sentido"
                                                            duration="08:45"
                                                            thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1073&auto=format&fit=crop"
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
                                                    tituloAula="Reescrita de Frases"
                                                    materia="Português"
                                                    profissao="Concurso Petrobras"
                                                    moduloNome="Fundamentos"
                                                    images={[
                                                        { title: 'Mapa Mental: Sentido Original', type: 'Mapa Mental', placeholderColor: 'bg-blue-900/10', imageUrl: '/images/mapa-mental/reescrita_mapa_mental_sentido_1771465579878.png' },
                                                        { title: 'Infográfico: Modalização', type: 'Infográfico', placeholderColor: 'bg-indigo-900/10', imageUrl: '/images/mapa-mental/reescrita_m1_infografico_1771466182917.png' },
                                                        { title: 'Esquema: Estrutura da Reescrita', type: 'Mapa Mental', placeholderColor: 'bg-slate-900/10', imageUrl: '/images/mapa-mental/reescrita_m1_mapa_mental_1771466156558.png' },
                                                        { title: 'Dicas de Bechara: Reescrita', type: 'Mapa Mental', placeholderColor: 'bg-gray-900/10', imageUrl: '/images/mapa-mental/reescrita_bechara_mapa_mental_1_1771465535398.png' },
                                                        { title: 'Mapa Mental: Semântica', type: 'Mapa Mental', placeholderColor: 'bg-blue-900/10', imageUrl: '/images/mapa-mental/mapa_mental_sentido_1771466121406.png' },
                                                    ]}
                                                />
                                            )
                                        },
                                        {
                                            id: 'visual',
                                            label: 'Macete Visual',
                                            icon: LuImage,
                                            content: (
                                                <div className="text-center p-6 space-y-4">
                                                    <h3 className="text-xl font-bold text-foreground mb-2">O Binômio de Ouro</h3>
                                                    <div className="text-6xl my-6 animate-pulse">⚖️ 📜 ⚖️</div>
                                                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                                                        "Sentido (Semântica) + Correção (Gramática). Se um dos pratos da balança cair, a reescrita é inválida!"
                                                    </p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                                                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Exemplo ERRADO (Semântica)</h4>
                                                            <p className="text-xs text-muted-foreground italic">"O governo <u>pretende</u> investir" &rarr; "O governo <u>vai</u> investir".</p>
                                                            <p className="text-[10px] mt-2 font-medium">Motivo: Pretensão é diferente de ação concreta.</p>
                                                        </div>
                                                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Exemplo ERRADO (Gramática)</h4>
                                                            <p className="text-xs text-muted-foreground italic">"Têm pessoas aqui" &rarr; "Há pessoas aqui".</p>
                                                            <p className="text-[10px] mt-2 font-medium">Motivo: O verbo 'ter' no sentido de 'existir' é erro gramatical na norma culta.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'audio',
                                            label: 'Áudio Resumo',
                                            icon: LuVolume2,
                                            content: (
                                                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                                                    <div className="w-full max-w-md">
                                                        <MusicPlayerCard
                                                            audioUrl="#"
                                                            titulo="Fundamentos da Reescrita"
                                                            artista="Prof. Antigravity"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            <QuizInterativo
                                questoes={quizM1}
                                titulo="Quiz de Fixação - Fundamentos"
                                icone="🎯"
                                numero={4}
                                onComplete={(score) => handleModuleProgress('modulo-1', 0, score)}
                            />
                        </div>
                    </Activity>

                    {/* Módulo 2: Técnicas */}
                    <Activity mode={activeTab === 'modulo-2' ? 'visible' : 'hidden'}>
                        <div className={`space-y-16 animate-in fade-in duration-500 ${activeTab !== 'modulo-2' ? 'hidden' : ''}`}>
                            <ModuleBanner
                                numero={2}
                                titulo="Técnicas e Transformações"
                                descricao="Aprenda as manobras gramaticais mais cobradas: vozes verbais, substituição de conectivos e nominalização."
                                gradiente="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
                            />

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-lg font-bold text-purple-700 dark:text-purple-400">1</span>
                                    Técnicas de Transformação Oracional
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Dominar a engenharia das frases permite que você identifique reescritas corretas que parecem "estranhas" mas são gramaticalmente perfeitas.
                                </p>
                                <ContentAccordion
                                    titulo="Engenharia de Frases: Ferramentas de Elite"
                                    icone="⚙️"
                                    slides={[
                                        {
                                            titulo: "Vozes Verbais",
                                            icone: "🗣️",
                                            conteudo: (
                                                <div className="space-y-4">
                                                    <p>A transposição da <strong>Voz Ativa</strong> para a <strong>Voz Passiva</strong> exige atenção ao verbo auxiliar (SER) + Particípio.</p>
                                                    <div className="p-4 bg-muted rounded-lg font-mono text-sm space-y-2">
                                                        <p className="text-red-600 dark:text-red-400">Ativa: "Muitos candidatos realizarão a prova."</p>
                                                        <p className="text-emerald-600 dark:text-emerald-400">Passiva: "A prova será realizada por muitos candidatos."</p>
                                                    </div>
                                                    <AlertBox tipo="warning" titulo="Atenção!">
                                                        O tempo verbal não pode mudar: 'Realizarão' (Futuro) &rarr; 'Será realizada' (Futuro). Se a reescrita usar 'Foi realizada', está errada.
                                                    </AlertBox>
                                                </div>
                                            )
                                        },
                                        {
                                            titulo: "O Segredo dos Conectivos",
                                            icone: "🔗",
                                            conteudo: (
                                                <div className="space-y-4">
                                                    <p>Substituir conjunções mantendo o valor semântico (concessão, causa, condição).</p>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded border border-indigo-100 dark:border-indigo-800">
                                                            <span className="font-bold block">Embora / Conquanto</span>
                                                            <span className="text-xs italic">(Concessivos)</span>
                                                        </div>
                                                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded border border-emerald-100 dark:border-emerald-800">
                                                            <span className="font-bold block">Caso / Se</span>
                                                            <span className="text-xs italic">(Condicionais)</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm">Obs: A reescrita de 'Embora' por 'Apesar de' exige que o verbo passe para a forma nominal (infinitivo/gerúndio).</p>
                                                </div>
                                            )
                                        },
                                        {
                                            titulo: "Nominalização",
                                            icone: "📝",
                                            conteudo: (
                                                <div className="space-y-4">
                                                    <p>Transformar orações (com verbos) em sintagmas nominais (substantivos).</p>
                                                    <div className="p-3 bg-muted rounded-lg font-mono text-xs">
                                                        "É importante que o setor público colabore" <br />
                                                        &rarr; "É importante a colaboração do setor público".
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Esta técnica reduz o número de orações e aumenta a densidade do texto.</p>
                                                </div>
                                            )
                                        },
                                        {
                                            titulo: "Mecanismos de Realce (Bechara)",
                                            icone: "✨",
                                            conteudo: (
                                                <div className="space-y-4">
                                                    <p>O uso do termo <strong>"é que"</strong> (partícula expletiva) serve para dar ênfase sem alterar a análise sintática original.</p>
                                                    <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800 font-mono text-xs">
                                                        "Nós precisamos de resultados." <br />
                                                        &rarr; "Nós <strong>é que</strong> precisamos de resultados."
                                                    </div>
                                                    <AlertBox tipo="info" titulo="Dica do Mestre">
                                                        Na reescrita, a inclusão ou retirada da partícula de realce não altera o sentido nem a correção gramatical da frase.
                                                    </AlertBox>
                                                </div>
                                            )
                                        },
                                        {
                                            titulo: "Transposição de Discursos",
                                            icone: "💬",
                                            conteudo: (
                                                <div className="space-y-4">
                                                    <p>Mudança do Discurso Direto para o Indireto.</p>
                                                    <div className="p-3 bg-muted rounded-lg space-y-2 text-xs">
                                                        <p><strong>Direto:</strong> Ele disse: "Chegarei amanhã".</p>
                                                        <p><strong>Indireto:</strong> Ele disse que chegaria no dia seguinte.</p>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">Note a mudança dos tempos verbais (Futuro do Presente &rarr; Futuro do Pretérito) e dos advérbios de tempo.</p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-lg font-bold text-purple-700 dark:text-purple-400">2</span>
                                    Substituição de Conectivos Críticos
                                </h2>
                                <AlertBox tipo="warning" titulo="O Caso 'Caso' vs 'Se'">
                                    A troca de <strong>Se</strong> por <strong>Caso</strong> exige mudança no modo verbal. Errar essa troca é fatal na Cesgranrio:<br />
                                    <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-lg space-y-2">
                                        <p><span className="text-indigo-600 dark:text-indigo-400 font-bold italic">"Se você ESTUDAR..."</span> (Futuro Subj.)</p>
                                        <p><span className="text-rose-600 dark:text-rose-400 font-bold italic">"Caso você ESTUDE..."</span> (Presente Subj.)</p>
                                    </div>
                                </AlertBox>
                            </section>

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-lg font-bold text-purple-700 dark:text-purple-400">3</span>
                                    Resumo do Módulo 2
                                </h2>

                                <LessonTabs
                                    tabs={[
                                        {
                                            id: 'video',
                                            label: 'Vídeo Aula',
                                            icon: LuPlay,
                                            content: (
                                                <div className="w-full flex flex-col items-center py-6">
                                                    <div className="w-full max-w-3xl">
                                                        <VideoModal
                                                            videoId="dQw4w9WgXcQ"
                                                            title="Técnicas e Transformações de Frases"
                                                            duration="12:20"
                                                            thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
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
                                                    tituloAula="Reescrita de Frases"
                                                    materia="Português"
                                                    profissao="Concurso Petrobras"
                                                    moduloNome="Técnicas e Transformações"
                                                    images={[
                                                        { title: 'Fluxograma: Transposição de Vozes', type: 'Fluxograma', placeholderColor: 'bg-purple-100', imageUrl: '/images/mapa-mental/reescrita_vozes_verbo_1771465223676.png' },
                                                        { title: 'Tabela: Equivalência de Conectivos', type: 'Tabela', placeholderColor: 'bg-emerald-100', imageUrl: '/images/mapa-mental/reescrita_tabela_conectivos_v2_1771465319559.png' },
                                                        { title: 'Fluxograma: Passos da Reescrita', type: 'Fluxograma', placeholderColor: 'bg-amber-100', imageUrl: '/images/mapa-mental/reescrita_fluxograma_v2_1771465342563.png' },
                                                    ]}
                                                />
                                            )
                                        },
                                        {
                                            id: 'visual',
                                            label: 'Macete Visual',
                                            icon: LuImage,
                                            content: (
                                                <div className="text-center p-6 space-y-4">
                                                    <h3 className="text-xl font-bold text-foreground mb-2">A Regra do "Modo"</h3>
                                                    <div className="text-6xl my-6 animate-bounce">🔄 ⚠️ 🔄</div>
                                                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                                                        "Se (Futuro do Subjuntivo) &rarr; Caso (Presente do Subjuntivo). Trocar conectivo sem ajustar o verbo é o erro preferido da banca!"
                                                    </p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                                                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Reescrita CORRETA</h4>
                                                            <p className="text-xs text-muted-foreground italic">"<u>Se</u> você <strong>estudar</strong>..." &rarr; "<u>Caso</u> você <strong>estude</strong>...".</p>
                                                            <p className="text-[10px] mt-2 font-medium">Ambas expressam a mesma condição com correção gramatical.</p>
                                                        </div>
                                                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                                                            <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Reescrita ERRADA</h4>
                                                            <p className="text-xs text-muted-foreground italic">"<u>Se</u> você <strong>estudar</strong>..." &rarr; "<u>Caso</u> você <strong>estudar</strong>...".</p>
                                                            <p className="text-[10px] mt-2 font-medium">Motivo: O 'caso' exige o modo subjuntivo no presente ('estude').</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'audio',
                                            label: 'Áudio Resumo',
                                            icon: LuVolume2,
                                            content: (
                                                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20">
                                                    <div className="w-full max-w-md">
                                                        <MusicPlayerCard
                                                            audioUrl="#"
                                                            titulo="Técnicas e Conectivos"
                                                            artista="Prof. Antigravity"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            <QuizInterativo
                                questoes={quizM2}
                                titulo="Quiz de Fixação - Técnicas"
                                icone="🎯"
                                numero={4}
                                onComplete={(score) => handleModuleProgress('modulo-2', 1, score)}
                            />
                        </div>
                    </Activity>

                    {/* Módulo 3: Prática Elite */}
                    <Activity mode={activeTab === 'modulo-3' ? 'visible' : 'hidden'}>
                        <div className={`space-y-16 animate-in fade-in duration-500 ${activeTab !== 'modulo-3' ? 'hidden' : ''}`}>
                            <ModuleBanner
                                numero={3}
                                titulo="Prática de Elite e Desafios"
                                descricao="Treine com armadilhas reais da Cesgranrio e realize o simulado final para dominar a reescritura."
                                gradiente="bg-gradient-to-br from-red-600 to-orange-700"
                            />

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-lg font-bold text-red-700 dark:text-red-400">1</span>
                                    As "Armadilhas de Reescrita" (Checklist)
                                </h2>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-500/5 rounded-xl border-l-4 border-slate-500 flex items-start gap-4">
                                        <LuTriangleAlert className="text-slate-500 mt-1 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-slate-700 dark:text-slate-300">Mudança de Ênfase</h4>
                                            <p className="text-sm text-muted-foreground">Inverter a ordem dos termos (ex: passar o predicativo para o início) pode mudar o que o autor quis destacar.</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-red-500/5 rounded-xl border-l-4 border-red-500 flex items-start gap-4">
                                        <LuTriangleAlert className="text-red-500 mt-1 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-red-700 dark:text-red-300">Alteração de Tempo Verbal</h4>
                                            <p className="text-sm text-muted-foreground">Trocar um Pretérito Perfeito (fato concluído) por Imperfeito (fato habitual) muda o sentido temporal.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg font-bold text-emerald-700 dark:text-emerald-400">2</span>
                                    Laboratório de Reescrita Cesgranrio
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Neste laboratório, vamos focar em <strong>cascas de banana</strong>. O objetivo é identificar o detalhe que invalida a reescrita. Use os FlipCards para ver a análise técnica.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FlipCard
                                        categoria="Vozes Verbais"
                                        frente="Ativa: 'A Petrobras investirá em energia limpa.'"
                                        verso="Passiva: 'Em energia limpa será investido pela Petrobras.' (INVÁLIDA: O objeto 'em energia limpa' é indireto, não vira sujeito. Correto: 'Haverá investimento em energia limpa...')"
                                    />
                                    <FlipCard
                                        categoria="Conectivos"
                                        frente="Original: 'Ficou em casa, visto que estava chovendo.'"
                                        verso="Reescrita: 'Ficou em casa, conquanto estivesse chovendo.' (INVÁLIDA: Visto que é CAUSA, Conquanto é CONCESSÃO. O sentido mudou 180 graus!)"
                                    />
                                </div>
                            </section>

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-400">3</span>
                                    Laboratório de Reescrita: Certo vs. Errado
                                </h2>
                                {shuffledChallenges.length > 0 && (
                                    <div className="space-y-8">
                                        <FlipCard
                                            categoria="Reescritura de Frases"
                                            numero={challengeIndex + 1}
                                            frente={
                                                <div className="space-y-4">
                                                    <div>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">Frase Original:</span>
                                                        <p className="italic text-foreground">"{currentChallenge.original}"</p>
                                                    </div>
                                                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">Reescrita Proposta:</span>
                                                        <p className="font-bold text-foreground">"{currentChallenge.reescrita}"</p>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground text-center mt-2">A reescrita acima está correta?</p>
                                                </div>
                                            }
                                            verso={
                                                <div className="space-y-4">
                                                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-tighter shadow-lg ${currentChallenge.status === 'correto' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                                                        {currentChallenge.status === 'correto' ? '✅ GABARITO: CORRETO' : '❌ GABARITO: ERRADO'}
                                                    </div>
                                                    <div className="p-4 bg-background/50 rounded-xl border border-border/50 text-sm leading-relaxed italic">
                                                        {currentChallenge.explicacao}
                                                    </div>
                                                </div>
                                            }
                                        />
                                        <div className="flex justify-center gap-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => setChallengeIndex((prev) => (prev + 1) % shuffledChallenges.length)}
                                                className="rounded-full px-8 py-6 font-bold text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                <LuShuffle className="mr-2" /> Próximo Desafio
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </section>

                            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                    <span className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-lg font-bold text-red-700 dark:text-red-400">4</span>
                                    Resumo do Módulo 3
                                </h2>

                                <LessonTabs
                                    tabs={[
                                        {
                                            id: 'video',
                                            label: 'Vídeo Aula',
                                            icon: LuPlay,
                                            content: (
                                                <div className="w-full flex flex-col items-center py-6">
                                                    <div className="w-full max-w-3xl">
                                                        <VideoModal
                                                            videoId="dQw4w9WgXcQ"
                                                            title="Checklist do Sucesso na Reescrita"
                                                            duration="15:00"
                                                            thumbnail="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop"
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
                                                    tituloAula="Reescrita de Frases"
                                                    materia="Português"
                                                    profissao="Concurso Petrobras"
                                                    moduloNome="Prática Elite"
                                                    images={[
                                                        { title: 'Checklist: Pecados Capitais', type: 'Infográfico', placeholderColor: 'bg-red-100 dark:bg-red-900/30' },
                                                        { title: 'Mapa Mental: Prática Elite', type: 'Mapa Mental', placeholderColor: 'bg-orange-100 dark:bg-orange-900/30' },
                                                    ]}
                                                />
                                            )
                                        },
                                        {
                                            id: 'visual',
                                            label: 'Macete Visual',
                                            icon: LuImage,
                                            content: (
                                                <div className="text-center p-4">
                                                    <h3 className="text-lg font-bold text-foreground mb-2">Checklist Fatal</h3>
                                                    <div className="text-5xl my-4">🎯 📝 🎯</div>
                                                    <p className="text-muted-foreground">"Sentido? Gramática? Lógica? Pontuação?"</p>
                                                    <p className="text-sm mt-2 text-muted-foreground">Reveja essa lista antes de marcar qualquer alternativa!</p>
                                                </div>
                                            )
                                        },
                                        {
                                            id: 'audio',
                                            label: 'Áudio Resumo',
                                            icon: LuVolume2,
                                            content: (
                                                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20">
                                                    <div className="w-full max-w-md">
                                                        <MusicPlayerCard
                                                            audioUrl="#"
                                                            titulo="Estratégia Final de Reescrita"
                                                            artista="Prof. Antigravity"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </section>

                            <QuizInterativo
                                questoes={quizFinal}
                                titulo="Simulado de Finalização - Reescrita"
                                icone="🏆"
                                numero={5}
                                onComplete={(score) => handleModuleProgress('modulo-3', 2, score)}
                            />
                        </div>
                    </Activity>
                </Tabs>


            </div>
        </div>
    );
}
