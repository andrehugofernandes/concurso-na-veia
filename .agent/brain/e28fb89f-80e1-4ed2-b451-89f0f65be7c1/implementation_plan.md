# Plano de Implementação: Restauração dos Botões Mobile

O objetivo é restaurar a visibilidade dos botões "Home" e "Menu" no modo mobile, garantindo que eles acompanhem a barra de navegação quando esta entrar no estado fixo (`sticky`).

## Alterações Propostas

### [Componente Aulas Shared](file:///c:/Workspace/petrobras-quest/src/components/aulas/shared.tsx)

- **Mover o Bloco Mobile**: Reposicionar o `<motion.div>` que contém os botões de navegação mobile para dentro do contêiner div principal (que possui a classe `fixed` quando `isStickyNavPinned` é verdadeiro).
- **Ajuste de Posicionamento**:
  - Quando `isStickyNavPinned` for verdadeiro, os botões devem aparecer logo abaixo da barra de módulos.
  - Quando o cabeçalho estiver visível (`isTemporaryHeaderVisible`), o `mt-` (margin-top) deve ser ajustado para evitar sobreposições.
- **Refatoração de Estrutura**: Garantir que o contêiner pai suporte o conteúdo extra sem ocultá-lo via `overflow-hidden`.

## Plano de Verificação

### Verificação Automatizada (Subagente Browser)

- **Comando**: Validar via `pnpm dev`.
- **Passos**:
  1. Acessar `/aulas/portugues/interpretacao-texto` no modo mobile.
  2. Verificar se os botões aparecem no estado inicial.
  3. Rolar para baixo e verificar se os botões continuam visíveis e funcionais na barra fixa.
  4. Testar o botão "Menu" para garantir que ele alterna o cabeçalho e os botões acompanham o movimento.

### Verificação Manual

- Confirmar se o clique no ícone de "Home" redireciona corretamente.
- Confirmar se a transição visual entre o estado estático e fixo está fluida e sem saltos.
