"use client";

import { useState } from "react";
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
  LuZap,
  LuPlay,
  LuBookOpen,
  LuImage,
  LuVolume2,
  LuShieldCheck,
  LuTruck,
  LuFileText,
  LuBrain,
  LuCircleCheck,
  LuTrendingUp,
  LuTarget,
  LuCheckCircle,
  LuBarChart3,
  LuGauge,
  LuLightbulb,
  LuAlertCircle,
  LuTriangleAlert,
  LuFileCheck,
} from "react-icons/lu";
import { GESTAO_QUALIDADE_QUIZZES } from "@/data/quizzes/gestao-qualidade-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

/**
 * AULA: Gestão da Qualidade (Suprimento) - Ultimate V4.1
 */
export default function AulaGestaoQualidadeSuprimento({
  onComplete,
  isCompleted,
  loading,
  xpGanho,
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

  // Variantes de cor pré-computadas
  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  const handleModuleComplete = (modId: string, score: number) => {
    setCompletedModules((prev) => new Set(prev).add(modId));
    if (modId === "modulo-10" && score >= 70) {
      onComplete();
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousModule = MODULE_DEFS[index - 1];
    return completedModules.has(previousModule.id);
  };

  const mapQuizQuestions = (modId: string) => {
    const quiz = GESTAO_QUALIDADE_QUIZZES[modId];
    if (!quiz) return [];
    return quiz.questions.map((q) => ({
      id: q.id,
      pergunta: q.question,
      opcoes: q.options.map((opt, i) => ({
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
      materiaCor={getModuleVariant(1)}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ==================== MÓDULO 1 ==================== */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos da Qualidade"
            descricao="Dimensões, conceitos e a importância da melhoria contínua."
            variant={mv[1]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Era da Excelência"
              description="Rich Intro: Qualidade não é luxo, é conformidade e satisfação."
              variant={mv[1]}
            />

            <RichIntro>
              <p>
                Para o Suprimento, **Qualidade** significa garantir que cada
                parafuso ou turbina atenda às especificações técnicas rigorosas
                (conformidade).
              </p>
              <p>
                Trabalhamos com o conceito de **TQM (Total Quality
                Management)**, onde a qualidade é responsabilidade de todos,
                desde o recebimento até o uso final.
              </p>
            </RichIntro>

            <AlertBox tipo="success" titulo="✅ Conceito Chave: PDCA">
              O ciclo de **Shewhart/Deming (PDCA)** é a espinha dorsal da
              melhoria contínua. Plan (Planejar), Do (Executar), Check
              (Verificar), Act (Agir/Corrigir).
            </AlertBox>

            <ContentAccordion
              corIndicador={`bg-${mv[1]}-500`}
              slides={[
                {
                  title: "As 8 Dimensões de Garvin",
                  icon: <LuCircleCheck />,
                  content: (
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Desempenho: Características básicas.</li>
                      <li>Conformidade: Grau de atendimento às normas.</li>
                      <li>Durabilidade: Vida útil do produto.</li>
                      <li>Estética: Aparência e acabamento.</li>
                      <li>Confiabilidade: Funcionamento consistente.</li>
                      <li>Serviço: Atendimento pós-venda.</li>
                    </ul>
                  ),
                },
              ]}
            />
          </section>

          <section id="consolidacao-modulo-1" className="mt-16">
            <ModuleConsolidation
              index={1}
              variant={mv[1]}
              video={{
                videoId: "QUAL123",
                title: "Resumo M1: Fundamentos",
                duration: "12:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Ciclo PDCA",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[1]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "PDCA Decorado",
                content: (
                  <p className="text-xl font-bold italic text-center">
                    "Planeja, Dança, Checa e Atua"
                  </p>
                ),
              }}
              audio={{
                audioUrl: "/audio/qualidade-m1.mp3",
                titulo: "Hino da Qualidade",
                artista: "Suno AI",
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-1")}
              titulo="QUIZ: Fundamentos da Qualidade"
              numero={1}
              variant={mv[1]}
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 2 ==================== */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Era da Qualidade"
            descricao="Deming, Juran, Crosby e a evolução do conceito de qualidade total."
            variant={mv[2]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Evolução Histórica"
              description="De inspeção a melhoria contínua: as eras da qualidade."
              variant={mv[2]}
            />

            <CardCarousel
              cards={[
                {
                  titulo: "Era da Inspeção (1900-1930)",
                  descricao: "Foco em detectar defeitos no produto final. Rejeitar ou aceitar com base em conformidade.",
                  icone: <LuShieldCheck />,
                  corFundo: `bg-${mv[2]}-500/10`,
                },
                {
                  titulo: "Era do Controle (1930-1960)",
                  descricao: "Surgem técnicas de Controle Estatístico de Processo (CEP). Qualidade de lote, não mais unitária.",
                  icone: <LuBarChart3 />,
                  corFundo: `bg-${mv[2]}-500/10`,
                },
                {
                  titulo: "Era da Garantia (1960-1980)",
                  descricao: "Qualidade deixa de ser apenas inspeção. Passa a incluir design, manufatura e suporte.",
                  icone: <LuCheckCircle />,
                  corFundo: `bg-${mv[2]}-500/10`,
                },
                {
                  titulo: "Era da Qualidade Total (1980+)",
                  descricao: "TQM: qualidade é estratégia competitiva, envolvendo toda a organização e stakeholders.",
                  icone: <LuTrendingUp />,
                  corFundo: `bg-${mv[2]}-500/10`,
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={2}
              variant={mv[2]}
              video={{
                videoId: "QUAL201",
                title: "Resumo M2: Era da Qualidade",
                duration: "10:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Timeline das Eras",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[2]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Mnemônico: I-C-G-T",
                content: (
                  <p className="text-lg font-semibold text-center">
                    <strong>I</strong>nspeção → <strong>C</strong>ontrole → <strong>G</strong>arantia → <strong>T</strong>otal
                  </p>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-2")}
              titulo="QUIZ: Era da Qualidade"
              numero={2}
              variant={mv[2]}
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 3 ==================== */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Gurus da Qualidade"
            descricao="Deming, Juran, Crosby, Ishikawa e suas contribuições para a melhoria contínua."
            variant={mv[3]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Os 4 Pilares da Qualidade"
              description="Conheça os pensadores que revolucionaram a gestão industrial."
              variant={mv[3]}
            />

            <ContentAccordion
              corIndicador={`bg-${mv[3]}-500`}
              slides={[
                {
                  title: "W. Edwards Deming (1900-1993)",
                  icon: <LuBrain />,
                  content: (
                    <div className="space-y-3">
                      <p>
                        <strong>Contribuição Principal:</strong> Os 14 pontos para gestão. PDCA (Plan-Do-Check-Act).
                      </p>
                      <AlertBox tipo="info" titulo="Célebre frase">
                        "In God we trust. All others must bring data."
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Joseph M. Juran (1904-2008)",
                  icon: <LuTarget />,
                  content: (
                    <div className="space-y-3">
                      <p>
                        <strong>Contribuição Principal:</strong> Trilogia de Juran (planejamento, controle, melhoria). Conceito de 'poucos vitais, muitos triviais'.
                      </p>
                      <AlertBox tipo="info" titulo="Ferramentas">
                        Pareto 80/20, Diagrama de Causa-Efeito.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Philip B. Crosby (1926-2001)",
                  icon: <LuCheckCircle />,
                  content: (
                    <div className="space-y-3">
                      <p>
                        <strong>Contribuição Principal:</strong> Zero Defeitos (ZD). Qualidade é conformidade com requisitos, não elegância.
                      </p>
                      <AlertBox tipo="success" titulo="Mantra">
                        "Certo na primeira vez" (Do It Right the First Time - DIRFT).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Kaoru Ishikawa (1915-1989)",
                  icon: <LuLightbulb />,
                  content: (
                    <div className="space-y-3">
                      <p>
                        <strong>Contribuição Principal:</strong> Diagrama de causa-efeito (Espinha de Peixe). Controles de qualidade com foco em processos.
                      </p>
                      <AlertBox tipo="info" titulo="Inovação">
                        Circulos de Qualidade (Quality Circles) - grupos de colaboradores resolvendo problemas.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={3}
              variant={mv[3]}
              video={{
                videoId: "QUAL301",
                title: "Resumo M3: Gurus",
                duration: "14:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Quadro Comparativo",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[3]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Identificação Rápida",
                content: (
                  <ul className="space-y-2 text-lg">
                    <li><strong>Deming:</strong> PDCA</li>
                    <li><strong>Juran:</strong> Pareto / Trilogia</li>
                    <li><strong>Crosby:</strong> Zero Defeitos</li>
                    <li><strong>Ishikawa:</strong> Espinha de Peixe</li>
                  </ul>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-3")}
              titulo="QUIZ: Gurus da Qualidade"
              numero={3}
              variant={mv[3]}
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 4 ==================== */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Ferramentas de Qualidade"
            descricao="Pareto, Ishikawa, Histogramas, Gráficos de Controle e mais."
            variant={mv[4]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="As 7 Ferramentas Clássicas"
              description="Kit essencial para resolução de problemas e melhoria contínua."
              variant={mv[4]}
            />

            <ContentAccordion
              corIndicador={`bg-${mv[4]}-500`}
              slides={[
                {
                  title: "1. Diagrama de Pareto (80/20)",
                  icon: <LuBarChart3 />,
                  content: (
                    <p>Identifica os 20% dos problemas que causam 80% dos impactos. Prioriza ação.</p>
                  ),
                },
                {
                  title: "2. Diagrama de Causa-Efeito (Ishikawa)",
                  icon: <LuTarget />,
                  content: (
                    <p>Estrutura em espinha de peixe: Material, Método, Mão de obra, Máquina, Meio-ambiente, Medição.</p>
                  ),
                },
                {
                  title: "3. Histogramas",
                  icon: <LuBarChart3 />,
                  content: (
                    <p>Visualiza distribuição de frequências. Mostra se processo está dentro de limites de controle.</p>
                  ),
                },
                {
                  title: "4. Gráficos de Controle (CEP)",
                  icon: <LuGauge />,
                  content: (
                    <p>Monitoram variações ao longo do tempo. Linha central, limites superior e inferior.</p>
                  ),
                },
                {
                  title: "5. Folha de Verificação",
                  icon: <LuFileText />,
                  content: (
                    <p>Coleta sistemática de dados de forma organizada. Base para análise posterior.</p>
                  ),
                },
                {
                  title: "6. Diagrama de Dispersão",
                  icon: <LuTrendingUp />,
                  content: (
                    <p>Mostra relação entre duas variáveis. Correlação positiva, negativa ou nula.</p>
                  ),
                },
                {
                  title: "7. Estratificação",
                  icon: <LuPlay />,
                  content: (
                    <p>Agrupa dados por categorias. Ex: defeitos por turno, por linha, por fornecedor.</p>
                  ),
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={4}
              variant={mv[4]}
              video={{
                videoId: "QUAL401",
                title: "Resumo M4: Ferramentas",
                duration: "13:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Ferramentas Visuais",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[4]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "7 Ferramentas: DGFGHDE",
                content: (
                  <p className="text-center text-lg">
                    <strong>D</strong>iagrama Pareto | <strong>G</strong>ráfico Controle | <strong>F</strong>olha | <strong>H</strong>istograma | <strong>I</strong>shikawa | <strong>D</strong>ispersão | <strong>E</strong>stratificação
                  </p>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-4")}
              titulo="QUIZ: Ferramentas de Qualidade"
              numero={4}
              variant={mv[4]}
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 5 ==================== */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Normas ISO e Certificação"
            descricao="ISO 9001, ISO 14001, ISO 45001: conformidade e melhoria contínua."
            variant={mv[5]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Normas ISO Fundamentais"
              description="Padrões internacionais para gestão de qualidade, ambiental e ocupacional."
              variant={mv[5]}
            />

            <CardCarousel
              cards={[
                {
                  titulo: "ISO 9001 (Qualidade)",
                  descricao: "Sistema de Gestão da Qualidade. Requisitos para processos, competência, rastreabilidade e melhoria contínua.",
                  icone: <LuShieldCheck />,
                  corFundo: `bg-${mv[5]}-500/10`,
                },
                {
                  titulo: "ISO 14001 (Ambiental)",
                  descricao: "Sistema de Gestão Ambiental. Controla impactos ambientais, conformidade legal e prevenção de poluição.",
                  icone: <LuFileText />,
                  corFundo: `bg-${mv[5]}-500/10`,
                },
                {
                  titulo: "ISO 45001 (Saúde e Segurança)",
                  descricao: "Sistema de Gestão de Saúde e Segurança Ocupacional (SGSSO). Identifica e controla riscos ocupacionais.",
                  icone: <LuTarget />,
                  corFundo: `bg-${mv[5]}-500/10`,
                },
                {
                  titulo: "Ciclo PDCA em Normas",
                  descricao: "Plan (Planejamento) → Do (Implementação) → Check (Verificação) → Act (Ação) — integrado em todas as ISO.",
                  icone: <LuTrendingUp />,
                  corFundo: `bg-${mv[5]}-500/10`,
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={5}
              variant={mv[5]}
              video={{
                videoId: "QUAL501",
                title: "Resumo M5: Normas ISO",
                duration: "11:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Estrutura ISO",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[5]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Trio ISO Petrobras",
                content: (
                  <ul className="space-y-2 text-center text-lg font-semibold">
                    <li>ISO <strong>9001</strong> — Qualidade</li>
                    <li>ISO <strong>14001</strong> — Ambiental</li>
                    <li>ISO <strong>45001</strong> — Segurança</li>
                  </ul>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-5")}
              titulo="QUIZ: Normas ISO"
              numero={5}
              variant={mv[5]}
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 6 ==================== */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Six Sigma e Lean"
            descricao="Metodologias de redução de variação e eliminação de desperdícios."
            variant={mv[6]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Six Sigma: Excelência Estatística"
              description="Reduz variação a ponto de produzir apenas 3,4 defeitos por milhão."
              variant={mv[6]}
            />

            <ContentAccordion
              corIndicador={`bg-${mv[6]}-500`}
              slides={[
                {
                  title: "Metodologia: DMAIC",
                  icon: <LuBrain />,
                  content: (
                    <ul className="space-y-2">
                      <li><strong>D - Define:</strong> Definir problema e objetivos.</li>
                      <li><strong>M - Measure:</strong> Medir desempenho atual.</li>
                      <li><strong>A - Analyze:</strong> Analisar raízes de variação.</li>
                      <li><strong>I - Improve:</strong> Implementar melhorias.</li>
                      <li><strong>C - Control:</strong> Controlar e sustenter ganhos.</li>
                    </ul>
                  ),
                },
                {
                  title: "Lean: Eliminar Desperdício",
                  icon: <LuZap />,
                  content: (
                    <div className="space-y-3">
                      <p><strong>8 Tipos de Desperdício (Muda):</strong></p>
                      <ul className="space-y-1 list-disc ml-6">
                        <li>Defeitos / Retrabalho</li>
                        <li>Superprodução</li>
                        <li>Esperas</li>
                        <li>Transporte desnecessário</li>
                        <li>Processamento inadequado</li>
                        <li>Estoque em excesso</li>
                        <li>Movimento desnecessário</li>
                        <li>Talentos não aproveitados</li>
                      </ul>
                    </div>
                  ),
                },
                {
                  title: "Lean Six Sigma",
                  icon: <LuTarget />,
                  content: (
                    <p>Combinação: Six Sigma reduz <strong>variação</strong> (qualidade) + Lean elimina <strong>desperdício</strong> (eficiência). Resultado: processos ágeis e precisos.</p>
                  ),
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={6}
              variant={mv[6]}
              video={{
                videoId: "QUAL601",
                title: "Resumo M6: Six Sigma e Lean",
                duration: "12:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 6",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "DMAIC e Muda",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[6]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Memorização Fácil",
                content: (
                  <p className="text-center text-lg font-semibold">
                    Sigma = <strong>Precisão</strong> | Lean = <strong>Eficiência</strong>
                  </p>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-6")}
              titulo="QUIZ: Six Sigma e Lean"
              numero={6}
              variant={mv[6]}
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 7 ==================== */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Controle Estatístico de Processos (CEP)"
            descricao="Monitoramento contínuo com gráficos de controle e capacidade de processo."
            variant={mv[7]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="CEP: Fundamentos"
              description="Diferenciar variação comum de causa especial."
              variant={mv[7]}
            />

            <ContentAccordion
              corIndicador={`bg-${mv[7]}-500`}
              slides={[
                {
                  title: "Variação Comum (Ruído)",
                  icon: <LuGauge />,
                  content: (
                    <p>Inerente ao processo. Flutuações naturais dentro de limites de controle (±3σ). Não requer ação imediata.</p>
                  ),
                },
                {
                  title: "Variação por Causa Especial",
                  icon: <LuAlertCircle />,
                  content: (
                    <p>Anomalia externa: máquina travada, lote de matéria-prima defeituosa, erro de operador. <strong>Requer intervenção.</strong></p>
                  ),
                },
                {
                  title: "Gráfico de Controle X-R",
                  icon: <LuBarChart3 />,
                  content: (
                    <div className="space-y-3">
                      <p><strong>X:</strong> Valores médios dos subgrupos.</p>
                      <p><strong>R:</strong> Amplitude (Range) dos subgrupos = máximo - mínimo.</p>
                      <p>Detecta deslocamentos de média e mudanças de variabilidade.</p>
                    </div>
                  ),
                },
                {
                  title: "Índices de Capacidade",
                  icon: <LuTarget />,
                  content: (
                    <div className="space-y-3">
                      <p><strong>Cp:</strong> Compara tolerância (LSE - LIE) com a variação do processo (6σ).</p>
                      <p><strong>Cpk:</strong> Leva em conta a centralização do processo (mais rigoroso).</p>
                      <p><strong>Meta Petrobras:</strong> Cpk ≥ 1,33 (ou 1,67 para críticos).</p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={7}
              variant={mv[7]}
              video={{
                videoId: "QUAL701",
                title: "Resumo M7: CEP",
                duration: "11:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 7",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Gráficos de Controle",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[7]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Diferencial Chave",
                content: (
                  <p className="text-center text-lg">
                    <strong>Variação Comum:</strong> Deixa passar | <strong>Causa Especial:</strong> Para e investiga!
                  </p>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-7")}
              titulo="QUIZ: Controle Estatístico"
              numero={7}
              variant={mv[7]}
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 8 ==================== */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Auditoria e Conformidade"
            descricao="Auditorias internas, conformidade legal e rastreabilidade em processos."
            variant={mv[8]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Auditoria de Qualidade"
              description="Verificação sistemática de conformidade com padrões internos e normas."
              variant={mv[8]}
            />

            <ContentAccordion
              corIndicador={`bg-${mv[8]}-500`}
              slides={[
                {
                  title: "Tipos de Auditoria",
                  icon: <LuFileCheck />,
                  content: (
                    <ul className="space-y-2">
                      <li><strong>Auditoria Interna:</strong> Conduzida por auditores da própria empresa. Foco em conformidade com padrões internos.</li>
                      <li><strong>Auditoria de Segunda Parte:</strong> Fornecedor auditado por cliente.</li>
                      <li><strong>Auditoria de Terceira Parte:</strong> Organismo certificador independente (ex: DNV, TÜV).</li>
                    </ul>
                  ),
                },
                {
                  title: "Processo de Auditoria",
                  icon: <LuPlay />,
                  content: (
                    <div className="space-y-2">
                      <p><strong>1. Planejamento:</strong> Escopo, datas, checklist.</p>
                      <p><strong>2. Reunião de Abertura:</strong> Apresentação dos auditores e agenda.</p>
                      <p><strong>3. Entrevistas & Observação:</strong> Coleta de evidências.</p>
                      <p><strong>4. Elaboração de Relatório:</strong> Não-conformidades (NC) e oportunidades de melhoria.</p>
                      <p><strong>5. Plano de Ação Corretiva (PAC):</strong> Resposta da auditada.</p>
                    </div>
                  ),
                },
                {
                  title: "Não-Conformidades",
                  icon: <LuTriangleAlert />,
                  content: (
                    <div className="space-y-3">
                      <p><strong>NC Maior:</strong> Falta total de controle de um requisito (risco crítico).</p>
                      <p><strong>NC Menor:</strong> Falha isolada em cumprimento de requisito (desvio).</p>
                      <p><strong>Observação:</strong> Oportunidade de melhoria (não é não-conformidade).</p>
                      <AlertBox tipo="info" titulo="Meta">
                        Zero NC Maiores é requisito para certificação.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={8}
              variant={mv[8]}
              video={{
                videoId: "QUAL801",
                title: "Resumo M8: Auditoria",
                duration: "10:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 8",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Ciclo Auditoria",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[8]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Tipos Auditoria: 1-2-3",
                content: (
                  <p className="text-center text-lg font-semibold">
                    <strong>1ª Parte:</strong> Interna | <strong>2ª Parte:</strong> Fornecedor | <strong>3ª Parte:</strong> Certificadora
                  </p>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-8")}
              titulo="QUIZ: Auditoria e Conformidade"
              numero={8}
              variant={mv[8]}
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 9 ==================== */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Qualidade na Petrobras"
            descricao="Aplicações práticas: Pré-sal, Refino, Segurança operacional e Zero acidentes."
            variant={mv[9]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Contexto Real Petrobras"
              description="Como a gestão de qualidade funciona nas operações do upstream, downstream e logística."
              variant={mv[9]}
            />

            <CardCarousel
              cards={[
                {
                  titulo: "Upstream: Exploração Pré-sal",
                  descricao: "Qualidade crítica em equipamentos submarinos. Um vazamento de óleo = catástrofe ambiental. Certificação 100% obrigatória.",
                  icone: <LuShieldCheck />,
                  corFundo: `bg-${mv[9]}-500/10`,
                },
                {
                  titulo: "Downstream: Refinarias",
                  descricao: "Qualidade de combustível (gasolina, diesel, querosene). Conformidade com ANP. Processos 24/7, zero parada.",
                  icone: <LuTarget />,
                  corFundo: `bg-${mv[9]}-500/10`,
                },
                {
                  titulo: "Logística: Transporte",
                  descricao: "Qualidade de entrega: pontualidade, segurança da carga, rastreabilidade GPS. TQM em toda cadeia.",
                  icone: <LuTruck />,
                  corFundo: `bg-${mv[9]}-500/10`,
                },
                {
                  titulo: "Saúde, Segurança e Meio Ambiente (SSMA)",
                  descricao: "ISO 45001 integrada. Zero acidentes é meta estratégica. Cada colaborador é auditor de sua própria segurança.",
                  icone: <LuZap />,
                  corFundo: `bg-${mv[9]}-500/10`,
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={9}
              variant={mv[9]}
              video={{
                videoId: "QUAL901",
                title: "Resumo M9: Petrobras",
                duration: "12:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 9",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Operações Petrobras",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[9]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Pilares Operacionais",
                content: (
                  <ul className="space-y-2 text-center text-lg font-semibold">
                    <li>Upstream = Qualidade Crítica</li>
                    <li>Downstream = Conformidade ANP</li>
                    <li>Logística = Rastreabilidade</li>
                    <li>SSMA = Zero Acidentes</li>
                  </ul>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-9")}
              titulo="QUIZ: Qualidade na Petrobras"
              numero={9}
              variant={mv[9]}
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ==================== MÓDULO 10 (SIMULADO MESTRE) ==================== */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre"
            descricao="Avaliação consolidada: 10-15 questões integradas de toda a aula."
            variant={mv[10]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Preparação Final"
              description="Consolidação de todos os módulos em uma avaliação única e integrada."
              variant={mv[10]}
            />

            <AlertBox tipo="success" titulo="🎯 Objetivo">
              Atingir <strong>70% acerto mínimo</strong> para considerar a aula concluída. Isso indica domínio dos conteúdos estratégicos e aplicação prática.
            </AlertBox>

            <CardCarousel
              cards={[
                {
                  titulo: "Revisão Rápida",
                  descricao: "Certifique-se de que você domina: PDCA, Gurus, 7 Ferramentas, ISO, Six Sigma, CEP, Auditoria e contexto Petrobras.",
                  icone: <LuBookOpen />,
                  corFundo: `bg-${mv[10]}-500/10`,
                },
                {
                  titulo: "Dicas Cesgranrio",
                  descricao: "Confunda-se com 'Qualidade vs Produtividade'? Lembre: Qualidade é conformidade + satisfação. Não é apenas quantidade.",
                  icone: <LuLightbulb />,
                  corFundo: `bg-${mv[10]}-500/10`,
                },
                {
                  titulo: "Contexto Prático",
                  descricao: "Pense sempre em cenários reais: refinaria em operação, plataforma pré-sal, transporte de óleo. Como a qualidade impacta?",
                  icone: <LuTarget />,
                  corFundo: `bg-${mv[10]}-500/10`,
                },
                {
                  titulo: "Sua Jornada",
                  descricao: "Você percorreu desde Fundamentos até aplicações práticas. Agora é hora de consolidar tudo em uma prova integrada.",
                  icone: <LuTrendingUp />,
                  corFundo: `bg-${mv[10]}-500/10`,
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <ModuleConsolidation
              index={10}
              variant={mv[10]}
              video={{
                videoId: "QUAL1001",
                title: "Dicas Finais Simulado",
                duration: "8:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Mapa Mental Completo",
                    type: "Infográfico",
                    placeholderColor: `bg-${mv[10]}-500/20`,
                  },
                ],
              }}
              maceteVisual={{
                title: "Mantra Final",
                content: (
                  <p className="text-center text-xl font-bold italic">
                    "Qualidade é responsabilidade de todos. PDCA sempre. Dados, nunca achismo."
                  </p>
                ),
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-10")}
              titulo="SIMULADO MESTRE: Gestão da Qualidade"
              numero={10}
              variant={mv[10]}
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
