"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_BHASKARA,
  QUIZ_M3_AVANCADAS,
  QUIZ_M4_PROBLEMAS,
  QUIZ_M5_FINAL,
} from "./data/equacoes-2grau-quizzes";

// Quizzes importados de ./data/equacoes-2grau-quizzes.ts
// (36 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaEquacoes2Grau({
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

  const [quizBhaskara] = useState(() =>
    getRandomQuestions(QUIZ_M1_CONCEITOS, 6),
  );
  const [quizSomaProd] = useState(() =>
    getRandomQuestions(QUIZ_M2_BHASKARA, 6),
  );
  const [quizProblemas] = useState(() =>
    getRandomQuestions(QUIZ_M3_AVANCADAS, 5),
  );
  const [quizParabola] = useState(() =>
    getRandomQuestions(QUIZ_M4_PROBLEMAS, 5),
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
      const pct = Math.round(((idx + 1) / 5) * 100);
      onUpdateProgress?.(pct);
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Bhaskara" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Soma e Produto" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Problemas" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Parábola" },
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
          titulo="Fórmula de Bhaskara"
          descricao="A fórmula mais famosa da Matemática: x = (-b ± √Δ) / 2a."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Anatomia da Equação"
              description="ax² + bx + c = 0. Identificar quem é quem é metade da questão."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O Discriminante (Delta) e Báskara"
              icone="📐"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Identificando a, b e c",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Antes de aplicar qualquer fórmula, você precisar saber
                        quem acompanha quem. Cuidado com o sinal!
                      </p>
                      <div className="p-3 bg-card border border-border rounded-lg text-sm text-center">
                        <p className="font-mono text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                          -x² + 5x - 6 = 0
                        </p>
                        <p>
                          <strong>a = -1</strong> (acompanha o x²)
                        </p>
                        <p>
                          <strong>b = 5</strong> (acompanha o x duplo)
                        </p>
                        <p>
                          <strong>c = -6</strong> (o termo independente, o cara
                          solitário)
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha">
                        Se a equação for incompleta (ex: x² - 9 = 0), o termo
                        que falta vale ZERO. Nesse caso, b = 0.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "A Trindade do Delta (Δ)",
                  icone: "🔮",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center shadow-inner">
                        <p className="text-xl font-bold font-mono text-indigo-800 dark:text-indigo-300">
                          Δ = b² - 4ac
                        </p>
                      </div>
                      <p className="text-sm">
                        O Delta (Discriminante) "diz o futuro" da equação antes
                        mesmo de você calcular as raízes:
                      </p>
                      <CardCarousel
                        cards={[
                          {
                            titulo: "Δ > 0 (Positivo)",
                            descricao:
                              "A equação corta o eixo X DUAS vezes. Duas raízes REAIS e DIFERENTES.",
                            icone: "✌️",
                          },
                          {
                            titulo: "Δ = 0",
                            descricao:
                              "A equação apenas TOCA o eixo X num único ponto. Duas raízes REAIS e IGUAIS.",
                            icone: "1️⃣",
                          },
                          {
                            titulo: "Δ < 0 (Negativo)",
                            descricao:
                              "A parábola 'flutua'. NÃO TEM raiz real (pois não existe raiz quadrada de número negativo nos reais). Pare a conta aqui!",
                            icone: "❌",
                          },
                        ]}
                      />
                    </div>
                  ),
                },
                {
                  titulo: "Fórmula de Bhaskara",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Com o Delta calculado, substituímos na fórmula final
                        para achar o "x linha" e "x duas linhas":
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center shadow-inner">
                        <p className="text-xl font-bold font-mono text-blue-800 dark:text-blue-300">
                          x = (-b ± √Δ) / 2a
                        </p>
                      </div>
                      <p className="text-sm italic">
                        Calculamos primeiro o caminho com o <strong>+√Δ</strong>{" "}
                        (x₁), depois o caminho com o <strong>-√Δ</strong> (x₂).
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizBhaskara}
              titulo="Quiz - Bhaskara"
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
          titulo="Relações de Girard (Soma e Produto)"
          descricao="Atalho poderoso para encontrar raízes sem Bhaskara."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Atalho Mental"
              description="Resolva em segundos o que a maioria leva minutos."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Método Soma e Produto"
              icone="🧠"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Regra (Girard)",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        É possível descobrir a raiz só de olhar para a equação
                        (especialmente quando <strong>a = 1</strong>). As raízes
                        ocultas têm uma relação direta com o <em>b</em> e o{" "}
                        <em>c</em>:
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center shadow-inner">
                          <p className="text-xs font-bold mb-1 uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                            Soma
                          </p>
                          <p className="text-lg font-bold font-mono text-emerald-800 dark:text-emerald-300">
                            x₁ + x₂ = -b/a
                          </p>
                        </div>
                        <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center shadow-inner">
                          <p className="text-xs font-bold mb-1 uppercase tracking-wider text-teal-800 dark:text-teal-300">
                            Produto
                          </p>
                          <p className="text-lg font-bold font-mono text-teal-800 dark:text-teal-300">
                            x₁ × x₂ = c/a
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Macete: Comece pelo Fim",
                  icone: "🕵️",
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="success" titulo="Dica Ouro CESGRANRIO">
                        Sempre comece pensando pelo{" "}
                        <strong>PRODUTO (multiplicação)</strong>, pois existem
                        menos combinações de números inteiros que multiplicam
                        para dar um certo valor do que números que somam.
                      </AlertBox>
                      <div className="bg-card p-4 rounded-xl border border-border text-sm">
                        <p className="font-bold mb-2">
                          Exemplo Prático: x² - 7x + 10 = 0
                        </p>
                        <ul className="space-y-2 list-disc pl-5">
                          <li>
                            O valor de <strong>a</strong> é 1.
                          </li>
                          <li>
                            <strong>Produto:</strong> c/a = 10/1 = 10.{" "}
                            <em>Que números multiplicados dão 10?</em> (1 e 10)
                            ou (2 e 5).
                          </li>
                          <li>
                            <strong>Soma:</strong> -b/a = -(-7)/1 = 7.{" "}
                            <em>
                              Desses pares que achei no produto, qual par soma
                              7?
                            </em>
                          </li>
                          <li>
                            Óbvio: <strong>2 e 5</strong>. As raízes são 2 e 5!
                            Sem Bhaskara, resolvido em 5 segundos.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizSomaProd}
              titulo="Quiz - Soma e Produto"
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
          titulo="Problemas do 2º Grau"
          descricao="Áreas, lucros e projéteis."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Tradução Física das Raízes"
              description="Quando Bhaskara encontra o mundo real."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como a CESGRANRIO Cobra"
              icone="🎯"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Questões Envolvendo Áreas",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        É clássico: O problema dá a área de um terreno (ex:
                        retangular) e diz que o comprimento é "3 metros maior
                        que a largura".
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm bg-card p-4 rounded-lg border border-border">
                        <li>
                          <strong>Largura:</strong> x
                        </li>
                        <li>
                          <strong>Comprimento:</strong> x + 3
                        </li>
                        <li>
                          <strong>Área (Base × Altura):</strong> x(x + 3) = 40
                        </li>
                        <li>
                          <strong>Equação:</strong> x² + 3x - 40 = 0
                        </li>
                      </ul>
                      <AlertBox
                        tipo="warning"
                        titulo="O Descarte da Raiz Negativa"
                      >
                        Ao resolver, as raízes serão 5 e -8. Como{" "}
                        <strong>não existe</strong> parede de "-8 metros", você{" "}
                        <strong>DESCARTA</strong> a raiz negativa nos problemas
                        de Geometria e Tempo. O x vale 5!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "O Ponto de Retorno (Raízes Iguais a Zero)",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Em questões de movimento (ex: lançar uma pedra,
                        temperatura durante o dia), a função será algo como{" "}
                        <code className="bg-amber-500/20 px-1 rounded">
                          h(t) = -5t² + 20t
                        </code>
                        .
                      </p>
                      <p className="text-sm">
                        Quando a banca pergunta:{" "}
                        <em>"Quando a pedra atinge o chão?"</em>, ela está
                        pedindo onde a altura (y) é ZERO. Basta igualar a
                        equação a zero e achar as raízes (os tempos onde a pedra
                        está no nível do chão)!
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizProblemas}
              titulo="Quiz - Problemas"
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
          titulo="O Gráfico: A Parábola"
          descricao="Concavidade, vértice e interseções."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Geometria do 2º Grau"
              description="A parábola e a busca pelo Máximo ou Mínimo."
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O Vértice da Parábola"
              icone="📈"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Concavidade: O Sinal de 'a'",
                  icone: "↕️",
                  conteudo: (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                        <p className="font-bold text-green-700 dark:text-green-400">
                          a &gt; 0 (Positivo)
                        </p>
                        <p className="font-bold text-lg mb-1">
                          Côncava para CIMA ∪
                        </p>
                        <p className="text-sm text-green-800 dark:text-green-300">
                          Tem um Ponto de <strong>MÍNIMO</strong> (fundo do
                          poço). Ex: Custo mínimo de produção.
                        </p>
                      </div>
                      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                        <p className="font-bold text-red-700 dark:text-red-400">
                          a &lt; 0 (Negativo)
                        </p>
                        <p className="font-bold text-lg mb-1">
                          Côncava para BAIXO ∩
                        </p>
                        <p className="text-sm text-red-800 dark:text-red-300">
                          Tem um Ponto de <strong>MÁXIMO</strong> (topo do
                          morro). Ex: Lucro máximo, Altura máxima.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmulas do Vértice (Xv e Yv)",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Quando Usar Qual?">
                        <strong>Xv (O QUANDO):</strong> Diz <em>quando</em>{" "}
                        ocorreu/quais peças geraram o limite. Ex: "Quantas
                        portas vender para dar lucro máximo?"
                        <br />
                        <strong>Yv (O QUANTO):</strong> Diz <em>qual é</em> o
                        valor limite em si. Ex: "Qual foi o lucro máximo em
                        reais?"
                      </AlertBox>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                          <p className="font-bold text-sm text-violet-800 dark:text-violet-300">
                            X do Vértice (Eixo horizontal)
                          </p>
                          <p className="text-xl font-mono mt-1 font-bold">
                            Xv = -b / 2a
                          </p>
                        </div>
                        <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg">
                          <p className="font-bold text-sm text-fuchsia-800 dark:text-fuchsia-300">
                            Y do Vértice (Eixo vertical)
                          </p>
                          <p className="text-xl font-mono mt-1 font-bold">
                            Yv = -Δ / 4a
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizParabola}
              titulo="Quiz - Parábola"
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
          descricao="Problemas integradores de toda a matéria."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Equações de 2º Grau"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  📐
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  BHASKARA DOMINADO!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Equações de 2º grau são um dos temas mais cobrados. Excelente
                  trabalho!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
