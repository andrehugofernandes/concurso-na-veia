# SPRINT 3 — PLANO EXECUTIVO
## Finalizar AulaAdministracaoGeralSuprimento.tsx para 100% ULTIMATE

---

## STATUS ATUAL

```
Arquivo: AulaAdministracaoGeralSuprimento.tsx
Status: INCOMPLETO (11% ULTIMATE)

MÉTRICA ATUAL
┌──────────────────────────────────────────┐
│ Linhas totais:          270              │
│ Módulos implementados:  5/10 (50%)       │
│ CardCarousel:           0/10 (0%)   ❌  │
│ ContentAccordion:       0/10 (0%)   ❌  │
│ RichIntro (5p):         0/10 (0%)   ❌  │
│ ModuleConsolidation:    5/10 (50%)  ✅  │
│ QuizInterativo:         5/10 (50%)  ✅  │
├──────────────────────────────────────────┤
│ CONFORMIDADE: 11% → ALVO: 100%          │
└──────────────────────────────────────────┘
```

---

## META

Transformar aula INCOMPLETA (270 linhas) em aula ULTIMATE COMPLETA (~4300 linhas)
- **+4030 linhas** (+1491% crescimento)
- **10 módulos** totalmente implementados
- **60 critérios** de conformidade ULTIMATE atingidos
- **10 CardCarousel** com exemplos Petrobras
- **50 parágrafos** editorialistas (5 por módulo)
- **40 slides ContentAccordion** C.E.D.E.

---

## TAREFAS EM ORDEM

### TASK 1: Expandir MODULE_DEFS
- Ação: Adicionar M6-M10 com títulos corretos
- Linhas: +5
- Tempo: 2 minutos

**Novo MODULE_DEFS:**
```
M1: Teorias da Administração
M2: Funções PODC
M3: Estratégia e Planejamento
M4: Estruturas Organizacionais
M5: Comportamento Organizacional
M6: Gestão por Processos
M7: Comunicação e Conflitos
M8: Tomada de Decisão
M9: Administração Petrobras
M10: Simulado Mestre
```

---

### TASK 2: Remover Loop Genérico
- Ação: Deletar renderização via .map() (linhas 207-267)
- Impacto: -59 linhas
- Tempo: 1 minuto
- Nota: Arquivo vai diminuir, será compensado em Task 3

---

### TASK 3: Implementar renderModulo2() até renderModulo10()
- Ação: 9 funções JSX individuais
- Cada: ~320 linhas com estrutura ULTIMATE
- Total: +2880 linhas
- Tempo: 4-5 horas
- Complexidade: ALTA

Estrutura por módulo:
- ModuleBanner (6 linhas)
- ModuleSectionHeader × 2 (8 linhas)
- CardCarousel (25-35 linhas)
- ContentAccordion (80-100 linhas)
- Exemplos Práticos (20-30 linhas)
- ModuleConsolidation (40-50 linhas)
- QuizInterativo (5 linhas)

---

### TASK 4: Adicionar CardCarousel (M1-M10)
- Ação: 1 CardCarousel por módulo (4-6 cards)
- Total: +250 linhas
- Tempo: 1.5 horas
- Complexidade: MÉDIA

---

### TASK 5: Expandir RichIntro (M1-M10)
- Ação: Substituir 1 parágrafo por 5 parágrafos ULTIMATE
- Total: +450 linhas
- Tempo: 2.5 horas
- Complexidade: MÉDIA

Padrão de 5 parágrafos:
1. Conceito científico (definição, contexto)
2. Explicação intuitiva (analogia, exemplo)
3. Regras e variações (aplicações, exceções)
4. Contexto Petrobras (uso real, legislação)
5. Pegadinhas CESGRANRIO (padrões da banca)

+ 1 Caixa ColorGradient com conceito-chave

---

### TASK 6: Implementar ContentAccordion C.E.D.E. (M1-M10)
- Ação: 4 slides obrigatórias por módulo
- Total: +700 linhas
- Tempo: 3-4 horas
- Complexidade: ALTA

4 Slides Obrigatórias:
1. CONCEITUAÇÃO (definição + AlertBox)
2. EXEMPLIFICAÇÃO (exemplos resolvidos + tabelas)
3. DICAS (macetes, estratégias CESGRANRIO)
4. EXCEÇÕES (pegadinhas, casos extremos)

---

### TASK 7: Exemplos Práticos Petrobras (Opcional)
- Ação: 2 cards em grid com aplicações reais
- Total: +250 linhas
- Tempo: 1.5 horas
- Complexidade: MÉDIA

---

## TIMELINE

| Task | Linhas | Tempo | Ordem |
|------|--------|-------|-------|
| 1. MODULE_DEFS | +5 | 2 min | 1 |
| 2. Remover loop | -59 | 1 min | 2 |
| 3. M2-M10 base | +2880 | 4-5h | 3 |
| 4. CardCarousel | +250 | 1.5h | 4 |
| 5. RichIntro | +450 | 2.5h | 5 |
| 6. ContentAccordion | +700 | 3-4h | 6 |
| 7. Exemplos Petrobras | +250 | 1.5h | 7 |
| 8. Validação | — | 30 min | 8 |
| **TOTAL** | **+4476** | **~13-15h** | — |

**Novo tamanho esperado:** 3950-4300 linhas

---

## VALIDAÇÃO FINAL

```
Checklist pré-commit:
✓ wc -l = ~4000-4300 linhas
✓ MODULE_DEFS.length = 10 módulos
✓ grep "CardCarousel" | wc -l = 10
✓ grep "ContentAccordion" | wc -l = 10
✓ grep "ModuleConsolidation" | wc -l = 10
✓ node scripts/lib/safety.js = PASS
✓ npm run build = SUCCESS
```

---

## COMMITS PROPOSTOS

1. `feat: expand MODULE_DEFS to 10 modules in AulaAdministracaoGeralSuprimento`
2. `feat: implement renderModulo2 through renderModulo10 base structure`
3. `feat: add CardCarousel to all modules (+250 linhas)`
4. `feat: expand RichIntro to ULTIMATE standard (+450 linhas)`
5. `feat: implement C.E.D.E. ContentAccordion in all modules (+700 linhas)`
6. `chore: validate ULTIMATE conformance - 100% complete`

---

## REFERÊNCIAS

- Arquivo Atual: `src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx`
- Quizzes: `src/data/quizzes/administracao-geral-quizzes.ts` (10 módulos ✅)
- Modelo: `src/components/aulas/administracao/AulaGestãoDePessoas.tsx` (138KB, ULTIMATE ✅)
- Padrão: `.agent/workflows/aula-ultimate.md`
- Safety: `scripts/lib/safety.js`

---

## NOTAS IMPORTANTES

1. **Preservação Absoluta:** Nunca deletar, apenas adicionar
2. **Safety Check:** Script bloqueia redução > 2%
3. **Variantes de Cor:** Usar getModuleVariant(N) ou mv[N]
4. **Quizzes Prontos:** 10 módulos × 6 questões já existem
5. **Contexto Petrobras:** Todos os exemplos relevantes para Suprimento

---

## RESULTADO ESPERADO

Após SPRINT 3:
- ✅ 10 módulos completos
- ✅ 10 CardCarousel com exemplos Petrobras
- ✅ 50 parágrafos editorialistas
- ✅ 40 slides ContentAccordion C.E.D.E.
- ✅ 10 ModuleConsolidation
- ✅ 10 QuizInterativo
- ✅ ~4300 linhas
- ✅ 100% ULTIMATE
- ✅ Pronto para produção
