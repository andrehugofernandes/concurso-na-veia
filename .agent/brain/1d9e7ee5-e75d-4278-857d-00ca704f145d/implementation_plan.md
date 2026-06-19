# Implementação de Aula Premium: Governança de TI

Este plano descreve a criação de uma aula "Ultimate" de Governança de TI para o cargo de Analista de Sistemas, seguindo rigorosamente o workflow `@aula`.

## User Review Required

> [!IMPORTANT]
> A aula terá mais de 2500 linhas de código para garantir a densidade de conteúdo exigida pelo padrão premium.
> Os quizzes serão movidos para um arquivo separado para manter a manutenbilidade.

## Proposed Changes

### [Backend/Data]

#### [NEW] [governanca-quizzes.ts](file:///c:/Workspace/petrobras-quest/src/components/aulas/ti/data/governanca-quizzes.ts)

- Criação de 10 pools de questões (6-8 questões cada).
- Formato CESGRANRIO (A-E) com explicações detalhadas.
- Temas: COBIT 2019, ITIL 4, ISO/IEC 38500, Planejamento Estratégico de TI (PETI), Gestão de Riscos.

### [Frontend/Components]

#### [NEW] [AulaGovernanca.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/ti/AulaGovernanca.tsx)

- Estrutura de 10 módulos interativos.
- Protocolo C.E.D.E. aplicado em todos os acordeões.
- Inclusão de `ModuleConsolidation` em todos os módulos.
- Uso de `getModuleVariant` para consistência visual.

### [Routing]

#### [MODIFY] [page.tsx](<file:///c:/Workspace/petrobras-quest/src/app/(dashboard)/PetroLingo/page.tsx>)

- Registro da nova aula de Governança no sistema de rotas dinâmicas.

## Verification Plan

### Automated Tests

- Execução do script `python fix_count.py` para verificar integridade do JSX.
- Execução do script `python fix_tags.py` para garantir fechamento de tags.
- Verificação de build via `pnpm dev`.

### Manual Verification

- Navegar pelos 10 módulos no dashboard.
- Validar se os quizzes carregam 5 questões aleatórias do pool.
- Confirmar se a barra de progresso e o XP são atualizados corretamente.
