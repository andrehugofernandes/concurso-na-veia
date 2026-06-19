# Plano de Restauração e Upgrade ULTIMATE (Classes de Palavras)

Este plano visa corrigir as falhas críticas de sintaxe introduzidas no arquivo `AulaClassesPalavras.tsx` durante a migração para o padrão V4, garantindo a integridade estrutural e a completude pedagógica.

## User Review Required

> [!IMPORTANT]
> A reconstrução dos módulos 4 e 5 será massiva para garantir que nenhuma tag JSX fique órfã. O conteúdo pedagógico original será preservado e enriquecido com as seções "Rich Intro".

> [!WARNING]
> Verifique se as durações e títulos dos áudios nos `MusicPlayerCard` são os desejados, baseados nos placeholders anteriores.

## Proposed Changes

### [Componente] Aula de Classes de Palavras

#### [MODIFY] [AulaClassesPalavras.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaClassesPalavras.tsx)
- **Correção de Props (MusicPlayerCard)**: Atualizar de `title/artist` para `titulo/artista/audioUrl` em todas as ~10 instâncias.
- **Restauração de Sintaxe (Módulos 4 e 5)**: 
  - Corrigir a tabela de pronomes de tratamento (linha 2071).
  - Fechar tags `</tbody>`, `</table>`, `div`, `section` e `TabsContent`.
- **Sanitização ULTIMATE (Módulos 6 a 10)**:
  - Remover duplicidades de banners.
  - Garantir fechamento de tags `section` (ex: linha 3233).
- **Sincronização de Índices**: Ajustar `index` de `ModuleSectionHeader`.

## Open Questions

1. O conteúdo da tabela de pronomes de tratamento no Módulo 4 estava completo? Vou restaurá-lo com base no que vi antes do erro.
2. Deseja que eu já faça uma varredura nos módulos 6 a 10 para remover qualquer duplicidade remanescente após essa correção?

## Verification Plan

### Automated Tests
- `npm run build` ou `lint` no arquivo específico para garantir erro ZERO de sintaxe.
- Verificação manual das tags `TabsContent` e `section`.

### Manual Verification
- O usuário deve testar a navegação entre as abas (Tabs) para garantir que cada módulo carrega corretamente no navegador.
