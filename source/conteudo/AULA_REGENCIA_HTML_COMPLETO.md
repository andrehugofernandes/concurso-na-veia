# 🎓 AULA COMPLETA - REGÊNCIA (PREMIUM V3.0)

> **⏱️ Tempo de Estudo Estimado: 85 min**
> **🎯 Foco: Padrão Cesgranrio Petrobras**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX) - DOSSIÊ DE ELITE

> [!IMPORTANT]
> **Diferenciais Visuais Aplicados:**
>
> 1.  **Laboratório de Mudança de Sentido**: Use `FlipCard` com verso escuro (`bg-[#0a0a0a]`) para mostrar o "Antes e Depois" da preposição.
> 2.  **Batalha de Regência**: `ComparisonSide` para mostrar o erro comum (fala coloquial) vs. a norma culta exigida.
> 3.  **Radar de Preposições**: `CardCarousel` para memorizar nomes e suas preposições obrigatórias.
> 4.  **C.E.D.E. Protocol**: Todo acordeon de conteúdo deve conter: **C**onceituação, **E**xemplificação, **D**icas e **E**xceções.

## 📄 COMPONENTE REACT: AULA_REGENCIA.TSX (ESTRUTURA)

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
import {
  LuBookOpen,
  LuTarget,
  LuTriangleAlert,
  LuZap,
  LuBrain,
  LuNavigation,
} from "react-icons/lu";

// Quizzes importados do arquivo de dados (10 pools)
import {
  QUIZ_M1_REGENCIA,
  QUIZ_M2_REGENCIA,
  QUIZ_M3_REGENCIA,
  QUIZ_M4_REGENCIA,
  QUIZ_M5_REGENCIA,
  QUIZ_M6_REGENCIA,
  QUIZ_M7_REGENCIA,
  QUIZ_M8_REGENCIA,
  QUIZ_M9_REGENCIA,
  QUIZ_FINAL_REGENCIA,
} from "./data/regencia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos e Mecânica" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Regência Nominal: Adjetivos" },
  {
    id: "modulo-3",
    label: "Módulo 3",
    titulo: "Regência Nominal: Substantivos",
  },
  { id: "modulo-4", label: "Módulo 4", titulo: "Regência Verbal: A Elite" },
  {
    id: "modulo-5",
    label: "Módulo 5",
    titulo: "Regência Verbal: Mudança de Sentido",
  },
  {
    id: "modulo-6",
    label: "Módulo 6",
    titulo: "Regência Verbal: Transitividade Bifronte",
  },
  {
    id: "modulo-7",
    label: "Módulo 7",
    titulo: "Regência Verbal: Movimento e Pronominais",
  },
  {
    id: "modulo-8",
    label: "Módulo 8",
    titulo: "Peculiaridades Técnicas Cesgranrio",
  },
  {
    id: "modulo-9",
    label: "Módulo 9",
    titulo: "Regência e Relativos: O Pulo do Gato",
  },
  { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final de Gabarito" },
] as const;

export default function AulaRegencia(props: AulaProps) {
  // Lógica de estado seguindo o boilerplate do workflow...
}
```

---

## 🏗️ CONTEÚDO DOS MÓDULOS (EXPANSÃO PREMIUM)

### Módulo 1: Fundamentos e Mecânica

- **Conceituação**: Regência como o "imã" que o termo regente (nome ou verbo) exerce sobre o termo regido (complemento).
- **Exemplificação**:
  1.  "A Petrobras precisa **de** investimentos." (Verbo precisa = Regente; de investimentos = Regido).
  2.  "A equipe está apta **a** operar." (Adjetivo apta = Regente; a operar = Regido).
- **Pulo do Gato**: Na Cesgranrio, a regência é frequentemente testada junto com a CRASE e os PRONOMES RELATIVOS.

### Módulo 4: Regência Verbal - A Elite (Mudança de Sentido)

Utilizar `FlipCard` para os verbos clássicos:

| Verbo        | Sentido 1                                     | Sentido 2                                       |
| :----------- | :-------------------------------------------- | :---------------------------------------------- |
| **ASSISTIR** | VTD (Ajudar): "O médico assistiu o paciente." | VTI (+A) (Ver): "Assisti ao vídeo técnico."     |
| **ASPIRAR**  | VTD (Cheirar): "Aspirei o ar puro."           | VTI (+A) (Desejar): "Aspiro à vaga de técnico." |
| **VISAR**    | VTD (Mirar/Rubricar): "Visou o alvo."         | VTI (+A) (Objetivar): "Visamos ao lucro."       |

### Módulo 9: O Pulo do Gato (Relativos)

Utilizar `ComparisonSide` para mostrar a "transposição" da preposição:

- **Errado**: "A ferramenta **que** eu preciso sumiu."
- **Certo**: "A ferramenta **de que** eu preciso sumiu."
- **Explicação**: Quem precisa, precisa **DE**. A preposição deve viajar para antes do "QUE".

---

## 📝 NOVOS QUIZZES (POOLS COMPLEMENTARES)

> [!NOTE]
> Mova estas questões para `src/components/aulas/portugues/data/regencia-quizzes.ts`.

#### QUIZ_M5: Verbos Especiais (Implicar/Custar)

- **Q1**: A frase que respeita a regência de "implicar" (acarretar) é:
  - (A) Isso implicará em multa.
  - (B) Isso implicará multa. ✅
  - (C) Isso implica à multa.
  - (D) Isso implica com multa.
  - **Explicação**: No sentido de "causar", o verbo é VTD (sem preposição).

#### QUIZ_M9: Pronomes Relativos

- **Q1**: "O poço \_\_\_ profundidade aludimos é imenso."
  - (A) que a
  - (B) à cuja ✅
  - (C) de que a
  - (D) cujo a
  - **Explicação**: Quem alude, alude **A**. O pronome 'cujo' não aceita artigo depois, mas aceita preposição antes. Logo, "a + cujo" = "à cuja" (considerando concordância feminina se o termo fosse outro, mas aqui 'profundidade' é feminino). Espera, aludir a algo. "O poço a cuja profundidade aludimos".

---

## 📥 REQUISITO DE EXTRAÇÃO PDF (PÁGINAS 31-43)

- [ ] Incorporar lista completa de Regência Nominal (Apto a, Avesso a, Imune a, etc).
- [ ] Detalhar Verbos: Chegar/Ir (não usar EM), Obedecer (VTI), Preferir (A e não DO QUE).
- [ ] Caso do Verbo INFORMAR: Informar algo a alguém OU Informar alguém de algo.

---

> **Ação Imediata**: Atualizar `AulaRegencia.tsx` para refletir os 10 módulos e integrar os novos pools de quiz.
