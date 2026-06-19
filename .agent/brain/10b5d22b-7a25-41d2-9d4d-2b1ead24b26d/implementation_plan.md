# Plano de Implementação: Refinamento UI Premium e Encaminhamentos

Este plano detalha a reativação dos Encaminhamentos para denúncias não pertinentes e a modernização da interface para um padrão premium.

## 1. Reativação de Encaminhamentos

- **Backend (`denuncias-actions.ts`)**:
  - Reintroduzir `encaminhamento_ids` no `denunciaCreateSchema` e `denunciaUpdateSchema`.
  - Restaurar lógica de persistência na tabela `tbl_denuncia_encaminhamento` dentro das transações de criação e atualização.
  - Garantir que `getWizardLookupData` retorne a lista de encaminhamentos.
- **Frontend (`DenunciaForm.tsx`)**:
  - Exibir grid de Encaminhamentos quando `Pertinente ao NAVV?` for "NÃO".
  - Usar `MultiCheckField` seguindo o mesmo padrão visual das Formas de Violência.

## 2. Refinamento de UI/UX (Skins Premium)

- **Organização por Temas**: Group fields into distinct "Cards" (containers) to reduce cognitive load.
  - Tema 1: Identificação e Origem (Órgão, Data, Protocolo).
  - Tema 2: Triagem e Pertinência (NAVV?, Motivação).
  - Tema 3: Detalhamento (Violências ou Encaminhamentos).
  - Tema 4: Notas Finais (Observações).
- **Estilização Elegante**:
  - Labels: `text-[10px]` bold, uppercase, com espaçamento entre letras (tracking-wider).
  - inputs/Textareas: Bordas suaves, background contrastante, foco com anel de cor elegante.
  - Efeitos: Glassmorphism suave, bordas arredondadas (rounded-2xl), e sombras sutis.
- **Melhoria no Date Picker**:
  - Refatorar o campo de data para um estilo mais "premium", garantindo legibilidade e facilidade de uso em dispositivos móveis e desktop.

## 3. Verificação

- Testar fluxo "NÃO Pertinente" -> Selecionar Encaminhamentos -> Verificar persistência.
- Validar consistência visual em todos os containers de grupo.

## 4. Redesign Premium: Seletor de Bairros

- **Frontend (`BairroAutocomplete.tsx`)**:
  - Migração de `Popover` para `Dialog` Radix (Modal dedicado).
  - Implementação de caixa de pesquisa persistente no `DialogHeader`.
  - Controle de altura nativa (`max-h-[50vh]`) com área de rolagem (scroll-y) limpa.
  - Alvos de clique aumentados e estados de _hover_ enriquecidos para experiência Mobile Premium.
