# Plano de Implementação - Correção de Erro TypeScript em Image Galleries

O objetivo é corrigir um erro de atribuição de tipo no arquivo `packages\dashboard-core\app\admin\image-galleries\page.tsx`.

## Problema

O IDE reporta que `result.data` pode ser `undefined`, o que torna o tipo resultante incompatível com a interface `GalleriesData` esperada pelo componente cliente.

## Mudanças Propostas

### dashboard-core

#### [MODIFY] [page.tsx](file:///c:/GSW/WP2NEXT-MIGRATOR/packages/dashboard-core/app/admin/image-galleries/page.tsx)

- Atualizar a lógica de atribuição da variável `galleriesData` para verificar explicitamente a existência de `result.data`.

```tsx
81:     const galleriesData =
82:         result.status === 'success' && result.data
83:             ? result.data
84:             : { galleries: [], total: 0, page: 1, pageSize: 12, totalPages: 1, pages: 0 };
```

## Verificação

### Testes Manuais
- Verificar se o erro de compilação desaparece no IDE.
- Abrir a página de galerias no dashboard para garantir que os dados continuam sendo carregados corretamente.
