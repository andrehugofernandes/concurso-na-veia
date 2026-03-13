"use client";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  LuBookOpen,
  LuLayers,
  LuZap,
  LuInfo,
  LuMusic,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuTarget,
} from "react-icons/lu";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  VideoModal,
  QuizInterativo,
  ModuleBanner,
  StickyModuleNav,
  LessonTabs,
  MusicPlayerCard,
  ContentAccordion,
  ModuleDef,
  ModuleSectionHeader,
  ModuleSummaryCarouselNew,
  AulaProps,
  AulaTemplate,
  FlipCard,
} from "../shared";

import {
  QUIZ_ESSENCIAIS_POOL,
  QUIZ_INTEGRANTES_POOL,
  QUIZ_ACESSORIOS_POOL,
  QUIZ_LABORATORIO_POOL,
} from "./data/sintaxe-quizzes";

const MODULE_DEFS: ModuleDef[] = [
  { id: "modulo-1", label: "MÃ³dulo 1", title: "Termos Essenciais" },
  { id: "modulo-2", label: "MÃ³dulo 2", title: "Termos Integrantes" },
  { id: "modulo-3", label: "MÃ³dulo 3", title: "Termos AcessÃ³rios" },
  { id: "modulo-4", label: "MÃ³dulo 4", title: "Lab. Cesgranrio" },
  { id: "modulo-5", label: "MÃ³dulo 5", title: "SÃ­ntese Final" },
];

export default function AulaSintaxe({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
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
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
  const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
  const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
  const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
  const [qMod5, setQMod5] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQMod1(getRandomQuestions(QUIZ_ESSENCIAIS_POOL, 8));
    setQMod2(getRandomQuestions(QUIZ_INTEGRANTES_POOL, 6));
    setQMod3(getRandomQuestions(QUIZ_ACESSORIOS_POOL, 8));
    setQMod4(getRandomQuestions(QUIZ_LABORATORIO_POOL, 10));
    setQMod5(
      getRandomQuestions(
        [
          ...QUIZ_ESSENCIAIS_POOL,
          ...QUIZ_INTEGRANTES_POOL,
          ...QUIZ_ACESSORIOS_POOL,
        ],
        15,
      ),
    );
  }, []);

  const isModuleUnlocked = useCallback(
    (index: number) => {
      if (index === 0) return true;
      return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
    },
    [completedModules, isCompleted],
  );

  const handleModuleComplete = useCallback(
    (moduleId: string, score: number) => {
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
    },
    [completedModules, onComplete, onUpdateProgress],
  );

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
      loading={loading}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* MÃDULO 1: TERMOS ESSENCIAIS */}
        <TabsContent value="modulo-1" className="space-y-[50px]">
          <ModuleBanner
            numero={1}
            titulo="Termos Essenciais"
            descricao="O esqueleto da oraÃ§Ã£o: Sujeito e Predicado."
            gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Sujeito e Predicado"
                description="Os elementos que sustentam o sentido de qualquer frase."
                variant="indigo"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  frente={
                    <div className="h-full flex items-center justify-center font-bold text-xl">
                      Sujeito
                    </div>
                  }
                  verso={
                    <div className="p-4 text-center text-sm">
                      O termo sobre o qual se faz uma declaraÃ§Ã£o.
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="h-full flex items-center justify-center font-bold text-xl">
                      Predicado
                    </div>
                  }
                  verso={
                    <div className="p-4 text-center text-sm">
                      Tudo que se declara sobre o sujeito.
                    </div>
                  }
                />
              </div>

              <ContentAccordion
                titulo="ð Tipos de Sujeito"
                icone={<LuTarget className="w-6 h-6" />}
                corIndicador="bg-indigo-500"
                slides={[
                  {
                    titulo: "Sujeito Simples vs. Composto",
                    icone: "ð¥",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          O nÃºcleo define a quantidade: um nÃºcleo (Simples),
                          dois ou mais (Composto).
                        </p>
                        <AlertBox tipo="info" titulo="Exemplo">
                          A Petrobras cresce. (Simples) <br />O petrÃ³leo e o gÃ¡s
                          subirÃ£o. (Composto)
                        </AlertBox>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            <QuizInterativo
              numero={1}
              titulo="Termos Essenciais"
              icone="ð¯"
              questoes={qMod1}
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
              variant="indigo"
            />
          </div>
        </TabsContent>

        {/* MÃDULO 2: TERMOS INTEGRANTES */}
        <TabsContent value="modulo-2" className="space-y-[50px]">
          <ModuleBanner
            numero={2}
            titulo="Termos Integrantes"
            descricao="Objetos, Complemento Nominal e Agente da Passiva."
            gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={2}
              titulo="Termos Integrantes"
              icone="ð§©"
              questoes={qMod2}
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
              variant="indigo"
            />
          </div>
        </TabsContent>

        {/* MÃDULO 3: TERMOS ACESSÃRIOS */}
        <TabsContent value="modulo-3" className="space-y-[50px]">
          <ModuleBanner
            numero={3}
            titulo="Termos AcessÃ³rios"
            descricao="As joias da oraÃ§Ã£o: Adjuntos, Aposto e Vocativo."
            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={3}
              titulo="Termos AcessÃ³rios"
              icone="ð"
              questoes={qMod3}
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
              variant="emerald"
            />
          </div>
        </TabsContent>

        {/* MÃDULO 4: LAB. CESGRANRIO */}
        <TabsContent value="modulo-4" className="space-y-[50px]">
          <ModuleBanner
            numero={4}
            titulo="LaboratÃ³rio Cesgranrio"
            descricao="Treinamento intensivo com anÃ¡lise sintÃ¡tica avanÃ§ada."
            gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={4}
              titulo="Lab. Cesgranrio"
              icone="ð¬"
              questoes={qMod4}
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
              variant="amber"
            />
          </div>
        </TabsContent>

        {/* MÃDULO 5: SÃNTESE FINAL */}
        <TabsContent value="modulo-5" className="space-y-[50px]">
          <ModuleBanner
            numero={5}
            titulo="SÃ­ntese EstratÃ©gica"
            descricao="A visÃ£o panorÃ¢mica da Sintaxe."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Resumo Visual"
                description="O mapa final da oraÃ§Ã£o."
                variant="rose"
              />
              <ModuleSummaryCarouselNew
                moduloNome="Resumo"
                tituloAula="Sintaxe"
                materia="PortuguÃªs"
                images={[
                  {
                    title: "Mapa Mental",
                    type: "Esquema",
                    placeholderColor: "bg-rose-100",
                  },
                ]}
              />
            </section>
            <QuizInterativo
              numero={5}
              titulo="Simulado de SÃ­ntese"
              icone="ð"
              questoes={qMod5}
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
              variant="rose"
            />
          </div>
        </TabsContent>
      </Tabs>
    </AulaTemplate>
  );
}
