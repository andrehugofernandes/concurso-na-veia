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
  ModuleConsolidation,
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
          gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Trigonometria Aplicada (Módulo 1)"
              slides={[
                {
                  titulo: "Exercício Resolvido 1: Cálculo de Altura com Ângulo de Elevação",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="font-semibold">Um observador no chão a 100m de distância de uma estrutura observa o topo desta a um ângulo de elevação de 30°. Qual é a altura da estrutura?</p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm mb-2"><strong>Solução:</strong></p>
                        <p className="text-sm">1. Identifique: CA = 100m (cateto adjacente), θ = 30°, CO = altura (incógnita)</p>
                        <p className="text-sm">2. Use: tg(30°) = CO/CA</p>
                        <p className="text-sm">3. tg(30°) = √3/3, então: √3/3 = h/100</p>
                        <p className="text-sm">4. h = 100 · √3/3 ≈ 57,7m</p>
                      </div>
                      <AlertBox tipo="success" titulo="Ângulo de Elevação">
                        Lembre: o ângulo de elevação é sempre medido do chão para cima, formando um triângulo retângulo com o observador no solo.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Resolvido 2: Inclinação de Rampa em Operações Petrobras",
                  icone: "🛣️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="font-semibold">Uma rampa de acesso tem comprimento de 15m (hipotenusa) e forma um ângulo de 20° com o solo. Calcule a altura vertical da rampa.</p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm mb-2"><strong>Solução:</strong></p>
                        <p className="text-sm">1. Identifique: Hip = 15m, θ = 20°, CO = altura (incógnita)</p>
                        <p className="text-sm">2. Use: sen(20°) = CO/Hip</p>
                        <p className="text-sm">3. sen(20°) ≈ 0,342, então: 0,342 = h/15</p>
                        <p className="text-sm">4. h ≈ 5,13m (altura vertical da rampa)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação em Plataformas">
                        Esta é uma aplicação comum em inspeções de segurança de rampas de acesso em plataformas de petróleo.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
          











<ModuleConsolidation
            index={1}
            variant="indigo"
            video={{
              videoId: "qXv_IOKSZPY",
              title: "Razões Trigonométricas no Triângulo Retângulo",
              duration: "12:34"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "SOH-CAH-TOA: Seno, Cosseno, Tangente",
                type: "diagram",
                placeholderColor: "#4f46e5",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">SOH-CAH-TOA é a chave mnemônica:</p>
                <p>• Seno = Oposto/Hipotenusa (SOH)</p>
                <p>• Cosseno = Adjacente/Hipotenusa (CAH)</p>
                <p>• Tangente = Oposto/Adjacente (TOA)</p>
                <p className="text-sm italic pt-2">Lembre: em um triângulo retângulo, sempre há uma hipotenusa e dois catetos (oposto e adjacente).</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Razões Trigonométricas - Resumo Ritmado",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Razões Trigonométricas"
              icone="📐"
              numero={2}
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
          gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Ângulos Notáveis (Módulo 2)"
              slides={[
                {
                  titulo: "Memória Rápida: A Tabela de Ângulos Notáveis",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p>A tabela de ângulos notáveis (30°, 45°, 60°) é fundamental para resolver rapidamente em provas:</p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-emerald-500/30">
                              <th className="text-left p-2">Ângulo</th>
                              <th className="text-center p-2">30°</th>
                              <th className="text-center p-2">45°</th>
                              <th className="text-center p-2">60°</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-emerald-500/10">
                              <td className="font-bold p-2">sen</td>
                              <td className="text-center p-2 font-mono">1/2</td>
                              <td className="text-center p-2 font-mono">√2/2</td>
                              <td className="text-center p-2 font-mono">√3/2</td>
                            </tr>
                            <tr className="border-b border-emerald-500/10">
                              <td className="font-bold p-2">cos</td>
                              <td className="text-center p-2 font-mono">√3/2</td>
                              <td className="text-center p-2 font-mono">√2/2</td>
                              <td className="text-center p-2 font-mono">1/2</td>
                            </tr>
                            <tr>
                              <td className="font-bold p-2">tg</td>
                              <td className="text-center p-2 font-mono">√3/3</td>
                              <td className="text-center p-2 font-mono">1</td>
                              <td className="text-center p-2 font-mono">√3</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="success" titulo="Padrão dos Valores">
                        Dica: Seno aumenta (1/2 → √2/2 → √3/2), Cosseno diminui (√3/2 → √2/2 → 1/2). Tangente: na ordem 1/√3, 1, √3.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-2" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="emerald"
            video={{
              videoId: "V0xjO3M0q0s",
              title: "Ângulos Notáveis: 30°, 45°, 60°",
              duration: "15:22"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Tabela: sen, cos, tg de 30°, 45°, 60°",
                type: "diagram",
                placeholderColor: "#10b981",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Decorar em sequência numérica (√n/2):</p>
                <p>sen: √1, √2, √3 (÷2) → 1/2, √2/2, √3/2</p>
                <p>cos: √3, √2, √1 (÷2) → √3/2, √2/2, 1/2</p>
                <p className="text-sm italic pt-2">Seno AUMENTA de 0° a 90°. Cosseno DIMINUI de 0° a 90°.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "Ângulos Notáveis - Sequência √1, √2, √3",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Círculo Trigonométrico (Módulo 3)"
              slides={[
                {
                  titulo: "Compreendendo Radianos vs Graus",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p><strong>Radianos</strong> medem o comprimento do arco em relação ao raio. Em um círculo unitário (raio = 1), o comprimento do arco = medida em radianos.</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm"><strong>Conversões Essenciais:</strong></p>
                        <p className="text-sm">π rad = 180° → 1 rad ≈ 57.3°</p>
                        <p className="text-sm">2π rad = 360° (volta completa)</p>
                        <p className="text-sm">π/2 rad = 90°, π/3 rad = 60°, π/4 rad = 45°</p>
                      </div>
                      <AlertBox tipo="info" titulo="Por que Radianos?">
                        Em cálculo e física, radianos são preferidos porque simplificam muitas fórmulas (derivadas de sen(x) é cos(x) quando x está em radianos).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-16">
          











<ModuleConsolidation
            index={3}
            variant="cyan"
            video={{
              videoId: "0PqJ_MN0n8U",
              title: "Circunferência Unitária e Radianos",
              duration: "18:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Ângulos em radianos e posição no círculo unitário",
                type: "diagram",
                placeholderColor: "#06b6d4",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Conversão π: 180° = π rad</p>
                <p>• π/6 = 30°, π/4 = 45°, π/3 = 60°, π/2 = 90°</p>
                <p>• Quadrante I: 0 a π/2 (sen+ cos+)</p>
                <p>• Quadrante II: π/2 a π (sen+ cos-)</p>
                <p className="text-sm italic pt-2">Use ângulo de referência: sempre use distância para eixo mais próximo.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "Círculo Unitário - Quadrantes e Sinais",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Círculo Trigonométrico"
              icone="⭕"
              numero={4}
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
          gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Funções Trigonométricas (Módulo 4)"
              slides={[
                {
                  titulo: "Transformações em Funções Trigonométricas",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p><strong>Transformações básicas:</strong> y = a·sen(bx + c) + d</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm">• <strong>a</strong>: amplitude (altura máxima - valor central)</p>
                        <p className="text-sm">• <strong>b</strong>: afeta período (período = 2π/b)</p>
                        <p className="text-sm">• <strong>c</strong>: deslocamento horizontal (defasagem)</p>
                        <p className="text-sm">• <strong>d</strong>: deslocamento vertical</p>
                      </div>
                      <AlertBox tipo="success" titulo="Exemplo Completo">
                        Exemplo: y = 2·sen(3x - π/2) + 1 tem amplitude 2, período 2π/3, deslocamento horizontal π/6 à direita, e desloca 1 unidade para cima.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4" className="mt-16">
          











<ModuleConsolidation
            index={4}
            variant="blue"
            video={{
              videoId: "xEiUPR46EIQ",
              title: "Funções sen(x), cos(x), tg(x): Gráficos e Propriedades",
              duration: "20:15"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Período 2π, Amplitude 1, Simetria em sen(x) e cos(x)",
                type: "diagram",
                placeholderColor: "#3b82f6",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Propriedades fundamentais:</p>
                <p>• Período de sen(x) e cos(x): 2π</p>
                <p>• Período de tg(x): π</p>
                <p>• Amplitude de sen(x) e cos(x): [-1, 1]</p>
                <p>• sen(x) é ÍMPAR, cos(x) é PAR</p>
                <p className="text-sm italic pt-2">Deslocamento: sen(x+π/2) = cos(x)</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Funções Trigonométricas - Período e Amplitude",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Identidades Trigonométricas (Módulo 5)"
              slides={[
                {
                  titulo: "Derivação das Identidades Pitagóricas",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p><strong>De uma identidade, derivamos todas as outras:</strong></p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-3">
                        <div className="text-sm">
                          <p className="font-bold mb-1">Identidade Fundamental:</p>
                          <p className="font-mono">sen²θ + cos²θ = 1</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-bold mb-1">Divida por cos²θ:</p>
                          <p className="font-mono">sen²θ/cos²θ + 1 = 1/cos²θ</p>
                          <p className="font-mono">tg²θ + 1 = sec²θ</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-bold mb-1">Divida por sen²θ:</p>
                          <p className="font-mono">1 + cos²θ/sen²θ = 1/sen²θ</p>
                          <p className="font-mono">1 + cotg²θ = cossec²θ</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
          











<ModuleConsolidation
            index={5}
            variant="amber"
            video={{
              videoId: "1Ixnl1bN3yg",
              title: "Identidades Trigonométricas Fundamentais",
              duration: "16:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "sen²θ + cos²θ = 1, sec²θ = 1 + tg²θ, cossec²θ = 1 + cotg²θ",
                type: "diagram",
                placeholderColor: "#f59e0b",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">As 3 identidades principais:</p>
                <p>1) sen²θ + cos²θ = 1 (Pitagórica)</p>
                <p>2) 1 + tg²θ = sec²θ</p>
                <p>3) 1 + cotg²θ = cossec²θ</p>
                <p className="text-sm italic pt-2">Tip: Deduza a partir da primeira! Divida por cos² ou sen².</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Identidades - A Pitagórica é a Mãe",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Identidades"
              icone="🔑"
              numero={6}
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
          gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Lei dos Senos (Módulo 6)"
              slides={[
                {
                  titulo: "Caso AAS: Ângulo-Ângulo-Lado",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p><strong>Exemplo:</strong> Em um triângulo, A = 60°, B = 45°, e lado c = 10. Encontre lado a.</p>
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm">1. Primeiro, encontre C: C = 180° - 60° - 45° = 75°</p>
                        <p className="text-sm">2. Aplique Lei dos Senos: a/sen(A) = c/sen(C)</p>
                        <p className="text-sm">3. a/sen(60°) = 10/sen(75°)</p>
                        <p className="text-sm">4. a = 10·sen(60°)/sen(75°) = 10·(√3/2)/0,966 ≈ 8,93</p>
                      </div>
                      <AlertBox tipo="success" titulo="Caso Mais Comum">
                        Este é o caso mais comum em testes: use Lei dos Senos quando conhecer uma medida de lado com seu ângulo oposto.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">
          











<ModuleConsolidation
            index={6}
            variant="rose"
            video={{
              videoId: "FAp9XvJNc0I",
              title: "Lei dos Senos: a/sen(A) = b/sen(B) = c/sen(C)",
              duration: "14:50"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Proporção entre lados e senos dos ângulos opostos",
                type: "diagram",
                placeholderColor: "#f43f5e",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Lei dos Senos: lado/seno oposto</p>
                <p>a/sen(A) = b/sen(B) = c/sen(C) = 2R</p>
                <p>Onde R é o raio da circunferência circunscrita.</p>
                <p className="text-sm italic pt-2">Use quando: conhecer 2 ângulos + 1 lado (AAS ou ASA)</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Lei dos Senos - Lado sobre Seno Oposto",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Lei dos Cossenos (Módulo 7)"
              slides={[
                {
                  titulo: "Caso SAS: Dois Lados e Ângulo Entre Eles",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p><strong>Exemplo:</strong> Dois lados de um triângulo medem 5 e 7, com ângulo entre eles de 60°. Encontre o terceiro lado.</p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm">Aplique Lei dos Cossenos: c² = 5² + 7² - 2(5)(7)cos(60°)</p>
                        <p className="text-sm">c² = 25 + 49 - 70(1/2)</p>
                        <p className="text-sm">c² = 74 - 35 = 39</p>
                        <p className="text-sm">c = √39 ≈ 6,24</p>
                      </div>
                      <AlertBox tipo="info" titulo="Quando Usar Lei dos Cossenos">
                        Quando você conhece dois lados e o ângulo ENTRE eles, sempre use Lei dos Cossenos (SAS).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
          











<ModuleConsolidation
            index={7}
            variant="indigo"
            video={{
              videoId: "oXDe-QYqbWo",
              title: "Lei dos Cossenos: a² = b² + c² - 2bc·cos(A)",
              duration: "17:22"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Generalização de Pitágoras para qualquer triângulo",
                type: "diagram",
                placeholderColor: "#4f46e5",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Lei dos Cossenos (Pitágoras Generalizada):</p>
                <p>a² = b² + c² - 2bc·cos(A)</p>
                <p>Use quando: 3 lados (SSS) ou 2 lados + ângulo entre (SAS)</p>
                <p className="text-sm italic pt-2">Se cos(A) = 0 (A = 90°), vira a² = b² + c² (Pitágoras!).</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Lei dos Cossenos - Pitágoras do Triângulo Oblíquo",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Lei dos Cossenos"
              icone="📐"
              numero={8}
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
          gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Equações Trigonométricas (Módulo 8)"
              slides={[
                {
                  titulo: "Resolvendo 2sin(x) - √3 = 0 no intervalo [0, 2π)",
                  icone: "🔐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm">1. Isole sin(x): sin(x) = √3/2</p>
                        <p className="text-sm">2. Ache os ângulos: sin(x) = √3/2 quando x = π/3 ou x = 2π/3</p>
                        <p className="text-sm">3. No intervalo [0, 2π):</p>
                        <p className="text-sm ml-4">• Primeira volta: x = π/3 (60°) ou x = 2π/3 (120°)</p>
                        <p className="text-sm">4. Solução geral: x = π/3 + 2πk ou x = 2π/3 + 2πk, onde k ∈ Z</p>
                      </div>
                      <AlertBox tipo="success" titulo="Soluções no Intervalo">
                        Lembre: se sin(x) = a, então x = arcsin(a) ou x = π - arcsin(a) (ambas soluções no intervalo [0, 2π)).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-8" className="mt-16">
          











<ModuleConsolidation
            index={8}
            variant="emerald"
            video={{
              videoId: "jOpTkIwmJqE",
              title: "Equações Trigonométricas: Resolvendo sin(x)=a, cos(x)=a, tan(x)=a",
              duration: "19:05"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Soluções periódicas e intervalo [0, 2π)",
                type: "diagram",
                placeholderColor: "#10b981",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Estratégia para resolver equações trigonométricas:</p>
                <p>1) Isole a função (sen, cos ou tg)</p>
                <p>2) Encontre ângulos de referência</p>
                <p>3) Aplique a periodicidade (adicione 2πk ou πk)</p>
                <p className="text-sm italic pt-2">Lembre: Sen e Cos têm período 2π; Tangente tem período π.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Equações Trigonométricas - Isolar e Aplicar Periodicidade",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Prática Avançada — Aplicações Petrobras (Módulo 9)"
              slides={[
                {
                  titulo: "Caso Real: Inclinação de Poço Desviado",
                  icone: "⛽",
                  conteudo: (
                    <div className="space-y-4">
                      <p><strong>Um poço desviado tem comprimento vertical de 2000m e comprimento total (ao longo do poço) de 2500m. Qual é o ângulo de desvio em relação à vertical?</strong></p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm">1. Identifique: CO (comprimento vertical) = 2000m</p>
                        <p className="text-sm">2. Hip (comprimento total do poço) = 2500m</p>
                        <p className="text-sm">3. Use: cos(θ) = CO/Hip = 2000/2500 = 0,8</p>
                        <p className="text-sm">4. θ = arccos(0,8) ≈ 36,87°</p>
                      </div>
                      <AlertBox tipo="success" titulo="Engenharia de Poços">
                        Este cálculo é essencial em engenharia de poços para verificar se o desvio está dentro dos parâmetros operacionais (geralmente 0-60° dependendo da zona).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-9" className="mt-16">
          











<ModuleConsolidation
            index={9}
            variant="cyan"
            video={{
              videoId: "2mQ8V3vAVPs",
              title: "Aplicações Reais: Trigonometria em Engenharia e Indústria",
              duration: "21:40"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Inclinação de poços, deflexão de dutos, força resultante em estruturas",
                type: "diagram",
                placeholderColor: "#06b6d4",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato - Contexto Petrobras",
              content: (<div className="space-y-3">
                <p className="font-semibold">Aplicações comuns em operações Petrobras:</p>
                <p>• Ângulos de inclinação: poços, dutos, plataformas (sen θ = altura/hipotenusa)</p>
                <p>• Deflexão em trajetos: alterações de direção calculadas por senos</p>
                <p>• Força resultante: decomposição vetorial em componentes perpendiculares</p>
                <p>• Coordenadas geográficas: latitude/longitude em navegação offshore</p>
                <p className="text-sm italic pt-2">Tip: Desenhe sempre o triângulo ou diagrama vetorial!</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Trigonometria na Engenharia Petrolífera",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Aplicações Industriais"
              icone="⚙️"
              numero={10}
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
          gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800"
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



          <section className="mt-16">
            <ContentAccordion
              titulo="Revisão Final e Síntese — Consolidação Total (Módulo 10)"
              slides={[
                {
                  titulo: "Mapa Decisório: Qual Lei/Fórmula Usar?",
                  icone: "🗺️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-3">
                        <div className="text-sm">
                          <p className="font-bold mb-1">Triângulo Retângulo:</p>
                          <p>Você conhece um ângulo agudo e um lado? Use SOH-CAH-TOA</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-bold mb-1">2 ângulos + 1 lado (AAS/ASA):</p>
                          <p>Use Lei dos Senos: a/sen(A) = b/sen(B)</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-bold mb-1">2 lados + ângulo entre (SAS):</p>
                          <p>Use Lei dos Cossenos: a² = b² + c² - 2bc·cos(A)</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-bold mb-1">3 lados (SSS):</p>
                          <p>Use Lei dos Cossenos para achar ângulos</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-bold mb-1">Equação do tipo sin(x)=a:</p>
                          <p>Isole, ache o ângulo de referência, aplique periodicidade</p>
                        </div>
                      </div>
                      <AlertBox tipo="success" titulo="Dica Final">
                        Estudou? Revise este mapa no dia da prova. Ele define qual ferramenta usar em cada situação!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Checklist de Revisão — Antes da Prova",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <div className="text-sm space-y-2">
                          <p>☐ Decorei a tabela de ângulos notáveis (30°, 45°, 60°)?</p>
                          <p>☐ Lembro dos sinais por quadrante (ASTC)?</p>
                          <p>☐ Sei quando usar Lei dos Senos vs Cossenos?</p>
                          <p>☐ Entendo periodicidade de sen/cos/tg?</p>
                          <p>☐ Consigo resolver sen²+cos²=1 aplicações?</p>
                          <p>☐ Treino problema Petrobras: poços e dutos?</p>
                          <p>☐ Fiz 20+ questões de fixação?</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Checklist de Revisão">
                        Se respondeu "não" para qualquer item, revise aquele módulo agora! Não vá para a prova com lacunas.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-10" className="mt-16">
          











<ModuleConsolidation
            index={10}
            variant="blue"
            video={{
              videoId: "lW3W5I6VLkY",
              title: "Revisão Geral: Trigonometria da Aula 1 ao Módulo 9",
              duration: "24:18"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Trigonometria",
              materia: "Matemática",
              images: [{
                title: "Mapa Mental Completo: Todas as Razões, Identidades, Leis e Aplicações",
                type: "diagram",
                placeholderColor: "#3b82f6",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato - Resumo Final",
              content: (<div className="space-y-3">
                <p className="font-semibold">9 Pilares da Trigonometria (Revise em 5 minutos!):</p>
                <p>1. SOH-CAH-TOA (razões básicas)</p>
                <p>2. Ângulos Notáveis: √1, √2, √3 dividido por 2</p>
                <p>3. Círculo Unitário: quadrantes e sinais</p>
                <p>4. Funções: período 2π (sen/cos) ou π (tg)</p>
                <p>5. Identidade: sen²+cos²=1</p>
                <p>6. Lei dos Senos: a/sen(A) = b/sen(B)</p>
                <p>7. Lei dos Cossenos: a²=b²+c²-2bc·cos(A)</p>
                <p>8. Equações: isole, resolva, aplique periodicidade</p>
                <p>9. Aplicações Petrobras: sempre desenhe o diagrama!</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Trigonometria - Os 9 Pilares Consolidados",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Final — CESGRANRIO"
              icone="🏆"
              numero={10}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          <section className="mt-20 p-8 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl border border-blue-500/20">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Conclusão: Trigonometria Completa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="font-semibold mb-3">O que você aprendeu:</p>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Razões trigonométricas em triângulos</li>
                    <li>Tabela de ângulos notáveis</li>
                    <li>Círculo trigonométrico e radianos</li>
                    <li>Propriedades de funções periódicas</li>
                    <li>Identidades fundamentais</li>
                    <li>Lei dos Senos e Lei dos Cossenos</li>
                    <li>Resolução de equações trigonométricas</li>
                    <li>Aplicações em engenharia Petrobras</li>
                  </ul>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <p className="font-semibold mb-3">Como você pode usar:</p>
                  <ul className="text-sm space-y-2 list-disc list-inside">
                    <li>Resolver problemas de inclinação de estruturas</li>
                    <li>Calcular distâncias em levantamentos</li>
                    <li>Analisar movimentos periódicos</li>
                    <li>Aplicar em navegação offshore</li>
                    <li>Decompor forças vetoriais</li>
                    <li>Modelar fenômenos oscilatórios</li>
                    <li>Resolver qualquer tipo de triângulo</li>
                    <li>Passar em concursos (CESGRANRIO, VUNESP)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <p className="text-center text-sm font-semibold mb-4">Próximos Passos Recomendados:</p>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Completar todos os 10 módulos do simulado</li>
                  <li>Refazer os exercícios com ângulos diferentes</li>
                  <li>Resolver problemas reais da Petrobras (buscar em editais)</li>
                  <li>Praticar gráficos: esboçar sen, cos, tg com transformações</li>
                  <li>Revisar semanalmente: use os áudios do "Pulo do Gato"</li>
                  <li>Conectar com Análise Combinatória e Probabilidade (assuntos conexos em provas)</li>
                </ol>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
