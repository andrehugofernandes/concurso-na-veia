# Implementação do Fluxo PMAVV (Padrão wp2nextjs)

Este plano detalha a migração das telas legadas para o novo padrão de UI: Dashboard-style com CRUD via Modais.

## Proposed Changes

### [Componentes Compartilhados]
Criaremos a base visual para que todas as telas sigam o mesmo padrão "Premium".

#### [NEW] [module-page-header.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/pmavv/module-page-header.tsx)
Componente para o topo de cada módulo, contendo Título, Descrição e o botão de ação principal.

#### [NEW] [stats-grid.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/pmavv/stats-grid.tsx)
Grid de cards para exibir métricas rápidas (Total, Pendentes, etc.).

#### [NEW] [modal-form-wrapper.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/pmavv/modal-form-wrapper.tsx)
Um wrapper padronizado usando `Dialog` do shadcn/ui para envolver todos os formulários de CRUD.

---

### [Módulos de Cadastro]
Migração progressiva dos formulários mapeados em `source/telas`.

#### [MODIFY] [Regionais (Page & Form)](file:///c:/GSW/PMAVV/PMAVV/src/app/(app)/cadastros/regionais/page.tsx)
- Implementar listagem com `DataTable`.
- Criar `RegionalForm.tsx` e integrar no `ModalFormWrapper`.

#### [MODIFY] [Bairros (Page & Form)](file:///c:/GSW/PMAVV/PMAVV/src/app/(app)/cadastros/bairros/page.tsx)
- Implementar listagem com busca.
- Criar `BairroForm.tsx` com autocomplete para Regional (conforme PRD).

---

### [Módulo de Denúncia (Fluxo Especial)]
O fluxo da denúncia será o primeiro "Wizard" do sistema.

#### [MODIFY] [Denúncia Sequencial](file:///c:/GSW/PMAVV/PMAVV/src/app/(app)/cadastros/denuncia/sequencial/page.tsx)
- Implementar o wizard de 4 passos: Denúncia -> Vítima -> Denunciante -> Agressor.
- Opção de abrir cada step em modal ou manter na página com estado persistente.

## Verification Plan

### Automated Tests
- Criar testes unitários para os schemas Zod de cada formulário.
- Testar a renderização dos componentes base (`ModulePageHeader`, `StatsGrid`).

### Manual Verification
- Verificar se o Modal abre e fecha corretamente mantendo o estado da tabela.
- Validar se os Toasts de sucesso (Sonner) aparecem após o salvamento via Server Action.
- Comparar visualmente os campos com as imagens em `source/telas`.
