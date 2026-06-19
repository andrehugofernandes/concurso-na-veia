# Walkthrough - Ajuste de Título 2FA

Realizei os ajustes necessários no título da página de autenticação (usada no fluxo de 2FA) para resolver problemas de corte de caracteres e excesso de linhas.

## Mudanças Realizadas

### [AuthLayout](file:///c:/GSW/PMAVV/PMAVV/src/components/layouts/auth-layout.tsx)

- **Redução de Fonte**: O tamanho da fonte para telas extra grandes (`xl`) foi reduzido de `8xl` para `7xl`, e os demais breakpoints também foram ajustados proporcionalmente (`lg:5xl`, `md:4xl`, `default:3xl`). Isso garante que o título "Verificação em 2 Fatores" ocupe no máximo 2 linhas.
- **Ajuste de Tracking**: Alterado de `tracking-tighter` para `tracking-tight`. Isso evita que os caracteres fiquem muito juntos, corrigindo o problema onde o último "o" de "Verificação" era cortado pelo limite do container ou do efeito de sombra.
- **Padding Horizontal**: Adicionado `px-1` ao título para garantir que o efeito de sombra (`before:`) tenha um pequeno recuo e não seja clipado nas bordas laterais.

## Resultado Esperado

- O título "Verificação em 2 Fatores" agora deve caber em 2 linhas em resoluções desktop padrão.
- A palavra "Verificação" deve aparecer completa, sem o último caractere cortado.
- O design mantém a estética premium original, apenas com proporções mais adequadas ao conteúdo textual longo.

## Testes Realizados

- Atualização manual do código e verificação lógica das classes Tailwind CSS aplicadas.
- O `pnpm dev` está rodando, permitindo que as alterações sejam visualizadas instantaneamente no ambiente local.
