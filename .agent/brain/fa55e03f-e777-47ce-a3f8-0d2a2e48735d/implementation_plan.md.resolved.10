# Plano de Reparo e Expansão ULTIMATE: Aula Classes de Palavras

O arquivo `AulaClassesPalavras.tsx` apresenta erros de sintaxe JSX críticos (tags truncadas e sobrepostas) entre os Módulos 3 e 4. Este plano detalha a restauração da integridade do código e a finalização da padronização SAAS/ULTIMATE.

## User Review Required

> [!IMPORTANT]
> O arquivo de aula está atualmente **quebrado** (não compila). O reparo envolverá uma substituição em larga escala dos blocos dos Módulos 4 a 10 para garantir que todos sigam o padrão de "Rich Intro" (5 parágrafos) aprovado.

## Mudanças Propostas

### 🛠️ Estratégia de Regeneração Total (LMS Quest AI Standard V2)
Corrigiremos o crash de renderização injetando as props obrigatórias exigidas pelo `AulaTemplate` em `shared.tsx`:

1. **Sincronização de Props**:
   - Fornecer `materiaNome`, `materiaCor` e `materiaId` explicitamente.
   - Implementar o controle de estado `activeTab` e a lista de `modules` no componente pai.
   - Adicionar `completedModules` (Set) para compatibilidade com o sistema de progresso.

2. **Refactor do Script de Regeneração**:
   - Atualizar `scripts/repair-aula.js` para gerar o boilerplate completo do componente, incluindo os hooks de estado necessários.
   - Garantir que o nome da aula ("Classes de Palavras") apareça no Breadcrumb.

3. **Validação Final**:
   - Executar `node scripts/repair-aula.js`.
   - Verificar novamente via Browser Subagent para confirmar a renderização dos 5 parágrafos.

### 📚 Conteúdo por Módulo (Standard SAAS)
| Módulo | Nome | Rich Intro | Mnemônico |
| :--- | :--- | :--- | :--- |
| **M4** | Pronome | Reescrito (5 parágrafos) | **SUB.RE.** |
| **M5** | Verbo | Reescrito (5 parágrafos) | **F.E.A.** |
| **M6** | Advérbio | Reescrito (5 parágrafos) | **C.I.L.A.** |
| **M7** | Preposição | Reescrito (5 parágrafos) | **L.I.G.A.** |
| **M8** | Conjunção | Reescrito (5 parágrafos) | **C.O.N.E.** |
| **M9** | Interjeição | Reescrito (5 parágrafos) | **E.M.O.** |
| **M10** | Numeral | Reescrito (5 parágrafos) | **C.O.F.M.** |

### 🤖 Automação V4 (Mesa de Revisão)
- O script `ultimate-fixer.js` V4 será executado novamente (após o reparo manual da sintaxe) para garantir que todas as abas de "Macete Visual" contenham os mnemônicos acima.

## Plano de Verificação

### Testes Automatizados
- `npm run lint`: Verificar se todos os erros de sintaxe foram eliminados.
- `npm run dev`: Validar se a página carrega sem erros de runtime "mv is not defined".

### Verificação Manual
- Navegar pelos 10 módulos e confirmar:
  1. A presença dos 5 parágrafos densos por módulo.
  2. O mnemônico gigante na aba "Macete Visual".
  3. A inexistência de cores "hardcoded" (todas devem seguir o padrão mv[N]).
