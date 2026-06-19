# Plano de Correção: UI/UX Modo Light e Wizard Flow

Este plano visa resolver os problemas de visibilidade no modo Light e a ocultação do botão "Próximo Passo" no Wizard de Denúncias.

## Problemas Identificados

1. **Contraste do Checkbox**: A marcação de seleção está pouco visível no modo Light devido a tokens de opacidade baixos.
2. **Botão Oculto**: O footer usa `absolute`, o que o coloca no fim do conteúdo em vez de fixo na viewport do modal, exigindo scroll excessivo.
3. **Fluxo do Wizard**: Necessidade de validação de preenchimento ponta a ponta.

## Proposta de Mudanças

### [Component Name] UI Core & Denúncias

#### [MODIFY] [multi-check-field.tsx](file:///c:/GSW\PMAVV\PMAVV\src\components\pmavv\multi-check-field.tsx)

- Reforçar o contraste do estado `isSelected`.
- Aumentar a opacidade do `bg-primary` no modo Light.
- Adicionar borda mais nítida quando selecionado.

#### [MODIFY] [denuncia-form.tsx](file:///c:/GSW\PMAVV\PMAVV\src\components\denuncias\denuncia-form.tsx)

- Mudar o footer de `absolute bottom-0` para `sticky bottom-0`.
- Ajustar backgrounds para garantir que o footer "grude" na base do modal com transparência adequada.
- Remover o `pb-20` fixo se o sticky resolver o layout.

## Verificação Plan

### Automated Tests

- Usar subagent para preencher o formulário completo do Step 1 ao Step 4 no Modo Light.
- Capturar screenshots de cada passo.

### Manual Verification

- Testar alternância entre Dark/Light mode durante o preenchimento.
- Verificar se o botão de "Continuar" está sempre visível acima do conteúdo.
