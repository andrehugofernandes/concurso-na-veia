# APIs PMAVV — Checklist

## Constantes
- [x] `lib/constants/dominio.ts` — Enums de domínio

## Cadastros
- [x] `bairros-actions.ts` — CRUD Bairros
- [x] `denuncias-actions.ts` — CRUD Denúncias + geração de protocolo
- [x] `vitimas-actions.ts` — CRUD Vítimas (Search-First)
- [x] `denunciantes-actions.ts` — CRUD Denunciantes (PK composta)
- [x] `agressores-actions.ts` — CRUD Agressores
- [x] `visitas-actions.ts` — CRUD Visitas + log de auditoria

## Encaminhamentos
- [x] `encaminhamentos-actions.ts` — CRUD + autopreenchimento

## Administração
- [x] `usuarios-admin-actions.ts` — CRUD Usuários Admin

## Consultas e Relatórios
- [x] `consultas-actions.ts` — Consultas paginadas
- [x] `relatorios-actions.ts` — Dados agregados + dashboard

## Verificação
- [ ] `npx tsc --noEmit` sem erros
- [ ] `pnpm lint` sem erros
