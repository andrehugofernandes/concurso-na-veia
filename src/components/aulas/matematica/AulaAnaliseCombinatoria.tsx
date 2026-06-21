"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { LuChevronDown } from "react-icons/lu";
import { getModuleVariant, getAllModuleVariants } from "@/lib/moduleColors";
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
  QuestaoResolvidaStepByStep} from "../shared";
import {
  QUIZ_M1_PRINCIPIO_CONTAGEM,
  QUIZ_M2_FATORIAL,
  QUIZ_M3_PERMUTACAO_SIMPLES,
  QUIZ_M4_PERMUTACAO_REPETICAO,
  QUIZ_M5_ARRANJO_SIMPLES,
  QUIZ_M6_COMBINACAO_SIMPLES,
  QUIZ_M7_COMBINACAO_REPETICAO,
  QUIZ_M8_PROPRIEDADES,
  QUIZ_M9_APLICACOES_PETROBRAS,
  QUIZ_M10_SIMULADO_CESGRANRIO,
} from "./data/analise-combinatoria-quizzes";

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaAnaliseCombinatoria({
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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_PRINCIPIO_CONTAGEM, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_FATORIAL, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_PERMUTACAO_SIMPLES, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_PERMUTACAO_REPETICAO, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_ARRANJO_SIMPLES, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_COMBINACAO_SIMPLES, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_COMBINACAO_REPETICAO, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_PROPRIEDADES, 6));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_APLICACOES_PETROBRAS, 6));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_CESGRANRIO, 6));

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
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
      updateCompletedModules(Array.from(s));
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Princípio da Contagem" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Fatorial" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Permutação Simples" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Permutação com Repetição" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Arranjo Simples" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Combinação Simples" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Combinação com Repetição" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Propriedades e Identidades" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Petrobras" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
  ];

    


  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
      {/* MÓDULO 1: PRINCÍPIO FUNDAMENTAL DA CONTAGEM                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner numero={1}
          titulo="Princípio Fundamental da Contagem"
          descricao="A base de toda análise combinatória: quando multiplicar as possibilidades para contar corretamente sem listar cada caso."
           variant="blue"/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION: Princípio Fundamental da Contagem */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos: O Princípio Fundamental da Contagem"
              description="Como contar sequências de escolhas independentes sem listar todas as possibilidades"
              variant="blue"
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                O <strong>Princípio Fundamental da Contagem (PFC)</strong>, também conhecido como regra do produto, é o alicerce de toda análise combinatória. Formulado rigorosamente no século XVIII, ele estabelece que quando uma tarefa pode ser executada em múltiplas etapas independentes — onde a escolha de uma etapa não afeta o número de possibilidades nas outras — o número total de maneiras de executar a tarefa é o produto do número de possibilidades de cada etapa. Formalmente, se uma tarefa T pode ser dividida em etapas E₁, E₂, ..., Eₙ, e existem m₁ formas de executar E₁, m₂ formas de executar E₂, e assim sucessivamente, então o número total de formas de executar T é m₁ × m₂ × ... × mₙ. Este princípio é testado constantemente em provas da CESGRANRIO porque forma a base lógica para diferenciar problemas que exigem multiplicação daqueles que exigem adição.
              </p>
              <p>
                A intuição por trás do PFC é elegantemente simples: imagine que você precisa fazer duas escolhas sequenciais. Se a primeira tem 3 opções e a segunda tem 4 opções, e essas escolhas são independentes (o resultado da primeira não limita a segunda), então você pode parear cada uma das 3 primeiras opções com cada uma das 4 segundas opções, obtendo 3 × 4 = 12 pares totais. Este raciocínio de "paramento" estende-se para qualquer número de etapas e é a razão pela qual multiplicamos as possibilidades. Uma forma visual de pensar é imaginar uma árvore de possibilidades: cada "ramo" que parte de um nó representa uma nova escolha, e o número total de caminhos desde a raiz até as folhas é o produto das ramificações em cada nível.
              </p>
              <p>
                Aplicando o PFC exige identificação precisa das etapas independentes. Uma etapa é um conjunto de alternativas mutuamente excludentes: você escolhe UMA dessas alternativas e avança para a próxima etapa. A independência significa que o número de opções em cada etapa não depende das escolhas anteriores. Por exemplo, se você escolhe uma cor de camiseta (5 cores) e depois um modelo de calça (3 modelos), essas etapas são independentes — a cor da camiseta não restringe o número de calças disponíveis. Logo, há 5 × 3 = 15 combinações de roupa. Porém, se o problema disser "escolha um meio de transporte: ônibus (3 linhas), barco (2 linhas) OU carro (5 rotas)", aqui não há etapas — há alternativas excludentes. Você escolhe UM meio OU O OUTRO, não ambos. Isso exige adição, não multiplicação: 3 + 2 + 5 = 10 formas totais. Este é o erro mais comum: confundir "E" (multiplicação) com "OU" (adição).
              </p>
              <p>
                No contexto operacional da Petrobras, o PFC aparece constantemente em decisões sobre segurança, logística e gerenciamento. Um técnico de plataforma que precisa escolher equipamento de proteção individual (EPI) enfrenta múltiplas etapas independentes: selecionar tipo de capacete (3 opções), respirador (4 opções) e luvas (2 opções). O número total de combinações seguras de EPI é 3 × 4 × 2 = 24 configurações possíveis. Em planejamento de rotas de transporte, um gestor pode escolher entre 5 portos de origem, 3 refinarias intermediárias e 4 destinos finais — totalizando 5 × 3 × 4 = 60 rotas distintas. A CESGRANRIO frequentemente testa essa aplicação prática para verificar se o candidato compreende quando usar multiplicação em contextos realistas, não apenas em exercícios abstratos.
              </p>
              <p>
                A CESGRANRIO costuma cobrir o PFC com pegadinhas sutis. A mais comum é misturar "E" e "OU" no mesmo enunciado: "De quantas formas um funcionário pode se transportar até a plataforma E voltar para a base? Há 3 ônibus, 2 barcos OU 5 carros disponíveis para ida, e 4 ônibus, 1 barco OU 6 carros para volta." Aqui, você precisa primeiro resolver os OU (escolher um meio para ida: 3+2+5=10; um meio para volta: 4+1+6=11), depois multiplicar os totais: 10 × 11 = 110 formas. Outra pegadinha é a restrição implícita: "Escolha um chefe de turno E um vice, sendo que a mesma pessoa não pode ocupar ambos os cargos." Aqui as etapas parecem independentes, mas não são — há uma restrição que reduz o número total. Se há 8 pessoas, não é 8 × 8 = 64; é 8 × 7 = 56 (escolhe 1 de 8 para chefe, depois 1 dos 7 restantes para vice). Identificar essas restrições é crítico para acertar as questões CESGRANRIO.
              </p>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground text-lg">Fórmula Geral do Princípio Fundamental da Contagem</h4>
                <div className="bg-white dark:bg-slate-900 rounded p-4 font-mono text-center space-y-2">
                  <p className="text-sm md:text-base">Se uma tarefa T tem etapas E₁, E₂, ..., Eₙ com m₁, m₂, ..., mₙ opções respectivamente:</p>
                  <p className="text-base md:text-lg font-bold text-amber-600 dark:text-amber-400">Total = m₁ × m₂ × ... × mₙ</p>
                  <p className="text-lg text-foreground/85 leading-relaxed mt-3">Válido APENAS quando as etapas são independentes (nenhuma opção em uma etapa depende de escolhas anteriores)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-600 dark:text-emerald-400">✅ USAR MULTIPLICAÇÃO quando:</p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-1">Etapas sequenciais, independentes (E lógico)</p>
                  </div>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-rose-600 dark:text-rose-400">✅ USAR ADIÇÃO quando:</p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-1">Alternativas mutuamente excludentes (OU lógico)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="O Princípio Fundamental da Contagem (PFC)"
              description="Se uma tarefa pode ser feita em etapas independentes, o total de formas é o produto das possibilidades de cada etapa."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O que é o PFC e quando usá-lo"
              icone="🔢"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Intuição",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>Princípio Fundamental da Contagem</strong> afirma: se um evento A pode ocorrer de <em>m</em> maneiras e, independentemente, um evento B de <em>n</em> maneiras, então A e B juntos podem ocorrer de <strong>m × n maneiras</strong>.
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-xl font-mono text-center text-foreground/85 leading-relaxed">
                          Total = n₁ × n₂ × n₃ × ... × nₖ
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Um técnico da REPLAN deve escolher: 1 de 3 EPCs de proteção respiratória, 1 de 4 tipos de luva e 1 de 2 modelos de capacete. O total de combinações de EPI é 3 × 4 × 2 = <strong>24 configurações</strong>. O PFC evita listar todas as possibilidades manualmente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação Passo a Passo",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para aplicar o PFC corretamente, identifique cada <strong>etapa independente</strong> e conte as opções de cada uma:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Exemplo: Código de Equipamento</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Formato: 1 letra (A–E) + 2 dígitos (0–9)</p>
                          <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Etapa 1: 5 letras</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Etapa 2: 10 dígitos</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Etapa 3: 10 dígitos</p>
                          <p className="text-xl font-bold mt-2 text-blue-500 text-foreground/85 leading-relaxed">Total: 5 × 10 × 10 = 500</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500 mb-2">Exemplo: Rotas de Inspeção</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">4 rotas de acesso à plataforma</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">3 rotas de retorno à base</p>
                          <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Etapa 1 (ida): 4 opções</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Etapa 2 (volta): 3 opções</p>
                          <p className="text-xl font-bold mt-2 text-cyan-500 text-foreground/85 leading-relaxed">Total: 4 × 3 = 12 viagens</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Quando NÃO usar o PFC",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O PFC exige que as etapas sejam <strong>independentes</strong>. Quando os eventos são <em>alternativos</em> (ou A ou B, não os dois), usa-se <strong>adição</strong>, não multiplicação.
                      </p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold mb-2 text-foreground/85 leading-relaxed">Multiplicação vs. Adição</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">✅ <strong>Multiplicação</strong>: etapas sequenciais (faz A E B)</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">✅ <strong>Adição</strong>: alternativas excludentes (faz A OU B)</p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Ex: 3 ônibus ou 2 barcos para chegar à plataforma → 3 + 2 = 5 meios de transporte (não 3 × 2).</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca mistura etapas sequenciais e alternativas no mesmo enunciado. Leia com atenção as palavras <strong>"E"</strong> (multiplica) e <strong>"OU"</strong> (soma). Este é o erro mais comum no PFC.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          


          <section id="quiz-modulo-1" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?"
          alternativas={[
            { letra: "A", texto: "25", correta: false },
              { letra: "B", texto: "60", correta: false },
              { letra: "C", texto: "120", correta: true },
              { letra: "D", texto: "240", correta: false },
              { letra: "E", texto: "720", correta: false }
          ]}
          dicaEstrategica="Aqui: 5 × 4 × 3 × 2 × 1 = 120."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "P(5) = 5!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 120." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="indigo"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Princípio Fundamental da Contagem: A Regra do Produto",
              duration: "10:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Definição do PFC", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                { title: "Etapas Independentes", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                { title: "Multiplicar as Opções", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Pulo do Gato: E vs OU",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Regra do "E" = Multiplicação</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">Fazer etapa 1 E etapa 2 → n₁ × n₂</p>
                  </div>
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                    <p className="font-bold text-orange-600 dark:text-orange-400">Regra do "OU" = Adição</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">Fazer opção 1 OU opção 2 → n₁ + n₂</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Batida da Contagem (PFC)",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Princípio da Contagem"
              icone="🔢"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: FATORIAL E NOTAÇÃO                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner numero={2}
          titulo="Fatorial e Notação"
          descricao="Domine a operação fundamental que sustenta todas as fórmulas de análise combinatória: o fatorial."
           variant="blue"/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION: Fatorial */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos: A Notação Fatorial"
              description="Entenda o operador ! que aparece em todas as fórmulas de permutações, arranjos e combinações"
              variant="blue"
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                O <strong>fatorial</strong> é uma operação aritmética fundamental representada pelo símbolo "!" (exclamação). O fatorial de um inteiro positivo n, escrito como n!, é definido como o produto de todos os inteiros positivos de 1 até n inclusive. Matematicamente: n! = n × (n-1) × (n-2) × ... × 3 × 2 × 1. Por exemplo, 5! = 5 × 4 × 3 × 2 × 1 = 120. A história do fatorial remonta ao século XV em análises de permutações, mas a notação "!" foi popularizada por Christian Kramp em 1808. Este operador é absolutamente central à análise combinatória porque representa o número de formas de ordenar um conjunto de n objetos — uma permutação de n elementos é precisamente n!. Portanto, entender fatorial é pré-requisito para qualquer trabalho com contagem e probabilidade. A CESGRANRIO testa fatorial em praticamente todas as provas, tanto em cálculos diretos quanto em simplificações dentro de fórmulas maiores.
              </p>
              <p>
                Visualmente, o fatorial cresce EXTREMAMENTE rápido. O fatorial de números pequenos já produz resultados grandes: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5.040, 8!=40.320, 9!=362.880, 10!=3.628.800. Observe que 10! é mais de 3 milhões! Esta explosão exponencial é crucial entender porque, em provas, nunca você calculará 10! manualmente — seria perda de tempo. Em vez disso, você aprenderá técnicas de simplificação e cancelamento que permitem trabalhar com fatoriais sem calcular valores brutos. Uma forma intuitiva de pensar em n! é imaginar n pessoas em fila: há n escolhas para quem fica em primeiro lugar, (n-1) para segundo, (n-2) para terceiro, e assim por diante. Quando você multiplica todos esses números, obtém n!, o número total de ordens diferentes em que essas n pessoas podem se organizar — todas as permutações possíveis.
              </p>
              <p>
                A definição de fatorial inclui um caso especial importante: <strong>0! = 1 por definição</strong>. Esta não é uma escolha arbitrária, mas uma necessidade matemática para que as fórmulas de combinatória funcionem. Por que? Porque existem exatamente 1 forma de ordenar 0 objetos (a sequência vazia), e existem exatamente 1 formas de escolher 0 elementos de um conjunto (obtendo o conjunto vazio). Se 0! fosse qualquer valor diferente de 1, as fórmulas para C(n,k) e P(n,k) não funcionariam nos casos limites. A fórmula C(n,0) = n!/(0! × n!) deveria dar 1 (há 1 forma de escolher nada de um conjunto), o que ocorre APENAS se 0! = 1. Este é um dos fatos que a CESGRANRIO testa porque candidatos frequentemente se confundem quando 0! aparece em cálculos. Memorize: 0! = 1, fim da discussão.
              </p>
              <p>
                Na prática de Petrobras, o fatorial aparece em contextos como: quantas maneiras uma equipe de 8 pessoas pode se organizar em fila para inspeção? Resposta: 8! = 40.320 formas. De quantos jeitos 6 cores de etiqueta podem ser dispostas em ordem? 6! = 720 arranjos. Quantas sequências de senha de 5 dígitos sem repetição podemos criar? 10 × 9 × 8 × 7 × 6 = 30.240 (que é equivalente a 10!/5!, uma simplificação de fatorial). Assim, fatorial é inseparável de problemas reais envolvendo ordem, sequência e permutação de recursos.
              </p>
              <p>
                A CESGRANRIO raramente pede apenas "calcule 8!". Em vez disso, apresenta expressões como 10!/8!, 8!/(5! × 3!), ou 12!/(4! × 3! × 5!). Aqui a chave é <strong>simplificação antes de cálculo</strong>. Nunca calcule fatoriais brutos — primeiro cancele os termos comuns. Por exemplo: 10!/8! = (10 × 9 × 8!)/8! = 10 × 9 = 90. Ou: 8!/(5! × 3!) = (8 × 7 × 6 × 5!)/(5! × 3 × 2 × 1) = (8 × 7 × 6)/(6) = 56. A banca testa se você domina essa simplificação porque candidatos que tentam calcular valores brutos perdem tempo crítico. Outra pegadinha é expressões como 7! + 8! ou 5! × 6!. Observe que 7! + 8! = 7! + 8×7! = 7!(1 + 8) = 9 × 7! (não é 9!). Frequentemente, candidatos erram somando ou multiplicando fatoriais sem entender a propriedade subjacente.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground text-lg">Definição e Propriedades do Fatorial</h4>
                <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-3">
                  <div className="font-mono text-center">
                    <p className="text-sm md:text-base"><strong>n! = n × (n-1) × (n-2) × ... × 2 × 1</strong></p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-1">Para n ≥ 1</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                    {[
                      { n: "0!", v: "1" },
                      { n: "1!", v: "1" },
                      { n: "2!", v: "2" },
                      { n: "3!", v: "6" },
                      { n: "4!", v: "24" },
                      { n: "5!", v: "120" },
                      { n: "6!", v: "720" },
                      { n: "7!", v: "5040" },
                      { n: "8!", v: "40320" },
                    ].map((item) => (
                      <div key={item.n} className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-center">
                        <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-600 dark:text-blue-400">{item.n}</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">{item.v}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed mt-3">✅ <strong>Memorize:</strong> 0! = 1 (por definição), 1! = 1, 10! = 3.628.800, e use simplificação para valores maiores</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Definição de Fatorial"
              description="n! representa o produto de todos os inteiros positivos de 1 até n."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fatorial: Definição e Cálculo"
              icone="❗"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é Fatorial",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>fatorial de n</strong> (escrito n!) é o produto de todos os inteiros de 1 até n:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-xl font-mono text-center text-foreground/85 leading-relaxed">n! = n × (n−1) × (n−2) × ... × 2 × 1</p>
                        <p className="text-xl font-mono text-center mt-2 text-foreground/85 leading-relaxed">Por convenção: 0! = 1</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {[
                          { n: "1!", v: "1" },
                          { n: "2!", v: "2" },
                          { n: "3!", v: "6" },
                          { n: "4!", v: "24" },
                          { n: "5!", v: "120" },
                          { n: "6!", v: "720" },
                          { n: "7!", v: "5040" },
                          { n: "10!", v: "3.628.800" },
                        ].map((item) => (
                          <div key={item.n} className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-center">
                            <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500">{item.n}</p>
                            <p className="text-xl font-mono text-foreground/85 leading-relaxed">{item.v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Simplificação de Fatoriais",
                  icone: "✂️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Nunca calcule fatoriais grandes individualmente. <strong>Simplifique primeiro</strong>, cancelando o fatorial menor:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xl font-bold text-emerald-500 mb-2 text-foreground/85 leading-relaxed">Exemplo 1: 10! / 8!</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">= (10 × 9 × <span className="text-muted-foreground">8!</span>) / <span className="text-muted-foreground">8!</span></p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">= 10 × 9 = <strong>90</strong></p>
                        </div>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-500 mb-2 text-foreground/85 leading-relaxed">Exemplo 2: 8! / (5! × 3!)</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">= (8 × 7 × 6 × <span className="text-muted-foreground">5!</span>) / (<span className="text-muted-foreground">5!</span> × 6)</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">= (8 × 7 × 6) / 6 = 8 × 7 = <strong>56</strong></p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Dica de Velocidade">
                        Em prova, antes de calcular qualquer fatorial, verifique se há cancelamento. Candidatos que calculam fatoriais grandes perdem tempo valioso.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Por que 0! = 1",
                  icone: "🤔",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A definição 0! = 1 não é arbitrária — ela é necessária para que as fórmulas de combinatória funcionem corretamente:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl text-foreground/85 leading-relaxed">C(n, 0) = n! / (0! × n!) = n! / (1 × n!) = <strong>1</strong></p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Há exatamente 1 forma de escolher 0 elementos de um conjunto: o subconjunto vazio.</p>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl text-foreground/85 leading-relaxed">C(n, n) = n! / (n! × 0!) = <strong>1</strong></p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Há exatamente 1 forma de escolher todos os elementos: pegar o conjunto inteiro.</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca frequentemente usa C(n,0) ou C(n,n) em cálculos. Candidatos que não sabem 0!=1 erram essas questões. <strong>Memorize: 0! = 1, ponto final.</strong>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-2" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?"
          alternativas={[
            { letra: "A", texto: "25", correta: false },
              { letra: "B", texto: "60", correta: false },
              { letra: "C", texto: "120", correta: true },
              { letra: "D", texto: "240", correta: false },
              { letra: "E", texto: "720", correta: false }
          ]}
          dicaEstrategica="Aqui: 5 × 4 × 3 × 2 × 1 = 120."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "P(5) = 5!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 120." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "iG0_F6gW2QY",
              title: "Fatorial: A Operação das Multipicações",
              duration: "08:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Notação n!", type: "Fórmulário", placeholderColor: "bg-cyan-500/20" },
                { title: "Cálculo 0!", type: "Destaque", placeholderColor: "bg-blue-500/20" },
                { title: "Simplificação de Frações", type: "Passo a Passo", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "A Escada Decrescente",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">Para simplificar, "desça" o fatorial maior até encontrar o menor:</p>
                  <div className="flex justify-center flex-col items-center gap-2 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-mono">
                    <div className="px-4 py-1 bg-cyan-500 text-white rounded">10!</div>
                    <LuChevronDown className="w-4 h-4" />
                    <div className="px-4 py-1 bg-cyan-400 text-white rounded">10 × 9!</div>
                    <LuChevronDown className="w-4 h-4" />
                    <div className="px-4 py-1 bg-cyan-300 text-white rounded">10 × 9 × 8!</div>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "O Ritmo do Fatorial",
              artista: "MC Matemática"
            }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Fatorial"
              icone="❗"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: PERMUTAÇÃO SIMPLES                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner numero={3}
          titulo="Permutação Simples"
          descricao="Quando a ordem importa e usamos todos os elementos: quantas formas distintas de organizar n objetos diferentes."
           variant="blue"/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION: Permutação Simples */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos: Permutações Simples"
              description="Contando ordenações quando a ordem é essencial e todos os elementos são usados"
              variant="blue"
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Uma <strong>Permutação Simples</strong> é uma forma específica de organizar todos os elementos de um conjunto em sequência, onde a ordem é relevante e cada elemento é usado exatamente uma vez. Formalmente, uma permutação de n elementos distintos é qualquer arranjo de todos esses n elementos em uma sequência linear. O número total de permutações de n elementos é dado por P(n) = n!, que lê-se "n fatorial". Esta é uma das fórmulas mais fundamentais em análise combinatória, porque permutações aparecem em inúmeros contextos práticos: ordenação de pessoas em fila, sequências de tarefas, arranjos de assentos, etc. Historicamente, o conceito de permutação surgiu com o estudo de problemas de contagem no século XVI, particularmente em jogos de azar e criptografia. A CESGRANRIO testa permutações em praticamente todas as provas, frequentemente combinando-as com outras técnicas combinatórias.
              </p>
              <p>
                A razão pela qual P(n) = n! é intuitivamente clara: para a primeira posição, você tem n escolhas (qualquer um dos n elementos). Para a segunda posição, você tem (n-1) escolhas (o restante dos elementos, excluindo o que você escolheu para a primeira posição). Para a terceira, você tem (n-2) escolhas. Continuando essa lógica até a última posição, onde há 1 única escolha (o último elemento restante), o total de sequências é n × (n-1) × (n-2) × ... × 2 × 1 = n!. Imagine 5 pessoas em fila: há 5 escolhas para quem é primeiro, depois 4 para quem é segundo, depois 3 para terceiro, 2 para quarto e 1 para quinto. Total: 5 × 4 × 3 × 2 × 1 = 120 formas de organizar essas 5 pessoas. Esta multiplicação sucessiva é a essência de "permutações com restrição: cada elemento é único, e cada posição é única".
              </p>
              <p>
                Um ponto crítico: a permutação simples P(n) exige que <strong>TODOS os n elementos sejam usados</strong> e que <strong>não haja repetição</strong> (cada elemento aparece apenas uma vez na sequência). Se você só usa p elementos de um total de n (com p &lt; n), isso deixa de ser uma permutação simples e torna-se um <strong>Arranjo A(n,p) = n!/(n-p)!</strong>. Por exemplo, se você tem 10 corredores competindo por 1º, 2º e 3º lugar, está escolhendo 3 corredores de 10 — isto é A(10,3) = 10!/(10-3)! = 10 × 9 × 8 = 720, não P(3) = 6. Este é um erro extremamente comum em provas: confundir "permutação dos elementos escolhidos" com "arranjo dos elementos". Se o problema diz "escolha e ordene", é arranjo. Se diz "ordene todos", é permutação.
              </p>
              <p>
                Na prática operacional da Petrobras, permutações simples aparecem em decisões como: de quantas formas 8 funcionários podem ser dispostos em fila para revista de segurança? P(8) = 8! = 40.320 formas. De quantas maneiras 6 cores de sinalização podem ser sequenciadas em uma plataforma? P(6) = 720. De quantos jeitos uma sequência de 5 tarefas críticas pode ser ordenada? P(5) = 120. Cada uma dessas situações envolve organização completa (todos os elementos, todas as posições) onde ordem importa. Se o problema envolvesse "organizar alguns desses elementos" (ex.: escolher 3 das 6 cores para colocar em sequência), aí seria arranjo, não permutação.
              </p>
              <p>
                A CESGRANRIO testa permutações com pegadinhas sutis. A mais frequente é: "Quantas senhas de 5 algarismos distintos podemos formar?" Aqui você tem 10 algarismos (0-9) e quer usar 5 deles sem repetição, importando a ordem — logo é A(10,5) = 10 × 9 × 8 × 7 × 6 = 30.240, não P(5) = 120. Outra pegadinha envolve "restrições": "Quantas formas 4 pessoas podem se sentar em fila se João NÃO quer sentar ao lado de Maria?" Aqui você não usa P(4) = 24 diretamente — você deve usar a técnica de "complementar": total de assentos menos assentos proibidos. Total = P(4) = 24; assentos com João e Maria juntos = P(3) × 2 = 12 (trata João-Maria como bloco, arranja 3 blocos, multiplica por 2 pois podem estar em duas ordens). Logo, assentos separados = 24 - 12 = 12. Este tipo de raciocínio é crítico.
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground text-lg">Fórmula da Permutação Simples</h4>
                <div className="bg-white dark:bg-slate-900 rounded p-4 font-mono text-center space-y-2">
                  <p className="text-sm md:text-base"><strong>P(n) = n! = n × (n-1) × (n-2) × ... × 2 × 1</strong></p>
                  <p className="text-lg text-foreground/85 leading-relaxed mt-2">Válido quando: Todos os n elementos são usados, ordem importa, sem repetição</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-600 dark:text-emerald-400">✅ PERMUTAÇÃO quando:</p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-1">Todos os n elementos, ordem importa</p>
                    <p className="text-lg text-foreground/85 leading-relaxed font-mono mt-1">P(n) = n!</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-600 dark:text-blue-400">⚠️ ARRANJO quando:</p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-1">Usa p de n elementos, ordem importa</p>
                    <p className="text-lg text-foreground/85 leading-relaxed font-mono mt-1">A(n,p) = n!/(n-p)!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="P(n) = n! — A Fórmula da Permutação"
              description="O número de arranjos de n elementos distintos em todos os n lugares é n fatorial."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Permutação Simples: Conceito e Aplicação"
              icone="🔀"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição de Permutação Simples",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Permutação Simples</strong> conta o número de formas de organizar <em>n</em> objetos distintos em <em>n</em> posições distintas. Cada objeto ocupa exatamente uma posição.
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">P(n) = n!</p>
                        <p className="text-xl text-center mt-1 text-foreground/85 leading-relaxed">Todos os n elementos, todos os n lugares</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        5 técnicos da REPLAN precisam ser escalados em fila para receber treinamento. De quantas formas? P(5) = 5! = 120. Cada ordem é diferente: o técnico A na frente ≠ o técnico B na frente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Resolução Passo a Passo",
                  icone: "🪜",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Pense em <strong>preencher posições sequencialmente</strong>: a 1ª posição tem n opções, a 2ª tem n−1, a 3ª tem n−2, e assim por diante.
                      </p>
                      <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20">
                        <p className="text-xl font-bold text-teal-500 mb-3 text-foreground/85 leading-relaxed">Exemplo: 4 operadores em 4 turnos</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-lg text-foreground/85 leading-relaxed">Turno 1</p>
                            <p className="text-xl font-bold text-foreground/85 leading-relaxed">4 opções</p>
                          </div>
                          <span className="text-muted-foreground">×</span>
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-lg text-foreground/85 leading-relaxed">Turno 2</p>
                            <p className="text-xl font-bold text-foreground/85 leading-relaxed">3 opções</p>
                          </div>
                          <span className="text-muted-foreground">×</span>
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-lg text-foreground/85 leading-relaxed">Turno 3</p>
                            <p className="text-xl font-bold text-foreground/85 leading-relaxed">2 opções</p>
                          </div>
                          <span className="text-muted-foreground">×</span>
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-lg text-foreground/85 leading-relaxed">Turno 4</p>
                            <p className="text-xl font-bold text-foreground/85 leading-relaxed">1 opção</p>
                          </div>
                          <span className="text-muted-foreground">=</span>
                          <div className="px-3 py-2 bg-emerald-500/20 rounded border border-emerald-500/40 text-center">
                            <p className="text-xl font-bold text-emerald-500 text-foreground/85 leading-relaxed">24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Permutação vs. Arranjo",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Permutação usa TODOS os n elementos</strong>. Quando você usa apenas p elementos de n (com p &lt; n), é um <strong>Arranjo A(n,p)</strong>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">Permutação P(n)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">n elementos → n lugares</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">P(5) = 5! = 120</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">5 técnicos em 5 turnos</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Arranjo A(n,p)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">n elementos → p lugares (p &lt; n)</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">A(8,3) = 8×7×6 = 336</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">8 barcos, pódio de 3</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "De quantas formas o pódio pode ser preenchido com 3 finalistas de 8 equipes?" Isso é <strong>Arranjo A(8,3)</strong>, não permutação P(3) = 6 (que seria apenas a ordenação dos 3 finalistas entre si).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-3" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?"
          alternativas={[
            { letra: "A", texto: "25", correta: false },
              { letra: "B", texto: "60", correta: false },
              { letra: "C", texto: "120", correta: true },
              { letra: "D", texto: "240", correta: false },
              { letra: "E", texto: "720", correta: false }
          ]}
          dicaEstrategica="Aqui: 5 × 4 × 3 × 2 × 1 = 120."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "P(5) = 5!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 120." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "h6V7j6b7M0I",
              title: "Permutação Simples: Mudando Tudo de Lugar",
              duration: "09:15"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Fórmula P(n)", type: "Resumo", placeholderColor: "bg-emerald-500/20" },
                { title: "Organização em Fila", type: "Visual", placeholderColor: "bg-teal-500/20" },
                { title: "Anagramas Simples", type: "Exemplo", placeholderColor: "bg-green-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Ancoragem de Elementos",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">"Quantos anagramas de PETRO começam com P?"</p>
                  <div className="flex gap-2 justify-center">
                    <div className="w-10 h-10 bg-rose-500 text-white flex items-center justify-center rounded font-bold">P</div>
                    <div className="w-10 h-10 border border-emerald-500 flex items-center justify-center rounded font-bold text-emerald-500 animate-pulse">4!</div>
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed text-center mt-2">Fixe o elemento estático e permute apenas o restante.</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "Dança das Cadeiras (Permutação)",
              artista: "Pop Logic"
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Permutação Simples"
              icone="🔀"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: PERMUTAÇÃO COM REPETIÇÃO                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner numero={4}
          titulo="Permutação com Repetição"
          descricao="Quando alguns elementos são idênticos, organizações que parecem distintas são na verdade iguais. Aprenda a corrigir a contagem."
           variant="blue"/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION: Permutação com Repetição */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos: Permutações com Elementos Repetidos"
              description="Ajustando contagens quando alguns elementos são indistinguíveis entre si"
              variant="blue"
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Na vida real, nem sempre temos n elementos completamente distintos. Frequentemente, alguns elementos são idênticos (repetidos). Uma <strong>Permutação com Repetição</strong> é uma organização de n elementos onde alguns são iguais entre si. Por exemplo, as letras da palavra "MISSISSIPPI" incluem repetições: 1 M, 4 I's, 4 S's e 2 P's. O número total de organizações distintas dessas 11 letras é calculado dividindo 11! pelas permutações dos elementos iguais: 11! / (1! × 4! × 4! × 2!) = 34.650 formas. Esta fórmula é crucial porque, sem divisão, você contaria múltiplas vezes a mesma palavra (trocar dois I's de posição gera a "mesma" palavra visualmente). A CESGRANRIO testa isso frequentemente em problemas de anagramas, códigos com dígitos repetidos e sequências de cores ou símbolos.
              </p>
              <p>
                A intuição da fórmula é clara: comece com P(n) = n!, que conta todas as maneiras de organizar n elementos distintos. Mas se alguns elementos são idênticos, você over-conta. Se há k₁ cópias de um elemento idêntico, essas k₁ cópias podem ser permutadas entre si de k₁! formas, mas como são indistinguíveis, essas k₁! arranjos contam como 1 único arranjo visual. Portanto, divida por k₁!. Faça isso para cada grupo de elementos repetidos. A fórmula geral é: P(n; k₁, k₂, ..., kₘ) = n! / (k₁! × k₂! × ... × kₘ!), onde k₁ + k₂ + ... + kₘ = n. Por exemplo, a palavra "ABA" tem 3 letras, com 2 A's repetidos: P(3; 2, 1) = 3! / (2! × 1!) = 6 / 2 = 3 arranjos distintos (ABA, BAA, AAB). Se calculasse P(3) = 6, estaria contando ABA uma única vez visualmente, mas como unidade "A1 B A2" versus "A2 B A1", que são visualmente iguais.
              </p>
              <p>
                O domínio dessa fórmula é essencial porque ela aparece em contextos industriais reais da Petrobras. Por exemplo: você tem 5 etiquetas de cor para sinalização de tanques — 2 vermelhas, 1 azul, 1 verde e 1 amarela. Quantas sequências diferentes de sinalização podem ser criadas? P(5; 2, 1, 1, 1) = 5! / (2! × 1! × 1! × 1!) = 120 / 2 = 60 sequências. Se fosse P(5) = 120, estaria duplicando cada configuração que troca as duas etiquetas vermelhas. Outro exemplo: um código de acesso usa 4 dígitos, com 3 zeros e 1 nonce. Quantos códigos distintos? P(4; 3, 1) = 4! / 3! = 24 / 6 = 4 códigos (0001, 0010, 0100, 1000). Esta fórmula permite contagem precisa em situações com simetria.
              </p>
              <p>
                Um aspecto crítico é <strong>identificar o que se repete</strong>. O enunciado pode dizer explicitamente ("2 bolas vermelhas, 3 azuis") ou pode exigir que você identifique (um anagrama da palavra "BANANA" — 1 B, 3 A's, 1 N, 1 A = 6 letras, com 3 A's iguais). Aplicar a fórmula errada é o erro mais frequente. Por exemplo, se um candidato vê "quantos anagramas de BANANA" e calcula P(6) = 720 sem dividir por 3!, obterá uma resposta 6 vezes maior do que correta. A CESGRANRIO observa atentamente se o candidato identifica repetições.
              </p>
              <p>
                A CESGRANRIO testa essa fórmula de forma traiçoeira. Exemplo: "Quantos números de 5 dígitos podem ser formados usando os dígitos 1, 1, 2, 2, 3?" Aqui, há 5 dígitos no total, com 2 uns repetidos e 2 dois repetidos. Resposta: P(5; 2, 2, 1) = 5! / (2! × 2! × 1!) = 120 / 4 = 30 números. Um candidato ingênuo que calcula 5 × 4 × 3 × 2 × 1 = 120 está completamente errado porque não contabilizou as repetições. Outra pegadinha: "Quantas maneiras de arranjar 4 bolas em fila se 2 são vermelhas, 1 azul e 1 verde?" Alguns candidatos confundem com arranjo A(4,3) ou permutação P(4). A resposta correta é P(4; 2, 1, 1) = 4! / (2! × 1! × 1!) = 24 / 2 = 12. Dominar a identificação da aplicação é crítico.
              </p>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground text-lg">Fórmula da Permutação com Repetição</h4>
                <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-2">
                  <p className="font-mono text-center text-sm md:text-base"><strong>P(n; k₁, k₂, ..., kₘ) = n! / (k₁! × k₂! × ... × kₘ!)</strong></p>
                  <p className="text-lg text-foreground/85 leading-relaxed text-center mt-2">Onde: n = total de elementos | k₁, k₂, ..., kₘ = quantidade de cada tipo repetido | k₁ + k₂ + ... + kₘ = n</p>
                  <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/20 rounded">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-rose-600 dark:text-rose-400">Exemplo: Palavra "AAABBC" (6 letras, 3 A's, 2 B's, 1 C)</p>
                    <p className="text-lg text-foreground/85 leading-relaxed font-mono mt-1">P(6; 3, 2, 1) = 6! / (3! × 2! × 1!) = 720 / (6 × 2 × 1) = 60 anagramas distintos</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="P(n; n₁, n₂, ...) = n! / (n₁! × n₂! × ...)"
              description="Divida pelo fatorial de cada grupo de elementos repetidos para eliminar contagens duplicadas."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Permutação com Repetição: Conceito e Fórmula"
              icone="🔁"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Por que dividir pelos fatoriais?",
                  icone: "🧩",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Se temos n elementos onde alguns são idênticos, trocar elementos iguais de posição <strong>não gera um arranjo novo</strong>. Precisamos dividir pelas repetições:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-xl font-mono text-center text-foreground/85 leading-relaxed">P(n; n₁, n₂, ..., nₖ) = n! / (n₁! × n₂! × ... × nₖ!)</p>
                        <p className="text-xl text-center mt-1 text-foreground/85 leading-relaxed">onde n₁ + n₂ + ... + nₖ = n</p>
                      </div>
                      <AlertBox tipo="info" titulo="Exemplo Industrial">
                        Sinalizadores em linha: 3 vermelhos (V,V,V) e 2 amarelos (A,A). Sem contar repetições: 5! = 120. Mas V₁V₂V₃A₁A₂ = V₂V₁V₃A₁A₂ (os vermelhos são idênticos). Dividimos: 5!/(3!×2!) = 120/12 = <strong>10 arranjos distintos</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Anagramas de Palavras",
                  icone: "🔤",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Anagramas são as permutações das letras de uma palavra. Quando há letras repetidas, usa-se a fórmula da permutação com repetição:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-500 mb-2 text-foreground/85 leading-relaxed">PETRO (5 letras, todas distintas)</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">P(5) = 5! = <strong>120 anagramas</strong></p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-500 mb-2 text-foreground/85 leading-relaxed">BACIA (5 letras, A aparece 2×)</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">P(5; 2) = 5!/2! = 120/2 = <strong>60 anagramas</strong></p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xl font-bold text-cyan-500 mb-2 text-foreground/85 leading-relaxed">RADAR (5 letras, R aparece 2×, A aparece 2×)</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">P(5; 2, 2) = 5!/(2!×2!) = 120/4 = <strong>30 anagramas</strong></p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Conexão com Combinação",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Existe uma ligação elegante entre permutação com repetição e combinação:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl font-bold text-foreground/85 leading-relaxed">P(n; p, n−p) = C(n, p)</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Permutação de n elementos em 2 grupos (p e n−p) é igual a combinar n tomados p a p.</p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Ex: P(5; 3, 2) = 5!/(3!×2!) = 10 = C(5,2)</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca pode pedir "permutação de n objetos com k iguais" ou "combinação de n tomados k a k" — ambos dão o mesmo resultado! Reconheça as duas formas de enunciar o mesmo problema.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-4" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?"
          alternativas={[
            { letra: "A", texto: "25", correta: false },
              { letra: "B", texto: "60", correta: false },
              { letra: "C", texto: "120", correta: true },
              { letra: "D", texto: "240", correta: false },
              { letra: "E", texto: "720", correta: false }
          ]}
          dicaEstrategica="Aqui: 5 × 4 × 3 × 2 × 1 = 120."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "P(5) = 5!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 120." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="indigo"
            video={{
              videoId: "8v2S4cI9U0k",
              title: "Permutação com Repetição: Corrigindo Dossiês",
              duration: "11:50"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "A Divisão Corretiva", type: "Infográfico", placeholderColor: "bg-indigo-500/20" },
                { title: "Anagramas Complexos", type: "Lista", placeholderColor: "bg-blue-500/20" },
                { title: "Elementos Idênticos", type: "Diagrama", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Eco das Repetições",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">Para cada "eco" de letra repetida, um fatorial divide o total:</p>
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-mono text-center">
                    <p className="text-lg">ARA<span className="text-rose-500">R</span>A</p>
                    <div className="w-full h-px bg-foreground my-1" />
                    <p className="text-lg">3! (As) &times; 2! (Rs)</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Eco das Repetições",
              artista: "DJ Dividir"
            }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Permutação com Repetição"
              icone="🔁"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: ARRANJO SIMPLES                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner numero={5}
          titulo="Arranjo Simples"
          descricao="Selecionar e ordenar p elementos de um conjunto de n: a ordem importa e cada elemento é usado no máximo uma vez."
           variant="blue"/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION: Arranjo Simples */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos: Arranjos Simples"
              description="Selecionando e ordenando um subconjunto de elementos de um conjunto maior"
              variant="blue"
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Um <strong>Arranjo Simples A(n,p)</strong> é a seleção ordenada de p elementos distintos de um conjunto de n elementos, onde p ≤ n. A ordem importa — o arranjo (A, B, C) é diferente de (C, B, A) — e nenhum elemento pode ser repetido. A fórmula é A(n,p) = n!/(n-p)! = n × (n-1) × ... × (n-p+1), que são exatamente p termos consecutivos começando de n. Por exemplo, A(10,3) = 10 × 9 × 8 = 720. Esta é a situação de "podium" em competições: 10 competidores, mas apenas 3 colocações (1º, 2º, 3º). Há 10 escolhas para 1º, 9 para 2º (o 1º já foi escolhido), e 8 para 3º, totalizando 10 × 9 × 8 = 720 combinações de pódio. A CESGRANRIO testa arranjos em cenários onde seleção E ordem ambas importam — uma das situações mais comuns em provas de concurso.
              </p>
              <p>
                A diferença entre arranjo e permutação é sutil mas crítica. Permutação P(n) = n! usa TODOS os n elementos, enquanto arranjo A(n,p) usa apenas p deles. Se p = n, então A(n,n) = n!/(n-n)! = n!/0! = n! = P(n), e arranjo torna-se permutação. Mas se p &lt; n, arranjo é "mais apertado" que permutação. A diferença entre arranjo e combinação é ainda mais importante: arranjo conta ordem (AB ≠ BA), enquanto combinação não (AB = BA). Se você está escolhendo 3 pessoas de 10 para formar um comitê de chefia (presidente, secretário, tesoureiro — cargos distintos), é arranjo porque os cargos dão ordem: A(10,3) = 720. Se está escolhendo 3 pessoas de 10 para um comitê sem cargos (apenas 3 membros iguais), é combinação: C(10,3) = 120. Este é o erro mais frequente em provas: confundir arranjo com combinação.
              </p>
              <p>
                Na prática operacional de Petrobras, arranjos surgem constantemente. Um pátio tem 8 espaços de estacionamento e 5 carros a estacionar. Quantas formas de ocupar os espaços? A(8,5) = 8 × 7 × 6 × 5 × 4 = 6.720 arranjos. Uma equipe de projeto precisa designar 4 pessoas de 12 para coordenador, vice-coordenador, assistente técnico e auxiliar (4 papéis distintos). Há A(12,4) = 12 × 11 × 10 × 9 = 11.880 formas de fazer isso. Se o problema fosse "escolha apenas 4 pessoas para a equipe, sem papéis específicos", seria C(12,4) = 495 (bem menor). O contexto de "papéis distintos" versus "apenas membros" diferencia arranjo de combinação.
              </p>
              <p>
                A CESGRANRIO frequentemente "disfarça" o arranjo em linguagem prática. Exemplo: "Uma agência de viagens oferece 8 pontos turísticos. Um turista quer visitar exatamente 4 deles, em uma sequência específica. Quantos itinerários são possíveis?" Resposta: A(8,4) = 8 × 7 × 6 × 5 = 1.680 itinerários. A palavra "sequência" sinaliza que ordem importa — é arranjo. Se o enunciado disser apenas "escolha 4 desses 8 pontos", sem mencionar sequência ou ordem, seria combinação C(8,4) = 70. Candidatos que ignoram palavras-chave ("sequência", "ordem", "posição", "lugar") frequentemente confundem arranjo e combinação.
              </p>
              <p>
                Pegadinhas de CESGRANRIO com arranjos são sutis. Uma comum: "Quantas senhas de 4 caracteres podem ser formadas usando letras A-Z sem repetição?" Resposta: A(26,4) = 26 × 25 × 24 × 23 = 358.800. Um candidato que calcula 26^4 (permitindo repetição) ou C(26,4) (ignorando ordem) está errado. Outra: "De um baralho de 52 cartas, quantas mãos de 5 cartas onde a sequência importa?" A(52,5) — mas a maioria de provas de poker usa combinação porque uma "mão" é apenas um conjunto, não uma sequência. O contexto importa. Finalmente, manipulação algébrica: "Se A(n,3) = 24, qual é n?" Aqui, n × (n-1) × (n-2) = 24. Testando: n=4 → 4×3×2=24 ✓. Logo n=4. A CESGRANRIO testa essa manipulação menos frequentemente, mas pode aparecer.
              </p>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200 dark:border-violet-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground text-lg">Fórmula do Arranjo Simples</h4>
                <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-3">
                  <div className="font-mono text-center">
                    <p className="text-sm md:text-base"><strong>A(n,p) = n! / (n-p)! = n × (n-1) × ... × (n-p+1)</strong></p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-2">Exatamente p termos consecutivos começando de n</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded">
                      <p className="text-lg text-foreground/85 leading-relaxed font-bold text-violet-600 dark:text-violet-400">✅ ARRANJO quando:</p>
                      <p className="text-lg text-foreground/85 leading-relaxed mt-1">Seleciona p de n, ordem importa (papéis/posições)</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded">
                      <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-600 dark:text-emerald-400">⚠️ COMBINAÇÃO quando:</p>
                      <p className="text-lg text-foreground/85 leading-relaxed mt-1">Seleciona p de n, ordem NÃO importa (comitê)</p>
                    </div>
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed text-center mt-3">Palavra-chave "pódio", "posto", "sequência", "ordem" → Arranjo. Palavra-chave "comitê", "grupo", "seleção" → Combinação</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="A(n,p) = n! / (n−p)!"
              description="Escolher p de n elementos onde a ordem importa — mais que combinação, menos que permutação total."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Arranjo Simples: Quando a Ordem Importa"
              icone="🏆"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Fórmula",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>Arranjo Simples A(n,p)</strong> conta o número de formas de selecionar e ordenar <em>p</em> elementos de um conjunto de <em>n</em> elementos distintos, sem repetição:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">A(n, p) = n! / (n − p)!</p>
                        <p className="text-xl font-mono text-center mt-1 text-foreground/85 leading-relaxed">= n × (n−1) × ... × (n−p+1)</p>
                        <p className="text-xl text-center mt-1 text-foreground/85 leading-relaxed">São exatamente p fatores, começando por n</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        De 10 técnicos, escolher e ordenar 3 para os cargos de líder, vice-líder e secretário de turno: A(10,3) = 10×9×8 = <strong>720 formas</strong>. A ordem importa porque líder ≠ vice-líder.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Arranjo vs. Combinação: A Diferença Crítica",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A única diferença entre arranjo e combinação é se a <strong>ordem importa ou não</strong>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-indigo-500 mb-2">ARRANJO: Ordem Importa</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">A(5,3) = 5×4×3 = 60</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">ABC ≠ BAC ≠ CBA</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Cargos, pódio, senhas ordenadas</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">COMBINAÇÃO: Ordem Não Importa</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">C(5,3) = 10</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">ABC = BAC = CBA</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Grupos, equipes, comitês</p>
                        </div>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold text-foreground/85 leading-relaxed">Relação: A(n,p) = C(n,p) × p!</p>
                        <p className="text-xl mt-1 text-foreground/85 leading-relaxed">Para cada combinação de p elementos, há p! maneiras de ordená-los → cada combinação gera p! arranjos.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo Rápido de Arranjos",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para calcular A(n,p), multiplique <strong>p números consecutivos decrescentes a partir de n</strong> — não precisa calcular fatoriais:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-500 text-foreground/85 leading-relaxed">A(8, 3) = ?</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">= 8 × 7 × 6 = <strong>336</strong></p>
                          <p className="text-lg text-foreground/85 leading-relaxed">3 fatores começando em 8</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xl font-bold text-cyan-500 text-foreground/85 leading-relaxed">A(12, 4) = ?</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">= 12 × 11 × 10 × 9 = <strong>11.880</strong></p>
                          <p className="text-lg text-foreground/85 leading-relaxed">4 fatores começando em 12</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "De 12 equipes, de quantas formas os 3 primeiros lugares podem ser distribuídos?" → A(12,3) = 1320. A banca testa se você usa arranjo (ordem importa) ou combinação (ordem não importa) neste contexto.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-5" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?"
          alternativas={[
            { letra: "A", texto: "25", correta: false },
              { letra: "B", texto: "60", correta: false },
              { letra: "C", texto: "120", correta: true },
              { letra: "D", texto: "240", correta: false },
              { letra: "E", texto: "720", correta: false }
          ]}
          dicaEstrategica="Aqui: 5 × 4 × 3 × 2 × 1 = 120."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "P(5) = 5!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 120." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="indigo"
            video={{
              videoId: "Z1o6Hq0J-i8",
              title: "Arranjo Simples: Diferenciando da Combinação",
              duration: "09:50"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Definição A(n,p)", type: "Fórmula", placeholderColor: "bg-indigo-500/20" },
                { title: "A Ordem Importa?", type: "Decisão", placeholderColor: "bg-blue-500/20" },
                { title: "Cálculo por Traços", type: "Prático", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "A Senha da Ordem",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">Se mudar a ordem altera o resultado (ex: senha, cargo), é ARRANJO:</p>
                  <div className="flex justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-indigo-500 text-white rounded font-mono">123</div>
                      <span className="text-[10px] uppercase">≠</span>
                      <div className="p-2 bg-indigo-500 text-white rounded font-mono">321</div>
                    </div>
                    <div className="flex items-center text-indigo-500 font-bold">⇒ ARRANJO</div>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Ranking da Vitória",
              artista: "Banda Posicional"
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Arranjo Simples"
              icone="🏆"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: COMBINAÇÃO SIMPLES                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner numero={6}
          titulo="Combinação Simples"
          descricao="Selecionar p elementos de n sem se preocupar com a ordem: equipes, grupos, subconjuntos — o conceito mais cobrado em provas."
           variant="blue"/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION: Combinação Simples */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos: Combinações Simples"
              description="Selecionando subconjuntos quando a ordem de seleção não importa"
              variant="blue"
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Uma <strong>Combinação Simples C(n,p)</strong> é a seleção de p elementos distintos de um conjunto de n elementos, onde a ordem NÃO importa. Formalmente, é o número de subconjuntos de tamanho p que podem ser formados de um conjunto de tamanho n. A fórmula é C(n,p) = n! / [p! × (n-p)!]. Por exemplo, C(8,3) = 8!/(3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 56. Esta é a fórmula central da análise combinatória, pois combinações aparecem em praticamente toda situação em que você "escolhe um grupo" de pessoas, objetos ou opções. A diferença crucial com relação a arranjos é que a ordem não importa: o grupo &#123;A, B, C&#125; é idêntico ao grupo &#123;C, B, A&#125; — é o mesmo subconjunto. A CESGRANRIO testa combinações em mais problemas do que qualquer outra técnica combinatória, porque situações de "escolha de grupo" são muito comuns em contextos práticos.
              </p>
              <p>
                A intuição de por que dividimos por p! é clara: se você calcula A(n,p) = n!/(n-p)!, está contando ordenações (arranjos). Mas combinações não se importam com a ordem. Se há p elementos escolhidos, esses p elementos podem ser ordenados de p! formas diferentes — porém todas essas ordenações representam o MESMO grupo (combinação). Portanto, dividindo A(n,p) por p!, você remove a contagem excessiva de ordenações: C(n,p) = A(n,p) / p! = [n!/(n-p)!] / p! = n! / [p! × (n-p)!]. Exemplo: de 5 pessoas, quantas maneiras escolher 3 para um comitê? A(5,3) = 5 × 4 × 3 = 60 (se ordem importasse — chefe, vice, secretário). Mas se é só "3 pessoas iguais", dividimos por 3! = 6: C(5,3) = 60 / 6 = 10 grupos distintos. Visualmente, os 10 grupos são &#123;1,2,3&#125;, &#123;1,2,4&#125;, &#123;1,2,5&#125;, &#123;1,3,4&#125;, &#123;1,3,5&#125;, &#123;1,4,5&#125;, &#123;2,3,4&#125;, &#123;2,3,5&#125;, &#123;2,4,5&#125;, &#123;3,4,5&#125;.
              </p>
              <p>
                Uma propriedade crítica é a <strong>simetria C(n,p) = C(n, n-p)</strong>. Por que? Porque escolher p elementos de n é o mesmo que "deixar de fora" (n-p) elementos. Se você escolhe 3 de 8, deixa 5 de fora; há C(8,3) = 56 formas. Se você escolhe quais 5 deixar de fora, há C(8,5) = 56 formas — idêntico! Este insight permite simplificar cálculos: C(100, 99) = C(100, 1) = 100 (escolher 99 de 100 é o mesmo que escolher qual 1 deixar de fora). A CESGRANRIO explora essa simetria em cálculos onde p é grande, forçando candidatos que não sabem da propriedade a fazer contas enormes desnecessariamente.
              </p>
              <p>
                Na prática de Petrobras, combinações aparecem em contextos como: de 12 engenheiros, quantos comitês de 4 pessoas podem ser formados? C(12,4) = (12 × 11 × 10 × 9) / (4 × 3 × 2 × 1) = 11.880 / 24 = 495 comitês. De 20 materiais disponíveis, de quantas formas escolher 3 para um projeto? C(20,3) = 1.140. De 6 projetos, quantas combinações de 2 podem ser selecionadas para análise? C(6,2) = 15. Diferente de "arranjo", onde cargos ou posições dão ordem, "combinação" é quando o grupo é homogêneo — todos os membros têm igualdade de "peso". Se o problema diz "comitê", "equipe", "grupo", "seleção", é combinação. Se diz "pódio", "cargo", "sequência", "ordem", é arranjo.
              </p>
              <p>
                A CESGRANRIO testa combinações com armadilhas frequentes. Uma comum: "De 10 pessoas, quantas duplas podem se formar para um trabalho?" C(10,2) = 45. Um candidato ingênuo que calcula A(10,2) = 90 (pensando em "primeira pessoa" e "segunda pessoa") está errado — pares não têm ordem. Outra pegadinha: "De um total de 8 times em um campeonato, quantos jogos há se cada time joga cada outro time uma vez?" C(8,2) = 28 jogos (cada jogo é um par de times). Se fosse "com ida e volta", seria A(8,2) = 56. A banca testa se você diferencia "encontros únicos" (combinação) de "confrontos com mandante" (arranjo). Finalmente, expressões com combinação: "Se C(n,2) = 45, qual n?" Resolvendo: n(n-1)/2 = 45 → n(n-1) = 90 → n² - n - 90 = 0 → n = 10. A CESGRANRIO ocasionalmente testa essa manipulação algébrica com combinações.
              </p>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground text-lg">Fórmula da Combinação Simples</h4>
                <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-3">
                  <div className="font-mono text-center">
                    <p className="text-sm md:text-base"><strong>C(n,p) = n! / [p! × (n-p)!]</strong></p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-2">Propriedade: C(n,p) = C(n, n-p) — Simetria</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded">
                      <p className="text-lg text-foreground/85 leading-relaxed font-bold text-amber-600 dark:text-amber-400">✅ COMBINAÇÃO quando:</p>
                      <p className="text-lg text-foreground/85 leading-relaxed mt-1">Ordem NÃO importa (grupo, comitê, equipe)</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                      <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-600 dark:text-blue-400">⚠️ ARRANJO quando:</p>
                      <p className="text-lg text-foreground/85 leading-relaxed mt-1">Ordem importa (pódio, cargos, sequência)</p>
                    </div>
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed text-center mt-3">Atalho: C(n,2) = n(n-1)/2 para "apertos de mão", "diagonais", "pares"</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="C(n,p) = n! / [p! × (n−p)!]"
              description="A fórmula mais importante da análise combinatória: contagem de subgrupos sem levar em conta a ordem."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Combinação Simples: O Conceito Central"
              icone="👥"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Fórmula",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Combinação Simples C(n,p)</strong> conta o número de subconjuntos de tamanho <em>p</em> que podem ser formados de um conjunto de <em>n</em> elementos, <strong>sem repetição e sem considerar a ordem</strong>:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">C(n, p) = n! / [p! × (n−p)!]</p>
                        <p className="text-xl font-mono text-center mt-1 text-foreground/85 leading-relaxed">Também escrito como Cₙᵖ ou ⁿCₚ ou (ⁿₚ)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        De 8 técnicos da REPLAN, quantas equipes de 3 podem ser formadas para inspeção? C(8,3) = (8×7×6)/(3×2×1) = 336/6 = <strong>56 equipes</strong>. A equipe &#123;João, Maria, Pedro&#125; é a mesma que &#123;Pedro, João, Maria&#125;.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo Eficiente de C(n,p)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Use sempre o menor entre p e (n−p) no denominador — isso minimiza o cálculo:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-500 mb-2 text-foreground/85 leading-relaxed">C(10, 4) — use C(10,4) pois 4 &lt; 6</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">= (10×9×8×7) / (4×3×2×1) = 5040/24 = <strong>210</strong></p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-500 mb-2 text-foreground/85 leading-relaxed">C(10, 7) = C(10, 3) pela simetria</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">= (10×9×8) / (3×2×1) = 720/6 = <strong>120</strong></p>
                        </div>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold text-foreground/85 leading-relaxed">Atalho: C(n, 2) = n(n−1)/2</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Apertos de mão, diagonais de polígono — sempre C(n,2) = n(n−1)/2.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Problemas Clássicos com Combinação",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500 mb-2">Apertos de Mão</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">n pessoas, cada par cumprimenta uma vez:</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">C(n, 2) = n(n−1)/2</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">6 gerentes → C(6,2) = 15 apertos</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Diagonais de Polígono</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">n vértices, subtraindo os n lados:</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">C(n,2) − n = n(n−3)/2</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Octógono → C(8,2)−8 = 28−8 = 20</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "Quantos jogos em um torneio todos-contra-todos?" = C(n,2). "Com ida e volta?" = A(n,2) = n(n−1). A banca testa se você distingue partidas com e sem mandante.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-6" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?"
          alternativas={[
            { letra: "A", texto: "25", correta: false },
              { letra: "B", texto: "60", correta: false },
              { letra: "C", texto: "120", correta: true },
              { letra: "D", texto: "240", correta: false },
              { letra: "E", texto: "720", correta: false }
          ]}
          dicaEstrategica="Aqui: 5 × 4 × 3 × 2 × 1 = 120."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "P(5) = 5!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 120." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="indigo"
            video={{
              videoId: "_bL1Qn6GezU",
              title: "Combinação Simples: O Coração da Combinatória",
              duration: "12:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Fórmula C(n,p)", type: "Teoria", placeholderColor: "bg-indigo-500/20" },
                { title: "Grupos e Comissões", type: "Exemplo", placeholderColor: "bg-blue-500/20" },
                { title: "Relação com Arranjo", type: "Comparação", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Equipe é União",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">Se mudar a ordem NÃO altera o grupo (ex: equipe, salada), é COMBINAÇÃO:</p>
                  <div className="flex justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-emerald-500 text-white rounded font-mono">A+B</div>
                      <span className="text-[10px] uppercase">=</span>
                      <div className="p-2 bg-emerald-500 text-white rounded font-mono">B+A</div>
                    </div>
                    <div className="flex items-center text-emerald-500 font-bold">⇒ COMBINAÇÃO</div>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "União sem Ordem",
              artista: "Voz do Povo"
            }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Combinação Simples"
              icone="👥"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: COMBINAÇÃO COM REPETIÇÃO                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner numero={7}
          titulo="Combinação com Repetição"
          descricao="Quando é permitido escolher o mesmo elemento mais de uma vez: o mais difícil dos problemas de combinatória."
           variant="blue"/>
        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION: Combinação com Repetição */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos: Combinações com Repetição"
              description="Selecionando elementos quando múltiplas cópias de cada elemento podem ser escolhidas"
              variant="blue"
            />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Uma <strong>Combinação com Repetição CR(n,p)</strong> é a seleção de p elementos de um conjunto de n tipos diferentes, onde cada tipo pode ser escolhido múltiplas vezes (com repetição) e a ordem não importa. Por exemplo, quantas formas de comprar 5 sorvetes de 3 sabores diferentes? Você pode comprar 5 de baunilha, ou 3 de morango e 2 de chocolate, etc. A fórmula, que é notavelmente elegante, é CR(n,p) = C(n+p-1, p) = (n+p-1)! / [p! × (n-1)!]. Para o exemplo: CR(3,5) = C(3+5-1, 5) = C(7,5) = C(7,2) = 21 formas de comprar 5 sorvetes de 3 sabores. Esta é a fórmula menos intuitiva em análise combinatória, mas crucial para problemas envolvendo "distribuição com repetição" — um padrão recorrente em provas da CESGRANRIO, especialmente em contextos de alocação de recursos, seleção com reposição ou problemas de "stars and bars".
              </p>
              <p>
                A intuição por trás da fórmula CR(n,p) = C(n+p-1, p) é revelada através do método "stars and bars" (estrelas e barras). Imagine p "estrelas" (objetos a selar) e (n-1) "barras" (separadores de categoria). Para contar formas de distribuir p objetos entre n categorias, você precisa de (n-1) barras para criar n compartimentos. Por exemplo, com 5 sorvetes e 3 sabores, imagine 5 estrelas (* * * * *) e 2 barras (|). O padrão ** | * | ** representa 2 de baunilha, 1 de morango, 2 de chocolate. O número total de arranjos de 5 estrelas + 2 barras é C(5+2, 2) = C(7,2) = 21. Generalizando: CR(n,p) = C(p + (n-1), n-1) = C(n+p-1, p). Este método transforma um problema confuso com repetição em uma simples combinação, daí o termo "fórmula mágica".
              </p>
              <p>
                Um aspecto crítico: combinação com repetição é <strong>diferente</strong> de arranjo com repetição ou permutação com repetição. Combinação com repetição significa que ordem não importa E repetição é permitida. Exemplos práticos: quantas maneiras de escolher 3 frutas de 4 tipos em uma frutaria onde há abundância de cada tipo? CR(4,3) = C(6,3) = 20. Quantas maneiras de distribuir 10 moedas idênticas entre 3 pessoas? CR(3,10) = C(12,10) = 66. Quantas soluções inteiras não-negativas para x + y + z = 5? CR(3,5) = C(7,5) = 21 (representando "quantas de tipo x, quantas de tipo y, quantas de tipo z"). Em todas essas situações, há repetição e ordem não importa — é combinação com repetição.
              </p>
              <p>
                Na prática de Petrobras, combinação com repetição aparece em cenários reais. Um gerente de RH quer distribuir 8 bônus iguais entre 3 departamentos. De quantas formas? CR(3,8) = C(10,8) = C(10,2) = 45 formas. Um centro de distribuição tem 4 tipos de combustível e precisa selecionar 6 "porções" (podendo repetir o mesmo combustível) para análise. Quantas amostras distintas? CR(4,6) = C(9,6) = 84. Um engenheiro precisa escolher 5 componentes de 3 modelos diferentes para um protótipo, podendo repetir componentes. Quantas configurações? CR(3,5) = C(7,5) = 21. A fórmula permite contagem eficiente sem enumerar manualmente todas as possibilidades.
              </p>
              <p>
                A CESGRANRIO testa combinação com repetição frequentemente porque é menos intuitiva e candidatos confundem com combinação simples ou outros modelos. Uma pegadinha comum: "Quantas maneiras de distribuir 10 doces idênticos entre 4 crianças?" Usa-se CR(4,10) = C(13,10) = 286, não C(10,4) = 210 (que seria combinação simples, sem reconhecer que doces são repetíveis). Outra pegadinha: diferenciar "com reposição" (repetição permitida) de "sem reposição" (sem repetição). "Escolher 3 números de um dado (com reposição)" = CR(6,3) = C(8,3) = 56. "Escolher 3 números diferentes de um dado (sem reposição)" = C(6,3) = 20. Um candidato que calcula a primeira como C(6,3) está ignorando a possibilidade de repetição. A CESGRANRIO observa se você diferencia essas situações. Finalmente, expressões: "Se CR(n,3) = 20, qual n?" Aqui, C(n+2, 3) = 20 → (n+2)(n+1)n/6 = 20 → (n+2)(n+1)n = 120 → testando, n=4 → 6×5×4 = 120 ✓. Logo n=4.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground text-lg">Fórmula de Combinação com Repetição</h4>
                <div className="bg-white dark:bg-slate-900 rounded p-4 space-y-3">
                  <div className="font-mono text-center">
                    <p className="text-sm md:text-base"><strong>CR(n,p) = C(n+p-1, p) = (n+p-1)! / [p! × (n-1)!]</strong></p>
                    <p className="text-lg text-foreground/85 leading-relaxed mt-2">Método: "Stars and Bars" — p estrelas, (n-1) barras</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded mt-4">
                    <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-600 dark:text-blue-400">Exemplo: 5 sorvetes, 3 sabores</p>
                    <p className="text-lg text-foreground/85 leading-relaxed font-mono mt-1">CR(3,5) = C(7,5) = C(7,2) = 7×6/2 = 21 combinações</p>
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed text-center mt-3">Diferença: Combinação simples = sem repetição | Combinação com repetição = com repetição permitida</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="CR(n,p) = C(n+p−1, p)"
              description="A fórmula que transforma um problema com repetição em uma combinação simples de ordem maior."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Combinação com Repetição: A Fórmula Mágica"
              icone="♻️"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Intuição",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Combinação com Repetição CR(n,p)</strong> conta o número de formas de escolher <em>p</em> elementos de <em>n</em> tipos distintos, onde um mesmo tipo pode ser escolhido múltiplas vezes, e a ordem não importa:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">CR(n, p) = C(n+p−1, p)</p>
                        <p className="text-xl text-center mt-1 text-foreground/85 leading-relaxed">Equivalente a C(n+p−1, n−1)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Exemplo Prático">
                        Um operador escolhe 3 itens de um cardápio com 5 opções (pode repetir): CR(5,3) = C(5+3−1, 3) = C(7,3) = <strong>35 formas</strong>. Sem repetição seria apenas C(5,3) = 10.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Equivalência com Equações",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        CR(n,p) é equivalente ao número de <strong>soluções inteiras não-negativas</strong> de equações do tipo x₁ + x₂ + ... + xₙ = p:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold mb-2 text-foreground/85 leading-relaxed">Exemplo: x₁ + x₂ + x₃ = 4</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">n=3 variáveis, p=4 unidades a distribuir</p>
                        <p className="text-xl font-mono mt-2 text-foreground/85 leading-relaxed">CR(3,4) = C(3+4−1, 4) = C(6,4) = C(6,2) = <strong>15 soluções</strong></p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        <div className="p-3 bg-teal-500/5 rounded-xl border border-teal-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed text-teal-500 font-bold">CR vs. C: Quando Usar</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">CR: "pode repetir", "pode escolher o mesmo"</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">C: "sem repetição", "cada elemento único"</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed text-cyan-500 font-bold">Relação CR {">"} C</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">CR(n,p) ≥ C(n,p) sempre</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Mais opções quando repetição é permitida</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Tabela de Comparação Final",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xl border-collapse text-foreground/85 leading-relaxed">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="p-3 text-left border border-border">Tipo</th>
                              <th className="p-3 text-center border border-border">Ordem</th>
                              <th className="p-3 text-center border border-border">Repetição</th>
                              <th className="p-3 text-left border border-border">Fórmula</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 border border-border font-medium">Permutação Simples</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border font-mono text-lg text-foreground/85 leading-relaxed">n!</td>
                            </tr>
                            <tr className="bg-muted/20">
                              <td className="p-3 border border-border font-medium">Perm. com Repetição</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border font-mono text-lg text-foreground/85 leading-relaxed">n!/(n₁!×n₂!...)</td>
                            </tr>
                            <tr>
                              <td className="p-3 border border-border font-medium">Arranjo Simples</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border font-mono text-lg text-foreground/85 leading-relaxed">n!/(n−p)!</td>
                            </tr>
                            <tr className="bg-muted/20">
                              <td className="p-3 border border-border font-medium">Combinação Simples</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border font-mono text-lg text-foreground/85 leading-relaxed">n!/[p!(n−p)!]</td>
                            </tr>
                            <tr>
                              <td className="p-3 border border-border font-medium">Comb. com Repetição</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border font-mono text-lg text-foreground/85 leading-relaxed">C(n+p−1, p)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca dificilmente usa o termo "combinação com repetição" diretamente. Procure pistas no enunciado: <strong>"podendo repetir"</strong>, <strong>"com reposição"</strong>, <strong>"soluções não-negativas"</strong>. Estas são as senhas para usar CR.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-7" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?"
          alternativas={[
            { letra: "A", texto: "25", correta: false },
              { letra: "B", texto: "60", correta: false },
              { letra: "C", texto: "120", correta: true },
              { letra: "D", texto: "240", correta: false },
              { letra: "E", texto: "720", correta: false }
          ]}
          dicaEstrategica="Aqui: 5 × 4 × 3 × 2 × 1 = 120."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "P(5) = 5!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 120." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "jX_l5X7V9QY",
              title: "Combinação com Repetição: O Método Bolinha-Traço",
              duration: "14:10"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Fórmula CR(n,p)", type: "Técnico", placeholderColor: "bg-emerald-500/20" },
                { title: "Bolinhas e Divisórias", type: "Visual", placeholderColor: "bg-teal-500/20" },
                { title: "Equações Inteiras", type: "Resumo", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Bolinhas e Divisórias",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">Distribuir 4 maçãs para 3 crianças (A, B, C):</p>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-center tracking-widest">
                    ● ● | ● | ● 
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed text-center mt-2">Transforme em Permutação com Repetição de Símbolos.</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Sinfonia do Repeteco",
              artista: "The Combinations"
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Combinação com Repetição"
              icone="♻️"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: PROPRIEDADES E IDENTIDADES                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner numero={8}
          titulo="Propriedades e Identidades"
          descricao="As relações entre combinações que permitem resolver problemas complexos rapidamente: simetria, Pascal e o Teorema Binomial."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="As Três Propriedades Essenciais"
              description="Simetria, Pascal e a Soma de uma Linha — as ferramentas de aceleração de cálculo em prova."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Identidades Fundamentais da Combinatória"
              icone="🔏"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Simetria: C(n,p) = C(n, n−p)",
                  icone: "🪞",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Escolher <em>p</em> elementos para incluir é o mesmo que escolher <em>n−p</em> para excluir:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-xl font-mono text-center text-foreground/85 leading-relaxed">C(n, p) = C(n, n−p)</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-500 mb-2 text-foreground/85 leading-relaxed">Exemplos</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">C(10, 3) = C(10, 7) = 120</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">C(8, 2) = C(8, 6) = 28</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">C(n, 0) = C(n, n) = 1</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xl font-bold text-cyan-500 mb-2 text-foreground/85 leading-relaxed">Uso em Prova</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Se C(n, k) = C(n, 5) e k ≠ 5, então k = n−5.</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-2">Banca usa para testar se você reconhece a simetria.</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Identidade de Pascal: C(n,p) = C(n−1,p−1) + C(n−1,p)",
                  icone: "🔺",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Cada elemento do <strong>Triângulo de Pascal</strong> é a soma dos dois diretamente acima dele:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 font-mono text-xl text-center space-y-1 text-foreground/85 leading-relaxed">
                        <p>1</p>
                        <p>1  1</p>
                        <p>1  2  1</p>
                        <p>1  3  3  1</p>
                        <p>1  4  6  4  1</p>
                        <p>1  5  10  10  5  1</p>
                      </div>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Linha n=4: C(4,0)=1, C(4,1)=4, C(4,2)=6, C(4,3)=4, C(4,4)=1
                      </p>
                      <AlertBox tipo="info" titulo="Aplicação">
                        C(5,2) = C(4,1) + C(4,2) = 4 + 6 = 10. Útil quando você conhece valores vizinhos e precisa de um sem calcular a fórmula completa.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Soma da Linha n: ΣC(n,k) = 2ⁿ",
                  icone: "∑",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A soma de todos os coeficientes binomiais da linha n é sempre 2ⁿ:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-xl font-mono text-center text-foreground/85 leading-relaxed">C(n,0) + C(n,1) + ... + C(n,n) = 2ⁿ</p>
                        <p className="text-xl text-center mt-1 text-foreground/85 leading-relaxed">Decorre do Binômio de Newton com x=y=1</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed text-blue-500 font-bold">n=3</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">1+3+3+1 = 8 = 2³</p>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed text-indigo-500 font-bold">n=4</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">1+4+6+4+1 = 16 = 2⁴</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed text-cyan-500 font-bold">n=5</p>
                          <p className="text-xl font-mono text-foreground/85 leading-relaxed">1+5+10+10+5+1 = 32 = 2⁵</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "Quantos subconjuntos (incluindo o vazio) um conjunto de 4 elementos possui?" = 2⁴ = 16. Isso é a soma da linha n=4 do triângulo de Pascal.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-8" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é o valor de 6! (seis fatorial)?"
          alternativas={[
            { letra: "A", texto: "36", correta: false },
              { letra: "B", texto: "120", correta: false },
              { letra: "C", texto: "720", correta: true },
              { letra: "D", texto: "5040", correta: false },
              { letra: "E", texto: "360", correta: false }
          ]}
          dicaEstrategica="Memorize: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "6!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 6 × 5 × 4 × 3 × 2 × 1 = 720. Por definição, n! = n × (n−1) × ..." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "× 2 × 1." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="indigo"
            video={{
              videoId: "k1V9X8Z7Y6W",
              title: "Pascal e Binômio: As Leis da Harmonia",
              duration: "10:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Triângulo de Pascal", type: "Mapa", placeholderColor: "bg-indigo-500/20" },
                { title: "Identidades de Pascal", type: "Fórmula", placeholderColor: "bg-blue-500/20" },
                { title: "Soma das Linhas", type: "Conceito", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Espelho de Pascal",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">As extremidades são sempre 1 e o triângulo é simétrico:</p>
                  <div className="flex justify-center font-mono text-indigo-500 text-lg">
                    1 - 4 - 6 - 4 - 1
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed text-center">O que você escolhe, você também exclui (Simetria).</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Harmonia de Pascal",
              artista: "Sinfonia Binomial"
            }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Propriedades e Identidades"
              icone="🔏"
              numero={3}
              variant="indigo"
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
          titulo="Aplicações Petrobras"
          descricao="Equipes, senhas, rotas, comissões: os cenários reais mais cobrados pela CESGRANRIO com contexto de operações petrolíferas."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Problemas Compostos e Estratégia de Resolução"
              description="Como decompor enunciados complexos em etapas simples de combinatória — a habilidade mais exigida na CESGRANRIO."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Estratégias para Problemas Petrobras"
              icone="🏭"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Problemas com Restrições (Pelo Menos / No Máximo)",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Problemas com <strong>"pelo menos k"</strong> ou <strong>"no máximo k"</strong> são melhor resolvidos por <strong>complementar</strong> ou por <strong>soma de casos</strong>:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold mb-2 text-foreground/85 leading-relaxed">Método do Complementar</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Total de possibilidades − casos proibidos</p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Ex: "Pelo menos 1 mulher" = Total − (zero mulheres)</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold mb-2 text-foreground/85 leading-relaxed">Soma de Casos</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Some todos os casos favoráveis separadamente</p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Ex: "Pelo menos 2 eng" = (2 eng) + (3 eng) + (4 eng)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Problemas com Grupos Fixos e Variáveis",
                  icone: "👥",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Quando a equipe tem <strong>papéis distintos</strong> para grupos diferentes, resolva separadamente e multiplique pelo PFC:
                      </p>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xl font-bold text-cyan-500 mb-3 text-foreground/85 leading-relaxed">Exemplo: Equipe de Emergência REPLAN</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">1 líder de 5 engenheiros + 3 técnicos de 8 técnicos</p>
                        <div className="space-y-2 mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg text-foreground/85 leading-relaxed bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Líderes</span>
                            <span className="text-xl font-mono text-foreground/85 leading-relaxed">C(5,1) = 5</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg text-foreground/85 leading-relaxed bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Técnicos</span>
                            <span className="text-xl font-mono text-foreground/85 leading-relaxed">C(8,3) = 56</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg text-foreground/85 leading-relaxed bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Total</span>
                            <span className="text-xl font-mono text-foreground/85 leading-relaxed">5 × 56 = 280 equipes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Senhas, Rotas e Redes de Dutos",
                  icone: "🔐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-indigo-500 mb-2">Senhas Ordenadas</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Letras distintas, sem repetição, ordem importa:</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">A(26, 4) = 26×25×24×23</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">= 358.800 senhas de 4 letras distintas</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Redes de Dutos</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">n nós, máximo de trechos bidirecionais:</p>
                          <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">C(n, 2) = n(n−1)/2</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">6 nós → 15 trechos possíveis</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Estratégia para Provas CESGRANRIO">
                        Leia o enunciado 2 vezes antes de calcular. Identifique: (1) ordem importa? → arranjo/permutação; (2) repetição permitida? → PFC ou CR; (3) há restrições? → complementar ou soma de casos.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-9" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é o valor de 6! (seis fatorial)?"
          alternativas={[
            { letra: "A", texto: "36", correta: false },
              { letra: "B", texto: "120", correta: false },
              { letra: "C", texto: "720", correta: true },
              { letra: "D", texto: "5040", correta: false },
              { letra: "E", texto: "360", correta: false }
          ]}
          dicaEstrategica="Memorize: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "6!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 6 × 5 × 4 × 3 × 2 × 1 = 720. Por definição, n! = n × (n−1) × ..." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "× 2 × 1." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "p8I2-9Z9R9U",
              title: "Aplicações Petrobras: Estratégias de Prova",
              duration: "15:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Problemas de Equipes", type: "Prático", placeholderColor: "bg-emerald-500/20" },
                { title: "Senhas e Rotas", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                { title: "Complementar vs Direto", type: "Decisão", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Pulo do Gato Petrobras",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">Para questões de equipes com "pelo menos x mulheres":</p>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-bold text-rose-600">Total - Casos Proibidos</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">É muito mais rápido que calcular todos os casos favoráveis!</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Estratégia REPLAN",
              artista: "Operação Gabarito"
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Aplicações Petrobras"
              icone="🏭"
              numero={3}
              variant="blue"
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
          titulo="Simulado CESGRANRIO"
          descricao="Questões no estilo exato da banca: enunciados elaborados, múltiplas restrições, armadilhas clássicas. Teste sua preparação completa."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Checklist Final: O que a CESGRANRIO Mais Cobra"
              description="Revise os padrões de questões mais recorrentes antes de encarar o simulado."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Revisão Estratégica: Padrões CESGRANRIO"
              icone="🎯"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Os 5 Tipos Mais Cobrados",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {[
                          { n: "1", tipo: "Comitês / Equipes", formula: "C(n,p)", desc: "Sem hierarquia → sem ordem → combinação" },
                          { n: "2", tipo: "Pódio / Cargos Distintos", formula: "A(n,p)", desc: "Com hierarquia → com ordem → arranjo" },
                          { n: "3", tipo: "Restrições (pelo menos / no máximo)", formula: "Complementar", desc: "Total − casos proibidos" },
                          { n: "4", tipo: "Anagramas / Senhas com Letras Iguais", formula: "Perm. Repetição", desc: "n!/n₁!×n₂!..." },
                          { n: "5", tipo: "Diagonais / Apertos de Mão", formula: "C(n,2)", desc: "Conexão de 2 a 2 em um conjunto" },
                        ].map((item) => (
                          <div key={item.n} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                            <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-lg text-foreground/85 leading-relaxed font-bold">{item.n}</span>
                            <div>
                              <p className="text-xl font-bold text-foreground/85 leading-relaxed">{item.tipo} <span className="text-indigo-500 font-mono">→ {item.formula}</span></p>
                              <p className="text-lg text-foreground/85 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilhas Clássicas da CESGRANRIO",
                  icone: "🪤",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xl font-bold text-rose-500 text-foreground/85 leading-relaxed">Armadilha 1: Confundir Arranjo com Combinação</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">Se o enunciado diz "formas de escolher e distribuir em cargos" → arranjo. "Formas de formar um grupo" → combinação.</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-xl font-bold text-amber-500 text-foreground/85 leading-relaxed">Armadilha 2: Esquecer 0! = 1</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">C(n,0) = 1 e C(n,n) = 1. Questões com casos extremos testam isso explicitamente.</p>
                        </div>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                          <p className="text-xl font-bold text-orange-500 text-foreground/85 leading-relaxed">Armadilha 3: PFC — Somar vs. Multiplicar</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">"Vai de carro OU de barco" (7 opções ao todo) → soma. "Vai de carro E depois de barco" → multiplica.</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-500 text-foreground/85 leading-relaxed">Armadilha 4: Elementos Juntos / Separados</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">Para juntos: trate o bloco como 1 elemento. Para separados: Total − (casos juntos).</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmulas para o Dia da Prova",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { nome: "Permutação Simples", formula: "P(n) = n!" },
                          { nome: "Perm. com Repetição", formula: "n! / (n₁!×n₂!...)" },
                          { nome: "Arranjo Simples", formula: "A(n,p) = n!/(n−p)!" },
                          { nome: "Combinação Simples", formula: "C(n,p) = n!/[p!(n−p)!]" },
                          { nome: "Comb. com Repetição", formula: "CR(n,p) = C(n+p−1, p)" },
                          { nome: "Simetria", formula: "C(n,p) = C(n, n−p)" },
                          { nome: "Pascal", formula: "C(n,p) = C(n−1,p−1)+C(n−1,p)" },
                          { nome: "Soma da Linha", formula: "ΣC(n,k) = 2ⁿ" },
                        ].map((item) => (
                          <div key={item.nome} className="p-3 bg-muted/30 rounded-lg border border-border">
                            <p className="text-lg text-foreground/85 leading-relaxed">{item.nome}</p>
                            <p className="text-xl font-mono font-bold text-foreground/85 leading-relaxed">{item.formula}</p>
                          </div>
                        ))}
                      </div>
                      <AlertBox tipo="warning" titulo="Última Dica">
                        Em prova, sempre verifique se o enunciado usa <strong>"pelo menos"</strong>, <strong>"no mínimo"</strong>, <strong>"ao menos"</strong> → complementar. E <strong>"exatamente k"</strong> → calcule diretamente aquele caso.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-10" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual é o valor de 6! (seis fatorial)?"
          alternativas={[
            { letra: "A", texto: "36", correta: false },
              { letra: "B", texto: "120", correta: false },
              { letra: "C", texto: "720", correta: true },
              { letra: "D", texto: "5040", correta: false },
              { letra: "E", texto: "360", correta: false }
          ]}
          dicaEstrategica="Memorize: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "6!" },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "= 6 × 5 × 4 × 3 × 2 × 1 = 720. Por definição, n! = n × (n−1) × ..." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "× 2 × 1." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="indigo"
            video={{
              videoId: "m7X8Y9Z0W1V",
              title: "Revision Final e Simulado: O Grande Final",
              duration: "20:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Análise Combinatória",
              materia: "Matemática",
              images: [
                { title: "Checklist de Fórmulas", type: "Revisão", placeholderColor: "bg-indigo-500/20" },
                { title: "Padrões de Questões", type: "Lista", placeholderColor: "bg-blue-500/20" },
                { title: "Gestão de Tempo", type: "Dica", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Gabaritando Combinatória",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-2">
                    <p className="font-bold">1. A ordem importa? (Arranjo/Perm vs Comb)</p>
                    <p className="font-bold">2. Há repetição? (PFC vs CR)</p>
                    <p className="font-bold">3. Use o complementar para "pelo menos"!</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Hino do Aprovado",
              artista: "Mestre da Matemática"
            }}
          />

                      <QuizInterativo
              questoes={quizM10}
              titulo="QUIZ: Simulado Final"
              icone="🎯"
              numero={3}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
