# Plano de Implementação - Correção da Aula de Gestão de Pessoas

Este plano visa corrigir erros de build, importação e consistência no componente `AulaGestãoDePessoas.tsx`, garantindo que ele siga os padrões definidos em `shared.tsx` e utilize corretamente a biblioteca de ícones.

## Propostas de Mudanças

### Componente de Aula

#### [MODIFY] [AulaGestãoDePessoas.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaGest%C3%A3oDePessoas.tsx)

*   **Correção de Importações de Ícones:**
    *   Substituir `LuCircleAlert` por `LuAlertCircle`.
    *   Substituir `LuCircleCheck` por `LuCheckCircle`.
*   **Harmonização de Variantes:**
    *   Garantir que todos os componentes `ModuleBanner`, `ModuleConsolidation` e `ModuleSectionHeader` usem variantes permitidas (`indigo`, `emerald`, `violet`, `amber`, `rose`, `cyan`, `blue`, `slate`).
*   **Ajuste de Props:**
    *   Verificar se há algum uso de `description` em `ModuleBanner` (deve ser `descricao`).
    *   Verificar se `ModuleConsolidation` possui todos os campos obrigatórios e se os tipos coincidem.
*   **Limpeza de Código:**
    *   Remover quaisquer funções `renderModuloX` que tenham sido deixadas após a migração para `TabsContent` dentro do `AulaTemplate`.

## Plano de Verificação

### Testes Automatizados

*   Executar `npm run build` ou `npx tsc` para verificar se os erros de tipagem e importação foram resolvidos.
*   Executar o script de lint: `python .agent/scripts/lint_runner.py c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaGest%C3%A3oDePessoas.tsx`.

### Verificação Manual

*   Abrir a aula de Gestão de Pessoas no navegador.
*   Verificar se todos os módulos (1 a 10) carregam corretamente.
*   Validar se os ícones aparecem nos acordeões e banners.
*   Testar a navegação entre as abas dos módulos.
