# Plano Final de Saneamento RLCP - Ultimate V4.1

Este plano visa resolver permanentemente a corrupção estrutural do arquivo `AulaRLCP.tsx` através de uma reconstrução total via script, garantindo que o escopo das funções de renderização permaneça dentro do componente principal.

## User Review Required

> [!CAUTION]
> A reconstrução será total. Isso limpará qualquer resquício de corrupção ou tags órfãs (incluindo o lixo detectado pelo IDE na linha 1311).

> [!IMPORTANT]
> Manterei todo o conteúdo pedagógico reconstruído (M1-M10) com o padrão de multimedia (audio/video) corrigido.

## Proposed Changes

### Recontrução Estrutural

#### [MODIFY] [AulaRLCP.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaRLCP.tsx)

1. **Top-Level**: Manter imports e constantes de quizzes.
2. **Main Component**: Garantir que as variáveis `mv`, `MODULE_DEFS`, `completedModules`, etc., permaneçam acessíveis no escopo de todas as funções internas.
3. **Módulos 4-10**: Corrigir o fechamento das tags `</div>` e `TabsContent`.
4. **Rodapé**: Certificar que o `AulaTemplate` e as chaves de encerramento da função `AulaRLCP` no fim do arquivo estejam balanceadas.

## Verification Plan

### Automated Tests
- Executar `npx tsc src/components/aulas/administracao/AulaRLCP.tsx` (sem emit).
- Rodar o checklist pedagógico.

### Manual Verification
- O usuário deve confirmar que a aba de cada módulo aparece corretamente no navegador (através do `pnpm dev` já ativo).
