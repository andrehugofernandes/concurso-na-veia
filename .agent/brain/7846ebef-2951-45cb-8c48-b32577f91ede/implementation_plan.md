# Plano de Correção e Push — AulaTemplate & AulaVocabulary

Este plano visa resolver o erro de TypeScript reportado anteriormente (falta de suporte a `showCompletionBadge` no `AulaTemplate`) e executar o `push` solicitado pelo usuário.

## Problema Identificado

1. **Erro de TypeScript**: O componente `AulaVocabulary` (e possivelmente outros) tentava passar as props `showCompletionBadge` e `completionBadgeText` para o `AulaTemplate`, mas estas não estavam definidas na interface do template em `shared.tsx`.
2. **Estado Atual**: Nas últimas versões dos commits locais, essas propriedades parecem ter sido removidas do uso em `AulaVocabulary.tsx` para "calar" o erro, mas isso remove uma funcionalidade visual desejada (Premium).
3. **Falha de Push**: O comando `git push` está falhando com `Recv failure: Connection was reset`, possivelmente devido ao tamanho do push (16 commits) ou problemas de rede.

## Mudanças Propostas

### 1. `src/components/aulas/shared.tsx` [MODIFY]
- Adicionar `showCompletionBadge?: boolean` e `completionBadgeText?: string` à interface de props do `AulaTemplate`.
- Implementar a renderização do selo de conclusão personalizado no cabeçalho ou seção de título, ao lado ou substituindo o selo padrão de "Concluída".

### 2. `src/components/aulas/ingles/AulaVocabulary.tsx` [MODIFY]
- Restaurar o uso de `showCompletionBadge` e `completionBadgeText` no componente `AulaTemplate` para reativar essa funcionalidade visual.

### 3. Git & Push
- Commitar as correções.
- Tentar o push novamente. Caso persista a falha, tentaremos aumentar o `http.postBuffer` ou realizar o push em blocos menores.

## Plano de Verificação

### Testes Automatizados
- Executar `pnpm exec tsc --noEmit` especificamente nos arquivos afetados para garantir que o erro de tipos foi resolvido.

### Verificação Manual
- Verificar visualmente se o novo selo aparece corretamente quando a aula é marcada como concluída.
- Confirmar o sucesso do `git push`.

## Perguntas Abertas
- O selo de conclusão personalizado deve substituir o selo padrão "Concluída" ou aparecer ao lado dele?
- Há outros arquivos que precisam dessa mesma restauração além do `AulaVocabulary.tsx`?
