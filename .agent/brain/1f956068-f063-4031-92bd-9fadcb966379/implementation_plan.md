# Plano de Implementação - Ajuste de Layout do Título 2FA

Este plano visa corrigir o layout do título "Verificação em 2 Fatores" que está apresentando corte no último caractere ("o") e ocupando mais de duas linhas.

## Mudanças Propostas

### UI e Layout

#### [MODIFY] [auth-layout.tsx](file:///c:/GSW/PMAVV/PMAVV/src/components/layouts/auth-layout.tsx)

- Reduzir o tamanho da fonte de `xl:text-8xl` para `xl:text-7xl` para garantir que o título caiba em no máximo 2 linhas em telas grandes.
- Alterar `tracking-tighter` para `tracking-tight` para dar mais respiro entre as letras e evitar que o caractere final seja cortado.
- Adicionar um leve padding horizontal (`px-1`) ou ajustar o container do título para garantir que o efeito de sombra (`before:`) não seja clipado.
- Ajustar as classes de tamanho de fonte para os outros breakpoints (`lg`, `md`) proporcionalmente.

Exemplo de alteração na classe do `h1`:

```diff
- "relative isolate xl:text-8xl lg:text-6xl md:text-5xl text-4xl font-black transition-all duration-500 tracking-tighter"
+ "relative isolate xl:text-7xl lg:text-5xl md:text-4xl text-3xl font-black transition-all duration-500 tracking-tight px-1"
```

## Plano de Verificação

### Verificação Manual

1. Abrir a página de login e avançar para o passo de verificação 2FA (ou forçar o passo alterando o estado inicial em `LoginPage.tsx` temporariamente).
2. Observar o título "Verificação em 2 Fatores":
   - Confirmar se o "o" de "Verificação" está visível e não cortado.
   - Confirmar se o título ocupa 2 linhas ou menos.
3. Testar a responsividade mudando o tamanho da janela (Desktop, Tablet, Mobile) para garantir que o título continue legível e bem posicionado.
