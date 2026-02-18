'use client';

import { useState, useEffect, useRef } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Tabs,
    TabsContent
} from '@/components/ui/tabs';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LuCheck,
    LuBookOpen,
    LuPlay,
    LuPause,
    LuVolume2,
    LuImage,
    LuFileText,
    LuSkipBack,
    LuSkipForward,
    LuRepeat,
    LuShuffle,
    LuHeart,
    LuTrophy,
    LuTarget,
    LuLayers,
    LuLink,
    LuTriangleAlert
} from 'react-icons/lu';

import {
    AlertBox,
    VideoModal,
    ImageCarousel,
    CardCarousel,
    ContentAccordion,
    TimelineItem,
    ComparisonSide,
    ModuleBanner,
    SummaryTabs,
    NanoImagePlaceholder,
    ModuleSummaryCarousel,
    MusicPlayerCard,
    LessonTabs,
    QuizInterativo,
    FlipCard,
    QuizQuestion,
    getRandomQuestions,
    ProgressIndicator,
    AulaProps,
    StickyModuleNav
} from './shared';

import { progressService } from '@/lib/services/progress';

// ── Fallback for React 19 Activity ───────────────────────────────────────
const Activity = ({ mode, children }: { mode: 'visible' | 'hidden'; children: React.ReactNode }) => {
    return (
        <div style={{ display: mode === 'hidden' ? 'none' : 'contents' }}>
            {children}
        </div>
    );
};

// ── Constants & Data ────────────────────────────────────────────────────

const QUIZ_M1_POOL: QuizQuestion[] = [
    {
        id: 1,
        pergunta: 'Segundo a visão de Bechara, qual a diferença fundamental entre compreensão e interpretação?',
        opcoes: [
            { label: 'A', valor: 'São sinônimos perfeitos' },
            { label: 'B', valor: 'Compreensão foca no que está escrito; Interpretação no que se conclui' },
            { label: 'C', valor: 'Interpretação foca na gramática; Compreensão no sentido' },
            { label: 'D', valor: 'Compreensão é para textos literários apenas' },
        ],
        correta: 'B',
        explicacao: 'Bechara distingue: Compreensão (Análise do que está explícito) vs. Interpretação (Síntese do que se deduz).',
    },
    {
        id: 2,
        pergunta: 'Um texto que apresenta argumentos para convencer o leitor sobre um ponto de vista é tipificado como:',
        opcoes: [
            { label: 'A', valor: 'Narrativo' },
            { label: 'B', valor: 'Descritivo' },
            { label: 'C', valor: 'Dissertativo-Argumentativo' },
            { label: 'D', valor: 'Injuntivo' },
        ],
        correta: 'C',
        explicacao: 'O texto dissertativo-argumentativo busca defender uma tese através de argumentos lógicos.',
    },
    {
        id: 3,
        pergunta: 'Ao ler "A Petrobras investe em energias limpas", a afirmação é um dado de:',
        opcoes: [
            { label: 'A', valor: 'Interpretação' },
            { label: 'B', valor: 'Compreensão' },
            { label: 'C', valor: 'Extrapolação' },
            { label: 'D', valor: 'Opinião' },
        ],
        correta: 'B',
        explicacao: 'É um dado explícito no texto (compreensão).',
    },
    {
        id: 4,
        pergunta: 'Qual a principal característica do texto INJUNTIVO?',
        opcoes: [
            { label: 'A', valor: 'Contar uma história' },
            { label: 'B', valor: 'Descrever uma cena' },
            { label: 'C', valor: 'Instruir ou dar ordens (ex: manual)' },
            { label: 'D', valor: 'Expor dados científicos' },
        ],
        correta: 'C',
        explicacao: 'Manuais, receitas e editais são textos injuntivos ou instrucionais.',
    }
];

const QUIZ_M2_POOL: QuizQuestion[] = [
    {
        id: 1,
        pergunta: 'Qual o papel fundamental das conjunções (conectivos) na interpretação de texto?',
        opcoes: [
            { label: 'A', valor: 'Apenas enfeitar o texto' },
            { label: 'B', valor: 'Estabelecer relações lógico-semânticas entre as ideias' },
            { label: 'C', valor: 'Substituir os substantivos para evitar repetição' },
            { label: 'D', valor: 'Indicar apenas o início de novos parágrafos' },
        ],
        correta: 'B',
        explicacao: 'Os conectivos são as "dobradiças" do texto, indicando oposição, causa, conclusão, etc.',
    },
    {
        id: 2,
        pergunta: 'Na frase "Trabalhou muito, ENTRETANTO não foi promovido", o sentido do conectivo é:',
        opcoes: [
            { label: 'A', valor: 'Adição' },
            { label: 'B', valor: 'Causa' },
            { label: 'C', valor: 'Oposição (Adversidade)' },
            { label: 'D', valor: 'Conclusão' },
        ],
        correta: 'C',
        explicacao: '"Entretanto" é uma conjunção adversativa, indicando que o resultado foi contrário ao esperado.',
    },
    {
        id: 3,
        pergunta: 'Qual conectivo abaixo indica uma CONDIÇÃO?',
        opcoes: [
            { label: 'A', valor: 'Porque' },
            { label: 'B', valor: 'Caso' },
            { label: 'C', valor: 'Portanto' },
            { label: 'D', valor: 'Embora' },
        ],
        correta: 'B',
        explicacao: '"Caso você estude, passará" — indica uma condição necessária.',
    },
    {
        id: 4,
        pergunta: 'O conectivo "PORQUANTO" geralmente introduz uma:',
        opcoes: [
            { label: 'A', valor: 'Consequência' },
            { label: 'B', valor: 'Explicação ou Causa' },
            { label: 'C', valor: 'Finalidade' },
            { label: 'D', valor: 'Concessão' },
        ],
        correta: 'B',
        explicacao: '"Porquanto" equivale a "porque" ou "visto que", sendo explicativo ou causal.',
    }
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
    {
        id: 1,
        pergunta: 'O erro de EXTRAPOLAÇÃO ocorre quando o candidato:',
        opcoes: [
            { label: 'A', valor: 'Entende menos do que o texto disse' },
            { label: 'B', valor: 'Traz ideias externas que não estão no texto' },
            { label: 'C', valor: 'Diz exatamente o oposto do texto' },
            { label: 'D', valor: 'Resume corretamente o tema' },
        ],
        correta: 'B',
        explicacao: 'Extrapolar é ir além dos limites do texto, usando conhecimento de mundo onde a banca pediu fidelidade textual.',
    },
    {
        id: 2,
        pergunta: 'A REDUÇÃO é um erro de interpretação que consiste em:',
        opcoes: [
            { label: 'A', valor: 'Escrever nomes em letras minúsculas' },
            { label: 'B', valor: 'Dar atenção apenas a um aspecto, ignorando o contexto geral' },
            { label: 'C', valor: 'Aumentar a letra do texto' },
            { label: 'D', valor: 'Trocar o título do texto' },
        ],
        correta: 'B',
        explicacao: 'Reduzir é focar em um detalhe e tratá-lo como se fosse a verdade total do texto.',
    },
    {
        id: 3,
        pergunta: 'Em questões da Cesgranrio, ao encontrar "CONTRADIZ o texto", o candidato deve buscar:',
        opcoes: [
            { label: 'A', valor: 'Uma afirmação idêntica' },
            { label: 'B', valor: 'Uma afirmação que nega o que foi dito no texto' },
            { label: 'C', valor: 'Uma afirmação que explica o texto' },
            { label: 'D', valor: 'Um sinônimo' },
        ],
        correta: 'B',
        explicacao: 'Contradição é a negação direta de uma informação presente na base textual.',
    },
    {
        id: 4,
        pergunta: 'A estratégia de "Leitura Vertical" serve para:',
        opcoes: [
            { label: 'A', valor: 'Ler de cima para baixo sem parar' },
            { label: 'B', valor: 'Identificar palavras-chave e a estrutura do argumento' },
            { label: 'C', valor: 'Contar quantas linhas o texto tem' },
            { label: 'D', valor: 'Ler apenas o primeiro parágrafo' },
        ],
        correta: 'B',
        explicacao: 'Serve para mapear a "espinha dorsal" do texto antes da leitura minuciosa.',
    }
];

interface Challenge {
    wrong: string;
    correct: string;
    explanation: string;
}

const CHALLENGE_POOL: Challenge[] = [
    {
        wrong: "O autor afirma que o pré-sal é a única solução para a crise energética.",
        correct: "O autor aponta o pré-sal como uma das alternativas viáveis, citando desafios técnicos.",
        explanation: "Cuidado com o erro de EXTRAPOLAÇÃO. Evite termos absolutos como 'única' se o texto for ponderado."
    },
    {
        wrong: "O texto critica duramente a Petrobras pela falta de investimentos.",
        correct: "O texto analisa a oscilação dos investimentos frente ao cenário global de petróleo.",
        explanation: "Evite converter uma análise técnica em uma CRÍTICA pessoal. Mantenha a objetividade do texto."
    },
    {
        wrong: "Para o autor, a transição energética é impossível no cenário atual.",
        correct: "O autor discute os gargalos logísticos que atrasam a transição energética.",
        explanation: "Erro de CONTRADIÇÃO: Discutir dificuldades não é o mesmo que afirmar impossibilidade."
    },
    {
        wrong: "A energia solar é apresentada como o tema central do artigo.",
        correct: "A energia solar é citada como um exemplo de diversificação da matriz brasileira.",
        explanation: "Erro de REDUÇÃO: Não confunda um exemplo usado no parágrafo com o tema principal do texto."
    }
];

// ── Main Component ──────────────────────────────────────────────────────

export default function AulaInterpretacaoTexto({
    onComplete,
    isCompleted,
    loading,
    xpGanho = 50,
    currentProgress,
    onUpdateProgress,
}: AulaProps) {
    const MODULE_DEFS = [
        { id: 'modulo-1', label: 'Módulo 1', titulo: 'Fundamentos e Cognição' },
        { id: 'modulo-2', label: 'Módulo 2', titulo: 'Mecanismos de Coesão' },
        { id: 'modulo-3', label: 'Módulo 3', titulo: 'Estratégias de Elite' },
    ];

    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
    const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
    const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);
    const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([]);
    const [challengeIndex, setChallengeIndex] = useState(0);
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('aula_interpretacao_progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const restoredSet = new Set(parsed.completedModules || []);
                setCompletedModules(restoredSet as Set<string>);
            } catch (e) {
                console.error("Failed to restore", e);
            }
        }

        setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 4));
        setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 4));
        setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 4));
        setShuffledChallenges([...CHALLENGE_POOL].sort(() => 0.5 - Math.random()));

        if (currentProgress >= 100 || isCompleted) setShowCompletionBadge(true);
    }, [isCompleted]);

    const saveProgress = (newSet: Set<string>) => {
        const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
        localStorage.setItem('aula_interpretacao_progress', JSON.stringify({
            completedModules: Array.from(newSet),
            lastUpdated: new Date().toISOString()
        }));
        if (onUpdateProgress) onUpdateProgress(percent);
    };

    const handleModuleProgress = (moduleId: string, index: number, score: number) => {
        if (score >= 70) {
            const newSet = new Set(completedModules);
            newSet.add(moduleId);
            setCompletedModules(newSet);
            saveProgress(newSet);

            if (index < MODULE_DEFS.length - 1) {
                setTimeout(() => {
                    setActiveTab(MODULE_DEFS[index + 1].id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 1500);
            } else {
                setShowCompletionBadge(true);
                if (onComplete) onComplete();
            }
        }
    };

    const isModuleUnlocked = (index: number) => {
        if (index === 0) return true;
        return completedModules.has(MODULE_DEFS[index - 1].id);
    };

    if (loading) return null;

    return (
        <div className="space-y-6 pb-20">
            <ProgressIndicator />

            {showCompletionBadge && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-4 shadow-sm mb-6 animate-in slide-in-from-top-4 duration-700">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                        <LuCheck size={24} strokeWidth={3} />
                    </div>
                    <div>
                        <h3 className="text-green-800 dark:text-green-300 font-bold text-lg">Aula Concluída!</h3>
                        <p className="text-green-700 dark:text-green-400 text-sm">Parabéns! Você dominou as técnicas de Interpretação de Texto.</p>
                    </div>
                </div>
            )}

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

                {/* ─── MÓDULO 1: FUNDAMENTOS ─── */}
                <Activity mode={activeTab === 'modulo-1' ? 'visible' : 'hidden'}>
                    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ModuleBanner
                            numero={1}
                            titulo="Fundamentos e Cognição"
                            descricao="A base teórica de Bechara e as tipologias essenciais para a Petrobras."
                            gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
                        />

                        {/* SEÇÃO 1: BECHARA DETALHADO */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold text-yellow-700 dark:text-yellow-400">1</span>
                                Visão de Bechara: O Texto como Unidade de Sentido
                            </h2>
                            <div className="space-y-8">
                                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6 md:p-8">
                                    <p className="text-muted-foreground text-lg leading-relaxed italic">
                                        "O texto não é uma soma de frases, mas um todo coerente."
                                    </p>
                                    <p className="text-foreground mt-4 font-medium">— Evanildo Bechara</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase text-sm tracking-widest px-4 py-1 bg-indigo-50 rounded-full w-fit">
                                            <LuTarget /> Análise (Compreensão)
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            É o micro-nível. Você foca nos dados, no vocabulário e na sintaxe. A pergunta de prova será: "O texto afirma...", "Segundo o autor...". Aqui não há espaço para deduções.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-purple-600 font-bold uppercase text-sm tracking-widest px-4 py-1 bg-purple-50 rounded-full w-fit">
                                            <LuTrophy /> Síntese (Interpretação)
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            É o macro-nível. Você conecta as partes para entender a intenção por trás das palavras. A pergunta será: "Infere-se que...", "Conclui-se que...". É o diálogo com o implícito.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SEÇÃO 2: TIPOLOGIA TEXTUAL (NOVO) */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-lg font-bold text-blue-700 dark:text-blue-400">2</span>
                                Tipologia Textual: Como o Texto se Organiza
                            </h2>
                            <p className="text-muted-foreground text-lg">Identificar o tipo de texto é o primeiro passo para não errar a interpretação central.</p>

                            <div className="w-full">
                                <Carousel opts={{ loop: true, align: 'start' }} className="w-full">
                                    <CarouselContent className="-ml-4 pb-4">
                                        <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                                            <FlipCard
                                                categoria="Tipologia Textual"
                                                frente={
                                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                                        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                                            <LuLayers size={32} />
                                                        </div>
                                                        <h3 className="text-xl font-bold">Dissertativo-Argumentativo</h3>
                                                        <p className="text-sm text-muted-foreground">O queridinho da Cesgranrio</p>
                                                    </div>
                                                }
                                                verso={
                                                    <div className="space-y-4">
                                                        <p><strong>Definição:</strong> Expõe um assunto e defende uma opinião (tese) com argumentos.</p>
                                                        <div className="p-3 bg-background/50 rounded-lg border border-indigo-500/20 text-xs italic">
                                                            "A exploração do petróleo é vital, embora a transição energética seja urgente. Portanto, o Brasil deve..."
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </CarouselItem>

                                        <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                                            <FlipCard
                                                categoria="Tipologia Textual"
                                                frente={
                                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                                        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                                            <LuBookOpen size={32} />
                                                        </div>
                                                        <h3 className="text-xl font-bold">Narrativo e Descritivo</h3>
                                                        <p className="text-sm text-muted-foreground">O que conta e o que pinta</p>
                                                    </div>
                                                }
                                                verso={
                                                    <div className="space-y-4">
                                                        <div>
                                                            <strong className="text-emerald-400">Narrativo:</strong>
                                                            <p className="text-sm">Foca em ações no tempo (personagens, enredo, evolução temporal).</p>
                                                        </div>
                                                        <div className="border-t border-white/10 pt-2">
                                                            <strong className="text-emerald-400">Descritivo:</strong>
                                                            <p className="text-sm">Foca em características (pintura com palavras, adjetivação, cena estática).</p>
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </CarouselItem>

                                        <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                                            <FlipCard
                                                categoria="Tipologia Textual"
                                                frente={
                                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                                        <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                            <LuFileText size={32} />
                                                        </div>
                                                        <h3 className="text-xl font-bold">Injuntivo (Instrucional)</h3>
                                                        <p className="text-sm text-muted-foreground">O que manda fazer</p>
                                                    </div>
                                                }
                                                verso={
                                                    <div className="space-y-4">
                                                        <p><strong>Definição:</strong> Visa orientar o comportamento do leitor. Imperativo e verbos de comando.</p>
                                                        <ul className="list-disc pl-4 text-sm space-y-1">
                                                            <li>Manuais técnicos</li>
                                                            <li>Receitas</li>
                                                            <li>Editais</li>
                                                            <li>Normas de Segurança (SMS)</li>
                                                        </ul>
                                                    </div>
                                                }
                                            />
                                        </CarouselItem>
                                    </CarouselContent>
                                    <div className="flex justify-center gap-2 mt-4">
                                        <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-700 text-slate-400" />
                                        <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-700 text-slate-400" />
                                    </div>
                                </Carousel>
                            </div>
                        </section>

                        {/* SEÇÃO 3: MULTIMÍDIA */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-400">3</span>
                                Resumo e Multimedia
                            </h2>
                            <LessonTabs tabs={[
                                { id: 'video', label: 'Vídeo Aula', icon: LuPlay, content: <VideoModal videoId="dQw4w9WgXcQ" title="Bechara e a Lógica Textual" duration="15:00" thumbnail={null} /> },
                                { id: 'audio', label: 'Música do Módulo', icon: LuVolume2, content: <MusicPlayerCard audioUrl="#" titulo="Ritmo da Leitura" artista="Bechara Club" lyrics="No texto eu busco a marca, \n Na linha eu vejo o fato, \n Mas é na entrelinha \n Que eu firmo o meu contrato!" /> }
                            ]} />
                        </section>

                        {/* SEÇÃO 4: QUIZ M1 */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold text-yellow-700 dark:text-yellow-400">4</span>
                                Quiz de Fixação - Fundamentos e Cognição
                            </h2>
                            <QuizInterativo questoes={quizM1} titulo="Quiz de Fixação - Fundamentos e Cognição" icone="🎯" onComplete={(score) => handleModuleProgress('modulo-1', 0, score)} />
                        </section>
                    </div>
                </Activity>

                {/* ─── MÓDULO 2: COESÃO ─── */}
                <Activity mode={activeTab === 'modulo-2' ? 'visible' : 'hidden'}>
                    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ModuleBanner
                            numero={2}
                            titulo="Mecanismos de Coesão"
                            descricao="As ferramentas que dão liga ao texto e os conectores lógicos da Cesgranrio."
                            gradiente="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800"
                        />

                        {/* SEÇÃO 1: OS CONECTIVOS (REINICIA) */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold text-yellow-700 dark:text-yellow-400">1</span>
                                Os Conectivos: O Mapa das Relações Lógicas
                            </h2>
                            <div className="space-y-6">
                                <AlertBox tipo="info" titulo="O Pulo do Gato"><p>Trocar um "Mas" por um "Embora" muda a estrutura gramatical mas mantém a ideia de oposição. A banca ama isso!</p></AlertBox>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Oposição', list: ['Mas', 'Porém', 'Contudo', 'Todavia', 'Entretanto'], color: 'text-red-500' },
                                        { label: 'Causa/Explicação', list: ['Porque', 'Já que', 'Pois', 'Visto que', 'Porquanto'], color: 'text-blue-500' },
                                        { label: 'Concessão', list: ['Embora', 'Ainda que', 'Apesar de', 'Conquanto'], color: 'text-emerald-500' },
                                        { label: 'Conclusão', list: ['Logo', 'Portanto', 'Assim', 'Por conseguinte'], color: 'text-indigo-500' },
                                        { label: 'Condição', list: ['Se', 'Caso', 'Contanto que', 'Desde que'], color: 'text-orange-500' },
                                        { label: 'Finalidade', list: ['Para que', 'A fim de que', 'Com o intuito de'], color: 'text-purple-500' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-6 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                                            <h4 className={`font-bold mb-3 flex items-center gap-2 ${item.color}`}>
                                                <LuLink /> {item.label}
                                            </h4>
                                            <ul className="grid grid-cols-1 gap-1">
                                                {item.list.map((c, i) => <li key={i} className="text-sm text-muted-foreground font-medium">• {c}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* SEÇÃO 2: EXEMPLOS PRÁTICOS */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg font-bold text-emerald-700 dark:text-emerald-400">2</span>
                                Substituição de Conectivos na Prática
                            </h2>
                            <p className="text-muted-foreground">Veja como o sentido se mantém mas a sintaxe se altera:</p>
                            <CardCarousel titulo="Exemplos de Reescrita" cards={[
                                { icone: '⚖️', titulo: 'Conjunção Coordenada', descricao: <div className="pb-4">Choveu muito, <b>MAS</b> fomos trabalhar. (Relação de oposição com ênfase no trabalho)</div>, corFundo: 'bg-red-500/10' },
                                { icone: '🧠', titulo: 'Conjunção Subordinada', descricao: <div className="pb-4"><b>EMBORA</b> tenha chovido muito, fomos trabalhar. (Concessão: ênfase no fato de chover, mantendo o sentido)</div>, corFundo: 'bg-emerald-500/10' },
                                { icone: '🔍', titulo: 'Causa vs Explicação', descricao: <div className="pb-4">Faltei <b>PORQUE</b> estava doente (Causa real). Venha, <b>PORQUE</b> eu mandei (Explicação/Ordem).</div>, corFundo: 'bg-blue-500/10' },
                                { icone: '📈', titulo: 'Conectivo Consecutivo', descricao: <div className="pb-4">Choveu tanto <b>QUE</b> a rua alagou. (Troque por: <i>de tal sorte que</i>, <i>de modo que</i>)</div>, corFundo: 'bg-purple-500/10' },
                                { icone: '⏳', titulo: 'Conectivo Condicional', descricao: <div className="pb-4"><b>CASO</b> chova, não irei. (Troque por: <i>desde que</i> + subjuntivo, <i>contanto que</i>)</div>, corFundo: 'bg-orange-500/10' },
                                { icone: '🎯', titulo: 'Conectivo Finalidade', descricao: <div className="pb-4">Estudo <b>PARA QUE</b> passe. (Troque por: <i>a fim de que</i>, <i>com o intuito de</i>)</div>, corFundo: 'bg-yellow-500/10' }
                            ]} />
                        </section>

                        {/* SEÇÃO 3: QUIZ M2 */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold text-yellow-700 dark:text-yellow-400">3</span>
                                Quiz de Fixação - Mecanismos de Coesão
                            </h2>
                            <QuizInterativo questoes={quizM2} titulo="Quiz de Fixação - Mecanismos de Coesão" icone="🎯" onComplete={(score) => handleModuleProgress('modulo-2', 1, score)} />
                        </section>
                    </div>
                </Activity>

                {/* ─── MÓDULO 3: ESTRATÉGIAS ─── */}
                <Activity mode={activeTab === 'modulo-3' ? 'visible' : 'hidden'}>
                    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ModuleBanner
                            numero={3}
                            titulo="Estratégias de Elite"
                            descricao="As 3 grades armadilhas e técnicas de varredura Cesgranrio."
                            gradiente="bg-gradient-to-br from-purple-700 to-indigo-900"
                        />

                        {/* SEÇÃO 1: ARMADILHAS (REINICIA) */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-lg font-bold text-red-700 dark:text-red-400">1</span>
                                As "Três Portas do Erro" na Interpretação
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-4 right-4 text-red-500/20 group-hover:scale-125 transition-transform duration-500"><LuTriangleAlert size={48} /></div>
                                    <h4 className="text-xl font-bold text-red-600 mb-3">Extrapolação</h4>
                                    <p className="text-sm text-red-900/70 dark:text-red-300">Quando você traz o "que sabe de casa" para a prova. Se o texto não disse, é falso!</p>
                                </div>
                                <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-4 right-4 text-orange-500/20 group-hover:scale-125 transition-transform duration-500"><LuPause size={48} /></div>
                                    <h4 className="text-xl font-bold text-orange-600 mb-3">Redução</h4>
                                    <p className="text-sm text-orange-900/70 dark:text-orange-300">O texto diz algo amplo, e a alternativa foca em apenas um detalhe como se fosse o todo.</p>
                                </div>
                                <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-4 right-4 text-rose-500/20 group-hover:scale-125 transition-transform duration-500"><LuSkipBack size={48} /></div>
                                    <h4 className="text-xl font-bold text-rose-600 mb-3">Contradição</h4>
                                    <p className="text-sm text-rose-900/70 dark:text-rose-300">A alternativa afirma o oposto do que o autor defendeu ou sugeriu nas entrelinhas.</p>
                                </div>
                            </div>
                        </section>

                        {/* SEÇÃO 2: DESAFIO PRÁTICO */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-400">2</span>
                                Desafio Prático: Laboratório de Gabarito
                            </h2>
                            {shuffledChallenges.length > 0 && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8" key={`challenge-${challengeIndex}`}>
                                        <div className="space-y-3">
                                            <h4 className="font-bold text-red-500 flex items-center gap-2">❌ Onde a maioria erra:</h4>
                                            <div className="h-full min-h-[180px] p-6 bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-2xl flex items-center justify-center dark:from-red-900/10 dark:to-rose-900/10">
                                                <p className="line-through text-lg text-red-800/70 font-medium decoration-red-500/50">"{shuffledChallenges[challengeIndex].wrong}"</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="font-bold text-emerald-500 flex items-center gap-2">✅ Como você vai acertar:</h4>
                                            <div className="h-full min-h-[180px] p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl flex flex-col justify-center dark:from-emerald-900/10 dark:to-teal-900/10">
                                                <p className="text-lg font-bold text-emerald-800 mb-4 text-center">"{shuffledChallenges[challengeIndex].correct}"</p>
                                                <div className="p-4 bg-white/60 rounded-xl border border-emerald-100/50 backdrop-blur-sm flex items-start gap-3 dark:bg-black/20">
                                                    <span className="text-lg">💡</span> <p className="text-sm font-medium leading-relaxed text-emerald-700">{shuffledChallenges[challengeIndex].explanation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center gap-4">
                                        <Button variant="outline" onClick={() => setChallengeIndex((prev) => (prev + 1) % shuffledChallenges.length)} className="rounded-full px-8 py-6 font-bold text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">🔄 Próximo Desafio</Button>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* SEÇÃO 3: SIMULADO FINAL */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                                <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold text-yellow-700 dark:text-yellow-400">3</span>
                                Simulado Final: Quiz de Fixação - Estratégias de Elite
                            </h2>
                            <QuizInterativo questoes={quizFinal} titulo="Quiz de Fixação - Estratégias de Elite" icone="🏆" onComplete={(score) => handleModuleProgress('modulo-3', 2, score)} />
                        </section>
                    </div>
                </Activity>
            </Tabs>


        </div>
    );
}
