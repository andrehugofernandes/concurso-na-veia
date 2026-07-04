"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaProps,
  VideoModal,
  AulaTemplate,
  Comparison,
  MusicPlayerCard,
  ModuleConsolidation,
  QuestaoResolvidaStepByStep} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import {
  QUIZ_M1_SUBSTANTIVO,
  QUIZ_M2_ADJETIVO,
  QUIZ_M3_ARTIGO,
  QUIZ_M4_PRONOME,
  QUIZ_M5_VERBO,
  QUIZ_M6_ADVERBIO,
  QUIZ_M7_PREPOSICAO,
  QUIZ_M8_CONJUNCAO,
  QUIZ_M9_INTERJEICAO,
  QUIZ_M10_NUMERAL,
} from "./data/classes-palavras-quizzes";

import {
  LuBookOpen,
  LuTag,
  LuActivity,
  LuZap,
  LuHash,
  LuLink2,
  LuNavigation,
  LuArrowDown,
  LuShield,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuMusic,
  LuCheck,
  LuRepeat,
  LuShieldAlert,
  LuPalette,
  LuLibrary,
} from "react-icons/lu";

// ── Definição dos 10 Módulos Premium (1 Classe = 1 Módulo) ──
const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "M1: Substantivo",
    title: "Classe: Substantivo",
  },
  { id: "modulo-2", label: "M2: Adjetivo", title: "Classe: Adjetivo" },
  { id: "modulo-3", label: "M3: Artigo", title: "Classe: Artigo" },
  { id: "modulo-4", label: "M4: Pronome", title: "Classe: Pronome" },
  { id: "modulo-5", label: "M5: Verbo", title: "Classe: Verbo" },
  { id: "modulo-6", label: "M6: Advérbio", title: "Classe: Advérbio" },
  {
    id: "modulo-7",
    label: "M7: Preposição",
    title: "Classe: Preposição",
  },
  {
    id: "modulo-8",
    label: "M8: Conjunção",
    title: "Classe: Conjunção",
  },
  { id: "modulo-9", label: "M9: Interjeição", title: "Classe: Interjeição" },
  { id: "modulo-10", label: "M10: Numeral", title: "Classe: Numeral" },
] as const;
// ══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS FOR CONJUGATION
// ══════════════════════════════════════════════════════════════════════════

const renderConj = (
  p1: string,
  p2: string,
  p3: string,
  p4: string,
  p5: string,
  p6: string,
  prefixo: string = "",
) => {
  const w = prefixo ? "w-16" : "w-10";
  return (
    <div className="text-lg space-y-2 font-mono">
      {[p1, p2, p3, p4, p5, p6].map((p, i) => {
        const pronoun = ["eu", "tu", "ele", "nós", "vós", "eles"][i];
        return (
          <p key={i} className="flex gap-2">
            <span className={`text-muted-foreground ${w} text-right`}>
              {prefixo ? `(${prefixo}) ` : ""}
              {pronoun}
            </span>
            <span className="font-semibold text-foreground text-left">{p}</span>
          </p>
        );
      })}
    </div>
  );
};


export default function AulaClassesPalavras({
  onComplete,
  isCompleted,
  loading,
  prevTopico,
  nextTopico,
  currentProgress,
  onUpdateProgress,
  materiaCor,
  materiaNome,
  materiaId,
}: AulaProps) {
  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)
  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)]),
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_portugues_classes_palavras_";

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

  
  const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
  const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
  const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
  const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
  const [qMod5, setQMod5] = useState<QuizQuestion[]>([]);
  const [qMod6, setQMod6] = useState<QuizQuestion[]>([]);
  const [qMod7, setQMod7] = useState<QuizQuestion[]>([]);
  const [qMod8, setQMod8] = useState<QuizQuestion[]>([]);
  const [qMod9, setQMod9] = useState<QuizQuestion[]>([]);
  const [qMod10, setQMod10] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQMod1(getRandomQuestions(QUIZ_M1_SUBSTANTIVO, 6));
    setQMod2(getRandomQuestions(QUIZ_M2_ADJETIVO, 6));
    setQMod3(getRandomQuestions(QUIZ_M3_ARTIGO, 6));
    setQMod4(getRandomQuestions(QUIZ_M4_PRONOME, 6));
    setQMod5(getRandomQuestions(QUIZ_M5_VERBO, 6));
    setQMod6(getRandomQuestions(QUIZ_M6_ADVERBIO, 6));
    setQMod7(getRandomQuestions(QUIZ_M7_PREPOSICAO, 6));
    setQMod8(getRandomQuestions(QUIZ_M8_CONJUNCAO, 6));
    setQMod9(getRandomQuestions(QUIZ_M9_INTERJEICAO, 6));
    setQMod10(getRandomQuestions(QUIZ_M10_NUMERAL, 6));
  }, []);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));
      if (onUpdateProgress) {
        onUpdateProgress(Math.round((newSet.size / MODULE_DEFS.length) * 100));
      }
      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setActiveTab(MODULE_DEFS[index + 1].id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={Array.from(MODULE_DEFS)}
      completedModules={completedModules}
      isModuleUnlocked={() => true}
      titulo="Classes de Palavras"
      descricao="Domine as 10 categorias morfológicas para a Cesgranrio."
      duracao="60 min"
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
      loading={loading}
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
    >
      {/* ── MÓDULO 1: SUBSTANTIVO ── */}
      <TabsContent value="modulo-1" className="space-y-12 mt-12">
        <ModuleBanner numero={1}
          titulo="O Substantivo"
          descricao="A base de toda a nomeação e o núcleo dos termos da oração."
          variant={mv[1]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Fundamentação dos Substantivos"
            description="Domine a classe de palavras que nomeia o mundo e estrutura o pensamento"
            variant={mv[1]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O substantivo constitui a classe lexical fundamental da língua portuguesa, 
              responsável pela designação de seres, conceitos, fenômenos e abstrações. 
              Conforme estabelecido pela gramática normativa, o substantivo 
              é "a palavra com que designamos os seres em geral", estabelecendo-se como 
              o pilar sobre o qual se edifica toda a estrutura sintática da oração. 
              Tradicionalmente, os substantivos representam a categoria primordial de nomeação, 
              funcionando como âncora semântica para todas as outras classes gramaticais. 
              Para o contexto Petrobras, o domínio dos substantivos revela-se crucial 
              na compreensão de documentos técnicos e relatórios.
            </p>
            <p>
              Em outras palavras, os substantivos funcionam como os "blocos de construção" 
              da linguagem humana. Assim como os átomos formam toda a matéria conhecida, 
              os substantivos nomeiam os elementos essenciais que compõem nossa realidade 
              comunicativa. Quando dizemos "plataforma", "refinaria" ou "petróleo", 
              estamos utilizando substantivos que atuam como recipientes conceituais, 
              armazenando não apenas o objeto em si, mas todo o universo de propriedades. 
              Esta capacidade de nomeação transcende a mera etiquetagem, constituindo-se 
              como ato cognitivo fundamental que permite organizar e compartilhar conhecimento.
            </p>
            <p>
              A classificação dos substantivos obedece a critérios morfológicos e semânticos 
              rigorosos, organizados em quatro eixos fundamentais: concreto vs. abstrato, 
              próprio vs. comum, simples vs. composto, e primitivo vs. derivado. 
              Substantivos concretos designam seres com existência independente, 
              enquanto abstratos referem-se a qualidades, estados ou ações. 
              Os próprios individualizam seres específicos, exigindo inicial maiúscula, 
              enquanto os comuns aplicam-se genericamente. A flexão de número constitui-se 
              como marca morfológica obrigatória, com o plural seguindo regras precisas, 
              muitas vezes exploradas em armadilhas da banca.
            </p>
            <p>
              No universo Petrobras, os substantivos técnicos assumem papel preponderante 
              na comunicação corporativa e documentação técnica. Termos como "laminado", 
              "wellhead" e "flowline" transcendem o vocabulário comum, constituindo-se 
              como léxico especializado fundamental. A precisão na utilização desses 
              substantivos técnicos impacta diretamente a segurança operacional e 
              eficiência produtiva. Relatórios de produção dependem da correta nomeação 
              de equipamentos para garantir interpretação unívoca e tomada de decisões.
            </p>
            <p>
              A CESGRANRIO sistematicamente explora as sutilezas morfológicas dos substantivos 
              em suas avaliações, com ênfase particular na flexão de número e distinção 
              entre concreto/abstrato. Erros frequentes dos candidatos incluem a 
              pluralização incorreta de substantivos compostos e confusão entre 
              substantivos e adjetivos pátrios. A banca costuma apresentar alternativas 
              com termos semanticamente próximos mas morfologicamente distintos. 
              Questões envolvendo substantivos coletivos menos comuns frequentemente 
              aparecem associadas a contextos industriais, testando a aplicação prática.
            </p>

            {/* CAIXA DE DESTAQUE: Fórmula / Regra-Chave / Artigo de Lei */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200/50 dark:border-amber-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                Estrutura de Flexão dos Substantivos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div>
                  <p className="font-semibold text-amber-700 dark:text-amber-300">
                    Gênero e Número
                  </p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Biformes: mudam de forma (menino/menina).</li>
                    <li>• Uniformes: uma forma (sobrecomum, epiceno).</li>
                    <li>• Plural dos Compostos: regra do "varia ou não".</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-amber-700 dark:text-amber-300">
                    Grau (Aumentativo/Diminutivo)
                  </p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Sintético: sufixos (casarão, casinha).</li>
                    <li>• Analítico: adjetivos (casa grande, casa pequena).</li>
                    <li>• Valor Afetivo ou Pejorativo (fogaça, livreco).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Fundamentos Morfológicos"
            description="A base científica e a distinção entre Morfologia e Sintaxe"
            variant={mv[1]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-muted-foreground leading-relaxed text-justify">
            <div className="space-y-4">
              <p>
                O <strong>Substantivo</strong> é a classe de palavra que <strong>nomeia</strong> seres, objetos, lugares, sentimentos, ações e qualidades. Na morfologia, ele é a palavra que designa os seres em geral, reais ou imaginários.
              </p>
              <AlertBox tipo="info" titulo="Morfologia vs Sintaxe">
                <strong>Morfologia</strong>: É a classe gramatical (o "RG"). Ex: Navio = Substantivo.<br/>
                <strong>Sintaxe</strong>: É a função na frase (a "Profissão"). Ex: Navio = Sujeito.
              </AlertBox>
            </div>
            <div className="space-y-4">
              <p>
                Na estrutura oracional, o substantivo funciona como o <strong>núcleo</strong> de praticamente todos os termos: sujeito, objetos, complemento nominal e agente da passiva. Dominá-lo é o primeiro passo para a análise sintática avançada.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Classificações Estratégicas"
            description="Os 4 eixos fundamentais de oposição exigidos pela Cesgranrio"
            variant={mv[1]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Eixos de Classificação"
            icone={<LuTag />}
            corIndicador="bg-amber-500"
            slides={[
              {
                titulo: "🏗️ Concreto vs Abstrato",
                icone: "1️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-amber-500/5 rounded-lg p-4 border border-amber-500/20">
                        <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 uppercase text-xl tracking-widest text-foreground/85 leading-relaxed">Concreto</h4>
                        <p className="text-xl text-foreground/85 leading-relaxed">Existência física ou independente, perceptível pelos sentidos.</p>
                        <div className="mt-2 text-lg text-foreground/85 leading-relaxed bg-background/50 rounded p-2 border border-border/50 font-medium">
                          EX: plataforma, petróleo, mar, funcionário, vento, anjo.
                        </div>
                      </div>
                      <div className="bg-orange-500/5 rounded-lg p-4 border border-orange-500/20">
                        <h4 className="font-bold text-orange-600 dark:text-orange-400 mb-2 uppercase text-xl tracking-widest text-foreground/85 leading-relaxed">Abstrato</h4>
                        <p className="text-xl text-foreground/85 leading-relaxed">Qualidades, estados, ações e sentimentos. Dependem de um ser para existir.</p>
                        <div className="mt-2 text-lg text-foreground/85 leading-relaxed bg-background/50 rounded p-2 border border-border/50 font-medium">
                          EX: beleza, eficiência, segurança, produção, saudade.
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "🏷️ Próprio vs Comum",
                icone: "2️⃣",
                conteudo: (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border-l-2 border-amber-500 bg-muted/30">
                      <p className="text-xl text-foreground/85 leading-relaxed"><strong>Próprio:</strong> Individualiza (Petrobras, Rio). Sempre Maiúsculo.</p>
                    </div>
                    <div className="p-4 border-l-2 border-orange-500 bg-muted/30">
                      <p className="text-xl text-foreground/85 leading-relaxed"><strong>Comum:</strong> Generaliza (empresa, cidade). Minúsculo.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "🔗 Simples vs Composto",
                icone: "3️⃣",
                conteudo: (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border-l-2 border-amber-500 bg-muted/30">
                      <p className="text-xl text-foreground/85 leading-relaxed"><strong>Simples:</strong> Um radical (mar, gás, poço).</p>
                    </div>
                    <div className="p-4 border-l-2 border-orange-500 bg-muted/30">
                      <p className="text-xl text-foreground/85 leading-relaxed"><strong>Composto:</strong> Dois radicais (passatempo, guarda-chuva).</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "🌱 Primitivo vs Derivado",
                icone: "4️⃣",
                conteudo: (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border-l-2 border-amber-500 bg-muted/30">
                      <p className="text-xl text-foreground/85 leading-relaxed"><strong>Primitivo:</strong> Não vem de outra palavra (pedra, mar).</p>
                    </div>
                    <div className="p-4 border-l-2 border-orange-500 bg-muted/30">
                      <p className="text-xl text-foreground/85 leading-relaxed"><strong>Derivado:</strong> Vem de outra (pedreira, marinheiro).</p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Fenômenos de Substantivação"
            description="O Efeito Rei Midas e a Derivação Imprópria"
            variant={mv[1]}
          />
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-6 rounded-xl mb-6 text-lg text-foreground/90 italic">
            "Qualquer palavra precedida de artigo perde sua classe original e torna-se um substantivo."
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuRepeat className="w-12 h-12 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Verbo → Subst.
                  </span>
                  <span className="text-xl text-amber-500/80 font-medium leading-relaxed">
                    Verbo Substantivado
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-lg text-foreground/85 leading-relaxed">Exemplo</span>
                  </div>
                  <p className="text-xl leading-relaxed text-foreground/85">
                    "<strong>O cantar</strong> dos pássaros é sinal de chuva."
                  </p>
                  <p className="text-xl leading-relaxed text-foreground/85">
                    Aqui, o artigo "O" substantivou a ação.
                  </p>
                </div>
              }
              categoria="Verbo Substantivado"
              variant={mv[1]}
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuShieldAlert className="w-12 h-12 text-orange-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Advérbio → Subst.
                  </span>
                  <span className="text-xl text-orange-500/80 font-medium leading-relaxed">
                    Advérbio Substantivado
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-orange-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-lg text-foreground/85 leading-relaxed">Exemplo</span>
                  </div>
                  <p className="text-xl leading-relaxed text-foreground/85">
                    "Recebemos <strong>um não</strong> rotundo da gerência."
                  </p>
                  <p className="text-xl leading-relaxed text-foreground/85">
                    O artigo indefinido "UM" operou a mudança.
                  </p>
                </div>
              }
              categoria="Advérbio Substantivado"
              variant="orange"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                    <LuPalette className="w-12 h-12 text-amber-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Adjetivo → Subst.
                  </span>
                  <span className="text-xl text-amber-500/80 font-medium leading-relaxed">
                    Adjetivo Substantivado
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-lg text-foreground/85 leading-relaxed">Exemplo</span>
                  </div>
                  <p className="text-xl leading-relaxed text-foreground/85">
                    "<strong>O azul</strong> do mar na Bacia de Campos."
                  </p>
                  <p className="text-xl leading-relaxed text-foreground/85">
                    A cor tornou-se o objeto da frase.
                  </p>
                </div>
              }
              categoria="Adjetivo Substantivado"
              variant={mv[1]}
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Plural de Compostos e Coletivos"
            description="Zonas críticas para Cesgranrio e concursos Petrobras"
            variant={mv[1]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Regras e Desafios"
            icone={<LuLibrary />}
            corIndicador="bg-orange-500"
            slides={[
              {
                titulo: "📚 Plural de Compostos",
                icone: "🔄",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-xl font-semibold text-orange-600 mb-2 text-foreground/85 leading-relaxed">Regra de Ouro: Varia ou Não?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded border border-border bg-background/50">
                        <p className="text-lg text-foreground/85 leading-relaxed"><strong>Variam:</strong> Subst, Adj, Numeral, Pronome.</p>
                      </div>
                      <div className="p-3 rounded border border-border bg-background/50">
                        <p className="text-lg text-foreground/85 leading-relaxed"><strong>NÃO Variam:</strong> Verbo, Advérbio, Interjeição.</p>
                      </div>
                    </div>
                    <div className="text-lg text-foreground/85 leading-relaxed italic mt-2">
                      EX: Guarda-chuva (V+S) → Guarda-chuvas | Couve-flor (S+S) → Couves-flores.
                    </div>
                  </div>
                ),
              },
              {
                titulo: "⚓ Coletivos Industriais",
                icone: "🏭",
                conteudo: (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-2 border border-border rounded text-center">
                      <p className="text-lg text-foreground/85 leading-relaxed font-bold">Frota</p>
                      <p className="text-[10px] text-muted-foreground">Navios/Veículos</p>
                    </div>
                    <div className="p-2 border border-border rounded text-center">
                      <p className="text-lg text-foreground/85 leading-relaxed font-bold">Resíduo</p>
                      <p className="text-[10px] text-muted-foreground">Conjunto de detritos</p>
                    </div>
                    <div className="p-2 border border-border rounded text-center">
                      <p className="text-lg text-foreground/85 leading-relaxed font-bold">Acervo</p>
                      <p className="text-[10px] text-muted-foreground">Livros/Obras</p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
          <AlertBox tipo="warning" titulo="Atenção ao Hífen">
            O Acordo Ortográfico de 1990 removeu hífens em casos como "mandachuva" e "paraquedas". A Cesgranrio cobra a grafia correta em questões de concordância.
          </AlertBox>
        </section>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[1]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual frase apresenta um verbo na VOZ PASSIVA?"
          alternativas={[
            { letra: "A", texto: "O técnico consertou a bomba.", correta: false },
              { letra: "B", texto: "A bomba foi consertada pelo técnico.", correta: true },
              { letra: "C", texto: "O técnico se feriu.", correta: false },
              { letra: "D", texto: "O técnico chegou à plataforma.", correta: false },
              { letra: "E", texto: "O técnico trabalha muito.", correta: false }
          ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "A voz passiva analítica é formada por Verbo Auxiliar + Particípio." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={5}
          variant={mv[1]}
          resumoVisual={{
            moduloNome: "M1: Substantivo",
            tituloAula: "Classes de Palavras",
            materia: "Português",
            images: [
              {
                title: "Substantivo",
                type: "Mapa Mental",
                placeholderColor: "bg-amber-100",
              },
              {
                title: "Efeito Rei Midas",
                type: "Macete",
                placeholderColor: "bg-orange-100",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Efeito Rei Midas",
            content: (
              <p className="text-lg">
                "Qualquer palavra precedida de <strong>artigo</strong> torna-se <strong>substantivo</strong>."
              </p>
            ),
          }}
          podcast={{
            aulaId: "classespalavras",
            aulaTitulo: "Classes Palavras",
            materia: "Português",
            materiaId: "portugues",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

        <section className="mt-12">
          <QuizInterativo
            questoes={qMod1}
            titulo="QUIZ: Substantivo"
            icone="🎯"
            numero={6}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
            variant={mv[1]}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 2: ADJETIVO ── */}
      <TabsContent value="modulo-2" className="space-y-12 mt-12">
        <ModuleBanner numero={2}
          titulo="O Adjetivo"
          descricao="O qualificador que define a concordância e a nuance do texto."
          variant={mv[2]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arte da Qualificação: O Adjetivo"
            description="Explore as nuances e especificações que o adjetivo confere ao substantivo"
            variant={mv[2]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O adjetivo é a classe de palavras que exerce a função de qualificar o substantivo, 
              atribuindo-lhe estados, qualidades, propriedades ou modos de ser. Diferente do 
              substantivo, que nomeia a essência, o adjetivo lida com os acidentes e as nuances 
              da realidade. De acordo com a tradição gramatical, o adjetivo funciona como um adscrito do nome, 
              estabelecendo uma relação de dependência morfológica (concordância) e semântica 
              (especificação). Na estrutura da oração, o adjetivo pode atuar como adjunto 
              adnominal (quando está colado ao substantivo) ou predicativo (quando expressa 
              um estado mediado por um verbo), sendo peça fundamental para a construção 
              de descrições precisas em qualquer registro linguístico, do literário ao técnico.
            </p>

            <p>
              Para facilitar a compreensão intuitiva, imagine o adjetivo como a "lente" 
              da câmera que decide o foco e a cor da imagem. Se o substantivo é a 
              paisagem (o fato bruto), o adjetivo é o filtro que define se a paisagem é 
              "árida", "produtiva" ou "perigosa". Sem os adjetivos, a nossa comunicação 
              seria meramente etiquetadora e cinzenta. É através deles que passamos do 
              genérico para o específico: não é apenas uma "plataforma", mas uma 
              plataforma "semi-submersível"; não é apenas um "risco", mas um risco 
              "mitigado". Eles fornecem a nitidez necessária para que o interlocutor 
              entenda não apenas *o que* está sendo discutido, mas *como* esse objeto 
              se apresenta na realidade.
            </p>

            <p>
              Morfologicamente, o adjetivo é variável em gênero (masculino/feminino), 
              número (singular/plural) e grau (comparativo/superlativo). A flexão de 
              adjetivos compostos é um ponto de atenção especial: em regra, apenas o 
              último elemento varia (camisas azul-claras, causas econômico-financeiras). 
              Além disso, as locuções adjetivas — expressões preposicionadas com valor 
              de adjetivo — desempenham papel crucial na densidade lexical (amor de pai = 
              materno; águas da chuva = pluviais). A mudança de posição do adjetivo 
              em relação ao substantivo (homem grande vs. grande homem) não é apenas 
              estética, mas altera profundamente o valor semântico entre o objetivo 
              (denotativo) e o subjetivo (conotativo).
            </p>

            <p>
              No contexto operacional da Petrobras, a precisão adjetival é uma questão de 
              segurança e eficiência. Relatórios de inspeção dependem de adjetivos 
              precisos para descrever o estado de equipamentos: uma válvula pode estar 
              "corroída", "obstruída" ou "operacional", e a confusão entre esses estados 
              pode levar a decisões catastróficas. Toda a terminologia da indústria de 
              óleo e gás é rica em qualificadores técnicos que definem especificações 
              de materiais, tipos de solo ou estados químicos de fluidos. Adjetivos como 
              "viscoso", "inflamável", "offshore" e "estanque" constituem o vocabulário 
              de sobrevivência do profissional técnico, garantindo que as propriedades 
              físicas dos ativos sejam comunicadas sem ambiguidades.
            </p>

            <p>
              A CESGRANRIO explora sistematicamente a capacidade do candidato de perceber 
              a mudança de sentido causada pela anteposição ou posposição do adjetivo. 
              Muitas questões de reescrita de frases baseiam-se na substituição de 
              locuções adjetivas por seus adjetivos eruditos equivalentes (fogo de 
              artifício = pirotécnico; vida de gado = pecuária). Outro tópico recorrente 
              é a concordância nominal em contextos complexos, onde um adjetivo se refere 
              a dois ou mais substantivos de gêneros diferentes. A banca também costuma 
              testar a identificação de adjetivos que funcionam como substantivos 
              (derivação imprópria) quando precedidos de artigo, exigindo uma análise 
              morfológica atenta ao contexto sintático completo da frase.
            </p>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                Locuções Adjetivas e Erudições Técnicas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Indústria e Natureza</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• De petróleo → Petroglífico / Petroleiro</li>
                    <li>• De chuva → Pluvial</li>
                    <li>• De rio → Fluvial</li>
                    <li>• De mar → Marítimo / Marinho</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Tempo e Estado</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Da tarde → Vespertino</li>
                    <li>• Da noite → Noturno</li>
                    <li>• Do gelo → Glacial</li>
                    <li>• De chumbo → Plúmbeo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ★ SEÇÃO DE CONTEÚDO ESTRATÉGICO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Classificação e Flexão"
            description="As regras de variação e as locuções adjetivas"
            variant={mv[2]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Domínio do Adjetivo"
            icone={<LuTag />}
            corIndicador="bg-blue-500"
            slides={[
              {
                titulo: "🔄 Flexão dos Compostos",
                icone: "1️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-xl text-foreground/85 leading-relaxed">Em adjetivos compostos, a regra geral é que <strong>apenas o último elemento varia</strong>.</p>
                    <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
                      <p className="text-lg text-foreground/85 leading-relaxed font-mono">EX: Acordos econômico-financeiros | Camisas azul-escuras.</p>
                      <p className="text-[10px] mt-2 text-muted-foreground italic">*Exceções: Surdo-mudo (ambos variam) e Azul-marinho/Azul-celeste (invariáveis).</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "📜 Locuções Adjetivas",
                icone: "2️⃣",
                conteudo: (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 border rounded bg-muted/30">
                      <p className="text-lg text-foreground/85 leading-relaxed"><strong>De anjo:</strong> Angelical</p>
                      <p className="text-lg text-foreground/85 leading-relaxed"><strong>De guerra:</strong> Bélico</p>
                    </div>
                    <div className="p-3 border rounded bg-muted/30">
                      <p className="text-lg text-foreground/85 leading-relaxed"><strong>De chumbo:</strong> Plúmbeo</p>
                      <p className="text-lg text-foreground/85 leading-relaxed"><strong>De fígado:</strong> Hepático</p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[2]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'Contrataram um **bom** engenheiro"
          alternativas={[
            { letra: "A", texto: "Qualidade objetiva", correta: false },
              { letra: "B", texto: "Opinião subjetiva", correta: true },
              { letra: "C", texto: "Estado físico", correta: false },
              { letra: "D", texto: "Origem geográfica", correta: false },
              { letra: "E", texto: "Quantidade", correta: false }
          ]}
          dicaEstrategica="Adjetivos valorativos antes do substantivo geralmente indicam a opinião do emissor."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Analisar as alternativas e eliminar distratores com erros óbvios." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={2}
          variant={mv[2]}
          resumoVisual={{
            moduloNome: "M2: Adjetivo",
            tituloAula: "Classes de Palavras",
            materia: "Português",
            images: [
              {
                title: "Adjetivo",
                type: "Mapa Mental",
                placeholderColor: "bg-blue-100",
              },
              {
                title: "Posição do Adjetivo",
                type: "Macete Semântico",
                placeholderColor: "bg-cyan-100",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "A Semântica da Posição",
            content: (
              <div className="space-y-4">
                <p>A posição do adjetivo altera o sentido:</p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li><strong>Homem grande:</strong> Estatura física (Objetivo).</li>
                  <li><strong>Grande homem:</strong> Caráter/Importância (Subjetivo).</li>
                </ul>
              </div>
            ),
          }}
          podcast={{
            aulaId: "classespalavras",
            aulaTitulo: "Classes Palavras",
            materia: "Português",
            materiaId: "portugues",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

        <section className="mt-12">
          <QuizInterativo
            questoes={qMod2}
            titulo="QUIZ: Adjetivo"
            icone="✨"
            numero={2}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
            variant={mv[2]}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 3: ARTIGO ── */}
      <TabsContent value="modulo-3" className="space-y-12 mt-12">
        <ModuleBanner numero={3}
          titulo="O Artigo"
          descricao="O determinante que define a substantivação e a concordância."
          variant={mv[3]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O Poder do Artigo: Definindo o Nome"
            description="Entenda como os menores termos da língua exercem o maior impacto na estruturação do texto"
            variant={mv[3]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O artigo é a classe gramatical que se antepõe ao substantivo para 
              determiná-lo de forma precisa ou imprecisa, indicando, ao mesmo tempo, 
              o seu gênero e o seu número. Dividem-se em definidos (o, a, os, as) 
              e indefinidos (um, uma, uns, umas). Segundo a tradição gramatical de 
              Na perspectiva da gramática normativa, o artigo é um "atualizador", transformando um conceito 
              técnico ou abstrato em um ser específico dentro do universo do discurso. 
              Sua presença ou ausência não é facultativa sob o ponto de vista semântico: 
              ela define se estamos falando de uma categoria geral ("Cão que late...") 
              ou de um indivíduo específico ("O cão que late..."), sendo um dos pilares 
              da clareza comunicativa na língua portuguesa.
            </p>

            <p>
              Para absorver o conceito de forma intuitiva, pense no artigo como o 
              "interruptor" de especificidade da linguagem. Quando você liga este 
              interruptor (artigo definido), você ilumina um objeto específico em meio 
              à escuridão do genérico. Se um gerente diz: "Preciso de UM técnico", ele 
              está buscando alguém com uma competência, mas se ele diz: "Preciso de O 
              técnico", ele está se referindo a alguém com quem já conversou ou que é 
              reconhecidamente o responsável por certa área. Esta pequena palavra de uma 
              ou duas letras funciona como um sinalizador mental que prepara o 
              ouvinte para saber se o tema é novo na conversa ou se já é de conhecimento 
              compartilhado entre as partes.
            </p>

            <p>
              A função mais fascinante do artigo é a sua capacidade de substantivação, 
              conhecida como "Derivação Imprópria" ou "Efeito Rei Midas". Qualquer palavra, 
              de qualquer classe gramatical, se precedida de um artigo, transforma-se 
              imediatamente em um substantivo (o cantar, o porém, o azul, o amanhã). 
              Além disso, o artigo possui regras de combinação obrigatórias com 
              preposições, gerando as formas contratas (em + o = no; de + a = da; a + a = à). 
              A distinção entre o artigo e o pronome oblíquo "o/a" é uma prova de fogo 
              morfológica: o artigo acompanha o nome, enquanto o pronome substitui o nome 
              ao lado de um verbo, exigindo atenção redobrada à vizinhança gramatical.
            </p>

            <p>
              No ambiente corporativo da Petrobras, o uso do artigo define a precisão 
              em ordens de serviço e normas regulamentadoras. "A plataforma" refere-se à 
              unidade operacional onde o trabalhador se encontra, enquanto "uma plataforma" 
              poderia ser qualquer unidade da frota em um contexto de planejamento. 
              Em nomes de navios e unidades flutuantes (FPSO), o uso do artigo é rigoroso: 
              dizemos "o P-50" ou "a P-50" dependendo da tradição náutica ou do gênero 
              implícito. Além disso, a concordância em placas de sinalização de segurança 
              depende crucialmente do artigo: "É proibida A entrada" (concordância com o 
              artigo) versus "É proibido entrada" (ausência de artigo, termo neutro). A 
              omissão indevida do artigo em documentos contratuais pode gerar ambiguidades 
              legais sobre a identificação de partes ou ativos específicos.
            </p>

            <p>
              Para a CESGRANRIO, o artigo é um tema recorrente associado à concordância 
              nominal e à crase. A banca adora testar a sensibilidade do candidato para 
              a substantivação e a distinção entre "o" artigo e "o" pronome ou "o" 
              demonstrativo básico (= aquilo). Questões de interpretação de texto 
              frequentemente focam no valor semântico do artigo indefinido com valor 
              de aproximação ("Eram umas três horas") ou com valor enfático ("Ele é UM 
              gerente!", querendo dizer 'o melhor gerente'). Dominar a regência das 
              preposições que se combinam com artigos é o segredo para não errar crase, 
              especialmente em nomes geográficos (Vou A Paris vs. Vou À França), onde 
              a regra do "volto DE" ou "volto DA" define a presença do artigo.
            </p>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                O Interruptor Lingüístico: Presença vs. Ausência
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-300">Concordância Rígida</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• É proibida A entrada. (Certo)</li>
                    <li>• É proibido entrada. (Certo)</li>
                    <li>• É proibido A entrada. (Errado)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-300">Presença de Artigo (Países)</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• O Brasil, A França, OS EUA</li>
                    <li>• Portugal, Cuba, Israel (Sem artigo)</li>
                    <li>• A Bahia, O Rio (Cidades com artigo)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[3]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O artigo 'O' em 'O saber não ocupa lugar' tem a função de:"
          alternativas={[
            { letra: "A", texto: "Definir um objeto", correta: false },
              { letra: "B", texto: "Substantivar o verbo 'saber'", correta: true },
              { letra: "C", texto: "Indicar o masculino", correta: false },
              { letra: "D", texto: "Enfatizar a frase", correta: false },
              { letra: "E", texto: "Substituir um pronome", correta: false }
          ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "O artigo tem o poder de transformar outras classes em substantivo (derivação imprópria)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={3}
          variant={mv[3]}
          resumoVisual={{
            moduloNome: "M3: Artigo",
            tituloAula: "Classes de Palavras",
            materia: "Português",
            images: [
              {
                title: "Artigo",
                type: "Mapa Mental",
                placeholderColor: "bg-emerald-100",
              },
              {
                title: "Substantivação",
                type: "Efeito Rei Midas",
                placeholderColor: "bg-teal-100",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "A Regra da Proibição",
            content: (
              <div className="space-y-4">
                <p>Cuidado com a concordância em placas e avisos:</p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li><strong>É proibida a entrada:</strong> Correto (Artigo força o feminino).</li>
                  <li><strong>É proibido entrada:</strong> Correto (Sem artigo, fica neutro).</li>
                  <li><span className="text-red-500">❌ É proibido a entrada:</span> Errado (Falta de concordância).</li>
                </ul>
              </div>
            ),
          }}
          podcast={{
            aulaId: "classespalavras",
            aulaTitulo: "Classes Palavras",
            materia: "Português",
            materiaId: "portugues",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

        <section className="mt-12">
          <QuizInterativo
            questoes={qMod3}
            titulo="QUIZ: Artigo"
            icone="🎯"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
            variant={mv[3]}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 4: PRONOME ── */}
      <TabsContent value="modulo-4" className="space-y-12 mt-12">
        <ModuleBanner numero={4}
          titulo="O Pronome"
          descricao="O substituto estratégico e o mestre da coesão textual."
          variant={mv[4]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O Pronome: O Arquiteto da Coesão"
            description="Domine a classe que substitui, retoma e organiza as relações no texto"
            variant={mv[4]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O pronome é a classe de palavras que substitui ou acompanha o substantivo, 
              indicando-o como pessoa do discurso ou situando-o no espaço e no tempo. 
              Sua importância transcende a mera economia de palavras (evitar repetições); 
              o pronome é o principal responsável pela coesão textual e pelas relações de 
              poder e cortesia na língua. Dividem-se em várias categorias: pessoais (reto 
              e oblíquo), possessivos, demonstrativos, indefinidos, interrogativos e 
              relativos. Segundo a gramática normativa, os pronomes formam um sistema fechado 
              de referências que permite ao falante organizar o "eu", o "tu" e o "ele" 
              dentro de um contexto comunicativo dinâmico e preciso.
            </p>

            <p>
              Para entender o pronome de forma intuitiva, imagine que ele é o "dublê" do 
              substantivo. Em um filme (o seu texto), o substantivo é o ator principal, 
              caro e pesado. Você não quer usá-lo em todas as cenas para não cansar o 
              público. O pronome entra em cena para substituí-lo nas sequências de ação: 
              em vez de repetir "O Engenheiro" dez vezes, você usa "ele", "o", "lhe", 
              "aquele". Sem esse time de dublês, os textos seriam repetitivos, lentos 
              e exaustivos. O pronome é a agilidade do texto, permitindo que a 
              informação flua sem que precisemos redefinir o sujeito do que estamos 
              falando a cada segunda frase.
            </p>

            <p>
              A complexidade morfológica dos pronomes é uma das maiores da língua. Os 
              pronomes pessoais retos exercem função de sujeito (quem faz a ação), 
              enquanto os oblíquos átonos exercem função de complemento (o que sofre a 
              ação). Um erro clássico é usar o resto no lugar do oblíquo ("Vi ele" em 
              vez de "Vi-o"). Já os pronomes relativos (como o "que", "cujo" e "onde") 
              são os pilares da subordinação de frases, retomando termos antecedentes 
              para introduzir novas informações. A colocação pronominal (próclise, mesóclise 
              e ênclise) define o registro de formalidade do texto e obedece a regras 
              estritas de atração baseadas na sonoridade e na sintaxe.
            </p>

            <p>
              No cotidiano da Petrobras, os pronomes de tratamento e a precisão dos 
              pronomes demonstrativos regem a hierarquia e a clareza dos processos. Em 
              comunicados oficiais, o uso correto de "Vossa Senhoria" ou "Vossa Excelência" 
              ainda é exigido em registros formais. Na redação técnica de relatórios, 
              os pronomes demonstrativos "este" (referente ao que será dito) e "esse" 
              (referente ao que já foi dito) evitam confusões graves sobre qual parágrafo 
              ou equipamento está sendo discutido. Além disso, o uso preciso dos 
              pronomes oblíquos em manuais de operação garante que as instruções sejam 
              diretas: "Verifique o manômetro e calibre-o imediatamente". A ambiguidade 
              pronominal (ex: "O técnico avisou o supervisor do seu erro") é um risco que 
              deve ser evitado para não gerar conflitos de responsabilidade operacional.
            </p>

            <p>
              A CESGRANRIO tem fixação pelos pronomes relativos e pela colocação pronominal. 
              O pronome "CUJO" é a pontos de atenção favorita: lembre-se de que ele não admite 
              artigo depois (nunca escreva "cujo o"). O uso de "ONDE" exclusivo para 
              lugares físicos também é cobrado à exaustão. Nas questões de reescrita, a 
              banca testa se o candidato sabe trocar o objeto direto ("o/a") pelo indireto 
              ("lhe") de acordo com a regência do verbo. Por fim, a próclise obrigatória 
              com palavras negativas ("Não o vi") e com pronomes relativos ("A norma 
              que se aplica") é o tema de 90% das questões de colocação da banca, 
              exigindo um ouvido treinado para a norma culta formal.
            </p>

            <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200/50 dark:border-rose-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                Manual de Especialistas: Cujo e Onde
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-rose-700 dark:text-rose-300">O Pronome Cujo (Posse)</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Concorda com o possuído: "Cujas mãos".</li>
                    <li>• Proibido artigo: "Cujo o" (Nunca!).</li>
                    <li>• Liga dois substantivos em relação de posse.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-rose-700 dark:text-rose-300">O Pronome Onde (Lugar)</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Somente lugar: "A casa onde moro".</li>
                    <li>• Para conceitos: "A situação EM QUE estou".</li>
                    <li>• Aonde: Movimento (Aonde você vai?).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Pessoais: Reto vs Oblíquo"
            variant={mv[4]}
          />
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
            <table className="w-full text-lg text-left">
              <thead className="bg-muted text-foreground font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-4">Pessoa</th>
                  <th className="p-4">Reto (Sujeito)</th>
                  <th className="p-4">Oblíquo Átono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["1ª sing.", "Eu", "me"],
                  ["2ª sing.", "Tu", "te"],
                  ["3ª sing.", "Ele/Ela", "o, a, se, lhe"],
                  ["1ª plural", "Nós", "nos"],
                  ["2ª plural", "Vós", "vos"],
                  ["3ª plural", "Eles/Elas", "os, as, se, lhes"],
                ].map(([pessoa, reto, obliquo], idx) => (
                  <tr key={idx} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-foreground">{pessoa}</td>
                    <td className="p-4 text-muted-foreground">{reto}</td>
                    <td className="p-4 text-muted-foreground">{obliquo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AlertBox tipo="warning" titulo="Atenção à Função Sintática">
            Pronomes Retos exercem função de SUJEITO. Pronomes Oblíquos exercem função de COMPLEMENTO (Objeto Direto ou Indireto). Exceção: Pronomes retos precedidos de preposição tornam-se oblíquos tônicos ("Para mim", "Com ele").
          </AlertBox>
        </section>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[4]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'O projeto **cujo** autor fomos nós"
          alternativas={[
            { letra: "A", texto: "Lugar", correta: false },
              { letra: "B", texto: "Posse", correta: true },
              { letra: "C", texto: "Causa", correta: false },
              { letra: "D", texto: "Finalidade", correta: false },
              { letra: "E", texto: "Modo", correta: false }
          ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "O pronome relativo" },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={4}
          variant={mv[4]}
          resumoVisual={{
            moduloNome: "M4: Pronome",
            tituloAula: "Classes de Palavras",
            materia: "Português",
            images: [
              {
                title: "Pronome",
                type: "Mapa Mental",
                placeholderColor: "bg-violet-100",
              },
              {
                title: "Colocação Pronominal",
                type: "Checklist",
                placeholderColor: "bg-purple-100",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "A Regra do CUJO",
            content: (
              <div className="space-y-4">
                <p>O pronome <strong>CUJO</strong> é o campeão de erros. Lembre-se:</p>
                <ul className="list-disc list-inside space-y-2 text-lg">
                  <li><strong>Posse:</strong> Sempre liga dois substantivos (Dono + Coisa).</li>
                  <li><strong>Sem Artigo:</strong> Nunca use "Cujo o" ou "Cujo a".</li>
                  <li><strong>Concordância:</strong> Concorda com o termo que vem DEPOIS (a coisa possuída).</li>
                </ul>
              </div>
            ),
          }}
          podcast={{
            aulaId: "classespalavras",
            aulaTitulo: "Classes Palavras",
            materia: "Português",
            materiaId: "portugues",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

        <section className="mt-12">
          <QuizInterativo
            questoes={qMod4}
            titulo="QUIZ: Pronome"
            icone="👤"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
            variant={mv[4]}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 5: VERBO ── */}
      <TabsContent value="modulo-5" className="space-y-12 mt-12">
        <ModuleBanner numero={5}
          titulo="O Verbo"
          descricao="A classe mais complexa e importante da língua portuguesa."
          variant={mv[5]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O Verbo: O Motor da Oração"
            description="Domine a classe mais dinâmica e complexa, essencial para a construção do sentido e da temporalidade"
            variant={mv[5]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O verbo é o coração pulsante da língua portuguesa. Representa a classe de 
              palavras que exprime ação, estado, mudança de estado, fenômeno natural ou 
              processo, situando o fato no tempo. Conforme a gramática normativa, 
              o verbo é um "acontecimento" que confere dinamismo ao discurso. É a classe 
              mais flexível e complexa, dobrando-se em modo, tempo, número, pessoa e voz 
              para carregar toda a carga de verdade e intenção de quem fala. Sem o verbo, 
              a linguagem seria uma galeria de estátuas; com ele, ela se torna um cinema 
              em alta definição.
            </p>

            <p>
              Para absorver o conceito intuitivamente, imagine o verbo como o "interruptor" 
              ou o "acelerador" de uma máquina. Se os nomes (substantivos) são as peças 
              paradas, o verbo é o que as coloca em funcionamento. Quando dizemos 
              "A refinaria OPERA", o verbo tira a refinaria da inércia e a joga no 
              fluxo do tempo. Ele é o componente que define se algo *é* (estático), 
              *foi* (concluído) ou *será* (expectativa). O domínio do verbo permite que 
              você controle o "quando" e o "como" das coisas, dando precisão cirúrgica 
              ao seu raciocínio.
            </p>

            <p>
              Morfologicamente, o verbo divide-se em radical (a base de sentido), 
              vogal temática (que indica a conjugação: -AR, -ER, -IR) e as desinências 
              modo-temporais e número-pessoais. As formas nominais — Infinitivo, Gerúndio 
              e Particípio — são camaleões que assumem funções de substantivos ou 
              adjetivos sem perder sua essência verbal. A conjugação regular segue trilhas 
              previsíveis, mas são os verbos irregulares e defectivos (os "rebeldes" 
              da gramática) que guardam as nuances mais sofisticadas e as armadilhas 
              preferidas dos examinadores de Avançado.
            </p>

            <p>
              No ambiente de alta responsabilidade da Petrobras, o verbo é o alicerce 
              do procedimento de segurança. Ordens de serviço e manuais técnicos 
              dependem da clareza dos verbos no Imperativo ("INSPECIONE a válvula", 
              "VERIFIQUE a pressão") para garantir a integridade dos ativos e das 
              equipes. O uso correto dos tempos verbais em relatórios de produção é 
              crítico: uma coisa é o que "FOI extraído", outra é o que "SERIA extraído" 
              sob certas condições. A ambiguidade verbal em uma norma interna pode 
              levar a interpretações perigosas em campo; por isso, a precisão verbal 
              é, antes de tudo, uma norma de segurança operacional.
            </p>

            <p>
              A CESGRANRIO trata o verbo como a "Soberana das Provas". A banca foca 
              pesadamente na correlação verbal — a harmonia obrigatória entre os tempos 
              (ex: "Se ele TIVESSE estudado, PASSARIA"). Outro porto seguro dos 
              examinadores são os verbos irregulares de alto impacto: VER, VIR, TER, 
              HAVER, PROVER e REAVER. Eles testarão se você sabe que "Se você VIR o 
              problema" (verbo ver) é o correto, e não "se você ver". Dominar as vozes 
              verbais e a transposição da ativa para a passiva é o diferencial que 
              separa os candidatos aptos daqueles que ficam pelo caminho.
            </p>

            <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-lg border border-violet-200/50 dark:border-violet-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                O "Checklist" Mortal dos Verbos (CESGRANRIO)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-violet-700 dark:text-violet-300">Tempo & Modo</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Correlação: Imperfeito Subj. + Fut. Pretérito.</li>
                    <li>• Futuro do Subjuntivo (VIR, TIVER, PUDER).</li>
                    <li>• Imperativo (Ordens e Procedimentos).</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-violet-700 dark:text-violet-300">Vozes & Impessoalidade</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• HAVER (Existir) = Singular Sempre.</li>
                    <li>• Transposição de Vozes (VTD → Voz Passiva).</li>
                    <li>• Particípios Abundantes (Pago/Pagado).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={2}
            title="Conceito e Classificação dos Verbos"
            variant={mv[5]}
          />
          <p className="text-lg text-muted-foreground">
            O <strong>Verbo</strong> é a classe de palavra que exprime{" "}
            <strong>ação, estado, fenômeno natural ou processo</strong>, situando
            o fato no <strong>tempo</strong>. É a classe mais flexionada da
            língua (modo, tempo, número, pessoa e voz).
          </p>
          <ContentAccordion
            mode="stacked"
            titulo="Tipos de Verbos"
            icone={<LuActivity />}
            corIndicador="bg-violet-500"
            slides={[
              {
                titulo: "Regulares",
                icone: "✅",
                conteudo:
                  "Verbos regulares mantêm o radical inalterado e seguem o modelo de conjugação de sua classe (-AR, -ER, -IR). Exemplos: amar, vender, partir. São a maioria dos verbos da língua e o ponto de partida para entender os irregulares.",
              },
              {
                titulo: "Irregulares",
                icone: "⚠️",
                conteudo:
                  "Verbos irregulares sofrem alterações no radical ou nas desinências que não seguem o modelo padrão. Exemplos: ser (sou, és, é...), ir (vou, vais, vai...), ter (tenho, tens, tem...), fazer (faço, faz...), poder (posso, podes...). São os mais cobrados na Cesgranrio!",
              },
              {
                titulo: "Defectivos",
                icone: "🚫",
                conteudo:
                  "Verbos defectivos são aqueles que não possuem conjugação completa — faltam formas em determinados tempos ou pessoas. Os mais cobrados: ABOLIR e COLORIR (não têm 1ª pessoa do singular do presente: não se diz 'eu abolo'); PRECAVER (conjugado como 'vir'); verbos de fenômenos naturais como CHOVER, NEVAR, VENTAR (impessoais, usados apenas na 3ª pessoa do singular).",
              },
              {
                titulo: "Abundantes",
                icone: "🔀",
                conteudo:
                  "Verbos abundantes possuem duas ou mais formas equivalentes para uma mesma conjugação. O caso mais cobrado é o do particípio passado: aceitar → aceitado (regular) / aceito (irregular); entregar → entregado / entregue; matar → matado / morto; pagar → pagado / pago. Regra prática: com auxiliar TER/HAVER → particípio regular; com auxiliar SER/ESTAR → particípio irregular.",
              },
              {
                titulo: "Formas Nominais",
                icone: "📝",
                conteudo:
                  "O verbo possui três formas nominais que exercem funções de outras classes: INFINITIVO (amar, vender, partir) = função de substantivo; GERÚNDIO (amando, vendendo, partindo) = função de advérbio ou adjetivo; PARTICÍPIO (amado, vendido, partido) = função de adjetivo. O gerúndio é frequentemente cobrado em questões de reescrita — cuidado com o 'gerundismo' (estar fazendo ao invés de fazer).",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Vozes Verbais e Passiva Pronominal"
            variant={mv[5]}
          />
          <Comparison
            title="Ativa vs Passiva Analítica vs Passiva Sintética"
            left={{
              title: "Voz Ativa",
              content: "Sujeito pratica a ação\n\"A Petrobras extraiu o petróleo.\"\nSujeito = Petrobras (agente)\nObjeto Direto = o petróleo",
              description: "Forma direta",
              variant: "success",
            }}
            right={{
              title: "Voz Passiva",
              content: "Sujeito recebe a ação\n\"O petróleo foi extraído pela Petrobras.\"\nSujeito = petróleo (paciente)\nAgente da passiva = pela Petrobras",
              description: "Forma transformada",
              variant: "info",
            }}
          />
          <AlertBox tipo="warning" titulo="Passiva Pronominal — A pontos de atenção">
            A passiva pronominal usa o pronome SE como partícula apassivadora: "Extrai-se petróleo em Campos." (= O petróleo é extraído). O verbo concorda com o sujeito paciente: "Extraem-se plataformas novas." Confundir SE apassivador com SE indeterminador é um erro clássico de prova.
          </AlertBox>
        </section>



        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Verbos Impessoais (Haver e Fazer)"
            variant={mv[5]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950 text-white space-y-6">
              <h4 className="text-2xl font-black text-rose-500 flex items-center gap-3 italic">
                HAVER
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-lg">
                    Sentido de <strong>EXISTIR</strong> ou{" "}
                    <strong>OCORRER</strong>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-lg">
                    Fica sempre no <strong>SINGULAR</strong> (3ª pessoa).
                  </p>
                </li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-lg italic">
                ✅ "Haverá problemas." (Certo) <br />❌ "Haverão problemas."
                (Errado)
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-slate-950 text-white space-y-6">
              <h4 className="text-2xl font-black text-amber-500 flex items-center gap-3 italic">
                FAZER
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-lg">
                    Indicando <strong>TEMPO DECORRIDO</strong>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-lg">
                    Fica sempre no <strong>SINGULAR</strong>.
                  </p>
                </li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-lg italic">
                ✅ "Faz dez anos." (Certo) <br />❌ "Fazem dez anos." (Errado)
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="Modos Verbais — Indicativo, Subjuntivo e Imperativo"
            variant={mv[5]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Os Três Modos"
            icone={<LuZap />}
            corIndicador="bg-violet-500"
            slides={[
              {
                titulo: "Modo Indicativo",
                icone: "🔵",
                conteudo:
                  "Expressa fatos reais, certos ou tidos como certos. É o modo da afirmação e da certeza. Tempos: Presente ('trabalha'), Pretérito Perfeito ('trabalhou'), Pretérito Imperfeito ('trabalhava'), Pretérito Mais-que-Perfeito ('trabalhara'), Futuro do Presente ('trabalhará'), Futuro do Pretérito ('trabalharia'). O Futuro do Pretérito (condicional) é usado em suposições e pedidos formais: 'Poderia me ajudar?'",
              },
              {
                titulo: "Modo Subjuntivo",
                icone: "🟡",
                conteudo:
                  "Expressa fatos incertos, duvidosos, desejados ou subordinados. É o modo da hipótese e da subordinação. Tempos: Presente ('que trabalhe'), Pretérito Imperfeito ('se trabalhasse'), Futuro ('quando trabalhar'). O Subjuntivo Presente é obrigatório após conjunções como EMBORA, PARA QUE, A FIM DE QUE, OXALÁ, TALVEZ: 'Embora trabalhe muito, não avança' (não 'trabalha').",
              },
              {
                titulo: "Modo Imperativo",
                icone: "🔴",
                conteudo:
                  "Expressa ordem, pedido, conselho ou proibição. Afirmativo: usa o presente do indicativo para 2ª pessoa (tu/vós) e o presente do subjuntivo para as demais: 'Trabalha tu!' / 'Trabalhe você!' Negativo: usa o presente do subjuntivo para todas as pessoas: 'Não trabalhes tu!' / 'Não trabalhe você!' Esta distinção é frequentemente cobrada em questões de uso formal da língua.",
              },
            ]}
          />
          <AlertBox tipo="warning" titulo="Correlação dos Tempos Verbais — Cesgranrio Cobra!">
            A correlação entre tempos é essencial em reescrita: Se o verbo da principal está no FUTURO DO PRESENTE → o verbo da subordinada vai para o FUTURO DO SUBJUNTIVO: "Avisarei quando <strong>chegar</strong>." Se está no FUTURO DO PRETÉRITO → vai para o PRETÉRITO IMPERFEITO DO SUBJUNTIVO: "Avisaria quando <strong>chegasse</strong>." Errar essa correlação invalida a reescrita.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="Laboratório de Conjugações Verbais"
            description="Explore os modelos de conjugação regular e irregular divididos pelos três modos fundamentais"
            variant={mv[5]}
          />
          
          {/* MODO INDICATIVO */}
          <ContentAccordion
            mode="stacked"
            titulo="Modo Indicativo: O Mundo dos Fatos"
            icone="🔵"
            corIndicador="bg-violet-500"
            defaultOpen={true}
            slides={[{
              conteudo: (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* REGULARES INDICATIVO */}
                    <div className="space-y-4">
                      <p className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-xl text-foreground/85 leading-relaxed">Modelos Regulares</p>
                      <div className="p-5 bg-white/5 border border-border rounded-xl space-y-6">
                        <div>
                          <p className="font-bold text-lg mb-2">-AR: Cantar (Pret. Perfeito)</p>
                          {renderConj("cantei", "cantaste", "cantou", "cantamos", "cantastes", "cantaram")}
                        </div>
                        <div className="pt-4 border-t border-border/50">
                          <p className="font-bold text-lg mb-2">-ER: Beber (Presente)</p>
                          {renderConj("bebo", "bebes", "bebe", "bebemos", "bebeis", "bebem")}
                        </div>
                        <div className="pt-4 border-t border-border/50">
                          <p className="font-bold text-lg mb-2">-IR: Abrir (Fut. Presente)</p>
                          {renderConj("abrirei", "abrirás", "abrirá", "abriremos", "abrireis", "abrirão")}
                        </div>
                      </div>
                    </div>

                    {/* IRREGULARES INDICATIVO */}
                    <div className="md:col-span-2 space-y-4">
                      <p className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-xl text-foreground/85 leading-relaxed">Modelos Irregulares (Alto Impacto)</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-6">
                          <div>
                            <p className="font-black text-lg text-rose-700 dark:text-rose-300 mb-2">✦ SER (Presente)</p>
                            {renderConj("sou", "és", "é", "somos", "sois", "são")}
                          </div>
                          <div className="pt-4 border-t border-rose-500/10">
                            <p className="font-black text-lg text-rose-700 dark:text-rose-300 mb-2">✦ TER (Pres. Indicativo)</p>
                            {renderConj("tenho", "tens", "tem", "temos", "tendes", "têm")}
                            <p className="text-lg text-foreground/85 leading-relaxed mt-2 italic">Atenção ao acento diferencial no plural!</p>
                          </div>
                        </div>
                        <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-6">
                          <div>
                            <p className="font-black text-lg text-rose-700 dark:text-rose-300 mb-2">✦ HAVER (Pret. Perf.)</p>
                            {renderConj("houve", "houveste", "houve", "houvemos", "houvestes", "houveram")}
                          </div>
                          <div className="pt-4 border-t border-rose-500/10">
                            <p className="font-black text-lg text-rose-700 dark:text-rose-300 mb-2">✦ VER (Pres. Indicativo)</p>
                            {renderConj("vejo", "vês", "vê", "vemos", "vedes", "veem")}
                            <p className="text-lg text-foreground/85 leading-relaxed mt-2 italic font-bold">🚫 Não tem acento em 'veem' (Novo Acordo).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AlertBox tipo="info" titulo="Dica de Ouro: Indicativo">
                    No modo indicativo, o **Pretérito Imperfeito** dos verbos em -AR terminam sempre em **-AVA** (Cantava, Estudava). Já os de -ER e -IR terminam em **-IA** (Bebia, Partia). É a marca visual da descrição no passado.
                  </AlertBox>
                </div>
              )
            }]}
          />

          {/* MODO SUBJUNTIVO */}
          <ContentAccordion
            mode="stacked"
            titulo="Modo Subjuntivo: O Mundo das Hipóteses"
            icone="🟡"
            corIndicador="bg-violet-500"
            defaultOpen={false}
            slides={[{
              conteudo: (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* REGULARES SUBJUNTIVO */}
                    <div className="space-y-4">
                      <p className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider text-xl text-foreground/85 leading-relaxed">Modelos Regulares</p>
                      <div className="p-5 bg-white/5 border border-border rounded-xl space-y-6">
                        <div>
                          <p className="font-bold text-lg mb-2">-AR: Estudar (Presente)</p>
                          {renderConj("estude", "estudes", "estude", "estudemos", "estudeis", "estudem", "que")}
                        </div>
                        <div className="pt-4 border-t border-border/50">
                          <p className="font-bold text-lg mb-2">-ER: Vender (Pret. Imperf.)</p>
                          {renderConj("vendesse", "vendessem", "vendesse", "vendêssemos", "vendêsseis", "vendessem", "se")}
                        </div>
                        <div className="pt-4 border-t border-border/50">
                          <p className="font-bold text-lg mb-2">-IR: Partir (Futuro)</p>
                          {renderConj("partir", "partires", "partir", "partirmos", "partirdes", "partirem", "quando")}
                        </div>
                      </div>
                    </div>

                    {/* IRREGULARES SUBJUNTIVO */}
                    <div className="md:col-span-2 space-y-4">
                      <p className="font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider text-xl text-foreground/85 leading-relaxed">Modelos Irregulares (Onde a Banca Ataca)</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-6">
                          <div>
                            <p className="font-black text-lg text-amber-700 dark:text-amber-300 mb-2">✦ SEJA (Verbo Ser)</p>
                            {renderConj("seja", "sejas", "seja", "sejamos", "sejais", "sejam", "que")}
                          </div>
                          <div className="pt-4 border-t border-amber-500/10">
                            <p className="font-black text-lg text-amber-700 dark:text-amber-300 mb-2">✦ TIVER (Verbo Ter)</p>
                            {renderConj("tiver", "tiveres", "tiver", "tivermos", "tiverdes", "tiverem", "quando")}
                            <p className="text-lg text-foreground/85 leading-relaxed mt-2 italic">Atenção: Não confunda com 'tenha'!</p>
                          </div>
                        </div>
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-6">
                          <div>
                            <p className="font-black text-lg text-amber-700 dark:text-amber-300 mb-2">✦ HOUVESSE (Verbo Haver)</p>
                            {renderConj("houvesse", "houvesses", "houvesse", "houvéssemos", "houvésseis", "houvessero", "se")}
                          </div>
                          <div className="pt-4 border-t border-amber-500/10">
                            <p className="font-black text-lg text-amber-700 dark:text-amber-300 mb-2">✦ VIER (Verbo Vir)</p>
                            {renderConj("vier", "vieres", "vier", "viermos", "vierdes", "vierem", "quando")}
                            <p className="text-lg text-foreground/85 leading-relaxed mt-2 italic text-rose-500 font-bold">⚠️ VIER (Vir) vs VER (Ver).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AlertBox tipo="warning" titulo="pontos de atenção: Futuro do Subjuntivo">
                    Muitos verbos irregulares no **Futuro do Subjuntivo** são idênticos ao **Infinitivo Pessoal** nos regulares (se estudar / quando estudar). Mas nos irregulares a diferença é gritante: *Se eu vir* (do verbo Ver) vs *Se eu vier* (do verbo Vir). Estude estes dois!
                  </AlertBox>
                </div>
              )
            }]}
          />

          {/* MODO IMPERATIVO */}
          <ContentAccordion
            mode="stacked"
            titulo="Modo Imperativo: O Mundo das Ordens"
            icone="🔴"
            corIndicador="bg-violet-500"
            defaultOpen={false}
            slides={[{
              conteudo: (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LÓGICA DO IMPERATIVO */}
                    <div className="p-8 bg-slate-950 text-white rounded-3xl space-y-6 border-b-4 border-rose-600 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <LuZap size={80} />
                      </div>
                      <h4 className="text-2xl font-black italic tracking-tighter text-rose-500">A REGRA DE FORMAÇÃO</h4>
                      <p className="text-lg text-slate-300 leading-relaxed">
                        O Imperativo não tem a 1ª pessoa (eu). O **Imperativo Afirmativo** retira o "Tu" e o "Vós" do Presente do Indicativo (sem o "S") e as demais do Subjuntivo. O **Imperativo Negativo** é 100% vindo do Presente do Subjuntivo.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <p className="text-rose-400 font-bold mb-1">Afirmativo</p>
                          <p className="text-xl font-mono italic text-foreground/85 leading-relaxed">Canta tu!</p>
                          <p className="text-xl font-mono italic text-foreground/85 leading-relaxed">Cante você!</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <p className="text-rose-400 font-bold mb-1">Negativo</p>
                          <p className="text-xl font-mono italic text-foreground/85 leading-relaxed">Não cantes tu!</p>
                          <p className="text-xl font-mono italic text-foreground/85 leading-relaxed">Não cante você!</p>
                        </div>
                      </div>
                    </div>

                    {/* EXEMPLOS DE IMPACTO */}
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-5 bg-white/5 border border-border rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="p-3 bg-blue-500/20 text-blue-500 rounded-lg font-bold">REG</div>
                        <div>
                          <p className="font-bold text-lg">Modelo -AR: Falar</p>
                          <p className="text-muted-foreground italic">"Fala tu, fale você, falemos nós..."</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-5 bg-white/5 border border-border rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-lg font-bold">REG</div>
                        <div>
                          <p className="font-bold text-lg">Modelo -ER: Comer</p>
                          <p className="text-muted-foreground italic">"Come tu, coma você, comamos nós..."</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl hover:bg-rose-500/20 transition-colors">
                        <div className="p-3 bg-rose-500/20 text-rose-500 rounded-lg font-bold">IRR</div>
                        <div>
                          <p className="font-bold text-lg">✦ Verbo SER (O mais cobrado)</p>
                          <p className="text-rose-600 dark:text-rose-400 font-black italic">"Sê tu, seja você, sejamos nós, sede vós, sejam vocês!"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AlertBox tipo="danger" titulo="Vossa Excelência e o Imperativo">
                    Pronomes de tratamento exigem sempre a **3ª pessoa**, mesmo que você esteja falando DIRETAMENTE com a pessoa. Logo: "Vossa Excelência, **fale** (você) agora" e nunca "**fala**" (tu).
                  </AlertBox>
                </div>
              )
            }]}
          />
        </section>

        {/* 6. Resumo e Multimídia M5 (Penúltimo) */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={6}
            title="Resumo e Multimídia"
            variant={mv[5]}
          />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <div className="w-full max-w-3xl">
                      <VideoModal
                        videoId="dQw4w9WgXcQ"
                        title="Verbos: O Motor da Oração"
                        duration="25:00"
                        thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000"
                      />
                    </div>
                  </div>
                ),
              },
              
            ]}
          />
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[5]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras atingiu um novo **patamar**', a palavra destacada é:"
          alternativas={[
            { letra: "A", texto: "Substantivo concreto", correta: false },
                { letra: "B", texto: "Substantivo abstrato", correta: true },
                { letra: "C", texto: "Adjetivo", correta: false },
                { letra: "D", texto: "Verbo", correta: false },
                { letra: "E", texto: "Advérbio", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod5}
            titulo="QUIZ: Verbo: O Motor da Oração"
            icone="⚡"
            numero={7}
            variant={mv[5]}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 6: ADVÉRBIO ── */}
      <TabsContent value="modulo-6" className="space-y-12 mt-12">
        <ModuleBanner numero={6}
          titulo="O Advérbio"
          descricao="O modificador invariável e as armadilhas das palavras camaleão."
          variant={mv[6]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O Advérbio: A Precisão da Circunstância"
            description="Domine a classe invariável que ajusta o sentido do verbo, do adjetivo e do próprio advérbio"
            variant={mv[6]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O advérbio é a classe de palavras invariável que tem por função modificar 
              o sentido de um verbo, de um adjetivo ou de outro advérbio, indicando uma 
              circunstância (tempo, lugar, modo, intensidade, etc.). Diferente do 
              adjetivo, que é o qualificador do nome, o advérbio é o qualificador da 
              ação ou da qualidade. Segundo a gramática normativa, o advérbio é 
              "cristalizado", ou seja, não sofre flexão de gênero ou número, mantendo 
              sua forma original independentemente do sujeito da frase. Esta 
              invariabilidade é a sua maior marca morfológica e o principal ponto de 
              atenção para evitar erros de concordância em registros formais.
            </p>

            <p>
              Para entender o advérbio de forma intuitiva, imagine o "ajuste fino" de 
              um rádio ou de um instrumento de precisão. Se o verbo diz *o que* está 
              acontecendo ("O sistema operou"), o advérbio gira o botão para dizer 
              *como* aconteceu ("O sistema operou LENTAMENTE" ou "O sistema operou 
              MUITO bem"). Ele move a agulha da nossa percepção, dando a exata medida 
              da realidade. Sem os advérbios, a nossa comunicação seria bruta e sem 
              nuances; não saberíamos se o perigo está "perto" ou "longe", se a 
              reunião foi "hoje" ou será "amanhã". Eles são as etiquetas de contexto 
              que ancoram a ação no mundo real.
            </p>

            <p>
              Muitos advérbios são formados pelo acréscimo do sufixo "-mente" a um 
              adjetivo feminino (rápida + mente). Quando em sequência, apenas o 
              último advérbio recebe o sufixo ("Agiu rápida e corajosamente"). Além 
              dos advérbios simples, temos as locuções adverbiais — conjuntos de duas 
              ou mais palavras que exercem a mesma função (de repente, às pressas, 
              com certeza). Um teste infalível para identificar o advérbio e não 
              confundi-lo com o adjetivo é o "Teste do Muito": se você puder trocar 
              pela palavra "MUITO" e ela não virar "MUITOS/MUITAS" em plural, você 
              está diante de um advérbio invariável.
            </p>

            <p>
              No ambiente de alta performance da Petrobras, o advérbio é a linguagem 
              da segurança e da logística. Instruções de segurança dependem de advérbios 
              de modo e tempo: "Acione o protocolo IMEDIATAMENTE", "Inspecione a 
              solda CUIDADOSAMENTE". O uso indevido de um advérbio de intensidade em 
              um relatório de pressão pode levar a decisões críticas. Advérbios como 
              "frequentemente", "periodicamente" e "anualmente" regem os cronogramas 
              de manutenção preventiva. Além disso, a diferenciação entre o adjetivo 
              adverbializado ("Falar CLARO") e o advérbio clássico ("Falar 
              CLARAMENTE") é comum no registro técnico-científico, buscando sempre 
              a menor ambiguidade possível no compartilhamento de informações entre 
              as equipes de engenharia.
            </p>

            <p>
              A CESGRANRIO adora as chamadas "Palavras Camaleão", como o termo "MEIO". 
              Eles testarão se você sabe que em "Ela está MEIO cansada" (advérbio = 
              invariável) o uso de "meia" é erro grave. A banca também cobra a 
              distinção entre o adjetivo (flexiona) e o advérbio (não flexiona) em 
              casos como "Comprei CARO os livros" (advérbio) vs "Os livros são CAROS" 
              (adjetivo). Outro tema forte é a classificação semântica das locuções 
              adverbiais em textos literários ou jornalísticos e as regras de 
              pontuação (uso da vírgula) para isolar advérbios deslocados no início 
              da frase. Dominar o advérbio é garantir que você não cairá nas 
              pontos de atenção de concordância nominal "sedutoras" que a banca prepara.
            </p>

            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200/50 dark:border-amber-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                O Teste do MUITO e as Palavras Camaleão
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-amber-700 dark:text-amber-300">O Teste Infalível</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Trabalham RÁPIDO (Trabalham muito). ✓</li>
                    <li>• São homens RÁPIDOS (muitos). = Adjetivo.</li>
                    <li>• Advérbio nunca pluraliza!</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-amber-700 dark:text-amber-300">O Camaleão "MEIO"</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Ela está MEIO cansada (Um pouco). ✓</li>
                    <li>• Comeu MEIA maçã (Metade - Numeral). ✓</li>
                    <li>• Meio + Adjetivo = INVARIÁVEL.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito e o Teste do 'Muito'"
            variant={mv[6]}
          />
          <p className="text-lg text-muted-foreground">
            O <strong>Advérbio</strong> é a classe <strong>invariável</strong>{" "}
            que modifica o verbo, o adjetivo ou outro advérbio.
          </p>
          <div className="text-center p-8 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-2xl border border-orange-500/10">
            <h3 className="text-xl font-bold mb-4">
              Estratégia: O Teste do 'Muito'
            </h3>
            <p className="text-muted-foreground">
              Troque a palavra por "MUITO". Se ela NÃO FLEXIONAR ("muitos"), é
              ADVÉRBIO.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Palavras Camaleão"
            variant={mv[6]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <p className="font-bold text-amber-500">MEIO (Advérbio)</p>
              <p className="text-lg italic">
                "Ela está <strong>meio</strong> cansada." (Um pouco)
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <p className="font-bold text-blue-500">MEIO (Numeral)</p>
              <p className="text-lg italic">
                "Comeu <strong>meia</strong> pizza." (Metade)
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Locuções Adverbiais e Classificação"
            variant={mv[6]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Advérbios em Detalhe"
            icone={<LuNavigation />}
            corIndicador="bg-amber-600"
            slides={[
              {
                titulo: "Locuções Adverbiais",
                icone: "🔗",
                conteudo:
                  "São grupos de palavras que funcionam como advérbio: 'de repente' (modo), 'de vez em quando' (frequência), 'com certeza' (afirmação), 'à noite' (tempo), 'por acaso' (dúvida), 'em vão' (modo). São invariáveis e exercem a mesma função do advérbio simples. Em prova, podem aparecer em questões pedindo substituição por um advérbio simples equivalente.",
              },
              {
                titulo: "Grau do Advérbio",
                icone: "📊",
                conteudo:
                  "O advérbio admite grau comparativo e superlativo, mas NUNCA flexiona em gênero ou número. Comparativo de superioridade: 'trabalha MAIS rapidamente'; de igualdade: 'trabalha TÃO rapidamente quanto'; de inferioridade: 'trabalha MENOS rapidamente'. Superlativo: 'trabalha muitíssimo rapidamente' ou 'trabalha muito, muito rapidamente'. O superlativo sintético (rapidíssimo) é correto quando modifica adjetivo.",
              },
              {
                titulo: "Advérbio vs Adjetivo — Distinção Técnica Fundamental",
                icone: "⚔️",
                conteudo:
                  "O advérbio modifica VERBO, ADJETIVO ou outro ADVÉRBIO e é invariável. O adjetivo modifica SUBSTANTIVO e concorda em gênero e número. 'Os funcionários trabalham RÁPIDO' → rápido = advérbio (invariável). 'Os funcionários são RÁPIDOS' → rápidos = adjetivo (flexiona). 'Falaram CLARO' vs 'Tom CLARO'. Use o teste do 'muito' para diferenciar: se troca por 'muito' sem virar 'muitos', é advérbio.",
              },
              {
                titulo: "Advérbios Interrogativos",
                icone: "❓",
                conteudo:
                  "São advérbios que introduzem perguntas ou orações subordinadas adverbiais: ONDE (lugar), QUANDO (tempo), COMO (modo), POR QUE (causa — separado, com acento na interrogativa direta e indireta). Atenção: PORQUE (junto, sem acento) = conjunção causal/explicativa; POR QUE (separado) = advérbio interrogativo; PORQUÊ (junto, com acento) = substantivo; POR QUÊ (separado, com acento) = final de frase.",
              },
            ]}
          />
          <Comparison
            title="BOM vs BEM — MAU vs MAL: A pontos de atenção da Cesgranrio"
            left={{
              title: "BOM / MAU (Adjetivos)",
              content: "Modificam SUBSTANTIVO\nConcordam em gênero e número\n\"É um BOM relatório\"\n\"Foi uma MÁ decisão\"\n\"São bons analistas\"",
              description: "Classes adjetivas",
              variant: "success",
            }}
            right={{
              title: "BEM / MAL (Advérbios)",
              content: "Modificam VERBO ou ADJETIVO\nSão invariáveis — nunca flexionam\n\"Ele trabalha BEM\"\n\"Ela se saiu MAL na prova\"\n\"Está BEM preparado\" (modifica adjetivo)",
              description: "Classes adverbiais",
              variant: "info",
            }}
          />
          <AlertBox tipo="danger" titulo="Erro Clássico: 'Ele é bem o funcionário certo'">
            Neste exemplo, BEM modifica o adjetivo 'certo' — correto! Mas "Ele é bom o funcionário" está errado, pois 'bom' não pode modificar 'funcionário' sem ser predicativo. Questões de reescrita da Cesgranrio frequentemente propõem trocar BEM por BOM (ou vice-versa) para testar se o candidato percebe a mudança de classe gramatical.
          </AlertBox>
        </section>



        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
            title="Resumo e Multimídia"
            variant={mv[6]}
          />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <div className="w-full max-w-3xl">
                      <VideoModal
                        videoId="dQw4w9WgXcQ"
                        title="Resumo: Advérbios"
                        duration="12:00"
                        thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "macete",
                label: "Síntese Estratégica Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-xl font-bold mb-4">
                      O Teste do 'MUITO'
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                    <p className="text-muted-foreground text-lg italic max-w-xl mx-auto">
                      "Troque por muito. Se não virar 'muitos', é Advérbio e não
                      varia!"
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[6]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras atingiu um novo **patamar**', a palavra destacada é:"
          alternativas={[
            { letra: "A", texto: "Substantivo concreto", correta: false },
                { letra: "B", texto: "Substantivo abstrato", correta: true },
                { letra: "C", texto: "Adjetivo", correta: false },
                { letra: "D", texto: "Verbo", correta: false },
                { letra: "E", texto: "Advérbio", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod6}
            titulo="QUIZ: Advérbio: A Circunstância"
            icone="🏃"
            numero={5}
            variant={mv[6]}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 7: PREPOSIÇÃO ── */}
      <TabsContent value="modulo-7" className="space-y-12 mt-12">
        <ModuleBanner numero={7}
          titulo="A Preposição"
          descricao="O elo de subordinação essencial para a regência e a crase."
          variant={mv[7]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Preposição: O Elo de Ferro"
            description="Entenda a classe que subordina termos e cria as pontes sintáticas do texto"
            variant={mv[7]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              A preposição é a classe de palavras invariável que liga dois termos 
              de uma oração, estabelecendo uma relação de subordinação em que o 
              segundo termo (consequente) completa ou explica o sentido do primeiro 
              (antecedente). Segundo a gramática normativa, a preposição é um "relator", 
              um termo que não possui vida própria mas sim a função de indicar a 
              direção do pensamento. Dividem-se em essenciais (a, ante, após, até, 
              com, contra, de, de, em, entre, para, perante, por, sem, sob, sobre, 
              trás) e acidentais (palavras de outras classes que atuam como 
              preposição, como "conforme", "segundo" ou "mediante").
            </p>

            <p>
              Para absorver o conceito intuitivamente, imagine a preposição como a 
              "junta de expansão" ou o "conector" em um sistema de tubulações. Os 
              tubos (palavras) são independentes, mas para que o fluido (a informação) 
              passe de um para outro, você precisa de um conector que defina a 
              pressão e o ângulo da conexão. Se você trocar a preposição, você 
              muda a direção da corrente: uma coisa é ir "A" algum lugar (destino), 
              outra é ir "DE" algum lugar (origem), ou "PARA" algum lugar 
              (finalidade). A preposição é o elo que garante que as palavras não 
              fiquem soltas na frase, mas sim integradas de forma lógica e hierárquica.
            </p>

            <p>
              As preposições podem aparecer puras ou em contração/combinação com 
              artigos e pronomes (de + o = do; em + este = neste; a + a = à). O 
              entendimento destas amálgamas é a base para o domínio da CRASÊ, que 
              nada mais é do que a fusão da preposição "a" com o artigo "a". Outro 
              tópico fundamental são as locuções prepositivas (abaixo de, a fim 
              de, de acordo com), que terminam sempre em uma preposição simples e 
              ampliam enormemente as possibilidades de conexão lógica no texto, 
              indicando desde causa até instrumento ou companhia.
            </p>

            <p>
              No contexto técnico da Petrobras, a preposição dita a RIGOROSA regência 
              dos verbos de segurança e operação. "Obedecer ÀS normas" (VTI + a) e 
              "Visar AO lucro" (VTI + a) são exemplos de como uma preposição correta 
              carrega a precisão do manual técnico. O uso equivocado de preposições 
              em ordens de compra ("Comprei DE" vs "Comprei PARA") pode gerar dúvidas 
              sobre estoque e custos. Em processos de refino, as preposições de 
              tempo e modo são vitais: "Misturar DURANTE 5 minutos", "Processar SOB 
              alta pressão". A preposição "SOB" (embaixo de) e "SOBRE" (em cima de) 
              não podem ser confundidas em esquemas de montagem e segurança de ativos.
            </p>

            <p>
              A CESGRANRIO foca na regência nominal e verbal, que nada mais é do que 
              saber qual preposição um "patrão" (nome ou verbo) exige. A banca adora 
              testar a troca de preposições que alteram o sentido da oração, como 
              a diferença entre "falar COM" (diálogo) e "falar DE" (assunto). Questões 
              de crase são essencialmente questões de preposição camuflada. Outro 
              ponto recorrente é o uso das preposições "DE" e "A" em nomes geográficos 
              (países e cidades) e a identificação de valores semânticos (o que a 
              preposição indica naquele contexto: posse, matéria, origem, etc.). Se 
              você dominar a preposição, você terá a chave para não errar regência e 
              crase, dois dos temas mais difíceis da banca.
            </p>

            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                O Princípio das Essenciais e a Regência
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">As 18 Essenciais</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono p-2 bg-blue-500/5 rounded">
                    A, ANTE, APÓS, ATÉ, COM, CONTRA, DE, DESDE, EM, ENTRE, PARA, PERANTE, POR, SEM, SOB, SOBRE, TRÁS.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Regência Crítica</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Aspirar A (Desejar)</li>
                    <li>• Obedecer A (Norma)</li>
                    <li>• Visar A (Objetivo)</li>
                    <li>• Implicar (VTD - Sem 'em')</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito e Contrações"
            variant={mv[7]}
          />
          <p className="text-lg text-muted-foreground">
            A <strong>Preposição</strong> liga dois termos, estabelecendo uma
            relação de dependência entre eles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <strong>DO</strong> (De + O)
            </div>
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <strong>NA</strong> (Em + A)
            </div>
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <strong>PELO</strong> (Per + O)
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Preposições Essenciais vs Acidentais"
            variant={mv[7]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Classificação das Preposições"
            icone={<LuLink2 />}
            corIndicador="bg-blue-600"
            slides={[
              {
                titulo: "Preposições Essenciais",
                icone: "🔑",
                conteudo:
                  "São palavras que funcionam EXCLUSIVAMENTE como preposição: a, ante, após, até, com, contra, de, desde, em, entre, para, perante, por, sem, sob, sobre, trás. Memorize: 'A ANTE APÓS ATÉ CON(TRA) DE(SDE) EM ENTRE PARA PERANTE POR SEM SOB SOBRE TRÁS'.",
              },
              {
                titulo: "Preposições Acidentais",
                icone: "🎭",
                conteudo:
                  "São palavras de outra classe que eventualmente exercem função de preposição: COMO (modo/comparação), CONFORME, SEGUNDO, DURANTE, EXCETO, FORA, SALVO, MENOS, VISTO (preposição composta), MEDIANTE, CONSOANTE. Ex: 'Agiu CONFORME o regulamento' — 'conforme' é preposição acidental.",
              },
              {
                titulo: "Valores Semânticos das Preposições",
                icone: "🌐",
                conteudo:
                  "As preposições carregam significados distintos: DE (origem, posse, matéria, causa): 'vou DE São Paulo'; PARA (destino, finalidade, beneficiário): 'trabalha PARA a Petrobras'; POR (causa, meio, preço, agente da passiva): 'foi aprovado PELO candidato'; COM (companhia, instrumento, modo): 'assinou COM caneta'; A (destino, distância, modo, tempo): 'chego A tempo'.",
              },
              {
                titulo: "Preposição e Crase",
                icone: "⚡",
                conteudo:
                  "A crase (à) ocorre quando há fusão da preposição A com o artigo feminino A ou com o pronome demonstrativo A. Regra básica: substitua a palavra feminina por uma masculina — se aparecer 'ao', há crase. 'Fui À Petrobras' → 'Fui AO Porto' (há crase). 'Fui A São Paulo' → 'Fui A Porto Alegre' (não há crase — cidades sem artigo).",
              },
            ]}
          />
          <AlertBox tipo="info" titulo="Locução Prepositiva — Diferença Importante">
            Locução prepositiva é um grupo de palavras com valor de preposição, terminando sempre em preposição simples: 'em vez de', 'a fim de', 'por causa de', 'apesar de', 'ao lado de', 'de acordo com'. A preposição final exige que o próximo termo seja seu complemento. Não confunda 'a fim de' (locução prepositiva = para) com 'afim' (adjetivo = semelhante, com a mesma finalidade).
          </AlertBox>
        </section>



        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Preposição e Regência — Os Verbos Mais Cobrados"
            variant={mv[7]}
          />
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            A <strong>regência verbal</strong> define qual preposição o verbo exige para ligar seu complemento. Errar a preposição na regência é um dos erros mais cobrados na Cesgranrio em questões de correção e reescrita.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { verbo: "ASSISTIR", prep: "A", ex: "Assisti AO relatório." },
              { verbo: "ASPIRAR (desejar)", prep: "A", ex: "Aspiro AO cargo." },
              { verbo: "OBEDECER", prep: "A", ex: "Obedeceu ÀS normas." },
              { verbo: "VISAR (almejar)", prep: "A", ex: "Visa AO lucro." },
              { verbo: "PREFERIR", prep: "A", ex: "Prefiro café AO chá." },
              { verbo: "AGRADAR (satisfazer)", prep: "A", ex: "Agradou AO diretor." },
              { verbo: "IMPLICAR (trazer)", prep: "EM", ex: "Implica EM risco." },
              { verbo: "RESIDIR", prep: "EM", ex: "Reside EM Brasília." },
            ].map(({ verbo, prep, ex }, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-xl border border-border flex flex-col gap-1">
                <span className="font-black text-slate-600 dark:text-slate-300 text-lg">{verbo} + <span className="text-amber-500">{prep}</span></span>
                <span className="text-lg text-muted-foreground italic">{ex}</span>
              </div>
            ))}
          </div>
          <AlertBox tipo="danger" titulo="Regência do Verbo ASSISTIR — Questão Clássica">
            ASSISTIR com sentido de 'ver/presenciar' é INDIRETO: exige preposição A: "Assisti AO acidente" (nunca "assisti o acidente"). ASSISTIR com sentido de 'prestar assistência' também é indireto: "O médico assistiu AO paciente". Apenas no sentido de 'morar' é intransitivo: "Assiste em São Paulo". A Cesgranrio frequentemente propõe reescritas que suprimem a preposição para verificar o conhecimento de regência.{" "}
            Outros verbos de regência clássica: AGRADAR (satisfazer) + A; IMPLICAR (envolver) + EM; PROCEDER (originar) + DE; PROCEDER (agir) = intransitivo.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
            title="Resumo e Multimídia"
            variant={mv[7]}
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Mapa de Regência",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Avançado"
                    materia="Português"
                    moduloNome="M7: Preposição"
                    images={[
                      {
                        title: "Preposição",
                        type: "Conector",
                        placeholderColor: "#3b82f6",
                      },
                    ]}
                  />
                ),
              },
              
            ]}
          />
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[7]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras atingiu um novo **patamar**', a palavra destacada é:"
          alternativas={[
            { letra: "A", texto: "Substantivo concreto", correta: false },
                { letra: "B", texto: "Substantivo abstrato", correta: true },
                { letra: "C", texto: "Adjetivo", correta: false },
                { letra: "D", texto: "Verbo", correta: false },
                { letra: "E", texto: "Advérbio", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod7}
            titulo="QUIZ: Preposição: O Elo de Ligação"
            icone="🔗"
            numero={5}
            variant={mv[7]}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 8: CONJUNÇÃO ── */}
      <TabsContent value="modulo-8" className="space-y-12 mt-12">
        <ModuleBanner numero={8}
          titulo="A Conjunção"
          descricao="Os conectivos que articulam as ideias e as orações."
          variant={mv[8]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Conjunção: A Engrenagem do Raciocínio"
            description="Domine a classe que conecta orações e estabelece as complexas relações lógicas do discurso"
            variant={mv[8]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              A conjunção é a classe de palavras invariável que une orações ou termos 
              de mesma função sintática, estabelecendo entre eles relações lógicas 
              de coordenação ou subordinação. Se a preposição liga palavras dentro da 
              oração, a conjunção liga as orações entre si para formar o período. 
              Morfologicamente, são classificadas em coordenativas (aditivas, 
              adversativas, alternativas, conclusivas e explicativas) e 
              subordinativas (causais, condicionais, consecutivas, comparativas, 
              conformativas, concessivas, temporais, finais e proporcionais). Elas 
              são os conectores mestres que definem a arquitetura do pensamento técnico 
              e jurídico.
            </p>

            <p>
              Para entender a conjunção de forma intuitiva, imagine que as orações 
              são peças de um quebra-cabeça e as conjunções são os "encaixes" que 
              decidem como essas peças se relacionam. Se o encaixe for de 
              "OPOSIÇÃO" (adversativa), a segunda peça vai na direção contrária da 
              primeira ("Estudou muito, MAS não passou"). Se o encaixe for de 
              "CONDIÇÃO" (condicional), a segunda peça só existe se a primeira for 
              verdade ("SE estudar, passará"). A conjunção é o componente que 
              decide se o seu texto é um empilhamento de fatos ou um argumento 
              lógico estruturado. Sem elas, falaríamos como robôs, sem nexos de 
              causualidade ou finalidade.
            </p>

            <p>
              O domínio das conjunções exige a memorização de tabelas de equivalência, 
              pois muitas conjunções diferentes podem expressar o mesmo valor 
              semântico (Mas = Porém = Contudo = Todavia). Outro ponto crucial é a 
              coordenação versus subordinação: as coordenadas ligam orações 
              independentes ("Fui, vi e venci"), enquanto as subordinadas criam 
              uma dependência de sentido ("Saí porque estava chovendo"). A 
              pontuação das conjunções também é rígida, especialmente com as 
              adversativas e conclusivas, exigindo vírgulas para marcar a 
              articulação das ideias no papel.
            </p>

            <p>
              No contexto decisório da Petrobras, a conjunção é a linguagem da 
              especificação e da segurança operacional. "SE houver queda de pressão, 
              ENTÃO acione o alarme" — aqui, a condicional define a vida ou a morte 
              da operação. Relatórios de falhas dependem de conjunções causais e 
              consecutivas para explicar por que algo deu errado e quais as 
              consequências: "O vazamento ocorreu POIS a junta falhou, DE MODO QUE 
              o sistema foi paralisado". Em contratos e NRs, as conjunções 
              conformativas ("CONFORME a norma 12...") e concessivas ("AINDA QUE a 
              pressão suba...") regem os limites da conformidade técnica e legal 
              da companhia.
            </p>

            <p>
              Para a CESGRANRIO, a conjunção é a soberana das provas de Língua 
              Portuguesa. A banca adora questões de "Substituição de Conectivos", onde 
              você deve trocar uma conjunção por outra mantendo o sentido original. O 
              par favorito deles é a troca de "EMBORA" (concessiva) por "CONQUANTO" 
              ou "MALGRADO", testando o vocabulário erudito do candidato. Outra 
              pontos de atenção clássica é a diferença entre a conjunção causal e a explicativa, 
              ou entre a consecutiva ("tão... que") e a comparativa ("como..."). 
              Identificar o sentido correto do "COMO" (que pode ser causa, conformidade 
              ou comparação) é o teste definitivo para quem quer fechar a prova de 
              português da banca.
            </p>

            <div className="bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 dark:from-emerald-950/30 dark:to-indigo-950/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                Equivalências de Avançado (CESGRANRIO)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-300">Concessivas (O Desafio)</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Embora = Conquanto</li>
                    <li>• Ainda que = Posto que</li>
                    <li>• Malgrado = Apesar de que</li>
                    <li>• (Pedem Modo Subjuntivo)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-300">Causais (O Porquê)</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Porque = Visto que</li>
                    <li>• Já que = Uma vez que</li>
                    <li>• Porquanto = Como (início)</li>
                    <li>• (Indicam o motivo real)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Coordenativas vs Subordinativas"
            variant={mv[8]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-indigo-500">Coordenativas</h4>
              <p className="text-lg text-muted-foreground italic">
                Adição, Oposição, Alternância, Conclusão, Explicação.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-emerald-500">Subordinativas</h4>
              <p className="text-lg text-muted-foreground italic">
                Causa, Concessão, Condição, Finalidade, Tempo, etc.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Conjunções Coordenativas em Detalhe"
            variant={mv[8]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Os 5 Tipos Coordenativos"
            icone={<LuLink2 />}
            corIndicador="bg-emerald-600"
            slides={[
              {
                titulo: "Aditivas (Adição)",
                icone: "➕",
                conteudo:
                  "Ligam orações com sentido de adição: E, NEM (= e não), TAMPOUCO, NÃO SÓ... MAS TAMBÉM, BEM COMO. Atenção: quando 'e' une sujeito simples na 3ª pessoa, o verbo vai para o plural: 'O gerente e o analista CHEGARAM'. Com sujeitos sinônimos, pode ficar no singular.",
              },
              {
                titulo: "Adversativas (Oposição)",
                icone: "⚔️",
                conteudo:
                  "Ligam orações com sentido de oposição ou contraste: MAS, PORÉM, CONTUDO, TODAVIA, ENTRETANTO, NO ENTANTO, SEM EMBARGO. Estratégia de Identificação: todas as adversativas (exceto MAS) podem vir no meio da oração: 'Estudou muito; não passou, porém.' A vírgula antes dessas conjunções é obrigatória.",
              },
              {
                titulo: "Alternativas (Alternância)",
                icone: "🔀",
                conteudo:
                  "Indicam alternância, escolha ou exclusão: OU, ORA...ORA, QUER...QUER, SEJA...SEJA, JÁ...JÁ. Com 'ou' de sentido excludente, o verbo concorda com o sujeito mais próximo: 'O gerente ou os técnicos DECIDIRÃO'. Com sentido de adição (ou = e), o verbo vai para o plural.",
              },
              {
                titulo: "Conclusivas (Conclusão)",
                icone: "✅",
                conteudo:
                  "Introduzem conclusão: LOGO, PORTANTO, POIS (posposto ao verbo), POR ISSO, POR CONSEGUINTE, ASSIM, ENTÃO (posposto). Atenção fundamental: 'POIS' como conjunção conclusiva vem DEPOIS do verbo: 'Estudou muito; passou, POIS.' Como causal/explicativa, vem ANTES: 'POIS estudou muito, passou.'",
              },
              {
                titulo: "Explicativas (Explicação)",
                icone: "💡",
                conteudo:
                  "Ligam a explicação de um fato: POIS (anteposto), PORQUE, QUE, PORQUANTO. Diferença crucial cobrada em prova: conjunção CAUSAL (subordinativa) indica a causa real de algo ('Passou PORQUE estudou' = a causa do êxito é o estudo); conjunção EXPLICATIVA (coordenativa) justifica um fato ('Estude, PORQUE a prova está próxima' = argumento de convencimento).",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Conjunções Subordinativas — O Mapa Semântico"
            variant={mv[8]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <LuZap className="h-10 w-10 text-indigo-400" />
                  <span className="font-black text-xl text-indigo-400">EMBORA / APESAR DE</span>
                  <p className="text-lg text-muted-foreground">Que tipo de relação indicam?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 p-2 text-lg">
                  <p className="text-indigo-400 font-black text-lg">CONCESSÃO</p>
                  <hr className="border-border/50" />
                  <p>Admite a hipótese adversa mas não cede: "Embora cansado, concluiu o relatório."</p>
                  <hr className="border-border/50" />
                  <p className="text-lg text-muted-foreground">Modo Subjuntivo obrigatório com EMBORA.</p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <LuZap className="h-10 w-10 text-emerald-400" />
                  <span className="font-black text-xl text-emerald-400">SE / CASO / DESDE QUE</span>
                  <p className="text-lg text-muted-foreground">Que tipo de relação indicam?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 p-2 text-lg">
                  <p className="text-emerald-400 font-black text-lg">CONDICIONAL</p>
                  <hr className="border-border/50" />
                  <p>Estabelece condição para o fato principal: "Se a meta for atingida, haverá bônus."</p>
                  <hr className="border-border/50" />
                  <p className="text-lg text-muted-foreground">CASO e DESDE QUE também pedem subjuntivo.</p>
                </div>
              }
            />
          </div>
          <AlertBox tipo="warning" titulo="Pontuação com Conjunções — Regra de Ouro">
            Conjunções COORDENATIVAS adversativas e conclusivas EXIGEM vírgula antes: "Estudou muito, mas não passou." Conjunções SUBORDINATIVAS adverbiais antecipadas (antes da principal) também EXIGEM vírgula: "Porque estudou muito, foi aprovado." Quando a subordinada vem após a principal, a vírgula é opcional: "Foi aprovado porque estudou." A Cesgranrio cobra essa distinção em questões de pontuação e reescrita.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M8 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
            title="Resumo e Multimídia"
            variant={mv[8]}
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Mnemônico CIA P",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl border border-indigo-500/10">
                    <h3 className="text-xl font-bold mb-4">
                      Invariáveis: CIA P
                    </h3>
                    <div className="text-7xl my-8">🕵️‍♂️ 🔒</div>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto font-mono">
                      <strong>C</strong>onjunção, <strong>I</strong>nterjeição,{" "}
                      <strong>A</strong>dvérbio e <strong>P</strong>reposição.
                    </p>
                  </div>
                ),
              },
              
            ]}
          />
        </section>



        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[8]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras atingiu um novo **patamar**', a palavra destacada é:"
          alternativas={[
            { letra: "A", texto: "Substantivo concreto", correta: false },
                { letra: "B", texto: "Substantivo abstrato", correta: true },
                { letra: "C", texto: "Adjetivo", correta: false },
                { letra: "D", texto: "Verbo", correta: false },
                { letra: "E", texto: "Advérbio", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod8}
            titulo="QUIZ: Conjunção: A Engrenagem"
            icone="🔗"
            numero={5}
            variant={mv[8]}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 9: INTERJEIÇÃO ── */}
      <TabsContent value="modulo-9" className="space-y-12 mt-12">
        <ModuleBanner numero={9}
          titulo="A Interjeição"
          descricao="A expressão das emoções e as regras sutis de pontuação."
          variant={mv[9]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Interjeição: O Clamor da Linguagem"
            description="Entenda a classe invariável que vocaliza emoções, estados de espírito e apelos diretos"
            variant={mv[9]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              A interjeição é a classe de palavras invariável que exprime emoções, 
              sentimentos, estados de espírito, ou que serve para fazer apelos ao 
              interlocutor. Diferente das outras classes, a interjeição não possui uma 
              função sintática dentro da oração; ela é, na verdade, uma "oração em 
              miniatura", um bloco sonoro autônomo que condensa uma carga emocional 
              completa. Segundo a semântica clássica, a interjeição é a forma mais 
              primitiva e direta da comunicação humana, funcionando como umaerupção 
              vocal do sujeito diante de um estímulo externo ou interno.
            </p>

            <p>
              Para absorver o conceito intuitivamente, imagine a interjeição como o 
              "alarme" ou a "buzina" do nosso sistema de comunicação. Quando você 
              bate o pé na quina de um móvel e grita "AI!", esse som não precisa de 
              sujeito ou predicado para ser entendido: a mensagem de "dor aguda" foi 
              entregue instantaneamente. As interjeições são bipes emocionais que 
              economizam o processamento lógico do cérebro para focar na reação 
              imediata. Elas são as batidas do coração transformadas em sílabas, 
              atuando onde a gramática estruturada é lenta demais para a rapidez 
              do sentimento.
            </p>

            <p>
              Morfologicamente, as interjeições são invariáveis e frequentemente 
              acompanhadas de ponto de exclamação, que marca a tônica emocional da 
              vocalização. Além das palavras simples (Uau!, Psit!, Oh!), temos as 
              locuções interjetivas — grupos de palavras que funcionam como uma 
              unidade expressiva (Meu Deus!, Ora bolas!, Puxa vida!). A mesma 
              interjeição pode ter sentidos opostos dependendo da entonação e do 
              contexto: o "Ah!" pode expressar alegria ("Ah, que bom!"), dor ("Ah, 
              que pena!") ou até ironia ("Ah, sei...").
            </p>

            <p>
              No contexto operacional e de segurança da Petrobras, a interjeição 
              (ou seu valor equivalente em ordens curtas) é a linguagem da 
              emergência. Em uma refinaria ou plataforma, interjeições de aviso e 
              apelo são sinais vitais: "ATENÇÃO!", "CUIDADO!", "PARE!". Embora o 
              manual técnico evite interjeições subjetivas, o treinamento de 
              segurança utiliza termos de impacto interjetivo para garantir 
              reações automáticas das equipes. Identificar a carga emocional em 
              diálogos de rádio ou em comunicações de crise é fundamental para 
              interpretar corretamente a gravidade de uma situação reportada em 
              campo.
            </p>

            <p>
              Para a CESGRANRIO, a interjeição aparece principalmente em questões de 
              Efeitos de Sentido. O examinador quer saber o que aquele "Oh!" ou 
              "Puxa!" acrescenta à intenção do autor do texto. A banca também costuma 
              cobrar as regras de pontuação associadas: se a vírgula deve vir 
              depois da interjeição ("Ai, que dor!") ou se o ponto de exclamação é 
              suficiente ("Ai! Que dor!"). Em questões de interpretação de textos 
              literários ou crônicas, a identificação dos sentimentos de ironia, 
              humor ou desespero através das interjeições é o que define o acerto 
              da questão.
            </p>

            <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200/50 dark:border-rose-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                O Camaleão do Sentimento: "AH!"
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-rose-700 dark:text-rose-300">Contexto e Sentido</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Ah! (Alegria/Alívio)</li>
                    <li>• Ah! (Espanto/Susto)</li>
                    <li>• Ah! (Desprezo/Ironia)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-rose-700 dark:text-rose-300">Locuções Comuns</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Cruz Credo!</li>
                    <li>• Vale-me Deus!</li>
                    <li>• Quem dera!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Classificação por Sentimento e Locuções Interjetivas"
            variant={mv[9]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Tipos de Interjeição"
            icone={<LuMusic />}
            corIndicador="bg-rose-600"
            slides={[
              {
                titulo: "Interjeições de Alegria / Satisfação",
                icone: "😄",
                conteudo:
                  "Expressam contentamento e euforia: OH!, AH!, UHU!, ÓTIMO!, BRAVO!, VIVA!, HURRA!, OBA!. São geralmente seguidas de ponto de exclamação. Em textos formais, raramente aparecem; em títulos jornalísticos de opinião, podem surgir para marcar tom emocional.",
              },
              {
                titulo: "Interjeições de Dor / Lamento",
                icone: "😢",
                conteudo:
                  "Expressam sofrimento, pesar ou arrependimento: AI!, UI!, AH!, OH!, COITADO!, INFELIZMENTE!. Note que 'AH!' pode ser de alegria OU dor — o contexto determina o sentido. Em questões de interpretação, o contexto é fundamental para identificar o valor semântico.",
              },
              {
                titulo: "Interjeições de Ordem / Apelo",
                icone: "📢",
                conteudo:
                  "Expressam chamada, ordem ou pedido: PSIU!, ALÔ!, EI!, OLÁ!, TCHAU!, SILÊNCIO!, SHHH!. São interjeições com função apelativa (conativa). Em textos instrucionais ou de comunicação corporativa, o uso de interjeições é inadequado — isso pode ser cobrado em questões de adequação de registro.",
              },
              {
                titulo: "Locuções Interjetivas",
                icone: "🔗",
                conteudo:
                  "São grupos de palavras com valor de interjeição: 'Meu Deus!', 'Que pena!', 'Ora bolas!', 'Graças a Deus!', 'Puxa vida!', 'Nossa Senhora!'. Funcionam como unidades — mesmo sendo frases, expressam emoção de forma unitária. Importante: a locução interjetiva é invariável e indivisível em contexto.",
              },
            ]}
          />
          <AlertBox tipo="info" titulo="Interjeição vs Substantivo Abstrato — Diferença Sutil">
            'Silêncio!' como interjeição indica uma ordem imediata (função apelativa). 'O silêncio da sala era absoluto' — aqui, 'silêncio' é substantivo abstrato (função referencial). A mesma palavra, dependendo do contexto e da função, pertence a classes diferentes. Em prova, identifique sempre a função que a palavra exerce na frase.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M9 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
          variant={mv[9]}
        />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Emoção",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Avançado"
                    materia="Português"
                    moduloNome="M9: Interjeição"
                    images={[
                      {
                        title: "Interjeição",
                        type: "Expressão",
                        placeholderColor: "#ec4899",
                      },
                    ]}
                  />
                ),
              },
              
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Interjeição no Texto — Análise de Efeitos de Sentido"
            variant={mv[9]}
          />
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            Na Cesgranrio, a interjeição aparece principalmente em questões de <strong>interpretação de texto</strong> e <strong>análise de efeitos de sentido</strong>. O examinador quer saber qual emoção ou intenção comunicativa a interjeição expressa no contexto específico.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <h4 className="font-bold text-emerald-600 text-lg">Função Expressiva (Emotiva)</h4>
              <p className="text-lg text-muted-foreground">A interjeição exprime o estado emocional do falante.</p>
              <p className="text-lg italic">"Ah! Que relatório brilhante!" → alegria/satisfação</p>
              <p className="text-lg italic">"Ai! Que resultado terrível." → dor/lamento</p>
            </div>
            <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-3">
              <h4 className="font-bold text-blue-600 text-lg">Função Apelativa (Conativa)</h4>
              <p className="text-lg text-muted-foreground">A interjeição provoca uma ação no interlocutor.</p>
              <p className="text-lg italic">"Psiu! Não interrompa." → ordem de silêncio</p>
              <p className="text-lg italic">"Olá! Pode entrar." → chamamento/saudação</p>
            </div>
          </div>
          <AlertBox tipo="success" titulo="Dica de Prova — Interjeição em Questões de Efeito de Sentido">
            Quando a questão pede o "efeito de sentido" de uma interjeição, identifique: (1) o contexto emocional da cena; (2) a relação entre falante e interlocutor (hierarquia? intimidade?); (3) a pontuação usada (! para emoção intensa, , para emoção suave). Nunca responda pela forma da palavra em isolamento — o sentido está no contexto.
          </AlertBox>
        </section>



        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[9]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras atingiu um novo **patamar**', a palavra destacada é:"
          alternativas={[
            { letra: "A", texto: "Substantivo concreto", correta: false },
                { letra: "B", texto: "Substantivo abstrato", correta: true },
                { letra: "C", texto: "Adjetivo", correta: false },
                { letra: "D", texto: "Verbo", correta: false },
                { letra: "E", texto: "Advérbio", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod9}
            titulo="QUIZ: Interjeição: A Emoção"
            icone="⚡"
            numero={6}
            variant={mv[9]}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 10: NUMERAL ── */}
      <TabsContent value="modulo-10" className="space-y-12 mt-12">
        <ModuleBanner numero={10}
          titulo="O Numeral"
          descricao="Quantidades, ordens e a pontos de atenção do numeral dual."
          variant={mv[10]}
        />

        {/* ★ RICH INTRO SECTION - PADRÃO ULTIMATE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O Numeral: A Precisão Quantitativa"
            description="Explore a classe que define quantidades exatas, ordens, frações e multiplicações"
            variant={mv[10]}
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              O numeral é a classe de palavras que indica uma quantidade exata de seres 
              ou o lugar que eles ocupam em uma determinada série. Diferente dos 
              adjetivos indefinidos (muitos, poucos), o numeral é preciso e objetivo. 
              Classificam-se em cardinais (indicação de número absoluto: um, dois), 
              ordinais (indicação de posição: primeiro, vigésimo), multiplicativos 
              (indicação de aumento proporcional: dobro, triplo) e fracionários 
              (indicação de divisão: metade, terço). O numeral é a espinha dorsal de 
              qualquer discurso técnico ou científico, onde a imprecisão é um luxo 
              que não se pode permitir.
            </p>

            <p>
              Para absorver o conceito intuitivamente, pense no numeral como a 
              "régua" ou o "balancete" da linguagem. Se o substantivo nos dá o objeto 
              e o adjetivo nos dá a cor, o numeral nos dá o inventário. Sem os 
              numerais, não saberíamos quantos somos, quanto ganhamos ou qual a 
              ordem de chegada em uma competição. Eles trazem o rigor matemático 
              para dentro da estrutura poética e pragmática da língua, permitindo 
              que o caos da realidade seja organizado em listas, cronogramas e 
              arquiteturas coordenadas. O numeral é o GPS da informação exata.
            </p>

            <p>
              Morfologicamente, alguns numerais flexionam em gênero (um/uma, dois/duas, 
              centenas) e número (milhão/milhões, bilhão/bilhões), enquanto muitos 
              cardinais são invariáveis (três, dez, cem). Os numerais ordinais 
              concordam sempre com o substantivo a que se referem (primeira edição, 
              décimos colocados). Um ponto de atenção especial são os numerais 
              coletivos (dúzia, milhar, quarentena, biênio), que são substantivos com 
              valor numérico exato e exercem funções sintáticas próprias de sua 
              classe.
            </p>

            <p>
              Na Petrobras, o numeral é o coração dos dados de produção e segurança. 
              Métricas de extração de petróleo (barris por dia), profundidade de 
              poços (milhares de metros), cronogramas de paradas de manutenção (o 
              terceiro trimestre) e escalas de trabalho (o regime 14x21) dependem 
              da precisão absoluta desta classe. Um erro no uso do numeral 
              multiplicativo em um cálculo de carga pode inviabilizar uma logística 
              inteira. Além disso, o numeral "AMBOS" (numeral dual) é vital para 
              expressar a totalidade de dois elementos técnicos sem sombra de 
              dúvida ("Ambas as válvulas devem ser fechadas").
            </p>

            <p>
              Para a CESGRANRIO, o numeral aparece no topo das pontos de atenção de escrita 
              formal. A banca testará se você sabe a diferença entre o artigo "UM" 
              (quando generaliza) e o numeral "UM" (quando quantifica). Outro tema 
              recorrente é a leitura e escrita de numerais ordinais grandes 
              (quinquagésimo, septuagésimo) e as regras de concordância de numerais 
              coletivos como "milhares" e "milhões", que são sempre masculinos ("Os 
              dois milhões de pessoas", nunca "As duas milhões"). A escrita de 
              numerais em títulos de reis e papas, ou em capítulos de normas, também 
              é cobrada para testar a formalidade do candidato diante dos símbolos 
              numéricos.
            </p>

            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200/50 dark:border-violet-800/50 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-lg">
                Manual de Numeração Técnica
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="font-semibold text-violet-700 dark:text-violet-300">Concordância de Gigantes</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Milhões / Bilhares (Masculinos).</li>
                    <li>• "As duas milhões" - ERRO. ✗</li>
                    <li>• "Os dois milhões" - CERTO. ✓</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-violet-700 dark:text-violet-300">O Numeral "Ambos"</p>
                  <ul className="space-y-1 mt-2 text-xl text-foreground/85 leading-relaxed">
                    <li>• Significa: "os dois" e "as duas".</li>
                    <li>• Exige artigo: ambos OS poços.</li>
                    <li>• É um numeral de dualidade.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Cardinais vs Ordinais"
            variant={mv[10]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted/30 rounded-xl">
              <p className="font-bold">Cardinais (Quantidade)</p>
              <p className="text-lg">Um, dois, três... mil.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-xl">
              <p className="font-bold">Ordinais (Ordem)</p>
              <p className="text-lg">Primeiro, décimo, centésimo.</p>
            </div>
          </div>
          <AlertBox tipo="warning" titulo="Numeral Dual">
            "Ambos/Ambas" são numerais duais e exigem o artigo: "Ambos os
            funcionários saíram."
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Multiplicativos, Fracionários e Coletivos"
            variant={mv[10]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Todos os Tipos de Numeral"
            icone={<LuHash />}
            corIndicador="bg-violet-600"
            slides={[
              {
                titulo: "Multiplicativos",
                icone: "✖️",
                conteudo:
                  "Indicam multiplicação ou proporção: simples (dobro, triplo, quádruplo) e compostos (décuplo, cêntuplo). Em contextos formais, use as formas multiplicativas: 'A produção foi o dobro do esperado.' Curiosidade: 'duplo' e 'dupla' são formas concorrentes de 'dobro' — ambas corretas.",
              },
              {
                titulo: "Fracionários",
                icone: "➗",
                conteudo:
                  "Indicam fração, parte de um todo: metade, terço, quarto, quinto... décimo, centésimo, milésimo. Para frações maiores que 2, usa-se o ordinal como denominador: '2/3' = dois terços; '3/4' = três quartos. 'Metade' é substantivo, não numeral fracionário estrito, mas tem valor fracionário.",
              },
              {
                titulo: "Numerais Coletivos",
                icone: "👥",
                conteudo:
                  "Indicam quantidade determinada de seres: par (2), trio (3), quarteto (4), quinteto (5), dezena (10), dúzia (12), vintena (20), centena (100), milhar (1000). São substantivos coletivos com valor numérico. 'Uma dúzia de relatórios' — o numeral coletivo é o núcleo e o verbo concorda com ele: 'Uma dúzia de relatórios FOI entregue'.",
              },
              {
                titulo: "Concordância dos Ordinais com Títulos",
                icone: "👑",
                conteudo:
                  "Até décimo, usa-se o ordinal antes do nome: 'o nono andar', 'o quinto parágrafo'. A partir de 11º, pode-se usar cardinal depois do nome: 'o capítulo 11' ou 'o décimo primeiro capítulo'. Com títulos de reis e papas: 'Dom Pedro II' (lê-se 'Dom Pedro Segundo'), 'João Paulo II' (lê-se 'João Paulo Segundo'). A CESGRANRIO pode pedir essa distinção em questões de uso da língua.",
              },
            ]}
          />
          <Comparison
            title="Numeral vs Pronome Indefinido vs Artigo Indefinido"
            left={{
              title: "Numeral Cardinal",
              content: "Quantidade exata e determinada\n\"Há TRÊS candidatos aprovados\"\n\"Comprei DOIS relatórios\"\nPode ser substituído por algarismo",
              description: "Numerais precisos",
              variant: "success",
            }}
            right={{
              title: "Pronome Indefinido",
              content: "Quantidade vaga, imprecisa\n\"ALGUNS candidatos foram aprovados\"\n\"MUITOS relatórios chegaram\"\nNão pode ser substituído por algarismo",
              description: "Quantidades vagas",
              variant: "warning",
            }}
          />
          <AlertBox tipo="danger" titulo="Concordância: Numeral + Substantivo Feminino">
            Os numerais 'um/uma' e 'dois/duas' concordam em gênero com o substantivo: 'DUAS plataformas', 'UM campo de extração'. Os demais cardinais são invariáveis: 'TRÊS plataformas', 'CINCO campos'. Erros de concordância com 'dois/duas' são frequentes em provas: "as DUAS propostas" (correto) vs "os DOIS propostas" (erro gravíssimo).
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Revisão Express — As 10 Classes de Palavras"
            variant={mv[10]}
          />
          <ContentAccordion
            mode="stacked"
            titulo="Consolidação Final"
            icone={<LuBrain />}
            corIndicador="bg-violet-600"
            slides={[
              {
                titulo: "Classes Variáveis (flexionam)",
                icone: "🔄",
                conteudo:
                  "SUBSTANTIVO: nomeia seres (gênero, número, grau). ADJETIVO: qualifica substantivos (gênero, número, grau). ARTIGO: determina o substantivo (gênero e número). PRONOME: substitui ou acompanha substantivo (gênero, número, caso, pessoa). VERBO: exprime ação/estado (modo, tempo, número, pessoa, voz). NUMERAL: quantifica (gênero e número nos ordinais e em um/dois).",
              },
              {
                titulo: "Classes Invariáveis (não flexionam)",
                icone: "🔒",
                conteudo:
                  "ADVÉRBIO: modifica verbo, adjetivo ou advérbio. PREPOSIÇÃO: conecta termos em relação de subordinação. CONJUNÇÃO: conecta orações ou termos de valor equivalente. INTERJEIÇÃO: exprime emoção ou apelo. Mnemônico: CIA P = Conjunção, Interjeição, Advérbio, Preposição — as quatro invariáveis.",
              },
              {
                titulo: "Questões de Prova: O que a Cesgranrio mais cobra",
                icone: "🎯",
                conteudo:
                  "1) Derivação imprópria (substantivação pelo artigo). 2) Advérbio vs adjetivo (BEM vs BOM). 3) Pronome oblíquo tônico (para mim, entre nós). 4) Colocação pronominal (próclise, mesóclise, ênclise). 5) Pronome relativo cujo (sem artigo depois). 6) Concordância com verbos impessoais (haver=existir → singular). 7) Participio passado abundante (aceito/aceitado). 8) Conjunção adversativa vs concessiva. 9) Preposição e crase. 10) Pronome de tratamento (Vossa Excelência → concordância 3ª pessoa).",
              },
            ]}
          />
          <AlertBox tipo="success" titulo="Dicas de Prova — Cesgranrio">
            Na morfologia da Cesgranrio, sempre pergunte: (1) Qual a CLASSE da palavra no contexto? (2) Qual a FUNÇÃO sintática? Uma mesma forma pode ser substantivo, adjetivo ou advérbio dependendo do contexto. O artigo, quando presente, "congela" qualquer palavra na classe substantivo. Verbos impessoais (haver existencial, fazer temporal, chover, nevar) ficam sempre na 3ª pessoa do singular. Reescrita que muda a classe da palavra muda o significado — classifique antes de responder!{" "}
            Bons estudos e boa prova! Você está preparado para dominar a morfologia da Cesgranrio.
          </AlertBox>
        </section>





        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[10]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras atingiu um novo **patamar**', a palavra destacada é:"
          alternativas={[
            { letra: "A", texto: "Substantivo concreto", correta: false },
                { letra: "B", texto: "Substantivo abstrato", correta: true },
                { letra: "C", texto: "Adjetivo", correta: false },
                { letra: "D", texto: "Verbo", correta: false },
                { letra: "E", texto: "Advérbio", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Patamar, neste contexto, indica um estado ou nível atingido, sendo um substantivo abstrato." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod10}
            titulo="QUIZ: Numeral: A Quantidade"
            icone="🔢"
            numero={6}
            variant={mv[10]}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </section>

        {/* CONCLUSÃO FINAL DA AULA */}
        <section className="mt-24 mb-12">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-800/30 rounded-3xl p-12 text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -ml-16 -mb-16 group-hover:bg-purple-500/20 transition-all duration-700" />

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
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white border-0 font-black text-xl px-16 py-10 rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300 uppercase tracking-widest flex items-center gap-4 mx-auto"
              >
                Concluir Aula de Avançado <LuCheck className="text-2xl" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <span className="text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Premium Content
              </span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                LMS Quest AI
              </span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Padrao Cesgranrio
              </span>
            </div>
          </div>
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}
