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
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { LuBookOpen } from "react-icons/lu";
import {
  QUIZ_M1_RAZAO,
  QUIZ_M2_PROPORCAO,
  QUIZ_M3_REGRA3,
  QUIZ_M4_DIVISAO,
  QUIZ_M10_SIMULADO_FINAL,
} from "./data/razao-proporcao-quizzes";

// Quizzes importados de ./data/razao-proporcao-quizzes.ts
// (34 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaRazaoProporcao({
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

  const [quizConceitos] = useState(() => getRandomQuestions(QUIZ_M1_RAZAO, 6));
  const [quizGrandezas] = useState(() =>
    getRandomQuestions(QUIZ_M2_PROPORCAO, 6),
  );
  const [quizRegra3S] = useState(() => getRandomQuestions(QUIZ_M3_REGRA3, 6));
  const [quizRegra3C] = useState(() => getRandomQuestions(QUIZ_M4_DIVISAO, 5));
  const [quizFinal] = useState(() =>
    getRandomQuestions(QUIZ_M10_SIMULADO_FINAL, 5),
  );

  const isModuleUnlocked = (index: number) => {
    return true; // DESBLOQUEADO PARA REVISÃO DO USUÁRIO
  };

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
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos de Razão" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Grandezas e Escalas" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Regra de Três Simples" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Regra de Três Composta" },
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
      {/* ═══ MÓDULO 1: CONCEITOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Conceitos de Razão e Proporção"
          descricao="A base para entender escalas, misturas e produtividade operacional."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é Razão e Proporção?"
              description="Simplificando comparações entre duas grandezas operacionais."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Conceitos Fundamentais"
              icone="⚖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Razão: A Comparação",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Uma <strong>razão</strong> é a comparação geométrica
                        entre dois números, feita através de uma divisão. Lemos
                        "a está para b" e representamos como <em>a/b</em> ou{" "}
                        <em>a:b</em>, onde <strong>b ≠ 0</strong>.
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                          <li>
                            O número de cima (a) é o{" "}
                            <strong>antecedente</strong>.
                          </li>
                          <li>
                            O número de baixo (b) é o{" "}
                            <strong>consequente</strong>.
                          </li>
                        </ul>
                      </div>
                      <AlertBox tipo="info" titulo="Uso Prático na Petrobras">
                        Razões são essenciais no dia a dia: a{" "}
                        <strong>densidade</strong> (Massa/Volume), a escala de
                        um projeto na refinaria (Desenho/Real), e o rendimento
                        de um motor (Energia Útil / Energia Total).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Proporção: A Igualdade",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Enquanto a razão compara dois números, a{" "}
                        <strong>proporção</strong> afirma que duas (ou mais)
                        razões são iguais: <strong>a/b = c/d</strong>. Le-se: "a
                        está para b <em>assim como</em> c está para d".
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center shadow-inner">
                        <p className="font-bold text-indigo-800 dark:text-indigo-300">
                          Propriedade Fundamental: a × d = b × c
                        </p>
                        <p className="text-xs mt-1">
                          "O produto dos extremos é igual ao produto dos meios"
                          (Multiplicar em X).
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-xl border border-border">
                        <p className="font-bold text-sm mb-2">
                          Constante de Proporcionalidade (K)
                        </p>
                        <p className="text-sm">
                          Se várias grandezas são proporcionais (A/x = B/y =
                          C/z), dizemos que todas elas são iguais a uma mesma
                          constante <strong>K</strong>. Esse conceito resolve
                          90% das questões de divisão proporcional da
                          CESGRANRIO.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Escalas (Atenção Máxima!)",
                  icone: "🗺️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Escala é uma razão específica:{" "}
                        <strong>Tamanho no Desenho / Tamanho Real</strong>.
                      </p>
                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha Clássica da CESGRANRIO"
                      >
                        Você SÓ PODE aplicar a escala se as duas medidas
                        estiverem na <strong>MESMA UNIDADE</strong> (ambas em cm
                        ou ambas em km). Nunca divida cm por km diretamente!
                      </AlertBox>
                      <p className="text-sm italic">
                        Exemplo: Se a escala é 1:200, significa que 1cm no mapa
                        representa 200cm na vida real (ou seja, 2 metros reais).
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceitos}
              titulo="Quiz - Conceitos de Razão"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: GRANDEZAS ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Grandezas e Proporcionalidade"
          descricao="Saiba quando uma variável ajuda ou atrapalha a outra."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Direta vs Inversa"
              description="Grandezas: Quem anda junto e quem anda separado."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Tipos de Grandezas"
              icone="⚖️"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Grandezas Diretamente Proporcionais (GDP)",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Duas grandezas são DIRETAmente proporcionais quando:{" "}
                        <strong>se uma aumenta, a outra aumenta</strong> na
                        mesmíssima proporção. Se uma dobra, a outra dobra.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-sm mb-1">
                          A Regra da Divisão:
                        </p>
                        <p className="text-sm">
                          A razão (divisão) entre duas GDP é sempre constante:{" "}
                          <strong>A / B = K</strong>.
                        </p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-border">
                        <p className="text-sm font-bold">
                          🛠️ Exemplo Petrobras:
                        </p>
                        <p className="text-sm">
                          <strong>
                            Tempo de bomba ligada vs Volume de óleo transferido.
                          </strong>{" "}
                          Mais tempo ligada = Mais volume transferido. Dobrou o
                          tempo? Dobrou o volume.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Grandezas Inversamente Proporcionais (GIP)",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        São INVERSAmente proporcionais quando:{" "}
                        <strong>se uma aumenta, a outra DIMINUI</strong> na
                        mesma proporção. Se uma dobra, a outra cai pela metade.
                      </p>
                      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                        <p className="font-bold text-sm mb-1">
                          A Regra da Multiplicação:
                        </p>
                        <p className="text-sm">
                          O produto (multiplicação) entre duas GIP é sempre
                          constante: <strong>A × B = K</strong>.
                        </p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-border">
                        <p className="text-sm font-bold">
                          🛠️ Exemplo Petrobras:
                        </p>
                        <p className="text-sm">
                          <strong>
                            Vazão do encanamento vs Tempo para encher o tanque.
                          </strong>{" "}
                          Maior a vazão = Menor o tempo necessário. Dobrou a
                          vazão? O tempo cai pela metade.
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
              questoes={quizGrandezas}
              titulo="Quiz - Grandezas e Escalas"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: REGRA DE 3 SIMPLES ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Regra de Três Simples"
          descricao="A ferramenta mais utilizada no dia a dia do técnico."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Método Definitivo"
              description="Esqueça a confusão. Siga um processo metódico."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Passo a Passo (Regra de 3 Simples)"
              icone="🎯"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Método de 3 Passos",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Para resolver qualquer Regra de 3 Simples (que tem
                        apenas <strong>duas</strong> grandezas diferentes), siga
                        isso:
                      </p>
                      <ol className="list-decimal pl-5 space-y-3 text-sm">
                        <li>
                          <strong>Montar as Colunas:</strong> Escreva as
                          grandezas (ex: "Trabalhadores", "Dias") lado a lado.
                          Coloque os números do problema abaixo de cada uma.
                        </li>
                        <li>
                          <strong>Análise (A Pergunta Crucial):</strong> Compare
                          as colunas e pergunte:{" "}
                          <em>
                            "Se eu aumentar isso, a outra grandeza aumenta ou
                            diminui?"
                          </em>
                        </li>
                        <li>
                          <strong>Resolver:</strong>
                          <br />- Se forem Diretas (↑↑): Multiplique cruzado (em
                          X).
                          <br />- Se forem Inversas (↑↓): Multiplique reto (em
                          linha).
                        </li>
                      </ol>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Detalhado",
                  icone: "🛠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        <em>
                          "Uma bomba preenche um tanque em 6 horas com vazão de
                          20 L/min. Quanto tempo levaria se a vazão fosse de 30
                          L/min?"
                        </em>
                      </p>
                      <div className="grid grid-cols-2 text-center text-sm font-bold border border-border rounded-lg overflow-hidden">
                        <div className="bg-card p-2 border-b border-r border-border">
                          Vazão (L/min)
                        </div>
                        <div className="bg-card p-2 border-b border-border">
                          Tempo (Horas)
                        </div>
                        <div className="p-2 border-r border-border">20</div>
                        <div className="p-2">6</div>
                        <div className="p-2 border-r border-border text-amber-600">
                          30 ↑
                        </div>
                        <div className="p-2 text-blue-600">x ↓</div>
                      </div>
                      <p className="text-sm">
                        <strong>Análise:</strong> Aumentei a vazão. O tempo
                        necessário vai diminuir. São Inversas!
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center shadow-inner">
                        <p className="text-sm font-bold font-mono text-amber-800 dark:text-amber-300">
                          Multiplica reto: 30 × x = 20 × 6<br />
                          30x = 120 → x = 4 horas
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizRegra3S}
              titulo="Quiz - Regra de Três Simples"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: REGRA DE 3 COMPOSTA ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Regra de Três Composta"
          descricao="Lidando com múltiplas variáveis simultaneamente."
          gradiente="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Método das Flechas"
              description="Quando você tem 3 ou mais variáveis (ex: Tratores, Horas/Dia, Metros Perfurados)."
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Resolvendo a Composta"
              icone="🎯"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Segredo da Coluna do X",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        O processo começa igual, montando as colunas. Mas a
                        análise agora tem regras restritas:
                      </p>
                      <ol className="list-decimal pl-5 space-y-3 text-sm">
                        <li>
                          Identifique a coluna da incógnita (x) e{" "}
                          <strong>coloque uma seta nela</strong> (sempre para
                          baixo ↓).
                        </li>
                        <li>
                          Compare TODAS as outras colunas{" "}
                          <strong>SEMPRE contra a coluna do X</strong>. Ignore
                          as outras colunas temporariamente.
                        </li>
                        <li>
                          Se a relação for Direta, coloque a seta na mesma
                          direção da do X (↓). Se for Inversa, seta contrária
                          (↑).
                        </li>
                        <li>
                          Monte a equação: Deixe a fração do X isolada. Do outro
                          lado da igualdade, multiplique todas as outras
                          frações.
                          <br />
                          <strong className="text-rose-600 dark:text-rose-400">
                            Atenção:
                          </strong>{" "}
                          Frações com a seta contrária ao X devem ser{" "}
                          <strong>INVERTIDAS</strong> antes de multiplicar!
                        </li>
                      </ol>
                    </div>
                  ),
                },
                {
                  titulo: "A Macete Final: 'Faz / Sobra'",
                  icone: "🧙‍♂️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Em questões clássicas da CESGRANRIO (Máquinas fazendo um
                        Trabalho), você pode pular a análise das flechas usando
                        o macete CAUSA x EFEITO.
                      </p>
                      <div className="p-4 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20 shadow-inner overflow-x-auto">
                        <p className="text-center font-bold text-sm mb-2 text-fuchsia-800 dark:text-fuchsia-300">
                          ( CAUSAS 1 ) / ( EFEITO 1 ) = ( CAUSAS 2 ) / ( EFEITO
                          2 )
                        </p>
                      </div>
                      <div className="bg-card p-3 rounded-lg border border-border text-sm">
                        <p>
                          - <strong>Causas:</strong> Quem e O que (ex: Máquinas,
                          Operários, Horas/Dia, Dias, Eficiência).
                        </p>
                        <p>
                          - <strong>Efeito:</strong> O Produto Final / O
                          Problema (ex: Metros Perfurados, Tanques Cheios,
                          Cadeiras Produzidas).
                        </p>
                        <p className="mt-2 text-muted-foreground italic">
                          Basta colocar tudo que é causa em cima
                          (multiplicando), e o efeito em baixo. Não precisa
                          analisar direção nenhuma, é só plugar e calcular.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizRegra3C}
              titulo="Quiz - Regra de Três Composta"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: DESAFIO FINAL ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final: Produtividade e Cálculo"
          descricao="Problemas mistos de concursos anteriores."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Razão e Proporção"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  🎓
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  CERTIFICADO DE CONCLUSAO
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Você dominou Razão e Proporção! Este é um dos temas mais
                  recorrentes na prova da Petrobras.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
