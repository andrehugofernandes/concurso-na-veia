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
  QUIZ_M1_POTENCIACAO,
  QUIZ_M2_GRAFICO,
  QUIZ_M3_EQUACOES,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
} from "./data/funcoes-exponenciais-quizzes";

// Quizzes importados de ./data/funcoes-exponenciais-quizzes.ts
// (36 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaFuncoesExponenciais({
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
  const [quizConceito] = useState(() =>
    getRandomQuestions(QUIZ_M1_POTENCIACAO, 6),
  );
  const [quizEquacoes] = useState(() =>
    getRandomQuestions(QUIZ_M3_EQUACOES, 6),
  );
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_M4_APLICACOES, 5),
  );
  const [quizInequacoes] = useState(() =>
    getRandomQuestions(QUIZ_M2_GRAFICO, 5),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));
  const isModuleUnlocked = (_index: number) => true;
  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = [
        "modulo-1",
        "modulo-2",
        "modulo-3",
        "modulo-4",
        "modulo-5",
      ].findIndex((m) => m === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / 5) * 100));
      if (idx < 4) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };
  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 5);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Potenciação" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Equações Exponenciais" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Aplicações" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Inequações" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desafio Final" },
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
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Potenciação e Conceitos"
          descricao="As regras fundamentais de potências."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Regras de Potenciação"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="As 5 Regras de Ouro"
              icone="⚡"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Regras Essenciais",
                  icone: "📜",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        {[
                          "aᵐ × aⁿ = aᵐ⁺ⁿ",
                          "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
                          "(aᵐ)ⁿ = aᵐˣⁿ",
                          "a⁻ⁿ = 1/aⁿ",
                          "a⁰ = 1 (a≠0)",
                        ].map((r, i) => (
                          <div
                            key={i}
                            className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20 font-mono text-center"
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceito}
              titulo="Quiz - Potenciação"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Equações Exponenciais"
          descricao="Iguale as bases e compare os expoentes."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Arte de Igualar Bases"
              description="O único jeito de baixar o 'x' do andar de cima."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Método de Resolução"
              icone="⚖️"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Objetivo: Bases Iguais",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Você não pode multiplicar ou dividir um número
                        &quot;normal&quot; por um que está no expoente. A regra
                        de ouro é:{" "}
                        <strong>
                          fatorar os números grandes até que os dois lados da
                          igualdade tenham a MESMA base
                        </strong>
                        .
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center shadow-inner">
                        <p className="font-mono mb-2">
                          Se: <strong className="text-xl">aˣ = aʸ</strong>
                        </p>
                        <p className="font-mono">
                          Então:{" "}
                          <strong className="text-xl text-emerald-800 dark:text-emerald-300">
                            x = y
                          </strong>
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground text-center italic">
                        Corta as bases e resolve apenas os expoentes!
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Passo a Passo (CESGRANRIO)",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-card p-4 rounded-xl border border-border text-sm">
                        <p className="font-bold mb-2 text-emerald-700 dark:text-emerald-400">
                          Exemplo Prático: 4ˣ = 8
                        </p>
                        <ul className="space-y-3">
                          <li>
                            <span className="font-bold">
                              1. Fatore os números grandes:
                            </span>
                            <br />
                            O 4 é 2². O 8 é 2³.
                            <br />
                            Fica:{" "}
                            <code className="bg-muted px-1 rounded">
                              (2²)ˣ = 2³
                            </code>
                          </li>
                          <li>
                            <span className="font-bold">
                              2. Use as Regras de Potência (potência de potência
                              multiplica):
                            </span>
                            <br />
                            Fica:{" "}
                            <code className="bg-muted px-1 rounded">
                              2²ˣ = 2³
                            </code>
                          </li>
                          <li>
                            <span className="font-bold">
                              3. Bases iguais? Corte-as e desça os expoentes!
                            </span>
                            <br />
                            <code className="bg-emerald-500/20 font-bold px-2 py-1 rounded">
                              2x = 3
                            </code>{" "}
                            →{" "}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              x = 1,5
                            </strong>
                          </li>
                        </ul>
                      </div>
                      <AlertBox tipo="warning" titulo="Quando envolver Frações">
                        Se a base for fração (ex: 1/4),{" "}
                        <strong>inverta a fração</strong> e mude o sinal do
                        expoente! Ex: (1/4) = 4⁻¹. Outra coisa: CESGRANRIO gosta
                        de colocar raízes nas equações. Lembre-se que √3 é o
                        mesmo que 3 elevado a 1/2.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizEquacoes}
              titulo="Quiz - Equações"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Aplicações: Crescimento e Decaimento"
          descricao="Juros compostos, populações e radioatividade."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Matemática do Tempo"
              description="Quando o 'x' é a quantidade de dias, meses ou anos."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O Modelo Exponencial"
              icone="📈"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula Geral",
                  icone: "🔬",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Quase todo problema de aplicação de função exponencial
                        segue esta lógica fundamental:
                      </p>
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center space-y-2">
                        <p className="text-xl font-mono font-bold text-amber-800 dark:text-amber-300">
                          N(t) = N₀ × a^t
                        </p>
                        <p className="text-xs">
                          <strong>N(t)</strong> = Quantidade Final
                          <br />
                          <strong>N₀</strong> = Quantidade Inicial (no tempo
                          zero)
                          <br />
                          <strong>a</strong> = Fator de Crescimento/Decaimento
                          <br />
                          <strong>t</strong> = Tempo percorrido
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Dica Ouro">
                        Na CESGRANRIO, N₀ é onde o gráfico cruza o eixo Y. Se
                        disser que "uma população dobrou em 3 anos", significa
                        que N(3) = 2 × N₀.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Juros e Crescimento Previsível",
                  icone: "💰",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Se a taxa de aumento é, digamos, de 20% ao ano, o{" "}
                        <strong>fator de crescimento (a)</strong> é 1,20 (ou
                        seja, 100% + 20% convertido pra decimal).
                        <br />A equação vira:{" "}
                        <code className="bg-muted px-1 rounded">
                          N(t) = N₀ × (1,20)ᵗ
                        </code>
                        .
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-2 bg-card border border-border p-4 rounded-lg">
                        <li>
                          <strong>Cresce 50% ao período:</strong> Fator é 1,50.
                          A curva acelera para cima.
                        </li>
                        <li>
                          <strong>
                            Cai pela metade (Meia-vida de radioatividade):
                          </strong>{" "}
                          Fator é 1/2. A curva desliza pra zero, mas{" "}
                          <em>nunca chega a ser negativa</em>.
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizAplicacoes}
              titulo="Quiz - Aplicações"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Inequações Exponenciais"
          descricao="Base > 1 mantém; 0 < base < 1 inverte."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Sinal do Desespero"
              description="Uma única regra que decide toda a questão."
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O Sentido da Desigualdade"
              icone="🔄"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Base Maior que 1. Exemplo: 2, 3, 5...",
                  icone: "🚀",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                        <p className="font-bold text-green-700 dark:text-green-400">
                          Mantém o sinal!
                        </p>
                        <p className="font-mono text-sm mt-2">2ˣ &gt; 2⁵</p>
                        <p className="font-mono font-bold mt-1 text-green-800 dark:text-green-300">
                          x &gt; 5
                        </p>
                      </div>
                      <p className="text-sm">
                        É lógico: Se a base é maior que 1, a função é crescente.
                        Quanto maior o expoente, maior o resultado. Então se 2ˣ
                        deve ser maior que 2⁵, é obrigação que x seja maior que
                        5.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo:
                    "Base Entre 0 e 1 (Fração Própria). Exemplo: 1/2, 0.3...",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                        <p className="font-bold text-red-700 dark:text-red-400">
                          INVERTE o sinal!
                        </p>
                        <p className="font-mono text-sm mt-2">(½)ˣ &gt; (½)³</p>
                        <p className="font-mono font-bold mt-1 text-red-800 dark:text-red-300">
                          x &lt; 3
                        </p>
                      </div>
                      <p className="text-sm">
                        Se eu tenho meio bolo (1/2), elevar ele ao quadrado dá
                        1/4 do bolo (menor). Elevar ao cubo dá 1/8 (menor
                        ainda).
                        <br />
                        Ou seja: Para o resultado ser MAIOR, o expoente tem que
                        ser MENOR! A função é <em>decrescente</em>.
                      </p>
                      <AlertBox tipo="warning" titulo="O Veneno Clássico">
                        Cuidado quando você tentar resolver igualando bases na
                        forma invertida! Se você transformou (1/2) em 2⁻¹, o
                        sinal negativo já corrige tudo automaticamente na hora
                        de resolver, então não precisa inverter a desigualdade
                        DE NOVO. Escolha UM dos caminhos para não errar!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizInequacoes}
              titulo="Quiz - Inequações"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final"
          descricao="Problemas mistos de exponenciais."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Exponenciais"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  ⚡
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  EXPONENCIAIS DOMINADAS!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Juros compostos e crescimento população nunca mais serão um
                  mistério.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
