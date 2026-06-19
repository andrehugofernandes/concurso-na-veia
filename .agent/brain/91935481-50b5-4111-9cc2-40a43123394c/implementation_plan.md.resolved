# Plano de Implementação: Suporte a Completion Badge no AulaTemplate

Este plano visa resolver o erro de TypeScript onde as propriedades `showCompletionBadge` e `completionBadgeText` não são reconhecidas pelo componente `AulaTemplate`. Além de corrigir o erro de tipagem, implementaremos a interface visual para exibir este badge especial de conclusão.

## User Review Required

> [!IMPORTANT]
> A alteração será feita no componente central `AulaTemplate` em `shared.tsx`. Isso afetará a tipagem de todas as aulas do sistema, permitindo que elas usem badges de conclusão personalizados.

## Proposed Changes

### [Frontend] Components Shared

#### [MODIFY] [shared.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/shared.tsx)
- Atualizar a interface de props do `AulaTemplate` para incluir:
  - `showCompletionBadge?: boolean;`
  - `completionBadgeText?: string;`
- Implementar no JSX do `AulaTemplate` a exibição deste badge. O local ideal é próximo ao título da aula ou como um overlay de sucesso.
- Como o `AulaVocabulary.tsx` já passa `"🏆 MASTER EM VOCABULÁRIO TÉCNICO"`, usaremos esse texto se fornecido.

#### [MODIFY] [AulaVocabulary.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaVocabulary.tsx)
- Verificar se a passagem das props está correta após a atualização do `shared.tsx`. (O erro de TS deve desaparecer automaticamente).

## Open Questions

> [!NOTE]
> O `AulaTemplate` já possui um badge padrão de "Concluída" (linhas 2389-2394). O `showCompletionBadge` deve **substituir** este badge ou aparecer **ao lado**? 
> Minha sugestão: Se `showCompletionBadge` for verdadeiro e houver `completionBadgeText`, ele substitui ou complementa o badge padrão para dar um ar mais "Premium" e específico à aula (ex: "Master em Inglês" em vez de apenas "Concluída").

## Verification Plan

### Automated Tests
- Verificar via compilador de TypeScript (ou IDE) se o erro no `AulaVocabulary.tsx:138` desapareceu.

### Manual Verification
- Acessar a aula de "Vocabulary" em Inglês.
- Marcar a aula como concluída.
- Verificar se o badge personalizado "🏆 MASTER EM VOCABULÁRIO TÉCNICO" aparece corretamente e com estética "Ultimate".
