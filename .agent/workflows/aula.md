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

- **Purple Ban**: Nunca use roxo/violeta (`purple`, `violet`, `indigo`). Use `blue`, `cyan`, `emerald`, `indigo-950` (quase preto).
  - _Nota: O projeto aceita Indigo mas prefere tons de azul/ciano para tecnologia._
- **Glassmorphism**: Use `bg-card/50 backdrop-blur-md` em overlays.
- **Animações**: Use `framer-motion` para transições de módulo.
- **Ícones**: Use `react-icons/lu` (Lucide) para consistência.

### Padrão de FlipCard Premium:

Todo `FlipCard` deve ser rico em conteúdo e design, evitando textos planos.

| Lado       | Elementos Obrigatórios                                 | Estrutura Sugerida                                                                                                                                                                                                                                                                                           |
| :--------- | :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frente** | Ícone + Título + Pergunta/Conceito Chave               | `<div className="flex flex-col items-center justify-center h-full gap-4">` <br/> `<Icon className="w-12 h-12 text-primary opacity-50" />` <br/> `<h6 className="text-xl font-bold uppercase tracking-tight">Título</h6>` <br/> `<p className="text-sm text-center">Conceito ou Pergunta</p>` <br/> `</div>`  |
| **Verso**  | Ícone de Check + Título de Resposta + Explicação Densa | `<div className="space-y-4">` <br/> `<div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-white/10 pb-2">` <br/> `<LuCheck /> <span>Explicação Master</span>` <br/> `</div>` <br/> `<p className="text-sm leading-relaxed">Conteúdo detalhado com exemplos</p>` <br/> `</div>` |

**Regra de Ouro**: O Verso deve ser uma "mini-aula". Se o candidato virar o card e ler apenas uma linha, o card faliu em sua missão pedagógica.

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

    {/* RESUMO E MULTIMÍDIA (Mesa de Revisão) */}
    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
      <ModuleSectionHeader index={2} title="Resumo e Multimídia" variant="indigo" />
      <LessonTabs tabs={[
        {
          id: "resumo",
          label: "Resumo Visual",
          icon: LuBookOpen,
          content: (
            <ModuleSummaryCarouselNew
              images={[
                {
                  title: "Diagrama Técnico X",
                  type: "Infográfico",
                  placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                  imageUrl: "/temp-img.png", // PROMPT: Descrição detalhada para o Nano Banana...
                },
              ]}
              moduloNome="..."
              tituloAula="..."
              materia="..."
            />
          ),
        },
      ]} />
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
