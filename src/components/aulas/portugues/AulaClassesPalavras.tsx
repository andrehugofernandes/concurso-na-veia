"use client";

import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaProps,
  VideoModal,
  AulaTemplate,
} from "../shared";
import { getAllModuleVariants } from "@/lib/moduleColors";
import {
  QUIZ_M1_SUBSTANTIVO,
  QUIZ_M2_ADJETIVO_ARTIGO,
  QUIZ_M3_VERBO_I,
  QUIZ_M4_VERBO_II,
  QUIZ_M5_PRONOME_I,
  QUIZ_M6_PRONOME_II,
  QUIZ_M7_ADVERBIO,
  QUIZ_M8_PREPOSICAO_NUMERAL,
  QUIZ_M9_CONJUNCAO,
  QUIZ_M10_FINAL_CLASSES,
} from "./data/classes-palavras-quizzes";

import {
  LuBookOpen,
  LuCirclePlay,
  LuMonitor,
  LuBrain,
  LuMusic,
  LuCheck,
} from "react-icons/lu";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "O Substantivo" },
  { id: "modulo-2", label: "Módulo 2", title: "O Adjetivo e o Artigo" },
  { id: "modulo-3", label: "Módulo 3", title: "O Verbo (I)" },
  { id: "modulo-4", label: "Módulo 4", title: "O Verbo (II)" },
  { id: "modulo-5", label: "Módulo 5", title: "O Pronome (I)" },
  { id: "modulo-6", label: "Módulo 6", title: "O Pronome (II)" },
  { id: "modulo-7", label: "Módulo 7", title: "O Advérbio" },
  { id: "modulo-8", label: "Módulo 8", title: "A Preposição" },
  { id: "modulo-9", label: "Módulo 9", title: "A Conjunção" },
  { id: "modulo-10", label: "Módulo 10", title: "Arena de Elite" },
];

export default function AulaClassesPalavras(props: AulaProps) {
  const {
    onComplete,
    isCompleted,
    loading,
    currentProgress,
    onUpdateProgress,
    titulo,
    descricao,
    duracao,
    materiaNome,
    materiaCor,
    materiaId,
    prevTopico,
    nextTopico,
    xpGanho = 50,
  } = props;

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [mv, setMv] = useState<any>([]);

  useEffect(() => {
    setMv([undefined, ...getAllModuleVariants()]);
  }, []);

  // Sincronização inicial de progresso
  useEffect(() => {
    if (!hasSyncedInitial && !loading && currentProgress !== undefined && currentProgress > 0) {
      const doneCount = Math.floor((currentProgress / 100) * MODULE_DEFS.length);
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = useCallback((moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      setCompletedModules(newSet);

      const total = MODULE_DEFS.length;
      const done = newSet.size;
      const percent = Math.round((done / total) * 100);

      if (onUpdateProgress) {
        onUpdateProgress(percent);
      }

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        onComplete?.();
      }
    }
  }, [completedModules, onUpdateProgress, onComplete]);

  const isModuleUnlocked = useCallback((index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
  }, [completedModules, isCompleted]);

  if (mv.length === 0 || loading) return null;

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={Math.round((completedModules.size / MODULE_DEFS.length) * 100)}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >

      <TabsContent value="modulo-1" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={1} 
          titulo="O Substantivo" 
          descricao="A classe que nomeia os seres e as coisas." 
          variant={mv[1]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[1]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Substantivo...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[1]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Substantivo" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Substantivo", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M1: O Substantivo" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: M1</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">Foco total na classe gramatical!</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M1_SUBSTANTIVO || []} titulo="QUIZ: O Substantivo" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-1", score)} variant={mv[1]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-2" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={2} 
          titulo="O Adjetivo e o Artigo" 
          descricao="A classe que caracteriza e o determinante do substantivo." 
          variant={mv[2]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[2]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Adjetivo e o Artigo...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[2]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Adjetivo e o Artigo" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Adjetivo e o Artigo", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M2: O Adjetivo e o Artigo" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: M2</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">Foco total na classe gramatical!</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M2_ADJETIVO_ARTIGO || []} titulo="QUIZ: O Adjetivo e o Artigo" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-2", score)} variant={mv[2]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-3" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={3} 
          titulo="O Verbo (I)" 
          descricao="Estrutura e flexões básicas do motor da frase." 
          variant={mv[3]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[3]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Verbo (I)...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[3]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Verbo (I)" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Verbo (I)", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M3: O Verbo (I)" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: M3</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">Foco total na classe gramatical!</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M3_VERBO_I || []} titulo="QUIZ: O Verbo (I)" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-3", score)} variant={mv[3]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-4" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={4} 
          titulo="O Verbo (II)" 
          descricao="Tempos, modos e a complexidade verbal." 
          variant={mv[4]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="O Verbo: O Motor da Oração (Parte II)"
            description="Ação, estado, fenômeno e a complexidade temporal."
            variant={mv[4]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Verbo</strong> é a classe de palavra variável que exprime <strong>ação, estado, fenômeno da natureza ou processo</strong>, situando o fato no <strong>tempo</strong>. Nesta segunda parte, focamos na profundidade das correlações temporais e no uso estratégico dos modos verbais.</p>
            <p>Imagine o verbo como o <strong>'motor'</strong> de uma máquina. Enquanto os substantivos são as peças estáticas, o verbo é o que lhes dá movimento e propósito. Ele conecta o sujeito ao seu destino, transformando uma lista de nomes em uma narrativa viva.</p>
            <p>A estrutura verbal se divide em <strong>Radical</strong>, <strong>Vogal Temática</strong> e <strong>Desinências</strong>. As flexões abrangem três <strong>Modos</strong> (Indicativo, Subjuntivo e Imperativo), três <strong>Vozes</strong> (Ativa, Passiva e Reflexiva).</p>
            <p>Em manuais de <strong>operação da Petrobras</strong>, o uso do modo <strong>Imperativo</strong> e do <strong>Infinitivo</strong> é vital para a segurança operacional. Instruções como 'Verifique a pressão' não admitem ambiguidade temporal. Um erro na interpretação de um tempo verbal pode ser crítico.</p>
            <p>A <strong>Cesgranrio</strong> é famosa por cobrar a <strong>Correlação Verbal</strong> e os tempos do <strong>Subjuntivo</strong>. A banca testa se o candidato sabe que um futuro do pretérito exige um imperfeito do subjuntivo correspondente ('Eu iria se você viesse').</p>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: SUB.RE.</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: O Pronome <strong>SUB</strong>stitui ou <strong>RE</strong>fere-se.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[4]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Verbo (II)...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[4]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Verbo (II)" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Verbo (II)", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M4: O Verbo (II)" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: SUB.RE.</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">O Pronome <strong>SUB</strong>stitui ou <strong>RE</strong>fere-se.</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M4_VERBO_II || []} titulo="QUIZ: O Verbo (II)" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-4", score)} variant={mv[4]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-5" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={5} 
          titulo="O Pronome (I)" 
          descricao="O substituto estratégico e o mestre da coesão textual." 
          variant={mv[5]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="O Pronome: O Mestre da Coesão"
            description="Substituição, referência e a economia vocabular."
            variant={mv[5]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Pronome</strong> é a classe de palavra variável que tem como função primordial <strong>substituir</strong> ou <strong>referir-se</strong> a um substantivo (ou a uma oração inteira). Diferente do substantivo, que possui significado léxico próprio, o pronome possui significado <strong>gramatical ou de contexto</strong>.</p>
            <p>Imagine o pronome como o <strong>'dublê'</strong> de um ator principal (o substantivo). Quando o substantivo precisa descansar para não cansar o leitor, o pronome entra em cena para manter a história andando sem repetições exaustivas. Sem os pronomes, textos seriam exaustivos.</p>
            <p>A tipologia pronominal é vasta: <strong>Pessoais</strong> (eu, tu, ele), <strong>Possessivos</strong> (meu, teu, seu), <strong>Demonstrativos</strong> (este, esse, aquele), <strong>Relativos</strong> (que, cujo) e <strong>Indefinidos</strong> (alguém, tudo).</p>
            <p>Em manuais da <strong>Petrobras</strong>, o uso de pronomes demonstrativos e relativos é uma questão de <strong>segurança</strong>. Ao ler 'O inspetor identificou a falha no motor; <strong>esta</strong> exige reparo', o pronome 'esta' refere-se à falha, evitando confusões perigosas.</p>
            <p>A <strong>Cesgranrio</strong> foca intensamente em <strong>Colocação Pronominal</strong> e no uso do pronome relativo <strong>CUJO</strong>. Lembre-se que 'cujo' indica posse, nunca aceita artigo após si e concorda com o 'possuído'.</p>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: F.E.A.</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: O Verbo foca na <strong>F</strong>lexão, <strong>E</strong>strutura e <strong>A</strong>specto.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[5]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Pronome (I)...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[5]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Pronome (I)" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Pronome (I)", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M5: O Pronome (I)" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: F.E.A.</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">O Verbo foca na <strong>F</strong>lexão, <strong>E</strong>strutura e <strong>A</strong>specto.</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M5_PRONOME_I || []} titulo="QUIZ: O Pronome (I)" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-5", score)} variant={mv[5]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-6" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={6} 
          titulo="O Pronome (II)" 
          descricao="Demonstrativos, Relativos e Indefinidos." 
          variant={mv[6]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="O Pronome (II): Referenciação Avançada"
            description="Domínio dos relativos e demonstrativos no texto técnico."
            variant={mv[6]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A segunda parte do estudo dos <strong>Pronomes</strong> foca nos elementos de coesão anafórica e catafórica. Os pronomes <strong>Relativos</strong> (que, qual, cujo, onde) são fundamentais para criar orações subordinadas adjetivas, enquanto os <strong>Demonstrativos</strong> situam o objeto no tempo, espaço ou texto.</p>
            <p>Nesta fase, o pronome atua como o <strong>'GPS'</strong> do leitor. Ele indica onde estamos no texto e a quem exatamente estamos nos referindo, impedindo que a atenção do usuário se perca em frases ambíguas ou mal estruturadas.</p>
            <p>O domínio do pronome <strong>CUJO</strong> é o divisor de águas entre o candidato amador e o profissional. Ele é o único pronome que exige um substantivo antes e depois, indicando uma relação de posse indissolúvel entre ambos.</p>
            <p>Em <strong>relatórios de incidentes</strong> da Petrobras, a precisão do pronome relativo 'onde' (apenas para lugares físicos) vs 'em que' (para situações) é monitorada para manter o rigor técnico da comunicação escrita.</p>
            <p>A <strong>Cesgranrio</strong> foca na substituição de elementos por pronomes relativos adequados e na análise do termo antecedente. Errar o 'cujo' ou usar 'onde' para tempo é um erro fatal na redação e nas questões de gramática.</p>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: C.I.L.A.</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: O Advérbio foca na <strong>C</strong>ircunstância, <strong>I</strong>nvariabilidade, <strong>L</strong>ógica e <strong>A</strong>djunto.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[6]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Pronome (II)...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[6]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Pronome (II)" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Pronome (II)", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M6: O Pronome (II)" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: C.I.L.A.</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">O Advérbio foca na <strong>C</strong>ircunstância, <strong>I</strong>nvariabilidade, <strong>L</strong>ógica e <strong>A</strong>djunto.</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M6_PRONOME_II || []} titulo="QUIZ: O Pronome (II)" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-6", score)} variant={mv[6]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-7" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={7} 
          titulo="O Advérbio" 
          descricao="A circunstância modificadora e invariável." 
          variant={mv[7]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="O Advérbio: A Circunstância"
            description="O modificador invariável que dá tom e precisão às ações."
            variant={mv[7]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Advérbio</strong> é a classe de palavra <strong>invariável</strong> que especifica a <strong>circunstância</strong> em que ocorre um fato (tempo, lugar, modo, causa). Ele modifica o <strong>verbo</strong>, o <strong>adjetivo</strong> ou um <strong>outro advérbio</strong>, mantendo-se estático.</p>
            <p>Pense no advérbio como o <strong>'filtro'</strong> de uma câmera. Ele não muda o objeto, mas altera a forma como o percebemos. Dizer que alguém está 'cansado' é uma coisa; dizer que está <strong>'extremamente'</strong> cansado muda a intensidade.</p>
            <p>A classificação é semântica: <strong>Lugar</strong> (aqui, lá), <strong>Tempo</strong> (ontem, logo), <strong>Modo</strong> (bem, calmamente), <strong>Intensidade</strong> (muito). Muitos terminam em <strong>'-mente'</strong>.</p>
            <p>Em relatórios técnicos da <strong>Petrobras</strong>, advérbios de lugar e modo são cruciais. Ao descrever que uma válvula opera <strong>'intermitentemente'</strong> em vez de <strong>'continuamente'</strong>, o técnico fornece dados vitais.</p>
            <p>A <strong>Cesgranrio</strong> foca na distinção entre o <strong>Advérbio</strong> e o <strong>Adjetivo</strong> em funções 'camaleão'. Lembre-se do teste de ouro: se a palavra variar para o plural, é adjetivo; se ficar estática, é advérbio.</p>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: L.I.G.A.</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: A Preposição <strong>L</strong>iga, <strong>I</strong>ndica, <strong>G</strong>overna e <strong>A</strong>ssocia.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[7]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Advérbio...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[7]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Advérbio" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Advérbio", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M7: O Advérbio" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: L.I.G.A.</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">A Preposição <strong>L</strong>iga, <strong>I</strong>ndica, <strong>G</strong>overna e <strong>A</strong>ssocia.</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M7_ADVERBIO || []} titulo="QUIZ: O Advérbio" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-7", score)} variant={mv[7]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-8" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={8} 
          titulo="A Preposição" 
          descricao="O elo de subordinação essencial para a regência." 
          variant={mv[8]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="A Preposição: O Elo de Ligação"
            description="Subordinação, regência e o caminho para a crase."
            variant={mv[8]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Preposição</strong> é a classe de palavra <strong>invariável</strong> que liga dois termos, estabelecendo uma relação de dependência ou subordinação. O primeiro termo é o regente e o segundo o regido.</p>
            <p>Imagine a preposição como um <strong>'elo de corrente'</strong>. Ela não tem significado completo sozinha, mas é essencial para que os outros termos funcionem juntos. É ela que nos diz se o café é 'com' ou 'sem' açúcar.</p>
            <p>As preposições podem ser <strong>Essenciais</strong> (ante, após, até, com, contra, de, por, sem). Elas também se unem a outras palavras por <strong>Combinação</strong> (ao) ou <strong>Contração</strong> (do).</p>
            <p>No cotidiano da <strong>Petrobras</strong>, as preposições regem a lógica dos <strong>contratos</strong>. A diferença entre 'inspeção DA plataforma' (posse) e 'inspeção NA plataforma' (lugar) define a responsabilidade jurídica.</p>
            <p>A <strong>Cesgranrio</strong> foca na <strong>Regência Verbal e Nominal</strong>, testando se o candidato sabe qual preposição cada termo exige. O domínio das preposições é o pilar fundamental para não errar a <strong>Crase</strong>.</p>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: C.O.N.E.</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: A Conjunção <strong>C</strong>onecta, <strong>O</strong>rdena, <strong>N</strong>exa e <strong>E</strong>strutura.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[8]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para A Preposição...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[8]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: A Preposição" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "A Preposição", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M8: A Preposição" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: C.O.N.E.</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">A Conjunção <strong>C</strong>onecta, <strong>O</strong>rdena, <strong>N</strong>exa e <strong>E</strong>strutura.</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M8_PREPOSICAO_NUMERAL || []} titulo="QUIZ: A Preposição" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-8", score)} variant={mv[8]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-9" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={9} 
          titulo="A Conjunção" 
          descricao="O cimento textual que articula ideias." 
          variant={mv[9]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="A Conjunção: O Cimento do Texto"
            description="Conectivos que articulam ideias, causas e consequências."
            variant={mv[9]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>Conjunção</strong> é a classe de palavra <strong>invariável</strong> que liga orações ou termos de mesma função, estabelecendo relações coordenadas ou subordinadas. Ela é o arquiteto que constrói o raciocínio.</p>
            <p>Imagine a conjunção como o <strong>'cimento'</strong> de uma parede de tijolos. Sem o cimento, os tijolos caem ou ficam amontoados sem ordem. A conjunção define se um fato é a <strong>causa</strong> ou a <strong>oposição</strong>.</p>
            <p>Dividem-se em <strong>Coordenativas</strong> (independentes) e <strong>Subordinativas</strong> (dependentes). Cada uma carrega um valor semântico que altera o rumo da argumentação, sendo a ferramenta primordial da coesão.</p>
            <p>Em <strong>pareceres técnicos</strong> da Petrobras, o uso de conjunções conclusivas e concessivas é fundamental. 'Embora o custo seja alto, a manutenção é necessária' usa a concessão estrategicamente.</p>
            <p>A <strong>Cesgranrio</strong> ama questões de <strong>valor semântico</strong> das conjunções. Frequentemente pede para substituir um 'conquanto' por um 'embora' ou um 'porquanto' por um 'porque'.</p>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: E.M.O.</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: A Interjeição expressa <strong>E</strong>moção, <strong>M</strong>ovimento e <strong>O</strong>rdem.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[9]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para A Conjunção...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[9]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: A Conjunção" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "A Conjunção", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M9: A Conjunção" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: E.M.O.</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">A Interjeição expressa <strong>E</strong>moção, <strong>M</strong>ovimento e <strong>O</strong>rdem.</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M9_CONJUNCAO || []} titulo="QUIZ: A Conjunção" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-9", score)} variant={mv[9]} />
        </section>
      </TabsContent>

      <TabsContent value="modulo-10" className="space-y-12 mt-12">
        <ModuleBanner 
          numero={10} 
          titulo="O Numeral e Conclusão" 
          descricao="A precisão da contagem e o domínio da Morfologia." 
          variant={mv[10]} 
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-foreground">
          <ModuleSectionHeader
            index={1}
            title="O Numeral e a Interjeição"
            description="A precisão dos dados e a força da emoção."
            variant={mv[10]}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Numeral</strong> indica quantidade exata ou posição, trazendo a frieza dos dados. A <strong>Interjeição</strong> exprime emoções ou apelos súbitos, funcionando como uma unidade de sentido completa e condensada.</p>
            <p>Imagine o numeral como a <strong>'régua'</strong> e a interjeição como o <strong>'emoji'</strong> do texto. Um traz a exatidão métrica necessária para projetos técnicos, enquanto o outro traz o colorido emocional da linguagem humana.</p>
            <p>Os numerais classificam-se em Cardinais, Ordinais, Fracionários e Multiplicativos. As interjeições são invariáveis e quase sempre marcadas pelo ponto de <strong>exclamação</strong>.</p>
            <p>Na <strong>Petrobras</strong>, a precisão dos numerais é o coração da gestão de estoques, enquanto as interjeições de <strong>apelo</strong> (Cuidado! Atenção!) são vitais para a segurança e prevenção de acidentes em campo.</p>
            <p>A <strong>Cesgranrio</strong> foca na escrita por extenso e concordância dos numerais, além de testar a percepção do tom emocional em textos literários através das interjeições.</p>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">🛡️ O Mnemônico de Ouro: C.O.F.M.</h4>
              <p className="text-muted-foreground mr-1">
                Lembre-se: O Numeral indica <strong>C</strong>ardinal, <strong>O</strong>rdinal, <strong>F</strong>racionário e <strong>M</strong>ultiplicativo.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader index={2} title="Conteúdo de Elite" variant={mv[10]} />
          <p className="text-lg text-muted-foreground italic">Conteúdo técnico em processo de padronização Ultimate para O Numeral e Conclusão...</p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Mesa de Revisão" variant={mv[10]} />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuCirclePlay,
                content: (
                   <div className="w-full flex flex-col items-center py-6">
                    <VideoModal videoId="dQw4w9WgXcQ" title="Resumo: O Numeral e Conclusão" duration="12:00" thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Resumo Visual",
                icon: LuMonitor,
                content: (
                   <ModuleSummaryCarouselNew tituloAula="Gramática de Elite" materia="Português" images={[ { title: "O Numeral e Conclusão", type: "Ponto de Atenção", placeholderColor: "#3b82f6" } ]} moduloNome="M10: O Numeral e Conclusão" />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                   <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-2xl font-black mb-4 text-amber-600 dark:text-amber-500">Mnemônico ULTIMATE: C.O.F.M.</h3>
                    <p className="text-xl text-muted-foreground italic max-w-xl mx-auto">O Numeral indica <strong>C</strong>ardinal, <strong>O</strong>rdinal, <strong>F</strong>racionário e <strong>M</strong>ultiplicativo.</p>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                  </div>
                ),
              },
              {
                id: "musica",
                label: "Música (Áudio)",
                icon: LuMusic,
                content: (
                  <div className="p-8 text-center space-y-4">
                    <LuMusic className="w-12 h-12 text-blue-500 mx-auto" />
                    <h4 className="text-xl font-bold">Resumo Cantado em Breve</h4>
                    <p className="text-muted-foreground">Estamos afinando os últimos versos deste módulo.</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo questoes={QUIZ_M10_FINAL_CLASSES || []} titulo="QUIZ: O Numeral e Conclusão" icone="🎯" onComplete={(score) => handleModuleComplete("modulo-10", score)} variant={mv[10]} />
        </section>
      </TabsContent>

      <TabsContent value="conclusao" className="space-y-12 mt-12">
        <section className="mt-24 mb-12">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-800/30 rounded-3xl p-12 text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-800 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <LuBookOpen className="text-5xl text-blue-600 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic underline decoration-blue-500 decoration-4 underline-offset-8">
                Morfologia Dominada!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Você concluiu a maratona das 10 classes de palavras. Agora você
                possui a base sólida para enfrentar sintaxe, regência e
                concordância na Cesgranrio!
              </p>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                onClick={() => {
                  if (onComplete) onComplete();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white border-0 font-black text-xl px-16 py-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest flex items-center gap-4 mx-auto"
              >
                Concluir Aula de Elite <LuCheck className="text-2xl" />
              </Button>
            </div>
          </div>
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}