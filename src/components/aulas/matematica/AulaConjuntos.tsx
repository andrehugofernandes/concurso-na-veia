"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
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
  ModuleSkinVariant,
  QuestaoResolvidaStepByStep} from "../shared";
import { getModuleVariant, getAllModuleVariants } from "@/lib/moduleColors";
import {
  LuBookOpen,
  LuMusic,
  LuLayers,
  LuActivity,
  LuPackage,
  LuZap,
  LuCheck,
} from "react-icons/lu";
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

const mv = ["slate" as ModuleSkinVariant, ...getAllModuleVariants()];

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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
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
      updateCompletedModules(Array.from(s));
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
      {/* ═══ MÓDULO 1: FUNDAMENTOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Conjuntos"
          descricao="Domine os conceitos fundamentais: notação, pertinência, subconjuntos e propriedades."
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M1 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Conceito Fundamental de Conjunto"
            description="A pedra angular da Matemática moderna e seu lugar no edital CESGRANRIO"
            variant="blue"
          />

          <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
            <p>
              Um conjunto é definido como uma coleção bem definida de objetos
              chamados elementos. A palavra "bem definida" é crucial: significa
              que, dado qualquer objeto, você deve ser capaz de determinar com
              certeza absoluta se ele pertence ou não ao conjunto. Esta
              definição, embora simples, é a base de toda a Matemática moderna,
              incluindo lógica, análise e álgebra. Na teoria axiomática de
              conjuntos de Zermelo-Fraenkel, essa ideia intuitiva é formalizada
              através de axiomas rigorosos que garantem a consistência lógica da
              teoria. Para contexto, o matemático Georg Cantor desenvolveu a
              teoria dos conjuntos no final do século XIX, revolucionando como
              entendemos a própria estrutura da Matemática.
            </p>

            <p>
              Em termos práticos, quando falamos em conjuntos, pensamos em
              agrupamentos com características claramente definidas. Por
              exemplo, o conjunto das vogais da língua portuguesa {"{"}a, e, i,
              o, u{"}"} é bem definido porque sabemos exatamente quais são seus
              elementos. Já o conceito de "palavras bonitas da Matemática" não
              forma um conjunto matemático porque a característica "bonita" é
              subjetiva — diferentes pessoas concordariam ou discordariam sobre
              quais palavras são bonitas. Esta distinção entre o bem definido e
              o vago é absolutamente central na resolução de problemas de
              conjuntos em provas como a CESGRANRIO, onde questões
              frequentemente testam se o candidato consegue reconhecer o que é e
              o que não é um conjunto válido.
            </p>

            <p>
              Os elementos de um conjunto podem ser números, letras, objetos,
              pessoas, ou qualquer entidade matemática. Usamos a notação "a ∈ A"
              para indicar que o elemento 'a' pertence ao conjunto A, e "b ∉ A"
              para indicar que 'b' não pertence a A. Um conjunto pode ser finito
              (possuindo um número limitado de elementos) ou infinito (possuindo
              infinitos elementos). O conjunto dos números naturais ℕ = {"{"}0,
              1, 2, 3, ...{"}"} é infinito, enquanto o conjunto das letras do
              alfabeto é finito. Dois conjuntos são iguais se e somente se
              possuem exatamente os mesmos elementos, independentemente da ordem
              em que esses elementos são listados — assim, {"{"}1, 2, 3{"}"} ={" "}
              {"{"}3, 1, 2{"}"}. Existe também o conjunto vazio ∅, que não
              contém nenhum elemento, e ele é único e bem definido.
            </p>

            <p>
              Na indústria de petróleo e gás, conjuntos aparecem constantemente
              na modelagem de dados. Pense em um conjunto contendo todas as
              plataformas de exploração na Bacia de Campos, ou o conjunto de
              todos os poços ativos em um campo específico, ou ainda o conjunto
              de funcionários com certificação em segurança NR-35. Esses
              agrupamentos bem definidos permitem análises rápidas: quantas
              plataformas temos? Quais plataformas operam em águas profundas?
              Que funcionários podemos alocar para uma tarefa de risco? A
              CESGRANRIO valoriza essa contextualização, frequentemente
              inserindo exemplos Petrobras em questões sobre conjuntos para
              testar se o candidato consegue aplicar a teoria em cenários reais
              da empresa.
            </p>

            <div className="space-y-6">
              <p>
                A <strong>CESGRANRIO</strong> apresenta um padrão muito bem definido na cobrança de conjuntos, focando na aplicação prática do conceito em cenários de dados e diagramação lógica. Os quatro pilares de cobrança da banca são:
              </p>

              {/* Grid de Pilares de Cobrança */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                {[
                  { num: "1", title: "Classificação & Validação", text: "Reconhecer se um agrupamento de dados constitui um conjunto matematicamente válido sob critérios objetivos." },
                  { num: "2", title: "Contagem de Elementos", text: "Quantificar intersecções e subconjuntos a partir de cenários descritivos utilizando diagramas de Venn." },
                  { num: "3", title: "Operações Fundamentais", text: "Executar com precisão operações de união (∪), interseção (∩) e diferença (\\) entre bases de dados." },
                  { num: "4", title: "Aplicações de Propriedades", text: "Utilizar propriedades de inclusão e pertinência em problemas práticos de otimização de recursos." }
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 p-4 bg-muted/30 border border-border/10 rounded-xl">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-extrabold text-lg shrink-0">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-foreground text-xl">{item.title}</h5>
                      <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Assimétrico: Diagrama de Venn (Estilo Revista) */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground text-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    A Lógica do Diagrama de Venn
                  </h4>
                  <p>
                    As questões frequentemente usam <strong>diagramas de Venn</strong> para estabelecer relações visuais entre conjuntos. O segredo de prova da banca é exigir que o candidato trabalhe de forma sistemática.
                  </p>
                  <p>
                    A regra de ouro é <strong>sempre começar o preenchimento de dentro para fora</strong>: primeiro a interseção central (comum a todos os conjuntos), em seguida as interseções exclusivas de dois em dois, depois as partes exclusivas de cada conjunto e, por fim, a região externa (elementos que não pertencem a nenhum dos conjuntos pesquisados).
                  </p>
                </div>
                <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                  <div 
                    className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => setZoomedImage("/assets/images/matematica/conjuntos/modulo-1/intro.png")}
                  >
                    <img
                      src="/assets/images/matematica/conjuntos/modulo-1/intro.png"
                      // PROMPT: [MANDATÓRIO] Infográfico educacional limpo mostrando Diagrama de Venn com 3 conjuntos intersectados. Estilo Dark Premium, fundo escuro (#0a0f1d). Os círculos devem ter bordas brilhantes neon em azul-celeste, ciano e verde-esmeralda. No centro da interseção há um ícone de raio brilhante.
                      alt="Diagrama de Venn com três conjuntos intersectados"
                      className="w-full rounded-2xl border border-border/20 shadow-lg"
                    />
                  </div>
                  <p className="text-lg text-muted-foreground text-center">Fig 1. Fluxo de preenchimento do diagrama (de dentro para fora).</p>
                </div>
              </div>

              {/* Grid Comparativo de Erros Frequentes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2">
                  <h5 className="font-bold text-rose-400 flex items-center gap-2 text-xl">
                    <svg className="w-5 h-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Erro Clássico: Elemento vs Subconjunto
                  </h5>
                  <p className="text-xl text-foreground/85 leading-relaxed">
                    Confundir a relação de pertinência com a de inclusão. O número <code>3</code> é um <strong>elemento</strong> de <code>{"{"}1, 2, 3{"}"}</code> (3 ∈ A), mas o conjunto contendo o número, <code>{"{"}3{"}"}</code>, é um <strong>subconjunto</strong> ({"{"}3{"}"} ⊂ A).
                  </p>
                </div>

                <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                  <h5 className="font-bold text-amber-400 flex items-center gap-2 text-xl">
                    <svg className="w-5 h-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Atenção ao Conjunto Vazio ∅
                  </h5>
                  <p className="text-xl text-foreground/85 leading-relaxed">
                    O conjunto vazio <code>∅</code> (ou <code>{"{"} {"}"}</code>) não possui elements, mas é <strong>subconjunto de qualquer conjunto</strong> (∅ ⊂ A). Nunca escreva <code>{"{"}∅{"}"}</code> para se referir ao vazio, pois isso representa um conjunto unitário contendo o símbolo do vazio.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground text-2xl">
                Fórmula e Regra-Chave: Definição de Conjunto
              </h4>
              <div className="space-y-4 mt-2">
                <div>
                  <p className="font-semibold text-xl text-amber-700 dark:text-amber-300">
                    Condição de Pertinência
                  </p>
                  <p className="text-xl mt-1 text-foreground/85">
                    Para todo objeto x e todo conjunto A: OU x ∈ A OU x ∉ A. Não
                    existe meio termo na Matemática clássica.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-xl text-amber-700 dark:text-amber-300">
                    Igualdade de Conjuntos
                  </p>
                  <p className="text-xl mt-1 text-foreground/85">
                    A = B se, e somente se, para todo elemento x: x ∈ A ⟺ x ∈ B.
                    Ou seja, A e B contêm exatamente os mesmos elementos.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-xl text-amber-700 dark:text-amber-300">
                    Notação Simbólica
                  </p>
                  <p className="font-mono text-xl mt-1 text-foreground/85">
                    A = {"{"} x | P(x) {"}"} significa "o conjunto A contém
                    todos os x para os quais a propriedade P(x) é verdadeira"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é um Conjunto?"
              description="A pedra fundamental da Matemática para concursos."
              variant="blue"
              className="mb-6"
            />
            {/* ACORDEON 1: DEFINIÇÃO DE CONJUNTO */}
            <ContentAccordion
              titulo="O que é um Conjunto?"
              icone="💡"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição Intuitiva",
                  icone: "📐",
                  conteudo: (
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
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "1. Por Extensão",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        É a forma explícita de descrever. Todos os elementos são{" "}
                        <strong>listados um a um</strong> entre chaves,
                        separados por vírgula.
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        A forma algorítmica. O conjunto é definido por uma{" "}
                        <strong>propriedade ou regra</strong> que todos e apenas
                        os seus elementos precisam satisfazer.
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center font-mono">
                        <p className="text-xl text-foreground/85 leading-relaxed">A = {"{x | x é vogal}"}</p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
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
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "O Pertence",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        A relação de pertinência é a cola que liga
                        obrigatoriamente um{" "}
                        <strong>ELEMENTO solto a um CONJUNTO grande</strong>.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center mt-4">
                        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          <p className="text-3xl font-black text-amber-700 dark:text-amber-400">
                            ∈
                          </p>
                          <p className="font-bold mt-2">PERTENCE</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            x ∈ A (Elemento isolado no Conjunto)
                          </p>
                        </div>
                        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          <p className="text-3xl font-black text-amber-700 dark:text-amber-400">
                            ∉
                          </p>
                          <p className="font-bold mt-2">NÃO PERTENCE</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
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
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "O que é o Vazio?",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
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
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 shadow-sm mt-4">
                        <p className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                          🚨 Armadilhas Visuais de Prova
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-xl text-foreground leading-relaxed">
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
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "O que é Cardinalidade?",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Ocorre quando a cardinalidade é exata:{" "}
                        <strong>n(A) = 1</strong>.
                        <br />
                        Possui estritamente um único elemento.
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-center text-xl font-mono mt-2 text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Ocorre quando a cardinalidade é nula:{" "}
                        <strong>n(V) = 0</strong>. O conjunto é desabitado.
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-center text-xl font-mono mt-2 text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Acontece quando conseguimos terminar a contagem em algum
                        momento.
                        <strong>n(A)</strong> é um número real contável.
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-center text-xl font-mono mt-2 text-foreground/85 leading-relaxed">
                        Exemplo: <br />A = {"{dias da semana}"} <br />
                        n(A) = 7.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "4. Infinito",
                  icone: "♾️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Ocorre quando o número de elementos não possui fim. A
                        contagem jamais termina. Não é possível definir a sua
                        cardinalidade exata (n(A) tende ao Infinito).
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-center text-xl font-mono mt-2 text-foreground/85 leading-relaxed">
                        Exemplo Clássico: <br />C ={" "}
                        {"{todos os números primos existentes}"}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Subconjuntos e Conjunto Potência"
              description="A hierarquia das coleções: de um único elemento ao poder total dos conjuntos das partes."
              variant="blue"
              className="mb-8"
            />

            {/* INTRO C.E.D.E.A PARA SUBCONJUNTOS */}
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify mb-10">
              <p>
                <strong>Contexto:</strong> A relação de inclusão é a ferramenta
                que permite aos matemáticos e analistas organizar dados em
                hierarquias e categorias. Em concursos da CESGRANRIO, entender a
                diferença entre pertencer (elemento) e estar contido (conjunto)
                é o divisor de águas entre a aprovação e o erro bobo. No setor
                de energia, essa lógica é aplicada na classificação de ativos e
                recursos, onde um subconjunto de peças pode representar um
                sistema crítico dentro de uma plataforma.
              </p>
              <p>
                <strong>Explicação:</strong> Dizemos que um conjunto A é
                subconjunto de B (A ⊂ B) se, e somente se, todo elemento de A
                também for um elemento de B. Formalmente: A ⊂ B ⟺ (∀x)(x ∈ A ⟹ x
                ∈ B). Esta relação possui propriedades fundamentais: é reflexiva
                (A ⊂ A), antissimétrica (A ⊂ B e B ⊂ A ⟹ A = B) e transitiva (A
                ⊂ B e B ⊂ C ⟹ A ⊂ C). O conjunto vazio é universalmente aceito
                como subconjunto de qualquer conjunto (∅ ⊂ A).
              </p>
              <p>
                <strong>Demonstração:</strong> Considere o conjunto dos números
                pares P = {"{2, 4, 6}"} e o conjunto dos naturais N ={" "}
                {"{0, 1, 2, 3, 4, ...}"}. Como 2, 4 e 6 pertencem a N, afirmamos
                que P ⊂ N. Por outro lado, se tivéssemos Q = {"{2, 4, 11}"},
                embora 2 e 4 estejam em P, o elemento 11 não está, logo Q ⊄ P.
                Observe que a ordem ou a repetição nos conjuntos não altera a
                inclusão: {"{1, 2}"} ⊂ {"{2, 1, 3}"}.
              </p>
              <p>
                <strong>Expansão:</strong> O conceito mais poderoso aqui é o
                Conjunto Potência, ou Conjunto das Partes, denotado por P(A).
                Ele é o conjunto que contém todos os subconjuntos possíveis de
                um conjunto original A. Se um conjunto possui n elementos, seu
                conjunto potência terá exatamente 2^n elementos. Essa
                exponencialidade explica por que pequenos conjuntos podem gerar
                estruturas de dados complexas. Por exemplo, um conjunto com 10
                campos de petróleo pode ter 1.024 combinações diferentes de
                exploração (subconjuntos).
              </p>
              <p>
                <strong>Aplicação:</strong> Na CESGRANRIO, as questões costumam
                misturar símbolos ∈ e ⊂ para confundir o candidato. Lembre-se: ∈
                conecta ELEMENTO a CONJUNTO; ⊂ conecta CONJUNTO a CONJUNTO. Se
                você vê chaves em ambos os lados, provavelmente a relação é de
                inclusão. Outra pegadinha clássica é perguntar se o conjunto
                vazio pertence ao conjunto potência. A resposta é SIM: ∅ ∈ P(A)
                porque ∅ ⊂ A. Dominar essas sutilezas é o que garante os pontos
                nas questões de "V ou F".
              </p>
            </div>

            {/* GRID DE FLIPCARDS PREMIUM */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FlipCard
                variant="blue"
                frente={
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl text-amber-600">
                      <LuLayers />
                    </div>
                    <h3 className="text-xl font-bold">Relação de Inclusão</h3>
                    <p className="text-xl text-muted-foreground line-clamp-2 text-foreground/85 leading-relaxed">
                      O símbolo de 'estar contido' (⊂) conecta dois conjuntos.
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <h4 className="font-bold text-amber-600 flex items-center gap-2">
                      <LuCheck className="w-5 h-5" /> Regras de Ouro
                    </h4>
                    <ul className="space-y-2 text-xl list-disc pl-4 text-foreground/85 leading-relaxed">
                      <li>
                        <strong>Reflexiva:</strong> Todo conjunto está contido
                        em si mesmo (A ⊂ A).
                      </li>
                      <li>
                        <strong>Vazio:</strong> O vazio está em todos (∅ ⊂ A).
                      </li>
                      <li>
                        <strong>Totalidade:</strong> Se A = B, então A ⊂ B.
                      </li>
                    </ul>
                  </div>
                }
              />
              <FlipCard
                variant="blue"
                frente={
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl text-amber-600">
                      <LuActivity />
                    </div>
                    <h3 className="text-xl font-bold">Subconjunto Próprio</h3>
                    <p className="text-xl text-muted-foreground line-clamp-2 text-foreground/85 leading-relaxed">
                      Quando A está em B, mas eles não são iguais.
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <h4 className="font-bold text-amber-600 flex items-center gap-2">
                      <LuCheck className="w-5 h-5" /> A ⊊ B
                    </h4>
                    <div className="text-xl space-y-2 text-foreground/85 leading-relaxed">
                      <p>
                        Representado por <strong>A ⊊ B</strong> ou{" "}
                        <strong>A ⊂ B e A ≠ B</strong>.
                      </p>
                      <p className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
                        Significa que B tem pelo menos um elemento que A não
                        tem.
                      </p>
                    </div>
                  </div>
                }
              />
              <FlipCard
                variant="blue"
                frente={
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl text-amber-600">
                      <LuPackage />
                    </div>
                    <h3 className="text-xl font-bold">Conjunto das Partes</h3>
                    <p className="text-xl text-muted-foreground line-clamp-2 text-foreground/85 leading-relaxed">
                      O conjunto P(A) cujos elementos são subconjuntos.
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <h4 className="font-bold text-amber-600 flex items-center gap-2">
                      <LuCheck className="w-5 h-5" /> P(A) ou {"{2^A}"}
                    </h4>
                    <div className="text-xl space-y-2 text-foreground/85 leading-relaxed">
                      <p>Se A = {"{1, 2}"}, então:</p>
                      <p className="font-mono bg-background/50 p-2 rounded text-[10px]">
                        P(A) = {"{ ∅, {1}, {2}, {1, 2} }"}
                      </p>
                      <p className="text-lg text-foreground/85 leading-relaxed italic text-muted-foreground mt-2">
                        O vazio e o próprio A são sempre elementos de P(A).
                      </p>
                    </div>
                  </div>
                }
              />
              <FlipCard
                variant="blue"
                frente={
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl text-amber-600">
                      <LuZap />
                    </div>
                    <h3 className="text-xl font-bold">Potência de 2 (2ⁿ)</h3>
                    <p className="text-xl text-muted-foreground line-clamp-2 text-foreground/85 leading-relaxed">
                      A fórmula mágica para saber o número de subconjuntos.
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-4 text-left">
                    <h4 className="font-bold text-amber-600 flex items-center gap-2">
                      <LuCheck className="w-5 h-5" /> Por que 2ⁿ?
                    </h4>
                    <div className="text-xl space-y-2 text-foreground/85 leading-relaxed">
                      <p>Cada elemento do conjunto tem 2 escolhas:</p>
                      <ul className="list-disc pl-4 text-lg text-foreground/85 leading-relaxed">
                        <li>Entrar no subconjunto</li>
                        <li>Ficar de fora</li>
                      </ul>
                      <p className="mt-2 font-bold text-amber-600 text-center py-1 bg-amber-500/5 rounded">
                        2 × 2 × ... × 2 = 2ⁿ
                      </p>
                    </div>
                  </div>
                }
              />
            </div>

            <div className="mt-10 space-y-8">
              <AlertBox tipo="warning" titulo="Diferença Vital: ∈ vs ⊂">
                <div className="grid md:grid-cols-2 gap-6 mt-2">
                  <div className="space-y-2">
                    <p className="font-bold text-amber-700 dark:text-amber-400">
                      Elemento ∈ Conjunto
                    </p>
                    <p className="text-xl italic text-foreground/85 leading-relaxed">
                      "O operário pertence à equipe."
                    </p>
                    <code className="block bg-background/50 p-2 rounded text-lg text-foreground/85 leading-relaxed">
                      Se A = {"{1, 2}"}, então 1 ∈ A.
                    </code>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-amber-700 dark:text-amber-400">
                      Subconjunto ⊂ Conjunto
                    </p>
                    <p className="text-xl italic text-foreground/85 leading-relaxed">
                      "A equipe pertence à Petrobras."
                    </p>
                    <code className="block bg-background/50 p-2 rounded text-lg text-foreground/85 leading-relaxed">
                      Se A = {"{1, 2}"}, então {"{1}"} ⊂ A.
                    </code>
                  </div>
                </div>
              </AlertBox>

              <ContentAccordion
                titulo="Demonstração Exaustiva: P(A) na Prática"
                icone="🔍"
                corIndicador="bg-amber-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Conjunto com 3 Elementos",
                    icone: "3️⃣",
                    conteudo: (
                      <div className="space-y-4">
                        <p>
                          Seja <strong>A = {"{P1, P2, P3}"}</strong>. Vamos
                          listar todos os <strong>2³ = 8</strong> subconjuntos:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="p-3 bg-card border border-border rounded-lg text-center">
                            <span className="text-lg text-foreground/85 leading-relaxed text-muted-foreground block mb-1">
                              Vazio
                            </span>
                            <span className="font-mono">∅</span>
                          </div>
                          {[
                            "{P1}",
                            "{P2}",
                            "{P3}",
                            "{P1, P2}",
                            "{P1, P3}",
                            "{P2, P3}",
                            "{P1, P2, P3}",
                          ].map((s) => (
                            <div
                              key={s}
                              className="p-3 bg-card border border-border rounded-lg text-center"
                            >
                              <span className="text-lg text-foreground/85 leading-relaxed text-muted-foreground block mb-1">
                                {s.length <= 4
                                  ? "Unitário"
                                  : s.length <= 8
                                    ? "Binário"
                                    : "Próprio"}
                              </span>
                              <span className="font-mono">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Explicação das Chaves",
                    icone: "🔑",
                    conteudo: (
                      <div className="space-y-4">
                        <p>
                          Note que no Conjunto das Partes, cada elemento deve
                          ser um conjunto. Ou seja, se o elemento original era{" "}
                          <strong>1</strong>, no P(A) ele aparece como{" "}
                          <strong>{"{1}"}</strong>.
                        </p>
                        <AlertBox tipo="info" titulo="O Vazio">
                          O vazio não leva chaves extras (a menos que seja um
                          conjunto cujo elemento é o vazio). Ele é simplesmente{" "}
                          <strong>∅</strong>.
                        </AlertBox>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </section>

          <section id="quiz-modulo-1" className="mt-16">
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A relação CORRETA de inclusão entre conjuntos numéricos é:"
          alternativas={[
            { letra: "A", texto: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", correta: true },
              { letra: "B", texto: "ℤ ⊂ ℕ ⊂ ℚ ⊂ ℝ", correta: false },
              { letra: "C", texto: "ℚ ⊂ ℤ ⊂ ℕ ⊂ ℝ", correta: false },
              { letra: "D", texto: "ℕ ⊂ ℚ ⊂ ℤ ⊂ ℝ", correta: false },
              { letra: "E", texto: "ℝ ⊂ ℚ ⊂ ℤ ⊂ ℕ", correta: false }
          ]}
          dicaEstrategica="Cada conjunto"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Naturais (ℕ) ⊂ Inteiros (ℤ) ⊂ Racionais (ℚ) ⊂ Reais (ℝ)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={3}
              moduloNumero={1}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 1",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Mapa de Conjuntos — Conceitos Fundamentais",
                    type: "Mapa Mental",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme #FFFDF4, estilo concurseira. Cores: teal #00897B, rosa #E91E8C, âmbar #FF8F00. Node central (teal): CONJUNTOS. Ramos: Definição (coleção bem definida), Notação (x ∈ A, x ∉ A), Representação (extensão/compreensão/Venn), Cardinalidade (n(A)), Conjunto Vazio (∅ ⊂ A). Setas curvas, tipografia cursiva+bold caps. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-1/m1-conceito.png",
                  },
                  {
                    title: "Pertinência, Inclusão e Igualdade",
                    type: "Passo a Passo",
                    placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: rosa #E91E8C, teal #00897B. Título no topo (caixa rosa): RELAÇÕES ENTRE CONJUNTOS. Fluxo com setas ↓: Caixa 1 (teal): PERTINÊNCIA ∈/∉ → elemento↔conjunto. Caixa 2 (rosa): INCLUSÃO ⊂/⊄ → conjunto↔conjunto. Caixa 3 (âmbar): IGUALDADE A=B → mesmos elementos. Destaque central: ∅ ⊂ A sempre! Exemplo: Se A={1,2,3}: 1∈A ✅  {1}∈A ❌  {1}⊂A ✅. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-1/m1-formula.png",
                  },
                  {
                    title: "Pegadinhas CESGRANRIO — ∈ vs ⊂",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho #E53935 (errado), âmbar (aviso). Título: ⚠️ PEGADINHAS — CONJUNTOS. Grid 2 colunas: ✅ CORRETO | ❌ ERRADO: '1 ∈ {1,2,3}' vs '{1} ∈ {1,2,3}'; '{1} ⊂ {1,2,3}' vs '1 ⊂ {1,2,3}'; '∅ ⊂ A (sempre!)' vs '∅ ∈ A (nem sempre)'; '{∅} ≠ ∅' vs 'Confundir {∅} com ∅'. Caixa âmbar: ⚠️ ∈ é para ELEMENTO | ⊂ é para CONJUNTO. Caixa teal: 💡 MACETE: Chaves dos dois lados → use ⊂. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-1/m1-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: O Pulo do Gato",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">🎯 🔍 📦</div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "O <strong>Elemento (∈)</strong> entra na casa, mas o{" "}
                      <strong>Subconjunto (⊂)</strong> leva a casa inteira nas
                      costas."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                          Pertinência (∈)
                        </h4>
                        <p className="text-lg text-muted-foreground italic">
                          "O óleo no poço."
                        </p>
                        <p className="text-xl mt-2 font-black text-amber-700 dark:text-amber-300 text-foreground/85 leading-relaxed">
                          CONEXÃO: Elemento → Conjunto. ✅
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                          Inclusão (⊂)
                        </h4>
                        <p className="text-lg text-muted-foreground italic">
                          "O poço na plataforma."
                        </p>
                        <p className="text-xl mt-2 font-black text-emerald-700 dark:text-emerald-300 text-foreground/85 leading-relaxed">
                          CONEXÃO: Conjunto → Conjunto. ✅
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizFundamentos}
              titulo="QUIZ: Fundamentos"
              icone="🧠"
              numero={4}
              variant="blue"
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
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M2 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Operações com Conjuntos: Fundamentos e Aplicações"
            description="Dominando união, interseção, diferença e complemento"
            variant="blue"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              As operações com conjuntos constituem os procedimentos fundamentais para manipular e relacionar diferentes agrupamentos de dados na Matemática moderna. Assim como a aritmética tradicional utiliza operadores como soma e subtração para gerar novos valores numéricos, a teoria dos conjuntos opera sobre coleções de elementos usando ferramentas lógicas específicas. As quatro operações que estruturam toda essa dinâmica são a união (∪), a interseção (∩), a diferença (-) e o complementar ('). A compreensão aprofundada destas operações é de suma importância para provas técnicas da banca CESGRANRIO, que valoriza a habilidade do candidato em transitar com segurança entre definições formais, notações simbólicas e aplicações práticas.
            </p>

            <p>
              Em cenários industriais e administrativos de grande escala, como os encontrados rotineiramente na Petrobras, as operações de conjuntos funcionam como as engrenagens de grandes sistemas de consulta a bancos de dados. A manipulação adequada de grandes volumes de informação de refino, manutenção de poços ou alocação de equipes operacionais exige a aplicação sistemática de filtros de inclusão e exclusão de conjuntos. O domínio de suas leis e propriedades algébricas, portanto, vai muito além do simples cálculo de elementos, estendendo-se à lógica booleana que governa a programação de algoritmos e as consultas SQL.
            </p>

            <p>
              A operação de união (A ∪ B) consiste na consolidação de todos os elementos contidos no conjunto A, no conjunto B, ou em ambos, sem que haja qualquer duplicação na listagem final. Matematicamente, dizemos que A ∪ B = {"{"}x | x ∈ A ∨ x ∈ B{"}"}. Por outro lado, a interseção (A ∩ B) restringe o resultado apenas aos elementos comuns, isto é, aqueles que pertencem simultaneamente a ambos os conjuntos: A ∩ B = {"{"}x | x ∈ A ∧ x ∈ B{"}"}. Quando não há elementos compartilhados (A ∩ B = ∅), os conjuntos são chamados disjuntos.
            </p>

            <p>
              A diferença entre dois conjuntos (A - B) resulta no conjunto contendo os elementos exclusivos de A que não possuem qualquer vínculo com B: A - B = {"{"}x | x ∈ A ∧ x ∉ B{"}"}. Esta operação é assimétrica, ou seja, A - B geralmente difere de B - A. Já o complementar (A' ou A^c) representa todos os elementos pertencentes ao conjunto universal U que não estão contidos no conjunto A. O complementar é sempre relativo a esse universo predefinido: A' = {"{"}x ∈ U | x ∉ A{"}"}.
            </p>

            <div className="space-y-6">
              <p>
                A banca <strong>CESGRANRIO</strong> costuma cobrar esses conceitos a partir de três abordagens operacionais críticas, exigindo do candidato o reconhecimento rápido de cada propriedade e a aplicação de equivalências lógicas:
              </p>

              {/* Grid de Cards das Operações */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                {[
                  { num: "1", title: "União vs Interseção", text: "Separar claramente a inclusão ampla de elementos (conectivo lógico 'OU') da restrição simultânea (conectivo lógico 'E')." },
                  { num: "2", title: "Diferença Simétrica", text: "Diferenciar a exclusão simples de elementos comuns (A - B) da união das exclusões exclusivas bilaterais." },
                  { num: "3", title: "Leis de De Morgan", text: "Aplicar a negação lógica da união ou interseção, transformando-as em suas operações duais equivalentes." }
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 p-4 bg-muted/30 border border-border/10 rounded-xl">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-extrabold text-lg shrink-0">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-foreground text-xl">{item.title}</h5>
                      <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Assimétrico com Imagem (Estilo Revista) */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground text-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    Representação Visual das Operações
                  </h4>
                  <p>
                    O uso do <strong>diagrama de Venn</strong> é a forma mais segura de mapear e resolver as interseções. Na prova, o preenchimento deve ocorrer sempre da interseção de maior grau para as regiões externas periféricas.
                  </p>
                  <p>
                    Para resolver problemas descritivos de três conjuntos (A, B e C), comece preenchendo a interseção tríplice (A ∩ B ∩ C). Subtraia esse valor das interseções duplas correspondentes para evitar a dupla contagem e, na sequência, isole os elementos pertencentes exclusivamente a cada conjunto.
                  </p>
                </div>
                <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                  <div 
                    className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => setZoomedImage("/assets/images/matematica/conjuntos/modulo-2/intro.png")}
                  >
                    <img
                      src="/assets/images/matematica/conjuntos/modulo-2/intro.png"
                      // PROMPT: [MANDATÓRIO] Infográfico educacional limpo ilustrando as 4 operações de conjuntos (união, interseção, diferença e complementar). Estilo Dark Premium, fundo escuro (#0a0f1d). Os conjuntos possuem contornos finos brilhantes neon em azul-celeste, ciano e verde-esmeralda. As áreas operadas aparecem preenchidas com um gradiente luminoso suave.
                      alt="Legenda: As 4 operações fundamentais em diagramas de Venn"
                      className="w-full rounded-2xl border border-border/20 shadow-lg"
                    />
                  </div>
                  <p className="text-lg text-muted-foreground text-center">Fig 1. Relações de pertinência nas 4 operações básicas.</p>
                </div>
              </div>

              {/* Grid Comparativo de Erros Frequentes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2">
                  <h5 className="font-bold text-rose-400 flex items-center gap-2 text-xl">
                    <svg className="w-5 h-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Erro Comum: Contagem Dupla na União
                  </h5>
                  <p className="text-lg text-foreground/85 leading-relaxed">
                    Somar simplesmente a cardinalidade de A com a de B para achar a união: <code>n(A ∪ B) = n(A) + n(B)</code>. Isso gera contagem dupla dos elementos comuns! O correto é sempre subtrair a interseção: <code>n(A ∪ B) = n(A) + n(B) - n(A ∩ B)</code>.
                  </p>
                </div>

                <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                  <h5 className="font-bold text-amber-400 flex items-center gap-2 text-xl">
                    <svg className="w-5 h-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cuidado com o Complementar de A'
                  </h5>
                  <p className="text-lg text-foreground/85 leading-relaxed">
                    Esquecer que o complementar do complementar de um conjunto o retorna ao estado original: <code>(A')' = A</code>. Essa lei da involução é extremamente útil para simplificar enunciados com negações duplas ou redundantes da CESGRANRIO.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                As 4 Operações Fundamentais
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-semibold text-xl text-blue-700 dark:text-blue-300 text-foreground/85 leading-relaxed">
                    União (A ∪ B)
                  </div>
                  <div className="text-xl text-foreground/85 leading-relaxed">
                    Todos os elementos de A OU B: A ∪ B = {"{"}x | x ∈ A ∨ x ∈ B{"}"}
                  </div>
                  <div className="text-xl italic text-foreground/85 leading-relaxed">
                    Exemplo: {"{"}1,2{"}"} ∪ {"{"}2,3{"}"} = {"{"}1,2,3{"}"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-xl text-blue-700 dark:text-blue-300 text-foreground/85 leading-relaxed">
                    Interseção (A ∩ B)
                  </div>
                  <div className="text-xl text-foreground/85 leading-relaxed">
                    Apenas elementos em AMBOS: A ∩ B = {"{"}x | x ∈ A ∧ x ∈ B{"}"}
                  </div>
                  <div className="text-xl italic text-foreground/85 leading-relaxed">
                    Exemplo: {"{"}1,2{"}"} ∩ {"{"}2,3{"}"} = {"{"}2{"}"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-xl text-blue-700 dark:text-blue-300 text-foreground/85 leading-relaxed">
                    Diferença (A - B)
                  </div>
                  <div className="text-xl text-foreground/85 leading-relaxed">
                    Elementos em A mas não em B: A - B = {"{"}x | x ∈ A ∧ x ∉ B{"}"}
                  </div>
                  <div className="text-xl italic text-foreground/85 leading-relaxed">
                    Exemplo: {"{"}1,2{"}"} - {"{"}2,3{"}"} = {"{"}1{"}"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-xl text-blue-700 dark:text-blue-300 text-foreground/85 leading-relaxed">
                    Complemento (A')
                  </div>
                  <div className="text-xl text-foreground/85 leading-relaxed">
                    Tudo que NÃO está em A: A' = {"{"}x | x ∈ U ∧ x ∉ A{"}"}
                  </div>
                  <div className="text-xl italic text-foreground/85 leading-relaxed">
                    Se U={"{"}1,2,3{"}"} e A={"{"}1,2{"}"}, então A'={"{"}3{"}"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="União (∪) e Interseção (∩)"
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Somar Conjuntos"
              icone="🤝"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "União (A ∪ B)",
                  icone: "➕",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        A <strong>união</strong> de dois conjuntos A e B forma
                        um novo conjunto contendo{" "}
                        <strong>TODOS os elementos</strong> de A, juntamente com
                        todos os elementos de B, garantindo que{" "}
                        <strong>não haja repetições</strong>.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                        <p className="font-mono text-lg font-bold">
                          A ∪ B = {"{x | x ∈ A ou x ∈ B}"}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                          📝 Exemplo Resolvido
                        </p>
                        <p className="text-xl font-mono mb-2 text-foreground/85 leading-relaxed">
                          A = {"{1, 2, 3}"}
                          <br />B = {"{3, 4, 5}"}
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
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
              corIndicador="bg-blue-500"
              slides={[
                {
                  titulo: "Conceito",
                  icone: "🔍",
                  conteudo: (
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
              variant="blue"
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
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
                        <p className="text-xl font-mono mb-2 text-foreground/85 leading-relaxed">
                          A = {"{1, 2, 3, 4}"}
                          <br />B = {"{3, 4, 5, 6}"}
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
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
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center font-mono font-bold">
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
          <section id="quiz-modulo-2" className="mt-16">
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A relação CORRETA de inclusão entre conjuntos numéricos é:"
          alternativas={[
            { letra: "A", texto: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", correta: true },
              { letra: "B", texto: "ℤ ⊂ ℕ ⊂ ℚ ⊂ ℝ", correta: false },
              { letra: "C", texto: "ℚ ⊂ ℤ ⊂ ℕ ⊂ ℝ", correta: false },
              { letra: "D", texto: "ℕ ⊂ ℚ ⊂ ℤ ⊂ ℝ", correta: false },
              { letra: "E", texto: "ℝ ⊂ ℚ ⊂ ℤ ⊂ ℕ", correta: false }
          ]}
          dicaEstrategica="Cada conjunto"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Naturais (ℕ) ⊂ Inteiros (ℤ) ⊂ Racionais (ℚ) ⊂ Reais (ℝ)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={3}
              moduloNumero={2}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 2",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title:
                      "Mapa das 4 Operações — União, ∩, Diferença, Complementar",
                    type: "Mapa Mental",
                    placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: azul #1565C0, verde #43A047, rosa #E91E8C. Node central (azul): OPERAÇÕES. Ramos: União ∪ (todos os elementos, sem repetir), Interseção ∩ (elementos em comum), Diferença A-B (exclusivos de A), Complementar A' (fora de A no universo). Cada ramo com símbolo grande e exemplo curto. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-2/m2-conceito.png",
                  },
                  {
                    title: "Como Resolver com Diagrama de Venn",
                    type: "Passo a Passo",
                    placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: azul #1565C0, verde #43A047. Título (azul): ESTRATÉGIA DO DIAGRAMA DE VENN. Passos: 1️⃣ Desenhe os círculos. 2️⃣ Preencha a interseção A∩B primeiro. 3️⃣ Complete A exclusivo e B exclusivo. 4️⃣ Calcule o total: n(A∪B) = n(A)+n(B)-n(A∩B). Fórmula destacada em caixa azul grande. Exemplo numérico resolvido passo a passo. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-2/m2-formula.png",
                  },
                  {
                    title: "Pegadinhas CESGRANRIO — Operações",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: verde (correto), vermelho (errado), âmbar (aviso). Título: ⚠️ PEGADINHAS — OPERAÇÕES. Grid: ✅ n(A∪B)=n(A)+n(B)-n(A∩B) vs ❌ n(A∪B)=n(A)+n(B). ✅ A-B ≠ B-A vs ❌ Diferença é comutativa. ✅ Complementar depende do Universo vs ❌ Complementar é fixo. Caixa âmbar: ⚠️ Sempre subtrair a interseção na fórmula da União! Caixa verde: 💡 MACETE: De dentro pra fora no Venn. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-2/m2-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: Operações Dinâmicas",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">
                      ➕ 🎯 ✂️ 🧱
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "A <strong>União (∪)</strong> abraça todos os elementos, a{" "}
                      <strong>Interseção (∩)</strong> foca no coração comum, e a{" "}
                      <strong>Diferença</strong> separa o que é exclusivo."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>➕</span> UNIÃO (OU)
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Soma dos elementos sem repetir.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>🎯</span> INTERSEÇÃO (E)
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Elementos que estão em AMBOS.</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>✂️</span> DIFERENÇA
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Apenas o que pertence ao primeiro.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>🧱</span> COMPLEMENTAR
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          O resto do universo (fora de A).
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizOperacoes}
              titulo="QUIZ: Operações"
              icone="⚙️"
              numero={3}
              variant="blue"
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
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M3 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Diagramas de Venn: Linguagem Visual de Conjuntos"
            description="Ferramentas gráficas para resolver problemas com precisão"
            variant="blue"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>
              Os diagramas de Venn representam a ferramenta visual mais poderosa e intuitiva para o estudo da teoria dos conjuntos e suas relações de cardinalidade. Ao traduzir operações algébricas abstratas em formas geométricas simples, como círculos sobrepostos contidos em um plano retangular que delimita o conjunto universo, o diagrama simplifica a visualização lógica de interseções complexas. O matemático e filósofo John Venn concebeu essa abordagem sistemática em 1880, e desde então ela tem sido a base para a resolução de problemas de probabilidade, estatística e lógica sentencial em exames de alto nível.
            </p>

            <p>
              A importância acadêmica e prática dos diagramas reside na sua capacidade de estruturar o raciocínio analítico. Em problemas de concurso, especialmente na banca CESGRANRIO, as informações costumam ser transmitidas de maneira sobreposta e dispersa no enunciado. Sem uma ferramenta de mapeamento geográfico das informações, o candidato corre o risco de cair em armadilhas de contagem repetida de elementos. A correta distribuição espacial dos dados no diagrama serve, portanto, como um escudo de precisão matemática e agilidade de prova.
            </p>

            <p>
              A cardinalidade de um conjunto, denotada simbolicamente por |A| ou n(A), expressa a quantidade exata de elementos pertencentes àquele agrupamento. Para conjuntos finitos, a cardinalidade é calculada por contagem simples, enquanto o conjunto vazio (∅) possui cardinalidade zero. Um dos teoremas fundamentais relacionados a essa métrica é o fato de que um conjunto finito composto por 'n' elementos distintos é capaz de gerar exatamente 2^n subconjuntos. Esse agrupamento de todos os subconjuntos possíveis forma o chamado Conjunto das Partes, P(A), cuja cardinalidade cresce exponencialmente à medida que adicionamos novos elementos à base original.
            </p>

            <p>
              Para relacionar as cardinalidades de conjuntos que se intersectam, utilizamos o Teorema da Inclusão-Exclusão. Em sua forma mais simples, aplicável a dois conjuntos A e B, a fórmula estabelece que a cardinalidade da união é a soma dos totais individuais subtraída de sua interseção comum: |A ∪ B| = |A| + |B| - |A ∩ B|. Essa subtração é o mecanismo matemático necessário para anular a dupla contagem dos elementos que pertencem simultaneamente a ambos os grupos, garantindo um resultado estatístico exato.
            </p>

            <div className="space-y-6">
              <p>
                O preenchimento eficaz de um diagrama de Venn de três conjuntos requer uma estratégia procedural rigorosa. A regra fundamental é executar a distribuição de dados sempre **de dentro para fora**, seguindo estes quatro passos estruturados:
              </p>

              {/* Grid de Passos de Preenchimento */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                {[
                  { num: "1", title: "Interseção Tríplice", text: "Identifique e preencha primeiro a região central (A ∩ B ∩ C), que pertence a todos os grupos." },
                  { num: "2", title: "Interseções Duplas", text: "Complete as interseções de dois conjuntos, lembrando de subtrair o valor já preenchido na interseção tríplice." },
                  { num: "3", title: "Elementos Exclusivos", text: "Preencha as regiões externas de cada círculo, subtraindo todas as interseções já calculadas do total do conjunto." },
                  { num: "4", title: "Universo Externo", text: "Calcule a região externa aos círculos, subtraindo a união dos três conjuntos do total do universo de dados." }
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 p-4 bg-muted/30 border border-border/10 rounded-xl">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 font-extrabold text-lg shrink-0">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h5 className="font-bold text-foreground text-xl">{item.title}</h5>
                      <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Assimétrico com Imagem (Estilo Revista) */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground text-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Mapeando as 8 Regiões de Prova
                  </h4>
                  <p>
                    Ao trabalhar com três conjuntos, o diagrama divide o espaço universal em exatamente **oito regiões disjuntas**. Cada uma delas carrega um significado lógico e operacional específico.
                  </p>
                  <p>
                    Na prática, em problemas da Petrobras sobre múltiplos critérios de qualidade ou certificações de segurança, essas regiões correspondem aos diferentes perfis dos funcionários, poços ou plantas analisadas. Identificar se o enunciado refere-se ao termo restritivo "somente" ou ao termo amplo "pelo menos" define o sucesso da resolução.
                  </p>
                </div>
                <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                  <div 
                    className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => setZoomedImage("/assets/images/matematica/conjuntos/modulo-3/intro.png")}
                  >
                    <img
                      src="/assets/images/matematica/conjuntos/modulo-3/intro.png"
                      alt="Legenda: Divisão clássica de 8 regiões no diagrama de Venn"
                      className="w-full rounded-2xl border border-border/20 shadow-lg"
                    />
                  </div>
                  <p className="text-lg text-muted-foreground text-center">Fig 1. Mapeamento das 8 sub-regiões exclusivas.</p>
                </div>
              </div>

              {/* Grid Comparativo de Erros Frequentes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2">
                  <h5 className="font-bold text-rose-400 flex items-center gap-2 text-xl">
                    <svg className="w-5 h-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Erro Fatal: Soma Direta de Totais
                  </h5>
                  <p className="text-lg text-foreground/85 leading-relaxed">
                    Somar cruamente as cardinalidades de cada grupo informadas na prova sem realizar as deduções das interseções. Isso infla o total e gera resultados errôneos maiores que o próprio conjunto universo.
                  </p>
                </div>

                <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                  <h5 className="font-bold text-amber-400 flex items-center gap-2 text-xl">
                    <svg className="w-5 h-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Dica de Prova: Cuidado com a Palavra "Apenas"
                  </h5>
                  <p className="text-lg text-foreground/85 leading-relaxed">
                    "Apenas A" refere-se à região isolada de A. "Conjunto A" engloba todas as interseções em que A participa. Sempre deduza as interseções ao preencher regiões denominadas apenas por sua letra de origem.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                Fórmulas Fundamentais de Cardinalidade
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-emerald-200 dark:border-emerald-700">
                  <p className="font-mono text-xl font-semibold text-foreground/85 leading-relaxed">
                    |A ∪ B| = |A| + |B| - |A ∩ B|
                  </p>
                  <p className="text-xl mt-1 text-foreground/85 leading-relaxed">
                    Cardinalidade de dois conjuntos: soma dos totais subtraída da interseção simples.
                  </p>
                </div>
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-emerald-200 dark:border-emerald-700">
                  <p className="font-mono text-xl font-semibold text-foreground/85 leading-relaxed">
                    |A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|
                  </p>
                  <p className="text-xl mt-1 text-foreground/85 leading-relaxed">
                    Teorema de inclusão-exclusão para três conjuntos: some individuais, deduza interseções duplas e reinsira a interseção tríplice central.
                  </p>
                </div>
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-emerald-200 dark:border-emerald-700">
                  <p className="font-mono text-xl font-semibold text-foreground/85 leading-relaxed">
                    n(Subconjuntos) = 2^n
                  </p>
                  <p className="text-xl mt-1 text-foreground/85 leading-relaxed">
                    Total de combinações de subconjuntos possíveis com base na cardinalidade original do conjunto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é e Por Que Usar?",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Os Diagramas de Venn representam conjuntos usando curvas
                        fechadas (geralmente círculos) dentro de um retângulo
                        que representa o Conjunto Universo (U). Eles são a{" "}
                        <strong>ferramenta visual definitiva</strong> para
                        resolver problemas de contagem que envolvem grupos com
                        elementos em comum.
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-800 dark:text-emerald-300">
                          A Estrutura Visual:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-xl text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
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
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula para 2 Conjuntos",
                  icone: "2️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Quando você soma o total do conjunto A com o total do
                        conjunto B, os elementos que pertencem a ambos (a
                        interseção) são contados DUAS vezes. Por isso,
                        precisamos{" "}
                        <strong>subtrair essa interseção uma vez</strong> para
                        achar o total real da união.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center shadow-inner">
                        <p className="text-lg font-bold font-mono text-emerald-800 dark:text-emerald-300">
                          n(A ∪ B) = n(A) + n(B) − n(A ∩ B)
                        </p>
                      </div>
                      <div className="bg-card p-4 rounded-xl border border-border">
                        <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">
                          Exemplo Passo a Passo (Prova):
                        </p>
                        <p className="text-xl italic mb-2 text-foreground/85 leading-relaxed">
                          "Numa plataforma com 120 trabalhadores, 80 têm curso
                          NR-10 e 60 têm NR-13. Se todos têm pelo menos um,
                          quantos têm os dois?"
                        </p>
                        <ul className="text-lg text-foreground/85 leading-relaxed space-y-1">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Com três conjuntos (A, B e C), a soma direta cria
                        sobreposições complexas. A fórmula expansiva corrige
                        isso:
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center overflow-x-auto">
                        <p className="text-xl font-bold font-mono text-emerald-800 dark:text-emerald-300 text-foreground/85 leading-relaxed">
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
          <section id="quiz-modulo-3" className="mt-16">
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A relação CORRETA de inclusão entre conjuntos numéricos é:"
          alternativas={[
            { letra: "A", texto: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", correta: true },
              { letra: "B", texto: "ℤ ⊂ ℕ ⊂ ℚ ⊂ ℝ", correta: false },
              { letra: "C", texto: "ℚ ⊂ ℤ ⊂ ℕ ⊂ ℝ", correta: false },
              { letra: "D", texto: "ℕ ⊂ ℚ ⊂ ℤ ⊂ ℝ", correta: false },
              { letra: "E", texto: "ℝ ⊂ ℚ ⊂ ℤ ⊂ ℕ", correta: false }
          ]}
          dicaEstrategica="Cada conjunto"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Naturais (ℕ) ⊂ Inteiros (ℤ) ⊂ Racionais (ℚ) ⊂ Reais (ℝ)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={3}
              moduloNumero={3}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 3",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Anatomia do Diagrama de Venn",
                    type: "Mapa Mental",
                    placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: verde #43A047, teal #00897B, âmbar. Node central: DIAGRAMA DE VENN. Ramos: 2 conjuntos (regiões I, II, III, IV), 3 conjuntos (7 regiões + exterior), Universo U (retângulo), Regiões exclusivas vs interseção. Diagrama visual dos círculos sobrepostos no centro da imagem com regiões coloridas. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-3/m3-conceito.png",
                  },
                  {
                    title: "Método de Resolução — 3 Conjuntos",
                    type: "Passo a Passo",
                    placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: verde #43A047, teal #00897B. Título: ESTRATÉGIA 3 CONJUNTOS. Passos numerados com setas: 1️⃣ Marque A∩B∩C (interseção tripla). 2️⃣ Marque as interseções duplas (AB, AC, BC) subtraindo a tripla. 3️⃣ Marque os exclusivos de cada conjunto. 4️⃣ Some tudo e compare com o total. Fórmula: n(A∪B∪C)=n(A)+n(B)+n(C)-n(A∩B)-n(A∩C)-n(B∩C)+n(A∩B∩C). Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-3/m3-formula.png",
                  },
                  {
                    title: "Pegadinhas — Venn na CESGRANRIO",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar (aviso). Título: ⚠️ PEGADINHAS — VENN. Grid: ✅ Começa pela interseção tripla vs ❌ Começa pelos exclusivos. ✅ 'Somente A' = A exclusivo vs ❌ 'Somente A' = n(A). ✅ Nem A nem B = fora dos círculos vs ❌ Nem A nem B = zero. Caixa âmbar: ⚠️ 'Somente' vs 'Ao menos' são conceitos opostos! Caixa teal: 💡 MACETE: De dentro para fora — tripla primeiro! Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-3/m3-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: O Poder dos Círculos",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">⭕ ⭕ 🧮</div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Para não errar Venn: comece SEMPRE pela{" "}
                      <strong>interseção mais interna</strong>. Ela é o coração
                      do diagrama e evita que você conte o mesmo elemento duas
                      vezes."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>🎯</span> INTERSEÇÃO PRIMEIRO
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Distribua de dentro para fora.
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>🔍</span> APENAS / SOMENTE
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Subtraia as interseções do total.
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>🌍</span> UNIVERSO (U)
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Quem não está nos círculos? Calcule!
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>🧮</span> CARDINALIDADE
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          A soma total deve bater com o Universo.
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizVenn}
              titulo="QUIZ: Diagramas de Venn"
              icone="⭕"
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
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M4 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Conjuntos Numéricos: A Hierarquia dos Números"
            description="De naturais a reais: construindo a estrutura do sistema numérico"
            variant="blue"
          />

          <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
            <p>
              Os conjuntos numéricos formam uma hierarquia bem definida,
              começando com os naturais e culminando nos reais. Os Números
              Naturais (ℕ) são {"{"}0, 1, 2, 3, ...{"}"}, usados para contar e
              ordenar. Alguns textos omitem o zero: ℕ* = {"{"}1, 2, 3, ...{"}"},
              chamado conjunto dos naturais não-nulos. Os Números Inteiros (ℤ)
              expandem os naturais incluindo os negativos: ℤ = {"{"}..., -2, -1,
              0, 1, 2, ...{"}"}. Aplicação Petrobras: tempos relativos (t=0 é o
              início de uma operação, t=-5 seria 5 minutos antes, t=10 seria 10
              minutos depois). Os Números Racionais (ℚ) são todos os números que
              podem ser expressos como razão entre inteiros p/q, onde q ≠ 0.
              Isto inclui naturais, inteiros, frações próprias, frações
              impróprias, e decimais finitos ou periódicos. ℚ = {"{"}p/q | p ∈
              ℤ, q ∈ ℤ*{"}"}. Exemplos: 1/2, -3/7, 5 (que é 5/1), 0.333... (que
              é 1/3).
            </p>

            <p>
              Os Números Irracionais (𝕀) são números que NÃO podem ser expressos
              como razão entre inteiros. Seus desenvolvimentos decimais são
              infinitos e não periódicos. Os mais famosos são π ≈ 3.14159..., e
              ≈ 2.71828..., e √2 ≈ 1.41421.... Uma propriedade é que a soma ou
              produto de um racional com um irracional é sempre irracional
              (exceto em casos triviais de multiplicação por zero). Os Números
              Reais (ℝ) são a união de todos os anteriores: ℝ = ℚ ∪ 𝕀.
              Geometricamente, ℝ pode ser representado como a reta numérica
              contínua, onde cada ponto corresponde a um número real e
              vice-versa. Esta correspondência biunívoca é fundamental para
              análise matemática. A cardinalidade é: |ℕ| é infinito contável,
              |ℤ| é infinito contável, |ℚ| é infinito contável
              (surpreendentemente!), mas |ℝ| é infinito incontável (a
              cardinalidade do contínuo). Isto foi provado por Georg Cantor e
              revolucionou nossa compreensão do infinito.
            </p>

            <p>
              Intervalos na reta real são subconjuntos de ℝ representados de
              forma compacta. Um intervalo aberto (a, b) contém todos os x com a{" "}
              {"<"} x {"<"} b, excluindo os extremos. Um intervalo fechado [a,
              b] contém todos os x com a ≤ x ≤ b, incluindo os extremos.
              Intervalos semi-abertos: [a, b) inclui a mas exclui b; (a, b]
              exclui a mas inclui b. Intervalos infinitos: (a, +∞) = {"{"}x ∈ ℝ
              | x {">"} a{"}"}, [a, +∞) = {"{"}x ∈ ℝ | x ≥ a{"}"}, (-∞, b) ={" "}
              {"{"}x ∈ ℝ | x {"<"} b{"}"}, (-∞, b] = {"{"}x ∈ ℝ | x ≤ b{"}"}. A
              reta inteira é (-∞, +∞) = ℝ. Em inequações, quando você resolve
              |x| {"<"} 3, o resultado é o intervalo aberto (-3, 3). Quando
              resolve |x| ≤ 3, o resultado é o intervalo fechado [-3, 3]. Esta
              notação é crucial para expressar soluções de inequações e
              domínios/contradomínios de funções.
            </p>

            <p>
              Na indústria Petrobras, conjuntos numéricos aparecem em
              especificações técnicas. Por exemplo: "pressão deve estar em ℚ
              milibares" (valor discreto e racional), "temperatura em [20,
              40]°C" (intervalo fechado), "viscosidade {">"} 50 cSt" (intervalo
              semi-infinito). Em análise de dados, quando coletamos medições
              contínuas (pressão, temperatura, densidade), os dados teoricamente
              pertencem a ℝ, mas na prática são arredondados para ℚ (números
              racionais com casas decimais finitas) pela limitação de
              instrumentos. Compreender que os dados reais são uma aproximação
              racional de valores reais é importante para análise e modelagem.
              Engenheiros petrolíferos trabalham diariamente com inequações que
              definem intervalos: "fluxo entre 100 e 500 bbl/dia" é o intervalo
              [100, 500].
            </p>
            <p>
              A CESGRANRIO testa essa matéria através de: (1) identificar a qual
              conjunto um número pertence (√2 é irracional, 22/7 é racional),
              (2) estabelecer relacionamentos entre conjuntos (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ),
              (3) descrever intervalos em notação de conjunto ({"{"}x | 2 {"<"}{" "}
              x ≤ 5{"}"} = (2, 5]), (4) operações com intervalos (intersecção e
              união). Um erro comum é confundir notação: [2, 5) não é o mesmo
              que [2, 5]. Outro erro é não reconhecer que π + 1 é irracional (a
              soma de irracional com racional), ou que √2 · √2 = 2 é racional (o
              produto de dois irracionais pode ser racional). Intervalos também
              aparecem em problemas de desigualdade: se A = {"{"}x | x² {"<"} 4
              {"}"} = (-2, 2) e B = {"{"}x | x {">"} 0{"}"} = (0, +∞), então A ∩
              B = (0, 2).
            </p>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                Hierarquia e Notação dos Conjuntos Numéricos
              </h4>
              <div className="space-y-3">
                <div className="font-mono text-xl p-3 bg-white/50 dark:bg-black/20 rounded border border-rose-200 dark:border-rose-700 text-foreground/85 leading-relaxed">
                  <div className="font-semibold mb-1">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</div>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-2">
                    Naturais (contar) ⊂ Inteiros (negativos) ⊂ Racionais
                    (frações) ⊂ Reais (contínuo)
                  </div>
                </div>
                <div className="font-mono text-xl p-3 bg-white/50 dark:bg-black/20 rounded border border-rose-200 dark:border-rose-700 text-foreground/85 leading-relaxed">
                  <div className="font-semibold mb-1">ℝ = ℚ ∪ 𝕀</div>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-2">
                    Reais = Racionais ∪ Irracionais (partição disjunta)
                  </div>
                </div>
                <div className="font-mono text-xl p-3 bg-white/50 dark:bg-black/20 rounded border border-rose-200 dark:border-rose-700 text-foreground/85 leading-relaxed">
                  <div className="font-semibold mb-1">
                    Intervalos: [a,b], (a,b), [a,b), (a,b]
                  </div>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-2">
                    Fechado = inclui extremos | Aberto = exclui | Semi-aberto =
                    misto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Os 5 Conjuntos Numéricos"
              variant="blue"
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
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Ler a Notação"
              icone="📏"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Notação Moderna de Intervalos",
                  icone: "📚",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
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
                            <span className="bg-green-500/20 px-2 py-0.5 rounded text-lg text-foreground/85 leading-relaxed font-mono">
                              [a, b]
                            </span>
                          </div>
                          <p className="text-lg text-foreground/85 leading-relaxed mb-1">
                            <strong>Inequação:</strong> a ≤ x ≤ b
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Os extremos "a" e "b" <strong>são incluídos</strong>{" "}
                            na resposta (Bolinha Cheia).
                          </p>
                        </div>

                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-red-700 dark:text-red-400">
                              Intervalo Aberto
                            </span>
                            <span className="bg-red-500/20 px-2 py-0.5 rounded text-lg text-foreground/85 leading-relaxed font-mono">
                              ]a, b[ ou (a, b)
                            </span>
                          </div>
                          <p className="text-lg text-foreground/85 leading-relaxed mb-1">
                            <strong>Inequação:</strong> a &lt; x &lt; b
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Os extremos "a" e "b" <strong>estão de fora</strong>{" "}
                            (Bolinha Vazia).
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-xl text-foreground/85 leading-relaxed">
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
          <section id="quiz-modulo-4" className="mt-16">
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A relação CORRETA de inclusão entre conjuntos numéricos é:"
          alternativas={[
            { letra: "A", texto: "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", correta: true },
              { letra: "B", texto: "ℤ ⊂ ℕ ⊂ ℚ ⊂ ℝ", correta: false },
              { letra: "C", texto: "ℚ ⊂ ℤ ⊂ ℕ ⊂ ℝ", correta: false },
              { letra: "D", texto: "ℕ ⊂ ℚ ⊂ ℤ ⊂ ℝ", correta: false },
              { letra: "E", texto: "ℝ ⊂ ℚ ⊂ ℤ ⊂ ℕ", correta: false }
          ]}
          dicaEstrategica="Cada conjunto"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Naturais (ℕ) ⊂ Inteiros (ℤ) ⊂ Racionais (ℚ) ⊂ Reais (ℝ)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={3}
              moduloNumero={4}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 4",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Hierarquia dos Conjuntos Numéricos",
                    type: "Mapa Mental",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: rosa #E91E8C, teal #00897B, verde #43A047. Hierarquia visual (círculos concêntricos desenhados à mão): ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Cada conjunto com definição curta e exemplos: ℕ={0,1,2...}, ℤ={...-2,-1,0,1,2...}, ℚ=frações, ℝ=todos. Irracionais (ℙ) ao lado com π, √2, √3. Setas de inclusão entre os conjuntos. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-4/m4-conceito.png",
                  },
                  {
                    title: "Diferença entre Racionais e Irracionais",
                    type: "Passo a Passo",
                    placeholderColor: "bg-pink-100 dark:bg-pink-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: rosa #E91E8C, teal #00897B. Título: RACIONAL vs IRRACIONAL. Dois blocos grandes lado a lado: RACIONAL ℚ (teal): pode ser escrito como p/q, dízima periódica ou finita. Ex: 1/3=0,333... | 1/2=0,5 | -7. IRRACIONAL ℙ (rosa): NÃO pode ser fração, dízima infinita não periódica. Ex: π=3,14159... | √2=1,41421... | e. Caixa central: ℝ = ℚ ∪ ℙ (sem sobreposição!). Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-4/m4-formula.png",
                  },
                  {
                    title: "Pegadinhas — Conjuntos Numéricos",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ PEGADINHAS — NUMÉRICOS. Grid: ✅ 0 ∈ ℕ vs ❌ ℕ começa em 1. ✅ -5 ∈ ℤ mas -5 ∉ ℕ vs ❌ Todo inteiro é natural. ✅ √4=2 é racional vs ❌ Toda raiz é irracional. ✅ π é irracional vs ❌ π=22/7 (aproximação!). Caixa âmbar: ⚠️ 0 pertence a ℕ, ℤ, ℚ e ℝ mas não a ℙ! Caixa teal: 💡 MACETE: N⊂Z⊂Q⊂R — cada conjunto engloba o anterior. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-4/m4-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: A Boneca Russa Numérica",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">
                      ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Os números são como bonecas russas: um conjunto mora
                      dentro do outro. Se é <strong>Natural</strong>, também é{" "}
                      <strong>Inteiro</strong>, e se é Inteiro, também é{" "}
                      <strong>Real</strong>."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>ℕ</span> NATURAIS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Contagem: {"{0, 1, 2...}"}.</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>ℤ</span> INTEIROS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Naturais + Negativos.</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>ℚ</span> RACIONAIS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Tudo que vira fração (p/q).</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>𝕀</span> IRRACIONAIS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Dízimas infinitas e não periódicas (π, √2).
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizNumericos}
              titulo="QUIZ: Conj. Numéricos"
              icone="🔢"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: SUBCONJUNTOS ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Subconjuntos e Potência"
          descricao="Entenda o que são subconjuntos, como calcular o conjunto das partes e as relações de inclusão que caem na sua prova."
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M5 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Relações e Propriedades Especiais de Conjuntos"
            description="Subconjuntos, inclusão, igualdade e as leis que governam as operações"
            variant="blue"
          />

          <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
            <p>
              Uma relação fundamental entre conjuntos é a relação de inclusão,
              denotada por A ⊆ B. Dizemos que A é um subconjunto de B se todo
              elemento de A é também elemento de B. Simbolicamente: A ⊆ B ⟺ (∀x:
              x ∈ A → x ∈ B). Se existe pelo menos um elemento em A que não
              pertence a B, então A ⊄ B. A inclusão é reflexiva (A ⊆ A),
              antissimétrica (A ⊆ B E B ⊆ A ⟹ A = B), e transitiva (A ⊆ B E B ⊆
              C ⟹ A ⊆ C). Quando A ⊆ B mas A ≠ B, escrevemos A ⊂ B (inclusão
              própria ou estrita). Dois fatos importantes: (1) o conjunto vazio
              ∅ é subconjunto de todo conjunto, e (2) qualquer conjunto é
              subconjunto de si mesmo. O número total de subconjuntos de um
              conjunto com n elementos é 2^n. Por exemplo, se C = {"{"}a, b{"}"}
              ', os subconjuntos são: ∅, {"{"}a{"}"}', {"{"}b{"}"}', {"{"}a, b
              {"}"}' — total de 2² = 4.
            </p>

            <p>
              As propriedades das operações com conjuntos garantem que
              manipulações algébricas sejam válidas. A Comutatividade afirma que
              A ∪ B = B ∪ A e A ∩ B = B ∩ A — a ordem não importa. A
              Associatividade garante que (A ∪ B) ∪ C = A ∪ (B ∪ C) e A ∩ (B ∩
              C) = A ∩ (B ∩ C) — o agrupamento não importa. A Distributividade
              conecta as duas operações: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C) e A ∩
              (B ∪ C) = (A ∩ B) ∪ (A ∩ C). A Identidade estabelece que A ∪ ∅ = A
              e A ∩ U = A (onde U é o universal). A Complementação diz que A ∪
              A' = U e A ∩ A' = ∅. A Lei de De Morgan, uma das mais importantes,
              afirma (A ∪ B)' = A' ∩ B' e (A ∩ B)' = A' ∪ B'. Esta lei é testada
              frequentemente na CESGRANRIO porque permite simplificar expressões
              complexas em seus complementares.
            </p>

            <p>
              A absorção é uma propriedade que afirma A ∪ (A ∩ B) = A e A ∩ (A ∪
              B) = A. Intuitivamente, se você une A com qualquer coisa que
              esteja dentro de A, obtém A. Se você intersecciona A com qualquer
              coisa que contenha A, obtém A. A Idempotência diz que A ∪ A = A e
              A ∩ A = A — unir um conjunto consigo mesmo não muda nada. A
              Involução afirma que (A')' = A — o complemento do complemento
              retorna ao original. Estas propriedades transformam problemas
              aparentemente complexos em simples. Por exemplo, se você precisa
              simplificar (A ∪ B')' ∩ (A ∩ B), aplique De Morgan: [(A ∪ B')' =
              A' ∩ (B')' = A' ∩ B], então teremos (A' ∩ B) ∩ (A ∩ B) = (A' ∩ A)
              ∩ (B ∩ B) = ∅ ∩ B = ∅. Dominar essas manipulações é essencial.
            </p>

            <p>
              Na prática Petrobras, propriedades de conjuntos aparecem em lógica
              de dados. Se você define o conjunto de "equipamentos que passaram
              em inspeção" (I) e "equipamentos operacionais" (O), você pode usar
              propriedades para responder: quantos passaram em I OU estão em O?
              (|I ∪ O|, usa inclusão-exclusão). Quantos estão em ambos? (|I ∩
              O|). Quantos estão em I mas não em O? (|I - O| = |I ∩ O'|).
              Quantos NÃO estão em I? (|I'|). Sistemas de computadores usam
              operações de conjuntos para filtrar dados: SQL usa UNION (∪),
              INTERSECT (∩), e EXCEPT (-) para combinar resultados de queries.
              Dominar as propriedades permite escrever queries eficientes e
              corretas.
            </p>

            <p>
              A CESGRANRIO frequentemente testa propriedades através de: (1)
              simplificação de expressões com leis de De Morgan, (2) verificação
              de subconjuntos (A ⊆ B?), (3) problemas de contagem envolvendo
              cardinalidade, e (4) análise lógica (se verdade X é certa, qual
              conclusão segue?). Um erro muito comum é aplicar De Morgan
              incorretamente: (A ∪ B)' ≠ A' ∪ B' — note o operador muda de ∪
              para ∩. Outro erro é confundir inclusão com pertencimento: 2 ∈{" "}
              {"{"}1, 2, 3{"}"}' (pertence), mas {"{"}2{"}"} ⊆ {"{"}1, 2, 3{"}"}{" "}
              (está incluído como subconjunto), não {"{"}2{"}"} ∈ {"{"}1, 2, 3
              {"}"}. Neste último caso, estávamos perguntando se o conjunto{" "}
              {"{"}2{"}"} é elemento de {"{"}1,2,3{"}"}', o que é falso — os
              elementos são 1, 2, e 3, não conjuntos.
            </p>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200 dark:border-violet-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                Propriedades Fundamentais de Operações
              </h4>
              <div className="space-y-2 text-xl text-foreground/85 leading-relaxed">
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-violet-200 dark:border-violet-700">
                  <span className="font-semibold text-violet-700 dark:text-violet-300">
                    Comutatividade:
                  </span>{" "}
                  A ∪ B = B ∪ A; A ∩ B = B ∩ A
                </div>
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-violet-200 dark:border-violet-700">
                  <span className="font-semibold text-violet-700 dark:text-violet-300">
                    Associatividade:
                  </span>{" "}
                  (A ∪ B) ∪ C = A ∪ (B ∪ C)
                </div>
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-violet-200 dark:border-violet-700">
                  <span className="font-semibold text-violet-700 dark:text-violet-300">
                    Lei de De Morgan:
                  </span>{" "}
                  (A ∪ B)' = A' ∩ B'; (A ∩ B)' = A' ∪ B'
                </div>
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-violet-200 dark:border-violet-700">
                  <span className="font-semibold text-violet-700 dark:text-violet-300">
                    Complementação:
                  </span>{" "}
                  A ∪ A' = U; A ∩ A' = ∅
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          {/* ═══ CARD 1: SUBCONJUNTOS E RELAÇÃO DE INCLUSÃO ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Subconjuntos e Relação de Inclusão"
              description="Entenda a diferença crucial entre pertencer (∈) e estar contido (⊂) — a pegadinha número 1 da CESGRANRIO."
              variant="blue"
              className="mb-6"
            />

            <ContentAccordion
              titulo="A Relação ⊂ — Está Contido"
              icone="⊂"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição Formal",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Dizemos que A é <strong>subconjunto</strong> de B (A ⊂
                        B) se e somente se <strong>todo elemento de A</strong>{" "}
                        também é elemento de B. Formalmente:
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center">
                        <p className="font-mono text-base font-bold text-violet-400">
                          A ⊂ B ⟺ (∀x)(x ∈ A ⟹ x ∈ B)
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="A Diferença Crucial">
                        <strong>∈</strong> conecta <strong>ELEMENTO</strong> a
                        CONJUNTO. <strong>⊂</strong> conecta{" "}
                        <strong>CONJUNTO</strong> a CONJUNTO. Se você vê chaves
                        em ambos os lados, é inclusão!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Propriedades da Inclusão",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        A relação de inclusão é uma{" "}
                        <strong>relação de ordem parcial</strong> com três
                        propriedades fundamentais:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                          <p className="font-bold text-violet-600 dark:text-violet-400 text-xl text-foreground/85 leading-relaxed">
                            🔁 Reflexiva
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            A ⊆ A — Todo conjunto é subconjunto de si mesmo.
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                          <p className="font-bold text-violet-600 dark:text-violet-400 text-xl text-foreground/85 leading-relaxed">
                            ⚖️ Antissimétrica
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            A ⊆ B e B ⊆ A ⟹ A = B — Se dois conjuntos se contêm
                            mutuamente, são iguais.
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                          <p className="font-bold text-violet-600 dark:text-violet-400 text-xl text-foreground/85 leading-relaxed">
                            ➡️ Transitiva
                          </p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            A ⊆ B e B ⊆ C ⟹ A ⊆ C — A inclusão se propaga pela
                            cadeia.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplos com Contexto Petrobras",
                  icone: "🛢️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Imagine: P = {"{"}"plataformas com NR-10"{"}"}, Q ={" "}
                        {"{"}"plataformas da Bacia de Campos"{"}"}.
                      </p>
                      <div className="p-4 bg-violet-800/40 rounded-xl border border-violet-500/30 font-mono text-lg text-foreground/85 leading-relaxed space-y-2">
                        <p className="text-violet-300">
                          P = {"{"}"P-50, P-51, P-52"{"}"}
                        </p>
                        <p className="text-violet-300">
                          Q = {"{"}"P-50, P-51, P-52, P-56, P-57"{"}"}
                        </p>
                        <p className="text-green-400 font-bold">
                          P ⊂ Q ✓ — toda plataforma de P está em Q.
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Armadilha de Prova">
                        Se existir <strong>1 elemento</strong> de A que não está
                        em B, então A ⊄ B. Um único intruso quebra a inclusão!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "⊂ vs ⊆ — Inclusão Própria vs Geral",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-xl border border-border/30">
                        <table className="w-full text-lg text-foreground/85 leading-relaxed">
                          <thead>
                            <tr className="bg-violet-500/20">
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Símbolo
                              </th>
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Significado
                              </th>
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Permite A = B?
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-t border-border/10">
                              <td className="p-3 font-mono text-violet-300">
                                A ⊂ B
                              </td>
                              <td className="p-3">
                                Inclusão própria (estrita)
                              </td>
                              <td className="p-3 text-red-400">❌ Não</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3 font-mono text-violet-300">
                                A ⊆ B
                              </td>
                              <td className="p-3">Inclusão ampla (geral)</td>
                              <td className="p-3 text-green-400">✅ Sim</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="success" titulo="Regra de Ouro">
                        O conjunto vazio{" "}
                        <strong>∅ é subconjunto de TODO</strong> conjunto. E
                        todo conjunto é subconjunto de si mesmo. São as duas
                        exceções universais.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Pertencimento (∈) vs Inclusão (⊂)"
              icone="⚠️"
              corIndicador="bg-violet-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "A Pegadinha Número 1",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Esta é a confusão mais explorada em concursos. Analise
                        com cuidado:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                          <p className="font-mono text-xl text-green-400 font-bold text-foreground/85 leading-relaxed">
                            2 ∈ {"{"}"1, 2, 3"{"}"}
                          </p>
                          <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                            ✅ VERDADE — o número 2 é elemento do conjunto.
                          </p>
                        </div>
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                          <p className="font-mono text-xl text-green-400 font-bold text-foreground/85 leading-relaxed">
                            {"{"}"2"{"}"}⊆ {"{"}"1, 2, 3"{"}"}
                          </p>
                          <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                            ✅ VERDADE — o conjunto {"{"}"2"{"}"}está incluído.
                          </p>
                        </div>
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                          <p className="font-mono text-xl text-red-400 font-bold text-foreground/85 leading-relaxed">
                            {"{"}"2"{"}"}∈ {"{"}"1, 2, 3"{"}"}
                          </p>
                          <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                            ❌ FALSO — o conjunto {"{"}"2"{"}"}NÃO é elemento.
                            Os elementos são 1, 2 e 3, não conjuntos.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ═══ CARD 2: CONJUNTO POTÊNCIA ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Conjunto Potência — ℘(A) e a Fórmula 2ⁿ"
              description="O conjunto de TODOS os subconjuntos possíveis — e por que o número de combinações cresce de forma explosiva."
              variant="blue"
              className="mb-6"
            />

            <ContentAccordion
              titulo="O que é o Conjunto Potência?"
              icone="℘"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Fórmula",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        O <strong>Conjunto Potência</strong> (ou Conjunto das
                        Partes) de um conjunto A, denotado <strong>℘(A)</strong>{" "}
                        ou <strong>P(A)</strong>, é o conjunto que contém{" "}
                        <strong>todos os subconjuntos</strong> possíveis de A —
                        incluindo ∅ e o próprio A.
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center space-y-2">
                        <p className="font-mono text-lg font-bold text-violet-400">
                          Se |A| = n, então |℘(A)| = 2ⁿ
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
                          Cada elemento pode estar ou não em cada subconjunto →
                          2 escolhas por elemento
                        </p>
                      </div>
                      <AlertBox tipo="success" titulo="Por que 2ⁿ?">
                        Para cada um dos n elementos, temos 2 opções:{" "}
                        <strong>incluir ou não incluir</strong>. São n decisões
                        independentes, logo 2 × 2 × ... × 2 (n vezes) = 2ⁿ
                        combinações.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Passo a Passo",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        Seja A = {"{"}"a, b{"}"} (n = 2). Então |℘(A)| = 2² = 4.
                      </p>
                      <div className="p-4 bg-violet-800/40 rounded-xl border border-violet-500/30 font-mono text-xl space-y-2 text-foreground/85 leading-relaxed">
                        <p className="text-violet-300 font-bold">
                          ℘(A) contém:
                        </p>
                        <p className="text-muted-foreground">
                          1. ∅ — o conjunto vazio
                        </p>
                        <p className="text-muted-foreground">
                          2. {"{"}"a"{"}"}— somente "a"
                        </p>
                        <p className="text-muted-foreground">
                          3. {"{"}"b"{"}"}— somente "b"
                        </p>
                        <p className="text-muted-foreground">
                          4. {"{"}"a, b"{"}"}— os dois
                        </p>
                        <p className="text-violet-300 font-bold mt-2">
                          Total: 4 = 2² ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Crescimento Explosivo",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        O número de subconjuntos cresce de forma{" "}
                        <strong>exponencial</strong>:
                      </p>
                      <div className="overflow-hidden rounded-xl border border-border/30">
                        <table className="w-full text-lg text-foreground/85 leading-relaxed">
                          <thead>
                            <tr className="bg-violet-500/20">
                              <th className="p-3 text-violet-400 font-bold text-left">
                                Elementos (n)
                              </th>
                              <th className="p-3 text-violet-400 font-bold text-left">
                                Subconjuntos (2ⁿ)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            {[
                              [0, 1],
                              [1, 2],
                              [2, 4],
                              [3, 8],
                              [4, 16],
                              [5, 32],
                              [10, 1024],
                            ].map(([n, v], i) => (
                              <tr
                                key={n}
                                className={`border-t border-border/10 ${i % 2 ? "bg-muted/10" : ""}`}
                              >
                                <td className="p-3 font-mono">{n}</td>
                                <td className="p-3 font-mono text-violet-300">
                                  {v}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        10 campos de petróleo → 1.024 combinações possíveis de
                        exploração. É por isso que a análise de subconjuntos é
                        fundamental em logística e operações.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Subconjuntos Próprios",
                  icone: "🏷️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Os <strong>subconjuntos próprios</strong> são todos os
                        subconjuntos exceto o próprio conjunto A. Sua fórmula é:
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center">
                        <p className="font-mono text-base font-bold text-violet-400">
                          Subconjuntos próprios = 2ⁿ − 1
                        </p>
                      </div>
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        Para A = {"{"}"a, b, c{"}"} (n=3): 2³ − 1 = 7
                        subconjuntos próprios.
                      </p>
                      <AlertBox tipo="warning" titulo="Cuidado com a Banca">
                        Quando a questão pede{" "}
                        <strong>"subconjuntos não vazios"</strong>, a fórmula é
                        2ⁿ − 1 (exclui o ∅). Quando pede{" "}
                        <strong>"todos os subconjuntos"</strong>, é 2ⁿ (inclui o
                        ∅).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ═══ CARD 3: PROPRIEDADES ALGÉBRICAS ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Propriedades Algébricas das Operações"
              description="As leis que governam União, Interseção e Complementação — o kit de ferramentas para simplificar qualquer expressão."
              variant="blue"
              className="mb-6"
            />

            <ContentAccordion
              titulo="Comutatividade, Associatividade e Identidade"
              icone="⚙️"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Comutatividade",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        A <strong>ordem não importa</strong> nas operações de
                        união e interseção:
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 space-y-2 font-mono text-xl text-foreground/85 leading-relaxed">
                        <p className="text-violet-300">A ∪ B = B ∪ A</p>
                        <p className="text-violet-300">A ∩ B = B ∩ A</p>
                      </div>
                      <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
                        Analogia: A + B = B + A na soma. Conjuntos se comportam
                        da mesma forma aqui.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Associatividade",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        O <strong>agrupamento não importa</strong>:
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 space-y-2 font-mono text-xl text-foreground/85 leading-relaxed">
                        <p className="text-violet-300">
                          (A ∪ B) ∪ C = A ∪ (B ∪ C)
                        </p>
                        <p className="text-violet-300">
                          (A ∩ B) ∩ C = A ∩ (B ∩ C)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Identidade e Complementação",
                  icone: "🏠",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl font-mono text-xl text-foreground/85 leading-relaxed">
                          <p className="text-violet-300">A ∪ ∅ = A</p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground mt-1">
                            Unir com o vazio não muda nada.
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl font-mono text-xl text-foreground/85 leading-relaxed">
                          <p className="text-violet-300">A ∩ U = A</p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground mt-1">
                            Intersectar com o universal não muda nada.
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl font-mono text-xl text-foreground/85 leading-relaxed">
                          <p className="text-violet-300">A ∪ A' = U</p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground mt-1">
                            Um conjunto e seu complemento cobrem tudo.
                          </p>
                        </div>
                        <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl font-mono text-xl text-foreground/85 leading-relaxed">
                          <p className="text-violet-300">A ∩ A' = ∅</p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground mt-1">
                            Um conjunto e seu complemento não se sobrepõem.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Distributividade e Absorção"
              icone="🧩"
              corIndicador="bg-violet-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Distributividade",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        A <strong>distributividade</strong> conecta as duas
                        operações — como na álgebra:
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 space-y-3 font-mono text-xl text-foreground/85 leading-relaxed">
                        <div>
                          <p className="text-violet-300 font-bold">
                            ∪ distribui sobre ∩:
                          </p>
                          <p className="text-muted-foreground">
                            A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)
                          </p>
                        </div>
                        <div>
                          <p className="text-violet-300 font-bold">
                            ∩ distribui sobre ∪:
                          </p>
                          <p className="text-muted-foreground">
                            A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Use em Questões">
                        Quando você ver ∪ e ∩ misturados numa expressão, tente
                        aplicar a distributividade para simplificar.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Absorção e Idempotência",
                  icone: "🌊",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xl font-bold text-violet-400 mb-2 text-foreground/85 leading-relaxed">
                            Absorção:
                          </p>
                          <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl font-mono text-xl space-y-1 text-foreground/85 leading-relaxed">
                            <p className="text-violet-300">A ∪ (A ∩ B) = A</p>
                            <p className="text-violet-300">A ∩ (A ∪ B) = A</p>
                          </div>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground mt-2">
                            Se você une A com algo que está dentro de A, obtém
                            A.
                          </p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-violet-400 mb-2 text-foreground/85 leading-relaxed">
                            Idempotência:
                          </p>
                          <div className="p-3 bg-violet-500/5 border border-violet-500/20 rounded-xl font-mono text-xl space-y-1 text-foreground/85 leading-relaxed">
                            <p className="text-violet-300">A ∪ A = A</p>
                            <p className="text-violet-300">A ∩ A = A</p>
                          </div>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground mt-2">
                            Operar um conjunto com si mesmo não muda nada.
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="success" titulo="Involução">
                        (A&apos;)&apos; = A — O complemento do complemento
                        retorna ao original. Use para cancelar duplas negações!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Simplificação com De Morgan — Exercício Guiado"
              icone="🧮"
              corIndicador="bg-violet-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Aplicação Passo a Passo",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Simplifique a expressão{" "}
                        <strong>(A ∪ B&apos;)&apos; ∩ (A ∩ B)</strong>:
                      </p>
                      <div className="p-4 bg-violet-800/40 rounded-xl border border-violet-500/30 font-mono text-lg text-foreground/85 leading-relaxed space-y-3">
                        <p className="text-violet-300">
                          // Passo 1: Aplique De Morgan em (A ∪ B&apos;)&apos;
                        </p>
                        <p className="text-muted-foreground">
                          (A ∪ B&apos;)&apos; = A&apos; ∩ (B&apos;)&apos;
                        </p>
                        <p className="text-violet-300">
                          // Passo 2: Involução — (B&apos;)&apos; = B
                        </p>
                        <p className="text-muted-foreground">= A&apos; ∩ B</p>
                        <p className="text-violet-300">
                          // Passo 3: Substitua na expressão original
                        </p>
                        <p className="text-muted-foreground">
                          (A&apos; ∩ B) ∩ (A ∩ B)
                        </p>
                        <p className="text-violet-300">
                          // Passo 4: Reordene (Comutatividade +
                          Associatividade)
                        </p>
                        <p className="text-muted-foreground">
                          = (A&apos; ∩ A) ∩ (B ∩ B)
                        </p>
                        <p className="text-violet-300">
                          // Passo 5: Complementação e Idempotência
                        </p>
                        <p className="text-green-400 font-bold">
                          = ∅ ∩ B = ∅ ✓
                        </p>
                      </div>
                      <AlertBox tipo="success" titulo="Macete">
                        Sempre procure por <strong>A ∩ A&apos; = ∅</strong>. Se
                        aparecer, toda a expressão vira ∅ imediatamente!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Tabela de Referência Rápida",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-xl border border-border/30">
                        <table className="w-full text-lg text-foreground/85 leading-relaxed">
                          <thead>
                            <tr className="bg-violet-500/20">
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Lei
                              </th>
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Fórmula
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            {[
                              ["De Morgan 1ª", "(A ∪ B)' = A' ∩ B'"],
                              ["De Morgan 2ª", "(A ∩ B)' = A' ∪ B'"],
                              ["Involução", "(A')' = A"],
                              ["Idempotência ∪", "A ∪ A = A"],
                              ["Idempotência ∩", "A ∩ A = A"],
                              ["Absorção 1ª", "A ∪ (A ∩ B) = A"],
                              ["Complementar ∪", "A ∪ A' = U"],
                              ["Complementar ∩", "A ∩ A' = ∅"],
                            ].map(([lei, formula], i) => (
                              <tr
                                key={lei}
                                className={`border-t border-border/10 ${i % 2 ? "bg-muted/10" : ""}`}
                              >
                                <td className="p-3 font-semibold">{lei}</td>
                                <td className="p-3 font-mono text-violet-300">
                                  {formula}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em pesquisa com 200 pessoas sobre uso de combustíveis: 100 usam gasolina (G), 80 usam etanol (E), 50 usam GNV, 30 usam G e E, 20 usam G e GNV, 15 usam E e GNV, 10 usam os três. Quantas usam apenas gasolina?"
          alternativas={[
            { letra: "A", texto: "50", correta: false },
              { letra: "B", texto: "60", correta: true },
              { letra: "C", texto: "70", correta: false },
              { letra: "D", texto: "80", correta: false },
              { letra: "E", texto: "100", correta: false }
          ]}
          dicaEstrategica="Na fórmula de Venn com 3 conjuntos, somamos a tripla interseção porque ela foi subtraída duas vezes."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Apenas G = n(G) - n(G∩E) - n(G∩GNV) + n(G∩E∩GNV) = 100 - 30 - 20 + 10 = 60." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              moduloNumero={5}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 5",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Subconjuntos — Inclusão e Potência",
                    type: "Mapa Mental",
                    placeholderColor: "bg-violet-100 dark:bg-violet-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: lilás #7B1FA2, teal #00897B, âmbar. Node central: SUBCONJUNTOS. Ramos: Definição (A⊂B: todo elemento de A está em B), Subconjunto próprio (A⊊B: A⊂B e A≠B), Conjunto Potência P(A)=todos os subconjuntos, Fórmula 2^n (n=número de elementos), Propriedades (reflexiva, antissimétrica, transitiva). Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-5/m5-conceito.png",
                  },
                  {
                    title: "Construindo o Conjunto Potência",
                    type: "Passo a Passo",
                    placeholderColor: "bg-purple-100 dark:bg-purple-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: lilás, teal. Título: CONJUNTO DAS PARTES P(A). Exemplo central: A={a,b,c} → n(A)=3 → P(A) tem 2³=8 elementos. Lista visual em grid 2×4: ∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}. Regra destacada: P(A) sempre inclui ∅ e o próprio A. Destaque: Se n(A)=10 → P(A) tem 1024 subconjuntos! Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-5/m5-formula.png",
                  },
                  {
                    title: "Pegadinhas — Subconjuntos",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ PEGADINHAS — SUBCONJUNTOS. Grid: ✅ ∅ ∈ P(A) (vazio é elemento de P(A)) vs ❌ ∅ ∉ P(A). ✅ A ∈ P(A) (A é elemento de P(A)) vs ❌ A ∉ P(A). ✅ {∅} tem 1 elemento (o vazio) vs ❌ {∅} é o conjunto vazio. ✅ n(P(A))=2^n vs ❌ n(P(A))=2n. Caixa âmbar: ⚠️ ∅ pertence ao conjunto potência de qualquer conjunto! Caixa teal: 💡 MACETE: P(A) tem 2^n elementos — dobre a cada novo elemento. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-5/m5-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: Subconjuntos e Potência",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">⊂ ⊆ ℘ 2ⁿ</div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Para saber quantos subconjuntos um conjunto tem, use a
                      potência de 2. Se o conjunto tem 5 elementos, ele tem{" "}
                      <strong>2⁵ = 32</strong> maneiras de se organizar."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>⊂</span> ESTÁ CONTIDO
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Relação entre CONJUNTOS.</p>
                      </div>
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>⊆</span> INCLUSÃO GERAL
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Pode ser igual. A ⊆ A sempre!</p>
                      </div>
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>℘</span> CONJUNTO POTÊNCIA
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          O conjunto de todos os subconjuntos.
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>⚡</span> FÓRMULA 2ⁿ
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          n elementos? Então 2ⁿ subconjuntos.
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizFinal}
              titulo="QUIZ: Subconjuntos"
              icone="🏆"
              numero={4}
              variant="blue"
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
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M6 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O Princípio de Inclusão-Exclusão: Contagem Sem Dupla Contagem"
            description="A ferramenta mais poderosa para resolver problemas de conjuntos"
            variant="blue"
          />

          <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
            <p>
              O Princípio de Inclusão-Exclusão é um método combinatório que
              permite calcular o tamanho da união de múltiplos conjuntos sem
              contar elementos repetidos. Para dois conjuntos A e B, a fórmula é
              simples: |A ∪ B| = |A| + |B| - |A ∩ B|. A lógica é clara: somamos
              os tamanhos de A e B, mas isso conta os elementos de A ∩ B duas
              vezes, então subtraímos uma vez. Para três conjuntos: |A ∪ B ∪ C|
              = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|.
              Aqui somamos os três conjuntos, subtraímos as três interseções
              duplas (que foram contadas em excesso), e adicionamos a interseção
              tripla (que foi subtraída em excesso). O padrão segue um princípio
              geral: INCLUA (soma os conjuntos), EXCLUA (subtraia as interseções
              duplas), INCLUA (adicione as interseções triplas), e assim
              alternadamente. Este princípio é atribuído a Henri Poincaré e é
              fundamental em probabilidade, combinatória e teoria dos conjuntos.
            </p>

            <p>
              A prova do caso de 2 conjuntos é intuitiva com um diagrama de
              Venn: o círculo A contém |A| elementos, o círculo B contém |B|
              elementos, mas a sobreposição (A ∩ B) é contada em ambos. Logo, o
              total de elementos únicos é |A| + |B| - |A ∩ B|. Para 3 conjuntos,
              a prova requer mais cuidado: quando somamos |A| + |B| + |C|,
              contamos cada elemento da região A ∩ B ∩ C três vezes (uma para
              cada círculo). Quando subtraímos |A ∩ B|, |A ∩ C|, |B ∩ C|,
              estamos removendo as contagens duplas, mas isso remove A ∩ B ∩ C
              três vezes (ele está em cada uma dessas interseções duplas).
              Portanto, adicionamos |A ∩ B ∩ C| uma vez de volta. O resultado é
              que cada elemento é contado exatamente uma vez. Esta alternância
              de inclusão e exclusão é o núcleo do princípio e é extremamente
              poderosa.
            </p>

            <p>
              Exemplos práticos tornam o princípio cristalino. Suponha que numa
              escola há 150 alunos, 85 estudam Inglês (I), 70 estudam Francês
              (F), e 30 estudam ambos. Quantos estudam pelo menos um idioma? |I
              ∪ F| = 85 + 70 - 30 = 125. Quantos estudam exatamente um? (85 -
              30) + (70 - 30) = 55 + 40 = 95. Quantos não estudam nenhum? 150 -
              125 = 25. No contexto Petrobras: 200 funcionários, 120 têm NR-10
              (segurança em eletricidade), 100 têm NR-35 (trabalho em altura),
              60 têm ambas. Quantos têm pelo menos uma certificação? |NR10 ∪
              NR35| = 120 + 100 - 60 = 160. Quantos não têm nenhuma? 200 - 160 =
              40 (prioridade de treinamento). Três conjuntos: 100 funcionários,
              60 falam Inglês (I), 50 falam Espanhol (E), 40 falam Português
              (P), 20 falam I e E, 15 falam I e P, 10 falam E e P, 5 falam os
              três. Quantos falam pelo menos um? |I ∪ E ∪ P| = 60 + 50 + 40 - 20
              - 15 - 10 + 5 = 110. Mas só temos 100 funcionários! Isso é
              impossível — há um erro nos dados.
            </p>

            <p>
              A CESGRANRIO adora problemas de inclusão-exclusão porque testam:
              (1) capacidade de interpretar enunciados complexos, (2) habilidade
              de aplicar a fórmula corretamente, (3) reconhecimento de
              impossibilidades lógicas (quando os números não batem). Um erro
              frequente é esquecer de subtrair a interseção: se você apenas
              somar |A| + |B|, vai contar os elementos de A ∩ B duas vezes.
              Outro erro é aplicar a fórmula de 2 conjuntos quando há 3: use a
              fórmula correta para a quantidade de conjuntos. Um terceiro erro é
              confundir "pelo menos um" (União, inclusão) com "exatamente um"
              (exige subtrações adicionais). A CESGRANRIO frequentemente insere
              múltiplos conjuntos em um único problema para testar isso.
              Diagramas de Venn preenchidos corretamente tornam esses problemas
              triviais — sempre preencha de dentro para fora (interseção de
              todos primeiro, depois pairwise, depois exclusivas).
            </p>

            <p>
              A beleza do princípio é sua generalização: para n conjuntos, a
              fórmula alterna entre inclusões (sum de |A_i|) e exclusões
              (subtract de |A_i ∩ A_j|), com o padrão continuando para
              interseções cada vez maiores, sempre alternando os sinais. Isto é
              escrito formally como: |A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|A_i| - Σ|A_i ∩
              A_j| + Σ|A_i ∩ A_j ∩ A_k| - ... + (-1)^(n+1)|A₁ ∩ A₂ ∩ ... ∩ Aₙ|.
              Embora pareça complicado com muitos conjuntos, na prática
              CESGRANRIO raramente vai além de 3-4 conjuntos. Dominar a fórmula
              para 2 e 3 é suficiente para acertar praticamente todas as
              questões desta banca.
            </p>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                Fórmulas de Inclusão-Exclusão
              </h4>
              <div className="space-y-2 text-xl font-mono text-foreground/85 leading-relaxed">
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-amber-200 dark:border-amber-700">
                  <div className="font-semibold text-amber-700 dark:text-amber-300">
                    2 Conjuntos:
                  </div>
                  <div className="mt-1">|A ∪ B| = |A| + |B| - |A ∩ B|</div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-amber-200 dark:border-amber-700">
                  <div className="font-semibold text-amber-700 dark:text-amber-300">
                    3 Conjuntos:
                  </div>
                  <div className="mt-1">
                    |A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| +
                    |A∩B∩C|
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Fórmula para 2 Conjuntos"
              description="O princípio base: contar sem duplicar."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Por que precisamos subtrair a interseção?"
              icone="➕"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Problema da Dupla Contagem",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Se somarmos <strong>|A| + |B|</strong>, quem está em{" "}
                        <strong>A ∩ B</strong> é contado{" "}
                        <strong className="text-amber-400">duas vezes</strong>.
                        A fórmula de Inclusão-Exclusão corrige isso subtraindo a
                        interseção uma vez.
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-amber-400">
                          |A ∪ B| = |A| + |B| − |A ∩ B|
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Na RPBC, 180 técnicos dominam válvulas esfera (V) e 150
                        dominam válvulas borboleta (B). Se 60 dominam ambas,
                        quantos dominam pelo menos uma?
                        <br />
                        <strong className="text-amber-400">
                          |V ∪ B| = 180 + 150 − 60 = 270
                        </strong>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Encontrando a Interseção",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        A fórmula pode ser invertida para{" "}
                        <strong>encontrar a interseção</strong> quando sabemos a
                        união:
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                        <p className="font-mono text-base font-bold text-amber-400">
                          |A ∩ B| = |A| + |B| − |A ∪ B|
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          <strong className="text-amber-400">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Muitas questões pedem quem{" "}
                        <strong>não pertence a nenhum</strong> conjunto. Basta
                        subtrair a união do universo:
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                        <p className="font-mono text-base font-bold text-amber-400">
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
              variant="blue"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="Fórmula de 3 Conjuntos: A + B + C − Pares + Tripla"
              icone="⭕"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "A Fórmula Completa",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-mono text-xl font-bold text-amber-400 leading-relaxed text-foreground/85">
                          |A∪B∪C| = |A| + |B| + |C|
                          <br />
                          &nbsp;&nbsp;− |A∩B| − |A∩C| − |B∩C|
                          <br />
                          &nbsp;&nbsp;+ |A∩B∩C|
                        </p>
                      </div>
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        <strong>Enunciado:</strong> Numa plataforma P-55, 400
                        operadores foram auditados. 200 têm NR-10, 160 têm
                        NR-13, 80 têm NR-35, 60 têm NR-10 e NR-13, 40 têm NR-10
                        e NR-35, 30 têm NR-13 e NR-35, 20 têm as três. Quantos
                        têm pelo menos uma?
                      </p>
                      <div className="p-4 bg-amber-800 dark:bg-amber-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-lg text-foreground/85 leading-relaxed space-y-1">
                        <p className="text-amber-400">
                          // Aplicando a fórmula:
                        </p>
                        <p className="text-muted-foreground">
                          = 200 + 160 + 80 − 60 − 40 − 30 + 20
                        </p>
                        <p className="text-muted-foreground">
                          = 440 − 130 + 20
                        </p>
                        <p className="text-amber-400 font-bold">
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
              variant="blue"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="Conjuntos Disjuntos e Subconjuntos"
              icone="🔀"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Caso 1: Conjuntos Disjuntos",
                  icone: "○○",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Se <strong>A ∩ B = ∅</strong> (disjuntos), a fórmula
                        simplifica:
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                        <p className="font-mono text-base text-amber-400">
                          |A ∪ B| = |A| + |B|
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          <strong className="text-amber-400">Exemplo:</strong>{" "}
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Se <strong>A ⊂ B</strong>, então{" "}
                        <strong>A ∩ B = A</strong> e <strong>A ∪ B = B</strong>:
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          <strong className="text-amber-400">Exemplo:</strong>{" "}
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
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em pesquisa com 200 pessoas sobre uso de combustíveis: 100 usam gasolina (G), 80 usam etanol (E), 50 usam GNV, 30 usam G e E, 20 usam G e GNV, 15 usam E e GNV, 10 usam os três. Quantas usam apenas gasolina?"
          alternativas={[
            { letra: "A", texto: "50", correta: false },
              { letra: "B", texto: "60", correta: true },
              { letra: "C", texto: "70", correta: false },
              { letra: "D", texto: "80", correta: false },
              { letra: "E", texto: "100", correta: false }
          ]}
          dicaEstrategica="Na fórmula de Venn com 3 conjuntos, somamos a tripla interseção porque ela foi subtraída duas vezes."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Apenas G = n(G) - n(G∩E) - n(G∩GNV) + n(G∩E∩GNV) = 100 - 30 - 20 + 10 = 60." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              moduloNumero={6}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 6",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 6",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Fórmula da Inclusão-Exclusão",
                    type: "Mapa Mental",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: âmbar #FF8F00, teal #00897B, rosa. Node central: INCLUSÃO-EXCLUSÃO. Ramos: Para 2 conjuntos: n(A∪B)=n(A)+n(B)-n(A∩B), Para 3 conjuntos: fórmula completa com +n(A∩B∩C), Estratégia visual (diagrama de Venn), Aplicações (pesquisas, enquetes, grupos). Fórmula de 2 conjuntos em destaque grande. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-6/m6-conceito.png",
                  },
                  {
                    title: "Aplicando a Fórmula — Passo a Passo",
                    type: "Passo a Passo",
                    placeholderColor: "bg-orange-100 dark:bg-orange-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: âmbar, teal. Título: INCLUSÃO-EXCLUSÃO NA PRÁTICA. Problema modelo: 'De 100 alunos, 60 estudam Matemática, 50 estudam Português e 20 estudam ambas. Quantos estudam pelo menos uma?' Solução passo a passo: 1️⃣ n(A∪B)=60+50-20=90. 2️⃣ Somente Matemática=60-20=40. 3️⃣ Somente Português=50-20=30. 4️⃣ Nenhum=100-90=10. Diagrama de Venn com valores preenchidos. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-6/m6-formula.png",
                  },
                  {
                    title: "Pegadinhas — Inclusão-Exclusão",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ PEGADINHAS — INCLUSÃO-EXCLUSÃO. Grid: ✅ Subtrair a interseção na União vs ❌ Somar tudo diretamente. ✅ 'Somente A'=n(A)-n(A∩B) vs ❌ 'Somente A'=n(A). ✅ 'Nenhum'=Total-n(A∪B) vs ❌ 'Nenhum'=0. ✅ 'Ao menos um'=n(A∪B) vs ❌ 'Ao menos um'=n(A)+n(B). Caixa âmbar: ⚠️ Diferença entre 'somente um' e 'ao menos um'! Caixa teal: 💡 MACETE: Sempre preencha o Venn de dentro pra fora. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-6/m6-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: O Segredo da Contagem",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">
                      🧮 ➕ ➖ 🎯
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Para não contar ninguém duas vezes:{" "}
                      <strong>Some os simples</strong>,{" "}
                      <strong>Subtraia os pares</strong> e{" "}
                      <strong>Some as triplas</strong>. É a dança dos sinais que
                      garante o gabarito."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                          <span>➕</span> SOMA SIMPLES
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Considere os totais individuais.
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                          <span>🎯</span> DESCONTO ÚNICO
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Subtraia a interseção (A ∩ B).
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                          <span>⚡</span> REGRA DE 3
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">A + B + C − Duplas + Tripla.</p>
                      </div>
                      <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                        <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                          <span>🔍</span> NENHUM
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Universo − União. Resolve o problema!
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizInclusaoExclusao}
              titulo="QUIZ: Inclusão-Exclusão"
              icone="🧮"
              numero={5}
              variant="blue"
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
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M7 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Conjuntos Numéricos Discretos: Naturais, Inteiros e Racionais"
            description="Aprofundando-se nos primeiros degraus da hierarquia"
            variant="blue"
          />

          <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
            <p>
              O conjunto dos Números Naturais (ℕ) é o mais antigo e fundamental
              — foi o primeiro conjunto numérico que a humanidade desenvolveu
              para contar objetos. Na convenção brasileira e adotada pela
              CESGRANRIO, ℕ = {"{"}0, 1, 2, 3, 4, ...{"}"}, incluindo o zero.
              Alguns contextos, especialmente europeus, definem ℕ* = {"{"}1, 2,
              3, ...{"}"} (excluindo zero). A prova CESGRANRIO frequentemente
              testa essa nuance perguntando: "Quantos naturais existem entre 1 e
              10?" Se o candidato esquecer que 0 ∈ ℕ, pode perder uma questão.
              Propriedades: (1) é um conjunto infinito, (2) é bem-ordenado (todo
              subconjunto não vazio tem mínimo), (3) é fechado sob adição e
              multiplicação (a + b ∈ ℕ e a·b ∈ ℕ para todo a, b ∈ ℕ), mas NÃO é
              fechado sob subtração (3 - 5 = -2 ∉ ℕ). Esta "lacuna" motivou a
              criação dos números inteiros.
            </p>

            <p>
              O conjunto dos Números Inteiros (ℤ, do alemão "Zahl") surgiu para
              permitir subtração sem restrições. ℤ = {"{"}..., -3, -2, -1, 0, 1,
              2, 3, ...{"}"} e é fechado sob adição, subtração e multiplicação.
              Propriedades: (1) é infinito tanto positivamente quanto
              negativamente (|ℤ| = ∞), (2) contém ℕ como subconjunto próprio (ℕ
              ⊂ ℤ), (3) tem cardinalidade igual a ℕ (ambos infinitos contáveis,
              |ℕ| = |ℤ| na teoria de Cantor), (4) pode ser particionado em
              inteiros pares e ímpares. Subconjuntos importantes: ℤ* = {"{"}...,
              -2, -1, 1, 2, ...{"}"} (sem zero), ℤ+ = ℕ (inteiros
              não-negativos), ℤ- = {"{"}..., -3, -2, -1, 0{"}"} (inteiros
              não-positivos). Na prática Petrobras, temperaturas podem ser
              negativas (inteiros), posições relativas (acima/abaixo de um
              referencial) usam ℤ.
            </p>

            <p>
              O conjunto dos Números Racionais (ℚ, de "quociente") é definido
              como ℚ = {"{"}p/q | p ∈ ℤ, q ∈ ℤ*{"}"}. Isto é, são frações onde
              numerador é inteiro e denominador é inteiro não-nulo. Inclui:
              todos os inteiros (5 = 5/1), frações próprias (1/2), frações
              impróprias (7/3), decimais finitos (0.5 = 1/2, 0.25 = 1/4), e
              decimais periódicos (1/3 = 0.333..., 1/7 = 0.142857142857...).
              Propriedade crucial: entre quaisquer dois racionais distintos,
              existe sempre outro racional. Logo, ℚ é DENSO em ℝ. Isso significa
              que podemos nos aproximar arbitrariamente de qualquer número real
              usando apenas racionais. No entanto, ℚ tem "lacunas" — os
              irracionais √2, π, e. A cardinalidade: |ℚ| = |ℕ| (ambos infinitos
              contáveis, surpreendentemente). Isto foi provado por Cantor
              através da "diagonalização" — é possível enumerar todos os
              racionais, mesmo que pareça haver "mais" deles do que naturais.
            </p>

            <p>
              Um ponto crítico testado em CESGRANRIO é a representação decimal
              de racionais. Todo racional tem uma expansão decimal que é FINITA
              ou PERIÓDICA (ou seja, eventualmente repete um padrão). Exemplos:
              1/2 = 0.5 (finita), 1/3 = 0.333... (periódica simples), 1/6 =
              0.1666... (periódica mista — não repete desde o início). A
              recíproca é verdadeira: toda expansão decimal finita ou periódica
              representa um racional. Isto é usado para identificar racionais vs
              irracionais: √2 ≈ 1.414213562373... (não periódica) → irracional,
              π ≈ 3.14159265... (não periódica) → irracional. Na prática:
              medições em ℚ (com unidades de precisão finita), preços em ℚ
              (números com centavos), proporções em receitas ou processos
              industrias usam ℚ. Mas qualquer valor "contínuo" na natureza
              (comprimento, tempo, energia) é teoricamente um real, aproximado
              em prática por ℚ.
            </p>

            <p>
              A CESGRANRIO testa esses três conjuntos através de: (1)
              Classificação (5 ∈ ℚ? Sim. -3 ∈ ℕ? Não, pois ℕ não contém
              negativos. π ∈ ℚ? Não.), (2) Operações (ℕ é fechado sob
              multiplicação? Sim. ℤ é fechado sob divisão? Não.). (3) Relações
              (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ), (4) Problemas contextualizados. Um erro muito
              comum é esquecer que 0 ∈ ℕ em algumas provas. Outro é não
              reconhecer que frações como 2/4 = 1/2 são o mesmo racional
              (representações diferentes do mesmo número). Um terceiro é
              confundir "racional" com "racionalizável" — √2 NÃO é racional, mas
              pode ser racionalizado (multiplicando por √2/√2). Dominar essas
              distinções é essencial.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-3">
              <h4 className="font-bold text-foreground">
                Definições e Relações
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xl text-foreground/85 leading-relaxed">
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-blue-200 dark:border-blue-700">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    ℕ (Naturais)
                  </span>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-1">
                    {"{"}0, 1, 2, 3, ...{"}"} — contagem
                  </div>
                </div>
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-blue-200 dark:border-blue-700">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    ℤ (Inteiros)
                  </span>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-1">
                    {"{"}..., -1, 0, 1, ...{"}"} — subtração ilimitada
                  </div>
                </div>
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-blue-200 dark:border-blue-700">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    ℚ (Racionais)
                  </span>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-1">
                    {"{"} p/q | p∈ℤ, q∈ℤ* {"}"} — frações e decimais
                    finitos/periódicos
                  </div>
                </div>
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-blue-200 dark:border-blue-700">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    ℕ ⊂ ℤ ⊂ ℚ
                  </span>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-1">
                    Hierarquia: cada contém o anterior como subconjunto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Naturais (ℕ): A Origem dos Números"
              description="Os primeiros números que existiram — e que a CESGRANRIO usa para criar armadilhas."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O Conjunto ℕ e suas propriedades"
              icone="0️⃣"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e o Zero",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        <strong>ℕ = {"{0, 1, 2, 3, 4, ...}"}</strong> — Na
                        convenção brasileira (adotada pela CESGRANRIO), o{" "}
                        <strong className="text-blue-400">
                          zero pertence a ℕ
                        </strong>
                        . Isso é frequentemente explorado em provas.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-2">
                            Contexto Industrial ✅
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
                            Número de turnos trabalhados em um mês, quantidade
                            de válvulas inspecionadas, número de funcionários em
                            um setor — todos ∈ ℕ.
                          </p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-2">
                            NÃO é Natural ❌
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
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
              variant="blue"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="ℤ = {..., -2, -1, 0, 1, 2, ...}"
              icone="±"
              corIndicador="bg-blue-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Quando precisamos dos Inteiros",
                  icone: "🌡️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
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
                              <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
                                Que conjunto numérico classifica temperaturas?
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-3 text-left">
                              <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 border-b border-border/30 pb-2">
                                Resposta
                              </p>
                              <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground leading-relaxed">
                                Temperaturas como -12°C (criogênico), 0°C,
                                +250°C — podem ser positivas, negativas ou zero.
                                Conjunto mínimo:{" "}
                                <strong className="text-blue-400">ℤ</strong> (se
                                sempre inteiras) ou{" "}
                                <strong className="text-blue-400">ℚ</strong> (se
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
                              <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
                                Saldo de ±metros num tanque de petróleo
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-3 text-left">
                              <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 border-b border-border/30 pb-2">
                                Resposta
                              </p>
                              <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground leading-relaxed">
                                +3m (acima do nível), -2m (abaixo), 0m (no
                                nível). Como pode ser positiva, negativa ou nula
                                e sempre inteira em metros:{" "}
                                <strong className="text-blue-400">ℤ</strong> é o
                                conjunto mínimo.
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Todo número natural é também inteiro (ℕ ⊂ ℤ), mas nem
                        todo inteiro é natural. Os inteiros{" "}
                        <strong className="text-blue-400">negativos</strong> são
                        o que diferencia ℤ de ℕ.
                      </p>
                      <div className="p-4 bg-blue-800 dark:bg-blue-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-lg text-foreground/85 leading-relaxed">
                        <p className="text-blue-400">
                          ℕ = {"{"}0, 1, 2, 3, 4, 5...{"}"}
                        </p>
                        <p className="text-blue-400 mt-1">
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
              variant="blue"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="ℚ: O conjunto das frações e dízimas periódicas"
              icone="½"
              corIndicador="bg-blue-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Definição Formal e Exemplos",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        <strong>ℚ</strong> = todos os números que podem ser
                        escritos como{" "}
                        <strong className="text-blue-400">p/q</strong>, com{" "}
                        <em>p, q ∈ ℤ e q ≠ 0</em>. Incluem frações exatas e
                        dízimas periódicas.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-1">
                            ∈ ℚ
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
                            3/4 = 0,75
                            <br />
                            1/3 = 0,333...
                            <br />
                            -7 = -7/1
                            <br />
                            0,6 = 3/5
                          </p>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-1">
                            ∉ ℚ
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Toda dízima periódica é racional. Fórmula de conversão
                        (dízima simples com período de 1 dígito):
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 font-mono text-lg text-foreground/85 leading-relaxed space-y-2">
                        <p className="text-blue-400">
                          // x = 0,333... (período = 3)
                        </p>
                        <p className="text-muted-foreground">10x = 3,333...</p>
                        <p className="text-muted-foreground">
                          10x − x = 3,333... − 0,333...
                        </p>
                        <p className="text-muted-foreground">9x = 3</p>
                        <p className="text-blue-400 font-bold">
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
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em pesquisa com 200 pessoas sobre uso de combustíveis: 100 usam gasolina (G), 80 usam etanol (E), 50 usam GNV, 30 usam G e E, 20 usam G e GNV, 15 usam E e GNV, 10 usam os três. Quantas usam apenas gasolina?"
          alternativas={[
            { letra: "A", texto: "50", correta: false },
              { letra: "B", texto: "60", correta: true },
              { letra: "C", texto: "70", correta: false },
              { letra: "D", texto: "80", correta: false },
              { letra: "E", texto: "100", correta: false }
          ]}
          dicaEstrategica="Na fórmula de Venn com 3 conjuntos, somamos a tripla interseção porque ela foi subtraída duas vezes."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Apenas G = n(G) - n(G∩E) - n(G∩GNV) + n(G∩E∩GNV) = 100 - 30 - 20 + 10 = 60." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              moduloNumero={7}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 7",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 7",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "ℕ, ℤ, ℚ — Mapa Comparativo",
                    type: "Mapa Mental",
                    placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: azul #1565C0, verde #43A047, teal. Três blocos principais conectados por setas de inclusão: ℕ (azul claro): {0,1,2,3,...} — positivos e zero, sem frações, sem negativos. ℤ (azul médio): {...,-2,-1,0,1,2,...} — inclui negativos, sem frações. ℚ (azul escuro): a/b com b≠0, inclui dízimas periódicas e finitas. Destaque: ℕ⊂ℤ⊂ℚ com setas visuais de inclusão. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-7/m7-conceito.png",
                  },
                  {
                    title: "Operações nos Conjuntos ℕ, ℤ, ℚ",
                    type: "Passo a Passo",
                    placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: azul, teal. Título: FECHAMENTO DAS OPERAÇÕES. Tabela visual 4×3: Operação | ℕ | ℤ | ℚ. Adição: ✅ | ✅ | ✅. Subtração: ❌ | ✅ | ✅. Multiplicação: ✅ | ✅ | ✅. Divisão: ❌ | ❌ | ✅ (b≠0). Exemplo: 3-5=-2 ∉ ℕ mas ∈ ℤ. 3÷4=0,75 ∉ ℤ mas ∈ ℚ. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-7/m7-formula.png",
                  },
                  {
                    title: "Pegadinhas — ℕ, ℤ, ℚ",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Título: ⚠️ PEGADINHAS — ℕ ℤ ℚ. Grid: ✅ 0 ∈ ℕ vs ❌ ℕ só tem positivos. ✅ -3 ∈ ℤ mas ∉ ℕ vs ❌ Todo número inteiro é natural. ✅ 0,333...=1/3 ∈ ℚ vs ❌ 0,333... é irracional. ✅ ℤ inclui negativos vs ❌ ℤ só tem positivos e zero. Caixa âmbar: ⚠️ 0 (zero) pertence a ℕ, ℤ e ℚ! Caixa teal: 💡 MACETE: Inteiros = Naturais + Negativos | Racionais = Inteiros + Frações. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-7/m7-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: O DNA dos Números",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">
                      0️⃣ ℤ ℚ 🔄
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Para gabaritar classificação: Lembre que o{" "}
                      <strong>Zero é Natural</strong>, negativos são{" "}
                      <strong>Inteiros</strong> e tudo que pode ser uma fraçao é{" "}
                      <strong>Racional</strong> (incluindo as dízimas
                      periódicas!)."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>ℕ</span> NATURAIS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Inteiros não negativos: {"{0, 1, 2...}"}.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>ℤ</span> INTEIROS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Naturais + Seus opostos negativos.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>ℚ</span> RACIONAIS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Frações, decimais finitos e dízimas.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <p className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                          <span>⊂</span> INCLUSÃO
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          ℕ tá em ℤ, que tá em ℚ. Sempre!
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizNumericosBasicos}
              titulo="QUIZ: ℕ, ℤ, ℚ"
              icone="🔢"
              numero={5}
              variant="blue"
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
          variant="blue"
        />

        {/* ═══ RICH INTRO SECTION M8 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Números Irracionais e o Conjunto dos Reais"
            description="As lacunas em ℚ e a completude do contínuo"
            variant="blue"
          />

          <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
            <p>
              Números Irracionais (𝕀) são números reais que NÃO podem ser
              expressos como razão entre inteiros p/q. Sua característica
              distintiva é que sua representação decimal é INFINITA E NÃO
              PERIÓDICA — os dígitos continuam para sempre sem repetir um
              padrão. Os irracionais preenchem as "lacunas" deixadas pelos
              racionais na reta numérica. Embora haja infinitos racionais
              (infinito contável), há ainda MAIS infinitos irracionais (infinito
              incontável). Os mais famosos irracionais são: (1) √2 ≈
              1.41421356... (a diagonal de um quadrado unitário), provado
              irracional pelos pitagóricos antigos através de prova por absurdo,
              (2) π ≈ 3.14159265... (razão circunferência/diâmetro), provado
              irracional por Lambert em 1761, (3) e ≈ 2.71828182... (base dos
              logaritmos naturais), (4) φ ≈ 1.61803398... (razão áurea,
              encontrada na natureza). Existe uma infinidade incontável de
              irracionais — quase todo número real é irracional.
            </p>

            <p>
              A diferença essencial entre racionais e irracionais reside na
              estrutura de sua representação decimal. 1/3 = 0.333... (periódico,
              período 1), 1/7 = 0.142857142857... (periódico, período 6), mas √2
              não repete — qualquer padrão que você identifique em seus
              primeiros dígitos eventualmente falha. Isto é formalmente provado:
              se √2 = p/q (reduzido), então 2 = p²/q², logo 2q² = p². Isto
              implica p² é par, logo p é par. Escreva p = 2m, então 2q² = 4m²,
              logo q² = 2m². Isto implica q² é par, logo q é par. Mas se ambos p
              e q são pares, então p/q não está reduzido — contradição.
              Portanto, √2 é irracional. Este argumento generaliza: √n é
              irracional para qualquer n que não seja um quadrado perfeito.
            </p>

            <p>
              O conjunto dos Números Reais (ℝ) é definido como ℝ = ℚ ∪ 𝕀, a
              união de todos os racionais com todos os irracionais.
              Geometricamente, ℝ corresponde a todos os pontos em uma reta
              infinita (a "reta real"). Há uma correspondência biunívoca entre
              pontos da reta e números reais — isto é tão fundamental que
              chamamos de "completude" da reta real. Propriedades: (1) ℝ é um
              corpo (fechado sob +, -, ×, ÷), (2) ℝ é ordenado (para quaisquer
              a, b ∈ ℝ, ou a {"<"} b ou a = b ou a {">"} b), (3) ℝ é completo
              (todo subconjunto não-vazio e limitado superiormente tem um
              supremo), (4) ℝ tem cardinalidade |ℝ| = ∞ incontável (a
              cardinalidade do contínuo), que é MAIOR que |ℕ| = |ℤ| = |ℚ| = ∞
              contável. Este último fato, provado por Cantor, foi
              revolucionário: existem "mais" infinitos irracionais do que
              números naturais!
            </p>

            <p>
              Operações com irracionais apresentam propriedades interessantes.
              √2 + √2 = 2√2 é irracional, mas √2 - √2 = 0 é racional (inteiro,
              até). √2 · √2 = 2 é racional. √2 / √2 = 1 é racional. Logo, a
              soma, produto e quociente de irracionais pode resultar em
              racionais. Mas a soma ou produto de um racional não-nulo com um
              irracional é sempre irracional. Para provar: se r ∈ ℚ, r ≠ 0, e x
              ∈ 𝕀, suponha r + x = q ∈ ℚ. Então x = q - r ∈ ℚ (diferença de
              racionais), contradição. Logo, r + x ∈ 𝕀. Na prática Petrobras,
              valores contínuos como pressão, temperatura, e fluxo são modelados
              como reais. Porém, instrumentos medem com precisão finita,
              produzindo aproximações em ℚ. Compreender que a realidade é ℝ, mas
              os dados são ℚ, é importante para análise de incerteza e precisão.
            </p>

            <p>
              A CESGRANRIO testa irracionais e reais através de: (1)
              Classificação (√4 = 2 é racional?, Sim. √5 é racional?, Não. π + 1
              é irracional?, Sim.). (2) Operações (√2 · √3 = √6 é irracional?,
              Sim. √4 = 2 é racional?, Sim.). (3) Relacionamentos (ℚ ⊂ ℝ? Sim. 𝕀
              ⊂ ℝ? Sim. ℚ ∩ 𝕀 = ∅? Sim, são disjuntos). (4) Problemas
              contextualizados. Erros comuns: (1) confundir irracional com "não
              é número" — é um número real completamente válido, (2) pensar que
              √4 = ±2 é irracional — não, é racional (especificamente 2), (3)
              não reconhecer que √(a·b) = √a · √b só quando a, b ≥ 0, (4) não
              perceber que alguns números parecem complexos mas são simples —
              exemplo: √(3 + 2√2) = 1 + √2, um irracional que "simplifica" a
              outro irracional. Mastering reals é dominar o sistema numérico
              completo que sustenta toda a Análise Matemática.
            </p>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                A Hierarquia Completa dos Números
              </h4>
              <div className="space-y-2 text-xl font-mono text-foreground/85 leading-relaxed">
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-emerald-200 dark:border-emerald-700">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                    ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ
                  </div>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-1">
                    Toda hierarquia: cada contém o anterior
                  </div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-emerald-200 dark:border-emerald-700">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                    ℝ = ℚ ∪ 𝕀 (disjuntos)
                  </div>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-1">
                    Reais = Racionais ∪ Irracionais (partição)
                  </div>
                </div>
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-emerald-200 dark:border-emerald-700">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                    |ℕ| = |ℤ| = |ℚ| &lt; |ℝ|
                  </div>
                  <div className="text-lg text-foreground/85 leading-relaxed mt-1">
                    Infinitos contáveis &lt; Infinito incontável (Cantor)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Números Irracionais"
              description="Dízimas infinitas sem padrão — impossíveis de escrever como fração."
              variant="blue"
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Um número é <strong>irracional</strong> quando{" "}
                        <em>não pode ser escrito como p/q</em> com p, q
                        inteiros. Sua representação decimal é uma{" "}
                        <strong className="text-emerald-400">
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
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 mb-2">
                            Na Engenharia Petrobras
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
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
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 mb-2">
                            Pegadinhas CESGRANRIO
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
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
              variant="blue"
              className="mb-6 mt-10"
            />
            <ContentAccordion
              titulo="A propriedade da densidade dos Reais"
              icone="←→"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "ℝ é a Reunião Completa",
                  icone: "🌊",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        O conjunto dos Reais é <strong>ℝ = ℚ ∪ (ℝ∖ℚ)</strong> —
                        a reunião dos racionais com os irracionais. As duas
                        partes são{" "}
                        <strong className="text-emerald-400">disjuntas</strong>:
                        um número não pode ser racional e irracional ao mesmo
                        tempo.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-xl font-bold text-emerald-400 mb-2 text-foreground/85 leading-relaxed">
                          Propriedade da Densidade
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground">
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
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed text-emerald-400">
                          ✅ Todo racional é real (ℚ ⊂ ℝ)
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed text-emerald-400">
                          ✅ Todo irracional é real (Irr ⊂ ℝ)
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed text-emerald-400">
                          ❌ Todo real é racional (FALSO — existem irracionais)
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed text-emerald-400">
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
              variant="blue"
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        <strong>√n é racional</strong> somente quando n é um{" "}
                        <strong className="text-emerald-400">
                          quadrado perfeito
                        </strong>{" "}
                        (1, 4, 9, 16, 25, 36, 49, 64, 81, 100...). Caso
                        contrário, √n é irracional.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 mb-2">
                            Racionais ✅
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground font-mono">
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
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 mb-2">
                            Irracionais ❌
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground font-mono">
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
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em pesquisa com 200 pessoas sobre uso de combustíveis: 100 usam gasolina (G), 80 usam etanol (E), 50 usam GNV, 30 usam G e E, 20 usam G e GNV, 15 usam E e GNV, 10 usam os três. Quantas usam apenas gasolina?"
          alternativas={[
            { letra: "A", texto: "50", correta: false },
              { letra: "B", texto: "60", correta: true },
              { letra: "C", texto: "70", correta: false },
              { letra: "D", texto: "80", correta: false },
              { letra: "E", texto: "100", correta: false }
          ]}
          dicaEstrategica="Na fórmula de Venn com 3 conjuntos, somamos a tripla interseção porque ela foi subtraída duas vezes."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Apenas G = n(G) - n(G∩E) - n(G∩GNV) + n(G∩E∩GNV) = 100 - 30 - 20 + 10 = 60." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              moduloNumero={8}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 8",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 8",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Irracionais e a Reta Real ℝ",
                    type: "Mapa Mental",
                    placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: verde #43A047, teal #00897B, rosa. Node central: IRRACIONAIS ℙ e REAIS ℝ. Ramos: Irracional (dízima infinita não periódica: π, √2, √3, e, φ), Real = ℚ ∪ ℙ, Reta real (todos os pontos), Propriedades (denso, completo, ordenado). Visual da reta numérica com pontos racionais e irracionais marcados. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-8/m8-conceito.png",
                  },
                  {
                    title: "Como Identificar Irracionais",
                    type: "Passo a Passo",
                    placeholderColor: "bg-green-100 dark:bg-green-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: verde, teal. Título: É IRRACIONAL? Fluxograma de decisão: Pergunta 1: 'É uma raiz quadrada?' → Se sim: 'O radicando é quadrado perfeito?' → Sim=Racional, Não=Irracional. Pergunta 2: 'É π, e ou φ?' → Sim=Irracional. Exemplos: √4=2 Racional ✅. √2=1,41421... Irracional ✅. √9=3 Racional ✅. π=3,14159... Irracional ✅. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-8/m8-formula.png",
                  },
                  {
                    title: "Pegadinhas — Irracionais e ℝ",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Título: ⚠️ PEGADINHAS — IRRACIONAIS. Grid: ✅ √4=2 é racional vs ❌ Toda raiz é irracional. ✅ π é irracional vs ❌ π=22/7 (22/7 é só aproximação!). ✅ 0,101001000... é irracional vs ❌ Toda dízima é racional. ✅ ℝ=ℚ∪ℙ (sem sobreposição) vs ❌ Racional pode ser irracional. Caixa âmbar: ⚠️ Raízes de quadrados perfeitos são racionais! Caixa teal: 💡 MACETE: Irracional = dízima infinita SEM período repetido. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-8/m8-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: O Infinito sem Padrão",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">
                      ∞ π √2 🚫
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Os <strong>Irracionais</strong> são os rebeldes da
                      matemática: não podem ser frações e suas dízimas são
                      infinitas e sem repetição. Juntos com os Racionais, eles
                      formam os <strong>Reais</strong>."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>𝕀</span> IRRACIONAIS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          √Não-perfeitos, π, e. Sem padrão.
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>ℝ</span> REAIS
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Q ∪ I. Toda a reta numérica.</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>🎯</span> 0,9... = 1
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          0,999... é Racional e é EXATAMENTE 1.
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <span>🚫</span> EXCLUSIVIDADE
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Ou é Q ou é I. Q ∩ I = ∅.</p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizIrracReais}
              titulo="QUIZ: Irracionais e ℝ"
              icone="∞"
              numero={5}
              variant="blue"
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
          variant="blue"
        />
        {/* ═══ RICH INTRO SECTION M9 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Leis de De Morgan: O Coração da Lógica"
            description="Entenda o que são e por que elas dominam as questões avançadas da CESGRANRIO."
            variant="blue"
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              <strong>Contexto:</strong> A CESGRANRIO tem paixão por negar
              afirmações. Se te dizem que algo "não é A ou B", como traduzir
              isso matematicamente? Augusto De Morgan formalizou as regras
              exatas de como a negação (complementar) interage com as operações
              de união e interseção, conectando a Teoria dos Conjuntos à Lógica
              Proposicional.
            </p>
            <p>
              <strong>Explicação:</strong> As Leis de De Morgan afirmam que, ao
              aplicarmos o complementar sobre um grupo de operações, ele
              "entra", altera todos os conjuntos para seus respectivos
              complementares e, o mais importante,{" "}
              <strong>inverte o operador</strong>. A união (OU) vira interseção
              (E), e a interseção vira união.
            </p>
            <p>
              <strong>Aplicação na Indústria:</strong> Pense em um sistema de
              controle na Refinaria de Paulínia (REPLAN). Se um alerta soa
              quando a pressão "não está (alta E oscilando)", pela Lei de De
              Morgan, isso significa que a pressão "não está alta" OU "não está
              oscilando". Falhar na interpretação dessas portas lógicas no mundo
              real leva a falsos positivos em painéis SCADA e alarmes de
              emergência. A prova avalia sua capacidade de fazer essa exata
              tradução.
            </p>
          </div>
        </section>

        <div className="space-y-[50px]">
          {/* ═══ CARD 1: 1ª LEI DE DE MORGAN ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="1ª Lei de De Morgan: (A ∪ B)ᶜ"
              description="O complementar da UNIÃO é a INTERSEÇÃO dos complementares."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ"
              icone="🔁"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Enunciado e Regra Mnemônica",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-rose-400">
                          (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ
                        </p>
                      </div>
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        O complementar da <strong>união</strong> é a interseção
                        dos complementares. Para memorizar:{" "}
                        <strong className="text-rose-400">
                          &quot;Complementar entra, troca o operador e distribui
                          o apóstrofe&quot;
                        </strong>
                        .
                      </p>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          <strong className="text-rose-400">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Verificação com U = {"{1,...,10}"}, A = {"{1,2,3,4,5}"},
                        B = {"{4,5,6,7}"}:
                      </p>
                      <div className="p-4 bg-rose-800 dark:bg-rose-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-lg text-foreground/85 leading-relaxed space-y-1">
                        <p className="text-rose-400">
                          A ∪ B = {"{1,2,3,4,5,6,7}"}
                        </p>
                        <p className="text-rose-400">(A ∪ B)ᶜ = {"{8,9,10}"}</p>
                        <p className="text-muted-foreground">─────</p>
                        <p className="text-rose-400">Aᶜ = {"{6,7,8,9,10}"}</p>
                        <p className="text-rose-400">Bᶜ = {"{1,2,3,8,9,10}"}</p>
                        <p className="text-rose-400">
                          Aᶜ ∩ Bᶜ = {"{8,9,10}"} ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ═══ CARD 2: 2ª LEI DE DE MORGAN ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="2ª Lei de De Morgan: (A ∩ B)ᶜ"
              description="O complementar da INTERSEÇÃO é a UNIÃO dos complementares."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ"
              icone="🔀"
              corIndicador="bg-rose-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Enunciado e Aplicação Industrial",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-rose-400">
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
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          <strong className="text-rose-400">
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
          </section>

          {/* ═══ CARD 3: SIMPLIFICAÇÃO EM CASCATA ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Simplificação em Cascata"
              description="Aplicando De Morgan duas vezes — o nível avançado das provas."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Dupla aplicação de De Morgan"
              icone="⛓"
              corIndicador="bg-rose-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "(Aᶜ ∩ Bᶜ)ᶜ = ?",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Expressões com duas aplicações de De Morgan são cobradas
                        em questões de nível avançado:
                      </p>
                      <div className="p-4 bg-rose-800 dark:bg-rose-900 rounded-xl border border-border/20 dark:border-white/5 font-mono text-lg text-foreground/85 leading-relaxed space-y-2">
                        <p className="text-rose-400">
                          // Simplificar (Aᶜ ∩ Bᶜ)ᶜ
                        </p>
                        <p className="text-rose-400">
                          Passo 1: Aᶜ ∩ Bᶜ = (A ∪ B)ᶜ &nbsp; [1ª Lei]
                        </p>
                        <p className="text-rose-400">
                          Passo 2: ((A ∪ B)ᶜ)ᶜ = A ∪ B &nbsp; [duplo
                          complementar]
                        </p>
                        <p className="text-rose-400 font-bold">
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
                  conteudo: (
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-xl border border-border/20">
                        <table className="w-full text-lg text-foreground/85 leading-relaxed">
                          <thead>
                            <tr className="bg-rose-500/20">
                              <th className="p-3 text-left text-rose-400 font-bold">
                                Expressão Original
                              </th>
                              <th className="p-3 text-left text-rose-400 font-bold">
                                Equivalente
                              </th>
                              <th className="p-3 text-left text-rose-400 font-bold">
                                Lei
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-t border-border/10">
                              <td className="p-3 font-mono">(A ∪ B)ᶜ</td>
                              <td className="p-3 font-mono text-rose-400">
                                Aᶜ ∩ Bᶜ
                              </td>
                              <td className="p-3">1ª Lei</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3 font-mono">(A ∩ B)ᶜ</td>
                              <td className="p-3 font-mono text-rose-400">
                                Aᶜ ∪ Bᶜ
                              </td>
                              <td className="p-3">2ª Lei</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3 font-mono">(Aᶜ)ᶜ</td>
                              <td className="p-3 font-mono text-rose-400">A</td>
                              <td className="p-3">Duplo compl.</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3 font-mono">(Aᶜ ∩ Bᶜ)ᶜ</td>
                              <td className="p-3 font-mono text-rose-400">
                                A ∪ B
                              </td>
                              <td className="p-3">1ª + Duplo</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3 font-mono">(Aᶜ ∪ Bᶜ)ᶜ</td>
                              <td className="p-3 font-mono text-rose-400">
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
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em pesquisa com 200 pessoas sobre uso de combustíveis: 100 usam gasolina (G), 80 usam etanol (E), 50 usam GNV, 30 usam G e E, 20 usam G e GNV, 15 usam E e GNV, 10 usam os três. Quantas usam apenas gasolina?"
          alternativas={[
            { letra: "A", texto: "50", correta: false },
              { letra: "B", texto: "60", correta: true },
              { letra: "C", texto: "70", correta: false },
              { letra: "D", texto: "80", correta: false },
              { letra: "E", texto: "100", correta: false }
          ]}
          dicaEstrategica="Na fórmula de Venn com 3 conjuntos, somamos a tripla interseção porque ela foi subtraída duas vezes."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Apenas G = n(G) - n(G∩E) - n(G∩GNV) + n(G∩E∩GNV) = 100 - 30 - 20 + 10 = 60." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              moduloNumero={9}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 9",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 9",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Leis de De Morgan — Mapa",
                    type: "Mapa Mental",
                    placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: rosa #E91E8C, azul #1565C0, teal. Node central: LEIS DE DE MORGAN. Ramos: 1ª Lei: (A∪B)'=A'∩B' (complementar da união = interseção dos complementares), 2ª Lei: (A∩B)'=A'∪B' (complementar da interseção = união dos complementares), Aplicações (lógica, banco de dados), Analogia lógica (NÃO(P OU Q) = NÃO P E NÃO Q). Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-9/m9-conceito.png",
                  },
                  {
                    title: "Aplicando De Morgan — Exemplos",
                    type: "Passo a Passo",
                    placeholderColor: "bg-pink-100 dark:bg-pink-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama de fluxo vertical 9:16, fundo branco, estilo concurseira. Cores: rosa, azul. Título: DE MORGAN NA PRÁTICA. Duas seções com caixas coloridas. SEÇÃO 1 (1ª Lei): (A∪B)'=A'∩B'. Passo 1: Se A={1,2,3}, B={3,4,5}, U={1,2,3,4,5,6}. Passo 2: A∪B={1,2,3,4,5} → (A∪B)'={6}. Passo 3: A'={4,5,6}, B'={1,2,6} → A'∩B'={6} ✅. SEÇÃO 2 (2ª Lei): (A∩B)'=A'∪B'. Verificação com mesmo exemplo. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-9/m9-formula.png",
                  },
                  {
                    title: "Pegadinhas — De Morgan",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Título: ⚠️ PEGADINHAS — DE MORGAN. Grid: ✅ (A∪B)'=A'∩B' vs ❌ (A∪B)'=A'∪B'. ✅ (A∩B)'=A'∪B' vs ❌ (A∩B)'=A'∩B'. ✅ Complemento muda ∪↔∩ vs ❌ Complemento mantém a operação. ✅ De Morgan vale na lógica tb vs ❌ De Morgan só para conjuntos. Caixa âmbar: ⚠️ O erro mais comum: não inverter a operação ao distribuir o complementar! Caixa teal: 💡 MACETE: Complemento distribui e INVERTE: ∪ vira ∩ e vice-versa. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-9/m9-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: O Atalho de De Morgan",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">
                      🔁 🔀 📋 ⛓
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Para não se perder nas negações:{" "}
                      <strong>O complementar entra</strong>, troca o sinal (de ∪
                      para ∩ e vice-versa) e distribui o 'não'. É a maneira mais
                      rápida de simplificar expressões complexas."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>🔁</span> 1ª LEI: (A ∪ B)ᶜ
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Vira Aᶜ ∩ Bᶜ. O 'não' vira 'nem'.
                        </p>
                      </div>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>🔀</span> 2ª LEI: (A ∩ B)ᶜ
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Vira Aᶜ ∪ Bᶜ. O 'E' vira 'OU'.
                        </p>
                      </div>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>⛓</span> DUPLO COMPLEMENTAR
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          O (-) com (-) dá (+): (Aᶜ)ᶜ = A.
                        </p>
                      </div>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                        <p className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                          <span>🎯</span> LINGUAGEM DE PROVA
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          "Nem A nem B" sempre será (A ∪ B)ᶜ.
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizDeMorgan}
              titulo="QUIZ: De Morgan"
              icone="🔁"
              numero={4}
              variant="blue"
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
          variant="blue"
        />
        {/* ═══ RICH INTRO SECTION M10 ═══ */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arte do Gabarito: Sintetizando Conjuntos"
            description="Chegou a hora de reunir todo o conhecimento e transformá-lo em pontos na sua prova."
            variant="blue"
          />

          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
            <p>
              <strong>O Fim da Jornada:</strong> Você passou por diagramas de
              Venn, operações complexas, subconjuntos, leis lógicas e a
              classificação minuciosa dos conjuntos numéricos. A banca não cobra
              esses temas de forma isolada; ela os mistura em problemas de
              interpretação de texto e lógica aplicada.
            </p>
            <p>
              <strong>O Segredo dos Aprovados:</strong> A diferença entre o
              candidato que sofre e o que gabarita rapidamente está na
              organização. Desenhar os diagramas corretamente de "dentro para
              fora", dominar as fórmulas de cardinalidade e traduzir os
              conectivos lógicos ("ou", "e", "somente") para a linguagem
              matemática são os pilares da sua aprovação.
            </p>
            <p>
              <strong>O Que Esperar do Simulado:</strong> Este módulo final
              funciona como um "teste de fogo". Primeiro, você terá acesso a um
              formulário expresso com tudo o que precisa estar fresco na sua
              memória e a um roteiro infalível para não cair nas armadilhas da
              CESGRANRIO. Depois, enfrentará 10 questões rigorosamente
              selecionadas para validar o seu domínio absoluto do tema.
            </p>
          </div>
        </section>

        <div className="space-y-[50px]">
          {/* ═══ CARD 1: REVISÃO EXPRESS ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Express — Todas as Fórmulas"
              description="Cole na mente antes de entrar na prova."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Formulário Completo de Conjuntos"
              icone="📋"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Operações Fundamentais",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-xl border border-border/20">
                        <table className="w-full text-lg text-foreground/85 leading-relaxed">
                          <thead>
                            <tr className="bg-violet-500/20">
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Operação
                              </th>
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Símbolo
                              </th>
                              <th className="p-3 text-left text-violet-400 font-bold">
                                Significado
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-muted-foreground">
                            <tr className="border-t border-border/10">
                              <td className="p-3">União</td>
                              <td className="p-3 font-mono text-violet-400">
                                A ∪ B
                              </td>
                              <td className="p-3">Está em A OU em B</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3">Interseção</td>
                              <td className="p-3 font-mono text-violet-400">
                                A ∩ B
                              </td>
                              <td className="p-3">Está em A E em B</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3">Diferença</td>
                              <td className="p-3 font-mono text-violet-400">
                                A − B
                              </td>
                              <td className="p-3">Está em A mas NÃO em B</td>
                            </tr>
                            <tr className="border-t border-border/10 bg-muted/10">
                              <td className="p-3">Complementar</td>
                              <td className="p-3 font-mono text-violet-400">
                                Aᶜ
                              </td>
                              <td className="p-3">Está em U mas NÃO em A</td>
                            </tr>
                            <tr className="border-t border-border/10">
                              <td className="p-3">Conj. das Partes</td>
                              <td className="p-3 font-mono text-violet-400">
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
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20 font-mono text-lg text-foreground/85 leading-relaxed">
                        <p className="text-violet-400 font-bold mb-2">
                          2 Conjuntos:
                        </p>
                        <p className="text-muted-foreground">
                          |A ∪ B| = |A| + |B| − |A ∩ B|
                        </p>
                        <p className="text-muted-foreground">
                          Nenhum = |U| − |A ∪ B|
                        </p>
                      </div>
                      <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20 font-mono text-lg text-foreground/85 leading-relaxed">
                        <p className="text-violet-400 font-bold mb-2">
                          3 Conjuntos:
                        </p>
                        <p className="text-muted-foreground">
                          |A∪B∪C| = |A|+|B|+|C| − |A∩B| − |A∩C| − |B∩C| +
                          |A∩B∩C|
                        </p>
                      </div>
                      <div className="p-3 bg-violet-500/10 rounded-xl border border-violet-500/20 font-mono text-lg text-foreground/85 leading-relaxed">
                        <p className="text-violet-400 font-bold mb-2">
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
          </section>

          {/* ═══ CARD 2: ESTRATÉGIAS DE PROVA ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Estratégias de Prova CESGRANRIO"
              description="Como resolver qualquer questão de conjuntos em 90 segundos."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="🎯 Roteiro de Ataque: Passo a Passo Infalível"
              icone="🎯"
              corIndicador="bg-violet-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "1️⃣ Identificação e Nomeação",
                  icone: "🔤",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Leia o enunciado e extraia o{" "}
                        <strong>Universo (|U|)</strong> e os conjuntos
                        principais. Não comece a calcular antes de nomear cada
                        grupo claramente.
                      </p>
                      <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/20">
                        <p className="text-xl font-bold text-violet-600 dark:text-violet-400 text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        A regra de ouro: sempre comece preenchendo a{" "}
                        <strong>interseção tripla ou dupla</strong>. Se você
                        preencher as bordas primeiro, a conta nunca fechará.
                      </p>
                      <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                        <p className="text-xl line-through text-red-500 text-foreground/85 leading-relaxed">
                          ❌ Colocar o número total de A em sua região maior,
                          sem descontar quem também está em B.
                        </p>
                      </div>
                      <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                        <p className="text-xl font-bold text-green-600 dark:text-green-400 text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Se o enunciado der o total (|A∪B|) e os individuais (|A|
                        e |B|), a interseção sai num estalo pela fórmula de
                        inversão.
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center">
                        <p className="font-mono text-base font-bold text-violet-400">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
                        Calcule o valor de quem pertence a{" "}
                        <strong>apenas um</strong> conjunto subtraindo as
                        interseções. Lembre-se: |A ∪ B| = (A apenas) + (B
                        apenas) + (Interseção).
                      </p>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-500/20">
                        <p className="text-xl italic text-foreground/85 leading-relaxed">
                          "Se total é 100, A é 60 e Inter é 20, então SOMENTE A
                          é 40."
                        </p>
                      </div>
                      <p className="text-lg text-foreground/85 leading-relaxed text-muted-foreground italic">
                        Nota: Para 'Nenhum', subtraia o resultado da união do
                        universo total.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "5️⃣ Valide com De Morgan",
                  icone: "🔁",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
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
          </section>

          {/* ═══ CARD 3: CAMPO MINADO ═══ */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Campo Minado: As 5 Armadilhas Clássicas"
              description="Atenção total onde os candidatos mais erram."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="⚠️ Não caia nessas pegadinhas"
              icone="⚠️"
              corIndicador="bg-violet-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Armadilha 1: √4 não é irracional",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        √4 = 2 (inteiro, portanto racional). Só √n com n
                        não-quadrado-perfeito é irracional.
                      </p>
                      <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                        <p className="text-xl line-through text-red-500 text-foreground/85 leading-relaxed">
                          ❌ Acreditar que toda raiz é irracional.
                        </p>
                      </div>
                      <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                        <p className="text-xl font-bold text-green-600 dark:text-green-400 text-foreground/85 leading-relaxed">
                          ✅ "√9, √16, √25... são todos racionais (Z ⊂ Q)."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 2: A Tripla Interseção",
                  icone: "⭕",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground text-foreground/85 leading-relaxed">
                        {"{0}"} tem 1 elemento (o zero). ∅ = {"{}"} tem 0
                        elementos. São conjuntos completamente diferentes, mas a
                        banca os coloca lado a lado.
                      </p>
                      <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/20">
                        <p className="text-xl font-bold text-violet-600 dark:text-violet-400 text-foreground/85 leading-relaxed">
                          "A cardinalidade de {0} é n=1. A de ∅ é n=0."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 4: Q ⊄ Z (é o contrário)",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground leading-relaxed text-foreground/85">
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
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-muted-foreground italic text-foreground/85 leading-relaxed">
                        Diferencie 'Candidatos que falam inglês' (|I|) de
                        'Candidatos que falam SOMENTE inglês' (|I| - |I∩E|).
                      </p>
                      <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/20 font-bold text-violet-600 dark:text-violet-400">
                        ✅ "Subtraia a interseção sempre que vir 'somente',
                        'apenas' ou 'exclusivamente'."
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ═══ MODULE CONSOLIDATION E QUIZ ═══ */}
          <section id="quiz-modulo-10" className="mt-16">
                    {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em pesquisa com 200 pessoas sobre uso de combustíveis: 100 usam gasolina (G), 80 usam etanol (E), 50 usam GNV, 30 usam G e E, 20 usam G e GNV, 15 usam E e GNV, 10 usam os três. Quantas usam apenas gasolina?"
          alternativas={[
            { letra: "A", texto: "50", correta: false },
              { letra: "B", texto: "60", correta: true },
              { letra: "C", texto: "70", correta: false },
              { letra: "D", texto: "80", correta: false },
              { letra: "E", texto: "100", correta: false }
          ]}
          dicaEstrategica="Na fórmula de Venn com 3 conjuntos, somamos a tripla interseção porque ela foi subtraída duas vezes."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Apenas G = n(G) - n(G∩E) - n(G∩GNV) + n(G∩E∩GNV) = 100 - 30 - 20 + 10 = 60." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
              index={4}
              moduloNumero={10}
              variant="blue"
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Revisão do Módulo 10",
                duration: "8:30",
              }}
              resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: "Conjuntos",
                materia: "Matemática",
                images: [
                  {
                    title: "Revisão Geral — Mapa de Conjuntos Completo",
                    type: "Mapa Mental",
                    placeholderColor: "bg-violet-100 dark:bg-violet-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Mapa mental retrato 9:16, fundo creme, estilo concurseira. Cores: lilás #7B1FA2, teal #00897B, âmbar. Node central: CONJUNTOS — REVISÃO COMPLETA. Grandes ramos: Fundamentos (∈,⊂,∅,n(A)), Operações (∪,∩,-,'), Venn (2 e 3 conjuntos), Numéricos (ℕ⊂ℤ⊂ℚ⊂ℝ), De Morgan (2 leis). Mini-fórmulas em cada ramo. Visual colorido de mapa completo para revisão. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-10/m10-conceito.png",
                  },
                  {
                    title: "Fórmulas Essenciais para a Prova",
                    type: "Passo a Passo",
                    placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Diagrama vertical 9:16, fundo branco, estilo concurseira. Cores: lilás, teal. Título: FÓRMULAS DA PROVA. Lista numerada com caixas coloridas: 1️⃣ n(A∪B)=n(A)+n(B)-n(A∩B). 2️⃣ n(P(A))=2^n(A). 3️⃣ n(A∪B∪C)=n(A)+n(B)+n(C)-n(AB)-n(AC)-n(BC)+n(ABC). 4️⃣ (A∪B)'=A'∩B' e (A∩B)'=A'∪B'. 5️⃣ A-B=A∩B'. Cada fórmula com exemplo numérico em fonte mono destacada. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-10/m10-formula.png",
                  },
                  {
                    title: "Guia Antifalha CESGRANRIO",
                    type: "Dicas CESGRANRIO",
                    placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                    // PROMPT NANO BANANA PRO 2 (9:16 retrato, fundo branco/creme, estilo concurseira):
                    // Comparativo de aviso 9:16, fundo branco, estilo concurseira. Cores: teal (correto), vermelho (errado), âmbar. Título: ⚠️ GUIA ANTIFALHA — CESGRANRIO. Grid com os 5 erros mais comuns: ✅ ∈ para elemento | ⊂ para conjunto. ✅ 0 ∈ ℕ. ✅ Subtrair interseção na fórmula da União. ✅ (A∪B)'=A'∩B' (operação INVERTE). ✅ Venn: de dentro para fora. vs ❌ cada um. Caixa âmbar grande: ⚠️ CHECKLIST ANTES DE MARCAR A RESPOSTA. Caixa teal: 💡 Releia o enunciado buscando 'somente', 'ao menos', 'nenhum'. Tag: MATEMÁTICA • PETROBRAS.
                    imageUrl:
                      "/assets/images/matematica/conjuntos/modulo-10/m10-dicas.png",
                  },
                ],
              }}
              sinteseEstrategica={{
                title: "Macete Visual: O Gabarito é Seu!",
                content: (
                  <>
                    <div className="text-6xl my-6 animate-bounce">🏆 🎯 🏆</div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto font-medium">
                      "Para vencer a CESGRANRIO:{" "}
                      <strong>Desenhe o diagrama</strong>, comece pela{" "}
                      <strong>interseção interna</strong> e use
                      <strong> De Morgan</strong> para simplificar enunciados.
                      Agora teste sua velocidade no simulado!"
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>🎯</span> FOCO TOTAL
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Interseção primeiro, bordas depois.
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>🧮</span> FÓRMULA MESTRA
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          n(A∪B) = n(A) + n(B) - n(A∩B).
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>🔁</span> DE MORGAN
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Não se perca nos 'Nems' da prova.
                        </p>
                      </div>
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                        <p className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2">
                          <span>🏆</span> GABARITO
                        </p>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Confie no seu desenho. O Venn não mente.
                        </p>
                      </div>
                    </div>
                  </>
                ),
              }}
              audio={{
                audioUrl:
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                titulo: "Rítmo do Aprendizado",
                artista: "Prof. Musical",
              }}
            />

            <QuizInterativo
              questoes={quizSimulado}
              titulo="QUIZ: Simulado Final"
              icone="🏆"
              numero={5}
              variant="blue"
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

      {/* Lightbox / Visualização Ampliada da Imagem de Introdução */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={zoomedImage}
              alt="Legenda: Visualização ampliada do infográfico"
              className="max-w-full max-h-full object-contain rounded-2xl border border-border/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            />
            <button 
              className="absolute top-4 right-4 p-3 bg-muted/80 backdrop-blur-md rounded-full text-foreground hover:bg-muted transition-colors"
              onClick={() => setZoomedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </AulaTemplate>
  );
}
