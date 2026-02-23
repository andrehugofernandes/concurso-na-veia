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

# Task Breakdown

## 1. Aula Ortografia e Acentuação (`AulaOrtografia.tsx`)
- [/] **Restructure Modules**: Insert a new Módulo 1 (Encontros Vocálicos e Separação Silábica).
- [ ] **Shift Modules**: Move current 1-5 to 2-6 (Adjust IDs, translations, and numberings).
- [ ] **Standardize `LessonTabs`**: Implement the 4-tab pattern (Video, Visual Summary, Macete, Audio + Lyric) for ALL modules.
- [ ] **Fix Layout**: Adjust "A Regra da Dobradinha" (Módulo 3) - balanced grid/carousel.
- [ ] **Add FlipCards**: Integrate FlipCards into Módulo 4 (Expressões Problemáticas).
- [ ] **Fix Numbering**: Correct header numbering in Módulo 5/6.

## 2. Aula Classes de Palavras (`AulaClassesPalavras.tsx`)
- [ ] **Standardize `LessonTabs`**: Replace current summaries with the 4-tab component for ALL modules.
- [ ] **Content Injection**: Ensure each tab has relevant content (placeholders for videos/audios, but with correct lyrics and visual structure).

## 3. Aula Tipos Textuais (`AulaTiposTextuais.tsx`)
- [ ] **Standardize `LessonTabs`**: Apply the 4-tab pattern for ALL modules.

## 4. Documentation & Final Polish
- [ ] **Update MODELO**: Ensure `MODELO_CRIACAO_AULA_CLASSES_GRAMATICAIS.md` reflects the 4-tab `LessonTabs` requirement.
- [ ] **Final Verification**: Audit all 3 files for duplicate keys, layout bleeding, and mobile responsiveness.

## Verificação
- [ ] Conferir se o menu sticky voltou a ter duas linhas e altura maior.
- [ ] Validar se os cabeçalhos de seção estão grandes e legíveis.
- [ ] Confirmar se os resumos de módulo em todas as aulas estão usando o sistema de 4 abas.
- [ ] Capturar screenshots/vídeos para confirmação final.
