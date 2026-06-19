# Padronização de Aula: Coesão e Coerência (Petrobras Ultimate)

Este plano visa finalizar a padronização da aula `AulaCoesaoCoerencia.tsx` para atingir o nível "Ultimate V4.1", garantindo paridade absoluta com a aula de Interpretação de Texto, que é o padrão ouro do projeto.

## Mudanças Propostas

### 🌐 Infraestrutura e Lógica Global

- **Importação:** Adicionar `getModuleVariant` de `@/lib/moduleColors`.
- **Cores Dinâmicas:** Inicializar constante `mv` para gerenciamento de variantes.
- **Remoção de Travas:** Alterar `isModuleUnlocked` para retornar sempre `true`, liberando todos os 10 módulos.

### 🎨 Padronização Visual e Cores

- Aplicar `variant={mv[N]}` em todos os `ModuleBanner` e `ModuleSectionHeader`.
- Sincronizar a paleta de cores dos 10 módulos com o sistema dinâmico.

### 📚 Enriquecimento de Conteúdo (Rich Intro)

- Finalizar a inclusão de seções `Rich Intro` (INTRO) em todos os 10 módulos.
- Adicionar elementos visuais premium e conteúdo teórico denso (estilo Bechara).

### 🧪 Verificação Final

- Resolver erros de lint pendentes.
- Validar experiência em dispositivos móveis.
