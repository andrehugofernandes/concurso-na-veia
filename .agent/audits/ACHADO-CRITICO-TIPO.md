---
description: Achado crítico - Incompatibilidade de tipos de variant
---

# 🔴 ACHADO CRÍTICO: Incompatibilidade de Tipos de Variant

**Data:** 2026-03-14
**Severidade:** CRÍTICA (bloqueia implementação)
**Status:** Requer correção no componente `ModuleSectionHeader`

---

## O Problema

Ao tentar usar `variant={getModuleVariant(N)}` em `ModuleSectionHeader`, o TypeScript retorna erro:

```typescript
Type '"teal" | "violet" | "orange" | "red" | "pink"' is not assignable to type
'"blue" | "cyan" | "emerald" | "amber" | "indigo" | "rose" | "slate" | undefined'
```

### O que significa?

- **`getModuleVariant()` retorna:** 10 tipos (blue, cyan, emerald, teal, violet, amber, orange, red, pink, indigo)
- **`ModuleSectionHeader` aceita:** apenas 8 tipos (blue, cyan, emerald, amber, indigo, rose, slate)

### Diferenças:

**Faltam em ModuleSectionHeader:**
- ❌ `teal` (módulo 4)
- ❌ `violet` (módulo 5)
- ❌ `orange` (módulo 7)
- ❌ `red` (módulo 8)
- ❌ `pink` (módulo 9)

**Extras em ModuleSectionHeader (não estão em getModuleVariant):**
- ⚠️ `rose` (usado para módulo 9, mas em getModuleVariant é `pink`)
- ⚠️ `slate` (não está em getModuleVariant)

---

## Causa Raiz

O componente `ModuleSectionHeader` foi criado com uma lista **hardcoded** de variants que não corresponde à paleta oficial do `getModuleVariant()`.

---

## Solução Necessária

### Opção 1: Atualizar `ModuleSectionHeader` para aceitar todos os tipos de `getModuleVariant()`

**Arquivo:** `src/components/aulas/shared/ModuleSectionHeader.tsx`

Mudar:
```typescript
variant?: "blue" | "cyan" | "emerald" | "amber" | "indigo" | "rose" | "slate" | undefined;
```

Para:
```typescript
variant?: "blue" | "cyan" | "emerald" | "teal" | "violet" | "amber" | "orange" | "red" | "pink" | "indigo" | undefined;
```

### Opção 2: Atualizar `ModuleVariant` type em `moduleColors.ts` para corresponder a `ModuleSectionHeader`

Remover de getModuleVariant():
- `teal`
- `violet`
- `orange`
- `red`
- `pink`

E adicionar:
- `rose`
- `slate`

**NÃO RECOMENDADO** porque isso reduz a paleta de 10 cores para 8, violando o design original.

---

## Recomendação

**✅ OPÇÃO 1 é a correta:**

Precisamos atualizar `ModuleSectionHeader` para aceitar a paleta completa de 10 cores (blue, cyan, emerald, teal, violet, amber, orange, red, pink, indigo).

---

## Impacto

- 🔴 **Bloqueia** a implementação de conformidade em todas as 13 aulas
- 🔴 **Requer** correção prévia em `ModuleSectionHeader`
- 🟡 **Tempo estimado para correção:** 15-30 min
- 🟢 **Risco:** MUITO BAIXO (mudança apenas de tipos TypeScript)

---

## Próximos Passos

### ANTES de continuar com correções de aulas:

1. [ ] Localizar `src/components/aulas/shared/ModuleSectionHeader.tsx`
2. [ ] Verificar quais cores estão sendo usadas de fato
3. [ ] Atualizar a lista de variants aceitos para: `"blue" | "cyan" | "emerald" | "teal" | "violet" | "amber" | "orange" | "red" | "pink" | "indigo"`
4. [ ] Atualizar a lógica interna de colorização (se houver)
5. [ ] Testar que não quebra nenhuma aula existente
6. [ ] **ENTÃO** voltar a corrigir as 13 aulas

---

## Log de Descoberta

**AulaConjuntos:**
- ✅ Corrigida com sucesso (import + 48 substituições)
- ✅ Validação: 0 occurrências hardcoded
- ✅ Compila sem erros

**AulaPorcentagem:**
- ⚠️ Import adicionado
- ⚠️ Substituições aplicadas (sed)
- ❌ **Erro de tipo detectado** → Reverted
- 🔴 Bloqueada até `ModuleSectionHeader` ser atualizado

---

## Arquivos Afetados

| Arquivo | Status | Ação |
|---------|--------|------|
| `ModuleSectionHeader.tsx` | ⚠️ Requer update | Atualizar tipos |
| `AulaConjuntos.tsx` | ✅ Corrigida | Mantém as mudanças |
| `AulaPorcentagem.tsx` | ⏳ Pendente | Aguarda correção de ModuleSectionHeader |
| `AulaRazaoProporcao.tsx` | ⏳ Pendente | Aguarda correção de ModuleSectionHeader |
| ... (10 aulas restantes) | ⏳ Pendente | Aguarda correção de ModuleSectionHeader |

---

## Conclusão

**O sistema de coloração é válido**, mas o componente `ModuleSectionHeader` precisa ser atualizado para suportar a paleta completa de 10 cores antes que possamos continuar com as correções das aulas.

Isso é uma descoberta BOA porque encontramos o problema raiz antes de corrigir todas as 13 aulas.
