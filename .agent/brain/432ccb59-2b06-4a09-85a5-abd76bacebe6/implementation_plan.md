# Implementação de APIs/Server Actions — PMAVV

## Objetivo

Criar todas as Server Actions (padrão `'use server'` + Zod) necessárias para suportar os módulos do PRD. Seguindo o padrão existente em `regionais-actions.ts`.

## O que já existe

| Módulo | Status |
|--------|--------|
| Auth (login, 2FA, me) | ✅ Completo |
| API `/api/users` (listagem) | ✅ Completo |
| API `/api/auth/me` | ✅ Completo |
| Regionais CRUD | ✅ `cadastros/regionais-actions.ts` |
| Bairros CRUD | ❌ Faltante |
| Denúncia CRUD | ❌ Faltante |
| Vítima CRUD | ❌ Faltante |
| Denunciante CRUD | ❌ Faltante |
| Agressor CRUD | ❌ Faltante |
| Visita CRUD + Auditoria | ❌ Faltante |
| Encaminhamento CRUD | ❌ Faltante |
| Usuários Admin CRUD | ❌ Faltante (precisa de actions PMAVV) |
| Constantes de Domínio | ❌ Faltante |
| Dashboard / Relatórios | ❌ Faltante |

---

## Proposed Changes

### Constantes de Domínio

#### [NEW] [dominio.ts](file:///c:/GSW/PMAVV/PMAVV/lib/constants/dominio.ts)
Enums e constantes conforme PRD seção 3.4: `ORGAO_ORIGEM`, `FORMA_VIOLENCIA`, `CLASSIFICACAO_VITIMA`, `PARENTESCO`.

---

### Server Actions — Cadastros

#### [NEW] [bairros-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/cadastros/bairros-actions.ts)
- `getBairros(page, limit, search)` — listagem paginada server-side
- `getBairroById(id)` — detalhe
- `createBairro({ nome, regional_id })` — create com validação Zod
- `updateBairro({ id, nome, regional_id })` — update
- Sem delete (conforme PRD)

#### [NEW] [denuncias-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/cadastros/denuncias-actions.ts)
- `getDenuncias(page, limit, filters)` — paginada, filtros por protocolo/data/orgao
- `getDenunciaById(id)` — com includes de vítima, denunciante, agressor
- `createDenuncia(data)` — gera protocolo automaticamente, valida campos obrigatórios
- `updateDenuncia(id, data)` — update
- `searchDenuncias(query)` — busca para Search-First
- Sem delete

#### [NEW] [vitimas-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/cadastros/vitimas-actions.ts)
- `getVitimas(page, limit, filters)` — paginada
- `getVitimaById(id)` — com include de denúncia e bairro
- `createVitima(data)` — vinculada a denúncia existente
- `updateVitima(id, data)` — update
- `searchVitimasByDenuncia(protocolo)` — Search-First

#### [NEW] [denunciantes-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/cadastros/denunciantes-actions.ts)
- `getDenunciantes(page, limit, filters)` — paginada
- `createDenunciante(data)` — vinculado a denúncia
- `updateDenunciante(id, denuncia_id, data)` — PK composta (id + denuncia_id)
- `searchDenunciantesByDenuncia(protocolo)` — Search-First

#### [NEW] [agressores-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/cadastros/agressores-actions.ts)
- `getAgressores(page, limit, filters)` — paginada
- `createAgressor(data)` — vinculado a denúncia
- `updateAgressor(id, data)` — update
- `searchAgressoresByDenuncia(protocolo)` — Search-First

#### [NEW] [visitas-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/cadastros/visitas-actions.ts)
- `getVisitas(page, limit, filters)` — paginada
- `getVisitaById(id)` — com denúncia e histórico
- `createVisita(data)` — cria visita + auto-registra em `tbl_historico_visita` (log de auditoria, PRD seção 8)
- `updateVisita(id, data)` — update + registra histórico com status ATUALIZADO
- `searchVisitasByDenuncia(protocolo)` — Search-First
- Sem delete no histórico

---

### Server Actions — Encaminhamentos

#### [NEW] [encaminhamentos-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/encaminhamentos-actions.ts)
- `getEncaminhamentos(page, limit, filters)` — paginada
- `createEncaminhamento(data)` — vinculado a visita e denúncia
- `updateEncaminhamento(id, data)` — update
- `buscarDadosDenuncia(protocolo)` — Botão `?` de autopreenchimento (PRD seção 6.6)

---

### Server Actions — Administração

#### [NEW] [usuarios-admin-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/admin/usuarios-admin-actions.ts)
- `getUsuarios(page, limit, search)` — paginada 10/página
- `createUsuario(data)` — campos: nome, login (único), senha (bcrypt), nivel, status_user
- `updateUsuario(id, data)` — update
- `toggleUsuarioStatus(id)` — ativar/inativar sem exclusão física

---

### Server Actions — Consultas e Relatórios

#### [NEW] [consultas-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/consultas-actions.ts)
- `consultarDenuncias(filters)` — usa `view_denuncia` via `$queryRaw`
- `consultarVitimas(filters)` — paginada
- `consultarVisitas(filters)` — paginada + export XML
- `consultarDenunciantes(filters)` — paginada
- `consultarAgressores(filters)` — paginada
- `consultarBairros(filters)` — paginada

#### [NEW] [relatorios-actions.ts](file:///c:/GSW/PMAVV/PMAVV/app/actions/relatorios-actions.ts)
- `getRelatorioViolenciaPorRegionais(periodo)` — dados agregados
- `getRelatorioFormasViolencia(periodo)` — dados agregados
- `getRelatorioTipoDenuncia(periodo)` — dados agregados
- `getDashboardMetrics()` — métricas para o dashboard

---

## Verificação

### Automatizado
```bash
# Verificar compilação TypeScript
npx tsc --noEmit

# Verificar lint
pnpm lint
```

### Manual (Browser)
1. Acessar `http://localhost:3001/api/users` — deve retornar lista com 16+ usuários
2. Testar cada Server Action via suas respectivas páginas quando o frontend for acoplado

> [!IMPORTANT]
> As Server Actions serão testadas quando integradas com as páginas de frontend. Por enquanto, o foco é garantir que compilem sem erros TypeScript.
