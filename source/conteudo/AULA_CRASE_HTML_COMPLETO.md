# 🎓 AULA COMPLETA - CRASE: O GUIA DEFINITIVO (HTML V2.0)

> **⏱️ Tempo de Estudo Estimado: 45 min**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX)

> [!IMPORTANT]
> **Destaques Visuais:**
>
> 1. **Fórmula da Crase:** `A (Preposição) + A (Artigo Def.) = À`.
> 2. **Alerta Crítico:** Use `AlertBox` para os casos proibidos (onde o aluno mais perde pontos).
> 3. **Interatividade:** Método de substituição "A → AO" usando `ComparisonSide`.

## 📄 COMPONENTE REACT: AULA_CRASE.TSX

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
  { id: "modulo-1", label: "Módulo 1", titulo: "A Lógica da Fusão" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Uso Obrigatório" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Os Casos Proibidos" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Crase Facultativa" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Simulado de Elite" },
] as const;

export default function AulaCrase(props: AulaProps) {
  // ... lógica de estado (ver AulaCrase.tsx para 5 módulos)

  return (
    <div className="space-y-12 pb-20">
      {/* MÓDULO 1: A LÓGICA DA FUSÃO */}
      <TabsContent value="modulo-1">
        <ModuleBanner
          numero={1}
          titulo="A Lógica da Fusão"
          descricao="Entenda o fenômeno fonético e sintático por trás do acento grave."
          gradiente="bg-gradient-to-br from-rose-600 to-indigo-900"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Método de Substituição (A → AO)"
            />
            <p>
              A forma mais segura de verificar a crase é trocar a palavra
              feminina por uma masculina correspondente.
            </p>
            <ComparisonSide
              title="Teste Prático"
              left={{
                title: "Feminino",
                content: "Vou **à** refinaria.",
                description: "Dúvida: tem crase?",
                variant: "info",
              }}
              right={{
                title: "Masculino",
                content: "Vou **ao** terminal.",
                description: "Se virou 'AO', tem crase no feminino!",
                variant: "success",
              }}
            />
          </section>

          <section>
            <FlipCard
              frente={
                <div className="text-center font-bold">
                  CRASE DIANTE DE HORAS
                </div>
              }
              verso={
                <div className="space-y-2">
                  <p>Usa-se crase diante de horas determinadas.</p>
                  <p>✅ 'A reunião será **às** 14h.'</p>
                  <p>
                    ❌ 'A reunião durará **a** duas horas.' (Duração, não hora
                    exata)
                  </p>
                </div>
              }
            />
          </section>
        </div>
      </TabsContent>

      {/* MÓDULO 3: CASOS PROIBIDOS */}
      <TabsContent value="modulo-3">
        <ModuleBanner
          numero={3}
          titulo="Os Casos Proibidos"
          descricao="Não caia na tentação! Onde a crase nunca deve aparecer."
          gradiente="bg-gradient-to-br from-red-700 to-red-900"
        />
        <div className="space-y-[50px]">
          <AlertBox tipo="danger" titulo="MEMORIZE!">
            <ul className="list-disc pl-5 space-y-1">
              <li>Antes de palavras masculinas (Ex: a prazo).</li>
              <li>Antes de verbos (Ex: a partir).</li>
              <li>Entre palavras repetidas (Ex: dia a dia).</li>
              <li>Antes de pronomes pessoais (Ex: a ela).</li>
            </ul>
          </AlertBox>
          <QuizInterativo
            questoes={QUIZ_M3}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ... Módulos restantes ... */}
    </div>
  );
}

const QUIZ_M3: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Em qual das frases abaixo o uso da crase é PROIBIDO?",
    opcoes: [
      { label: "A", valor: "Chegaremos à noite." },
      { label: "B", valor: "Ele começou a gritar." },
      { label: "C", valor: "Fui à escola ontem." },
      { label: "D", valor: "Ele obedeceu à lei." },
    ],
    correta: "B",
    explicacao: "Não se utiliza crase antes de verbos (gritar).",
  },
];
```
