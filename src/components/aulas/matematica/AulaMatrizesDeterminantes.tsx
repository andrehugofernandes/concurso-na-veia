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
  QUIZ_M1_CONCEITO_MATRIZES,
  QUIZ_M2_TIPOS_MATRIZES,
  QUIZ_M3_ADICAO_SUBTRACAO,
  QUIZ_M4_MULTIPLICACAO,
  QUIZ_M5_TRANSPOSTA_INVERSA,
  QUIZ_M6_DETERMINANTE_2X2,
  QUIZ_M7_DETERMINANTE_3X3,
  QUIZ_M8_COFATORES,
  QUIZ_M9_APLICACOES_PETROBRAS,
  QUIZ_M10_SIMULADO_CESGRANRIO,
} from "./data/matrizes-determinantes-quizzes";

export default function AulaMatrizesDeterminantes({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITO_MATRIZES, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_TIPOS_MATRIZES, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_ADICAO_SUBTRACAO, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_MULTIPLICACAO, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_TRANSPOSTA_INVERSA, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_DETERMINANTE_2X2, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_DETERMINANTE_3X3, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_COFATORES, 6));
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceito e Notação" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Tipos de Matrizes" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Adição e Subtração" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Multiplicação" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Transposta e Inversa" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Determinante 2×2" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Determinante 3×3" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Cofatores" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Petrobras" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado CESGRANRIO" },
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
      {/* MÓDULO 1: CONCEITO E NOTAÇÃO DE MATRIZES                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Conceito e Notação de Matrizes"
          descricao="Entenda o que é uma matriz, como ler sua dimensão e interpretar seus elementos — a base de toda álgebra linear aplicada à engenharia."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é uma Matriz?"
              description="Tabelas de números com identidade própria — a linguagem da engenharia industrial."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Definição, Dimensão e Notação"
              icone="📊"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Dimensão",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Uma <strong>matriz</strong> é uma tabela retangular de números organizados em{" "}
                        <strong>m linhas</strong> e <strong>n colunas</strong>. A dimensão é escrita como{" "}
                        <strong>m×n</strong> (lê-se &quot;m por n&quot;).
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="text-blue-400 font-mono text-sm text-center">
                          A = (aᵢⱼ)ₘₓₙ — onde i=linha (1 a m), j=coluna (1 a n)
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Na <strong>Petrobras</strong>, uma tabela de produção com 3 plataformas (linhas) e
                        4 turnos (colunas) forma uma matriz 3×4 com 12 células de dados.
                      </p>
                      <AlertBox tipo="info" titulo="Leitura do índice aᵢⱼ">
                        Sempre: <strong>linha primeiro, coluna depois</strong>. O elemento a₂₃ está na
                        2ª linha, 3ª coluna. Mnemônico: &quot;LC — Linha antes de Coluna&quot;.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplos Industriais",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Matrizes surgem naturalmente na indústria petrolífera:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Matriz de Produção 2×3</p>
                          <p className="text-sm font-mono">P-51: [3000  3100  2900]</p>
                          <p className="text-sm font-mono">P-55: [4200  4100  4300]</p>
                          <p className="text-xs text-muted-foreground mt-2">Linhas = plataformas, Colunas = meses</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500 mb-2">Matriz de Pressão 1×4</p>
                          <p className="text-sm font-mono">[120  118  122  119]</p>
                          <p className="text-xs text-muted-foreground mt-2">1 duto medido em 4 sensores → matriz linha</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Lei de Formação e Igualdade",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>lei de formação</strong> define cada elemento por uma fórmula. Ex:{" "}
                        aᵢⱼ = 2i + j → a₂₃ = 2·2+3 = 7.
                      </p>
                      <p>
                        Duas matrizes são <strong>iguais</strong> somente se têm a mesma dimensão{" "}
                        <strong>e</strong> todos os elementos correspondentes são iguais.
                      </p>
                      <AlertBox tipo="warning">
                        Uma matriz 2×3 <strong>NUNCA</strong> é igual a uma 3×2, mesmo que contenham
                        os mesmos 6 números — a dimensão muda tudo. Pegadinha #1 da CESGRANRIO.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-8">
            <QuizInterativo
              questoes={quizM1}
              titulo="Conceito e Notação de Matrizes"
              icone="📊"
              numero={1}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: TIPOS ESPECIAIS DE MATRIZES                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Tipos Especiais de Matrizes"
          descricao="Identidade, nula, diagonal, simétrica, triangular — cada tipo tem propriedades únicas exploradas pela banca examinadora."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Classificação das Matrizes Especiais"
              description="Reconheça cada tipo rapidamente — economia de tempo na prova."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Quadrada, Identidade e Nula"
              icone="🔢"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Matriz Quadrada e Identidade",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>Quadrada</strong>: m = n (mesma quantidade de linhas e colunas). A ordem é n.
                      </p>
                      <p>
                        <strong>Identidade (Iₙ)</strong>: diagonal principal = 1, resto = 0. É o elemento
                        neutro da multiplicação: A·I = I·A = A.
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-mono text-sm">I₂ = [[1,0],[0,1]]</p>
                        <p className="font-mono text-sm">I₃ = [[1,0,0],[0,1,0],[0,0,1]]</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Em sistemas de controle de plataformas, I representa &quot;nenhuma transformação&quot;.
                        Multiplicar a matriz de estado do sistema por I mantém tudo inalterado.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Diagonal, Triangular e Nula",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-1">Diagonal</p>
                          <p className="text-xs">Zeros fora da diagonal principal.</p>
                          <p className="font-mono text-xs mt-1">[[5,0],[0,7]]</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-1">Triangular Superior</p>
                          <p className="text-xs">Zeros abaixo da diagonal.</p>
                          <p className="font-mono text-xs mt-1">[[2,3],[0,5]]</p>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-400 mb-1">Nula</p>
                          <p className="text-xs">Todos os elementos = 0.</p>
                          <p className="font-mono text-xs mt-1">[[0,0],[0,0]]</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Simétrica e Antissimétrica",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>Simétrica</strong>: aᵢⱼ = aⱼᵢ para todo i,j → A = Aᵀ.
                      </p>
                      <p>
                        <strong>Antissimétrica</strong>: aᵢⱼ = −aⱼᵢ → diagonal principal = 0.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-mono text-sm">Simétrica: [[1,3],[3,7]] — note a₁₂=a₂₁=3</p>
                      </div>
                      <AlertBox tipo="warning">
                        Matrizes de rigidez estrutural (análise de plataformas offshore) são{" "}
                        <strong>sempre simétricas</strong>. A CESGRANRIO usa essa propriedade para
                        simplificar cálculos em enunciados de engenharia.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-2" className="mt-8">
            <QuizInterativo
              questoes={quizM2}
              titulo="Tipos Especiais de Matrizes"
              icone="🔢"
              numero={2}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: ADIÇÃO E SUBTRAÇÃO                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Adição e Subtração de Matrizes"
          descricao="Opere entre matrizes de mesma ordem e aplique multiplicação por escalar — operações fundamentais em análise de dados industriais."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Regras de Adição e Multiplicação Escalar"
              description="Elemento a elemento — simples, mas com pegadinhas de dimensão."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Somar e Subtrair Matrizes"
              icone="➕"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Condição e Processo de Adição",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Só é possível somar A + B se ambas têm a <strong>mesma dimensão m×n</strong>.
                        O resultado é (aᵢⱼ + bᵢⱼ) — soma elemento a elemento.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="font-mono text-sm">
                          [[1,2],[3,4]] + [[5,6],[7,8]] = [[6,8],[10,12]]
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação Petrobras">
                        Somar a matriz de produção de janeiro com a de fevereiro resulta na produção
                        acumulada — cada célula soma o total daquele produto naquela plataforma.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Multiplicação por Escalar",
                  icone: "✖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        k·A multiplica <strong>cada elemento</strong> por k. Não há restrição de dimensão.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Exemplo: k=3</p>
                          <p className="font-mono text-sm">3·[[2,4],[1,5]] = [[6,12],[3,15]]</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">Oposto (k=−1)</p>
                          <p className="font-mono text-sm">−A: troca o sinal de todos os elementos</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Propriedades e Pegadinhas",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Propriedades da adição de matrizes:</p>
                      <ul className="space-y-2 text-sm list-disc list-inside">
                        <li><strong>Comutativa</strong>: A + B = B + A ✓</li>
                        <li><strong>Associativa</strong>: (A+B)+C = A+(B+C) ✓</li>
                        <li><strong>Elemento neutro</strong>: A + 0 = A ✓</li>
                        <li><strong>Inverso aditivo</strong>: A + (−A) = 0 ✓</li>
                      </ul>
                      <AlertBox tipo="warning">
                        A condição &quot;colunas de A = linhas de B&quot; é para <strong>multiplicação</strong>,
                        não para soma! Para somar, a condição é <strong>mesma ordem m×n</strong>.
                        Confundir isso custa pontos na CESGRANRIO.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-8">
            <QuizInterativo
              questoes={quizM3}
              titulo="Adição e Subtração de Matrizes"
              icone="➕"
              numero={3}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: MULTIPLICAÇÃO DE MATRIZES                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Multiplicação de Matrizes"
          descricao="A operação mais poderosa — e mais cobrada. Entenda a condição de existência, o processo linha-coluna e por que A·B ≠ B·A."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Condição, Processo e Propriedades"
              description="O coração da álgebra matricial — domine e resolva 90% das questões."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Multiplicação de Matrizes: Passo a Passo"
              icone="✖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Condição de Existência e Dimensão",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A·B existe somente se: <strong>colunas(A) = linhas(B)</strong>.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-mono text-sm text-center">
                          A(m×p) · B(p×n) = C(m×n)
                        </p>
                        <p className="text-xs text-center text-muted-foreground mt-1">
                          As dimensões &quot;internas&quot; se cancelam, as &quot;externas&quot; formam o resultado
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Industrial">
                        Numa rede de dutos: A(4×3) = fluxo por seção × B(3×5) = capacidade por destino
                        → C(4×5) = distribuição total por fonte e destino.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo Elemento a Elemento",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Cada elemento cᵢⱼ = <strong>produto interno</strong> da linha i de A pela coluna j de B:
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 font-mono text-sm">
                        <p>cᵢⱼ = aᵢ₁·b₁ⱼ + aᵢ₂·b₂ⱼ + ... + aᵢₚ·bₚⱼ</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Exemplo: c₁₁</p>
                        <p className="text-sm font-mono">A=[[1,2],[3,4]], B=[[5,0],[1,2]]</p>
                        <p className="text-sm font-mono">c₁₁ = 1·5 + 2·1 = 7</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Não-Comutatividade e Propriedades",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>ATENÇÃO</strong>: A·B ≠ B·A em geral. A multiplicação de matrizes{" "}
                        <strong>não é comutativa</strong> — esta é a propriedade mais cobrada!
                      </p>
                      <ul className="space-y-1 text-sm list-disc list-inside">
                        <li>Associativa: (A·B)·C = A·(B·C) ✓</li>
                        <li>Distributiva: A·(B+C) = A·B + A·C ✓</li>
                        <li>Elemento neutro: A·I = I·A = A ✓</li>
                        <li>Comutativa: A·B = B·A? ✗ (em geral, NÃO)</li>
                      </ul>
                      <AlertBox tipo="warning">
                        Se a banca perguntar se A·B = B·A é sempre verdade, a resposta é{" "}
                        <strong>NÃO</strong>. Mesmo que A e B sejam quadradas de mesma ordem, o
                        produto em ordens diferentes geralmente dá resultados distintos.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4" className="mt-8">
            <QuizInterativo
              questoes={quizM4}
              titulo="Multiplicação de Matrizes"
              icone="✖️"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: TRANSPOSTA E INVERSA                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Matriz Transposta e Inversa"
          descricao="Duas operações essenciais: a transposta reorganiza linhas em colunas; a inversa &apos;desfaz&apos; a multiplicação — base para resolver sistemas matriciais."
          gradiente="bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Transposta: Linhas Viram Colunas"
              description="Operação simples com consequências profundas — e muito cobrada."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Transposta e Inversa: Definições e Aplicações"
              icone="🔄"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Matriz Transposta (Aᵀ)",
                  icone: "🔃",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Aᵀ é obtida trocando linhas por colunas: o elemento (i,j) de A vai para (j,i) de Aᵀ.
                        Se A é m×n, então Aᵀ é n×m.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 font-mono text-sm">
                        <p>A = [[1,2,3],[4,5,6]] (2×3)</p>
                        <p>Aᵀ = [[1,4],[2,5],[3,6]] (3×2)</p>
                      </div>
                      <p>
                        Propriedade: <strong>(Aᵀ)ᵀ = A</strong>. Transpor duas vezes recupera a original.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Matriz Inversa (A⁻¹)",
                  icone: "↩️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A⁻¹ existe somente se A é quadrada e <strong>det(A) ≠ 0</strong>.
                        Definida por: A·A⁻¹ = A⁻¹·A = I.
                      </p>
                      <p>Para matriz 2×2: </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 font-mono text-sm">
                        <p>Se A = [[a,b],[c,d]], então:</p>
                        <p>A⁻¹ = (1/det) · [[d,−b],[−c,a]]</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação em Sistemas AX = B">
                        Se A é invertível: X = A⁻¹·B. Esta é a solução matricial de sistemas lineares
                        — usada em calibração de sensores e análise de redes de dutos.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Condição de Invertibilidade",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Uma matriz quadrada A é <strong>invertível (não singular)</strong> ⟺ det(A) ≠ 0.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">det ≠ 0 → Invertível</p>
                          <p className="text-sm">Sistema AX=B tem solução única: X = A⁻¹B</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">det = 0 → Singular</p>
                          <p className="text-sm">Sistema impossível (SI) ou indeterminado (SII)</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning">
                        Não confunda <strong>transposta</strong> com <strong>inversa</strong>. Aᵀ sempre
                        existe; A⁻¹ só existe quando det≠0. Para matrizes ortogonais (como rotações),
                        coincide: Aᵀ = A⁻¹ — caso especial muito elegante.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-8">
            <QuizInterativo
              questoes={quizM5}
              titulo="Transposta e Inversa"
              icone="🔄"
              numero={5}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: DETERMINANTE DE ORDEM 2                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Determinante de Ordem 2"
          descricao="O número que revela tudo sobre uma matriz 2×2 — invertibilidade, sistemas lineares e a regra de Cramer. Domine em 5 minutos."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Cálculo e Propriedades do det 2×2"
              description="A fórmula mais simples, com as consequências mais profundas."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Determinante 2×2: Fórmula e Aplicações"
              icone="🔢"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula: ad − bc",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para A = [[a,b],[c,d]]:{" "}
                        <strong>det(A) = ad − bc</strong> (diagonal principal minus diagonal secundária).
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-mono text-sm">det([[5,3],[2,4]]) = 5·4 − 3·2 = 20 − 6 = 14</p>
                      </div>
                      <AlertBox tipo="info" titulo="Interpretação Geométrica">
                        O |det(A)| é a área do paralelogramo formado pelas colunas (ou linhas) de A.
                        Se det=0, as colunas são paralelas → paralelogramo degenerado → sistema singular.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Propriedades Fundamentais do Determinante",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <ul className="space-y-2 text-sm">
                        <li><strong>Linhas iguais</strong>: det = 0</li>
                        <li><strong>Linha/coluna nula</strong>: det = 0</li>
                        <li><strong>det(Aᵀ) = det(A)</strong>: transposta não muda o det</li>
                        <li><strong>det(k·A) = kⁿ·det(A)</strong>: escalar entra elevado à ordem n</li>
                        <li><strong>det(A·B) = det(A)·det(B)</strong>: det do produto = produto dos det</li>
                      </ul>
                      <AlertBox tipo="warning">
                        Para det(2A) com n=2: det(2A) = 2²·det(A) = 4·det(A). A armadilha clássica
                        é calcular 2·det(A). Lembre: o fator k multiplica <strong>cada linha</strong>,
                        e há n linhas!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Regra de Cramer e Sistemas",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para o sistema AX = B com det(A) ≠ 0, a Regra de Cramer resolve:{" "}
                        <strong>xᵢ = det(Aᵢ) / det(A)</strong>, onde Aᵢ substitui a coluna i de A por B.
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-sm">
                        <p>Sistema: 2x+y=10, 3x+2y=16</p>
                        <p>det(A)=2·2−1·3=1</p>
                        <p>x = det([[10,1],[16,2]])/1 = (20−16) = 4</p>
                        <p>y = det([[2,10],[3,16]])/1 = (32−30) = 2</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-8">
            <QuizInterativo
              questoes={quizM6}
              titulo="Determinante de Ordem 2"
              icone="🔢"
              numero={6}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: DETERMINANTE 3×3 (REGRA DE SARRUS)                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Determinante 3×3 — Regra de Sarrus"
          descricao="O método visual das 6 diagonais — 3 positivas e 3 negativas. Aprenda o passo a passo e resolva qualquer determinante 3×3 em menos de 2 minutos."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Regra de Sarrus: Passo a Passo"
              description="6 diagonais, 3 com sinal + e 3 com sinal −."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Sarrus: Método Visual de Diagonais"
              icone="🔺"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Método das Diagonais",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para calcular det de [[a,b,c],[d,e,f],[g,h,i]]:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Replique as 2 primeiras colunas à direita da matriz</li>
                        <li>Some os produtos das 3 diagonais ↘ (positivos)</li>
                        <li>Subtraia os produtos das 3 diagonais ↗ (negativos)</li>
                      </ol>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 font-mono text-sm">
                        <p className="text-cyan-400">Positivos (+): aei, bfg, cdh</p>
                        <p className="text-rose-400">Negativos (−): ceg, afh, bdi</p>
                        <p className="mt-2 font-bold">det = (aei+bfg+cdh) − (ceg+afh+bdi)</p>
                      </div>
                      <AlertBox tipo="warning">
                        Sarrus funciona <strong>SOMENTE para 3×3</strong>. Nunca aplique a matrizes 4×4
                        ou maiores — a banca examinadora adora criar armadilhas com esse erro!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Completo com Sarrus",
                  icone: "✏️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Calcule det([[2,1,3],[0,4,1],[5,2,0]]):
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-sm font-mono">
                        <p className="text-emerald-400">Positivos: 2·4·0 + 1·1·5 + 3·0·2 = 0+5+0 = 5</p>
                        <p className="text-rose-400">Negativos: 3·4·5 + 2·1·0 + 1·0·2 = 60+0+0 = 60</p>
                        <p className="mt-2 font-bold">det = 5 − 60 = −55</p>
                      </div>
                      <AlertBox tipo="info" titulo="Dica de Verificação">
                        Sempre verifique: se há linha/coluna nula → det=0. Se duas linhas são iguais
                        ou proporcionais → det=0. Use essas propriedades para confirmar o resultado.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Propriedades de Linhas e Colunas",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Propriedades que economizam tempo na prova:</p>
                      <ul className="space-y-2 text-sm list-disc list-inside">
                        <li><strong>Troca de 2 linhas</strong>: muda o sinal do det</li>
                        <li><strong>Linha proporcional</strong>: det = 0</li>
                        <li><strong>Linha nula</strong>: det = 0</li>
                        <li><strong>Triangular</strong>: det = produto da diagonal</li>
                        <li><strong>det(A·B) = det(A)·det(B)</strong></li>
                      </ul>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm">
                        <p className="font-bold text-emerald-400">Triangular → det rápido!</p>
                        <p>det([[3,1,2],[0,5,4],[0,0,6]]) = 3·5·6 = 90</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-8">
            <QuizInterativo
              questoes={quizM7}
              titulo="Determinante 3×3 — Regra de Sarrus"
              icone="🔺"
              numero={7}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: COFATORES E DESENVOLVIMENTO DE LAPLACE                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Cofatores e Desenvolvimento de Laplace"
          descricao="O método mais poderoso para determinantes de qualquer ordem: expanda por linhas ou colunas com mais zeros e reduza o trabalho ao mínimo."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Cofatores, Menores e Expansão de Laplace"
              description="A generalização que funciona para qualquer ordem n×n."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Cofatores e Expansão de Laplace"
              icone="🔬"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Menor Complementar e Cofator",
                  icone: "✂️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>Menor Mᵢⱼ</strong>: determinante da submatriz obtida ao eliminar a linha i e a coluna j.
                      </p>
                      <p>
                        <strong>Cofator Cᵢⱼ</strong>: Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="text-sm font-bold">Padrão de sinais (tabuleiro de xadrez):</p>
                        <p className="font-mono text-sm mt-1">+ − + / − + − / + − +</p>
                      </div>
                      <AlertBox tipo="info" titulo="Regra Rápida de Sinais">
                        Se i+j é <strong>par</strong> → sinal positivo (+).
                        Se i+j é <strong>ímpar</strong> → sinal negativo (−).
                        C₁₁: 1+1=2 (par) → +. C₁₂: 1+2=3 (ímpar) → −.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Expansão de Laplace: Como Usar",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        det(A) = Σ aᵢⱼ · Cᵢⱼ (somando ao longo de qualquer linha ou coluna).
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-sm">
                        <p className="font-bold">Expandindo pela 1ª linha:</p>
                        <p className="font-mono mt-1">det(A) = a₁₁·C₁₁ + a₁₂·C₁₂ + a₁₃·C₁₃</p>
                      </div>
                      <p className="text-sm">
                        <strong>Estratégia de prova</strong>: escolha a linha/coluna com mais zeros
                        — cada zero elimina um cofator a calcular!
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Matriz Adjunta e Inversa via Cofatores",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>Adjunta</strong>: adj(A) = transposta da matriz de cofatores.
                      </p>
                      <p>
                        <strong>Inversa</strong>: A⁻¹ = (1/det(A)) · adj(A)
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm font-mono">
                        <p>Para A = [[a,b],[c,d]]:</p>
                        <p>adj(A) = [[d,−b],[−c,a]]</p>
                        <p>A⁻¹ = (1/(ad−bc)) · [[d,−b],[−c,a]]</p>
                      </div>
                      <AlertBox tipo="warning">
                        A Regra de Cramer usa cofatores: xᵢ = det(Aᵢ)/det(A). É elegante para sistemas
                        2×2 e 3×3, mas computacionalmente cara para sistemas grandes industriais.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-8" className="mt-8">
            <QuizInterativo
              questoes={quizM8}
              titulo="Cofatores e Laplace"
              icone="🔬"
              numero={8}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: APLICAÇÕES PETROBRAS                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aplicações na Petrobras e Indústria"
          descricao="Sistemas de equações, transformações de coordenadas, redes de dutos e criptografia — matrizes e determinantes resolvendo problemas reais da indústria petrolífera."
          gradiente="bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Sistemas Lineares e Transformações Industriais"
              description="Álgebra matricial aplicada ao dia a dia da engenharia de petróleo."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Aplicações Reais de Matrizes na Petrobras"
              icone="🏭"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Sistemas de Equações: AX = B",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Todo sistema linear pode ser escrito na forma <strong>AX = B</strong>, onde A é a
                        matriz dos coeficientes, X o vetor de incógnitas e B o vetor dos termos independentes.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm font-mono">
                        <p>2x + y = 180 (pressão do duto 1)</p>
                        <p>x + 3y = 120 (vazão do duto 2)</p>
                        <p>→ A = [[2,1],[1,3]], B = [[180],[120]]</p>
                        <p>→ det(A) = 5 ≠ 0 → solução única</p>
                      </div>
                      <AlertBox tipo="info" titulo="Verificação Rápida">
                        Antes de resolver: calcule det(A). Se det=0, o sistema não tem solução única
                        e não adianta tentar resolver por Cramer. Economize tempo na prova!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Transformações de Coordenadas e ROVs",
                  icone: "🤖",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Robôs submarinos (ROVs) da Petrobras usam <strong>matrizes de rotação</strong> para
                        converter coordenadas entre sistemas de referência.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-sm font-mono">
                        <p>R(90°) = [[0,−1],[1,0]]</p>
                        <p>Posição (3,4) após rotação:</p>
                        <p>R·[[3],[4]] = [[−4],[3]]</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        det(R) = 1 sempre — rotações preservam áreas e distâncias. A Petrobras usa isso
                        em sistemas de navegação inercial de ROVs a 3000m de profundidade.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Redes de Dutos e Balanço de Massa",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A análise de redes de transporte de petróleo usa <strong>matrizes de incidência</strong>:
                        cada linha é um nó (plataforma), cada coluna é um arco (duto).
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-sm">
                        <p>Matriz 4×6 → 4 plataformas, 6 conexões</p>
                        <p>Elemento +1: saída do nó / −1: entrada / 0: sem conexão</p>
                        <p>Balanço: A·fluxo = produção_líquida</p>
                      </div>
                      <AlertBox tipo="warning">
                        Quando det=0 na matriz do sistema de dutos, há dependência linear — um duto
                        é redundante ou o modelo é inconsistente. A equipe de engenharia precisa
                        revisar a topologia da rede. Contexto real de operação da Petrobras!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-9" className="mt-8">
            <QuizInterativo
              questoes={quizM9}
              titulo="Aplicações Petrobras"
              icone="🏭"
              numero={9}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 10: SIMULADO CESGRANRIO                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado CESGRANRIO — Nível Mestre"
          descricao="Questões no padrão exato da banca examinadora da Petrobras. Teste tudo que aprendeu sobre matrizes e determinantes em condições reais de prova."
          gradiente="bg-gradient-to-br from-blue-700 via-indigo-700 to-cyan-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Estratégica — Os 10 Pontos-Chave"
              description="O que a CESGRANRIO mais cobra em Matrizes e Determinantes."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Checklist Final — Pontos Quentes da CESGRANRIO"
              icone="🏆"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Os 5 Tópicos Mais Cobrados",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-4">
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li><strong>Dimensão do produto A·B</strong>: (m×p)·(p×n) = (m×n)</li>
                        <li><strong>Condição: A·B ≠ B·A</strong> — não comutativa</li>
                        <li><strong>det([[a,b],[c,d]]) = ad−bc</strong> — fórmula básica</li>
                        <li><strong>det=0 ↔ linhas/colunas LD</strong> → sistema singular</li>
                        <li><strong>Sarrus apenas para 3×3</strong> — nunca para 4×4</li>
                      </ol>
                      <AlertBox tipo="info" titulo="Estratégia de Prova">
                        Se uma questão envolve det, calcule primeiro e verifique se é zero. Isso resolve
                        imediatamente questões sobre invertibilidade e sistemas. Economize 2 minutos!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmulas Prontas para Levar à Prova",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-400 mb-2">Inversão 2×2</p>
                          <p className="font-mono text-xs">A⁻¹ = (1/det)·[[d,−b],[−c,a]]</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">Cramer</p>
                          <p className="font-mono text-xs">xᵢ = det(Aᵢ)/det(A)</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">Cofator</p>
                          <p className="font-mono text-xs">Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">det Produto</p>
                          <p className="font-mono text-xs">det(A·B) = det(A)·det(B)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pegadinhas Clássicas da CESGRANRIO",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <ul className="space-y-2 text-sm list-disc list-inside">
                        <li>det(2A) = 4·det(A) para 2×2 (não 2·det!)</li>
                        <li>Sarrus: apenas para 3×3, NUNCA para 4×4</li>
                        <li>A·B ≠ B·A — não comutativa!</li>
                        <li>Linhas proporcionais → det=0 (não só linhas iguais)</li>
                        <li>A transposta sempre existe; a inversa só se det≠0</li>
                        <li>Matriz 2×3 ≠ 3×2 mesmo com os mesmos números</li>
                      </ul>
                      <AlertBox tipo="danger">
                        O erro mais caro: aplicar Sarrus em matrizes 4×4. A banca dá as 6 diagonais
                        como resposta para pegar quem usa Sarrus indevidamente. Para 4×4, use Laplace
                        (cofatores)!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-10" className="mt-8">
            <QuizInterativo
              questoes={quizM10}
              titulo="Simulado CESGRANRIO"
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
