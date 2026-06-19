# Plano de Implementação: Integração do Google Gemini Pro

Este plano descreve a integração oficial do Google Gemini Pro para a geração de questões de simulados, utilizando o SDK `@google/generative-ai` e um padrão de provedores unificado.

## Proposta de Mudanças

### 0. Gerenciamento de Custos (Prioridade)

- **Priorizar Gemini Pro (Free Tier)**: O Gemini no Google AI Studio oferece um generoso plano gratuito (15 requisições por minuto no modelo Flash).
- **Adicionar ApiFreeLLM (Fallback/Alternativa)**: Suporte para o provedor ApiFreeLLM (baseado em LLaMA 3.3) que é totalmente gratuito.

### 1. Dependências

- Instalar o pacote oficial do Google: `@google/generative-ai`.
- Instalar `openai` SDK (ou usar fetch) para compatibilidade com ApiFreeLLM.

---

### 2. Infraestrutura de IA (Provedores)

- **[NOVO] `src/lib/ai/provider.ts`**: Fábrica de provedores que decide qual serviço usar. Ordem de prioridade: Gemini -> ApiFreeLLM -> Anthropic (último caso).
- **[NOVO] `src/lib/ai/providers/base-provider.ts`**: Interface comum para garantir# Debugging e Otimização da Geração de Simulados

Este plano foca em resolver os erros persistentes na geração de questões e garantir que os simulados completos (ex: 20 questões) sejam gerados corretamente, sem falhas no loop de requisições.

## User Review Required

> [!IMPORTANT]
> A geração de 20 questões em sequência pode levar de 30 a 60# Migração 100% Server Actions (Next.js 16 / React 19)

Transformar todo o backend de API Routes para **Server Actions** em `src/lib/actions`, seguindo os padrões de **Clean Code** e **Backend Specialist**.

## Proposed Changes

### Backend Actions Layer (`src/lib/actions`)

#### [NEW] [progresso.ts](file:///c:/Workspace/petrobras-quest/src/lib/actions/progresso.ts)

- `salvarProgressoAction`: Salva o progresso da aula (Zod: `lessonId`, `moduleId`, `data`).
- `getProgressoAction`: Recupera o progresso do usuário logado.

#### [NEW] [ranking.ts](file:///c:/Workspace/petrobras-quest/src/lib/actions/ranking.ts)

- `getRankingAction`: Retorna o top 20 com filtros de cargo/matéria.

#### [NEW] [materias.ts](file:///c:/Workspace/petrobras-quest/src/lib/actions/materias.ts)

- `getMateriasPorProfissaoAction`: Substitui a rota `/api/materias`.

#### [MODIFY] [questoes.ts](file:///c:/Workspace/petrobras-quest/src/lib/actions/questoes.ts)

- [x] Já implementado com Zod e Clean Code.

---

### Dashboard & UI Refactoring

#### [MODIFY] [simulado-rapido/page.tsx], [simulado-especifico/page.tsx], [maratona-100/page.tsx]

- [x] Já migrados para usar `gerarQuestaoAction`.

#### [MODIFY] Componentes de Aula (`src/components/aulas`)

- Substituir `fetch('/api/progress')` por `salvarProgressoAction`.
- Implementar `useOptimistic` se necessário para feedback instantâneo.

---

### Decommissioning Legacy API

#### [DELETE] [src/app/api/...](file:///c:/Workspace/petrobras-quest/src/app/api)

Remover todas as subpastas em `/api` após validar as Server Actions equivalentes:

- `auth/*` (verificar se o `NextAuth` ou similar já cuida disso ou se precisa de actions custom).
- `progress`, `ranking`, `materias`.

## Verification Plan

### Automated Tests

- Scripts em `tmp/test-actions-batch.ts` para validar o fluxo de dados em todas as novas actions.

### Manual Verification

- Navegar por todas as telas que salvam progresso ou exibem rankings e validar a persistência.
- Verificar o `Network Tab` para garantir a ausência de chamadas para `/api`.

### Automated Tests

- **AAA Pattern**: Teste unitário para a Server Action simulando diferentes estados da IA.
- **Zod Validation**: Verificar se a action rejeita inputs malformados com status 400 simulado.

### Manual Verification

- Iniciar o simulado e monitorar o `Network Panel` (Browser) para confirmar que as requisições agora são do tipo `POST` com os headers de Server Action.
- Validar a barra de progresso durante as 20 chamadas.

4. Alternar o provedor padrão (via `.env`) e validar se a geração continua funcional com o Gemini.

### Testes de Script

1. Criar um script temporário em `/tmp/test-ai.ts` para validar a resposta de ambos os provedores.
2. Executar via `npx tsx /tmp/test-ai.ts` (se disponível) ou via rota de teste temporária.

> [!IMPORTANT]
> A integração com o Gemini via SDK é mais resiliente do que o fetch manual, pois lida melhor com retentativas e formatação de resposta.
