"use client";

import { getAllModuleVariants, getModuleVariant } from "@/lib/moduleColors";
import { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LuCirclePlay as LuPlayCircle,
  LuBookOpen,
  LuMusic,
  LuBrain,
  LuTarget,
  LuLayers,
  LuZap,
  LuShieldCheck,
  LuChevronRight,
  LuArrowRight,
  LuCheck,
  LuTriangleAlert as LuAlertTriangle,
  LuClock,
  LuPenTool,
  LuUser,
  LuHeart,
  LuMapPin,
  LuBuilding,
  LuAnchor,
  LuRuler,
  LuBan,
  LuShuffle,
  LuPlay,
  LuImage,
  LuVolume2,
} from "react-icons/lu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  FlipCard,
  QuizInterativo,
  TimelineItem,
  ModuleBanner,
  CardCarousel,
  StickyModuleNav,
  ModuleSectionHeader,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  ProgressIndicator,
  AulaProps,
  VideoModal,
  AulaTemplate,
  ModuleConsolidation,
  TabbedContent,
  SectionTitle,
  ComparisonSide,
} from "../shared";

import {
  QUIZ_M1_CONCEITO,
  QUIZ_M2_TESTE_MASCULINO,
  QUIZ_M3_PROIBIDO_VERBOS,
  QUIZ_M4_PROIBIDO_PRONOMES,
  QUIZ_M5_FACULTATIVO_NOMES,
  QUIZ_M6_FACULTATIVO_POSSESSIVOS,
  QUIZ_M7_HORAS_MEDIDAS,
  QUIZ_M8_CASOS_ESPECIAIS,
  QUIZ_M9_DEMONSTRATIVOS,
  QUIZ_M10_SIMULADO,
} from "./data/crase-quizzes";

/**
 * AULA: Crase - Língua Portuguesa
 * Padrão: Ultimate V4.1
 */

const mv = ["blue", ...getAllModuleVariants()] as any;

export default function AulaCrase({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress = 0,
  onUpdateProgress,
}: AulaProps) {
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", title: "Conceito e Regra Geral" },
    { id: "modulo-2", label: "Módulo 2", title: "Identificação: Teste do Masculino" },
    { id: "modulo-3", label: "Módulo 3", title: "Casos Proibidos I: Verbos" },
    { id: "modulo-4", label: "Módulo 4", title: "Casos Proibidos II: Pronomes" },
    { id: "modulo-5", label: "Módulo 5", title: "Crase Facultativa com Nomes Próprios" },
    { id: "modulo-6", label: "Módulo 6", title: "Crase Facultativa com Possessivos" },
    { id: "modulo-7", label: "Módulo 7", title: "Casos Especiais I: Horas e Medidas" },
    { id: "modulo-8", label: "Módulo 8", title: "Casos Especiais II: Palavras Especiais" },
    { id: "modulo-9", label: "Módulo 9", title: "Pronomes Demonstrativos" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Integrado" },
  ] as const;

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);
  const [quizM4, setQuizM4] = useState<QuizQuestion[]>([]);
  const [quizM5, setQuizM5] = useState<QuizQuestion[]>([]);
  const [quizM6, setQuizM6] = useState<QuizQuestion[]>([]);
  const [quizM7, setQuizM7] = useState<QuizQuestion[]>([]);
  const [quizM8, setQuizM8] = useState<QuizQuestion[]>([]);
  const [quizM9, setQuizM9] = useState<QuizQuestion[]>([]);
  const [quizM10, setQuizM10] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_CONCEITO, 10));
      setQuizM2(getRandomQuestions(QUIZ_M2_TESTE_MASCULINO, 10));
      setQuizM3(getRandomQuestions(QUIZ_M3_PROIBIDO_VERBOS, 10));
      setQuizM4(getRandomQuestions(QUIZ_M4_PROIBIDO_PRONOMES, 10));
      setQuizM5(getRandomQuestions(QUIZ_M5_FACULTATIVO_NOMES, 10));
      setQuizM6(getRandomQuestions(QUIZ_M6_FACULTATIVO_POSSESSIVOS, 10));
      setQuizM7(getRandomQuestions(QUIZ_M7_HORAS_MEDIDAS, 10));
      setQuizM8(getRandomQuestions(QUIZ_M8_CASOS_ESPECIAIS, 10));
      setQuizM9(getRandomQuestions(QUIZ_M9_DEMONSTRATIVOS, 10));
      setQuizM10(getRandomQuestions(QUIZ_M10_SIMULADO, 15));
    }
  }, [loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const newSet = new Set(completedModules).add(moduleId);
      setCompletedModules(newSet);
      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      onUpdateProgress?.(percent);
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  const CRASE_MANTRA = "Para ter crase: 1. Verbo pede 'A' (Prep) + 2. Substantivo aceita 'A' (Art).";

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
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
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
    >
      {/* ─── MÓDULO 1: CONCEITO ─── */}
      <TabsContent value="modulo-1" className="mt-0 space-y-12">
        <ModuleBanner numero={1} titulo="Conceito e Regra Geral" variant={mv[1]} descricao="A+A = À" />

        {/* ★ RICH INTRO M1 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="O Fenômeno da Crase: A Fusão que Decide Aprovações"
            variant={mv[1]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              A crase é um dos fenômenos mais temidos da Língua Portuguesa em concursos, não por ser conceitualmente complexa, mas porque ela repousa sobre uma verdade simples que candidatos despreparados não dominam: <strong>crase é a fusão de duas vogais idênticas</strong>. Segundo Evanildo Bechara, "a crase é o encontro de duas vogais idênticas em sequência, resultando na elisão (supressão) de uma delas e na representação gráfica da união pelo acento grave". Em outras palavras, quando a preposição <em>a</em> se encontra com o artigo definido feminino <em>a</em> ou com os demonstrativos <em>aquele, aquela, aquilo</em>, as duas vogais "colapsam" em uma só — e essa fusão é marcada pelo acento grave: <strong>à</strong>.
            </p>
            <p>
              Pense na crase como um fenômeno matemático: A (preposição) + A (artigo) = À (crase). Essa equação é o núcleo de todo o aprendizado. Não há crase por magia ou capricho da linguagem — há crase apenas quando essa equação se completa. A preposição <em>a</em> é exigida por um verbo ou nome regente (o que pede), e o artigo <em>a</em> é exigido por um substantivo feminino (o que recebe). Quando os dois se encontram, surge a fusão. Se uma das peças da equação faltar, não há crase — ponto final. A CESGRANRIO cobra crase porque sabe que o candidato coloquial escreve "vou a praia" (sem crase) ou coloca crase aleatoriamente onde não deveria ("a isso"). A excelência linguística exige precisão cirúrgica.
            </p>
            <p>
              A crase se divide em três grandes categorias de regras. <strong>Primeira: Casos Obrigatórios</strong>, onde a crase sempre ocorre se o contexto a permitir — por exemplo, "ir <em>à</em> praia" (a + a praia). <strong>Segunda: Casos Proibidos</strong>, onde a crase é absolutamente vedada, como antes de verbo infinitivo ("começar a estudar", jamais "começar à estudar") ou antes de pronomes pessoais. <strong>Terceira: Casos Facultativos</strong>, onde a crase é permitida mas não obrigatória, como "refiro-me <em>a/à</em> Maria" — ambas as formas estão corretas. Dominar essas três categorias é 80% do trabalho.
            </p>
            <p>
              Na Petrobras, a crase aparece constantemente em documentos técnicos, e-mails corporativos e relatórios formais. Procedimentos operacionais exigem precisão: "referente <em>à</em> segurança da operação", "atento <em>à</em> norma ISO", "direcionado <em>à</em> sustentabilidade ambiental". Um documento técnico com erro de crase pode comprometer a interpretação jurídica de um contrato ou criar ambiguidade em uma instrução de segurança operacional. A CESGRANRIO sabe que a Petrobras exige excelência linguística, e por isso cobra crase de forma recorrente — testando não apenas o conhecimento gramatical, mas a capacidade de aplicar regras sob pressão.
            </p>
            <p>
              A estratégia de domínio da crase é dupla: memorize a equação (<em>a + a = à</em>) e teste ela sistematicamente em cada alternativa. Se a preposição <em>a</em> é exigida, procure pelo artigo <em>a</em> ou pelos demonstrativos <em>aquele, aquela, aquilo</em>. Se ambos estão presentes, marque crase. Se um deles está ausente, não há crase. Esse método lógico, repetido cem vezes, transforma o medo em confiança. Candidatos que memorizam as exceções sem entender a regra base fracassam; candidatos que dominam a equação acertam 95% das questões em menos de 30 segundos.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-6 space-y-3">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuZap className="w-4 h-4 text-blue-500" /> Regra-Chave: A Equação da Crase
              </h4>
              <p className="text-base text-foreground/80">
                Crase ocorre quando <strong>preposição A + artigo/demonstrativo A = À</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base">
                <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">✅ COM CRASE</span>
                  "Vou <em>à</em> praia" (a + a praia) ✓
                </div>
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <span className="font-bold text-red-600 dark:text-red-400 block mb-1">❌ SEM CRASE</span>
                  "Vou <em>a</em> pé" (a + em, não há artigo) ✗
                </div>
              </div>
            </div>
          </div>
        </section>

        <ModuleSectionHeader index={1} title="A Matemática da Crase" description="Fenômeno de fusão fonética." variant={mv[1]} />
        <AlertBox tipo="info" titulo="Definição">{CRASE_MANTRA}</AlertBox>
        <ModuleConsolidation
          index={1}
          variant={mv[1]}
          video={{ videoId: "CRASE_01", title: "O que é Crase?", duration: "12:00" }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Conceito",
            materia: "Crase",
            images: [{ title: "A + A = À", type: "Equação", placeholderColor: "bg-blue-100" }]
          }}
          maceteVisual={{ title: "Mantra", content: CRASE_MANTRA }}
          audio={{ audioUrl: "#", titulo: "AudioAula 1", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM1} titulo="Quiz - Conceito" numero={1} variant={mv[1]} onComplete={(s) => handleModuleComplete("modulo-1", s)} />
      </TabsContent>

      {/* ─── MÓDULO 2: TESTE DO MASCULINO ─── */}
      <TabsContent value="modulo-2" className="mt-0 space-y-12">
        <ModuleBanner numero={2} titulo="Teste do Masculino" variant={mv[2]} descricao="A técnica do 'AO'." />
        <ModuleSectionHeader index={1} title="A Troca Mágica" description="Substitua por uma palavra masculina." variant={mv[2]} />
        <ModuleConsolidation
          index={2}
          variant={mv[2]}
          video={{ videoId: "CRASE_02", title: "Teste do Masculino", duration: "10:30" }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Testes",
            materia: "Crase",
            images: [{ title: "AO = À", type: "Técnica", placeholderColor: "bg-amber-100" }]
          }}
          maceteVisual={{ title: "Regra do AO", content: "Deu AO no masculino? Tem crase no feminino!" }}
          audio={{ audioUrl: "#", titulo: "AudioAula 2", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM2} titulo="Quiz - Masculino" numero={2} variant={mv[2]} onComplete={(s) => handleModuleComplete("modulo-2", s)} />
      </TabsContent>

      {/* ─── Módulo 3: Proibido Verbos ─── */}
      <TabsContent value="modulo-3" className="mt-0 space-y-12">
        <ModuleBanner numero={3} titulo="Proibição: Verbos" variant={mv[3]} descricao="Crase antes de verbo é erro soberbo." />
        <ModuleConsolidation
          index={3}
          variant={mv[3]}
          video={{ videoId: "CRASE_03", title: "Verbos", duration: "08:15" }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Proibições",
            materia: "Crase",
            images: [{ title: "Verbos", type: "Proibição", placeholderColor: "bg-emerald-100" }]
          }}
          maceteVisual={{ title: "Verbo?", content: "Antes de verbo, crase é proibida (sempre!)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 3", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM3} titulo="Quiz - Verbos" numero={3} variant={mv[3]} onComplete={(s) => handleModuleComplete("modulo-3", s)} />
      </TabsContent>

      {/* ─── Módulo 4: Proibido Pronomes ─── */}
      <TabsContent value="modulo-4" className="mt-0 space-y-12">
        <ModuleBanner numero={4} titulo="Proibição: Pronomes" variant={mv[4]} descricao="Ela, Você, Mim, etc." />
        <ModuleConsolidation
          index={4}
          variant={mv[4]}
          video={{ videoId: "CRASE_04", title: "Pronomes", duration: "09:45" }}
          resumoVisual={{
            moduloNome: "Módulo 4",
            tituloAula: "Proibições",
            materia: "Crase",
            images: [{ title: "Pronomes", type: "Proibição", placeholderColor: "bg-rose-100" }]
          }}
          maceteVisual={{ title: "Ela/Você/Mim", content: "Não aceitam artigo, logo: sem crase!" }}
          audio={{ audioUrl: "#", titulo: "AudioAula 4", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM4} titulo="Quiz - Pronomes" numero={4} variant={mv[4]} onComplete={(s) => handleModuleComplete("modulo-4", s)} />
      </TabsContent>

      {/* ─── Módulo 5: Facultativo Nomes ─── */}
      <TabsContent value="modulo-5" className="mt-0 space-y-12">
        <ModuleBanner numero={5} titulo="Facultativo: Nomes Próprios" variant={mv[5]} descricao="Antes de Maria pode ou não." />
        <ModuleConsolidation
          index={5}
          variant={mv[5]}
          video={{ videoId: "CRASE_05", title: "Nomes Próprios", duration: "07:30" }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Facultativos",
            materia: "Crase",
            images: [{ title: "Nomes", type: "Regra", placeholderColor: "bg-violet-100" }]
          }}
          maceteVisual={{ title: "Maria", content: "Nomes de mulheres: o artigo é opcional." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 5", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM5} titulo="Quiz - Nomes" numero={5} variant={mv[5]} onComplete={(s) => handleModuleComplete("modulo-5", s)} />
      </TabsContent>

      {/* ─── Módulo 6: Facultativo Possessivos ─── */}
      <TabsContent value="modulo-6" className="mt-0 space-y-12">
        <ModuleBanner numero={6} titulo="Facultativo: Possessivos" variant={mv[6]} descricao="Minha, Sua, Tua." />
        <ModuleConsolidation
          index={6}
          variant={mv[6]}
          video={{ videoId: "CRASE_06", title: "Possessivos", duration: "06:15" }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Possessivos",
            materia: "Crase",
            images: [{ title: "Minha/Sua", type: "Regra", placeholderColor: "bg-amber-900" }]
          }}
          maceteVisual={{ title: "Minha", content: "Antes de possessivo feminino no singular: facultativo." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 6", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM6} titulo="Quiz - Possessivos" numero={6} variant={mv[6]} onComplete={(s) => handleModuleComplete("modulo-6", s)} />
      </TabsContent>

      {/* ─── Módulo 7: Horas e Medidas ─── */}
      <TabsContent value="modulo-7" className="mt-0 space-y-12">
        <ModuleBanner numero={7} titulo="Horas e Medidas" variant={mv[7]} descricao="Às 14h, À vista." />
        <ModuleConsolidation
          index={7}
          variant={mv[7]}
          video={{ videoId: "CRASE_07", title: "Horas", duration: "11:20" }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Especiais",
            materia: "Crase",
            images: [{ title: "Horas", type: "Regra", placeholderColor: "bg-blue-900" }]
          }}
          maceteVisual={{ title: "Relógio", content: "Hora exata? Crase obrigatória!" }}
          audio={{ audioUrl: "#", titulo: "AudioAula 7", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM7} titulo="Quiz - Horas" numero={7} variant={mv[7]} onComplete={(s) => handleModuleComplete("modulo-7", s)} />
      </TabsContent>

      {/* ─── Módulo 8: Casa/Terra/Distância ─── */}
      <TabsContent value="modulo-8" className="mt-0 space-y-12">
        <ModuleBanner numero={8} titulo="Casa, Terra e Distância" variant={mv[8]} descricao="A regra da especificação." />
        <ModuleConsolidation
          index={8}
          variant={mv[8]}
          video={{ videoId: "CRASE_08", title: "Casos Especiais", duration: "14:15" }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Especiais",
            materia: "Crase",
            images: [{ title: "Casa/Terra", type: "Regra", placeholderColor: "bg-emerald-900" }]
          }}
          maceteVisual={{ title: "Especificou?", content: "Se a casa for X (especificada), tem crase." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 8", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM8} titulo="Quiz - Especiais" numero={8} variant={mv[8]} onComplete={(s) => handleModuleComplete("modulo-8", s)} />
      </TabsContent>

      {/* ─── Módulo 9: Demonstrativos ─── */}
      <TabsContent value="modulo-9" className="mt-0 space-y-12">
        <ModuleBanner numero={9} titulo="Àquele, Àquela, Àquilo" variant={mv[9]} descricao="Fusão com o 'A' inicial." />
        <ModuleConsolidation
          index={9}
          variant={mv[9]}
          video={{ videoId: "CRASE_09", title: "Demonstrativos", duration: "08:40" }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Demonstrativos",
            materia: "Crase",
            images: [{ title: "Àquele", type: "Regra", placeholderColor: "bg-rose-900" }]
          }}
          maceteVisual={{ title: "Fusão", content: "A (Prep) + Aquele = Àquele. Teste por: 'A Este'." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 9", artista: "Petrobras Quest" }}
        />
        <QuizInterativo questoes={quizM9} titulo="Quiz - Demonstrativos" numero={9} variant={mv[9]} onComplete={(s) => handleModuleComplete("modulo-9", s)} />
      </TabsContent>

      {/* ─── Módulo 10: Simulado ─── */}
      <TabsContent value="modulo-10" className="mt-0 space-y-12">
        <ModuleBanner numero={10} titulo="Simulado Final" variant={mv[10]} descricao="O desafio final da Crase." />
        <AlertBox tipo="success" titulo="Arena Master">Consolidação de todos os casos da banca CESGRANRIO.</AlertBox>
        <QuizInterativo questoes={quizM10} titulo="Simulado" numero={10} variant={mv[10]} onComplete={(s) => handleModuleComplete("modulo-10", s)} />
      </TabsContent>
    </AulaTemplate>
  );
}
