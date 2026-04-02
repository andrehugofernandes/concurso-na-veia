import { getAllModuleVariants } from "@/lib/moduleColors";
"use client";

import { useState, useCallback, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  LuCheck,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuMusic,
  LuZap,
  LuBookOpen,
  LuShield,
  LuMessageCircle,
  LuTriangleAlert,
  LuArrowRight,
  LuEye,
  LuFileText,
  LuTarget,
  LuLightbulb,
  LuTrophy,
  LuCircleCheck,
  LuCircleX,
  LuLink,
} from "react-icons/lu";
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
  Comparison,
} from "../shared";

import {
  QUIZ_M1_REGENCIA,
  QUIZ_M2_REGENCIA,
  QUIZ_M3_REGENCIA,
  QUIZ_M4_REGENCIA,
  QUIZ_M5_REGENCIA,
  QUIZ_M6_REGENCIA,
  QUIZ_M7_REGENCIA,
  QUIZ_M8_REGENCIA,
  QUIZ_M9_REGENCIA,
  QUIZ_FINAL_REGENCIA,
} from "./data/regencia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos e Mecânica" },
  { id: "modulo-2", label: "Módulo 2", title: "Regência Nominal: Adjetivos" },
  {
    id: "modulo-3",
    label: "Módulo 3",
    title: "Regência Nominal: Substantivos",
  },
  { id: "modulo-4", label: "Módulo 4", title: "Verbos de Elite: Parte I" },
  { id: "modulo-5", label: "Módulo 5", title: "Verbos de Elite: Parte II" },
  { id: "modulo-6", label: "Módulo 6", title: "Transitividade Bifronte" },
  { id: "modulo-7", label: "Módulo 7", title: "Movimento e Pronominais" },
  { id: "modulo-8", label: "Módulo 8", title: "Peculiaridades Cesgranrio" },
  { id: "modulo-9", label: "Módulo 9", title: "Regência e Relativos" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
] as const;

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaRegencia({
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
  currentProgress,
  onUpdateProgress,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  const totalModulos = MODULE_DEFS.length;

  useEffect(() => {
    if (
      currentProgress &&
      currentProgress > 0 &&
      !hasSyncedInitial &&
      !loading
    ) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 0; i < count; i++) {
        s.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(s);
      if (count < totalModulos) {
        setActiveTab(MODULE_DEFS[count].id);
      } else {
        setActiveTab(MODULE_DEFS[totalModulos - 1].id);
      }
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading, totalModulos]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });

      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));

      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      } else {
        setShowCompletionBadge(true);
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
  };

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
      currentProgress={Math.round((completedModules.size / totalModulos) * 100)}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* Módulo 1: Fundamentos */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos e Mecânica"
            descricao="Entenda a relação de atração entre o termo regente (imã) e o termo regido (complemento)."
          variant={mv[1]}
        />

          {/* ★ RICH INTRO M1 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Que É Regência e Por Que Ela Decide Aprovações"
              variant={mv[1]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Regência é a área da gramática que estuda a relação de dependência entre um termo de sentido
                incompleto — o <strong>regente</strong> — e o termo que o completa, o <strong>regido</strong>.
                Segundo Evanildo Bechara, "a regência determina a natureza da ligação sintática entre o
                núcleo e seu complemento, estabelecendo se essa ligação se faz com ou sem preposição". Em
                outras palavras, toda vez que um verbo ou nome exige um complemento, há uma relação de
                regência em jogo — e errar a preposição significa errar a regência.
              </p>
              <p>
                Pense na regência como um imã: o verbo ou nome regente possui uma "polaridade gramatical" que
                atrai seu complemento de forma específica — às vezes diretamente, sem conector (objeto
                direto), às vezes através de uma preposição obrigatória (objeto indireto). Quando você usa a
                preposição errada ou a omite onde ela é obrigatória, o sentido "repele" e a frase fica errada
                perante a norma culta. Esse mecanismo é simples na teoria, mas exige memorização das regências
                individuais dos verbos e nomes mais usados.
              </p>
              <p>
                A regência se divide em dois grandes ramos. A <strong>regência verbal</strong> trata da
                relação entre o verbo e seus complementos: o <em>objeto direto</em> (sem preposição) e o{" "}
                <em>objeto indireto</em> (com preposição). A <strong>regência nominal</strong> trata da
                relação entre um nome — substantivo, adjetivo ou advérbio — e seu complemento preposicionado.
                A <em>transitividade verbal</em> determina se o verbo é direto (VTD), indireto (VTI) ou
                bitransitivo (VTDI). Verbos intransitivos não exigem complemento algum. Essa classificação é
                o núcleo de toda questão de regência em concurso.
              </p>
              <p>
                Na Petrobras, a regência é exigida em documentos técnicos, normas operacionais e comunicações
                formais. Procedimentos de Segurança, Ordens de Serviço e Atas de Reunião demandam precisão
                sintática: "procedemos <strong>à</strong> inspeção" (não "procedemos a inspeção"),
                "aspiramos <strong>ao</strong> crescimento sustentável" (não "aspiramos o crescimento"),
                "obedecemos <strong>às</strong> normas ISO" (não "obedecemos as normas"). Um laudo técnico
                com regência errada pode comprometer a interpretação jurídica de um contrato ou o
                cumprimento de uma exigência regulatória da ANP.
              </p>
              <p>
                A CESGRANRIO cobra regência em praticamente todas as provas da Petrobras porque a banca
                sabe que a língua coloquial corrompeu os padrões normativos. O candidato despreparado
                escreve como fala: "assisti o jogo", "cheguei em casa", "implicar em problemas" — todas
                construções erradas pela norma culta. O gabarito baseia-se na gramática de Bechara e Cunha,
                e os distratores das alternativas sempre exploram substituições indevidas de preposição.
                Memorizar as regências dos verbos e nomes mais cobrados é, portanto, o investimento de
                estudo com maior retorno nesta disciplina.
              </p>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-xl border border-amber-200 dark:border-amber-800 p-6 space-y-3">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  <LuZap className="w-4 h-4 text-amber-500" /> Regra-Chave: O Teste da Transitividade
                </h4>
                <p className="text-base text-foreground/80">
                  Para verificar a transitividade, substitua o complemento: <strong>se cabe "o/a"</strong> →
                  transitivo direto (sem preposição). <strong>Se cabe "lhe/lhes"</strong> → transitivo
                  indireto (com preposição obrigatória).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base">
                  <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">✅ VTD — sem preposição</span>
                    "Assinou <em>o contrato</em>" → assinou-<strong>o</strong> ✓
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">✅ VTI — com preposição</span>
                    "Obedeceu <em>às normas</em>" → obedeceu-<strong>lhes</strong> ✓
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="A Lógica da Regência"
          variant={mv[1]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "O que é Regência?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Regência é a parte da gramática que estuda a relação
                        entre um termo de sentido incompleto (
                        <strong>Regente</strong>) e o termo que o completa (
                        <strong>Regido</strong>).
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <h4 className="font-bold text-blue-500 mb-2 flex items-center gap-2">
                            <LuTarget className="w-4 h-4" /> Termo Regente
                          </h4>
                          <p className="text-lg">
                            É a palavra que exige um complemento para ter
                            sentido pleno. Pode ser um verbo ou um nome.
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-500 mb-2 flex items-center gap-2">
                            <LuCheck className="w-4 h-4" /> Termo Regido
                          </h4>
                          <p className="text-lg">
                            É o complemento que satisfaz a exigência do regente,
                            podendo ou não vir acompanhado de preposição.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Mecânica da Preposição",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg text-muted-foreground">
                        A preposição é o "conector" que vincula os termos. No
                        concurso, o erro mais comum é trocar ou omitir esse
                        conector.
                      </p>
                      <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20 italic">
                        "O povo confia **em** soluções rápidas." <br />
                        <span className="text-lg text-muted-foreground">
                          (Confia = VERBO REGENTE; EM = PREPOSIÇÃO CONECTORA;
                          Soluções = TERMO REGIDO)
                        </span>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-amber-500"
        />
          </section>

          {/* ── CONTEÚDO RICO M1 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Regência Verbal vs Nominal"
          variant={mv[1]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Regência Verbal: o verbo manda",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Na <strong>regência verbal</strong>, o verbo é o termo
                        regente e determina se seu complemento (objeto) vem com
                        ou sem preposição. Isso define a transitividade do verbo.
                      </p>
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-lg">
                          <span className="font-bold text-blue-500 block mb-1">
                            Intransitivo
                          </span>
                          Não exige complemento. Ex: "O sol <strong>nasce</strong>."
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20 text-lg">
                          <span className="font-bold text-indigo-500 block mb-1">
                            Transitivo Direto
                          </span>
                          Complemento SEM preposição. Ex: "Ela <strong>comprou</strong> o relatório."
                        </div>
                        <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/20 text-lg">
                          <span className="font-bold text-purple-500 block mb-1">
                            Transitivo Indireto
                          </span>
                          Complemento COM preposição. Ex: "Ele <strong>gosta</strong> de café."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regência Nominal: o nome manda",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Na <strong>regência nominal</strong>, o termo regente é
                        um <em>nome</em>: substantivo, adjetivo ou advérbio. A
                        preposição exigida é fixa para cada palavra.
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-lg">
                          <span className="font-bold text-emerald-500 block mb-1">
                            Adjetivo
                          </span>
                          "Apto <strong>a</strong> trabalhar" — a preposição pertence ao adjetivo.
                        </div>
                        <div className="p-3 bg-teal-500/5 rounded-xl border border-teal-500/20 text-lg">
                          <span className="font-bold text-teal-500 block mb-1">
                            Substantivo
                          </span>
                          "Amor <strong>a/por/de</strong> alguém" — o substantivo dita a preposição.
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Por que isso cai tanto na Cesgranrio?",
                  icone: <LuShield />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        A Cesgranrio cobra regência porque a língua coloquial
                        usa preposições erradas com frequência. O candidato
                        despreparado escreve como fala. Para a Petrobras, a
                        excelência linguística é exigida.
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-lg space-y-2">
                        <p>
                          ❌ <span className="line-through opacity-60">"Eu prefiro isso do que aquilo."</span>
                        </p>
                        <p>
                          ✅ "Eu prefiro isso <strong>a</strong> aquilo."
                        </p>
                        <p className="text-lg text-muted-foreground">
                          O verbo PREFERIR exige a preposição A, nunca "do que".
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-amber-500"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Transitivo Direto vs Indireto"
          variant={mv[1]}
        />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold text-lg">TRANSITIVO DIRETO</div>}
                verso={
                  <div className="space-y-3 text-lg">
                    <p className="font-semibold text-emerald-400">Sem preposição obrigatória</p>
                    <p>O verbo liga-se diretamente ao complemento.</p>
                    <p>✅ "A Petrobras <strong>assinou</strong> o contrato."</p>
                    <p>✅ "Ele <strong>comprou</strong> os equipamentos."</p>
                    <p className="text-lg text-muted-foreground">
                      O complemento pode ser substituído por o/a/os/as.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold text-lg">TRANSITIVO INDIRETO</div>}
                verso={
                  <div className="space-y-3 text-lg">
                    <p className="font-semibold text-blue-400">Com preposição obrigatória</p>
                    <p>O verbo precisa da preposição para conectar o complemento.</p>
                    <p>✅ "Ele <strong>obedeceu às</strong> normas."</p>
                    <p>✅ "Aspiramos <strong>ao</strong> crescimento."</p>
                    <p className="text-lg text-muted-foreground">
                      O complemento pode ser substituído por lhe/lhes.
                    </p>
                  </div>
                }
              />
            </div>
            <AlertBox tipo="info" titulo="Macete Definitivo">
              Para testar a transitividade, substitua o complemento: se cabe
              <strong> o/a</strong> = direto (sem preposição); se cabe{" "}
              <strong>lhe/lhes</strong> = indireto (com preposição).
              <br />
              Ex: "Obedeceu às ormas" → Obedeceu <em>lhe</em> ✅ → Transitivo Indireto.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M1_REGENCIA}
            titulo="QUIZ: Módulo Nº 1"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          variant={mv[1]}
        />
        </div>
      </TabsContent>

      {/* Módulo 2: Regência Nominal - Adjetivos */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Regência Nominal: Adjetivos"
            descricao="Lista crítica de adjetivos que exigem preposições fixas para não errar na prova."
          variant={mv[2]}
        />

          {/* ★ RICH INTRO M2 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Adjetivos e Suas Preposições: O Casamento Gramatical que a CESGRANRIO Adora"
              variant={mv[2]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                A regência nominal é a relação de subordinação que um <strong>nome</strong> — adjetivo, substantivo ou advérbio — estabelece com o seu complemento, exigindo dele uma preposição específica e intransferível. Segundo Evanildo Bechara, o termo regente nominal "atrai" o termo regido por meio de uma preposição que não pode ser substituída sem alterar o sentido ou gerar incorreção gramatical. Diferentemente da regência verbal, onde o verbo comanda a cena, aqui o adjetivo é o protagonista: é ele quem dita qual preposição o acompanha.
              </p>
              <p>
                Pense nos adjetivos como plugues elétricos: cada um tem um formato único que só encaixa em um tipo de tomada — a preposição certa. "Apto" só encaixa em "A" (apto <em>a</em> liderar); "versado" só encaixa em "EM" (versado <em>em</em> gestão); "compatível" só encaixa em "COM" (compatível <em>com</em> o cargo). Tentar encaixar a preposição errada produz ruído gramatical imediato, e a banca detecta esse ruído cirurgicamente. A prova não pergunta se você sabe o significado do adjetivo — ela testa se você conhece o seu par preposicional obrigatório.
              </p>
              <p>
                Os adjetivos se organizam em <strong>famílias preposicionais</strong> coesas. O grupo da preposição <em>A</em> reúne adjetivos de adequação e orientação: acessível, apto, atento, avesso, favorável, idêntico, nocivo, relativo. O grupo de <em>EM</em> concentra adjetivos de especialidade e localização: versado, perito, hábil, indeciso. O grupo de <em>COM</em> agrega adjetivos de compatibilidade e relação: compatível, conforme, contente, satisfeito. O grupo de <em>POR</em> inclui adjetivos de estimação e anseio: ansioso, curioso, responsável. Memorizar essas famílias — não adjetivo a adjetivo — é a estratégia mais eficiente para a prova.
              </p>
              <p>
                No ambiente corporativo da Petrobras, a regência nominal aparece em documentos técnicos, pareceres jurídicos, relatórios de sustentabilidade e comunicados oficiais. Um engenheiro "apto <em>a</em> exercer a função", um processo "compatível <em>com</em> a norma ISO", uma equipe "responsável <em>pela</em> operação segura da plataforma" — cada construção dessas exige a preposição correta para que o texto tenha validade formal. Erros de regência nominal em documentos oficiais são tratados como falhas de redação técnica, comprometendo a credibilidade do autor e a precisão jurídica do texto.
              </p>
              <p>
                A CESGRANRIO aplica regência nominal de duas formas principais: <strong>(1) substituição de preposição</strong>, onde a alternativa correta preserva o adjetivo com sua preposição original; e <strong>(2) reescrita de trecho</strong>, onde você deve identificar qual versão reescrita mantém o sentido e a correção. O erro mais frequente nas alternativas incorretas é a troca de "A" por "PARA" (que altera nuance de destino) ou a omissão total da preposição. O candidato que domina as famílias preposicionais dos adjetivos acerta essas questões em menos de 30 segundos.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-blue-900 dark:text-blue-100 text-xl">As 4 Famílias Preposicionais dos Adjetivos</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3">
                    <div className="font-bold text-blue-700 dark:text-blue-300 mb-1">Preposição A</div>
                    <div className="text-foreground/70">acessível, apto, atento, avesso, favorável, idêntico, nocivo, relativo, superior, inferior</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3">
                    <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-1">Preposição EM</div>
                    <div className="text-foreground/70">versado, perito, hábil, indeciso, morador, rico, pobre, fértil</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3">
                    <div className="font-bold text-purple-700 dark:text-purple-300 mb-1">Preposição COM</div>
                    <div className="text-foreground/70">compatível, conforme, contente, satisfeito, generoso, liberal, pródigo</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3">
                    <div className="font-bold text-violet-700 dark:text-violet-300 mb-1">Preposição POR/DE</div>
                    <div className="text-foreground/70">ansioso, curioso, responsável (por); capaz, certo, fácil, difícil (de)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Radar de Adjetivos"
          variant={mv[2]}
        />
            <CardCarousel
              cards={[
                {
                  icone: "📍",
                  title: "Preposição A",
                  descricao:
                    "Acessível, Apto, Atento, Avesso, Favorável, Idêntico, Nocivo, Relativo.",
                },
                {
                  icone: "🧪",
                  title: "Preposição EM",
                  descricao:
                    "Versado, Perito, Hábil, Indeciso, Morador, Incessante.",
                },
                {
                  icone: "🛡️",
                  title: "Preposição POR",
                  descricao: "Ansioso, Responsável, Apaixonado, Grato.",
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="O Caso de FAVORÁVEL">
              Favorável exige sempre a preposição <strong>A</strong>. É um erro
              comum dizer "favorável com".
              <br /> ✅ "O parecer foi favorável **ao** projeto."
            </AlertBox>
          </section>

          {/* ── CONTEÚDO RICO M2 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Adjetivos Críticos com Preposição COM"
          variant={mv[2]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Grupo do COM: compatível, contente, satisfeito",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Vários adjetivos muito comuns na língua formal exigem a
                        preposição <strong>COM</strong>. Errar essas preposições
                        é um dos itens mais cobrados pela Cesgranrio.
                      </p>
                      <div className="grid gap-2 text-lg">
                        {[
                          { adj: "Compatível", prep: "COM", ex: "compatível com as normas" },
                          { adj: "Contente", prep: "COM", ex: "contente com o resultado" },
                          { adj: "Satisfeito", prep: "COM", ex: "satisfeito com o desempenho" },
                          { adj: "Comprometido", prep: "COM", ex: "comprometido com a segurança" },
                          { adj: "Familiarizado", prep: "COM", ex: "familiarizado com os procedimentos" },
                        ].map((item) => (
                          <div
                            key={item.adj}
                            className="flex items-center justify-between p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10"
                          >
                            <span className="font-semibold">{item.adj}</span>
                            <span className="font-mono text-indigo-400 text-lg font-bold">
                              {item.prep}
                            </span>
                            <span className="text-muted-foreground text-lg italic">
                              {item.ex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha: ANSIOSO por vs ANSIOSO para",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        O adjetivo <strong>ANSIOSO</strong> admite duas
                        preposições com sentidos diferentes:
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-lg">
                          <span className="font-bold text-blue-500 block mb-1">Ansioso POR</span>
                          Desejo intenso de algo.
                          <br />
                          ✅ "Ansioso <strong>pela</strong> aprovação."
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-lg">
                          <span className="font-bold text-emerald-500 block mb-1">Ansioso PARA</span>
                          Pronto para fazer algo.
                          <br />
                          ✅ "Ansioso <strong>para</strong> começar o trabalho."
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-blue-500"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Armadilhas Cesgranrio — Adjetivos"
          variant={mv[2]}
        />
            <AlertBox tipo="danger" titulo="Os 5 Adjetivos Mais Cobrados">
              Decore estas combinações — elas aparecem diretamente nas provas da
              Petrobras e da Cesgranrio:
              <br />
              <br />
              ✅ "apto <strong>a</strong> exercer" — não "apto para"
              <br />
              ✅ "atento <strong>às</strong> normas" — não "atento nas normas"
              <br />
              ✅ "nocivo <strong>à</strong> saúde" — não "nocivo para"
              <br />
              ✅ "versado <strong>em</strong> legislação" — não "versado de"
              <br />
              ✅ "responsável <strong>pelo</strong> projeto" — não "responsável do projeto"
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold">APTO</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-emerald-400">Preposição: A</p>
                    <p>✅ "Profissional apto <strong>ao</strong> cargo."</p>
                    <p>✅ "Apto <strong>a</strong> assumir a função."</p>
                    <p className="text-amber-400">⚠️ NUNCA: "apto para o cargo" (coloquial)</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">ATENTO</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-blue-400">Preposição: A</p>
                    <p>✅ "Atento <strong>às</strong> diretrizes corporativas."</p>
                    <p>✅ "Fique atento <strong>ao</strong> prazo."</p>
                    <p className="text-amber-400">⚠️ NUNCA: "atento nos detalhes"</p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={QUIZ_M2_REGENCIA}
            titulo="QUIZ: Módulo Nº 2"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          variant={mv[2]}
        />
        </div>
      </TabsContent>

      {/* Módulo 3: Regência Nominal - Substantivos */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Regência Nominal: Substantivos"
            descricao="A forte atração de nomes como 'Respeito', 'Amor' e 'Dúvida'."
          variant={mv[3]}
        />

          {/* ★ RICH INTRO M3 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Substantivos que Regem: Quando o Nome Exige Preposição"
              variant={mv[3]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Assim como os adjetivos, os <strong>substantivos</strong> também exercem regência sobre seus complementos nominais, exigindo preposições específicas para formar construções corretas. O substantivo regente é aquele derivado de um verbo ou adjetivo que mantém a mesma regência da forma primitiva: "respeito" veio de "respeitar" (transitivo indireto com <em>a/por</em>), portanto herda as preposições "a", "com", "por" e "para com". Essa derivação gramatical é a chave para deduzir a regência nominal de substantivos desconhecidos sem precisar memorizá-los individualmente.
              </p>
              <p>
                A complexidade da regência nominal de substantivos está nos casos em que <strong>múltiplas preposições são aceitas</strong> com variação de sentido. "Amor" pode ser construído com "A" (amor ao próximo — mais formal, direcionado), com "PELA/PELO" (amor pela profissão — sentimento duradouro) ou com "POR" (amor por justiça — princípio abstrato). A banca explora exatamente esses casos limítrofes, exigindo do candidato a percepção de que o erro não está na preposição isolada, mas na combinação preposição + substantivo + contexto semântico.
              </p>
              <p>
                Existem padrões previsíveis na regência de substantivos: nomes que expressam <strong>atração ou sentimento dirigido</strong> tendem a usar "A" ou "PELA/PELO" (admiração a, afeto pelo, apego à); nomes que expressam <strong>dúvida ou incerteza</strong> usam "EM" ou "SOBRE" (dúvida em, questionamento sobre); nomes que expressam <strong>obrigação ou responsabilidade</strong> usam "DE" (necessidade de, obrigação de, direito de); nomes que expressam <strong>conformidade ou relação</strong> usam "COM" (acordo com, concordância com, compatibilidade com). Reconhecer esses grupos semânticos elimina a necessidade de memorizar cada substantivo isoladamente.
              </p>
              <p>
                No contexto da Petrobras, a regência nominal de substantivos aparece em instrumentos contratuais, normas regulatórias e comunicados internos. "A necessidade <em>de</em> qualificação técnica", "o respeito <em>às</em> normas de segurança", "a dúvida <em>em</em> relação ao prazo", "o direito <em>à</em> informação" — cada uma dessas construções é padrão nos documentos oficiais da empresa. Errar a preposição nesses contextos compromete a elegância e a precisão jurídica do texto, podendo até alterar o sentido legal de uma cláusula.
              </p>
              <p>
                A CESGRANRIO trabalha com substantivos de regência em três tipos de questão: <strong>identificação de erro</strong> (qual frase está errada?), <strong>reescrita equivalente</strong> (qual reescrita preserva sentido e correção?) e <strong>completude de lacuna</strong> (qual preposição preenche corretamente?). O candidato deve estar atento especialmente aos substantivos que aceitam mais de uma preposição — nesses casos, todas as alternativas podem parecer corretas e apenas o contexto determina a escolha certa. Dominar os grupos semânticos e a derivação verbal é o diferencial que separa o candidato aprovado do reprovado.
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-100 text-xl">Substantivos de Alta Frequência na CESGRANRIO</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-300">Múltiplas preposições aceitas:</div>
                    <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-1 text-foreground/80">
                      <div><strong>Respeito:</strong> a, com, por, para com</div>
                      <div><strong>Amor:</strong> a, por, pelo/pela</div>
                      <div><strong>Dúvida:</strong> em, sobre, acerca de</div>
                      <div><strong>Medo:</strong> de, a</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-teal-700 dark:text-teal-300">Preposição única obrigatória:</div>
                    <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-1 text-foreground/80">
                      <div><strong>Necessidade:</strong> de</div>
                      <div><strong>Direito:</strong> a (direito à saúde)</div>
                      <div><strong>Compatibilidade:</strong> com</div>
                      <div><strong>Capacidade:</strong> de, para</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Equilíbrio de Nomes"
          variant={mv[3]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Sinônimos de Conexão",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Diferente do que muitos pensam, alguns nomes aceitam
                        mais de uma preposição sem mudar o sentido.
                      </p>
                      <div className="grid gap-2 text-lg">
                        <div className="flex justify-between p-2 border-b">
                          <span>Respeito</span>{" "}
                          <span className="font-mono text-primary">
                            a, com, por, para com
                          </span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                          <span>Capacidade</span>{" "}
                          <span className="font-mono text-primary">
                            de, para
                          </span>
                        </div>
                        <div className="flex justify-between p-2">
                          <span>Dúvida</span>{" "}
                          <span className="font-mono text-primary">
                            sobre, acerca de, de
                          </span>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-emerald-500"
        />
          </section>

          {/* ── CONTEÚDO RICO M3 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Substantivos e Suas Preposições Fixas"
          variant={mv[3]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Amor, Ódio, Medo: preposições afetivas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Os substantivos de sentimento possuem preposições fixas
                        que o candidato deve memorizar:
                      </p>
                      <div className="grid gap-2 text-lg">
                        {[
                          { subst: "Amor", prep: "A / DE / POR", ex: "amor à pátria / amor de mãe / amor pelo trabalho" },
                          { subst: "Medo", prep: "DE", ex: "medo de falhar" },
                          { subst: "Ódio", prep: "A / DE", ex: "ódio ao desperdício / ódio de perder" },
                          { subst: "Saudade", prep: "DE", ex: "saudade de casa" },
                          { subst: "Orgulho", prep: "DE", ex: "orgulho do trabalho realizado" },
                        ].map((item) => (
                          <div
                            key={item.subst}
                            className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10 space-y-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{item.subst}</span>
                              <span className="text-indigo-400 font-mono text-lg font-bold">
                                {item.prep}
                              </span>
                            </div>
                            <p className="text-lg text-muted-foreground italic">
                              {item.ex}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Substantivos técnicos de prova",
                  icone: <LuFileText />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        No contexto corporativo da Petrobras, estes substantivos
                        aparecem com frequência em relatórios técnicos:
                      </p>
                      <div className="grid gap-2 text-lg">
                        {[
                          { subst: "Necessidade", prep: "DE", ex: "necessidade de treinamento" },
                          { subst: "Referência", prep: "A", ex: "referência ao protocolo" },
                          { subst: "Dependência", prep: "DE", ex: "dependência de aprovação" },
                          { subst: "Acesso", prep: "A", ex: "acesso ao sistema" },
                          { subst: "Cumprimento", prep: "DE", ex: "cumprimento das metas" },
                        ].map((item) => (
                          <div
                            key={item.subst}
                            className="flex items-center justify-between p-3 bg-slate-500/5 rounded-lg border border-slate-500/10"
                          >
                            <span className="font-semibold">{item.subst}</span>
                            <span className="text-primary font-mono text-lg font-bold">
                              {item.prep}
                            </span>
                            <span className="text-muted-foreground text-lg italic">
                              {item.ex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-emerald-500"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação: Uso Correto vs Coloquial"
          variant={mv[3]}
        />
            <Comparison
              title="Respeito: Preposição A ou COM?"
              left={{
                title: "Uso Coloquial",
                content: "Tenho respeito por todos os colegas.",
                description: "Válido, mas há opção mais formal.",
                variant: "warning",
              }}
              right={{
                title: "Uso Formal (Petrobras)",
                content: "Tenho respeito a todos os colegas.",
                description: "Preposição A é a mais culta para este substantivo.",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="DICA: Herança Verbal">
              Quando um substantivo deriva de um verbo, ele pode herdar a
              regência do verbo de origem.
              <br />
              Ex: "referir-se <strong>a</strong>" → "referência <strong>a</strong>"
              <br />
              Ex: "cuidar <strong>de</strong>" → "cuidado <strong>com</strong>" (alguns mudam levemente)
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M3_REGENCIA}
            titulo="QUIZ: Módulo Nº 3"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          variant={mv[3]}
        />
        </div>
      </TabsContent>

      {/* Módulo 4: Verbos de Elite I */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Verbos de Elite: Parte I"
            descricao="Assistir, Aspirar e Visar: O trio que decide aprovações na Cesgranrio."
          variant={mv[4]}
        />

          {/* ★ RICH INTRO M4 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Trio de Ouro: Verbos que Mudam de Sentido com a Preposição"
              variant={mv[4]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Existem verbos na língua portuguesa cuja <strong>transitividade varia conforme o sentido</strong> que assumem na frase. Esses verbos — chamados pela gramática normativa de "verbos de dupla ou múltipla regência" — são os preferidos da CESGRANRIO justamente porque o mesmo verbo pode ser transitivo direto em um sentido e transitivo indireto em outro, exigindo ou proibindo a preposição dependendo do contexto. Assistir, aspirar e visar formam o "trio de ouro" da regência verbal de elite, aparecendo em praticamente todas as provas de nível superior da banca.
              </p>
              <p>
                O verbo <strong>ASSISTIR</strong> é o exemplo mais didático dessa dualidade. Quando significa "ver, presenciar, ser espectador", é transitivo indireto e exige a preposição "A": "Assisti <em>ao</em> julgamento" (nunca "assisti o julgamento"). Quando significa "ajudar, prestar assistência", é transitivo direto e não admite preposição: "O médico assistiu o paciente". Quando significa "caber, pertencer (como direito)", também é transitivo indireto com "A": "Assiste <em>ao</em> trabalhador o direito de greve". Três sentidos diferentes, três comportamentos sintáticos diferentes — e o examinador usa essa variação para montar as armadilhas.
              </p>
              <p>
                O verbo <strong>ASPIRAR</strong> segue a mesma lógica bifronte. No sentido de "inalar, respirar, absorver", é transitivo direto: "O trabalhador aspirou <em>os</em> gases tóxicos" (sem preposição — o gás é o objeto direto). No sentido de "desejar intensamente, almejar, ambicionar", é transitivo indireto e exige "A": "O candidato aspira <em>à</em> aprovação" (a + a = à, com crase obrigatória). A distinção entre os dois sentidos é semântica: gases, poeiras e líquidos são inalados (VTD); cargos, objetivos e sonhos são almejados (VTI com A). Esta distinção é testada com alta frequência pela CESGRANRIO.
              </p>
              <p>
                No ambiente da Petrobras, esses verbos aparecem com frequência em documentos de Recursos Humanos, relatórios de saúde ocupacional e comunicados institucionais. "Aspirar <em>a</em> uma vaga de liderança" (desejo de ascensão) vs. "aspirar gases" (risco ocupacional em plataformas); "visar <em>ao</em> crescimento sustentável" (objetivo estratégico) vs. "visar um documento" (assinar/certificar oficialmente). O candidato que domina esses verbos lê documentos corporativos com mais precisão e produz textos tecnicamente impecáveis.
              </p>
              <p>
                A CESGRANRIO monta questões com esses verbos de três formas: <strong>frases com erro de preposição</strong> (colocar "A" onde não deve ou omitir onde deve), <strong>identificação do sentido pelo contexto</strong> (qual sentido o verbo assume nesta frase?) e <strong>reescrita mantendo sentido e correção</strong> (qual alternativa preserva ambos?). A estratégia vencedora é sempre a mesma: primeiro identificar o sentido do verbo no contexto, depois aplicar a regra de regência correspondente a esse sentido específico — nunca memorizar uma única regra para o verbo inteiro.
              </p>
              <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-rose-900 dark:text-rose-100 text-xl">Mapa de Regência — Verbos de Elite I</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-rose-700 dark:text-rose-300">ASSISTIR</div>
                    <div className="text-foreground/75"><em>Ver/presenciar:</em> VTI (A) → assisti ao show</div>
                    <div className="text-foreground/75"><em>Ajudar:</em> VTD → assistiu o paciente</div>
                    <div className="text-foreground/75"><em>Pertencer (direito):</em> VTI (A) → assiste ao empregado</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-orange-700 dark:text-orange-300">ASPIRAR</div>
                    <div className="text-foreground/75"><em>Inalar:</em> VTD → aspirou a poeira</div>
                    <div className="text-foreground/75"><em>Desejar/almejar:</em> VTI (A) → aspira ao cargo</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-amber-700 dark:text-amber-300">VISAR</div>
                    <div className="text-foreground/75"><em>Ter em vista/objetivar:</em> VTI (A) → visa ao lucro</div>
                    <div className="text-foreground/75"><em>Assinar/autenticar:</em> VTD → visou o cheque</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="A Variação de Sentido"
          variant={mv[4]}
        />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FlipCard
                frente={<div className="font-bold">ASSISTIR</div>}
                verso={
                  <div className="space-y-3 text-lg">
                    <p>
                      <strong>VTI (A):</strong> Ver/Presenciar. Ex: Assisti ao
                      curso.
                    </p>
                    <p>
                      <strong>VTD:</strong> Ajudar. Ex: Assisti o paciente.
                    </p>
                    <p>
                      <strong>VTI (A):</strong> Caber. Ex: Assiste ao povo esse
                      direito.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">ASPIRAR</div>}
                verso={
                  <div className="space-y-3 text-lg">
                    <p>
                      <strong>VTD:</strong> Cheirar/Suggar. Ex: Aspirei o pó.
                    </p>
                    <p>
                      <strong>VTI (A):</strong> Desejar. Ex: Aspiro ao cargo.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">VISAR</div>}
                verso={
                  <div className="space-y-3 text-lg">
                    <p>
                      <strong>VTD:</strong> Mirar ou Rubricar. Ex: Visou o
                      documento.
                    </p>
                    <p>
                      <strong>VTI (À/AO):</strong> Objetivar. Ex: Visamos ao
                      sucesso.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          {/* ── CONTEÚDO RICO M4 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Armadilhas Cesgranrio — Verbos Bifrontes"
          variant={mv[4]}
        />
            <AlertBox tipo="danger" titulo="Verbos que mudam de regência conforme o sentido">
              Os verbos bifrontes são o maior desafio de regência verbal. Cada
              sentido pede uma regência diferente. Os mais cobrados:
              <br /><br />
              🎯 <strong>ASSISTIR</strong>: ver (VTI-A) / ajudar (VTD) / caber (VTI-A)
              <br />
              🎯 <strong>ASPIRAR</strong>: inalar (VTD) / desejar (VTI-A)
              <br />
              🎯 <strong>VISAR</strong>: mirar/rubricar (VTD) / objetivar (VTI-A)
              <br />
              🎯 <strong>QUERER</strong>: desejar (VTD) / estimar/gostar (VTI-A)
              <br />
              🎯 <strong>CHAMAR</strong>: convocar (VTD) / denominar (VTD ou VTI)
            </AlertBox>
            <ContentAccordion
              slides={[
                {
                  titulo: "ASSISTIR: o verbo mais cobrado da prova",
                  icone: <LuEye />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        O verbo ASSISTIR merece atenção especial porque seus
                        três sentidos têm regências completamente distintas:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-lg">
                          <span className="font-bold text-emerald-500 block mb-1">
                            1. VER / PRESENCIAR → VTI (A)
                          </span>
                          <p>✅ "Assisti <strong>ao</strong> treinamento de segurança."</p>
                          <p>✅ "Os técnicos assistiram <strong>às</strong> operações."</p>
                          <p className="text-red-400 mt-1">❌ "Assisti o treinamento." (errado neste sentido)</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-lg">
                          <span className="font-bold text-blue-500 block mb-1">
                            2. AJUDAR / SOCORRER → VTD
                          </span>
                          <p>✅ "A equipe assistiu <strong>os</strong> trabalhadores acidentados."</p>
                          <p>✅ "O médico assistiu <strong>os</strong> pacientes."</p>
                        </div>
                        <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20 text-lg">
                          <span className="font-bold text-purple-500 block mb-1">
                            3. CABER / SER DIREITO DE → VTI (A)
                          </span>
                          <p>✅ "Assiste <strong>aos</strong> empregados o direito de recurso."</p>
                          <p>✅ "Não assiste <strong>ao</strong> gestor tal decisão."</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "ASPIRAR e VISAR: cuidados específicos",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20 text-lg">
                        <span className="font-bold text-teal-500 block mb-2">ASPIRAR</span>
                        <p>✅ "Os trabalhadores aspiraram <strong>o</strong> pó do ambiente." (inalar = VTD)</p>
                        <p>✅ "Os engenheiros aspiram <strong>ao</strong> cargo de gestão." (desejar = VTI-A)</p>
                        <p className="text-red-400 mt-1">❌ "Aspiro ao pó" (sentido incorreto — inalar não aceita preposição)</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-lg">
                        <span className="font-bold text-cyan-500 block mb-2">VISAR</span>
                        <p>✅ "O gerente visou <strong>o</strong> documento oficial." (rubricar = VTD)</p>
                        <p>✅ "A empresa visava <strong>ao</strong> lucro sustentável." (objetivar = VTI-A)</p>
                        <p className="text-red-400 mt-1">❌ "Visa melhorar" (infinitivo sem preposição só é aceito em sentido coloquial)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-rose-500"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação Direta: Assistir a vs Assistir"
          variant={mv[4]}
        />
            <Comparison
              title="O verbo ASSISTIR no contexto corporativo"
              left={{
                title: "❌ Uso Coloquial",
                content: "Todos assistiram a apresentação.",
                description: "No sentido de 'ver', falta a preposição A.",
                variant: "danger",
              }}
              right={{
                title: "✅ Norma Culta",
                content: "Todos assistiram à apresentação.",
                description: "VTI no sentido de 'ver' exige a preposição A (crase com 'a apresentação' → 'à').",
                variant: "success",
              }}
            />
          </section>

          <QuizInterativo
            questoes={QUIZ_M4_REGENCIA}
            titulo="QUIZ: Módulo Nº 4"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          variant={mv[4]}
        />
        </div>
      </TabsContent>

      {/* Módulo 5: Verbos de Elite II */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Verbos de Elite: Parte II"
            descricao="Custar, Proceder, Querer e Chamar: nuances que o candidato comum ignora."
          variant={mv[5]}
        />

          {/* ★ RICH INTRO M5 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Verbos de Comportamento Único: Quando a Língua Culta Surpreende"
              variant={mv[5]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Se os verbos do módulo anterior (assistir, aspirar, visar) mudam de regência conforme o sentido, os verbos deste módulo apresentam um desafio diferente: eles têm um <strong>comportamento sintático único e contraintuitivo</strong> que conflita diretamente com o uso coloquial cotidiano. Custar, proceder, querer e chamar são verbos que a maioria dos falantes usa de forma diferente da norma culta — e a CESGRANRIO explora exatamente esse conflito entre o uso espontâneo e o uso gramaticalmente correto para construir suas questões de maior dificuldade.
              </p>
              <p>
                O verbo <strong>CUSTAR</strong> é o caso mais paradigmático de conflito entre língua coloquial e culta. No cotidiano, diz-se "eu custei para entender" ou "ele custou a aceitar", com pessoa humana como sujeito. Na norma culta, custar no sentido de "ser difícil, demorar" é impessoal: o sujeito é sempre a ação, nunca a pessoa. A construção correta é "Custou-me entender" (= foi difícil para mim entender), onde "entender" é o sujeito oracional e "me" é o objeto indireto (dativo) indicando a quem custou. Esta é uma das construções mais testadas pela CESGRANRIO em provas de nível superior.
              </p>
              <p>
                O verbo <strong>PROCEDER</strong> divide-se em dois comportamentos. No sentido de "agir, comportar-se", é intransitivo: "Ele procedeu corretamente" (sem complemento). No sentido de "ter origem, provir", é transitivo indireto e exige "DE": "Ele procede <em>de</em> família tradicional". Quando significa "dar início a um processo ou procedimento", exige "A": "Procederam <em>à</em> análise dos dados". A distinção entre esses três usos é sutil e exatamente por isso aparece em provas de alto nível. O candidato deve ler o contexto com atenção para identificar qual sentido está em jogo antes de aplicar a regra.
              </p>
              <p>
                No ambiente profissional da Petrobras, esses verbos têm usos específicos e formalizados. "Custar" aparece em análises de viabilidade: "Custou caro à empresa a decisão de...". "Proceder" aparece em auditorias e relatórios: "Procedeu-se à verificação das contas" ou "Os dados procedem de fontes primárias certificadas". "Chamar" aparece em comunicados e convocações: "A diretoria chamou atenção para os riscos" (VTD) ou "O relatório chama a atenção dos gestores <em>para</em> a necessidade de..." (complemento com preposição). Dominar esses usos é essencial para redigir e interpretar documentos corporativos com precisão.
              </p>
              <p>
                A CESGRANRIO usa esses verbos para testar a capacidade do candidato de <strong>reconhecer o conflito entre uso popular e uso culto</strong>. As alternativas incorretas geralmente reproduzem construções coloquiais plausíveis — "ele custou a entender", "quero que venha" com preposição inadequada, "chamou-o de burro" vs. "chamou-o burro". A estratégia de prova: ao ver uma das alternativas usando esses verbos sem preposição onde a norma culta exige ou com preposição onde não deve, leia o contexto, identifique o sentido e aplique a regra específica. Nunca generalize: cada sentido tem sua regra própria.
              </p>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border border-violet-200 dark:border-violet-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-violet-900 dark:text-violet-100 text-xl">Regras Rápidas — Verbos de Elite II</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-violet-700 dark:text-violet-300">CUSTAR (ser difícil)</div>
                    <div className="text-red-600 dark:text-red-400">❌ "Custei para entender"</div>
                    <div className="text-green-600 dark:text-green-400">✅ "Custou-me entender"</div>
                    <div className="font-bold text-violet-700 dark:text-violet-300 mt-2">PROCEDER</div>
                    <div className="text-foreground/75">Agir: intransitivo | Provir: DE | Iniciar: A</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-purple-700 dark:text-purple-300">QUERER (desejar → VTD)</div>
                    <div className="text-foreground/75">Quero vê-la (sem preposição)</div>
                    <div className="font-bold text-purple-700 dark:text-purple-300 mt-2">CHAMAR</div>
                    <div className="text-foreground/75">Denominar: VTD → chamou-o ladrão</div>
                    <div className="text-foreground/75">Com DE: "chamou-o de ladrão" (tb. aceito)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="A Lógica do Custar e Proceder"
          variant={mv[5]}
        />
            <Comparison
              title="O Verbo CUSTAR"
              left={{
                title: "Coloquial (Errado)",
                content: "Eu custei a entender a norma.",
                description: "Não admite pessoa como sujeito.",
                variant: "danger",
              }}
              right={{
                title: "Culto (Correto)",
                content: "Custou-me entender a norma.",
                description: "Sujeito é a ação (entender).",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="Macete de PROCEDER">
              Proceder **de** (origem). Proceder **a** (iniciar ação).
              <br /> ✅ "Procederam **ao** embarque imediatamente."
            </AlertBox>
          </section>

          {/* ── CONTEÚDO RICO M5 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Top 10 Verbos Que Confundem Candidatos"
          variant={mv[5]}
        />
            <AlertBox tipo="danger" titulo="Lista Crítica — Decore Antes da Prova">
              Os 10 verbos que mais caem em provas da Cesgranrio/Petrobras:
              <br /><br />
              1. <strong>Obedecer</strong> → VTI (A): "obedecer <strong>às</strong> normas"
              <br />
              2. <strong>Simpatizar</strong> → VTI (COM): "simpatizo <strong>com</strong> a proposta"
              <br />
              3. <strong>Antipatizar</strong> → VTI (COM): "antipatiza <strong>com</strong> o projeto"
              <br />
              4. <strong>Implicar</strong> → VTD (causar): "o erro implica <strong>penalidade</strong>"
              <br />
              5. <strong>Presidir</strong> → VTD: "presidiu <strong>a</strong> reunião"
              <br />
              6. <strong>Perdoar</strong> → pessoa=VTI(A) / coisa=VTD: "perdoei-lhe / perdoei o erro"
              <br />
              7. <strong>Agradar</strong> → satisfazer=VTD / fazer carinho=VTI(A)
              <br />
              8. <strong>Chegar</strong> / <strong>Ir</strong> → destino=VTI(A): "cheguei <strong>ao</strong> porto"
              <br />
              9. <strong>Namorar</strong> → VTD (sem preposição): "namora <strong>a</strong> colega"
              <br />
              10. <strong>Querer</strong> → desejar=VTD / estimar=VTI(A): "quero-lhe bem"
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Pares de Confusão: FlipCards"
          variant={mv[5]}
        />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold">AGRADAR</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="text-emerald-400 font-bold">Dois sentidos, duas regências:</p>
                    <p>✅ <strong>VTD</strong> (satisfazer): "A decisão agradou <strong>os</strong> diretores."</p>
                    <p>✅ <strong>VTI (A)</strong> (fazer carinho): "O gestor agradou <strong>aos</strong> subordinados."</p>
                    <p className="text-amber-400 mt-1">⚠️ O contexto define tudo!</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">CHAMAR</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="text-blue-400 font-bold">Convocar vs Denominar:</p>
                    <p>✅ <strong>VTD</strong> (convocar): "Chamou <strong>o</strong> técnico."</p>
                    <p>✅ <strong>VTD ou VTI (DE/A)</strong> (denominar): "Chamou-o de herói." / "Chamou-lhe herói."</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">PRESIDIR</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="text-teal-400 font-bold">Contexto Petrobras:</p>
                    <p>✅ <strong>VTD</strong>: "O diretor presidiu <strong>a</strong> cerimônia."</p>
                    <p>✅ <strong>VTD</strong>: "Presidiu <strong>a</strong> reunião do conselho."</p>
                    <p className="text-red-400">❌ "Presidiu à reunião" — errado!</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">QUERER</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="text-purple-400 font-bold">Desejar vs Estimar:</p>
                    <p>✅ <strong>VTD</strong> (desejar): "Quero <strong>o</strong> relatório."</p>
                    <p>✅ <strong>VTI (A)</strong> (estimar): "Quero <strong>bem a</strong> minha equipe."</p>
                    <p className="text-lg text-muted-foreground mt-1">Quero-lhe bem = estimo você</p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={QUIZ_M5_REGENCIA}
            titulo="QUIZ: Módulo Nº 5"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          variant={mv[5]}
        />
        </div>
      </TabsContent>

      {/* Módulo 6: Transitividade Bifronte */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Transitividade Bifronte"
            descricao="Pagar, Perdoar e Informar: Um pé na preposição, outro na liberdade."
          variant={mv[6]}
        />

          {/* ★ RICH INTRO M6 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Regra Pessoa/Coisa: O Critério que Determina a Preposição"
              variant={mv[6]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Existem verbos na gramática normativa portuguesa que apresentam o que chamamos de <strong>transitividade bifronte</strong>: conforme o tipo de objeto (pessoa ou coisa), o verbo exige ou dispensa preposição. Pagar, perdoar e informar são os representantes mais conhecidos desse grupo. A lógica subjacente é semântica: quando a ação recai sobre uma coisa (algo impessoal, abstrato, mensurável), o verbo é transitivo direto; quando a ação recai sobre uma pessoa (um ser animado, identificado), o verbo pode ser transitivo indireto, exigindo preposição.
              </p>
              <p>
                Para <strong>PAGAR e PERDOAR</strong>, a regra da norma culta é precisa: o complemento-coisa vai sem preposição (direto), e o complemento-pessoa vai com "A" (indireto). "Paguei o boleto" (coisa → VTD) versus "Paguei ao fornecedor" (pessoa → VTI com A). "Perdoei a dívida" (coisa → VTD) versus "Perdoei ao colega" (pessoa → VTI com A). Na linguagem coloquial, quase todos dizem "paguei o fornecedor" e "perdoei o colega" — sem preposição, mesmo com pessoa. A banca usa exatamente esse conflito entre uso popular e norma culta para montar questões de média e alta dificuldade.
              </p>
              <p>
                O verbo <strong>INFORMAR</strong> tem comportamento ligeiramente diferente: ele é bifronte na direção oposta. Quando o complemento é a pessoa informada, pode ser construído com "A" (VTI) ou com objeto direto (VTD): "Informei o gerente" ou "Informei ao gerente" — ambos aceitos pela norma culta. Quando o complemento é a informação transmitida, geralmente usa "SOBRE" ou "DE": "Informei o gerente <em>sobre</em> o acidente" ou "Informei-o <em>de</em> que haveria reunião". A questão de prova geralmente explora a combinação dos dois complementos: pessoa + conteúdo informado, testando se o candidato sabe qual preposição liga cada elemento.
              </p>
              <p>
                Na Petrobras, esses verbos aparecem rotineiramente em comunicações formais, contratos e relatórios de auditoria. "Pagar ao prestador de serviços" (norma culta em contratos), "perdoar ao devedor" (em instrumentos de quitação de dívida), "informar os acionistas sobre os resultados" (em relatórios financeiros) são construções presentes em documentos de alto nível. Um analista que escreve "paguei o fornecedor" em um parecer jurídico comete um desvio de registro que pode comprometer a credibilidade profissional do texto — mesmo que, semanticamente, a mensagem seja compreensível.
              </p>
              <p>
                A estratégia para questões de transitividade bifronte é simples e eficiente: <strong>primeiro identifique o tipo de complemento</strong> (pessoa ou coisa?), depois aplique a regra correspondente. Se o objeto for claramente uma pessoa (nome próprio, pronome pessoal, cargo específico), use a preposição. Se for claramente uma coisa (valor monetário, serviço, conteúdo abstrato), dispense a preposição. Em casos ambíguos, o contexto sintático e semântico da frase resolverá. Esse método elimina a necessidade de memorizar exceções individuais e permite resolver qualquer variação que a banca apresente.
              </p>
              <div className="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30 border border-cyan-200 dark:border-cyan-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-cyan-900 dark:text-cyan-100 text-xl">Critério Pessoa/Coisa — Mapa Rápido</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-cyan-700 dark:text-cyan-300">PAGAR</div>
                    <div className="text-foreground/75">Coisa (VTD): pagou <em>o boleto</em></div>
                    <div className="text-foreground/75">Pessoa (VTI+A): pagou <em>ao fornecedor</em></div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-sky-700 dark:text-sky-300">PERDOAR</div>
                    <div className="text-foreground/75">Coisa (VTD): perdoou <em>a dívida</em></div>
                    <div className="text-foreground/75">Pessoa (VTI+A): perdoou <em>ao colega</em></div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-blue-700 dark:text-blue-300">INFORMAR</div>
                    <div className="text-foreground/75">Pessoa: informou o/ao gestor</div>
                    <div className="text-foreground/75">Conteúdo: informou sobre/de algo</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Pessoa vs Coisa"
          variant={mv[6]}
        />
            <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 space-y-4">
              <h4 className="font-black text-cyan-600 uppercase tracking-widest text-lg flex items-center gap-2">
                <LuZap className="w-5 h-5" /> Regra de Ouro (Pagar/Perdoar)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-xl border">
                  <span className="text-lg font-bold text-muted-foreground uppercase">
                    Objeto Coisa (VTD)
                  </span>
                  <p className="mt-1 font-medium">Paguei **o boleto**.</p>
                </div>
                <div className="bg-background p-4 rounded-xl border">
                  <span className="text-lg font-bold text-muted-foreground uppercase">
                    Objeto Pessoa (VTI)
                  </span>
                  <p className="mt-1 font-medium">Paguei **ao funcionário**.</p>
                </div>
              </div>
            </div>
            <AlertBox tipo="danger" titulo="PROIBIDÃO">
              Nunca use preposição nos dois objetos do verbo INFORMAR.
              <br /> ❌ "Informamos aos clientes sobre o erro."
              <br /> ✅ "Informamos os clientes sobre o erro." (Alguém de algo)
              <br /> ✅ "Informamos aos clientes o erro." (Algo a alguém)
            </AlertBox>
          </section>

          {/* ── CONTEÚDO RICO M6 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Regra Pessoa/Coisa: Os Verbos Bifrontes Mais Cobrados"
          variant={mv[6]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "PAGAR e PERDOAR: a regra da pessoa vs coisa",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Estes dois verbos seguem a mesma lógica: quando o
                        objeto é uma <strong>coisa</strong>, é direto; quando é
                        uma <strong>pessoa</strong>, é indireto (exige A).
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <h5 className="text-teal-500 font-bold text-lg">PAGAR</h5>
                          <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-lg space-y-1">
                            <p>✅ Paguei <strong>a conta</strong> (coisa = VTD)</p>
                            <p>✅ Paguei <strong>ao fornecedor</strong> (pessoa = VTI)</p>
                            <p className="text-red-400">❌ Paguei a conta ao fornecedor</p>
                            <p className="text-emerald-400">✅ Paguei a conta para o fornecedor</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-cyan-500 font-bold text-lg">PERDOAR</h5>
                          <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/10 text-lg space-y-1">
                            <p>✅ Perdoei <strong>o erro</strong> (coisa = VTD)</p>
                            <p>✅ Perdoei <strong>ao colega</strong> (pessoa = VTI)</p>
                            <p className="text-muted-foreground">Perdoo-lhe = perdoo a você</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "ENSINAR e PERGUNTAR: dois objetos ao mesmo tempo",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Alguns verbos aceitam dois complementos ao mesmo
                        tempo: um direto (a coisa ensinada/perguntada) e um
                        indireto (a pessoa).
                      </p>
                      <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20 text-lg space-y-2">
                        <p>✅ "O supervisor ensinou <strong>os procedimentos</strong> (VTD) <strong>aos</strong> novatos (VTI)."</p>
                        <p>✅ "Perguntou <strong>o prazo</strong> (VTD) <strong>ao</strong> gerente (VTI)."</p>
                        <p className="text-muted-foreground text-lg mt-2">
                          Regra: a coisa sempre é VTD; a pessoa sempre é VTI (A).
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-amber-600"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Implicar em: o erro mais famoso"
          variant={mv[6]}
        />
            <Comparison
              title="IMPLICAR no sentido de 'causar/acarretar'"
              left={{
                title: "❌ Erro Clássico",
                content: "O acidente implica em paralisação.",
                description: "\"Implicar em\" é ERRADO no sentido de acarretar.",
                variant: "danger",
              }}
              right={{
                title: "✅ Forma Correta",
                content: "O acidente implica paralisação.",
                description: "No sentido de 'acarretar/causar', IMPLICAR é VTD — sem preposição.",
                variant: "success",
              }}
            />
            <AlertBox tipo="warning" titulo="IMPLICAR tem dois sentidos — atenção!">
              <strong>Causar/Acarretar</strong>: VTD — sem preposição.
              <br />
              ✅ "O corte de verba implica atraso no projeto."
              <br /><br />
              <strong>Ter implicância/antipatia</strong>: VTI (COM) — com preposição.
              <br />
              ✅ "O fiscal implica <strong>com</strong> pequenos erros."
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M6_REGENCIA}
            titulo="QUIZ: Módulo Nº 6"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          variant={mv[6]}
        />
        </div>
      </TabsContent>

      {/* Módulo 7: Movimento e Pronominais */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Movimento e Pronominais"
            descricao="Ir, Chegar e a saga dos verbos que 'se esquecem' ou 'lembram'."
          variant={mv[7]}
        />

          {/* ★ RICH INTRO M7 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Ir e Chegar: A Batalha entre 'A' e 'EM' que Define Aprovações"
              variant={mv[7]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Os verbos de movimento — ir, chegar, voltar, retornar, dirigir-se — formam um grupo sintático especial na gramática normativa portuguesa: eles exigem a preposição <strong>"A"</strong> (não "EM") para introduzir o destino. A regra é fundamentada na distinção clássica entre dois tipos de complemento locativo: <em>lugar onde se está</em> (usa "EM": "Estou <em>em</em> casa") e <em>lugar para onde se vai</em> (usa "A": "Cheguei <em>a</em> casa"). A preposição "A" indica direcionamento e chegada; "EM" indica permanência e localização estática. Confundir as duas é um dos erros mais frequentes tanto na língua coloquial quanto nas provas de concurso.
              </p>
              <p>
                O verbo <strong>CHEGAR</strong> é o ponto mais crítico desse conjunto. Na linguagem coloquial brasileira, "cheguei em casa" é quase universal — mas é um desvio da norma culta. A construção correta é "cheguei <em>a</em> casa" ou, com artigo, "cheguei <em>à</em> escola" (crase obrigatória com substantivos femininos que admitem artigo). O mesmo raciocínio se aplica a "ir": "fui <em>ao</em> trabalho" (correto) vs. "fui no trabalho" (coloquial). A CESGRANRIO explora essa distinção com frequência, apresentando frases em que "EM" está no lugar de "A" como erro a ser identificado ou corrigido.
              </p>
              <p>
                O segundo grande tema deste módulo são os <strong>verbos pronominais de cognição e memória</strong>: lembrar/esquecer e suas formas com pronome reflexivo. O comportamento desses verbos é diretamente oposto dependendo da presença do pronome: "Lembro o fato" (VTD, sem preposição) vs. "Lembro-me do fato" (VTI com DE, com pronome). "Esqueci a senha" (VTD) vs. "Esqueci-me da reunião" (VTI com DE). A regra é simples: sem pronome = transitivo direto (sem preposição); com pronome reflexivo (me/te/se/nos/vos) = transitivo indireto com DE. A banca usa as duas formas para testar se o candidato percebe a diferença de construção.
              </p>
              <p>
                No contexto operacional da Petrobras, esses usos aparecem em comunicações formais e documentos de viagem corporativa. "O representante foi <em>à</em> sede da ANP" (não "foi na sede"), "a equipe chegou <em>ao</em> campo de exploração" (não "chegou no campo"), "o gerente lembrou-se <em>dos</em> procedimentos de segurança" (não "lembrou dos") são construções que diferem o texto técnico-formal do texto coloquial. Em laudos periciais, atas de reunião e comunicados institucionais, essas preposições precisam estar corretas para que o documento tenha o nível de formalidade exigido.
              </p>
              <p>
                Para resolver questões sobre verbos de movimento e pronominais, use o seguinte protocolo de prova: <strong>primeiro verifique se há pronome reflexivo</strong> — se sim, espere preposição no complemento; <strong>depois identifique se o verbo indica movimento/destino</strong> — se sim, use "A" ou "PARA" (nunca "EM"); <strong>por último, verifique a necessidade de crase</strong> — quando "A" precede substantivo feminino com artigo, a crase é obrigatória ("à escola", "ao mercado" não tem crase porque "ao" já é a fusão de "a + o"). Esse protocolo resolve 95% das questões envolvendo esses verbos.
              </p>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-amber-900 dark:text-amber-100 text-xl">Resumo: Movimento e Pronominais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-amber-700 dark:text-amber-300">Verbos de Movimento (destino → A)</div>
                    <div className="text-red-600 dark:text-red-400">❌ Fui no mercado / cheguei em casa</div>
                    <div className="text-green-600 dark:text-green-400">✅ Fui ao mercado / cheguei a casa</div>
                    <div className="text-foreground/75 text-xs mt-1">"EM" só para permanência: "Estou em casa"</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-yellow-700 dark:text-yellow-300">Lembrar/Esquecer</div>
                    <div className="text-foreground/75">Sem pronome (VTD): lembrou a data</div>
                    <div className="text-foreground/75">Com pronome (VTI + DE): lembrou-se da data</div>
                    <div className="text-foreground/75">Sem pronome (VTD): esqueceu a senha</div>
                    <div className="text-foreground/75">Com pronome (VTI + DE): esqueceu-se da senha</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="A Preposição 'A' no Movimento"
          variant={mv[7]}
        />
            <AlertBox tipo="warning" titulo="O Erro do 'EM'">
              Na norma culta, quem vai, vai **A** algum lugar. O uso do **EM** é
              coloquialismo.
              <br /> ❌ "Cheguei em casa tarde."
              <br /> ✅ "Cheguei **a** casa tarde."
            </AlertBox>
            <div className="grid gap-4 md:grid-cols-2">
              <FlipCard
                frente="Lembrar algo"
                verso="✅ VTD: 'Lembrei o compromisso.' (Sem pronome, sem preposição)"
              />
              <FlipCard
                frente="Lembrar-SE de algo"
                verso="✅ VTI: 'Lembrei-me do compromisso.' (Com pronome, exige preposição!)"
              />
            </div>
          </section>

          {/* ── CONTEÚDO RICO M7 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Ir A vs Ir PARA vs Ir EM"
          variant={mv[7]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "A distinção de IR A / IR PARA",
                  icone: <LuArrowRight />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Na norma culta, a preposição que acompanha verbos de
                        movimento (<em>ir, chegar, voltar, regressar</em>) tem
                        regras precisas:
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-lg">
                          <span className="font-bold text-amber-500 block mb-1">IR A</span>
                          Indica movimento com intenção de retorno.
                          <br />
                          ✅ "Fui <strong>ao</strong> escritório pela manhã." (e voltei)
                          <br />
                          ✅ "Vou <strong>à</strong> reunião agora."
                        </div>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20 text-lg">
                          <span className="font-bold text-orange-500 block mb-1">IR PARA</span>
                          Indica movimento com intenção de permanência.
                          <br />
                          ✅ "Foi <strong>para</strong> a plataforma por 30 dias."
                          <br />
                          ✅ "Mudou-se <strong>para</strong> o Rio de Janeiro."
                        </div>
                      </div>
                      <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20 text-lg">
                        <span className="font-bold text-red-400">IR EM</span> — ERRADO na norma culta escrita!
                        <br />
                        ❌ <span className="line-through opacity-60">"Fui em São Paulo semana passada."</span>
                        <br />
                        ✅ "Fui <strong>a</strong> São Paulo semana passada."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Verbos pronominais: regência muda com o SE",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Quando o verbo se pronominaliza (recebe SE, ME, TE),
                        geralmente muda de transitivo direto para indireto —
                        e exige preposição:
                      </p>
                      <div className="grid gap-2 text-lg">
                        {[
                          { sem: "Lembrar (VTD)", com: "Lembrar-se DE (VTI)", ex: "Lembrou o relatório → Lembrou-se do relatório" },
                          { sem: "Esquecer (VTD)", com: "Esquecer-se DE (VTI)", ex: "Esqueceu a senha → Esqueceu-se da senha" },
                          { sem: "Queixar (raro)", com: "Queixar-se DE (VTI)", ex: "Queixou-se do barulho" },
                          { sem: "Orgulhar (raro)", com: "Orgulhar-se DE (VTI)", ex: "Orgulhou-se do resultado" },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10"
                          >
                            <div className="flex items-center gap-2 text-lg font-bold mb-1">
                              <span className="text-muted-foreground">{item.sem}</span>
                              <LuArrowRight className="w-3 h-3" />
                              <span className="text-amber-400">{item.com}</span>
                            </div>
                            <p className="text-lg text-muted-foreground italic">{item.ex}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-blue-600"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação: Chegar A vs Chegar EM"
          variant={mv[7]}
        />
            <Comparison
              title="Verbos de Chegada na Norma Culta"
              left={{
                title: "❌ Coloquial",
                content: "O técnico chegou em Macaé ontem.",
                description: "Uso de EM com verbo de chegada é coloquialismo.",
                variant: "danger",
              }}
              right={{
                title: "✅ Norma Culta",
                content: "O técnico chegou a Macaé ontem.",
                description: "Chegar exige A (ou À com artigo feminino) para indicar destino.",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="Casa é exceção especial">
              Com o substantivo <strong>casa</strong> (sem artigo), não há
              crase e não há preposição alternativa:
              <br />
              ✅ "Cheguei <strong>a</strong> casa." (sem artigo = sem crase)
              <br />
              ✅ "Cheguei <strong>à</strong> casa de Pedro." (com artigo = com crase)
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M7_REGENCIA}
            titulo="QUIZ: Módulo Nº 7"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          variant={mv[7]}
        />
        </div>
      </TabsContent>

      {/* Módulo 8: Peculiaridades Cesgranrio */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Peculiaridades Cesgranrio"
            descricao="Implicar, Preferir e Aludir: Detalhes técnicos que o manual do Petrobras exige."
          variant={mv[8]}
        />

          {/* ★ RICH INTRO M8 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Os Verbos que a CESGRANRIO Mais Ama: Implicar, Preferir, Aludir e Outros"
              variant={mv[8]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Além dos verbos já estudados nos módulos anteriores, existe um grupo de verbos que a CESGRANRIO eleva à categoria de "armadilha de elite" — verbos cujo uso incorreto é tão disseminado na linguagem coloquial que parece natural mesmo para falantes instruídos. Implicar, preferir, aludir, referir-se, obedecer e simpatizar formam esse grupo de <strong>peculiaridades de alta frequência</strong> nas provas de concurso público de nível superior. Dominar esses verbos significa garantir pontos que a maioria dos candidatos perde por confiança excessiva no instinto linguístico.
              </p>
              <p>
                O verbo <strong>IMPLICAR</strong> é provavelmente o mais explorado pela banca. No sentido de "acarretar, causar, ter como consequência", é transitivo direto — sem preposição: "A decisão implica <em>riscos</em> financeiros" (nunca "implica em riscos"). O uso com "EM" é um hipercorrecionismo coloquial extremamente comum, mas gramaticalmente equivocado na norma culta. No sentido de "comprometer alguém, envolver em culpa", também é transitivo direto: "A investigação implicou o diretor". Apenas no sentido de "ser implicante, irritar-se" (sentido informal) pode ser intransitivo ou construído com "COM": "Ele implica com tudo".
              </p>
              <p>
                O verbo <strong>PREFERIR</strong> apresenta uma peculiaridade sintática crucial: na norma culta, exprime preferência sem o advérbio de comparação "mais". A construção "prefiro A <em>a</em> B" usa a preposição "A" para introduzir o segundo termo da comparação — nunca "do que". "Prefiro relatórios objetivos <em>a</em> textos prolixos" (correto) vs. "prefiro relatórios do que textos" (coloquial, não aceito pela banca). A CESGRANRIO frequentemente apresenta a versão com "do que" como alternativa tentadora, e o candidato despreparado a marca sem perceber o erro de regência comparativa.
              </p>
              <p>
                <strong>ALUDIR, REFERIR-SE</strong> e <strong>OBEDECER</strong> completam o grupo. Aludir significa "fazer referência indireta" e exige "A": "O relatório alude <em>ao</em> problema" (nunca "alude o problema"). Referir-se também exige "A": "O documento se refere <em>às</em> metas" (com crase obrigatória com feminino). Obedecer exige "A": "Obedecemos <em>à</em> norma técnica" (nunca "obedecemos a norma" sem crase quando o substantivo é feminino com artigo). Esses três verbos são transitivos indiretos sem exceção — qualquer construção sem preposição é erro de regência.
              </p>
              <p>
                No contexto da Petrobras, esses verbos aparecem em documentos normativos, relatórios de compliance e pareceres jurídicos. "A nova política implica mudanças no processo operacional" (sem "em"), "a empresa prefere fornecedores certificados <em>a</em> não certificados", "o procedimento obedece <em>às</em> normas da ANP", "o relatório alude <em>aos</em> incidentes do trimestre anterior" — construções que o candidato aprovado escreve e lê com total segurança. A estratégia de prova para esse módulo: para cada um desses verbos, memorize o comportamento-padrão (VTD sem preposição para implicar/causar; VTI com A para os demais) e desconfie sempre de alternativas que colocam ou omitem preposições contrariando esse padrão.
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-100 text-xl">Verbos Peculiares — Gabarito Rápido</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">IMPLICAR (causar)</div>
                    <div className="text-red-600 dark:text-red-400">❌ implica em riscos</div>
                    <div className="text-green-600 dark:text-green-400">✅ implica riscos (VTD)</div>
                    <div className="font-bold text-emerald-700 dark:text-emerald-300 mt-2">PREFERIR</div>
                    <div className="text-red-600 dark:text-red-400">❌ prefiro A do que B</div>
                    <div className="text-green-600 dark:text-green-400">✅ prefiro A a B</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-green-700 dark:text-green-300">ALUDIR / REFERIR-SE / OBEDECER</div>
                    <div className="text-foreground/75">Todos exigem preposição A:</div>
                    <div className="text-green-600 dark:text-green-400">✅ alude ao tema</div>
                    <div className="text-green-600 dark:text-green-400">✅ refere-se às normas</div>
                    <div className="text-green-600 dark:text-green-400">✅ obedece à regulamentação</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Dossiê IMPLICAR"
          variant={mv[8]}
        />
            <p className="text-muted-foreground leading-relaxed">
              O verbo **IMPLICAR** é o maior gerador de erros na regência verbal
              de concursos. No sentido de "causar" ou "acarretar", ele é
              estritamente **Direto**.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <h6 className="text-red-500 font-bold flex items-center gap-2 mb-2">
                  <LuCircleX /> Incorreto
                </h6>
                <p className="line-through opacity-60">
                  "O atraso implica em multa."
                </p>
              </div>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <h6 className="text-emerald-500 font-bold flex items-center gap-2 mb-2">
                  <LuCircleCheck /> Correto
                </h6>
                <p>"O atraso implica multa."</p>
              </div>
            </div>
            <AlertBox tipo="danger" titulo="Preferir e Aludir">
              Preferir: Não use "antes" nem "do que". Use apenas **A**.
              <br /> Aludir: Exige preposição **A**.
            </AlertBox>
          </section>

          {/* ── CONTEÚDO RICO M8 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Peculiaridades que a Cesgranrio Adora"
          variant={mv[8]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "PREFERIR: o mais maltratado",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        O verbo <strong>PREFERIR</strong> é transitivo direto e
                        indireto. O complemento preferido é VTD; o preterido
                        vem com preposição A. Nunca use "do que" ou "antes".
                      </p>
                      <div className="space-y-2 text-lg">
                        <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                          ❌ <span className="line-through opacity-70">"Prefiro café do que chá."</span>
                        </div>
                        <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                          ❌ <span className="line-through opacity-70">"Prefiro muito mais café."</span>
                          <span className="text-lg text-muted-foreground ml-2">(pleonasmo vicioso)</span>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                          ✅ "Prefiro café <strong>a</strong> chá."
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                          ✅ "Prefiro trabalhar <strong>a</strong> ficar ocioso."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "ALUDIR, REFERIR-SE e REPORTAR-SE",
                  icone: <LuMessageCircle />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Estes três verbos são muito usados em textos formais e
                        relatórios técnicos da Petrobras. Todos exigem
                        preposição <strong>A</strong>.
                      </p>
                      <div className="grid gap-2 text-lg">
                        <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
                          <span className="font-bold text-orange-400">ALUDIR A</span>
                          <br />
                          ✅ "O engenheiro aludiu <strong>ao</strong> problema estrutural."
                          <br />
                          ❌ <span className="line-through opacity-60">"Aludiu sobre o problema."</span>
                        </div>
                        <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                          <span className="font-bold text-amber-400">REFERIR-SE A</span>
                          <br />
                          ✅ "O documento refere-se <strong>às</strong> normas ISO."
                          <br />
                          ❌ <span className="line-through opacity-60">"Refere-se sobre as normas."</span>
                        </div>
                        <div className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                          <span className="font-bold text-yellow-400">REPORTAR-SE A</span>
                          <br />
                          ✅ "O técnico reportou-se <strong>ao</strong> supervisor imediato."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "DE vs EM: verbos que geram dúvida",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Alguns verbos oscilam entre DE e EM na linguagem
                        coloquial. A gramática normativa é clara:
                      </p>
                      <div className="grid gap-2 text-lg">
                        {[
                          { verbo: "Precisar", prep: "DE", ex: "precisar de aprovação", errado: "precisar em" },
                          { verbo: "Carecer", prep: "DE", ex: "carecer de recursos", errado: "carecer em" },
                          { verbo: "Necessitar", prep: "DE", ex: "necessitar de treinamento", errado: "necessitar em" },
                          { verbo: "Depender", prep: "DE", ex: "depender da diretoria", errado: "depender em" },
                          { verbo: "Gostar", prep: "DE", ex: "gostar de trabalhar", errado: "gostar em" },
                        ].map((item) => (
                          <div key={item.verbo} className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold">{item.verbo}</span>
                              <span className="text-amber-400 font-mono text-lg font-bold">{item.prep}</span>
                            </div>
                            <p className="text-lg">✅ {item.ex}</p>
                            <p className="text-lg text-red-400">❌ <span className="line-through opacity-70">{item.errado}</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-emerald-600"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="FlipCards: Precisar, Carecer e Necessitar"
          variant={mv[8]}
        />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FlipCard
                frente={<div className="font-bold">PRECISAR</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="text-orange-400 font-bold">Preposição: DE</p>
                    <p>✅ "A operação precisa <strong>de</strong> autorização."</p>
                    <p>✅ "Precisamos <strong>de</strong> mais tempo."</p>
                    <p className="text-red-400">❌ "Precisa em autorização" — errado!</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">CARECER</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="text-amber-400 font-bold">Preposição: DE</p>
                    <p>✅ "O projeto carece <strong>de</strong> revisão técnica."</p>
                    <p>✅ "A proposta carece <strong>de</strong> embasamento."</p>
                    <p className="text-muted-foreground text-lg mt-1">Sinônimo formal de "precisar"</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">NECESSITAR</div>}
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="text-yellow-400 font-bold">Preposição: DE</p>
                    <p>✅ "A planta necessita <strong>de</strong> manutenção preventiva."</p>
                    <p>✅ "Todos necessitam <strong>de</strong> treinamento."</p>
                    <p className="text-muted-foreground text-lg mt-1">Uso formal muito frequente na Petrobras</p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={QUIZ_M8_REGENCIA}
            titulo="QUIZ: Módulo Nº 8"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          variant={mv[8]}
        />
        </div>
      </TabsContent>

      {/* Módulo 9: Regência e Relativos */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Regência e Relativos"
            descricao="Onde a preposição viaja para antes do QUE, QUEM ou CUJO."
          variant={mv[9]}
        />

          {/* ★ RICH INTRO M9 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Preposição Viajante: Como a Regência Comanda os Pronomes Relativos"
              variant={mv[9]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                A interseção entre regência verbal e pronomes relativos produz uma das construções mais elegantes — e mais cobradas — da gramática normativa: a <strong>"preposição viajante"</strong>. O princípio é simples mas poderoso: quando um verbo dentro de uma oração relativa exige preposição, essa preposição não fica junto ao verbo — ela "viaja" para antes do pronome relativo que introduz a oração. O candidato que desconhece esse mecanismo produz frases incompletas ou agramaticais sem perceber; o candidato que o domina identifica imediatamente onde está o erro nas alternativas da banca.
              </p>
              <p>
                A mecânica funciona assim: identifique o verbo da oração relativa e sua regência. Se o verbo exige preposição, essa preposição precede o pronome relativo (QUE, QUEM, QUAL, ONDE). Exemplo com o verbo "referir-se" (VTI exigindo "A"): "Estes são os dados <em>a que</em> me referi" (correto) vs. "estes são os dados <em>que</em> me referi" (incorreto — falta a preposição). Exemplo com "gostar" (VTI exigindo "DE"): "A proposta <em>de que</em> mais gostamos" (correto) vs. "a proposta <em>que</em> mais gostamos" (incorreto). O pronome relativo funciona como um "veículo" que carrega a preposição em sua frente.
              </p>
              <p>
                Com o pronome relativo <strong>QUEM</strong>, a preposição é ainda mais obrigatória, pois "quem" só pode ser objeto indireto, objeto de preposição ou agente da passiva — nunca objeto direto. "O engenheiro <em>com quem</em> trabalhei" (VTI com COM: trabalhar com alguém) vs. "o engenheiro <em>quem</em> trabalhei" (agramatical). "A gestora <em>a quem</em> reportei o problema" (VTI com A: reportar a alguém). Nas questões da CESGRANRIO, as alternativas incorretas frequentemente omitem a preposição antes de "quem", e o candidato treinado reconhece o erro em segundos.
              </p>
              <p>
                No texto corporativo da Petrobras, a regência com pronomes relativos aparece em toda frase que usa "que", "quem" ou "qual" para expandir informações: "o projeto <em>a que</em> nos referimos", "o fornecedor <em>com quem</em> firmamos contrato", "o procedimento <em>ao qual</em> se obedece", "a norma <em>de que</em> tratamos". Documentos jurídicos, contratos e relatórios técnicos de alto nível são construídos com essas estruturas com frequência — e um profissional que omite preposições nessas construções demonstra imprecisão gramatical que compromete a credibilidade do documento e de seu autor.
              </p>
              <p>
                Para resolver questões de regência com relativos, siga este protocolo de 3 passos: <strong>(1) identifique o pronome relativo</strong> (que, quem, qual, onde, cujo); <strong>(2) localize o verbo dentro da oração relativa</strong> e determine sua regência (qual preposição ele exige, se alguma?); <strong>(3) verifique se a preposição exigida está presente antes do pronome relativo</strong> — se o verbo é transitivo indireto e a preposição está ausente, a frase está errada. Esse protocolo funciona para qualquer verbo, seja em questões de identificação de erro, reescrita ou completude de lacuna.
              </p>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-rose-900 dark:text-rose-100 text-xl">Regência + Relativos: Casos de Alta Frequência</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-rose-700 dark:text-rose-300">Com verbo exigindo A:</div>
                    <div className="text-foreground/75">"os dados <em>a que</em> me refiro"</div>
                    <div className="text-foreground/75">"o cargo <em>a que</em> aspira"</div>
                    <div className="text-foreground/75">"a reunião <em>à qual</em> assisti"</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-2">
                    <div className="font-bold text-pink-700 dark:text-pink-300">Com verbo exigindo DE ou COM:</div>
                    <div className="text-foreground/75">"a proposta <em>de que</em> gostamos"</div>
                    <div className="text-foreground/75">"o colega <em>com quem</em> trabalhei"</div>
                    <div className="text-foreground/75">"o tema <em>sobre o qual</em> dissertamos"</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="A Preposição Viajante"
          variant={mv[9]}
        />
            <p className="text-muted-foreground text-lg">
              A regra é: olhe para o verbo que vem DEPOIS do pronome. Se ele
              exigir preposição, ela deve ser jogada para ANTES do pronome.
            </p>
            <Comparison
              title="O Pulo do Gato"
              left={{
                title: "Incompleto",
                content: "Estes são os poços **que** referi.",
                description: "Falta a preposição do verbo 'referir-se'.",
                variant: "danger",
              }}
              right={{
                title: "Norma Culta",
                content: "Estes são os poços **a que** me referi.",
                description: "Quem se refere, se refere A algo.",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="Pronome CUJO">
              O 'Cujo' também deve herdar a preposição.
              <br /> 🏗️ "Esta é a empresa **em cujas** diretrizes confio."
              (Confio EM)
            </AlertBox>
          </section>

          {/* ── CONTEÚDO RICO M9 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Linguagem Petrobras: Verbos em Textos Técnicos"
          variant={mv[9]}
        />
            <AlertBox tipo="info" titulo="Verbos Formais da Redação Oficial Petrobras">
              Em documentos técnicos, relatórios e atas da Petrobras, estes
              verbos aparecem com frequência — e sempre com regência específica:
              <br /><br />
              ✅ <strong>Propor</strong> algo (VTD): "propor medidas"
              <br />
              ✅ <strong>Referir-se a</strong> (VTI): "o relatório refere-se <strong>às</strong> metas"
              <br />
              ✅ <strong>Presidir</strong> algo (VTD): "presidiu <strong>a</strong> reunião"
              <br />
              ✅ <strong>Submeter-se a</strong> (VTI): "submeteu-se <strong>à</strong> auditoria"
              <br />
              ✅ <strong>Ater-se a</strong> (VTI): "atenha-se <strong>ao</strong> protocolo"
              <br />
              ✅ <strong>Opor-se a</strong> (VTI): "opôs-se <strong>à</strong> proposta"
            </AlertBox>
            <ContentAccordion
              slides={[
                {
                  titulo: "Como a Regência aparece em questões com pronome relativo",
                  icone: <LuFileText />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        A Cesgranrio gosta de inserir pronomes relativos (que,
                        quem, o qual) para verificar se o candidato mantém a
                        preposição correta do verbo:
                      </p>
                      <div className="space-y-3 text-lg">
                        <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/10">
                          <span className="font-bold text-purple-400">Verbo CONFIAR EM</span>
                          <br />
                          ✅ "Este é o gestor <strong>em quem</strong> confio."
                          <br />
                          ❌ <span className="line-through opacity-60">"Este é o gestor que confio."</span>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                          <span className="font-bold text-indigo-400">Verbo DEPENDER DE</span>
                          <br />
                          ✅ "Esta é a decisão <strong>de que</strong> dependo."
                          <br />
                          ❌ <span className="line-through opacity-60">"Esta é a decisão que dependo."</span>
                        </div>
                        <div className="p-3 bg-violet-500/5 rounded-lg border border-violet-500/10">
                          <span className="font-bold text-violet-400">Verbo ASPIRAR A</span>
                          <br />
                          ✅ "Este é o cargo <strong>a que</strong> aspiro."
                          <br />
                          ❌ <span className="line-through opacity-60">"Este é o cargo que aspiro."</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regência na redação técnica: armadilhas de prova",
                  icone: <LuShield />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Em questões de reescrita e adequação de linguagem
                        técnica, a Cesgranrio verifica se o candidato sabe
                        usar a regência correta em contexto formal:
                      </p>
                      <div className="space-y-3 text-lg">
                        <div className="p-3 bg-slate-500/5 rounded-lg border border-slate-500/10">
                          <p className="text-muted-foreground text-lg mb-1">ANTES (inadequado):</p>
                          <p className="italic">"O sistema que nos referimos apresenta falhas."</p>
                          <p className="text-muted-foreground text-lg mt-2 mb-1">DEPOIS (correto):</p>
                          <p className="italic text-emerald-400">"O sistema <strong>a que</strong> nos referimos apresenta falhas."</p>
                        </div>
                        <div className="p-3 bg-slate-500/5 rounded-lg border border-slate-500/10">
                          <p className="text-muted-foreground text-lg mb-1">ANTES (inadequado):</p>
                          <p className="italic">"A norma que procedemos foi aprovada."</p>
                          <p className="text-muted-foreground text-lg mt-2 mb-1">DEPOIS (correto):</p>
                          <p className="italic text-emerald-400">"A norma <strong>a que</strong> procedemos foi aprovada."</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-rose-600"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="CardCarousel: Pronomes Relativos com Preposição"
          variant={mv[9]}
        />
            <CardCarousel
              cards={[
                {
                  icone: "🔗",
                  title: "A QUE / AO QUE",
                  descricao: "Verbo exige A: 'assisti a' → 'o filme a que assisti'.",
                },
                {
                  icone: "🔗",
                  title: "DE QUE / DO QUE",
                  descricao: "Verbo exige DE: 'precisar de' → 'o apoio de que precisamos'.",
                },
                {
                  icone: "🔗",
                  title: "EM QUE / NO QUE",
                  descricao: "Verbo exige EM: 'confiar em' → 'o gestor em quem confio'.",
                },
                {
                  icone: "🔗",
                  title: "COM QUE",
                  descricao: "Verbo exige COM: 'contar com' → 'a equipe com que contamos'.",
                },
                {
                  icone: "🔗",
                  title: "POR QUE / PELO QUE",
                  descricao: "Verbo exige POR: 'optar por' → 'a solução pela qual optamos'.",
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={QUIZ_M9_REGENCIA}
            titulo="QUIZ: Módulo Nº 9"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          variant={mv[9]}
        />
        </div>
      </TabsContent>

      {/* Módulo 10: Simulado Final */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Final"
            descricao="Teste seu domínio perante uma bateria definitiva focada em Regência Global Cesgranrio."
          variant={mv[10]}
        />

          {/* ★ RICH INTRO M10 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Simulado Mestre: Como a CESGRANRIO Monta Questões de Regência"
              variant={mv[10]}
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
              <p>
                Este módulo final consolida todas as regras de regência estudadas nos nove módulos anteriores e as aplica no formato exato utilizado pela CESGRANRIO em provas reais. Antes de iniciar o simulado, é essencial compreender como a banca <strong>estrutura suas questões de regência</strong>: raramente ela testa apenas uma regra isolada. As questões de maior nível cobram a interação de dois ou três fenômenos — por exemplo, regência verbal + pronome relativo + crase, ou transitividade bifronte + concordância verbal. O candidato que só memorizou regras isoladas trava nessas questões integradas; o candidato que compreende o sistema gramatical resolve com fluidez.
              </p>
              <p>
                A CESGRANRIO usa quatro formatos principais para questões de regência: <strong>(1) Identificação de erro</strong> — "Assinale a alternativa que apresenta erro de regência". O erro geralmente está em uma preposição ausente onde deve existir (verbos VTI usados como VTD) ou presente onde não deve (verbos VTD usados com preposição). <strong>(2) Reescrita equivalente</strong> — "Assinale a reescrita que preserva sentido e correção gramatical". Aqui a banca testa se o candidato consegue reconhecer construções sintaticamente diferentes mas semanticamente equivalentes. <strong>(3) Completude de lacuna</strong> — "Assinale a preposição que preenche corretamente as lacunas". Pode exigir a mesma preposição para dois contextos ou preposições diferentes. <strong>(4) Análise de construção</strong> — "A frase X está correta porque..." ou "O que justifica o uso de [preposição] é...".
              </p>
              <p>
                As armadilhas mais frequentes nas questões da CESGRANRIO seguem padrões identificáveis. A mais comum é a <strong>troca de VTI por VTD</strong>: "aspirou o cargo" (errado) vs. "aspirou ao cargo" (correto). A segunda mais comum é a <strong>omissão de preposição antes de pronome relativo</strong>: "o projeto que me refiro" (errado) vs. "o projeto a que me refiro" (correto). A terceira é a <strong>substituição de "A" por "EM"</strong> em verbos de movimento: "cheguei no escritório" (coloquial) vs. "cheguei ao escritório" (correto). A quarta é o uso de "mais do que" com "preferir": "prefiro A mais do que B" (errado) vs. "prefiro A a B" (correto). Reconhecer esses padrões permite resolver questões sem precisar analisar cada alternativa do zero.
              </p>
              <p>
                Na reta final de preparação para a Petrobras, o estudo de regência deve ser feito em dois eixos simultâneos: <strong>produção ativa</strong> (escrever frases usando os verbos estudados com as preposições corretas, sem consultar material) e <strong>reconhecimento passivo</strong> (identificar o erro em frases prontas). O eixo de produção é mais difícil e mais eficaz — obriga o cérebro a acessar a regra e aplicá-la ativamente, consolidando a aprendizagem de forma mais profunda. O eixo de reconhecimento treina a velocidade de identificação, crucial em provas com tempo limitado. Combine os dois para chegar ao simulado com máxima confiança.
              </p>
              <p>
                O candidato que chega ao Módulo 10 com domínio real de regência possui uma vantagem competitiva concreta: a regência responde por <strong>15% a 25% das questões de língua portuguesa</strong> nas provas da Petrobras/CESGRANRIO. Um candidato que acerta todas as questões de regência enquanto a média acerta apenas 60% ganha pontos que, em concursos de alta concorrência, podem ser a diferença entre aprovação e reprovação. Este simulado foi calibrado para simular exatamente o nível de dificuldade e o estilo de questão da banca. Faça-o com atenção, revise cada erro e compreenda o princípio por trás de cada resposta.
              </p>
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 space-y-4">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-100 text-xl">Checklist Final de Regência</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-1">
                    <div className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Verbos VTI com A:</div>
                    <div className="text-foreground/75">✓ assistir (ver), aspirar (desejar), visar (objetivar)</div>
                    <div className="text-foreground/75">✓ ir, chegar, voltar (destino)</div>
                    <div className="text-foreground/75">✓ aludir, referir-se, obedecer</div>
                    <div className="text-foreground/75">✓ pagar/perdoar (pessoa)</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-lg p-3 space-y-1">
                    <div className="font-semibold text-violet-700 dark:text-violet-300 mb-2">Verbos VTD (sem preposição):</div>
                    <div className="text-foreground/75">✓ assistir (ajudar), aspirar (inalar), visar (assinar)</div>
                    <div className="text-foreground/75">✓ implicar (causar/acarretar)</div>
                    <div className="text-foreground/75">✓ pagar/perdoar (coisa)</div>
                    <div className="text-foreground/75">✓ lembrar/esquecer (sem pronome)</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CONTEÚDO RICO M10 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Mapa Mental: Todas as Regras de Regência"
          variant={mv[10]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Regência Verbal: resumo completo",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Consolide todas as regras de regência verbal em um
                        único bloco de revisão:
                      </p>
                      <div className="grid gap-2 text-lg">
                        {[
                          { verbo: "Assistir (ver)", regencia: "VTI — A", ex: "Assisti ao documentário" },
                          { verbo: "Assistir (ajudar)", regencia: "VTD", ex: "Assistiu os feridos" },
                          { verbo: "Aspirar (inalar)", regencia: "VTD", ex: "Aspirou o gás" },
                          { verbo: "Aspirar (desejar)", regencia: "VTI — A", ex: "Aspira ao cargo" },
                          { verbo: "Visar (rubricar)", regencia: "VTD", ex: "Visou o cheque" },
                          { verbo: "Visar (objetivar)", regencia: "VTI — A", ex: "Visa ao lucro" },
                          { verbo: "Implicar (causar)", regencia: "VTD", ex: "Implica multa" },
                          { verbo: "Implicar (antipatia)", regencia: "VTI — COM", ex: "Implica com tudo" },
                          { verbo: "Obedecer", regencia: "VTI — A", ex: "Obedeceu às normas" },
                          { verbo: "Pagar (coisa)", regencia: "VTD", ex: "Pagou a conta" },
                          { verbo: "Pagar (pessoa)", regencia: "VTI — A", ex: "Pagou ao funcionário" },
                          { verbo: "Preferir", regencia: "VTD + VTI — A", ex: "Prefere café a chá" },
                          { verbo: "Presidir", regencia: "VTD", ex: "Presidiu a reunião" },
                          { verbo: "Ir / Chegar", regencia: "VTI — A", ex: "Chegou ao escritório" },
                          { verbo: "Referir-se", regencia: "VTI — A", ex: "Refere-se ao projeto" },
                        ].map((item) => (
                          <div
                            key={item.verbo}
                            className="flex items-center gap-2 p-2 bg-indigo-500/5 rounded-lg border border-indigo-500/10"
                          >
                            <span className="font-bold w-36 shrink-0">{item.verbo}</span>
                            <span className="text-indigo-400 font-mono font-bold w-24 shrink-0">
                              {item.regencia}
                            </span>
                            <span className="text-muted-foreground italic">{item.ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regência Nominal: resumo completo",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Todos os adjetivos e substantivos com preposições fixas
                        que caem na prova:
                      </p>
                      <div className="grid gap-2 md:grid-cols-2 text-lg">
                        {[
                          { nome: "Apto", prep: "A", tipo: "adj" },
                          { nome: "Atento", prep: "A", tipo: "adj" },
                          { nome: "Favorável", prep: "A", tipo: "adj" },
                          { nome: "Idêntico", prep: "A", tipo: "adj" },
                          { nome: "Nocivo", prep: "A", tipo: "adj" },
                          { nome: "Compatível", prep: "COM", tipo: "adj" },
                          { nome: "Contente", prep: "COM", tipo: "adj" },
                          { nome: "Satisfeito", prep: "COM", tipo: "adj" },
                          { nome: "Responsável", prep: "POR", tipo: "adj" },
                          { nome: "Ansioso", prep: "POR / PARA", tipo: "adj" },
                          { nome: "Versado", prep: "EM", tipo: "adj" },
                          { nome: "Perito", prep: "EM", tipo: "adj" },
                          { nome: "Amor", prep: "A / DE / POR", tipo: "subst" },
                          { nome: "Medo", prep: "DE", tipo: "subst" },
                          { nome: "Necessidade", prep: "DE", tipo: "subst" },
                          { nome: "Referência", prep: "A", tipo: "subst" },
                        ].map((item) => (
                          <div
                            key={item.nome}
                            className="flex items-center justify-between p-2 bg-slate-500/5 rounded-lg border border-slate-500/10"
                          >
                            <span className="font-bold">{item.nome}</span>
                            <span className={`text-lg px-1 rounded ${item.tipo === "adj" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                              {item.tipo}
                            </span>
                            <span className="text-primary font-mono font-bold">{item.prep}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pronomes relativos com preposição: revisão final",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-3 text-lg">
                      <p className="text-muted-foreground">
                        O mecanismo é simples: a preposição exigida pelo verbo
                        que segue o pronome relativo deve ser colocada
                        <strong> antes</strong> do pronome.
                      </p>
                      <div className="space-y-2 text-lg">
                        {[
                          { frase: "a norma a que me refiro", verb: "referir-se A" },
                          { frase: "o cargo a que aspiro", verb: "aspirar A" },
                          { frase: "o projeto de que dependo", verb: "depender DE" },
                          { frase: "a empresa em que confio", verb: "confiar EM" },
                          { frase: "a solução com que contamos", verb: "contar COM" },
                          { frase: "o gestor a quem obedecemos", verb: "obedecer A" },
                        ].map((item, i) => (
                          <div key={i} className="p-2 bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex items-center justify-between">
                            <span className="italic">"{item.frase}"</span>
                            <span className="text-indigo-400 font-mono text-lg shrink-0 ml-2">({item.verb})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-violet-600"
        />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Estratégia Final de Prova"
          variant={mv[10]}
        />
            <AlertBox tipo="info" titulo="Estratégia Definitiva para Gabaritar Regência">
              <strong>1. Identifique o verbo regente</strong> e pergunte:
              "Esse verbo exige preposição?"
              <br /><br />
              <strong>2. Se houver pronome relativo</strong> (que, quem, o qual),
              verifique o verbo APÓS o pronome e coloque a preposição ANTES.
              <br /><br />
              <strong>3. Para verbos bifrontes</strong> (assistir, aspirar, visar),
              identifique o SENTIDO usado antes de decidir a regência.
              <br /><br />
              <strong>4. Atenção ao IMPLICAR</strong>: no sentido de "causar",
              é sempre sem preposição (VTD).
              <br /><br />
              <strong>5. PREFERIR nunca usa "do que"</strong> — sempre
              "A": "prefiro X a Y".
            </AlertBox>
            <CardCarousel
              cards={[
                {
                  icone: "🎯",
                  title: "Passo 1: Identifique",
                  descricao: "Localize o verbo ou nome regente na frase antes de responder.",
                },
                {
                  icone: "🔍",
                  title: "Passo 2: Classifique",
                  descricao: "É transitivo direto ou indireto? O sentido muda a regência?",
                },
                {
                  icone: "⚡",
                  title: "Passo 3: Verifique o Relativo",
                  descricao: "Se houver pronome relativo, a preposição do verbo deve vir antes.",
                },
                {
                  icone: "🏆",
                  title: "Passo 4: Confirme",
                  descricao: "Substitua por lhe/o para confirmar a transitividade e marcar com segurança.",
                },
              ]}
            />
          </section>

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre em Regência!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você agora domina tanto a regência nominal quanto a verbal e
                está pronto para gabaritar a Cesgranrio.
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={QUIZ_FINAL_REGENCIA}
              titulo="QUIZ: Módulo Nº 10"
              icone="🏆"
              numero={3}
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
          variant={mv[10]}
        />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
