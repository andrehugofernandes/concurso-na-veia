import React from "react";
import {
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Target,
  Award,
} from "lucide-react";
import {
  ContentAccordion,
  QuizInterativo,
  QuizQuestion,
  AulaTemplate,
  FlipCard,
  AlertBox,
  ModuleBanner,
  ModuleSectionHeader,
  CardCarousel,
} from "../shared";
import {
  LuShuffle,
  LuLibrary,
  LuLightbulb,
  LuShieldCheck,
  LuBookOpen,
  LuTrophy,
  LuDivide,
  LuZap,
  LuFileSearch,
  LuTriangle,
  LuCheck,
  LuTrendingUp,
  LuSearch,
  LuFileText,
} from "react-icons/lu";
import { TabsContent } from "@/components/ui/tabs";

export default function AulaProbabilidade({
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
}: any) {
  // OBS: Substituindo any progressivamente e fazendo dummy mock temporario de abas para o Template não quebrar.
  // Como AulaTemplate exige controle de Tabs, injetamos mocks (similares à aula de exp)
  const [activeTab, setActiveTab] = React.useState("modulo-1");
  const completedModules = new Set<string>([]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Lei de Laplace" },
    { id: "modulo-3", label: "Módulo 3", titulo: "União e Interseção" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Probabilidades Sucessivas" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Probabilidade Binomial" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Poisson e Normal" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Técnicas de Resolução" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Glossário do Mestre" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Engenharia de Riscos" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Desafio Final" },
  ];

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={() => true}
      titulo={titulo || "Probabilidade"}
      descricao={
        descricao ||
        "Do acaso à certeza: domine as leis que regem os eventos aleatórios, da teoria de conjuntos às pegadinhas da CESGRANRIO."
      }
      duracao={duracao || "45 min"}
      materiaNome={materiaNome || "Matemática"}
      materiaCor={materiaCor || "bg-brand-primary"}
      materiaId={materiaId || "matematica"}
      isCompleted={!!isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      <TabsContent value="modulo-1" className="space-y-[50px]">
        {/* MÓDULO 1: Fundamentos da Probabilidade */}
        <ModuleBanner
          numero={1}
          titulo="Fundamentos da Probabilidade"
          descricao="O alicerce da incerteza. Domine Experimentos Aleatórios, Espaço Amostral e Eventos."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />

        {/* Introdução Motivacional */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <Target className="w-6 h-6 text-brand-primary" />O que você vai
            aprender
          </h3>
          <p className="text-slate-600 dark:text-foreground/70 leading-relaxed">
            Probabilidade não é adivinhação, é a{" "}
            <strong>matemática da incerteza</strong>. Nas provas da CESGRANRIO,
            as questões não pedirão apenas para você jogar moedas para o alto;
            elas pedirão para você calcular as chances de uma peça na linha de
            produção da Petrobras apresentar falhas sob determinadas condições.
            Vamos dominar os fundamentos para nunca mais perder pontos com
            terminologias.
          </p>
        </div>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader
            index={1}
            title="A Base Intelectual"
            description="Antes de calcular, você precisa entender a linguagem. Sem isso, a banca te engana com enunciados elegantes."
            variant="indigo"
            className="mb-8"
          />

          {/* ACORDEON 1: A Trindade Probabilística */}
          <ContentAccordion
            titulo="🏗️ A Trindade Probabilística"
            icone={<BookOpen className="w-5 h-5" />}
            corIndicador="bg-indigo-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Experimento Aleatório",
                icone: "🎲",
                conteudo: (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-indigo-400 font-bold text-xs uppercase tracking-widest">
                        Conceituação
                      </h5>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        É qualquer processo de coleta de dados governado pelo{" "}
                        <strong>acaso</strong>. A repetição sob as mesmas
                        condições não garante o mesmo resultado. No mundo
                        Petrobras, isso é a base da análise de risco
                        operacional.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                        <p className="text-xs font-bold text-red-500 mb-2">
                          ❌ Visão Determinística
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          "Toda vez que eu furar este campo exato, encontrarei
                          10 mil barris." (Falso: o solo é incerto).
                        </p>
                      </div>
                      <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                        <p className="text-xs font-bold text-green-500 mb-2">
                          ✅ Visão Aleatória
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          "Ao furar este campo, há uma <strong>chance</strong>{" "}
                          calculada de encontrar óleo baseada em dados
                          sísmicos."
                        </p>
                      </div>
                    </div>
                    <AlertBox tipo="warning" titulo="Macete de Prova">
                      Se o resultado é previsível (ex: 2 + 2), o experimento é{" "}
                      <strong>Determinístico</strong>. Se há dúvida, é{" "}
                      <strong>Aleatório</strong>.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "2. Espaço Amostral (S)",
                icone: "🌌",
                conteudo: (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-indigo-400 font-bold text-xs uppercase tracking-widest">
                        O Universo de Possibilidades
                      </h5>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        É o conjunto de <strong>todos</strong> os resultados
                        possíveis. Se você esquece um elemento aqui, o seu
                        denominador (n(S)) estará errado e a questão cai por
                        terra.
                      </p>
                    </div>
                    <div className="bg-slate-800 dark:bg-slate-900 rounded-2xl p-6 border border-border/20 dark:border-white/5 font-mono text-[10px]">
                      <span className="text-indigo-400">
                        // Exemplo: Lançar uma moeda 2 vezes
                      </span>
                      <br />
                      <span className="text-muted-foreground">
                        S = {"{"}(Cara, Cara), (Cara, Coroa), (Coroa, Cara),
                        (Coroa, Coroa){"}"}
                      </span>
                      <br />
                      <span className="text-emerald-400">n(S) = 4</span>
                    </div>
                    <AlertBox tipo="info" titulo="Dica de Ouro">
                      Para 'n' moedas, n(S) = 2ⁿ. Para 'n' dados, n(S) = 6ⁿ.
                      Guarde essas potências!
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "3. O Evento (E)",
                icone: "🎯",
                conteudo: (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h5 className="text-indigo-400 font-bold text-xs uppercase tracking-widest">
                        O Foco do Desejo
                      </h5>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        É qualquer subconjunto do Espaço Amostral. É "o que eu
                        quero" na questão.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 mb-1">
                          Evento Impossível
                        </p>
                        <p className="text-[10px] text-muted-foreground/70 italic">
                          P = 0 (Ex: Sair 7 em um dado de 6 faces).
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-1">
                          Evento Certo
                        </p>
                        <p className="text-[10px] text-muted-foreground/70 italic">
                          P = 1 (Ex: Sair um número menor que 7 no dado).
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />

          {/* ACORDEON 2: Relações e Terminologias */}
          <ContentAccordion
            titulo="🔍 Relações e Terminologias de Elite"
            icone={<LuShieldCheck className="w-5 h-5" />}
            corIndicador="bg-brand-primary"
            defaultOpen={false}
            slides={[
              {
                titulo: "Eventos Independentes",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Dois eventos são independentes quando a ocorrência de um{" "}
                      <strong>não altera</strong> a probabilidade do outro.
                    </p>
                    <div className="p-4 bg-brand-primary/10 rounded-xl border border-brand-primary/20 flex items-center justify-between">
                      <p className="text-xs font-mono">
                        P(A ∩ B) = P(A) · P(B)
                      </p>
                      <span className="px-2 py-0.5 bg-brand-primary text-white text-[9px] rounded-full">
                        REGRA DO 'E'
                      </span>
                    </div>
                    <AlertBox tipo="danger" titulo="Cuidado!">
                      A Cesgranrio ama confundir 'Independentes' com 'Mutuamente
                      Exclusivos'. Se eles são independentes, a chance da
                      interseção existe e é o produto das chances individuais.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Complementar",
                icone: "🌓",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      O evento complementar (A') é o "não A". É tudo o que falta
                      para completar o 100%.
                    </p>
                    <div className="p-6 bg-slate-800 dark:bg-slate-900 rounded-2xl text-center border border-border/20 dark:border-white/5">
                      <p className="text-brand-primary font-mono text-lg">
                        P(A) + P(A') = 1
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground/70 italic">
                      Dica: Se a questão pede 'Pelo menos um', use sempre o
                      complementar 1 - P(Nenhum).
                    </p>
                  </div>
                ),
              },
            ]}
          />
          <ModuleSectionHeader
            index={2}
            title="O Caminho do Especialista"
            description="Visualize seu progresso e os níveis de domínio necessários para a aprovação."
            variant="blue"
            className="mt-20 mb-10"
          />

          <div className="p-12 bg-muted/30 dark:bg-slate-900/50 rounded-[3.5rem] border border-border/20 dark:border-white/5 shadow-inner">
            <CardCarousel
              titulo="Road-Map: Jornada Petrobras"
              subtitulo="Gire os cards para ver o foco de cada nível."
              itemsPerView={2}
              cards={[
                {
                  icone: <LuBookOpen />,
                  titulo: "Nível 0: Base",
                  descricao: (
                    <FlipCard
                      frente={
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                          <LuBookOpen className="w-12 h-12 text-brand-primary opacity-50" />
                          <h6 className="text-xl font-bold uppercase tracking-tight text-white">
                            Nível 0: Vocabulário
                          </h6>
                          <p className="text-sm text-muted-foreground">
                            Qual a diferença real entre Experimento e Evento?
                          </p>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 text-left">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-border/30 dark:border-white/10 pb-2">
                            <LuCheck /> <span>Explicação Master</span>
                          </div>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            <strong>Experimento:</strong> É a ação (ex: Furar um
                            poço).
                            <br />
                            <strong>Evento:</strong> É o resultado (ex:
                            Encontrar Óleo).
                            <br />
                            <br />
                            Na Cesgranrio, identificar o{" "}
                            <strong>Espaço Amostral</strong> corretamente é 50%
                            da questão. Se você errar o "Universo", o cálculo
                            morre.
                          </p>
                          <div className="p-3 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                            <p className="text-[10px] italic text-brand-primary">
                              Dica: O Evento é sempre um subconjunto do Espaço
                              Amostral.
                            </p>
                          </div>
                        </div>
                      }
                      categoria="Fundamentos"
                    />
                  ),
                },
                {
                  icone: <Target />,
                  titulo: "Nível 1: Laplace",
                  descricao: (
                    <FlipCard
                      frente={
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                          <Target className="w-12 h-12 text-blue-500 opacity-50" />
                          <h6 className="text-xl font-bold uppercase tracking-tight text-white">
                            Nível 1: Laplace
                          </h6>
                          <p className="text-sm text-muted-foreground">
                            Como calcular sem se perder em enunciados longos?
                          </p>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 text-left">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-border/30 dark:border-white/10 pb-2">
                            <LuCheck /> <span>Regra de Ouro</span>
                          </div>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            90% das questões usam:{" "}
                            <strong>P = Favoráveis / Totais</strong>.<br />
                            <br />A banca ama dar números em{" "}
                            <strong>porcentagem</strong> para você converter ou
                            usar frações equivalentes. Treine simplificação!
                          </p>
                          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <p className="text-[10px] italic text-blue-400">
                              Ex: 12 de 60 = 1/5 = 20%.
                            </p>
                          </div>
                        </div>
                      }
                      categoria="Cálculo Básico"
                    />
                  ),
                },
                {
                  icone: <LuFileSearch />,
                  titulo: "Nível 2: Bayes",
                  descricao: (
                    <FlipCard
                      frente={
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                          <LuFileSearch className="w-12 h-12 text-blue-400 opacity-50" />
                          <h6 className="text-xl font-bold uppercase tracking-tight text-white">
                            Nível 2: Bayes
                          </h6>
                          <p className="text-sm text-muted-foreground">
                            O que muda quando dizem "Sabendo que..."?
                          </p>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 text-left">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-border/30 dark:border-white/10 pb-2">
                            <LuCheck /> <span>Espaço Reduzido</span>
                          </div>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            Probabilidade Condicional é apenas um{" "}
                            <strong>Espaço Amostral menor</strong>.<br />
                            <br />
                            Se sabemos que a peça é defeituosa, nosso universo
                            agora são <strong>apenas as defeituosas</strong>. O
                            denominador encolhe.
                          </p>
                          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <p className="text-[10px] italic text-blue-300">
                              Fórmula: P(A|B) = P(A ∩ B) / P(B)
                            </p>
                          </div>
                        </div>
                      }
                      categoria="Intermediário"
                    />
                  ),
                },
                {
                  icone: <LuZap />,
                  titulo: "Nível 3: Binomial",
                  descricao: (
                    <FlipCard
                      frente={
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                          <LuZap className="w-12 h-12 text-emerald-500 opacity-50" />
                          <h6 className="text-xl font-bold uppercase tracking-tight text-white">
                            Nível 3: Mestria
                          </h6>
                          <p className="text-sm text-muted-foreground">
                            Sucessos em série na linha de produção.
                          </p>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 text-left">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-border/30 dark:border-white/10 pb-2">
                            <LuCheck /> <span>Poder Analítico</span>
                          </div>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            Cenário avançado: Qual a chance de ter 3 falhas em
                            10 válvulas? Aplique a{" "}
                            <strong>Distribuição Binomial</strong> e Garanta sua
                            vaga.
                          </p>
                          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                            <p className="text-[10px] font-mono text-emerald-400">
                              P(k) = C(n,k) · pᵏ · qⁿ⁻ᵏ
                            </p>
                          </div>
                        </div>
                      }
                      categoria="Avançado"
                    />
                  ),
                },
              ]}
            />
          </div>
        </section>
      </TabsContent>

      <TabsContent value="modulo-2" className="space-y-[50px]">
        {/* MÓDULO 2: Lei de Laplace */}
        <ModuleBanner
          numero={2}
          titulo="Lei de Laplace: O Cálculo Soberano"
          descricao="A fórmula primordial que sustenta 90% das questões básicas da CESGRANRIO."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="A Lei de Laplace: Ouro das Provas"
            description="Entenda como calcular probabilidades em cenários ideais (equiprováveis) com precisão técnica."
            variant="blue"
            className="mb-8"
          />

          <div className="relative group overflow-hidden bg-slate-800 dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-12 text-center text-white shadow-2xl transition-all hover:shadow-brand-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <h3 className="text-brand-primary font-mono text-xs tracking-[0.3em] uppercase mb-10 font-black">
              Fórmula Soberana de Probabilidade
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="text-blue-400/50 text-[10px] uppercase font-bold mb-2">
                  Evento Desejado
                </div>
                <div className="text-5xl md:text-7xl font-black font-mono text-white">
                  n(A)
                </div>
              </div>
              <div className="text-4xl font-light text-slate-700">/</div>
              <div className="flex flex-col items-center">
                <div className="text-slate-500 text-[10px] uppercase font-bold mb-2">
                  Universo Total
                </div>
                <div className="text-5xl md:text-7xl font-black font-mono text-muted-foreground">
                  n(S)
                </div>
              </div>
            </div>
            <div className="mt-12 p-4 bg-white/5 rounded-2xl border border-white/10 inline-block">
              <p className="text-sm font-mono text-slate-300">
                P(A) = Favoráveis / Possíveis
              </p>
            </div>
          </div>

          <ContentAccordion
            titulo="💎 Imersão: A Prática de Laplace"
            icone={<LuZap className="w-5 h-5" />}
            corIndicador="bg-blue-500"
            slides={[
              {
                titulo: "A Escala Digital",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-slate-300">
                      A probabilidade é um percentual disfarçado de fração. Ela
                      NUNCA foge do intervalo [0, 1].
                    </p>
                    <div className="p-6 bg-muted/30 dark:bg-slate-900/50 rounded-3xl border border-border/20 dark:border-white/5">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] text-rose-500 font-bold">
                          0 (IMPOSSÍVEL)
                        </span>
                        <span className="text-[10px] text-amber-500 font-bold">
                          0.5 (RANDOM)
                        </span>
                        <span className="text-[10px] text-emerald-500 font-bold">
                          1 (CERTO)
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 w-full opacity-50" />
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Case: Falha em Válvulas",
                icone: "🔧",
                conteudo: (
                  <div className="space-y-4">
                    <h5 className="text-blue-400 font-bold text-xs uppercase">
                      Cenário Petrobras (Simulado Cesgranrio)
                    </h5>
                    <p className="text-sm text-slate-300 bg-black/20 p-4 rounded-xl italic">
                      "Em um lote de 80 válvulas de pressão, 12 foram reprovadas
                      no teste de estanqueidade. Qual a chance de escolhermos
                      uma ao acaso e ela ser APROVADA?"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
                        <p className="text-[10px] text-slate-500">n(S)</p>
                        <p className="font-bold text-white">80</p>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
                        <p className="text-[10px] text-slate-500">n(A)</p>
                        <p className="font-bold text-emerald-400">68</p>
                      </div>
                      <div className="p-3 bg-brand-primary/20 border border-brand-primary/30 rounded-xl text-center">
                        <p className="text-[10px] text-brand-primary">P(A)</p>
                        <p className="font-bold text-white">85%</p>
                      </div>
                    </div>
                    <AlertBox tipo="info" titulo="O Pulo do Gato">
                      Note que o enunciado deu as reprovadas para você calcular
                      as aprovadas. A banca SEMPRE faz isso!
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />

          <div className="p-8 bg-muted/30 dark:bg-slate-900/50 rounded-[3rem] border border-border/20 dark:border-white/5 space-y-6">
            <div className="flex items-center gap-4 border-b border-border/30 dark:border-white/10 pb-4">
              <LuLightbulb className="w-8 h-8 text-amber-400" />
              <div>
                <h4 className="font-bold text-white uppercase italic">
                  Dicas de Mestre & Exceções
                </h4>
                <p className="text-xs text-slate-500">
                  O que os livros não te contam.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h6 className="text-emerald-400 font-bold text-sm">
                  Exceção: Espaço Viciado
                </h6>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Laplace <strong>falha</strong> se o dado for viciado. Se o
                  enunciado diz 'moeda honesta' ou 'escolha aleatória', Laplace
                  está liberado. Se houver peso, use Probabilidade Ponderada.
                </p>
              </div>
              <div className="space-y-3">
                <h6 className="text-blue-400 font-bold text-sm">
                  Regra do Complementar
                </h6>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Em vez de calcular 'pelo menos um', calcule 'nenhum' e
                  subtraia de 1. É 10x mais rápido em provas da Cesgranrio.
                </p>
              </div>
            </div>
          </div>

          <QuizInterativo
            titulo="Desafio de Laplace"
            icone="⚡"
            numero={2.1}
            descricao="Aplicação direta da Lei de Laplace em contextos técnicos."
            questoes={[
              {
                id: 201,
                pergunta:
                  "Em uma urna com 5 bolas azuis e 3 vermelhas, sorteamos duas bolas SEM reposição. Qual a probabilidade de ambas serem azuis?",
                opcoes: [
                  { label: "A", valor: "5/14" },
                  { label: "B", valor: "25/64" },
                  { label: "C", valor: "5/8" },
                  { label: "D", valor: "15/56" },
                ],
                correta: "5/14",
                explicacao:
                  "Primeira azul: 5/8. Como é SEM reposição, restam 7 bolas no total e 4 azuis. Segunda azul: 4/7. P = (5/8) * (4/7) = 20/56 = 5/14. O segredo da Cesgranrio é mudar o n(S) no meio da questão!",
              },
            ]}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-3" className="space-y-[50px]">
        {/* MÓDULO 3: União e Interseção */}
        <ModuleBanner
          numero={3}
          titulo="União e Interseção: O Peso do 'OU'"
          descricao="A transição lógica entre a soma e a subtração estratégica de elementos."
          gradiente="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={3}
            title="A Lógica da União: O Poder do 'OU'"
            description="Entenda como eventos podem se sobrepor e como calcular a probabilidade de que PELO MENOS um deles ocorra."
            variant="amber"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-slate-700 dark:text-foreground/70 leading-relaxed">
                Na linguagem Cesgranrio, o conectivo <strong>'OU'</strong> é o
                sinal para somar. Mas cuidado: se houver interseção, você deve
                subtraí-la.
              </p>
              <div className="relative group overflow-hidden bg-slate-800 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-border/20 dark:border-white/5 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h5 className="text-amber-400 font-mono text-[10px] uppercase tracking-widest mb-4">
                  Fórmula da União
                </h5>
                <p className="text-white font-mono text-2xl md:text-3xl text-center relative z-10">
                  P(A ∪ B) = P(A) + P(B){" "}
                  <span className="text-rose-500">- P(A ∩ B)</span>
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="text-[10px] text-amber-200 italic">
                      "Se você não subtrair a interseção, estará contando as
                      mesmas pessoas duas vezes."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_70%)]" />
              <div className="relative flex items-center justify-center scale-110">
                <div className="w-32 h-32 rounded-full border-2 border-blue-500 bg-blue-500/5 flex items-center justify-center text-blue-400 font-black animate-pulse-slow">
                  A
                </div>
                <div className="w-32 h-32 rounded-full border-2 border-rose-500 bg-rose-500/5 -ml-12 flex items-center justify-center text-rose-400 font-black">
                  B
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-500/20 rounded-full blur-xl animate-ping" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-mono text-[10px] bg-background/80 dark:bg-slate-900/80 px-2 py-1 rounded-md border border-white/10 z-20">
                  A ∩ B
                </span>
              </div>
            </div>
          </div>

          <ContentAccordion
            titulo="Imersão: Conjuntos e Sobreposições"
            icone={<LuShuffle className="w-5 h-5" />}
            corIndicador="bg-amber-500"
            slides={[
              {
                titulo: "Eventos Disjuntos",
                icone: "🚫",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      Quando a interseção é <strong>Vazia (Zero)</strong>.
                      Eventos que não podem ocorrer simultaneamente.
                    </p>
                    <div className="p-4 bg-muted/30 dark:bg-slate-900/50 rounded-2xl border border-border/20 dark:border-white/5 font-mono text-center">
                      <p className="text-amber-400">P(A ∪ B) = P(A) + P(B)</p>
                    </div>
                    <AlertBox tipo="info" titulo="Exemplo Prático">
                      Sair 5 OU sair 6 no lançamento de um dado. É impossível
                      sair os dois ao mesmo tempo.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "A União Tripla (A ∪ B ∪ C)",
                icone: "�",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      O "Cão de Guarda" das provas de Engenharia. A fórmula
                      compensa todas as sobreposições.
                    </p>
                    <div className="p-6 bg-slate-950 rounded-2xl border border-border/20 dark:border-white/5 overflow-x-auto">
                      <p className="text-xs font-mono text-white whitespace-nowrap">
                        P(A∪B∪C) = P(A)+P(B)+P(C) <br />
                        <span className="text-rose-400">
                          - [P(A∩B)+P(A∩C)+P(B∩C)]
                        </span>{" "}
                        <br />
                        <span className="text-emerald-400">+ P(A∩B∩C)</span>
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground/70 italic">
                      Dica: Desenhe o diagrama de 3 círculos e comece
                      preenchendo SEMPRE pelo centro (tripla interseção).
                    </p>
                  </div>
                ),
              },
              {
                titulo: "O Macete de Venn",
                icone: "�",
                conteudo: (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                        <p className="text-[10px] text-blue-400 uppercase font-black mb-1">
                          Somente A
                        </p>
                        <p className="text-xs text-white">P(A) - P(A ∩ B)</p>
                      </div>
                      <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                        <p className="text-[10px] text-rose-400 uppercase font-black mb-1">
                          Somente B
                        </p>
                        <p className="text-xs text-white">P(B) - P(A ∩ B)</p>
                      </div>
                    </div>
                    <AlertBox tipo="warning" titulo="Atenção ao Texto">
                      Se o enunciado diz "Qual a chance de ocorrer APENAS um dos
                      eventos", você deve somar as partes externas e EXCLUIR a
                      interseção.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />

          <div className="p-8 bg-muted/30 dark:bg-slate-900/50 rounded-[3rem] border border-border/20 dark:border-white/5 space-y-6">
            <div className="flex items-center gap-4 border-b border-border/30 dark:border-white/10 pb-4">
              <LuLightbulb className="w-8 h-8 text-amber-400" />
              <div>
                <h4 className="font-bold text-white uppercase italic">
                  Dicas Master de União
                </h4>
                <p className="text-xs text-slate-500">
                  Padrões de pegadinha Cesgranrio.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-display">
              <div className="space-y-2">
                <h6 className="text-amber-500 font-bold text-sm uppercase">
                  O 'OU' Exclusivo
                </h6>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Se a banca usar "Ou A ou B (mas não ambos)", você está diante
                  de uma Diferença Simétrica. O cálculo é: (P(A)+P(B)) -
                  2*P(A∩B).
                </p>
              </div>
              <div className="space-y-2">
                <h6 className="text-blue-400 font-bold text-sm uppercase">
                  Pelo Menos Um
                </h6>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sempre que ler 'Pelo menos um', 99% das vezes o caminho mais
                  rápido é 1 - P(Nenhum). Não gaste tempo somando uniões
                  infinitas.
                </p>
              </div>
            </div>
          </div>

          <QuizInterativo
            titulo="Check-point: União de Eventos"
            icone="🔥"
            numero={3.1}
            descricao="Teste seu raciocínio lógico em sobreposição de eventos."
            questoes={[
              {
                id: 301,
                pergunta:
                  "Em um grupo de 100 técnicos da Petrobras, 60 conhecem o protocolo A, 50 conhecem o protocolo B e 20 conhecem ambos. Escolhendo um ao acaso, qual a chance de ele conhecer APENAS o protocolo A?",
                opcoes: [
                  { label: "A", valor: "60%" },
                  { label: "B", valor: "40%" },
                  { label: "C", valor: "20%" },
                  { label: "D", valor: "30%" },
                ],
                correta: "40%",
                explicacao:
                  "Para saber quem conhece APENAS o A, pegamos o total de A (60) e subtraímos quem conhece ambos (20). 60 - 20 = 40. Resposta: 40%.",
              },
            ]}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-4" className="space-y-[50px]">
        {/* MÓDULO 4: Probabilidades Sucessivas */}
        <ModuleBanner
          numero={4}
          titulo="Sucessão e Condição: A Informação Muda Tudo"
          descricao="O impacto de eventos passados no resultado do futuro e o poder do Teorema de Bayes."
          gradiente="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="A Dependência dos Eventos: P(A|B)"
            description="Quando o 'E' vira multiplicação e o 'Dado que' vira redução de espaço amostral."
            variant="emerald"
            className="mb-8"
          />

          <div className="bg-slate-800 dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mt-48 -mr-48" />
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="flex flex-col items-center gap-6 bg-white/5 p-10 rounded-[2.5rem] border border-white/10 shrink-0 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                <h6 className="text-[10px] text-emerald-400 font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                  Notação de Bayes
                </h6>
                <span className="text-7xl font-serif text-white italic">P(A|B)</span>
                <div className="h-px w-20 bg-white/10" />
                <p className="text-slate-500 text-[10px] text-center italic max-w-[120px]">
                  "Chance de A ocorrer, sabendo que B já é fato."
                </p>
              </div>
              <div className="space-y-6">
                <h5 className="text-3xl font-bold text-white tracking-tight">
                  Redução do Espaço Amostral
                </h5>
                <p className="text-slate-400 leading-relaxed">
                  Esqueça o universo total <strong>S</strong>. Em P(A|B), o seu novo mundo é apenas <strong>B</strong>. Você só conta os elementos de A que estão dentro desse novo território.
                </p>
                <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 shadow-inner">
                   <p className="text-white font-mono text-xl flex items-center gap-3">
                      P(A|B) = 
                      <span className="flex flex-col items-center">
                        <span className="border-b border-white/20 pb-1">P(A ∩ B)</span>
                        <span className="pt-1 text-emerald-400">P(B)</span>
                      </span>
                   </p>
                </div>
              </div>
            </div>
          </div>

          <ContentAccordion
            titulo="Fluxo de Decisão e Bayes"
            icone={<LuFileSearch className="w-5 h-5" />}
            corIndicador="bg-emerald-500"
            slides={[
              {
                titulo: "A Árvore de Eventos",
                icone: "🌳",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      Ideal para eventos <strong>Sucessivos</strong>. Multiplique as chances ao longo dos galhos e some os resultados finais.
                    </p>
                    <div className="p-5 bg-slate-800 dark:bg-slate-900 border border-border/20 dark:border-white/5 rounded-2xl flex flex-col gap-2 font-mono text-[11px]">
                       <div className="flex items-center gap-2 text-emerald-400">
                          <span>[Início]</span>
                          <span className="text-slate-600">--0.7--{`>`}</span>
                          <span>[OK]</span>
                       </div>
                       <div className="flex items-center gap-2 text-rose-400">
                          <span>[Início]</span>
                          <span className="text-slate-600">--0.3--{`>`}</span>
                          <span>[Falha]</span>
                       </div>
                    </div>
                    <AlertBox tipo="info" titulo="Macete da Árvore">
                      Galho horizontal = Multiplica. <br/>
                      Final de galhos distintos = Soma.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Inversão de Bayes",
                icone: "🧬",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      O "Raciocínio Forense": Você já viu o efeito e quer saber qual foi a causa mais provável.
                    </p>
                    <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 text-center">
                       <p className="text-[10px] text-emerald-500 uppercase font-black mb-3">Fórmula Master</p>
                       <p className="text-white font-mono text-xs">P(C|E) = [P(E|C)·P(C)] / P(E Total)</p>
                    </div>
                    <AlertBox tipo="warning" titulo="Exemplo Petrobras">
                      Se uma sonda detecta gás (Efeito), qual a chance de realmente haver gás (Causa) considerando a precisão do equipamento?
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />

          <QuizInterativo
            titulo="Check-point: Probabilidade Condicional"
            icone="⚡"
            numero={4.1}
            descricao="Desafio técnico em inspeção e Bayes."
            questoes={[
              {
                id: 401,
                pergunta: "Uma máquina tem duas bombas independentes. A chance da bomba 1 falhar é 10%. Se a bomba 1 falhou, a chance da bomba 2 falhar (devido ao estresse) sobe para 30%. Qual a probabilidade de AMBAS falharem?",
                opcoes: [
                  { label: "A", valor: "3%" },
                  { label: "B", valor: "1%" },
                  { label: "C", valor: "30%" },
                  { label: "D", valor: "40%" }
                ],
                correta: "3%",
                explicacao: "P(B1 ∩ B2) = P(B1) * P(B2 | B1). Logo, 0,10 * 0,30 = 0,03 ou 3%. Como um evento influenciou o outro, multiplicamos a chance inicial pela condicional."
              }
            ]}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-5" className="space-y-[50px]">
        {/* MÓDULO 5: Lei Binomial */}
        <ModuleBanner
          numero={5}
          titulo="Distribuição Binomial: O Poder da Repetição"
          descricao="Domine o cálculo de múltiplos sucessos em experimentos de Bernoulli."
          gradiente="bg-gradient-to-br from-indigo-500 via-blue-600 to-emerald-600"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={5}
            title="A Mágica de Bernoulli"
            description="Como calcular a probabilidade de 'k' sucessos em 'n' tentativas sem precisar de árvores gigantes."
            variant="indigo"
            className="mb-8"
          />

          <div className="space-y-10 text-slate-700 dark:text-slate-300">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0 w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center">
                <LuZap className="w-8 h-8 text-purple-600" />
              </div>
              <div className="space-y-4">
                <h5 className="text-xl font-bold">
                  Condições para ser Binomial
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <strong>Eventos Dicotômicos:</strong> Só existem duas saídas
                    (Sucesso ou Fracasso, Sim ou Não, Petróleo ou Seco).
                  </li>
                  <li className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    <strong>Independência:</strong> O resultado de uma tentativa
                    não deve influenciar as outras.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 dark:bg-slate-900 rounded-[3rem] p-10 text-white relative shadow-2xl overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 via-transparent to-emerald-500/10 pointer-events-none" />
            <h3 className="text-brand-primary font-black uppercase tracking-tighter text-3xl italic mb-10">
              A Engenharia Binomial
            </h3>
            <div className="text-2xl md:text-5xl font-mono flex flex-wrap justify-center items-center gap-4 py-10 scale-105 group-hover:scale-110 transition-transform duration-700">
              <span className="text-indigo-400">P(k)</span>
              <span>=</span>
              <div className="flex flex-col items-center bg-white/5 px-6 py-4 rounded-3xl border border-white/10 shadow-inner">
                <span className="text-xs text-slate-500 mb-1">C(n,k)</span>
                <span className="text-emerald-400 italic font-black">C</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex flex-col items-center">
                <span>
                  p<sup>k</sup>
                </span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex flex-col items-center">
                <span>
                  q<sup>n-k</sup>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 text-[10px] uppercase font-bold tracking-widest text-slate-500">
              <div className="flex flex-col items-center border-r border-white/5">
                <span className="text-white text-lg">n</span> Repetições
              </div>
              <div className="flex flex-col items-center border-r border-white/5">
                <span className="text-white text-lg">k</span> Sucessos
              </div>
              <div className="flex flex-col items-center border-r border-white/5">
                <span className="text-white text-lg">p</span> Chance Sucesso
              </div>
              <div className="flex flex-col items-center">
                <span className="text-white text-lg">q</span> Fracasso (1-p)
              </div>
            </div>
          </div>

          <ContentAccordion
            titulo="Segredos da Binomial"
            icone={<LuZap className="w-5 h-5" />}
            corIndicador="bg-indigo-500"
            slides={[
              {
                titulo: "Quando usar?",
                icone: "🏗️",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      Sempre que tivermos <strong>Retiradas com Reposição</strong> ou processos onde a chance de sucesso é constante.
                    </p>
                    <AlertBox tipo="info" titulo="Cenário de Lote">
                      Se uma máquina produz 5% de peças defeituosas, qual a chance de em 10 peças escolhidas ao acaso, EXATAMENTE 2 serem ruins?
                    </AlertBox>
                    <p className="text-[10px] italic text-slate-500">
                      Aqui n=10, k=2, p=0.05 e q=0.95.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Por que a Combinação?",
                icone: "🔢",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      O <strong>C(n,k)</strong> serve para contabilizar todas as ordens possíveis onde os sucessos podem aparecer.
                    </p>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                       <p className="text-xs italic text-emerald-200">
                          "Não importa se a falha ocorreu na primeira ou na última peça; importa que ocorreram k falhas."
                       </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <QuizInterativo
            titulo="Check-point: Binomial"
            icone="🎯"
            numero={5.1}
            descricao="Teste sua precisão em eventos repetitivos."
            questoes={[
              {
                id: 501,
                pergunta: "Em uma perfuração, a chance de encontrar rocha rígida é de 20%. Se perfurarmos 3 poços independentes, qual a probabilidade de encontrarmos rocha em EXATAMENTE 1 deles?",
                opcoes: [
                  { label: "A", valor: "48%" },
                  { label: "B", valor: "38,4%" },
                  { label: "C", valor: "20%" },
                  { label: "D", valor: "12,8%" }
                ],
                correta: "38,4%",
                explicacao: "n=3, k=1, p=0,2, q=0,8. \nP(1) = C(3,1) * 0,2^1 * 0,8^2 = 3 * 0,2 * 0,64 = 0,384 ou 38,4%."
              }
            ]}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-6" className="space-y-[50px]">
        {/* MÓDULO 6: Poisson e Normal */}
        <ModuleBanner
          numero={6}
          titulo="Poisson e Normal: O Domínio dos Dados Raros e Gigantes"
          descricao="Lide com o passar do tempo e grandes massas de informação."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={6}
            title="Distribuições Contínuas e no Tempo"
            description="Quando o cenário muda de 'contagem' para 'taxa média'."
            variant="blue"
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-slate-800 dark:bg-slate-900 rounded-[2.5rem] p-10 border border-border/20 dark:border-white/5 space-y-8 group hover:border-cyan-500/30 transition-all duration-500">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-[1.5rem] flex items-center justify-center border border-cyan-500/20">
                <LuZap className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="space-y-4">
                 <h4 className="text-2xl font-black text-white italic tracking-tight">Poisson: O Raro no Tempo</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   Calcula ocorrências em um intervalo contínuo (tempo/espaço). <br/>
                   Ex: "Chance de ocorrer 3 vazamentos em um mês".
                 </p>
              </div>
              <div className="bg-black/60 p-8 rounded-[2rem] font-mono text-center border border-border/20 dark:border-white/5">
                <p className="text-cyan-400 text-2xl mb-4 italic">
                  P(k) = (e<sup className="text-cyan-600">-λ</sup> · λ<sup>k</sup>) / k!
                </p>
                <div className="h-px w-full bg-white/5 mb-4" />
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                  λ = Taxa Média (Lambda)
                </p>
              </div>
            </div>

            <div className="bg-slate-800 dark:bg-slate-900 rounded-[2.5rem] p-10 border border-border/20 dark:border-white/5 space-y-8 group hover:border-indigo-500/30 transition-all duration-500">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center border border-indigo-500/20">
                <LuTrendingUp className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="space-y-4">
                 <h4 className="text-2xl font-black text-white italic tracking-tight">Normal: O Padrão Universal</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">
                   A "Curva de Sino". Rege fenômenos onde a maioria dos valores está perto da média.
                 </p>
              </div>
              <div className="relative h-32 bg-indigo-500/5 rounded-[2rem] border border-border/20 dark:border-white/5 overflow-hidden flex items-end justify-center px-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                  <div className="w-full h-full border-b-2 border-indigo-500 flex items-center justify-center">
                     <span className="text-[10px] text-indigo-300 font-black uppercase tracking-widest opacity-30">Distribuição Gaussiana</span>
                  </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center italic">
                Z = (x - μ) / σ <br/>
                "Quantos desvios padrões estamos longe da média?"
              </p>
            </div>
          </div>

          <AlertBox tipo="info" titulo="Comparativo: Binomial vs Poisson">
            Use <strong>Binomial</strong> quando tiver tentativas (n) e sucesso (p). <br/>
            Use <strong>Poisson</strong> quando a questão te der apenas uma TAXA MÉDIA (λ) em relação ao tempo.
          </AlertBox>

          <QuizInterativo
            titulo="Check-point: Poisson & Normal"
            icone="🧠"
            numero={6.1}
            descricao="Desafio técnico em fluxos e médias."
            questoes={[
              {
                id: 601,
                pergunta: "Se em um terminal atracam em média 2 navios por dia (λ=2), qual a probabilidade de amanhã NÃO atracar nenhum navio?",
                opcoes: [
                  { label: "A", valor: "e^-2" },
                  { label: "B", valor: "2e^-2" },
                  { label: "C", valor: "1/e" },
                  { label: "D", valor: "0" }
                ],
                correta: "e^-2",
                explicacao: "Na fórmula de Poisson, para k=0: P(0) = (e^-λ * λ^0) / 0! = e^-λ. Como λ=2, o resultado é e^-2."
              }
            ]}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-7" className="space-y-[50px]">
        {/* MÓDULO 7: Prática de Resolução */}
        <ModuleBanner
          numero={7}
          titulo="Técnicas de Resolução Blindadas"
          descricao="O protocolo oficial para interpretar enunciados complexos e evitar armadilhas."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={7}
            title="O Algoritmo do Aprovado"
            description="Não comece pelos números. Comece pelo protocolo de engenharia de provas."
            variant="emerald"
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { t: "1. Filtro Narrativo", d: "Ignore a história e extraia apenas os conjuntos e as interseções.", i: <LuFileText/> },
               { t: "2. O Espaço Revisitado", d: "Sempre valide se o denominador mudou (Condicional).", i: <LuSearch/> },
               { t: "3. Sanidade Final", d: "Confira se a soma das partes totaliza 100%.", i: <LuCheck/> }
             ].map((item, i) => (
               <div key={i} className="p-8 bg-slate-800 dark:bg-slate-900 rounded-[2.5rem] border border-border/20 dark:border-white/5 space-y-4 hover:bg-slate-700/80 transition-all duration-300">
                  <div className="text-emerald-500 text-2xl mb-4">{item.i}</div>
                  <h5 className="font-bold text-white uppercase italic text-sm">{item.t}</h5>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.d}</p>
               </div>
             ))}
          </div>

          <div className="p-8 md:p-12 bg-emerald-500/5 rounded-[3rem] border border-emerald-500/10 space-y-8">
             <div className="flex items-center gap-6 border-b border-emerald-500/20 pb-6">
                <LuZap className="w-10 h-10 text-emerald-500" />
                <h4 className="text-2xl font-black text-slate-800 dark:text-white italic">Case: O Petroleiro Fantasma</h4>
             </div>
             <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
               "Um petroleiro tem probabilidade 0,8 de atracar com sucesso se o mar estiver calmo, e 0,3 se estiver revolto. A chance de o mar estar calmo amanhã é de 70%. Qual a chance de sucesso na atracação?"
             </p>
             <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 p-6 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-emerald-500/20">
                   <p className="text-[10px] text-emerald-600 uppercase font-black mb-2">Aplicação da Probabilidade Total</p>
                   <p className="text-xs font-mono">P = (0.8 * 0.7) + (0.3 * 0.3) = 0.56 + 0.09 = 0.65 (65%)</p>
                </div>
                <AlertBox tipo="warning" titulo="Erro Fatal">
                  Nunca faça a média aritmética das probabilidades (0,8+0,3)/2. Você DEVE ponderar pela chance de ocorrência de cada cenário (Calmo vs Revolto).
                </AlertBox>
             </div>
          </div>
        </section>
      </TabsContent>

      <TabsContent value="modulo-8" className="space-y-[50px]">
        {/* MÓDULO 8: Glossário do Mestre */}
        <ModuleBanner
          numero={8}
          titulo="O Glossário do Mestre"
          descricao="Terminologia técnica essencial para o dia da prova."
          gradiente="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "Amostragem", d: "Seleção da parte pelo todo. Muda o espaço amostral se não houver reposição." },
                { t: "Axiomas de Kolmogorov", d: "As 3 leis fundantes da probabilidade moderna." },
                { t: "Disjuntos", d: "Eventos que não se tocam. Interseção nula." },
                { t: "Esperança", d: "Média ponderada dos resultados possíveis." },
                { t: "Estocástico", d: "Termo chique para processos que envolvem aleatoriedade no tempo." },
                { t: "Pulo do Gato", d: "Sempre que ler 'pelo menos um', pense em Complementar." }
              ].map((term, i) => (
                <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-border group hover:bg-brand-primary/5 transition-colors">
                   <h6 className="font-black text-brand-primary text-[10px] uppercase mb-2 tracking-widest">{term.t}</h6>
                   <p className="text-xs text-muted-foreground/70 italic opacity-80">{term.d}</p>
                </div>
              ))}
           </div>
        </section>
      </TabsContent>

      <TabsContent value="modulo-9" className="space-y-[50px]">
        {/* MÓDULO 9: Engenharia de Riscos */}
        <ModuleBanner
          numero={9}
          titulo="Engenharia de Riscos: O Caso Petrobras"
          descricao="Sistemas redundantes e confiabilidade de ativos críticos."
          gradiente="bg-gradient-to-br from-rose-700 via-red-800 to-stone-900"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <ModuleSectionHeader
                index={9}
                title="Redundância 1oo2 e 2oo3"
                description="Como a probabilidade garante a segurança de plataformas offshore."
                variant="rose"
              />
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Em sistemas 1oo2 (um de dois), o sistema falha apenas se AMBOS os sensores falharem. <br/>
                <span className="font-mono text-rose-500 font-bold">P(Falha Total) = P(F1) * P(F2)</span>.
              </p>
              <AlertBox tipo="info" titulo="Cenário de Votação">
                 No sistema 2oo3 (Dois de Três), o sistema desarma se 2 ou 3 sensores alertarem. Isso evita "trip" falso de um sensor maluco.
              </AlertBox>
            </div>
            <div className="w-full lg:w-[400px] h-[300px] bg-slate-800 dark:bg-slate-900 rounded-[3rem] p-10 flex flex-col justify-center border border-border/20 dark:border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
               <h6 className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-4">Calculando Risco de Shutdown</h6>
               <p className="text-white text-xs leading-relaxed italic mb-6">
                 "Se cada sensor tem 5% de falha, qual a chance de um sistema 1oo2 falhar e um 1oo3 falhar?"
               </p>
               <div className="space-y-3 font-mono">
                  <div className="flex justify-between text-[11px] border-b border-border/30 dark:border-white/10 pb-2">
                     <span className="text-slate-500">1oo2:</span>
                     <span className="text-emerald-400">0.25% (0.05²)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                     <span className="text-slate-500">1oo3:</span>
                     <span className="text-emerald-400">0.0125% (0.05³)</span>
                  </div>
               </div>
            </div>
          </div>

          <QuizInterativo
            titulo="Simulação de Risco"
            icone="🚨"
            numero={9.1}
            descricao="Aplique a lógica redundante em cenários de plataforma."
            questoes={[
              {
                id: 901,
                pergunta: "Em um sistema de emergência com 3 sensores em paralelo (redundância 1oo3), onde cada um tem 10% de chance de falhar, qual a probabilidade do sistema INTEIRO falhar?",
                opcoes: [
                  { label: "A", valor: "30%" },
                  { label: "B", valor: "1%" },
                  { label: "C", valor: "0,1%" },
                  { label: "D", valor: "0,01%" }
                ],
                correta: "0,1%",
                explicacao: "Para o sistema 1oo3 falhar, os TRÊS devem falhar simultaneamente. P = 0,1 * 0,1 * 0,1 = 0,001 (0,1%)."
              }
            ]}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-10" className="space-y-[50px]">
        {/* MÓDULO 10: Desafio Final */}
        <section className="space-y-6">
          <QuizInterativo
            titulo="Simulado Final: O Cerco Cesgranrio"
            icone="🏆"
            numero={10}
            descricao="Nível de dificuldade: Elevado. Este simulado cobre desde fundamentos até Bayes e Binomial em contextos técnicos da Petrobras."
            questoes={probabilidadeQuestions}
          />
        </section>

        {/* TABELA DE FÓRMULAS MASTER */}
        <div className="bg-slate-950 rounded-[4rem] p-12 mt-20 border border-border/20 dark:border-white/5 shadow-[0_0_100px_rgba(16,185,129,0.1)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -mt-48 -mr-48" />
          <div className="relative z-10">
             <h4 className="text-4xl font-black text-white mb-2 italic tracking-tighter">O Arsenal da Aprovação</h4>
             <p className="text-slate-500 text-sm mb-12">Todas as ferramentas que você precisa para destruir qualquer questão da banca.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                 { n: "União", f: "P(A∪B) = P(A)+P(B) - P(A∩B)", d: "O segredo do 'OU'. Não esqueça a interseção!" },
                 { n: "Independência", f: "P(A∩B) = P(A) · P(B)", d: "Quando um evento não dá spoiler do outro." },
                 { n: "Condicional", f: "P(A|B) = P(A∩B) / P(B)", d: "O mundo mudou: seu denominador diminuiu." },
                 { n: "Binomial", f: "P(k) = C(n,k) · pᵏ · qⁿ⁻ᵏ", d: "Repetições independentes (Lotes/Moedas)." },
                 { n: "Poisson", f: "P(k) = (e⁻λ · λᵏ) / k!", d: "Tempo contínuo e taxas médias." },
                 { n: "Bayes", f: "P(C|E) = [P(E|C)·P(C)] / P(E)", d: "Inversão de causa e efeito. Raciocínio Forense." },
               ].map((item, i) => (
                 <div key={i} className="group p-8 bg-white/[0.02] rounded-[2.5rem] border border-border/20 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:bg-white/[0.04]">
                    <div className="flex items-center justify-between mb-6">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-400 transition-colors">{item.n}</span>
                       <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all" />
                    </div>
                    <code className="block text-white font-mono text-sm lg:text-base mb-4 break-all opacity-80 group-hover:opacity-100">{item.f}</code>
                    <p className="text-xs text-muted-foreground/70 italic leading-relaxed group-hover:text-slate-300">{item.d}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="relative group overflow-hidden p-12 rounded-[4rem] bg-gradient-to-br from-emerald-600 to-indigo-950 text-white flex flex-col items-center text-center gap-8 mt-12 shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
           <LuTrophy className="w-24 h-24 mb-2 animate-bounce opacity-40 group-hover:opacity-100 transition-all duration-1000" />
           <div className="space-y-4 relative z-10">
              <h3 className="text-5xl font-black italic tracking-tighter">O ACASO TRABALHA PARA VOCÊ!</h3>
              <p className="max-w-xl mx-auto text-emerald-100/70 text-lg leading-relaxed">
                Você acaba de dominar um dos pilares mais pesados do concurso. A probabilidade agora não é uma dúvida, é uma ferramenta de cálculo.
              </p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-6 mt-6 relative z-10 w-full justify-center">
              <button 
                onClick={onComplete}
                className="px-10 py-5 bg-white text-emerald-900 font-black rounded-3xl hover:scale-105 hover:bg-emerald-50 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
              >
                <LuCheck className="w-6 h-6" /> FINALIZAR MISSÃO
              </button>
           </div>

           <div className="mt-8 pt-8 border-t border-white/10 w-full flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-emerald-300/40">
              <span>Status: Especialista em Probabilidade</span>
              <span>XP Restante: 0</span>
           </div>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}

// ------------------------------------------------------------------
// BANCO DE QUESTÕES (Estilo CESGRANRIO)
// ------------------------------------------------------------------

const probabilidadeQuestions: QuizQuestion[] = [
  {
    id: 1,
    pergunta:
      "Em uma agência bancária, 40% dos clientes são do setor comercial e 35% são do setor de serviços. Sabe-se que 15% dos clientes possuem investimentos em ambos os setores. Qual a probabilidade de um cliente escolhido ao acaso pertencer ao setor comercial OU ao de serviços?",
    opcoes: [
      { label: "A", valor: "60%" },
      { label: "B", valor: "55%" },
      { label: "C", valor: "75%" },
      { label: "D", valor: "50%" },
      { label: "E", valor: "65%" },
    ],
    correta: "60%",
    explicacao:
      "Esta questão exige a aplicação da Regra da Adição para eventos não mutuamente exclusivos. A fórmula é P(A ∪ B) = P(A) + P(B) - P(A ∩ B). Substituindo os valores: 40% (Comercial) + 35% (Serviços) - 15% (Ambos) = 60%. A subtração da interseção é vital para não contar as mesmas pessoas duas vezes. É o 'padrão ouro' da Cesgranrio para confundir candidatos apressados.",
  },
  {
    id: 2,
    pergunta:
      "Um técnico de manutenção da Petrobras inspeciona 4 válvulas de segurança independentes. A probabilidade de uma única válvula apresentar falha é de 0,1. Qual a probabilidade de PELO MENOS UMA válvula falhar durante a inspeção?",
    opcoes: [
      { label: "A", valor: "0,3439" },
      { label: "B", valor: "0,6561" },
      { label: "C", valor: "0,1" },
      { label: "D", valor: "0,4" },
      { label: "E", valor: "0,9999" },
    ],
    correta: "0,3439",
    explicacao:
      "Questões com a expressão 'Pelo menos um' são melhor resolvidas pelo Evento Complementar: P(Pelo menos um) = 1 - P(Nenhum). No nosso caso, a probabilidade de uma válvula NÃO falhar é 0,9. Como as válvulas são independentes, a probabilidade de as 4 NÃO falharem é 0,9 * 0,9 * 0,9 * 0,9 = 0,6561. Assim, a probabilidade de pelo menos uma falha é 1 - 0,6561 = 0,3439 (34,39%).",
  },
  {
    id: 3,
    pergunta:
      "Em uma urna com 10 bolas (6 verdes e 4 amarelas), retiram-se duas bolas sequencialmente SEM REPOSIÇÃO. Qual a probabilidade de a segunda bola ser amarela, dado que a primeira foi verde?",
    opcoes: [
      { label: "A", valor: "4/9" },
      { label: "B", valor: "4/10" },
      { label: "C", valor: "3/9" },
      { label: "D", valor: "1/2" },
      { label: "E", valor: "2/5" },
    ],
    correta: "4/9",
    explicacao:
      "Este é um exercício clássico de Probabilidade Condicional. A informação 'a primeira foi verde' altera o Espaço Amostral. Se retiramos uma bola verde de uma urna de 10, restam agora apenas 9 bolas no total. Dessas 9, as 4 amarelas originais ainda estão lá. Portanto, a chance de a segunda ser amarela é de 4 em 9 (4/9). Note que o denominador diminuiu!",
  },
  {
    id: 4,
    pergunta:
      "A probabilidade de um atirador acertar o alvo é 1/3 em cada tentativa. Se ele realizar 5 disparos independentes, qual a probabilidade de ele acertar o alvo EXATAMENTE 2 vezes?",
    opcoes: [
      { label: "A", valor: "80/243" },
      { label: "B", valor: "40/243" },
      { label: "C", valor: "20/243" },
      { label: "D", valor: "10/243" },
      { label: "E", valor: "1/243" },
    ],
    correta: "80/243",
    explicacao:
      "Aplicamos a Distribuição Binomial. Fórmula: P(X=k) = C(n,k) * p^k * q^(n-k). Aqui: n=5, k=2, p=1/3 e q=2/3. Calculando: C(5,2) = 10. Assim, P(X=2) = 10 * (1/3)^2 * (2/3)^3 = 10 * (1/9) * (8/27) = 80/243. O segredo é não esquecer o coeficiente de combinação C(5,2).",
  },
  {
    id: 5,
    pergunta:
      "Dois eventos A e B são tais que P(A) = 0,3, P(B) = 0,4 e sabe-se que eles são INDEPENDENTES. Qual o valor da probabilidade da União P(A ∪ B)?",
    opcoes: [
      { label: "A", valor: "0,7" },
      { label: "B", valor: "0,58" },
      { label: "C", valor: "0,12" },
      { label: "D", valor: "0,42" },
      { label: "E", valor: "0,72" },
    ],
    correta: "0,58",
    explicacao:
      "A independência garante que P(A ∩ B) = P(A) * P(B). Portanto, P(A ∩ B) = 0,3 * 0,4 = 0,12. Agora usamos a regra da união: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0,3 + 0,4 - 0,12 = 0,58. Cuidado para não apenas somar 0,3 + 0,4 e marcar 0,7 (alternativa A), que seria o caso se fossem excludentes.",
  },
  {
    id: 6,
    pergunta:
      "Um teste rápido para uma doença na refinaria é 90% eficaz para detectar a doença em quem a possui, mas dá 5% de 'falsos positivos' em quem é saudável. Sabe-se que 1% da população da refinaria possui a doença. Se um funcionário testou POSITIVO, qual a chance aproximada de ele realmente ter a doença?",
    opcoes: [
      { label: "A", valor: "15%" },
      { label: "B", valor: "90%" },
      { label: "C", valor: "50%" },
      { label: "D", valor: "5%" },
      { label: "E", valor: "25%" },
    ],
    correta: "15%",
    explicacao:
      "Use Bayes! P(D|P) = [P(P|D)*P(D)] / P(P Total). \n1) Numerador: 0,90 * 0,01 = 0,009. \n2) Denominador (Testes Positivos): [0,90 * 0,01 (doentes)] + [0,05 * 0,99 (saudáveis)] = 0,009 + 0,0495 = 0,0585. \n3) Bayes: 0,009 / 0,0585 ≈ 0,153 (15%). Intuitivamente, embora o teste pareça bom, como a doença é rara, a maioria dos positivos são falsos!",
  },
  {
    id: 7,
    pergunta:
      "De um grupo de 10 engenheiros e 5 técnicos, deve-se formar uma comissão de 3 pessoas. Qual a probabilidade de a comissão ser formada exclusivamente por engenheiros?",
    opcoes: [
      { label: "A", valor: "24/91" },
      { label: "B", valor: "10/15" },
      { label: "C", valor: "1/5" },
      { label: "D", valor: "2/3" },
      { label: "E", valor: "12/91" },
    ],
    correta: "24/91",
    explicacao:
      "Calculamos n(S) (Combinação de 15 pessoas tomadas 3 a 3) e n(A) (Combinação de 10 engenheiros tomados 3 a 3). \nn(S) = C(15,3) = (15*14*13)/(3*2*1) = 455. \nn(A) = C(10,3) = (10*9*8)/(3*2*1) = 120. \nP(A) = 120 / 455 = 24/91. É um problema de Laplace misturado com Análise Combinatória.",
  },
  {
    id: 8,
    pergunta:
      "Uma máquina produz peças com 5% de defeito. Um lote é aceito se em 3 peças testadas NENHUMA for defeituosa. Qual a chance do lote ser aceito?",
    opcoes: [
      { label: "A", valor: "85,7%" },
      { label: "B", valor: "95,0%" },
      { label: "C", valor: "15,0%" },
      { label: "D", valor: "80,0%" },
      { label: "E", valor: "99,0%" },
    ],
    correta: "85,7%",
    explicacao:
      "Cada peça tem 95% (0,95) de chance de ser boa. Como as escolhas são independentes, para que as três sejam boas, multiplicamos: 0,95 * 0,95 * 0,95 = 0,857375, ou aproximadamente 85,7%. Perceba que, mesmo com pouca falha (5%), a chance de pegar 3 boas seguidas começa a cair.",
  },
  {
    id: 9,
    pergunta:
      "A negação lógica de um evento A em probabilidade é seu complementar. Se a probabilidade de chover amanhã é 2/7, qual a chance de NÃO chover?",
    opcoes: [
      { label: "A", valor: "5/7" },
      { label: "B", valor: "1/7" },
      { label: "C", valor: "7/2" },
      { label: "D", valor: "0" },
      { label: "E", valor: "2/7" },
    ],
    correta: "5/7",
    explicacao:
      "A soma das probabilidades de eventos complementares é sempre 1. Logo, P(A') = 1 - 2/7 = 5/7. Praticamente uma questão 'bônus' se você souber o conceito básico de complementaridade.",
  },
  {
    id: 10,
    pergunta:
      "Lançando-se uma moeda honesta 4 vezes, qual a probabilidade de obtermos CARA nas duas primeiras e COROA nas duas últimas?",
    opcoes: [
      { label: "A", valor: "1/16" },
      { label: "B", valor: "1/4" },
      { label: "C", valor: "1/2" },
      { label: "D", valor: "6/16" },
      { label: "E", valor: "4/16" },
    ],
    correta: "1/16",
    explicacao:
      "Cuidado! Aqui a ORDEM está definida. Não é uma binomial genérica. Queremos especificamente (C, C, K, K). Como os lançamentos são independentes, basta multiplicar: 1/2 * 1/2 * 1/2 * 1/2 = 1/16. Se a questão pedisse 'exatamente duas caras', o resultado seria C(4,2)/16 = 6/16.",
  },
  {
    id: 11,
    pergunta:
      "Em um terminal, 70% dos navios são petroleiros e 30% são gaseiros. Sabe-se que 10% dos petroleiros e 5% dos gaseiros têm problemas de atracação. Se um navio foi escolhido e apresenta problemas de atracação, qual a probabilidade de ele ser um gaseiro?",
    opcoes: [
      { label: "A", valor: "15/85" },
      { label: "B", valor: "30/100" },
      { label: "C", valor: "5/100" },
      { label: "D", valor: "1/5" },
      { label: "E", valor: "10/17" },
    ],
    correta: "15/85",
    explicacao:
      "Bayes novamente. P(G|Prob) = [P(Prob|G)*P(G)] / P(Prob Total). \n1) Numerador: 0,05 * 0,30 = 0,015. \n2) Denominador: (0,10*0,70) + (0,05*0,30) = 0,070 + 0,015 = 0,085. \n3) Cálculo: 0,015 / 0,085 = 15/85 (ou 3/17). Sempre organize a árvore de probabilidades para não se perder nestas questões.",
  },
  {
    id: 12,
    pergunta:
      "Dois dados são jogados. Qual a probabilidade de a soma dos pontos ser igual a 7?",
    opcoes: [
      { label: "A", valor: "1/6" },
      { label: "B", valor: "1/12" },
      { label: "C", valor: "5/36" },
      { label: "D", valor: "1/4" },
      { label: "E", valor: "7/36" },
    ],
    correta: "1/6",
    explicacao:
      "O espaço amostral n(S) = 36. Os casos favoráveis para soma 7 são: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Total de 6 casos. P = 6/36 = 1/6.",
  },
  {
    id: 13,
    pergunta: "Se P(A) = 0,7, qual o maior valor possível para P(A ∩ B)?",
    opcoes: [
      { label: "A", valor: "0,3" },
      { label: "B", valor: "0,7" },
      { label: "C", valor: "1" },
      { label: "D", valor: "Depende de P(B)" },
      { label: "E", valor: "0" },
    ],
    correta: "Depende de P(B)",
    explicacao:
      "A interseção de A e B não pode ser maior do que a probabilidade do menor evento. Como P(A)=0,7, se P(B)=0,2, o máximo será 0,2. Se P(B)=0,9, o máximo será 0,7. Portanto, a resposta correta é que depende do valor de B, mas o teto sempre será 0,7 neste caso.",
  },
  {
    id: 14,
    pergunta:
      "Em um sorteio de números de 1 a 100, qual a chance de sair um número múltiplo de 10 OU múltiplo de 25?",
    opcoes: [
      { label: "A", valor: "14%" },
      { label: "B", valor: "10%" },
      { label: "C", valor: "4%" },
      { label: "D", valor: "12%" },
      { label: "E", valor: "15%" },
    ],
    correta: "12%",
    explicacao:
      "1) Múltiplos de 10 (10 a 100): 10 números. \n2) Múltiplos de 25 (25, 50, 75, 100): 4 números. \n3) Interseção (10 e 25): MMC(10,25) = 50. Logo, 50 e 100 (2 números). \n4) União: 10 + 4 - 2 = 12. P = 12/100 = 12%.",
  },
  {
    id: 15,
    pergunta:
      "Qual a probabilidade de, em uma família com 3 filhos, todos serem do mesmo sexo?",
    opcoes: [
      { label: "A", valor: "1/4" },
      { label: "B", valor: "1/8" },
      { label: "C", valor: "1/2" },
      { label: "D", valor: "1/3" },
      { label: "E", valor: "3/8" },
    ],
    correta: "1/4",
    explicacao:
      "O espaço amostral tem 2^3 = 8 possibilidades. Os casos favoráveis são (H,H,H) e (M,M,M). Total = 2. P = 2/8 = 1/4 (25%). Muitas pessoas esquecem de contar o caso das meninas e marcam 1/8.",
  },
  {
    id: 16,
    pergunta:
      "Uma empresa tem 60% de funcionários homens e 40% mulheres. Sabe-se que 10% dos homens e 5% das mulheres são fumantes. Escolhendo-se um funcionário ao acaso e sabendo que ele é FUMANTE, qual a probabilidade de ser mulher?",
    opcoes: [
      { label: "A", valor: "25%" },
      { label: "B", valor: "33%" },
      { label: "C", valor: "40%" },
      { label: "D", valor: "20%" },
      { label: "E", valor: "50%" },
    ],
    correta: "25%",
    explicacao:
      "Probabilidade Total de fumantes: (0,6 * 0,1) + (0,4 * 0,05) = 0,06 + 0,02 = 0,08. Probabilidade de ser mulher e fumante: 0,02. P(Mulher|Fumante) = 0,02 / 0,08 = 1/4 = 25%.",
  },
  {
    id: 17,
    pergunta:
      "Em uma urna há 5 bolas azuis e 3 vermelhas. Sorteamos duas bolas SEM reposição. Qual a probabilidade de ambas serem azuis?",
    opcoes: [
      { label: "A", valor: "5/14" },
      { label: "B", valor: "25/64" },
      { label: "C", valor: "5/8" },
      { label: "D", valor: "1/2" },
      { label: "E", valor: "15/56" },
    ],
    correta: "5/14",
    explicacao:
      "Primeira azul: 5/8. Segunda azul (restam 4 azuis e 7 no total): 4/7. P = 5/8 * 4/7 = 20/56 = 5/14.",
  },
  {
    id: 18,
    pergunta:
      "Se a média de acidentes em um trecho de rodovia é de 2 por dia, qual a probabilidade de não ocorrer nenhum acidente amanhã, usando a distribuição de Poisson?",
    opcoes: [
      { label: "A", valor: "e^-2" },
      { label: "B", valor: "2e^-2" },
      { label: "C", valor: "1/2" },
      { label: "D", valor: "e^2" },
      { label: "E", valor: "0" },
    ],
    correta: "e^-2",
    explicacao:
      "Fórmula de Poisson: P(k) = (e^-λ * λ^k) / k!. Para k=0 e λ=2: P(0) = (e^-2 * 2^0) / 0! = e^-2. Como e ≈ 2,718, isso dá aproximadamente 13,5%.",
  },
  {
    id: 19,
    pergunta:
      "Em um lote de 100 peças, 5 são defeituosas. Se retirarmos 2 peças AO ACASO com REPOSIÇÃO, qual a probabilidade de ambas serem defeituosas?",
    opcoes: [
      { label: "A", valor: "1/400" },
      { label: "B", valor: "1/380" },
      { label: "C", valor: "5/100" },
      { label: "D", valor: "1/20" },
      { label: "E", valor: "1/10" },
    ],
    correta: "1/400",
    explicacao:
      "Como há reposição, a probabilidade não muda. 5/100 * 5/100 = 1/20 * 1/20 = 1/400. Se fosse SEM reposição, seria 5/100 * 4/99.",
  },
  {
    id: 20,
    pergunta:
      "A probabilidade de um aluno ser aprovado em um concurso é 0,2. Se ele prestar 4 concursos diferentes e independentes, qual a chance de ser aprovado em PELO MENOS UM?",
    opcoes: [
      { label: "A", valor: "59,04%" },
      { label: "B", valor: "80,00%" },
      { label: "C", valor: "20,00%" },
      { label: "D", valor: "40,96%" },
      { label: "E", valor: "10,24%" },
    ],
    correta: "59,04%",
    explicacao:
      "P(Pelo menos um) = 1 - P(Nenhum). A chance de reprovar em um é 0,8. Em 4 concursos: 0,8^4 = 0,4096. Logo, P(Pelo menos uma aprovação) = 1 - 0,4096 = 0,5904 = 59,04%.",
  },
  {
    id: 21,
    pergunta:
      "Em um processo industrial, a probabilidade de uma peça ser defeituosa é 0,02. As peças são acondicionadas em caixas de 500 unidades. Qual a probabilidade de uma caixa conter EXATAMENTE 10 peças defeituosas, usando a aproximação de Poisson?",
    opcoes: [
      { label: "A", valor: "(e^{-10} · 10^{10}) / 10!" },
      { label: "B", valor: "e^{-10}" },
      { label: "C", valor: "0,02" },
      { label: "D", valor: "1/10" },
      { label: "E", valor: "0,10" },
    ],
    correta: "(e^{-10} · 10^{10}) / 10!",
    explicacao:
      "λ = n * p = 500 * 0,02 = 10. A fórmula de Poisson é P(k) = (e^{-λ} * λ^k) / k!. Substituindo, temos o resultado da alternativa A.",
  },
  {
    id: 22,
    pergunta:
      "Se P(A|B) = 0,4, P(A) = 0,3 e P(B) = 0,5, qual o valor de P(B|A)?",
    opcoes: [
      { label: "A", valor: "2/3" },
      { label: "B", valor: "0,2" },
      { label: "C", valor: "0,6" },
      { label: "D", valor: "0,15" },
      { label: "E", valor: "0,5" },
    ],
    correta: "2/3",
    explicacao:
      "Usamos a definição de Bayes: P(B|A) = [P(A|B)*P(B)] / P(A). P(B|A) = [0,4 * 0,5] / 0,3 = 0,2 / 0,3 = 2/3.",
  },
  {
    id: 23,
    pergunta:
      "Três máquinas A, B e C produzem respectivamente 40%, 30% e 30% de um lote. As taxas de defeito são 2%, 3% e 4%. Uma peça é sorteada e é DEFEITUOSA. Qual a chance de ser da máquina A?",
    opcoes: [
      { label: "A", valor: "8/29" },
      { label: "B", valor: "40%" },
      { label: "C", valor: "2%" },
      { label: "D", valor: "9/29" },
      { label: "E", valor: "12/29" },
    ],
    correta: "8/29",
    explicacao:
      "Prob. Total de defeito: (0,4*0,02) + (0,3*0,03) + (0,3*0,04) = 0,008 + 0,009 + 0,012 = 0,029. P(A|Def) = 0,008 / 0,029 = 8/29.",
  },
  {
    id: 24,
    pergunta:
      "Lançando um dado honesto 10 vezes, qual a média (esperança) de vezes que sairá o número 6?",
    opcoes: [
      { label: "A", valor: "10/6" },
      { label: "B", valor: "6" },
      { label: "C", valor: "1/6" },
      { label: "D", valor: "5" },
      { label: "E", valor: "1" },
    ],
    correta: "10/6",
    explicacao:
      "Na distribuição Binomial, a média é E[X] = n * p. Aqui n=10 e p=1/6. Logo, E[X] = 10/6 ou 1,666...",
  },
  {
    id: 25,
    pergunta:
      "A probabilidade de um poço ser produtivo é 1/4. Se uma empresa perfura poços até encontrar o primeiro produtivo, qual a chance de gastar EXATAMENTE 3 perfurações?",
    opcoes: [
      { label: "A", valor: "9/64" },
      { label: "B", valor: "1/4" },
      { label: "C", valor: "3/4" },
      { label: "D", valor: "1/64" },
      { label: "E", valor: "27/64" },
    ],
    correta: "9/64",
    explicacao:
      "Este é um caso de Distribuição Geométrica: (Falha) * (Falha) * (Sucesso). P = (3/4) * (3/4) * (1/4) = 9/64.",
  },
  {
    id: 26,
    pergunta:
      "Em um grupo de 100 pessoas, 80 gostam de café e 40 gostam de chá. Qual a probabilidade MÍNIMA de uma pessoa gostar de ambos?",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "40%" },
      { label: "C", valor: "0%" },
      { label: "D", valor: "60%" },
      { label: "E", valor: "10%" },
    ],
    correta: "20%",
    explicacao:
      "Como a união P(A∪B) não pode exceder 100%, temos: 80 + 40 - P(A∩B) <= 100. Logo, 120 - P(A∩B) <= 100 -> P(A∩B) >= 20. A interseção mínima é 20%.",
  },
  {
    id: 27,
    pergunta:
      "A probabilidade de um navio chegar com atraso é 0,2. Se chegarem 5 navios, qual a probabilidade de pelo menos um chegar com atraso?",
    opcoes: [
      { label: "A", valor: "0,67232" },
      { label: "B", valor: "0,32768" },
      { label: "C", valor: "0,2" },
      { label: "D", valor: "1" },
      { label: "E", valor: "0,8" },
    ],
    correta: "0,67232",
    explicacao: "1 - P(Nenhum atraso) = 1 - (0,8^5) = 1 - 0,32768 = 0,67232.",
  },
  {
    id: 28,
    pergunta: "Um evento X tem probabilidade 1. Como ele é classificado?",
    opcoes: [
      { label: "A", valor: "Evento Certo" },
      { label: "B", valor: "Evento Impossível" },
      { label: "C", valor: "Espaço Amostral" },
      { label: "D", valor: "Evento Aleatório" },
      { label: "E", valor: "Universo" },
    ],
    correta: "Evento Certo",
    explicacao:
      "Probabilidade 1 significa que o evento ocorrerá com 100% de certeza. No vocabulário técnico, é o Evento Certo.",
  },
  {
    id: 29,
    pergunta: "Se A e B são mutuamente excludentes, qual o valor de P(A ∩ B)?",
    opcoes: [
      { label: "A", valor: "0" },
      { label: "B", valor: "P(A)*P(B)" },
      { label: "C", valor: "1" },
      { label: "D", valor: "P(A)+P(B)" },
      { label: "E", valor: "0,5" },
    ],
    correta: "0",
    explicacao:
      "Pela definição, eventos mutuamente excludentes não podem ocorrer ao mesmo tempo, logo sua interseção é nula.",
  },
  {
    id: 30,
    pergunta:
      "Em um sorteio de 1 a 50, qual a probabilidade de sair um número PRIMO?",
    opcoes: [
      { label: "A", valor: "15/50" },
      { label: "B", valor: "10/50" },
      { label: "C", valor: "25/50" },
      { label: "D", valor: "12/50" },
      { label: "E", valor: "1/2" },
    ],
    correta: "15/50",
    explicacao:
      "Os primos até 50 são: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. Total = 15. Probabilidade = 15/50 ou 30%.",
  },
];
