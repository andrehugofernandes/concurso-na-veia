"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  QuizQuestion,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  FlipCard,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { LuBookOpen, LuMusic } from "react-icons/lu";
import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_OPERACOES,
  QUIZ_M3_NUMERICOS,
  QUIZ_M4_VENN,
  QUIZ_M5_FINAL,
  QUIZ_M6_INCLUSAO_EXCLUSAO,
  QUIZ_M7_NUMERICOS_BASICOS,
  QUIZ_M8_IRRAC_REAIS,
  QUIZ_M9_DE_MORGAN,
  QUIZ_M10_SIMULADO,
} from "./data/conjuntos-quizzes";

// Quizzes agora importados de ./data/conjuntos-quizzes.ts
// (35 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaConjuntos({
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

  const [quizFundamentos] = useState(() =>
    getRandomQuestions(QUIZ_M1_CONCEITOS, 6),
  );
  const [quizOperacoes] = useState(() =>
    getRandomQuestions(QUIZ_M2_OPERACOES, 6),
  );
  const [quizVenn] = useState(() => getRandomQuestions(QUIZ_M4_VENN, 6));
  const [quizNumericos] = useState(() =>
    getRandomQuestions(QUIZ_M3_NUMERICOS, 6),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 6));
  const [quizInclusaoExclusao] = useState(() =>
    getRandomQuestions(QUIZ_M6_INCLUSAO_EXCLUSAO, 6),
  );
  const [quizNumericosBasicos] = useState(() =>
    getRandomQuestions(QUIZ_M7_NUMERICOS_BASICOS, 6),
  );
  const [quizIrracReais] = useState(() =>
    getRandomQuestions(QUIZ_M8_IRRAC_REAIS, 6),
  );
  const [quizDeMorgan] = useState(() =>
    getRandomQuestions(QUIZ_M9_DE_MORGAN, 6),
  );
  const [quizSimulado] = useState(() =>
    getRandomQuestions(QUIZ_M10_SIMULADO, 6),
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
        "modulo-6",
        "modulo-7",
        "modulo-8",
        "modulo-9",
        "modulo-10",
      ].findIndex((m) => m === moduleId);
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
    { id: "modulo-1", label: "Módulo 1", title: "Fundamentos" },
    { id: "modulo-2", label: "Módulo 2", title: "Operações" },
    { id: "modulo-3", label: "Módulo 3", title: "Diagramas de Venn" },
    { id: "modulo-4", label: "Módulo 4", title: "Conj. Numéricos" },
    { id: "modulo-5", label: "Módulo 5", title: "Subconjuntos" },
    { id: "modulo-6", label: "Módulo 6", title: "Inclusão-Exclusão" },
    { id: "modulo-7", label: "Módulo 7", title: "ℕ, ℤ, ℚ" },
    { id: "modulo-8", label: "Módulo 8", title: "Irracionais e ℝ" },
    { id: "modulo-9", label: "Módulo 9", title: "De Morgan" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
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
      {/* ═══ MÓDULO 1: FUNDAMENTOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Conjuntos"
          descricao="Domine os conceitos fundamentais: notação, pertinência, subconjuntos e propriedades."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é um Conjunto?"
              description="A pedra fundamental da Matemática para concursos."
              variant="indigo"
              className="mb-6"
            />
            {/* ACORDEON 1: DEFINIÇÃO DE CONJUNTO */}
            <ContentAccordion
              titulo="O que é um Conjunto?"
              icone="💡"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição Intuitiva",
                  icone: "📐",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Na Matemática, <strong>conjunto</strong> é um conceito
                        primitivo — não possui uma definição formal estrita, mas
                        é entendido como uma{" "}
                        <strong>coleção de elementos bem definidos</strong>. Se
                        você pode dizer com certeza absoluta se um elemento
                        pertence ou não ao grupo, então é um conjunto.
                      </p>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        Pense nos conjuntos como as{" "}
                        <strong>equipes ou ativos</strong> da empresa.
                        <br />
                        <br />✅{" "}
                        <em>
                          &quot;Conjunto de todas as plataformas na Bacia de
                          Campos&quot;
                        </em>{" "}
                        — É um conjunto! (Podemos listar todas com clareza).
                        <br />❌{" "}
                        <em>
                          &quot;Conjunto dos melhores funcionários da
                          refinaria&quot;
                        </em>{" "}
                        — NÃO é um conjunto matemático! (&quot;Melhores&quot; é
                        subjetivo).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            {/* ACORDEON 2: FORMAS DE REPRESENTAÇÃO */}
            <ContentAccordion
              titulo="Três Formas de Representação"
              icone="📝"
              corIndicador="bg-blue-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "1. Por Extensão",
                  icone: "📋",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        É a forma explícita de descrever. Todos os elementos são{" "}
                        <strong>listados um a um</strong> entre chaves,
                        separados por vírgula.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 dark:text-blue-400">
                          Exemplo: P = {"{2, 4, 6, 8, 10}"}
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Atenção (CESGRANRIO)">
                        Em conjuntos finitos extensos, usa-se reticências (...).
                        Ex: N = {"{0, 1, 2, ..., 100}"}. Em conjuntos infinitos:
                        Z = {"{..., -2, -1, 0, 1, ...}"}.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "2. Por Compreensão",
                  icone: "⚙️",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        A forma algorítmica. O conjunto é definido por uma{" "}
                        <strong>propriedade ou regra</strong> que todos e apenas
                        os seus elementos precisam satisfazer.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center font-mono">
                        <p className="text-sm">A = {"{x | x é vogal}"}</p>
                        <p className="text-sm mt-2">
                          B = {"{x ∈ ℕ | x é par e x < 10}"}
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Macete">
                        Lê-se a barra reta (|) como &quot;tal que&quot;.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "3. Diagrama de Venn",
                  icone: "⭕",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        A representação visual através de curvas fechadas planas
                        (círculos ou ovais). É a ferramenta suprema para
                        resolver problemas práticos e salvar tempo nas provas.
                      </p>
                      <AlertBox tipo="success" titulo="Dica Ouro">
                        Na CESGRANRIO, quase todas as questões cabeludas de
                        misturas e interseções são resolvidas desenhando os
                        círculos e resolvendo de dentro (A ∩ B) para fora.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            {/* ACORDEON 3: PERTINÊNCIA */}
            <ContentAccordion
              titulo="Relação de Pertinência (∈ e ∉)"
              icone="🔑"
              corIndicador="bg-rose-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "O Pertence",
                  icone: "📌",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        A relação de pertinência é a cola que liga
                        obrigatoriamente um{" "}
                        <strong>ELEMENTO solto a um CONJUNTO grande</strong>.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center mt-4">
                        <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                          <p className="text-3xl font-black text-indigo-700 dark:text-indigo-400">
                            ∈
                          </p>
                          <p className="font-bold mt-2">PERTENCE</p>
                          <p className="text-xs">
                            x ∈ A (Elemento isolado no Conjunto)
                          </p>
                        </div>
                        <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                          <p className="text-3xl font-black text-rose-700 dark:text-rose-400">
                            ∉
                          </p>
                          <p className="font-bold mt-2">NÃO PERTENCE</p>
                          <p className="text-xs">
                            y ∉ A (O Elemento não está lá)
                          </p>
                        </div>
                      </div>
                      <AlertBox
                        tipo="warning"
                        titulo="⚠️ Pegadinha Crítica da CESGRANRIO"
                      >
                        A banca adora confundir pertinência (∈) com inclusão
                        (⊂).
                        <br />
                        &bull; O símbolo <strong>∈ (pertence)</strong> só pode
                        ser usado entre um ELEMENTO e um CONJUNTO.
                        <br />
                        &bull; Se A = {"{1, 2, 3}"}, dizer que{" "}
                        <strong>{"{1}"} ∈ A</strong> é FALSO! O elemento é o 1,
                        não o conjunto {"{1}"}. O correto seria{" "}
                        <strong>1 ∈ A</strong> ou <strong>{"{1}"} ⊂ A</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
            {/* ACORDEON 4: CONJUNTO VAZIO */}
            <ContentAccordion
              titulo="O Conjunto Vazio (∅)"
              icone="🕳️"
              corIndicador="bg-cyan-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "O que é o Vazio?",
                  icone: "🔢",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        O conjunto vazio é aquele que{" "}
                        <strong>não possui nenhum elemento</strong>. Pode ser
                        representado nativamente por <strong>∅</strong> ou{" "}
                        <strong>{"{ }"}</strong>.
                      </p>
                      <AlertBox tipo="info" titulo="Propriedade de Ouro">
                        O conjunto vazio é matematicamente considerado um{" "}
                        <strong>subconjunto de QUALQUER conjunto</strong>,
                        inclusive de si mesmo (∅ ⊂ A).
                      </AlertBox>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 shadow-sm mt-4">
                        <p className="font-bold text-rose-700 dark:text-rose-400 mb-2">
                          🚨 Armadilhas Visuais de Prova
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground">
                          <li>
                            O conjunto <strong>{"{∅}"}</strong> NÃO é vazio! É
                            um conjunto unitário cujo único elemento é o próprio
                            símbolo de vazio.
                          </li>
                          <li>
                            A representação <strong>{"{ }"}</strong> está
                            correta para conjunto vazio, mas escrever{" "}
                            <strong>{"{ 0 }"}</strong> significa que há um
                            elemento ali dentro (o algarismo zero). Portanto,
                            não é vazio.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            {/* ACORDEON 5: CARDINALIDADE */}
            <ContentAccordion
              titulo="Cardinalidade de Conjuntos"
              icone="🧮"
              corIndicador="bg-teal-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "O que é Cardinalidade?",
                  icone: "📏",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        A <strong>Cardinalidade</strong> não é nada além do{" "}
                        <strong>Número de Elementos</strong> distintos que moram
                        dentro de um conjunto A. Ela geralmente é representada
                        em fórmulas por <strong>n(A)</strong> ou{" "}
                        <strong>#A</strong>.
                      </p>
                      <AlertBox
                        tipo="warning"
                        titulo="Dica de Contagem (CESGRANRIO)"
                      >
                        Elementos repetidos não contam duas vezes na
                        cardinalidade!
                        <br />
                        Por exemplo: A = {"{2, 2, 2, 3, 3}"}.
                        <br />O número real de habitantes dessa casa é 2. Logo,{" "}
                        <strong>n(A) = 2</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "1. Unitário",
                  icone: "1️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        Ocorre quando a cardinalidade é exata:{" "}
                        <strong>n(A) = 1</strong>.
                        <br />
                        Possui estritamente um único elemento.
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20 text-center text-sm font-mono mt-2">
                        Exemplo por compreensão: <br />A ={" "}
                        {"{x ∈ ℕ | 2 < x < 4}"} <br />
                        Resulta no conjunto A = {"{3}"}.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "2. Vazio ou Nulo",
                  icone: "0️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        Ocorre quando a cardinalidade é nula:{" "}
                        <strong>n(V) = 0</strong>. O conjunto é desabitado.
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20 text-center text-sm font-mono mt-2">
                        Exemplo: V = {"{x ∈ ℕ | x < 0}"} <br />
                        Como não existem Números Naturais menores que zero, V =
                        ∅.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "3. Finito",
                  icone: "📊",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        Acontece quando conseguimos terminar a contagem em algum
                        momento.
                        <strong>n(A)</strong> é um número real contável.
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20 text-center text-sm font-mono mt-2">
                        Exemplo: <br />A = {"{dias da semana}"} <br />
                        n(A) = 7.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "4. Infinito",
                  icone: "♾️",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        Ocorre quando o número de elementos não possui fim. A
                        contagem jamais termina. Não é possível definir a sua
                        cardinalidade exata (n(A) tende ao Infinito).
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20 text-center text-sm font-mono mt-2">
                        Exemplo Clássico: <br />C ={" "}
                        {"{todos os números primos existentes}"}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Subconjuntos e Conjunto Potência"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Inclusão e Igualdade"
              icone="⊂"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Subconjuntos (⊂)",
                  icone: "📦",
                  conteudo:(
                    <div className="space-y-3">
                      <p>
                        A ⊂ B: <strong>todo</strong> elemento de A também
                        pertence a B.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-sm">
                            ✅ {"{1, 2}"} ⊂ {"{1, 2, 3}"}
                          </p>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                          <p className="text-sm">
                            ❌ {"{1, 4}"} ⊄ {"{1, 2, 3}"}
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="success" titulo="Dupla Inclusão">
                        Se A ⊂ B e B ⊂ A, então A = B.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Conjunto Potência P(A)",
                  icone: "⚡",
                  conteudo:(
                    <div className="space-y-3">
                      <p>P(A) = conjunto de TODOS os subconjuntos de A.</p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-bold mb-2">Fórmula: n(P(A)) = 2ⁿ</p>
                        <p className="text-sm">
                          A tem 5 elementos? P(A) tem 2⁵ = 32 subconjuntos.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="indigo"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon:LuBookOpen,
                  content:(
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Mental: Notações",
                          type: "Mapa Mental",
                          imageUrl: "/conjuntos_fundamentos_mapa.png",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                        {
                          title: "Tabela: Símbolos",
                          type: "Tabela",
                          imageUrl: "/conjuntos_simbolos_tabela.png",
                          placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                        },
                        {
                          title: "Infográfico: Potência",
                          type: "Infográfico",
                          imageUrl: "/conjuntos_potencia_infografico.png",
                          placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                        },
                      ]}
                      moduloNome="Fundamentos"
                      tituloAula="Teoria dos Conjuntos"
                      materia="Matemática"
                    />
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon:LuMusic,
                  content:(
                    <div className="w-full flex justify-center py-4">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Fundamentos de Conjuntos"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
                          lyrics={`(Verso 1)\nConjunto é coleção, de elementos definidos.\nCom chaves eu represento, os objetos reunidos!\n\n(Refrão)\nPertence é o E cortado, subconjunto é o C virado.\nVazio é o zen: sem nada, mas em todos está incluído!`}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizFundamentos}
              titulo="Quiz - Fundamentos de Conjuntos"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: OPERAÇÕES ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Operações com Conjuntos"
          descricao="União, interseção, diferença e complementar: as 4 operações que a CESGRANRIO adora cobrar."
          gradiente="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="União (∪) e Interseção (∩)"
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Somar Conjuntos"
              icone="🤝"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "União (A ∪ B)",
                  icone: "➕",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        A <strong>união</strong> de dois conjuntos A e B forma
                        um novo conjunto contendo{" "}
                        <strong>TODOS os elementos</strong> de A, juntamente com
                        todos os elementos de B, garantindo que{" "}
                        <strong>não haja repetições</strong>.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                        <p className="font-mono text-lg font-bold">
                          A ∪ B = {"{x | x ∈ A ou x ∈ B}"}
                        </p>
                      </div>
                      <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-800 dark:text-teal-300 mb-2">
                          📝 Exemplo Resolvido
                        </p>
                        <p className="text-sm font-mono mb-2">
                          A = {"{1, 2, 3}"}
                          <br />B = {"{3, 4, 5}"}
                        </p>
                        <p className="text-sm">
                          O elemento '3' aparece em ambos os conjuntos. Na
                          união, ele é escrito apenas uma vez:
                          <br />A ∪ B = <strong>{"{1, 2, 3, 4, 5}"}</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <ContentAccordion
              titulo="Interseção (A ∩ B)"
              icone="🎯"
              corIndicador="bg-teal-500"
              slides={[
                {
                  titulo: "Conceito",
                  icone: "🔍",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        A <strong>interseção</strong> contém apenas os elementos
                        em AMBOS.
                      </p>
                      <AlertBox tipo="warning" titulo="Conjuntos Disjuntos">
                        Quando A ∩ B = ∅, não têm nada em comum.
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
              title="Diferença e Complementar"
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Diferença e Complementar"
              icone="✂️"
              corIndicador="bg-green-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Diferença (A − B)",
                  icone: "➖",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        A diferença entre dois conjuntos significa pegar o
                        primeiro conjunto e{" "}
                        <strong>
                          remover todos os elementos que também estão no segundo
                        </strong>
                        . A leitura correta de (A - B) é "os elementos que são
                        exclusivos de A".
                      </p>
                      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                        <p className="font-bold text-green-800 dark:text-green-300 mb-2">
                          📝 Exemplo Clássico
                        </p>
                        <p className="text-sm font-mono mb-2">
                          A = {"{1, 2, 3, 4}"}
                          <br />B = {"{3, 4, 5, 6}"}
                        </p>
                        <p className="text-sm">
                          O que tem em A que NÃO tem em B? Tiramos o 3 e o 4
                          (que estão em B).
                          <br />
                          <strong>A - B = {"{1, 2}"}</strong>
                          <br />
                          Repare que a operação NÃO é comutativa!{" "}
                          <strong>B - A = {"{5, 6}"}</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Complementar (Aᶜ ou C_U^A)",
                  icone: "🔄",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        O complementar de A é um caso especial de diferença!
                        Denotado por <strong>Aᶜ</strong> ou <strong>A'</strong>,
                        é a diferença entre o conjunto Universo (U) e o conjunto
                        A. Basicamente,{" "}
                        <strong>
                          é "tudo aquilo que falta ao conjunto A para ele se
                          tornar o Universo"
                        </strong>
                        .
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center font-mono font-bold">
                        Aᶜ = U − A
                      </div>
                      <AlertBox tipo="success" titulo="Leis de De Morgan">
                        Na CESGRANRIO, as Leis de De Morgan caem frequentemente
                        combinadas com lógica proposicional. Memorize a
                        distribuição do complementar:
                        <br />
                        &bull; (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ
                        <br />
                        &bull; (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="emerald"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon:LuBookOpen,
                  content:(
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "As 4 Operações",
                          type: "Diagrama",
                          imageUrl: "/conjuntos_operacoes_diagrama.png",
                          placeholderColor:
                            "bg-emerald-100 dark:bg-emerald-900/30",
                        },
                        {
                          title: "Leis de De Morgan",
                          type: "Equivalência",
                          imageUrl: "/conjuntos_demorgan_lei.png",
                          placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                        },
                        {
                          title: "Diferença e Complementar",
                          type: "Venn",
                          imageUrl: "/conjuntos_complementar.png",
                          placeholderColor: "bg-green-100 dark:bg-green-900/30",
                        },
                      ]}
                      moduloNome="Operações"
                      tituloAula="Teoria dos Conjuntos"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizOperacoes}
              titulo="Quiz - Operações com Conjuntos"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: VENN ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Diagramas de Venn e Cardinalidade"
          descricao="A ferramenta visual mais poderosa para conjuntos. Domine a fórmula da cardinalidade."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Diagramas de Venn"
              description="Transforme problemas complexos em simples."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Desenhando Diagramas de Venn"
              icone="⭕"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é e Por Que Usar?",
                  icone: "💡",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Os Diagramas de Venn representam conjuntos usando curvas
                        fechadas (geralmente círculos) dentro de um retângulo
                        que representa o Conjunto Universo (U). Eles são a{" "}
                        <strong>ferramenta visual definitiva</strong> para
                        resolver problemas de contagem que envolvem grupos com
                        elementos em comum.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-800 dark:text-blue-300">
                          A Estrutura Visual:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                          <li>
                            <strong>Retângulo:</strong> O Universo estatístico
                            (total de entrevistados).
                          </li>
                          <li>
                            <strong>Círculo A:</strong> Todos que têm a
                            característica A.
                          </li>
                          <li>
                            <strong>Área exclusiva:</strong> Apenas círculo A
                            (não entra em B).
                          </li>
                          <li>
                            <strong>Interseção:</strong> Área central onde os
                            círculos se sobrepõem.
                          </li>
                          <li>
                            <strong>Lado de fora:</strong> Quem não tem NENHUMA
                            das características.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regra de Ouro da CESGRANRIO",
                  icone: "🏆",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Em provas de concurso, a principal armadilha é somar os
                        valores dados no enunciado diretamente. Para evitar
                        isso, aplique sempre esta regra:
                      </p>
                      <AlertBox
                        tipo="warning"
                        titulo="O Método 'De Dentro Para Fora'"
                      >
                        1.{" "}
                        <strong>
                          Sempre comece preenchendo a interseção central
                        </strong>{" "}
                        (o grupo que pertence a TODOS os conjuntos).
                        <br />
                        2.{" "}
                        <strong>
                          Subtraia esse valor das interseções adjacentes
                        </strong>{" "}
                        ou dos totais individuais.
                        <br />
                        3. Só depois encontre os valores que pertencem "APENAS"
                        a um conjunto.
                        <br />
                        4. A soma de todas as partes (incluindo quem está de
                        fora) resulta no Universo.
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
              title="Fórmula da Cardinalidade"
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Teorema da Inclusão-Exclusão"
              icone="📊"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula para 2 Conjuntos",
                  icone: "2️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Quando você soma o total do conjunto A com o total do
                        conjunto B, os elementos que pertencem a ambos (a
                        interseção) são contados DUAS vezes. Por isso,
                        precisamos{" "}
                        <strong>subtrair essa interseção uma vez</strong> para
                        achar o total real da união.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center shadow-inner">
                        <p className="text-lg font-bold font-mono text-blue-800 dark:text-blue-300">
                          n(A ∪ B) = n(A) + n(B) − n(A ∩ B)
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-xl border border-border">
                        <p className="font-bold text-sm mb-2">
                          Exemplo Passo a Passo (Prova):
                        </p>
                        <p className="text-sm italic mb-2">
                          "Numa plataforma com 120 trabalhadores, 80 têm curso
                          NR-10 e 60 têm NR-13. Se todos têm pelo menos um,
                          quantos têm os dois?"
                        </p>
                        <ul className="text-xs space-y-1">
                          <li>
                            1. Como todo mundo tem ao menos 1, a união é o
                            total: 120.
                          </li>
                          <li>
                            2. Aplicando a fórmula: 120 = 80 + 60 - Interseção
                          </li>
                          <li>3. 120 = 140 - Interseção</li>
                          <li>
                            4. Interseção = 140 - 120 ={" "}
                            <strong>20 trabalhadores</strong>.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Desafio dos 3 Conjuntos",
                  icone: "3️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        Com três conjuntos (A, B e C), a soma direta cria
                        sobreposições complexas. A fórmula expansiva corrige
                        isso:
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center overflow-x-auto">
                        <p className="text-sm font-bold font-mono text-indigo-800 dark:text-indigo-300">
                          n(A∪B∪C) = n(A) + n(B) + n(C){" "}
                          <br className="md:hidden" />− n(A∩B) − n(A∩C) − n(B∩C){" "}
                          <br className="md:hidden" />+ n(A∩B∩C)
                        </p>
                      </div>
                      <AlertBox
                        tipo="info"
                        titulo="Lógica da Inclusão-Exclusão"
                      >
                        Soma-se os individuais (+), subtrai-se as duplas (-)
                        pois foram somadas 2 vezes, mas a tripla interseção
                        central foi subtraída demais, então somamos ela de volta
                        (+).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="blue"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon:LuBookOpen,
                  content:(
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Venn: 2 Conjuntos",
                          type: "Diagrama",
                          imageUrl: "/conjuntos_venn_2.png",
                          placeholderColor:
                            "bg-blue-100 dark:bg-blue-900/30",
                        },
                        {
                          title: "Venn: 3 Conjuntos",
                          type: "Diagrama",
                          imageUrl: "/conjuntos_venn_3.png",
                          placeholderColor:
                            "bg-blue-100 dark:bg-blue-900/30",
                        },
                        {
                          title: "Regra De Dentro para Fora",
                          type: "Estratégia",
                          imageUrl: "/conjuntos_venn_regra.png",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                      ]}
                      moduloNome="Diagramas de Venn"
                      tituloAula="Teoria dos Conjuntos"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizVenn}
              titulo="Quiz - Diagramas de Venn"
              icone="🧠"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: NUMÉRICOS ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Conjuntos Numéricos e Intervalos"
          descricao="ℕ, ℤ, ℚ, 𝕀, ℝ — a hierarquia dos números e intervalos na reta real."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Os 5 Conjuntos Numéricos"
              variant="amber"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  title: "ℕ — Números Naturais",
                  descricao:
                    "{0, 1, 2, 3, ...}. Usados em contagem. Quando utilizamos ℕ* (com asterisco), excluímos o zero.",
                  icone: "🌱",
                },
                {
                  title: "ℤ — Números Inteiros",
                  descricao:
                    "{..., -2, -1, 0, 1, 2, ...}. Expande os Naturais adicionando os números negativos.",
                  icone: "❄️",
                },
                {
                  title: "ℚ — Números Racionais",
                  descricao:
                    "Qualquer número que pode virar fração (p/q, com q≠0). Inclui: Inteiros, Decimais Exatos (0,5) e Dízimas Periódicas (0,333...).",
                  icone: "🔢",
                },
                {
                  title: "𝕀 — Números Irracionais",
                  descricao:
                    "Dízimas não-periódicas infinites. Não viram fração. Exemplos de peso: √2, √3, e as constantes π e o número de Euler 'e'.",
                  icone: "♾️",
                },
                {
                  title: "ℝ — Números Reais",
                  descricao:
                    "A união dos Racionais com os Irracionais (ℝ = ℚ ∪ 𝕀). Forma toda a reta numérica sem buracos.",
                  icone: "📏",
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="Hierarquia e Inclusões (Atenção!)">
              A relação de continência correta é: <strong>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</strong>
              .<br />O conjunto <strong>𝕀 (Irracionais) também ⊂ ℝ</strong>.
              <br />
              Atenção: Racionais e Irracionais são DISJUNTOS, ou seja,{" "}
              <strong>ℚ ∩ 𝕀 = ∅</strong>. Não existe número que seja os dois ao
              mesmo tempo.
            </AlertBox>
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Intervalos na Reta Real"
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Ler a Notação"
              icone="📏"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Notação Moderna de Intervalos",
                  icone: "📚",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm">
                        Os intervalos no conjunto dos Números Reais usam
                        colchetes <strong>[ ]</strong>, parênteses{" "}
                        <strong>( )</strong> e sinais de desigualdade{" "}
                        <strong>&lt; &gt; ≤ ≥</strong>. A banca exige que você
                        saiba traduzi-los rapidamente.
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-green-700 dark:text-green-400">
                              Intervalo Fechado
                            </span>
                            <span className="bg-green-500/20 px-2 py-0.5 rounded text-xs font-mono">
                              [a, b]
                            </span>
                          </div>
                          <p className="text-xs mb-1">
                            <strong>Inequação:</strong> a ≤ x ≤ b
                          </p>
                          <p className="text-xs">
                            Os extremos "a" e "b" <strong>são incluídos</strong>{" "}
                            na resposta (Bolinha Cheia).
                          </p>
                        </div>

                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-red-700 dark:text-red-400">
                              Intervalo Aberto
                            </span>
                            <span className="bg-red-500/20 px-2 py-0.5 rounded text-xs font-mono">
                              ]a, b[ ou (a, b)
                            </span>
                          </div>
                          <p className="text-xs mb-1">
                            <strong>Inequação:</strong> a &lt; x &lt; b
                          </p>
                          <p className="text-xs">
                            Os extremos "a" e "b" <strong>estão de fora</strong>{" "}
                            (Bolinha Vazia).
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-sm">
                        <strong>Intervalos Infinitos:</strong> Quando a reta vai
                        para o ∞ positivo ou extremo negativo -∞, o lado do
                        infinito <strong>SEMPRE TEM COLCHETE ABERTO</strong> (ou
                        parênteses).
                        <br />
                        Ex: "Valores maiores ou iguais a 5" →{" "}
                        <strong>[5, +∞[</strong>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              variant="amber"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon:LuBookOpen,
                  content:(
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Hierarquia Numérica",
                          type: "Diagrama",
                          imageUrl: "/conjuntos_hierarquia_numerica.png",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                        },
                        {
                          title: "Intervalos na Reta",
                          type: "Tabela",
                          imageUrl: "/conjuntos_intervalos.png",
                          placeholderColor:
                            "bg-orange-100 dark:bg-orange-900/30",
                        },
                      ]}
                      moduloNome="Conjuntos Numéricos"
                      tituloAula="Teoria dos Conjuntos"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizNumericos}
              titulo="Quiz - Conjuntos Numéricos"
              icone="🔥"
              numero={4}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: LABORATÓRIO ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Laboratório CESGRANRIO"
          descricao="Simulado final e certificado de conclusão. A vaga é sua!"
          gradiente="bg-gradient-to-br from-rose-600 via-rose-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm text-center">
            <ModuleSectionHeader
              index="🎯"
              title="Missão Cumprida?"
              variant="rose"
              className="mb-8"
            />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Toda a Teoria dos Conjuntos percorrida. Desafio final em contexto
              Petrobras.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 min-w-[150px]">
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-70">
                  Questões
                </p>
              </div>
              <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 min-w-[150px]">
                <p className="text-3xl font-bold text-emerald-600">85%</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-70">
                  Meta Elite
                </p>
              </div>
            </div>
          </section>
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Resumo Final"
              variant="rose"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon:LuBookOpen,
                  content:(
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Mental Global",
                          type: "Mapa Mental",
                          imageUrl: "/conjuntos_mapa_final.png",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                        },
                        {
                          title: "Fórmulas Essenciais",
                          type: "Tabela",
                          imageUrl: "/conjuntos_simbolos_tabela.png",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                        },
                        {
                          title: "Campo Minado (Pegadinhas)",
                          type: "Card",
                          imageUrl: "/conjuntos_pegadinhas.png",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                      ]}
                      moduloNome="Simulado Final"
                      tituloAula="Teoria dos Conjuntos"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Simulado Final - Teoria dos Conjuntos"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: INCLUSÃO-EXCLUSÃO ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Fórmula de Inclusão-Exclusão"
          descricao="A ferramenta mestra para calcular cardinalidade de uniões sem contar dois vezes — e o coração das questões de Conjuntos da CESGRANRIO."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Fórmula para 2 Conjuntos"
              description="O princípio base: contar sem duplicar."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Por que precisamos subtrair a interseção?"
              icone="➕"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Problema da Dupla Contagem",
                  icone: "🔢",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Se somarmos <strong>|A| + |B|</strong>, quem está em{" "}
                        <strong>A ∩ B</strong> é contado{" "}
                        <strong className="text-rose-400">duas vezes</strong>. A
                        fórmula de Inclusão-Exclusão corrige isso subtraindo a
                        interseção uma vez.
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-cyan-400">
                          |A ∪ B| = |A| + |B| − |A ∩ B|
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Na RPBC, 180 técnicos dominam válvulas esfera (V) e 150
                        dominam válvulas borboleta (B). Se 60 dominam ambas,
                        quantos dominam pelo menos uma?
                        <br />
                        <strong className="text-cyan-400">
                          |V ∪ B| = 180 + 150 − 60 = 270
                        </strong>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Encontrando a Interseção",
                  icone: "🎯",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A fórmula pode ser invertida para{" "}
                        <strong>encontrar a interseção</strong> quando sabemos a
                        união:
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                        <p className="font-mono text-base font-bold text-indigo-400">
                          |A ∩ B| = |A| + |B| − |A ∪ B|
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-sm">
                          <strong className="text-emerald-400">
                            Exemplo Petrobras:
                          </strong>{" "}
                          Em 300 candidatos ao TST, todos aprovaram em pelo
                          menos uma fase. 190 passaram na fase técnica (T) e 160
                          na prática (P). Quantos passaram em ambas?
                          <br />
                          <strong>
                            |T ∩ P| = 190 + 160 − 300 = 50 candidatos
                          </strong>
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete CESGRANRIO">
                        Quando o enunciado diz &quot;TODOS fizeram pelo menos
                        uma&quot;, isso significa |A ∪ B| = Total. Use isso para
                        isolar a interseção diretamente!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Encontrando 'Nenhum'",
                  icone: "0️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Muitas questões pedem quem{" "}
                        <strong>não pertence a nenhum</strong> conjunto. Basta
                        subtrair a união do universo:
                      </p>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                        <p className="font-mono text-base font-bold text-rose-400">
                          Nenhum = |U| − |A ∪ B|
                        </p>
                      </div>
                      <AlertBox tipo="success" titulo="Sequência Campeã">
                        1️⃣ Calcule |A ∪ B| pela fórmula
                        <br />
                        2️⃣ Subtraia do universo: Nenhum = |U| − |A ∪ B|
                        <br />
                        Essa sequência resolve{" "}
                        <strong>80% das questões de conjuntos</strong> da
                        CESGRANRIO.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={2}
              title="Extensão para 3 Conjuntos"
              description="A fórmula completa — e a favorita das provas difíceis."
              variant="emerald"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="Fórmula de 3 Conjuntos: A + B + C − Pares + Tripla"
              icone="⭕"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "A Fórmula Completa",
                  icone: "📐",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="font-mono text-sm font-bold text-emerald-400 leading-relaxed">
                          |A∪B∪C| = |A| + |B| + |C|
                          <br />
                          &nbsp;&nbsp;− |A∩B| − |A∩C| − |B∩C|
                          <br />
                          &nbsp;&nbsp;+ |A∩B∩C|
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Regra mnemônica:{" "}
                        <strong>
                          &quot;Some os individuais, subtraia os pares, some a
                          tripla&quot;
                        </strong>
                        . A tripla é somada porque foi subtraída 3 vezes (uma em
                        cada par) mas deveria ter sido subtraída apenas 2.
                      </p>
                      <div className="rounded-xl overflow-hidden border border-border/20">
                        <img
                          src="/conjuntos_venn_3.png"
                          alt="Diagrama de Venn com três conjuntos sobrepostos mostrando as 7 regiões da fórmula de inclusão-exclusão"
                          className="w-full object-cover min-h-[200px]"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo: 3 Certificações NR",
                  icone: "🏭",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>Enunciado:</strong> Numa plataforma P-55, 400
                        operadores foram auditados. 200 têm NR-10, 160 têm
                        NR-13, 80 têm NR-35, 60 têm NR-10 e NR-13, 40 têm NR-10
                        e NR-35, 30 têm NR-13 e NR-35, 20 têm as três. Quantos
                        têm pelo menos uma?
                      </p>
                      <div className="p-4 bg-slate-800 dark:bg-slate-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-xs space-y-1">
                        <p className="text-indigo-400">
                          // Aplicando a fórmula:
                        </p>
                        <p className="text-muted-foreground">
                          = 200 + 160 + 80 − 60 − 40 − 30 + 20
                        </p>
                        <p className="text-muted-foreground">
                          = 440 − 130 + 20
                        </p>
                        <p className="text-emerald-400 font-bold">
                          = 330 operadores
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha Clássica">
                        A CESGRANRIO sempre inclui a tripla interseção no
                        enunciado. Se você esquecer de SOMAR de volta, chegará a
                        310 (errado). A tripla é subtraída 3× nos pares, mas
                        deve ser subtraída apenas 2×.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={3}
              title="Casos Especiais"
              description="Quando a geometria dos conjuntos simplifica o cálculo."
              variant="indigo"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="Conjuntos Disjuntos e Subconjuntos"
              icone="🔀"
              corIndicador="bg-indigo-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Caso 1: Conjuntos Disjuntos",
                  icone: "○○",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Se <strong>A ∩ B = ∅</strong> (disjuntos), a fórmula
                        simplifica:
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                        <p className="font-mono text-base text-indigo-400">
                          |A ∪ B| = |A| + |B|
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-sm">
                          <strong className="text-emerald-400">Exemplo:</strong>{" "}
                          Turnos de trabalho (Manhã ∩ Tarde = ∅). Se 80
                          trabalham de manhã e 70 à tarde, então 150 trabalham
                          em algum turno (sem sobreposição).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Caso 2: A ⊂ B (Subconjunto)",
                  icone: "⊂",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Se <strong>A ⊂ B</strong>, então{" "}
                        <strong>A ∩ B = A</strong> e <strong>A ∪ B = B</strong>:
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="text-sm">
                          <strong className="text-cyan-400">Exemplo:</strong>{" "}
                          Todos os técnicos com pós-graduação (P) têm graduação
                          (G), logo P ⊂ G. Então G ∩ P = P e G ∪ P = G. Somente
                          graduação = |G| − |P|.
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Dica">
                        A CESGRANRIO indica A ⊂ B com a frase &quot;todos com A
                        têm B&quot; ou &quot;A implica B&quot;. Quando vir isso,
                        a interseção é o conjunto menor.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizInclusaoExclusao}
              titulo="Quiz — Inclusão-Exclusão"
              icone="➕"
              numero={6}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: ℕ, ℤ, ℚ EM PROFUNDIDADE ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="ℕ, ℤ, ℚ em Profundidade"
          descricao="Os três primeiros degraus da hierarquia dos números reais — com contexto industrial Petrobras e as pegadinhas favoritas da CESGRANRIO."
          gradiente="bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Naturais (ℕ): A Origem dos Números"
              description="Os primeiros números que existiram — e que a CESGRANRIO usa para criar armadilhas."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O Conjunto ℕ e suas propriedades"
              icone="0️⃣"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e o Zero",
                  icone: "📌",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>ℕ = {"{0, 1, 2, 3, 4, ...}"}</strong> — Na
                        convenção brasileira (adotada pela CESGRANRIO), o{" "}
                        <strong className="text-indigo-400">
                          zero pertence a ℕ
                        </strong>
                        . Isso é frequentemente explorado em provas.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">
                            Contexto Industrial ✅
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Número de turnos trabalhados em um mês, quantidade
                            de válvulas inspecionadas, número de funcionários em
                            um setor — todos ∈ ℕ.
                          </p>
                        </div>
                        <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-400 mb-2">
                            NÃO é Natural ❌
                          </p>
                          <p className="text-xs text-muted-foreground">
                            -5 turnos (impossível), 2,5 funcionários (não
                            existe), valores negativos de temperatura — esses
                            NÃO pertencem a ℕ.
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Armadilha CESGRANRIO">
                        &quot;0 ∈ ℕ?&quot; — SIM, na convenção brasileira. Mas
                        &quot;ℕ* = {"{1, 2, 3, ...}"}&quot; exclui o zero (ℕ
                        estrela). A banca explora essa distinção em questões de
                        classificação numérica.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={2}
              title="Inteiros (ℤ): Incluindo os Negativos"
              description="O que acontece quando a medição pode ser abaixo do zero?"
              variant="emerald"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="ℤ = {..., -2, -1, 0, 1, 2, ...}"
              icone="±"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Quando precisamos dos Inteiros",
                  icone: "🌡️",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>ℤ</strong> estende ℕ incluindo os negativos:{" "}
                        <strong>
                          ℤ = {"{..., -3, -2, -1, 0, 1, 2, 3, ...}"}
                        </strong>
                        . Na prática industrial, surgem em grandezas com
                        referencial.
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                              <span className="text-4xl">🌡️</span>
                              <h6 className="text-base font-bold text-foreground">
                                Temperatura de Tanque
                              </h6>
                              <p className="text-xs text-muted-foreground">
                                Que conjunto numérico classifica temperaturas?
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-3 text-left">
                              <p className="text-xs font-bold text-emerald-400 border-b border-border/30 pb-2">
                                Resposta
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Temperaturas como -12°C (criogênico), 0°C,
                                +250°C — podem ser positivas, negativas ou zero.
                                Conjunto mínimo:{" "}
                                <strong className="text-emerald-400">ℤ</strong>{" "}
                                (se sempre inteiras) ou{" "}
                                <strong className="text-cyan-400">ℚ</strong> (se
                                fracionárias como -12,5°C).
                              </p>
                            </div>
                          }
                        />
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                              <span className="text-4xl">📊</span>
                              <h6 className="text-base font-bold text-foreground">
                                Variação de Nível
                              </h6>
                              <p className="text-xs text-muted-foreground">
                                Saldo de ±metros num tanque de petróleo
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-3 text-left">
                              <p className="text-xs font-bold text-emerald-400 border-b border-border/30 pb-2">
                                Resposta
                              </p>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                +3m (acima do nível), -2m (abaixo), 0m (no
                                nível). Como pode ser positiva, negativa ou nula
                                e sempre inteira em metros:{" "}
                                <strong className="text-emerald-400">ℤ</strong>{" "}
                                é o conjunto mínimo.
                              </p>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "ℕ ⊂ ℤ: Todo Natural é Inteiro",
                  icone: "⊂",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Todo número natural é também inteiro (ℕ ⊂ ℤ), mas nem
                        todo inteiro é natural. Os inteiros{" "}
                        <strong className="text-rose-400">negativos</strong> são
                        o que diferencia ℤ de ℕ.
                      </p>
                      <div className="p-4 bg-slate-800 dark:bg-slate-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-xs">
                        <p className="text-emerald-400">
                          ℕ = {"{"}0, 1, 2, 3, 4, 5...{"}"}
                        </p>
                        <p className="text-indigo-400 mt-1">
                          ℤ = {"{"}..., -3, -2, -1, 0, 1, 2, 3...{"}"}
                        </p>
                        <p className="text-muted-foreground mt-1">
                          // ℤ \ ℕ = {"{"}..., -3, -2, -1{"}"}
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={3}
              title="Racionais (ℚ): Frações e Dízimas"
              description="Todo número que pode ser escrito como fração p/q."
              variant="indigo"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="ℚ: O conjunto das frações e dízimas periódicas"
              icone="½"
              corIndicador="bg-indigo-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Definição Formal e Exemplos",
                  icone: "📐",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>ℚ</strong> = todos os números que podem ser
                        escritos como{" "}
                        <strong className="text-indigo-400">p/q</strong>, com{" "}
                        <em>p, q ∈ ℤ e q ≠ 0</em>. Incluem frações exatas e
                        dízimas periódicas.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-400 mb-1">
                            ∈ ℚ
                          </p>
                          <p className="text-xs text-muted-foreground">
                            3/4 = 0,75
                            <br />
                            1/3 = 0,333...
                            <br />
                            -7 = -7/1
                            <br />
                            0,6 = 3/5
                          </p>
                        </div>
                        <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-400 mb-1">
                            ∉ ℚ
                          </p>
                          <p className="text-xs text-muted-foreground">
                            √2 = 1,41421...
                            <br />
                            π = 3,14159...
                            <br />
                            √3 = 1,73205...
                            <br />e = 2,71828...
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dízimas Periódicas → Fração",
                  icone: "🔄",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Toda dízima periódica é racional. Fórmula de conversão
                        (dízima simples com período de 1 dígito):
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 font-mono text-xs space-y-2">
                        <p className="text-indigo-400">
                          // x = 0,333... (período = 3)
                        </p>
                        <p className="text-muted-foreground">10x = 3,333...</p>
                        <p className="text-muted-foreground">
                          10x − x = 3,333... − 0,333...
                        </p>
                        <p className="text-muted-foreground">9x = 3</p>
                        <p className="text-emerald-400 font-bold">
                          x = 3/9 = 1/3 ✓
                        </p>
                      </div>
                      <AlertBox tipo="success" titulo="Dica Mestre">
                        Dízima periódica = racional. Dízima{" "}
                        <strong>não periódica</strong> (tipo √2 = 1,41421356...)
                        = irracional. O período quebra a regra!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizNumericosBasicos}
              titulo="Quiz — ℕ, ℤ, ℚ em Profundidade"
              icone="🔢"
              numero={7}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: IRRACIONAIS E ℝ ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Irracionais e ℝ"
          descricao="Os números que 'escapam' das frações: dízimas infinitas e não periódicas, a reta real completa e as pegadinhas da CESGRANRIO."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Números Irracionais"
              description="Dízimas infinitas sem padrão — impossíveis de escrever como fração."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O que é um número irracional?"
              icone="∞"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Exemplos Industriais",
                  icone: "📡",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Um número é <strong>irracional</strong> quando{" "}
                        <em>não pode ser escrito como p/q</em> com p, q
                        inteiros. Sua representação decimal é uma{" "}
                        <strong className="text-rose-400">
                          dízima infinita e não periódica
                        </strong>{" "}
                        — sem bloco que se repita.
                      </p>
                      <div className="rounded-xl overflow-hidden border border-border/20">
                        <img
                          src="/conjuntos_hierarquia_numerica.png"
                          alt="Hierarquia dos conjuntos numéricos: ℕ dentro de ℤ dentro de ℚ dentro de ℝ, com irracionais na diferença ℝ∖ℚ"
                          className="w-full object-cover min-h-[200px]"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">
                            Na Engenharia Petrobras
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <strong>√2 ≈ 1,41421...</strong> — diagonal de placa
                            quadrada 1×1 m²
                            <br />
                            <strong>π ≈ 3,14159...</strong> — área de tampa
                            circular: A = πr²
                            <br />
                            <strong>√3 ≈ 1,73205...</strong> — cálculo de tensão
                            em estruturas trianguladas
                          </p>
                        </div>
                        <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-400 mb-2">
                            Pegadinhas CESGRANRIO
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <strong>√4 = 2</strong> — racional! (não irracional)
                            <br />
                            <strong>22/7</strong> — apenas aproximação de π
                            <br />
                            <strong>0,999... = 1</strong> — racional exato!
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={2}
              title="ℝ = ℚ ∪ Irracionais"
              description="A reta real completa — sem lacunas, sem buracos."
              variant="indigo"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="A propriedade da densidade dos Reais"
              icone="←→"
              corIndicador="bg-indigo-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "ℝ é a Reunião Completa",
                  icone: "🌊",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        O conjunto dos Reais é <strong>ℝ = ℚ ∪ (ℝ∖ℚ)</strong> —
                        a reunião dos racionais com os irracionais. As duas
                        partes são{" "}
                        <strong className="text-cyan-400">disjuntas</strong>: um
                        número não pode ser racional e irracional ao mesmo
                        tempo.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="text-sm font-bold text-indigo-400 mb-2">
                          Propriedade da Densidade
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Entre quaisquer dois reais distintos há{" "}
                          <strong>infinitos</strong> números reais. Entre 1,4 e
                          1,5 existem: 1,41; 1,414; √2 ≈ 1,41421; 1,415; e
                          infinitos outros.
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="0,999... = 1 (Exatamente)">
                        Prova: x = 0,999... → 10x = 9,999... → 10x − x = 9 → 9x
                        = 9 → x = 1. Portanto 0,999... é racional (= 1). Questão
                        clássica da CESGRANRIO para testar se o candidato
                        confunde &quot;infinitamente próximo&quot; com
                        &quot;igual&quot;.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Afirmações Verdadeiras e Falsas",
                  icone: "✅❌",
                  conteudo:(
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-xs text-emerald-400">
                          ✅ Todo racional é real (ℚ ⊂ ℝ)
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-xs text-emerald-400">
                          ✅ Todo irracional é real (Irr ⊂ ℝ)
                        </p>
                      </div>
                      <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="text-xs text-rose-400">
                          ❌ Todo real é racional (FALSO — existem irracionais)
                        </p>
                      </div>
                      <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="text-xs text-rose-400">
                          ❌ ℚ e Irracionais têm interseção não vazia (FALSO —
                          são disjuntos)
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="A mais cobrada">
                        &quot;Todo irracional é real&quot; — VERDADEIRO.
                        &quot;Todo real é irracional&quot; — FALSO. A inversão é
                        a pegadinha n° 1 da CESGRANRIO neste tema.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={3}
              title="Raízes: Quando √n é Irracional?"
              description="Regra rápida para classificar raízes em prova."
              variant="emerald"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="A regra das raízes quadradas"
              icone="√"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Quadrado Perfeito vs. Não Perfeito",
                  icone: "🔲",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>√n é racional</strong> somente quando n é um{" "}
                        <strong className="text-indigo-400">
                          quadrado perfeito
                        </strong>{" "}
                        (1, 4, 9, 16, 25, 36, 49, 64, 81, 100...). Caso
                        contrário, √n é irracional.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">
                            Racionais ✅
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            √1 = 1
                            <br />
                            √4 = 2
                            <br />
                            √9 = 3
                            <br />
                            √16 = 4
                            <br />
                            √25 = 5
                          </p>
                        </div>
                        <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-400 mb-2">
                            Irracionais ❌
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            √2 ≈ 1,414...
                            <br />
                            √3 ≈ 1,732...
                            <br />
                            √5 ≈ 2,236...
                            <br />
                            √6 ≈ 2,449...
                            <br />
                            √7 ≈ 2,646...
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="success" titulo="Regra de Ouro">
                        Em prova, basta perguntar: &quot;n tem raiz quadrada
                        inteira?&quot; Se sim → racional. Se não → irracional.
                        Decore os quadrados perfeitos até 144 (12²).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizIrracReais}
              titulo="Quiz — Irracionais e ℝ"
              icone="∞"
              numero={8}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: LEIS DE DE MORGAN ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Leis de De Morgan"
          descricao="As duas leis que transformam complementares de operações — imprescindíveis para simplificar expressões e resolver questões avançadas da CESGRANRIO."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="1ª Lei de De Morgan"
              description="O complementar da UNIÃO é a INTERSEÇÃO dos complementares."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ"
              icone="🔁"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Enunciado e Regra Mnemônica",
                  icone: "📋",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-blue-400">
                          (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        O complementar da <strong>união</strong> é a interseção
                        dos complementares. Para memorizar:{" "}
                        <strong className="text-blue-400">
                          &quot;Complementar entra, troca o operador e distribui
                          o apóstrofe&quot;
                        </strong>
                        .
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-sm">
                          <strong className="text-emerald-400">
                            Contexto RPBC:
                          </strong>{" "}
                          A = técnicos com NR-10, B = técnicos com NR-13. (A ∪
                          B)ᶜ = técnicos sem NR-10 <strong>NEM</strong> NR-13 =
                          Aᶜ ∩ Bᶜ.
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Leitura em Português">
                        (A ∪ B)ᶜ = &quot;não pertence a A e também não pertence
                        a B&quot; = &quot;nem A nem B&quot;. Isso é{" "}
                        <strong>Aᶜ ∩ Bᶜ</strong>. A leitura &quot;nem...
                        nem...&quot; sempre indica interseção de complementares.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Verificação Numérica",
                  icone: "🔢",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Verificação com U = {"{1,...,10}"}, A = {"{1,2,3,4,5}"},
                        B = {"{4,5,6,7}"}:
                      </p>
                      <div className="p-4 bg-slate-800 dark:bg-slate-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-xs space-y-1">
                        <p className="text-indigo-400">
                          A ∪ B = {"{1,2,3,4,5,6,7}"}
                        </p>
                        <p className="text-blue-400">
                          (A ∪ B)ᶜ = {"{8,9,10}"}
                        </p>
                        <p className="text-muted-foreground">─────</p>
                        <p className="text-emerald-400">
                          Aᶜ = {"{6,7,8,9,10}"}
                        </p>
                        <p className="text-cyan-400">Bᶜ = {"{1,2,3,8,9,10}"}</p>
                        <p className="text-emerald-400">
                          Aᶜ ∩ Bᶜ = {"{8,9,10}"} ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={2}
              title="2ª Lei de De Morgan"
              description="O complementar da INTERSEÇÃO é a UNIÃO dos complementares."
              variant="emerald"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ"
              icone="🔀"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Enunciado e Aplicação Industrial",
                  icone: "🏭",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-emerald-400">
                          (A ∩ B)ᶜ = Aᶜ ∪ Bᶜ
                        </p>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-border/20">
                        <img
                          src="/conjuntos_demorgan_lei.png"
                          alt="Diagrama mostrando que o complementar da interseção (A∩B)ᶜ é igual à união dos complementares Aᶜ∪Bᶜ"
                          className="w-full object-cover min-h-[200px]"
                        />
                      </div>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                        <p className="text-sm">
                          <strong className="text-cyan-400">
                            Contexto REPLAN:
                          </strong>{" "}
                          M = manutenção elétrica, O = manutenção mecânica. (M ∩
                          O)ᶜ = equipamentos que{" "}
                          <strong>não precisam de AMBAS</strong> = Mᶜ ∪ Oᶜ (sem
                          elétrica OU sem mecânica).
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={3}
              title="Simplificação em Cascata"
              description="Aplicando De Morgan duas vezes — o nível avançado das provas."
              variant="indigo"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="Dupla aplicação de De Morgan"
              icone="⛓"
              corIndicador="bg-indigo-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "(Aᶜ ∩ Bᶜ)ᶜ = ?",
                  icone: "🧮",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Expressões com duas aplicações de De Morgan são cobradas
                        em questões de nível avançado:
                      </p>
                      <div className="p-4 bg-slate-800 dark:bg-slate-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-xs space-y-2">
                        <p className="text-indigo-400">
                          // Simplificar (Aᶜ ∩ Bᶜ)ᶜ
                        </p>
                        <p className="text-blue-400">
                          Passo 1: Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ &nbsp; [1ª Lei]
                        </p>
                        <p className="text-emerald-400">
                          Passo 2: ((A ∪ B)ᶜ)ᶜ = A ∪ B &nbsp; [duplo
                          complementar]
                        </p>
                        <p className="text-cyan-400 font-bold">
                          Resultado: (Aᶜ ∩ Bᶜ)ᶜ = A ∪ B
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Cuidado com a Ordem">
                        Aplique sempre da parte mais interna para a externa.
                        Duplo complementar cancela: (Xᶜ)ᶜ = X. Essa propriedade
                        é fundamental para resolver expressões complexas.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Tabela Resumo de De Morgan",
                  icone: "📊",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-xl border border-border/20">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-blue-500/20">
                              <th className="p-3 text-left text-blue-400 font-bold">
                                Expressão Original
                              </th>
                              <th className="p-3 text-left text-blue-400 font-bold">
                                Equivalente
                              </th>
                              <th className="p-3 text-left text-blue-400 font-bold">
                                Lei
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-t border-border/10">
                              <td className="p-3 font-mono">(A ∪ B)ᶜ</td>
                              <td className="p-3 font-mono text-emerald-400">
                                Aᶜ ∩ Bᶜ
                              </td>
                              <td className="p-3">1ª Lei</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3 font-mono">(A ∩ B)ᶜ</td>
                              <td className="p-3 font-mono text-emerald-400">
                                Aᶜ ∪ Bᶜ
                              </td>
                              <td className="p-3">2ª Lei</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3 font-mono">(Aᶜ)ᶜ</td>
                              <td className="p-3 font-mono text-emerald-400">
                                A
                              </td>
                              <td className="p-3">Duplo compl.</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3 font-mono">(Aᶜ ∩ Bᶜ)ᶜ</td>
                              <td className="p-3 font-mono text-emerald-400">
                                A ∪ B
                              </td>
                              <td className="p-3">1ª + Duplo</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3 font-mono">(Aᶜ ∪ Bᶜ)ᶜ</td>
                              <td className="p-3 font-mono text-emerald-400">
                                A ∩ B
                              </td>
                              <td className="p-3">2ª + Duplo</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-9" className="mt-16">
            <QuizInterativo
              questoes={quizDeMorgan}
              titulo="Quiz — Leis de De Morgan"
              icone="🔁"
              numero={9}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: SIMULADO FINAL ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado Final — Teoria dos Conjuntos"
          descricao="Revisão express de todas as fórmulas e estratégias de prova, seguida de 10 questões no estilo CESGRANRIO para você sair daqui pronto para gabaritar."
          gradiente="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Express — Todas as Fórmulas"
              description="Cole na mente antes de entrar na prova."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Formulário Completo de Conjuntos"
              icone="📋"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Operações Fundamentais",
                  icone: "⚙️",
                  conteudo:(
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-xl border border-border/20">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-amber-500/20">
                              <th className="p-3 text-left text-amber-400 font-bold">
                                Operação
                              </th>
                              <th className="p-3 text-left text-amber-400 font-bold">
                                Símbolo
                              </th>
                              <th className="p-3 text-left text-amber-400 font-bold">
                                Significado
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-t border-border/10">
                              <td className="p-3">União</td>
                              <td className="p-3 font-mono text-indigo-400">
                                A ∪ B
                              </td>
                              <td className="p-3">Está em A OU em B</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3">Interseção</td>
                              <td className="p-3 font-mono text-cyan-400">
                                A ∩ B
                              </td>
                              <td className="p-3">Está em A E em B</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3">Diferença</td>
                              <td className="p-3 font-mono text-rose-400">
                                A − B
                              </td>
                              <td className="p-3">Está em A mas NÃO em B</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3">Complementar</td>
                              <td className="p-3 font-mono text-emerald-400">
                                Aᶜ
                              </td>
                              <td className="p-3">Está em U mas NÃO em A</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3">Conj. das Partes</td>
                              <td className="p-3 font-mono text-blue-400">
                                P(A)
                              </td>
                              <td className="p-3">2ⁿ subconjuntos (n = |A|)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmulas de Cardinalidade",
                  icone: "🔢",
                  conteudo:(
                    <div className="space-y-3">
                      <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 font-mono text-xs">
                        <p className="text-indigo-400 font-bold mb-2">
                          2 Conjuntos:
                        </p>
                        <p className="text-muted-foreground">
                          |A ∪ B| = |A| + |B| − |A ∩ B|
                        </p>
                        <p className="text-muted-foreground">
                          Nenhum = |U| − |A ∪ B|
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 font-mono text-xs">
                        <p className="text-emerald-400 font-bold mb-2">
                          3 Conjuntos:
                        </p>
                        <p className="text-muted-foreground">
                          |A∪B∪C| = |A|+|B|+|C| − |A∩B| − |A∩C| − |B∩C| +
                          |A∩B∩C|
                        </p>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 font-mono text-xs">
                        <p className="text-blue-400 font-bold mb-2">
                          De Morgan:
                        </p>
                        <p className="text-muted-foreground">
                          (A∪B)ᶜ = Aᶜ ∩ Bᶜ &nbsp; | &nbsp; (A∩B)ᶜ = Aᶜ ∪ Bᶜ
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ModuleSectionHeader
              index={2}
              title="Estratégias de Prova CESGRANRIO"
              description="Como resolver qualquer questão de conjuntos em 90 segundos."
              variant="emerald"
              className="mb-6 mt-10"
            />

            <ContentAccordion
              titulo="🎯 Roteiro de Ataque: Passo a Passo Infalível"
              icone="🎯"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1️⃣ Identificação e Nomeação",
                  icone: "🔤",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Leia o enunciado e extraia o{" "}
                        <strong>Universo (|U|)</strong> e os conjuntos
                        principais. Não comece a calcular antes de nomear cada
                        grupo claramente.
                      </p>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          ✅ "Seja T o grupo dos técnicos da Refinaria e P o
                          grupo dos que passaram na prova prática."
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Macete">
                        Mantenha o total sempre visível. Se o total não for
                        dado, chame de X ou use porcentagem (100%).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "2️⃣ Diagrama 'De Dentro para Fora'",
                  icone: "⭕",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A regra de ouro: sempre comece preenchendo a{" "}
                        <strong>interseção tripla ou dupla</strong>. Se você
                        preencher as bordas primeiro, a conta nunca fechará.
                      </p>
                      <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                        <p className="text-sm line-through text-red-500">
                          ❌ Colocar o número total de A em sua região maior,
                          sem descontar quem também está em B.
                        </p>
                      </div>
                      <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">
                          ✅ "Determine primeiro quem fez T E P. Coloque o valor
                          no centro dos círculos e depois subtraia das bordas."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "3️⃣ Determinando a Interseção",
                  icone: "∩",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Se o enunciado der o total (|A∪B|) e os individuais (|A|
                        e |B|), a interseção sai num estalo pela fórmula de
                        inversão.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                        <p className="font-mono text-base font-bold text-indigo-400">
                          |A ∩ B| = |A| + |B| − |A ∪ B|
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Dica CESGRANRIO">
                        "Pelo menos um" em questões de concurso geralmente
                        significa que não há ninguém fora da união. |A∪B| =
                        Total.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "4️⃣ Inclusão-Exclusão Direta",
                  icone: "➕",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Calcule o valor de quem pertence a{" "}
                        <strong>apenas um</strong> conjunto subtraindo as
                        interseções. Lembre-se: |A ∪ B| = (A apenas) + (B
                        apenas) + (Interseção).
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-sm italic">
                          "Se total é 100, A é 60 e Inter é 20, então SOMENTE A
                          é 40."
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        Nota: Para 'Nenhum', subtraia o resultado da união do
                        universo total.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "5️⃣ Valide com De Morgan",
                  icone: "🔁",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Antes de fazer as contas, veja se a questão não pede o{" "}
                        <strong>complementar</strong>. Às vezes é mais fácil
                        calcular quem NÃO fez algo e subtrair do total.
                      </p>
                      <AlertBox tipo="success" titulo="Macetão">
                        'O complementar da união é a interseção dos
                        complementares'. Decore essa frase para simplificar
                        enunciados rebuscados.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="⚠️ Campo Minado: As 5 Armadilhas Clássicas"
              icone="⚠️"
              corIndicador="bg-rose-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Armadilha 1: √4 não é irracional",
                  icone: "🎯",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        √4 = 2 (inteiro, portanto racional). Só √n com n
                        não-quadrado-perfeito é irracional.
                      </p>
                      <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                        <p className="text-sm line-through text-red-500">
                          ❌ Acreditar que toda raiz é irracional.
                        </p>
                      </div>
                      <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                        <p className="text-sm font-bold text-green-600 dark:text-green-400">
                          ✅ "√9, √16, √25... são todos racionais (Z ⊂ Q)."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 2: A Tripla Interseção",
                  icone: "⭕",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Na fórmula de 3 conjuntos, |A∩B∩C| é SOMADO de volta
                        (não subtraído). Quem esquece isso perde a questão no
                        detalhe final.
                      </p>
                      <AlertBox tipo="warning" titulo="Dica">
                        Some os individuais, subtraia os pares, some a tripla
                        central.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 3: {0} ≠ ∅",
                  icone: "0️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {"{0}"} tem 1 elemento (o zero). ∅ = {"{}"} tem 0
                        elementos. São conjuntos completamente diferentes, mas a
                        banca os coloca lado a lado.
                      </p>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          "A cardinalidade de {0} é n=1. A de ∅ é n=0."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 4: Q ⊄ Z (é o contrário)",
                  icone: "🔢",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        ℤ ⊂ ℚ — os inteiros estão dentro dos racionais, não o
                        contrário. A banca inverte a ordem de inclusão para
                        forçar o erro conceitual.
                      </p>
                      <AlertBox tipo="danger" titulo="Não Esqueça">
                        Todo número que pode ser escrito como fração é racional.
                        Inteiros são frações com denominador 1.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 5: O termo 'Apenas'",
                  icone: "🎯",
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground italic">
                        Diferencie 'Candidatos que falam inglês' (|I|) de
                        'Candidatos que falam SOMENTE inglês' (|I| - |I∩E|).
                      </p>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 font-bold text-emerald-600 dark:text-emerald-400">
                        ✅ "Subtraia a interseção sempre que vir 'somente',
                        'apenas' ou 'exclusivamente'."
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-10" className="mt-16">
            <QuizInterativo
              questoes={quizSimulado}
              titulo="Simulado Final CESGRANRIO — Teoria dos Conjuntos"
              icone="🏆"
              numero={10}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
          {completedModules.has("modulo-10") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  🏆
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  CERTIFICADO DE ELITE
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Parabéns! Teoria dos Conjuntos dominada do zero ao avançado.
                  Inclusão-Exclusão, De Morgan e Conjuntos Numéricos na ponta
                  dos dedos para a CESGRANRIO.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}












