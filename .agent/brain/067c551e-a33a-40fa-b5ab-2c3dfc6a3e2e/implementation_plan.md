# Plano de Correção e Padronização - AulaRLCP.tsx

Resolver erros de build e padronizar o uso de componentes premium em `AulaRLCP.tsx`.

## Problemas Identificados

1. **Caracteres não escapados:** Uso de `>` e `<` como operadores de comparação ou texto simples dentro de blocos JSX.
2. **Props Incorretas:** Vários componentes estão sendo usados com props que não existem em sua definição no `shared.tsx`.
   - `QuizInterativo`: usa `quiz` em vez de `questoes`, e possui props extras (`moduleId`, `tema`).
   - `ModuleSectionHeader`: usa `icon` (removido) e falta `index`.
   - `ContentAccordion`: usa `items` em vez de `slides`.
   - `ModuleConsolidation`: usa `cards` em vez de `slides`, e passa cor de forma incorreta.

## Mudanças Propostas

### Aula RLCP

#### [MODIFY] [AulaRLCP.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaRLCP.tsx)

- **Escapamento de Caracteres:** Substituir `>` por `&gt;` e `<` por `&lt;` em todo o arquivo.
- **Padronização de Componentes:**
  - Atualizar `QuizInterativo` para usar `questoes={...}`.
  - Remover prop `icon` de `ModuleSectionHeader` e adicionar `index`.
  - Atualizar `ContentAccordion` para usar `slides={...}`.
  - Refatorar `ModuleConsolidation` para usar a nova estrutura de `slides` (premium) em vez de `cards`.

## Plano de Verificação

### Testes Automatizados
- Executar `pnpm build` para garantir que o build da aplicação não falhe.
- Verificar lints com `pnpm lint` (especificamente para este arquivo).

### Manual Verification
- Acessar a página da aula e verificar se os componentes (Acordeons, Quizzes, Consolidações) estão renderizando corretamente com o conteúdo premium.
