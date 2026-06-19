# Plano de Implementação - Padronização da Aula de Reescrita de Frases

Este plano visa substituir todos os componentes `ContentAccordion` da aula `AulaReescritaFrases.tsx` por `CardCarousel`. Essa mudança visa tornar o conteúdo mais direto, linear e visualmente atraente, eliminando cliques desnecessários para expandir tópicos teóricos fundamentais.

## User Review Required

> [!IMPORTANT]
> A substituição do `ContentAccordion` pelo `CardCarousel` altera a interatividade da página: em vez de expandir itens verticalmente, os usuários navegarão horizontalmente pelos cards teóricos. Isso é ideal para o fluxo pedagógico direto solicitado.

## Propostas de Mudança

### Componentes de Aula

#### [MODIFY] [AulaReescritaFrases.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaReescritaFrases.tsx)

A refatoração será realizada em todos os 10 módulos da aula, mapeando os `slides` do acordeão para as `cards` do carrossel.

**Mapeamento de Props:**
- `slides[].titulo` → `cards[].title`
- `slides[].icone` → `cards[].icone`
- `slides[].conteudo` → `cards[].descricao`

**Módulos afetados:**
1. **Módulo 1**: Substituição na Seção 1.
2. **Módulo 2**: Substituição na Seção 1.
3. **Módulo 3**: Substituição nas Seções 1 e 3.
4. **Módulo 4**: Substituição na Seção 1.
5. **Módulo 5**: Substituição nas Seções 1 e 4.
6. **Módulo 6**: Substituição na Seção 1.
7. **Módulo 7**: Substituição nas Seções 1 e 3.
8. **Módulo 8**: Substituição na Seção 1.
9. **Módulo 9**: Substituição na Seção 1.
10. **Módulo 10**: Substituição na Seção 1.

## Plano de Verificação

### Verificação Manual
- Navegar por cada módulo da aula no ambiente de desenvolvimento.
- Validar se todos os carrosséis estão renderizando corretamente e se o conteúdo (textos, alertas, tabelas internas) está legível e bem formatado dentro dos cards.
- Confirmar que o componente `ContentAccordion` foi removido dos imports.
