# PLANO DE AÇÃO - AUDIT BLOCO III
**Estratégia:** Bottom-up (Aula 1 → Aula 4)
**Timeline:** 6.5-9.5 horas (2 sprints)

---

## FASE 1: ANÁLISE (✅ COMPLETA)
Ver `AUDIT_BLOCO_III_RELATORIO.md`

---

## FASE 2: IMPLEMENTAÇÃO (👇 PRÓXIMO)

### SPRINT 1: Aula 1 - AdministracaoGeralSuprimento (4-6h)

#### 2.1.1 Reestruturar M2-M9 (de loop para funções)
**Arquivo:** `src/components/aulas/administracao/AulaAdministracaoGeralSuprimento.tsx`

Mudança estrutural:
```tsx
// ANTES (Loop genérico, linhas ~397-629):
{[
  { mod: "modulo-2", num: 2, titulo: "...", ... },
  { mod: "modulo-3", num: 3, titulo: "...", ... },
  // ...
].map(({ mod, num, titulo, ... }) => (
  <TabsContent key={mod} value={mod}>
    // Conteúdo genérico para todos
  </TabsContent>
))}

// DEPOIS (Funções individuais):
<TabsContent value="modulo-2" ...>
  <Modulo2Content /> {/* renderModulo2() */}
</TabsContent>
<TabsContent value="modulo-3" ...>
  <Modulo3Content /> {/* renderModulo3() */}
</TabsContent>
// ... etc M4-M9
```

**Tarefas:**
- [ ] Criar 8 funções: `renderModulo2()` até `renderModulo9()`
- [ ] Cada função deve conter:
  - [ ] `ModuleBanner` com `numero={N}` e `titulo` específico
  - [ ] RichIntro com 5 parágrafos personalizados (não genérico)
  - [ ] `ModuleSectionHeader` com contexto específico
  - [ ] `ContentAccordion` com 4 abas temáticas
  - [ ] `CardCarousel` com 3+ exemplos Petrobras
  - [ ] `ModuleConsolidation` com video/resumo/macete/música
  - [ ] `QuizInterativo` com questões do módulo

**Estimativa:** 2-3 horas

---

#### 2.1.2 Adicionar CardCarousel em todos os módulos
**Arquivo:** mesmo arquivo

**Tarefas:**
- [ ] M1: Adicionar após ContentAccordion (se não tiver)
- [ ] M2-M9: Já terão no passo 2.1.1
- [ ] M10: Adicionar (simulado pode ter exemplos resumidos)

**Exemplo para cada módulo:**
```tsx
<CardCarousel
  cards={[
    { title: "Exemplo 1: PODC em Suprimento", descricao: "..." },
    { title: "Exemplo 2: Estrutura Organizacional na Petrobras", descricao: "..." },
    { title: "Exemplo 3: Comunicação entre departamentos", descricao: "..." },
  ]}
/>
```

**Estimativa:** 1-2 horas

---

#### 2.1.3 Adicionar FlipCard para prática
**Arquivo:** mesmo arquivo

**Tarefas:**
- [ ] Verificar se `FlipCard` component existe em `/src/components/aulas/shared/`
- [ ] Se não existir, criar ou usar alternativa (CardCarousel invertido?)
- [ ] Adicionar 4-6 FlipCards por módulo (antes do Quiz)

**Padrão esperado:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  <FlipCard front="Termo" back="Definição" />
  <FlipCard front="Abreviação" back="Significado" />
  {/* ... mais 4-6 cards */}
</div>
```

**Estimativa:** 1-2 horas

---

#### 2.1.4 Validação e testes
**Tarefas:**
- [ ] Abrir em navegador
- [ ] Clicar em cada módulo (M1-M10)
- [ ] Verificar cores (cada módulo tem cor diferente)
- [ ] Verificar RichIntro (5 parágrafos)
- [ ] Verificar ContentAccordion (4 abas)
- [ ] Verificar CardCarousel (3+ cards)
- [ ] Verificar Quiz (funciona e completa módulo)
- [ ] Verificar progresso entre módulos (unlock)

**Estimativa:** 0.5 hora

---

### SPRINT 2: Aula 4 - AdministracaoTributaria (2-3h)

#### 2.2.1 Adicionar `variant` em ModuleBanner
**Arquivo:** `src/components/aulas/administracao/AulaAdministracaoTributaria.tsx`

**Buscar e Corrigir:**
```tsx
// ❌ ANTES (todas as ocorrências):
<ModuleBanner numero={N} titulo="..." descricao="..." />

// ✅ DEPOIS:
<ModuleBanner
  numero={N}
  titulo="..."
  descricao="..."
  variant={getModuleVariant(N)}
/>
```

**Tarefas:**
- [ ] Usar search para encontrar todas as linhas com `ModuleBanner` (deve ter ~11)
- [ ] Adicionar `variant={getModuleVariant(N)}` em cada uma
- [ ] Ou alternativamente, usar `variant="indigo"` se tema é único

**Estimativa:** 0.5 hora

---

#### 2.2.2 Completar RichIntro em M1
**Arquivo:** mesmo arquivo, função `renderModulo1()`

**Tarefas:**
- [ ] Adicionar seção com 5 parágrafos estruturados
- [ ] Incluir contexto Petrobras
- [ ] Adicionar AlertBox ou caixa colorida com destaque

**Modelo (copiar de Aula 2):**
```tsx
<div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
  <p>Parágrafo 1 - Definição formal...</p>
  <p>Parágrafo 2 - Analogia/Comparação...</p>
  <p>Parágrafo 3 - Contexto Petrobras...</p>
  <p>Parágrafo 4 - Aplicação prática...</p>
  <p>Parágrafo 5 - Dica CESGRANRIO...</p>

  <AlertBox variant={getModuleVariant(1)}>
    <strong>📌 Destaque Importante:</strong> ...
  </AlertBox>
</div>
```

**Estimativa:** 0.5 hora

---

#### 2.2.3 Validar/Completar ContentAccordion em M1
**Arquivo:** mesmo arquivo

**Tarefas:**
- [ ] Confirmar se ContentAccordion existe em `renderModulo1()`
- [ ] Se não existir, adicionar com 4 abas:
  - Abas: "Conceito Fundamental", "Órgãos e Estrutura", "Estratégias de Estudo", "Aplicação Petrobras"
- [ ] Se existir, verificar se tem 4 abas (não menos)

**Estimativa:** 0.3 hora

---

#### 2.2.4 Validar maceteVisual em ModuleConsolidation
**Arquivo:** mesmo arquivo

**Tarefas:**
- [ ] Verificar que CADA módulo tem `maceteVisual` com `title` e `content`
- [ ] Se algum módulo está faltando, adicionar

**Padrão:**
```tsx
maceteVisual={{
  title: `O Pulo do Gato - Módulo ${N}`,
  content: <p className="text-lg italic">{"Sua dica mnemônica aqui..."}</p>
}}
```

**Estimativa:** 0.2 hora

---

#### 2.2.5 Validação e testes
**Tarefas:**
- [ ] Abrir em navegador
- [ ] Clicar em cada módulo (M1-M10)
- [ ] Verificar cores em ModuleBanner (cada módulo diferente)
- [ ] Verificar que M1 agora tem RichIntro completa
- [ ] Verificar que M1 tem ContentAccordion
- [ ] Verificar que todos os módulos têm maceteVisual

**Estimativa:** 0.3 hora

---

### (OPCIONAL) SPRINT 3: Aulas 2-3 - Validação e QA (0.5h)

#### 2.3.1 Validação Aula 2 - ContabilidadeBasica
**Arquivo:** `src/components/aulas/administracao/AulaContabilidadeBasica.tsx`

**Checklist:**
- [ ] 10 módulos renderizam corretamente
- [ ] Cada módulo tem cor diferente (getModuleVariant)
- [ ] RichIntro com 5+ parágrafos
- [ ] ContentAccordion com 4 abas
- [ ] CardCarousel com 3+ cards
- [ ] ModuleConsolidation completo
- [ ] Quiz funcional
- [ ] Progressão de deslock funciona
- [ ] Completion banner aparece em M10

**Estimativa:** 0.3 horas

---

#### 2.3.2 Validação Aula 3 - DireitoTributario
**Arquivo:** `src/components/aulas/administracao/AulaDireitoTributario.tsx`

**Checklist:**
- [ ] Mesmo que Aula 2 acima

**Estimativa:** 0.2 horas

---

## FASE 3: TESTES E VALIDAÇÃO (0.5h)

### 3.1 Testes de Renderização
- [ ] Abrir `http://localhost:3000/aulas/especifica-administracao-geral-suprimento`
- [ ] Abrir `http://localhost:3000/aulas/especifica-contabilidade-basica`
- [ ] Abrir `http://localhost:3000/aulas/especifica-direito-tributario`
- [ ] Abrir `http://localhost:3000/aulas/especifica-administracao-tributaria`
- [ ] Verificar que todas renderizam sem erros

### 3.2 Testes de Funcionalidade
Para cada aula:
- [ ] Clicar em cada módulo sequencialmente
- [ ] Verificar que elementos aparecem (ModuleBanner, RichIntro, etc)
- [ ] Completar quiz e verificar progresso
- [ ] Verificar que próximo módulo desbloqueia
- [ ] Completar módulo 10 e verificar completion badge

### 3.3 Testes de Estilos
- [ ] Verificar que cores são diferentes (M1 ≠ M2 ≠ ... ≠ M10)
- [ ] Verificar que fontes estão legíveis
- [ ] Verificar responsividade em mobile
- [ ] Verificar dark mode (se aplicável)

### 3.4 Testes de Acessibilidade
- [ ] Verificar que não há console errors
- [ ] Verificar que keyboard navigation funciona
- [ ] Verificar que screen reader pode ler conteúdo

---

## TIMELINE ESTIMADA

```
Dia 1 (4-6h):
├─ Sprint 1: Aula 1 reestruturação (2.1.1) → 2-3h
├─ Sprint 1: CardCarousel (2.1.2) → 1-2h
├─ Sprint 1: FlipCard (2.1.3) → 1-2h
└─ Sprint 1: Testes (2.1.4) → 0.5h

Dia 2 (2-3h):
├─ Sprint 2: ModuleBanner variant (2.2.1) → 0.5h
├─ Sprint 2: RichIntro M1 (2.2.2) → 0.5h
├─ Sprint 2: ContentAccordion M1 (2.2.3) → 0.3h
├─ Sprint 2: maceteVisual (2.2.4) → 0.2h
├─ Sprint 2: Testes (2.2.5) → 0.3h
├─ Sprint 3: Validação Aula 2-3 (2.3) → 0.5h
└─ Fase 3: Testes Finais (3) → 0.5h

TOTAL: 6.5-9.5 horas (2 dias de trabalho)
```

---

## CRITÉRIOS DE ACEITAÇÃO

✅ Aula 1:
- [ ] 10 módulos renderizam com conteúdo personalizado
- [ ] 0 linhas de código genérico em M2-M10
- [ ] CardCarousel presente em todos 10 módulos
- [ ] FlipCard ou similar presente em todos 10 módulos
- [ ] Todas 10 cores diferentes via getModuleVariant()

✅ Aula 4:
- [ ] Todos ModuleBanner têm `variant` prop
- [ ] M1 RichIntro completa (5 parágrafos)
- [ ] M1 ContentAccordion presente (4 abas)
- [ ] Todos módulos têm maceteVisual

✅ Aulas 2-3:
- [ ] Nenhuma mudança necessária (validação passa)

✅ Geral:
- [ ] Sem console errors
- [ ] Quiz funciona em todos módulos
- [ ] Progresso de deslock funciona
- [ ] Completion badge aparece

---

## NOTAS IMPORTANTES

1. **Backup:** Fazer backup dos arquivos antes de modificar
2. **Git:** Fazer commit após cada Sprint
3. **Testes:** Testar em navegador após cada change, não tudo no final
4. **Cores:** Usar `getModuleVariant(N)` consistentemente
5. **Props:** Sempre passar `variant` para componentes que aceitam
6. **RichIntro:** Sempre 5 parágrafos, incluir Petrobras em um deles

---

## REFERÊNCIAS

- Arquivo de especificação: `.agent/workflows/aula-ultimate.md`
- Modelo de excelência: `AulaContabilidadeBasica.tsx` (Aula 2)
- Color system: `src/lib/moduleColors.ts` → `getModuleVariant(N)`
- Componentes disponíveis: `src/components/aulas/shared/*`

---

**Status:** Aguardando aprovação para começar Sprint 1
**Próximo Passo:** Executar Fase 2 (Implementação)

