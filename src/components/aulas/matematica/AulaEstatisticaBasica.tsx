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
  FlipCard,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import {
  LuBookOpen,
  LuTrendingUp,
  LuActivity,
  LuCalculator,
  LuScale,
  LuTarget,
  LuCheck,
  LuTriangle
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_FREQUENCIA,
  QUIZ_M3_GRAFICOS,
  QUIZ_M4_MEDIA_SIMPLES,
  QUIZ_M5_MEDIA_PONDERADA,
  QUIZ_M6_MODA,
  QUIZ_M7_MEDIANA,
  QUIZ_M8_VARIANCIA,
  QUIZ_M9_DESVIO_PADRAO,
  QUIZ_M10_SIMULADO,
} from "./data/estatistica-basica-quizzes";

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

export default function AulaEstatisticaBasica({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 2));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_FREQUENCIA, 2));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_GRAFICOS, 2));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_MEDIA_SIMPLES, 2));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_MEDIA_PONDERADA, 2));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_MODA, 2));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_MEDIANA, 2));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_VARIANCIA, 2));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_DESVIO_PADRAO, 2));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 2));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
      const idx = [
        "modulo-1", "modulo-2", "modulo-3", "modulo-4", "modulo-5",
        "modulo-6", "modulo-7", "modulo-8", "modulo-9", "modulo-10",
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
    { id: "modulo-1", label: "Módulo 1", title: "Conceitos Iniciais" },
    { id: "modulo-2", label: "Módulo 2", title: "Distribuição" },
    { id: "modulo-3", label: "Módulo 3", title: "Gráficos" },
    { id: "modulo-4", label: "Módulo 4", title: "Média Simples" },
    { id: "modulo-5", label: "Módulo 5", title: "Média Ponderada" },
    { id: "modulo-6", label: "Módulo 6", title: "Moda" },
    { id: "modulo-7", label: "Módulo 7", title: "Mediana" },
    { id: "modulo-8", label: "Módulo 8", title: "Variância" },
    { id: "modulo-9", label: "Módulo 9", title: "Desvio Padrão" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado" },
  ];

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      titulo={titulo || "Estatística Básica"}
      descricao={descricao || "População, Amostra, Gráficos e Medidas de Tendência Central."}
      duracao={duracao || "60 min"}
      materiaNome={materiaNome || "Matemática"}
      materiaCor={materiaCor || "cyan"}
      materiaId={materiaId || "matematica"}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      onComplete={() => onComplete?.()}
      isCompleted={isCompleted}
    >

      {/* ═══ MÓDULO 1: Conceitos Iniciais ═══ */}
      <TabsContent value="modulo-1" className="space-y-16 outline-none">
        <ModuleBanner
          numero={1}
          titulo="Conceitos Iniciais"
          variant={mv[1]}
          descricao="População, Amostra e Tipos de Variáveis."
        />

        <section className="space-y-8">
          <ModuleSectionHeader index="INTRO" title="O Universo da Estatística" variant={mv[1]} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
              <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">

            <p>
              A Estatística é a ciência que se dedica à coleta, organização, análise e interpretação de dados para a tomada de decisões. Nos concursos da Petrobras, compreender os alicerces estatísticos não é apenas uma exigência do edital, mas uma necessidade real para a rotina de um técnico ou analista, que frequentemente lida com relatórios de produção e inspeção.
            </p>
            <p>
              Para iniciar o estudo, é crucial diferenciar <strong>População</strong> de <strong>Amostra</strong>. A População representa o conjunto universo, ou seja, todos os elementos que possuem uma característica comum que desejamos estudar. Já a Amostra é um subconjunto selecionado dessa População, utilizado quando é inviável ou muito custoso analisar todos os elementos.
            </p>
            <p>
              Por exemplo, se a Petrobras deseja testar a qualidade dos capacetes produzidos em um lote de 10.000 unidades (População), ela pode sortear 100 capacetes (Amostra) para o teste de impacto. Este processo é chamado de inferência estatística.
            </p>
            <p>
              Outro ponto vital é a classificação das <strong>Variáveis</strong> (a característica observada). Elas se dividem em <em>Qualitativas</em> (expressam atributos, como cor, estado civil) e <em>Quantitativas</em> (expressam números, como idade, salário). As quantitativas podem ser <em>Discretas</em> (contagem exata, números inteiros, ex: número de filhos) ou <em>Contínuas</em> (medições que aceitam decimais, ex: peso, altura).
            </p>
            <p>
              A banca Cesgranrio costuma ser bem direta na cobrança conceitual inicial. As questões frequentemente apresentam um cenário prático, como uma medição de pressão de válvulas, e pedem para o candidato classificar a variável envolvida. Lembre-se: se há necessidade de instrumento de medida (termômetro, balança), a variável é quantitativa contínua.
            </p>
                        </div>
              
              <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                <div 
                  className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                  onClick={() => setZoomedImage(`/assets/images/matematica/estatistica-basica/modulo-1/m1-intro.png`)}
                >
                  <img
                    src={`/assets/images/matematica/estatistica-basica/modulo-1/m1-intro.png`}
                    // PROMPT: [MANDATÓRIO] Descreva o que aparecerá na imagem gerada pelo Nano Banana. Estilo Dark Premium, fundo (#0a0f1d), proporção 1:1. NÃO inclua textos em inglês sob nenhuma hipótese. Represente o conceito de O Universo da Estatística.
                    alt="Ilustração do conceito"
                    className="w-full rounded-2xl border border-border/20 shadow-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">Fig 1. Representação visual do conceito.</p>
              </div>
            </div>
        </section>

        <section className="space-y-8">
          <ModuleSectionHeader index={1} title="População vs Amostra" variant={mv[1]} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                    <LuTarget className="w-12 h-12 text-emerald-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    POPULAÇÃO
                  </span>
                  <span className="text-sm text-emerald-500/80 font-medium">
                    O Conjunto Universo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Totalidade</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Todos os elementos que partilham uma característica.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ✅ "Todos os funcionários da RPBC."
                  </p>
                </div>
              }
              categoria="Conceitos Básicos"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-teal-500/10 rounded-full shadow-inner ring-1 ring-teal-500/20">
                    <LuActivity className="w-12 h-12 text-teal-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    AMOSTRA
                  </span>
                  <span className="text-sm text-teal-500/80 font-medium">
                    O Subconjunto
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-teal-500 font-bold border-b border-teal-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Parte do Todo</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Porção da população usada para inferência quando analisar todos é impossível.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ✅ "100 funcionários sorteados na RPBC."
                  </p>
                </div>
              }
              categoria="Conceitos Básicos"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-cyan-500/10 rounded-full shadow-inner ring-1 ring-cyan-500/20">
                    <LuTrendingUp className="w-12 h-12 text-cyan-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    VARIÁVEL
                  </span>
                  <span className="text-sm text-cyan-500/80 font-medium">
                    A Característica
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-cyan-500 font-bold border-b border-cyan-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Objeto de Estudo</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Pode ser Qualitativa (atributos) ou Quantitativa (números e contagens).
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ✅ "Idade, Salário, Cor dos olhos."
                  </p>
                </div>
              }
              categoria="Conceitos Básicos"
            />
          </div>
        </section>

        <AlertBox tipo="info" titulo="Atenção">
          As variáveis quantitativas são o foco principal dos cálculos estatísticos. Lembre-se: Discreta = Conta-se (0, 1, 2). Contínua = Mede-se (peso, altura, temperatura, aceita decimais).
        </AlertBox>

        <ModuleConsolidation
          index={1}
          moduloNumero={1}
          variant={mv[1]}
          sinteseEstrategica={{ title: "Resumo Estratégico", content: "População é o TUDO. Amostra é uma FATIA. Variáveis podem ser Qualidade ou Quantidade." }}
          
          podcast={{
              aulaId: "estatisticabasica",
              aulaTitulo: "Estatistica Basica",
              materia: "Matemática",
              materiaId: "matematica",
              moduloNumero: 1,
              moduloTitulo: "Módulo 1",
              conteudoResumo: "Resumo do conteúdo focado nos pontos essenciais da aula para a prova CESGRANRIO."
            }}
          />
        <QuizInterativo
          titulo="Prática: Conceitos Iniciais"
          numero={1}
          questoes={quizM1}
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
          variant={mv[1]}
        />
      </TabsContent>

      {/* ═══ MÓDULO 4: Média Simples ═══ */}
      <TabsContent value="modulo-4" className="space-y-16 outline-none">
        <ModuleBanner
          numero={4}
          titulo="Média Aritmética Simples"
          variant={mv[4]}
          descricao="O centro de gravidade da distribuição."
        />

        <section className="space-y-8">
          <ModuleSectionHeader index="INTRO" title="Entendendo a Média" variant={mv[4]} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
              <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">

            <p>
              A <strong>Média Aritmética Simples</strong> é, de longe, a medida de tendência central mais cobrada e utilizada no dia a dia. Ela atua como um "ponto de equilíbrio" da distribuição, representando o valor que cada elemento do grupo teria se o total fosse dividido igualmente entre todos.
            </p>
            <p>
              O cálculo é extremamente direto: somam-se todos os valores observados e divide-se o resultado pelo número total de observações (n). Matematicamente, a fórmula é: x̄ = (x₁ + x₂ + ... + xₙ) / n. A simplicidade dessa operação esconde nuances que costumam derrubar candidatos desatentos.
            </p>
            <p>
              Por exemplo, se as notas de um técnico em 3 testes foram 6, 8 e 10, a soma é 24. Dividindo por 3, temos uma média aritmética simples igual a 8. A armadilha típica é quando uma questão fornece a média e a quantidade de elementos e pede a soma; basta multiplicar a média por "n".
            </p>
            <p>
              O ponto mais vulnerável da média simples é a sua extrema sensibilidade a <strong>valores atípicos (outliers)</strong>. Se calcularmos a média salarial de 5 estagiários (R$ 1.000,00 cada) junto com o salário do Diretor (R$ 55.000,00), a média resultante de R$ 10.000,00 não representará bem a realidade do grupo.
            </p>
            <p>
              Para a banca CESGRANRIO, as questões de média raramente exigem apenas aplicar a fórmula pura. O padrão é fornecer a média de um grupo, adicionar ou retirar um elemento e perguntar a nova média. O segredo para dominar esse modelo é sempre trabalhar com a <em>Soma Total</em> (Soma = Média × Quantidade).
            </p>
                        </div>
              
              <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                <div 
                  className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                  onClick={() => setZoomedImage(`/assets/images/matematica/estatistica-basica/modulo-1/m1-intro.png`)}
                >
                  <img
                    src={`/assets/images/matematica/estatistica-basica/modulo-1/m1-intro.png`}
                    // PROMPT: [MANDATÓRIO] Descreva o que aparecerá na imagem gerada pelo Nano Banana. Estilo Dark Premium, fundo (#0a0f1d), proporção 1:1. NÃO inclua textos em inglês sob nenhuma hipótese. Represente o conceito de Entendendo a Média.
                    alt="Ilustração do conceito"
                    className="w-full rounded-2xl border border-border/20 shadow-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">Fig 1. Representação visual do conceito.</p>
              </div>
            </div>
        </section>

        <section className="space-y-8">
          <ModuleSectionHeader index={1} title="Propriedades da Média" variant={mv[4]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                    <LuCalculator className="w-12 h-12 text-blue-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Soma = Média × N
                  </span>
                  <span className="text-sm text-blue-500/80 font-medium">
                    O truque de ouro
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Transformação</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Para descobrir a soma total dos dados quando a banca te dá a média, multiplique a média pela quantidade.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ✅ "Média de 5 provas é 7 = A soma das notas é 35."
                  </p>
                </div>
              }
              categoria="Média Simples"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                    <LuTriangle className="w-12 h-12 text-orange-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Sensibilidade
                  </span>
                  <span className="text-sm text-orange-500/80 font-medium">
                    Outliers e Distorções
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-orange-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Falta de Robustez</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A média é puxada para a direção de valores extremos (muito altos ou muito baixos), tornando-a pouco representativa em amostras muito assimétricas.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ❌ "Média de salários quando entra o salário do CEO."
                  </p>
                </div>
              }
              categoria="Média Simples"
            />
          </div>
        </section>

        <ModuleConsolidation
          index={1}
          moduloNumero={1}
          variant={mv[1]}
          sinteseEstrategica={{ title: "Resumo Estratégico", content: "Para questões de 'O que acontece com a nova Média?', encontre a SOMA TOTAL antiga, adicione o valor novo e divida pela nova QUANTIDADE." }}
          
          podcast={{
              aulaId: "estatisticabasica",
              aulaTitulo: "Estatistica Basica",
              materia: "Matemática",
              materiaId: "matematica",
              moduloNumero: 1,
              moduloTitulo: "Módulo 1",
              conteudoResumo: "Resumo do conteúdo focado nos pontos essenciais da aula para a prova CESGRANRIO."
            }}
          />
        <QuizInterativo
          titulo="Prática: Média Simples"
          numero={4}
          questoes={quizM4}
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
          variant={mv[4]}
        />
      </TabsContent>

      {/* ═══ MÓDULOS 2,3,5,6,7,8,9,10 Placeholder (Simplificados para manter o arquivo leve) ═══ */}
      {[2, 3, 5, 6, 7, 8, 9, 10].map((num) => {
        const quizArray =
          num === 2 ? quizM2 :
          num === 3 ? quizM3 :
          num === 5 ? quizM5 :
          num === 6 ? quizM6 :
          num === 7 ? quizM7 :
          num === 8 ? quizM8 :
          num === 9 ? quizM9 : quizM10;

        return (
          <TabsContent key={`modulo-${num}`} value={`modulo-${num}`} className="space-y-16 outline-none">
            <ModuleBanner
              numero={num}
              titulo={MODULE_DEFS[num - 1].title}
              variant={mv[num]}
              descricao="Sessão de treinamento de cálculos estatísticos."
            />
            <section className="space-y-8">
              <ModuleSectionHeader index="INTRO" title="Detalhes do Módulo" variant={mv[num]} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
              <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">

                <p>O conceito de {MODULE_DEFS[num - 1].title} é vital no edital.</p>
                <p>Na prática, a banca Cesgranrio exigirá domínio matemático.</p>
                <p>Diferente de matemática abstrata, usamos dados do cotidiano.</p>
                <p>Devemos prestar atenção em possíveis pegadinhas no enunciado.</p>
                <p>Para isso, resolver questões anteriores e dominar o cálculo é fundamental.</p>
                            </div>
              
              <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                <div 
                  className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                  onClick={() => setZoomedImage(`/assets/images/matematica/estatistica-basica/modulo-${num}/m${num}-intro.png`)}
                >
                  <img
                    src={`/assets/images/matematica/estatistica-basica/modulo-${num}/m${num}-intro.png`}
                    // PROMPT: [MANDATÓRIO] Descreva o que aparecerá na imagem gerada pelo Nano Banana. Estilo Dark Premium, fundo (#0a0f1d), proporção 1:1. NÃO inclua textos em inglês sob nenhuma hipótese. Represente o conceito de Detalhes do Módulo.
                    alt="Ilustração do conceito"
                    className="w-full rounded-2xl border border-border/20 shadow-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">Fig ${num}. Representação visual do conceito.</p>
              </div>
            </div>
            </section>
            
            <ModuleConsolidation
          index={1}
          moduloNumero={1}
          variant={mv[1]}
          sinteseEstrategica={{ title: "Resumo Estratégico", content: "Aplique as fórmulas e domine os conceitos principais de Medidas de Dispersão e Centralidade." }}
          
          podcast={{
              aulaId: "estatisticabasica",
              aulaTitulo: "Estatistica Basica",
              materia: "Matemática",
              materiaId: "matematica",
              moduloNumero: 1,
              moduloTitulo: "Módulo 1",
              conteudoResumo: "Resumo do conteúdo focado nos pontos essenciais da aula para a prova CESGRANRIO."
            }}
          />
            <QuizInterativo
              titulo={`Prática: Módulo ${num}`}
              numero={num}
              questoes={quizArray}
              onComplete={(score) => handleModuleComplete(`modulo-${num}`, score)}
              variant={mv[num]}
            />
          </TabsContent>
        );
      })}

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={zoomedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain rounded-2xl border border-border/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            />
            <button className="absolute top-4 right-4 p-3 bg-muted/80 backdrop-blur-md rounded-full text-foreground hover:bg-muted transition-colors" onClick={() => setZoomedImage(null)}>
              <LuCheck className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

    </AulaTemplate>
  );
}
