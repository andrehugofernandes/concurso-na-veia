---
description: Plano de correção de conformidade com Sistema de Coloração (1-10)
---

# 🔧 Plano de Correção de Conformidade - Sistema de Coloração

**Data:** 2026-03-14
**Varredura:** COMPLETA ✅
**Resultado:** 13/13 aulas NÃO-CONFORMES (100%)

---

## 📊 Resumo Executivo

### Problema Identificado
Todas as 13 aulas usam **cores hardcoded** em `ModuleSectionHeader` em vez de usar a função dinâmica `getModuleVariant(index)`.

### Impacto
- ✗ Cores não refletem o sistema de coloração harmônico
- ✗ Aulas não estão "plugadas" no sistema novo
- ✗ Fácil criar inconsistências futuras

### Solução
Substituir **todas** as ocorrências de `variant="blue"`, `variant="cyan"`, etc por `variant={getModuleVariant(index)}` após importar a função.

### Tempo Estimado
- **Correção por aula:** 5-15 min (depende da quantidade de ModuleSectionHeader)
- **Total (13 aulas):** 2-3h
- **Teste visual:** 1h
- **Total:** 3-4h

---

## 🎯 Prioridade por Aula

### ALTA PRIORIDADE (Mais occorrências de hardcoding)

#### 1. **AulaConjuntos.tsx** - 30 occorrências
- **Problema:** 30 linhas com `variant` hardcoded
- **Linhas:** 694, 766, 848, 892, 932, 953, 1047, 1137, 1183, 1223, 1243, 1293, 1372, 1410, 1450, 1470, 1496, 1540, 1580, 1710, 1859, 1980, 2245, 2398, 2468, 2611, 2767, 2942, 3171, 3211
- **Estimado:** 15-20 min
- **Status:** ⏳ Pendente

#### 2. **AulaPorcentagem.tsx** - 28 occorrências
- **Problema:** 28 linhas com `variant` hardcoded
- **Estimado:** 15-18 min
- **Status:** ⏳ Pendente

#### 3. **AulaRazaoProporcao.tsx** - 26 occorrências
- **Problema:** 26 linhas com `variant` hardcoded
- **Estimado:** 12-15 min
- **Status:** ⏳ Pendente

#### 4. **AulaEquacoes2Grau.tsx** - 24 occorrências
- **Problema:** 24 linhas com `variant` hardcoded + inline colors
- **Estimado:** 12-15 min
- **Status:** ⏳ Pendente

#### 5. **AulaFuncoesLogaritmicas.tsx** - 24 occorrências
- **Problema:** 24 linhas com `variant` hardcoded
- **Estimado:** 12-15 min
- **Status:** ⏳ Pendente

### MÉDIA PRIORIDADE (Menos occorrências)

#### 6. **AulaFuncoesAfimQuadratica.tsx** - 24+ occorrências
- **Problema:** 24+ linhas com `variant` hardcoded + inline colors (`bg-blue-500/10`, etc)
- **Nota:** Também tem cores inline que devem ser dinâmicas
- **Estimado:** 15-18 min
- **Status:** ⏳ Pendente

#### 7. **AulaEquacoes1Grau.tsx** - 22 occorrências
- **Problema:** 22 linhas com `variant` hardcoded
- **Estimado:** 10-12 min
- **Status:** ⏳ Pendente

#### 8. **AulaFuncoesExponenciais.tsx** - 22 occorrências
- **Problema:** 22 linhas com `variant` hardcoded
- **Estimado:** 10-12 min
- **Status:** ⏳ Pendente

#### 9. **AulaConcordancia.tsx** - 12+ occorrências
- **Problema:** 12+ linhas com `variant` hardcoded + `index="📚"` (emoji em vez de número)
- **Nota:** StickyModuleNav importado mas NÃO renderizado
- **Estimado:** 8-10 min
- **Status:** ⏳ Pendente

#### 10. **AulaOrtografia.tsx** - 12+ occurrências
- **Problema:** 12+ linhas com `variant` hardcoded
- **Nota:** StickyModuleNav importado mas NÃO renderizado
- **Estimado:** 8-10 min
- **Status:** ⏳ Pendente

### BAIXA PRIORIDADE (Menos occorrências)

#### 11. **AulaProgressoesPa.tsx** - 15 occurrências
- **Problema:** 15 linhas com `variant` hardcoded
- **Estimado:** 8-10 min
- **Status:** ⏳ Pendente

#### 12. **AulaProgressoesPg.tsx** - 15 occurrências
- **Problema:** 15 linhas com `variant` hardcoded
- **Estimado:** 8-10 min
- **Status:** ⏳ Pendente

#### 13. **AulaProbabilidade.tsx** - 15 occurrências
- **Problema:** 15 linhas com `variant` hardcoded
- **Estimado:** 8-10 min
- **Status:** ⏳ Pendente

---

## 📋 Checklist de Correção

### Passos para Cada Aula

1. **Adicionar import (no topo do arquivo)**
   ```tsx
   import { getModuleVariant } from "@/lib/moduleColors";
   ```

2. **Substituir TODAS as ocorrências de `variant="..."`**

   De:
   ```tsx
   <ModuleSectionHeader index={1} title="..." variant="blue" />
   <ModuleSectionHeader index={2} title="..." variant="cyan" />
   ```

   Para:
   ```tsx
   <ModuleSectionHeader index={1} title="..." variant={getModuleVariant(1)} />
   <ModuleSectionHeader index={2} title="..." variant={getModuleVariant(2)} />
   ```

3. **Verificar ModuleBanner**
   - Deve ter `index={1-10}` (não `numero=`, não `title=`)
   - Em AulaConcordancia: Trocar `index="📚"` por `index={1}` (número, não emoji)

4. **Verificar StickyModuleNav** (se importado)
   - Se está sendo renderizado
   - Se não, remover import desnecessário

5. **Executar grep para validar**
   ```bash
   grep -n "variant=\"" src/components/aulas/[materia]/[AulaName].tsx
   # Não deve retornar NADA
   ```

6. **Teste visual**
   - Abrir aula no browser
   - Verificar se todas as 10 cores estão diferentes
   - Verificar se ModuleBanner e ModuleSectionHeader usam a mesma cor

7. **Commit**
   ```bash
   git add src/components/aulas/[materia]/[AulaName].tsx
   git commit -m "fix([materia]): conformidade com sistema de coloração de módulos"
   ```

---

## 🔄 Ordem de Execução Recomendada

### Sprint 1: Alta Prioridade (Hoje - 2-3h)
- [ ] 1. AulaConjuntos (30 occurrências, mais visível)
- [ ] 2. AulaPorcentagem (28 occurrências)
- [ ] 3. AulaRazaoProporcao (26 occurrências)

### Sprint 2: Média Prioridade (Amanhã - 2-3h)
- [ ] 4. AulaEquacoes2Grau (24 occurrências)
- [ ] 5. AulaFuncoesLogaritmicas (24 occurrências)
- [ ] 6. AulaFuncoesAfimQuadratica (24+ occurrências, mais complexa por inline colors)

### Sprint 3: Média-Baixa (Próximo dia - 1-2h)
- [ ] 7. AulaEquacoes1Grau (22 occurrências)
- [ ] 8. AulaFuncoesExponenciais (22 occurrências)
- [ ] 9. AulaConcordancia (12+ occurrências, cuidado com index="📚")
- [ ] 10. AulaOrtografia (12+ occurrências)

### Sprint 4: Baixa Prioridade (Próximo dia - 1-2h)
- [ ] 11. AulaProgressoesPa (15 occurrências)
- [ ] 12. AulaProgressoesPg (15 occorrências)
- [ ] 13. AulaProbabilidade (15 occurrências)

---

## 🚀 Automação Possível

### Grep + Replace (Bulk Fix)

```bash
# Para cada aula, executar:

# Substituir variant="blue" por variant={getModuleVariant(N)}
sed -i 's/variant="blue"/variant={getModuleVariant(1)}/g' AulaConjuntos.tsx
sed -i 's/variant="cyan"/variant={getModuleVariant(2)}/g' AulaConjuntos.tsx
# ... etc para todas as cores
```

**Mas ATENÇÃO:** Esta abordagem automática pode errar se:
- A cor não corresponder ao módulo correto
- Houver casos especiais

**Recomendação:** Fazer manualmente com verificação visual para cada uma.

---

## 📈 Métricas Pós-Correção

Após todas as correções:

| Métrica | Antes | Depois |
|---------|-------|--------|
| Aulas conformes | 0/13 (0%) | 13/13 (100%) |
| Cores hardcoded | 230+ | 0 |
| Funções dinâmicas usadas | 0 | 230+ |
| ModuleSectionHeader dinâmico | 0 | 100% |

---

## ✅ Validação Final

Após corrigir todas as 13 aulas:

### 1. Teste de Código
```bash
# Nenhuma dessas linhas deve retornar resultados:
grep -r "variant=\"blue\"" src/components/aulas/
grep -r "variant=\"cyan\"" src/components/aulas/
grep -r "variant=\"emerald\"" src/components/aulas/
# ... etc
```

### 2. Teste Visual
- [ ] Abrir cada aula no browser (13 aulas)
- [ ] Verificar se todas as 10 cores estão presentes
- [ ] Verificar se banner + header têm a mesma cor
- [ ] Verificar se progressão é: Azul → Ciano → Verde → ... → Índigo

### 3. Teste de Build
```bash
npm run build
# Não deve ter erros
```

### 4. Teste de Lint
```bash
npm run lint
# Não deve ter erros relacionados a cores
```

---

## 📝 Log de Correções

### Aula: [Nome]
**Data:** YYYY-MM-DD | **Responsável:** [Seu Nome]

**Status Before:**
- [ ] ❌ 30 occurrências de `variant` hardcoded
- [ ] ❌ ModuleBanner com `index` correto
- [ ] ❌ StickyModuleNav não renderizado

**Correções Aplicadas:**
- ✅ Adicionado import `getModuleVariant`
- ✅ Substituídas 30 ocorrências de `variant="..."` por `variant={getModuleVariant(N)}`
- ✅ Validado com grep (0 ocorrências restantes)
- ✅ Teste visual OK (10 cores diferentes)

**Status After:**
- ✅ 100% conforme com sistema de coloração

---

## 🎯 Conclusão

A **varredura identificou conformidade ZERO** em todas as 13 aulas, todas usando cores hardcoded. O plano de correção é simples:

1. Importar `getModuleVariant`
2. Substituir `variant="cor"` por `variant={getModuleVariant(index)}`
3. Validar com grep e visualmente
4. Commit

**Tempo total esperado:** 3-4 horas
**Complexidade:** BAIXA (operação mecânica, sem lógica complexa)
**Risco:** MUITO BAIXO (mudança cosmética, sem alterar comportamento)

Vamos começar!
