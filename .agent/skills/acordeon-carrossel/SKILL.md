---
description: Padrão de acordeons independentes com carrosséis internos para organização de conteúdo denso. Use quando precisar separar categorias opostas ou complementares (ex. Proibições vs. Obrigações) com navegação de 1 tópico por vez dentro de cada categoria.
---

# Skill: AcordeonCarrossel

## 📋 O que é

O padrão **AcordeonCarrossel** resolve o problema de conteúdo denso que precisa ser dividido em **categorias independentes**, onde cada categoria contém **múltiplos tópicos** que devem ser apresentados **um por vez**.

> [!IMPORTANT]
> **NÃO** use um único `ContentAccordion` com múltiplos slides renderizados lado a lado em grid. Isso resulta em conteúdo espremido e ilegível. Em vez disso, use **múltiplos `ContentAccordion` independentes**, cada um com seus próprios slides internos.

> [!CAUTION]
> **REGRA DE CONTEÚDO RICO (OBRIGATÓRIA):** Cada tópico dentro do carrossel deve ser **rico e detalhado**. Conteúdo raso ou genérico é PROIBIDO. Todo slide DEVE conter obrigatoriamente:
>
> 1. **Conceituação** — Explicação clara e contextualizada do tópico
> 2. **Exemplos** — Frases reais com destaque visual (✅ certo / ❌ errado)
> 3. **Dicas** — AlertBox com macetes práticos para provas e concursos
> 4. **Exceções** — Quando aplicável, em texto sutil com casos onde a regra muda
>
> Um slide com apenas 1 frase ou sem exemplos concretos é considerado **incompleto** e viola este padrão.

> [!TIP]
> **FLIP CARDS NO CARROSSEL:** O Acordeon-Carrossel suporta e encoraja o uso do componente `FlipCard` dentro do `conteudo` dos seus slides para criar memorização ativa (Flashcards).
>
> - Se o conteúdo da categoria for extenso/denso: Exiba **1 FlipCard** por vez (ou 1 tópico tradicional por vez) ajustando `slidesPerView={1}`.
> - Se for conteúdo rápido e enxuto: Exiba **até 2 FlipCards** por vez ajustando `slidesPerView={2}`.

---

## 🏗️ Estrutura do Padrão

```
ModuleSectionHeader (título da seção)
│
├── ContentAccordion #1 (Categoria A) ← expande/colapsa independentemente
│   ├── Slide 1: Tópico com conteúdo rico (1 por vez)
│   ├── Slide 2: Tópico com conteúdo rico
│   └── Slide 3: Tópico com conteúdo rico
│
└── ContentAccordion #2 (Categoria B) ← expande/colapsa independentemente
    ├── Slide 1: Tópico com conteúdo rico (1 por vez)
    ├── Slide 2: Tópico com conteúdo rico
    ├── Slide 3: Tópico com conteúdo rico
    └── Slide 4: Tópico com conteúdo rico
```

**Cada slide do acordeon deve conter uma das estruturas:**

**A) Estrutura Teórica Padrão**:

1. **Conceituação** — Explicação clara do tópico
2. **Exemplos** — Certo/Errado com destaque visual
3. **Dicas** — AlertBox com macetes ou observações
4. **Exceções** — Quando aplicável, em texto sutil

**B) Estrutura de Flashcard (Usando FlipCard)**:
O conteúdo do slide é um ou mais componentes `<FlipCard>`.
Caso existam múltiplos `<FlipCard>` sequenciais, agrupe-os em um layout responsivo (`grid` ou `flex`), mas cuidado para não exceder limites de visualização. Se couber, exiba de 1 a 2 por vez no carrossel.

---

## ❌ Anti-Padrão (NÃO FAÇA)

```tsx
// ❌ ERRADO: Um ContentAccordion com todos os tópicos juntos
<ContentAccordion
  titulo="Guia Completo"
  slides={[
    { titulo: "Categoria A", conteudo: <CardCarousel cards={[...]} /> },
    { titulo: "Categoria B", conteudo: <CardCarousel cards={[...]} /> },
  ]}
/>
// Resultado: 2 slides lado a lado, espremidos, conteúdo ilegível
```

---

## ✅ Padrão Correto

```tsx
// ✅ CORRETO: Acordeons independentes, cada um com slides ricos

{
  /* Header da seção */
}
<ModuleSectionHeader
  index={2}
  title="Proibições vs. Obrigações"
  variant="emerald"
  className="mb-8"
/>;

{
  /* ACORDEON 1: Proibições */
}
<ContentAccordion
  titulo="⛔ Proibições"
  icone={<LuBan />}
  corIndicador="bg-red-500"
  defaultOpen={true}
  slides={[
    {
      titulo: "Sujeito e Verbo",
      icone: "🚫",
      conteudo: (
        <div className="space-y-4">
          {/* 1. CONCEITUAÇÃO */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            O <strong>Sujeito</strong> e o <strong>Verbo</strong> formam um elo
            inquebrantável. Jamais coloque vírgula entre eles.
          </p>

          {/* 2. EXEMPLO ERRADO */}
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
            <p className="text-sm line-through text-red-500">
              ❌ "O plano de expansão, foi aprovado."
            </p>
          </div>

          {/* 3. EXEMPLO CORRETO */}
          <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
            <p className="text-sm font-bold text-green-600 dark:text-green-400">
              ✅ "O plano de expansão foi aprovado."
            </p>
          </div>

          {/* 4. DICA */}
          <AlertBox tipo="warning" titulo="Dica de Ouro">
            A banca adora sujeitos longos para forçar o candidato a "respirar"
            com vírgula. Não caia nessa!
          </AlertBox>
        </div>
      ),
    },
    {
      titulo: "Verbo e Objeto",
      icone: "⛔",
      conteudo: (
        <div className="space-y-4">
          {/* Mesma estrutura: Conceituação → Exemplo → Dica */}
        </div>
      ),
    },
    // ... mais slides
  ]}
/>;

{
  /* ACORDEON 2: Obrigações */
}
<ContentAccordion
  titulo="✅ Obrigações"
  icone={<LuCheckCircle />}
  corIndicador="bg-green-500"
  defaultOpen={false}
  slides={[
    {
      titulo: "Aposto Explicativo",
      icone: "💬",
      conteudo: (
        <div className="space-y-4">
          {/* Conceituação → Exemplos → Macete */}
        </div>
      ),
    },
    // ... mais slides
  ]}
/>;
```

---

## 🎨 Regras de Design

| Elemento                   | Regra                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Acordeon 1**             | `defaultOpen={true}` — sempre aberto ao carregar                                                            |
| **Acordeon 2+**            | `defaultOpen={false}` — fechado por padrão                                                                  |
| **`corIndicador`**         | Usar cor semântica: `bg-red-500` para proibições, `bg-green-500` para obrigações, `bg-blue-500` para neutro |
| **Ícone do acordeon**      | LucideIcon semântico (ex: `LuBan`, `LuCheckCircle`, `LuShield`)                                             |
| **Slides internos**        | Cada slide = 1 ou no máximo 2 tópicos/flips. Navegação sequencial via carrossel (`slidesPerView`)           |
| **Conteúdo de cada slide** | Padrão Clássico: Conceituação + Exemplos (certo/errado) + Dica/AlertBox<br/>Padrão Flashcard: `FlipCard`    |

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

## 📝 Implementação de Referência

Arquivo: [`AulaPontuacao.tsx`](file:///c:/Workspace/petrobras-quest/src/components/aulas/AulaPontuacao.tsx) — **Módulo 2, Card 2 (Proibições vs. Obrigações)**

Este é o exemplo canônico do padrão AcordeonCarrossel implementado e validado.
