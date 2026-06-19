# Plano de Implementação: Finalização do MVP Nível Médio

Este plano visa concluir a migração e o desenvolvimento dos módulos de Português e Matemática para o padrão **Ultimate V4.1**, garantindo que o MVP para o cargo de Nível Médio da Petrobras esteja 100% operacional no período pré-edital.

## User Review Required

> [!IMPORTANT]
> A aula de **Concordância** possui mais de 5000 linhas. Vou realizar uma refatoração estrutural para reduzir redundâncias e melhorar a performance, mantendo toda a carga pedagógica intacta.
> 
> A aula de **Porcentagem** está incompleta a partir do Módulo 3. Vou desenvolver o conteúdo dos módulos 4 a 10 com base no perfil da **CESGRANRIO**.

## Proposed Changes

### [Componente] Português - Fase Final

#### [MODIFY] [AulaSintaxe.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaSintaxe.tsx)
- Inserir componentes `ModuleConsolidation` nos módulos 7, 8, 9 e 10.
- Validar as IDs de vídeo e conteúdos de áudio para esses módulos.

#### [MODIFY] [AulaConcordancia.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/portugues/AulaConcordancia.tsx)
- Refatoração para remover componentes duplicados e lógica excessiva no corpo do arquivo.
- Implementação completa dos Módulos 8, 9 e 10 (que estão em 80% de progresso).
- Adição dos componentes de Consolidação Multimídia em todos os módulos restantes.

---

### [Componente] Matemática - Fase MVP

#### [MODIFY] [AulaRazaoProporcao.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaRazaoProporcao.tsx)
- Auditoria de todos os 10 módulos para garantir o uso de `ModuleConsolidation` e `QuizInterativo`.
- Ajuste de cores para o padrão de gradientes harmoniosos (foco em tons de azul e ciano para Matemática).

#### [MODIFY] [AulaPorcentagem.tsx](file:///c:/Workspace/petrobras-quest/src/components/aulas/matematica/AulaPorcentagem.tsx)
- Desenvolvimento do conteúdo pedagógico para os Módulos 4 a 10:
  - M4: Aplicações Industriais (Petrobras)
  - M5: Simulado Parcial 1 (Questões Cesgranrio)
  - M6: Porcentagem Composta e Acumulada
  - M7: Cálculo Reverso (Encontrando o Valor Original)
  - M8: Regra de Três com Porcentagem
  - M9: Matemática Financeira Básica (Juros Simples)
  - M10: Simulado Arena de Elite (10 questões densas)

---

## Open Questions

> [!NOTE]
> Você prefere que eu foque primeiro em **Português (100%)** ou que eu intercalte com o desenvolvimento de **Matemática**?

## Verification Plan

### Automated Tests
- `npx tsc` para verificar integridade de tipos em todos os arquivos modificados.
- Verificação de renderização via `npm run dev`.

### Manual Verification
- Verificação visual da responsividade mobile nos novos módulos de Matemática.
- Garantia de que o `Score` dos quizzes está atualizando corretamente o progresso no `AulaTemplate`.
