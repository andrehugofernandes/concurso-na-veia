"use client";

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
} from "@/components/aulas/shared";
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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

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
    { id: "modulo-10", label: "M10", title: "Simulado Mestre" },
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
        <ModuleBanner numero={1} titulo="Fundamentos da Qualidade" variant={mv[1]} descricao="Conceitos, abordagens de Garvin, ciclo PDCA e custos da qualidade." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={1} variant={mv[1]} title="O que é Qualidade?" description="Da conformidade ao encantamento — as múltiplas dimensões do conceito." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              <strong>Qualidade</strong> é um conceito multidimensional. Para <strong>Juran</strong>, é &quot;adequação ao uso&quot;. Para <strong>Crosby</strong>, é
              &quot;conformidade com requisitos&quot;. Para <strong>Deming</strong>, é &quot;o grau de satisfação do cliente a um custo previsível&quot;. A ISO 9000:2015
              define como &quot;grau em que um conjunto de características inerentes de um objeto satisfaz requisitos&quot;. Na Petrobras, qualidade
              significa que uma válvula deve suportar 10.000 PSI, um duto deve resistir a corrosão por 25 anos, e um EPI deve proteger o
              trabalhador offshore em condições extremas — sem exceção.
            </p>
            <p>
              <strong>David Garvin</strong> identificou <strong>5 abordagens</strong> da qualidade: (1) <strong>Transcendental</strong> — qualidade é reconhecida
              intuitivamente, não pode ser definida (como arte); (2) <strong>Baseada no Produto</strong> — qualidade é mensurável, atributo do produto;
              (3) <strong>Baseada no Usuário</strong> — qualidade é o que o cliente quer (Juran); (4) <strong>Baseada na Produção</strong> — qualidade é
              conformidade com especificações (Crosby); (5) <strong>Baseada no Valor</strong> — qualidade é desempenho a um preço aceitável. A CESGRANRIO
              cobra frequentemente a associação entre abordagem e autor.
            </p>
            <p>
              O <strong>ciclo PDCA (Plan-Do-Check-Act)</strong> é a ferramenta universal de melhoria contínua. <strong>Plan</strong>: identificar o problema,
              analisar causas, definir plano de ação. <strong>Do</strong>: executar o plano, treinar equipe. <strong>Check</strong>: verificar resultados,
              comparar com metas. <strong>Act</strong>: padronizar o que funcionou ou corrigir o que falhou. O PDCA é cíclico — nunca para. Na Petrobras,
              cada unidade operacional roda PDCAs trimestrais para melhoria de processos de SMS.
            </p>
            <p>
              Os <strong>custos da qualidade</strong> se dividem em 4 categorias: (1) <strong>Prevenção</strong> — treinamento, planejamento, manutenção
              preventiva; (2) <strong>Avaliação</strong> — inspeções, testes, auditorias; (3) <strong>Falhas internas</strong> — retrabalho, sucata, parada
              de máquina (antes de chegar ao cliente); (4) <strong>Falhas externas</strong> — garantia, recall, multas, perda de reputação (após chegar
              ao cliente). Regra: investir em prevenção REDUZ os custos de falhas. Falhas externas são 10-100x mais caras que prevenção.
            </p>
            <p>
              A <strong>Gestão da Qualidade Total (TQM)</strong> é a filosofia de que a qualidade é responsabilidade de TODOS na organização, não
              apenas do departamento de controle de qualidade. TQM envolve: foco no cliente, melhoria contínua (kaizen), envolvimento total dos
              funcionários, decisão baseada em dados e gestão por processos. Na Petrobras, o TQM se manifesta no Sistema de Gestão Integrada (SGI)
              que une qualidade (ISO 9001), meio ambiente (ISO 14001) e segurança (ISO 45001) em um único sistema.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">As 5 Abordagens de Garvin</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-center">
                <div className="p-2 bg-blue-500/10 rounded-lg"><p className="font-bold text-xs">Transcendental</p><p className="text-muted-foreground text-xs">Intuição</p></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><p className="font-bold text-xs">Produto</p><p className="text-muted-foreground text-xs">Mensurável</p></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><p className="font-bold text-xs">Usuário</p><p className="text-muted-foreground text-xs">Juran</p></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><p className="font-bold text-xs">Produção</p><p className="text-muted-foreground text-xs">Crosby</p></div>
                <div className="p-2 bg-blue-500/10 rounded-lg"><p className="font-bold text-xs">Valor</p><p className="text-muted-foreground text-xs">Custo-benefício</p></div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={1} variant={mv[1]} title="Análise C.E.D.E." description="Fundamentos que caem toda prova." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={1} variant={mv[1]}
          video={{ videoId: "Q1", title: "Fundamentos da Qualidade", duration: "12:00" }}
          resumoVisual={{ moduloNome: "M1", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Ciclo PDCA", type: "Diagrama", placeholderColor: "bg-blue-500/20" }, { title: "Custos da Qualidade", type: "Gráfico", placeholderColor: "bg-amber-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-1")} titulo="QUIZ: Fundamentos da Qualidade" numero={1} variant={mv[1]} onComplete={(s) => handleModuleComplete("modulo-1", s)} />
      </TabsContent>

      <TabsContent value="modulo-2" className="mt-0 space-y-12">
        <ModuleBanner numero={2} titulo="As 4 Eras da Qualidade" variant={mv[2]} descricao="Da inspeção artesanal à gestão estratégica — a evolução do conceito de qualidade." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} variant={mv[2]} title="Evolução Histórica" description="Como a qualidade saiu do chão de fábrica e chegou à sala da diretoria." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              A <strong>1ª Era — Inspeção (até 1930)</strong> é a fase mais primitiva: o artesão inspecionava CADA peça individualmente, separando
              as boas das ruins. Não havia prevenção — apenas detecção pós-produção. Com a Revolução Industrial, a inspeção 100% tornou-se
              inviável pelo volume. Resultado: surgimento de inspetores especializados, separados da produção.
            </p>
            <p>
              A <strong>2ª Era — Controle Estatístico (1930-1950)</strong> surge com <strong>Walter Shewhart</strong> e os gráficos de controle.
              Em vez de inspecionar 100% da produção, usa-se amostragem estatística. Conceitos-chave: limites de controle (LSC/LIC),
              variabilidade natural vs. variabilidade especial, e cartas de controle. Dodge e Romig criaram as tabelas de amostragem.
              A qualidade passa a ser um problema TÉCNICO, baseado em dados — não mais em julgamento visual.
            </p>
            <p>
              A <strong>3ª Era — Garantia da Qualidade (1950-1980)</strong> amplia o foco: qualidade não é só controle estatístico, mas PREVENÇÃO.
              Surge a engenharia da qualidade com <strong>Juran</strong> (Trilogia: Planejamento, Controle, Melhoria) e <strong>Feigenbaum</strong> (TQC —
              Total Quality Control, que envolve todos os departamentos). A qualidade sai do chão de fábrica e entra no projeto, nas compras,
              na logística. Custos da qualidade são quantificados pela primeira vez.
            </p>
            <p>
              A <strong>4ª Era — Gestão Estratégica / TQM (1980+)</strong> é a era atual: qualidade como <strong>vantagem competitiva</strong>. O CEO
              lidera a qualidade. Ferramentas: benchmarking, BSC, Six Sigma, Lean, ISO 9001. A qualidade é responsabilidade de TODOS —
              do porteiro ao presidente. Na Petrobras, isso se reflete no SGI e no Prêmio Nacional da Qualidade (PNQ).
            </p>
            <p>
              Na CESGRANRIO, a pergunta mais comum é: &quot;Em qual era da qualidade o foco passou a ser a PREVENÇÃO, não apenas a detecção?&quot;
              Resposta: <strong>3ª Era (Garantia)</strong>. Outra armadilha: o TQC de Feigenbaum (3ª era) ≠ TQM (4ª era). TQC é controle total
              por todos os departamentos; TQM é gestão estratégica com foco no cliente.
            </p>
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
          <ModuleSectionHeader index={2} variant={mv[2]} title="Análise C.E.D.E." description="As Eras que mais caem na CESGRANRIO." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={2} variant={mv[2]}
          video={{ videoId: "Q2", title: "As 4 Eras da Qualidade", duration: "10:00" }}
          resumoVisual={{ moduloNome: "M2", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Timeline Eras", type: "Timeline", placeholderColor: "bg-amber-500/20" }, { title: "Evolução do Foco", type: "Diagrama", placeholderColor: "bg-blue-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-2")} titulo="QUIZ: Eras da Qualidade" numero={2} variant={mv[2]} onComplete={(s) => handleModuleComplete("modulo-2", s)} />
      </TabsContent>

      <TabsContent value="modulo-3" className="mt-0 space-y-12">
        <ModuleBanner numero={3} titulo="Os Gurus da Qualidade" variant={mv[3]} descricao="Deming, Juran, Crosby, Ishikawa e Feigenbaum — os pais da gestão da qualidade moderna." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={3} variant={mv[3]} title="Os 5 Mestres" description="Cada guru trouxe uma contribuição única — e a CESGRANRIO adora cobrar quem fez o quê." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              <strong>W. Edwards Deming</strong> é o guru mais cobrado. Contribuições: <strong>14 pontos da qualidade</strong> (eliminar medo, acabar com
              dependência de inspeção, instituir treinamento, etc.), popularização do <strong>ciclo PDCA</strong> (criado por Shewhart), o conceito de
              <strong>variabilidade</strong> (causas comuns vs. especiais) e o <strong>Sistema de Conhecimento Profundo</strong> (pensamento sistêmico,
              conhecimento de variação, teoria do conhecimento, psicologia). Deming levou a qualidade ao Japão no pós-guerra.
            </p>
            <p>
              <strong>Joseph Juran</strong> definiu qualidade como &quot;adequação ao uso&quot; e criou a <strong>Trilogia da Qualidade</strong>: (1) Planejamento
              (definir metas + meios); (2) Controle (medir desempenho vs. meta); (3) Melhoria (elevar o patamar). Também aplicou o <strong>Princípio
              de Pareto 80/20</strong> à qualidade: 80% dos problemas vêm de 20% das causas — os &quot;poucos vitais&quot; vs. os &quot;muitos triviais&quot;.
            </p>
            <p>
              <strong>Philip Crosby</strong> é o guru do <strong>Zero Defeitos</strong>. Para ele, qualidade é conformidade com requisitos (não excelência
              abstrata), e o padrão de desempenho deve ser zero defeitos (não &quot;nível aceitável de defeitos&quot;). Criou os <strong>4 Absolutos
              da Qualidade</strong>: (1) qualidade = conformidade; (2) prevenção, não inspeção; (3) padrão = zero defeitos; (4) custo da
              não-conformidade como medida da qualidade. Famoso pela frase: &quot;A qualidade é investimento, não é custo&quot;.
            </p>
            <p>
              <strong>Kaoru Ishikawa</strong> democratizou a qualidade no Japão. Contribuições: <strong>Diagrama de Causa e Efeito</strong> (espinha de
              peixe, com os 6M: Mão de Obra, Máquina, Material, Método, Meio Ambiente, Medida), os <strong>Círculos de Controle de Qualidade
              (CCQ)</strong> — grupos voluntários de trabalhadores que se reúnem para resolver problemas — e as <strong>7 ferramentas básicas</strong>
              da qualidade. O CCQ simboliza a participação operária na melhoria da qualidade.
            </p>
            <p>
              <strong>Armand Feigenbaum</strong> criou o conceito de <strong>TQC (Total Quality Control)</strong>: a qualidade é responsabilidade de
              todos os departamentos, não apenas do controle de qualidade. O TQC integra marketing, engenharia, produção e assistência técnica
              em torno da satisfação do cliente. Atenção: TQC (Feigenbaum, 3ª Era) ≠ TQM (4ª Era). O TQC é mais operacional; o TQM é estratégico.
            </p>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">Guru → Contribuição Principal</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-center">
                <div className="p-2 bg-emerald-500/10 rounded-lg"><p className="font-bold text-xs">Deming</p><p className="text-muted-foreground text-xs">14 Pontos + PDCA</p></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><p className="font-bold text-xs">Juran</p><p className="text-muted-foreground text-xs">Trilogia + 80/20</p></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><p className="font-bold text-xs">Crosby</p><p className="text-muted-foreground text-xs">Zero Defeitos</p></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><p className="font-bold text-xs">Ishikawa</p><p className="text-muted-foreground text-xs">Diagrama + CCQ</p></div>
                <div className="p-2 bg-emerald-500/10 rounded-lg"><p className="font-bold text-xs">Feigenbaum</p><p className="text-muted-foreground text-xs">TQC</p></div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={3} variant={mv[3]} title="Análise C.E.D.E." description="Quem fez o quê? A CESGRANRIO ama cobrar isso." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={3} variant={mv[3]}
          video={{ videoId: "Q3", title: "Os Gurus da Qualidade", duration: "15:00" }}
          resumoVisual={{ moduloNome: "M3", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Tabela Gurus", type: "Tabela", placeholderColor: "bg-emerald-500/20" }, { title: "Diagrama Ishikawa", type: "Diagrama", placeholderColor: "bg-amber-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-3")} titulo="QUIZ: Gurus da Qualidade" numero={3} variant={mv[3]} onComplete={(s) => handleModuleComplete("modulo-3", s)} />
      </TabsContent>

      <TabsContent value="modulo-4" className="mt-0 space-y-12">
        <ModuleBanner numero={4} titulo="Ferramentas da Qualidade" variant={mv[4]} descricao="As 7 ferramentas básicas, Ishikawa (6M), Pareto, Histograma, 5W2H e Brainstorming." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={4} variant={mv[4]} title="O Arsenal da Qualidade" description="7 ferramentas que resolvem 95% dos problemas de qualidade no chão de fábrica." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              As <strong>7 ferramentas básicas da qualidade</strong> foram sistematizadas por <strong>Ishikawa</strong>: (1) <strong>Diagrama de Pareto</strong> — gráfico
              de barras que ordena causas por frequência (80/20); (2) <strong>Diagrama de Causa e Efeito (Ishikawa/Espinha de Peixe)</strong> — identifica
              causas raiz usando os 6M; (3) <strong>Histograma</strong> — distribuição de frequência de dados; (4) <strong>Folha de Verificação</strong> —
              formulário para coleta padronizada de dados; (5) <strong>Diagrama de Dispersão</strong> — correlação entre duas variáveis;
              (6) <strong>Fluxograma</strong> — mapeamento visual do processo; (7) <strong>Carta de Controle (CEP)</strong> — monitoramento da
              variabilidade ao longo do tempo.
            </p>
            <p>
              O <strong>Diagrama de Ishikawa (Espinha de Peixe)</strong> é a ferramenta mais cobrada. Os <strong>6M</strong> representam as categorias de
              causas: <strong>Mão de Obra</strong> (habilidade, treinamento), <strong>Máquina</strong> (equipamento, manutenção), <strong>Material</strong>
              (insumo, fornecedor), <strong>Método</strong> (procedimento, processo), <strong>Meio Ambiente</strong> (condições externas) e
              <strong>Medida</strong> (instrumentos, calibração). Na Petrobras, o diagrama é usado em análises de falha de equipamentos offshore.
            </p>
            <p>
              O <strong>Diagrama de Pareto</strong> aplica o princípio 80/20 de Juran: um gráfico de barras decrescentes com linha de percentual
              acumulado. Permite identificar os &quot;poucos vitais&quot; — as poucas causas que geram a maioria dos problemas. Na Petrobras,
              análises de Pareto em paradas não programadas revelam que 3-4 tipos de falha respondem por 70%+ das ocorrências.
            </p>
            <p>
              Além das 7 ferramentas básicas, existem as <strong>7 ferramentas gerenciais</strong> (para problemas mais complexos): Diagrama de
              Afinidade, Diagrama de Relações, Diagrama em Árvore, Diagrama Matricial, Matriz de Priorização, PDPC e Diagrama de Rede.
              E ferramentas complementares como o <strong>5W2H</strong> (What, Why, Where, When, Who, How, How much) e o <strong>Brainstorming</strong>.
            </p>
            <p>
              Para a CESGRANRIO, saiba associar cada ferramenta ao seu propósito: investigar CAUSAS = Ishikawa; PRIORIZAR causas = Pareto;
              COLETAR dados = Folha de Verificação; VER distribuição = Histograma; MONITORAR processo = Carta de Controle; VER correlação =
              Dispersão; MAPEAR processo = Fluxograma.
            </p>
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">As 7 Ferramentas Básicas</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
                <div className="p-2 bg-rose-500/10 rounded-lg"><p className="font-bold text-xs">Pareto</p><p className="text-muted-foreground text-xs">Priorizar</p></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><p className="font-bold text-xs">Ishikawa</p><p className="text-muted-foreground text-xs">Causas raiz</p></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><p className="font-bold text-xs">Histograma</p><p className="text-muted-foreground text-xs">Distribuição</p></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><p className="font-bold text-xs">Folha Verif.</p><p className="text-muted-foreground text-xs">Coletar dados</p></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><p className="font-bold text-xs">Dispersão</p><p className="text-muted-foreground text-xs">Correlação</p></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><p className="font-bold text-xs">Fluxograma</p><p className="text-muted-foreground text-xs">Mapear processo</p></div>
                <div className="p-2 bg-rose-500/10 rounded-lg"><p className="font-bold text-xs">Carta CEP</p><p className="text-muted-foreground text-xs">Monitorar</p></div>
                <div className="p-2 bg-amber-500/10 rounded-lg"><p className="font-bold text-xs">+ 5W2H</p><p className="text-muted-foreground text-xs">Plano de ação</p></div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={4} variant={mv[4]} title="Análise C.E.D.E." description="Ferramentas que caem toda prova de qualidade." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={4} variant={mv[4]}
          video={{ videoId: "Q4", title: "Ferramentas da Qualidade", duration: "18:00" }}
          resumoVisual={{ moduloNome: "M4", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "7 Ferramentas", type: "Dashboard", placeholderColor: "bg-rose-500/20" }, { title: "6M Ishikawa", type: "Diagrama", placeholderColor: "bg-blue-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-4")} titulo="QUIZ: Ferramentas da Qualidade" numero={4} variant={mv[4]} onComplete={(s) => handleModuleComplete("modulo-4", s)} />
      </TabsContent>

      <TabsContent value="modulo-5" className="mt-0 space-y-12">
        <ModuleBanner numero={5} titulo="Normas ISO e Certificação" variant={mv[5]} descricao="ISO 9001 (Qualidade), ISO 14001 (Ambiental), ISO 45001 (Segurança) e o SGI." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={5} variant={mv[5]} title="O Selo de Excelência" description="As normas ISO como framework global de gestão da qualidade." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              A <strong>ISO (International Organization for Standardization)</strong> é o organismo internacional que publica normas técnicas.
              A família <strong>ISO 9000</strong> trata da qualidade: a <strong>ISO 9001:2015</strong> é a norma certificável que estabelece requisitos
              para o SGQ (Sistema de Gestão da Qualidade). Seus 7 princípios: foco no cliente, liderança, engajamento de pessoas, abordagem
              de processo, melhoria, decisão baseada em evidência e gestão de relacionamento. A ISO 9000 (vocabulário) e ISO 9004 (diretrizes
              para melhoria) complementam mas NÃO são certificáveis.
            </p>
            <p>
              A <strong>ISO 14001:2015</strong> trata do <strong>Sistema de Gestão Ambiental (SGA)</strong> — poluição, resíduos, emissões. A
              <strong>ISO 45001:2018</strong> substitui a OHSAS 18001 e trata do <strong>Sistema de Gestão de Saúde e Segurança Ocupacional</strong>.
              Na Petrobras, as três normas são integradas no <strong>SGI (Sistema de Gestão Integrada)</strong>, que une qualidade + meio ambiente
              + segurança em um único framework de gestão.
            </p>
            <p>
              A estrutura HLS (High Level Structure) da ISO garante que todas as normas sigam os mesmos 10 capítulos:
              Escopo, Referências, Termos, Contexto, Liderança, Planejamento, Apoio, Operação, Avaliação de Desempenho e Melhoria.
              Isso facilita a integração (SGI) e a auditoria combinada. A abordagem é baseada em <strong>Risco</strong> (mentalidade de risco)
              e <strong>PDCA</strong> está embutido na estrutura.
            </p>
            <p>
              A <strong>certificação</strong> é realizada por organismos acreditados (no Brasil, acreditados pelo INMETRO). Tipos de auditoria:
              <strong>1ª parte</strong> (interna, autoavaliação), <strong>2ª parte</strong> (cliente audita fornecedor) e <strong>3ª parte</strong>
              (organismo certificador independente — a única que concede o certificado ISO). Na Petrobras, fornecedores de materiais críticos
              DEVEM ter ISO 9001 para participar de licitações.
            </p>
            <p>
              Para a CESGRANRIO, atenção: a ISO 9001 NÃO garante qualidade do produto — garante que existe um SISTEMA de gestão. O certificado
              prova que a empresa tem processos padronizados, monitora indicadores e busca melhoria contínua, mas não significa &quot;zero defeitos&quot;.
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={5} variant={mv[5]} title="Análise C.E.D.E." description="ISO na prova de Suprimento." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={5} variant={mv[5]}
          video={{ videoId: "Q5", title: "Normas ISO e Certificação", duration: "14:00" }}
          resumoVisual={{ moduloNome: "M5", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Família ISO", type: "Selo", placeholderColor: "bg-blue-500/20" }, { title: "SGI", type: "Diagrama", placeholderColor: "bg-emerald-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-5")} titulo="QUIZ: Normas ISO" numero={5} variant={mv[5]} onComplete={(s) => handleModuleComplete("modulo-5", s)} />
      </TabsContent>

      <TabsContent value="modulo-6" className="mt-0 space-y-12">
        <ModuleBanner numero={6} titulo="Six Sigma e Lean Manufacturing" variant={mv[6]} descricao="DMAIC, Belts, Kaizen, os 7 desperdícios (Muda) e a integração Lean Six Sigma." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={6} variant={mv[6]} title="Precisão + Velocidade" description="Six Sigma elimina variação; Lean elimina desperdício. Juntos, são imbatíveis." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              O <strong>Six Sigma</strong> é uma metodologia estatística que busca reduzir a variabilidade de processos a no máximo
              <strong>3,4 defeitos por milhão de oportunidades (DPMO)</strong>. O &quot;sigma&quot; refere-se ao desvio-padrão: quanto mais sigmas
              entre a média e o limite de especificação, menos defeitos. O método segue o ciclo <strong>DMAIC</strong>: Define (definir o problema),
              Measure (medir o desempenho atual), Analyze (analisar causas raiz), Improve (implementar melhorias), Control (controlar para manter).
            </p>
            <p>
              A <strong>hierarquia de Belts</strong> organiza os profissionais Six Sigma: <strong>White Belt</strong> (conceitos básicos),
              <strong>Yellow Belt</strong> (participa de projetos), <strong>Green Belt</strong> (lidera projetos pequenos, dedica ~25% do tempo),
              <strong>Black Belt</strong> (lidera projetos complexos, dedicação integral) e <strong>Master Black Belt</strong> (mentor de Black Belts,
              estrategista). Na Petrobras, projetos Six Sigma são liderados por Black Belts em refinarias.
            </p>
            <p>
              O <strong>Lean Manufacturing</strong> (ou Produção Enxuta) originou-se no <strong>Sistema Toyota de Produção (STP)</strong>. Seu foco
              é eliminar os <strong>7 desperdícios (Muda)</strong>: (1) Superprodução, (2) Espera, (3) Transporte, (4) Processamento excessivo,
              (5) Estoque, (6) Movimentação desnecessária e (7) Defeitos. Ferramentas Lean: 5S, Kanban, Poka-Yoke, Kaizen, VSM (Value Stream Mapping).
            </p>
            <p>
              O <strong>Kaizen</strong> é a filosofia de melhoria contínua incremental — pequenas melhorias todos os dias. Diferente de Kaikaku
              (inovação radical). O <strong>5S</strong> (Seiri, Seiton, Seiso, Seiketsu, Shitsuke = Utilização, Organização, Limpeza, Saúde, Autodisciplina)
              é a base do Lean. Na Petrobras, programas 5S são obrigatórios em todas as unidades operacionais.
            </p>
            <p>
              O <strong>Lean Six Sigma</strong> combina o melhor dos dois mundos: usa DMAIC (Six Sigma) com foco em eliminação de desperdícios (Lean).
              Na CESGRANRIO, atenção: DMAIC é para MELHORAR processos existentes; <strong>DMADV</strong> (Define, Measure, Analyze, Design, Verify)
              é para CRIAR novos processos/produtos. Não confundir!
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={6} variant={mv[6]} title="Análise C.E.D.E." description="Six Sigma e Lean para a prova." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={6} variant={mv[6]}
          video={{ videoId: "Q6", title: "Six Sigma e Lean", duration: "16:00" }}
          resumoVisual={{ moduloNome: "M6", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "DMAIC", type: "Infográfico", placeholderColor: "bg-blue-500/20" }, { title: "7 Desperdícios", type: "Diagrama", placeholderColor: "bg-amber-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-6")} titulo="QUIZ: Six Sigma e Lean" numero={6} variant={mv[6]} onComplete={(s) => handleModuleComplete("modulo-6", s)} />
      </TabsContent>

      <TabsContent value="modulo-7" className="mt-0 space-y-12">
        <ModuleBanner numero={7} titulo="Controle Estatístico de Processo (CEP)" variant={mv[7]} descricao="Cartas de controle, LSC/LIC, variabilidade especial vs. comum e capabilidade (Cp/Cpk)." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={7} variant={mv[7]} title="O Processo sob Controle" description="CEP: detectar variação ANTES de gerar defeitos." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              O <strong>CEP (Controle Estatístico de Processo)</strong> monitora a variabilidade do processo ao longo do tempo usando
              <strong>cartas de controle</strong>. Uma carta tem: linha central (média), <strong>LSC (Limite Superior de Controle)</strong> e
              <strong>LIC (Limite Inferior de Controle)</strong>, calculados a ±3 desvios-padrão da média. Pontos dentro dos limites = processo
              sob controle. Pontos fora = causa especial que precisa ser investigada.
            </p>
            <p>
              Existem dois tipos de variação: <strong>Causas comuns</strong> (aleatórias, intrínsecas ao processo, previsíveis) e <strong>Causas
              especiais</strong> (identificáveis, externas, imprevisíveis). Um processo é &quot;sob controle estatístico&quot; quando apresenta APENAS
              causas comuns. Se há causas especiais, o processo está &quot;fora de controle&quot; e precisa de ação corretiva imediata.
            </p>
            <p>
              A <strong>capabilidade do processo</strong> é medida pelos índices <strong>Cp</strong> (potencial) e <strong>Cpk</strong> (real,
              considerando centralização). Cp = (LSE - LIE) / 6σ. Cpk ≥ 1,33 é considerado capaz. Se Cp é alto mas Cpk é baixo, o processo
              tem potencial mas está descentalizado — precisa de ajuste na média.
            </p>
            <p>
              As <strong>regras de Western Electric</strong> (sinais de descontrole) vão além de &quot;ponto fora do limite&quot;: 2 de 3 pontos
              consecutivos além de 2σ, 4 de 5 além de 1σ, 7 pontos consecutivos de um mesmo lado da média (tendência), ou padrão cíclico.
              Na Petrobras, cartas de controle monitoram octanagem, viscosidade de lubrificantes e espessura de parede de dutos.
            </p>
            <p>
              Para a CESGRANRIO: <strong>limites de controle ≠ limites de especificação</strong>. Limites de controle são calculados pelo processo
              (estatísticos). Limites de especificação são definidos pelo cliente/norma (engenharia). Um processo pode estar sob controle
              estatístico mas produzir fora da especificação (Cp baixo).
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={7} variant={mv[7]} title="Análise C.E.D.E." description="CEP e cartas de controle na prova." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={7} variant={mv[7]}
          video={{ videoId: "Q7", title: "CEP e Cartas de Controle", duration: "14:00" }}
          resumoVisual={{ moduloNome: "M7", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Carta de Controle", type: "Gráfico", placeholderColor: "bg-amber-500/20" }, { title: "Cp/Cpk", type: "Fórmula", placeholderColor: "bg-blue-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-7")} titulo="QUIZ: Controle Estatístico" numero={7} variant={mv[7]} onComplete={(s) => handleModuleComplete("modulo-7", s)} />
      </TabsContent>

      <TabsContent value="modulo-8" className="mt-0 space-y-12">
        <ModuleBanner numero={8} titulo="Auditoria e Conformidade" variant={mv[8]} descricao="Tipos de auditoria (1ª, 2ª, 3ª parte), não conformidades, ações corretivas e o ciclo de auditoria." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={8} variant={mv[8]} title="O Olho da Qualidade" description="Auditoria: verificar se o que está documentado é o que está sendo feito." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              <strong>Auditoria da qualidade</strong> é um processo sistemático, independente e documentado para verificar se o SGQ está
              funcionando conforme planejado. Não é &quot;caça às bruxas&quot; — é uma ferramenta de melhoria. O auditor verifica evidências
              objetivas (registros, documentos, observações) contra critérios definidos (norma ISO, procedimentos internos).
            </p>
            <p>
              <strong>Tipos de auditoria:</strong> (1) <strong>1ª parte</strong> — auditoria INTERNA, feita pela própria organização (autoavaliação);
              (2) <strong>2ª parte</strong> — auditoria de FORNECEDOR, feita pelo cliente no fornecedor; (3) <strong>3ª parte</strong> — auditoria
              EXTERNA, feita por organismo certificador independente (CERTIFICAÇÃO). Apenas a 3ª parte concede o selo ISO.
            </p>
            <p>
              <strong>Não conformidades</strong> são classificadas em: <strong>Maior</strong> (falha sistêmica que compromete o SGQ — impede
              certificação), <strong>Menor</strong> (falha pontual, isolada — não impede certificação se corrigida) e <strong>Observação</strong>
              (ponto de melhoria, sem falha de requisito). Após a auditoria, a organização define <strong>ações corretivas</strong> (eliminar a
              CAUSA da não conformidade) e <strong>ações preventivas</strong> (evitar que a não conformidade OCORRA).
            </p>
            <p>
              O <strong>ciclo de auditoria</strong> segue: Planejamento → Preparação (checklist) → Reunião de abertura → Execução (coleta de
              evidências) → Relatório (achados + não conformidades) → Reunião de encerramento → Acompanhamento (verificação das ações
              corretivas). Na Petrobras, auditorias internas acontecem semestralmente em cada unidade operacional.
            </p>
            <p>
              Para a CESGRANRIO: <strong>ação corretiva ≠ correção</strong>. Correção = resolver o EFEITO (apagar incêndio). Ação corretiva
              = resolver a CAUSA (instalar detector de fumaça). Ação preventiva = evitar que aconteça (eliminar material inflamável).
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={8} variant={mv[8]} title="Análise C.E.D.E." description="Auditoria e conformidade na prova." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={8} variant={mv[8]}
          video={{ videoId: "Q8", title: "Auditoria e Conformidade", duration: "12:00" }}
          resumoVisual={{ moduloNome: "M8", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Tipos de Auditoria", type: "Diagrama", placeholderColor: "bg-emerald-500/20" }, { title: "Não Conformidades", type: "Tabela", placeholderColor: "bg-rose-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-8")} titulo="QUIZ: Auditoria" numero={8} variant={mv[8]} onComplete={(s) => handleModuleComplete("modulo-8", s)} />
      </TabsContent>

      <TabsContent value="modulo-9" className="mt-0 space-y-12">
        <ModuleBanner numero={9} titulo="Qualidade na Petrobras" variant={mv[9]} descricao="SGI, SMS, especificações técnicas, qualificação de fornecedores e excelência operacional." />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={9} variant={mv[9]} title="Excelência no O&G" description="Como a maior empresa da América Latina gerencia qualidade em operações de altíssimo risco." />
          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            <p>
              A Petrobras opera em um dos ambientes mais exigentes do mundo: <strong>águas ultraprofundas (pré-sal, 2.000-7.000m)</strong>,
              refinarias com processos a alta temperatura/pressão, e dutos que cruzam milhares de km. Qualquer falha pode ter consequências
              catastróficas (explosão, vazamento ambiental, perda de vidas). Por isso, a qualidade na Petrobras vai muito além do
              &quot;satisfazer o cliente&quot; — é questão de <strong>segurança operacional</strong>.
            </p>
            <p>
              O <strong>SGI (Sistema de Gestão Integrada)</strong> da Petrobras unifica: ISO 9001 (qualidade), ISO 14001 (meio ambiente) e
              ISO 45001 (segurança). O <strong>SMS (Saúde, Meio Ambiente e Segurança)</strong> é a <strong>prioridade ZERO</strong> — superior a
              qualquer meta de produção ou financeira. &quot;Se não é seguro, não fazemos&quot; é o lema.
            </p>
            <p>
              A <strong>qualificação de fornecedores</strong> segue o CRCC (Certificado de Registro e Classificação Cadastral) via portal
              Petronect. Requisitos: ISO 9001 válida, capacidade técnica comprovada, atendimento às especificações técnicas Petrobras
              (ET), histórico de desempenho e avaliação de risco financeiro. Fornecedores são auditados periodicamente (2ª parte).
            </p>
            <p>
              As <strong>Especificações Técnicas (ET)</strong> da Petrobras são documentos internos que definem requisitos de qualidade para
              materiais e serviços. São mais rigorosas que normas ISO ou ABNT. Exemplo: uma válvula aprovada por norma ASME pode ser
              REPROVADA pela ET Petrobras se não atender requisitos adicionais de corrosão por H2S (ambiente de pré-sal).
            </p>
            <p>
              A <strong>inspeção de fabricação</strong> é realizada por inspetores Petrobras (ou terceiros acreditados) DENTRO da fábrica do
              fornecedor, acompanhando a produção em tempo real. Testes: ensaios não destrutivos (ultrassom, raio-X, líquido penetrante),
              testes hidrostáticos, análise química de materiais e testes mecânicos (tração, impacto Charpy).
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <ModuleSectionHeader index={9} variant={mv[9]} title="Análise C.E.D.E." description="Qualidade Petrobras para a prova." />
          <ContentAccordion
            slides={[
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

        <ModuleConsolidation
          index={9} variant={mv[9]}
          video={{ videoId: "Q9", title: "Qualidade na Petrobras", duration: "10:00" }}
          resumoVisual={{ moduloNome: "M9", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "SGI Petrobras", type: "Diagrama", placeholderColor: "bg-blue-500/20" }, { title: "SMS", type: "Infográfico", placeholderColor: "bg-emerald-500/20" }] }}
          maceteVisual={{
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
        <QuizInterativo questoes={mapQuizQuestions("modulo-9")} titulo="QUIZ: Qualidade na Petrobras" numero={9} variant={mv[9]} onComplete={(s) => handleModuleComplete("modulo-9", s)} />
      </TabsContent>

      <TabsContent value="modulo-10" className="mt-0 space-y-12">
        <ModuleBanner numero={10} titulo={MODULE_DEFS[9].title} variant={mv[10]} descricao="Provando seu conhecimento." />
        <AlertBox tipo="success" titulo="Simulado">Resolva 15 questões integradas para concluir este tópico.</AlertBox>
        <QuizInterativo questoes={mapQuizQuestions("modulo-10")} titulo="Simulado Final" numero={10} variant={mv[10]} onComplete={(s) => handleModuleComplete("modulo-10", s)} />
      </TabsContent>
    </AulaTemplate>
  );
}
