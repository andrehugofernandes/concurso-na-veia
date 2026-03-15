"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
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
} from "../shared";
import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuUsers,
  LuTrendingUp,
  LuShield,
  LuCheckCircle,
  LuBarChart3,
  LuBriefcase,
  LuAward,
} from "react-icons/lu";
import { getModuleVariant } from "@/lib/moduleColors";
import { QUIZ_GESTAO_PESSOAS } from "@/data/quizzes/gestao-pessoas-quizzes";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Fundamentos de Gestão de Pessoas",
  },
  { id: "modulo-2", label: "Módulo 2", title: "Recrutamento e Seleção" },
  { id: "modulo-3", label: "Módulo 3", title: "Admissão e Integração" },
  {
    id: "modulo-4",
    label: "Módulo 4",
    title: "Desenvolvimento e Capacitação",
  },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Avaliação de Desempenho",
  },
  {
    id: "modulo-6",
    label: "Módulo 6",
    title: "Gestão Salarial e Benefícios",
  },
  {
    id: "modulo-7",
    label: "Módulo 7",
    title: "Relações Trabalhistas",
  },
  { id: "modulo-8", label: "Módulo 8", title: "Gestão de Conflitos" },
  {
    id: "modulo-9",
    label: "Módulo 9",
    title: "Gestão de Pessoas na Petrobras",
  },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaGestãoDePessoas(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  // Quiz states
  const quizM1 = QUIZ_GESTAO_PESSOAS["modulo-1"];
  const quizM2 = QUIZ_GESTAO_PESSOAS["modulo-2"];
  const quizM3 = QUIZ_GESTAO_PESSOAS["modulo-3"];
  const quizM4 = QUIZ_GESTAO_PESSOAS["modulo-4"];
  const quizM5 = QUIZ_GESTAO_PESSOAS["modulo-5"];
  const quizM6 = QUIZ_GESTAO_PESSOAS["modulo-6"];
  const quizM7 = QUIZ_GESTAO_PESSOAS["modulo-7"];
  const quizM8 = QUIZ_GESTAO_PESSOAS["modulo-8"];
  const quizM9 = QUIZ_GESTAO_PESSOAS["modulo-9"];
  const quizM10 = QUIZ_GESTAO_PESSOAS["modulo-10"];

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      setCompletedModules((prev) => new Set([...prev, moduleId]));
      props.onUpdateProgress?.("aula-gestao-pessoas", moduleId, true);
    }
  };

  const isModuleUnlocked = (moduleId: string) => {
    const moduleIndex = MODULE_DEFS.findIndex((m) => m.id === moduleId);
    if (moduleIndex === 0) return true;
    const previousModule = MODULE_DEFS[moduleIndex - 1];
    return completedModules.has(previousModule.id);
  };

  // ==================== MÓDULO 1 ====================
  const renderModulo1 = () => {
    const variant = getModuleVariant(1);
    return (
      <AulaTemplate
        moduleNumber={1}
        title="Fundamentos de Gestão de Pessoas"
        description="Conceitos essenciais de gestão de pessoas, evolução histórica e importância estratégica na organização."
        currentProgress={props.progress?.[0] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-1")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Conceito de GP",
                description:
                  "Gestão de Pessoas como processo estratégico de integração, desenvolvimento e retenção de talentos.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Evolução Histórica",
                description:
                  "Transição de Administração de Pessoal → Gestão de RH → Gestão de Pessoas estratégica.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Pilares Estratégicos",
                description:
                  "Atração, Desenvolvimento, Retenção e Engajamento como fundamentos da estratégia de GP.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Papel na Organização",
                description:
                  "GP como parceira do negócio, geradora de vantagem competitiva sustentável.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Conceitos Fundamentais"
            icon={LuBookOpen}
          />
          <ContentAccordion
            items={[
              {
                title: "O que é Gestão de Pessoas?",
                content:
                  "É o conjunto de práticas e processos que visam atrair, integrar, desenvolver e reter talentos em uma organização, alinhando-os aos objetivos estratégicos.",
              },
              {
                title: "Evolução Histórica",
                content:
                  "Período 1 (até anos 50): Administração de Pessoal focada em folha de pagamento. Período 2 (50-80): Gestão de RH com políticas formais. Período 3 (80+): Gestão de Pessoas estratégica integrada ao negócio.",
              },
              {
                title: "Dimensões da Gestão de Pessoas",
                content:
                  "Individual: desenvolvimento de competências. Grupal: engajamento de times. Organizacional: alinhamento com estratégia corporativa.",
              },
              {
                title: "Competências Críticas",
                content:
                  "Atração (employer branding, recrutamento), Integração (onboarding, cultura), Desenvolvimento (treinamento, carreira), Retenção (benefícios, clima).",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Exemplos Práticos"
            icon={LuLightbulb}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📌 Petrobras - Programa de Trainees
              </h4>
              <p className="text-sm text-muted-foreground">
                Exemplo de atração e desenvolvimento: programa estruturado que
                atrai jovens talentos, oferece mentoring, rotações por áreas e
                plano de carreira claro. Resultado: retenção de 85% dos trainees
                após 3 anos.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🎯 Petrobras - Engajamento em Operações
              </h4>
              <p className="text-sm text-muted-foreground">
                Uso de pesquisas clima periódicas e feedback em tempo real em
                plataformas colaborativas. Identificação de pontos de melhoria
                em qualidade de vida no trabalho em refinarias e plataformas.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                💼 Petrobras - Sucessão de Liderança
              </h4>
              <p className="text-sm text-muted-foreground">
                Pipeline de talentos para posições críticas, desenvolvimento
                estruturado de líderes sênior, garantindo continuidade estratégica
                em cargos executivos e gerências.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM1}
            moduleId="modulo-1"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 2 ====================
  const renderModulo2 = () => {
    const variant = getModuleVariant(2);
    return (
      <AulaTemplate
        moduleNumber={2}
        title="Recrutamento e Seleção"
        description="Processos e técnicas para atrair e selecionar os melhores talentos para a organização."
        currentProgress={props.progress?.[1] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-2")}
        isLocked={!isModuleUnlocked("modulo-2")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Planejamento de Recrutamento",
                description:
                  "Análise de necessidades, definição de perfis, orçamento e cronograma do processo seletivo.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Fontes e Técnicas de Recrutamento",
                description:
                  "Recrutamento interno, externo, agências, redes, plataformas digitais e employer branding.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Técnicas de Seleção",
                description:
                  "Entrevistas comportamentais, dinâmicas de grupo, testes psicométricos, cases e provas práticas.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Decisão e Oferta",
                description:
                  "Matriz de avaliação, feedback aos candidatos, negociação e formalização da contratação.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Processos de Atração e Seleção"
            icon={LuUsers}
          />
          <ContentAccordion
            items={[
              {
                title: "Planejamento Estratégico do Recrutamento",
                content:
                  "Envolve análise de demandas futuras, definição de competências essenciais, orçamento e timeline. Deve estar alinhado com o plano de negócios da organização.",
              },
              {
                title: "Recrutamento Interno vs Externo",
                content:
                  "Interno: aproveita talentos existentes, reduz custos, desenvolve carreiras. Externo: traz novos conhecimentos, expande o mercado de talentos. Estratégia mista é mais eficaz.",
              },
              {
                title: "Employer Branding",
                content:
                  "Construção da reputação da empresa como empregadora. Inclui presença em redes, cases de sucesso, programa de indicação e relacionamento com universidades.",
              },
              {
                title: "Entrevista Comportamental",
                content:
                  "Técnica baseada em perguntas sobre situações passadas para prever comportamento futuro. Identifica competências, valores e fit cultural.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Casos de Recrutamento"
            icon={LuTrendingUp}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🎓 Petrobras - Programa UniversitariO
              </h4>
              <p className="text-sm text-muted-foreground">
                Recrutamento estruturado em universidades federais e privadas,
                seleção de 50+ engenheiros por ano, desenvolvimento de talentos
                alinhado com necessidades operacionais.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                💡 Petrobras - Recrutamento em Rede
              </h4>
              <p className="text-sm text-muted-foreground">
                Programa de indicação com bônus, LinkedIn como canal principal,
                parcerias com headhunters para posições sênior. Alta qualidade
                de candidatos pré-selecionados.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🔍 Petrobras - Processo Seletivo Rigoroso
              </h4>
              <p className="text-sm text-muted-foreground">
                4 fases: prova técnica, entrevista comportamental com gerente,
                dinâmica em grupo, avaliação psicométrica. Tempo total: 6 semanas.
                Taxa de aprovação: 2-5%.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM2}
            moduleId="modulo-2"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 3 ====================
  const renderModulo3 = () => {
    const variant = getModuleVariant(3);
    return (
      <AulaTemplate
        moduleNumber={3}
        title="Admissão e Integração"
        description="Processos de onboarding e integração de novos colaboradores na cultura organizacional."
        currentProgress={props.progress?.[2] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-3")}
        isLocked={!isModuleUnlocked("modulo-3")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Procedimentos Admissionais",
                description:
                  "Documentação, registro em órgãos públicos, sistema de informações do colaborador.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Onboarding Estruturado",
                description:
                  "Plano de integração, apresentação de pessoas, processos, sistemas e cultura.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Integração Cultural",
                description:
                  "Alinhamento com valores, missão e visão; relacionamento com equipe.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Período Probatório",
                description:
                  "Avaliação de aptidão, desempenho e aderência durante os primeiros 90 dias.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Processos de Admissão e Integração"
            icon={LuCheckCircle}
          />
          <ContentAccordion
            items={[
              {
                title: "Checklist de Admissão",
                content:
                  "Documentação (RG, CPF, Carteira de trabalho), registro em CAGED, filiação à previdência, emissão de crachá, abertura de conta bancária para depósito.",
              },
              {
                title: "Programa de Onboarding",
                content:
                  "Deve cobrir: informações gerais da empresa, apresentação de gestores e equipe, sistemas e ferramentas de trabalho, políticas e benefícios, tour nas instalações.",
              },
              {
                title: "Integração Social",
                content:
                  "Almoço de boas-vindas, mentor designado, buddy para os primeiros dias, atividades para conhecer colegas e a cultura.",
              },
              {
                title: "Avaliação do Período Probatório",
                content:
                  "Feedback contínuo nos primeiros 30, 60 e 90 dias. Avaliação de desempenho, comportamento e fit. Decisão de confirmação ou desligamento.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Casos de Integração"
            icon={LuBriefcase}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🎯 Petrobras - Onboarding de Engenheiros
              </h4>
              <p className="text-sm text-muted-foreground">
                Programa de 6 meses com rotações em 3 áreas, mentoria de senior
                eng, treinamentos técnicos, certificações de segurança operacional.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ✨ Petrobras - Integração de Lideranças
              </h4>
              <p className="text-sm text-muted-foreground">
                Programa de 90 dias: mapeamento de stakeholders, alinhamento
                estratégico, conhecimento de processos chave, relacionamento com
                diretoria.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🔧 Petrobras - Onboarding Operacional
              </h4>
              <p className="text-sm text-muted-foreground">
                Para posições em refinarias e plataformas: treinamento de
                segurança intensivo, familiarização com equipamentos, código de
                conduta em ambientes críticos.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM3}
            moduleId="modulo-3"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 4 ====================
  const renderModulo4 = () => {
    const variant = getModuleVariant(4);
    return (
      <AulaTemplate
        moduleNumber={4}
        title="Desenvolvimento e Capacitação"
        description="Estratégias de desenvolvimento profissional, treinamento e plano de carreira."
        currentProgress={props.progress?.[3] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-4")}
        isLocked={!isModuleUnlocked("modulo-4")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Mapeamento de Competências",
                description:
                  "Identificação de gaps entre competências atuais e necessárias para o negócio.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Plano de Desenvolvimento Individual",
                description:
                  "PDI com objetivos, ações de capacitação e timeline de acompanhamento.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Modalidades de Treinamento",
                description:
                  "Presencial, online, on-the-job, coaching, mentoring e universidades corporativas.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Plano de Carreira",
                description:
                  "Trajetória esperada, promoções, mobilidade interna e progressão profissional.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Desenvolvimento de Talentos"
            icon={LuTrendingUp}
          />
          <ContentAccordion
            items={[
              {
                title: "Análise de Competências",
                content:
                  "Mapeamento de competências técnicas e comportamentais. Comparação entre perfil do colaborador e exigências da posição. Identificação de oportunidades de crescimento.",
              },
              {
                title: "Plano de Desenvolvimento Individual (PDI)",
                content:
                  "Documento que define objetivos de desenvolvimento, ações (cursos, projetos, mentorias), responsáveis, prazos e indicadores de sucesso.",
              },
              {
                title: "Metodologias de Aprendizagem",
                content:
                  "70-20-10: 70% aprendizagem no trabalho, 20% relacionamento/mentoring, 10% educação formal. Blended learning combina múltiplas modalidades.",
              },
              {
                title: "Sucessão e Plano de Carreira",
                content:
                  "Pipeline de talentos para posições críticas. Caminhos de carreira bem definidos (especialista ou gerencial). Transparência sobre oportunidades.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Exemplos de Desenvolvimento"
            icon={LuAward}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🎓 Petrobras - Universidade Corporativa
              </h4>
              <p className="text-sm text-muted-foreground">
                Oferece centenas de cursos em leadership, técnico, compliance e
                bem-estar. Parceria com universidades top. 60+ horas de
                treinamento por colaborador/ano.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🚀 Petrobras - Programa de Liderança
              </h4>
              <p className="text-sm text-muted-foreground">
                Desenvolvimento de gestores: coaching executivo, programa de
                mentorias, delegação de projetos estratégicos, acesso a network
                externo.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                💡 Petrobras - Mobilidade Interna
              </h4>
              <p className="text-sm text-muted-foreground">
                Oportunidades de rotação entre áreas, centros de custo diferentes,
                inclusive para o exterior. Desenvolve visão sistêmica e networking.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM4}
            moduleId="modulo-4"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 5 ====================
  const renderModulo5 = () => {
    const variant = getModuleVariant(5);
    return (
      <AulaTemplate
        moduleNumber={5}
        title="Avaliação de Desempenho"
        description="Sistemas de avaliação, feedback e gestão de desempenho para o desenvolvimento contínuo."
        currentProgress={props.progress?.[4] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-5")}
        isLocked={!isModuleUnlocked("modulo-5")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Objetivos da Avaliação",
                description:
                  "Validar desempenho, identificar potencial, orientar desenvolvimento e feedback.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Métodos de Avaliação",
                description:
                  "Avaliação 360°, MBO, avaliação em cascata, avaliação de competências.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Gestão de Desempenho",
                description:
                  "Ciclo contínuo: planejamento, coaching, feedback e avaliação formal.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Consequências da Avaliação",
                description:
                  "Promoção, aumento salarial, desenvolvimento, plano de melhoria ou desligamento.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Processos de Avaliação"
            icon={LuBarChart3}
          />
          <ContentAccordion
            items={[
              {
                title: "Objetivos da Avaliação de Desempenho",
                content:
                  "Administrativos: definir aumentos e promoções. De desenvolvimento: identificar gaps e orientar PDI. Estratégicos: alinhar desempenho com objetivos organizacionais.",
              },
              {
                title: "Avaliação 360°",
                content:
                  "Feedback de gerente, colegas, subordinados e autoavaliação. Visa avaliar comportamentos, liderança e competências. Mais completa e justa que avaliação unilateral.",
              },
              {
                title: "Gestão de Desempenho Contínua",
                content:
                  "One-on-ones mensais, feedback informal, check-ins. Não apenas avaliação anual. Identificação rápida de problemas e oportunidades.",
              },
              {
                title: "Curva de Distribuição Normal",
                content:
                  "Alguns sistemas forçam distribuição (10% excelente, 80% bom, 10% insuficiente). Controverso: pode desmotivar. Modelos modernos preferem avaliação sem forçar distribuição.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Exemplos de Avaliação"
            icon={LuShield}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📊 Petrobras - Avaliação por Competências
              </h4>
              <p className="text-sm text-muted-foreground">
                Avaliação de 5 competências core: Orientação ao cliente,
                Trabalho em equipe, Inovação, Integridade, Liderança (para
                gestores). Escala 1-5 com descritores.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🎯 Petrobras - Ciclo de Feedback
              </h4>
              <p className="text-sm text-muted-foreground">
                Feedback contínuo via plataforma de performance. One-on-ones
                mensais. Feedback 360° semestral. Planejamento de desenvolvimento
                anual com gerente.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ⚡ Petrobras - Gestão de Alto Desempenho
              </h4>
              <p className="text-sm text-muted-foreground">
                Identificação de high performers e high potentials. Programas
                especiais de desenvolvimento, atribuição de projetos desafiadores,
                remuneração diferenciada.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM5}
            moduleId="modulo-5"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 6 ====================
  const renderModulo6 = () => {
    const variant = getModuleVariant(6);
    return (
      <AulaTemplate
        moduleNumber={6}
        title="Gestão Salarial e Benefícios"
        description="Políticas de remuneração, estrutura salarial e programas de benefícios."
        currentProgress={props.progress?.[5] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-6")}
        isLocked={!isModuleUnlocked("modulo-6")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Política Remuneratória",
                description:
                  "Princípios, competitividade de mercado, equidade interna.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Estrutura Salarial",
                description:
                  "Faixas, bandas, progression, amplitude e diferenciação por cargo.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Remuneração Variável",
                description:
                  "Bônus, PLR, participação em lucros, comissões e incentivos.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Programas de Benefícios",
                description:
                  "Saúde, alimentação, transporte, previdência, seguros e programas de bem-estar.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Remuneração e Benefícios"
            icon={LuDollarSign}
          />
          <ContentAccordion
            items={[
              {
                title: "Política de Remuneração",
                content:
                  "Define como a empresa remunera: market-plus (acima do mercado), market-match (alinhado), market-lag (abaixo). Deve estar alinhada com estratégia: atração vs contenção de custos.",
              },
              {
                title: "Pesquisa Salarial",
                content:
                  "Coleta de dados sobre salários praticados no mercado para cargos equivalentes. Permite definir posicionamento competitivo. Fontes: agências consultoras, mercado, sindicatos.",
              },
              {
                title: "Remuneração Variável",
                content:
                  "Conecta remuneração aos resultados individuais ou coletivos. Bônus anual (até 16° salário), PLR (Participação em Lucros e Resultados), comissões em vendas.",
              },
              {
                title: "Benefícios Estratégicos",
                content:
                  "Saúde (plano médico, odontológico), alimentação (VR/VA), previdência complementar, seguros, auxílio educação, programas de bem-estar físico e mental.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Exemplos de Remuneração"
            icon={LuCheckCircle}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                💰 Petrobras - Estrutura de Carreira
              </h4>
              <p className="text-sm text-muted-foreground">
                Bandas salariais por nível: Junior, Pleno, Senior, Expert.
                Dentro de cada banda, progressão por performance. Transparência
                de trajetória salarial possível.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🎁 Petrobras - PLR e Bônus
              </h4>
              <p className="text-sm text-muted-foreground">
                PLR vinculada a metas de EBITDA, produção e segurança. Pode
                variar de 2 a 5 meses de salário. Bônus por performance
                individual ou de área.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ❤️ Petrobras - Benefícios Especiais
              </h4>
              <p className="text-sm text-muted-foreground">
                Plano de saúde premium, auxílio creche, programa de ginástica,
                biblioteca digital, licença parental estendida, auxílio para
                educação continuada.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM6}
            moduleId="modulo-6"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 7 ====================
  const renderModulo7 = () => {
    const variant = getModuleVariant(7);
    return (
      <AulaTemplate
        moduleNumber={7}
        title="Relações Trabalhistas"
        description="Legislação trabalhista, direitos e deveres, negociação coletiva e sindicalismo."
        currentProgress={props.progress?.[6] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-7")}
        isLocked={!isModuleUnlocked("modulo-7")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Marco Legal Trabalhista",
                description:
                  "CLT, convenções coletivas, legislação complementar e reformas.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Direitos e Deveres",
                description:
                  "Direitos dos trabalhadores, obrigações da empresa, direitos do empregador.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Negociação Coletiva",
                description:
                  "Acordos, convenções, negociação com sindicatos e representantes.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Encerramento do Vínculo",
                description:
                  "Demissão, rescisão, indenização, comunicação legal e processuais.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Direito Trabalhista e Relações"
            icon={LuUsers}
          />
          <ContentAccordion
            items={[
              {
                title: "Legislação Trabalhista Brasileira",
                content:
                  "CLT (1943): base do direito trabalhista. Constituição de 88: direitos sociais. Reformas: Lei 13.467/17 (Reforma Trabalhista), Lei 14.020/20 (MP Proteção Emprego).",
              },
              {
                title: "Direitos Fundamentais dos Trabalhadores",
                content:
                  "Salário mínimo, FGTS, seguro desemprego, décimo terceiro, férias, descanso remunerado, proteção contra despedida arbitrária, filiação sindical.",
              },
              {
                title: "Convenção Coletiva e Acordo Coletivo",
                content:
                  "Convenção: negociada entre sindicato de patrões e sindicato de trabalhadores. Acordo: negociado entre empresa e comissão de trabalhadores. Vigência: até 2 anos.",
              },
              {
                title: "Procedimentos de Desligamento",
                content:
                  "Aviso prévio (30 dias), comunicação de dispensa, assinatura de documentos (TRCT), liberação de FGTS, comunicação ao sindicato se houver acordo coletivo.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Exemplos de Relações Trabalhistas"
            icon={LuShield}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🤝 Petrobras - Negociação com Sindicatos
              </h4>
              <p className="text-sm text-muted-foreground">
                Sindicato dos Petroleiros como principal representante. Negociação
                anual de reajuste salarial, PLR, benefícios. Diálogo contínuo
                para evitar conflitos.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ⚖️ Petrobras - Conformidade Legal
              </h4>
              <p className="text-sm text-muted-foreground">
                Equipe de RL acompanha legislação, atualiza políticas, analisa
                impacto de novas leis, assessora em casos judiciais trabalhistas.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📋 Petrobras - Saúde e Segurança
              </h4>
              <p className="text-sm text-muted-foreground">
                NR 1-37 aplicável. SESMT (médico, enfermeiro, técnico segurança),
                CIPA eleita, programa de prevenção de acidentes, investigação de
                incidentes.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM7}
            moduleId="modulo-7"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 8 ====================
  const renderModulo8 = () => {
    const variant = getModuleVariant(8);
    return (
      <AulaTemplate
        moduleNumber={8}
        title="Gestão de Conflitos"
        description="Identificação, mediação e resolução de conflitos organizacionais."
        currentProgress={props.progress?.[7] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-8")}
        isLocked={!isModuleUnlocked("modulo-8")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Origem dos Conflitos",
                description:
                  "Diferenças de valores, objetivos, recursos, comunicação deficiente.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Tipos de Conflito",
                description:
                  "Tarefa, processo, relacionamento e sua evolução na organização.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Estilos de Resolução",
                description:
                  "Evitar, acomodar, competir, comprometer, colaborar e contexto de uso.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Mediação e Negociação",
                description:
                  "Técnicas para resolução integrativa, ganha-ganha e restabelecimento de relacionamento.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Gestão de Conflitos Organizacionais"
            icon={LuTarget}
          />
          <ContentAccordion
            items={[
              {
                title: "Causas de Conflitos Organizacionais",
                content:
                  "Falta de clareza de papéis, competição por recursos, diferenças de valores/objetivos, falta de comunicação, mudanças organizacionais mal conduzidas.",
              },
              {
                title: "Tipos de Conflito",
                content:
                  "Conflito de tarefa: sobre como fazer. De processo: sobre procedimentos. De relacionamento: pessoal. Funcional: gera criatividade. Disfuncional: prejudica.",
              },
              {
                title: "Estilos de Resolução (Thomas-Kilmann)",
                content:
                  "Evitar: adiamento. Acomodar: abrir mão. Competir: vencer. Comprometer: divisão. Colaborar: solução integrada. Escolher conforme contexto.",
              },
              {
                title: "Técnicas de Mediação",
                content:
                  "Escuta ativa, reframing, busca de interesses comuns, geração de alternativas, acordo ganha-ganha. Restaurar relacionamento é importante.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Casos de Resolução de Conflitos"
            icon={LuCheckCircle}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🤝 Petrobras - Mediação Interdepartamental
              </h4>
              <p className="text-sm text-muted-foreground">
                Conflito entre Operações e Manutenção sobre prioridades. GP atua
                como mediadora, facilitando diálogo, alinhando objetivos comuns
                (segurança, eficiência).
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                💬 Petrobras - Clima e Engajamento
              </h4>
              <p className="text-sm text-muted-foreground">
                Pesquisa clima identifica insatisfações. One-on-ones com líderes
                para entender origem de conflitos. Implementação de ações de
                melhorias conjuntamente.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ⚡ Petrobras - Negociação Coletiva
              </h4>
              <p className="text-sm text-muted-foreground">
                RL intermedia diálogos entre empresa e sindicatos. Busca acordos
                que satisfazem ambas as partes. Evita greves e conflitos abertos.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM8}
            moduleId="modulo-8"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 9 ====================
  const renderModulo9 = () => {
    const variant = getModuleVariant(9);
    return (
      <AulaTemplate
        moduleNumber={9}
        title="Gestão de Pessoas na Petrobras"
        description="Aplicação prática dos conceitos em contexto Petrobras: desafios e soluções reais."
        currentProgress={props.progress?.[8] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-9")}
        isLocked={!isModuleUnlocked("modulo-9")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <ModuleConsolidation
            variant={variant}
            cards={[
              {
                id: 1,
                label: "Contexto Petrobras",
                description:
                  "Especificidades: ambientes críticos, geográfica dispersão, cultura operacional.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Desafios Atuais",
                description:
                  "Transição energética, retenção de talentos, diversidade e inclusão.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Programas Estratégicos",
                description:
                  "Digitalization, modernização de processos, employer branding renovado.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Tendências Futuras",
                description:
                  "Trabalho híbrido, bem-estar mental, desenvolvimento de novas competências.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Gestão de Pessoas Petrobras"
            icon={LuBriefcase}
          />
          <ContentAccordion
            items={[
              {
                title: "Complexidade da Operação Petrobras",
                content:
                  "Ambientes críticos (plataformas, refinarias) exigem alta segurança e conformidade. Geográfia dispersa (terra, mar, interior) requer sistemas de retenção diferenciados. Cultura operacional forte influencia RH.",
              },
              {
                title: "Desafio de Sucessão em Contexto de Transição Energética",
                content:
                  "Transformação digital, investimentos em renováveis, redução de dependência em óleo & gás. RH deve recrutar talentos em novas áreas (energia solar, eólica, biocombustíveis), reskill colaboradores existentes.",
              },
              {
                title: "Retenção em Ambientes Remotos",
                content:
                  "Plataformas offshore: rodízio 14/14, isolamento social. Soluções: melhoria de comunicação, benefícios diferenciados, oportunidades de carreira clara, bem-estar psicossocial.",
              },
              {
                title: "Diversidade e Inclusão",
                content:
                  "Meta de aumentar presença de mulheres em posições técnicas e liderança. Programas de recrutamento em comunidades, inclusão de pessoas com deficiência, respeito à diversidade sexual.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Casos Petrobras em Gestão de Pessoas"
            icon={LuAward}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🌍 Petrobras - Programa de Diversidade
              </h4>
              <p className="text-sm text-muted-foreground">
                Meta de 30% de mulheres em posições técnicas até 2030. Programa
                "Mulheres em Engenharia", mentoria, grupos de afinidade LGBTQIA+,
                programa de inclusão de PCDs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                💡 Petrobras - Transição Profissional
              </h4>
              <p className="text-sm text-muted-foreground">
                Programa de reskilling para colaboradores de óleo & gás migrar
                para renováveis. Cursos de energia solar, eólica, baterias.
                Garantia de colocação interna.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🏭 Petrobras - Bem-Estar Operacional
              </h4>
              <p className="text-sm text-muted-foreground">
                Programa de saúde mental para colaboradores em plataformas.
                Psicólogos disponíveis, grupos de suporte, ações de prevenção a
                suicídio, meditação e mindfulness.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM9}
            moduleId="modulo-9"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== MÓDULO 10 ====================
  const renderModulo10 = () => {
    const variant = getModuleVariant(10);
    return (
      <AulaTemplate
        moduleNumber={10}
        title="Simulado Mestre"
        description="Prova integrada com questões de todos os módulos. Nível concurso real."
        currentProgress={props.progress?.[9] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has("modulo-10")}
        isLocked={!isModuleUnlocked("modulo-10")}
      >
        <TabsContent value="resumo" className="space-y-6">
          <AlertBox
            type="info"
            title="Simulado Mestre"
            description="Este módulo é uma prova integrada com 10-12 questões de todos os tópicos abordados. Simula o nível de dificuldade do concurso real CESGRANRIO para Petrobras."
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Orientações para o Simulado"
            icon={LuCheckCircle}
          />
          <ContentAccordion
            items={[
              {
                title: "Objetivo do Simulado",
                content:
                  "Consolidar aprendizado de todos os módulos, identificar pontos fracos, ganhar experiência com questões integradas, simular pressão do tempo e ansiedade de prova.",
              },
              {
                title: "Composição de Questões",
                content:
                  "Distribuição: 10-12% por módulo (M1-M9), com foco em integração. Nível: Médio a Alto. Formato: alternativas CESGRANRIO (5 opções, 1 correta). Tempo: 30-45 minutos.",
              },
              {
                title: "Como Utilizar o Resultado",
                content:
                  "Score ≥ 70%: aprovado! Revisite módulos com menor desempenho. Score < 70%: analise cada questão errada, releia explicações, faça novamente após revisão.",
              },
              {
                title: "Estratégia de Prova",
                content:
                  "Leia com atenção cada questão. Elimine alternativas absurdas. Não adivinhe. Gerenciamento do tempo é crítico. Revise ao final se houver tempo.",
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Simulado Mestre - Prova Integrada"
            icon={LuAward}
          />
          <AlertBox
            type="success"
            title="Você está pronto!"
            description="Ao completar este simulado com 70%+ de acerto, você demonstra domínio sobre Gestão de Pessoas. Parabéns!"
          />
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Prática - Quiz Interativo"
            icon={LuTarget}
          />
          <QuizInterativo
            quiz={quizM10}
            moduleId="modulo-10"
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
            tema="tema-gestao-pessoas"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Gestão de Pessoas
          </h1>
          <p className="text-muted-foreground mt-2">
            Aprenda a gerenciar talentos, processos e relações humanas em
            contexto Petrobras.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULE_DEFS.map((mod, idx) => (
          <button
            key={mod.id}
            onClick={() => setActiveTab(mod.id)}
            disabled={!isModuleUnlocked(mod.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeTab === mod.id
                ? "border-primary bg-primary/5"
                : isModuleUnlocked(mod.id)
                  ? "border-border hover:border-primary"
                  : "border-muted bg-muted/30 opacity-50 cursor-not-allowed"
            }`}
          >
            <div className="font-bold text-foreground">{mod.label}</div>
            <div className="text-sm text-muted-foreground">{mod.title}</div>
            {completedModules.has(mod.id) && (
              <div className="text-green-600 text-sm font-bold mt-2">
                ✓ Concluído
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "modulo-1" && renderModulo1()}
        {activeTab === "modulo-2" && renderModulo2()}
        {activeTab === "modulo-3" && renderModulo3()}
        {activeTab === "modulo-4" && renderModulo4()}
        {activeTab === "modulo-5" && renderModulo5()}
        {activeTab === "modulo-6" && renderModulo6()}
        {activeTab === "modulo-7" && renderModulo7()}
        {activeTab === "modulo-8" && renderModulo8()}
        {activeTab === "modulo-9" && renderModulo9()}
        {activeTab === "modulo-10" && renderModulo10()}
      </div>
    </div>
  );
}
