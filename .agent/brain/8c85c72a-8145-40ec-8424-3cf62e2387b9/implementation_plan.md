# Plano de Implementação: Correção de# Padronização e Limpeza das Aulas de Inglês

Refatorar o componente `AulaReadingStrategies_fixed.tsx` para seguir os padrões de design estabelecidos em `AulaInterpretacaoTexto.tsx`, garantindo consistência visual, funcional e técnica (resolução de corrupção de caracteres).

## User Review Required

> [!IMPORTANT]
> O arquivo `AulaReadingStrategies_fixed.tsx` será transformado na versão final `AulaReadingStrategies.tsx`.
> A navegação entre módulos será padronizada com o componente `LessonTabs` e `AulaTemplate`.

## Proposed Changes

### Componentes de Aula (Inglês)

#### [MODIFY] [AulaReadingStrategies_fixed.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaReadingStrategies_fixed.tsx)

- Padronizar o array `mv` (Module Variants) para gerenciamento de cores.
- Aplicar o padrão Premium em todos os 10 módulos:
  - `ModuleBanner` no topo.
  - `RichIntro` ou `ModuleSectionHeader` + conteúdo para introduções.
  - `ContentAccordion` configurado com `mode="stacked"` (sem carrossel).
  - `ModuleConsolidation` com Síntese Estratégica, Vídeo e Áudio.
  - `QuizInterativo` com sorteio de questões.
- Eliminar caracteres corrompidos residuais (ex: `â• â• â•`, `MÃ“DULO`).
- Ajustar imports para usar `react-icons/lu` de forma consistente.

#### [DELETE] [AulaReadingStrategies.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ingles/AulaReadingStrategies.tsx)

- Substituir pela versão `fixed` após validação.

## Verification Plan

### Automated Tests

- Executar `tsc` para garantir integridade de tipos.
- Verificar se não há erros de importação nos quizzes.

### Manual Verification

- Validar se a estrutura de abas (Tabs) funciona corretamente.
- Verificar se a persistência no `localStorage` está ok.
  tsx`
- `src/components/aulas/ti/AulaMobile.tsx`
- `src/components/aulas/ti/AulaInfraestruturaTI.tsx`
- `src/components/aulas/ti/AulaBancoDados.tsx`
- `src/components/aulas/seguranca/AulaNr35.tsx`
- `src/components/aulas/seguranca/AulaNr10.tsx`
- `src/components/aulas/portugues/AulaPontuacao.tsx`
- `src/components/aulas/portugues/AulaConcordancia.tsx`
- `src/components/aulas/operacao/AulaMecanicaFluidos.tsx`
- `src/components/aulas/manutencao/AulaMetrologia.tsx`
- `src/components/aulas/manutencao/AulaDesenhoTecnico.tsx`
- `src/components/aulas/portugues/AulaRegencia.tsx`
- `src/components/aulas/ingles/AulaVocabulary.tsx`
- `src/components/aulas/ingles/AulaFalseCognates.tsx`
- `src/components/aulas/administracao/AulaAdministrativoTributario.tsx`
- `src/components/aulas/administracao/AulaGestaoProcessos.tsx`
- `src/components/aulas/administracao/AulaGestãoDePessoas.tsx`
- `src/components/aulas/matematica/AulaSistemasLineares.tsx`

## Plano de Verificação

### Testes Automatizados

- Executar `pnpm build` para garantir que os erros de compilação relacionados a exportações inexistentes foram resolvidos.
- Executar linting para garantir que `className` e outros termos React/JS estão corretos.

### Verificação Manual

- Abrir a aula de Inglês (Verb Tenses) no navegador e verificar se o quiz carrega corretamente (isso confirmará que a importação do quiz está funcionando).
- Verificar visualmente se não há caracteres `º` estranhos no texto das aulas.
