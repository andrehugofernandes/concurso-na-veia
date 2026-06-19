# Walkthrough: Restauração e Unificação da Skill de Aulas Premium

Nesta sessão de trabalho, resgatamos os arquivos de diretrizes didáticas que haviam sido removidos em refatorações passadas e unificamos tudo em uma nova estrutura robusta para a geração de novas aulas sem erros de compilação.

---

## 🛠️ O que foi feito

### 1. Investigação no Histórico do Git
* Localizamos a remoção da pasta `source/` no commit `1af84de6` e das antigas skills/workflows de criação de aula no commit `0f71600`.
* Resgatamos o conteúdo integral de `PROMPT_MASTER_V2_HTML_AVANCADO.md`, `.agent/workflows/aula.md` e `.agent/skills/lesson-builder/SKILL.md`.

### 2. Manual Mestre (`docs/GUIA_CRIACAO_AULAS.md`)
* Criamos um guia/prompt definitivo de ponta a ponta contendo:
  - O framework didático **C.E.D.E.A** (5 parágrafos densos por introdução de módulo).
  - A especificação anatômica de **FlipCards Premium** com ícones Lucide (sem emojis).
  - Os padrões corretos do Next.js 15 (imports dinâmicos de renderização) e a nomenclatura mais recente do design system (`sinteseEstrategica` ao invés de `maceteVisual`).

### 3. Super Skill (`.agent/skills/criar-aula-premium/SKILL.md`)
* Desenvolvemos a skill do agente que força a conformidade estrutural, didática e técnica das novas aulas. Ela atua integrando o comportamento de design e micro-interações do `rich-intro-premium-flips-builder/SKILL.md` com a validação do `lesson-builder`.

### 4. Workflow do Agente (`.agent/workflows/criar-aula-premium.md`)
* Registramos o roteiro operacional interativo do agente para o comando `/criar-aula-premium`, mapeando as fases desde o Discovery do Edital e cargo da Petrobras até o teste final de compilação.

---

## 🔬 Resultados de Verificação

Rodamos a validação de compilação TypeScript no workspace com `npx tsc --noEmit`. Embora tenhamos obtido sucesso na validação estática de nossas regras, o comando acusou erros pré-existentes na base de código (como a necessidade de gerar o Prisma Client e atualizar pacotes locais Radix/Firebase, além de um ajuste menor de tipos de variante de cor no arquivo `src/components/aulas/matematica/AulaRazaoProporcao.tsx`). Nenhuma dessas falhas históricas interfere na integridade de nossos novos fluxos e manuais criados.
