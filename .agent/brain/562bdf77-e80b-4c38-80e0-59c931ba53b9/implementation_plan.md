# Implementação do `<Activity>` no Formulário de Denúncia com Edição Pré-Populada

## Contexto

O formulário de denúncia atual (`DenunciaFormModal`) é **desmontado** quando o modal é fechado (`{isModalOpen && <DenunciaFormModal ... />}`). Isso faz com que **todo o estado** (step, campos preenchidos, lookup data, protocolo gerado) seja perdido.

O React 19.2 introduziu o componente `<Activity>`, que permite **esconder** UI sem desmontá-la. Quando `mode="hidden"`, o React aplica `display: none` e destrói os Effects (limpando subscriptions), mas **preserva todo o estado interno** (useState, useRef, DOM inputs). Ao voltar para `mode="visible"`, o estado é restaurado integralmente.

Além disso, o formulário precisa funcionar tanto para **criação** quanto para **edição**, pré-populando todos os campos do registro existente quando o botão de edição da DataTable é clicado.

## User Review Required

> [!IMPORTANT]
> **Mudança de Comportamento**: Com `<Activity>`, ao clicar em "Nova Denúncia", se você já estava preenchendo um formulário e apenas **fechou o modal sem submeter**, o formulário reabrirá exatamente onde você parou. Para "resetar" e começar do zero, você precisará **cancelar** explicitamente (um botão "Limpar Formulário" será adicionado) ou **submeter** o registro com sucesso.

> [!WARNING]
> **Edição vs. Criação**: Ao clicar em "Editar" na DataTable, o sistema irá **resetar o formulário** e pré-popular com os dados do registro selecionado, **mesmo que houvesse um rascunho de nova denúncia em andamento**. Isso é intencional — edição tem prioridade sobre rascunho.

## Proposed Changes

### 1. Componente de Página (`denuncias/page.tsx`)

#### [MODIFY] [page.tsx](file:///c:/GSW/PMAVV/PMAVV/src/app/(app)/denuncias/page.tsx)

**Mudança principal**: Substituir a renderização condicional `{isModalOpen && <DenunciaFormModal />}` por um `<Activity>` permanente.

```diff
- {isModalOpen && (
-   <DenunciaFormModal
-     isOpen={isModalOpen}
-     onClose={() => setIsModalOpen(false)}
-     ...
-   />
- )}
+ <Activity mode={isModalOpen ? "visible" : "hidden"}>
+   <DenunciaFormModal
+     isOpen={isModalOpen}
+     onClose={() => setIsModalOpen(false)}
+     onSuccess={handleModalSuccess}
+     initialData={editingDenuncia ? {...} : undefined}
+     editKey={editingDenuncia?.id ?? "new"}
+   />
+ </Activity>
```

- **`editKey`**: Uma prop nova que, quando muda, sinaliza ao modal que precisa resetar seus estados internos e recarregar dados do registro. Isso resolve o conflito entre "preservar rascunho" e "abrir edição de outro registro".
- O handler `handleOpenEdit` irá definir `editingDenuncia` **antes** de abrir o modal, e o modal detectará a mudança via `editKey`.

---

### 2. Componente DenunciaFormModal (`denuncia-form-modal.tsx`)

#### [MODIFY] [denuncia-form-modal.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/denuncias/denuncia-form-modal.tsx)

Mudanças:

1. **Receber `editKey`** e usar `useEffect` para detectar mudanças (novo registro vs. edição vs. reabertura de rascunho):
   - Se `editKey` mudou → reseta todos os estados internos (`currentStep`, `completedSteps`, `denunciaId`, `protocolo`, etc.) e repopula com `initialData`.
   - Se `editKey` não mudou → mantém o estado (comportamento `<Activity>`).

2. **Pré-popular dados de edição completos**: Quando `initialData` é fornecido (modo edição), preciso mapear os dados do registro para os formatos esperados por cada wizard step:
   - **Step 1 (Denúncia)**: `orgao_origem_ids`, `tipo_violencia_ids`, `encaminhamento_ids`, `data_recebimento_denuncia`, etc.
   - **Step 2 (Vítimas)**: Dados da vítima já cadastrada (nome, endereço, classificação).
   - **Step 3 (Agressores)**: Nome, parentesco, endereço do agressor.
   - **Step 4 (Denunciante)**: Nome, telefone, parentesco.

3. **Botão "Limpar / Novo"**: Ao reabrir o modal com rascunho preservado, mostrar um indicador visual e opção de limpar:
   ```
   🔄 Você tem um rascunho em andamento. [Continuar] ou [Iniciar Novo]
   ```

---

### 3. Ajuste no `listDenuncias` (dados para edição)

#### [MODIFY] [denuncias-actions.ts](file:///c:/GSW/PMAVV/PMAVV/src/app/actions/cadastros/denuncias-actions.ts)

O `include` atual do `listDenuncias` já traz dados das relações (vítimas, agressores, denunciantes), mas com `take: 1`. Para edição, precisamos de **todos os registros** (pode haver múltiplas vítimas, agressores, etc.).

Criaremos uma nova function `getDenunciaForEdit(id)` que busca **todos** os dados completos de uma denúncia específica para pré-popular o formulário:

```typescript
export async function getDenunciaForEdit(id: number) {
  // Busca completa sem take:1, incluindo:
  // - Todas as vítimas com endereço e classificação
  // - Todos os agressores com parentesco e endereço
  // - Denunciante com parentesco
  // - Violências, encaminhamentos, órgãos (M:N)
}
```

---

### 4. Mapeamento de Dados para Edição

#### [MODIFY] [denuncia-form-modal.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/denuncias/denuncia-form-modal.tsx)

Criar funções de mapeamento `denunciaToFormData()` para converter os dados do Prisma para os formatos esperados por cada step:

```typescript
// Mapeia a resposta do Prisma para o formato do Step 1
function mapDenunciaToStep1(denuncia: FullDenuncia): DenunciaFormData

// Mapeia vítimas do Prisma para o formato do Step 2
function mapVitimasToStep2(vitimas: any[]): VitimasFormData

// Mapeia agressores do Prisma para o formato do Step 3
function mapAgressoresToStep3(agressores: any[]): AgressoresFormData

// Mapeia denunciante do Prisma para o formato do Step 4
function mapDenuncianteToStep4(denunciante: any): DenuncianteFormData
```

---

## Verification Plan

### Automated Tests
- `pnpm build` — Garantir que não há erros de compilação TypeScript.

### Manual Verification
1. **Teste de Persistência (Activity)**:
   - Abrir "Nova Denúncia" → preencher Step 1 parcialmente → fechar modal → reabrir → verificar que campos estão preservados.
   - Preencher até Step 2 → fechar → reabrir → verificar que está no Step 2.
   
2. **Teste de Edição**:
   - Clicar no botão de edição de uma denúncia existente na DataTable → verificar que todos os campos do Step 1 estão pré-populados (órgão, data, pertinente, violências).
   - Verificar que ao avançar para Steps 2-4, os dados existentes de vítimas/agressores/denunciantes aparecem.

3. **Teste de Conflito Rascunho vs. Edição**:
   - Abrir "Nova Denúncia" → preencher parcialmente → fechar → clicar "Editar" em um registro existente → verificar que o modal abre com os dados do registro, não do rascunho.
