"use client";

/**
 * AulaMarketingGerencial - STUB ESTRUTURAL
 *
 * Esta é uma carcaça estrutural para futura expansão.
 * Implementação completa (10 módulos premium) virá no ciclo 2.
 *
 * Status: STUB - Apenas navegação de módulos funcionando
 */

import { useState } from "react";
import { AulaProps } from "../shared";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Fundamentos de Marketing",
  },
  { id: "modulo-2", label: "Módulo 2", title: "Segmentação de Mercado" },
  { id: "modulo-3", label: "Módulo 3", title: "Estratégia de Preço" },
  { id: "modulo-4", label: "Módulo 4", title: "Distribuição" },
  { id: "modulo-5", label: "Módulo 5", title: "Comunicação de Marketing" },
  { id: "modulo-6", label: "Módulo 6", title: "Marketing Digital" },
  { id: "modulo-7", label: "Módulo 7", title: "Gestão de Marca" },
  { id: "modulo-8", label: "Módulo 8", title: "Pesquisa de Mercado" },
  {
    id: "modulo-9",
    label: "Módulo 9",
    title: "Marketing na Petrobras",
  },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaMarketingGerencial(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Marketing Gerencial
          </h1>
          <p className="text-muted-foreground mt-2">
            [STUB] Estratégia de marketing, segmentação, preço e comunicação.
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>⏳ Em desenvolvimento:</strong> Este módulo está estruturado (carcaça) e será expandido com conteúdo completo em breve.
          Todos os 10 módulos com quizzes completos virão no próximo ciclo de desenvolvimento.
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

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          {MODULE_DEFS.find((m) => m.id === activeTab)?.title}
        </h2>
        <p className="text-muted-foreground">
          Conteúdo será adicionado em breve. Estrutura está pronta para expansão.
        </p>
      </div>
    </div>
  );
}
