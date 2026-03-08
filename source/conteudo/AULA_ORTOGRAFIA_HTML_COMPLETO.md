# 🎓 AULA COMPLETA - ORTOGRAFIA E ACENTUAÇÃO (HTML V2.0)

> **⏱️ Tempo de Estudo Estimado: 50 min**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX)

> [!IMPORTANT]
> **Diferenciais Visuais:**
>
> 1. **Dicionário de Dúvidas:** Use `CardCarousel` para pares de palavras confusas (Ex: Sessão vs Seção).
> 2. **Infográfico de Acentuação:** Use `ContentAccordion` para as regras de Oxítonas/Paroxítonas.
> 3. **Hífen "Mindmap":** Regras do Novo Acordo em `FlipCards`.

## 📄 COMPONENTE REACT: AULA_ORTOGRAFIA.TSX

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
  { id: "modulo-1", label: "Módulo 1", titulo: "Acentuação Tônica" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Regras Especiais" },
  { id: "modulo-3", label: "Módulo 3", titulo: "O No de Hífen" },
  { id: "modulo-4", label: "Módulo 4", titulo: "S, Z, X ou CH?" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Dúvidas Frequentes" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Simulado Final" },
] as const;

export default function AulaOrtografia(props: AulaProps) {
  // ... lógica de estado (6 módulos)

  return (
    <div className="space-y-12 pb-20">
      {/* MÓDULO 3: O NÓ DO HÍFEN */}
      <TabsContent value="modulo-3">
        <ModuleBanner
          numero={3}
          titulo="O Nó do Hífen"
          descricao="Domine as regras do Novo Acordo Ortográfico e não erre mais no relatório."
          gradiente="bg-gradient-to-br from-amber-600 to-orange-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={1} title="A Regra dos Opostos" />
            <p>
              A regra geral é: os opostos se atraem (letras diferentes = sem
              hífen) e os iguais se repelem (letras iguais = com hífen).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <h4 className="font-bold text-emerald-700 mb-2">
                  Sem Hífen (Diferentes)
                </h4>
                <p>Autoestrada, Infraestrutura, Semiaberto</p>
              </div>
              <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                <h4 className="font-bold text-red-700 mb-2">
                  Com Hífen (Iguais)
                </h4>
                <p>Micro-ondas, Anti-inflamatório, Contra-ataque</p>
              </div>
            </div>
          </section>

          <AlertBox tipo="info" titulo="O Caso do H">
            O prefixo sempre pede hífen antes de palavra iniciada por **H**. Ex:
            Super-homem, Anti-higiênico.
          </AlertBox>
        </div>
      </TabsContent>

      {/* MÓDULO 5: DÚVIDAS FREQUENTES */}
      <TabsContent value="modulo-5">
        <ModuleBanner
          numero={5}
          titulo="Dúvidas Frequentes"
          descricao="Mas/Mais, Mal/Mau, Porquês: o básico que derruba gigantes."
          gradiente="bg-gradient-to-br from-cyan-500 to-blue-700"
        />
        <div className="space-y-[50px]">
          <CardCarousel
            titulo="Pares Confusos"
            cards={[
              {
                icone: "❓",
                titulo: "Por que",
                descricao: 'Início de pergunta ou "pelo qual".',
                corFundo: "bg-primary/10",
              },
              {
                icone: "❕",
                titulo: "Porque",
                descricao: "Resposta ou explicação (= pois).",
                corFundo: "bg-emerald-500/10",
              },
              {
                icone: "📉",
                titulo: "Mau",
                descricao: "Oposto de BOM (Adjetivo).",
                corFundo: "bg-red-500/10",
              },
              {
                icone: "📈",
                titulo: "Mal",
                descricao: "Oposto de BEM (Advérbio).",
                corFundo: "bg-blue-500/10",
              },
            ]}
          />
          <QuizInterativo
            questoes={QUIZ_M5}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ... Módulos restantes ... */}
    </div>
  );
}

const QUIZ_M5: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Assinale a frase em que o uso do 'PORQUE' está correto:",
    opcoes: [
      { label: "A", valor: "Não fui trabalhar por que estava doente." },
      { label: "B", valor: "Você faltou porque?" },
      { label: "C", valor: "A vitória ocorreu porque todos ajudaram." },
      { label: "D", valor: "O porque da dúvida não foi explicado." },
    ],
    correta: "C",
    explicacao:
      "Usa-se 'porque' (junto e sem acento) em respostas e explicações.",
  },
];
```
