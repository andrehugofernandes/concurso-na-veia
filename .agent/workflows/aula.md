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
- Import: `import { QuizQuestion } = "../../shared";`

### Checklist de UI/UX (Design Premium):

- **🔒 StickyModuleNav é IMUTÁVEL**: NUNCA modifique o componente `StickyModuleNav` em `shared.tsx` nem o padding do `<main>` em `admin-dashboard-layout.tsx` (deve permanecer `md:p-0`). O componente depende de cálculos precisos de breakout (margem negativa + calc) relativos ao layout pai. Qualquer alteração quebrará o posicionamento.
- **Purple Ban**: Nunca use roxo/violeta (`purple`, `violet`, `indigo`). Use `blue`, `cyan`, `emerald`, `indigo-950` (quase preto).
  - _Nota: O projeto aceita Indigo mas prefere tons de azul/ciano para tecnologia._
- **Glassmorphism**: Use `bg-card/50 backdrop-blur-md` em overlays.
- **Animações**: Use `framer-motion` para transições de módulo.
- **Ícones**: Use `react-icons/lu` (Lucide) para consistência.

### Padrão de FlipCard Premium (Skin-Aware):

Todo `FlipCard` deve ser rico em conteúdo e design, utilizando o sistema de skins (`primary`).

**Regras de Cores:**

- **Frente:** Deve respeitar o modo `light` (fundo claro/zinc-50) e `dark` (fundo escuro/zinc-900).
- **Verso:** Deve ser **sempre escuro** (`bg-[#0a0a0a]`) para garantir o contraste "Dossiê de Elite" e destacar os elementos `text-primary`, independente do modo do sistema.

| Lado       | Elementos Obrigatórios                                 | Estrutura Sugerida (Sem cores hardcoded!)                                                                                                                                                                                                                                                                         |
| :--------- | :----------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frente** | Ícone + Título + Pergunta/Conceito Chave               | `<div className="flex flex-col items-center justify-center h-full gap-4 text-center">` <br/> `<Icon className="w-12 h-12 text-primary opacity-50" />` <br/> `<h6 className="text-xl font-bold uppercase tracking-tight">Título</h6>` <br/> `<p className="font-medium">Pergunta ou Provocação</p>` <br/> `</div>` |
| **Verso**  | Ícone de Check + Título de Resposta + Explicação Densa | `<div className="space-y-4">` <br/> `<p className="text-sm leading-relaxed text-zinc-100">Conteúdo denso com **negritos** estratégicos.</p>` <br/> `<div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">**Dica de Elite:** Macete tático...</div>` <br/> `</div>`         |

**Regra de Ouro**: O Verso deve ser uma "mini-aula" com visual de dossiê técnico.

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

    {/* CONSOLIDAÇÃO PREMIUM (Mesa de Revisão) - OBRIGATÓRIO */}
    <ModuleConsolidation
      index={X}
      variant="indigo" // ou emerald, blue, cyan
      video={{
        videoId: "...",
        title: "...",
        duration: "..."
      }}
      resumoVisual={{
        moduloNome: "...",
        tituloAula: "...",
        materia: "...",
        images: [
          { title: "...", type: "...", placeholderColor: "...", imageUrl: "/temp-img.png" }
        ]
      }}
      maceteVisual={{
        title: "...",
        content: (
          <div className="space-y-4">
            {/* Conteúdo do macete (JSX) */}
          </div>
        )
      }}
      audio={{
        audioUrl: "...",
        titulo: "...",
        artista: "..."
      }}
    />

    {/* QUIZ */}
    <section id="quiz-modulo-X">
      <QuizInterativo questoes={quizMX} ... />
    </section>
  </div>
</TabsContent>
```

### 💎 Protocolo C.E.D.E. (Crivo de Conteúdo Imperativo)

Nenhum componente (`ContentAccordion`, `FlipCard`, `CardCarousel`) ou introdução de módulo deve ser criado sem passar pelo crivo **C.E.D.E.**:

| Pilar | Nome               | Descrição                                  | Exemplo de Implementação                                       |
| :---- | :----------------- | :----------------------------------------- | :------------------------------------------------------------- |
| **C** | **Conceituação**   | Definição técnica e intuitiva do assunto.  | "O que é?" - Linguagem clara + Termo Técnico.                  |
| **E** | **Exemplificação** | Aplicação prática e real (foco Petrobras). | "Na prática..." - Mínimo 2 exemplos variados.                  |
| **D** | **Dicas**          | Macetes e 'pulos do gato' para a prova.    | "Pulo do Gato!" - Como ganhar tempo ou não cair em pegadinha.  |
| **E** | **Exceções**       | Onde a regra falha ou casos especiais.     | "Cuidado!" - Se não houver exceção, mencione o cenário limite. |

---

### Checklist de conteúdo por slide de accordion:

| Elemento             | Obrigatório?      | Descrição                                  |
| -------------------- | ----------------- | ------------------------------------------ |
| **C**onceituação     | ✅                | Definição formal + Intuitiva               |
| **E**xemplificação   | ✅ (mín. 2)       | Passo a passo numerado (foco Petrobras)    |
| **D**icas            | ✅                | Macete visual ou gatilho mental            |
| **E**xceções         | ✅                | Onde o candidato mais erra ou casos raros  |
| Fórmula destacada    | ✅ (se aplicável) | Em `<div className="p-5 bg-[cor]/10 ...">` |
| Contexto Petrobras   | ✅                | Como aparece na indústria                  |
| Pegadinha CESGRANRIO | ✅                | Em `<AlertBox tipo="warning">`             |

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

### Boilerplate de estado dinâmico (copiar):

```tsx
export default function Aula[Nome]({ onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico }: AulaProps) {

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  // Definir os módulos da aula (Padrão Premium: 8 a 12 módulos)
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos Iniciais" },
    { id: "modulo-2", label: "Módulo 2", titulo: "..." },
    // Adicione quantos módulos forem necessários para esgotar o PDF/NotebookLM
  ];

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules(prev => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = MODULE_DEFS.findIndex(m => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));

      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress, totalModulos]);
```

````

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
````

---

## ANTI-PATTERNS (NÃO FAZER)

- ❌ Import `from "./shared"` — SEMPRE use `from "../shared"` (subpasta)
- ❌ Quiz com explicação de 1 frase — mínimo 2 frases explicando certo E errado
- ❌ Mais de 12 ou menos de 5 módulos (equilibrar densidade vs cansaço)
- ❌ Módulo só com quiz sem conteúdo didático
- ❌ Questões sem contextualização industrial
- ❌ Usar `respostaCorreta` — use `correta`
- ❌ Usar `title`/`icon` em MODULE_DEFS — use `label`/`titulo`

---

> [!IMPORTANT]
> **COMPORTAMENTO DO CARROSSEL (StickyModuleNav)**
> No desktop, o carrossel de abas é ativado quando o número de módulos excede **6**. Se uma aula possuir 10 ou mais módulos, **NÃO** altere o `PAGE_SIZE` para um valor alto (ex: 10) no `shared.tsx`. Isso desativa as setas de navegação e quebra a estética do menu centrado. Mantenha o padrão de exibição parcial para preservar a funcionalidade de "scroll" lateral e o alinhamento visual premium.
