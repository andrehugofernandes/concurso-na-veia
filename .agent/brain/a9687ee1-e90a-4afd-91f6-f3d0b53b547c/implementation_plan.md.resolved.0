# Plano de Implementação: Unificação da Skill de Criação de Aulas Premium

Propomos a unificação de todas as regras de estrutura didática (C.E.D.E.), design visual premium (Rich Intro, FlipCards com ícones Lucide, ModuleConsolidation com síntese estratégica), e padrões de código React/TypeScript em uma única superestrutura de criação. Isso evitará retrabalho de correção sintática e garantirá que novas aulas nasçam 100% corretas no Petrobras Quest.

## User Review Required

> [!IMPORTANT]
> A nova super skill e o workflow unificados irão reintroduzir no repositório os padrões deletados no commit `0f71600` e no `1af84de6`, porém adaptados para usar exclusivamente `sinteseEstrategica` (ex-`maceteVisual`) e o grid correto de FlipCards sem conflitos de tipagem.

## Proposed Changes

### [Docs & Manuals]

#### [NEW] [GUIA_CRIACAO_AULAS.md](file:///c:/Workspace/petrobras-quest/docs/GUIA_CRIACAO_AULAS.md)
* Guia mestre (prompt estruturado) para que LLMs ou desenvolvedores humanos possam gerar qualquer aula de edital do zero com todos os elementos integrados de primeira, unindo a semântica didática e o código correto de front-end.

---

### [Agent Workflow & Skills]

#### [NEW] [SKILL.md](file:///c:/Workspace/petrobras-quest/.agent/skills/criar-aula-premium/SKILL.md)
* Criação de uma pasta de skill contendo as regras de avaliação de qualidade didática (C.E.D.E.A de 5 parágrafos) e conformidade técnica (importação dinâmica, registro em `conteudo.ts` e tratamento correto de tipos JSX/TypeScript).

#### [NEW] [criar-aula-premium.md](file:///c:/Workspace/petrobras-quest/.agent/workflows/criar-aula-premium.md)
* Workflow interativo no menu do agente para o comando `/criar-aula-premium`. Ele guiará o agente e o usuário no passo a passo da criação de um novo arquivo de aula e do respectivo pool de questões no formato `./data/...`.

---

## Verification Plan

### Automated Tests
- Criaremos uma aula de teste temporária `src/components/aulas/teste/AulaPilotoConcurso.tsx` e seu respectivo pool de questões em `src/components/aulas/teste/data/piloto-quizzes.ts` seguindo o novo guia.
- Validaremos a compilação de tipos com `tsc --noEmit` para garantir que a aula gerada não tenha erros de syntax JSX, ícones ou props inválidas.

### Manual Verification
- Iniciaremos o servidor de desenvolvimento local (`pnpm dev`) e utilizaremos o navegador para navegar até a aula de testes, verificando visualmente:
  1. A navegação entre os 10 módulos.
  2. A correta renderização do acordeão C.E.D.E.A no modo `stacked`.
  3. O funcionamento dos flipcards premium com ícones Lucide.
  4. O quiz interativo e a barra de progresso.
