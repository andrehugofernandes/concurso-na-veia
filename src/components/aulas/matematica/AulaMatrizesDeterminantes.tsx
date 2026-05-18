import { getAllModuleVariants } from "@/lib/moduleColors";
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

const mv = [undefined, ...getAllModuleVariants()];

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

  const [quizM1] = useState(() =>
    getRandomQuestions(QUIZ_M1_CONCEITO_MATRIZES, 6),
  );
  const [quizM2] = useState(() =>
    getRandomQuestions(QUIZ_M2_TIPOS_MATRIZES, 6),
  );
  const [quizM3] = useState(() =>
    getRandomQuestions(QUIZ_M3_ADICAO_SUBTRACAO, 6),
  );
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_MULTIPLICACAO, 6));
  const [quizM5] = useState(() =>
    getRandomQuestions(QUIZ_M5_TRANSPOSTA_INVERSA, 6),
  );
  const [quizM6] = useState(() =>
    getRandomQuestions(QUIZ_M6_DETERMINANTE_2X2, 6),
  );
  const [quizM7] = useState(() =>
    getRandomQuestions(QUIZ_M7_DETERMINANTE_3X3, 6),
  );
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_COFATORES, 6));
  const [quizM9] = useState(() =>
    getRandomQuestions(QUIZ_M9_APLICACOES_PETROBRAS, 6),
  );
  const [quizM10] = useState(() =>
    getRandomQuestions(QUIZ_M10_SIMULADO_CESGRANRIO, 6),
  );

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

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
        <ModuleBanner numero={1}
          titulo="Conceito e Notação de Matrizes"
          descricao="Entenda o que é uma matriz, como ler sua dimensão e interpretar seus elementos — a base de toda álgebra linear aplicada à engenharia."
           variant={mv[1]}/>
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
                        Uma <strong>matriz</strong> é uma tabela retangular de
                        números organizados em <strong>m linhas</strong> e{" "}
                        <strong>n colunas</strong>. A dimensão é escrita como{" "}
                        <strong>m×n</strong> (lê-se &quot;m por n&quot;).
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="text-blue-400 font-mono text-sm text-center">
                          A = (aᵢⱼ)ₘₓₙ — onde i=linha (1 a m), j=coluna (1 a n)
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Na <strong>Petrobras</strong>, uma tabela de produção
                        com 3 plataformas (linhas) e 4 turnos (colunas) forma
                        uma matriz 3×4 com 12 células de dados.
                      </p>
                      <AlertBox tipo="info" titulo="Leitura do índice aᵢⱼ">
                        Sempre: <strong>linha primeiro, coluna depois</strong>.
                        O elemento a₂₃ está na 2ª linha, 3ª coluna. Mnemônico:
                        &quot;LC — Linha antes de Coluna&quot;.
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
                          <p className="text-xs font-bold text-emerald-500 mb-2">
                            Matriz de Produção 2×3
                          </p>
                          <p className="text-sm font-mono">
                            P-51: [3000 3100 2900]
                          </p>
                          <p className="text-sm font-mono">
                            P-55: [4200 4100 4300]
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Linhas = plataformas, Colunas = meses
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500 mb-2">
                            Matriz de Pressão 1×4
                          </p>
                          <p className="text-sm font-mono">[120 118 122 119]</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            1 duto medido em 4 sensores → matriz linha
                          </p>
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
                        A <strong>lei de formação</strong> define cada elemento
                        por uma fórmula. Ex: aᵢⱼ = 2i + j → a₂₃ = 2·2+3 = 7.
                      </p>
                      <p>
                        Duas matrizes são <strong>iguais</strong> somente se têm
                        a mesma dimensão <strong>e</strong> todos os elementos
                        correspondentes são iguais.
                      </p>
                      <AlertBox tipo="warning" titulo="Dica de Dimensão">
                        Uma matriz 2×3 <strong>NUNCA</strong> é igual a uma 3×2,
                        mesmo que contenham os mesmos 6 números — a dimensão
                        muda tudo. Pegadinha #1 da CESGRANRIO.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo de Elementos pela Lei",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para construir uma matriz com lei de formação aᵢⱼ = 2i +
                        j (dimensão 3×2):
                      </p>
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                        <p className="text-sm font-mono text-center mb-3">
                          Matriz A = [[5,6], [7,8], [9,10]]
                        </p>
                        <ul className="text-sm space-y-1">
                          <li>
                            • a₁₁ = 2(1) + 1 = 3... (erro) → a₁₁ = 2·1+1 = 3 ❌
                            exemplo corrigido: 5
                          </li>
                          <li>• a₁₂ = 2·1 + 2 = 4 ❌ → Usar a₁₁ = 2·1+1 = 3</li>
                          <li>• a₂₁ = 2·2 + 1 = 5 ✓</li>
                          <li>• a₂₂ = 2·2 + 2 = 6 ✓</li>
                          <li>• a₃₁ = 2·3 + 1 = 7 ✓</li>
                          <li>• a₃₂ = 2·3 + 2 = 8 ✓</li>
                        </ul>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Pegadinha: confundir aᵢⱼ (índice) com o valor numérico.
                        Sempre substitua i e j pelos números!
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Classificação por Dimensão",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="font-semibold text-sm">
                        Nomes especiais conforme dimensão:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 text-sm">
                          <p className="font-bold text-blue-600">
                            Matriz Linha (1×n)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Ex: [4 -1 7] → 1 linha, 3 colunas
                          </p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20 text-sm">
                          <p className="font-bold text-emerald-600">
                            Matriz Coluna (m×1)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Ex: [[2],[5],[8]] → 3 linhas, 1 coluna
                          </p>
                        </div>
                        <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20 text-sm">
                          <p className="font-bold text-purple-600">
                            Matriz Quadrada (n×n)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Linhas = colunas → tem diagonal
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/20 text-sm">
                          <p className="font-bold text-amber-600">
                            Matriz Retangular (m≠n)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Mais comum nos dados reais
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Diagonal Principal e Secundária",
                  icone: "↗️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Apenas matrizes quadradas têm diagonais com propriedades
                        especiais:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-600 mb-2">
                            Diagonal Principal
                          </p>
                          <p className="text-xs font-mono">
                            a₁₁, a₂₂, a₃₃, ... (indices iguais i=j)
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Traço = soma: tr(A) = a₁₁+a₂₂+...+aₙₙ
                          </p>
                        </div>
                        <div className="p-3 bg-rose-500/5 rounded-lg border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-600 mb-2">
                            Diagonal Secundária
                          </p>
                          <p className="text-xs font-mono">
                            a₁ₙ, a₂,ₙ₋₁, ... (vai de canto a canto)
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Usada em Sarrus (3×3)
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 text-xs">
                        <p className="font-mono text-center">
                          [[1,2,3],[4,5,6],[7,8,9]]
                        </p>
                        <p className="text-center mt-1">
                          Principal: 1, 5, 9 → tr = 15
                        </p>
                        <p className="text-center">Secundária: 3, 5, 7</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Ordem vs Dimensão (Nomenclatura)",
                  icone: "🏷️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Atenção à linguagem correta:</strong>
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-600">
                            Dimensão ou Ordem?
                          </p>
                          <p className="text-muted-foreground">
                            Dimensão = m×n (geral). Ordem = n (apenas para
                            quadradas)
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold text-emerald-600">Exemplo</p>
                          <p className="text-muted-foreground">
                            Matrix 3×3 → dimensão é 3×3, ordem é 3
                          </p>
                          <p className="text-muted-foreground">
                            Matrix 2×5 → dimensão é 2×5, ordem não se aplica
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="indigo"
              video={{
                videoId: "HgKYwTKiHc0",
                title: "Introdução às Matrizes: Conceitos Fundamentais",
                duration: "15:22",
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Matriz m×n com aᵢⱼ",
                    type: "Definição",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "Dimensões e índices",
                    type: "Estrutura",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Igualdade de matrizes",
                    type: "Propriedade",
                    placeholderColor: "bg-purple-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Sempre leia: LINHA ANTES DE COLUNA"
                    </p>
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">aᵢⱼ: i = linha, j = coluna</p>
                      <p className="text-xs text-muted-foreground">
                        Mnemônico: LC = Linha Coluna
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Matriz 2×3 NUNCA é igual a 3×2!
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Ritmo das Matrizes (Conceito)",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Conceito e Notação"
              icone="📊"
              numero={3}
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
        <ModuleBanner numero={2}
          titulo="Tipos Especiais de Matrizes"
          descricao="Identidade, nula, diagonal, simétrica, triangular — cada tipo tem propriedades únicas exploradas pela banca examinadora."
           variant={mv[2]}/>
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
                        <strong>Quadrada</strong>: m = n (mesma quantidade de
                        linhas e colunas). A ordem é n.
                      </p>
                      <p>
                        <strong>Identidade (Iₙ)</strong>: diagonal principal =
                        1, resto = 0. É o elemento neutro da multiplicação: A·I
                        = I·A = A.
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="font-mono text-sm">I₂ = [[1,0],[0,1]]</p>
                        <p className="font-mono text-sm">
                          I₃ = [[1,0,0],[0,1,0],[0,0,1]]
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Em sistemas de controle de plataformas, I representa
                        &quot;nenhuma transformação&quot;. Multiplicar a matriz
                        de estado do sistema por I mantém tudo inalterado.
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
                          <p className="text-xs font-bold text-blue-400 mb-1">
                            Diagonal
                          </p>
                          <p className="text-xs">
                            Zeros fora da diagonal principal.
                          </p>
                          <p className="font-mono text-xs mt-1">
                            [[5,0],[0,7]]
                          </p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-1">
                            Triangular Superior
                          </p>
                          <p className="text-xs">Zeros abaixo da diagonal.</p>
                          <p className="font-mono text-xs mt-1">
                            [[2,3],[0,5]]
                          </p>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-400 mb-1">
                            Nula
                          </p>
                          <p className="text-xs">Todos os elementos = 0.</p>
                          <p className="font-mono text-xs mt-1">
                            [[0,0],[0,0]]
                          </p>
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
                        <strong>Simétrica</strong>: aᵢⱼ = aⱼᵢ para todo i,j → A
                        = Aᵀ.
                      </p>
                      <p>
                        <strong>Antissimétrica</strong>: aᵢⱼ = −aⱼᵢ → diagonal
                        principal = 0.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-mono text-sm">
                          Simétrica: [[1,3],[3,7]] — note a₁₂=a₂₁=3
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Propriedade Estrutural">
                        Matrizes de rigidez estrutural (análise de plataformas
                        offshore) são <strong>sempre simétricas</strong>. A
                        CESGRANRIO usa essa propriedade para simplificar
                        cálculos em enunciados de engenharia.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Propriedades Algébricas",
                  icone: "✨",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="font-semibold text-sm">
                        Propriedades imediatas:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          <strong>Diagonal:</strong> det(A) = a₁₁ · a₂₂ · ... ·
                          aₙₙ (produto diagonal)
                        </li>
                        <li>
                          <strong>Triangular:</strong> det também é produto dos
                          elementos diagonais
                        </li>
                        <li>
                          <strong>Nula:</strong> det(0) = 0, não tem inversa
                        </li>
                        <li>
                          <strong>Identidade:</strong> det(I) = 1, é sua própria
                          inversa (I⁻¹ = I)
                        </li>
                        <li>
                          <strong>Simétrica:</strong> autovalores são reais
                          (propriedade espectral)
                        </li>
                      </ul>
                      <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                        <p className="text-xs">
                          <strong>Dica:</strong> Se a questão menciona "matriz
                          simétrica" e pede determinante, a resposta
                          provavelmente é um valor real específico.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Teste de Identificação",
                  icone: "🎲",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Dada a matriz M = [[2,1,0],[1,5,0],[0,0,3]],
                        identifique:
                      </p>
                      <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20 space-y-2 text-sm">
                        <p>✓ É quadrada (3×3)</p>
                        <p>✓ NÃO é diagonal (tem 1 fora da diagonal)</p>
                        <p>✓ É simétrica (a₁₂ = a₂₁ = 1)</p>
                        <p>
                          ✓ det(M) = 2·(5·3 − 0) − 1·(1·3 − 0) + 0 = 30 − 3 = 27
                          ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Operações com Matrizes Especiais",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">
                        Como se comportam em operações?
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold">
                            I (Identidade) + D (Diagonal)
                          </p>
                          <p className="text-muted-foreground">
                            I + D = Diagonal com 1+d₁₁, 1+d₂₂, ... na diagonal
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold">
                            D (Diagonal) × D (Diagonal)
                          </p>
                          <p className="text-muted-foreground">
                            Resultado: diagonal com d₁₁·e₁₁, d₂₂·e₂₂, ...
                            (comutativa!)
                          </p>
                        </div>
                        <div className="p-2 bg-indigo-500/5 rounded border border-indigo-500/20">
                          <p className="font-bold">0 (Nula) × qualquer coisa</p>
                          <p className="text-muted-foreground">
                            Sempre = 0 (absorvente)
                          </p>
                        </div>
                        <div className="p-2 bg-purple-500/5 rounded border border-purple-500/20">
                          <p className="font-bold">Triangular × Triangular</p>
                          <p className="text-muted-foreground">
                            Resultado: triangular (com mesma direção)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Matriz Ortogonal (Bonus)",
                  icone: "⭐",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Caso especial importante:</strong> Matriz
                        Ortogonal
                      </p>
                      <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20 text-xs space-y-2">
                        <p className="font-bold text-cyan-600">Definição:</p>
                        <p className="text-muted-foreground">
                          A·Aᵀ = I ⟹ Aᵀ = A⁻¹
                        </p>
                        <p className="text-muted-foreground font-semibold">
                          det(A) = ±1 (sempre!)
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong>Exemplos:</strong> Matrizes de rotação,
                        reflexão. Conservam comprimentos e ângulos — geometria
                        pura!
                      </p>
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
                videoId: "ZjxCqCrHT48",
                title: "Matrizes Especiais: Diagonal, Nula, Identidade",
                duration: "12:15",
              }}
              resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Matriz Identidade (I)",
                    type: "Definição",
                    placeholderColor: "bg-emerald-500/20",
                  },
                  {
                    title: "Matriz Diagonal",
                    type: "Estrutura",
                    placeholderColor: "bg-green-500/20",
                  },
                  {
                    title: "Matriz Nula",
                    type: "Propriedade",
                    placeholderColor: "bg-teal-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Matriz Identidade (I) é o 1 das matrizes"
                    </p>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">A × I = A</p>
                      <p className="text-xs text-muted-foreground">
                        Neutro da multiplicação!
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Identidade 3×3 tem 1s na diagonal, 0 fora dela
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                titulo: "Matrizes Especiais",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Tipos de Matrizes"
              icone="🔢"
              numero={3}
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
        <ModuleBanner numero={3}
          titulo="Adição e Subtração de Matrizes"
          descricao="Opere entre matrizes de mesma ordem e aplique multiplicação por escalar — operações fundamentais em análise de dados industriais."
           variant={mv[3]}/>
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
                        Só é possível somar A + B se ambas têm a{" "}
                        <strong>mesma dimensão m×n</strong>. O resultado é (aᵢⱼ
                        + bᵢⱼ) — soma elemento a elemento.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="font-mono text-sm">
                          [[1,2],[3,4]] + [[5,6],[7,8]] = [[6,8],[10,12]]
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação Petrobras">
                        Somar a matriz de produção de janeiro com a de fevereiro
                        resulta na produção acumulada — cada célula soma o total
                        daquele produto naquela plataforma.
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
                        k·A multiplica <strong>cada elemento</strong> por k. Não
                        há restrição de dimensão.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">
                            Exemplo: k=3
                          </p>
                          <p className="font-mono text-sm">
                            3·[[2,4],[1,5]] = [[6,12],[3,15]]
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">
                            Oposto (k=−1)
                          </p>
                          <p className="font-mono text-sm">
                            −A: troca o sinal de todos os elementos
                          </p>
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
                        <li>
                          <strong>Comutativa</strong>: A + B = B + A ✓
                        </li>
                        <li>
                          <strong>Associativa</strong>: (A+B)+C = A+(B+C) ✓
                        </li>
                        <li>
                          <strong>Elemento neutro</strong>: A + 0 = A ✓
                        </li>
                        <li>
                          <strong>Inverso aditivo</strong>: A + (−A) = 0 ✓
                        </li>
                      </ul>
                      <AlertBox tipo="warning" titulo="Soma vs Multiplicação">
                        A condição &quot;colunas de A = linhas de B&quot; é para{" "}
                        <strong>multiplicação</strong>, não para soma! Para
                        somar, a condição é <strong>mesma ordem m×n</strong>.
                        Confundir isso custa pontos na CESGRANRIO.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Combinações Lineares",
                  icone: "🔀",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Combinar adição + multiplicação escalar:</p>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-sm font-semibold mb-2">
                          Exemplo: 2A − 3B + C
                        </p>
                        <p className="text-xs">
                          Se A = [[1,2],[3,4]], B = [[5,6],[7,8]], C =
                          [[0,1],[1,0]]:
                        </p>
                        <p className="text-xs font-mono mt-2">
                          2·[[1,2],[3,4]] − 3·[[5,6],[7,8]] + [[0,1],[1,0]]
                        </p>
                        <p className="text-xs font-mono">
                          = [[2,4],[6,8]] − [[15,18],[21,24]] + [[0,1],[1,0]]
                        </p>
                        <p className="text-xs font-mono">
                          = [[-13,-13],[-14,-16]]
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Sempre faça escalar primeiro, depois adição/subtração.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Problemas Contextualizados",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Cenário Petrobras:</strong> Produção de 3
                        plataformas em 2 meses
                      </p>
                      <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20 space-y-2 text-xs">
                        <p>
                          <strong>Janeiro:</strong> P₁=[1000,1100],
                          P₂=[2000,2100], P₃=[1500,1600]
                        </p>
                        <p>
                          <strong>Fevereiro:</strong> P₁=[1050,1120],
                          P₂=[2050,2150], P₃=[1550,1650]
                        </p>
                        <p className="font-semibold text-cyan-600">
                          Aumento total = Fev − Jan (subtração posição a
                          posição)
                        </p>
                        <p>
                          Resultado: [50,20], [50,50], [50,50] (incrementos por
                          produto/plataforma)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Diferença de Matrizes e Interpretação",
                  icone: "➖",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        A − B = A + (−B) = soma com a oposta de B
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-600">Significado</p>
                          <p className="text-muted-foreground">
                            Diferença entre estados: final − inicial
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold text-emerald-600">Exemplo</p>
                          <p className="text-muted-foreground">
                            Fevereiro − Janeiro = variação
                          </p>
                        </div>
                      </div>
                      <div className="p-2 bg-indigo-500/5 rounded border border-indigo-500/20 text-xs">
                        <p className="font-bold text-indigo-600">
                          Na prova: A−B = A + (−1)·B
                        </p>
                        <p className="text-muted-foreground">
                          Se A − B é pedida, distribua o negativo em B e some!
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Multiplicação por Escalar Negativo",
                  icone: "❌",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">
                        Casos especiais importantes:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-rose-500/5 rounded border border-rose-500/20">
                          <p className="font-bold text-rose-600">
                            −A (negativo da matriz)
                          </p>
                          <p className="text-muted-foreground">
                            Inverte o sinal de cada elemento. A + (−A) = 0
                            (nula)
                          </p>
                        </div>
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-600">
                            −2A (escalar negativo)
                          </p>
                          <p className="text-muted-foreground">
                            Multiplica cada elemento por −2
                          </p>
                        </div>
                      </div>
                      <div className="p-2 bg-amber-500/5 rounded border border-amber-500/20 text-xs">
                        <p className="font-mono text-center">
                          −[[1,−2],[3,0]] = [[-1,2],[−3,0]]
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="cyan"
              video={{
                videoId: "3v8FqU29m_c",
                title: "Operações com Matrizes: Adição, Subtração e Escalar",
                duration: "18:45",
              }}
              resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Ordem de compatibilidade m×n",
                    type: "Requisito",
                    placeholderColor: "bg-cyan-500/20",
                  },
                  {
                    title: "A + B = (aᵢⱼ + bᵢⱼ)",
                    type: "Operação",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Propriedades comutativa e associativa",
                    type: "Álgebra",
                    placeholderColor: "bg-indigo-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Mesma ordem m×n é obrigatório!"
                    </p>
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">Matriz 2×3 + 3×2 = IMPOSSÍVEL</p>
                      <p className="text-xs text-muted-foreground">
                        Ordem deve coincidir totalmente
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Soma elemento por elemento, posição a posição
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                titulo: "Adição de Matrizes",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Adição e Subtração"
              icone="➕"
              numero={3}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: MULTIPLICAÇÃO DE MATRIZES                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner numero={4}
          titulo="Multiplicação de Matrizes"
          descricao="A operação mais poderosa — e mais cobrada. Entenda a condição de existência, o processo linha-coluna e por que A·B ≠ B·A."
           variant={mv[4]}/>
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
                        A·B existe somente se:{" "}
                        <strong>colunas(A) = linhas(B)</strong>.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-mono text-sm text-center">
                          A(m×p) · B(p×n) = C(m×n)
                        </p>
                        <p className="text-xs text-center text-muted-foreground mt-1">
                          As dimensões &quot;internas&quot; se cancelam, as
                          &quot;externas&quot; formam o resultado
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Industrial">
                        Numa rede de dutos: A(4×3) = fluxo por seção × B(3×5) =
                        capacidade por destino → C(4×5) = distribuição total por
                        fonte e destino.
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
                        Cada elemento cᵢⱼ = <strong>produto interno</strong> da
                        linha i de A pela coluna j de B:
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 font-mono text-sm">
                        <p>cᵢⱼ = aᵢ₁·b₁ⱼ + aᵢ₂·b₂ⱼ + ... + aᵢₚ·bₚⱼ</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">
                          Exemplo: c₁₁
                        </p>
                        <p className="text-sm font-mono">
                          A=[[1,2],[3,4]], B=[[5,0],[1,2]]
                        </p>
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
                        <strong>ATENÇÃO</strong>: A·B ≠ B·A em geral. A
                        multiplicação de matrizes{" "}
                        <strong>não é comutativa</strong> — esta é a propriedade
                        mais cobrada!
                      </p>
                      <ul className="space-y-1 text-sm list-disc list-inside">
                        <li>Associativa: (A·B)·C = A·(B·C) ✓</li>
                        <li>Distributiva: A·(B+C) = A·B + A·C ✓</li>
                        <li>Elemento neutro: A·I = I·A = A ✓</li>
                        <li>Comutativa: A·B = B·A? ✗ (em geral, NÃO)</li>
                      </ul>
                      <AlertBox tipo="warning" titulo="Não Comutatividade">
                        Se a banca perguntar se A·B = B·A é sempre verdade, a
                        resposta é <strong>NÃO</strong>. Mesmo que A e B sejam
                        quadradas de mesma ordem, o produto em ordens diferentes
                        geralmente dá resultados distintos.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Completo de Multiplicação",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Calcule A·B com A = [[1,2,3],[4,5,6]] (2×3) e B =
                        [[7,8],[9,10],[11,12]] (3×2):
                      </p>
                      <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20 space-y-2 text-xs font-mono">
                        <p>
                          <strong>
                            Resultado: C = [[58,64],[139,154]] (2×2)
                          </strong>
                        </p>
                        <p>• c₁₁ = 1·7 + 2·9 + 3·11 = 7 + 18 + 33 = 58 ✓</p>
                        <p>• c₁₂ = 1·8 + 2·10 + 3·12 = 8 + 20 + 36 = 64 ✓</p>
                        <p>• c₂₁ = 4·7 + 5·9 + 6·11 = 28 + 45 + 66 = 139 ✓</p>
                        <p>• c₂₂ = 4·8 + 5·10 + 6·12 = 32 + 50 + 72 = 154 ✓</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Dica: organize em linha os números de A e em coluna os
                        de B para não errar.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Potência e Identidade",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>A² = A·A</strong> só faz sentido se A é
                        quadrada.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 text-xs">
                          <p className="font-bold text-blue-600">A² = A·A</p>
                          <p className="font-mono">Se A = [[1,2],[3,4]]</p>
                          <p className="font-mono">A² = [[7,10],[15,22]]</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20 text-xs">
                          <p className="font-bold text-emerald-600">
                            Identidade I
                          </p>
                          <p className="text-xs">A·I = A e I·A = A</p>
                          <p className="text-xs text-muted-foreground">
                            (I é neutra)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Erro Comum: A·B vs Elemento a Elemento",
                  icone: "❌",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>ATENÇÃO:</strong> Multiplicação de matrizes NÃO
                        é elemento a elemento!
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-red-500/5 rounded border border-red-500/20">
                          <p className="font-bold text-red-600">
                            ❌ ERRADO: [[1,2],[3,4]] · [[5,6],[7,8]] =
                            [[5,12],[21,32]]
                          </p>
                          <p className="text-muted-foreground">
                            Isso seria elemento a elemento (não é multiplicação
                            de matriz!)
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold text-emerald-600">
                            ✓ CERTO: linha × coluna
                          </p>
                          <p className="text-muted-foreground">
                            [[1,2],[3,4]] · [[5,6],[7,8]] = [[19,22],[43,50]]
                          </p>
                        </div>
                      </div>
                      <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20 text-xs">
                        <p className="font-bold">Dica:</p>
                        <p className="text-muted-foreground">
                          Se a questão disser "multiplicação elemento a
                          elemento", trata-se de operação Hadamard (⊙), não
                          multiplicação padrão!
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="blue"
              video={{
                videoId: "v2D1zVqAowc",
                title: "Multiplicação de Matrizes: O Guia Definitivo",
                duration: "22:10",
              }}
              resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Compatibilidade: (m×n)×(n×p)=(m×p)",
                    type: "Regra",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Linha × Coluna",
                    type: "Método",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "NÃO é comutativa: AB≠BA",
                    type: "Propriedade",
                    placeholderColor: "bg-cyan-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Multiplicação: LINHA da 1ª × COLUNA da 2ª"
                    </p>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">
                        Soma de produtos: a₁b₁ + a₂b₂ + a₃b₃
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cada elemento é uma multiplica multiplicação cruzada!
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ordem IMPORTA! A×B ≠ B×A
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                titulo: "Multiplicação de Matrizes",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Multiplicação"
              icone="✖️"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: TRANSPOSTA E INVERSA                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner numero={5}
          titulo="Matriz Transposta e Inversa"
          descricao="Duas operações essenciais: a transposta reorganiza linhas em colunas; a inversa 'desfaz' a multiplicação — base para resolver sistemas matriciais."
           variant={mv[5]}/>
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
                        Aᵀ é obtida trocando linhas por colunas: o elemento
                        (i,j) de A vai para (j,i) de Aᵀ. Se A é m×n, então Aᵀ é
                        n×m.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 font-mono text-sm">
                        <p>A = [[1,2,3],[4,5,6]] (2×3)</p>
                        <p>Aᵀ = [[1,4],[2,5],[3,6]] (3×2)</p>
                      </div>
                      <p>
                        Propriedade: <strong>(Aᵀ)ᵀ = A</strong>. Transpor duas
                        vezes recupera a original.
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
                        A⁻¹ existe somente se A é quadrada e{" "}
                        <strong>det(A) ≠ 0</strong>. Definida por: A·A⁻¹ = A⁻¹·A
                        = I.
                      </p>
                      <p>Para matriz 2×2: </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 font-mono text-sm">
                        <p>Se A = [[a,b],[c,d]], então:</p>
                        <p>A⁻¹ = (1/det) · [[d,−b],[−c,a]]</p>
                      </div>
                      <AlertBox
                        tipo="info"
                        titulo="Aplicação em Sistemas AX = B"
                      >
                        Se A é invertível: X = A⁻¹·B. Esta é a solução matricial
                        de sistemas lineares — usada em calibração de sensores e
                        análise de redes de dutos.
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
                        Uma matriz quadrada A é{" "}
                        <strong>invertível (não singular)</strong> ⟺ det(A) ≠ 0.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">
                            det ≠ 0 → Invertível
                          </p>
                          <p className="text-sm">
                            Sistema AX=B tem solução única: X = A⁻¹B
                          </p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">
                            det = 0 → Singular
                          </p>
                          <p className="text-sm">
                            Sistema impossível (SI) ou indeterminado (SII)
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Cuidado com a Inversa">
                        Não confunda <strong>transposta</strong> com{" "}
                        <strong>inversa</strong>. Aᵀ sempre existe; A⁻¹ só
                        existe quando det≠0. Para matrizes ortogonais (como
                        rotações), coincide: Aᵀ = A⁻¹ — caso especial muito
                        elegante.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo de Inversa 2×2",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Fórmula para matriz 2×2:</strong>
                      </p>
                      <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/20 font-mono text-xs space-y-1">
                        <p>A = [[a,b],[c,d]]</p>
                        <p>det(A) = ad − bc</p>
                        <p>A⁻¹ = (1/(ad−bc)) · [[d,−b],[−c,a]]</p>
                      </div>
                      <p className="text-xs">
                        <strong>Exemplo:</strong> A = [[1,2],[3,4]]
                      </p>
                      <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 text-xs space-y-1">
                        <p>• det = 1·4 − 2·3 = −2</p>
                        <p>
                          • A⁻¹ = (1/−2) · [[4,−2],[−3,1]] = [[-2,1],[1.5,−0.5]]
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Teste de Invertibilidade",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Verifique quais matrizes são invertíveis:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold">M₁ = [[2,5],[1,3]]</p>
                          <p>det = 2·3 − 5·1 = 6 − 5 = 1 ≠ 0 ✓ INVERTÍVEL</p>
                        </div>
                        <div className="p-2 bg-rose-500/5 rounded border border-rose-500/20">
                          <p className="font-bold">M₂ = [[2,4],[1,2]]</p>
                          <p>
                            det = 2·2 − 4·1 = 4 − 4 = 0 ✗ SINGULAR (não inverte)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Propriedades da Transposta",
                  icone: "🔁",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">
                        Propriedades que facilitam cálculos:
                      </p>
                      <ul className="space-y-2 text-xs list-disc list-inside">
                        <li>
                          <strong>(Aᵀ)ᵀ = A</strong> — transpor duas vezes
                          recupera original
                        </li>
                        <li>
                          <strong>det(Aᵀ) = det(A)</strong> — determinante não
                          muda
                        </li>
                        <li>
                          <strong>(A+B)ᵀ = Aᵀ + Bᵀ</strong> — transposta
                          distribui na soma
                        </li>
                        <li>
                          <strong>(A·B)ᵀ = Bᵀ·Aᵀ</strong> — inverte ordem na
                          multiplicação!
                        </li>
                        <li>
                          <strong>(A⁻¹)ᵀ = (Aᵀ)⁻¹</strong> — comuta com inversa
                        </li>
                      </ul>
                      <div className="p-2 bg-amber-500/5 rounded border border-amber-500/20 text-xs mt-2">
                        <p className="font-bold text-amber-600">
                          Pegadinha CESGRANRIO:
                        </p>
                        <p className="text-muted-foreground">
                          (A·B)ᵀ = Bᵀ·Aᵀ, NÃO Aᵀ·Bᵀ! A ordem se inverte!
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="amber"
              video={{
                videoId: "mD7_Q_LhE6Y",
                title: "Matriz Inversa e Transposta",
                duration: "20:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Transposta: linhas ↔ colunas",
                    type: "Definição",
                    placeholderColor: "bg-amber-500/20",
                  },
                  {
                    title: "Inversa: A×A⁻¹ = I",
                    type: "Propriedade",
                    placeholderColor: "bg-orange-500/20",
                  },
                  {
                    title: "Só existe se det(A) ≠ 0",
                    type: "Condição",
                    placeholderColor: "bg-yellow-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Transposta é fácil: rode 90°. Inversa precisa de
                      determinante!"
                    </p>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">(Aᵀ)ᵀ = A</p>
                      <p className="text-sm">A×A⁻¹ = I (Neutro!)</p>
                      <p className="text-xs text-muted-foreground">
                        Só inverte se det ≠ 0
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      CESGRANRIO adora pegadinha de matriz singular!
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                titulo: "Transposta e Inversa",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Transposta e Inversa"
              icone="🔄"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: DETERMINANTE DE ORDEM 2                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner numero={6}
          titulo="Determinante de Ordem 2"
          descricao="O número que revela tudo sobre uma matriz 2×2 — invertibilidade, sistemas lineares e a regra de Cramer. Domine em 5 minutos."
           variant={mv[6]}/>
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
                        <strong>det(A) = ad − bc</strong> (diagonal principal
                        minus diagonal secundária).
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-mono text-sm">
                          det([[5,3],[2,4]]) = 5·4 − 3·2 = 20 − 6 = 14
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Interpretação Geométrica">
                        O |det(A)| é a área do paralelogramo formado pelas
                        colunas (ou linhas) de A. Se det=0, as colunas são
                        paralelas → paralelogramo degenerado → sistema singular.
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
                        <li>
                          <strong>Linhas iguais</strong>: det = 0
                        </li>
                        <li>
                          <strong>Linha/coluna nula</strong>: det = 0
                        </li>
                        <li>
                          <strong>det(Aᵀ) = det(A)</strong>: transposta não muda
                          o det
                        </li>
                        <li>
                          <strong>det(k·A) = kⁿ·det(A)</strong>: escalar entra
                          elevado à ordem n
                        </li>
                        <li>
                          <strong>det(A·B) = det(A)·det(B)</strong>: det do
                          produto = produto dos det
                        </li>
                      </ul>
                      <AlertBox tipo="warning" titulo="Cálculo de Determinante">
                        Para det(2A) com n=2: det(2A) = 2²·det(A) = 4·det(A). A
                        armadilha clássica é calcular 2·det(A). Lembre: o fator
                        k multiplica <strong>cada linha</strong>, e há n linhas!
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
                        Para o sistema AX = B com det(A) ≠ 0, a Regra de Cramer
                        resolve: <strong>xᵢ = det(Aᵢ) / det(A)</strong>, onde Aᵢ
                        substitui a coluna i de A por B.
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
                {
                  titulo: "Casos Especiais e det(kA)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Cálculo de det(kA):</strong> A matriz de ordem n
                        = 2
                      </p>
                      <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20 text-xs space-y-1">
                        <p>
                          det(kA) = k² · det(A) [porque k multiplica as 2
                          linhas]
                        </p>
                        <p>
                          Ex: se det(A) = 5, então det(3A) = 9 · 5 = 45 (não
                          15!)
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold">det(Aᵀ)</p>
                          <p>= det(A)</p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold">det(A²)</p>
                          <p>= [det(A)]²</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação: Análise de Sistemas",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xs">
                        <strong>Contexto Petrobras:</strong> Equilíbrio de
                        pressão em 2 dutos
                      </p>
                      <div className="p-2 bg-cyan-500/5 rounded border border-cyan-500/20 text-xs space-y-1">
                        <p>2P₁ + P₂ = 120 (atm)</p>
                        <p>P₁ + 3P₂ = 180 (atm)</p>
                        <p className="font-mono text-xs">
                          det = 2·3 − 1·1 = 5 ≠ 0 ✓ Solução única
                        </p>
                        <p>P₁ = (120·3 − 180·1)/5 = 180/5 = 36 atm</p>
                        <p>P₂ = (2·180 − 120·1)/5 = 240/5 = 48 atm</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Interpretação Geométrica do Determinante",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>O que det(A) representa?</strong>
                      </p>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <strong>|det(A)|:</strong> Área do paralelogramo
                          formado pelas linhas (ou colunas) de A
                        </li>
                        <li>
                          <strong>Sinal positivo:</strong> As colunas formam
                          orientação positiva (anti-horária)
                        </li>
                        <li>
                          <strong>Sinal negativo:</strong> Orientação negativa
                          (horária)
                        </li>
                        <li>
                          <strong>det=0:</strong> Linhas/colunas colineares →
                          área zero → matriz singular
                        </li>
                      </ul>
                      <div className="p-2 bg-indigo-500/5 rounded border border-indigo-500/20 text-xs">
                        <p className="font-bold text-indigo-600">
                          Exemplo: A = [[2,0],[0,3]]
                        </p>
                        <p className="text-muted-foreground">
                          det = 2·3 − 0·0 = 6
                        </p>
                        <p className="text-muted-foreground">
                          Área = 6 (retângulo 2×3)
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="rose"
              video={{
                videoId: "6hL5Mp9Rq2W",
                title: "Determinante 2×2: Fórmula Simples de Cramer",
                duration: "9:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 6",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "det = ad - bc (diagonal menos anti-diagonal)",
                    type: "Fórmula",
                    placeholderColor: "bg-rose-500/20",
                  },
                  {
                    title: "Escalar que resume propriedades",
                    type: "Significado",
                    placeholderColor: "bg-pink-500/20",
                  },
                  {
                    title: "det = 0 → matriz singular",
                    type: "Critério",
                    placeholderColor: "bg-red-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Det 2×2: diagonal principal MENOS anti-diagonal"
                    </p>
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">det = a₁₁×a₂₂ - a₁₂×a₂₁</p>
                      <p className="text-xs text-muted-foreground">
                        Desenhe X: uma bolinha, outra cruza (-)!
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Se det=0, matriz é singular (não invertível)
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                titulo: "Determinante 2×2",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Determinante 2×2"
              icone="🔢"
              numero={3}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: DETERMINANTE 3×3 (REGRA DE SARRUS)                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner numero={7}
          titulo="Determinante 3×3 — Regra de Sarrus"
          descricao="O método visual das 6 diagonais — 3 positivas e 3 negativas. Aprenda o passo a passo e resolva qualquer determinante 3×3 em menos de 2 minutos."
           variant={mv[7]}/>
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
                      <p>Para calcular det de [[a,b,c],[d,e,f],[g,h,i]]:</p>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>
                          Replique as 2 primeiras colunas à direita da matriz
                        </li>
                        <li>Some os produtos das 3 diagonais ↘ (positivos)</li>
                        <li>
                          Subtraia os produtos das 3 diagonais ↗ (negativos)
                        </li>
                      </ol>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 font-mono text-sm">
                        <p className="text-cyan-400">
                          Positivos (+): aei, bfg, cdh
                        </p>
                        <p className="text-rose-400">
                          Negativos (−): ceg, afh, bdi
                        </p>
                        <p className="mt-2 font-bold">
                          det = (aei+bfg+cdh) − (ceg+afh+bdi)
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Diagonais de Sarrus">
                        Sarrus funciona <strong>SOMENTE para 3×3</strong>. Nunca
                        aplique a matrizes 4×4 ou maiores — a banca examinadora
                        adora criar armadilhas com esse erro!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Completo com Sarrus",
                  icone: "✏️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Calcule det([[2,1,3],[0,4,1],[5,2,0]]):</p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-sm font-mono">
                        <p className="text-emerald-400">
                          Positivos: 2·4·0 + 1·1·5 + 3·0·2 = 0+5+0 = 5
                        </p>
                        <p className="text-rose-400">
                          Negativos: 3·4·5 + 2·1·0 + 1·0·2 = 60+0+0 = 60
                        </p>
                        <p className="mt-2 font-bold">det = 5 − 60 = −55</p>
                      </div>
                      <AlertBox tipo="info" titulo="Dica de Verificação">
                        Sempre verifique: se há linha/coluna nula → det=0. Se
                        duas linhas são iguais ou proporcionais → det=0. Use
                        essas propriedades para confirmar o resultado.
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
                        <li>
                          <strong>Troca de 2 linhas</strong>: muda o sinal do
                          det
                        </li>
                        <li>
                          <strong>Linha proporcional</strong>: det = 0
                        </li>
                        <li>
                          <strong>Linha nula</strong>: det = 0
                        </li>
                        <li>
                          <strong>Triangular</strong>: det = produto da diagonal
                        </li>
                        <li>
                          <strong>det(A·B) = det(A)·det(B)</strong>
                        </li>
                      </ul>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm">
                        <p className="font-bold text-emerald-400">
                          Triangular → det rápido!
                        </p>
                        <p>det([[3,1,2],[0,5,4],[0,0,6]]) = 3·5·6 = 90</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilhas Clássicas",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Pegadinhas CESGRANRIO em Sarrus:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>
                          Aplicar Sarrus em 4×4 ou maiores (SÓ vale para 3×3!)
                        </li>
                        <li>
                          Esquecer de multiplicar a anti-diagonal por (−1)
                        </li>
                        <li>Confundir Sarrus com Laplace</li>
                      </ul>
                      <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20 text-xs">
                        <p className="font-bold text-red-600">
                          ❌ Erro: aplicar Sarrus em
                          [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
                        </p>
                        <p className="mt-1">
                          ✓ Certo: usar Laplace (cofatores) ou escalonamento
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Quando Usar Cada Método",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
                          <p className="font-bold text-cyan-600">2×2</p>
                          <p>Fórmula: ad − bc (30 seg)</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-600">3×3</p>
                          <p>Sarrus (1 min) ou Laplace</p>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20">
                          <p className="font-bold text-indigo-600">4×4</p>
                          <p>Laplace ou escalonamento</p>
                        </div>
                        <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                          <p className="font-bold text-purple-600">5×5+</p>
                          <p>Escalonamento (mais rápido)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Efeito de Operações Elementares no det",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">
                        Como o determinante muda com operações em linhas:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold">❶ Trocar 2 linhas</p>
                          <p className="text-muted-foreground">
                            det' = −det (inverte sinal)
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold">❷ Multiplicar linha por k</p>
                          <p className="text-muted-foreground">
                            det' = k·det (escala pelo fator)
                          </p>
                        </div>
                        <div className="p-2 bg-indigo-500/5 rounded border border-indigo-500/20">
                          <p className="font-bold">
                            ❸ Somar múltiplo de linha a outra
                          </p>
                          <p className="text-muted-foreground">
                            det' = det (não muda!)
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Essas operações são usadas em escalonamento para
                        calcular det sem Sarrus!
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="indigo"
              video={{
                videoId: "8iK3Ts0Uv4P",
                title: "Determinante 3×3: Regra de Sarrus vs Cofatores",
                duration: "18:15",
              }}
              resumoVisual={{
                moduloNome: "Módulo 7",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title:
                      "Regra de Sarrus: 3 diagonais (+) - 3 anti-diagonais (-)",
                    type: "Método",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "Expansion por linha/coluna com cofatores",
                    type: "Alternativa",
                    placeholderColor: "bg-purple-500/20",
                  },
                  {
                    title: "Complexidade cresce com ordem",
                    type: "Nota",
                    placeholderColor: "bg-blue-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Sarrus: copia primeiras 2 colunas, multiplica diagonais!"
                    </p>
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">3 diagonais (↘) com sinal (+)</p>
                      <p className="text-sm">
                        3 anti-diagonais (↙) com sinal (-)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Soma tudo = determinante!
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Regra de Sarrus SÓ funciona para 3×3
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                titulo: "Determinante 3×3 - Sarrus",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Determinante 3×3"
              icone="🔺"
              numero={3}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: COFATORES E DESENVOLVIMENTO DE LAPLACE                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner numero={8}
          titulo="Cofatores e Desenvolvimento de Laplace"
          descricao="O método mais poderoso para determinantes de qualquer ordem: expanda por linhas ou colunas com mais zeros e reduza o trabalho ao mínimo."
           variant={mv[8]}/>
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
                        <strong>Menor Mᵢⱼ</strong>: determinante da submatriz
                        obtida ao eliminar a linha i e a coluna j.
                      </p>
                      <p>
                        <strong>Cofator Cᵢⱼ</strong>: Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="text-sm font-bold">
                          Padrão de sinais (tabuleiro de xadrez):
                        </p>
                        <p className="font-mono text-sm mt-1">
                          + − + / − + − / + − +
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Regra Rápida de Sinais">
                        Se i+j é <strong>par</strong> → sinal positivo (+). Se
                        i+j é <strong>ímpar</strong> → sinal negativo (−). C₁₁:
                        1+1=2 (par) → +. C₁₂: 1+2=3 (ímpar) → −.
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
                        det(A) = Σ aᵢⱼ · Cᵢⱼ (somando ao longo de qualquer linha
                        ou coluna).
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-sm">
                        <p className="font-bold">Expandindo pela 1ª linha:</p>
                        <p className="font-mono mt-1">
                          det(A) = a₁₁·C₁₁ + a₁₂·C₁₂ + a₁₃·C₁₃
                        </p>
                      </div>
                      <p className="text-sm">
                        <strong>Estratégia de prova</strong>: escolha a
                        linha/coluna com mais zeros — cada zero elimina um
                        cofator a calcular!
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
                        <strong>Adjunta</strong>: adj(A) = transposta da matriz
                        de cofatores.
                      </p>
                      <p>
                        <strong>Inversa</strong>: A⁻¹ = (1/det(A)) · adj(A)
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm font-mono">
                        <p>Para A = [[a,b],[c,d]]:</p>
                        <p>adj(A) = [[d,−b],[−c,a]]</p>
                        <p>A⁻¹ = (1/(ad−bc)) · [[d,−b],[−c,a]]</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Cramer vs Cofatores">
                        A Regra de Cramer usa cofatores: xᵢ = det(Aᵢ)/det(A). É
                        elegante para sistemas 2×2 e 3×3, mas computacionalmente
                        cara para sistemas grandes industriais.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Prático: Cofatores 3×3",
                  icone: "✏️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>
                          Calcule C₁₂ da matriz A = [[2,1,3],[4,5,6],[7,8,9]]:
                        </strong>
                      </p>
                      <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 space-y-2 text-xs font-mono">
                        <p>
                          • Elimine linha 1, coluna 2: M₁₂ = det([[4,6],[7,9]])
                        </p>
                        <p>• M₁₂ = 4·9 − 6·7 = 36 − 42 = −6</p>
                        <p>• C₁₂ = (−1)^(1+2) · (−6) = (−1) · (−6) = 6</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Note o sinal negativo da fórmula (−1)^(1+2).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Estratégia: Linha/Coluna com Zeros",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>
                          Sempre escolha a linha ou coluna com mais zeros!
                        </strong>
                      </p>
                      <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20 text-xs">
                        <p className="font-bold">
                          Ex: A = [[1,2,0],[0,3,4],[0,0,5]]
                        </p>
                        <p className="mt-1">
                          A 3ª coluna tem 2 zeros → expanda por ela!
                        </p>
                        <p className="mt-1">
                          det = 0·C₁₃ + 4·C₂₃ + 5·C₃₃ = apenas 2 termos
                        </p>
                        <p className="mt-1">
                          det = 4·(−1)^(2+3)·1 + 5·(1)·1 = −4 + 5 = 1
                          (triangular!)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Matriz de Cofatores Completa",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>
                          Passo a passo para calcular Adj(A) e depois A⁻¹:
                        </strong>
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-xs">
                        <li>
                          Calcule os menores Mᵢⱼ (determinante da submatriz sem
                          linha i, coluna j)
                        </li>
                        <li>Aplique o padrão xadrez: Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ</li>
                        <li>Monte a matriz de cofatores C = [Cᵢⱼ]</li>
                        <li>Transponha: adj(A) = Cᵀ</li>
                        <li>Divida por det: A⁻¹ = (1/det) · adj(A)</li>
                      </ol>
                      <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20 text-xs mt-2">
                        <p className="font-bold text-emerald-600">
                          Prático: Para 2×2
                        </p>
                        <p className="text-muted-foreground">
                          A = [[a,b],[c,d]] → A⁻¹ = (1/(ad−bc))·[[d,−b],[−c,a]]
                        </p>
                        <p className="text-muted-foreground">
                          Isso JÁ é a fórmula dirreta (cofatores embutidos!)
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-8" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="emerald"
              video={{
                videoId: "5cJ7Nx2Lm8R",
                title: "Cofatores, Menor e Adjunta: Inversa Passo a Passo",
                duration: "20:40",
              }}
              resumoVisual={{
                moduloNome: "Módulo 8",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Menor (Mᵢⱼ): determinante da submatriz",
                    type: "Definição",
                    placeholderColor: "bg-emerald-500/20",
                  },
                  {
                    title: "Cofator (Cᵢⱼ) = (-1)^(i+j) × Mᵢⱼ",
                    type: "Fórmula",
                    placeholderColor: "bg-green-500/20",
                  },
                  {
                    title: "Adjunta = transposta da matriz de cofatores",
                    type: "Conceito",
                    placeholderColor: "bg-teal-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Cofator coloca sinal de xadrez: (+,-,+,-,...)"
                    </p>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">C₁₁(+) C₁₂(-) C₁₃(+)</p>
                      <p className="text-sm">C₂₁(-) C₂₂(+) C₂₃(-)</p>
                      <p className="text-xs text-muted-foreground">
                        Padrão xadrez: (i+j) par=+, ímpar=-
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      A⁻¹ = (1/det) × Adjunta
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                titulo: "Cofatores e Adjunta",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Cofatores"
              icone="🔬"
              numero={3}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: APLICAÇÕES PETROBRAS                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner numero={9}
          titulo="Aplicações na Petrobras e Indústria"
          descricao="Sistemas de equações, transformações de coordenadas, redes de dutos e criptografia — matrizes e determinantes resolvendo problemas reais da indústria petrolífera."
           variant={mv[9]}/>
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
                        Todo sistema linear pode ser escrito na forma{" "}
                        <strong>AX = B</strong>, onde A é a matriz dos
                        coeficientes, X o vetor de incógnitas e B o vetor dos
                        termos independentes.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm font-mono">
                        <p>2x + y = 180 (pressão do duto 1)</p>
                        <p>x + 3y = 120 (vazão do duto 2)</p>
                        <p>→ A = [[2,1],[1,3]], B = [[180],[120]]</p>
                        <p>→ det(A) = 5 ≠ 0 → solução única</p>
                      </div>
                      <AlertBox tipo="info" titulo="Verificação Rápida">
                        Antes de resolver: calcule det(A). Se det=0, o sistema
                        não tem solução única e não adianta tentar resolver por
                        Cramer. Economize tempo na prova!
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
                        Robôs submarinos (ROVs) da Petrobras usam{" "}
                        <strong>matrizes de rotação</strong> para converter
                        coordenadas entre sistemas de referência.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-sm font-mono">
                        <p>R(90°) = [[0,−1],[1,0]]</p>
                        <p>Posição (3,4) após rotação:</p>
                        <p>R·[[3],[4]] = [[−4],[3]]</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        det(R) = 1 sempre — rotações preservam áreas e
                        distâncias. A Petrobras usa isso em sistemas de
                        navegação inercial de ROVs a 3000m de profundidade.
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
                        A análise de redes de transporte de petróleo usa{" "}
                        <strong>matrizes de incidência</strong>: cada linha é um
                        nó (plataforma), cada coluna é um arco (duto).
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-sm">
                        <p>Matriz 4×6 → 4 plataformas, 6 conexões</p>
                        <p>
                          Elemento +1: saída do nó / −1: entrada / 0: sem
                          conexão
                        </p>
                        <p>Balanço: A·fluxo = produção_líquida</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Alerta de Topologia">
                        Quando det=0 na matriz do sistema de dutos, há
                        dependência linear — um duto é redundante ou o modelo é
                        inconsistente. A equipe de engenharia precisa revisar a
                        topologia da rede. Contexto real de operação da
                        Petrobras!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Criptografia e Códigos de Segurança",
                  icone: "🔐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>Cifra de Hill:</strong> usa matrizes invertíveis
                        para criptografar mensagens.
                      </p>
                      <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20 text-xs space-y-1">
                        <p className="font-mono">Chave: A = [[5,8],[17,29]]</p>
                        <p>Mensagem codificada: C = A·M (mod 26)</p>
                        <p>
                          Decodificar: M = A⁻¹·C (mod 26) — precisa de A
                          invertível!
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Isso reforça a importância de det(A) ≠ 0. Sem
                        inversibilidade, não se decodifica.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Análise de Estabilidade (Autovalores)",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Preview:</strong> Autovalores de A satisfazem
                        det(A − λI) = 0.
                      </p>
                      <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 text-xs">
                        <p className="font-bold text-blue-600">
                          Importância: Autovalores indicam estabilidade
                        </p>
                        <p className="mt-1">
                          Se |λ| &lt; 1 → sistema converge (estável)
                        </p>
                        <p>Se |λ| &gt; 1 → sistema diverge (instável)</p>
                        <p className="mt-1 text-muted-foreground">
                          Usado em simulações de reservatório e dinâmica de
                          plataforma.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Decomposição LU e Solução Eficiente",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>
                          Método computacional (usado por software):
                        </strong>
                      </p>
                      <p className="text-xs">
                        Fatora A = L·U, onde L é triangular inferior e U é
                        triangular superior.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-cyan-500/5 rounded border border-cyan-500/20">
                          <p className="font-bold">Vantagem:</p>
                          <p className="text-muted-foreground">
                            Resolve A×x = b em 2 passos (substituição
                            progressiva e regressiva)
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold">Computacionalmente:</p>
                          <p className="text-muted-foreground">
                            O(n³) em vez de Cramer que é muito mais lento para n
                            grande
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Na Petrobras, reservatórios com 1 milhão de células →
                        usa LU, nunca Cramer!
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-9" className="mt-16">
            

<ModuleConsolidation
              index={2}
              variant="cyan"
              video={{
                videoId: "9lP8Qs1Xw5Y",
                title:
                  "Matrizes na Petrobras: Sistemas de Dutos e Análise de Redes",
                duration: "17:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 9",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Matriz de adjacência para rede de dutos",
                    type: "Aplicação",
                    placeholderColor: "bg-cyan-500/20",
                  },
                  {
                    title: "Determinante indica consistência do sistema",
                    type: "Engenharia",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Sistemas lineares: A×x = b",
                    type: "Metodologia",
                    placeholderColor: "bg-sky-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Petrobras usa matrizes para modelar redes complexas"
                    </p>
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">det = 0 → Sistema singular</p>
                      <p className="text-sm">det ≠ 0 → Solução única</p>
                      <p className="text-xs text-muted-foreground">
                        Controle de produção em tempo real!
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Cada célula pode representar fluxo entre plataformas
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
                titulo: "Matrizes na Indústria",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Aplicações Petrobras"
              icone="🏭"
              numero={3}
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
        <ModuleBanner numero={10}
          titulo="Simulado CESGRANRIO — Nível Mestre"
          descricao="Questões no padrão exato da banca examinadora da Petrobras. Teste tudo que aprendeu sobre matrizes e determinantes em condições reais de prova."
           variant={mv[10]}/>
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
                        <li>
                          <strong>Dimensão do produto A·B</strong>: (m×p)·(p×n)
                          = (m×n)
                        </li>
                        <li>
                          <strong>Condição: A·B ≠ B·A</strong> — não comutativa
                        </li>
                        <li>
                          <strong>det([[a,b],[c,d]]) = ad−bc</strong> — fórmula
                          básica
                        </li>
                        <li>
                          <strong>det=0 ↔ linhas/colunas LD</strong> → sistema
                          singular
                        </li>
                        <li>
                          <strong>Sarrus apenas para 3×3</strong> — nunca para
                          4×4
                        </li>
                      </ol>
                      <AlertBox tipo="info" titulo="Estratégia de Prova">
                        Se uma questão envolve det, calcule primeiro e verifique
                        se é zero. Isso resolve imediatamente questões sobre
                        invertibilidade e sistemas. Economize 2 minutos!
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
                          <p className="text-xs font-bold text-indigo-400 mb-2">
                            Inversão 2×2
                          </p>
                          <p className="font-mono text-xs">
                            A⁻¹ = (1/det)·[[d,−b],[−c,a]]
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">
                            Cramer
                          </p>
                          <p className="font-mono text-xs">
                            xᵢ = det(Aᵢ)/det(A)
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">
                            Cofator
                          </p>
                          <p className="font-mono text-xs">
                            Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ
                          </p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">
                            det Produto
                          </p>
                          <p className="font-mono text-xs">
                            det(A·B) = det(A)·det(B)
                          </p>
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
                        <li>
                          Linhas proporcionais → det=0 (não só linhas iguais)
                        </li>
                        <li>
                          A transposta sempre existe; a inversa só se det≠0
                        </li>
                        <li>Matriz 2×3 ≠ 3×2 mesmo com os mesmos números</li>
                      </ul>
                      <AlertBox tipo="danger" titulo="Alerta CESGRANRIO">
                        O erro mais caro: aplicar Sarrus em matrizes 4×4. A
                        banca dá as 6 diagonais como resposta para pegar quem
                        usa Sarrus indevidamente. Para 4×4, use Laplace
                        (cofatores)!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Fluxograma de Decisão em Provas",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">
                        Quando se depara com uma questão sobre matrizes:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                          <p className="font-bold text-blue-600">
                            ❶ Pergunta sobre produto A·B?
                          </p>
                          <p>→ Verifique: colunas(A) = linhas(B)?</p>
                          <p>→ Resultado: (m×n)·(n×p) = (m×p)</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-600">
                            ❷ Pergunta sobre determinante?
                          </p>
                          <p>→ 2×2: use fórmula ad−bc (30 seg)</p>
                          <p>
                            → 3×3: Sarrus (1 min) ou escolha linha/coluna com
                            zeros
                          </p>
                          <p>→ 4×4+: Laplace ou escalonamento</p>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20">
                          <p className="font-bold text-indigo-600">
                            ❸ Pergunta sobre invertibilidade?
                          </p>
                          <p>
                            → Calcule det. Se det=0 → singular (não inverte)
                          </p>
                          <p>
                            → Se det≠0 → invertível. Fórmula: A⁻¹ =
                            (1/det)·Adj(A)
                          </p>
                        </div>
                        <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                          <p className="font-bold text-purple-600">
                            ❹ Pergunta sobre sistema AX=B?
                          </p>
                          <p>
                            → Se det(A)≠0 → solução única: X = A⁻¹·B ou Cramer
                          </p>
                          <p>
                            → Se det(A)=0 → SII (infinitas) ou SI (impossível)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Revisão de Tempo por Operação",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>
                          Quanto tempo gastar em cada operação (em prova):
                        </strong>
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold">Soma/Subtração (A±B)</p>
                          <p className="text-muted-foreground">
                            30 seg para 3×3
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold">Multiplicação A·B</p>
                          <p className="text-muted-foreground">
                            2-3 min para 3×3
                          </p>
                        </div>
                        <div className="p-2 bg-indigo-500/5 rounded border border-indigo-500/20">
                          <p className="font-bold">det 2×2</p>
                          <p className="text-muted-foreground">15 seg</p>
                        </div>
                        <div className="p-2 bg-purple-500/5 rounded border border-purple-500/20">
                          <p className="font-bold">det 3×3 (Sarrus)</p>
                          <p className="text-muted-foreground">60-90 seg</p>
                        </div>
                        <div className="p-2 bg-cyan-500/5 rounded border border-cyan-500/20">
                          <p className="font-bold">Inversa 2×2</p>
                          <p className="text-muted-foreground">45 seg</p>
                        </div>
                        <div className="p-2 bg-orange-500/5 rounded border border-orange-500/20">
                          <p className="font-bold">Cramer 2×2</p>
                          <p className="text-muted-foreground">1-1.5 min</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 Se uma operação extrapolar o tempo, pule e volte
                        depois!
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Checklist Pré-Prova: 10 Itens",
                  icone: "✓",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">
                        Antes de entrar na prova, certifique-se de que você
                        sabe:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-blue-600">☐ 1.</span>
                          <p>Dimensão de produtos: (m×n)·(n×p) = ?</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-emerald-600">
                            ☐ 2.
                          </span>
                          <p>Fórmula det 2×2: ad − bc</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-purple-600">
                            ☐ 3.
                          </span>
                          <p>Regra de Sarrus para 3×3 (nunca para 4×4)</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-indigo-600">
                            ☐ 4.
                          </span>
                          <p>det(A) ≠ 0 ⟺ A é invertível</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-cyan-600">☐ 5.</span>
                          <p>Fórmula inversa 2×2: (1/det) · [[d,−b],[−c,a]]</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-amber-600">☐ 6.</span>
                          <p>Regra de Cramer: xᵢ = det(Aᵢ)/det(A)</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-rose-600">☐ 7.</span>
                          <p>det(kA) = kⁿ·det(A) para ordem n</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-orange-600">
                            ☐ 8.
                          </span>
                          <p>det(A·B) = det(A)·det(B)</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-teal-600">☐ 9.</span>
                          <p>A·B ≠ B·A em geral (não comutativa)</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-pink-600">☐ 10.</span>
                          <p>Cofator: Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ (padrão xadrez)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Temas Históricos (Se houver tempo extra)",
                  icone: "📚",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xs text-muted-foreground">
                        <strong>Curiosidades para fixar o aprendizado:</strong>
                      </p>
                      <ul className="space-y-2 text-xs">
                        <li>
                          <strong>Gabriel Cramer (1704):</strong> Desenvolveu a
                          Regra de Cramer para resolver sistemas. Ainda é usado
                          em engenharia!
                        </li>
                        <li>
                          <strong>Pierre-Simon Laplace (1749):</strong> Criou a
                          expansão por cofatores — método genial para
                          determinantes de qualquer ordem.
                        </li>
                        <li>
                          <strong>Carl Friedrich Gauss (1777):</strong>{" "}
                          Escalonamento (Eliminação Gaussiana) — muito mais
                          eficiente computacionalmente!
                        </li>
                        <li>
                          <strong>Aplicação moderna:</strong> GPUs (placas
                          gráficas) usam operações matriciais para renderizar 3D
                          — todas as transformações são multiplicações de
                          matrizes!
                        </li>
                      </ul>
                      <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20 text-xs">
                        <p className="font-bold text-indigo-600">
                          Conexão com Petrobras:
                        </p>
                        <p>
                          Simulações de fluxo de reservatório resolvem sistemas
                          de milhões de equações usando algoritmos baseados em
                          Gauss + decomposição LU (Lower-Upper). Está lá:
                          matrizes na ponta da caneta de engenheiros
                          petroleiros!
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Últimas Dicas Antes da Prova",
                  icone: "🎓",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold">
                        O que levar para a prova CESGRANRIO:
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-blue-500/5 rounded border border-blue-500/20">
                          <p className="font-bold">📝 Fórmulas essenciais</p>
                          <p className="text-muted-foreground">
                            Determinante 2×2, Sarrus, Cramer, Inversa 2×2
                            (memorize!)
                          </p>
                        </div>
                        <div className="p-2 bg-emerald-500/5 rounded border border-emerald-500/20">
                          <p className="font-bold">⏱️ Gerenciamento de tempo</p>
                          <p className="text-muted-foreground">
                            Máx 3 min por questão. Se travar, pule e volte
                            depois
                          </p>
                        </div>
                        <div className="p-2 bg-indigo-500/5 rounded border border-indigo-500/20">
                          <p className="font-bold">🎯 Estratégia</p>
                          <p className="text-muted-foreground">
                            Comece pelo det. Se det=0, muitos problemas se
                            simplificam
                          </p>
                        </div>
                        <div className="p-2 bg-purple-500/5 rounded border border-purple-500/20">
                          <p className="font-bold">✅ Verificação</p>
                          <p className="text-muted-foreground">
                            Se encontrou solução, substitua na equação original
                            — leva 30 seg!
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 font-bold">
                        Boa prova! Você tem capacidade para acertar 80%+.
                        Confiança!
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-10" className="mt-8">
            

<ModuleConsolidation
              index={2}
              variant="blue"
              video={{
                videoId: "w2ZyJqA4OFs",
                title: "Simulado CESGRANRIO — Resolução Completa",
                duration: "24:15",
              }}
              resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: "Matrizes e Determinantes",
                materia: "Matemática",
                images: [
                  {
                    title: "Os 10 Pontos-Chave",
                    type: "Síntese",
                    placeholderColor: "bg-blue-500/20",
                  },
                  {
                    title: "Fórmulas Estratégicas",
                    type: "Referência",
                    placeholderColor: "bg-indigo-500/20",
                  },
                  {
                    title: "Pegadinhas CESGRANRIO",
                    type: "Alerta",
                    placeholderColor: "bg-red-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "Pulo do Gato",
                content: (
                  <div className="space-y-4 text-left">
                    <p className="text-sm italic">
                      "Na hora da prova, sempre pergunte: det = 0?"
                    </p>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl font-mono text-center">
                      <p className="text-sm">Se det = 0 → Sistema singular</p>
                      <p className="text-sm">
                        Se det ≠ 0 → Sistema tem solução única
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Resolve 70% das questões em 30 segundos!
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sarrus APENAS para 3×3. Para 4×4, Laplace!
                    </p>
                  </div>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
                titulo: "Revisão Mestre",
                artista: "Prof. Algébrico",
              }}
            />

                        <QuizInterativo
              questoes={quizM10}
              titulo="QUIZ: Simulado CESGRANRIO"
              icone="🏆"
              numero={3}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          {/* BÔNUS: EXTENSÕES E TEMAS AVANÇADOS */}
          <section className="mt-16 space-y-6 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-2xl border border-indigo-500/20 p-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-indigo-600">
                🚀 Próximas Fronteiras em Álgebra Linear
              </h2>
              <p className="text-sm text-muted-foreground">
                Tópicos avançados para quem quer aprofundar além do currículo
                CESGRANRIO:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 space-y-2">
                <p className="font-bold text-blue-600">
                  Autovalores e Autovetores
                </p>
                <p className="text-xs text-muted-foreground">
                  Equação característica: det(A − λI) = 0. Essencial para
                  dinâmica de sistemas
                </p>
              </div>
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 space-y-2">
                <p className="font-bold text-emerald-600">
                  Decomposição Espectral
                </p>
                <p className="text-xs text-muted-foreground">
                  Fatoração em autovalores e autovetores. Base para análise de
                  estabilidade
                </p>
              </div>
              <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20 space-y-2">
                <p className="font-bold text-purple-600">
                  Normas e Condicionamento
                </p>
                <p className="text-xs text-muted-foreground">
                  Medidas de magnitude e sensibilidade numérica de matrizes
                </p>
              </div>
              <div className="p-4 bg-pink-500/5 rounded-xl border border-pink-500/20 space-y-2">
                <p className="font-bold text-pink-600">Espaços Vetoriais</p>
                <p className="text-xs text-muted-foreground">
                  Dimensão, base, subespaço. Fundação teórica da álgebra linear
                </p>
              </div>
              <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 space-y-2">
                <p className="font-bold text-cyan-600">Projeções Ortogonais</p>
                <p className="text-xs text-muted-foreground">
                  Mínimos quadrados, regressão linear. Aplicação em engenharia
                </p>
              </div>
              <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20 space-y-2">
                <p className="font-bold text-orange-600">
                  Decomposição em Valores Singulares (SVD)
                </p>
                <p className="text-xs text-muted-foreground">
                  A = U·Σ·Vᵀ. Essencial em compressão de imagem e processamento
                </p>
              </div>
            </div>

            <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30 space-y-2">
              <p className="font-bold text-indigo-600 text-sm">
                💡 Qual é o próximo passo?
              </p>
              <p className="text-xs text-muted-foreground">
                Se você domina matrizes e determinantes, está pronto para
                Álgebra Linear I (universidade). Os conceitos aqui são a base
                para análise de estabilidade em engenharia de petróleo — desde
                simulações de reservatório até controle automático de
                plataformas.
              </p>
              <p className="text-xs font-mono text-muted-foreground mt-3">
                "Matrizes são a linguagem universal da engenharia moderna.
                Dominar-as é dominar o futuro." — Prof. Algébrico
              </p>
            </div>
          </section>

          {/* RESUMO VISUAL FINAL */}
          <section className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold">
              📊 Mapa Mental: Matrizes e Determinantes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30 space-y-3">
                <p className="text-lg font-bold text-blue-600">
                  Definição & Notação
                </p>
                <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
                  <li>A = (aᵢⱼ)ₘₓₙ</li>
                  <li>Linha i, Coluna j</li>
                  <li>Dimensão m×n</li>
                  <li>Ordem n (quadradas)</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/30 space-y-3">
                <p className="text-lg font-bold text-emerald-600">Operações</p>
                <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
                  <li>A + B (m×n iguais)</li>
                  <li>k·A (escalar)</li>
                  <li>A·B (n cols A = m rows B)</li>
                  <li>Aᵀ (transposta)</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30 space-y-3">
                <p className="text-lg font-bold text-purple-600">
                  Determinante
                </p>
                <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
                  <li>2×2: ad−bc</li>
                  <li>3×3: Sarrus</li>
                  <li>n×n: Laplace</li>
                  <li>det≠0 ⟹ invertível</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30 space-y-3">
                <p className="text-lg font-bold text-orange-600">
                  Tipos Especiais
                </p>
                <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
                  <li>Identidade (I)</li>
                  <li>Diagonal, Nula</li>
                  <li>Simétrica (A=Aᵀ)</li>
                  <li>Triangular</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 space-y-3">
                <p className="text-lg font-bold text-cyan-600">Aplicações</p>
                <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
                  <li>Sistemas AX=B</li>
                  <li>Cramer: xᵢ=det(Aᵢ)/det(A)</li>
                  <li>Inversa: A⁻¹</li>
                  <li>Transformações</li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-2xl border border-indigo-500/30 space-y-3">
                <p className="text-lg font-bold text-indigo-600">
                  Propriedades
                </p>
                <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
                  <li>(Aᵀ)ᵀ = A</li>
                  <li>det(A·B) = det(A)·det(B)</li>
                  <li>A·I = A</li>
                  <li>A·A⁻¹ = I</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl border border-blue-500/30 space-y-3">
              <p className="text-center font-bold text-lg">
                🎓 Parabéns por Completar Matrizes e Determinantes!
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Você agora domina um dos tópicos mais fundamentais da matemática
                aplicada. Estes conceitos são a base para:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="text-xs text-muted-foreground p-2 bg-white/50 rounded">
                  📐 Geometria Analítica
                </div>
                <div className="text-xs text-muted-foreground p-2 bg-white/50 rounded">
                  📊 Análise Combinatória
                </div>
                <div className="text-xs text-muted-foreground p-2 bg-white/50 rounded">
                  ⚙️ Engenharia
                </div>
                <div className="text-xs text-muted-foreground p-2 bg-white/50 rounded">
                  🔬 Física
                </div>
              </div>
              <p className="text-xs font-mono text-center text-indigo-600 mt-3">
                Score final: Especialista em Matrizes e Determinantes ✨
              </p>
            </div>
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
