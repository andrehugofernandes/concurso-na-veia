# Implantação: Estabilização da Aula de Ortografia (Ultimate V4.1)

Este plano visa resolver os erros críticos de build no arquivo `AulaOrtografia.tsx`, garantindo que todos os componentes sigam rigorosamente as interfaces definidas em `shared.tsx`.

## User Review Required

> [!IMPORTANT]
> A interface do componente `ModuleConsolidation` foi atualizada para exigir 4 pilares obrigatórios (Vídeo, Resumo, Macete, Áudio). Vou preencher os dados faltantes nos módulos 3 a 10 com conteúdo pedagógico de alta qualidade focado em Ortografia.

> [!WARNING]
> A variante de cor `slate` será substituída por `blue` no Módulo 10, pois o componente `ModuleBanner` possui uma lista restrita de cores para garantir o contraste do design premium.

## Proposed Changes

### Componente: Português - Ortografia

#### [MODIFY] [AulaOrtografia.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaOrtografia.tsx)
- **Correção de Sintaxe**: Substituir em todo o arquivo a notação `->` (que quebra o JSX) pela seta Unicode `→` ou escape `{"->"}`.
- **Módulos 3 ao 10**:
    - Refatorar a chamada de `ModuleConsolidation` para remover a prop legada `items`.
    - Implementar a estrutura completa das props obrigatórias:
        - `video`: Objeto com metadados do YouTube.
        - `resumoVisual`: Lista de infográficos planejados.
        - `maceteVisual`: Dica mnemônica visual.
        - `audio`: Podcast/Áudio explicativo do módulo.
- **Módulo 10**:
    - Alterar `ModuleBanner` de `variant="slate"` para `variant="blue"`.

## Open Questions

- Os IDs de vídeo do YouTube fornecidos nos placeholders (ex: `videoId: "..."`) são apenas referências? Se sim, manterei o padrão de placeholder premium.

## Verification Plan

### Automated Tests
- Tentativa de execução do compilador TypeScript (`tsc`) no arquivo específico para garantir que não restam erros de prop.
- Verificação de erros de linting.

### Manual Verification
- Revisão visual do código para garantir que todas as tags JSX estão devidamente fechadas após as mudanças de sintaxe.
- Verificação na plataforma (se o servidor estiver rodando) para assegurar que os carrosséis internos do `ModuleConsolidation` carregam corretamente as novas props.
