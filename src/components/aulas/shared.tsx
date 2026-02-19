'use client';

import { useState, useEffect, useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { LuChevronDown } from 'react-icons/lu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Play, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { LuPlay, LuImage, LuFileText, LuLock, LuTrophy, LuBookOpen, LuVolume2, LuHeart, LuShuffle, LuSkipBack, LuPause, LuSkipForward, LuRepeat, LuArrowRight, LuArrowLeft, LuCheck, LuClock, LuDownload } from 'react-icons/lu';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

// ── Types ───────────────────────────────────────────────────────────────

export interface ModuleDef {
    id: string;
    label: string;
    titulo: string;
}

export interface QuizQuestion {
    id: number;
    pergunta: string;
    opcoes: { label: string; valor: string }[];
    correta: string;
    explicacao: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────

export function getRandomQuestions(pool: QuizQuestion[], count: number): QuizQuestion[] {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ── Sub-components ──────────────────────────────────────────────────────

/**
 * Caixa de alerta para informações críticas.
 * MANDATÓRIO: Sempre inclua um exemplo prático com frases se houver explicação teórica.
 */
export function AlertBox({
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

export function VideoModal({ videoId, title, duration, thumbnail }: { videoId: string; title: string; duration: string; thumbnail?: string | null }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="group relative w-full max-w-2xl mx-auto cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-indigo-500/50 shadow-lg">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                        {thumbnail && <img src={thumbnail} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60" />}
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

export function ImageCarousel({ slides }: { slides: { image: string; caption: string }[] }) {
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

// ── CardCarousel ─────────────────────────────────────────────────────────
// Carrossel horizontal de cards reutilizável para dicas, regras, exceções,
// palavras perigosas, etc. Responsivo: 1 card mobile, 2 tablet, 3 desktop.

export interface CarouselCard {
    icone: React.ReactNode;
    titulo: string;
    descricao: React.ReactNode;
    exemplo?: string;
    corFundo?: string; // tailwind bg class for icon wrapper, e.g. "bg-blue-100 dark:bg-blue-900/30"
}

export function CardCarousel({
    titulo,
    subtitulo,
    numeroBadge,
    cards,
}: {
    titulo: string;
    subtitulo?: string;
    numeroBadge?: number;
    cards: CarouselCard[];
}) {
    return (
        <section className="bg-muted/5 rounded-2xl border border-border/50 p-6 md:p-8 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                    {numeroBadge !== undefined && (
                        <span className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                            {numeroBadge}
                        </span>
                    )}
                    {titulo}
                </h2>
                {subtitulo && (
                    <p className="text-muted-foreground text-sm ml-0 md:ml-[60px]">{subtitulo}</p>
                )}
            </div>

            {/* Carousel */}
            <Carousel
                className="w-full"
                opts={{ loop: true, align: 'start' }}
            >
                <CarouselContent className="-ml-4 py-4">
                    {cards.map((card, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                        >
                            <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-md h-full flex flex-col group/card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                                <div className="flex items-start gap-5 mb-6">
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-3 shadow-lg shadow-black/5",
                                            card.corFundo || "bg-primary/10"
                                        )}
                                    >
                                        {card.icone}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-foreground text-lg md:text-xl leading-tight block truncate md:whitespace-normal">{card.titulo}</h3>
                                    </div>
                                </div>
                                <div className="text-base text-muted-foreground mb-6 leading-relaxed">
                                    {card.descricao}
                                </div>
                                {card.exemplo && (
                                    <div className="mt-auto pt-6 border-t border-border/50">
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">Exemplo Prático</p>
                                        <div className="p-5 bg-muted/40 rounded-xl border border-primary/10 relative overflow-hidden">
                                            <div className="absolute left-0 top-0 w-1 h-full bg-primary/30" />
                                            <p className="text-sm italic text-foreground leading-relaxed">"{card.exemplo}"</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/40">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        {cards.length} tópicos disponíveis
                    </span>
                    <div className="flex gap-2">
                        <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors border-border/60" />
                        <CarouselNext className="static translate-y-0 h-10 w-10 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors border-border/60" />
                    </div>
                </div>
            </Carousel>
        </section>
    );
}

// ── ContentAccordion ─────────────────────────────────────────────────────
// Acordeão que ao expandir revela um carrossel horizontal de slides ricos.
// Inspirado no ModuleSection.tsx do admin-template.
// Cada slide contém JSX denso (conceito, exemplos, exceções, macetes).

export interface ContentSlide {
    titulo: string;
    icone: string;
    conteudo: React.ReactNode;
    exemplo?: string;
    corDestaque?: string;
}

/**
 * Acordeão de conteúdo interativo.
 * MANDATÓRIO: Cada slide DEVE conter um exemplo prático (Antes/Depois ou Certo/Errado) em frases.
 */
export function ContentAccordion({
    titulo,
    icone,
    corIndicador = 'bg-emerald-500',
    slides,
    defaultOpen = false,
}: {
    titulo: string;
    icone?: React.ReactNode;
    corIndicador?: string;
    slides: ContentSlide[];
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <button
                    className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-all duration-200 text-left group ${isOpen ? 'shadow-md border-primary/30' : 'shadow-sm'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        {icone && (
                            <span className={`w-8 h-8 rounded-lg ${corIndicador}/20 flex items-center justify-center text-lg shrink-0`}>
                                {icone}
                            </span>
                        )}
                        <span className="font-semibold text-base text-foreground">{titulo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                            {slides.length} {slides.length === 1 ? 'tópico' : 'tópicos'}
                        </span>
                        <LuChevronDown
                            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </div>
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 animate-in slide-in-from-top-2 duration-300">
                <div className="bg-muted/20 rounded-xl border border-border/50 p-4 md:p-6">
                    <Carousel
                        className="w-full"
                        opts={{ loop: true, align: 'start' }}
                    >
                        <CarouselContent className="-ml-4">
                            {slides.map((slide, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-4 basis-full md:basis-1/2 lg:basis-1/2"
                                >
                                    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg h-full flex flex-col space-y-6 group/slide hover:border-primary/40 transition-all duration-500">
                                        <div className="flex items-start gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0 group-hover/slide:scale-110 group-hover/slide:-rotate-3 transition-all duration-500 shadow-inner">
                                                {slide.icone}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center">
                                                    <h4 className="font-bold text-foreground text-xl md:text-2xl leading-tight tracking-tight">
                                                        {slide.titulo}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-base text-muted-foreground leading-relaxed flex-1 space-y-4 font-medium">
                                            {slide.conteudo}
                                        </div>
                                        {slide.exemplo && (
                                            <div className="pt-8 border-t border-border/50">
                                                <p className="text-[12px] uppercase tracking-[0.2em] font-black text-primary mb-3">Aplicação Real</p>
                                                <div className="p-5 bg-primary/5 rounded-xl border border-primary/20 relative overflow-hidden group-hover/slide:bg-primary/10 transition-colors">
                                                    <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
                                                    <p className="text-base italic text-foreground leading-relaxed font-semibold">"{slide.exemplo}"</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex items-center justify-end gap-2 mt-3">
                            <CarouselPrevious className="static translate-y-0 h-8 w-8" />
                            <CarouselNext className="static translate-y-0 h-8 w-8" />
                        </div>
                    </Carousel>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

export function MusicPlayer({ audioUrl, title, artist }: { audioUrl: string; title: string; artist: string }) {
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

export function ProgressIndicator() {
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

export function FlipCard({
    frente,
    verso,
    numero,
    categoria = "Português",
}: {
    frente: React.ReactNode;
    verso: React.ReactNode;
    numero?: number;
    categoria?: string;
}) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="group w-full perspective-1000 cursor-pointer h-[350px]"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full h-full duration-700 transition-all preserve-3d shadow-xl rounded-2xl`}
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* ── FRENTE ── */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-card border-2 border-border rounded-2xl p-6 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            {numero && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
                                    Questão {numero}
                                </span>
                            )}
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                <span className="text-lg">👆</span> Clique para virar
                            </span>
                        </div>
                        <div className="text-foreground text-base leading-relaxed overflow-y-auto max-h-[220px] pr-2 custom-scrollbar">
                            {frente}
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                        <span>{categoria}</span>
                        <span>Petrobras • CESGRANRIO</span>
                    </div>
                </div>

                {/* ── VERSO ── */}
                <div
                    className={`absolute inset-0 w-full h-full backface-hidden bg-indigo-900/10 border-2 border-indigo-500/30 rounded-2xl p-6 flex flex-col`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex items-center gap-2 mb-4 text-emerald-600 dark:text-emerald-400 font-bold border-b border-emerald-500/20 pb-3">
                        <LuCheck className="text-xl" />
                        <span>Resposta Comentada</span>
                    </div>

                    <div className="text-foreground text-sm leading-relaxed overflow-y-auto flex-1 pr-2 custom-scrollbar">
                        {verso}
                    </div>

                    <div className="mt-4 pt-3 border-t border-indigo-500/10 text-center">
                        <span className="text-xs text-indigo-500 font-medium">Clique para voltar à pergunta</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function QuizInterativo({
    questoes,
    titulo,
    icone,
    numero,
    onComplete,
}: {
    questoes: QuizQuestion[];
    titulo: string;
    icone: string;
    numero?: number;
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
            {numero ? (
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-400 shrink-0">
                        {numero}
                    </span>
                    {titulo}
                </h2>
            ) : (
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span>{icone}</span> {titulo}
                </h3>
            )}
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
                {questoes.map((q, index) => {
                    const respondida = verificados[q.id];
                    const acertou = respostas[q.id] === q.correta;
                    return (
                        <div key={q.id} className="border border-border/50 rounded-lg p-4 bg-muted/20">
                            <p className="text-foreground font-medium mb-3">
                                <span className="text-yellow-600 dark:text-yellow-500 mr-2">{index + 1}.</span>
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

export function TimelineItem({ passo, titulo, descricao, isLast }: { passo: number; titulo: string; descricao: string; isLast?: boolean }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg">
                    {passo}
                </div>
                {!isLast && <div className="w-0.5 h-full bg-gradient-to-b from-yellow-500/50 to-transparent mt-1" />}
            </div>
            <div className="pb-8">
                <h4 className="text-foreground font-bold">{titulo}</h4>
                <p className="text-muted-foreground text-sm mt-1">{descricao}</p>
            </div>
        </div>
    );
}

export function ComparisonSide({
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
                        <span>•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ModuleBanner({
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

// ── SummaryTabs ──────────────────────────────────────────────────────────
// Componente de Tabs para Resumo (Vídeo + Visual) para economizar altura.

export function SummaryTabs({
    titulo,
    numero,
    videoId,
    videoDuration,
    visualContent,
}: {
    titulo: string;
    numero: number;
    videoId?: string;
    videoDuration?: string;
    visualContent: React.ReactNode;
}) {
    return (
        <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-400">
                    {numero}
                </span>
                {titulo}
                <span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    2 Conteúdos
                </span>
            </h2>

            <Tabs defaultValue="video" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="video" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                        🎥 Resumo em Vídeo
                    </TabsTrigger>
                    <TabsTrigger value="visual" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                        🧠 Macete Visual
                    </TabsTrigger>
                </TabsList>

                {/* Aba de Vídeo */}
                <TabsContent value="video" className="animate-in fade-in slide-in-from-left-2 duration-300">
                    {videoId ? (
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-border bg-black">
                            {/* Placeholder real se não tiver ID, ou iframe se tiver */}
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="Resumo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="aspect-video w-full rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 flex flex-col items-center justify-center text-center p-6 gap-3">
                            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                                <LuPlay className="w-8 h-8 text-indigo-500 ml-1" />
                            </div>
                            <div>
                                <h4 className="font-bold text-indigo-900 dark:text-indigo-300">Vídeo em Produção</h4>
                                <p className="text-sm text-muted-foreground">Em breve: "Concordância Verbal: O Guia Definitivo" ({videoDuration || '10:00'})</p>
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* Aba Visual */}
                <TabsContent value="visual" className="animate-in fade-in slide-in-from-right-2 duration-300">
                    <div className="bg-card rounded-xl border border-border p-6 min-h-[300px] flex items-center justify-center">
                        {visualContent}
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}

// ── ModuleSummaryCarousel ────────────────────────────────────────────────
// Carrossel de Imagens (Placeholders Nano Banana)

export interface NanoImagePlaceholder {
    titulo: string;
    tipo: 'Infográfico' | 'Mapa Mental' | 'Diagrama' | 'Card' | 'Ilustração';
    descricaoPrompt: string; // Referência ao prompt
}

export function ModuleSummaryCarousel({
    imagens,
}: {
    imagens: NanoImagePlaceholder[];
}) {
    return (
        <section className="bg-gradient-to-br from-indigo-900/5 to-purple-900/5 rounded-2xl border border-indigo-500/20 p-8 my-8">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">📚 Resumo Visual do Módulo</h3>
                <p className="text-sm text-muted-foreground">Materiais complementares (Em breve)</p>
            </div>

            <Carousel
                className="w-full max-w-4xl mx-auto"
                opts={{ loop: true, align: 'start' }}
            >
                <CarouselContent>
                    {imagens.map((img, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                            <div className="aspect-[4/5] rounded-xl border-2 border-dashed border-muted-foreground/30 bg-card/50 flex flex-col items-center justify-center p-6 gap-4 text-center hover:border-indigo-500/50 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                                    {img.tipo === 'Infográfico' && <LuFileText className="w-6 h-6 text-muted-foreground group-hover:text-indigo-500" />}
                                    {img.tipo !== 'Infográfico' && <LuImage className="w-6 h-6 text-muted-foreground group-hover:text-indigo-500" />}
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                                        {img.tipo}
                                    </span>
                                    <h4 className="font-bold text-foreground text-sm line-clamp-2">
                                        {img.titulo}
                                    </h4>
                                </div>
                                <div className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-1 rounded max-w-full truncate">
                                    Prompt: {img.descricaoPrompt}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center gap-2 mt-4">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </Carousel>
        </section>
    );
}

// ── MusicPlayerCard (Spotify Style) ──────────────────────────────────────
// Card de áudio inline para resumo do módulo antes do quiz.

export function MusicPlayerCard({
    audioUrl,
    titulo,
    artista,
    capaUrl,
    lyrics, // New prop for lyrics
}: {
    audioUrl: string;
    titulo: string;
    artista: string;
    capaUrl?: string;
    lyrics?: string; // Optional lyrics content
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 1;
            setProgress((current / duration) * 100);
        }
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            const duration = audioRef.current.duration || 1;
            audioRef.current.currentTime = (value[0] / 100) * duration;
            setProgress(value[0]);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <section className={`w-full ${lyrics ? 'max-w-4xl' : 'max-w-md'} mx-auto my-8 animate-in zoom-in-95 duration-500`}>
            <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />

            {/* Card Container */}
            <div className="bg-gradient-to-b from-indigo-900/80 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white relative group">
                <div className={`grid ${lyrics ? 'md:grid-cols-2' : 'grid-cols-1'} gap-0`}>

                    {/* Player Section */}
                    <div className="p-6 relative z-10 flex flex-col gap-6">
                        {/* Background Glow */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 pointer-events-none" />

                        {/* Header: Capa + Info */}
                        <div className="flex items-center gap-5">
                            {/* Capa do Álbum */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shadow-lg overflow-hidden shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-500 bg-indigo-800">
                                {capaUrl ? (
                                    <img src={capaUrl} alt={titulo} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                        <LuBookOpen className="text-3xl text-white/80" />
                                    </div>
                                )}
                            </div>

                            {/* Textos */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase mb-1">Resumo Musical</p>
                                <h3 className="text-lg sm:text-xl font-bold truncate leading-tight mb-1">{titulo}</h3>
                                <p className="text-sm text-white/60 truncate">{artista}</p>
                            </div>

                            <button className="text-white/40 hover:text-green-500 transition-colors">
                                <LuHeart size={24} />
                            </button>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="space-y-2">
                            <Slider
                                value={[progress]}
                                max={100}
                                step={0.1}
                                onValueChange={handleSeek}
                                className="cursor-pointer py-2"
                            />
                            <div className="flex justify-between text-[10px] font-medium text-white/40 tracking-wide">
                                <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
                                {/* Fallback duration if metadata isn't loaded, ideally fixed by onLoadedMetadata */}
                                <span>{audioRef.current?.duration ? formatTime(audioRef.current.duration) : '--:--'}</span>
                            </div>
                        </div>

                        {/* Controles */}
                        <div className="flex items-center justify-between sm:justify-center sm:gap-6">
                            <button className="text-white/60 hover:text-white transition-colors">
                                <LuShuffle size={18} />
                            </button>
                            <button className="text-white/80 hover:text-white transition-colors">
                                <LuSkipBack size={24} className="fill-current" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-white/20"
                            >
                                {isPlaying ? (
                                    <LuPause size={28} className="fill-current" />
                                ) : (
                                    <LuPlay size={28} className="fill-current ml-1" />
                                )}
                            </button>

                            <button className="text-white/80 hover:text-white transition-colors">
                                <LuSkipForward size={24} className="fill-current" />
                            </button>
                            <button className="text-white/60 hover:text-white transition-colors">
                                <LuRepeat size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Lyrics Section */}
                    {lyrics && (
                        <div className="md:border-l border-white/10 bg-black/20 p-6 flex flex-col h-[300px] md:h-auto overflow-hidden">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-indigo-500" /> Letra da Música
                            </h4>
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-sm text-white/80 leading-relaxed font-medium space-y-4 whitespace-pre-line text-center md:text-left">
                                {lyrics}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// ── SummaryTabs (Video + Visual) ──────────────────────────────────────────
// ── LessonTabs (Generic Resource Container) ──────────────────────────────
// Fallback for React 19 Activity (Offscreen) API
// Since unstable_Activity is not exported in the current build, we use a CSS-based fallback
export const Activity = ({ mode, children }: { mode: 'visible' | 'hidden'; children: React.ReactNode }) => {
    return (
        <div style={{ display: mode === 'hidden' ? 'none' : 'contents' }}>
            {children}
        </div>
    );
};

export interface LessonTabItem {
    id: string;
    label: string;
    icon: React.ElementType;
    content: React.ReactNode;
}

export function LessonTabs({
    title,
    tabs,
    defaultTab,
    className,
}: {
    title?: string;
    tabs: LessonTabItem[];
    defaultTab?: string;
    className?: string;
}) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
        <div className={cn("w-full max-w-5xl mx-auto mb-16 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm", className)}>
            {title && (
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                        <LuBookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{title}</h3>
                        <p className="text-sm text-muted-foreground">Materiais de apoio e revisão</p>
                    </div>
                </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="flex w-full h-auto p-1 bg-muted/50 rounded-xl overflow-x-auto md:overflow-visible justify-start md:justify-center">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="flex flex-col md:flex-row items-center justify-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="text-xs md:text-sm font-medium">{tab.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {tabs.map((tab) => (
                    /* 
                       React 19 <Activity> (or unstable_Activity) keeps the component mounted 
                       but hidden, preserving state (video position, scroll, etc).
                       mode="visible" | "hidden"
                    */
                    <Activity key={tab.id} mode={activeTab === tab.id ? 'visible' : 'hidden'}>
                        <div
                            className={`min-h-[300px] flex flex-col justify-center animate-in fade-in-50 zoom-in-95 duration-300 ${activeTab !== tab.id ? 'hidden' : ''}`}
                        // 'hidden' class ensures it's visually hidden if Activity implementation 
                        // doesn't automatically apply display:none (though it usually does).
                        // Redundant for safety.
                        >
                            {tab.content}
                        </div>
                    </Activity>
                ))}
            </Tabs>
        </div>
    );
}

// ── ModuleSummaryCarousel (Nano Banana Placeholders) ──────────────────────
/**
 * Carrossel de Resumo Visual do Módulo.
 * Além das imagens, este componente oferece exportação para PDF (Cards de Estudo).
 * MANDATÓRIO: Use de 3 a 5 imagens explicativas por módulo.
 */
export function ModuleSummaryCarouselNew({
    images,
    tituloAula,
    materia,
    profissao,
    moduloNome,
}: {
    images: { title: string; type: string; placeholderColor: string; imageUrl?: string }[];
    tituloAula?: string;
    materia?: string;
    profissao?: string;
    moduloNome?: string;
}) {
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; type: string } | null>(null);

    return (
        <section className="w-full max-w-5xl mx-auto my-16 space-y-6">
            <div className="flex items-center gap-3 mb-6 px-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <LuBookOpen className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-foreground">Resumo Visual do Módulo</h3>
                    <p className="text-sm text-muted-foreground">Material de apoio visual e esquematizado</p>
                </div>
                <div className="ml-auto">
                    <Button
                        onClick={async () => {
                            const pdf = new jsPDF('p', 'mm', 'a4');
                            const margin = 20;
                            const pageWidth = pdf.internal.pageSize.getWidth();
                            const pageHeight = pdf.internal.pageSize.getHeight();



                            for (let i = 0; i < images.length; i++) {
                                const imgData = images[i];
                                if (!imgData.imageUrl) continue;

                                if (i > 0) pdf.addPage();

                                // 1. Cabeçalho Minimalista por página
                                pdf.setFillColor(248, 250, 252);
                                pdf.rect(0, 0, pageWidth, 35, 'F');

                                pdf.setFontSize(22);
                                pdf.setTextColor(15, 23, 42);
                                pdf.setFont('helvetica', 'bold');
                                pdf.text('A VAGA É MINHA', margin, 18);

                                pdf.setFontSize(10);
                                pdf.setFont('helvetica', 'normal');
                                pdf.setTextColor(100, 116, 139);
                                const metadataList = [
                                    materia && `Matéria: ${materia}`,
                                    tituloAula && `Aula: ${tituloAula}`,
                                    profissao && `Profissão: ${profissao}`,
                                    moduloNome && `Módulo: ${moduloNome}`
                                ].filter(Boolean).join('  •  ');
                                pdf.text(metadataList, margin, 27);

                                pdf.setDrawColor(226, 232, 240);
                                pdf.line(margin, 30, pageWidth - margin, 30);

                                try {
                                    const img = new Image();
                                    img.src = imgData.imageUrl;
                                    await new Promise((resolve) => {
                                        img.onload = resolve;
                                        img.onerror = resolve;
                                    });

                                    const originalWidth = img.naturalWidth || img.width;
                                    const originalHeight = img.naturalHeight || img.height;
                                    const aspectRatio = originalWidth / originalHeight;

                                    const boxWidth = pageWidth - (margin * 2);
                                    const boxHeight = pageHeight - 80;

                                    let displayWidth = boxWidth;
                                    let displayHeight = displayWidth / aspectRatio;

                                    if (displayHeight > boxHeight) {
                                        displayHeight = boxHeight;
                                        displayWidth = displayHeight * aspectRatio;
                                    }

                                    const xOffset = (pageWidth - displayWidth) / 2;
                                    const yOffset = 45 + (boxHeight - displayHeight) / 2;

                                    // Título da Imagem
                                    pdf.setFontSize(11);
                                    pdf.setTextColor(79, 70, 229);
                                    pdf.setFont('helvetica', 'bold');
                                    pdf.text(`${imgData.type.toUpperCase()}: ${imgData.title}`, pageWidth / 2, yOffset - 8, { align: 'center' });

                                    // Adicionar imagem
                                    pdf.addImage(img, 'PNG', xOffset, yOffset, displayWidth, displayHeight);

                                    // Guia de Corte
                                    pdf.setDrawColor(203, 213, 225);
                                    (pdf as any).setLineDash([1, 2], 0);
                                    const guideSize = 10;
                                    const gx = xOffset - 10;
                                    const gy = yOffset - 15;
                                    const gw = displayWidth + 20;
                                    const gh = displayHeight + 25;

                                    pdf.line(gx, gy, gx + guideSize, gy); pdf.line(gx, gy, gx, gy + guideSize);
                                    pdf.line(gx + gw, gy, gx + gw - guideSize, gy); pdf.line(gx + gw, gy, gx + gw, gy + guideSize);
                                    pdf.line(gx, gy + gh, gx + guideSize, gy + gh); pdf.line(gx, gy + gh, gx, gy + gh - guideSize);
                                    pdf.line(gx + gw, gy + gh, gx + gw - guideSize, gy + gh); pdf.line(gx + gw, gy + gh, gx + gw, gy + gh - guideSize);

                                    // Aviso Margem
                                    pdf.setFontSize(8);
                                    pdf.setTextColor(148, 163, 184);
                                    pdf.setFont('helvetica', 'italic');
                                    pdf.text('↑ Margem Segura para Encadernação / Furos (Esquerda) ↑', 8, pageHeight / 2, { angle: 90 });

                                } catch (e) {
                                    console.error('PDF error:', e);
                                }
                            }

                            const fileName = `StudyCards_${tituloAula || 'Aula'}_${moduloNome || 'Modulo'}.pdf`.replace(/\s+/g, '_');
                            pdf.save(fileName);
                        }}
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center gap-2 bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl group transition-all active:scale-95 py-2.5 px-5 shadow-sm h-auto"
                    >
                        <LuDownload className="w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
                        <span className="whitespace-nowrap">Exportar Resumo (PDF)</span>
                    </Button>
                </div>
            </div>

            {images && images.length > 0 && (
                <Carousel className="w-full group" opts={{ align: 'start', loop: true }}>
                    <CarouselContent className="-ml-4">
                        {images.map((img, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div
                                    onClick={() => img.imageUrl && setSelectedImage({ url: img.imageUrl, title: img.title, type: img.type })}
                                    className={`aspect-[3/4] rounded-xl ${img.placeholderColor} border border-border/50 flex flex-col items-center justify-center p-0 text-center shadow-sm hover:shadow-xl transition-all group/card cursor-pointer relative overflow-hidden`}
                                >

                                    {img.imageUrl ? (
                                        <div className="absolute inset-0 w-full h-full">
                                            <img
                                                src={img.imageUrl}
                                                alt={img.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-white/40 dark:bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                                            <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur flex items-center justify-center group-hover/card:scale-110 transition-transform shadow-sm z-10 border border-border/50">
                                                <LuImage className="w-8 h-8 text-foreground/60" />
                                            </div>
                                        </>
                                    )}

                                    <div className="z-10 relative mt-auto p-6 w-full text-left">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-2 inline-block",
                                            img.imageUrl ? "bg-white/20 text-white backdrop-blur-md" : "bg-background/50 text-foreground/60"
                                        )}>
                                            {img.type}
                                        </span>
                                        <h4 className={cn(
                                            "text-lg font-bold leading-tight",
                                            img.imageUrl ? "text-white" : "text-foreground/90"
                                        )}>
                                            {img.title}
                                        </h4>
                                    </div>

                                    {!img.imageUrl && (
                                        <div className="absolute bottom-4 left-0 w-full text-center z-10">
                                            <p className="text-[10px] opacity-40 uppercase tracking-wider">Placeholder</p>
                                        </div>
                                    )}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-12 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex" />
                    <CarouselNext className="-right-12 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex" />
                </Carousel>
            )}

            {/* Lightbox / Popup da Imagem */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0 overflow-hidden flex flex-col items-center justify-center">
                    {/* Botão de Fechar CTA - Posicionamento Fixo Superior Direito */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-[60] flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-95 group"
                    >
                        <span className="text-sm font-bold uppercase tracking-wider">Fechar</span>
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    </button>

                    {/* Skin Overlay Decorativa */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />

                    {selectedImage && (
                        <>
                            <DialogHeader className="absolute top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] mb-1 filter brightness-150">
                                        {selectedImage.type}
                                    </span>
                                    <DialogTitle className="text-white text-xl md:text-3xl font-bold tracking-tight">
                                        {selectedImage.title}
                                    </DialogTitle>
                                </div>
                            </DialogHeader>

                            <div className="w-full h-full flex items-center justify-center p-4 md:p-12 overflow-auto custom-scrollbar z-10 relative">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.title}
                                    className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-md animate-in zoom-in-95 duration-500 ring-1 ring-white/10"
                                />
                            </div>

                            {/* Dica no rodapé */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/5 pointer-events-none whitespace-nowrap">
                                <span className="text-[10px] font-medium text-white/40 uppercase tracking-[0.2em]">Esc para fechar</span>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}

// ── Shared Lesson Props ─────────────────────────────────────────────────

export interface AulaProps {
    onComplete: () => void;
    isCompleted: boolean;
    loading: boolean;
    xpGanho: number;
    currentProgress: number;
    onUpdateProgress: (percent: number) => Promise<void>;
}

// ── SectionTitle ─────────────────────────────────────────────────────────

export function SectionTitle({
    numero,
    titulo,
    subtitulo,
}: {
    numero: string;
    titulo: string;
    subtitulo: string;
}) {
    return (
        <div className="flex items-start gap-4 mb-8">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 select-none">
                {numero}
            </span>
            <div>
                <h2 className="text-2xl font-bold text-foreground">{titulo}</h2>
                <p className="text-muted-foreground">{subtitulo}</p>
            </div>
        </div>
    );
}

// ── TabbedContent ────────────────────────────────────────────────────────

export function TabbedContent({
    tabs,
}: {
    tabs: { id: string; label: string; content: React.ReactNode }[];
}) {
    return (
        <Tabs defaultValue={tabs[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}

// ── AulaTemplate ─────────────────────────────────────────────────────────

/**
 * Template base para as aulas.
 * Inclui controle de acessibilidade (tamanho da fonte) e estrutura padrão.
 */
export function AulaTemplate({
    children,
    titulo,
    subtitulo,
    tempoEstimado,
    materiaId,
    aulaId,
}: {
    children: React.ReactNode;
    titulo: string;
    subtitulo: string;
    tempoEstimado: string;
    materiaId: string;
    aulaId: string;
}) {
    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

    const fontSizeClasses = {
        sm: 'lesson-font-sm text-sm md:text-base',
        md: 'lesson-font-md text-base md:text-lg',
        lg: 'lesson-font-lg text-lg md:text-xl',
    };

    return (
        <div className={cn("container max-w-7xl mx-auto py-8 px-4 space-y-8 pb-32", fontSizeClasses[fontSize])}>
            {/* Header com Controles */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                        <LuClock size={14} />
                        <span>{tempoEstimado} de leitura</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
                        {titulo}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        {subtitulo}
                    </p>
                </div>

                {/* Controles de Acessibilidade */}
                <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-2xl border border-border/50 backdrop-blur shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground px-2">Fonte</span>
                    <div className="flex gap-1">
                        {(['sm', 'md', 'lg'] as const).map((size) => (
                            <button
                                key={size}
                                onClick={() => setFontSize(size)}
                                className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all active:scale-90",
                                    fontSize === size
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "bg-background/50 text-muted-foreground hover:bg-background hover:text-foreground"
                                )}
                            >
                                {size === 'sm' ? 'A-' : size === 'md' ? 'A' : 'A+'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <ProgressIndicator />

            {/* Content - O children herda o tamanho da fonte através do context/classes */}
            <main className="space-y-12">
                {children}
            </main>

            <style jsx global>{`
                .lesson-font-sm p, .lesson-font-sm li { font-size: 0.875rem; line-height: 1.5rem; }
                .lesson-font-md p, .lesson-font-md li { font-size: 1.125rem; line-height: 1.875rem; }
                .lesson-font-lg p, .lesson-font-lg li { font-size: 1.375rem; line-height: 2.25rem; }
                
                /* Ajustes para cards e outros componentes que usam classes específicas */
                .lesson-font-md .text-sm { font-size: 1rem; }
                .lesson-font-md .text-base { font-size: 1.125rem; }
                .lesson-font-lg .text-sm { font-size: 1.125rem; }
                .lesson-font-lg .text-base { font-size: 1.375rem; }
            `}</style>
        </div>
    );
}
export interface StickyModuleNavProps {
    modules: ModuleDef[];
    activeTab: string;
    completedModules: Set<string>;
    isModuleUnlocked: (index: number) => boolean;
}

export function StickyModuleNav({
    modules,
    activeTab,
    completedModules,
    isModuleUnlocked
}: StickyModuleNavProps) {
    return (
        // 🔒 CRITICAL: DO NOT CHANGE THESE STYLES. 
        // The specific combination of w-screen and negative margin is required for full-width breakout.
        // Changing this WILL break the layout and cause horizontal scrolling. verified-locked-by-user.
        <div className="sticky top-[70px] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-y border-border/50 shadow-sm py-4 mb-4 w-screen ml-[calc(50%-50vw)]">
            <div className="max-w-6xl mx-auto px-6">
                <TabsList className={`grid w-full h-auto p-2 bg-muted/30 border border-border/20 rounded-2xl gap-2 shadow-inner grid-cols-1 md:grid-cols-${modules.length}`}>
                    {modules.map((mod, index) => (
                        <TabsTrigger
                            key={mod.id}
                            value={mod.id}
                            disabled={!isModuleUnlocked(index)}
                            className="py-4 px-4 rounded-xl transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:ring-1 data-[state=active]:ring-border disabled:opacity-40 disabled:cursor-not-allowed group"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70 group-data-[state=active]:text-primary/70 font-display">
                                    {mod.label}
                                </span>
                                <span className="font-bold text-base md:text-lg flex items-center gap-2">
                                    {mod.titulo}
                                    {completedModules.has(mod.id) && (
                                        <span className="text-green-500 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5">
                                            <LuCheck size={14} />
                                        </span>
                                    )}
                                    {!isModuleUnlocked(index) && (
                                        <span className="text-muted-foreground">
                                            <LuLock size={14} />
                                        </span>
                                    )}
                                </span>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
        </div>
    );
}

