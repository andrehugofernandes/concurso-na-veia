# Refatoração da Aula de Gestão de Pessoas

Este plano visa corrigir erros de build e alinhar o componente `AulaGestãoDePessoas.tsx` aos padrões de interface e tipos definidos em `shared.tsx`.

## Mudanças Propostas

### [Componente AulaGestãoDePessoas](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaGestãoDePessoas.tsx)

#### [MODIFY] [AulaGestãoDePessoas.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaGestãoDePessoas.tsx)
- Corrigir importação de ícones (`LuCircleCheck`, `LuDollarSign`).
- Atualizar a interface de `handleModuleComplete` para aceitar apenas `score`.
- Refatorar o uso do `AulaTemplate` para incluir novos metadados obrigatórios (`titulo`, `materiaNome`, etc).
- Ajustar `ModuleConsolidation` de `cards` para `items`.
- Ajustar `ContentAccordion` de `items` para `slides`.
- Corrigir props de `QuizInterativo` (`questoes` em vez de `quiz`).

## Plano de Verificação

### Testes Manuais
- Verificar se a página da aula de Gestão de Pessoas carrega sem erros de build.
- Validar se o progresso é atualizado corretamente ao completar os quizzes.
- Garantir que todos os componentes visuais (acordeons, carrosséis) estão renderizando com o estilo correto.
