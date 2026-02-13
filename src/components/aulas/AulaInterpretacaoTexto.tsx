'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { progressService } from '@/lib/services/progress';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Play } from 'lucide-react';
import {
    LuClock,
    LuCheck,
    LuCircle,
    LuLightbulb,
    LuBookOpen,
    LuMessageSquare,
    LuTrophy,
    LuArrowRight,
    LuPlay,
    LuPause,
    LuVolume2,
    LuSkipBack,
    LuSkipForward,
} from 'react-icons/lu';

// ─── HANDLERS ───────────────────────────────────────────────────────────



// ── Data ────────────────────────────────────────────────────────────────

interface QuizQuestion {
    id: number;
    pergunta: string;
    opcoes: { label: string; valor: string }[];
    correta: string;
    explicacao: string;
}

const QUIZ_DIAGNOSTICO: QuizQuestion[] = [
    {
        id: 1,
        pergunta: 'Quando uma questão pede "segundo o texto", ela pede informações:',
        opcoes: [
            { label: 'A', valor: 'Implícitas (inferências)' },
            { label: 'B', valor: 'Explícitas (escritas no texto)' },
            { label: 'C', valor: 'Da sua opinião pessoal' },
            { label: 'D', valor: 'De conhecimento geral' },
        ],
        correta: 'B',
        explicacao: 'Quando a banca usa "segundo o texto" ou "de acordo com o texto", ela quer informações que estão explicitamente escritas. Basta localizar no texto!',
    },
    {
        id: 2,
        pergunta: 'Qual é a diferença entre "tema" e "título" de um texto?',
        opcoes: [
            { label: 'A', valor: 'São a mesma coisa' },
            { label: 'B', valor: 'Tema é o assunto; título é o nome dado ao texto' },
            { label: 'C', valor: 'Título é mais importante que o tema' },
            { label: 'D', valor: 'Tema aparece apenas no final do texto' },
        ],
        correta: 'B',
        explicacao: 'O tema é o assunto central discutido no texto. O título é o nome escolhido pelo autor, que pode ser metafórico ou indireto.',
    },
    {
        id: 3,
        pergunta: '"Pode-se inferir do texto que..." — o que essa expressão pede?',
        opcoes: [
            { label: 'A', valor: 'Copiar um trecho do texto' },
            { label: 'B', valor: 'Dar sua opinião pessoal' },
            { label: 'C', valor: 'Deduzir algo que não está escrito diretamente' },
            { label: 'D', valor: 'Resumir o texto em uma frase' },
        ],
        correta: 'C',
        explicacao: 'Inferir = deduzir. A banca pede que você identifique algo que não está explícito, mas que pode ser concluído a partir das informações do texto.',
    },
];

const QUIZ_PRATICO: QuizQuestion[] = [
    {
        id: 1,
        pergunta: 'Em um texto sobre exploração de petróleo no pré-sal, o autor afirma: "A tecnologia permitiu alcançar profundidades antes inimagináveis." Qual a ideia implícita?',
        opcoes: [
            { label: 'A', valor: 'A tecnologia é desnecessária' },
            { label: 'B', valor: 'Antes, não era possível explorar essas profundidades' },
            { label: 'C', valor: 'O pré-sal é raso e fácil de explorar' },
            { label: 'D', valor: 'A profundidade não importa' },
        ],
        correta: 'B',
        explicacao: 'A palavra "antes inimagináveis" implica que, no passado, não era possível alcançar tais profundidades. Essa é uma inferência direta.',
    },
    {
        id: 2,
        pergunta: '"A refinaria opera 24 horas por dia, 7 dias por semana." Qual informação está explícita?',
        opcoes: [
            { label: 'A', valor: 'A refinaria é antiga' },
            { label: 'B', valor: 'A refinaria funciona ininterruptamente' },
            { label: 'C', valor: 'A refinaria tem muitos funcionários' },
            { label: 'D', valor: 'A refinaria é lucrativa' },
        ],
        correta: 'B',
        explicacao: '24/7 = funcionamento ininterrupto. A informação está explícita no texto. As demais são suposições.',
    },
    {
        id: 3,
        pergunta: 'Em textos de prova CESGRANRIO, qual é a MELHOR estratégia para responder?',
        opcoes: [
            { label: 'A', valor: 'Responder com base no senso comum' },
            { label: 'B', valor: 'Ler as alternativas primeiro e depois o texto' },
            { label: 'C', valor: 'Ler o texto inteiro, identificar a ideia central e depois analisar alternativas' },
            { label: 'D', valor: 'Escolher a alternativa mais longa' },
        ],
        correta: 'C',
        explicacao: 'A estratégia mais eficaz: leia o texto completo, identifique o tema central e, só então, analise cada alternativa comparando com o texto.',
    },
    {
        id: 4,
        pergunta: 'Qual alternativa abaixo NÃO é uma dica válida para interpretar textos?',
        opcoes: [
            { label: 'A', valor: 'Sublinhar palavras-chave' },
            { label: 'B', valor: 'Confiar apenas na primeira impressão' },
            { label: 'C', valor: 'Reler trechos difíceis' },
            { label: 'D', valor: 'Observar conectivos e transições' },
        ],
        correta: 'B',
        explicacao: 'Confiar apenas na primeira impressão é arriscado. Releitura e análise cuidadosa são fundamentais para respostas corretas.',
    },
    {
        id: 5,
        pergunta: 'A frase "O petróleo é o ouro negro" utiliza qual recurso de linguagem?',
        opcoes: [
            { label: 'A', valor: 'Ironia' },
            { label: 'B', valor: 'Metáfora' },
            { label: 'C', valor: 'Hipérbole' },
            { label: 'D', valor: 'Eufemismo' },
        ],
        correta: 'B',
        explicacao: 'Metáfora: comparação implícita entre petróleo e ouro, atribuindo ao petróleo o valor do ouro. Não usa "como" ou "tal qual".',
    },
];

// ── Sub-components ──────────────────────────────────────────────────────

function HeroSection({ onStart }: { onStart: () => void }) {
    return (
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-8 md:p-12 text-center text-white mb-10">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="text-6xl mb-4 animate-bounce">📖</div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-3 leading-tight">
                    Interpretação de Texto
                </h1>
                <p className="text-blue-200 text-xl md:text-2xl max-w-2xl mx-auto mb-6">
                    Domine a habilidade #1 cobrada pela CESGRANRIO — aprenda a ler, inferir e acertar!
                </p>
                <button
                    onClick={onStart}
                    className="px-10 py-4 rounded-full bg-white text-indigo-700 font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    🚀 Começar Agora
                </button>
            </div>
        </section>
    );
}

function AlertBox({
    tipo,
    titulo,
    children,
}: {
    tipo: 'info' | 'warning' | 'danger' | 'success';
    titulo: string;
    children: React.ReactNode;
}) {
    const styles: Record<string, { bg: string; border: string; icon: string }> = {
        info: { bg: 'bg-blue-500/10', border: 'border-blue-500', icon: '💡' },
        warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', icon: '⚠️' },
        danger: { bg: 'bg-red-500/10', border: 'border-red-500', icon: '❌' },
        success: { bg: 'bg-green-500/10', border: 'border-green-500', icon: '🧠' },
    };
    const s = styles[tipo];
    return (
        <div className={`${s.bg} border-l-4 ${s.border} rounded-xl p-5 my-5`}>
            <div className="flex gap-3 items-start">
                <span className="text-2xl">{s.icon}</span>
                <div>
                    <strong className="text-foreground block mb-2 text-lg">{titulo}</strong>
                    <div className="text-muted-foreground text-base leading-relaxed">{children}</div>
                </div>
            </div>
        </div>
    );
}

function VideoModal({ videoId, title, duration, thumbnail }: { videoId: string; title: string; duration: string; thumbnail: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group relative w-full max-w-2xl mx-auto cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-indigo-500/50 shadow-lg">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img src={thumbnail} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl transition-transform group-hover:scale-110">
                                <Play className="fill-current" size={24} />
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold text-foreground text-lg truncate">{title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{duration}</p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl border-border bg-background p-0 overflow-hidden">
                <DialogHeader className="p-4 border-b border-border">
                    <DialogTitle className="text-foreground">{title}</DialogTitle>
                </DialogHeader>
                <div className="aspect-video w-full bg-black">
                    <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ImageCarousel({ slides }: { slides: { image: string; caption: string }[] }) {
    return (
        <div className="w-full max-w-3xl mx-auto my-8">
            <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <div className="overflow-hidden rounded-2xl bg-card border border-border shadow-lg">
                                    <div className="aspect-[16/9] w-full">
                                        <img src={slide.image} alt={slide.caption} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="p-4 bg-muted/30 backdrop-blur-sm">
                                        <p className="text-center text-foreground font-medium">{slide.caption}</p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                    <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-700 text-slate-400" />
                    <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-700 text-slate-400" />
                </div>
            </Carousel>
        </div>
    );
}

function GuidedExercise() {
    const [step, setStep] = useState(1);
    const [keywords, setKeywords] = useState('');
    const [feedback, setFeedback] = useState('');

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="bg-card rounded-xl border border-border p-6 my-8 shadow-sm">
            <div className="flex justify-between items-center mb-8 px-2">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                            {s}
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider font-bold ${step >= s ? 'text-indigo-500' : 'text-muted-foreground'}`}>
                            Passo {s}
                        </span>
                    </div>
                ))}
                <div className="absolute left-0 right-0 h-0.5 bg-border -z-10 top-10 mx-12 hidden md:block" />
            </div>

            <div className="min-h-[200px] flex flex-col justify-center">
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h4 className="text-foreground font-bold mb-3">Passo 1: Leitura Atenta</h4>
                        <p className="text-muted-foreground text-sm italic border-l-2 border-indigo-500 pl-4 py-2 bg-muted/30 rounded-r-lg">
                            "A exploração de petróleo em águas ultraprofundas exige não apenas tecnologia de ponta, mas uma equipe altamente treinada para lidar com imprevistos geológicos."
                        </p>
                        <p className="text-muted-foreground/60 text-xs mt-4">Leia o trecho acima com calma antes de prosseguir.</p>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h4 className="text-foreground font-bold mb-3">Passo 2: Identificar Palavras-Chave</h4>
                        <p className="text-muted-foreground text-sm mb-4">Quais são os dois pilares citados para a exploração?</p>
                        <input
                            type="text"
                            className="w-full bg-background border border-border rounded-lg p-3 text-foreground text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="Digite aqui..."
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                        {keywords.toLowerCase().includes('tecnologia') && keywords.toLowerCase().includes('equipe') && (
                            <p className="text-green-500 text-xs mt-2">✨ Excelente! Tecnologia e Equipe são as chaves.</p>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h4 className="text-foreground font-bold mb-3">Passo 3: Inferência Lógica</h4>
                        <p className="text-muted-foreground text-sm mb-4">Podemos inferir que a exploração em águas ultraprofundas é:</p>
                        <div className="space-y-2">
                            {['Um processo simples e automatizado', 'Um desafio complexo e multidisciplinar'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setFeedback(opt)}
                                    className={`w-full text-left p-3 rounded-lg border-2 text-sm transition-all ${feedback === opt ? 'border-indigo-600 bg-indigo-600/10 text-foreground' : 'border-border text-muted-foreground hover:border-indigo-500/50 hover:bg-muted/50'}`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {feedback === 'Um desafio complexo e multidisciplinar' && (
                            <p className="text-green-500 text-xs mt-2">🎯 Exato! A necessidade de equipe e tecnologia prova a complexidade.</p>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LuCheck size={32} />
                        </div>
                        <h4 className="text-foreground font-bold mb-2">Exercício Concluído!</h4>
                        <p className="text-muted-foreground text-sm">Você aplicou o método SSR com sucesso.</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-muted disabled:opacity-50 transition-all"
                >
                    Voltar
                </button>
                <button
                    onClick={nextStep}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${step === 4 ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                >
                    {step === 4 ? 'Concluído' : 'Próximo'}
                </button>
            </div>
        </div>
    );
}

function MusicPlayer({ audioUrl, title, artist }: { audioUrl: string; title: string; artist: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl w-64 md:w-72">
                <audio ref={audioRef} src={audioUrl} loop />
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg transition-all ${isPlaying ? 'scale-105 shadow-indigo-500/20' : ''}`}>
                        <LuBookOpen className="text-white" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h5 className="text-foreground font-bold text-sm truncate">{title}</h5>
                        <p className="text-muted-foreground text-xs truncate">{artist}</p>
                    </div>
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                    >
                        {isPlaying ? <LuPause size={20} /> : <LuPlay size={20} className="ml-1" />}
                    </button>
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <LuVolume2 size={14} className="text-muted-foreground" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            setVolume(v);
                            if (audioRef.current) audioRef.current.volume = v;
                        }}
                        className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
}

function ProgressIndicator() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scroll = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            if (height === 0) return;
            const p = (scroll / height) * 100;
            setProgress(p);
        };
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-[73px] left-0 md:left-[250px] right-0 h-1 bg-muted z-40 transition-all duration-300 overflow-hidden">
            <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

function FlipCard({
    frente,
    verso,
    numero,
}: {
    frente: string;
    verso: string;
    numero: number;
}) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div
            className="cursor-pointer perspective-1000"
            onClick={() => setFlipped(!flipped)}
            style={{ perspective: '1000px' }}
        >
            <div
                className="relative w-full min-h-[220px] transition-transform duration-600"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
                    transitionDuration: '0.6s',
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-card to-muted rounded-xl p-5 border border-border flex flex-col justify-between shadow-lg"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <span className="text-yellow-500 font-bold text-sm">Questão {numero}</span>
                    <p className="text-foreground text-sm mt-2 flex-1">{frente}</p>
                    <span className="text-xs text-muted-foreground mt-3">👆 Clique para ver a resposta</span>
                </div>
                {/* Back */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-5 border border-yellow-500/40 flex flex-col justify-between shadow-inner"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <span className="text-green-500 font-bold text-sm">✅ Resposta</span>
                    <p className="text-foreground text-sm mt-2 flex-1">{verso}</p>
                    <span className="text-xs text-muted-foreground mt-3">👆 Clique para voltar</span>
                </div>
            </div>
        </div>
    );
}

function QuizInterativo({
    questoes,
    titulo,
    icone,
    onComplete,
}: {
    questoes: QuizQuestion[];
    titulo: string;
    icone: string;
    onComplete?: (score: number) => void;
}) {
    const [respostas, setRespostas] = useState<Record<number, string>>({});
    const [verificados, setVerificados] = useState<Record<number, boolean>>({});
    const [completed, setCompleted] = useState(false);

    const selecionar = (qId: number, label: string) => {
        if (verificados[qId]) return;
        setRespostas((prev) => ({ ...prev, [qId]: label }));
    };

    const verificar = (qId: number) => {
        setVerificados((prev) => ({ ...prev, [qId]: true }));
    };

    const totalCertas = questoes.filter((q) => verificados[q.id] && respostas[q.id] === q.correta).length;
    const totalVerificadas = Object.keys(verificados).length;

    useEffect(() => {
        if (totalVerificadas === questoes.length && !completed) {
            const acertos = questoes.filter((q) => verificados[q.id] && respostas[q.id] === q.correta).length;
            const aproveitamento = (acertos / questoes.length) * 100;
            if (aproveitamento >= 70) {
                setCompleted(true);
                if (onComplete) onComplete(Math.round(aproveitamento));
            }
        }
    }, [totalVerificadas, questoes, verificados, respostas, completed, onComplete]);

    return (
        <div className="bg-card rounded-xl border border-border p-6 my-8 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                <span>{icone}</span> {titulo}
            </h3>
            {totalVerificadas > 0 && (
                <div className="mb-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span>Progresso: {totalVerificadas}/{questoes.length}</span>
                        <span>|</span>
                        <span className="text-green-500">✅ {totalCertas} certas</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-green-500 transition-all duration-500"
                            style={{ width: `${(totalVerificadas / questoes.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="space-y-6 mt-4">
                {questoes.map((q) => {
                    const respondida = verificados[q.id];
                    const acertou = respostas[q.id] === q.correta;
                    return (
                        <div key={q.id} className="border border-border/50 rounded-lg p-4 bg-muted/20">
                            <p className="text-foreground font-medium mb-3">
                                <span className="text-yellow-600 dark:text-yellow-500 mr-2">{q.id}.</span>
                                {q.pergunta}
                            </p>
                            <div className="space-y-2">
                                {q.opcoes.map((op) => {
                                    const selecionada = respostas[q.id] === op.label;
                                    let borderColor = 'border-border hover:border-indigo-500';
                                    if (respondida) {
                                        if (op.label === q.correta) borderColor = 'border-green-500 bg-green-500/10';
                                        else if (selecionada) borderColor = 'border-red-500 bg-red-500/10';
                                        else borderColor = 'border-border opacity-50';
                                    } else if (selecionada) {
                                        borderColor = 'border-indigo-500 bg-indigo-500/10';
                                    }
                                    return (
                                        <button
                                            key={op.label}
                                            onClick={() => selecionar(q.id, op.label)}
                                            disabled={respondida}
                                            className={`w-full text-left px-4 py-3 rounded-lg border-2 ${borderColor} text-foreground text-sm transition-all duration-200`}
                                        >
                                            <span className="font-bold mr-2">{op.label})</span> {op.valor}
                                        </button>
                                    );
                                })}
                            </div>
                            {respostas[q.id] && !respondida && (
                                <button
                                    onClick={() => verificar(q.id)}
                                    className="mt-3 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition shadow-md"
                                >
                                    Verificar Resposta
                                </button>
                            )}
                            {respondida && (
                                <div className={`mt-3 p-3 rounded-lg text-sm ${acertou ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                                    <span className="font-bold">{acertou ? '🎉 Correto!' : '❌ Incorreto.'}</span>{' '}
                                    <span className="text-muted-foreground">{q.explicacao}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {totalVerificadas === questoes.length && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-500/30 text-center shadow-inner">
                    <p className="text-2xl font-bold text-foreground">
                        {totalCertas === questoes.length
                            ? '🏆 Perfeito!'
                            : totalCertas >= questoes.length / 2
                                ? '👏 Bom trabalho!'
                                : '📚 Continue estudando!'}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                        Você acertou {totalCertas} de {questoes.length} questões
                    </p>
                </div>
            )}
        </div>
    );
}

function TimelineItem({ passo, titulo, descricao }: { passo: number; titulo: string; descricao: string }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg">
                    {passo}
                </div>
                {passo < 4 && <div className="w-0.5 h-full bg-gradient-to-b from-yellow-500/50 to-transparent mt-1" />}
            </div>
            <div className="pb-8">
                <h4 className="text-foreground font-bold">{titulo}</h4>
                <p className="text-muted-foreground text-sm mt-1">{descricao}</p>
            </div>
        </div>
    );
}

function ComparisonSide({
    tipo,
    titulo,
    items,
}: {
    tipo: 'correct' | 'incorrect';
    titulo: string;
    items: string[];
}) {
    const isCorrect = tipo === 'correct';
    return (
        <div
            className={`flex-1 rounded-xl p-5 border ${isCorrect
                ? 'bg-green-500/5 border-green-500/30'
                : 'bg-red-500/5 border-red-500/30'
                }`}
        >
            <div className={`font-bold mb-3 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? '✅' : '❌'} {titulo}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                        <span>{isCorrect ? '•' : '•'}</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ModuleBanner({
    numero,
    titulo,
    descricao,
    gradiente,
}: {
    numero: number;
    titulo: string;
    descricao: string;
    gradiente: string;
}) {
    return (
        <div className={`relative overflow-hidden rounded-2xl ${gradiente} p-10 md:p-14 text-white text-center shadow-xl`}>
            {/* Decorative elements */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
                <span className="inline-block text-sm uppercase tracking-[0.2em] font-bold bg-white/20 px-4 py-1.5 rounded-full mb-4">
                    Módulo {numero}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">{titulo}</h2>
                <p className="text-white/80 mt-4 max-w-xl mx-auto text-lg">{descricao}</p>
            </div>
        </div>
    );
}

// ── Main Component ──────────────────────────────────────────────────────

interface AulaInterpretacaoTextoProps {
    onComplete: () => void;
    isCompleted: boolean;
    loading: boolean;
    xpGanho: number;
    currentProgress: number;
    onUpdateProgress: (percent: number) => Promise<void>;
}

// ── Module Definitions ──────────────────────────────────────────────────
const MODULE_DEFS = [
    { id: 'modulo-1', label: 'Módulo 1', titulo: 'Fundamentos e Técnicas' },
    { id: 'modulo-2', label: 'Módulo 2', titulo: 'Prática e Estratégia' },
] as const;

const PROGRESS_PER_MODULE = Math.floor(100 / MODULE_DEFS.length); // 50 for 2 modules

export default function AulaInterpretacaoTexto({
    onComplete,
    isCompleted,
    loading,
    xpGanho,
    currentProgress,
    onUpdateProgress,
}: AulaInterpretacaoTextoProps) {
    const [activeTab, setActiveTab] = useState<string>('modulo-1');
    const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

    // Determine if a module is unlocked
    const isModuleUnlocked = useCallback((moduleIndex: number) => {
        if (moduleIndex === 0) return true; // First module always unlocked
        const prevModuleId = MODULE_DEFS[moduleIndex - 1]?.id;
        return prevModuleId ? completedModules.has(prevModuleId) : false;
    }, [completedModules]);

    // Load initial progress from DB
    useEffect(() => {
        const loadProgress = async () => {
            const progress = await progressService.getProgress('interpretacao-texto');
            const completed = new Set<string>();
            let highestCompleted = -1;

            MODULE_DEFS.forEach((mod, index) => {
                const modProgress = progress.find((p: any) => p.module_id === mod.id || p.moduleId === mod.id);
                if (modProgress?.completed) {
                    completed.add(mod.id);
                    highestCompleted = index;
                }
            });

            setCompletedModules(completed);

            // Auto-navigate to the next uncompleted module
            if (highestCompleted >= 0 && highestCompleted < MODULE_DEFS.length - 1) {
                setActiveTab(MODULE_DEFS[highestCompleted + 1].id);
            }
        };
        loadProgress();
    }, []);

    // Generic module completion handler
    const handleModuleComplete = useCallback(async (moduleId: string, moduleIndex: number, score: number) => {
        const newCompleted = new Set(completedModules);
        newCompleted.add(moduleId);
        setCompletedModules(newCompleted);

        const progressPercent = Math.min((moduleIndex + 1) * PROGRESS_PER_MODULE, 100);
        onUpdateProgress(progressPercent);

        // Save to DB
        await progressService.saveProgress({
            lessonId: 'interpretacao-texto',
            moduleId: moduleId,
            score: score,
            completed: true,
            readPercentage: 100
        });

        // Navigate to next module or complete the lesson
        const isLastModule = moduleIndex === MODULE_DEFS.length - 1;
        if (isLastModule) {
            onComplete();
        } else {
            setActiveTab(MODULE_DEFS[moduleIndex + 1].id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [completedModules, onUpdateProgress, onComplete]);

    const handleModule1Complete = useCallback(async (score: number) => {
        await handleModuleComplete('modulo-1', 0, score);
    }, [handleModuleComplete]);

    const handleModule2Complete = useCallback(async (score: number) => {
        await handleModuleComplete('modulo-2', 1, score);
    }, [handleModuleComplete]);

    const scrollToContent = useCallback(() => {
        setActiveTab('modulo-1');
        setTimeout(() => {
            document.getElementById('modulo-1-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }, []);

    return (
        <div className="space-y-12">
            <ProgressIndicator />
            {/* ─── 1. HERO SECTION ─── */}
            <HeroSection onStart={scrollToContent} />

            <Tabs value={activeTab} onValueChange={(val) => {
                // Only allow switching to unlocked modules
                const idx = MODULE_DEFS.findIndex(m => m.id === val);
                if (isModuleUnlocked(idx)) setActiveTab(val);
            }} className="w-full">
                <TabsList className={`grid w-full mb-10 h-auto p-1.5 bg-muted/30 border border-border/50 rounded-2xl gap-1.5 md:gap-2 shadow-inner grid-cols-2 md:grid-cols-${MODULE_DEFS.length}`}>
                    {MODULE_DEFS.map((mod, index) => {
                        const unlocked = isModuleUnlocked(index);
                        const done = completedModules.has(mod.id);
                        return (
                            <TabsTrigger
                                key={mod.id}
                                value={mod.id}
                                disabled={!unlocked}
                                className="py-2.5 px-3 md:py-3 md:px-4 rounded-xl transition-all duration-300
                                    data-[state=active]:bg-background data-[state=active]:text-indigo-600 
                                    data-[state=active]:shadow-lg data-[state=active]:ring-1 data-[state=active]:ring-border
                                    dark:data-[state=active]:bg-secondary dark:data-[state=active]:text-indigo-400 dark:data-[state=active]:border-primary/30
                                    disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-black text-muted-foreground/70">{mod.label}</span>
                                    <span className="font-bold text-sm md:text-base flex items-center gap-1.5">
                                        {mod.titulo}
                                        {done && <span className="text-green-500 text-base">✓</span>}
                                        {!unlocked && (
                                            <span className="text-[9px] bg-muted-foreground/10 px-1.5 py-0.5 rounded-full text-muted-foreground font-medium border border-border/50">
                                                🔒
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {/* ─── MÓDULO 1 ─── */}
                <TabsContent value="modulo-1" id="modulo-1-content" className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Banner do Módulo 1 */}
                    <ModuleBanner
                        numero={1}
                        titulo="Fundamentos e Técnicas"
                        descricao="Domine os conceitos essenciais de interpretação de texto e as técnicas de leitura cobradas pela CESGRANRIO."
                        gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
                    />


                    {/* ─── 3. CONCEITO CENTRAL ─── */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                            <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold">1</span>
                            O que é Interpretação de Texto?
                        </h2>
                        <p className="text-muted-foreground -mt-2 text-lg">Entenda o conceito fundamental e por que ele é tão cobrado pela CESGRANRIO.</p>

                        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-8 mb-6">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                A interpretação de texto é a habilidade de <strong className="text-foreground">compreender o significado</strong> de um texto, identificando suas <strong className="text-yellow-600 dark:text-yellow-400">ideias principais, secundárias e implícitas</strong>. Nas provas da CESGRANRIO, essa competência é fundamental e representa uma grande parte das questões de Língua Portuguesa.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed mt-6">
                                Para interpretar corretamente um texto, você precisa ir <strong className="text-foreground">além da leitura superficial</strong>. É necessário identificar o que o autor quis dizer, mesmo quando ele não expressa diretamente suas ideias.
                            </p>
                        </div>

                        {/* Comparação Lado a Lado */}
                        <h3 className="text-lg font-bold text-muted-foreground mb-3">Metáfora vs Definição Técnica</h3>
                        <div className="flex flex-col md:flex-row gap-4 mb-10">
                            <div className="flex-1 bg-purple-500/10 border border-purple-500/30 rounded-xl p-5">
                                <div className="text-purple-600 dark:text-purple-400 font-bold mb-2">🎭 Metáfora</div>
                                <p className="text-muted-foreground text-base leading-relaxed">
                                    Interpretar um texto é como ser um <strong className="text-foreground">detetive</strong>: você precisa encontrar pistas (palavras-chave), juntar evidências (argumentos) e chegar a uma conclusão (ideia central). Assim como um detetive não inventa provas, você não deve inventar informações que não estão no texto!
                                </p>
                            </div>
                            <div className="flex items-center justify-center text-muted-foreground font-bold text-xl px-2">VS</div>
                            <div className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
                                <div className="text-blue-600 dark:text-blue-400 font-bold mb-2">📚 Definição Técnica (Bechara)</div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    A interpretação textual consiste no processo de <strong className="text-foreground">decodificação e compreensão dos significados</strong> presentes na superfície e na profundidade do texto, envolvendo o reconhecimento de informações explícitas e a construção de inferências a partir de elementos linguísticos e contextuais.
                                </p>
                            </div>
                        </div>

                        {/* Video Modal Integrado */}
                        <div className="my-10 text-center">
                            <h3 className="text-lg font-bold text-muted-foreground mb-6">Assista à explicação em vídeo:</h3>
                            <VideoModal
                                videoId="dQw4w9WgXcQ" // Dummy ID
                                title="Aula Express: Interpretação de Texto para CESGRANRIO"
                                duration="02:15"
                                thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1073&auto=format&fit=crop"
                            />
                        </div>
                    </section>

                    {/* ─── 4. TÉCNICAS DE LEITURA (ACORDEÃO) ─── */}
                    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-sm font-bold">2</span>
                            Técnicas de Leitura Eficiente
                        </h2>

                        <Accordion type="single" collapsible defaultValue="skimming" className="space-y-3">
                            <AccordionItem value="skimming" className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm transition-all hover:border-border/60">
                                <AccordionTrigger className="px-5 py-4 text-foreground hover:no-underline hover:bg-muted/30 border-none outline-none">
                                    <span className="flex items-center gap-3">
                                        <span className="text-xl">👁️</span>
                                        <span className="font-semibold">Leitura Prévia (Skimming)</span>
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-5 pb-5">
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                                        Passe os olhos rapidamente pelo texto para ter uma <strong className="text-foreground">ideia geral do assunto</strong>. Observe título, subtítulos, primeiro e último parágrafo.
                                    </p>
                                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 text-sm">
                                        <strong className="text-indigo-600 dark:text-indigo-400">🔧 Na prática do setor:</strong>
                                        <span className="text-muted-foreground ml-1">Imagine que você recebeu um relatório técnico de 10 páginas sobre segurança operacional. A leitura prévia te ajuda a entender rapidamente se o documento trata de riscos químicos, mecânicos ou ambientais.</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="scanning" className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm transition-all hover:border-border/60">
                                <AccordionTrigger className="px-5 py-4 text-foreground hover:no-underline hover:bg-muted/30 border-none outline-none">
                                    <span className="flex items-center gap-3">
                                        <span className="text-xl">🔍</span>
                                        <span className="font-semibold">Leitura Detalhada (Scanning)</span>
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-5 pb-5">
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                                        Leia com atenção, buscando <strong className="text-foreground">informações específicas</strong>. Sublinhe palavras-chave e ideias importantes. Foque nos conectivos (porém, contudo, além disso) pois eles indicam a direção do argumento.
                                    </p>
                                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 text-sm">
                                        <strong className="text-indigo-600 dark:text-indigo-400">🔧 Na prática do setor:</strong>
                                        <span className="text-muted-foreground ml-1">Ao ler um procedimento de manutenção, o scanning te ajuda a encontrar especificamente os valores de temperatura e pressão necessários.</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="releitura" className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm transition-all hover:border-border/60">
                                <AccordionTrigger className="px-5 py-4 text-foreground hover:no-underline hover:bg-muted/30 border-none outline-none">
                                    <span className="flex items-center gap-3">
                                        <span className="text-xl">🧐</span>
                                        <span className="font-semibold">Releitura Crítica</span>
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-5 pb-5">
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                                        Após a primeira leitura, releia os trechos mais importantes fazendo perguntas: <strong className="text-foreground">&quot;O que o autor quis dizer?&quot;</strong>, <strong className="text-foreground">&quot;Qual a intenção do texto?&quot;</strong>, <strong className="text-foreground">&quot;Há ironia ou duplo sentido?&quot;</strong>
                                    </p>
                                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 text-sm">
                                        <strong className="text-indigo-600 dark:text-indigo-400">🔧 Na prática do setor:</strong>
                                        <span className="text-muted-foreground ml-1">Ao ler uma norma regulamentadora (NR), a releitura crítica ajuda a entender não só o que diz, mas por que aquela regra existe e suas implicações.</span>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <h3 className="text-lg font-bold text-muted-foreground mt-10 mb-6 text-center">Infográfico: O Ciclo da Leitura</h3>
                        <ImageCarousel slides={[
                            {
                                image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=60',
                                caption: '1. Skimming: Capture a essência em segundos.'
                            },
                            {
                                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
                                caption: '2. Scanning: Localize dados e evidências.'
                            },
                            {
                                image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=60',
                                caption: '3. Releitura: Conecte os pontos e infira.'
                            },
                        ]} />

                        <AlertBox tipo="success" titulo="🧠 Macete Memorável:">
                            Lembre-se do método <strong className="text-foreground">S-S-R</strong>: <strong className="text-yellow-600 dark:text-yellow-400">S</strong>kimming (visão geral) → <strong className="text-yellow-600 dark:text-yellow-400">S</strong>canning (detalhes) → <strong className="text-yellow-600 dark:text-yellow-400">R</strong>eleitura (compreensão profunda). Na prova, use essa sequência para cada texto!
                        </AlertBox>

                    </section>

                    {/* ─── QUIZ DIAGNÓSTICO (FINAL DO MÓDULO 1) ─── */}
                    <section id="quiz-diagnostico" className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
                        <QuizInterativo
                            questoes={QUIZ_DIAGNOSTICO}
                            titulo="Quiz Diagnóstico — Desbloqueie o Módulo 2!"
                            icone="🔒"
                            onComplete={handleModule1Complete}
                        />

                        <AlertBox tipo="info" titulo="💡 Dica do Professor:">
                            Se você errou alguma questão, não se preocupe! Revise o conteúdo acima e tente novamente. Preste atenção especial nas técnicas de leitura.
                        </AlertBox>

                        {/* Aviso de Bloqueio se não completou */}
                        {!completedModules.has('modulo-1') && (
                            <div className="mt-12 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
                                <h3 className="text-xl font-bold text-foreground mb-2">🔒 Próximo Módulo Bloqueado</h3>
                                <p className="text-muted-foreground mb-4">
                                    Para avançar, acerte pelo menos 70% do Quiz Diagnóstico acima.
                                </p>
                                <button
                                    onClick={() => document.getElementById('quiz-diagnostico')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-3 bg-yellow-600 text-white rounded-xl font-bold hover:bg-yellow-500 transition shadow-lg text-lg"
                                >
                                    Ir para o Quiz
                                </button>
                            </div>
                        )}
                    </section>
                </TabsContent>

                {/* ─── MÓDULO 2 ─── */}
                <TabsContent value="modulo-2" className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Lock Screen if not allowed */}
                    {!isModuleUnlocked(1) ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                                <span className="text-4xl">🔒</span>
                            </div>
                            <h2 className="text-3xl font-bold text-foreground">Módulo Bloqueado</h2>
                            <p className="text-muted-foreground max-w-md text-lg">
                                Para acessar o Módulo 2, complete o Quiz do Módulo 1 com pelo menos 70% de acerto.
                            </p>
                            <button
                                onClick={() => setActiveTab('modulo-1')}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg"
                            >
                                Voltar para o Módulo 1
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Banner do Módulo 2 */}
                            <ModuleBanner
                                numero={2}
                                titulo="Prática e Estratégia"
                                descricao="Aplique o que aprendeu em exercícios guiados, questões comentadas e simulações de provas CESGRANRIO."
                                gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
                            />

                            {/* ─── 5. TABS: EXEMPLOS vs ERROS COMUNS ─── */}
                            <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 flex items-center gap-4">
                                    <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold">3</span>
                                    Informações Explícitas vs. Implícitas
                                </h2>

                                <Tabs defaultValue="exemplos" className="bg-card rounded-xl border border-border overflow-hidden">
                                    <TabsList className="w-full bg-muted p-1 rounded-none border-b border-border">
                                        <TabsTrigger value="exemplos" className="flex-1 data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 font-bold">
                                            ✅ Exemplos Corretos
                                        </TabsTrigger>
                                        <TabsTrigger value="erros" className="flex-1 data-[state=active]:bg-red-600/20 data-[state=active]:text-red-600 dark:data-[state=active]:text-red-400 font-bold">
                                            ❌ Erros Comuns
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="exemplos" className="p-8">
                                        <div className="space-y-6 text-base text-muted-foreground">
                                            <div className="bg-muted/50 rounded-xl p-6">
                                                <p className="text-muted-foreground/80 italic mb-3 text-lg">&quot;João saiu correndo quando ouviu o trovão.&quot;</p>
                                                <p className="text-lg"><strong className="text-emerald-600 dark:text-emerald-400">✅ Explícito:</strong> João saiu correndo.</p>
                                                <p className="text-lg"><strong className="text-yellow-600 dark:text-yellow-400">✅ Implícito (correto):</strong> João provavelmente tem medo de trovão ou tempestade.</p>
                                            </div>
                                            <div className="bg-muted/50 rounded-xl p-6">
                                                <p className="text-muted-foreground/80 italic mb-3 text-lg">&quot;A produção na plataforma caiu 30% após a manutenção programada.&quot;</p>
                                                <p className="text-lg"><strong className="text-green-600 dark:text-green-400">✅ Explícito:</strong> A produção caiu 30%.</p>
                                                <p className="text-lg"><strong className="text-yellow-600 dark:text-yellow-400">✅ Implícito (correto):</strong> A manutenção afetou temporariamente a produção.</p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="erros" className="p-5">
                                        <div className="space-y-4 text-sm text-muted-foreground">
                                            <div className="bg-muted/50 rounded-lg p-4 border-l-3 border-red-500">
                                                <p className="text-muted-foreground/80 italic mb-2">Texto: &quot;João saiu correndo quando ouviu o trovão.&quot;</p>
                                                <p><strong className="text-red-500">❌ Erro:</strong> &quot;João é medroso&quot; — isso é <strong className="text-foreground">opinião pessoal</strong>, não uma inferência válida!</p>
                                                <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">🔑 Inferência ≠ Opinião. A inferência é baseada no texto, a opinião é pessoal.</p>
                                            </div>
                                            <div className="bg-muted/50 rounded-lg p-4 border-l-3 border-red-500">
                                                <p className="text-muted-foreground/80 italic mb-2">Texto: &quot;A Petrobras investiu R$ 5 bilhões em energias renováveis.&quot;</p>
                                                <p><strong className="text-red-500">❌ Erro:</strong> &quot;A Petrobras vai abandonar o petróleo&quot; — isso é <strong className="text-foreground">extrapolação</strong>. O texto fala de investimento, não de abandono!</p>
                                                <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">🔑 Cuidado com inferências que vão além do que o texto permite.</p>
                                            </div>
                                            <div className="bg-muted/50 rounded-lg p-4 border-l-3 border-red-500">
                                                <p className="text-muted-foreground/80 italic mb-2">Pergunta: &quot;Segundo o texto, qual é o tema principal?&quot;</p>
                                                <p><strong className="text-red-500">❌ Erro:</strong> Responder com base no título apenas, sem ler o texto completo. O título pode ser metafórico!</p>
                                                <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">🔑 Sempre leia o texto INTEIRO antes de responder.</p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </section>

                            {/* ─── 6. IDENTIFICANDO A IDEIA CENTRAL ─── */}
                            <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 flex items-center gap-4">
                                    <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold">4</span>
                                    Identificando a Ideia Central — Passo a Passo
                                </h2>

                                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                                    <TimelineItem
                                        passo={1}
                                        titulo="Pergunte-se: &quot;Sobre o que o texto fala?&quot;"
                                        descricao="Busque o assunto geral, não os detalhes. Ex: O texto fala sobre segurança offshore? Sobre produção de petróleo? Sobre meio ambiente?"
                                    />
                                    <TimelineItem
                                        passo={2}
                                        titulo="Observe o título e os subtítulos"
                                        descricao="Geralmente indicam o assunto principal, mas cuidado: títulos podem ser metafóricos! Sempre confirme com o corpo do texto."
                                    />
                                    <TimelineItem
                                        passo={3}
                                        titulo="Analise o primeiro e o último parágrafo"
                                        descricao="O primeiro parágrafo costuma apresentar o tema. O último parágrafo retoma a ideia central e arremata o argumento."
                                    />
                                    <TimelineItem
                                        passo={4}
                                        titulo="Verifique a conclusão"
                                        descricao="A conclusão do autor geralmente reforça a tese principal. Se o texto é argumentativo, a conclusão revela a posição do autor."
                                    />
                                </div>

                                <AlertBox tipo="warning" titulo="⚠️ Atenção — Padrão CESGRANRIO:">
                                    Questões sobre ideia central costumam usar termos como <strong className="text-foreground">&quot;tema principal&quot;</strong>, <strong className="text-foreground">&quot;assunto central&quot;</strong>, <strong className="text-foreground">&quot;o texto trata principalmente de&quot;</strong>. Essas questões pedem uma visão GERAL, não detalhes específicos!
                                </AlertBox>
                            </section>

                            {/* ─── 7. QUESTÕES COMENTADAS (FLIP CARDS) ─── */}
                            <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-4">
                                    <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold">5</span>
                                    Questões Comentadas — Estilo CESGRANRIO
                                </h2>
                                <p className="text-muted-foreground mb-8 text-lg">Clique em cada card para ver a resposta e a explicação:</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FlipCard
                                        numero={1}
                                        frente="Se o enunciado diz 'De acordo com o texto', você deve buscar informações que estão... onde?"
                                        verso="Informações EXPLÍCITAS, escritas diretamente no texto. Basta localizar e copiar. Não invente nem deduza!"
                                    />
                                    <FlipCard
                                        numero={2}
                                        frente="Qual a diferença entre COMPREENSÃO e INTERPRETAÇÃO de texto?"
                                        verso="Compreensão = entender o que está ESCRITO (explícito). Interpretação = entender o que está IMPLÍCITO (ler nas entrelinhas)."
                                    />
                                    <FlipCard
                                        numero={3}
                                        frente="Na prova, como diferenciar uma inferência válida de uma opinião pessoal?"
                                        verso="Inferência = conclusão baseada em evidências DO TEXTO. Opinião = seu ponto de vista pessoal. Na prova, NUNCA use opinião — use apenas o que o texto permite concluir."
                                    />
                                </div>
                            </section>

                            {/* ─── 8. COMPARAÇÃO LADO A LADO ─── */}
                            <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center gap-4">
                                    <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold">6</span>
                                    Certo vs. Errado — Estratégias de Prova
                                </h2>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <ComparisonSide
                                        tipo="correct"
                                        titulo="Faça assim"
                                        items={[
                                            'Leia o texto inteiro antes de responder',
                                            'Identifique o tema central e as ideias secundárias',
                                            'Diferencie fatos de opiniões do autor',
                                            'Questões com "segundo o texto" = informações explícitas',
                                            'Questões com "pode-se inferir" = informações implícitas',
                                            'Elimine alternativas absurdas primeiro',
                                        ]}
                                    />
                                    <ComparisonSide
                                        tipo="incorrect"
                                        titulo="Evite isso"
                                        items={[
                                            'Responder sem ler o texto completo',
                                            'Confiar apenas no título para identificar o tema',
                                            'Confundir sua opinião pessoal com inferência',
                                            'Escolher alternativas que contradizem o texto',
                                            'Marcar a primeira alternativa que "parece certa"',
                                            'Extrapolar informações além do texto',
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* ─── 8. RESUMO VISUAL (MOVIDO PARA ANTES DO QUIZ) ─── */}
                            <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center gap-4">
                                    <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold">8</span>
                                    Resumo — Pontos-Chave
                                </h2>
                                <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { icon: '📖', text: 'Leia o texto inteiro antes de responder' },
                                            { icon: '🎯', text: 'Identifique o tema central e ideias secundárias' },
                                            { icon: '🔍', text: 'Use Skimming → Scanning → Releitura' },
                                            { icon: '💬', text: '"Segundo o texto" = informação explícita' },
                                            { icon: '🧠', text: '"Pode-se inferir" = informação implícita' },
                                            { icon: '⚠️', text: 'Inferência ≠ opinião pessoal' },
                                            { icon: '❌', text: 'Elimine alternativas absurdas primeiro' },
                                            { icon: '✅', text: 'CESGRANRIO é direta — sem pegadinhas rebuscadas' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 bg-muted/50 rounded-xl p-4 border border-border/50">
                                                <span className="text-2xl">{item.icon}</span>
                                                <span className="text-muted-foreground text-base font-medium">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <AlertBox tipo="success" titulo="🧠 Macete Final:">
                                    Na prova CESGRANRIO, as questões de interpretação costumam ser <strong className="text-foreground">diretas e sem pegadinhas</strong>. A resposta correta é aquela que melhor representa o que está no texto. Confie no texto, não na sua intuição!
                                </AlertBox>
                            </section>

                            {/* ─── 9. QUIZ PRÁTICO (FINAL DA AULA) ─── */}
                            <section id="quiz-pratico" className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 flex items-center gap-4">
                                    <span className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-lg font-bold">9</span>
                                    Bateria de Exercícios
                                </h2>
                                <QuizInterativo
                                    questoes={QUIZ_PRATICO}
                                    titulo="Quiz Prático — Teste seus conhecimentos!"
                                    icone="🎯"
                                    onComplete={handleModule2Complete}
                                />
                            </section>

                            {/* ─── 11. ENCERRAMENTO MOTIVACIONAL ─── */}
                            <section className="mt-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-8 border border-yellow-500/30 text-center">
                                <div className="text-5xl mb-3">{isCompleted ? '🏆' : '🎉'}</div>
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    {isCompleted ? '✅ Aula Concluída!' : 'Módulo 2 Finalizado!'}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {isCompleted
                                        ? `Você ganhou +${xpGanho || 50} XP! Continue para a próxima aula.`
                                        : 'Marque esta aula como concluída e ganhe XP!'}
                                </p>
                                <button
                                    onClick={onComplete}
                                    disabled={isCompleted || loading}
                                    className={`px-6 py-3 rounded-xl font-bold transition ${isCompleted
                                        ? 'bg-green-600 text-white cursor-not-allowed'
                                        : loading
                                            ? 'bg-muted text-muted-foreground cursor-wait'
                                            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:shadow-lg hover:shadow-orange-500/25'
                                        }`}
                                >
                                    {isCompleted ? '🏆 +50 XP Conquistados!' : loading ? 'Carregando...' : '✨ Marcar como Concluída'}
                                </button>
                            </section>
                        </>
                    )}
                </TabsContent>
            </Tabs>

        </div>
    );
}
