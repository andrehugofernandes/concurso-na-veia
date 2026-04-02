"use client";

import { getAllModuleVariants, getModuleVariant } from "@/lib/moduleColors";
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
} from "../shared";
import {
  LuCheck,
  LuZap,
  LuBookOpen,
  LuTarget,
  LuTriangleAlert,
  LuLightbulb,
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

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

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
      {/* ╔════════════════════════════════════════════════════════════════════════╗ */}
      {/* ║                        MÓDULO 1: CONCEITO                              ║ */}
      {/* ╚════════════════════════════════════════════════════════════════════════╝ */}
      <TabsContent value="modulo-1" className="mt-0 space-y-12">
        <ModuleBanner
          numero={1}
          titulo="Conceito e Regra Geral"
          variant={mv[1]}
          descricao="A + A = À: A Equação Fundamental"
        />

        {/* ★ RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="A Crase: Fusão de Duas Vogais Idênticas"
            variant={mv[1]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Crase é a fusão gráfica da preposição "a" com o artigo definido feminino "a" (ou com pronomes demonstrativos iniciados por "a")</strong>. Quando essas duas vogais idênticas se encontram em sequência, uma delas desaparece, mas a fusão é marcada pelo acento grave (´), criando o símbolo: <strong>à</strong>. Essa é a razão matemática da crase: A (preposição) + A (artigo) = À.
            </p>
            <p>
              A crase não é um erro ou capricho da linguagem — é um fenômeno fonético natural do português. Segundo a Nomenclatura Gramatical Brasileira (NGB), a crase é um processo de <em>elisão</em>, ou seja, a supressão de uma vogal quando duas vogais iguais se encontram. Historicamente, o português herdou essa tendência do latim, onde as vogais gemidas (repetidas) eram unificadas na pronúncia. A escrita apenas representou graficamente essa realidade linguística.
            </p>
            <p>
              Na Petrobras, documentos técnicos, procedimentos operacionais e comunicações formais utilizam crase constantemente. Relatórios de conformidade mencionam: "conforme referência <em>à</em> NBR 13434", "atento <em>à</em> resolução", "direcionado <em>à</em> segurança operacional". Um erro de crase em um documento contratual ou em uma instrução de trabalho pode prejudicar a interpretação jurídica ou criar ambiguidade crítica. Por isso, a CESGRANRIO cobra crase recorrentemente — testando não apenas conhecimento gramatical, mas a capacidade de aplicar regras sob pressão profissional.
            </p>
            <p>
              A estratégia de domínio da crase repousa em um processo lógico de 3 passos: <strong>1) Identificar se há preposição "a" exigida</strong>, <strong>2) Verificar se há artigo "a" ou demonstrativo "aquele/a/o" exigido</strong>, <strong>3) Se ambos estão presentes, há crase</strong>. Candidatos que decoram exceções sem entender a regra base fracassam; candidatos que dominam a equação acertam 95% das questões em menos de 30 segundos.
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
          <ModuleSectionHeader index={2} title="Os Três Pilares da Crase" variant={mv[1]} />
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
                    <p className="font-semibold">Macete: Teste do masculino funciona aqui perfeitamente:</p>
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
          <ModuleSectionHeader index={3} title="Exemplos Práticos: Crase Obrigatória" variant={mv[1]} />
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
          <ModuleSectionHeader index={4} title="Regência: Verbos e Nomes que Exigem A" variant={mv[1]} />
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
          <ModuleSectionHeader index={5} title="Prática: Identifique a Crase" variant={mv[1]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">A EQUAÇÃO FUNDAMENTAL</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-blue-400">A (preposição) + A (artigo) = À</p>
                  <p>A crase não é um erro — é uma fusão gráfica de duas vogais iguais. Quando a preposição "a" (exigida pelo verbo) encontra o artigo "a" (exigido pelo substantivo), elas se fundem em um único símbolo com acento grave.</p>
                  <p>✅ "Vou <strong>à</strong> praia" (vou A + A praia)</p>
                  <p>❌ "Vou <strong>a</strong> pé" (vou A, mas PÉ é masculino, sem artigo)</p>
                  <p className="text-muted-foreground">A equação só funciona com ambas as peças presentes.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">TESTE DO LUGAR</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-emerald-400">Preposição exigida pelo contexto</p>
                  <p>Verbos de movimento ou relacionamento exigem a preposição "a". Exemplos: IR, VIR, DIRIGIR-SE, REFERIR-SE. Quando seguidos de substantivo feminino com artigo, há crase.</p>
                  <p>✅ "Dirijo-me <strong>à</strong> gerência" (dirigir-se A + A gerência)</p>
                  <p>✅ "Dedico-me <strong>à</strong> pesquisa" (dedicar A + A pesquisa)</p>
                  <p className="text-muted-foreground">O primeiro "a" vem da regência verbal, não é opcional.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">TRÊS PILARES DA CRASE</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-purple-400">Obrigatória, Proibida ou Facultativa</p>
                  <p>A crase ocorre em três contextos: OBRIGATÓRIA (ambas as peças presentes), PROIBIDA (falta a preposição ou artigo), FACULTATIVA (artigo é opcional).</p>
                  <p>✅ OBRIGATÓRIA: "Vou à praia"</p>
                  <p>❌ PROIBIDA: "Comecei a estudar" (verbo, sem artigo)</p>
                  <p className="text-muted-foreground">Em concursos, identifique qual contexto para não errar.</p>
                </div>
              }
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
        <ModuleConsolidation
          index={1}
          variant={mv[1]}
          video={{ videoId: "CRASE_01", title: "Crase - Módulo 1: Conceito", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 1", type: "Resumo", placeholderColor: "bg-blue-100" }],
          }}
          maceteVisual={{ title: "Macete M1", content: "A + A = À: Se preposição A + artigo A, há crase." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 1 - Crase", artista: "Petrobras Quest" }}
        />

        {/* ★ QUIZ */}
        <QuizInterativo
          questoes={quizM1}
          titulo="Quiz - Módulo 1: Conceito e Regra Geral"
          numero={1}
          variant={mv[1]}
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
          variant={mv[2]}
          descricao="A técnica mais poderosa para identificar crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="O Macete de Ouro: Substitua por Masculino"
            variant={mv[2]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O <strong>teste do masculino</strong> é a técnica mais poderosa para identificar crase. O método é simples: substitua a palavra feminina por um equivalente masculino. Se o resultado virar "A**O**", então há crase (À). Se virar apenas "A", então não há crase.
            </p>
            <p>
              Exemplos: "Vou <strong>à</strong> praia" → "Vou <strong>ao</strong> museu" (virou AO, confirma à). "Refiro-me <strong>à</strong> Maria" → "Refiro-me <strong>ao</strong> João" (virou AO, confirma à). "Comeci <strong>a</strong> estudar" → "Comeci a trabalhar" (continua A, sem crase).
            </p>
            <p>
              Esse teste funciona porque a estrutura gramatical se mantém. Se há fusão no masculino (que resultaria em AO), a mesma fusão ocorre no feminino (resultando em À). Se no masculino a preposição fica simples (A), no feminino também fica simples (A).
            </p>
            <p>
              Na Petrobras, essa técnica é ouro puro. Quando você recebe um documento técnico com lacunas de crase ("atento ____ resolução"), aplique o teste: "atento ao regulamento" (virou AO) → "atento <strong>à</strong> resolução" (há crase). Esse método desmente qualquer confusão e dirimi dúvidas em segundos.
            </p>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuZap className="w-5 h-5 text-emerald-500" /> Técnica do Teste Masculino
              </h4>
              <p className="text-foreground/85">
                Substitua a palavra feminina por um equivalente masculino:
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li>• <strong>Vira "AO"?</strong> → Há crase (À)</li>
                <li>• <strong>Continua "A"?</strong> → Sem crase (A)</li>
              </ul>
              <p className="text-sm italic text-foreground/70">
                Este teste é 95% confiável e funciona em quase todos os casos de crase!
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos Práticos: Teste Passo a Passo" variant={mv[2]} />
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
          <ModuleSectionHeader index={3} title="Card: Casos Comuns de Teste" variant={mv[2]} />
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
          <ModuleSectionHeader index={4} title="Casos que Enganam: Quando o Teste Falha" variant={mv[2]} />
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
          <ModuleSectionHeader index={5} title="Prática: Aplique o Teste" variant={mv[2]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">🎯 TESTE DO MASCULINO</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-emerald-400">Substitua por equivalente masculino</p>
                  <p>Troque a palavra feminina por um masculino equivalente. Se virar "AO", há crase. Se continuar "A", não há crase. Exemplo: "Vou à festa" → "Vou ao baile" (virou AO).</p>
                  <p>✅ "Vou <strong>à</strong> festa" (virou AO, há crase)</p>
                  <p>❌ "Fui <strong>a</strong> pé" (continua A, sem crase)</p>
                  <p className="text-muted-foreground">Este teste funciona em 95% dos casos!</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">✅ RESULTADO: "AO"</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-green-500">Virou "AO" → Há CRASE</p>
                  <p>Quando o teste do masculino resulta em "AO", significa que a estrutura contém tanto a preposição quanto o artigo. Portanto, no feminino haverá crase (À).</p>
                  <p>✅ "Assisti <strong>à</strong> apresentação" (Assisti ao show → AO)</p>
                  <p>✅ "Dedico-me <strong>à</strong> leitura" (Dedico-me ao livro → AO)</p>
                  <p className="text-muted-foreground">A regra é constante: preposição + artigo = crase.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">❌ RESULTADO: "A"</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-red-400">Continua "A" → SEM CRASE</p>
                  <p>Se o teste resulta em apenas "A" (não "AO"), significa que falta uma das peças da equação. Pode ser porque há verbo (sem artigo) ou porque o equivalente masculino já não tem artigo.</p>
                  <p>❌ "Comecei <strong>a</strong> trabalhar" (Comecei a estudar → A)</p>
                  <p>❌ "Fui <strong>a</strong> pé" (Fui a cavalo → A)</p>
                  <p className="text-muted-foreground">Sem ambas as peças, não há crase, sempre.</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Macete de Memorização">
          Pense no teste do masculino como um <strong>"Detector de AO"</strong>. Se detecta "AO", há crase (À). Se não detecta (continua "A"), sem crase. Simples assim!
        </AlertBox>

        <ModuleConsolidation
          index={2}
          variant={mv[2]}
          video={{ videoId: "CRASE_02", title: "Crase - Módulo 2: Teste Masculino", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 2", type: "Resumo", placeholderColor: "bg-amber-100" }],
          }}
          maceteVisual={{ title: "Macete M2", content: "AO no masculino? Tem crase no feminino (À)!" }}
          audio={{ audioUrl: "#", titulo: "AudioAula 2 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM2}
          titulo="Quiz - Módulo 2: Teste do Masculino"
          numero={2}
          variant={mv[2]}
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
          variant={mv[3]}
          descricao="Por que verbos nunca levam crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="A Razão Gramatical: Verbos Não Aceitam Artigo"
            variant={mv[3]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Verbos nunca aceitam artigo definido</strong>. É uma regra gramical inviolável. Você não diz "o estudar", "a correr", "o trabalhar" — essas construções soam erradas porque verbos são palavras de ação, não nomes (substantivos), e nomes é que aceitam artigos. Como verbo não aceita artigo "a", quando há uma preposição "a" antes do verbo, ela fica simples: não há artigo para se fundir com, portanto, sem crase.
            </p>
            <p>
              <strong>Estrutura: Preposição A + Verbo (sem artigo) = A (simples, nunca À)</strong>
            </p>
            <p>
              Exemplos: "Começou <em>a</em> chover" (A + verbo chover, sem artigo). "Procedeu <em>a</em> realizar" (A + verbo realizar). "Passou <em>a</em> trabalhar" (A + verbo trabalhar). Em todos esses casos, o verbo rejeita o artigo, logo a preposição fica sozinha, sem crase.
            </p>
            <p>
              Na Petrobras, textos técnicos dizem: "O procedimento passou <em>a</em> incluir...", "A empresa procedeu <em>a</em> investigar...", "Começou <em>a</em> implementar...". Candidatos ingênuos colocam crase aqui e erram feio. A regra é clara: verbo = sem crase, sempre.
            </p>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-xl border border-red-200 dark:border-red-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuTriangleAlert className="w-5 h-5 text-red-500" /> Regra de Ouro: VERBO = SEM CRASE
              </h4>
              <p className="text-foreground/85">
                Verbo infinitivo NUNCA leva crase, porque verbo não aceita artigo.
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-red-500">
                <p className="text-foreground/80">
                  ❌ "Começou <strong>à</strong> estudar" — ERRADO!
                </p>
                <p className="text-foreground/80">
                  ✅ "Começou <strong>a</strong> estudar" — CORRETO!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Verbos Comuns que Exigem Preposição A" variant={mv[3]} />
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
          <ModuleSectionHeader index={3} title="Exemplos: Erros Frequentes com Verbos" variant={mv[3]} />
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
          <ModuleSectionHeader index={4} title="Armadilha: Adjetivo + Infinitivo" variant={mv[3]} />
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
          <ModuleSectionHeader index={5} title="Prática: Verbos vs Substantivos" variant={mv[3]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">⛔ VERBO = SEM CRASE</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-red-400">Verbos NUNCA aceitam artigo</p>
                  <p>Quando a preposição "a" é seguida de um verbo no infinitivo, NÃO há crase. Verbos não recebem artigo. A estrutura é: preposição A + verbo (sem artigo).</p>
                  <p>❌ "Começou <strong>à</strong> chover" (ERRADO)</p>
                  <p>✅ "Começou <strong>a</strong> chover" (CORRETO - verbo, sem artigo)</p>
                  <p className="text-muted-foreground">Macete: Se há verbo após "a", SEMPRE sem crase!</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">✅ SUBSTANTIVO = COM CRASE</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-green-500">Substantivos aceitam artigo</p>
                  <p>Quando a preposição "a" é seguida de um substantivo feminino COM artigo, há crase. A estrutura é: preposição A + artigo A + substantivo feminino = À.</p>
                  <p>❌ "Dedico-me <strong>a</strong> pesquisa" (sem artigo, sem crase)</p>
                  <p>✅ "Dedico-me <strong>à</strong> pesquisa" (com artigo, com crase)</p>
                  <p className="text-muted-foreground">Se o substantivo tiver artigo definido feminino, há crase obrigatória.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">🔑 DIFERENÇA CRÍTICA</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-amber-400">Verbo vs Substantivo</p>
                  <p>VERBO: Ação, infinitivo. Exemplo: "começar", "fazer", "ir". Não recebe artigo. Logo: SEM CRASE.</p>
                  <p>SUBSTANTIVO: Nome, coisa. Exemplo: "pesquisa", "empresa", "data". Pode receber artigo. Logo: COM CRASE (se houver artigo).</p>
                  <p>✅ "Procedeu <strong>a</strong> verificar" (verbo = sem crase)</p>
                  <p>✅ "Procedeu <strong>à</strong> análise" (substantivo + artigo = com crase)</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Crítico Frequente em Concursos">
          A CESGRANRIO adora colocar frases como "Procedeu <em>___</em> fiscalização" vs "Procedeu <em>___</em> fiscalizar". A primeira tem crase (À), a segunda não (A). Muitos candidatos erram porque não diferenciam substantivo (aceitaartigo) de verbo (rejeita artigo). Leia com atenção!
        </AlertBox>

        <ModuleConsolidation
          index={3}
          variant={mv[3]}
          video={{ videoId: "CRASE_03", title: "Crase - Módulo 3: Verbos", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 3", type: "Resumo", placeholderColor: "bg-emerald-100" }],
          }}
          maceteVisual={{ title: "Macete M3", content: "Antes de VERBO: crase é sempre proibida." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 3 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM3}
          titulo="Quiz - Módulo 3: Verbos Proíbem Crase"
          numero={3}
          variant={mv[3]}
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
          variant={mv[4]}
          descricao="Ela, Você, Mim, Ti, Si — nunca levam crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Pronomes Pessoais: Regra Categórica"
            variant={mv[4]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Pronomes pessoais NUNCA aceitam artigo definido</strong>. É impossível dizer "a ela", "a mim", "a ti", "a você" no sentido de artigo — o artigo não cabe em pronomes pessoais. Quando há preposição "a" antes de pronome pessoal, a preposição fica simples, sem artigo para se fundir. Logo, sem crase.
            </p>
            <p>
              <strong>Estrutura: Preposição A + Pronome Pessoal (sem artigo) = A (simples, nunca À)</strong>
            </p>
            <p>
              Exemplos: "Referi-me <em>a</em> ela" (A + pronome ela, sem artigo). "Dirijo-me <em>a</em> você" (A + pronome você). "Entreguei <em>a</em> mim" (A + pronome mim). "Fiz isso por <em>ti</em>" (preposição por + ti, sem crase mesmo com preposição diferente). Nesses casos, a preposição fica sozinha, sem crase.
            </p>
            <p>
              Essa regra é absoluta e sem exceção. Candidatos que escrevem "referi-me à ela" estão errados 100%. Pronome pessoal é uma barreira contra crase.
            </p>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-xl border border-red-200 dark:border-red-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuTriangleAlert className="w-5 h-5 text-red-500" /> Regra Absoluta: PRONOME PESSOAL = SEM CRASE
              </h4>
              <p className="text-foreground/85">
                Pronomes pessoais (mim, ti, ele, ela, nós, vós, eles, elas) nunca levam crase.
              </p>
              <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-red-500">
                <p className="text-foreground/80">❌ "Referi-me à ela" — ERRADO!</p>
                <p className="text-foreground/80">✅ "Referi-me a ela" — CORRETO!</p>
                <p className="text-foreground/80">❌ "Entreguei à você" — ERRADO!</p>
                <p className="text-foreground/80">✅ "Entreguei a você" — CORRETO!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Lista: Pronomes Pessoais (Proíbem Crase)" variant={mv[4]} />
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
          <ModuleSectionHeader index={3} title="Exemplos: Pronomes Pessoais vs Nomes" variant={mv[4]} />
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
          <ModuleSectionHeader index={4} title="Confusão Comum: Nome vs Pronome" variant={mv[4]} />
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
          <ModuleSectionHeader index={5} title="Prática: Pronomes Pessoais" variant={mv[4]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">⛔ PRONOMES PESSOAIS</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-red-400">Pronomes NUNCA recebem artigo</p>
                  <p>Pronomes pessoais (ela, ele, você, nós, vós) não aceitam artigo. Logo, quando a preposição "a" é seguida de pronome pessoal, não há crase. A equação não se completa (falta o artigo).</p>
                  <p>❌ "Referi-me <strong>à</strong> ela" (ERRADO)</p>
                  <p>✅ "Referi-me <strong>a</strong> ela" (CORRETO - pronome, sem artigo)</p>
                  <p className="text-muted-foreground">Pronome ≠ artigo. Sempre sem crase com pronome pessoal!</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">👤 PRONOMES vs SUBSTANTIVOS</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-amber-400">Diferença crítica em crase</p>
                  <p>PRONOME PESSOAL: "ela", "você", "mim". Rejeita artigo. SEM CRASE.</p>
                  <p>SUBSTANTIVO: "mulher", "pessoa", "menina". Aceita artigo. COM CRASE.</p>
                  <p>❌ "Referi-me <strong>a</strong> ela" (pronome)</p>
                  <p>✅ "Referi-me <strong>à</strong> mulher" (substantivo + artigo)</p>
                  <p className="text-muted-foreground">Use o teste do masculino para diferenciar!</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">✅ PRONOMES OBLÍQUOS</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-blue-400">Mim, ti, si, ele(a), nós, vós</p>
                  <p>Pronomes oblíquos também rejeitam artigo e, portanto, não recebem crase. "Para mim", "para ti", "a ele" — sempre com preposição isolada, nunca com crase.</p>
                  <p>❌ "Isso é para <strong>à</strong> mim" (ERRADO)</p>
                  <p>✅ "Isso é para <strong>a</strong> mim" ou "Isso é para <strong>mim</strong>" (CORRETO)</p>
                  <p className="text-muted-foreground">Oblíquos não recebem artigo, logo sem crase!</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Epidêmico: À Ela">
          Muitos candidatos erram "À ela" porque confundem com nomes femininos. NUNCA há crase antes de pronome pessoal. "Ela" é pronome (rejeita artigo), logo: <strong>referi-me A ela</strong>, nunca "referi-me À ela". Essa é a trampa favorita da CESGRANRIO!
        </AlertBox>

        <ModuleConsolidation
          index={4}
          variant={mv[4]}
          video={{ videoId: "CRASE_04", title: "Crase - Módulo 4: Pronomes", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 4",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 4", type: "Resumo", placeholderColor: "bg-rose-100" }],
          }}
          maceteVisual={{ title: "Macete M4", content: "Antes de PRONOME pessoal: sempre sem crase." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 4 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM4}
          titulo="Quiz - Módulo 4: Pronomes Pessoais"
          numero={4}
          variant={mv[4]}
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
          variant={mv[5]}
          descricao="Ambas as formas estão corretas"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Nomes Próprios Femininos: Artigo Opcional"
            variant={mv[5]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Antes de nomes próprios femininos, a crase é facultativa</strong>. Isso significa que <strong>ambas as formas são corretas</strong> — com crase ou sem crase. A razão é que nomes próprios não costumam ser acompanhados de artigo definido no português padrão. "Maria" é apenas "Maria", não necessariamente "a Maria" (embora o português coloquial frequentemente use "a Maria").
            </p>
            <p>
              <strong>Estrutura: A + (opcional) + Nome Próprio Feminino = A ou À (ambas corretas)</strong>
            </p>
            <p>
              Exemplos: "Refiro-me <em>a</em> Maria" (SEM crase). "Refiro-me <em>à</em> Maria" (COM crase). Ambas as frases estão corretas. A diferença está no nível de formalidade: a forma "à Maria" é um pouco mais formal/literária, enquanto "a Maria" é mais coloquial.
            </p>
            <p>
              <strong>PORÉM, há uma exceção importante:</strong> quando o nome próprio é <strong>especificado</strong> (recebe adjetivo, adjunto ou qualificação), o artigo passa a ser <strong>obrigatório</strong>, e a crase também: "Refiro-me <em>à</em> Maria do Carmo" (nome especificado, artigo obrigatório, logo crase obrigatória).
            </p>
            <p>
              Na Petrobras, documentos formais usam nomes de pessoas, empresas, estados. Um relatório pode dizer "Conforme o depoimento <em>a</em> Daniela Silva" ou "Conforme o depoimento <em>à</em> Daniela Silva" — ambas corretas. Mas se especificar, "Conforme depoimento <em>à</em> Daniela Silva, diretora de operações", aí a especificação torna crase obrigatória.
            </p>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuLightbulb className="w-5 h-5 text-amber-500" /> Regra: AMBAS AS FORMAS SÃO CORRETAS
              </h4>
              <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-foreground/80">✅ "Refiro-me <strong>a</strong> Maria" — CORRETO!</p>
                <p className="text-foreground/80">✅ "Refiro-me <strong>à</strong> Maria" — TAMBÉM CORRETO!</p>
              </div>
              <p className="text-foreground/85 text-sm">
                <strong>MAS:</strong> Se o nome for especificado, crase é <strong>obrigatória</strong>:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border-l-4 border-amber-500">
                <p className="text-foreground/80">✅ "Refiro-me <strong>à</strong> Maria do Carmo" — OBRIGATÓRIA!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Nomes Próprios Simples vs Especificados" variant={mv[5]} />
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
          <ModuleSectionHeader index={3} title="Card: Exemplos Práticos" variant={mv[5]} />
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
          <ModuleSectionHeader index={4} title="Estratégia em Prova: Como Escolher?" variant={mv[5]} />
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
          <ModuleSectionHeader index={5} title="Prática: Simples vs Especificado" variant={mv[5]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">🎓 NOMES PRÓPRIOS SIMPLES</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-blue-400">Nome feminino SEM sobrenome</p>
                  <p>Nomes próprios simples (apenas primeiro nome, sem sobrenome) FACULTAM o artigo. Por isso, a crase também é facultativa. Pode usar "a" ou "à" — ambas estão corretas em português formal.</p>
                  <p>✅ "Refiro-me <strong>a</strong> Daniela" (sem artigo, sem crase)</p>
                  <p>✅ "Refiro-me <strong>à</strong> Daniela" (com artigo, com crase)</p>
                  <p className="text-muted-foreground">Nome simples = artigo opcional = crase facultativa.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">📋 NOMES PRÓPRIOS ESPECIFICADOS</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-emerald-400">Nome + sobrenome OU título</p>
                  <p>Nomes próprios ESPECIFICADOS por sobrenome ou título (Daniela Silva, professora Maria) EXIGEM artigo. Quando o artigo é exigido, a crase é OBRIGATÓRIA no feminino.</p>
                  <p>✅ "Refiro-me <strong>à</strong> Daniela Silva" (nome especificado, com crase)</p>
                  <p>❌ "Refiro-me <strong>a</strong> Daniela Silva" (ERRADO - artigo é exigido)</p>
                  <p className="text-muted-foreground">Especificação = artigo obrigatório = crase obrigatória.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">🔑 REGRA DA ESPECIFICAÇÃO</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-purple-400">O artigo muda tudo</p>
                  <p>A diferença é simples: NOMES SIMPLES (facultativos) vs NOMES ESPECIFICADOS (obrigatórios). Se o nome pode receber artigo em contexto comum, a crase acompanha.</p>
                  <p>✅ "Entreguei a carta <strong>a</strong> Marina" ou "<strong>à</strong> Marina" (simples)</p>
                  <p>✅ "Entreguei a carta <strong>à</strong> Marina Costa" (especificado, obrigatório)</p>
                  <p className="text-muted-foreground">Use teste: "a/à João" (simples) vs "a/à Dr. João" (especificado).</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="warning" titulo="Exceção: Artigos Usados Coloquialmente">
          <p>
            No português coloquial (especialmente em regiões), "a Maria" com artigo é muito comum. Escritores como Guimarães Rosa usavam "a Maria" frequentemente. Em literatura e na Petrobras (que valoriza norma padrão), "à Maria" (com crase) é preferido. Mas gramaticalmente, ambas são aceitas quando o nome é simples.
          </p>
        </AlertBox>

        <ModuleConsolidation
          index={5}
          variant={mv[5]}
          video={{ videoId: "CRASE_05", title: "Crase - Módulo 5: Nomes Próprios", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 5", type: "Resumo", placeholderColor: "bg-violet-100" }],
          }}
          maceteVisual={{ title: "Macete M5", content: "Nome próprio feminino: a/à Maria — ambas corretas." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 5 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM5}
          titulo="Quiz - Módulo 5: Nomes Próprios"
          numero={5}
          variant={mv[5]}
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
          variant={mv[6]}
          descricao="Minha, Sua, Tua, Nossa (singular)"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Possessivos Femininos Singulares: Artigo Opcional"
            variant={mv[6]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Antes de possessivos femininos SINGULARES, a crase é facultativa</strong>. Possessivos como "minha", "sua", "tua", "nossa" (singular) carregam já uma noção de definição própria. O artigo é opcional: "a minha" ou apenas "minha" — ambas as formas existem em português. Como o artigo é opcional, a crase também é: <strong>a minha</strong> ou <strong>à minha</strong>, ambas corretas.
            </p>
            <p>
              <strong>Estrutura: A + (opcional) + Possessivo Feminino Singular = A ou À (ambas corretas)</strong>
            </p>
            <p>
              Exemplos: "Refiro-me <em>a</em> minha opinião" (SEM crase). "Refiro-me <em>à</em> minha opinião" (COM crase). "Assisti <em>a</em> sua apresentação" ou "Assisti <em>à</em> sua apresentação" — ambas corretas.
            </p>
            <p>
              <strong>MAS CUIDADO:</strong> No <strong>PLURAL</strong>, a situação muda completamente. "Minhas", "suas", "tuas", "nossas" (plural) EXIGEM artigo obrigatoriamente. Logo, crase é obrigatória também: "<em>à</em> minhas", "<em>à</em> suas" (com crase). Essa é a diferença crítica que muitos candidatos perdem.
            </p>
            <p>
              Na Petrobras, documentos dizem: "Conforme <em>a</em> minha análise" ou "Conforme <em>à</em> minha análise" — ambas certas. Mas "Conforme <em>às</em> minhas análises" é obrigatória (plural).
            </p>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuLightbulb className="w-5 h-5 text-indigo-500" /> Regra Crítica: SINGULAR vs PLURAL
              </h4>
              <div className="space-y-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
                <div>
                  <p className="font-semibold text-indigo-600">SINGULAR (Facultativo):</p>
                  <p className="text-foreground/80">✅ "Dirijo-me <strong>a</strong> minha mãe" ou "Dirijo-me <strong>à</strong> minha mãe"</p>
                </div>
                <div className="border-t pt-3">
                  <p className="font-semibold text-red-600">PLURAL (Obrigatório):</p>
                  <p className="text-foreground/80">✅ "Dirijo-me <strong>às</strong> minhas mães" (OBRIGATÓRIA!)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Singular vs Plural" variant={mv[6]} />
          <ContentAccordion
            slides={[
              {
                titulo: "SINGULAR: Ambas as Formas Corretas",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Possessivos singulares femininos = crase FACULTATIVA</p>
                    <ul className="space-y-2">
                      <li>✅ "Dirijo-me <em>a</em> minha mãe"</li>
                      <li>✅ "Dirijo-me <em>à</em> minha mãe"</li>
                      <li>✅ "Refiro-me <em>a</em> sua opinião"</li>
                      <li>✅ "Refiro-me <em>à</em> sua opinião"</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "PLURAL: Crase OBRIGATÓRIA",
                icone: <LuTriangleAlert className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Possessivos plurais femininos = crase OBRIGATÓRIA (NÃO facultativa!)</p>
                    <ul className="space-y-2">
                      <li>❌ "Dirijo-me a minhas mães" (ERRADO!)</li>
                      <li>✅ "Dirijo-me <em>às</em> minhas mães" (OBRIGATÓRIA!)</li>
                      <li>❌ "Refiro-me a suas opiniões" (ERRADO!)</li>
                      <li>✅ "Refiro-me <em>às</em> suas opiniões" (OBRIGATÓRIA!)</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Por Que a Diferença?",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Explicação Gramatical:</p>
                    <ul className="space-y-2">
                      <li><strong>Singular:</strong> "Minha" já é suficientemente definida → artigo opcional → crase facultativa</li>
                      <li><strong>Plural:</strong> "Minhas" exige artigo para clareza → artigo obrigatório → crase obrigatória</li>
                    </ul>
                    <p className="text-sm italic mt-3">
                      Essa é a regra mais sutil da crase. Muitos candidatos não diferenciam singular/plural em possessivos!
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Card: Possessivos Femininos" variant={mv[6]} />
          <CardCarousel
            cards={[
              {
                icone: "👩",
                title: "Minha mãe (singular)",
                descricao: "a/à minha mãe (ambas corretas) ✓✓",
              },
              {
                icone: "👩👩",
                title: "Minhas mães (plural)",
                descricao: "às minhas mães (obrigatória, não facultativa)",
              },
              {
                icone: "💬",
                title: "Sua opinião (singular)",
                descricao: "a/à sua opinião (ambas corretas) ✓✓",
              },
              {
                icone: "💬💬",
                title: "Suas opiniões (plural)",
                descricao: "às suas opiniões (obrigatória)",
              },
              {
                icone: "🎨",
                title: "Tua arte (singular)",
                descricao: "a/à tua arte (facultativo) ✓✓",
              },
              {
                icone: "🎨🎨",
                title: "Tuas artes (plural)",
                descricao: "às tuas artes (obrigatória!)",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Diferença Crítica: Possessivo Acompanhando vs Substituindo" variant={mv[6]} />
          <AlertBox tipo="info" titulo="Possessivo Acompanhando Substantivo vs Sozinho">
            <p><strong>ACOMPANHANDO SUBSTANTIVO (com crase facultativa):</strong></p>
            <p className="mt-2">✅ "Obedeci <em>à</em> sua ordem" (sua acompanha "ordem")</p>
            <p className="mt-4"><strong>SUBSTITUINDO SUBSTANTIVO (crase obrigatória):</strong></p>
            <p>✅ "Obedeci <em>à</em> sua" (sua SUBSTITUI "ordem", fica sozinho)</p>
            <p className="mt-4 text-sm italic text-muted-foreground">
              Ambas têm crase neste caso, mas a lógica gramatical é diferente!
            </p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Singular vs Plural" variant={mv[6]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">📌 POSSESSIVOS SINGULARES</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-amber-400">Meu/Minha, Seu/Sua (singular)</p>
                  <p>Possessivos singulares femininos (minha, sua, sua, etc.) FACULTAM o artigo. Logo, a crase é FACULTATIVA. Pode usar com ou sem crase — ambas as formas estão corretas.</p>
                  <p>✅ "Refiro-me <strong>a</strong> minha opinião" (sem artigo, sem crase)</p>
                  <p>✅ "Refiro-me <strong>à</strong> minha opinião" (com artigo, com crase)</p>
                  <p className="text-muted-foreground">Singular = artigo optional = crase opcional.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">🚨 POSSESSIVOS PLURAIS</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-red-500">Minhas, Suas (plural)</p>
                  <p>Possessivos plurais EXIGEM artigo definido. Com artigo exigido, a crase é OBRIGATÓRIA no feminino plural. Sempre "ÀS", nunca "A".</p>
                  <p>✅ "Refiro-me <strong>às</strong> minhas opiniões" (plural, com crase obrigatória)</p>
                  <p>❌ "Refiro-me <strong>a</strong> minhas opiniões" (ERRADO - artigo é obrigatório)</p>
                  <p className="text-muted-foreground">Plural = artigo obrigatório = crase obrigatória (ÀS).</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">🔄 SINGULAR vs PLURAL</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-blue-400">Diferença crítica na crase</p>
                  <p>SINGULAR: Possessivos singulares fazem artigo ficar opcional → crase facultativa (A/À).</p>
                  <p>PLURAL: Possessivos plurais exigem artigo → crase obrigatória (ÀS).</p>
                  <p>✅ "Assisti <strong>à</strong> sua apresentação" (singular, facultativo)</p>
                  <p>✅ "Assisti <strong>às</strong> suas apresentações" (plural, obrigatório)</p>
                  <p className="text-muted-foreground">Número do possessivo muda tudo em crase!</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Frequente: Confundir Singular/Plural">
          Muitos candidatos escrevem: "Dirijo-me a minhas análises" (SEM crase no plural). ERRADO! No plural, crase é <strong>obrigatória</strong>: "Dirijo-me <em>às</em> minhas análises". Essa confusão derrota até candidatos avançados. Leia com atenção ao número (singular/plural)!
        </AlertBox>

        <ModuleConsolidation
          index={6}
          variant={mv[6]}
          video={{ videoId: "CRASE_06", title: "Crase - Módulo 6: Possessivos", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 6", type: "Resumo", placeholderColor: "bg-orange-100" }],
          }}
          maceteVisual={{ title: "Macete M6", content: "Possessivo singular = facultativo; plural = obrigatório." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 6 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM6}
          titulo="Quiz - Módulo 6: Possessivos"
          numero={6}
          variant={mv[6]}
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
          variant={mv[7]}
          descricao="Crase Obrigatória com Horários e Expressões de Medida"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Horas Exatas: Fusão Automática"
            variant={mv[7]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Antes de horas exatas, a crase é obrigatória</strong>. Sempre. Não há exceção. A estrutura é: preposição A (de tempo) + artigo AS (definindo o horário plural) = ÀS. Quando se fala de hora singular (uma hora), a estrutura é A + A (hora feminina singular) = À. Você escreve: "Às 14 horas", "À uma hora", "Às 9 da manhã".
            </p>
            <p>
              A razão é que horas são expressões de tempo preciso, sempre acompanhadas de artigo definido. "A hora", "as horas" — o artigo é obrigatório aqui. Logo, quando há preposição A antes de horário, a fusão é automática: crase sempre.
            </p>
            <p>
              Exemplos: "A reunião é <em>às</em> 14h30" (preposição A + artigo plural AS = ÀS). "Chegue <em>à</em> uma hora em ponto" (preposição A + artigo singular A = À). "Saio <em>às</em> três da tarde" (preposição A + artigo plural AS = ÀS).
            </p>
            <p>
              <strong>Diferença crítica:</strong> "por volta <strong>das</strong> 9" (preposição simples "de" + artigo "as" = "das", não é crase, é preposição diferente). "Sempre <strong>às</strong> 9" (preposição "a" + artigo "as" = "às", é crase).
            </p>
            <p>
              Na Petrobras, agendamentos dizem: "Reunião com operações <em>às</em> 10 horas". "Turno noturno <em>às</em> 22h". "Pausa <em>à</em> uma e meia". Esses são contextos onde crase com hora é sistemática.
            </p>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuZap className="w-5 h-5 text-green-500" /> Regra: HORAS EXATAS = CRASE OBRIGATÓRIA
              </h4>
              <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-foreground/80">✅ "Às 14 horas" (plural: ÀS)</p>
                <p className="text-foreground/80">✅ "À uma hora" (singular: À)</p>
                <p className="text-foreground/80">✅ "Às 9:30" (plural: ÀS)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Horários Práticos" variant={mv[7]} />
          <ContentAccordion
            slides={[
              {
                titulo: "Horas Plural (ÀS)",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Quando a hora é múltipla ou vai além de 1:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>✅ "Às 2 horas" (ÀS)</li>
                      <li>✅ "Às 9 da manhã" (ÀS)</li>
                      <li>✅ "Às 14:30" (ÀS)</li>
                      <li>✅ "Às 22 horas" (ÀS)</li>
                      <li>✅ "Às três e meia" (ÀS)</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Hora Singular (À)",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Apenas quando é exatamente 1 hora:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>✅ "À uma hora" (À)</li>
                      <li>✅ "À uma da tarde" (À)</li>
                      <li>✅ "À uma e meia" (À — a meia aplica-se à uma, mantém singular)</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Casos Especiais de Tempo",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Expressões afins de hora também levam crase:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>✅ "À madrugada" (horas da madrugada)</li>
                      <li>✅ "À alvorada" (ao amanhecer)</li>
                      <li>✅ "À noite" (período noturno)</li>
                      <li>✅ "À tarde" (período da tarde)</li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Medidas: Expressões com Crase" variant={mv[7]} />
          <CardCarousel
            cards={[
              {
                icone: "🕐",
                title: "Às 9 horas",
                descricao: "Hora exata (crase obrigatória com horas)",
              },
              {
                icone: "📏",
                title: "À vista",
                descricao: "Expressão de medida (crase fixa)",
              },
              {
                icone: "📐",
                title: "À proporção de",
                descricao: "Taxa/medida de proporção (crase)",
              },
              {
                icone: "📊",
                title: "À razão de",
                descricao: "Medida de taxa (crase obrigatória)",
              },
              {
                icone: "📋",
                title: "À distância de",
                descricao: "Expressão de medida (crase)",
              },
              {
                icone: "⚙️",
                title: "À velocidade de",
                descricao: "Medida de velocidade (crase)",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Diferença: Hora Exata vs Aproximada" variant={mv[7]} />
          <AlertBox tipo="warning" titulo="NÃO Confunda Exato com Aproximado">
            <p><strong>Hora EXATA:</strong> "A reunião é <em>às</em> 14 horas" (preposição A + artigo AS = crase ÀS)</p>
            <p className="mt-3">
              <strong>Hora APROXIMADA:</strong> "Chegou <em>por volta das</em> 14 horas" (preposição "de" + artigo as = "das", não é crase)
            </p>
            <p className="mt-3">
              <strong>Diferença:</strong> "Às" é crase (A+AS). "Das" é preposição "de" + artigo "as" (não é crase).
            </p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Horas e Medidas" variant={mv[7]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">⏰ HORAS EXATAS</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-emerald-400">Horários numerados (2h, 10h, 14h)</p>
                  <p>Horas exatas sempre recebem artigo feminino definido (AS). Logo, "a" + "as" = crase obrigatória (ÀS). Padrão: "Às [número] horas".</p>
                  <p>✅ "A reunião é <strong>às</strong> 14h" (horas exatas = crase)</p>
                  <p>✅ "Chegue <strong>às</strong> 2 da tarde" (horas exatas = crase)</p>
                  <p className="text-muted-foreground">Regra de ouro: Horas exatas SEMPRE com crase (ÀS).</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">🕐 HORAS SINGULARES</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-blue-400">Expressões com "uma" ou "meia"</p>
                  <p>Quando a hora é singular (uma hora, meia hora), usa-se artigo singular "a". Logo, "a" + "a" = crase (À), não ÀS.</p>
                  <p>✅ "Chegue <strong>à</strong> uma hora" (singular = À)</p>
                  <p>✅ "Reunião <strong>à</strong> meia hora" (meia = singular = À)</p>
                  <p className="text-muted-foreground">Singular = À. Plural/Exata = ÀS.</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">📏 MEDIDAS E EXPRESSÕES</div>}
              verso={
                <div className="space-y-3 text-lg">
                  <p className="font-semibold text-purple-400">À vista, à longa distância, etc.</p>
                  <p>Expressões de medida que contêm artigo feminino também recebem crase: "à vista" (à prazo), "à distância" (de perto), "à noite" (de dia).</p>
                  <p>✅ "Viagem <strong>à</strong> vista" (expressão, com crase)</p>
                  <p>✅ "Pagamento <strong>à</strong> longa prazo" (expressão, com crase)</p>
                  <p className="text-muted-foreground">Toda expressão de medida feminina recebe crase!</p>
                </div>
              }
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Macete: Horas SEMPRE Têm Crase">
          Quando vê hora exata numa questão, pense: <strong>"Crase é amiga de horas!"</strong> Sempre que a frase menciona horário específico, há crase. Às 8, às 14:30, à uma — todas com crase. Não há exceção para horas exatas.
        </AlertBox>

        <ModuleConsolidation
          index={7}
          variant={mv[7]}
          video={{ videoId: "CRASE_07", title: "Crase - Módulo 7: Horas", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 7", type: "Resumo", placeholderColor: "bg-cyan-100" }],
          }}
          maceteVisual={{ title: "Macete M7", content: "Hora exata? Crase obrigatória. Às 14h, à 1h." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 7 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM7}
          titulo="Quiz - Módulo 7: Horas e Medidas"
          numero={7}
          variant={mv[7]}
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
          variant={mv[8]}
          descricao="Regra da Especificação"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Casa e Terra: Genérico vs Especificado"
            variant={mv[8]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>As palavras "casa" e "terra" têm uma regra especial de crase: genéricas não levam crase, especificadas levam</strong>. Quando "casa" significa "para minha residência" (genérica, indefinida), não há artigo: "Vou <em>a</em> casa" (A + casa genérica, sem artigo = A). Mas quando "casa" é especificada (recebe adjetivo, adjunto), aí há artigo e crase: "Vou <em>à</em> casa da Maria" (A + a casa da Maria = À).
            </p>
            <p>
              A mesma lógica aplica-se a "terra". "Voltamos <em>a</em> terra" (terra como oposto de mar, genérica = SEM crase). "Voltamos <em>à</em> terra natal" (terra com especificador "natal" = COM crase). A diferença reside em ter ou não um modificador (adjunto, aposição, adjetivo) que especifique a palavra.
            </p>
            <p>
              <strong>Estrutura geral:</strong> <em>Palavra genérica</em> (sem artigo) = A (sem crase). <em>Palavra especificada</em> (com artigo obrigatório) = À (com crase).
            </p>
            <p>
              Essa regra é tão importante que a CESGRANRIO cobra frequentemente. "Vou a casa" (genérica) vs "Vou à casa da vizinha" (especificada). Candidatos que não dominam essa sutileza perdem 2-3 pontos facilmente.
            </p>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuTarget className="w-5 h-5 text-cyan-500" /> Regra de Ouro: ESPECIFICAÇÃO Define Crase
              </h4>
              <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-foreground/80">
                  <strong>Genérica:</strong> "Vou <em>a</em> casa" (SEM artigo, SEM crase)
                </p>
                <p className="text-foreground/80">
                  <strong>Especificada:</strong> "Vou <em>à</em> casa da Maria" (COM artigo, COM crase)
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Casa Genérica vs Especificada" variant={mv[8]} />
          <ContentAccordion
            slides={[
              {
                titulo: "Casa Genérica (SEM Crase)",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Quando "casa" significa residência própria (sem especificação):</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>✅ "Vou <em>a</em> casa" (minha própria casa, genérica)</li>
                      <li>✅ "Chego <em>a</em> casa cansado" (voltei para minha casa)</li>
                      <li>✅ "Saio de casa cedo" (de minha casa, genérica)</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Casa Especificada (COM Crase)",
                icone: <LuTriangleAlert className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Quando "casa" é especificada (possui adjetivo, adjunto, aposição):</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>✅ "Vou <em>à</em> casa da Maria"</li>
                      <li>✅ "Vou <em>à</em> casa azul da esquina"</li>
                      <li>✅ "Dirijo-me <em>à</em> casa do prefeito"</li>
                      <li>✅ "Chego <em>à</em> casa da amiga"</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Terra Genérica vs Especificada",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Mesma regra aplica-se a "terra":</p>
                    <ul className="space-y-2">
                      <li>✅ "Desembarcaram <em>a</em> terra" (oposto de bordo, genérica)</li>
                      <li>✅ "Desembarcaram <em>à</em> terra firme" (especificada por "firme")</li>
                      <li>✅ "Voltamos <em>a</em> terra" (genérica, sem especificação)</li>
                      <li>✅ "Voltamos <em>à</em> terra natal" (especificada por "natal")</li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Card: Comparação Lado a Lado" variant={mv[8]} />
          <CardCarousel
            cards={[
              {
                icone: "🏠",
                title: "Casa (genérica)",
                descricao: "Vou a casa (SEM crase)",
              },
              {
                icone: "🏠👩",
                title: "Casa da Maria",
                descricao: "Vou à casa da Maria (COM crase)",
              },
              {
                icone: "🌍",
                title: "Terra (genérica)",
                descricao: "Desembarcaram a terra (SEM crase)",
              },
              {
                icone: "🌍✨",
                title: "Terra Natal",
                descricao: "Voltamos à terra natal (COM crase)",
              },
              {
                icone: "📍",
                title: "Distância (sem prep)",
                descricao: "A distância de 5km (artigo simples)",
              },
              {
                icone: "📍➡️",
                title: "À Distância de",
                descricao: 'À distância de 5km (crase com "a")',
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Distância: Expressão de Medida" variant={mv[8]} />
          <AlertBox tipo="info" titulo="À Distância de...">
            <p><strong>Crase obrigatória</strong> com expressões de distância que usam preposição A:</p>
            <p className="mt-2">✅ "À distância de 10 quilômetros"</p>
            <p>✅ "À distância de um metro"</p>
            <p>✅ "À distância de meia légua"</p>
            <br />
            <p><strong>SEM preposição A, não há crase:</strong></p>
            <p className="mt-2">✅ "A distância entre cidades é grande" (artigo simples, não crase)</p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Casa, Terra, Distância" variant={mv[8]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              pergunta="Complete: Vou ___ casa"
              resposta="✅ a casa (genérica, sem especificação)"
              opcoes={["a", "à"]}
            />
            <FlipCard
              pergunta="Complete: Vou ___ casa da vovó"
              resposta="✅ à casa da vovó (especificada, tem artigo)"
              opcoes={["a", "à"]}
            />
            <FlipCard
              pergunta="Complete: Voltamos ___ terra natal"
              resposta="✅ à terra natal (especificada por 'natal')"
              opcoes={["a", "à"]}
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Crítico: Não Identificar Especificação">
          Muitos candidatos escrevem: "Fui <em>a</em> casa da Maria" (ERRADO! Casa está especificada). Correto: "Fui <em>à</em> casa da Maria". A presença de "da Maria" (adjunto possessivo) torna "casa" especificada e exige crase. Leia com atenção para identificar especificadores!
        </AlertBox>

        <ModuleConsolidation
          index={8}
          variant={mv[8]}
          video={{ videoId: "CRASE_08", title: "Crase - Módulo 8: Casa Terra", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 8", type: "Resumo", placeholderColor: "bg-teal-100" }],
          }}
          maceteVisual={{ title: "Macete M8", content: "Casa/Terra genérica = sem crase; especificada = com crase." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 8 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM8}
          titulo="Quiz - Módulo 8: Casa, Terra, Distância"
          numero={8}
          variant={mv[8]}
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
          variant={mv[9]}
          descricao="Fusão Especial da Preposição com Demonstrativos"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Demonstrativos com Crase: Fusão Especial"
            variant={mv[9]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Pronomes demonstrativos AQUELE, AQUELA, AQUILO aceitam fusão com a preposição A, gerando as formas ÀQUELE, ÀQUELA, ÀQUILO</strong>. Essa fusão é diferente daquela com artigo — aqui a preposição se funde diretamente com o demonstrativo. O acento grave marca essa fusão, indicando que houve contração.
            </p>
            <p>
              <strong>Estrutura: Preposição A + Demonstrativo AQUELE = ÀQUELE (fusão especial)</strong>
            </p>
            <p>
              Exemplos: "Refiro-me <em>àquele</em> documento" (A + aquele = àquele). "Aludo <em>àquela</em> decisão" (A + aquela = àquela). "Pensei <em>àquilo</em> que você disse" (A + aquilo = àquilo). Em todos esses casos, a preposição A funde-se com o demonstrativo, criando as formas com acento grave.
            </p>
            <p>
              <strong>Importante:</strong> O teste do masculino funciona aqui também. Se em forma masculina resultar em "ÀQUELE" (com crase), então no feminino há "ÀQUELA" (com crase), e no neutro há "ÀQUILO" (com crase). Essa consistência ajuda a memorizar.
            </p>
            <p>
              Na Petrobras, comunicações formais dizem: "Conforme <em>àquele</em> procedimento", "Referente <em>àquilo</em> discutido em reunião". A fusão com demonstrativos é frequente em textos técnicos porque esses pronomes ajudam a precisar referências anteriores.
            </p>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <LuZap className="w-5 h-5 text-purple-500" /> Demonstrativos: Sempre Levam Crase
              </h4>
              <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-foreground/80">✅ "Refiro-me <strong>àquele</strong> rapaz"</p>
                <p className="text-foreground/80">✅ "Aludo <strong>àquela</strong> moça"</p>
                <p className="text-foreground/80">✅ "Pensei <strong>àquilo</strong> (neutro)"</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Formas Completas: Demonstrativos com Crase" variant={mv[9]} />
          <ContentAccordion
            slides={[
              {
                titulo: "Demonstrativo AQUELE (Masculino)",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">ÀQUELE — sempre com crase quando há preposição A:</p>
                    <ul className="space-y-2">
                      <li>✅ "Refiro-me <em>àquele</em> documento"</li>
                      <li>✅ "Aludi <em>àquele</em> evento"</li>
                      <li>✅ "Dirijo-me <em>àquele</em> senhor"</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Demonstrativo AQUELA (Feminino)",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">ÀQUELA — sempre com crase quando há preposição A:</p>
                    <ul className="space-y-2">
                      <li>✅ "Refiro-me <em>àquela</em> proposta"</li>
                      <li>✅ "Aludi <em>àquela</em> reunião"</li>
                      <li>✅ "Dirijo-me <em>àquela</em> moça"</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Demonstrativo AQUILO (Neutro)",
                icone: <LuTarget className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">ÀQUILO — sempre com crase quando há preposição A:</p>
                    <ul className="space-y-2">
                      <li>✅ "Refiro-me <em>àquilo</em> que foi dito"</li>
                      <li>✅ "Não gosto <em>daquilo</em> que você fez" (note: "daquilo" = DE+AQUILO, não A)</li>
                      <li>✅ "Pensei <em>àquilo</em> por horas"</li>
                    </ul>
                    <p className="text-sm italic mt-2">
                      CUIDADO: "Daquilo" = DE (preposição) + AQUILO, não é crase!
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Diferença: Este vs Aquele",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-3 text-foreground/85">
                    <p className="font-semibold">Demonstrativos próximos vs remotos:</p>
                    <ul className="space-y-2">
                      <li>✅ "Refiro-me <em>a este</em>" (demonstrativo próximo = SEM crase)</li>
                      <li>✅ "Refiro-me <em>àquele</em>" (demonstrativo remoto = COM crase)</li>
                      <li className="text-sm italic">Note: "Este" não recebe crase mesmo com preposição A!</li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Card: Demonstrativos e Seus Pares" variant={mv[9]} />
          <CardCarousel
            cards={[
              {
                icone: "👨",
                title: "Àquele (masc)",
                descricao: "Àquele rapaz (A+aquele, sempre crase)",
              },
              {
                icone: "👩",
                title: "Àquela (fem)",
                descricao: "Àquela moça (A+aquela, sempre crase)",
              },
              {
                icone: "⭕",
                title: "Àquilo (neutro)",
                descricao: "Àquilo que disseste (A+aquilo, sempre crase)",
              },
              {
                icone: "👨",
                title: "A este (próximo)",
                descricao: "A este rapaz (SEM crase, demonstrativo próximo)",
              },
              {
                icone: "🌍",
                title: "Teste: Referir-se",
                descricao: "Refiro-me àquele (crase com aquele)",
              },
              {
                icone: "⚙️",
                title: "Petrobras",
                descricao: "Conforme àquele procedimento (documentação)",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} title="Cuidado: Demonstrativo Próximo (Este) NÃO Leva Crase" variant={mv[9]} />
          <AlertBox tipo="warning" titulo="Diferença Crítica: ESTE vs AQUELE">
            <p><strong>AQUELE (remoto) → ÀQUELE (com crase)</strong></p>
            <p>✅ "Refiro-me <em>àquele</em> documento" (remoto, crase obrigatória)</p>
            <br />
            <p><strong>ESTE (próximo) → A ESTE (sem crase)</strong></p>
            <p>✅ "Refiro-me <em>a este</em> documento" (próximo, SEM crase)</p>
            <br />
            <p className="font-semibold mt-4">
              A diferença está no tipo de demonstrativo! "Aquele" recebe crase (fusão especial), "este" não.
            </p>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={5} title="Prática: Demonstrativos com Crase" variant={mv[9]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              pergunta="Complete: Refiro-me ___ aquele documento"
              resposta="✅ àquele (demonstrativo remoto + preposição A = crase)"
              opcoes={["a aquele", "àquele"]}
            />
            <FlipCard
              pergunta="Complete: Aludi ___ aquilo que disseste"
              resposta="✅ àquilo (demonstrativo neutro remoto = crase)"
              opcoes={["a aquilo", "àquilo"]}
            />
            <FlipCard
              pergunta="Complete: Refiro-me ___ este documento"
              resposta="✅ a este (demonstrativo próximo = SEM crase)"
              opcoes={["a", "à"]}
            />
          </div>
        </section>

        <AlertBox tipo="danger" titulo="Erro Frequente: Confundir Este/Aquele">
          Candidatos frequentemente erram "Refiro-me <em>à</em> este" (ERRADO!) quando o correto é "Refiro-me <em>a</em> este". Lembre: AQUELE → ÀQUELE (com crase). ESTE → A ESTE (sem crase). A diferença está na natureza do demonstrativo!
        </AlertBox>

        <ModuleConsolidation
          index={9}
          variant={mv[9]}
          video={{ videoId: "CRASE_09", title: "Crase - Módulo 9: Demonstrativos", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 9", type: "Resumo", placeholderColor: "bg-indigo-100" }],
          }}
          maceteVisual={{ title: "Macete M9", content: "Àquele/Àquela/Àquilo: crase sempre (a + aquele)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 9 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM9}
          titulo="Quiz - Módulo 9: Demonstrativos"
          numero={9}
          variant={mv[9]}
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
          variant={mv[10]}
          descricao="Teste seus conhecimentos em todas as regras de crase"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Domínio Completo: Checklist de Regras"
            variant={mv[10]}
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Regra 1: Equação Fundamental",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    A (preposição) + A (artigo/demonstrativo) = À. Se falta um elemento, não há crase. Sempre verifique ambos!
                  </p>
                ),
              },
              {
                titulo: "Regra 2: Teste do Masculino",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    Substitua por masculino. Se vira "AO", há crase (À). Se continua "A", sem crase. Funciona em 95% dos casos.
                  </p>
                ),
              },
              {
                titulo: "Regra 3: Verbos Proíbem",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    Verbo nunca aceita artigo. A + Verbo = A (sem crase). Começou a estudar, não "à estudar".
                  </p>
                ),
              },
              {
                titulo: "Regra 4: Pronomes Pessoais Proíbem",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    Pronome pessoal nunca aceita artigo. Referi-me a ela, não "à ela". Absolutamente proibido!
                  </p>
                ),
              },
              {
                titulo: "Regra 5: Nomes Próprios = Facultativo",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    A Maria ou À Maria (ambas corretas). MAS se especificado (Maria da Silva), crase é obrigatória.
                  </p>
                ),
              },
              {
                titulo: "Regra 6: Possessivos Singulares = Facultativo",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    A minha ou À minha (ambas corretas). MAS plural é obrigatório: Às minhas (não "a minhas").
                  </p>
                ),
              },
              {
                titulo: "Regra 7: Horas Exatas = Obrigatório",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    Às 14 horas, à uma hora. Horas sempre levam crase. Por volta das (não é crase, é preposição "de").
                  </p>
                ),
              },
              {
                titulo: "Regra 8: Casa/Terra = Especificação Define",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    Vou a casa (genérica). Vou à casa da Maria (especificada). Mesma regra para terra.
                  </p>
                ),
              },
              {
                titulo: "Regra 9: Demonstrativos Aquele = Obrigatório",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    Àquele, àquela, àquilo (sempre crase). Diferente de "este" (a este, sem crase).
                  </p>
                ),
              },
              {
                titulo: "Regra 10: Estratégia em Prova",
                icone: <LuCheck className="w-5 h-5" />,
                conteudo: (
                  <p className="text-foreground/85">
                    1) Aplique teste do masculino. 2) Se falhar, verifique categoria (verbo? pronome? hora?). 3) Escolha fundamentado em regra clara.
                  </p>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Questões Simuladas: Padrão CESGRANRIO" variant={mv[10]} />
          <CardCarousel
            cards={[
              {
                icone: "📝",
                title: "Q1: Básica",
                descricao: "Vou ___ praia. (A) a (B) à [Resposta: à]",
              },
              {
                icone: "📝",
                title: "Q2: Teste do Masculino",
                descricao: "Refiro-me ___ estratégia. (A) a (B) à [Resposta: à]",
              },
              {
                icone: "📝",
                title: "Q3: Verbo",
                descricao: "Começou ___ chover. (A) a (B) à [Resposta: a]",
              },
              {
                icone: "📝",
                title: "Q4: Pronome",
                descricao: "Referi-me ___ ela. (A) a (B) à [Resposta: a]",
              },
              {
                icone: "📝",
                title: "Q5: Hora",
                descricao: "Reunião ___ 14h. (A) as (B) às [Resposta: às]",
              },
              {
                icone: "📝",
                title: "Q6: Casa Especificada",
                descricao: "Fui ___ casa da vovó. (A) a (B) à [Resposta: à]",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Macetes Finais: Dicas de Ouro" variant={mv[10]} />
          <AlertBox tipo="info" titulo="Dicas Cruciais para Acertar Crase">
            <div className="space-y-3">
              <p>
                <strong>1. Equação é Lei:</strong> A + A = À. Se falta, não há crase. Ponto.
              </p>
              <p>
                <strong>2. Teste do Masculino é Ouro:</strong> 95% das questões resolvem com esse teste.
              </p>
              <p>
                <strong>3. Verbos e Pronomes Pessoais = Nunca Crase:</strong> Memorizados? Acertados!
              </p>
              <p>
                <strong>4. Horas e Demonstrativos Aquele = Sempre Crase:</strong> Fácil de lembrar.
              </p>
              <p>
                <strong>5. Especificação Muda Tudo:</strong> Casa genérica (a) vs casa especificada (à).
              </p>
              <p>
                <strong>6. Singular vs Plural Possessivos:</strong> Minha (facultativo) vs minhas (obrigatório).
              </p>
              <p>
                <strong>7. Leia com Atenção:</strong> CESGRANRIO coloca pegadinhas. Casa vs casa da Maria. Hora exata vs aproximada.
              </p>
            </div>
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index={4} title="Prática Final: 3 Frases Tipo Concurso" variant={mv[10]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              pergunta="Conforme referência ___ NBR 13434, procedeu-se ___ implementação"
              resposta="✅ à / à (NBR = norma fem., implementação = subst. fem.)"
              opcoes={["a/a", "à/a", "à/à"]}
            />
            <FlipCard
              pergunta="Dirigi-me ___ gerência e entrega ___ diretora"
              resposta="✅ à / à (gerência e diretora = feminino com artigo)"
              opcoes={["a/a", "à/à"]}
            />
            <FlipCard
              pergunta="Procedeu-se ___ análise ___ partir de dados"
              resposta="✅ à / a (análise = subst. fem. com artigo; partir = verbo)"
              opcoes={["a/a", "à/a", "à/à"]}
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={5} title="Estratégia Final: Dia da Prova" variant={mv[10]} />
          <AlertBox tipo="warning" titulo="Na Hora da Prova: Passo a Passo">
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Leia a frase inteira</strong> — contexto importa.
              </li>
              <li>
                <strong>Identifique categoria:</strong> É hora? Verbo? Pronome? Nomes próprio? Casa? Cada tem regra.
              </li>
              <li>
                <strong>Aplique teste do masculino</strong> (quando aplicável) — se vira AO, há crase.
              </li>
              <li>
                <strong>Se duvidoso, use checklist:</strong> Verbo proíbe? Pronome proíbe? Hora exige? Especificação muda?
              </li>
              <li>
                <strong>Confie na lógica, não em adivinhação</strong> — toda regra tem fundamentação clara.
              </li>
              <li>
                <strong>Em caso de impasse</strong> — marque o que parecer MAIS formal/escrito (CESGRANRIO prefere formas com crase).
              </li>
            </ol>
          </AlertBox>
        </section>

        <AlertBox tipo="success" titulo="Você Domina Crase Agora!">
          <p>
            Parabéns! Você completou os 9 módulos de aprendizado e agora domina as 9 regras de crase de forma sistemática. Na prova, confie na equação A+A=À, use o teste do masculino, identifique categorias (verbo, pronome, hora, casa, etc.) e aplique as regras específicas. Com essa estrutura lógica, você acertará 95% das questões de crase. Vá em frente!
          </p>
        </AlertBox>

        <ModuleConsolidation
          index={10}
          variant={mv[10]}
          video={{ videoId: "CRASE_10", title: "Crase - Módulo 10: Simulado", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Módulo 10",
            tituloAula: "Crase",
            materia: "Português",
            images: [{ title: "Módulo 10", type: "Resumo", placeholderColor: "bg-slate-100" }],
          }}
          maceteVisual={{ title: "Macete M10", content: "Domine a equação e o teste do masculino: 95% resolvidas." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 10 - Crase", artista: "Petrobras Quest" }}
        />

        <QuizInterativo
          questoes={quizM10}
          titulo="Quiz Final - Módulo 10: Simulado Integrado"
          numero={10}
          variant={mv[10]}
          onComplete={(s) => handleModuleComplete("modulo-10", s)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
