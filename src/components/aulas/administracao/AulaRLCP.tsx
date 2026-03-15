"use client";

/**
 * AulaRLCP - Regulamento de Licitações Petrobras
 * STUB ESTRUTURAL para Nível Técnico/Médio
 *
 * Status: Carcaça com Módulo 1 expandido, restante placeholder
 */

import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  AulaProps,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { LuBookOpen, LuFileText, LuTarget } from "react-icons/lu";
import { getModuleVariant } from "@/lib/moduleColors";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais RLCP" },
  { id: "modulo-2", label: "Módulo 2", title: "Modalidades de Licitação" },
  { id: "modulo-3", label: "Módulo 3", title: "Procedimento Licitatório" },
  { id: "modulo-4", label: "Módulo 4", title: "Edital e Termo de Referência" },
  { id: "modulo-5", label: "Módulo 5", title: "Julgamento e Adjudicação" },
  { id: "modulo-6", label: "Módulo 6", title: "Recursos e Impugnações" },
  { id: "modulo-7", label: "Módulo 7", title: "Contratos e Execução" },
  { id: "modulo-8", label: "Módulo 8", title: "Inabilitação e Desempate" },
  { id: "modulo-9", label: "Módulo 9", title: "RLCP na Prática Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaRLCP(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");

  const renderModulo1 = () => {
    const variant = getModuleVariant(1);
    return (
      <AulaTemplate
        moduleNumber={1}
        title="Conceitos Fundamentais RLCP"
        description="Introdução ao Regulamento de Licitações e Contratos da Petrobras"
        currentProgress={props.progress?.[0] || 0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={false}
      >
        <TabsContent value="resumo" className="space-y-6">
          <AlertBox
            type="info"
            title="Módulo 1: Fundamentos"
            description="RLCP é regulamento próprio de licitações da Petrobras, baseado em Lei 13.303 e normas federais. Define procedimentos para contratação de bens e serviços."
          />
        </TabsContent>

        <TabsContent value="explicacao" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="O que é RLCP?"
            icon={LuFileText}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">RLCP significa:</h4>
              <p className="text-sm text-muted-foreground">
                Regulamento de Licitações e Contratos da Petrobras. Define como
                Petrobras realiza compras e contratações de forma transparente,
                eficiente e conforme Lei 13.303.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                Princípios Fundamentais:
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Legalidade: cumprimento de Lei 13.303 e legislação federal</li>
                <li>✓ Publicidade: transparência em todos os atos</li>
                <li>✓ Igualdade: mesmos direitos para todos os licitantes</li>
                <li>✓ Eficiência: melhor relação custo-benefício</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="exemplos" className="space-y-6">
          <ModuleSectionHeader
            variant={variant}
            title="Exemplos Práticos"
            icon={LuBookOpen}
          />
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-foreground mb-2">
                📌 Petrobras compra tubulação
              </h4>
              <p className="text-sm text-muted-foreground">
                Petrobras precisa comprar 1.000 km de tubulação. Publica edital
                via RLCP, define especificações, prazo. Empresas concorrem
                transparentemente. Melhor oferta ganha.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pratica" className="space-y-6">
          <AlertBox
            type="info"
            title="Quiz em Desenvolvimento"
            description="O quiz do Módulo 1 será adicionado em breve com 6 questões sobre fundamentos."
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  const renderPlaceholder = (num: number, title: string) => {
    const variant = getModuleVariant(num);
    return (
      <AulaTemplate
        moduleNumber={num}
        title={title}
        description={`Módulo ${num} em desenvolvimento`}
        currentProgress={0}
        onUpdateProgress={props.onUpdateProgress}
        isCompleted={false}
      >
        <TabsContent value="resumo" className="space-y-6">
          <AlertBox
            type="info"
            title="Módulo em Desenvolvimento"
            description={`${title} será expandido com conteúdo completo em breve.`}
          />
        </TabsContent>
      </AulaTemplate>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          RLCP - Regulamento de Licitações Petrobras
        </h1>
        <p className="text-muted-foreground mt-2">
          Procedimentos transparentes de compras, contratações e gestão de contratos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MODULE_DEFS.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveTab(mod.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeTab === mod.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary"
            }`}
          >
            <div className="font-bold text-foreground">{mod.label}</div>
            <div className="text-sm text-muted-foreground">{mod.title}</div>
          </button>
        ))}
      </div>

      <div className="mt-8">
        {activeTab === "modulo-1" && renderModulo1()}
        {activeTab === "modulo-2" && renderPlaceholder(2, "Modalidades de Licitação")}
        {activeTab === "modulo-3" && renderPlaceholder(3, "Procedimento Licitatório")}
        {activeTab === "modulo-4" && renderPlaceholder(4, "Edital e Termo de Referência")}
        {activeTab === "modulo-5" && renderPlaceholder(5, "Julgamento e Adjudicação")}
        {activeTab === "modulo-6" && renderPlaceholder(6, "Recursos e Impugnações")}
        {activeTab === "modulo-7" && renderPlaceholder(7, "Contratos e Execução")}
        {activeTab === "modulo-8" && renderPlaceholder(8, "Inabilitação e Desempate")}
        {activeTab === "modulo-9" && renderPlaceholder(9, "RLCP na Prática Petrobras")}
        {activeTab === "modulo-10" && renderPlaceholder(10, "Simulado Mestre")}
      </div>
    </div>
  );
}
