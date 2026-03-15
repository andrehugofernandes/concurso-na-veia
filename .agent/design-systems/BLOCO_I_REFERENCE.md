# Bloco I - Padrão de Criação de Aulas Premium

## 📌 Referência: AulaPlanejamentoEstrategico

**Status:** ✅ Completa e Premium
**Linhas:** 730 (carcaça estrutural)
**Módulos:** 10 (M1-M10)
**Padrão:** ModuleConsolidation 4-tabs + C.E.D.E.

---

## 1️⃣ ESTRUTURA PRINCIPAL

### 1.1 Imports Essenciais
```tsx
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox, QuizInterativo, ModuleBanner, getRandomQuestions, AulaProps,
  ContentAccordion, AulaTemplate, ModuleSectionHeader, ModuleConsolidation,
} from "../shared";
import { LuBookOpen, LuLightbulb, LuTarget, ... } from "react-icons/lu";
import { getModuleVariant } from "@/lib/moduleColors";
```

### 1.2 MODULE_DEFS Array (Exatamente 10 módulos)
```tsx
const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais" },
  { id: "modulo-2", label: "Módulo 2", title: "Análise SWOT" },
  // ... até modulo-10
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;
```

**Regra:** Sempre 10 módulos, IDs padronizados "modulo-1" até "modulo-10"

### 1.3 State Management
```tsx
const [activeTab, setActiveTab] = useState("modulo-1");
const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

// Carregar quizzes do arquivo externo
const quizM1 = QUIZ_PLANEJAMENTO["modulo-1"];
const quizM2 = QUIZ_PLANEJAMENTO["modulo-2"];
// ... até quizM10
```

**Padrão:** Cada módulo tem um quiz carregado de `data/quizzes/{nome}-quizzes.ts`

---

## 2️⃣ SISTEMA DE CORES (ModuleVariant)

### 2.1 Cores por Módulo
```tsx
import { getModuleVariant } from "@/lib/moduleColors";

// No render de cada módulo:
const variant = getModuleVariant(moduleNumber); // 1-10
// Aplicar em: ModuleBanner, ModuleSectionHeader, ModuleConsolidation
```

**Paleta:** 10 cores harmônicas (Azul → Índigo)
- Módulo 1: Azul claro
- Módulo 2: Azul médio
- ...
- Módulo 10: Índigo profundo

### 2.2 Aplicação em Componentes
- `<ModuleBanner variant={variant} />` — Banner do módulo
- `<ModuleSectionHeader variant={variant} />` — Subtítulos
- `<ModuleConsolidation variant={variant} />` — Cards numerados (4 abas)
- `<CardCarousel variant={variant} />` — Carrossel de cards

---

## 3️⃣ ESTRUTURA DE CONTEÚDO POR MÓDULO

### 3.1 Template (4 Tabs por Módulo)
```tsx
<AulaTemplate
  moduleNumber={1}
  title="Conceitos Fundamentais"
  description="..."
  currentProgress={currentProgress}
  onUpdateProgress={onUpdateProgress}
  isCompleted={completedModules.has("modulo-1")}
>
  {/* 4 Abas: Resumo, Explicação, Exemplos, Prática */}

  <TabsContent value="resumo">
    {/* 4 cards numerados (ModuleConsolidation) */}
  </TabsContent>

  <TabsContent value="explicacao">
    {/* ContentAccordion com tópicos detalhados */}
  </TabsContent>

  <TabsContent value="exemplos">
    {/* CardCarousel com exemplos práticos */}
  </TabsContent>

  <TabsContent value="pratica">
    {/* QuizInterativo com questões do módulo */}
  </TabsContent>
</AulaTemplate>
```

### 3.2 Aba "Resumo" — 4 Cards Numerados
```tsx
<ModuleConsolidation variant={variant} cards={[
  {
    id: 1,
    label: "Conceito 1",
    description: "Descrição...",
    color: variant.cardBg
  },
  {
    id: 2,
    label: "Conceito 2",
    description: "Descrição...",
    color: variant.cardBg
  },
  // ... até card 4
]} />
```

**Regra:** Exatamente 4 cards numerados (1, 2, 3, 4)
**Indexação:** Numeração deve corresponder aos índices das questões do quiz (Q1, Q2, Q3, Q4 da aba Prática)

### 3.3 Aba "Explicação" — ContentAccordion
```tsx
<ContentAccordion
  items={[
    { title: "Tópico 1", content: "..." },
    { title: "Tópico 2", content: "..." },
    // ... expandível
  ]}
/>
```

### 3.4 Aba "Exemplos" — CardCarousel
```tsx
<CardCarousel
  variant={variant}
  cards={[
    { title: "Exemplo 1", content: "...", caseStudy: "Petrobras..." },
    { title: "Exemplo 2", content: "...", caseStudy: "...", },
    // ... pelo menos 3-5 exemplos
  ]}
  speed={5000}
/>
```

### 3.5 Aba "Prática" — QuizInterativo
```tsx
<QuizInterativo
  quiz={quizM1}  // Questões do módulo
  moduleId="modulo-1"
  onComplete={(score) => handleModuleComplete("modulo-1", score)}
  tema="tema-administracao"
/>
```

**Regra Crítica:**
- Quiz deve ter **mínimo 5 questões** (idealmente 6-10)
- **Cada questão corresponde a um card** da aba "Resumo"
- Q1 explora Card 1, Q2 explora Card 2, etc.

---

## 4️⃣ ARQUIVO DE QUIZZES (data/quizzes/{nome}-quizzes.ts)

### 4.1 Estrutura
```tsx
import { QuizQuestion } from "@/components/aulas/shared";

export const QUIZ_NOME: Record<string, QuizQuestion[]> = {
  "modulo-1": [
    {
      id: 101,
      pergunta: "Pergunta sobre Card 1 do módulo...",
      opcoes: [
        { label: "A", valor: "Opção A" },
        { label: "B", valor: "Opção B" },
        { label: "C", valor: "Opção C" },
        { label: "D", valor: "Opção D" },
        { label: "E", valor: "Opção E" }
      ],
      correta: "C",
      explicacao: "Justificativa detalhada com contexto Petrobras..."
    },
    // 4-6 questões por módulo (Q1 → Card 1, Q2 → Card 2, etc.)
  ],
  "modulo-2": [ /* ... */ ],
  // ... até "modulo-10"
};
```

### 4.2 Regras de IDs
- **Módulo 1:** IDs 101-109 (primeira centena)
- **Módulo 2:** IDs 201-209 (segunda centena)
- **Módulo N:** IDs N01-N09 (centena N)
- **Módulo 10:** IDs 1001-1009 (milhar)

### 4.3 Regra de Índice Progressivo
```
Card 1 (índice no resumo) → Questão Q1 (primeira pergunta do quiz)
Card 2 → Q2
Card 3 → Q3
Card 4 → Q4
(Se houver mais de 4 questões, elas cobrem detalhes/aplicação)
```

---

## 5️⃣ PADRÃO NARRATIVO DE MÓDULOS

### M1: Conceitos Fundamentais
- 4 cards: Definições básicas, características, história, aplicação básica
- Quiz: Definições, diferenças, fundamentos

### M2-M7: Aprofundamento Progressivo
- Cada uma aborda um aspecto ou ferramental específico
- Evoluir em dificuldade e complexidade
- Sempre com contexto Petrobras (exemplos reais)

### M8: Síntese/Revisão ou Resolução Reversa
- Integra conceitos de M1-M7
- Pratica resolução de problemas complexos
- Ou: Revisão com casos avançados

### M9: Aplicações Petrobras (ESSENCIAL)
- Casos reais da empresa
- Contexto específico de negócio
- Decisões corporativas reais

### M10: Simulado Mestre
- Prova completa com questões de todas as áreas
- 15-20 questões integradas
- Nível de dificuldade: Médio-Alto (concurso real)

---

## 6️⃣ CHECKLIST POR MÓDULO (antes de commitar)

### Estrutura
- [ ] MODULE_DEFS com exatos 10 módulos
- [ ] IDs padronizados: "modulo-1" até "modulo-10"
- [ ] States: activeTab, completedModules inicializados

### Conteúdo (para CADA módulo)
- [ ] AulaTemplate com 4 TabsContent (resumo, explicacao, exemplos, pratica)
- [ ] ModuleConsolidation: exatos 4 cards numerados
- [ ] ContentAccordion: 3+ tópicos detalhados
- [ ] CardCarousel: 3-5 exemplos com contexto Petrobras
- [ ] QuizInterativo: 4-6 questões, Q1↔Card1, Q2↔Card2, etc.

### Cores e Visual
- [ ] variant = getModuleVariant(moduleNumber) para cada módulo
- [ ] Cores aplicadas em: Banner, SectionHeader, ModuleConsolidation, CardCarousel
- [ ] Consistência visual entre módulos

### Arquivo de Quizzes
- [ ] `data/quizzes/{nome}-quizzes.ts` criado
- [ ] Record com 10 chaves: "modulo-1" até "modulo-10"
- [ ] IDs por centena (101-109, 201-209, etc.)
- [ ] Mínimo 4 questões por módulo
- [ ] Explicações com contexto Petrobras

### Funcionalidade
- [ ] Cada módulo desbloqueia após o anterior (completedModules logic)
- [ ] Score ≥ 70% = módulo completo
- [ ] Badge de conclusão no M10 (Completion Badge)
- [ ] Progresso sincronizado com onUpdateProgress

### Documentação
- [ ] CLAUDE.md atualizado com padrão
- [ ] Comentários explicando lógica de cores e índices
- [ ] Documentação de quiz em arquivo

---

## 7️⃣ TAMANHO ESPERADO

**Aula Completa (carcaça + conteúdo):** ~2.500 linhas
- AulaNome.tsx: ~750 linhas (estrutura + 10 módulos)
- data/quizzes/nome-quizzes.ts: ~500 linhas (10 módulos × 4-6 q)
- Resto: Compostos e chamadas de componentes

**Arquivo Quiz Detalhado:** ~700-1000 linhas
- 10 módulos
- 4-6 questões por módulo
- Explicações ricas com contexto Petrobras

---

## 8️⃣ EXEMPLO: Estrutura M1 (Bloco I - Planejamento)

### Cards (Resumo)
1. Missão, Visão, Valores
2. Análise SWOT
3. Balanced Scorecard
4. Diferenças Nível Estratégico/Tático/Operacional

### Explicação (ContentAccordion)
- O que é Missão?
- O que é Visão?
- O que são Valores?
- Relacionamento com planejamento estratégico

### Exemplos (CardCarousel)
- Missão da Petrobras real
- Visão 2030 (caso real)
- Valores corporativos da empresa
- Como Petrobras aplica no dia-a-dia

### Prática (QuizInterativo)
- Q1: Conceito de Missão (baseia Card 1)
- Q2: Diferença Visão vs Missão (baseia Card 1)
- Q3: Análise SWOT na Petrobras (baseia Card 2)
- Q4: Níveis de planejamento (baseia Card 4)
- Q5+: Aplicações integradas

---

## ✅ PRÓXIMAS AULAS (Bloco II)

### Aulas Planejadas
1. **AulaGestaoProcessos** — Carcaça 358L (expandir a 750L)
2. **AulaGestaoProjetos** — Carcaça 188L (expandir a 750L)
3. **AulaGovernancaCorporativa** — Carcaça 188L (expandir a 750L)

### Ordem de Prioridade
1. AulaGestaoProcessos (já tem mais conteúdo)
2. AulaGestaoProjetos
3. AulaGovernancaCorporativa

---

## 📎 REFERÊNCIAS RÁPIDAS

- **Color System:** `/src/lib/moduleColors.ts` → `getModuleVariant(1-10)`
- **Quiz Base Interface:** `/src/components/aulas/shared.ts` → `QuizQuestion`
- **Exemplo Completo:** `/src/components/aulas/administracao/AulaPlanejamentoEstrategico.tsx`
- **Quiz Exemplo:** `/src/data/quizzes/planejamento-quizzes.ts`
- **Template Padrão:** `/src/components/aulas/shared/AulaTemplate.tsx`
