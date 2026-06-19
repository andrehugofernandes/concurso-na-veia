# Plano de Implementação - Correção de Tipo Galerias

O objetivo é resolver o erro de casting onde `galleriesData` pode ser `undefined` ao ser passado para o `ImageGalleriesPageClient`.

## Mudanças Propostas

### Dashboard Core

#### [MODIFY] [page.tsx](file:///c:/GSW/WP2NEXT-MIGRATOR/packages/dashboard-core/app/admin/image-galleries/page.tsx)

- Atualizar a lógica de atribuição de `galleriesData` para garantir que o objeto de fallback seja usado caso `result.data` seja `undefined`, mesmo em caso de sucesso.

```tsx
const galleriesData =
  result.status === "success" && result.data
    ? result.data
    : {
        galleries: [],
        total: 0,
        page: 1,
        pageSize: 12,
        totalPages: 1,
        pages: 0,
      };
```

## Plano de Verificação

### Verificação Manual

- Verificar se o build do TypeScript passa sem erros no arquivo `page.tsx`.
