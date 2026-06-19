# Plano de Implementação - Correção de Erro de Hidratação

Corrigir o erro de console/hidratação causado pelo aninhamento de tags `<a>`. O componente `PetrobrasLogo` já atua como um link para a home (`/`), e está sendo envolto desnecessariamente por outro `Link` no componente `LandingPage`.

## Mudanças Propostas

### Frontend

#### [MODIFY] [page.tsx](file:///c:/Workspace/petrobras-quest/src/app/page.tsx)

- Remover o componente `<Link href="/">` que envolve `<PetrobrasLogo />` na seção de navegação (Header).
- Adicionar a classe `shrink-0` diretamente ao `PetrobrasLogo` se necessário para manter o layout.

## Plano de Verificação

### Verificação Manual

1. Abrir a aplicação no navegador (pnpm dev já está rodando).
2. Verificar se o erro "In HTML, <a> cannot be a descendant of <a>" desapareceu do console do navegador.
3. Validar se o logo continua clicável e redireciona para a home.
4. Verificar o layout do header para garantir que não houve regressão visual.
