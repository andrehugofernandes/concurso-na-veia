# Plano de Enriquecimento Premium de Aulas de Matemática

Este plano detalha o enriquecimento das aulas de matemática com componentes interativos e design premium, seguindo o padrão C.E.D.E.

## 🎯 Objetivo
Transformar os arquivos `.tsx` das 14 aulas listadas abaixo, injetando componentes interativos de alto valor didático: `<FlipCard>`, `<CardCarousel>` e resumos de módulo (mesa de revisão com `<LessonTabs>` e `<ModuleSummaryCarouselNew>`).

## 📦 Aulas Alvo (14 Arquivos)

**Álgebra Básica e Sistemas**
1. `AulaConjuntos.tsx`
2. `AulaEquacoes1Grau.tsx`
3. `AulaEquacoes2Grau.tsx`
4. `AulaSistemasLineares.tsx`
5. `AulaMatrizesDeterminantes.tsx`

**Estudo das Funções**
6. `AulaFuncoesAfimQuadratica.tsx`
7. `AulaFuncoesExponenciais.tsx`
8. `AulaFuncoesLogaritmicas.tsx`

**Geometria e Trigonometria**
9. `AulaGeometriaPlana.tsx`
10. `AulaGeometriaEspacial.tsx`
11. `AulaGeometriaAnalitica.tsx`
12. `AulaTrigonometria.tsx`

**Avançado e Financeira**
13. `AulaAnaliseCombinatoriaou.tsx`
14. `AulaMatematicaFinanceira.tsx`

---

## 🛠️ Padrão de Injeção Premium por Aula

Para cada arquivo, implementaremos a seguinte estrutura nos módulos mais importantes (geralmente módulos de conceito fundamental e módulos de dicas/macetes):

### 1. Dossiê de Elite / Macetes (Uso de `FlipCard`)
Inseriremos pelo menos uma seção de "Memorização Rápida" usando a mecânica de `FlipCard`.
*   **Frente:** Ícone, Título do conceito ou pergunta-chave.
*   **Verso:** Resposta densa com Negritos Estratégicos e a tag visual de "Dica de Elite".
*   *Componente:* `<div className="grid grid-cols-1 md:grid-cols-2 gap-4"> ... <FlipCard front={...} back={...} /> </div>`

### 2. Comparações e Subtópicos (Uso de `CardCarousel`)
Para enumerar propriedades (Ex: Tipos de Matrizes, Posições de Retas, Fórmulas de Geometria Espacial), substituiremos listas simples por um carrossel visual interativo.
*   *Componente:* `<CardCarousel items={[ { title, description, icon } ]} />`

### 3. Mesa de Revisão Visuais (Uso de `LessonTabs` + `ModuleSummaryCarouselNew`)
Será adicionada uma seção de Revisão Pós-Módulo nos tópicos cruciais, permitindo consolidar visualmente o que foi ensinado.
*   *Conteúdo:* Injeção do `LessonTabs` contendo um `ModuleSummaryCarouselNew` com placeholders padronizados (`/temp-img.png`) e prompts de geração para infográficos ou mapas mentais pertinentes à aula.

## 📝 Regras Estritas de Implementação (User Feedback)
- **Ordens Numéricas (Crucial):** O enriquecimento não pode quebrar a indexação visual. Onde houver `<ModuleBanner numero={X} />`, `<QuizInterativo numero={X} />` e, principalmente, em cabeçalhos de seção e resumos, os índices e marcações numéricas deverão seguir o módulo atual ou o número sequencial da UI.

## ✅ Verification Plan
- Rodar o comando `pnpm dev` sem erros tipográficos.
- Visitar a rota de cada aula editada e garantir a abertura dos `<FlipCard>`s e dos Carrosséis.
- Auditar a estética garantindo a presença dos "Dossiês de Elite" escuros nos versos dos cards e que as regras de responsividade mobile estão mantidas.
