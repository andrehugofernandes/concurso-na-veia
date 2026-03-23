"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuHeart, 
  LuCheck, 
  LuX, 
  LuRotateCcw, 
  LuArrowRight,
  LuLightbulb,
  LuTrophy,
  LuFileText
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { triggerSuccessConfetti } from "@/lib/confetti";

export interface SentenceData {
  id: string;
  type?: "translation" | "reading" | "cloze" | "matching";
  text?: string;
  portuguese: string;
  english: string[]; 
  options?: string[];
  explanation: string;
  category?: string;
  // Campos para exercícios novos
  clozePrefix?: string;
  clozeSuffix?: string;
  pairs?: { en: string; pt: string }[];
}

interface PetroLingoExerciseProps {
  exercises: SentenceData[];
  onBack: () => void;
  onFinish: (score: number) => void;
}

export default function PetroLingoExercise({
  exercises,
  onBack,
  onFinish
}: PetroLingoExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [poolWords, setPoolWords] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "incorrect">("idle");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Estados para Matching Pairs
  const [matchingPairs, setMatchingPairs] = useState<{ en: string; pt: string }[]>([]);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [completedPairs, setCompletedPairs] = useState<string[]>([]);

  const currentExercise = exercises[currentIndex];

  // Labels em Português conforme solicitado
  const labels = {
    title: "Petro-Lingo",
    translate: "Traduza esta frase técnica:",
    reading: "Leitura e Interpretação de Texto:",
    cloze: "Complete a frase com a opção correta:",
    matching: "Combine os pares (Inglês ➔ Português):",
    check: "Verificar",
    continue: "Continuar",
    skip: "Pular",
    correct: "Excelente!",
    incorrect: "Quase lá...",
    explanation: "Dica de Especialista (Concursos):",
    lives: "Vidas",
    gameOver: "Game Over",
    tryAgain: "Tentar Novamente",
    congrats: "Missão Cumprida!",
    backToPath: "Voltar para a Trilha",
    finishedDesc: "Você completou esta lição com sucesso!"
  };

  // Inicializa o pool de palavras ou estado de leitura/cloze/matching
  useEffect(() => {
    if (currentExercise) {
      setSelectedOption(null);
      setSelectedEn(null);
      setCompletedPairs([]);
      
      if (currentExercise.type === "translation") {
        const shuffled = [...currentExercise.english].sort(() => Math.random() - 0.5);
        setPoolWords(shuffled);
        setSelectedWords([]);
      } else if (currentExercise.type === "matching") {
        setMatchingPairs([...(currentExercise.pairs || [])].sort(() => Math.random() - 0.5));
      }
      
      setStatus("idle");
      setShowExplanation(false);
    }
  }, [currentIndex, currentExercise]);

  const handleWordSelect = (word: string, index: number) => {
    if (status !== "idle") return;
    const newPool = [...poolWords];
    newPool.splice(index, 1);
    setPoolWords(newPool);
    setSelectedWords([...selectedWords, word]);
  };

  const handleWordRemove = (word: string, index: number) => {
    if (status !== "idle") return;
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setPoolWords([...poolWords, word]);
  };

  const handlePairSelect = (type: "en" | "pt", word: string) => {
    if (status !== "idle") return;
    
    if (type === "en") {
      setSelectedEn(word);
    } else if (selectedEn) {
      // Verifica se o par está correto
      const pair = currentExercise.pairs?.find(p => p.en === selectedEn && p.pt === word);
      if (pair) {
        setCompletedPairs([...completedPairs, selectedEn]);
        setSelectedEn(null);
        // Se completou todos os pares
        if (completedPairs.length + 1 === currentExercise.pairs?.length) {
          setStatus("correct");
        }
      } else {
        // Errou o par
        setLives(prev => Math.max(0, prev - 1));
        setSelectedEn(null);
      }
    }
  };

  const handleCheck = () => {
    let isCorrect = false;

    if (currentExercise.type === "reading" || currentExercise.type === "cloze") {
      isCorrect = selectedOption === currentExercise.english[0];
    } else {
      isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentExercise.english);
    }

    if (isCorrect) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setLives(3);
    setCurrentIndex(0);
    setIsFinished(false);
    setStatus("idle");
  };

  useEffect(() => {
    if (isFinished) {
      triggerSuccessConfetti();
    }
  }, [isFinished]);

  if (lives === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6 min-h-[400px] text-center bg-card border-2 border-border rounded-[40px] shadow-2xl animate-in zoom-in duration-300">
        <div className="w-24 h-24 rounded-3xl bg-red-500/10 flex items-center justify-center shadow-inner">
          <LuRotateCcw className="w-12 h-12 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-foreground">{labels.gameOver}!</h2>
          <p className="text-muted-foreground text-lg px-8">Suas vidas acabaram. Vamos tentar de novo para fixar o conteúdo?</p>
        </div>
        <Button 
          onClick={resetGame} 
          size="lg" 
          className="rounded-2xl px-12 py-8 h-auto font-black text-xl shadow-[0_6px_0_0_#b91c1c] active:translate-y-1 active:shadow-none transition-all bg-red-600 hover:bg-red-700"
        >
          {labels.tryAgain}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col min-h-[600px] gap-8 py-8">
      
      {/* HEADER: Barra de Progresso e Vidas */}
      <div className="flex items-center justify-between gap-6 px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-muted" 
          onClick={onBack}
        >
          <LuX size={24} className="text-muted-foreground" />
        </Button>
        
        <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden shadow-inner border border-border/50">
          <motion.div 
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / exercises.length) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-2xl border border-red-500/20 shadow-sm">
          <LuHeart className="w-6 h-6 fill-red-500 text-red-500" />
          <span className="font-black text-xl text-red-600 dark:text-red-400">{lives}</span>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <div className="flex-1 px-4 space-y-10">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-10"
            >
              {/* PROMPT DINÂMICO baseados no tipo de exercício */}
              {currentExercise.type === "reading" ? (
                <div className="space-y-8 animate-in fade-in duration-500">
                  {/* Bloco de Texto Técnico Interativo (Estilo Duolingo) */}
                  <div className="bg-card border-2 border-border p-8 rounded-[40px] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                    <LuFileText className="absolute top-4 right-4 text-primary/10 w-24 h-24 -rotate-12 transition-transform group-hover:rotate-0" />
                    
                    <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                       <LuFileText className="w-4 h-4" /> TEXTO TÉCNICO INTERATIVO
                    </h4>

                    <div className="flex flex-wrap gap-x-1.5 gap-y-2 relative z-10">
                      {currentExercise.text?.split(" ").map((word, i) => {
                        const cleanWord = word.replace(/[.,]/g, "").toLowerCase();
                        const hints: Record<string, string> = {
                          "fractional": "fracionada (separada por partes)",
                          "distillation": "destilação (processo de separação)",
                          "crude": "bruto (em estado natural)",
                          "vaporizes": "evapora (torna-se vapor)",
                          "condense": "condensa (torna-se líquido)",
                          "offshore": "no mar (longe da costa)",
                          "paramount": "primordial (mais importante)",
                          "rigorous": "rigoroso (estrito)",
                          "drills": "treinamentos práticos / simulados",
                          "mandatory": "obrigatório",
                          "compliance": "em conformidade / obediência",
                          "fines": "multas",
                          "rovs": "veículos operados remotamente",
                          "depths": "profundidades",
                          "exceeding": "ultrapassando",
                        };

                        const hint = hints[cleanWord];

                        return (
                          <div key={i} className="group/word relative inline-block">
                            <span className={cn(
                              "text-lg md:text-xl font-medium leading-none cursor-help transition-colors border-b-2 border-dotted border-border pb-0.5 hover:text-primary hover:border-primary",
                              hint && "text-foreground font-bold"
                            )}>
                              {word}
                            </span>
                            {hint && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-zinc-800 text-white text-sm rounded-xl opacity-0 group-hover/word:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-2xl z-50">
                                {hint}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-800 rotate-45" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pergunta de Interpretação com Mascote Reativo */}
                  <div className="flex items-start gap-6">
                    <motion.div 
                      animate={status === "correct" ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : status === "incorrect" ? { x: [-5, 5, -5, 5, 0] } : {}}
                      className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-4xl shadow-lg shrink-0"
                    >
                      {status === "correct" ? "🎯" : status === "incorrect" ? "🤕" : "🧐"}
                    </motion.div>
                    
                    <div className="flex-1 space-y-4">
                      <p className="text-xl font-black text-foreground leading-tight">{currentExercise.portuguese}</p>
                      <div className="grid grid-cols-1 gap-3">
                        {currentExercise.options?.map((option, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => status === "idle" && setSelectedOption(option)}
                            className={cn(
                              "w-full text-left p-5 rounded-3xl border-2 transition-all font-bold text-lg relative overflow-hidden group/opt",
                              selectedOption === option 
                                ? "bg-primary/10 border-primary text-primary shadow-lg scale-[1.02]" 
                                : "bg-card border-border text-foreground hover:border-primary/50 shadow-[0_4px_0_0_rgba(0,0,0,0.05)] active:translate-y-1 active:shadow-none"
                            )}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-10 h-10 rounded-2xl border-2 flex items-center justify-center shrink-0 font-black transition-colors",
                                selectedOption === option ? "bg-primary border-primary text-white" : "border-border text-muted-foreground group-hover/opt:border-primary/40"
                              )}>
                                {String.fromCharCode(65 + idx)}
                              </div>
                              <span className="flex-1">{option}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentExercise.type === "cloze" ? (
                <div className="space-y-12 animate-in slide-in-from-bottom-5 duration-500">
                  <div className="flex flex-col items-center gap-8 text-center bg-card border-2 border-border p-10 rounded-[40px] shadow-2xl">
                    <p className="text-sm font-black text-primary uppercase tracking-[0.2em]">{labels.cloze}</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 text-2xl md:text-3xl font-bold text-foreground">
                      <span>{currentExercise.clozePrefix}</span>
                      <span className={cn(
                        "inline-block px-6 py-2 border-b-4 border-dashed border-primary bg-primary/5 rounded-xl min-w-[120px] transition-all",
                        selectedOption && "border-solid bg-primary text-white scale-110"
                      )}>
                        {selectedOption || "___"}
                      </span>
                      <span>{currentExercise.clozeSuffix}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {currentExercise.options?.map((option, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => status === "idle" && setSelectedOption(option)}
                        className={cn(
                          "px-10 py-5 rounded-3xl border-2 font-black text-xl transition-all shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none",
                          selectedOption === option 
                            ? "bg-primary border-primary text-white" 
                            : "bg-card border-border text-foreground hover:border-primary/40"
                        )}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : currentExercise.type === "matching" ? (
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                  <p className="text-center text-muted-foreground font-black uppercase tracking-widest text-sm">{labels.matching}</p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {/* Coluna Inglês */}
                    <div className="space-y-3">
                      {currentExercise.pairs?.map((pair) => (
                        <motion.button
                          key={`en-${pair.en}`}
                          disabled={completedPairs.includes(pair.en)}
                          onClick={() => handlePairSelect("en", pair.en)}
                          className={cn(
                            "w-full p-6 h-24 rounded-3xl border-2 font-black text-xl transition-all flex items-center justify-center text-center",
                            completedPairs.includes(pair.en)
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 opacity-50 grayscale"
                              : selectedEn === pair.en
                                ? "bg-primary/20 border-primary text-primary scale-105 shadow-xl"
                                : "bg-card border-border text-foreground hover:border-primary/40 shadow-sm"
                          )}
                        >
                          {pair.en}
                        </motion.button>
                      ))}
                    </div>

                    {/* Coluna Português (Embaralhada no PetroLingoMain ou useEffect) */}
                    <div className="space-y-3">
                      {matchingPairs.map((pair) => (
                        <motion.button
                          key={`pt-${pair.pt}`}
                          disabled={completedPairs.includes(pair.en)}
                          onClick={() => handlePairSelect("pt", pair.pt)}
                          className={cn(
                            "w-full p-6 h-24 rounded-3xl border-2 font-black text-xl transition-all flex items-center justify-center text-center",
                            completedPairs.includes(pair.en)
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 opacity-50 grayscale"
                              : "bg-card border-border text-foreground hover:border-primary/40 shadow-sm"
                          )}
                        >
                          {pair.pt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* PROMPT (O Professor Petrolino - TRADUÇÃO) */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl shadow-lg shrink-0">
                      🛢️
                    </div>
                    <div className="relative bg-card border-2 border-border p-5 rounded-3xl rounded-tl-none shadow-xl">
                      {/* Seta do balão de fala */}
                      <div className="absolute -left-2 top-0 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-border border-b-[10px] border-b-transparent" />
                      <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">{labels.translate}</p>
                      <p className="text-xl md:text-2xl font-bold text-foreground italic">
                        "{currentExercise.portuguese}"
                      </p>
                    </div>
                  </div>

                  {/* ÁREA DE DEPÓSITO (ONDE AS PALAVRAS CAEM) */}
                  <div className="min-h-[140px] p-6 bg-muted/20 rounded-[40px] border-2 border-dashed border-border/60 flex flex-wrap gap-3 items-center content-center justify-center transition-all">
                    <AnimatePresence mode="popLayout">
                      {selectedWords.map((word, idx) => (
                        <motion.button
                          key={`sel-${word}-${idx}`}
                          layoutId={`word-${word}`}
                          onClick={() => handleWordRemove(word, idx)}
                          className="px-5 py-3 bg-card border-2 border-border rounded-2xl font-bold text-lg text-foreground shadow-[0_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:translate-y-px hover:shadow-[0_2px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                          {word}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                    {selectedWords.length === 0 && (
                      <p className="text-muted-foreground font-medium italic opacity-50">Toque nas palavras para montar a frase...</p>
                    )}
                  </div>

                  {/* BANCO DE PALAVRAS (POOL) */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <AnimatePresence mode="popLayout">
                      {poolWords.map((word, idx) => (
                        <motion.button
                          key={`pool-${word}-${idx}`}
                          layoutId={`word-${word}`}
                          onClick={() => handleWordSelect(word, idx)}
                          className="px-6 py-4 bg-card border-2 border-border rounded-2xl font-black text-xl text-foreground/90 shadow-[0_5px_0_0_rgba(0,0,0,0.15)] dark:shadow-[0_5px_0_0_rgba(255,255,255,0.1)] hover:bg-accent hover:border-primary/40 active:translate-y-1 active:shadow-none transition-all"
                          whileTap={{ scale: 0.95 }}
                        >
                          {word}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            /* TELA DE SUCESSO FINAL */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 bg-card border-2 border-border rounded-[40px] p-12 shadow-2xl"
            >
              <div className="relative inline-block">
                <motion.div 
                  className="text-8xl"
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🏆
                </motion.div>
                <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg">
                  <LuCheck size={24} />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-foreground tracking-tight">{labels.congrats}</h2>
                <p className="text-xl text-muted-foreground">{labels.finishedDesc}</p>
              </div>
              <Button 
                onClick={() => onFinish(100)}
                size="lg"
                className="w-full rounded-2xl py-8 h-auto font-black text-2xl shadow-[0_8px_0_0_#059669] active:translate-y-2 active:shadow-none transition-all bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {labels.backToPath}
                <LuArrowRight className="ml-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BARRA DE FEEDBACK (POPA QUANDO VERIFICA) */}
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className={cn(
              "fixed bottom-0 left-0 right-0 p-8 border-t-4 z-50 backdrop-blur-xl",
              status === "correct" 
                ? "bg-emerald-500/95 border-emerald-400 text-white" 
                : "bg-red-500/95 border-red-400 text-white shadow-[0_-20px_50px_rgba(244,63,94,0.3)]"
            )}
          >
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-2xl shrink-0">
                  {status === "correct" ? "✅" : "⚠️"}
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase tracking-tighter">
                    {status === "correct" ? labels.correct : labels.incorrect}
                  </h3>
                  <div className="flex items-start gap-2 bg-black/10 p-4 rounded-2xl border border-white/10 max-w-2xl">
                    <LuLightbulb className="w-5 h-5 shrink-0 mt-1 opacity-70" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">{labels.explanation}</p>
                      <p className="text-base font-bold leading-tight">{currentExercise.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                onClick={status === "correct" ? handleNext : () => setStatus("idle")}
                size="lg"
                className={cn(
                  "w-full md:w-auto rounded-3xl px-12 py-8 h-auto font-black text-2xl shadow-2xl transition-all flex items-center gap-3",
                  status === "correct" 
                    ? "bg-white !text-emerald-700 hover:scale-105 active:scale-95 shadow-emerald-900/20" 
                    : "bg-white !text-red-700 hover:scale-105 active:scale-95 shadow-red-900/20"
                )}
              >
                {status === "correct" ? labels.continue : labels.tryAgain}
                {status === "correct" ? <LuArrowRight className="w-8 h-8" /> : <LuRotateCcw className="w-8 h-8" />}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÃO DE CHECK (BOTTOM BAR FIXA) */}
      {status === "idle" && !isFinished && (
        <div className="p-6 bg-white dark:bg-zinc-900 md:dark:bg-transparent border-t border-border md:border-0 flex justify-center md:justify-end items-center gap-4 fixed bottom-0 left-0 right-0 z-40 md:relative md:p-0 md:mt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-none md:shadow-none transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="w-full md:w-auto text-muted-foreground hover:bg-muted font-bold text-lg rounded-2xl"
            onClick={onBack}
          >
            {labels.skip}
          </Button>

          {status === "idle" ? (
            currentExercise.type !== "matching" && (
              <Button 
                disabled={
                  currentExercise.type === "reading" || currentExercise.type === "cloze" 
                    ? !selectedOption 
                    : selectedWords.length === 0
                }
                onClick={handleCheck}
                size="lg"
                className={cn(
                  "w-full md:w-64 rounded-2xl py-6 md:py-8 h-auto font-black text-2xl shadow-xl transition-all",
                  (currentExercise.type === "reading" || currentExercise.type === "cloze" ? !!selectedOption : selectedWords.length > 0)
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_6px_0_0_#059669] active:translate-y-1 active:shadow-none" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {labels.check}
              </Button>
            )
          ) : (
            <Button 
              onClick={handleNext}
              size="lg"
              className={cn(
                "w-full md:w-64 rounded-2xl py-6 md:py-8 h-auto font-black text-2xl shadow-xl transition-all animate-bounce-subtle",
                status === "correct" 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_6px_0_0_#059669]" 
                  : "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_6px_0_0_#be123c]"
              )}
            >
              <div className="flex items-center gap-2">
                {labels.continue}
                <LuArrowRight className="w-8 h-8" />
              </div>
            </Button>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
