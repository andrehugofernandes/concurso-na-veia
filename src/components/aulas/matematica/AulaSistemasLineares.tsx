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
  QUIZ_M1_CONCEITO_SL,
  QUIZ_M2_SUBSTITUICAO,
  QUIZ_M3_ADICAO,
  QUIZ_M4_CRAMER,
  QUIZ_M5_IMPOSSIVEL_INDET,
  QUIZ_M6_TRES_VARIAVEIS,
  QUIZ_M7_GEOMETRICA,
  QUIZ_M8_INEQUACOES,
  QUIZ_M9_APLICACOES_PETROBRAS,
  QUIZ_M10_SIMULADO_CESGRANRIO,
} from "./data/sistemas-lineares-quizzes";

export default function AulaSistemasLineares({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITO_SL, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_SUBSTITUICAO, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_ADICAO, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_CRAMER, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_IMPOSSIVEL_INDET, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_TRES_VARIAVEIS, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_GEOMETRICA, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_INEQUACOES, 6));
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceito e Classificação" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Método de Substituição" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Método da Adição" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Regra de Cramer" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Impossível e Indeterminado" },
    { id: "modulo-6", label: "Módulo 6", titulo: "3 Variáveis" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Interpretação Geométrica" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Inequações" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Petrobras" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
  ] as const;

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
      {/* MÓDULO 1: CONCEITO E CLASSIFICAÇÃO DE SISTEMAS LINEARES          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Conceito e Classificação de Sistemas Lineares"
          descricao="Entenda o que é um sistema linear, como classificá-lo em SPD, SI ou SPI, e por que isso é essencial nos processos da Petrobras."
          gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é um Sistema Linear?"
              description="A base de tudo: equações que modelam o equilíbrio entre variáveis industriais."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fundamentos do Sistema Linear"
              icone="📐"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Estrutura",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Um <strong>sistema linear</strong> é um conjunto de equações do 1º grau com duas ou mais incógnitas, onde buscamos valores que satisfaçam <strong>todas as equações simultaneamente</strong>. Cada equação representa uma restrição ou condição do problema.
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-indigo-400 mb-1">Forma geral (2×2):</p>
                        <p className="text-sm font-mono">a₁x + b₁y = c₁</p>
                        <p className="text-sm font-mono">a₂x + b₂y = c₂</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Onde a₁, b₁, a₂, b₂ são coeficientes e c₁, c₂ são termos independentes.
                        </p>
                      </div>
                      <p>
                        Na indústria do petróleo, sistemas lineares aparecem em balanços de massa (entrada=saída), distribuição de vazão em ramais paralelos, cálculo de mistura de produtos com concentrações diferentes e equilíbrio de forças em estruturas offshore.
                      </p>
                      <AlertBox tipo="info" titulo="Aplicação REPLAN">
                        Na refinaria REPLAN, o engenheiro precisa determinar a vazão de nafta (x) e gasolina (y) em dois reatores. As medições formam o sistema: x+y=1000 m³/h (capacidade total) e 3x+y=2200 (balanço energético). A solução dá x=600 e y=400 — valores que guiam a operação do processo.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "SPD — Sistema Possível e Determinado",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Um sistema é <strong>SPD (Possível e Determinado)</strong> quando possui <strong>exatamente uma solução</strong>. Isso ocorre quando o determinante principal D ≠ 0, o que significa que as retas correspondentes se cruzam em um único ponto.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Condição Algébrica</p>
                          <p className="text-sm font-mono">D = a₁b₂ − a₂b₁ ≠ 0</p>
                          <p className="text-xs text-muted-foreground mt-2">O determinante não nulo garante solução única.</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500 mb-2">Interpretação Geométrica</p>
                          <p className="text-sm">As duas retas se intersectam em exatamente um ponto (x₀, y₀).</p>
                        </div>
                      </div>
                      <p>
                        Exemplo SPD: x+y=10 e x−y=2. Resolvendo: x=6, y=4. As retas y=10−x e y=x−2 se cruzam em (6,4). Este é o tipo mais comum em provas CESGRANRIO.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "SI e SPI — Os casos especiais",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Quando D=0, o sistema é <strong>degenerado</strong> e pode ser de dois tipos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">SI — Sistema Impossível</p>
                          <p className="text-sm">Coeficientes proporcionais, termos independentes NÃO proporcionais. Retas paralelas distintas. Nenhuma solução.</p>
                          <p className="text-xs font-mono mt-2 text-muted-foreground">Ex: x+y=5 e x+y=7</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-xs font-bold text-amber-500 mb-2">SPI — Sistema Possível Indeterminado</p>
                          <p className="text-sm">TODOS os coeficientes proporcionais, inclusive os termos independentes. Retas coincidentes. Infinitas soluções.</p>
                          <p className="text-xs font-mono mt-2 text-muted-foreground">Ex: x+y=5 e 2x+2y=10</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca frequentemente apresenta um sistema como 3x+6y=12 e x+2y=5. Candidatos tendem a calcular mecanicamente e errar. A solução correta: verifique primeiro se os coeficientes são proporcionais (3/1=6/2=3 ✓), mas os termos independentes não (12/5≠3) → SI! Nunca inicie a resolução sem verificar o tipo do sistema.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Tabela de Classificação Rápida"
              description="O atalho visual para classificar qualquer sistema em segundos na prova."
              variant="blue"
              className="mb-6"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-500/10">
                    <th className="border border-blue-500/20 p-3 text-left font-bold">Tipo</th>
                    <th className="border border-blue-500/20 p-3 text-left font-bold">Determinante</th>
                    <th className="border border-blue-500/20 p-3 text-left font-bold">Soluções</th>
                    <th className="border border-blue-500/20 p-3 text-left font-bold">Geometria</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-bold text-emerald-500">SPD</td>
                    <td className="border border-border p-3 font-mono">D ≠ 0</td>
                    <td className="border border-border p-3">1 solução única</td>
                    <td className="border border-border p-3">Retas concorrentes</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border border-border p-3 font-bold text-rose-500">SI</td>
                    <td className="border border-border p-3 font-mono">D = 0, Dx ou Dy ≠ 0</td>
                    <td className="border border-border p-3">Nenhuma solução</td>
                    <td className="border border-border p-3">Retas paralelas distintas</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-bold text-amber-500">SPI</td>
                    <td className="border border-border p-3 font-mono">D = Dx = Dy = 0</td>
                    <td className="border border-border p-3">∞ soluções</td>
                    <td className="border border-border p-3">Retas coincidentes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          











<ModuleConsolidation
            index={1}
            variant="indigo"
            video={{
              videoId: "r4sFqOFe8LU",
              title: "Sistemas Lineares: Conceitos Fundamentais",
              duration: "12:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Equação Linear", type: "Definição", placeholderColor: "bg-indigo-500/20" },
                { title: "Sistema 2×2 e 3×3", type: "Estrutura", placeholderColor: "bg-blue-500/20" },
                { title: "SPD, SPI, SI", type: "Classificação", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Reconhecer rapidamente a classificação:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>SPD:</strong> Determinante ≠ 0 → uma solução</li>
                    <li><strong>SPI:</strong> Det = 0 + Equações compatíveis → infinitas soluções</li>
                    <li><strong>SI:</strong> Det = 0 + Equações incompatíveis → sem solução</li>
                  </ul>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Conceito de Sistemas",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Módulo Nº 1"
              icone="🧠"
              numero={3}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: MÉTODO DE SUBSTITUIÇÃO                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Método de Substituição"
          descricao="Isole, substitua e resolva: o método mais intuitivo para sistemas 2×2, ideal quando um coeficiente é 1 ou −1."
          gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Passo a Passo do Método de Substituição"
              description="Três etapas simples que resolvem qualquer sistema linear 2×2."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Aplicar o Método"
              icone="🔄"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Etapa 1 — Isolar uma incógnita",
                  icone: "1️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O primeiro passo é <strong>escolher a equação e a incógnita mais simples de isolar</strong>. Priorize: coeficiente 1 ou −1 para evitar frações desnecessárias. Isso economiza tempo e reduz erros de cálculo.
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-emerald-400 mb-1">Exemplo — Balanço de massa na REDUC:</p>
                        <p className="text-sm">Sistema: 3x + 2y = 1600 e <strong>x + y = 700</strong></p>
                        <p className="text-sm">Isole x na 2ª (coef. 1): <strong>x = 700 − y</strong></p>
                      </div>
                      <p>
                        Quando todos os coeficientes são diferentes de 1, escolha o menor para minimizar a fração resultante. Por exemplo, em 2x+3y=12, isole x para obter x=(12−3y)/2 — a fração é mais manejável que y=(12−2x)/3.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Etapa 2 — Substituir e resolver",
                  icone: "2️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Após isolar uma incógnita, <strong>substitua a expressão obtida na outra equação</strong>. Isso reduz o problema a uma equação de uma variável, que é resolvida diretamente.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-blue-400 mb-1">Continuando o exemplo:</p>
                        <p className="text-sm">Substituindo x=700−y na 1ª: 3(700−y)+2y=1600</p>
                        <p className="text-sm">→ 2100−3y+2y=1600 → −y=−500 → <strong>y=500</strong></p>
                        <p className="text-sm">→ x=700−500 = <strong>200</strong></p>
                      </div>
                      <AlertBox tipo="warning" titulo="Erro Frequente em Prova">
                        Após encontrar o valor de uma incógnita, candidatos esquecem de calcular a segunda e marcam apenas o valor encontrado. A questão CESGRANRIO quase sempre pede x+y, x−y ou x·y — não apenas um valor isolado. Sempre calcule as duas incógnitas!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Etapa 3 — Verificação obrigatória",
                  icone: "3️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>verificação</strong> é o passo que separa quem acerta de quem erra por substituição descuidada. Substitua os valores encontrados nas equações ORIGINAIS e confirme que ambas são satisfeitas.
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-cyan-400 mb-1">Verificando x=200, y=500:</p>
                        <p className="text-sm">1ª eq.: 3(200)+2(500) = 600+1000 = <strong>1600 ✓</strong></p>
                        <p className="text-sm">2ª eq.: 200+500 = <strong>700 ✓</strong></p>
                      </div>
                      <p>
                        Em provas CESGRANRIO com 5 alternativas, a verificação permite confirmar a resposta mesmo quando há dúvida no cálculo. Se a solução não verifica, há erro no processo — retorne e revise desde o isolamento.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Aplicação em Misturas Petrobras"
              description="O método de substituição é a ferramenta preferida em problemas de mistura industrial."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Problemas de Mistura e Blending"
              icone="🛢️"
              corIndicador="bg-cyan-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Modelando um Blend de Combustíveis",
                  icone: "⛽",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Problemas de <strong>blending</strong> (mistura de produtos) são recorrentes em provas CESGRANRIO para a Petrobras. A estrutura sempre segue dois tipos de equação: conservação de volume total e conservação de alguma propriedade (concentração, densidade, octanagem).
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-emerald-400 mb-1">Problema tipo:</p>
                        <p className="text-sm">Misturar gasolina A (80% de octanagem) e B (95%) para obter 1000 L com 87%.</p>
                        <p className="text-sm font-bold mt-2">Equação 1 (volume): A + B = 1000</p>
                        <p className="text-sm font-bold">Equação 2 (propriedade): 0,80A + 0,95B = 0,87×1000</p>
                      </div>
                      <p>
                        Pelo método de substituição: B=1000−A → 0,80A+0,95(1000−A)=870 → 0,80A+950−0,95A=870 → −0,15A=−80 → A≈533 L. B≈467 L. A estrutura "dois componentes → duas equações" é sempre a mesma.
                      </p>
                      <AlertBox tipo="info" titulo="Dica de Modelagem">
                        Para resolver qualquer problema de mistura: (1) nomeie cada componente como variável; (2) escreva a equação de volume total; (3) escreva a equação da propriedade multiplicando concentração × volume; (4) aplique substituição com B = Total − A.
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
              videoId: "Fqfh_jCEVpE",
              title: "Método de Substituição em Sistemas Lineares",
              duration: "11:15"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Isolamento da Incógnita", type: "Etapa 1", placeholderColor: "bg-emerald-500/20" },
                { title: "Substituição na 2ª Equação", type: "Etapa 2", placeholderColor: "bg-green-500/20" },
                { title: "Resolução Sucessiva", type: "Etapa 3", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">O método de substituição é mais simples quando:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Um coeficiente é 1 ou −1 (isolamento fácil)</li>
                    <li>Variável aparece isolada em uma equação</li>
                    <li>Preferência: isole a variável com coeficiente menor</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">Passos: Isole → Substitua → Simplifique → Retorno</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "Batida da Substituição",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="Método de Substituição"
              icone="🔄"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: MÉTODO DA ADIÇÃO (ELIMINAÇÃO)                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Método da Adição (Eliminação)"
          descricao="Elimine variáveis somando equações multiplicadas por escalares adequados — o método mais poderoso para sistemas com coeficientes complexos."
          gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Estratégia da Eliminação"
              description="Multiplique equações por escalares para que os coeficientes de uma variável se cancelem."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Método da Adição — Passo a Passo"
              icone="➕"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Princípio do Método",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>Método da Adição</strong> (ou Eliminação de Gauss) baseia-se em uma propriedade fundamental: podemos <strong>multiplicar qualquer equação por uma constante</strong> e <strong>somar equações</strong> sem alterar o conjunto-solução. O objetivo é fazer os coeficientes de uma variável se tornarem opostos (a + (−a) = 0).
                      </p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-amber-400 mb-1">Exemplo — Balanço energético da RLAM:</p>
                        <p className="text-sm font-mono">3E₁ + 2E₂ = 1400  ... (I)</p>
                        <p className="text-sm font-mono">E₁  + 4E₂ = 1000  ... (II)</p>
                        <p className="text-sm mt-2">Para eliminar E₁: mult. (II) por −3:</p>
                        <p className="text-sm font-mono">−3E₁ − 12E₂ = −3000</p>
                        <p className="text-sm">Somando com (I): <strong>−10E₂ = −1600 → E₂ = 160 MJ</strong></p>
                      </div>
                      <p>
                        Escolha sempre qual variável eliminar primeiro. Prefira aquela cujo MDC dos coeficientes seja menor — isso minimiza os multiplicadores e os riscos de erro.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Quando o Método da Adição é Superior",
                  icone: "🏆",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O método da adição é preferível ao de substituição quando:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li><strong>Nenhum coeficiente é 1 ou −1</strong> — a substituição geraria frações imediatamente</li>
                        <li><strong>Coeficientes da mesma variável têm mesmo valor absoluto</strong> — a eliminação é imediata (ex: +3y e −3y)</li>
                        <li><strong>Sistemas com frações</strong> — multiplicar toda a equação por um inteiro antes de aplicar a adição simplifica tudo</li>
                      </ul>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Situação Ideal para Adição</p>
                          <p className="text-sm font-mono">4x + 3y = 25</p>
                          <p className="text-sm font-mono">2x − 3y = 5</p>
                          <p className="text-xs mt-2 text-muted-foreground">3y e −3y se cancelam ao somar!</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500 mb-2">Situação Ideal para Substituição</p>
                          <p className="text-sm font-mono">x + 3y = 10</p>
                          <p className="text-sm font-mono">2x + y = 8</p>
                          <p className="text-xs mt-2 text-muted-foreground">x tem coef. 1 na 1ª — isole facilmente</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Ao multiplicar por um escalar negativo, TODOS os termos da equação mudam de sinal — incluindo o termo independente (lado direito). O erro clássico é multiplicar apenas os coeficientes das incógnitas e esquecer de multiplicar o termo independente. Ex: multiplicar 2x+3y=10 por −2 dá −4x−6y=−20, não −4x−6y=10.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Detectando SI e SPI pelo Método da Adição",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O método da adição também <strong>detecta automaticamente</strong> sistemas impossíveis ou indeterminados:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">SI — Resultado Absurdo</p>
                          <p className="text-sm">Após eliminar uma variável, obtém-se uma contradição:</p>
                          <p className="text-sm font-mono font-bold mt-1">0 = 5 (impossível!)</p>
                          <p className="text-xs mt-2 text-muted-foreground">Retas paralelas — sistema impossível.</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-xs font-bold text-amber-500 mb-2">SPI — Identidade Trivial</p>
                          <p className="text-sm">Após eliminar uma variável, obtém-se uma tautologia:</p>
                          <p className="text-sm font-mono font-bold mt-1">0 = 0 (sempre verdade)</p>
                          <p className="text-xs mt-2 text-muted-foreground">Retas coincidentes — infinitas soluções.</p>
                        </div>
                      </div>
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
              videoId: "K0gU5VJMVzc",
              title: "Método da Adição (Eliminação)",
              duration: "13:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Multiplicar por Constante", type: "Ajuste", placeholderColor: "bg-cyan-500/20" },
                { title: "Somar Equações", type: "Eliminação", placeholderColor: "bg-blue-500/20" },
                { title: "Resolver e Retorno", type: "Conclusão", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Estratégia de eliminação:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Escolha qual variável eliminar (x ou y)</li>
                    <li>Multiplique equações para igualar coeficientes (sinais opostos)</li>
                    <li>Soma gera equação com uma incógnita</li>
                    <li>Resolve e retorna para encontrar a outra</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">💡 Mais rápido quando coeficientes já são proporcionais!</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "Ritmo da Adição",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Módulo Nº 3"
              icone="➕"
              numero={4}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: REGRA DE CRAMER (DETERMINANTES)                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Regra de Cramer e Determinantes"
          descricao="Use determinantes para resolver sistemas de forma sistemática e elegante — o método favorito da CESGRANRIO para sistemas com coeficientes não unitários."
          gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Determinantes e a Regra de Cramer"
              description="Da definição do determinante 2×2 à fórmula completa de Cramer."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Determinantes 2×2 e Cramer"
              icone="📊"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Determinante de uma Matriz 2×2",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>determinante</strong> de uma matriz 2×2 é um número calculado pela fórmula:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                        <p className="text-sm font-mono font-bold">
                          |a  b| = ad − bc
                        </p>
                        <p className="text-sm font-mono font-bold">
                          |c  d|
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          "Diagonal principal menos diagonal secundária"
                        </p>
                      </div>
                      <p>
                        Memorize com o mnemônico: <em>principal menos secundária</em>. Para |3 5; 2 4|: principal = 3×4=12, secundária = 5×2=10, resultado = 12−10 = 2.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-500 mb-1">|1 2; 3 4|</p>
                          <p className="text-sm">= 1×4 − 2×3 = −2</p>
                        </div>
                        <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20 text-center">
                          <p className="text-xs font-bold text-blue-500 mb-1">|5 0; 2 3|</p>
                          <p className="text-sm">= 5×3 − 0×2 = 15</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20 text-center">
                          <p className="text-xs font-bold text-cyan-500 mb-1">|4 -2; 3 1|</p>
                          <p className="text-sm">= 4×1 − (−2)×3 = 10</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicando a Regra de Cramer",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para o sistema <em>a₁x+b₁y=c₁</em> e <em>a₂x+b₂y=c₂</em>, a Regra de Cramer define:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-3">
                        <p className="text-sm font-mono font-bold">D  = |a₁ b₁; a₂ b₂| (det. principal)</p>
                        <p className="text-sm font-mono font-bold">Dx = |c₁ b₁; c₂ b₂| (substitui coluna de x pelos termos ind.)</p>
                        <p className="text-sm font-mono font-bold">Dy = |a₁ c₁; a₂ c₂| (substitui coluna de y pelos termos ind.)</p>
                        <p className="text-sm font-mono font-bold mt-2">x = Dx/D   &nbsp;&nbsp;&nbsp;   y = Dy/D</p>
                      </div>
                      <p>
                        A "substituição de colunas" é a chave: para Dx, troca-se a coluna dos coeficientes de x (a₁, a₂) pelos termos independentes (c₁, c₂). Para Dy, troca-se a coluna de y.
                      </p>
                      <AlertBox tipo="info" titulo="Exemplo na RNEST">
                        Sistema: 5F₁+2F₂=31 e 3F₁+4F₂=29. D=|5 2; 3 4|=20−6=14. Dx=|31 2; 29 4|=124−58=66. Dy=|5 31; 3 29|=145−93=52. F₁=66/14≈4,71 e F₂=52/14≈3,71. Em contextos industriais com coeficientes fracionários, Cramer é mais sistemático que a substituição.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cramer e a Classificação do Sistema",
                  icone: "🔎",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A Regra de Cramer une elegantemente a resolução e a classificação do sistema:
                      </p>
                      <ul className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <span className="font-bold text-emerald-500 min-w-fit">D ≠ 0:</span>
                          <span>SPD. x=Dx/D e y=Dy/D têm valores únicos e definidos.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold text-rose-500 min-w-fit">D=0, Dx≠0 ou Dy≠0:</span>
                          <span>SI. A divisão por zero indicaria solução "infinita" — na prática, não há solução.</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="font-bold text-amber-500 min-w-fit">D=Dx=Dy=0:</span>
                          <span>SPI. Todas as razões são 0/0 — sistema indeterminado, infinitas soluções.</span>
                        </li>
                      </ul>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca pode apresentar um sistema e perguntar "para quais valores de k o sistema tem solução única?". A resposta é sempre "D≠0". Iguale D a zero, encontre os valores de k que tornam D=0, e diga que a solução única existe para k diferente desses valores. Nunca esqueça de verificar se D=0 gera SI ou SPI com os valores encontrados.
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
              videoId: "SIeFMNJQwqE",
              title: "Regra de Cramer para Resolver Sistemas",
              duration: "14:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Determinante Principal", type: "Matriz D", placeholderColor: "bg-blue-500/20" },
                { title: "Determinantes Auxiliares", type: "Matrizes Dx, Dy", placeholderColor: "bg-indigo-500/20" },
                { title: "Razão de Determinantes", type: "Fórmula x=Dx/D", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Fórmula de Cramer para 2×2:</p>
                  <p className="font-mono text-sm">x = Dx/D,  y = Dy/D</p>
                  <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                    <li>D = determinante dos coeficientes</li>
                    <li>Dx = substitua coluna de x pelos termos independentes</li>
                    <li>Dy = substitua coluna de y pelos termos independentes</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">Se D=0 → Sistema não é SPD (revise SPI ou SI)</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Cadência de Cramer",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="Regra de Cramer e Determinantes"
              icone="📊"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: SISTEMAS IMPOSSÍVEIS E INDETERMINADOS                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Sistemas Impossíveis e Indeterminados"
          descricao="Domine a identificação de SI e SPI — tópico que a CESGRANRIO explora em questões de múltipla interpretação para testar a profundidade do conhecimento."
          gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Identificação de SI e SPI — Método das Proporções"
              description="A técnica mais rápida para classificar sistemas degenerados em prova."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="SI vs SPI — Diagnóstico Rápido"
              icone="🔍"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Método das Proporções",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para o sistema a₁x+b₁y=c₁ e a₂x+b₂y=c₂, calcule as razões:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono text-center">r₁ = a₁/a₂ &nbsp;&nbsp;&nbsp; r₂ = b₁/b₂ &nbsp;&nbsp;&nbsp; r₃ = c₁/c₂</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                          <span className="font-bold text-emerald-500 text-sm min-w-fit">r₁ ≠ r₂:</span>
                          <span className="text-sm">SPD — as retas têm inclinações diferentes, se cruzam em um ponto.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-amber-500/5 rounded-lg border border-amber-500/20">
                          <span className="font-bold text-amber-500 text-sm min-w-fit">r₁=r₂=r₃:</span>
                          <span className="text-sm">SPI — todas as razões iguais. Equações são múltiplas, retas coincidentes.</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-rose-500/5 rounded-lg border border-rose-500/20">
                          <span className="font-bold text-rose-500 text-sm min-w-fit">r₁=r₂≠r₃:</span>
                          <span className="text-sm">SI — coeficientes proporcionais mas termos independentes não. Retas paralelas.</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Sistemas com Parâmetro k",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A CESGRANRIO adora questões do tipo: <em>"para quais valores de k o sistema é SI/SPI?"</em>. A estratégia é:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-3">
                        <p className="text-sm font-bold text-indigo-400">Exemplo: 2x + ky = 4 e kx + 8y = 6</p>
                        <p className="text-sm">Para r₁=r₂: 2/k = k/8 → k²=16 → k=±4</p>
                        <p className="text-sm">Para k=4: r₃=4/6=2/3 e r₁=2/4=1/2 → r₁≠r₃ → <strong>SI</strong></p>
                        <p className="text-sm">Para k=−4: r₁=2/(−4)=−1/2, r₃=4/6=2/3 → SI</p>
                      </div>
                      <p>
                        Em geral, D=0 fornece os valores de k a investigar. Depois, verificamos se os determinantes secundários também são zero (SPI) ou não (SI).
                      </p>
                      <AlertBox tipo="warning" titulo="Pegadinha Clássica">
                        Candidatos tendem a parar ao encontrar D=0 e marcar "SPI". ERRADO. D=0 apenas indica que NÃO é SPD. Ainda é necessário verificar Dx e Dy. Se Dx=Dy=0 → SPI. Se algum ≠0 → SI. A distinção entre SI e SPI é frequentemente o ponto de diferenciação em provas.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Solução Geral do SPI",
                  icone: "♾️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Quando um sistema é SPI, as infinitas soluções podem ser expressas em termos de um <strong>parâmetro livre</strong>. Para x+2y=6:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm">Seja y = t (parâmetro livre, t ∈ ℝ)</p>
                        <p className="text-sm font-bold">x = 6 − 2t</p>
                        <p className="text-sm mt-2">Soluções: (6,0), (4,1), (2,2), (0,3), (−2,4)...</p>
                      </div>
                      <p>
                        Em contextos industriais, o SPI indica que as medições são redundantes — uma equação não fornece informação nova além da outra. Na prática da Petrobras, isso sinaliza que um sensor está duplicando a leitura de outro ou que uma restrição do processo está implícita em outra.
                      </p>
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
              videoId: "rVBKiBv0Eek",
              title: "Identificando Sistemas Impossíveis e Indeterminados",
              duration: "12:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Sistema Impossível (SI)", type: "Sem Solução", placeholderColor: "bg-amber-500/20" },
                { title: "Sistema Indeterminado (SPI)", type: "∞ Soluções", placeholderColor: "bg-orange-500/20" },
                { title: "Interpretação Geométrica", type: "Retas Paralelas", placeholderColor: "bg-yellow-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Detectar rapidamente:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>SI:</strong> Após eliminar variável → 0=k (k≠0) → Impossível</li>
                    <li><strong>SPI:</strong> Após eliminar variável → 0=0 (Tautologia) → Infinitas soluções</li>
                    <li><strong>Geometria:</strong> Retas paralelas (SI) vs coincidentes (SPI)</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">🎯 O grande segredo: Equações precisam ser compatíveis!</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Alerta de Impossibilidade",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Módulo Nº 5"
              icone="⚠️"
              numero={6}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: SISTEMAS COM 3 VARIÁVEIS                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Sistemas com 3 Variáveis"
          descricao="Amplie o domínio para 3 incógnitas: balanços de massa em torres de destilação, fluxos em redes de tubulação e muito mais."
          gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Escalonamento de Sistemas 3×3"
              description="O método de Gauss aplicado a três equações e três incógnitas."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Resolução de Sistemas 3×3"
              icone="3️⃣"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Ideia do Escalonamento",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para 3 equações e 3 incógnitas, o método de escalonamento (Eliminação de Gauss) reduz o sistema a uma <strong>forma triangular</strong>: primeiro elimina-se a variável x das equações 2 e 3, criando um sistema 2×2 em y e z. Depois elimina-se y da equação 3, obtendo o valor de z diretamente.
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-cyan-400 mb-1">Exemplo — Torre de Destilação REPLAN:</p>
                        <p className="text-sm font-mono">x + y + z = 1000  ... (I) — Volume total</p>
                        <p className="text-sm font-mono">2x + y     = 1200  ... (II) — Balanço ramo A</p>
                        <p className="text-sm font-mono">y + 3z     = 900   ... (III) — Balanço ramo B</p>
                        <p className="text-sm mt-2">Passo 1: De (I): z=1000−x−y. Substituindo em (III): y+3(1000−x−y)=900 → −3x−2y=−2100 → 3x+2y=2100 ... (IV)</p>
                        <p className="text-sm">Passo 2: Sistema (II) e (IV): 2x+y=1200 e 3x+2y=2100. Resolvendo: y=0, x=600, z=400.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Retrosubstituição — A Etapa Final",
                  icone: "⬆️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Após o escalonamento, obtemos a forma triangular. A <strong>retrosubstituição</strong> resolve de baixo para cima: primeiro encontra-se z (da última equação), depois y (substituindo z na penúltima), e por fim x.
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-emerald-400 mb-1">Forma triangular (escalonada):</p>
                        <p className="text-sm font-mono">ax + by + cz = d  ... Equação 1</p>
                        <p className="text-sm font-mono">     ey + fz = g   ... Equação 2 (x eliminado)</p>
                        <p className="text-sm font-mono">          hz = i   ... Equação 3 (x e y eliminados)</p>
                        <p className="text-sm mt-2">Retrosubstituição: z=i/h → y=(g−fz)/e → x=(d−by−cz)/a</p>
                      </div>
                      <p>
                        A CESGRANRIO raramente exige sistemas 3×3 com cálculos extensos. Quando aparece, geralmente fornece sistemas com coeficientes pequenos ou com uma equação simplificada (ex: z=constante) para agilizar a resolução.
                      </p>
                      <AlertBox tipo="warning" titulo="Pegadinha nos Sistemas 3×3">
                        A banca frequentemente apresenta problemas verbais que geram sistemas 3×3 mas que podem ser resolvidos por substituição direta sem escalonamento completo (ex: "A=2B e C=A+30 e A+B+C=total"). Identifique relações diretas entre variáveis antes de começar o escalonamento formal.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação: Redes de Tubulação",
                  icone: "🔧",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Uma aplicação clássica de sistemas 3×3 na Petrobras é a <strong>análise de fluxo em redes de tubulação</strong>. Em cada nó da rede, a vazão que entra deve igualar a que sai (Lei de Kirchhoff adaptada para fluidos).
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-indigo-400 mb-1">Rede de 3 tubulações (TRANSPETRO):</p>
                        <p className="text-sm">Entrada total: 500 m³/h. Ramal A recebe o triplo de B. C=A+B.</p>
                        <p className="text-sm font-mono mt-2">A + B + C = 500  (conservação)</p>
                        <p className="text-sm font-mono">A = 3B           (relação A-B)</p>
                        <p className="text-sm font-mono">C = A + B        (relação C)</p>
                        <p className="text-sm mt-2">Substituindo: 3B+B+(3B+B)=500 → 8B=500 → B=62,5; A=187,5; C=250 m³/h.</p>
                      </div>
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
              videoId: "4A8F6DWe9b8",
              title: "Sistemas 3×3: Substituição e Cramer",
              duration: "15:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Sistema 3×3 Estrutura", type: "Formato", placeholderColor: "bg-rose-500/20" },
                { title: "Escalonamento de Linhas", type: "Triangulação", placeholderColor: "bg-pink-500/20" },
                { title: "Determinante 3×3", type: "Regra de Sarrus", placeholderColor: "bg-red-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Dicas para 3×3:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Escolha a equação mais simples para isolamento primeiro</li>
                    <li>Substitua em todas as outras (reduz para 2×2)</li>
                    <li>Resolva o sistema 2×2 resultante</li>
                    <li>Retorne para encontrar a terceira variável</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">Ou use Cramer com determinante 3×3 (Regra de Sarrus)</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Dança Tripla (3×3)",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="Sistemas com 3 Variáveis"
              icone="3️⃣"
              numero={6}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: INTERPRETAÇÃO GEOMÉTRICA                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Interpretação Geométrica de Sistemas"
          descricao="Visualize sistemas lineares como interseções de retas no plano — uma perspectiva que torna intuitiva a classificação e resolução de qualquer sistema."
          gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Retas e Sistemas no Plano Cartesiano"
              description="Cada equação linear é uma reta. O sistema busca o ponto de intersecção."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Geometria dos Sistemas 2×2"
              icone="📈"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Da Equação à Reta",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Toda equação linear ax+by=c (com b≠0) define uma <strong>reta no plano cartesiano</strong>. Reescrevendo na forma reduzida:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">ax + by = c  →  y = (−a/b)x + c/b</p>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          Coeficiente angular: m = −a/b &nbsp;|&nbsp; Intercepto: b₀ = c/b
                        </p>
                      </div>
                      <p>
                        O <strong>coeficiente angular m</strong> determina a inclinação da reta: m&gt;0 sobe da esquerda para a direita, m&lt;0 desce, m=0 é horizontal. Duas retas com mesmo coeficiente angular são paralelas (ou coincidentes) — daí a condição de SI e SPI: se −a₁/b₁ = −a₂/b₂, as retas são paralelas.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-500 mb-1">m₁ ≠ m₂</p>
                          <p className="text-xs">Retas concorrentes</p>
                          <p className="text-xs text-muted-foreground">→ SPD</p>
                        </div>
                        <div className="p-3 bg-rose-500/5 rounded-lg border border-rose-500/20 text-center">
                          <p className="text-xs font-bold text-rose-500 mb-1">m₁=m₂, b₁≠b₂</p>
                          <p className="text-xs">Paralelas distintas</p>
                          <p className="text-xs text-muted-foreground">→ SI</p>
                        </div>
                        <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/20 text-center">
                          <p className="text-xs font-bold text-amber-500 mb-1">m₁=m₂, b₁=b₂</p>
                          <p className="text-xs">Retas coincidentes</p>
                          <p className="text-xs text-muted-foreground">→ SPI</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Encontrando a Intersecção Graficamente",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para encontrar graficamente a intersecção de duas retas, trace cada reta usando pelo menos dois pontos (ex: interceptos com os eixos) e identifique o ponto de cruzamento visualmente.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-3">
                        <p className="text-sm font-bold text-blue-400">Exemplo — Monitoramento de pressão na P-77:</p>
                        <p className="text-sm">Reta 1: p = 2t + 10 &nbsp;(pontos: (0,10) e (5,20))</p>
                        <p className="text-sm">Reta 2: p = −t + 40 &nbsp;(pontos: (0,40) e (10,30))</p>
                        <p className="text-sm mt-2">Igualando: 2t+10=−t+40 → 3t=30 → <strong>t=10h, p=30 bar</strong></p>
                        <p className="text-xs text-muted-foreground mt-1">A intersecção (10, 30) é o momento e a pressão de equilíbrio entre os dois dutos.</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação em Análise de Custos">
                        Dois fornecedores cobram: A = 200 + 15Q e B = 500 + 8Q (Q = quantidade de barris). A solução do sistema é o ponto de indiferença: 200+15Q=500+8Q → 7Q=300 → Q≈43 barris. Para Q&lt;43, fornecedor A é mais barato; para Q&gt;43, fornecedor B.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Sistemas 3×3 e Planos no Espaço",
                  icone: "🌐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em 3 incógnitas, cada equação representa um <strong>plano no espaço 3D</strong>. Um sistema 3×3 busca o ponto comum a três planos. Os casos são análogos ao 2D:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li><strong>SPD:</strong> três planos se cruzam em exatamente um ponto</li>
                        <li><strong>SI:</strong> dois planos paralelos (um deles não compartilha nenhum ponto com os outros)</li>
                        <li><strong>SPI:</strong> os três planos se intersectam em uma reta ou em um plano (infinitos pontos em comum)</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        A visualização 3D é mais complexa, mas os critérios algébricos (determinantes) continuam sendo a ferramenta de prova. O conceito geométrico ajuda a entender o significado físico dos resultados.
                      </p>
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
              videoId: "mQ7TwB3c_4w",
              title: "Interpretação Geométrica de Sistemas Lineares",
              duration: "11:50"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Retas Concorrentes", type: "SPD Visão", placeholderColor: "bg-indigo-500/20" },
                { title: "Retas Paralelas", type: "SI Visão", placeholderColor: "bg-blue-500/20" },
                { title: "Retas Coincidentes", type: "SPI Visão", placeholderColor: "bg-purple-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Visualizar no plano cartesiano:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>SPD:</strong> 2 retas se cruzam em 1 ponto (solução única)</li>
                    <li><strong>SPI:</strong> 2 retas são iguais (infinitos pontos de cruzamento)</li>
                    <li><strong>SI:</strong> 2 retas paralelas (nenhum cruzamento)</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">A geometria confirma: inclinação igual = paralelas ou coincidentes!</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Tela Geométrica",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Módulo Nº 7"
              icone="📈"
              numero={8}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: SISTEMAS DE INEQUAÇÕES                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Sistemas de Inequações e Programação Linear"
          descricao="Quando as restrições são 'no máximo' e 'no mínimo': domine a Programação Linear, base das decisões de otimização na indústria do petróleo."
          gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Região Viável e Programação Linear"
              description="A intersecção de semiplanos define a região onde todas as restrições são satisfeitas."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fundamentos da Programação Linear"
              icone="📊"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é um Sistema de Inequações?",
                  icone: "≤",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Enquanto um sistema de equações busca <em>igualdades</em>, um <strong>sistema de inequações</strong> define um conjunto de restrições do tipo ≤, ≥, &lt; ou &gt;. A <strong>região viável</strong> (ou região solução) é o conjunto de todos os pontos (x, y) que satisfazem TODAS as inequações simultaneamente.
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-emerald-400 mb-1">Exemplo industrial — PETROBRAS:</p>
                        <p className="text-sm">Produção de óleo (x) e gás (y) com restrições:</p>
                        <p className="text-sm font-mono">x + y ≤ 1000 (capacidade do tanque)</p>
                        <p className="text-sm font-mono">x ≥ 200      (demanda mínima de óleo)</p>
                        <p className="text-sm font-mono">y ≥ 100      (demanda mínima de gás)</p>
                        <p className="text-sm font-mono">x, y ≥ 0    (não-negatividade)</p>
                        <p className="text-xs mt-2 text-muted-foreground">A região viável é o polígono convexo definido por essas quatro restrições.</p>
                      </div>
                      <p>
                        Para traçar a região viável: (1) trace as retas de borda (igualando as inequações); (2) determine o semiplano de cada inequação (teste com a origem (0,0) ou um ponto conveniente); (3) a região viável é a intersecção de todos os semiplanos.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Otimização — Máximo e Mínimo na Região Viável",
                  icone: "🏆",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Programação Linear</strong> busca maximizar ou minimizar uma função objetivo linear P=ax+by dentro da região viável. O <strong>Teorema Fundamental da PL</strong> garante:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm font-bold text-blue-400">Teorema Fundamental:</p>
                        <p className="text-sm mt-1">Se a região viável é poligonal e limitada, a função objetivo linear atinge seu ótimo (máximo e mínimo) em um dos <strong>vértices</strong> da região.</p>
                      </div>
                      <p>
                        Estratégia de prova: (1) Identifique os vértices da região viável (intersecções das retas de borda); (2) Calcule P em cada vértice; (3) O maior valor é o máximo, o menor é o mínimo.
                      </p>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-xs font-bold text-amber-500 mb-2">Exemplo — Maximizar lucro L=3x+2y:</p>
                        <p className="text-xs">Vértice A(0,0): L=0 | Vértice B(4,0): L=12 | Vértice C(2,3): L=12 | Vértice D(0,5): L=10</p>
                        <p className="text-xs mt-1 font-bold">Máximo L=12 em B(4,0) e C(2,3).</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Quando a função objetivo é paralela a uma aresta da região viável (o máximo é atingido em dois vértices consecutivos), a questão pode pedir o máximo ou perguntar quantos pontos são ótimos. Nesse caso, TODOS os pontos da aresta são ótimos — infinitos pontos maximizam a função. A banca usa isso para testar leitura atenta do enunciado.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Programação Linear na Refinaria",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Na otimização da produção de derivados do petróleo, a Programação Linear é usada diariamente para:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li><strong>Blending de combustíveis:</strong> maximizar lucro sujeito a restrições de qualidade (octanagem, enxofre)</li>
                        <li><strong>Planejamento de produção:</strong> quanto produzir de nafta vs. diesel para maximizar receita com capacidade limitada</li>
                        <li><strong>Alocação de pessoal:</strong> minimizar custo de mão-de-obra satisfazendo requisitos mínimos de turno</li>
                        <li><strong>Transporte:</strong> minimizar custo logístico de entrega de petróleo às refinarias</li>
                      </ul>
                      <p className="text-sm text-muted-foreground">
                        Softwares como LINGO, CPLEX e até o Excel Solver resolvem esses problemas com centenas de variáveis. O fundamento matemático continua sendo o mesmo que você estuda aqui.
                      </p>
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
              videoId: "Z4jDh7iG1J0",
              title: "Sistemas de Inequações: Solução Gráfica",
              duration: "13:15"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Região de Solução", type: "Interseção", placeholderColor: "bg-emerald-500/20" },
                { title: "Semiplanos", type: "Desigualdades", placeholderColor: "bg-green-500/20" },
                { title: "Vértices da Região", type: "Pontos Críticos", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Método de solução gráfica:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Trace cada reta como se fosse equação (substitua = por ≤ ou ≥)</li>
                    <li>Escolha um ponto teste para determinar qual lado da reta</li>
                    <li>A solução é a interseção de todas as regiões (semiplanos)</li>
                    <li>Vértices são encontrados resolvendo pares de equações</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">💡 Otimização linear: máximo/mínimo ocorre em vértices!</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Zona Sombreada",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="Sistemas de Inequações"
              icone="≤"
              numero={8}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: APLICAÇÕES PETROBRAS                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aplicações Petrobras — Misturas e Balanços"
          descricao="Sistemas lineares em ação real: blending de derivados, balanços energéticos, distribuição de vazão e problemas de proporcionalidade industrial."
          gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelagem de Problemas Industriais"
              description="A arte de transformar um enunciado técnico em um sistema de equações solucionável."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Estratégias de Modelagem"
              icone="🛢️"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Problemas de Mistura — Template Universal",
                  icone: "🧪",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Problemas de mistura sempre envolvem <strong>dois tipos de componente</strong> e <strong>duas restrições</strong>: volume total e concentração da propriedade desejada. O template é sempre o mesmo:
                      </p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-amber-400 mb-1">Template de Mistura:</p>
                        <p className="text-sm font-mono">Componente A + Componente B = Volume Total</p>
                        <p className="text-sm font-mono">Conc_A × A + Conc_B × B = Conc_mix × Total</p>
                      </div>
                      <p>
                        Exemplo REPLAN: mistura de óleo pesado (12% enxofre) e leve (3% enxofre) para obter 800 L com 6% de enxofre. Sistema: P+L=800 e 0,12P+0,03L=0,06×800=48. Substituindo L=800−P: 0,12P+0,03(800−P)=48 → 0,09P=24 → P≈267 L.
                      </p>
                      <p>
                        Esta estrutura se repete em: mistura de gasolinas com diferentes octanagens, blend de naftas com densidades distintas, diluição de ácidos em laboratório de análise e combinação de correntes com temperaturas diferentes em permutadores.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Balanços de Massa e Energia",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>balanço de massa</strong> é a lei de conservação da matéria aplicada a processos industriais: <em>Entrada = Saída + Acúmulo</em>. Em regime estacionário (sem acúmulo), temos Entrada = Saída — uma equação linear simples que frequentemente compõe sistemas.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-blue-400 mb-1">Balanço numa Unidade de Destilação:</p>
                        <p className="text-sm">Entrada total: F = 1000 t/d de petróleo</p>
                        <p className="text-sm">Saídas: Nafta (N) + Gasóleo (G) + Resíduo (R)</p>
                        <p className="text-sm font-mono mt-2">N + G + R = 1000  (balanço global)</p>
                        <p className="text-sm font-mono">N = 2G            (especificação do processo)</p>
                        <p className="text-sm font-mono">R = G + 100       (fração de resíduo)</p>
                        <p className="text-sm mt-2">Resolvendo: G+2G+(G+100)=1000 → 4G=900 → G=225; N=450; R=325 t/d.</p>
                      </div>
                      <AlertBox tipo="info" titulo="Conexão com a Prova">
                        A CESGRANRIO frequentemente contextualiza sistemas lineares em balanços de produção, sempre com dois ou três componentes. Identifique as variáveis, escreva a equação de conservação total e as relações entre componentes — o sistema monta-se naturalmente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Distribuição de Vazão em Ramais Paralelos",
                  icone: "🔧",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em redes de tubulação com ramais paralelos, a <strong>vazão total se divide</strong> entre os ramais e a <strong>pressão é a mesma</strong> em cada ponto de bifurcação. Isso gera sistemas lineares diretos.
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-cyan-400 mb-1">Problema TRANSPETRO:</p>
                        <p className="text-sm">Vazão total Q=500 m³/h se divide em ramal A (Qₐ) e B (Q_b).</p>
                        <p className="text-sm">Ramal A tem resistência dupla: Qₐ = Q_b/2.</p>
                        <p className="text-sm font-mono mt-2">Qₐ + Q_b = 500</p>
                        <p className="text-sm font-mono">Qₐ = Q_b/2 → Q_b = 2Qₐ</p>
                        <p className="text-sm mt-2">Substituindo: Qₐ+2Qₐ=500 → 3Qₐ=500 → Qₐ≈167 m³/h. Q_b≈333 m³/h.</p>
                      </div>
                      <p>
                        Esta lógica se estende a redes com três ou mais ramais, formando sistemas 3×3 ou maiores. Em provas, os sistemas geralmente têm no máximo 3 ramais para manter a resolução manual viável.
                      </p>
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
              videoId: "tM_JEGxWnvQ",
              title: "Sistemas Lineares em Engenharia: Fluxo em Redes",
              duration: "14:40"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Fluxo em Oleodutos", type: "Rede de Tubos", placeholderColor: "bg-cyan-500/20" },
                { title: "Balanço de Massa", type: "Conservação", placeholderColor: "bg-blue-500/20" },
                { title: "Otimização de Rotas", type: "Distribuição", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Aplicações reais em Petrobras:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Fluxo em Redes:</strong> Quantidade de óleo em cada tubulação</li>
                    <li><strong>Balanço de Massa:</strong> O que entra = o que sai em cada nó</li>
                    <li><strong>Alocação de Produção:</strong> Otimizar distribuição entre campos</li>
                    <li><strong>Bombeamento:</strong> Pressões e vazões em cada etapa</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">🎯 Cada nó = uma equação de conservação!</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Fluxo na Petrobras",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Módulo Nº 9"
              icone="🛢️"
              numero={10}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 10: SIMULADO CESGRANRIO                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado Final CESGRANRIO"
          descricao="Questões no padrão exato da banca: sistemas lineares, Cramer, classificação, inequações e aplicações industriais — tudo integrado em um simulado definitivo."
          gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Estratégica — Os 10 Pontos-Chave"
              description="O roteiro de revisão que cobre 95% dos padrões de questão da CESGRANRIO em Sistemas Lineares."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Checklist Final para a Prova"
              icone="✅"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Pontos 1 a 5 — Fundamentos",
                  icone: "1️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex gap-3 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                          <span className="font-bold text-emerald-500 min-w-fit">1.</span>
                          <span className="text-sm"><strong>Classificação rápida:</strong> calcule D. Se D≠0→SPD. Se D=0, verifique Dx e Dy para distinguir SI de SPI.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                          <span className="font-bold text-blue-500 min-w-fit">2.</span>
                          <span className="text-sm"><strong>Substituição:</strong> priorize a equação com coeficiente 1 ou −1. Sempre verifique a solução nas equações originais.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-amber-500/5 rounded-lg border border-amber-500/20">
                          <span className="font-bold text-amber-500 min-w-fit">3.</span>
                          <span className="text-sm"><strong>Adição:</strong> ao multiplicar por escalar negativo, lembre-se de mudar o sinal do termo independente também.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/20">
                          <span className="font-bold text-cyan-500 min-w-fit">4.</span>
                          <span className="text-sm"><strong>Cramer:</strong> Dx substitui a coluna de x pelos termos independentes. Dy substitui a coluna de y. x=Dx/D, y=Dy/D.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20">
                          <span className="font-bold text-indigo-500 min-w-fit">5.</span>
                          <span className="text-sm"><strong>Proporções:</strong> r₁=a₁/a₂, r₂=b₁/b₂, r₃=c₁/c₂. r₁≠r₂→SPD; r₁=r₂=r₃→SPI; r₁=r₂≠r₃→SI.</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pontos 6 a 10 — Aplicações e Armadilhas",
                  icone: "6️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex gap-3 p-3 bg-rose-500/5 rounded-lg border border-rose-500/20">
                          <span className="font-bold text-rose-500 min-w-fit">6.</span>
                          <span className="text-sm"><strong>Problemas de mistura:</strong> equação 1 = volume total. Equação 2 = propriedade × volume. Sempre substitua e verifique.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                          <span className="font-bold text-emerald-500 min-w-fit">7.</span>
                          <span className="text-sm"><strong>Sistemas 3×3:</strong> procure relações diretas entre variáveis antes de escalonar. Ex: A=2B economiza uma equação.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                          <span className="font-bold text-blue-500 min-w-fit">8.</span>
                          <span className="text-sm"><strong>Inequações:</strong> o ótimo da PL sempre está em um vértice. Calcule a função objetivo em todos os vértices.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-amber-500/5 rounded-lg border border-amber-500/20">
                          <span className="font-bold text-amber-500 min-w-fit">9.</span>
                          <span className="text-sm"><strong>Parâmetro k:</strong> D=0 dá os valores de k. Depois teste em Dx e Dy para classificar como SI ou SPI.</span>
                        </div>
                        <div className="flex gap-3 p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/20">
                          <span className="font-bold text-indigo-500 min-w-fit">10.</span>
                          <span className="text-sm"><strong>A questão pede x+y, não x ou y separadamente.</strong> Leia com atenção — em 40% dos casos a resposta é uma combinação das incógnitas.</span>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Armadilha Final CESGRANRIO">
                        Quando a banca apresenta um sistema com números grandes ou frações, frequentemente existe um atalho: somar ou subtrair as equações diretamente pode dar o valor de x+y (ou x−y) sem calcular x e y individualmente. Ex: sistema 3x+2y=23 e 2x+3y=22 → somando: 5x+5y=45 → x+y=9. Se a questão pede x+y, você resolveu em 5 segundos!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Gabarito Mental — Fluxo de Decisão",
                  icone: "🧭",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Diante de qualquer questão de Sistemas Lineares na CESGRANRIO, siga este fluxo de decisão:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 space-y-3">
                        <p className="text-sm font-bold text-indigo-400">Fluxo de Resolução:</p>
                        <p className="text-sm">1. O sistema é classificado ou precisa ser resolvido?</p>
                        <p className="text-sm text-muted-foreground pl-4">→ Se classificação: use método das proporções ou D</p>
                        <p className="text-sm">2. Se precisa resolver: algum coef. é 1 ou −1?</p>
                        <p className="text-sm text-muted-foreground pl-4">→ Sim: use substituição | Não: use adição ou Cramer</p>
                        <p className="text-sm">3. A questão pede x, y, ou uma combinação?</p>
                        <p className="text-sm text-muted-foreground pl-4">→ Se x+y: tente somar as equações diretamente</p>
                        <p className="text-sm">4. Sempre verifique a solução nas equações originais antes de marcar.</p>
                      </div>
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
              videoId: "9Kxj3pDQVmk",
              title: "Revisão Completa: Sistemas Lineares",
              duration: "16:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Sistemas Lineares",
              materia: "Matemática",
              images: [
                { title: "Todos os Métodos", type: "Comparação", placeholderColor: "bg-blue-500/20" },
                { title: "Classificação Final", type: "SPD/SPI/SI", placeholderColor: "bg-indigo-500/20" },
                { title: "Estratégia de Prova", type: "Dicas CESGRANRIO", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato - Revisão Total",
              content: (
                <div className="space-y-3">
                  <p className="font-semibold">Checklist antes da prova:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Substituição: melhor quando há coeficiente 1 ou −1</li>
                    <li>Adição: multiplica para eliminar uma variável</li>
                    <li>Cramer: usa determinantes (se D≠0)</li>
                    <li>Geometria: visualiza a solução como retas</li>
                    <li>Aplicações: reconheça fluxos e balanços</li>
                  </ul>
                  <p className="font-semibold text-sm mt-2">⭐ Na dúvida: use Adição! É o mais confiável e rápido!</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Hino de Revisão (10 Módulos)",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Final CESGRANRIO"
              icone="🏆"
              numero={10}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
