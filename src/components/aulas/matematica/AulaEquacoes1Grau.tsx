import { getAllModuleVariants } from "@/lib/moduleColors";
"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
  ModuleSummaryCarouselNew,
  FunctionGraph,
  type FunctionPlot,
  QuestaoResolvidaStepByStep} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuBrain,
  LuPlay,
  LuTrophy,
  LuCircleCheck,
  LuCircleX,
  LuTriangleAlert,
  LuZap,
  LuShield,
  LuGraduationCap,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_FRACOES,
  QUIZ_M3_PROBLEMAS,
  QUIZ_M4_INEQUACOES,
  QUIZ_M5_FINAL,
  QUIZ_M6_SISTEMAS_AVANCADOS,
  QUIZ_M7_VERIFICACAO,
  QUIZ_M8_PEGADINHAS,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/equacoes-1grau-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos & Balança" },
  { id: "modulo-2", label: "Módulo 2", title: "Tradução de Problemas" },
  { id: "modulo-3", label: "Módulo 3", title: "Equações com Frações" },
  { id: "modulo-4", label: "Módulo 4", title: "Sistemas Lineares" },
  { id: "modulo-5", label: "Módulo 5", title: "Simulado Parcial (M1-M4)" },
  { id: "modulo-6", label: "Módulo 6", title: "Inequações de 1º Grau" },
  { id: "modulo-7", label: "Módulo 7", title: "Sistemas 3x3 & Avançado" },
  { id: "modulo-8", label: "Módulo 8", title: "Resolução Reversa" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaEquacoes1Grau({
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

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_CONCEITOS>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_FRACOES>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_PROBLEMAS>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_INEQUACOES>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_FINAL>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_SISTEMAS_AVANCADOS>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_VERIFICACAO>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_PEGADINHAS>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_PETROBRASESPECIFICO>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_SIMULADO_MESTRE>(
    [],
  );

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (
      !hasSyncedInitial &&
      !loading &&
      currentProgress !== undefined &&
      currentProgress > 0
    ) {
      const doneCount = Math.floor(
        (currentProgress / 100) * MODULE_DEFS.length,
      );
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      updateCompletedModules(Array.from(newDone));
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_CONCEITOS, 6));
      setQuizM2(getRandomQuestions(QUIZ_M2_FRACOES, 6));
      setQuizM3(getRandomQuestions(QUIZ_M3_PROBLEMAS, 6));
      setQuizM4(getRandomQuestions(QUIZ_M4_INEQUACOES, 6));
      setQuizM5(getRandomQuestions(QUIZ_M5_FINAL, 5));
      setQuizM6(getRandomQuestions(QUIZ_M6_SISTEMAS_AVANCADOS, 6));
      setQuizM7(getRandomQuestions(QUIZ_M7_VERIFICACAO, 6));
      setQuizM8(getRandomQuestions(QUIZ_M8_PEGADINHAS, 6));
      setQuizM9(getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 6));
      setQuizFinal(getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 8));
    }
  }, [loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));

      const total = MODULE_DEFS.length;
      const done = newSet.size;
      const percent = Math.round((done / total) * 100);

      if (onUpdateProgress) {
        onUpdateProgress(percent);
      }

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);

      if (index === MODULE_DEFS.length - 1) {
        setShowCompletionBadge(true);
        onComplete?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
      }
    }
  };

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

    


  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={Array.from(MODULE_DEFS)}
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
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1 ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={1}
            titulo="Fundamentos & Princípio da Balança"
            descricao="A base: isolar a incógnita na balança invisível. Operação inversa é LEI."
          variant="blue"
        />

          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Equação de 1º Grau: A Linguagem Algébrica da Balança"
              description="O conceito fundamental que permite resolver qualquer problema com uma incógnita desconhecida"
          variant="blue"
        />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Uma **equação do primeiro grau** é a tradução matemática de uma pergunta sobre um valor desconhecido. Formalmente, é uma igualdade algébrica contendo uma incógnita (geralmente representada por x, y ou outra letra) elevada ao expoente 1 (invisível). Exemplos: 2x − 8 = 10; 5y + 3 = 28; 3a − 6 = a + 2. O termo "primeiro grau" refere-se ao fato de que o maior expoente é 1 (em contraste com equações de segundo grau x² + 2x − 3 = 0, que têm expoente máximo 2). O sinal "=" é o pino central de uma **balança de laboratório invisible**: qualquer coisa que você faz de um lado, **você DEVE fazer exatamente do outro lado**, ou a balança quebra (a igualdade se destrói). A elegância das equações de 1º grau reside no fato de que, diferentemente de equações de grau superior, **sempre existe exatamente uma solução** (salvo casos degenerados). Se uma equação é verdadeira para x = 5, não há outro valor de x que a torna verdadeira.
              </p>

              <p>
                Historicamente, equações lineares emergiram para resolver problemas práticos de comércio e engenharia. Babilônios antigos (1.800 a.C.) resolviam problemas do tipo "comprei 3 cestas de trigo e 2 de cevada por 10 moedas. Cada cesta de cevada custa 1 moeda. Quanto custa cada cesta de trigo?" — isto é uma equação linear em forma de linguagem. Na Idade Média, matemáticos árabes (Al-Khwarizmi, ~800 d.C.) formalizaram a resolução de equações lineares e até deram origem ao termo "álgebra". Na Petrobras e em engenharia moderna, equações de 1º grau aparecem continuamente: calcular vazão de óleo baseada em pressão e resistência, estimar custos de produção dado consumo de energia, determinar quantidades de insumos necessários para atingir uma meta de output. A incapacidade de resolver equações lineares é um bloqueador crítico em STEM (ciência, tecnologia, engenharia, matemática).
              </p>

              <p>
                O **princípio fundamental** subjacente a todas as equações é chamado "operações inversas" ou "operações simétricas". Se você adiciona 8 a ambos os lados de uma igualdade, ela permanece verdadeira (propriedade fundamental da igualdade). Se você multiplica ambos os lados por 2, continua verdadeira. Se você tira a raiz quadrada de ambos os lados (com cuidado com sinais), continua. Este é o motivo pelo qual podemos "passar para o outro lado invertendo a operação": não é mágica, é uma aplicação consciente da propriedade fundamental. A adição se inverte por subtração (5 + 3 = 8 ⟺ 5 = 8 − 3). A multiplicação se inverte por divisão (6 × 4 = 24 ⟺ 6 = 24 ÷ 4). Esta "inversão de operações" é **a chave absoluta** para resolver qualquer equação de 1º grau.
              </p>

              <p>
                O **método de resolução padrão** segue um protocolo de três passos, aplicável mecanicamente a qualquer equação de 1º grau. Passo 1: **Reúna termos com a incógnita de um lado e termos numéricos do outro**, usando operações inversas. Passo 2: **Simplifique ambos os lados** (combine termos semelhantes). Passo 3: **Isole a incógnita**, dividindo pelo coeficiente (se a incógnita está multiplicada por um número). Exemplo: 3x − 5 = 10. Passo 1: 3x = 10 + 5 = 15. Passo 2: 3x = 15. Passo 3: x = 15 ÷ 3 = 5. Verificação: 3(5) − 5 = 15 − 5 = 10 ✓. Qualquer candidato que domina estes três passos resolve 80% das questões de equações de 1º grau em provas CESGRANRIO. O outro 20% envolve sutilezas (frações, parênteses aninhados, armadilhas de sinal) cobertos em módulos posteriores.
              </p>

              <p>
                A CESGRANRIO testa equações de 1º grau em cinco contextos principais: (1) Equações diretas (2x + 3 = 9); (2) Equações com parênteses (3(x−2) = 12); (3) Equações com frações (x/4 + 2 = 5); (4) Tradução de linguagem natural ("triplo de um número menos 5 é 16"); (5) Sistemas de equações onde você resolve uma por substituição. O erro mais comum é erro de sinal — esquecer de inverter o sinal ao "passar para o outro lado". Se você tem −x = 5, a solução é x = −5, não x = 5. Outro erro: dividir apenas um termo por um número em vez de dividir a equação inteira. Se 2x = 10, você divide ambos os lados por 2 para obter x = 5, não "divide 10 por 2 e deixa 2x intacto". Estes erros sistemáticos caem candidatos mesmo que entendam o conceito.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Definição Formal & Operações Inversas</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>Equação de 1º Grau:</strong> Igualdade da forma ax + b = c (a ≠ 0) com uma incógnita x</p>
                  <p><strong>Solução (Raiz):</strong> O valor de x que torna a igualdade verdadeira</p>
                  <p><strong>Operações Inversas (CRÍTICAS):</strong></p>
                  <p className="ml-4">• Adição ↔ Subtração (+ passa com −, − passa com +)</p>
                  <p className="ml-4">• Multiplicação ↔ Divisão (× passa com ÷, ÷ passa com ×)</p>
                  <p className="ml-4">• Potência ↔ Raiz (x² passa como √x, √x passa como x²)</p>
                  <p><strong>Propriedade Fundamental da Igualdade:</strong> Se faz algo em um lado, faça do outro lado também</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Protocolo de Três Passos para Resolver Qualquer Equação de 1º Grau"
              description="A sequência mecânica que SEMPRE funciona, sem exceção"
          variant="blue"
        />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Toda equação de 1º grau, não importa quão complexa pareça, pode ser resolvida usando um protocolo de três passos que é imutável. <strong>Passo 1: Isolamento de Variáveis.</strong> Use operações inversas para deixar todos os termos com x de um lado e todos os números do outro lado. Lembre-se: quando você "passa" um termo para o outro lado, inverte a operação. Se o termo está sendo adicionado (+), passa subtraindo (−). Se está sendo multiplicado (×), passa dividindo (÷). Por exemplo, em 3x + 5 = 20, passe o +5: 3x = 20 − 5 = 15. <strong>Passo 2: Simplificação.</strong> Após isolar a variável, simplifique ambos os lados da equação combinando termos semelhantes. No exemplo anterior, 3x = 15 já está simplificado. <strong>Passo 3: Isolamento da Incógnita.</strong> Se a variável está multiplicada por um coeficiente, divida ambos os lados por esse coeficiente. Se 3x = 15, divida por 3: x = 15 ÷ 3 = 5. Verificação: 3(5) + 5 = 20 ✓. Este protocolo é tão fundamental que candidatos que o dominam conseguem resolver 80% das questões mecanicamente, sem precisar "entender" cada situação específica.
              </p>

              <p>
                <strong>Exemplos Resolvidos Passo a Passo:</strong> Exemplo 1: 2(x − 3) = 10. Passo 1: Aplique distributiva: 2x − 6 = 10. Passe o −6: 2x = 10 + 6 = 16. Passo 2: Simplificado. Passo 3: Divida por 2: x = 8. Verificação: 2(8−3) = 2(5) = 10 ✓. Exemplo 2: (x + 4)/2 = 6. Passo 1: Multiplique ambos os lados por 2: x + 4 = 12. Passe o +4: x = 8. Passo 2: Simplificado. Passo 3: Não precisa (x já está isolado). Verificação: (8+4)/2 = 12/2 = 6 ✓. Exemplo 3: 5x − 3 = 2x + 9. Passo 1: Deixe x de um lado: 5x − 2x = 9 + 3. Passo 2: Simplifique: 3x = 12. Passo 3: Divida por 3: x = 4. Verificação: 5(4) − 3 = 20 − 3 = 17, e 2(4) + 9 = 8 + 9 = 17 ✓.
              </p>

              <p>
                <strong>Erros de Sinal — O Inimigo Silencioso:</strong> O erro mais frequente na resolução de equações é errar o sinal. Quando você "passa" um termo para o outro lado, DEVE inverter o sinal. Se você tem −x = 5 e ignora a inversão de sinal, pode estar tentado a concluir x = 5 (errado). Correto: −x = 5 → x = −5. Teste: −(−5) = 5 ✓. Outro erro comum: ao multiplicar ambos os lados por um número negativo, esquecer de aplicar a distributiva corretamente. Se tem 2x + 5 = −3 e multiplica ambos os lados por −1, o resultado DEVE ser −2x − 5 = 3 (todos os termos mudam sinal), não "−2x + 5 = 3". Estes erros de sinal caem candidatos mesmo que entendam o conceito, porque "entender" não é suficiente — é necessário ATENÇÃO ABSOLUTA ao manipular sinais.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Checklist de Resolução (Faça Sempre)</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>□ Identifique a equação original</strong> (ex: 3x + 5 = 20)</p>
                  <p><strong>□ Passo 1: Isole x</strong> usando operações inversas (3x = 15)</p>
                  <p><strong>□ Passo 2: Simplifique</strong> (3x = 15 → já está)</p>
                  <p><strong>□ Passo 3: Divida pelo coeficiente</strong> (x = 5)</p>
                  <p><strong>□ SEMPRE verifique</strong> substituindo na original: 3(5)+5 = 20 ✓</p>
                  <p><strong>□ Se a verificação falha</strong>, recomece e procure o erro (provavelmente sinal)</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="A Mecânica das Equações de 1º Grau"
              description="Dominando a balança matemática: o que você faz de um lado, faz do outro."
          variant="blue"
        />

            <p className="text-muted-foreground leading-relaxed text-lg">
              Uma <strong>equação do 1º grau</strong> é uma igualdade que contém
              apenas uma letra (incógnita) com expoente invisível igual a 1. O
              sinal <strong className="text-xl px-1">=</strong> é o pino central
              de uma balança de laboratório: qualquer coisa que você faz de um
              lado, <strong>DEVE fazer exatamente igual do outro lado</strong>.
            </p>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O Princípio da Balança",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para a balança não pender (não quebrar a igualdade),
                        qualquer operação executada de um lado{" "}
                        <strong>
                          TEM QUE ser exatamente igual do outro lado
                        </strong>
                        . Usamos o atalho mental: "passa pro outro lado
                        invertendo a operação".
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="text-sm font-bold text-blue-700 mb-3">
                          Operações Inversas (A Base):
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>+ inverte para -</strong> (e vice-versa)
                          </li>
                          <li>
                            <strong>× inverte para ÷</strong> (e vice-versa)
                          </li>
                          <li>
                            <strong>Expoente inverte para raiz</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Passo a Passo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 font-mono text-sm space-y-3">
                        <p className="font-black text-blue-700 text-base">
                          Exemplo 1: 2x - 8 = 10
                        </p>
                        <p>1º: 2x = 10 + 8 (o -8 vira +8)</p>
                        <p>2º: 2x = 18</p>
                        <p>3º: x = 18 ÷ 2 (o ×2 vira ÷2)</p>
                        <p className="text-lg font-bold text-blue-700">
                          x = 9 ✓
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 font-mono text-sm space-y-3">
                        <p className="font-black text-emerald-700 text-base">
                          Exemplo 2: 5x + 3 = 28
                        </p>
                        <p>1º: 5x = 28 - 3 (o +3 vira -3)</p>
                        <p>2º: 5x = 25</p>
                        <p>3º: x = 25 ÷ 5</p>
                        <p className="text-lg font-bold text-emerald-700">
                          x = 5 ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Gatilhos Mentais",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-amber-500/10 p-3 rounded-lg border-l-4 border-amber-500">
                        <p className="font-bold text-amber-700">
                          💡 "Isolamento 3 Passos"
                        </p>
                        <p className="text-muted-foreground">
                          1. Números para um lado. 2. Letras para o outro. 3.
                          Simplifique.
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded-lg border-l-4 border-cyan-500">
                        <p className="font-bold text-cyan-700">
                          🎯 "Mecanismo da Balança"
                        </p>
                        <p className="text-muted-foreground">
                          Leia: "O que você faz de cá, faz de lá". Se sumir de
                          um lado, aparece do outro com operação inversa.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Pegadinhas da CESGRANRIO",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox
                      tipo="danger"
                      titulo="O Veneno: Número Negativo na Frente"
                    >
                      <p className="text-sm mb-3">
                        Se vir <code>-3x = 15</code>, o {"-3"} está{" "}
                        <strong>multiplicando</strong>. Ele passa para o outro
                        lado <strong>DIVIDINDO</strong>, junto com o sinal
                        negativo:
                      </p>
                      <p className="text-sm font-mono font-bold">
                        x = 15 ÷ (-3) = -5 ✓
                      </p>
                      <p className="text-sm mt-3">
                        ERRADO pensar: "Inverte o sinal". A operação que
                        inverte, não o sinal!
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
          corIndicador="bg-amber-500"
        />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-blue-500" />
                    <p className="font-bold">Mnemônico Rápido</p>
                    <p className="text-sm text-muted-foreground">
                      Qual é o oposto de +5?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold">-5 (e vice-versa)</p>
                    <p className="text-xs text-muted-foreground text-center">
                      Soma inverte para subtração
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-blue-500" />
                    <p className="font-bold">Dúvida Comum</p>
                    <p className="text-sm text-muted-foreground">
                      Inverte o sinal ou a operação?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold">A OPERAÇÃO!</p>
                    <p className="text-xs text-muted-foreground text-center">
                      O sinal vai junto. -3x passa÷3 com o sinal.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <FunctionGraph
            title="Funções Afins: Gráficos de Retas"
            functions={[
              {
                id: "func1",
                label: "2x",
                color: "#3b82f6",
                fn: (x) => 2 * x,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "x + 3",
                color: "#ef4444",
                fn: (x) => x + 3,
                strokeWidth: 2,
              },
              {
                id: "func3",
                label: "-x + 2",
                color: "#10b981",
                fn: (x) => -x + 2,
                strokeWidth: 2,
              },
            ]}
            xMin={-5}
            xMax={5}
            yMin={-5}
            yMax={10}
            points={250}
          />




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A solução da inequação 3x - 5 > 7 é:"
          alternativas={[
              { letra: "A", texto: "x > 4", correta: true },
              { letra: "B", texto: "x > 3", correta: false },
              { letra: "C", texto: "x < 4", correta: false },
              { letra: "D", texto: "x < 3", correta: false },
              { letra: "E", texto: "x ≥ 4", correta: false }
            ]}
          dicaEstrategica="Desigualdade estrita (>) se mantém pois dividimos por número positivo (3)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "3x - 5 > 7 → 3x > 12 → x > 4." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 1",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 1",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM1}
            titulo="QUIZ: Fundamentos & Balança"
            numero={5}
            icone="🧠"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          variant="blue"
        />

          <div className="space-y-8 bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold">Resumo Visual</h3>
            <ModuleSummaryCarouselNew
              images={[
                {
                  title: "Operações Inversas - Mapa Mental",
                  type: "Diagrama",
                  placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                  imageUrl: "/temp-img.png", // PROMPT: Mapa mental em estilo dark premium mostrando as 4 operações básicas (+, -, ×, ÷) com setas bidirecionais indicando inversão. Centro: "Operação Inversa". Cores Petrobras (azul/verde/ciano). Estilo técnico industrial.
                },
              ]}
              moduloNome="Módulo 1"
              tituloAula="Equações de 1º Grau"
              materia="Matemática"
            />
          </div>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2}
            titulo="Tradução de Problemas: Português → Matemática"
            descricao="A habilidade que separa os 70% dos 90%: ler e converter em equação."
          variant="blue"
        />

          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Do Português para a Linguagem Algébrica: A Tradução Crítica"
              description="Converter palavras em símbolos matemáticos — a barreira entre ler um problema e resolvê-lo"
          variant="blue"
        />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A maioria dos problemas de equações de 1º grau não é apresentada na forma pronta "2x + 5 = 15". Eles vêm em **linguagem natural (português)**, frequentemente com múltiplos parágrafos e contexto. A CESGRANRIO gosta de disfarçar equações em cenários realistas: "Um gerente de plataforma recebe salário fixo de R$ 10.000 por mês. Para cada metro de profundidade que perfura além de 500m, recebe um bônus de R$ 50 por metro. Se em um mês recebeu um total de R$ 12.000, qual foi a profundidade perfurada?" Esta é uma equação linear disfarçada: 10.000 + 50(x − 500) = 12.000, onde x é a profundidade. Candidatos que não conseguem **traduzir o português em símbolos algébricos** não conseguem nem montar a equação, portanto fracassam. Este módulo ensina exatamente esta tradução.
              </p>

              <p>
                A tradução segue um **dicionário operacional** que CESGRANRIO usa consistentemente. Quando lê "um número", denota-se x. Quando lê "o dobro de um número", denota-se 2x. "A metade", denota x/2. "O triplo menos cinco", denota 3x − 5. "O sucessor" (próximo inteiro), x + 1. "O antecessor", x − 1. "Aumentou em 20%", significa multiplicar por 1,20. "Diminuiu em 10%", significa multiplicar por 0,90. "O quádruplo de um número somado a 8 é 32" traduz-se como 4x + 8 = 32. Este dicionário tem aproximadamente 20 palavras-chave que cobrem 99% das questões. Candidatos que decoram estas palavras-chave conseguem traduzir qualquer problema. Candidatos que não as decoram ficam presos, reinterpretando cada palavra enquanto o tempo passa.
              </p>

              <p>
                Um padrão frequente em provas Petrobras é o **problema contextualizante**: "Uma refinaria recebe carregamento de x barris de petróleo bruto. Processa 15.000 barris no primeiro turno. Processa 12.000 barris no segundo turno. Restam 8.000 barris para o terceiro turno. Qual o carregamento total?" Tradução: x − 15.000 − 12.000 = 8.000, logo x = 35.000. Outro padrão: **divisão de quantidades** — "Duas equipes compartilham bônus de R$ 15.000 na razão 3:2 (você vê razão aqui! módulo anterior). Quanto a segunda equipe recebe?" Tradução: se a razão é 3:2, a segunda equipe recebe 2/(3+2) × 15.000 = 2/5 × 15.000 = 6.000. Estes problemas integram múltiplos conceitos — a razão do módulo anterior mais equação de 1º grau deste módulo.
              </p>

              <p>
                A arte da tradução repousa em **separar a estrutura do problema do contexto emocional**. Uma questão diz "Maria tem o triplo da idade de João. A soma de suas idades é 40 anos. Qual a idade de João?" O contexto emocional (personagens, situação da vida real) é irrelevante. A **estrutura** é: x (idade de João) + 3x (idade de Maria) = 40. Logo 4x = 40, x = 10. Candidatos que se distraem com a narrativa ("Maria trabalha em uma refinaria, João é técnico...") perdem tempo. Candidatos que extraem imediatamente a estrutura matemática resolvem em segundos. Este é o diferencial entre candidatos que acertam 60% e candidatos que acertam 85%+ em provas.
              </p>

              <p>
                Há também **pegadinhas de tradução** que CESGRANRIO adora. "A terça parte de um número é 12. Qual é o número?" Tradução correta: x/3 = 12, logo x = 36. Tradução errada (pegadinha): "terça parte" = 12, portanto número = 12/3 = 4 (falso). Outra: "Um número aumentado de 20 é 50. Qual é o número?" Tradução: x + 20 = 50, logo x = 30. Pegadinha: "aumentado de 20" interpretado como "multiplicado por 20" ou "à potência 20" (ambos errados). Outra: "O dobro de um número menos 5 é 19." Pergunta: é (2x − 5) ou 2(x − 5)? Depende da pontuação na leitura. Se lê "o dobro de (um número menos 5)", é 2(x − 5). Se lê "(o dobro de um número) menos 5", é 2x − 5. A CESGRANRIO escreve cuidadosamente para evitar ambiguidade, mas candidatos incautos caem nessas armadilhas.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Dicionário Operacional: Palavras → Símbolos</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>QUANTIDADES:</strong> Um número=x | Dobro=2x | Metade=x/2 | Triplo=3x | Quádruplo=4x | Sucessor=x+1 | Antecessor=x-1</p>
                  <p><strong>OPERAÇÕES:</strong> Soma=+ | Diferença=- | Produto=× | Quociente=÷ | Aumentado de Y=(+Y) | Diminuído de Y=(-Y)</p>
                  <p><strong>PERCENTUAIS:</strong> Aumento de 20%=(×1,20) | Diminuição de 10%=(×0,90) | Desconto de 5%=(×0,95)</p>
                  <p><strong>COMPARAÇÕES:</strong> É igual=(=) | É maior que=({'>'}) | É menor que=({'<'}) | Não é=(≠)</p>
                  <p><strong>REGRA CRÍTICA:</strong> Leia com atenção os parênteses implícitos. "Dobro de (número menos 5)" ≠ "(Dobro de número) menos 5"</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="O Dicionário Operacional"
              description="Como a CESGRANRIO pensa em português e a gente converte para x."
          variant="blue"
        />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Palavras Chave",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Cada frase em português tem um equivalente matemático. A
                        banca usa{" "}
                        <strong>SEMPRE as mesmas palavras-chave</strong>.
                        Decorar essa tabela é 80% do trabalho.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20 text-sm">
                          <p className="font-bold text-emerald-700 mb-2">
                            QUANTIDADES
                          </p>
                          <ul className="space-y-1">
                            <li>
                              Um número = <code>x</code>
                            </li>
                            <li>
                              O dobro = <code>2x</code>
                            </li>
                            <li>
                              A metade = <code>x/2</code>
                            </li>
                            <li>
                              O triplo = <code>3x</code>
                            </li>
                            <li>
                              A terça parte = <code>x/3</code>
                            </li>
                            <li>
                              O sucessor = <code>x + 1</code>
                            </li>
                            <li>
                              O antecessor = <code>x - 1</code>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-teal-500/10 p-3 rounded border border-teal-500/20 text-sm">
                          <p className="font-bold text-teal-700 mb-2">
                            OPERAÇÕES
                          </p>
                          <ul className="space-y-1">
                            <li>
                              A soma = <code>+</code>
                            </li>
                            <li>
                              A diferença = <code>-</code>
                            </li>
                            <li>
                              O produto = <code>×</code>
                            </li>
                            <li>
                              O quociente = <code>÷</code>
                            </li>
                            <li>
                              Aumentou = <code>+</code>
                            </li>
                            <li>
                              Diminuiu = <code>-</code>
                            </li>
                            <li>
                              Totalizou = <code>="</code>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Do Problema à Equação",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 mb-3">
                          Problema 1: (CESGRANRIO 2018 - Técnico)
                        </p>
                        <p className="text-sm mb-3">
                          "Um operador recebe um bônus de R$ 500 e seu salário
                          fica 30% maior. Qual era o salário antes do aumento?"
                        </p>
                        <p className="text-xs bg-emerald-500/20 p-2 rounded font-mono">
                          S + 500 = S × 1,30 → S × 0,30 = 500 → S = 1.667
                        </p>
                      </div>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-700 mb-3">
                          Problema 2: (Petrobras - Sistema 2x2)
                        </p>
                        <p className="text-sm mb-3">
                          "Dois técnicos têm juntos 12 anos de experiência. Um
                          tem 4 anos a mais que o outro. Quanto cada um tem?"
                        </p>
                        <p className="text-xs bg-teal-500/20 p-2 rounded font-mono">
                          t₁ + t₂ = 12 e t₁ = t₂ + 4 → t₂ = 4 anos, t₁ = 8 anos
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Protocolo de Batalha",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <ol className="space-y-2 text-sm list-decimal list-inside">
                        <li>
                          <strong>Leia DUAS VEZES</strong> respirando fundo.
                        </li>
                        <li>
                          <strong>Declare quem é X</strong>: "Seja x o
                          salário..."
                        </li>
                        <li>
                          <strong>
                            Ache o verbo "É" / "Ficou" / "Resulta"
                          </strong>
                          : Ali fica o "=".
                        </li>
                        <li>
                          <strong>Escreva a equação lendo pedacinho</strong> por
                          pedacinho.
                        </li>
                        <li>
                          <strong>Resolvaa equação</strong> com cuidado.
                        </li>
                        <li>
                          <strong>Releia o enunciado</strong> para garantir que
                          respondeu o certo.
                        </li>
                      </ol>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Ciladas do Português",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha: Percentual vs Aumento Nominal"
                    >
                      <p className="text-sm mb-2">
                        <strong>ERRADO:</strong> "Salário aumentou R$ 500, que é
                        30% maior" = S + 500 = S + 0,30S ❌
                      </p>
                      <p className="text-sm mb-2">
                        <strong>CERTO:</strong> "Salário fica 30% maior" = S ×
                        1,30 ✓
                      </p>
                      <p className="text-sm">
                        Aumentar 30% = multiplicar por 1,30, não somar 30% do
                        valor.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
          corIndicador="bg-blue-500"
        />

            <CardCarousel
              titulo="Problemas Reais (Contexto Petrobras)"
              cards={[
                {
                  titulo: "Caso 1: Distribuição de Horas",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Um técnico da RNEST trabalhou x horas em manutenção e
                        (x+8) horas em inspeção. Total: 40h.
                      </p>
                      <p className="font-mono text-xs">
                        x + (x+8) = 40 → x = 16h
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Caso 2: Custo de Operação",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Combustível custa R$ 50/barril. Se gastar R$ 5.000 em um
                        mês, quantos barris foram consumidos?
                      </p>
                      <p className="font-mono text-xs">50x = 5000 → x = 100</p>
                    </div>
                  ),
                },
                {
                  titulo: "Caso 3: Meta de Produção",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Plataforma A produz 2x barris/dia. Plataforma B produz
                        1.5x. Juntas: 3.500 barris. Quanto cada uma?
                      </p>
                      <p className="font-mono text-xs">
                        2x + 1.5x = 3.500 → x = 1.000 (A=2.000, B=1.500)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Interpretação Gráfica: Resolvendo Equações"
            functions={[
              {
                id: "func1",
                label: "x + 2",
                color: "#3b82f6",
                fn: (x) => x + 2,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "3",
                color: "#ef4444",
                fn: (x) => 3,
                strokeWidth: 2,
              },
            ]}
            xMin={-3}
            xMax={5}
            yMin={-1}
            yMax={6}
            points={250}
          />




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A solução da inequação 3x - 5 > 7 é:"
          alternativas={[
              { letra: "A", texto: "x > 4", correta: true },
              { letra: "B", texto: "x > 3", correta: false },
              { letra: "C", texto: "x < 4", correta: false },
              { letra: "D", texto: "x < 3", correta: false },
              { letra: "E", texto: "x ≥ 4", correta: false }
            ]}
          dicaEstrategica="Desigualdade estrita (>) se mantém pois dividimos por número positivo (3)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "3x - 5 > 7 → 3x > 12 → x > 4." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 2",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 2",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM2}
            titulo="QUIZ: Tradução de Problemas"
            numero={5}
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mx-auto max-w-4xl mt-12 mb-12">
        <ModuleSectionHeader
          index={3}
          title="Interpretação Avançada: Pegadinhas Comuns de Tradução"
          description="Onde candidatos escorregam (e como você vai se safar)"
          variant="blue"
        />

        <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
          <p>
            A tradução de linguagem natural para equações matemática é tão crítica que CESGRANRIO deliberadamente inclui pegadinhas. <strong>Pegadinha 1: Ambiguidade com "é".</strong> "O preço de um item é R$ 10 mais caro que outro" é ambíguo em português. Faz P1 = P2 + 10 ou P1 = P2 − 10? Resposta: é P1 = P2 + 10 (o primeiro item custa mais). Candidatos que interpretam errado caem. CESGRANRIO escreve com clareza ("A é 10 a mais que B" = A = B + 10), mas candidatos estressados em prova leem rápido e caem. <strong>Pegadinha 2: Proporções invertidas.</strong> "Maria tem o dobro da idade de João" é M = 2J. Mas "Maria é duas vezes mais velha" é ambíguo — alguns interpretam como M = 2J (errado), outros como M = J + 2J = 3J (correto, ela é João + mais dois Joãos). A formulação correta é "Maria tem duas vezes a idade de João" = M = 2J. Mas CESGRANRIO às vezes usa formulações que exploram essa ambiguidade, então estude as diferenças.
          </p>

          <p>
            <strong>Pegadinha 3: Ordens de operação implícitas.</strong> "O triplo de um número, menos 5" — essa frase é claramente 3x − 5 (triplo, DEPOIS menos 5). Mas "5 menos o triplo de um número" é 5 − 3x (ordem inversa). Se não ler com cuidado, inverte a ordem. Outro exemplo: "A idade de João dividida por 2, mais 3" é J/2 + 3. Mas "3 mais a idade de João, tudo dividido por 2" é (J + 3)/2 (parênteses implícitos pela ordem). Candidatos que não reescreverem a equação antes de resolver frequentemente erram esses. <strong>Pegadinha 4: "De vs "em".</strong> "Aumentou de 20%" é ×1,20. "Aumentou em 20%" também é ×1,20. Mas "reduzido de 20%" é ×0,80, e "reduzido a 20%" significa ficou COM 20%, logo ×0,20 (não ×0,80). A diferença é sutil mas crítica.
          </p>

          <p>
            <strong>Protocolo Anti-Pegadinha:</strong> (1) Leia a frase DUAS vezes — primeira para entender, segunda para desenhar um diagrama. Se o problema é "Maria tem 5 reais a mais que João", desenhe: Maria = |———|  + 5, João = |———|. Isto desambigua visualmente. (2) Reescreva a equação em português ANTES de resolver — "Se João tem J reais, Maria tem J + 5. Juntos têm 50: J + (J+5) = 50". (3) Sempre verifique com números específicos — se J = 22,5 e M = 27,5, então J + M = 50 ✓. Este protocolo agrega 30+ segundos por questão, mas economiza erros bobos que valem pontos.
          </p>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Tabela de Traduções Ambíguas (CESGRANRIO explora isso!)</h4>
            <div className="space-y-3 text-sm">
              <p><strong>Frase</strong> → <strong>Tradução Correta</strong> | <strong>Armadilha Comum</strong></p>
              <p>"X é Y a mais que Z" → X = Z + Y | ❌ X = Z − Y</p>
              <p>"X é duas vezes Y" → X = 2Y | ❌ X = Y + 2 (confunde "vezes" com "mais 2")</p>
              <p>"Aumentou de 30%" → ×1.30 | ❌ ×0.30 (confunde com "redução")</p>
              <p>"Reduziu a 40%" → ×0.40 (ficou com 40%) | ❌ ×0.60 (confunde com "reduziu em 40%")</p>
              <p>"Triplo menos 5" → 3x − 5 | ❌ 3(x − 5) = 3x − 15 (ordem das operações)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MÓDULO 3 ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3}
            titulo="Equações com Frações: O Aniquilador de Denominador"
            descricao="Como destruir frações em um único golpe: MMC. Nunca mais sofrer com ÷."
          variant="blue"
        />

          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Equações com Frações: Eliminando o Denominador Antes de Começar"
              description="O segredo para eliminar 90% da complexidade — multiplicar tudo pelo MMC no primeiro passo"
          variant="blue"
        />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Equações que contêm frações (também chamadas "equações racionais" em certos contextos) assustam muitos candidatos porque parecem intrinsecamente mais complexas. Exemplo: x/3 + 5 = x/2 − 1. A presença de denominadores introduz múltiplas operações: somar frações (exige MMC), multiplicar (cancelar), simplificar. Mas existe um **truque absoluto** que elimina toda essa complexidade em um único passo: multiplicar a **equação inteira** pelo **Mínimo Múltiplo Comum (MMC)** de todos os denominadores. Se você tem denominadores 3 e 2, o MMC é 6. Multiplique cada termo da equação por 6. A equação x/3 + 5 = x/2 − 1 vira 2x + 30 = 3x − 6 (todos os denominadores sumiram). Agora é uma equação linear pura, facilmente resolvível: −x = −36, logo x = 36. Este truque converte uma equação que parecia impossível em uma que qualquer candidato consegue resolver em trinta segundos.
              </p>

              <p>
                O **Mínimo Múltiplo Comum (MMC)** é o menor número que é divisível por todos os denominadores presentes. Se os denominadores são 2, 3, 4, o MMC é 12 (pois 12 ÷ 2 = 6, 12 ÷ 3 = 4, 12 ÷ 4 = 3, todos resultam em inteiros). Se os denominadores são 5 e 7, o MMC é 35 (pois são coprime). O algoritmo para encontrar MMC é: fatorar cada denominador em seus fatores primos, depois tomar cada primo com o maior expoente. Por exemplo, 12 = 2² × 3, 18 = 2 × 3². O MMC é 2² × 3² = 4 × 9 = 36. Calculadoras rapidamente comutam este cálculo, e muitas equações em provas CESGRANRIO usam denominadores "amigáveis" (2, 3, 4, 5, 6, 10) cuja MMC é óbvia. Candidatos que dominam o cálculo rápido do MMC ganham tempo crítico em provas.
              </p>

              <p>
                O **protocolo para resolver equações fracionárias** é: (1) Identificar todos os denominadores e calcular seu MMC; (2) **Multiplicar cada termo da equação pelo MMC** — isto cancela todos os denominadores; (3) Simplificar a equação resultante (agora sem frações); (4) Resolver a equação de 1º grau resultante usando os métodos do Módulo 1; (5) **Verificar se a solução não torna nenhum denominador igual a zero** (isto é crítico — se x = 0 e há um termo 1/x, a solução é inválida). Exemplo detalhado: x/4 + 2 = x/2. MMC(4, 2) = 4. Multiplique por 4: 4(x/4) + 4(2) = 4(x/2) ⟹ x + 8 = 2x. Subtraia x: 8 = x. Verifique: x = 8 não torna nenhum denominador zero ✓. Verifique substituindo: 8/4 + 2 = 2 + 2 = 4, e 8/2 = 4 ✓.
              </p>

              <p>
                Na prática Petrobras, equações fracionárias aparecem em contextos de **distribuição ponderada e taxas**. "Um operador gasta x/6 do seu tempo em inspeção, x/3 em manutenção, e x/2 em operação normal. Se o tempo restante (que é 2 horas) é para pausa, qual é o tempo total?" Montamos: x − x/6 − x/3 − x/2 = 2. MMC(1, 6, 3, 2) = 6. Multiplique por 6: 6x − x − 2x − 3x = 12 ⟹ 0x = 12 (equação degenerada!). Isto significa não há solução consistente — o operador não pode dividir seu tempo dessa forma e ainda ter 2 horas de pausa. Esta é uma **detecção de inconsistência** via álgebra. Sem domínio de equações fracionárias, candidatos não conseguem nem montar esse problema.
              </p>

              <p>
                Erros comuns incluem: (1) Esquecer de multiplicar **todos** os termos pelo MMC (multiplicar apenas os fracionários deixa números inteiros sem ajuste); (2) Erro de sinal ao multiplicar (se há um − antes de uma fração, o sinal flipa quando multiplica); (3) Simplificar incorretamente após a multiplicação (ex: 4 × x/4 = x, não 4x); (4) Esquecer de verificar se a solução torna um denominador zero (tornaria a equação original indefinida); (5) Confundir MMC com MCD (Máximo Comum Divisor — oposto). Esses erros são frequentemente o motivo por que candidatos que "entendem a lógica" ainda acertam apenas 40-50% das questões com frações.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Protocolo: Resolver Equações com Frações</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>PASSO 1:</strong> Identifique todos os denominadores (2, 3, 4, 5, etc.)</p>
                  <p><strong>PASSO 2:</strong> Calcule MMC de todos os denominadores</p>
                  <p><strong>PASSO 3:</strong> **Multiplique CADA termo da equação inteira pelo MMC** — isto cancela todos os denominadores</p>
                  <p><strong>PASSO 4:</strong> Simplifique e resolva como equação de 1º grau comum (módulo 1)</p>
                  <p><strong>PASSO 5:</strong> Verifique: a solução torna algum denominador zero? Se sim, INVÁLIDA. Se não, resposta final.</p>
                  <p><strong>EXEMPLO MMC:</strong> Denominadores 2, 3, 6 → MMC = 6 | Denominadores 4, 6 → MMC = 12 | Denominadores 5, 7 → MMC = 35</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Limpando Frações Rápidamente"
              description="Frações atraem erros. Seu objetivo: eliminá-las no PRIMEIRO passo."
          variant="blue"
        />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O Estratagema do MMC",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Quando uma equação tem denominadores, o truque é
                        encontrar o <strong>Mínimo Múltiplo Comum</strong> de
                        todos os números de baixo e{" "}
                        <strong>multiplicar TODA a equação por esse MMC</strong>
                        . Pronto: as frações desaparecem como mágica.
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 mb-2">
                          Por que funciona?
                        </p>
                        <p className="text-sm">
                          Se multiplicamos por MMC, cada fração tem seu
                          denominador anulado. Ex: (x/2) × 6 = 3x (porque
                          6÷2=3).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Passo a Passo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 font-mono text-sm space-y-2">
                        <p className="font-black text-amber-700">
                          Exemplo 1: (x/2) + (x/3) = 5
                        </p>
                        <p>📌 MMC(2,3) = 6</p>
                        <p>📌 Multiplica TUDO por 6: 6(x/2) + 6(x/3) = 6(5)</p>
                        <p>📌 Simplifica: 3x + 2x = 30</p>
                        <p>📌 Resolve: 5x = 30 → x = 6 ✓</p>
                      </div>
                      <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 font-mono text-sm space-y-2">
                        <p className="font-black text-orange-700">
                          Exemplo 2: (2x/3) - (x/4) = 5
                        </p>
                        <p>📌 MMC(3,4) = 12</p>
                        <p>📌 Multiplica: 12(2x/3) - 12(x/4) = 12(5)</p>
                        <p>📌 Simplifica: 8x - 3x = 60</p>
                        <p>📌 Resolve: 5x = 60 → x = 12 ✓</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: O Método RÁPIDO",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-amber-500/10 p-3 rounded border-l-4 border-amber-500">
                        <p className="font-bold text-amber-700 text-sm mb-1">
                          🚀 Atalho: MMC por Vontade
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se tiver 2, 3, 4: MMC = 12. Se tiver 5, 6: MMC = 30.
                          Multiplicar por um múltiplo comum SEMPRE funciona.
                        </p>
                      </div>
                      <div className="bg-orange-500/10 p-3 rounded border-l-4 border-orange-500">
                        <p className="font-bold text-orange-700 text-sm mb-1">
                          🎯 Passo Crítico
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Multiplique TODA equação, não só um lado. Erros
                          maiores acontecem aqui.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Ciladas com Multiplicação",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox
                      tipo="danger"
                      titulo="ATENÇÃO: Multiplicação Cruzada"
                    >
                      <p className="text-sm mb-2">
                        Se tiver <code>(x/2) = (5/3)</code>, NÃO use MMC. Use
                        multiplicação cruzada:
                      </p>
                      <p className="text-sm font-mono font-bold">
                        3x = 2 × 5 → x = 10/3 ✓
                      </p>
                      <p className="text-sm mt-2">
                        Multiplicação cruzada é MAIS RÁPIDA quando tem uma
                        fração = outra fração.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
          corIndicador="bg-emerald-500"
        />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-amber-500" />
                    <p className="font-bold text-center">MMC de 4 e 6?</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold text-center">12</p>
                    <p className="text-xs text-muted-foreground">
                      Múltiplos: 4, 8, 12... 6, 12...
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-amber-500" />
                    <p className="font-bold text-center">(x/5) + 2 = 7</p>
                    <p className="text-sm text-muted-foreground">Qual é x?</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-mono text-sm font-bold">x = 25</p>
                    <p className="text-xs text-muted-foreground">
                      x/5 = 5 → x = 25
                    </p>
                  </div>
                }
              />
            </div>
          </section>




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A solução da inequação 3x - 5 > 7 é:"
          alternativas={[
              { letra: "A", texto: "x > 4", correta: true },
              { letra: "B", texto: "x > 3", correta: false },
              { letra: "C", texto: "x < 4", correta: false },
              { letra: "D", texto: "x < 3", correta: false },
              { letra: "E", texto: "x ≥ 4", correta: false }
            ]}
          dicaEstrategica="Desigualdade estrita (>) se mantém pois dividimos por número positivo (3)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "3x - 5 > 7 → 3x > 12 → x > 4." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 3",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 3",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM3}
            titulo="QUIZ: Equações com Frações"
            numero={5}
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mx-auto max-w-4xl mt-12 mb-12">
        <ModuleSectionHeader
          index={3}
          title="Casos Especiais: Equações Degeneradas e Indeterminadas"
          description="Quando MMC é apenas meia história"
          variant="blue"
        />

        <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
          <p>
            Nem toda equação com frações é resolvida simplesmente pelo MMC. Existem casos especiais que CESGRANRIO adora cobrar como pegadinha. <strong>Caso 1: Equação Indeterminada (Infinitas Soluções).</strong> Exemplo: (x + 2)/3 = (x + 2)/3. Multiplique por 3: x + 2 = x + 2. Resulta em 0 = 0 (verdade universal). Isto significa que QUALQUER valor de x satisfaz a equação — há infinitas soluções. A CESGRANRIO pergunta "qual é a solução?" esperando que candidatos não percebam este caso especial e marquem uma resposta aleatória. <strong>Caso 2: Equação Impossível (Sem Solução).</strong> Exemplo: (x + 2)/2 = (x + 5)/2. Multiplique por 2: x + 2 = x + 5. Subtraia x: 2 = 5 (absurdo). Isto significa que NÃO HÁ valor de x que satisfaça — zero soluções. Candidatos que não percebem isto tentam "resolver" uma equação que não tem solução, gerando respostas erradas. <strong>Caso 3: Restrições de Domínio.</strong> Exemplo: 1/(x − 3) + 2 = 5. Mesmo que você resolva e encontre x = 3, isto é INVÁLIDO porque torna o denominador zero, tornando a fração indefinida. A equação original não está definida para x = 3. Candidatos descuidados marcam x = 3 e perdem pontos. Sempre verifique: a solução torna algum denominador zero?
          </p>

          <p>
            <strong>Protocolo para Detectar Casos Especiais:</strong> Após multiplicar pelo MMC e simplificar, observe o resultado: (1) Se obtém "0 = 0", infinitas soluções — normalmente a resposta é "S = ℝ" (todos os reais). (2) Se obtém "0 = k" (k ≠ 0), nenhuma solução — normalmente a resposta é "S = ∅" (vazio). (3) Se obtém uma equação normal (ex: 3x = 12 → x = 4), continue resolvendo, MAS verifique se x = 4 torna algum denominador zero. Se sim, a resposta é que não há solução. Este protocolo protege contra 90% das pegadinhas de CESGRANRIO. Candidatos que o aplicam sistematicamente ganham uma vantagem imensa.
          </p>

          <p>
            <strong>Integração com Módulo 1 (Balança Fundamental):</strong> Os casos especiais vêm do fato de que equações de 1º grau podem ter 0, 1, ou infinitas soluções (diferente de equações de grau mais alto, que podem ter mais soluções). A balança fundamental (o que você faz de um lado, faz do outro) ainda se aplica, mas os resultados podem ser: balança em um ponto único (1 solução), balança perfeitamente equilibrada em todos os pontos (infinitas), ou balança nunca equilibrada (nenhuma). Entender isto geometricamente (retas que se cruzam, são idênticas, ou paralelas) ajuda na intuição.
          </p>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground">Decisão Rápida: Qual Tipo de Solução?</h4>
            <div className="space-y-3 text-sm">
              <p><strong>Se resulta em "0 = 0"</strong> → Infinitas soluções (identidade). Resposta: S = ℝ</p>
              <p><strong>Se resulta em "0 = 5" ou "3 = 0"</strong> → Nenhuma solução (contradição). Resposta: S = ∅</p>
              <p><strong>Se resulta em "2x = 10"</strong> → Uma solução (x = 5). Resposta: S = {5}</p>
              <p><strong>SEMPRE verifique</strong> se a solução torna denominador zero. Se sim, mude para S = ∅</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MÓDULO 4 ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={4}
            titulo="Sistemas Lineares 2x2"
            descricao="Duas equações, duas incógnitas. Método da Adição vs Substituição."
          variant="blue"
        />

          {/* ★ RICH INTRO SECTION — TEXTO DENSO INTRODUTÓRIO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Sistemas de Duas Equações e Duas Incógnitas"
              description="Quando você tem dois valores desconhecidos e duas pistas — usar múltiplas informações simultaneamente"
          variant="blue"
        />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Um **sistema linear 2×2** é um conjunto de duas equações de 1º grau, cada uma com duas incógnitas (usualmente x e y), que devem ser satisfeitas **simultaneamente**. Exemplo: x + y = 10 e x − y = 4. A solução é o par de valores (x, y) = (7, 3) que torna ambas as equações verdadeiras ao mesmo tempo. Verificação: 7 + 3 = 10 ✓ e 7 − 3 = 4 ✓. Sistemas lineares surgem em problemas do mundo real onde você tem múltiplas restrições. Exemplo: "Duas equipes perfuram poços em uma plataforma. Juntas perfuram 1.000 metros por dia. A primeira perfura 200 metros a mais que a segunda. Quanto cada uma perfura?" Monta-se: x + y = 1.000 e x = y + 200. A solução é x = 600, y = 400. Na Petrobras, sistemas lineares aparecem constantemente em **alocação de recursos**, **balanceamento de produções**, **custos compartilhados**.
              </p>

              <p>
                Existem três **métodos clássicos** para resolver sistemas 2×2: (1) **Método da Adição (ou Eliminação)** — empilhe as equações e some, esperando que uma incógnita se cancele; (2) **Método da Substituição** — isole uma incógnita em uma equação e substitua na outra; (3) **Método Gráfico** — plotar ambas as retas e encontrar o ponto de interseção. O **Método da Adição** é o mais veloz em provas. Se você tem x + 2y = 10 e 2x − 2y = 8, soma imediatamente: 3x + 0y = 18, logo x = 6. Substitui em qualquer uma: 6 + 2y = 10 → y = 2. O **Método da Substituição** é útil quando uma incógnita está isolada. Se uma equação é J = M + 5 (João = Maria + 5), substitua esta expressão na outra equação em lugar de J, reduzindo a uma equação com uma incógnita. O **Método Gráfico** raramente é testado em provas CESGRANRIO de múltipla escolha, mas é importante para entender que a solução é o ponto de encontro das duas retas.
              </p>

              <p>
                Há **três possibilidades de solução** para um sistema 2×2: (1) **Uma solução única** — as duas retas se cruzam em exatamente um ponto (caso típico, gráficos não-paralelos); (2) **Infinitas soluções** — as duas retas são idênticas (mesma reta, sobreposta); isto ocorre se as equações são múltiplas uma da outra: x + y = 5 e 2x + 2y = 10 representam a mesma reta; (3) **Nenhuma solução** — as duas retas são paralelas (nunca se encontram): x + y = 5 e x + y = 10 são paralelas, logo sistema impossível. A CESGRANRIO frequentemente inclui sistemas que resultam em infinitas soluções ou nenhuma solução como "pegadinhas" — candidatos esperam sempre uma solução única e não conferem este caso.
              </p>

              <p>
                O **protocolo geral** para resolver um sistema 2×2 é: (1) Escolha o método (Adição é geralmente mais rápido); (2) Se usar Adição, manipule as equações (multiplique por constantes) para que uma incógnita tenha coeficientes opostos; (3) Some as equações; (4) Resolva a equação resultante de uma incógnita (módulo 1); (5) Substitua a solução em qualquer equação original para encontrar a segunda incógnita; (6) **Sempre verifique** substituindo ambos os valores em ambas as equações. Exemplo: 3x + y = 10 e x − y = 2. Multiplique a segunda por −3: −3x + 3y = −6. Some com a primeira: 4y = 4 → y = 1. Substitua: x − 1 = 2 → x = 3. Verificação: 3(3) + 1 = 10 ✓ e 3 − 1 = 2 ✓. Se a verificação falha, há erro aritmético.
              </p>

              <p>
                Erros frequentes: (1) Esquecer de verificar — é a única salvaguarda contra erros aritméticos; (2) Erro de sinal ao multiplicar uma equação — se multiplica por −3, todos os termos mudam sinal, incluindo o lado direito; (3) Não reconhecer sistemas sem solução (paralelas) ou com infinitas soluções (idênticas) — isto causa confusão quando resolve e obtém "0 = 0" (infinitas) ou "0 = 5" (nenhuma); (4) Usar o método errado para a situação — substituição é melhor se uma incógnita está isolada, adição é melhor se os coeficientes se cancelam facilmente. Estes erros causam 50% das respostas erradas em questões sobre sistemas.
              </p>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Métodos & Casos Especiais</h4>
                <div className="space-y-3 text-sm">
                  <p><strong>Método da Adição:</strong> Multiplique equações para cancelar uma incógnita, some, resolva a restante</p>
                  <p><strong>Método da Substituição:</strong> Isole uma incógnita, substitua na outra equação, resolva</p>
                  <p><strong>Uma Solução Única:</strong> Retas não-paralelas (caso típico) → (x, y) único</p>
                  <p><strong>Infinitas Soluções:</strong> Retas idênticas (equações são múltiplas) → "0 = 0" ao resolver → resultado a + bt (reta paramétrica)</p>
                  <p><strong>Nenhuma Solução:</strong> Retas paralelas → "0 = k" (k ≠ 0) ao resolver → impossível</p>
                  <p><strong>SEMPRE VERIFICAR:</strong> Substitua x, y em ambas as equações originais</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Dominando X e Y"
              description="Quando você tem duas balas para dois alvos."
          variant="blue"
        />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O que é um Sistema?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Um <strong>sistema linear 2x2</strong> é um conjunto de
                        duas equações com duas incógnitas que devem ser
                        satisfeitas<strong> simultâneamente</strong>. A solução
                        é o par (x, y) que torna AMBAS equações verdadeiras.
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 mb-2">Exemplo:</p>
                        <p className="font-mono text-sm mb-2">
                          x + y = 10
                          <br />x - y = 4<br />
                          <span className="text-cyan-600">
                            Solução: x = 7, y = 3
                          </span>
                        </p>
                        <p className="text-xs">
                          Verificação: 7 + 3 = 10 ✓ e 7 - 3 = 4 ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Método da Adição",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        É o método veloz. Empilhe as equações e "some", torcendo
                        para um dos valores se anular.
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 font-mono text-sm space-y-3">
                        <p className="font-black">2x + y = 10</p>
                        <p>3x - y = 15</p>
                        <p className="border-t border-cyan-500/50 pt-2">
                          Soma: 5x + 0 = 25
                        </p>
                        <p>
                          Resultado: x = 5, substitui em qualquer uma → y = 0
                        </p>
                        <p className="text-cyan-600 font-bold">
                          ✓ Solução: (5, 0)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Método da Substituição",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Útil quando uma letra está isolada. Ex: "J = M + 5".
                      </p>
                      <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20 space-y-2 text-sm">
                        <p className="font-bold">Sistema:</p>
                        <p className="font-mono">
                          y = 2x
                          <br />x + y = 9
                        </p>
                        <p className="font-bold mt-2">Passo a Passo:</p>
                        <p>1. Vê que y = 2x já está isolado.</p>
                        <p>2. Substitui na segunda: x + 2x = 9</p>
                        <p>3. Resolve: 3x = 9 → x = 3</p>
                        <p>4. Volta: y = 2(3) = 6</p>
                        <p className="font-bold text-sky-600 mt-2">
                          ✓ Solução: (3, 6)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Escolha o Método Certo",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-cyan-500/10 p-3 rounded border-l-4 border-cyan-500">
                        <p className="font-bold text-cyan-700 text-sm">
                          ⚡ Adição: Quando há simetria
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se vir +y e -y, some direto. Rápido!
                        </p>
                      </div>
                      <div className="bg-sky-500/10 p-3 rounded border-l-4 border-sky-500">
                        <p className="font-bold text-sky-700 text-sm">
                          🔄 Substituição: Quando há isolamento
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se já vê x = ... ou y = ..., use substituição.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Sistemas Especiais",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="info" titulo="Casos Especiais">
                      <p className="text-sm mb-2">
                        <strong>1. Sistema Impossível:</strong> 2x + y = 5 e 2x
                        + y = 8 (Não há solução, retas paralelas)
                      </p>
                      <p className="text-sm mb-2">
                        <strong>2. Sistema Indeterminado:</strong> 2x + y = 6 e
                        4x + 2y = 12 (Infinitas soluções, retas coincidentes)
                      </p>
                      <p className="text-sm">
                        <strong>3. Sistema Normal:</strong> Uma única solução
                        (retas se cruzam em um ponto)
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
          corIndicador="bg-rose-500"
        />
          </section>




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A idade de um operador é o dobro da idade do estagiário. A soma das idades é 54. Qual a idade do operador?"
          alternativas={[
              { letra: "A", texto: "27", correta: false },
              { letra: "B", texto: "32", correta: false },
              { letra: "C", texto: "36", correta: true },
              { letra: "D", texto: "40", correta: false },
              { letra: "E", texto: "18", correta: false }
            ]}
          dicaEstrategica="Operador = 36."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Seja e = idade do estagiário." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Operador = 2e." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "2e + e = 54 → 3e = 54 → e = 18." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 4",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 4",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM4}
            titulo="QUIZ: Sistemas Lineares"
            numero={4}
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5 ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={5}
            titulo="Simulado Parcial"
            descricao="Reúna tudo dos Módulos 1-4. Você está no caminho certo?"
          variant="blue"
        />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Checkpoint: Revisão Progressiva"
              description="Teste seus conhecimentos antes de avançar para inequações e sistemas avançados."
          variant="blue"
        />

            <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
              <p>
                Chegou o momento de consolidar tudo aquilo que aprendeu nos primeiros quatro módulos.
                A resolução de equações de 1º grau é como construir uma fundação sólida: cada conceito
                depende dos anteriores. Neste checkpoint, você enfrentará problemas que integram desde
                a tradução de português para matemática até sistemas lineares 2×2, testando sua capacidade
                de escolher o método correto para cada situação.
              </p>
              <p>
                Por que isso importa? Porque a CESGRANRIO não testa um conceito isolado. Ela mescla
                módulos: uma questão pode começar pedindo tradução de uma frase, evoluir para manipulação
                algébrica com frações, e terminar em um sistema 2×2. Dominar a integração é dominar a prova.
              </p>
              <p>
                Este simulado de checkpoint é <strong>progressivo</strong>. As 8 questões começam fáceis
                (diretas do M1-M2) e terminam complexas (integrações M3-M4). Mínimo de 70% indica que você
                está pronto para inequações e sistemas avançados. Abaixo de 70%, recomendamos revisão dos
                módulos anteriores usando a página de Consolidação antes de prosseguir.
              </p>
              <p>
                Observe também que cada questão corrigida fornece feedback detalhado: qual método deveria
                ter sido usado, por que seu erro aconteceu, e um link para a sessão teórica correspondente.
                Use esses feedbacks como mapa de aprendizado pessoal.
              </p>
              <p>
                Tempo estimado: 20 minutos. Sem calculadora. Pen and paper (ou rascunho no papel). Vamos lá?
              </p>

              <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mb-2">📊 O Que Esperar</p>
                <ul className="text-sm space-y-1 text-foreground">
                  <li>✓ 8 questões integradas (M1-M4)</li>
                  <li>✓ Progressão fácil → difícil</li>
                  <li>✓ Feedback detalhado por resposta</li>
                  <li>✓ Desempenho ≥70% libera M6+ (Inequações)</li>
                </ul>
              </div>
            </div>
          </section>

          <FunctionGraph
            title="Interseção de Retas"
            functions={[
              {
                id: "func1",
                label: "2x - 4",
                color: "#3b82f6",
                fn: (x) => 2 * x - 4,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "x + 1",
                color: "#ef4444",
                fn: (x) => x + 1,
                strokeWidth: 2,
              },
            ]}
            xMin={-3}
            xMax={6}
            yMin={-5}
            yMax={8}
            points={250}
          />




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Resolvendo (x+1)/3 = (2x-1)/5, o valor de x é:"
          alternativas={[
              { letra: "A", texto: "4", correta: false },
              { letra: "B", texto: "6", correta: false },
              { letra: "C", texto: "8", correta: true },
              { letra: "D", texto: "10", correta: false },
              { letra: "E", texto: "12", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Multiplicando cruzado: 5(x+1) = 3(2x-1) → 5x+5 = 6x-3 → 5+3 = 6x-5x → x = 8." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 5",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-amber-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-amber-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-amber-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 5",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="font-bold text-amber-600 dark:text-amber-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM5}
            titulo="QUIZ: Simulado Parcial (M1-M4)"
            numero={3}
            icone="📋"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6 ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={6}
            titulo="Inequações de 1º Grau"
            descricao={
              "Equações ao contrário: > e <. Regra do Sinal INVERTE ao dividir por negativo."
            }
          variant="blue"
        />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Desigualdades e Soluções em Intervalo"
              description={
                "Quando a igualdade (=) vira desigualdade (>, <, ≥, ≤)."
              }
          variant="blue"
        />

            <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
              <p>
                Até agora, você resolveu <strong>equações</strong>: expressões com um sinal de igualdade (=).
                Agora chegou o momento de lidar com <strong>inequações</strong>: expressões com sinais de desigualdade
                ({'>'}), ({'<'}), ({"≥"}), ({"≤"}). A grande diferença é que a solução não é um número único,
                mas um <strong>intervalo infinito</strong> de números. Por exemplo: "todos os números maiores que 5".
              </p>
              <p>
                Inequações aparecem frequentemente em contextos reais. No mundo Petrobras, elas definem <strong>limites operacionais</strong>:
                "a pressão deve ser ≥ 150 bar e {"<"} 200 bar", "a temperatura deve ficar entre 60ºC e 80ºC", "não gastar mais de R$ 500 mil".
                Dominar inequações significa dominar restrições e intervalos de viabilidade técnica.
              </p>
              <p>
                A regra mais importante é: <strong>ao multiplicar ou dividir por um número NEGATIVO, o sinal inverte</strong>.
                Por exemplo: -2x {">"} 8 torna-se x {"<"} -4 (não x {">"}). Este detalhe é onde a maioria dos erros acontecem
                — e onde a CESGRANRIO adora colocar pegadinhas. Se você errar o sinal uma vez, a resposta inteira fica errada.
              </p>
              <p>
                As soluções de inequações são expressas em <strong>notação de intervalo</strong>: (5, 10), [3, 7], (-∞, 4), [2, +∞).
                Os parênteses ( ) indicam intervalo aberto (o número não incluído); colchetes [ ] indicam intervalo fechado
                (número incluído). Essa notação é padrão em todas as universidades e aparece em provas.
              </p>
              <p>
                Neste módulo, você aprenderá a resolver qualquer inequação de 1º grau, dominar a regra do sinal invertido,
                representar soluções graficamente (reta numérica) e em notação de intervalo. Vamos começar?
              </p>

              <p>
                <strong>Classificação de Sistemas de Inequações:</strong> Quando você combina duas ou mais inequações, terá de identificar se usa E (interseção — solução deve satisfazer ambas) ou OU (união — solução satisfaz pelo menos uma). Exemplo: "x {">"} 2 E x {"<"} 7" significa 2 {"<"} x {"<"} 7 (intervalo entre 2 e 7). "x {"<"} 0 OU x {">"} 5" significa x está fora de [0, 5], ou seja, x ∈ (-∞, 0) ∪ (5, +∞). A CESGRANRIO frequentemente cobra este tipo de raciocínio combinatório em questões que parecem simples mas exigem cuidado lógico.
              </p>

              <p>
                <strong>Geração de Soluções Infinitas:</strong> Ao resolver uma inequação, você obtém um conjunto infinito de soluções (não um número único como em equações). A CESGRANRIO frequentemente pergunta "quantos números inteiros satisfazem" ou "qual o menor inteiro" ou "qual o maior número real". Por exemplo, x ≤ 5 é satisfeito por &#123;..., 3, 4, 5&#125; inteiros, mas também por 5, 4.9, 4.999, etc. em reais. Compreender esta diferença (discreto vs. contínuo) é essencial para interpretar corretamente o que a questão pede.
              </p>

              <p>
                <strong>Aplicações Práticas em Limites Operacionais:</strong> Na Petrobras, inequações definem <strong>restrições de operação</strong>: "a temperatura não deve ultrapassar 80°C" é T ≤ 80; "a pressão deve estar entre 100 e 150 bar" é 100 ≤ P ≤ 150; "o tempo de parada não deve exceder 48 horas" é t ≤ 48. Dominar inequações significa saber ler especificações técnicas e traduzir limites em inequações matemáticas. Um técnico que não consegue resolver inequações não consegue verificar se uma operação está dentro de parâmetros seguros.
              </p>

              <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">⚠️ Regra de Ouro</p>
                <p className="text-sm font-mono bg-rose-500/5 p-3 rounded mb-2">
                  Ao multiplicar/dividir por <strong>NEGATIVO</strong> → sinal INVERTE
                </p>
                <ul className="text-sm space-y-1 text-foreground">
                  <li>✓ Exemplo: -2x {">"}  8  →  x {"<"} -4</li>
                  <li>✓ Notação: x ∈ (-∞, -4)  ou  x {"<"} -4</li>
                  <li>✓ Sempre VERIFIQUE com um valor do intervalo</li>
                </ul>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O que é uma Inequação?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Uma <strong>inequação</strong> é como uma equação, mas
                        com um sinal de desigualdade ({">"}, {"<"}, ≥, ≤) ao
                        invés de igualdade. A solução é um{" "}
                        <strong>intervalo</strong> de valores, não um único
                        valor.
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="font-mono text-sm mb-2">
                          <strong>Exemplo:</strong> 3x - 5 {">"} 7
                        </p>
                        <p className="text-sm">
                          Resolve como equação: 3x {">"} 12 → x {">"} 4
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Solução: todos os números maiores que 4.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Divisão por Negativo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 font-mono text-sm space-y-2">
                        <p className="font-black">Exemplo 1: -2x {"<"} 8</p>
                        <p>
                          {"→"} x {">"} -4
                        </p>
                        <p className="text-rose-600 text-xs">
                          ⚠️ Divide por -2, INVERTE o sinal de {"<"} para {">"}
                        </p>
                      </div>
                      <div className="bg-pink-500/10 p-4 rounded-xl border border-pink-500/20 font-mono text-sm space-y-2">
                        <p className="font-black">Exemplo 2: 5x ≥ 20</p>
                        <p>{"→"} x ≥ 4</p>
                        <p className="text-pink-600 text-xs">
                          ✓ Divide por 5 (positivo), mantém ≥
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: A Regra CRUCIAL",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="danger" titulo="REGRA DE OURO">
                        <p className="text-sm font-bold">
                          Ao dividir (ou multiplicar) por um NÚMERO NEGATIVO, o
                          sinal de desigualdade INVERTE!
                        </p>
                      </AlertBox>
                      <div className="bg-rose-500/10 p-3 rounded border-l-4 border-rose-500 text-sm">
                        <p className="font-bold text-rose-700">
                          {">"} inverte para {"<"}
                        </p>
                        <p className="font-bold text-rose-700">
                          ≥ inverte para ≤
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Sistemas de Inequações",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p className="font-bold">
                        Quando há E: interseção dos intervalos
                      </p>
                      <div className="bg-rose-500/10 p-2 rounded font-mono text-xs">
                        x {`>`} 2 E x {`<`} 7 → 2 {`<`} x {`<`} 7
                      </div>
                      <p className="font-bold mt-3">
                        Quando há OU: união dos intervalos
                      </p>
                      <div className="bg-pink-500/10 p-2 rounded font-mono text-xs">
                        x {"<"} 0 OU x {">"} 5 → x ∈ (-∞, 0) ∪ (5, +∞)
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-amber-600"
        />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-rose-500" />
                    <p className="font-bold text-center">-3x ≤ 12, qual é x?</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-mono font-bold">x ≥ -4</p>
                    <p className="text-xs text-muted-foreground">
                      Dividir por -3 inverte ≤ para ≥
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-rose-500" />
                    <p className="font-bold text-center">
                      (2x + 1) {">"} 9, qual é x?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-mono font-bold">x {">"} 4</p>
                    <p className="text-xs text-muted-foreground">
                      2x {">"} 8 → divide por 2 (positivo)
                    </p>
                  </div>
                }
              />
            </div>
          </section>




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Resolvendo (x+1)/3 = (2x-1)/5, o valor de x é:"
          alternativas={[
              { letra: "A", texto: "4", correta: false },
              { letra: "B", texto: "6", correta: false },
              { letra: "C", texto: "8", correta: true },
              { letra: "D", texto: "10", correta: false },
              { letra: "E", texto: "12", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Multiplicando cruzado: 5(x+1) = 3(2x-1) → 5x+5 = 6x-3 → 5+3 = 6x-5x → x = 8." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 6",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-rose-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-rose-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-rose-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 6",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-bold text-rose-600 dark:text-rose-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM6}
            titulo="QUIZ: Inequações de 1º Grau"
            numero={3}
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7 ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={7}
            titulo="Sistemas Lineares Avançados (3x3)"
            descricao="Três equações, três incógnitas. Eliminação de Gauss (simplificado)."
          variant="blue"
        />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Da Dimensão 2x2 para 3x3"
              description="Mesma estratégia: isolar incógnitas progressivamente."
          variant="blue"
        />

            <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
              <p>
                Você já domina sistemas 2×2 (duas equações, duas incógnitas). Agora é hora de expandir para
                <strong> sistemas 3×3 (três equações, três incógnitas)</strong>. O nome é assustador, mas a estratégia
                é idêntica: eliminar incógnitas progressivamente até ficar com uma equação em uma variável.
              </p>
              <p>
                A diferença principal é o número de passos: em 2×2, você reduz de 2 para 1 equação em um passo.
                Em 3×3, você reduz de 3 para 2 (primeiro passo), depois de 2 para 1 (segundo passo). A lógica é
                a mesma — apenas mais uma rodada de eliminação. Sistemas 3×3 aparecem em programação linear, planejamento
                de produção e problemas Petrobras que envolvem múltiplas restrições simultâneas.
              </p>
              <p>
                O método mais comum é <strong>eliminação de Gauss (forma simplificada)</strong>. A ideia: use a primeira
                equação para eliminar x das duas seguintes (reduzindo para 2×2). Depois, use a segunda equação (agora sem x)
                para eliminar y da terceira (reduzindo para 1 equação em z). Resolva z, volte à segunda equação para y, depois à primeira para x.
              </p>
              <p>
                O ponto crítico é <strong>organização e arredondamento</strong>. Com 3 equações e operações repetidas,
                erros aritmética acumulam rapidamente. Sempre reescreva o sistema claramente após cada eliminação. Se der
                frações feias (ex.: 7/3), mantenha como fração — não arredonde até o final.
              </p>
              <p>
                Neste módulo, você aprenderá o protocolo passo a passo, praticar com 4-5 sistemas variados (alguns com
                soluções únicas, outros com soluções infinitas ou nenhuma), e dominar a verificação final. Vamos expandir?
              </p>

              <p>
                <strong>Geometria do Sistema 3×3:</strong> Diferentemente do sistema 2×2 (onde duas retas podem se cruzar, ser paralelas ou idênticas), o sistema 3×3 envolve <strong>três planos no espaço tridimensional</strong>. Um sistema com solução única significa que os três planos se encontram em exatamente um ponto. Um sistema com infinitas soluções pode significar que os três planos se intersectam em uma reta (infinitos pontos naquela reta) ou que todos os três planos são idênticos. Um sistema impossível (sem solução) ocorre quando os planos não têm ponto de encontro comum — por exemplo, dois planos são idênticos e o terceiro é paralelo a eles. Essa intuição geométrica ajuda a entender o que significam os resultados algébricos.
              </p>

              <p>
                <strong>Classificação de Sistemas 3×3:</strong> Após resolução, o sistema cai em uma de três categorias: (1) <strong>SPD (Possível e Determinado)</strong> — uma solução única (x, y, z); (2) <strong>SPI (Possível e Indeterminado)</strong> — infinitas soluções, normalmente expressa como uma reta paramétrica ou um plano; (3) <strong>SI (Impossível)</strong> — nenhuma solução, detectado quando você obtém um absurdo matemático como "0 = 5". A CESGRANRIO frequentemente cobra qual é a classificação de um sistema após resolvê-lo parcialmente, então é crítico reconhecer os sinais de cada caso.
              </p>

              <p>
                <strong>Aplicações Reais Petrobras:</strong> Sistemas 3×3 aparecem em problemas de <strong>alocação de três recursos</strong> ou <strong>mistura de três componentes</strong>. Exemplo: uma refinaria mistura três tipos de óleo cru (tipo A, B, C) em proporções que devem atender a três restrições simultâneas: (1) volume total 1.000 barris, (2) custo total R$ 50.000, (3) viscosidade média dentro de intervalo específico. Cada restrição gera uma equação, resultando em um sistema 3×3. Resolver isto manualmente em prova sem erros é um diferencial competitivo.
              </p>

              <div className="bg-violet-500/10 border-l-4 border-violet-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-violet-600 dark:text-violet-400 text-sm mb-2">🔷 Protocolo 3×3</p>
                <ol className="text-sm space-y-1 text-foreground list-decimal list-inside">
                  <li>Use EQ1 para eliminar x das EQ2 e EQ3</li>
                  <li>Use EQ2 (novo) para eliminar y de EQ3 (novo)</li>
                  <li>Resolva z da última equação</li>
                  <li>Substitua z na EQ2 para encontrar y</li>
                  <li>Substitua y e z na EQ1 para encontrar x</li>
                  <li><strong>SEMPRE</strong> verifique substituindo na equação original</li>
                </ol>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Sistema 3x3",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Um sistema 3x3 tem 3 equações com 3 incógnitas (x, y,
                        z). Usa-se <strong>eliminação progressiva</strong>: das
                        3 equações originais, passa para 2, depois para 1.
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 mb-2">
                          Exemplo Simples:
                        </p>
                        <div className="font-mono text-xs space-y-1">
                          <p>x + y + z = 6</p>
                          <p>x - y + z = 4</p>
                          <p>2x + y - z = 5</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Passo a Passo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xs text-muted-foreground mb-3">
                        Estratégia: Use a 1ª equação para eliminar x das outras
                        duas.
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20 font-mono text-xs space-y-2">
                        <p className="font-bold">
                          1º: Das 3 equações, faça 2 com um menos:
                        </p>
                        <p>Eq2 - Eq1: (x-y+z) - (x+y+z) = 4-6</p>
                        <p>Resultado: -2y = -2 → y = 1</p>
                        <p className="mt-2 font-bold">
                          2º: Agora substitua y em outra:
                        </p>
                        <p>x + 1 + z = 6 → x + z = 5</p>
                        <p className="mt-2 font-bold">
                          3º: Continue a simplificar...
                        </p>
                        <p className="text-violet-600">
                          Resultado final: x=2, y=1, z=3
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Estratégia de Batalha",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-violet-500/10 p-3 rounded border-l-4 border-violet-500">
                        <p className="font-bold text-violet-700">
                          1️⃣ Escolha uma incógnita para eliminar
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Geralmente a que tem coeficiente 1 ou simétrico.
                        </p>
                      </div>
                      <div className="bg-indigo-500/10 p-3 rounded border-l-4 border-indigo-500">
                        <p className="font-bold text-indigo-700">
                          2️⃣ Use as 3 equações para fazer 2
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Subtraia ou some combinações para eliminar.
                        </p>
                      </div>
                      <div className="bg-violet-500/10 p-3 rounded border-l-4 border-violet-500">
                        <p className="font-bold text-violet-700">
                          3️⃣ Repita com as 2 equações (torna-se 2x2)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Agora é um sistema 2x2. Use adição ou substituição.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Sistemas Impossíveis ou Indeterminados",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="info" titulo="Análise de Soluções">
                      <p className="text-sm mb-2">
                        <strong>Uma solução:</strong> Sistema normal, planos se
                        cruzam em um ponto.
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Infinitas soluções:</strong> 0 = 0 (identidade),
                        planos são coincidentes.
                      </p>
                      <p className="text-sm">
                        <strong>Nenhuma solução:</strong> 0 = 5 (absurdo),
                        planos são paralelos.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
          corIndicador="bg-blue-600"
        />
          </section>




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Resolvendo (x+1)/3 = (2x-1)/5, o valor de x é:"
          alternativas={[
              { letra: "A", texto: "4", correta: false },
              { letra: "B", texto: "6", correta: false },
              { letra: "C", texto: "8", correta: true },
              { letra: "D", texto: "10", correta: false },
              { letra: "E", texto: "12", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Multiplicando cruzado: 5(x+1) = 3(2x-1) → 5x+5 = 6x-3 → 5+3 = 6x-5x → x = 8." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 7",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 7",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM7}
            titulo="QUIZ: Sistemas 3x3 & Avançado"
            numero={3}
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8 ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={8}
            titulo="Resolução Reversa e Verificação"
            descricao="Trabalhe de trás para frente: dado o resultado, é a solução certa?"
          variant="blue"
        />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Técnica de Prova: Substituição na Equação Original"
              description="A verificação não é luxo, é necessidade na CESGRANRIO."
          variant="blue"
        />

            <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
              <p>
                Você resolveu a equação e encontrou uma resposta. Mas e se houver um erro de sinal no meio do caminho?
                E se você tiver se enganado ao manipular as frações? A <strong>verificação (ou prova) é o seguro</strong>:
                você substitui o valor encontrado na equação original e confirma que a igualdade é verdadeira.
              </p>
              <p>
                Muitos estudantes acreditam que verificação é uma perda de tempo. Estatísticas reais de provas mostram o contrário:
                estudantes que verificam suas respostas aumentam taxa de acertos em até 15%. Na CESGRANRIO, não há "quase certo" —
                ou você acerta e ganha o ponto, ou erra e perde. A verificação de 30 segundos pode fazer a diferença entre passar e reprovar.
              </p>
              <p>
                O processo é simples: pegue o valor que você encontrou (ex.: x = 5) e substitua-o em todas as instâncias de x na
                <strong> equação original</strong> (não na versão modificada). Faça as contas. Se ambos os lados da equação forem iguais,
                sua resposta está correta. Se forem diferentes, há erro algum lugar — volte e procure.
              </p>
              <p>
                Também existe a <strong>resolução reversa (ou prova inversa)</strong>: dada uma resposta de múltipla escolha, você trabalha
                de trás para frente para confirmar. Isso é uma técnica de economia de tempo em provas: em vez de resolver a equação inteira,
                teste as 4 alternativas substituindo. A resposta correta satisfazará a equação original.
              </p>
              <p>
                Neste módulo, você aprenderá quando e como verificar, como trabalhar de trás para frente eficientemente, e como usar essa
                técnica para eliminar alternativas em questões de múltipla escolha. Vamos dominar essa arma poderosa?
              </p>

              <p>
                <strong>Técnica de Prova de Múltiplas Escolhas:</strong> A CESGRANRIO oferece 5 alternativas. Em vez de resolver a equação inteira do zero, você pode testar cada alternativa na equação original, partindo da que parece mais plausível. Se a equação é 2(x + 3) = 14 e as alternativas são (A) 1, (B) 2, (C) 3, (D) 4, (E) 5, você testa: "Se x = 4, então 2(4+3) = 2(7) = 14 ✓". Encontrou! Esta técnica economiza tempo, especialmente em provas com muitas questões. É particularmente útil quando a resolução algébrica é complexa (muitas frações, parênteses aninhados). Candidatos que dominam esta técnica conseguem resolver questões 40-50% mais rápido que aqueles que insistem em resolver algebricamente toda vez.
              </p>

              <p>
                <strong>Detecção de Erros Comuns na Verificação:</strong> Ao verificar, você frequentemente descobrirá onde errou. Se substituir x = 3 na equação original 2x + 5 = 11 e obter 11 ≠ 11, há erro. Trace para trás: em qual passo isso começou? Se você tinha 2x = 6 e concluiu x = 3, mas então 2(3) = 6 ✓, o erro foi DEPOIS. Talvez ao transpor o 5 inicial. Este diagnóstico é ouro puro — você identifica exatamente onde o erro mora e não comete novamente. Candidatos que fazem este diagnóstico sistematicamente aprendem mais rápido que aqueles que apenas decoram métodos.
              </p>

              <p>
                <strong>Casos Especiais na Verificação:</strong> Há equações degeneradas que geram armadilhas. Se resolve e obtém "0x = 0" (identidade), a equação é satisfeita por QUALQUER x — infinitas soluções. Se obtém "0x = 5" (contradição), não há solução. A verificação ajuda a reconhecer esses casos antes de marcar uma resposta incorreta. Além disto, em sistemas de equações, verificar significa substituir a solução (x, y) em AMBAS as equações originais, não apenas uma. Muitos candidatos verificam apenas a primeira e perdem a resposta correta.
              </p>

              <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mb-2">✅ Protocolo de Verificação</p>
                <ol className="text-sm space-y-1 text-foreground list-decimal list-inside">
                  <li>Encontre o valor (ex.: x = 3)</li>
                  <li>Substitua na equação <strong>original</strong> (não na modificada)</li>
                  <li>Calcule o lado esquerdo</li>
                  <li>Calcule o lado direito</li>
                  <li>Lado esquerdo = Lado direito? ✓ Se sim, correto! ✗ Se não, há erro</li>
                </ol>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Por que Verificar?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        <strong>Erros de cálculo acontecem</strong>. A
                        verificação leva 30 segundos e garante que sua resposta
                        está correta. Na CESGRANRIO, não há "meio certo": ou
                        acerta ou erra.
                      </p>
                      <AlertBox tipo="info" titulo="Estatística Real">
                        <p className="text-sm">
                          Estudantes que verificam aumentam sua taxa de acertos
                          em até 15%.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: O Teste Prático",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-700 mb-3">
                          Problema Resolvido: 2x + 3 = 11
                        </p>
                        <p className="text-sm mb-3">
                          Solução encontrada: x = 4
                        </p>
                        <p className="font-bold text-teal-700 mb-2">
                          Verificação:
                        </p>
                        <p className="font-mono text-sm">
                          2(4) + 3 = 8 + 3 = 11 ✓
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Ambos lados da equação são iguais. x = 4 está CORRETO.
                        </p>
                      </div>

                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 mb-3">
                          Contra-exemplo: Erro Detectado
                        </p>
                        <p className="text-sm mb-3">
                          Solução (errada) encontrada: x = 5
                        </p>
                        <p className="font-bold text-cyan-700 mb-2">
                          Verificação:
                        </p>
                        <p className="font-mono text-sm">
                          2(5) + 3 = 10 + 3 = 13 ≠ 11 ✗
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Lado esquerdo ≠ lado direito. Há erro. Refaça!
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Verificação Rápida",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-teal-500/10 p-3 rounded border-l-4 border-teal-500">
                        <p className="font-bold text-teal-700">
                          1️⃣ Substitua direto no original
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Não use equações intermediárias, volta ao texto.
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border-l-4 border-cyan-500">
                        <p className="font-bold text-cyan-700">
                          2️⃣ Calcule ambos os lados separadamente
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lado esquerdo = ? Lado direito = ? Iguais?
                        </p>
                      </div>
                      <div className="bg-teal-500/10 p-3 rounded border-l-4 border-teal-500">
                        <p className="font-bold text-teal-700">
                          3️⃣ Verifique antes de marcar
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se sobrar tempo: SEMPRE verifica.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Soluções Estranhas",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="warning" titulo="Atenção com Domínio">
                      <p className="text-sm mb-2">
                        Se a equação tiver{" "}
                        <strong>raízes ou denominadores</strong>, a solução pode
                        ser inválida:
                      </p>
                      <p className="text-xs mb-2 font-mono">
                        {"√(x-2)"} precisa x ≥ 2
                      </p>
                      <p className="text-sm">
                        Se x = 1 resolver a equação, mas x = 1 {"<"} 2, então x
                        = 1 é <strong>solução estranha</strong> (deve ser
                        descartada).
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
          corIndicador="bg-emerald-600"
        />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuShield className="w-6 h-6 text-cyan-500" />
                    <p className="font-bold text-center">
                      Se x = 3, é solução de 4x - 5 = 7?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleX className="w-6 h-6 text-rose-500" />
                    <p className="font-bold">Não ✗</p>
                    <p className="text-xs text-muted-foreground">
                      4(3) - 5 = 7 → 12 - 5 = 7 ✓ (sim!)
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuShield className="w-6 h-6 text-cyan-500" />
                    <p className="font-bold text-center">
                      Se x = -2, é solução de 3x + 6 = 0?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold">Sim ✓</p>
                    <p className="text-xs text-muted-foreground">
                      3(-2) + 6 = -6 + 6 = 0 ✓
                    </p>
                  </div>
                }
              />
            </div>
          </section>




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Resolvendo (x+1)/3 = (2x-1)/5, o valor de x é:"
          alternativas={[
              { letra: "A", texto: "4", correta: false },
              { letra: "B", texto: "6", correta: false },
              { letra: "C", texto: "8", correta: true },
              { letra: "D", texto: "10", correta: false },
              { letra: "E", texto: "12", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Multiplicando cruzado: 5(x+1) = 3(2x-1) → 5x+5 = 6x-3 → 5+3 = 6x-5x → x = 8." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 8",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 8",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM8}
            titulo="QUIZ: Resolução Reversa"
            numero={3}
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9 ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={9}
            titulo="Aplicações Petrobras & Contextos Reais"
            descricao="Onde as equações vivem: RNEST, RPBC, caldeiras, licitações, folha de pagamento."
          variant="blue"
        />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Problemas Contextualizados Petrobras"
              description="A CESGRANRIO adora disfarçar equações em situações reais da empresa."
          variant="blue"
        />

            <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
              <p>
                Até agora, você resolveu equações na forma <strong>pura</strong>: 2x + 5 = 13. Mas a CESGRANRIO raramente pergunta assim.
                Ela <strong>disfarça a equação em um contexto real</strong>: "Uma plataforma de petróleo produz x barris por dia. Outra produz
                o dobro. Juntas, produzem 9.000 barris por dia. Quantos barris cada uma produz?" Esse é o segredo: reconhecer a equação escondida
                no texto.
              </p>
              <p>
                Dados estatísticos reais mostram que <strong>80% das questões de equações do concurso vêm contextualizadas</strong>. Isso significa
                que sua habilidade de traduzir português para matemática (Módulo 2) é CRÍTICA. Se você não conseguir extrair a equação do texto,
                você não consegue resolver, mesmo dominando o Módulo 1.
              </p>
              <p>
                Os contextos mais comuns na Petrobras envolvem: <strong>produção de plataformas</strong> (barris, óleo, gás),
                <strong>folha de pagamento</strong> (salários, bônus, distribuição), <strong>custos operacionais</strong> (OPEX, investimento),
                <strong>distribuição de recursos</strong> (pessoal, equipamentos), <strong>cronogramas</strong> (tempo de operação, manutenção),
                <strong>segurança (HSE)</strong> (horas de trabalho, incidentes) e <strong>licitações</strong> (lance inicial, incremento).
              </p>
              <p>
                Neste módulo, você enfrentará 6-8 problemas autênticos Petrobras (contextos reais, nomes de plataformas, unidades técnicas).
                Cada problema é uma equação disfarçada. Você aprenderá a: (1) ler o contexto, (2) identificar o que é conhecido e desconhecido,
                (3) extrair a equação, (4) resolver, (5) responder a pergunta original (não apenas o valor de x).
              </p>
              <p>
                Atenção especial: algumas questões têm <strong>múltiplas perguntas encadeadas</strong> (encontre x, depois use x para encontrar y).
                A lógica é sequencial: se você errar a primeira, erra a segunda automaticamente. Sempre verifique o resultado contra o contexto:
                "Isso faz sentido no mundo real?"
              </p>

              <p>
                <strong>Padrões Recorrentes de Contextos Petrobras:</strong> A CESGRANRIO usa certos padrões repetidamente. (1) <strong>Sistemas de Produção:</strong> "Plataforma A produz x barris/dia, Plataforma B produz 2x. Juntas devem atingir meta de 45.000 b/dia." (2) <strong>Distribuição de Pessoal:</strong> "Team X tem y operadores, Team Y tem 1.5y. Total de 300 operadores." (3) <strong>Custos Compartilhados:</strong> "Projeto custa R$ Z total. Departamento X paga 40%, Departamento Y paga resto." (4) <strong>Tempo de Operação:</strong> "Turno A dura x horas, Turno B dura x+2 horas. 3 turnos completos por dia = 24h." Candidatos que memorizam estes padrões conseguem reconhecer a equação em segundos, sem reler o texto múltiplas vezes.
              </p>

              <p>
                <strong>Validação Realística da Resposta:</strong> Após resolver, pergunte-se: a resposta faz sentido? Se x = 200.000 barris e a pergunta era "quantas horas de produção", certamente está errado (unidade e magnitude inconsistentes). Se x = -500 litros, impossível (quantidade negativa). Se x = 0,0003 pessoas, improvável (não existe fração de pessoa em contextos discretos). Esta validação elimina respostas absurdas e frequentemente revela erros algébricos antes de entregar a resposta. Profissionais experientes em Petrobras fazem esta checagem automaticamente — você também deve desenvolver este hábito.
              </p>

              <p>
                <strong>Integração de Múltiplos Módulos:</strong> Problemas contextualizados Petrobras integram frequentemente conceitos de vários módulos. Um problema pode começar com tradução (M2), exigir resolução com frações (M3), terminar em um sistema (M4), e requerer verificação (M8). Candidatos que dominam apenas M1 mas falham em M2-M8 não conseguem resolver estes problemas. Portanto, o sucesso em M9 é um indicador de domínio verdadeiro da aula inteira.
              </p>

              <div className="bg-rose-500/10 border-l-4 border-rose-500 p-5 rounded-r-xl mt-6">
                <p className="font-bold text-rose-600 dark:text-rose-400 text-sm mb-2">🏭 Protocolo: Problema Contextualizado</p>
                <ol className="text-sm space-y-1 text-foreground list-decimal list-inside">
                  <li><strong>Leia cuidadosamente</strong> — sublinhe os números e relações</li>
                  <li><strong>Defina a incógnita:</strong> "Que x preciso encontrar?"</li>
                  <li><strong>Extraia a equação</strong> do texto (use Módulo 2)</li>
                  <li><strong>Resolva</strong> a equação (Módulos 1-8)</li>
                  <li><strong>Responda a pergunta original</strong> (não apenas "x = ...")</li>
                  <li><strong>Verifique:</strong> "A resposta faz sentido?" (valores negativos? valores gigantescos?)</li>
                </ol>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Problemas Contextualizados",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        A Petrobras não pergunta "Resolva 3x + 5 = 20". Ela diz
                        <strong>
                          {" "}
                          "Uma plataforma produz x barris. Outra produz o dobro.
                          Juntas fazem 9.000. Quantos cada uma faz?"
                        </strong>
                        . O contexto esconde a equação.
                      </p>
                      <AlertBox tipo="info" titulo="Realidade Cesgranrio">
                        <p className="text-sm">
                          80% das questões de equações NO CONCURSO REAL vêm
                          assim: disfarçadas em situações do dia a dia da
                          empresa.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Casos Reais",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                        <p className="font-bold text-orange-700 mb-2">
                          Caso 1: Horas de Trabalho (RNEST - Recife)
                        </p>
                        <p className="text-sm mb-2">
                          Um técnico trabalhou x horas em manutenção (R$ 50/h) e
                          (x+4) horas em inspeção (R$ 60/h). Ganhou R$ 700 no
                          total. Quantas horas de manutenção?
                        </p>
                        <p className="font-mono text-xs">
                          50x + 60(x+4) = 700 → 50x + 60x + 240 = 700 → 110x =
                          460 → x ≈ 4,18h
                        </p>
                      </div>

                      <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                        <p className="font-bold text-red-700 mb-2">
                          Caso 2: Produção de Barrís (RPBC - Paulínia)
                        </p>
                        <p className="text-sm mb-2">
                          Plataforma A produz 2.500 b/dia. Plataforma B produz
                          1.5x essa quantidade. Juntas devem produzir 18.000
                          barris. Qual deve ser o fator multiplicador x?
                        </p>
                        <p className="font-mono text-xs">
                          2500x + 1.5(2500x) = 18000 → 4000x = 18000 → x = 4,5
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Interpretação do Contexto",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-orange-500/10 p-3 rounded border-l-4 border-orange-500">
                        <p className="font-bold text-orange-700">
                          1️⃣ Destaque as VARIÁVEIS
                        </p>
                        <p className="text-xs text-muted-foreground">
                          "x horas", "y barris", "z salários". Sublinha tudo.
                        </p>
                      </div>
                      <div className="bg-red-500/10 p-3 rounded border-l-4 border-red-500">
                        <p className="font-bold text-red-700">
                          2️⃣ Encontre as RELACIONS
                        </p>
                        <p className="text-xs text-muted-foreground">
                          "o dobro", "3 vezes menor", "somando todos".
                        </p>
                      </div>
                      <div className="bg-orange-500/10 p-3 rounded border-l-4 border-orange-500">
                        <p className="font-bold text-orange-700">
                          3️⃣ Procure o RESULTADO FINAL
                        </p>
                        <p className="text-xs text-muted-foreground">
                          "Ficou em", "Totalizou", "Somam". Ali fica o "=".
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Unidades e Escalas",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="warning" titulo="Atenção com Unidades">
                      <p className="text-sm mb-2">
                        <strong>Horas e minutos:</strong> Converta para mesma
                        unidade. 1h30min = 1,5h ou 90 minutos.
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Escalas de produção:</strong> 1.000 barris =
                        1000, não 1k (a menos que o enunciado defina).
                      </p>
                      <p className="text-sm">
                        <strong>Taxas:</strong> R$ 50/h é diferente de R$ 50
                        total. Cuidado!
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
          corIndicador="bg-rose-600"
        />

            <CardCarousel
              titulo="Casos Petrobras Clássicos"
              cards={[
                {
                  titulo: "Distribuição Proporcional",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Orçamento de R$ 50.000 dividido entre 3 unidades em
                        proporção 1:2:2. Quanto cada uma recebe?
                      </p>
                      <p className="font-mono text-xs">
                        1x + 2x + 2x = 50000 → x = 12500
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Análise de Folha de Pagamento",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Técnico ganha S. Com desconto INSS de 10%, fica com R$
                        3.600. Qual era o salário bruto?
                      </p>
                      <p className="font-mono text-xs">
                        0.90S = 3600 → S = 4000
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Licitação com Descontos",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Fornecedor A oferece 15% de desconto. Fornecedor B
                        oferece R$ 10.000 a menos. Se igual, qual o preço
                        original?
                      </p>
                      <p className="font-mono text-xs">
                        0.85P = P - 10000 → 0.15P = 10000 → P = 66666,67
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Modelagem Linear: Funções Afim em Negócios"
            functions={[
              {
                id: "func1",
                label: "50 + 10x",
                color: "#3b82f6",
                fn: (x) => 50 + 10 * x,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "100 + 5x",
                color: "#ef4444",
                fn: (x) => 100 + 5 * x,
                strokeWidth: 2,
              },
            ]}
            xMin={0}
            xMax={10}
            yMin={40}
            yMax={200}
            points={250}
          />




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Resolvendo (x+1)/3 = (2x-1)/5, o valor de x é:"
          alternativas={[
              { letra: "A", texto: "4", correta: false },
              { letra: "B", texto: "6", correta: false },
              { letra: "C", texto: "8", correta: true },
              { letra: "D", texto: "10", correta: false },
              { letra: "E", texto: "12", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Multiplicando cruzado: 5(x+1) = 3(2x-1) → 5x+5 = 6x-3 → 5+3 = 6x-5x → x = 8." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 9",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 9",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                    <QuizInterativo
            questoes={quizM9}
            titulo="QUIZ: Aplicações Petrobras"
            numero={3}
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          variant="blue"
        />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10 ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={10}
            titulo="Simulado Mestre — Elite Masterclass"
            descricao="Reúna TUDO: balança, sistemas, inequações, contextos. 90+ = domínio total."
          variant="blue"
        />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre das Equações!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou equações de 1º grau: balança, frações, sistemas,
                inequações, contextos Petrobras. Está pronto para Equações de 2º
                Grau, Funções e além.
              </p>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <LuGraduationCap className="w-4 h-4" />
                <span>Próximo: Equações de 2º Grau</span>
              </div>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-8">
                <ModuleSectionHeader
                  index={1}
                  title="Avaliação Final Compreensiva"
                  description="Este simulado cobre TODOS os tópicos: M1 até M9. Mínimo 75% para aprovação."
          variant="blue"
        />

                <div className="space-y-6 text-base leading-relaxed text-foreground prose-invert">
                  <p>
                    Você chegou ao final. Este não é apenas mais um módulo — é uma <strong>avaliação compreensiva</strong> que integra
                    <strong> TUDO</strong> que aprendeu: a balança (M1), tradução português-matemática (M2), frações (M3), sistemas 2×2 (M4),
                    inequações (M6), sistemas 3×3 (M7), verificação (M8) e contextos Petrobras (M9). Não há novos conceitos aqui. Há consolidação.
                  </p>
                  <p>
                    O simulado contém <strong>8 questões diversas</strong>, cada uma testando múltiplos módulos simultâneos. Uma questão pode começar
                    em um contexto Petrobras (M9), exigir tradução (M2), levar a um sistema (M4), requerer verificação (M8). Essa integração é
                    exatamente como aparecem nos concursos reais. A Petrobras não separa os conteúdos — ela os mistura.
                  </p>
                  <p>
                    <strong>Mínimo 75% para aprovação</strong>. Isso significa acertar 6 de 8 questões. Abaixo de 75%, você será direcionado para
                    as sessões de Consolidação dos módulos onde errou — um feedback diagnóstico ajuda a identificar exatamente onde reforçar.
                    Acima de 90%? Você dominou Equações de 1º Grau e está pronto para Equações de 2º Grau.
                  </p>
                  <p>
                    A estrutura é: <strong>sem calculadora, sem consulta, tempo contado</strong>. Isso simula as condições reais do concurso.
                    Se você conseguir acertar 75%+ nessas condições, você conseguirá na prova. Se tiver dificuldades aqui, use os feedbacks e
                    revise antes da prova real.
                  </p>
                  <p>
                    Uma dica final: antes de começar, respire. Você treinou 9 módulos completos. Você sabe resolver. A questão agora é <strong>confiança
                    e calma</strong>. Leia cada questão duas vezes, identifique o padrão (é balança? é tradução? é sistema?), resolva passo a passo,
                    verifique. Vamos!
                  </p>

                  <p>
                    <strong>Estratégia de Tempo no Simulado:</strong> Com 45 minutos para 8 questões, você tem aproximadamente 5-6 minutos por questão. Algumas questões podem ser resolvidas em 2-3 minutos (equações diretas), deixando tempo para as complexas (15-20 minutos). Dica: comece pelas questões que parecem mais fáceis, construindo confiança. Deixe para o fim as que parecem mais difíceis. Se ficar travado em uma questão por mais de 8 minutos, pule e volte depois — é contraproducente gastar tempo demais em um problema único quando há outros mais rápidos.
                  </p>

                  <p>
                    <strong>Diagnóstico pós-Simulado:</strong> Após terminar, analise seus erros: em qual módulo (M1-M9) cada erro ocorreu? Se errou 3 de 8 questões todas em M2 (tradução), você precisa reforçar M2 antes de tentar novamente. Se erros estão espalhados (um em M1, um em M3, outro em M7), indica que domina os conceitos mas comete erros aritméticos — neste caso, trabalhe lentidão e atenção, não reestude teoria. O feedback diagnóstico é mais valioso que a nota final.
                  </p>

                  <p>
                    <strong>O Que Significa 75%+ de Acerto:</strong> Acertar 6 de 8 questões (75%) significa que você está pronto para a prova real. Você dominou a aula. Acima de 80% (6,4 questões) — praticamente pronto, com margem de segurança pequeno. Acima de 90% (7,2 questões) — excelente domínio, pode confiar. Abaixo de 75% — ainda há gaps. Releia os módulos onde errou, faça exercícios adicionais, e tente novamente. O simulado é para diagnóstico e aprendizado, não para classificação — use-o a seu favor.
                  </p>

                  <div className="bg-violet-500/10 border-l-4 border-violet-500 p-5 rounded-r-xl mt-6">
                    <p className="font-bold text-violet-600 dark:text-violet-400 text-sm mb-2">👑 Simulado Mestre: 5 Passos</p>
                    <ol className="text-sm space-y-1 text-foreground list-decimal list-inside">
                      <li><strong>Leia a questão 2x</strong> — primeira para entender, segunda para sublinhar números</li>
                      <li><strong>Identifique o padrão</strong> — qual módulo (M1-M9) é o núcleo?</li>
                      <li><strong>Resolva passo a passo</strong> — sem pular etapas, mesmo que pareça óbvio</li>
                      <li><strong>Verifique sua resposta</strong> — substitua na equação original ou no contexto</li>
                      <li><strong>Confira a lógica</strong> — a resposta faz sentido? (negativos incomuns? gigantescos?)</li>
                    </ol>
                  </div>
                </div>

                <AlertBox tipo="warning" titulo="Instruções Importantes">
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>
                      Tempo estimado: 45 minutos para 8 questões diversas.
                    </li>
                    <li>Você pode revisar cada resposta antes de enviar.</li>
                    <li>Ao atingir 75%+, você completa a aula. Parabéns!</li>
                    <li>
                      Abaixo de 75%: estude os módulos anteriores novamente.
                    </li>
                  </ul>
                </AlertBox>
              </section>




          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Resolvendo (x+1)/3 = (2x-1)/5, o valor de x é:"
          alternativas={[
              { letra: "A", texto: "4", correta: false },
              { letra: "B", texto: "6", correta: false },
              { letra: "C", texto: "8", correta: true },
              { letra: "D", texto: "10", correta: false },
              { letra: "E", texto: "12", correta: false }
            ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Multiplicando cruzado: 5(x+1) = 3(2x-1) → 5x+5 = 6x-3 → 5+3 = 6x-5x → x = 8." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 10",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Equações de 1º Grau",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 10",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          variant="blue"
        />

                        <QuizInterativo
                questoes={quizFinal}
                titulo="QUIZ: Simulado Mestre"
                icone="🏆"
                numero={3}
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
          variant="blue"
        />
            </section>
          )}

          <div className="space-y-8 bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold">Resumo Executivo</h3>
            <div className="space-y-4">
              <div className="bg-slate-500/10 p-6 rounded-2xl border border-slate-500/20">
                <h4 className="font-bold mb-3">Os 10 Pilares Dominados</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>
                    <strong>Princípio da Balança:</strong> Operação inversa é
                    LEI.
                  </li>
                  <li>
                    <strong>Tradução Português-Matemática:</strong> Dicionário
                    de palavras-chave memorizado.
                  </li>
                  <li>
                    <strong>Frações:</strong> MMC elimina tudo em um golpe.
                  </li>
                  <li>
                    <strong>Sistemas 2x2:</strong> Adição e substituição
                    dominadas.
                  </li>
                  <li>
                    <strong>Checkpoint Parcial:</strong> Você já domina 50%
                    completo.
                  </li>
                  <li>
                    <strong>Inequações:</strong> Sinal inverte ao dividir por
                    negativo.
                  </li>
                  <li>
                    <strong>Sistemas 3x3:</strong> Eliminação progressiva
                    dominada.
                  </li>
                  <li>
                    <strong>Verificação:</strong> Substitua na original para
                    garantir.
                  </li>
                  <li>
                    <strong>Contextos Petrobras:</strong> Problema textual vira
                    equação.
                  </li>
                  <li>
                    <strong>Síntese Final:</strong> Você é MESTRE em equações de
                    1º grau!
                  </li>
                </ol>
              </div>

              <ModuleSummaryCarouselNew
                images={[
                  {
                    title: "Mapa Completo de Equações 1º Grau",
                    type: "Infográfico",
                    placeholderColor: "bg-slate-100 dark:bg-slate-900/30",
                    imageUrl: "/temp-img.png", // PROMPT: Infográfico estilo dark premium mostrando os 10 módulos em sequência progressiva. Centro: "Equações de 1º Grau". Ramos periféricos para cada módulo com ícones temáticos (balança, sistema, inequação, etc). Cores Petrobras (azul/verde/ciano). Estilo técnico industrial.
                  },
                ]}
                moduloNome="Módulo 10 - Síntese"
                tituloAula="Equações de 1º Grau"
                materia="Matemática"
              />
            </div>
          </div>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
