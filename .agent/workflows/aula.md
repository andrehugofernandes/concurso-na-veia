---
description: Criar ou enriquecer aulas de concurso com conteúdo premium estilo CESGRANRIO
---

# /aula — Ultimate Workflow de Criação de Aulas Premium

// turbo-all

> **VERSÃO DEFINITIVA** — Consolida todos os PRDs, skills, padrões de design, scripts de fix e lições aprendidas de 43+ aulas criadas.

---

## 🤖 AGENTES E SKILLS ATIVADOS

Ao executar este workflow, os seguintes agentes e skills são automaticamente carregados:

| Agente                  | Responsabilidade                                  | Skills Carregadas                                                            |
| ----------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------- |
| `frontend-specialist`   | Componentes React, design premium, acessibilidade | `frontend-design`, `react-best-practices`, `tailwind-patterns`, `clean-code` |
| `backend-specialist`    | Integração com Supabase, API, dados               | `api-patterns`, `nodejs-best-practices`, `database-design`                   |
| `security-auditor`      | Segurança de dados, XSS em conteúdo dinâmico      | `vulnerability-scanner`                                                      |
| `test-engineer`         | Verificação de build, testes de componentes       | `testing-patterns`, `webapp-testing`                                         |
| `seo-specialist`        | Meta tags, acessibilidade, indexação              | `seo-fundamentals`                                                           |
| `performance-optimizer` | Bundle size, lazy loading, Core Web Vitals        | `performance-profiling`                                                      |
| `project-planner`       | Estruturação do conteúdo, scopping                | `plan-writing`, `brainstorming`                                              |

**Skills Específicas do Projeto (OBRIGATÓRIAS):**

- `acordeon-carrossel` → Padrão de `ContentAccordion` com modo `stacked`
- `clean-code` → Código limpo, sem over-engineering

---

## 📖 CONTEXTO DO PRODUTO

### O que é "A Vaga É Minha"

Plataforma SaaS de preparação para **concursos públicos** (foco: Petrobras 2026, banca CESGRANRIO). Aulas interativas com quizzes, gamificação (XP, medalhas, streaks), simulados e progresso personalizado.

### Stack Técnica

| Camada         | Tecnologia                                 |
| -------------- | ------------------------------------------ |
| Frontend       | Next.js 15 (App Router), React, TypeScript |
| Estilização    | Tailwind CSS v4 + shadcn/ui                |
| Backend        | Next.js Route Handlers + Supabase          |
| Banco de Dados | Supabase (PostgreSQL)                      |
| Animações      | Framer Motion                              |
| Ícones         | `react-icons/lu` (Lucide)                  |

### Banca CESGRANRIO vs Cebraspe

| Aspecto       | CESGRANRIO (2026)                               |
| ------------- | ----------------------------------------------- |
| Formato       | Múltipla Escolha (5 alternativas: A-E)          |
| Penalização   | Sem penalização                                 |
| Estilo        | Enunciados contextualizados + pergunta direta   |
| Interpretação | Contextualizado, "pegadinhas" sutis             |
| Matemática    | Cálculos aplicados + interpretação de enunciado |
| Português     | Interpretação de texto + gramática aplicada     |

---

## 📚 DOCUMENTOS-FONTE DO EDITAL (OBRIGATÓRIO CONSULTAR)

> [!CAUTION]
> **ANTES de criar qualquer aula**, a LLM DEVE consultar os documentos abaixo para extrair os tópicos exatos do edital, nomes de cargos, e blocos de conteúdo. Estes documentos são a FONTE DE VERDADE para saber o que ensinar.

### Documentos Estruturais (Cargos + Matérias)

| Documento                           | Caminho                                                               | O que contém                                                                                                                                                                                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Guia de Matérias por Edital**     | `source/Guia Estruturado de Matérias - Petrobras Edital 2023.2.md`    | 16 profissões nível técnico com 3 blocos de conhecimento cada. Mapeamento completo: Saúde, Manutenção, Operação, Projetos, Logística, Química                                                                                                                  |
| **Relatório Detalhado de Matérias** | `source/relatorio_materias_petrobras.md`                              | **248 linhas** — Detalhamento exaustivo das matérias por profissão. **Nível Técnico** (16 ênfases, edital 2023.2) + **Nível Superior** (24 ênfases, edital 2021). Cada ênfase com Blocos I, II e III descritivos. **USAR PARA PESQUISAR CONTEÚDO NA INTERNET** |
| **Relação de Profissões**           | `source/Relação de Profissões Petrobras por Nível de Escolaridade.md` | Classificação por categoria (Saúde, Manutenção, Operação, etc.) e nível (Médio/Técnico vs Superior). Ideal para o sistema de seleção de cargo                                                                                                                  |

### Níveis de Escolaridade e Ênfases

#### Nível Médio/Técnico (Edital 2023.2 — 16 ênfases)

| Categoria               | Profissões                                           |
| ----------------------- | ---------------------------------------------------- |
| **Saúde e Segurança**   | Enfermagem do Trabalho; Segurança do Trabalho        |
| **Manutenção**          | Caldeiraria; Elétrica; Instrumentação; Mecânica      |
| **Operação**            | Operação; Operação de Lastro                         |
| **Projetos e Montagem** | Edificações; Elétrica; Instrumentação; Mecânica      |
| **Suporte e Logística** | Logística de Transportes; Suprimento (Administração) |
| **Inspeção e Química**  | Inspeção de Equipamentos; Química de Petróleo        |

#### Nível Superior (Edital 2021 — 24 ênfases)

| Categoria       | Profissões                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Engenharias** | Petróleo, Processamento, Produção, Civil, Elétrica, Eletrônica, Mecânica, Naval, Ambiental, Seg. Processo, Seg. Trabalho, Terminais e Dutos |
| **Tecnologia**  | Ciência de Dados; Analista de Sistemas (Eng. Software, Infra, Processos de Negócio)                                                         |
| **Geociências** | Geologia; Geofísica (Física e Geologia)                                                                                                     |
| **Gestão**      | Administração; Economia; Comércio e Suprimento; Transporte Marítimo                                                                         |

### Conteúdo Didático Existente

| Documento                       | Caminho                                          | O que contém                                             |
| ------------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| **Conteúdo de Português**       | `source/conteudo/lingua-portuguesa.md`           | Base teórica de Língua Portuguesa (resumo para expansão) |
| **Conteúdo de Matemática**      | `source/conteudo/matematica.md`                  | Base teórica de Matemática (resumo para expansão)        |
| **Perfil CESGRANRIO Português** | `source/conteudo/PERFIL_CESGRANRIO_PORTUGUES.md` | Análise do estilo da banca em Português                  |
| **Prompt de Aula EAD**          | `source/PROMPT_AULA_EAD.md`                      | Template de construção de aulas                          |
| **PRD NotebookLM**              | `source/PRD_NotebookLM_Conteudo_Aulas.md`        | Requisitos de conteúdo por módulo, formato de questão    |
| **PRD A Vaga É Minha**          | `source/PRD_A_VAGA_E_MINHA.md`                   | Visão do produto, funcionalidades, stack                 |

### Aulas HTML de Referência (Conteúdo Rico — Português)

11 arquivos completos com conteúdo expandido para aulas de Português:

```
source/conteudo/AULA_CLASSES_PALAVRAS_HTML_COMPLETO.md
source/conteudo/AULA_COESAO_COERENCIA_HTML_COMPLETO.md
source/conteudo/AULA_CONCORDANCIA_HTML_COMPLETO.md
source/conteudo/AULA_CRASE_HTML_COMPLETO.md
source/conteudo/AULA_INTERPRETACAO_TEXTO_HTML_COMPLETO.md
source/conteudo/AULA_ORTOGRAFIA_HTML_COMPLETO.md
source/conteudo/AULA_PONTUACAO_HTML_COMPLETO.md
source/conteudo/AULA_REESCRITA_FRASES_HTML_COMPLETO.md
source/conteudo/AULA_REGENCIA_HTML_COMPLETO.md
source/conteudo/AULA_SINTAXE_HTML_COMPLETO.md
source/conteudo/AULA_TIPOS_TEXTUAIS_HTML_COMPLETO.md
```

### PDFs de Conteúdo Específico (Administração)

```
source/conteudo/01 SL 061FV 26 PREP PETROBRAS SUPRIM_Língua Portuguesa.pdf
source/conteudo/03 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Específicos.pdf
source/conteudo/04 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Específicos.pdf
source/conteudo/05 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Específicos.pdf
```

### Prompts de Geração de Mídia

| Prompt                    | Caminho                                 | Uso                                 |
| ------------------------- | --------------------------------------- | ----------------------------------- |
| **Imagens (Nano Imagen)** | `source/PROMPTS_IMAGENS_NANO_IMAGEN.md` | Gerar imagens educacionais premium  |
| **Vídeos (Veo)**          | `source/PROMPTS_VIDEOS_VEO.md`          | Gerar vídeos de resumo              |
| **Músicas (Suno)**        | `source/PROMPT_MUSICA_SUNO.md`          | Gerar áudio-resumo (rap pedagógico) |

> [!TIP]
> **Workflow de pesquisa**: Ao criar uma aula de matéria específica (ex: Administração > Governança Corporativa), a LLM deve:
>
> 1. Consultar `relatorio_materias_petrobras.md` → Identificar os tópicos exatos no Bloco I/II/III
> 2. Usar os tópicos como queries de pesquisa na internet para conteúdo denso
> 3. Cruzar com `PRD_NotebookLM_Conteudo_Aulas.md` → Aplicar formato CESGRANRIO
> 4. Se houver PDF correspondente → Usar como fonte primária de conteúdo

---

## MODO DE USO

```
/aula criar [materia] [topico]     → Cria aula premium do zero
/aula upgrade [arquivo.tsx]        → Enriquece aula rasa existente
```

---

## FLUXO COMPLETO (7 PASSOS)

### PASSO 1: Identificar os dados do tópico

1. Ler `source/conteudo/matematica.md` ou `source/conteudo/lingua-portuguesa.md`
2. Ler `source/PRD_NotebookLM_Conteudo_Aulas.md` (seções 3 e 5)
3. Identificar o `topicoId` em `src/data/conteudo.ts`
4. Verificar se a matéria é `administracao`, `matematica` ou `portugues`

### PASSO 2: Criar arquivo de quizzes (SEPARADO do componente)

Criar `src/components/aulas/[materia]/data/[topico]-quizzes.ts`

> [!IMPORTANT]
> **Quizzes ficam OBRIGATORIAMENTE em arquivo separado.** Nunca inline no componente.
> O componente `.tsx` deve ter 2500+ linhas SEM contar os quizzes.

#### Regras para quizzes CESGRANRIO:

- **5 pools** (1 por módulo mínimo), **6-8 questões** por pool
- Formato TypeScript:

```ts
import { QuizQuestion } from "../../shared";

export const QUIZ_M1_NOME: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Enunciado contextualizado com situação Petrobras/industrial...",
    opcoes: [
      { label: "A", valor: "Distrator plausível 1" },
      { label: "B", valor: "Distrator plausível 2" },
      { label: "C", valor: "RESPOSTA CORRETA" },
      { label: "D", valor: "Distrator plausível 3" },
      { label: "E", valor: "Distrator plausível 4" },
    ],
    correta: "C",
    explicacao:
      "Explicação pedagógica detalhada: por que C está certa e por que A, B, D, E estão erradas. Mínimo 2 frases.",
  },
  // ... mais 5-7 questões
];
```

- **Enunciado contextualizado** com situação Petrobras/industrial
- **Distratores plausíveis** — erros comuns que candidatos cometem
- **Explicação pedagógica** — explica POR QUE cada alternativa está certa/errada (mínimo 2 frases)
- **Variação de dificuldade**: 20% fácil, 50% médio, 30% difícil
- **Pool mínimo**: 6 questões por pool (para `getRandomQuestions` selecionar aleatoriamente)
- **Import correto**: `import { QuizQuestion } from "../../shared";`

### PASSO 3: Criar/Reescrever o Componente da Aula

#### Se CRIAR do zero:

Criar `src/components/aulas/[materia]/Aula[Nome].tsx`

#### Se UPGRADE de aula rasa:

1. Manter a estrutura existente (MODULE_DEFS, estado, handlers)
2. Mover quizzes inline para arquivo `data/[topico]-quizzes.ts`
3. Substituir imports
4. ENRIQUECER cada módulo com conteúdo didático denso

---

## 🏗️ ANATOMIA COMPLETA DO COMPONENTE (2500+ linhas)

### Imports Padrão (COPIAR EXATAMENTE):

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
  ModuleConsolidation,
  FlipCard,
  Comparison,
  TimelineItem,
  ComparisonSide,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";

// Quizzes do arquivo de dados (SEPARADO):
import {
  QUIZ_M1_NOME,
  QUIZ_M2_NOME,
  QUIZ_M3_NOME,
  QUIZ_M4_NOME,
  QUIZ_M5_NOME,
} from "./data/[topico]-quizzes";
```

> [!CAUTION]
>
> - ❌ NUNCA `from "./shared"` → SEMPRE `from "../shared"` (subpasta)
> - ❌ NUNCA `respostaCorreta` → use `correta`
> - ❌ NUNCA `title`/`icon` em MODULE_DEFS → use `label`/`titulo`

### Boilerplate de Estado (COPIAR EXATAMENTE):

```tsx
export default function Aula[Nome]({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico
}: AulaProps) {

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  // Definir os módulos da aula (Padrão Premium: 5 a 10 módulos)
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos Iniciais" },
    { id: "modulo-2", label: "Módulo 2", titulo: "..." },
    { id: "modulo-3", label: "Módulo 3", titulo: "..." },
    { id: "modulo-4", label: "Módulo 4", titulo: "..." },
    { id: "modulo-5", label: "Módulo 5", titulo: "..." },
    // Adicione quantos módulos forem necessários (5-10)
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

  // Quiz pools inicializados com getRandomQuestions
  const quizM1 = getRandomQuestions(QUIZ_M1_NOME, 5);
  const quizM2 = getRandomQuestions(QUIZ_M2_NOME, 5);
  const quizM3 = getRandomQuestions(QUIZ_M3_NOME, 5);
  const quizM4 = getRandomQuestions(QUIZ_M4_NOME, 5);
  const quizM5 = getRandomQuestions(QUIZ_M5_NOME, 5);

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* MÓDULOS AQUI */}
    </AulaTemplate>
  );
}
```

---

## 📐 ESTRUTURA DE CADA MÓDULO (TabsContent)

> [!WARNING]
> **ORDEM OBRIGATÓRIA dentro de cada `<TabsContent>`:**
>
> 1. `ModuleBanner`
> 2. `<div className="space-y-[50px]">` (wrapper)
> 3. Seções de conteúdo (2-4 sections com `ModuleSectionHeader` + `ContentAccordion`)
> 4. `ModuleConsolidation` (Mesa de Revisão - 4 abas)
> 5. `QuizInterativo` (SEMPRE o último)
> 6. Fechar `</div>` e `</TabsContent>`

```tsx
<TabsContent value="modulo-1" className="mt-0">
  <ModuleBanner
    numero={1}
    titulo="Conceitos Fundamentais"
    descricao="Neste módulo você aprenderá..."
    variant={getModuleVariant(1)}
  />
  <div className="space-y-[50px]">
    {/* ══════════════════════════════════════════════════════
        SEÇÃO 1: Conceito Principal (card index reinicia por módulo)
        ══════════════════════════════════════════════════════ */}
    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
      <ModuleSectionHeader
        index={1}
        title="Definição e Contexto"
        variant={getModuleVariant(1)}
      />

      {/* ACORDEON C.E.D.E. — Conceituação */}
      <ContentAccordion
        titulo="Conceituação - Definição Técnica"
        icone="📖"
        corIndicador="bg-blue-500"
        defaultOpen={true}
        mode="stacked"
        slides={[
          {
            conteudo: (
              <div className="space-y-8">
                {/* Conteúdo rico aqui - mínimo 40+ linhas de JSX */}
              </div>
            ),
          },
        ]}
      />

      {/* ACORDEON C.E.D.E. — Exemplificação */}
      <ContentAccordion
        titulo="Exemplificação - Casos Práticos"
        icone="📚"
        corIndicador="bg-emerald-500"
        defaultOpen={false}
        mode="stacked"
        slides={[
          {
            conteudo: (
              <div className="space-y-8">
                {/* Mínimo 2 exemplos resolvidos passo a passo */}
              </div>
            ),
          },
        ]}
      />

      {/* ACORDEON C.E.D.E. — Dicas */}
      <ContentAccordion
        titulo="Dicas - Macetes para a Prova"
        icone="💡"
        corIndicador="bg-amber-500"
        defaultOpen={false}
        mode="stacked"
        slides={[
          {
            conteudo: (
              <div className="space-y-8">
                {/* Macetes, truques, atalhos mentais */}
              </div>
            ),
          },
        ]}
      />

      {/* ACORDEON C.E.D.E. — Exceções */}
      <ContentAccordion
        titulo="Exceções - Pegadinhas CESGRANRIO"
        icone="⚠️"
        corIndicador="bg-red-500"
        defaultOpen={false}
        mode="stacked"
        slides={[
          {
            conteudo: (
              <div className="space-y-8">
                {/* Onde a regra falha, casos especiais */}
              </div>
            ),
          },
        ]}
      />

      <AlertBox tipo="warning" titulo="⚠️ Pegadinha CESGRANRIO">
        Texto da pegadinha com exemplo prático.
      </AlertBox>
    </section>

    {/* ══════════════════════════════════════════════════════
        SEÇÃO 2: Subtópico Aprofundado (opcional mas recomendado)
        ══════════════════════════════════════════════════════ */}
    <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
      <ModuleSectionHeader
        index={2}
        title="Regras e Aplicações"
        variant={getModuleVariant(1)}
      />

      {/* CardCarousel para comparações, FlipCards para memorização, etc. */}
      <CardCarousel
        cards={[
          { titulo: "Regra 1", descricao: <div>...</div> },
          { titulo: "Regra 2", descricao: <div>...</div> },
          { titulo: "Regra 3", descricao: <div>...</div> },
        ]}
      />

      <AlertBox tipo="info" titulo="📌 Contexto Petrobras">
        Como isso se aplica no dia a dia de um técnico Petrobras.
      </AlertBox>
    </section>

    {/* ══════════════════════════════════════════════════════
        CONSOLIDAÇÃO PREMIUM (Mesa de Revisão) — OBRIGATÓRIO
        Deve vir ANTES do Quiz, DEPOIS de todas as seções
        ══════════════════════════════════════════════════════ */}
    <ModuleConsolidation
      index={1}
      variant={getModuleVariant(1)}
      video={{
        videoId: "dQw4w9WgXcQ",
        title: "Resumo em Vídeo - Módulo 1",
        duration: "8:30",
      }}
      resumoVisual={{
        moduloNome: "Módulo 1 - Conceitos Fundamentais",
        tituloAula: titulo,
        materia: materiaNome,
        images: [
          {
            title: "Mapa Mental",
            type: "Infográfico",
            placeholderColor: "blue",
            imageUrl: "/temp-img.png",
          },
          {
            title: "Tabela Resumo",
            type: "Card",
            placeholderColor: "emerald",
            imageUrl: "/temp-img.png",
          },
          {
            title: "Diagrama",
            type: "Diagrama",
            placeholderColor: "cyan",
            imageUrl: "/temp-img.png",
          },
        ],
      }}
      maceteVisual={{
        title: "Macete Visual - Módulo 1",
        content: (
          <div className="space-y-4">
            {/* Conteúdo JSX do macete visual */}
            <p className="text-lg font-bold">🎯 Regra de Ouro:</p>
            <p className="text-base">Macete mnemônico para memorizar...</p>
          </div>
        ),
      }}
      audio={{
        audioUrl: "/audio/modulo1-resumo.mp3",
        titulo: "Resumo em Áudio - Módulo 1",
        artista: "A Vaga É Minha",
      }}
    />

    {/* ══════════════════════════════════════════════════════
        QUIZ (SEMPRE O ÚLTIMO DO MÓDULO)
        ══════════════════════════════════════════════════════ */}
    <section id="quiz-modulo-1">
      <QuizInterativo
        questoes={quizM1}
        titulo="Conceitos Fundamentais"
        variant={getModuleVariant(1)}
        onComplete={(score) => handleModuleComplete("modulo-1", score)}
      />
    </section>
  </div>
</TabsContent>
```

---

## 💎 PROTOCOLO C.E.D.E. (Crivo de Conteúdo Imperativo)

**Nenhum componente (`ContentAccordion`, `FlipCard`, `CardCarousel`) ou introdução de módulo deve ser criado sem passar pelo crivo C.E.D.E.:**

| Pilar | Nome               | Descrição                                 | Implementação                                                 |
| :---- | :----------------- | :---------------------------------------- | :------------------------------------------------------------ |
| **C** | **Conceituação**   | Definição técnica e intuitiva             | "O que é?" - Linguagem clara + Termo Técnico                  |
| **E** | **Exemplificação** | Aplicação prática e real (foco Petrobras) | "Na prática..." - Mínimo 2 exemplos variados                  |
| **D** | **Dicas**          | Macetes e 'pulos do gato' para a prova    | "Pulo do Gato!" - Como ganhar tempo ou não cair em pegadinha  |
| **E** | **Exceções**       | Onde a regra falha ou casos especiais     | "Cuidado!" - Se não houver exceção, mencione o cenário limite |

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

---

## 🎨 REGRAS DE DESIGN PREMIUM

### Checklist Visual (OBRIGATÓRIO):

- **🔒 StickyModuleNav é IMUTÁVEL**: NUNCA modifique `StickyModuleNav` em `shared.tsx` nem o padding do `<main>` em `admin-dashboard-layout.tsx` (deve permanecer `md:p-0`).
- **Purple Ban**: Nunca use roxo/violeta (`purple`, `violet`, `indigo`) como cor primária. Use `blue`, `cyan`, `emerald`.
- **Glassmorphism**: Use `bg-card/50 backdrop-blur-md` em overlays.
- **Animações**: Use `framer-motion` para transições de módulo.
- **Ícones**: Use `react-icons/lu` (Lucide) para consistência.
- **Cores dinâmicas**: SEMPRE use `getModuleVariant(index)` — NUNCA hardcode `variant="blue"`.

### Padrão de FlipCard Premium (Skin-Aware):

| Lado       | Elementos Obrigatórios                           | Estrutura                      |
| :--------- | :----------------------------------------------- | :----------------------------- |
| **Frente** | Ícone + Título + Pergunta/Conceito               | Respeita modo `light`/`dark`   |
| **Verso**  | Ícone Check + Título Resposta + Explicação Densa | SEMPRE escuro (`bg-[#0a0a0a]`) |

**Regra de Ouro**: O Verso deve ser uma "mini-aula" com visual de dossiê técnico.

### Padrão de ContentAccordion (Tipo 3 - FINAL):

```tsx
<ContentAccordion
  titulo="Título SEM emoji" // ← Emoji vai APENAS em icone
  icone="📖" // ← Emoji aparece no badge
  corIndicador="bg-blue-500"
  defaultOpen={true} // ← Primeiro aberto, demais false
  mode="stacked" // ← OBRIGATÓRIO
  slides={[
    {
      // ← 1 único slide, sem titulo dentro
      conteudo: <div className="space-y-8">{/* Conteúdo rico C.E.D.E. */}</div>,
    },
  ]}
/>
```

**Regras imperativas:**

1. `mode="stacked"` SEMPRE
2. Emoji APENAS em `icone`, NUNCA em `titulo`
3. 1 único slide por ContentAccordion (array com 1 objeto)
4. Primeiro acordeon `defaultOpen={true}`, demais `false`
5. Espaçamento: `space-y-6` entre acordeons dentro da section

---

## 📊 REQUISITOS DE CONTEÚDO POR MÓDULO

| Elemento                 | Quantidade Mínima | Descrição                                   |
| ------------------------ | ----------------- | ------------------------------------------- |
| **Conceitos explicados** | 4-6 por módulo    | Com definição, exemplo e contexto Petrobras |
| **Exemplos resolvidos**  | 3-5 por módulo    | Passo a passo detalhado                     |
| **Tabelas comparativas** | 1-2 por módulo    | Regras vs exceções                          |
| **Dicas de prova**       | 2-3 por módulo    | "A CESGRANRIO costuma cobrar..."            |
| **Pegadinhas**           | 1-2 por módulo    | Com AlertBox de aviso                       |
| **Contexto industrial**  | 1-2 por módulo    | Aplicação na Petrobras/indústria            |
| **Questões de Quiz**     | 6-8 por pool      | Formato CESGRANRIO (5 alternativas A-E)     |

### Profundidade Exigida:

```
1. DEFINIÇÃO FORMAL → Conceito técnico preciso
2. EXPLICAÇÃO INTUITIVA → "Em outras palavras..." com analogia
3. CONTEXTUALIZAÇÃO PETROBRAS → Como aparece no dia a dia
4. REGRAS COMPLETAS → Todas as regras + exceções
5. EXEMPLOS RESOLVIDOS (mín. 3) → Passo a passo numerado
6. TABELA DE RESUMO → Formato visual para consulta rápida
7. PEGADINHAS CESGRANRIO → "A banca costuma..." / "Cuidado com..."
```

---

## 📊 MÉTRICAS DE QUALIDADE

### O componente `.tsx` DEVE ter:

| Métrica                          | Mínimo | Ideal |
| -------------------------------- | ------ | ----- |
| **Linhas de código**             | 2500   | 3000+ |
| **Módulos**                      | 5      | 5-10  |
| **Seções por módulo**            | 2      | 3-4   |
| **Acordeons C.E.D.E. por seção** | 3      | 4     |
| **Exemplos por módulo**          | 3      | 5+    |
| **Linhas por acordeon**          | 30     | 50+   |

> [!CAUTION]
> Se o componente tiver menos de 2500 linhas (excluindo quizzes), o conteúdo está RASO.
> Cada acordeon deve ter conteúdo denso: parágrafos explicativos, caixas coloridas, AlertBoxes, exemplos numerados.

---

## PASSO 4: Registrar no page.tsx (se aula nova)

1. Adicionar dynamic import no topo (após os existentes)
2. Adicionar bloco de render no ternário de rotas

## PASSO 5: Verificar (Build + Visual)

1. `pnpm dev` — sem erros de build
2. Navegar até a aula no browser
3. Verificar se todos os módulos carregam
4. Verificar se quizzes renderizam
5. Verificar contagem de linhas: `wc -l src/components/aulas/[materia]/Aula[Nome].tsx`

## PASSO 6: Rodar Scripts de Validação

> [!IMPORTANT]
> Estes scripts corrigem os 3 bugs mais comuns da geração de aulas por IA.

### Script 1: `fix_consolidation_position.py`

**O que faz:** Garante que `ModuleConsolidation` está ANTES de `QuizInterativo` em cada `TabsContent`.

```bash
python fix_consolidation_position.py
```

**Bug que corrige:** IA às vezes coloca a consolidação depois do quiz ou fora da ordem.

### Script 2: `fix_count.py`

**O que faz:** Verifica balanceamento de tags JSX (`div`, `section`, `TabsContent`).

```bash
python fix_count.py
```

**Bug que corrige:** Tags não fechadas ou aninhamento quebrado — causa build errors.

### Script 3: `fix_tags.py`

**O que faz:** Insere tags de fechamento faltantes em posições específicas.

```bash
python fix_tags.py
```

**Bug que corrige:** `TabsContent` não fechado, `section` não fechado — crash de build.

### Ordem de execução recomendada:

```bash
python fix_count.py          # 1. Diagnosticar
python fix_tags.py           # 2. Corrigir tags
python fix_consolidation_position.py  # 3. Reordenar componentes
pnpm dev                     # 4. Validar build
```

## PASSO 7: Commit

```bash
git add -A
git commit -m "feat([materia]): implementa/enriquece aula [topico] - padrão premium CESGRANRIO"
```

---

## 🗂️ COMPONENTES DISPONÍVEIS EM `shared.tsx` (67 total)

### Layout & Template

| Componente            | Uso                                                    |
| --------------------- | ------------------------------------------------------ |
| `AulaTemplate`        | Layout padronizado (header, tabs, navegação)           |
| `StickyModuleNav`     | ⚠️ IMUTÁVEL — Nav sticky com tabs de módulo            |
| `ModuleBanner`        | Banner temático do módulo (gradiente + título)         |
| `ModuleSectionHeader` | Cabeçalho de seção com badge numerado                  |
| `ModuleConsolidation` | Mesa de Revisão (4 abas: vídeo, visual, macete, áudio) |
| `SectionBadge`        | Badge numerado para seções                             |

### Conteúdo Interativo

| Componente         | Uso                                                  |
| ------------------ | ---------------------------------------------------- |
| `ContentAccordion` | Acordeão C.E.D.E. (`mode="stacked"`)                 |
| `CardCarousel`     | Carrossel de cards (regras, dicas, comparações)      |
| `FlipCard`         | Flashcard frente/verso (memorização ativa)           |
| `AlertBox`         | Caixa de alerta (info/warning/danger/success)        |
| `Comparison`       | Comparação lado a lado (success/danger/info/warning) |
| `ComparisonSide`   | Um lado de comparação (correct/incorrect)            |
| `TimelineItem`     | Item de timeline numerado                            |

### Quiz & Avaliação

| Componente           | Uso                                     |
| -------------------- | --------------------------------------- |
| `QuizInterativo`     | Quiz CESGRANRIO com score e feedback    |
| `getRandomQuestions` | Seleciona N questões aleatórias do pool |

### Multimídia

| Componente                 | Uso                                         |
| -------------------------- | ------------------------------------------- |
| `VideoModal`               | Modal de vídeo YouTube                      |
| `MusicPlayerCard`          | Player de áudio estilo Spotify (com lyrics) |
| `ModuleSummaryCarouselNew` | Carrossel de imagens com export PDF         |
| `ImageCarousel`            | Carrossel de imagens simples                |

### Tabs & Navegação

| Componente      | Uso                             |
| --------------- | ------------------------------- |
| `LessonTabs`    | Tabs interativas com ícones     |
| `TabbedContent` | Conteúdo tabulado simples       |
| `SummaryTabs`   | Tabs de resumo (vídeo + visual) |

### Tipos

| Type           | Campos                                                                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `AulaProps`    | onComplete, isCompleted, titulo, descricao, duracao, materiaNome, materiaCor, materiaId, prevTopico, nextTopico, currentProgress, etc. |
| `QuizQuestion` | id, pergunta, opcoes [{label, valor}], correta, explicacao                                                                             |
| `ModuleDef`    | id, label, titulo                                                                                                                      |
| `CarouselCard` | icone/icon, titulo/title, descricao, exemplo, corFundo                                                                                 |
| `ContentSlide` | titulo/title, icone/icon, conteudo/content, exemplo, corDestaque                                                                       |

---

## ❌ ANTI-PATTERNS (NÃO FAZER)

### Código

- ❌ Import `from "./shared"` → SEMPRE use `from "../shared"` (subpasta)
- ❌ Quiz com explicação de 1 frase → mínimo 2 frases (certo E errado)
- ❌ Mais de 12 ou menos de 5 módulos
- ❌ Módulo só com quiz sem conteúdo didático
- ❌ Questões sem contextualização industrial
- ❌ Usar `respostaCorreta` → use `correta`
- ❌ Usar `title`/`icon` em MODULE_DEFS → use `label`/`titulo`
- ❌ Hardcoded `variant="blue"` → use `getModuleVariant(index)`

### Estrutura

- ❌ Quiz ANTES da consolidação → Consolidação vem ANTES do quiz
- ❌ `modulo-6` sem `TabsContent` correspondente → cada módulo precisa do wrapper
- ❌ Tags JSX não fechadas (`<div>`, `<section>`, `<TabsContent>`) → causa crash
- ❌ `ModuleConsolidation` fora do `<div className="space-y-[50px]">` → precisa estar dentro

### ContentAccordion

- ❌ Um único `ContentAccordion` com múltiplos slides renderizados em grid → use N accordions independentes
- ❌ `ContentAccordion` com slides vazios ou genéricos → viole C.E.D.E.
- ❌ `titulo` com emoji → emoji vai APENAS em `icone`
- ❌ `mode="carousel"` para conteúdo denso → use `mode="stacked"`
- ❌ 3+ cards visíveis ao mesmo tempo → máximo 2 por vez

### Design

- ❌ Roxo/violeta como cor primária (Purple Ban)
- ❌ Modificar `StickyModuleNav` ou padding do main
- ❌ `PAGE_SIZE` alto no carousel (mantém padrão para scroll lateral)

---

## 📋 CHECKLIST FINAL (antes de considerar pronto)

### Estrutura

- [ ] Componente tem 2500+ linhas (excluindo quizzes)
- [ ] 5-10 módulos no MODULE_DEFS
- [ ] Cada módulo tem 2-4 seções de conteúdo
- [ ] ModuleConsolidation presente em cada módulo (ANTES do quiz)
- [ ] QuizInterativo é o ÚLTIMO componente de cada módulo
- [ ] Tags JSX balanceadas (rodar `fix_count.py`)
- [ ] Quizzes em arquivo separado `data/[topico]-quizzes.ts`

### Conteúdo

- [ ] Protocolo C.E.D.E. aplicado em cada acordeon
- [ ] Mínimo 3 exemplos resolvidos por módulo
- [ ] Contexto Petrobras em cada módulo
- [ ] Pegadinhas CESGRANRIO identificadas
- [ ] 6-8 questões por quiz pool
- [ ] Explicações de quiz com 2+ frases

### Design

- [ ] `getModuleVariant(index)` para todas as cores
- [ ] `mode="stacked"` em todos os ContentAccordion
- [ ] Emoji apenas em `icone`, nunca em `titulo`
- [ ] Import correto: `from "../shared"`
- [ ] Imports de `getModuleVariant` de `@/lib/moduleColors`

### Build

- [ ] `pnpm dev` sem erros
- [ ] Todos os módulos carregam no browser
- [ ] Quizzes renderizam corretamente
- [ ] Scripts de fix executados sem erros

---

> [!IMPORTANT]
> **COMPORTAMENTO DO CARROSSEL (StickyModuleNav)**
> No desktop, o carrossel de abas é ativado quando o número de módulos excede **6**. Se uma aula possuir 10 ou mais módulos, **NÃO** altere o `PAGE_SIZE` para um valor alto (ex: 10) no `shared.tsx`. Isso desativa as setas de navegação e quebra a estética do menu centrado. Mantenha o padrão de exibição parcial para preservar a funcionalidade de "scroll" lateral e o alinhamento visual premium.
