# Plano de Upgrade ULTIMATE: Aula de Classes de Palavras (Padrão Matemática)

Este plano visa aplicar o padrão de excelência das aulas de Matemática ao componente de Português, eliminando hardcodes e automatizando a estilização visual via variáveis.

## User Review Required

> [!IMPORTANT]
> A principal mudança é a remoção do prop `gradiente` manual nos banners, delegando a responsabilidade visual para a variável `mv` (Module Variant), seguindo a arquitetura das aulas de Matemática.

## Proposta de Mudanças

### [Componente] [AulaClassesPalavras.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaClassesPalavras.tsx) [MODIFY]

#### 1. Automação de Variantes (Sem Hardcode)
- Refatorar a constante `mv` para usar o padrão dinâmico:
  ```tsx
  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;
  ```
- Remover todos os props `gradiente` manuais dos componentes `<ModuleBanner />`.

#### 2. Tipografia ULTIMATE (Legibilidade Pro)
- Migrar todos os blocos de texto (`p`, `div`, `AlertBox`) de `text-base` para `text-lg`.
- Implementar `text-justify` em todas as seções de conteúdo denso.
- Garantir que todos os `ModuleSectionHeader` utilizem cores derivadas da variável `mv[N]`.

#### 3. Auditoria de Estrutura
- Sincronizar os ícones e cores dos 10 módulos com a paleta de Português (Amber -> Blue -> Emerald -> Rose -> Violet -> Dark Variants).
- Corrigir indexação sequencial de cabeçalhos e quiz.

## Plano de Verificação

### Verificação Manual
1.  Validar visualmente em `http://localhost:3000/aulas/portugues/classes-palavras`.
2.  Checar se a tipografia `text-lg` não causou quebras de layout em dispositivos móveis.
3.  Confirmar que os 10 gradientes estão distintos e seguindo a ordem correta.
