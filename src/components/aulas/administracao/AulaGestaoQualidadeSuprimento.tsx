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
        <ModuleBanner numero={3} titulo={MODULE_DEFS[2].title} variant={mv[3]} descricao="Os pais da gestão moderna." />
        <ModuleConsolidation
          index={3} variant={mv[3]}
          video={{ videoId: "Q3", title: "Gurus", duration: "12:30" }}
          resumoVisual={{ moduloNome: "M3", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Gurus", type: "Tabela", placeholderColor: "bg-emerald-100" }] }}
          maceteVisual={{ title: "Gurus", content: "Deming(PDCA), Juran(80/20), Crosby(ZD), Ishikawa(Causa-Efeito)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 3", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-3")} titulo="Quiz 3" numero={3} variant={mv[3]} onComplete={(s) => handleModuleComplete("modulo-3", s)} />
      </TabsContent>

      <TabsContent value="modulo-4" className="mt-0 space-y-12">
        <ModuleBanner numero={4} titulo={MODULE_DEFS[3].title} variant={mv[4]} descricao="Ishikawa, Pareto, Folhas." />
        <ModuleConsolidation
          index={4} variant={mv[4]}
          video={{ videoId: "Q4", title: "Ferramentas", duration: "18:00" }}
          resumoVisual={{ moduloNome: "M4", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "7 Ferramentas", type: "Dashboard", placeholderColor: "bg-rose-100" }] }}
          maceteVisual={{ title: "Ishikawa", content: "As 6 causas: Mão de Obra, Meio Ambiente, Máquina, Método, Material, Medida." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 4", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-4")} titulo="Quiz 4" numero={4} variant={mv[4]} onComplete={(s) => handleModuleComplete("modulo-4", s)} />
      </TabsContent>

      <TabsContent value="modulo-5" className="mt-0 space-y-12">
        <ModuleBanner numero={5} titulo={MODULE_DEFS[4].title} variant={mv[5]} descricao="ISO 9001, 14001, 45001." />
        <ModuleConsolidation
          index={5} variant={mv[5]}
          video={{ videoId: "Q5", title: "ISO", duration: "11:20" }}
          resumoVisual={{ moduloNome: "M5", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Normas", type: "Selo", placeholderColor: "bg-violet-100" }] }}
          maceteVisual={{ title: "ISO", content: "900x=Qualidade, 1400x=Ambiental, 4500x=Segurança." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 5", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-5")} titulo="Quiz 5" numero={5} variant={mv[5]} onComplete={(s) => handleModuleComplete("modulo-5", s)} />
      </TabsContent>

      <TabsContent value="modulo-6" className="mt-0 space-y-12">
        <ModuleBanner numero={6} titulo={MODULE_DEFS[5].title} variant={mv[6]} descricao="Combinação de agilidade e precisão." />
        <ModuleConsolidation
          index={6} variant={mv[6]}
          video={{ videoId: "Q6", title: "Lean Sigma", duration: "09:40" }}
          resumoVisual={{ moduloNome: "M6", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "DMAIC", type: "Infográfico", placeholderColor: "bg-blue-900" }] }}
          maceteVisual={{ title: "DMAIC", content: "D-M-A-I-C: Define, Measure, Analyze, Improve, Control." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 6", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-6")} titulo="Quiz 6" numero={6} variant={mv[6]} onComplete={(s) => handleModuleComplete("modulo-6", s)} />
      </TabsContent>

      <TabsContent value="modulo-7" className="mt-0 space-y-12">
        <ModuleBanner numero={7} titulo={MODULE_DEFS[6].title} variant={mv[7]} descricao="Gráficos de Controle." />
        <ModuleConsolidation
          index={7} variant={mv[7]}
          video={{ videoId: "Q7", title: "CEP", duration: "14:10" }}
          resumoVisual={{ moduloNome: "M7", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Controle", type: "Gráfico", placeholderColor: "bg-amber-900" }] }}
          maceteVisual={{ title: "CEP", content: "Limites: Superior (LSC) e Inferior (LIC)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 7", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-7")} titulo="Quiz 7" numero={7} variant={mv[7]} onComplete={(s) => handleModuleComplete("modulo-7", s)} />
      </TabsContent>

      <TabsContent value="modulo-8" className="mt-0 space-y-12">
        <ModuleBanner numero={8} titulo={MODULE_DEFS[7].title} variant={mv[8]} descricao="Padrões de conformidade." />
        <ModuleConsolidation
          index={8} variant={mv[8]}
          video={{ videoId: "Q8", title: "Auditoria", duration: "08:15" }}
          resumoVisual={{ moduloNome: "M8", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Auditoria", type: "Capa", placeholderColor: "bg-emerald-900" }] }}
          maceteVisual={{ title: "Segunda Parte", content: "Auditoria de 1ª parte(autohavaliação), 2ª(fornecedor), 3ª(certificadora)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 8", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-8")} titulo="Quiz 8" numero={8} variant={mv[8]} onComplete={(s) => handleModuleComplete("modulo-8", s)} />
      </TabsContent>

      <TabsContent value="modulo-9" className="mt-0 space-y-12">
        <ModuleBanner numero={9} titulo={MODULE_DEFS[8].title} variant={mv[9]} descricao="Excelência em SMS e Conformidade." />
        <ModuleConsolidation
          index={9} variant={mv[9]}
          video={{ videoId: "Q9", title: "Petrobras", duration: "07:20" }}
          resumoVisual={{ moduloNome: "M9", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Plataforma", type: "Cenas", placeholderColor: "bg-rose-900" }] }}
          maceteVisual={{ title: "Petrobras", content: "Especificação é lei. SMS é prioridade zero." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 9", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-9")} titulo="Quiz 9" numero={9} variant={mv[9]} onComplete={(s) => handleModuleComplete("modulo-9", s)} />
      </TabsContent>

      <TabsContent value="modulo-10" className="mt-0 space-y-12">
        <ModuleBanner numero={10} titulo={MODULE_DEFS[9].title} variant={mv[10]} descricao="Provando seu conhecimento." />
        <AlertBox tipo="success" titulo="Simulado">Resolva 15 questões integradas para concluir este tópico.</AlertBox>
        <QuizInterativo questoes={mapQuizQuestions("modulo-10")} titulo="Simulado Final" numero={10} variant={mv[10]} onComplete={(s) => handleModuleComplete("modulo-10", s)} />
      </TabsContent>
    </AulaTemplate>
  );
}
