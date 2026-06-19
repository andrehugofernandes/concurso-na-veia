"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect } from "react";
import {
  AulaTemplate,
  ModuleBanner,
  ModuleSectionHeader,
  AlertBox,
  RichIntro,
  ContentAccordion,
  ModuleConsolidation,
  QuizInterativo,
  AulaProps,
  CardCarousel,
  QuestaoResolvidaStepByStep} from "@/components/aulas/shared";
import { TabsContent } from "@/components/ui/tabs";
import {
  LuFileText,
  LuBrain,
  LuCircleCheck,
  LuTrendingUp,
  LuTarget,
  LuGauge,
  LuLightbulb,
  LuCircleAlert,
  LuTriangleAlert,
  LuFileCheck,
  LuBookOpen,
  LuSearch,
} from "react-icons/lu";
import { GESTAO_QUALIDADE_QUIZZES } from "@/data/quizzes/gestao-qualidade-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

/**
 * AULA: Gestão da Qualidade (Suprimento) - Ultimate V4.1
 * Estabilidade de Ícones: Lucide 5.5 (react-icons/lu)
 */
export default function AulaGestaoQualidadeSuprimento({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress = 0,
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
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_qualidade_suprimento_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  

  const MODULE_DEFS = [
    { id: "modulo-1", label: "M1", title: "Fundamentos da Qualidade" },
    { id: "modulo-2", label: "M2", title: "Era da Qualidade" },
    { id: "modulo-3", label: "M3", title: "Gurus da Qualidade" },
    { id: "modulo-4", label: "M4", title: "Ferramentas de Qualidade" },
    { id: "modulo-5", label: "M5", title: "Normas ISO e Certificação" },
    { id: "modulo-6", label: "M6", title: "Six Sigma e Lean" },
    { id: "modulo-7", label: "M7", title: "Controle Estatístico (CEP)" },
    { id: "modulo-8", label: "M8", title: "Auditoria e Conformidade" },
    { id: "modulo-9", label: "M9", title: "Qualidade na Petrobras" },
    { id: "modulo-10", label: "M10", title: "Simulado Geral" },
  ] as const;

  const mv = Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [i, getModuleVariant(i)])
  ) as any;

  const handleModuleComplete = (modId: string, score: number) => {
    setCompletedModules((prev) => {
      const newSet = new Set(prev).add(modId);
      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      onUpdateProgress?.(percent);
      return newSet;
    });
    if (modId === "modulo-10" && score >= 70) {
      onComplete();
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  const mapQuizQuestions = (modId: string) => {
    const quiz = GESTAO_QUALIDADE_QUIZZES[modId];
    if (!quiz) return [];
    return quiz.questions.map((q: any) => ({
      id: q.id,
      pergunta: q.question,
      opcoes: q.options.map((opt: string, i: number) => ({
        label: String.fromCharCode(65 + i),
        valor: opt,
      })),
      correta: String.fromCharCode(65 + q.correct),
      explicacao: q.explanation,
    }));
  };

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      modules={MODULE_DEFS}
      isModuleUnlocked={isModuleUnlocked}
      isCompleted={isCompleted}
      loading={loading}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      onComplete={onComplete}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={mv[1]}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ==================== MÓDULO 1 ==================== */}
      <TabsContent value="modulo-1" className="mt-0 space-y-12">
        <ModuleBanner numero={1} titulo="Fundamentos da Qualidade" variant="blue" descricao="Conceitos, abordagens de Garvin, ciclo PDCA e custos da qualidade." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="O que é Qualidade?" description="Da conformidade ao encantamento — as múltiplas dimensões do conceito." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Qualidade</strong> é um conceito multidimensional. Para <strong>Juran</strong>, é &quot;adequação ao uso&quot;. Para <strong>Crosby</strong>, é
              &quot;conformidade com requisitos&quot;. Para <strong>Deming</strong>, é &quot;o grau de satisfação do cliente a um custo previsível&quot;. A ISO 9000:2015
              define como &quot;grau em que um conjunto de características inerentes de um objeto satisfaz requisitos&quot;. Na Petrobras, qualidade
              significa que uma válvula deve suportar 10.000 PSI, um duto deve resistir a corrosão por 25 anos, e um EPI deve proteger o
              trabalhador offshore em condições extremas — sem exceção.</p>
            <p>Nas provas da CESGRANRIO, as cinco dimensões de David Garvin são cobradas associando definições como qualidade baseada na produção (Crosby) ou baseada no usuário (Juran).</p>
            <p><strong>David Garvin</strong> identificou <strong>5 abordagens</strong> da qualidade: (1) <strong>Transcendental</strong> — qualidade é reconhecida
              intuitivamente, não pode ser definida (como arte); (2) <strong>Baseada no Produto</strong> — qualidade é mensurável, atributo do produto;
              (3) <strong>Baseada no Usuário</strong> — qualidade é o que o cliente quer (Juran); (4) <strong>Baseada na Produção</strong> — qualidade é
              conformidade com especificações (Crosby); (5) <strong>Baseada no Valor</strong> — qualidade é desempenho a um preço aceitável. A CESGRANRIO
              cobra frequentemente a associação entre abordagem e autor.</p>
            <p>O planejamento sistemático (Plan) no ciclo PDCA precede qualquer ação executiva para que os limites de variação do processo sejam devidamente mapeados e controlados.</p>
            <p>O <strong>ciclo PDCA (Plan-Do-Check-Act)</strong> é a ferramenta universal de melhoria contínua. <strong>Plan</strong>: identificar o problema,
              analisar causas, definir plano de ação. <strong>Do</strong>: executar o plano, treinar equipe. <strong>Check</strong>: verificar resultados,
              comparar com metas. <strong>Act</strong>: padronizar o que funcionou ou corrigir o que falhou. O PDCA é cíclico — nunca para. Na Petrobras,
              cada unidade operacional roda PDCAs trimestrais para melhoria de processos de SMS.</p>
            <p>Um exemplo clássico de custos da qualidade reside no equilíbrio entre gastos preventivos de testes e custos de falhas externas após o produto atingir o consumidor final.</p>
            <p>Os <strong>custos da qualidade</strong> se dividem em 4 categorias: (1) <strong>Prevenção</strong> — treinamento, planejamento, manutenção
              preventiva; (2) <strong>Avaliação</strong> — inspeções, testes, auditorias; (3) <strong>Falhas internas</strong> — retrabalho, sucata, parada
              de máquina (antes de chegar ao cliente); (4) <strong>Falhas externas</strong> — garantia, recall, multas, perda de reputação (após chegar
              ao cliente). Regra: investir em prevenção REDUZ os custos de falhas. Falhas externas são 10-100x mais caras que prevenção.</p>
            <p>A transição do controle de fim de linha para o TQM (Gestão da Qualidade Total) consolida a responsabilidade coletiva da cadeia sobre a integridade dos bens.</p>
            <p>A <strong>Gestão da Qualidade Total (TQM)</strong> é a filosofia de que a qualidade é responsabilidade de TODOS na organização, não
              apenas do departamento de controle de qualidade. TQM envolve: foco no cliente, melhoria contínua (kaizen), envolvimento total dos
              funcionários, decisão baseada em dados e gestão por processos. Na Petrobras, o TQM se manifesta no Sistema de Gestão Integrada (SGI)
              que une qualidade (ISO 9001), meio ambiente (ISO 14001) e segurança (ISO 45001) em um único sistema.</p>
            <p>Na Petrobras, o SGI unifica as diretrizes de SMS e qualidade (ISO 9001) para blindar operações contra não-conformidades críticas em tubulações submarinas.</p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">As 5 Abordagens de Garvin</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-center">
                <div className="p-2 bg-blue-500/10 rounded-lg"><span className="font-bold text-xs">Transcendental</span><span className="text-muted-foreground text-xs">Intuição</span></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><span className="font-bold text-xs">Produto</span><span className="text-muted-foreground text-xs">Mensurável</span></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><span className="font-bold text-xs">Usuário</span><span className="text-muted-foreground text-xs">Juran</span></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><span className="font-bold text-xs">Produção</span><span className="text-muted-foreground text-xs">Crosby</span></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><span className="font-bold text-xs">Valor</span><span className="text-muted-foreground text-xs">Custo-benefício</span></div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={1} variant="blue" title="Análise C.E.D.E." description="Fundamentos que caem toda prova." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: PDCA em Detalhe",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>O PDCA foi criado por <strong>Shewhart</strong> e popularizado por <strong>Deming</strong> (por isso também é chamado &quot;Ciclo de Deming&quot;). É a base de toda melhoria contínua e está embutido na ISO 9001:2015.</p>
                    <AlertBox tipo="info" titulo="PDCA vs SDCA">
                      SDCA (Standardize-Do-Check-Act) é a versão de manutenção: primeiro padronize, depois rode o ciclo para manter. PDCA é para MELHORAR; SDCA é para MANTER.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Custos da Qualidade",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Petrobras:</strong> Um defeito em uma válvula de segurança custa R$ 500 para inspecionar na fábrica (avaliação), R$ 5.000 para trocar durante montagem (falha interna), ou R$ 5.000.000+ se falhar em operação e causar vazamento (falha externa + ambiental + reputacional).</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas Táticas: Garvin na Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Abordagem do USUÁRIO</strong> = subjetiva, varia entre pessoas → Juran (&quot;adequação ao uso&quot;)</li>
                      <li><strong>Abordagem da PRODUÇÃO</strong> = objetiva, conformidade com especificação → Crosby (&quot;zero defeitos&quot;)</li>
                      <li>Se a questão falar em &quot;preço justo&quot; ou &quot;custo-benefício&quot;, é abordagem baseada no VALOR</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Qualidade sem TQM",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="TQM não é universal">
                      TQM funciona bem em culturas participativas, mas pode falhar em ambientes hierárquicos rígidos. A Petrobras, por exemplo, teve que adaptar o TQM à sua realidade de estatal com estrutura militar herdada.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={1}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Segundo a ISO 8402, a definição mais completa de qualidade é:"
          alternativas={[
            { letra: "A", texto: "Ausência total de defeitos no produto final", correta: false },
              { letra: "B", texto: "Totalidade das características que satisfazem necessidades explícitas e implícitas do cliente", correta: true },
              { letra: "C", texto: "Conformidade com as especificações técnicas internas da empresa", correta: false },
              { letra: "D", texto: "Grau de perfeição alcançado no processo de fabricação", correta: false }
          ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "A ISO 8402 define qualidade como" },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={1} variant="blue"
          video={{ videoId: "Q1", title: "Fundamentos da Qualidade", duration: "12:00" }}
          resumoVisual={{ moduloNome: "M1", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Ciclo PDCA", type: "Diagrama", placeholderColor: "bg-blue-500/20" }, { title: "Custos da Qualidade", type: "Gráfico", placeholderColor: "bg-amber-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'PDCA'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🔄</span>
                  <span>📋</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>P</strong>lanejar → <strong>D</strong>esenvolver → <strong>C</strong>hecar → <strong>A</strong>gir. O ciclo NUNCA para!&quot;
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6 text-left">
                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl text-center">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Plan</p>
                    <p className="text-xs text-muted-foreground">Identificar + Planejar</p>
                  </div>
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-center">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Do</p>
                    <p className="text-xs text-muted-foreground">Executar + Treinar</p>
                  </div>
                  <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-center">
                    <p className="font-bold text-amber-600 dark:text-amber-400">Check</p>
                    <p className="text-xs text-muted-foreground">Verificar + Medir</p>
                  </div>
                  <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl text-center">
                    <p className="font-bold text-rose-600 dark:text-rose-400">Act</p>
                    <p className="text-xs text-muted-foreground">Padronizar ou Corrigir</p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Podcast: Fundamentos", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-1")} titulo="QUIZ: Fundamentos da Qualidade" numero={1} variant="blue" onComplete={(s) => handleModuleComplete("modulo-1", s)} />
      </TabsContent>

      <TabsContent value="modulo-2" className="mt-0 space-y-12">
        <ModuleBanner numero={2} titulo="As 4 Eras da Qualidade" variant="blue" descricao="Da inspeção artesanal à gestão estratégica — a evolução do conceito de qualidade." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="Evolução Histórica" description="Como a qualidade saiu do chão de fábrica e chegou à sala da diretoria." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>1ª Era — Inspeção (até 1930)</strong> é a fase mais primitiva: o artesão inspecionava CADA peça individualmente, separando
              as boas das ruins. Não havia prevenção — apenas detecção pós-produção. Com a Revolução Industrial, a inspeção 100% tornou-se
              inviável pelo volume. Resultado: surgimento de inspetores especializados, separados da produção.</p>
            <p>A banca exige discernir as eras da qualidade: da mera inspeção visual focada no produto, passando pelo controle estatístico, até a garantia e gestão estratégica.</p>
            <p>A <strong>2ª Era — Controle Estatístico (1930-1950)</strong> surge com <strong>Walter Shewhart</strong> e os gráficos de controle.
              Em vez de inspecionar 100% da produção, usa-se amostragem estatística. Conceitos-chave: limites de controle (LSC/LIC),
              variabilidade natural vs. variabilidade especial, e cartas de controle. Dodge e Romig criaram as tabelas de amostragem.
              A qualidade passa a ser um problema TÉCNICO, baseado em dados — não mais em julgamento visual.</p>
            <p>A evolução histórica das eras demonstra que a qualidade deixou de ser um departamento isolado para tornar-se vantagem competitiva e foco estratégico corporativo.</p>
            <p>A <strong>3ª Era — Garantia da Qualidade (1950-1980)</strong> amplia o foco: qualidade não é só controle estatístico, mas PREVENÇÃO.
              Surge a engenharia da qualidade com <strong>Juran</strong> (Trilogia: Planejamento, Controle, Melhoria) e <strong>Feigenbaum</strong> (TQC —
              Total Quality Control, que envolve todos os departamentos). A qualidade sai do chão de fábrica e entra no projeto, nas compras,
              na logística. Custos da qualidade são quantificados pela primeira vez.</p>
            <p>Enquanto na era da inspeção aceitava-se um nível pré-determinado de refugo, o TQM moderno exige a busca contínua por taxas próximas de zero defeito.</p>
            <p>A <strong>4ª Era — Gestão Estratégica / TQM (1980+)</strong> é a era atual: qualidade como <strong>vantagem competitiva</strong>. O CEO
              lidera a qualidade. Ferramentas: benchmarking, BSC, Six Sigma, Lean, ISO 9001. A qualidade é responsabilidade de TODOS —
              do porteiro ao presidente. Na Petrobras, isso se reflete no SGI e no Prêmio Nacional da Qualidade (PNQ).</p>
            <p>A era da garantia de qualidade introduziu manuais de procedimentos e auditorias de processos para prever falhas antes que elas alcancem a linha de produção.</p>
            <p>Na CESGRANRIO, a pergunta mais comum é: &quot;Em qual era da qualidade o foco passou a ser a PREVENÇÃO, não apenas a detecção?&quot;
              Resposta: <strong>3ª Era (Garantia)</strong>. Outra armadilha: o TQC de Feigenbaum (3ª era) ≠ TQM (4ª era). TQC é controle total
              por todos os departamentos; TQM é gestão estratégica com foco no cliente.</p>
            <p>Em refinarias da Petrobras, os processos de conformidade evoluíram de inspeções físicas de soldas para monitoramentos preditivos digitais e automatizados de vazão.</p>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Timeline das Eras</h4>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium">
                <span className="px-3 py-1 bg-rose-500/10 rounded-full">1ª Inspeção</span>
                <span>→</span>
                <span className="px-3 py-1 bg-amber-500/10 rounded-full">2ª Controle</span>
                <span>→</span>
                <span className="px-3 py-1 bg-emerald-500/10 rounded-full">3ª Garantia</span>
                <span>→</span>
                <span className="px-3 py-1 bg-blue-500/10 rounded-full font-bold">4ª TQM</span>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={2} variant="blue" title="Análise C.E.D.E." description="As Eras que mais caem na CESGRANRIO." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: De Inspeção a Estratégia",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Cada era NÃO elimina a anterior — ela INCORPORA. Na 4ª era, ainda fazemos inspeção (1ª), controle estatístico (2ª) e prevenção (3ª), mas agora sob uma visão ESTRATÉGICA.</p>
                    <AlertBox tipo="info" titulo="Macete ICGT">
                      I-C-G-T: Inspeção → Controle → Garantia → Total. Cada letra guarda a essência: Inspecionar, Controlar, Garantir, Totalizar.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Eras na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>1ª Era:</strong> Inspetor visual de soldas. <strong>2ª Era:</strong> Raio-X por amostragem em juntas soldadas. <strong>3ª Era:</strong> Qualificação prévia de soldadores + procedimento de soldagem (WPS). <strong>4ª Era:</strong> SGI integrado com KPIs de qualidade de soldagem alinhados à estratégia corporativa.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Armadilhas de Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>TQC (Feigenbaum)</strong> = 3ª Era. <strong>TQM</strong> = 4ª Era. NÃO confundir!</li>
                      <li><strong>Shewhart</strong> = 2ª Era (criou gráficos de controle). <strong>Deming</strong> = popularizou na 4ª Era (mas usou ferramentas da 2ª).</li>
                      <li>A PREVENÇÃO começa na 3ª Era. Antes, o foco era DETECÇÃO.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Setores que 'Pularam' Eras",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Nem todos evoluíram igual">
                      Startups de tecnologia frequentemente começam direto na 4ª era (com DevOps e qualidade integrada), sem passar pela inspeção tradicional. Já setores regulados como O&G (Petrobras) mantêm forte presença da 1ª e 2ª eras por exigência legal.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A estrutura de Alto Nível (HLS) da ISO 9001:2015 organiza seus requisitos em quantas cláusulas?"
          alternativas={[
            { letra: "A", texto: "7 cláusulas", correta: false },
              { letra: "B", texto: "8 cláusulas", correta: false },
              { letra: "C", texto: "10 cláusulas", correta: true },
              { letra: "D", texto: "12 cláusulas", correta: false }
          ]}
          dicaEstrategica="Essa estrutura é comum a todas as normas ISO de sistemas de gestão."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "A ISO 9001:2015 usa a Estrutura de Alto Nível (High Level Structure - HLS) com 10 cláusulas: 1-Escopo, 2-Referências normativas, 3-Termos e definições, 4-Contexto, 5-Liderança, 6-Planejamento, 7-Apoio, 8-Operação, 9-Avaliação de desempenho, 10-Melhoria." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={2} variant="blue"
          video={{ videoId: "Q2", title: "As 4 Eras da Qualidade", duration: "10:00" }}
          resumoVisual={{ moduloNome: "M2", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Timeline Eras", type: "Timeline", placeholderColor: "bg-amber-500/20" }, { title: "Evolução do Foco", type: "Diagrama", placeholderColor: "bg-blue-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'ICGT'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🔍</span>
                  <span>📊</span>
                  <span>🛡️</span>
                  <span>🏆</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>I</strong>nspeção → <strong>C</strong>ontrole → <strong>G</strong>arantia → <strong>T</strong>otal. Cada era INCORPORA a anterior!&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", titulo: "Podcast: Eras", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-2")} titulo="QUIZ: Eras da Qualidade" numero={2} variant="blue" onComplete={(s) => handleModuleComplete("modulo-2", s)} />
      </TabsContent>

      <TabsContent value="modulo-3" className="mt-0 space-y-12">
        <ModuleBanner numero={3} titulo="Os Gurus da Qualidade" variant="blue" descricao="Deming, Juran, Crosby, Ishikawa e Feigenbaum — os pais da gestão da qualidade moderna." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="Os 5 Mestres" description="Cada guru trouxe uma contribuição única — e a CESGRANRIO adora cobrar quem fez o quê." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>W. Edwards Deming</strong> é o guru mais cobrado. Contribuições: <strong>14 pontos da qualidade</strong> (eliminar medo, acabar com
              dependência de inspeção, instituir treinamento, etc.), popularização do <strong>ciclo PDCA</strong> (criado por Shewhart), o conceito de
              <strong>variabilidade</strong> (causas comuns vs. especiais) e o <strong>Sistema de Conhecimento Profundo</strong> (pensamento sistêmico,
              conhecimento de variação, teoria do conhecimento, psicologia). Deming levou a qualidade ao Japão no pós-guerra.</p>
            <p>Questões costumam associar diretamente os gurus aos seus lemas fundamentais: Crosby defende Zero Defeitos e Deming é o criador dos quatorze pontos da administração.</p>
            <p><strong>Joseph Juran</strong> definiu qualidade como &quot;adequação ao uso&quot; e criou a <strong>Trilogia da Qualidade</strong>: (1) Planejamento
              (definir metas + meios); (2) Controle (medir desempenho vs. meta); (3) Melhoria (elevar o patamar). Também aplicou o <strong>Princípio
              de Pareto 80/20</strong> à qualidade: 80% dos problemas vêm de 20% das causas — os &quot;poucos vitais&quot; vs. os &quot;muitos triviais&quot;.</p>
            <p>A Trilogia de Juran segmenta as ações estratégicas em planejamento (metas), controle (medir desempenho atual frente aos padrões) e melhoria contínua da capacidade.</p>
            <p><strong>Philip Crosby</strong> é o guru do <strong>Zero Defeitos</strong>. Para ele, qualidade é conformidade com requisitos (não excelência
              abstrata), e o padrão de desempenho deve ser zero defeitos (não &quot;nível aceitável de defeitos&quot;). Criou os <strong>4 Absolutos
              da Qualidade</strong>: (1) qualidade = conformidade; (2) prevenção, não inspeção; (3) padrão = zero defeitos; (4) custo da
              não-conformidade como medida da qualidade. Famoso pela frase: &quot;A qualidade é investimento, não é custo&quot;.</p>
            <p>Ishikawa inovou ao estruturar o Diagrama Causa-Efeito (espinha de peixe), organizando as causas de falhas operacionais em seis eixos conhecidos como 6M.</p>
            <p><strong>Kaoru Ishikawa</strong> democratizou a qualidade no Japão. Contribuições: <strong>Diagrama de Causa e Efeito</strong> (espinha de
              peixe, com os 6M: Mão de Obra, Máquina, Material, Método, Meio Ambiente, Medida), os <strong>Círculos de Controle de Qualidade
              (CCQ)</strong> — grupos voluntários de trabalhadores que se reúnem para resolver problemas — e as <strong>7 ferramentas básicas</strong>
              da qualidade. O CCQ simboliza a participação operária na melhoria da qualidade.</p>
            <p>Armand Feigenbaum introduziu o TQC (Total Quality Control), provando que a qualidade do produto requer o engajamento direto de setores de compras e design.</p>
            <p><strong>Armand Feigenbaum</strong> criou o conceito de <strong>TQC (Total Quality Control)</strong>: a qualidade é responsabilidade de
              todos os departamentos, não apenas do controle de qualidade. O TQC integra marketing, engenharia, produção e assistência técnica
              em torno da satisfação do cliente. Atenção: TQC (Feigenbaum, 3ª Era) ≠ TQM (4ª Era). O TQC é mais operacional; o TQM é estratégico.</p>
            <p>Os manuais de SMS da Petrobras aplicam o princípio de Deming de eliminar o medo organizacional para incentivar o reporte proativo de quase-acidentes operacionais.</p>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Guru → Contribuição Principal</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-center">
                <div className="p-2 bg-emerald-500/10 rounded-lg"><span className="font-bold text-xs">Deming</span><span className="text-muted-foreground text-xs">14 Pontos + PDCA</span></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><span className="font-bold text-xs">Juran</span><span className="text-muted-foreground text-xs">Trilogia + 80/20</span></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><span className="font-bold text-xs">Crosby</span><span className="text-muted-foreground text-xs">Zero Defeitos</span></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><span className="font-bold text-xs">Ishikawa</span><span className="text-muted-foreground text-xs">Diagrama + CCQ</span></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><span className="font-bold text-xs">Feigenbaum</span><span className="text-muted-foreground text-xs">TQC</span></div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={3} variant="blue" title="Análise C.E.D.E." description="Quem fez o quê? A CESGRANRIO ama cobrar isso." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Trilogia de Juran",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p><strong>Planejamento:</strong> definir quem é o cliente, quais suas necessidades e como o processo vai atendê-las. <strong>Controle:</strong> medir o desempenho real e comparar com as metas planejadas. <strong>Melhoria:</strong> identificar projetos de melhoria, provar a necessidade e implementar soluções.</p>
                    <AlertBox tipo="info" titulo="Juran vs Deming">
                      Juran foca em GESTÃO (trilogia, projetos de melhoria). Deming foca em FILOSOFIA (14 pontos, transformação cultural). Se a questão falar em &quot;projeto de melhoria&quot;, é Juran.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: CCQ na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>CCQ na Refinaria:</strong> Operadores de caldeira formaram um CCQ voluntário para reduzir vazamentos de vapor. Usaram diagrama de Ishikawa (6M) para identificar causas, Pareto para priorizar, e implementaram melhoria que reduziu vazamentos em 60%. Resultado: economia de R$ 2M/ano.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Associação Guru-Conceito",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>&quot;Adequação ao uso&quot;</strong> → Juran</li>
                      <li><strong>&quot;Conformidade com requisitos&quot;</strong> → Crosby</li>
                      <li><strong>&quot;Variabilidade&quot; ou &quot;14 pontos&quot;</strong> → Deming</li>
                      <li><strong>&quot;Espinha de peixe&quot; ou &quot;CCQ&quot;</strong> → Ishikawa</li>
                      <li><strong>&quot;TQC&quot; ou &quot;qualidade total no controle&quot;</strong> → Feigenbaum</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Gurus Menos Cobrados",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Taguchi, Shingo e Garvin">
                      Taguchi (Função Perda), Shingo (Poka-Yoke/SMED) e Garvin (8 dimensões da qualidade) aparecem em provas mais avançadas. Se a questão mencionar &quot;engenharia robusta&quot;, é Taguchi. &quot;Dispositivo à prova de erro&quot; = Poka-Yoke = Shingo.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O Diagrama de Ishikawa (espinha de peixe) é utilizado para:"
          alternativas={[
            { letra: "A", texto: "Medir a frequência de ocorrência de defeitos ao longo do tempo", correta: false },
              { letra: "B", texto: "Identificar e organizar as causas potenciais de um problema ou efeito", correta: true },
              { letra: "C", texto: "Mostrar a correlação entre duas variáveis numéricas", correta: false },
              { letra: "D", texto: "Apresentar a distribuição estatística dos dados de processo", correta: false }
          ]}
          dicaEstrategica="É usado em brainstorming para identificar raízes de problemas."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "O Diagrama de Ishikawa (também chamado Diagrama de Causa-Efeito ou espinha de peixe) organiza visualmente as causas de um problema." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "As 6 categorias (6M) são: Mão de obra, Máquina, Método, Material, Meio ambiente e Medição." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={3} variant="blue"
          video={{ videoId: "Q3", title: "Os Gurus da Qualidade", duration: "15:00" }}
          resumoVisual={{ moduloNome: "M3", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Tabela Gurus", type: "Tabela", placeholderColor: "bg-emerald-500/20" }, { title: "Diagrama Ishikawa", type: "Diagrama", placeholderColor: "bg-amber-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'Guru Certo'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🧙</span>
                  <span>📖</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>D</strong>eming = <strong>D</strong>ados (variação). <strong>J</strong>uran = <strong>J</strong>ustiça ao uso. <strong>C</strong>rosby = <strong>C</strong>onformidade (Zero). <strong>I</strong>shikawa = <strong>I</strong>nvestigação (espinha).&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "Podcast: Os Mestres", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-3")} titulo="QUIZ: Gurus da Qualidade" numero={3} variant="blue" onComplete={(s) => handleModuleComplete("modulo-3", s)} />
      </TabsContent>

      <TabsContent value="modulo-4" className="mt-0 space-y-12">
        <ModuleBanner numero={4} titulo="Ferramentas da Qualidade" variant="blue" descricao="As 7 ferramentas básicas, Ishikawa (6M), Pareto, Histograma, 5W2H e Brainstorming." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="O Arsenal da Qualidade" description="7 ferramentas que resolvem 95% dos problemas de qualidade no chão de fábrica." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>As <strong>7 ferramentas básicas da qualidade</strong> foram sistematizadas por <strong>Ishikawa</strong>: (1) <strong>Diagrama de Pareto</strong> — gráfico
              de barras que ordena causas por frequência (80/20); (2) <strong>Diagrama de Causa e Efeito (Ishikawa/Espinha de Peixe)</strong> — identifica
              causas raiz usando os 6M; (3) <strong>Histograma</strong> — distribuição de frequência de dados; (4) <strong>Folha de Verificação</strong> —
              formulário para coleta padronizada de dados; (5) <strong>Diagrama de Dispersão</strong> — correlação entre duas variáveis;
              (6) <strong>Fluxograma</strong> — mapeamento visual do processo; (7) <strong>Carta de Controle (CEP)</strong> — monitoramento da
              variabilidade ao longo do tempo.</p>
            <p>A banca cobra a correta indicação de ferramentas para cada problema: Pareto serve para priorização e Ishikawa para investigação detalhada de causas raiz.</p>
            <p>O <strong>Diagrama de Ishikawa (Espinha de Peixe)</strong> é a ferramenta mais cobrada. Os <strong>6M</strong> representam as categorias de
              causas: <strong>Mão de Obra</strong> (habilidade, treinamento), <strong>Máquina</strong> (equipamento, manutenção), <strong>Material</strong>
              (insumo, fornecedor), <strong>Método</strong> (procedimento, processo), <strong>Meio Ambiente</strong> (condições externas) e
              <strong>Medida</strong> (instrumentos, calibração). Na Petrobras, o diagrama é usado em análises de falha de equipamentos offshore.</p>
            <p>As sete ferramentas clássicas compreendem formulários estruturados como folhas de verificação, gráficos de frequência como histogramas e cartas de controle estatístico.</p>
            <p>O <strong>Diagrama de Pareto</strong> aplica o princípio 80/20 de Juran: um gráfico de barras decrescentes com linha de percentual
              acumulado. Permite identificar os &quot;poucos vitais&quot; — as poucas causas que geram a maioria dos problemas. Na Petrobras,
              análises de Pareto em paradas não programadas revelam que 3-4 tipos de falha respondem por 70%+ das ocorrências.</p>
            <p>A aplicação prática do Diagrama de Pareto em compras industriais revela que 80% dos atrasos de entrega derivam de apenas 20% dos fornecedores cadastrados.</p>
            <p>Além das 7 ferramentas básicas, existem as <strong>7 ferramentas gerenciais</strong> (para problemas mais complexos): Diagrama de
              Afinidade, Diagrama de Relações, Diagrama em Árvore, Diagrama Matricial, Matriz de Priorização, PDPC e Diagrama de Rede.
              E ferramentas complementares como o <strong>5W2H</strong> (What, Why, Where, When, Who, How, How much) e o <strong>Brainstorming</strong>.</p>
            <p>O Diagrama de Dispersão quantifica a relação estatística entre duas variáveis de processo, como temperatura do banho térmico e resistência mecânica de vedações.</p>
            <p>Para a CESGRANRIO, saiba associar cada ferramenta ao seu propósito: investigar CAUSAS = Ishikawa; PRIORIZAR causas = Pareto;
              COLETAR dados = Folha de Verificação; VER distribuição = Histograma; MONITORAR processo = Carta de Controle; VER correlação =
              Dispersão; MAPEAR processo = Fluxograma.</p>
            <p>Almoxarifes da Petrobras em Macaé preenchem folhas de verificação para registrar avarias físicas em contêineres e cestas de carga antes do embarque.</p>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">As 7 Ferramentas Básicas</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
                <div className="p-2 bg-rose-500/10 rounded-lg"><span className="font-bold text-xs">Pareto</span><span className="text-muted-foreground text-xs">Priorizar</span></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><span className="font-bold text-xs">Ishikawa</span><span className="text-muted-foreground text-xs">Causas raiz</span></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><span className="font-bold text-xs">Histograma</span><span className="text-muted-foreground text-xs">Distribuição</span></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><span className="font-bold text-xs">Folha Verif.</span><span className="text-muted-foreground text-xs">Coletar dados</span></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><span className="font-bold text-xs">Dispersão</span><span className="text-muted-foreground text-xs">Correlação</span></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><span className="font-bold text-xs">Fluxograma</span><span className="text-muted-foreground text-xs">Mapear processo</span></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><span className="font-bold text-xs">Carta CEP</span><span className="text-muted-foreground text-xs">Monitorar</span></div>
                <div className="p-2 bg-amber-500/10 rounded-lg"><span className="font-bold text-xs">+ 5W2H</span><span className="text-muted-foreground text-xs">Plano de ação</span></div>
              </div>
            </div>
          
          
          
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={4} variant="blue" title="Análise C.E.D.E." description="Ferramentas que caem toda prova de qualidade." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Os 6M de Ishikawa",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Cada &quot;M&quot; é uma categoria de causas potenciais: <strong>Mão de Obra</strong> (falta de treinamento), <strong>Máquina</strong> (defeito mecânico), <strong>Material</strong> (insumo fora de especificação), <strong>Método</strong> (procedimento inadequado), <strong>Meio Ambiente</strong> (temperatura, umidade) e <strong>Medida</strong> (instrumento descalibrado).</p>
                    <AlertBox tipo="info" titulo="Na prova: 6M ou 4M?">
                      A versão original tem 4M (sem Meio Ambiente e Medida). A versão expandida (6M) é a mais cobrada atualmente. Se a questão listar 4, aceite; se listar 6, aceite também.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Pareto na Refinaria",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Análise de Pareto — Paradas não programadas (Refinaria REPAR):</strong> Vazamento em válvulas (35%) + Falha em bombas (25%) + Corrosão em tubulações (15%) = 75% de todas as paradas. Ação: programa de manutenção preventiva nas 3 causas vitais.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Ferramenta Certa para cada Situação",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>&quot;Identificar causas raiz&quot; → <strong>Ishikawa</strong></li>
                      <li>&quot;Priorizar problemas por frequência&quot; → <strong>Pareto</strong></li>
                      <li>&quot;Verificar se o processo está estável&quot; → <strong>Carta de Controle</strong></li>
                      <li>&quot;Verificar correlação entre variáveis&quot; → <strong>Diagrama de Dispersão</strong></li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Quando as 7 NÃO bastam",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Problemas complexos">
                      Para problemas estratégicos ou multifuncionais, use as 7 ferramentas GERENCIAIS (Diagrama de Afinidade, Matriz de Priorização, etc.). As 7 básicas são para problemas operacionais no chão de fábrica.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A Gestão Total da Qualidade (TQM) se diferencia das abordagens anteriores porque:"
          alternativas={[
            { letra: "A", texto: "Foca exclusivamente no controle estatístico da linha de produção", correta: false },
              { letra: "B", texto: "Envolve toda a organização — todos os departamentos e colaboradores — na responsabilidade pela qualidade", correta: true },
              { letra: "C", texto: "Delega a qualidade apenas ao departamento de controle de qualidade", correta: false },
              { letra: "D", texto: "Aplica-se somente a empresas de manufatura, não a serviços", correta: false }
          ]}
          dicaEstrategica="A palavra"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "TQM (Total Quality Management) é uma filosofia de gestão onde qualidade não é responsabilidade de um setor específico, mas de TODOS." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Cada colaborador, do CEO ao operador, tem papel na qualidade." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={4} variant="blue"
          video={{ videoId: "Q4", title: "Ferramentas da Qualidade", duration: "18:00" }}
          resumoVisual={{ moduloNome: "M4", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "7 Ferramentas", type: "Dashboard", placeholderColor: "bg-rose-500/20" }, { title: "6M Ishikawa", type: "Diagrama", placeholderColor: "bg-blue-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete dos '6M'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🐟</span>
                  <span>🔍</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;Espinha de peixe com 6 ossos: <strong>M</strong>ão de obra, <strong>M</strong>áquina, <strong>M</strong>aterial, <strong>M</strong>étodo, <strong>M</strong>eio ambiente, <strong>M</strong>edida.&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", titulo: "Podcast: Ferramentas", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-4")} titulo="QUIZ: Ferramentas da Qualidade" numero={4} variant="blue" onComplete={(s) => handleModuleComplete("modulo-4", s)} />
      </TabsContent>

      <TabsContent value="modulo-5" className="mt-0 space-y-12">
        <ModuleBanner numero={5} titulo="Normas ISO e Certificação" variant="blue" descricao="ISO 9001 (Qualidade), ISO 14001 (Ambiental), ISO 45001 (Segurança) e o SGI." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="O Selo de Excelência" description="As normas ISO como framework global de gestão da qualidade." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A <strong>ISO (International Organization for Standardization)</strong> é o organismo internacional que publica normas técnicas.
              A família <strong>ISO 9000</strong> trata da qualidade: a <strong>ISO 9001:2015</strong> é a norma certificável que estabelece requisitos
              para o SGQ (Sistema de Gestão da Qualidade). Seus 7 princípios: foco no cliente, liderança, engajamento de pessoas, abordagem
              de processo, melhoria, decisão baseada em evidência e gestão de relacionamento. A ISO 9000 (vocabulário) e ISO 9004 (diretrizes
              para melhoria) complementam mas NÃO são certificáveis.</p>
            <p>Questões sobre normas ISO 9001 abordam os princípios de liderança, foco no cliente, abordagem por processos e a mentalidade preventiva de gestão de riscos.</p>
            <p>A <strong>ISO 14001:2015</strong> trata do <strong>Sistema de Gestão Ambiental (SGA)</strong> — poluição, resíduos, emissões. A
              <strong>ISO 45001:2018</strong> substitui a OHSAS 18001 e trata do <strong>Sistema de Gestão de Saúde e Segurança Ocupacional</strong>.
              Na Petrobras, as três normas são integradas no <strong>SGI (Sistema de Gestão Integrada)</strong>, que une qualidade + meio ambiente
              + segurança em um único framework de gestão.</p>
            <p>A estrutura de alto nível das normas ISO unifica definições, exigindo a elaboração de procedimentos de auditorias internas e registros de não-conformidade.</p>
            <p>A estrutura HLS (High Level Structure) da ISO garante que todas as normas sigam os mesmos 10 capítulos:
              Escopo, Referências, Termos, Contexto, Liderança, Planejamento, Apoio, Operação, Avaliação de Desempenho e Melhoria.
              Isso facilita a integração (SGI) e a auditoria combinada. A abordagem é baseada em <strong>Risco</strong> (mentalidade de risco)
              e <strong>PDCA</strong> está embutido na estrutura.</p>
            <p>Uma auditoria técnica de certificação da ISO 9001 avalia a aderência prática aos processos documentados por meio de evidências objetivas e auditorias em loco.</p>
            <p>A <strong>certificação</strong> é realizada por organismos acreditados (no Brasil, acreditados pelo INMETRO). Tipos de auditoria:
              <strong>1ª parte</strong> (interna, autoavaliação), <strong>2ª parte</strong> (cliente audita fornecedor) e <strong>3ª parte</strong>
              (organismo certificador independente — a única que concede o certificado ISO). Na Petrobras, fornecedores de materiais críticos
              DEVEM ter ISO 9001 para participar de licitações.</p>
            <p>O SGI (Sistema de Gestão Integrada) minimiza redundâncias operacionais ao unificar as normas ISO 9001, ISO 14001 (ambiental) e ISO 45001 (segurança e saúde).</p>
            <p>Para a CESGRANRIO, atenção: a ISO 9001 NÃO garante qualidade do produto — garante que existe um SISTEMA de gestão. O certificado
              prova que a empresa tem processos padronizados, monitora indicadores e busca melhoria contínua, mas não significa &quot;zero defeitos&quot;.</p>
            <p>A Petrobras exige que fabricantes de válvulas e sobressalentes submarinos possuam certificação ISO 9001 para participar de cotações em seu cadastro corporativo.</p>
            
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={5} variant="blue" title="Análise C.E.D.E." description="ISO na prova de Suprimento." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: A Família ISO 9000",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p><strong>ISO 9000</strong> = vocabulário e fundamentos (NÃO certificável). <strong>ISO 9001</strong> = requisitos do SGQ (CERTIFICÁVEL). <strong>ISO 9004</strong> = diretrizes para melhoria e sucesso sustentado (NÃO certificável). Apenas a 9001 é auditável e certificável.</p>
                    <AlertBox tipo="info" titulo="7 Princípios da ISO 9001:2015">
                      Foco no cliente, Liderança, Engajamento de pessoas, Abordagem de processo, Melhoria, Decisão baseada em evidência, Gestão de relacionamento.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: SGI na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>SGI Petrobras:</strong> Combina ISO 9001 (qualidade do processo produtivo), ISO 14001 (gestão ambiental — emissões, efluentes, resíduos) e ISO 45001 (segurança do trabalho — EPIs, procedimentos, CIPA). Auditoria combinada: um único auditor verifica as 3 normas simultaneamente.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: ISO na Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>900x</strong> = Qualidade. <strong>1400x</strong> = Ambiental. <strong>4500x</strong> = Segurança.</li>
                      <li>ISO 9001 NÃO garante qualidade do produto — garante que existe um SISTEMA.</li>
                      <li>Apenas <strong>auditoria de 3ª parte</strong> concede certificação.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: ISO não é obrigatória",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Voluntária, mas estratégica">
                      A certificação ISO é VOLUNTÁRIA — nenhuma lei obriga. Porém, na prática, grandes compradores (Petrobras) exigem ISO 9001 como pré-requisito em licitações. Sem certificado, o fornecedor está fora.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="No CEP, qual é a diferença entre 'causas comuns' e 'causas especiais' de variação?"
          alternativas={[
            { letra: "A", texto: "Causas comuns são graves e exigem ação imediata; causas especiais são normais do processo", correta: false },
              { letra: "B", texto: "Causas comuns são variações aleatórias inerentes ao processo; causas especiais são variações identificáveis e controláveis", correta: true },
              { letra: "C", texto: "Causas comuns vêm dos operadores; causas especiais vêm das máquinas", correta: false },
              { letra: "D", texto: "Causas comuns são externas à empresa; causas especiais são internas", correta: false }
          ]}
          dicaEstrategica="O processo está"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Variação por causas comuns (ou aleatórias) é inerente ao processo — resultado de muitos fatores pequenos e inevitáveis." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={5} variant="blue"
          video={{ videoId: "Q5", title: "Normas ISO e Certificação", duration: "14:00" }}
          resumoVisual={{ moduloNome: "M5", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Família ISO", type: "Selo", placeholderColor: "bg-blue-500/20" }, { title: "SGI", type: "Diagrama", placeholderColor: "bg-emerald-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do '9-14-45'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🏅</span>
                  <span>📋</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>9</strong>001 = <strong>Q</strong>ualidade. <strong>14</strong>001 = <strong>A</strong>mbiental. <strong>45</strong>001 = <strong>S</strong>egurança. QAS = SGI!&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", titulo: "Podcast: ISO", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-5")} titulo="QUIZ: Normas ISO" numero={5} variant="blue" onComplete={(s) => handleModuleComplete("modulo-5", s)} />
      </TabsContent>

      <TabsContent value="modulo-6" className="mt-0 space-y-12">
        <ModuleBanner numero={6} titulo="Six Sigma e Lean Manufacturing" variant="blue" descricao="DMAIC, Belts, Kaizen, os 7 desperdícios (Muda) e a integração Lean Six Sigma." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="Precisão + Velocidade" description="Six Sigma elimina variação; Lean elimina desperdício. Juntos, são imbatíveis." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>Six Sigma</strong> é uma metodologia estatística que busca reduzir a variabilidade de processos a no máximo
              <strong>3,4 defeitos por milhão de oportunidades (DPMO)</strong>. O &quot;sigma&quot; refere-se ao desvio-padrão: quanto mais sigmas
              entre a média e o limite de especificação, menos defeitos. O método segue o ciclo <strong>DMAIC</strong>: Define (definir o problema),
              Measure (medir o desempenho atual), Analyze (analisar causas raiz), Improve (implementar melhorias), Control (controlar para manter).</p>
            <p>A banca exige familiaridade com o ciclo DMAIC do Six Sigma e o foco do Lean na redução sistemática dos oito desperdícios da cadeia produtiva.</p>
            <p>A <strong>hierarquia de Belts</strong> organiza os profissionais Six Sigma: <strong>White Belt</strong> (conceitos básicos),
              <strong>Yellow Belt</strong> (participa de projetos), <strong>Green Belt</strong> (lidera projetos pequenos, dedica ~25% do tempo),
              <strong>Black Belt</strong> (lidera projetos complexos, dedicação integral) e <strong>Master Black Belt</strong> (mentor de Black Belts,
              estrategista). Na Petrobras, projetos Six Sigma são liderados por Black Belts em refinarias.</p>
            <p>O Six Sigma utiliza métodos estatísticos para reduzir a variabilidade de processos a 3,4 defeitos por milhão; o Lean acelera o fluxo agregando valor.</p>
            <p>O <strong>Lean Manufacturing</strong> (ou Produção Enxuta) originou-se no <strong>Sistema Toyota de Produção (STP)</strong>. Seu foco
              é eliminar os <strong>7 desperdícios (Muda)</strong>: (1) Superprodução, (2) Espera, (3) Transporte, (4) Processamento excessivo,
              (5) Estoque, (6) Movimentação desnecessária e (7) Defeitos. Ferramentas Lean: 5S, Kanban, Poka-Yoke, Kaizen, VSM (Value Stream Mapping).</p>
            <p>A implementação prática do 5S em almoxarifados diminui sensivelmente o tempo de separação de sobressalentes ao otimizar o arranjo físico das peças.</p>
            <p>O <strong>Kaizen</strong> é a filosofia de melhoria contínua incremental — pequenas melhorias todos os dias. Diferente de Kaikaku
              (inovação radical). O <strong>5S</strong> (Seiri, Seiton, Seiso, Seiketsu, Shitsuke = Utilização, Organização, Limpeza, Saúde, Autodisciplina)
              é a base do Lean. Na Petrobras, programas 5S são obrigatórios em todas as unidades operacionais.</p>
            <p>O mapeamento do fluxo de valor (VSM) identifica desperdícios invisíveis como excesso de movimentação interna e paradas não planejadas de equipamentos de refino.</p>
            <p>O <strong>Lean Six Sigma</strong> combina o melhor dos dois mundos: usa DMAIC (Six Sigma) com foco em eliminação de desperdícios (Lean).
              Na CESGRANRIO, atenção: DMAIC é para MELHORAR processos existentes; <strong>DMADV</strong> (Define, Measure, Analyze, Design, Verify)
              é para CRIAR novos processos/produtos. Não confundir!</p>
            <p>A Petrobras adota conceitos Lean em oficinas mecânicas offshore de plataformas para reduzir o tempo de manutenção de geradores e turbocompressores.</p>
            
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={6} variant="blue" title="Análise C.E.D.E." description="Six Sigma e Lean para a prova." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: DMAIC vs DMADV",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p><strong>DMAIC</strong> = processo existente com problemas → MELHORAR. <strong>DMADV</strong> = processo novo ou redesign completo → CRIAR. Se a questão falar em &quot;novo produto&quot;, é DMADV. Se falar em &quot;reduzir defeitos&quot;, é DMAIC.</p>
                    <AlertBox tipo="info" titulo="Os 7 Desperdícios">
                      Macete: &quot;STEMMED&quot; → Superprodução, Transporte, Espera, Movimentação, Máquina (processamento excessivo), Estoque, Defeitos.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Lean na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Projeto Six Sigma em Refinaria:</strong> Black Belt liderou projeto DMAIC para reduzir variação na octanagem da gasolina. Define: variação de ±2 octanas. Measure: Cp=0,8. Analyze: temperatura do catalisador era causa raiz. Improve: controle automático de temperatura. Control: Cp subiu para 1,5 (+88%). Economia: R$ 8M/ano.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Belts e DMAIC na Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Green Belt</strong> = lidera projetos, ~25% do tempo. <strong>Black Belt</strong> = dedicação integral.</li>
                      <li><strong>Six Sigma</strong> = variação (estatística). <strong>Lean</strong> = desperdício (fluxo). Juntos = Lean Six Sigma.</li>
                      <li><strong>Kaizen</strong> = melhoria CONTÍNUA e INCREMENTAL. Kaikaku = mudança RADICAL.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Quando Six Sigma é Overkill",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Para problemas simples, use ferramentas simples">
                      Six Sigma exige dados, estatística e projetos estruturados. Para problemas óbvios (vazamento visível, parafuso solto), use ação corretiva imediata. Não mate uma mosca com um canhão.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Na classificação das auditorias da qualidade, uma auditoria de certificação ISO 9001 realizada por organismo acreditado é auditoria de:"
          alternativas={[
            { letra: "A", texto: "Primeira parte (auditoria interna)", correta: false },
              { letra: "B", texto: "Segunda parte (auditoria de fornecedor)", correta: false },
              { letra: "C", texto: "Terceira parte (auditoria de certificação)", correta: true },
              { letra: "D", texto: "Quarta parte (auditoria governamental)", correta: false }
          ]}
          dicaEstrategica="Auditorias de 3ª parte têm maior credibilidade por serem imparciais."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "As auditorias são classificadas em: 1ª parte = interna (a empresa audita a si mesma); 2ª parte = de cliente (um cliente audita seu fornecedor) ou de fornecedor; 3ª parte = independente por organismo acreditado para certificação (ex: ISO 9001)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={6} variant="blue"
          video={{ videoId: "Q6", title: "Six Sigma e Lean", duration: "16:00" }}
          resumoVisual={{ moduloNome: "M6", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "DMAIC", type: "Infográfico", placeholderColor: "bg-blue-500/20" }, { title: "7 Desperdícios", type: "Diagrama", placeholderColor: "bg-amber-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'DMAIC'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>📊</span>
                  <span>🎯</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>D</strong>efinir → <strong>M</strong>edir → <strong>A</strong>nalisar → <strong>I</strong>mplementar → <strong>C</strong>ontrolar. Processo existente? DMAIC!&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", titulo: "Podcast: Lean Sigma", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-6")} titulo="QUIZ: Six Sigma e Lean" numero={6} variant="blue" onComplete={(s) => handleModuleComplete("modulo-6", s)} />
      </TabsContent>

      <TabsContent value="modulo-7" className="mt-0 space-y-12">
        <ModuleBanner numero={7} titulo="Controle Estatístico de Processo (CEP)" variant="blue" descricao="Cartas de controle, LSC/LIC, variabilidade especial vs. comum e capabilidade (Cp/Cpk)." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="O Processo sob Controle" description="CEP: detectar variação ANTES de gerar defeitos." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O <strong>CEP (Controle Estatístico de Processo)</strong> monitora a variabilidade do processo ao longo do tempo usando
              <strong>cartas de controle</strong>. Uma carta tem: linha central (média), <strong>LSC (Limite Superior de Controle)</strong> e
              <strong>LIC (Limite Inferior de Controle)</strong>, calculados a ±3 desvios-padrão da média. Pontos dentro dos limites = processo
              sob controle. Pontos fora = causa especial que precisa ser investigada.</p>
            <p>CESGRANRIO cobra a análise gráfica de cartas de controle, exigindo discernimento entre causas comuns (naturais do processo) e causas especiais (anomalias).</p>
            <p>Existem dois tipos de variação: <strong>Causas comuns</strong> (aleatórias, intrínsecas ao processo, previsíveis) e <strong>Causas
              especiais</strong> (identificáveis, externas, imprevisíveis). Um processo é &quot;sob controle estatístico&quot; quando apresenta APENAS
              causas comuns. Se há causas especiais, o processo está &quot;fora de controle&quot; e precisa de ação corretiva imediata.</p>
            <p>Os limites estatísticos de controle (LSC e LIC) definem a faixa de variabilidade previsível do processo; não os confunda com limites de tolerância de projeto.</p>
            <p>A <strong>capabilidade do processo</strong> é medida pelos índices <strong>Cp</strong> (potencial) e <strong>Cpk</strong> (real,
              considerando centralização). Cp = (LSE - LIE) / 6σ. Cpk ≥ 1,33 é considerado capaz. Se Cp é alto mas Cpk é baixo, o processo
              tem potencial mas está descentalizado — precisa de ajuste na média.</p>
            <p>O cálculo dos índices de capacidade (Cp e Cpk) avalia se o processo de envase de fluidos químicos é capaz de atender às especificações estipuladas.</p>
            <p>As <strong>regras de Western Electric</strong> (sinais de descontrole) vão além de &quot;ponto fora do limite&quot;: 2 de 3 pontos
              consecutivos além de 2σ, 4 de 5 além de 1σ, 7 pontos consecutivos de um mesmo lado da média (tendência), ou padrão cíclico.
              Na Petrobras, cartas de controle monitoram octanagem, viscosidade de lubrificantes e espessura de parede de dutos.</p>
            <p>A presença de pontos fora dos limites de controle sinaliza desestabilização por causas especiais, requerendo interrupção imediata para correções operacionais.</p>
            <p>Para a CESGRANRIO: <strong>limites de controle ≠ limites de especificação</strong>. Limites de controle são calculados pelo processo
              (estatísticos). Limites de especificação são definidos pelo cliente/norma (engenharia). Um processo pode estar sob controle
              estatístico mas produzir fora da especificação (Cp baixo).</p>
            <p>Nas refinarias da Petrobras, o CEP monitora em tempo real a pureza de combustíveis e óleos lubrificantes para garantir a qualidade requerida pela ANP.</p>
            
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={7} variant="blue" title="Análise C.E.D.E." description="CEP e cartas de controle na prova." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: Causas Comuns vs Especiais",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p><strong>Comuns:</strong> variação natural, aleatória, sempre presente. Só muda com mudança estrutural no processo. <strong>Especiais:</strong> eventos anormais, identificáveis (operador novo, lote de matéria-prima ruim). Ação: investigar e eliminar a causa específica.</p>
                    <AlertBox tipo="info" titulo="Armadilha clássica">
                      Tratar causa COMUM como se fosse ESPECIAL = &quot;over-adjustment&quot; (ajuste excessivo), que AUMENTA a variação em vez de diminuir.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: CEP na Refinaria",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Carta de controle — Octanagem:</strong> Média = 91. LSC = 93. LIC = 89. Uma amostra deu 94 → FORA DO CONTROLE. Investigação: lote de nafta com composição diferente (causa especial). Ação: segregar lote e reprocessar.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Cp vs Cpk",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Cp</strong> = capacidade POTENCIAL (ignora centralização). <strong>Cpk</strong> = capacidade REAL (considera quão centrado está).</li>
                      <li>Cp alto + Cpk baixo = processo com potencial mas DESCENTRADO.</li>
                      <li>Meta: Cpk ≥ 1,33 (capaz). Cpk ≥ 2,0 (Six Sigma).</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Quando CEP não se aplica",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Processos de lote único">
                      CEP exige dados ao longo do tempo (repetição). Para produção unitária (ex: construção de uma plataforma FPSO), o CEP tradicional não se aplica — usa-se inspeção por atributos e ensaios não destrutivos.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo SERVQUAL, desenvolvido por Parasuraman, Zeithaml e Berry, avalia a qualidade em serviços por meio de:"
          alternativas={[
            { letra: "A", texto: "7 dimensões de qualidade adaptadas do modelo de Garvin para serviços", correta: false },
              { letra: "B", texto: "5 dimensões: Tangíveis, Confiabilidade, Responsividade, Segurança e Empatia", correta: true },
              { letra: "C", texto: "3 gaps principais entre expectativa do cliente e desempenho da empresa", correta: false },
              { letra: "D", texto: "10 critérios baseados nas normas ISO 9001 aplicadas ao setor de serviços", correta: false }
          ]}
          dicaEstrategica="O SERVQUAL mede a qualidade de serviço por 5 dimensões: (1) Tangíveis — instalações físicas, equipamentos, aparência do pessoal; (2) Confiabilidade — capacidade de entregar o serviço prometido com precisão; (3) Responsividade — disposição para ajudar e fornecer serviço rápido; (4) Segurança (Assurance) — conhecimento e cortesia, capacidade de inspirar confiança; (5) Empatia — atenção individualizada ao cliente."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Analisar as alternativas e eliminar distratores com erros óbvios." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={7} variant="blue"
          video={{ videoId: "Q7", title: "CEP e Cartas de Controle", duration: "14:00" }}
          resumoVisual={{ moduloNome: "M7", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Carta de Controle", type: "Gráfico", placeholderColor: "bg-amber-500/20" }, { title: "Cp/Cpk", type: "Fórmula", placeholderColor: "bg-blue-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'LSC-LIC'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>📈</span>
                  <span>🎯</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;Dentro dos limites = OK. Fora = PARE e investigue. LSC/LIC = ±3σ da média.&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", titulo: "Podcast: CEP", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-7")} titulo="QUIZ: Controle Estatístico" numero={7} variant="blue" onComplete={(s) => handleModuleComplete("modulo-7", s)} />
      </TabsContent>

      <TabsContent value="modulo-8" className="mt-0 space-y-12">
        <ModuleBanner numero={8} titulo="Auditoria e Conformidade" variant="blue" descricao="Tipos de auditoria (1ª, 2ª, 3ª parte), não conformidades, ações corretivas e o ciclo de auditoria." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="O Olho da Qualidade" description="Auditoria: verificar se o que está documentado é o que está sendo feito." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p><strong>Auditoria da qualidade</strong> é um processo sistemático, independente e documentado para verificar se o SGQ está
              funcionando conforme planejado. Não é &quot;caça às bruxas&quot; — é uma ferramenta de melhoria. O auditor verifica evidências
              objetivas (registros, documentos, observações) contra critérios definidos (norma ISO, procedimentos internos).</p>
            <p>A prova exige o conhecimento dos tipos de auditoria: interna (primeira parte), fornecedor (segunda parte) e por organismo certificador independente (terceira parte).</p>
            <p><strong>Tipos de auditoria:</strong> (1) <strong>1ª parte</strong> — auditoria INTERNA, feita pela própria organização (autoavaliação);
              (2) <strong>2ª parte</strong> — auditoria de FORNECEDOR, feita pelo cliente no fornecedor; (3) <strong>3ª parte</strong> — auditoria
              EXTERNA, feita por organismo certificador independente (CERTIFICAÇÃO). Apenas a 3ª parte concede o selo ISO.</p>
            <p>A condução de auditorias técnicas baseia-se em relatórios de conformidade e coleta de evidências robustas frente aos critérios normativos definidos.</p>
            <p><strong>Não conformidades</strong> são classificadas em: <strong>Maior</strong> (falha sistêmica que compromete o SGQ — impede
              certificação), <strong>Menor</strong> (falha pontual, isolada — não impede certificação se corrigida) e <strong>Observação</strong>
              (ponto de melhoria, sem falha de requisito). Após a auditoria, a organização define <strong>ações corretivas</strong> (eliminar a
              CAUSA da não conformidade) e <strong>ações preventivas</strong> (evitar que a não conformidade OCORRA).</p>
            <p>O relatório de não-conformidade formal descreve o desvio identificado, a evidência de campo correspondente e o requisito normativo infringido.</p>
            <p>O <strong>ciclo de auditoria</strong> segue: Planejamento → Preparação (checklist) → Reunião de abertura → Execução (coleta de
              evidências) → Relatório (achados + não conformidades) → Reunião de encerramento → Acompanhamento (verificação das ações
              corretivas). Na Petrobras, auditorias internas acontecem semestralmente em cada unidade operacional.</p>
            <p>O tratamento de desvios de auditoria exige a busca da causa raiz e a implementação de planos de ações corretivas com posterior validação de eficácia.</p>
            <p>Para a CESGRANRIO: <strong>ação corretiva ≠ correção</strong>. Correção = resolver o EFEITO (apagar incêndio). Ação corretiva
              = resolver a CAUSA (instalar detector de fumaça). Ação preventiva = evitar que aconteça (eliminar material inflamável).</p>
            <p>Auditores técnicos da Petrobras fiscalizam estaleiros contratados para garantir a conformidade técnica dos marcos físicos e cronograma de FPSOs.</p>
            
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={8} variant="blue" title="Análise C.E.D.E." description="Auditoria e conformidade na prova." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: 1ª, 2ª e 3ª Parte",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p><strong>1ª parte:</strong> eu audito a mim mesmo (interna). <strong>2ª parte:</strong> meu cliente me audita (fornecedor). <strong>3ª parte:</strong> um órgão independente me audita (certificação). Macete: &quot;1=EU, 2=CLIENTE, 3=CERTIFICADOR&quot;.</p>
                    <AlertBox tipo="info" titulo="Independência">
                      O auditor NUNCA pode auditar seu próprio trabalho. Mesmo na auditoria interna (1ª parte), o auditor deve ser de outro departamento.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: Auditoria na Petrobras",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Auditoria de 2ª parte:</strong> A Petrobras audita um fornecedor de válvulas antes de inclui-lo no cadastro. Verifica: ISO 9001 (3ª parte OK), registros de inspeção, rastreabilidade de materiais, certificações de soldadores. Não conformidade maior encontrada: lotes sem rastreabilidade → fornecedor REPROVADO até implementar ação corretiva.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Corretiva vs Preventiva",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Correção</strong> = resolver o EFEITO imediato (tampar o vazamento).</li>
                      <li><strong>Ação corretiva</strong> = resolver a CAUSA raiz (trocar a válvula defeituosa).</li>
                      <li><strong>Ação preventiva</strong> = evitar que aconteça (programa de manutenção preditiva).</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Auditoria Remota",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Auditoria híbrida/remota">
                      Pós-pandemia, auditorias remotas (vídeo + documentos digitais) foram aceitas pela ISO. Porém, para processos críticos (soldagem offshore, teste hidrostático), a auditoria presencial continua sendo obrigatória na Petrobras.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={8}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Uma 'não-conformidade' no contexto da gestão da qualidade é definida como:"
          alternativas={[
            { letra: "A", texto: "Qualquer falha que cause prejuízo financeiro significativo à empresa", correta: false },
              { letra: "B", texto: "Não atendimento a um requisito especificado (norma, especificação, procedimento ou regulamento)", correta: true },
              { letra: "C", texto: "Defeito encontrado exclusivamente na inspeção final de produto acabado", correta: false },
              { letra: "D", texto: "Divergência de opinião entre departamentos sobre procedimentos internos", correta: false }
          ]}
          dicaEstrategica="Uma NC pode ser detectada em auditoria, inspeção de processo, reclamação de cliente ou auto-inspeção."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Não-conformidade (NC) = não atendimento a um requisito." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "O requisito pode ser: especificação técnica de produto, procedimento operacional padrão, cláusula de norma ISO, regulação legal, requisito do cliente." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={8} variant="blue"
          video={{ videoId: "Q8", title: "Auditoria e Conformidade", duration: "12:00" }}
          resumoVisual={{ moduloNome: "M8", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Tipos de Auditoria", type: "Diagrama", placeholderColor: "bg-emerald-500/20" }, { title: "Não Conformidades", type: "Tabela", placeholderColor: "bg-rose-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do '1-2-3'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>🔍</span>
                  <span>📝</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;1ª = <strong>EU</strong> me audito. 2ª = Meu <strong>CLIENTE</strong> me audita. 3ª = <strong>CERTIFICADOR</strong> me audita. Só a 3ª dá selo ISO!&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", titulo: "Podcast: Auditoria", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-8")} titulo="QUIZ: Auditoria" numero={8} variant="blue" onComplete={(s) => handleModuleComplete("modulo-8", s)} />
      </TabsContent>

      <TabsContent value="modulo-9" className="mt-0 space-y-12">
        <ModuleBanner numero={9} titulo="Qualidade na Petrobras" variant="blue" descricao="SGI, SMS, especificações técnicas, qualificação de fornecedores e excelência operacional." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index="INTRO" variant="blue" title="Excelência no O&G" description="Como a maior empresa da América Latina gerencia qualidade em operações de altíssimo risco." />
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A Petrobras opera em um dos ambientes mais exigentes do mundo: <strong>águas ultraprofundas (pré-sal, 2.000-7.000m)</strong>,
              refinarias com processos a alta temperatura/pressão, e dutos que cruzam milhares de km. Qualquer falha pode ter consequências
              catastróficas (explosão, vazamento ambiental, perda de vidas). Por isso, a qualidade na Petrobras vai muito além do
              &quot;satisfazer o cliente&quot; — é questão de <strong>segurança operacional</strong>.</p>
            <p>Questões sobre a estatal focam nos processos de qualificação de fornecedores, avaliação de SMS e conformidade contratual técnica de suprimentos.</p>
            <p>O <strong>SGI (Sistema de Gestão Integrada)</strong> da Petrobras unifica: ISO 9001 (qualidade), ISO 14001 (meio ambiente) e
              ISO 45001 (segurança). O <strong>SMS (Saúde, Meio Ambiente e Segurança)</strong> é a <strong>prioridade ZERO</strong> — superior a
              qualquer meta de produção ou financeira. &quot;Se não é seguro, não fazemos&quot; é o lema.</p>
            <p>O PRODEP (Programa de Desenvolvimento de Fornecedores da Petrobras) eleva a capacitação da cadeia produtiva nacional exigindo padrões internacionais.</p>
            <p>A <strong>qualificação de fornecedores</strong> segue o CRCC (Certificado de Registro e Classificação Cadastral) via portal
              Petronect. Requisitos: ISO 9001 válida, capacidade técnica comprovada, atendimento às especificações técnicas Petrobras
              (ET), histórico de desempenho e avaliação de risco financeiro. Fornecedores são auditados periodicamente (2ª parte).</p>
            <p>O indicador IDF (Índice de Desempenho de Fornecedor) monitora a qualidade técnica e pontualidade de entregas das empresas contratadas pela estatal.</p>
            <p>As <strong>Especificações Técnicas (ET)</strong> da Petrobras são documentos internos que definem requisitos de qualidade para
              materiais e serviços. São mais rigorosas que normas ISO ou ABNT. Exemplo: uma válvula aprovada por norma ASME pode ser
              REPROVADA pela ET Petrobras se não atender requisitos adicionais de corrosão por H2S (ambiente de pré-sal).</p>
            <p>A manutenção do status ativo de fornecedor qualificado exige o cumprimento das diretrizes corporativas de compliance de integridade.</p>
            <p>A <strong>inspeção de fabricação</strong> é realizada por inspetores Petrobras (ou terceiros acreditados) DENTRO da fábrica do
              fornecedor, acompanhando a produção em tempo real. Testes: ensaios não destrutivos (ultrassom, raio-X, líquido penetrante),
              testes hidrostáticos, análise química de materiais e testes mecânicos (tração, impacto Charpy).</p>
            <p>O cadastro CRCC da Petrobras avalia exaustivamente as dimensões técnica, legal, econômico-financeira e de SMS de empresas interessadas em fornecer para o pré-sal.</p>
            
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={9} variant="blue" title="Análise C.E.D.E." description="Qualidade Petrobras para a prova." />
          <ContentAccordion mode="stacked" slides={[
              {
                titulo: "Conceituação: SMS é Prioridade Zero",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-4">
                    <p>Na hierarquia Petrobras, SMS vem ANTES de produção e lucro. Isso significa que uma operação pode ser PARADA por risco de segurança, mesmo que isso custe milhões em produção perdida. O SMS é a soma de: Saúde ocupacional + Meio Ambiente + Segurança do trabalho.</p>
                    <AlertBox tipo="info" titulo="15 Diretrizes de SMS">
                      A Petrobras tem 15 diretrizes corporativas de SMS que regem todas as operações. A diretriz nº 1 é: &quot;Liderança e responsabilidade&quot; — cada gestor é responsável pelo SMS de sua equipe.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: ET vs Norma",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg border border-border">
                      <p className="text-base"><strong>Caso real:</strong> Um fornecedor de tubos apresentou material aprovado pela norma API 5L (internacional). Porém, a ET Petrobras exigia teste de resistência a HIC (Hydrogen Induced Cracking) para ambiente de pré-sal — requisito ADICIONAL não previsto na norma API. Material REPROVADO. A especificação Petrobras é a lei final.</p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Dicas: Petrobras na Prova",
                icone: <LuFileText />,
                conteudo: (
                  <div className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>SMS = prioridade ZERO</strong> (acima de produção e lucro).</li>
                      <li><strong>SGI</strong> = ISO 9001 + 14001 + 45001 integradas.</li>
                      <li><strong>ET Petrobras</strong> pode ser MAIS rigorosa que normas internacionais.</li>
                      <li><strong>CRCC</strong> = pré-requisito para fornecer à Petrobras.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exceções: Quando a Norma não Basta",
                icone: <LuSearch />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Pré-sal: desafio único">
                      O ambiente do pré-sal (alta pressão, CO2, H2S, temperatura) não era previsto nas normas internacionais tradicionais. A Petrobras teve que desenvolver suas próprias especificações (ET) porque nenhuma norma existente era suficiente.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </div>

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={9}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O Sistema de Gestão Integrado (SGI) da Petrobras integra três sistemas de gestão. Quais são eles?"
          alternativas={[
            { letra: "A", texto: "Qualidade, Finanças e Recursos Humanos", correta: false },
              { letra: "B", texto: "Qualidade (ISO 9001), Meio Ambiente (ISO 14001) e Saúde e Segurança (ISO 45001)", correta: true },
              { letra: "C", texto: "Qualidade, Produção e Logística", correta: false },
              { letra: "D", texto: "ISO 9001, ISO 27001 e ISO 50001", correta: false }
          ]}
          dicaEstrategica="Essencial em O&G onde QSE (Qualidade, Segurança e Meio Ambiente) são inseparáveis."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "O SGI da Petrobras integra: (1) Gestão da Qualidade — ISO 9001; (2) Gestão Ambiental — ISO 14001; (3) Gestão de Saúde e Segurança Ocupacional — ISO 45001." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "A integração permite uma visão sistêmica, evitando conflitos entre sistemas, reduzindo duplicidade de auditorias e criando sinergias." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={9} variant="blue"
          video={{ videoId: "Q9", title: "Qualidade na Petrobras", duration: "10:00" }}
          resumoVisual={{ moduloNome: "M9", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "SGI Petrobras", type: "Diagrama", placeholderColor: "bg-blue-500/20" }, { title: "SMS", type: "Infográfico", placeholderColor: "bg-emerald-500/20" }] }}
          sinteseEstrategica={{
            title: "O Macete do 'SMS'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                  <span>⛔</span>
                  <span>🛢️</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  &quot;<strong>S</strong>aúde + <strong>M</strong>eio Ambiente + <strong>S</strong>egurança = Prioridade ZERO. Se não é seguro, NÃO fazemos!&quot;
                </p>
              </>
            ),
          }}
          audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", titulo: "Podcast: Petrobras", artista: "Prof. Qualidade" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-9")} titulo="QUIZ: Qualidade na Petrobras" numero={9} variant="blue" onComplete={(s) => handleModuleComplete("modulo-9", s)} />
      </TabsContent>

      <TabsContent value="modulo-10" className="space-y-12 mt-0 outline-none">
        <ModuleBanner
          numero={10}
          titulo="Simulado Geral"
          descricao="Teste final abrangente. Aprovação destrava a XP completa da Missão Geração Ouro da CESGRANRIO focada em concursos Petrobras."
          variant={getModuleVariant(10)}
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Simulado Geral: Gestão da Qualidade"
            description="Avaliação integrada consolidando todos os conceitos estudados nesta aula."
            variant={getModuleVariant(10)}
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O Simulado Geral é a avaliação integradora que sintetiza tudo que você aprendeu nos 9 módulos anteriores de Gestão da Qualidade. Diferente dos quizzes individuais de cada módulo que focam em conceitos específicos de forma isolada, o simulado combina múltiplos domínios em questões de alta complexidade. Uma questão pode começar descrevendo uma falha de qualidade em um lote de suprimentos, pedir para identificar as causas raiz usando os 6M, e em seguida solicitar que você trace o plano de ação corretivo no ciclo PDCA.</p>
            <p>A estrutura do simulado inclui questões que testam de forma ampla os conceitos clássicos exigidos pelas principais bancas de concurso público. A meta de aprovação de 70% reflete a exigência de eficiência teórica e operacional. O tempo sugerido de resolução simula a restrição de tempo real de prova, preparando você para tomar decisões rápidas sob pressão.</p>
            <p>Os cenários avaliados envolvem auditorias de qualidade na cadeia logística, certificações de fornecedores e controle estatístico de processos. A aplicação prática de ferramentas como Pareto, Ishikawa e cartas de controle é trazida para testar sua capacidade de análise quantitativa e tomada de decisão fundamentada em dados.</p>
            <p>A teoria da qualidade, desde os pioneiros Deming, Juran e Crosby, estabelece o ciclo PDCA e a gestão da qualidade total (TQM) como alicerces de melhoria contínua de processos.</p>
            <p>A estratégia de resolução exige leitura crítica de enunciados extensos, onde pequenos detalhes alteram a classificação da não-conformidade. O candidato deve identificar primeiro o objetivo central da questão e descartar alternativas tecnicamente inconsistentes com os conceitos dos principais gurus da qualidade.</p>
            <p>Um exemplo prático é o mapeamento de falhas por Diagrama de Pareto, mostrando que 80% das perdas operacionais em compras vêm de apenas 20% das causas recorrentes.</p>
            <p>A preparação direcionada à Petrobras consolida a visão de que a gestão de qualidade total (TQM) e a conformidade com as normas ISO 9001 são fundamentais para a segurança operacional offshore e a integridade dos processos licitatórios governamentais.</p>
            <p>Em níveis mais complexos, as diretrizes da certificação ISO 9001 exigem controle documental estrito, auditorias periódicas de conformidade e tratamento de não-conformidades de fornecedores.</p>
            <p>Na Petrobras, o controle de qualidade de materiais comprados é auditado com rigor para evitar falhas em equipamentos críticos offshore, em linha com as exigências de SMS e preservação da vida.</p>
            <p>Atingir a pontuação mínima valida que você desenvolveu o raciocínio crítico necessário para atuar na companhia.</p>
          </div>
        </section>

        <ContentAccordion mode="stacked" slides={[
            {
              titulo: "Visão Integrada de Conceitos",
              icone: <LuBrain />,
              conteudo: <p className="text-lg text-justify">O simulado exige que você conecte as teorias, os processos práticos de suporte e a conformidade ética em cenários realistas de auditorias e concorrência.</p>
            },
            {
              titulo: "Tempo e Estratégia",
              icone: <LuFileText />,
              conteudo: <p className="text-lg text-justify">Treine a resolução de questões sob a média de 3 minutos por item. Aprenda a identificar as pegadinhas da banca e a eliminar alternativas incorretas rapidamente.</p>
            },
            {
              titulo: "Padrão CESGRANRIO",
              icone: <LuBookOpen />,
              conteudo: <p className="text-lg text-justify">As questões simulam fielmente as provas recentes da Petrobras, cobrando o discernimento entre casos práticos e a legislação em vigor.</p>
            },
            {
              titulo: "Calibração de Desempenho",
              icone: <LuSearch />,
              conteudo: <p className="text-lg text-justify">Utilize o resultado do simulado para identificar quais módulos requerem revisão ativa. Focar nas suas fraquezas agora garante os pontos decisivos no dia da prova.</p>
            }
          ]}
        />

                {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={10}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Uma empresa de serviços de manutenção industrial implementou um SGQ ISO 9001:2015. Na última auditoria interna, o auditor identificou que os operadores realizam inspeções visuais sem seguir o procedimento documentado (PRO-INS-01), embora produzam resultados aceitáveis. Esta situação é classificada como:"
          alternativas={[
            { letra: "A", texto: "Oportunidade de melhoria, pois os resultados são aceitáveis", correta: false },
              { letra: "B", texto: "Não-conformidade, pois há não atendimento a um requisito (procedimento documentado)", correta: true },
              { letra: "C", texto: "Observação sem necessidade de ação corretiva", correta: false },
              { letra: "D", texto: "Conformidade condicionada, válida apenas se os resultados forem aprovados", correta: false }
          ]}
          dicaEstrategica="O resultado satisfatório não elimina a NC — a causa raiz (não seguimento do procedimento) deve ser investigada e corrigida."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Mesmo com resultados aceitáveis, o não seguimento do procedimento documentado é uma NÃO-CONFORMIDADE." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "A ISO 9001 exige que a organização siga seus próprios procedimentos e controles documentados (cláusula 8.1)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
          index={10}
          variant={getModuleVariant(10)}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Revisão e Simulado Geral de Gestão de Qualidade",
            duration: "25:15"
          }}
          resumoVisual={{
            moduloNome: "Simulado Final",
            tituloAula: "Gestão de Qualidade",
            materia: "Suprimento",
            images: [
              { title: "Mapa Mental Geral de Revisão", type: "infográfico", placeholderColor: "bg-rose-500/20" }
            ]
          }}
          sinteseEstrategica={{
            title: "O Ponto Final",
            content: <div className="text-center"><span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span><p className="text-lg italic text-center">"O Técnico de Suprimentos zela pela conformidade técnica de cada processo operacional."</p></div>
          }}
          audio={{
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            titulo: "Podcast: Sucesso no Concurso Petrobras",
            artista: "Prof. Suprimentos"
          }}
        />

        <QuizInterativo
          titulo="Simulado Final: Gestão de Qualidade"
          numero={10}
          variant={getModuleVariant(10)}
          questoes={mapQuizQuestions('modulo-10')}
          onComplete={(score: number) => handleModuleComplete("modulo-10", score)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
