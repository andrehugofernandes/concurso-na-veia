# Plano de Correção: Erros de Sintaxe JSX em AulaConjuntos.tsx

Este plano visa resolver os erros de compilação TypeScript/JSX causados pelo uso incorreto de chaves `{}` em textos, que o compilador interpreta como expressões JavaScript inválidas ou ambíguas.

## Problemas Identificados

1. **Braces Não Escapados em Strings:** O uso de `"{1,2}"` dentro de tags JSX causa erros de "comma operator" pois o JSX tenta interpretar o conteúdo entre as chaves como JS.
2. **Closing Braces Ambigúos:** O uso de `}` em nós de texto (ex: `{"{"} ... }`) gera o erro "Unexpected token. Did you mean {'}'} or &rbrace;?".
3. **Inconsistência de Estilo:** Alguns módulos usam o padrão correto (`{'{'} ... {'}'}`), enquanto outros usam padrões que quebram o build.

## Mudanças Propostas

### 1. Padronização de Escape de Chaves

Irei percorrer o arquivo `AulaConjuntos.tsx` e aplicar o padrão de escape seguro em todos os locais problemáticos:
- Substituir `"{ ... }"` por `{"{ ... }"}` ou `{' { '} ... {' } '}`.
- Garantir que todo `}` literal em texto JSX seja escrito como `{'}'}` ou `&rbrace;`.

#### [MODIFY] [AulaConjuntos.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaConjuntos.tsx)
- **Módulo 2 (Linha 1002):** Corrigir união de conjuntos.
- **Módulo 3 (Linha 1344):** Corrigir notação de Naturais.
- **Módulo 7/8 (Linhas 2456, 2459, 2462):** Corrigir notações de ℕ e ℤ.
- **Auditoria Geral:** Verificar se há outros macetes ou seções com o mesmo problema.

## Plano de Verificação

### Verificação Manual
1. **Inspeção de Código:** Verificar visualmente se todos os pares de chaves em textos estão corretamente envolvidos em blocos JSX de string.
2. **Execução do Dev Server:** Acompanhar o terminal `pnpm dev` (que o usuário já tem rodando) para confirmar se os erros de compilação desaparecem em tempo real.
3. **Build de Teste:** Executar `pnpm tsc` ou similar se necessário para validar o arquivo individualmente.

## Questões Abertas

- Nenhuma no momento. O padrão de correção é técnico e segue o que já funciona em outras partes do arquivo.
