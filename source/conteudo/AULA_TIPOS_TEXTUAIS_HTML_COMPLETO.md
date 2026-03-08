# 🎓 AULA COMPLETA - TIPOS TEXTUAIS (HTML V2.0)

> **⏱️ Tempo de Estudo Estimado: 50 min**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX)

> [!IMPORTANT]
> **Diferenciais Visuais:**
>
> 1. **Scanner de Texto:** Use `ComparisonSide` para mostrar fragmentos de diferentes tipos (Ex: Narrativo vs Dissertativo).
> 2. **Dossiê Tipológico:** `FlipCards` para as marcas linguísticas de cada tipo (Ex: Verbos no Imperativo = Injunção).
> 3. **Mapa Mental:** `ContentAccordion` para a estrutura da dissertação.

## 📄 COMPONENTE REACT: AULA_TIPOS_TEXTUAIS.TSX

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
} from "../shared";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Tipo vs Gênero" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Dissertação (Elite)" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Narração e Descrição" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Injunção e Exposição" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Simulado de Reconhecimento" },
] as const;

export default function AulaTiposTextuais(props: AulaProps) {
  // ... lógica de estado (5 módulos)

  return (
    <div className="space-y-12 pb-20">
      {/* MÓDULO 2: DISSERTAÇÃO (ELITE) */}
      <TabsContent value="modulo-2">
        <ModuleBanner
          numero={2}
          titulo="Dissertação (Elite)"
          descricao="O tipo mais cobrado pela Cesgranrio. Saiba identificar a tese e os argumentos."
          gradiente="bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={1} title="A Estrutura do Pensamento" />
            <ContentAccordion
              slides={[
                {
                  title: "Expositiva vs Argumentativa",
                  content: (
                    <div className="space-y-4">
                      <p>
                        • **Expositiva:** Apenas informa (neutralidade). Ex:
                        Notícia sobre o preço do barril.
                      </p>
                      <p>
                        • **Argumentativa:** Tenta convencer (subjetividade
                        tática). Ex: Editorial defendendo a privatização ou
                        investimentos estatais.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
            <ComparisonSide
              title="Marcas de Subjetividade"
              left={{
                title: "Fato (Expositivo)",
                content: "A Petrobras produz 2 milhões de barris por dia.",
                variant: "info",
              }}
              right={{
                title: "Opinião (Argumentativo)",
                content:
                  "A Petrobras produz **impressionantes** 2 milhões de barris.",
                description:
                  "O adjetivo 'impressionantes' marca a visão do autor.",
                variant: "success",
              }}
            />
          </section>
        </div>
      </TabsContent>

      {/* MÓDULO 4: INJUNÇÃO */}
      <TabsContent value="modulo-4">
        <ModuleBanner
          numero={4}
          titulo="Injunção e Exposição"
          descricao="Manuais, editais e receitas: a clareza para o funcionamento da indústria."
          gradiente="bg-gradient-to-br from-emerald-600 to-emerald-900"
        />
        <div className="space-y-[50px]">
          <AlertBox tipo="info" titulo="O Verbo no Comando">
            A principal marca da injunção é o uso de **Verbos no Imperativo**
            (Faça, Mantenha, Use) ou Infinitivos com valor de ordem.
          </AlertBox>
          <FlipCard
            frente={
              <div className="text-center font-bold">EXEMPLO DE INJUNÇÃO</div>
            }
            verso={
              <div className="p-4 bg-primary/10 rounded-xl">
                <p className="italic">
                  "Mantenha o capacete afivelado e evite áreas de risco sem
                  sinalização."
                </p>
                <p className="mt-2 text-xs font-bold text-primary">
                  Dica: Comum em Normas Regulamentadoras (NRs).
                </p>
              </div>
            }
          />
          <QuizInterativo
            questoes={QUIZ_M4}
            onComplete={(score) => handleModuleComplete("modulo-4", 3, score)}
          />
        </div>
      </TabsContent>
    </div>
  );
}

const QUIZ_M4: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Um manual de operação de sonda que descreve o passo a passo para desligamento de emergência é um texto:",
    opcoes: [
      { label: "A", valor: "Narrativo" },
      { label: "B", valor: "Dissertativo" },
      { label: "C", valor: "Injuntivo" },
      { label: "D", valor: "Descritivo" },
    ],
    correta: "C",
    explicacao: "Textos que orientam, instruem ou dão ordens são injuntivos.",
  },
];
```
