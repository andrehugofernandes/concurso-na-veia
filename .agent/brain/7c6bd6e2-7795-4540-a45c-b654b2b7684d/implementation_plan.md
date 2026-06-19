# Plano de Upgrade ULTIMATE: Aula de Interpretação de Texto

Este plano visa padronizar a aula de **Interpretação de Texto** para o nível **ULTIMATE V4.1**, inserindo seções de texto editorial denso (Rich Intro) em cada módulo, garantindo 100% de cobertura do conteúdo do quiz e preservando todos os componentes interativos existentes.

## User Review Required

> [!IMPORTANT]
> - A seção "RICH INTRO" global será removida para que cada módulo tenha sua própria introdução rica integrada, seguindo a anatomia do módulo definida no workflow.
> - O arquivo terá um aumento significativo de linhas (estimativa de +1000 linhas) devido ao conteúdo teórico detalhando as regras de Bechara e tipologias textuais.
> - As músicas pedagógicas "Sertanejo de Elite" serão mantidas e integradas ao componente `ModuleConsolidation` de cada módulo.

## Proposed Changes

### [Componente de Aula]

#### [MODIFY] [AulaInterpretacaoTexto.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaInterpretacaoTexto.tsx)
- [DELETE] Remover bloco global "RICH INTRO" (linhas 267-314).
- [MODIFY] **Módulo 1: A Diferença Letal**
    - [NEW] Inserir `<section>` com `ModuleSectionHeader` + 5 parágrafos densos (Conceito de Bechara, Analogia do Microscópio, Regras de Compreensão vs Interpretação, Contexto Industrial/Petrobras e Estratégia Cesgranrio).
    - [NEW] Inserir Caixa de Destaque com a "Regra de Ouro da Literalidade".
    - [MODIFY] Reorganizar `ContentAccordion` e `TextAnalysisLab` para virem após a Rich Intro.
- [MODIFY] **Módulo 2: O Tópico Frasal**
    - [NEW] Inserir `<section>` com `ModuleSectionHeader` + 5 parágrafos densos sobre a hierarquia de ideias no parágrafo técnico.
    - [NEW] Inserir Caixa de Destaque com o "Guia de Localização Instantânea".
- [MODIFY] **Módulo 3: Coesão e Argumentação**
    - [NEW] Inserir `<section>` com `ModuleSectionHeader` + 5 parágrafos densos sobre conectivos como "engrenagens" do pensamento argumentativo.
- [MODIFY] **Até o Módulo 10**: Repetir o padrão de Rich Intro para os módulos restantes (Coesão Referencial, Pistas e Entrelinhas, Ameaças Triplas, etc.), extraindo conteúdo da fonte HTML completa.
- [MODIFY] Garantir que `ModuleConsolidation` apareça ANTES de cada `QuizInterativo`.

## Open Questions

> [!NOTE]
> - Deseja que eu faça o upgrade de todos os 10 módulos nesta etapa ou apenas dos 3 primeiros para sua validação?
> - Notei que o arquivo fonte possui apenas 3 módulos detalhados, enquanto a aula TSX tem 10. Vou expandir os 7 módulos restantes baseando-me no perfil geral da banca e nos tópicos do edital.

## Verification Plan

### Automated Tests
- Executar `node scripts/ultimate-fixer.js src/components/aulas/portugues/AulaInterpretacaoTexto.tsx` para validar cores e índices.
- Verificar o número de linhas (`wc -l`) para garantir que o arquivo cresceu.
- Validar build com `pnpm dev`.

### Manual Verification
- Navegar pelos 10 módulos e verificar se a Rich Intro aparece consistentemente entre o Banner e os componentes.
- Confirmar se o conteúdo do PDF/HTML fonte foi devidamente parafraseado e incluído.
