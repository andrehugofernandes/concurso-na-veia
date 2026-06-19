# Tarefas: Melhorias Form PMAVV (Reunião Usuários)

## Fase 1: Planejamento & Alinhamento

- [x] Analisar `pmavv.txt` e imagens de referência (02, 02b, 02c)
- [x] Criar plano de implementação detalhado
- [x] Obter aprovação do usuário

## Fase 2: Implementação - Banco & Step 1

- [x] Aplicar migração (campos `observacao` e `ponto_referencia`)
- [x] Implementar lógica SIM/NÃO em `DenunciaForm.tsx` conforme imagens
- [x] Adicionar campo "Observações" no final do Step 1

## Fase 3: Implementação - Step 2 (Vítima/Endereço)

- [x] Validar campos de endereço (CEP, Logradouro, Bairro, Numero, Complemento, Ponto de Ref.)
- [x] Garantir que "Bairro" seja um Select vinculado ao banco de dados

## Fase 4: Limpeza & Backend

- [x] Remover campos legados das Server Actions
- [x] Atualizar Schemas Zod conforme necessário

## Fase 5: Verificação

- [x] Testar fluxos condicionados (SIM/NÃO)
- [x] Validar persistência de endereços
- [x] Finalizar com `walkthrough.md`

## Fase 6: Refinamento UI & Encaminhamentos

- [x] Atualizar plano de implementação (UI Premium + Encaminhamentos)
- [x] Reintroduzir lógica de `referral` (encaminhamentos) no backend
- [x] Aplicar design temático (Cards/Skins) no `DenunciaForm.tsx`
- [x] Melhorar Date Picker e tipografia dos Labels
- [x] Reativar grid de Encaminhamentos para denúncias NÃO pertinentes
- [x] Integrar persistência no `DenunciaFormModal.tsx`

## Fase 7: Ajustes Finais e Animações (Novo)

- [x] Instalar dependência `framer-motion` no repositório
- [x] Corrigir gap de alinhamento da barra inferior do Modal (Remoção da transparência)
- [x] Aplicar Alto-Contraste dinâmico no botão CTA (Avançar/Prosseguir)
- [x] Implementar a "Opção B" para transição animada de formulários (`AnimatePresence`)

## Fase 8: Integração Back-End & Auto-fill da Regional

- [x] Refatorar `BairroAutocomplete.tsx` para usar TSX controlados (`value` e `onChange`)
- [x] Consertar a query Prisma do arquivo `bairros-actions.ts` que possuía referências a colunas incorretas e paralisava silenciosamente o dropdown.
- [x] Popular banco de dados vazio diretamente no terminal com `prisma.createMany` contendo Bairros Reais do Jaboatão.
- [x] Habilitar funcionalidade em que a "Regional:" é revelada na tela automaticamente após selecionar a opção.

## Fase 9: Redesign Premium Modal Autocomplete

- [x] Descartar `Popover` fragmentado e converter `BairroAutocomplete` para Modal limpo (`Dialog`).
- [x] Centralizar UI de pesquisa com Search Input dentro da janela com barra de rolagem (50vh max).
- [x] Embelezar os botões de seleção de bairros com micro-animações, contrastes e ícones.
- [x] Remover badges de Regional do Popover que estavam invadindo o espaço visual em telas menores.
- [x] Construir campo nativo de `Regional (Auto)` nas sessões de Vítima/Agressor auto-ativado por State Mutation (`setValue` do React-Hook-Form) simulando Ajax Scriptcase.
