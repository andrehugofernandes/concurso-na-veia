# 🎓 AULA COMPLETA - PONTUAÇÃO (PREMIUM V3.0)

> **⏱️ Tempo de Estudo Estimado: 90 min**
> **🎯 Foco: Padrão Cesgranrio Petrobras**

---

## 🎨 PADRÕES DE INTERFACE (UI/UX) - DOSSIÊ DE ELITE

> [!IMPORTANT]
> **Diferenciais Visuais Aplicados:**
>
> 1.  **Scanner de Proibições**: Use `AlertBox` tipo "danger" para os casos em que a vírgula é PROIBIDA (Erro fatal).
> 2.  **Dossiê da Vírgula Transmutadora**: `ComparisonSide` para mostrar como a vírgula altera o sentido (Explicativa vs Restritiva).
> 3.  **Laboratório de Sinais**: `FlipCards` para comparar Ponto e Vírgula vs Dois Pontos.
> 4.  **C.E.D.E. Protocol**: Todo acordeon de conteúdo deve conter: **C**onceituação, **E**xemplificação, **D**icas e **E**xceções.

## 📄 COMPONENTE REACT: AULA_PONTUACAO.TSX (ESTRUTURA)

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
  QUIZ_M1_PONTUACAO,
  QUIZ_M2_PONTUACAO,
  QUIZ_M3_PONTUACAO,
  QUIZ_M4_PONTUACAO,
  QUIZ_M5_PONTUACAO,
  QUIZ_M6_PONTUACAO,
  QUIZ_M7_PONTUACAO,
  QUIZ_M8_PONTUACAO,
  QUIZ_M9_PONTUACAO,
  QUIZ_FINAL_PONTUACAO,
} from "./data/pontuacao-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Visão Geral e Funções" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Vírgula: Proibições Fatais" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Vírgula: Termos Essenciais" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Vírgula: Aposto e Vocativo" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Vírgula: Adjuntos Deslocados" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Vírgula: Orações Coordenadas" },
  {
    id: "modulo-7",
    label: "Módulo 7",
    titulo: "Vírgula: Orações Subordinadas",
  },
  { id: "modulo-8", label: "Módulo 8", titulo: "Ponto e Ponto e Vírgula" },
  { id: "modulo-9", label: "Módulo 9", titulo: "Sinais Complementares" },
  { id: "modulo-10", label: "Módulo 10", titulo: "Simulado de Gabarito" },
] as const;

export default function AulaPontuacao(props: AulaProps) {
  // Lógica de estado seguindo o boilerplate do workflow...
}
```

---

## 🏗️ CONTEÚDO DOS MÓDULOS (EXPANSÃO PREMIUM)

### Módulo 2: Vírgula - Proibições Fatais

- **Conceituação**: A pontuação não existe para "marcar respiração", mas para sinalizar a estrutura sintática.
- **A Regra do 1-2-3**: Não se separa por vírgula:
  1.  **Sujeito** do Verbo.
  2.  **Verbo** de seus Objetos.
  3.  **Nome** do seu Complemento/Adjunto.
- **Batalha de Erros**: `ComparisonSide` mostrando:
  - ❌ "Os funcionários da Petrobras, chegaram cedo."
  - ✅ "Os funcionários da Petrobras chegaram cedo."

### Módulo 7: Explicativas vs Restritivas

- **Dossiê Visual**: `ComparisonSide` para mostrar a mudança de sentido.
  - **Com Vírgula (Explicativa)**: "Os petroleiros**, que são dedicados,** ganharam bônus." (Todos são dedicados).
  - **Sem Vírgula (Restritiva)**: "Os petroleiros **que são dedicados** ganharam bônus." (Apenas os dedicados ganharam).

### Módulo 9: Sinais Complementares

- **Dois Pontos**: Para enumerações, citações ou sínteses.
- **Travessão vs Vírgula**: O travessão confere maior ênfase ao termo intercalado.
- **Parênteses**: Para comentários acessórios ou explicações técnicas.

---

## 📝 NOVOS QUIZZES (POOLS COMPLEMENTARES)

> [!NOTE]
> Mova estas questões para `src/components/aulas/portugues/data/pontuacao-quizzes.ts`.

#### QUIZ_M2: Proibições

- **Q1**: Em qual das frases a vírgula foi usada INCORRETAMENTE?
  - (A) Amanhã, todos chegarão.
  - (B) O diretor, autorizou a obra. ✅ (Separa sujeito do verbo)
  - (C) Autorizo, diretor, a obra agora.
  - (D) Chegaram, ontem, os materiais.

#### QUIZ_M7: Sentido e Vírgula

- **Q1**: "Os navios que transportam gás são seguros". Se colocarmos vírgulas, o sentido muda para:
  - (A) Apenas alguns navios transportam gás.
  - (B) Todos os navios do mundo transportam gás. ✅ (Generalização explicativa)
  - (C) Nenhum navio transporta gás.
  - (D) A segurança dos navios é duvidosa.

---

## 📥 REQUISITO DE EXTRAÇÃO PDF (PÁGINAS 37-41)

- [ ] Detalhar o uso da vírgula antes do "E" (Sujeitos diferentes / Polissíndeto).
- [ ] Explicar a vírgula para marcar a Omissão do Verbo (Zêugma).
- [ ] Diferenciar Ponto e Vírgula para separar itens de leis ou manuais técnicos.
