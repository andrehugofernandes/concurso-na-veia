# Plano de Implementação Premium - Aula Lei 13.303 (Estatuto das Estatais)

Este plano visa elevar a `AulaLei13303.tsx` ao padrão "Premium" da Sala de Guerra, garantindo alta densidade pedagógica, visual harmônico e conformidade técnica.

## Objetivo
- Expandir a aula de ~270 para **2500+ linhas**.
- Implementar **10 módulos completos** (atualmente a maioria é placeholder).
- Integrar `ModuleConsolidation` (4 abas: Vídeo, Resumo, Macete, Áudio) em todos os módulos.
- Adotar o protocolo **C.E.D.E.** (Conceituação, Exemplificação, Dicas, Exceções) em todos os acordeões.
- Sincronizar cores usando `getModuleVariant(index)`.

## Mudanças Propostas

### UI / Refatoração

#### [MODIFY] [AulaLei13303.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/administracao/AulaLei13303.tsx)
- **Importações**: Adicionar `getModuleVariant`, `ModuleConsolidation` e ícones adicionais necessários.
- **Módulos 1-10**: Expandir cada `TabsContent` com a estrutura completa:
    1.  `ModuleBanner` (Banner de topo)
    2.  `ModuleSectionHeader` + `CardCarousel` (Dossiê/Visão Geral)
    3.  `ModuleSectionHeader` + `ContentAccordion` (Protocolo C.E.D.E. detalhado)
    4.  `ModuleConsolidation` (Consolidação em 4 abas com curadoria de conteúdo)
    5.  `QuizInterativo` (Sincronizado com o data de quizzes)
- **Cores**: Substituir todas as cores hardcoded (`indigo`, `emerald`) pela função dinâmica `getModuleVariant(numero)`.

## Conteúdo Programático (Base Legal)
- **M1-M2**: Fundamentos e Definições (EP vs SEM).
- **M3-M4**: Governança e Transparência.
- **M5-M7**: Órgãos Sociais (Assembleia, Conselhos, Diretoria).
- **M8**: Conflito de Interesses e Impedimentos.
- **M9**: Aplicação prática na Petrobras.
- **M10**: Simulado Mestre Integrado.

## Plano de Verificação

### Testes Automatizados
- Executar o script `fix_consolidation_position.py` para garantir que `ModuleConsolidation` está na posição correta (antes do Quiz).
- Rodar o build de produção (`pnpm run build`) para validar tipos e imports.

### Verificação Manual
- Validar a navegação entre os 10 módulos.
- Verificar se a contagem de linhas atingiu o objetivo (> 2500).
