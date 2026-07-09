"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LuVolume2, 
  LuSparkles, 
  LuTrophy, 
  LuPlay, 
  LuZap, 
  LuCheck, 
  LuArrowRight,
  LuLayers,
  LuX,
  LuHeadphones,
  LuTarget
} from "react-icons/lu";
import ScrollAnimatedHeader from "./ScrollAnimatedHeader";
import AnimatedElement from "../ui/AnimatedElement";
import PetroLingoExercise, { SentenceData } from "../aulas/ingles/PetroLingoExercise";

// Dados da Lição 1 do PetroLingo para a demonstração na Landing Page
const LESSON_1_DEMO_EXERCISES: SentenceData[] = [
  {
    id: "demo-l1-e1",
    portuguese: "O engenheiro trabalha na refinaria.",
    english: ["The", "engineer", "works", "at", "the", "refinery."],
    options: ["médico", "técnico", "plataforma", "escritório", "de", "uma"],
    explanation: "Em inglês técnico de Petróleo & Gás, 'engineer' (engenheiro) e 'refinery' (refinaria) são vocabulários fundamentais cobrados pela Cesgranrio."
  },
  {
    id: "demo-l1-e2",
    type: "cloze",
    clozePrefix: "The workers stay",
    clozeSuffix: "the platform.",
    portuguese: "Complete com a preposição correta para 'na plataforma':",
    english: ["on"],
    options: ["in", "on", "at", "under"],
    explanation: "Para superfícies e estruturas como plataformas ('platform'), a preposição correta é 'on'."
  },
  {
    id: "demo-l1-e3",
    type: "matching",
    portuguese: "Combine os pares de termos da Petrobras:",
    english: ["Done"],
    pairs: [
      { en: "Oil", pt: "Petróleo" },
      { en: "Safety", pt: "Segurança" },
      { en: "Drill", pt: "Simulado" },
      { en: "Task", pt: "Tarefa" }
    ],
    explanation: "Associação rápida de termos técnicos desenvolve a agilidade de leitura durante a prova."
  },
  {
    id: "demo-l1-e4",
    portuguese: "Embora o sistema falhou, o backup funcionou.",
    english: ["Although", "the", "system", "failed,", "the", "backup", "worked."],
    explanation: "'Although' (Embora) é o conector lógico de oposição mais cobrado em provas da Cesgranrio."
  },
  {
    id: "demo-l1-e5",
    type: "listening",
    portuguese: "Listening: Monte a frase que você ouviu:",
    english: ["Although", "the", "system", "failed,", "the", "backup", "worked."],
    options: ["However,", "report", "slowly", "was"],
    explanation: "Ao ouvir e ordenar os elementos técnicos, você treina seu cérebro para capturar o sentido de relatórios operacionais em inglês."
  }
];

export default function PetroLingoShowcaseSection() {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  const handleCompleteDemo = (xp: number) => {
    setEarnedXp(xp);
    setDemoCompleted(true);
    setIsPlayingDemo(false);
  };

  return (
    <section id="petrolingo" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-slate-200 dark:border-white/5">
      {/* Elementos decorativos de fundo com suporte dinâmico ao Skin System */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Cabeçalho da Seção */}
        <ScrollAnimatedHeader
          badgeText="EXCLUSIVO PLANO ELITE"
          badgeColorClass="border-primary/20 bg-primary/10 text-primary font-bold"
          titleText={
            <>
              PetroLingo: Inglês Técnico <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'var(--primary-gradient)' }}
              >
                Gamificado para a Petrobras
              </span>
            </>
          }
          subtitleText="Substitua o decoreba tradicional por uma experiência interativa estilo Duolingo, focada 100% no vocabulário de Petróleo & Gás e nos conectores lógicos da Cesgranrio."
          className="mb-16 text-center max-w-3xl mx-auto"
        />

        <AnimatedElement delay={0.2} className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Coluna da Esquerda: Recursos e diferenciais */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 transition-all hover:border-primary/40">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <LuHeadphones className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Áudio Nativo & Treino de Listening</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Escute a pronúncia exata de palavras técnicas e relatórios operacionais em velocidade normal ou reduzida.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 transition-all hover:border-primary/40">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <LuLayers className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Drag & Drop de Frases Técnicas</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Arraste e ordene termos de refinaria, plataformas e segurança offshore com resposta instantânea.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 transition-all hover:border-amber-500/40">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 shadow-sm">
                  <LuTrophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Gamificação com XP & Personagens</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ganhe pontos de experiência, suba na liga dos concurseiros e interaja com os avatares operacionais da Petrobras.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                onClick={() => setIsPlayingDemo(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-black text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 group"
                style={{ backgroundImage: 'var(--primary-gradient)' }}
              >
                <LuPlay className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                Experimentar Lição 1 em Ação
              </button>

              <a
                href="#pricing"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-foreground font-bold text-sm text-center hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
              >
                Ver Planos Elite →
              </a>
            </div>
          </div>

          {/* Coluna da Direita: Mockup / Interface Interativa */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border-2 border-primary/20 bg-slate-950/90 shadow-2xl p-4 md:p-6 backdrop-blur-xl overflow-hidden group">
              {/* Barra de título estilo App / Browser */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs font-mono text-primary font-bold uppercase tracking-wider">
                    PetroLingo v2.0 • Demonstration Mode
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold">
                  <LuSparkles className="w-3.5 h-3.5" />
                  Lição 1 Liberada
                </div>
              </div>

              {/* Card da Prévia Interativa */}
              <div className="relative bg-slate-900/90 border border-white/10 rounded-2xl p-6 md:p-8 min-h-[360px] flex flex-col justify-between overflow-hidden">
                {!isPlayingDemo && !demoCompleted ? (
                  <div className="my-auto text-center space-y-2">
                    <div className="w-56 h-56 md:w-64 md:h-64 mx-auto flex items-center justify-center -my-6 md:-my-10 relative z-10">
                      <img 
                        src="/images/petrolingo/petrolingo.png" 
                        alt="PetroLingo" 
                        className="w-full h-full object-contain filter drop-shadow-2xl scale-110"
                      />
                    </div>

                    <div className="space-y-2 relative z-20">
                      <span className="text-xs font-black uppercase tracking-widest text-primary">
                        Unidade 1: The Linker Kingdom
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-white">
                        Pronto para testar o PetroLingo?
                      </h3>
                      <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                        Experimente agora mesmo os 5 exercícios interativos da Lição 1 diretamente na sua tela!
                      </p>
                    </div>

                    <button
                      onClick={() => setIsPlayingDemo(true)}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-base shadow-lg hover:scale-105 active:scale-95 transition-all"
                      style={{ backgroundImage: 'var(--primary-gradient)' }}
                    >
                      <LuPlay className="w-5 h-5 fill-white" />
                      Iniciar Lição 1 (Demonstração)
                    </button>
                  </div>
                ) : demoCompleted ? (
                  <div className="my-auto text-center space-y-6 py-6 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-500/40 text-amber-400 flex items-center justify-center shadow-2xl">
                      <LuTrophy className="w-10 h-10 animate-bounce" />
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase">
                        <LuZap className="w-4 h-4 fill-amber-400" /> +{earnedXp} XP GANHOS!
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white">
                        Parabéns! Lição 1 Concluída!
                      </h3>
                      <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                        Você acabou de dominar o primeiro módulo de conectores lógicos para o concurso da Petrobras.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                      <button
                        onClick={() => {
                          setDemoCompleted(false);
                          setIsPlayingDemo(true);
                        }}
                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
                      >
                        Refazer Lição 1
                      </button>
                      <a
                        href="#pricing"
                        className="px-8 py-3 rounded-xl text-white hover:text-white font-black text-sm shadow-lg transition-all"
                        style={{ backgroundImage: 'var(--primary-gradient)' }}
                      >
                        Desbloquear Todas as Lições no Plano Elite
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    {/* Visualizador do Exercício ao Vivo */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                      <span className="text-xs font-bold text-slate-400">DEMO AO VIVO — LIÇÃO 1</span>
                      <button
                        onClick={() => setIsPlayingDemo(false)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Fechar demonstração"
                      >
                        <LuX className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="max-h-[520px] overflow-y-auto pr-1">
                      <PetroLingoExercise
                        exercises={LESSON_1_DEMO_EXERCISES}
                        onFinish={handleCompleteDemo}
                        onBack={() => setIsPlayingDemo(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>

      {/* Modal Tela Cheia da Lição 1 (quando aberto) */}
      <AnimatePresence>
        {isPlayingDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-2xl flex flex-col p-4 md:p-8 overflow-y-auto"
          >
            <div className="max-w-4xl w-full mx-auto my-auto bg-card border-2 border-border rounded-[36px] p-6 md:p-10 shadow-2xl relative">
              <button
                onClick={() => setIsPlayingDemo(false)}
                className="absolute top-6 right-6 p-3 rounded-2xl bg-muted hover:bg-muted/80 text-foreground transition-colors z-20"
                title="Sair do exercício"
              >
                <LuX className="w-6 h-6" />
              </button>

              <PetroLingoExercise
                exercises={LESSON_1_DEMO_EXERCISES}
                onFinish={handleCompleteDemo}
                onBack={() => setIsPlayingDemo(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
