"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { getAllModuleVariants } from "@/lib/moduleColors";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  FlipCard,
  QuizInterativo,
  ModuleBanner,
  CardCarousel,
  ModuleSectionHeader,
  ContentAccordion,
  AulaProps,
  AulaTemplate,
  ModuleConsolidation,
  QuestaoResolvidaStepByStep} from "../shared";
import {
  LuCheck,
  LuZap,
  LuBookOpen,
  LuTarget,
  LuTriangleAlert,
  LuLightbulb,
  LuUserX,
  LuScale,
  LuUsers,
  LuArrowRightLeft,
  LuClock,
  LuRuler,
  LuHourglass,
  LuHouse,
  LuGlobe,
  LuMapPin,
  LuHand,
  LuPointer,
  LuBrainCircuit,
  LuListChecks,
  LuGraduationCap,
  LuMedal,
  LuUser,
  LuTags,
  LuKey,
  LuTimer,
  LuMousePointer2,
  LuLayers,
  LuCircleAlert,
  LuBuilding,
} from "react-icons/lu";

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
 * Padrão: Ultimate Premium 10 Módulos com conteúdo expandido
 * Versão: 2.0 (2000+ linhas, 10 módulos completos)
 */

const mv = [undefined, ...getAllModuleVariants()] as any;

export default function AulaCrase({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  onComplete,
  isCompleted,
  loading,
  currentProgress = 0,
  onUpdateProgress,
  prevTopico,
  nextTopico,
}: AulaProps) {
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", title: "Conceito e Regra Geral" },
    { id: "modulo-2", label: "Módulo 2", title: "Teste do Masculino" },
    { id: "modulo-3", label: "Módulo 3", title: "Verbos Proíbem Crase" },
    { id: "modulo-4", label: "Módulo 4", title: "Pronomes Proíbem Crase" },
    { id: "modulo-5", label: "Módulo 5", title: "Facultativo: Nomes Próprios" },
    { id: "modulo-6", label: "Módulo 6", title: "Facultativo: Possessivos" },
    { id: "modulo-7", label: "Módulo 7", title: "Horas e Medidas" },
    { id: "modulo-8", label: "Módulo 8", title: "Casa, Terra, Distância" },
    { id: "modulo-9", label: "Módulo 9", title: "Pronomes Demonstrativos" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Integrado" },
  ] as const;

    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_portugues_crase_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  
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
      updateCompletedModules(Array.from(newSet));
      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      onUpdateProgress?.(percent);
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                        MÓDULO 1: CONCEITO                              ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-1" className="mt-0 space-y-12">
        <ModuleBanner
          numero={1}
          titulo="Conceito e Regra Geral"
          variant="blue"
          descricao="A + A = À: A Equação Fundamental"
        />

        {/* ★ RICH INTRO SECTION - Módulo 1 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Crase: Fusão de Duas Vogais Idênticas"
            description="Entenda a lógica matemática por trás da crase e elimine a decoreba de vez."
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Crase é a fusão gráfica da preposição "a" com o artigo definido feminino "a" (ou com pronomes demonstrativos iniciados por "a")</strong>. Quando essas duas vogais idênticas se encontram em sequência, uma delas desaparece, mas a fusão é marcada pelo acento grave (´), criando o símbolo: <strong>à</strong>. Essa é a razão matemática da crase: A (preposição) + A (artigo) = À. Não se trata de uma preposição especial, mas da aglutinação de duas classes gramaticais distintas que colidem na mesma frase.
            </p>
            <p>
              Pense na crase como uma junção de peças em um quebra-cabeça. Imagine que você tem um pino (a preposição exigida por um verbo de movimento) e um encaixe (o artigo feminino que acompanha o destino). Somente quando o pino encontra o encaixe perfeito, a conexão acontece e a luz acende (o acento grave). Se houver apenas o pino ou apenas o encaixe, a ligação não se concretiza. É uma relação de dependência mútua, simples e lógica.
            </p>
            <p>
              A crase não é um erro ou capricho da linguagem — é um fenômeno fonético natural do português. Segundo a Nomenclatura Gramatical Brasileira (NGB) e Celso Cunha, a crase é um processo de <em>elisão</em> ou crase fonética, ou seja, a supressão ou fusão de uma vogal quando duas vogais iguais se encontram. Historicamente, o português herdou essa tendência do latim, onde as vogais gemidas (repetidas) eram unificadas na pronúncia. A escrita apenas representou graficamente essa realidade linguística através do sinal indicativo de crase.
            </p>
            <p>
              Na Petrobras, documentos técnicos, procedimentos operacionais e comunicações formais utilizam crase constantemente. Relatórios de conformidade mencionam: "conforme referência <em>à</em> NBR 13434", "atento <em>à</em> resolução vigente", "direcionado <em>à</em> segurança operacional da plataforma". Um erro de crase em um documento contratual, edital ou instrução de trabalho pode prejudicar a interpretação jurídica, criar ambiguidades críticas e demonstrar falta de rigor técnico.
            </p>
            <p>
              A estratégia de domínio da crase repousa em um processo lógico de 3 passos: <strong>1) Identificar se há preposição "a" exigida</strong>, <strong>2) Verificar se há artigo "a" ou demonstrativo "aquele/a/o" exigido</strong>, <strong>3) Se ambos estão presentes, há crase</strong>. Para a CESGRANRIO, a grande pontos de atenção não está na regra geral, mas nas exceções onde uma das peças parece estar presente, mas não está. Candidatos que decoram regras sem entender a base fracassam; quem domina a equação acerta 95% das questões em segundos.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuZap className="w-5 h-5 text-blue-500" /> A Equação Fundamental da Crase
              </h4>
              <div className="text-lg font-bold text-center p-4 bg-white dark:bg-slate-900 rounded-lg border-2 border-blue-500">
                <span className="text-blue-600">A (preposição)</span> + <span className="text-blue-600">A (artigo/demonstrativo)</span> = <span className="text-red-600 text-2xl">À</span>
              </div>
              <p className="text-foreground/80">
                Se <strong>UMA</strong> das peças (preposição ou artigo) faltar, não há crase. Sempre verifique ambas!
              </p>
            </div>
          </div>
        </section>

        {/* ★ ACCORDION 1: Três Pilares */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Os Três Pilares da Crase" variant="blue" />
          <ContentAccordion
            slides={[
              {
                titulo: "Pilar 1: Crase Obrigatória",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p>
                      Crase ocorre obrigatoriamente quando o contexto exige tanto a preposição "a" quanto o artigo/demonstrativo "a". Exemplos: "Vou <strong>à</strong> praia" (vou A + A praia). "Dirijo-me <strong>à</strong> gerência" (dirijo-me A + A gerência). Nesses casos, a crase é automática e obrigatória — não há alternativa.
                    </p>
                    <p className="font-semibold">Insight Estratégico: O teste do masculino é aplicável integralmente nesta estrutura:</p>
                    <p className="italic">"Vou à praia" → "Vou ao museu" ✓ (virou "ao", confirma crase)</p>
                  </div>
                ),
              },
              {
                titulo: "Pilar 2: Crase Proibida",
                icone: <LuTriangleAlert className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p>
                      Crase é <strong>absolutamente vedada</strong> quando uma das duas peças da equação está ausente. Verbos não aceitam artigo ("começar <strong>a</strong> estudar", não "começar <strong>à</strong> estudar"). Pronomes pessoais não aceitam artigo ("referi-me <strong>a</strong> ela", não "referi-me <strong>à</strong> ela"). Essas são zonas de proibição clara — a equação não se completa.
                    </p>
                    <p className="font-semibold">Regra: Se NÃO há artigo (ou demonstrativo) após a preposição, a preposição fica sozinha, sem crase.</p>
                  </div>
                ),
              },
              {
                titulo: "Pilar 3: Crase Facultativa",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p>
                      Crase é <strong>facultativa</strong> quando o artigo também é opcional. Com nomes próprios femininos ("a Maria" ou "Maria"), a crase é opcional ("refiro-me a Maria" ou "refiro-me à Maria" — ambas corretas). Com possessivos singulares femininos ("minha", "sua"), o mesmo ocorre: "refiro-me a minha opinião" ou "refiro-me à minha opinião".
                    </p>
                    <p className="font-semibold">Regra: Quando o artigo pode sair sem prejuízo, a crase também pode sair.</p>
                  </div>
                ),
              },
              {
                titulo: "Teste da Equação: Passo a Passo",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-4 text-foreground/85">
                    <p className="font-semibold">Como verificar se há crase:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li><strong>Passo 1:</strong> Existe preposição "a" exigida pelo verbo/nome?</li>
                      <li><strong>Passo 2:</strong> Existe artigo "a" (ou demonstrativo) exigido pela palavra seguinte?</li>
                      <li><strong>Passo 3:</strong> Se SIM em ambos → há crase (À). Se NÃO em qualquer um → sem crase (A).</li>
                    </ol>
                    <p className="text-sm italic mt-4">Exemplo: "Vou à praia" → Passo 1: Sim (vou A). Passo 2: Sim (A praia). Passo 3: Ambos SIM → À praia ✓</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* ★ CARD CAROUSEL: Exemplos */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Exemplos Práticos: Crase Obrigatória" variant="blue" />
          <CardCarousel
            cards={[
              {
                icone: "🏖️",
                title: "Lugar Feminino",
                descricao: "Vou à praia (A + A praia = À praia) ✓",
              },
              {
                icone: "💼",
                title: "Instituição Feminina",
                descricao: "Dirijo-me à empresa (A + A empresa = À empresa) ✓",
              },
              {
                icone: "📚",
                title: "Substantivo Feminino",
                descricao: "Assisti à palestra (A + A palestra = À palestra) ✓",
              },
              {
                icone: "🌍",
                title: "Nome Próprio Feminino",
                descricao: "Viagem à Bahia (A + A Bahia = À Bahia) ✓",
              },
              {
                icone: "🎭",
                title: "Arte/Cultura",
                descricao: "Refiro-me à música (A + A música = À música) ✓",
              },
              {
                icone: "⚙️",
                title: "Contexto Petrobras",
                descricao: "Conforme à resolução (A + A resolução = À resolução) ✓",
              },
            ]}
          />
        </section>

        {/* ★ ACCORDION 2: Regência Verbal */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Regência: Verbos e Nomes que Exigem A" variant="blue" />
          <ContentAccordion
            slides={[
              {
                titulo: "Verbos que Exigem Preposição A",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p>
                      Muitos verbos exigem a preposição "a" para introduzir o objeto indireto. Exemplos: <strong>ir, vir, dirigir-se, referir-se, assistir, dedicar, entregar, aludi</strong>r, atender, ceder, contrariar, desobedecer, obedecer, resistir, etc. Quando esses verbos precedem uma palavra feminina que aceita artigo, há crase.
                    </p>
                    <p className="italic text-sm">
                      "Dedico-me <strong>à</strong> leitura" (dedicar + a + a leitura)
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Nomes que Exigem Preposição A",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p>
                      Substantivos e adjetivos também podem exigir a preposição "a". Exemplos: <strong>fiel a, semelhante a, contrário a, propenso a, paralelo a, próximo a, atento a</strong>, etc. Quando são seguidos de palavra feminina que aceita artigo, há crase.
                    </p>
                    <p className="italic text-sm">
                      "Sou fiel <strong>à</strong> minha empresa" (fiel + a + a minha empresa)
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* ★ FLIP CARDS: Exercícios */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Identifique a Crase" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuZap className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    A Equação Fundamental
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    A (prep) + A (art) = À
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">A Lógica Perfeita</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">A crase não é um erro — é uma fusão gráfica de duas vogais iguais. Quando a preposição "a" encontra o artigo "a", elas se fundem.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Vou <strong>à</strong> praia" (vou A + A praia)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Vou <strong>a</strong> pé" (vou A, mas PÉ é masculino)</p>
                </div>
              }
              categoria="Matemática da Crase"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuTarget className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Teste do Lugar
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    Preposição pelo Contexto
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Verbos Exigentes</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Verbos de movimento ou relacionamento exigem a preposição "a" (IR, DIRIGIR-SE). Quando seguidos de substantivo feminino, há crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Dirijo-me <strong>à</strong> gerência"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Dedico-me <strong>à</strong> pesquisa"</p>
                </div>
              }
              categoria="Regência Verbal"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20">
                    <LuBookOpen className="w-12 h-12 text-purple-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Três Pilares
                  </span>
                  <span className="text-sm text-purple-500/80 font-medium">
                    A Divisão das Regras
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-purple-500 font-bold border-b border-purple-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Classificação</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">A crase ocorre em três contextos: OBRIGATÓRIA (ambas presentes), PROIBIDA (falta uma peça), FACULTATIVA (artigo opcional).</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ OBRIGATÓRIA: "Vou à praia"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ PROIBIDA: "Comecei a estudar"</p>
                </div>
              }
              categoria="Estrutura"
            />
          </div>
        </section>

        {/* ★ ALERT BOX: Erro Frequente */}
        <AlertBox tipo="danger" titulo="Erro Crítico: Crase com Preposição Diferente">
          <p>Alguns candidatos confundem preposições. A crase APENAS fusiona <strong>A com A</strong>.</p>
          <p className="mt-2">
            ❌ "Fui <strong>em a</strong> loja" (preposição EM + artigo A = <strong>NA</strong>, não crase!)
          </p>
          <p className="mt-2">
            ✅ "Fui <strong>a</strong> loja" ou "Fui <strong>à</strong> loja" (preposição A + artigo A = A ou À)
          </p>
          <p className="mt-4 font-semibold">Lembre: Crase = A + A. Nada mais, nada menos.</p>
        </AlertBox>

        {/* ★ MODULE CONSOLIDATION */}
                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={1}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A crase é a fusão de quais elementos gramaticais?"
          alternativas={[
              { letra: "A", texto: "Preposição \"a\" + Artigo definido \"a\"", correta: true },
              { letra: "B", texto: "Preposição \"a\" + Pronome pessoal \"ela\"", correta: false },
              { letra: "C", texto: "Artigo \"a\" + Verbo haver", correta: false },
              { letra: "D", texto: "Preposição \"para\" + Artigo \"a\"", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Crase é a contração da preposição" },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={1}
          variant="blue"
          video={{ videoId: "CRASE_01", title: "Crase - Módulo 1: Conceito", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 1", type: "Resumo", placeholderColor: "bg-blue-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S1", content: "A + A = À: Se a preposição 'a' encontra o artigo 'a', ocorre a crase." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 1 - Crase", artista: "Petrobras Quest" }}
        />

        {/* ★ QUIZ */}
        <QuizInterativo
          questoes={quizM1}
          titulo="Quiz - Módulo 1: Conceito e Regra Geral"
          numero={1}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-1", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                      MÓDULO 2: TESTE DO MASCULINO                     ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-2" className="mt-0 space-y-12">
        <ModuleBanner
          numero={2}
          titulo="Teste do Masculino"
          variant="blue"
          descricao="A técnica mais poderosa para identificar crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O Teste do Masculino: A Técnica Fundamental da Crase"
            description="A técnica mais confiável para confirmar a presença simultânea de preposição e artigo."
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O <strong>Teste do Masculino</strong> é a ferramenta sintática mais prática e eficaz para a identificação da crase. O método consiste em substituir o termo feminino que sucede o "a" por um termo equivalente no gênero masculino. Se, ao fazer essa substituição, o "a" se transformar em <strong>"ao"</strong>, a ocorrência de crase no termo original feminino está matematicamente comprovada. Se permanecer apenas "a", não há crase.
            </p>
            <p>
              Pense nesse teste como o uso de um papel tornassol na química: ele revela componentes invisíveis a olho nu. Quando você troca a palavra feminina pela masculina, você "força" a estrutura gramatical a mostrar suas cartas. Se a preposição estava escondida junto com o artigo feminino ("à"), no masculino essa fusão se quebra e revela suas partes claramente ("ao" = a + o). É um teste de verificação que nunca falha quando aplicado corretamente.
            </p>
            <p>
              A explicação técnica repousa na constância da regência. O verbo ou nome que exige a preposição "a" continuará exigindo-a, independentemente do gênero da palavra seguinte. O que muda é o artigo que acompanha essa palavra: "a" para femininos, "o" para masculinos. Assim, se a estrutura original continha [Preposição A + Artigo A], a estrutura testada conterá [Preposição A + Artigo O], resultando em "ao". Se resultou apenas em "a" (ou em "o"), significa que faltava uma das peças fundamentais.
            </p>
            <p>
              Na rotina da Petrobras, essa técnica resolve impasses em segundos. Ao redigir um memorando dizendo "Reportar-se _____ gerência", o engenheiro pode ficar na dúvida. Aplicando o teste: "Reportar-se <strong>ao</strong> departamento" (virou AO). Logo, a forma correta é "Reportar-se <strong>à</strong> gerência". Em outro caso: "Visando _____ atender aos prazos". Teste com substantivo: "Visando <strong>ao</strong> atendimento". Opa, espera! O verbo "atender" não aceita artigo feminino depois dele, mas aqui temos um verbo ("atender") no original, então "Visando a atender", sem crase, porque antes de verbo não se usa artigo.
            </p>
            <p>
              A pontos de atenção clássica das bancas como a CESGRANRIO envolve o uso de palavras femininas que não possuem equivalentes masculinos diretos, ou o uso de palavras no plural. O segredo não é buscar a tradução exata do masculino, mas sim um termo de <strong>mesmo valor sintático</strong>. Se a palavra original for "viagem", não tente achar o masculino de viagem, mas substitua por "passeio". "Vou <strong>à</strong> viagem" vira "Vou <strong>ao</strong> passeio" (crase confirmada). Adapte o teste ao contexto e não se deixe enganar.
            </p>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuZap className="w-5 h-5 text-emerald-500" /> O Detector de Crase (O Teste do "AO")
              </h4>
              <p className="text-foreground/85">
                Substitua a palavra feminina por um termo masculino equivalente na estrutura:
              </p>
              <ul className="space-y-2 text-foreground/80 font-medium">
                <li className="flex items-center gap-2">
                  <LuCheck className="text-emerald-500 w-5 h-5" /> Se virar <strong>"AO"</strong> → <span className="text-emerald-700 dark:text-emerald-400">Há crase (À)</span>
                </li>
                <li className="flex items-center gap-2">
                  <LuTriangleAlert className="text-red-500 w-5 h-5" /> Se continuar <strong>"A"</strong> → <span className="text-red-700 dark:text-red-400">Sem crase (A)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos Práticos: Teste Passo a Passo" variant="blue" />
          <ContentAccordion
            slides={[
              {
                titulo: "Exemplo 1: Vou à praia",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Frase: "Vou à praia"</p>
                    <p>
                      Teste: Troque "praia" (feminino) por "museu" (masculino) → "Vou <strong>ao</strong> museu"
                    </p>
                    <p className="font-semibold text-green-600">
                      ✓ Virou AO → Há crase na frase original: "Vou <strong>à</strong> praia"
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Exemplo 2: Refiro-me à estratégia",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Frase: "Refiro-me à estratégia"</p>
                    <p>
                      Teste: Troque "estratégia" por "plano" → "Refiro-me <strong>ao</strong> plano"
                    </p>
                    <p className="font-semibold text-green-600">
                      ✓ Virou AO → Há crase: "Refiro-me <strong>à</strong> estratégia"
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Exemplo 3: Comecei a estudar",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Frase: "Comecei a estudar"</p>
                    <p>
                      Teste: Troque "estudar" por "trabalhar" (ambos verbos) → "Comecei <strong>a</strong> trabalhar"
                    </p>
                    <p className="font-semibold text-red-600">
                      ❌ Continua A (não virou AO) → Sem crase: "Comecei <strong>a</strong> estudar"
                    </p>
                    <p className="text-sm italic">(Verbos não aceitam artigo, logo não há crase)</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplo 4: Fui a pé",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Frase: "Fui a pé"</p>
                    <p>
                      Teste: Troque "pé" (masculino) por outra forma masculina → "Fui a cavalo"
                    </p>
                    <p className="font-semibold text-red-600">
                      ❌ Continua A (não virou AO) → Sem crase: "Fui <strong>a</strong> pé"
                    </p>
                    <p className="text-sm italic">("Pé" é masculino, não há artigo feminino, logo sem crase)</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Card: Casos Comuns de Teste" variant="blue" />
          <CardCarousel
            cards={[
              {
                icone: "🏖️→🏛️",
                title: "Praia → Museu",
                descricao: "à praia = ao museu ✓ (virou AO)",
              },
              {
                icone: "📚→📖",
                title: "Sala → Salão",
                descricao: "à sala = ao salão ✓ (virou AO)",
              },
              {
                icone: "👩→👨",
                title: "Mulher → Homem",
                descricao: "à mulher = ao homem ✓ (virou AO)",
              },
              {
                icone: "🎓→🎓",
                title: "Aula → Filme",
                descricao: "à aula = ao filme ✓ (virou AO)",
              },
              {
                icone: "🚶→🚶",
                title: "Pé (masc) → Cavalo",
                descricao: "a pé = a cavalo ✗ (continua A, sem crase)",
              },
              {
                icone: "✍️→📝",
                title: "Estudar → Trabalhar",
                descricao: "a estudar = a trabalhar ✗ (continua A, verbos não têm artigo)",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Casos que Enganam: Quando o Teste Falha" variant="blue" />
          <AlertBox tipo="warning" titulo="Exceções ao Teste do Masculino">
            <p>O teste do masculino é confiável em 95% dos casos, mas algumas palavras femininas NÃO têm equivalente masculino natural, exigindo criatividade:</p>
            <div className="mt-4 space-y-3">
              <p>
                <strong>Exemplo:</strong> "Viagem à Itália" → Não existe "Itália" no masculino. Troque por um gênero compatível: "Viagem ao país" (virou AO, confirma crase).
              </p>
              <p>
                <strong>Outro:</strong> "Atenção à resolução" → Não há "resolução" masculina. Troque por sinônimo: "Atenção ao regulamento" (virou AO, confirma crase).
              </p>
            </div>
            <p className="mt-4 font-semibold">
              Criatividade é seu aliado! Quando não há equivalente direto, procure um sinônimo ou um substantivo de sentido similar.
            </p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Aplique o Teste" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuTarget className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Teste do Masculino
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    A Substituição Mágica
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">A Mecânica</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Troque a palavra feminina por um masculino equivalente. Se virar "AO", há crase. Se continuar "A", não há crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Vou <strong>à</strong> festa" (Vou <strong>ao</strong> baile)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Fui <strong>a</strong> pé" (Continua A)</p>
                </div>
              }
              categoria="Metodologia"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuZap className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Resultado: "AO"
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    Confirmação de Crase
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Equação Completa</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Quando resulta em "AO", prova que temos preposição + artigo masculino. Logo, no feminino, teremos preposição + artigo feminino = À.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Dedico-me <strong>à</strong> leitura" (ao livro)</p>
                </div>
              }
              categoria="Diagnóstico Positivo"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                    <LuTriangleAlert className="w-12 h-12 text-red-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Resultado: "A"
                  </span>
                  <span className="text-sm text-red-500/80 font-medium">
                    Ausência de Crase
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Falta uma Peça</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Se continua apenas "A", falta o artigo definido. Ocorre antes de verbos e palavras que não aceitam determinante.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Comecei <strong>a</strong> trabalhar"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Andamos <strong>a</strong> cavalo"</p>
                </div>
              }
              categoria="Diagnóstico Negativo"
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Síntese de Memorização">
          Pense no teste do masculino como um <strong>"Detector de AO"</strong>. Se detecta "AO", há crase (À). Se não detecta (continua "A"), sem crase. Simples assim!
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado='Qual é a "Regra de Ouro" para identificar crase?'
          alternativas={[
              { letra: "A", texto: "Trocar por masculino e ver se vira \"AO\"", correta: true },
              { letra: "B", texto: "Trocar por plural", correta: false },
              { letra: "C", texto: "Ver se a palavra termina em a", correta: false },
              { letra: "D", texto: "Sempre usar crase antes de feminino", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Se vira" },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={2}
          variant="blue"
          video={{ videoId: "CRASE_02", title: "Crase - Módulo 2: Teste Masculino", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 2", type: "Resumo", placeholderColor: "bg-amber-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S2", content: "AO no masculino? Tem crase no feminino (À)!" }}
          audio={{ audioUrl: "#", titulo: "AudioAula 2 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM2}
          titulo="Quiz - Módulo 2: Teste do Masculino"
          numero={2}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-2", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                   MÓDULO 3: VERBOS PROÍBEM CRASE                       ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-3" className="mt-0 space-y-12">
        <ModuleBanner
          numero={3}
          titulo="Verbos Proíbem Crase"
          variant="blue"
          descricao="Por que verbos nunca levam crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Muralha dos Verbos: Por que a Crase é Proibida"
            description="Entenda a restrição gramatical que impede o uso de crase antes de ações."
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Princípio Fundamental da crase é clara: <strong>nunca utilize crase antes de verbos</strong>. Essa proibição não é uma exceção decorada, mas uma consequência lógica do conceito fundamental que acabamos de aprender. Como a crase é a fusão de uma preposição "a" com um artigo definido "a", é imperativo que a palavra seguinte admita esse artigo feminino. Acontece que verbos, por sua natureza de expressar ações ou estados, são completamente incompatíveis com artigos.
            </p>
            <p>
              Faça a analogia com o uso de roupas: você não tenta colocar um chapéu (artigo) no próprio vento (verbo). Chapéus são feitos para cabeças (substantivos). Você diz "o estudo", "a leitura", "a corrida", mas nunca diz "o estudar", "a ler", "a correr" no uso padrão da língua portuguesa. Se o verbo repele o artigo, a preposição "a" exigida pelo termo anterior fica ali, sozinha e solitária, incapaz de realizar a fusão.
            </p>
            <p>
              Gramaticalmente, a preposição atua como uma ponte ligando termos, enquanto o artigo determina o substantivo. Em locuções como "começar a chover" ou "disposto a lutar", os verbos "chover" e "lutar" estão no infinitivo e exercem função de complemento sem a necessidade de determinantes. A preposição "a" atende exclusivamente à regência dos termos anteriores ("começar" ou "disposto"). Sem o artigo feminino para parear, o acento indicativo de crase é impossível.
            </p>
            <p>
              Em relatórios técnicos da Petrobras, essa regra é frequentemente testada na escrita de metas e procedimentos. Frases como "O operador começou <em>a</em> avaliar o sistema" ou "A equipe foi orientada <em>a</em> interromper o processo" ilustram o padrão correto. Note que a preposição "a" está presente, mas como "avaliar" e "interromper" são verbos, a crase não acontece. Um erro comum ocorre quando se usa locuções como "A partir de", onde a ausência de crase se justifica exatamente por "partir" ser um verbo.
            </p>
            <p>
              As bancas como a CESGRANRIO exploram essa regra de forma cruel ao colocar verbos e substantivos parecidos lado a lado. Por exemplo: "Procedeu <em>à</em> verificação" (tem crase, pois "verificação" é substantivo feminino) contra "Procedeu <em>a</em> verificar" (sem crase, pois "verificar" é verbo). Candidatos apressados focam apenas no verbo "proceder" e ignoram a palavra seguinte. Lembre-se: o que determina a crase não é apenas quem pede a preposição, mas fundamentalmente quem a recebe.
            </p>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-xl border border-red-200 dark:border-red-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuTriangleAlert className="w-5 h-5 text-red-500" /> A Regra Intransponível
              </h4>
              <p className="text-foreground/85">
                Preposição "A" + Verbo no infinitivo = <strong>Sempre sem crase</strong>.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-red-500 space-y-2">
                <p className="flex items-center gap-2 text-foreground/80">
                  <LuTriangleAlert className="text-red-500 w-4 h-4" /> "Chegou <strong>à</strong> chorar" — ERRO FATAL
                </p>
                <p className="flex items-center gap-2 text-foreground/80">
                  <LuCheck className="text-green-500 w-4 h-4" /> "Chegou <strong>a</strong> chorar" — CORRETO
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Verbos Comuns que Exigem Preposição A" variant="blue" />
          <ContentAccordion
            slides={[
              {
                titulo: "Verbos que Aceitam A (sempre SEM crase)",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Verbos comuns que exigem A + verbo infinitivo:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Começar a:</strong> "Começou a chover" ✓</li>
                      <li><strong>Passar a:</strong> "Passou a trabalhar" ✓</li>
                      <li><strong>Procedeu a:</strong> "Procedeu a investigar" ✓</li>
                      <li><strong>Aprender a:</strong> "Aprendi a dirigir" ✓</li>
                      <li><strong>Ensinar a:</strong> "Ensinou a nadar" ✓</li>
                      <li><strong>Ir a:</strong> "Vou a estudar" (raro) ✓</li>
                      <li><strong>Voltar a:</strong> "Voltou a tentar" ✓</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Comparação: Substantivo vs Verbo",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Mesma estrutura, resultado diferente:</p>
                    <div className="space-y-2">
                      <p>
                        <strong>Com Substantivo:</strong> "Comecei <em>à</em> leitura" (A + A leitura = À) ✓
                      </p>
                      <p>
                        <strong>Com Verbo:</strong> "Comecei <em>a</em> ler" (A + verbo ler = A) ✓
                      </p>
                    </div>
                    <p className="text-sm italic mt-3">
                      Observe: mesma frase, praticamente mesmo sentido, mas preposição diferente porque um é substantivo (aceita artigo) e outro é verbo (rejeita artigo).
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Exemplos: Erros Frequentes com Verbos" variant="blue" />
          <CardCarousel
            cards={[
              {
                icone: "❌",
                title: "ERRADO: À estudar",
                descricao: "Verbo não aceita artigo → Começou a estudar ✓",
              },
              {
                icone: "❌",
                title: "ERRADO: À trabalhar",
                descricao: "Verbo sem artigo → Passou a trabalhar ✓",
              },
              {
                icone: "❌",
                title: "ERRADO: À investigar",
                descricao: "Verbo rejeita crase → Procedeu a investigar ✓",
              },
              {
                icone: "✅",
                title: "CORRETO: À leitura",
                descricao: "Substantivo com artigo → À leitura ✓",
              },
              {
                icone: "✅",
                title: "CORRETO: À pesquisa",
                descricao: "Substantivo feminino → À pesquisa ✓",
              },
              {
                icone: "⚠️",
                title: "Petrobras: À implementação",
                descricao: "Substantivo → À implementação de normas ✓",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Armadilha: Adjetivo + Infinitivo" variant="blue" />
          <AlertBox tipo="warning" titulo="Cuidado com Construções Complexas">
            <p>
              Alguns candidatos tropeçam em frases como: "Sou <strong>apto</strong> <em>a</em> trabalhar" ou "Estou <strong>pronto</strong> <em>a</em> partir". Aqui, "apto" e "pronto" são adjetivos que exigem A, mas o que segue é um VERBO (trabalhar, partir), não um substantivo. Logo, SEM crase.
            </p>
            <p className="mt-3">
              ✓ "Sou apto <em>a</em> trabalhar" (adjetivo apto + verbo trabalhar = SEM crase)
            </p>
            <p>
              ✓ "Sou apto <em>à</em> liderança" (adjetivo apto + substantivo liderança = COM crase)
            </p>
            <p className="mt-4 font-semibold">Regra: O que importa é o que VEM DEPOIS (verbo ou substantivo), não o adjetivo!</p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Verbos vs Substantivos" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                    <LuTriangleAlert className="w-12 h-12 text-red-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Diante de Verbos
                  </span>
                  <span className="text-sm text-red-500/80 font-medium">
                    Proibição Absoluta
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">A Regra Ouro</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Nunca se usa crase antes de verbo. Verbos repulsam artigos, logo a equação não se forma. Sem exceções.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Começou <strong>à</strong> chover"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Começou <strong>a</strong> chover"</p>
                </div>
              }
              categoria="Regras Proibitivas"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuTarget className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Diante de Substantivos
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    A Necessidade de Artigo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Exigência Gramatical</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Substantivos femininos aceitam o artigo "a". Se o termo anterior exigir preposição, a crase será formada e a ocorrência é confirmada com o teste do masculino.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Procedeu <strong>à</strong> análise"</p>
                </div>
              }
              categoria="Regência Correta"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuZap className="w-12 h-12 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    O Falso Adjetivo
                  </span>
                  <span className="text-sm text-amber-500/80 font-medium">
                    A Atenção ao Posterior
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Análise Cuidadosa</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Cuidado com adjetivos exigentes ("apto a"). O que define a crase é a palavra que vem depois. Se for verbo, não há crase. Se for substantivo, pode haver.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Apto <strong>a</strong> lutar"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Apto <strong>à</strong> luta"</p>
                </div>
              }
              categoria="Alerta de pontos de atenção"
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Crítico Frequente em Concursos">
          A CESGRANRIO adora colocar frases como "Procedeu <em>___</em> fiscalização" vs "Procedeu <em>___</em> fiscalizar". A primeira tem crase (À), a segunda não (A). Muitos candidatos erram porque não diferenciam substantivo (aceitaartigo) de verbo (rejeita artigo). Leia com atenção!
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Nunca ocorre crase antes de:"
          alternativas={[
              { letra: "A", texto: "Palavras femininas", correta: false },
              { letra: "B", texto: "Verbos", correta: true },
              { letra: "C", texto: "Horas", correta: false },
              { letra: "D", texto: "Locuções adverbiais", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Verbos não admitem artigo feminino, logo nunca há crase (a fazer, a partir)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={3}
          variant="blue"
          video={{ videoId: "CRASE_03", title: "Crase - Módulo 3: Verbos", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 3", type: "Resumo", placeholderColor: "bg-emerald-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S3", content: "Antecedendo VERBOS: o uso da crase é vedado." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 3 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM3}
          titulo="Quiz - Módulo 3: Verbos Proíbem Crase"
          numero={3}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-3", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                  MÓDULO 4: PRONOMES PROÍBEM CRASE                      ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-4" className="mt-0 space-y-12">
        <ModuleBanner
          numero={4}
          titulo="Pronomes Pessoais Proíbem Crase"
          variant="blue"
          descricao="Ela, Você, Mim, Ti, Si — nunca levam crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Pronomes Pessoais: Regra Categórica"
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              A compreensão da relação entre a crase e os pronomes pessoais é um pilar estrutural na gramática exigida em concursos públicos. Pronomes como "ela", "você", "mim" e "ti" funcionam como verdadeiras barreiras linguísticas contra o uso do acento grave. Entender essa dinâmica não requer memorização exaustiva, mas sim o reconhecimento da natureza essencial dessas palavras, que operam de forma autossuficiente nas frases e rejeitam acompanhamentos desnecessários.
            </p>
            <p>
              Do ponto de vista morfológico, pronomes pessoais possuem a função de substituir ou acompanhar o substantivo, designando diretamente as pessoas do discurso. Justamente por essa característica intrínseca de já determinarem quem é o sujeito ou objeto da ação, eles rejeitam de maneira terminante a antecipação de um artigo definido. É impossível e agramatical a formulação de construções como "a ela", "a mim" ou "a você" onde o primeiro "a" exerça papel de artigo; o artigo simplesmente não cabe antes de pronomes pessoais.
            </p>
            <p>
              Sem a presença do artigo feminino "a", o fenômeno da fusão torna-se matematicamente impossível. Quando um verbo de regência exigente demanda a preposição "a" e o termo subsequente é um pronome pessoal, a preposição permanece isolada, em sua forma simples. A estrutura lógica da frase se resume à equação: <strong>Preposição "A" + Pronome Pessoal (que repele o artigo) = "A" simples</strong>. Portanto, qualquer sinal indicativo de crase nesse cenário configura um erro sintático grave.
            </p>
            <p>
              A aplicação prática dessa regra revela-se em exemplos cotidianos que frequentemente integram as armadilhas das bancas examinadoras. Ao analisarmos a frase "Referi-me <em>a</em> ela", observamos o uso correto da preposição exigida pelo verbo "referir", sem qualquer fusão, uma vez que "ela" repele o artigo. Da mesma forma, construções como "Dirijo-me <em>a</em> você" e "Fiz isso por <em>ti</em>" demonstram a preposição operando perfeitamente. Inversamente, escrever "referi-me <em>à</em> ela" ou "entreguei <em>à</em> você" constitui um desvio normativo severo.
            </p>
            <p>
              Em síntese, a norma gramatical que proíbe a ocorrência de crase diante de pronomes pessoais é categórica, absoluta e isenta de exceções. Candidatos bem preparados devem tratar essa regra como um mandamento imutável em suas resoluções de prova. Reconhecer a presença de um pronome pessoal após o termo regente é o sinal definitivo para descartar imediatamente o uso do acento grave, garantindo a correção gramatical e evitando as "pontos de atenção" mais recorrentes.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Lista: Pronomes Pessoais (Proíbem Crase)" variant="blue" />
          <ContentAccordion
            slides={[
              {
                titulo: "Pronomes Pessoais do Caso Reto",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Função: sujeito da frase</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Eu, Tu, Ele/Ela, Nós, Vós, Eles/Elas</strong> — nunca levam crase</li>
                      <li>Exemplos: "Falei <em>a</em> ele", "Dirijo-me <em>a</em> eles"</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Pronomes Pessoais do Caso Oblíquo",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Função: objeto indireto, complemento</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Mim, Ti, Si (reflexivo)</strong> — nunca levam crase</li>
                      <li>Exemplos: "Isso é para <em>mim</em>", "Fiz por <em>ti</em>", "Ela ficou consigo"</li>
                      <li><strong>Observação:</strong> Consigo é reflexivo (para si mesmo)</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Pronomes de Tratamento (Exceção Parcial)",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Você, Vossa Majestade, Vossa Excelência:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>"Você" (pronome, comporta-se como "ela") → "Dirijo-me <em>a</em> você" (SEM crase)</li>
                      <li>"Vossa Majestade" → "Dirijo-me <em>a</em> Vossa Majestade" (SEM crase, funciona como pronome)</li>
                      <li>Comportam-se como pronomes pessoais, logo sem crase</li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Exemplos: Pronomes Pessoais vs Nomes" variant="blue" />
          <CardCarousel
            cards={[
              {
                icone: "👤",
                title: "Ela (pronome)",
                descricao: "Referi-me a ela ✓ (sem crase)",
              },
              {
                icone: "👤",
                title: "Você (pronome tratamento)",
                descricao: "Dirijo-me a você ✓ (sem crase)",
              },
              {
                icone: "👤",
                title: "Mim (pronome oblíquo)",
                descricao: "Isso é para mim ✓ (sem crase)",
              },
              {
                icone: "👩",
                title: "Maria (nome próprio)",
                descricao: "Refiro-me a/à Maria ✓ (crase facultativa)",
              },
              {
                icone: "👩",
                title: "Diretora (substantivo)",
                descricao: "Dirijo-me à diretora ✓ (com crase)",
              },
              {
                icone: "⚠️",
                title: "Petrobras: À gerência",
                descricao: "Ao funcionário vs À gerência (nomes, crase)",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Confusão Comum: Nome vs Pronome" variant="blue" />
          <AlertBox tipo="warning" titulo="Diferença Crítica">
            <p><strong>Pronomes pessoais:</strong> "Referi-me <em>a</em> ela" (SEM crase)</p>
            <p><strong>Nomes/substantivos femininos:</strong> "Referi-me <em>à</em> mulher" (COM crase)</p>
            <br />
            <p>
              A diferença está em TIPO DE PALAVRA. "Ela" é pronome (rejeita artigo), "mulher" é substantivo (aceita artigo). Quando não tem certeza, aplique o teste: "Refiri-me a/ao..." — se vira "ao", há crase no feminino.
            </p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Pronomes Pessoais" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-rose-500/10 rounded-full shadow-inner ring-1 ring-rose-500/20">
                    <LuUserX className="w-12 h-12 text-rose-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Barreira do Pronome
                  </span>
                  <span className="text-sm text-rose-500/80 font-medium">
                    Rejeição ao Artigo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-rose-500 font-bold border-b border-rose-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">A Mecânica</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Pronomes pessoais (ela, ele, você, nós, vós) não aceitam artigo. A equação não se completa.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Referi-me <strong>à</strong> ela"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Referi-me <strong>a</strong> ela"</p>
                </div>
              }
              categoria="Regra Absoluta"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuScale className="w-12 h-12 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Pronome vs Nome
                  </span>
                  <span className="text-sm text-amber-500/80 font-medium">
                    Diferença Crítica
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Comparação</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Pronomes rejeitam artigos (sem crase). Substantivos aceitam artigos (com crase).</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Referi-me <strong>a</strong> ela" (Pronome)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Referi-me <strong>à</strong> mulher" (Nome)</p>
                </div>
              }
              categoria="Análise Morfológica"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuTarget className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Pronomes Oblíquos
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    Mim, Ti, Si
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Extensão da Regra</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Pronomes oblíquos também rejeitam o artigo. A preposição permanece isolada, impossibilitando a fusão.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Isso é para <strong>à</strong> mim"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Isso é para <strong>a</strong> mim" ou "para <strong>mim</strong>"</p>
                </div>
              }
              categoria="Atenção Especial"
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Epidêmico: À Ela">
          Muitos candidatos erram "À ela" porque confundem com nomes femininos. NUNCA há crase antes de pronome pessoal. "Ela" é pronome (rejeita artigo), logo: <strong>referi-me A ela</strong>, nunca "referi-me À ela". Essa é a trampa favorita da CESGRANRIO!
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual frase está CORRETA quanto ao uso de crase com pronomes?"
          alternativas={[
              { letra: "A", texto: "Referi-me a ela com respeito", correta: true },
              { letra: "B", texto: "Referi-me à ela com respeito", correta: false },
              { letra: "C", texto: "Referi-me à Vossa Senhoria", correta: false },
              { letra: "D", texto: "Dedico isso à você", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Pronomes pessoais não recebem crase." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={4}
          variant="blue"
          video={{ videoId: "CRASE_04", title: "Crase - Módulo 4: Pronomes", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 4",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 4", type: "Resumo", placeholderColor: "bg-rose-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S4", content: "Antecedendo PRONOMES pessoais: ausência de crase." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 4 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM4}
          titulo="Quiz - Módulo 4: Pronomes Pessoais"
          numero={4}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-4", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║              MÓDULO 5: FACULTATIVO - NOMES PRÓPRIOS                   ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-5" className="mt-0 space-y-12">
        <ModuleBanner
          numero={5}
          titulo="Crase Facultativa: Nomes Próprios"
          variant="blue"
          descricao="Ambas as formas estão corretas"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Nomes Próprios Femininos: Artigo Opcional"
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              No estudo da crase, a incidência diante de nomes próprios femininos configura um dos raros cenários de uso facultativo, oferecendo ao falante ou redator a liberdade de escolha. Diferente das regras categóricas de proibição ou obrigatoriedade, esta diretriz permite que ambas as construções — com ou sem o acento grave — sejam consideradas gramaticalmente irrepreensíveis. Compreender essa dualidade é fundamental para evitar a eliminação precoce de alternativas corretas em questões de múltipla escolha.
            </p>
            <p>
              A fundamentação sintática para essa opcionalidade reside na própria natureza do artigo definido diante de antropônimos (nomes de pessoas). No padrão culto da língua portuguesa, o uso do artigo antes de um nome próprio não é uma exigência estrutural para a identificação do sujeito. Pode-se dizer tanto "Maria chegou" quanto "A Maria chegou". Consequentemente, se a presença do artigo "a" é opcional, a fusão dele com a preposição exigida pelo termo regente também se torna uma questão de escolha estilística.
            </p>
            <p>
              Essa flexibilidade carrega consigo sutilezas de tom e regionalismo. A omissão do artigo (e, logo, da crase) tende a conferir um distanciamento mais respeitoso e formal à frase, como em "Refiro-me a Joana". Em contrapartida, a inclusão do artigo denota maior familiaridade ou proximidade, refletindo-se na construção com crase: "Refiro-me à Joana". Para os propósitos da norma-padrão e das bancas examinadoras, ambas as formas operam em perfeita conformidade com as regras gramaticais vigentes, desde que o nome se apresente de forma simples.
            </p>
            <p>
              Existe, contudo, uma exceção crítica que anula a facultatividade: a especificação do nome próprio. Quando o nome feminino vem acompanhado de um determinante, seja um sobrenome, um título, um adjetivo ou uma locução que o individualize, o emprego do artigo definido torna-se estritamente obrigatório. Diante de um termo especificado, como em "Refiro-me à Maria do Carmo" ou "Entreguei o relatório à engenheira Paula", a crase deixa de ser uma opção e passa a ser uma exigência absoluta da norma culta.
            </p>
            <p>
              Em suma, o domínio dessa regra dupla é um diferencial estratégico, especialmente para redações corporativas e exames de alto nível. Na ausência de determinantes, sinta-se seguro para utilizar ou omitir o acento grave. Entretanto, o olhar do candidato deve ser clínico para identificar qualquer elemento qualificador anexo ao nome próprio. Reconhecer a transição imediata do cenário facultativo para o cenário obrigatório devido a uma simples especificação é o conhecimento cirúrgico exigido pelas questões mais elaboradas da CESGRANRIO.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Nomes Próprios Simples vs Especificados" variant="blue" />
          <ContentAccordion
            slides={[
              {
                titulo: "Nome Simples: Ambas Corretas",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Nome SIMPLES (sem especificador) = crase FACULTATIVA</p>
                    <ul className="space-y-2">
                      <li>✅ "Refiro-me <em>a</em> Maria" (SEM crase)</li>
                      <li>✅ "Refiro-me <em>à</em> Maria" (COM crase)</li>
                      <li className="text-sm italic text-muted-foreground">Ambas as formas são corretas!</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Nome Especificado: Crase Obrigatória",
                icone: <LuTriangleAlert className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Nome COM especificador (adjetivo/adjunto) = crase OBRIGATÓRIA</p>
                    <ul className="space-y-2">
                      <li>❌ "Refiro-me a Maria do Carmo" (ERRADO!)</li>
                      <li>✅ "Refiro-me <em>à</em> Maria do Carmo" (CORRETO!)</li>
                      <li className="text-sm italic text-muted-foreground">"do Carmo" especifica o nome, torna crase obrigatória</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Mais Exemplos de Especificação",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Quando artigo passa a ser obrigatório:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>"Refiro-me <em>à</em> Maria da Silva" (sobrenome = especificação)</li>
                      <li>"Entregue <em>à</em> Janete, a diretora" (aposição = especificação)</li>
                      <li>"Dirijo-me <em>à</em> Brasília, capital federal" (aposição = especificação)</li>
                      <li>"Viagem <em>à</em> Bahia de todos os santos" (complemento = especificação)</li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Card: Exemplos Práticos" variant="blue" />
          <CardCarousel
            cards={[
              {
                icone: "👩",
                title: "Maria (simples)",
                descricao: "a/à Maria (ambas corretas) ✓✓",
              },
              {
                icone: "👩",
                title: "Marina da Silva",
                descricao: "à Marina da Silva (especificado, crase obrigatória)",
              },
              {
                icone: "🌍",
                title: "Bahia (simples)",
                descricao: "a/à Bahia (ambas corretas) ✓✓",
              },
              {
                icone: "🌍",
                title: "Bahia de Todos os Santos",
                descricao: "à Bahia de Todos os Santos (especificado)",
              },
              {
                icone: "🏢",
                title: "Petrobrás (empresa)",
                descricao: "a/à Petrobrás (nome próprio, facultativo)",
              },
              {
                icone: "📍",
                title: "Distrito Federal",
                descricao: "ao/a Distrito Federal (nome próprio)",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Estratégia em Prova: Como Escolher?" variant="blue" />
          <AlertBox tipo="info" titulo="Quando Ambas Estão em Alternativas">
            <p>
              Se em uma questão de múltipla escolha aparecerem DUAS alternativas — uma "a Maria" e outra "à Maria" — com certeza apenas UMA será o gabarito (segundo a banca). A estratégia é:
            </p>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li><strong>Verifique o contexto:</strong> O nome está especificado?</li>
              <li><strong>Se SIM:</strong> Crase é obrigatória. Escolha "À".</li>
              <li><strong>Se NÃO:</strong> Crase é facultativa. Procure dicas de estilo ou formalidade no texto.</li>
              <li><strong>Em caso de dúvida:</strong> Procure por padrões na banca (CESGRANRIO costuma preferir formas mais formais, logo "À")</li>
            </ol>
            <p className="mt-4 font-semibold">
              Dica CESGRANRIO: Petrobras valoriza formalidade. Quando em dúvida, escolha COM crase (À).
            </p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Simples vs Especificado" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-violet-500/10 rounded-full shadow-inner ring-1 ring-violet-500/20">
                    <LuUser className="w-12 h-12 text-violet-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Nome Simples
                  </span>
                  <span className="text-sm text-violet-500/80 font-medium">
                    Ambas Corretas
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-violet-500 font-bold border-b border-violet-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Crase Facultativa</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Nomes próprios simples (apenas primeiro nome, sem sobrenome) FACULTAM o artigo. Portanto, a crase também é opcional.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Refiro-me <strong>a</strong> Daniela"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Refiro-me <strong>à</strong> Daniela"</p>
                </div>
              }
              categoria="Opção Estilística"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuTags className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Especificado
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    Artigo Exigido
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Crase Obrigatória</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Nomes especificados por sobrenome, título ou adjetivo EXIGEM a presença do artigo, tornando a crase obrigatória.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Refiro-me <strong>a</strong> Daniela Silva"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Refiro-me <strong>à</strong> Daniela Silva"</p>
                </div>
              }
              categoria="Exceção Fundamental"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20">
                    <LuKey className="w-12 h-12 text-purple-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Determinante
                  </span>
                  <span className="text-sm text-purple-500/80 font-medium">
                    O Artigo Muda Tudo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-purple-500 font-bold border-b border-purple-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">A Virada de Chave</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">A diferença fundamental reside na presença do determinante. Se o nome recebe qualificações no contexto, a facultatividade desaparece.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ Teste: "a/à Joana" (simples) vs "à Dra. Joana" (especificado).</p>
                </div>
              }
              categoria="Síntese Visual"
            />
          </div>
        </section>

        <AlertBox tipo="warning" titulo="Exceção: Artigos Usados Coloquialmente">
          <p>
            No português coloquial (especialmente em regiões), "a Maria" com artigo é muito comum. Escritores como Guimarães Rosa usavam "a Maria" frequentemente. Em literatura e na Petrobras (que valoriza norma padrão), "à Maria" (com crase) é preferido. Mas gramaticalmente, ambas são aceitas quando o nome é simples.
          </p>
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Antes de nomes próprios femininos, o uso da crase é:"
          alternativas={[
              { letra: "A", texto: "Obrigatório", correta: false },
              { letra: "B", texto: "Proibido", correta: false },
              { letra: "C", texto: "Facultativo", correta: true },
              { letra: "D", texto: "Obrigatório no plural", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Crase é facultativa porque o artigo também é (a Maria ou à Maria)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={5}
          variant="blue"
          video={{ videoId: "CRASE_05", title: "Crase - Módulo 5: Nomes Próprios", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 5", type: "Resumo", placeholderColor: "bg-violet-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S5", content: "Nomes próprios femininos: o uso do artigo é facultativo." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 5 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM5}
          titulo="Quiz - Módulo 5: Nomes Próprios"
          numero={5}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-5", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║              MÓDULO 6: FACULTATIVO - POSSESSIVOS                      ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-6" className="mt-0 space-y-12">
        <ModuleBanner
          numero={6}
          titulo="Crase Facultativa: Possessivos"
          variant="blue"
          descricao="Minha, Sua, Tua, Nossa (singular)"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Possessivos Femininos Singulares: Artigo Opcional"
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O estudo da crase diante de pronomes possessivos exige atenção redobrada à flexão de número da palavra. <strong>Antes de possessivos femininos singulares</strong> (como "minha", "tua", "sua", "nossa", "vossa"), <strong>a crase é estritamente facultativa</strong>. Isso ocorre porque o uso do artigo definido feminino singular antes desses pronomes já é, por si só, opcional na língua portuguesa normativa.
            </p>
            <p>
              A estrutura sintática reflete essa opcionalidade natural com precisão. Ao dizermos "Refiro-me <em>a</em> minha opinião" (utilizando apenas a preposição) ou "Refiro-me <em>à</em> minha opinião" (com artigo e preposição fundidos), ambas as construções estão absolutamente corretas. O pronome possessivo singular já possui carga semântica suficiente para determinar o substantivo que o acompanha, tornando a presença do artigo um adorno puramente estilístico.
            </p>
            <p>
              A dinâmica se transforma drasticamente, contudo, quando o pronome possessivo se encontra no <strong>plural</strong>. A gramática estabelece que, para manter a clareza e a harmonia estrutural da oração, o artigo definido plural "as" se torna <strong>obrigatório</strong> antes de possessivos no plural. Consequentemente, se o termo regente exige a preposição "a", a fusão é inevitável e <strong>a crase passa a ser inegociavelmente obrigatória</strong>.
            </p>
            <p>
              Essa dicotomia é frequentemente explorada em provas de alto nível como as da CESGRANRIO. Enquanto "Dirijo-me <em>a</em> sua equipe" ou "Dirijo-me <em>à</em> sua equipe" são variações aceitáveis no singular, a transição para o plural não tolera ambiguidades: <strong>"Dirijo-me <em>às</em> suas equipes"</strong> é a única forma admitida. A omissão da crase no plural ("Dirijo-me a suas equipes") constitui erro gramatical severo por violar a exigência do artigo definido.
            </p>
            <p>
              Outro ponto crítico surge na análise estrutural quando o possessivo <strong>substitui</strong> o substantivo em vez de acompanhá-lo. Se o pronome atua de forma substantivada (como núcleo autônomo do termo), o artigo passa a ser obrigatório para marcá-lo na oração, tornando a crase indispensável caso exista preposição exigida: "Não me refiro à sua ideia, mas <strong>à minha</strong>". O domínio absoluto dessa mecânica — acompanhar versus substituir, e singular versus plural — é o diferencial decisivo para gabaritar o tema.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={1} title="A Dinâmica do Pronome Possessivo" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuUser className="w-12 h-12 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Possessivo Singular
                  </span>
                  <span className="text-sm text-amber-500/80 font-medium">
                    Artigo Facultativo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Crase Opcional</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Possessivos singulares (minha, sua) tornam o uso do artigo opcional, fazendo com que a fusão seja facultativa.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Refiro-me <strong>a</strong> minha opinião"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Refiro-me <strong>à</strong> minha opinião"</p>
                </div>
              }
              categoria="Regra Base"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                    <LuUsers className="w-12 h-12 text-red-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Possessivo Plural
                  </span>
                  <span className="text-sm text-red-500/80 font-medium">
                    Artigo Exigido
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Crase Obrigatória</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Possessivos plurais (minhas, suas) EXIGEM artigo definido plural. A crase (fusão com "as") passa a ser inegociável.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Refiro-me <strong>a</strong> minhas opiniões"</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Refiro-me <strong>às</strong> minhas opiniões"</p>
                </div>
              }
              categoria="Alerta Crítico"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuArrowRightLeft className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Substituição
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    Omissão do Substantivo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Crase Obrigatória</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Quando o possessivo SUBSTITUI o substantivo na oração, o artigo se torna obrigatório para substantivá-lo, forçando a crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Não obedeço à sua regra, obedeço <strong>à</strong> minha."</p>
                </div>
              }
              categoria="pontos de atenção de Prova"
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Frequente: Confundir Singular/Plural">
          Muitos candidatos escrevem: "Dirijo-me a minhas análises" (SEM crase no plural). ERRADO! No plural, crase é <strong>obrigatória</strong>: "Dirijo-me <em>às</em> minhas análises". Essa confusão derrota até candidatos avançados. Leia com atenção ao número (singular/plural)!
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Antes de possessivos femininos, a crase é:"
          alternativas={[
              { letra: "A", texto: "Obrigatória", correta: false },
              { letra: "B", texto: "Proibida", correta: false },
              { letra: "C", texto: "Facultativa", correta: true },
              { letra: "D", texto: "Inexistente", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Como o artigo é opcional (a minha ou minha), a crase também é (a ou à minha)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={6}
          variant="blue"
          video={{ videoId: "CRASE_06", title: "Crase - Módulo 6: Possessivos", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 6", type: "Resumo", placeholderColor: "bg-orange-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S6", content: "Possessivos no singular: facultativo; no plural: obrigatório." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 6 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM6}
          titulo="Quiz - Módulo 6: Possessivos"
          numero={6}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-6", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                  MÓDULO 7: HORAS E MEDIDAS                             ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-7" className="mt-0 space-y-12">
        <ModuleBanner
          numero={7}
          titulo="Horas e Medidas"
          variant="blue"
          descricao="Crase Obrigatória com Horários e Expressões de Medida"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Horas Exatas e Expressões de Medida: Fusão Automática"
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O uso da crase na indicação de horas exatas e expressões de medida obedece a uma lógica matemática na sintaxe da língua portuguesa. <strong>Antes de horas pontuais e determinadas, a crase é estritamente obrigatória</strong>. A estrutura baseia-se na união inseparável da preposição "a" (que indica o limite de tempo ou momento) com o artigo definido feminino "as" (que determina o numeral das horas). O resultado inevitável dessa equação é "às".
            </p>
            <p>
              A estrutura fonética e visual reflete essa obrigatoriedade estrutural. Ao determinarmos um compromisso, redigimos "A reunião iniciará <em>às</em> 14h30" (preposição "a" + artigo plural "as"). A única variação de número ocorre no singular: "A inspeção ocorrerá <em>à</em> uma hora da tarde" (preposição "a" + artigo singular "a"). Independentemente do número, a crase marca presença garantindo que o tempo não é apenas uma estimativa, mas um ponto exato no relógio.
            </p>
            <p>
              A dinâmica se expande de forma análoga para as expressões de medida, proporção e velocidade. Estruturas fixas da língua, como locuções prepositivas e conjuntivas femininas, carregam a crase por força da tradição normativa e da clareza semântica. Assim, expressões como <strong>"à proporção que", "à medida que", "à velocidade de" e "à distância de"</strong> exigem a presença do acento grave, demarcando que a proporção ou medida é determinada.
            </p>
            <p>
              Nas avaliações da CESGRANRIO, o grande divisor de águas reside na capacidade do candidato de diferenciar horas exatas de horas aproximadas ou extensões de tempo. Se a indicação não exigir a preposição "a", a crase desaparece. Por exemplo, "Estou aguardando <em>desde as</em> 9 horas" (a preposição é "desde", logo, apenas o artigo "as" sobrevive, sem crase) ou "Chegarei <em>após as</em> 18h" (preposição "após").
            </p>
            <p>
              Outro ponto crítico, fonte de constantes deslizes em provas, é a confusão morfológica entre a fusão com a preposição "a" e a contração com a preposição "de". "Chegou por volta <strong>das</strong> 14 horas" (preposição "de" + artigo "as") difere sintaticamente de "Sempre chega <strong>às</strong> 14 horas" (preposição "a" + artigo "as"). Dominar a identificação da preposição exigida pelo contexto é a única salvaguarda contra as armadilhas clássicas envolvendo horários.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={1} title="A Lógica do Tempo e da Proporção" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuClock className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Horas Exatas
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    Preposição "A" exigida
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Crase Obrigatória</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Na indicação de horas pontuais (com a preposição A exigida), a fusão com o artigo (a/as) das horas força a crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "A operação começa <strong>às</strong> 8h em ponto."</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Cheguei <strong>à</strong> uma hora da tarde."</p>
                </div>
              }
              categoria="Regra Matemática"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuRuler className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Locuções de Medida
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    Estruturas Fixas
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Crase Obrigatória</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Locuções femininas que expressam proporção ou medida possuem crase fixa pela gramática.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Aumentava o ritmo <strong>à medida que</strong> corria."</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Multado por trafegar <strong>à velocidade de</strong> 120km/h."</p>
                </div>
              }
              categoria="Estrutura Cristalizada"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuHourglass className="w-12 h-12 text-orange-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Preposições Ocultas
                  </span>
                  <span className="text-sm text-orange-500/80 font-medium">
                    "Desde", "Após", "Para"
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-orange-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Atenção ao Contexto</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Se houver OUTRA preposição antes da hora, a preposição "A" desaparece, e não há crase!</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Estou aqui desde <strong>às</strong> 15h" (ERRADO)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Estou aqui <strong>desde as</strong> 15h" (CORRETO - sem crase)</p>
                </div>
              }
              categoria="Armadilha Clássica"
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Horas e Medidas" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <LuClock className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      HORAS EXATAS
                    </span>
                    <span className="text-sm text-emerald-600/80 dark:text-emerald-400/80 font-medium">
                      Crase Obrigatória
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 pb-2">Horários numerados (2h, 10h, 14h)</p>
                  <div className="space-y-3 flex-grow">
                    <p>Horas exatas sempre recebem artigo feminino definido (AS). Logo, "a" + "as" = crase obrigatória (ÀS). Padrão: "Às [número] horas".</p>
                    <div className="bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 text-sm">
                      <p>✅ "A reunião é <strong>às</strong> 14h" (horas exatas)</p>
                      <p>✅ "Chegue <strong>às</strong> 2 da tarde" (horas exatas)</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Regra de ouro: Horas exatas SEMPRE com crase (ÀS).</p>
                </div>
              }
            />
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20 text-blue-600 dark:text-blue-400">
                      <LuTimer className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      HORAS SINGULARES
                    </span>
                    <span className="text-sm text-blue-600/80 dark:text-blue-400/80 font-medium">
                      Atenção ao Artigo
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-blue-600 dark:text-blue-400 border-b border-blue-500/20 pb-2">Expressões com "uma" ou "meia"</p>
                  <div className="space-y-3 flex-grow">
                    <p>Quando a hora é singular (uma hora, meia hora), usa-se artigo singular "a". Logo, "a" + "a" = crase (À).</p>
                    <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10 text-sm">
                      <p>✅ "Chegue <strong>à</strong> uma hora" (singular = À)</p>
                      <p>✅ "Reunião <strong>à</strong> meia hora" (meia = singular = À)</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Singular = À. Plural/Exata = ÀS.</p>
                </div>
              }
            />
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20 text-purple-600 dark:text-purple-400">
                      <LuRuler className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      MEDIDAS E EXPRESSÕES
                    </span>
                    <span className="text-sm text-purple-600/80 dark:text-purple-400/80 font-medium">
                      Locuções Femininas
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-purple-600 dark:text-purple-400 border-b border-purple-500/20 pb-2">À vista, à longa distância, etc.</p>
                  <div className="space-y-3 flex-grow">
                    <p>Expressões de medida que contêm artigo feminino também recebem crase obrigatoriamente.</p>
                    <div className="bg-purple-500/5 p-3 rounded-lg border border-purple-500/10 text-sm">
                      <p>✅ "Viagem <strong>à</strong> vista" (expressão)</p>
                      <p>✅ "Pagamento <strong>à</strong> distância" (medida)</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Toda expressão de medida feminina recebe crase!</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Análise Estratégica: Indicação de Horas">
          Quando vê hora exata numa questão, pense: <strong>"Crase é amiga de horas!"</strong> Sempre que a frase menciona horário específico, há crase. Às 8, às 14:30, à uma — todas com crase. Não há exceção para horas exatas.
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado='Em "A reunião é ___ 14h30"'
          alternativas={[
              { letra: "A", texto: "a 14h30", correta: false },
              { letra: "B", texto: "à 14h30", correta: false },
              { letra: "C", texto: "às 14h30", correta: true },
              { letra: "D", texto: "em 14h30", correta: false }
            ]}
          dicaEstrategica="Indicação de hora:"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Analisar as alternativas e eliminar distratores com erros óbvios." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={7}
          variant="blue"
          video={{ videoId: "CRASE_07", title: "Crase - Módulo 7: Horas", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 7", type: "Resumo", placeholderColor: "bg-cyan-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S7", content: "Indicação de horas exatas exige o acento grave." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 7 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM7}
          titulo="Quiz - Módulo 7: Horas e Medidas"
          numero={7}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-7", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║              MÓDULO 8: CASA, TERRA, DISTÂNCIA                          ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-8" className="mt-0 space-y-12">
        <ModuleBanner
          numero={8}
          titulo="Casa, Terra e Distância"
          variant="blue"
          descricao="Regra da Especificação"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Casa, Terra e Distância: A Regra da Especificação"
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              As palavras "casa", "terra" e "distância" ocupam um lugar peculiar nas regras de crase, regidas por um princípio gramatical inflexível: <strong>a regra da especificação</strong>. Quando esses termos são empregados em seu sentido genérico e universal, eles repelem o uso do artigo feminino, inviabilizando qualquer possibilidade de ocorrência da crase, uma vez que falta a parcela definidora na equação.
            </p>
            <p>
              Tomemos como exemplo o termo "casa" no sentido de "próprio lar". Quando redigimos "Retornarei a casa ao anoitecer", a palavra assume uma semântica de moradia inespecífica. A preposição "a" exigida pelo verbo "retornar" não encontra o artigo feminino, resultando apenas na preposição pura. Contudo, se adicionamos um adjunto adnominal ou qualquer modificador ("Retornarei à casa de meus avós"), a especificação atrai obrigatoriamente o artigo feminino, consumando a fusão estrutural.
            </p>
            <p>
              A mesma lógica binária governa a palavra "terra". Quando empregada como antônimo de "bordo" ou "mar", em sua forma absoluta e desprovida de atributos, a crase é proibida: "Os marinheiros desceram a terra". Entretanto, basta que o termo receba um determinante que o particularize, como em "Retornou à terra de seus ancestrais" ou "Chegou à terra prometida", para que a crase se torne um elemento sintático indispensável.
            </p>
            <p>
              No tocante à "distância", o rigor gramatical se mantém. A locução "a distância", quando não especificada, afasta a crase ("Ensino a distância"). Mas, ao inserirmos uma medida exata ou um determinante claro, a preposição funde-se ao artigo que surge pela especificação: "A viatura estava posicionada à distância de cem metros" ou "Reconheceu o colega à longa distância". A precisão atrai a crase.
            </p>
            <p>
              Para os candidatos da CESGRANRIO, o domínio absoluto desta tríade é um diferencial competitivo vital. As bancas elaboram armadilhas sofisticadas mascarando a especificação em frases longas ou inserindo distratores entre o verbo e o termo genérico. Princípio Fundamental é cirúrgica: encontrou "casa", "terra" ou "distância"? Interrompa a leitura e busque imediatamente por qualquer palavra que limite ou defina esses substantivos.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={1} title="A Dinâmica da Especificação" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-teal-500/10 rounded-full shadow-inner ring-1 ring-teal-500/20">
                    <LuHouse className="w-12 h-12 text-teal-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    O Termo "Casa"
                  </span>
                  <span className="text-sm text-teal-500/80 font-medium">
                    Lar vs. Residência Alheia
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-teal-500 font-bold border-b border-teal-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Atenção ao Determinante</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Procure sempre o que vem depois da palavra "casa". A presença de apenas uma palavra descritiva muda toda a regra.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Vou <strong>a</strong> casa." (Genérica = SEM crase)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Vou <strong>à</strong> casa amarela." (Especificada = COM crase)</p>
                </div>
              }
              categoria="Regra do Lar"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuGlobe className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    O Teste da Terra
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    Contexto Náutico
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Oposição ao Mar</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Lembre-se do contexto náutico. Se puder trocar mentalmente por "chão", não haverá crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Lançou-se <strong>a</strong> terra." (Piso comum = SEM crase)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Lançou-se <strong>à</strong> terra prometida." (Especificada = COM crase)</p>
                </div>
              }
              categoria="Navegação e Origem"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                    <LuMapPin className="w-12 h-12 text-indigo-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    O Cálculo da Distância
                  </span>
                  <span className="text-sm text-indigo-500/80 font-medium">
                    Abstrata vs Mensurável
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-indigo-500 font-bold border-b border-indigo-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Foco na Medida</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Distância precisa de números ou determinantes para ganhar a crase. Expressões cristalizadas também a exigem.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Graduação <strong>a</strong> distância." (Genérica = SEM crase)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Tiro <strong>à</strong> queima-roupa e <strong>à</strong> longa distância." (Locuções fixas = COM crase)</p>
                </div>
              }
              categoria="Métrica e Espaço"
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={2} title="Prática: Aplicação em Contexto" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-teal-500/10 rounded-full shadow-inner ring-1 ring-teal-500/20">
                    <LuHouse className="w-12 h-12 text-teal-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    A Validação da Casa
                  </span>
                  <span className="text-sm text-teal-500/80 font-medium">
                    Análise Contextual
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-teal-500 font-bold border-b border-teal-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Varredura de Adjetivos</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Procure sempre o que vem depois da palavra "casa". A presença de apenas uma palavra descritiva muda toda a regra.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Vou <strong>a</strong> casa." (Genérica = SEM crase)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Vou <strong>à</strong> casa amarela." (Especificada = COM crase)</p>
                </div>
              }
              categoria="Prova Prática"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuGlobe className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Do Navio para o Chão
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    Contexto Náutico
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Gramática Histórica</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Lembre-se do contexto náutico da gramática histórica. Se puder trocar mentalmente por "chão", não haverá crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Lançou-se <strong>a</strong> terra." (Piso comum = SEM crase)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Lançou-se <strong>à</strong> terra prometida." (Lugar único = COM crase)</p>
                </div>
              }
              categoria="Prova Prática"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                    <LuMapPin className="w-12 h-12 text-indigo-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    A Prova Matemática
                  </span>
                  <span className="text-sm text-indigo-500/80 font-medium">
                    Abstrata vs Exata
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-indigo-500 font-bold border-b border-indigo-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Mensuração</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Distância precisa de números ou determinantes de extensão para ganhar a crase. Expressões cristalizadas também a exigem.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Graduação <strong>a</strong> distância." (EAD genérico = SEM crase)</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Tiro <strong>à</strong> queima-roupa." (Locução fixa = COM crase)</p>
                </div>
              }
              categoria="Prova Prática"
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Análise Visual: Critérios de Especificação">
          Quando a palavra for <strong>Casa, Terra ou Distância</strong>, ative o radar: olhe imediatamente para a DIREITA da palavra. Há algum detalhe extra? Uma posse, uma cor, uma medida? Se sim, marque a crase com segurança. Se não houver nada, a crase está proibida.
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={8}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado='Em "Vou ____ casa"'
          alternativas={[
              { letra: "A", texto: "Vou à casa (com crase)", correta: false },
              { letra: "B", texto: "Vou a casa (sem crase)", correta: true },
              { letra: "C", texto: "Vou casa (sem preposição)", correta: false },
              { letra: "D", texto: "Vou na casa (preposição diferente)", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Casa genérica não recebe artigo (vou a casa)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={8}
          variant="blue"
          video={{ videoId: "CRASE_08", title: "Crase - Módulo 8: Casa Terra", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 8", type: "Resumo", placeholderColor: "bg-teal-100" }],
          }}
          sinteseEstrategica={{ title: "Síntese Estratégica S8", content: "Casa/Terra genérica: sem crase; especificada: com crase." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 8 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM8}
          titulo="Quiz - Módulo 8: Casa, Terra, Distância"
          numero={8}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-8", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                MÓDULO 9: PRONOMES DEMONSTRATIVOS                       ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-9" className="mt-0 space-y-12">
        <ModuleBanner
          numero={9}
          titulo="Pronomes Demonstrativos: Àquele, Àquela, Àquilo"
          variant="blue"
          descricao="Fusão Especial da Preposição com Demonstrativos"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Demonstrativos: A Fusão Especial do Acento Grave"
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O estudo da crase frequentemente se concentra na fusão entre a preposição "a" e o artigo definido feminino "a", mas existe uma segunda categoria gramatical igualmente sujeita a esse fenômeno: <strong>os pronomes demonstrativos iniciados pela vogal "a"</strong>. Esta regra engloba especificamente os pronomes "aquele", "aquela", "aqueles", "aquelas" e "aquilo". Nesses casos, o acento grave não marca a junção de artigo e preposição, mas a fusão oblíqua da preposição exigida pelo termo regente com a vogal inicial do próprio pronome.
            </p>
            <p>
              A lógica sintática permanece inalterada, baseando-se na transitividade. Se um verbo ou nome exige a preposição "a" e o complemento que se segue é o pronome "aquele", a língua portuguesa não permite a repetição cacofônica "Refiro-me a aquele". A solução gramatical elegante é a fusão, sinalizada pelo acento grave: "Refiro-me <em>àquele</em>". Esta marca gráfica condensa os dois elementos em uma única estrutura sonora e visual, mantendo a integridade semântica da frase.
            </p>
            <p>
              O ponto crucial de diferenciação para as bancas examinadoras reside no contraste com os pronomes demonstrativos que indicam proximidade. Os pronomes "este", "esta", "esse" e "essa" não iniciam com a vogal "a". Consequentemente, não oferecem a base fonética necessária para que a fusão ocorra. Quando um termo rege a preposição "a" diante desses pronomes, a preposição permanece isolada e íntegra. Dizemos corretamente: "Refiro-me <em>a este</em> relatório", sem qualquer traço de crase.
            </p>
            <p>
              Para validar a ocorrência da crase diante de "aquele", o mecanismo de verificação é simples e eficaz: substitui-se o pronome "aquele" por "a este". Se na substituição a preposição "a" se mantiver preservada e fizer sentido sintático (como em "Dirigiu-se a este" como prova de "Dirigiu-se àquele"), a crase está gramaticalmente confirmada. O uso de pronomes neutros, como "aquilo", segue rigorosamente o mesmo preceito: "Dediquei-me <em>àquilo</em> com afinco".
            </p>
            <p>
              Nas avaliações da CESGRANRIO, as questões envolvendo pronomes demonstrativos tendem a explorar a desatenção visual do candidato, misturando "àquela" com "a esta" em estruturas coordenadas. Textos técnicos e normativos da Petrobras frequentemente utilizam esses pronomes para retomar normas e diretrizes anteriores. Dominar a identificação mecânica da preposição regente e a análise da vogal inicial do pronome é a chave para não ceder a essas armadilhas pontuais.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={1} title="A Dinâmica dos Pronomes" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20">
                    <LuHand className="w-12 h-12 text-purple-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Iniciados por "A"
                  </span>
                  <span className="text-sm text-purple-500/80 font-medium">
                    Aquele, Aquela, Aquilo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-purple-500 font-bold border-b border-purple-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Fusão Direta</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">O choque fonético da preposição com a inicial do pronome gera a crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Dirijo-me <strong>àquela</strong> senhora."</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Atento <strong>àquilo</strong> que vejo."</p>
                </div>
              }
              categoria="Regra de Proximidade"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuPointer className="w-12 h-12 text-orange-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Sem Vogal "A"
                  </span>
                  <span className="text-sm text-orange-500/80 font-medium">
                    Este, Esta, Esse, Essa
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-orange-500/10 pb-3">
                    <LuUserX className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Sem Fusão Possível</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">A ausência da vogal "A" no início da palavra impossibilita a existência da crase.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ "Dirijo-me <strong>à</strong> esta senhora."</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Dirijo-me <strong>a</strong> esta senhora."</p>
                </div>
              }
              categoria="Conflito Fonético"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-rose-500/10 rounded-full shadow-inner ring-1 ring-rose-500/20">
                    <LuBrainCircuit className="w-12 h-12 text-rose-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    O Teste Lógico
                  </span>
                  <span className="text-sm text-rose-500/80 font-medium">
                    Substituição Mental
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-rose-500 font-bold border-b border-rose-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Confirmação Tática</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Troque "àquele" por "a este". Se a frase fizer sentido e preservar o "a", a crase está correta.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ "Vou <strong>àquele</strong> (a este) local."</p>
                </div>
              }
              categoria="Análise de Prova"
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={2} title="Prática: A Fusão Especial" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20 text-purple-600 dark:text-purple-400">
                      <LuMousePointer2 className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      O DEMONSTRATIVO NEUTRO
                    </span>
                    <span className="text-sm text-purple-600/80 dark:text-purple-400/80 font-medium">
                      Caso Peculiar
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-purple-600 dark:text-purple-400 border-b border-purple-500/20 pb-2">O caso peculiar de "Aquilo"</p>
                  <div className="space-y-3 flex-grow">
                    <p>Muitos esquecem que "aquilo" também entra na regra. Sendo um pronome neutro que inicia em "a", a fusão é obrigatória sob a regência correta.</p>
                    <div className="bg-purple-500/5 p-3 rounded-lg border border-purple-500/10 text-sm">
                      <p>✅ "Não dei atenção <strong>àquilo</strong> que disseram."</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Não importa se a referência é neutra, a regra gramatical é sonora.</p>
                </div>
              }
            />
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20 text-orange-600 dark:text-orange-400">
                      <LuLayers className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      O CONTRASTE IMEDIATO
                    </span>
                    <span className="text-sm text-orange-600/80 dark:text-orange-400/80 font-medium">
                      Diferenciação Visual
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-orange-600 dark:text-orange-400 border-b border-orange-500/20 pb-2">Lado a Lado na Prova</p>
                  <div className="space-y-3 flex-grow">
                    <p>Provas adoram coordenar as duas regras na mesma sentença para confundir o candidato entre demonstrativos.</p>
                    <div className="bg-orange-500/5 p-3 rounded-lg border border-orange-500/10 text-sm">
                      <p>✅ "Prefiro <strong>esta</strong> máquina <strong>àquela</strong> outra."</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Observe a diferença gráfica ditada apenas pela vogal inicial!</p>
                </div>
              }
            />
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-rose-500/10 rounded-full shadow-inner ring-1 ring-rose-500/20 text-rose-600 dark:text-rose-400">
                      <LuCircleAlert className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      A PREPOSIÇÃO DE
                    </span>
                    <span className="text-sm text-rose-600/80 dark:text-rose-400/80 font-medium">
                      Destino Falso
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-rose-600 dark:text-rose-400 border-b border-rose-500/20 pb-2">Cuidado com o Destino Falso</p>
                  <div className="space-y-3 flex-grow">
                    <p>A fusão só acontece com a preposição A. Contrações com "De" ou "Em" geram formas diferentes ("daquilo", "naquilo").</p>
                    <div className="bg-rose-500/5 p-3 rounded-lg border border-rose-500/10 text-sm">
                      <p>❌ "Não gosto <strong>àquilo</strong>." (Gostar rege "De")</p>
                      <p>✅ "Não gosto <strong>daquilo</strong>."</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">A crase só existe se a transitividade for para "A".</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Análise Visual: Identificação de Vogais">
          Encontrou um pronome demonstrativo na prova? O radar é direto: <strong>A palavra começa com a vogal A?</strong> Se sim (Aquele, Aquela, Aquilo) e o verbo pedir, marque a crase. Se não começar com A (Este, Essa), a crase está sumariamente vetada. A gramática aqui é puramente visual.
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={9}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual alternativa está CORRETA com pronomes demonstrativos?"
          alternativas={[
              { letra: "A", texto: "Aludi àquilo que você disse", correta: false },
              { letra: "B", texto: "Aludi àquele documento", correta: false },
              { letra: "C", texto: "Aludi àqueles rapazes", correta: false },
              { letra: "D", texto: "Todas as alternativas estão corretas", correta: true }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Pronomes demonstrativos (aquele, aquela, aquilo, etc.) recebem crase quando há preposição" },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa D como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={9}
          variant="blue"
          video={{ videoId: "CRASE_09", title: "Crase - Módulo 9: Demonstrativos", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 9", type: "Resumo", placeholderColor: "bg-indigo-100" }],
          }}
          sinteseEstrategica={{ title: "Macete M9", content: "Àquele/Àquela/Àquilo: crase sempre (a + aquele)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 9 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM9}
          titulo="Quiz - Módulo 9: Demonstrativos"
          numero={9}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-9", s)}
        />
      </TabsContent>

      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                    MÓDULO 10: SIMULADO INTEGRADO                       ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-10" className="mt-0 space-y-12">
        <ModuleBanner
          numero={10}
          titulo="Simulado Integrado: Consolidação Total"
          variant="blue"
          descricao="Teste seus conhecimentos em todas as regras de crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Consolidação Estratégica: O Domínio Definitivo da Crase"
            variant="blue"
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              A jornada analítica pelas regras da crase culmina em uma etapa crucial de consolidação. Compreender cada regra isoladamente é o primeiro passo gramatical, mas o verdadeiro teste de proficiência, especialmente nas exigentes provas da CESGRANRIO, requer a capacidade de aplicar essas normativas de forma integrada e sob pressão. A crase não é um conjunto de exceções caóticas, mas um sistema lógico construído sobre a premissa imutável da fusão.
            </p>
            <p>
              No cerne de todo o aprendizado repousa a "Equação Fundamental": a crase só existe quando a regência sintática demanda a preposição "a" e a semântica do termo subsequente autoriza o uso do artigo feminino "a" (ou os pronomes demonstrativos iniciados pela mesma vogal). Se, mediante a análise da frase, qualquer um desses dois componentes estiver ausente, a ocorrência do acento grave está terminantemente vetada. Esse é o princípio zero da resolução de questões.
            </p>
            <p>
              O "Teste do Masculino" desponta como a ferramenta tática mais poderosa do arsenal do candidato. Ao substituir o termo feminino em dúvida por um termo masculino equivalente, a revelação é imediata. O surgimento do termo "ao" ratifica a crase original; a presença isolada de "a" ou "o" a proíbe. Esta prova matemática gramatical resolve a vasta maioria dos conflitos sintáticos cotidianos e acadêmicos.
            </p>
            <p>
              A memorização ativa dos bloqueios absolutos protege o candidato das armadilhas mais comuns. A crase repudia verbos no infinitivo e a esmagadora maioria dos pronomes pessoais. Ela é facultativa diante de nomes próprios femininos e pronomes possessivos femininos no singular, mas se torna estritamente obrigatória em horas exatas e expressões adverbiais cristalizadas. Entender as fronteiras da crase é tão vital quanto saber onde aplicá-la.
            </p>
            <p>
              Enfrentar o simulado a seguir não é apenas medir acertos, mas calibrar o olhar investigativo. Ao destrinchar as frases de contexto técnico e corporativo típicas da Petrobras, o foco deve repousar na identificação imediata de especificadores, locuções fixas e exigências transitivas. A excelência neste exame garante não apenas o ponto na prova, mas a fluência na redação técnica profissional que define um servidor de alto calibre.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={1} title="O Arsenal Analítico" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-slate-500/10 rounded-full shadow-inner ring-1 ring-slate-500/20">
                    <LuScale className="w-12 h-12 text-slate-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    A Prova de Fogo
                  </span>
                  <span className="text-sm text-slate-500/80 font-medium">
                    Substituição Masculina
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-slate-500 font-bold border-b border-slate-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">O Método Primário</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">A primeira ação ao encontrar uma dúvida é tentar a substituição por um termo masculino equivalente.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ Se virar "AO" = Crase confirmada.</p>
                </div>
              }
              categoria="Metodologia Base"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuListChecks className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    O Triângulo Proibido
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    Verbos, Pronomes, Genéricos
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuUserX className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Bloqueio Automático</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Antes de perder tempo, verifique se a palavra a seguir é um verbo no infinitivo, pronome pessoal ou palavra genérica.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">❌ Nesses cenários, corte a crase imediatamente.</p>
                </div>
              }
              categoria="Filtro Rápido"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuGraduationCap className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    As Margens Facultativas
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    Nomes e Possessivos
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Análise de Contexto</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">Diante de nomes próprios femininos e possessivos femininos singulares, a crase descansa no livre arbítrio.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">✅ Ambas as formas (a/à) estão gramaticalmente impecáveis.</p>
                </div>
              }
              categoria="Zona Neutra"
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={2} title="Prática: Mapeamento de Prova" variant="blue" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-slate-500/10 rounded-full shadow-inner ring-1 ring-slate-500/20 text-slate-600 dark:text-slate-400">
                      <LuBookOpen className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      QUESTÃO ESTRUTURAL
                    </span>
                    <span className="text-sm text-slate-600/80 dark:text-slate-400/80 font-medium">
                      Pluralidade e Regra
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-500/20 pb-2">"Referiu-se ___ normas da empresa."</p>
                  <div className="space-y-3 flex-grow">
                    <p>A CESGRANRIO testa a percepção de pluralidade. Se a palavra está no plural ("normas") e não há crase (A singular), a gramática falha.</p>
                    <div className="bg-slate-500/5 p-3 rounded-lg border border-slate-500/10 text-sm">
                      <p>✅ O correto exige crase e concordância: <strong>ÀS normas</strong>.</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Dissonância de plural é o erro mais comum.</p>
                </div>
              }
            />
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <LuClock className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      QUESTÃO TEMPORAL
                    </span>
                    <span className="text-sm text-emerald-600/80 dark:text-emerald-400/80 font-medium">
                      Preposição Prévia
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 pb-2">"Reunião agendada para ___ 14h."</p>
                  <div className="space-y-3 flex-grow">
                    <p>A armadilha da preposição prévia. A palavra "para" já cumpre o papel de preposição, impedindo a entrada do "a".</p>
                    <div className="bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10 text-sm">
                      <p>✅ Fica apenas o artigo: "Para <strong>as</strong> 14h".</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Se há "desde", "para" ou "após", adeus crase.</p>
                </div>
              }
            />
            <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20 text-blue-600 dark:text-blue-400">
                      <LuBuilding className="w-8 h-8" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      QUESTÃO DE LOCUÇÃO
                    </span>
                    <span className="text-sm text-blue-600/80 dark:text-blue-400/80 font-medium">
                      Gênero da Expressão
                    </span>
                  </div>
                }
                verso={
                <div className="space-y-4 p-4 flex flex-col h-full">
                  <p className="font-semibold text-blue-600 dark:text-blue-400 border-b border-blue-500/20 pb-2">"Venderam os ativos ___ prazo."</p>
                  <div className="space-y-3 flex-grow">
                    <p>O falso cognato da medida. "Prazo" é palavra masculina. A crase diante de palavras masculinas é proibida.</p>
                    <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/10 text-sm">
                      <p>✅ Fica "a prazo" (sem crase) e "à vista" (com crase).</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">Sempre verifique o gênero da locução adverbial.</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Estratégia Final: O Triângulo de Ouro">
          Na hora da prova, seu raciocínio deve ser automático: 1) A palavra a seguir aceita artigo feminino? 2) O termo anterior exige preposição A? 3) É uma exceção clássica (hora/demonstrativo)? Se a resposta para as três for clara, marque com confiança. A CESGRANRIO não esconde a crase, ela apenas exige que você execute os testes básicos metodicamente.
        </AlertBox>

        <AlertBox tipo="success" titulo="Você Domina Crase Agora!">
          <p>
            Parabéns! Você completou os 9 módulos de aprendizado e agora domina as 9 regras de crase de forma sistemática. Na prova, confie na equação A+A=À, use o teste do masculino, identifique categorias (verbo, pronome, hora, casa, etc.) e aplique as regras específicas. Com essa estrutura lógica, você acertará 95% das questões de crase. Vá em frente!
          </p>
        </AlertBox>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={10}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado='Em "A Petrobras dedica-se ____ inovação e ____ desenvolvimento"'
          alternativas={[
              { letra: "A", texto: "a / a", correta: false },
              { letra: "B", texto: "à / à", correta: false },
              { letra: "C", texto: "a / à", correta: true },
              { letra: "D", texto: "à / a", correta: false }
            ]}
          dicaEstrategica="Desenvolvimento é masculino (a desenvolvimento)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Inovação é feminino (à inovação)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={10}
          variant="blue"
          video={{ videoId: "CRASE_10", title: "Crase - Módulo 10: Simulado", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 10",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 10", type: "Resumo", placeholderColor: "bg-slate-100" }],
          }}
          sinteseEstrategica={{ title: "Macete M10", content: "Domine a equação e o teste do masculino: 95% resolvidas." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 10 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM10}
          titulo="Quiz Final - Módulo 10: Simulado Integrado"
          numero={10}
          variant="blue"
          onComplete={(s) => handleModuleComplete("modulo-10", s)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
