"use client";

import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
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
  LuFileText,
  LuGavel,
  LuShield,
  LuCheckCircle,
  LuBarChart3,
  LuBriefcase,
  LuAward,
} from "react-icons/lu";
import { getModuleVariant } from "@/lib/moduleColors";
import { QUIZ_LEI_13303 } from "@/data/quizzes/lei-13303-quizzes";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Conceitos Fundamentais da Lei 13.303",
  },
  { id: "modulo-2", label: "Módulo 2", title: "Empresa Estatal: Definições" },
  {
    id: "modulo-3",
    label: "Módulo 3",
    title: "Direitos e Deveres dos Acionistas",
  },
  { id: "modulo-4", label: "Módulo 4", title: "Órgãos de Governança" },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Assembleia Geral de Acionistas",
  },
  { id: "modulo-6", label: "Módulo 6", title: "Conselho de Administração" },
  {
    id: "modulo-7",
    label: "Módulo 7",
    title: "Diretoria e Conselho Fiscal",
  },
  { id: "modulo-8", label: "Módulo 8", title: "Conflito de Interesses" },
  {
    id: "modulo-9",
    label: "Módulo 9",
    title: "Lei 13.303 na Petrobras",
  },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaLei13303(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  // Quiz states
  const quizM1 = QUIZ_LEI_13303["modulo-1"];
  const quizM2 = QUIZ_LEI_13303["modulo-2"];
  const quizM3 = QUIZ_LEI_13303["modulo-3"];
  const quizM4 = QUIZ_LEI_13303["modulo-4"];
  const quizM5 = QUIZ_LEI_13303["modulo-5"];
  const quizM6 = QUIZ_LEI_13303["modulo-6"];
  const quizM7 = QUIZ_LEI_13303["modulo-7"];
  const quizM8 = QUIZ_LEI_13303["modulo-8"];
  const quizM9 = QUIZ_LEI_13303["modulo-9"];
  const quizM10 = QUIZ_LEI_13303["modulo-10"];

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      setCompletedModules((prev) => new Set([...prev, moduleId]));
      props.onUpdateProgress?.("aula-lei-13303", moduleId, true);
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
        title="Conceitos Fundamentais da Lei 13.303"
        description="Introdução à Lei das Empresas Estatais, seus objetivos e campo de aplicação."
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
                label: "O que é Lei 13.303",
                description:
                  "Lei Federal que disciplina o funcionamento de empresas públicas e de economia mista, regulando sua gestão e governança.",
                color: variant.cardBg,
              },
              {
                id: 2,
                label: "Objetivo Principal",
                description:
                  "Estabelecer regras de governança corporativa para empresas estatais, garantindo eficiência, transparência e respeito aos acionistas.",
                color: variant.cardBg,
              },
              {
                id: 3,
                label: "Campo de Aplicação",
                description:
                  "Aplica-se a empresas públicas federais, estaduais e municipais, e sociedades de economia mista controladas pela União, Estados ou Municípios.",
                color: variant.cardBg,
              },
              {
                id: 4,
                label: "Artigos 28-91",
                description:
                  "Foco da lei: disposições sobre administração, órgãos sociais, responsabilidade dos administradores e normas de conduta.",
                color: variant.cardBg,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Fundamentos da Lei 13.303/2016"
            icon={LuFileText}
          />
          <ContentAccordion
            items={[
              {
                title: "Histórico e Justificativa",
                content:
                  "Lei 13.303 foi sancionada em 2016 para modernizar a governança de empresas estatais. Substitui parcialmente a Lei 6.404/76 (Lei das S.A.) com regras específicas para setor público.",
              },
              {
                title: "Diferença: Empresa Pública vs Economia Mista",
                content:
                  "Empresa Pública: 100% controlada pelo governo. Economia Mista: governo tem controle acionário (maioria) mas há acionistas privados também.",
              },
              {
                title: "Princípios Fundamentais",
                content:
                  "1) Sustentabilidade: equilíbrio entre rentabilidade e responsabilidade. 2) Governança: transparência e prestação de contas. 3) Conformidade: obediência a leis e regulamentações.",
              },
              {
                title: "Artigos 28-91: Escopo",
                content:
                  "Estes artigos cobrem: órgãos de administração (Assembleia, Conselho, Diretoria), responsabilidades, procedimentos de votação, divulgação de informações e impedimentos.",
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
                📌 Petrobras - Empresa Pública Referência
              </h4>
              <p className="text-sm text-muted-foreground">
                Petrobras é empresa pública federal que segue rigorosamente Lei 13.303. Exemplo: suas assembleias são abertas ao público, divulga relatórios de governança, segue regras de conflito de interesse.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                ⚖️ Lei 13.303 vs Lei 6.404/76
              </h4>
              <p className="text-sm text-muted-foreground">
                Lei 6.404 é para S.A. privadas. Lei 13.303 é específica para estatais: regras mais rigorosas sobre transparência, impedimentos de administradores, e responsabilidade civil.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                🏢 Aplicação: BBD (Banco do Brasil) e CEF
              </h4>
              <p className="text-sm text-muted-foreground">
                Banco do Brasil é economia mista. Caixa Econômica Federal é empresa pública. Ambas obedecem Lei 13.303 em suas estruturas de governança.
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
            tema="tema-lei-13303"
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  // ==================== OUTROS MÓDULOS (PLACEHOLDER) ====================
  const renderModuloPlaceholder = (num: number, title: string) => {
    const variant = getModuleVariant(num);
    return (
      <AulaTemplate
        moduleNumber={num}
        title={title}
        description={`Módulo ${num} - Conteúdo completo em breve`}
        currentProgress={props.progress?.[num - 1] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={completedModules.has(`modulo-${num}`)}
        isLocked={!isModuleUnlocked(`modulo-${num}`)}
      >
        <TabsContent value="resumo" className="space-y-6">
          <AlertBox
            type="info"
            title="Módulo em Desenvolvimento"
            description={`${title} será expandido com 4 abas completas (Resumo, Explicação, Exemplos, Prática) seguindo o padrão premium.`}
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">Conteúdo em desenvolvimento...</p>
          </div>
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">Exemplos práticos em breve...</p>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">Quiz em desenvolvimento...</p>
          </div>
        </TabsContent>
      </AulaTemplate>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Lei 13.303 - Empresa Estatal
          </h1>
          <p className="text-muted-foreground mt-2">
            Lei Federal que disciplina a governança de empresas públicas e de economia mista.
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
        {activeTab === "modulo-2" && renderModuloPlaceholder(2, "Empresa Estatal: Definições")}
        {activeTab === "modulo-3" && renderModuloPlaceholder(3, "Direitos e Deveres dos Acionistas")}
        {activeTab === "modulo-4" && renderModuloPlaceholder(4, "Órgãos de Governança")}
        {activeTab === "modulo-5" && renderModuloPlaceholder(5, "Assembleia Geral de Acionistas")}
        {activeTab === "modulo-6" && renderModuloPlaceholder(6, "Conselho de Administração")}
        {activeTab === "modulo-7" && renderModuloPlaceholder(7, "Diretoria e Conselho Fiscal")}
        {activeTab === "modulo-8" && renderModuloPlaceholder(8, "Conflito de Interesses")}
        {activeTab === "modulo-9" && renderModuloPlaceholder(9, "Lei 13.303 na Petrobras")}
        {activeTab === "modulo-10" && renderModuloPlaceholder(10, "Simulado Mestre")}
      </div>
    </div>
  );
}
