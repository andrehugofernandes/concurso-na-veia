'use client';

import { useState, useEffect, useCallback } from 'react';

// Fallback for React 19 Activity (Offscreen) API
// Since unstable_Activity is not exported in the current build, we use a CSS-based fallback
// to ensure state is preserved (component stays mounted) but hidden.
const Activity = ({ mode, children }: { mode: 'visible' | 'hidden'; children: React.ReactNode }) => {
    return (
        <div style={{ display: mode === 'hidden' ? 'none' : 'contents' }}>
            {children}
        </div>
    );
};

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    SectionTitle,
    FlipCard,
    ContentAccordion,
    CardCarousel,
    QuizInterativo,
    TabbedContent,
    ModuleBanner,
    TimelineItem,
    AlertBox,
    MusicPlayerCard,
    ProgressIndicator,
    QuizQuestion,
    getRandomQuestions,
    SummaryTabs,
    StickyModuleNav
} from './shared';
import { useAulaProgress } from '@/hooks/useAulaProgress';
import {
    LuTriangleAlert as LuAlertTriangle,
    LuCircleCheck as LuCheckCircle,
    LuCircleX as LuXCircle,
    LuQuote,
    LuClock,
    LuBrain,
    LuBookOpen,
    LuCircleAlert as LuAlertCircle,
    LuPenTool,
    LuList,
    LuCirclePlay as LuPlayCircle,
    LuMusic,
    LuCheck,
    LuX,
    LuLockOpen as LuUnlock,
    LuLock
} from 'react-icons/lu';

// ── DEFINIÇÃO DOS MÓDULOS ──
const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Sintaxe e Fundamentos' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'A Vírgula (O Chefão)' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'Pontuação Avançada' },
] as const;

// ── DADOS DO QUIZ POR MÓDULO ──
const QUIZ_MODULO_1: QuizQuestion[] = [
    {
        id: 101,
        pergunta: "Na frase 'Os engenheiros da plataforma chegaram.', qual é a relação entre 'Os engenheiros' e 'chegaram'?",
        opcoes: [
            { label: "A", valor: "Sujeito e Verbo (Nunca separar por vírgula)" },
            { label: "B", valor: "Verbo e Objeto (Pode separar)" },
            { label: "C", valor: "Vocativo e Verbo" },
            { label: "D", valor: "Aposto e Verbo" },
            { label: "E", valor: "Nenhuma das anteriores" }
        ],
        correta: "A",
        explicacao: "Esta é a ordem direta (S-V-C). Jamais se separa o Sujeito do Verbo com vírgula!"
    }
];

const QUIZ_MODULO_2: QuizQuestion[] = [
    {
        id: 1,
        pergunta: "Assinale a alternativa em que a virgula foi empregada corretamente, de acordo com a norma-padrão.",
        opcoes: [
            { label: "A", valor: "O diretor, da empresa, convocou todos para a reunião." },
            { label: "B", valor: "Os funcionários que chegaram cedo, receberam bônus." },
            { label: "C", valor: "A Petrobras, gigante do petróleo, investe em renováveis." },
            { label: "D", valor: "O gerente informou, aos empregados as novas metas." },
            { label: "E", valor: "A plataforma P-70, opera na Bacia de Santos desde 2020." }
        ],
        correta: "C",
        explicacao: "Correto! 'Gigante do petróleo' é um aposto explicativo e deve vir isolado por vírgulas."
    },
    {
        id: 2,
        pergunta: "Em qual das frases abaixo a vírgula é PROIBIDA?",
        opcoes: [
            { label: "A", valor: "João, venha aqui." },
            { label: "B", valor: "O técnico de segurança, alertou sobre o risco." },
            { label: "C", valor: "No Rio de Janeiro, a sede foi inaugurada." },
            { label: "D", valor: "Comprei equipamentos, ferramentas e EPIs." },
            { label: "E", valor: "A refinaria, que fica em Cubatão, é antiga." }
        ],
        correta: "B",
        explicacao: "Proibido separar sujeito (O técnico de segurança) do predicado (alertou...) com vírgula."
    },
    {
        id: 4,
        pergunta: "Analise: 'A produção de óleo aumentou, mas o lucro caiu.' A vírgula antes do 'mas' é:",
        opcoes: [
            { label: "A", valor: "Proibida." },
            { label: "B", valor: "Facultativa." },
            { label: "C", valor: "Obrigatória (Adversativa)." },
            { label: "D", valor: "Erro de digitação." },
            { label: "E", valor: "Uso poético." }
        ],
        correta: "C",
        explicacao: "Antes das conjunções adversativas (mas, porém, contudo...), o uso da vírgula é OBRIGATÓRIO."
    }
];

const QUIZ_MODULO_3: QuizQuestion[] = [
    {
        id: 3,
        pergunta: "Sobre o uso do Ponto e Vírgula (;), assinale a correta:",
        opcoes: [
            { label: "A", valor: "Serve para encerrar frases exclamativas." },
            { label: "B", valor: "Deve ser usado antes da conjunção 'e' sempre." },
            { label: "C", valor: "Separa itens de uma enumeração ou orações coordenadas longas." },
            { label: "D", valor: "Substitui os dois pontos em citações." },
            { label: "E", valor: "Nunca pode ser usado em leis." }
        ],
        correta: "C",
        explicacao: "O ponto e vírgula é clássico em enumerações e para separar orações que já possuem vírgulas internas."
    },
    {
        id: 5,
        pergunta: "Qual frase exige DOIS PONTOS (:) segundo a norma culta?",
        opcoes: [
            { label: "A", valor: "O engenheiro disse que o projeto está pronto." },
            { label: "B", valor: "Comprei: canetas e lápis." },
            { label: "C", valor: "A regra é clara: segurança em primeiro lugar." },
            { label: "D", valor: "Gostaria de saber: quem fez isso?" },
            { label: "E", valor: "A plataforma: P-50." }
        ],
        correta: "C",
        explicacao: "Os dois pontos introduzem uma síntese/aposto: 'segurança em primeiro lugar'."
    }
];

export default function AulaPontuacao() {
    const { completed, completeAula, loading } = useAulaProgress('portugues', 'pontuacao');
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    // Carrega progresso local e do banco
    useEffect(() => {
        const localSaved = localStorage.getItem('aula_progress_pontuacao');
        if (localSaved) {
            const parsed = JSON.parse(localSaved);
            const done = new Set<string>(parsed.completedModules || []);
            setCompletedModules(done);

            // Se já tiver completado via DB, marca tudo
            if (completed) {
                const allModules = new Set(MODULE_DEFS.map(m => m.id));
                setCompletedModules(allModules);
                setShowCompletionBadge(true);
            } else {
                // Navega para o próximo módulo disponível
                const lastDoneIndex = MODULE_DEFS.findIndex(m => done.has(m.id));
                if (lastDoneIndex >= 0 && lastDoneIndex < MODULE_DEFS.length - 1) {
                    setActiveTab(MODULE_DEFS[lastDoneIndex + 1].id);
                }
            }
        } else if (completed) {
            // Fallback se limpar cache mas vier completado do DB
            const allModules = new Set(MODULE_DEFS.map(m => m.id));
            setCompletedModules(allModules);
            setShowCompletionBadge(true);
        }
    }, [completed]);

    const isModuleUnlocked = useCallback((moduleIndex: number) => {
        if (completed) return true; // Se a aula está completa, tudo desbloqueado
        if (moduleIndex === 0) return true;
        const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
        return prevModuleId ? completedModules.has(prevModuleId) : false;
    }, [completedModules, completed]);

    const handleModuleComplete = async (moduleId: string, score: number) => {
        if (score >= 70) {
            const newSet = new Set(completedModules).add(moduleId);
            setCompletedModules(newSet);
            localStorage.setItem('aula_progress_pontuacao', JSON.stringify({ completedModules: Array.from(newSet) }));

            const index = MODULE_DEFS.findIndex(m => m.id === moduleId);

            // Se for o último módulo, finaliza aula
            if (index === MODULE_DEFS.length - 1) {
                await handleFinalComplete();
            } else {
                // Avança para o próximo
                setActiveTab(MODULE_DEFS[index + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            // Opcional: Toast de erro
            alert("Você precisa de 70% de acerto para avançar!");
        }
    };

    const handleFinalComplete = async () => {
        if (!completed && completeAula) {
            await completeAula();
            setShowCompletionBadge(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="pb-20 animate-in fade-in duration-500">
            <div className="max-w-6xl mx-auto space-y-12 pt-12 px-6">
                <ProgressIndicator />

                {/* BADGE DE CONCLUSÃO */}
                {showCompletionBadge && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-6 shadow-sm mb-6 animate-in slide-in-from-top-4 duration-700">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 shrink-0">
                            <LuCheck size={32} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-green-800 dark:text-green-300 font-bold text-2xl mb-1">Aula Concluída!</h3>
                            <p className="text-green-700 dark:text-green-400 text-lg">
                                Você dominou a Pontuação! Seu progresso foi registrado com sucesso.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <Tabs value={activeTab} onValueChange={(val) => {
                const idx = MODULE_DEFS.findIndex(m => m.id === val);
                if (isModuleUnlocked(idx)) setActiveTab(val);
            }} className="w-full mt-12">

                <StickyModuleNav
                    modules={Array.from(MODULE_DEFS)}
                    activeTab={activeTab}
                    completedModules={completedModules}
                    isModuleUnlocked={isModuleUnlocked}
                />

                {/* === MÓDULO 1: SINTAXE E FUNDAMENTOS === */}
                <TabsContent value="modulo-1" className="space-y-12 max-w-6xl mx-auto px-6 mt-12">
                    <ModuleBanner
                        numero={1}
                        titulo="Sintaxe e Fundamentos"
                        descricao="A base de tudo: por que a vírgula não é um respiro?"
                        gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600"
                    />

                    {/* Visão Geral */}
                    <SummaryTabs
                        numero={1}
                        titulo="Visão Geral"
                        videoId="dQw4w9WgXcQ"
                        videoDuration="05:30"
                        visualContent={
                            <div className="text-center space-y-6">
                                <h4 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">O Mapa da Mina</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                        <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                                            <LuCheck className="text-green-500" /> A Ordem Direta
                                        </div>
                                        <p className="text-sm text-muted-foreground">O coração da pontuação: Sujeito + Verbo + Complemento.</p>
                                    </div>
                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                        <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                                            <LuCheck className="text-green-500" /> O Mito do Respiro
                                        </div>
                                        <p className="text-sm text-muted-foreground">Por que você erra ao pontuar como se estivesse falando.</p>
                                    </div>
                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                                        <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                                            <LuCheck className="text-green-500" /> Identificação
                                        </div>
                                        <p className="text-sm text-muted-foreground">Como encontrar o sujeito em frases complexas da Cesgranrio.</p>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    {/* NOVO: DIAGNÓSTICO PROVOCATIVO COM FLIP CARDS */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <SectionTitle
                            numero="1.1"
                            titulo="Desafio Inicial: Vírgula ou Pausa?"
                            subtitulo="Clique nos cards para testar seu instinto gramatical."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Muitas vezes, a nossa fala nos engana. O cérebro pede uma pausa onde a gramática **proíbe** terminantemente uma vírgula.
                                </p>
                                <AlertBox tipo="warning" titulo="O Grande Perigo">
                                    Na prova da Petrobras, a banca adora colocar sujeitos longos para forçar você a querer "respirar".
                                </AlertBox>
                            </div>

                            <FlipCard
                                frente={
                                    <div className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4">
                                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center text-2xl">?</div>
                                        <p className="font-bold text-lg">"Os novos funcionários da plataforma P-70, chegaram hoje."</p>
                                        <p className="text-sm text-muted-foreground">Esta frase está correta?</p>
                                    </div>
                                }
                                verso={
                                    <div className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4 bg-red-50 dark:bg-red-900/20">
                                        <LuXCircle className="w-12 h-12 text-red-500" />
                                        <h4 className="font-bold text-red-700 dark:text-red-400 text-xl">ERRADO!</h4>
                                        <p className="text-sm">Você sentiu vontade de colocar a vírgula por causa do tamanho do sujeito, mas **NÃO SE SEPARA SUJEITO DO VERBO**.</p>
                                    </div>
                                }
                            />
                        </div>
                    </section>

                    {/* A ORDEM SAGRADA - AGORA COM CONTENT ACCORDION E SLIDES RICOS */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <SectionTitle
                            numero="1.2"
                            titulo="A Ordem Sagrada: S-V-C"
                            subtitulo="O pilar mestre da sintaxe portuguesa."
                        />

                        <ContentAccordion
                            titulo="Dominando os Elementos Essenciais"
                            icone={<LuBrain />}
                            corIndicador="bg-indigo-500"
                            defaultOpen={true}
                            slides={[
                                {
                                    titulo: '1️⃣ O SUJEITO (S)',
                                    icone: '👤',
                                    conteudo: (
                                        <div className="space-y-6">
                                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm font-bold">S</span>
                                                    Quem realiza ou sofre a ação?
                                                </h4>
                                                <p className="text-muted-foreground">
                                                    É a peça fundamental. A Cesgranrio costuma "engordar" o sujeito com termos explicativos para confundir você.
                                                </p>
                                            </div>
                                            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                                                <p className="text-sm font-bold text-blue-800 dark:text-blue-300">💡 Exemplo de Sujeito Longo:</p>
                                                <p className="italic text-muted-foreground">"**O plano de expansão das refinarias da região sudeste** [S] foi aprovado."</p>
                                                <p className="text-[10px] mt-2 text-red-600 uppercase font-bold">Sem vírgula após o sujeito!</p>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: '2️⃣ O VERBO (V)',
                                    icone: '⚡',
                                    conteudo: (
                                        <div className="space-y-6">
                                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-sm font-bold">V</span>
                                                    A Ação/Estado
                                                </h4>
                                                <p className="text-muted-foreground text-sm">
                                                    O Verbo é a ponte. Ele conecta quem faz (Sujeito) ao que é feito (Complemento). Jamais quebre essa ponte com uma vírgula "solteira".
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">PROIBIDO</div>
                                                    <p className="text-red-800 dark:text-red-300 text-sm">❌ O gerente, informou os lucros.</p>
                                                </div>
                                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">CORRETO</div>
                                                    <p className="text-green-800 dark:text-green-300 text-sm">✅ O gerente informou os lucros.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: '3️⃣ O COMPLEMENTO (C)',
                                    icone: '📦',
                                    conteudo: (
                                        <div className="space-y-6">
                                            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-sm font-bold">C</span>
                                                    O Alvo da Ação
                                                </h4>
                                                <p className="text-muted-foreground text-sm">
                                                    São os Objetos Diretos e Indiretos. Eles completam o sentido do verbo. Se você os separa, a frase perde o nexo sintático imediato.
                                                </p>
                                            </div>
                                            <AlertBox tipo="warning" titulo="Regra de Ouro">
                                                Não importa o tamanho: S-V-C é um bloco atômico. Não se bombardeia com vírgulas.
                                            </AlertBox>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </section>

                    {/* QUANDO A ORDEM É QUEBRADA - CARD CAROUSEL */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <SectionTitle
                            numero="1.3"
                            titulo="Quando a Ordem Muda"
                            subtitulo="Entenda a Ordem Inversa e onde as vírgulas começam a nascer."
                        />

                        <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-500/5 rounded-r-xl">
                            "Na Gramática, a vírgula serve para marcar deslocamentos. Se nada mudou de lugar, nada de vírgula."
                        </p>

                        <CardCarousel
                            titulo="Tipos de Deslocamento"
                            subtitulo="Arraste para entender como a frase se comporta."
                            cards={[
                                {
                                    icone: <LuPlayCircle className="text-xl text-amber-500" />,
                                    titulo: "Adjunto Deslocado",
                                    descricao: (
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-muted-foreground">Quando o tempo ou lugar vem para a frente da frase.</p>
                                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                                                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">"Ontem, a produção parou."</p>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground">Aqui a vírgula é facultativa por ser curto, mas recomendada.</p>
                                        </div>
                                    )
                                },
                                {
                                    icone: <LuList className="text-xl text-cyan-500" />,
                                    titulo: "Complemento Anteposto",
                                    descricao: (
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-muted-foreground">Raro, mas cai na banca! Quando o objeto vem antes de tudo.</p>
                                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                                                <p className="text-xs text-cyan-700 dark:text-cyan-400 font-bold">"Esses lucros, ninguém os viu."</p>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground italic">Chamado de Objeto Direto Pleonástico.</p>
                                        </div>
                                    )
                                },
                                {
                                    icone: <LuQuote className="text-xl text-purple-500" />,
                                    titulo: "Termos Intercalados",
                                    descricao: (
                                        <div className="space-y-3">
                                            <p className="text-sm font-medium text-muted-foreground">Uma barreira consciente colocada no meio do fluxo S-V-C.</p>
                                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                                                <p className="text-xs text-purple-700 dark:text-purple-400 font-bold">"O engenheiro, com certeza, virá."</p>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground">Aqui a vírgula serve para isolar a intrusão.</p>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </section>

                    {/* MITOS VS VERDADES - FLIP CARD GRID */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <SectionTitle
                            numero="1.4"
                            titulo="Mito vs. Verdade"
                            subtitulo="Extermine os vícios que te fazem errar na prova."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FlipCard
                                frente={
                                    <div className="p-4 text-center h-full flex flex-col justify-center border-2 border-dashed border-red-500/30 rounded-xl">
                                        <p className="font-bold text-red-600">Mito 1</p>
                                        <p className="text-sm">"Sujeito longo pede vírgula."</p>
                                    </div>
                                }
                                verso={
                                    <div className="p-4 text-center h-full flex flex-col justify-center bg-red-500 text-white rounded-xl">
                                        <p className="text-sm font-bold">FALSO!</p>
                                        <p className="text-xs">Não importa se o sujeito tem 20 palavras. Sem vírgula entre S e V.</p>
                                    </div>
                                }
                            />
                            <FlipCard
                                frente={
                                    <div className="p-4 text-center h-full flex flex-col justify-center border-2 border-dashed border-blue-500/30 rounded-xl">
                                        <p className="font-bold text-blue-600">Mito 2</p>
                                        <p className="text-sm">"Vírgula marca apenas o respiro."</p>
                                    </div>
                                }
                                verso={
                                    <div className="p-4 text-center h-full flex flex-col justify-center bg-blue-600 text-white rounded-xl">
                                        <p className="text-sm font-bold">FALSO!</p>
                                        <p className="text-xs">Existem milhares de pausas na fala que não levam vírgula na escrita.</p>
                                    </div>
                                }
                            />
                            <FlipCard
                                frente={
                                    <div className="p-4 text-center h-full flex flex-col justify-center border-2 border-dashed border-green-500/30 rounded-xl">
                                        <p className="font-bold text-green-600">Mito 3</p>
                                        <p className="text-sm">"Antes do 'E' nunca vai vírgula."</p>
                                    </div>
                                }
                                verso={
                                    <div className="p-4 text-center h-full flex flex-col justify-center bg-green-600 text-white rounded-xl">
                                        <p className="text-sm font-bold">DEPENDENTE!</p>
                                        <p className="text-xs">Vai vírgula se os sujeitos forem diferentes ou em polissíndeto!</p>
                                    </div>
                                }
                            />
                        </div>
                    </section>

                    {/* QUIZ MÓDULO 1 */}
                    <section className="mt-8">
                        <QuizInterativo
                            questoes={QUIZ_MODULO_1}
                            titulo="Quiz de Fixação: Fundamentos"
                            numero={1}
                            icone="🧠"
                            onComplete={(score) => handleModuleComplete('modulo-1', score)}
                        />
                    </section>
                </TabsContent>


                {/* === MÓDULO 2: A VÍRGULA === */}
                <TabsContent value="modulo-2" className="space-y-12 max-w-6xl mx-auto px-6 mt-12">
                    <ModuleBanner
                        numero={2}
                        titulo="A Vírgula (O Chefão)"
                        descricao="Proibições Absolutas e Obrigações Inegociáveis."
                        gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600"
                    />

                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
                        <SectionTitle
                            numero="2.1"
                            titulo="Regras Fundamentais"
                            subtitulo="Entenda quando a vírgula é proibida e quando é obrigatória."
                        />

                        <h2 className="text-3xl font-bold mb-8 mt-6 flex items-center gap-3">
                            <span className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center text-xl font-bold">VS</span>
                            Proibições vs. Obrigações
                        </h2>

                        <ContentAccordion
                            titulo="Guia Definitivo da Vírgula"
                            icone={<LuPenTool />}
                            corIndicador="bg-orange-500"
                            defaultOpen={true}
                            slides={[
                                {
                                    titulo: '⛔ PROIBIÇÕES',
                                    icone: '🛑',
                                    conteudo: (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                                                <LuBan className="w-6 h-6" /> Onde NÃO usar
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="bg-muted/40 p-5 rounded-xl border border-border">
                                                    <strong className="block mb-2 text-foreground text-lg">Entre Sujeito e Verbo</strong>
                                                    <div className="space-y-2">
                                                        <div className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
                                                            <LuX className="mt-0.5" /> "A Petrobras, anunciou lucro."
                                                        </div>
                                                        <div className="flex items-start gap-2 text-green-600 dark:text-green-400 text-sm">
                                                            <LuCheck className="mt-0.5" /> "A Petrobras anunciou lucro."
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-muted/40 p-5 rounded-xl border border-border">
                                                    <strong className="block mb-2 text-foreground text-lg">Entre Verbo e Objeto</strong>
                                                    <div className="space-y-2">
                                                        <div className="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm">
                                                            <LuX className="mt-0.5" /> "O gerente pediu, relatórios."
                                                        </div>
                                                        <div className="flex items-start gap-2 text-green-600 dark:text-green-400 text-sm">
                                                            <LuCheck className="mt-0.5" /> "O gerente pediu relatórios."
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    titulo: '✅ OBRIGAÇÕES',
                                    icone: '📝',
                                    conteudo: (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                                                <LuCheckCircle className="w-6 h-6" /> Onde é OBRIGATÓRIO
                                            </h3>
                                            <CardCarousel
                                                titulo=""
                                                subtitulo=""
                                                cards={[
                                                    {
                                                        icone: <LuQuote className="text-purple-500" />,
                                                        titulo: "Aposto Explicativo",
                                                        descricao: (
                                                            <>
                                                                Explica o termo anterior. Sempre isolado!
                                                                <p className="text-xs mt-2 italic text-muted-foreground">"Maria, <strong>gerente de RH</strong>, chegou."</p>
                                                            </>
                                                        )
                                                    },
                                                    {
                                                        icone: <LuAlertCircle className="text-orange-500" />,
                                                        titulo: "Vocativo",
                                                        descricao: (
                                                            <>
                                                                Chamamento. Sempre com vírgula!
                                                                <p className="text-xs mt-2 italic text-muted-foreground">"<strong>João</strong>, venha cá."</p>
                                                            </>
                                                        )
                                                    },
                                                    {
                                                        icone: <LuBrain className="text-pink-500" />,
                                                        titulo: "Conjunções Adversativas",
                                                        descricao: (
                                                            <>
                                                                Antes de 'mas', 'porém', 'contudo'.
                                                                <p className="text-xs mt-2 italic text-muted-foreground">"Estudei, <strong>mas</strong> não passei."</p>
                                                            </>
                                                        )
                                                    }
                                                ]}
                                            />
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </section>

                    <section className="mt-8">
                        <QuizInterativo
                            questoes={QUIZ_MODULO_2}
                            titulo="Quiz de Fixação: Vírgula"
                            numero={2}
                            icone="✍️"
                            onComplete={(score) => handleModuleComplete('modulo-2', score)}
                        />
                    </section>
                </TabsContent>

                {/* === MÓDULO 3: AVANÇADO E CONCLUSÃO === */}
                <TabsContent value="modulo-3" className="space-y-12 max-w-6xl mx-auto px-6 mt-12">
                    <ModuleBanner
                        numero={3}
                        titulo="Pontuação Avançada"
                        descricao="Dois pontos, Ponto e Vírgula e a Maestria Final."
                        gradiente="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600"
                    />

                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <SectionTitle
                            numero="3.1"
                            titulo="Sinais Avançados"
                            subtitulo="Dominando o Ponto e Vírgula e os Dois Pontos."
                        />

                        <TabbedContent
                            tabs={[
                                {
                                    id: 'doispontos',
                                    label: 'Dois Pontos (:)',
                                    content: (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 p-2 rounded-lg"><LuList /></span>
                                                A Janela da Explicação
                                            </h3>
                                            <p className="text-lg text-muted-foreground">
                                                Os dois pontos anunciam algo sucessivo: uma enumeração, uma citação, ou uma síntese.
                                            </p>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
                                                    <strong className="block text-purple-700 dark:text-purple-300 mb-2">Enumeração</strong>
                                                    <p className="text-sm">"Comprei: caneta, lápis e borracha."</p>
                                                </div>
                                                <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
                                                    <strong className="block text-purple-700 dark:text-purple-300 mb-2">Citação</strong>
                                                    <p className="text-sm">"Ele disse: 'Estou pronto'."</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    id: 'pontovirgula',
                                    label: 'Ponto e Vírgula (;)',
                                    content: (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                                <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 p-2 rounded-lg"><LuClock /></span>
                                                A Pausa Maior
                                            </h3>
                                            <p className="text-lg text-muted-foreground">
                                                Intermediário entre a vírgula e o ponto. Use para listas (leis) ou para separar orações que JÁ TÊM vírgulas internas.
                                            </p>
                                            <div className="bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500 p-6 rounded-r-xl">
                                                <strong className="block text-yellow-800 dark:text-yellow-200 mb-2">Exemplo Clássico:</strong>
                                                <p className="italic text-lg">"Uns trabalham muito, e ganham pouco; outros trabalham pouco, e ganham muito."</p>
                                                <p className="text-xs mt-3 text-muted-foreground">Note que o ponto e vírgula separa os dois grandes blocos, pois já existem vírgulas internas.</p>
                                            </div>
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </section>

                    <section className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                        <MusicPlayerCard
                            audioUrl="#"
                            titulo="Rap da Pontuação"
                            artista="Professor Antigravity"
                            capaUrl="/api/placeholder/400/320"
                            lyrics={`
    (Refrão)
Sujeito e Verbo não se pode separar
Se você botar a vírgula, a banca vai zerar!
Mas se for Aposto, pode isolar
E o Vocativo ? Tem que chamar!
    `}
                        />
                    </section>

                    <section className="mt-8">
                        <QuizInterativo
                            questoes={QUIZ_MODULO_3}
                            titulo="Quiz Final: Mestria"
                            numero={3}
                            icone="🏆"
                            onComplete={(score) => handleModuleComplete('modulo-3', score)}
                        />
                    </section>


                </TabsContent>
            </Tabs>


        </div>
    );
}

// Ícone auxiliar
function LuBan(props: any) {
    return <LuXCircle {...props} />
}
