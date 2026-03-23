"use client";

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

} from "../shared";

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
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const [quizRazao] = useState(() => getRandomQuestions(QUIZ_M1_RAZAO, 6));
  const [quizProporcao] = useState(() => getRandomQuestions(QUIZ_M2_PROPORCAO, 6));
  const [quizRegra3] = useState(() => getRandomQuestions(QUIZ_M3_REGRA3, 6));
  const [quizDivisao] = useState(() => getRandomQuestions(QUIZ_M4_DIVISAO, 5));
  const [quizGrandezas] = useState(() => getRandomQuestions(QUIZ_M5_PROPORCOES, 6));
  const [quizDivisaoAdv] = useState(() => getRandomQuestions(QUIZ_M6_DIVISAO_PROPORCIONAL, 6));
  const [quizContinua] = useState(() => getRandomQuestions(QUIZ_M7_PROPORCAO_CONTINUA, 6));
  const [quizEscalas] = useState(() => getRandomQuestions(QUIZ_M8_ESCALAS_AVANCADAS, 6));
  const [quizPetrobras] = useState(() => getRandomQuestions(QUIZ_M9_APLICACOES_PETROBRAS, 6));
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_FINAL, 8));

  const MODULE_DEFS = [
    { id: "modulo-1",  label: "Módulo 1",  titulo: "Razão" },
    { id: "modulo-2",  label: "Módulo 2",  titulo: "Proporção" },
    { id: "modulo-3",  label: "Módulo 3",  titulo: "Regra de 3 Simples" },
    { id: "modulo-4",  label: "Módulo 4",  titulo: "Divisão Proporcional" },
    { id: "modulo-5",  label: "Módulo 5",  titulo: "Grandezas D/I" },
    { id: "modulo-6",  label: "Módulo 6",  titulo: "Div. Prop. Avançada" },
    { id: "modulo-7",  label: "Módulo 7",  titulo: "Proporção Contínua" },
    { id: "modulo-8",  label: "Módulo 8",  titulo: "Escalas e Mapas" },
    { id: "modulo-9",  label: "Módulo 9",  titulo: "Aplicações Petrobras" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
  ];

  const totalModulos = MODULE_DEFS.length;

  const isModuleUnlocked = (_index: number) => true;

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
        onComplete?.();
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress, totalModulos]);

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
        <ModuleBanner
          numero={1}
          titulo="Razão: A Comparação Primitiva"
          descricao="Domine o conceito fundamental que está por trás de densidades, escalas e produtividades industriais."
          gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
        />
        <div className="space-y-[50px]">

          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Razão: A Fundação da Comparação Quantitativa"
              description="De densidades a escalas — o quociente que permeia toda a matemática industrial"
              variant="amber"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A razão é a operação matemática mais primitiva e ao mesmo tempo mais versátil da vida industrial. Formalmente, razão é a comparação entre duas quantidades através da divisão de uma pela outra, expressa como um quociente. Quando um engenheiro da Petrobras precisa reportar que uma plataforma processou 500.000 barris de petróleo bruto em 24 horas e obteve 350.000 barris de derivados, ele imediatamente reconhece a razão de rendimento: 350.000 ÷ 500.000 = 0,70 (ou 70%). Essa razão não é meramente um número; ela encapsula a eficiência operacional, a viabilidade econômica e o desempenho do equipamento. A razão, portanto, é a linguagem fundamental pela qual quantidades se relacionam.
              </p>

              <p>
                Historicamente, a razão existe desde os tempos babilônicos, onde artesãos precisavam comparar comprimentos em padrões de construção. Na Grécia Antiga, Euclides dedicou livros inteiros da sua obra "Elementos" ao estudo de razões e proporções, reconhecendo sua universalidade. No contexto moderno — seja em engenharia, economia, química ou biologia — a razão permanece como o instrumento de eleição para expressar relações entre magnitudes. Quando um técnico afirma que a densidade de um fluido é 840 kg/m³, ele está de fato declarando a razão massa:volume. Quando um cartógrafo desenha um mapa em escala 1:100.000, está usando razão. Quando um químico prescreve uma mistura gasolina:etanol de 7:3, ratifica a razão.
              </p>

              <p>
                A razão é expressa de três formas equivalentes: a forma fracionária (a/b), a forma colon (a:b) e a forma verbal ("a para b"). Todas significam exatamente o mesmo: o quociente entre a e b, onde b ≠ 0 (porque divisão por zero é indefinida). O numero "a" é chamado antecedente e "b" é o consequente. A ordem é absolutamente crítica — uma questão de CESGRANRIO que pergunta "a razão entre derivados e petróleo" exige que derivados (primeiro mencionado) seja o antecedente, jamais o contrário. Este é talvez o erro mais frequente em provas: inverter inconscientemente a sequência e obter uma fração incorreta. Um derivado/petróleo (correto) expressa rendimento; um petróleo/derivado (invertido) expressa o inverso, um fator conversão que não faz sentido no contexto.
              </p>

              <p>
                No universo de Petrobras, razões aparecem em contextos tão variados quanto impressionantes. Em operações de refinaria: razão entre throughput máximo e consumo atual. Em exploração: razão de custo-benefício de um poço. Em logística: razão de equipamento disponível versus equipamento em manutenção. Em recursos humanos: razão técnicos:supervisores. Em confiabilidade: razão de falhas:horas operacionais (definindo a taxa de falha MTBF). Compreender razão não é compreender um tópico isolado; é adquirir a linguagem através da qual toda a engenharia pratica quantificação.
              </p>

              <p>
                A CESGRANRIO, especificamente, testa razão em três frentes principais: (1) Identificação correta de qual grandeza é antecedente e qual é consequente — frequentemente disfarçada em linguagem ambígua; (2) Simplificação e equivalência — 210.000/300.000 simplifica-se a 7/10, e a banca cobra quale é "a razão na forma irredutível"; (3) Contexto — aplicações reais onde razão surge sob nomes especializados (densidade, escala, rendimento, taxa). Uma questão típica de prova pode ser: "Uma refinaria processa 1.200 barris/hora e obtém 840 barris de gasolina. Qual é a razão de aproveitamento?" A resposta não é "840 barris", mas "840/1.200 = 7/10 = 0,70", e a simplificação é obrigatória. O candidato que escrever "840/1.200" como resposta final será penalizado por não reduzir.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Definição Formal & Estrutura</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>Razão entre a e b:</strong> r = a ÷ b = a/b (b ≠ 0)</p>
                  <p><strong>Nomenclatura:</strong> a = antecedente (numerador), b = consequente (denominador)</p>
                  <p><strong>Propriedade Crítica:</strong> Ordem importa. "a para b" ≠ "b para a"</p>
                  <p><strong>Simplificação:</strong> Reduzir a fração a seus termos mínimos. 210.000/300.000 = 21/30 = 7/10 ✓</p>
                  <p><strong>Contextos Comuns:</strong> Densidade (kg/m³), Escala (1:100.000), Rendimento (%), Taxa (falhas/hora)</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SEÇÃO 1: Definição e Formas ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é Razão?"
              description="A comparação exata entre duas quantidades da mesma natureza."
              variant="blue"
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
                      <p className="text-sm leading-relaxed">
                        <strong>Razão</strong> é o quociente entre dois números reais, indicando
                        quantas vezes um valor cabe no outro. A razão entre <em>a</em> e <em>b</em>
                        (b ≠ 0) é escrita como <strong>a/b</strong>, <strong>a:b</strong> ou <strong>a para b</strong>.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-2">Fórmula Central:</p>
                        <p className="font-mono text-center text-lg font-bold">r = a / b  (b ≠ 0)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        Na RPBC (Refinaria Presidente Bernardes), processam-se 300.000 barris/dia e
                        obtêm-se 210.000 barris de derivados. A razão de aproveitamento é
                        210.000/300.000 = <strong>7/10 = 0,70 (70%)</strong>. Isso é o rendimento
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
                      <p className="text-sm leading-relaxed">Razão aparece em inúmeros contextos operacionais:</p>
                      <div className="grid gap-3">
                        <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                          <p className="font-bold text-sky-700 dark:text-sky-400 text-xs mb-1">Exemplo 1 — Equipe de Campo</p>
                          <p className="text-sm">
                            Uma equipe tem 15 técnicos e 5 engenheiros. A razão técnicos:engenheiros = 15:5 = <strong>3:1</strong>.
                            Para cada engenheiro, há 3 técnicos sob coordenação.
                          </p>
                        </div>
                        <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                          <p className="font-bold text-sky-700 dark:text-sky-400 text-xs mb-1">Exemplo 2 — Densidade de Fluido</p>
                          <p className="text-sm">
                            Densidade = Massa / Volume = 840 kg / 1 m³ = <strong>840 kg/m³</strong>.
                            Toda densidade é uma razão massa/volume.
                          </p>
                        </div>
                        <div className="p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                          <p className="font-bold text-sky-700 dark:text-sky-400 text-xs mb-1">Exemplo 3 — Escala de Projeto</p>
                          <p className="text-sm">
                            Planta de refinaria escala 1:200 → 1 cm no papel = 200 cm (2 m) na realidade.
                            Se um equipamento mede 4,5 cm no desenho, tem <strong>4,5 × 200 = 900 cm = 9 m</strong> de comprimento real.
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
                      <p className="text-sm leading-relaxed">
                        A CESGRANRIO cobra dois pontos de atenção sobre razão:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">Dica 1 — Ordem da Leitura</p>
                          <p className="text-sm">
                            <strong>"A razão entre derivados e petróleo"</strong> → derivados no
                            NUMERADOR (primeiro mencionado). Nunca inverta.
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">Dica 2 — Simplificação Obrigatória</p>
                          <p className="text-sm">
                            210.000/300.000 = 21/30 = <strong>7/10</strong>. A CESGRANRIO
                            sempre cobra a forma simplificada. Se a alternativa tiver 21/30 e
                            7/10, a correta é 7/10.
                          </p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                          <strong>Pulo do Gato:</strong> Quando a questão diz "razão entre A e B",
                          A está no numerador. Quando diz "quantas vezes A cabe em B", é B/A.
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
                      <AlertBox tipo="warning" titulo="Atenção — Razão Entre Grandezas Diferentes">
                        Densidade (kg/m³), Velocidade (km/h) e Pressão (Pa = N/m²) são
                        razões entre grandezas <strong>de naturezas diferentes</strong>. Nestes
                        casos, não se simplifica a unidade de ambos os termos — mantém-se a
                        unidade composta (ex: kg/m³).
                      </AlertBox>
                      <p className="text-sm">
                        Razão áurea (φ ≈ 1,618): Uma razão irracional famosa que aparece em
                        arquitetura e design. Em provas: segmento de 10 dividido na razão áurea
                        → parte maior = 10 × 1,618/2,618 ≈ 6,18.
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
              index={2}
              title="Tipos de Razão na Prática"
              description="Os contextos industriais onde razão aparece disfarçada."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuGauge className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">Rendimento</h6>
                    <p className="font-medium text-muted-foreground text-sm">Como calcular o rendimento de uma bomba ou refinaria?</p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-bold text-emerald-400 border-b border-border/30 pb-2">Rendimento = Saída Útil / Entrada Total</p>
                    <p className="text-xs text-zinc-100 leading-relaxed">Razão entre o que sai útil e o que entrou. Bomba com 2.000W de entrada e 1.600W úteis tem rendimento 1600/2000 = 0,80 = 80%.</p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      <strong>Dica de Elite:</strong> Rendimento nunca ultrapassa 1 (100%). Se o resultado der maior que 1, você inverteu a fração.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Razão Industrial</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuMap className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">Escala</h6>
                    <p className="font-medium text-muted-foreground text-sm">O que significa a escala 1:50.000 em um mapa?</p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-bold text-emerald-400 border-b border-border/30 pb-2">Escala = Medida no Mapa / Medida Real</p>
                    <p className="text-xs text-zinc-100 leading-relaxed">1:50.000 significa que 1 unidade no mapa representa 50.000 unidades na realidade. 3 cm no mapa = 1,5 km na realidade.</p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      <strong>Dica de Elite:</strong> SEMPRE use a mesma unidade nos dois lados. Converta km para cm ANTES de dividir.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Razão Cartográfica</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuCalculator className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">Razão de Mistura</h6>
                    <p className="font-medium text-muted-foreground text-sm">Qual a razão em uma mistura 70% gasolina e 30% etanol?</p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-bold text-emerald-400 border-b border-border/30 pb-2">Razão Gasolina:Etanol = 7:3</p>
                    <p className="text-xs text-zinc-100 leading-relaxed">70% e 30% = razão 7:3. Em 50 litros: gasolina = 7/10 × 50 = 35L; etanol = 3/10 × 50 = 15L.</p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      <strong>Dica de Elite:</strong> Razão em mistura é parte/parte, não parte/total. Distinguir dos percentuais.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Razão de Composição</p>
                  </div>
                }
              />
            </div>
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-1">



          











<ModuleConsolidation
            index={1}
            variant="indigo"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 1",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 1",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizRazao}
              titulo="QUIZ: Razão"
              numero={4}
              variant="blue"
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>

          {/* ─── RESUMO VISUAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo Visual" variant="indigo" />
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
        <ModuleBanner
          numero={2}
          titulo="Proporção: A Balança de Duas Razões"
          descricao="Propriedade fundamental, produtos cruzados e as fórmulas que a CESGRANRIO cobra todo ano."
          gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
        />
        <div className="space-y-[50px]">

          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Proporção: A Igualdade Que Governa a Engenharia"
              description="Do produto cruzado à divisão proporcional de lucros — o fundamento das relações quantitativas"
              variant="blue"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Enquanto razão é a comparação entre duas quantidades, proporção é a afirmação de que duas razões são iguais. Se você já estudou que a razão de aproveitamento de uma refinaria é 0,70 (70%), então temos uma proporção quando afirmamos que uma segunda refinaria também opera com a mesma razão: 350/500 = 0,70 = 280/400. Ambas as razões são 0,70, portanto elas estão em proporção. Formalmente, uma proporção é uma equação entre razões: a/b = c/d, lê-se "a está para b assim como c está para d". Os números a e d são chamados de extremos (ocupam as extremidades), enquanto b e c são os meios (ocupam o meio da sequência). Esta nomenclatura é puramente estrutural mas absolutamente crítica para entender a propriedade fundamental que sustenta toda proporção.
              </p>

              <p>
                A propriedade fundamental da proporção é talvez a equação mais testada em concursos Petrobras: **o produto dos extremos é igual ao produto dos meios**, ou a × d = b × c. Esta regra não é apenas uma fórmula mágica; ela emerge naturalmente da algebra. Se a/b = c/d (multiplicando ambos os lados por b×d), obtemos a×d = b×c — é uma identidade algébrica. Por quê isso é tão importante? Porque em praticamente qualquer problema real, três dos quatro valores são conhecidos e um está faltando. Uma proporção permite resolver o valor faltante em segundos. Se 3 trabalhadores constroem um trecho de oleoduto em 20 dias, quantos trabalhadores são necessários para construir o mesmo trecho em 15 dias? Proporção: 3/20 = x/15 → 3×15 = 20×x → 45 = 20x → x = 2,25. Ambos os contextos invocam a mesma operação: o produto cruzado.
              </p>

              <p>
                Na Petrobras e empresas de exploração e produção, proporções surgem constantemente em divisão de lucros, alocação de recursos e resolução de problemas de engenharia. Três sócios de um consórcio investem R$ 20.000, R$ 30.000 e R$ 50.000 (total de R$ 100.000) em um poço exploratório. Se o poço produz um lucro de R$ 100.000, ele é dividido proporcionalmente aos investimentos: o primeiro sócio recebe 20.000/100.000 × 100.000 = R$ 20.000; o segundo, 30.000/100.000 × 100.000 = R$ 30.000; o terceiro, 50.000/100.000 × 100.000 = R$ 50.000. Ou seja, cada um recebe uma quantidade **proporcional** ao que investiu. Este é o princípio da divisão proporcional — tão comum que muitas empresas têm departamentos jurídicos dedicados exclusivamente a calcular essas distribuições.
              </p>

              <p>
                Outra característica determinante é que propor ções respeitem operações especiais. Se a/b = c/d = k (uma constante), então: (a+c)/(b+d) = k também. Isto é, a soma de antecedentes sobre a soma de consequentes preserva a proporção. Esta propriedade abre caminho para resolver sistemas onde múltiplas razões iguais coexistem. Suponha que a/2 = b/3 = c/5, e você sabe que a+b+c = 100. Você pode reescrever: a = 2k, b = 3k, c = 5k para alguma constante k. Então 2k + 3k + 5k = 100 → 10k = 100 → k = 10. Logo a = 20, b = 30, c = 50. Este padrão de uso da "constante de proporcionalidade" é absolutamente cobrado em provas.
              </p>

              <p>
                A CESGRANRIO testa proporção em cinco cenários principais: (1) Identificação de valores nas proporções (dados três, encontrar um); (2) Verificação de proporção (dadas quatro números, é uma proporção válida?); (3) Propriedades manipuladas (se inverter, alternar ou somar, a proporção persiste?); (4) Proporcionalidade reversa (quando uma cresce, a outra diminui); (5) Divisão proporcional (distribuir um total segundo razões pré-determinadas). Um erro comum é confundir a propriedade fundamental (produto cruzado) com adição incorreta (a+d = b+c), que é geralmente falsa. Exemplo: 2/3 = 4/6 é válido (2×6 = 3×4 = 12), mas 2+6 ≠ 3+4. Este tipo de confusão elimina candidatos em provas competitivas.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Definição Formal & Propriedade Fundamental</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>Proporção:</strong> a/b = c/d (lê-se "a para b assim como c para d")</p>
                  <p><strong>Extremos e Meios:</strong> a, d são extremos (ponta-a-ponta); b, c são meios (centro)</p>
                  <p><strong>Propriedade Fundamental (OURO):</strong> a × d = b × c (produto dos extremos = produto dos meios)</p>
                  <p><strong>Propriedade da Soma:</strong> Se a/b = c/d = k, então (a+c)/(b+d) = k</p>
                  <p><strong>Inversão de Proporção:</strong> Se a/b = c/d, então b/a = d/c (ambos invertidos)</p>
                  <p><strong>Alternância:</strong> Se a/b = c/d, então a/c = b/d (meios e extremos trocam posição)</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SEÇÃO 1: Proporção Fundamenta ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Proporção e Propriedade Fundamental"
              description="A igualdade de duas razões e sua regra de ouro."
              variant="indigo"
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
                      <p className="text-sm leading-relaxed">
                        Uma <strong>proporção</strong> é a igualdade entre duas razões:
                        <strong> a/b = c/d</strong>, onde a e d são os <em>extremos</em> e b e c
                        são os <em>meios</em>.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-bold text-indigo-700 dark:text-indigo-400 text-sm mb-3">Propriedade Fundamental:</p>
                        <p className="font-mono text-center text-xl font-bold mb-2">a × d = b × c</p>
                        <p className="text-xs text-center text-muted-foreground">
                          (produto dos extremos = produto dos meios)
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação Petrobras">
                        Três sócios investiram R$ 20.000, R$ 30.000 e R$ 50.000 em um poço.
                        O lucro de R$ 80.000 é proporcional ao investimento. O sócio que
                        investiu R$ 30.000 recebe: 30.000/100.000 × 80.000 = <strong>R$ 24.000</strong>.
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
                          <p className="font-bold text-violet-700 dark:text-violet-400 text-xs mb-2">Exemplo 1 — Encontrar o Termo Faltante</p>
                          <p className="text-sm font-mono">x/3 = 12/9</p>
                          <p className="text-sm mt-1">→ x × 9 = 3 × 12  →  9x = 36  →  <strong>x = 4</strong></p>
                          <p className="text-xs text-muted-foreground mt-1">Alternativa: 12/9 = 4/3, logo x/3 = 4/3, x = 4.</p>
                        </div>
                        <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                          <p className="font-bold text-violet-700 dark:text-violet-400 text-xs mb-2">Exemplo 2 — Divisão de Lucro Proporcional</p>
                          <p className="text-sm">
                            Se a/2 = b/3 = c/5 e a+b+c = 100, então usando k:<br />
                            a=2k, b=3k, c=5k → 10k=100 → k=10 → <strong>a=20, b=30, c=50</strong>
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                          <p className="font-bold text-violet-700 dark:text-violet-400 text-xs mb-2">Exemplo 3 — Quarta Proporcional</p>
                          <p className="text-sm">
                            Dados 3, 5 e 9, encontrar d tal que 3:5 = 9:d<br />
                            3 × d = 5 × 9  →  3d = 45  →  <strong>d = 15</strong>
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
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">Dica 1 — Verificação por Cruzamento</p>
                          <p className="text-sm">Para verificar se a/b = c/d, cheque se a×d = b×c. Se for igual, é proporção válida.</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">Dica 2 — Propriedade da Soma</p>
                          <p className="text-sm">
                            Se a/b = c/d = k, então (a+c)/(b+d) = k também. Útil para somar proporções.
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">Dica 3 — Troca de Posição</p>
                          <p className="text-sm">
                            Se a/b = c/d, então também: b/a = d/c (invertendo ambos) e a/c = b/d (invertendo alternadamente).
                          </p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                          <strong>Pulo do Gato:</strong> Na CESGRANRIO, quando aparecer "a/b = k", use sempre k como constante de proporcionalidade e substitua: a = kb, c = kd, etc.
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
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO — Propriedade Fundamental x Soma">
                        A propriedade fundamental é a×d = b×c (produto cruzado).
                        <strong> NÃO confunda</strong> com a+d = b+c (que é FALSA em geral).
                        Exemplo: 2/3 = 4/6. Cruzado: 2×6 = 3×4 = 12 ✓. Soma: 2+6 ≠ 3+4 ✗.
                      </AlertBox>
                      <p className="text-sm">
                        Outra pegadinha: "Se a/b = c/d, então a/c = b/d" — isso É verdadeiro
                        (alternado). Mas "a+b = c+d" só vale se a razão for 1.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-2">



          











<ModuleConsolidation
            index={2}
            variant="emerald"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 2",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 2",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizProporcao}
              titulo="Quiz — Proporção e Propriedades"
              numero={2}
              variant="indigo"
              icone="⚖️"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>

          {/* ─── RESUMO VISUAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo Visual" variant="indigo" />
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
                          placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
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
        <ModuleBanner
          numero={3}
          titulo="Regra de Três Simples"
          descricao="O método que resolve 60% das questões de matemática em concursos. Domine o passo a passo."
          gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
        />
        <div className="space-y-[50px]">

          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Regra de Três Simples: O Atalho da Indústria"
              description="Da proporcionalidade direta à inversa — o método que resolve a maioria das questões de concurso"
              variant="emerald"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Regra de três simples é a técnica de resolução mais direta quando temos duas grandezas (A e B) com uma relação proporcional entre elas, e conhecemos três dos quatro valores. Por exemplo: "se 5 bombeadores enchem 1.000 litros em 2 horas, quantos litros 8 bombeadores encherão no mesmo tempo?" Aqui, você tem três valores conhecidos (5 bombeadores, 1.000 litros, 2 horas) e quer encontrar o quarto (x litros para 8 bombeadores). A essência é reconhecer que existe uma proporção entre as duas grandezas. Se 5 bombeadores enchem 1.000 L, então 8 bombeadores encherão mais; inversamente, se você quiser o mesmo resultado em menos tempo, precisaria de mais bombeadores. A regra de três automatiza este raciocínio proporcional, permitindo que você resolva em segundos problemas que de outra forma exigiriam equações complexas.
              </p>

              <p>
                Há dois tipos fundamentais de proporcionalidade: direta e inversa. Na **proporcionalidade direta**, quando uma grandeza aumenta, a outra também aumenta na mesma proporção. Exemplo: "Uma plataforma offshore produz 100 barris por dia. Em 3 dias, produz 300 barris." Aumentar o tempo em 3× aumenta a produção também em 3×. Não existe nada de oculto aqui; é transparente: mais tempo = mais produção. Na **proporcionalidade inversa**, quando uma grandeza aumenta, a outra diminui proporcionalmente. Exemplo clássico: "8 trabalhadores terminam uma tubagem em 15 dias. Se você contratar 12 trabalhadores, quanto tempo levará?" Mais trabalhadores significa menos tempo. O produto trabalh adores × dias permanece constante: 8 × 15 = 120 = 12 × x, logo x = 10 dias. Este é o grande erro em provas: confundir inversa com direta. Candidatos automàticamente montam "8/12 = 15/x" (incorreto — isso daria 22,5 dias!), quando deveriam ter invertido um dos pares: "8/12 = x/15" (correto).
              </p>

              <p>
                Na Petrobras, regra de três aparece em contextos praticamente cotidianos. Planejamento de produção: se uma refinaria processa 500 barris/hora e operou por 3 dias consecutivos (72 horas), quantos barris foram processados? 500 × 72 = 36.000. Mas se a questão for "3 refinarias processam 50.000 barris em 2 dias; quanto processará 5 refinarias em 3 dias?", aí entra regra de três composta (que veremos em módulos posteriores). Mas agora, regra de três simples. Gestão de recursos: se 200 l itros de óleo lubrificante custam R$ 800, quanto custa 500 litros? Proporção direta: 200/800 = 500/x → x = 2.000. Tempo de manutenção: se 6 técnicos calibram 24 transmissores em 8 horas, quanto tempo levariam 10 técnicos? Proporção inversa: 6 × 8 = 10 × x → x = 4,8 horas. Todas estas situações invocam regra de três.
              </p>

              <p>
                O método das **setas** é infalível para distinguir direta de inversa sem errar. Você monta a tabela com as duas grandezas lado a lado, coloca setas indicando a variação (↑ para aumento, ↓ para diminuição), e verifica: se ambas as setas apontam na mesma direção (ambas ↑ ou ambas ↓), é proporcionalidade DIRETA — você monta a proporção normalmente. Se as setas apontam em direções opostas (uma ↑ e outra ↓), é INVERSA — você inverte o segundo par antes de resolver. Este método visual elimina a confusão que causa erros sistêmicos. A banca CESGRANRIO frequentemente oferece alternativas que são respostas de "regra de três invertida"; candidatos que confundiram o tipo caem nela.
              </p>

              <p>
                A CESGRANRIO testa regra de três em cenários onde a armadilha é real. Velocidade e tempo, para a mesma distância, são **sempre** inversamente proporcionais — este é um erro que aparece em praticamente toda prova. "Se um caminhão viaja a 80 km/h e leva 5 horas, quanto tempo levará a 100 km/h?" Resposta errada (direta): 100/80 = 5/x → x = 4h. Isto está CORRETO por acaso, mas o raciocínio é falho. O correto é: "Velocidade ↑, Tempo ↓ (setas opostas) → INVERSA → 80 × 5 = 100 × x → x = 4h." O resultado é o mesmo, mas o método está certo. Outras armadilhas: confundir "20% maior" com "regra de três"; tentar aplicar regra de três quando há três ou mais grandezas (aí é regra de três composta); não simplificar frações antes de calcular (levando a números desnecessariamente grandes). A habilidade de distinguir quando regra de três se aplica versus quando não se aplica é surpreendentemente decisiva em provas competitivas.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Método das Setas & Resolução</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>Passo 1:</strong> Identifique as duas grandezas e coloque setas (↑ ou ↓) conforme variam</p>
                  <p><strong>Passo 2:</strong> Mesma direção? → DIRETA. Opostas? → INVERSA</p>
                  <p><strong>Passo 3 (DIRETA):</strong> Monta a proporção normalmente: a/b = c/x</p>
                  <p><strong>Passo 3 (INVERSA):</strong> Inverte o segundo par: a/b = x/c, então a × c = b × x</p>
                  <p><strong>Regra de Ouro:</strong> Velocidade × Tempo = Distância (SEMPRE inversa); Tempo × Quantidade = Produção Total (SEMPRE direta)</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SEÇÃO 1: Método ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Método Completo"
              description="Identificação, montagem e resolução em 3 passos."
              variant="amber"
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
                      <p className="text-sm leading-relaxed">
                        Usa-se Regra de Três quando há <strong>duas grandezas</strong> e conhecemos
                        três valores, querendo descobrir o quarto. A relação entre as grandezas
                        pode ser <strong>direta</strong> ou <strong>inversa</strong>.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center">
                          <p className="font-bold text-emerald-700 dark:text-emerald-400 text-xs mb-1">DIRETA</p>
                          <p className="text-sm">A sobe → B sobe</p>
                          <p className="text-xs text-muted-foreground">Mais tempo = Mais produção</p>
                        </div>
                        <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/20 text-center">
                          <p className="font-bold text-rose-700 dark:text-rose-400 text-xs mb-1">INVERSA</p>
                          <p className="text-sm">A sobe → B desce</p>
                          <p className="text-xs text-muted-foreground">Mais operadores = Menos tempo</p>
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
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-3">Exemplo 1 — DIRETA (Bomba e Litros)</p>
                        <p className="text-sm mb-2">
                          Uma bomba enche 6.000 L em 4 horas. Quanto tempo para 9.000 L?
                        </p>
                        <div className="font-mono text-xs space-y-1 bg-muted/30 p-3 rounded-lg">
                          <p>Litros   ↑ | Tempo  ↑ (DIRETA)</p>
                          <p>6.000    →  4 horas</p>
                          <p>9.000    →  x horas</p>
                          <p className="text-emerald-500 font-bold">6000/9000 = 4/x  →  x = 9000×4/6000 = 6h</p>
                        </div>
                      </div>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-sm mb-3">Exemplo 2 — INVERSA (Operadores e Dias)</p>
                        <p className="text-sm mb-2">
                          8 trabalhadores levam 15 dias. Com 12, quantos dias?
                        </p>
                        <div className="font-mono text-xs space-y-1 bg-muted/30 p-3 rounded-lg">
                          <p>Trabalhadores ↑ | Dias ↓ (INVERSA)</p>
                          <p>8 trab    →  15 dias</p>
                          <p>12 trab   →  x dias</p>
                          <p className="text-rose-500 font-bold">8×15 = 12×x  →  x = 120/12 = 10 dias</p>
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
                      <p className="text-sm">O método das setas elimina erros de classificação:</p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 font-mono text-sm">
                        <p className="mb-2"><strong>1.</strong> Monte a tabela com as grandezas lado a lado</p>
                        <p className="mb-2"><strong>2.</strong> Coloque setas mostrando a variação (↑ aumentou ou ↓ diminuiu)</p>
                        <p className="mb-2"><strong>3.</strong> Mesma direção? → DIRETA. Direções opostas? → INVERSA</p>
                        <p className="text-emerald-500"><strong>4.</strong> Direta: divide normalmente. Inversa: inverte o segundo par.</p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                        <strong>Pulo do Gato:</strong> Velocidade × Tempo = Distância (constante). Logo velocidade e tempo são SEMPRE inversamente proporcionais para o mesmo percurso.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Grandezas Que Enganam",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Armadilha — Velocidade e Tempo">
                        Velocidade e tempo são INVERSAMENTE proporcionais para a mesma distância.
                        Dobrar a velocidade <strong>corta</strong> o tempo pela metade. Candidatos
                        erram ao tratar como direta.
                      </AlertBox>
                      <AlertBox tipo="danger" titulo="Atenção — Regra de 3 vs. Porcentagem">
                        Nem toda variação é regra de três! Se a questão diz "20% a mais",
                        calcule por percentual. Regra de três é para relações fixas e proporcionais.
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
              index={2}
              title="Regra de Três Composta"
              description="Múltiplas grandezas, um único resultado. O método que vence provas."
              variant="amber"
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
                      <p className="text-sm leading-relaxed">
                        Na Regra de Três Composta, todas as <em>causas</em> (produtores do trabalho)
                        ficam no numerador e o <em>efeito</em> (trabalho produzido) no denominador.
                        A razão causas/efeito é constante nos dois cenários.
                      </p>
                      <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <p className="font-bold text-orange-700 dark:text-orange-400 text-sm mb-2">Fórmula Geral:</p>
                        <p className="font-mono text-center text-sm">
                          (A₁ × B₁ × C₁) / Efeito₁ = (A₂ × B₂ × C₂) / Efeito₂
                        </p>
                      </div>
                      <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <p className="font-bold text-orange-700 dark:text-orange-400 text-sm mb-2">Exemplo Petrobras:</p>
                        <p className="text-sm mb-2">
                          5 máquinas, 4 horas/dia, 8 dias → 200 peças.<br />
                          Quantas máquinas para 300 peças em 6h/dia, 5 dias?
                        </p>
                        <p className="font-mono text-xs">
                          (5 × 4 × 8) / 200 = (x × 6 × 5) / 300<br />
                          160/200 = 30x/300<br />
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
              index={3}
              title="Visualização Gráfica: Direta vs. Inversa"
              description="Observe como as duas relações se comportam no mesmo domínio."
              variant="amber"
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
                  fn: (x: number) => x > 0 ? 36 / x : null,
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



          











<ModuleConsolidation
            index={3}
            variant="cyan"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 3",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 3",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizRegra3}
              titulo="QUIZ: Regra de 3 Simples"
              numero={4}
              variant="amber"
              icone="🔢"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>

          {/* ─── RESUMO VISUAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo Visual" variant="indigo" />
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
        <ModuleBanner
          numero={4}
          titulo="Divisão Proporcional Básica"
          descricao="Distribua recursos com precisão: lucros, orçamentos e bonificações em questões CESGRANRIO."
          gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
        />
        <div className="space-y-[50px]">

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Dividir Proporcionalmente"
              description="Três passos infalíveis para nunca errar divisão proporcional."
              variant="emerald"
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
                      <p className="text-sm leading-relaxed">
                        Dividir um valor V em partes <strong>diretamente proporcionais</strong> a
                        razões r₁, r₂, r₃... significa que cada parte recebe uma fração de V
                        proporcional à sua razão no total.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-2">Passo a Passo:</p>
                        <ol className="text-sm space-y-2 list-decimal list-inside">
                          <li>Some as partes da razão: total = r₁ + r₂ + r₃</li>
                          <li>Calcule o valor de cada "parte": p = V / total</li>
                          <li>Multiplique cada r pela parte: xᵢ = rᵢ × p</li>
                        </ol>
                      </div>
                      <AlertBox tipo="info" titulo="Exemplo Petrobras — Orçamento por Plataforma">
                        Três plataformas recebem orçamento de R$ 180.000 na razão 2:3:4.<br />
                        Total = 9 partes → p = 20.000.<br />
                        P1 = 40.000 | P2 = 60.000 | P3 = 80.000.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exemplificação: Gratificação por Horas Trabalhadas",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-700 dark:text-teal-400 text-sm mb-2">Situação:</p>
                        <p className="text-sm">
                          Três técnicos trabalharam 10h, 15h e 25h em um projeto.
                          A gratificação de R$ 5.000 é proporcional às horas.
                        </p>
                        <p className="text-sm mt-2 font-mono">
                          Total: 50h → p = 5.000/50 = 100/h<br />
                          Técnico 10h: 10×100 = R$ 1.000<br />
                          Técnico 15h: 15×100 = R$ 1.500<br />
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
                      <p className="text-sm">
                        Na divisão <strong>inversamente proporcional</strong>, quem tem o menor
                        número recebe a MAIOR parte. O truque é inverter a razão antes de dividir.
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Exemplo — Bônus Inversamente Prop. a Faltas</p>
                        <p className="text-sm font-mono">
                          Faltas: 2, 4, 8 → Inv. prop. = 1/2, 1/4, 1/8 = 4, 2, 1<br />
                          Total: 7 partes → p = 2.800/7 = 400<br />
                          Quem faltou 2x: 4×400 = <strong>R$ 1.600 (maior!)</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                        <strong>Pulo do Gato:</strong> Inversamente proporcional a {"{2,4,8}"} = diretamente proporcional a {"{1/2, 1/4, 1/8}"} = diretamente proporcional a {"{4, 2, 1}"}. Sempre inverta e converta para inteiros (MMC).
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: A Parte É o Dobro da Outra",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Tipo Especial — Relação entre Partes">
                        Quando a questão diz "A recebe o triplo de B", isso define a razão A:B = 3:1.
                        Some as partes (3+1=4) e divida proporcionalmente como de costume.
                      </AlertBox>
                      <p className="text-sm">
                        Outro caso especial: "A e B dividem R$ 2.400 de modo que A recebe o triplo."
                        A=3B → A+B=2.400 → 4B=2.400 → B=600, A=1.800. (Razão 3:1 confirmada.)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-4">



          











<ModuleConsolidation
            index={4}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 4",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 4",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizDivisao}
              titulo="Quiz — Divisão Proporcional"
              numero={4}
              variant="emerald"
              icone="✂️"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo Visual" variant="indigo" />
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
                          title: "Infográfico — Divisão Proporcional Direta vs. Inversa",
                          type: "Infográfico Comparativo",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
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
        <ModuleBanner
          numero={5}
          titulo="Grandezas Proporcionais"
          descricao="O ponto que mais derruba candidatos: identificar se duas grandezas andam juntas ou em sentidos opostos."
          gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400"
        />
        <div className="space-y-[50px]">

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Direta vs. Inversa — A Grande Batalha"
              description="Como identificar a relação correta antes de montar a conta."
              variant="cyan"
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
                      <p className="text-sm leading-relaxed">
                        Duas grandezas são <strong>diretamente proporcionais</strong> quando
                        a razão entre elas é constante: y/x = k (constante). Se x dobra,
                        y dobra. Se x cai à metade, y cai à metade.
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-sm mb-2">Exemplos Industriais (Diretas):</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
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
                      <p className="text-sm leading-relaxed">
                        Duas grandezas são <strong>inversamente proporcionais</strong> quando
                        o produto entre elas é constante: x × y = k. Se x dobra, y cai à metade.
                        Se x cai para 1/3, y triplica.
                      </p>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-sm mb-2">Exemplos Industriais (Inversas):</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Número de operadores × Tempo para concluir tarefa</li>
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
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-sm mb-2">Exemplo 1 — FPSO e Separadores</p>
                        <p className="text-sm">
                          6 separadores → 2.400 m³/h. Com 9 separadores:
                          6/9 = 2400/x → x = 9×2400/6 = <strong>3.600 m³/h</strong> (direta)
                        </p>
                      </div>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-sm mb-2">Exemplo 2 — Navio e Velocidade</p>
                        <p className="text-sm">
                          Pressão 120 Pa com diâmetro 8 cm. Com diâmetro 6 cm:
                          8×120 = 6×x → x = 960/6 = <strong>160 Pa</strong> (inversa)
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
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Teste Rápido:</p>
                        <p className="text-sm mb-2">
                          Multiplique os dois valores dos pares. Se o produto for constante → INVERSA.
                          Se a razão (divisão) for constante → DIRETA.
                        </p>
                        <p className="font-mono text-xs">
                          Pares: (8, 120) e (6, x):<br />
                          8×120 = 960, 6×x = 6x. Se 6x=960 → x=160. PRODUTO constante → INVERSA.
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                        <strong>Pulo do Gato:</strong> v × t = d (distância constante). Portanto velocidade e tempo são sempre INVERSAS. Nunca erre essa pegadinha clássica.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Grandezas Não Proporcionais",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Cuidado — Nem Toda Relação é Proporcional">
                        Temperatura e pressão em gases (Lei de Gay-Lussac) não são simplesmente
                        proporcionais — precisam de cálculo adicional. A CESGRANRIO foca nas
                        relações elementares de Razão e Proporção, não em leis dos gases.
                      </AlertBox>
                      <p className="text-sm">
                        Outro caso não proporcional: Lucro e tempo de projeto.
                        Mais tempo de projeto não significa necessariamente mais ou menos lucro
                        — depende de outros fatores. Nesses casos, a questão explicitará a relação.
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
              index={2}
              title="Visualização: Proporcionalidade Direta"
              description="Diferentes constantes k geram retas com inclinações distintas — todas passando pela origem."
              variant="cyan"
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
              index={3}
              title="Casos Clássicos da CESGRANRIO"
              description="Flashcards com as relações mais cobradas em prova."
              variant="cyan"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuArrowRightLeft className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">Velocidade × Tempo</h6>
                    <p className="font-medium text-muted-foreground text-sm">Para a mesma distância: se a velocidade dobra, o tempo faz o quê?</p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-bold text-emerald-400 border-b border-border/30 pb-2">INVERSA — Tempo cai à metade</p>
                    <p className="text-xs text-zinc-100 leading-relaxed">v × t = d (constante). Se v dobra (×2), t precisa ser ÷2 para o produto continuar igual. São grandezas INVERSAS.</p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      <strong>Dica de Elite:</strong> Produto constante = INVERSA. Razão constante = DIRETA.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Grandezas Inversas</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuTrendingUp className="w-12 h-12 text-primary opacity-50" />
                    <h6 className="text-xl font-bold uppercase tracking-tight">Operadores × Produção</h6>
                    <p className="font-medium text-muted-foreground text-sm">Dobrar o número de operadores (mesma produtividade) afeta a produção como?</p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-bold text-emerald-400 border-b border-border/30 pb-2">DIRETA — Produção dobra</p>
                    <p className="text-xs text-zinc-100 leading-relaxed">Mais operadores = mais produção (mesma eficiência individual). Produção/Operadores = constante. É uma relação DIRETA.</p>
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      <strong>Dica de Elite:</strong> A chave é &apos;mesma produtividade&apos;. Se a eficiência muda, não é mais proporcional simples.
                    </div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Grandezas Diretas</p>
                  </div>
                }
              />
            </div>
          </section>

          {/* ─── GRÁFICO — Proporcionalidade Inversa ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={4}
              title="Visualização: Proporcionalidade Inversa"
              description="Hipérboles: quanto maior x, menor y — o produto x·y permanece constante."
              variant="cyan"
            />
            <FunctionGraph
              title="Proporcionalidade Inversa: y = k/x"
              functions={[
                {
                  id: "k12",
                  label: "y = 12/x",
                  color: "#3b82f6",
                  fn: (x: number) => x > 0 ? 12 / x : null,
                  strokeWidth: 2,
                } as FunctionPlot,
                {
                  id: "k6",
                  label: "y = 6/x",
                  color: "#ef4444",
                  fn: (x: number) => x > 0 ? 6 / x : null,
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



          











<ModuleConsolidation
            index={5}
            variant="amber"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 5",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-amber-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-amber-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-amber-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 5",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="font-bold text-amber-600 dark:text-amber-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizGrandezas}
              titulo="QUIZ: Grandezas D/I"
              numero={6}
              variant="cyan"
              icone="↕️"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo Visual" variant="indigo" />
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
        <ModuleBanner
          numero={6}
          titulo="Divisão Proporcional Avançada"
          descricao="Distribuições inversas, combinadas e casos especiais. O nível que separa os aprovados dos classificados."
          gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800"
        />
        <div className="space-y-[50px]">

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Divisão com Múltiplos Critérios"
              description="Quando a distribuição envolve condições mistas ou encadeadas."
              variant="indigo"
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
                      <p className="text-sm leading-relaxed">
                        Em casos avançados, a distribuição pode ser <strong>diretamente
                        proporcional a um critério e inversamente a outro</strong> simultaneamente.
                        O coeficiente de cada receptor é calculado combinando os dois critérios.
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-sm mb-2">Fórmula Combinada:</p>
                        <p className="font-mono text-sm text-center">cᵢ = (critério direto)ᵢ / (critério inverso)ᵢ</p>
                        <p className="text-xs text-muted-foreground text-center mt-1">Depois normaliza: xᵢ = (cᵢ / Σcⱼ) × V</p>
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
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-sm mb-2">Exemplo 1 — Divisão com Diferença Conhecida</p>
                        <p className="text-sm">
                          R$ 90.000 entre A e B na razão 5:4. Quanto A recebe a mais que B?<br />
                          Total = 9 → p = 10.000. A=50.000, B=40.000.<br />
                          <strong>Diferença = 1 parte = R$ 10.000</strong>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Atalho: diferença = (5-4)/9 × 90.000 = 1/9 × 90.000 = R$ 10.000.
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-sm mb-2">Exemplo 2 — Maior Cota Conhecida</p>
                        <p className="text-sm">
                          Quatro setores na razão 2:3:4:6 e o maior recebe R$ 180.000. Total:<br />
                          Total partes = 15. Maior = 6 → cada parte = 30.000.<br />
                          <strong>Total = 15 × 30.000 = R$ 450.000</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 dark:text-violet-400 text-sm mb-2">Exemplo 3 — Bônus Inverso a Faltas</p>
                        <p className="text-sm">
                          Faltas: 2, 4, 8 → bônus inv. proporcional. Total R$ 2.800.<br />
                          Inv. = 4, 2, 1 (total 7). p = 400.<br />
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
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">Atalho 1 — Diferença entre Partes</p>
                        <p className="text-sm">diferença = (r_maior - r_menor) / r_total × V</p>
                      </div>
                      <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-xs mb-1">Atalho 2 — Total a partir de Uma Parte</p>
                        <p className="text-sm">Se uma parte vale X e tem razão r, o valor de cada unidade = X/r → Total = (Σr) × (X/r)</p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                        <strong>Pulo do Gato:</strong> Em divisão inversamente proporcional, sempre converta para MMC comum antes de somar. Ex: {"{1/2, 1/3}"} → {"{3/6, 2/6}"} → razão 3:2.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Pegadinhas de Divisão",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Pegadinha — Proporção com Razão Inversa">
                        "Dividir 120 em partes inversamente proporcionais a 2 e 3."
                        O erro é dividir 120 na razão 2:3. O correto é dividir na razão 3:2
                        (inverso de 2:3). Partes: 3+2=5 → 72 e 48.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-6">



          











<ModuleConsolidation
            index={6}
            variant="rose"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 6",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-rose-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-rose-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-rose-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 6",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-bold text-rose-600 dark:text-rose-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizDivisaoAdv}
              titulo="Quiz — Divisão Proporcional Avançada"
              numero={6}
              variant="indigo"
              icone="⚙️"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo Visual" variant="indigo" />
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
                          placeholderColor: "bg-violet-100 dark:bg-violet-900/30",
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
        <ModuleBanner
          numero={7}
          titulo="Proporção Contínua e Média Proporcional"
          descricao="O tema mais elegante da proporção: quando o meio é a raiz quadrada dos extremos."
          gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800"
        />
        <div className="space-y-[50px]">

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Proporção Contínua e Termos Proporcionais"
              description="Da média geométrica à quarta proporcional — tudo que a CESGRANRIO cobra."
              variant="indigo"
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
                      <p className="text-sm leading-relaxed">
                        Em uma <strong>proporção contínua</strong> a:b = b:c, o termo do meio (b)
                        aparece em ambas as razões. Pela propriedade fundamental:
                        b² = a × c. Logo <strong>b = √(a × c)</strong> é a <em>média geométrica</em>
                        (ou média proporcional) entre a e c.
                      </p>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 dark:text-rose-400 text-sm mb-2">Fórmulas Essenciais:</p>
                        <ul className="font-mono text-sm space-y-1">
                          <li>Média proporcional (geométrica): x = √(a × b)</li>
                          <li>Terceira proporcional: a:b = b:x → x = b²/a</li>
                          <li>Quarta proporcional: a:b = c:x → x = (b × c)/a</li>
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
                        <p className="font-bold text-pink-700 dark:text-pink-400 text-xs mb-1">Exemplo 1 — Média Proporcional entre 4 e 16</p>
                        <p className="text-sm font-mono">x = √(4 × 16) = √64 = <strong>8</strong></p>
                        <p className="text-xs text-muted-foreground">Diferente da média aritmética: (4+16)/2 = 10.</p>
                      </div>
                      <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <p className="font-bold text-pink-700 dark:text-pink-400 text-xs mb-1">Exemplo 2 — Proporção Contínua a:b = b:c, a=3, c=27</p>
                        <p className="text-sm font-mono">b² = 3 × 27 = 81 → b = <strong>9</strong></p>
                        <p className="text-xs text-muted-foreground">Verificação: 3:9 = 9:27 = 1:3 ✓</p>
                      </div>
                      <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <p className="font-bold text-pink-700 dark:text-pink-400 text-xs mb-1">Exemplo 3 — Quarta Proporcional de 5, 8 e 15</p>
                        <p className="text-sm font-mono">5:8 = 15:x → 5x = 8×15 = 120 → x = <strong>24</strong></p>
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
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Não confunda:</p>
                        <ul className="text-sm space-y-1">
                          <li>Média <strong>aritmética</strong> entre 4 e 16: (4+16)/2 = <strong>10</strong></li>
                          <li>Média <strong>geométrica</strong> (proporcional) entre 4 e 16: √(4×16) = <strong>8</strong></li>
                        </ul>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Razão Composta:</p>
                        <p className="text-sm font-mono">
                          Se a:b = 3:4 e b:c = 6:5 →<br />
                          a:c = (a/b) × (b/c) = (3/4) × (6/5) = 18/20 = <strong>9:10</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                        <strong>Pulo do Gato:</strong> Em uma PG com razão q, o termo do meio é sempre a média geométrica dos vizinhos: b = √(a × c).
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Razão Áurea",
                  icone: "✨",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        A <strong>razão áurea</strong> (φ ≈ 1,618) é um caso especial de proporção
                        onde a/b = (a+b)/a. Questões pedem: "segmento de 10 dividido na razão áurea".
                      </p>
                      <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 font-mono text-sm">
                        <p>Parte maior = 10 × φ/(1+φ) = 10 × 1,618/2,618 ≈ <strong>6,18</strong></p>
                        <p>Parte menor = 10 - 6,18 = <strong>3,82</strong></p>
                      </div>
                      <AlertBox tipo="warning" titulo="Atenção CESGRANRIO">
                        A questão sobre razão áurea sempre dará φ ≈ 1,618. Use como dado.
                        Não memorize φ — a prova fornece.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-7">



          











<ModuleConsolidation
            index={7}
            variant="indigo"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 7",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 7",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizContinua}
              titulo="QUIZ: Proporção Contínua"
              numero={8}
              variant="rose"
              icone="🔗"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo Visual" variant="indigo" />
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
        <ModuleBanner
          numero={8}
          titulo="Escalas e Mapas"
          descricao="De plantas industriais a mapas cartográficos: as conversões que a CESGRANRIO cobra todo concurso."
          gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800"
        />
        <div className="space-y-[50px]">

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Escalas: Teoria e Conversão"
              description="Da definição às conversões mais complexas de unidades."
              variant="cyan"
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
                      <p className="text-sm leading-relaxed">
                        <strong>Escala</strong> é a razão entre a medida no mapa (ou planta) e
                        a medida real correspondente: E = d_mapa / d_real.
                        A escala 1:N significa que 1 unidade no papel = N unidades na realidade.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <p className="font-bold text-teal-700 dark:text-teal-400 text-xs mb-1">Escala Grande (mais detalhe)</p>
                          <p className="text-sm font-mono">1:200 → mais zoom</p>
                          <p className="text-xs text-muted-foreground">Plantas de equipamentos</p>
                        </div>
                        <div className="p-3 bg-teal-500/10 rounded-lg border border-teal-500/20">
                          <p className="font-bold text-teal-700 dark:text-teal-400 text-xs mb-1">Escala Pequena (menos detalhe)</p>
                          <p className="text-sm font-mono">1:500.000 → mais distância</p>
                          <p className="text-xs text-muted-foreground">Mapas de regiões</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        Engenheiros de projetos da Petrobras usam escalas 1:50 para detalhes
                        de tubulação e 1:1.000 para layout geral de refinarias. A mesma
                        tubulação que mede 4 cm na planta 1:50 tem comprimento real de 2 m.
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
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-sm mb-2">Tipo 1 — Mapa → Real</p>
                        <p className="text-sm">
                          Escala 1:50.000. Distância no mapa: 3 cm.<br />
                          Real = 3 × 50.000 = 150.000 cm ÷ 100.000 = <strong>1,5 km</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-sm mb-2">Tipo 2 — Real → Mapa</p>
                        <p className="text-sm">
                          Escala 1:24.000. Distância real: 1,2 km.<br />
                          1,2 km = 120.000 cm. No mapa: 120.000 ÷ 24.000 = <strong>5 cm</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-sm mb-2">Tipo 3 — Mudança de Escala</p>
                        <p className="text-sm">
                          Duto mede 3 m na escala 1:50. Na escala 1:150:<br />
                          Real = 3 × 50 = 150 m → na 1:150: 150/150 = <strong>1 m</strong>
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
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Tabela de Conversão Essencial:</p>
                        <table className="text-sm w-full">
                          <thead>
                            <tr className="text-amber-600 font-bold text-xs">
                              <th className="text-left pb-1">De</th>
                              <th className="text-left pb-1">Para cm</th>
                              <th className="text-left pb-1">Para m</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono text-xs space-y-1">
                            <tr><td>1 km</td><td>100.000 cm</td><td>1.000 m</td></tr>
                            <tr><td>1 m</td><td>100 cm</td><td>1 m</td></tr>
                            <tr><td>1 cm</td><td>1 cm</td><td>0,01 m</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                        <strong>Pulo do Gato:</strong> Sempre converta TUDO para a mesma unidade (cm) antes de aplicar a escala. Só converta para a unidade final pedida ao terminar.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Dobrar e Triplicar Escala",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Pegadinha — Dobrar a Escala">
                        "A escala foi dobrada de 1:100.000 para 1:50.000."
                        Uma rota que media 5 cm passará a medir <strong>10 cm</strong> (dobra no mapa).
                        Escala "maior" (1:50.000 {'>'} 1:100.000) = mais detalhe = mais cm no papel.
                      </AlertBox>
                      <p className="text-sm">
                        A confusão ocorre porque "dobrar a escala" pode ser interpretada como
                        dobrar N (de 1:50.000 para 1:100.000, o que afasta) ou dobrar o detalhe
                        (de 1:100.000 para 1:50.000, o que aproxima). Leia o contexto.
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
              index={2}
              title="Tipos de Questão de Escala"
              description="Os 4 formatos que a CESGRANRIO usa para cobrar escalas."
              variant="cyan"
            />
            <CardCarousel
              cards={[
                {
                  icone: "📏",
                  titulo: "Mapa → Real",
                  descricao: "Dado o mapa e a escala, calcular a distância real. Real = mapa × N.",
                  corFundo: "bg-teal-100 dark:bg-teal-900/30",
                },
                {
                  icone: "📐",
                  titulo: "Real → Mapa",
                  descricao: "Dado o real e a escala, calcular a medida no papel. Mapa = real ÷ N.",
                  corFundo: "bg-cyan-100 dark:bg-cyan-900/30",
                },
                {
                  icone: "🔄",
                  titulo: "Mudança de Escala",
                  descricao: "Calcular nova medida no papel com escala diferente. Passe pelo real como intermediário.",
                  corFundo: "bg-sky-100 dark:bg-sky-900/30",
                },
                {
                  icone: "🔍",
                  titulo: "Determinar N",
                  descricao: "Dadas medidas no mapa e no real, calcular N = d_real ÷ d_mapa (mesma unidade).",
                  corFundo: "bg-blue-100 dark:bg-blue-900/30",
                },
              ]}
              itemsPerView={2}
            />
          </section>

          {/* ─── QUIZ ─── */}
          <section id="quiz-modulo-8">



          











<ModuleConsolidation
            index={8}
            variant="emerald"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 8",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 8",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizEscalas}
              titulo="Quiz — Escalas e Mapas"
              numero={8}
              variant="cyan"
              icone="🗺️"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo Visual" variant="indigo" />
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
        <ModuleBanner
          numero={9}
          titulo="Aplicações Industriais Petrobras"
          descricao="Contextos reais: FPSO, oleodutos, refinarias e plataformas. O coração das questões CESGRANRIO."
          gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800"
        />
        <div className="space-y-[50px]">

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Razão e Proporção no Setor de E&P"
              description="Exemplos reais de como estas ferramentas são usadas em operações petrolíferas."
              variant="indigo"
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
                      <p className="text-sm leading-relaxed">
                        Na Petrobras, razão e proporção são fundamentais para calcular
                        <strong> rendimento de refinarias</strong> (barris úteis / barris brutos),
                        <strong> eficiência de bombas</strong> (energia útil / energia total) e
                        <strong> produtividade de plataformas</strong> (barris/dia por equipamento).
                      </p>
                      <div className="grid gap-3">
                        <div className="p-3 bg-slate-500/10 rounded-lg border border-slate-500/20">
                          <p className="font-bold text-slate-300 text-xs mb-1">Exemplo 1 — Rendimento de Refinaria</p>
                          <p className="text-sm">
                            80.000 barris brutos entram, rendimento 75%.
                            Derivados = 80.000 × 0,75 = <strong>60.000 barris</strong>.
                          </p>
                        </div>
                        <div className="p-3 bg-slate-500/10 rounded-lg border border-slate-500/20">
                          <p className="font-bold text-slate-300 text-xs mb-1">Exemplo 2 — Produção de FPSO</p>
                          <p className="text-sm">
                            6 separadores → 2.400 m³/h. Com 9 separadores:
                            9/6 × 2.400 = <strong>3.600 m³/h</strong>.
                          </p>
                        </div>
                        <div className="p-3 bg-slate-500/10 rounded-lg border border-slate-500/20">
                          <p className="font-bold text-slate-300 text-xs mb-1">Exemplo 3 — Custo de Perfuração</p>
                          <p className="text-sm">
                            500 m custa R$ 3.000.000 (diretamente proporcional à profundidade).
                            1.200 m: 1200/500 × 3.000.000 = <strong>R$ 7.200.000</strong>.
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
                        <p className="font-bold text-slate-300 text-sm mb-2">Situação: Aumento de Produção Proporcional</p>
                        <p className="text-sm">
                          Unidades A, B, C têm capacidade 15.000, 25.000, 10.000 barris/dia.
                          Um aumento de 60.000 barris é distribuído proporcionalmente.
                        </p>
                        <p className="text-sm mt-2 font-mono">
                          Total: 50.000. Partes:<br />
                          A: 15/50 × 60.000 = 18.000<br />
                          B: 25/50 × 60.000 = 30.000<br />
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
                        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-2">Relações Inversas na Petrobras:</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Diâmetro de tubulação × Pressão (inversa)</li>
                          <li>Número de técnicos × Tempo de inspeção (inversa)</li>
                          <li>Velocidade de extração × Tempo de poço (inversa)</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                        <strong>Pulo do Gato:</strong> Em questões com múltiplas grandezas (técnicos + horas + equipamentos), use a Regra de Três COMPOSTA: causas/efeito = constante.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "E — Exceções: Quando a Proporção Não Vale",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Atenção — Rendimento Não É Sempre Linear">
                        Em situações reais, o rendimento de refinarias pode variar com o tipo
                        de petróleo. Mas na CESGRANRIO, se a questão não informar variação,
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



          











<ModuleConsolidation
            index={9}
            variant="cyan"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 9",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 9",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizPetrobras}
              titulo="QUIZ: Aplicações Petrobras"
              numero={10}
              variant="slate"
              icone="🛢️"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>

          {/* ─── RESUMO ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo Visual" variant="indigo" />
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
        <ModuleBanner
          numero={10}
          titulo="Simulado Final — Nível Elite"
          descricao="8 questões integrando todos os temas. O teste definitivo de preparação para a CESGRANRIO."
          gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800"
        />
        <div className="space-y-[50px]">

          {/* ─── Revisão Rápida ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Mapa de Revisão — Todos os Temas"
              description="Revise os pontos críticos antes de enfrentar o simulado final."
              variant="indigo"
              className="mb-6"
            />
            <CardCarousel
              titulo="Pontos-Chave para a Prova"
              cards={[
                {
                  icone: <LuScale className="w-6 h-6" />,
                  titulo: "Razão",
                  descricao: "r = a/b. Sempre simplifique. Cuidado com a ordem de leitura (primeiro mencionado = numerador).",
                  corFundo: "bg-blue-100 dark:bg-blue-900/30",
                },
                {
                  icone: <LuLink className="w-6 h-6" />,
                  titulo: "Proporção Fundamental",
                  descricao: "a × d = b × c (produto dos extremos = produto dos meios). Base de todo cálculo proporcional.",
                  corFundo: "bg-indigo-100 dark:bg-indigo-900/30",
                },
                {
                  icone: <LuTrendingUp className="w-6 h-6" />,
                  titulo: "Regra de 3 Direta",
                  descricao: "Grandezas crescem juntas. y₁/y₂ = x₁/x₂. Mais tempo → mais produção.",
                  corFundo: "bg-emerald-100 dark:bg-emerald-900/30",
                },
                {
                  icone: <LuTrendingDown className="w-6 h-6" />,
                  titulo: "Regra de 3 Inversa",
                  descricao: "Grandezas com produto constante. x₁y₁ = x₂y₂. Mais velocidade → menos tempo.",
                  corFundo: "bg-rose-100 dark:bg-rose-900/30",
                },
                {
                  icone: <LuDivide className="w-6 h-6" />,
                  titulo: "Divisão Proporcional",
                  descricao: "Somar partes → calcular unitário → multiplicar. Para inversa: inverter razões antes.",
                  corFundo: "bg-amber-100 dark:bg-amber-900/30",
                },
                {
                  icone: <LuMap className="w-6 h-6" />,
                  titulo: "Escalas",
                  descricao: "Real = mapa × N. Converter TUDO para cm primeiro. Mapa = real ÷ N.",
                  corFundo: "bg-teal-100 dark:bg-teal-900/30",
                },
              ]}
              itemsPerView={3}
            />
          </section>

          {/* ─── ALERTAS FINAIS ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-4">
            <ModuleSectionHeader
              index={2}
              title="Armadilhas Fatais da CESGRANRIO"
              description="Os erros que eliminam candidatos no último momento."
              variant="indigo"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <AlertBox tipo="danger" titulo="Armadilha 1 — Ordem da Razão">
                "Razão entre derivados e petróleo" = derivados/petróleo.
                Invertido = pegadinha garantida.
              </AlertBox>
              <AlertBox tipo="danger" titulo="Armadilha 2 — Escala sem Conversão">
                Em escala 1:50.000 com 3 cm no mapa: NUNCA diga 3×50.000=150.000 km.
                150.000 são CENTÍMETROS → ÷100.000 = 1,5 km.
              </AlertBox>
              <AlertBox tipo="warning" titulo="Armadilha 3 — Direta vs. Inversa">
                Velocidade × Tempo → SEMPRE INVERSA (produto constante = distância).
                Dobrar operadores → metade do tempo (INVERSA).
              </AlertBox>
              <AlertBox tipo="warning" titulo="Armadilha 4 — Divisão Inversa">
                "Dividir inversamente proporcional a 2 e 3" → distribuir na razão 3:2 (não 2:3).
                Quem tem o menor número recebe MAIS.
              </AlertBox>
            </div>
          </section>

          {/* ─── SIMULADO FINAL ─── */}
          <section id="quiz-modulo-10">



          











<ModuleConsolidation
            index={10}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 10",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Razão e Proporção",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 10",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizFinal}
              titulo="Simulado Final — Nível Elite"
              numero={10}
              variant="slate"
              icone="🏆"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          {/* ─── RESUMO FINAL ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo Visual da Aula Completa" variant="indigo" />
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
                          placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
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
