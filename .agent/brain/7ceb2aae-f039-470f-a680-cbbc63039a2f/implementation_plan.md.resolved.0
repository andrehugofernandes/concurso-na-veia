# Padronização dos Rich Intros — AulaCoesaoCoerencia.tsx

## Objetivo

Substituir os 10 Rich Intros da aula de **Coesão e Coerência** pelo padrão editorial usado na aula modelo **Interpretação de Texto** — texto corrido denso, sem elementos visuais decorativos (imagens, grids lado-a-lado, cards visuais).

---

## Diagnóstico: O Problema Atual

### Padrão MODELO ✅ (AulaInterpretacaoTexto.tsx — 3.760 linhas)

```
Rich Intro = <section> + ModuleSectionHeader(index="INTRO") + <div> com 4-5 <p> corridos + Caixa de Destaque
```

**Estrutura concreta (Módulo 1, linhas 206-273):**
1. `<section>` container com `bg-card rounded-2xl border...`
2. `ModuleSectionHeader index="INTRO"` com título e descrição
3. `<div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">`
4. **4 parágrafos `<p>` densos** (Conceito → Explicação → Contexto Petrobras → Estratégia)
5. **1 Caixa de Destaque** (`bg-gradient-to-br from-indigo-50...`) com regra/fórmula
6. Fecha `</div>` e `</section>`

> **NÃO usa:** `<RichIntro>`, grids `lg:grid-cols-2`, imagens/placeholders visuais, `QuizDiagnostic`.

---

### Padrão ATUAL ❌ (AulaCoesaoCoerencia.tsx — 3.036 linhas)

```
Rich Intro = <section> + ModuleSectionHeader(index="INTRO") + <RichIntro> + grid 2 colunas (texto | imagem)
```

**Problemas encontrados em TODOS os 10 módulos:**

| Problema | Impacto |
|----------|---------|
| Usa componente `<RichIntro>` wrapper (ausente no modelo) | Estrutura diferente |
| Layout `grid grid-cols-1 lg:grid-cols-2` (texto + imagem) | 50% do espaço perdido com placeholder visual |
| Apenas **2 parágrafos** por módulo (vs. mínimo 4-5) | Conteúdo raso, não cobre quiz |
| Segundo parágrafo em `text-sm` (menor que o modelo `text-lg`) | Hierarquia visual inconsistente |
| Inclui `<QuizDiagnostic>` dentro da section Rich Intro | Componente fora do lugar (deve estar separado) |
| Caixas de destaque curtas (`text-xs`) vs. modelo (`list-disc`) | Menos informação disponível |

---

## Proposta de Alteração

### Para cada módulo (1 a 10):

1. **REMOVER** o wrapper `<RichIntro>` e o grid de 2 colunas com imagem
2. **SUBSTITUIR** por `<div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">` (idêntico ao modelo)
3. **EXPANDIR** de 2 parágrafos para **mínimo 5 parágrafos** seguindo a estrutura:
   - § 1: Conceito Científico (definição formal, Bechara)
   - § 2: Explicação Intuitiva (analogia do cotidiano / industrial)
   - § 3: Regras e Mecanismos (o coração gramatical do tema)
   - § 4: Contexto Petrobras (aplicação prática industrial)
   - § 5: Pegadinhas CESGRANRIO (como a banca cobra o tema)
4. **ADICIONAR** Caixa de Destaque com regra-chave ou fórmula mnemônica
5. **MANTER** o `<QuizDiagnostic>` existente, mas **fora** da `<section>` do Rich Intro (como elemento separado logo abaixo)
6. **PRESERVAR** todos os outros componentes do módulo intactos (ContentAccordion, FlipCard, CardCarousel, Comparison, LessonTabs, QuizInterativo, etc.)

> [!WARNING]
> **Regra de Preservação Absoluta**: Nenhum componente existente além do Rich Intro será alterado. O `QuizDiagnostic` será MANTIDO — apenas movido para fora da section se necessário.

---

## Módulos e Temas de Conteúdo

| Módulo | Título | Foco do Rich Intro |
|--------|--------|---------------------|
| 1 | O Tecido do Texto | Conceito dual Coesão vs Coerência + 5 mecanismos base |
| 2 | O Poder do Retrovisor | Anáfora: retomada textual, pronomes, sinônimos |
| 3 | O Farol do Sentido | Catáfora: antecipação, dois-pontos, pronomes demonstrativos |
| 4 | O Silêncio Eloquente | Elipse e Zeugma: omissão recuperável pelo contexto |
| 5 | Substituições de Elite | Coesão lexical: sinonímia, hiperonímia, hiponímia |
| 6 | A Dança dos Conectivos | Conjunções coordenativas: adição, adversidade, alternância, conclusão, explicação |
| 7 | Concessão & Oposição | Subordinativas concessivas vs adversativas (contudo ≠ embora) |
| 8 | Arquitetura da Coerência | Princípios: não-contradição, relevância, continuidade temática |
| 9 | Progressão e Relevância | Progressão temática: linear, constante, derivada |
| 10 | Arena de Elite | Síntese final e estratégia de prova |

### Fonte de Conteúdo
- `source/conteudo/AULA_COESAO_COERENCIA_HTML_COMPLETO.md` — Base teórica
- `source/conteudo/PERFIL_CESGRANRIO_PORTUGUES.md` — Estilo da banca
- Gramática de Evanildo Bechara — Referência acadêmica

---

## Template JSX Exato (por módulo)

```tsx
{/* ★ RICH INTRO: [Nome do Módulo] */}
<section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
  <ModuleSectionHeader
    index="INTRO"
    title="[Título Descritivo]"
    description="[Subtítulo contextual]"
    variant={mv[N]}
  />
  <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
    {/* § 1: CONCEITO CIENTÍFICO */}
    <p>... (Definição formal de Bechara) ...</p>

    {/* § 2: EXPLICAÇÃO INTUITIVA */}
    <p>... (Analogia cotidiana / industrial) ...</p>

    {/* § 3: REGRAS E MECANISMOS */}
    <p>... (O coração gramatical do tema) ...</p>

    {/* § 4: CONTEXTO PETROBRAS */}
    <p>... (Uso prático em relatórios e segurança) ...</p>

    {/* § 5: PEGADINHAS CESGRANRIO */}
    <p>... (Padrões de cobrança e erros comuns) ...</p>

    {/* CAIXA DE DESTAQUE */}
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
      <h4 className="font-bold text-foreground flex items-center gap-2">
        [Emoji] Regra-Chave / Fórmula
      </h4>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>...</li>
      </ul>
    </div>
  </div>
</section>

{/* QuizDiagnostic separado (preservado do original) */}
<QuizDiagnostic ... />
```

---

## Plano de Execução (Faseado)

### Fase 1: Módulos 1-5 (primeira sessão)
- [ ] Módulo 1 — O Tecido do Texto
- [ ] Módulo 2 — O Poder do Retrovisor
- [ ] Módulo 3 — O Farol do Sentido
- [ ] Módulo 4 — O Silêncio Eloquente
- [ ] Módulo 5 — Substituições de Elite

### Fase 2: Módulos 6-10 (segunda sessão)
- [ ] Módulo 6 — A Dança dos Conectivos
- [ ] Módulo 7 — Concessão & Oposição
- [ ] Módulo 8 — Arquitetura da Coerência
- [ ] Módulo 9 — Progressão e Relevância
- [ ] Módulo 10 — Arena de Elite

### Fase 3: Validação
- [ ] Verificar build (`pnpm dev` sem erros)
- [ ] Conferir contagem de linhas (deve CRESCER, nunca diminuir)
- [ ] Conferir que nenhum componente existente foi removido
- [ ] Verificar visual no browser (light mode e dark mode)

---

## Open Questions

> [!IMPORTANT]
> 1. **Sobre o componente `<RichIntro>`**: O import dele será removido do arquivo se não for usado em nenhum outro lugar. Confirma que posso remover o import?
> 2. **QuizDiagnostic**: O modelo de Interpretação de Texto NÃO possui `QuizDiagnostic` nos módulos. Devo mantê-los onde estão (apenas mover para fora da section) ou removê-los também para ficar 100% igual ao modelo?
> 3. **Execução faseada**: Prefere que eu faça todos os 10 módulos de uma vez, ou em 2 fases (5+5) para revisão incremental?

---

## Verificação Final

| Métrica | Antes (Atual) | Depois (Esperado) |
|---------|---------------|-------------------|
| Parágrafos por Rich Intro | 2 | 5+ |
| Usa `<RichIntro>` wrapper | Sim | Não |
| Layout grid com imagem | Sim | Não |
| Tipografia | `text-sm` / `text-lg` misto | `text-lg` uniforme |
| Caixa de Destaque | Curta / `text-xs` | Rica / `list-disc` |
| Tamanho do arquivo | ~3.036 linhas | ~3.800+ linhas |
| Padrão idêntico ao modelo | ❌ | ✅ |
