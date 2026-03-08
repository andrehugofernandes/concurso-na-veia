# 🎓 AULA COMPLETA - SINTAXE DA ORAÇÃO (HTML V2.0)

> **⏱️ Tempo de Estudo Estimado: 60 min**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX)

> [!IMPORTANT]
> **Diferenciais Visuais:**
>
> 1. **Análise de Termos:** Use `TimelineItem` para o passo a passo da análise sintática.
> 2. **Dossiê do Sujeito:** `ComparisonSide` para mostrar sujeito Oculto vs Indeterminado.
> 3. **Complemento vs Adjunto:** Card de comparação rico para a dúvida mais comum.

## 📄 COMPONENTE REACT: AULA_SINTAXE.TSX

```tsx
"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  QuizQuestion,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
  ComparisonSide,
  TimelineItem,
} from "../shared";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Termos Essenciais" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Termos Integrantes" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Termos Acessórios" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Lab. Cesgranrio" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Síntese Final" },
] as const;

export default function AulaSintaxe(props: AulaProps) {
  // ... lógica de estado (5 módulos)

  return (
    <div className="space-y-12 pb-20">
      {/* MÓDULO 1: TERMOS ESSENCIAIS */}
      <TabsContent value="modulo-1">
        <ModuleBanner
          numero={1}
          titulo="Termos Essenciais"
          descricao="O Sujeito e o Predicado: os pilares da comunicação."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={1} title="Estratégia de Análise" />
            <div className="space-y-4">
              <TimelineItem
                passo={1}
                titulo="Ache o Verbo"
                descricao="O verbo é o coração da oração. Tudo gira em torno dele."
              />
              <TimelineItem
                passo={2}
                titulo="Pergunte ao Verbo"
                descricao="Quem? ou O que? fez a ação? A resposta será o SUJEITO."
              />
              <TimelineItem
                passo={3}
                titulo="Classifique o Resto"
                descricao="Tudo o que não é sujeito e vocativo pertence ao PREDICADO."
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={2} title="O Sujeito Indeterminado" />
            <p>
              A Cesgranrio ama o sujeito indeterminado com o índice de
              indeterminação do sujeito 'SE'.
            </p>
            <ComparisonSide
              title="O Papel do 'SE'"
              left={{
                title: "VTD + SE (Passiva)",
                content: "Alugam-se plataformas.",
                description: "Plataformas (Sujeito) são alugadas.",
                variant: "info",
              }}
              right={{
                title: "VTI + SE (Indeterminado)",
                content: "Precisa-se de técnicos.",
                description:
                  "Sujeito Indeterminado. Verbo obrigatoriamente no singular.",
                variant: "warning",
              }}
            />
          </section>
        </div>
      </TabsContent>

      {/* MÓDULO 2: INTEGRANTES */}
      <TabsContent value="modulo-2">
        <ModuleBanner
          numero={2}
          titulo="Termos Integrantes"
          descricao="Objetos e Complementos: fechando o sentido do verbo e do nome."
          gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
        />
        <div className="space-y-[50px]">
          <section>
            <ContentAccordion
              slides={[
                {
                  title: "Objeto Direto vs Indireto",
                  content: (
                    <div className="space-y-4">
                      <p>• **Direto:** Sem preposição. (Ex: Comprei o óleo.)</p>
                      <p>
                        • **Indireto:** Com preposição obrigatória. (Ex:
                        Gostamos do projeto.)
                      </p>
                    </div>
                  ),
                },
                {
                  title: "Complemento Nominal",
                  content: (
                    <div className="space-y-4">
                      <p>
                        Completa o sentido de um NOME (Substantivo, Adjetivo ou
                        Advérbio). Sempre preposicionado.
                      </p>
                      <p>
                        <strong>Exemplo:</strong> 'A confiança **no
                        técnico**...' (Confiança em quem?)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M2}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>
    </div>
  );
}

const QUIZ_M2: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Em 'A Petrobras necessita de novos investimentos', o termo em destaque é:",
    opcoes: [
      { label: "A", valor: "Objeto Direto" },
      { label: "B", valor: "Objeto Indireto" },
      { label: "C", valor: "Complemento Nominal" },
      { label: "D", valor: "Adjunto Adnominal" },
    ],
    correta: "B",
    explicacao:
      "O verbo 'necessitar' é transitivo indireto e exige a preposição 'de'.",
  },
];
```
