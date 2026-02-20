'use client';

import { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    QuizQuestion,
    getRandomQuestions,
    AlertBox,
    VideoModal,
    ImageCarousel,
    ProgressIndicator,
    FlipCard,
    QuizInterativo,
    TimelineItem,
    ComparisonSide,
    ModuleBanner,
    CardCarousel,
    StickyModuleNav,
    LessonTabs,
    MusicPlayerCard,
    ContentAccordion,
    ModuleDef
} from './shared';
import {
    LuCheck,
    LuBookOpen,
    LuSearch,
    LuLayers,
    LuZap,
    LuInfo,
    LuTarget,
    LuFileText,
    LuTrophy,
    LuMusic
} from 'react-icons/lu';

// ── CONFIGURAÇÃO DE MÓDULOS ──────────────────────────────────────────────
const MODULE_DEFS: ModuleDef[] = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'O Esqueleto: Termos Essenciais' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'O Recheio: Termos Integrantes' },
    { id: 'modulo-3', label: 'Módulo 3', titulo: 'O Acabamento: Termos Acessórios' },
    { id: 'modulo-4', label: 'Módulo 4', titulo: 'Laboratório Cesgranrio' },
    { id: 'modulo-5', label: 'Módulo 5', titulo: 'Síntese Estratégica' },
];

// ── POOL DE QUESTÕES (MÓDULO 4: LABORATÓRIO) ────────────────────────────
const QUIZ_LABORATORIO_POOL: QuizQuestion[] = [
    {
        id: 401,
        pergunta: "Assinale a alternativa em que o termo em destaque exerce a função de Complemento Nominal:",
        opcoes: [
            { label: 'A', valor: "A confiança do mercado na Petrobras é alta." },
            { label: 'B', valor: "O técnico reparou o duto de óleo." },
            { label: 'C', valor: "O navio de carga partiu ontem." },
            { label: 'D', valor: "A decisão do gerente foi acertada." }
        ],
        correta: 'A',
        explicacao: "'Na Petrobras' completa o substantivo abstrato 'confiança'. Confiança em quê? Na Petrobras (sentido passivo/alvo)."
    },
    {
        id: 402,
        pergunta: "Observe: 'Alugam-se plataformas offshore'. O sujeito desta oração é:",
        opcoes: [
            { label: 'A', valor: "Indeterminado" },
            { label: 'B', valor: "Plataformas offshore" },
            { label: 'C', valor: "Inexistente" },
            { label: 'D', valor: "Oculto" }
        ],
        correta: 'B',
        explicacao: "VTD (alugar) + SE (partícula apassivadora). 'Plataformas offshore' é o sujeito paciente (são alugadas)."
    }
];

// ── POOL DE QUESTÕES (MÓDULO 1: ESSENCIAIS) ─────────────────────────────
const QUIZ_ESSENCIAIS_POOL: QuizQuestion[] = [
    {
        id: 1,
        pergunta: "Na frase 'Ocorreram falhas graves na plataforma', qual o sujeito?",
        opcoes: [
            { label: 'A', valor: "Plataforma" },
            { label: 'B', valor: "Indeterminado" },
            { label: 'C', valor: "Falhas graves" },
            { label: 'D', valor: "Inexistente" }
        ],
        correta: 'C',
        explicacao: "O verbo 'ocorrer' é pessoal. O que ocorreu? 'Falhas graves' (Sujeito Simples Pós-posto)."
    },
    {
        id: 2,
        pergunta: "Qual das orações abaixo possui Sujeito Inexistente?",
        opcoes: [
            { label: 'A', valor: "Choveram elogios à equipe." },
            { label: 'B', valor: "Faz anos que a Petrobras opera aqui." },
            { label: 'C', valor: "Alugaram-se as salas." },
            { label: 'D', valor: "Precisa-se de operários." }
        ],
        correta: 'B',
        explicacao: "O verbo 'fazer' indicando tempo decorrido é impessoal (Sujeito Inexistente)."
    },
    {
        id: 3,
        pergunta: "Em 'Vende-se esta casa', o sujeito é:",
        opcoes: [
            { label: 'A', valor: "Indeterminado" },
            { label: 'B', valor: "Inexistente" },
            { label: 'C', valor: "Esta casa" },
            { label: 'D', valor: "Oculto" }
        ],
        correta: 'C',
        explicacao: "VTD + SE (partícula apassivadora) = Voz Passiva Sintética. 'Esta casa' é o sujeito (Esta casa é vendida)."
    },
    {
        id: 4,
        pergunta: "Identifique o predicado na frase: 'A produção continua alta'.",
        opcoes: [
            { label: 'A', valor: "Verbal" },
            { label: 'B', valor: "Nominal" },
            { label: 'C', valor: "Verbo-nominal" },
            { label: 'D', valor: "Indeterminado" }
        ],
        correta: 'B',
        explicacao: "'Continua' é verbo de ligação e 'alta' é predicativo do sujeito. Predicado Nominal."
    },
    {
        id: 5,
        pergunta: "Na oração 'Os técnicos saíram da reunião preocupados', o predicado é:",
        opcoes: [
            { label: 'A', valor: "Nominal" },
            { label: 'B', valor: "Verbal" },
            { label: 'C', valor: "Verbo-nominal" },
            { label: 'D', valor: "Inexistente" }
        ],
        correta: 'C',
        explicacao: "Possui verbo de ação (saíram) + predicativo do sujeito (preocupados). Predicado Verbo-Nominal."
    }
];

// ── POOL DE QUESTÕES (MÓDULO 2: INTEGRANTES) ────────────────────────────
const QUIZ_INTEGRANTES_POOL: QuizQuestion[] = [
    {
        id: 201,
        pergunta: "Em 'A Petrobras necessita de investimentos', o termo sublinhado é:",
        opcoes: [
            { label: 'A', valor: "Objeto Direto" },
            { label: 'B', valor: "Objeto Indireto" },
            { label: 'C', valor: "Complemento Nominal" },
            { label: 'D', valor: "Adjunto Adnominal" }
        ],
        correta: 'B',
        explicacao: "Quem necessita, necessita DE algo. 'Necessitar' é VTI, e 'de investimentos' é o Objeto Indireto."
    },
    {
        id: 202,
        pergunta: "Assinale a alternativa que contém um Complemento Nominal:",
        opcoes: [
            { label: 'A', valor: "O técnico consertou a máquina." },
            { label: 'B', valor: "A leitura do relatório foi útil." },
            { label: 'C', valor: "Gostamos de desafios." },
            { label: 'D', valor: "O navio partiu cedo." }
        ],
        correta: 'B',
        explicacao: "'Relatório' é alvo da leitura (sentido passivo) e completa o substantivo abstrato 'leitura'. Complemento Nominal."
    },
    {
        id: 203,
        pergunta: "Na frase 'O contrato foi assinado pelo diretor', o termo 'pelo diretor' é:",
        opcoes: [
            { label: 'A', valor: "Objeto Direto" },
            { label: 'B', valor: "Agente da Passiva" },
            { label: 'C', valor: "Sujeito" },
            { label: 'D', valor: "Adjunto Adverbial" }
        ],
        correta: 'B',
        explicacao: "Na voz passiva, o Agente da Passiva é quem pratica a ação expressa pelo verbo."
    }
];

// ── POOL DE QUESTÕES (MÓDULO 3: ACESSÓRIOS) ─────────────────────────────
const QUIZ_ACESSORIOS_POOL: QuizQuestion[] = [
    {
        id: 301,
        pergunta: "Na oração 'Ontem, o navio chegou ao porto', os termos grifados são:",
        opcoes: [
            { label: 'A', valor: "Objetos Indiretos" },
            { label: 'B', valor: "Adjuntos Adverbiais" },
            { label: 'C', valor: "Complementos Nominais" },
            { label: 'D', valor: "Aposto" }
        ],
        correta: 'B',
        explicacao: "'Ontem' (tempo) e 'ao porto' (lugar) indicam circunstâncias, logo são Adjuntos Adverbiais."
    },
    {
        id: 302,
        pergunta: "Em 'Petróleo, ouro negro, é vital', o termo entre vírgulas é:",
        opcoes: [
            { label: 'A', valor: "Vocativo" },
            { label: 'B', valor: "Aposto" },
            { label: 'C', valor: "Adjunto Adnominal" },
            { label: 'D', valor: "Sujeito" }
        ],
        correta: 'B',
        explicacao: "O aposto explicativo explica ou detalha um termo anterior."
    },
    {
        id: 303,
        pergunta: "Identifique o Vocativo na frase: 'Amanhã, pessoal, teremos folga'.",
        opcoes: [
            { label: 'A', valor: "Amanhã" },
            { label: 'B', valor: "Pessoal" },
            { label: 'C', valor: "Teremos" },
            { label: 'D', valor: "Folga" }
        ],
        correta: 'B',
        explicacao: "Vocativo é o termo usado para chamar ou interpelar o interlocutor. Vem sempre isolado por vírgula."
    }
];

interface AulaSintaxeProps {
    onComplete: () => void;
    currentProgress: number;
    onUpdateProgress: (percent: number) => Promise<void>;
}

export default function AulaSintaxe({ onComplete, currentProgress, onUpdateProgress }: AulaSintaxeProps) {
    const [activeTab, setActiveTab] = useState('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
    const [showCompletionBadge, setShowCompletionBadge] = useState(false);

    // Carregar progresso do localStorage
    useEffect(() => {
        const saved = localStorage.getItem('aula_sintaxe_progress');
        if (saved) {
            const parsed = JSON.parse(saved);
            const done = new Set<string>(parsed.completedModules || []);
            setCompletedModules(done);

            const lastDoneIndex = MODULE_DEFS.findIndex(m => done.has(m.id));
            if (lastDoneIndex >= 0 && lastDoneIndex < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[lastDoneIndex + 1].id);
            }
        }
    }, []);

    // Atualizar progresso global
    useEffect(() => {
        const total = MODULE_DEFS.length;
        const done = completedModules.size;
        const percent = Math.round((done / total) * 100);
        onUpdateProgress(percent);
        if (percent >= 100) setShowCompletionBadge(true);
    }, [completedModules, onUpdateProgress]);

    const handleModuleComplete = (moduleId: string, score: number) => {
        if (score >= 70) {
            const newSet = new Set(completedModules).add(moduleId);
            setCompletedModules(newSet);
            localStorage.setItem('aula_sintaxe_progress', JSON.stringify({ completedModules: Array.from(newSet) }));

            const index = MODULE_DEFS.findIndex(m => m.id === moduleId);
            if (index < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[index + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                onComplete();
            }
        }
    };

    const isModuleUnlocked = useCallback((moduleIndex: number) => {
        if (moduleIndex === 0) return true;
        const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
        return prevModuleId ? completedModules.has(prevModuleId) : false;
    }, [completedModules]);

    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-500">
            <ProgressIndicator />
            <main className="container mx-auto px-6 py-8 max-w-6xl space-y-16">
                {showCompletionBadge && (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-4 shadow-sm animate-in slide-in-from-top-4 duration-700">
                        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                            <LuCheck size={32} strokeWidth={3} />
                        </div>
                        <div>
                            <h3 className="text-green-800 dark:text-green-300 font-bold text-xl">Aula de Sintaxe Concluída!</h3>
                            <p className="text-green-700 dark:text-green-400">Você dominou a estrutura das orações. Seu XP foi atualizado!</p>
                        </div>
                    </div>
                )}

                <Tabs value={activeTab} onValueChange={(val) => {
                    const idx = MODULE_DEFS.findIndex(m => m.id === val);
                    if (isModuleUnlocked(idx)) setActiveTab(val);
                }} className="w-full space-y-12">
                    <StickyModuleNav
                        activeTab={activeTab}
                        completedModules={completedModules}
                        isModuleUnlocked={isModuleUnlocked}
                        modules={MODULE_DEFS}
                    />

                    {/* ── MÓDULO 1: TERMOS ESSENCIAIS ───────────────────────── */}
                    <TabsContent value="modulo-1" className="space-y-16">
                        <ModuleBanner
                            numero={1}
                            titulo="O Esqueleto da Oração"
                            descricao="Dominando o Sujeito e o Predicado sob a ótica da Cesgranrio. O ponto de partida de toda análise sintática."
                            gradiente="bg-gradient-to-r from-indigo-600 to-blue-500"
                        />

                        {/* 1. Fundamentação Científica */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                                <span className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-3xl font-bold text-indigo-700 dark:text-indigo-400 shrink-0">1</span>
                                Anatomia da Oração
                            </h2>

                            <AlertBox tipo="info" titulo="O Princípio da Dependência">
                                A sintaxe (do grego <i>syntáxis</i>, ordem/arranjo) estuda as relações de dependência entre as palavras. Na língua portuguesa, a oração é um organismo vivo onde cada termo desempenha uma função vital.
                            </AlertBox>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <LuTarget className="text-indigo-500" /> O Sujeito
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        É o termo sobre o qual se faz uma declaração e com o qual o verbo <b>concorda</b>. A Cesgranrio adora sujeitos deslocados (após o verbo) para induzir ao erro.
                                    </p>
                                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-indigo-500 italic text-sm">
                                        "Ocorreram (V) falhas no oleoduto (S)." <br />
                                        <span className="text-xs text-muted-foreground">O que ocorreu? Falhas. (Sujeito simples)</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <LuZap className="text-amber-500" /> O Predicado
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        É tudo aquilo que se declara sobre o sujeito. Ele pode focar na <b>ação</b> (verbal), no <b>estado</b> (nominal) ou em ambos (verbo-nominal).
                                    </p>
                                    <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-amber-500 italic text-sm">
                                        "O técnico (S) parece cansado (P)." <br />
                                        <span className="text-xs text-muted-foreground">Foco no atributo/estado. (Predicado nominal)</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. O Mapa do Sujeito */}
                        <ContentAccordion
                            titulo="Tipologia do Sujeito: O Mapa das Armadilhas"
                            icone={<LuSearch className="w-6 h-6" />}
                            corIndicador="bg-blue-500"
                            slides={[
                                {
                                    titulo: "Sujeito Simples e Composto",
                                    icone: "🎯",
                                    conteudo: (
                                        <div className="space-y-4">
                                            <p>A classificação depende da quantidade de <b>núcleos</b> (palavra base sem preposição).</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                                                    <p className="font-bold text-green-700 mb-1 italic">Simples (1 núcleo):</p>
                                                    <p className="text-sm">"A <b>produção</b> subiu."</p>
                                                </div>
                                                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                                                    <p className="font-bold text-blue-700 mb-1 italic">Composto (2+ núcleos):</p>
                                                    <p className="text-sm">"O <b>diretor</b> e o <b>gerente</b> chegaram."</p>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                    exemplo: "O núcleo do sujeito nunca vem preposicionado!"
                                },
                                {
                                    titulo: "Sujeito Inexistente (Impessoal)",
                                    icone: "🚫",
                                    conteudo: (
                                        <div className="space-y-4 font-body">
                                            <p>Ocorre com verbos que não admitem sujeito. Eles ficam sempre na 3ª pessoa do singular.</p>
                                            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                                <li><b>Haver</b> (sentido de existir/tempo): "Havia problemas."</li>
                                                <li><b>Fazer</b> (tempo/clima): "Faz dois anos."</li>
                                                <li><b>Fenômenos da Natureza</b>: "Ventou muito."</li>
                                            </ul>
                                        </div>
                                    ),
                                    exemplo: "⚠️ CUIDADO: Se o verbo 'haver' for substituído por 'existir', este último é pessoal e o sujeito aparece!"
                                },
                                {
                                    titulo: "Sujeito Indeterminado",
                                    icone: "🕵️",
                                    conteudo: (
                                        <div className="space-y-4">
                                            <p>Quando não se quer ou não se pode identificar o sujeito.</p>
                                            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                                                <li><b>Verbo na 3ª Plural</b> (sem antecedente): "Roubaram a carga."</li>
                                                <li><b>VTI/VI/VL + SE</b>: "Precisa-se de técnicos." (Índice de Indeterminação)</li>
                                            </ul>
                                        </div>
                                    ),
                                    exemplo: "Não confunda Índice de Indeterminação com Partícula Apassivadora!"
                                }
                            ]}
                        />

                        {/* 3. Predicado e Predicativo */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <span className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-3xl font-bold text-emerald-700 dark:text-emerald-400 shrink-0">3</span>
                                Tipos de Predicado
                            </h2>
                            <p className="text-muted-foreground">A classificação do predicado depende da natureza do seu núcleo: se é um verbo (ação) ou um nome (estado/qualidade).</p>

                            <CardCarousel
                                titulo="Classes de Predicado"
                                cards={[
                                    {
                                        icone: <LuLayers className="w-6 h-6" />,
                                        titulo: "Predicado Verbal",
                                        descricao: "O núcleo é um verbo de ação (nocional). Não há predicativo.",
                                        exemplo: "A refinaria opera em plena carga.",
                                        corFundo: "bg-blue-500/10"
                                    },
                                    {
                                        icone: <LuFileText className="w-6 h-6" />,
                                        titulo: "Predicado Nominal",
                                        descricao: "O núcleo é um nome (predicativo do sujeito). O verbo é de ligação.",
                                        exemplo: "O combustível está caro.",
                                        corFundo: "bg-amber-500/10"
                                    },
                                    {
                                        icone: <LuZap className="w-6 h-6" />,
                                        titulo: "Predicado Verbo-Nominal",
                                        descricao: "Dois núcleos: um verbo de ação + um nome (predicativo).",
                                        exemplo: "O petroleiro saiu da plataforma exausto.",
                                        corFundo: "bg-emerald-500/10"
                                    }
                                ]}
                            />
                        </section>

                        {/* 4. Quiz de Fixação */}
                        <QuizInterativo
                            numero={4}
                            titulo="Quiz de Fixação: Sujeito e Predicado"
                            icone="🧠"
                            questoes={getRandomQuestions(QUIZ_ESSENCIAIS_POOL, 5)}
                            onComplete={(score) => handleModuleComplete('modulo-1', score)}
                        />
                    </TabsContent>

                    {/* ── MÓDULO 2: TERMOS INTEGRANTES ────────────────────────── */}
                    <TabsContent value="modulo-2" className="space-y-16">
                        <ModuleBanner
                            numero={2}
                            titulo="O Recheio da Oração"
                            descricao="Complementos verbais, nominais e o agente da passiva. Entenda como os verbos e nomes exigem seus parceiros de sentido."
                            gradiente="bg-gradient-to-r from-emerald-600 to-teal-500"
                        />

                        {/* 1. Objetos Verbais */}
                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                                <span className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-3xl font-bold text-emerald-700 dark:text-emerald-400 shrink-0">1</span>
                                Os Objetos: Direto e Indireto
                            </h2>
                            <p className="text-muted-foreground italic">"O objeto é o paciente da ação verbal."</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <ComparisonSide
                                    tipo="correct"
                                    titulo="Objeto Direto (OD)"
                                    items={[
                                        "Liga-se ao verbo SEM preposição obrigatória.",
                                        "Completa Verbos Transitivos Diretos (VTD).",
                                        "Ex: 'O técnico analisou o relatório'."
                                    ]}
                                />
                                <ComparisonSide
                                    tipo="incorrect"
                                    titulo="Objeto Indireto (OI)"
                                    items={[
                                        "Liga-se ao verbo COM preposição obrigatória.",
                                        "Completa Verbos Transitivos Indiretos (VTI).",
                                        "Ex: 'O técnico necessita de ajuda'."
                                    ]}
                                />
                            </div>
                        </section>

                        {/* 2. Complemento Nominal vs Adjunto Adnominal */}
                        <ContentAccordion
                            titulo="O Duelo: Complemento Nominal vs Adjunto Adnominal"
                            icone={<LuLayers className="w-6 h-6" />}
                            corIndicador="bg-yellow-500"
                            slides={[
                                {
                                    titulo: "Complemento Nominal (CN)",
                                    icone: "💉",
                                    conteudo: (
                                        <div className="space-y-4 font-body">
                                            <p>Tem sentido <b>passivo</b> (alvo da ação) e completa substantivos abstratos, adjetivos ou advérbios.</p>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                <li>"Obediência <b>às leis</b>" (As leis são obedecidas - Passivo).</li>
                                                <li>"Útil <b>ao projeto</b>" (Completa o adjetivo 'útil').</li>
                                            </ul>
                                        </div>
                                    ),
                                    exemplo: "CN é sempre preposicionado!"
                                },
                                {
                                    titulo: "Adjunto Adnominal (AA)",
                                    icone: "🏠",
                                    conteudo: (
                                        <div className="space-y-4 font-body">
                                            <p>Tem sentido <b>ativo</b> (pratica a ação) ou de <b>posse</b>. Acompanha apenas o substantivo.</p>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                <li>"A crítica <b>do diretor</b>" (O diretor criticou - Ativo).</li>
                                                <li>"O carro <b>do engenheiro</b>" (Posse).</li>
                                            </ul>
                                        </div>
                                    ),
                                    exemplo: "Na dúvida: se for substantivo concreto, é sempre Adjunto!"
                                }
                            ]}
                        />

                        {/* 3. Quiz Módulo 2 */}
                        <QuizInterativo
                            numero={3}
                            titulo="Quiz: Termos Integrantes"
                            icone="🧪"
                            questoes={getRandomQuestions(QUIZ_INTEGRANTES_POOL, 3)}
                            onComplete={(score) => handleModuleComplete('modulo-2', score)}
                        />
                    </TabsContent>

                    {/* ── MÓDULO 3: TERMOS ACESSÓRIOS ──────────────────────────── */}
                    <TabsContent value="modulo-3" className="space-y-16">
                        <ModuleBanner
                            numero={3}
                            titulo="O Acabamento da Oração"
                            descricao="Adjuntos adverbiais, adnominais, aposto e vocativo. Termos que trazem circunstância e precisão ao texto."
                            gradiente="bg-gradient-to-r from-amber-600 to-orange-500"
                        />

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                                <span className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-3xl font-bold text-orange-700 dark:text-orange-400 shrink-0">1</span>
                                Circunstâncias e Detalhes
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="p-6 rounded-xl border border-border bg-muted/30">
                                    <h4 className="font-bold mb-3 flex items-center gap-2">📍 Adjunto Adverbial</h4>
                                    <p className="text-sm text-muted-foreground italic mb-3">"Modifica o verbo, adjetivo ou advérbio."</p>
                                    <p className="text-sm font-medium">Ex: "Trabalham <b>muito</b>." (Intensidade)</p>
                                </div>
                                <div className="p-6 rounded-xl border border-border bg-muted/30">
                                    <h4 className="font-bold mb-3 flex items-center gap-2">📎 Aposto</h4>
                                    <p className="text-sm text-muted-foreground italic mb-3">"Explica ou resume um termo."</p>
                                    <p className="text-sm font-medium">Ex: "Rio, <b>cidade maravilhosa</b>."</p>
                                </div>
                                <div className="p-6 rounded-xl border border-border bg-muted/30">
                                    <h4 className="font-bold mb-3 flex items-center gap-2">📢 Vocativo</h4>
                                    <p className="text-sm text-muted-foreground italic mb-3">"Chamamento isolado."</p>
                                    <p className="text-sm font-medium">Ex: "<b>Senhores</b>, atenção!"</p>
                                </div>
                            </div>
                        </section>

                        <QuizInterativo
                            numero={2}
                            titulo="Quiz: Detalhes Sintáticos"
                            icone="🎯"
                            questoes={getRandomQuestions(QUIZ_ACESSORIOS_POOL, 3)}
                            onComplete={(score) => handleModuleComplete('modulo-3', score)}
                        />
                    </TabsContent>

                    {/* ── MÓDULO 4: LABORATÓRIO ───────────────────────────────── */}
                    <TabsContent value="modulo-4" className="space-y-16">
                        <ModuleBanner
                            numero={4}
                            titulo="Laboratório de Análise Sínótica"
                            descricao="Desafios reais da Cesgranrio. Aplicação prática de tudo o que vimos sobre a estrutura da oração."
                            gradiente="bg-gradient-to-r from-red-600 to-rose-500"
                        />

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
                            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                                <span className="w-14 h-14 rounded-full bg-rose-500/20 flex items-center justify-center text-3xl font-bold text-rose-700 dark:text-rose-400 shrink-0">1</span>
                                Desafio de Alto Nível
                            </h2>
                            <AlertBox tipo="warning" titulo="O 'Pulo do Gato' da Cesgranrio">
                                A banca costuma inverter a ordem das palavras (Ordem Indireta) para esconder o sujeito. Sempre procure o verbo primeiro e pergunte: "Quem/O que pratica esta ação?"
                            </AlertBox>

                            <FlipCard
                                numero={1}
                                categoria="Análise Sínótica"
                                frente={
                                    <p className="text-lg">Analise a função sintática do termo em negrito: "Aos funcionários <b>interessa</b> a produtividade."</p>
                                }
                                verso={
                                    <div className="space-y-3">
                                        <p className="font-bold text-green-600">Resposta: Verbo Transitivo Direto!</p>
                                        <p className="text-sm">O sujeito é "a produtividade" (O que interessa? A produtividade). "Aos funcionários" é Objeto Indireto.</p>
                                    </div>
                                }
                            />
                        </section>

                        <QuizInterativo
                            numero={2}
                            titulo="Quiz: Laboratório Final"
                            icone="🔬"
                            questoes={getRandomQuestions(QUIZ_LABORATORIO_POOL, 2)}
                            onComplete={(score) => handleModuleComplete('modulo-4', score)}
                        />
                    </TabsContent>

                    {/* ── MÓDULO 5: REVISÃO E MULTIMEDIA ───────────────────────── */}
                    <TabsContent value="modulo-5" className="space-y-16">
                        <ModuleBanner
                            numero={5}
                            titulo="Síntese Estratégica"
                            descricao="Resumo visual, mapas mentais e ferramentas de fixação rápida para não esquecer mais."
                            gradiente="bg-gradient-to-r from-violet-600 to-purple-500"
                        />

                        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
                            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center gap-4 tracking-tighter">
                                <span className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center text-3xl font-black text-violet-700 border border-violet-500/20 shadow-inner">1</span>
                                Resumo e Multimedia
                            </h2>

                            <LessonTabs
                                variant="violet"
                                tabs={[
                                    {
                                        id: 'video',
                                        label: 'Vídeo Aula',
                                        icon: LuBookOpen,
                                        content: (
                                            <div className="w-full flex flex-col items-center py-6">
                                                <div className="w-full max-w-3xl">
                                                    <VideoModal
                                                        videoId="dQw4w9WgXcQ"
                                                        title="Sintaxe da Oração: Revisão Final"
                                                        duration="08:45"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'visual',
                                        label: 'Macete Visual',
                                        icon: LuZap,
                                        content: (
                                            <div className="text-center p-8 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl border border-violet-500/10">
                                                <h3 className="text-xl font-bold text-foreground mb-4">O Esqueleto Sintático</h3>
                                                <div className="text-7xl my-8 animate-pulse">🦴 📐 🏗️</div>
                                                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                                                    "Ache o verbo, procure o dono (Sujeito), veja o que ele faz (Objeto) e como ele faz (Adjunto)!"
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
                                                        titulo="Resumo Sintaxe"
                                                        artista="Prof. André"
                                                        lyrics={`(Refrão)\nSintaxe não é bicho de sete cabeças...\nBasta você saber quem manda na peça!`}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </section>

                        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm text-center space-y-6">
                            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LuTrophy className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h2 className="text-3xl font-bold italic">"A aprovação é uma questão de sintaxe!"</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Você completou toda a trilha de Sintaxe da Oração. Agora você está apto a identificar funções e concordâncias com precisão cirúrgica.
                            </p>
                            <Button size="lg" onClick={() => handleModuleComplete('modulo-5', 100)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/20">
                                <LuCheck className="mr-2 w-6 h-6" /> Finalizar Aula e Ganhar XP
                            </Button>
                        </section>
                    </TabsContent>

                </Tabs>
            </main>
        </div>
    );
}
