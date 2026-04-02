"use client";

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
} from "../shared";
import {
  LuCheck,
  LuZap,
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
 * Padrão: Ultimate Premium V5.0 com conteúdo completo
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
    { id: "modulo-2", label: "Módulo 2", title: "Identificação: Teste do Masculino" },
    { id: "modulo-3", label: "Módulo 3", title: "Casos Proibidos I: Verbos" },
    { id: "modulo-4", label: "Módulo 4", title: "Casos Proibidos II: Pronomes" },
    { id: "modulo-5", label: "Módulo 5", title: "Crase Facultativa com Nomes Próprios" },
    { id: "modulo-6", label: "Módulo 6", title: "Crase Facultativa com Possessivos" },
    { id: "modulo-7", label: "Módulo 7", title: "Casos Especiais I: Horas e Medidas" },
    { id: "modulo-8", label: "Módulo 8", title: "Casos Especiais II: Casa, Terra, Distância" },
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={1} title="Os Três Pilares da Crase" variant={mv[1]} />
          <ContentAccordion
            slides={[
              {
                titulo: "O que é crase?",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Crase é a fusão gráfica de duas vogais idênticas (preposição A + artigo A = À). Não é erro, é fenômeno natural da língua portuguesa.
                    </p>
                    <div className="p-4 bg-blue-500/5 rounded-xl border-l-4 border-blue-500 italic">
                      "Vou <strong>à</strong> praia" = vou <strong>A</strong> + <strong>A</strong> praia
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Quando ocorre crase?",
                icone: <LuTarget />,
                conteudo: (
                  <div className="space-y-4">
                    <p className="font-bold text-lg">Dois requisitos simultâneos:</p>
                    <ul className="space-y-2">
                      {[
                        "1. O VERBO ou NOME exige preposição A (regência verbal/nominal)",
                        "2. O SUBSTANTIVO aceita artigo A (palavra feminina)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-lg">
                          <LuCheck className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Estratégia: O Teste do Masculino",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Substitua a palavra feminina por seu equivalente masculino:</p>
                    <div className="grid gap-2 text-lg">
                      {[
                        { ex: "Vou à praia", masc: "Vou ao mar" },
                        { ex: "Refiro-me à Maria", masc: "Refiro-me ao João" },
                        { ex: "Assisti à aula", masc: "Assisti ao filme" },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                          <span className="text-indigo-400 font-mono">"{item.ex}"</span>
                          <br />
                          <span className="text-muted-foreground">→ "{item.masc}" (AO = À existe!)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
            ]}
            corIndicador="bg-blue-500"
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplo Prático: Construindo a Equação" variant={mv[1]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlipCard
              frente={<div className="font-bold text-lg">VERBO</div>}
              verso={
                <div className="space-y-2 text-lg">
                  <p className="text-amber-400 font-semibold">IR (a)</p>
                  <p>O verbo "ir" exige preposição A</p>
                  <p>✅ "Vou <em>a</em> ..."</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">+ ARTIGO</div>}
              verso={
                <div className="space-y-2 text-lg">
                  <p className="text-cyan-400 font-semibold">A (feminino)</p>
                  <p>A palavra é feminina</p>
                  <p>✅ "... <em>a</em> praia"</p>
                </div>
              }
            />
            <FlipCard
              frente={<div className="font-bold text-lg">= CRASE</div>}
              verso={
                <div className="space-y-2 text-lg">
                  <p className="text-emerald-400 font-semibold">À</p>
                  <p>Fusão das duas vogais</p>
                  <p>✅ "Vou <em>à</em> praia"</p>
                </div>
              }
            />
          </div>
        </section>

        <QuizInterativo questoes={quizM1} titulo="Quiz - Conceito" numero={1} variant={mv[1]} onComplete={(s) => handleModuleComplete("modulo-1", s)} />
      </TabsContent>

      {/* ─── MÓDULO 2: TESTE DO MASCULINO ─── */}
      <TabsContent value="modulo-2" className="mt-0 space-y-12">
        <ModuleBanner numero={2} titulo="Teste do Masculino" variant={mv[2]} descricao="A técnica do 'AO'." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="O Teste Infalível: Masculino = AO, Feminino = À"
            variant={mv[2]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              O teste do masculino é a técnica mais poderosa para dominar crase. A lógica é simples: <strong>se ao substituir a palavra feminina por uma palavra masculina resultante em "AO", então há crase na forma feminina</strong>. Essa regra funciona porque o padrão "AO" no masculino revela que a preposição A está presente e pode se fundir com o artigo definido feminino.
            </p>
            <p>
              Aplicar esse teste é automático: veja uma frase com palavra feminina, substitua mentalmente por um equivalente masculino, e verifique se dá "AO". Se der, escreva crase. Se não der (resultado diferente), não há crase. Candidatos que dominam essa técnica não precisam decorar listas infinitas de regras — eles aplicam lógica sistemática.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Prática: Aplicando o Teste" variant={mv[2]} />
          <CardCarousel
            cards={[
              {
                icone: "✅",
                title: "Vou à praia",
                descricao: "Vou AO mar (AO existe) → Há CRASE",
              },
              {
                icone: "✅",
                title: "Refiro-me à Maria",
                descricao: "Refiro-me AO João (AO existe) → Há CRASE",
              },
              {
                icone: "✅",
                title: "Assisti à aula",
                descricao: "Assisti AO filme (AO existe) → Há CRASE",
              },
              {
                icone: "❌",
                title: "Vou a pé",
                descricao: "Vou AO pé? NÃO (não diz assim) → SEM CRASE",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Comparação: COM vs SEM Crase" variant={mv[2]} />
          <AlertBox tipo="info" titulo="A Diferença Prática">
            ✅ "Vou <strong>à</strong> praia" (AO → há crase)
            <br />
            ❌ "Cheguei <strong>a</strong> tempo" (não diz "AO tempo" → sem crase)
            <br />
            ✅ "Dirijo-me <strong>à</strong> porta" (AO → há crase)
            <br />
            ❌ "Dirijo a palavra" (não diz "AO palavra" → sem crase)
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM2} titulo="Quiz - Teste do Masculino" numero={2} variant={mv[2]} onComplete={(s) => handleModuleComplete("modulo-2", s)} />
      </TabsContent>

      {/* ─── MÓDULO 3: PROIBIDO VERBOS ─── */}
      <TabsContent value="modulo-3" className="mt-0 space-y-12">
        <ModuleBanner numero={3} titulo="Proibição: Verbos" variant={mv[3]} descricao="Nunca crase antes de verbo" />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Antes de Verbo, CRASE É PROIBIDA (sempre!)"
            variant={mv[3]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Esta é uma das regras mais absolutas de crase: <strong>NUNCA coloque crase antes de um verbo</strong>. A razão é simples: verbos não aceitam artigo definido feminino. Um verbo é uma ação (estudar, falar, ir, fazer) — uma classe de palavras que não pode ser precedida por artigo feminino. Portanto, não há possibilidade de fusão A + A antes de verbo.
            </p>
            <p>
              A estrutura que causa erro é quando tentamos escrever "começar à estudar" ou "vou à falar". Essas construções estão <strong>absolutamente erradas</strong>. O correto é "começar <em>a</em> estudar" e "vou <em>a</em> falar" — sem crase, com preposição simples.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Verbos Proibem Crase" variant={mv[3]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { errado: "à estudar", correto: "a estudar" },
              { errado: "à fazer", correto: "a fazer" },
              { errado: "à começar", correto: "a começar" },
              { errado: "à ir", correto: "a ir" },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-red-500/20 bg-red-500/5 rounded-lg">
                <p className="text-red-500 line-through text-lg font-mono">❌ {item.errado}</p>
                <p className="text-emerald-500 text-lg font-mono mt-2">✅ {item.correto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Armadilha Comum" variant={mv[3]} />
          <AlertBox tipo="danger" titulo="O Erro Mais Frequente em Concursos">
            Candidatos confundem crase com a preposição A simples quando há um verbo no infinitivo após.
            <br />
            <br />
            ❌ "Disposto <em>à</em> ajudar" — ERRADO (ajudar é verbo)
            <br />
            ✅ "Disposto <em>a</em> ajudar" — CORRETO (sem crase)
            <br />
            <br />
            ❌ "Apto <em>à</em> dirigir" — ERRADO
            <br />
            ✅ "Apto <em>a</em> dirigir" — CORRETO
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM3} titulo="Quiz - Proibição Verbos" numero={3} variant={mv[3]} onComplete={(s) => handleModuleComplete("modulo-3", s)} />
      </TabsContent>

      {/* ─── MÓDULO 4: PROIBIDO PRONOMES ─── */}
      <TabsContent value="modulo-4" className="mt-0 space-y-12">
        <ModuleBanner numero={4} titulo="Proibição: Pronomes" variant={mv[4]} descricao="Ela, Você, Mim, etc." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Pronomes Pessoais e Indefinidos: Nunca Aceitam Crase"
            variant={mv[4]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              <strong>Pronomes pessoais e indefinidos não aceitam artigo definido</strong>. Por isso, é impossível ter crase antes deles. Os pronomes mais comuns que geram erro são: ela, você, ele, mim, ti, si, alguém, ninguém, tudo, algo.
            </p>
            <p>
              A estrutura correta é sempre preposição simples A, sem crase: "para mim" (nunca "para à mim"), "a você" (nunca "à você"), "para ele" (nunca "para à ele").
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Pronomes Proibem Crase" variant={mv[4]} />
          <CardCarousel
            cards={[
              { icone: "👤", title: "Pronomes Pessoais", descricao: "ela, você, mim, ti, ele, nós, vós" },
              { icone: "❓", title: "Pronomes Indefinidos", descricao: "alguém, ninguém, tudo, algo, nada" },
              { icone: "✋", title: "Pronomes Demonstrativos", descricao: "este, esse, aquele (quando sem o 'a' da preposição fusionado)" },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Erros Típicos em Provas" variant={mv[4]} />
          <AlertBox tipo="danger" titulo="Não Confunda">
            ❌ "Dirijo-me <em>à</em> você" — ERRADO (você é pronome)
            <br />
            ✅ "Dirijo-me <em>a</em> você" — CORRETO
            <br />
            <br />
            ❌ "Refiro-me <em>à</em> ela" — ERRADO (ela é pronome)
            <br />
            ✅ "Refiro-me <em>a</em> ela" — CORRETO
            <br />
            <br />
            ❌ "Contei tudo <em>à</em> mim" — ERRADO (mim é pronome)
            <br />
            ✅ "Contei tudo <em>a</em> mim" — CORRETO
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM4} titulo="Quiz - Proibição Pronomes" numero={4} variant={mv[4]} onComplete={(s) => handleModuleComplete("modulo-4", s)} />
      </TabsContent>

      {/* ─── MÓDULO 5: FACULTATIVO NOMES ─── */}
      <TabsContent value="modulo-5" className="mt-0 space-y-12">
        <ModuleBanner numero={5} titulo="Facultativo: Nomes Próprios" variant={mv[5]} descricao="Antes de nomes de pessoa" />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Nomes de Pessoas: Crase É OPCIONAL"
            variant={mv[5]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Quando a palavra feminina é um nome próprio de pessoa, a crase é <strong>facultativa</strong> — você pode usar crase ou não, ambas as formas estão corretas. Isso ocorre porque nomes próprios admitem o artigo definido, mas sua presença é opcional.
            </p>
            <p>
              Portanto: "Refiro-me <em>a</em> Maria" E "Refiro-me <em>à</em> Maria" estão ambas corretas. A banca geralmente aceita as duas alternativas, mas é bom reconhecer que essa é uma zona de liberdade gramatical.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Ambas Formas Corretas" variant={mv[5]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { forma1: "Refiro-me a Maria", forma2: "Refiro-me à Maria" },
              { forma1: "Dirigi-me a Ana", forma2: "Dirigi-me à Ana" },
              { forma1: "Falei com a Joana", forma2: "Falei com a Joana (sem preposição)" },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg">
                <p className="text-blue-400 text-lg font-mono mb-2">✅ {item.forma1}</p>
                <p className="text-blue-400 text-lg font-mono">✅ {item.forma2}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Dica de Prova" variant={mv[5]} />
          <AlertBox tipo="warning" titulo="Estratégia em Prova">
            Se as duas formas aparecem nas alternativas (com e sem crase antes do nome próprio), <strong>ambas são tecnicamente corretas</strong>. A banca geralmente escolhe apenas uma para ser o gabarito. Fique atento ao contexto da questão para escolher qual forma é mais formal ou comum no padrão exigido.
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM5} titulo="Quiz - Nomes Próprios" numero={5} variant={mv[5]} onComplete={(s) => handleModuleComplete("modulo-5", s)} />
      </TabsContent>

      {/* ─── MÓDULO 6: FACULTATIVO POSSESSIVOS ─── */}
      <TabsContent value="modulo-6" className="mt-0 space-y-12">
        <ModuleBanner numero={6} titulo="Facultativo: Possessivos" variant={mv[6]} descricao="Minha, Sua, Tua" />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Pronomes Possessivos Femininos: Crase Facultativa"
            variant={mv[6]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Quando a palavra feminina é um possessivo no singular (minha, sua, tua, nossa), a crase é <strong>facultativa</strong>. O possessivo pode vir com ou sem artigo, por isso "a minha" e "minha" são formas equivalentes que aceitam ambas as preposições.
            </p>
            <p>
              Exemplos: "Dirigo-me <em>a</em> minha mãe" e "Dirigo-me <em>à</em> minha mãe" — as duas estão corretas. Essa liberdade existe porque o possessivo já carrega noção de definição sem precisar do artigo explícito.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Possessivos Femininos Singulares" variant={mv[6]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { sem: "Dirigo-me a minha mãe", com: "Dirigo-me à minha mãe" },
              { sem: "Refiro-me a sua opinião", com: "Refiro-me à sua opinião" },
              { sem: "Assisti a tua apresentação", com: "Assisti à tua apresentação" },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-indigo-500/20 bg-indigo-500/5 rounded-lg">
                <p className="text-indigo-400 text-lg mb-2">✅ {item.sem}</p>
                <p className="text-indigo-400 text-lg">✅ {item.com}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Atenção: Possessivos Plurais" variant={mv[6]} />
          <AlertBox tipo="info" titulo="Plural NÃO é Facultativo">
            ❌ "Dirijo-me a minhas mães" — NUNCA (plural não tem artigo)
            <br />
            ✅ "Dirijo-me às minhas mães" — CORRETO (minhas é definido, tem crase obrigatória)
            <br />
            <br />
            A faculdade de crase aplica-se APENAS ao singular!
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM6} titulo="Quiz - Possessivos" numero={6} variant={mv[6]} onComplete={(s) => handleModuleComplete("modulo-6", s)} />
      </TabsContent>

      {/* ─── MÓDULO 7: HORAS E MEDIDAS ─── */}
      <TabsContent value="modulo-7" className="mt-0 space-y-12">
        <ModuleBanner numero={7} titulo="Horas e Medidas" variant={mv[7]} descricao="Às 14h, À vista" />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Horas Exatas: Crase Obrigatória"
            variant={mv[7]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Quando se fala de <strong>horas exatas</strong>, a crase é <strong>obrigatória</strong>. A estrutura é: preposição A (de tempo) + artigo A (definindo a hora) = À. Você sempre escreve "às" quando especifica horário: "Às 14 horas", "Às 9 da manhã", "Às 22:30".
            </p>
            <p>
              O mesmo ocorre com <strong>medidas de distância</strong> quando seguidas de unidade: "À vista", "À distância de 2 km", "À proporção de 80%". Esses são casos especiais onde a crase é automática porque a fusão A + A ocorre sistematicamente.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Horas e Medidas" variant={mv[7]} />
          <CardCarousel
            cards={[
              { icone: "🕐", title: "Às 9 horas", descricao: "Horário exato (crase obrigatória)" },
              { icone: "🕕", title: "Às 14:30", descricao: "Hora com minutos (crase obrigatória)" },
              { icone: "📏", title: "À vista", descricao: "Expressão de medida/modo (crase fixo)" },
              { icone: "📐", title: "À proporção de", descricao: "Medida de taxa (crase obrigatória)" },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Comparação: Com Hora Aproximada" variant={mv[7]} />
          <AlertBox tipo="warning" titulo="Atenção à Diferença">
            ✅ "Chegou <em>às</em> 9 horas" (hora exata → crase)
            <br />
            ✅ "Chegou <em>por</em> volta das 9" (hora aproximada → não é crase, é preposição simples)
            <br />
            <br />
            Crase ocorre apenas com horários EXATOS!
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM7} titulo="Quiz - Horas e Medidas" numero={7} variant={mv[7]} onComplete={(s) => handleModuleComplete("modulo-7", s)} />
      </TabsContent>

      {/* ─── MÓDULO 8: CASA/TERRA/DISTÂNCIA ─── */}
      <TabsContent value="modulo-8" className="mt-0 space-y-12">
        <ModuleBanner numero={8} titulo="Casa, Terra e Distância" variant={mv[8]} descricao="Regra da especificação" />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Casa e Terra: Regra de Ouro"
            variant={mv[8]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              As palavras <strong>casa</strong> e <strong>terra</strong> têm uma regra especial: quando significam "para a própria residência/região" (sem especificação), não há crase. Mas quando são <strong>especificadas</strong> ("casa de José", "terra natal"), há crase obrigatória.
            </p>
            <p>
              Lógica: "Vou a casa" (a casa, genérica, sem artigo) vs "Vou à casa da Maria" (à casa = a + a casa, especificada). A diferença está em ter ou não um modificador (adjunto) que especifique a palavra.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Exemplos: Casa e Terra" variant={mv[8]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-lg">
              <p className="font-bold text-emerald-500 mb-3">SEM CRASE (genérico)</p>
              <p className="text-lg">✅ "Vou <em>a</em> casa"</p>
              <p className="text-lg">✅ "Voltei <em>a</em> terra"</p>
              <p className="text-muted-foreground text-sm mt-2">(sem especificação)</p>
            </div>
            <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg">
              <p className="font-bold text-blue-500 mb-3">COM CRASE (especificado)</p>
              <p className="text-lg">✅ "Vou <em>à</em> casa da Maria"</p>
              <p className="text-lg">✅ "Voltei <em>à</em> terra natal"</p>
              <p className="text-muted-foreground text-sm mt-2">(com especificação)</p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Distância: Outra Regra Especial" variant={mv[8]} />
          <AlertBox tipo="info" titulo="À Distância de...">
            ✅ "À distância de 10 km" (crase obrigatória com "distância de")
            <br />
            ✅ "À distância de um quilômetro" (crase obrigatória)
            <br />
            ❌ "A distância" (sem preposição, sem artigo → sem crase)
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM8} titulo="Quiz - Casos Especiais" numero={8} variant={mv[8]} onComplete={(s) => handleModuleComplete("modulo-8", s)} />
      </TabsContent>

      {/* ─── MÓDULO 9: DEMONSTRATIVOS ─── */}
      <TabsContent value="modulo-9" className="mt-0 space-y-12">
        <ModuleBanner numero={9} titulo="Àquele, Àquela, Àquilo" variant={mv[9]} descricao="Fusão com a preposição" />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Demonstrativos: Fusão Especial"
            variant={mv[9]}
          />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Os demonstrativos <strong>aquele, aquela, aquilo</strong> (e variações) aceitam fusão com a preposição A, gerando as formas <strong>àquele, àquela, àquilo</strong>. Essa fusão é diferente da fusão com artigo — aqui a preposição funde-se com o próprio demonstrativo.
            </p>
            <p>
              A estrutura é: preposição A + demonstrativo aquele = àquele. O teste do masculino funciona aqui também: se em forma masculina resultaria em "ÀQUELE" (aquele tem a preposição A fusionada), então no feminino correspondente há crase.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Demonstrativos com Crase" variant={mv[9]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { demon: "Àquele", test: "Àquele rapaz", ex: "Refiro-me àquele rapaz" },
              { demon: "Àquela", test: "Àquela moça", ex: "Refiro-me àquela moça" },
              { demon: "Àquilo", test: "Àquilo (neutro)", ex: "Refiro-me àquilo" },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-purple-500/20 bg-purple-500/5 rounded-lg">
                <p className="font-bold text-purple-500 text-lg">{item.demon}</p>
                <p className="text-muted-foreground text-sm mt-2">{item.test}</p>
                <p className="text-sm mt-2 italic">{item.ex}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} title="Teste: Este vs Aquele" variant={mv[9]} />
          <AlertBox tipo="info" titulo="Técnica de Verificação">
            Substitua "aquele" por "este" na mesma frase:
            <br />
            <br />
            "Refiro-me <em>àquele</em> rapaz" → "Refiro-me <em>a este</em> rapaz"
            <br />
            (Se com "a este" dá preposição simples, com "àquele" = crase)
            <br />
            <br />
            Isso confirma que a preposição A está fusionada com o demonstrativo.
          </AlertBox>
        </section>

        <QuizInterativo questoes={quizM9} titulo="Quiz - Demonstrativos" numero={9} variant={mv[9]} onComplete={(s) => handleModuleComplete("modulo-9", s)} />
      </TabsContent>

      {/* ─── MÓDULO 10: SIMULADO FINAL ─── */}
      <TabsContent value="modulo-10" className="mt-0 space-y-12">
        <ModuleBanner numero={10} titulo="Simulado Final" variant={mv[10]} descricao="Consolidação completa de crase" />
        <AlertBox tipo="success" titulo="Arena Master de Crase">
          Este é o desafio final. Você vai encontrar questões que combinam múltiplas regras — o padrão exato das provas da CESGRANRIO.
          <br />
          <br />
          Lembre-se: equação (A + A = À), teste do masculino (AO?), e as exceções (verbo, pronome, etc). Você está pronto!
        </AlertBox>
        <QuizInterativo questoes={quizM10} titulo="Simulado Final" numero={10} variant={mv[10]} onComplete={(s) => handleModuleComplete("modulo-10", s)} />
      </TabsContent>
    </AulaTemplate>
  );
}
