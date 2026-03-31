# AUDIT: AulaAdministracaoGeralSuprimento.tsx - SPRINT 3 FASE 1

## SNAPSHOT ATUAL

**Arquivo:** `src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx`
**Tamanho:** 270 linhas (9.1 KB)
**Status:** INCOMPLETO - apenas M1 e M2 (parcial) implementados

---

## ESTRUTURA ATUAL DETALHADA

### BLOCO 1: Imports (linhas 1-29)
✅ Correto — todos os componentes necessários importados

### BLOCO 2: MODULE_DEFS (linhas 54-61)
```javascript
const MODULE_DEFS = [
  { id: "modulo-1", label: "M1", title: "Teorias Adm" },
  { id: "modulo-2", label: "M2", title: "Funções PODC" },
  { id: "modulo-3", label: "M3", title: "Estratégia" },
  { id: "modulo-4", label: "M4", title: "Estruturas" },
  { id: "modulo-5", label: "M5", title: "Simulado" },
]
```
**PROBLEMA:** Apenas 5 módulos, mas quizzes têm 10 completos
**IMPACTO:** Faltam M6-M10 totalmente

### BLOCO 3: Modulo 1 (linhas 104-205) = 102 linhas
✅ Estrutura correta com ModuleBanner, RichIntro (2 parágrafos), ContentAccordion, ModuleConsolidation, QuizInterativo
❌ Incompleto: RichIntro tem apenas 2 parágrafos (faltam 3), sem CardCarousel

### BLOCO 4: Módulos 2-5 (linhas 207-267) = LOOP GENÉRICO
```tsx
{[
  { id: "modulo-2", num: 2, t: "Funções PODC", v: "emerald" as const },
  { id: "modulo-3", num: 3, t: "Gestão Estratégica", v: "amber" as const },
  { id: "modulo-4", num: 4, t: "Estruturas Org", v: "rose" as const },
  { id: "modulo-5", num: 5, t: "Simulado Geral", v: "violet" as const },
].map(({ id, num, t, v }) => (
  <TabsContent key={id} value={id}>
    <ModuleBanner ... /> /* gradiente genérico, não usa variante */
    <section>
      <RichIntro>
        <p>Conteúdo em consolidação para {t}.</p> /* PLACEHOLDER */
      </RichIntro>
    </section>
    <ModuleConsolidation ... /> /* genérica */
    <QuizInterativo ... />
  </TabsContent>
))}
```

**PROBLEMAS EXATOS:**
- Linha 230: RichIntro com 1 parágrafo placeholder genérico
- Linha 224: gradiente hardcodado em slate (não usa variante)
- **FALTAM:** CardCarousel (0 de 10), ContentAccordion C.E.D.E. (0 de 10), RichIntro elaborada
- **FALTAM COMPLETAMENTE:** M6-M10 (não existem no MODULE_DEFS)

---

## QUANTIFICAÇÃO DO PROBLEMA

| Aspecto | Atual | Esperado | Falta |
|---------|-------|----------|-------|
| Módulos definidos | 5 | 10 | 5 |
| CardCarousel | 0 | 10 | 10 |
| ContentAccordion C.E.D.E. | 0 | 10 | 10 |
| RichIntro (5 parágrafos) | 0 | 10 | 10 |
| Linhas totais | 270 | ~4000-4300 | +3730-4030 |
| Conformidade ULTIMATE | ~11% | 100% | 89% |

---

## ARQUIVO DE QUIZZES - VALIDAÇÃO ✅

Confirmado: `administracao-geral-quizzes.ts` possui 10 módulos completos:
- modulo-1 até modulo-10: 6 questões cada = 60 questões totais ✅
- Todos com id, question, options[], correct, explanation ✅

---

## CHECKLIST DE CONFORMIDADE ULTIMATE (Estado Atual)

| Critério | M1 | M2 | M3 | M4 | M5 | M6-M10 | Média |
|----------|----|----|----|----|----|----|-------|
| ModuleBanner (N, título, variante) | ✅ | ❌ | ❌ | ❌ | ❌ | ✗ | 10% |
| RichIntro (5 parágrafos) | ❌ | ❌ | ❌ | ❌ | ❌ | ✗ | 0% |
| CardCarousel (4+ cards) | ❌ | ❌ | ❌ | ❌ | ❌ | ✗ | 0% |
| ContentAccordion C.E.D.E. (4 slides) | ❌ | ❌ | ❌ | ❌ | ❌ | ✗ | 0% |
| ModuleConsolidation (4-tab) | ✅ | ✅ | ✅ | ✅ | ✅ | ✗ | 50% |
| QuizInterativo | ✅ | ✅ | ✅ | ✅ | ✅ | ✗ | 50% |

**Conformidade Geral:** 11% (11 de 60 critérios possíveis)

---

## MÓDULO ULTIMATE ESPERADO - ESTRUTURA EXATA

Baseado em AulaGestãoDePessoas (referência completa: 138KB, 10 módulos ULTIMATE):

```
┌─ ModuleBanner (6 linhas)
│  numero={N}, titulo="...", variant={mv[N]}
├─ ModuleSectionHeader - "Dossiê de [Tema]" (4 linhas)
├─ CardCarousel (20-30 linhas, 4+ cards específicos)
├─ ModuleSectionHeader - "Análise Técnica C.E.D.E." (4 linhas)
├─ ContentAccordion C.E.D.E. (80-120 linhas)
│  ├─ Conceituação (definição formal + AlertBox)
│  ├─ Exemplificação (exemplos resolvidos, tabelas)
│  ├─ Dicas (macetes, estratégias CESGRANRIO)
│  └─ Exceções (pegadinhas, casos extremos)
├─ Exemplos Práticos Petrobras (20-40 linhas, 2+ cards)
├─ ModuleConsolidation (40-60 linhas) ✅
└─ QuizInterativo (5-10 linhas) ✅

TOTAL POR MÓDULO: ~280-380 linhas
```

---

## MÓDULOS E TEMAS (M1-M10)

1. **M1:** Teorias da Administração ✅ (parcialmente implementado)
2. **M2:** Funções Administrativas (PODC)
3. **M3:** Estratégia e Planejamento
4. **M4:** Estruturas Organizacionais
5. **M5:** Comportamento Organizacional
6. **M6:** Gestão por Processos
7. **M7:** Comunicação e Conflitos Organizacionais
8. **M8:** Tomada de Decisão e Inovação
9. **M9:** Administração na Petrobras
10. **M10:** Simulado Mestre

---

## TAREFAS PARA FASE 2 (Implementação)

### Task 1: Expandir MODULE_DEFS de 5 para 10 módulos
- **Ação:** Adicionar M6-M10 com títulos corretos
- **Linhas afetadas:** +5
- **Complexidade:** Trivial

### Task 2: Remover loop genérico (linhas 207-267)
- **Ação:** Deletar renderização via map() de M2-M5
- **Linhas removidas:** -59
- **Risco:** Verificar safety.js (arquivo vai diminuir antes de crescer)

### Task 3: Implementar renderModulo2() até renderModulo10() individualmente
- **Ação:** 9 funções JSX/TSX, cada uma com 320-360 linhas
- **Conteúdo:** ModuleBanner + ModuleSectionHeader + CardCarousel + ContentAccordion C.E.D.E. + ModuleConsolidation + QuizInterativo
- **Linhas adicionadas:** +2880-3240

### Task 4: Adicionar CardCarousel em M1-M10
- **Ação:** 1 CardCarousel por módulo com 4-6 cards específicos do tema
- **Exemplo M1:** Capital Humano, Parceria Estratégica, Cultura, Competitividade
- **Linhas por módulo:** +25-35
- **Total:** +250-350 linhas

### Task 5: Expandir RichIntro em M1-M10 para 5 parágrafos editorialistas
- **Ação:** Substituir placeholder por conteúdo ULTIMATE
- **Estrutura padrão:**
  1. Conceito científico/formal
  2. Explicação intuitiva/analogia
  3. Regras, flexões e variações
  4. Contexto Petrobras (aplicação real)
  5. Pegadinhas CESGRANRIO (padrões de cobrança da banca)
- **Total:** +40-60 linhas × 10 = +400-600 linhas

### Task 6: Implementar ContentAccordion C.E.D.E. em M1-M10
- **Ação:** 4 slides obrigatórios:
  1. **Conceituação:** Definição formal + AlertBox com conceito-chave
  2. **Exemplificação:** 2-3 exemplos resolvidos com tabelas comparativas
  3. **Dicas:** Macetes, estratégias para prova, padrões CESGRANRIO
  4. **Exceções:** Pegadinhas comuns, casos extremos
- **Linhas por módulo:** +70-100
- **Total:** +700-1000 linhas

### Task 7: Adicionar Exemplos Práticos Petrobras (M1-M10)
- **Ação:** ModuleSectionHeader + grid de 2 cards com contexto real
- **Linhas por módulo:** +20-30
- **Total:** +200-300 linhas (opcional se espaço)

---

## ESTIMATIVA DE IMPLEMENTAÇÃO

| Task | Linhas | Tempo Est. | Complexidade | Deps |
|------|--------|-----------|---|---|
| 1. MODULE_DEFS +5 | +5 | 2 min | ▓▓▓ Trivial | Nenhuma |
| 2. Remover loop | -59 | 1 min | ▓▓▓ Trivial | 1 |
| 3. M2-M10 (base) | +2880 | 4-5h | ▓▓▓▓▓ Alta | 2 |
| 4. CardCarousel ×10 | +250 | 1.5h | ▓▓▓▓ Média | 3 |
| 5. RichIntro ×10 | +450 | 2.5h | ▓▓▓▓ Média | 3 |
| 6. ContentAccordion ×10 | +700 | 3-4h | ▓▓▓▓▓ Alta | 3 |
| 7. Exemplos Petrobras ×10 | +250 | 1.5h | ▓▓▓▓ Média | 3 |
| **TOTAL** | **~4476** | **~13-15h** | **▓▓▓▓▓ Alta** | Sequencial |

**Tamanho esperado final:** 3950-4300 linhas (vs 138KB = ~3500 linhas para GP)

---

## VALIDAÇÃO FINAL (Checklist)

```bash
# Após implementação, executar:

wc -l src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx
# esperado: ~4000-4300 linhas

grep "modulo-" MODULE_DEFS | wc -l
# esperado: 10 módulos

grep -c "CardCarousel" src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx
# esperado: 10 ocorrências

grep -c "ContentAccordion" src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx
# esperado: 10 ocorrências

grep -c "ModuleConsolidation" src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx
# esperado: 10 ocorrências

# Rodar safety script
node scripts/lib/safety.js src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx
# esperado: PASS (crescimento +3730 linhas = +1381%)
```

---

## COMMITS PROPOSTOS

1. **Commit 1:** `feat: expand MODULE_DEFS to 10 modules in AulaAdministracaoGeralSuprimento`
   - Adiciona M6-M10, remove loop genérico, prepara renderModulo*

2. **Commit 2:** `feat: implement renderModulo2 through renderModulo10 base structure`
   - +2880 linhas, todos os módulos com estrutura ULTIMATE base

3. **Commit 3:** `feat: add CardCarousel to all modules (+250 linhas)`
   - Exemplos práticos específicos por módulo

4. **Commit 4:** `feat: expand RichIntro to ULTIMATE standard (+450 linhas)`
   - 5 parágrafos editorialistas por módulo

5. **Commit 5:** `feat: implement C.E.D.E. ContentAccordion in all modules (+700 linhas)`
   - 4 slides obrigatórios (Conceito, Exemplo, Dicas, Exceções)

6. **Commit 6:** `chore: validate ULTIMATE conformance - 100% complete`
   - Relatório de validação, benchmarking

---

## REFERÊNCIAS

- **Quizzes:** `src/data/quizzes/administracao-geral-quizzes.ts` (10 módulos ✅)
- **Aula Modelo:** `src/components/aulas/administracao/AulaGestãoDePessoas.tsx` (138KB, ULTIMATE ✅)
- **Padrão ULTIMATE:** `.agent/workflows/aula-ultimate.md`
- **Safety Script:** `scripts/lib/safety.js` (previne perda de código)

---

## CONCLUSÕES

✅ **Positivos:**
- Quizzes completos e validados (10 módulos × 6 questões)
- Estrutura ModuleConsolidation e QuizInterativo funcionando
- Módulo 1 tem boa base (porém incompleto)

❌ **Negativos:**
- Apenas 5 módulos definidos (faltam M6-M10)
- Loop genérico em M2-M5 (conteúdo placeholder)
- ZERO CardCarousel (esperado: 10)
- ZERO ContentAccordion C.E.D.E. completo (esperado: 10)
- RichIntro com apenas 2 parágrafos vs 5 esperados

**Conformidade ULTIMATE:** 11% → alvo: 100%
**Tempo estimado para 100%:** 13-15 horas
**Complexidade:** ALTA (11 componentes × 10 módulos = 110 escritas)

