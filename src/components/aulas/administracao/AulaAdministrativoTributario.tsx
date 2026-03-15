"use client";

/**
 * AulaAdministrativoTributario - STUB ESTRUTURAL
 *
 * Para Técnico de Suprimento - Administração (Nível Médio)
 * Bloco III: Contabilidade Básica, Direito Tributário, Administração Tributária
 *
 * Status: Estrutura de 10 módulos, conteúdo em desenvolvimento
 */

import { useState } from "react";
import { AulaProps } from "../shared";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Contabilidade Básica" },
  { id: "modulo-2", label: "Módulo 2", title: "Estrutura Contábil" },
  { id: "modulo-3", label: "Módulo 3", title: "Tributos: Conceitos" },
  { id: "modulo-4", label: "Módulo 4", title: "ICMS e IPI" },
  { id: "modulo-5", label: "Módulo 5", title: "Impostos de Renda" },
  { id: "modulo-6", label: "Módulo 6", title: "Contribuições Sociais" },
  { id: "modulo-7", label: "Módulo 7", title: "Administração Tributária" },
  { id: "modulo-8", label: "Módulo 8", title: "Planejamento Tributário" },
  { id: "modulo-9", label: "Módulo 9", title: "Tributos na Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaAdministrativoTributario(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold text-foreground">
          Administrativo e Tributário
        </h1>
        <p className="text-muted-foreground mt-2">
          [STUB] Contabilidade básica, direito tributário e administração tributária
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>⏳ Em Desenvolvimento:</strong> Este módulo está estruturado (carcaça
          com 10 módulos) e será expandido com conteúdo completo em breve. Todos os
          módulos terão quizzes completos e exemplos práticos contextualizados para
          Técnico de Suprimento da Petrobras.
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

      <div className="bg-card border border-border rounded-lg p-6 text-center">
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
