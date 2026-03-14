---
description: Padrão de acordeons independentes com carrosséis internos para organização de conteúdo denso. Use quando precisar separar categorias opostas ou complementares (ex. Proibições vs. Obrigações) com navegação de 1 tópico por vez dentro de cada categoria.
---

# Skill: AcordeonCarrossel

## 📋 O que é

O padrão **AcordeonCarrossel** resolve o problema de conteúdo denso que precisa ser dividido em **categorias independentes**, onde cada categoria contém **múltiplos tópicos** que devem ser apresentados **um por vez** ou em **layout de carrossel controlado**.

> [!IMPORTANT]
> **REGRA FUNDAMENTAL:** **NÃO** use um único `ContentAccordion` com múltiplos slides renderizados lado a lado em grid. Isso resulta em conteúdo espremido e ilegível. Em vez disso, use **múltiplos `ContentAccordion` independentes**, cada um com seus próprios slides internos.

---

## 🎯 3 Tipos de Conteúdo Disponíveis

### **Tipo 1: Carrossel de Conteúdo de Texto**
- **Uso:** Múltiplos tópicos de texto que devem ser navegados
- **Layout:** 1 linha × 2 colunas (máximo 2 itens visíveis por vez)
- **Navegação:** Setas de carrossel para avançar/retroceder
- **Exemplo:** Comparações lado a lado, variações de um tema
- **Componente:** `CardCarousel` com `slidesPerView={2}`

```tsx
<CardCarousel
  cards={[
    { titulo: "Tópico 1", conteudo: "..." },
    { titulo: "Tópico 2", conteudo: "..." },
  ]}
  slidesPerView={2}
/>
```

### **Tipo 2: Carrossel de FlipCards**
- **Uso:** Memorização ativa com flashcards (pergunta/resposta)
- **Layout:** 1 linha × 2 colunas (máximo 2 cards visíveis por vez)
- **Navegação:** Setas de carrossel + flip individual de cada card
- **Exemplo:** Termos/Definições, Conceitos/Aplicações, Português/Exemplo
- **Componente:** `FlipCard` dentro de carrossel com `slidesPerView={2}`

```tsx
<div className="flex gap-4 overflow-x-auto">
  <FlipCard frente="Conceito" verso="Definição" />
  <FlipCard frente="Conceito" verso="Definição" />
</div>
```

### **Tipo 3: Conteúdo Simples (SEM Carrossel)**
- **Uso:** Um único tópico ou conteúdo que se adapta naturalmente
- **Layout:** 1 linha × 1 coluna (sem necessidade de navegação)
- **Navegação:** NENHUMA (conteúdo expande completamente)
- **Exemplo:** Explicação conceitual, definição única, regra simples
- **Componente:** `div` com conteúdo direto (SEM `CardCarousel` ou `FlipCard`)

```tsx
<div className="space-y-6">
  <p className="text-base">Conceituação...</p>
  <div className="p-6 bg-blue-500/15 rounded-xl">...</div>
</div>
```

---

## 🏗️ Quando Usar Cada Tipo

| Tipo | Cenário | Exemplo |
|------|---------|---------|
| **Tipo 1** (Text Carousel) | 3+ tópicos para comparar | Crescimento vs Decrescimento vs Constância |
| **Tipo 2** (Flip Carousel) | Memorização com pergunta/resposta | Concordância Verbal: Regra/Exceção |
| **Tipo 3** (Sem Carrossel) | 1 conceito ou conteúdo único | Definição de PA, explicação de fórmula |

---

## ⚖️ IMPORTANTE: Qual Tipo Escolher?

**A LLM DEVE PERGUNTAR ao implementar:**

> Qual tipo de conteúdo você quer usar para os acordeons?
>
> 1. **Carrossel de Texto** (2 itens por vez, navegação)
> 2. **Carrossel de FlipCards** (2 cards por vez, flip + navegação)
> 3. **Sem Carrossel** (1 item por vez, conteúdo estático)
>
> Padrão recomendado: **Tipo 3 (Sem Carrossel)** para máxima legibilidade.

---

## 📋 Regra de Conteúdo Rico (C.E.D.E.)

Cada `ContentAccordion` deve seguir o padrão **C.E.D.E.** (Conceituação, Exemplificação, Dicas, Exceções):

> [!CAUTION]
> **REGRA OBRIGATÓRIA:** Conteúdo raso ou genérico é PROIBIDO.
>
> Se usar **Tipo 1 ou 2 (com carrossel)**, cada slide/card DEVE conter:
> 1. **Conceituação** — Explicação clara e contextualizada
> 2. **Exemplos** — Casos reais com destaque visual (✅ certo / ❌ errado)
> 3. **Dicas** — AlertBox com macetes práticos
> 4. **Exceções** — Casos especiais onde a regra muda
>
> Se usar **Tipo 3 (sem carrossel)**, o conteúdo da `div` deve ser rico e detalhado conforme acima.
>
> Um slide com apenas 1 frase é **INCOMPLETO** e viola este padrão.

---

## 🏗️ Estrutura do Padrão

**Estrutura Geral (válida para todos os 3 tipos):**

```
ModuleSectionHeader (título da seção)
│
├── ContentAccordion #1 (Categoria A) ← expande/colapsa independentemente
│   └── conteúdo (Tipo 1, 2 ou 3)
│
├── ContentAccordion #2 (Categoria B) ← expande/colapsa independentemente
│   └── conteúdo (Tipo 1, 2 ou 3)
│
└── ContentAccordion #3+ (Categoria C+) ← expande/colapsa independentemente
    └── conteúdo (Tipo 1, 2 ou 3)
```

---

## 📝 Estruturas de Conteúdo por Tipo

### **Tipo 1: Carrossel de Texto (2 itens por vez)**

```tsx
<CardCarousel
  cards={[
    {
      titulo: "Tópico 1",
      icone: "🔢",
      conteudo: (
        <div className="space-y-6">
          {/* CONCEITUAÇÃO */}
          <p className="text-base">Explicação...</p>

          {/* EXEMPLOS */}
          <div className="p-6 bg-green-500/15 rounded-xl border border-green-500/30">
            <p className="text-lg font-bold">✅ Exemplo</p>
            <p className="text-base">Detalhe...</p>
          </div>

          {/* DICAS */}
          <AlertBox tipo="info" titulo="Dica">
            Macete prático...
          </AlertBox>
        </div>
      ),
    },
    // ... mais cards
  ]}
  slidesPerView={2}
/>
```

### **Tipo 2: Carrossel de FlipCards (2 cards por vez)**

```tsx
<div className="flex gap-4 overflow-x-auto pb-2">
  <FlipCard
    frente={<div>Pergunta/Conceito</div>}
    verso={<div>Resposta/Definição</div>}
  />
  <FlipCard
    frente={<div>Pergunta/Conceito</div>}
    verso={<div>Resposta/Definição</div>}
  />
  {/* ... mais cards */}
</div>
```

### **Tipo 3: Conteúdo Simples (SEM Carrossel - Recomendado)**

```tsx
<div className="space-y-6">
  {/* CONCEITUAÇÃO */}
  <p className="text-base leading-relaxed text-foreground">
    Uma <strong>Progressão Aritmética (PA)</strong> é...
  </p>

  {/* EXEMPLOS */}
  <div className="p-6 bg-blue-500/15 rounded-xl border border-blue-500/30">
    <p className="text-lg font-bold text-blue-700">Estrutura da PA:</p>
    <div className="space-y-3 font-mono text-base">
      <p><strong>PA:</strong> a₁, a₂, a₃, ...</p>
      <p><strong>aₙ</strong> = a₁ + (n-1)r</p>
    </div>
  </div>

  {/* DICAS */}
  <AlertBox tipo="success" titulo="Teste Prático">
    <p className="text-base">Se razões são iguais → é PA!</p>
  </AlertBox>

  {/* EXCEÇÕES */}
  <div className="p-6 bg-slate-500/15 rounded-xl border border-slate-500/30">
    <p className="text-lg font-bold">Caso Especial:</p>
    <p className="text-base">PA com r = 0 → termos iguais</p>
  </div>
</div>
```

---

## ❌ Anti-Padrões (NÃO FAÇA)

```tsx
// ❌ ERRADO 1: Um ContentAccordion com múltiplos slides lado a lado
<ContentAccordion
  titulo="Guia Completo"
  slides={[
    { titulo: "Tópico A", conteudo: <CardCarousel cards={[...]} /> },
    { titulo: "Tópico B", conteudo: <CardCarousel cards={[...]} /> },
  ]}
/>
// Resultado: Conteúdo espremido em grid, ilegível

// ❌ ERRADO 2: ContentAccordion com slides vazios ou genéricos
<ContentAccordion
  slides={[
    { titulo: "Slide 1", conteudo: <p>Texto muito curto</p> },
    { titulo: "Slide 2", conteudo: <p>Sem exemplos ou dicas</p> },
  ]}
/>
// Resultado: Conteúdo incompleto, violação da regra C.E.D.E.

// ❌ ERRADO 3: 3+ FlipCards ou 3+ Cards visíveis ao mesmo tempo
<CardCarousel cards={[...]} slidesPerView={3} />
// Resultado: Cards muito pequenos, ilegível
```

---

## ✅ Padrão Correto FINAL (Tipo 3 - SEM CARROSSEL)

### Estrutura Obrigatória:

```tsx
// ✅ CORRETO: N ContentAccordion independentes com mode="stacked"

<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
  <ModuleSectionHeader
    index={1}
    title="Conceitos Fundamentais de PA"
    variant="blue"
  />

  {/* ACORDEON 1: Conceituação */}
  <ContentAccordion
    titulo="Conceituação - O que é PA?"
    icone="📖"
    corIndicador="bg-blue-500"
    defaultOpen={true}
    mode="stacked"
    slides={[
      {
        conteudo: (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Definição de Progressão Aritmética</h3>
              <p className="text-lg leading-relaxed text-foreground">
                Uma <strong>Progressão Aritmética (PA)</strong> é uma sequência...
              </p>
            </div>

            <div className="p-6 bg-blue-500/15 rounded-xl border-2 border-blue-500/40">
              <p className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-6">📐 Estrutura Fundamental:</p>
              <div className="space-y-4 font-mono text-lg">
                <p className="text-foreground"><strong>PA:</strong> a₁, a₂, a₃, ..., aₙ</p>
                <p className="text-foreground"><strong>aₙ</strong> = a₁ + (n-1)r</p>
              </div>
            </div>
          </div>
        ),
      },
    ]}
  />

  {/* ACORDEON 2: Exemplificação */}
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
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Tipos de Progressão Aritmética</h3>
              <p className="text-lg leading-relaxed text-foreground">
                Dependendo do valor de r, a PA pode crescer, manter-se constante ou decrescer...
              </p>
            </div>

            <div className="p-6 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-xl">
              <p className="text-xl font-bold text-emerald-700">✅ PA Crescente (r > 0):</p>
              <p className="text-lg font-mono text-foreground mb-3"><strong>Exemplo: PA = (5, 10, 15, 20, ...)</strong></p>
              <div className="space-y-2 text-base text-foreground">
                <p>• <strong>a₁ = 5</strong> (primeiro termo)</p>
                <p>• <strong>r = 5</strong> (razão positiva)</p>
              </div>
            </div>
          </div>
        ),
      },
    ]}
  />

  {/* ACORDEON 3: Dicas */}
  <ContentAccordion
    titulo="Dicas - Teste da Razão"
    icone="💡"
    corIndicador="bg-amber-500"
    defaultOpen={false}
    mode="stacked"
    slides={[
      {
        conteudo: (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">🎯 Teste da Razão</h3>
              <p className="text-lg leading-relaxed text-foreground">
                Para verificar se uma sequência é uma PA, subtraia termos consecutivos...
              </p>
            </div>

            <AlertBox tipo="success" titulo="✅ Teste Prático">
              <div className="space-y-3 text-lg">
                <p className="font-bold"><strong>Sequência: (3, 7, 11, 15)</strong></p>
                <p>• 7 - 3 = <strong>4</strong> ✓</p>
                <p>• 11 - 7 = <strong>4</strong> ✓</p>
                <p className="text-green-700 dark:text-green-400 font-bold">→ É PA com r = 4!</p>
              </div>
            </AlertBox>
          </div>
        ),
      },
    ]}
  />

  {/* ACORDEON 4: Exceções */}
  <ContentAccordion
    titulo="Exceções - Casos Especiais"
    icone="⚠️"
    corIndicador="bg-red-500"
    defaultOpen={false}
    mode="stacked"
    slides={[
      {
        conteudo: (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">🚨 Pegadinhas em PA</h3>
              <p className="text-lg leading-relaxed text-foreground">
                Existem situações especiais que aparecem em provas...
              </p>
            </div>

            <div className="p-6 bg-blue-500/15 border-2 border-blue-500/40 rounded-xl">
              <p className="text-xl font-bold text-blue-700">1️⃣ PA com Primeiro Termo Zero</p>
              <p className="text-lg font-mono text-foreground mb-3"><strong>Exemplo: PA = (0, 3, 6, 9, ...)</strong></p>
              <p className="text-base text-foreground">• a₁ = 0 | r = 3</p>
            </div>
          </div>
        ),
      },
    ]}
  />
</section>
```

### Checklist para Tipo 3 (SEM CARROSSEL):

- [ ] **`mode="stacked"`** em cada ContentAccordion
- [ ] **Ícone na prop** (ex: `icone="📖"`) — aparece NO BADGE
- [ ] **Título na prop** — SEM emoji, apenas texto (ex: `titulo="Conceituação - O que é PA?"`)
  - ⚠️ **NÃO FAZER:** `titulo="📖 Conceituação - O que é PA?"` (emoji em duplicação!)
  - ✅ **CORRETO:** Emoji vai APENAS em `icone="📖"`
- [ ] **Sem `titulo` dentro do slide** (apenas `conteudo`)
- [ ] **1 único slide por ContentAccordion** (array com 1 objeto)
- [ ] **Sem navegação de carrossel** (automático com `mode="stacked"`)
- [ ] **Espaçamento entre acordeons**: `space-y-2 md:space-y-1.5` (reduzido pela metade)
- [ ] **Conteúdo rico** com `space-y-8` entre seções e `text-lg`/`text-xl` para títulos

---

## 🎨 Regras de Design (Tipo 3 - PADRÃO FINAL)

| Elemento | Valor/Propriedade |
|----------|-------------------|
| **Acordeon 1** | `defaultOpen={true}` |
| **Acordeon 2+** | `defaultOpen={false}` |
| **Modo** | `mode="stacked"` (OBRIGATÓRIO) |
| **Ícone (prop)** | Emoji simples (ex: `icone="📖"`) — aparece no badge |
| **Título (prop)** | String SEM emoji, apenas descrição (ex: `titulo="Conceituação - O que é PA?"`) |
| **Slides interno** | Array com 1 objeto (sem `titulo`, apenas `conteudo`) |
| **Ícone renderizado** | Aparece no AccordionTrigger com fundo `bg-primary/10` |
| **Título renderizado** | `text-xl md:text-2xl font-bold` (grande e destacado) |
| **Navegação** | NENHUMA (sem setas, sem "tópicos disponíveis") |
| **Espaçamento entre acordeons** | `space-y-2 md:space-y-1.5` (reduzido pela metade) |
| **Padding do conteúdo** | `p-4 md:p-8` |
| **Fonts corpo** | `text-base` ou `text-lg` |
| **Seções internas** | `space-y-6` ou `space-y-8` |

---

## 📏 Espaçamento Padrão

```tsx
{/* Seção com múltiplos ContentAccordion */}
<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
  {/* space-y-6 = espaçamento reduzido pela METADE entre acordeons (antes era space-y-12) */}

  <ModuleSectionHeader ... />

  <ContentAccordion ... /> {/* Acordeon 1 */}
  {/* gap de 24px (space-y-6) */}
  <ContentAccordion ... /> {/* Acordeon 2 */}
  {/* gap de 24px (space-y-6) */}
  <ContentAccordion ... /> {/* Acordeon 3 */}
  {/* gap de 24px (space-y-6) */}
  <ContentAccordion ... /> {/* Acordeon 4 */}
</section>
```

**Escala de espaçamento Tailwind:**
- `space-y-3`: 12px (muito apertado)
- `space-y-4`: 16px (apertado)
- `space-y-6`: 24px ✅ **PADRÃO (reduzido pela metade)**
- `space-y-8`: 32px (confortável)
- `space-y-12`: 48px (muito espaçado)

---

## 📐 Regras de Conteúdo por Tipo

### **Tipo 1: Carrossel de Texto**
- Máximo de **2 cards por vez** (2 colunas)
- Cada card pode ter até **6-8 linhas** (não exceder altura da viewport)
- Se conteúdo for > 8 linhas, quebrar em múltiplos cards
- Fonts: `text-base` ou `text-sm` (dentro do espaço do card)

### **Tipo 2: Carrossel de FlipCards**
- Máximo de **2 FlipCards por vez**
- Cada flip: frente (pergunta) ≤ 1 linha | verso (resposta) ≤ 3 linhas
- Se verso precisar > 3 linhas, simplificar ou dividir em 2 cards
- Fonts: `text-base` (frente) | `text-sm` (verso)

### **Tipo 3: Sem Carrossel (RECOMENDADO)**
- Conteúdo expande completamente (responsivo)
- Fonts: `text-base` ou `text-lg` (máxima legibilidade)
- Seções: `space-y-6` para separação
- Caixas: `p-6` para padding generoso
- **Melhor UX:** Sem necessidade de navegação, conteúdo inteiro visível de uma vez

---

## 📐 Estrutura do Conteúdo de Cada Slide

```tsx
<div className="space-y-4">
  {/* 1. CONCEITUAÇÃO */}
  <p className="text-sm text-muted-foreground leading-relaxed">
    Texto explicativo com <strong>destaque</strong> nos termos-chave.
  </p>

  {/* 2. EXEMPLO ERRADO (quando aplicável) */}
  <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
    <p className="text-sm line-through text-red-500">
      ❌ "Frase incorreta aqui."
    </p>
  </div>

  {/* 3. EXEMPLO CORRETO */}
  <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
    <p className="text-sm font-bold text-green-600 dark:text-green-400">
      ✅ "Frase correta aqui."
    </p>
  </div>

  {/* 4. DICA / MACETE */}
  <AlertBox tipo="info" titulo="Macete">
    Dica prática para o aluno memorizar.
  </AlertBox>

  {/* 5. EXCEÇÃO (opcional) */}
  <p className="text-xs text-muted-foreground italic">
    Exceção: Caso específico onde a regra muda.
  </p>
</div>
```

---

## 🔗 Quando Usar

| Cenário                                       | Use AcordeonCarrossel?                    |
| --------------------------------------------- | ----------------------------------------- |
| Categorias opostas (Proibido vs. Obrigatório) | ✅ Sim                                    |
| Categorias complementares (Tipos A, B, C)     | ✅ Sim                                    |
| Lista simples de regras (sem categorias)      | ❌ Não — use `CardCarousel` direto        |
| Conteúdo com 1 única categoria                | ❌ Não — use 1 `ContentAccordion` simples |
| Comparação visual lado a lado                 | ❌ Não — use `ComparisonSide`             |

---

## 🚨 REGRAS IMPERATIVAS

### 1️⃣ NUNCA números hardcoded
- Contar items do conteúdo original
- Listar categorias explicitamente antes de perguntar
- Confirmar com o usuário a quantidade antes de implementar

### 2️⃣ EMOJI APENAS em `icone`, NUNCA em `titulo`
- ✅ CORRETO: `icone="📖"` + `titulo="Conceituação - O que é PA?"`
- ❌ ERRADO: `titulo="📖 Conceituação - O que é PA?"` (duplica emoji)
- Emoji aparece NO BADGE, não no texto do título

### 3️⃣ SEMPRE `mode="stacked"` para ContentAccordion
- Tipo 3 (recomendado) é SEM carrossel
- Sem navegação de carrossel
- Sem "tópicos disponíveis"
- 1 único slide por ContentAccordion (array com 1 objeto)

### 4️⃣ Conteúdo RICO em C.E.D.E.
- Conceituação (definição + intuição)
- Exemplificação (2+ exemplos com detalhes)
- Dicas (macete + AlertBox)
- Exceções (pegadinhas + casos especiais)
- Fonts: `text-lg`/`text-xl` para títulos, `text-base` mínimo para corpo
- Espaçamento: `space-y-8` entre seções

### 5️⃣ Espaçamento reduzido
- Entre acordeons: `space-y-2 md:space-y-1.5` (metade do original)
- Dentro do conteúdo: `space-y-6` ou `space-y-8`

### 6️⃣ SEM duplicação
- Sem `titulo` no slide (apenas na prop do ContentAccordion)
- Sem emoji no título (apenas no `icone`)
- Sem slides vazios ou genéricos

---

## 📋 Checklist de Implementação

Ao usar esta skill, SEMPRE:

**Passo 1: NUNCA deixar números hardcoded**
- [ ] Ler o card/conteúdo original
- [ ] CONTAR quantas categorias/items principais existem
- [ ] Listar cada categoria explicitamente
- [ ] Perguntar ao usuário para confirmar a contagem

**Passo 2: Qual tipo de conteúdo?**
- [ ] Tipo 1 (Carrossel de Texto — 2 itens)
- [ ] Tipo 2 (Carrossel de FlipCards — 2 cards)
- [ ] [ x ] Tipo 3 (Sem Carrossel — RECOMENDADO)

- [ ] **Estrutura de ContentAccordion:**
  - [ ] **N ContentAccordion independentes** (onde N = número de categorias pré-identificadas no conteúdo)
  - [ ] Primeira aberta (`defaultOpen={true}`)
  - [ ] Restantes fechadas (`defaultOpen={false}`)
  - [ ] **NUNCA** deixar um número hardcoded — contar os items do card original e criar 1 ContentAccordion por item

- [ ] **Espaçamento:**
  - [ ] `<section className="space-y-6">` entre acordeons
  - [ ] `<div className="space-y-6">` dentro do conteúdo

- [ ] **Fonts e Legibilidade:**
  - [ ] Títulos: `text-lg` ou `text-xl`
  - [ ] Corpo: `text-base` (nunca `text-sm`)
  - [ ] Padding em caixas: `p-6` (nunca `p-3`)

- [ ] **Regra C.E.D.E.:**
  - [ ] Conceituação ✓
  - [ ] Exemplificação ✓
  - [ ] Dicas ✓
  - [ ] Exceções ✓

---

## 📚 Implementação de Referência (Padrão FINAL)

**Arquivo:** `src/components/aulas/matematica/AulaProgressoesPa.tsx` — **Módulo 1**

**Padrão:** 4 ContentAccordion independentes (Conceituação, Exemplificação, Dicas, Exceções)

**Características do Padrão FINAL:**
- ✅ `mode="stacked"` (SEM carrossel)
- ✅ Ícones aparecem no trigger do acordeon (não no slide)
- ✅ Títulos grandes (`text-xl md:text-2xl`) no trigger
- ✅ Conteúdo rico com `space-y-8` entre seções
- ✅ Sem navegação de carrossel
- ✅ Espaçamento reduzido (`space-y-2 md:space-y-1.5`) entre acordeons
- ✅ Sem duplicação de títulos (apenas na prop `titulo` do ContentAccordion)

Este é o exemplo canônico do padrão AcordeonCarrossel v3 (FINAL) implementado com todas as regras.

---

## 🎯 Regra Crítica: Contagem Dinâmica de Items

### ❌ NUNCA FAÇA:
```
"Qual tipo de conteúdo você quer usar para os **4** acordeons?"
```
Deixar um número hardcoded (4, 5, etc) é ERRADO porque:
- O número deve ser derivado do conteúdo pré-existente
- Sem ver o contexto, não há garantia de que o número está correto
- Força o usuário a contar manualmente

### ✅ SEMPRE FAÇA:
```
"Qual tipo de conteúdo você quer usar para os acordeons?"

Identifiquei que o card original contém estes items/categorias:
1. Conceituação
2. Exemplificação
3. Dicas
4. Exceções

Vou criar 1 ContentAccordion para cada um. Está correto?
```

**Processo:**
1. Ler o card/conteúdo original
2. CONTAR quantas categorias/items principais existem
3. Listar cada uma explicitamente no diálogo com o usuário
4. Confirmar antes de implementar
5. Criar exatamente N ContentAccordion (onde N = quantidade contada)
