# Walkthrough: Suporte a Completion Badge no AulaTemplate

Corrigi o erro de TypeScript que impedia a compilação das aulas ao usar as propriedades `showCompletionBadge` e `completionBadgeText`. Além disso, implementei a interface visual para esses badges no componente central.

## Alterações Realizadas

### [Frontend] Components Shared

#### [shared.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/shared.tsx)
- **Tipagem**: Adicionei `showCompletionBadge?: boolean` e `completionBadgeText?: string` na interface de props do `AulaTemplate`.
- **UI/UX**: Implementei um novo badge estilizado com gradiente `amber-orange-yellow` e ícone de troféu (`LuTrophy`) para quando a aula é concluída com um status especial (Master).
- **Lógica**: O badge agora alterna entre o padrão "Concluída" (verde) e o personalizado (dourado) dependendo da prop enviada.

## Verificação e Testes

### Validação de Compilação
- O erro no arquivo [AulaVocabulary.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaVocabulary.tsx) foi resolvido, pois agora o componente `AulaTemplate` reconhece todas as props enviadas.
- Todas as outras aulas (Matemática, Português, etc.) que utilizavam essa prop agora também estão com a tipagem correta.

### Demonstração Visual (Lógica)
- Se `showCompletionBadge={true}`: Exibe badge dourado com ícone de troféu.
- Se `isCompleted={true}` (padrão): Exibe badge verde com ícone de check.

> [!TIP]
> Essa mudança unifica o comportamento das aulas "Ultimate", permitindo que cada matéria defina seu próprio título de mestre (ex: "Master em PA", "Especialista em Regência").
