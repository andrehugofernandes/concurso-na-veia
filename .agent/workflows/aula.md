---
description: Criar ou enriquecer aulas de concurso com conteúdo premium estilo CESGRANRIO
---

# /aula — Workflow de Criação/Enriquecimento de Aulas

// turbo-all

## Modo de Uso

```
/aula criar [materia] [topico]     → Cria aula premium do zero
/aula upgrade [arquivo.tsx]        → Enriquece aula rasa existente
```

---

## PASSO 1: Identificar os dados do tópico

1. Ler `source/conteudo/matematica.md` ou `source/conteudo/lingua-portuguesa.md`
2. Ler `source/PRD_NotebookLM_Conteudo_Aulas.md` (seções 3 e 5)
3. Identificar o `topicoId` em `src/data/conteudo.ts`

## PASSO 2: Criar arquivo de quizzes (se não existe)

Criar `src/components/aulas/[materia]/data/[topico]-quizzes.ts`

### Regras para quizzes CESGRANRIO:

- **5 pools** (1 por módulo), **mínimo 6-8 questões** por pool
- Formato: `{ id, pergunta, opcoes: [{label, valor}], correta, explicacao }`
- **Enunciado contextualizado** com situação Petrobras/industrial
- **Distratores plausíveis** — erros comuns que candidatos cometem
- **Explicação pedagógica** — explica POR QUE cada alternativa está certa/errada
- **Variação de dificuldade**: 20% fácil, 50% médio, 30% difícil
- Import: `import { QuizQuestion } from "../../shared";`

## PASSO 3: Criar/reescrever o componente da aula

### Se CRIAR do zero:

Criar `src/components/aulas/[materia]/Aula[Nome].tsx`

### Se UPGRADE de aula rasa:

1. Manter a estrutura existente (MODULE_DEFS, estado, handlers)
2. Mover quizzes inline para arquivo `data/[topico]-quizzes.ts`
3. Substituir imports: `import { QUIZ_M1_..., QUIZ_M2_... } from "./data/[topico]-quizzes"`
4. ENRIQUECER cada módulo com conteúdo didático (ver abaixo)

### Conteúdo obrigatório por módulo:

```tsx
<TabsContent value="modulo-X">
  <ModuleBanner ... />
  <div className="space-y-[50px]">

    {/* SEÇÃO 1: Conceito principal */}
    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
      <ModuleSectionHeader ... />
      <ContentAccordion slides={[
        // SLIDE 1: Definição + Explicação Intuitiva
        // SLIDE 2: Regras/Fórmulas com exemplos visuais
        // SLIDE 3: Exemplos resolvidos passo a passo (mínimo 2)
      ]} />
      <AlertBox tipo="warning"> {/* Pegadinha CESGRANRIO */} </AlertBox>
    </section>

    {/* SEÇÃO 2 (opcional): Subtópico ou Tabela de Resumo */}
    <section className="bg-card rounded-2xl border ...">
      <ModuleSectionHeader ... />
      <CardCarousel /> ou tabela de comparação
      <AlertBox tipo="info"> {/* Contexto Petrobras */} </AlertBox>
    </section>

    {/* QUIZ */}
    <section id="quiz-modulo-X">
      <QuizInterativo questoes={quizMX} ... />
    </section>
  </div>
</TabsContent>
```

### Checklist de conteúdo por slide de accordion:

| Elemento             | Obrigatório?          | Descrição                                  |
| -------------------- | --------------------- | ------------------------------------------ |
| Definição formal     | ✅                    | Conceito matemático/gramatical preciso     |
| Explicação intuitiva | ✅                    | "Em outras palavras..." com analogia       |
| Fórmula destacada    | ✅ (se aplicável)     | Em `<div className="p-5 bg-[cor]/10 ...">` |
| Exemplo resolvido    | ✅ (mín. 2)           | Passo a passo numerado                     |
| Contexto Petrobras   | ✅                    | Como aparece na indústria                  |
| Tabela de regras     | 🔶 (quando aplicável) | Regra vs Exceção vs Exemplo                |
| Pegadinha CESGRANRIO | ✅                    | Em `<AlertBox tipo="warning">`             |

### Imports padrão (copiar):

```tsx
"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox, QuizInterativo, ModuleBanner, QuizQuestion,
  getRandomQuestions, AulaProps, CardCarousel, ContentAccordion,
  AulaTemplate, ModuleSectionHeader,
} from "../shared";
// Quizzes do arquivo de dados:
import { QUIZ_M1_..., QUIZ_M2_..., QUIZ_M3_..., QUIZ_M4_..., QUIZ_M5_... } from "./data/[topico]-quizzes";
```

### Boilerplate de estado (copiar):

```tsx
export default function Aula[Nome]({ onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico }: AulaProps) {

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_..., 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_..., 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_..., 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_..., 5));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_..., 5));
  const isModuleUnlocked = (_index: number) => true;
  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules(prev => { const n = new Set(prev); n.add(moduleId); return n; });
      const idx = ["modulo-1","modulo-2","modulo-3","modulo-4","modulo-5"].findIndex(m => m === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / 5) * 100));
      if (idx < 4) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };
  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 5);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "___" },
    { id: "modulo-2", label: "Módulo 2", titulo: "___" },
    { id: "modulo-3", label: "Módulo 3", titulo: "___" },
    { id: "modulo-4", label: "Módulo 4", titulo: "___" },
    { id: "modulo-5", label: "Módulo 5", titulo: "___" },
  ];
```

## PASSO 4: Registrar no page.tsx (se aula nova)

1. Adicionar dynamic import no topo (após os existentes)
2. Adicionar bloco de render no ternário de rotas

## PASSO 5: Verificar

1. `pnpm dev` — sem erros de build
2. Navegar até a aula no browser
3. Verificar se todos os 5 módulos carregam
4. Verificar se quizzes renderizam

## PASSO 6: Commit

```bash
git add -A
git commit -m "feat([materia]): implementa/enriquece aula [topico] - padrão premium CESGRANRIO"
```

---

## ANTI-PATTERNS (NÃO FAZER)

- ❌ Import `from "./shared"` — SEMPRE use `from "../shared"` (subpasta)
- ❌ Quiz com explicação de 1 frase — mínimo 2 frases explicando certo E errado
- ❌ Módulo só com quiz sem conteúdo didático
- ❌ Menos de 6 questões por pool
- ❌ Questões sem contextualização industrial
- ❌ Usar `respostaCorreta` — use `correta`
- ❌ Usar `title`/`icon` em MODULE_DEFS — use `label`/`titulo`
