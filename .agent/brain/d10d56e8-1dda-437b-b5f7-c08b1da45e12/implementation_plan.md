# [Plano de Implementação] Corrigir Erro de Tipagem do Módulo em AulaConjuntos.tsx

O objetivo é resolver o erro de atribuição do tipo no prop `variant` dos componentes `ModuleConsolidation`, `QuizInterativo`, etc. O erro ocorre porque o array `mv` é inicializado com `undefined`, tornando seus elementos potencialmente `undefined`, o que não é aceito pelos componentes.

## Alterações Propostas

### AulaConjuntos.tsx

#### [MODIFICAR] [AulaConjuntos.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaConjuntos.tsx)

1.  **Padronizar o array `mv`**:
    - Alterar a inicialização de `const mv = [undefined, ...getAllModuleVariants()];` para uma versão que não contenha `undefined`.
    - Usaremos `"slate"` (ou a primeira variante disponível) como fallback no índice 0 para manter a indexação baseada em 1 (Módulo 1 = `mv[1]`).
2.  **Remover Casts `as any`**:
    - Remover os diversos `as any` nos props `variant` em todo o arquivo, agora que o tipo de `mv[index]` será compatível com `ModuleSkinVariant`.

---

## Plano de Verificação

### Testes Automatizados

- Executar `npm run build` ou o comando de lint/check de tipos para garantir que o erro "not assignable to type" desapareceu.
  ```powershell
  pnpm tsc --noEmit
  ```

### Verificação Manual

- Abrir a aula de Conjuntos no navegador e verificar se as cores dos módulos permanecem corretas (Módulo 1 = Âmbar, Módulo 2 = Azul, etc.).
- Verificar se o componente de Consolidação no final do Módulo 2 está renderizando corretamente com a cor azul.
