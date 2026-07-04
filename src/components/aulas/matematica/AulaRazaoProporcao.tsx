"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  FlipCard,
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaTemplate,
  ModuleSectionHeader,
  FunctionGraph,
  type FunctionPlot,
  QuestaoResolvidaStepByStep} from "../shared";

import { getModuleVariant } from "@/lib/moduleColors";

import {
  LuBookOpen,
  LuMap,
  LuTrendingUp,
  LuTrendingDown,
  LuScale,
  LuDivide,
  LuCalculator,
  LuGauge,
  LuLink,
  LuArrowRightLeft,
} from "react-icons/lu";

import {
  QUIZ_M1_RAZAO,
  QUIZ_M2_PROPORCAO,
  QUIZ_M3_REGRA3,
  QUIZ_M4_DIVISAO,
  QUIZ_M5_PROPORCOES,
  QUIZ_M6_DIVISAO_PROPORCIONAL,
  QUIZ_M7_PROPORCAO_CONTINUA,
  QUIZ_M8_ESCALAS_AVANCADAS,
  QUIZ_M9_APLICACOES_PETROBRAS,
  QUIZ_M10_SIMULADO_FINAL,
} from "./data/razao-proporcao-quizzes";

// ── COMPONENT ───────────────────────────────────────────────────────────

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

export default function AulaRazaoProporcao({
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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  const [quizRazao] = useState(() => getRandomQuestions(QUIZ_M1_RAZAO, 6));
  const [quizProporcao] = useState(() =>
    getRandomQuestions(QUIZ_M2_PROPORCAO, 6),
  );
  const [quizRegra3] = useState(() => getRandomQuestions(QUIZ_M3_REGRA3, 6));
  const [quizDivisao] = useState(() => getRandomQuestions(QUIZ_M4_DIVISAO, 5));
  const [quizGrandezas] = useState(() =>
    getRandomQuestions(QUIZ_M5_PROPORCOES, 6),
  );
  const [quizDivisaoAdv] = useState(() =>
    getRandomQuestions(QUIZ_M6_DIVISAO_PROPORCIONAL, 6),
  );
  const [quizContinua] = useState(() =>
    getRandomQuestions(QUIZ_M7_PROPORCAO_CONTINUA, 6),
  );
  const [quizEscalas] = useState(() =>
    getRandomQuestions(QUIZ_M8_ESCALAS_AVANCADAS, 6),
  );
  const [quizPetrobras] = useState(() =>
    getRandomQuestions(QUIZ_M9_APLICACOES_PETROBRAS, 6),
  );
  const [quizFinal] = useState(() =>
    getRandomQuestions(QUIZ_M10_SIMULADO_FINAL, 8),
  );

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Razão" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Proporção" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Regra de 3 Simples" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Divisão Proporcional" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Grandezas D/I" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Div. Prop. Avançada" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Proporção Contínua" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Escalas e Mapas" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Petrobras" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
  ];

  const totalModulos = MODULE_DEFS.length;

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));
      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      } else {
        onComplete?.();
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      updateCompletedModules(Array.from(s));
    }
  }, [currentProgress, totalModulos]);

    


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
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 1 — RAZÃO: A COMPARAÇÃO PRIMITIVA                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1">
        <ModuleBanner numero={1}
          titulo="Razão: A Comparação Primitiva"
          descricao="Domine o conceito fundamental que está por trás de densidades, escalas e produtividades industriais."
           variant={mv[1]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm text-justify text-2xl space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Razão: A Fundação da Comparação Quantitativa"
              description="De densidades a escalas — o quociente que permeia toda a matemática industrial"
              variant={mv[1]}
            />

            <div className="space-y-6 text-xl text-foreground/85 text-justify leading-relaxed">
              <p>
                A razão é a operação matemática mais primitiva e ao mesmo tempo
                mais versátil da vida industrial. Formalmente, razão é a
                comparação entre duas quantidades através da divisão de uma pela
                outra, expressa como um quociente. Quando um engenheiro da
                Petrobras precisa reportar que uma plataforma processou 500.000
                barris de petróleo bruto em 24 horas e obteve 350.000 barris de
                derivados, ele imediatamente reconhece a razão de rendimento:
                350.000 ÷ 500.000 = 0,70 (ou 70%). Essa razão não é meramente um
                número; ela encapsula a eficiência operacional, a viabilidade
                econômica e o desempenho do equipamento. A razão, portanto, é a
                linguagem fundamental pela qual quantidades se relacionam.
              </p>

              <p>
                Historicamente, a razão existe desde os tempos babilônicos, onde
                artesãos precisavam comparar comprimentos em padrões de
                construção. Na Grécia Antiga, Euclides dedicou livros inteiros
                da sua obra "Elementos" ao estudo de razões e proporções,
                reconhecendo sua universalidade. No contexto moderno — seja em
                engenharia, economia, química ou biologia — a razão permanece
                como o instrumento de eleição para expressar relações entre
                magnitudes. Quando um técnico afirma que a densidade de um
                fluido é 840 kg/m³, ele está de fato declarando a razão
                massa:volume. Quando um cartógrafo desenha um mapa em escala
                1:100.000, está usando razão. Quando um químico prescreve uma
                mistura gasolina:etanol de 7:3, ratifica a razão.
              </p>

              <p>
                A razão é expressa de três formas equivalentes: a forma
                fracionária (a/b), a forma colon (a:b) e a forma verbal ("a para
                b"). Todas significam exatamente o mesmo: o quociente entre a e
                b, onde b ≠ 0 (porque divisão por zero é indefinida). O numero
                "a" é chamado antecedente e "b" é o consequente. A ordem é
                absolutamente crítica — uma questão de CESGRANRIO que pergunta
                "a razão entre derivados e petróleo" exige que derivados
                (primeiro mencionado) seja o antecedente, jamais o contrário.
                Este é talvez o erro mais frequente em provas: inverter
                inconscientemente a sequência e obter uma fração incorreta. Um
                derivado/petróleo (correto) expressa rendimento; um
                petróleo/derivado (invertido) expressa o inverso, um fator
                conversão que não faz sentido no contexto.
              </p>

              <p>
                No universo de Petrobras, razões aparecem em contextos tão
                variados quanto impressionantes. Em operações de refinaria:
                razão entre throughput máximo e consumo atual. Em exploração:
                razão de custo-benefício de um poço. Em logística: razão de
                equipamento disponível versus equipamento em manutenção. Em
                recursos humanos: razão técnicos:supervisores. Em
                confiabilidade: razão de falhas:horas operacionais (definindo a
                taxa de falha MTBF). Compreender razão não é compreender um
                tópico isolado; é adquirir a linguagem através da qual toda a
                engenharia pratica quantificação.
              </p>

              <p>
                A CESGRANRIO, especificamente, testa razão em três frentes
                principais: (1) Identificação correta de qual grandeza é
                antecedente e qual é consequente — frequentemente disfarçada em
                linguagem ambígua; (2) Simplificação e equivalência —
                210.000/300.000 simplifica-se a 7/10, e a banca cobra quale é "a
                razão na forma irredutível"; (3) Contexto — aplicações reais
                onde razão surge sob nomes especializados (densidade, escala,
                rendimento, taxa). Uma questão típica de prova pode ser: "Uma
                refinaria processa 1.200 barris/hora e obtém 840 barris de
                gasolina. Qual é a razão de aproveitamento?" A resposta não é
                "840 barris", mas "840/1.200 = 7/10 = 0,70", e a simplificação é
                obrigatória. O candidato que escrever "840/1.200" como resposta
                final será penalizado por não reduzir.
              </p>

              <p>
                A simplificação é uma habilidade crítica muitas vezes
                negligenciada. Não basta calcular a razão; você deve expressá-la
                em sua forma mais reduzida (forma irredutível). Quando dois
                números compartilham um divisor comum maior que 1, você deve
                dividi-los por esse MDC. Por exemplo, 60/80 tem MDC=20, portanto
                simplifica-se a 3/4. Qual é a relevância prática? Em provas de
                múltipla escolha, a resposta "correta" frequentemente está em
                forma irredutível, enquanto candidatos apressados deixam frações
                não-reduzidas e selecionam respostas erradas que aparecem nas
                alternativas. Uma questão pode ter como alternativas "c) 60/80"
                e "d) 3/4", sendo que ambas são matematicamente iguais, mas
                apenas uma é considerada a forma "correta" pela banca. Dominar
                simplificação não é opcional — é essencial para pontuar em
                qualquer prova de concurso.
              </p>

              <p>
                As proporções entre grandezas muitas vezes não são números
                inteiros. Você pode ter uma razão de 3,5:1 ou 0,75:1. Estas
                razões decimais ou fracionárias funcionam exatamente como razões
                inteiras — a ordem permanece absolutamente crítica, a
                simplificação segue as mesmas regras, e o significado conceitual
                é idêntico. No entanto, candidatos às vezes se assustam com
                números não-inteiros e cometem erros por nervosismo. Uma
                densidade de 0,84 kg/L é perfeitamente válida e significa que 1
                litro desse fluido pesa exatamente 0,84 quilogramas. Não há
                "arredondamento" ou "aproximação" envolvido; é o valor exato e
                deve ser tratado como tal. Quando a CESGRANRIO apresenta razões
                decimais, ela está testando se você consegue trabalhar
                confortavelmente além de números inteiros — uma habilidade
                absolutamente esperada de um engenheiro ou profissional de
                operação.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Definição Formal & Estrutura
                </h4>
                <div className="space-y-3 text-lg">
                  <p>
                    <strong>Razão entre a e b:</strong> r = a ÷ b = a/b (b ≠ 0)
                  </p>
                  <p>
                    <strong>Nomenclatura:</strong> a = antecedente (numerador),
                    b = consequente (denominador)
                  </p>
                  <p>
                    <strong>Propriedade Crítica:</strong> Ordem importa. "a para
                    b" ≠ "b para a"
                  </p>
                  <p>
                    <strong>Simplificação:</strong> Reduzir a fração a seus
                    termos mínimos. 210.000/300.000 = 21/30 = 7/10 ✓
                  </p>
                  <p>
                    <strong>Contextos Comuns:</strong> Densidade (kg/m³), Escala
                    (1:100.000), Rendimento (%), Taxa (falhas/hora)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SEÇÃO 1: Definição e Formas ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="O que é Razão?"
              description="A comparação exata entre duas quantidades da mesma natureza."
              variant={mv[1]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Conceituação e Formas de Expressão"
              icone="📐"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: Razão como Quociente",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        <strong>Razão</strong> é o quociente entre dois números
                        reais, indicando quantas vezes um valor cabe no outro. A
                        razão entre <em>a</em> e <em>b</em>
                        (b ≠ 0) é escrita como <strong>a/b</strong>,{" "}
                        <strong>a:b</strong> ou <strong>a para b</strong>.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 dark:text-blue-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Fórmula Central:
                        </p>
                        <p className="font-mono text-center text-lg font-bold">
                          r = a / b (b ≠ 0)
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        Na RPBC (Refinaria Presidente Bernardes), processam-se
                        300.000 barris/dia e obtêm-se 210.000 barris de
                        derivados. A razão de aproveitamento é 210.000/300.000 ={" "}
                        <strong>7/10 = 0,70 (70%)</strong>. Isso é o rendimento
                        da refinaria expresso como razão.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Razão na Indústria",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Razão aparece em inúmeros contextos operacionais:
                      </p>
                      <div className="grid gap-3">
                        <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                          <p className="font-bold text-sky-700 dark:text-sky-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Exemplo 1 — Equipe de Campo
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Uma equipe tem 15 técnicos e 5 engenheiros. A razão
                            técnicos:engenheiros = 15:5 = <strong>3:1</strong>.
                            Para cada engenheiro, há 3 técnicos sob coordenação.
                          </p>
                        </div>
                        <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                          <p className="font-bold text-sky-700 dark:text-sky-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Exemplo 2 — Densidade de Fluido
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Densidade = Massa / Volume = 840 kg / 1 m³ ={" "}
                            <strong>840 kg/m³</strong>. Toda densidade é uma
                            razão massa/volume.
                          </p>
                        </div>
                        <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                          <p className="font-bold text-sky-700 dark:text-sky-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Exemplo 3 — Escala de Projeto
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Planta de refinaria escala 1:200 → 1 cm no papel =
                            200 cm (2 m) na realidade. Se um equipamento mede
                            4,5 cm no desenho, tem{" "}
                            <strong>4,5 × 200 = 900 cm = 9 m</strong> de
                            comprimento real.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Armadilhas de Leitura e Simplificação",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        A CESGRANRIO cobra dois pontos de atenção sobre razão:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Dica 1 — Ordem da Leitura
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            <strong>
                              "A razão entre derivados e petróleo"
                            </strong>{" "}
                            → derivados no NUMERADOR (primeiro mencionado).
                            Nunca inverta.
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Dica 2 — Simplificação Obrigatória
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            210.000/300.000 = 21/30 = <strong>7/10</strong>. A
                            CESGRANRIO sempre cobra a forma simplificada. Se a
                            alternativa tiver 21/30 e 7/10, a correta é 7/10.
                          </p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                          <strong>Pulo do Gato:</strong> Quando a questão diz
                          "razão entre A e B", A está no numerador. Quando diz
                          "quantas vezes A cabe em B", é B/A.
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Quando a Razão Não É Simples",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="warning"
                        titulo="Atenção — Razão Entre Grandezas Diferentes"
                      >
                        Densidade (kg/m³), Velocidade (km/h) e Pressão (Pa =
                        N/m²) são razões entre grandezas{" "}
                        <strong>de naturezas diferentes</strong>. Nestes casos,
                        não se simplifica a unidade de ambos os termos —
                        mantém-se a unidade composta (ex: kg/m³).
                      </AlertBox>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Razão áurea (φ ≈ 1,618): Uma razão irracional famosa que
                        aparece em arquitetura e design. Em provas: segmento de
                        10 dividido na razão áurea → parte maior = 10 ×
                        1,618/2,618 ≈ 6,18.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── SEÇÃO 2: FlipCards — Tipos de Razão ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Tipos de Razão na Prática"
              description="Os contextos industriais onde razão aparece disfarçada."
              variant={mv[1]}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuGauge className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">
                      Rendimento
                    </h6>
                    <p className="font-medium text-xl text-foreground/85 leading-relaxed">
                      Como calcular o rendimento de uma bomba ou refinaria?
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 border-b border-border/30 pb-2">
                      Rendimento = Saída Útil / Entrada Total
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed text-zinc-100">
                      Razão entre o que sai útil e o que entrou. Bomba com
                      2.000W de entrada e 1.600W úteis tem rendimento 1600/2000
                      = 0,80 = 80%.
                    </p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                      <strong>Dica de Elite:</strong> Rendimento nunca
                      ultrapassa 1 (100%). Se o resultado der maior que 1, você
                      inverteu a fração.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Razão Industrial
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuMap className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">
                      Escala
                    </h6>
                    <p className="font-medium text-xl text-foreground/85 leading-relaxed">
                      O que significa a escala 1:50.000 em um mapa?
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 border-b border-border/30 pb-2">
                      Escala = Medida no Mapa / Medida Real
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed text-zinc-100">
                      1:50.000 significa que 1 unidade no mapa representa 50.000
                      unidades na realidade. 3 cm no mapa = 1,5 km na realidade.
                    </p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                      <strong>Dica de Elite:</strong> SEMPRE use a mesma unidade
                      nos dois lados. Converta km para cm ANTES de dividir.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Razão Cartográfica
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuCalculator className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">
                      Razão de Mistura
                    </h6>
                    <p className="font-medium text-xl text-foreground/85 leading-relaxed">
                      Qual a razão em uma mistura 70% gasolina e 30% etanol?
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 border-b border-border/30 pb-2">
                      Razão Gasolina:Etanol = 7:3
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed text-zinc-100">
                      70% e 30% = razão 7:3. Em 50 litros: gasolina = 7/10 × 50
                      = 35L; etanol = 3/10 × 50 = 15L.
                    </p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                      <strong>Dica de Elite:</strong> Razão em mistura é
                      parte/parte, não parte/total. Distinguir dos percentuais.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Razão de Composição
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-1">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[1]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em um mapa de escala 1:25.000, duas refinarias distam 8 cm. A distância real entre elas é:"
          alternativas={[
            { letra: "A", texto: "200 m", correta: false },
              { letra: "B", texto: "2 km", correta: true },
              { letra: "C", texto: "20 km", correta: false },
              { letra: "D", texto: "200 km", correta: false },
              { letra: "E", texto: "0,2 km", correta: false }
          ]}
          dicaEstrategica="Conversões: ÷100 → metros, ÷1000 → km."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "8 cm × 25.000 = 200.000 cm = 2.000 m = 2 km." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={5}
              variant={mv[1]}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-indigo-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 1",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizRazao}
              titulo="QUIZ: Razão"
              numero={6}
              variant={mv[1]}
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>

          {/* ─── RESUMO VISUAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={4}
              title="Resumo Visual"
              variant={mv[1]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Mental — Tipos de Razão",
                          type: "Mapa Mental",
                          placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Mapa mental dark premium sobre Razão. Centro: círculo azul "RAZÃO a/b". 5 ramos: Escala (mapa cartográfico), Rendimento (engrenagem), Densidade (cilindro de fluido), Razão de Mistura (béquer), Razão Áurea (espiral). Estilo vetorial, fundo escuro, paleta azul-ciano-emerald. Logos sutis Petrobras.
                        },
                        {
                          title: "Infográfico — Razão vs. Proporção",
                          type: "Infográfico Comparativo",
                          placeholderColor: "bg-sky-100 dark:bg-sky-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Infográfico dark premium comparando Razão e Proporção. Lado esquerdo: Razão (comparação simples, ex: 3:5). Lado direito: Proporção (duas razões iguais, 3:5 = 6:10). Setas conectoras com propriedade fundamental (produtos cruzados). Paleta azul-índigo. Industrial, técnico, premium.
                        },
                      ]}
                      moduloNome="Razão: A Comparação Primitiva"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 2 — PROPORÇÃO E PROPRIEDADES                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2">
        <ModuleBanner numero={2}
          titulo="Proporção: A Balança de Duas Razões"
          descricao="Propriedade fundamental, produtos cruzados e as fórmulas que a CESGRANRIO cobra todo ano."
           variant={mv[2]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Proporção: A Igualdade Que Governa a Engenharia"
              description="Do produto cruzado à divisão proporcional de lucros — o fundamento das relações quantitativas"
              variant={mv[2]}
            />

            <div className="space-y-6 text-foreground/85 text-xl leading-relaxed">
              <p>
                Enquanto razão é a comparação entre duas quantidades, proporção
                é a afirmação de que duas razões são iguais. Se você já estudou
                que a razão de aproveitamento de uma refinaria é 0,70 (70%),
                então temos uma proporção quando afirmamos que uma segunda
                refinaria também opera com a mesma razão: 350/500 = 0,70 =
                280/400. Ambas as razões são 0,70, portanto elas estão em
                proporção. Formalmente, uma proporção é uma equação entre
                razões: a/b = c/d, lê-se "a está para b assim como c está para
                d". Os números a e d são chamados de extremos (ocupam as
                extremidades), enquanto b e c são os meios (ocupam o meio da
                sequência). Esta nomenclatura é puramente estrutural mas
                absolutamente crítica para entender a propriedade fundamental
                que sustenta toda proporção.
              </p>

              <p>
                A propriedade fundamental da proporção é talvez a equação mais
                testada em concursos Petrobras: **o produto dos extremos é igual
                ao produto dos meios**, ou a × d = b × c. Esta regra não é
                apenas uma fórmula mágica; ela emerge naturalmente da algebra.
                Se a/b = c/d (multiplicando ambos os lados por b×d), obtemos a×d
                = b×c — é uma identidade algébrica. Por quê isso é tão
                importante? Porque em praticamente qualquer problema real, três
                dos quatro valores são conhecidos e um está faltando. Uma
                proporção permite resolver o valor faltante em segundos. Se 3
                trabalhadores constroem um trecho de oleoduto em 20 dias,
                quantos trabalhadores são necessários para construir o mesmo
                trecho em 15 dias? Proporção: 3/20 = x/15 → 3×15 = 20×x → 45 =
                20x → x = 2,25. Ambos os contextos invocam a mesma operação: o
                produto cruzado.
              </p>

              <p>
                Na Petrobras e empresas de exploração e produção, proporções
                surgem constantemente em divisão de lucros, alocação de recursos
                e resolução de problemas de engenharia. Três sócios de um
                consórcio investem R$ 20.000, R$ 30.000 e R$ 50.000 (total de R$
                100.000) em um poço exploratório. Se o poço produz um lucro de
                R$ 100.000, ele é dividido proporcionalmente aos investimentos:
                o primeiro sócio recebe 20.000/100.000 × 100.000 = R$ 20.000; o
                segundo, 30.000/100.000 × 100.000 = R$ 30.000; o terceiro,
                50.000/100.000 × 100.000 = R$ 50.000. Ou seja, cada um recebe
                uma quantidade **proporcional** ao que investiu. Este é o
                princípio da divisão proporcional — tão comum que muitas
                empresas têm departamentos jurídicos dedicados exclusivamente a
                calcular essas distribuições.
              </p>

              <p>
                Outra característica determinante é que propor ções respeitem
                operações especiais. Se a/b = c/d = k (uma constante), então:
                (a+c)/(b+d) = k também. Isto é, a soma de antecedentes sobre a
                soma de consequentes preserva a proporção. Esta propriedade abre
                caminho para resolver sistemas onde múltiplas razões iguais
                coexistem. Suponha que a/2 = b/3 = c/5, e você sabe que a+b+c =
                100. Você pode reescrever: a = 2k, b = 3k, c = 5k para alguma
                constante k. Então 2k + 3k + 5k = 100 → 10k = 100 → k = 10. Logo
                a = 20, b = 30, c = 50. Este padrão de uso da "constante de
                proporcionalidade" é absolutamente cobrado em provas.
              </p>

              <p>
                A CESGRANRIO testa proporção em cinco cenários principais: (1)
                Identificação de valores nas proporções (dados três, encontrar
                um); (2) Verificação de proporção (dadas quatro números, é uma
                proporção válida?); (3) Propriedades manipuladas (se inverter,
                alternar ou somar, a proporção persiste?); (4) Proporcionalidade
                reversa (quando uma cresce, a outra diminui); (5) Divisão
                proporcional (distribuir um total segundo razões
                pré-determinadas). Um erro comum é confundir a propriedade
                fundamental (produto cruzado) com adição incorreta (a+d = b+c),
                que é geralmente falsa. Exemplo: 2/3 = 4/6 é válido (2×6 = 3×4 =
                12), mas 2+6 ≠ 3+4. Este tipo de confusão elimina candidatos em
                provas competitivas.
              </p>

              <p>
                Uma propriedade adicional extremamente importante é a **adição
                (e subtração) de proporções**. Se a/b = c/d = k, então
                (a+c)/(b+d) = k também. Esta propriedade permite resolver
                problemas onde você tem múltiplas quantidades mantendo a mesma
                proporção. Imagine três consórcios, cada um com investimentos e
                retornos. Se todos os consórcios mantêm a proporção
                investimento:lucro = 5:3, então a soma de todos os investimentos
                está para a soma de todos os lucros também em 5:3. Esta
                propriedade é frequentemente cobrada em questões combinadas de
                proporção e divisão de lucros. Além disso, a **inversão de
                termos** (se a/b = c/d, então b/a = d/c) e a **alternância** (se
                a/b = c/d, então a/c = b/d) são manipulações algébricas que a
                CESGRANRIO usa para criar questões que testam compreensão
                profunda, não apenas memorização de fórmulas ou procedimentos
                mecânicos.
              </p>

              <p>
                A proporcionalidade é um conceito ainda mais amplo que englobam
                proporções como um caso especial. Quando falamos que o salário
                de um trabalhador é proporcional ao número de horas trabalhadas,
                estamos dizendo que existe uma constante k tal que Salário = k ×
                Horas. Este conceito de "constante de proporcionalidade" ou
                "razão constante" é absolutamente central em toda a matemática
                do concurso. Funções lineares, taxas de crescimento, consumo de
                energia — tudo repousa sobre proporcionalidade. Candidatos que
                entendem proporção em um nível profundo transitam facilmente
                entre diferentes formas e contextos de um mesmo conceito.
                Candidatos que apenas memorizam "produto cruzado" ficam presos
                quando encontram variações não-antecipadas ou questões que
                exigem interpretação conceitual profunda.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Definição Formal & Propriedade Fundamental
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>Proporção:</strong> a/b = c/d (lê-se "a para b assim
                    como c para d")
                  </p>
                  <p>
                    <strong>Extremos e Meios:</strong> a, d são extremos
                    (ponta-a-ponta); b, c são meios (centro)
                  </p>
                  <p>
                    <strong>Propriedade Fundamental (OURO):</strong> a × d = b ×
                    c (produto dos extremos = produto dos meios)
                  </p>
                  <p>
                    <strong>Propriedade da Soma:</strong> Se a/b = c/d = k,
                    então (a+c)/(b+d) = k
                  </p>
                  <p>
                    <strong>Inversão de Proporção:</strong> Se a/b = c/d, então
                    b/a = d/c (ambos invertidos)
                  </p>
                  <p>
                    <strong>Alternância:</strong> Se a/b = c/d, então a/c = b/d
                    (meios e extremos trocam posição)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SEÇÃO 1: Proporção Fundamenta ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Proporção e Propriedade Fundamental"
              description="A igualdade de duas razões e sua regra de ouro."
              variant={mv[2]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Teoria Completa da Proporção"
              icone="⚖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: Proporção como Igualdade",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Uma <strong>proporção</strong> é a igualdade entre duas
                        razões:
                        <strong> a/b = c/d</strong>, onde a e d são os{" "}
                        <em>extremos</em> e b e c são os <em>meios</em>.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-bold text-indigo-700 dark:text-indigo-400 text-xl mb-3 text-foreground/85 leading-relaxed">
                          Propriedade Fundamental:
                        </p>
                        <p className="font-mono text-center text-xl font-bold mb-2">
                          a × d = b × c
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed text-center">
                          (produto dos extremos = produto dos meios)
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação Petrobras">
                        Três sócios investiram R$ 20.000, R$ 30.000 e R$ 50.000
                        em um poço. O lucro de R$ 80.000 é proporcional ao
                        investimento. O sócio que investiu R$ 30.000 recebe:
                        30.000/100.000 × 80.000 = <strong>R$ 24.000</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Resolvendo Proporções",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                          <p className="font-bold text-violet-700 dark:text-violet-400 text-lg text-foreground/85 leading-relaxed mb-2">
                            Exemplo 1 — Encontrar o Termo Faltante
                          </p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">x/3 = 12/9</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">
                            → x × 9 = 3 × 12 → 9x = 36 → <strong>x = 4</strong>
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">
                            Alternativa: 12/9 = 4/3, logo x/3 = 4/3, x = 4.
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                          <p className="font-bold text-violet-700 dark:text-violet-400 text-lg text-foreground/85 leading-relaxed mb-2">
                            Exemplo 2 — Divisão de Lucro Proporcional
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Se a/2 = b/3 = c/5 e a+b+c = 100, então usando k:
                            <br />
                            a=2k, b=3k, c=5k → 10k=100 → k=10 →{" "}
                            <strong>a=20, b=30, c=50</strong>
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                          <p className="font-bold text-violet-700 dark:text-violet-400 text-lg text-foreground/85 leading-relaxed mb-2">
                            Exemplo 3 — Quarta Proporcional
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Dados 3, 5 e 9, encontrar d tal que 3:5 = 9:d
                            <br />3 × d = 5 × 9 → 3d = 45 →{" "}
                            <strong>d = 15</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Atalhos para Proporção",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Dica 1 — Verificação por Cruzamento
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Para verificar se a/b = c/d, cheque se a×d = b×c. Se
                            for igual, é proporção válida.
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Dica 2 — Propriedade da Soma
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Se a/b = c/d = k, então (a+c)/(b+d) = k também. Útil
                            para somar proporções.
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Dica 3 — Troca de Posição
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Se a/b = c/d, então também: b/a = d/c (invertendo
                            ambos) e a/c = b/d (invertendo alternadamente).
                          </p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                          <strong>Pulo do Gato:</strong> Na CESGRANRIO, quando
                          aparecer "a/b = k", use sempre k como constante de
                          proporcionalidade e substitua: a = kb, c = kd, etc.
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Armadilhas de Proporção",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha CESGRANRIO — Propriedade Fundamental x Soma"
                      >
                        A propriedade fundamental é a×d = b×c (produto cruzado).
                        <strong> NÃO confunda</strong> com a+d = b+c (que é
                        FALSA em geral). Exemplo: 2/3 = 4/6. Cruzado: 2×6 = 3×4
                        = 12 ✓. Soma: 2+6 ≠ 3+4 ✗.
                      </AlertBox>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Outra pegadinha: "Se a/b = c/d, então a/c = b/d" — isso
                        É verdadeiro (alternado). Mas "a+b = c+d" só vale se a
                        razão for 1.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-2">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[2]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Dividir R$ 180.000 entre três setores na razão 2:3:4. O setor que fica com a maior parte receberá:"
          alternativas={[
            { letra: "A", texto: "R$ 40.000", correta: false },
              { letra: "B", texto: "R$ 60.000", correta: false },
              { letra: "C", texto: "R$ 72.000", correta: false },
              { letra: "D", texto: "R$ 80.000", correta: true },
              { letra: "E", texto: "R$ 90.000", correta: false }
          ]}
          dicaEstrategica="Maior (4 partes): 4×20.000 = R$ 80.000."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "2+3+4 = 9 partes." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada parte: 180.000/9 = 20.000." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa D como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              variant={mv[2]}
              resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-emerald-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-emerald-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-emerald-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 2",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizProporcao}
              titulo="QUIZ: Proporção"
              numero={5}
              variant={mv[2]}
              icone="⚖️"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>

          {/* ─── RESUMO VISUAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Resumo Visual"
              variant={mv[2]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Diagrama — Propriedade Fundamental",
                          type: "Diagrama Técnico",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama dark premium da proporção a/b = c/d. Dois blocos conectados por sinal de =. Dentro de cada bloco, um numerador e denominador. Setas diagonais cruzadas com destaque vermelho indicando a×d = b×c (produto dos extremos = produto dos meios). Rótulos "extremos" e "meios". Fundo escuro, estilo técnico CESGRANRIO.
                        },
                      ]}
                      moduloNome="Proporção: A Balança de Duas Razões"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 3 — REGRA DE TRÊS SIMPLES                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3">
        <ModuleBanner numero={3}
          titulo="Regra de Três Simples"
          descricao="O método que resolve 60% das questões de matemática em concursos. Domine o passo a passo."
           variant={mv[3]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Regra de Três Simples: O Atalho da Indústria"
              description="Da proporcionalidade direta à inversa — o método que resolve a maioria das questões de concurso"
              variant={mv[3]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Regra de três simples é a técnica de resolução mais direta
                quando temos duas grandezas (A e B) com uma relação proporcional
                entre elas, e conhecemos três dos quatro valores. Por exemplo:
                "se 5 bombeadores enchem 1.000 litros em 2 horas, quantos litros
                8 bombeadores encherão no mesmo tempo?" Aqui, você tem três
                valores conhecidos (5 bombeadores, 1.000 litros, 2 horas) e quer
                encontrar o quarto (x litros para 8 bombeadores). A essência é
                reconhecer que existe uma proporção entre as duas grandezas. Se
                5 bombeadores enchem 1.000 L, então 8 bombeadores encherão mais;
                inversamente, se você quiser o mesmo resultado em menos tempo,
                precisaria de mais bombeadores. A regra de três automatiza este
                raciocínio proporcional, permitindo que você resolva em segundos
                problemas que de outra forma exigiriam equações complexas.
              </p>

              <p>
                Há dois tipos fundamentais de proporcionalidade: direta e
                inversa. Na **proporcionalidade direta**, quando uma grandeza
                aumenta, a outra também aumenta na mesma proporção. Exemplo:
                "Uma plataforma offshore produz 100 barris por dia. Em 3 dias,
                produz 300 barris." Aumentar o tempo em 3× aumenta a produção
                também em 3×. Não existe nada de oculto aqui; é transparente:
                mais tempo = mais produção. Na **proporcionalidade inversa**,
                quando uma grandeza aumenta, a outra diminui proporcionalmente.
                Exemplo clássico: "8 trabalhadores terminam uma tubagem em 15
                dias. Se você contratar 12 trabalhadores, quanto tempo levará?"
                Mais trabalhadores significa menos tempo. O produto trabalh
                adores × dias permanece constante: 8 × 15 = 120 = 12 × x, logo x
                = 10 dias. Este é o grande erro em provas: confundir inversa com
                direta. Candidatos automàticamente montam "8/12 = 15/x"
                (incorreto — isso daria 22,5 dias!), quando deveriam ter
                invertido um dos pares: "8/12 = x/15" (correto).
              </p>

              <p>
                Na Petrobras, regra de três aparece em contextos praticamente
                cotidianos. Planejamento de produção: se uma refinaria processa
                500 barris/hora e operou por 3 dias consecutivos (72 horas),
                quantos barris foram processados? 500 × 72 = 36.000. Mas se a
                questão for "3 refinarias processam 50.000 barris em 2 dias;
                quanto processará 5 refinarias em 3 dias?", aí entra regra de
                três composta (que veremos em módulos posteriores). Mas agora,
                regra de três simples. Gestão de recursos: se 200 l itros de
                óleo lubrificante custam R$ 800, quanto custa 500 litros?
                Proporção direta: 200/800 = 500/x → x = 2.000. Tempo de
                manutenção: se 6 técnicos calibram 24 transmissores em 8 horas,
                quanto tempo levariam 10 técnicos? Proporção inversa: 6 × 8 = 10
                × x → x = 4,8 horas. Todas estas situações invocam regra de
                três.
              </p>

              <p>
                O método das **setas** é infalível para distinguir direta de
                inversa sem errar. Você monta a tabela com as duas grandezas
                lado a lado, coloca setas indicando a variação (↑ para aumento,
                ↓ para diminuição), e verifica: se ambas as setas apontam na
                mesma direção (ambas ↑ ou ambas ↓), é proporcionalidade DIRETA —
                você monta a proporção normalmente. Se as setas apontam em
                direções opostas (uma ↑ e outra ↓), é INVERSA — você inverte o
                segundo par antes de resolver. Este método visual elimina a
                confusão que causa erros sistêmicos. A banca CESGRANRIO
                frequentemente oferece alternativas que são respostas de "regra
                de três invertida"; candidatos que confundiram o tipo caem nela.
              </p>

              <p>
                A CESGRANRIO testa regra de três em cenários onde a armadilha é
                real. Velocidade e tempo, para a mesma distância, são **sempre**
                inversamente proporcionais — este é um erro que aparece em
                praticamente toda prova. "Se um caminhão viaja a 80 km/h e leva
                5 horas, quanto tempo levará a 100 km/h?" Resposta errada
                (direta): 100/80 = 5/x → x = 4h. Isto está CORRETO por acaso,
                mas o raciocínio é falho. O correto é: "Velocidade ↑, Tempo ↓
                (setas opostas) → INVERSA → 80 × 5 = 100 × x → x = 4h." O
                resultado é o mesmo, mas o método está certo. Outras armadilhas:
                confundir "20% maior" com "regra de três"; tentar aplicar regra
                de três quando há três ou mais grandezas (aí é regra de três
                composta); não simplificar frações antes de calcular (levando a
                números desnecessariamente grandes). A habilidade de distinguir
                quando regra de três se aplica versus quando não se aplica é
                surpreendentemente decisiva em provas competitivas.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Método das Setas & Resolução
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>Passo 1:</strong> Identifique as duas grandezas e
                    coloque setas (↑ ou ↓) conforme variam
                  </p>
                  <p>
                    <strong>Passo 2:</strong> Mesma direção? → DIRETA. Opostas?
                    → INVERSA
                  </p>
                  <p>
                    <strong>Passo 3 (DIRETA):</strong> Monta a proporção
                    normalmente: a/b = c/x
                  </p>
                  <p>
                    <strong>Passo 3 (INVERSA):</strong> Inverte o segundo par:
                    a/b = x/c, então a × c = b × x
                  </p>
                  <p>
                    <strong>Regra de Ouro:</strong> Velocidade × Tempo =
                    Distância (SEMPRE inversa); Tempo × Quantidade = Produção
                    Total (SEMPRE direta)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SEÇÃO 1: Método ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="O Método Completo"
              description="Identificação, montagem e resolução em 3 passos."
              variant={mv[3]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Regra de Três Simples — Método Profissional"
              icone="🔢"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: Quando Usar Regra de Três",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Usa-se Regra de Três quando há{" "}
                        <strong>duas grandezas</strong> e conhecemos três
                        valores, querendo descobrir o quarto. A relação entre as
                        grandezas pode ser <strong>direta</strong> ou{" "}
                        <strong>inversa</strong>.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center">
                          <p className="font-bold text-emerald-700 dark:text-emerald-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            DIRETA
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">A sobe → B sobe</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Mais tempo = Mais produção
                          </p>
                        </div>
                        <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/20 text-center">
                          <p className="font-bold text-rose-700 dark:text-rose-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            INVERSA
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">A sobe → B desce</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Mais operadores = Menos tempo
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Passo a Passo Industrial",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-5">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xl mb-3 text-foreground/85 leading-relaxed">
                          Exemplo 1 — DIRETA (Bomba e Litros)
                        </p>
                        <p className="text-xl mb-2 text-foreground/85 leading-relaxed">
                          Uma bomba enche 6.000 L em 4 horas. Quanto tempo para
                          9.000 L?
                        </p>
                        <div className="font-mono text-lg text-foreground/85 leading-relaxed space-y-1 bg-muted/30 p-3 rounded-lg">
                          <p>Litros ↑ | Tempo ↑ (DIRETA)</p>
                          <p>6.000 → 4 horas</p>
                          <p>9.000 → x horas</p>
                          <p className="text-emerald-500 font-bold">
                            6000/9000 = 4/x → x = 9000×4/6000 = 6h
                          </p>
                        </div>
                      </div>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-xl mb-3 text-foreground/85 leading-relaxed">
                          Exemplo 2 — INVERSA (Operadores e Dias)
                        </p>
                        <p className="text-xl mb-2 text-foreground/85 leading-relaxed">
                          8 trabalhadores levam 15 dias. Com 12, quantos dias?
                        </p>
                        <div className="font-mono text-lg text-foreground/85 leading-relaxed space-y-1 bg-muted/30 p-3 rounded-lg">
                          <p>Trabalhadores ↑ | Dias ↓ (INVERSA)</p>
                          <p>8 trab → 15 dias</p>
                          <p>12 trab → x dias</p>
                          <p className="text-rose-500 font-bold">
                            8×15 = 12×x → x = 120/12 = 10 dias
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: O Método das Setas",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        O método das setas elimina erros de classificação:
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 font-mono text-xl text-foreground/85 leading-relaxed">
                        <p className="mb-2">
                          <strong>1.</strong> Monte a tabela com as grandezas
                          lado a lado
                        </p>
                        <p className="mb-2">
                          <strong>2.</strong> Coloque setas mostrando a variação
                          (↑ aumentou ou ↓ diminuiu)
                        </p>
                        <p className="mb-2">
                          <strong>3.</strong> Mesma direção? → DIRETA. Direções
                          opostas? → INVERSA
                        </p>
                        <p className="text-emerald-500">
                          <strong>4.</strong> Direta: divide normalmente.
                          Inversa: inverte o segundo par.
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                        <strong>Pulo do Gato:</strong> Velocidade × Tempo =
                        Distância (constante). Logo velocidade e tempo são
                        SEMPRE inversamente proporcionais para o mesmo percurso.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Grandezas Que Enganam",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox
                        tipo="warning"
                        titulo="Armadilha — Velocidade e Tempo"
                      >
                        Velocidade e tempo são INVERSAMENTE proporcionais para a
                        mesma distância. Dobrar a velocidade{" "}
                        <strong>corta</strong> o tempo pela metade. Candidatos
                        erram ao tratar como direta.
                      </AlertBox>
                      <AlertBox
                        tipo="danger"
                        titulo="Atenção — Regra de 3 vs. Porcentagem"
                      >
                        Nem toda variação é regra de três! Se a questão diz "20%
                        a mais", calcule por percentual. Regra de três é para
                        relações fixas e proporcionais.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── SEÇÃO 2: Regra de Três Composta ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Regra de Três Composta"
              description="Múltiplas grandezas, um único resultado. O método que vence provas."
              variant={mv[3]}
            />
            <ContentAccordion
              titulo="Regra de Três Composta — Técnica Industrial"
              icone="🏗️"
              corIndicador="bg-orange-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "O Método da Constante (Causas/Efeito)",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Na Regra de Três Composta, todas as <em>causas</em>{" "}
                        (produtores do trabalho) ficam no numerador e o{" "}
                        <em>efeito</em> (trabalho produzido) no denominador. A
                        razão causas/efeito é constante nos dois cenários.
                      </p>
                      <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <p className="font-bold text-orange-700 dark:text-orange-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Fórmula Geral:
                        </p>
                        <p className="font-mono text-center text-xl text-foreground/85 leading-relaxed">
                          (A₁ × B₁ × C₁) / Efeito₁ = (A₂ × B₂ × C₂) / Efeito₂
                        </p>
                      </div>
                      <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <p className="font-bold text-orange-700 dark:text-orange-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo Petrobras:
                        </p>
                        <p className="text-xl mb-2 text-foreground/85 leading-relaxed">
                          5 máquinas, 4 horas/dia, 8 dias → 200 peças.
                          <br />
                          Quantas máquinas para 300 peças em 6h/dia, 5 dias?
                        </p>
                        <p className="font-mono text-lg text-foreground/85 leading-relaxed">
                          (5 × 4 × 8) / 200 = (x × 6 × 5) / 300
                          <br />
                          160/200 = 30x/300
                          <br />
                          0,8 = 0,1x → <strong>x = 8 máquinas</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── GRÁFICO — Comparação Direta vs. Inversa ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={4}
              title="Visualização Gráfica: Direta vs. Inversa"
              description="Observe como as duas relações se comportam no mesmo domínio."
              variant={mv[3]}
            />
            <FunctionGraph
              title="Comparação: Proporção Direta vs. Inversa"
              functions={[
                {
                  id: "direta",
                  label: "Direta: y = 6x",
                  color: "#3b82f6",
                  fn: (x: number) => 6 * x,
                  strokeWidth: 2,
                } as FunctionPlot,
                {
                  id: "inversa",
                  label: "Inversa: y = 36/x",
                  color: "#ef4444",
                  fn: (x: number) => (x > 0 ? 36 / x : null),
                  strokeWidth: 2,
                } as FunctionPlot,
              ]}
              xMin={0.5}
              xMax={10}
              yMin={-5}
              yMax={60}
              points={200}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-3">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[3]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Dividir R$ 240.000 entre 3 plataformas da Petrobras nas proporções 1:2:3. A plataforma com maior cota recebe:"
          alternativas={[
            { letra: "A", texto: "R$ 40.000", correta: false },
              { letra: "B", texto: "R$ 60.000", correta: false },
              { letra: "C", texto: "R$ 80.000", correta: false },
              { letra: "D", texto: "R$ 120.000", correta: true },
              { letra: "E", texto: "R$ 100.000", correta: false }
          ]}
          dicaEstrategica="Maior (3 partes): 3×40.000=R$120.000."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "1+2+3=6 partes." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada parte: 240.000/6=40.000." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa D como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={6}
              variant={mv[3]}
              resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-cyan-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-cyan-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-cyan-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 3",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                      <p className="font-bold text-cyan-600 dark:text-cyan-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizRegra3}
              titulo="QUIZ: Regra de 3 Simples"
              numero={7}
              variant={mv[3]}
              icone="🔢"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>

          {/* ─── RESUMO VISUAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={5}
              title="Resumo Visual"
              variant={mv[3]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Fluxograma — Direta ou Inversa?",
                          type: "Fluxograma de Decisão",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Fluxograma dark premium para decidir Direta ou Inversa. Início: "A grandeza X aumentou?". Sim → "B também aumentou?" → Sim: DIRETA, Não: INVERSA. Estilo diagrama de fluxo técnico, setas verdes/vermelhas, fundo escuro, tipografia bold. Ícones industriais Petrobras nos nós de decisão.
                        },
                      ]}
                      moduloNome="Regra de Três Simples"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 4 — DIVISÃO PROPORCIONAL BÁSICA                        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4">
        <ModuleBanner numero={4}
          titulo="Divisão Proporcional Básica"
          descricao="Distribua recursos com precisão: lucros, orçamentos e bonificações em questões CESGRANRIO."
           variant={mv[4]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Divisão Proporcional: Distribuição Justa de Recursos"
              description="Como repartir lucros, orçamentos e bonificações segundo razões estabelecidas"
              variant={mv[4]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Divisão proporcional é a aplicação prática mais tangível de
                proporções na vida empresarial. Quando três sócios de um
                consórcio investem R$ 20.000, R$ 30.000 e R$ 50.000 em um
                projeto de exploração e o projeto gera um lucro de R$ 100.000,
                surge a questão inevitável: como distribuir esse lucro de forma
                justa? Ninguém questiona que cada sócio deve receber uma
                quantidade **proporcional** ao que investiu. O sócio que
                investiu 50% do capital (50.000 de 100.000) merecidamente recebe
                50% do lucro (50.000 de 100.000). Este é o princípio basilar:
                cada beneficiário recebe uma fração do total que é **exatamente
                proporcional** à sua contribuição ou participação. Divisão
                proporcional não é um capricho matemático; é um requisito legal
                em praticamente todos os contratos de parceria e consorciamento
                industrial.
              </p>

              <p>
                O método é deliciosamente simples, mas requer atenção no passo a
                passo. Você tem um total V a distribuir (lucro, orçamento,
                bonificação, prêmio) e razões r₁, r₂, r₃ que definem a proporção
                de cada beneficiário. Primeiro passo: some todas as partes da
                razão. Se a razão é 2:3:4, o total de "partes" é 2+3+4=9.
                Segundo passo: calcule o valor de cada "parte" dividindo o total
                pelo número de partes. Se você tem R$ 180.000 para distribuir em
                9 partes, cada parte vale 180.000÷9 = R$ 20.000. Terceiro passo:
                multiplique cada razão pelo valor da parte. Quem tem razão 2
                recebe 2×20.000 = R$ 40.000; quem tem razão 3 recebe 3×20.000 =
                R$ 60.000; quem tem razão 4 recebe 4×20.000 = R$ 80.000. Total:
                40.000+60.000+80.000 = R$ 180.000 ✓. A beleza matemática reside
                no fato de que não importa se você tem 2 beneficiários ou 100; o
                método permanece idêntico.
              </p>

              <p>
                Na Petrobras, divisão proporcional é ubíqua. Alocação de
                orçamento anual: a diretoria de E&P (Exploração e Produção)
                aloca R$ 2 bilhões entre plataformas A, B e C na razão de sua
                potencial produção: 5:7:3. Cada plataforma recebe uma fração
                exatamente proporcional. Distribuição de bonificação: três
                equipes trabalham 120 horas, 180 horas e 240 horas em um projeto
                crítico; o bônus de R$ 10.800 é repartido proporcionalmente ao
                tempo dedicado. Equipe 1: 120/540 × 10.800 = R$ 2.400; Equipe 2:
                R$ 3.600; Equipe 3: R$ 4.800. Divisão de receita: um consórcio
                Petrobras-Parceiro processa gás natural; 60% da receita vai para
                Petrobras (investidor maior) e 40% para o parceiro, em razão
                60:40 (simplificável a 3:2). Toda a engenharia financeira de
                projetos de óleo e gás repousa sobre este conceito.
              </p>

              <p>
                Existe também uma variação crucial: **divisão inversamente
                proporcional**. Quando você quer distribuir algo de forma
                inversamente proporcional a números, quem tem o número menor
                recebe a parte maior. Exemplo: três fornecedores tiveram
                históricos de atraso de 2 dias, 4 dias e 8 dias. A penalidade
                total de R$ 2.800 é distribuída inversamente proporcional aos
                atrasos — ou seja, quem atrasou menos paga proporcionalmente
                menos. Primeiro, inverta as razões: 2→1/2, 4→1/4, 8→1/8. Depois,
                converta para inteiros encontrando o MMC de 2, 4, 8 que é 8:
                1/2=4/8, 1/4=2/8, 1/8=1/8. Agora a razão é 4:2:1. Total de
                partes: 7. Valor por parte: 2.800÷7=400. Fornecedor com 2 dias
                atraso: 4×400=R$ 1.600 (penalidade maior, pois proporcionalmente
                "menos responsável"); fornecedor com 8 dias: 1×400=R$ 400
                (penalidade menor). Esta inversão é frequentemente cobrada em
                provas como "pegadinha" — candidatos automaticamente dividem
                proporcionalmente (erro!) em vez de proporcionalmente ao
                inverso.
              </p>

              <p>
                A CESGRANRIO testa divisão proporcional em três contextos
                principais: (1) Divisão direta com razões explícitas (2:3:5);
                (2) Divisão inversa disfarçada em linguagem natural
                ("proporcional ao inverso dos atrasos" ou "inversamente
                proporcional à idade"); (3) Casos especiais onde a relação é
                expressa verbalmente ("A recebe o triplo de B", "C recebe 20% a
                mais que D"). Para o terceiro tipo, você deve converter a
                descrição verbal para razão numérica. Se A recebe triplo de B, a
                razão é A:B=3:1. Se C recebe 20% a mais que D, a razão é
                C:D=1,2:1 (ou 6:5 após simplificar). O erro mais comum é pular o
                passo "converter para razão numérica" e tentar resolver
                diretamente — isso causa confusão e cálculos errados. Cada
                questão de CESGRANRIO exige que você primeiro **identifique a
                razão**, depois aplique mecanicamente o método dos três passos.
              </p>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Protocolo de 3 Passos & Inversão
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>PASSO 1:</strong> Some as partes da razão:
                    Total_partes = r₁ + r₂ + r₃ + ...
                  </p>
                  <p>
                    <strong>PASSO 2:</strong> Calcule o valor de cada parte:
                    valor_parte = V / Total_partes
                  </p>
                  <p>
                    <strong>PASSO 3:</strong> Multiplique cada razão: xᵢ = rᵢ ×
                    valor_parte
                  </p>
                  <p>
                    <strong>INVERSÃO (se aplicável):</strong> Razão inversa a{" "}
                    {"{a, b, c}"} = {"{1/a, 1/b, 1/c}"}. Converta para inteiros
                    via MMC antes de aplicar passos.
                  </p>
                  <p>
                    <strong>Verificação:</strong> Sempre some os resultados
                    finais — devem totalizar V exatamente
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Dividir Proporcionalmente"
              description="Três passos infalíveis para nunca errar divisão proporcional."
              variant={mv[4]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Divisão Proporcional — Protocolo Completo"
              icone="✂️"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: O que é Dividir Proporcionalmente",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Dividir um valor V em partes{" "}
                        <strong>diretamente proporcionais</strong> a razões r₁,
                        r₂, r₃... significa que cada parte recebe uma fração de
                        V proporcional à sua razão no total.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 dark:text-emerald-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Passo a Passo:
                        </p>
                        <ol className="text-xl space-y-2 list-decimal list-inside text-foreground/85 leading-relaxed">
                          <li>Some as partes da razão: total = r₁ + r₂ + r₃</li>
                          <li>
                            Calcule o valor de cada "parte": p = V / total
                          </li>
                          <li>Multiplique cada r pela parte: xᵢ = rᵢ × p</li>
                        </ol>
                      </div>
                      <AlertBox
                        tipo="info"
                        titulo="Exemplo Petrobras — Orçamento por Plataforma"
                      >
                        Três plataformas recebem orçamento de R$ 180.000 na
                        razão 2:3:4.
                        <br />
                        Total = 9 partes → p = 20.000.
                        <br />
                        P1 = 40.000 | P2 = 60.000 | P3 = 80.000.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo:
                    "E — Exemplificação: Gratificação por Horas Trabalhadas",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-700 dark:text-teal-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Situação:
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Três técnicos trabalharam 10h, 15h e 25h em um
                          projeto. A gratificação de R$ 5.000 é proporcional às
                          horas.
                        </p>
                        <p className="text-xl mt-2 font-mono text-foreground/85 leading-relaxed">
                          Total: 50h → p = 5.000/50 = 100/h
                          <br />
                          Técnico 10h: 10×100 = R$ 1.000
                          <br />
                          Técnico 15h: 15×100 = R$ 1.500
                          <br />
                          Técnico 25h: 25×100 = <strong>R$ 2.500</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Divisão Inversamente Proporcional",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Na divisão <strong>inversamente proporcional</strong>,
                        quem tem o menor número recebe a MAIOR parte. O truque é
                        inverter a razão antes de dividir.
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo — Bônus Inversamente Prop. a Faltas
                        </p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">
                          Faltas: 2, 4, 8 → Inv. prop. = 1/2, 1/4, 1/8 = 4, 2, 1
                          <br />
                          Total: 7 partes → p = 2.800/7 = 400
                          <br />
                          Quem faltou 2x: 4×400 ={" "}
                          <strong>R$ 1.600 (maior!)</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                        <strong>Pulo do Gato:</strong> Inversamente proporcional
                        a {"{2,4,8}"} = diretamente proporcional a{" "}
                        {"{1/2, 1/4, 1/8}"} = diretamente proporcional a{" "}
                        {"{4, 2, 1}"}. Sempre inverta e converta para inteiros
                        (MMC).
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: A Parte É o Dobro da Outra",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox
                        tipo="warning"
                        titulo="Tipo Especial — Relação entre Partes"
                      >
                        Quando a questão diz "A recebe o triplo de B", isso
                        define a razão A:B = 3:1. Some as partes (3+1=4) e
                        divida proporcionalmente como de costume.
                      </AlertBox>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Outro caso especial: "A e B dividem R$ 2.400 de modo que
                        A recebe o triplo." A=3B → A+B=2.400 → 4B=2.400 → B=600,
                        A=1.800. (Razão 3:1 confirmada.)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-4">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[4]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Dividir R$ 180.000 entre três setores na razão 2:3:4. O setor que fica com a maior parte receberá:"
          alternativas={[
            { letra: "A", texto: "R$ 40.000", correta: false },
              { letra: "B", texto: "R$ 60.000", correta: false },
              { letra: "C", texto: "R$ 72.000", correta: false },
              { letra: "D", texto: "R$ 80.000", correta: true },
              { letra: "E", texto: "R$ 90.000", correta: false }
          ]}
          dicaEstrategica="Maior (4 partes): 4×20.000 = R$ 80.000."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "2+3+4 = 9 partes." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada parte: 180.000/9 = 20.000." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa D como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              variant={mv[4]}
              resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-blue-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 4",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizDivisao}
              titulo="QUIZ: Divisão Proporcional"
              numero={5}
              variant={mv[4]}
              icone="✂️"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Resumo Visual"
              variant={mv[4]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title:
                            "Infográfico — Divisão Proporcional Direta vs. Inversa",
                          type: "Infográfico Comparativo",
                          placeholderColor:
                            "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Infográfico dark premium comparando Divisão Direta vs. Inversa. Lado esquerdo: colunas coloridas mostrando distribuição maior para razões maiores (direta). Lado direito: distribuição maior para razões menores (inversa, como faltas). Ícones: colunas de barras, setinhas. Estilo técnico, paleta emerald-teal, fundo escuro Petrobras.
                        },
                      ]}
                      moduloNome="Divisão Proporcional"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 5 — GRANDEZAS DIRETA E INVERSAMENTE PROPORCIONAIS      */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5">
        <ModuleBanner numero={5}
          titulo="Grandezas Proporcionais"
          descricao="O ponto que mais derruba candidatos: identificar se duas grandezas andam juntas ou em sentidos opostos."
           variant={mv[5]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Grandezas Proporcionais: Diretas vs. Inversas"
              description="A rainha do erro em provas — identificar se duas variáveis crescem juntas ou em sentidos opostos"
              variant={mv[5]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A proporção é fundamentalmente sobre relação. Quando falamos que
                duas grandezas são proporcionais, estamos declarando que existe
                uma **relação constante** entre elas. Se você aumenta uma, a
                outra varia de forma previsível e determinística. A grande
                divisão ocorre justamente aqui: a variação pode ser **na mesma
                direção** (diretamente proporcional) ou **em direções opostas**
                (inversamente proporcional). Formalmente, duas grandezas x e y
                são **diretamente proporcionais** se y/x = k (uma constante), ou
                equivalentemente, y = k·x. Isto significa que triplicar x
                triplica y; reduzir x à metade reduz y à metade. Por outro lado,
                x e y são **inversamente proporcionais** se x·y = k (o produto é
                constante), ou equivalentemente, y = k/x. Aqui, triplicar x
                reduz y a um terço; reduzir x à metade triplica y. A implicação
                é profunda: para a mesma situação (por exemplo, construir um
                dique), se x representa "número de operários" e y representa
                "dias para completar", então x e y são inversamente
                proporcionais (mais operários = menos dias).
              </p>

              <p>
                Na prática industrial, a proporção direta é ubíqua. Se uma
                refinaria processa petróleo bruto numa taxa constante de 500
                barris por hora, então barris processados é diretamente
                proporcional ao tempo em operação. Após 1 hora: 500 barris. Após
                2 horas: 1.000 barris. Após 10 horas: 5.000 barris. A razão
                (quantidade/tempo) permanece eternamente 500 barris/hora. De
                forma similar, se um técnico ganha R$ 50 por hora trabalhada,
                então seu salário é diretamente proporcional ao número de horas
                (assumindo sem horas extras ou variações); duplicar as horas
                duplica o salário. Consumo de combustível em um navio, custo de
                material em construção de oleoduto, número de óleo em uma carga
                versus o volume total — praticamente toda operação linear em
                engenharia segue proporcionalidade direta. A beleza da
                proporcionalidade direta é que ela permite previsões e
                escalabilidade: se você conhece a taxa (constante k), você pode
                computar qualquer valor.
              </p>

              <p>
                A proporção inversa é igualmente importante mas conceptualmente
                mais traiçoeira. Se você tem um trabalho fixo (digamos, bombear
                100.000 barris do poço) e aumenta o número de bombas (digamos,
                de 4 para 8), o tempo necessário diminui (não dobra). Com 4
                bombas a 500 barris/hora cada (2.000 barris/hora total), levam
                50 horas. Com 8 bombas (4.000 barris/hora total), levam 25
                horas. Note que 4×50 = 8×25 = 200.000 barris-hora (o produto é
                constante). Esta é a marca registrada da proporção inversa: o
                produto x·y permanece fixo. Outro exemplo clássico: velocidade
                versus tempo para um percurso fixo. Um navio a 20 nós leva 10
                dias para uma travessia. A 25 nós, levaria 8 dias (porque 20×10
                = 25×8 = 200 nó-dias, uma constante). Frequência e comprimento
                de onda em física, pressão e volume em gases (Lei de Boyle, mas
                simplificada), resistência e corrente elétrica (Lei de Ohm, P =
                V²/R) — todas mostram proporcionalidade inversa em certos
                regimes.
              </p>

              <p>
                A CESGRANRIO flagra candidatos justamente onde eles confundem os
                dois tipos. Uma questão típica: "Uma equipe de 12 pessoas
                completa um projeto em 30 dias. Se fossem 18 pessoas, quantos
                dias?" A reação automática é: "12/18 = 30/x" (tratando como
                direta, o que daria x = 45 dias, errado). A análise correta é:
                mais pessoas → menos dias (setas opostas, portanto INVERSA) →
                12×30 = 18×x → x = 20 dias. O método das setas, discutido em
                Módulo 3, é infalível: se você desenha setas indicando a
                variação de ambas as grandezas e elas apontam na mesma direção
                (↑↑ ou ↓↓), é DIRETA; se apontam em sentidos opostos (↑↓ ou ↓↑),
                é INVERSA.
              </p>

              <p>
                Um erro sutil mas frequente é aplicar a regra para inversas
                quando na verdade temos diretas (ou vice-versa), porque o
                candidato não leu cuidadosamente qual é a relação. A questão
                pode dizer "o custo é inversamente proporcional ao desconto" —
                isto soa estranho porque intuitivamente esperamos que mais
                desconto = menos custo (o que seria inverso... mas não!).
                Clarando: se desconto aumenta, o preço diminui (direto). Se você
                codificar "custo" como variável y e "desconto" como x, então y =
                k − f(x) (uma função de subtração, não de inversão
                proporcional). O termo "inversamente proporcional" é precise em
                matemática: significa x·y = constante, não "uma relação que vai
                na direção oposta intuitivamente". Estes confusões linguísticas
                semeiam erros.
              </p>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200 dark:border-violet-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Identificação Clara: Direta vs. Inversa
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>DIRETAMENTE PROPORCIONAL:</strong> y/x = k
                    (constante) ⟺ y = k·x
                  </p>
                  <p>Sinal: Aumentar x → Aumenta y. Setas ↑↑ ou ↓↓</p>
                  <p>
                    Exemplos: Tempo × Produção, Velocidade × Distância (tempo
                    fixo), Quantidade × Custo
                  </p>

                  <p className="border-t border-border pt-3">
                    <strong>INVERSAMENTE PROPORCIONAL:</strong> x·y = k
                    (constante) ⟺ y = k/x
                  </p>
                  <p>Sinal: Aumentar x → Diminui y. Setas ↑↓ ou ↓↑</p>
                  <p>
                    Exemplos: Velocidade × Tempo (distância fixo), Operários ×
                    Dias (trabalho fixo), Pressão × Volume (Boyle)
                  </p>

                  <p className="border-t border-border pt-3">
                    <strong>TESTE RÁPIDO:</strong> Multiplique os dois valores.
                    Se produto constante → INVERSA. Se razão constante → DIRETA.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Direta vs. Inversa — A Grande Batalha"
              description="Como identificar a relação correta antes de montar a conta."
              variant={mv[5]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Grandezas Proporcionais — Teoria Completa"
              icone="↕️"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: Diretamente Proporcional",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Duas grandezas são{" "}
                        <strong>diretamente proporcionais</strong> quando a
                        razão entre elas é constante: y/x = k (constante). Se x
                        dobra, y dobra. Se x cai à metade, y cai à metade.
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplos Industriais (Diretas):
                        </p>
                        <ul className="text-xl space-y-1 list-disc list-inside text-foreground/85 leading-relaxed">
                          <li>Número de barris processados × Receita</li>
                          <li>Horas de operação × Consumo de energia</li>
                          <li>Número de separadores ativos × Produção/hora</li>
                          <li>Comprimento de cabo × Custo</li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "C — Conceituação: Inversamente Proporcional",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Duas grandezas são{" "}
                        <strong>inversamente proporcionais</strong> quando o
                        produto entre elas é constante: x × y = k. Se x dobra, y
                        cai à metade. Se x cai para 1/3, y triplica.
                      </p>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplos Industriais (Inversas):
                        </p>
                        <ul className="text-xl space-y-1 list-disc list-inside text-foreground/85 leading-relaxed">
                          <li>
                            Número de operadores × Tempo para concluir tarefa
                          </li>
                          <li>Velocidade de navio × Tempo de travessia</li>
                          <li>Diâmetro de tubulação × Pressão do fluido</li>
                          <li>Frequência elétrica × Comprimento de onda</li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Casos Práticos com Cálculo",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo 1 — FPSO e Separadores
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          6 separadores → 2.400 m³/h. Com 9 separadores: 6/9 =
                          2400/x → x = 9×2400/6 = <strong>3.600 m³/h</strong>{" "}
                          (direta)
                        </p>
                      </div>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo 2 — Navio e Velocidade
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Pressão 120 Pa com diâmetro 8 cm. Com diâmetro 6 cm:
                          8×120 = 6×x → x = 960/6 = <strong>160 Pa</strong>{" "}
                          (inversa)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Teste da Multiplicação",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Teste Rápido:
                        </p>
                        <p className="text-xl mb-2 text-foreground/85 leading-relaxed">
                          Multiplique os dois valores dos pares. Se o produto
                          for constante → INVERSA. Se a razão (divisão) for
                          constante → DIRETA.
                        </p>
                        <p className="font-mono text-lg text-foreground/85 leading-relaxed">
                          Pares: (8, 120) e (6, x):
                          <br />
                          8×120 = 960, 6×x = 6x. Se 6x=960 → x=160. PRODUTO
                          constante → INVERSA.
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                        <strong>Pulo do Gato:</strong> v × t = d (distância
                        constante). Portanto velocidade e tempo são sempre
                        INVERSAS. Nunca erre essa pegadinha clássica.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Grandezas Não Proporcionais",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox
                        tipo="warning"
                        titulo="Cuidado — Nem Toda Relação é Proporcional"
                      >
                        Temperatura e pressão em gases (Lei de Gay-Lussac) não
                        são simplesmente proporcionais — precisam de cálculo
                        adicional. A CESGRANRIO foca nas relações elementares de
                        Razão e Proporção, não em leis dos gases.
                      </AlertBox>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Outro caso não proporcional: Lucro e tempo de projeto.
                        Mais tempo de projeto não significa necessariamente mais
                        ou menos lucro — depende de outros fatores. Nesses
                        casos, a questão explicitará a relação.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── GRÁFICO — Proporcionalidade Direta ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Visualização: Proporcionalidade Direta"
              description="Diferentes constantes k geram retas com inclinações distintas — todas passando pela origem."
              variant={mv[5]}
            />
            <FunctionGraph
              title="Proporcionalidade Direta: y = kx"
              functions={[
                {
                  id: "k2",
                  label: "y = 2x",
                  color: "#3b82f6",
                  fn: (x: number) => 2 * x,
                  strokeWidth: 2,
                } as FunctionPlot,
                {
                  id: "k05",
                  label: "y = 0.5x",
                  color: "#ef4444",
                  fn: (x: number) => 0.5 * x,
                  strokeWidth: 2,
                } as FunctionPlot,
                {
                  id: "k4",
                  label: "y = 4x",
                  color: "#10b981",
                  fn: (x: number) => 4 * x,
                  strokeWidth: 2,
                } as FunctionPlot,
              ]}
              xMin={0}
              xMax={10}
              yMin={0}
              yMax={40}
              points={100}
            />
          </section>

          {/* ─── FLIPCARDS — Casos Clássicos ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={4}
              title="Casos Clássicos da CESGRANRIO"
              description="Flashcards com as relações mais cobradas em prova."
              variant={mv[5]}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuArrowRightLeft className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">
                      Velocidade × Tempo
                    </h6>
                    <p className="font-medium text-xl text-foreground/85 leading-relaxed">
                      Para a mesma distância: se a velocidade dobra, o tempo faz
                      o quê?
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 border-b border-border/30 pb-2">
                      INVERSA — Tempo cai à metade
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed text-zinc-100">
                      v × t = d (constante). Se v dobra (×2), t precisa ser ÷2
                      para o produto continuar igual. São grandezas INVERSAS.
                    </p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                      <strong>Dica de Elite:</strong> Produto constante =
                      INVERSA. Razão constante = DIRETA.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Grandezas Inversas
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuTrendingUp className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">
                      Operadores × Produção
                    </h6>
                    <p className="font-medium text-xl text-foreground/85 leading-relaxed">
                      Dobrar o número de operadores (mesma produtividade) afeta
                      a produção como?
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 border-b border-border/30 pb-2">
                      DIRETA — Produção dobra
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed text-zinc-100">
                      Mais operadores = mais produção (mesma eficiência
                      individual). Produção/Operadores = constante. É uma
                      relação DIRETA.
                    </p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                      <strong>Dica de Elite:</strong> A chave é &apos;mesma
                      produtividade&apos;. Se a eficiência muda, não é mais
                      proporcional simples.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Grandezas Diretas
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          {/* ─── GRÁFICO — Proporcionalidade Inversa ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={5}
              title="Visualização: Proporcionalidade Inversa"
              description="Hipérboles: quanto maior x, menor y — o produto x·y permanece constante."
              variant={mv[5]}
            />
            <FunctionGraph
              title="Proporcionalidade Inversa: y = k/x"
              functions={[
                {
                  id: "k12",
                  label: "y = 12/x",
                  color: "#3b82f6",
                  fn: (x: number) => (x > 0 ? 12 / x : null),
                  strokeWidth: 2,
                } as FunctionPlot,
                {
                  id: "k6",
                  label: "y = 6/x",
                  color: "#ef4444",
                  fn: (x: number) => (x > 0 ? 6 / x : null),
                  strokeWidth: 2,
                } as FunctionPlot,
              ]}
              xMin={0.5}
              xMax={10}
              yMin={-1}
              yMax={25}
              points={200}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-5">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[5]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A média proporcional entre 4 e 16 é:"
          alternativas={[
            { letra: "A", texto: "6", correta: false },
              { letra: "B", texto: "8", correta: true },
              { letra: "C", texto: "10", correta: false },
              { letra: "D", texto: "12", correta: false },
              { letra: "E", texto: "4", correta: false }
          ]}
          dicaEstrategica="Diferente da média aritmética (4+16)/2=10."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Média proporcional (geométrica) entre a e b: x = √(a×b) = √(4×16) = √64 = 8." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={7}
              variant={mv[5]}
              resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-amber-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-amber-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-amber-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 5",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <p className="font-bold text-amber-600 dark:text-amber-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizGrandezas}
              titulo="QUIZ: Grandezas D/I"
              numero={8}
              variant={mv[5]}
              icone="↕️"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={6}
              title="Resumo Visual"
              variant={mv[5]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Tabela — Grandezas Diretas e Inversas",
                          type: "Tabela Comparativa",
                          placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Tabela dark premium comparando grandezas diretamente e inversamente proporcionais. Duas colunas: DIRETA (setas ambas para cima, y/x=k, exemplos industriais) e INVERSA (setas opostas, x×y=k, exemplos). Cada linha traz: gráfico esquemático, fórmula, exemplo Petrobras. Paleta ciano-sky, fundo escuro técnico.
                        },
                      ]}
                      moduloNome="Grandezas Proporcionais"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 6 — DIVISÃO PROPORCIONAL AVANÇADA                      */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6">
        <ModuleBanner numero={6}
          titulo="Divisão Proporcional Avançada"
          descricao="Distribuições inversas, combinadas e casos especiais. O nível que separa os aprovados dos classificados."
           variant={mv[6]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Divisão Proporcional Avançada: Múltiplos Critérios"
              description="De inversas puras a combinações complexas — o que separa candidatos aprovados de classificados"
              variant={mv[6]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Enquanto os Módulos 4-5 abordaram divisão proporcional simples
                (direta ou inversa, um critério apenas), a realidade complexa de
                grandes empresas frequentemente envolve **múltiplos critérios**
                aplicados simultaneamente. Considere uma distribuidora de
                petróleo dividindo um bônus de R$ 100.000 entre três gerentes
                com base em: (1) volume de vendas que fizeram (critério DIRETO —
                quem vendeu mais merece mais) e (2) número de reclamações de
                cliente (critério INVERSO — quem tem mais reclamações não
                deveria receber tanto). Uma divisão que condiciona apenas ao
                volume seria injusta para quem tem vendas altas mas gerenciou
                mal os clientes. Uma divisão que condicionasse apenas às
                reclamações seria injusta para quem vendeu pouco. O método
                avançado **combina** ambos os critérios: cada gerente recebe uma
                pontuação c que é o quociente volume/reclamações, e depois a
                distribuição ocorre proporcionalmente às pontuações combinadas.
              </p>

              <p>
                A fórmula de combinação é elegantemente simples: se você tem um
                critério direto (a₁, a₂, a₃...) e um critério inverso (b₁, b₂,
                b₃...), o coeficiente combinado para cada receptor é cᵢ = aᵢ /
                bᵢ. Depois, distribui-se o total V proporcionalmente aos
                coeficientes: xᵢ = (cᵢ / ∑cⱼ) × V. Por exemplo: três
                fornecedores têm históricos de qualidade (score 1-10, critério
                direto) e histórico de atraso em dias (critério inverso).
                Fornecedor A: 9 de qualidade, 2 dias de atraso → c_A = 9/2 =
                4,5. Fornecedor B: 7 de qualidade, 1 dia → c_B = 7/1 = 7.
                Fornecedor C: 8 de qualidade, 4 dias → c_C = 8/4 = 2. Total de
                coeficientes: 4,5 + 7 + 2 = 13,5. Se houver R$ 27.000 a
                distribuir em bônus de performance: A recebe (4,5/13,5) × 27.000
                = R$ 9.000; B recebe (7/13,5) × 27.000 = R$ 14.000; C recebe
                (2/13,5) × 27.000 = R$ 4.000. Note que B, apesar de ter
                qualidade inferior a A, recebeu mais porque praticamente não
                atrasa. Este é o poder da ponderação combinada.
              </p>

              <p>
                Na Petrobras, casos avançados de divisão proporcional emergem em
                contextos como: alocação de crédito orçamentário entre Unidades
                de Negócio com base em desempenho operacional (DIRETO) e
                histórico de desvios (INVERSO); distribuição de bônus entre
                equipes por produção alcançada (DIRETO) mas ponderada pelo
                número de acidentes ocupacionais (INVERSO); alocação de verba
                para investimento em I&D por número de patentes geradas (DIRETO)
                ponderado pela idade da equipe (talvez INVERSO, supondo que
                equipes mais jovens merecem mais investimento). Todos estes
                requerem a lógica de coeficientes combinados, não apenas
                aplicação mecânica do método simples de três passos.
              </p>

              <p>
                Complementando as divisões combinadas, há também **casos
                especiais onde a questão fornece dados incompletos** e você deve
                deduzir o total ou as partes faltantes. Por exemplo: "Quatro
                setores em razão 2:3:4:6, e o setor maior recebe R$ 180.000.
                Quanto recebem os outros?" Você não conhece o total V a priori,
                mas conhece a maior parte. O método é: maior razão é 6, maior
                parte é R$ 180.000, logo cada "parte unitária" vale 180.000 ÷ 6
                = R$ 30.000. O total de partes é 2+3+4+6 = 15, logo total V = 15
                × 30.000 = R$ 450.000. Os outros recebem 2×30.000 = R$ 60.000;
                3×30.000 = R$ 90.000; 4×30.000 = R$ 120.000. Este atalho é
                frequentemente cobrado porque elimina candidatos que só
                decoraram "passo a passo" sem entender a estrutura.
              </p>

              <p>
                A CESGRANRIO em nível avançado testa: (1) Divisão com múltiplos
                critérios (combinação direto-inverso); (2) Caso onde você
                conhece uma parte e deve deduzir o total; (3) Problemas onde a
                razão é expressa verbalmente ("A recebe 50% a mais que B, e B
                recebe o dobro de C") e você deve converter para números; (4)
                Pegadinhas linguísticas ("inversamente proporcional a 2 e 3" =
                proporcionalmente a 1/2 e 1/3, que após MMC = proporcionalmente
                a 3 e 2). Cada tipo exige uma adaptação tática do método básico.
                Candidatos que memorizaram cegamente o procedimento dos "três
                passos" fracassam nesses casos. Candidatos que internalizaram a
                **lógica subjacente** (distribuir proporcionalmente aos
                coeficientes, sejam quais forem) resolvem com segurança.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Métodos Avançados: Combinado & Dedução
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>Divisão Combinada (Múltiplos Critérios):</strong>
                  </p>
                  <p className="ml-4">
                    1. Calcule coeficiente: cᵢ = (critério direto)ᵢ / (critério
                    inverso)ᵢ
                  </p>
                  <p className="ml-4">2. Distribua: xᵢ = (cᵢ / ∑cⱼ) × V</p>

                  <p className="border-t border-border pt-3">
                    <strong>Dedução Reversa (Total Desconhecido):</strong>
                  </p>
                  <p className="ml-4">
                    Se conhece uma parte Xᵢ com razão rᵢ: valor_unitário = Xᵢ /
                    rᵢ
                  </p>
                  <p className="ml-4">Total = (∑rⱼ) × valor_unitário</p>

                  <p className="border-t border-border pt-3">
                    <strong>Conversão Verbal → Numérica:</strong>
                  </p>
                  <p className="ml-4">
                    "A 50% mais que B" → A:B = 1,5:1 ou 3:2
                  </p>
                  <p className="ml-4">
                    "Inv. proporcional a 2,4,8" → Conv. para inteiros: 1/2, 1/4,
                    1/8 → 4:2:1
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Divisão com Múltiplos Critérios"
              description="Quando a distribuição envolve condições mistas ou encadeadas."
              variant={mv[6]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Divisão Proporcional Avançada"
              icone="⚙️"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: Divisão Mista (Dir. e Inv.)",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Em casos avançados, a distribuição pode ser{" "}
                        <strong>
                          diretamente proporcional a um critério e inversamente
                          a outro
                        </strong>{" "}
                        simultaneamente. O coeficiente de cada receptor é
                        calculado combinando os dois critérios.
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Fórmula Combinada:
                        </p>
                        <p className="font-mono text-xl text-center text-foreground/85 leading-relaxed">
                          cᵢ = (critério direto)ᵢ / (critério inverso)ᵢ
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed text-center mt-1">
                          Depois normaliza: xᵢ = (cᵢ / Σcⱼ) × V
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Casos Avançados Resolvidos",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo 1 — Divisão com Diferença Conhecida
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          R$ 90.000 entre A e B na razão 5:4. Quanto A recebe a
                          mais que B?
                          <br />
                          Total = 9 → p = 10.000. A=50.000, B=40.000.
                          <br />
                          <strong>Diferença = 1 parte = R$ 10.000</strong>
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed mt-1">
                          Atalho: diferença = (5-4)/9 × 90.000 = 1/9 × 90.000 =
                          R$ 10.000.
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo 2 — Maior Cota Conhecida
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Quatro setores na razão 2:3:4:6 e o maior recebe R$
                          180.000. Total:
                          <br />
                          Total partes = 15. Maior = 6 → cada parte = 30.000.
                          <br />
                          <strong>Total = 15 × 30.000 = R$ 450.000</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo 3 — Bônus Inverso a Faltas
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Faltas: 2, 4, 8 → bônus inv. proporcional. Total R$
                          2.800.
                          <br />
                          Inv. = 4, 2, 1 (total 7). p = 400.
                          <br />
                          Quem faltou 2x: <strong>4 × 400 = R$ 1.600</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Atalhos para Casos Especiais",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-lg text-foreground/85 leading-relaxed mb-1">
                          Atalho 1 — Diferença entre Partes
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          diferença = (r_maior - r_menor) / r_total × V
                        </p>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-lg text-foreground/85 leading-relaxed mb-1">
                          Atalho 2 — Total a partir de Uma Parte
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Se uma parte vale X e tem razão r, o valor de cada
                          unidade = X/r → Total = (Σr) × (X/r)
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                        <strong>Pulo do Gato:</strong> Em divisão inversamente
                        proporcional, sempre converta para MMC comum antes de
                        somar. Ex: {"{1/2, 1/3}"} → {"{3/6, 2/6}"} → razão 3:2.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Pegadinhas de Divisão",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha — Proporção com Razão Inversa"
                      >
                        "Dividir 120 em partes inversamente proporcionais a 2 e
                        3." O erro é dividir 120 na razão 2:3. O correto é
                        dividir na razão 3:2 (inverso de 2:3). Partes: 3+2=5 →
                        72 e 48.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-6">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[6]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Dividir R$ 180.000 entre três setores na razão 2:3:4. O setor que fica com a maior parte receberá:"
          alternativas={[
            { letra: "A", texto: "R$ 40.000", correta: false },
              { letra: "B", texto: "R$ 60.000", correta: false },
              { letra: "C", texto: "R$ 72.000", correta: false },
              { letra: "D", texto: "R$ 80.000", correta: true },
              { letra: "E", texto: "R$ 90.000", correta: false }
          ]}
          dicaEstrategica="Maior (4 partes): 4×20.000 = R$ 80.000."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "2+3+4 = 9 partes." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada parte: 180.000/9 = 20.000." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa D como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              variant={mv[6]}
              resumoVisual={{
                moduloNome: "Módulo 6",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-rose-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-rose-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-rose-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 6",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                      <p className="font-bold text-rose-600 dark:text-rose-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizDivisaoAdv}
              titulo="QUIZ: Div. Prop. Avançada"
              numero={5}
              variant={mv[6]}
              icone="⚙️"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Resumo Visual"
              variant={mv[6]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Diagrama — Fluxo de Divisão Proporcional",
                          type: "Diagrama de Processo",
                          placeholderColor:
                            "bg-violet-100 dark:bg-violet-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama dark premium mostrando o fluxo de resolução de divisão proporcional. Entrada: Valor V e Razões r1:r2:r3. Processo: soma das partes → valor unitário → multiplicação por cada razão. Saída: x1, x2, x3. Variante lateral para divisão inversa: inversão das razões. Paleta violeta-índigo, ícones técnicos.
                        },
                      ]}
                      moduloNome="Divisão Proporcional Avançada"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 7 — PROPORÇÃO CONTÍNUA E MÉDIA PROPORCIONAL            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7">
        <ModuleBanner numero={7}
          titulo="Proporção Contínua e Média Proporcional"
          descricao="O tema mais elegante da proporção: quando o meio é a raiz quadrada dos extremos."
           variant={mv[7]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Proporção Contínua: O Elegante Encadeamento"
              description="Quando o meio termo é a chave geométrica entre os extremos — a média proporcional"
              variant={mv[7]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Uma **proporção contínua** é um encadeamento elegante de razões
                onde o termo do meio aparece em ambas as razões. Formalmente,
                a:b = b:c. Note a estrutura: a e c são os "extremos" e b é o
                "meio" — e b aparece duas vezes, uma como consequente da
                primeira razão e outra como antecedente da segunda. Aplicando a
                propriedade fundamental (produto dos extremos = produto dos
                meios), obtemos: a × c = b × b, ou b² = a × c. Logo, b = √(a ×
                c). Este resultado é profundo: o termo do meio é a **raiz
                quadrada geométrica** (ou média geométrica) dos extremos. Por
                exemplo, se a = 4 e c = 16, então a proporção contínua é 4:b =
                b:16, e b = √(4×16) = √64 = 8. Você pode verificar: 4:8 = 8:16 =
                1:2 ✓. Esta relação é geometricamente bonita e frequentemente
                aparece em problemas de escala, ampliação de fotografias, e
                design (onde proporções mantêm a harmonia visual).
              </p>

              <p>
                É crucial não confundir **média geométrica** (√(a×c)) com
                **média aritmética** ((a+c)/2). Para 4 e 16, a média aritmética
                é (4+16)/2 = 10, enquanto a média geométrica é √(4×16) = 8.
                Ambas são válidas em diferentes contextos, mas em proporção
                contínua, apenas a geométrica funciona. Por quê? Porque a
                proporção contínua é uma afirmação sobre **razões iguais**, não
                sobre diferenças iguais. A progressão geométrica (PG) é
                intimamente relacionada: em uma PG com primeiro termo a e último
                termo c, o termo do meio de três termos é exatamente √(a×c).
                Exemplo: a PG 2, 6, 18 tem razão q = 3. O termo do meio (6) é
                √(2×18) = √36 = 6 ✓. Em engenharia e finanças, progressões
                geométricas modelam crescimento exponencial (como juros
                compostos), e a média geométrica é a ferramenta natural para
                análise.
              </p>

              <p>
                De proporção contínua derivam dois conceitos frequentemente
                testados: **terceira proporcional** e **quarta proporcional**. A
                terceira proporcional a dois números a e b é o número x tal que
                a:b = b:x. Aplicando a propriedade fundamental: ax = b² → x =
                b²/a. Exemplo: terceira proporcional a 5 e 10 é x tal que 5:10 =
                10:x → 5x = 100 → x = 20. A quarta proporcional de três números
                a, b, c é o número x tal que a:b = c:x. Aplicando a propriedade:
                ax = bc → x = (b×c)/a. Exemplo: quarta proporcional de 6, 9, 8 é
                x tal que 6:9 = 8:x → 6x = 72 → x = 12. Estes dois conceitos são
                frequentemente cobertos em questões CESGRANRIO de forma indireta
                — uma questão pode perguntar "se a razão entre distância no mapa
                e distância real é 1:50.000, e uma distância no mapa é 4 cm,
                qual é a distância real?", que é exatamente encontrar a quarta
                proporcional de 1, 50.000, 4.
              </p>

              <p>
                Um caso especial elegante é a **razão áurea**, frequentemente
                mencionada em contextos de arquitetura, arte e design. A razão
                áurea φ (lê-se "phi") ≈ 1,618 é definida pela proporção a:b =
                (a+b):a, que leva a x² − x − 1 = 0 com solução φ = (1+√5)/2. Se
                você possui um segmento de comprimento total L e deseja
                dividi-lo na razão áurea (encontrando um ponto que o separa em
                duas partes cuja razão é φ), o segmento maior será L × φ/(1+φ) e
                o menor será L − (segmento maior). A razão áurea aparece na
                natureza (conchas, pétalas de flores), na história da arte
                (padrão estético), e raramente em provas de CESGRANRIO — mas
                quando aparece, invariavelmente fornecem o valor φ ≈ 1,618, não
                sendo necessário memorizar ou derivar.
              </p>

              <p>
                A CESGRANRIO testa proporção contínua através de: (1) Cálculo de
                média proporcional (geométrica) dadas dois números; (2)
                Identificação de termos em progressão geométrica; (3) Terceira
                ou quarta proporcional em problemas contextualizados (escalas,
                mapa, receitas, misturas); (4) Discriminação entre média
                aritmética e geométrica (pegadinha clássica). Uma questão
                típica: "Se a receita de um produto demanda proporção 3:5:7 de
                ingredientes A, B, C, qual a quantidade de B em 1.500g?" (quarta
                proporcional). Outra: "Uma série de tamanhos de tubulação segue
                proporção contínua: o primeiro tem 50mm, o terceiro tem 200mm.
                Qual o diâmetro do segundo?" (terceira proporcional ou média
                geométrica: √(50×200) = √10.000 = 100mm). Candidatos que
                entendem a lógica subjacente resolvem esses com confiança;
                candidatos que tentam memorizar fórmulas frequentemente falham.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Definições: Contínua, Terceira, Quarta & Média
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>Proporção Contínua:</strong> a:b = b:c ⟹ b² = a×c ⟹
                    b = √(a×c) (média geométrica)
                  </p>
                  <p>
                    <strong>Terceira Proporcional:</strong> a:b = b:x ⟹ x = b²/a
                  </p>
                  <p>
                    <strong>Quarta Proporcional:</strong> a:b = c:x ⟹ x =
                    (b×c)/a
                  </p>
                  <p>
                    <strong>Média Geométrica vs Aritmética:</strong> √(a×c) ≠
                    (a+c)/2 | Geométrica para proporções, Aritmética para somas
                  </p>
                  <p>
                    <strong>Razão Áurea (φ):</strong> φ = (1+√5)/2 ≈ 1,618 |
                    Define proporção a:b = (a+b):a
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Proporção Contínua e Termos Proporcionais"
              description="Da média geométrica à quarta proporcional — tudo que a CESGRANRIO cobra."
              variant={mv[7]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Proporção Contínua — Teoria e Aplicação"
              icone="🔗"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: Proporção Contínua",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Em uma <strong>proporção contínua</strong> a:b = b:c, o
                        termo do meio (b) aparece em ambas as razões. Pela
                        propriedade fundamental: b² = a × c. Logo{" "}
                        <strong>b = √(a × c)</strong> é a{" "}
                        <em>média geométrica</em>
                        (ou média proporcional) entre a e c.
                      </p>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Fórmulas Essenciais:
                        </p>
                        <ul className="font-mono text-xl space-y-1 text-foreground/85 leading-relaxed">
                          <li>Média proporcional (geométrica): x = √(a × b)</li>
                          <li>Terceira proporcional: a:b = b:x → x = b²/a</li>
                          <li>
                            Quarta proporcional: a:b = c:x → x = (b × c)/a
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Três Casos Resolvidos",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <p className="font-bold text-pink-700 dark:text-pink-400 text-lg text-foreground/85 leading-relaxed mb-1">
                          Exemplo 1 — Média Proporcional entre 4 e 16
                        </p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">
                          x = √(4 × 16) = √64 = <strong>8</strong>
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Diferente da média aritmética: (4+16)/2 = 10.
                        </p>
                      </div>
                      <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <p className="font-bold text-pink-700 dark:text-pink-400 text-lg text-foreground/85 leading-relaxed mb-1">
                          Exemplo 2 — Proporção Contínua a:b = b:c, a=3, c=27
                        </p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">
                          b² = 3 × 27 = 81 → b = <strong>9</strong>
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Verificação: 3:9 = 9:27 = 1:3 ✓
                        </p>
                      </div>
                      <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <p className="font-bold text-pink-700 dark:text-pink-400 text-lg text-foreground/85 leading-relaxed mb-1">
                          Exemplo 3 — Quarta Proporcional de 5, 8 e 15
                        </p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">
                          5:8 = 15:x → 5x = 8×15 = 120 → x = <strong>24</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Média Geométrica vs. Aritmética",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Não confunda:
                        </p>
                        <ul className="text-xl space-y-1 text-foreground/85 leading-relaxed">
                          <li>
                            Média <strong>aritmética</strong> entre 4 e 16:
                            (4+16)/2 = <strong>10</strong>
                          </li>
                          <li>
                            Média <strong>geométrica</strong> (proporcional)
                            entre 4 e 16: √(4×16) = <strong>8</strong>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Razão Composta:
                        </p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">
                          Se a:b = 3:4 e b:c = 6:5 →<br />
                          a:c = (a/b) × (b/c) = (3/4) × (6/5) = 18/20 ={" "}
                          <strong>9:10</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                        <strong>Pulo do Gato:</strong> Em uma PG com razão q, o
                        termo do meio é sempre a média geométrica dos vizinhos:
                        b = √(a × c).
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Razão Áurea",
                  icone: "✨",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        A <strong>razão áurea</strong> (φ ≈ 1,618) é um caso
                        especial de proporção onde a/b = (a+b)/a. Questões
                        pedem: "segmento de 10 dividido na razão áurea".
                      </p>
                      <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 font-mono text-xl text-foreground/85 leading-relaxed">
                        <p>
                          Parte maior = 10 × φ/(1+φ) = 10 × 1,618/2,618 ≈{" "}
                          <strong>6,18</strong>
                        </p>
                        <p>
                          Parte menor = 10 - 6,18 = <strong>3,82</strong>
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Atenção CESGRANRIO">
                        A questão sobre razão áurea sempre dará φ ≈ 1,618. Use
                        como dado. Não memorize φ — a prova fornece.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-7">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[7]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Dividir R$ 180.000 entre três setores na razão 2:3:4. O setor que fica com a maior parte receberá:"
          alternativas={[
            { letra: "A", texto: "R$ 40.000", correta: false },
              { letra: "B", texto: "R$ 60.000", correta: false },
              { letra: "C", texto: "R$ 72.000", correta: false },
              { letra: "D", texto: "R$ 80.000", correta: true },
              { letra: "E", texto: "R$ 90.000", correta: false }
          ]}
          dicaEstrategica="Maior (4 partes): 4×20.000 = R$ 80.000."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "2+3+4 = 9 partes." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada parte: 180.000/9 = 20.000." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa D como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              variant={mv[7]}
              resumoVisual={{
                moduloNome: "Módulo 7",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-indigo-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 7",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                      <p className="font-bold text-indigo-600 dark:text-indigo-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizContinua}
              titulo="QUIZ: Proporção Contínua"
              numero={5}
              variant={mv[7]}
              icone="🔗"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Resumo Visual"
              variant={mv[7]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Diagrama — Termos Proporcionais",
                          type: "Diagrama Técnico",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama dark premium sobre proporção contínua. Três círculos conectados: a → b → c, com b ao centro maior. Fórmula b²=a×c destacada. Comparação visual: média geométrica (√produto) vs. aritmética (soma/2). Exemplos: 4, 8, 16 (geométrica) e 4, 10, 16 (aritmética). Paleta rosa-pink, estilo técnico premium.
                        },
                      ]}
                      moduloNome="Proporção Contínua e Média Proporcional"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 8 — ESCALAS E MAPAS                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8">
        <ModuleBanner numero={8}
          titulo="Escalas e Mapas"
          descricao="De plantas industriais a mapas cartográficos: as conversões que a CESGRANRIO cobra todo concurso."
           variant={mv[8]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Escalas: A Razão Entre Representação e Realidade"
              description="De plantas industriais a mapas geográficos — a aplicação mais tangível da razão em engenharia"
              variant={mv[8]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Uma escala é formalmente a **razão entre a dimensão representada
                (mapa, planta, desenho) e a dimensão real correspondente**.
                Expressa-se como E = d_mapa / d_real ou na forma 1:N,
                significando que uma unidade no mapa representa N unidades na
                realidade. Uma escala 1:50.000 é uma razão — especificamente, 1
                cm no mapa iguala 50.000 cm (500 metros) na realidade. O
                conceito é absolutamente essencial em engenharia, cartografia,
                arquitetura e design. Um engenheiro de Petrobras precisa
                desenhar uma tubulação de 20 metros de comprimento numa planta
                que cabe numa folha A4. Não é possível desenhar a verdadeiro
                tamanho, então usa-se escala. Com escala 1:50, a tubulação é
                representada por uma linha de 20m ÷ 50 = 0,4 m = 40 cm no papel
                — ainda grande, mas manejável. Se usasse escala 1:100, seria 20
                cm. A escolha de escala é um compromisso entre detalhe visível
                (escala grande, como 1:50, mostra mais detalhe) e abrangência
                (escala pequena, como 1:500.000, mostra mais área).
              </p>

              <p>
                Existe uma subdivisão importante: **escalas grandes** e
                **escalas pequenas**. Ao contrário da intuição linguística, uma
                escala "grande" (como 1:50) representa proporcionalmente um
                denominador menor, portanto cobre menos área mas oferece mais
                detalhe. Uma escala "pequena" (como 1:500.000) tem denominador
                maior, cobre mais área mas com menos detalhe. Em plantas
                industriais, Petrobras tipicamente usa escalas de 1:50 (para
                detalhes críticos de tubulação e valvularia), 1:100 (para layout
                de equipamentos em uma unidade de processamento), 1:500 (para
                layout geral de uma refinaria), 1:1.000 (para layout do complexo
                inteiro). Em mapas cartográficos, escalas variam drasticamente:
                1:5.000 (mapa de uma cidade pequena), 1:25.000 (mapa detalhado
                de região), 1:100.000 (mapa de microrregião), 1:1.000.000 (mapa
                de estado ou país). A escala não é uma constante universal; é
                escolhida pelo designer conforme o propósito.
              </p>

              <p>
                As conversões entre mapa e realidade são o coração da aplicação
                prática. Se você tem um mapa em escala 1:50.000 e mede uma
                distância de 4 cm entre duas cidades, a distância real é 4 cm ×
                50.000 = 200.000 cm = 2 km. O cálculo é uma simples
                proporcionalidade direta (módulo 3): 1 cm (mapa) / 50.000 cm
                (realidade) = 4 cm (mapa) / x cm (realidade) → x = 4 × 50.000 =
                200.000 cm. A dificuldade frequentemente reside na **conversão
                de unidades**. Uma questão pode dizer "escala 1:24.000,
                distância real 1,2 km, qual a medida no mapa?". Se você tentar
                aplicar diretamente 1,2 ÷ 24.000, obtém um número estranho. O
                correto é converter 1,2 km para a mesma unidade do denominador:
                1,2 km = 1.200.000 cm. Agora: mapa = 1.200.000 ÷ 24.000 = 50 cm.
                O erro mais comum é não converter unidades — candidatos
                mecanicamente dividem números sem perceber que estão misturando
                unidades (km no numerador, cm no denominador).
              </p>

              <p>
                Na Petrobras, escalas aparecem em contextos específicos: plantas
                de refinarias, desenhos de oleodutos, mapas de campos de
                exploração, projetos de plataformas offshore. Um especialista em
                produção pode receber um mapa em escala 1:50.000 mostrando
                campos de petróleo e precisar calcular distâncias reais para
                planejamento logístico. Um engenheiro pode receber uma planta em
                escala 1:100 e precisar verificar se um novo equipamento
                (dimensões reais 3m × 5m) cabe no espaço alocado (10cm × 16,7cm
                no desenho, que correspondem a 10×100=1.000cm=10m e
                16,7×100=1.670cm=16,7m na realidade — portanto cabe). A
                habilidade de converter entre escalas sem erros é absolutamente
                prática.
              </p>

              <p>
                A CESGRANRIO testa escalas em cinco contextos principais: (1)
                Conversão direta (mapa → real ou real → mapa); (2) Mudança de
                escala (redrawing em escala diferente); (3) Problemas com
                unidades mistas (km, m, cm, mm); (4) Áreas em escala (se 1cm →
                50m, então 1cm² → 2.500m²); (5) Reconhecimento de qual escala é
                "maior" ou "menor" (um truque semântico frequente). Um erro
                sistêmico: quando a questão apresenta uma mudança de escala,
                candidatos frequentemente calculam mal a nova medida. Exemplo:
                "desenho na escala 1:50 mede 6cm. Redesenhe em escala 1:100.
                Qual o novo tamanho?" Resposta correta: a medida real é
                6×50=300cm. Na escala 1:100, é 300÷100=3cm. Candidatos erram
                tentando converter diretamente "de 1:50 para 1:100" sem passar
                pela realidade.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Definição & Conversões Essenciais
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>Escala:</strong> E = d_mapa / d_real | Forma 1:N (1
                    unidade no mapa = N unidades na realidade)
                  </p>
                  <p>
                    <strong>Mapa → Real:</strong> d_real = d_mapa × N
                  </p>
                  <p>
                    <strong>Real → Mapa:</strong> d_mapa = d_real ÷ N
                  </p>
                  <p>
                    <strong>Mudança de Escala:</strong> Passe sempre pela
                    realidade: d_real = d_mapa1 × N₁, depois d_mapa2 = d_real ÷
                    N₂
                  </p>
                  <p>
                    <strong>Unidades:</strong> Converta TUDO para cm antes de
                    calcular, depois converta para a unidade pedida
                  </p>
                  <p>
                    <strong>Escala Grande (mais detalhe):</strong> 1:50, 1:100 |{" "}
                    <strong>Escala Pequena (menos detalhe):</strong> 1:50.000,
                    1:1.000.000
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Escalas: Teoria e Conversão"
              description="Da definição às conversões mais complexas de unidades."
              variant={mv[8]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Escalas e Mapas — Protocolo Completo"
              icone="🗺️"
              corIndicador="bg-teal-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Conceituação: O que é Escala",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        <strong>Escala</strong> é a razão entre a medida no mapa
                        (ou planta) e a medida real correspondente: E = d_mapa /
                        d_real. A escala 1:N significa que 1 unidade no papel =
                        N unidades na realidade.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <p className="font-bold text-teal-700 dark:text-teal-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Escala Grande (mais detalhe)
                          </p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">1:200 → mais zoom</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Plantas de equipamentos
                          </p>
                        </div>
                        <div className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <p className="font-bold text-teal-700 dark:text-teal-400 text-lg text-foreground/85 leading-relaxed mb-1">
                            Escala Pequena (menos detalhe)
                          </p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">
                            1:500.000 → mais distância
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Mapas de regiões
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        Engenheiros de projetos da Petrobras usam escalas 1:50
                        para detalhes de tubulação e 1:1.000 para layout geral
                        de refinarias. A mesma tubulação que mede 4 cm na planta
                        1:50 tem comprimento real de 2 m.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Conversões Passo a Passo",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Tipo 1 — Mapa → Real
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Escala 1:50.000. Distância no mapa: 3 cm.
                          <br />
                          Real = 3 × 50.000 = 150.000 cm ÷ 100.000 ={" "}
                          <strong>1,5 km</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Tipo 2 — Real → Mapa
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Escala 1:24.000. Distância real: 1,2 km.
                          <br />
                          1,2 km = 120.000 cm. No mapa: 120.000 ÷ 24.000 ={" "}
                          <strong>5 cm</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Tipo 3 — Mudança de Escala
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Duto mede 3 m na escala 1:50. Na escala 1:150:
                          <br />
                          Real = 3 × 50 = 150 m → na 1:150: 150/150 ={" "}
                          <strong>1 m</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Conversão de Unidades",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Tabela de Conversão Essencial:
                        </p>
                        <table className="text-xl w-full text-foreground/85 leading-relaxed">
                          <thead>
                            <tr className="text-amber-600 font-bold text-lg text-foreground/85 leading-relaxed">
                              <th className="text-left pb-1">De</th>
                              <th className="text-left pb-1">Para cm</th>
                              <th className="text-left pb-1">Para m</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono text-lg text-foreground/85 leading-relaxed space-y-1">
                            <tr>
                              <td>1 km</td>
                              <td>100.000 cm</td>
                              <td>1.000 m</td>
                            </tr>
                            <tr>
                              <td>1 m</td>
                              <td>100 cm</td>
                              <td>1 m</td>
                            </tr>
                            <tr>
                              <td>1 cm</td>
                              <td>1 cm</td>
                              <td>0,01 m</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                        <strong>Pulo do Gato:</strong> Sempre converta TUDO para
                        a mesma unidade (cm) antes de aplicar a escala. Só
                        converta para a unidade final pedida ao terminar.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Dobrar e Triplicar Escala",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha — Dobrar a Escala"
                      >
                        "A escala foi dobrada de 1:100.000 para 1:50.000." Uma
                        rota que media 5 cm passará a medir{" "}
                        <strong>10 cm</strong> (dobra no mapa). Escala "maior"
                        (1:50.000 {">"} 1:100.000) = mais detalhe = mais cm no
                        papel.
                      </AlertBox>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        A confusão ocorre porque "dobrar a escala" pode ser
                        interpretada como dobrar N (de 1:50.000 para 1:100.000,
                        o que afasta) ou dobrar o detalhe (de 1:100.000 para
                        1:50.000, o que aproxima). Leia o contexto.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── CardCarousel — Tipos de Aplicação ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Tipos de Questão de Escala"
              description="Os 4 formatos que a CESGRANRIO usa para cobrar escalas."
              variant={mv[8]}
            />
            <CardCarousel
              cards={[
                {
                  icone: "📏",
                  titulo: "Mapa → Real",
                  descricao:
                    "Dado o mapa e a escala, calcular a distância real. Real = mapa × N.",
                  corFundo: "bg-teal-100 dark:bg-teal-900/30",
                },
                {
                  icone: "📐",
                  titulo: "Real → Mapa",
                  descricao:
                    "Dado o real e a escala, calcular a medida no papel. Mapa = real ÷ N.",
                  corFundo: "bg-cyan-100 dark:bg-cyan-900/30",
                },
                {
                  icone: "🔄",
                  titulo: "Mudança de Escala",
                  descricao:
                    "Calcular nova medida no papel com escala diferente. Passe pelo real como intermediário.",
                  corFundo: "bg-sky-100 dark:bg-sky-900/30",
                },
                {
                  icone: "🔍",
                  titulo: "Determinar N",
                  descricao:
                    "Dadas medidas no mapa e no real, calcular N = d_real ÷ d_mapa (mesma unidade).",
                  corFundo: "bg-blue-100 dark:bg-blue-900/30",
                },
              ]}
              itemsPerView={2}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-8">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[8]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em um mapa de escala 1:25.000, duas refinarias distam 8 cm. A distância real entre elas é:"
          alternativas={[
            { letra: "A", texto: "200 m", correta: false },
              { letra: "B", texto: "2 km", correta: true },
              { letra: "C", texto: "20 km", correta: false },
              { letra: "D", texto: "200 km", correta: false },
              { letra: "E", texto: "0,2 km", correta: false }
          ]}
          dicaEstrategica="Conversões: ÷100 → metros, ÷1000 → km."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "8 cm × 25.000 = 200.000 cm = 2.000 m = 2 km." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={5}
              variant={mv[8]}
              resumoVisual={{
                moduloNome: "Módulo 8",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-emerald-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-emerald-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-emerald-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 8",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizEscalas}
              titulo="QUIZ: Escalas e Mapas"
              numero={6}
              variant={mv[8]}
              icone="🗺️"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={4}
              title="Resumo Visual"
              variant={mv[8]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Infográfico — Escalas e Conversões",
                          type: "Infográfico de Processo",
                          placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Infográfico dark premium sobre escalas. Três colunas verticais: 1) Planta de refinaria (escala 1:200, equipamento 4,5cm = 9m real); 2) Mapa regional (escala 1:500.000, 7cm = 35km real); 3) Planta industrial (escala 1:50, corredor 6cm = 3m). Setas de conversão: ×N para mapa→real, ÷N para real→mapa. Paleta teal-cyan, estilo técnico Petrobras, fundo escuro.
                        },
                      ]}
                      moduloNome="Escalas e Mapas"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 9 — APLICAÇÕES INDUSTRIAIS PETROBRAS                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9">
        <ModuleBanner numero={9}
          titulo="Aplicações Industriais Petrobras"
          descricao="Contextos reais: FPSO, oleodutos, refinarias e plataformas. O coração das questões CESGRANRIO."
           variant={mv[9]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Razão e Proporção no Coração da Petrobras"
              description="De FPSO a refinarias: como a matemática funciona em operações reais de exploração e produção"
              variant={mv[9]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Razão e proporção não são abstratidações matemáticas isoladas em
                livros; elas são o **linguajar prático da engenharia de
                petróleo**. Desde o momento em que uma empresa planeja um poço,
                até o fechamento de uma operação décadas depois, razões e
                proporções guiam decisões de bilhões de reais. Quando a
                Petrobras avalia o **rendimento de uma refinaria** — quantos
                barris úteis produz a partir de x barris de petróleo bruto
                processados — está calculando uma razão: rendimento = barris
                úteis / barris brutos. A Refinaria Presidente Bernardes (RPBC)
                processa cerca de 300.000 barris por dia e produz 210.000 barris
                de derivados úteis, rendimento = 210.000/300.000 = 0,70 = 70%.
                Este é um número absolutamente central para qualquer análise de
                competitividade e eficiência da refinaria. Se essa métrica cai
                de 70% para 60%, significa um problema operacional sério. Se
                sobe de 70% para 75% após otimização, é sucesso mensurado e
                reportado aos acionistas.
              </p>

              <p>
                Na exploração e produção (E&P), plataformas offshore usam
                proporções para dimensionar **sistemas de separação e
                processamento**. Uma FPSO (Floating Production, Storage and
                Offloading) típica tem múltiplos separadores hidrociclo nicos
                para remover água do óleo bruto. Se 6 separadores em paralelo
                processam 2.400 m³/hora, então a taxa de processamento é
                diretamente proporcional ao número de separadores: com 9
                separadores, espera-se 9/6 × 2.400 = 3.600 m³/hora. Além disso,
                **custos são proporcionais**: perfuração de poços a 500 metros
                custa aproximadamente R$ 3 milhões; perfuração a 1.200 metros
                segue a mesma proporcionalidade (com ajustes), custando rougly
                1.200/500 × 3.000.000 = R$ 7.200.000. Estimar orçamentos de
                grandes projetos (que custam entre R$ 10 bilhões e R$ 30
                bilhões) depende crucialmente dessas proporções iniciais.
              </p>

              <p>
                Logística e transporte de petróleo dependem de **escalas e
                proporções constantemente**. Uma plataforma a 150 km da costa em
                escala de mapa 1:500.000 representa uma distância de 1.500.000
                cm ÷ 500.000 = 3 cm no papel. Planejadores usam mapas para
                estimar rotas de navios tanque e sistemas de oleoduto, sempre
                convertendo entre escalas. Um oleoduto que deve percorrer 300 km
                em uma planta 1:100.000 é representado por uma linha de 300 km =
                30.000.000 cm ÷ 100.000 = 300 cm = 3 metros no desenho —
                impraticável. Em escala 1:1.000.000, seria 30 cm — manejável. O
                engenheiro escolhe a escala apropriada conforme o contexto
                (plano geral, detalhes, logística).
              </p>

              <p>
                Na **gestão de recursos e pessoal**, Petrobras distribui equipes
                em plataformas proporcionalmente a critérios combinados. Três
                plataformas A, B, C com capacidade de processamento 3.000,
                4.000, 5.000 bpd (barris por dia) devem receber técnicos
                proporcionalmente — plataforma A: 3/(3+4+5) × 100 técnicos = 30;
                plataforma B: 40; plataforma C: 50. Mas há também critérios
                inversos: a plataforma com maior taxa de falhas histórica merece
                técnicos especializados. A divisão torna-se combinada:
                distribuir bônus anual proporcionalmente a produção (direto) mas
                inversamente a acidentes ocupacionais (inverso). O coeficiente é
                produção/acidentes, e a distribuição segue esses coeficientes
                normalizados.
              </p>

              <p>
                A CESGRANRIO, ao cobrar "Razão e Proporção", frequentemente
                embutiça uma questão Petrobras real em linguagem de prova.
                Exemplo: "Uma plataforma processa 6.000 m³ de óleo bruto por
                dia. A razão entre óleo bruto processado e óleo destilado obtido
                é 5:4. Qual a quantidade de óleo destilado?" Resposta: óleo
                destilado = 6.000 × 4/5 = 4.800 m³/dia. Outra: "Três gerentes de
                campo recebem bonificação de R$ 120.000 na razão de 2:3:5 por
                desempenho. Quanto o segundo gerente recebe?" Resposta:
                3/(2+3+5) × 120.000 = 36.000. Estes tipos de questão não são
                abstratos; refletem situações que acontecem mensalmente dentro
                da empresa.
              </p>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Contextos Reais Petrobras: Checklist
                </h4>
                <div className="space-y-2 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    ✓ <strong>Rendimento/Eficiência:</strong> Barris úteis /
                    barris brutos, energia saída / energia entrada, m³ produzido
                    / m³ processado
                  </p>
                  <p>
                    ✓ <strong>Escalabilidade:</strong> Se N equipamentos
                    processam X, então 2N equipamentos processam 2X (proporção
                    direta)
                  </p>
                  <p>
                    ✓ <strong>Custos:</strong> Custo de perfuração ∝
                    profundidade; custo de tubagem ∝ comprimento
                  </p>
                  <p>
                    ✓ <strong>Logística:</strong> Escalas em plantas, mapas e
                    rotas; conversões entre unidades essenciais
                  </p>
                  <p>
                    ✓ <strong>Gestão de Recursos:</strong> Distribuição
                    proporcional a critérios (produção, capacidade, histórico)
                  </p>
                  <p>
                    ✓ <strong>Segurança:</strong> Razão
                    acidentes/horas-trabalhadas; distribuição inversa de bônus
                    conforme infrações
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Razão e Proporção no Setor de E&P"
              description="Exemplos reais de como estas ferramentas são usadas em operações petrolíferas."
              variant={mv[9]}
              className="mb-6"
            />
            <ContentAccordion
              titulo="Aplicações Petrobras — Casos Completos"
              icone="🛢️"
              corIndicador="bg-slate-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "C — Rendimento e Eficiência Operacional",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl leading-relaxed text-foreground/85">
                        Na Petrobras, razão e proporção são fundamentais para
                        calcular
                        <strong> rendimento de refinarias</strong> (barris úteis
                        / barris brutos),
                        <strong> eficiência de bombas</strong> (energia útil /
                        energia total) e
                        <strong> produtividade de plataformas</strong>{" "}
                        (barris/dia por equipamento).
                      </p>
                      <div className="grid gap-3">
                        <div className="p-3 bg-slate-500/10 rounded-lg border border-slate-500/20">
                          <p className="font-bold text-slate-300 text-lg text-foreground/85 leading-relaxed mb-1">
                            Exemplo 1 — Rendimento de Refinaria
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            80.000 barris brutos entram, rendimento 75%.
                            Derivados = 80.000 × 0,75 ={" "}
                            <strong>60.000 barris</strong>.
                          </p>
                        </div>
                        <div className="p-3 bg-slate-500/10 rounded-lg border border-slate-500/20">
                          <p className="font-bold text-slate-300 text-lg text-foreground/85 leading-relaxed mb-1">
                            Exemplo 2 — Produção de FPSO
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            6 separadores → 2.400 m³/h. Com 9 separadores: 9/6 ×
                            2.400 = <strong>3.600 m³/h</strong>.
                          </p>
                        </div>
                        <div className="p-3 bg-slate-500/10 rounded-lg border border-slate-500/20">
                          <p className="font-bold text-slate-300 text-lg text-foreground/85 leading-relaxed mb-1">
                            Exemplo 3 — Custo de Perfuração
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            500 m custa R$ 3.000.000 (diretamente proporcional à
                            profundidade). 1.200 m: 1200/500 × 3.000.000 ={" "}
                            <strong>R$ 7.200.000</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Distribuição de Recursos",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-500/10 rounded-xl border border-slate-500/20">
                        <p className="font-bold text-slate-300 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Situação: Aumento de Produção Proporcional
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Unidades A, B, C têm capacidade 15.000, 25.000, 10.000
                          barris/dia. Um aumento de 60.000 barris é distribuído
                          proporcionalmente.
                        </p>
                        <p className="text-xl mt-2 font-mono text-foreground/85 leading-relaxed">
                          Total: 50.000. Partes:
                          <br />
                          A: 15/50 × 60.000 = 18.000
                          <br />
                          B: 25/50 × 60.000 = 30.000
                          <br />
                          C: 10/50 × 60.000 = 12.000
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "D — Dicas: Relações Inversas na Indústria",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Relações Inversas na Petrobras:
                        </p>
                        <ul className="text-xl space-y-1 list-disc list-inside text-foreground/85 leading-relaxed">
                          <li>Diâmetro de tubulação × Pressão (inversa)</li>
                          <li>
                            Número de técnicos × Tempo de inspeção (inversa)
                          </li>
                          <li>
                            Velocidade de extração × Tempo de poço (inversa)
                          </li>
                        </ul>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-lg text-foreground/85 leading-relaxed text-primary">
                        <strong>Pulo do Gato:</strong> Em questões com múltiplas
                        grandezas (técnicos + horas + equipamentos), use a Regra
                        de Três COMPOSTA: causas/efeito = constante.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Quando a Proporção Não Vale",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox
                        tipo="warning"
                        titulo="Atenção — Rendimento Não É Sempre Linear"
                      >
                        Em situações reais, o rendimento de refinarias pode
                        variar com o tipo de petróleo. Mas na CESGRANRIO, se a
                        questão não informar variação,
                        <strong> assuma proporção linear</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-9">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[9]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Dividir R$ 180.000 entre três setores na razão 2:3:4. O setor que fica com a maior parte receberá:"
          alternativas={[
            { letra: "A", texto: "R$ 40.000", correta: false },
              { letra: "B", texto: "R$ 60.000", correta: false },
              { letra: "C", texto: "R$ 72.000", correta: false },
              { letra: "D", texto: "R$ 80.000", correta: true },
              { letra: "E", texto: "R$ 90.000", correta: false }
          ]}
          dicaEstrategica="Maior (4 partes): 4×20.000 = R$ 80.000."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "2+3+4 = 9 partes." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada parte: 180.000/9 = 20.000." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa D como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              variant={mv[9]}
              resumoVisual={{
                moduloNome: "Módulo 9",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-cyan-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-cyan-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-cyan-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 9",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                      <p className="font-bold text-cyan-600 dark:text-cyan-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizPetrobras}
              titulo="QUIZ: Aplicações Petrobras"
              numero={5}
              variant={mv[9]}
              icone="🛢️"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Resumo Visual"
              variant={mv[9]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Mental — Razão e Proporção na Petrobras",
                          type: "Mapa Mental Industrial",
                          placeholderColor: "bg-slate-100 dark:bg-slate-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Mapa mental dark premium com tema Petrobras. Centro: logo Petrobras estilizado com "RAZÃO E PROPORÇÃO". Ramos: FPSO (produção por separador), Refinaria (rendimento), Oleoduto (pressão × diâmetro inverso), Perfuração (custo × profundidade), Distribuição de Recursos (orçamento proporcional). Ícones industriais reais. Paleta verde-azul Petrobras, fundo escuro técnico.
                        },
                      ]}
                      moduloNome="Aplicações Industriais Petrobras"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  MÓDULO 10 — SIMULADO FINAL ELITE                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10">
        <ModuleBanner numero={10}
          titulo="Simulado Final — Nível Elite"
          descricao="8 questões integrando todos os temas. O teste definitivo de preparação para a CESGRANRIO."
           variant={mv[10]}/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Simulado Final: Integrando Razão, Proporção e Aplicações"
              description="O teste definitivo — 8 questões que cobrem todos os 9 módulos anteriores em contextos reais"
              variant={mv[10]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Este módulo final é uma consolidação de tudo que foi aprendido
                nos nove módulos anteriores. Não é um novo tema matemático; é
                uma **prova integrada** que exige que você reconheça quando usar
                razão simples, quando usar proporção, quando usar regra de três,
                quando aplicar divisão proporcional, quando identificar
                proporcionalidade (direta ou inversa), quando aplicar proporção
                contínua, quando usar escalas, e como conectar tudo isto a
                contextos Petrobras reais. A prova de CESGRANRIO nunca testa um
                conceito isolado; sempre mescla conhecimentos. Uma questão pode
                começar com "Um oleoduto em escala 1:50.000 no mapa mede 8 cm. O
                custo de construção é proporcional ao comprimento real. Se 100
                km custam R$ 500 milhões, quanto custará este oleoduto?" Você
                precisa: (1) Converter escala (8 cm × 50.000 = 400 km); (2)
                Identificar proporção direta (comprimento ↑ custo ↑); (3) Montar
                e resolver (100/500 = 400/x → x = 2.000 milhões = R$ 2 bilhões).
              </p>

              <p>
                Os erros mais comuns em simulados finais refletem lacunas em
                qualquer dos módulos anteriores. Candidatos que confundem
                proporcionalidade direta com inversa frequentemente acertam
                30-40% do simulado. Candidatos que incorrem em erros de
                conversão de unidades (cm para km, por exemplo) eliminam pontos
                mesmo tendo a lógica correta. Candidatos que não simplificam
                frações ou não verificam se divisões chegam a números inteiros
                sofrem erros matemáticos básicos. Candidatos que lêem
                apressadamente ("a razão entre A e B") mas invertem
                inconscientemente (calculam B/A em vez de A/B) caem em
                pegadinhas clássicas. Este simulado serve para **diagnosticar**
                onde suas fraquezas residem. Se você errar questões sobre
                proporção contínua, sabe que precisa revisar o Módulo 7. Se
                errar questões com escalas, volta ao Módulo 8. Se errar questões
                combinadas, pratica a integração.
              </p>

              <p>
                O nível de dificuldade deste simulado é **Elite** — ou seja,
                questões que podem aparecer nas provas mais competitivas, onde a
                Petrobras seleciona entre candidatos com pontuação muito alta.
                Não são questões impossíveis, mas exigem atenção, cuidado e
                integração de múltiplos conceitos. Por exemplo: "Três
                plataformas A, B, C têm capacidade 4.000, 6.000, 8.000 bpd.
                Orçamento anual de R$ 18 bilhões é distribuído na razão de suas
                capacidades. Plataforma A recebe qual quantia?" Solução: Total
                capacidade = 18.000 bpd. A recebe 4.000/18.000 × 18 bilhões = R$
                4 bilhões. Simples se você domina divisão proporcional;
                inacessível se não. Outro exemplo de nível Elite: "Uma proporção
                é a:b = c:d. Dados a=6, b=9, d=12, encontre c e identifique se é
                uma proporção contínua ou quarta proporcional." Solução: 6/9 =
                c/12 → c = 8. É quarta proporcional. Verificação: 6:9 = 8:12
                simplificam ambas para 2:3 ✓. Questões assim diferenciam
                candidatos que apenas memorizaram procedimentos de candidatos
                que internalizaram conceitos.
              </p>

              <p>
                Estratégia para o simulado: (1) Leia a questão com atenção (uma
                leitura rápida pode perder nuances críticas); (2) Identifique
                qual tipo de problema é (razão? proporção? regra de três?
                escala?); (3) Converta unidades se necessário; (4) Aplique a
                fórmula apropriada; (5) Simplifique e chegue a uma resposta; (6)
                Verifique se a resposta faz sentido no contexto. Um número
                absurdamente grande ou pequeno em relação ao que se espera é
                sinal de erro. Se uma questão sobre escala (1:50.000) resulta em
                uma distância real de 0,001 cm, algo está errado. Se uma
                distribuição proporcional resulta em uma parte negativa, está
                errado. Verificações de plausibilidade eliminam muitos erros.
              </p>

              <p>
                Após completar este simulado, você terá cobertura de 100% dos
                tópicos testados em provas CESGRANRIO de matemática básica para
                Petrobras. As questões de razão e proporção não são apenas 1-2
                questões numa prova; frequentemente são 3-5 questões diretas +
                várias questões implícitas em regra de três composta,
                porcentagem, divisão de lucros, etc. Candidatos que dominam
                razão e proporção têm uma vantagem significativa. Candidatos que
                não dominam perdem pontos sistematicamente. Este módulo está
                desenhado para transformar você na primeira categoria.
              </p>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200 dark:border-violet-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">
                  Estratégia de Resolução: 5 Passos
                </h4>
                <div className="space-y-3 text-xl text-foreground/85 leading-relaxed">
                  <p>
                    <strong>PASSO 1: Leitura atenta</strong> — Identifique o
                    tipo de problema (razão, proporção, escala, divisão, etc.)
                  </p>
                  <p>
                    <strong>PASSO 2: Conversão de unidades</strong> — Se
                    necessário, converta tudo para uma unidade comum (cm, por
                    exemplo)
                  </p>
                  <p>
                    <strong>PASSO 3: Montagem da equação</strong> — Escreva
                    proporção, regra de três, ou divisão apropriada
                  </p>
                  <p>
                    <strong>PASSO 4: Resolução e simplificação</strong> —
                    Calcule, simplifique frações, chegue a número final
                  </p>
                  <p>
                    <strong>PASSO 5: Verificação de plausibilidade</strong> — O
                    resultado faz sentido? É razoável em magnitude? Responda!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Revisão Rápida ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Mapa de Revisão — Todos os Temas"
              description="Revise os pontos críticos antes de enfrentar o simulado final."
              variant={mv[10]}
              className="mb-6"
            />
            <CardCarousel
              titulo="Pontos-Chave para a Prova"
              cards={[
                {
                  icone: <LuScale className="w-6 h-6" />,
                  titulo: "Razão",
                  descricao:
                    "r = a/b. Sempre simplifique. Cuidado com a ordem de leitura (primeiro mencionado = numerador).",
                  corFundo: "bg-blue-100 dark:bg-blue-900/30",
                },
                {
                  icone: <LuLink className="w-6 h-6" />,
                  titulo: "Proporção Fundamental",
                  descricao:
                    "a × d = b × c (produto dos extremos = produto dos meios). Base de todo cálculo proporcional.",
                  corFundo: "bg-indigo-100 dark:bg-indigo-900/30",
                },
                {
                  icone: <LuTrendingUp className="w-6 h-6" />,
                  titulo: "Regra de 3 Direta",
                  descricao:
                    "Grandezas crescem juntas. y₁/y₂ = x₁/x₂. Mais tempo → mais produção.",
                  corFundo: "bg-emerald-100 dark:bg-emerald-900/30",
                },
                {
                  icone: <LuTrendingDown className="w-6 h-6" />,
                  titulo: "Regra de 3 Inversa",
                  descricao:
                    "Grandezas com produto constante. x₁y₁ = x₂y₂. Mais velocidade → menos tempo.",
                  corFundo: "bg-rose-100 dark:bg-rose-900/30",
                },
                {
                  icone: <LuDivide className="w-6 h-6" />,
                  titulo: "Divisão Proporcional",
                  descricao:
                    "Somar partes → calcular unitário → multiplicar. Para inversa: inverter razões antes.",
                  corFundo: "bg-amber-100 dark:bg-amber-900/30",
                },
                {
                  icone: <LuMap className="w-6 h-6" />,
                  titulo: "Escalas",
                  descricao:
                    "Real = mapa × N. Converter TUDO para cm primeiro. Mapa = real ÷ N.",
                  corFundo: "bg-teal-100 dark:bg-teal-900/30",
                },
              ]}
              itemsPerView={3}
            />
          </section>

          {/* ─── ALERTAS FINAIS ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-4">
            <ModuleSectionHeader
              index={3}
              title="Armadilhas Fatais da CESGRANRIO"
              description="Os erros que eliminam candidatos no último momento."
              variant={mv[10]}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <AlertBox tipo="danger" titulo="Armadilha 1 — Ordem da Razão">
                "Razão entre derivados e petróleo" = derivados/petróleo.
                Invertido = pegadinha garantida.
              </AlertBox>
              <AlertBox
                tipo="danger"
                titulo="Armadilha 2 — Escala sem Conversão"
              >
                Em escala 1:50.000 com 3 cm no mapa: NUNCA diga 3×50.000=150.000
                km. 150.000 são CENTÍMETROS → ÷100.000 = 1,5 km.
              </AlertBox>
              <AlertBox
                tipo="warning"
                titulo="Armadilha 3 — Direta vs. Inversa"
              >
                Velocidade × Tempo → SEMPRE INVERSA (produto constante =
                distância). Dobrar operadores → metade do tempo (INVERSA).
              </AlertBox>
              <AlertBox tipo="warning" titulo="Armadilha 4 — Divisão Inversa">
                "Dividir inversamente proporcional a 2 e 3" → distribuir na
                razão 3:2 (não 2:3). Quem tem o menor número recebe MAIS.
              </AlertBox>
            </div>
          </section>

          {/* ─── SIMULADO FINAL ─── */}
          <section id="quiz-modulo-10">
            

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[10]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em um mapa de escala 1:25.000, duas refinarias distam 8 cm. A distância real entre elas é:"
          alternativas={[
            { letra: "A", texto: "200 m", correta: false },
              { letra: "B", texto: "2 km", correta: true },
              { letra: "C", texto: "20 km", correta: false },
              { letra: "D", texto: "200 km", correta: false },
              { letra: "E", texto: "0,2 km", correta: false }
          ]}
          dicaEstrategica="Conversões: ÷100 → metros, ÷1000 → km."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "8 cm × 25.000 = 200.000 cm = 2.000 m = 2 km." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={5}
              variant={mv[10]}
              resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: "Razão e Proporção",
                materia: "Matemática",
                images: [
                  {
                    title: "Conceito Principal",
                    type: "Mapa Mental",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Exemplos Práticos",
                    type: "Esquema",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Aplicações",
                    type: "Fórmula",
                    placeholderColor: "bg-blue-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Dica de Ouro do Módulo 10",
                content: (
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        Padrão Essencial
                      </p>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Memorize a estrutura-chave deste módulo.
                      </p>
                    </div>
                  </div>
                ),
              }}
              podcast={{
            aulaId: "razaoproporcao",
            aulaTitulo: "Razao Proporcao",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 10,
            moduloTitulo: "Módulo 10",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
              questoes={quizFinal}
              titulo="QUIZ: Simulado Final"
              numero={6}
              variant={mv[10]}
              icone="🏆"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          {/* ─── RESUMO FINAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={4}
              title="Resumo Visual da Aula Completa"
              variant={mv[10]}
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Mental Completo — Razão e Proporção",
                          type: "Mapa Mental Master",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Mapa mental master dark premium de toda a aula Razão e Proporção. Centro: "RAZÃO E PROPORÇÃO — CESGRANRIO". 6 ramos principais: (1) Razão [fórmula, escala, rendimento]; (2) Proporção [fund., cruzado]; (3) Regra de Três [direta, inversa, composta]; (4) Divisão Proporcional [direta, inversa]; (5) Escalas [conversões, mapa→real]; (6) Aplicações Petrobras [FPSO, refinaria]. Cada ramo em cor diferente (azul, índigo, âmbar, esmeralda, teal, cinza). Fundo escuro premium, ícones industriais.
                        },
                        {
                          title: "Infográfico — Comparativo das Regras de Três",
                          type: "Infográfico de Revisão",
                          placeholderColor: "bg-slate-100 dark:bg-slate-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Infográfico dark premium comparando Regra de Três Simples vs. Composta. Lado esquerdo: R3 Simples - 2 grandezas, 4 valores, método de montagem em tabela. Lado direito: R3 Composta - 3+ grandezas, fórmula causas/efeito. Destaque em exemplos industriais de refinaria. Setas de processo passo a passo. Paleta slate-índigo, estilo CESGRANRIO técnico.
                        },
                      ]}
                      moduloNome="Simulado Final — Razão e Proporção"
                      tituloAula="Razão e Proporção"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
