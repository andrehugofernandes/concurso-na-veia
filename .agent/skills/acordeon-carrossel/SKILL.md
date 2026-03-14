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

## ✅ Padrão Correto (Tipo 3 - Recomendado)

```tsx
// ✅ CORRETO: 4 ContentAccordion independentes, cada um com conteúdo rico (SEM carrossel)

<ModuleSectionHeader
  index={1}
  title="Conceitos Fundamentais de PA"
  description="Entenda razão e primeiro termo"
  variant="blue"
/>

{/* ACORDEON 1: Conceituação */}
<ContentAccordion
  titulo="📖 Conceituação - O que é PA?"
  icone="🔢"
  corIndicador="bg-blue-500"
  defaultOpen={true}
  slides={[
    {
      titulo: "Conceituação",
      conteudo: (
        <div className="space-y-6">
          <p className="text-base leading-relaxed">
            Uma <strong>Progressão Aritmética (PA)</strong> é uma sequência onde
            <strong>cada termo é obtido somando uma constante chamada razão (r)</strong>.
          </p>

          <div className="p-6 bg-blue-500/15 rounded-xl border border-blue-500/30">
            <p className="text-lg font-bold text-blue-700 mb-4">Estrutura da PA:</p>
            <div className="space-y-3 font-mono text-base">
              <p><strong>PA:</strong> a₁, a₂, a₃, ...</p>
              <p><strong>aₙ</strong> = a₁ + (n-1)r</p>
            </div>
          </div>
        </div>
      ),
    },
  ]}
/>

{/* ACORDEON 2: Exemplificação */}
<ContentAccordion
  titulo="📚 Exemplificação - Casos Práticos"
  icone="📊"
  corIndicador="bg-emerald-500"
  defaultOpen={false}
  slides={[
    {
      titulo: "Exemplificação",
      conteudo: (
        <div className="space-y-6">
          <p className="text-base">Dependendo de r, a PA cresce, decresce ou se mantém:</p>

          <div className="p-6 bg-emerald-500/15 rounded-xl">
            <p className="text-lg font-bold text-emerald-700">✅ Crescimento (r > 0):</p>
            <p className="text-base">PA: <strong>(5, 10, 15, 20, ...)</strong></p>
          </div>

          <div className="p-6 bg-red-500/15 rounded-xl">
            <p className="text-lg font-bold text-red-700">📉 Decrescimento (r < 0):</p>
            <p className="text-base">PA: <strong>(100, 90, 80, ...)</strong></p>
          </div>
        </div>
      ),
    },
  ]}
/>

{/* ACORDEON 3: Dicas */}
<ContentAccordion
  titulo="💡 Dicas - Teste da Razão"
  icone="✅"
  corIndicador="bg-amber-500"
  defaultOpen={false}
  slides={[
    {
      titulo: "Dicas",
      conteudo: (
        <div className="space-y-6">
          <p className="text-base">
            Para verificar se é PA, subtraia termos consecutivos.
            Se sempre igual, é PA!
          </p>

          <AlertBox tipo="success" titulo="✅ Teste Prático">
            <div className="space-y-3 text-base">
              <p><strong>Sequência: (3, 7, 11, 15)</strong></p>
              <p>• 7 - 3 = 4 ✓ | 11 - 7 = 4 ✓</p>
              <p>→ É PA com r = 4!</p>
            </div>
          </AlertBox>
        </div>
      ),
    },
  ]}
/>

{/* ACORDEON 4: Exceções */}
<ContentAccordion
  titulo="⚠️ Exceções - Casos Especiais"
  icone="⚠️"
  corIndicador="bg-red-500"
  defaultOpen={false}
  slides={[
    {
      titulo: "Exceções",
      conteudo: (
        <div className="space-y-6">
          <p className="text-base">Situações especiais que você deve conhecer:</p>

          <div className="p-6 bg-blue-500/15 rounded-xl">
            <p className="text-lg font-bold text-blue-700">1️⃣ PA com Primeiro Termo Zero</p>
            <p className="text-base">PA: <strong>(0, 3, 6, 9, ...)</strong> | r = 3</p>
          </div>

          <div className="p-6 bg-blue-500/15 rounded-xl">
            <p className="text-lg font-bold text-blue-700">2️⃣ PA com Razão Negativa</p>
            <p className="text-base">PA: <strong>(-2, -5, -8, ...)</strong> | r = -3</p>
          </div>
        </div>
      ),
    },
  ]}
/>
```

---

## 🎨 Regras de Design

| Elemento | Tipo 1 (Text) | Tipo 2 (Flip) | Tipo 3 (Simples) |
|----------|--------------|---------------|-----------------|
| **Acordeon 1** | `defaultOpen={true}` | `defaultOpen={true}` | `defaultOpen={true}` |
| **Acordeon 2+** | `defaultOpen={false}` | `defaultOpen={false}` | `defaultOpen={false}` |
| **`corIndicador`** | Cor semântica | Cor semântica | Cor semântica |
| **Ícone** | LucideIcon | LucideIcon | Emoji simples |
| **`slidesPerView`** | `{2}` (máximo 2 itens) | `{2}` (máximo 2 cards) | N/A (sem carrossel) |
| **Navegação** | Setas de carrossel | Setas + flip | Nenhuma |
| **Fonts** | `text-base` (corpo) | `text-base` | `text-base` ou maior |
| **Espaçamento** | `space-y-6` entre cards | `space-y-4` | `space-y-6` entre seções |

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

## 📋 Checklist de Implementação

Ao usar esta skill, SEMPRE pergunte:

- [ ] **Qual tipo de conteúdo?**
  - [ ] Tipo 1 (Carrossel de Texto — 2 itens)
  - [ ] Tipo 2 (Carrossel de FlipCards — 2 cards)
  - [ ] [ x ] Tipo 3 (Sem Carrossel — RECOMENDADO)

- [ ] **Estrutura de ContentAccordion:**
  - [ ] 4 ContentAccordion independentes (C.E.D.E.)
  - [ ] Primeira aberta (`defaultOpen={true}`)
  - [ ] Restantes fechadas (`defaultOpen={false}`)

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

## 📚 Implementação de Referência

**Arquivo:** `src/components/aulas/matematica/AulaProgressoesPa.tsx` — **Módulo 1**

**Padrão:** 4 ContentAccordion independentes (Tipo 3 - Sem Carrossel)

Este é o exemplo canônico do padrão AcordeonCarrossel v2 implementado com todas as regras.
