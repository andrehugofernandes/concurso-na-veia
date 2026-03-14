# 🎨 Sistema de Coloração de Módulos - RESUMO EXECUTIVO

## O Problema (Imagem 1)
❌ Cada módulo tinha cores **aleatórias e desarmônicas**
❌ Usuário **não conseguia identificar** em qual módulo estava
❌ Banner, headers e indicadores com **cores não relacionadas**

## A Solução (Imagem 2 + Paleta)
✅ **10 cores harmônicas** (Azul → Índigo)
✅ **1 cor por módulo** (consistente em banner + header + indicadores)
✅ **Fácil identificação** visual apenas pela cor

---

## 📊 Paleta Oficial (10 Cores)

```
MÓDULO 1   →  🔵 Azul       (#3b82f6)   bg-blue-500
MÓDULO 2   →  🌊 Ciano      (#06b6d4)   bg-cyan-500
MÓDULO 3   →  🌿 Esmeralda  (#10b981)   bg-emerald-500
MÓDULO 4   →  💎 Teal       (#14b8a6)   bg-teal-500
MÓDULO 5   →  💜 Violeta    (#a78bfa)   bg-violet-500
MÓDULO 6   →  🟠 Âmbar      (#f59e0b)   bg-amber-500
MÓDULO 7   →  🧡 Laranja    (#f97316)   bg-orange-500
MÓDULO 8   →  ❤️  Vermelho   (#ef4444)   bg-red-500
MÓDULO 9   →  💗 Rosa       (#ec4899)   bg-pink-500
MÓDULO 10  →  🟣 Índigo     (#6366f1)   bg-indigo-500
```

---

## 🛠️ Implementação

### 📁 Arquivos Criados

1. **`src/lib/moduleColors.ts`** (150+ linhas)
   - Funções: `getModuleColor()`, `getModuleColorHex()`, `getModuleVariant()`, etc
   - Reutilizável em qualquer componente

2. **`.agent/design-systems/MODULO_COLOR_SYSTEM.md`** (Documentação completa)
   - Paleta oficial
   - Regras de aplicação
   - Anti-patterns
   - Implementação por componente

3. **`.agent/design-systems/README.md`** (Este arquivo)
   - Visão geral
   - Referências rápidas
   - Checklist

4. **`.agent/audits/COLOR_SYSTEM_AUDIT.md`** (Auditoria)
   - Checklist por aula
   - Log de conformidade
   - Próximas ações

---

## 🔄 Como Usar em Uma Aula

### ✅ CORRETO - Usando o sistema:

```tsx
// Módulo 1
<ModuleBanner index={1} titulo="Fundamentos" descricao="..." />
// → Automaticamente azul (blue-500)

<ModuleSectionHeader
  index={1}
  title="Conceitos"
  variant={getModuleVariant(1)}
  // → "blue"
/>

<CardCarousel
  cards={[...]}
  corIndicador={`bg-${getModuleColor(1)}`}
  // → "bg-blue-500"
/>
```

### ❌ ERRADO - Hardcoded:

```tsx
<ModuleBanner variant="blue" />  // ✗ Sempre azul, mesmo em módulo 7!
<div className="bg-orange-500" />  // ✗ Hardcoded, não rastreável
```

---

## ✅ Checklist por Aula

Ao criar/atualizar uma aula:

- [ ] **ModuleBanner**: `index={1}` a `index={10}` presentes
- [ ] **ModuleSectionHeader**: `variant` derivado de `getModuleVariant(index)`
- [ ] **CardCarousel**: `corIndicador` usa `getModuleColor()`
- [ ] **StickyModuleNav**: Badges mostram cores progressivas (1 azul, 2 ciano, etc)
- [ ] **Quiz**: Usa cor do módulo (prop na QuizInterativo)
- [ ] **Sem cores hardcoded**: Grep não encontra `bg-blue`, `bg-red`, etc em strings

---

## 🎯 Harmonia Visual (Por Que Essa Paleta?)

### Progressão Lógica
1️⃣ Azul → Básico, fundamental, confiável
2️⃣ Ciano → Transição para verde
3️⃣ Esmeralda → Verde rico, natureza
4️⃣ Teal → Verde-azulado, harmônico
5️⃣ Violeta → Cores quentes começam
6️⃣ Âmbar → Amarelo-alaranjado
7️⃣ Laranja → Quente, energético
8️⃣ Vermelho → Ativo, atenção
9️⃣ Rosa → Suave, complementar
🔟 Índigo → Volta ao azul, fechamento

### Contraste
✅ Todas as 10 cores têm bom contraste em dark mode
✅ Legíveis em light mode
✅ Diferenciáveis uma da outra

---

## 🔍 Próxima Fase: Varredura

Precisamos verificar **todas as 11 aulas de matemática + português** para:

1. ✅ Identificar cores hardcoded
2. ✅ Verificar se ModuleBanner/ModuleSectionHeader estão com coloração correta
3. ✅ Validar StickyModuleNav
4. ✅ Corrigir não-conformidades

**Arquivo de auditoria:** `.agent/audits/COLOR_SYSTEM_AUDIT.md`

---

## 📚 Referências

| Arquivo | Propósito |
|---------|-----------|
| `src/lib/moduleColors.ts` | Código com funções auxiliares |
| `MODULO_COLOR_SYSTEM.md` | Documentação técnica completa |
| `README.md` | Guia rápido (você está aqui) |
| `COLOR_SYSTEM_AUDIT.md` | Checklist de conformidade |
| `.agent/workflows/aula.md` | Workflow que deve impor isso |

---

## 🚀 Status

| Etapa | Status | Data |
|-------|--------|------|
| Design da paleta | ✅ Concluído | 2026-03-14 |
| Documentação | ✅ Concluído | 2026-03-14 |
| Código (`moduleColors.ts`) | ✅ Concluído | 2026-03-14 |
| Varredura de aulas | ⏳ Próximo | — |
| Correção de aulas | ⏳ Futuro | — |
| Atualização do workflow | ⏳ Futuro | — |

---

## 💡 Dica de Implementação

Para implementar em uma aula nova:

```tsx
import { getModuleVariant, getModuleColor } from "@/lib/moduleColors";

// No componente da aula:
for (let i = 1; i <= 10; i++) {
  const variant = getModuleVariant(i);  // ← Automático!
  const color = getModuleColor(i);      // ← Automático!
  // Usar nos componentes
}
```

---

**Próximo passo:** Executar varredura completa das aulas
**Responsável:** Team Engenharia
**Prazo:** Conforme disponibilidade
