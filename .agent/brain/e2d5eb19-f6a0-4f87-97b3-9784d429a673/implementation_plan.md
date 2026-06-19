# Plano de Implementação - Correção e Padronização Premium das Aulas de Inglês

Este plano detalha as alterações necessárias para resolver o erro de runtime `TypeError` no componente `QuizInterativo`, corrigir incompatibilidades de propriedades nos componentes `ComparisonSide` e `AlertBox`, adaptar o arquivo de aula `AulaTextComprehension.tsx` para o padrão de design e pedagógico premium do Petrobras Quest, e corrigir problemas de codificação (mojibake) e caracteres especiais em todas as aulas de inglês.

## Decisões de Design (Aprovado)

1. **Unificação de Cores**: As aulas de inglês usarão a estrutura `variant={mv[1]}` de forma estática em todos os módulos (1 a 10), garantindo que todos os banners, cabeçalhos de seção e mesas de consolidação mantenham a mesma coloração (azul do Módulo 1), respeitando o *Purple Ban*.
2. **Correção de Codificação (Mojibake)**: Conversão reversa e higienização das strings corrompidas em `AulaReadingStrategies.tsx`.
3. **Substituição de Emojis e Símbolos por Lucide**: Substituição de emojis e símbolos especiais (ex: `①`, `②`, `✓`, `✅`, `❌`, `❓`) por ícones oficiais do `lucide-react` ou formatação de texto limpa.
4. **Atualização da Propriedade de Consolidação**: Migração completa da propriedade `maceteVisual` para `sinteseEstrategica` no `ModuleConsolidation` e no guia do desenvolvedor.

## Proposed Changes

### Componente Compartilhado (Core)

#### [MODIFY] [shared.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/shared.tsx)
- O componente `QuizInterativo` já foi corrigido para evitar falha com `titulo` opcional/indefinido (`(titulo || "")`).

---

### Componentes de Aulas de Inglês

#### [MODIFY] [AulaTextComprehension.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaTextComprehension.tsx)
- **Unificação de Cores**: Substituir as chamadas de `variant={mv[x]}` por `variant={mv[1]}` em todos os 10 módulos.
- **Correção das Chamadas de QuizInterativo**: Garantir que as chamadas a `<QuizInterativo>` passem o `titulo` correto correspondente ao módulo atual.
- **Correção do AlertBox**: Remover a prop obsoleta `descricao` e passar o texto explicativo como elemento `<p>` filho (`children`).
- **Correção do ComparisonSide**: Modificar as chamadas que usavam as propriedades obsoletas `lado1` e `lado2` para um grid responsivo com duas instâncias individuais de `<ComparisonSide>`.
- **Padronização C.E.D.E.A**: Configurar os headers introdutórios com `index="INTRO"` e estruturar os textos de introdução em exatamente 5 parágrafos semânticos.
- **Mesa de Consolidação**: Renomear a propriedade `maceteVisual` para `sinteseEstrategica` e unificar a variante para `variant={mv[1]}`.
- **Higienização de Emojis e Símbolos**: Substituir símbolos como `①`, `②`, `③`, `④`, `✓`, `✅`, `❌`, `❓` por ícones Lucide apropriados ou texto limpo.

#### [MODIFY] [AulaReadingStrategies.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaReadingStrategies.tsx)
- **Correção de Mojibake**: Corrigir todas as ocorrências de caracteres corrompidos usando o algoritmo seguro de decodificação reversa.
- **Unificação de Cores**: Substituir `variant={mv[x]}` por `variant={mv[1]}`.
- **Higienização de Emojis e Símbolos**: Substituir emojis e caracteres numéricos circulados ou símbolos de checklist por ícones Lucide.

#### [MODIFY] Outras Aulas de Inglês (Vocabulary, VerbTenses, FalseCognates, Connectors)
- **Unificação de Cores**: Substituir o uso de `variant={mv[x]}` por `variant={mv[1]}` para garantir a coloração uniforme em todas as aulas de inglês da plataforma.
- **Higienização de Emojis e Símbolos**: Remover emojis soltos e caracteres especiais.

---

### Documentação Técnica

#### [MODIFY] [GUIA_CRIACAO_AULAS.md](file:///c:/Workspace/petrobras-quest/docs/GUIA_CRIACAO_AULAS.md)
- Garantir que a documentação técnica mencione apenas a API atualizada de `AlertBox` (utilizando children ao invés de `descricao`) e `ModuleConsolidation` (usando `sinteseEstrategica`), e a regra de cor única para as aulas de inglês.

## Verification Plan

### Automated Tests
- Execução do compilador TypeScript (`npx tsc --noEmit`) para verificar se todos os arquivos TypeScript compilam sem erros de tipo.
- Execução do linter do projeto (`npm run lint`).

### Manual Verification
- Visualização e teste do comportamento de navegação e componentes no ambiente de desenvolvimento local (`pnpm dev`).
