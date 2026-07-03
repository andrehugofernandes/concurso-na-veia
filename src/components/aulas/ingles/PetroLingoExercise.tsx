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
  LuFileText,
  LuVolume2,
  LuZap,
  LuArrowLeft,
  LuThumbsUp,
  LuThumbsDown,
  LuSparkles,
  LuTimer,
  LuTarget
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { triggerSuccessConfetti } from "@/lib/confetti";
import { speakEnglishText, playMatchSuccessSound, playErrorSound, playVictoryFanfareSound } from "@/lib/petrolingoAudio";

export const PETROLINGO_CHARACTERS = [
  {
    id: "engineer",
    name: "Eng. Pedro",
    role: "Engenheiro de Petróleo",
    image: "/images/petrolingo/engineer.png",
    avatarBg: "bg-amber-500/10 border-amber-500/30"
  },
  {
    id: "geologist",
    name: "Dra. Helena",
    role: "Geóloga de Reservatórios",
    image: "/images/petrolingo/geologist.png",
    avatarBg: "bg-emerald-500/10 border-emerald-500/30"
  },
  {
    id: "diver",
    name: "Mergulhador Lucas",
    role: "Operações Subsea",
    image: "/images/petrolingo/diver.png",
    avatarBg: "bg-sky-500/10 border-sky-500/30"
  },
  {
    id: "operator",
    name: "Técnico Bruno",
    role: "Operador de Refinaria",
    image: "/images/petrolingo/operator.png",
    avatarBg: "bg-indigo-500/10 border-indigo-500/30"
  }
];

export interface SentenceData {
  id: string;
  type?: "translation" | "reading" | "cloze" | "matching" | "listening";
  mode?: "en_to_pt" | "pt_to_en";
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
  targetWord?: string;
  portugueseWords?: string[];
  portugueseTarget?: string[];
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

  // Estados para Resposta Rápida / Combo com Raio ⚡ e Tremor de Tela
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [lessonStartTime] = useState<number>(Date.now());
  const [comboCount, setComboCount] = useState<number>(0);
  const [showLightning, setShowLightning] = useState<boolean>(false);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);

  // Estado do Modal "Explique Minha Resposta" (Duolingo Max AI)
  const [showExplainModal, setShowExplainModal] = useState<boolean>(false);
  const [feedbackRating, setFeedbackRating] = useState<"like" | "dislike" | null>(null);

  // Efeito Sonoro Triumfant quando finaliza
  useEffect(() => {
    if (isFinished) {
      playVictoryFanfareSound();
      triggerSuccessConfetti();
    }
  }, [isFinished]);

  const currentExercise = exercises[currentIndex];
  const character = PETROLINGO_CHARACTERS[currentIndex % PETROLINGO_CHARACTERS.length];

  // Labels em Português conforme solicitado
  const labels = {
    title: "Petro-Lingo",
    translate: "Traduza esta frase técnica:",
    reading: "Leitura e Interpretação de Texto:",
    cloze: "Complete a frase com a opção correta:",
    matching: "Combine os pares (Inglês ➔ Português):",
    listening: "O que você escuta?",
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

  // Inicializa o pool de palavras ou estado de leitura/cloze/matching/listening
  useEffect(() => {
    if (currentExercise) {
      setSelectedOption(null);
      setSelectedEn(null);
      setCompletedPairs([]);
      setStartTime(Date.now());
      
      if (!currentExercise.type || currentExercise.type === "translation") {
        if (currentExercise.mode !== "pt_to_en") {
          // Banco de palavras em Português
          const rawTargetPtWords = currentExercise.portugueseTarget || currentExercise.portuguese.replace(/[.,?!]/g, "").split(" ");
          const targetPtWords = rawTargetPtWords.map(w => w.toLowerCase().trim()).filter(Boolean);
          const rawDistractors = currentExercise.options || ["de", "uma", "mais", "pouco", "mesa", "pequenas"];
          const distractors = rawDistractors.map(w => w.toLowerCase().trim()).filter(Boolean);
          const allWords = Array.from(new Set([...targetPtWords, ...distractors]));
          const shuffled = [...allWords].sort(() => Math.random() - 0.5);
          setPoolWords(shuffled);
          setSelectedWords([]);
          // Auto-play do áudio em inglês do balão
          speakEnglishText(currentExercise.english.join(" "));
        } else {
          // Banco de palavras em Inglês
          const allWords = currentExercise.options 
            ? [...currentExercise.english, ...currentExercise.options]
            : [...currentExercise.english];
          const shuffled = [...allWords].sort(() => Math.random() - 0.5);
          setPoolWords(shuffled);
          setSelectedWords([]);
        }
      } else if (currentExercise.type === "matching") {
        setMatchingPairs([...(currentExercise.pairs || [])].sort(() => Math.random() - 0.5));
      } else if (currentExercise.type === "listening") {
        // Toca o áudio da palavra-alvo automaticamente ao abrir
        const wordToSpeak = currentExercise.targetWord || currentExercise.english[0];
        speakEnglishText(wordToSpeak, 0.85);
      }
      
      setStatus("idle");
      setShowExplanation(false);
    }
  }, [currentIndex, currentExercise]);

  const handleWordSelect = (word: string, index: number) => {
    if (status !== "idle") return;
    if (currentExercise.mode === "pt_to_en") {
      speakEnglishText(word);
    }
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
      speakEnglishText(word);
    } else if (selectedEn) {
      // Verifica se o par está correto
      const pair = currentExercise.pairs?.find(p => p.en === selectedEn && p.pt === word);
      if (pair) {
        setCompletedPairs([...completedPairs, selectedEn]);
        speakEnglishText(selectedEn);
        playMatchSuccessSound();
        setSelectedEn(null);
        // Se completou todos os pares
        if (completedPairs.length + 1 === currentExercise.pairs?.length) {
          setStatus("correct");
        }
      } else {
        // Errou o par
        playErrorSound();
        setLives(prev => Math.max(0, prev - 1));
        setSelectedEn(null);
      }
    }
  };

  const handleCheck = () => {
    let isCorrect = false;

    if (currentExercise.type === "reading" || currentExercise.type === "cloze") {
      isCorrect = selectedOption === currentExercise.english[0];
    } else if (currentExercise.type === "listening") {
      const expected = currentExercise.targetWord || currentExercise.english[0];
      isCorrect = selectedOption === expected;
    } else if (currentExercise.mode !== "pt_to_en") {
      const targetPtWords = currentExercise.portugueseTarget || currentExercise.portuguese.replace(/[.,?!]/g, "").split(" ");
      const userText = selectedWords.join(" ").toLowerCase().trim();
      const expectedText = targetPtWords.join(" ").toLowerCase().trim();
      const cleanPortuguese = currentExercise.portuguese.toLowerCase().replace(/[.,?!]/g, "").trim();
      isCorrect = userText === expectedText || userText === cleanPortuguese;
    } else {
      isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentExercise.english);
    }

    const elapsedSeconds = (Date.now() - startTime) / 1000;

    if (isCorrect) {
      setStatus("correct");
      playMatchSuccessSound();

      const isFastAnswer = elapsedSeconds <= 6;
      const nextCombo = comboCount + 1;
      setComboCount(nextCombo);

      // Dispara efeito de Raio ⚡ e Tremor de Tela se respondeu rápido ou tem combo!
      if (isFastAnswer || nextCombo >= 2) {
        setShowLightning(true);
        setIsScreenShaking(true);
        setTimeout(() => setShowLightning(false), 700);
        setTimeout(() => setIsScreenShaking(false), 500);
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try { navigator.vibrate([40, 60, 40]); } catch (e) {}
        }
      }

      if (!currentExercise.type || currentExercise.type === "translation") {
        speakEnglishText(currentExercise.english.join(" "));
      }
    } else {
      setStatus("incorrect");
      playErrorSound();
      setComboCount(0);
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      setStatus("idle");
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
      playVictoryFanfareSound();
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
    <motion.div 
      animate={isScreenShaking ? { x: [-8, 8, -6, 6, -3, 3, 0], y: [-4, 4, -3, 3, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-2xl mx-auto flex flex-col min-h-[600px] gap-8 py-8"
    >
      {/* EFEITO DE RAIO E MULTIPLICADOR DE COMBO (RESPOSTA RÁPIDA / STREAK) */}
      <AnimatePresence>
        {showLightning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-amber-400/20 backdrop-blur-[2px]"
          >
            {/* SVG do Raio cruzando a tela */}
            <svg className="w-full h-full text-amber-400 filter drop-shadow-[0_0_30px_rgba(251,191,36,0.9)] opacity-90" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="55,0 45,45 62,45 40,100 50,55 35,55" fill="currentColor" />
            </svg>
            
            {/* Badge Flutuante do Combo */}
            <motion.div 
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: [0, 1.3, 1], rotate: [-15, 8, 0] }}
              exit={{ scale: 0 }}
              className="absolute bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black text-3xl md:text-5xl px-8 py-4 rounded-full shadow-[0_10px_40px_rgba(251,191,36,0.6)] border-4 border-white flex items-center gap-3 uppercase tracking-wider"
            >
              <LuZap className="w-10 h-10 fill-amber-950 animate-bounce" />
              <span>COMBO {comboCount}x! ⚡</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                  <p className="text-center text-xs font-black text-primary uppercase tracking-[0.2em]">Complete o espaço vazio:</p>

                  {/* CHARACTER AVATAR + SPEECH BALLOON */}
                  <div className="flex items-start gap-5 my-4">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={`char-cloze-${character.id}-${currentIndex}`}
                      className="relative flex flex-col items-center shrink-0"
                    >
                      <div className={cn(
                        "w-24 h-24 md:w-28 md:h-28 rounded-3xl border-2 flex items-center justify-center p-2 shadow-xl overflow-hidden backdrop-blur-md relative group",
                        character.avatarBg
                      )}>
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className="w-full h-full object-contain filter drop-shadow-md transition-transform group-hover:scale-110"
                        />
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full border border-border shadow-sm">
                        {character.name}
                      </span>
                    </motion.div>

                    <div className="relative flex-1 bg-card border-2 border-border p-8 rounded-[36px] rounded-tl-none shadow-2xl">
                      <div className="absolute -left-3 top-6 w-0 h-0 border-t-[10px] border-t-transparent border-r-[12px] border-r-border border-b-[10px] border-b-transparent" />
                      <div className="absolute -left-[9px] top-6 w-0 h-0 border-t-[9px] border-t-transparent border-r-[11px] border-r-card border-b-[9px] border-b-transparent z-10" />

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-4 text-xl md:text-2xl font-bold text-foreground">
                        <span>{currentExercise.clozePrefix}</span>
                        <span className={cn(
                          "inline-block px-6 py-2 border-b-4 border-dashed border-primary bg-primary/5 rounded-xl min-w-[120px] text-center transition-all",
                          selectedOption && "border-solid bg-primary text-white scale-105"
                        )}>
                          {selectedOption || "___"}
                        </span>
                        <span>{currentExercise.clozeSuffix}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {currentExercise.options?.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (status !== "idle") return;
                          setSelectedOption(option);
                          speakEnglishText(option);
                        }}
                        className={cn(
                          "px-8 py-4 md:px-10 md:py-5 rounded-3xl border-2 font-black text-xl transition-all shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none",
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
              ) : currentExercise.type === "listening" ? (
                <div className="space-y-8 animate-in zoom-in-95 duration-500">
                  <div className="text-center space-y-2">
                    <p className="text-center text-primary font-black uppercase tracking-widest text-sm">{labels.listening}</p>
                    <p className="text-muted-foreground font-bold text-base">Toque no megafone para ouvir e selecione a palavra correta:</p>
                  </div>

                  {/* Botão Central de Megafone Grande (Estilo Duolingo) */}
                  <div className="flex justify-center my-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => speakEnglishText(currentExercise.targetWord || currentExercise.english[0], 0.85)}
                      className="w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-[0_10px_0_0_#0284c7] active:translate-y-2 active:shadow-none transition-all relative group"
                    >
                      <LuVolume2 className="w-16 h-16 animate-pulse" />
                      <span className="absolute -bottom-8 text-xs font-black uppercase tracking-wider text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Ouvir Novamente 🔊
                      </span>
                    </motion.button>
                  </div>

                  {/* Grid de 4 Opções (2x2) */}
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {currentExercise.options?.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (status !== "idle") return;
                          setSelectedOption(option);
                          speakEnglishText(option);
                        }}
                        className={cn(
                          "p-6 h-28 rounded-3xl border-2 font-black text-2xl transition-all flex items-center justify-center text-center shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none",
                          selectedOption === option 
                            ? "bg-sky-500 border-sky-600 text-white scale-105 shadow-sky-700/30" 
                            : "bg-card border-border text-foreground hover:border-sky-400"
                        )}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* PROMPT (O PERSONAGEM DA PETROBRAS - TRADUÇÃO) */}
                  <div className="flex items-start gap-5 my-4">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={`char-trans-${character.id}-${currentIndex}`}
                      className="relative flex flex-col items-center shrink-0"
                    >
                      <div className={cn(
                        "w-24 h-24 md:w-28 md:h-28 rounded-3xl border-2 flex items-center justify-center p-2 shadow-xl overflow-hidden backdrop-blur-md relative group",
                        character.avatarBg
                      )}>
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className="w-full h-full object-contain filter drop-shadow-md transition-transform group-hover:scale-110"
                        />
                      </div>
                      <span className="mt-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full border border-border shadow-sm">
                        {character.name}
                      </span>
                    </motion.div>

                    <div className="relative flex-1 bg-card border-2 border-border p-6 rounded-[32px] rounded-tl-none shadow-2xl">
                      {/* Seta do balão de fala */}
                      <div className="absolute -left-3 top-6 w-0 h-0 border-t-[10px] border-t-transparent border-r-[12px] border-r-border border-b-[10px] border-b-transparent" />
                      <div className="absolute -left-[9px] top-6 w-0 h-0 border-t-[9px] border-t-transparent border-r-[11px] border-r-card border-b-[9px] border-b-transparent z-10" />

                      {currentExercise.mode !== "pt_to_en" ? (
                        <div>
                          <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">{labels.translate}</p>
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => speakEnglishText(currentExercise.english.join(" "))}
                              className="w-12 h-12 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-lg shrink-0 transition-colors"
                              title="Ouvir a frase completa em inglês"
                            >
                              <LuVolume2 className="w-6 h-6 animate-pulse" />
                            </motion.button>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xl md:text-2xl font-bold text-foreground">
                              {currentExercise.english.map((word, wIdx) => (
                                <span 
                                  key={wIdx} 
                                  className="border-b-2 border-dashed border-muted-foreground/40 hover:border-sky-500 cursor-pointer transition-colors px-0.5"
                                  onClick={() => speakEnglishText(word)}
                                  title="Clique para ouvir a palavra"
                                >
                                  {word}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <p className="text-xs font-black text-primary uppercase tracking-widest">{labels.translate}</p>
                            <button
                              onClick={() => speakEnglishText(currentExercise.english.join(" "))}
                              className="p-2.5 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors shrink-0"
                              title="Ouvir a frase completa em inglês"
                            >
                              <LuVolume2 className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-xl md:text-2xl font-bold text-foreground italic leading-relaxed">
                            "{currentExercise.portuguese}"
                          </p>
                        </div>
                      )}
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
            /* TELA DE SUCESSO FINAL ESTILO DUOLINGO */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 bg-card border-2 border-border rounded-[40px] p-6 md:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Personagem Animado Saltando com Sparkles */}
              <div className="relative inline-block my-2">
                <motion.div
                  animate={{ 
                    y: [0, -16, 0],
                    rotate: [0, -4, 4, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="w-32 h-32 md:w-40 md:h-40 mx-auto relative group"
                >
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-contain filter drop-shadow-xl"
                  />
                </motion.div>
                <div className="absolute -top-2 -right-2 bg-amber-400 text-black p-2 rounded-full shadow-lg animate-bounce">
                  <LuSparkles size={20} />
                </div>
              </div>

              {/* Título & Subtítulo */}
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-sky-500 tracking-tight">
                  Um combo de arrasar!
                </h2>
                <p className="text-base md:text-lg font-bold text-muted-foreground">
                  {exercises.length} acertos seguidos? Continue assim!
                </p>
              </div>

              {/* 3 Cards de Estatísticas Estilo Duolingo */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-lg mx-auto">
                {/* CARD 1: TOTAL DE XP */}
                <div className="bg-amber-400/10 border-2 border-amber-400/40 rounded-3xl p-3 md:p-4 flex flex-col items-center justify-center space-y-1 shadow-md">
                  <span className="text-[9px] md:text-xs font-black uppercase tracking-wider text-amber-500">
                    TOTAL DE XP
                  </span>
                  <div className="flex items-center gap-1 text-xl md:text-2xl font-black text-amber-500">
                    <LuZap className="w-5 h-5 fill-amber-400 text-amber-500" />
                    <span>+35</span>
                  </div>
                </div>

                {/* CARD 2: COMBO */}
                <div className="bg-sky-500/10 border-2 border-sky-400/40 rounded-3xl p-3 md:p-4 flex flex-col items-center justify-center space-y-1 shadow-md">
                  <span className="text-[9px] md:text-xs font-black uppercase tracking-wider text-sky-500">
                    COMBO
                  </span>
                  <div className="flex items-center gap-1 text-xl md:text-2xl font-black text-sky-500">
                    <LuTarget className="w-5 h-5 text-sky-500" />
                    <span>x{comboCount || exercises.length}</span>
                  </div>
                </div>

                {/* CARD 3: TEMPO / INCANSÁVEL */}
                <div className="bg-emerald-500/10 border-2 border-emerald-400/40 rounded-3xl p-3 md:p-4 flex flex-col items-center justify-center space-y-1 shadow-md">
                  <span className="text-[9px] md:text-xs font-black uppercase tracking-wider text-emerald-500">
                    INCANSÁVEL
                  </span>
                  <div className="flex items-center gap-1 text-xl md:text-2xl font-black text-emerald-500">
                    <LuTimer className="w-5 h-5 text-emerald-500" />
                    <span>
                      {Math.floor(Math.max(1, Math.floor((Date.now() - lessonStartTime) / 1000)) / 60)}:
                      {String(Math.max(1, Math.floor((Date.now() - lessonStartTime) / 1000)) % 60).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão de Ação: RECEBER XP */}
              <Button 
                onClick={() => onFinish(100)}
                size="lg"
                className="w-full rounded-3xl py-7 h-auto font-black text-xl md:text-2xl shadow-[0_8px_0_0_#0284c7] active:translate-y-2 active:shadow-none transition-all bg-sky-500 hover:bg-sky-600 text-white uppercase tracking-wider"
              >
                RECEBER XP
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BARRA DE FEEDBACK INFERIOR (ESTILO DUOLINGO MAX) */}
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className={cn(
              "fixed bottom-0 left-0 right-0 p-6 md:p-8 border-t-4 z-50 backdrop-blur-xl transition-all",
              status === "correct" 
                ? "bg-emerald-500/95 border-emerald-400 text-white" 
                : "bg-rose-500/95 border-rose-400 text-white shadow-[0_-20px_50px_rgba(244,63,94,0.3)]"
            )}
          >
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-2xl shrink-0">
                    {status === "correct" ? "✅" : "⚠️"}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                      {status === "correct" ? labels.correct : labels.incorrect}
                    </h3>
                    <p className="text-sm md:text-base font-bold opacity-90">
                      <span className="font-extrabold uppercase">Significado:</span> "{currentExercise.portuguese}"
                    </p>
                  </div>
                </div>

                <Button
                  onClick={status === "correct" ? handleNext : () => setStatus("idle")}
                  size="lg"
                  className={cn(
                    "hidden md:flex rounded-3xl px-10 py-7 h-auto font-black text-xl shadow-2xl transition-all items-center gap-3 shrink-0",
                    status === "correct" 
                      ? "bg-white !text-emerald-700 hover:scale-105 active:scale-95" 
                      : "bg-white !text-rose-700 hover:scale-105 active:scale-95"
                  )}
                >
                  {status === "correct" ? labels.continue : labels.tryAgain}
                  {status === "correct" ? <LuArrowRight className="w-6 h-6" /> : <LuRotateCcw className="w-6 h-6" />}
                </Button>
              </div>

              {/* Botão Secundário: EXPLIQUE MINHA RESPOSTA (Estilo Duolingo Max AI) */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-white/20">
                <Button
                  onClick={() => setShowExplainModal(true)}
                  variant="outline"
                  className="w-full md:w-auto rounded-2xl py-6 px-8 bg-white/10 hover:bg-white/20 border-2 border-white/40 text-white font-black text-lg flex items-center justify-center gap-3 backdrop-blur-md shadow-lg transition-all"
                >
                  <LuSparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                  <span>EXPLIQUE MINHA RESPOSTA</span>
                </Button>

                <Button
                  onClick={status === "correct" ? handleNext : () => setStatus("idle")}
                  size="lg"
                  className={cn(
                    "w-full md:hidden rounded-2xl py-6 h-auto font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-3",
                    status === "correct" 
                      ? "bg-white !text-emerald-700 hover:scale-105 active:scale-95" 
                      : "bg-white !text-rose-700 hover:scale-105 active:scale-95"
                  )}
                >
                  {status === "correct" ? labels.continue : labels.tryAgain}
                  {status === "correct" ? <LuArrowRight className="w-6 h-6" /> : <LuRotateCcw className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL "EXPLIQUE MINHA RESPOSTA" (DUOLINGO MAX AI EXPLANATION) */}
      <AnimatePresence>
        {showExplainModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-background/80 backdrop-blur-md flex flex-col justify-end md:justify-center items-center p-0 md:p-6"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl bg-card border-t-4 md:border-2 border-border rounded-t-[40px] md:rounded-[40px] p-8 md:p-10 shadow-2xl space-y-8 max-h-[90vh] overflow-y-auto relative"
            >
              {/* Cabeçalho do Modal */}
              <div className="flex items-center justify-between border-b border-border/60 pb-6">
                <button
                  onClick={() => setShowExplainModal(false)}
                  className="p-3 rounded-full hover:bg-muted text-muted-foreground transition-colors flex items-center gap-2 font-bold text-sm"
                >
                  <LuArrowLeft size={24} />
                  <span>Voltar</span>
                </button>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-2xl text-primary font-black text-sm border border-primary/20">
                  <LuSparkles className="w-4 h-4 text-amber-500" />
                  <span>Explicação Didática</span>
                </div>
              </div>

              {/* Destaque da Frase com a Palavra-Chave */}
              <div className="bg-muted/40 border-2 border-border p-6 rounded-3xl text-center space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Sentença Analisada:</p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-black text-foreground">
                  {currentExercise.english.map((w, idx) => (
                    <span 
                      key={idx}
                      className={cn(
                        "px-3 py-1 rounded-xl transition-all",
                        idx === 0 ? "bg-sky-500 text-white shadow-md" : "bg-card border border-border"
                      )}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Principal da Explicação */}
              <div className="bg-card border-2 border-border p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <LuLightbulb className="w-6 h-6" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <h4 className="text-xl font-black text-foreground">Por que esta é a resposta correta?</h4>
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                      {currentExercise.explanation}
                    </p>
                  </div>
                </div>

                {/* Exemplos Práticos de Apoio */}
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50 space-y-3">
                  <p className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    📌 Exemplos Recorrentes em Prova (Cesgranrio):
                  </p>
                  <ul className="space-y-2 text-sm md:text-base font-bold text-foreground opacity-90">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>"{currentExercise.english.join(" ")}"</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                      <span>Tradução: "{currentExercise.portuguese}"</span>
                    </li>
                  </ul>
                </div>

                {/* Avaliação Útil / Não Útil 👍 👎 */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Esta explicação foi útil?</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFeedbackRating("like")}
                      className={cn(
                        "p-3 rounded-2xl border-2 transition-all flex items-center justify-center",
                        feedbackRating === "like" ? "bg-emerald-500 border-emerald-600 text-white scale-110" : "bg-card border-border hover:border-emerald-400 text-muted-foreground"
                      )}
                    >
                      <LuThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setFeedbackRating("dislike")}
                      className={cn(
                        "p-3 rounded-2xl border-2 transition-all flex items-center justify-center",
                        feedbackRating === "dislike" ? "bg-rose-500 border-rose-600 text-white scale-110" : "bg-card border-border hover:border-rose-400 text-muted-foreground"
                      )}
                    >
                      <LuThumbsDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Botão de Ação: CONTINUAR LIÇÃO */}
              <Button
                onClick={() => {
                  setShowExplainModal(false);
                  if (status === "correct") handleNext();
                  else setStatus("idle");
                }}
                size="lg"
                className="w-full rounded-2xl py-7 h-auto font-black text-2xl bg-sky-500 hover:bg-sky-600 text-white shadow-[0_6px_0_0_#0284c7] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider"
              >
                CONTINUAR LIÇÃO
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÃO DE CHECK (BOTTOM BAR FIXA) */}
      {status === "idle" && !isFinished && (
        <div className="p-4 md:p-6 bg-white dark:bg-zinc-900 md:dark:bg-transparent border-t border-border md:border-0 flex justify-center md:justify-end items-center fixed bottom-0 left-0 right-0 z-40 md:relative md:p-0 md:mt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] dark:shadow-none md:shadow-none transition-all duration-300">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-4 max-w-4xl mx-auto w-full">
          <Button 
            variant="ghost" 
            className="md:w-auto text-muted-foreground hover:bg-muted font-bold text-sm md:text-lg rounded-2xl px-3 md:px-6 flex-shrink-0"
            onClick={onBack}
          >
            {labels.skip}
          </Button>

          {status === "idle" ? (
            currentExercise.type !== "matching" && (
              <Button 
                disabled={
                  currentExercise.type === "reading" || currentExercise.type === "cloze" || currentExercise.type === "listening"
                    ? !selectedOption 
                    : selectedWords.length === 0
                }
                onClick={handleCheck}
                size="lg"
                className={cn(
                  "flex-1 md:flex-none md:w-64 rounded-2xl py-6 md:py-8 h-auto font-black text-xl md:text-2xl shadow-xl transition-all",
                  (currentExercise.type === "reading" || currentExercise.type === "cloze" || currentExercise.type === "listening" ? !!selectedOption : selectedWords.length > 0)
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_6px_0_0_#059669] active:translate-y-1 active:shadow-none" 
                    : "bg-muted text-muted-foreground cursor-not-allowed border-2 border-border/50"
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
                "flex-1 md:flex-none md:w-64 rounded-2xl py-6 md:py-8 h-auto font-black text-2xl shadow-xl transition-all animate-bounce-subtle",
                status === "correct" 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_6px_0_0_#059669]" 
                  : "bg-rose-500 hover:bg-rose-600 text-white shadow-[0_6px_0_0_be123c]"
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
    </motion.div>
  );
}
