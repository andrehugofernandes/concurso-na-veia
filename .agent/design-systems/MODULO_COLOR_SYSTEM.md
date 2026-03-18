---
name: Sistema de Coloração de Módulos (1-10)
description: Paleta harmônica para identificação visual de módulos em aulas premium
type: design-system
---

# 🎨 Sistema de Coloração de Módulos (1-10)

## Objetivo

Cada aula possui **10 módulos** com **cores únicas e harmônicas**. O usuário identifica sua posição na aula **apenas pela cor** do banner e dos cards numerados.

---

## 📊 Paleta Oficial de Cores (10 Módulos)

| Módulo | Tailwind | Hex       | Nome          | Uso                          |
|--------|----------|-----------|---------------|------------------------------|
| **1**  | `blue-500`    | `#3b82f6` | Azul Primário | Banner + Header + Indicadores |
| **2**  | `cyan-500`    | `#06b6d4` | Ciano         | Banner + Header + Indicadores |
| **3**  | `emerald-500` | `#10b981` | Esmeralda     | Banner + Header + Indicadores |
| **4**  | `teal-500`    | `#14b8a6` | Teal          | Banner + Header + Indicadores |
| **5**  | `violet-500`  | `#a78bfa` | Violeta       | Banner + Header + Indicadores |
| **6**  | `amber-500`   | `#f59e0b` | Âmbar         | Banner + Header + Indicadores |
| **7**  | `orange-500`  | `#f97316` | Laranja       | Banner + Header + Indicadores |
| **8**  | `red-500`     | `#ef4444` | Vermelho      | Banner + Header + Indicadores |
| **9**  | `pink-500`    | `#ec4899` | Rosa          | Banner + Header + Indicadores |
| **10** | `indigo-500`  | `#6366f1` | Índigo        | Banner + Header + Indicadores |

---

## 🎯 Regras de Aplicação

### 1️⃣ **ModuleBanner** — Deve usar a cor do módulo

**Prop `variant`** (mapeado internamente):

```tsx
<ModuleBanner
  index={1}  // ← Define a cor automaticamente
  titulo="Fundamentos de Conjuntos"
  descricao="Definições, conceitos e notações fundamentais."
  // variant será automaticamente "blue" (módulo 1)
/>
```

**Mapeamento automático:**
```tsx
const variantMap = {
  1: "blue",
  2: "cyan",
  3: "emerald",
  4: "teal",
  5: "violet",
  6: "amber",
  7: "orange",
  8: "red",
  9: "pink",
  10: "indigo"
};
```

---

### 2️⃣ **ModuleSectionHeader** — Deve usar a cor do módulo

**Prop `variant`** (deve ser passada explicitamente):

```tsx
<ModuleSectionHeader
  index={1}      // ← Número do módulo (1-10)
  title="Conceitos Fundamentais de Conjuntos"
  variant="blue" // ← Cor correspondente ao módulo 1
/>
```

**Quando chamar ModuleSectionHeader:**
- Sempre que há uma **seção principal dentro do módulo** (cards com número)
- O `variant` deve **sempre corresponder ao `index`** do módulo

---

### 3️⃣ **Cards Numerados no Topo** (StickyModuleNav)

Os pequenos badges/indicadores de navegação no topo devem refletir a **cor do módulo atual**:

```tsx
// No shared.tsx ou no componente de navegação:
const colors = [
  "bg-blue-500",    // Módulo 1
  "bg-cyan-500",    // Módulo 2
  "bg-emerald-500", // Módulo 3
  "bg-teal-500",    // Módulo 4
  "bg-violet-500",  // Módulo 5
  "bg-amber-500",   // Módulo 6
  "bg-orange-500",  // Módulo 7
  "bg-red-500",     // Módulo 8
  "bg-pink-500",    // Módulo 9
  "bg-indigo-500"   // Módulo 10
];

// Renderizar:
MODULE_DEFS.forEach((mod, idx) => (
  <div className={`${colors[idx]} rounded-full w-8 h-8`}>
    {idx + 1}
  </div>
));
```

---

### 4️⃣ **CardCarousel** — Usar `corIndicador` com a cor do módulo

```tsx
<CardCarousel
  cards={[...]}
  slidesPerView={2}
  corIndicador="bg-blue-500"  // ← Cor do módulo 1
/>
```

---

### 5️⃣ **AlertBox** — Pode usar cores complementares

```tsx
// Pegadinha CESGRANRIO (roxo/violeta):
<AlertBox tipo="warning" titulo="🚨 Pegadinha CESGRANRIO">
  Cuidado com...
</AlertBox>

// Dica premium (verde):
<AlertBox tipo="success" titulo="💡 Dica de Elite">
  Macete para ganhar tempo...
</AlertBox>
```

---

## 🔄 Mapeamento Automático (Para Implementação)

Criar uma **função auxiliar** que mapeia `moduleIndex` → cor:

**Arquivo: `src/lib/moduleColors.ts`**

```typescript
/**
 * Retorna a cor Tailwind para um módulo (1-10)
 * @param moduleIndex número do módulo (1-10)
 * @returns string da classe Tailwind (ex: "blue-500")
 */
export function getModuleColor(moduleIndex: number): string {
  const colors = [
    "blue-500",    // 1
    "cyan-500",    // 2
    "emerald-500", // 3
    "teal-500",    // 4
    "violet-500",  // 5
    "amber-500",   // 6
    "orange-500",  // 7
    "red-500",     // 8
    "pink-500",    // 9
    "indigo-500"   // 10
  ];
  return colors[moduleIndex - 1] || "blue-500";
}

/**
 * Retorna a cor hex para um módulo (1-10)
 * @param moduleIndex número do módulo (1-10)
 * @returns string hex (ex: "#3b82f6")
 */
export function getModuleColorHex(moduleIndex: number): string {
  const hexColors = [
    "#3b82f6",  // 1 - blue
    "#06b6d4",  // 2 - cyan
    "#10b981",  // 3 - emerald
    "#14b8a6",  // 4 - teal
    "#a78bfa",  // 5 - violet
    "#f59e0b",  // 6 - amber
    "#f97316",  // 7 - orange
    "#ef4444",  // 8 - red
    "#ec4899",  // 9 - pink
    "#6366f1"   // 10 - indigo
  ];
  return hexColors[moduleIndex - 1] || "#3b82f6";
}

/**
 * Retorna a cor variant para ModuleBanner/ModuleSectionHeader
 * @param moduleIndex número do módulo (1-10)
 * @returns string variant (ex: "blue", "cyan", etc)
 */
export function getModuleVariant(moduleIndex: number):
  | "blue"
  | "cyan"
  | "emerald"
  | "teal"
  | "violet"
  | "amber"
  | "orange"
  | "red"
  | "pink"
  | "indigo" {
  const variants = [
    "blue",    // 1
    "cyan",    // 2
    "emerald", // 3
    "teal",    // 4
    "violet",  // 5
    "amber",   // 6
    "orange",  // 7
    "red",     // 8
    "pink",    // 9
    "indigo"   // 10
  ] as const;
  return variants[moduleIndex - 1] || "blue";
}
```

---

## ✅ Checklist de Validação por Aula

Ao criar ou atualizar uma aula, verificar:

- [ ] **ModuleBanner** tem `index={1}` a `index={10}`
- [ ] **ModuleSectionHeader** tem `variant` correto (derivado de `index`)
- [ ] **Todos os 10 módulos** têm cores diferentes
- [ ] **CardCarousel** usa `corIndicador` da cor do módulo
- [ ] **StickyModuleNav** (badges no topo) refletem as cores corretas
- [ ] **Quiz** usa a cor do módulo (prop na QuizInterativo)
- [ ] **AlertBox** usa cores consistentes (warning=violeta, success=verde, info=azul)

---

## 🚫 Anti-Patterns (O QUE NÃO FAZER)

### ❌ Erro 1: Usar a mesma cor em todos os módulos

```tsx
// ❌ ERRADO
<ModuleBanner index={5} variant="blue" /> // Todos azul → confusão visual
```

**✅ CORRETO:**
```tsx
// ✅ CERTO
<ModuleBanner index={5} variant="violet" /> // Cada módulo sua cor
```

---

### ❌ Erro 2: Cores aleatórias ou não mapeadas

```tsx
// ❌ ERRADO
<ModuleSectionHeader index={3} variant="purple" /> // purple não existe na paleta!
```

**✅ CORRETO:**
```tsx
// ✅ CERTO
<ModuleSectionHeader index={3} variant="emerald" /> // Sempre emerald para módulo 3
```

---

### ❌ Erro 3: Indicador (número) não corresponde à cor

```tsx
// ❌ ERRADO
<ModuleBanner index={7} variant="blue" /> // Módulo 7 mas cor é azul (módulo 1)
```

**✅ CORRETO:**
```tsx
// ✅ CERTO
<ModuleBanner index={7} variant="orange" /> // Módulo 7 = laranja
```

---

### ❌ Erro 4: Cores muito saturadas que prejudicam legibilidade

```tsx
// ❌ Evitar se possível:
"bg-yellow-500"  // Contraste baixo em dark mode
"bg-gray-500"    // Não diferencia bem entre módulos
```

**✅ Paleta aprovada:**
Todas as 10 cores da tabela oficial têm contraste garantido em light e dark modes.

---

## 📋 Implementação por Componente

### **ModuleBanner.tsx**

```tsx
interface ModuleBannerProps {
  index: number;           // 1-10
  titulo: string;
  descricao: string;
}

export function ModuleBanner({ index, titulo, descricao }: ModuleBannerProps) {
  const variant = getModuleVariant(index);

  return (
    <div className={`bg-gradient-to-r from-${variant}-500 to-${variant}-600 rounded-2xl p-8 text-white`}>
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold bg-white/20 rounded-full w-16 h-16 flex items-center justify-center">
          {index}
        </span>
        <div>
          <h2 className="text-3xl font-bold">{titulo}</h2>
          <p className="text-white/80 mt-2">{descricao}</p>
        </div>
      </div>
    </div>
  );
}
```

### **ModuleSectionHeader.tsx**

```tsx
interface ModuleSectionHeaderProps {
  index: number;
  title: string;
  variant: "blue" | "cyan" | "emerald" | "teal" | "violet" | "amber" | "orange" | "red" | "pink" | "indigo";
}

export function ModuleSectionHeader({ index, title, variant }: ModuleSectionHeaderProps) {
  const colorClasses = {
    blue: "bg-blue-500",
    cyan: "bg-cyan-500",
    emerald: "bg-emerald-500",
    teal: "bg-teal-500",
    violet: "bg-violet-500",
    amber: "bg-amber-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    pink: "bg-pink-500",
    indigo: "bg-indigo-500"
  };

  return (
    <div className="flex items-center gap-4">
      <span className={`${colorClasses[variant]} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg`}>
        {index}
      </span>
      <h3 className="text-2xl font-bold text-foreground">{title}</h3>
    </div
  );
}
```

---

## 📊 Visualização da Paleta

```
Módulo 1:  ████████ Azul      (#3b82f6)
Módulo 2:  ████████ Ciano     (#06b6d4)
Módulo 3:  ████████ Esmeralda (#10b981)
Módulo 4:  ████████ Teal      (#14b8a6)
Módulo 5:  ████████ Violeta   (#a78bfa)
Módulo 6:  ████████ Âmbar     (#f59e0b)
Módulo 7:  ████████ Laranja   (#f97316)
Módulo 8:  ████████ Vermelho  (#ef4444)
Módulo 9:  ████████ Rosa      (#ec4899)
Módulo 10: ████████ Índigo    (#6366f1)
```

---

## 🔍 Próximas Ações

1. ✅ **Criar `src/lib/moduleColors.ts`** com funções auxiliares
2. ✅ **Atualizar `ModuleBanner.tsx`** para usar `getModuleVariant(index)`
3. ✅ **Atualizar `ModuleSectionHeader.tsx`** para validar `variant`
4. ✅ **Varredura em todas as aulas** (11 matemática + português)
5. ✅ **Criar documento de validação** com checklist por aula

---

## 📚 Referência

- **Arquivo de cores:** `src/lib/moduleColors.ts`
- **Design System:** Este documento
- **Aulas base:** `src/components/aulas/matematica/`, `src/components/aulas/portugues/`
