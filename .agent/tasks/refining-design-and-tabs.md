# Task: Refinamento de Tons e Reversão de Layout Compacto

## Objetivo
Refinar os tons de cinza do `FlipCard` no modo light e reverter as mudanças de layout "ultra-compacto" do menu sticky e cabeçalhos, restaurando a estética premium e espaçosa solicitada pelo usuário. Além disso, implementar o layout de abas para os resumos de módulo.

## Plano de Ação

### Fase 1: Reversão do Layout Compacto em `shared.tsx`
- [ ] **StickyModuleNav**:
    - Restaurar o layout de duas linhas (Módulo + Título).
    - Aumentar o `py` do container de `1.5` para `3` ou similar.
    - Ajustar o `TabsTrigger` para empilhar o label e o título verticalmente.
    - Restaurar o tamanho das fontes e ícones.
- [ ] **ModuleSectionHeader**:
    - Garantir que o círculo numérico use `w-14 h-14` e `text-3xl`.
    - Garantir que o título use `text-3xl md:text-4xl`.
- [ ] **Espaçamentos Globais**:
    - Restaurar `mb-16` (64px) entre seções e módulos.
    - Aumentar paddings internos dos cards onde foram reduzidos.

### Fase 2: Ajuste de Tons de Cinza no `FlipCard`
- [ ] No modo light, suavizar os tons de cinza (bordas e textos secundários) em aproximadamente 50%.
- [ ] Ajustar as classes de borda para `border-border/40` ou similar para um visual mais leve.

### Fase 3: Layout de Abas nos Resumos de Módulo
- [ ] Em `AulaClassesPalavras.tsx`, substituir o `CardCarousel` de resumo pelo componente `LessonTabs`.
- [ ] Organizar o conteúdo em abas: "Vídeo", "Áudio", "Resumo Visual" e "Macete".

## Verificação
- [ ] Conferir se o menu sticky voltou a ter duas linhas e altura maior.
- [ ] Validar se os cabeçalhos de seção estão grandes e legíveis.
- [ ] Verificar se os `FlipCards` no modo light estão com bordas e textos mais suaves.
- [ ] Confirmar se os resumos de módulo em `AulaClassesPalavras.tsx` estão usando o sistema de abas.
