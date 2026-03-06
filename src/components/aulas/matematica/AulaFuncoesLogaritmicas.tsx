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
  QUIZ_M2_PROPRIEDADES,
  QUIZ_M3_EQUACOES,
  QUIZ_M4_GRAFICOS,
  QUIZ_M5_FINAL,
} from "./data/funcoes-logaritmicas-quizzes";

export default function AulaFuncoesLogaritmicas({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 5));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_PROPRIEDADES, 5));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_EQUACOES, 5));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_GRAFICOS, 5));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));

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
    { id: "modulo-1", label: "Módulo 1", titulo: "O Conceito Absoluto" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Propriedades Operatórias" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Equações Logarítmicas" },
    {
      id: "modulo-4",
      label: "Módulo 4",
      titulo: "Gráficos e Condição de Existência",
    },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desafio Industrial" },
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
      {/* ════ MÓDULO 1 ════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="O Logaritmo"
          descricao="A ferramenta suprema inventada por John Napier para reduzir multiplicações cósmicas a simples adições."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Traduzindo o Alienígena"
              description="Esqueça a aversão à palavra 'Logaritmo'. Ele é apenas um expoente disfarçado."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O que é o Logaritmo?"
              icone="👽"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Pergunta Fundamental",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Quando você vê <strong>log₂ 8</strong>, a matemática
                        está apenas te fazendo uma pergunta de trás pra frente:
                        <em>
                          &quot;A qual expoente eu devo elevar o número
                          menorzinho (a base 2) para chegar no número maiorzinho
                          (logaritmando 8)?&quot;
                        </em>
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center shadow-inner">
                        <p className="text-xl font-bold font-mono mb-2 text-indigo-800 dark:text-indigo-300">
                          log_a (b) = c &nbsp; ⟺ &nbsp; aᶜ = b
                        </p>
                      </div>
                      <p className="text-sm">
                        Como 2³ = 8, a resposta de log₂ 8 é <strong>3</strong>.
                        Simples assim.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Bases Invisíveis e Notáveis",
                  icone: "👻",
                  conteudo: (
                    <div className="space-y-4">
                      <CardCarousel
                        cards={[
                          {
                            titulo: "O Log Comum (Base 10)",
                            descricao:
                              "Quando não houver base escrita (ex: log 100), a base é sempre 10. (Resposta: 2, pois 10² = 100)",
                            icone: "🔟",
                          },
                          {
                            titulo: "O Log Natural (ln)",
                            descricao:
                              "Quando você vir 'ln(x)', a base não é 10, é o número de Euler 'e' (≈2,71). Usado em física nuclear, juros contínuos e elétrica.",
                            icone: "🌿",
                          },
                        ]}
                      />
                      <AlertBox tipo="warning" titulo="A Teoria na Petrobras">
                        As variáveis industriais muitas vezes progridem mais do
                        que o esperado. O ganho de um amplificador ou uma
                        válvula usa a razão de 10 — decibéis (dB) e o Log Base
                        10 para mapear sons muito fracos até estrondos mortais
                        num mesmo gráfico.
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
              titulo="Quiz - Conceitos Base"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ════ MÓDULO 2 ════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Propriedades Operatórias"
          descricao="As manobras evasivas."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Transformando Contas Difíceis"
              description="A grande vantagem dos logaritmos é diminuir o 'level' da conta matemática."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="As 3 Regras Mestras"
              icone="📜"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Rebaixamento Operacional",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        O logaritmo consegue transformar uma MULTIPLICAÇÃO numa
                        simples SOMA, e uma DIVISÃO numa SUBTRAÇÃO.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm bg-card border border-border p-4 rounded-xl">
                        <li>
                          <strong>Produto vira Soma:</strong> log (A × B) = log
                          A + log B
                        </li>
                        <li>
                          <strong>Divisão vira Subtração:</strong> log (A ÷ B) =
                          log A - log B
                        </li>
                        <li>
                          <strong>Potência dá o Tombo:</strong> log (Aⁿ) = n ×
                          log A
                        </li>
                      </ul>
                      <AlertBox tipo="success" titulo="Exemplo Rápido de Tombo">
                        log 1000. Você sabe que log(10³) = 3 × log 10. Como log
                        10 é 1, a resposta é 3. A regra do tombo (n × log A) é a
                        técnica mais cobrada nos vestibulares e polícias/PETRO!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Mudança de Base",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        E se a calculadora (ou o problema) não usar a base dada?
                        Você força uma troca.
                        <br />A fórmula é{" "}
                        <strong>log_b(a) = log_c(a) / log_c(b)</strong> (Sendo c
                        a nova base que você quer).
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl text-center shadow-inner border border-emerald-500/20">
                        <p className="font-bold mb-2">
                          Se preciso calcular log₂ 5, mas só sei log de 10:
                        </p>
                        <p className="font-mono">Troco os dois pra base 10.</p>
                        <p className="font-mono text-emerald-800 dark:text-emerald-300 font-bold mt-2">
                          log₁₀ 5 / log₁₀ 2
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizM2}
              titulo="Quiz - Propriedades"
              icone="📐"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ════ MÓDULO 3 ════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Equações Logarítmicas"
          descricao="Retornando o alienígena para o formato humano."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Caçada ao 'X'"
              description="Quando o 'x' está preso dentro do parênteses do log."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Duas Técnicas Fatais"
              icone="⚔️"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1. O Coice Inicial (Exponenciar)",
                  icone: "🐴",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Se a equação é <code>log₃(x - 5) = 2</code>, você isola
                        o logaritmo primeiro. Depois você dá o
                        &quot;coice&quot;: a base corre para o outro lado e
                        levanta o número como expoente!
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl text-center font-mono font-bold text-amber-800 dark:text-amber-300 border border-amber-500/30">
                        <p>x - 5 = 3²</p>
                        <p>x - 5 = 9</p>
                        <p>x = 14</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "2. Compressão em Um Único Log",
                  icone: "🗜️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Se houver VÁRIOS logaritmos na equação, você não pode
                        dar o coice neles dispersos. Use a propriedade inversa
                        para &quot;absorver&quot; todos num log só.{" "}
                      </p>
                      <div className="p-3 bg-card border border-border rounded-xl">
                        <p className="font-bold text-sm">
                          Problema: <code>log(x) + log(2) = 1</code>
                        </p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>
                            Soma de bases iguais, vira produto dos internos:{" "}
                            <code>log(2x) = 1</code>
                          </li>
                          <li>
                            Dá o coice na base invisível (10):{" "}
                            <code>2x = 10¹</code>
                          </li>
                          <li>
                            <strong>x = 5</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizM3}
              titulo="Quiz - Equações"
              icone="🧩"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ════ MÓDULO 4 ════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Condição de Existência e Gráfico"
          descricao="Onde a CESGRANRIO reprova os desatentos."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Restrição Divina (Domínio)"
              description="A grande linha inquebrável da Matemática logarítmica."
              variant="violet"
              className="mb-6"
            />
            <AlertBox tipo="warning" titulo="Nunca Esqueça Essa Regra na Prova">
              O interior de um logaritmo <strong>NÃO PODE</strong> ser negativo.
              Não existe <code>log(-10)</code> nos números reais. O interior do
              logaritmo <strong>NÃO PODE</strong> ser zero. E a Base tem que ser{" "}
              <strong>Maior que zero e Diferente de 1</strong>.
              <br />
              <br />
              <strong>Pegadinha:</strong> Você resolve a equação e acha X = 5 e
              X = -2. O apressado marca a letra com (5 e -2). O esperto volta na
              equação original <code>log(x+1)</code> e vê se jogar -2 ali vai
              gerar <code>log(-1)</code>. Se gerar,{" "}
              <strong>X = -2 é raiz FALSA e é DESCARTADA</strong>.
            </AlertBox>

            <ContentAccordion
              titulo="O Formato Côncavo do Gráfico"
              icone="📉"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Escorregador Vertical",
                  icone: "🎢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        A função f(x) = log(x) é uma curva que surge lá de baixo
                        (do eixo Y negativo), bate no eixo x no ponto{" "}
                        <strong>(1, 0)</strong> e cresce muito, muito devagar a
                        partir daquele ponto.
                      </p>
                      <p className="text-sm">
                        O eixo Y atua como uma <strong>assíntota</strong>{" "}
                        vertical: o gráfico chega{" "}
                        <em>infinitamente perto do eixo Y</em> mas bater e
                        cruzar para a área do <code>X negativo</code> é
                        matematicamente proibido devido a Condição de
                        Existência.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizM4}
              titulo="Quiz - Gráficos e Imagem"
              icone="👀"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ════ MÓDULO 5 ════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="O Quizz de Guerra"
          descricao="Tudo de logaritmo misturado na veia da CESGRANRIO."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizM5}
              titulo="Desafio Logarítmico"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-800 to-cyan-900 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30">
                  🎯
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  DOMÍNIO DOS LOGARITMOS
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Acabamos de dizimar o bicho papão dos alunos de Exatas.
                  Ninguém mais cai na pegadinha da Raiz Falsa. Siga em frente
                  rumo à aprovação Petrobras!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
