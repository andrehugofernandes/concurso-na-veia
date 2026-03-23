---
description: Upgrade de aulas para padrão ULTIMATE — texto introdutório rico + C.E.D.E. + scripts de padronização. Reutilizável para qualquer concurso.
---

# /aula-ultimate — Workflow de Upgrade para Padrão ULTIMATE

// turbo-all

> **OBJETIVO:** Transformar aulas Premium (componentes interativos sem texto denso) em aulas ULTIMATE (texto introdutório rico de 80-150 linhas por módulo + componentes como reforço). Nenhuma pergunta de quiz deve abordar tema não coberto pelo texto introdutório.

---

## REGRA #0: PRESERVAÇÃO ABSOLUTA

> **Este workflow funciona por ADIÇÃO, nunca por SUBTRAÇÃO.**
>
> Ao fazer upgrade de uma aula existente:
> - **NUNCA** apagar componentes que já existem (ContentAccordion, FlipCard, CardCarousel, etc.)
> - **NUNCA** reescrever parágrafos que já existem (apenas complementar)
> - **NUNCA** reduzir o número de linhas do arquivo (deve sempre CRESCER)
> - **NUNCA** remover módulos do MODULE_DEFS
> - **NUNCA** alterar lógica de estado/handlers que já funciona
>
> **SEMPRE** inserir conteúdo novo ENTRE o `ModuleBanner` e o primeiro componente existente.
> **SEMPRE** verificar `wc -l` antes e depois — o arquivo deve ter MAIS linhas, nunca menos.
>
> O script `scripts/lib/safety.js` bloqueia escritas que reduzam o arquivo em mais de 2%.
> Se o script bloquear, ALGO FOI APAGADO — investigue antes de forçar.

---

## PRINCÍPIO FUNDAMENTAL

> **"O texto introdutório é a AULA. Os componentes são o REFORÇO."**
>
> Antes de qualquer FlipCard, CardCarousel ou ContentAccordion, o aluno deve encontrar um texto completo, denso e autocontido que cubra 100% do que o quiz vai perguntar. Os componentes interativos existem para consolidar, não para introduzir.
>
> Para matérias baseadas em legislação (Lei 13.303, RLCP, etc.), o texto integral dos artigos relevantes DEVE estar disponível no corpo do módulo.

---

## QUANDO USAR

```
/aula-ultimate upgrade [arquivo.tsx]        → Adiciona texto rico a aula Premium existente
/aula-ultimate upgrade-batch [materia]      → Upgrade em lote de toda uma matéria
/aula-ultimate audit [arquivo.tsx]          → Audita se aula atinge padrão ULTIMATE
/aula-ultimate validate [materia]           → Roda todos os scripts de padronização
```

---

## ANATOMIA DO MÓDULO ULTIMATE

### Ordem Obrigatória (7 blocos)

```
┌─────────────────────────────────────────────────┐
│ 1. ModuleBanner                                 │
│    numero={N} titulo="..." variant={mv(N)}      │
├─────────────────────────────────────────────────┤
│ 2. ★ RICH INTRO SECTION (80-150 linhas JSX)     │
│    ├── <section> com ModuleSectionHeader         │
│    ├── 4-6 parágrafos densos <p>                 │
│    ├── Caixas coloridas para fórmulas/regras     │
│    ├── Tabelas comparativas quando aplicável     │
│    └── Cobre 100% do que o quiz pergunta         │
├─────────────────────────────────────────────────┤
│ 3. ContentAccordion C.E.D.E. (4 acordeons)      │
│    ├── Conceituação (defaultOpen={true})         │
│    ├── Exemplificação (exemplos resolvidos)      │
│    ├── Dicas (macetes para prova)                │
│    └── Exceções (pegadinhas CESGRANRIO)          │
├─────────────────────────────────────────────────┤
│ 4. COMPONENTES DE REFORÇO (opcionais)           │
│    ├── FlipCards (memorização ativa)             │
│    ├── CardCarousel (regras comparativas)        │
│    ├── ComparisonSide (certo vs errado)          │
│    ├── FunctionGraph (matemática - gráficos)     │
│    └── AlertBox (pegadinhas e contexto)          │
├─────────────────────────────────────────────────┤
│ 5. ModuleConsolidation (Mesa de Revisão 4-tab)  │
│    ├── Vídeo (videoId + duração)                 │
│    ├── Resumo Visual (imagens/mapas mentais)     │
│    ├── Macete Visual (conteúdo JSX mnemônico)    │
│    └── Áudio (resumo em áudio)                   │
├─────────────────────────────────────────────────┤
│ 6. QuizInterativo (SEMPRE O ÚLTIMO)             │
│    ├── questoes={quizMN}                         │
│    ├── variant={getModuleVariant(N)}             │
│    └── onComplete → handleModuleComplete         │
└─────────────────────────────────────────────────┘
```

---

## PADRÃO DO RICH INTRO SECTION (Bloco 2)

### Template JSX Exato

```tsx
<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
  <ModuleSectionHeader
    index={1}
    title="Título do Tópico Principal"
    description="Subtítulo contextual"
    variant={getModuleVariant(N)}
  />

  <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
    {/* PARÁGRAFO 1: Definição formal + contexto histórico/acadêmico */}
    <p>
      Texto denso com definição formal do conceito. Citar fonte acadêmica
      (parafraseada). Contextualizar com a indústria de petróleo e gás.
      Explicar POR QUE este conceito é testado em provas CESGRANRIO.
      Mínimo 5 linhas de texto corrido.
    </p>

    {/* PARÁGRAFO 2: Explicação intuitiva + analogia */}
    <p>
      "Em outras palavras..." — traduzir o conceito formal para linguagem
      acessível. Usar analogia do cotidiano. Conectar com experiência
      prévia do candidato. Mínimo 4 linhas.
    </p>

    {/* PARÁGRAFO 3: Regras/Fórmulas/Artigos de lei */}
    <p>
      Listar TODAS as regras que o quiz vai cobrar. Para matemática:
      fórmulas com explicação de cada variável. Para português: regras
      gramaticais completas. Para legislação: texto integral dos artigos
      relevantes com paráfrase explicativa. Mínimo 5 linhas.
    </p>

    {/* PARÁGRAFO 4: Aplicação prática / Contexto Petrobras */}
    <p>
      Como este conceito aparece no dia a dia de um profissional Petrobras.
      Exemplos concretos de situações industriais. Conectar teoria com
      prática. Mínimo 4 linhas.
    </p>

    {/* PARÁGRAFO 5: Erros comuns + como a CESGRANRIO cobra */}
    <p>
      "A CESGRANRIO costuma cobrar..." — padrões de questões observados.
      Erros mais frequentes dos candidatos. O que confunde na hora da prova.
      Mínimo 4 linhas.
    </p>

    {/* CAIXA DE DESTAQUE: Fórmula / Regra-Chave / Artigo de Lei */}
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
      <h4 className="font-bold text-foreground">Regra-Chave / Fórmula</h4>
      {/* Conteúdo estruturado: grid, listas, tabelas */}
    </div>
  </div>
</section>
```

### Requisitos de Conteúdo por Tipo de Matéria

| Matéria | Fonte Primária | Foco do Texto Introdutório |
|---------|---------------|---------------------------|
| **Matemática** | Livros de referência (Gelson Iezzi, Dante) | Definição → Fórmula → Resolução passo a passo → Variações |
| **Português** | Gramática de Bechara, Celso Cunha | Regra gramatical → Exemplos literários → Casos especiais → Pegadinhas |
| **Legislação** | Texto da lei (Lei 13.303, RLCP, etc.) | Artigo integral → Paráfrase explicativa → Jurisprudência → Aplicação |
| **Administração** | Chiavenato, Maximiano, PMBOK | Conceito teórico → Framework → Caso Petrobras → Comparações |
| **Inglês** | Murphy, Cambridge Grammar | Regra gramatical → Exemplos bilíngues → Falsos cognatos → Contexto técnico |
| **TI** | Sommerville, Pressman, Tanenbaum | Conceito → Arquitetura → Implementação → Trade-offs |
| **Operação** | Manuais técnicos Petrobras | Princípio físico → Equação → Aplicação industrial → Segurança |

### Regra de Ouro: Cobertura Quiz ↔ Texto

> **ANTES de escrever o quiz de um módulo, verificar:**
> 1. Cada pergunta do quiz tem sua resposta coberta no texto introdutório?
> 2. Se NÃO → adicionar parágrafo cobrindo o tema faltante
> 3. Se SIM → o texto é autocontido e o quiz testa compreensão

---

## FONTES DE CONTEÚDO (OBRIGATÓRIO CONSULTAR)

### Documentos Estruturais

| Documento | Caminho | Uso |
|-----------|---------|-----|
| Guia de Matérias | `source/Guia Estruturado de Matérias - Petrobras Edital 2023.2.md` | Tópicos exatos do edital |
| Relatório Detalhado | `source/relatorio_materias_petrobras.md` | Detalhamento por profissão |
| Conteúdo Matemática | `source/conteudo/matematica.md` | Base teórica para expansão |
| Conteúdo Português | `source/conteudo/lingua-portuguesa.md` | Base teórica para expansão |
| Perfil CESGRANRIO | `source/conteudo/PERFIL_CESGRANRIO_PORTUGUES.md` | Estilo da banca |
| PRD NotebookLM | `source/PRD_NotebookLM_Conteudo_Aulas.md` | Formato de questão |

### Aulas HTML de Referência (Português)

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

### PDFs Específicos (Administração)

```
source/conteudo/03 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Específicos.pdf
source/conteudo/04 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Específicos.pdf
source/conteudo/05 SL 061FV 26 PREP PETROBRAS SUPRIM_Conhecimentos Específicos.pdf
```

---

## SISTEMA DE CORES (moduleColors.ts)

### Paleta de 10 Módulos

| Módulo | Variant | Cor Tailwind | Hex | Gradiente Banner |
|--------|---------|-------------|-----|-----------------|
| 1 | `amber` | `amber-300` | `#fcd34d` | `from-amber-300 to-amber-500` |
| 2 | `blue` | `blue-300` | `#93c5fd` | `from-blue-300 to-blue-500` |
| 3 | `emerald` | `emerald-300` | `#a7f3d0` | `from-emerald-300 to-emerald-500` |
| 4 | `rose` | `rose-300` | `#fb7185` | `from-rose-300 to-rose-500` |
| 5 | `violet` | `violet-300` | `#e9d5ff` | `from-violet-300 to-violet-500` |
| 6 | `amber` | `amber-900` | `#78350f` | `from-amber-900 to-amber-700` |
| 7 | `blue` | `blue-900` | `#1e3a8a` | `from-blue-900 to-blue-700` |
| 8 | `emerald` | `emerald-900` | `#064e3b` | `from-emerald-900 to-emerald-700` |
| 9 | `rose` | `rose-900` | `#500724` | `from-rose-900 to-rose-700` |
| 10 | `violet` | `violet-900` | `#4c0519` | `from-violet-900 to-violet-700` |

### Funções Disponíveis (`@/lib/moduleColors`)

```ts
getModuleVariant(N)      // → "amber" | "blue" | "emerald" | "rose" | "violet"
getModuleColor(N)        // → "amber-300" (Tailwind class)
getModuleColorHex(N)     // → "#fcd34d" (para SVG/canvas)
getModuleBackgroundClass(N) // → "bg-amber-500"
getModuleTextClass(N)    // → "text-amber-500"
getModuleBorderClass(N)  // → "border-amber-500"
getModuleColorInfo(N)    // → { variant, hex, bgClass, textClass, ... }
```

### Regra: NUNCA hardcode cores

```tsx
// ❌ ERRADO
<ModuleBanner variant="blue" />
<ModuleSectionHeader variant="emerald" />

// ✅ CORRETO
<ModuleBanner variant={getModuleVariant(1)} />
<ModuleSectionHeader variant={getModuleVariant(1)} />
```

---

## SCRIPTS DE PADRONIZAÇÃO (Pipeline Completo)

### Inventário de Scripts

#### Python (Raiz do Projeto)

| Script | O que faz | Quando usar |
|--------|-----------|-------------|
| `fix_consolidation_position.py` | Garante ModuleConsolidation ANTES de QuizInterativo | Após gerar/editar módulos |
| `fix_count.py` | Diagnostica tags JSX desbalanceadas | Antes de qualquer fix |
| `fix_tags.py` | Insere tags de fechamento faltantes | Após detectar desbalanceamento |
| `analyze_tags.py` | Análise avançada com stack de tags | Debug de erros de build |

#### JavaScript (scripts/)

| Script | O que faz | Dependência |
|--------|-----------|-------------|
| `fix-module-variants.js` | Substitui `getModuleVariant(N)` hardcoded por `mv[N]` dinâmico; reseta `ModuleSectionHeader` index por módulo | `lib/safety.js` |
| `fix-module-banners.js` | Atualiza gradientes do ModuleBanner (M1-5: claro, M6-10: escuro) | `lib/safety.js` |
| `fix-module-consolidation-titles.js` | Define título "Resumo do Módulo N" em cada ModuleConsolidation | `lib/safety.js` |
| `fix-quiz-indexing.js` | Ajusta `numero={N}` e `titulo="QUIZ: [nome]"` em QuizInterativo | `lib/safety.js` |
| `fix-resumo-multimedia.js` | Consolida cards "Resumo e Multimídia" dentro do ModuleConsolidation | `lib/safety.js` |

#### JavaScript (Raiz - Utilitários)

| Script | O que faz | Escopo |
|--------|-----------|-------|
| `fix_alertbox.js` | Adiciona `titulo` faltante em AlertBox | Matemática |
| `fix_quizzes.js` | Converte `opcoes` de string[] para `{label, valor}[]` | Pontual |

### Módulo de Segurança (`scripts/lib/safety.js`)

```
safeWriteFile(path, newContent, original, options)
├── Valida shrinkage ratio (máx 2%)
├── Verifica componentes críticos presentes
│   (ContentAccordion, FlipCard, CardCarousel,
│    ModuleConsolidation, ModuleBanner, QuizInterativo)
└── Só escreve se passar todas as validações
```

### Pipeline de Execução (Ordem Obrigatória)

```bash
# FASE 1: Diagnóstico
python fix_count.py                            # Verifica tags

# FASE 2: Correção Estrutural
python fix_tags.py                             # Fecha tags abertas
python fix_consolidation_position.py           # Reordena componentes

# FASE 3: Padronização Visual
node scripts/fix-module-banners.js             # Gradientes corretos
node scripts/fix-module-variants.js            # Cores dinâmicas
node scripts/fix-module-consolidation-titles.js # Títulos "Resumo do Módulo N"
node scripts/fix-quiz-indexing.js              # Numeração dos quizzes

# FASE 4: Validação
pnpm dev                                       # Build sem erros
```

---

## FLUXO DE UPGRADE: Premium → ULTIMATE

> **REGRA DE OURO: NUNCA APAGAR, SEMPRE ENRIQUECER.**
> Este workflow é cirúrgico. Ele ADICIONA conteúdo entre componentes existentes.
> Nenhum ContentAccordion, FlipCard, CardCarousel, ModuleConsolidation, QuizInterativo,
> AlertBox ou qualquer outro componente existente deve ser removido, reordenado ou
> reescrito — a menos que contenha um BUG comprovado (prop inválida, import quebrado).

---

### PASSO 0: Diagnóstico (OBRIGATÓRIO antes de qualquer edição)

```
Para CADA módulo do arquivo:

1. CONTAR parágrafos <p> que existem ANTES do primeiro ContentAccordion
   - 0-1 parágrafos → MÓDULO PRECISA DE UPGRADE
   - 2-3 parágrafos → MÓDULO PRECISA DE COMPLEMENTO
   - 4+ parágrafos  → MÓDULO JÁ ESTÁ NO PADRÃO (pular)

2. LER o quiz do módulo (arquivo data/[topico]-quizzes.ts)
   - Listar TODOS os temas/conceitos que as questões cobram
   - Marcar quais temas JÁ estão cobertos pelo texto existente
   - Marcar quais temas estão FALTANDO no texto

3. GERAR relatório de gaps:
   Módulo 1: [0 parágrafos] → PRECISA UPGRADE | Gaps: tema X, tema Y, tema Z
   Módulo 2: [3 parágrafos] → PRECISA COMPLEMENTO | Gap: tema W
   Módulo 3: [5 parágrafos] → OK | Sem gaps
   ...
```

---

### PASSO 1: Upgrade de módulo (PRESERVAÇÃO TOTAL)

> **ONDE INSERIR:** O texto introdutório SEMPRE vai entre o `ModuleBanner` e o
> primeiro componente interativo existente (`ContentAccordion`, `CardCarousel`,
> `FlipCard`, etc.). Nunca reorganizar o que já existe.

```tsx
{/* ═══ ANTES DO UPGRADE ═══ */}
<TabsContent value="modulo-1">
  <ModuleBanner numero={1} titulo="..." variant={getModuleVariant(1)} />
  {/* ← VAZIO ou 1 parágrafo curto */}
  <ContentAccordion ... />     {/* Já existe — NÃO TOCAR */}
  <FlipCard ... />             {/* Já existe — NÃO TOCAR */}
  <ModuleConsolidation ... />  {/* Já existe — NÃO TOCAR */}
  <QuizInterativo ... />       {/* Já existe — NÃO TOCAR */}
</TabsContent>

{/* ═══ DEPOIS DO UPGRADE ═══ */}
<TabsContent value="modulo-1">
  <ModuleBanner numero={1} titulo="..." variant={getModuleVariant(1)} />

  {/* ★ NOVO: Rich Intro Section INSERIDA aqui */}
  <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
    <ModuleSectionHeader index={1} title="..." variant={getModuleVariant(1)} />
    <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
      <p>Parágrafo 1: Definição formal...</p>
      <p>Parágrafo 2: Explicação intuitiva...</p>
      <p>Parágrafo 3: Regras completas...</p>
      <p>Parágrafo 4: Contexto Petrobras...</p>
      <p>Parágrafo 5: Como a CESGRANRIO cobra...</p>
      <div className="bg-gradient-to-br ...">Caixa de destaque</div>
    </div>
  </section>

  <ContentAccordion ... />     {/* INTOCADO — mesmo código de antes */}
  <FlipCard ... />             {/* INTOCADO — mesmo código de antes */}
  <ModuleConsolidation ... />  {/* INTOCADO — mesmo código de antes */}
  <QuizInterativo ... />       {/* INTOCADO — mesmo código de antes */}
</TabsContent>
```

### Regras de Preservação (INVIOLÁVEIS)

| Componente Existente | Ação Permitida | Ação PROIBIDA |
|---------------------|----------------|---------------|
| `ContentAccordion` | Manter intacto | Apagar, reescrever, reordenar |
| `FlipCard` | Manter intacto | Apagar, mover, alterar conteúdo |
| `CardCarousel` | Manter intacto | Apagar, reduzir cards |
| `ModuleConsolidation` | Manter intacto | Apagar, mover para depois do quiz |
| `QuizInterativo` | Manter intacto | Apagar, mudar questões |
| `AlertBox` | Manter intacto | Apagar (pode adicionar novos) |
| `ComparisonSide` | Manter intacto | Apagar |
| `FunctionGraph` | Manter intacto | Apagar |
| `ModuleBanner` | Corrigir props erradas | Apagar |
| `ModuleSectionHeader` | Pode ajustar index | Apagar |
| Parágrafos `<p>` existentes | Manter e COMPLEMENTAR | Apagar, encurtar |
| Imports | Pode ADICIONAR novos | Remover imports usados |
| MODULE_DEFS | Pode ADICIONAR módulos | Remover módulos existentes |
| useState/handlers | Manter lógica existente | Reescrever sem motivo |

### O que PODE ser corrigido (bugs, não conteúdo)

```
✅ Corrigir prop errada: modulo={1} → numero={1}
✅ Corrigir prop errada: descricao="..." em AlertBox → children
✅ Corrigir import: LuBarChart3 → LuChartBar (ícone inexistente)
✅ Corrigir import: from "./shared" → from "../shared"
✅ Adicionar variant={getModuleVariant(N)} onde faltava
✅ Fechar tags JSX não fechadas
✅ Reposicionar ModuleConsolidation para ANTES do Quiz (se estiver errado)
```

---

### PASSO 2: Complemento de módulo (quando já tem ALGO)

Se o módulo já tem 1-3 parágrafos mas faltam temas:

```
1. NÃO apagar os parágrafos existentes
2. ADICIONAR novos parágrafos APÓS os existentes, ANTES dos componentes
3. Manter o estilo de escrita dos parágrafos existentes (coerência)
4. Adicionar caixa de destaque se não existir
```

```tsx
{/* Parágrafos que JÁ EXISTIAM (manter intactos) */}
<p>Texto original do parágrafo 1...</p>

{/* ★ NOVOS parágrafos ADICIONADOS após os existentes */}
<p>Parágrafo novo 2: cobrindo gap identificado no quiz...</p>
<p>Parágrafo novo 3: contexto Petrobras que faltava...</p>
<p>Parágrafo novo 4: como a CESGRANRIO cobra este tema...</p>

{/* Caixa de destaque NOVA (se não existia) */}
<div className="bg-gradient-to-br ...">Fórmula / Regra-Chave</div>
```

---

### PASSO 3: Validação pós-upgrade

```bash
# 1. Verificar que nenhum componente foi removido
#    (safety.js faz isso automaticamente com max 2% shrinkage)
node scripts/fix-module-variants.js

# 2. Verificar contagem de linhas (deve ter CRESCIDO, nunca diminuído)
wc -l src/components/aulas/[materia]/Aula[Nome].tsx
# ANTES: 2.200 linhas → DEPOIS: 3.500+ linhas ✅
# ANTES: 2.200 linhas → DEPOIS: 1.800 linhas ❌ ALGO FOI APAGADO

# 3. Verificar build
pnpm dev
```

---

### Para uma MATÉRIA inteira (batch):

```
1. LISTAR todas as aulas da matéria
2. RODAR diagnóstico (Passo 0) em TODAS → gerar relatório consolidado
3. Para CADA aula que precisa de upgrade:
   a. Executar Passo 1 ou Passo 2 (conforme diagnóstico)
   b. Executar Passo 3 (validação)
   c. Commit incremental: "feat([materia]): upgrade ULTIMATE Aula[Nome]"
4. RODAR pipeline de scripts em lote (Fase 1-4)
5. VERIFICAR build completo
6. Comparar contagem de linhas total: ANTES vs DEPOIS (deve crescer)
```

---

## AULAS DE REFERÊNCIA (Padrão Ouro)

### Melhor exemplo de Rich Intro: AulaVerbTenses.tsx

```
src/components/aulas/ingles/AulaVerbTenses.tsx (3.925 linhas)
├── 10 módulos, cada um com 5 parágrafos densos (80-120 linhas)
├── Fonte: Murphy "English Grammar in Use", Cambridge Grammar
├── Cada parágrafo: definição → explicação → exemplo → contexto Petrobras
├── Caixa colorida após parágrafos com estrutura/fórmula
└── ContentAccordion C.E.D.E. como REFORÇO após texto
```

### Melhor exemplo de densidade: AulaSintaxe.tsx

```
src/components/aulas/portugues/AulaSintaxe.tsx (2.997 linhas)
├── 23 tags <p> com conteúdo rico
├── Fonte: Gramática de Bechara
├── Cobertura exaustiva de cada tipo sintático
└── Tabelas comparativas inline
```

---

## STATUS DO UPGRADE ULTIMATE (Tracker)

### Por Matéria

| Matéria | Total Aulas | Com Rich Intro | Faltando | Prioridade |
|---------|------------|---------------|----------|------------|
| **Matemática** | 19 | 0 | 19 | TIER 1 |
| **Português** | 11 | 3 | 8 | TIER 1 |
| **TI** | 7 | 1 | 6 | TIER 2 |
| **Administração** | 6 funcionais | 0 | 6 | TIER 2 |
| **Inglês** | 6 | 5 | 1 | TIER 3 |
| **Operação** | 2 | 1 | 1 | TIER 3 |
| **TOTAL** | **51** | **10** | **41** | - |

### Aulas JÁ no padrão ULTIMATE (Rich Intro feito)

| Matéria | Aula | Linhas | Parágrafos intro |
|---------|------|--------|-----------------|
| Inglês | AulaVerbTenses | 3.925 | 5 por módulo |
| Inglês | AulaTextComprehension | 2.804 | 16 total |
| Inglês | AulaConnectors | 1.706 | 8 total |
| Inglês | AulaVocabulary | 2.352 | 3 total |
| Inglês | AulaFalseCognates | 1.423 | 5 total |
| Português | AulaSintaxe | 2.997 | 23 total |
| Português | AulaConcordancia | 5.315 | 9 total |
| Português | AulaInterpretacaoTexto | 2.823 | 3 total |
| Operação | AulaMecanicaFluidos | 665 | 9 total |
| TI | AulaMobile | 2.094 | 4 total |

---

## COMPONENTES DISPONÍVEIS (shared.tsx)

### Layout & Template

| Componente | Props Obrigatórias |
|------------|-------------------|
| `AulaTemplate` | activeTab, setActiveTab, modules, completedModules, titulo, descricao, etc. |
| `ModuleBanner` | `numero={N}`, `titulo`, `descricao`, `variant={getModuleVariant(N)}` |
| `ModuleSectionHeader` | `index={N}`, `title`, `variant={getModuleVariant(N)}` |
| `ModuleConsolidation` | `index={N}`, `variant`, video, resumoVisual, maceteVisual, audio |

### Conteúdo Interativo

| Componente | Uso | Regra |
|------------|-----|-------|
| `ContentAccordion` | C.E.D.E. | `mode="stacked"`, emoji só em `icone`, 1 slide por accordion |
| `CardCarousel` | Regras comparativas | Máximo 6 cards |
| `FlipCard` | Memorização ativa | Verso sempre escuro `bg-[#0a0a0a]` |
| `AlertBox` | Pegadinhas/Contexto | `tipo="warning"` + `titulo="..."` + children |
| `ComparisonSide` | Certo vs Errado | correct/incorrect |
| `TimelineItem` | Passos numerados | Sequência cronológica |
| `FunctionGraph` | Gráficos matemáticos | `functions`, `xMin/xMax/yMin/yMax`, `points` |

### Quiz & Avaliação

| Componente | Props |
|------------|-------|
| `QuizInterativo` | `questoes`, `titulo`, `variant={getModuleVariant(N)}`, `onComplete` |
| `getRandomQuestions` | `(pool, count)` → seleciona N questões aleatórias |

---

## ANTI-PATTERNS (NÃO FAZER)

### Conteúdo
- ❌ Módulo com quiz mas SEM texto introdutório rico
- ❌ Texto introdutório que não cobre tema perguntado no quiz
- ❌ Componentes interativos (FlipCard, Carousel) como ÚNICA fonte de conteúdo
- ❌ Copiar texto de fonte sem parafrasear
- ❌ Parágrafos com menos de 3 linhas (raso demais)

### Estrutura
- ❌ `from "./shared"` → SEMPRE `from "../shared"`
- ❌ `respostaCorreta` → use `correta`
- ❌ `title`/`icon` em MODULE_DEFS → use `label`/`titulo`
- ❌ Hardcoded `variant="blue"` → use `getModuleVariant(N)`
- ❌ Quiz ANTES da consolidação
- ❌ Tags JSX não fechadas
- ❌ Emoji no `titulo` do ContentAccordion (só em `icone`)
- ❌ `mode="carousel"` para conteúdo denso → use `mode="stacked"`
- ❌ `ModuleBanner` com prop `modulo` → use `numero`
- ❌ `AlertBox` com prop `descricao` → use `children`

### Design
- ❌ Roxo/violeta como cor primária (Purple Ban)
- ❌ Modificar StickyModuleNav ou padding do main
- ❌ PAGE_SIZE alto no carousel

---

## CHECKLIST ULTIMATE (antes de considerar pronto)

### Conteúdo (NOVO)
- [ ] Cada módulo tem 4-6 parágrafos densos ANTES dos acordeons
- [ ] Cada parágrafo tem mínimo 4 linhas
- [ ] 100% dos temas do quiz estão cobertos no texto introdutório
- [ ] Fonte acadêmica parafraseada em cada módulo
- [ ] Contexto Petrobras/industrial em cada módulo
- [ ] Para legislação: artigos relevantes citados integralmente

### Estrutura
- [ ] Componente tem 3000+ linhas (excluindo quizzes)
- [ ] 10 módulos no MODULE_DEFS
- [ ] Cada módulo tem Rich Intro + C.E.D.E. + Consolidation + Quiz
- [ ] ModuleConsolidation ANTES do Quiz
- [ ] Tags JSX balanceadas
- [ ] Quizzes em arquivo separado `data/[topico]-quizzes.ts`

### Design
- [ ] `getModuleVariant(N)` em TODOS os componentes com variant
- [ ] `mode="stacked"` em todos os ContentAccordion
- [ ] Emoji apenas em `icone`, nunca em `titulo`
- [ ] Import correto: `from "../shared"`
- [ ] Import de `getModuleVariant` de `@/lib/moduleColors`

### Scripts
- [ ] `fix_count.py` sem erros
- [ ] `fix_consolidation_position.py` sem mudanças necessárias
- [ ] `fix-module-variants.js` executado
- [ ] `fix-module-banners.js` executado
- [ ] `fix-module-consolidation-titles.js` executado
- [ ] `fix-quiz-indexing.js` executado
- [ ] `pnpm dev` sem erros

---

## MÉTRICAS DE QUALIDADE ULTIMATE

| Métrica | Premium (antigo) | ULTIMATE (novo) |
|---------|-----------------|-----------------|
| Linhas de código | 2.500+ | 3.500+ |
| Parágrafos por módulo | 0-1 | 4-6 |
| Linhas de texto intro por módulo | 0-10 | 80-150 |
| Cobertura quiz ↔ texto | Parcial | 100% |
| Acordeons C.E.D.E. por módulo | 3-4 | 4 (reforço) |
| Fontes acadêmicas citadas | 0 | 1+ por módulo |
| Exemplos por módulo | 2-3 | 3-5 |
| Contexto Petrobras | Opcional | Obrigatório |

---

## ADAPTABILIDADE PARA OUTROS CONCURSOS

Este workflow é agnóstico ao edital. Para adaptar a outro concurso:

1. **Substituir fontes**: Trocar `source/` por documentos do novo edital
2. **Ajustar banca**: CESGRANRIO (5 alternativas) → Cebraspe (Certo/Errado) → FCC (5 alternativas)
3. **Trocar contexto**: "Petrobras" → "Banco do Brasil" | "IBGE" | "Receita Federal"
4. **Manter estrutura**: O padrão ULTIMATE (texto rico + C.E.D.E. + componentes) é universal

```
/aula-ultimate --concurso="Banco do Brasil" --banca="CESGRANRIO" --cargo="Escriturário"
```
