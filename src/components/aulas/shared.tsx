"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useHeaderState } from "@/contexts/HeaderStateContext";
export { FunctionGraph, type FunctionPlot } from "./shared/FunctionGraph";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LuChevronDown, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import { jsPDF } from "jspdf";
import {
  LuPlay,
  LuImage,
  LuFileText,
  LuLock,
  LuTrophy,
  LuBookOpen,
  LuVolume2,
  LuHeart,
  LuShuffle,
  LuSkipBack,
  LuPause,
  LuSkipForward,
  LuRepeat,
  LuArrowRight,
  LuArrowLeft,
  LuCheck,
  LuClock,
  LuDownload,
  LuHouse,
  LuMenu,
  LuSearch,
  LuShieldAlert,
  LuBrain,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { triggerSuccessConfetti } from "@/lib/confetti";

export interface AulaProps {
  onComplete: () => void;
  isCompleted: boolean;
  loading: boolean;
  xpGanho?: number;
  currentProgress?: number;
  onUpdateProgress?: (progress: number) => void;
  // Novos metadados para o template consolidado
  titulo: string;
  descricao: string;
  duracao: string;
  materiaNome: string;
  materiaCor: string;
  materiaId: string;
  prevTopico?: { id: string; titulo: string } | null;
  nextTopico?: { id: string; titulo: string } | null;
}

// ── Types ───────────────────────────────────────────────────────────────

export interface ModuleDef {
  id: string;
  label: string;
  titulo?: string;
  title?: string; // Alias
}

export interface QuizQuestion {
  id: string | number;
  pergunta: string | React.ReactNode;
  opcoes: { label: string; valor: string | React.ReactNode }[];
  correta: string;
  explicacao: string | React.ReactNode;
}

// ── Helpers ─────────────────────────────────────────────────────────────

export function getRandomQuestions(
  pool: QuizQuestion[],
  count: number,
): QuizQuestion[] {
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
  className,
  children,
}: {
  tipo: "info" | "warning" | "danger" | "success";
  titulo: string;
  className?: string;
  children: React.ReactNode;
}) {
  const styles: Record<string, { bg: string; border: string; icon: string }> = {
    info: { bg: "bg-blue-500/10", border: "border-blue-500", icon: "💡" },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500",
      icon: "⚠️",
    },
    danger: { bg: "bg-red-500/10", border: "border-red-500", icon: "❌" },
    success: { bg: "bg-green-500/10", border: "border-green-500", icon: "🧠" },
  };
  const s = styles[tipo];
  return (
    <div className={cn(`${s.bg} border-l-4 ${s.border} rounded-xl p-5 my-5`, className)}>
      <div className="flex gap-3 items-start">
        <span className="text-2xl">{s.icon}</span>
        <div>
          <strong className="text-foreground block mb-2 text-lg">
            {titulo}
          </strong>
          <div className="text-muted-foreground text-base leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoModal({
  videoId,
  title,
  duration,
  thumbnail,
}: {
  videoId: string;
  title: string;
  duration: string;
  thumbnail?: string | null;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative w-full max-w-2xl mx-auto cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-indigo-500/50 shadow-lg">
          <div className="aspect-video w-full overflow-hidden bg-muted">
            {thumbnail && (
              <img
                src={thumbnail}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl transition-transform group-hover:scale-110">
                <Play className="fill-current" size={24} />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-foreground text-lg truncate">
              {title}
            </h4>
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

export function ImageCarousel({
  slides,
}: {
  slides: { image: string; caption: string }[];
}) {
  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="overflow-hidden rounded-2xl bg-card border border-border shadow-lg">
                  <div className="aspect-[16/9] w-full">
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-muted/30 backdrop-blur-sm">
                    <p className="text-center text-foreground font-medium">
                      {slide.caption}
                    </p>
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
  icone?: React.ReactNode;
  icon?: React.ReactNode; // Alias
  titulo?: string;
  title?: string; // Alias
  descricao: React.ReactNode;
  exemplo?: string;
  corFundo?: string; // tailwind bg class for icon wrapper, e.g. "bg-blue-100 dark:bg-blue-900/30"
}

export function CardCarousel({
  titulo,
  subtitulo,
  numeroBadge,
  cards,
  itemsPerView = 3,
  nested = false,
}: {
  titulo?: string;
  subtitulo?: string;
  numeroBadge?: number;
  cards: CarouselCard[];
  itemsPerView?: 1 | 2 | 3;
  nested?: boolean;
}) {
  return (
    <section
      className={
        nested
          ? "space-y-4 pt-2"
          : "bg-muted/5 rounded-2xl border border-border/50 p-6 md:p-8 space-y-6"
      }
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          {numeroBadge !== undefined && (
            <span className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-3xl font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
              {numeroBadge}
            </span>
          )}
          {titulo}
        </h2>
        {subtitulo && (
          <p className="text-muted-foreground text-sm ml-0 md:ml-[60px]">
            {subtitulo}
          </p>
        )}
      </div>

      {/* Carousel */}
      <Carousel
        className="w-full px-1 pt-1"
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent className={cn("py-4", nested ? "-ml-2" : "-ml-4")}>
          {cards.map((card, index) => (
            <CarouselItem
              key={index}
              className={cn(
                nested ? "pl-2" : "pl-4",
                itemsPerView === 1
                  ? "basis-full"
                  : itemsPerView === 2
                    ? "basis-full sm:basis-1/2"
                    : "basis-full sm:basis-1/2 lg:basis-1/3",
              )}
            >
              <div
                className={cn(
                  "bg-card rounded-2xl border border-border flex flex-col group/card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full",
                  nested ? "p-4 md:p-6 shadow-sm" : "p-6 md:p-8 shadow-md",
                )}
              >
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-3 shadow-lg shadow-black/5",
                      card.corFundo || "bg-primary/10",
                    )}
                  >
                    {card.icone || card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-lg mb-1 leading-tight">
                      {card.titulo || card.title}
                    </h4>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {card.descricao}
                    </div>
                  </div>
                </div>
                {card.exemplo && (
                  <div className="mt-auto pt-6 border-t border-border/50">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">
                      Exemplo Prático
                    </p>
                    <div className="p-5 bg-muted/40 rounded-xl border border-primary/10 relative overflow-hidden">
                      <div className="absolute left-0 top-0 w-1 h-full bg-primary/30" />
                      <p className="text-sm italic text-foreground leading-relaxed">
                        "{card.exemplo}"
                      </p>
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
// Acordeão que ao expandir revela conteúdo rico com modo configurável.
//
// PADRÃO FINAL (v3):
// - mode="stacked" (recomendado): SEM carrossel, apenas conteúdo estático
// - Ícone vindo da prop `icone` do ContentAccordion (não do slide)
// - Título grande (text-xl md:text-2xl) no AccordionTrigger
// - Espaçamento reduzido entre acordeons (space-y-2 md:space-y-1.5)
// - Sem navegação de carrossel
// - Slides com apenas `conteudo` (sem `titulo` redundante)
//
// Uso:
// <ContentAccordion
//   titulo="📖 Conceituação - O que é PA?"
//   icone="🔢"
//   defaultOpen={true}
//   mode="stacked"
//   slides={[
//     {
//       conteudo: <div>Conteúdo rico aqui...</div>,
//     },
//   ]}
// />

export interface ContentSlide {
  titulo?: string;
  title?: string; // Alias
  icone?: string | React.ReactNode;
  icon?: string | React.ReactNode; // Alias
  conteudo?: React.ReactNode;
  content?: React.ReactNode; // Alias
  exemplo?: string;
  corDestaque?: string;
}

/**
 * Acordeão de conteúdo interativo.
 * PADRÃO FINAL: Use mode="stacked" para layout sem carrossel (recomendado).
 * Títulos na prop da seção, conteúdo rico (C.E.D.E.) nos slides.
 */
export function ContentAccordion({
  titulo,
  icone,
  corIndicador = "bg-emerald-500",
  slides,
  defaultOpen = false,
  slidesPerView,
  mode = "carousel",
}: {
  titulo?: string;
  icone?: React.ReactNode;
  corIndicador?: string;
  slides: ContentSlide[];
  defaultOpen?: boolean;
  slidesPerView?: 1 | 2;
  mode?: "carousel" | "stacked";
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const content =
    mode === "carousel" ? (
      <div className="w-full md:bg-muted/20 md:rounded-xl md:border md:border-border/50 md:p-6">
        <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
          <CarouselContent className="-ml-4">
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                className={`pl-4 basis-full ${slidesPerView === 1 ? "" : slides.length > 1 ? "md:basis-1/2 lg:basis-1/2" : ""}`}
              >
                <div className="bg-card rounded-2xl border border-border p-5 md:p-8 shadow-sm h-full flex flex-col space-y-5 md:space-y-6 group/slide hover:border-primary/40 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0 group-hover/slide:scale-110 group-hover/slide:-rotate-3 transition-all duration-500 shadow-inner">
                      {slide.icone || slide.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h4 className="font-bold text-foreground text-xl md:text-2xl leading-tight tracking-tight">
                          {slide.titulo || slide.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="text-base text-muted-foreground leading-relaxed flex-1 space-y-4 font-medium">
                    {slide.conteudo || slide.content}
                  </div>
                  {slide.exemplo && (
                    <div className="pt-8 border-t border-border/50">
                      <p className="text-[12px] uppercase tracking-[0.2em] font-black text-primary mb-3">
                        Aplicação Real
                      </p>
                      <div className="p-5 bg-primary/5 rounded-xl border border-primary/20 relative overflow-hidden group-hover/slide:bg-primary/10 transition-colors">
                        <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
                        <p className="text-base italic text-foreground leading-relaxed font-semibold">
                          "{slide.exemplo}"
                        </p>
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
              {slides.length} tópicos disponíveis
            </span>
            <div className="flex gap-2">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors border-border/60" />
              <CarouselNext className="static translate-y-0 h-10 w-10 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors border-border/60" />
            </div>
          </div>
        </Carousel>
      </div>
    ) : (
      <div className="w-full md:bg-muted/20 md:rounded-xl md:border md:border-border/50 md:p-6">
        <Accordion type="single" collapsible className="space-y-2 md:space-y-1.5">
          {slides.map((slide, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none shadow-none"
            >
              <AccordionTrigger className="w-full flex items-center justify-between gap-3 px-5 py-3 rounded-xl border border-border bg-card hover:bg-muted/40 transition-all duration-200 text-left hover:no-underline shadow-sm group [&[data-state=open]]:bg-primary/5 [&[data-state=open]]:border-primary/20 [&[data-state=open]]:rounded-b-none">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {icone || slide.icone}
                  </span>
                  <span className="font-bold text-xl md:text-2xl text-foreground">
                    {titulo || slide.titulo}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0 border border-t-0 border-border rounded-b-xl overflow-hidden animate-in slide-in-from-top-2">
                <div className="p-4 md:p-8 space-y-6 bg-card flex flex-col group/slide transition-all duration-500">
                  <div className="text-base text-muted-foreground leading-relaxed flex-1 space-y-4 font-medium">
                    {slide.conteudo}
                  </div>
                  {slide.exemplo && (
                    <div className="pt-8 border-t border-border/50">
                      <p className="text-[12px] uppercase tracking-[0.2em] font-black text-primary mb-3">
                        Aplicação Real
                      </p>
                      <div className="p-5 bg-primary/5 rounded-xl border border-primary/20 relative overflow-hidden group-hover/slide:bg-primary/10 transition-colors">
                        <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
                        <p className="text-base italic text-foreground leading-relaxed font-semibold">
                          "{slide.exemplo}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );

  if (mode === "stacked") {
    return content;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl border border-border bg-card hover:bg-muted/40 transition-all duration-200 text-left group ${
            isOpen ? "shadow-md border-primary/30" : "shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3">
            {icone && (
              <span
                className={`w-8 h-8 rounded-lg ${corIndicador}/20 flex items-center justify-center text-lg shrink-0`}
              >
                {icone}
              </span>
            )}
            <span className="font-semibold text-base text-foreground">
              {titulo}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {slides.length} {slides.length === 1 ? "tópico" : "tópicos"}
            </span>
            <LuChevronDown
              className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 animate-in slide-in-from-top-2 duration-300">
        {content}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function MusicPlayer({
  audioUrl,
  title,
  artist,
}: {
  audioUrl: string;
  title: string;
  artist: string;
}) {
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
          <div
            className={`w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg transition-all ${isPlaying ? "scale-105 shadow-indigo-500/20" : ""}`}
          >
            <LuBookOpen className="text-white" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-foreground font-bold text-sm truncate">
              {title}
            </h5>
            <p className="text-muted-foreground text-xs truncate">{artist}</p>
          </div>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <LuPause size={20} />
            ) : (
              <LuPlay size={20} className="ml-1" />
            )}
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

export function ProgressIndicator({ percent }: { percent?: number }) {
  const [progress, setProgress] = useState(0);
  const prevProgressRef = useRef(0);

  useEffect(() => {
    const prev = prevProgressRef.current;
    // Dispara evento quando cruza 50% em qualquer direção
    if (prev < 50 && progress >= 50) {
      window.dispatchEvent(
        new CustomEvent("scroll-to-top-side", { detail: { side: "left" } }),
      );
    } else if (prev >= 50 && progress < 50) {
      window.dispatchEvent(
        new CustomEvent("scroll-to-top-side", { detail: { side: "right" } }),
      );
    }
    prevProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (percent !== undefined) {
      setProgress(percent);
      return;
    }

    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 50) {
        setProgress(0);
        return;
      }
      const p = (scroll / height) * 100;
      setProgress(Math.min(100, Math.max(0, p)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateProgress();
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      resizeObserver.disconnect();
    };
  }, [percent]);

  return (
    <AnimatePresence>
      {progress > 0 && (
        <motion.div
          id="progress-indicator-container"
          key="progress-indicator"
          className="fixed bottom-[64px] md:bottom-10 left-0 right-0 flex justify-center z-[45] md:z-[110] px-6 pl-[var(--sidebar-width)] transition-[padding] duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="w-full max-w-4xl bg-background/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-2xl border border-border/60 dark:border-border/50 p-2 rounded-full pointer-events-auto flex items-center gap-3 relative group">
            {/* Tooltip Dinâmico (Framer Motion) */}
            <motion.div
              className="absolute -top-10 bg-primary text-primary-foreground px-3 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-primary/20 flex flex-col items-center"
              initial={false}
              animate={{ left: `${progress}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ x: "-50%" }}
            >
              <span className="whitespace-nowrap">{Math.round(progress)}%</span>
              {/* Seta do Tooltip */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
            </motion.div>

            <div className="flex-1 h-3 bg-muted/50 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] w-full"
                initial={false}
                animate={{ scaleX: progress / 100 }}
                style={{ originX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FlipCard({
  frente,
  verso,
  numero,
  categoria = "Língua Portuguesa",
  hideFooter = false,
  variant,
}: {
  frente: React.ReactNode;
  verso: React.ReactNode;
  numero?: number;
  categoria?: string;
  hideFooter?: boolean;
  variant?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group w-full h-[350px] [perspective:1200px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── FRENTE ── */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full [backface-visibility:hidden]",
            "bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800",
            "rounded-3xl p-6 flex flex-col justify-between overflow-hidden",
            "group-hover:border-primary/50 transition-colors duration-300 shadow-xl",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity",
          )}
        >
          {/* Badge de Topo */}
          <div className="relative z-10 flex justify-between items-start">
            {numero ? (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                Ponto de Controle #{numero}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest border border-border/50">
                Conceito Chave
              </span>
            )}
            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:rotate-12 transition-transform">
              <LuSearch className="text-primary" />
            </div>
          </div>

          {/* Conteúdo Central */}
          <div className="relative z-10 flex-1 flex flex-col justify-center py-6">
            <div className="text-lg md:text-xl font-bold text-zinc-800 dark:text-zinc-100 leading-tight">
              {frente}
            </div>
            <div className="mt-4 flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-xs italic">
              <span className="w-4 h-px bg-current opacity-30" />
              Clique para revelar o dossiê
            </div>
          </div>

          {/* Rodapé Tático */}
          {!hideFooter && (
            <div className="relative z-10 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50 flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
              <span className="truncate pr-2">{categoria}</span>
              <span className="shrink-0 flex items-center gap-1 text-primary">
                <LuShieldAlert className="w-3 h-3" />
                Dossiê Técnico
              </span>
            </div>
          )}
        </div>

        {/* ── VERSO ── */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]",
            "bg-white dark:bg-[#0a0a0a] border-2 border-primary/30",
            "rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl",
            "backdrop-blur-xl",
            "before:absolute before:inset-0 before:bg-primary/5 before:opacity-10 before:dark:opacity-50",
            variant === "dark" && "bg-zinc-950 text-white border-zinc-800",
          )}
        >
          <div
            className={cn(
              "relative z-10 flex items-center gap-3 mb-5 font-black border-b pb-3 shrink-0 uppercase tracking-tighter text-sm",
              variant === "dark"
                ? "text-white border-white/10"
                : "text-primary border-primary/20",
            )}
          >
            <div
              className={cn(
                "p-1.5 rounded",
                variant === "dark" ? "bg-white/10" : "bg-primary/10",
              )}
            >
              <LuCheck className="text-xl" />
            </div>
            <span>Explicação de Elite</span>
          </div>

          <div
            className={cn(
              "relative z-10 text-sm leading-relaxed overflow-y-auto flex-1 pr-1 custom-scrollbar text-justify font-medium",
              variant === "dark"
                ? "text-zinc-300"
                : "text-zinc-700 dark:text-zinc-300",
            )}
          >
            {verso}
          </div>

          <div
            className={cn(
              "relative z-10 mt-4 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest",
              variant === "dark" ? "text-white/40" : "text-primary/60",
            )}
          >
            <span>© Petrobras Quest System</span>
            <span>Ref: 2026-B.P.O</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * UI/UX IMPERATIVO:
 * Todo componente de Quiz DEVE seguir a notação: [BADGE NUMERADO] QUIZ: [Título-do-Módulo]
 * Este componente já automatiza essa formatação globalmente.
 */
export function QuizInterativo({
  questoes,
  titulo,
  icone,
  numero,
  variant = "indigo",
  onComplete,
  descricao = "Teste seus conhecimentos para consolidar o aprendizado.",
}: {
  questoes: QuizQuestion[];
  titulo: string;
  icone?: string;
  numero?: number;
  variant?:
    | "indigo"
    | "violet"
    | "emerald"
    | "amber"
    | "rose"
    | "blue"
    | "cyan"
    | "slate";
  onComplete?: (score: number) => void;
  descricao?: string;
}) {
  const [respostas, setRespostas] = useState<Record<string | number, string>>({});
  const [verificados, setVerificados] = useState<Record<string | number, boolean>>(
    {},
  );
  const [completed, setCompleted] = useState(false);

  // 📝 IMPERATIVO: Padronização de Títulos de QUIZ
  // Todo Quiz deve seguir a notação: QUIZ: [Título-do-Módulo]
  // O prefixo 'Quiz de Fixação:' ou similares deve ser removido.
  const cleanTitle = titulo
    .replace(/^Quiz\s*(de\s*Fixação)?\s*[:\-]?\s*/i, "")
    .replace(/^Simulado\s*(Final)?\s*[:\-]?\s*/i, "");

  const displayTitle = `QUIZ: ${cleanTitle}`;

  const selecionar = (qId: string | number, label: string) => {
    if (verificados[qId]) return;
    setRespostas((prev) => ({ ...prev, [qId]: label }));
  };

  const verificar = (qId: string | number) => {
    setVerificados((prev) => ({ ...prev, [qId]: true }));
  };

  const totalCertas = questoes.filter(
    (q) => verificados[q.id] && respostas[q.id] === q.correta,
  ).length;
  const totalVerificadas = Object.keys(verificados).length;

  useEffect(() => {
    if (totalVerificadas === questoes.length && !completed) {
      const acertos = questoes.filter(
        (q) => verificados[q.id] && respostas[q.id] === q.correta,
      ).length;
      const aproveitamento = (acertos / questoes.length) * 100;
      if (aproveitamento >= 60) {
        setCompleted(true);
        triggerSuccessConfetti();
        if (onComplete) onComplete(Math.round(aproveitamento));
      }
    }
  }, [
    totalVerificadas,
    questoes,
    verificados,
    respostas,
    completed,
    onComplete,
  ]);

  return (
    <div className="bg-card rounded-xl border border-border p-6 my-8 shadow-lg">
      {numero !== undefined && numero !== 0 ? (
        <ModuleSectionHeader
          index={numero}
          title={displayTitle}
          description={descricao}
          variant={variant}
          className="mb-8"
        />
      ) : (
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span>{icone}</span> {displayTitle}
        </h3>
      )}
      {totalVerificadas > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
            <span>
              Progresso: {totalVerificadas}/{questoes.length}
            </span>
            <span>|</span>
            <span className="text-green-500">✅ {totalCertas} certas</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-green-500 transition-all duration-500"
              style={{
                width: `${(totalVerificadas / questoes.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="space-y-6 mt-4">
        {questoes.map((q, index) => {
          const respondida = verificados[q.id];
          const acertou = respostas[q.id] === q.correta;
          return (
            <div
              key={q.id}
              className="border border-border/50 rounded-lg p-4 bg-muted/20"
            >
              <p className="text-foreground font-medium mb-3">
                <span className="text-yellow-600 dark:text-yellow-500 mr-2">
                  {index + 1}.
                </span>
                {q.pergunta}
              </p>
              <div className="space-y-2">
                {q.opcoes.map((op) => {
                  const selecionada = respostas[q.id] === op.label;
                  let borderColor = "border-border hover:border-indigo-500";
                  if (respondida) {
                    if (op.label === q.correta)
                      borderColor = "border-green-500 bg-green-500/10";
                    else if (selecionada)
                      borderColor = "border-red-500 bg-red-500/10";
                    else borderColor = "border-border opacity-50";
                  } else if (selecionada) {
                    borderColor = "border-indigo-500 bg-indigo-500/10";
                  }
                  return (
                    <button
                      key={op.label}
                      onClick={() => selecionar(q.id, op.label)}
                      disabled={respondida}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 ${borderColor} text-foreground text-sm transition-all duration-200`}
                    >
                      <span className="font-bold mr-2">{op.label})</span>{" "}
                      {op.valor}
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
                <div
                  className={`mt-3 p-3 rounded-lg text-sm ${acertou ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"}`}
                >
                  <span className="font-bold">
                    {acertou ? "🎉 Correto!" : "❌ Incorreto."}
                  </span>{" "}
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
              ? "🏆 Perfeito!"
              : totalCertas >= questoes.length / 2
                ? "👏 Bom trabalho!"
                : "📚 Continue estudando!"}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Você acertou {totalCertas} de {questoes.length} questões
          </p>
        </div>
      )}
    </div>
  );
}

export function TimelineItem({
  passo,
  titulo,
  descricao,
  isLast,
}: {
  passo: number;
  titulo: string;
  descricao: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg">
          {passo}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-yellow-500/50 to-transparent mt-1" />
        )}
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
  tipo: "correct" | "incorrect";
  titulo: string;
  items: string[];
}) {
  const isCorrect = tipo === "correct";
  return (
    <div
      className={`flex-1 rounded-xl p-5 border ${
        isCorrect
          ? "bg-green-500/5 border-green-500/30"
          : "bg-red-500/5 border-red-500/30"
      }`}
    >
      <div
        className={`font-bold mb-3 ${isCorrect ? "text-green-500" : "text-red-500"}`}
      >
        {isCorrect ? "✅" : "❌"} {titulo}
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

export function Comparison({
  title,
  left,
  right,
}: {
  title: string;
  left: {
    title: string;
    content: string;
    description: string;
    variant: "success" | "danger" | "info" | "warning";
  };
  right: {
    title: string;
    content: string;
    description: string;
    variant: "success" | "danger" | "info" | "warning";
  };
}) {
  const getColors = (variant: string) => {
    switch (variant) {
      case "success":
        return "bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-400";
      case "danger":
        return "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400";
      case "warning":
        return "bg-yellow-500/5 border-yellow-500/20 text-yellow-600 dark:text-yellow-400";
      case "info":
        return "bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400";
      default:
        return "bg-muted/50 border-border";
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
        {title}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[left, right].map((side, i) => (
          <div
            key={i}
            className={cn(
              "p-5 rounded-2xl border flex flex-col gap-3 h-full",
              getColors(side.variant),
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm uppercase tracking-wide">
                {side.title}
              </span>
              <div
                className={cn(
                  "p-1 rounded-full",
                  side.variant === "success"
                    ? "bg-green-500/10"
                    : side.variant === "danger"
                      ? "bg-red-500/10"
                      : "bg-primary/10",
                )}
              >
                {side.variant === "success" ? (
                  <LuCheck className="w-4 h-4" />
                ) : side.variant === "danger" ? (
                  <LuShieldAlert className="w-4 h-4" />
                ) : (
                  <LuInfo className="w-4 h-4" />
                )}
              </div>
            </div>
            <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-current/10 flex-1">
              <p className="text-foreground font-medium italic">
                "{side.content}"
              </p>
            </div>
            <p className="text-xs opacity-80 leading-relaxed italic mt-1">
              {side.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LuInfo(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// ── Module Skin Colors ──────────────────────────────────────────────────
// Sistema de cores padrão para os módulos. Cada posição de módulo (1-5)
// tem uma cor fixa que deve ser usada por TODOS os cards daquele módulo.
// Usar: MODULE_SKIN_COLORS[moduleIndex] para obter variant e gradiente.
export const MODULE_SKIN_COLORS = [
  {
    variant: "indigo" as const,
    gradiente: "bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700",
  },
  {
    variant: "emerald" as const,
    gradiente: "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700",
  },
  {
    variant: "violet" as const,
    gradiente: "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700",
  },
  {
    variant: "amber" as const,
    gradiente: "bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700",
  },
  {
    variant: "rose" as const,
    gradiente: "bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700",
  },
  {
    variant: "cyan" as const,
    gradiente: "bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700",
  },
  {
    variant: "blue" as const,
    gradiente: "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700",
  },
];

export type ModuleSkinVariant = (typeof MODULE_SKIN_COLORS)[number]["variant"];

export function ModuleBanner({
  numero,
  titulo,
  descricao,
  gradiente,
  variant = "indigo",
}: {
  numero: number;
  titulo: string;
  descricao: string;
  gradiente?: string;
  variant?: ModuleSkinVariant;
}) {
  const finalGradient =
    gradiente ||
    MODULE_SKIN_COLORS.find((c) => c.variant === variant)?.gradiente ||
    MODULE_SKIN_COLORS[0].gradiente;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${finalGradient} p-5 md:p-14 text-white text-center shadow-xl`}
    >
      {/* Decorative elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      <div className="relative z-10">
        <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] font-bold bg-white/20 px-3 md:px-4 py-1.5 rounded-full mb-3 md:mb-4">
          Módulo {numero}
        </span>
        <h2 className="text-xl md:text-4xl font-extrabold mt-2 leading-tight">
          {titulo}
        </h2>
        <p className="text-white/80 mt-3 md:mt-4 max-w-4xl mx-auto text-sm md:text-lg leading-relaxed font-medium">
          {descricao}
        </p>
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
  variant = "violet", // Default to violet as per Concordância Resumo
}: {
  titulo: string;
  numero: number;
  videoId?: string;
  videoDuration?: string;
  visualContent: React.ReactNode;
  variant?: "indigo" | "violet" | "emerald" | "amber" | "rose";
}) {
  const variantClasses = {
    indigo: {
      badge:
        "bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
      tabActive: "data-[state=active]:bg-indigo-500",
      emptyBorder: "border-indigo-300",
      emptyBg: "bg-indigo-50/50",
      iconBg: "bg-indigo-100",
      iconText: "text-indigo-500",
    },
    violet: {
      badge:
        "bg-violet-500/20 text-violet-700 dark:text-violet-400 border-violet-500/20",
      tabActive: "data-[state=active]:bg-violet-500",
      emptyBorder: "border-violet-300",
      emptyBg: "bg-violet-50/50",
      iconBg: "bg-violet-100",
      iconText: "text-violet-500",
    },
    emerald: {
      badge:
        "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
      tabActive: "data-[state=active]:bg-emerald-500",
      emptyBorder: "border-emerald-300",
      emptyBg: "bg-emerald-50/50",
      iconBg: "bg-emerald-100",
      iconText: "text-emerald-500",
    },
    amber: {
      badge:
        "bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/20",
      tabActive: "data-[state=active]:bg-amber-500",
      emptyBorder: "border-amber-300",
      emptyBg: "bg-amber-50/50",
      iconBg: "bg-amber-100",
      iconText: "text-amber-500",
    },
    rose: {
      badge:
        "bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/20",
      tabActive: "data-[state=active]:bg-rose-500",
      emptyBorder: "border-rose-300",
      emptyBg: "bg-rose-50/50",
      iconBg: "bg-rose-100",
      iconText: "text-rose-500",
    },
  }[variant];
  return (
    <section className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span
          className={`w-14 h-14 rounded-full ${variantClasses.badge} flex items-center justify-center text-3xl font-bold shrink-0 border shadow-inner`}
        >
          {numero}
        </span>
        {titulo}
        <span className="ml-auto text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
          2 Conteúdos
        </span>
      </h2>

      <Tabs defaultValue="video" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger
            value="video"
            className={`data-[state=active]:bg-indigo-500 data-[state=active]:text-white`}
          >
            🎥 Resumo em Vídeo
          </TabsTrigger>
          <TabsTrigger
            value="visual"
            className={`data-[state=active]:bg-violet-500 data-[state=active]:text-white`}
          >
            🧠 Macete Visual
          </TabsTrigger>
        </TabsList>

        {/* Aba de Vídeo */}
        <TabsContent
          value="video"
          className="animate-in fade-in slide-in-from-left-2 duration-300"
        >
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
            <div
              className={`aspect-video w-full rounded-xl border border-dashed ${variantClasses.emptyBorder} ${variantClasses.emptyBg} flex flex-col items-center justify-center text-center p-6 gap-3`}
            >
              <div
                className={`w-16 h-16 rounded-full ${variantClasses.iconBg} flex items-center justify-center`}
              >
                <LuPlay className={`w-8 h-8 ${variantClasses.iconText} ml-1`} />
              </div>
              <div>
                <h4
                  className={`font-bold ${variantClasses.iconText} dark:text-opacity-80`}
                >
                  Vídeo em Produção
                </h4>
                <p className="text-sm text-muted-foreground">
                  Em breve: "{titulo}: O Guia Definitivo" (
                  {videoDuration || "10:00"})
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Aba Visual */}
        <TabsContent
          value="visual"
          className="animate-in fade-in slide-in-from-right-2 duration-300"
        >
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
  tipo: "Infográfico" | "Mapa Mental" | "Diagrama" | "Card" | "Ilustração";
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
        <h3 className="text-xl font-bold text-foreground mb-2">
          📚 Resumo Visual do Módulo
        </h3>
        <p className="text-sm text-muted-foreground">
          Materiais complementares (Em breve)
        </p>
      </div>

      <Carousel
        className="w-full max-w-4xl mx-auto"
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContent>
          {imagens.map((img, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 pl-4"
            >
              <div className="aspect-[4/5] rounded-xl border-2 border-dashed border-muted-foreground/30 bg-card/50 flex flex-col items-center justify-center p-6 gap-4 text-center hover:border-indigo-500/50 transition-colors group">
                <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                  {img.tipo === "Infográfico" && (
                    <LuFileText className="w-6 h-6 text-muted-foreground group-hover:text-indigo-500" />
                  )}
                  {img.tipo !== "Infográfico" && (
                    <LuImage className="w-6 h-6 text-muted-foreground group-hover:text-indigo-500" />
                  )}
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
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section
      className={`w-full ${lyrics ? "max-w-4xl" : "max-w-md"} mx-auto my-8 animate-in zoom-in-95 duration-500`}
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Card Container */}
      <div className="bg-gradient-to-b from-indigo-900/80 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl text-white relative group">
        <div
          className={`grid ${lyrics ? "md:grid-cols-2" : "grid-cols-1"} gap-0`}
        >
          {/* Player Section */}
          <div className="p-6 relative z-10 flex flex-col gap-6">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500/20 blur-3xl rounded-full -translate-y-1/2 pointer-events-none" />

            {/* Header: Capa + Info */}
            <div className="flex items-center gap-5">
              {/* Capa do Álbum */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shadow-lg overflow-hidden shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-500 bg-indigo-800">
                {capaUrl ? (
                  <img
                    src={capaUrl}
                    alt={titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <LuBookOpen className="text-3xl text-white/80" />
                  </div>
                )}
              </div>

              {/* Textos */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase mb-1">
                  Resumo Musical
                </p>
                <h3 className="text-lg sm:text-xl font-bold truncate leading-tight mb-1">
                  {titulo}
                </h3>
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
                <span>
                  {audioRef.current
                    ? formatTime(audioRef.current.currentTime)
                    : "0:00"}
                </span>
                {/* Fallback duration if metadata isn't loaded, ideally fixed by onLoadedMetadata */}
                <span>
                  {audioRef.current?.duration
                    ? formatTime(audioRef.current.duration)
                    : "--:--"}
                </span>
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
                <span className="w-1 h-1 rounded-full bg-indigo-500" /> Letra da
                Música
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
export const Activity = ({
  mode,
  children,
}: {
  mode: "visible" | "hidden";
  children: React.ReactNode;
}) => {
  return (
    <div style={{ display: mode === "hidden" ? "none" : "contents" }}>
      {children}
    </div>
  );
};

export interface LessonTabItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  icone?: React.ElementType; // Alias
  content?: React.ReactNode;
  conteudo?: React.ReactNode; // Alias
}

export function LessonTabs({
  title,
  tabs,
  defaultTab,
  className,
  variant = "indigo",
}: {
  title?: string;
  tabs: LessonTabItem[];
  defaultTab?: string;
  className?: string;
  variant?:
    | "indigo"
    | "violet"
    | "emerald"
    | "amber"
    | "rose"
    | "blue"
    | "cyan"
    | "slate";
}) {
  const variantClasses: Record<string, string> = {
    indigo:
      "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    violet:
      "bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400",
    emerald:
      "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    amber:
      "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
    rose: "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400",
  };
  const selectedClass = variant
    ? variantClasses[variant]
    : variantClasses.indigo;
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto mb-16 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm",
        className,
      )}
    >
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg border ${selectedClass}`}>
            <LuBookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">
              Materiais de apoio e revisão
            </p>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="flex w-full h-auto p-1 bg-muted/50 rounded-xl overflow-x-auto md:overflow-visible justify-start md:justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon || tab.icone || LuBookOpen;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm group/tab"
                >
                  <Icon className="w-4 h-4 transition-transform group-hover/tab:scale-110" />
                  <span className="font-semibold text-sm">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          /* 
                       React 19 <Activity> (or unstable_Activity) keeps the component mounted 
                       but hidden, preserving state (video position, scroll, etc).
                       mode="visible" | "hidden"
                    */
          <Activity
            key={tab.id}
            mode={activeTab === tab.id ? "visible" : "hidden"}
          >
            <div
              className={`min-h-[300px] flex flex-col justify-center animate-in fade-in-50 zoom-in-95 duration-300 ${activeTab !== tab.id ? "hidden" : ""}`}
              // 'hidden' class ensures it's visually hidden if Activity implementation
              // doesn't automatically apply display:none (though it usually does).
              // Redundant for safety.
            >
              {tab.content || tab.conteudo}
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
  images: {
    title: string;
    type: string;
    placeholderColor: string;
    imageUrl?: string;
  }[];
  tituloAula?: string;
  materia?: string;
  profissao?: string;
  moduloNome?: string;
}) {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    type: string;
  } | null>(null);

  const handleExportPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < images.length; i++) {
      const imgData = images[i];
      if (!imgData.imageUrl) continue;

      if (i > 0) pdf.addPage();

      // 1. Cabeçalho Minimalista por página
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, 0, pageWidth, 35, "F");

      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42);
      pdf.setFont("helvetica", "bold");
      pdf.text("A VAGA EH MINHA", margin, 18);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      const metadataList = [
        materia && `Matéria: ${materia}`,
        tituloAula && `Aula: ${tituloAula}`,
        profissao && `Profissão: ${profissao}`,
        moduloNome && `Módulo: ${moduloNome}`,
      ]
        .filter(Boolean)
        .join("  •  ");
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

        const boxWidth = pageWidth - margin * 2;
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
        pdf.setFont("helvetica", "bold");
        pdf.text(
          `${imgData.type.toUpperCase()}: ${imgData.title}`,
          pageWidth / 2,
          yOffset - 8,
          { align: "center" },
        );

        // Adicionar imagem
        pdf.addImage(img, "PNG", xOffset, yOffset, displayWidth, displayHeight);

        // Guia de Corte
        pdf.setDrawColor(203, 213, 225);
        (pdf as any).setLineDash([1, 2], 0);
        const guideSize = 10;
        const gx = xOffset - 10;
        const gy = yOffset - 15;
        const gw = displayWidth + 20;
        const gh = displayHeight + 25;

        pdf.line(gx, gy, gx + guideSize, gy);
        pdf.line(gx, gy, gx, gy + guideSize);
        pdf.line(gx + gw, gy, gx + gw - guideSize, gy);
        pdf.line(gx + gw, gy, gx + gw, gy + guideSize);
        pdf.line(gx, gy + gh, gx + guideSize, gy + gh);
        pdf.line(gx, gy + gh, gx, gy + gh - guideSize);
        pdf.line(gx + gw, gy + gh, gx + gw - guideSize, gy + gh);
        pdf.line(gx + gw, gy + gh, gx + gw, gy + gh - guideSize);

        // Aviso Margem
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.setFont("helvetica", "italic");
        pdf.text(
          "↑ Margem Segura para Encadernação / Furos (Esquerda) ↑",
          8,
          pageHeight / 2,
          { angle: 90 },
        );
      } catch (e) {
        console.error("PDF error:", e);
      }
    }

    const fileName =
      `StudyCards_${tituloAula || "Aula"}_${moduloNome || "Modulo"}.pdf`.replace(
        /\s+/g,
        "_",
      );
    pdf.save(fileName);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-16 space-y-6">
      <div className="flex items-center gap-3 mb-6 px-4">
        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <LuBookOpen className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Resumo Visual do Módulo
          </h3>
          <p className="text-sm text-muted-foreground">
            Material de apoio visual e esquematizado
          </p>
        </div>
      </div>

      {images && images.length > 0 && (
        <Carousel
          className="w-full group"
          opts={{ align: "start", loop: true, watchDrag: true }}
        >
          <CarouselContent className="-ml-4">
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div
                  onClick={() =>
                    img.imageUrl &&
                    setSelectedImage({
                      url: img.imageUrl,
                      title: img.title,
                      type: img.type,
                    })
                  }
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
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-2 inline-block",
                        img.imageUrl
                          ? "bg-white/20 text-white backdrop-blur-md"
                          : "bg-background/50 text-foreground/60",
                      )}
                    >
                      {img.type}
                    </span>
                    <h4
                      className={cn(
                        "text-lg font-bold leading-tight",
                        img.imageUrl ? "text-white" : "text-foreground/90",
                      )}
                    >
                      {img.title}
                    </h4>
                  </div>

                  {!img.imageUrl && (
                    <div className="absolute bottom-4 left-0 w-full text-center z-10">
                      <p className="text-[10px] opacity-40 uppercase tracking-wider">
                        Placeholder
                      </p>
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

      {/* Botão exportar PDF — centralizado abaixo das imagens */}
      <div className="flex justify-center px-4">
        <Button
          onClick={handleExportPDF}
          variant="outline"
          size="sm"
          className="flex items-center justify-center gap-2 bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl group transition-all active:scale-95 py-2.5 px-5 shadow-sm h-auto"
        >
          <LuDownload className="w-4 h-4 group-hover:translate-y-0.5 transition-transform shrink-0" />
          <span className="whitespace-nowrap">Exportar Resumo (PDF)</span>
        </Button>
      </div>

      {/* Lightbox / Popup da Imagem */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-0 overflow-hidden flex flex-col items-center justify-center">
          {/* Botão de Fechar CTA - Posicionamento Fixo Superior Direito */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-[60] flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/20 transition-all active:scale-95 group"
          >
            <span className="text-sm font-bold uppercase tracking-wider">
              Fechar
            </span>
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
                <span className="text-[10px] font-medium text-white/40 uppercase tracking-[0.2em]">
                  Esc para fechar
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
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
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
    conteudo?: React.ReactNode;
  }[];
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
        <TabsContent
          key={tab.id}
          value={tab.id}
          className="mt-0 focus-visible:outline-none"
        >
          {tab.content || tab.conteudo}
        </TabsContent>
      ))}
    </Tabs>
  );
}

// ── AulaTemplate ─────────────────────────────────────────────────────────

/**
 * Componente de Layout padronizado para todas as aulas.
 * Garante um gap fixo de 50px entre os blocos do cabeçalho:
 * NavHeader -> TitleSection -> TabsNav -> Content (Banner)
 */
export function AulaTemplate({
  activeTab,
  setActiveTab,
  modules,
  completedModules,
  isModuleUnlocked = () => true,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  isCompleted,
  prevTopico,
  nextTopico,
  currentProgress,
  onComplete,
  loading,
  xpGanho = 50,
  children,
}: {
  activeTab: string;
  setActiveTab: (val: string) => void;
  modules: readonly ModuleDef[];
  completedModules: Set<string>;
  isModuleUnlocked?: (index: number) => boolean;
  titulo: string;
  descricao: string;
  duracao: string;
  materiaNome: string;
  materiaCor: string;
  materiaId: string;
  isCompleted: boolean;
  prevTopico?: { id: string; titulo: string } | null;
  nextTopico?: { id: string; titulo: string } | null;
  currentProgress?: number;
  onComplete?: () => void;
  loading?: boolean;
  xpGanho?: number;
  children: React.ReactNode;
}) {
  const NavHeader = () => (
    <div className="bg-card/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl p-3 border border-border dark:border-slate-700/50 shadow-sm">
      <div className="grid grid-cols-[1fr,auto] md:flex md:items-center justify-between gap-3 w-full">
        {/* Coluna 1: Breadcrumb / Matéria */}
        <div className="flex items-center text-sm min-w-0">
          <Link
            href={`/aulas/${materiaId}`}
            className="px-3 py-2 rounded-lg bg-secondary/80 dark:bg-slate-700 text-secondary-foreground dark:text-slate-200 hover:bg-secondary transition flex items-center gap-2 font-medium border border-border/50 shrink-0 text-left leading-tight"
          >
            <span className="text-lg leading-none shrink-0">←</span>
            <span className="flex flex-col md:flex-row md:gap-1">
              {materiaNome.includes(" ") ? (
                <>
                  <span>{materiaNome.split(" ")[0]}</span>
                  <span className="md:inline">
                    {materiaNome.split(" ").slice(1).join(" ")}
                  </span>
                </>
              ) : (
                <span>{materiaNome}</span>
              )}
            </span>
          </Link>
          <span className="hidden md:inline text-muted-foreground/40 font-light text-xl mx-3">
            /
          </span>
          <span className="hidden md:inline text-foreground font-semibold truncate max-w-none">
            {titulo}
          </span>
        </div>

        {/* Coluna 2: Botões de Navegação (Empilhados no mobile) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 shrink-0">
          {prevTopico && (
            <Link
              href={`/aulas/${materiaId}/${prevTopico.id}`}
              className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-bold flex items-center justify-center gap-2 shadow-sm border border-border/50 text-[10px] md:text-xs min-w-[80px]"
              title={prevTopico.titulo}
            >
              <span className="text-lg leading-none shrink-0">←</span>
              Anterior
            </Link>
          )}
          {nextTopico && (
            <Link
              href={`/aulas/${materiaId}/${nextTopico.id}`}
              className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all font-bold flex items-center justify-center gap-2 shadow-sm border border-border/50 text-[10px] md:text-xs min-w-[80px]"
            >
              Próximo
              <span className="hidden md:inline">
                : {nextTopico.titulo}
              </span>{" "}
              <span className="text-lg leading-none shrink-0">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-x-clip">
      {/* Container principal sem padding lateral por padrão para permitir barras full-width */}
      <div className="max-w-7xl mx-auto px-0 md:px-6">
        <div className="flex flex-col">
          {/* 1. Barra de Progresso de Leitura (Scroll) */}
          <div className="h-1.5 w-full">
            <ProgressIndicator />
          </div>

          {/* 2. Navigation Header (Breadcrumb + Nav) */}
          <div className="mt-4 md:mt-[60px]">
            <NavHeader />
          </div>

          <div className="mt-6 md:mt-12 flex flex-col space-y-6 md:space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:gap-6">
              <div className="flex flex-col gap-2 md:gap-3 w-full">
                {/* Eyebrow - Categoria da Matéria */}
                {materiaNome && (
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] md:text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 uppercase tracking-widest w-fit shadow-sm">
                      {materiaNome}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <h1 className="text-xl md:text-5xl font-bold text-foreground tracking-tight">
                    {titulo}
                  </h1>
                  {isCompleted && (
                    <span className="flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold bg-gradient-to-r from-green-600 to-emerald-500 text-white uppercase tracking-wider shadow-md h-fit self-center md:mt-2 animate-in fade-in zoom-in duration-500">
                      <LuCheck className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[3]" />
                      Concluída
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-5xl">
                  {descricao}
                </p>
              </div>

              {/* Duração na visualização Desktop */}
              <div className="hidden md:flex flex-col items-end gap-3 shrink-0">
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-2xl border border-border/50 text-muted-foreground text-sm font-medium w-fit">
                  <LuClock className="w-4 h-4 text-primary" />
                  {duracao}
                </div>
              </div>
            </div>

            {/* 4. Tabs Navigation + Content */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <StickyModuleNav
                modules={modules}
                activeTab={activeTab}
                completedModules={completedModules}
                isModuleUnlocked={isModuleUnlocked}
              />

              <main className="mt-6 md:mt-[50px] space-y-6 md:space-y-[50px]">
                <div className="px-[10px] md:px-0">{children}</div>
              </main>

              {/* 5. Seção de Conclusão (Banner ou CTA) */}
              <div className="mt-10 md:mt-20">
                {isCompleted ? (
                  /* Banner de Aula Concluída */
                  <div className="bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-500/10 rounded-xl md:rounded-2xl p-5 md:p-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 shrink-0">
                      <LuCheck
                        size={28}
                        className="md:hidden"
                        strokeWidth={3}
                      />
                      <LuCheck
                        size={40}
                        className="hidden md:block"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="text-center md:text-left space-y-1 md:space-y-2">
                      <h3 className="text-lg md:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        Aula Concluída!
                      </h3>
                      <p className="text-sm md:text-lg text-emerald-700/80 dark:text-emerald-300/60 font-medium">
                        Parabéns! Você dominou este conteúdo. Continue na trilha
                        do sucesso!
                      </p>
                    </div>
                  </div>
                ) : (
                  /* CTA de Conclusão */
                  <div className="bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-xl md:rounded-2xl p-5 md:p-12 border border-border/50 text-center space-y-5 md:space-y-8 animate-in fade-in duration-1000">
                    <div className="space-y-3 md:space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold uppercase tracking-wider border border-primary/20">
                        <LuTrophy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Recompensa
                      </div>
                      <h2 className="text-xl md:text-4xl font-black text-foreground">
                        Pronto para Finalizar?
                      </h2>
                      <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Conclua esta aula para desbloquear seu progresso e
                        ganhar bônus de XP.
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      <div className="flex items-center gap-8 py-4 px-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50 shadow-inner">
                        <div className="text-center">
                          <div className="text-2xl font-black text-primary">
                            +{xpGanho} XP
                          </div>
                          <div className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                            Bônus Total
                          </div>
                        </div>
                        <div className="w-px h-10 bg-border/50" />
                        <div className="text-center">
                          <div className="text-2xl font-black text-emerald-500">
                            100%
                          </div>
                          <div className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                            Progresso
                          </div>
                        </div>
                      </div>

                      <Button
                        size="lg"
                        onClick={onComplete}
                        disabled={loading}
                        className="h-16 px-12 text-xl font-black rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                      >
                        {loading ? "Processando..." : "MARCAR COMO CONCLUÍDA"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Navegação Inferior */}
              <div className="mt-[100px] pt-12 border-t border-border/50 pb-12">
                <NavHeader />
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export interface StickyModuleNavProps {
  modules: readonly ModuleDef[];
  activeTab: string;
  completedModules: Set<string>;
  isModuleUnlocked?: (index: number) => boolean;
}

/**
 * ⚠️ COMPONENTE IMUTÁVEL — NÃO MODIFIQUE ⚠️
 * Este componente depende de cálculos precisos de breakout (margem negativa + calc)
 * que são relativos ao layout pai (admin-dashboard-layout). Qualquer alteração aqui
 * ou no layout do main/content wrapper QUEBRARÁ o posicionamento da nav.
 * Se precisar ajustar layout de aulas, NÃO toque neste componente nem no padding
 * do <main> em admin-dashboard-layout.tsx (deve permanecer md:p-0).
 */
export function StickyModuleNav({
  modules,
  activeTab,
  completedModules,
  isModuleUnlocked = () => true,
}: StickyModuleNavProps) {
  const {
    isStickyNavPinned,
    setIsStickyNavPinned,
    isTemporaryHeaderVisible,
    setIsTemporaryHeaderVisible,
  } = useHeaderState();

  const params = useParams();
  const materiaId = params?.materia as string;
  const homeHref = materiaId ? `/aulas/${materiaId}` : undefined;

  // Text color for the "MÓDULO N" label — mirrors the MODULE_SKIN_COLORS banner palette
  const MODULE_LABEL_COLORS = [
    "text-indigo-400",
    "text-emerald-400",
    "text-violet-400",
    "text-amber-400",
    "text-rose-400",
    "text-cyan-400",
    "text-orange-400",
    "text-teal-400",
    "text-pink-400",
    "text-blue-400",
  ] as const;

  const navRef = useRef<HTMLDivElement>(null);
  const [carouselStart, setCarouselStart] = useState(0);

  // Responsive PAGE_SIZE: 2 on mobile, 5 on desktop (max 5 buttons for desktop)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const PAGE_SIZE = isMobile ? 2 : 5;
  const isCarouselMode = modules.length > PAGE_SIZE;

  // Clamp carouselStart when PAGE_SIZE changes (mobile ↔ desktop switch)
  const effectiveStart = Math.min(
    carouselStart,
    Math.max(0, modules.length - PAGE_SIZE),
  );

  const canGoLeft = isCarouselMode && effectiveStart > 0;
  const canGoRight =
    isCarouselMode && effectiveStart + PAGE_SIZE < modules.length;

  const slideLeft = () => setCarouselStart((s) => Math.max(0, s - 1));
  const slideRight = () =>
    setCarouselStart((s) => Math.min(modules.length - PAGE_SIZE, s + 1));

  const toggleHeader = () =>
    setIsTemporaryHeaderVisible(!isTemporaryHeaderVisible);

  // Keep the active tab always inside the visible window
  useEffect(() => {
    if (!isCarouselMode) return;
    const idx = modules.findIndex((m) => m.id === activeTab);
    if (idx === -1) return;
    setCarouselStart((s) => {
      if (idx < s) return idx;
      if (idx >= s + PAGE_SIZE) return idx - PAGE_SIZE + 1;
      return s;
    });
  }, [activeTab, isCarouselMode, modules, PAGE_SIZE]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const rect = navRef.current.getBoundingClientRect();
      const headerHeight = window.innerWidth >= 768 ? 80 : 64;

      if (rect.top <= headerHeight + 5) {
        setIsStickyNavPinned(true);
      } else {
        setIsStickyNavPinned(false);
        setIsTemporaryHeaderVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [setIsStickyNavPinned, setIsTemporaryHeaderVisible]);

  return (
    <div
      ref={navRef}
      className={cn(
        "sticky z-[50] transition-all duration-300",
        // Posição dinâmica
        isStickyNavPinned
          ? isTemporaryHeaderVisible
            ? "top-16 md:top-20"
            : "top-0"
          : "top-0",
        // 🔒 Breakout: preenche toda a área de conteúdo (Viewport - Sidebar)
        // No Desktop (md), subtrai a sidebar. No Mobile, usa w-full (agora livre do padding do pai).
        "w-full md:w-[calc(100vw-var(--sidebar-width,0px))] md:ml-[calc(-1*((100vw-var(--sidebar-width,0px))-100%)/2)]",
      )}
    >
      {/* Inner nav bar — background, blur, border live here */}
      <div
        className={cn(
          "bg-background/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-y border-border/50 transition-all duration-300",
          isStickyNavPinned && !isTemporaryHeaderVisible
            ? "shadow-md h-[64px] md:h-[80px] flex items-center border-t-border/20 border-b-2 w-full" // Altura exata pixel-perfect (64px mobile / 80px desktop)
            : "shadow-sm py-4 border-t-0",
        )}
      >
        {/* Inner Content Wrapper — Ocupa largura total disponível */}
        <div className="w-full">
          {/* ── MOBILE: apenas module tabs + setas (altura original) ── */}
          <div className="md:hidden flex items-center gap-2 px-0 w-full">
            {/* Seta esquerda */}
            <button
              onClick={slideLeft}
              disabled={!canGoLeft}
              aria-label="Módulos anteriores"
              className={cn(
                "w-8 h-8 shrink-0 flex items-center justify-center rounded-xl border transition-all duration-200",
                canGoLeft
                  ? "border-border/50 bg-background text-foreground/80 shadow-sm"
                  : "border-transparent bg-transparent text-transparent pointer-events-none",
              )}
            >
              <LuChevronLeft className="w-4 h-4" />
            </button>

            {/* TabsList mobile — só as TabsTriggers */}
            <TabsList className="flex flex-1 h-auto p-1 bg-muted/20 border border-border/10 rounded-2xl gap-1 shadow-inner min-w-0">
              {modules.map((mod, index) => {
                const isVisible =
                  index >= effectiveStart && index < effectiveStart + PAGE_SIZE;
                return (
                  <TabsTrigger
                    key={mod.id}
                    value={mod.id}
                    className={cn(
                      "flex-1 py-1.5 px-2 rounded-lg border-b-[3px] border-b-transparent transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:ring-1 data-[state=active]:ring-border/20 data-[state=active]:border-b-primary disabled:opacity-40 disabled:cursor-not-allowed group min-w-0",
                      !isVisible && "hidden",
                    )}
                  >
                    <div className="flex flex-col items-center gap-0.5 min-w-0 w-full">
                      <span
                        className={cn(
                          "text-[9px] uppercase tracking-widest font-bold opacity-50 group-data-[state=active]:opacity-100 transition-opacity duration-200 truncate w-full text-center",
                          MODULE_LABEL_COLORS[
                            index % MODULE_LABEL_COLORS.length
                          ],
                        )}
                      >
                        {mod.label}
                      </span>
                      <span className="font-bold text-[10px] w-full text-center flex items-center justify-center gap-1 leading-tight max-w-[80px]">
                        {mod.titulo || mod.title}
                        {completedModules.has(mod.id) && (
                          <span className="text-white bg-green-500 rounded-full p-0.5 shadow-sm shadow-green-500/20 shrink-0">
                            <LuCheck size={10} />
                          </span>
                        )}
                      </span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Seta direita */}
            <button
              onClick={slideRight}
              disabled={!canGoRight}
              aria-label="Próximos módulos"
              className={cn(
                "w-8 h-8 shrink-0 flex items-center justify-center rounded-xl border transition-all duration-200",
                canGoRight
                  ? "border-border/50 bg-background text-foreground/80 shadow-sm"
                  : "border-transparent bg-transparent text-transparent pointer-events-none",
              )}
            >
              <LuChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* ── DESKTOP LAYOUT (≥ md) — one row (atual) ── */}
          <div className="hidden md:flex items-center justify-center gap-2 px-[50px] py-1 w-full">
            {/* Left arrow */}
            <div className={cn("shrink-0", isCarouselMode ? "flex" : "hidden")}>
              <button
                onClick={slideLeft}
                disabled={!canGoLeft}
                aria-label="Módulos anteriores"
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-2xl border border-border/50 bg-background transition-all duration-200",
                  canGoLeft
                    ? "text-foreground/80 hover:bg-muted shadow-sm cursor-pointer"
                    : "text-transparent border-transparent bg-transparent cursor-default pointer-events-none",
                )}
              >
                <LuChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <TabsList className="flex h-auto p-1 bg-muted/20 border-x-0 border-t border-b border-border/10 w-full gap-1 md:gap-1.5 shadow-inner">
              {/* Toggle Button for Header (só quando pinned) */}
              <AnimatePresence>
                {isStickyNavPinned && (
                  <motion.div
                    initial={{ width: 0, opacity: 0, marginRight: 0 }}
                    animate={{ width: "auto", opacity: 1, marginRight: 8 }}
                    exit={{ width: 0, opacity: 0, marginRight: 0 }}
                    className="overflow-hidden"
                  >
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={toggleHeader}
                            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-border/50 bg-background shadow-md text-muted-foreground hover:text-foreground transition-colors shrink-0"
                          >
                            <LuMenu
                              className={cn(
                                "w-4 h-4 md:w-5 md:h-5 transition-all duration-300",
                                isTemporaryHeaderVisible
                                  ? "rotate-90"
                                  : "rotate-0",
                              )}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-slate-900 border-none text-white font-medium text-xs"
                        >
                          {isTemporaryHeaderVisible
                            ? "Ocultar cabeçalho"
                            : "Mostrar cabeçalho"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botão Home/Voltar */}
              {homeHref && (
                <div
                  className={cn(
                    "shrink-0 pr-1 transition-opacity duration-300",
                    isStickyNavPinned
                      ? "flex items-center opacity-100"
                      : "hidden md:flex items-center opacity-100",
                  )}
                >
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Link
                          href={homeHref}
                          className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-border/50 bg-background shadow-md text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        >
                          <LuHouse className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="bg-slate-900 border-none text-white font-medium text-xs"
                      >
                        Voltar às Aulas
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {/* Module tabs */}
              {modules.map((mod, index) => {
                const isVisible =
                  !isCarouselMode ||
                  (index >= effectiveStart &&
                    index < effectiveStart + PAGE_SIZE);
                return (
                  <TabsTrigger
                    key={mod.id}
                    value={mod.id}
                    className={cn(
                      "flex-1 min-w-0 py-2 px-3 md:px-4 rounded-xl border-b-[3px] border-b-transparent transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:ring-1 data-[state=active]:ring-border/20 data-[state=active]:border-b-primary disabled:opacity-40 disabled:cursor-not-allowed group",
                      !isVisible && "hidden",
                    )}
                  >
                    <div className="flex flex-col items-start gap-0.5">
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-widest font-bold font-display opacity-50 group-data-[state=active]:opacity-100 transition-opacity duration-200",
                          MODULE_LABEL_COLORS[
                            index % MODULE_LABEL_COLORS.length
                          ],
                        )}
                      >
                        {mod.label}
                      </span>
                      <span className="font-bold text-[10px] md:text-[13px] leading-tight text-left flex items-start gap-1.5">
                        <span className="line-clamp-2">{mod.titulo || mod.title}</span>
                        {completedModules.has(mod.id) && (
                          <span className="text-white bg-green-500 rounded-full p-0.5 shadow-sm shadow-green-500/20 shrink-0 mt-0.5">
                            <LuCheck size={12} />
                          </span>
                        )}
                        {!isModuleUnlocked(index) && (
                          <span className="text-muted-foreground/40 shrink-0 mt-0.5">
                            <LuLock size={12} />
                          </span>
                        )}
                      </span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Right arrow */}
            <div className={cn("shrink-0", isCarouselMode ? "flex" : "hidden")}>
              <button
                onClick={slideRight}
                disabled={!canGoRight}
                aria-label="Próximos módulos"
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-2xl border border-border/50 bg-background transition-all duration-200",
                  canGoRight
                    ? "text-foreground/80 hover:bg-muted shadow-sm cursor-pointer"
                    : "text-transparent border-transparent bg-transparent cursor-default pointer-events-none",
                )}
              >
                <LuChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Home + Toggle mobile row — 50% abaixo da barra ──
          Não pinned: ambos juntos e centralizados (justify-center gap-3).
          Pinned: Home desliza para esquerda, Toggle para direita (justify-between). */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className={cn(
          "md:hidden flex items-center px-3 transition-all duration-300",
          isStickyNavPinned && isTemporaryHeaderVisible ? "mt-2" : "-mt-5",
          isStickyNavPinned ? "justify-between" : "justify-center gap-3",
        )}
      >
        {/* Botão Home */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {homeHref && (
            <Link
              href={homeHref}
              aria-label="Voltar às Aulas"
              className="mt-2 w-10 h-10 flex items-center justify-center rounded-full border border-border/50 bg-background/95 backdrop-blur shadow-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <LuHouse className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {/* Botão Toggle */}
        <motion.button
          layout
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          onClick={toggleHeader}
          aria-label={
            isTemporaryHeaderVisible ? "Ocultar cabeçalho" : "Mostrar cabeçalho"
          }
          className="mt-2 w-10 h-10 flex items-center justify-center rounded-full border border-border/50 bg-background/95 backdrop-blur shadow-md text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <LuMenu
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              isTemporaryHeaderVisible ? "rotate-90" : "rotate-0",
            )}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}

export function SectionBadge({
  index,
  variant = "indigo",
  className,
}: {
  index: number | string;
  variant?:
    | "indigo"
    | "violet"
    | "emerald"
    | "amber"
    | "rose"
    | "blue"
    | "cyan"
    | "slate";
  className?: string;
}) {
  const badgeVariants = {
    indigo: "bg-white/20 text-white",
    violet: "bg-white/20 text-white",
    emerald: "bg-white/20 text-white",
    amber: "bg-white/20 text-white",
    rose: "bg-white/20 text-white",
    blue: "bg-white/20 text-white",
    cyan: "bg-white/20 text-white",
    slate: "bg-white/20 text-white",
  };

  return (
    <div
      className={cn(
        "relative shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-inner-white backdrop-blur-sm",
        badgeVariants[variant as keyof typeof badgeVariants],
        className,
      )}
    >
      {index}
    </div>
  );
}

export function ModuleSectionHeader({
  index,
  title,
  description,
  variant = "indigo",
  className,
}: {
  index: number | string;
  title: string;
  description?: string;
  variant?:
    | "indigo"
    | "violet"
    | "emerald"
    | "amber"
    | "rose"
    | "blue"
    | "cyan"
    | "slate";
  className?: string;
}) {
  const bgVariants = {
    indigo: "bg-[#0037C1]", // var(--primary) padrão
    violet: "bg-violet-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-600",
    rose: "bg-rose-600",
    blue: "bg-blue-600",
    cyan: "bg-cyan-600",
    slate: "bg-slate-600",
  };

  const badgeVariants = {
    indigo: "bg-white/20 text-white",
    violet: "bg-white/20 text-white",
    emerald: "bg-white/20 text-white",
    amber: "bg-white/20 text-white",
    rose: "bg-white/20 text-white",
    blue: "bg-white/20 text-white",
    cyan: "bg-white/20 text-white",
    slate: "bg-white/20 text-white",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 flex flex-row items-center gap-4 md:gap-6 shadow-lg transition-all hover:shadow-xl group",
        bgVariants[variant as keyof typeof bgVariants],
        className,
      )}
    >
      {/* Decoração de Fundo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full -ml-16 -mb-16 blur-2xl pointer-events-none" />

      {/* =========================================
          LAYOUT MOBILE (CSS Grid)
          ========================================= */}
      <div className="grid md:hidden grid-cols-[auto_1fr] gap-x-4 gap-y-3 w-full">
        {/* Row 1, Col 1 */}
        <SectionBadge
          index={index}
          variant={variant}
          className="row-start-1 col-start-1 self-start"
        />

        {/* Row 1, Col 2 */}
        <h2 className="row-start-1 col-start-2 self-start pt-1 text-2xl leading-tight font-extrabold text-white tracking-tight">
          {title}
        </h2>

        {/* Row 2, Spans Col 1 and 2 */}
        {description && (
          <p className="row-start-2 col-start-1 col-span-2 w-full text-white/80 text-[13px] leading-snug font-medium text-justify tracking-tight">
            {description}
          </p>
        )}
      </div>

      {/* =========================================
          LAYOUT DESKTOP (Flexbox Clássico)
          ========================================= */}
      <div className="hidden md:flex flex-row items-center gap-6 w-full relative z-10">
        <SectionBadge index={index} variant={variant} />

        <div className="relative space-y-2 flex-1 min-w-0">
          <h2 className="text-3xl leading-tight font-extrabold text-white tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-white/80 text-base leading-relaxed max-w-4xl font-medium text-justify tracking-tight">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * COMPONENTE IMPERATIVO DE CONSOLIDAÇÃO (Dossiê Premium)
 * Padroniza as 4 abas obrigatórias antes do Quiz.
 */
export function ModuleConsolidation({
  index,
  variant,
  video,
  resumoVisual,
  maceteVisual,
  audio,
}: {
  index: number;
  variant:
    | "indigo"
    | "violet"
    | "emerald"
    | "amber"
    | "rose"
    | "blue"
    | "cyan"
    | "slate";
  video: {
    videoId: string;
    title: string;
    duration: string;
    thumbnail?: string;
  };
  resumoVisual: {
    moduloNome: string;
    tituloAula: string;
    materia: string;
    images: {
      title: string;
      type: string;
      placeholderColor: string;
      imageUrl?: string;
    }[];
  };
  maceteVisual: { title: string; content: React.ReactNode };
  audio: {
    audioUrl: string;
    titulo: string;
    artista: string;
    capaUrl?: string;
    lyrics?: string;
  };
}) {
  return (
    <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
      <ModuleSectionHeader
        index={index}
        title={`Resumo do Módulo ${index}`}
        variant={variant}
        description="Fixação rápida de conteúdo antes do desafio final."
      />
      <LessonTabs
        variant={variant}
        tabs={[
          {
            id: "video",
            label: "Vídeo Aula",
            icon: LuPlay,
            content: (
              <div className="w-full flex flex-col items-center py-6">
                <div className="w-full max-w-3xl">
                  <VideoModal {...video} />
                </div>
              </div>
            ),
          },
          {
            id: "resumo",
            label: "Resumo Virtual",
            icon: LuBookOpen,
            content: <ModuleSummaryCarouselNew {...resumoVisual} />,
          },
          {
            id: "visual",
            label: "Macete Visual",
            icon: LuImage,
            content: (
              <div className="text-center p-8 space-y-6">
                <h3 className="text-xl font-bold text-foreground">
                  {maceteVisual.title}
                </h3>
                {maceteVisual.content}
              </div>
            ),
          },
          {
            id: "audio",
            label: "Música do Módulo",
            icon: LuVolume2,
            content: (
              <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                <div className="w-full max-w-md">
                  <MusicPlayerCard {...audio} />
                </div>
              </div>
            ),
          },
        ]}
      />
    </section>
  );
}
