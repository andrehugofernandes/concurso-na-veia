"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import {
  QUIZ_M1_RAZOES_TRIG,
  QUIZ_M2_ANGULOS_NOTAVEIS,
  QUIZ_M3_CIRCULO_TRIG,
  QUIZ_M4_FUNCOES_TRIG,
  QUIZ_M5_IDENTIDADES,
  QUIZ_M6_LEI_SENOS,
  QUIZ_M7_LEI_COSSENOS,
  QUIZ_M8_EQUACOES_TRIG,
  QUIZ_M9_APLICACOES_PETROBRAS,
  QUIZ_M10_SIMULADO_CESGRANRIO,
} from "./data/trigonometria-quizzes";

export default function AulaTrigonometria({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_RAZOES_TRIG, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_ANGULOS_NOTAVEIS, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_CIRCULO_TRIG, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_FUNCOES_TRIG, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_IDENTIDADES, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_LEI_SENOS, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_LEI_COSSENOS, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_EQUACOES_TRIG, 6));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_APLICACOES_PETROBRAS, 6));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_CESGRANRIO, 6));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const modules = Array.from({ length: 10 }, (_, i) => `modulo-${i + 1}`);
      const idx = modules.findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 10) * 100);
      onUpdateProgress?.(pct);
      if (idx < 9) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 10);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Razões Trigonométricas" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Ângulos Notáveis" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Círculo Trigonométrico" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Funções Trigonométricas" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Identidades" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Lei dos Senos" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Lei dos Cossenos" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Equações Trigonométricas" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Industriais" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
  ];

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
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 1: RAZÕES TRIGONOMÉTRICAS                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Razões Trigonométricas no Triângulo Retângulo"
          descricao="Domine seno, cosseno e tangente — a base de toda a trigonometria aplicada à engenharia e inspeção industrial."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Seno, Cosseno e Tangente"
              description="As três razões fundamentais que relacionam ângulos e lados no triângulo retângulo."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Definições Essenciais"
              icone="📐"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "As Três Razões Trigonométricas",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em um triângulo retângulo com ângulo agudo θ, as razões
                        trigonométricas são definidas em relação à{" "}
                        <strong>hipotenusa</strong> (lado oposto ao ângulo reto),{" "}
                        <strong>cateto oposto</strong> (a θ) e{" "}
                        <strong>cateto adjacente</strong> (a θ):
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-xs font-bold text-blue-500 mb-2">SENO</p>
                          <p className="text-lg font-mono font-bold">sen θ = CO/Hip</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Cateto Oposto ÷ Hipotenusa
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-500 mb-2">COSSENO</p>
                          <p className="text-lg font-mono font-bold">cos θ = CA/Hip</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Cateto Adjacente ÷ Hipotenusa
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-xs font-bold text-cyan-500 mb-2">TANGENTE</p>
                          <p className="text-lg font-mono font-bold">tan θ = CO/CA</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Cateto Oposto ÷ Cateto Adjacente
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Mnemônico SOH-CAH-TOA">
                        <strong>SOH</strong>: Seno = Oposto / Hipotenusa
                        <br />
                        <strong>CAH</strong>: Cosseno = Adjacente / Hipotenusa
                        <br />
                        <strong>TOA</strong>: Tangente = Oposto / Adjacente
                        <br />
                        Este mnemônico é usado mundialmente em engenharia!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Relação entre Tangente e as outras razões",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A tangente pode ser expressa como razão entre seno e
                        cosseno:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
                        <p className="text-xl font-mono font-bold">
                          tan θ = sen θ / cos θ
                        </p>
                      </div>
                      <p>
                        Esta relação é crucial para simplificar expressões
                        trigonométricas e resolver equações. Em inspeções de
                        dutos e estruturas offshore, calcula-se frequentemente a
                        inclinação (tangente) a partir de medidas de altura
                        (seno) e projeção horizontal (cosseno).
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Exemplo Industrial</p>
                          <p className="text-sm">
                            Duto inclinado: altura=6m, base=8m, comprimento=10m
                          </p>
                          <p className="text-sm mt-1">
                            sen θ = 6/10 = 0,6 | cos θ = 8/10 = 0,8
                          </p>
                          <p className="text-sm mt-1 font-bold">
                            tan θ = 6/8 = 0,75 = 0,6/0,8 ✓
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500 mb-2">Trio Pitagórico (3,4,5)</p>
                          <p className="text-sm">Triângulo: catetos 3m e 4m, hipotenusa 5m</p>
                          <p className="text-sm mt-1">sen θ = 3/5 | cos θ = 4/5</p>
                          <p className="text-sm mt-1 font-bold">tan θ = 3/4</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação em Rampas e Inclinações Industriais",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Na Petrobras, as razões trigonométricas são usadas para
                        calcular inclinações de rampas, dutos submarinos, cabos
                        de içamento e ângulos de inspeção. O protocolo padrão:
                      </p>
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-blue-500">
                          Passo a passo para problemas de triângulo retângulo:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>Identifique o ângulo θ conhecido</li>
                          <li>Identifique o dado conhecido (hipotenusa, CO ou CA)</li>
                          <li>Identifique o que se quer calcular</li>
                          <li>Escolha a razão que conecta o dado ao incógnito</li>
                          <li>Monte a equação e resolva</li>
                        </ol>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca frequentemente dá o ângulo com o{" "}
                        <strong>solo</strong> em vez do ângulo com a{" "}
                        <strong>vertical</strong>. Um cabo que faz 60° com o
                        mastro (vertical) faz 30° com o solo — os papéis de
                        cateto oposto e adjacente se invertem! Desenhe sempre o
                        triângulo antes de escolher a razão.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizM1}
              titulo="Quiz — Razões Trigonométricas"
              icone="📐"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: ÂNGULOS NOTÁVEIS                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Ângulos Notáveis: 30°, 45°, 60° e 90°"
          descricao="Memorize os valores exatos que aparecem em 90% das questões de concurso — sem calculadora!"
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Tabela dos Ângulos Notáveis"
              description="Os valores que você deve saber de cor para a prova da CESGRANRIO."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Valores Exatos — Tabela Completa"
              icone="📊"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Tabela que Cai na Prova",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Memorize estes valores — a CESGRANRIO os usa em{" "}
                        <strong>todas as questões de trigonometria</strong>:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-emerald-500/10">
                              <th className="border border-emerald-500/20 p-3 text-left">Ângulo</th>
                              <th className="border border-emerald-500/20 p-3 text-center">sen</th>
                              <th className="border border-emerald-500/20 p-3 text-center">cos</th>
                              <th className="border border-emerald-500/20 p-3 text-center">tan</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-border p-3 font-bold">0°</td>
                              <td className="border border-border p-3 text-center">0</td>
                              <td className="border border-border p-3 text-center">1</td>
                              <td className="border border-border p-3 text-center">0</td>
                            </tr>
                            <tr className="bg-muted/30">
                              <td className="border border-border p-3 font-bold">30°</td>
                              <td className="border border-border p-3 text-center font-mono">1/2</td>
                              <td className="border border-border p-3 text-center font-mono">√3/2</td>
                              <td className="border border-border p-3 text-center font-mono">1/√3 = √3/3</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-3 font-bold">45°</td>
                              <td className="border border-border p-3 text-center font-mono">√2/2</td>
                              <td className="border border-border p-3 text-center font-mono">√2/2</td>
                              <td className="border border-border p-3 text-center font-mono">1</td>
                            </tr>
                            <tr className="bg-muted/30">
                              <td className="border border-border p-3 font-bold">60°</td>
                              <td className="border border-border p-3 text-center font-mono">√3/2</td>
                              <td className="border border-border p-3 text-center font-mono">1/2</td>
                              <td className="border border-border p-3 text-center font-mono">√3</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-3 font-bold">90°</td>
                              <td className="border border-border p-3 text-center">1</td>
                              <td className="border border-border p-3 text-center">0</td>
                              <td className="border border-border p-3 text-center">Indef.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="info" titulo="Macete de Memorização">
                        Para o seno: os valores seguem a sequência √0/2, √1/2,
                        √2/2, √3/2, √4/2 para 0°, 30°, 45°, 60°, 90°. O
                        cosseno segue o padrão inverso (√4/2, √3/2...).
                        Simplificando: 0, 1/2, √2/2, √3/2, 1.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dedução Geométrica — Triângulos Notáveis",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Os ângulos notáveis surgem de dois triângulos especiais:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500 mb-2">
                            Triângulo 45°-45°-90° (Isósceles Retângulo)
                          </p>
                          <p className="text-sm">Catetos: 1 e 1 | Hipotenusa: √2</p>
                          <p className="text-sm mt-2">
                            sen 45° = 1/√2 = <strong>√2/2</strong>
                          </p>
                          <p className="text-sm">
                            cos 45° = 1/√2 = <strong>√2/2</strong>
                          </p>
                          <p className="text-sm">
                            tan 45° = 1/1 = <strong>1</strong>
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">
                            Triângulo 30°-60°-90° (Equilátero dividido)
                          </p>
                          <p className="text-sm">
                            Catetos: 1 e √3 | Hipotenusa: 2
                          </p>
                          <p className="text-sm mt-2">
                            sen 30° = 1/2 | cos 30° = <strong>√3/2</strong>
                          </p>
                          <p className="text-sm">
                            sen 60° = <strong>√3/2</strong> | cos 60° = 1/2
                          </p>
                          <p className="text-sm">
                            tan 30° = 1/√3 | tan 60° = <strong>√3</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicações em Plataformas Offshore",
                  icone: "⚓",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Nas plataformas da Petrobras, os ângulos de 30°, 45° e
                        60° são padronizados em projetos de rampas, cabos e
                        estruturas por facilitar os cálculos e atender às normas
                        de segurança. Exemplos práticos:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500">Rampa a 30°</p>
                          <p className="text-sm">
                            Comprimento 20m → Altura = 20 × sen30° = 20 × 0,5 ={" "}
                            <strong>10m</strong>
                          </p>
                        </div>
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500">Cabo a 45°</p>
                          <p className="text-sm">
                            Comprimento 10m → Altura = 10 × sen45° = 10 × (√2/2)
                            = <strong>5√2 ≈ 7,07m</strong>
                          </p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500">Flare Tower a 60°</p>
                          <p className="text-sm">
                            Base horizontal 50m → Altura = 50 × tan60° = 50√3 ≈{" "}
                            <strong>86,6m</strong>
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca frequentemente confunde <strong>sen 30° = 1/2</strong>{" "}
                        com <strong>sen 60° = √3/2</strong>. Lembre: para ângulos
                        complementares, seno e cosseno se trocam:{" "}
                        <strong>sen 30° = cos 60°</strong> e{" "}
                        <strong>sen 60° = cos 30°</strong>. Se confundir, você
                        erra e vai para a resposta armadilha da banca.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizM2}
              titulo="Quiz — Ângulos Notáveis"
              icone="📊"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: CÍRCULO TRIGONOMÉTRICO                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Círculo Trigonométrico"
          descricao="Entenda o círculo unitário — a ferramenta que unifica seno, cosseno e tangente para todos os ângulos."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Círculo Unitário e os Quatro Quadrantes"
              description="Como os sinais de seno, cosseno e tangente variam por quadrante."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Círculo Trigonométrico — Conceitos Fundamentais"
              icone="⭕"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição do Círculo Unitário",
                  icone: "⭕",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O círculo trigonométrico é uma circunferência de{" "}
                        <strong>raio 1</strong> centrada na origem do plano
                        cartesiano. Para um ângulo θ, o ponto correspondente na
                        circunferência tem coordenadas:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                        <p className="text-xl font-mono font-bold">
                          P(θ) = (cos θ, sen θ)
                        </p>
                      </div>
                      <p>
                        O eixo x representa o <strong>cosseno</strong> e o eixo
                        y representa o <strong>seno</strong>. Isso significa que
                        −1 ≤ sen θ ≤ 1 e −1 ≤ cos θ ≤ 1 para qualquer ângulo.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { quad: "1º", range: "0°–90°", sen: "+", cos: "+", tan: "+", color: "emerald" },
                          { quad: "2º", range: "90°–180°", sen: "+", cos: "−", tan: "−", color: "blue" },
                          { quad: "3º", range: "180°–270°", sen: "−", cos: "−", tan: "+", color: "cyan" },
                          { quad: "4º", range: "270°–360°", sen: "−", cos: "+", tan: "−", color: "indigo" },
                        ].map((q) => (
                          <div
                            key={q.quad}
                            className={`p-3 bg-${q.color}-500/5 rounded-xl border border-${q.color}-500/20 text-center`}
                          >
                            <p className={`text-xs font-bold text-${q.color}-500`}>
                              {q.quad} Quadrante
                            </p>
                            <p className="text-xs text-muted-foreground">{q.range}</p>
                            <p className="text-sm mt-2">
                              sen: <strong>{q.sen}</strong> | cos: <strong>{q.cos}</strong>
                            </p>
                            <p className="text-sm">
                              tan: <strong>{q.tan}</strong>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Ângulos Notáveis no Círculo",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Pontos especiais do círculo trigonométrico que a prova exige:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { angulo: "0°", ponto: "(1, 0)", cos: "1", sen: "0" },
                          { angulo: "90°", ponto: "(0, 1)", cos: "0", sen: "1" },
                          { angulo: "180°", ponto: "(−1, 0)", cos: "−1", sen: "0" },
                          { angulo: "270°", ponto: "(0, −1)", cos: "0", sen: "−1" },
                          { angulo: "30°", ponto: "(√3/2, 1/2)", cos: "√3/2", sen: "1/2" },
                          { angulo: "45°", ponto: "(√2/2, √2/2)", cos: "√2/2", sen: "√2/2" },
                          { angulo: "60°", ponto: "(1/2, √3/2)", cos: "1/2", sen: "√3/2" },
                          { angulo: "135°", ponto: "(−√2/2, √2/2)", cos: "−√2/2", sen: "√2/2" },
                        ].map((item) => (
                          <div
                            key={item.angulo}
                            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
                          >
                            <span className="text-sm font-bold w-12 shrink-0">
                              {item.angulo}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono flex-1">
                              {item.ponto}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Radianos e Conversão de Unidades",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em engenharia, ângulos são frequentemente expressos em{" "}
                        <strong>radianos</strong>. A conversão é:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center space-y-2">
                        <p className="font-mono font-bold">
                          graus × (π/180°) = radianos
                        </p>
                        <p className="font-mono font-bold">
                          radianos × (180°/π) = graus
                        </p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
                        {[
                          { g: "30°", r: "π/6" },
                          { g: "45°", r: "π/4" },
                          { g: "60°", r: "π/3" },
                          { g: "90°", r: "π/2" },
                          { g: "120°", r: "2π/3" },
                          { g: "180°", r: "π" },
                          { g: "270°", r: "3π/2" },
                          { g: "360°", r: "2π" },
                        ].map((item) => (
                          <div
                            key={item.g}
                            className="p-2 bg-blue-500/5 rounded-lg border border-blue-500/20"
                          >
                            <p className="font-bold">{item.g}</p>
                            <p className="text-muted-foreground font-mono">{item.r}</p>
                          </div>
                        ))}
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca pode pedir sen(5π/6) ou cos(7π/4) — valores em
                        radianos. Converta primeiro:{" "}
                        <strong>5π/6 = 150°</strong> e{" "}
                        <strong>7π/4 = 315°</strong>. Use o ângulo de referência
                        do 1º quadrante e ajuste o sinal pelo quadrante.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizM3}
              titulo="Quiz — Círculo Trigonométrico"
              icone="⭕"
              numero={3}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: FUNÇÕES TRIGONOMÉTRICAS                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Funções Trigonométricas"
          descricao="Seno, cosseno e tangente como funções reais — amplitude, período e gráficos aplicados à engenharia."
          gradiente="bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Amplitude, Período e Deslocamento"
              description="Os parâmetros que controlam o comportamento de funções trigonométricas."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Funções Trigonométricas — Propriedades e Gráficos"
              icone="📈"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Forma Geral: y = A · sen(Bx + C) + D",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A forma geral das funções trigonométricas incorpora
                        quatro parâmetros com significado físico:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500 mb-2">|A| — Amplitude</p>
                          <p className="text-sm">
                            Valor máximo da oscilação. A função varia entre −|A|
                            e +|A|. Em sensores de pressão: amplitude = variação
                            de pressão.
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">T = 2π/B — Período</p>
                          <p className="text-sm">
                            Intervalo para um ciclo completo. Quanto maior B,
                            menor o período (oscilação mais rápida). Em turbinas:
                            T = 1/frequência.
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500 mb-2">C/B — Deslocamento horizontal</p>
                          <p className="text-sm">
                            Desloca o gráfico horizontalmente. Chamado de fase
                            em engenharia elétrica. Crucial em análise de ondas
                            em cabos submarinos.
                          </p>
                        </div>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-500 mb-2">D — Deslocamento vertical</p>
                          <p className="text-sm">
                            Eleva ou abaixa o gráfico. Representa o valor médio
                            da oscilação. Ex: pressão média de 10 bar com
                            amplitude de ±2 bar.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Propriedades de Simetria",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p>As funções trigonométricas têm simetrias importantes:</p>
                      <div className="space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-500">
                            Cosseno — Função PAR
                          </p>
                          <p className="text-sm mt-1">
                            cos(−x) = cos(x). Simétrica ao eixo y. O gráfico é
                            espelhado em relação ao eixo vertical.
                          </p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500">
                            Seno e Tangente — Funções ÍMPARES
                          </p>
                          <p className="text-sm mt-1">
                            sen(−x) = −sen(x) | tan(−x) = −tan(x). Simétricas à
                            origem. O gráfico tem rotação de 180° em relação ao
                            centro.
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação Industrial">
                        Em análise de sinais de sensores industriais da
                        Petrobras, funções pares representam grandezas simétricas
                        (como pressão em um vaso esférico) e funções ímpares
                        representam grandezas que mudam de sinal com a direção
                        (como torque em um eixo giratório).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Domínio e Imagem",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-blue-500/10">
                              <th className="border border-blue-500/20 p-3 text-left">Função</th>
                              <th className="border border-blue-500/20 p-3 text-center">Domínio</th>
                              <th className="border border-blue-500/20 p-3 text-center">Imagem</th>
                              <th className="border border-blue-500/20 p-3 text-center">Período</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-border p-3 font-bold">y = sen(x)</td>
                              <td className="border border-border p-3 text-center">ℝ</td>
                              <td className="border border-border p-3 text-center">[−1, 1]</td>
                              <td className="border border-border p-3 text-center">2π</td>
                            </tr>
                            <tr className="bg-muted/30">
                              <td className="border border-border p-3 font-bold">y = cos(x)</td>
                              <td className="border border-border p-3 text-center">ℝ</td>
                              <td className="border border-border p-3 text-center">[−1, 1]</td>
                              <td className="border border-border p-3 text-center">2π</td>
                            </tr>
                            <tr>
                              <td className="border border-border p-3 font-bold">y = tan(x)</td>
                              <td className="border border-border p-3 text-center text-xs">ℝ \ {"{π/2 + kπ}"}</td>
                              <td className="border border-border p-3 text-center">ℝ</td>
                              <td className="border border-border p-3 text-center">π</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A tangente tem período π (não 2π!). Enquanto seno e
                        cosseno completam um ciclo em 360°, a tangente completa
                        em 180°. Isso afeta o cálculo do número de soluções de
                        equações com tangente.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizM4}
              titulo="Quiz — Funções Trigonométricas"
              icone="📈"
              numero={4}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: IDENTIDADES TRIGONOMÉTRICAS                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Identidades Trigonométricas Fundamentais"
          descricao="As equações que são verdadeiras para todos os ângulos — ferramentas de simplificação e prova."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Identidades Pitagóricas e de Adição"
              description="As identidades mais cobradas pela CESGRANRIO — saiba deduzir e aplicar."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Identidades Essenciais"
              icone="🔑"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Identidades Pitagóricas",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Derivadas do Teorema de Pitágoras no círculo unitário:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                          <p className="text-sm font-bold text-indigo-400 mb-1">
                            Identidade Fundamental:
                          </p>
                          <p className="text-xl font-mono text-center">
                            sen²θ + cos²θ = 1
                          </p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                          <p className="text-sm font-bold text-blue-400 mb-1">
                            Dividindo por cos²θ:
                          </p>
                          <p className="text-xl font-mono text-center">
                            tan²θ + 1 = sec²θ
                          </p>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                          <p className="text-sm font-bold text-cyan-400 mb-1">
                            Dividindo por sen²θ:
                          </p>
                          <p className="text-xl font-mono text-center">
                            1 + cot²θ = csc²θ
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Identidades de Adição de Ângulos",
                  icone: "➕",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Fórmulas para calcular razões de somas e diferenças de ângulos:
                      </p>
                      <div className="space-y-3">
                        {[
                          { formula: "sen(A±B) = senA cosB ± cosA senB", cor: "blue" },
                          { formula: "cos(A±B) = cosA cosB ∓ senA senB", cor: "emerald" },
                          { formula: "tan(A±B) = (tanA ± tanB)/(1 ∓ tanA·tanB)", cor: "cyan" },
                        ].map((item) => (
                          <div
                            key={item.formula}
                            className={`bg-${item.cor}-500/10 border border-${item.cor}-500/20 rounded-xl p-4`}
                          >
                            <p className="font-mono text-center">{item.formula}</p>
                          </div>
                        ))}
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação: Ângulos como 75° e 15°">
                        sen(75°) = sen(45°+30°) = (√6+√2)/4 ≈ 0,966. Questões
                        da CESGRANRIO pedem ângulos não-tabelados usando a soma
                        de dois ângulos notáveis.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Identidades de Arco Duplo",
                  icone: "✖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Fórmulas para 2θ derivadas das fórmulas de adição (com A=B=θ):
                      </p>
                      <div className="space-y-3">
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                          <p className="font-mono text-center text-lg">
                            sen(2θ) = 2 sen θ cos θ
                          </p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                          <p className="font-mono text-center">
                            cos(2θ) = cos²θ − sen²θ = 2cos²θ − 1 = 1 − 2sen²θ
                          </p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                          <p className="font-mono text-center">
                            tan(2θ) = 2tanθ / (1 − tan²θ)
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        cos(2θ) tem três formas equivalentes — a banca usa
                        qualquer uma. Se ver{" "}
                        <strong>2cos²θ − 1</strong> e não reconhecer como
                        cos(2θ), vai errar a simplificação. Memorize as três
                        formas!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizM5}
              titulo="Quiz — Identidades Trigonométricas"
              icone="🔑"
              numero={5}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: LEI DOS SENOS                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Lei dos Senos"
          descricao="Resolva qualquer triângulo quando você conhece ângulos e lados opostos — essencial para triangulação em campo."
          gradiente="bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Fórmula e Aplicações da Lei dos Senos"
              description="Quando e como usar a Lei dos Senos em problemas industriais."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Lei dos Senos — Teoria e Prática"
              icone="⚖️"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula e Quando Usar",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em qualquer triângulo ABC com lados a, b, c opostos aos
                        ângulos A, B, C respectivamente:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                        <p className="text-xl font-mono font-bold">
                          a/sen A = b/sen B = c/sen C = 2R
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          onde R é o raio da circunferência circunscrita ao triângulo
                        </p>
                      </div>
                      <p>Use a Lei dos Senos quando conhecer:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-xs font-bold text-blue-500">AAS</p>
                          <p className="text-sm">Dois ângulos + lado não incluso</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-500">ASA</p>
                          <p className="text-sm">Dois ângulos + lado incluso</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-xs font-bold text-cyan-500">SSA</p>
                          <p className="text-sm">Dois lados + ângulo oposto</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Triangulação Industrial — Medição sem Acesso",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Na Petrobras, a triangulação é usada para medir
                        distâncias a pontos inacessíveis (torres, tubulações em
                        altura, estruturas submarinas). O método:
                      </p>
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-blue-500">
                          Procedimento de Triangulação:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>Estabeleça uma base de medição (lado conhecido)</li>
                          <li>Meça os ângulos de dois pontos da base ao alvo</li>
                          <li>Calcule o terceiro ângulo (180° − soma dos dois)</li>
                          <li>Aplique a Lei dos Senos para achar o lado desejado</li>
                        </ol>
                      </div>
                      <AlertBox tipo="info" titulo="Área do Triângulo">
                        Usando a Lei dos Senos, a área de um triângulo com dois
                        lados a, b e ângulo C incluso é:{" "}
                        <strong>Área = (1/2)·a·b·sen C</strong>. Forma mais
                        prática que base × altura quando a altura não é dada.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Resolvido: Medição de Torre de Perfuração",
                  icone: "🏗️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-bold text-indigo-400 mb-3">
                          Problema:
                        </p>
                        <p className="text-sm">
                          Dois técnicos estão na base de uma plataforma, separados
                          por 40m. O técnico A mede ângulo de 70° e o técnico B
                          mede ângulo de 60° para o topo de uma estrutura. Qual a
                          distância do técnico B ao topo?
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Passo 1:</strong> Terceiro ângulo C = 180° − 70°
                          − 60° = 50°
                        </p>
                        <p>
                          <strong>Passo 2:</strong> O lado oposto a C (= 50°) é a
                          base = 40m
                        </p>
                        <p>
                          <strong>Passo 3:</strong> Lei dos Senos: 40/sen 50° = b/sen
                          70°
                        </p>
                        <p>
                          <strong>Passo 4:</strong> b = 40 × sen 70°/sen 50° ≈ 40 ×
                          0,940/0,766 ≈ 49,1m
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Sempre calcule o terceiro ângulo antes de aplicar a Lei
                        dos Senos! A banca frequentemente omite um ângulo
                        esperando que o candidato saiba que a soma é 180°. Omitir
                        esse passo é o erro mais comum.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizM6}
              titulo="Quiz — Lei dos Senos"
              icone="⚖️"
              numero={6}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: LEI DOS COSSENOS                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Lei dos Cossenos"
          descricao="A generalização do Teorema de Pitágoras — resolva triângulos quando você conhece três lados ou dois lados e o ângulo entre eles."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Fórmula e Casos de Aplicação"
              description="Quando a Lei dos Senos não basta — a Lei dos Cossenos entra em campo."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Lei dos Cossenos — Teoria e Prática"
              icone="📐"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula e suas Três Versões",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para qualquer triângulo ABC, a Lei dos Cossenos relaciona
                        os três lados e um ângulo:
                      </p>
                      <div className="space-y-3">
                        {[
                          "a² = b² + c² − 2bc·cos A",
                          "b² = a² + c² − 2ac·cos B",
                          "c² = a² + b² − 2ab·cos C",
                        ].map((f) => (
                          <div
                            key={f}
                            className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center"
                          >
                            <p className="text-lg font-mono font-bold">{f}</p>
                          </div>
                        ))}
                      </div>
                      <p>
                        Quando o ângulo é <strong>90°</strong>, cos(90°) = 0 e a
                        fórmula se torna o Teorema de Pitágoras: a² = b² + c².
                        Esta é a prova de que Pitágoras é um caso especial da Lei
                        dos Cossenos.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Encontrando Ângulos a partir dos Lados (LLL)",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Isolando o cosseno na Lei dos Cossenos, podemos encontrar
                        qualquer ângulo quando os três lados são conhecidos:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-center">
                        <p className="text-lg font-mono font-bold">
                          cos A = (b² + c² − a²) / (2bc)
                        </p>
                      </div>
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm font-bold text-blue-500 mb-2">
                          Exemplo: Triângulo com lados 5, 7, 8
                        </p>
                        <p className="text-sm">
                          cos A = (7²+8²−5²)/(2·7·8) = (49+64−25)/112 = 88/112 = 11/14
                        </p>
                        <p className="text-sm mt-1">
                          A = arccos(11/14) ≈ 38,2°
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação em Estruturas Offshore">
                        Em projetos de estruturas tubulares de plataformas, os
                        engenheiros da Petrobras calculam os ângulos de juntas
                        usando a Lei dos Cossenos quando as dimensões dos membros
                        são conhecidas mas os ângulos não.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Comparativo: Lei dos Senos vs Lei dos Cossenos",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-3">
                            USE LEI DOS SENOS quando:
                          </p>
                          <ul className="text-sm space-y-1 list-disc list-inside">
                            <li>AAS: dois ângulos e lado oposto</li>
                            <li>ASA: dois ângulos e lado incluso</li>
                            <li>SSA: dois lados e ângulo oposto</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500 mb-3">
                            USE LEI DOS COSSENOS quando:
                          </p>
                          <ul className="text-sm space-y-1 list-disc list-inside">
                            <li>LAL: dois lados e ângulo incluso</li>
                            <li>LLL: três lados (para achar ângulos)</li>
                            <li>Ângulo obtuso com dois lados</li>
                          </ul>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Quando cos A resulta negativo, o ângulo A é obtuso (&gt; 90°).
                        Candidatos que esquecem que arccos pode dar ângulo obtuso
                        ficam com respostas sem sentido geométrico. Sempre verifique
                        se o triângulo pode ser acutângulo, retângulo ou obtusângulo.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizM7}
              titulo="Quiz — Lei dos Cossenos"
              icone="📐"
              numero={7}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: EQUAÇÕES TRIGONOMÉTRICAS                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Equações Trigonométricas"
          descricao="Encontre todos os ângulos que satisfazem uma equação — incluindo a solução geral com periodicidade."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Soluções no Intervalo e Solução Geral"
              description="Como encontrar todas as soluções de equações trigonométricas."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Equações Trigonométricas — Método de Resolução"
              icone="🔐"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Equações Básicas e Soluções Gerais",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Toda equação trigonométrica tem infinitas soluções (pela
                        periodicidade). A{" "}
                        <strong>solução geral</strong> captura todas elas:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                          <p className="text-sm font-bold text-blue-400 mb-1">
                            sen(x) = k (|k| ≤ 1):
                          </p>
                          <p className="font-mono text-sm">
                            x = arcsen(k) + 360°n, ou x = 180° − arcsen(k) + 360°n
                          </p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                          <p className="text-sm font-bold text-emerald-400 mb-1">
                            cos(x) = k (|k| ≤ 1):
                          </p>
                          <p className="font-mono text-sm">
                            x = ±arccos(k) + 360°n
                          </p>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                          <p className="text-sm font-bold text-cyan-400 mb-1">
                            tan(x) = k:
                          </p>
                          <p className="font-mono text-sm">
                            x = arctan(k) + 180°n
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Estratégia de Resolução Passo a Passo",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Método sistemático para resolver qualquer equação
                        trigonométrica:
                      </p>
                      <div className="space-y-2">
                        {[
                          { passo: "1", desc: "Isole a função trigonométrica (sen, cos ou tan)" },
                          { passo: "2", desc: "Encontre o ângulo de referência no 1º quadrante" },
                          { passo: "3", desc: "Identifique em quais quadrantes o sinal está correto" },
                          { passo: "4", desc: "Liste todas as soluções no intervalo dado" },
                          { passo: "5", desc: "Escreva a solução geral se necessário" },
                        ].map((item) => (
                          <div
                            key={item.passo}
                            className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border"
                          >
                            <span className="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {item.passo}
                            </span>
                            <p className="text-sm pt-0.5">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Equações com Funções Compostas",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Equações do tipo sen(2x) = k requerem cuidado extra com
                        o intervalo de busca:
                      </p>
                      <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-indigo-400">
                          Exemplo: sen(2x) = 1/2 em [0°, 360°]
                        </p>
                        <p className="text-sm">
                          Seja u = 2x. Como x ∈ [0°, 360°], então u ∈ [0°, 720°].
                        </p>
                        <p className="text-sm">
                          sen(u) = 1/2 → u = 30°, 150°, 390°, 510° (em [0°, 720°])
                        </p>
                        <p className="text-sm font-bold">
                          x = u/2 = 15°, 75°, 195°, 255° → 4 soluções!
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Em sen(2x) = k no intervalo [0°, 360°], você deve buscar
                        soluções no dobro do intervalo: [0°, 720°] para u = 2x.
                        Candidatos que esquecem disso encontram apenas 2 soluções
                        no lugar de 4 — perdem pontos valiosos.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizM8}
              titulo="Quiz — Equações Trigonométricas"
              icone="🔐"
              numero={8}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: APLICAÇÕES PETROBRAS                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aplicações Industriais Petrobras"
          descricao="Trigonometria aplicada em rampas offshore, dutos submarinos, triangulação, içamento de cargas e inspeções industriais."
          gradiente="bg-gradient-to-br from-emerald-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Cenários Reais da Indústria de Petróleo"
              description="As situações que a CESGRANRIO recria em suas questões contextualizadas."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Aplicações Industriais — Casos da Petrobras"
              icone="⚙️"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Rampas, Dutos e Estruturas Inclinadas",
                  icone: "🏗️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Projetos de plataformas offshore envolvem cálculos
                        trigonométricos para rampas de acesso, dutos de
                        transferência e estruturas de sustentação. Fórmulas
                        mais usadas:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">
                            Rampa/Duto Inclinado
                          </p>
                          <p className="text-sm font-mono">
                            Altura = comprimento × sen(θ)
                          </p>
                          <p className="text-sm font-mono">
                            Projeção horizontal = comprimento × cos(θ)
                          </p>
                          <p className="text-sm mt-2 text-muted-foreground">
                            Ex: Duto de 100m a 30° → Altura = 50m, Horiz = 50√3m
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500 mb-2">
                            Cabo de Içamento
                          </p>
                          <p className="text-sm font-mono">
                            Tensão horizontal = T × cos(θ)
                          </p>
                          <p className="text-sm font-mono">
                            Tensão vertical = T × sen(θ)
                          </p>
                          <p className="text-sm mt-2 text-muted-foreground">
                            Onde T é a tensão no cabo e θ é o ângulo com a vertical
                          </p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500 mb-2">
                            Flare Tower — Ângulo de Elevação
                          </p>
                          <p className="text-sm font-mono">
                            Altura = distância_horizontal × tan(θ_elevação)
                          </p>
                          <p className="text-sm mt-2 text-muted-foreground">
                            Medição indireta: técnico mede ângulo a distância segura
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Ensaios Não-Destrutivos e Inspeção Industrial",
                  icone: "🔬",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Técnicas de inspeção (ultrassom, radiografia) usam
                        trigonometria para localizar defeitos internos em dutos,
                        vasos de pressão e estruturas:
                      </p>
                      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 space-y-3">
                        <p className="text-sm font-bold text-blue-500">
                          Inspeção por Ultrassom — Localização de Defeito:
                        </p>
                        <p className="text-sm">
                          Um transdutor emite onda a 60° da superfície. O eco retorna
                          em t=2μs. Se v=5000m/s:
                        </p>
                        <p className="text-sm">
                          Distância percorrida = v × t/2 = 5000 × 1μs = 5mm
                        </p>
                        <p className="text-sm font-bold">
                          Profundidade = 5 × sen(60°) = 5 × (√3/2) ≈ 4,33mm
                        </p>
                        <p className="text-sm">
                          Posição lateral = 5 × cos(60°) = 5 × 0,5 = 2,5mm
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Real — PETROBRAS">
                        A Petrobras aplica extensivamente END (Ensaios
                        Não-Destrutivos) em dutos submarinos da Bacia de Santos e
                        Campos. Técnicos de nível médio e superior precisam
                        compreender os cálculos trigonométricos para interpretar
                        relatórios de inspeção e planejar reparos.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Navegação e Posicionamento Dinâmico de FPSOs",
                  icone: "⛵",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        As unidades FPSO (Floating, Production, Storage and
                        Offloading) usam sistemas de posicionamento dinâmico que
                        integram cálculos trigonométricos em tempo real:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">
                            Decomposição de Correntes Marítimas
                          </p>
                          <p className="text-sm">
                            Corrente de 3 nós a 45°:
                          </p>
                          <p className="text-sm font-mono mt-1">
                            N-S: 3 × cos(45°) = 3√2/2 nós
                          </p>
                          <p className="text-sm font-mono">
                            L-O: 3 × sen(45°) = 3√2/2 nós
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500 mb-2">
                            Força dos Propulsores (Thrusters)
                          </p>
                          <p className="text-sm">
                            Propulsor de 100kN a 30° da proa:
                          </p>
                          <p className="text-sm font-mono mt-1">
                            Fx = 100 × cos(30°) = 50√3 kN
                          </p>
                          <p className="text-sm font-mono">
                            Fy = 100 × sen(30°) = 50 kN
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Em problemas de navegação, o ângulo pode ser dado como
                        azimute (medido a partir do Norte, no sentido horário) ou
                        como ângulo cartesiano (a partir do eixo x, anti-horário).
                        Converter corretamente antes de calcular é fundamental.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-9" className="mt-16">
            <QuizInterativo
              questoes={quizM9}
              titulo="Quiz — Aplicações Industriais Petrobras"
              icone="⚙️"
              numero={9}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 10: SIMULADO CESGRANRIO                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado Final — Estilo CESGRANRIO"
          descricao="Questões de nível concurso integrando todos os tópicos de trigonometria. Prove que está pronto para a prova!"
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Geral — Mapa Mental da Trigonometria"
              description="Os 10 pontos críticos que a CESGRANRIO explora em questões de Trigonometria."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Revisão Final — Checklist para a Prova"
              icone="✅"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Os 10 Pontos Críticos da Trigonometria",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {[
                          { item: "1", desc: "SOH-CAH-TOA: definições de sen, cos e tan no triângulo retângulo", ok: "blue" },
                          { item: "2", desc: "Tabela completa de ângulos notáveis: 0°, 30°, 45°, 60°, 90°", ok: "emerald" },
                          { item: "3", desc: "Círculo trigonométrico: sinais por quadrante e pontos especiais", ok: "cyan" },
                          { item: "4", desc: "Identidade fundamental: sen²θ + cos²θ = 1 e suas derivações", ok: "indigo" },
                          { item: "5", desc: "Amplitude, período e deslocamento de funções trig", ok: "blue" },
                          { item: "6", desc: "Lei dos Senos: a/senA = b/senB = c/senC (casos AAS, ASA)", ok: "emerald" },
                          { item: "7", desc: "Lei dos Cossenos: a² = b²+c²−2bc·cosA (casos LAL, LLL)", ok: "cyan" },
                          { item: "8", desc: "Fórmulas de adição: sen(A±B), cos(A±B) e arco duplo", ok: "indigo" },
                          { item: "9", desc: "Equações trigonométricas: solução no intervalo e solução geral", ok: "blue" },
                          { item: "10", desc: "Aplicações: rampas, triangulação, ângulos de inclinação industrial", ok: "emerald" },
                        ].map((item) => (
                          <div
                            key={item.item}
                            className={`flex items-start gap-3 p-3 bg-${item.ok}-500/5 rounded-lg border border-${item.ok}-500/20`}
                          >
                            <span
                              className={`flex-shrink-0 w-7 h-7 bg-${item.ok}-500 text-white rounded-full flex items-center justify-center text-sm font-bold`}
                            >
                              {item.item}
                            </span>
                            <p className="text-sm pt-0.5">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pegadinhas Clássicas da CESGRANRIO",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        As armadilhas mais comuns que a banca usa para separar
                        candidatos bem preparados:
                      </p>
                      <div className="space-y-3">
                        {[
                          {
                            trap: "Inverter sen e cos para ângulos complementares",
                            detail: "sen 30° = cos 60° = 1/2 (não √3/2). Se confundir 30° e 60°, você vai para a alternativa errada.",
                          },
                          {
                            trap: "Tangente de 90° e 270°",
                            detail: "tan 90° é INDEFINIDA (não 0 nem ∞). A banca usa isso em questões de domínio de funções.",
                          },
                          {
                            trap: "Período da tangente vs seno/cosseno",
                            detail: "tan tem período π (180°), seno e cosseno têm 2π (360°). Equações com tangente têm o dobro de soluções!",
                          },
                          {
                            trap: "Ângulo com vertical vs horizontal",
                            detail: "Um cabo a 30° com o solo está a 60° com o mastro vertical. Verifique sempre qual referência é usada.",
                          },
                          {
                            trap: "Lei dos Senos com ângulo obtuso",
                            detail: "SSA pode gerar dois triângulos (caso ambíguo). A banca pode pedir qual é possível com as restrições do problema.",
                          },
                        ].map((p, i) => (
                          <div
                            key={i}
                            className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20"
                          >
                            <p className="text-sm font-bold text-amber-500 mb-1">
                              ⚠️ {p.trap}
                            </p>
                            <p className="text-sm text-muted-foreground">{p.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Estratégia de Prova em 5 Minutos",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Como abordar questões de trigonometria eficientemente
                        durante a prova da CESGRANRIO:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">
                            1. Leia o enunciado e desenhe o triângulo (30s)
                          </p>
                          <p className="text-sm">
                            Marque os dados: ângulos, lados, o que é pedido. O
                            desenho evita 80% dos erros de interpretação.
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-500 mb-2">
                            2. Identifique o ângulo e a relação necessária (30s)
                          </p>
                          <p className="text-sm">
                            É triângulo retângulo? Use SOH-CAH-TOA. Não é
                            retângulo? Escolha Lei dos Senos ou Cossenos.
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-500 mb-2">
                            3. Substitua e calcule (2-3 min)
                          </p>
                          <p className="text-sm">
                            Use os valores notáveis memorizados. Não tente
                            calcular senos de ângulos não-notáveis — a banca
                            sempre dá valores que simplificam.
                          </p>
                        </div>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-500 mb-2">
                            4. Verifique se a resposta faz sentido físico (30s)
                          </p>
                          <p className="text-sm">
                            A altura pode ser maior que o comprimento da rampa?
                            Não! Se seu resultado viola o senso comum, revise o
                            ângulo de referência.
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha Final — Atenção às Unidades">
                        A CESGRANRIO pode misturar ângulos em graus e radianos na
                        mesma questão. Sempre verifique qual unidade é pedida na
                        resposta e na equação. Uma confusão de unidade vai
                        diretamente para a alternativa errada.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-10" className="mt-16">
            <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Final — CESGRANRIO"
              icone="🏆"
              numero={10}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
