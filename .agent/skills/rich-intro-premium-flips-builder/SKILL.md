---
name: rich-intro-premium-flips-builder
description: "Use when creating or standardizing Rich Intro sections and premium FlipCards in educational modules (Aulas). Detects non-compliant modules and upgrades them to the premium standard."
allowed-tools: Read, Write, Edit, Command
version: 1.0
priority: HIGH
skills:
  - clean-code
triggers:
  - rich intro
  - premium flipcard
  - module standardization
  - INTRO header
  - aula upgrade
  - lesson builder
  - educational content
  - FlipCard premium
---

# Rich Intro & Premium FlipCards Builder

> **PURPOSE:** Standardize all educational module sections to the premium design system. Every module MUST have a Rich Intro (index="INTRO" + at least 10 dense paragraphs, minimum 2 per letter/pillar) and all FlipCards MUST use the Lucide icon premium layout.

---

## When to Use

- Creating a **new Aula** (lesson) component
- **Upgrading** an existing Aula to the premium standard
- Running an **audit** to find non-compliant modules
- Fixing `FlipCard` components that still use emoji or generic styles

---

## 🔴 The 3 Pillars (MANDATORY)

### Pilar 1: Rich Intro Header

Every module's introduction section MUST use `index="INTRO"` instead of numeric indices.

```tsx
// ❌ WRONG — numeric index
<ModuleSectionHeader index={1} title="..." variant={mv[N]} />

// ✅ CORRECT — semantic INTRO
<ModuleSectionHeader
  index="INTRO"
  title="Título Descritivo do Módulo"
  variant={mv[N]}
/>
```

### Pilar 2: At least 10-Paragraph Dense Introduction (C.E.D.E.A)

Every intro section MUST contain **at least 10 paragraphs** following the **C.E.D.E.A** framework (minimum of 2 dense paragraphs per letter/pillar):

| #    | Mnemônico        | Conteúdo                                                                                                                   |
| ---- | ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1-2  | **C**ontexto     | Situar o tema no universo da disciplina e sua relevância para concursos (mínimo 2 parágrafos)                              |
| 3-4  | **E**xplicação   | Detalhar o mecanismo/regra gramatical com precisão técnica texto ostensivo (mínimo 2 parágrafos)                           |
| 5-6  | **D**emonstração | Exemplos práticos com contraste (correto vs incorreto) texto ilustrativo e ostensivo (mínimo 2 parágrafos)                 |
| 7-8  | **E**xpansão     | Nuances, exceções, ou conexões com outros temas fazendo sempre com um texto ostensivo (mínimo 2 parágrafos)                |
| 9-10 | **A**plicação    | Orientação para a prova CESGRANRIO — como a banca cobra o tema fazendo sempre com um texto ostensivo (mínimo 2 parágrafos) |

**Regras de Estilo e Tipografia:**
- Linguagem formal, tom de treinamento técnico.
- **NUNCA use `text-sm` ou `text-xs` para conteúdo explicativo. Use sempre `text-lg` para textos corridos e `text-xl` para títulos e subtítulos.**
- Wrapper geral da introdução: `<div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">`.

---

## 📚 2. Diagramação Didática Editorial (Estilo Revista) em Rich-Intros

Ao construir ou atualizar uma aula, a seção de introdução de cada módulo (`index="INTRO"`) deve abandonar blocos maciços de texto corrido em prol de um design fluido e interativo:

### A. Quebra de Listas Corridas (Cards Numéricos)
Se o texto contiver enumerações ou tópicos do tipo `(1) isso, (2) aquilo`, extraia-os para um grid de colunas com numerações azuis brilhantes em destaque e títulos grandes:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  {PILAR_ITEMS.map((item) => (
    <div key={item.num} className="flex gap-4 p-4 bg-muted/30 border border-border/10 rounded-xl">
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-extrabold text-lg shrink-0">
        {item.num}
      </span>
      <div className="space-y-1">
        <h5 className="font-bold text-foreground text-xl">{item.title}</h5>
        <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
      </div>
    </div>
  ))}
</div>
```

### B. Uma Imagem Clicável com Lightbox por Módulo
Cada introdução deve conter exatamente uma imagem ilustrativa relevante posicionada em layout assimétrico (texto correndo ao lado). A imagem deve suportar zoom interativo por modal/lightbox:

1. **Estado do Componente:** Declare `const [isImageZoomed, setIsImageZoomed] = useState(false);` no topo do arquivo da aula.
2. **Nomenclatura Genérica (Caminho Padrão):** O arquivo de imagem deve seguir a nomenclatura genérica `/assets/images/matematica/[topico]/modulo-[N]/m[N]-intro.png`.
3. **Prescrição e Prompt no Código:**
   ```tsx
   <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
     <div className="space-y-4">
       <h4 className="font-bold text-foreground text-xl flex items-center gap-2">
         <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
         Título Explicativo do Diagrama
       </h4>
       <p className="text-lg">Texto fluindo...</p>
     </div>
     <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
       <div 
         className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
         onClick={() => setIsImageZoomed(true)}
       >
         <img
           src="/assets/images/matematica/[topico]/modulo-[N]/m[N]-intro.png"
           // PROMPT: [MANDATÓRIO] Descreva o que aparecerá na imagem gerada pelo Nano Banana. Estilo Dark Premium, fundo (#0a0f1d), proporção 1:1.
           alt="Legenda de acessibilidade"
           className="w-full rounded-2xl border border-border/20 shadow-lg"
         />
       </div>
       <p className="text-lg text-muted-foreground text-center">Fig 1. Legenda ilustrativa.</p>
     </div>
   </div>
   ```
4. **Modal Lightbox (ao final do JSX, antes de `</AulaTemplate>`):**
   ```tsx
   {isImageZoomed && (
     <div 
       className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
       onClick={() => setIsImageZoomed(false)}
     >
       <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
         <img
           src="/assets/images/matematica/[topico]/modulo-1/m1-intro.png" // Ajuste dinamicamente se houver várias imagens
           alt="Imagem ampliada"
           className="max-w-full max-h-full object-contain rounded-2xl border border-border/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
         />
         <button className="absolute top-4 right-4 p-3 bg-muted/80 backdrop-blur-md rounded-full text-foreground" onClick={() => setIsImageZoomed(false)}>
           <LuX className="w-6 h-6" />
         </button>
       </div>
     </div>
   )}
   ```

### C. Blocos Comparativos de Erros Frequentes
Destaque os erros e pontos cruciais de prova em colunas separadas com cores semânticas (`rose` para erros e `amber`/`emerald` para acertos):
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2">
    <h5 className="font-bold text-rose-400 flex items-center gap-2 text-xl">Erro Clássico</h5>
    <p className="text-lg text-foreground/85 leading-relaxed">...</p>
  </div>
  <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
    <h5 className="font-bold text-amber-400 flex items-center gap-2 text-xl">Dica de Elite</h5>
    <p className="text-lg text-foreground/85 leading-relaxed">...</p>
  </div>
</div>
```

---

## 🎨 Pilar 3: Premium FlipCards (Lucide Icons)

Todos os FlipCards DEVEM seguir o layout premium com ícones Lucide, cores temáticas, e header bar no verso.

---

## 🎨 FlipCard Premium — Anatomia Completa

### Frente (Front)

```tsx
<FlipCard
  frente={
    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
      {/* 1. ÍCONE — Lucide com cor temática */}
      <div className="p-4 bg-{COLOR}-500/10 rounded-full shadow-inner ring-1 ring-{COLOR}-500/20">
        <LuIconName className="w-12 h-12 text-{COLOR}-500" />
      </div>
      {/* 2. TÍTULO — uppercase, bold */}
      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
        Título do Card
      </span>
      {/* 3. SUBTÍTULO — cor temática, descritivo (NÃO "Ponto de Atenção") */}
      <span className="text-sm text-{COLOR}-500/80 font-medium">
        Subtítulo Descritivo
      </span>
    </div>
  }
```

### Verso (Back)

```tsx
  verso={
    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
      {/* 1. HEADER BAR — ícone + label uppercase */}
      <div className="flex items-center gap-2 text-{COLOR}-500 font-bold border-b border-{COLOR}-500/10 pb-3">
        <LuCheck className="w-5 h-5 shrink-0" />
        <span className="tracking-widest uppercase text-xs">Label do Conceito</span>
      </div>
      {/* 2. CONTEÚDO — text-sm com muted-foreground */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        Explicação principal do conceito.
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        ✅ "Exemplo correto com <strong>destaque</strong>."
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        ❌ "Exemplo incorreto com <strong>destaque</strong>."
      </p>
    </div>
  }
  categoria="Nome da Categoria"
/>
```

### Grid Container

```tsx
{
  /* Sempre gap-6, nunca gap-4 */
}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* 3 FlipCards por seção */}
</div>;
```

---

## 🎨 Paleta de Cores por Contexto

Use cores **consistentes por tema** dentro de cada módulo:

| Contexto             | Cor 1     | Cor 2     | Cor 3    |
| -------------------- | --------- | --------- | -------- |
| Regras positivas     | `emerald` | `teal`    | `cyan`   |
| Alertas/Proibições   | `red`     | `amber`   | `orange` |
| Análise/Método       | `blue`    | `indigo`  | `slate`  |
| Dúvidas/Facultativo  | `yellow`  | `amber`   | `lime`   |
| Revisão/Consolidação | `slate`   | `emerald` | `blue`   |

> 🔴 **PROIBIDO:** Usar `bg-primary/10` genérico. Cada card DEVE ter sua cor temática.

---

## ❌ Anti-Patterns (NUNCA FAÇA)

| Anti-Pattern                                                  | Correção                                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `<div className="text-3xl">🏠</div>`                          | `<LuHouse className="w-12 h-12 text-teal-500" />` (Válido para FlipCards) |
| `bg-primary/10 rounded-full`                                  | `bg-{color}-500/10 rounded-full shadow-inner ring-1 ring-{color}-500/20`  |
| `"Ponto de Atenção"` como subtítulo                           | Subtítulo descritivo: `"Varredura de Adjetivos"`                          |
| `<div className="space-y-3 text-lg">` no verso                | `<div className="space-y-4 p-4 flex flex-col justify-center h-full">`     |
| `<p className="font-semibold text-teal-400">` header no verso | Header bar com `LuCheck` + `tracking-widest uppercase text-xs`            |
| `gap-4` no grid de FlipCards                                  | `gap-6`                                                                   |
| `index={1}` na intro                                          | `index="INTRO"`                                                           |
| Intro com 2-3 parágrafos                                      | Mínimo 5 parágrafos (C.E.D.E.A)                                           |

---

## 🔍 Detecção Automática

Execute o script de auditoria para encontrar módulos não conformes:

```bash
python .agent/skills/rich-intro-premium-flips-builder/scripts/audit_modules.py src/components/aulas/
```

O script detecta:

- `bg-primary/10` — FlipCards com cor genérica
- `text-3xl` dentro de FlipCards — emojis no lugar de ícones Lucide
- `"Ponto de Atenção"` — subtítulo genérico
- `index={1}` em seções que deveriam ser `index="INTRO"`
- Intros com menos de 10 `<p>` tags
- **Exceção**: Emojis são permitidos e incentivados na prop `sinteseEstrategica` (Macete Visual).

---

## 📋 Checklist de Módulo Completo

Antes de marcar um módulo como "concluído":

- [ ] `ModuleSectionHeader` usa `index="INTRO"` (não numérico)
- [ ] Intro tem pelo menos 10 parágrafos densos (mínimo de 2 por pilar do C.E.D.E.A)
- [ ] Wrapper da intro: `space-y-6 text-lg text-justify text-foreground/85 leading-relaxed`
- [ ] FlipCards da Seção 1 usam ícones Lucide com cores temáticas
- [ ] FlipCards da Seção "Prática" também usam ícones Lucide (não emojis)
- [ ] Todos os FlipCards têm `categoria="..."` prop
- [ ] Verso dos FlipCards têm header bar com `LuCheck` + label uppercase
- [ ] Grid usa `gap-6` (não `gap-4`)
- [ ] Nenhum `bg-primary/10` restante
- [ ] Nenhum `"Ponto de Atenção"` como subtítulo
- [ ] `tsc --noEmit | findstr "NomeDoArquivo"` retorna zero erros

---

## 📐 Estrutura Padrão de Módulo

```
TabsContent value="modulo-N"
├── ModuleBanner (numero, titulo, variant, descricao)
├── Section: INTRO
│   ├── ModuleSectionHeader index="INTRO"
│   └── div.space-y-6 (pelo menos 10 parágrafos C.E.D.E.A, sendo 2 por pilar)
├── Section: Conceito (index={1})
│   ├── ModuleSectionHeader index={1}
│   └── grid 3-col → 3× FlipCard Premium (Lucide icons)
├── Section: Prática (index={2})
│   ├── ModuleSectionHeader index={2}
│   └── grid 3-col → 3× FlipCard Premium (Lucide icons)
├── AlertBox tipo="info" (Macete Visual)
├── ModuleConsolidation (video, resumo, macete, audio)
└── QuizInterativo (questoes, titulo, numero, variant)
```

---

## Limitations

- This skill applies exclusively to `src/components/aulas/` files in the Petrobras Quest project.
- It standardizes visual layout only — it does NOT validate pedagogical content accuracy.
- Always verify TypeScript compilation after applying changes.
